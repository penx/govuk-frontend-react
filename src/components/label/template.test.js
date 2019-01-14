const { setRender } = require('govuk-frontend-template-spec/lib/jest-helpers');
const { toHaveNoViolations } = require('jest-axe');
const render = require('../../../tests/render');

setRender(render);
expect.extend(toHaveNoViolations);
require('govuk-frontend-template-spec/components/label/template.test');
