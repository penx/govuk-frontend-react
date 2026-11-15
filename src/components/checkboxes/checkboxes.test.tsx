import { render, screen } from '@testing-library/react';
import * as Checkboxes from '.';

describe('Checkboxes.Field', () => {
  test('wires the hint and error message to the fieldset', () => {
    render(
      <Checkboxes.Field
        idPrefix="contact"
        legend="How should we contact you?"
        hint="Select one option"
        errorMessage="Select how to contact you"
        aria-describedby="extra"
      >
        <Checkboxes.Item>
          <Checkboxes.Input id="contact" name="contact" value="email" />
          <Checkboxes.Label htmlFor="contact">Email</Checkboxes.Label>
        </Checkboxes.Item>
      </Checkboxes.Field>,
    );
    const group = screen.getByRole('group', {
      name: 'How should we contact you?',
    });
    expect(group).toHaveAttribute('aria-describedby', 'extra contact-hint contact-error');
    expect(group).toHaveAccessibleDescription('Select one option Error: Select how to contact you');
    expect(screen.getByRole('checkbox', { name: 'Email' })).toBeInTheDocument();
  });
});
