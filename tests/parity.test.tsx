import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { normaliseHtml } from './normalise-html';
import { mappings } from './nunjucks';
import { knownDifferences } from './known-differences';
import { compositeMappings } from './composite';
import { unsupported } from './composite/helpers';

/**
 * Renders every govuk-frontend fixture for each ported component and checks
 * that the HTML matches govuk-frontend's own Nunjucks output.
 */

const require = createRequire(import.meta.url);
const componentsDir = join(
  dirname(require.resolve('govuk-frontend/package.json')),
  'dist/govuk/components',
);

type Fixture = { name: string; options: Record<string, unknown>; html: string; hidden: boolean };

const allComponents = readdirSync(componentsDir).filter((name) =>
  existsSync(join(componentsDir, name, 'fixtures.json')),
);

const summary: Array<{ component: string; passing: number; total: number }> = [];
const compositeSummary: Array<{
  component: string;
  passing: number;
  skipped: number;
  total: number;
}> = [];

for (const component of allComponents) {
  const render = mappings[component];
  const { fixtures } = JSON.parse(
    readFileSync(join(componentsDir, component, 'fixtures.json'), 'utf8'),
  ) as { fixtures: Fixture[] };

  if (!render) {
    summary.push({ component, passing: 0, total: fixtures.length });
    continue;
  }

  const entry = { component, passing: 0, total: fixtures.length };
  summary.push(entry);

  describe(component, () => {
    for (const fixture of fixtures) {
      const key = `${component}/${fixture.name}`;
      const known = knownDifferences[key];
      test(fixture.name, () => {
        const actual = normaliseHtml(renderToStaticMarkup(render(fixture.options)));
        const expected = normaliseHtml(fixture.html);
        if (known) {
          expect(actual, `${key} is listed as a known difference but now matches`).not.toBe(
            expected,
          );
          return;
        }
        expect(actual).toBe(expected);
        entry.passing += 1;
      });
    }
  });

  const composite = compositeMappings[component];
  if (!composite) continue;
  const compositeEntry = { component, passing: 0, skipped: 0, total: fixtures.length };
  compositeSummary.push(compositeEntry);

  describe(`${component} (composite)`, () => {
    for (const fixture of fixtures) {
      const rendered =
        unsupported(fixture.options, composite.supports).length === 0 &&
        composite.render(fixture.options);
      if (!rendered) {
        compositeEntry.skipped += 1;
        continue;
      }
      const key = `${component} (composite)/${fixture.name}`;
      test(fixture.name, () => {
        const actual = normaliseHtml(renderToStaticMarkup(rendered));
        const expected = normaliseHtml(fixture.html);
        if (knownDifferences[key]) {
          expect(actual, `${key} is listed as a known difference but now matches`).not.toBe(
            expected,
          );
          return;
        }
        expect(actual).toBe(expected);
        compositeEntry.passing += 1;
      });
    }
  });
}

afterAll(() => {
  const ported = summary.filter((s) => mappings[s.component]);
  const passing = ported.reduce((n, s) => n + s.passing, 0);
  const total = summary.reduce((n, s) => n + s.total, 0);
  const rows = summary.map(
    (s) =>
      `  ${s.component.padEnd(22)} ${mappings[s.component] ? `${s.passing}/${s.total}` : `-/${s.total} (not ported)`}`,
  );
  console.log(
    `\ngovuk-frontend parity: ${passing}/${total} fixtures, ${ported.length}/${summary.length} components\n${rows.join('\n')}\n`,
  );
  const compositeRows = compositeSummary.map(
    (s) =>
      `  ${s.component.padEnd(22)} ${s.passing}/${s.total - s.skipped} (${s.skipped} use options the composite leaves to parts)`,
  );
  console.log(`\nComposite parity:\n${compositeRows.join('\n')}\n`);
});
