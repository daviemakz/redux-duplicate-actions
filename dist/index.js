'use strict'; // Load NPM modules

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = checkDispatch;

var _md = _interopRequireDefault(require("md5"));

var _circularJson = _interopRequireDefault(require("circular-json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Export
function checkDispatch() {
  var fatal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  // Track hash of last action
  var lastActionHash = ''; // Declare functions

  var getHash = function getHash() {
    var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return (0, _md["default"])(_circularJson["default"].stringify(action));
  };

  var checkHash = function checkHash() {
    var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return !(getHash(action) === lastActionHash);
  };

  var updateHash = function updateHash() {
    var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return lastActionHash = getHash(action);
  }; // Middleware


  return function (store) {
    return function (next) {
      return function (action) {
        if (checkHash(action)) {
          return updateHash(action) && next(action);
        } else {
          // Define message
          var message = "[redux-duplicate-actions] A duplicate action has been detected. MORE INFO: ".concat(_circularJson["default"].stringify(action, null, 2)); // Handle fatal or not?

          if (fatal) {
            throw new TypeError(message);
          } else {
            return console.warn(message) || next(action);
          }
        }
      };
    };
  };
}