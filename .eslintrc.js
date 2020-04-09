module.exports = {
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "env": {
    "es6": true
  },
  "rules": {
    "no-underscore-dangle": ["error", { "allow": ["_id","__v"] }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  },
  "extends": "airbnb-base"
}