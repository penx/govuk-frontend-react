export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type FluidWidth =
  'full' | 'three-quarters' | 'two-thirds' | 'one-half' | 'one-third' | 'one-quarter';

const spacingClasses = {
  margin: 'margin',
  marginTop: 'margin-top',
  marginRight: 'margin-right',
  marginBottom: 'margin-bottom',
  marginLeft: 'margin-left',
  padding: 'padding',
  paddingTop: 'padding-top',
  paddingRight: 'padding-right',
  paddingBottom: 'padding-bottom',
  paddingLeft: 'padding-left',
} as const;

export type OverrideProps = { [K in keyof typeof spacingClasses]?: Spacing } & {
  /** Use the spacing that doesn't change at breakpoints. */
  staticSpacing?: boolean;
  width?: FluidWidth;
  fontSize?: 80 | 48 | 36 | 27 | 24 | 19 | 16;
  fontWeight?: 'regular' | 'bold';
  tabularNumbers?: boolean;
  textAlign?: 'left' | 'centre' | 'right';
  breakWord?: boolean;
  display?: 'block' | 'inline' | 'inline-block' | 'none';
  hideWhenPrinting?: boolean;
};

/** govuk-frontend's override classes (`govuk-!-*`) for the given props. */
export function overrideClasses(props: OverrideProps): string | undefined {
  const spacing = props.staticSpacing ? 'govuk-!-static-' : 'govuk-!-';
  const classes = Object.entries(spacingClasses)
    .filter(([key]) => props[key as keyof typeof spacingClasses] !== undefined)
    .map(([key, name]) => `${spacing}${name}-${props[key as keyof typeof spacingClasses]}`);
  if (props.width) classes.push(`govuk-!-width-${props.width}`);
  if (props.fontSize) classes.push(`govuk-!-font-size-${props.fontSize}`);
  if (props.fontWeight) classes.push(`govuk-!-font-weight-${props.fontWeight}`);
  if (props.tabularNumbers) classes.push('govuk-!-font-tabular-numbers');
  if (props.textAlign) classes.push(`govuk-!-text-align-${props.textAlign}`);
  if (props.breakWord) classes.push('govuk-!-text-break-word');
  if (props.display) classes.push(`govuk-!-display-${props.display}`);
  if (props.hideWhenPrinting) classes.push('govuk-!-display-none-print');
  return classes.join(' ') || undefined;
}
