import { render, screen } from '@testing-library/react';
import { MainWrapper } from '.';

test('adds the size and auto spacing modifiers', () => {
  render(<MainWrapper size="l" autoSpacing />);
  expect(screen.getByRole('main')).toHaveClass(
    'govuk-main-wrapper govuk-main-wrapper--l govuk-main-wrapper--auto-spacing',
  );
});
