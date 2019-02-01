import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Fieldset from '.';

it('renders with a custom class on legend', () => {
  const { getByText } = render(<Fieldset legend={{ className: 'test', children: 'legend' }} />);
  expect(getByText('legend')).toHaveClass('test');
});

it('renders with a modifier class on legend', () => {
  const { getByText } = render(
    <Fieldset legend={{ className: 'govuk-fieldset__legend--xl', children: 'legend' }} />
  );
  expect(getByText('legend')).toHaveClass('govuk-fieldset__legend--xl');
});

it('renders with a legend as a page heading', () => {
  const { getByText } = render(<Fieldset legend={{ isPageHeading: true, children: 'legend' }} />);
  expect(getByText('legend')).toHaveClass('govuk-fieldset__heading');
});
