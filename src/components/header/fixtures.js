import React from 'react';
// import { action } from '@storybook/addon-actions';

import Header from '.';

export default <Header productName="Product" serviceName="Service" navigation="Navigation" serviceUrl="ServiceUrl" />;
export const withNavigation = (
  <Header navigation={(
    <Header.Navigation>
      <Header.NavigationItem>Item 1</Header.NavigationItem>
      <Header.NavigationItem>Item 2</Header.NavigationItem>
    </Header.Navigation>
    )}
  />
);
