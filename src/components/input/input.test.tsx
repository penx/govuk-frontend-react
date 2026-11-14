import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import * as Input from '.';

describe('Input', () => {
  test('label, hint and errorMessage can be content', () => {
    render(
      <Input.Root id="name" label="Name" hint="Your full name" errorMessage="Enter your name" />,
    );
    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveAccessibleDescription('Your full name Error: Enter your name');
  });

  test('a false errorMessage shows no error', () => {
    render(<Input.Root id="name" label="Name" errorMessage={false} />);
    expect(screen.getByRole('textbox')).not.toHaveClass('govuk-input--error');
  });

  test('forwards ref to the input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input.Root id="name" label="Name" ref={ref} />);
    expect(ref.current).toBe(screen.getByRole('textbox'));
  });
});
