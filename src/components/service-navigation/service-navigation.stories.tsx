import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/service-navigation/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/service-navigation';
import * as ServiceNavigation from '.';

export default {
  title: 'Service navigation',
  component: ServiceNavigation.Composite,
} satisfies Meta<typeof ServiceNavigation.Composite>;

export const Default = {
  render: () => (
    <ServiceNavigation.Composite serviceName="Apply for a juggling licence" serviceHref="#/">
      <ServiceNavigation.ItemComposite href="#/1" current>
        Apply
      </ServiceNavigation.ItemComposite>
      <ServiceNavigation.ItemComposite href="#/2">Check status</ServiceNavigation.ItemComposite>
    </ServiceNavigation.Composite>
  ),
};

export const WithParts = {
  render: () => (
    <ServiceNavigation.Root as="section">
      <ServiceNavigation.WidthContainer>
        <ServiceNavigation.Container>
          <ServiceNavigation.ServiceName>
            <ServiceNavigation.Link href="#/">Apply for a juggling licence</ServiceNavigation.Link>
          </ServiceNavigation.ServiceName>
          <ServiceNavigation.Wrapper>
            <ServiceNavigation.Toggle />
            <ServiceNavigation.List>
              <ServiceNavigation.Item active>
                <ServiceNavigation.Link href="#/1" aria-current="page">
                  <ServiceNavigation.ActiveFallback>Apply</ServiceNavigation.ActiveFallback>
                </ServiceNavigation.Link>
              </ServiceNavigation.Item>
              <ServiceNavigation.Item>
                <ServiceNavigation.Link href="#/2">Check status</ServiceNavigation.Link>
              </ServiceNavigation.Item>
            </ServiceNavigation.List>
          </ServiceNavigation.Wrapper>
        </ServiceNavigation.Container>
      </ServiceNavigation.WidthContainer>
    </ServiceNavigation.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
