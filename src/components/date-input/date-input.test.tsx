import { render, screen } from '@testing-library/react';
import * as DateInput from '.';

describe('DateInput.Field', () => {
  test('renders day, month and year inputs wired to the hint and error message', () => {
    render(
      <DateInput.Field
        id="dob"
        namePrefix="dob"
        legend="What is your date of birth?"
        hint="For example, 31 3 1980"
        errorMessage="Enter your date of birth"
      />,
    );
    const group = screen.getByRole('group', { name: 'What is your date of birth?' });
    expect(group).toHaveAttribute('aria-describedby', 'dob-hint dob-error');
    const year = screen.getByRole('textbox', { name: 'Year' });
    expect(year).toHaveAttribute('name', 'dob-year');
    expect(year).toHaveClass('govuk-input--width-4', 'govuk-input--error');
    expect(screen.getByRole('textbox', { name: 'Day' })).toHaveAttribute('inputmode', 'numeric');
  });

  test('redisplays submitted values', () => {
    render(<DateInput.Field id="dob" legend="Date" values={{ day: '31', month: '3' }} />);
    expect(screen.getByRole('textbox', { name: 'Day' })).toHaveValue('31');
    expect(screen.getByRole('textbox', { name: 'Year' })).toHaveValue('');
  });
});
