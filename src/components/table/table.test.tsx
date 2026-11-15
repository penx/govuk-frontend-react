import { render, screen } from '@testing-library/react';
import * as Table from '.';

describe('Table.Root', () => {
  test('smallTextUntilTablet adds its modifier', () => {
    render(<Table.Root smallTextUntilTablet />);
    expect(screen.getByRole('table')).toHaveClass('govuk-table--small-text-until-tablet');
  });
});
