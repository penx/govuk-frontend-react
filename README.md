# govuk-frontend-react

[govuk-frontend](https://github.com/alphagov/govuk-frontend) as React components.


This is proof of concept, showing how <a href="https://github.com/alphagov/govuk-frontend">govuk-frontend</a> can be used as <a href="https://github.com/css-modules/css-modules">CSS modules</a> via a <a href="https://github.com/penx/govuk-frontend-react">set of React components</a> that is <a href="https://www.npmjs.com/package/govuk-frontend-react">published to npm</a>, in a way that is compatible with <a href="https://github.com/facebook/create-react-app">create-react-app</a>, with support for <a href="https://webpack.js.org/guides/tree-shaking/">tree shaking</a> and <a href="https://reactjs.org/docs/code-splitting.html">code splitting/lazy loading</a>.

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
- [ ] Support for js-enabled class, used by Header, plus any associated JS required by Header
- [ ] Date Input [compatible with Final Form](https://medium.com/@penx/form-elements-in-presentational-component-packages-a618e9aa7416)
- [ ] Code coverage checks in CI
- [ ] 100% code coverage
- [ ] Meaningful unit tests
- [ ] Unit test to validate against govuk-frontend nunjucks html output
- [ ] Prettier
- [ ] TypeScript or Flow?
- [x] [Create React App example](https://github.com/penx/govuk-frontend-react-example) with lazy loading/path splitting and tree shaking
- [x] [Next.js example](https://github.com/penx/govuk-frontend-react-example-next)
  - [ ] Support for path splitting blocked by [zeit/next-plugins#190](https://github.com/zeit/next-plugins/pull/190) ([related](https://spectrum.chat/next-js/general/dynamic-css-splitting~03351ba8-e4aa-4788-a8ce-2d765b1b1f61?m=MTUzNzE1NDM5ODQ5OQ==))
- [ ] Server side only example with form submit and display of form errors
