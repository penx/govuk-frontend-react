import React from 'react';
import cx from 'classnames';
import styles from '../_header.module.scss';

const Container = ({ className, ...props }) => (
  <div className={cx(styles['govuk-header__container'], className)} {...props} />
);

Container.defaultProps = {
  className: styles['govuk-width-container']
};

export default Container;
