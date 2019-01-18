import { storiesOf } from '@storybook/react';
import template from 'govuk-frontend-template-spec/components/error-message/error-message.json';
import render from '../../../tests/render';

const stories = storiesOf('ErrorMessage', module);

template.examples.forEach(example => {
  stories.add(example.name, () => render('error-message', example.data, { renderMode: 'react' }));
});
