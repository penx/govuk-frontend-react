// @flow

import * as React from 'react';
import cx from 'classnames';

import styles from './_label.module.scss';

// TODO: review use of for prop rather than htmlFor
const LabelInner = ({ className, for: _for, htmlFor, ...props }: React.ElementProps<'label'>) =>
  // TODO: review, this seems counter intuititive but is required for aligning unit tests
  // eslint-disable-next-line
  props.children ? <label className={cx(styles['govuk-label'], className)} {...props} htmlFor={htmlFor || _for} /> : null

export default ({
  isPageHeading,
  ...props
}: { isPageHeading?: boolean } & React.ElementProps<'label'>) =>
  isPageHeading ? (
    <h1 className={styles['govuk-label-wrapper']}>
      <LabelInner {...props} />
    </h1>
  ) : (
    <LabelInner {...props} />
  );
