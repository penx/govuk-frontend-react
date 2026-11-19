import { render, screen } from '@testing-library/react';
import { SelectField } from '.';

describe('SelectField', () => {
  test('wires the label, hint and error message to the select', () => {
    render(
      <SelectField
        name="sort"
        label="Sort by"
        hint="Choose an order"
        errorMessage="Select an order"
      >
        <option>Newest</option>
      </SelectField>,
    );
    const select = screen.getByRole('combobox', { name: 'Sort by' });
    expect(select).toHaveAccessibleDescription('Choose an order Error: Select an order');
    expect(select).toHaveClass('govuk-select--error');
  });
});
