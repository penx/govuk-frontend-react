import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import userEvent from 'user-event';

import defaultFixture from './fixtures';
import Input from '.';

afterEach(cleanup);

// TODO: selecting a nav item should close the nav

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(defaultFixture, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders with strings', () => {
  const { getByText, getByPlaceholderText } = render(
    <div>
      <Input
        placeholder="placeholder 1"
        label="Label 1"
        hint="Hint 1"
        errorMessage="Error 1"
        id="test-1"
      />
      <Input
        placeholder="placeholder 2"
        label="Label 2"
        hint="Hint 2"
        errorMessage="Error 2"
        id="test-2"
      />
      <Input
        placeholder="placeholder 3"
        label="Label 3"
        hint="Hint 3"
        errorMessage="Error 3"
        id="test-3"
      />
    </div>
  );
  const label = getByText('Label 2');
  const input = getByPlaceholderText('placeholder 2');
  userEvent.click(label);
  expect(input).toHaveFocus();
});

it('renders with React content', () => {
  const { getByText, getByPlaceholderText } = render(
    <div>
      <Input
        placeholder="placeholder 1"
        label={<span>Label 1</span>}
        hint={<span>Hint 1</span>}
        errorMessage={<span>Error</span>}
        id="test-1"
      />
      <Input
        placeholder="placeholder 2"
        label={<span>Label 2</span>}
        hint={<span>Hint 2</span>}
        errorMessage={<span>Error</span>}
        id="test-2"
      />
      <Input
        placeholder="placeholder 3"
        label={<span>Label 3</span>}
        hint={<span>Hint 3</span>}
        errorMessage={<span>Error</span>}
        id="test-3"
      />
    </div>
  );
  const label = getByText('Label 2');
  const input = getByPlaceholderText('placeholder 2');
  userEvent.click(label);
  expect(input).toHaveFocus();
});
