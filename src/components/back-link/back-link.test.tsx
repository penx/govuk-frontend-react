import { render, screen } from '@testing-library/react';
import { BackLink } from '.';

describe('BackLink', () => {
  test('inverse adds the inverse modifier', () => {
    render(<BackLink inverse />);
    expect(screen.getByRole('link', { name: 'Back' })).toHaveClass('govuk-back-link--inverse');
  });
});
