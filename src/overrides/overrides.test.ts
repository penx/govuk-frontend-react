import { overrideClasses } from '.';

test('returns the override classes for the props', () => {
  expect(overrideClasses({ marginBottom: 0, fontWeight: 'bold', hideWhenPrinting: true })).toBe(
    'govuk-!-margin-bottom-0 govuk-!-font-weight-bold govuk-!-display-none-print',
  );
});

test('uses static spacing when asked', () => {
  expect(overrideClasses({ padding: 2, staticSpacing: true })).toBe('govuk-!-static-padding-2');
});

test('returns undefined when there are none', () => {
  expect(overrideClasses({})).toBeUndefined();
});
