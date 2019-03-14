// @flow

import * as React from 'react';
import type { ComponentType } from 'react';

import cx from 'classnames';

// TODO: find a more DRY way of doing this with flow, else look in to TS
export type ClassNames = {|
  'govuk-button': string,
  'govuk-button--disabled': string
|};

const defaultClassNames: ClassNames = {
  'govuk-button': 'govuk-button',
  'govuk-button--disabled': 'govuk-button--disabled'
};

type Props = {
  className?: string,
  classNames?: $Shape<ClassNames>,
  as?: ComponentType<{}> | string,
  type?: string,
  role?: string,
  disabled?: boolean,
  href?: string
};

/**
 *  Tracks https://github.com/alphagov/govuk-frontend/blob/master/src/components/button/template.njk
 */
const Button = ({ className, as, type, role, disabled, href, classNames, ...props }: Props) => {
  const styles: ClassNames = {
    ...defaultClassNames,
    ...classNames
  };
  let Type = as || '';
  let computedType = type;
  let computedRole = role;
  let computedHref = href;
  if (Type === '') {
    if (href) {
      Type = 'a';
    } else {
      Type = 'button';
      if (!type) {
        computedType = 'submit';
      }
    }
  }

  if (Type === 'a') {
    computedHref = computedHref || '#';
    if (!role) {
      computedRole = 'button';
    }
  } else if (Type === 'input') {
    if (!type) {
      computedType = 'submit';
    }
  }
  return (
    <Type
      type={computedType}
      href={computedHref}
      role={computedRole}
      aria-disabled={disabled && 'true'}
      disabled={disabled && 'disabled'}
      className={cx(
        styles['govuk-button'],
        disabled && styles['govuk-button--disabled'],
        className
      )}
      {...props}
    />
  );
};

Button.defaultProps = {
  as: '',
  className: undefined,
  type: undefined,
  role: undefined,
  disabled: false,
  href: undefined,
  classNames: {}
};

export default Button;
