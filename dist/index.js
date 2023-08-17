'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;
var _hashSum = _interopRequireDefault(require('hash-sum'));
var _circularJson = _interopRequireDefault(require('circular-json'));
var _lodash = require('lodash');
var _consoleLogColors = require('console-log-colors');
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}
function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var allowedLogLevel = ['log', 'warn', 'error'];
var PKG_NAME = '[redux-duplicate-actions]';
var DEFAULT_OPTIONS = {
  fatal: true,
  unpackPayloadIfFunction: false,
  logLevel: 'log',
  payloadKey: 'payload'
};
var log = function log(_ref) {
  var logLevel = _ref.logLevel,
    message = _ref.message;
  if ((0, _lodash.has)(console, logLevel)) {
    var logFunc = console[logLevel];
    logFunc.apply(
      void 0,
      [_consoleLogColors.grey.bold(PKG_NAME)].concat(
        _toConsumableArray(Array.isArray(message) ? message : [message])
      )
    );
  }
};
var processActionIfPayloadFunction = function processActionIfPayloadFunction(
  options
) {
  return function (action) {
    return function (state) {
      var payloadKey = options.payloadKey,
        logLevel = options.logLevel,
        unpackPayloadIfFunction = options.unpackPayloadIfFunction;
      if ((0, _lodash.has)(action, payloadKey)) {
        var actionPayload = action[payloadKey];
        if (typeof actionPayload === 'function') {
          try {
            if (unpackPayloadIfFunction) {
              var resolvedState = (0, _lodash.get)(
                state,
                (action === null || action === void 0
                  ? void 0
                  : action.target) || '',
                state
              );
              var newPayload = actionPayload(resolvedState);
              var resolvedAction = _objectSpread(
                _objectSpread({}, action),
                {},
                _defineProperty({}, payloadKey, newPayload)
              );
              return resolvedAction;
            } else {
              return action;
            }
          } catch (e) {
            log({
              logLevel: logLevel,
              message:
                'Unable to run payload function, returning original action. MORE INFO: '.concat(
                  e
                )
            });
            log({
              logLevel: logLevel,
              message: e
            });
            return action;
          }
        }
      }
      return action;
    };
  };
};
var isOptionsValid = function isOptionsValid(options) {
  if (
    !(0, _lodash.isNil)(options.logLevel) &&
    !allowedLogLevel.includes(options.logLevel)
  ) {
    return {
      result: false,
      message: 'logLevel must be one of '.concat(allowedLogLevel.join(', '))
    };
  }
  if (
    !(0, _lodash.isNil)(options.payloadKey) &&
    typeof options.payloadKey !== 'string'
  ) {
    return {
      result: false,
      message: 'payloadKey must be a string'
    };
  }
  if (
    !(0, _lodash.isNil)(options.fatal) &&
    typeof options.fatal !== 'boolean'
  ) {
    return {
      result: false,
      message: 'fatal must be a boolean'
    };
  }
  if (
    !(0, _lodash.isNil)(options.fatal) &&
    typeof options.fatal !== 'boolean'
  ) {
    return {
      result: false,
      message: 'fatal must be a boolean'
    };
  }
  return {
    result: true,
    message: ''
  };
};

// 'boolean' to be backward compatible with V2
var checkDuplicateDispatch = function checkDuplicateDispatch(options) {
  var mergedOptions;

  // Merge default and passed options
  if (typeof options === 'boolean') {
    log({
      logLevel: 'log',
      message:
        'Passing a boolean to redux-duplicate-actions is deprecated. Please use the options in the README.md instead.'
    });
    mergedOptions = _objectSpread(
      _objectSpread({}, DEFAULT_OPTIONS),
      {},
      {
        fatal: options
      }
    );
  } else {
    mergedOptions = _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), options);
  }

  // Validate options
  var _isOptionsValid = isOptionsValid(mergedOptions),
    result = _isOptionsValid.result,
    message = _isOptionsValid.message;
  if (!result) {
    throw new TypeError('Invalid options: '.concat(message));
  }
  var _mergedOptions = mergedOptions,
    fatal = _mergedOptions.fatal,
    logLevel = _mergedOptions.logLevel,
    payloadKey = _mergedOptions.payloadKey,
    unpackPayloadIfFunction = _mergedOptions.unpackPayloadIfFunction; // Track hash of last action
  var lastActionHash = '';

  // Declare functions
  var getHash = function getHash() {
    var actionData =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _hashSum['default'])(actionData);
  };
  var checkHash = function checkHash() {
    var actionData =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return !(getHash(actionData) === lastActionHash);
  };
  var updateHash = function updateHash() {
    var actionData =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (lastActionHash = getHash(actionData));
  };

  // Return middleware
  return function (store) {
    return function (next) {
      return function (action) {
        // Process action
        var processedAction = processActionIfPayloadFunction(mergedOptions)(
          action
        )(store.getState());

        // Check that the hash of the previous action matches
        if (checkHash(processedAction)) {
          updateHash(processedAction);
          return next(action);
        } else {
          // Handle fatal or not?
          if (fatal) {
            throw new TypeError(
              'A duplicate action has been detected. \n\nAction Unique Hash: '
                .concat(lastActionHash, '\n\nAction:\n\n')
                .concat(
                  _circularJson['default'].stringify(processedAction, null, 2)
                )
            );
          } else {
            log({
              logLevel: logLevel,
              message: 'A duplicate action has been detected.'
            });
            log({
              logLevel: logLevel,
              message: 'Unique action hash: '.concat(lastActionHash)
            });
            // We only show this if the action key payload was a function
            if (
              typeof action[payloadKey] === 'function' &&
              unpackPayloadIfFunction
            ) {
              console.log(
                _consoleLogColors.grey.bold(PKG_NAME),
                'Unpacked action:',
                processedAction
              );
            }
            // Always show the original action
            console.log(
              _consoleLogColors.grey.bold(PKG_NAME),
              'Original action:',
              action
            );
            return next(action);
          }
        }
      };
    };
  };
};
var _default = checkDuplicateDispatch;
exports['default'] = _default;
