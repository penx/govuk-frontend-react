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

const Item = ({ name, label, className, ...props }) => (
  <div className={styles['govuk-date-input__item']}>
    <Input
      label={{
        children: label,
        className: styles['govuk-date-input__label']
      }}
      className={cx(styles['govuk-date-input__input'], className)}
      type="number"
      pattern="[0-9]*"
      name={name}
      {...props}
    />
  </div>
);

// TODO: should we support a label prop if fieldset is not specified?
const DateInput = ({
  className,
  id,
  hint,
  errorMessage,
  items,
  fieldset,
  namePrefix,
  formGroup = {},
  children,
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
        {children ||
          items.map(({ id: itemId, name, label, ...itemProps }, index) => (
            <Item
              label={label || capitalizeFirstLetter(name)}
              key={name || index}
              id={itemId || `${id}-${name}`}
              name={namePrefix ? `${namePrefix}-${name}` : name}
              {...itemProps}
            />
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

DateInput.Item = Item;

export default DateInput;
