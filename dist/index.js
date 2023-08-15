'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _hashSum = _interopRequireDefault(require('hash-sum'));

var _circularJson = _interopRequireDefault(require('circular-json'));

var _lodash = require('lodash');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
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

var allowedLogLevel = ['log', 'warn', 'error'];
var DEFAULT_OPTIONS = {
  fatal: true,
  logLevel: 'warn',
  payloadKey: 'payload'
};

var log = function log(_ref) {
  var logLevel = _ref.logLevel,
    message = _ref.message;

  if ((0, _lodash.has)(console, logLevel)) {
    var logFunc = console[logLevel];
    logFunc(message);
  }
};

var processActionIfPayloadFunction = function processActionIfPayloadFunction(
  options
) {
  return function (action) {
    return function (state) {
      var payloadKey = options.payloadKey,
        logLevel = options.logLevel;

      if ((0, _lodash.has)(action, payloadKey)) {
        var actionPayload = action[payloadKey];

        if (typeof actionPayload === 'function') {
          try {
            var newPayload = actionPayload(state);
            return _objectSpread(
              _objectSpread({}, action),
              {},
              _defineProperty({}, payloadKey, newPayload)
            );
          } catch (e) {
            log({
              logLevel: logLevel,
              message:
                '[redux-duplicate-actions] Unable to run payload function, returning original action. MORE INFO: '.concat(
                  e
                )
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

  return {
    result: true,
    message: ''
  };
}; // 'boolean' to be backward compatible with V2

var checkDuplicateDispatch = function checkDuplicateDispatch(options) {
  var mergedOptions; // Merge default and passed options

  if (typeof options === 'boolean') {
    log({
      logLevel: 'log',
      message:
        '[redux-duplicate-actions] Passing a boolean to redux-duplicate-actions is deprecated. Please use the options in the README.md instead.'
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
  } // Validate options

  var _isOptionsValid = isOptionsValid(mergedOptions),
    result = _isOptionsValid.result,
    message = _isOptionsValid.message;

  if (!result) {
    throw new TypeError('Invalid options: '.concat(message));
  }

  var _mergedOptions = mergedOptions,
    fatal = _mergedOptions.fatal,
    logLevel = _mergedOptions.logLevel,
    payloadKey = _mergedOptions.payloadKey; // Track hash of last action

  var lastActionHash = ''; // Declare functions

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
  }; // Return middleware

  return function (store) {
    return function (next) {
      return function (action) {
        // Process action
        var processedAction = processActionIfPayloadFunction(mergedOptions)(
          action
        )(store.getState()); // Check that the hash of the previous action matches

        if (checkHash(processedAction)) {
          updateHash(processedAction);
          return next(action);
        } else {
          // Define message
          var _message =
            '[redux-duplicate-actions] A duplicate action has been detected. MORE INFO: '.concat(
              _circularJson['default'].stringify(action, null, 2)
            ); // Handle fatal or not?

          if (fatal) {
            throw new TypeError(_message);
          } else {
            log({
              logLevel: logLevel,
              message: _message
            });
            return next(action);
          }
        }
      };
    };
  };
};

var _default = checkDuplicateDispatch;
exports['default'] = _default;
