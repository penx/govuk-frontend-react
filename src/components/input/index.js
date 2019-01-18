// @flow

import * as React from 'react';
// import type { ComponentType } from 'react';
import cx from 'classnames';

import styles from './_input.module.scss';

import ErrorMessage from '../error-message';
import Hint from '../hint';
import Label from '../label';

// TODO: if id not set, wrap label?
// TODO: flow types

type Props = React.ElementProps<'input'> & {
  className: string,
  type?: string,
  errorMessage?: string | React.Element<any> | React.ElementProps<typeof Label>,
  label: string | React.Element<any> | React.ElementProps<typeof Label>,
  // id,
  hint?: string | React.Element<any> | React.ElementProps<typeof Label>,
  formGroup?: {
    className?: string
  }
};

const Input = ({ className, errorMessage, label, id, hint, formGroup = {}, ...props }: Props) => {
  let describedBy;
  if (hint) {
    describedBy = `${id}-hint`;
  }
  if (errorMessage) {
    describedBy = describedBy ? `${describedBy} ${id}-error` : `${id}-error`;
  }
  return (
    <div
      className={cx(
        styles['govuk-form-group'],
        errorMessage && styles['govuk-form-group--error'],
        formGroup.className
      )}
    >
      <Label
        htmlFor={id}
        {...(typeof label !== 'object' || React.isValidElement(label)
          ? { children: label }
          : label)}
      />
      {hint && (
        <Hint
          id={`${id}-hint`}
          {...(typeof hint !== 'object' || React.isValidElement(hint) ? { children: hint } : hint)}
        />
      )}
      {errorMessage && (
        <ErrorMessage
          id={`${id}-error`}
          {...(typeof errorMessage !== 'object' || React.isValidElement(errorMessage)
            ? { children: errorMessage }
            : errorMessage)}
        />
      )}
      <input
        id={id}
        className={cx(
          styles['govuk-input'],
          errorMessage && styles['govuk-input--error'],
          className
        )}
        aria-describedby={describedBy}
        {...props}
      />
    </div>
  );
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
