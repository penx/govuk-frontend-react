import { render, screen } from '@testing-library/react';
import * as CharacterCount from '.';

describe('CharacterCount.Field', () => {
  test('describes the textarea with the count message, hint and error message', () => {
    render(
      <CharacterCount.Field
        name="detail"
        label="Detail"
        hint="Keep it short"
        errorMessage="Enter detail"
        maxWords={50}
      />,
    );
    const textarea = screen.getByRole('textbox', { name: 'Detail' });
    expect(textarea).toHaveAttribute('aria-describedby', 'detail-info detail-hint detail-error');
    expect(screen.getByText('You can enter up to 50 words')).toHaveAttribute('id', 'detail-info');
    expect(textarea.closest('.govuk-character-count')).toHaveAttribute('data-count-type', 'words');
  });

  test('uses the translated description for the count message', () => {
    render(
      <CharacterCount.Field
        name="detail"
        label="Manylion"
        maxLength={200}
        textareaDescriptionText="Gallwch roi hyd at %{count} nod"
      />,
    );
    expect(screen.getByText('Gallwch roi hyd at 200 nod')).toHaveAttribute('id', 'detail-info');
  });
});
