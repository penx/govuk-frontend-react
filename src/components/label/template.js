// @flow

import * as React from 'react';
import cx from 'classnames';

export type ClassNames = {|
  'govuk-label': string,
  'govuk-label-wrapper': string
|};

const defaultClassNames: ClassNames = {
  'govuk-label': 'govuk-label',
  'govuk-label-wrapper': 'govuk-label-wrapper'
};

// TODO: govuk-label--s can be passed in as className prop

// TODO: review use of for prop rather than htmlFor
const LabelInner = ({
  className,
  classNames,
  for: _for,
  htmlFor,
  ...props
}: React.ElementProps<'label'>) => {
  const styles: ClassNames = {
    ...defaultClassNames,
    ...classNames
  };
  // TODO: review, this seems counter intuititive but is required for aligning unit tests
  // eslint-disable-next-line
  return props.children ? <label className={cx(styles['govuk-label'], className)} {...props} htmlFor={htmlFor || _for} /> : null
};

export default ({
  isPageHeading,
  classNames,
  ...props
}: { isPageHeading?: boolean } & React.ElementProps<'label'>) => {
  const styles: ClassNames = {
    ...defaultClassNames,
    ...classNames
  };
  return isPageHeading ? (
    <h1 className={styles['govuk-label-wrapper']}>
      <LabelInner classNames={classNames} {...props} />
    </h1>
  ) : (
    <LabelInner classNames={classNames} {...props} />
  );
};
