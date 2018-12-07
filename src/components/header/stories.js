import { storiesOf } from '@storybook/react';
import fixture, { withNavigation } from './fixtures';

storiesOf('Header', module)
  .add('default', () => fixture)
  .add('with navigation', () => withNavigation);
