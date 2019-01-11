// This is a static renderer that is intended to match the nunjucks renderer
// provided by govuk-frontend
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import cheerio from 'cheerio';

import Button from '../src/components/button';
import Header from '../src/components/header';
import Input from '../src/components/input';

const components = {
  button: Button,
  header: Header,
  input: Input
};

function optionsToProps(name, options) {
  // extract options that are not directly transferred to props
  const {
    text,
    attributes,
    label,
    classes,
    element,
    value,
    html,
    navigationClasses,
    navigation: _navigation,
    formGroup,
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
    if (formGroup) {
      componentSpecific.formGroup = optionsToProps('formGroup', formGroup);
    }
    if (label) {
      componentSpecific.label = optionsToProps('label', label);
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
