import * as React from 'react';
import cx from 'classnames';

const RadioConditional = ({ className, hidden, styles, ...props }) => (
  <div
    className={cx(
      styles['govuk-radios__conditional'],
      hidden && styles['govuk-radios__conditional--hidden'],
      className
    )}
    {...props}
  />
);

export default RadioConditional;
