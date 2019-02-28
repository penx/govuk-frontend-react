// @flow

import * as React from 'react';
import cx from 'classnames';

import MergeFocus from 'merge-focus';
import MergeValues from 'react-merge-values';

import styles from './_date-input.module.scss';

import Input from '../input';
import Hint from '../hint';
import ErrorMessage from '../error-message';
import Fieldset from '../fieldset';
import FormGroup from '../../objects/form-group';

function capitalizeFirstLetter(string) {
  if (string && string.length) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
}

type ItemProps = React.ElementProps<typeof Input> & {
  label: string,
  className: string,
  name: string
};

const Item = React.forwardRef<ItemProps, HTMLInputElement>(
  ({ name, label, className, ...props }, ref) => (
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
        ref={ref}
        {...props}
      />
    </div>
  )
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
  onBlur,
  onFocus,
  onChange,
  value,
  fieldErrors,
  ...props
}: React.ElementProps<'span'>) => {
  // TODO: expand on prop types - id should be required prop
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
        {/*
         * If children components are provided then we render them
         * Otherwise we render inputs using the 'items' prop
         * (which defaults to day/month/year)
         *
         * When using the items/default behaviour, we want to supply the following in a way that make sense:
         * - onChange: an event handler that provides the value for the component
         * - value: allow the value of all inputs to be controlled
         * - onBlur: some applications trigger form validation onBlur, but this should only happen when blurring from the entire component, not when tabbing between fields
         * - onFocus: if we are blocking some onBlur events, then similarly, we don't want to keep call onFocus when tabbing between fields
         */
        children || (
          <MergeFocus onBlur={onBlur} onFocus={onFocus} keys={items.map(({ name }) => name)}>
            {mergeFocus => (
              /* TODO: add defaultValue support to MergeValues */
              <MergeValues value={value} onChange={onChange} keys={items.map(({ name }) => name)}>
                {mergeValues => (
                  <>
                    {items.map(
                      (
                        { id: itemId, name, label, className: itemClassName, ...itemProps },
                        index
                      ) => {
                        const key = itemId || (id ? `${id}-${name}` : name) || index;
                        return (
                          <Item
                            label={label || capitalizeFirstLetter(name)}
                            key={key}
                            id={itemId || (id && `${id}-${name}`)}
                            name={namePrefix ? `${namePrefix}-${name}` : name}
                            className={cx(
                              itemClassName,
                              fieldErrors && fieldErrors.indexOf(name) !== -1
                                ? 'govuk-input--error'
                                : undefined
                            )}
                            {...mergeFocus[name]}
                            {...mergeValues[name]}
                            // TODO: support for onFocus, value, onBlur, onChange in itemProps without breaking mergeFocus and mergeValues
                            {...itemProps}
                          />
                        );
                      }
                    )}
                  </>
                )}
              </MergeValues>
            )}
          </MergeFocus>
        )}
      </div>
    </>
  );

  return (
    <FormGroup error={!!errorMessage} className={formGroup.className}>
      {fieldset ? (
        <Fieldset aria-describedby={describedBy} role="group" {...fieldset}>
          {inner}
        </Fieldset>
      ) : (
        inner
      )}
    </FormGroup>
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
