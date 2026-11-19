import { render, screen } from '@testing-library/react';
import { FileUploadField } from '.';

describe('FileUploadField', () => {
  test('wires the hint and error message, and wraps the input when javascript is set', () => {
    render(
      <FileUploadField
        name="photo"
        label="Upload a photo"
        hint="JPG or PNG"
        errorMessage="Select a photo"
        javascript
      />,
    );
    const input = screen.getByLabelText('Upload a photo');
    expect(input).toHaveAttribute('aria-describedby', 'photo-hint photo-error');
    expect(input).toHaveClass('govuk-file-upload--error');
    expect(input.parentElement).toHaveAttribute('data-module', 'govuk-file-upload');
  });

  test('passes translations to the wrapper', () => {
    render(
      <FileUploadField
        name="photo"
        label="Llun"
        javascript
        chooseFilesButtonText="Dewiswch ffeil"
      />,
    );
    expect(screen.getByLabelText('Llun').parentElement).toHaveAttribute(
      'data-i18n.choose-files-button',
      'Dewiswch ffeil',
    );
  });
});
