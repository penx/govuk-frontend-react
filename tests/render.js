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
  const {
    text: t,
    attributes,
    classes,
    element,
    html,
    ...props
  } = options;

  let text = t;

  if (name === 'button') {
    if (element === 'input') {
      props.value = text;
      text = undefined;
    }
  }

  return {
    children: text,
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
