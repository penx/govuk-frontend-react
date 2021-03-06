// @flow

import * as React from 'react';
// import type { ComponentType } from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

import ErrorMessage from '../error-message';
import Hint from '../hint';
import Label from '../label';
import FormGroup from '../../objects/form-group';

// TODO: if id not set, wrap label?

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

const Input = React.forwardRef<Props, HTMLInputElement>(
  (
    { className, errorMessage, label, id, hint, formGroup = {}, type = 'text', ...props }: Props,
    ref
  ) => {
    let describedBy;
    if (hint) {
      describedBy = `${id}-hint`;
    }
    if (errorMessage) {
      describedBy = describedBy ? `${describedBy} ${id}-error` : `${id}-error`;
    }
    return (
      <FormGroup error={!!errorMessage} className={formGroup.className}>
        <Label
          htmlFor={id}
          {...(typeof label !== 'object' || React.isValidElement(label)
            ? { children: label }
            : label)}
        />
        {hint && (
          <Hint
            id={`${id}-hint`}
            {...(typeof hint !== 'object' || React.isValidElement(hint)
              ? { children: hint }
              : hint)}
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
            // TODO: can we have the class name passed in appropriately using css modules import?
            className && className.split(' ').map(cn => styles[cn] || cn)
          )}
          aria-describedby={describedBy}
          type={type}
          ref={ref}
          {...props}
        />
      </FormGroup>
    );
  }
);

export default Input;
