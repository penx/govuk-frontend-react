import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Input, InputField } from '.';

describe('InputField', () => {
  test('wires the label, hint and error message to the input', () => {
    render(
      <InputField
        name="name"
        label="Name"
        hint="Your full name"
        errorMessage="Enter your name"
        aria-describedby="extra"
      />,
    );
    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveAttribute('id', 'name');
    expect(input).toHaveAttribute('aria-describedby', 'extra name-hint name-error');
    expect(input).toHaveAccessibleDescription('Your full name Error: Enter your name');
    expect(input).toHaveClass('govuk-input--error');
  });

  test('an aria-describedby that already names the error message, as form libraries pass, reads it once', () => {
    render(
      <InputField
        name="name"
        label="Name"
        errorMessage="Enter your name"
        aria-describedby="name-error"
      />,
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'name-error');
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Error: Enter your name');
  });

  test('a false errorMessage shows no error', () => {
    render(<InputField id="name" label="Name" errorMessage={false} />);
    expect(screen.getByRole('textbox')).not.toHaveClass('govuk-input--error');
  });

  test('forwards ref to the input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<InputField id="name" label="Name" ref={ref} />);
    expect(ref.current).toBe(screen.getByRole('textbox'));
  });
});

describe('Input', () => {
  test('width and extraLetterSpacing add their modifiers', () => {
    render(<Input aria-label="Code" width={4} extraLetterSpacing />);
    const input = screen.getByRole('textbox', { name: 'Code' });
    expect(input).toHaveClass('govuk-input--width-4', 'govuk-input--extra-letter-spacing');
    expect(input).not.toHaveAttribute('width');
  });
});
