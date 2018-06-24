'use strict';

// Load NPM modules
const hashKey = require('md5');
const circularJson = require('circular-json');

// Export
export default function checkDispatch(fatal = true) {
  // Track hash of last action
  let lastActionHash = '';
  // Declare functions
  const getHash = (action = '') => hashKey(circularJson.stringify(action));
  const checkHash = (action = '') => !(getHash(action) === lastActionHash);
  const updateHash = (action = '') => (lastActionHash = getHash(action));
  // Middleware
  return store => next => action => {
    if (checkHash(action)) {
      updateHash(action);
      return next(action);
    } else {
      // Define message
      let message = `[redux-duplicate-actions] A duplicate action has been detected. MORE INFO: ${circularJson.stringify(
        action,
        null,
        2
      )}`;
      // Handle fatal or not?
      if (fatal) {
        throw new TypeError(message);
      } else {
        console.warn(message);
        return next(action);
      }
    }
  };
}
