import { render, screen } from '@testing-library/react';
import * as LanguageNavigation from '.';

describe('LanguageNavigation.Root', () => {
  test('inverse adds the inverse modifier', () => {
    render(<LanguageNavigation.Root inverse />);
    expect(screen.getByRole('navigation', { name: 'Language' })).toHaveClass(
      'govuk-language-navigation--inverse',
    );
  });
});
