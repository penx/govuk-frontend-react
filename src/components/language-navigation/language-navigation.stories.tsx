import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/language-navigation/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/language-navigation';
import * as LanguageNavigation from '.';

export default { title: 'Language navigation', component: LanguageNavigation.Root } satisfies Meta<
  typeof LanguageNavigation.Root
>;

export const Default = {
  render: () => (
    <LanguageNavigation.Root>
      <LanguageNavigation.List>
        <LanguageNavigation.ListItem>
          <LanguageNavigation.Text lang="en">English</LanguageNavigation.Text>
        </LanguageNavigation.ListItem>
        <LanguageNavigation.ListItem>
          <LanguageNavigation.Link href="#" lang="cy">
            Cymraeg
          </LanguageNavigation.Link>
        </LanguageNavigation.ListItem>
      </LanguageNavigation.List>
    </LanguageNavigation.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
