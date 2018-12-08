# govuk-frontend-react

govuk-frontend as React components.

At the moment this is a PoC to show how we can import govuk-frontend in to an npm module and provide React components to a parent project via npm.

See:

https://github.com/govuk-react/govuk-react/issues/76

## Conventions

Common conventions on where our React prop names differ from the nunjucks macro option names.

| nunjucks | react |
| --- | --- |
| element | as  |
| attributes | rest props (where appropriate) |
| text | children (where appropriate) |

## Create React App support

Works! Including:

- Lazy loading/path splitting
- Tree shaking of CSS

See https://github.com/penx/govuk-frontend-react-example

## TODO:

I aim to complete the following as part of the PoC:

- [x] Button
- [x] Header compatible with React Router
- [ ] Date Input [compatible with Final Form](https://medium.com/@penx/form-elements-in-presentational-component-packages-a618e9aa7416)
- [ ] Code coverage checks in CI
- [ ] 100% code coverage
- [ ] Meaningful unit tests
- [ ] Unit test to validate against govuk-frontend nunjucks html output
- [ ] Prettier
- [ ] TypeScript or Flow?
- [x] [Create React App example](https://github.com/penx/govuk-frontend-react-example) with lazy loading/path splitting and tree shaking
- [ ] [Next.js example](https://github.com/penx/govuk-frontend-react-example-next)
- [ ] Server side only example with form submit
