import { render, screen } from '@testing-library/react';
import { BackLink } from '.';

describe('BackLink', () => {
  test('inverse adds the inverse modifier', () => {
    render(<BackLink inverse />);
    expect(screen.getByRole('link', { name: 'Back' })).toHaveClass('govuk-back-link--inverse');
  });

  test('asChild renders the child, with no default href or text', () => {
    const { container } = render(
      <BackLink asChild>
        <a href="/previous">Previous step</a>
      </BackLink>,
    );
    expect(container.innerHTML).toBe(
      '<a href="/previous" class="govuk-back-link">Previous step</a>',
    );
  });
});
