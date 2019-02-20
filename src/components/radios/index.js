// @flow

import * as React from 'react';
import cx from 'classnames';

import MergeFocus from 'merge-focus';

import styles from './_radios.module.scss';

import ErrorMessage from '../error-message';
import Fieldset from '../fieldset';
import Hint from '../hint';
import Label from '../label';

const RadioLabel = ({ className, children, ...props }) => (
  <Label className={cx(styles['govuk-radios__label'], className)} {...props}>
    {children}
  </Label>
);

const RadioHint = ({ className, children, ...props }) => (
  <Hint className={cx(styles['govuk-radios__hint'], className)} {...props}>
    {children}
  </Hint>
);

const RadioConditional = ({ className, hidden, ...props }) => (
  <div
    className={cx(
      styles['govuk-radios__conditional'],
      hidden && styles['govuk-radios__conditional--hidden'],
      className
    )}
    {...props}
  />
);

type RadioProps = React.ElementProps<'input'> & {
  label: string,
  className: string,
  name: string
};

// TODO: if id or name aren't supplied then use context api to get name, id and idPrefix of parent?
const Radio = React.forwardRef<RadioProps, HTMLInputElement>(
  (
    {
      divider,
      id,
      name,
      value,
      checked,
      disabled,
      conditional,
      hint,
      label,
      children,
      className,
      ...props
    },
    ref
  ) => (
    <>
      {divider && <div className={cx(styles['govuk-radios__divider'])}>{divider}</div>}
      <div className={styles['govuk-radios__item']}>
        <input
          className={cx(styles['govuk-radios__input'], className)}
          id={id}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          disabled={disabled}
          data-aria-controls={conditional && `conditional-${id}`}
          aria-describedby={hint && `${id}-item-hint`}
          ref={ref}
          {...props}
        />
        <RadioLabel {...label} for={id}>
          {' '}
          {children}{' '}
        </RadioLabel>
        {hint && <RadioHint id={`${id}-item-hint`} {...hint} />}
      </div>
      {conditional && (
        <RadioConditional hidden={!checked} id={`conditional-${id}`} {...conditional} />
      )}
    </>
  )
);

const Radios = ({
  name,
  idPrefix = name,
  className,
  items = [],
  hint,
  errorMessage,
  children,
  id,
  formGroup,
  fieldset,
  onBlur,
  onFocus,
  value,
  ...props
}: React.ElementProps<'label'>) => {
  let describedBy;
  if (hint) {
    describedBy = `${idPrefix}-hint`;
  }
  if (errorMessage) {
    describedBy = describedBy ? `${describedBy} ${idPrefix}-error` : `${idPrefix}-error`;
  }
  const isConditional = items.some(item => item.conditional);

  const inner = (
    <>
      {hint && <Hint id={`${idPrefix}-hint`} {...hint} />}
      {errorMessage && (
        <ErrorMessage
          id={`${idPrefix}-error`}
          {...(typeof errorMessage !== 'object' || React.isValidElement(errorMessage)
            ? { children: errorMessage }
            : errorMessage)}
        />
      )}
      <div
        className={cx(
          styles['govuk-radios'],
          className,
          isConditional && styles['govuk-radios--conditional']
        )}
        {...props}
        data-module={isConditional && 'radios'}
      >
        {/*
          TODO: merge values alternative for radios?
          e.g.
          https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/RadioGroup/RadioGroup.js
          https://github.com/IBM/carbon-components-react/blob/master/src/components/RadioButtonGroup/RadioButtonGroup.js
          https://github.com/auth0/cosmos/blob/master/core/components/atoms/radio/radio.js
          */}
        {children || (
          <MergeFocus
            onBlur={onBlur}
            onFocus={onFocus}
            keys={items.map((item, i) => item.id || (id ? `${id}-${i + 1}` : i + 1))}
          >
            {mergeFocus => (
              <>
                {items.map((item, i) => {
                  const index = i + 1; // using 1-index to match govuk-frontend
                  const key = item.id || (id ? `${id}-${index}` : index);
                  const itemId = item.id || (idPrefix ? `${idPrefix}-${index}` : `${id}-${index}`);
                  return <Radio name={name} key={key} {...item} id={itemId} {...mergeFocus[key]} />;
                })}
              </>
            )}
          </MergeFocus>
        )}
      </div>
    </>
  );

  return (
    <div
      className={cx(
        styles['govuk-form-group'],
        errorMessage && styles['govuk-form-group--error'],
        formGroup && formGroup.className
      )}
    >
      {fieldset ? (
        <Fieldset aria-describedby={describedBy} {...fieldset}>
          {inner}
        </Fieldset>
      ) : (
        inner
      )}
    </div>
  );
};

Radios.Radio = Radio;

export default Radios;
