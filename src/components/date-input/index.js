// @flow

import * as React from 'react';
import cx from 'classnames';

import styles from './_date-input.module.scss';

import Input from '../input';
import Hint from '../hint';
import ErrorMessage from '../error-message';
import Fieldset from '../fieldset';

function capitalizeFirstLetter(string) {
  if (string && string.length) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
}

const DateInput = ({
  className,
  id,
  hint,
  errorMessage,
  items,
  fieldset,
  namePrefix,
  formGroup = {},
  ...props
}: React.ElementProps<'span'>) => {
  let describedBy;
  if (hint) {
    describedBy = `${id}-hint`;
  }
  if (errorMessage) {
    describedBy = describedBy ? `${describedBy} ${id}-error` : `${id}-error`;
  }
  const inner = (
    <>
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
      <div {...props} className={cx(styles['govuk-date-input'], className)} id={id}>
        {items.map(({ className: itemClassName, id: itemId, name, label, ...itemProps }, index) => (
          <div key={name || index} className={styles['govuk-date-input__item']}>
            <Input
              label={{
                children: label || capitalizeFirstLetter(name),
                className: styles['govuk-date-input__label']
              }}
              id={itemId || `${id}-${name}`}
              className={cx(styles['govuk-date-input__input'], itemClassName)}
              name={namePrefix ? `${namePrefix}-${name}` : name}
              type="number"
              pattern="[0-9]*"
              {...itemProps}
            />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div
      className={cx(
        styles['govuk-form-group'],
        errorMessage && styles['govuk-form-group--error'],
        formGroup.className
      )}
    >
      {fieldset ? (
        <Fieldset aria-describedby={describedBy} role="group" {...fieldset}>
          {inner}
        </Fieldset>
      ) : (
        inner
      )}
    </div>
  );
};

DateInput.defaultProps = {
  items: [
    {
      name: 'day',
      className: 'govuk-input--width-2'
    },
    {
      name: 'month',
      className: 'govuk-input--width-2'
    },
    {
      name: 'year',
      className: 'govuk-input--width-4'
    }
  ]
};

export default DateInput;
