// Copied from https://github.com/alphagov/govuk-frontend/blob/master/lib/jest-helpers.js
/**
 * Get the raw HTML representation of a component, and remove any other
 * child elements that do not match the component.
 * Relies on B.E.M naming ensuring that child components relating to a component
 * are namespaced.
 * @param {function} $ requires an instance of cheerio (jQuery) that includes the
 * rendered component.
 * @param {string} className the top level class 'Block' in B.E.M terminology
 * @returns {string} returns HTML
 */
export default function htmlWithClassName($, className) {
  const $component = $(className);
  const classSelector = className.replace('.', '');
  // Remove all other elements that do not match this component
  $component.find(`[class]:not([class^=${classSelector}])`).remove();
  return $.html($component);
}
