import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Slot } from '../../utils/slot';
import { hasContent } from '../../utils/has-content';
import { Crown as BaseCrown, type CrownProps } from '@govuk-react/icon-crown';
import { WidthContainer } from '../../objects/width-container';

export { WidthContainer, type WidthContainerProps } from '../../objects/width-container';
export type { CrownProps };

export type RootProps = ComponentProps<'div'>;

export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-footer', className)} {...props} />;
}

export function Crown({ className, ...props }: CrownProps) {
  return <BaseCrown className={clsx('govuk-footer__crown', className)} {...props} />;
}

export type NavigationProps = ComponentProps<'div'>;

export function Navigation({ className, ...props }: NavigationProps) {
  return <div className={clsx('govuk-footer__navigation', className)} {...props} />;
}

type ColumnWidth =
  'full' | 'one-half' | 'one-third' | 'two-thirds' | 'one-quarter' | 'three-quarters';

export type SectionProps = ComponentProps<'div'> & {
  width?: ColumnWidth | `${ColumnWidth}-from-desktop`;
};

export function Section({ className, width = 'full', ...props }: SectionProps) {
  return (
    <div
      className={clsx('govuk-footer__section', `govuk-grid-column-${width}`, className)}
      {...props}
    />
  );
}

export type HeadingProps = ComponentProps<'h2'>;

export function Heading({ className, children, ...props }: HeadingProps) {
  return (
    <h2 className={clsx('govuk-footer__heading', 'govuk-heading-m', className)} {...props}>
      {children}
    </h2>
  );
}

export type ListProps = ComponentProps<'ul'> & {
  columns?: 1 | 2 | 3;
};

export function List({ className, columns, ...props }: ListProps) {
  return (
    <ul
      className={clsx(
        'govuk-footer__list',
        columns && `govuk-footer__list--columns-${columns}`,
        className,
      )}
      {...props}
    />
  );
}

export type ListItemProps = ComponentProps<'li'>;

export function ListItem({ className, ...props }: ListItemProps) {
  return <li className={clsx('govuk-footer__list-item', className)} {...props} />;
}

export type LinkProps = ComponentProps<'a'> & {
  /** Render the only child (such as a router's link) instead of an `a`, with the link classes merged onto it. */
  asChild?: boolean;
};

export function Link({ className, asChild, children, ...props }: LinkProps) {
  const Element = asChild ? Slot : 'a';
  return (
    <Element className={clsx('govuk-footer__link', className)} {...props}>
      {children}
    </Element>
  );
}

export type SectionBreakProps = ComponentProps<'hr'>;

export function SectionBreak({ className, ...props }: SectionBreakProps) {
  return <hr className={clsx('govuk-footer__section-break', className)} {...props} />;
}

export type MetaProps = ComponentProps<'div'>;

export function Meta({ className, ...props }: MetaProps) {
  return <div className={clsx('govuk-footer__meta', className)} {...props} />;
}

export type MetaItemProps = ComponentProps<'div'> & {
  grow?: boolean;
};

export function MetaItem({ className, grow, ...props }: MetaItemProps) {
  return (
    <div
      className={clsx(
        'govuk-footer__meta-item',
        grow && 'govuk-footer__meta-item--grow',
        className,
      )}
      {...props}
    />
  );
}

export type MetaHeadingProps = ComponentProps<'h2'>;

export function MetaHeading({ className, children, ...props }: MetaHeadingProps) {
  return (
    <h2 className={clsx('govuk-visually-hidden', className)} {...props}>
      {hasContent(children) ? children : 'Support links'}
    </h2>
  );
}

export type InlineListProps = ComponentProps<'ul'>;

export function InlineList({ className, ...props }: InlineListProps) {
  return <ul className={clsx('govuk-footer__inline-list', className)} {...props} />;
}

export type InlineListItemProps = ComponentProps<'li'>;

export function InlineListItem({ className, ...props }: InlineListItemProps) {
  return <li className={clsx('govuk-footer__inline-list-item', className)} {...props} />;
}

export type MetaCustomProps = ComponentProps<'div'>;

export function MetaCustom({ className, ...props }: MetaCustomProps) {
  return <div className={clsx('govuk-footer__meta-custom', className)} {...props} />;
}

export type LicenceLogoProps = ComponentProps<'svg'>;

export function LicenceLogo({ className, ...props }: LicenceLogoProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={clsx('govuk-footer__licence-logo', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 483.2 195.7"
      height="17"
      width="41"
      {...props}
    >
      <path
        fill="currentColor"
        d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
      />
    </svg>
  );
}

export type LicenceDescriptionProps = ComponentProps<'span'>;

export function LicenceDescription({ className, ...props }: LicenceDescriptionProps) {
  return <span className={clsx('govuk-footer__licence-description', className)} {...props} />;
}

export function LicenceDescriptionComposite({ children, ...props }: LicenceDescriptionProps) {
  return (
    <LicenceDescription {...props}>
      {hasContent(children) ? (
        children
      ) : (
        <>
          All content is available under the{' '}
          <Link
            href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
            rel="license"
          >
            Open Government Licence v3.0
          </Link>
          , except where otherwise stated
        </>
      )}
    </LicenceDescription>
  );
}

export type CopyrightLogoProps = ComponentProps<'a'>;

export function CopyrightLogo({ className, children, ...props }: CopyrightLogoProps) {
  return (
    <Link
      className={clsx('govuk-footer__copyright-logo', className)}
      href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
      {...props}
    >
      {hasContent(children) ? children : '© Crown copyright'}
    </Link>
  );
}

export type CompositeProps = RootProps & {
  containerClassName?: string;
  /** `Section`s, shown above the meta links. */
  navigation?: ReactNode;
  metaHeading?: ReactNode;
  /** `InlineListItem`s. */
  metaLinks?: ReactNode;
  metaContent?: ReactNode;
  /** Defaults to the Open Government Licence. Pass `false` to leave it out. */
  licence?: ReactNode;
  copyright?: ReactNode;
};

export function Composite({
  containerClassName,
  navigation,
  metaHeading,
  metaLinks,
  metaContent,
  licence,
  copyright,
  ...props
}: CompositeProps) {
  const meta = hasContent(metaHeading) || hasContent(metaLinks) || hasContent(metaContent);
  return (
    <Root {...props}>
      <WidthContainer className={containerClassName}>
        <Crown />
        {hasContent(navigation) && (
          <>
            <Navigation>{navigation}</Navigation>
            <SectionBreak />
          </>
        )}
        <Meta>
          <MetaItem grow>
            {meta && <MetaHeading>{metaHeading}</MetaHeading>}
            {hasContent(metaLinks) && <InlineList>{metaLinks}</InlineList>}
            {hasContent(metaContent) && <MetaCustom>{metaContent}</MetaCustom>}
            {licence !== false && (
              <>
                <LicenceLogo /> <LicenceDescriptionComposite>{licence}</LicenceDescriptionComposite>
              </>
            )}
          </MetaItem>
          <MetaItem>
            <CopyrightLogo>{copyright}</CopyrightLogo>
          </MetaItem>
        </Meta>
      </WidthContainer>
    </Root>
  );
}
