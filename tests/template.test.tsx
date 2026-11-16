import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import nunjucks from 'nunjucks';
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { normaliseHtml } from './normalise-html';
import {
  Footer,
  Header,
  MainWrapper,
  ServiceNavigation,
  SkipLink,
  Template,
  WidthContainer,
} from '../src';

/**
 * govuk-frontend publishes no fixtures for its page template, so this renders
 * template.njk with a few option sets and compares the HTML. The template's
 * inline script, which adds `js-enabled` to the body, is client JS and isn't ported.
 */

const require = createRequire(import.meta.url);
const env = nunjucks.configure(
  join(dirname(require.resolve('govuk-frontend/package.json')), 'dist'),
  {
    autoescape: true,
  },
);

function nunjucksPage(context: Record<string, unknown>, blocks: Record<string, string> = {}) {
  const source = [
    '{% extends "govuk/template.njk" %}',
    ...Object.entries(blocks).map(([name, html]) => `{% block ${name} %}${html}{% endblock %}`),
  ].join('');
  return env.renderString(source, context).replace(/<script\b[^>]*>[\s\S]*?<\/script>/, '');
}

/** React orders `<head>` itself (charset and viewport first, stylesheets last), so order is ignored there. */
const sortHead = (html: string) =>
  html.replace(/<head>([\s\S]*?)<\/head>/, (_, head: string) => {
    const tags = head.match(/<title[^>]*>[\s\S]*?<\/title>|<[^>]+>/g) ?? [];
    return `<head>${tags.sort().join('')}</head>`;
  });

const expectSame = (react: ReactElement, html: string) =>
  expect(normaliseHtml(sortHead(renderToStaticMarkup(react)))).toBe(normaliseHtml(sortHead(html)));

test('default', () => {
  expectSame(
    <Template.Composite>
      <p>Content</p>
    </Template.Composite>,
    nunjucksPage({}, { content: '<p>Content</p>' }),
  );
});

test('with options', () => {
  expectSame(
    <Template.Composite
      lang="cy"
      title="Apply for a licence"
      titleLang="en"
      themeColor="#0b0c0c"
      assetPath="/static"
      assetUrl="https://example.gov.uk/static"
      serviceName="Apply for a licence"
      serviceHref="/apply"
      mainLang="en"
      beforeContent={<a href="/">Back</a>}
      head={<link rel="stylesheet" href="/app.css" />}
    >
      <p>Content</p>
    </Template.Composite>,
    nunjucksPage(
      {
        htmlLang: 'cy',
        pageTitleLang: 'en',
        themeColor: '#0b0c0c',
        assetPath: '/static',
        assetUrl: 'https://example.gov.uk/static',
        serviceName: 'Apply for a licence',
        serviceUrl: '/apply',
        mainLang: 'en',
      },
      {
        pageTitle: 'Apply for a licence',
        head: '<link rel="stylesheet" href="/app.css">',
        beforeContent: '<a href="/">Back</a>',
        content: '<p>Content</p>',
      },
    ),
  );
});

test('without header or footer', () => {
  expectSame(
    <Template.Composite
      header={false}
      footer={false}
      opengraphImageUrl="https://example.gov.uk/og.png"
    />,
    nunjucksPage(
      { opengraphImageUrl: 'https://example.gov.uk/og.png' },
      { header: '', footer: '' },
    ),
  );
});

test('parts', () => {
  expectSame(
    <Template.Root>
      <Template.HeadComposite />
      <Template.Body>
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <Template.Header>
          <Header.Composite />
          <ServiceNavigation.Composite serviceName="Service" serviceHref="/" />
        </Template.Header>
        <WidthContainer>
          <MainWrapper>
            <p>Content</p>
          </MainWrapper>
        </WidthContainer>
        <Template.Footer>
          <Footer.Composite />
        </Template.Footer>
      </Template.Body>
    </Template.Root>,
    nunjucksPage({ serviceName: 'Service', serviceUrl: '/' }, { content: '<p>Content</p>' }),
  );
});
