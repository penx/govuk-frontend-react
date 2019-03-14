// @flow

import * as React from 'react';
import cx from 'classnames';

const WidthContainer = ({ className, ...props }: React.ElementProps<'div'>) => (
  <div className={cx(styles['govuk-width-container'], className)} {...props} />
);

export default WidthContainer;
