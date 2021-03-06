<p align="left">
<a href="https://www.npmjs.com/package/redux-duplicate-actions" target="_blank"><img src="https://img.shields.io/npm/v/redux-duplicate-actions" alt="npm"/></a>
<a href="https://travis-ci.org/daviemakz/redux-duplicate-actions" target="_blank"><img src="https://travis-ci.org/daviemakz/redux-duplicate-actions.svg?branch=master" alt="Build Status"/></a>
<a href="https://www.npmjs.com/package/redux-duplicate-actions" target="_blank"><img src="https://img.shields.io/npm/dm/redux-duplicate-actions.svg" alt="Downloads"/></a>
<a href="https://github.com/daviemakz/redux-duplicate-actions/issues" target="_blank"><img src="https://img.shields.io/github/issues/daviemakz/redux-duplicate-actions" alt="GitHub issues"/></a>
<a href="https://github.com/daviemakz/redux-duplicate-actions/pulls" target="_blank"><img src="https://img.shields.io/github/issues-pr/daviemakz/redux-duplicate-actions" alt="GitHub pull requests"/></a>
<a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fdaviemakz%2Fredux-duplicate-actions?ref=badge_shield" target="_blank"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdaviemakz%2Fredux-duplicate-actions.svg?type=shield" alt="FOSSA Status"/></a>
<a href="https://www.npmjs.com/package/redux-duplicate-actions" target="_blank"><img src="https://img.shields.io/npm/l/redux-duplicate-actions" alt="NPM"/></a>
</p>

# Redux Duplicate Action Monitor

This is a redux middleware that detects duplicate actions &amp; shows this in the console. Ideal for ensuring good redux practices. Development use only!

_Supports Node 10.x +_

## Usage

```js
if (__DEV__) {
  const reduxDuplicateActions = require("redux-duplicate-actions")(true);
  reduxMiddleware.push(reduxDuplicateActions);
  const reduxDuplicateActions = require("redux-duplicate-actions")(false);
  reduxMiddleware.push(reduxDuplicateActions);
}
```

## Test

Run the following commands to test the module:

`npm install && npm test`

## Contributing

All contributions are very welcome, please read my [CONTRIBUTING.md](https://github.com/daviemakz/redux-duplicate-actions/blob/master/CONTRIBUTING.md) first. You can submit any ideas as [pull requests](https://github.com/daviemakz/redux-duplicate-actions/pulls) or as [GitHub issues](https://github.com/daviemakz/redux-duplicate-actions/issues). If you'd like to improve code, please feel free!

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdaviemakz%2Fredux-duplicate-actions.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdaviemakz%2Fredux-duplicate-actions?ref=badge_large)
