import React from 'react';
import cx from 'classnames';

import styles from './_error-message.module.scss';

export default ({ className, ...props }) => (
  <span className={cx(styles['govuk-error-message'], className)} {...props} />
);
