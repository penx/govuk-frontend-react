// @flow

import * as React from 'react';
import cx from 'classnames';

export type ClassNames = {|
  'govuk-form-group': string,
  'govuk-form-group--error': string
|};

const defaultClassNames: ClassNames = {
  'govuk-form-group': 'govuk-form-group',
  'govuk-form-group--error': 'govuk-form-group--error'
};

const FormGroup = ({ className, classNames, error, ...props }: React.ElementProps<'div'>) => {
  const styles: ClassNames = {
    ...defaultClassNames,
    ...classNames
  };

  return (
    <div
      className={cx(
        styles['govuk-form-group'],
        error && styles['govuk-form-group--error'],
        className
      )}
      {...props}
    />
  );
};

export default FormGroup;
