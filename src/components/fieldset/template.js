// @flow

import * as React from 'react';
import cx from 'classnames';

type Props = React.ElementProps<'fieldset'> & {
  legend: {
    isPageHeading?: boolean,
    className: string,
    children: any
  }
};

export type ClassNames = {|
  'govuk-fieldset': string,
  'govuk-fieldset__legend': string,
  'govuk-fieldset__heading': string
|};

const defaultClassNames: ClassNames = {
  'govuk-fieldset': 'govuk-fieldset',
  'govuk-fieldset__legend': 'govuk-fieldset__legend',
  'govuk-fieldset__heading': 'govuk-fieldset__heading'
};

const Fieldset = ({ className, classNames, legend, children, describedBy, ...props }: Props) => {
  const styles: ClassNames = {
    ...defaultClassNames,
    ...classNames
  };
  return (
    <fieldset aria-describedby={describedBy} className={cx(styles['govuk-fieldset'], className)} {...props}>
      {legend && (
        <legend
          className={cx(
            styles['govuk-fieldset__legend'],
            legend.className &&
              legend.className
                .split(' ')
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
};

export default Fieldset;
