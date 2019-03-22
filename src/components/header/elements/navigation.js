import React from 'react';
import cx from 'classnames';
import styles from '../styles.module.scss';

export default ({ className, open, ...props }) => (
  <nav>
    <ul
      id="navigation"
      className={cx(
        styles['govuk-header__navigation'],
        open && styles['govuk-header__navigation--open'],
        className
      )}
      aria-label="Top Level Navigation"
      {...props}
    />
  </nav>
);
