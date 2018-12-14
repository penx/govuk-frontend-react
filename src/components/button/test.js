import ReactDOM from 'react-dom';
import {
  render,
} from 'react-testing-library';
import 'jest-dom/extend-expect';

import defaultFixture, { hrefAndRole, buttonWithType } from './fixtures';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(defaultFixture, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('hrefAndRole', () => {
  const { getByText } = render(hrefAndRole);
  const button = getByText('HREF and role');
  expect(button).toHaveAttribute('href', '#test');
  expect(button).toHaveAttribute('role', 'presentation');
  expect(button.tagName).toBe('A');
});

it('buttonWithType', () => {
  const { getByText } = render(buttonWithType);
  const button = getByText('Button with type');
  expect(button).toHaveAttribute('type', 'button');
  expect(button.tagName).toBe('BUTTON');
});
