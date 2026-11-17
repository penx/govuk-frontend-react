import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { isSet, joinIds, type LabelFieldProps } from '../../utils/field';
import { i18nAttributes, type Translation } from '../../utils/i18n';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessageComposite } from '../error-message';
import { Hint } from '../hint';
import { LabelComposite } from '../label';

export type ControlProps = Omit<ComponentProps<'input'>, 'type' | 'value' | 'defaultValue'> & {
  error?: boolean;
};

export function Control({ error, className, ...props }: ControlProps) {
  return (
    <input
      className={clsx('govuk-file-upload', error && 'govuk-file-upload--error', className)}
      type="file"
      {...props}
    />
  );
}

export type WrapperProps = ComponentProps<'div'> & {
  /** The text of the button that opens the file picker. Default is `"Choose file"`. */
  chooseFilesButtonText?: string;
  /** The text displayed when no file has been chosen by the user. Default is `"No file chosen"`. */
  noFileChosenText?: string;
  /** The text displayed when multiple files have been chosen by the user. The component will replace the `%{count}` placeholder with the number of files selected. [Our pluralisation rules apply to this macro option](https://frontend.design-system.service.gov.uk/localise-govuk-frontend/#understanding-pluralisation-rules). */
  multipleFilesChosenText?: Translation;
  /** The text informing users they can drop files. Default is `"or drop file"`. */
  dropInstructionText?: string;
  /** The text announced by assistive technology when user drags files and enters the drop zone. Default is `"Entered drop zone"`. */
  enteredDropZoneText?: string;
  /** The text announced by assistive technology when user drags files and leaves the drop zone without dropping. Default is `"Left drop zone"`. */
  leftDropZoneText?: string;
};

export function Wrapper({
  chooseFilesButtonText,
  noFileChosenText,
  multipleFilesChosenText,
  dropInstructionText,
  enteredDropZoneText,
  leftDropZoneText,
  className,
  ...props
}: WrapperProps) {
  return (
    <div
      className={clsx('govuk-file-upload-wrapper', className)}
      data-module="govuk-file-upload"
      {...i18nAttributes('choose-files-button', chooseFilesButtonText)}
      {...i18nAttributes('no-file-chosen', noFileChosenText)}
      {...i18nAttributes('multiple-files-chosen', multipleFilesChosenText)}
      {...i18nAttributes('drop-instruction', dropInstructionText)}
      {...i18nAttributes('entered-drop-zone', enteredDropZoneText)}
      {...i18nAttributes('left-drop-zone', leftDropZoneText)}
      {...props}
    />
  );
}

export type FieldProps = LabelFieldProps &
  Omit<ControlProps, 'error'> &
  Omit<WrapperProps, keyof ComponentProps<'div'>> & {
    /** The label used by the file upload component. */
    label?: ReactNode;
    /** Can be used to add a hint to the file upload component. */
    hint?: ReactNode;
    /** Can be used to add an error message to the file upload component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. */
    errorMessage?: ReactNode;
    /** Can be used to enable JavaScript enhancements for the component. */
    javascript?: boolean;
  };

/**
 * Help users select and upload a file.
 *
 * @see https://design-system.service.gov.uk/components/file-upload/
 */
export function Field({
  id: idProp,
  name,
  label,
  labelSize,
  labelIsPageHeading,
  hint,
  errorMessage,
  javascript,
  chooseFilesButtonText,
  noFileChosenText,
  multipleFilesChosenText,
  dropInstructionText,
  enteredDropZoneText,
  leftDropZoneText,
  'aria-describedby': describedBy,
  ...props
}: FieldProps) {
  const id = idProp || name;
  const hintId = isSet(hint) ? `${id}-hint` : undefined;
  const errorId = isSet(errorMessage) ? `${id}-error` : undefined;
  const control = (
    <Control
      id={id}
      name={name}
      error={Boolean(errorId)}
      aria-describedby={joinIds(describedBy, hintId, errorId)}
      {...props}
    />
  );

  return (
    <FormGroup error={Boolean(errorId)}>
      <LabelComposite htmlFor={id} size={labelSize} isPageHeading={labelIsPageHeading}>
        {label}
      </LabelComposite>
      {hintId && <Hint id={hintId}>{hint}</Hint>}
      {errorId && <ErrorMessageComposite id={errorId}>{errorMessage}</ErrorMessageComposite>}
      {javascript ? (
        <Wrapper
          chooseFilesButtonText={chooseFilesButtonText}
          noFileChosenText={noFileChosenText}
          multipleFilesChosenText={multipleFilesChosenText}
          dropInstructionText={dropInstructionText}
          enteredDropZoneText={enteredDropZoneText}
          leftDropZoneText={leftDropZoneText}
        >
          {control}
        </Wrapper>
      ) : (
        control
      )}
    </FormGroup>
  );
}
