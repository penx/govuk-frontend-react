module.exports = {
  "parser": "babel-eslint",
  "extends": ["airbnb", "prettier", "react-app", "plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "env": {
    "es6": true
  },
  "rules": {
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-wrap-multilines": 0,
    "react/jsx-one-expression-per-line": 0,
    // https://github.com/yannickcr/eslint-plugin-react/issues/1593
    "react/default-props-match-prop-types": 0,
    "jsx-a11y/label-has-for": 0,
    "filenames/match-exported": 0,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to", "hrefLeft", "hrefRight" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }]
  },
  "settings": {
    "import/core-modules": ['prop-types']
  },
  "overrides": [
    {
      "files": [ "src/render/**", "stories.js", "test.js", "fixtures.js", "**.test.js", "src/stories/**" ],
      "rules": {
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
      }
    },
    {
      "files": [ "test.js", "**.test.js" ],
      "env": {
        "jest": true,
        "browser": true
      }
    }
  ]
}
