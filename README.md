<p align="left">
<a href="https://www.npmjs.com/package/redux-duplicate-actions" target="_blank"><img src="https://img.shields.io/npm/v/redux-duplicate-actions" alt="npm"/></a>
<a href="https://www.npmjs.com/package/redux-duplicate-actions" target="_blank"><img src="https://img.shields.io/npm/dm/redux-duplicate-actions.svg" alt="Downloads"/></a>
<a href="https://github.com/daviemakz/redux-duplicate-actions/issues" target="_blank"><img src="https://img.shields.io/github/issues/daviemakz/redux-duplicate-actions" alt="GitHub issues"/></a>
<a href="https://github.com/daviemakz/redux-duplicate-actions/pulls" target="_blank"><img src="https://img.shields.io/github/issues-pr/daviemakz/redux-duplicate-actions" alt="GitHub pull requests"/></a>
<a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fdaviemakz%2Fredux-duplicate-actions?ref=badge_shield" target="_blank"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdaviemakz%2Fredux-duplicate-actions.svg?type=shield" alt="FOSSA Status"/></a>
<a href="https://www.npmjs.com/package/redux-duplicate-actions" target="_blank"><img src="https://img.shields.io/npm/l/redux-duplicate-actions" alt="NPM"/></a>
</p>

# Redux Duplicate Action Monitor

This is a redux middleware that detects duplicate actions &amp; shows this in the console. Ideal for ensuring good redux practices. Development use only!

If there is a duplicate action you will see this in the browser console:

```
[redux-duplicate-actions] A duplicate action has been detected.
[redux-duplicate-actions] Unique action hash: e6d0f668
[redux-duplicate-actions] Unpacked action: {type: 'SET_DATA', payload: {…}}
[redux-duplicate-actions] Original action: {type: 'SET_DATA', payload: ƒ} // Read below
```

If your payload is a function the middleware we will attempt to unpack it and show you the actual data. It does this by simply running the function against `store.getState()`. So effectively `action.payload(store.getState())`. If this fails it will do the comparison as normal.

_Supports Node 10.x +_

### Installation

Run this in the terminal:

```bash
npm install --save-dev redux-duplicate-actions
```

or

```bash
yarn add -D redux-duplicate-actions
```

## Usage

Supported options:

`fatal` (type: boolean) - if `true`, will throw an error when a duplicate action is detected. Default is `false`.

`logLevel` (type: 'log' | 'warn' | 'error') - the level of logging to the console. Default is `"warn"`.

`payloadKey` (type: string) - the key to use to get the payload for the redux action. Default is `"payload"`.

`unpackPayloadIfFunction` (type: boolean) - if true, will attempt to unpack the payload if it is a function. Default is `true`.

```js
if (__DEV__) {
  // To thrown fatal error on duplicate action
  const reduxDuplicateActions = require("redux-duplicate-actions")({
    fatal: true,
  });
  reduxMiddleware.push(reduxDuplicateActions);

  // To log duplicate action as warning
  const reduxDuplicateActions = require("redux-duplicate-actions")({
    fatal: false
  });
  reduxMiddleware.push(reduxDuplicateActions);
}
```

## Test

Run the following commands to test the module:

`yarn install && yarn test`

## Contributing

All contributions are very welcome, please read my [CONTRIBUTING.md](https://github.com/daviemakz/redux-duplicate-actions/blob/master/CONTRIBUTING.md) first. You can submit any ideas as [pull requests](https://github.com/daviemakz/redux-duplicate-actions/pulls) or as [GitHub issues](https://github.com/daviemakz/redux-duplicate-actions/issues). If you'd like to improve code, please feel free!

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdaviemakz%2Fredux-duplicate-actions.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdaviemakz%2Fredux-duplicate-actions?ref=badge_large)
