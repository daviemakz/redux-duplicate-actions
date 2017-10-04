"use strict";

import { fingerprint64 } from 'farmhash'
import stringify from 'fast-json-stringify'

let lastActionHash = undefined;

export default function checkDispatch(store) {
  return next => action => {
    if (checkHash(action)) {
      updateHash(action);
      return next(action)
    } else {
      console.error("[redux-duplicate-actions] A duplicate action has been detected!", action);
      return next(action)
    }
  }
}

function getHash(action) {
  return fingerprint64(stringify(Object.assign(action)))
}

function checkHash(action) {
  let currentActionHash = getHash(action);
  if (currentActionHash === lastActionHash) {
    return false;
  } else {
    return true;
  }
}

function updateHash(action) {
  lastActionHash = getHash(action);
}
