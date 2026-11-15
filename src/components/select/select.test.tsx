import { render, screen } from '@testing-library/react';
import * as Select from '.';

describe('Select.Field', () => {
  test('wires the label, hint and error message to the select', () => {
    render(
      <Select.Field
        name="sort"
        label="Sort by"
        hint="Choose an order"
        errorMessage="Select an order"
      >
        <option>Newest</option>
      </Select.Field>,
    );
    const select = screen.getByRole('combobox', { name: 'Sort by' });
    expect(select).toHaveAccessibleDescription('Choose an order Error: Select an order');
    expect(select).toHaveClass('govuk-select--error');
  });
});
