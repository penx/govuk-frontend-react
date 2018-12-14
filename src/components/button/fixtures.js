import React from 'react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter, Link, Switch, Route } from 'react-router-dom';

import Button from '.';

export default <Button />;

export const withText = <Button onClick={action('clicked')}>Hello Button</Button>;
export const withSomeEmoji = (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
export const asALink = <Button href="http://google.com">Hello Button</Button>;

export const withReactRouter = (
  <MemoryRouter>
    <React.Fragment>
      <Button as={Link} to="/">
        Home
      </Button>{' '}
      <Button as={Link} to="/about">
        About
      </Button>{' '}
      <Button as={Link} to="/missing">
        Bad link
      </Button>
      <div>
        <Switch>
          <Route exact path="/" render={() => 'Home'} />
          <Route path="/about" render={() => 'About'} />
          <Route render={() => '404'} />
        </Switch>
      </div>
    </React.Fragment>
  </MemoryRouter>
);

export const hrefAndRole = (
  <Button href="#test" role="presentation">
    HREF and role
  </Button>
);
export const buttonWithType = <Button type="button">Button with type</Button>;
