// @flow

import React from 'react';
import type { ComponentType } from 'react';

import cx from 'classnames';
import styles from './_button.module.scss';

type Props = {
  className?: string,
  as?: ComponentType<{}> | string,
  type?: string,
  role?: string,
  disabled?: boolean,
  href?: string
};

/**
 *  Tracks https://github.com/alphagov/govuk-frontend/blob/master/src/components/button/template.njk
 */
const Button = ({ className, as, type, role, disabled, href, ...props }: Props) => {
  let Type: ComponentType<{}> | string = as || '';
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
  href: undefined
};

export default Button;
