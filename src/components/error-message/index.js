// @flow

import * as React from 'react';
import cx from 'classnames';

import styles from './_error-message.module.scss';

const ErrorMessage = ({ className, ...props }: React.ElementProps<'span'>) => (
  <span {...props} className={cx(styles['govuk-error-message'], className)} />
);

export default ErrorMessage;
