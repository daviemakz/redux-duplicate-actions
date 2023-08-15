'use strict';

import hashSum from 'hash-sum';
import circularJson from 'circular-json';
import { get, has, isNil } from 'lodash';
import { grey } from 'console-log-colors';

const allowedLogLevel = ['log', 'warn', 'error'] as const;

const PKG_NAME = '[redux-duplicate-actions]';

type LogLevel = (typeof allowedLogLevel)[number];

interface LogOptions {
  logLevel: LogLevel;
  message: string | string[];
}

type Log = (options: LogOptions) => void;

type Next = (action: ReduxAction) => void;

interface DefaultOptions {
  fatal: boolean;
  logLevel: LogLevel;
  payloadKey: string;
}

interface ReduxAction {
  target?: string;
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
  logLevel: 'log',
  payloadKey: 'payload'
};

const log: Log = ({ logLevel, message }) => {
  if (has(console, logLevel)) {
    const logFunc = console[logLevel];
    logFunc(
      grey.bold(PKG_NAME),
      ...(Array.isArray(message) ? message : [message])
    );
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
          const resolvedState = get(state, action?.target || '', state);
          const newPayload = actionPayload(resolvedState);
          const resolvedAction = { ...action, [payloadKey]: newPayload };
          return resolvedAction;
        } catch (e: any) {
          log({
            logLevel,
            message: `Unable to run payload function, returning original action. MORE INFO: ${e}`
          });
          log({
            logLevel,
            message: e
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
      message: `Passing a boolean to redux-duplicate-actions is deprecated. Please use the options in the README.md instead.`
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
      let message = `A duplicate action has been detected. \n\nAction Unique Hash: ${lastActionHash}\n\nAction:\n\n${circularJson.stringify(
        processedAction,
        null,
        2
      )}`;
      // Handle fatal or not?
      if (fatal) {
        throw new TypeError(message);
      } else {
        log({
          logLevel,
          message: `A duplicate action has been detected.`
        });
        log({
          logLevel,
          message: `Unique action hash: ${lastActionHash}`
        });
        // We only show this if the action key payload was a function
        if (typeof action[payloadKey] === 'function') {
          console.log(grey.bold(PKG_NAME), 'Unpacked action:', processedAction);
        }
        // Always show the original action
        console.log(grey.bold(PKG_NAME), 'Original action:', action);
        return next(action);
      }
    }
  };
};

export default checkDuplicateDispatch;
