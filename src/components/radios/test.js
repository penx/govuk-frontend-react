// id but no item.id
import * as React from 'react';
import { render } from 'react-testing-library';
import userEvent from 'user-event';
import Radios from '.';

it('accepts items without id and radios has id', () => {
  const { getByLabelText, getByTitle } = render(
    <form title="Form">
      <Radios
        id="foo"
        name="bar"
        items={[
          {
            value: 'y',
            children: 'yarp'
          },
          {
            value: 'n',
            children: 'nope'
          },
          {
            value: 'm',
            children: 'mabes'
          }
        ]}
      />
    </form>
  );
  const form = getByTitle('Form');
  const noRadio = getByLabelText('nope');
  userEvent.click(noRadio);
  expect(form).toHaveFormValues({ bar: 'n' });
});

it('accepts error message prop as a string', () => {
  const { getByText } = render(<Radios errorMessage="Example Error" />);

  expect(getByText('Example Error')).toBeVisible();
});

it('accepts error message prop as a React element', () => {
  const { getByText } = render(<Radios errorMessage={<span>Example Error</span>} />);

  expect(getByText('Example Error')).toBeVisible();
});
