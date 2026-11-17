import { render, screen } from '@testing-library/react';
import * as Breadcrumbs from '.';

describe('Breadcrumbs.Root', () => {
  test('inverse adds the inverse modifier', () => {
    render(<Breadcrumbs.Root inverse />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveClass(
      'govuk-breadcrumbs--inverse',
    );
  });
});

describe('Breadcrumbs.Link', () => {
  test('asChild renders the child with the link class', () => {
    const { container } = render(
      <Breadcrumbs.Link asChild>
        <a href="/section">Section</a>
      </Breadcrumbs.Link>,
    );
    expect(container.innerHTML).toBe(
      '<a href="/section" class="govuk-breadcrumbs__link">Section</a>',
    );
  });
});
