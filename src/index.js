'use strict';

import { fingerprint64 } from 'farmhash';
import stringify from 'fast-json-stringify';

var lastActionHash = undefined;

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

function getHash(action) {
  return fingerprint64(stringify(Object.assign(action)));
}

function checkHash(action) {
  var currentActionHash = getHash(action);
  if (stringify(currentActionHash) === stringify(lastActionHash)) {
    return false;
  } else {
    return true;
  }
}

function updateHash(action) {
  lastActionHash = getHash(action);
}
