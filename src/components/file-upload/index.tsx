import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { isSet, joinIds } from '../../utils/field';
import { i18nAttributes, type Translation } from '../../utils/i18n';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessage } from '../error-message';
import { Hint } from '../hint';
import { Label } from '../label';

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
  chooseFilesButtonText?: string;
  noFileChosenText?: string;
  multipleFilesChosenText?: Translation;
  dropInstructionText?: string;
  enteredDropZoneText?: string;
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

export type FieldProps = Omit<ControlProps, 'error'> &
  Omit<WrapperProps, keyof ComponentProps<'div'>> & {
    label?: ReactNode;
    hint?: ReactNode;
    errorMessage?: ReactNode;
    javascript?: boolean;
  };

export function Field({
  id: idProp,
  name,
  label,
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
      <Label htmlFor={id}>{label}</Label>
      {hintId && <Hint id={hintId}>{hint}</Hint>}
      {errorId && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
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
