// @flow

import * as React from 'react';
import cx from 'classnames';

import MergeFocus from 'merge-focus';

// import styles from './_radios.module.scss';

import ErrorMessage from '../error-message';
import Fieldset from '../fieldset';
import FormGroup from '../../objects/form-group';

import Item from './elements/item';

export type ClassNames = {|
  'govuk-radios__label': string,
  'govuk-radios__hint': string,
  'govuk-radios__conditional': string,
  'govuk-radios__conditional--hidden': string,
  'govuk-radios__divider': string,
  'govuk-radios__item': string,
  'govuk-radios__input': string,
  'govuk-radios': string,
  'govuk-radios--conditional': string
|};

const defaultClassNames: ClassNames = {
  'govuk-radios__label': 'govuk-radios__label',
  'govuk-radios__hint': 'govuk-radios__hint',
  'govuk-radios__conditional': 'govuk-radios__conditional',
  'govuk-radios__conditional--hidden': 'govuk-radios__conditional--hidden',
  'govuk-radios__divider': 'govuk-radios__divider',
  'govuk-radios__item': 'govuk-radios__item',
  'govuk-radios__input': 'govuk-radios__input',
  'govuk-radios': 'govuk-radios',
  'govuk-radios--conditional': 'govuk-radios--conditional'
};

const styles = defaultClassNames;

const Radios = ({
  name,
  idPrefix = name,
  className,
  items = [],
  hint,
  errorMessage,
  children,
  id,
  formGroup,
  fieldset,
  onBlur,
  onFocus,
  value,
  classNames,
  elements,
  components,
  ...props
}: React.ElementProps<'label'>) => {
  let describedBy;
  if (hint) {
    describedBy = `${idPrefix}-hint`;
  }
  if (errorMessage) {
    describedBy = describedBy ? `${describedBy} ${idPrefix}-error` : `${idPrefix}-error`;
  }
  const isConditional = items.some(item => item.conditional);

  const inner = (
    <>
      {hint && <Hint id={`${idPrefix}-hint`} {...hint} />}
      {errorMessage && (
        <ErrorMessage
          id={`${idPrefix}-error`}
          {...(typeof errorMessage !== 'object' || React.isValidElement(errorMessage)
            ? { children: errorMessage }
            : errorMessage)}
        />
      )}
      <div
        className={cx(
          styles['govuk-radios'],
          className,
          isConditional && styles['govuk-radios--conditional']
        )}
        {...props}
        data-module={isConditional && 'radios'}
      >
        {/*
          TODO: merge values alternative for radios?
          e.g.
          https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/RadioGroup/RadioGroup.js
          https://github.com/IBM/carbon-components-react/blob/master/src/components/RadioButtonGroup/RadioButtonGroup.js
          https://github.com/auth0/cosmos/blob/master/core/components/atoms/radio/radio.js
          */}
        {children || (
          <MergeFocus
            onBlur={onBlur}
            onFocus={onFocus}
            keys={items.map((item, i) => item.id || (id ? `${id}-${i + 1}` : i + 1))}
          >
            {mergeFocus => (
              <>
                {items.map((item, i) => {
                  const index = i + 1; // using 1-index to match govuk-frontend
                  const key = item.id || (id ? `${id}-${index}` : index);
                  const itemId = item.id || (idPrefix ? `${idPrefix}-${index}` : `${id}-${index}`);
                  return (
                    <Radios.Item name={name} key={key} {...item} id={itemId} {...mergeFocus[key]} />
                  );
                })}
              </>
            )}
          </MergeFocus>
        )}
      </div>
    </>
  );

  return (
    <FormGroup error={!!errorMessage} className={formGroup && formGroup.className}>
      {fieldset ? (
        <Fieldset aria-describedby={describedBy} {...fieldset}>
          {inner}
        </Fieldset>
      ) : (
        inner
      )}
    </FormGroup>
  );
};

Radios.Item = Item;
Radios.Conditional = RadioConditional;
Radios.Hint = RadioHint;
Radios.Label = RadioLabel;

Radios.defaultProps = {
  name: undefined,
  idPrefix: undefined,
  className: undefined,
  items: [],
  hint: undefined,
  errorMessage: undefined,
  children: undefined,
  id: undefined,
  formGroup: undefined,
  fieldset: undefined,
  onBlur: undefined,
  onFocus: undefined,
  value: undefined,
  classNames: {},
  elements: {},
  components: {}
};

export default Radios;
