import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/password-input/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/password-input';
import * as PasswordInput from '.';

export default { title: 'Password input', component: PasswordInput.Root } satisfies Meta<
  typeof PasswordInput.Root
>;

export const Default = {
  render: () => <PasswordInput.Field id="password-input" name="password" label="Password" />,
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
