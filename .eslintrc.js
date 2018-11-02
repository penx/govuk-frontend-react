module.exports = {
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "env": {
    "es6": true
  },
  "rules": {
    "react/jsx-filename-extension": 0,
    "jsx-a11y/label-has-for": 0,
    "filenames/match-exported": 0,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to", "hrefLeft", "hrefRight" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }]
  },
  "overrides": [
    {
      "files": [ "test.js", "**.test.js" ],
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
