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

class CustomHeader extends React.Component {
  state = {
    open: false
  };

  handleMenuClick = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  render() {
    const { open } = this.state;
    return (
      <Header>
        <Header.Container>
          <Header.Logo homepageUrl="/" productName="Product" />
          <Header.Content>
            <Header.ServiceName serviceUrl="/">Service</Header.ServiceName>
            <Header.MenuButton open={open} onClick={this.handleMenuClick}>
              Menu
            </Header.MenuButton>
            <Header.Navigation open={open}>
              <Header.NavigationItem href="/">Home</Header.NavigationItem>
              <Header.NavigationItem href="/about">About</Header.NavigationItem>
            </Header.Navigation>
          </Header.Content>
        </Header.Container>
      </Header>
    );
  }
}

export const fromElements = <CustomHeader />;

// TODO: with js disabled prop/override
