const { toHaveNoViolations } = require('jest-axe');
const { setRender } = require('govuk-frontend-template-spec/lib/jest-helpers');
const render = require('./render');

expect.extend(toHaveNoViolations);
setRender(render);
