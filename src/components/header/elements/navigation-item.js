import React from 'react';
import cx from 'classnames';
import styles from '../styles.module.scss';

export default ({ className, as: T = 'a', active, ...props }) => (
  <li
    className={cx(
      styles['govuk-header__navigation-item'],
      active && styles['govuk-header__navigation-item--active'],
      className
    )}
  >
    <T className={styles['govuk-header__link']} {...props} />
  </li>
);
