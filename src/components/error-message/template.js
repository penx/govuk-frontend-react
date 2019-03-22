// @flow

import * as React from 'react';
import cx from 'classnames';

export type ClassNames = {|
  'govuk-error-message': string
|};

const defaultClassNames: ClassNames = {
  'govuk-error-message': 'govuk-error-message'
};

const ErrorMessage = ({ className, classNames, ...props }: React.ElementProps<'span'>) => {
  const styles: ClassNames = {
    ...defaultClassNames,
    ...classNames
  };
  return <span {...props} className={cx(styles['govuk-error-message'], className)} />;
};

export default ErrorMessage;
