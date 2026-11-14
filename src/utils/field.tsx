import type { ReactNode } from 'react';
import { ErrorMessage, type ErrorMessageProps } from '../components/error-message';
import { Hint, type HintProps } from '../components/hint';
import { isPropsObject } from './is-props-object';

export type ContentOrProps<P> = ReactNode | P;

export function toProps<P extends { children?: ReactNode }>(value: ContentOrProps<P>): P {
  return isPropsObject<P>(value) ? value : ({ children: value } as P);
}

export function isSet(value: unknown): boolean {
  return value !== undefined && value !== null && value !== false && value !== '';
}

export function joinIds(...ids: Array<string | false | undefined>): string | undefined {
  return ids.filter(Boolean).join(' ') || undefined;
}

type FieldMessagesProps = {
  id: string | undefined;
  hint?: ContentOrProps<HintProps>;
  errorMessage?: ContentOrProps<ErrorMessageProps>;
};

export function fieldMessages({ id, hint, errorMessage }: FieldMessagesProps) {
  const hintId = isSet(hint) ? `${id}-hint` : undefined;
  const errorId = isSet(errorMessage) ? `${id}-error` : undefined;
  return {
    hintId,
    errorId,
    messages: (
      <>
        {hintId && <Hint id={hintId} {...toProps(hint)} />}
        {errorId && <ErrorMessage id={errorId} {...toProps(errorMessage)} />}
      </>
    ),
  };
}
