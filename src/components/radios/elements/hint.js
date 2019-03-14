import * as React from 'react';
import cx from 'classnames';

import Hint from '../../hint';

const RadioHint = ({ className, children, styles, ...props }) => (
  <Hint className={cx(styles['govuk-radios__hint'], className)} {...props}>
    {children}
  </Hint>
);

export default RadioHint;
