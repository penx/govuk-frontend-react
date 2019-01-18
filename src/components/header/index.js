// TODO: flow
import * as React from 'react';
import type { ComponentType } from 'react';
import cx from 'classnames';
import styles from './_header.module.scss';
import {
  Container,
  Content,
  Logo,
  MenuButton,
  Navigation,
  NavigationItem,
  ServiceName
} from './elements';

type Props = {
  className?: string,
  homepageUrl?: string,
  homepage?: {
    as?: ComponentType<{}> | string
  },
  containerClasses?: string,
  productName?: string,
  serviceName?: string,
  navigation?: node,
  serviceUrl?: string
};

// TODO: allow state to be controlled
// TODO: Allow jsEnabled to be preset via context api

class Header extends React.Component<Props> {
  state = {
    jsEnabled: false,
    open: false
  };

  componentDidMount() {
    this.setState({ jsEnabled: true });
  }

  handleMenuClick = () => {
    // if this.props.onChange
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    const {
      children,
      className,
      productName,
      serviceName,
      navigation,
      serviceUrl,
      homepage,
      homepageUrl,
      containerClasses,
      ...props
    } = this.props;

    const { jsEnabled, open } = this.state;

    return (
      <header
        className={cx(styles['govuk-header'], jsEnabled && styles['js-enabled'], className)}
        role="banner"
        data-module="header"
        {...props}
      >
        {children || (
          <Container className={containerClasses}>
            <Logo homepage={homepage} homepageUrl={homepageUrl} productName={productName} />
            {(serviceName || navigation) && (
              <Content>
                {serviceName && <ServiceName serviceUrl={serviceUrl}>{serviceName}</ServiceName>}
                {navigation && (
                  <React.Fragment>
                    <MenuButton open={open} onClick={this.handleMenuClick}>
                      Menu
                    </MenuButton>
                    <Navigation open={open}>{navigation}</Navigation>
                  </React.Fragment>
                )}
              </Content>
            )}
          </Container>
        )}
      </header>
    );
  }
}

Header.defaultProps = {
  className: undefined,
  homepageUrl: '/',
  homepage: { as: 'a' },
  containerClasses: styles['govuk-width-container'],
  productName: undefined,
  serviceName: undefined,
  navigation: undefined,
  serviceUrl: undefined
};

Header.Container = Container;
Header.Content = Content;
Header.Logo = Logo;
Header.MenuButton = MenuButton;
Header.Navigation = Navigation;
Header.NavigationItem = NavigationItem;
Header.ServiceName = ServiceName;

export default Header;
