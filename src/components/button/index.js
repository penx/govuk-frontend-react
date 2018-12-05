import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './_button.module.scss';

/**
 *  Tracks https://github.com/alphagov/govuk-frontend/blob/master/src/components/button/template.njk
 */
const Button = ({ className, as: T, ...props }) => {
  let Type = T;
  if (T === '') {
    if (props.href) {
      Type = 'a';
    } else {
      Type = 'button';
    }
  }
  return <Type type="button" className={cx(styles['govuk-button'], className)} {...props} />;
};

Button.propTypes = {
  // we use as instead of element
  as: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.func],
  ), // could be a, button or a custom type
};

Button.defaultProps = {
  as: '',
};

export default Button;
