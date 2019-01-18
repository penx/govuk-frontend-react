import { storiesOf } from '@storybook/react';
import template from 'govuk-frontend-template-spec/components/date-input/date-input.json';
import render from '../../../tests/render';

const stories = storiesOf('DateInput', module);

template.examples.forEach(example => {
  stories.add(example.name, () => render('date-input', example.data, { renderMode: 'react' }));
});
