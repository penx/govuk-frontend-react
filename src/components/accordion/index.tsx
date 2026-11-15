import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { i18nAttributes } from '../../utils/i18n';

export type RootProps = ComponentProps<'div'> & {
  hideAllSectionsText?: string;
  hideSectionText?: string;
  hideSectionAriaLabelText?: string;
  showAllSectionsText?: string;
  showSectionText?: string;
  showSectionAriaLabelText?: string;
  rememberExpanded?: boolean;
};

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

export type SectionProps = ComponentProps<'div'> & { expanded?: boolean };

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
    accordionId: string;
    /** The section's position, from 1, used in its ids as the macro does. */
    index: number;
    heading: ReactNode;
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
