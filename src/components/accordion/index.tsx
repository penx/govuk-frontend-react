import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { i18nAttributes } from '../../utils/i18n';

export type RootProps = ComponentProps<'div'> & {
  /** The text content of the 'Hide all sections' button at the top of the accordion when all sections are expanded. */
  hideAllSectionsText?: string;
  /** The text content of the 'Hide' button within each section of the accordion, which is visible when the section is expanded. */
  hideSectionText?: string;
  /** Text made available to assistive technologies, like screen-readers, as the final part of the toggle's accessible name when the section is expanded. Defaults to `"Hide this section"`. */
  hideSectionAriaLabelText?: string;
  /** The text content of the 'Show all sections' button at the top of the accordion when at least one section is collapsed. */
  showAllSectionsText?: string;
  /** The text content of the 'Show' button within each section of the accordion, which is visible when the section is collapsed. */
  showSectionText?: string;
  /** Text made available to assistive technologies, like screen-readers, as the final part of the toggle's accessible name when the section is collapsed. Defaults to `"Show this section"`. */
  showSectionAriaLabelText?: string;
  /** Whether the expanded/collapsed state of the accordion should be saved when a user leaves the page and restored when they return. Default is `true`. */
  rememberExpanded?: boolean;
};

/**
 * The accordion component lets users show and hide sections of related content on a page.
 *
 * @see https://design-system.service.gov.uk/components/accordion/
 */
export function Root({
  hideAllSectionsText,
  hideSectionText,
  hideSectionAriaLabelText,
  showAllSectionsText,
  showSectionText,
  showSectionAriaLabelText,
  rememberExpanded,
  className,
  ...props
}: RootProps) {
  return (
    <div
      className={clsx('govuk-accordion', className)}
      data-module="govuk-accordion"
      {...i18nAttributes('hide-all-sections', hideAllSectionsText)}
      {...i18nAttributes('hide-section', hideSectionText)}
      {...i18nAttributes('hide-section-aria-label', hideSectionAriaLabelText)}
      {...i18nAttributes('show-all-sections', showAllSectionsText)}
      {...i18nAttributes('show-section', showSectionText)}
      {...i18nAttributes('show-section-aria-label', showSectionAriaLabelText)}
      {...(rememberExpanded !== undefined && {
        'data-remember-expanded': String(rememberExpanded),
      })}
      {...props}
    />
  );
}

export type SectionProps = ComponentProps<'div'> & {
  /** Sets whether the section should be expanded when the page loads for the first time. Defaults to `false`. */
  expanded?: boolean;
};

export function Section({ expanded, className, ...props }: SectionProps) {
  return (
    <div
      className={clsx(
        'govuk-accordion__section',
        expanded && 'govuk-accordion__section--expanded',
        className,
      )}
      {...props}
    />
  );
}

export type SectionHeaderProps = ComponentProps<'div'>;

export function SectionHeader({ className, ...props }: SectionHeaderProps) {
  return <div className={clsx('govuk-accordion__section-header', className)} {...props} />;
}

export type SectionHeadingProps = ComponentProps<'h2'> & {
  /** Heading level, from `1` to `6`. Default is `2`. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function SectionHeading({ headingLevel = 2, className, ...props }: SectionHeadingProps) {
  const Heading = `h${headingLevel}` as const;
  return <Heading className={clsx('govuk-accordion__section-heading', className)} {...props} />;
}

export type SectionButtonProps = ComponentProps<'span'>;

export function SectionButton({ className, ...props }: SectionButtonProps) {
  return <span className={clsx('govuk-accordion__section-button', className)} {...props} />;
}

export type SectionSummaryProps = ComponentProps<'div'>;

export function SectionSummary({ className, ...props }: SectionSummaryProps) {
  return (
    <div className={clsx('govuk-accordion__section-summary', 'govuk-body', className)} {...props} />
  );
}

export type SectionContentProps = ComponentProps<'div'>;

export function SectionContent({ className, ...props }: SectionContentProps) {
  return <div className={clsx('govuk-accordion__section-content', className)} {...props} />;
}

export type SectionCompositeProps = SectionProps &
  Pick<SectionHeadingProps, 'headingLevel'> & {
    /** The `id` of the accordion, used as a prefix for the `id`s of the section contents and the buttons that open them. */
    accordionId: string;
    /** The section's position, from 1, used in its ids as the macro does. */
    index: number;
    /** The heading of each accordion section. The header is inside the HTML `<button>` element, so you can only add [phrasing content](https://html.spec.whatwg.org/#phrasing-content) to it. */
    heading: ReactNode;
    /** The summary line of each accordion section. The summary line is inside the HTML `<button>` element, so you can only add [phrasing content](https://html.spec.whatwg.org/#phrasing-content) to it. */
    summary?: ReactNode;
  };

export function SectionComposite({
  accordionId,
  index,
  heading,
  summary,
  headingLevel,
  children,
  ...props
}: SectionCompositeProps) {
  return (
    <Section {...props}>
      <SectionHeader>
        <SectionHeading headingLevel={headingLevel}>
          <SectionButton id={`${accordionId}-heading-${index}`}>{heading}</SectionButton>
        </SectionHeading>
        {hasContent(summary) && (
          <SectionSummary id={`${accordionId}-summary-${index}`}>{summary}</SectionSummary>
        )}
      </SectionHeader>
      <SectionContent id={`${accordionId}-content-${index}`}>{children}</SectionContent>
    </Section>
  );
}

export type CompositeProps = Omit<RootProps, 'id' | 'children'> &
  Pick<SectionHeadingProps, 'headingLevel'> & {
    /** Must be unique across the domain of your service if `rememberExpanded` is `true` (as the expanded state of individual instances of the component persists across page loads using [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)). Used as an `id` in the HTML for the accordion as a whole, and also as a prefix for the `id`s of the section contents and the buttons that open them, so that those `id`s can be the target of `aria-control` attributes. */
    id: string;
  } & (
    | { children?: ReactNode; sections?: never }
    | {
        children?: never;
        /** Prefer children, which memoise and re-render better. */
        sections: Omit<SectionCompositeProps, 'accordionId' | 'index' | 'headingLevel'>[];
      }
  );

/**
 * The accordion component lets users show and hide sections of related content on a page.
 *
 * Children are `SectionComposite`s. With `sections`, it fills in their ids and heading level.
 *
 * @see https://design-system.service.gov.uk/components/accordion/
 */
export function Composite({ id, headingLevel, sections, children, ...props }: CompositeProps) {
  return (
    <Root id={id} {...props}>
      {sections
        ? sections.map((section, index) => (
            <SectionComposite
              key={index}
              accordionId={id}
              index={index + 1}
              headingLevel={headingLevel}
              {...section}
            />
          ))
        : children}
    </Root>
  );
}
