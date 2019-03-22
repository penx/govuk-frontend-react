// @flow

import * as React from 'react';
import cx from 'classnames';

export type ClassNames = {|
  'govuk-width-container': string
|};

const defaultClassNames: ClassNames = {
  'govuk-width-container': 'govuk-width-container'
};

const WidthContainer = ({ className, classNames, ...props }: React.ElementProps<'div'>) => {
  const styles: ClassNames = {
    ...defaultClassNames,
    ...classNames
  };

  return <div className={cx(styles['govuk-width-container'], className)} {...props} />;
};

export default WidthContainer;
