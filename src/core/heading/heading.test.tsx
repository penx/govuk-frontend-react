import { render, screen } from '@testing-library/react';
import { Heading } from '.';

test('renders the heading level separately from its size', () => {
  render(
    <Heading size="xl" headingLevel={1}>
      Title
    </Heading>,
  );
  expect(screen.getByRole('heading', { level: 1 })).toHaveClass('govuk-heading-xl');
});
