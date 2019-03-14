// @flow

import * as React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

const WidthContainer = ({ className, ...props }: React.ElementProps<'div'>) => (
  <div className={cx(styles['govuk-width-container'], className)} {...props} />
);

export default WidthContainer;
