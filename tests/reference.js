// Render the html nunjucks templates from govuk-frontend

import nunjucks from 'nunjucks';
import path from 'path';

const componentNameToMacroName = (componentName) => {
  const macroName = componentName
    .toLowerCase()
    .split('-')
    // capitalize each 'word'
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return `govuk${macroName}`;
};

const nunjucksInitialised = false;
export function nunjucksInit() {
  if (!nunjucksInitialised) {
    nunjucks.configure([path.join(__dirname, '../../node_modules/govuk-frontend/'),
      path.join(__dirname, '../../node_modules/govuk-frontend/components')],
    {
      trimBlocks: true,
      lstripBlocks: true,
    });
  }
}

export default function reference(componentName, params, children = false) {
  nunjucksInit();
  if (typeof params === 'undefined') {
    throw new Error('Parameters passed to `render` should be an object but are undefined');
  }

  const macroName = componentNameToMacroName(componentName);
  const macroParams = JSON.stringify(params, null, 2);

  let macroString = `{%- from "${componentName}/macro.njk" import ${macroName} -%}`;

  // If we're nesting child components or text, pass the children to the macro
  // using the 'caller' Nunjucks feature
  if (children) {
    macroString += `{%- call ${macroName}(${macroParams}) -%}${children}{%- endcall -%}`;
  } else {
    macroString += `{{- ${macroName}(${macroParams}) -}}`;
  }

  const output = nunjucks.renderString(macroString);
  return output;
}
