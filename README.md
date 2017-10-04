# Redux Duplicate Action Monitor

[![NPM](https://nodei.co/npm/redux-duplicate-actions.png?compact=true)](https://www.npmjs.com/package/redux-duplicate-actions)

[![Build Status](https://travis-ci.org/daviemakz/redux-duplicate-actions.svg?branch=master)](https://travis-ci.org/daviemakz/redux-duplicate-actions)

This is a redux middleware that detects duplicate actions &amp; shows this in the console. Ideal for ensuring good redux practices. Development use only!

### Usage

```js
// Only includes in DEV mode
if (__DEV__) {
  // To throw a fatal error use the below:
  const reduxDuplicateActions = require('redux-duplicate-actions')(true)
  reduxMiddleware.push(reduxDuplicateActions)
  // To just show a warning:
  const reduxDuplicateActions = require('redux-duplicate-actions')()
  reduxMiddleware.push(reduxDuplicateActions)
}
```

### Test

Run the following commands to test the module:

`npm install`
`npm test`
