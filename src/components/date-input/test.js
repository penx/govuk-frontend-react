/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { render } from 'react-testing-library';
import userEvent from 'user-event';

import DateInput from '.';

it('accepts hint prop as a string', () => {
  const { getByText } = render(<DateInput hint="Example Hint" />);

  expect(getByText('Example Hint')).toBeVisible();
});

it('accepts hint prop as a React element', () => {
  const { getByText } = render(<DateInput hint={<span>Example Hint</span>} />);

  expect(getByText('Example Hint')).toBeVisible();
});

it('accepts error message prop as a string', () => {
  const { getByText } = render(<DateInput errorMessage="Example Error" />);

  expect(getByText('Example Error')).toBeVisible();
});

it('accepts error message prop as a React element', () => {
  const { getByText } = render(<DateInput hint={<span>Example Error</span>} />);

  expect(getByText('Example Error')).toBeVisible();
});

it('accepts items with ids', () => {
  const { getByLabelText, getByTitle } = render(
    <form title="Form">
      <label htmlFor="my-element">Example</label>
      <DateInput
        items={[
          {
            name: 'day',
            placeholder: 'dd'
          },
          {
            name: 'test',
            id: 'my-element',
            placeholder: 'mm'
          },
          {
            name: 'year',
            placeholder: 'yyyy'
          }
        ]}
      />
    </form>
  );
  const form = getByTitle('Form');
  const monthField = getByLabelText('Example');
  userEvent.type(monthField, '1234');
  expect(form).toHaveFormValues({ test: 1234 });
});

it('accepts items without id and date-input has no id', () => {
  const { getByPlaceholderText, getByTitle } = render(
    <form title="Form">
      <DateInput
        items={[
          {
            name: 'day',
            placeholder: 'dd'
          },
          {
            name: 'test',
            placeholder: 'mm'
          },
          {
            name: 'year',
            placeholder: 'yyyy'
          }
        ]}
      />
    </form>
  );
  const form = getByTitle('Form');
  const monthField = getByPlaceholderText('mm');
  userEvent.type(monthField, '1234');
  expect(form).toHaveFormValues({ test: 1234 });
});

it('accepts items without id and no name and date-input has no id', () => {
  const { getByPlaceholderText, getByTitle } = render(
    <form title="Form">
      <DateInput
        items={[
          {
            placeholder: 'dd'
          },
          {
            placeholder: 'mm'
          },
          {
            placeholder: 'yyyy'
          }
        ]}
      />
    </form>
  );
  const form = getByTitle('Form');
  const monthField = getByPlaceholderText('mm');
  expect(monthField).not.toHaveAttribute('id');
});

it('shows a field error when supplied with a fieldErrors prop', () => {
  const { getByPlaceholderText } = render(
    <form title="Form">
      <DateInput
        fieldErrors={['month']}
        items={[
          {
            name: 'day',
            placeholder: 'dd'
          },
          {
            name: 'month',
            placeholder: 'mm'
          },
          {
            name: 'year',
            placeholder: 'yyyy'
          }
        ]}
      />
    </form>
  );
  const monthField = getByPlaceholderText('mm');
  expect(monthField).toHaveClass('govuk-input--error');
});
