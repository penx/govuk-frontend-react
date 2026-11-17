import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/input/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/input';
import { FormGroup, LabelComposite } from '../..';
import * as Input from '.';

const meta = { title: 'Input', component: Input.Field } satisfies Meta<typeof Input.Field>;

export default meta;

export const Field: StoryObj<typeof meta> = {
  args: {
    id: 'event-name',
    name: 'eventName',
    label: 'What is the name of the event?',
    labelSize: 'l',
    labelIsPageHeading: true,
  },
};

export const Parts = {
  render: () => (
    <FormGroup>
      <LabelComposite htmlFor="cost" size="l" isPageHeading>
        What is the cost in pounds?
      </LabelComposite>
      <Input.Wrapper>
        <Input.Prefix>£</Input.Prefix>
        <Input.Control id="cost" name="cost" width={5} spellCheck={false} />
      </Input.Wrapper>
    </FormGroup>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
