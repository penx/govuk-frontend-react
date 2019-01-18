// @flow

import * as React from 'react';
import cx from 'classnames';

import styles from './_hint.module.scss';

const Hint = ({ className, ...props }: React.ElementProps<'span'>) => (
  <span {...props} className={cx(styles['govuk-hint'], className)} />
);

export default Hint;
