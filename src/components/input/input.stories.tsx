import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/input/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/input';
import { FormGroup, LabelComposite } from '../..';
import { Input, InputField, InputPrefix, InputWrapper } from '.';

const meta = { title: 'Input', component: InputField } satisfies Meta<typeof InputField>;

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
      <InputWrapper>
        <InputPrefix>£</InputPrefix>
        <Input id="cost" name="cost" width={5} spellCheck={false} />
      </InputWrapper>
    </FormGroup>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
