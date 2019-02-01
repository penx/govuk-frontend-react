import { storiesOf } from '@storybook/react';
import template from 'govuk-frontend-template-spec/components/fieldset/fieldset.json';
import render from '../../../tests/render';

const stories = storiesOf('Fieldset', module);

template.examples.forEach(example => {
  stories.add(example.name, () => render('fieldset', example.data, { renderMode: 'react' }));
});
