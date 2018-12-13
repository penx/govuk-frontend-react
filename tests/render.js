// This is a static renderer that is intended to match the nunjucks renderer
// provided by govuk-frontend
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import cheerio from 'cheerio';

import Button from '../src/components/button';

const components = {
  button: Button,
};

function optionsToProps(name, options) {
  // extract options that are not directly transferred to props
  const {
    text,
    attributes,
    classes,
    element,
    html,
    ...props
  } = options;

  // calculate any props that aren't just renames
  const children = (element === 'input') ? undefined : text;
  const value = (element === 'input') ? text : undefined;

  return {
    children,
    value,
    dangerouslySetInnerHTML: html && { __html: html },
    className: classes,
    as: element,
    ...attributes,
    ...props,
  };
}

function render(name, options) {
  const Component = components[name];
  const props = optionsToProps(name, options);

  return cheerio.load(ReactDOMServer.renderToStaticMarkup(<Component {...props} />));
}

export default render;
