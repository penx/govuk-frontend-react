import { render, screen } from '@testing-library/react';
import * as Radios from '.';

describe('Radios.Field', () => {
  test('wires the hint and error message to the fieldset', () => {
    render(
      <Radios.Field
        idPrefix="contact"
        legend="How should we contact you?"
        hint="Select one option"
        errorMessage="Select how to contact you"
        aria-describedby="extra"
      >
        <Radios.Item>
          <Radios.Input id="contact" name="contact" value="email" />
          <Radios.Label htmlFor="contact">Email</Radios.Label>
        </Radios.Item>
      </Radios.Field>,
    );
    const group = screen.getByRole('group', {
      name: 'How should we contact you?',
    });
    expect(group).toHaveAttribute('aria-describedby', 'extra contact-hint contact-error');
    expect(group).toHaveAccessibleDescription('Select one option Error: Select how to contact you');
    expect(screen.getByRole('radio', { name: 'Email' })).toBeInTheDocument();
  });
});
