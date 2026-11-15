import { render, screen } from '@testing-library/react';
import * as ServiceNavigation from '.';

describe('ServiceNavigation.Root', () => {
  test('inverse adds the inverse modifier', () => {
    render(<ServiceNavigation.Root as="section" inverse />);
    expect(screen.getByRole('region', { name: 'Service information' })).toHaveClass(
      'govuk-service-navigation--inverse',
    );
  });
});
