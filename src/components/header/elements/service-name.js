import React from 'react';
import cx from 'classnames';
import styles from '../styles.module.scss';

// TODO: support `as` prop
export default ({ className, serviceUrl, children, ...props }) => (
  <a
    href={serviceUrl}
    className={cx(styles['govuk-header__link--service-name'], className)}
    {...props}
  >
    {children}
  </a>
);
