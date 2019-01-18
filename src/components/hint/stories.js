import { storiesOf } from '@storybook/react';
import template from 'govuk-frontend-template-spec/components/hint/hint.json';
import render from '../../../tests/render';

const stories = storiesOf('Hint', module);

template.examples.forEach(example => {
  stories.add(example.name, () => render('hint', example.data, { renderMode: 'react' }));
});
