import { storiesOf } from '@storybook/react';
import template from 'govuk-frontend-template-spec/components/button/button.json';
import render from '../../../tests/render';

import {
  withText,
  asALink,
  withSomeEmoji,
  withReactRouter,
  hrefAndRole,
  buttonWithType
} from './fixtures';

storiesOf('Button', module)
  .add('with text', () => withText)
  .add('with some emoji', () => withSomeEmoji)
  .add('as a link', () => asALink)
  .add('with react-router', () => withReactRouter)
  .add('with href and role', () => hrefAndRole)
  .add('as button with type', () => buttonWithType);

const stories = storiesOf('Button/Button:spec', module);

template.examples.forEach(example => {
  stories.add(`Button spec: ${example.name}`, () =>
    render('button', example.data, { renderMode: 'react' })
  );
});
