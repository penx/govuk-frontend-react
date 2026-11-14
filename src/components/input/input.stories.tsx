import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/input/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/input';
import { ErrorMessage, FormGroup, Hint, Label } from '../..';
import * as Input from '.';

const meta = { title: 'Input', component: Input.Field } satisfies Meta<typeof Input.Field>;

export default meta;

export const Field: StoryObj<typeof meta> = {
  args: {
    name: 'cost',
    label: 'Cost',
    hint: 'In pounds',
    errorMessage: 'Enter a cost',
    prefix: '£',
  },
};

export const Parts = {
  render: () => (
    <FormGroup error>
      <Label htmlFor="cost">Cost</Label>
      <Hint id="cost-hint">In pounds</Hint>
      <ErrorMessage id="cost-error">Enter a cost</ErrorMessage>
      <Input.Wrapper>
        <Input.Prefix>£</Input.Prefix>
        <Input.Root id="cost" name="cost" error aria-describedby="cost-hint cost-error" />
      </Input.Wrapper>
    </FormGroup>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
