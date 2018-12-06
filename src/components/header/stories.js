import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '.';

storiesOf('Header', module)
  .add('default', () => <Header productName="Product" serviceName="Service" navigation="Navigation" serviceUrl="ServiceUrl" />);
