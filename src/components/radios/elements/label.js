import * as React from 'react';
import cx from 'classnames';

import Label from '../../label';

const RadioLabel = ({ className, children, ...props }) => (
  <Label className={cx(styles['govuk-radios__label'], className)} {...props}>
    {children}
  </Label>
);

export default RadioLabel;
