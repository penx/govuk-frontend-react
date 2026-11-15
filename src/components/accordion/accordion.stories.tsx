import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/accordion/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/accordion';
import { Body } from '../../core/body';
import * as Accordion from '.';

export default { title: 'Accordion', component: Accordion.Root } satisfies Meta<
  typeof Accordion.Root
>;

export const Default = {
  render: () => (
    <Accordion.Root id="accordion-default">
      <Accordion.Section>
        <Accordion.SectionHeader>
          <Accordion.SectionHeading>
            <Accordion.SectionButton id="accordion-default-heading-1">
              Writing well for the web
            </Accordion.SectionButton>
          </Accordion.SectionHeading>
        </Accordion.SectionHeader>
        <Accordion.SectionContent id="accordion-default-content-1">
          <Body>This is the content for Writing well for the web.</Body>
        </Accordion.SectionContent>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.SectionHeader>
          <Accordion.SectionHeading>
            <Accordion.SectionButton id="accordion-default-heading-2">
              Writing well for specialists
            </Accordion.SectionButton>
          </Accordion.SectionHeading>
        </Accordion.SectionHeader>
        <Accordion.SectionContent id="accordion-default-content-2">
          <Body>This is the content for Writing well for specialists.</Body>
        </Accordion.SectionContent>
      </Accordion.Section>
    </Accordion.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
