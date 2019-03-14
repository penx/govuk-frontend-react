// @flow

import * as React from 'react';
import cx from 'classnames';

const Hint = ({ className, ...props }: React.ElementProps<'span'>) => (
  <span {...props} className={cx(styles['govuk-hint'], className)} />
);

export default Hint;
