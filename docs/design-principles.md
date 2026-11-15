# Design principles

1. **A direct markup port.** Each component renders the same HTML as govuk-frontend's macro, even where React developers may expect a different pattern. Anything it derives can be overridden with a prop or by composing the parts.
2. **Works wherever React renders.** No context, state or effects; where the macro derives a value from a parent, a part presets it instead (`Table.RowHeader`). Every part renders on its own, so components work on the server, in Server Components, as templates and in separate islands. Opinions and enhancements belong in [govuk-react](https://github.com/govuk-react/govuk-react).
3. **Compose parts, don't configure them.** Props take content, never objects to spread onto another part, with one exception: a composite may offer its items as an array prop, as a convenience. It always takes them as children too, never both at once, and its JSDoc recommends children. Spaces between inline parts are yours to write, as in HTML. Parts come first, and a composite is layered on top, built from them. Where a part has a version that renders several elements, such as markup the macro always renders, that version is named `Composite`, `Field`, `XComposite` or `XField` (`Feedback.Composite`, `ErrorMessageComposite`), and every element it renders is also a part. Re-exported parts keep the composite's defaults (`Feedback.GridColumn` is two-thirds). Every multi-part component has a `Composite` (`Field` for form controls) that covers basic usage. Where `Root` is already a single element around a list, the item's composite covers it (`TaskList.ItemComposite`). An SVG counts as one element. Tabs is the exception: its tab list and panels repeat the same ids, so children can't build both, and it's parts only.
4. **No govuk classes in your code.** Every class you need comes from a part or a prop. Where a component expects something from another package, such as the logo, it re-exports it as a part with the class applied.
5. **ES modules.** ESM only. A component with several parts is a module of named exports (`Input.Control`), never properties on a component.
6. **`Root` is the outermost part,** and only exists when other parts sit inside it. Single-part components are named after themselves, and form controls have `Control` and the `Field` shorthand.
7. **One component, one folder,** with its stories and tests. Styles come from govuk-frontend's CSS.
8. **Tests that catch real problems.** Fixture parity proves the HTML. Unit tests cover only what parity can't see.

## API styles by component

- **Root**: the outermost part, with other parts inside it.
- **Single**: one part, named after the component.
- **Composite**: `Composite`, or `Field` for form controls, renders basic usage from the parts.
- **Other composites**: parts that render several elements (`XComposite`).
- **Array prop**: the composite also takes its items as an array, instead of children.
- **Builds on**: parts that re-export or wrap another component's part.

| Component           | Root | Single | Composite                     | Other composites                                                        | Array prop | Builds on                              |
| ------------------- | ---- | ------ | ----------------------------- | ----------------------------------------------------------------------- | ---------- | -------------------------------------- |
| Accordion           | ✓    |        | `Composite`                   | `SectionComposite`                                                      | `sections` |                                        |
| Back link           |      | ✓      |                               |                                                                         |            |                                        |
| Breadcrumbs         | ✓    |        | `Composite`                   | `ItemComposite`                                                         | `items`    |                                        |
| Button              | ✓    |        | `Composite`                   |                                                                         |            |                                        |
| Character count     | ✓    |        | `Field`                       |                                                                         |            | `Textarea`, `Hint`                     |
| Checkboxes          | ✓    |        | `Field`                       | `ItemComposite`                                                         | `items`    | `Label`, `Hint`                        |
| Cookie banner       | ✓    |        | `Composite`                   | `MessageComposite`                                                      |            | `GridRow`, `GridColumn`, `ButtonGroup` |
| Date input          | ✓    |        | `Field`                       |                                                                         |            | `Label`, `Input`                       |
| Details             | ✓    |        | `Composite`                   |                                                                         |            |                                        |
| Error message       |      | ✓      |                               | `ErrorMessageComposite`                                                 |            |                                        |
| Error summary       | ✓    |        | `Composite`                   | `ListItemComposite`                                                     | `errors`   |                                        |
| Exit this page      | ✓    |        | `Composite`                   |                                                                         |            | `Button`                               |
| Feedback            | ✓    |        | `Composite`                   |                                                                         |            | `GridRow`, `GridColumn`                |
| Fieldset            | ✓    |        | `Composite`                   | `LegendComposite`                                                       |            |                                        |
| File upload         |      |        | `Field`                       |                                                                         |            |                                        |
| Footer              | ✓    |        | `Composite`                   | `LicenceDescriptionComposite`                                           |            | `WidthContainer`, `Crown`              |
| Generic header      | ✓    |        | `Composite`                   |                                                                         |            |                                        |
| Header              | ✓    |        | `Composite`                   |                                                                         |            | `Logotype`                             |
| Hint                |      | ✓      |                               |                                                                         |            |                                        |
| Input               |      |        | `Field`                       |                                                                         |            |                                        |
| Inset text          |      | ✓      |                               |                                                                         |            |                                        |
| Label               |      |        |                               | `LabelComposite`                                                        |            |                                        |
| Language navigation | ✓    |        | `Composite`                   | `ItemComposite`                                                         | `items`    |                                        |
| Notification banner | ✓    |        | `Composite`                   |                                                                         |            |                                        |
| Pagination          | ✓    |        | `Composite`                   | `ItemComposite`, `PreviousLinkTitleComposite`, `NextLinkTitleComposite` | `items`    |                                        |
| Panel               | ✓    |        | `Composite`                   |                                                                         |            |                                        |
| Password input      | ✓    |        | `Field`                       |                                                                         |            | `Input`, `Button`                      |
| Phase banner        | ✓    |        | `Composite`                   |                                                                         |            | `Tag`                                  |
| Radios              | ✓    |        | `Field`                       | `ItemComposite`                                                         | `items`    | `Label`, `Hint`                        |
| Select              |      |        | `Field`                       |                                                                         |            |                                        |
| Service navigation  | ✓    |        | `Composite`                   | `ItemComposite`                                                         | `items`    | `WidthContainer`                       |
| Skip link           |      | ✓      |                               |                                                                         |            |                                        |
| Summary list        | ✓    |        | `Composite`, `Card.Composite` | `RowComposite`, `ActionComposite`                                       | `rows`     |                                        |
| Table               | ✓    |        | `Composite`                   |                                                                         |            |                                        |
| Tabs                | ✓    |        |                               |                                                                         |            |                                        |
| Tag                 |      | ✓      |                               |                                                                         |            |                                        |
| Task list           | ✓    |        | `Composite`                   | `ItemComposite`                                                         | `items`    |                                        |
| Textarea            |      |        | `Field`                       |                                                                         |            |                                        |
| Warning text        | ✓    |        | `Composite`                   | `TextComposite`                                                         |            |                                        |
