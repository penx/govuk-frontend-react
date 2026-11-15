import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';

export type RootProps = ComponentProps<'details'>;

export function Root({ className, ...props }: RootProps) {
  return <details className={clsx('govuk-details', className)} {...props} />;
}

export type SummaryProps = ComponentProps<'summary'>;

export function Summary({ className, ...props }: SummaryProps) {
  return <summary className={clsx('govuk-details__summary', className)} {...props} />;
}

export type SummaryTextProps = ComponentProps<'span'>;

export function SummaryText({ className, ...props }: SummaryTextProps) {
  return <span className={clsx('govuk-details__summary-text', className)} {...props} />;
}

export type TextProps = ComponentProps<'div'>;

export function Text({ className, ...props }: TextProps) {
  return <div className={clsx('govuk-details__text', className)} {...props} />;
}

export type CompositeProps = RootProps & { summary: ReactNode };

export function Composite({ summary, children, ...props }: CompositeProps) {
  return (
    <Root {...props}>
      <Summary>
        <SummaryText>{summary}</SummaryText>
      </Summary>
      <Text>{children}</Text>
    </Root>
  );
}
