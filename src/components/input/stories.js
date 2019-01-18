import { storiesOf } from '@storybook/react';
import template from 'govuk-frontend-template-spec/components/input/input.json';
import fixture, { withFinalForm, withFormik } from './fixtures';
import render from '../../../tests/render';

const stories = storiesOf('Input', module);
stories.add('default', () => fixture);
stories.add('with final form', () => withFinalForm);
stories.add('with formik', () => withFormik);

template.examples.forEach(example => {
  stories.add(example.name, () => render('input', example.data, { renderMode: 'react' }));
});
