import React from 'react';
import cx from 'classnames';
import styles from '../styles.module.scss';

export default ({ className, open, ...props }) => (
  <button
    type="button"
    className={cx(
      styles['govuk-header__menu-button'],
      open && styles['govuk-header__menu-button--open'],
      className
    )}
    aria-controls="navigation"
    aria-label="Show or hide Top Level Navigation"
    {...props}
  />
);
