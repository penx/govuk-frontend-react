// @flow

import * as React from 'react';
import cx from 'classnames';

export type ClassNames = {|
  'govuk-hint': string
|};

const defaultClassNames: ClassNames = {
  'govuk-hint': 'govuk-hint'
};

const Hint = ({ className, classNames, ...props }: React.ElementProps<'span'>) => {
  const styles: ClassNames = {
    ...defaultClassNames,
    ...classNames
  };
  return <span {...props} className={cx(styles['govuk-hint'], className)} />;
};

export default Hint;
