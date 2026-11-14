import type { StoryObj } from '@storybook/react-vite';
import type { ReactElement } from 'react';
import type { Options } from '../tests/nunjucks/helpers';

type Fixture = { name: string; options: Options };

export function fixturesStory(
  render: (options: Options) => ReactElement,
  { fixtures }: { fixtures: Fixture[] },
): StoryObj<{ fixture: string }> {
  const byName = new Map(fixtures.map((fixture) => [fixture.name, fixture.options]));
  return {
    name: 'govuk-frontend fixtures',
    args: { fixture: fixtures[0]?.name ?? '' },
    argTypes: { fixture: { control: 'select', options: [...byName.keys()] } },
    render: ({ fixture }) => render(byName.get(fixture) ?? {}),
  };
}
