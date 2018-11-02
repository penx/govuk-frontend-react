import React from 'react';
import cx from 'classnames';
import styles from './_button.module.scss';

const Button = ({ className, ...props }) => (
  <button type="button" className={cx(styles['govuk-button'], className)} {...props} />
);

export default Button;
