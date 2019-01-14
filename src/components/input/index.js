import React from 'react';
// import type { ComponentType } from 'react';
import cx from 'classnames';

import styles from './_input.module.scss';

import ErrorMessage from '../error-message';
import Hint from '../hint';
import Label from '../label';

// TODO: if id not set, wrap label?

// TODO: extract utility module
const isString = str => typeof str === 'string' || str instanceof String;

const Input = ({ className, errorMessage, label, id, hint, formGroup = {}, ...props }) => {
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
      <Label htmlFor={id} {...(isString(label) ? { children: label } : label)} />
      {hint && <Hint id={`${id}-hint`} {...(isString(hint) ? { children: hint } : hint)} />}
      {errorMessage && (
        <ErrorMessage
          id={`${id}-error`}
          {...(isString(errorMessage) ? { children: errorMessage } : errorMessage)}
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
