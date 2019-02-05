// This is a static renderer that is intended to match the nunjucks renderer
// provided by govuk-frontend
//
// It also serves to show how the usage of our React components differs from the Nunjucks templates.
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import cheerio from 'cheerio';
import parse from 'html-react-parser';

import {
  Button,
  DateInput,
  ErrorMessage,
  Fieldset,
  Header,
  Hint,
  Input,
  Label,
  Radios
} from '../src';

const components = {
  button: Button,
  'date-input': DateInput,
  'error-message': ErrorMessage,
  fieldset: Fieldset,
  header: Header,
  hint: Hint,
  input: Input,
  label: Label,
  radios: Radios
};

function optionsToProps(name, options) {
  // extract options that are not directly transferred to props
  const {
    text,
    attributes,
    classes,
    element,
    value,
    html,
    navigationClasses,
    checked,
    navigation: _navigation,
    ...props
  } = options;

  // calculate any props that aren't just renames
  let children;

  let valueProp = 'defaultValue';

  let computedValue = value;

  const componentSpecific = {};

  if (name === 'label') {
    if (html) {
      children = parse(html);
    } else {
      children = text;
    }
  }

  if (name === 'fieldset') {
    if (props.legend) {
      const { text: legendText, html: legendHtml, classes: legendClasses, ...rest } = props.legend;
      componentSpecific.legend = {
        children: legendHtml ? parse(legendHtml) : legendText,
        className: legendClasses,
        ...rest
      };
    }
  }

  if (name === 'date-input') {
    if (props.formGroup) {
      componentSpecific.formGroup = optionsToProps('formGroup', props.formGroup);
    }
    if (props.items) {
      componentSpecific.value = props.items.reduce(
        (acc, { value: val, name: key }) => ({
          ...acc,
          [key]: val
        }),
        {}
      );
      componentSpecific.items = props.items.map(({ value: val, ...item }) =>
        optionsToProps('input', item)
      );
    }
    if (props.fieldset) {
      componentSpecific.fieldset = optionsToProps('fieldset', props.fieldset);
    }
    if (props.errorMessage) {
      componentSpecific.errorMessage = optionsToProps('error-message', props.errorMessage);
    }
    if (props.hint) {
      componentSpecific.hint = optionsToProps('hint', props.hint);
    }
  }
  if (name === 'error-message') {
    if (html) {
      children = parse(html);
    } else {
      children = text;
    }
  }
  if (name === 'hint') {
    if (html) {
      children = parse(html);
    } else {
      children = text;
    }
  }
  if (name === 'button') {
    // TODO: handle a Button of type 'a' or 'input' that has both 'value' and 'text' set
    valueProp = 'value';
    if (name === 'button' && element !== 'input') {
      if (html) {
        children = parse(html);
      } else {
        children = text;
      }
    }
    if (name === 'button' && element === 'input') {
      computedValue = text;
    }
  }
  if (name === 'input' || name === 'radio') {
    if (props.formGroup) {
      componentSpecific.formGroup = optionsToProps('formGroup', props.formGroup);
    }
    if (props.label) {
      componentSpecific.label = optionsToProps('label', props.label);
    }
    if (props.errorMessage) {
      componentSpecific.errorMessage = optionsToProps('error-message', props.errorMessage);
    }
    if (props.hint) {
      componentSpecific.hint = optionsToProps('hint', props.hint);
    }
    if (checked) {
      componentSpecific.defaultChecked = checked;
    }
    if (name === 'radio') {
      if (html) {
        children = parse(html);
      } else {
        children = text;
      }
    }
  }

  if (name === 'radios') {
    if (props.items) {
      componentSpecific.items = props.items.map(({ ...item }) => optionsToProps('radio', item));
    }
    if (props.formGroup) {
      componentSpecific.formGroup = optionsToProps('formGroup', props.formGroup);
    }
    if (props.hint) {
      componentSpecific.hint = optionsToProps('hint', props.hint);
    }
    if (props.errorMessage) {
      componentSpecific.errorMessage = optionsToProps('error-message', props.errorMessage);
    }
    if (props.fieldset) {
      componentSpecific.fieldset = optionsToProps('fieldset', props.fieldset);
    }
  }

  const navigation = _navigation
    ? _navigation.map(
      ({ text: itemText, attributes: itemAttributes, ...itemProps }, i) => (
        <Header.NavigationItem
          key={i}//eslint-disable-line
          {...itemAttributes}
          {...itemProps}
        >
          {itemText}
        </Header.NavigationItem>
      ))
    : undefined;

  return {
    ...props,
    ...attributes,
    ...componentSpecific,
    children,
    [valueProp]: computedValue,
    // defaultValue: value,
    navigation,
    className: classes,
    as: element
  };
}

function render(name, options, { renderMode = 'cheerio' }) {
  const Component = components[name];
  const props = optionsToProps(name, options);

  if (renderMode === 'react') {
    return <Component {...props} />;
  }
  // default renderMode is cheerio
  return cheerio.load(ReactDOMServer.renderToStaticMarkup(<Component {...props} />));
}

export default render;
