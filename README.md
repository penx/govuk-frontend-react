# govuk-frontend-react

[govuk-frontend](https://github.com/alphagov/govuk-frontend) as React components.

This is a direct port: each component renders the same HTML as govuk-frontend's own Nunjucks macro, and this is checked against every fixture that govuk-frontend publishes. Styles come from govuk-frontend itself. Components are markup only, with no client-side behaviour.

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

<Fieldset.Root>
  <Fieldset.Legend isPageHeading size="l">What is your address?</Fieldset.Legend>
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

## Design principles

1. **A direct markup port.** Each component renders the same HTML as govuk-frontend's macro, even where React developers may expect a different pattern. Anything it derives can be overridden with a prop or by composing the parts.
2. **Works wherever React renders.** No context, state or effects; where the macro derives a value from a parent, a composite presets it instead (`Table.RowHeader`). Every part renders on its own, so components work on the server, in Server Components, as templates and in separate islands. Opinions and enhancements belong in [govuk-react](https://github.com/govuk-react/govuk-react).
3. **Compose parts, don't configure them.** Props take content, never objects to spread onto another part. Spaces between inline parts are yours to write, as in HTML. Parts come first, and a composite is layered on top, built from them. Markup the macro always renders, such as a grid, comes with its part (`Feedback.Root`). Where a composite renders an element that isn't already exported as a part, a `*Parts` module (`Feedback.RootParts`) has a part for each of its elements, starting with its own `Root`, so you can add props to any one. A `Field` needs none, because every part it renders is already exported. Parts it re-exports keep the composite's defaults (`Feedback.RootParts.GridColumn` is two-thirds).
4. **No govuk classes in your code.** Every class you need comes from a part or a prop. Where a component expects something from another package, such as the logo, it re-exports it as a part with the class applied.
5. **ES modules.** ESM only. A component with several parts is a module of named exports (`Input.Control`), never properties on a component.
6. **`Root` is the outermost part,** and only exists when other parts sit inside it. Single-part components are named after themselves, and form controls have `Control` and the `Field` shorthand.
7. **One component, one folder,** with its stories and tests. Styles come from govuk-frontend's CSS.
8. **Tests that catch real problems.** Fixture parity proves the HTML. Unit tests cover only what parity can't see.

## Conventions

How the [design principles](#design-principles) apply when rewriting the Nunjucks templates.

### BEM

When looking at govuk-frontend BEM class names:

- Blocks become ES modules at `src/{type}/my-block/`, where `{type}` is `core`, `objects`, `components` or `utilities`, following govuk-frontend's ITCSS layers.
- A block with elements exports each part as a named export, and the package root exports the module as a namespace.
- The part the others sit inside is `Root`. Form controls have none, because their outer element is a `FormGroup`.
- A block without elements exports a single component named after the block.
- Modifiers become props of the part.
- A `--hidden` modifier becomes a prop that names the visible state instead, such as `checked` on `Radios.Conditional`, because `hidden` is already an HTML attribute.

For example, a class name of `govuk-my-block__my-element--my-modifier` implies:

- `import { MyBlock } from 'govuk-frontend-react'`, or `import * as MyBlock from 'govuk-frontend-react/my-block'`.
- The block is `<MyBlock.Root />` and the element is `<MyBlock.MyElement />`.
- `<MyBlock.MyElement />` accepts a prop `myModifier`.

So `govuk-fieldset__legend--l` is `<Fieldset.Legend size="l" />`, `govuk-button--secondary` is `<Button.Root variant="secondary" />`, and `govuk-hint` is `<Hint />`. Where a set of modifiers are alternatives, such as sizes or button variants, they share one prop.

BEM convention class name exceptions:

- `govuk-label-wrapper`
- Typography sizes, such as `govuk-body-l` and `govuk-heading-m`, are a `size` prop: `<Body size="l" />`, `<Heading size="m" />`.

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
| `containerClasses`   | `containerClassName`                                     |
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
    <Input.Control id="cost" name="cost" error aria-describedby="cost-hint cost-error" />
  </Input.Wrapper>
</FormGroup>
```

Form controls also export a `Field` shorthand that does what the Nunjucks macro does: it renders the form group, label, hint and error message, and wires up the ids. Its `label`, `hint`, `errorMessage`, `prefix` and `suffix` props take content only; anything else uses the parts.

```tsx
<Input.Field name="cost" label="Cost" hint="In pounds" errorMessage="Enter a cost" prefix="£" />
```

### Overriding defaults

Following the first principle, the `Field` shorthand copies the macro's id handling, and each piece can be overridden:

- Pass `id` to a `Field`. The hint and error message ids are derived from it, so `id={useId()}` makes all three unique.
- Grouped controls, such as `Radios.Field` and `Checkboxes.Field`, take `idPrefix` instead, as the macro does.
- Compose the parts, which derive nothing, for full control over ids and `aria-describedby`.

## HTML parity

`npm run parity` renders every govuk-frontend fixture for each ported component and compares it with govuk-frontend's Nunjucks output. The comparison is on the parsed HTML: attribute order, attribute name case, class order, inline style formatting and formatting whitespace are ignored, but elements, attributes, text and the whitespace between inline content must match. Labels and form controls count as blocks, since govuk-frontend lays them out that way. A fixture can only be skipped by listing it in [`tests/known-differences.ts`](tests/known-differences.ts) with a reason.

## Status

| Component           | Fixtures passing |
| ------------------- | ---------------- |
| Accordion           | 13/13            |
| Back link           | 7/7              |
| Breadcrumbs         | 12/12            |
| Button              | 38/38            |
| Character count     | 34/34            |
| Checkboxes          | 42/42            |
| Cookie banner       | 23/23            |
| Date input          | 50/50            |
| Details             | 10/10            |
| Error message       | 9/9              |
| Error summary       | 19/19            |
| Exit this page      | 4/4              |
| Feedback            | 7/7              |
| Fieldset            | 18/18            |
| File upload         | 22/22            |
| Footer              | 25/25            |
| Generic header      | 7/7              |
| Header              | 6/6              |
| Hint                | 6/6              |
| Input               | 45/45            |
| Inset text          | 6/6              |
| Label               | 17/17            |
| Language navigation | 13/13            |
| Notification banner | 21/21            |
| Pagination          | 15/15            |
| Panel               | 18/19            |
| Password input      | 12/12            |
| Phase banner        | 7/7              |
| Radios              | 43/43            |
| Select              | 19/19            |
| Service navigation  | 33/33            |
| Skip link           | 9/9              |
| Summary list        | 30/30            |
| Table               | 21/21            |
| Tabs                | 14/14            |
| Tag                 | 12/12            |
| Task list           | 11/11            |
| Textarea            | 18/18            |
| Warning text        | 8/8              |

The other 10 govuk-frontend components are planned.

## Development

```sh
npm install
npm test          # unit and parity tests
npm run parity    # parity tests only, with a summary table
npm run lint
npm run typecheck
npm run build
```
