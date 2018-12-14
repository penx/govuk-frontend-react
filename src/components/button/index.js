import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './_button.module.scss';

/**
 *  Tracks https://github.com/alphagov/govuk-frontend/blob/master/src/components/button/template.njk
 */
const Button = ({
  className, as, type, role, disabled, href, ...props
}) => {
  let Type = as;
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
  return <Type type={computedType} href={computedHref} role={computedRole} aria-disabled={disabled && 'true'} disabled={disabled && 'disabled'} className={cx(styles['govuk-button'], disabled && styles['govuk-button--disabled'], className)} {...props} />;
};

Button.propTypes = {
  // we use as instead of element
  as: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.func],
  ), // could be a, button or a custom type
  type: PropTypes.string,
  role: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
};

Button.defaultProps = {
  as: '',
  type: undefined,
  role: undefined,
  disabled: false,
  href: undefined,
};

export default Button;
