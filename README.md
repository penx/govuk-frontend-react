# govuk-frontend-react

govuk-frontend as React components.

At the moment this is a PoC to show how we can import govuk-frontend in to an npm module and provide React components to a parent project via npm.

See:

https://github.com/govuk-react/govuk-react/issues/76

At the moment we are using CSS classes directly but plan to move to CSS modules once the following has been resolved:

https://github.com/alphagov/govuk-frontend/issues/1052


## Conventions

Common nunjucks:react props:

element:as

## Lazy loading support in CRA

We want to prove this will work but there are issues:

- https://github.com/facebook/create-react-app/issues/5989

We can work around this by importing components directly:

```js
import Header from "govuk-frontend-react/es/components/header";
```

## TODO:

- [ ] Button
- [ ] Header
- [ ] Date Input
- [ ] Code coverage
- [ ] Unit test to contrast with nunjucks html output
- [ ] Prettier
- [ ] TypeScript or Flow
