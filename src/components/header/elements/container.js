import React from 'react';
import cx from 'classnames';
import styles from '../_header.module.scss';
import WidthContainer from '../../../objects/width-container';

const Container = ({ className, ...props }) =>
  className ? (
    <div className={cx(styles['govuk-header__container'], className)} {...props} />
  ) : (
    <WidthContainer className={styles['govuk-header__container']} {...props} />
  );

Container.defaultProps = {
  className: undefined
};

export default Container;
