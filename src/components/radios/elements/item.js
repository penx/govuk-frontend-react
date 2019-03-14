import * as React from 'react';
import cx from 'classnames';

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
        <Radios.Label {...label} htmlFor={id}>
          {' '}
          {children}{' '}
        </Radios.Label>
        {hint && <Radios.Hint id={`${id}-item-hint`} {...hint} />}
      </div>
      {conditional && (
        <Radios.Conditional hidden={!checked} id={`conditional-${id}`} {...conditional} />
      )}
    </>
  )
);