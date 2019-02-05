import { cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

const { toHaveNoViolations } = require('jest-axe');
// TODO: setRender should be exported from govuk-frontend-template-spec root
const { setRender } = require('govuk-frontend-template-spec/lib/jest-helpers');
const render = require('./render');

expect.extend(toHaveNoViolations);
setRender(render);

afterEach(cleanup);
