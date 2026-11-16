import type { ComponentProps } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Link } from '.';

function RouterLink({ to, children, ...props }: ComponentProps<'a'> & { to: string }) {
  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
}

describe('Link', () => {
  test('asChild renders the child with the link classes merged', () => {
    const { container } = render(
      <Link asChild variant="muted">
        <RouterLink to="/guidance" className="app-link">
          Guidance
        </RouterLink>
      </Link>,
    );
    expect(container.innerHTML).toBe(
      '<a href="/guidance" class="govuk-link govuk-link--muted app-link">Guidance</a>',
    );
  });

  test('asChild runs both click handlers', () => {
    const onLinkClick = vi.fn();
    const onChildClick = vi.fn();
    render(
      <Link asChild onClick={onLinkClick}>
        <RouterLink to="/guidance" onClick={onChildClick}>
          Guidance
        </RouterLink>
      </Link>,
    );
    fireEvent.click(screen.getByRole('link', { name: 'Guidance' }));
    expect(onChildClick).toHaveBeenCalledOnce();
    expect(onLinkClick).toHaveBeenCalledOnce();
  });
});
