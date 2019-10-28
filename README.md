# govuk-frontend-react

[govuk-frontend](https://github.com/alphagov/govuk-frontend) as React components.


This is proof of concept, showing how <a href="https://github.com/alphagov/govuk-frontend">govuk-frontend</a> can be used as <a href="https://github.com/css-modules/css-modules">CSS modules</a> via a <a href="https://github.com/penx/govuk-frontend-react">set of React components</a> that is <a href="https://www.npmjs.com/package/govuk-frontend-react">published to npm</a>, in a way that is compatible with
<a href="https://github.com/facebook/create-react-app">create-react-app</a>,
<a href="https://nextjs.org">Next.js</a>,
<a href="https://github.com/final-form/react-final-form">Final Form</a>,
<a href="https://github.com/jaredpalmer/formik">Formik</a>,
<a href="https://github.com/ReactTraining/react-router">React Router</a>
and <a href="https://github.com/reach/router">Reach Router</a>,
with support for <a href="https://webpack.js.org/guides/tree-shaking/">tree shaking</a> and <a href="https://reactjs.org/docs/code-splitting.html">code splitting/lazy loading</a>.

See:

https://github.com/govuk-react/govuk-react/issues/76

## CSS Modules

govuk-frontend does not 100% support being used as CSS Modules, though there the potential for this to be added in future:

https://github.com/alphagov/govuk-design-system-architecture/pull/12

One aim of this project is to create a library that has all the features of govuk-react, but is powered by govuk-frontend. One of these features is path splitting or critical extraction of styles when used in a 'standard' React build system such as those used by create-react-app or next.js.

Path splitting for CSS is coming to next.js soon:

- RFC CSS Support https://github.com/zeit/next.js/issues/8626

As raised in the RFC for this feature, critically extracting CSS is potentially error prone due to the potential to extract global styles. However, when using CSS Modules, next.js is able to analyse what styles are not global and extract these. As such, next.js will only provide path splitting and critical extraction for CSS Modules. This is a reasonable approach and means in order to achieve this we need to use govuk-frontend as a set of CSS Modules and then identify what is broken and perhaps manually fix it, or raise as an issue on govuk-frontend (see list of issues below).


## Conventions

Common conventions used when deciding how to rewrite the nunjucks templates:

### BEM

When looking at govuk-frontend BEM class names:

- Blocks become exported components
- Elements become subcomponents either inside the same file as the main component or in an elements subfolder, and exported as a property of the main component.
- Modifiers become prop names of the component or subcomponent.


e.g. a class name of `govuk-my-block__my-element--my-modifier` implies:

- There is a component `<MyBlock />` available by calling `import { MyBlock } from 'govuk-frontend-react'` that sits at `/src/{type}/my-block/index.js`
- There is a subcomponent `<MyBlock.MyElement />` that is defined either in `/src/{type}/my-block/index.js` or in `/src/{type}/my-block/elements/my-element.js`
- `<MyBlock.MyElement />` accepts a prop `myModifier`
- `{type}` can be `objects` or `components` following govuk-frontend/ITCSS classification.


e.g. a class name of `govuk-radios__conditional--hidden` implies:

- There is a component `<Radios />` available by calling `import { Radios } from 'govuk-frontend-react'` that sits at `/src/components/radios/index.js`
- There is a subcomponent `<Radios.Conditional />` that is defined either in `/src/components/radios/index.js` or in `/src/components/radios/elements/conditional.js`
- `<Radios.Conditional />` accepts a prop `hidden`


TODO: props (modifiers) sent to component should be made available to overrding sub components (elements) - how to do this?

=> if you want to intercept the modifiers as props then provide custom elements/components (CSSinJS with styled function)
=> if you just want to provide className lookup then use classNames (CSS Modules)/CSSinJS with css function

BEM convention classname exceptions:
- govuk-label-wrapper

### Props

Where our React prop names differ from the nunjucks macro option names.

| nunjucks | react |
| --- | --- |
| element | as  |
| attributes | rest props (where appropriate) |
| text | children (where appropriate) |
| html | children (where appropriate) |
| describedBy | aria-describedby |

This conversion can be seen in more detail in `tests/render.js` (though this file needs cleaning up at time of writing).

## Create React App support

Works! Including:

- Lazy loading/path splitting
- Tree shaking of CSS

See https://github.com/penx/govuk-frontend-react-example

## TODO:

I aim to complete the following as part of the PoC:

- [x] Button
- [x] Header compatible with React Router
- [x] Support for js-enabled class, used by Header, plus any associated JS required by Header
- [x] Input with Final Form and Formik examples.
- [x] Date Input with Final Form and Formik examples.
- [x] Radios
- [ ] Tables
- [ ] Error summary with Formik and Final Form examples, following govuk design system guidelines.
- [ ] Reach router fixtures
- [x] Code coverage checks in CI
- [ ] 100% code coverage
- [x] Meaningful unit tests
- [x] Use/match govuk-frontend template tests
- [x] Prettier
- [x] Flow
- [x] [Create React App example](https://github.com/penx/govuk-frontend-react-example) with lazy loading/path splitting and tree shaking
- [x] [Next.js example](https://github.com/penx/govuk-frontend-react-example-next)
  - [ ] Support for path splitting blocked by [zeit/next-plugins#190](https://github.com/zeit/next-plugins/pull/190) ([related](https://spectrum.chat/next-js/general/dynamic-css-splitting~03351ba8-e4aa-4788-a8ce-2d765b1b1f61?m=MTUzNzE1NDM5ODQ5OQ==))
- [ ] Server side only example with form submit and display of form errors
- [ ] Separate styling and templates, e.g. so the same templates could be used by plain CSS classes, CSS modules or CSSinJS classes passed in as props
- [ ] Non CSS modules version
- [ ] CSSinJS PoC
- [ ] Compile all .module.scss to .module.css and include in npm package to prevent conflicts if using multiple versions
- [ ] Review remaining TODO: and put in to GitHub issues
- [ ] More stories/use cases for radio buttons

Other TODO:

- [ ] Script to convert govuk-frontend attributes to prop types (or Flow types)
- [ ] Export standalone templates, CSS includes and CSS modules separately, e.g. `import { Button } from 'govuk-frontend-react'` `import { Button } from 'govuk-frontend-react-templates'`, `import { Button } from 'govuk-frontend-react-modules'`
- [ ] Use Jest snapshots from govuk-frontend rather than manually copying
- [ ] refactor render.js so that it is easier to scale
- [ ] Greenkeeper and CI releases on template spec, feeding in to Greenkeeper on templates => automated flagging of new releases of govuk-frontend


## Grey areas

Things that I'm not 100% on how to deal with:

- custom CSS classes such as "width-2" class on Input being passed in as props but are actually CSS modules - could look up via a classNames object first?
- should we allow shortcuts so that `label={{children: 'Label'}}` can just be specified as `label="Label"`? Or should we separate in to two props, `label` and `labelProps`?
- should `elements` and `classNames` props use the context API to ensure ancestor elements can always access without prop drilldown?

### govuk-frontend related issues

- https://github.com/alphagov/govuk-frontend/issues/1095
- https://github.com/alphagov/govuk-frontend/issues/1150
- https://github.com/alphagov/govuk-frontend/issues/1151
- https://github.com/alphagov/govuk-frontend/issues/460
