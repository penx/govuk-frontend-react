There are 3 modes:

1. use default (don't specify children or items)
2. specify items prop
3. specify children prop

If both items and children are specified then children is used.

If using modes 1 or 2, React treats as a single field:
- onBlur only occurs when the user blurs away from the component - not when they tab between inputs in the same component
- the value in onChange is an object containing the value of all 3 items
- the value prop should be an object

When using mode 3, the peer application has complete control over Input behaviour and the 'merge' code from modes 1 + 2 is not applied.

One of the main issues with (1) and (2) is pairing this with Final Form or Formik and having input-level validation checks.
