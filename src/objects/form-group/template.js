// @flow

import * as React from 'react';
import cx from 'classnames';

const FormGroup = ({ className, error, ...props }: React.ElementProps<'div'>) => (
  <div
    className={cx(
      styles['govuk-form-group'],
      error && styles['govuk-form-group--error'],
      className
    )}
    {...props}
  />
);

export default FormGroup;
