import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './_button.module.scss';

// tracks https://github.com/alphagov/govuk-frontend/blob/master/src/components/button/template.njk
const Button = ({ className, as: Type, ...props }) => (
  <button type="button" className={cx(styles['govuk-button'], className)} {...props} />
);

Button.propTypes = {
  // we use as instead of element
  as: PropTypes.any,
};

Button.defaultProps = {
  as: 'button'
}

export default Button;
