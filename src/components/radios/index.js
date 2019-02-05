// @flow

import * as React from 'react';
import cx from 'classnames';

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

const Radio = ({
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
}) => (
  <>
    {divider && <div className={cx('govuk-radios__divider')}>{divider}</div>}
    <div className="govuk-radios__item">
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
      {errorMessage && <ErrorMessage id={`${idPrefix}-error`} {...errorMessage} />}
      <div
        className={cx('govuk-radios', className, isConditional && 'govuk-radios--conditional')}
        {...props}
        data-module={isConditional && 'radios'}
      >
        {children ||
          items.map((item, i) => {
            const index = i + 1;
            const key = item.id || (id ? `${id}-${index}` : index);
            const itemId = item.id || (idPrefix ? `${idPrefix}-${index}` : `${id}-${index}`);
            return <Radio name={name} key={key} {...item} id={itemId} />;
          })}
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

// TODO: use context api?
Radios.Radio = Radio;

export default Radios;
