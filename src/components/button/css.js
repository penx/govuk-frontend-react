// This version of button ensures CSS has been imported (not as a CSS module) and uses default CSS classes
import React from 'react';
import 'govuk-frontend/components/button/_button.scss';
import Template from './template';

export default props => <Template {...props} />;
