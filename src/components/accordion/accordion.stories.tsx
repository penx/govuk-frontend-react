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
    <Accordion.Composite id="accordion-default">
      <Accordion.SectionComposite
        accordionId="accordion-default"
        index={1}
        heading="Writing well for the web"
      >
        <Body>This is the content for Writing well for the web.</Body>
      </Accordion.SectionComposite>
      <Accordion.SectionComposite
        accordionId="accordion-default"
        index={2}
        heading="Writing well for specialists"
      >
        <Body>This is the content for Writing well for specialists.</Body>
      </Accordion.SectionComposite>
      <Accordion.SectionComposite
        accordionId="accordion-default"
        index={3}
        heading="Know your audience"
      >
        <Body>This is the content for Know your audience.</Body>
      </Accordion.SectionComposite>
      <Accordion.SectionComposite
        accordionId="accordion-default"
        index={4}
        heading="How people read"
      >
        <Body>This is the content for How people read.</Body>
      </Accordion.SectionComposite>
    </Accordion.Composite>
  ),
};

export const WithParts = {
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
      <Accordion.Section>
        <Accordion.SectionHeader>
          <Accordion.SectionHeading>
            <Accordion.SectionButton id="accordion-default-heading-3">
              Know your audience
            </Accordion.SectionButton>
          </Accordion.SectionHeading>
        </Accordion.SectionHeader>
        <Accordion.SectionContent id="accordion-default-content-3">
          <Body>This is the content for Know your audience.</Body>
        </Accordion.SectionContent>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.SectionHeader>
          <Accordion.SectionHeading>
            <Accordion.SectionButton id="accordion-default-heading-4">
              How people read
            </Accordion.SectionButton>
          </Accordion.SectionHeading>
        </Accordion.SectionHeader>
        <Accordion.SectionContent id="accordion-default-content-4">
          <Body>This is the content for How people read.</Body>
        </Accordion.SectionContent>
      </Accordion.Section>
    </Accordion.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
