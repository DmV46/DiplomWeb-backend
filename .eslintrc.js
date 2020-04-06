module.exports = {
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "env": {
    "es6": true
  },
  "rules": {
    "no-underscore-dangle": ["error", { "allow": ["_id","__v"] }],
  },
  "extends": "airbnb-base"
}