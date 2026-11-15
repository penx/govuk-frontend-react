import { render, screen } from '@testing-library/react';
import * as Textarea from '.';

describe('Textarea.Field', () => {
  test('wires the label, hint and error message to the textarea', () => {
    render(
      <Textarea.Field
        name="detail"
        label="Detail"
        hint="Do not include personal information"
        errorMessage="Enter more detail"
      />,
    );
    const textarea = screen.getByRole('textbox', { name: 'Detail' });
    expect(textarea).toHaveAccessibleDescription(
      'Do not include personal information Error: Enter more detail',
    );
    expect(textarea).toHaveClass('govuk-textarea--error');
  });
});
