// @flow

import * as React from 'react';
import cx from 'classnames';

import styles from './_fieldset.module.scss';

type Props = React.ElementProps<'fieldset'> & {
  legend: {
    isPageHeading?: boolean,
    className: string,
    children: any
  }
};

const Fieldset = ({ className, legend, children, ...props }: Props) => (
  <fieldset {...props} className={cx(styles['govuk-fieldset'], className)}>
    {legend && (
      <legend
        className={cx(
          styles['govuk-fieldset__legend'],
          legend.className
            && legend.className.split(' ')
            // TODO: we can't unit test the `|| cn` branch due to the way we are mocking CSS modules
            .map(cn => styles[cn] || cn)
        )}
      >
        {legend.isPageHeading ? (
          <h1 className={styles['govuk-fieldset__heading']}>{legend.children}</h1>
        ) : (
          legend.children
        )}
      </legend>
    )}
    {children}
  </fieldset>
);

export default Fieldset;
