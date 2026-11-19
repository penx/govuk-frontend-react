import {
  ErrorMessageComposite,
  FileUpload,
  FileUploadWrapper,
  FormGroup,
  Hint,
  LabelComposite,
} from '../../src';
import type { Translation } from '../../src/utils/i18n';
import {
  attributes,
  className,
  content,
  describedBy,
  errorMessage,
  label,
  optional,
  subcomponent,
  type Options,
} from './helpers';

const texts = [
  'chooseFilesButtonText',
  'noFileChosenText',
  'multipleFilesChosenText',
  'dropInstructionText',
  'enteredDropZoneText',
  'leftDropZoneText',
] as const;

export default function fileUpload(options: Options) {
  const id = (options.id || options.name) as string;
  const hint = subcomponent(options.hint);
  const error = errorMessage(options.errorMessage);
  const hintId = hint && `${id}-hint`;
  const errorId = error && `${id}-error`;
  const group = (options.formGroup as Options | undefined) ?? {};
  const control = (
    <FileUpload
      id={id}
      {...optional('name', options.name)}
      {...optional('disabled', options.disabled || undefined)}
      {...optional('multiple', options.multiple || undefined)}
      {...optional('aria-describedby', describedBy(options.describedBy, hintId, errorId))}
      error={Boolean(error)}
      className={className(options)}
      {...attributes(options.attributes)}
    />
  );

  return (
    <FormGroup
      error={Boolean(error)}
      className={className(group)}
      {...attributes(group.attributes)}
    >
      <LabelComposite htmlFor={id} {...label(options.label)} />
      {hint && <Hint id={hintId} {...hint} />}
      {error && <ErrorMessageComposite id={errorId} {...error} />}
      {content(group.beforeInput as Options | undefined)}
      {options.javascript ? (
        <FileUploadWrapper
          {...Object.assign(
            {},
            ...texts.map((key) => optional(key, options[key] as Translation | undefined)),
          )}
          className={(options.wrapperClasses as string) || undefined}
          {...attributes(options.wrapperAttributes)}
        >
          {control}
        </FileUploadWrapper>
      ) : (
        control
      )}
      {content(group.afterInput as Options | undefined)}
    </FormGroup>
  );
}
