import React from 'react';
import cx from 'classnames';

import styles from './_label.module.scss';

const LabelInner = ({ className, ...props }) => (
  <label className={cx(styles['govuk-label'], className)} {...props} />
);

export default ({ isPageHeading, ...props }) =>
  isPageHeading ? (
    <h1 className="govuk-label-wrapper">
      <LabelInner {...props} />
    </h1>
  ) : (
    <LabelInner {...props} />
  );
