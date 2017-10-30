'use strict';

const HashKey = require('md5');
const CircularJSON = require('circular-json');

export default function checkDispatch(fatal = true) {
  let lastActionHash = '';

  const getHash = function(action = '') {
    return HashKey(CircularJSON.stringify(action));
  };

  const checkHash = function(action = '') {
    return !(getHash(action) === lastActionHash);
  };

  const updateHash = function(action = '') {
    lastActionHash = getHash(action);
  };

  return store => next => action => {
    if (checkHash(action)) {
      updateHash(action);
      return next(action);
    } else {
      let message = `[redux-duplicate-actions] A duplicate action has been detected. MORE INFO: ${CircularJSON.stringify(
        action,
        null,
        2
      )}`;
      if (fatal) {
        throw new TypeError(message);
      } else {
        console.warn(message);
        return next(action);
      }
    }
  };
}
