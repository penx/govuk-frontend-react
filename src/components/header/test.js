import ReactDOM from 'react-dom';
import { render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import defaultFixture, { withNavigation } from './fixtures';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(defaultFixture, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('opens on click', () => {
  const { getByText, getByLabelText } = render(withNavigation);
  const menu = getByText('Menu');
  const tln = getByLabelText('Top Level Navigation');
  fireEvent.click(menu);

  expect(menu).toHaveClass('govuk-header__menu-button--open');
  expect(tln).toHaveClass('govuk-header__navigation--open');
});

// TODO: selecting a nav item should close the nav
