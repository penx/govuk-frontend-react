import React from 'react';
import cx from 'classnames';
import styles from '../_header.module.scss';

export default ({ className, ...props }) => (
  <div className={cx(styles['govuk-header__container'], className)} {...props} />
);
