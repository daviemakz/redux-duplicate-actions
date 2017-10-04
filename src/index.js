'use strict';

import { fingerprint64 } from 'farmhash';

export default function checkDispatch(fatal = true) {
  let lastActionHash = '';

  const getHash = function(action = '') {
    return fingerprint64(JSON.stringify(action));
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
      let message = `[redux-duplicate-actions] A duplicate action has been detected. MORE INFO: ${JSON.stringify(
        action,
        null,
        2
      )}`;
      if (fatal) {
        throw new TypeError(message);
      } else {
        console.warn(message);
      }
    }
  };
}
