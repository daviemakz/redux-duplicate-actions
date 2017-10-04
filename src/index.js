'use strict';

import { fingerprint64 } from 'farmhash';

var lastActionHash = '';

export default function checkDispatch(store) {
  return next => action => {
    if (checkHash(action)) {
      updateHash(action);
      return next(action);
    } else {
      throw new TypeError(
        `[redux-duplicate-actions] A duplicate action has been detected. MORE INFO: ${JSON.stringify(
          action,
          null,
          2
        )}`
      );
    }
  };
}

function getHash(action = '') {
  return fingerprint64(JSON.stringify(action));
}

function checkHash(action = '') {
  if (getHash(action) === lastActionHash) {
    return false;
  } else {
    return true;
  }
}

function updateHash(action = '') {
  lastActionHash = getHash(action);
}
