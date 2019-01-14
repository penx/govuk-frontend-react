import React from 'react';
import cx from 'classnames';

import styles from './_label.module.scss';

const LabelInner = ({ className, for: _for, ...props }) =>
  // TODO: review, this seems counter intuititive but is required for aligning unit tests
  // eslint-disable-next-line
  (props.children || props.dangerouslySetInnerHTML) ? <label className={cx(styles['govuk-label'], className)} htmlFor={_for} {...props} /> : null

export default ({ isPageHeading, ...props }) =>
  isPageHeading ? (
    <h1 className="govuk-label-wrapper">
      <LabelInner {...props} />
    </h1>
  ) : (
    <LabelInner {...props} />
  );
