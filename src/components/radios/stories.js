import { storiesOf } from '@storybook/react';
import template from 'govuk-frontend-template-spec/components/radios/radios.json';
import render from '../../../tests/render';

const stories = storiesOf('Radios', module);
stories.add('testing', () =>
  render(
    'radios',
    {
      items: [
        {
          value: 'value',
          text: 'This is text',
          id: 'item-id',
          hint: {
            text: 'This is a hint'
          }
        }
      ]
    },
    { renderMode: 'react' }
  )
);

template.examples.forEach(example => {
  stories.add(example.name, () => render('radios', example.data, { renderMode: 'react' }));
});
