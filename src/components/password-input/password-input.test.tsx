import { render, screen } from '@testing-library/react';
import * as PasswordInput from '.';

describe('PasswordInput.Field', () => {
  test('wires the toggle, hint and error message to the input', () => {
    const { container } = render(
      <PasswordInput.Field
        name="password"
        label="Password"
        hint="At least 8 characters"
        errorMessage="Enter a password"
      />,
    );
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('aria-describedby', 'password-hint password-error');
    expect(container.querySelector('button')).toHaveAttribute('aria-controls', 'password');
  });

  test('uses the translated show text on the toggle', () => {
    const { container } = render(
      <PasswordInput.Field
        name="password"
        label="Cyfrinair"
        showPasswordText="Datguddio"
        showPasswordAriaLabelText="Datgelu cyfrinair"
      />,
    );
    const toggle = container.querySelector('button');
    expect(toggle).toHaveAttribute('aria-label', 'Datgelu cyfrinair');
    expect(toggle).toHaveTextContent('Datguddio');
    expect(container.querySelector('.govuk-password-input')).toHaveAttribute(
      'data-i18n.show-password',
      'Datguddio',
    );
  });
});
