import { storiesOf } from '@storybook/react';
import {
  withText, asALink, withSomeEmoji, withReactRouter,
  hrefAndRole, buttonWithType,
} from './fixtures';

storiesOf('Button', module)
  .add('with text', () => withText)
  .add('with some emoji', () => withSomeEmoji)
  .add('as a link', () => asALink)
  .add('with react-router', () => withReactRouter)
  .add('with href and role', () => hrefAndRole)
  .add('as button with type', () => buttonWithType);
