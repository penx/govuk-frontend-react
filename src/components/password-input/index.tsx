import type { ReactNode } from 'react';
import { isSet, joinIds } from '../../utils/field';
import { type FormGroupProps } from '../../objects/form-group';
import { ErrorMessage } from '../error-message';
import { Hint } from '../hint';
import { Label } from '../label';

import * as FieldParts from './field-parts';
import {
  Root,
  Wrapper,
  Input,
  Toggle,
  type RootProps,
  type WrapperProps,
  type InputProps,
  type ToggleProps,
} from './field-parts';

export { FieldParts };
export { Root, Wrapper, Input, Toggle };
export type { RootProps, WrapperProps, InputProps, ToggleProps };

export type FieldProps = Omit<InputProps, 'error'> &
  Omit<RootProps, keyof FormGroupProps> & {
    label?: ReactNode;
    hint?: ReactNode;
    errorMessage?: ReactNode;
  };

export function Field({
  id: idProp,
  name,
  label,
  hint,
  errorMessage,
  showPasswordText,
  hidePasswordText,
  showPasswordAriaLabelText,
  hidePasswordAriaLabelText,
  passwordShownAnnouncementText,
  passwordHiddenAnnouncementText,
  'aria-describedby': describedBy,
  ...props
}: FieldProps) {
  const id = idProp || name;
  const hintId = isSet(hint) ? `${id}-hint` : undefined;
  const errorId = isSet(errorMessage) ? `${id}-error` : undefined;

  return (
    <Root
      error={Boolean(errorId)}
      showPasswordText={showPasswordText}
      hidePasswordText={hidePasswordText}
      showPasswordAriaLabelText={showPasswordAriaLabelText}
      hidePasswordAriaLabelText={hidePasswordAriaLabelText}
      passwordShownAnnouncementText={passwordShownAnnouncementText}
      passwordHiddenAnnouncementText={passwordHiddenAnnouncementText}
    >
      <Label htmlFor={id}>{label}</Label>
      {hintId && <Hint id={hintId}>{hint}</Hint>}
      {errorId && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
      <Wrapper>
        <Input
          id={id}
          name={name}
          error={Boolean(errorId)}
          aria-describedby={joinIds(describedBy, hintId, errorId)}
          {...props}
        />
        <Toggle aria-controls={id} aria-label={showPasswordAriaLabelText}>
          {showPasswordText}
        </Toggle>
      </Wrapper>
    </Root>
  );
}
