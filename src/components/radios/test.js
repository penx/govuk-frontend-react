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

it('merges focus and blur events', () => {
  const blur = jest.fn();
  const focus = jest.fn();

  const { getByLabelText, getByTitle, getByText } = render(
    <form title="Form">
      <Radios
        id="test-radios"
        onBlur={blur}
        onFocus={focus}
        name="radios"
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
      <button type="button">click me</button>
    </form>
  );

  const yarp = getByLabelText('yarp');
  const nope = getByLabelText('nope');
  const mabes = getByLabelText('mabes');
  const form = getByTitle('Form');
  const button = getByText('click me');

  expect(focus).toHaveBeenCalledTimes(0);
  userEvent.click(yarp);
  expect(focus).toHaveBeenCalledTimes(1);
  userEvent.click(mabes);
  expect(focus).toHaveBeenCalledTimes(1);
  userEvent.click(nope);
  expect(form).toHaveFormValues({ radios: 'n' });
  expect(focus).toHaveBeenCalledTimes(1);
  expect(blur).toHaveBeenCalledTimes(0);

  userEvent.click(button);

  expect(blur).toHaveBeenCalledTimes(1);
});
