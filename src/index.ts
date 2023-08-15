'use strict';

import hashSum from 'hash-sum';
import circularJson from 'circular-json';
import { has, isNil } from 'lodash';

const allowedLogLevel = ['log', 'warn', 'error'] as const;

type LogLevel = (typeof allowedLogLevel)[number];

interface LogOptions {
  logLevel: LogLevel;
  message: string;
}

type Log = (options: LogOptions) => void;

type Next = (action: ReduxAction) => void;

interface DefaultOptions {
  fatal: boolean;
  logLevel: LogLevel;
  payloadKey: string;
}

interface ReduxAction {
  [key: string]: unknown;
}

interface Store {
  getState: () => State;
}

interface State {
  [key: string]: unknown;
}

const DEFAULT_OPTIONS: DefaultOptions = {
  fatal: true,
  logLevel: 'warn',
  payloadKey: 'payload'
};

const log: Log = ({ logLevel, message }) => {
  if (has(console, logLevel)) {
    const logFunc = console[logLevel];
    logFunc(message);
  }
};

const processActionIfPayloadFunction =
  (options: DefaultOptions) =>
  (action: ReduxAction) =>
  (state: State): ReduxAction => {
    const { payloadKey, logLevel } = options;
    if (has(action, payloadKey)) {
      const actionPayload = action[payloadKey];
      if (typeof actionPayload === 'function') {
        try {
          const newPayload = actionPayload(state);
          return { ...action, [payloadKey]: newPayload };
        } catch (e) {
          log({
            logLevel,
            message: `[redux-duplicate-actions] Unable to run payload function, returning original action. MORE INFO: ${e}`
          });
          return action;
        }
      }
    }
    return action;
  };

const isOptionsValid = (options: DefaultOptions) => {
  if (!isNil(options.logLevel) && !allowedLogLevel.includes(options.logLevel)) {
    return {
      result: false,
      message: `logLevel must be one of ${allowedLogLevel.join(', ')}`
    };
  }
  if (!isNil(options.payloadKey) && typeof options.payloadKey !== 'string') {
    return { result: false, message: `payloadKey must be a string` };
  }
  if (!isNil(options.fatal) && typeof options.fatal !== 'boolean') {
    return { result: false, message: `fatal must be a boolean` };
  }
  return { result: true, message: '' };
};

// 'boolean' to be backward compatible with V2
const checkDuplicateDispatch = (options: DefaultOptions | boolean) => {
  let mergedOptions: DefaultOptions;

  // Merge default and passed options
  if (typeof options === 'boolean') {
    log({
      logLevel: 'log',
      message: `[redux-duplicate-actions] Passing a boolean to redux-duplicate-actions is deprecated. Please use the options in the README.md instead.`
    });
    mergedOptions = { ...DEFAULT_OPTIONS, fatal: options };
  } else {
    mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  }

  // Validate options
  const { result, message } = isOptionsValid(mergedOptions);
  if (!result) {
    throw new TypeError(`Invalid options: ${message}`);
  }

  const { fatal, logLevel, payloadKey } = mergedOptions;

  // Track hash of last action
  let lastActionHash = '';

  // Declare functions
  const getHash = (actionData = {}) => {
    return hashSum(actionData);
  };

  const checkHash = (actionData = {}) => {
    return !(getHash(actionData) === lastActionHash);
  };

  const updateHash = (actionData = {}) => {
    return (lastActionHash = getHash(actionData));
  };

  // Return middleware
  return (store: Store) => (next: Next) => (action: ReduxAction) => {
    // Process action
    const processedAction = processActionIfPayloadFunction(mergedOptions)(
      action
    )(store.getState());

    // Check that the hash of the previous action matches
    if (checkHash(processedAction)) {
      updateHash(processedAction);
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
        log({
          logLevel,
          message
        });
        return next(action);
      }
    }
  };
};

export default checkDuplicateDispatch;
