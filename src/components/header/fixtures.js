import React from 'react';
// import { action } from '@storybook/addon-actions';
import { MemoryRouter, Link, Switch, Route } from 'react-router-dom';
import Header from '.';

export default (
  <Header
    productName="Product"
    serviceName="Service"
    navigation="Navigation"
    serviceUrl="ServiceUrl"
  />
);
export const withNavigation = (
  <Header
    homepage={{ href: '/' }}
    navigation={
      <React.Fragment>
        <Header.NavigationItem href="/">Home</Header.NavigationItem>
        <Header.NavigationItem href="/about">About</Header.NavigationItem>
      </React.Fragment>
    }
  />
);
export const withReactRouter = (
  <MemoryRouter>
    <React.Fragment>
      <Header
        homepage={{ to: '/', as: Link }}
        navigation={
          <React.Fragment>
            <Header.NavigationItem as={Link} to="/">
              Home
            </Header.NavigationItem>
            <Header.NavigationItem as={Link} to="/about">
              About
            </Header.NavigationItem>
          </React.Fragment>
        }
      />
      <Switch>
        <Route exact path="/" render={() => 'Home'} />
        <Route path="/about" render={() => 'About'} />
        <Route render={() => '404'} />
      </Switch>
    </React.Fragment>
  </MemoryRouter>
);

// TODO: with js disabled prop/override
