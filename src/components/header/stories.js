import { storiesOf } from '@storybook/react';
import fixture, { withNavigation, withReactRouter } from './fixtures';

storiesOf('Header', module)
  .add('default', () => fixture)
  .add('with navigation', () => withNavigation)
  .add('with react-router', () => withReactRouter);
