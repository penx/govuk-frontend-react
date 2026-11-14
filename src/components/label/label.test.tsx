import { render, screen } from '@testing-library/react';
import { Label } from '.';

test('size adds the label size modifier', () => {
  render(
    <Label htmlFor="name" size="l">
      Name
    </Label>,
  );
  expect(screen.getByText('Name')).toHaveClass('govuk-label--l');
});
