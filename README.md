# govuk-frontend-react

[govuk-frontend](https://github.com/alphagov/govuk-frontend) as React components.

This is a direct port: each component renders the same HTML as govuk-frontend's own Nunjucks macro, and this is checked against every fixture that govuk-frontend publishes. Styles and JavaScript come from govuk-frontend itself.

It currently ports **govuk-frontend 6.6.0**. More opinionated components, and components govuk-frontend doesn't provide, belong in [govuk-react](https://github.com/govuk-react/govuk-react), which builds on this package.

> Work in progress. See [Status](#status) for what's ported so far.

## Install

```sh
npm install govuk-frontend-react govuk-frontend react
```

Requires React 19 or later.

Load govuk-frontend's styles as its [documentation](https://frontend.design-system.service.gov.uk/) describes, for example:

```scss
@use 'govuk-frontend';
```

## Usage

```tsx
import { Button, Fieldset, Label, Hint, ErrorMessage } from 'govuk-frontend-react';

<Fieldset.Root legend={{ children: 'What is your address?', isPageHeading: true, size: 'l' }}>
  <Label htmlFor="postcode">Postcode</Label>
  <Hint id="postcode-hint">For example, SW1A 2AA</Hint>
  <ErrorMessage id="postcode-error">Enter a postcode</ErrorMessage>
  …
</Fieldset.Root>

<Button.Root variant="secondary">Save as draft</Button.Root>
<Button.Root href="/start" start>Start now</Button.Root>
```

Each component is also its own module:

```tsx
import * as Fieldset from 'govuk-frontend-react/fieldset';
import { Label } from 'govuk-frontend-react/label';
```

The package is ES modules only.

## Conventions

Common conventions used when rewriting the Nunjucks templates.

### BEM

When looking at govuk-frontend BEM class names:

- Blocks become ES modules at `src/{type}/my-block/`, where `{type}` is `objects` or `components`, following govuk-frontend's ITCSS layers.
- A block with elements exports its main part as `Root` and each element as a named export. The package root exports the module as a namespace.
- A block without elements exports a single component named after the block.
- Modifiers become props of the part.
- Components are never attached to other components as properties.

For example, a class name of `govuk-my-block__my-element--my-modifier` implies:

- `import { MyBlock } from 'govuk-frontend-react'`, or `import * as MyBlock from 'govuk-frontend-react/my-block'`.
- The block is `<MyBlock.Root />` and the element is `<MyBlock.MyElement />`.
- `<MyBlock.MyElement />` accepts a prop `myModifier`.

So `govuk-fieldset__legend--l` is `<Fieldset.Legend size="l" />`, `govuk-button--secondary` is `<Button.Root variant="secondary" />`, and `govuk-hint` is `<Hint />`. Where a set of modifiers are alternatives, such as sizes or button variants, they share one prop.

BEM convention class name exceptions:

- `govuk-label-wrapper`

### Props

Where React prop names differ from the Nunjucks macro option names:

| Nunjucks             | React                                                    |
| -------------------- | -------------------------------------------------------- |
| `element`            | `as`                                                     |
| `attributes`         | rest props                                               |
| `text`               | `children`                                               |
| `html`               | `children`                                               |
| `caller`             | `children`                                               |
| `classes`            | `className`                                              |
| `describedBy`        | `aria-describedby`                                       |
| `for`                | `htmlFor`                                                |
| `isStartButton`      | `start`                                                  |
| `legend`, and others | a part, such as `Fieldset.Legend` (see Parts and fields) |

The full mapping for each component is in [`tests/nunjucks`](tests/nunjucks), which the parity tests use to render govuk-frontend's fixtures. It doubles as a guide for moving from Nunjucks to React.

### Parts and fields

Props never take an object that is spread onto another part. Where a Nunjucks macro takes options for a nested element, such as `label`, `hint`, `errorMessage`, `formGroup` or `prefix`, the React version is a part you compose:

```tsx
<FormGroup error>
  <Label htmlFor="cost">Cost</Label>
  <Hint id="cost-hint">In pounds</Hint>
  <ErrorMessage id="cost-error">Enter a cost</ErrorMessage>
  <Input.Wrapper>
    <Input.Prefix>£</Input.Prefix>
    <Input.Root id="cost" name="cost" error aria-describedby="cost-hint cost-error" />
  </Input.Wrapper>
</FormGroup>
```

Form controls also export a `Field` shorthand that does what the Nunjucks macro does: it renders the form group, label, hint and error message, and wires up the ids. Its `label`, `hint`, `errorMessage`, `prefix` and `suffix` props take content only; anything else uses the parts.

```tsx
<Input.Field name="cost" label="Cost" hint="In pounds" errorMessage="Enter a cost" prefix="£" />
```

### Faithful defaults

Components behave as govuk-frontend does, even where React would usually do it differently. For example, a form control's `id` falls back to its `name`, so two copies of the same form on a page get duplicate ids.

Anything a component derives can be overridden, so a library built on top, such as govuk-react, can change the behaviour without forking:

- `id` on a `Field`. The hint and error message ids are derived from it, so `id={useId()}` makes all three unique.
- The parts, which derive nothing, for full control over ids and `aria-describedby`.

## HTML parity

`npm run parity` renders every govuk-frontend fixture for each ported component and compares it with govuk-frontend's Nunjucks output. The comparison is on the parsed HTML: attribute order, attribute name case, class order and formatting whitespace are ignored, but elements, attributes, text and the whitespace between inline content must match. Labels and form controls count as blocks, since govuk-frontend lays them out that way. A fixture can only be skipped by listing it in [`tests/known-differences.ts`](tests/known-differences.ts) with a reason.

## Status

| Component     | Fixtures passing |
| ------------- | ---------------- |
| Button        | 38/38            |
| Error message | 9/9              |
| Fieldset      | 18/18            |
| Hint          | 6/6              |
| Input         | 45/45            |
| Label         | 17/17            |
| Select        | 19/19            |
| Textarea      | 18/18            |

The other 31 govuk-frontend components are planned.

## Development

```sh
npm install
npm test          # unit and parity tests
npm run parity    # parity tests only, with a summary table
npm run lint
npm run typecheck
npm run build
```
