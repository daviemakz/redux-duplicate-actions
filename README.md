# Redux Duplicate Action Monitor

[![Greenkeeper badge](https://badges.greenkeeper.io/daviemakz/redux-duplicate-actions.svg)](https://greenkeeper.io/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdaviemakz%2Fredux-duplicate-actions.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdaviemakz%2Fredux-duplicate-actions?ref=badge_shield)

[![NPM](https://nodei.co/npm/redux-duplicate-actions.png?compact=true)](https://www.npmjs.com/package/redux-duplicate-actions)  

[![Build Status](https://travis-ci.org/daviemakz/redux-duplicate-actions.svg?branch=master)](https://travis-ci.org/daviemakz/redux-duplicate-actions)
[![Dependencies Status](https://david-dm.org/daviemakz/redux-duplicate-actions/status.svg)](https://david-dm.org/daviemakz/redux-duplicate-actions)
[![Development Dependencies Status](https://david-dm.org/daviemakz/redux-duplicate-actions/dev-status.svg)](https://david-dm.org/daviemakz/redux-duplicate-actions?type=dev)

This is a redux middleware that detects duplicate actions &amp; shows this in the console. Ideal for ensuring good redux practices. Development use only!

*Supports Node 10.x +*  

## Usage

```js
// Only includes in DEV mode
if (__DEV__) {
  // To throw a fatal error use the below:
  const reduxDuplicateActions = require('redux-duplicate-actions')(true)
  reduxMiddleware.push(reduxDuplicateActions)
  // To just show a warning:
  const reduxDuplicateActions = require('redux-duplicate-actions')(false)
  reduxMiddleware.push(reduxDuplicateActions)
}
```

## Test

Run the following commands to test the module:

`npm install && npm test`

## Contributing

All contributions are very welcome, please read my [CONTRIBUTING.md](https://github.com/daviemakz/redux-duplicate-actions/blob/master/CONTRIBUTING.md) first. You can submit any ideas as [pull requests](https://github.com/daviemakz/redux-duplicate-actions/pulls) or as [GitHub issues](https://github.com/daviemakz/redux-duplicate-actions/issues). If you'd like to improve code, please feel free!


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdaviemakz%2Fredux-duplicate-actions.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdaviemakz%2Fredux-duplicate-actions?ref=badge_large)
