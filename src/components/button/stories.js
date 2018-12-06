import { storiesOf } from '@storybook/react';
import { withText, asALink, withSomeEmoji } from './fixtures';

storiesOf('Button', module)
  .add('with text', () => withText)
  .add('with some emoji', () => withSomeEmoji)
  .add('as a link', () => asALink);
