import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Composite as FooterComposite } from '../../components/footer';
import { Composite as HeaderComposite } from '../../components/header';
import { Composite as ServiceNavigationComposite } from '../../components/service-navigation';
import { SkipLink } from '../../components/skip-link';
import { MainWrapper } from '../main-wrapper';
import { WidthContainer } from '../width-container';

export type RootProps = ComponentProps<'html'>;

export function Root({ lang = 'en', className, ...props }: RootProps) {
  return <html lang={lang} className={clsx('govuk-template', className)} {...props} />;
}

export type HeadCompositeProps = ComponentProps<'head'> & {
  title?: ReactNode;
  titleLang?: string;
  themeColor?: string;
  assetPath?: string;
  /** Used for the Open Graph image when `opengraphImageUrl` isn't set. */
  assetUrl?: string;
  opengraphImageUrl?: string;
};

/** The template's `<head>`: meta tags, title and icons. Children go before the icons. */
export function HeadComposite({
  title = 'GOV.UK - The best place to find government services and information',
  titleLang,
  themeColor = '#1d70b8',
  assetPath = '/assets',
  assetUrl,
  opengraphImageUrl,
  children,
  ...props
}: HeadCompositeProps) {
  const opengraphImage =
    opengraphImageUrl || (assetUrl && `${assetUrl}/images/govuk-opengraph-image.png`);
  return (
    <head {...props}>
      <meta charSet="utf-8" />
      <title lang={titleLang}>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="theme-color" content={themeColor} />
      {children}
      <link rel="icon" sizes="48x48" href={`${assetPath}/images/favicon.ico`} />
      <link rel="icon" sizes="any" href={`${assetPath}/images/favicon.svg`} type="image/svg+xml" />
      <link rel="mask-icon" href={`${assetPath}/images/govuk-icon-mask.svg`} color={themeColor} />
      <link rel="apple-touch-icon" href={`${assetPath}/images/govuk-icon-180.png`} />
      <link rel="manifest" href={`${assetPath}/manifest.json`} />
      {opengraphImage && <meta property="og:image" content={opengraphImage} />}
    </head>
  );
}

export type BodyProps = ComponentProps<'body'>;

export function Body({ className, ...props }: BodyProps) {
  return <body className={clsx('govuk-template__body', className)} {...props} />;
}

export type HeaderProps = ComponentProps<'header'>;

export function Header({ className, ...props }: HeaderProps) {
  return <header className={clsx('govuk-template__header', className)} {...props} />;
}

export type FooterProps = ComponentProps<'footer'>;

export function Footer({ className, ...props }: FooterProps) {
  return <footer className={clsx('govuk-template__footer', className)} {...props} />;
}

export type CompositeProps = Omit<RootProps, 'title'> &
  Pick<
    HeadCompositeProps,
    'title' | 'titleLang' | 'themeColor' | 'assetPath' | 'assetUrl' | 'opengraphImageUrl'
  > & {
    head?: ReactNode;
    /** Defaults to a link to the main content. `false` leaves it out. */
    skipLink?: ReactNode;
    /** Defaults to `Header.Composite`. `false` leaves it out. */
    header?: ReactNode;
    serviceName?: ReactNode;
    serviceHref?: string;
    beforeContent?: ReactNode;
    mainLang?: string;
    /** Defaults to `Footer.Composite`. `false` leaves it out. */
    footer?: ReactNode;
  };

/** The whole page, as govuk-frontend's page template renders it. */
export function Composite({
  title,
  titleLang,
  themeColor,
  assetPath,
  assetUrl,
  opengraphImageUrl,
  head,
  skipLink = <SkipLink href="#main-content">Skip to main content</SkipLink>,
  header = <HeaderComposite />,
  serviceName,
  serviceHref,
  beforeContent,
  mainLang,
  footer = <FooterComposite />,
  children,
  ...props
}: CompositeProps) {
  const serviceNavigation = serviceName ? (
    <ServiceNavigationComposite serviceName={serviceName} serviceHref={serviceHref} />
  ) : null;
  return (
    <Root {...props}>
      <HeadComposite
        title={title}
        titleLang={titleLang}
        themeColor={themeColor}
        assetPath={assetPath}
        assetUrl={assetUrl}
        opengraphImageUrl={opengraphImageUrl}
      >
        {head}
      </HeadComposite>
      <Body>
        {skipLink}
        {(header || serviceNavigation) && (
          <Header>
            {header}
            {serviceNavigation}
          </Header>
        )}
        <WidthContainer>
          {beforeContent}
          <MainWrapper lang={mainLang}>{children}</MainWrapper>
        </WidthContainer>
        {footer && <Footer>{footer}</Footer>}
      </Body>
    </Root>
  );
}
