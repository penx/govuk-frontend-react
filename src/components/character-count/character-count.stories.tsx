import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/character-count/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/character-count';
import * as CharacterCount from '.';

export default { title: 'Character count', component: CharacterCount.Root } satisfies Meta<
  typeof CharacterCount.Root
>;

export const Default = {
  render: () => (
    <CharacterCount.Field
      name="withHint"
      id="with-hint"
      maxLength={200}
      label="Can you provide more detail?"
      labelSize="l"
      labelIsPageHeading
      hint="Do not include personal or financial information like your National Insurance number or credit card details"
    />
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
