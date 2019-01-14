// This is a static renderer that is intended to match the nunjucks renderer
// provided by govuk-frontend
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import cheerio from 'cheerio';

import Button from '../src/components/button';
import ErrorMessage from '../src/components/error-message';
import Header from '../src/components/header';
import Hint from '../src/components/hint';
import Input from '../src/components/input';
import Label from '../src/components/label';

const components = {
  button: Button,
  'error-message': ErrorMessage,
  header: Header,
  hint: Hint,
  input: Input,
  label: Label
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
    navigation: _navigation,
    ...props
  } = options;

  // calculate any props that aren't just renames
  let children;

  let valueProp = 'defaultValue';

  let computedValue = value;

  const componentSpecific = {};

  if (name === 'label') {
    children = text;
  }
  if (name === 'error-message') {
    children = text;
  }
  if (name === 'hint') {
    children = text;
  }
  if (name === 'button') {
    // TODO: handle a Button of type 'a' or 'input' that has both 'value' and 'text' set
    valueProp = 'value';
    if (name === 'button' && element !== 'input') {
      children = text;
    }
    if (name === 'button' && element === 'input') {
      computedValue = text;
    }
  }
  if (name === 'input') {
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
    // TODO: May be better to make a Fragment using dangerouslySetInnerHTML and pass it down as children
    dangerouslySetInnerHTML: html && { __html: html },
    className: classes,
    as: element
  };
}

function render(name, options) {
  const Component = components[name];
  const props = optionsToProps(name, options);

  return cheerio.load(ReactDOMServer.renderToStaticMarkup(<Component {...props} />));
}

export default render;
