import { render, screen } from '@testing-library/react';
import * as Fieldset from '.';

describe('Fieldset.Legend', () => {
  test('size adds the legend size modifier', () => {
    render(<Fieldset.Legend size="l">Address</Fieldset.Legend>);
    expect(screen.getByText('Address')).toHaveClass('govuk-fieldset__legend--l');
  });
});
