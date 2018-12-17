import React from 'react';
import cx from 'classnames';

import styles from './_hint.module.scss';

export default ({ className, ...props }) => (
  <span className={cx(styles['govuk-hint'], className)} {...props} />
);
