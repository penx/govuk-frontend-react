import { storiesOf } from '@storybook/react';
import template from 'govuk-frontend-template-spec/components/input/input.json';
import fixture from './fixtures';
import render from '../../../tests/render';

const stories = storiesOf('Input', module);
stories.add('default', () => fixture);

template.examples.forEach(example => {
  stories.add(example.name, () => render('input', example.data, { renderMode: 'react' }));
});
