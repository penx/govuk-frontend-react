export type FluidWidth =
  'full' | 'three-quarters' | 'two-thirds' | 'one-half' | 'one-third' | 'one-quarter';

export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const widthClass = (width?: FluidWidth) => width && `govuk-!-width-${width}`;

export const marginBottomClass = (marginBottom?: Spacing) =>
  marginBottom !== undefined && `govuk-!-margin-bottom-${marginBottom}`;
