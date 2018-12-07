import { storiesOf } from '@storybook/react';
import { withText, asALink, withSomeEmoji, withReactRouter } from './fixtures';

storiesOf('Button', module)
  .add('with text', () => withText)
  .add('with some emoji', () => withSomeEmoji)
  .add('as a link', () => asALink)
  .add('with react-router', () => withReactRouter);
