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
