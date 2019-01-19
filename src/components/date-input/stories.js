import { storiesOf } from '@storybook/react';
import template from 'govuk-frontend-template-spec/components/date-input/date-input.json';

import render from '../../../tests/render';
import { withChildren, withFinalForm, withFormik } from './fixtures';

const stories = storiesOf('DateInput', module);

stories.add('with children', () => withChildren);
stories.add('with final form', () => withFinalForm);
stories.add('with formik', () => withFormik);

template.examples.forEach(example => {
  stories.add(example.name, () => render('date-input', example.data, { renderMode: 'react' }));
});
