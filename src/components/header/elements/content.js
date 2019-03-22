import React from 'react';
import cx from 'classnames';
import styles from '../styles.module.scss';

export default ({ className, ...props }) => (
  <div className={cx(styles['govuk-header__content'], className)} {...props} />
);
