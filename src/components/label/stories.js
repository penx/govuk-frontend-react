import { storiesOf } from '@storybook/react';
import template from 'govuk-frontend-template-spec/components/label/label.json';
import render from '../../../tests/render';

const stories = storiesOf('Label', module);

template.examples.forEach(example => {
  stories.add(example.name, () => render('label', example.data, { renderMode: 'react' }));
});
