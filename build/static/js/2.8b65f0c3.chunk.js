(this["webpackJsonpreact-app"] = this["webpackJsonpreact-app"] || []).push([[2],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(17);
} else {}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _createClass; });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _slicedToArray; });

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__(8);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || Object(unsupportedIterableToArray["a" /* default */])(arr, i) || _nonIterableRest();
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shuffleTrain = exports.GradientDescentOptimizer = exports.AdamOptimizer = exports.Tanh = exports.LogisticSigmoid = exports.Linear = exports.LeakyRelu = exports.OutputLayer = exports.InputLayer = exports.HiddenLayer = exports.Network = void 0;

var Network_1 = __webpack_require__(21);

Object.defineProperty(exports, "Network", {
  enumerable: true,
  get: function get() {
    return __importDefault(Network_1).default;
  }
});

var HiddenLayer_1 = __webpack_require__(22);

Object.defineProperty(exports, "HiddenLayer", {
  enumerable: true,
  get: function get() {
    return __importDefault(HiddenLayer_1).default;
  }
});

var InputLayer_1 = __webpack_require__(31);

Object.defineProperty(exports, "InputLayer", {
  enumerable: true,
  get: function get() {
    return __importDefault(InputLayer_1).default;
  }
});

var OutputLayer_1 = __webpack_require__(13);

Object.defineProperty(exports, "OutputLayer", {
  enumerable: true,
  get: function get() {
    return __importDefault(OutputLayer_1).default;
  }
});

var LeakyRelu_1 = __webpack_require__(32);

Object.defineProperty(exports, "LeakyRelu", {
  enumerable: true,
  get: function get() {
    return __importDefault(LeakyRelu_1).default;
  }
});

var Linear_1 = __webpack_require__(33);

Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function get() {
    return __importDefault(Linear_1).default;
  }
});

var LogisticSigmoid_1 = __webpack_require__(34);

Object.defineProperty(exports, "LogisticSigmoid", {
  enumerable: true,
  get: function get() {
    return __importDefault(LogisticSigmoid_1).default;
  }
});

var Tanh_1 = __webpack_require__(35);

Object.defineProperty(exports, "Tanh", {
  enumerable: true,
  get: function get() {
    return __importDefault(Tanh_1).default;
  }
});

var AdamOptimizer_1 = __webpack_require__(36);

Object.defineProperty(exports, "AdamOptimizer", {
  enumerable: true,
  get: function get() {
    return __importDefault(AdamOptimizer_1).default;
  }
});

var GradientDescentOptimizer_1 = __webpack_require__(37);

Object.defineProperty(exports, "GradientDescentOptimizer", {
  enumerable: true,
  get: function get() {
    return __importDefault(GradientDescentOptimizer_1).default;
  }
});

var shuffleTrain_1 = __webpack_require__(9);

Object.defineProperty(exports, "shuffleTrain", {
  enumerable: true,
  get: function get() {
    return __importDefault(shuffleTrain_1).default;
  }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _arrayLikeToArray; });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _unsupportedIterableToArray; });
/* harmony import */ var _babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return Object(_babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Object(_babel_runtime_helpers_esm_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var arrayShuffle_1 = __importDefault(__webpack_require__(38));

function shuffleTrain(neuralNetwork, trainingSets, maxEpochs) {
  var log = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

  for (var epoch = 0; epoch < maxEpochs; epoch++) {
    trainingSets = arrayShuffle_1.default(trainingSets);

    for (var setI = 0, setCount = trainingSets.length; setI < setCount; setI++) {
      var set = trainingSets[setI];
      var outputs = neuralNetwork.invoke(set[0]);
      neuralNetwork.learn(set[1]);
      log(epoch, setI, set[0], set[1], outputs);
    }
  }
}

exports.default = shuffleTrain;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * @param {int} numberOfPossibleStates
 * @param {int} numberOfPossibleActions
 * @param {Object} [options]
 */
module.exports.Agent = function (numberOfPossibleStates, numberOfPossibleActions, options) {
  if (typeof options == 'undefined') {
    options = {};
  }

  this._actionCount = numberOfPossibleActions;
  this._stateCount = numberOfPossibleStates;
  this._options = Object.assign({
    //Default options
    learningEnabled: true,
    //set to false to disable all learning for higher execution speeds
    learningRate: 0.1,
    //alpha - how much new experiences overwrite previous ones
    explorationProbability: 0.05,
    //epsilon - the probability of taking random actions in the Epsilon Greedy policy
    discountFactor: 0.9 //discountFactor - future rewards are multiplied by this

  }, options); //Stores the expected reward for a given state and action. Is a 2D table stored as a flat array for higher speed

  this._q = new Float64Array(this._stateCount * this._actionCount); //Stores 0 if we haven't seen a reward for this state-action before, stores 1 if we have

  this._initializedQ = new Int8Array(this._stateCount * this._actionCount); //Some values used in the SARSA algorithm. We pre-calculate them here for higher speed

  this._oneMinusEpsilon = 1 - this._options.explorationProbability;
  this._epsilonDividedByActionCount = this._options.explorationProbability / this._actionCount; //Properties used to store statistics about the last action for reporting reasons

  this._qOfLastState = new Float64Array(this._actionCount);
  this._lastActionWasRandom = false; //The last state and action we saw

  this._lastState = 0;
  this._lastAction = 0;
  /**
   * Learn from the last reward, decide on the next action to take, and return the next action
   *
   * @param {float|null} lastReward if we are on the very first step, pass null here, otherwise pass a float
   * @param {int} state
   * @returns {int} the action that the agent decided to take
   */

  this.decide = function (lastReward, state) {
    if (lastReward !== null && this._options.learningEnabled === true) {
      //Learn from the current step
      this._learnFromStateActionRewardState(this._lastState, this._lastAction, lastReward, state);
    }

    this._lastActionWasRandom = false;
    var greatistExpectedReward = this._q[state * this._actionCount];
    var actionWithGreatistExpectedReward = 0;

    for (var actionI = 0; actionI < this._actionCount; actionI++) {
      var expectedRewardOfThisAction = this._q[state * this._actionCount + actionI]; //Log the last action weights. Charting these can be useful

      this._qOfLastState[actionI] = expectedRewardOfThisAction;

      if (expectedRewardOfThisAction > greatistExpectedReward) {
        greatistExpectedReward = expectedRewardOfThisAction;
        actionWithGreatistExpectedReward = actionI;
      }
    }

    this._lastAction = actionWithGreatistExpectedReward; //Epsilon greedy exploration policy - take random exploration actios with a probability of epsilon

    if (Math.random() < this._options.explorationProbability) {
      this._lastAction = Math.floor(Math.random() * this._actionCount);
      this._lastActionWasRandom = true;
    }

    this._lastState = state;
    return this._lastAction;
  };
  /**
   * The SARSA algorithm with an epsilon greedy policy
   *
   * @param {int} state
   * @param {int} action
   * @param {float} reward
   * @param {int} nextState
   * @private
   */


  this._learnFromStateActionRewardState = function (state, action, reward, nextState) {
    var currentStateActionKey = state * this._actionCount + action;
    var qOfCurrentStateAction = this._q[currentStateActionKey];

    if (qOfCurrentStateAction === 0.00 && this._initializedQ[currentStateActionKey] !== 1) {
      //Use first seen reward for a state-action as the initial value to speed up initial learning
      this._initializedQ[currentStateActionKey] = 1; //1 for true

      this._q[currentStateActionKey] = reward;
      return;
    }

    var nextStateKeyPrepend = nextState * this._actionCount;
    var maxQofNextStateAction = this._q[nextStateKeyPrepend];
    var sumQofNextStateActions = this._q[nextStateKeyPrepend];

    for (var i = nextStateKeyPrepend + 1, max = nextStateKeyPrepend + this._actionCount; i < max; i++) {
      var thisValue = this._q[i];
      sumQofNextStateActions += thisValue;

      if (thisValue > maxQofNextStateAction) {
        maxQofNextStateAction = thisValue;
      }
    } //Update the Q table by using the SARSA algorithm with an "epsilon greedy" policy


    this._q[currentStateActionKey] += this._options.learningRate * (reward + this._options.discountFactor * (maxQofNextStateAction * this._oneMinusEpsilon + sumQofNextStateActions * this._epsilonDividedByActionCount) - qOfCurrentStateAction);
  };
  /**
   * Returns some additional info about the last action that was taking. Useful for graphs and reports
   *
   * @returns {{action: (number|*), weights: Float64Array, wasRandomlyChosen: boolean}}
   */


  this.getLastActionStats = function () {
    return {
      action: this._lastAction,
      wasRandomlyChosen: this._lastActionWasRandom,
      weights: this._qOfLastState
    };
  };
  /**
   * Saves everything the agent has learned to a JSON-serializable object and returns it
   *
   * @returns {{q: Array, initializedQ: Array}}
   */


  this.saveToJson = function () {
    var q = [];
    var initializedQ = [];

    for (var i = 0, len = this._stateCount * this._actionCount; i < len; i++) {
      q[i] = this._q[i];
      initializedQ[i] = this._initializedQ[i];
    }

    return {
      q: q,
      initializedQ: initializedQ
    };
  };
  /**
   * Loads a previously saved agent
   *
   * @param {{q: Array, initializedQ: Array}} json
   */


  this.loadFromJson = function (json) {
    for (var i = 0, len = this._stateCount * this._actionCount; i < len; i++) {
      this._q[i] = json.q[i];
      this._initializedQ[i] = json.initializedQ[i];
    }
  };
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _objectSpread2; });

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
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
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(3);

var _createClass = __webpack_require__(4);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var OutputLayer = /*#__PURE__*/function () {
  function OutputLayer(nodeCount, activationFunction, optimizer) {
    _classCallCheck(this, OutputLayer);

    this.nodeCount = nodeCount;
    this.outputs = new Float64Array(nodeCount);
    this.activationFunction = activationFunction.xToY;
    this.activationFunctionDerivative = activationFunction.yToSlope;
    this.errorGradients = new Float64Array(nodeCount);
    this.optimizer = optimizer;
    this.inputs = new Float64Array(0); //@TODO avoid unneeded empty array?;

    this.inputLayer = null;
    this.inputCount = 0; //@TODO avoid this?

    this.inputNodeCount = 0; //@TODO avoid this?

    this.weights = new Float64Array(0); //@TODO avoid unneeded empty array?

    this.weightErrorGradients = new Float64Array(0); //@TODO avoid unneeded empty array?
  }

  _createClass(OutputLayer, [{
    key: "setInputLayer",
    value: function setInputLayer(inputLayer) {
      this.inputLayer = inputLayer;
      this.inputCount = inputLayer.nodeCount;
      this.inputNodeCount = this.inputCount + 1; //Add 1 for the bias node

      this.weights = new Float64Array(this.nodeCount * this.inputNodeCount);
      this.weightErrorGradients = new Float64Array(this.nodeCount * this.inputNodeCount);

      for (var weightI = 0, weightLen = this.weights.length; weightI < weightLen; weightI++) {
        this.weights[weightI] = Math.random() - 0.5; //@TODO would a gaussian distribution work better?
      }

      this.optimizer.init(this.weights.length);
    }
  }, {
    key: "feedForward",
    value: function feedForward() {
      this.inputs = this.inputLayer.outputs; //@TODO is this needed?
      //Defining these locally speeds up the loop below by reducing object property access

      var inputNodeCount = this.inputNodeCount;
      var weights = this.weights;
      var inputs = this.inputs;
      var activationFunction = this.activationFunction;
      var outputs = this.outputs;
      var nodeCount = this.nodeCount;
      var inputCount = this.inputCount; // Defining these here ideally speeds up the loop below

      var inputI;
      var sum;

      for (var neuronI = 0; neuronI < nodeCount; neuronI++) {
        sum = 0;

        for (inputI = 0; inputI < inputCount; inputI++) {
          sum += inputs[inputI] * weights[neuronI * inputNodeCount + inputI];
        }

        sum += weights[neuronI * inputNodeCount + inputCount]; //Bias node that always inputs "1"

        outputs[neuronI] = activationFunction(sum);
      }

      return outputs;
    }
  }, {
    key: "backPropagateCalculateErrorGradient",
    value: function backPropagateCalculateErrorGradient(targetOutputs) {
      //Defining these locally speeds up the loop below by reducing object property access
      var nodeCount = this.nodeCount;
      var errorGradients = this.errorGradients;
      var outputs = this.outputs;
      var activationFunctionDerivative = this.activationFunctionDerivative;
      var inputNodeCount = this.inputNodeCount;
      var inputCount = this.inputCount;
      var inputs = this.inputs;
      var weightErrorGradients = this.weightErrorGradients; // Defining these here ideally speeds up the loop below

      var inputI;
      var activationErrorGradient;

      for (var neuronI = 0; neuronI < nodeCount; neuronI++) {
        activationErrorGradient = (outputs[neuronI] - targetOutputs[neuronI]) * activationFunctionDerivative(outputs[neuronI]);
        errorGradients[neuronI] = activationErrorGradient;

        for (inputI = 0; inputI < inputCount; inputI++) {
          weightErrorGradients[neuronI * inputNodeCount + inputI] = inputs[inputI] * activationErrorGradient;
        }

        weightErrorGradients[neuronI * inputNodeCount + inputCount] = activationErrorGradient; //Bias node
      }
    }
  }, {
    key: "backPropagateOptimize",
    value: function backPropagateOptimize(learningTimeStep) {
      this.optimizer.optimizeWeights(this.weights, this.weightErrorGradients, learningTimeStep);
    }
  }]);

  return OutputLayer;
}();

exports.default = OutputLayer;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }

  if (false) {}

  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(18);
} else {}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chart.js v2.9.4
 * https://www.chartjs.org
 * (c) 2020 Chart.js Contributors
 * Released under the MIT License
 */
(function (global, factory) {
   true ? module.exports = factory(function () {
    try {
      return __webpack_require__(40);
    } catch (e) {}
  }()) : undefined;
})(this, function (moment) {
  'use strict';

  moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace(n) {
    return n && n['default'] || n;
  }

  var colorName = {
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
  };
  var conversions = createCommonjsModule(function (module) {
    /* MIT license */
    // NOTE: conversions should only return primitive values (i.e. arrays, or
    //       values that give correct `typeof` results).
    //       do not use box values types (i.e. Number(), String(), etc.)
    var reverseKeywords = {};

    for (var key in colorName) {
      if (colorName.hasOwnProperty(key)) {
        reverseKeywords[colorName[key]] = key;
      }
    }

    var convert = module.exports = {
      rgb: {
        channels: 3,
        labels: 'rgb'
      },
      hsl: {
        channels: 3,
        labels: 'hsl'
      },
      hsv: {
        channels: 3,
        labels: 'hsv'
      },
      hwb: {
        channels: 3,
        labels: 'hwb'
      },
      cmyk: {
        channels: 4,
        labels: 'cmyk'
      },
      xyz: {
        channels: 3,
        labels: 'xyz'
      },
      lab: {
        channels: 3,
        labels: 'lab'
      },
      lch: {
        channels: 3,
        labels: 'lch'
      },
      hex: {
        channels: 1,
        labels: ['hex']
      },
      keyword: {
        channels: 1,
        labels: ['keyword']
      },
      ansi16: {
        channels: 1,
        labels: ['ansi16']
      },
      ansi256: {
        channels: 1,
        labels: ['ansi256']
      },
      hcg: {
        channels: 3,
        labels: ['h', 'c', 'g']
      },
      apple: {
        channels: 3,
        labels: ['r16', 'g16', 'b16']
      },
      gray: {
        channels: 1,
        labels: ['gray']
      }
    }; // hide .channels and .labels properties

    for (var model in convert) {
      if (convert.hasOwnProperty(model)) {
        if (!('channels' in convert[model])) {
          throw new Error('missing channels property: ' + model);
        }

        if (!('labels' in convert[model])) {
          throw new Error('missing channel labels property: ' + model);
        }

        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error('channel and label counts mismatch: ' + model);
        }

        var channels = convert[model].channels;
        var labels = convert[model].labels;
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], 'channels', {
          value: channels
        });
        Object.defineProperty(convert[model], 'labels', {
          value: labels
        });
      }
    }

    convert.rgb.hsl = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var delta = max - min;
      var h;
      var s;
      var l;

      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }

      h = Math.min(h * 60, 360);

      if (h < 0) {
        h += 360;
      }

      l = (min + max) / 2;

      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }

      return [h, s * 100, l * 100];
    };

    convert.rgb.hsv = function (rgb) {
      var rdif;
      var gdif;
      var bdif;
      var h;
      var s;
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var v = Math.max(r, g, b);
      var diff = v - Math.min(r, g, b);

      var diffc = function diffc(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };

      if (diff === 0) {
        h = s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);

        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }

        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }

      return [h * 360, s * 100, v * 100];
    };

    convert.rgb.hwb = function (rgb) {
      var r = rgb[0];
      var g = rgb[1];
      var b = rgb[2];
      var h = convert.rgb.hsl(rgb)[0];
      var w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };

    convert.rgb.cmyk = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var c;
      var m;
      var y;
      var k;
      k = Math.min(1 - r, 1 - g, 1 - b);
      c = (1 - r - k) / (1 - k) || 0;
      m = (1 - g - k) / (1 - k) || 0;
      y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    /**
     * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
     * */


    function comparativeDistance(x, y) {
      return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
    }

    convert.rgb.keyword = function (rgb) {
      var reversed = reverseKeywords[rgb];

      if (reversed) {
        return reversed;
      }

      var currentClosestDistance = Infinity;
      var currentClosestKeyword;

      for (var keyword in colorName) {
        if (colorName.hasOwnProperty(keyword)) {
          var value = colorName[keyword]; // Compute comparative distance

          var distance = comparativeDistance(rgb, value); // Check if its less, if so set as closest

          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
      }

      return currentClosestKeyword;
    };

    convert.keyword.rgb = function (keyword) {
      return colorName[keyword];
    };

    convert.rgb.xyz = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255; // assume sRGB

      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };

    convert.rgb.lab = function (rgb) {
      var xyz = convert.rgb.xyz(rgb);
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l, a, b];
    };

    convert.hsl.rgb = function (hsl) {
      var h = hsl[0] / 360;
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var t1;
      var t2;
      var t3;
      var rgb;
      var val;

      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }

      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }

      t1 = 2 * l - t2;
      rgb = [0, 0, 0];

      for (var i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);

        if (t3 < 0) {
          t3++;
        }

        if (t3 > 1) {
          t3--;
        }

        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }

        rgb[i] = val * 255;
      }

      return rgb;
    };

    convert.hsl.hsv = function (hsl) {
      var h = hsl[0];
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var smin = s;
      var lmin = Math.max(l, 0.01);
      var sv;
      var v;
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      v = (l + s) / 2;
      sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };

    convert.hsv.rgb = function (hsv) {
      var h = hsv[0] / 60;
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var hi = Math.floor(h) % 6;
      var f = h - Math.floor(h);
      var p = 255 * v * (1 - s);
      var q = 255 * v * (1 - s * f);
      var t = 255 * v * (1 - s * (1 - f));
      v *= 255;

      switch (hi) {
        case 0:
          return [v, t, p];

        case 1:
          return [q, v, p];

        case 2:
          return [p, v, t];

        case 3:
          return [p, q, v];

        case 4:
          return [t, p, v];

        case 5:
          return [v, p, q];
      }
    };

    convert.hsv.hsl = function (hsv) {
      var h = hsv[0];
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var vmin = Math.max(v, 0.01);
      var lmin;
      var sl;
      var l;
      l = (2 - s) * v;
      lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    }; // http://dev.w3.org/csswg/css-color/#hwb-to-rgb


    convert.hwb.rgb = function (hwb) {
      var h = hwb[0] / 360;
      var wh = hwb[1] / 100;
      var bl = hwb[2] / 100;
      var ratio = wh + bl;
      var i;
      var v;
      var f;
      var n; // wh + bl cant be > 1

      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }

      i = Math.floor(6 * h);
      v = 1 - bl;
      f = 6 * h - i;

      if ((i & 0x01) !== 0) {
        f = 1 - f;
      }

      n = wh + f * (v - wh); // linear interpolation

      var r;
      var g;
      var b;

      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;

        case 1:
          r = n;
          g = v;
          b = wh;
          break;

        case 2:
          r = wh;
          g = v;
          b = n;
          break;

        case 3:
          r = wh;
          g = n;
          b = v;
          break;

        case 4:
          r = n;
          g = wh;
          b = v;
          break;

        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }

      return [r * 255, g * 255, b * 255];
    };

    convert.cmyk.rgb = function (cmyk) {
      var c = cmyk[0] / 100;
      var m = cmyk[1] / 100;
      var y = cmyk[2] / 100;
      var k = cmyk[3] / 100;
      var r;
      var g;
      var b;
      r = 1 - Math.min(1, c * (1 - k) + k);
      g = 1 - Math.min(1, m * (1 - k) + k);
      b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };

    convert.xyz.rgb = function (xyz) {
      var x = xyz[0] / 100;
      var y = xyz[1] / 100;
      var z = xyz[2] / 100;
      var r;
      var g;
      var b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.2040 + z * 1.0570; // assume sRGB

      r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r * 12.92;
      g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g * 12.92;
      b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };

    convert.xyz.lab = function (xyz) {
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l, a, b];
    };

    convert.lab.xyz = function (lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var x;
      var y;
      var z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      var y2 = Math.pow(y, 3);
      var x2 = Math.pow(x, 3);
      var z2 = Math.pow(z, 3);
      y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };

    convert.lab.lch = function (lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var hr;
      var h;
      var c;
      hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;

      if (h < 0) {
        h += 360;
      }

      c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };

    convert.lch.lab = function (lch) {
      var l = lch[0];
      var c = lch[1];
      var h = lch[2];
      var a;
      var b;
      var hr;
      hr = h / 360 * 2 * Math.PI;
      a = c * Math.cos(hr);
      b = c * Math.sin(hr);
      return [l, a, b];
    };

    convert.rgb.ansi16 = function (args) {
      var r = args[0];
      var g = args[1];
      var b = args[2];
      var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

      value = Math.round(value / 50);

      if (value === 0) {
        return 30;
      }

      var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));

      if (value === 2) {
        ansi += 60;
      }

      return ansi;
    };

    convert.hsv.ansi16 = function (args) {
      // optimization here; we already know the value and don't need to get
      // it converted for us.
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };

    convert.rgb.ansi256 = function (args) {
      var r = args[0];
      var g = args[1];
      var b = args[2]; // we use the extended greyscale palette here, with the exception of
      // black and white. normal palette only has 4 greyscale shades.

      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }

        if (r > 248) {
          return 231;
        }

        return Math.round((r - 8) / 247 * 24) + 232;
      }

      var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };

    convert.ansi16.rgb = function (args) {
      var color = args % 10; // handle greyscale

      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }

        color = color / 10.5 * 255;
        return [color, color, color];
      }

      var mult = (~~(args > 50) + 1) * 0.5;
      var r = (color & 1) * mult * 255;
      var g = (color >> 1 & 1) * mult * 255;
      var b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };

    convert.ansi256.rgb = function (args) {
      // handle greyscale
      if (args >= 232) {
        var c = (args - 232) * 10 + 8;
        return [c, c, c];
      }

      args -= 16;
      var rem;
      var r = Math.floor(args / 36) / 5 * 255;
      var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      var b = rem % 6 / 5 * 255;
      return [r, g, b];
    };

    convert.rgb.hex = function (args) {
      var integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);
      var string = integer.toString(16).toUpperCase();
      return '000000'.substring(string.length) + string;
    };

    convert.hex.rgb = function (args) {
      var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);

      if (!match) {
        return [0, 0, 0];
      }

      var colorString = match[0];

      if (match[0].length === 3) {
        colorString = colorString.split('').map(function (char) {
          return char + char;
        }).join('');
      }

      var integer = parseInt(colorString, 16);
      var r = integer >> 16 & 0xFF;
      var g = integer >> 8 & 0xFF;
      var b = integer & 0xFF;
      return [r, g, b];
    };

    convert.rgb.hcg = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var max = Math.max(Math.max(r, g), b);
      var min = Math.min(Math.min(r, g), b);
      var chroma = max - min;
      var grayscale;
      var hue;

      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }

      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma + 4;
      }

      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };

    convert.hsl.hcg = function (hsl) {
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var c = 1;
      var f = 0;

      if (l < 0.5) {
        c = 2.0 * s * l;
      } else {
        c = 2.0 * s * (1.0 - l);
      }

      if (c < 1.0) {
        f = (l - 0.5 * c) / (1.0 - c);
      }

      return [hsl[0], c * 100, f * 100];
    };

    convert.hsv.hcg = function (hsv) {
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var c = s * v;
      var f = 0;

      if (c < 1.0) {
        f = (v - c) / (1 - c);
      }

      return [hsv[0], c * 100, f * 100];
    };

    convert.hcg.rgb = function (hcg) {
      var h = hcg[0] / 360;
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;

      if (c === 0.0) {
        return [g * 255, g * 255, g * 255];
      }

      var pure = [0, 0, 0];
      var hi = h % 1 * 6;
      var v = hi % 1;
      var w = 1 - v;
      var mg = 0;

      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;

        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;

        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;

        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;

        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;

        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }

      mg = (1.0 - c) * g;
      return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
    };

    convert.hcg.hsv = function (hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1.0 - c);
      var f = 0;

      if (v > 0.0) {
        f = c / v;
      }

      return [hcg[0], f * 100, v * 100];
    };

    convert.hcg.hsl = function (hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var l = g * (1.0 - c) + 0.5 * c;
      var s = 0;

      if (l > 0.0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1.0) {
        s = c / (2 * (1 - l));
      }

      return [hcg[0], s * 100, l * 100];
    };

    convert.hcg.hwb = function (hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1.0 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };

    convert.hwb.hcg = function (hwb) {
      var w = hwb[1] / 100;
      var b = hwb[2] / 100;
      var v = 1 - b;
      var c = v - w;
      var g = 0;

      if (c < 1) {
        g = (v - c) / (1 - c);
      }

      return [hwb[0], c * 100, g * 100];
    };

    convert.apple.rgb = function (apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };

    convert.rgb.apple = function (rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };

    convert.gray.rgb = function (args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };

    convert.gray.hsl = convert.gray.hsv = function (args) {
      return [0, 0, args[0]];
    };

    convert.gray.hwb = function (gray) {
      return [0, 100, gray[0]];
    };

    convert.gray.cmyk = function (gray) {
      return [0, 0, 0, gray[0]];
    };

    convert.gray.lab = function (gray) {
      return [gray[0], 0, 0];
    };

    convert.gray.hex = function (gray) {
      var val = Math.round(gray[0] / 100 * 255) & 0xFF;
      var integer = (val << 16) + (val << 8) + val;
      var string = integer.toString(16).toUpperCase();
      return '000000'.substring(string.length) + string;
    };

    convert.rgb.gray = function (rgb) {
      var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  });
  var conversions_1 = conversions.rgb;
  var conversions_2 = conversions.hsl;
  var conversions_3 = conversions.hsv;
  var conversions_4 = conversions.hwb;
  var conversions_5 = conversions.cmyk;
  var conversions_6 = conversions.xyz;
  var conversions_7 = conversions.lab;
  var conversions_8 = conversions.lch;
  var conversions_9 = conversions.hex;
  var conversions_10 = conversions.keyword;
  var conversions_11 = conversions.ansi16;
  var conversions_12 = conversions.ansi256;
  var conversions_13 = conversions.hcg;
  var conversions_14 = conversions.apple;
  var conversions_15 = conversions.gray;
  /*
  	this function routes a model to all other models.
  
  	all functions that are routed have a property `.conversion` attached
  	to the returned synthetic function. This property is an array
  	of strings, each with the steps in between the 'from' and 'to'
  	color models (inclusive).
  
  	conversions that are not possible simply are not included.
  */

  function buildGraph() {
    var graph = {}; // https://jsperf.com/object-keys-vs-for-in-with-closure/3

    var models = Object.keys(conversions);

    for (var len = models.length, i = 0; i < len; i++) {
      graph[models[i]] = {
        // http://jsperf.com/1-vs-infinity
        // micro-opt, but this is simple.
        distance: -1,
        parent: null
      };
    }

    return graph;
  } // https://en.wikipedia.org/wiki/Breadth-first_search


  function deriveBFS(fromModel) {
    var graph = buildGraph();
    var queue = [fromModel]; // unshift -> queue -> pop

    graph[fromModel].distance = 0;

    while (queue.length) {
      var current = queue.pop();
      var adjacents = Object.keys(conversions[current]);

      for (var len = adjacents.length, i = 0; i < len; i++) {
        var adjacent = adjacents[i];
        var node = graph[adjacent];

        if (node.distance === -1) {
          node.distance = graph[current].distance + 1;
          node.parent = current;
          queue.unshift(adjacent);
        }
      }
    }

    return graph;
  }

  function link(from, to) {
    return function (args) {
      return to(from(args));
    };
  }

  function wrapConversion(toModel, graph) {
    var path = [graph[toModel].parent, toModel];
    var fn = conversions[graph[toModel].parent][toModel];
    var cur = graph[toModel].parent;

    while (graph[cur].parent) {
      path.unshift(graph[cur].parent);
      fn = link(conversions[graph[cur].parent][cur], fn);
      cur = graph[cur].parent;
    }

    fn.conversion = path;
    return fn;
  }

  var route = function route(fromModel) {
    var graph = deriveBFS(fromModel);
    var conversion = {};
    var models = Object.keys(graph);

    for (var len = models.length, i = 0; i < len; i++) {
      var toModel = models[i];
      var node = graph[toModel];

      if (node.parent === null) {
        // no possible conversion, or this node is the source model.
        continue;
      }

      conversion[toModel] = wrapConversion(toModel, graph);
    }

    return conversion;
  };

  var convert = {};
  var models = Object.keys(conversions);

  function wrapRaw(fn) {
    var wrappedFn = function wrappedFn(args) {
      if (args === undefined || args === null) {
        return args;
      }

      if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments);
      }

      return fn(args);
    }; // preserve .conversion property if there is one


    if ('conversion' in fn) {
      wrappedFn.conversion = fn.conversion;
    }

    return wrappedFn;
  }

  function wrapRounded(fn) {
    var wrappedFn = function wrappedFn(args) {
      if (args === undefined || args === null) {
        return args;
      }

      if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments);
      }

      var result = fn(args); // we're assuming the result is an array here.
      // see notice in conversions.js; don't use box types
      // in conversion functions.

      if (typeof result === 'object') {
        for (var len = result.length, i = 0; i < len; i++) {
          result[i] = Math.round(result[i]);
        }
      }

      return result;
    }; // preserve .conversion property if there is one


    if ('conversion' in fn) {
      wrappedFn.conversion = fn.conversion;
    }

    return wrappedFn;
  }

  models.forEach(function (fromModel) {
    convert[fromModel] = {};
    Object.defineProperty(convert[fromModel], 'channels', {
      value: conversions[fromModel].channels
    });
    Object.defineProperty(convert[fromModel], 'labels', {
      value: conversions[fromModel].labels
    });
    var routes = route(fromModel);
    var routeModels = Object.keys(routes);
    routeModels.forEach(function (toModel) {
      var fn = routes[toModel];
      convert[fromModel][toModel] = wrapRounded(fn);
      convert[fromModel][toModel].raw = wrapRaw(fn);
    });
  });
  var colorConvert = convert;
  var colorName$1 = {
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
  };
  /* MIT license */

  var colorString = {
    getRgba: getRgba,
    getHsla: getHsla,
    getRgb: getRgb,
    getHsl: getHsl,
    getHwb: getHwb,
    getAlpha: getAlpha,
    hexString: hexString,
    rgbString: rgbString,
    rgbaString: rgbaString,
    percentString: percentString,
    percentaString: percentaString,
    hslString: hslString,
    hslaString: hslaString,
    hwbString: hwbString,
    keyword: keyword
  };

  function getRgba(string) {
    if (!string) {
      return;
    }

    var abbr = /^#([a-fA-F0-9]{3,4})$/i,
        hex = /^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i,
        rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
        per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
        keyword = /(\w+)/;
    var rgb = [0, 0, 0],
        a = 1,
        match = string.match(abbr),
        hexAlpha = "";

    if (match) {
      match = match[1];
      hexAlpha = match[3];

      for (var i = 0; i < rgb.length; i++) {
        rgb[i] = parseInt(match[i] + match[i], 16);
      }

      if (hexAlpha) {
        a = Math.round(parseInt(hexAlpha + hexAlpha, 16) / 255 * 100) / 100;
      }
    } else if (match = string.match(hex)) {
      hexAlpha = match[2];
      match = match[1];

      for (var i = 0; i < rgb.length; i++) {
        rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
      }

      if (hexAlpha) {
        a = Math.round(parseInt(hexAlpha, 16) / 255 * 100) / 100;
      }
    } else if (match = string.match(rgba)) {
      for (var i = 0; i < rgb.length; i++) {
        rgb[i] = parseInt(match[i + 1]);
      }

      a = parseFloat(match[4]);
    } else if (match = string.match(per)) {
      for (var i = 0; i < rgb.length; i++) {
        rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
      }

      a = parseFloat(match[4]);
    } else if (match = string.match(keyword)) {
      if (match[1] == "transparent") {
        return [0, 0, 0, 0];
      }

      rgb = colorName$1[match[1]];

      if (!rgb) {
        return;
      }
    }

    for (var i = 0; i < rgb.length; i++) {
      rgb[i] = scale(rgb[i], 0, 255);
    }

    if (!a && a != 0) {
      a = 1;
    } else {
      a = scale(a, 0, 1);
    }

    rgb[3] = a;
    return rgb;
  }

  function getHsla(string) {
    if (!string) {
      return;
    }

    var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
    var match = string.match(hsl);

    if (match) {
      var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
          s = scale(parseFloat(match[2]), 0, 100),
          l = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, s, l, a];
    }
  }

  function getHwb(string) {
    if (!string) {
      return;
    }

    var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
    var match = string.match(hwb);

    if (match) {
      var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
          w = scale(parseFloat(match[2]), 0, 100),
          b = scale(parseFloat(match[3]), 0, 100),
          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, w, b, a];
    }
  }

  function getRgb(string) {
    var rgba = getRgba(string);
    return rgba && rgba.slice(0, 3);
  }

  function getHsl(string) {
    var hsla = getHsla(string);
    return hsla && hsla.slice(0, 3);
  }

  function getAlpha(string) {
    var vals = getRgba(string);

    if (vals) {
      return vals[3];
    } else if (vals = getHsla(string)) {
      return vals[3];
    } else if (vals = getHwb(string)) {
      return vals[3];
    }
  } // generators


  function hexString(rgba, a) {
    var a = a !== undefined && rgba.length === 3 ? a : rgba[3];
    return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (a >= 0 && a < 1 ? hexDouble(Math.round(a * 255)) : "");
  }

  function rgbString(rgba, alpha) {
    if (alpha < 1 || rgba[3] && rgba[3] < 1) {
      return rgbaString(rgba, alpha);
    }

    return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
  }

  function rgbaString(rgba, alpha) {
    if (alpha === undefined) {
      alpha = rgba[3] !== undefined ? rgba[3] : 1;
    }

    return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + alpha + ")";
  }

  function percentString(rgba, alpha) {
    if (alpha < 1 || rgba[3] && rgba[3] < 1) {
      return percentaString(rgba, alpha);
    }

    var r = Math.round(rgba[0] / 255 * 100),
        g = Math.round(rgba[1] / 255 * 100),
        b = Math.round(rgba[2] / 255 * 100);
    return "rgb(" + r + "%, " + g + "%, " + b + "%)";
  }

  function percentaString(rgba, alpha) {
    var r = Math.round(rgba[0] / 255 * 100),
        g = Math.round(rgba[1] / 255 * 100),
        b = Math.round(rgba[2] / 255 * 100);
    return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
  }

  function hslString(hsla, alpha) {
    if (alpha < 1 || hsla[3] && hsla[3] < 1) {
      return hslaString(hsla, alpha);
    }

    return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
  }

  function hslaString(hsla, alpha) {
    if (alpha === undefined) {
      alpha = hsla[3] !== undefined ? hsla[3] : 1;
    }

    return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + alpha + ")";
  } // hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
  // (hwb have alpha optional & 1 is default value)


  function hwbString(hwb, alpha) {
    if (alpha === undefined) {
      alpha = hwb[3] !== undefined ? hwb[3] : 1;
    }

    return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%" + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
  }

  function keyword(rgb) {
    return reverseNames[rgb.slice(0, 3)];
  } // helpers


  function scale(num, min, max) {
    return Math.min(Math.max(min, num), max);
  }

  function hexDouble(num) {
    var str = num.toString(16).toUpperCase();
    return str.length < 2 ? "0" + str : str;
  } //create a list of reverse color names


  var reverseNames = {};

  for (var name in colorName$1) {
    reverseNames[colorName$1[name]] = name;
  }
  /* MIT license */


  var Color = function Color(obj) {
    if (obj instanceof Color) {
      return obj;
    }

    if (!(this instanceof Color)) {
      return new Color(obj);
    }

    this.valid = false;
    this.values = {
      rgb: [0, 0, 0],
      hsl: [0, 0, 0],
      hsv: [0, 0, 0],
      hwb: [0, 0, 0],
      cmyk: [0, 0, 0, 0],
      alpha: 1
    }; // parse Color() argument

    var vals;

    if (typeof obj === 'string') {
      vals = colorString.getRgba(obj);

      if (vals) {
        this.setValues('rgb', vals);
      } else if (vals = colorString.getHsla(obj)) {
        this.setValues('hsl', vals);
      } else if (vals = colorString.getHwb(obj)) {
        this.setValues('hwb', vals);
      }
    } else if (typeof obj === 'object') {
      vals = obj;

      if (vals.r !== undefined || vals.red !== undefined) {
        this.setValues('rgb', vals);
      } else if (vals.l !== undefined || vals.lightness !== undefined) {
        this.setValues('hsl', vals);
      } else if (vals.v !== undefined || vals.value !== undefined) {
        this.setValues('hsv', vals);
      } else if (vals.w !== undefined || vals.whiteness !== undefined) {
        this.setValues('hwb', vals);
      } else if (vals.c !== undefined || vals.cyan !== undefined) {
        this.setValues('cmyk', vals);
      }
    }
  };

  Color.prototype = {
    isValid: function isValid() {
      return this.valid;
    },
    rgb: function rgb() {
      return this.setSpace('rgb', arguments);
    },
    hsl: function hsl() {
      return this.setSpace('hsl', arguments);
    },
    hsv: function hsv() {
      return this.setSpace('hsv', arguments);
    },
    hwb: function hwb() {
      return this.setSpace('hwb', arguments);
    },
    cmyk: function cmyk() {
      return this.setSpace('cmyk', arguments);
    },
    rgbArray: function rgbArray() {
      return this.values.rgb;
    },
    hslArray: function hslArray() {
      return this.values.hsl;
    },
    hsvArray: function hsvArray() {
      return this.values.hsv;
    },
    hwbArray: function hwbArray() {
      var values = this.values;

      if (values.alpha !== 1) {
        return values.hwb.concat([values.alpha]);
      }

      return values.hwb;
    },
    cmykArray: function cmykArray() {
      return this.values.cmyk;
    },
    rgbaArray: function rgbaArray() {
      var values = this.values;
      return values.rgb.concat([values.alpha]);
    },
    hslaArray: function hslaArray() {
      var values = this.values;
      return values.hsl.concat([values.alpha]);
    },
    alpha: function alpha(val) {
      if (val === undefined) {
        return this.values.alpha;
      }

      this.setValues('alpha', val);
      return this;
    },
    red: function red(val) {
      return this.setChannel('rgb', 0, val);
    },
    green: function green(val) {
      return this.setChannel('rgb', 1, val);
    },
    blue: function blue(val) {
      return this.setChannel('rgb', 2, val);
    },
    hue: function hue(val) {
      if (val) {
        val %= 360;
        val = val < 0 ? 360 + val : val;
      }

      return this.setChannel('hsl', 0, val);
    },
    saturation: function saturation(val) {
      return this.setChannel('hsl', 1, val);
    },
    lightness: function lightness(val) {
      return this.setChannel('hsl', 2, val);
    },
    saturationv: function saturationv(val) {
      return this.setChannel('hsv', 1, val);
    },
    whiteness: function whiteness(val) {
      return this.setChannel('hwb', 1, val);
    },
    blackness: function blackness(val) {
      return this.setChannel('hwb', 2, val);
    },
    value: function value(val) {
      return this.setChannel('hsv', 2, val);
    },
    cyan: function cyan(val) {
      return this.setChannel('cmyk', 0, val);
    },
    magenta: function magenta(val) {
      return this.setChannel('cmyk', 1, val);
    },
    yellow: function yellow(val) {
      return this.setChannel('cmyk', 2, val);
    },
    black: function black(val) {
      return this.setChannel('cmyk', 3, val);
    },
    hexString: function hexString() {
      return colorString.hexString(this.values.rgb);
    },
    rgbString: function rgbString() {
      return colorString.rgbString(this.values.rgb, this.values.alpha);
    },
    rgbaString: function rgbaString() {
      return colorString.rgbaString(this.values.rgb, this.values.alpha);
    },
    percentString: function percentString() {
      return colorString.percentString(this.values.rgb, this.values.alpha);
    },
    hslString: function hslString() {
      return colorString.hslString(this.values.hsl, this.values.alpha);
    },
    hslaString: function hslaString() {
      return colorString.hslaString(this.values.hsl, this.values.alpha);
    },
    hwbString: function hwbString() {
      return colorString.hwbString(this.values.hwb, this.values.alpha);
    },
    keyword: function keyword() {
      return colorString.keyword(this.values.rgb, this.values.alpha);
    },
    rgbNumber: function rgbNumber() {
      var rgb = this.values.rgb;
      return rgb[0] << 16 | rgb[1] << 8 | rgb[2];
    },
    luminosity: function luminosity() {
      // http://www.w3.org/TR/WCAG20/#relativeluminancedef
      var rgb = this.values.rgb;
      var lum = [];

      for (var i = 0; i < rgb.length; i++) {
        var chan = rgb[i] / 255;
        lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
      }

      return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    },
    contrast: function contrast(color2) {
      // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
      var lum1 = this.luminosity();
      var lum2 = color2.luminosity();

      if (lum1 > lum2) {
        return (lum1 + 0.05) / (lum2 + 0.05);
      }

      return (lum2 + 0.05) / (lum1 + 0.05);
    },
    level: function level(color2) {
      var contrastRatio = this.contrast(color2);

      if (contrastRatio >= 7.1) {
        return 'AAA';
      }

      return contrastRatio >= 4.5 ? 'AA' : '';
    },
    dark: function dark() {
      // YIQ equation from http://24ways.org/2010/calculating-color-contrast
      var rgb = this.values.rgb;
      var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
      return yiq < 128;
    },
    light: function light() {
      return !this.dark();
    },
    negate: function negate() {
      var rgb = [];

      for (var i = 0; i < 3; i++) {
        rgb[i] = 255 - this.values.rgb[i];
      }

      this.setValues('rgb', rgb);
      return this;
    },
    lighten: function lighten(ratio) {
      var hsl = this.values.hsl;
      hsl[2] += hsl[2] * ratio;
      this.setValues('hsl', hsl);
      return this;
    },
    darken: function darken(ratio) {
      var hsl = this.values.hsl;
      hsl[2] -= hsl[2] * ratio;
      this.setValues('hsl', hsl);
      return this;
    },
    saturate: function saturate(ratio) {
      var hsl = this.values.hsl;
      hsl[1] += hsl[1] * ratio;
      this.setValues('hsl', hsl);
      return this;
    },
    desaturate: function desaturate(ratio) {
      var hsl = this.values.hsl;
      hsl[1] -= hsl[1] * ratio;
      this.setValues('hsl', hsl);
      return this;
    },
    whiten: function whiten(ratio) {
      var hwb = this.values.hwb;
      hwb[1] += hwb[1] * ratio;
      this.setValues('hwb', hwb);
      return this;
    },
    blacken: function blacken(ratio) {
      var hwb = this.values.hwb;
      hwb[2] += hwb[2] * ratio;
      this.setValues('hwb', hwb);
      return this;
    },
    greyscale: function greyscale() {
      var rgb = this.values.rgb; // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale

      var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
      this.setValues('rgb', [val, val, val]);
      return this;
    },
    clearer: function clearer(ratio) {
      var alpha = this.values.alpha;
      this.setValues('alpha', alpha - alpha * ratio);
      return this;
    },
    opaquer: function opaquer(ratio) {
      var alpha = this.values.alpha;
      this.setValues('alpha', alpha + alpha * ratio);
      return this;
    },
    rotate: function rotate(degrees) {
      var hsl = this.values.hsl;
      var hue = (hsl[0] + degrees) % 360;
      hsl[0] = hue < 0 ? 360 + hue : hue;
      this.setValues('hsl', hsl);
      return this;
    },

    /**
     * Ported from sass implementation in C
     * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
     */
    mix: function mix(mixinColor, weight) {
      var color1 = this;
      var color2 = mixinColor;
      var p = weight === undefined ? 0.5 : weight;
      var w = 2 * p - 1;
      var a = color1.alpha() - color2.alpha();
      var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
      var w2 = 1 - w1;
      return this.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue()).alpha(color1.alpha() * p + color2.alpha() * (1 - p));
    },
    toJSON: function toJSON() {
      return this.rgb();
    },
    clone: function clone() {
      // NOTE(SB): using node-clone creates a dependency to Buffer when using browserify,
      // making the final build way to big to embed in Chart.js. So let's do it manually,
      // assuming that values to clone are 1 dimension arrays containing only numbers,
      // except 'alpha' which is a number.
      var result = new Color();
      var source = this.values;
      var target = result.values;
      var value, type;

      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          value = source[prop];
          type = {}.toString.call(value);

          if (type === '[object Array]') {
            target[prop] = value.slice(0);
          } else if (type === '[object Number]') {
            target[prop] = value;
          } else {
            console.error('unexpected color value:', value);
          }
        }
      }

      return result;
    }
  };
  Color.prototype.spaces = {
    rgb: ['red', 'green', 'blue'],
    hsl: ['hue', 'saturation', 'lightness'],
    hsv: ['hue', 'saturation', 'value'],
    hwb: ['hue', 'whiteness', 'blackness'],
    cmyk: ['cyan', 'magenta', 'yellow', 'black']
  };
  Color.prototype.maxes = {
    rgb: [255, 255, 255],
    hsl: [360, 100, 100],
    hsv: [360, 100, 100],
    hwb: [360, 100, 100],
    cmyk: [100, 100, 100, 100]
  };

  Color.prototype.getValues = function (space) {
    var values = this.values;
    var vals = {};

    for (var i = 0; i < space.length; i++) {
      vals[space.charAt(i)] = values[space][i];
    }

    if (values.alpha !== 1) {
      vals.a = values.alpha;
    } // {r: 255, g: 255, b: 255, a: 0.4}


    return vals;
  };

  Color.prototype.setValues = function (space, vals) {
    var values = this.values;
    var spaces = this.spaces;
    var maxes = this.maxes;
    var alpha = 1;
    var i;
    this.valid = true;

    if (space === 'alpha') {
      alpha = vals;
    } else if (vals.length) {
      // [10, 10, 10]
      values[space] = vals.slice(0, space.length);
      alpha = vals[space.length];
    } else if (vals[space.charAt(0)] !== undefined) {
      // {r: 10, g: 10, b: 10}
      for (i = 0; i < space.length; i++) {
        values[space][i] = vals[space.charAt(i)];
      }

      alpha = vals.a;
    } else if (vals[spaces[space][0]] !== undefined) {
      // {red: 10, green: 10, blue: 10}
      var chans = spaces[space];

      for (i = 0; i < space.length; i++) {
        values[space][i] = vals[chans[i]];
      }

      alpha = vals.alpha;
    }

    values.alpha = Math.max(0, Math.min(1, alpha === undefined ? values.alpha : alpha));

    if (space === 'alpha') {
      return false;
    }

    var capped; // cap values of the space prior converting all values

    for (i = 0; i < space.length; i++) {
      capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
      values[space][i] = Math.round(capped);
    } // convert to all the other color spaces


    for (var sname in spaces) {
      if (sname !== space) {
        values[sname] = colorConvert[space][sname](values[space]);
      }
    }

    return true;
  };

  Color.prototype.setSpace = function (space, args) {
    var vals = args[0];

    if (vals === undefined) {
      // color.rgb()
      return this.getValues(space);
    } // color.rgb(10, 10, 10)


    if (typeof vals === 'number') {
      vals = Array.prototype.slice.call(args);
    }

    this.setValues(space, vals);
    return this;
  };

  Color.prototype.setChannel = function (space, index, val) {
    var svalues = this.values[space];

    if (val === undefined) {
      // color.red()
      return svalues[index];
    } else if (val === svalues[index]) {
      // color.red(color.red())
      return this;
    } // color.red(100)


    svalues[index] = val;
    this.setValues(space, svalues);
    return this;
  };

  if (typeof window !== 'undefined') {
    window.Color = Color;
  }

  var chartjsColor = Color;

  function isValidKey(key) {
    return ['__proto__', 'prototype', 'constructor'].indexOf(key) === -1;
  }
  /**
   * @namespace Chart.helpers
   */


  var helpers = {
    /**
     * An empty function that can be used, for example, for optional callback.
     */
    noop: function noop() {},

    /**
     * Returns a unique id, sequentially generated from a global variable.
     * @returns {number}
     * @function
     */
    uid: function () {
      var id = 0;
      return function () {
        return id++;
      };
    }(),

    /**
     * Returns true if `value` is neither null nor undefined, else returns false.
     * @param {*} value - The value to test.
     * @returns {boolean}
     * @since 2.7.0
     */
    isNullOrUndef: function isNullOrUndef(value) {
      return value === null || typeof value === 'undefined';
    },

    /**
     * Returns true if `value` is an array (including typed arrays), else returns false.
     * @param {*} value - The value to test.
     * @returns {boolean}
     * @function
     */
    isArray: function isArray(value) {
      if (Array.isArray && Array.isArray(value)) {
        return true;
      }

      var type = Object.prototype.toString.call(value);

      if (type.substr(0, 7) === '[object' && type.substr(-6) === 'Array]') {
        return true;
      }

      return false;
    },

    /**
     * Returns true if `value` is an object (excluding null), else returns false.
     * @param {*} value - The value to test.
     * @returns {boolean}
     * @since 2.7.0
     */
    isObject: function isObject(value) {
      return value !== null && Object.prototype.toString.call(value) === '[object Object]';
    },

    /**
     * Returns true if `value` is a finite number, else returns false
     * @param {*} value  - The value to test.
     * @returns {boolean}
     */
    isFinite: function (_isFinite) {
      function isFinite(_x) {
        return _isFinite.apply(this, arguments);
      }

      isFinite.toString = function () {
        return _isFinite.toString();
      };

      return isFinite;
    }(function (value) {
      return (typeof value === 'number' || value instanceof Number) && isFinite(value);
    }),

    /**
     * Returns `value` if defined, else returns `defaultValue`.
     * @param {*} value - The value to return if defined.
     * @param {*} defaultValue - The value to return if `value` is undefined.
     * @returns {*}
     */
    valueOrDefault: function valueOrDefault(value, defaultValue) {
      return typeof value === 'undefined' ? defaultValue : value;
    },

    /**
     * Returns value at the given `index` in array if defined, else returns `defaultValue`.
     * @param {Array} value - The array to lookup for value at `index`.
     * @param {number} index - The index in `value` to lookup for value.
     * @param {*} defaultValue - The value to return if `value[index]` is undefined.
     * @returns {*}
     */
    valueAtIndexOrDefault: function valueAtIndexOrDefault(value, index, defaultValue) {
      return helpers.valueOrDefault(helpers.isArray(value) ? value[index] : value, defaultValue);
    },

    /**
     * Calls `fn` with the given `args` in the scope defined by `thisArg` and returns the
     * value returned by `fn`. If `fn` is not a function, this method returns undefined.
     * @param {function} fn - The function to call.
     * @param {Array|undefined|null} args - The arguments with which `fn` should be called.
     * @param {object} [thisArg] - The value of `this` provided for the call to `fn`.
     * @returns {*}
     */
    callback: function callback(fn, args, thisArg) {
      if (fn && typeof fn.call === 'function') {
        return fn.apply(thisArg, args);
      }
    },

    /**
     * Note(SB) for performance sake, this method should only be used when loopable type
     * is unknown or in none intensive code (not called often and small loopable). Else
     * it's preferable to use a regular for() loop and save extra function calls.
     * @param {object|Array} loopable - The object or array to be iterated.
     * @param {function} fn - The function to call for each item.
     * @param {object} [thisArg] - The value of `this` provided for the call to `fn`.
     * @param {boolean} [reverse] - If true, iterates backward on the loopable.
     */
    each: function each(loopable, fn, thisArg, reverse) {
      var i, len, keys;

      if (helpers.isArray(loopable)) {
        len = loopable.length;

        if (reverse) {
          for (i = len - 1; i >= 0; i--) {
            fn.call(thisArg, loopable[i], i);
          }
        } else {
          for (i = 0; i < len; i++) {
            fn.call(thisArg, loopable[i], i);
          }
        }
      } else if (helpers.isObject(loopable)) {
        keys = Object.keys(loopable);
        len = keys.length;

        for (i = 0; i < len; i++) {
          fn.call(thisArg, loopable[keys[i]], keys[i]);
        }
      }
    },

    /**
     * Returns true if the `a0` and `a1` arrays have the same content, else returns false.
     * @see https://stackoverflow.com/a/14853974
     * @param {Array} a0 - The array to compare
     * @param {Array} a1 - The array to compare
     * @returns {boolean}
     */
    arrayEquals: function arrayEquals(a0, a1) {
      var i, ilen, v0, v1;

      if (!a0 || !a1 || a0.length !== a1.length) {
        return false;
      }

      for (i = 0, ilen = a0.length; i < ilen; ++i) {
        v0 = a0[i];
        v1 = a1[i];

        if (v0 instanceof Array && v1 instanceof Array) {
          if (!helpers.arrayEquals(v0, v1)) {
            return false;
          }
        } else if (v0 !== v1) {
          // NOTE: two different object instances will never be equal: {x:20} != {x:20}
          return false;
        }
      }

      return true;
    },

    /**
     * Returns a deep copy of `source` without keeping references on objects and arrays.
     * @param {*} source - The value to clone.
     * @returns {*}
     */
    clone: function clone(source) {
      if (helpers.isArray(source)) {
        return source.map(helpers.clone);
      }

      if (helpers.isObject(source)) {
        var target = Object.create(source);
        var keys = Object.keys(source);
        var klen = keys.length;
        var k = 0;

        for (; k < klen; ++k) {
          target[keys[k]] = helpers.clone(source[keys[k]]);
        }

        return target;
      }

      return source;
    },

    /**
     * The default merger when Chart.helpers.merge is called without merger option.
     * Note(SB): also used by mergeConfig and mergeScaleConfig as fallback.
     * @private
     */
    _merger: function _merger(key, target, source, options) {
      if (!isValidKey(key)) {
        // We want to ensure we do not copy prototypes over
        // as this can pollute global namespaces
        return;
      }

      var tval = target[key];
      var sval = source[key];

      if (helpers.isObject(tval) && helpers.isObject(sval)) {
        helpers.merge(tval, sval, options);
      } else {
        target[key] = helpers.clone(sval);
      }
    },

    /**
     * Merges source[key] in target[key] only if target[key] is undefined.
     * @private
     */
    _mergerIf: function _mergerIf(key, target, source) {
      if (!isValidKey(key)) {
        // We want to ensure we do not copy prototypes over
        // as this can pollute global namespaces
        return;
      }

      var tval = target[key];
      var sval = source[key];

      if (helpers.isObject(tval) && helpers.isObject(sval)) {
        helpers.mergeIf(tval, sval);
      } else if (!target.hasOwnProperty(key)) {
        target[key] = helpers.clone(sval);
      }
    },

    /**
     * Recursively deep copies `source` properties into `target` with the given `options`.
     * IMPORTANT: `target` is not cloned and will be updated with `source` properties.
     * @param {object} target - The target object in which all sources are merged into.
     * @param {object|object[]} source - Object(s) to merge into `target`.
     * @param {object} [options] - Merging options:
     * @param {function} [options.merger] - The merge method (key, target, source, options)
     * @returns {object} The `target` object.
     */
    merge: function merge(target, source, options) {
      var sources = helpers.isArray(source) ? source : [source];
      var ilen = sources.length;
      var merge, i, keys, klen, k;

      if (!helpers.isObject(target)) {
        return target;
      }

      options = options || {};
      merge = options.merger || helpers._merger;

      for (i = 0; i < ilen; ++i) {
        source = sources[i];

        if (!helpers.isObject(source)) {
          continue;
        }

        keys = Object.keys(source);

        for (k = 0, klen = keys.length; k < klen; ++k) {
          merge(keys[k], target, source, options);
        }
      }

      return target;
    },

    /**
     * Recursively deep copies `source` properties into `target` *only* if not defined in target.
     * IMPORTANT: `target` is not cloned and will be updated with `source` properties.
     * @param {object} target - The target object in which all sources are merged into.
     * @param {object|object[]} source - Object(s) to merge into `target`.
     * @returns {object} The `target` object.
     */
    mergeIf: function mergeIf(target, source) {
      return helpers.merge(target, source, {
        merger: helpers._mergerIf
      });
    },

    /**
     * Applies the contents of two or more objects together into the first object.
     * @param {object} target - The target object in which all objects are merged into.
     * @param {object} arg1 - Object containing additional properties to merge in target.
     * @param {object} argN - Additional objects containing properties to merge in target.
     * @returns {object} The `target` object.
     */
    extend: Object.assign || function (target) {
      return helpers.merge(target, [].slice.call(arguments, 1), {
        merger: function merger(key, dst, src) {
          dst[key] = src[key];
        }
      });
    },

    /**
     * Basic javascript inheritance based on the model created in Backbone.js
     */
    inherits: function inherits(extensions) {
      var me = this;
      var ChartElement = extensions && extensions.hasOwnProperty('constructor') ? extensions.constructor : function () {
        return me.apply(this, arguments);
      };

      var Surrogate = function Surrogate() {
        this.constructor = ChartElement;
      };

      Surrogate.prototype = me.prototype;
      ChartElement.prototype = new Surrogate();
      ChartElement.extend = helpers.inherits;

      if (extensions) {
        helpers.extend(ChartElement.prototype, extensions);
      }

      ChartElement.__super__ = me.prototype;
      return ChartElement;
    },
    _deprecated: function _deprecated(scope, value, previous, current) {
      if (value !== undefined) {
        console.warn(scope + ': "' + previous + '" is deprecated. Please use "' + current + '" instead');
      }
    }
  };
  var helpers_core = helpers; // DEPRECATIONS

  /**
   * Provided for backward compatibility, use Chart.helpers.callback instead.
   * @function Chart.helpers.callCallback
   * @deprecated since version 2.6.0
   * @todo remove at version 3
   * @private
   */

  helpers.callCallback = helpers.callback;
  /**
   * Provided for backward compatibility, use Array.prototype.indexOf instead.
   * Array.prototype.indexOf compatibility: Chrome, Opera, Safari, FF1.5+, IE9+
   * @function Chart.helpers.indexOf
   * @deprecated since version 2.7.0
   * @todo remove at version 3
   * @private
   */

  helpers.indexOf = function (array, item, fromIndex) {
    return Array.prototype.indexOf.call(array, item, fromIndex);
  };
  /**
   * Provided for backward compatibility, use Chart.helpers.valueOrDefault instead.
   * @function Chart.helpers.getValueOrDefault
   * @deprecated since version 2.7.0
   * @todo remove at version 3
   * @private
   */


  helpers.getValueOrDefault = helpers.valueOrDefault;
  /**
   * Provided for backward compatibility, use Chart.helpers.valueAtIndexOrDefault instead.
   * @function Chart.helpers.getValueAtIndexOrDefault
   * @deprecated since version 2.7.0
   * @todo remove at version 3
   * @private
   */

  helpers.getValueAtIndexOrDefault = helpers.valueAtIndexOrDefault;
  /**
   * Easing functions adapted from Robert Penner's easing equations.
   * @namespace Chart.helpers.easingEffects
   * @see http://www.robertpenner.com/easing/
   */

  var effects = {
    linear: function linear(t) {
      return t;
    },
    easeInQuad: function easeInQuad(t) {
      return t * t;
    },
    easeOutQuad: function easeOutQuad(t) {
      return -t * (t - 2);
    },
    easeInOutQuad: function easeInOutQuad(t) {
      if ((t /= 0.5) < 1) {
        return 0.5 * t * t;
      }

      return -0.5 * (--t * (t - 2) - 1);
    },
    easeInCubic: function easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic: function easeOutCubic(t) {
      return (t = t - 1) * t * t + 1;
    },
    easeInOutCubic: function easeInOutCubic(t) {
      if ((t /= 0.5) < 1) {
        return 0.5 * t * t * t;
      }

      return 0.5 * ((t -= 2) * t * t + 2);
    },
    easeInQuart: function easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart: function easeOutQuart(t) {
      return -((t = t - 1) * t * t * t - 1);
    },
    easeInOutQuart: function easeInOutQuart(t) {
      if ((t /= 0.5) < 1) {
        return 0.5 * t * t * t * t;
      }

      return -0.5 * ((t -= 2) * t * t * t - 2);
    },
    easeInQuint: function easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint: function easeOutQuint(t) {
      return (t = t - 1) * t * t * t * t + 1;
    },
    easeInOutQuint: function easeInOutQuint(t) {
      if ((t /= 0.5) < 1) {
        return 0.5 * t * t * t * t * t;
      }

      return 0.5 * ((t -= 2) * t * t * t * t + 2);
    },
    easeInSine: function easeInSine(t) {
      return -Math.cos(t * (Math.PI / 2)) + 1;
    },
    easeOutSine: function easeOutSine(t) {
      return Math.sin(t * (Math.PI / 2));
    },
    easeInOutSine: function easeInOutSine(t) {
      return -0.5 * (Math.cos(Math.PI * t) - 1);
    },
    easeInExpo: function easeInExpo(t) {
      return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
    },
    easeOutExpo: function easeOutExpo(t) {
      return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
    },
    easeInOutExpo: function easeInOutExpo(t) {
      if (t === 0) {
        return 0;
      }

      if (t === 1) {
        return 1;
      }

      if ((t /= 0.5) < 1) {
        return 0.5 * Math.pow(2, 10 * (t - 1));
      }

      return 0.5 * (-Math.pow(2, -10 * --t) + 2);
    },
    easeInCirc: function easeInCirc(t) {
      if (t >= 1) {
        return t;
      }

      return -(Math.sqrt(1 - t * t) - 1);
    },
    easeOutCirc: function easeOutCirc(t) {
      return Math.sqrt(1 - (t = t - 1) * t);
    },
    easeInOutCirc: function easeInOutCirc(t) {
      if ((t /= 0.5) < 1) {
        return -0.5 * (Math.sqrt(1 - t * t) - 1);
      }

      return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    easeInElastic: function easeInElastic(t) {
      var s = 1.70158;
      var p = 0;
      var a = 1;

      if (t === 0) {
        return 0;
      }

      if (t === 1) {
        return 1;
      }

      if (!p) {
        p = 0.3;
      }

      if (a < 1) {
        a = 1;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(1 / a);
      }

      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
    },
    easeOutElastic: function easeOutElastic(t) {
      var s = 1.70158;
      var p = 0;
      var a = 1;

      if (t === 0) {
        return 0;
      }

      if (t === 1) {
        return 1;
      }

      if (!p) {
        p = 0.3;
      }

      if (a < 1) {
        a = 1;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(1 / a);
      }

      return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
    },
    easeInOutElastic: function easeInOutElastic(t) {
      var s = 1.70158;
      var p = 0;
      var a = 1;

      if (t === 0) {
        return 0;
      }

      if ((t /= 0.5) === 2) {
        return 1;
      }

      if (!p) {
        p = 0.45;
      }

      if (a < 1) {
        a = 1;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(1 / a);
      }

      if (t < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
      }

      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
    },
    easeInBack: function easeInBack(t) {
      var s = 1.70158;
      return t * t * ((s + 1) * t - s);
    },
    easeOutBack: function easeOutBack(t) {
      var s = 1.70158;
      return (t = t - 1) * t * ((s + 1) * t + s) + 1;
    },
    easeInOutBack: function easeInOutBack(t) {
      var s = 1.70158;

      if ((t /= 0.5) < 1) {
        return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
      }

      return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
    },
    easeInBounce: function easeInBounce(t) {
      return 1 - effects.easeOutBounce(1 - t);
    },
    easeOutBounce: function easeOutBounce(t) {
      if (t < 1 / 2.75) {
        return 7.5625 * t * t;
      }

      if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
      }

      if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
      }

      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    },
    easeInOutBounce: function easeInOutBounce(t) {
      if (t < 0.5) {
        return effects.easeInBounce(t * 2) * 0.5;
      }

      return effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
    }
  };
  var helpers_easing = {
    effects: effects
  }; // DEPRECATIONS

  /**
   * Provided for backward compatibility, use Chart.helpers.easing.effects instead.
   * @function Chart.helpers.easingEffects
   * @deprecated since version 2.7.0
   * @todo remove at version 3
   * @private
   */

  helpers_core.easingEffects = effects;
  var PI = Math.PI;
  var RAD_PER_DEG = PI / 180;
  var DOUBLE_PI = PI * 2;
  var HALF_PI = PI / 2;
  var QUARTER_PI = PI / 4;
  var TWO_THIRDS_PI = PI * 2 / 3;
  /**
   * @namespace Chart.helpers.canvas
   */

  var exports$1 = {
    /**
     * Clears the entire canvas associated to the given `chart`.
     * @param {Chart} chart - The chart for which to clear the canvas.
     */
    clear: function clear(chart) {
      chart.ctx.clearRect(0, 0, chart.width, chart.height);
    },

    /**
     * Creates a "path" for a rectangle with rounded corners at position (x, y) with a
     * given size (width, height) and the same `radius` for all corners.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D Context.
     * @param {number} x - The x axis of the coordinate for the rectangle starting point.
     * @param {number} y - The y axis of the coordinate for the rectangle starting point.
     * @param {number} width - The rectangle's width.
     * @param {number} height - The rectangle's height.
     * @param {number} radius - The rounded amount (in pixels) for the four corners.
     * @todo handle `radius` as top-left, top-right, bottom-right, bottom-left array/object?
     */
    roundedRect: function roundedRect(ctx, x, y, width, height, radius) {
      if (radius) {
        var r = Math.min(radius, height / 2, width / 2);
        var left = x + r;
        var top = y + r;
        var right = x + width - r;
        var bottom = y + height - r;
        ctx.moveTo(x, top);

        if (left < right && top < bottom) {
          ctx.arc(left, top, r, -PI, -HALF_PI);
          ctx.arc(right, top, r, -HALF_PI, 0);
          ctx.arc(right, bottom, r, 0, HALF_PI);
          ctx.arc(left, bottom, r, HALF_PI, PI);
        } else if (left < right) {
          ctx.moveTo(left, y);
          ctx.arc(right, top, r, -HALF_PI, HALF_PI);
          ctx.arc(left, top, r, HALF_PI, PI + HALF_PI);
        } else if (top < bottom) {
          ctx.arc(left, top, r, -PI, 0);
          ctx.arc(left, bottom, r, 0, PI);
        } else {
          ctx.arc(left, top, r, -PI, PI);
        }

        ctx.closePath();
        ctx.moveTo(x, y);
      } else {
        ctx.rect(x, y, width, height);
      }
    },
    drawPoint: function drawPoint(ctx, style, radius, x, y, rotation) {
      var type, xOffset, yOffset, size, cornerRadius;
      var rad = (rotation || 0) * RAD_PER_DEG;

      if (style && typeof style === 'object') {
        type = style.toString();

        if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rad);
          ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
          ctx.restore();
          return;
        }
      }

      if (isNaN(radius) || radius <= 0) {
        return;
      }

      ctx.beginPath();

      switch (style) {
        // Default includes circle
        default:
          ctx.arc(x, y, radius, 0, DOUBLE_PI);
          ctx.closePath();
          break;

        case 'triangle':
          ctx.moveTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
          rad += TWO_THIRDS_PI;
          ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
          rad += TWO_THIRDS_PI;
          ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
          ctx.closePath();
          break;

        case 'rectRounded':
          // NOTE: the rounded rect implementation changed to use `arc` instead of
          // `quadraticCurveTo` since it generates better results when rect is
          // almost a circle. 0.516 (instead of 0.5) produces results with visually
          // closer proportion to the previous impl and it is inscribed in the
          // circle with `radius`. For more details, see the following PRs:
          // https://github.com/chartjs/Chart.js/issues/5597
          // https://github.com/chartjs/Chart.js/issues/5858
          cornerRadius = radius * 0.516;
          size = radius - cornerRadius;
          xOffset = Math.cos(rad + QUARTER_PI) * size;
          yOffset = Math.sin(rad + QUARTER_PI) * size;
          ctx.arc(x - xOffset, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
          ctx.arc(x + yOffset, y - xOffset, cornerRadius, rad - HALF_PI, rad);
          ctx.arc(x + xOffset, y + yOffset, cornerRadius, rad, rad + HALF_PI);
          ctx.arc(x - yOffset, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
          ctx.closePath();
          break;

        case 'rect':
          if (!rotation) {
            size = Math.SQRT1_2 * radius;
            ctx.rect(x - size, y - size, 2 * size, 2 * size);
            break;
          }

          rad += QUARTER_PI;

        /* falls through */

        case 'rectRot':
          xOffset = Math.cos(rad) * radius;
          yOffset = Math.sin(rad) * radius;
          ctx.moveTo(x - xOffset, y - yOffset);
          ctx.lineTo(x + yOffset, y - xOffset);
          ctx.lineTo(x + xOffset, y + yOffset);
          ctx.lineTo(x - yOffset, y + xOffset);
          ctx.closePath();
          break;

        case 'crossRot':
          rad += QUARTER_PI;

        /* falls through */

        case 'cross':
          xOffset = Math.cos(rad) * radius;
          yOffset = Math.sin(rad) * radius;
          ctx.moveTo(x - xOffset, y - yOffset);
          ctx.lineTo(x + xOffset, y + yOffset);
          ctx.moveTo(x + yOffset, y - xOffset);
          ctx.lineTo(x - yOffset, y + xOffset);
          break;

        case 'star':
          xOffset = Math.cos(rad) * radius;
          yOffset = Math.sin(rad) * radius;
          ctx.moveTo(x - xOffset, y - yOffset);
          ctx.lineTo(x + xOffset, y + yOffset);
          ctx.moveTo(x + yOffset, y - xOffset);
          ctx.lineTo(x - yOffset, y + xOffset);
          rad += QUARTER_PI;
          xOffset = Math.cos(rad) * radius;
          yOffset = Math.sin(rad) * radius;
          ctx.moveTo(x - xOffset, y - yOffset);
          ctx.lineTo(x + xOffset, y + yOffset);
          ctx.moveTo(x + yOffset, y - xOffset);
          ctx.lineTo(x - yOffset, y + xOffset);
          break;

        case 'line':
          xOffset = Math.cos(rad) * radius;
          yOffset = Math.sin(rad) * radius;
          ctx.moveTo(x - xOffset, y - yOffset);
          ctx.lineTo(x + xOffset, y + yOffset);
          break;

        case 'dash':
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(rad) * radius, y + Math.sin(rad) * radius);
          break;
      }

      ctx.fill();
      ctx.stroke();
    },

    /**
     * Returns true if the point is inside the rectangle
     * @param {object} point - The point to test
     * @param {object} area - The rectangle
     * @returns {boolean}
     * @private
     */
    _isPointInArea: function _isPointInArea(point, area) {
      var epsilon = 1e-6; // 1e-6 is margin in pixels for accumulated error.

      return point.x > area.left - epsilon && point.x < area.right + epsilon && point.y > area.top - epsilon && point.y < area.bottom + epsilon;
    },
    clipArea: function clipArea(ctx, area) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
      ctx.clip();
    },
    unclipArea: function unclipArea(ctx) {
      ctx.restore();
    },
    lineTo: function lineTo(ctx, previous, target, flip) {
      var stepped = target.steppedLine;

      if (stepped) {
        if (stepped === 'middle') {
          var midpoint = (previous.x + target.x) / 2.0;
          ctx.lineTo(midpoint, flip ? target.y : previous.y);
          ctx.lineTo(midpoint, flip ? previous.y : target.y);
        } else if (stepped === 'after' && !flip || stepped !== 'after' && flip) {
          ctx.lineTo(previous.x, target.y);
        } else {
          ctx.lineTo(target.x, previous.y);
        }

        ctx.lineTo(target.x, target.y);
        return;
      }

      if (!target.tension) {
        ctx.lineTo(target.x, target.y);
        return;
      }

      ctx.bezierCurveTo(flip ? previous.controlPointPreviousX : previous.controlPointNextX, flip ? previous.controlPointPreviousY : previous.controlPointNextY, flip ? target.controlPointNextX : target.controlPointPreviousX, flip ? target.controlPointNextY : target.controlPointPreviousY, target.x, target.y);
    }
  };
  var helpers_canvas = exports$1; // DEPRECATIONS

  /**
   * Provided for backward compatibility, use Chart.helpers.canvas.clear instead.
   * @namespace Chart.helpers.clear
   * @deprecated since version 2.7.0
   * @todo remove at version 3
   * @private
   */

  helpers_core.clear = exports$1.clear;
  /**
   * Provided for backward compatibility, use Chart.helpers.canvas.roundedRect instead.
   * @namespace Chart.helpers.drawRoundedRectangle
   * @deprecated since version 2.7.0
   * @todo remove at version 3
   * @private
   */

  helpers_core.drawRoundedRectangle = function (ctx) {
    ctx.beginPath();
    exports$1.roundedRect.apply(exports$1, arguments);
  };

  var defaults = {
    /**
     * @private
     */
    _set: function _set(scope, values) {
      return helpers_core.merge(this[scope] || (this[scope] = {}), values);
    }
  }; // TODO(v3): remove 'global' from namespace.  all default are global and
  // there's inconsistency around which options are under 'global'

  defaults._set('global', {
    defaultColor: 'rgba(0,0,0,0.1)',
    defaultFontColor: '#666',
    defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    defaultFontSize: 12,
    defaultFontStyle: 'normal',
    defaultLineHeight: 1.2,
    showLines: true
  });

  var core_defaults = defaults;
  var valueOrDefault = helpers_core.valueOrDefault;
  /**
   * Converts the given font object into a CSS font string.
   * @param {object} font - A font object.
   * @return {string} The CSS font string. See https://developer.mozilla.org/en-US/docs/Web/CSS/font
   * @private
   */

  function toFontString(font) {
    if (!font || helpers_core.isNullOrUndef(font.size) || helpers_core.isNullOrUndef(font.family)) {
      return null;
    }

    return (font.style ? font.style + ' ' : '') + (font.weight ? font.weight + ' ' : '') + font.size + 'px ' + font.family;
  }
  /**
   * @alias Chart.helpers.options
   * @namespace
   */


  var helpers_options = {
    /**
     * Converts the given line height `value` in pixels for a specific font `size`.
     * @param {number|string} value - The lineHeight to parse (eg. 1.6, '14px', '75%', '1.6em').
     * @param {number} size - The font size (in pixels) used to resolve relative `value`.
     * @returns {number} The effective line height in pixels (size * 1.2 if value is invalid).
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
     * @since 2.7.0
     */
    toLineHeight: function toLineHeight(value, size) {
      var matches = ('' + value).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);

      if (!matches || matches[1] === 'normal') {
        return size * 1.2;
      }

      value = +matches[2];

      switch (matches[3]) {
        case 'px':
          return value;

        case '%':
          value /= 100;
          break;
      }

      return size * value;
    },

    /**
     * Converts the given value into a padding object with pre-computed width/height.
     * @param {number|object} value - If a number, set the value to all TRBL component,
     *  else, if and object, use defined properties and sets undefined ones to 0.
     * @returns {object} The padding values (top, right, bottom, left, width, height)
     * @since 2.7.0
     */
    toPadding: function toPadding(value) {
      var t, r, b, l;

      if (helpers_core.isObject(value)) {
        t = +value.top || 0;
        r = +value.right || 0;
        b = +value.bottom || 0;
        l = +value.left || 0;
      } else {
        t = r = b = l = +value || 0;
      }

      return {
        top: t,
        right: r,
        bottom: b,
        left: l,
        height: t + b,
        width: l + r
      };
    },

    /**
     * Parses font options and returns the font object.
     * @param {object} options - A object that contains font options to be parsed.
     * @return {object} The font object.
     * @todo Support font.* options and renamed to toFont().
     * @private
     */
    _parseFont: function _parseFont(options) {
      var globalDefaults = core_defaults.global;
      var size = valueOrDefault(options.fontSize, globalDefaults.defaultFontSize);
      var font = {
        family: valueOrDefault(options.fontFamily, globalDefaults.defaultFontFamily),
        lineHeight: helpers_core.options.toLineHeight(valueOrDefault(options.lineHeight, globalDefaults.defaultLineHeight), size),
        size: size,
        style: valueOrDefault(options.fontStyle, globalDefaults.defaultFontStyle),
        weight: null,
        string: ''
      };
      font.string = toFontString(font);
      return font;
    },

    /**
     * Evaluates the given `inputs` sequentially and returns the first defined value.
     * @param {Array} inputs - An array of values, falling back to the last value.
     * @param {object} [context] - If defined and the current value is a function, the value
     * is called with `context` as first argument and the result becomes the new input.
     * @param {number} [index] - If defined and the current value is an array, the value
     * at `index` become the new input.
     * @param {object} [info] - object to return information about resolution in
     * @param {boolean} [info.cacheable] - Will be set to `false` if option is not cacheable.
     * @since 2.7.0
     */
    resolve: function resolve(inputs, context, index, info) {
      var cacheable = true;
      var i, ilen, value;

      for (i = 0, ilen = inputs.length; i < ilen; ++i) {
        value = inputs[i];

        if (value === undefined) {
          continue;
        }

        if (context !== undefined && typeof value === 'function') {
          value = value(context);
          cacheable = false;
        }

        if (index !== undefined && helpers_core.isArray(value)) {
          value = value[index];
          cacheable = false;
        }

        if (value !== undefined) {
          if (info && !cacheable) {
            info.cacheable = false;
          }

          return value;
        }
      }
    }
  };
  /**
   * @alias Chart.helpers.math
   * @namespace
   */

  var exports$2 = {
    /**
     * Returns an array of factors sorted from 1 to sqrt(value)
     * @private
     */
    _factorize: function _factorize(value) {
      var result = [];
      var sqrt = Math.sqrt(value);
      var i;

      for (i = 1; i < sqrt; i++) {
        if (value % i === 0) {
          result.push(i);
          result.push(value / i);
        }
      }

      if (sqrt === (sqrt | 0)) {
        // if value is a square number
        result.push(sqrt);
      }

      result.sort(function (a, b) {
        return a - b;
      }).pop();
      return result;
    },
    log10: Math.log10 || function (x) {
      var exponent = Math.log(x) * Math.LOG10E; // Math.LOG10E = 1 / Math.LN10.
      // Check for whole powers of 10,
      // which due to floating point rounding error should be corrected.

      var powerOf10 = Math.round(exponent);
      var isPowerOf10 = x === Math.pow(10, powerOf10);
      return isPowerOf10 ? powerOf10 : exponent;
    }
  };
  var helpers_math = exports$2; // DEPRECATIONS

  /**
   * Provided for backward compatibility, use Chart.helpers.math.log10 instead.
   * @namespace Chart.helpers.log10
   * @deprecated since version 2.9.0
   * @todo remove at version 3
   * @private
   */

  helpers_core.log10 = exports$2.log10;

  var getRtlAdapter = function getRtlAdapter(rectX, width) {
    return {
      x: function x(_x2) {
        return rectX + rectX + width - _x2;
      },
      setWidth: function setWidth(w) {
        width = w;
      },
      textAlign: function textAlign(align) {
        if (align === 'center') {
          return align;
        }

        return align === 'right' ? 'left' : 'right';
      },
      xPlus: function xPlus(x, value) {
        return x - value;
      },
      leftForLtr: function leftForLtr(x, itemWidth) {
        return x - itemWidth;
      }
    };
  };

  var getLtrAdapter = function getLtrAdapter() {
    return {
      x: function x(_x3) {
        return _x3;
      },
      setWidth: function setWidth(w) {// eslint-disable-line no-unused-vars
      },
      textAlign: function textAlign(align) {
        return align;
      },
      xPlus: function xPlus(x, value) {
        return x + value;
      },
      leftForLtr: function leftForLtr(x, _itemWidth) {
        // eslint-disable-line no-unused-vars
        return x;
      }
    };
  };

  var getAdapter = function getAdapter(rtl, rectX, width) {
    return rtl ? getRtlAdapter(rectX, width) : getLtrAdapter();
  };

  var overrideTextDirection = function overrideTextDirection(ctx, direction) {
    var style, original;

    if (direction === 'ltr' || direction === 'rtl') {
      style = ctx.canvas.style;
      original = [style.getPropertyValue('direction'), style.getPropertyPriority('direction')];
      style.setProperty('direction', direction, 'important');
      ctx.prevTextDirection = original;
    }
  };

  var restoreTextDirection = function restoreTextDirection(ctx) {
    var original = ctx.prevTextDirection;

    if (original !== undefined) {
      delete ctx.prevTextDirection;
      ctx.canvas.style.setProperty('direction', original[0], original[1]);
    }
  };

  var helpers_rtl = {
    getRtlAdapter: getAdapter,
    overrideTextDirection: overrideTextDirection,
    restoreTextDirection: restoreTextDirection
  };
  var helpers$1 = helpers_core;
  var easing = helpers_easing;
  var canvas = helpers_canvas;
  var options = helpers_options;
  var math = helpers_math;
  var rtl = helpers_rtl;
  helpers$1.easing = easing;
  helpers$1.canvas = canvas;
  helpers$1.options = options;
  helpers$1.math = math;
  helpers$1.rtl = rtl;

  function interpolate(start, view, model, ease) {
    var keys = Object.keys(model);
    var i, ilen, key, actual, origin, target, type, c0, c1;

    for (i = 0, ilen = keys.length; i < ilen; ++i) {
      key = keys[i];
      target = model[key]; // if a value is added to the model after pivot() has been called, the view
      // doesn't contain it, so let's initialize the view to the target value.

      if (!view.hasOwnProperty(key)) {
        view[key] = target;
      }

      actual = view[key];

      if (actual === target || key[0] === '_') {
        continue;
      }

      if (!start.hasOwnProperty(key)) {
        start[key] = actual;
      }

      origin = start[key];
      type = typeof target;

      if (type === typeof origin) {
        if (type === 'string') {
          c0 = chartjsColor(origin);

          if (c0.valid) {
            c1 = chartjsColor(target);

            if (c1.valid) {
              view[key] = c1.mix(c0, ease).rgbString();
              continue;
            }
          }
        } else if (helpers$1.isFinite(origin) && helpers$1.isFinite(target)) {
          view[key] = origin + (target - origin) * ease;
          continue;
        }
      }

      view[key] = target;
    }
  }

  var Element = function Element(configuration) {
    helpers$1.extend(this, configuration);
    this.initialize.apply(this, arguments);
  };

  helpers$1.extend(Element.prototype, {
    _type: undefined,
    initialize: function initialize() {
      this.hidden = false;
    },
    pivot: function pivot() {
      var me = this;

      if (!me._view) {
        me._view = helpers$1.extend({}, me._model);
      }

      me._start = {};
      return me;
    },
    transition: function transition(ease) {
      var me = this;
      var model = me._model;
      var start = me._start;
      var view = me._view; // No animation -> No Transition

      if (!model || ease === 1) {
        me._view = helpers$1.extend({}, model);
        me._start = null;
        return me;
      }

      if (!view) {
        view = me._view = {};
      }

      if (!start) {
        start = me._start = {};
      }

      interpolate(start, view, model, ease);
      return me;
    },
    tooltipPosition: function tooltipPosition() {
      return {
        x: this._model.x,
        y: this._model.y
      };
    },
    hasValue: function hasValue() {
      return helpers$1.isNumber(this._model.x) && helpers$1.isNumber(this._model.y);
    }
  });
  Element.extend = helpers$1.inherits;
  var core_element = Element;
  var exports$3 = core_element.extend({
    chart: null,
    // the animation associated chart instance
    currentStep: 0,
    // the current animation step
    numSteps: 60,
    // default number of steps
    easing: '',
    // the easing to use for this animation
    render: null,
    // render function used by the animation service
    onAnimationProgress: null,
    // user specified callback to fire on each step of the animation
    onAnimationComplete: null // user specified callback to fire when the animation finishes

  });
  var core_animation = exports$3; // DEPRECATIONS

  /**
   * Provided for backward compatibility, use Chart.Animation instead
   * @prop Chart.Animation#animationObject
   * @deprecated since version 2.6.0
   * @todo remove at version 3
   */

  Object.defineProperty(exports$3.prototype, 'animationObject', {
    get: function get() {
      return this;
    }
  });
  /**
   * Provided for backward compatibility, use Chart.Animation#chart instead
   * @prop Chart.Animation#chartInstance
   * @deprecated since version 2.6.0
   * @todo remove at version 3
   */

  Object.defineProperty(exports$3.prototype, 'chartInstance', {
    get: function get() {
      return this.chart;
    },
    set: function set(value) {
      this.chart = value;
    }
  });

  core_defaults._set('global', {
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
      onProgress: helpers$1.noop,
      onComplete: helpers$1.noop
    }
  });

  var core_animations = {
    animations: [],
    request: null,

    /**
     * @param {Chart} chart - The chart to animate.
     * @param {Chart.Animation} animation - The animation that we will animate.
     * @param {number} duration - The animation duration in ms.
     * @param {boolean} lazy - if true, the chart is not marked as animating to enable more responsive interactions
     */
    addAnimation: function addAnimation(chart, animation, duration, lazy) {
      var animations = this.animations;
      var i, ilen;
      animation.chart = chart;
      animation.startTime = Date.now();
      animation.duration = duration;

      if (!lazy) {
        chart.animating = true;
      }

      for (i = 0, ilen = animations.length; i < ilen; ++i) {
        if (animations[i].chart === chart) {
          animations[i] = animation;
          return;
        }
      }

      animations.push(animation); // If there are no animations queued, manually kickstart a digest, for lack of a better word

      if (animations.length === 1) {
        this.requestAnimationFrame();
      }
    },
    cancelAnimation: function cancelAnimation(chart) {
      var index = helpers$1.findIndex(this.animations, function (animation) {
        return animation.chart === chart;
      });

      if (index !== -1) {
        this.animations.splice(index, 1);
        chart.animating = false;
      }
    },
    requestAnimationFrame: function requestAnimationFrame() {
      var me = this;

      if (me.request === null) {
        // Skip animation frame requests until the active one is executed.
        // This can happen when processing mouse events, e.g. 'mousemove'
        // and 'mouseout' events will trigger multiple renders.
        me.request = helpers$1.requestAnimFrame.call(window, function () {
          me.request = null;
          me.startDigest();
        });
      }
    },

    /**
     * @private
     */
    startDigest: function startDigest() {
      var me = this;
      me.advance(); // Do we have more stuff to animate?

      if (me.animations.length > 0) {
        me.requestAnimationFrame();
      }
    },

    /**
     * @private
     */
    advance: function advance() {
      var animations = this.animations;
      var animation, chart, numSteps, nextStep;
      var i = 0; // 1 animation per chart, so we are looping charts here

      while (i < animations.length) {
        animation = animations[i];
        chart = animation.chart;
        numSteps = animation.numSteps; // Make sure that currentStep starts at 1
        // https://github.com/chartjs/Chart.js/issues/6104

        nextStep = Math.floor((Date.now() - animation.startTime) / animation.duration * numSteps) + 1;
        animation.currentStep = Math.min(nextStep, numSteps);
        helpers$1.callback(animation.render, [chart, animation], chart);
        helpers$1.callback(animation.onAnimationProgress, [animation], chart);

        if (animation.currentStep >= numSteps) {
          helpers$1.callback(animation.onAnimationComplete, [animation], chart);
          chart.animating = false;
          animations.splice(i, 1);
        } else {
          ++i;
        }
      }
    }
  };
  var resolve = helpers$1.options.resolve;
  var arrayEvents = ['push', 'pop', 'shift', 'splice', 'unshift'];
  /**
   * Hooks the array methods that add or remove values ('push', pop', 'shift', 'splice',
   * 'unshift') and notify the listener AFTER the array has been altered. Listeners are
   * called on the 'onData*' callbacks (e.g. onDataPush, etc.) with same arguments.
   */

  function listenArrayEvents(array, listener) {
    if (array._chartjs) {
      array._chartjs.listeners.push(listener);

      return;
    }

    Object.defineProperty(array, '_chartjs', {
      configurable: true,
      enumerable: false,
      value: {
        listeners: [listener]
      }
    });
    arrayEvents.forEach(function (key) {
      var method = 'onData' + key.charAt(0).toUpperCase() + key.slice(1);
      var base = array[key];
      Object.defineProperty(array, key, {
        configurable: true,
        enumerable: false,
        value: function value() {
          var args = Array.prototype.slice.call(arguments);
          var res = base.apply(this, args);
          helpers$1.each(array._chartjs.listeners, function (object) {
            if (typeof object[method] === 'function') {
              object[method].apply(object, args);
            }
          });
          return res;
        }
      });
    });
  }
  /**
   * Removes the given array event listener and cleanup extra attached properties (such as
   * the _chartjs stub and overridden methods) if array doesn't have any more listeners.
   */


  function unlistenArrayEvents(array, listener) {
    var stub = array._chartjs;

    if (!stub) {
      return;
    }

    var listeners = stub.listeners;
    var index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    if (listeners.length > 0) {
      return;
    }

    arrayEvents.forEach(function (key) {
      delete array[key];
    });
    delete array._chartjs;
  } // Base class for all dataset controllers (line, bar, etc)


  var DatasetController = function DatasetController(chart, datasetIndex) {
    this.initialize(chart, datasetIndex);
  };

  helpers$1.extend(DatasetController.prototype, {
    /**
     * Element type used to generate a meta dataset (e.g. Chart.element.Line).
     * @type {Chart.core.element}
     */
    datasetElementType: null,

    /**
     * Element type used to generate a meta data (e.g. Chart.element.Point).
     * @type {Chart.core.element}
     */
    dataElementType: null,

    /**
     * Dataset element option keys to be resolved in _resolveDatasetElementOptions.
     * A derived controller may override this to resolve controller-specific options.
     * The keys defined here are for backward compatibility for legend styles.
     * @private
     */
    _datasetElementOptions: ['backgroundColor', 'borderCapStyle', 'borderColor', 'borderDash', 'borderDashOffset', 'borderJoinStyle', 'borderWidth'],

    /**
     * Data element option keys to be resolved in _resolveDataElementOptions.
     * A derived controller may override this to resolve controller-specific options.
     * The keys defined here are for backward compatibility for legend styles.
     * @private
     */
    _dataElementOptions: ['backgroundColor', 'borderColor', 'borderWidth', 'pointStyle'],
    initialize: function initialize(chart, datasetIndex) {
      var me = this;
      me.chart = chart;
      me.index = datasetIndex;
      me.linkScales();
      me.addElements();
      me._type = me.getMeta().type;
    },
    updateIndex: function updateIndex(datasetIndex) {
      this.index = datasetIndex;
    },
    linkScales: function linkScales() {
      var me = this;
      var meta = me.getMeta();
      var chart = me.chart;
      var scales = chart.scales;
      var dataset = me.getDataset();
      var scalesOpts = chart.options.scales;

      if (meta.xAxisID === null || !(meta.xAxisID in scales) || dataset.xAxisID) {
        meta.xAxisID = dataset.xAxisID || scalesOpts.xAxes[0].id;
      }

      if (meta.yAxisID === null || !(meta.yAxisID in scales) || dataset.yAxisID) {
        meta.yAxisID = dataset.yAxisID || scalesOpts.yAxes[0].id;
      }
    },
    getDataset: function getDataset() {
      return this.chart.data.datasets[this.index];
    },
    getMeta: function getMeta() {
      return this.chart.getDatasetMeta(this.index);
    },
    getScaleForId: function getScaleForId(scaleID) {
      return this.chart.scales[scaleID];
    },

    /**
     * @private
     */
    _getValueScaleId: function _getValueScaleId() {
      return this.getMeta().yAxisID;
    },

    /**
     * @private
     */
    _getIndexScaleId: function _getIndexScaleId() {
      return this.getMeta().xAxisID;
    },

    /**
     * @private
     */
    _getValueScale: function _getValueScale() {
      return this.getScaleForId(this._getValueScaleId());
    },

    /**
     * @private
     */
    _getIndexScale: function _getIndexScale() {
      return this.getScaleForId(this._getIndexScaleId());
    },
    reset: function reset() {
      this._update(true);
    },

    /**
     * @private
     */
    destroy: function destroy() {
      if (this._data) {
        unlistenArrayEvents(this._data, this);
      }
    },
    createMetaDataset: function createMetaDataset() {
      var me = this;
      var type = me.datasetElementType;
      return type && new type({
        _chart: me.chart,
        _datasetIndex: me.index
      });
    },
    createMetaData: function createMetaData(index) {
      var me = this;
      var type = me.dataElementType;
      return type && new type({
        _chart: me.chart,
        _datasetIndex: me.index,
        _index: index
      });
    },
    addElements: function addElements() {
      var me = this;
      var meta = me.getMeta();
      var data = me.getDataset().data || [];
      var metaData = meta.data;
      var i, ilen;

      for (i = 0, ilen = data.length; i < ilen; ++i) {
        metaData[i] = metaData[i] || me.createMetaData(i);
      }

      meta.dataset = meta.dataset || me.createMetaDataset();
    },
    addElementAndReset: function addElementAndReset(index) {
      var element = this.createMetaData(index);
      this.getMeta().data.splice(index, 0, element);
      this.updateElement(element, index, true);
    },
    buildOrUpdateElements: function buildOrUpdateElements() {
      var me = this;
      var dataset = me.getDataset();
      var data = dataset.data || (dataset.data = []); // In order to correctly handle data addition/deletion animation (an thus simulate
      // real-time charts), we need to monitor these data modifications and synchronize
      // the internal meta data accordingly.

      if (me._data !== data) {
        if (me._data) {
          // This case happens when the user replaced the data array instance.
          unlistenArrayEvents(me._data, me);
        }

        if (data && Object.isExtensible(data)) {
          listenArrayEvents(data, me);
        }

        me._data = data;
      } // Re-sync meta data in case the user replaced the data array or if we missed
      // any updates and so make sure that we handle number of datapoints changing.


      me.resyncElements();
    },

    /**
     * Returns the merged user-supplied and default dataset-level options
     * @private
     */
    _configure: function _configure() {
      var me = this;
      me._config = helpers$1.merge(Object.create(null), [me.chart.options.datasets[me._type], me.getDataset()], {
        merger: function merger(key, target, source) {
          if (key !== '_meta' && key !== 'data') {
            helpers$1._merger(key, target, source);
          }
        }
      });
    },
    _update: function _update(reset) {
      var me = this;

      me._configure();

      me._cachedDataOpts = null;
      me.update(reset);
    },
    update: helpers$1.noop,
    transition: function transition(easingValue) {
      var meta = this.getMeta();
      var elements = meta.data || [];
      var ilen = elements.length;
      var i = 0;

      for (; i < ilen; ++i) {
        elements[i].transition(easingValue);
      }

      if (meta.dataset) {
        meta.dataset.transition(easingValue);
      }
    },
    draw: function draw() {
      var meta = this.getMeta();
      var elements = meta.data || [];
      var ilen = elements.length;
      var i = 0;

      if (meta.dataset) {
        meta.dataset.draw();
      }

      for (; i < ilen; ++i) {
        elements[i].draw();
      }
    },

    /**
     * Returns a set of predefined style properties that should be used to represent the dataset
     * or the data if the index is specified
     * @param {number} index - data index
     * @return {IStyleInterface} style object
     */
    getStyle: function getStyle(index) {
      var me = this;
      var meta = me.getMeta();
      var dataset = meta.dataset;
      var style;

      me._configure();

      if (dataset && index === undefined) {
        style = me._resolveDatasetElementOptions(dataset || {});
      } else {
        index = index || 0;
        style = me._resolveDataElementOptions(meta.data[index] || {}, index);
      }

      if (style.fill === false || style.fill === null) {
        style.backgroundColor = style.borderColor;
      }

      return style;
    },

    /**
     * @private
     */
    _resolveDatasetElementOptions: function _resolveDatasetElementOptions(element, hover) {
      var me = this;
      var chart = me.chart;
      var datasetOpts = me._config;
      var custom = element.custom || {};
      var options = chart.options.elements[me.datasetElementType.prototype._type] || {};
      var elementOptions = me._datasetElementOptions;
      var values = {};
      var i, ilen, key, readKey; // Scriptable options

      var context = {
        chart: chart,
        dataset: me.getDataset(),
        datasetIndex: me.index,
        hover: hover
      };

      for (i = 0, ilen = elementOptions.length; i < ilen; ++i) {
        key = elementOptions[i];
        readKey = hover ? 'hover' + key.charAt(0).toUpperCase() + key.slice(1) : key;
        values[key] = resolve([custom[readKey], datasetOpts[readKey], options[readKey]], context);
      }

      return values;
    },

    /**
     * @private
     */
    _resolveDataElementOptions: function _resolveDataElementOptions(element, index) {
      var me = this;
      var custom = element && element.custom;
      var cached = me._cachedDataOpts;

      if (cached && !custom) {
        return cached;
      }

      var chart = me.chart;
      var datasetOpts = me._config;
      var options = chart.options.elements[me.dataElementType.prototype._type] || {};
      var elementOptions = me._dataElementOptions;
      var values = {}; // Scriptable options

      var context = {
        chart: chart,
        dataIndex: index,
        dataset: me.getDataset(),
        datasetIndex: me.index
      }; // `resolve` sets cacheable to `false` if any option is indexed or scripted

      var info = {
        cacheable: !custom
      };
      var keys, i, ilen, key;
      custom = custom || {};

      if (helpers$1.isArray(elementOptions)) {
        for (i = 0, ilen = elementOptions.length; i < ilen; ++i) {
          key = elementOptions[i];
          values[key] = resolve([custom[key], datasetOpts[key], options[key]], context, index, info);
        }
      } else {
        keys = Object.keys(elementOptions);

        for (i = 0, ilen = keys.length; i < ilen; ++i) {
          key = keys[i];
          values[key] = resolve([custom[key], datasetOpts[elementOptions[key]], datasetOpts[key], options[key]], context, index, info);
        }
      }

      if (info.cacheable) {
        me._cachedDataOpts = Object.freeze(values);
      }

      return values;
    },
    removeHoverStyle: function removeHoverStyle(element) {
      helpers$1.merge(element._model, element.$previousStyle || {});
      delete element.$previousStyle;
    },
    setHoverStyle: function setHoverStyle(element) {
      var dataset = this.chart.data.datasets[element._datasetIndex];
      var index = element._index;
      var custom = element.custom || {};
      var model = element._model;
      var getHoverColor = helpers$1.getHoverColor;
      element.$previousStyle = {
        backgroundColor: model.backgroundColor,
        borderColor: model.borderColor,
        borderWidth: model.borderWidth
      };
      model.backgroundColor = resolve([custom.hoverBackgroundColor, dataset.hoverBackgroundColor, getHoverColor(model.backgroundColor)], undefined, index);
      model.borderColor = resolve([custom.hoverBorderColor, dataset.hoverBorderColor, getHoverColor(model.borderColor)], undefined, index);
      model.borderWidth = resolve([custom.hoverBorderWidth, dataset.hoverBorderWidth, model.borderWidth], undefined, index);
    },

    /**
     * @private
     */
    _removeDatasetHoverStyle: function _removeDatasetHoverStyle() {
      var element = this.getMeta().dataset;

      if (element) {
        this.removeHoverStyle(element);
      }
    },

    /**
     * @private
     */
    _setDatasetHoverStyle: function _setDatasetHoverStyle() {
      var element = this.getMeta().dataset;
      var prev = {};
      var i, ilen, key, keys, hoverOptions, model;

      if (!element) {
        return;
      }

      model = element._model;
      hoverOptions = this._resolveDatasetElementOptions(element, true);
      keys = Object.keys(hoverOptions);

      for (i = 0, ilen = keys.length; i < ilen; ++i) {
        key = keys[i];
        prev[key] = model[key];
        model[key] = hoverOptions[key];
      }

      element.$previousStyle = prev;
    },

    /**
     * @private
     */
    resyncElements: function resyncElements() {
      var me = this;
      var meta = me.getMeta();
      var data = me.getDataset().data;
      var numMeta = meta.data.length;
      var numData = data.length;

      if (numData < numMeta) {
        meta.data.splice(numData, numMeta - numData);
      } else if (numData > numMeta) {
        me.insertElements(numMeta, numData - numMeta);
      }
    },

    /**
     * @private
     */
    insertElements: function insertElements(start, count) {
      for (var i = 0; i < count; ++i) {
        this.addElementAndReset(start + i);
      }
    },

    /**
     * @private
     */
    onDataPush: function onDataPush() {
      var count = arguments.length;
      this.insertElements(this.getDataset().data.length - count, count);
    },

    /**
     * @private
     */
    onDataPop: function onDataPop() {
      this.getMeta().data.pop();
    },

    /**
     * @private
     */
    onDataShift: function onDataShift() {
      this.getMeta().data.shift();
    },

    /**
     * @private
     */
    onDataSplice: function onDataSplice(start, count) {
      this.getMeta().data.splice(start, count);
      this.insertElements(start, arguments.length - 2);
    },

    /**
     * @private
     */
    onDataUnshift: function onDataUnshift() {
      this.insertElements(0, arguments.length);
    }
  });
  DatasetController.extend = helpers$1.inherits;
  var core_datasetController = DatasetController;
  var TAU = Math.PI * 2;

  core_defaults._set('global', {
    elements: {
      arc: {
        backgroundColor: core_defaults.global.defaultColor,
        borderColor: '#fff',
        borderWidth: 2,
        borderAlign: 'center'
      }
    }
  });

  function clipArc(ctx, arc) {
    var startAngle = arc.startAngle;
    var endAngle = arc.endAngle;
    var pixelMargin = arc.pixelMargin;
    var angleMargin = pixelMargin / arc.outerRadius;
    var x = arc.x;
    var y = arc.y; // Draw an inner border by cliping the arc and drawing a double-width border
    // Enlarge the clipping arc by 0.33 pixels to eliminate glitches between borders

    ctx.beginPath();
    ctx.arc(x, y, arc.outerRadius, startAngle - angleMargin, endAngle + angleMargin);

    if (arc.innerRadius > pixelMargin) {
      angleMargin = pixelMargin / arc.innerRadius;
      ctx.arc(x, y, arc.innerRadius - pixelMargin, endAngle + angleMargin, startAngle - angleMargin, true);
    } else {
      ctx.arc(x, y, pixelMargin, endAngle + Math.PI / 2, startAngle - Math.PI / 2);
    }

    ctx.closePath();
    ctx.clip();
  }

  function drawFullCircleBorders(ctx, vm, arc, inner) {
    var endAngle = arc.endAngle;
    var i;

    if (inner) {
      arc.endAngle = arc.startAngle + TAU;
      clipArc(ctx, arc);
      arc.endAngle = endAngle;

      if (arc.endAngle === arc.startAngle && arc.fullCircles) {
        arc.endAngle += TAU;
        arc.fullCircles--;
      }
    }

    ctx.beginPath();
    ctx.arc(arc.x, arc.y, arc.innerRadius, arc.startAngle + TAU, arc.startAngle, true);

    for (i = 0; i < arc.fullCircles; ++i) {
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(arc.x, arc.y, vm.outerRadius, arc.startAngle, arc.startAngle + TAU);

    for (i = 0; i < arc.fullCircles; ++i) {
      ctx.stroke();
    }
  }

  function drawBorder(ctx, vm, arc) {
    var inner = vm.borderAlign === 'inner';

    if (inner) {
      ctx.lineWidth = vm.borderWidth * 2;
      ctx.lineJoin = 'round';
    } else {
      ctx.lineWidth = vm.borderWidth;
      ctx.lineJoin = 'bevel';
    }

    if (arc.fullCircles) {
      drawFullCircleBorders(ctx, vm, arc, inner);
    }

    if (inner) {
      clipArc(ctx, arc);
    }

    ctx.beginPath();
    ctx.arc(arc.x, arc.y, vm.outerRadius, arc.startAngle, arc.endAngle);
    ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
    ctx.closePath();
    ctx.stroke();
  }

  var element_arc = core_element.extend({
    _type: 'arc',
    inLabelRange: function inLabelRange(mouseX) {
      var vm = this._view;

      if (vm) {
        return Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2);
      }

      return false;
    },
    inRange: function inRange(chartX, chartY) {
      var vm = this._view;

      if (vm) {
        var pointRelativePosition = helpers$1.getAngleFromPoint(vm, {
          x: chartX,
          y: chartY
        });
        var angle = pointRelativePosition.angle;
        var distance = pointRelativePosition.distance; // Sanitise angle range

        var startAngle = vm.startAngle;
        var endAngle = vm.endAngle;

        while (endAngle < startAngle) {
          endAngle += TAU;
        }

        while (angle > endAngle) {
          angle -= TAU;
        }

        while (angle < startAngle) {
          angle += TAU;
        } // Check if within the range of the open/close angle


        var betweenAngles = angle >= startAngle && angle <= endAngle;
        var withinRadius = distance >= vm.innerRadius && distance <= vm.outerRadius;
        return betweenAngles && withinRadius;
      }

      return false;
    },
    getCenterPoint: function getCenterPoint() {
      var vm = this._view;
      var halfAngle = (vm.startAngle + vm.endAngle) / 2;
      var halfRadius = (vm.innerRadius + vm.outerRadius) / 2;
      return {
        x: vm.x + Math.cos(halfAngle) * halfRadius,
        y: vm.y + Math.sin(halfAngle) * halfRadius
      };
    },
    getArea: function getArea() {
      var vm = this._view;
      return Math.PI * ((vm.endAngle - vm.startAngle) / (2 * Math.PI)) * (Math.pow(vm.outerRadius, 2) - Math.pow(vm.innerRadius, 2));
    },
    tooltipPosition: function tooltipPosition() {
      var vm = this._view;
      var centreAngle = vm.startAngle + (vm.endAngle - vm.startAngle) / 2;
      var rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;
      return {
        x: vm.x + Math.cos(centreAngle) * rangeFromCentre,
        y: vm.y + Math.sin(centreAngle) * rangeFromCentre
      };
    },
    draw: function draw() {
      var ctx = this._chart.ctx;
      var vm = this._view;
      var pixelMargin = vm.borderAlign === 'inner' ? 0.33 : 0;
      var arc = {
        x: vm.x,
        y: vm.y,
        innerRadius: vm.innerRadius,
        outerRadius: Math.max(vm.outerRadius - pixelMargin, 0),
        pixelMargin: pixelMargin,
        startAngle: vm.startAngle,
        endAngle: vm.endAngle,
        fullCircles: Math.floor(vm.circumference / TAU)
      };
      var i;
      ctx.save();
      ctx.fillStyle = vm.backgroundColor;
      ctx.strokeStyle = vm.borderColor;

      if (arc.fullCircles) {
        arc.endAngle = arc.startAngle + TAU;
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, arc.outerRadius, arc.startAngle, arc.endAngle);
        ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
        ctx.closePath();

        for (i = 0; i < arc.fullCircles; ++i) {
          ctx.fill();
        }

        arc.endAngle = arc.startAngle + vm.circumference % TAU;
      }

      ctx.beginPath();
      ctx.arc(arc.x, arc.y, arc.outerRadius, arc.startAngle, arc.endAngle);
      ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
      ctx.closePath();
      ctx.fill();

      if (vm.borderWidth) {
        drawBorder(ctx, vm, arc);
      }

      ctx.restore();
    }
  });
  var valueOrDefault$1 = helpers$1.valueOrDefault;
  var defaultColor = core_defaults.global.defaultColor;

  core_defaults._set('global', {
    elements: {
      line: {
        tension: 0.4,
        backgroundColor: defaultColor,
        borderWidth: 3,
        borderColor: defaultColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        capBezierPoints: true,
        fill: true // do we fill in the area between the line and its base axis

      }
    }
  });

  var element_line = core_element.extend({
    _type: 'line',
    draw: function draw() {
      var me = this;
      var vm = me._view;
      var ctx = me._chart.ctx;
      var spanGaps = vm.spanGaps;

      var points = me._children.slice(); // clone array


      var globalDefaults = core_defaults.global;
      var globalOptionLineElements = globalDefaults.elements.line;
      var lastDrawnIndex = -1;
      var closePath = me._loop;
      var index, previous, currentVM;

      if (!points.length) {
        return;
      }

      if (me._loop) {
        for (index = 0; index < points.length; ++index) {
          previous = helpers$1.previousItem(points, index); // If the line has an open path, shift the point array

          if (!points[index]._view.skip && previous._view.skip) {
            points = points.slice(index).concat(points.slice(0, index));
            closePath = spanGaps;
            break;
          }
        } // If the line has a close path, add the first point again


        if (closePath) {
          points.push(points[0]);
        }
      }

      ctx.save(); // Stroke Line Options

      ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle; // IE 9 and 10 do not support line dash

      if (ctx.setLineDash) {
        ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
      }

      ctx.lineDashOffset = valueOrDefault$1(vm.borderDashOffset, globalOptionLineElements.borderDashOffset);
      ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
      ctx.lineWidth = valueOrDefault$1(vm.borderWidth, globalOptionLineElements.borderWidth);
      ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor; // Stroke Line

      ctx.beginPath(); // First point moves to it's starting position no matter what

      currentVM = points[0]._view;

      if (!currentVM.skip) {
        ctx.moveTo(currentVM.x, currentVM.y);
        lastDrawnIndex = 0;
      }

      for (index = 1; index < points.length; ++index) {
        currentVM = points[index]._view;
        previous = lastDrawnIndex === -1 ? helpers$1.previousItem(points, index) : points[lastDrawnIndex];

        if (!currentVM.skip) {
          if (lastDrawnIndex !== index - 1 && !spanGaps || lastDrawnIndex === -1) {
            // There was a gap and this is the first point after the gap
            ctx.moveTo(currentVM.x, currentVM.y);
          } else {
            // Line to next point
            helpers$1.canvas.lineTo(ctx, previous._view, currentVM);
          }

          lastDrawnIndex = index;
        }
      }

      if (closePath) {
        ctx.closePath();
      }

      ctx.stroke();
      ctx.restore();
    }
  });
  var valueOrDefault$2 = helpers$1.valueOrDefault;
  var defaultColor$1 = core_defaults.global.defaultColor;

  core_defaults._set('global', {
    elements: {
      point: {
        radius: 3,
        pointStyle: 'circle',
        backgroundColor: defaultColor$1,
        borderColor: defaultColor$1,
        borderWidth: 1,
        // Hover
        hitRadius: 1,
        hoverRadius: 4,
        hoverBorderWidth: 1
      }
    }
  });

  function xRange(mouseX) {
    var vm = this._view;
    return vm ? Math.abs(mouseX - vm.x) < vm.radius + vm.hitRadius : false;
  }

  function yRange(mouseY) {
    var vm = this._view;
    return vm ? Math.abs(mouseY - vm.y) < vm.radius + vm.hitRadius : false;
  }

  var element_point = core_element.extend({
    _type: 'point',
    inRange: function inRange(mouseX, mouseY) {
      var vm = this._view;
      return vm ? Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2) < Math.pow(vm.hitRadius + vm.radius, 2) : false;
    },
    inLabelRange: xRange,
    inXRange: xRange,
    inYRange: yRange,
    getCenterPoint: function getCenterPoint() {
      var vm = this._view;
      return {
        x: vm.x,
        y: vm.y
      };
    },
    getArea: function getArea() {
      return Math.PI * Math.pow(this._view.radius, 2);
    },
    tooltipPosition: function tooltipPosition() {
      var vm = this._view;
      return {
        x: vm.x,
        y: vm.y,
        padding: vm.radius + vm.borderWidth
      };
    },
    draw: function draw(chartArea) {
      var vm = this._view;
      var ctx = this._chart.ctx;
      var pointStyle = vm.pointStyle;
      var rotation = vm.rotation;
      var radius = vm.radius;
      var x = vm.x;
      var y = vm.y;
      var globalDefaults = core_defaults.global;
      var defaultColor = globalDefaults.defaultColor; // eslint-disable-line no-shadow

      if (vm.skip) {
        return;
      } // Clipping for Points.


      if (chartArea === undefined || helpers$1.canvas._isPointInArea(vm, chartArea)) {
        ctx.strokeStyle = vm.borderColor || defaultColor;
        ctx.lineWidth = valueOrDefault$2(vm.borderWidth, globalDefaults.elements.point.borderWidth);
        ctx.fillStyle = vm.backgroundColor || defaultColor;
        helpers$1.canvas.drawPoint(ctx, pointStyle, radius, x, y, rotation);
      }
    }
  });
  var defaultColor$2 = core_defaults.global.defaultColor;

  core_defaults._set('global', {
    elements: {
      rectangle: {
        backgroundColor: defaultColor$2,
        borderColor: defaultColor$2,
        borderSkipped: 'bottom',
        borderWidth: 0
      }
    }
  });

  function isVertical(vm) {
    return vm && vm.width !== undefined;
  }
  /**
   * Helper function to get the bounds of the bar regardless of the orientation
   * @param bar {Chart.Element.Rectangle} the bar
   * @return {Bounds} bounds of the bar
   * @private
   */


  function getBarBounds(vm) {
    var x1, x2, y1, y2, half;

    if (isVertical(vm)) {
      half = vm.width / 2;
      x1 = vm.x - half;
      x2 = vm.x + half;
      y1 = Math.min(vm.y, vm.base);
      y2 = Math.max(vm.y, vm.base);
    } else {
      half = vm.height / 2;
      x1 = Math.min(vm.x, vm.base);
      x2 = Math.max(vm.x, vm.base);
      y1 = vm.y - half;
      y2 = vm.y + half;
    }

    return {
      left: x1,
      top: y1,
      right: x2,
      bottom: y2
    };
  }

  function swap(orig, v1, v2) {
    return orig === v1 ? v2 : orig === v2 ? v1 : orig;
  }

  function parseBorderSkipped(vm) {
    var edge = vm.borderSkipped;
    var res = {};

    if (!edge) {
      return res;
    }

    if (vm.horizontal) {
      if (vm.base > vm.x) {
        edge = swap(edge, 'left', 'right');
      }
    } else if (vm.base < vm.y) {
      edge = swap(edge, 'bottom', 'top');
    }

    res[edge] = true;
    return res;
  }

  function parseBorderWidth(vm, maxW, maxH) {
    var value = vm.borderWidth;
    var skip = parseBorderSkipped(vm);
    var t, r, b, l;

    if (helpers$1.isObject(value)) {
      t = +value.top || 0;
      r = +value.right || 0;
      b = +value.bottom || 0;
      l = +value.left || 0;
    } else {
      t = r = b = l = +value || 0;
    }

    return {
      t: skip.top || t < 0 ? 0 : t > maxH ? maxH : t,
      r: skip.right || r < 0 ? 0 : r > maxW ? maxW : r,
      b: skip.bottom || b < 0 ? 0 : b > maxH ? maxH : b,
      l: skip.left || l < 0 ? 0 : l > maxW ? maxW : l
    };
  }

  function boundingRects(vm) {
    var bounds = getBarBounds(vm);
    var width = bounds.right - bounds.left;
    var height = bounds.bottom - bounds.top;
    var border = parseBorderWidth(vm, width / 2, height / 2);
    return {
      outer: {
        x: bounds.left,
        y: bounds.top,
        w: width,
        h: height
      },
      inner: {
        x: bounds.left + border.l,
        y: bounds.top + border.t,
        w: width - border.l - border.r,
        h: height - border.t - border.b
      }
    };
  }

  function _inRange(vm, x, y) {
    var skipX = x === null;
    var skipY = y === null;
    var bounds = !vm || skipX && skipY ? false : getBarBounds(vm);
    return bounds && (skipX || x >= bounds.left && x <= bounds.right) && (skipY || y >= bounds.top && y <= bounds.bottom);
  }

  var element_rectangle = core_element.extend({
    _type: 'rectangle',
    draw: function draw() {
      var ctx = this._chart.ctx;
      var vm = this._view;
      var rects = boundingRects(vm);
      var outer = rects.outer;
      var inner = rects.inner;
      ctx.fillStyle = vm.backgroundColor;
      ctx.fillRect(outer.x, outer.y, outer.w, outer.h);

      if (outer.w === inner.w && outer.h === inner.h) {
        return;
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(outer.x, outer.y, outer.w, outer.h);
      ctx.clip();
      ctx.fillStyle = vm.borderColor;
      ctx.rect(inner.x, inner.y, inner.w, inner.h);
      ctx.fill('evenodd');
      ctx.restore();
    },
    height: function height() {
      var vm = this._view;
      return vm.base - vm.y;
    },
    inRange: function inRange(mouseX, mouseY) {
      return _inRange(this._view, mouseX, mouseY);
    },
    inLabelRange: function inLabelRange(mouseX, mouseY) {
      var vm = this._view;
      return isVertical(vm) ? _inRange(vm, mouseX, null) : _inRange(vm, null, mouseY);
    },
    inXRange: function inXRange(mouseX) {
      return _inRange(this._view, mouseX, null);
    },
    inYRange: function inYRange(mouseY) {
      return _inRange(this._view, null, mouseY);
    },
    getCenterPoint: function getCenterPoint() {
      var vm = this._view;
      var x, y;

      if (isVertical(vm)) {
        x = vm.x;
        y = (vm.y + vm.base) / 2;
      } else {
        x = (vm.x + vm.base) / 2;
        y = vm.y;
      }

      return {
        x: x,
        y: y
      };
    },
    getArea: function getArea() {
      var vm = this._view;
      return isVertical(vm) ? vm.width * Math.abs(vm.y - vm.base) : vm.height * Math.abs(vm.x - vm.base);
    },
    tooltipPosition: function tooltipPosition() {
      var vm = this._view;
      return {
        x: vm.x,
        y: vm.y
      };
    }
  });
  var elements = {};
  var Arc = element_arc;
  var Line = element_line;
  var Point = element_point;
  var Rectangle = element_rectangle;
  elements.Arc = Arc;
  elements.Line = Line;
  elements.Point = Point;
  elements.Rectangle = Rectangle;
  var deprecated = helpers$1._deprecated;
  var valueOrDefault$3 = helpers$1.valueOrDefault;

  core_defaults._set('bar', {
    hover: {
      mode: 'label'
    },
    scales: {
      xAxes: [{
        type: 'category',
        offset: true,
        gridLines: {
          offsetGridLines: true
        }
      }],
      yAxes: [{
        type: 'linear'
      }]
    }
  });

  core_defaults._set('global', {
    datasets: {
      bar: {
        categoryPercentage: 0.8,
        barPercentage: 0.9
      }
    }
  });
  /**
   * Computes the "optimal" sample size to maintain bars equally sized while preventing overlap.
   * @private
   */


  function computeMinSampleSize(scale, pixels) {
    var min = scale._length;
    var prev, curr, i, ilen;

    for (i = 1, ilen = pixels.length; i < ilen; ++i) {
      min = Math.min(min, Math.abs(pixels[i] - pixels[i - 1]));
    }

    for (i = 0, ilen = scale.getTicks().length; i < ilen; ++i) {
      curr = scale.getPixelForTick(i);
      min = i > 0 ? Math.min(min, Math.abs(curr - prev)) : min;
      prev = curr;
    }

    return min;
  }
  /**
   * Computes an "ideal" category based on the absolute bar thickness or, if undefined or null,
   * uses the smallest interval (see computeMinSampleSize) that prevents bar overlapping. This
   * mode currently always generates bars equally sized (until we introduce scriptable options?).
   * @private
   */


  function computeFitCategoryTraits(index, ruler, options) {
    var thickness = options.barThickness;
    var count = ruler.stackCount;
    var curr = ruler.pixels[index];
    var min = helpers$1.isNullOrUndef(thickness) ? computeMinSampleSize(ruler.scale, ruler.pixels) : -1;
    var size, ratio;

    if (helpers$1.isNullOrUndef(thickness)) {
      size = min * options.categoryPercentage;
      ratio = options.barPercentage;
    } else {
      // When bar thickness is enforced, category and bar percentages are ignored.
      // Note(SB): we could add support for relative bar thickness (e.g. barThickness: '50%')
      // and deprecate barPercentage since this value is ignored when thickness is absolute.
      size = thickness * count;
      ratio = 1;
    }

    return {
      chunk: size / count,
      ratio: ratio,
      start: curr - size / 2
    };
  }
  /**
   * Computes an "optimal" category that globally arranges bars side by side (no gap when
   * percentage options are 1), based on the previous and following categories. This mode
   * generates bars with different widths when data are not evenly spaced.
   * @private
   */


  function computeFlexCategoryTraits(index, ruler, options) {
    var pixels = ruler.pixels;
    var curr = pixels[index];
    var prev = index > 0 ? pixels[index - 1] : null;
    var next = index < pixels.length - 1 ? pixels[index + 1] : null;
    var percent = options.categoryPercentage;
    var start, size;

    if (prev === null) {
      // first data: its size is double based on the next point or,
      // if it's also the last data, we use the scale size.
      prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
    }

    if (next === null) {
      // last data: its size is also double based on the previous point.
      next = curr + curr - prev;
    }

    start = curr - (curr - Math.min(prev, next)) / 2 * percent;
    size = Math.abs(next - prev) / 2 * percent;
    return {
      chunk: size / ruler.stackCount,
      ratio: options.barPercentage,
      start: start
    };
  }

  var controller_bar = core_datasetController.extend({
    dataElementType: elements.Rectangle,

    /**
     * @private
     */
    _dataElementOptions: ['backgroundColor', 'borderColor', 'borderSkipped', 'borderWidth', 'barPercentage', 'barThickness', 'categoryPercentage', 'maxBarThickness', 'minBarLength'],
    initialize: function initialize() {
      var me = this;
      var meta, scaleOpts;
      core_datasetController.prototype.initialize.apply(me, arguments);
      meta = me.getMeta();
      meta.stack = me.getDataset().stack;
      meta.bar = true;
      scaleOpts = me._getIndexScale().options;
      deprecated('bar chart', scaleOpts.barPercentage, 'scales.[x/y]Axes.barPercentage', 'dataset.barPercentage');
      deprecated('bar chart', scaleOpts.barThickness, 'scales.[x/y]Axes.barThickness', 'dataset.barThickness');
      deprecated('bar chart', scaleOpts.categoryPercentage, 'scales.[x/y]Axes.categoryPercentage', 'dataset.categoryPercentage');
      deprecated('bar chart', me._getValueScale().options.minBarLength, 'scales.[x/y]Axes.minBarLength', 'dataset.minBarLength');
      deprecated('bar chart', scaleOpts.maxBarThickness, 'scales.[x/y]Axes.maxBarThickness', 'dataset.maxBarThickness');
    },
    update: function update(reset) {
      var me = this;
      var rects = me.getMeta().data;
      var i, ilen;
      me._ruler = me.getRuler();

      for (i = 0, ilen = rects.length; i < ilen; ++i) {
        me.updateElement(rects[i], i, reset);
      }
    },
    updateElement: function updateElement(rectangle, index, reset) {
      var me = this;
      var meta = me.getMeta();
      var dataset = me.getDataset();

      var options = me._resolveDataElementOptions(rectangle, index);

      rectangle._xScale = me.getScaleForId(meta.xAxisID);
      rectangle._yScale = me.getScaleForId(meta.yAxisID);
      rectangle._datasetIndex = me.index;
      rectangle._index = index;
      rectangle._model = {
        backgroundColor: options.backgroundColor,
        borderColor: options.borderColor,
        borderSkipped: options.borderSkipped,
        borderWidth: options.borderWidth,
        datasetLabel: dataset.label,
        label: me.chart.data.labels[index]
      };

      if (helpers$1.isArray(dataset.data[index])) {
        rectangle._model.borderSkipped = null;
      }

      me._updateElementGeometry(rectangle, index, reset, options);

      rectangle.pivot();
    },

    /**
     * @private
     */
    _updateElementGeometry: function _updateElementGeometry(rectangle, index, reset, options) {
      var me = this;
      var model = rectangle._model;

      var vscale = me._getValueScale();

      var base = vscale.getBasePixel();
      var horizontal = vscale.isHorizontal();
      var ruler = me._ruler || me.getRuler();
      var vpixels = me.calculateBarValuePixels(me.index, index, options);
      var ipixels = me.calculateBarIndexPixels(me.index, index, ruler, options);
      model.horizontal = horizontal;
      model.base = reset ? base : vpixels.base;
      model.x = horizontal ? reset ? base : vpixels.head : ipixels.center;
      model.y = horizontal ? ipixels.center : reset ? base : vpixels.head;
      model.height = horizontal ? ipixels.size : undefined;
      model.width = horizontal ? undefined : ipixels.size;
    },

    /**
     * Returns the stacks based on groups and bar visibility.
     * @param {number} [last] - The dataset index
     * @returns {string[]} The list of stack IDs
     * @private
     */
    _getStacks: function _getStacks(last) {
      var me = this;

      var scale = me._getIndexScale();

      var metasets = scale._getMatchingVisibleMetas(me._type);

      var stacked = scale.options.stacked;
      var ilen = metasets.length;
      var stacks = [];
      var i, meta;

      for (i = 0; i < ilen; ++i) {
        meta = metasets[i]; // stacked   | meta.stack
        //           | found | not found | undefined
        // false     |   x   |     x     |     x
        // true      |       |     x     |
        // undefined |       |     x     |     x

        if (stacked === false || stacks.indexOf(meta.stack) === -1 || stacked === undefined && meta.stack === undefined) {
          stacks.push(meta.stack);
        }

        if (meta.index === last) {
          break;
        }
      }

      return stacks;
    },

    /**
     * Returns the effective number of stacks based on groups and bar visibility.
     * @private
     */
    getStackCount: function getStackCount() {
      return this._getStacks().length;
    },

    /**
     * Returns the stack index for the given dataset based on groups and bar visibility.
     * @param {number} [datasetIndex] - The dataset index
     * @param {string} [name] - The stack name to find
     * @returns {number} The stack index
     * @private
     */
    getStackIndex: function getStackIndex(datasetIndex, name) {
      var stacks = this._getStacks(datasetIndex);

      var index = name !== undefined ? stacks.indexOf(name) : -1; // indexOf returns -1 if element is not present

      return index === -1 ? stacks.length - 1 : index;
    },

    /**
     * @private
     */
    getRuler: function getRuler() {
      var me = this;

      var scale = me._getIndexScale();

      var pixels = [];
      var i, ilen;

      for (i = 0, ilen = me.getMeta().data.length; i < ilen; ++i) {
        pixels.push(scale.getPixelForValue(null, i, me.index));
      }

      return {
        pixels: pixels,
        start: scale._startPixel,
        end: scale._endPixel,
        stackCount: me.getStackCount(),
        scale: scale
      };
    },

    /**
     * Note: pixel values are not clamped to the scale area.
     * @private
     */
    calculateBarValuePixels: function calculateBarValuePixels(datasetIndex, index, options) {
      var me = this;
      var chart = me.chart;

      var scale = me._getValueScale();

      var isHorizontal = scale.isHorizontal();
      var datasets = chart.data.datasets;

      var metasets = scale._getMatchingVisibleMetas(me._type);

      var value = scale._parseValue(datasets[datasetIndex].data[index]);

      var minBarLength = options.minBarLength;
      var stacked = scale.options.stacked;
      var stack = me.getMeta().stack;
      var start = value.start === undefined ? 0 : value.max >= 0 && value.min >= 0 ? value.min : value.max;
      var length = value.start === undefined ? value.end : value.max >= 0 && value.min >= 0 ? value.max - value.min : value.min - value.max;
      var ilen = metasets.length;
      var i, imeta, ivalue, base, head, size, stackLength;

      if (stacked || stacked === undefined && stack !== undefined) {
        for (i = 0; i < ilen; ++i) {
          imeta = metasets[i];

          if (imeta.index === datasetIndex) {
            break;
          }

          if (imeta.stack === stack) {
            stackLength = scale._parseValue(datasets[imeta.index].data[index]);
            ivalue = stackLength.start === undefined ? stackLength.end : stackLength.min >= 0 && stackLength.max >= 0 ? stackLength.max : stackLength.min;

            if (value.min < 0 && ivalue < 0 || value.max >= 0 && ivalue > 0) {
              start += ivalue;
            }
          }
        }
      }

      base = scale.getPixelForValue(start);
      head = scale.getPixelForValue(start + length);
      size = head - base;

      if (minBarLength !== undefined && Math.abs(size) < minBarLength) {
        size = minBarLength;

        if (length >= 0 && !isHorizontal || length < 0 && isHorizontal) {
          head = base - minBarLength;
        } else {
          head = base + minBarLength;
        }
      }

      return {
        size: size,
        base: base,
        head: head,
        center: head + size / 2
      };
    },

    /**
     * @private
     */
    calculateBarIndexPixels: function calculateBarIndexPixels(datasetIndex, index, ruler, options) {
      var me = this;
      var range = options.barThickness === 'flex' ? computeFlexCategoryTraits(index, ruler, options) : computeFitCategoryTraits(index, ruler, options);
      var stackIndex = me.getStackIndex(datasetIndex, me.getMeta().stack);
      var center = range.start + range.chunk * stackIndex + range.chunk / 2;
      var size = Math.min(valueOrDefault$3(options.maxBarThickness, Infinity), range.chunk * range.ratio);
      return {
        base: center - size / 2,
        head: center + size / 2,
        center: center,
        size: size
      };
    },
    draw: function draw() {
      var me = this;
      var chart = me.chart;

      var scale = me._getValueScale();

      var rects = me.getMeta().data;
      var dataset = me.getDataset();
      var ilen = rects.length;
      var i = 0;
      helpers$1.canvas.clipArea(chart.ctx, chart.chartArea);

      for (; i < ilen; ++i) {
        var val = scale._parseValue(dataset.data[i]);

        if (!isNaN(val.min) && !isNaN(val.max)) {
          rects[i].draw();
        }
      }

      helpers$1.canvas.unclipArea(chart.ctx);
    },

    /**
     * @private
     */
    _resolveDataElementOptions: function _resolveDataElementOptions() {
      var me = this;
      var values = helpers$1.extend({}, core_datasetController.prototype._resolveDataElementOptions.apply(me, arguments));

      var indexOpts = me._getIndexScale().options;

      var valueOpts = me._getValueScale().options;

      values.barPercentage = valueOrDefault$3(indexOpts.barPercentage, values.barPercentage);
      values.barThickness = valueOrDefault$3(indexOpts.barThickness, values.barThickness);
      values.categoryPercentage = valueOrDefault$3(indexOpts.categoryPercentage, values.categoryPercentage);
      values.maxBarThickness = valueOrDefault$3(indexOpts.maxBarThickness, values.maxBarThickness);
      values.minBarLength = valueOrDefault$3(valueOpts.minBarLength, values.minBarLength);
      return values;
    }
  });
  var valueOrDefault$4 = helpers$1.valueOrDefault;
  var resolve$1 = helpers$1.options.resolve;

  core_defaults._set('bubble', {
    hover: {
      mode: 'single'
    },
    scales: {
      xAxes: [{
        type: 'linear',
        // bubble should probably use a linear scale by default
        position: 'bottom',
        id: 'x-axis-0' // need an ID so datasets can reference the scale

      }],
      yAxes: [{
        type: 'linear',
        position: 'left',
        id: 'y-axis-0'
      }]
    },
    tooltips: {
      callbacks: {
        title: function title() {
          // Title doesn't make sense for scatter since we format the data as a point
          return '';
        },
        label: function label(item, data) {
          var datasetLabel = data.datasets[item.datasetIndex].label || '';
          var dataPoint = data.datasets[item.datasetIndex].data[item.index];
          return datasetLabel + ': (' + item.xLabel + ', ' + item.yLabel + ', ' + dataPoint.r + ')';
        }
      }
    }
  });

  var controller_bubble = core_datasetController.extend({
    /**
     * @protected
     */
    dataElementType: elements.Point,

    /**
     * @private
     */
    _dataElementOptions: ['backgroundColor', 'borderColor', 'borderWidth', 'hoverBackgroundColor', 'hoverBorderColor', 'hoverBorderWidth', 'hoverRadius', 'hitRadius', 'pointStyle', 'rotation'],

    /**
     * @protected
     */
    update: function update(reset) {
      var me = this;
      var meta = me.getMeta();
      var points = meta.data; // Update Points

      helpers$1.each(points, function (point, index) {
        me.updateElement(point, index, reset);
      });
    },

    /**
     * @protected
     */
    updateElement: function updateElement(point, index, reset) {
      var me = this;
      var meta = me.getMeta();
      var custom = point.custom || {};
      var xScale = me.getScaleForId(meta.xAxisID);
      var yScale = me.getScaleForId(meta.yAxisID);

      var options = me._resolveDataElementOptions(point, index);

      var data = me.getDataset().data[index];
      var dsIndex = me.index;
      var x = reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(typeof data === 'object' ? data : NaN, index, dsIndex);
      var y = reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, dsIndex);
      point._xScale = xScale;
      point._yScale = yScale;
      point._options = options;
      point._datasetIndex = dsIndex;
      point._index = index;
      point._model = {
        backgroundColor: options.backgroundColor,
        borderColor: options.borderColor,
        borderWidth: options.borderWidth,
        hitRadius: options.hitRadius,
        pointStyle: options.pointStyle,
        rotation: options.rotation,
        radius: reset ? 0 : options.radius,
        skip: custom.skip || isNaN(x) || isNaN(y),
        x: x,
        y: y
      };
      point.pivot();
    },

    /**
     * @protected
     */
    setHoverStyle: function setHoverStyle(point) {
      var model = point._model;
      var options = point._options;
      var getHoverColor = helpers$1.getHoverColor;
      point.$previousStyle = {
        backgroundColor: model.backgroundColor,
        borderColor: model.borderColor,
        borderWidth: model.borderWidth,
        radius: model.radius
      };
      model.backgroundColor = valueOrDefault$4(options.hoverBackgroundColor, getHoverColor(options.backgroundColor));
      model.borderColor = valueOrDefault$4(options.hoverBorderColor, getHoverColor(options.borderColor));
      model.borderWidth = valueOrDefault$4(options.hoverBorderWidth, options.borderWidth);
      model.radius = options.radius + options.hoverRadius;
    },

    /**
     * @private
     */
    _resolveDataElementOptions: function _resolveDataElementOptions(point, index) {
      var me = this;
      var chart = me.chart;
      var dataset = me.getDataset();
      var custom = point.custom || {};
      var data = dataset.data[index] || {};

      var values = core_datasetController.prototype._resolveDataElementOptions.apply(me, arguments); // Scriptable options


      var context = {
        chart: chart,
        dataIndex: index,
        dataset: dataset,
        datasetIndex: me.index
      }; // In case values were cached (and thus frozen), we need to clone the values

      if (me._cachedDataOpts === values) {
        values = helpers$1.extend({}, values);
      } // Custom radius resolution


      values.radius = resolve$1([custom.radius, data.r, me._config.radius, chart.options.elements.point.radius], context, index);
      return values;
    }
  });
  var valueOrDefault$5 = helpers$1.valueOrDefault;
  var PI$1 = Math.PI;
  var DOUBLE_PI$1 = PI$1 * 2;
  var HALF_PI$1 = PI$1 / 2;

  core_defaults._set('doughnut', {
    animation: {
      // Boolean - Whether we animate the rotation of the Doughnut
      animateRotate: true,
      // Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale: false
    },
    hover: {
      mode: 'single'
    },
    legendCallback: function legendCallback(chart) {
      var list = document.createElement('ul');
      var data = chart.data;
      var datasets = data.datasets;
      var labels = data.labels;
      var i, ilen, listItem, listItemSpan;
      list.setAttribute('class', chart.id + '-legend');

      if (datasets.length) {
        for (i = 0, ilen = datasets[0].data.length; i < ilen; ++i) {
          listItem = list.appendChild(document.createElement('li'));
          listItemSpan = listItem.appendChild(document.createElement('span'));
          listItemSpan.style.backgroundColor = datasets[0].backgroundColor[i];

          if (labels[i]) {
            listItem.appendChild(document.createTextNode(labels[i]));
          }
        }
      }

      return list.outerHTML;
    },
    legend: {
      labels: {
        generateLabels: function generateLabels(chart) {
          var data = chart.data;

          if (data.labels.length && data.datasets.length) {
            return data.labels.map(function (label, i) {
              var meta = chart.getDatasetMeta(0);
              var style = meta.controller.getStyle(i);
              return {
                text: label,
                fillStyle: style.backgroundColor,
                strokeStyle: style.borderColor,
                lineWidth: style.borderWidth,
                hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                // Extra data used for toggling the correct item
                index: i
              };
            });
          }

          return [];
        }
      },
      onClick: function onClick(e, legendItem) {
        var index = legendItem.index;
        var chart = this.chart;
        var i, ilen, meta;

        for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
          meta = chart.getDatasetMeta(i); // toggle visibility of index if exists

          if (meta.data[index]) {
            meta.data[index].hidden = !meta.data[index].hidden;
          }
        }

        chart.update();
      }
    },
    // The percentage of the chart that we cut out of the middle.
    cutoutPercentage: 50,
    // The rotation of the chart, where the first data arc begins.
    rotation: -HALF_PI$1,
    // The total circumference of the chart.
    circumference: DOUBLE_PI$1,
    // Need to override these to give a nice default
    tooltips: {
      callbacks: {
        title: function title() {
          return '';
        },
        label: function label(tooltipItem, data) {
          var dataLabel = data.labels[tooltipItem.index];
          var value = ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

          if (helpers$1.isArray(dataLabel)) {
            // show value on first line of multiline label
            // need to clone because we are changing the value
            dataLabel = dataLabel.slice();
            dataLabel[0] += value;
          } else {
            dataLabel += value;
          }

          return dataLabel;
        }
      }
    }
  });

  var controller_doughnut = core_datasetController.extend({
    dataElementType: elements.Arc,
    linkScales: helpers$1.noop,

    /**
     * @private
     */
    _dataElementOptions: ['backgroundColor', 'borderColor', 'borderWidth', 'borderAlign', 'hoverBackgroundColor', 'hoverBorderColor', 'hoverBorderWidth'],
    // Get index of the dataset in relation to the visible datasets. This allows determining the inner and outer radius correctly
    getRingIndex: function getRingIndex(datasetIndex) {
      var ringIndex = 0;

      for (var j = 0; j < datasetIndex; ++j) {
        if (this.chart.isDatasetVisible(j)) {
          ++ringIndex;
        }
      }

      return ringIndex;
    },
    update: function update(reset) {
      var me = this;
      var chart = me.chart;
      var chartArea = chart.chartArea;
      var opts = chart.options;
      var ratioX = 1;
      var ratioY = 1;
      var offsetX = 0;
      var offsetY = 0;
      var meta = me.getMeta();
      var arcs = meta.data;
      var cutout = opts.cutoutPercentage / 100 || 0;
      var circumference = opts.circumference;

      var chartWeight = me._getRingWeight(me.index);

      var maxWidth, maxHeight, i, ilen; // If the chart's circumference isn't a full circle, calculate size as a ratio of the width/height of the arc

      if (circumference < DOUBLE_PI$1) {
        var startAngle = opts.rotation % DOUBLE_PI$1;
        startAngle += startAngle >= PI$1 ? -DOUBLE_PI$1 : startAngle < -PI$1 ? DOUBLE_PI$1 : 0;
        var endAngle = startAngle + circumference;
        var startX = Math.cos(startAngle);
        var startY = Math.sin(startAngle);
        var endX = Math.cos(endAngle);
        var endY = Math.sin(endAngle);
        var contains0 = startAngle <= 0 && endAngle >= 0 || endAngle >= DOUBLE_PI$1;
        var contains90 = startAngle <= HALF_PI$1 && endAngle >= HALF_PI$1 || endAngle >= DOUBLE_PI$1 + HALF_PI$1;
        var contains180 = startAngle === -PI$1 || endAngle >= PI$1;
        var contains270 = startAngle <= -HALF_PI$1 && endAngle >= -HALF_PI$1 || endAngle >= PI$1 + HALF_PI$1;
        var minX = contains180 ? -1 : Math.min(startX, startX * cutout, endX, endX * cutout);
        var minY = contains270 ? -1 : Math.min(startY, startY * cutout, endY, endY * cutout);
        var maxX = contains0 ? 1 : Math.max(startX, startX * cutout, endX, endX * cutout);
        var maxY = contains90 ? 1 : Math.max(startY, startY * cutout, endY, endY * cutout);
        ratioX = (maxX - minX) / 2;
        ratioY = (maxY - minY) / 2;
        offsetX = -(maxX + minX) / 2;
        offsetY = -(maxY + minY) / 2;
      }

      for (i = 0, ilen = arcs.length; i < ilen; ++i) {
        arcs[i]._options = me._resolveDataElementOptions(arcs[i], i);
      }

      chart.borderWidth = me.getMaxBorderWidth();
      maxWidth = (chartArea.right - chartArea.left - chart.borderWidth) / ratioX;
      maxHeight = (chartArea.bottom - chartArea.top - chart.borderWidth) / ratioY;
      chart.outerRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
      chart.innerRadius = Math.max(chart.outerRadius * cutout, 0);
      chart.radiusLength = (chart.outerRadius - chart.innerRadius) / (me._getVisibleDatasetWeightTotal() || 1);
      chart.offsetX = offsetX * chart.outerRadius;
      chart.offsetY = offsetY * chart.outerRadius;
      meta.total = me.calculateTotal();
      me.outerRadius = chart.outerRadius - chart.radiusLength * me._getRingWeightOffset(me.index);
      me.innerRadius = Math.max(me.outerRadius - chart.radiusLength * chartWeight, 0);

      for (i = 0, ilen = arcs.length; i < ilen; ++i) {
        me.updateElement(arcs[i], i, reset);
      }
    },
    updateElement: function updateElement(arc, index, reset) {
      var me = this;
      var chart = me.chart;
      var chartArea = chart.chartArea;
      var opts = chart.options;
      var animationOpts = opts.animation;
      var centerX = (chartArea.left + chartArea.right) / 2;
      var centerY = (chartArea.top + chartArea.bottom) / 2;
      var startAngle = opts.rotation; // non reset case handled later

      var endAngle = opts.rotation; // non reset case handled later

      var dataset = me.getDataset();
      var circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : me.calculateCircumference(dataset.data[index]) * (opts.circumference / DOUBLE_PI$1);
      var innerRadius = reset && animationOpts.animateScale ? 0 : me.innerRadius;
      var outerRadius = reset && animationOpts.animateScale ? 0 : me.outerRadius;
      var options = arc._options || {};
      helpers$1.extend(arc, {
        // Utility
        _datasetIndex: me.index,
        _index: index,
        // Desired view properties
        _model: {
          backgroundColor: options.backgroundColor,
          borderColor: options.borderColor,
          borderWidth: options.borderWidth,
          borderAlign: options.borderAlign,
          x: centerX + chart.offsetX,
          y: centerY + chart.offsetY,
          startAngle: startAngle,
          endAngle: endAngle,
          circumference: circumference,
          outerRadius: outerRadius,
          innerRadius: innerRadius,
          label: helpers$1.valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
        }
      });
      var model = arc._model; // Set correct angles if not resetting

      if (!reset || !animationOpts.animateRotate) {
        if (index === 0) {
          model.startAngle = opts.rotation;
        } else {
          model.startAngle = me.getMeta().data[index - 1]._model.endAngle;
        }

        model.endAngle = model.startAngle + model.circumference;
      }

      arc.pivot();
    },
    calculateTotal: function calculateTotal() {
      var dataset = this.getDataset();
      var meta = this.getMeta();
      var total = 0;
      var value;
      helpers$1.each(meta.data, function (element, index) {
        value = dataset.data[index];

        if (!isNaN(value) && !element.hidden) {
          total += Math.abs(value);
        }
      });
      /* if (total === 0) {
      	total = NaN;
      }*/

      return total;
    },
    calculateCircumference: function calculateCircumference(value) {
      var total = this.getMeta().total;

      if (total > 0 && !isNaN(value)) {
        return DOUBLE_PI$1 * (Math.abs(value) / total);
      }

      return 0;
    },
    // gets the max border or hover width to properly scale pie charts
    getMaxBorderWidth: function getMaxBorderWidth(arcs) {
      var me = this;
      var max = 0;
      var chart = me.chart;
      var i, ilen, meta, arc, controller, options, borderWidth, hoverWidth;

      if (!arcs) {
        // Find the outmost visible dataset
        for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
          if (chart.isDatasetVisible(i)) {
            meta = chart.getDatasetMeta(i);
            arcs = meta.data;

            if (i !== me.index) {
              controller = meta.controller;
            }

            break;
          }
        }
      }

      if (!arcs) {
        return 0;
      }

      for (i = 0, ilen = arcs.length; i < ilen; ++i) {
        arc = arcs[i];

        if (controller) {
          controller._configure();

          options = controller._resolveDataElementOptions(arc, i);
        } else {
          options = arc._options;
        }

        if (options.borderAlign !== 'inner') {
          borderWidth = options.borderWidth;
          hoverWidth = options.hoverBorderWidth;
          max = borderWidth > max ? borderWidth : max;
          max = hoverWidth > max ? hoverWidth : max;
        }
      }

      return max;
    },

    /**
     * @protected
     */
    setHoverStyle: function setHoverStyle(arc) {
      var model = arc._model;
      var options = arc._options;
      var getHoverColor = helpers$1.getHoverColor;
      arc.$previousStyle = {
        backgroundColor: model.backgroundColor,
        borderColor: model.borderColor,
        borderWidth: model.borderWidth
      };
      model.backgroundColor = valueOrDefault$5(options.hoverBackgroundColor, getHoverColor(options.backgroundColor));
      model.borderColor = valueOrDefault$5(options.hoverBorderColor, getHoverColor(options.borderColor));
      model.borderWidth = valueOrDefault$5(options.hoverBorderWidth, options.borderWidth);
    },

    /**
     * Get radius length offset of the dataset in relation to the visible datasets weights. This allows determining the inner and outer radius correctly
     * @private
     */
    _getRingWeightOffset: function _getRingWeightOffset(datasetIndex) {
      var ringWeightOffset = 0;

      for (var i = 0; i < datasetIndex; ++i) {
        if (this.chart.isDatasetVisible(i)) {
          ringWeightOffset += this._getRingWeight(i);
        }
      }

      return ringWeightOffset;
    },

    /**
     * @private
     */
    _getRingWeight: function _getRingWeight(dataSetIndex) {
      return Math.max(valueOrDefault$5(this.chart.data.datasets[dataSetIndex].weight, 1), 0);
    },

    /**
     * Returns the sum of all visibile data set weights.  This value can be 0.
     * @private
     */
    _getVisibleDatasetWeightTotal: function _getVisibleDatasetWeightTotal() {
      return this._getRingWeightOffset(this.chart.data.datasets.length);
    }
  });

  core_defaults._set('horizontalBar', {
    hover: {
      mode: 'index',
      axis: 'y'
    },
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }],
      yAxes: [{
        type: 'category',
        position: 'left',
        offset: true,
        gridLines: {
          offsetGridLines: true
        }
      }]
    },
    elements: {
      rectangle: {
        borderSkipped: 'left'
      }
    },
    tooltips: {
      mode: 'index',
      axis: 'y'
    }
  });

  core_defaults._set('global', {
    datasets: {
      horizontalBar: {
        categoryPercentage: 0.8,
        barPercentage: 0.9
      }
    }
  });

  var controller_horizontalBar = controller_bar.extend({
    /**
     * @private
     */
    _getValueScaleId: function _getValueScaleId() {
      return this.getMeta().xAxisID;
    },

    /**
     * @private
     */
    _getIndexScaleId: function _getIndexScaleId() {
      return this.getMeta().yAxisID;
    }
  });
  var valueOrDefault$6 = helpers$1.valueOrDefault;
  var resolve$2 = helpers$1.options.resolve;
  var isPointInArea = helpers$1.canvas._isPointInArea;

  core_defaults._set('line', {
    showLines: true,
    spanGaps: false,
    hover: {
      mode: 'label'
    },
    scales: {
      xAxes: [{
        type: 'category',
        id: 'x-axis-0'
      }],
      yAxes: [{
        type: 'linear',
        id: 'y-axis-0'
      }]
    }
  });

  function scaleClip(scale, halfBorderWidth) {
    var tickOpts = scale && scale.options.ticks || {};
    var reverse = tickOpts.reverse;
    var min = tickOpts.min === undefined ? halfBorderWidth : 0;
    var max = tickOpts.max === undefined ? halfBorderWidth : 0;
    return {
      start: reverse ? max : min,
      end: reverse ? min : max
    };
  }

  function defaultClip(xScale, yScale, borderWidth) {
    var halfBorderWidth = borderWidth / 2;
    var x = scaleClip(xScale, halfBorderWidth);
    var y = scaleClip(yScale, halfBorderWidth);
    return {
      top: y.end,
      right: x.end,
      bottom: y.start,
      left: x.start
    };
  }

  function toClip(value) {
    var t, r, b, l;

    if (helpers$1.isObject(value)) {
      t = value.top;
      r = value.right;
      b = value.bottom;
      l = value.left;
    } else {
      t = r = b = l = value;
    }

    return {
      top: t,
      right: r,
      bottom: b,
      left: l
    };
  }

  var controller_line = core_datasetController.extend({
    datasetElementType: elements.Line,
    dataElementType: elements.Point,

    /**
     * @private
     */
    _datasetElementOptions: ['backgroundColor', 'borderCapStyle', 'borderColor', 'borderDash', 'borderDashOffset', 'borderJoinStyle', 'borderWidth', 'cubicInterpolationMode', 'fill'],

    /**
     * @private
     */
    _dataElementOptions: {
      backgroundColor: 'pointBackgroundColor',
      borderColor: 'pointBorderColor',
      borderWidth: 'pointBorderWidth',
      hitRadius: 'pointHitRadius',
      hoverBackgroundColor: 'pointHoverBackgroundColor',
      hoverBorderColor: 'pointHoverBorderColor',
      hoverBorderWidth: 'pointHoverBorderWidth',
      hoverRadius: 'pointHoverRadius',
      pointStyle: 'pointStyle',
      radius: 'pointRadius',
      rotation: 'pointRotation'
    },
    update: function update(reset) {
      var me = this;
      var meta = me.getMeta();
      var line = meta.dataset;
      var points = meta.data || [];
      var options = me.chart.options;
      var config = me._config;
      var showLine = me._showLine = valueOrDefault$6(config.showLine, options.showLines);
      var i, ilen;
      me._xScale = me.getScaleForId(meta.xAxisID);
      me._yScale = me.getScaleForId(meta.yAxisID); // Update Line

      if (showLine) {
        // Compatibility: If the properties are defined with only the old name, use those values
        if (config.tension !== undefined && config.lineTension === undefined) {
          config.lineTension = config.tension;
        } // Utility


        line._scale = me._yScale;
        line._datasetIndex = me.index; // Data

        line._children = points; // Model

        line._model = me._resolveDatasetElementOptions(line);
        line.pivot();
      } // Update Points


      for (i = 0, ilen = points.length; i < ilen; ++i) {
        me.updateElement(points[i], i, reset);
      }

      if (showLine && line._model.tension !== 0) {
        me.updateBezierControlPoints();
      } // Now pivot the point for animation


      for (i = 0, ilen = points.length; i < ilen; ++i) {
        points[i].pivot();
      }
    },
    updateElement: function updateElement(point, index, reset) {
      var me = this;
      var meta = me.getMeta();
      var custom = point.custom || {};
      var dataset = me.getDataset();
      var datasetIndex = me.index;
      var value = dataset.data[index];
      var xScale = me._xScale;
      var yScale = me._yScale;
      var lineModel = meta.dataset._model;
      var x, y;

      var options = me._resolveDataElementOptions(point, index);

      x = xScale.getPixelForValue(typeof value === 'object' ? value : NaN, index, datasetIndex);
      y = reset ? yScale.getBasePixel() : me.calculatePointY(value, index, datasetIndex); // Utility

      point._xScale = xScale;
      point._yScale = yScale;
      point._options = options;
      point._datasetIndex = datasetIndex;
      point._index = index; // Desired view properties

      point._model = {
        x: x,
        y: y,
        skip: custom.skip || isNaN(x) || isNaN(y),
        // Appearance
        radius: options.radius,
        pointStyle: options.pointStyle,
        rotation: options.rotation,
        backgroundColor: options.backgroundColor,
        borderColor: options.borderColor,
        borderWidth: options.borderWidth,
        tension: valueOrDefault$6(custom.tension, lineModel ? lineModel.tension : 0),
        steppedLine: lineModel ? lineModel.steppedLine : false,
        // Tooltip
        hitRadius: options.hitRadius
      };
    },

    /**
     * @private
     */
    _resolveDatasetElementOptions: function _resolveDatasetElementOptions(element) {
      var me = this;
      var config = me._config;
      var custom = element.custom || {};
      var options = me.chart.options;
      var lineOptions = options.elements.line;

      var values = core_datasetController.prototype._resolveDatasetElementOptions.apply(me, arguments); // The default behavior of lines is to break at null values, according
      // to https://github.com/chartjs/Chart.js/issues/2435#issuecomment-216718158
      // This option gives lines the ability to span gaps


      values.spanGaps = valueOrDefault$6(config.spanGaps, options.spanGaps);
      values.tension = valueOrDefault$6(config.lineTension, lineOptions.tension);
      values.steppedLine = resolve$2([custom.steppedLine, config.steppedLine, lineOptions.stepped]);
      values.clip = toClip(valueOrDefault$6(config.clip, defaultClip(me._xScale, me._yScale, values.borderWidth)));
      return values;
    },
    calculatePointY: function calculatePointY(value, index, datasetIndex) {
      var me = this;
      var chart = me.chart;
      var yScale = me._yScale;
      var sumPos = 0;
      var sumNeg = 0;
      var i, ds, dsMeta, stackedRightValue, rightValue, metasets, ilen;

      if (yScale.options.stacked) {
        rightValue = +yScale.getRightValue(value);
        metasets = chart._getSortedVisibleDatasetMetas();
        ilen = metasets.length;

        for (i = 0; i < ilen; ++i) {
          dsMeta = metasets[i];

          if (dsMeta.index === datasetIndex) {
            break;
          }

          ds = chart.data.datasets[dsMeta.index];

          if (dsMeta.type === 'line' && dsMeta.yAxisID === yScale.id) {
            stackedRightValue = +yScale.getRightValue(ds.data[index]);

            if (stackedRightValue < 0) {
              sumNeg += stackedRightValue || 0;
            } else {
              sumPos += stackedRightValue || 0;
            }
          }
        }

        if (rightValue < 0) {
          return yScale.getPixelForValue(sumNeg + rightValue);
        }

        return yScale.getPixelForValue(sumPos + rightValue);
      }

      return yScale.getPixelForValue(value);
    },
    updateBezierControlPoints: function updateBezierControlPoints() {
      var me = this;
      var chart = me.chart;
      var meta = me.getMeta();
      var lineModel = meta.dataset._model;
      var area = chart.chartArea;
      var points = meta.data || [];
      var i, ilen, model, controlPoints; // Only consider points that are drawn in case the spanGaps option is used

      if (lineModel.spanGaps) {
        points = points.filter(function (pt) {
          return !pt._model.skip;
        });
      }

      function capControlPoint(pt, min, max) {
        return Math.max(Math.min(pt, max), min);
      }

      if (lineModel.cubicInterpolationMode === 'monotone') {
        helpers$1.splineCurveMonotone(points);
      } else {
        for (i = 0, ilen = points.length; i < ilen; ++i) {
          model = points[i]._model;
          controlPoints = helpers$1.splineCurve(helpers$1.previousItem(points, i)._model, model, helpers$1.nextItem(points, i)._model, lineModel.tension);
          model.controlPointPreviousX = controlPoints.previous.x;
          model.controlPointPreviousY = controlPoints.previous.y;
          model.controlPointNextX = controlPoints.next.x;
          model.controlPointNextY = controlPoints.next.y;
        }
      }

      if (chart.options.elements.line.capBezierPoints) {
        for (i = 0, ilen = points.length; i < ilen; ++i) {
          model = points[i]._model;

          if (isPointInArea(model, area)) {
            if (i > 0 && isPointInArea(points[i - 1]._model, area)) {
              model.controlPointPreviousX = capControlPoint(model.controlPointPreviousX, area.left, area.right);
              model.controlPointPreviousY = capControlPoint(model.controlPointPreviousY, area.top, area.bottom);
            }

            if (i < points.length - 1 && isPointInArea(points[i + 1]._model, area)) {
              model.controlPointNextX = capControlPoint(model.controlPointNextX, area.left, area.right);
              model.controlPointNextY = capControlPoint(model.controlPointNextY, area.top, area.bottom);
            }
          }
        }
      }
    },
    draw: function draw() {
      var me = this;
      var chart = me.chart;
      var meta = me.getMeta();
      var points = meta.data || [];
      var area = chart.chartArea;
      var canvas = chart.canvas;
      var i = 0;
      var ilen = points.length;
      var clip;

      if (me._showLine) {
        clip = meta.dataset._model.clip;
        helpers$1.canvas.clipArea(chart.ctx, {
          left: clip.left === false ? 0 : area.left - clip.left,
          right: clip.right === false ? canvas.width : area.right + clip.right,
          top: clip.top === false ? 0 : area.top - clip.top,
          bottom: clip.bottom === false ? canvas.height : area.bottom + clip.bottom
        });
        meta.dataset.draw();
        helpers$1.canvas.unclipArea(chart.ctx);
      } // Draw the points


      for (; i < ilen; ++i) {
        points[i].draw(area);
      }
    },

    /**
     * @protected
     */
    setHoverStyle: function setHoverStyle(point) {
      var model = point._model;
      var options = point._options;
      var getHoverColor = helpers$1.getHoverColor;
      point.$previousStyle = {
        backgroundColor: model.backgroundColor,
        borderColor: model.borderColor,
        borderWidth: model.borderWidth,
        radius: model.radius
      };
      model.backgroundColor = valueOrDefault$6(options.hoverBackgroundColor, getHoverColor(options.backgroundColor));
      model.borderColor = valueOrDefault$6(options.hoverBorderColor, getHoverColor(options.borderColor));
      model.borderWidth = valueOrDefault$6(options.hoverBorderWidth, options.borderWidth);
      model.radius = valueOrDefault$6(options.hoverRadius, options.radius);
    }
  });
  var resolve$3 = helpers$1.options.resolve;

  core_defaults._set('polarArea', {
    scale: {
      type: 'radialLinear',
      angleLines: {
        display: false
      },
      gridLines: {
        circular: true
      },
      pointLabels: {
        display: false
      },
      ticks: {
        beginAtZero: true
      }
    },
    // Boolean - Whether to animate the rotation of the chart
    animation: {
      animateRotate: true,
      animateScale: true
    },
    startAngle: -0.5 * Math.PI,
    legendCallback: function legendCallback(chart) {
      var list = document.createElement('ul');
      var data = chart.data;
      var datasets = data.datasets;
      var labels = data.labels;
      var i, ilen, listItem, listItemSpan;
      list.setAttribute('class', chart.id + '-legend');

      if (datasets.length) {
        for (i = 0, ilen = datasets[0].data.length; i < ilen; ++i) {
          listItem = list.appendChild(document.createElement('li'));
          listItemSpan = listItem.appendChild(document.createElement('span'));
          listItemSpan.style.backgroundColor = datasets[0].backgroundColor[i];

          if (labels[i]) {
            listItem.appendChild(document.createTextNode(labels[i]));
          }
        }
      }

      return list.outerHTML;
    },
    legend: {
      labels: {
        generateLabels: function generateLabels(chart) {
          var data = chart.data;

          if (data.labels.length && data.datasets.length) {
            return data.labels.map(function (label, i) {
              var meta = chart.getDatasetMeta(0);
              var style = meta.controller.getStyle(i);
              return {
                text: label,
                fillStyle: style.backgroundColor,
                strokeStyle: style.borderColor,
                lineWidth: style.borderWidth,
                hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                // Extra data used for toggling the correct item
                index: i
              };
            });
          }

          return [];
        }
      },
      onClick: function onClick(e, legendItem) {
        var index = legendItem.index;
        var chart = this.chart;
        var i, ilen, meta;

        for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
          meta = chart.getDatasetMeta(i);
          meta.data[index].hidden = !meta.data[index].hidden;
        }

        chart.update();
      }
    },
    // Need to override these to give a nice default
    tooltips: {
      callbacks: {
        title: function title() {
          return '';
        },
        label: function label(item, data) {
          return data.labels[item.index] + ': ' + item.yLabel;
        }
      }
    }
  });

  var controller_polarArea = core_datasetController.extend({
    dataElementType: elements.Arc,
    linkScales: helpers$1.noop,

    /**
     * @private
     */
    _dataElementOptions: ['backgroundColor', 'borderColor', 'borderWidth', 'borderAlign', 'hoverBackgroundColor', 'hoverBorderColor', 'hoverBorderWidth'],

    /**
     * @private
     */
    _getIndexScaleId: function _getIndexScaleId() {
      return this.chart.scale.id;
    },

    /**
     * @private
     */
    _getValueScaleId: function _getValueScaleId() {
      return this.chart.scale.id;
    },
    update: function update(reset) {
      var me = this;
      var dataset = me.getDataset();
      var meta = me.getMeta();
      var start = me.chart.options.startAngle || 0;
      var starts = me._starts = [];
      var angles = me._angles = [];
      var arcs = meta.data;
      var i, ilen, angle;

      me._updateRadius();

      meta.count = me.countVisibleElements();

      for (i = 0, ilen = dataset.data.length; i < ilen; i++) {
        starts[i] = start;
        angle = me._computeAngle(i);
        angles[i] = angle;
        start += angle;
      }

      for (i = 0, ilen = arcs.length; i < ilen; ++i) {
        arcs[i]._options = me._resolveDataElementOptions(arcs[i], i);
        me.updateElement(arcs[i], i, reset);
      }
    },

    /**
     * @private
     */
    _updateRadius: function _updateRadius() {
      var me = this;
      var chart = me.chart;
      var chartArea = chart.chartArea;
      var opts = chart.options;
      var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      chart.outerRadius = Math.max(minSize / 2, 0);
      chart.innerRadius = Math.max(opts.cutoutPercentage ? chart.outerRadius / 100 * opts.cutoutPercentage : 1, 0);
      chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
      me.outerRadius = chart.outerRadius - chart.radiusLength * me.index;
      me.innerRadius = me.outerRadius - chart.radiusLength;
    },
    updateElement: function updateElement(arc, index, reset) {
      var me = this;
      var chart = me.chart;
      var dataset = me.getDataset();
      var opts = chart.options;
      var animationOpts = opts.animation;
      var scale = chart.scale;
      var labels = chart.data.labels;
      var centerX = scale.xCenter;
      var centerY = scale.yCenter; // var negHalfPI = -0.5 * Math.PI;

      var datasetStartAngle = opts.startAngle;
      var distance = arc.hidden ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
      var startAngle = me._starts[index];
      var endAngle = startAngle + (arc.hidden ? 0 : me._angles[index]);
      var resetRadius = animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
      var options = arc._options || {};
      helpers$1.extend(arc, {
        // Utility
        _datasetIndex: me.index,
        _index: index,
        _scale: scale,
        // Desired view properties
        _model: {
          backgroundColor: options.backgroundColor,
          borderColor: options.borderColor,
          borderWidth: options.borderWidth,
          borderAlign: options.borderAlign,
          x: centerX,
          y: centerY,
          innerRadius: 0,
          outerRadius: reset ? resetRadius : distance,
          startAngle: reset && animationOpts.animateRotate ? datasetStartAngle : startAngle,
          endAngle: reset && animationOpts.animateRotate ? datasetStartAngle : endAngle,
          label: helpers$1.valueAtIndexOrDefault(labels, index, labels[index])
        }
      });
      arc.pivot();
    },
    countVisibleElements: function countVisibleElements() {
      var dataset = this.getDataset();
      var meta = this.getMeta();
      var count = 0;
      helpers$1.each(meta.data, function (element, index) {
        if (!isNaN(dataset.data[index]) && !element.hidden) {
          count++;
        }
      });
      return count;
    },

    /**
     * @protected
     */
    setHoverStyle: function setHoverStyle(arc) {
      var model = arc._model;
      var options = arc._options;
      var getHoverColor = helpers$1.getHoverColor;
      var valueOrDefault = helpers$1.valueOrDefault;
      arc.$previousStyle = {
        backgroundColor: model.backgroundColor,
        borderColor: model.borderColor,
        borderWidth: model.borderWidth
      };
      model.backgroundColor = valueOrDefault(options.hoverBackgroundColor, getHoverColor(options.backgroundColor));
      model.borderColor = valueOrDefault(options.hoverBorderColor, getHoverColor(options.borderColor));
      model.borderWidth = valueOrDefault(options.hoverBorderWidth, options.borderWidth);
    },

    /**
     * @private
     */
    _computeAngle: function _computeAngle(index) {
      var me = this;
      var count = this.getMeta().count;
      var dataset = me.getDataset();
      var meta = me.getMeta();

      if (isNaN(dataset.data[index]) || meta.data[index].hidden) {
        return 0;
      } // Scriptable options


      var context = {
        chart: me.chart,
        dataIndex: index,
        dataset: dataset,
        datasetIndex: me.index
      };
      return resolve$3([me.chart.options.elements.arc.angle, 2 * Math.PI / count], context, index);
    }
  });

  core_defaults._set('pie', helpers$1.clone(core_defaults.doughnut));

  core_defaults._set('pie', {
    cutoutPercentage: 0
  }); // Pie charts are Doughnut chart with different defaults


  var controller_pie = controller_doughnut;
  var valueOrDefault$7 = helpers$1.valueOrDefault;

  core_defaults._set('radar', {
    spanGaps: false,
    scale: {
      type: 'radialLinear'
    },
    elements: {
      line: {
        fill: 'start',
        tension: 0 // no bezier in radar

      }
    }
  });

  var controller_radar = core_datasetController.extend({
    datasetElementType: elements.Line,
    dataElementType: elements.Point,
    linkScales: helpers$1.noop,

    /**
     * @private
     */
    _datasetElementOptions: ['backgroundColor', 'borderWidth', 'borderColor', 'borderCapStyle', 'borderDash', 'borderDashOffset', 'borderJoinStyle', 'fill'],

    /**
     * @private
     */
    _dataElementOptions: {
      backgroundColor: 'pointBackgroundColor',
      borderColor: 'pointBorderColor',
      borderWidth: 'pointBorderWidth',
      hitRadius: 'pointHitRadius',
      hoverBackgroundColor: 'pointHoverBackgroundColor',
      hoverBorderColor: 'pointHoverBorderColor',
      hoverBorderWidth: 'pointHoverBorderWidth',
      hoverRadius: 'pointHoverRadius',
      pointStyle: 'pointStyle',
      radius: 'pointRadius',
      rotation: 'pointRotation'
    },

    /**
     * @private
     */
    _getIndexScaleId: function _getIndexScaleId() {
      return this.chart.scale.id;
    },

    /**
     * @private
     */
    _getValueScaleId: function _getValueScaleId() {
      return this.chart.scale.id;
    },
    update: function update(reset) {
      var me = this;
      var meta = me.getMeta();
      var line = meta.dataset;
      var points = meta.data || [];
      var scale = me.chart.scale;
      var config = me._config;
      var i, ilen; // Compatibility: If the properties are defined with only the old name, use those values

      if (config.tension !== undefined && config.lineTension === undefined) {
        config.lineTension = config.tension;
      } // Utility


      line._scale = scale;
      line._datasetIndex = me.index; // Data

      line._children = points;
      line._loop = true; // Model

      line._model = me._resolveDatasetElementOptions(line);
      line.pivot(); // Update Points

      for (i = 0, ilen = points.length; i < ilen; ++i) {
        me.updateElement(points[i], i, reset);
      } // Update bezier control points


      me.updateBezierControlPoints(); // Now pivot the point for animation

      for (i = 0, ilen = points.length; i < ilen; ++i) {
        points[i].pivot();
      }
    },
    updateElement: function updateElement(point, index, reset) {
      var me = this;
      var custom = point.custom || {};
      var dataset = me.getDataset();
      var scale = me.chart.scale;
      var pointPosition = scale.getPointPositionForValue(index, dataset.data[index]);

      var options = me._resolveDataElementOptions(point, index);

      var lineModel = me.getMeta().dataset._model;

      var x = reset ? scale.xCenter : pointPosition.x;
      var y = reset ? scale.yCenter : pointPosition.y; // Utility

      point._scale = scale;
      point._options = options;
      point._datasetIndex = me.index;
      point._index = index; // Desired view properties

      point._model = {
        x: x,
        // value not used in dataset scale, but we want a consistent API between scales
        y: y,
        skip: custom.skip || isNaN(x) || isNaN(y),
        // Appearance
        radius: options.radius,
        pointStyle: options.pointStyle,
        rotation: options.rotation,
        backgroundColor: options.backgroundColor,
        borderColor: options.borderColor,
        borderWidth: options.borderWidth,
        tension: valueOrDefault$7(custom.tension, lineModel ? lineModel.tension : 0),
        // Tooltip
        hitRadius: options.hitRadius
      };
    },

    /**
     * @private
     */
    _resolveDatasetElementOptions: function _resolveDatasetElementOptions() {
      var me = this;
      var config = me._config;
      var options = me.chart.options;

      var values = core_datasetController.prototype._resolveDatasetElementOptions.apply(me, arguments);

      values.spanGaps = valueOrDefault$7(config.spanGaps, options.spanGaps);
      values.tension = valueOrDefault$7(config.lineTension, options.elements.line.tension);
      return values;
    },
    updateBezierControlPoints: function updateBezierControlPoints() {
      var me = this;
      var meta = me.getMeta();
      var area = me.chart.chartArea;
      var points = meta.data || [];
      var i, ilen, model, controlPoints; // Only consider points that are drawn in case the spanGaps option is used

      if (meta.dataset._model.spanGaps) {
        points = points.filter(function (pt) {
          return !pt._model.skip;
        });
      }

      function capControlPoint(pt, min, max) {
        return Math.max(Math.min(pt, max), min);
      }

      for (i = 0, ilen = points.length; i < ilen; ++i) {
        model = points[i]._model;
        controlPoints = helpers$1.splineCurve(helpers$1.previousItem(points, i, true)._model, model, helpers$1.nextItem(points, i, true)._model, model.tension); // Prevent the bezier going outside of the bounds of the graph

        model.controlPointPreviousX = capControlPoint(controlPoints.previous.x, area.left, area.right);
        model.controlPointPreviousY = capControlPoint(controlPoints.previous.y, area.top, area.bottom);
        model.controlPointNextX = capControlPoint(controlPoints.next.x, area.left, area.right);
        model.controlPointNextY = capControlPoint(controlPoints.next.y, area.top, area.bottom);
      }
    },
    setHoverStyle: function setHoverStyle(point) {
      var model = point._model;
      var options = point._options;
      var getHoverColor = helpers$1.getHoverColor;
      point.$previousStyle = {
        backgroundColor: model.backgroundColor,
        borderColor: model.borderColor,
        borderWidth: model.borderWidth,
        radius: model.radius
      };
      model.backgroundColor = valueOrDefault$7(options.hoverBackgroundColor, getHoverColor(options.backgroundColor));
      model.borderColor = valueOrDefault$7(options.hoverBorderColor, getHoverColor(options.borderColor));
      model.borderWidth = valueOrDefault$7(options.hoverBorderWidth, options.borderWidth);
      model.radius = valueOrDefault$7(options.hoverRadius, options.radius);
    }
  });

  core_defaults._set('scatter', {
    hover: {
      mode: 'single'
    },
    scales: {
      xAxes: [{
        id: 'x-axis-1',
        // need an ID so datasets can reference the scale
        type: 'linear',
        // scatter should not use a category axis
        position: 'bottom'
      }],
      yAxes: [{
        id: 'y-axis-1',
        type: 'linear',
        position: 'left'
      }]
    },
    tooltips: {
      callbacks: {
        title: function title() {
          return ''; // doesn't make sense for scatter since data are formatted as a point
        },
        label: function label(item) {
          return '(' + item.xLabel + ', ' + item.yLabel + ')';
        }
      }
    }
  });

  core_defaults._set('global', {
    datasets: {
      scatter: {
        showLine: false
      }
    }
  }); // Scatter charts use line controllers


  var controller_scatter = controller_line; // NOTE export a map in which the key represents the controller type, not
  // the class, and so must be CamelCase in order to be correctly retrieved
  // by the controller in core.controller.js (`controllers[meta.type]`).

  var controllers = {
    bar: controller_bar,
    bubble: controller_bubble,
    doughnut: controller_doughnut,
    horizontalBar: controller_horizontalBar,
    line: controller_line,
    polarArea: controller_polarArea,
    pie: controller_pie,
    radar: controller_radar,
    scatter: controller_scatter
  };
  /**
   * Helper function to get relative position for an event
   * @param {Event|IEvent} event - The event to get the position for
   * @param {Chart} chart - The chart
   * @returns {object} the event position
   */

  function getRelativePosition(e, chart) {
    if (e.native) {
      return {
        x: e.x,
        y: e.y
      };
    }

    return helpers$1.getRelativePosition(e, chart);
  }
  /**
   * Helper function to traverse all of the visible elements in the chart
   * @param {Chart} chart - the chart
   * @param {function} handler - the callback to execute for each visible item
   */


  function parseVisibleItems(chart, handler) {
    var metasets = chart._getSortedVisibleDatasetMetas();

    var metadata, i, j, ilen, jlen, element;

    for (i = 0, ilen = metasets.length; i < ilen; ++i) {
      metadata = metasets[i].data;

      for (j = 0, jlen = metadata.length; j < jlen; ++j) {
        element = metadata[j];

        if (!element._view.skip) {
          handler(element);
        }
      }
    }
  }
  /**
   * Helper function to get the items that intersect the event position
   * @param {ChartElement[]} items - elements to filter
   * @param {object} position - the point to be nearest to
   * @return {ChartElement[]} the nearest items
   */


  function getIntersectItems(chart, position) {
    var elements = [];
    parseVisibleItems(chart, function (element) {
      if (element.inRange(position.x, position.y)) {
        elements.push(element);
      }
    });
    return elements;
  }
  /**
   * Helper function to get the items nearest to the event position considering all visible items in teh chart
   * @param {Chart} chart - the chart to look at elements from
   * @param {object} position - the point to be nearest to
   * @param {boolean} intersect - if true, only consider items that intersect the position
   * @param {function} distanceMetric - function to provide the distance between points
   * @return {ChartElement[]} the nearest items
   */


  function getNearestItems(chart, position, intersect, distanceMetric) {
    var minDistance = Number.POSITIVE_INFINITY;
    var nearestItems = [];
    parseVisibleItems(chart, function (element) {
      if (intersect && !element.inRange(position.x, position.y)) {
        return;
      }

      var center = element.getCenterPoint();
      var distance = distanceMetric(position, center);

      if (distance < minDistance) {
        nearestItems = [element];
        minDistance = distance;
      } else if (distance === minDistance) {
        // Can have multiple items at the same distance in which case we sort by size
        nearestItems.push(element);
      }
    });
    return nearestItems;
  }
  /**
   * Get a distance metric function for two points based on the
   * axis mode setting
   * @param {string} axis - the axis mode. x|y|xy
   */


  function getDistanceMetricForAxis(axis) {
    var useX = axis.indexOf('x') !== -1;
    var useY = axis.indexOf('y') !== -1;
    return function (pt1, pt2) {
      var deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
      var deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
      return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    };
  }

  function indexMode(chart, e, options) {
    var position = getRelativePosition(e, chart); // Default axis for index mode is 'x' to match old behaviour

    options.axis = options.axis || 'x';
    var distanceMetric = getDistanceMetricForAxis(options.axis);
    var items = options.intersect ? getIntersectItems(chart, position) : getNearestItems(chart, position, false, distanceMetric);
    var elements = [];

    if (!items.length) {
      return [];
    }

    chart._getSortedVisibleDatasetMetas().forEach(function (meta) {
      var element = meta.data[items[0]._index]; // don't count items that are skipped (null data)

      if (element && !element._view.skip) {
        elements.push(element);
      }
    });

    return elements;
  }
  /**
   * @interface IInteractionOptions
   */

  /**
   * If true, only consider items that intersect the point
   * @name IInterfaceOptions#boolean
   * @type Boolean
   */

  /**
   * Contains interaction related functions
   * @namespace Chart.Interaction
   */


  var core_interaction = {
    // Helper function for different modes
    modes: {
      single: function single(chart, e) {
        var position = getRelativePosition(e, chart);
        var elements = [];
        parseVisibleItems(chart, function (element) {
          if (element.inRange(position.x, position.y)) {
            elements.push(element);
            return elements;
          }
        });
        return elements.slice(0, 1);
      },

      /**
       * @function Chart.Interaction.modes.label
       * @deprecated since version 2.4.0
       * @todo remove at version 3
       * @private
       */
      label: indexMode,

      /**
       * Returns items at the same index. If the options.intersect parameter is true, we only return items if we intersect something
       * If the options.intersect mode is false, we find the nearest item and return the items at the same index as that item
       * @function Chart.Interaction.modes.index
       * @since v2.4.0
       * @param {Chart} chart - the chart we are returning items from
       * @param {Event} e - the event we are find things at
       * @param {IInteractionOptions} options - options to use during interaction
       * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
       */
      index: indexMode,

      /**
       * Returns items in the same dataset. If the options.intersect parameter is true, we only return items if we intersect something
       * If the options.intersect is false, we find the nearest item and return the items in that dataset
       * @function Chart.Interaction.modes.dataset
       * @param {Chart} chart - the chart we are returning items from
       * @param {Event} e - the event we are find things at
       * @param {IInteractionOptions} options - options to use during interaction
       * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
       */
      dataset: function dataset(chart, e, options) {
        var position = getRelativePosition(e, chart);
        options.axis = options.axis || 'xy';
        var distanceMetric = getDistanceMetricForAxis(options.axis);
        var items = options.intersect ? getIntersectItems(chart, position) : getNearestItems(chart, position, false, distanceMetric);

        if (items.length > 0) {
          items = chart.getDatasetMeta(items[0]._datasetIndex).data;
        }

        return items;
      },

      /**
       * @function Chart.Interaction.modes.x-axis
       * @deprecated since version 2.4.0. Use index mode and intersect == true
       * @todo remove at version 3
       * @private
       */
      'x-axis': function xAxis(chart, e) {
        return indexMode(chart, e, {
          intersect: false
        });
      },

      /**
       * Point mode returns all elements that hit test based on the event position
       * of the event
       * @function Chart.Interaction.modes.intersect
       * @param {Chart} chart - the chart we are returning items from
       * @param {Event} e - the event we are find things at
       * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
       */
      point: function point(chart, e) {
        var position = getRelativePosition(e, chart);
        return getIntersectItems(chart, position);
      },

      /**
       * nearest mode returns the element closest to the point
       * @function Chart.Interaction.modes.intersect
       * @param {Chart} chart - the chart we are returning items from
       * @param {Event} e - the event we are find things at
       * @param {IInteractionOptions} options - options to use
       * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
       */
      nearest: function nearest(chart, e, options) {
        var position = getRelativePosition(e, chart);
        options.axis = options.axis || 'xy';
        var distanceMetric = getDistanceMetricForAxis(options.axis);
        return getNearestItems(chart, position, options.intersect, distanceMetric);
      },

      /**
       * x mode returns the elements that hit-test at the current x coordinate
       * @function Chart.Interaction.modes.x
       * @param {Chart} chart - the chart we are returning items from
       * @param {Event} e - the event we are find things at
       * @param {IInteractionOptions} options - options to use
       * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
       */
      x: function x(chart, e, options) {
        var position = getRelativePosition(e, chart);
        var items = [];
        var intersectsItem = false;
        parseVisibleItems(chart, function (element) {
          if (element.inXRange(position.x)) {
            items.push(element);
          }

          if (element.inRange(position.x, position.y)) {
            intersectsItem = true;
          }
        }); // If we want to trigger on an intersect and we don't have any items
        // that intersect the position, return nothing

        if (options.intersect && !intersectsItem) {
          items = [];
        }

        return items;
      },

      /**
       * y mode returns the elements that hit-test at the current y coordinate
       * @function Chart.Interaction.modes.y
       * @param {Chart} chart - the chart we are returning items from
       * @param {Event} e - the event we are find things at
       * @param {IInteractionOptions} options - options to use
       * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
       */
      y: function y(chart, e, options) {
        var position = getRelativePosition(e, chart);
        var items = [];
        var intersectsItem = false;
        parseVisibleItems(chart, function (element) {
          if (element.inYRange(position.y)) {
            items.push(element);
          }

          if (element.inRange(position.x, position.y)) {
            intersectsItem = true;
          }
        }); // If we want to trigger on an intersect and we don't have any items
        // that intersect the position, return nothing

        if (options.intersect && !intersectsItem) {
          items = [];
        }

        return items;
      }
    }
  };
  var extend = helpers$1.extend;

  function filterByPosition(array, position) {
    return helpers$1.where(array, function (v) {
      return v.pos === position;
    });
  }

  function sortByWeight(array, reverse) {
    return array.sort(function (a, b) {
      var v0 = reverse ? b : a;
      var v1 = reverse ? a : b;
      return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
    });
  }

  function wrapBoxes(boxes) {
    var layoutBoxes = [];
    var i, ilen, box;

    for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
      box = boxes[i];
      layoutBoxes.push({
        index: i,
        box: box,
        pos: box.position,
        horizontal: box.isHorizontal(),
        weight: box.weight
      });
    }

    return layoutBoxes;
  }

  function setLayoutDims(layouts, params) {
    var i, ilen, layout;

    for (i = 0, ilen = layouts.length; i < ilen; ++i) {
      layout = layouts[i]; // store width used instead of chartArea.w in fitBoxes

      layout.width = layout.horizontal ? layout.box.fullWidth && params.availableWidth : params.vBoxMaxWidth; // store height used instead of chartArea.h in fitBoxes

      layout.height = layout.horizontal && params.hBoxMaxHeight;
    }
  }

  function buildLayoutBoxes(boxes) {
    var layoutBoxes = wrapBoxes(boxes);
    var left = sortByWeight(filterByPosition(layoutBoxes, 'left'), true);
    var right = sortByWeight(filterByPosition(layoutBoxes, 'right'));
    var top = sortByWeight(filterByPosition(layoutBoxes, 'top'), true);
    var bottom = sortByWeight(filterByPosition(layoutBoxes, 'bottom'));
    return {
      leftAndTop: left.concat(top),
      rightAndBottom: right.concat(bottom),
      chartArea: filterByPosition(layoutBoxes, 'chartArea'),
      vertical: left.concat(right),
      horizontal: top.concat(bottom)
    };
  }

  function getCombinedMax(maxPadding, chartArea, a, b) {
    return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
  }

  function updateDims(chartArea, params, layout) {
    var box = layout.box;
    var maxPadding = chartArea.maxPadding;
    var newWidth, newHeight;

    if (layout.size) {
      // this layout was already counted for, lets first reduce old size
      chartArea[layout.pos] -= layout.size;
    }

    layout.size = layout.horizontal ? box.height : box.width;
    chartArea[layout.pos] += layout.size;

    if (box.getPadding) {
      var boxPadding = box.getPadding();
      maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
      maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
      maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
      maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
    }

    newWidth = params.outerWidth - getCombinedMax(maxPadding, chartArea, 'left', 'right');
    newHeight = params.outerHeight - getCombinedMax(maxPadding, chartArea, 'top', 'bottom');

    if (newWidth !== chartArea.w || newHeight !== chartArea.h) {
      chartArea.w = newWidth;
      chartArea.h = newHeight; // return true if chart area changed in layout's direction

      var sizes = layout.horizontal ? [newWidth, chartArea.w] : [newHeight, chartArea.h];
      return sizes[0] !== sizes[1] && (!isNaN(sizes[0]) || !isNaN(sizes[1]));
    }
  }

  function handleMaxPadding(chartArea) {
    var maxPadding = chartArea.maxPadding;

    function updatePos(pos) {
      var change = Math.max(maxPadding[pos] - chartArea[pos], 0);
      chartArea[pos] += change;
      return change;
    }

    chartArea.y += updatePos('top');
    chartArea.x += updatePos('left');
    updatePos('right');
    updatePos('bottom');
  }

  function getMargins(horizontal, chartArea) {
    var maxPadding = chartArea.maxPadding;

    function marginForPositions(positions) {
      var margin = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      positions.forEach(function (pos) {
        margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
      });
      return margin;
    }

    return horizontal ? marginForPositions(['left', 'right']) : marginForPositions(['top', 'bottom']);
  }

  function fitBoxes(boxes, chartArea, params) {
    var refitBoxes = [];
    var i, ilen, layout, box, refit, changed;

    for (i = 0, ilen = boxes.length; i < ilen; ++i) {
      layout = boxes[i];
      box = layout.box;
      box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));

      if (updateDims(chartArea, params, layout)) {
        changed = true;

        if (refitBoxes.length) {
          // Dimensions changed and there were non full width boxes before this
          // -> we have to refit those
          refit = true;
        }
      }

      if (!box.fullWidth) {
        // fullWidth boxes don't need to be re-fitted in any case
        refitBoxes.push(layout);
      }
    }

    return refit ? fitBoxes(refitBoxes, chartArea, params) || changed : changed;
  }

  function placeBoxes(boxes, chartArea, params) {
    var userPadding = params.padding;
    var x = chartArea.x;
    var y = chartArea.y;
    var i, ilen, layout, box;

    for (i = 0, ilen = boxes.length; i < ilen; ++i) {
      layout = boxes[i];
      box = layout.box;

      if (layout.horizontal) {
        box.left = box.fullWidth ? userPadding.left : chartArea.left;
        box.right = box.fullWidth ? params.outerWidth - userPadding.right : chartArea.left + chartArea.w;
        box.top = y;
        box.bottom = y + box.height;
        box.width = box.right - box.left;
        y = box.bottom;
      } else {
        box.left = x;
        box.right = x + box.width;
        box.top = chartArea.top;
        box.bottom = chartArea.top + chartArea.h;
        box.height = box.bottom - box.top;
        x = box.right;
      }
    }

    chartArea.x = x;
    chartArea.y = y;
  }

  core_defaults._set('global', {
    layout: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
  });
  /**
   * @interface ILayoutItem
   * @prop {string} position - The position of the item in the chart layout. Possible values are
   * 'left', 'top', 'right', 'bottom', and 'chartArea'
   * @prop {number} weight - The weight used to sort the item. Higher weights are further away from the chart area
   * @prop {boolean} fullWidth - if true, and the item is horizontal, then push vertical boxes down
   * @prop {function} isHorizontal - returns true if the layout item is horizontal (ie. top or bottom)
   * @prop {function} update - Takes two parameters: width and height. Returns size of item
   * @prop {function} getPadding -  Returns an object with padding on the edges
   * @prop {number} width - Width of item. Must be valid after update()
   * @prop {number} height - Height of item. Must be valid after update()
   * @prop {number} left - Left edge of the item. Set by layout system and cannot be used in update
   * @prop {number} top - Top edge of the item. Set by layout system and cannot be used in update
   * @prop {number} right - Right edge of the item. Set by layout system and cannot be used in update
   * @prop {number} bottom - Bottom edge of the item. Set by layout system and cannot be used in update
   */
  // The layout service is very self explanatory.  It's responsible for the layout within a chart.
  // Scales, Legends and Plugins all rely on the layout service and can easily register to be placed anywhere they need
  // It is this service's responsibility of carrying out that layout.


  var core_layouts = {
    defaults: {},

    /**
     * Register a box to a chart.
     * A box is simply a reference to an object that requires layout. eg. Scales, Legend, Title.
     * @param {Chart} chart - the chart to use
     * @param {ILayoutItem} item - the item to add to be layed out
     */
    addBox: function addBox(chart, item) {
      if (!chart.boxes) {
        chart.boxes = [];
      } // initialize item with default values


      item.fullWidth = item.fullWidth || false;
      item.position = item.position || 'top';
      item.weight = item.weight || 0;

      item._layers = item._layers || function () {
        return [{
          z: 0,
          draw: function draw() {
            item.draw.apply(item, arguments);
          }
        }];
      };

      chart.boxes.push(item);
    },

    /**
     * Remove a layoutItem from a chart
     * @param {Chart} chart - the chart to remove the box from
     * @param {ILayoutItem} layoutItem - the item to remove from the layout
     */
    removeBox: function removeBox(chart, layoutItem) {
      var index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;

      if (index !== -1) {
        chart.boxes.splice(index, 1);
      }
    },

    /**
     * Sets (or updates) options on the given `item`.
     * @param {Chart} chart - the chart in which the item lives (or will be added to)
     * @param {ILayoutItem} item - the item to configure with the given options
     * @param {object} options - the new item options.
     */
    configure: function configure(chart, item, options) {
      var props = ['fullWidth', 'position', 'weight'];
      var ilen = props.length;
      var i = 0;
      var prop;

      for (; i < ilen; ++i) {
        prop = props[i];

        if (options.hasOwnProperty(prop)) {
          item[prop] = options[prop];
        }
      }
    },

    /**
     * Fits boxes of the given chart into the given size by having each box measure itself
     * then running a fitting algorithm
     * @param {Chart} chart - the chart
     * @param {number} width - the width to fit into
     * @param {number} height - the height to fit into
     */
    update: function update(chart, width, height) {
      if (!chart) {
        return;
      }

      var layoutOptions = chart.options.layout || {};
      var padding = helpers$1.options.toPadding(layoutOptions.padding);
      var availableWidth = width - padding.width;
      var availableHeight = height - padding.height;
      var boxes = buildLayoutBoxes(chart.boxes);
      var verticalBoxes = boxes.vertical;
      var horizontalBoxes = boxes.horizontal; // Essentially we now have any number of boxes on each of the 4 sides.
      // Our canvas looks like the following.
      // The areas L1 and L2 are the left axes. R1 is the right axis, T1 is the top axis and
      // B1 is the bottom axis
      // There are also 4 quadrant-like locations (left to right instead of clockwise) reserved for chart overlays
      // These locations are single-box locations only, when trying to register a chartArea location that is already taken,
      // an error will be thrown.
      //
      // |----------------------------------------------------|
      // |                  T1 (Full Width)                   |
      // |----------------------------------------------------|
      // |    |    |                 T2                  |    |
      // |    |----|-------------------------------------|----|
      // |    |    | C1 |                           | C2 |    |
      // |    |    |----|                           |----|    |
      // |    |    |                                     |    |
      // | L1 | L2 |           ChartArea (C0)            | R1 |
      // |    |    |                                     |    |
      // |    |    |----|                           |----|    |
      // |    |    | C3 |                           | C4 |    |
      // |    |----|-------------------------------------|----|
      // |    |    |                 B1                  |    |
      // |----------------------------------------------------|
      // |                  B2 (Full Width)                   |
      // |----------------------------------------------------|
      //

      var params = Object.freeze({
        outerWidth: width,
        outerHeight: height,
        padding: padding,
        availableWidth: availableWidth,
        vBoxMaxWidth: availableWidth / 2 / verticalBoxes.length,
        hBoxMaxHeight: availableHeight / 2
      });
      var chartArea = extend({
        maxPadding: extend({}, padding),
        w: availableWidth,
        h: availableHeight,
        x: padding.left,
        y: padding.top
      }, padding);
      setLayoutDims(verticalBoxes.concat(horizontalBoxes), params); // First fit vertical boxes

      fitBoxes(verticalBoxes, chartArea, params); // Then fit horizontal boxes

      if (fitBoxes(horizontalBoxes, chartArea, params)) {
        // if the area changed, re-fit vertical boxes
        fitBoxes(verticalBoxes, chartArea, params);
      }

      handleMaxPadding(chartArea); // Finally place the boxes to correct coordinates

      placeBoxes(boxes.leftAndTop, chartArea, params); // Move to opposite side of chart

      chartArea.x += chartArea.w;
      chartArea.y += chartArea.h;
      placeBoxes(boxes.rightAndBottom, chartArea, params);
      chart.chartArea = {
        left: chartArea.left,
        top: chartArea.top,
        right: chartArea.left + chartArea.w,
        bottom: chartArea.top + chartArea.h
      }; // Finally update boxes in chartArea (radial scale for example)

      helpers$1.each(boxes.chartArea, function (layout) {
        var box = layout.box;
        extend(box, chart.chartArea);
        box.update(chartArea.w, chartArea.h);
      });
    }
  };
  /**
   * Platform fallback implementation (minimal).
   * @see https://github.com/chartjs/Chart.js/pull/4591#issuecomment-319575939
   */

  var platform_basic = {
    acquireContext: function acquireContext(item) {
      if (item && item.canvas) {
        // Support for any object associated to a canvas (including a context2d)
        item = item.canvas;
      }

      return item && item.getContext('2d') || null;
    }
  };
  var platform_dom = "/*\r\n * DOM element rendering detection\r\n * https://davidwalsh.name/detect-node-insertion\r\n */\r\n@keyframes chartjs-render-animation {\r\n\tfrom { opacity: 0.99; }\r\n\tto { opacity: 1; }\r\n}\r\n\r\n.chartjs-render-monitor {\r\n\tanimation: chartjs-render-animation 0.001s;\r\n}\r\n\r\n/*\r\n * DOM element resizing detection\r\n * https://github.com/marcj/css-element-queries\r\n */\r\n.chartjs-size-monitor,\r\n.chartjs-size-monitor-expand,\r\n.chartjs-size-monitor-shrink {\r\n\tposition: absolute;\r\n\tdirection: ltr;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\toverflow: hidden;\r\n\tpointer-events: none;\r\n\tvisibility: hidden;\r\n\tz-index: -1;\r\n}\r\n\r\n.chartjs-size-monitor-expand > div {\r\n\tposition: absolute;\r\n\twidth: 1000000px;\r\n\theight: 1000000px;\r\n\tleft: 0;\r\n\ttop: 0;\r\n}\r\n\r\n.chartjs-size-monitor-shrink > div {\r\n\tposition: absolute;\r\n\twidth: 200%;\r\n\theight: 200%;\r\n\tleft: 0;\r\n\ttop: 0;\r\n}\r\n";
  var platform_dom$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': platform_dom
  });
  var stylesheet = getCjsExportFromNamespace(platform_dom$1);
  var EXPANDO_KEY = '$chartjs';
  var CSS_PREFIX = 'chartjs-';
  var CSS_SIZE_MONITOR = CSS_PREFIX + 'size-monitor';
  var CSS_RENDER_MONITOR = CSS_PREFIX + 'render-monitor';
  var CSS_RENDER_ANIMATION = CSS_PREFIX + 'render-animation';
  var ANIMATION_START_EVENTS = ['animationstart', 'webkitAnimationStart'];
  /**
   * DOM event types -> Chart.js event types.
   * Note: only events with different types are mapped.
   * @see https://developer.mozilla.org/en-US/docs/Web/Events
   */

  var EVENT_TYPES = {
    touchstart: 'mousedown',
    touchmove: 'mousemove',
    touchend: 'mouseup',
    pointerenter: 'mouseenter',
    pointerdown: 'mousedown',
    pointermove: 'mousemove',
    pointerup: 'mouseup',
    pointerleave: 'mouseout',
    pointerout: 'mouseout'
  };
  /**
   * The "used" size is the final value of a dimension property after all calculations have
   * been performed. This method uses the computed style of `element` but returns undefined
   * if the computed style is not expressed in pixels. That can happen in some cases where
   * `element` has a size relative to its parent and this last one is not yet displayed,
   * for example because of `display: none` on a parent node.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
   * @returns {number} Size in pixels or undefined if unknown.
   */

  function readUsedSize(element, property) {
    var value = helpers$1.getStyle(element, property);
    var matches = value && value.match(/^(\d+)(\.\d+)?px$/);
    return matches ? Number(matches[1]) : undefined;
  }
  /**
   * Initializes the canvas style and render size without modifying the canvas display size,
   * since responsiveness is handled by the controller.resize() method. The config is used
   * to determine the aspect ratio to apply in case no explicit height has been specified.
   */


  function initCanvas(canvas, config) {
    var style = canvas.style; // NOTE(SB) canvas.getAttribute('width') !== canvas.width: in the first case it
    // returns null or '' if no explicit value has been set to the canvas attribute.

    var renderHeight = canvas.getAttribute('height');
    var renderWidth = canvas.getAttribute('width'); // Chart.js modifies some canvas values that we want to restore on destroy

    canvas[EXPANDO_KEY] = {
      initial: {
        height: renderHeight,
        width: renderWidth,
        style: {
          display: style.display,
          height: style.height,
          width: style.width
        }
      }
    }; // Force canvas to display as block to avoid extra space caused by inline
    // elements, which would interfere with the responsive resize process.
    // https://github.com/chartjs/Chart.js/issues/2538

    style.display = style.display || 'block';

    if (renderWidth === null || renderWidth === '') {
      var displayWidth = readUsedSize(canvas, 'width');

      if (displayWidth !== undefined) {
        canvas.width = displayWidth;
      }
    }

    if (renderHeight === null || renderHeight === '') {
      if (canvas.style.height === '') {
        // If no explicit render height and style height, let's apply the aspect ratio,
        // which one can be specified by the user but also by charts as default option
        // (i.e. options.aspectRatio). If not specified, use canvas aspect ratio of 2.
        canvas.height = canvas.width / (config.options.aspectRatio || 2);
      } else {
        var displayHeight = readUsedSize(canvas, 'height');

        if (displayWidth !== undefined) {
          canvas.height = displayHeight;
        }
      }
    }

    return canvas;
  }
  /**
   * Detects support for options object argument in addEventListener.
   * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
   * @private
   */


  var supportsEventListenerOptions = function () {
    var supports = false;

    try {
      var options = Object.defineProperty({}, 'passive', {
        // eslint-disable-next-line getter-return
        get: function get() {
          supports = true;
        }
      });
      window.addEventListener('e', null, options);
    } catch (e) {// continue regardless of error
    }

    return supports;
  }(); // Default passive to true as expected by Chrome for 'touchstart' and 'touchend' events.
  // https://github.com/chartjs/Chart.js/issues/4287


  var eventListenerOptions = supportsEventListenerOptions ? {
    passive: true
  } : false;

  function addListener(node, type, listener) {
    node.addEventListener(type, listener, eventListenerOptions);
  }

  function removeListener(node, type, listener) {
    node.removeEventListener(type, listener, eventListenerOptions);
  }

  function createEvent(type, chart, x, y, nativeEvent) {
    return {
      type: type,
      chart: chart,
      native: nativeEvent || null,
      x: x !== undefined ? x : null,
      y: y !== undefined ? y : null
    };
  }

  function fromNativeEvent(event, chart) {
    var type = EVENT_TYPES[event.type] || event.type;
    var pos = helpers$1.getRelativePosition(event, chart);
    return createEvent(type, chart, pos.x, pos.y, event);
  }

  function throttled(fn, thisArg) {
    var ticking = false;
    var args = [];
    return function () {
      args = Array.prototype.slice.call(arguments);
      thisArg = thisArg || this;

      if (!ticking) {
        ticking = true;
        helpers$1.requestAnimFrame.call(window, function () {
          ticking = false;
          fn.apply(thisArg, args);
        });
      }
    };
  }

  function createDiv(cls) {
    var el = document.createElement('div');
    el.className = cls || '';
    return el;
  } // Implementation based on https://github.com/marcj/css-element-queries


  function createResizer(handler) {
    var maxSize = 1000000; // NOTE(SB) Don't use innerHTML because it could be considered unsafe.
    // https://github.com/chartjs/Chart.js/issues/5902

    var resizer = createDiv(CSS_SIZE_MONITOR);
    var expand = createDiv(CSS_SIZE_MONITOR + '-expand');
    var shrink = createDiv(CSS_SIZE_MONITOR + '-shrink');
    expand.appendChild(createDiv());
    shrink.appendChild(createDiv());
    resizer.appendChild(expand);
    resizer.appendChild(shrink);

    resizer._reset = function () {
      expand.scrollLeft = maxSize;
      expand.scrollTop = maxSize;
      shrink.scrollLeft = maxSize;
      shrink.scrollTop = maxSize;
    };

    var onScroll = function onScroll() {
      resizer._reset();

      handler();
    };

    addListener(expand, 'scroll', onScroll.bind(expand, 'expand'));
    addListener(shrink, 'scroll', onScroll.bind(shrink, 'shrink'));
    return resizer;
  } // https://davidwalsh.name/detect-node-insertion


  function watchForRender(node, handler) {
    var expando = node[EXPANDO_KEY] || (node[EXPANDO_KEY] = {});

    var proxy = expando.renderProxy = function (e) {
      if (e.animationName === CSS_RENDER_ANIMATION) {
        handler();
      }
    };

    helpers$1.each(ANIMATION_START_EVENTS, function (type) {
      addListener(node, type, proxy);
    }); // #4737: Chrome might skip the CSS animation when the CSS_RENDER_MONITOR class
    // is removed then added back immediately (same animation frame?). Accessing the
    // `offsetParent` property will force a reflow and re-evaluate the CSS animation.
    // https://gist.github.com/paulirish/5d52fb081b3570c81e3a#box-metrics
    // https://github.com/chartjs/Chart.js/issues/4737

    expando.reflow = !!node.offsetParent;
    node.classList.add(CSS_RENDER_MONITOR);
  }

  function unwatchForRender(node) {
    var expando = node[EXPANDO_KEY] || {};
    var proxy = expando.renderProxy;

    if (proxy) {
      helpers$1.each(ANIMATION_START_EVENTS, function (type) {
        removeListener(node, type, proxy);
      });
      delete expando.renderProxy;
    }

    node.classList.remove(CSS_RENDER_MONITOR);
  }

  function addResizeListener(node, listener, chart) {
    var expando = node[EXPANDO_KEY] || (node[EXPANDO_KEY] = {}); // Let's keep track of this added resizer and thus avoid DOM query when removing it.

    var resizer = expando.resizer = createResizer(throttled(function () {
      if (expando.resizer) {
        var container = chart.options.maintainAspectRatio && node.parentNode;
        var w = container ? container.clientWidth : 0;
        listener(createEvent('resize', chart));

        if (container && container.clientWidth < w && chart.canvas) {
          // If the container size shrank during chart resize, let's assume
          // scrollbar appeared. So we resize again with the scrollbar visible -
          // effectively making chart smaller and the scrollbar hidden again.
          // Because we are inside `throttled`, and currently `ticking`, scroll
          // events are ignored during this whole 2 resize process.
          // If we assumed wrong and something else happened, we are resizing
          // twice in a frame (potential performance issue)
          listener(createEvent('resize', chart));
        }
      }
    })); // The resizer needs to be attached to the node parent, so we first need to be
    // sure that `node` is attached to the DOM before injecting the resizer element.

    watchForRender(node, function () {
      if (expando.resizer) {
        var container = node.parentNode;

        if (container && container !== resizer.parentNode) {
          container.insertBefore(resizer, container.firstChild);
        } // The container size might have changed, let's reset the resizer state.


        resizer._reset();
      }
    });
  }

  function removeResizeListener(node) {
    var expando = node[EXPANDO_KEY] || {};
    var resizer = expando.resizer;
    delete expando.resizer;
    unwatchForRender(node);

    if (resizer && resizer.parentNode) {
      resizer.parentNode.removeChild(resizer);
    }
  }
  /**
   * Injects CSS styles inline if the styles are not already present.
   * @param {HTMLDocument|ShadowRoot} rootNode - the node to contain the <style>.
   * @param {string} css - the CSS to be injected.
   */


  function injectCSS(rootNode, css) {
    // https://stackoverflow.com/q/3922139
    var expando = rootNode[EXPANDO_KEY] || (rootNode[EXPANDO_KEY] = {});

    if (!expando.containsStyles) {
      expando.containsStyles = true;
      css = '/* Chart.js */\n' + css;
      var style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.appendChild(document.createTextNode(css));
      rootNode.appendChild(style);
    }
  }

  var platform_dom$2 = {
    /**
     * When `true`, prevents the automatic injection of the stylesheet required to
     * correctly detect when the chart is added to the DOM and then resized. This
     * switch has been added to allow external stylesheet (`dist/Chart(.min)?.js`)
     * to be manually imported to make this library compatible with any CSP.
     * See https://github.com/chartjs/Chart.js/issues/5208
     */
    disableCSSInjection: false,

    /**
     * This property holds whether this platform is enabled for the current environment.
     * Currently used by platform.js to select the proper implementation.
     * @private
     */
    _enabled: typeof window !== 'undefined' && typeof document !== 'undefined',

    /**
     * Initializes resources that depend on platform options.
     * @param {HTMLCanvasElement} canvas - The Canvas element.
     * @private
     */
    _ensureLoaded: function _ensureLoaded(canvas) {
      if (!this.disableCSSInjection) {
        // If the canvas is in a shadow DOM, then the styles must also be inserted
        // into the same shadow DOM.
        // https://github.com/chartjs/Chart.js/issues/5763
        var root = canvas.getRootNode ? canvas.getRootNode() : document;
        var targetNode = root.host ? root : document.head;
        injectCSS(targetNode, stylesheet);
      }
    },
    acquireContext: function acquireContext(item, config) {
      if (typeof item === 'string') {
        item = document.getElementById(item);
      } else if (item.length) {
        // Support for array based queries (such as jQuery)
        item = item[0];
      }

      if (item && item.canvas) {
        // Support for any object associated to a canvas (including a context2d)
        item = item.canvas;
      } // To prevent canvas fingerprinting, some add-ons undefine the getContext
      // method, for example: https://github.com/kkapsner/CanvasBlocker
      // https://github.com/chartjs/Chart.js/issues/2807


      var context = item && item.getContext && item.getContext('2d'); // `instanceof HTMLCanvasElement/CanvasRenderingContext2D` fails when the item is
      // inside an iframe or when running in a protected environment. We could guess the
      // types from their toString() value but let's keep things flexible and assume it's
      // a sufficient condition if the item has a context2D which has item as `canvas`.
      // https://github.com/chartjs/Chart.js/issues/3887
      // https://github.com/chartjs/Chart.js/issues/4102
      // https://github.com/chartjs/Chart.js/issues/4152

      if (context && context.canvas === item) {
        // Load platform resources on first chart creation, to make it possible to
        // import the library before setting platform options.
        this._ensureLoaded(item);

        initCanvas(item, config);
        return context;
      }

      return null;
    },
    releaseContext: function releaseContext(context) {
      var canvas = context.canvas;

      if (!canvas[EXPANDO_KEY]) {
        return;
      }

      var initial = canvas[EXPANDO_KEY].initial;
      ['height', 'width'].forEach(function (prop) {
        var value = initial[prop];

        if (helpers$1.isNullOrUndef(value)) {
          canvas.removeAttribute(prop);
        } else {
          canvas.setAttribute(prop, value);
        }
      });
      helpers$1.each(initial.style || {}, function (value, key) {
        canvas.style[key] = value;
      }); // The canvas render size might have been changed (and thus the state stack discarded),
      // we can't use save() and restore() to restore the initial state. So make sure that at
      // least the canvas context is reset to the default state by setting the canvas width.
      // https://www.w3.org/TR/2011/WD-html5-20110525/the-canvas-element.html
      // eslint-disable-next-line no-self-assign

      canvas.width = canvas.width;
      delete canvas[EXPANDO_KEY];
    },
    addEventListener: function addEventListener(chart, type, listener) {
      var canvas = chart.canvas;

      if (type === 'resize') {
        // Note: the resize event is not supported on all browsers.
        addResizeListener(canvas, listener, chart);
        return;
      }

      var expando = listener[EXPANDO_KEY] || (listener[EXPANDO_KEY] = {});
      var proxies = expando.proxies || (expando.proxies = {});

      var proxy = proxies[chart.id + '_' + type] = function (event) {
        listener(fromNativeEvent(event, chart));
      };

      addListener(canvas, type, proxy);
    },
    removeEventListener: function removeEventListener(chart, type, listener) {
      var canvas = chart.canvas;

      if (type === 'resize') {
        // Note: the resize event is not supported on all browsers.
        removeResizeListener(canvas);
        return;
      }

      var expando = listener[EXPANDO_KEY] || {};
      var proxies = expando.proxies || {};
      var proxy = proxies[chart.id + '_' + type];

      if (!proxy) {
        return;
      }

      removeListener(canvas, type, proxy);
    }
  }; // DEPRECATIONS

  /**
   * Provided for backward compatibility, use EventTarget.addEventListener instead.
   * EventTarget.addEventListener compatibility: Chrome, Opera 7, Safari, FF1.5+, IE9+
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   * @function Chart.helpers.addEvent
   * @deprecated since version 2.7.0
   * @todo remove at version 3
   * @private
   */

  helpers$1.addEvent = addListener;
  /**
   * Provided for backward compatibility, use EventTarget.removeEventListener instead.
   * EventTarget.removeEventListener compatibility: Chrome, Opera 7, Safari, FF1.5+, IE9+
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
   * @function Chart.helpers.removeEvent
   * @deprecated since version 2.7.0
   * @todo remove at version 3
   * @private
   */

  helpers$1.removeEvent = removeListener; // @TODO Make possible to select another platform at build time.

  var implementation = platform_dom$2._enabled ? platform_dom$2 : platform_basic;
  /**
   * @namespace Chart.platform
   * @see https://chartjs.gitbooks.io/proposals/content/Platform.html
   * @since 2.4.0
   */

  var platform = helpers$1.extend({
    /**
     * @since 2.7.0
     */
    initialize: function initialize() {},

    /**
     * Called at chart construction time, returns a context2d instance implementing
     * the [W3C Canvas 2D Context API standard]{@link https://www.w3.org/TR/2dcontext/}.
     * @param {*} item - The native item from which to acquire context (platform specific)
     * @param {object} options - The chart options
     * @returns {CanvasRenderingContext2D} context2d instance
     */
    acquireContext: function acquireContext() {},

    /**
     * Called at chart destruction time, releases any resources associated to the context
     * previously returned by the acquireContext() method.
     * @param {CanvasRenderingContext2D} context - The context2d instance
     * @returns {boolean} true if the method succeeded, else false
     */
    releaseContext: function releaseContext() {},

    /**
     * Registers the specified listener on the given chart.
     * @param {Chart} chart - Chart from which to listen for event
     * @param {string} type - The ({@link IEvent}) type to listen for
     * @param {function} listener - Receives a notification (an object that implements
     * the {@link IEvent} interface) when an event of the specified type occurs.
     */
    addEventListener: function addEventListener() {},

    /**
     * Removes the specified listener previously registered with addEventListener.
     * @param {Chart} chart - Chart from which to remove the listener
     * @param {string} type - The ({@link IEvent}) type to remove
     * @param {function} listener - The listener function to remove from the event target.
     */
    removeEventListener: function removeEventListener() {}
  }, implementation);

  core_defaults._set('global', {
    plugins: {}
  });
  /**
   * The plugin service singleton
   * @namespace Chart.plugins
   * @since 2.1.0
   */


  var core_plugins = {
    /**
     * Globally registered plugins.
     * @private
     */
    _plugins: [],

    /**
     * This identifier is used to invalidate the descriptors cache attached to each chart
     * when a global plugin is registered or unregistered. In this case, the cache ID is
     * incremented and descriptors are regenerated during following API calls.
     * @private
     */
    _cacheId: 0,

    /**
     * Registers the given plugin(s) if not already registered.
     * @param {IPlugin[]|IPlugin} plugins plugin instance(s).
     */
    register: function register(plugins) {
      var p = this._plugins;
      [].concat(plugins).forEach(function (plugin) {
        if (p.indexOf(plugin) === -1) {
          p.push(plugin);
        }
      });
      this._cacheId++;
    },

    /**
     * Unregisters the given plugin(s) only if registered.
     * @param {IPlugin[]|IPlugin} plugins plugin instance(s).
     */
    unregister: function unregister(plugins) {
      var p = this._plugins;
      [].concat(plugins).forEach(function (plugin) {
        var idx = p.indexOf(plugin);

        if (idx !== -1) {
          p.splice(idx, 1);
        }
      });
      this._cacheId++;
    },

    /**
     * Remove all registered plugins.
     * @since 2.1.5
     */
    clear: function clear() {
      this._plugins = [];
      this._cacheId++;
    },

    /**
     * Returns the number of registered plugins?
     * @returns {number}
     * @since 2.1.5
     */
    count: function count() {
      return this._plugins.length;
    },

    /**
     * Returns all registered plugin instances.
     * @returns {IPlugin[]} array of plugin objects.
     * @since 2.1.5
     */
    getAll: function getAll() {
      return this._plugins;
    },

    /**
     * Calls enabled plugins for `chart` on the specified hook and with the given args.
     * This method immediately returns as soon as a plugin explicitly returns false. The
     * returned value can be used, for instance, to interrupt the current action.
     * @param {Chart} chart - The chart instance for which plugins should be called.
     * @param {string} hook - The name of the plugin method to call (e.g. 'beforeUpdate').
     * @param {Array} [args] - Extra arguments to apply to the hook call.
     * @returns {boolean} false if any of the plugins return false, else returns true.
     */
    notify: function notify(chart, hook, args) {
      var descriptors = this.descriptors(chart);
      var ilen = descriptors.length;
      var i, descriptor, plugin, params, method;

      for (i = 0; i < ilen; ++i) {
        descriptor = descriptors[i];
        plugin = descriptor.plugin;
        method = plugin[hook];

        if (typeof method === 'function') {
          params = [chart].concat(args || []);
          params.push(descriptor.options);

          if (method.apply(plugin, params) === false) {
            return false;
          }
        }
      }

      return true;
    },

    /**
     * Returns descriptors of enabled plugins for the given chart.
     * @returns {object[]} [{ plugin, options }]
     * @private
     */
    descriptors: function descriptors(chart) {
      var cache = chart.$plugins || (chart.$plugins = {});

      if (cache.id === this._cacheId) {
        return cache.descriptors;
      }

      var plugins = [];
      var descriptors = [];
      var config = chart && chart.config || {};
      var options = config.options && config.options.plugins || {};

      this._plugins.concat(config.plugins || []).forEach(function (plugin) {
        var idx = plugins.indexOf(plugin);

        if (idx !== -1) {
          return;
        }

        var id = plugin.id;
        var opts = options[id];

        if (opts === false) {
          return;
        }

        if (opts === true) {
          opts = helpers$1.clone(core_defaults.global.plugins[id]);
        }

        plugins.push(plugin);
        descriptors.push({
          plugin: plugin,
          options: opts || {}
        });
      });

      cache.descriptors = descriptors;
      cache.id = this._cacheId;
      return descriptors;
    },

    /**
     * Invalidates cache for the given chart: descriptors hold a reference on plugin option,
     * but in some cases, this reference can be changed by the user when updating options.
     * https://github.com/chartjs/Chart.js/issues/5111#issuecomment-355934167
     * @private
     */
    _invalidate: function _invalidate(chart) {
      delete chart.$plugins;
    }
  };
  var core_scaleService = {
    // Scale registration object. Extensions can register new scale types (such as log or DB scales) and then
    // use the new chart options to grab the correct scale
    constructors: {},
    // Use a registration function so that we can move to an ES6 map when we no longer need to support
    // old browsers
    // Scale config defaults
    defaults: {},
    registerScaleType: function registerScaleType(type, scaleConstructor, scaleDefaults) {
      this.constructors[type] = scaleConstructor;
      this.defaults[type] = helpers$1.clone(scaleDefaults);
    },
    getScaleConstructor: function getScaleConstructor(type) {
      return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
    },
    getScaleDefaults: function getScaleDefaults(type) {
      // Return the scale defaults merged with the global settings so that we always use the latest ones
      return this.defaults.hasOwnProperty(type) ? helpers$1.merge(Object.create(null), [core_defaults.scale, this.defaults[type]]) : {};
    },
    updateScaleDefaults: function updateScaleDefaults(type, additions) {
      var me = this;

      if (me.defaults.hasOwnProperty(type)) {
        me.defaults[type] = helpers$1.extend(me.defaults[type], additions);
      }
    },
    addScalesToLayout: function addScalesToLayout(chart) {
      // Adds each scale to the chart.boxes array to be sized accordingly
      helpers$1.each(chart.scales, function (scale) {
        // Set ILayoutItem parameters for backwards compatibility
        scale.fullWidth = scale.options.fullWidth;
        scale.position = scale.options.position;
        scale.weight = scale.options.weight;
        core_layouts.addBox(chart, scale);
      });
    }
  };
  var valueOrDefault$8 = helpers$1.valueOrDefault;
  var getRtlHelper = helpers$1.rtl.getRtlAdapter;

  core_defaults._set('global', {
    tooltips: {
      enabled: true,
      custom: null,
      mode: 'nearest',
      position: 'average',
      intersect: true,
      backgroundColor: 'rgba(0,0,0,0.8)',
      titleFontStyle: 'bold',
      titleSpacing: 2,
      titleMarginBottom: 6,
      titleFontColor: '#fff',
      titleAlign: 'left',
      bodySpacing: 2,
      bodyFontColor: '#fff',
      bodyAlign: 'left',
      footerFontStyle: 'bold',
      footerSpacing: 2,
      footerMarginTop: 6,
      footerFontColor: '#fff',
      footerAlign: 'left',
      yPadding: 6,
      xPadding: 6,
      caretPadding: 2,
      caretSize: 5,
      cornerRadius: 6,
      multiKeyBackground: '#fff',
      displayColors: true,
      borderColor: 'rgba(0,0,0,0)',
      borderWidth: 0,
      callbacks: {
        // Args are: (tooltipItems, data)
        beforeTitle: helpers$1.noop,
        title: function title(tooltipItems, data) {
          var title = '';
          var labels = data.labels;
          var labelCount = labels ? labels.length : 0;

          if (tooltipItems.length > 0) {
            var item = tooltipItems[0];

            if (item.label) {
              title = item.label;
            } else if (item.xLabel) {
              title = item.xLabel;
            } else if (labelCount > 0 && item.index < labelCount) {
              title = labels[item.index];
            }
          }

          return title;
        },
        afterTitle: helpers$1.noop,
        // Args are: (tooltipItems, data)
        beforeBody: helpers$1.noop,
        // Args are: (tooltipItem, data)
        beforeLabel: helpers$1.noop,
        label: function label(tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';

          if (label) {
            label += ': ';
          }

          if (!helpers$1.isNullOrUndef(tooltipItem.value)) {
            label += tooltipItem.value;
          } else {
            label += tooltipItem.yLabel;
          }

          return label;
        },
        labelColor: function labelColor(tooltipItem, chart) {
          var meta = chart.getDatasetMeta(tooltipItem.datasetIndex);
          var activeElement = meta.data[tooltipItem.index];
          var view = activeElement._view;
          return {
            borderColor: view.borderColor,
            backgroundColor: view.backgroundColor
          };
        },
        labelTextColor: function labelTextColor() {
          return this._options.bodyFontColor;
        },
        afterLabel: helpers$1.noop,
        // Args are: (tooltipItems, data)
        afterBody: helpers$1.noop,
        // Args are: (tooltipItems, data)
        beforeFooter: helpers$1.noop,
        footer: helpers$1.noop,
        afterFooter: helpers$1.noop
      }
    }
  });

  var positioners = {
    /**
     * Average mode places the tooltip at the average position of the elements shown
     * @function Chart.Tooltip.positioners.average
     * @param elements {ChartElement[]} the elements being displayed in the tooltip
     * @returns {object} tooltip position
     */
    average: function average(elements) {
      if (!elements.length) {
        return false;
      }

      var i, len;
      var x = 0;
      var y = 0;
      var count = 0;

      for (i = 0, len = elements.length; i < len; ++i) {
        var el = elements[i];

        if (el && el.hasValue()) {
          var pos = el.tooltipPosition();
          x += pos.x;
          y += pos.y;
          ++count;
        }
      }

      return {
        x: x / count,
        y: y / count
      };
    },

    /**
     * Gets the tooltip position nearest of the item nearest to the event position
     * @function Chart.Tooltip.positioners.nearest
     * @param elements {Chart.Element[]} the tooltip elements
     * @param eventPosition {object} the position of the event in canvas coordinates
     * @returns {object} the tooltip position
     */
    nearest: function nearest(elements, eventPosition) {
      var x = eventPosition.x;
      var y = eventPosition.y;
      var minDistance = Number.POSITIVE_INFINITY;
      var i, len, nearestElement;

      for (i = 0, len = elements.length; i < len; ++i) {
        var el = elements[i];

        if (el && el.hasValue()) {
          var center = el.getCenterPoint();
          var d = helpers$1.distanceBetweenPoints(eventPosition, center);

          if (d < minDistance) {
            minDistance = d;
            nearestElement = el;
          }
        }
      }

      if (nearestElement) {
        var tp = nearestElement.tooltipPosition();
        x = tp.x;
        y = tp.y;
      }

      return {
        x: x,
        y: y
      };
    }
  }; // Helper to push or concat based on if the 2nd parameter is an array or not

  function pushOrConcat(base, toPush) {
    if (toPush) {
      if (helpers$1.isArray(toPush)) {
        // base = base.concat(toPush);
        Array.prototype.push.apply(base, toPush);
      } else {
        base.push(toPush);
      }
    }

    return base;
  }
  /**
   * Returns array of strings split by newline
   * @param {string} value - The value to split by newline.
   * @returns {string[]} value if newline present - Returned from String split() method
   * @function
   */


  function splitNewlines(str) {
    if ((typeof str === 'string' || str instanceof String) && str.indexOf('\n') > -1) {
      return str.split('\n');
    }

    return str;
  }
  /**
   * Private helper to create a tooltip item model
   * @param element - the chart element (point, arc, bar) to create the tooltip item for
   * @return new tooltip item
   */


  function createTooltipItem(element) {
    var xScale = element._xScale;
    var yScale = element._yScale || element._scale; // handle radar || polarArea charts

    var index = element._index;
    var datasetIndex = element._datasetIndex;

    var controller = element._chart.getDatasetMeta(datasetIndex).controller;

    var indexScale = controller._getIndexScale();

    var valueScale = controller._getValueScale();

    return {
      xLabel: xScale ? xScale.getLabelForIndex(index, datasetIndex) : '',
      yLabel: yScale ? yScale.getLabelForIndex(index, datasetIndex) : '',
      label: indexScale ? '' + indexScale.getLabelForIndex(index, datasetIndex) : '',
      value: valueScale ? '' + valueScale.getLabelForIndex(index, datasetIndex) : '',
      index: index,
      datasetIndex: datasetIndex,
      x: element._model.x,
      y: element._model.y
    };
  }
  /**
   * Helper to get the reset model for the tooltip
   * @param tooltipOpts {object} the tooltip options
   */


  function getBaseModel(tooltipOpts) {
    var globalDefaults = core_defaults.global;
    return {
      // Positioning
      xPadding: tooltipOpts.xPadding,
      yPadding: tooltipOpts.yPadding,
      xAlign: tooltipOpts.xAlign,
      yAlign: tooltipOpts.yAlign,
      // Drawing direction and text direction
      rtl: tooltipOpts.rtl,
      textDirection: tooltipOpts.textDirection,
      // Body
      bodyFontColor: tooltipOpts.bodyFontColor,
      _bodyFontFamily: valueOrDefault$8(tooltipOpts.bodyFontFamily, globalDefaults.defaultFontFamily),
      _bodyFontStyle: valueOrDefault$8(tooltipOpts.bodyFontStyle, globalDefaults.defaultFontStyle),
      _bodyAlign: tooltipOpts.bodyAlign,
      bodyFontSize: valueOrDefault$8(tooltipOpts.bodyFontSize, globalDefaults.defaultFontSize),
      bodySpacing: tooltipOpts.bodySpacing,
      // Title
      titleFontColor: tooltipOpts.titleFontColor,
      _titleFontFamily: valueOrDefault$8(tooltipOpts.titleFontFamily, globalDefaults.defaultFontFamily),
      _titleFontStyle: valueOrDefault$8(tooltipOpts.titleFontStyle, globalDefaults.defaultFontStyle),
      titleFontSize: valueOrDefault$8(tooltipOpts.titleFontSize, globalDefaults.defaultFontSize),
      _titleAlign: tooltipOpts.titleAlign,
      titleSpacing: tooltipOpts.titleSpacing,
      titleMarginBottom: tooltipOpts.titleMarginBottom,
      // Footer
      footerFontColor: tooltipOpts.footerFontColor,
      _footerFontFamily: valueOrDefault$8(tooltipOpts.footerFontFamily, globalDefaults.defaultFontFamily),
      _footerFontStyle: valueOrDefault$8(tooltipOpts.footerFontStyle, globalDefaults.defaultFontStyle),
      footerFontSize: valueOrDefault$8(tooltipOpts.footerFontSize, globalDefaults.defaultFontSize),
      _footerAlign: tooltipOpts.footerAlign,
      footerSpacing: tooltipOpts.footerSpacing,
      footerMarginTop: tooltipOpts.footerMarginTop,
      // Appearance
      caretSize: tooltipOpts.caretSize,
      cornerRadius: tooltipOpts.cornerRadius,
      backgroundColor: tooltipOpts.backgroundColor,
      opacity: 0,
      legendColorBackground: tooltipOpts.multiKeyBackground,
      displayColors: tooltipOpts.displayColors,
      borderColor: tooltipOpts.borderColor,
      borderWidth: tooltipOpts.borderWidth
    };
  }
  /**
   * Get the size of the tooltip
   */


  function getTooltipSize(tooltip, model) {
    var ctx = tooltip._chart.ctx;
    var height = model.yPadding * 2; // Tooltip Padding

    var width = 0; // Count of all lines in the body

    var body = model.body;
    var combinedBodyLength = body.reduce(function (count, bodyItem) {
      return count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length;
    }, 0);
    combinedBodyLength += model.beforeBody.length + model.afterBody.length;
    var titleLineCount = model.title.length;
    var footerLineCount = model.footer.length;
    var titleFontSize = model.titleFontSize;
    var bodyFontSize = model.bodyFontSize;
    var footerFontSize = model.footerFontSize;
    height += titleLineCount * titleFontSize; // Title Lines

    height += titleLineCount ? (titleLineCount - 1) * model.titleSpacing : 0; // Title Line Spacing

    height += titleLineCount ? model.titleMarginBottom : 0; // Title's bottom Margin

    height += combinedBodyLength * bodyFontSize; // Body Lines

    height += combinedBodyLength ? (combinedBodyLength - 1) * model.bodySpacing : 0; // Body Line Spacing

    height += footerLineCount ? model.footerMarginTop : 0; // Footer Margin

    height += footerLineCount * footerFontSize; // Footer Lines

    height += footerLineCount ? (footerLineCount - 1) * model.footerSpacing : 0; // Footer Line Spacing
    // Title width

    var widthPadding = 0;

    var maxLineWidth = function maxLineWidth(line) {
      width = Math.max(width, ctx.measureText(line).width + widthPadding);
    };

    ctx.font = helpers$1.fontString(titleFontSize, model._titleFontStyle, model._titleFontFamily);
    helpers$1.each(model.title, maxLineWidth); // Body width

    ctx.font = helpers$1.fontString(bodyFontSize, model._bodyFontStyle, model._bodyFontFamily);
    helpers$1.each(model.beforeBody.concat(model.afterBody), maxLineWidth); // Body lines may include some extra width due to the color box

    widthPadding = model.displayColors ? bodyFontSize + 2 : 0;
    helpers$1.each(body, function (bodyItem) {
      helpers$1.each(bodyItem.before, maxLineWidth);
      helpers$1.each(bodyItem.lines, maxLineWidth);
      helpers$1.each(bodyItem.after, maxLineWidth);
    }); // Reset back to 0

    widthPadding = 0; // Footer width

    ctx.font = helpers$1.fontString(footerFontSize, model._footerFontStyle, model._footerFontFamily);
    helpers$1.each(model.footer, maxLineWidth); // Add padding

    width += 2 * model.xPadding;
    return {
      width: width,
      height: height
    };
  }
  /**
   * Helper to get the alignment of a tooltip given the size
   */


  function determineAlignment(tooltip, size) {
    var model = tooltip._model;
    var chart = tooltip._chart;
    var chartArea = tooltip._chart.chartArea;
    var xAlign = 'center';
    var yAlign = 'center';

    if (model.y < size.height) {
      yAlign = 'top';
    } else if (model.y > chart.height - size.height) {
      yAlign = 'bottom';
    }

    var lf, rf; // functions to determine left, right alignment

    var olf, orf; // functions to determine if left/right alignment causes tooltip to go outside chart

    var yf; // function to get the y alignment if the tooltip goes outside of the left or right edges

    var midX = (chartArea.left + chartArea.right) / 2;
    var midY = (chartArea.top + chartArea.bottom) / 2;

    if (yAlign === 'center') {
      lf = function lf(x) {
        return x <= midX;
      };

      rf = function rf(x) {
        return x > midX;
      };
    } else {
      lf = function lf(x) {
        return x <= size.width / 2;
      };

      rf = function rf(x) {
        return x >= chart.width - size.width / 2;
      };
    }

    olf = function olf(x) {
      return x + size.width + model.caretSize + model.caretPadding > chart.width;
    };

    orf = function orf(x) {
      return x - size.width - model.caretSize - model.caretPadding < 0;
    };

    yf = function yf(y) {
      return y <= midY ? 'top' : 'bottom';
    };

    if (lf(model.x)) {
      xAlign = 'left'; // Is tooltip too wide and goes over the right side of the chart.?

      if (olf(model.x)) {
        xAlign = 'center';
        yAlign = yf(model.y);
      }
    } else if (rf(model.x)) {
      xAlign = 'right'; // Is tooltip too wide and goes outside left edge of canvas?

      if (orf(model.x)) {
        xAlign = 'center';
        yAlign = yf(model.y);
      }
    }

    var opts = tooltip._options;
    return {
      xAlign: opts.xAlign ? opts.xAlign : xAlign,
      yAlign: opts.yAlign ? opts.yAlign : yAlign
    };
  }
  /**
   * Helper to get the location a tooltip needs to be placed at given the initial position (via the vm) and the size and alignment
   */


  function getBackgroundPoint(vm, size, alignment, chart) {
    // Background Position
    var x = vm.x;
    var y = vm.y;
    var caretSize = vm.caretSize;
    var caretPadding = vm.caretPadding;
    var cornerRadius = vm.cornerRadius;
    var xAlign = alignment.xAlign;
    var yAlign = alignment.yAlign;
    var paddingAndSize = caretSize + caretPadding;
    var radiusAndPadding = cornerRadius + caretPadding;

    if (xAlign === 'right') {
      x -= size.width;
    } else if (xAlign === 'center') {
      x -= size.width / 2;

      if (x + size.width > chart.width) {
        x = chart.width - size.width;
      }

      if (x < 0) {
        x = 0;
      }
    }

    if (yAlign === 'top') {
      y += paddingAndSize;
    } else if (yAlign === 'bottom') {
      y -= size.height + paddingAndSize;
    } else {
      y -= size.height / 2;
    }

    if (yAlign === 'center') {
      if (xAlign === 'left') {
        x += paddingAndSize;
      } else if (xAlign === 'right') {
        x -= paddingAndSize;
      }
    } else if (xAlign === 'left') {
      x -= radiusAndPadding;
    } else if (xAlign === 'right') {
      x += radiusAndPadding;
    }

    return {
      x: x,
      y: y
    };
  }

  function getAlignedX(vm, align) {
    return align === 'center' ? vm.x + vm.width / 2 : align === 'right' ? vm.x + vm.width - vm.xPadding : vm.x + vm.xPadding;
  }
  /**
   * Helper to build before and after body lines
   */


  function getBeforeAfterBodyLines(callback) {
    return pushOrConcat([], splitNewlines(callback));
  }

  var exports$4 = core_element.extend({
    initialize: function initialize() {
      this._model = getBaseModel(this._options);
      this._lastActive = [];
    },
    // Get the title
    // Args are: (tooltipItem, data)
    getTitle: function getTitle() {
      var me = this;
      var opts = me._options;
      var callbacks = opts.callbacks;
      var beforeTitle = callbacks.beforeTitle.apply(me, arguments);
      var title = callbacks.title.apply(me, arguments);
      var afterTitle = callbacks.afterTitle.apply(me, arguments);
      var lines = [];
      lines = pushOrConcat(lines, splitNewlines(beforeTitle));
      lines = pushOrConcat(lines, splitNewlines(title));
      lines = pushOrConcat(lines, splitNewlines(afterTitle));
      return lines;
    },
    // Args are: (tooltipItem, data)
    getBeforeBody: function getBeforeBody() {
      return getBeforeAfterBodyLines(this._options.callbacks.beforeBody.apply(this, arguments));
    },
    // Args are: (tooltipItem, data)
    getBody: function getBody(tooltipItems, data) {
      var me = this;
      var callbacks = me._options.callbacks;
      var bodyItems = [];
      helpers$1.each(tooltipItems, function (tooltipItem) {
        var bodyItem = {
          before: [],
          lines: [],
          after: []
        };
        pushOrConcat(bodyItem.before, splitNewlines(callbacks.beforeLabel.call(me, tooltipItem, data)));
        pushOrConcat(bodyItem.lines, callbacks.label.call(me, tooltipItem, data));
        pushOrConcat(bodyItem.after, splitNewlines(callbacks.afterLabel.call(me, tooltipItem, data)));
        bodyItems.push(bodyItem);
      });
      return bodyItems;
    },
    // Args are: (tooltipItem, data)
    getAfterBody: function getAfterBody() {
      return getBeforeAfterBodyLines(this._options.callbacks.afterBody.apply(this, arguments));
    },
    // Get the footer and beforeFooter and afterFooter lines
    // Args are: (tooltipItem, data)
    getFooter: function getFooter() {
      var me = this;
      var callbacks = me._options.callbacks;
      var beforeFooter = callbacks.beforeFooter.apply(me, arguments);
      var footer = callbacks.footer.apply(me, arguments);
      var afterFooter = callbacks.afterFooter.apply(me, arguments);
      var lines = [];
      lines = pushOrConcat(lines, splitNewlines(beforeFooter));
      lines = pushOrConcat(lines, splitNewlines(footer));
      lines = pushOrConcat(lines, splitNewlines(afterFooter));
      return lines;
    },
    update: function update(changed) {
      var me = this;
      var opts = me._options; // Need to regenerate the model because its faster than using extend and it is necessary due to the optimization in Chart.Element.transition
      // that does _view = _model if ease === 1. This causes the 2nd tooltip update to set properties in both the view and model at the same time
      // which breaks any animations.

      var existingModel = me._model;
      var model = me._model = getBaseModel(opts);
      var active = me._active;
      var data = me._data; // In the case where active.length === 0 we need to keep these at existing values for good animations

      var alignment = {
        xAlign: existingModel.xAlign,
        yAlign: existingModel.yAlign
      };
      var backgroundPoint = {
        x: existingModel.x,
        y: existingModel.y
      };
      var tooltipSize = {
        width: existingModel.width,
        height: existingModel.height
      };
      var tooltipPosition = {
        x: existingModel.caretX,
        y: existingModel.caretY
      };
      var i, len;

      if (active.length) {
        model.opacity = 1;
        var labelColors = [];
        var labelTextColors = [];
        tooltipPosition = positioners[opts.position].call(me, active, me._eventPosition);
        var tooltipItems = [];

        for (i = 0, len = active.length; i < len; ++i) {
          tooltipItems.push(createTooltipItem(active[i]));
        } // If the user provided a filter function, use it to modify the tooltip items


        if (opts.filter) {
          tooltipItems = tooltipItems.filter(function (a) {
            return opts.filter(a, data);
          });
        } // If the user provided a sorting function, use it to modify the tooltip items


        if (opts.itemSort) {
          tooltipItems = tooltipItems.sort(function (a, b) {
            return opts.itemSort(a, b, data);
          });
        } // Determine colors for boxes


        helpers$1.each(tooltipItems, function (tooltipItem) {
          labelColors.push(opts.callbacks.labelColor.call(me, tooltipItem, me._chart));
          labelTextColors.push(opts.callbacks.labelTextColor.call(me, tooltipItem, me._chart));
        }); // Build the Text Lines

        model.title = me.getTitle(tooltipItems, data);
        model.beforeBody = me.getBeforeBody(tooltipItems, data);
        model.body = me.getBody(tooltipItems, data);
        model.afterBody = me.getAfterBody(tooltipItems, data);
        model.footer = me.getFooter(tooltipItems, data); // Initial positioning and colors

        model.x = tooltipPosition.x;
        model.y = tooltipPosition.y;
        model.caretPadding = opts.caretPadding;
        model.labelColors = labelColors;
        model.labelTextColors = labelTextColors; // data points

        model.dataPoints = tooltipItems; // We need to determine alignment of the tooltip

        tooltipSize = getTooltipSize(this, model);
        alignment = determineAlignment(this, tooltipSize); // Final Size and Position

        backgroundPoint = getBackgroundPoint(model, tooltipSize, alignment, me._chart);
      } else {
        model.opacity = 0;
      }

      model.xAlign = alignment.xAlign;
      model.yAlign = alignment.yAlign;
      model.x = backgroundPoint.x;
      model.y = backgroundPoint.y;
      model.width = tooltipSize.width;
      model.height = tooltipSize.height; // Point where the caret on the tooltip points to

      model.caretX = tooltipPosition.x;
      model.caretY = tooltipPosition.y;
      me._model = model;

      if (changed && opts.custom) {
        opts.custom.call(me, model);
      }

      return me;
    },
    drawCaret: function drawCaret(tooltipPoint, size) {
      var ctx = this._chart.ctx;
      var vm = this._view;
      var caretPosition = this.getCaretPosition(tooltipPoint, size, vm);
      ctx.lineTo(caretPosition.x1, caretPosition.y1);
      ctx.lineTo(caretPosition.x2, caretPosition.y2);
      ctx.lineTo(caretPosition.x3, caretPosition.y3);
    },
    getCaretPosition: function getCaretPosition(tooltipPoint, size, vm) {
      var x1, x2, x3, y1, y2, y3;
      var caretSize = vm.caretSize;
      var cornerRadius = vm.cornerRadius;
      var xAlign = vm.xAlign;
      var yAlign = vm.yAlign;
      var ptX = tooltipPoint.x;
      var ptY = tooltipPoint.y;
      var width = size.width;
      var height = size.height;

      if (yAlign === 'center') {
        y2 = ptY + height / 2;

        if (xAlign === 'left') {
          x1 = ptX;
          x2 = x1 - caretSize;
          x3 = x1;
          y1 = y2 + caretSize;
          y3 = y2 - caretSize;
        } else {
          x1 = ptX + width;
          x2 = x1 + caretSize;
          x3 = x1;
          y1 = y2 - caretSize;
          y3 = y2 + caretSize;
        }
      } else {
        if (xAlign === 'left') {
          x2 = ptX + cornerRadius + caretSize;
          x1 = x2 - caretSize;
          x3 = x2 + caretSize;
        } else if (xAlign === 'right') {
          x2 = ptX + width - cornerRadius - caretSize;
          x1 = x2 - caretSize;
          x3 = x2 + caretSize;
        } else {
          x2 = vm.caretX;
          x1 = x2 - caretSize;
          x3 = x2 + caretSize;
        }

        if (yAlign === 'top') {
          y1 = ptY;
          y2 = y1 - caretSize;
          y3 = y1;
        } else {
          y1 = ptY + height;
          y2 = y1 + caretSize;
          y3 = y1; // invert drawing order

          var tmp = x3;
          x3 = x1;
          x1 = tmp;
        }
      }

      return {
        x1: x1,
        x2: x2,
        x3: x3,
        y1: y1,
        y2: y2,
        y3: y3
      };
    },
    drawTitle: function drawTitle(pt, vm, ctx) {
      var title = vm.title;
      var length = title.length;
      var titleFontSize, titleSpacing, i;

      if (length) {
        var rtlHelper = getRtlHelper(vm.rtl, vm.x, vm.width);
        pt.x = getAlignedX(vm, vm._titleAlign);
        ctx.textAlign = rtlHelper.textAlign(vm._titleAlign);
        ctx.textBaseline = 'middle';
        titleFontSize = vm.titleFontSize;
        titleSpacing = vm.titleSpacing;
        ctx.fillStyle = vm.titleFontColor;
        ctx.font = helpers$1.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);

        for (i = 0; i < length; ++i) {
          ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFontSize / 2);
          pt.y += titleFontSize + titleSpacing; // Line Height and spacing

          if (i + 1 === length) {
            pt.y += vm.titleMarginBottom - titleSpacing; // If Last, add margin, remove spacing
          }
        }
      }
    },
    drawBody: function drawBody(pt, vm, ctx) {
      var bodyFontSize = vm.bodyFontSize;
      var bodySpacing = vm.bodySpacing;
      var bodyAlign = vm._bodyAlign;
      var body = vm.body;
      var drawColorBoxes = vm.displayColors;
      var xLinePadding = 0;
      var colorX = drawColorBoxes ? getAlignedX(vm, 'left') : 0;
      var rtlHelper = getRtlHelper(vm.rtl, vm.x, vm.width);

      var fillLineOfText = function fillLineOfText(line) {
        ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyFontSize / 2);
        pt.y += bodyFontSize + bodySpacing;
      };

      var bodyItem, textColor, labelColors, lines, i, j, ilen, jlen;
      var bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
      ctx.textAlign = bodyAlign;
      ctx.textBaseline = 'middle';
      ctx.font = helpers$1.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
      pt.x = getAlignedX(vm, bodyAlignForCalculation); // Before body lines

      ctx.fillStyle = vm.bodyFontColor;
      helpers$1.each(vm.beforeBody, fillLineOfText);
      xLinePadding = drawColorBoxes && bodyAlignForCalculation !== 'right' ? bodyAlign === 'center' ? bodyFontSize / 2 + 1 : bodyFontSize + 2 : 0; // Draw body lines now

      for (i = 0, ilen = body.length; i < ilen; ++i) {
        bodyItem = body[i];
        textColor = vm.labelTextColors[i];
        labelColors = vm.labelColors[i];
        ctx.fillStyle = textColor;
        helpers$1.each(bodyItem.before, fillLineOfText);
        lines = bodyItem.lines;

        for (j = 0, jlen = lines.length; j < jlen; ++j) {
          // Draw Legend-like boxes if needed
          if (drawColorBoxes) {
            var rtlColorX = rtlHelper.x(colorX); // Fill a white rect so that colours merge nicely if the opacity is < 1

            ctx.fillStyle = vm.legendColorBackground;
            ctx.fillRect(rtlHelper.leftForLtr(rtlColorX, bodyFontSize), pt.y, bodyFontSize, bodyFontSize); // Border

            ctx.lineWidth = 1;
            ctx.strokeStyle = labelColors.borderColor;
            ctx.strokeRect(rtlHelper.leftForLtr(rtlColorX, bodyFontSize), pt.y, bodyFontSize, bodyFontSize); // Inner square

            ctx.fillStyle = labelColors.backgroundColor;
            ctx.fillRect(rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), bodyFontSize - 2), pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);
            ctx.fillStyle = textColor;
          }

          fillLineOfText(lines[j]);
        }

        helpers$1.each(bodyItem.after, fillLineOfText);
      } // Reset back to 0 for after body


      xLinePadding = 0; // After body lines

      helpers$1.each(vm.afterBody, fillLineOfText);
      pt.y -= bodySpacing; // Remove last body spacing
    },
    drawFooter: function drawFooter(pt, vm, ctx) {
      var footer = vm.footer;
      var length = footer.length;
      var footerFontSize, i;

      if (length) {
        var rtlHelper = getRtlHelper(vm.rtl, vm.x, vm.width);
        pt.x = getAlignedX(vm, vm._footerAlign);
        pt.y += vm.footerMarginTop;
        ctx.textAlign = rtlHelper.textAlign(vm._footerAlign);
        ctx.textBaseline = 'middle';
        footerFontSize = vm.footerFontSize;
        ctx.fillStyle = vm.footerFontColor;
        ctx.font = helpers$1.fontString(footerFontSize, vm._footerFontStyle, vm._footerFontFamily);

        for (i = 0; i < length; ++i) {
          ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFontSize / 2);
          pt.y += footerFontSize + vm.footerSpacing;
        }
      }
    },
    drawBackground: function drawBackground(pt, vm, ctx, tooltipSize) {
      ctx.fillStyle = vm.backgroundColor;
      ctx.strokeStyle = vm.borderColor;
      ctx.lineWidth = vm.borderWidth;
      var xAlign = vm.xAlign;
      var yAlign = vm.yAlign;
      var x = pt.x;
      var y = pt.y;
      var width = tooltipSize.width;
      var height = tooltipSize.height;
      var radius = vm.cornerRadius;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);

      if (yAlign === 'top') {
        this.drawCaret(pt, tooltipSize);
      }

      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);

      if (yAlign === 'center' && xAlign === 'right') {
        this.drawCaret(pt, tooltipSize);
      }

      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);

      if (yAlign === 'bottom') {
        this.drawCaret(pt, tooltipSize);
      }

      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);

      if (yAlign === 'center' && xAlign === 'left') {
        this.drawCaret(pt, tooltipSize);
      }

      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      if (vm.borderWidth > 0) {
        ctx.stroke();
      }
    },
    draw: function draw() {
      var ctx = this._chart.ctx;
      var vm = this._view;

      if (vm.opacity === 0) {
        return;
      }

      var tooltipSize = {
        width: vm.width,
        height: vm.height
      };
      var pt = {
        x: vm.x,
        y: vm.y
      }; // IE11/Edge does not like very small opacities, so snap to 0

      var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity; // Truthy/falsey value for empty tooltip

      var hasTooltipContent = vm.title.length || vm.beforeBody.length || vm.body.length || vm.afterBody.length || vm.footer.length;

      if (this._options.enabled && hasTooltipContent) {
        ctx.save();
        ctx.globalAlpha = opacity; // Draw Background

        this.drawBackground(pt, vm, ctx, tooltipSize); // Draw Title, Body, and Footer

        pt.y += vm.yPadding;
        helpers$1.rtl.overrideTextDirection(ctx, vm.textDirection); // Titles

        this.drawTitle(pt, vm, ctx); // Body

        this.drawBody(pt, vm, ctx); // Footer

        this.drawFooter(pt, vm, ctx);
        helpers$1.rtl.restoreTextDirection(ctx, vm.textDirection);
        ctx.restore();
      }
    },

    /**
     * Handle an event
     * @private
     * @param {IEvent} event - The event to handle
     * @returns {boolean} true if the tooltip changed
     */
    handleEvent: function handleEvent(e) {
      var me = this;
      var options = me._options;
      var changed = false;
      me._lastActive = me._lastActive || []; // Find Active Elements for tooltips

      if (e.type === 'mouseout') {
        me._active = [];
      } else {
        me._active = me._chart.getElementsAtEventForMode(e, options.mode, options);

        if (options.reverse) {
          me._active.reverse();
        }
      } // Remember Last Actives


      changed = !helpers$1.arrayEquals(me._active, me._lastActive); // Only handle target event on tooltip change

      if (changed) {
        me._lastActive = me._active;

        if (options.enabled || options.custom) {
          me._eventPosition = {
            x: e.x,
            y: e.y
          };
          me.update(true);
          me.pivot();
        }
      }

      return changed;
    }
  });
  /**
   * @namespace Chart.Tooltip.positioners
   */

  var positioners_1 = positioners;
  var core_tooltip = exports$4;
  core_tooltip.positioners = positioners_1;
  var valueOrDefault$9 = helpers$1.valueOrDefault;

  core_defaults._set('global', {
    elements: {},
    events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
    hover: {
      onHover: null,
      mode: 'nearest',
      intersect: true,
      animationDuration: 400
    },
    onClick: null,
    maintainAspectRatio: true,
    responsive: true,
    responsiveAnimationDuration: 0
  });
  /**
   * Recursively merge the given config objects representing the `scales` option
   * by incorporating scale defaults in `xAxes` and `yAxes` array items, then
   * returns a deep copy of the result, thus doesn't alter inputs.
   */


  function mergeScaleConfig() {
    return helpers$1.merge(Object.create(null), [].slice.call(arguments), {
      merger: function merger(key, target, source, options) {
        if (key === 'xAxes' || key === 'yAxes') {
          var slen = source[key].length;
          var i, type, scale;

          if (!target[key]) {
            target[key] = [];
          }

          for (i = 0; i < slen; ++i) {
            scale = source[key][i];
            type = valueOrDefault$9(scale.type, key === 'xAxes' ? 'category' : 'linear');

            if (i >= target[key].length) {
              target[key].push({});
            }

            if (!target[key][i].type || scale.type && scale.type !== target[key][i].type) {
              // new/untyped scale or type changed: let's apply the new defaults
              // then merge source scale to correctly overwrite the defaults.
              helpers$1.merge(target[key][i], [core_scaleService.getScaleDefaults(type), scale]);
            } else {
              // scales type are the same
              helpers$1.merge(target[key][i], scale);
            }
          }
        } else {
          helpers$1._merger(key, target, source, options);
        }
      }
    });
  }
  /**
   * Recursively merge the given config objects as the root options by handling
   * default scale options for the `scales` and `scale` properties, then returns
   * a deep copy of the result, thus doesn't alter inputs.
   */


  function mergeConfig() {
    return helpers$1.merge(Object.create(null), [].slice.call(arguments), {
      merger: function merger(key, target, source, options) {
        var tval = target[key] || Object.create(null);
        var sval = source[key];

        if (key === 'scales') {
          // scale config merging is complex. Add our own function here for that
          target[key] = mergeScaleConfig(tval, sval);
        } else if (key === 'scale') {
          // used in polar area & radar charts since there is only one scale
          target[key] = helpers$1.merge(tval, [core_scaleService.getScaleDefaults(sval.type), sval]);
        } else {
          helpers$1._merger(key, target, source, options);
        }
      }
    });
  }

  function initConfig(config) {
    config = config || Object.create(null); // Do NOT use mergeConfig for the data object because this method merges arrays
    // and so would change references to labels and datasets, preventing data updates.

    var data = config.data = config.data || {};
    data.datasets = data.datasets || [];
    data.labels = data.labels || [];
    config.options = mergeConfig(core_defaults.global, core_defaults[config.type], config.options || {});
    return config;
  }

  function updateConfig(chart) {
    var newOptions = chart.options;
    helpers$1.each(chart.scales, function (scale) {
      core_layouts.removeBox(chart, scale);
    });
    newOptions = mergeConfig(core_defaults.global, core_defaults[chart.config.type], newOptions);
    chart.options = chart.config.options = newOptions;
    chart.ensureScalesHaveIDs();
    chart.buildOrUpdateScales(); // Tooltip

    chart.tooltip._options = newOptions.tooltips;
    chart.tooltip.initialize();
  }

  function nextAvailableScaleId(axesOpts, prefix, index) {
    var id;

    var hasId = function hasId(obj) {
      return obj.id === id;
    };

    do {
      id = prefix + index++;
    } while (helpers$1.findIndex(axesOpts, hasId) >= 0);

    return id;
  }

  function positionIsHorizontal(position) {
    return position === 'top' || position === 'bottom';
  }

  function compare2Level(l1, l2) {
    return function (a, b) {
      return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
    };
  }

  var Chart = function Chart(item, config) {
    this.construct(item, config);
    return this;
  };

  helpers$1.extend(Chart.prototype,
  /** @lends Chart */
  {
    /**
     * @private
     */
    construct: function construct(item, config) {
      var me = this;
      config = initConfig(config);
      var context = platform.acquireContext(item, config);
      var canvas = context && context.canvas;
      var height = canvas && canvas.height;
      var width = canvas && canvas.width;
      me.id = helpers$1.uid();
      me.ctx = context;
      me.canvas = canvas;
      me.config = config;
      me.width = width;
      me.height = height;
      me.aspectRatio = height ? width / height : null;
      me.options = config.options;
      me._bufferedRender = false;
      me._layers = [];
      /**
       * Provided for backward compatibility, Chart and Chart.Controller have been merged,
       * the "instance" still need to be defined since it might be called from plugins.
       * @prop Chart#chart
       * @deprecated since version 2.6.0
       * @todo remove at version 3
       * @private
       */

      me.chart = me;
      me.controller = me; // chart.chart.controller #inception
      // Add the chart instance to the global namespace

      Chart.instances[me.id] = me; // Define alias to the config data: `chart.data === chart.config.data`

      Object.defineProperty(me, 'data', {
        get: function get() {
          return me.config.data;
        },
        set: function set(value) {
          me.config.data = value;
        }
      });

      if (!context || !canvas) {
        // The given item is not a compatible context2d element, let's return before finalizing
        // the chart initialization but after setting basic chart / controller properties that
        // can help to figure out that the chart is not valid (e.g chart.canvas !== null);
        // https://github.com/chartjs/Chart.js/issues/2807
        console.error("Failed to create chart: can't acquire context from the given item");
        return;
      }

      me.initialize();
      me.update();
    },

    /**
     * @private
     */
    initialize: function initialize() {
      var me = this; // Before init plugin notification

      core_plugins.notify(me, 'beforeInit');
      helpers$1.retinaScale(me, me.options.devicePixelRatio);
      me.bindEvents();

      if (me.options.responsive) {
        // Initial resize before chart draws (must be silent to preserve initial animations).
        me.resize(true);
      }

      me.initToolTip(); // After init plugin notification

      core_plugins.notify(me, 'afterInit');
      return me;
    },
    clear: function clear() {
      helpers$1.canvas.clear(this);
      return this;
    },
    stop: function stop() {
      // Stops any current animation loop occurring
      core_animations.cancelAnimation(this);
      return this;
    },
    resize: function resize(silent) {
      var me = this;
      var options = me.options;
      var canvas = me.canvas;
      var aspectRatio = options.maintainAspectRatio && me.aspectRatio || null; // the canvas render width and height will be casted to integers so make sure that
      // the canvas display style uses the same integer values to avoid blurring effect.
      // Set to 0 instead of canvas.size because the size defaults to 300x150 if the element is collapsed

      var newWidth = Math.max(0, Math.floor(helpers$1.getMaximumWidth(canvas)));
      var newHeight = Math.max(0, Math.floor(aspectRatio ? newWidth / aspectRatio : helpers$1.getMaximumHeight(canvas)));

      if (me.width === newWidth && me.height === newHeight) {
        return;
      }

      canvas.width = me.width = newWidth;
      canvas.height = me.height = newHeight;
      canvas.style.width = newWidth + 'px';
      canvas.style.height = newHeight + 'px';
      helpers$1.retinaScale(me, options.devicePixelRatio);

      if (!silent) {
        // Notify any plugins about the resize
        var newSize = {
          width: newWidth,
          height: newHeight
        };
        core_plugins.notify(me, 'resize', [newSize]); // Notify of resize

        if (options.onResize) {
          options.onResize(me, newSize);
        }

        me.stop();
        me.update({
          duration: options.responsiveAnimationDuration
        });
      }
    },
    ensureScalesHaveIDs: function ensureScalesHaveIDs() {
      var options = this.options;
      var scalesOptions = options.scales || {};
      var scaleOptions = options.scale;
      helpers$1.each(scalesOptions.xAxes, function (xAxisOptions, index) {
        if (!xAxisOptions.id) {
          xAxisOptions.id = nextAvailableScaleId(scalesOptions.xAxes, 'x-axis-', index);
        }
      });
      helpers$1.each(scalesOptions.yAxes, function (yAxisOptions, index) {
        if (!yAxisOptions.id) {
          yAxisOptions.id = nextAvailableScaleId(scalesOptions.yAxes, 'y-axis-', index);
        }
      });

      if (scaleOptions) {
        scaleOptions.id = scaleOptions.id || 'scale';
      }
    },

    /**
     * Builds a map of scale ID to scale object for future lookup.
     */
    buildOrUpdateScales: function buildOrUpdateScales() {
      var me = this;
      var options = me.options;
      var scales = me.scales || {};
      var items = [];
      var updated = Object.keys(scales).reduce(function (obj, id) {
        obj[id] = false;
        return obj;
      }, {});

      if (options.scales) {
        items = items.concat((options.scales.xAxes || []).map(function (xAxisOptions) {
          return {
            options: xAxisOptions,
            dtype: 'category',
            dposition: 'bottom'
          };
        }), (options.scales.yAxes || []).map(function (yAxisOptions) {
          return {
            options: yAxisOptions,
            dtype: 'linear',
            dposition: 'left'
          };
        }));
      }

      if (options.scale) {
        items.push({
          options: options.scale,
          dtype: 'radialLinear',
          isDefault: true,
          dposition: 'chartArea'
        });
      }

      helpers$1.each(items, function (item) {
        var scaleOptions = item.options;
        var id = scaleOptions.id;
        var scaleType = valueOrDefault$9(scaleOptions.type, item.dtype);

        if (positionIsHorizontal(scaleOptions.position) !== positionIsHorizontal(item.dposition)) {
          scaleOptions.position = item.dposition;
        }

        updated[id] = true;
        var scale = null;

        if (id in scales && scales[id].type === scaleType) {
          scale = scales[id];
          scale.options = scaleOptions;
          scale.ctx = me.ctx;
          scale.chart = me;
        } else {
          var scaleClass = core_scaleService.getScaleConstructor(scaleType);

          if (!scaleClass) {
            return;
          }

          scale = new scaleClass({
            id: id,
            type: scaleType,
            options: scaleOptions,
            ctx: me.ctx,
            chart: me
          });
          scales[scale.id] = scale;
        }

        scale.mergeTicksOptions(); // TODO(SB): I think we should be able to remove this custom case (options.scale)
        // and consider it as a regular scale part of the "scales"" map only! This would
        // make the logic easier and remove some useless? custom code.

        if (item.isDefault) {
          me.scale = scale;
        }
      }); // clear up discarded scales

      helpers$1.each(updated, function (hasUpdated, id) {
        if (!hasUpdated) {
          delete scales[id];
        }
      });
      me.scales = scales;
      core_scaleService.addScalesToLayout(this);
    },
    buildOrUpdateControllers: function buildOrUpdateControllers() {
      var me = this;
      var newControllers = [];
      var datasets = me.data.datasets;
      var i, ilen;

      for (i = 0, ilen = datasets.length; i < ilen; i++) {
        var dataset = datasets[i];
        var meta = me.getDatasetMeta(i);
        var type = dataset.type || me.config.type;

        if (meta.type && meta.type !== type) {
          me.destroyDatasetMeta(i);
          meta = me.getDatasetMeta(i);
        }

        meta.type = type;
        meta.order = dataset.order || 0;
        meta.index = i;

        if (meta.controller) {
          meta.controller.updateIndex(i);
          meta.controller.linkScales();
        } else {
          var ControllerClass = controllers[meta.type];

          if (ControllerClass === undefined) {
            throw new Error('"' + meta.type + '" is not a chart type.');
          }

          meta.controller = new ControllerClass(me, i);
          newControllers.push(meta.controller);
        }
      }

      return newControllers;
    },

    /**
     * Reset the elements of all datasets
     * @private
     */
    resetElements: function resetElements() {
      var me = this;
      helpers$1.each(me.data.datasets, function (dataset, datasetIndex) {
        me.getDatasetMeta(datasetIndex).controller.reset();
      }, me);
    },

    /**
    * Resets the chart back to it's state before the initial animation
    */
    reset: function reset() {
      this.resetElements();
      this.tooltip.initialize();
    },
    update: function update(config) {
      var me = this;
      var i, ilen;

      if (!config || typeof config !== 'object') {
        // backwards compatibility
        config = {
          duration: config,
          lazy: arguments[1]
        };
      }

      updateConfig(me); // plugins options references might have change, let's invalidate the cache
      // https://github.com/chartjs/Chart.js/issues/5111#issuecomment-355934167

      core_plugins._invalidate(me);

      if (core_plugins.notify(me, 'beforeUpdate') === false) {
        return;
      } // In case the entire data object changed


      me.tooltip._data = me.data; // Make sure dataset controllers are updated and new controllers are reset

      var newControllers = me.buildOrUpdateControllers(); // Make sure all dataset controllers have correct meta data counts

      for (i = 0, ilen = me.data.datasets.length; i < ilen; i++) {
        me.getDatasetMeta(i).controller.buildOrUpdateElements();
      }

      me.updateLayout(); // Can only reset the new controllers after the scales have been updated

      if (me.options.animation && me.options.animation.duration) {
        helpers$1.each(newControllers, function (controller) {
          controller.reset();
        });
      }

      me.updateDatasets(); // Need to reset tooltip in case it is displayed with elements that are removed
      // after update.

      me.tooltip.initialize(); // Last active contains items that were previously in the tooltip.
      // When we reset the tooltip, we need to clear it

      me.lastActive = []; // Do this before render so that any plugins that need final scale updates can use it

      core_plugins.notify(me, 'afterUpdate');

      me._layers.sort(compare2Level('z', '_idx'));

      if (me._bufferedRender) {
        me._bufferedRequest = {
          duration: config.duration,
          easing: config.easing,
          lazy: config.lazy
        };
      } else {
        me.render(config);
      }
    },

    /**
     * Updates the chart layout unless a plugin returns `false` to the `beforeLayout`
     * hook, in which case, plugins will not be called on `afterLayout`.
     * @private
     */
    updateLayout: function updateLayout() {
      var me = this;

      if (core_plugins.notify(me, 'beforeLayout') === false) {
        return;
      }

      core_layouts.update(this, this.width, this.height);
      me._layers = [];
      helpers$1.each(me.boxes, function (box) {
        // _configure is called twice, once in core.scale.update and once here.
        // Here the boxes are fully updated and at their final positions.
        if (box._configure) {
          box._configure();
        }

        me._layers.push.apply(me._layers, box._layers());
      }, me);

      me._layers.forEach(function (item, index) {
        item._idx = index;
      });
      /**
       * Provided for backward compatibility, use `afterLayout` instead.
       * @method IPlugin#afterScaleUpdate
       * @deprecated since version 2.5.0
       * @todo remove at version 3
       * @private
       */


      core_plugins.notify(me, 'afterScaleUpdate');
      core_plugins.notify(me, 'afterLayout');
    },

    /**
     * Updates all datasets unless a plugin returns `false` to the `beforeDatasetsUpdate`
     * hook, in which case, plugins will not be called on `afterDatasetsUpdate`.
     * @private
     */
    updateDatasets: function updateDatasets() {
      var me = this;

      if (core_plugins.notify(me, 'beforeDatasetsUpdate') === false) {
        return;
      }

      for (var i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
        me.updateDataset(i);
      }

      core_plugins.notify(me, 'afterDatasetsUpdate');
    },

    /**
     * Updates dataset at index unless a plugin returns `false` to the `beforeDatasetUpdate`
     * hook, in which case, plugins will not be called on `afterDatasetUpdate`.
     * @private
     */
    updateDataset: function updateDataset(index) {
      var me = this;
      var meta = me.getDatasetMeta(index);
      var args = {
        meta: meta,
        index: index
      };

      if (core_plugins.notify(me, 'beforeDatasetUpdate', [args]) === false) {
        return;
      }

      meta.controller._update();

      core_plugins.notify(me, 'afterDatasetUpdate', [args]);
    },
    render: function render(config) {
      var me = this;

      if (!config || typeof config !== 'object') {
        // backwards compatibility
        config = {
          duration: config,
          lazy: arguments[1]
        };
      }

      var animationOptions = me.options.animation;
      var duration = valueOrDefault$9(config.duration, animationOptions && animationOptions.duration);
      var lazy = config.lazy;

      if (core_plugins.notify(me, 'beforeRender') === false) {
        return;
      }

      var onComplete = function onComplete(animation) {
        core_plugins.notify(me, 'afterRender');
        helpers$1.callback(animationOptions && animationOptions.onComplete, [animation], me);
      };

      if (animationOptions && duration) {
        var animation = new core_animation({
          numSteps: duration / 16.66,
          // 60 fps
          easing: config.easing || animationOptions.easing,
          render: function render(chart, animationObject) {
            var easingFunction = helpers$1.easing.effects[animationObject.easing];
            var currentStep = animationObject.currentStep;
            var stepDecimal = currentStep / animationObject.numSteps;
            chart.draw(easingFunction(stepDecimal), stepDecimal, currentStep);
          },
          onAnimationProgress: animationOptions.onProgress,
          onAnimationComplete: onComplete
        });
        core_animations.addAnimation(me, animation, duration, lazy);
      } else {
        me.draw(); // See https://github.com/chartjs/Chart.js/issues/3781

        onComplete(new core_animation({
          numSteps: 0,
          chart: me
        }));
      }

      return me;
    },
    draw: function draw(easingValue) {
      var me = this;
      var i, layers;
      me.clear();

      if (helpers$1.isNullOrUndef(easingValue)) {
        easingValue = 1;
      }

      me.transition(easingValue);

      if (me.width <= 0 || me.height <= 0) {
        return;
      }

      if (core_plugins.notify(me, 'beforeDraw', [easingValue]) === false) {
        return;
      } // Because of plugin hooks (before/afterDatasetsDraw), datasets can't
      // currently be part of layers. Instead, we draw
      // layers <= 0 before(default, backward compat), and the rest after


      layers = me._layers;

      for (i = 0; i < layers.length && layers[i].z <= 0; ++i) {
        layers[i].draw(me.chartArea);
      }

      me.drawDatasets(easingValue); // Rest of layers

      for (; i < layers.length; ++i) {
        layers[i].draw(me.chartArea);
      }

      me._drawTooltip(easingValue);

      core_plugins.notify(me, 'afterDraw', [easingValue]);
    },

    /**
     * @private
     */
    transition: function transition(easingValue) {
      var me = this;

      for (var i = 0, ilen = (me.data.datasets || []).length; i < ilen; ++i) {
        if (me.isDatasetVisible(i)) {
          me.getDatasetMeta(i).controller.transition(easingValue);
        }
      }

      me.tooltip.transition(easingValue);
    },

    /**
     * @private
     */
    _getSortedDatasetMetas: function _getSortedDatasetMetas(filterVisible) {
      var me = this;
      var datasets = me.data.datasets || [];
      var result = [];
      var i, ilen;

      for (i = 0, ilen = datasets.length; i < ilen; ++i) {
        if (!filterVisible || me.isDatasetVisible(i)) {
          result.push(me.getDatasetMeta(i));
        }
      }

      result.sort(compare2Level('order', 'index'));
      return result;
    },

    /**
     * @private
     */
    _getSortedVisibleDatasetMetas: function _getSortedVisibleDatasetMetas() {
      return this._getSortedDatasetMetas(true);
    },

    /**
     * Draws all datasets unless a plugin returns `false` to the `beforeDatasetsDraw`
     * hook, in which case, plugins will not be called on `afterDatasetsDraw`.
     * @private
     */
    drawDatasets: function drawDatasets(easingValue) {
      var me = this;
      var metasets, i;

      if (core_plugins.notify(me, 'beforeDatasetsDraw', [easingValue]) === false) {
        return;
      }

      metasets = me._getSortedVisibleDatasetMetas();

      for (i = metasets.length - 1; i >= 0; --i) {
        me.drawDataset(metasets[i], easingValue);
      }

      core_plugins.notify(me, 'afterDatasetsDraw', [easingValue]);
    },

    /**
     * Draws dataset at index unless a plugin returns `false` to the `beforeDatasetDraw`
     * hook, in which case, plugins will not be called on `afterDatasetDraw`.
     * @private
     */
    drawDataset: function drawDataset(meta, easingValue) {
      var me = this;
      var args = {
        meta: meta,
        index: meta.index,
        easingValue: easingValue
      };

      if (core_plugins.notify(me, 'beforeDatasetDraw', [args]) === false) {
        return;
      }

      meta.controller.draw(easingValue);
      core_plugins.notify(me, 'afterDatasetDraw', [args]);
    },

    /**
     * Draws tooltip unless a plugin returns `false` to the `beforeTooltipDraw`
     * hook, in which case, plugins will not be called on `afterTooltipDraw`.
     * @private
     */
    _drawTooltip: function _drawTooltip(easingValue) {
      var me = this;
      var tooltip = me.tooltip;
      var args = {
        tooltip: tooltip,
        easingValue: easingValue
      };

      if (core_plugins.notify(me, 'beforeTooltipDraw', [args]) === false) {
        return;
      }

      tooltip.draw();
      core_plugins.notify(me, 'afterTooltipDraw', [args]);
    },

    /**
     * Get the single element that was clicked on
     * @return An object containing the dataset index and element index of the matching element. Also contains the rectangle that was draw
     */
    getElementAtEvent: function getElementAtEvent(e) {
      return core_interaction.modes.single(this, e);
    },
    getElementsAtEvent: function getElementsAtEvent(e) {
      return core_interaction.modes.label(this, e, {
        intersect: true
      });
    },
    getElementsAtXAxis: function getElementsAtXAxis(e) {
      return core_interaction.modes['x-axis'](this, e, {
        intersect: true
      });
    },
    getElementsAtEventForMode: function getElementsAtEventForMode(e, mode, options) {
      var method = core_interaction.modes[mode];

      if (typeof method === 'function') {
        return method(this, e, options);
      }

      return [];
    },
    getDatasetAtEvent: function getDatasetAtEvent(e) {
      return core_interaction.modes.dataset(this, e, {
        intersect: true
      });
    },
    getDatasetMeta: function getDatasetMeta(datasetIndex) {
      var me = this;
      var dataset = me.data.datasets[datasetIndex];

      if (!dataset._meta) {
        dataset._meta = {};
      }

      var meta = dataset._meta[me.id];

      if (!meta) {
        meta = dataset._meta[me.id] = {
          type: null,
          data: [],
          dataset: null,
          controller: null,
          hidden: null,
          // See isDatasetVisible() comment
          xAxisID: null,
          yAxisID: null,
          order: dataset.order || 0,
          index: datasetIndex
        };
      }

      return meta;
    },
    getVisibleDatasetCount: function getVisibleDatasetCount() {
      var count = 0;

      for (var i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
        if (this.isDatasetVisible(i)) {
          count++;
        }
      }

      return count;
    },
    isDatasetVisible: function isDatasetVisible(datasetIndex) {
      var meta = this.getDatasetMeta(datasetIndex); // meta.hidden is a per chart dataset hidden flag override with 3 states: if true or false,
      // the dataset.hidden value is ignored, else if null, the dataset hidden state is returned.

      return typeof meta.hidden === 'boolean' ? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
    },
    generateLegend: function generateLegend() {
      return this.options.legendCallback(this);
    },

    /**
     * @private
     */
    destroyDatasetMeta: function destroyDatasetMeta(datasetIndex) {
      var id = this.id;
      var dataset = this.data.datasets[datasetIndex];
      var meta = dataset._meta && dataset._meta[id];

      if (meta) {
        meta.controller.destroy();
        delete dataset._meta[id];
      }
    },
    destroy: function destroy() {
      var me = this;
      var canvas = me.canvas;
      var i, ilen;
      me.stop(); // dataset controllers need to cleanup associated data

      for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
        me.destroyDatasetMeta(i);
      }

      if (canvas) {
        me.unbindEvents();
        helpers$1.canvas.clear(me);
        platform.releaseContext(me.ctx);
        me.canvas = null;
        me.ctx = null;
      }

      core_plugins.notify(me, 'destroy');
      delete Chart.instances[me.id];
    },
    toBase64Image: function toBase64Image() {
      return this.canvas.toDataURL.apply(this.canvas, arguments);
    },
    initToolTip: function initToolTip() {
      var me = this;
      me.tooltip = new core_tooltip({
        _chart: me,
        _chartInstance: me,
        // deprecated, backward compatibility
        _data: me.data,
        _options: me.options.tooltips
      }, me);
    },

    /**
     * @private
     */
    bindEvents: function bindEvents() {
      var me = this;
      var listeners = me._listeners = {};

      var listener = function listener() {
        me.eventHandler.apply(me, arguments);
      };

      helpers$1.each(me.options.events, function (type) {
        platform.addEventListener(me, type, listener);
        listeners[type] = listener;
      }); // Elements used to detect size change should not be injected for non responsive charts.
      // See https://github.com/chartjs/Chart.js/issues/2210

      if (me.options.responsive) {
        listener = function listener() {
          me.resize();
        };

        platform.addEventListener(me, 'resize', listener);
        listeners.resize = listener;
      }
    },

    /**
     * @private
     */
    unbindEvents: function unbindEvents() {
      var me = this;
      var listeners = me._listeners;

      if (!listeners) {
        return;
      }

      delete me._listeners;
      helpers$1.each(listeners, function (listener, type) {
        platform.removeEventListener(me, type, listener);
      });
    },
    updateHoverStyle: function updateHoverStyle(elements, mode, enabled) {
      var prefix = enabled ? 'set' : 'remove';
      var element, i, ilen;

      for (i = 0, ilen = elements.length; i < ilen; ++i) {
        element = elements[i];

        if (element) {
          this.getDatasetMeta(element._datasetIndex).controller[prefix + 'HoverStyle'](element);
        }
      }

      if (mode === 'dataset') {
        this.getDatasetMeta(elements[0]._datasetIndex).controller['_' + prefix + 'DatasetHoverStyle']();
      }
    },

    /**
     * @private
     */
    eventHandler: function eventHandler(e) {
      var me = this;
      var tooltip = me.tooltip;

      if (core_plugins.notify(me, 'beforeEvent', [e]) === false) {
        return;
      } // Buffer any update calls so that renders do not occur


      me._bufferedRender = true;
      me._bufferedRequest = null;
      var changed = me.handleEvent(e); // for smooth tooltip animations issue #4989
      // the tooltip should be the source of change
      // Animation check workaround:
      // tooltip._start will be null when tooltip isn't animating

      if (tooltip) {
        changed = tooltip._start ? tooltip.handleEvent(e) : changed | tooltip.handleEvent(e);
      }

      core_plugins.notify(me, 'afterEvent', [e]);
      var bufferedRequest = me._bufferedRequest;

      if (bufferedRequest) {
        // If we have an update that was triggered, we need to do a normal render
        me.render(bufferedRequest);
      } else if (changed && !me.animating) {
        // If entering, leaving, or changing elements, animate the change via pivot
        me.stop(); // We only need to render at this point. Updating will cause scales to be
        // recomputed generating flicker & using more memory than necessary.

        me.render({
          duration: me.options.hover.animationDuration,
          lazy: true
        });
      }

      me._bufferedRender = false;
      me._bufferedRequest = null;
      return me;
    },

    /**
     * Handle an event
     * @private
     * @param {IEvent} event the event to handle
     * @return {boolean} true if the chart needs to re-render
     */
    handleEvent: function handleEvent(e) {
      var me = this;
      var options = me.options || {};
      var hoverOptions = options.hover;
      var changed = false;
      me.lastActive = me.lastActive || []; // Find Active Elements for hover and tooltips

      if (e.type === 'mouseout') {
        me.active = [];
      } else {
        me.active = me.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions);
      } // Invoke onHover hook
      // Need to call with native event here to not break backwards compatibility


      helpers$1.callback(options.onHover || options.hover.onHover, [e.native, me.active], me);

      if (e.type === 'mouseup' || e.type === 'click') {
        if (options.onClick) {
          // Use e.native here for backwards compatibility
          options.onClick.call(me, e.native, me.active);
        }
      } // Remove styling for last active (even if it may still be active)


      if (me.lastActive.length) {
        me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
      } // Built in hover styling


      if (me.active.length && hoverOptions.mode) {
        me.updateHoverStyle(me.active, hoverOptions.mode, true);
      }

      changed = !helpers$1.arrayEquals(me.active, me.lastActive); // Remember Last Actives

      me.lastActive = me.active;
      return changed;
    }
  });
  /**
   * NOTE(SB) We actually don't use this container anymore but we need to keep it
   * for backward compatibility. Though, it can still be useful for plugins that
   * would need to work on multiple charts?!
   */

  Chart.instances = {};
  var core_controller = Chart; // DEPRECATIONS

  /**
   * Provided for backward compatibility, use Chart instead.
   * @class Chart.Controller
   * @deprecated since version 2.6
   * @todo remove at version 3
   * @private
   */

  Chart.Controller = Chart;
  /**
   * Provided for backward compatibility, not available anymore.
   * @namespace Chart
   * @deprecated since version 2.8
   * @todo remove at version 3
   * @private
   */

  Chart.types = {};
  /**
   * Provided for backward compatibility, not available anymore.
   * @namespace Chart.helpers.configMerge
   * @deprecated since version 2.8.0
   * @todo remove at version 3
   * @private
   */

  helpers$1.configMerge = mergeConfig;
  /**
   * Provided for backward compatibility, not available anymore.
   * @namespace Chart.helpers.scaleMerge
   * @deprecated since version 2.8.0
   * @todo remove at version 3
   * @private
   */

  helpers$1.scaleMerge = mergeScaleConfig;

  var core_helpers = function core_helpers() {
    // -- Basic js utility methods
    helpers$1.where = function (collection, filterCallback) {
      if (helpers$1.isArray(collection) && Array.prototype.filter) {
        return collection.filter(filterCallback);
      }

      var filtered = [];
      helpers$1.each(collection, function (item) {
        if (filterCallback(item)) {
          filtered.push(item);
        }
      });
      return filtered;
    };

    helpers$1.findIndex = Array.prototype.findIndex ? function (array, callback, scope) {
      return array.findIndex(callback, scope);
    } : function (array, callback, scope) {
      scope = scope === undefined ? array : scope;

      for (var i = 0, ilen = array.length; i < ilen; ++i) {
        if (callback.call(scope, array[i], i, array)) {
          return i;
        }
      }

      return -1;
    };

    helpers$1.findNextWhere = function (arrayToSearch, filterCallback, startIndex) {
      // Default to start of the array
      if (helpers$1.isNullOrUndef(startIndex)) {
        startIndex = -1;
      }

      for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
        var currentItem = arrayToSearch[i];

        if (filterCallback(currentItem)) {
          return currentItem;
        }
      }
    };

    helpers$1.findPreviousWhere = function (arrayToSearch, filterCallback, startIndex) {
      // Default to end of the array
      if (helpers$1.isNullOrUndef(startIndex)) {
        startIndex = arrayToSearch.length;
      }

      for (var i = startIndex - 1; i >= 0; i--) {
        var currentItem = arrayToSearch[i];

        if (filterCallback(currentItem)) {
          return currentItem;
        }
      }
    }; // -- Math methods


    helpers$1.isNumber = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };

    helpers$1.almostEquals = function (x, y, epsilon) {
      return Math.abs(x - y) < epsilon;
    };

    helpers$1.almostWhole = function (x, epsilon) {
      var rounded = Math.round(x);
      return rounded - epsilon <= x && rounded + epsilon >= x;
    };

    helpers$1.max = function (array) {
      return array.reduce(function (max, value) {
        if (!isNaN(value)) {
          return Math.max(max, value);
        }

        return max;
      }, Number.NEGATIVE_INFINITY);
    };

    helpers$1.min = function (array) {
      return array.reduce(function (min, value) {
        if (!isNaN(value)) {
          return Math.min(min, value);
        }

        return min;
      }, Number.POSITIVE_INFINITY);
    };

    helpers$1.sign = Math.sign ? function (x) {
      return Math.sign(x);
    } : function (x) {
      x = +x; // convert to a number

      if (x === 0 || isNaN(x)) {
        return x;
      }

      return x > 0 ? 1 : -1;
    };

    helpers$1.toRadians = function (degrees) {
      return degrees * (Math.PI / 180);
    };

    helpers$1.toDegrees = function (radians) {
      return radians * (180 / Math.PI);
    };
    /**
     * Returns the number of decimal places
     * i.e. the number of digits after the decimal point, of the value of this Number.
     * @param {number} x - A number.
     * @returns {number} The number of decimal places.
     * @private
     */


    helpers$1._decimalPlaces = function (x) {
      if (!helpers$1.isFinite(x)) {
        return;
      }

      var e = 1;
      var p = 0;

      while (Math.round(x * e) / e !== x) {
        e *= 10;
        p++;
      }

      return p;
    }; // Gets the angle from vertical upright to the point about a centre.


    helpers$1.getAngleFromPoint = function (centrePoint, anglePoint) {
      var distanceFromXCenter = anglePoint.x - centrePoint.x;
      var distanceFromYCenter = anglePoint.y - centrePoint.y;
      var radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
      var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);

      if (angle < -0.5 * Math.PI) {
        angle += 2.0 * Math.PI; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
      }

      return {
        angle: angle,
        distance: radialDistanceFromCenter
      };
    };

    helpers$1.distanceBetweenPoints = function (pt1, pt2) {
      return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
    };
    /**
     * Provided for backward compatibility, not available anymore
     * @function Chart.helpers.aliasPixel
     * @deprecated since version 2.8.0
     * @todo remove at version 3
     */


    helpers$1.aliasPixel = function (pixelWidth) {
      return pixelWidth % 2 === 0 ? 0 : 0.5;
    };
    /**
     * Returns the aligned pixel value to avoid anti-aliasing blur
     * @param {Chart} chart - The chart instance.
     * @param {number} pixel - A pixel value.
     * @param {number} width - The width of the element.
     * @returns {number} The aligned pixel value.
     * @private
     */


    helpers$1._alignPixel = function (chart, pixel, width) {
      var devicePixelRatio = chart.currentDevicePixelRatio;
      var halfWidth = width / 2;
      return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
    };

    helpers$1.splineCurve = function (firstPoint, middlePoint, afterPoint, t) {
      // Props to Rob Spencer at scaled innovation for his post on splining between points
      // http://scaledinnovation.com/analytics/splines/aboutSplines.html
      // This function must also respect "skipped" points
      var previous = firstPoint.skip ? middlePoint : firstPoint;
      var current = middlePoint;
      var next = afterPoint.skip ? middlePoint : afterPoint;
      var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
      var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));
      var s01 = d01 / (d01 + d12);
      var s12 = d12 / (d01 + d12); // If all points are the same, s01 & s02 will be inf

      s01 = isNaN(s01) ? 0 : s01;
      s12 = isNaN(s12) ? 0 : s12;
      var fa = t * s01; // scaling factor for triangle Ta

      var fb = t * s12;
      return {
        previous: {
          x: current.x - fa * (next.x - previous.x),
          y: current.y - fa * (next.y - previous.y)
        },
        next: {
          x: current.x + fb * (next.x - previous.x),
          y: current.y + fb * (next.y - previous.y)
        }
      };
    };

    helpers$1.EPSILON = Number.EPSILON || 1e-14;

    helpers$1.splineCurveMonotone = function (points) {
      // This function calculates Bézier control points in a similar way than |splineCurve|,
      // but preserves monotonicity of the provided data and ensures no local extremums are added
      // between the dataset discrete points due to the interpolation.
      // See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation
      var pointsWithTangents = (points || []).map(function (point) {
        return {
          model: point._model,
          deltaK: 0,
          mK: 0
        };
      }); // Calculate slopes (deltaK) and initialize tangents (mK)

      var pointsLen = pointsWithTangents.length;
      var i, pointBefore, pointCurrent, pointAfter;

      for (i = 0; i < pointsLen; ++i) {
        pointCurrent = pointsWithTangents[i];

        if (pointCurrent.model.skip) {
          continue;
        }

        pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
        pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;

        if (pointAfter && !pointAfter.model.skip) {
          var slopeDeltaX = pointAfter.model.x - pointCurrent.model.x; // In the case of two points that appear at the same x pixel, slopeDeltaX is 0

          pointCurrent.deltaK = slopeDeltaX !== 0 ? (pointAfter.model.y - pointCurrent.model.y) / slopeDeltaX : 0;
        }

        if (!pointBefore || pointBefore.model.skip) {
          pointCurrent.mK = pointCurrent.deltaK;
        } else if (!pointAfter || pointAfter.model.skip) {
          pointCurrent.mK = pointBefore.deltaK;
        } else if (this.sign(pointBefore.deltaK) !== this.sign(pointCurrent.deltaK)) {
          pointCurrent.mK = 0;
        } else {
          pointCurrent.mK = (pointBefore.deltaK + pointCurrent.deltaK) / 2;
        }
      } // Adjust tangents to ensure monotonic properties


      var alphaK, betaK, tauK, squaredMagnitude;

      for (i = 0; i < pointsLen - 1; ++i) {
        pointCurrent = pointsWithTangents[i];
        pointAfter = pointsWithTangents[i + 1];

        if (pointCurrent.model.skip || pointAfter.model.skip) {
          continue;
        }

        if (helpers$1.almostEquals(pointCurrent.deltaK, 0, this.EPSILON)) {
          pointCurrent.mK = pointAfter.mK = 0;
          continue;
        }

        alphaK = pointCurrent.mK / pointCurrent.deltaK;
        betaK = pointAfter.mK / pointCurrent.deltaK;
        squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);

        if (squaredMagnitude <= 9) {
          continue;
        }

        tauK = 3 / Math.sqrt(squaredMagnitude);
        pointCurrent.mK = alphaK * tauK * pointCurrent.deltaK;
        pointAfter.mK = betaK * tauK * pointCurrent.deltaK;
      } // Compute control points


      var deltaX;

      for (i = 0; i < pointsLen; ++i) {
        pointCurrent = pointsWithTangents[i];

        if (pointCurrent.model.skip) {
          continue;
        }

        pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
        pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;

        if (pointBefore && !pointBefore.model.skip) {
          deltaX = (pointCurrent.model.x - pointBefore.model.x) / 3;
          pointCurrent.model.controlPointPreviousX = pointCurrent.model.x - deltaX;
          pointCurrent.model.controlPointPreviousY = pointCurrent.model.y - deltaX * pointCurrent.mK;
        }

        if (pointAfter && !pointAfter.model.skip) {
          deltaX = (pointAfter.model.x - pointCurrent.model.x) / 3;
          pointCurrent.model.controlPointNextX = pointCurrent.model.x + deltaX;
          pointCurrent.model.controlPointNextY = pointCurrent.model.y + deltaX * pointCurrent.mK;
        }
      }
    };

    helpers$1.nextItem = function (collection, index, loop) {
      if (loop) {
        return index >= collection.length - 1 ? collection[0] : collection[index + 1];
      }

      return index >= collection.length - 1 ? collection[collection.length - 1] : collection[index + 1];
    };

    helpers$1.previousItem = function (collection, index, loop) {
      if (loop) {
        return index <= 0 ? collection[collection.length - 1] : collection[index - 1];
      }

      return index <= 0 ? collection[0] : collection[index - 1];
    }; // Implementation of the nice number algorithm used in determining where axis labels will go


    helpers$1.niceNum = function (range, round) {
      var exponent = Math.floor(helpers$1.log10(range));
      var fraction = range / Math.pow(10, exponent);
      var niceFraction;

      if (round) {
        if (fraction < 1.5) {
          niceFraction = 1;
        } else if (fraction < 3) {
          niceFraction = 2;
        } else if (fraction < 7) {
          niceFraction = 5;
        } else {
          niceFraction = 10;
        }
      } else if (fraction <= 1.0) {
        niceFraction = 1;
      } else if (fraction <= 2) {
        niceFraction = 2;
      } else if (fraction <= 5) {
        niceFraction = 5;
      } else {
        niceFraction = 10;
      }

      return niceFraction * Math.pow(10, exponent);
    }; // Request animation polyfill - https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/


    helpers$1.requestAnimFrame = function () {
      if (typeof window === 'undefined') {
        return function (callback) {
          callback();
        };
      }

      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    }(); // -- DOM methods


    helpers$1.getRelativePosition = function (evt, chart) {
      var mouseX, mouseY;
      var e = evt.originalEvent || evt;
      var canvas = evt.target || evt.srcElement;
      var boundingRect = canvas.getBoundingClientRect();
      var touches = e.touches;

      if (touches && touches.length > 0) {
        mouseX = touches[0].clientX;
        mouseY = touches[0].clientY;
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      } // Scale mouse coordinates into canvas coordinates
      // by following the pattern laid out by 'jerryj' in the comments of
      // https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/


      var paddingLeft = parseFloat(helpers$1.getStyle(canvas, 'padding-left'));
      var paddingTop = parseFloat(helpers$1.getStyle(canvas, 'padding-top'));
      var paddingRight = parseFloat(helpers$1.getStyle(canvas, 'padding-right'));
      var paddingBottom = parseFloat(helpers$1.getStyle(canvas, 'padding-bottom'));
      var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
      var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom; // We divide by the current device pixel ratio, because the canvas is scaled up by that amount in each direction. However
      // the backend model is in unscaled coordinates. Since we are going to deal with our model coordinates, we go back here

      mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / width * canvas.width / chart.currentDevicePixelRatio);
      mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / height * canvas.height / chart.currentDevicePixelRatio);
      return {
        x: mouseX,
        y: mouseY
      };
    }; // Private helper function to convert max-width/max-height values that may be percentages into a number


    function parseMaxStyle(styleValue, node, parentProperty) {
      var valueInPixels;

      if (typeof styleValue === 'string') {
        valueInPixels = parseInt(styleValue, 10);

        if (styleValue.indexOf('%') !== -1) {
          // percentage * size in dimension
          valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
        }
      } else {
        valueInPixels = styleValue;
      }

      return valueInPixels;
    }
    /**
     * Returns if the given value contains an effective constraint.
     * @private
     */


    function isConstrainedValue(value) {
      return value !== undefined && value !== null && value !== 'none';
    }
    /**
     * Returns the max width or height of the given DOM node in a cross-browser compatible fashion
     * @param {HTMLElement} domNode - the node to check the constraint on
     * @param {string} maxStyle - the style that defines the maximum for the direction we are using ('max-width' / 'max-height')
     * @param {string} percentageProperty - property of parent to use when calculating width as a percentage
     * @see {@link https://www.nathanaeljones.com/blog/2013/reading-max-width-cross-browser}
     */


    function getConstraintDimension(domNode, maxStyle, percentageProperty) {
      var view = document.defaultView;

      var parentNode = helpers$1._getParentNode(domNode);

      var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
      var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
      var hasCNode = isConstrainedValue(constrainedNode);
      var hasCContainer = isConstrainedValue(constrainedContainer);
      var infinity = Number.POSITIVE_INFINITY;

      if (hasCNode || hasCContainer) {
        return Math.min(hasCNode ? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity, hasCContainer ? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity);
      }

      return 'none';
    } // returns Number or undefined if no constraint


    helpers$1.getConstraintWidth = function (domNode) {
      return getConstraintDimension(domNode, 'max-width', 'clientWidth');
    }; // returns Number or undefined if no constraint


    helpers$1.getConstraintHeight = function (domNode) {
      return getConstraintDimension(domNode, 'max-height', 'clientHeight');
    };
    /**
     * @private
    	 */


    helpers$1._calculatePadding = function (container, padding, parentDimension) {
      padding = helpers$1.getStyle(container, padding);
      return padding.indexOf('%') > -1 ? parentDimension * parseInt(padding, 10) / 100 : parseInt(padding, 10);
    };
    /**
     * @private
     */


    helpers$1._getParentNode = function (domNode) {
      var parent = domNode.parentNode;

      if (parent && parent.toString() === '[object ShadowRoot]') {
        parent = parent.host;
      }

      return parent;
    };

    helpers$1.getMaximumWidth = function (domNode) {
      var container = helpers$1._getParentNode(domNode);

      if (!container) {
        return domNode.clientWidth;
      }

      var clientWidth = container.clientWidth;

      var paddingLeft = helpers$1._calculatePadding(container, 'padding-left', clientWidth);

      var paddingRight = helpers$1._calculatePadding(container, 'padding-right', clientWidth);

      var w = clientWidth - paddingLeft - paddingRight;
      var cw = helpers$1.getConstraintWidth(domNode);
      return isNaN(cw) ? w : Math.min(w, cw);
    };

    helpers$1.getMaximumHeight = function (domNode) {
      var container = helpers$1._getParentNode(domNode);

      if (!container) {
        return domNode.clientHeight;
      }

      var clientHeight = container.clientHeight;

      var paddingTop = helpers$1._calculatePadding(container, 'padding-top', clientHeight);

      var paddingBottom = helpers$1._calculatePadding(container, 'padding-bottom', clientHeight);

      var h = clientHeight - paddingTop - paddingBottom;
      var ch = helpers$1.getConstraintHeight(domNode);
      return isNaN(ch) ? h : Math.min(h, ch);
    };

    helpers$1.getStyle = function (el, property) {
      return el.currentStyle ? el.currentStyle[property] : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
    };

    helpers$1.retinaScale = function (chart, forceRatio) {
      var pixelRatio = chart.currentDevicePixelRatio = forceRatio || typeof window !== 'undefined' && window.devicePixelRatio || 1;

      if (pixelRatio === 1) {
        return;
      }

      var canvas = chart.canvas;
      var height = chart.height;
      var width = chart.width;
      canvas.height = height * pixelRatio;
      canvas.width = width * pixelRatio;
      chart.ctx.scale(pixelRatio, pixelRatio); // If no style has been set on the canvas, the render size is used as display size,
      // making the chart visually bigger, so let's enforce it to the "correct" values.
      // See https://github.com/chartjs/Chart.js/issues/3575

      if (!canvas.style.height && !canvas.style.width) {
        canvas.style.height = height + 'px';
        canvas.style.width = width + 'px';
      }
    }; // -- Canvas methods


    helpers$1.fontString = function (pixelSize, fontStyle, fontFamily) {
      return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
    };

    helpers$1.longestText = function (ctx, font, arrayOfThings, cache) {
      cache = cache || {};
      var data = cache.data = cache.data || {};
      var gc = cache.garbageCollect = cache.garbageCollect || [];

      if (cache.font !== font) {
        data = cache.data = {};
        gc = cache.garbageCollect = [];
        cache.font = font;
      }

      ctx.font = font;
      var longest = 0;
      var ilen = arrayOfThings.length;
      var i, j, jlen, thing, nestedThing;

      for (i = 0; i < ilen; i++) {
        thing = arrayOfThings[i]; // Undefined strings and arrays should not be measured

        if (thing !== undefined && thing !== null && helpers$1.isArray(thing) !== true) {
          longest = helpers$1.measureText(ctx, data, gc, longest, thing);
        } else if (helpers$1.isArray(thing)) {
          // if it is an array lets measure each element
          // to do maybe simplify this function a bit so we can do this more recursively?
          for (j = 0, jlen = thing.length; j < jlen; j++) {
            nestedThing = thing[j]; // Undefined strings and arrays should not be measured

            if (nestedThing !== undefined && nestedThing !== null && !helpers$1.isArray(nestedThing)) {
              longest = helpers$1.measureText(ctx, data, gc, longest, nestedThing);
            }
          }
        }
      }

      var gcLen = gc.length / 2;

      if (gcLen > arrayOfThings.length) {
        for (i = 0; i < gcLen; i++) {
          delete data[gc[i]];
        }

        gc.splice(0, gcLen);
      }

      return longest;
    };

    helpers$1.measureText = function (ctx, data, gc, longest, string) {
      var textWidth = data[string];

      if (!textWidth) {
        textWidth = data[string] = ctx.measureText(string).width;
        gc.push(string);
      }

      if (textWidth > longest) {
        longest = textWidth;
      }

      return longest;
    };
    /**
     * @deprecated
     */


    helpers$1.numberOfLabelLines = function (arrayOfThings) {
      var numberOfLines = 1;
      helpers$1.each(arrayOfThings, function (thing) {
        if (helpers$1.isArray(thing)) {
          if (thing.length > numberOfLines) {
            numberOfLines = thing.length;
          }
        }
      });
      return numberOfLines;
    };

    helpers$1.color = !chartjsColor ? function (value) {
      console.error('Color.js not found!');
      return value;
    } : function (value) {
      /* global CanvasGradient */
      if (value instanceof CanvasGradient) {
        value = core_defaults.global.defaultColor;
      }

      return chartjsColor(value);
    };

    helpers$1.getHoverColor = function (colorValue) {
      /* global CanvasPattern */
      return colorValue instanceof CanvasPattern || colorValue instanceof CanvasGradient ? colorValue : helpers$1.color(colorValue).saturate(0.5).darken(0.1).rgbString();
    };
  };

  function abstract() {
    throw new Error('This method is not implemented: either no adapter can ' + 'be found or an incomplete integration was provided.');
  }
  /**
   * Date adapter (current used by the time scale)
   * @namespace Chart._adapters._date
   * @memberof Chart._adapters
   * @private
   */

  /**
   * Currently supported unit string values.
   * @typedef {('millisecond'|'second'|'minute'|'hour'|'day'|'week'|'month'|'quarter'|'year')}
   * @memberof Chart._adapters._date
   * @name Unit
   */

  /**
   * @class
   */


  function DateAdapter(options) {
    this.options = options || {};
  }

  helpers$1.extend(DateAdapter.prototype,
  /** @lends DateAdapter */
  {
    /**
     * Returns a map of time formats for the supported formatting units defined
     * in Unit as well as 'datetime' representing a detailed date/time string.
     * @returns {{string: string}}
     */
    formats: abstract,

    /**
     * Parses the given `value` and return the associated timestamp.
     * @param {any} value - the value to parse (usually comes from the data)
     * @param {string} [format] - the expected data format
     * @returns {(number|null)}
     * @function
     */
    parse: abstract,

    /**
     * Returns the formatted date in the specified `format` for a given `timestamp`.
     * @param {number} timestamp - the timestamp to format
     * @param {string} format - the date/time token
     * @return {string}
     * @function
     */
    format: abstract,

    /**
     * Adds the specified `amount` of `unit` to the given `timestamp`.
     * @param {number} timestamp - the input timestamp
     * @param {number} amount - the amount to add
     * @param {Unit} unit - the unit as string
     * @return {number}
     * @function
     */
    add: abstract,

    /**
     * Returns the number of `unit` between the given timestamps.
     * @param {number} max - the input timestamp (reference)
     * @param {number} min - the timestamp to substract
     * @param {Unit} unit - the unit as string
     * @return {number}
     * @function
     */
    diff: abstract,

    /**
     * Returns start of `unit` for the given `timestamp`.
     * @param {number} timestamp - the input timestamp
     * @param {Unit} unit - the unit as string
     * @param {number} [weekday] - the ISO day of the week with 1 being Monday
     * and 7 being Sunday (only needed if param *unit* is `isoWeek`).
     * @function
     */
    startOf: abstract,

    /**
     * Returns end of `unit` for the given `timestamp`.
     * @param {number} timestamp - the input timestamp
     * @param {Unit} unit - the unit as string
     * @function
     */
    endOf: abstract,
    // DEPRECATIONS

    /**
     * Provided for backward compatibility for scale.getValueForPixel(),
     * this method should be overridden only by the moment adapter.
     * @deprecated since version 2.8.0
     * @todo remove at version 3
     * @private
     */
    _create: function _create(value) {
      return value;
    }
  });

  DateAdapter.override = function (members) {
    helpers$1.extend(DateAdapter.prototype, members);
  };

  var _date = DateAdapter;
  var core_adapters = {
    _date: _date
  };
  /**
   * Namespace to hold static tick generation functions
   * @namespace Chart.Ticks
   */

  var core_ticks = {
    /**
     * Namespace to hold formatters for different types of ticks
     * @namespace Chart.Ticks.formatters
     */
    formatters: {
      /**
       * Formatter for value labels
       * @method Chart.Ticks.formatters.values
       * @param value the value to display
       * @return {string|string[]} the label to display
       */
      values: function values(value) {
        return helpers$1.isArray(value) ? value : '' + value;
      },

      /**
       * Formatter for linear numeric ticks
       * @method Chart.Ticks.formatters.linear
       * @param tickValue {number} the value to be formatted
       * @param index {number} the position of the tickValue parameter in the ticks array
       * @param ticks {number[]} the list of ticks being converted
       * @return {string} string representation of the tickValue parameter
       */
      linear: function linear(tickValue, index, ticks) {
        // If we have lots of ticks, don't use the ones
        var delta = ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0]; // If we have a number like 2.5 as the delta, figure out how many decimal places we need

        if (Math.abs(delta) > 1) {
          if (tickValue !== Math.floor(tickValue)) {
            // not an integer
            delta = tickValue - Math.floor(tickValue);
          }
        }

        var logDelta = helpers$1.log10(Math.abs(delta));
        var tickString = '';

        if (tickValue !== 0) {
          var maxTick = Math.max(Math.abs(ticks[0]), Math.abs(ticks[ticks.length - 1]));

          if (maxTick < 1e-4) {
            // all ticks are small numbers; use scientific notation
            var logTick = helpers$1.log10(Math.abs(tickValue));
            var numExponential = Math.floor(logTick) - Math.floor(logDelta);
            numExponential = Math.max(Math.min(numExponential, 20), 0);
            tickString = tickValue.toExponential(numExponential);
          } else {
            var numDecimal = -1 * Math.floor(logDelta);
            numDecimal = Math.max(Math.min(numDecimal, 20), 0); // toFixed has a max of 20 decimal places

            tickString = tickValue.toFixed(numDecimal);
          }
        } else {
          tickString = '0'; // never show decimal places for 0
        }

        return tickString;
      },
      logarithmic: function logarithmic(tickValue, index, ticks) {
        var remain = tickValue / Math.pow(10, Math.floor(helpers$1.log10(tickValue)));

        if (tickValue === 0) {
          return '0';
        } else if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === ticks.length - 1) {
          return tickValue.toExponential();
        }

        return '';
      }
    }
  };
  var isArray = helpers$1.isArray;
  var isNullOrUndef = helpers$1.isNullOrUndef;
  var valueOrDefault$a = helpers$1.valueOrDefault;
  var valueAtIndexOrDefault = helpers$1.valueAtIndexOrDefault;

  core_defaults._set('scale', {
    display: true,
    position: 'left',
    offset: false,
    // grid line settings
    gridLines: {
      display: true,
      color: 'rgba(0,0,0,0.1)',
      lineWidth: 1,
      drawBorder: true,
      drawOnChartArea: true,
      drawTicks: true,
      tickMarkLength: 10,
      zeroLineWidth: 1,
      zeroLineColor: 'rgba(0,0,0,0.25)',
      zeroLineBorderDash: [],
      zeroLineBorderDashOffset: 0.0,
      offsetGridLines: false,
      borderDash: [],
      borderDashOffset: 0.0
    },
    // scale label
    scaleLabel: {
      // display property
      display: false,
      // actual label
      labelString: '',
      // top/bottom padding
      padding: {
        top: 4,
        bottom: 4
      }
    },
    // label settings
    ticks: {
      beginAtZero: false,
      minRotation: 0,
      maxRotation: 50,
      mirror: false,
      padding: 0,
      reverse: false,
      display: true,
      autoSkip: true,
      autoSkipPadding: 0,
      labelOffset: 0,
      // We pass through arrays to be rendered as multiline labels, we convert Others to strings here.
      callback: core_ticks.formatters.values,
      minor: {},
      major: {}
    }
  });
  /** Returns a new array containing numItems from arr */


  function sample(arr, numItems) {
    var result = [];
    var increment = arr.length / numItems;
    var i = 0;
    var len = arr.length;

    for (; i < len; i += increment) {
      result.push(arr[Math.floor(i)]);
    }

    return result;
  }

  function getPixelForGridLine(scale, index, offsetGridLines) {
    var length = scale.getTicks().length;
    var validIndex = Math.min(index, length - 1);
    var lineValue = scale.getPixelForTick(validIndex);
    var start = scale._startPixel;
    var end = scale._endPixel;
    var epsilon = 1e-6; // 1e-6 is margin in pixels for accumulated error.

    var offset;

    if (offsetGridLines) {
      if (length === 1) {
        offset = Math.max(lineValue - start, end - lineValue);
      } else if (index === 0) {
        offset = (scale.getPixelForTick(1) - lineValue) / 2;
      } else {
        offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
      }

      lineValue += validIndex < index ? offset : -offset; // Return undefined if the pixel is out of the range

      if (lineValue < start - epsilon || lineValue > end + epsilon) {
        return;
      }
    }

    return lineValue;
  }

  function garbageCollect(caches, length) {
    helpers$1.each(caches, function (cache) {
      var gc = cache.gc;
      var gcLen = gc.length / 2;
      var i;

      if (gcLen > length) {
        for (i = 0; i < gcLen; ++i) {
          delete cache.data[gc[i]];
        }

        gc.splice(0, gcLen);
      }
    });
  }
  /**
   * Returns {width, height, offset} objects for the first, last, widest, highest tick
   * labels where offset indicates the anchor point offset from the top in pixels.
   */


  function computeLabelSizes(ctx, tickFonts, ticks, caches) {
    var length = ticks.length;
    var widths = [];
    var heights = [];
    var offsets = [];
    var widestLabelSize = 0;
    var highestLabelSize = 0;
    var i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel, widest, highest;

    for (i = 0; i < length; ++i) {
      label = ticks[i].label;
      tickFont = ticks[i].major ? tickFonts.major : tickFonts.minor;
      ctx.font = fontString = tickFont.string;
      cache = caches[fontString] = caches[fontString] || {
        data: {},
        gc: []
      };
      lineHeight = tickFont.lineHeight;
      width = height = 0; // Undefined labels and arrays should not be measured

      if (!isNullOrUndef(label) && !isArray(label)) {
        width = helpers$1.measureText(ctx, cache.data, cache.gc, width, label);
        height = lineHeight;
      } else if (isArray(label)) {
        // if it is an array let's measure each element
        for (j = 0, jlen = label.length; j < jlen; ++j) {
          nestedLabel = label[j]; // Undefined labels and arrays should not be measured

          if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
            width = helpers$1.measureText(ctx, cache.data, cache.gc, width, nestedLabel);
            height += lineHeight;
          }
        }
      }

      widths.push(width);
      heights.push(height);
      offsets.push(lineHeight / 2);
      widestLabelSize = Math.max(width, widestLabelSize);
      highestLabelSize = Math.max(height, highestLabelSize);
    }

    garbageCollect(caches, length);
    widest = widths.indexOf(widestLabelSize);
    highest = heights.indexOf(highestLabelSize);

    function valueAt(idx) {
      return {
        width: widths[idx] || 0,
        height: heights[idx] || 0,
        offset: offsets[idx] || 0
      };
    }

    return {
      first: valueAt(0),
      last: valueAt(length - 1),
      widest: valueAt(widest),
      highest: valueAt(highest)
    };
  }

  function getTickMarkLength(options) {
    return options.drawTicks ? options.tickMarkLength : 0;
  }

  function getScaleLabelHeight(options) {
    var font, padding;

    if (!options.display) {
      return 0;
    }

    font = helpers$1.options._parseFont(options);
    padding = helpers$1.options.toPadding(options.padding);
    return font.lineHeight + padding.height;
  }

  function parseFontOptions(options, nestedOpts) {
    return helpers$1.extend(helpers$1.options._parseFont({
      fontFamily: valueOrDefault$a(nestedOpts.fontFamily, options.fontFamily),
      fontSize: valueOrDefault$a(nestedOpts.fontSize, options.fontSize),
      fontStyle: valueOrDefault$a(nestedOpts.fontStyle, options.fontStyle),
      lineHeight: valueOrDefault$a(nestedOpts.lineHeight, options.lineHeight)
    }), {
      color: helpers$1.options.resolve([nestedOpts.fontColor, options.fontColor, core_defaults.global.defaultFontColor])
    });
  }

  function parseTickFontOptions(options) {
    var minor = parseFontOptions(options, options.minor);
    var major = options.major.enabled ? parseFontOptions(options, options.major) : minor;
    return {
      minor: minor,
      major: major
    };
  }

  function nonSkipped(ticksToFilter) {
    var filtered = [];
    var item, index, len;

    for (index = 0, len = ticksToFilter.length; index < len; ++index) {
      item = ticksToFilter[index];

      if (typeof item._index !== 'undefined') {
        filtered.push(item);
      }
    }

    return filtered;
  }

  function getEvenSpacing(arr) {
    var len = arr.length;
    var i, diff;

    if (len < 2) {
      return false;
    }

    for (diff = arr[0], i = 1; i < len; ++i) {
      if (arr[i] - arr[i - 1] !== diff) {
        return false;
      }
    }

    return diff;
  }

  function calculateSpacing(majorIndices, ticks, axisLength, ticksLimit) {
    var evenMajorSpacing = getEvenSpacing(majorIndices);
    var spacing = (ticks.length - 1) / ticksLimit;
    var factors, factor, i, ilen; // If the major ticks are evenly spaced apart, place the minor ticks
    // so that they divide the major ticks into even chunks

    if (!evenMajorSpacing) {
      return Math.max(spacing, 1);
    }

    factors = helpers$1.math._factorize(evenMajorSpacing);

    for (i = 0, ilen = factors.length - 1; i < ilen; i++) {
      factor = factors[i];

      if (factor > spacing) {
        return factor;
      }
    }

    return Math.max(spacing, 1);
  }

  function getMajorIndices(ticks) {
    var result = [];
    var i, ilen;

    for (i = 0, ilen = ticks.length; i < ilen; i++) {
      if (ticks[i].major) {
        result.push(i);
      }
    }

    return result;
  }

  function skipMajors(ticks, majorIndices, spacing) {
    var count = 0;
    var next = majorIndices[0];
    var i, tick;
    spacing = Math.ceil(spacing);

    for (i = 0; i < ticks.length; i++) {
      tick = ticks[i];

      if (i === next) {
        tick._index = i;
        count++;
        next = majorIndices[count * spacing];
      } else {
        delete tick.label;
      }
    }
  }

  function skip(ticks, spacing, majorStart, majorEnd) {
    var start = valueOrDefault$a(majorStart, 0);
    var end = Math.min(valueOrDefault$a(majorEnd, ticks.length), ticks.length);
    var count = 0;
    var length, i, tick, next;
    spacing = Math.ceil(spacing);

    if (majorEnd) {
      length = majorEnd - majorStart;
      spacing = length / Math.floor(length / spacing);
    }

    next = start;

    while (next < 0) {
      count++;
      next = Math.round(start + count * spacing);
    }

    for (i = Math.max(start, 0); i < end; i++) {
      tick = ticks[i];

      if (i === next) {
        tick._index = i;
        count++;
        next = Math.round(start + count * spacing);
      } else {
        delete tick.label;
      }
    }
  }

  var Scale = core_element.extend({
    zeroLineIndex: 0,

    /**
     * Get the padding needed for the scale
     * @method getPadding
     * @private
     * @returns {Padding} the necessary padding
     */
    getPadding: function getPadding() {
      var me = this;
      return {
        left: me.paddingLeft || 0,
        top: me.paddingTop || 0,
        right: me.paddingRight || 0,
        bottom: me.paddingBottom || 0
      };
    },

    /**
     * Returns the scale tick objects ({label, major})
     * @since 2.7
     */
    getTicks: function getTicks() {
      return this._ticks;
    },

    /**
    * @private
    */
    _getLabels: function _getLabels() {
      var data = this.chart.data;
      return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
    },
    // These methods are ordered by lifecyle. Utilities then follow.
    // Any function defined here is inherited by all scale types.
    // Any function can be extended by the scale type

    /**
     * Provided for backward compatibility, not available anymore
     * @function Chart.Scale.mergeTicksOptions
     * @deprecated since version 2.8.0
     * @todo remove at version 3
     */
    mergeTicksOptions: function mergeTicksOptions() {// noop
    },
    beforeUpdate: function beforeUpdate() {
      helpers$1.callback(this.options.beforeUpdate, [this]);
    },

    /**
     * @param {number} maxWidth - the max width in pixels
     * @param {number} maxHeight - the max height in pixels
     * @param {object} margins - the space between the edge of the other scales and edge of the chart
     *   This space comes from two sources:
     *     - padding - space that's required to show the labels at the edges of the scale
     *     - thickness of scales or legends in another orientation
     */
    update: function update(maxWidth, maxHeight, margins) {
      var me = this;
      var tickOpts = me.options.ticks;
      var sampleSize = tickOpts.sampleSize;
      var i, ilen, labels, ticks, samplingEnabled; // Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)

      me.beforeUpdate(); // Absorb the master measurements

      me.maxWidth = maxWidth;
      me.maxHeight = maxHeight;
      me.margins = helpers$1.extend({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }, margins);
      me._ticks = null;
      me.ticks = null;
      me._labelSizes = null;
      me._maxLabelLines = 0;
      me.longestLabelWidth = 0;
      me.longestTextCache = me.longestTextCache || {};
      me._gridLineItems = null;
      me._labelItems = null; // Dimensions

      me.beforeSetDimensions();
      me.setDimensions();
      me.afterSetDimensions(); // Data min/max

      me.beforeDataLimits();
      me.determineDataLimits();
      me.afterDataLimits(); // Ticks - `this.ticks` is now DEPRECATED!
      // Internal ticks are now stored as objects in the PRIVATE `this._ticks` member
      // and must not be accessed directly from outside this class. `this.ticks` being
      // around for long time and not marked as private, we can't change its structure
      // without unexpected breaking changes. If you need to access the scale ticks,
      // use scale.getTicks() instead.

      me.beforeBuildTicks(); // New implementations should return an array of objects but for BACKWARD COMPAT,
      // we still support no return (`this.ticks` internally set by calling this method).

      ticks = me.buildTicks() || []; // Allow modification of ticks in callback.

      ticks = me.afterBuildTicks(ticks) || ticks; // Ensure ticks contains ticks in new tick format

      if ((!ticks || !ticks.length) && me.ticks) {
        ticks = [];

        for (i = 0, ilen = me.ticks.length; i < ilen; ++i) {
          ticks.push({
            value: me.ticks[i],
            major: false
          });
        }
      }

      me._ticks = ticks; // Compute tick rotation and fit using a sampled subset of labels
      // We generally don't need to compute the size of every single label for determining scale size

      samplingEnabled = sampleSize < ticks.length;
      labels = me._convertTicksToLabels(samplingEnabled ? sample(ticks, sampleSize) : ticks); // _configure is called twice, once here, once from core.controller.updateLayout.
      // Here we haven't been positioned yet, but dimensions are correct.
      // Variables set in _configure are needed for calculateTickRotation, and
      // it's ok that coordinates are not correct there, only dimensions matter.

      me._configure(); // Tick Rotation


      me.beforeCalculateTickRotation();
      me.calculateTickRotation();
      me.afterCalculateTickRotation();
      me.beforeFit();
      me.fit();
      me.afterFit(); // Auto-skip

      me._ticksToDraw = tickOpts.display && (tickOpts.autoSkip || tickOpts.source === 'auto') ? me._autoSkip(ticks) : ticks;

      if (samplingEnabled) {
        // Generate labels using all non-skipped ticks
        labels = me._convertTicksToLabels(me._ticksToDraw);
      }

      me.ticks = labels; // BACKWARD COMPATIBILITY
      // IMPORTANT: after this point, we consider that `this.ticks` will NEVER change!

      me.afterUpdate(); // TODO(v3): remove minSize as a public property and return value from all layout boxes. It is unused
      // make maxWidth and maxHeight private

      return me.minSize;
    },

    /**
     * @private
     */
    _configure: function _configure() {
      var me = this;
      var reversePixels = me.options.ticks.reverse;
      var startPixel, endPixel;

      if (me.isHorizontal()) {
        startPixel = me.left;
        endPixel = me.right;
      } else {
        startPixel = me.top;
        endPixel = me.bottom; // by default vertical scales are from bottom to top, so pixels are reversed

        reversePixels = !reversePixels;
      }

      me._startPixel = startPixel;
      me._endPixel = endPixel;
      me._reversePixels = reversePixels;
      me._length = endPixel - startPixel;
    },
    afterUpdate: function afterUpdate() {
      helpers$1.callback(this.options.afterUpdate, [this]);
    },
    //
    beforeSetDimensions: function beforeSetDimensions() {
      helpers$1.callback(this.options.beforeSetDimensions, [this]);
    },
    setDimensions: function setDimensions() {
      var me = this; // Set the unconstrained dimension before label rotation

      if (me.isHorizontal()) {
        // Reset position before calculating rotation
        me.width = me.maxWidth;
        me.left = 0;
        me.right = me.width;
      } else {
        me.height = me.maxHeight; // Reset position before calculating rotation

        me.top = 0;
        me.bottom = me.height;
      } // Reset padding


      me.paddingLeft = 0;
      me.paddingTop = 0;
      me.paddingRight = 0;
      me.paddingBottom = 0;
    },
    afterSetDimensions: function afterSetDimensions() {
      helpers$1.callback(this.options.afterSetDimensions, [this]);
    },
    // Data limits
    beforeDataLimits: function beforeDataLimits() {
      helpers$1.callback(this.options.beforeDataLimits, [this]);
    },
    determineDataLimits: helpers$1.noop,
    afterDataLimits: function afterDataLimits() {
      helpers$1.callback(this.options.afterDataLimits, [this]);
    },
    //
    beforeBuildTicks: function beforeBuildTicks() {
      helpers$1.callback(this.options.beforeBuildTicks, [this]);
    },
    buildTicks: helpers$1.noop,
    afterBuildTicks: function afterBuildTicks(ticks) {
      var me = this; // ticks is empty for old axis implementations here

      if (isArray(ticks) && ticks.length) {
        return helpers$1.callback(me.options.afterBuildTicks, [me, ticks]);
      } // Support old implementations (that modified `this.ticks` directly in buildTicks)


      me.ticks = helpers$1.callback(me.options.afterBuildTicks, [me, me.ticks]) || me.ticks;
      return ticks;
    },
    beforeTickToLabelConversion: function beforeTickToLabelConversion() {
      helpers$1.callback(this.options.beforeTickToLabelConversion, [this]);
    },
    convertTicksToLabels: function convertTicksToLabels() {
      var me = this; // Convert ticks to strings

      var tickOpts = me.options.ticks;
      me.ticks = me.ticks.map(tickOpts.userCallback || tickOpts.callback, this);
    },
    afterTickToLabelConversion: function afterTickToLabelConversion() {
      helpers$1.callback(this.options.afterTickToLabelConversion, [this]);
    },
    //
    beforeCalculateTickRotation: function beforeCalculateTickRotation() {
      helpers$1.callback(this.options.beforeCalculateTickRotation, [this]);
    },
    calculateTickRotation: function calculateTickRotation() {
      var me = this;
      var options = me.options;
      var tickOpts = options.ticks;
      var numTicks = me.getTicks().length;
      var minRotation = tickOpts.minRotation || 0;
      var maxRotation = tickOpts.maxRotation;
      var labelRotation = minRotation;
      var labelSizes, maxLabelWidth, maxLabelHeight, maxWidth, tickWidth, maxHeight, maxLabelDiagonal;

      if (!me._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !me.isHorizontal()) {
        me.labelRotation = minRotation;
        return;
      }

      labelSizes = me._getLabelSizes();
      maxLabelWidth = labelSizes.widest.width;
      maxLabelHeight = labelSizes.highest.height - labelSizes.highest.offset; // Estimate the width of each grid based on the canvas width, the maximum
      // label width and the number of tick intervals

      maxWidth = Math.min(me.maxWidth, me.chart.width - maxLabelWidth);
      tickWidth = options.offset ? me.maxWidth / numTicks : maxWidth / (numTicks - 1); // Allow 3 pixels x2 padding either side for label readability

      if (maxLabelWidth + 6 > tickWidth) {
        tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
        maxHeight = me.maxHeight - getTickMarkLength(options.gridLines) - tickOpts.padding - getScaleLabelHeight(options.scaleLabel);
        maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
        labelRotation = helpers$1.toDegrees(Math.min(Math.asin(Math.min((labelSizes.highest.height + 6) / tickWidth, 1)), Math.asin(Math.min(maxHeight / maxLabelDiagonal, 1)) - Math.asin(maxLabelHeight / maxLabelDiagonal)));
        labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
      }

      me.labelRotation = labelRotation;
    },
    afterCalculateTickRotation: function afterCalculateTickRotation() {
      helpers$1.callback(this.options.afterCalculateTickRotation, [this]);
    },
    //
    beforeFit: function beforeFit() {
      helpers$1.callback(this.options.beforeFit, [this]);
    },
    fit: function fit() {
      var me = this; // Reset

      var minSize = me.minSize = {
        width: 0,
        height: 0
      };
      var chart = me.chart;
      var opts = me.options;
      var tickOpts = opts.ticks;
      var scaleLabelOpts = opts.scaleLabel;
      var gridLineOpts = opts.gridLines;

      var display = me._isVisible();

      var isBottom = opts.position === 'bottom';
      var isHorizontal = me.isHorizontal(); // Width

      if (isHorizontal) {
        minSize.width = me.maxWidth;
      } else if (display) {
        minSize.width = getTickMarkLength(gridLineOpts) + getScaleLabelHeight(scaleLabelOpts);
      } // height


      if (!isHorizontal) {
        minSize.height = me.maxHeight; // fill all the height
      } else if (display) {
        minSize.height = getTickMarkLength(gridLineOpts) + getScaleLabelHeight(scaleLabelOpts);
      } // Don't bother fitting the ticks if we are not showing the labels


      if (tickOpts.display && display) {
        var tickFonts = parseTickFontOptions(tickOpts);

        var labelSizes = me._getLabelSizes();

        var firstLabelSize = labelSizes.first;
        var lastLabelSize = labelSizes.last;
        var widestLabelSize = labelSizes.widest;
        var highestLabelSize = labelSizes.highest;
        var lineSpace = tickFonts.minor.lineHeight * 0.4;
        var tickPadding = tickOpts.padding;

        if (isHorizontal) {
          // A horizontal axis is more constrained by the height.
          var isRotated = me.labelRotation !== 0;
          var angleRadians = helpers$1.toRadians(me.labelRotation);
          var cosRotation = Math.cos(angleRadians);
          var sinRotation = Math.sin(angleRadians);
          var labelHeight = sinRotation * widestLabelSize.width + cosRotation * (highestLabelSize.height - (isRotated ? highestLabelSize.offset : 0)) + (isRotated ? 0 : lineSpace); // padding

          minSize.height = Math.min(me.maxHeight, minSize.height + labelHeight + tickPadding);
          var offsetLeft = me.getPixelForTick(0) - me.left;
          var offsetRight = me.right - me.getPixelForTick(me.getTicks().length - 1);
          var paddingLeft, paddingRight; // Ensure that our ticks are always inside the canvas. When rotated, ticks are right aligned
          // which means that the right padding is dominated by the font height

          if (isRotated) {
            paddingLeft = isBottom ? cosRotation * firstLabelSize.width + sinRotation * firstLabelSize.offset : sinRotation * (firstLabelSize.height - firstLabelSize.offset);
            paddingRight = isBottom ? sinRotation * (lastLabelSize.height - lastLabelSize.offset) : cosRotation * lastLabelSize.width + sinRotation * lastLabelSize.offset;
          } else {
            paddingLeft = firstLabelSize.width / 2;
            paddingRight = lastLabelSize.width / 2;
          } // Adjust padding taking into account changes in offsets
          // and add 3 px to move away from canvas edges


          me.paddingLeft = Math.max((paddingLeft - offsetLeft) * me.width / (me.width - offsetLeft), 0) + 3;
          me.paddingRight = Math.max((paddingRight - offsetRight) * me.width / (me.width - offsetRight), 0) + 3;
        } else {
          // A vertical axis is more constrained by the width. Labels are the
          // dominant factor here, so get that length first and account for padding
          var labelWidth = tickOpts.mirror ? 0 : // use lineSpace for consistency with horizontal axis
          // tickPadding is not implemented for horizontal
          widestLabelSize.width + tickPadding + lineSpace;
          minSize.width = Math.min(me.maxWidth, minSize.width + labelWidth);
          me.paddingTop = firstLabelSize.height / 2;
          me.paddingBottom = lastLabelSize.height / 2;
        }
      }

      me.handleMargins();

      if (isHorizontal) {
        me.width = me._length = chart.width - me.margins.left - me.margins.right;
        me.height = minSize.height;
      } else {
        me.width = minSize.width;
        me.height = me._length = chart.height - me.margins.top - me.margins.bottom;
      }
    },

    /**
     * Handle margins and padding interactions
     * @private
     */
    handleMargins: function handleMargins() {
      var me = this;

      if (me.margins) {
        me.margins.left = Math.max(me.paddingLeft, me.margins.left);
        me.margins.top = Math.max(me.paddingTop, me.margins.top);
        me.margins.right = Math.max(me.paddingRight, me.margins.right);
        me.margins.bottom = Math.max(me.paddingBottom, me.margins.bottom);
      }
    },
    afterFit: function afterFit() {
      helpers$1.callback(this.options.afterFit, [this]);
    },
    // Shared Methods
    isHorizontal: function isHorizontal() {
      var pos = this.options.position;
      return pos === 'top' || pos === 'bottom';
    },
    isFullWidth: function isFullWidth() {
      return this.options.fullWidth;
    },
    // Get the correct value. NaN bad inputs, If the value type is object get the x or y based on whether we are horizontal or not
    getRightValue: function getRightValue(rawValue) {
      // Null and undefined values first
      if (isNullOrUndef(rawValue)) {
        return NaN;
      } // isNaN(object) returns true, so make sure NaN is checking for a number; Discard Infinite values


      if ((typeof rawValue === 'number' || rawValue instanceof Number) && !isFinite(rawValue)) {
        return NaN;
      } // If it is in fact an object, dive in one more level


      if (rawValue) {
        if (this.isHorizontal()) {
          if (rawValue.x !== undefined) {
            return this.getRightValue(rawValue.x);
          }
        } else if (rawValue.y !== undefined) {
          return this.getRightValue(rawValue.y);
        }
      } // Value is good, return it


      return rawValue;
    },
    _convertTicksToLabels: function _convertTicksToLabels(ticks) {
      var me = this;
      var labels, i, ilen;
      me.ticks = ticks.map(function (tick) {
        return tick.value;
      });
      me.beforeTickToLabelConversion(); // New implementations should return the formatted tick labels but for BACKWARD
      // COMPAT, we still support no return (`this.ticks` internally changed by calling
      // this method and supposed to contain only string values).

      labels = me.convertTicksToLabels(ticks) || me.ticks;
      me.afterTickToLabelConversion(); // BACKWARD COMPAT: synchronize `_ticks` with labels (so potentially `this.ticks`)

      for (i = 0, ilen = ticks.length; i < ilen; ++i) {
        ticks[i].label = labels[i];
      }

      return labels;
    },

    /**
     * @private
     */
    _getLabelSizes: function _getLabelSizes() {
      var me = this;
      var labelSizes = me._labelSizes;

      if (!labelSizes) {
        me._labelSizes = labelSizes = computeLabelSizes(me.ctx, parseTickFontOptions(me.options.ticks), me.getTicks(), me.longestTextCache);
        me.longestLabelWidth = labelSizes.widest.width;
      }

      return labelSizes;
    },

    /**
     * @private
     */
    _parseValue: function _parseValue(value) {
      var start, end, min, max;

      if (isArray(value)) {
        start = +this.getRightValue(value[0]);
        end = +this.getRightValue(value[1]);
        min = Math.min(start, end);
        max = Math.max(start, end);
      } else {
        value = +this.getRightValue(value);
        start = undefined;
        end = value;
        min = value;
        max = value;
      }

      return {
        min: min,
        max: max,
        start: start,
        end: end
      };
    },

    /**
    * @private
    */
    _getScaleLabel: function _getScaleLabel(rawValue) {
      var v = this._parseValue(rawValue);

      if (v.start !== undefined) {
        return '[' + v.start + ', ' + v.end + ']';
      }

      return +this.getRightValue(rawValue);
    },

    /**
     * Used to get the value to display in the tooltip for the data at the given index
     * @param index
     * @param datasetIndex
     */
    getLabelForIndex: helpers$1.noop,

    /**
     * Returns the location of the given data point. Value can either be an index or a numerical value
     * The coordinate (0, 0) is at the upper-left corner of the canvas
     * @param value
     * @param index
     * @param datasetIndex
     */
    getPixelForValue: helpers$1.noop,

    /**
     * Used to get the data value from a given pixel. This is the inverse of getPixelForValue
     * The coordinate (0, 0) is at the upper-left corner of the canvas
     * @param pixel
     */
    getValueForPixel: helpers$1.noop,

    /**
     * Returns the location of the tick at the given index
     * The coordinate (0, 0) is at the upper-left corner of the canvas
     */
    getPixelForTick: function getPixelForTick(index) {
      var me = this;
      var offset = me.options.offset;
      var numTicks = me._ticks.length;
      var tickWidth = 1 / Math.max(numTicks - (offset ? 0 : 1), 1);
      return index < 0 || index > numTicks - 1 ? null : me.getPixelForDecimal(index * tickWidth + (offset ? tickWidth / 2 : 0));
    },

    /**
     * Utility for getting the pixel location of a percentage of scale
     * The coordinate (0, 0) is at the upper-left corner of the canvas
     */
    getPixelForDecimal: function getPixelForDecimal(decimal) {
      var me = this;

      if (me._reversePixels) {
        decimal = 1 - decimal;
      }

      return me._startPixel + decimal * me._length;
    },
    getDecimalForPixel: function getDecimalForPixel(pixel) {
      var decimal = (pixel - this._startPixel) / this._length;
      return this._reversePixels ? 1 - decimal : decimal;
    },

    /**
     * Returns the pixel for the minimum chart value
     * The coordinate (0, 0) is at the upper-left corner of the canvas
     */
    getBasePixel: function getBasePixel() {
      return this.getPixelForValue(this.getBaseValue());
    },
    getBaseValue: function getBaseValue() {
      var me = this;
      var min = me.min;
      var max = me.max;
      return me.beginAtZero ? 0 : min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
    },

    /**
     * Returns a subset of ticks to be plotted to avoid overlapping labels.
     * @private
     */
    _autoSkip: function _autoSkip(ticks) {
      var me = this;
      var tickOpts = me.options.ticks;
      var axisLength = me._length;
      var ticksLimit = tickOpts.maxTicksLimit || axisLength / me._tickSize() + 1;
      var majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
      var numMajorIndices = majorIndices.length;
      var first = majorIndices[0];
      var last = majorIndices[numMajorIndices - 1];
      var i, ilen, spacing, avgMajorSpacing; // If there are too many major ticks to display them all

      if (numMajorIndices > ticksLimit) {
        skipMajors(ticks, majorIndices, numMajorIndices / ticksLimit);
        return nonSkipped(ticks);
      }

      spacing = calculateSpacing(majorIndices, ticks, axisLength, ticksLimit);

      if (numMajorIndices > 0) {
        for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) {
          skip(ticks, spacing, majorIndices[i], majorIndices[i + 1]);
        }

        avgMajorSpacing = numMajorIndices > 1 ? (last - first) / (numMajorIndices - 1) : null;
        skip(ticks, spacing, helpers$1.isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
        skip(ticks, spacing, last, helpers$1.isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
        return nonSkipped(ticks);
      }

      skip(ticks, spacing);
      return nonSkipped(ticks);
    },

    /**
     * @private
     */
    _tickSize: function _tickSize() {
      var me = this;
      var optionTicks = me.options.ticks; // Calculate space needed by label in axis direction.

      var rot = helpers$1.toRadians(me.labelRotation);
      var cos = Math.abs(Math.cos(rot));
      var sin = Math.abs(Math.sin(rot));

      var labelSizes = me._getLabelSizes();

      var padding = optionTicks.autoSkipPadding || 0;
      var w = labelSizes ? labelSizes.widest.width + padding : 0;
      var h = labelSizes ? labelSizes.highest.height + padding : 0; // Calculate space needed for 1 tick in axis direction.

      return me.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
    },

    /**
     * @private
     */
    _isVisible: function _isVisible() {
      var me = this;
      var chart = me.chart;
      var display = me.options.display;
      var i, ilen, meta;

      if (display !== 'auto') {
        return !!display;
      } // When 'auto', the scale is visible if at least one associated dataset is visible.


      for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
        if (chart.isDatasetVisible(i)) {
          meta = chart.getDatasetMeta(i);

          if (meta.xAxisID === me.id || meta.yAxisID === me.id) {
            return true;
          }
        }
      }

      return false;
    },

    /**
     * @private
     */
    _computeGridLineItems: function _computeGridLineItems(chartArea) {
      var me = this;
      var chart = me.chart;
      var options = me.options;
      var gridLines = options.gridLines;
      var position = options.position;
      var offsetGridLines = gridLines.offsetGridLines;
      var isHorizontal = me.isHorizontal();
      var ticks = me._ticksToDraw;
      var ticksLength = ticks.length + (offsetGridLines ? 1 : 0);
      var tl = getTickMarkLength(gridLines);
      var items = [];
      var axisWidth = gridLines.drawBorder ? valueAtIndexOrDefault(gridLines.lineWidth, 0, 0) : 0;
      var axisHalfWidth = axisWidth / 2;
      var alignPixel = helpers$1._alignPixel;

      var alignBorderValue = function alignBorderValue(pixel) {
        return alignPixel(chart, pixel, axisWidth);
      };

      var borderValue, i, tick, lineValue, alignedLineValue;
      var tx1, ty1, tx2, ty2, x1, y1, x2, y2, lineWidth, lineColor, borderDash, borderDashOffset;

      if (position === 'top') {
        borderValue = alignBorderValue(me.bottom);
        ty1 = me.bottom - tl;
        ty2 = borderValue - axisHalfWidth;
        y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
        y2 = chartArea.bottom;
      } else if (position === 'bottom') {
        borderValue = alignBorderValue(me.top);
        y1 = chartArea.top;
        y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
        ty1 = borderValue + axisHalfWidth;
        ty2 = me.top + tl;
      } else if (position === 'left') {
        borderValue = alignBorderValue(me.right);
        tx1 = me.right - tl;
        tx2 = borderValue - axisHalfWidth;
        x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
        x2 = chartArea.right;
      } else {
        borderValue = alignBorderValue(me.left);
        x1 = chartArea.left;
        x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
        tx1 = borderValue + axisHalfWidth;
        tx2 = me.left + tl;
      }

      for (i = 0; i < ticksLength; ++i) {
        tick = ticks[i] || {}; // autoskipper skipped this tick (#4635)

        if (isNullOrUndef(tick.label) && i < ticks.length) {
          continue;
        }

        if (i === me.zeroLineIndex && options.offset === offsetGridLines) {
          // Draw the first index specially
          lineWidth = gridLines.zeroLineWidth;
          lineColor = gridLines.zeroLineColor;
          borderDash = gridLines.zeroLineBorderDash || [];
          borderDashOffset = gridLines.zeroLineBorderDashOffset || 0.0;
        } else {
          lineWidth = valueAtIndexOrDefault(gridLines.lineWidth, i, 1);
          lineColor = valueAtIndexOrDefault(gridLines.color, i, 'rgba(0,0,0,0.1)');
          borderDash = gridLines.borderDash || [];
          borderDashOffset = gridLines.borderDashOffset || 0.0;
        }

        lineValue = getPixelForGridLine(me, tick._index || i, offsetGridLines); // Skip if the pixel is out of the range

        if (lineValue === undefined) {
          continue;
        }

        alignedLineValue = alignPixel(chart, lineValue, lineWidth);

        if (isHorizontal) {
          tx1 = tx2 = x1 = x2 = alignedLineValue;
        } else {
          ty1 = ty2 = y1 = y2 = alignedLineValue;
        }

        items.push({
          tx1: tx1,
          ty1: ty1,
          tx2: tx2,
          ty2: ty2,
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          width: lineWidth,
          color: lineColor,
          borderDash: borderDash,
          borderDashOffset: borderDashOffset
        });
      }

      items.ticksLength = ticksLength;
      items.borderValue = borderValue;
      return items;
    },

    /**
     * @private
     */
    _computeLabelItems: function _computeLabelItems() {
      var me = this;
      var options = me.options;
      var optionTicks = options.ticks;
      var position = options.position;
      var isMirrored = optionTicks.mirror;
      var isHorizontal = me.isHorizontal();
      var ticks = me._ticksToDraw;
      var fonts = parseTickFontOptions(optionTicks);
      var tickPadding = optionTicks.padding;
      var tl = getTickMarkLength(options.gridLines);
      var rotation = -helpers$1.toRadians(me.labelRotation);
      var items = [];
      var i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;

      if (position === 'top') {
        y = me.bottom - tl - tickPadding;
        textAlign = !rotation ? 'center' : 'left';
      } else if (position === 'bottom') {
        y = me.top + tl + tickPadding;
        textAlign = !rotation ? 'center' : 'right';
      } else if (position === 'left') {
        x = me.right - (isMirrored ? 0 : tl) - tickPadding;
        textAlign = isMirrored ? 'left' : 'right';
      } else {
        x = me.left + (isMirrored ? 0 : tl) + tickPadding;
        textAlign = isMirrored ? 'right' : 'left';
      }

      for (i = 0, ilen = ticks.length; i < ilen; ++i) {
        tick = ticks[i];
        label = tick.label; // autoskipper skipped this tick (#4635)

        if (isNullOrUndef(label)) {
          continue;
        }

        pixel = me.getPixelForTick(tick._index || i) + optionTicks.labelOffset;
        font = tick.major ? fonts.major : fonts.minor;
        lineHeight = font.lineHeight;
        lineCount = isArray(label) ? label.length : 1;

        if (isHorizontal) {
          x = pixel;
          textOffset = position === 'top' ? ((!rotation ? 0.5 : 1) - lineCount) * lineHeight : (!rotation ? 0.5 : 0) * lineHeight;
        } else {
          y = pixel;
          textOffset = (1 - lineCount) * lineHeight / 2;
        }

        items.push({
          x: x,
          y: y,
          rotation: rotation,
          label: label,
          font: font,
          textOffset: textOffset,
          textAlign: textAlign
        });
      }

      return items;
    },

    /**
     * @private
     */
    _drawGrid: function _drawGrid(chartArea) {
      var me = this;
      var gridLines = me.options.gridLines;

      if (!gridLines.display) {
        return;
      }

      var ctx = me.ctx;
      var chart = me.chart;
      var alignPixel = helpers$1._alignPixel;
      var axisWidth = gridLines.drawBorder ? valueAtIndexOrDefault(gridLines.lineWidth, 0, 0) : 0;

      var items = me._gridLineItems || (me._gridLineItems = me._computeGridLineItems(chartArea));

      var width, color, i, ilen, item;

      for (i = 0, ilen = items.length; i < ilen; ++i) {
        item = items[i];
        width = item.width;
        color = item.color;

        if (width && color) {
          ctx.save();
          ctx.lineWidth = width;
          ctx.strokeStyle = color;

          if (ctx.setLineDash) {
            ctx.setLineDash(item.borderDash);
            ctx.lineDashOffset = item.borderDashOffset;
          }

          ctx.beginPath();

          if (gridLines.drawTicks) {
            ctx.moveTo(item.tx1, item.ty1);
            ctx.lineTo(item.tx2, item.ty2);
          }

          if (gridLines.drawOnChartArea) {
            ctx.moveTo(item.x1, item.y1);
            ctx.lineTo(item.x2, item.y2);
          }

          ctx.stroke();
          ctx.restore();
        }
      }

      if (axisWidth) {
        // Draw the line at the edge of the axis
        var firstLineWidth = axisWidth;
        var lastLineWidth = valueAtIndexOrDefault(gridLines.lineWidth, items.ticksLength - 1, 1);
        var borderValue = items.borderValue;
        var x1, x2, y1, y2;

        if (me.isHorizontal()) {
          x1 = alignPixel(chart, me.left, firstLineWidth) - firstLineWidth / 2;
          x2 = alignPixel(chart, me.right, lastLineWidth) + lastLineWidth / 2;
          y1 = y2 = borderValue;
        } else {
          y1 = alignPixel(chart, me.top, firstLineWidth) - firstLineWidth / 2;
          y2 = alignPixel(chart, me.bottom, lastLineWidth) + lastLineWidth / 2;
          x1 = x2 = borderValue;
        }

        ctx.lineWidth = axisWidth;
        ctx.strokeStyle = valueAtIndexOrDefault(gridLines.color, 0);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    },

    /**
     * @private
     */
    _drawLabels: function _drawLabels() {
      var me = this;
      var optionTicks = me.options.ticks;

      if (!optionTicks.display) {
        return;
      }

      var ctx = me.ctx;

      var items = me._labelItems || (me._labelItems = me._computeLabelItems());

      var i, j, ilen, jlen, item, tickFont, label, y;

      for (i = 0, ilen = items.length; i < ilen; ++i) {
        item = items[i];
        tickFont = item.font; // Make sure we draw text in the correct color and font

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        ctx.font = tickFont.string;
        ctx.fillStyle = tickFont.color;
        ctx.textBaseline = 'middle';
        ctx.textAlign = item.textAlign;
        label = item.label;
        y = item.textOffset;

        if (isArray(label)) {
          for (j = 0, jlen = label.length; j < jlen; ++j) {
            // We just make sure the multiline element is a string here..
            ctx.fillText('' + label[j], 0, y);
            y += tickFont.lineHeight;
          }
        } else {
          ctx.fillText(label, 0, y);
        }

        ctx.restore();
      }
    },

    /**
     * @private
     */
    _drawTitle: function _drawTitle() {
      var me = this;
      var ctx = me.ctx;
      var options = me.options;
      var scaleLabel = options.scaleLabel;

      if (!scaleLabel.display) {
        return;
      }

      var scaleLabelFontColor = valueOrDefault$a(scaleLabel.fontColor, core_defaults.global.defaultFontColor);

      var scaleLabelFont = helpers$1.options._parseFont(scaleLabel);

      var scaleLabelPadding = helpers$1.options.toPadding(scaleLabel.padding);
      var halfLineHeight = scaleLabelFont.lineHeight / 2;
      var position = options.position;
      var rotation = 0;
      var scaleLabelX, scaleLabelY;

      if (me.isHorizontal()) {
        scaleLabelX = me.left + me.width / 2; // midpoint of the width

        scaleLabelY = position === 'bottom' ? me.bottom - halfLineHeight - scaleLabelPadding.bottom : me.top + halfLineHeight + scaleLabelPadding.top;
      } else {
        var isLeft = position === 'left';
        scaleLabelX = isLeft ? me.left + halfLineHeight + scaleLabelPadding.top : me.right - halfLineHeight - scaleLabelPadding.top;
        scaleLabelY = me.top + me.height / 2;
        rotation = isLeft ? -0.5 * Math.PI : 0.5 * Math.PI;
      }

      ctx.save();
      ctx.translate(scaleLabelX, scaleLabelY);
      ctx.rotate(rotation);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = scaleLabelFontColor; // render in correct colour

      ctx.font = scaleLabelFont.string;
      ctx.fillText(scaleLabel.labelString, 0, 0);
      ctx.restore();
    },
    draw: function draw(chartArea) {
      var me = this;

      if (!me._isVisible()) {
        return;
      }

      me._drawGrid(chartArea);

      me._drawTitle();

      me._drawLabels();
    },

    /**
     * @private
     */
    _layers: function _layers() {
      var me = this;
      var opts = me.options;
      var tz = opts.ticks && opts.ticks.z || 0;
      var gz = opts.gridLines && opts.gridLines.z || 0;

      if (!me._isVisible() || tz === gz || me.draw !== me._draw) {
        // backward compatibility: draw has been overridden by custom scale
        return [{
          z: tz,
          draw: function draw() {
            me.draw.apply(me, arguments);
          }
        }];
      }

      return [{
        z: gz,
        draw: function draw() {
          me._drawGrid.apply(me, arguments);

          me._drawTitle.apply(me, arguments);
        }
      }, {
        z: tz,
        draw: function draw() {
          me._drawLabels.apply(me, arguments);
        }
      }];
    },

    /**
     * @private
     */
    _getMatchingVisibleMetas: function _getMatchingVisibleMetas(type) {
      var me = this;
      var isHorizontal = me.isHorizontal();
      return me.chart._getSortedVisibleDatasetMetas().filter(function (meta) {
        return (!type || meta.type === type) && (isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id);
      });
    }
  });
  Scale.prototype._draw = Scale.prototype.draw;
  var core_scale = Scale;
  var isNullOrUndef$1 = helpers$1.isNullOrUndef;
  var defaultConfig = {
    position: 'bottom'
  };
  var scale_category = core_scale.extend({
    determineDataLimits: function determineDataLimits() {
      var me = this;

      var labels = me._getLabels();

      var ticksOpts = me.options.ticks;
      var min = ticksOpts.min;
      var max = ticksOpts.max;
      var minIndex = 0;
      var maxIndex = labels.length - 1;
      var findIndex;

      if (min !== undefined) {
        // user specified min value
        findIndex = labels.indexOf(min);

        if (findIndex >= 0) {
          minIndex = findIndex;
        }
      }

      if (max !== undefined) {
        // user specified max value
        findIndex = labels.indexOf(max);

        if (findIndex >= 0) {
          maxIndex = findIndex;
        }
      }

      me.minIndex = minIndex;
      me.maxIndex = maxIndex;
      me.min = labels[minIndex];
      me.max = labels[maxIndex];
    },
    buildTicks: function buildTicks() {
      var me = this;

      var labels = me._getLabels();

      var minIndex = me.minIndex;
      var maxIndex = me.maxIndex; // If we are viewing some subset of labels, slice the original array

      me.ticks = minIndex === 0 && maxIndex === labels.length - 1 ? labels : labels.slice(minIndex, maxIndex + 1);
    },
    getLabelForIndex: function getLabelForIndex(index, datasetIndex) {
      var me = this;
      var chart = me.chart;

      if (chart.getDatasetMeta(datasetIndex).controller._getValueScaleId() === me.id) {
        return me.getRightValue(chart.data.datasets[datasetIndex].data[index]);
      }

      return me._getLabels()[index];
    },
    _configure: function _configure() {
      var me = this;
      var offset = me.options.offset;
      var ticks = me.ticks;

      core_scale.prototype._configure.call(me);

      if (!me.isHorizontal()) {
        // For backward compatibility, vertical category scale reverse is inverted.
        me._reversePixels = !me._reversePixels;
      }

      if (!ticks) {
        return;
      }

      me._startValue = me.minIndex - (offset ? 0.5 : 0);
      me._valueRange = Math.max(ticks.length - (offset ? 0 : 1), 1);
    },
    // Used to get data value locations.  Value can either be an index or a numerical value
    getPixelForValue: function getPixelForValue(value, index, datasetIndex) {
      var me = this;
      var valueCategory, labels, idx;

      if (!isNullOrUndef$1(index) && !isNullOrUndef$1(datasetIndex)) {
        value = me.chart.data.datasets[datasetIndex].data[index];
      } // If value is a data object, then index is the index in the data array,
      // not the index of the scale. We need to change that.


      if (!isNullOrUndef$1(value)) {
        valueCategory = me.isHorizontal() ? value.x : value.y;
      }

      if (valueCategory !== undefined || value !== undefined && isNaN(index)) {
        labels = me._getLabels();
        value = helpers$1.valueOrDefault(valueCategory, value);
        idx = labels.indexOf(value);
        index = idx !== -1 ? idx : index;

        if (isNaN(index)) {
          index = value;
        }
      }

      return me.getPixelForDecimal((index - me._startValue) / me._valueRange);
    },
    getPixelForTick: function getPixelForTick(index) {
      var ticks = this.ticks;
      return index < 0 || index > ticks.length - 1 ? null : this.getPixelForValue(ticks[index], index + this.minIndex);
    },
    getValueForPixel: function getValueForPixel(pixel) {
      var me = this;
      var value = Math.round(me._startValue + me.getDecimalForPixel(pixel) * me._valueRange);
      return Math.min(Math.max(value, 0), me.ticks.length - 1);
    },
    getBasePixel: function getBasePixel() {
      return this.bottom;
    }
  }); // INTERNAL: static default options, registered in src/index.js

  var _defaults = defaultConfig;
  scale_category._defaults = _defaults;
  var noop = helpers$1.noop;
  var isNullOrUndef$2 = helpers$1.isNullOrUndef;
  /**
   * Generate a set of linear ticks
   * @param generationOptions the options used to generate the ticks
   * @param dataRange the range of the data
   * @returns {number[]} array of tick values
   */

  function generateTicks(generationOptions, dataRange) {
    var ticks = []; // To get a "nice" value for the tick spacing, we will use the appropriately named
    // "nice number" algorithm. See https://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
    // for details.

    var MIN_SPACING = 1e-14;
    var stepSize = generationOptions.stepSize;
    var unit = stepSize || 1;
    var maxNumSpaces = generationOptions.maxTicks - 1;
    var min = generationOptions.min;
    var max = generationOptions.max;
    var precision = generationOptions.precision;
    var rmin = dataRange.min;
    var rmax = dataRange.max;
    var spacing = helpers$1.niceNum((rmax - rmin) / maxNumSpaces / unit) * unit;
    var factor, niceMin, niceMax, numSpaces; // Beyond MIN_SPACING floating point numbers being to lose precision
    // such that we can't do the math necessary to generate ticks

    if (spacing < MIN_SPACING && isNullOrUndef$2(min) && isNullOrUndef$2(max)) {
      return [rmin, rmax];
    }

    numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);

    if (numSpaces > maxNumSpaces) {
      // If the calculated num of spaces exceeds maxNumSpaces, recalculate it
      spacing = helpers$1.niceNum(numSpaces * spacing / maxNumSpaces / unit) * unit;
    }

    if (stepSize || isNullOrUndef$2(precision)) {
      // If a precision is not specified, calculate factor based on spacing
      factor = Math.pow(10, helpers$1._decimalPlaces(spacing));
    } else {
      // If the user specified a precision, round to that number of decimal places
      factor = Math.pow(10, precision);
      spacing = Math.ceil(spacing * factor) / factor;
    }

    niceMin = Math.floor(rmin / spacing) * spacing;
    niceMax = Math.ceil(rmax / spacing) * spacing; // If min, max and stepSize is set and they make an evenly spaced scale use it.

    if (stepSize) {
      // If very close to our whole number, use it.
      if (!isNullOrUndef$2(min) && helpers$1.almostWhole(min / spacing, spacing / 1000)) {
        niceMin = min;
      }

      if (!isNullOrUndef$2(max) && helpers$1.almostWhole(max / spacing, spacing / 1000)) {
        niceMax = max;
      }
    }

    numSpaces = (niceMax - niceMin) / spacing; // If very close to our rounded value, use it.

    if (helpers$1.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
      numSpaces = Math.round(numSpaces);
    } else {
      numSpaces = Math.ceil(numSpaces);
    }

    niceMin = Math.round(niceMin * factor) / factor;
    niceMax = Math.round(niceMax * factor) / factor;
    ticks.push(isNullOrUndef$2(min) ? niceMin : min);

    for (var j = 1; j < numSpaces; ++j) {
      ticks.push(Math.round((niceMin + j * spacing) * factor) / factor);
    }

    ticks.push(isNullOrUndef$2(max) ? niceMax : max);
    return ticks;
  }

  var scale_linearbase = core_scale.extend({
    getRightValue: function getRightValue(value) {
      if (typeof value === 'string') {
        return +value;
      }

      return core_scale.prototype.getRightValue.call(this, value);
    },
    handleTickRangeOptions: function handleTickRangeOptions() {
      var me = this;
      var opts = me.options;
      var tickOpts = opts.ticks; // If we are forcing it to begin at 0, but 0 will already be rendered on the chart,
      // do nothing since that would make the chart weird. If the user really wants a weird chart
      // axis, they can manually override it

      if (tickOpts.beginAtZero) {
        var minSign = helpers$1.sign(me.min);
        var maxSign = helpers$1.sign(me.max);

        if (minSign < 0 && maxSign < 0) {
          // move the top up to 0
          me.max = 0;
        } else if (minSign > 0 && maxSign > 0) {
          // move the bottom down to 0
          me.min = 0;
        }
      }

      var setMin = tickOpts.min !== undefined || tickOpts.suggestedMin !== undefined;
      var setMax = tickOpts.max !== undefined || tickOpts.suggestedMax !== undefined;

      if (tickOpts.min !== undefined) {
        me.min = tickOpts.min;
      } else if (tickOpts.suggestedMin !== undefined) {
        if (me.min === null) {
          me.min = tickOpts.suggestedMin;
        } else {
          me.min = Math.min(me.min, tickOpts.suggestedMin);
        }
      }

      if (tickOpts.max !== undefined) {
        me.max = tickOpts.max;
      } else if (tickOpts.suggestedMax !== undefined) {
        if (me.max === null) {
          me.max = tickOpts.suggestedMax;
        } else {
          me.max = Math.max(me.max, tickOpts.suggestedMax);
        }
      }

      if (setMin !== setMax) {
        // We set the min or the max but not both.
        // So ensure that our range is good
        // Inverted or 0 length range can happen when
        // ticks.min is set, and no datasets are visible
        if (me.min >= me.max) {
          if (setMin) {
            me.max = me.min + 1;
          } else {
            me.min = me.max - 1;
          }
        }
      }

      if (me.min === me.max) {
        me.max++;

        if (!tickOpts.beginAtZero) {
          me.min--;
        }
      }
    },
    getTickLimit: function getTickLimit() {
      var me = this;
      var tickOpts = me.options.ticks;
      var stepSize = tickOpts.stepSize;
      var maxTicksLimit = tickOpts.maxTicksLimit;
      var maxTicks;

      if (stepSize) {
        maxTicks = Math.ceil(me.max / stepSize) - Math.floor(me.min / stepSize) + 1;
      } else {
        maxTicks = me._computeTickLimit();
        maxTicksLimit = maxTicksLimit || 11;
      }

      if (maxTicksLimit) {
        maxTicks = Math.min(maxTicksLimit, maxTicks);
      }

      return maxTicks;
    },
    _computeTickLimit: function _computeTickLimit() {
      return Number.POSITIVE_INFINITY;
    },
    handleDirectionalChanges: noop,
    buildTicks: function buildTicks() {
      var me = this;
      var opts = me.options;
      var tickOpts = opts.ticks; // Figure out what the max number of ticks we can support it is based on the size of
      // the axis area. For now, we say that the minimum tick spacing in pixels must be 40
      // We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
      // the graph. Make sure we always have at least 2 ticks

      var maxTicks = me.getTickLimit();
      maxTicks = Math.max(2, maxTicks);
      var numericGeneratorOptions = {
        maxTicks: maxTicks,
        min: tickOpts.min,
        max: tickOpts.max,
        precision: tickOpts.precision,
        stepSize: helpers$1.valueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize)
      };
      var ticks = me.ticks = generateTicks(numericGeneratorOptions, me);
      me.handleDirectionalChanges(); // At this point, we need to update our max and min given the tick values since we have expanded the
      // range of the scale

      me.max = helpers$1.max(ticks);
      me.min = helpers$1.min(ticks);

      if (tickOpts.reverse) {
        ticks.reverse();
        me.start = me.max;
        me.end = me.min;
      } else {
        me.start = me.min;
        me.end = me.max;
      }
    },
    convertTicksToLabels: function convertTicksToLabels() {
      var me = this;
      me.ticksAsNumbers = me.ticks.slice();
      me.zeroLineIndex = me.ticks.indexOf(0);
      core_scale.prototype.convertTicksToLabels.call(me);
    },
    _configure: function _configure() {
      var me = this;
      var ticks = me.getTicks();
      var start = me.min;
      var end = me.max;
      var offset;

      core_scale.prototype._configure.call(me);

      if (me.options.offset && ticks.length) {
        offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
        start -= offset;
        end += offset;
      }

      me._startValue = start;
      me._endValue = end;
      me._valueRange = end - start;
    }
  });
  var defaultConfig$1 = {
    position: 'left',
    ticks: {
      callback: core_ticks.formatters.linear
    }
  };
  var DEFAULT_MIN = 0;
  var DEFAULT_MAX = 1;

  function getOrCreateStack(stacks, stacked, meta) {
    var key = [meta.type, // we have a separate stack for stack=undefined datasets when the opts.stacked is undefined
    stacked === undefined && meta.stack === undefined ? meta.index : '', meta.stack].join('.');

    if (stacks[key] === undefined) {
      stacks[key] = {
        pos: [],
        neg: []
      };
    }

    return stacks[key];
  }

  function stackData(scale, stacks, meta, data) {
    var opts = scale.options;
    var stacked = opts.stacked;
    var stack = getOrCreateStack(stacks, stacked, meta);
    var pos = stack.pos;
    var neg = stack.neg;
    var ilen = data.length;
    var i, value;

    for (i = 0; i < ilen; ++i) {
      value = scale._parseValue(data[i]);

      if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden) {
        continue;
      }

      pos[i] = pos[i] || 0;
      neg[i] = neg[i] || 0;

      if (opts.relativePoints) {
        pos[i] = 100;
      } else if (value.min < 0 || value.max < 0) {
        neg[i] += value.min;
      } else {
        pos[i] += value.max;
      }
    }
  }

  function updateMinMax(scale, meta, data) {
    var ilen = data.length;
    var i, value;

    for (i = 0; i < ilen; ++i) {
      value = scale._parseValue(data[i]);

      if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden) {
        continue;
      }

      scale.min = Math.min(scale.min, value.min);
      scale.max = Math.max(scale.max, value.max);
    }
  }

  var scale_linear = scale_linearbase.extend({
    determineDataLimits: function determineDataLimits() {
      var me = this;
      var opts = me.options;
      var chart = me.chart;
      var datasets = chart.data.datasets;

      var metasets = me._getMatchingVisibleMetas();

      var hasStacks = opts.stacked;
      var stacks = {};
      var ilen = metasets.length;
      var i, meta, data, values;
      me.min = Number.POSITIVE_INFINITY;
      me.max = Number.NEGATIVE_INFINITY;

      if (hasStacks === undefined) {
        for (i = 0; !hasStacks && i < ilen; ++i) {
          meta = metasets[i];
          hasStacks = meta.stack !== undefined;
        }
      }

      for (i = 0; i < ilen; ++i) {
        meta = metasets[i];
        data = datasets[meta.index].data;

        if (hasStacks) {
          stackData(me, stacks, meta, data);
        } else {
          updateMinMax(me, meta, data);
        }
      }

      helpers$1.each(stacks, function (stackValues) {
        values = stackValues.pos.concat(stackValues.neg);
        me.min = Math.min(me.min, helpers$1.min(values));
        me.max = Math.max(me.max, helpers$1.max(values));
      });
      me.min = helpers$1.isFinite(me.min) && !isNaN(me.min) ? me.min : DEFAULT_MIN;
      me.max = helpers$1.isFinite(me.max) && !isNaN(me.max) ? me.max : DEFAULT_MAX; // Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero

      me.handleTickRangeOptions();
    },
    // Returns the maximum number of ticks based on the scale dimension
    _computeTickLimit: function _computeTickLimit() {
      var me = this;
      var tickFont;

      if (me.isHorizontal()) {
        return Math.ceil(me.width / 40);
      }

      tickFont = helpers$1.options._parseFont(me.options.ticks);
      return Math.ceil(me.height / tickFont.lineHeight);
    },
    // Called after the ticks are built. We need
    handleDirectionalChanges: function handleDirectionalChanges() {
      if (!this.isHorizontal()) {
        // We are in a vertical orientation. The top value is the highest. So reverse the array
        this.ticks.reverse();
      }
    },
    getLabelForIndex: function getLabelForIndex(index, datasetIndex) {
      return this._getScaleLabel(this.chart.data.datasets[datasetIndex].data[index]);
    },
    // Utils
    getPixelForValue: function getPixelForValue(value) {
      var me = this;
      return me.getPixelForDecimal((+me.getRightValue(value) - me._startValue) / me._valueRange);
    },
    getValueForPixel: function getValueForPixel(pixel) {
      return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
    },
    getPixelForTick: function getPixelForTick(index) {
      var ticks = this.ticksAsNumbers;

      if (index < 0 || index > ticks.length - 1) {
        return null;
      }

      return this.getPixelForValue(ticks[index]);
    }
  }); // INTERNAL: static default options, registered in src/index.js

  var _defaults$1 = defaultConfig$1;
  scale_linear._defaults = _defaults$1;
  var valueOrDefault$b = helpers$1.valueOrDefault;
  var log10 = helpers$1.math.log10;
  /**
   * Generate a set of logarithmic ticks
   * @param generationOptions the options used to generate the ticks
   * @param dataRange the range of the data
   * @returns {number[]} array of tick values
   */

  function generateTicks$1(generationOptions, dataRange) {
    var ticks = [];
    var tickVal = valueOrDefault$b(generationOptions.min, Math.pow(10, Math.floor(log10(dataRange.min))));
    var endExp = Math.floor(log10(dataRange.max));
    var endSignificand = Math.ceil(dataRange.max / Math.pow(10, endExp));
    var exp, significand;

    if (tickVal === 0) {
      exp = Math.floor(log10(dataRange.minNotZero));
      significand = Math.floor(dataRange.minNotZero / Math.pow(10, exp));
      ticks.push(tickVal);
      tickVal = significand * Math.pow(10, exp);
    } else {
      exp = Math.floor(log10(tickVal));
      significand = Math.floor(tickVal / Math.pow(10, exp));
    }

    var precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;

    do {
      ticks.push(tickVal);
      ++significand;

      if (significand === 10) {
        significand = 1;
        ++exp;
        precision = exp >= 0 ? 1 : precision;
      }

      tickVal = Math.round(significand * Math.pow(10, exp) * precision) / precision;
    } while (exp < endExp || exp === endExp && significand < endSignificand);

    var lastTick = valueOrDefault$b(generationOptions.max, tickVal);
    ticks.push(lastTick);
    return ticks;
  }

  var defaultConfig$2 = {
    position: 'left',
    // label settings
    ticks: {
      callback: core_ticks.formatters.logarithmic
    }
  }; // TODO(v3): change this to positiveOrDefault

  function nonNegativeOrDefault(value, defaultValue) {
    return helpers$1.isFinite(value) && value >= 0 ? value : defaultValue;
  }

  var scale_logarithmic = core_scale.extend({
    determineDataLimits: function determineDataLimits() {
      var me = this;
      var opts = me.options;
      var chart = me.chart;
      var datasets = chart.data.datasets;
      var isHorizontal = me.isHorizontal();

      function IDMatches(meta) {
        return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
      }

      var datasetIndex, meta, value, data, i, ilen; // Calculate Range

      me.min = Number.POSITIVE_INFINITY;
      me.max = Number.NEGATIVE_INFINITY;
      me.minNotZero = Number.POSITIVE_INFINITY;
      var hasStacks = opts.stacked;

      if (hasStacks === undefined) {
        for (datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
          meta = chart.getDatasetMeta(datasetIndex);

          if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta) && meta.stack !== undefined) {
            hasStacks = true;
            break;
          }
        }
      }

      if (opts.stacked || hasStacks) {
        var valuesPerStack = {};

        for (datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
          meta = chart.getDatasetMeta(datasetIndex);
          var key = [// we have a separate stack for stack=undefined datasets when the opts.stacked is undefined
          meta.type, opts.stacked === undefined && meta.stack === undefined ? datasetIndex : '', meta.stack].join('.');

          if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
            if (valuesPerStack[key] === undefined) {
              valuesPerStack[key] = [];
            }

            data = datasets[datasetIndex].data;

            for (i = 0, ilen = data.length; i < ilen; i++) {
              var values = valuesPerStack[key];
              value = me._parseValue(data[i]); // invalid, hidden and negative values are ignored

              if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden || value.min < 0 || value.max < 0) {
                continue;
              }

              values[i] = values[i] || 0;
              values[i] += value.max;
            }
          }
        }

        helpers$1.each(valuesPerStack, function (valuesForType) {
          if (valuesForType.length > 0) {
            var minVal = helpers$1.min(valuesForType);
            var maxVal = helpers$1.max(valuesForType);
            me.min = Math.min(me.min, minVal);
            me.max = Math.max(me.max, maxVal);
          }
        });
      } else {
        for (datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
          meta = chart.getDatasetMeta(datasetIndex);

          if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
            data = datasets[datasetIndex].data;

            for (i = 0, ilen = data.length; i < ilen; i++) {
              value = me._parseValue(data[i]); // invalid, hidden and negative values are ignored

              if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden || value.min < 0 || value.max < 0) {
                continue;
              }

              me.min = Math.min(value.min, me.min);
              me.max = Math.max(value.max, me.max);

              if (value.min !== 0) {
                me.minNotZero = Math.min(value.min, me.minNotZero);
              }
            }
          }
        }
      }

      me.min = helpers$1.isFinite(me.min) ? me.min : null;
      me.max = helpers$1.isFinite(me.max) ? me.max : null;
      me.minNotZero = helpers$1.isFinite(me.minNotZero) ? me.minNotZero : null; // Common base implementation to handle ticks.min, ticks.max

      this.handleTickRangeOptions();
    },
    handleTickRangeOptions: function handleTickRangeOptions() {
      var me = this;
      var tickOpts = me.options.ticks;
      var DEFAULT_MIN = 1;
      var DEFAULT_MAX = 10;
      me.min = nonNegativeOrDefault(tickOpts.min, me.min);
      me.max = nonNegativeOrDefault(tickOpts.max, me.max);

      if (me.min === me.max) {
        if (me.min !== 0 && me.min !== null) {
          me.min = Math.pow(10, Math.floor(log10(me.min)) - 1);
          me.max = Math.pow(10, Math.floor(log10(me.max)) + 1);
        } else {
          me.min = DEFAULT_MIN;
          me.max = DEFAULT_MAX;
        }
      }

      if (me.min === null) {
        me.min = Math.pow(10, Math.floor(log10(me.max)) - 1);
      }

      if (me.max === null) {
        me.max = me.min !== 0 ? Math.pow(10, Math.floor(log10(me.min)) + 1) : DEFAULT_MAX;
      }

      if (me.minNotZero === null) {
        if (me.min > 0) {
          me.minNotZero = me.min;
        } else if (me.max < 1) {
          me.minNotZero = Math.pow(10, Math.floor(log10(me.max)));
        } else {
          me.minNotZero = DEFAULT_MIN;
        }
      }
    },
    buildTicks: function buildTicks() {
      var me = this;
      var tickOpts = me.options.ticks;
      var reverse = !me.isHorizontal();
      var generationOptions = {
        min: nonNegativeOrDefault(tickOpts.min),
        max: nonNegativeOrDefault(tickOpts.max)
      };
      var ticks = me.ticks = generateTicks$1(generationOptions, me); // At this point, we need to update our max and min given the tick values since we have expanded the
      // range of the scale

      me.max = helpers$1.max(ticks);
      me.min = helpers$1.min(ticks);

      if (tickOpts.reverse) {
        reverse = !reverse;
        me.start = me.max;
        me.end = me.min;
      } else {
        me.start = me.min;
        me.end = me.max;
      }

      if (reverse) {
        ticks.reverse();
      }
    },
    convertTicksToLabels: function convertTicksToLabels() {
      this.tickValues = this.ticks.slice();
      core_scale.prototype.convertTicksToLabels.call(this);
    },
    // Get the correct tooltip label
    getLabelForIndex: function getLabelForIndex(index, datasetIndex) {
      return this._getScaleLabel(this.chart.data.datasets[datasetIndex].data[index]);
    },
    getPixelForTick: function getPixelForTick(index) {
      var ticks = this.tickValues;

      if (index < 0 || index > ticks.length - 1) {
        return null;
      }

      return this.getPixelForValue(ticks[index]);
    },

    /**
     * Returns the value of the first tick.
     * @param {number} value - The minimum not zero value.
     * @return {number} The first tick value.
     * @private
     */
    _getFirstTickValue: function _getFirstTickValue(value) {
      var exp = Math.floor(log10(value));
      var significand = Math.floor(value / Math.pow(10, exp));
      return significand * Math.pow(10, exp);
    },
    _configure: function _configure() {
      var me = this;
      var start = me.min;
      var offset = 0;

      core_scale.prototype._configure.call(me);

      if (start === 0) {
        start = me._getFirstTickValue(me.minNotZero);
        offset = valueOrDefault$b(me.options.ticks.fontSize, core_defaults.global.defaultFontSize) / me._length;
      }

      me._startValue = log10(start);
      me._valueOffset = offset;
      me._valueRange = (log10(me.max) - log10(start)) / (1 - offset);
    },
    getPixelForValue: function getPixelForValue(value) {
      var me = this;
      var decimal = 0;
      value = +me.getRightValue(value);

      if (value > me.min && value > 0) {
        decimal = (log10(value) - me._startValue) / me._valueRange + me._valueOffset;
      }

      return me.getPixelForDecimal(decimal);
    },
    getValueForPixel: function getValueForPixel(pixel) {
      var me = this;
      var decimal = me.getDecimalForPixel(pixel);
      return decimal === 0 && me.min === 0 ? 0 : Math.pow(10, me._startValue + (decimal - me._valueOffset) * me._valueRange);
    }
  }); // INTERNAL: static default options, registered in src/index.js

  var _defaults$2 = defaultConfig$2;
  scale_logarithmic._defaults = _defaults$2;
  var valueOrDefault$c = helpers$1.valueOrDefault;
  var valueAtIndexOrDefault$1 = helpers$1.valueAtIndexOrDefault;
  var resolve$4 = helpers$1.options.resolve;
  var defaultConfig$3 = {
    display: true,
    // Boolean - Whether to animate scaling the chart from the centre
    animate: true,
    position: 'chartArea',
    angleLines: {
      display: true,
      color: 'rgba(0,0,0,0.1)',
      lineWidth: 1,
      borderDash: [],
      borderDashOffset: 0.0
    },
    gridLines: {
      circular: false
    },
    // label settings
    ticks: {
      // Boolean - Show a backdrop to the scale label
      showLabelBackdrop: true,
      // String - The colour of the label backdrop
      backdropColor: 'rgba(255,255,255,0.75)',
      // Number - The backdrop padding above & below the label in pixels
      backdropPaddingY: 2,
      // Number - The backdrop padding to the side of the label in pixels
      backdropPaddingX: 2,
      callback: core_ticks.formatters.linear
    },
    pointLabels: {
      // Boolean - if true, show point labels
      display: true,
      // Number - Point label font size in pixels
      fontSize: 10,
      // Function - Used to convert point labels
      callback: function callback(label) {
        return label;
      }
    }
  };

  function getTickBackdropHeight(opts) {
    var tickOpts = opts.ticks;

    if (tickOpts.display && opts.display) {
      return valueOrDefault$c(tickOpts.fontSize, core_defaults.global.defaultFontSize) + tickOpts.backdropPaddingY * 2;
    }

    return 0;
  }

  function measureLabelSize(ctx, lineHeight, label) {
    if (helpers$1.isArray(label)) {
      return {
        w: helpers$1.longestText(ctx, ctx.font, label),
        h: label.length * lineHeight
      };
    }

    return {
      w: ctx.measureText(label).width,
      h: lineHeight
    };
  }

  function determineLimits(angle, pos, size, min, max) {
    if (angle === min || angle === max) {
      return {
        start: pos - size / 2,
        end: pos + size / 2
      };
    } else if (angle < min || angle > max) {
      return {
        start: pos - size,
        end: pos
      };
    }

    return {
      start: pos,
      end: pos + size
    };
  }
  /**
   * Helper function to fit a radial linear scale with point labels
   */


  function fitWithPointLabels(scale) {
    // Right, this is really confusing and there is a lot of maths going on here
    // The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
    //
    // Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
    //
    // Solution:
    //
    // We assume the radius of the polygon is half the size of the canvas at first
    // at each index we check if the text overlaps.
    //
    // Where it does, we store that angle and that index.
    //
    // After finding the largest index and angle we calculate how much we need to remove
    // from the shape radius to move the point inwards by that x.
    //
    // We average the left and right distances to get the maximum shape radius that can fit in the box
    // along with labels.
    //
    // Once we have that, we can find the centre point for the chart, by taking the x text protrusion
    // on each side, removing that from the size, halving it and adding the left x protrusion width.
    //
    // This will mean we have a shape fitted to the canvas, as large as it can be with the labels
    // and position it in the most space efficient manner
    //
    // https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif
    var plFont = helpers$1.options._parseFont(scale.options.pointLabels); // Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
    // Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points


    var furthestLimits = {
      l: 0,
      r: scale.width,
      t: 0,
      b: scale.height - scale.paddingTop
    };
    var furthestAngles = {};
    var i, textSize, pointPosition;
    scale.ctx.font = plFont.string;
    scale._pointLabelSizes = [];
    var valueCount = scale.chart.data.labels.length;

    for (i = 0; i < valueCount; i++) {
      pointPosition = scale.getPointPosition(i, scale.drawingArea + 5);
      textSize = measureLabelSize(scale.ctx, plFont.lineHeight, scale.pointLabels[i]);
      scale._pointLabelSizes[i] = textSize; // Add quarter circle to make degree 0 mean top of circle

      var angleRadians = scale.getIndexAngle(i);
      var angle = helpers$1.toDegrees(angleRadians) % 360;
      var hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
      var vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);

      if (hLimits.start < furthestLimits.l) {
        furthestLimits.l = hLimits.start;
        furthestAngles.l = angleRadians;
      }

      if (hLimits.end > furthestLimits.r) {
        furthestLimits.r = hLimits.end;
        furthestAngles.r = angleRadians;
      }

      if (vLimits.start < furthestLimits.t) {
        furthestLimits.t = vLimits.start;
        furthestAngles.t = angleRadians;
      }

      if (vLimits.end > furthestLimits.b) {
        furthestLimits.b = vLimits.end;
        furthestAngles.b = angleRadians;
      }
    }

    scale.setReductions(scale.drawingArea, furthestLimits, furthestAngles);
  }

  function getTextAlignForAngle(angle) {
    if (angle === 0 || angle === 180) {
      return 'center';
    } else if (angle < 180) {
      return 'left';
    }

    return 'right';
  }

  function fillText(ctx, text, position, lineHeight) {
    var y = position.y + lineHeight / 2;
    var i, ilen;

    if (helpers$1.isArray(text)) {
      for (i = 0, ilen = text.length; i < ilen; ++i) {
        ctx.fillText(text[i], position.x, y);
        y += lineHeight;
      }
    } else {
      ctx.fillText(text, position.x, y);
    }
  }

  function adjustPointPositionForLabelHeight(angle, textSize, position) {
    if (angle === 90 || angle === 270) {
      position.y -= textSize.h / 2;
    } else if (angle > 270 || angle < 90) {
      position.y -= textSize.h;
    }
  }

  function drawPointLabels(scale) {
    var ctx = scale.ctx;
    var opts = scale.options;
    var pointLabelOpts = opts.pointLabels;
    var tickBackdropHeight = getTickBackdropHeight(opts);
    var outerDistance = scale.getDistanceFromCenterForValue(opts.ticks.reverse ? scale.min : scale.max);

    var plFont = helpers$1.options._parseFont(pointLabelOpts);

    ctx.save();
    ctx.font = plFont.string;
    ctx.textBaseline = 'middle';

    for (var i = scale.chart.data.labels.length - 1; i >= 0; i--) {
      // Extra pixels out for some label spacing
      var extra = i === 0 ? tickBackdropHeight / 2 : 0;
      var pointLabelPosition = scale.getPointPosition(i, outerDistance + extra + 5); // Keep this in loop since we may support array properties here

      var pointLabelFontColor = valueAtIndexOrDefault$1(pointLabelOpts.fontColor, i, core_defaults.global.defaultFontColor);
      ctx.fillStyle = pointLabelFontColor;
      var angleRadians = scale.getIndexAngle(i);
      var angle = helpers$1.toDegrees(angleRadians);
      ctx.textAlign = getTextAlignForAngle(angle);
      adjustPointPositionForLabelHeight(angle, scale._pointLabelSizes[i], pointLabelPosition);
      fillText(ctx, scale.pointLabels[i], pointLabelPosition, plFont.lineHeight);
    }

    ctx.restore();
  }

  function drawRadiusLine(scale, gridLineOpts, radius, index) {
    var ctx = scale.ctx;
    var circular = gridLineOpts.circular;
    var valueCount = scale.chart.data.labels.length;
    var lineColor = valueAtIndexOrDefault$1(gridLineOpts.color, index - 1);
    var lineWidth = valueAtIndexOrDefault$1(gridLineOpts.lineWidth, index - 1);
    var pointPosition;

    if (!circular && !valueCount || !lineColor || !lineWidth) {
      return;
    }

    ctx.save();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;

    if (ctx.setLineDash) {
      ctx.setLineDash(gridLineOpts.borderDash || []);
      ctx.lineDashOffset = gridLineOpts.borderDashOffset || 0.0;
    }

    ctx.beginPath();

    if (circular) {
      // Draw circular arcs between the points
      ctx.arc(scale.xCenter, scale.yCenter, radius, 0, Math.PI * 2);
    } else {
      // Draw straight lines connecting each index
      pointPosition = scale.getPointPosition(0, radius);
      ctx.moveTo(pointPosition.x, pointPosition.y);

      for (var i = 1; i < valueCount; i++) {
        pointPosition = scale.getPointPosition(i, radius);
        ctx.lineTo(pointPosition.x, pointPosition.y);
      }
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function numberOrZero(param) {
    return helpers$1.isNumber(param) ? param : 0;
  }

  var scale_radialLinear = scale_linearbase.extend({
    setDimensions: function setDimensions() {
      var me = this; // Set the unconstrained dimension before label rotation

      me.width = me.maxWidth;
      me.height = me.maxHeight;
      me.paddingTop = getTickBackdropHeight(me.options) / 2;
      me.xCenter = Math.floor(me.width / 2);
      me.yCenter = Math.floor((me.height - me.paddingTop) / 2);
      me.drawingArea = Math.min(me.height - me.paddingTop, me.width) / 2;
    },
    determineDataLimits: function determineDataLimits() {
      var me = this;
      var chart = me.chart;
      var min = Number.POSITIVE_INFINITY;
      var max = Number.NEGATIVE_INFINITY;
      helpers$1.each(chart.data.datasets, function (dataset, datasetIndex) {
        if (chart.isDatasetVisible(datasetIndex)) {
          var meta = chart.getDatasetMeta(datasetIndex);
          helpers$1.each(dataset.data, function (rawValue, index) {
            var value = +me.getRightValue(rawValue);

            if (isNaN(value) || meta.data[index].hidden) {
              return;
            }

            min = Math.min(value, min);
            max = Math.max(value, max);
          });
        }
      });
      me.min = min === Number.POSITIVE_INFINITY ? 0 : min;
      me.max = max === Number.NEGATIVE_INFINITY ? 0 : max; // Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero

      me.handleTickRangeOptions();
    },
    // Returns the maximum number of ticks based on the scale dimension
    _computeTickLimit: function _computeTickLimit() {
      return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
    },
    convertTicksToLabels: function convertTicksToLabels() {
      var me = this;
      scale_linearbase.prototype.convertTicksToLabels.call(me); // Point labels

      me.pointLabels = me.chart.data.labels.map(function () {
        var label = helpers$1.callback(me.options.pointLabels.callback, arguments, me);
        return label || label === 0 ? label : '';
      });
    },
    getLabelForIndex: function getLabelForIndex(index, datasetIndex) {
      return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
    },
    fit: function fit() {
      var me = this;
      var opts = me.options;

      if (opts.display && opts.pointLabels.display) {
        fitWithPointLabels(me);
      } else {
        me.setCenterPoint(0, 0, 0, 0);
      }
    },

    /**
     * Set radius reductions and determine new radius and center point
     * @private
     */
    setReductions: function setReductions(largestPossibleRadius, furthestLimits, furthestAngles) {
      var me = this;
      var radiusReductionLeft = furthestLimits.l / Math.sin(furthestAngles.l);
      var radiusReductionRight = Math.max(furthestLimits.r - me.width, 0) / Math.sin(furthestAngles.r);
      var radiusReductionTop = -furthestLimits.t / Math.cos(furthestAngles.t);
      var radiusReductionBottom = -Math.max(furthestLimits.b - (me.height - me.paddingTop), 0) / Math.cos(furthestAngles.b);
      radiusReductionLeft = numberOrZero(radiusReductionLeft);
      radiusReductionRight = numberOrZero(radiusReductionRight);
      radiusReductionTop = numberOrZero(radiusReductionTop);
      radiusReductionBottom = numberOrZero(radiusReductionBottom);
      me.drawingArea = Math.min(Math.floor(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2), Math.floor(largestPossibleRadius - (radiusReductionTop + radiusReductionBottom) / 2));
      me.setCenterPoint(radiusReductionLeft, radiusReductionRight, radiusReductionTop, radiusReductionBottom);
    },
    setCenterPoint: function setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
      var me = this;
      var maxRight = me.width - rightMovement - me.drawingArea;
      var maxLeft = leftMovement + me.drawingArea;
      var maxTop = topMovement + me.drawingArea;
      var maxBottom = me.height - me.paddingTop - bottomMovement - me.drawingArea;
      me.xCenter = Math.floor((maxLeft + maxRight) / 2 + me.left);
      me.yCenter = Math.floor((maxTop + maxBottom) / 2 + me.top + me.paddingTop);
    },
    getIndexAngle: function getIndexAngle(index) {
      var chart = this.chart;
      var angleMultiplier = 360 / chart.data.labels.length;
      var options = chart.options || {};
      var startAngle = options.startAngle || 0; // Start from the top instead of right, so remove a quarter of the circle

      var angle = (index * angleMultiplier + startAngle) % 360;
      return (angle < 0 ? angle + 360 : angle) * Math.PI * 2 / 360;
    },
    getDistanceFromCenterForValue: function getDistanceFromCenterForValue(value) {
      var me = this;

      if (helpers$1.isNullOrUndef(value)) {
        return NaN;
      } // Take into account half font size + the yPadding of the top value


      var scalingFactor = me.drawingArea / (me.max - me.min);

      if (me.options.ticks.reverse) {
        return (me.max - value) * scalingFactor;
      }

      return (value - me.min) * scalingFactor;
    },
    getPointPosition: function getPointPosition(index, distanceFromCenter) {
      var me = this;
      var thisAngle = me.getIndexAngle(index) - Math.PI / 2;
      return {
        x: Math.cos(thisAngle) * distanceFromCenter + me.xCenter,
        y: Math.sin(thisAngle) * distanceFromCenter + me.yCenter
      };
    },
    getPointPositionForValue: function getPointPositionForValue(index, value) {
      return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
    },
    getBasePosition: function getBasePosition(index) {
      var me = this;
      var min = me.min;
      var max = me.max;
      return me.getPointPositionForValue(index || 0, me.beginAtZero ? 0 : min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0);
    },

    /**
     * @private
     */
    _drawGrid: function _drawGrid() {
      var me = this;
      var ctx = me.ctx;
      var opts = me.options;
      var gridLineOpts = opts.gridLines;
      var angleLineOpts = opts.angleLines;
      var lineWidth = valueOrDefault$c(angleLineOpts.lineWidth, gridLineOpts.lineWidth);
      var lineColor = valueOrDefault$c(angleLineOpts.color, gridLineOpts.color);
      var i, offset, position;

      if (opts.pointLabels.display) {
        drawPointLabels(me);
      }

      if (gridLineOpts.display) {
        helpers$1.each(me.ticks, function (label, index) {
          if (index !== 0) {
            offset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index]);
            drawRadiusLine(me, gridLineOpts, offset, index);
          }
        });
      }

      if (angleLineOpts.display && lineWidth && lineColor) {
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;

        if (ctx.setLineDash) {
          ctx.setLineDash(resolve$4([angleLineOpts.borderDash, gridLineOpts.borderDash, []]));
          ctx.lineDashOffset = resolve$4([angleLineOpts.borderDashOffset, gridLineOpts.borderDashOffset, 0.0]);
        }

        for (i = me.chart.data.labels.length - 1; i >= 0; i--) {
          offset = me.getDistanceFromCenterForValue(opts.ticks.reverse ? me.min : me.max);
          position = me.getPointPosition(i, offset);
          ctx.beginPath();
          ctx.moveTo(me.xCenter, me.yCenter);
          ctx.lineTo(position.x, position.y);
          ctx.stroke();
        }

        ctx.restore();
      }
    },

    /**
     * @private
     */
    _drawLabels: function _drawLabels() {
      var me = this;
      var ctx = me.ctx;
      var opts = me.options;
      var tickOpts = opts.ticks;

      if (!tickOpts.display) {
        return;
      }

      var startAngle = me.getIndexAngle(0);

      var tickFont = helpers$1.options._parseFont(tickOpts);

      var tickFontColor = valueOrDefault$c(tickOpts.fontColor, core_defaults.global.defaultFontColor);
      var offset, width;
      ctx.save();
      ctx.font = tickFont.string;
      ctx.translate(me.xCenter, me.yCenter);
      ctx.rotate(startAngle);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      helpers$1.each(me.ticks, function (label, index) {
        if (index === 0 && !tickOpts.reverse) {
          return;
        }

        offset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index]);

        if (tickOpts.showLabelBackdrop) {
          width = ctx.measureText(label).width;
          ctx.fillStyle = tickOpts.backdropColor;
          ctx.fillRect(-width / 2 - tickOpts.backdropPaddingX, -offset - tickFont.size / 2 - tickOpts.backdropPaddingY, width + tickOpts.backdropPaddingX * 2, tickFont.size + tickOpts.backdropPaddingY * 2);
        }

        ctx.fillStyle = tickFontColor;
        ctx.fillText(label, 0, -offset);
      });
      ctx.restore();
    },

    /**
     * @private
     */
    _drawTitle: helpers$1.noop
  }); // INTERNAL: static default options, registered in src/index.js

  var _defaults$3 = defaultConfig$3;
  scale_radialLinear._defaults = _defaults$3;
  var deprecated$1 = helpers$1._deprecated;
  var resolve$5 = helpers$1.options.resolve;
  var valueOrDefault$d = helpers$1.valueOrDefault; // Integer constants are from the ES6 spec.

  var MIN_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;
  var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
  var INTERVALS = {
    millisecond: {
      common: true,
      size: 1,
      steps: 1000
    },
    second: {
      common: true,
      size: 1000,
      steps: 60
    },
    minute: {
      common: true,
      size: 60000,
      steps: 60
    },
    hour: {
      common: true,
      size: 3600000,
      steps: 24
    },
    day: {
      common: true,
      size: 86400000,
      steps: 30
    },
    week: {
      common: false,
      size: 604800000,
      steps: 4
    },
    month: {
      common: true,
      size: 2.628e9,
      steps: 12
    },
    quarter: {
      common: false,
      size: 7.884e9,
      steps: 4
    },
    year: {
      common: true,
      size: 3.154e10
    }
  };
  var UNITS = Object.keys(INTERVALS);

  function sorter(a, b) {
    return a - b;
  }

  function arrayUnique(items) {
    var hash = {};
    var out = [];
    var i, ilen, item;

    for (i = 0, ilen = items.length; i < ilen; ++i) {
      item = items[i];

      if (!hash[item]) {
        hash[item] = true;
        out.push(item);
      }
    }

    return out;
  }

  function getMin(options) {
    return helpers$1.valueOrDefault(options.time.min, options.ticks.min);
  }

  function getMax(options) {
    return helpers$1.valueOrDefault(options.time.max, options.ticks.max);
  }
  /**
   * Returns an array of {time, pos} objects used to interpolate a specific `time` or position
   * (`pos`) on the scale, by searching entries before and after the requested value. `pos` is
   * a decimal between 0 and 1: 0 being the start of the scale (left or top) and 1 the other
   * extremity (left + width or top + height). Note that it would be more optimized to directly
   * store pre-computed pixels, but the scale dimensions are not guaranteed at the time we need
   * to create the lookup table. The table ALWAYS contains at least two items: min and max.
   *
   * @param {number[]} timestamps - timestamps sorted from lowest to highest.
   * @param {string} distribution - If 'linear', timestamps will be spread linearly along the min
   * and max range, so basically, the table will contains only two items: {min, 0} and {max, 1}.
   * If 'series', timestamps will be positioned at the same distance from each other. In this
   * case, only timestamps that break the time linearity are registered, meaning that in the
   * best case, all timestamps are linear, the table contains only min and max.
   */


  function buildLookupTable(timestamps, min, max, distribution) {
    if (distribution === 'linear' || !timestamps.length) {
      return [{
        time: min,
        pos: 0
      }, {
        time: max,
        pos: 1
      }];
    }

    var table = [];
    var items = [min];
    var i, ilen, prev, curr, next;

    for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
      curr = timestamps[i];

      if (curr > min && curr < max) {
        items.push(curr);
      }
    }

    items.push(max);

    for (i = 0, ilen = items.length; i < ilen; ++i) {
      next = items[i + 1];
      prev = items[i - 1];
      curr = items[i]; // only add points that breaks the scale linearity

      if (prev === undefined || next === undefined || Math.round((next + prev) / 2) !== curr) {
        table.push({
          time: curr,
          pos: i / (ilen - 1)
        });
      }
    }

    return table;
  } // @see adapted from https://www.anujgakhar.com/2014/03/01/binary-search-in-javascript/


  function lookup(table, key, value) {
    var lo = 0;
    var hi = table.length - 1;
    var mid, i0, i1;

    while (lo >= 0 && lo <= hi) {
      mid = lo + hi >> 1;
      i0 = table[mid - 1] || null;
      i1 = table[mid];

      if (!i0) {
        // given value is outside table (before first item)
        return {
          lo: null,
          hi: i1
        };
      } else if (i1[key] < value) {
        lo = mid + 1;
      } else if (i0[key] > value) {
        hi = mid - 1;
      } else {
        return {
          lo: i0,
          hi: i1
        };
      }
    } // given value is outside table (after last item)


    return {
      lo: i1,
      hi: null
    };
  }
  /**
   * Linearly interpolates the given source `value` using the table items `skey` values and
   * returns the associated `tkey` value. For example, interpolate(table, 'time', 42, 'pos')
   * returns the position for a timestamp equal to 42. If value is out of bounds, values at
   * index [0, 1] or [n - 1, n] are used for the interpolation.
   */


  function interpolate$1(table, skey, sval, tkey) {
    var range = lookup(table, skey, sval); // Note: the lookup table ALWAYS contains at least 2 items (min and max)

    var prev = !range.lo ? table[0] : !range.hi ? table[table.length - 2] : range.lo;
    var next = !range.lo ? table[1] : !range.hi ? table[table.length - 1] : range.hi;
    var span = next[skey] - prev[skey];
    var ratio = span ? (sval - prev[skey]) / span : 0;
    var offset = (next[tkey] - prev[tkey]) * ratio;
    return prev[tkey] + offset;
  }

  function toTimestamp(scale, input) {
    var adapter = scale._adapter;
    var options = scale.options.time;
    var parser = options.parser;
    var format = parser || options.format;
    var value = input;

    if (typeof parser === 'function') {
      value = parser(value);
    } // Only parse if its not a timestamp already


    if (!helpers$1.isFinite(value)) {
      value = typeof format === 'string' ? adapter.parse(value, format) : adapter.parse(value);
    }

    if (value !== null) {
      return +value;
    } // Labels are in an incompatible format and no `parser` has been provided.
    // The user might still use the deprecated `format` option for parsing.


    if (!parser && typeof format === 'function') {
      value = format(input); // `format` could return something else than a timestamp, if so, parse it

      if (!helpers$1.isFinite(value)) {
        value = adapter.parse(value);
      }
    }

    return value;
  }

  function parse(scale, input) {
    if (helpers$1.isNullOrUndef(input)) {
      return null;
    }

    var options = scale.options.time;
    var value = toTimestamp(scale, scale.getRightValue(input));

    if (value === null) {
      return value;
    }

    if (options.round) {
      value = +scale._adapter.startOf(value, options.round);
    }

    return value;
  }
  /**
   * Figures out what unit results in an appropriate number of auto-generated ticks
   */


  function determineUnitForAutoTicks(minUnit, min, max, capacity) {
    var ilen = UNITS.length;
    var i, interval, factor;

    for (i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
      interval = INTERVALS[UNITS[i]];
      factor = interval.steps ? interval.steps : MAX_INTEGER;

      if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
        return UNITS[i];
      }
    }

    return UNITS[ilen - 1];
  }
  /**
   * Figures out what unit to format a set of ticks with
   */


  function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
    var i, unit;

    for (i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
      unit = UNITS[i];

      if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
        return unit;
      }
    }

    return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
  }

  function determineMajorUnit(unit) {
    for (var i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
      if (INTERVALS[UNITS[i]].common) {
        return UNITS[i];
      }
    }
  }
  /**
   * Generates a maximum of `capacity` timestamps between min and max, rounded to the
   * `minor` unit using the given scale time `options`.
   * Important: this method can return ticks outside the min and max range, it's the
   * responsibility of the calling code to clamp values if needed.
   */


  function generate(scale, min, max, capacity) {
    var adapter = scale._adapter;
    var options = scale.options;
    var timeOpts = options.time;
    var minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, capacity);
    var stepSize = resolve$5([timeOpts.stepSize, timeOpts.unitStepSize, 1]);
    var weekday = minor === 'week' ? timeOpts.isoWeekday : false;
    var first = min;
    var ticks = [];
    var time; // For 'week' unit, handle the first day of week option

    if (weekday) {
      first = +adapter.startOf(first, 'isoWeek', weekday);
    } // Align first ticks on unit


    first = +adapter.startOf(first, weekday ? 'day' : minor); // Prevent browser from freezing in case user options request millions of milliseconds

    if (adapter.diff(max, min, minor) > 100000 * stepSize) {
      throw min + ' and ' + max + ' are too far apart with stepSize of ' + stepSize + ' ' + minor;
    }

    for (time = first; time < max; time = +adapter.add(time, stepSize, minor)) {
      ticks.push(time);
    }

    if (time === max || options.bounds === 'ticks') {
      ticks.push(time);
    }

    return ticks;
  }
  /**
   * Returns the start and end offsets from edges in the form of {start, end}
   * where each value is a relative width to the scale and ranges between 0 and 1.
   * They add extra margins on the both sides by scaling down the original scale.
   * Offsets are added when the `offset` option is true.
   */


  function computeOffsets(table, ticks, min, max, options) {
    var start = 0;
    var end = 0;
    var first, last;

    if (options.offset && ticks.length) {
      first = interpolate$1(table, 'time', ticks[0], 'pos');

      if (ticks.length === 1) {
        start = 1 - first;
      } else {
        start = (interpolate$1(table, 'time', ticks[1], 'pos') - first) / 2;
      }

      last = interpolate$1(table, 'time', ticks[ticks.length - 1], 'pos');

      if (ticks.length === 1) {
        end = last;
      } else {
        end = (last - interpolate$1(table, 'time', ticks[ticks.length - 2], 'pos')) / 2;
      }
    }

    return {
      start: start,
      end: end,
      factor: 1 / (start + 1 + end)
    };
  }

  function setMajorTicks(scale, ticks, map, majorUnit) {
    var adapter = scale._adapter;
    var first = +adapter.startOf(ticks[0].value, majorUnit);
    var last = ticks[ticks.length - 1].value;
    var major, index;

    for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
      index = map[major];

      if (index >= 0) {
        ticks[index].major = true;
      }
    }

    return ticks;
  }

  function ticksFromTimestamps(scale, values, majorUnit) {
    var ticks = [];
    var map = {};
    var ilen = values.length;
    var i, value;

    for (i = 0; i < ilen; ++i) {
      value = values[i];
      map[value] = i;
      ticks.push({
        value: value,
        major: false
      });
    } // We set the major ticks separately from the above loop because calling startOf for every tick
    // is expensive when there is a large number of ticks


    return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
  }

  var defaultConfig$4 = {
    position: 'bottom',

    /**
     * Data distribution along the scale:
     * - 'linear': data are spread according to their time (distances can vary),
     * - 'series': data are spread at the same distance from each other.
     * @see https://github.com/chartjs/Chart.js/pull/4507
     * @since 2.7.0
     */
    distribution: 'linear',

    /**
     * Scale boundary strategy (bypassed by min/max time options)
     * - `data`: make sure data are fully visible, ticks outside are removed
     * - `ticks`: make sure ticks are fully visible, data outside are truncated
     * @see https://github.com/chartjs/Chart.js/pull/4556
     * @since 2.7.0
     */
    bounds: 'data',
    adapters: {},
    time: {
      parser: false,
      // false == a pattern string from https://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
      unit: false,
      // false == automatic or override with week, month, year, etc.
      round: false,
      // none, or override with week, month, year, etc.
      displayFormat: false,
      // DEPRECATED
      isoWeekday: false,
      // override week start day - see https://momentjs.com/docs/#/get-set/iso-weekday/
      minUnit: 'millisecond',
      displayFormats: {}
    },
    ticks: {
      autoSkip: false,

      /**
       * Ticks generation input values:
       * - 'auto': generates "optimal" ticks based on scale size and time options.
       * - 'data': generates ticks from data (including labels from data {t|x|y} objects).
       * - 'labels': generates ticks from user given `data.labels` values ONLY.
       * @see https://github.com/chartjs/Chart.js/pull/4507
       * @since 2.7.0
       */
      source: 'auto',
      major: {
        enabled: false
      }
    }
  };
  var scale_time = core_scale.extend({
    initialize: function initialize() {
      this.mergeTicksOptions();
      core_scale.prototype.initialize.call(this);
    },
    update: function update() {
      var me = this;
      var options = me.options;
      var time = options.time || (options.time = {});
      var adapter = me._adapter = new core_adapters._date(options.adapters.date); // DEPRECATIONS: output a message only one time per update

      deprecated$1('time scale', time.format, 'time.format', 'time.parser');
      deprecated$1('time scale', time.min, 'time.min', 'ticks.min');
      deprecated$1('time scale', time.max, 'time.max', 'ticks.max'); // Backward compatibility: before introducing adapter, `displayFormats` was
      // supposed to contain *all* unit/string pairs but this can't be resolved
      // when loading the scale (adapters are loaded afterward), so let's populate
      // missing formats on update

      helpers$1.mergeIf(time.displayFormats, adapter.formats());
      return core_scale.prototype.update.apply(me, arguments);
    },

    /**
     * Allows data to be referenced via 't' attribute
     */
    getRightValue: function getRightValue(rawValue) {
      if (rawValue && rawValue.t !== undefined) {
        rawValue = rawValue.t;
      }

      return core_scale.prototype.getRightValue.call(this, rawValue);
    },
    determineDataLimits: function determineDataLimits() {
      var me = this;
      var chart = me.chart;
      var adapter = me._adapter;
      var options = me.options;
      var unit = options.time.unit || 'day';
      var min = MAX_INTEGER;
      var max = MIN_INTEGER;
      var timestamps = [];
      var datasets = [];
      var labels = [];
      var i, j, ilen, jlen, data, timestamp, labelsAdded;

      var dataLabels = me._getLabels();

      for (i = 0, ilen = dataLabels.length; i < ilen; ++i) {
        labels.push(parse(me, dataLabels[i]));
      }

      for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
        if (chart.isDatasetVisible(i)) {
          data = chart.data.datasets[i].data; // Let's consider that all data have the same format.

          if (helpers$1.isObject(data[0])) {
            datasets[i] = [];

            for (j = 0, jlen = data.length; j < jlen; ++j) {
              timestamp = parse(me, data[j]);
              timestamps.push(timestamp);
              datasets[i][j] = timestamp;
            }
          } else {
            datasets[i] = labels.slice(0);

            if (!labelsAdded) {
              timestamps = timestamps.concat(labels);
              labelsAdded = true;
            }
          }
        } else {
          datasets[i] = [];
        }
      }

      if (labels.length) {
        min = Math.min(min, labels[0]);
        max = Math.max(max, labels[labels.length - 1]);
      }

      if (timestamps.length) {
        timestamps = ilen > 1 ? arrayUnique(timestamps).sort(sorter) : timestamps.sort(sorter);
        min = Math.min(min, timestamps[0]);
        max = Math.max(max, timestamps[timestamps.length - 1]);
      }

      min = parse(me, getMin(options)) || min;
      max = parse(me, getMax(options)) || max; // In case there is no valid min/max, set limits based on unit time option

      min = min === MAX_INTEGER ? +adapter.startOf(Date.now(), unit) : min;
      max = max === MIN_INTEGER ? +adapter.endOf(Date.now(), unit) + 1 : max; // Make sure that max is strictly higher than min (required by the lookup table)

      me.min = Math.min(min, max);
      me.max = Math.max(min + 1, max); // PRIVATE

      me._table = [];
      me._timestamps = {
        data: timestamps,
        datasets: datasets,
        labels: labels
      };
    },
    buildTicks: function buildTicks() {
      var me = this;
      var min = me.min;
      var max = me.max;
      var options = me.options;
      var tickOpts = options.ticks;
      var timeOpts = options.time;
      var timestamps = me._timestamps;
      var ticks = [];
      var capacity = me.getLabelCapacity(min);
      var source = tickOpts.source;
      var distribution = options.distribution;
      var i, ilen, timestamp;

      if (source === 'data' || source === 'auto' && distribution === 'series') {
        timestamps = timestamps.data;
      } else if (source === 'labels') {
        timestamps = timestamps.labels;
      } else {
        timestamps = generate(me, min, max, capacity);
      }

      if (options.bounds === 'ticks' && timestamps.length) {
        min = timestamps[0];
        max = timestamps[timestamps.length - 1];
      } // Enforce limits with user min/max options


      min = parse(me, getMin(options)) || min;
      max = parse(me, getMax(options)) || max; // Remove ticks outside the min/max range

      for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
        timestamp = timestamps[i];

        if (timestamp >= min && timestamp <= max) {
          ticks.push(timestamp);
        }
      }

      me.min = min;
      me.max = max; // PRIVATE
      // determineUnitForFormatting relies on the number of ticks so we don't use it when
      // autoSkip is enabled because we don't yet know what the final number of ticks will be

      me._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, me.min, me.max, capacity) : determineUnitForFormatting(me, ticks.length, timeOpts.minUnit, me.min, me.max));
      me._majorUnit = !tickOpts.major.enabled || me._unit === 'year' ? undefined : determineMajorUnit(me._unit);
      me._table = buildLookupTable(me._timestamps.data, min, max, distribution);
      me._offsets = computeOffsets(me._table, ticks, min, max, options);

      if (tickOpts.reverse) {
        ticks.reverse();
      }

      return ticksFromTimestamps(me, ticks, me._majorUnit);
    },
    getLabelForIndex: function getLabelForIndex(index, datasetIndex) {
      var me = this;
      var adapter = me._adapter;
      var data = me.chart.data;
      var timeOpts = me.options.time;
      var label = data.labels && index < data.labels.length ? data.labels[index] : '';
      var value = data.datasets[datasetIndex].data[index];

      if (helpers$1.isObject(value)) {
        label = me.getRightValue(value);
      }

      if (timeOpts.tooltipFormat) {
        return adapter.format(toTimestamp(me, label), timeOpts.tooltipFormat);
      }

      if (typeof label === 'string') {
        return label;
      }

      return adapter.format(toTimestamp(me, label), timeOpts.displayFormats.datetime);
    },

    /**
     * Function to format an individual tick mark
     * @private
     */
    tickFormatFunction: function tickFormatFunction(time, index, ticks, format) {
      var me = this;
      var adapter = me._adapter;
      var options = me.options;
      var formats = options.time.displayFormats;
      var minorFormat = formats[me._unit];
      var majorUnit = me._majorUnit;
      var majorFormat = formats[majorUnit];
      var tick = ticks[index];
      var tickOpts = options.ticks;
      var major = majorUnit && majorFormat && tick && tick.major;
      var label = adapter.format(time, format ? format : major ? majorFormat : minorFormat);
      var nestedTickOpts = major ? tickOpts.major : tickOpts.minor;
      var formatter = resolve$5([nestedTickOpts.callback, nestedTickOpts.userCallback, tickOpts.callback, tickOpts.userCallback]);
      return formatter ? formatter(label, index, ticks) : label;
    },
    convertTicksToLabels: function convertTicksToLabels(ticks) {
      var labels = [];
      var i, ilen;

      for (i = 0, ilen = ticks.length; i < ilen; ++i) {
        labels.push(this.tickFormatFunction(ticks[i].value, i, ticks));
      }

      return labels;
    },

    /**
     * @private
     */
    getPixelForOffset: function getPixelForOffset(time) {
      var me = this;
      var offsets = me._offsets;
      var pos = interpolate$1(me._table, 'time', time, 'pos');
      return me.getPixelForDecimal((offsets.start + pos) * offsets.factor);
    },
    getPixelForValue: function getPixelForValue(value, index, datasetIndex) {
      var me = this;
      var time = null;

      if (index !== undefined && datasetIndex !== undefined) {
        time = me._timestamps.datasets[datasetIndex][index];
      }

      if (time === null) {
        time = parse(me, value);
      }

      if (time !== null) {
        return me.getPixelForOffset(time);
      }
    },
    getPixelForTick: function getPixelForTick(index) {
      var ticks = this.getTicks();
      return index >= 0 && index < ticks.length ? this.getPixelForOffset(ticks[index].value) : null;
    },
    getValueForPixel: function getValueForPixel(pixel) {
      var me = this;
      var offsets = me._offsets;
      var pos = me.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
      var time = interpolate$1(me._table, 'pos', pos, 'time'); // DEPRECATION, we should return time directly

      return me._adapter._create(time);
    },

    /**
     * @private
     */
    _getLabelSize: function _getLabelSize(label) {
      var me = this;
      var ticksOpts = me.options.ticks;
      var tickLabelWidth = me.ctx.measureText(label).width;
      var angle = helpers$1.toRadians(me.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
      var cosRotation = Math.cos(angle);
      var sinRotation = Math.sin(angle);
      var tickFontSize = valueOrDefault$d(ticksOpts.fontSize, core_defaults.global.defaultFontSize);
      return {
        w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
        h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
      };
    },

    /**
     * Crude approximation of what the label width might be
     * @private
     */
    getLabelWidth: function getLabelWidth(label) {
      return this._getLabelSize(label).w;
    },

    /**
     * @private
     */
    getLabelCapacity: function getLabelCapacity(exampleTime) {
      var me = this;
      var timeOpts = me.options.time;
      var displayFormats = timeOpts.displayFormats; // pick the longest format (milliseconds) for guestimation

      var format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
      var exampleLabel = me.tickFormatFunction(exampleTime, 0, ticksFromTimestamps(me, [exampleTime], me._majorUnit), format);

      var size = me._getLabelSize(exampleLabel);

      var capacity = Math.floor(me.isHorizontal() ? me.width / size.w : me.height / size.h);

      if (me.options.offset) {
        capacity--;
      }

      return capacity > 0 ? capacity : 1;
    }
  }); // INTERNAL: static default options, registered in src/index.js

  var _defaults$4 = defaultConfig$4;
  scale_time._defaults = _defaults$4;
  var scales = {
    category: scale_category,
    linear: scale_linear,
    logarithmic: scale_logarithmic,
    radialLinear: scale_radialLinear,
    time: scale_time
  };
  var FORMATS = {
    datetime: 'MMM D, YYYY, h:mm:ss a',
    millisecond: 'h:mm:ss.SSS a',
    second: 'h:mm:ss a',
    minute: 'h:mm a',
    hour: 'hA',
    day: 'MMM D',
    week: 'll',
    month: 'MMM YYYY',
    quarter: '[Q]Q - YYYY',
    year: 'YYYY'
  };

  core_adapters._date.override(typeof moment === 'function' ? {
    _id: 'moment',
    // DEBUG ONLY
    formats: function formats() {
      return FORMATS;
    },
    parse: function parse(value, format) {
      if (typeof value === 'string' && typeof format === 'string') {
        value = moment(value, format);
      } else if (!(value instanceof moment)) {
        value = moment(value);
      }

      return value.isValid() ? value.valueOf() : null;
    },
    format: function format(time, _format) {
      return moment(time).format(_format);
    },
    add: function add(time, amount, unit) {
      return moment(time).add(amount, unit).valueOf();
    },
    diff: function diff(max, min, unit) {
      return moment(max).diff(moment(min), unit);
    },
    startOf: function startOf(time, unit, weekday) {
      time = moment(time);

      if (unit === 'isoWeek') {
        return time.isoWeekday(weekday).valueOf();
      }

      return time.startOf(unit).valueOf();
    },
    endOf: function endOf(time, unit) {
      return moment(time).endOf(unit).valueOf();
    },
    // DEPRECATIONS

    /**
     * Provided for backward compatibility with scale.getValueForPixel().
     * @deprecated since version 2.8.0
     * @todo remove at version 3
     * @private
     */
    _create: function _create(time) {
      return moment(time);
    }
  } : {});

  core_defaults._set('global', {
    plugins: {
      filler: {
        propagate: true
      }
    }
  });

  var mappers = {
    dataset: function dataset(source) {
      var index = source.fill;
      var chart = source.chart;
      var meta = chart.getDatasetMeta(index);
      var visible = meta && chart.isDatasetVisible(index);
      var points = visible && meta.dataset._children || [];
      var length = points.length || 0;
      return !length ? null : function (point, i) {
        return i < length && points[i]._view || null;
      };
    },
    boundary: function boundary(source) {
      var boundary = source.boundary;
      var x = boundary ? boundary.x : null;
      var y = boundary ? boundary.y : null;

      if (helpers$1.isArray(boundary)) {
        return function (point, i) {
          return boundary[i];
        };
      }

      return function (point) {
        return {
          x: x === null ? point.x : x,
          y: y === null ? point.y : y
        };
      };
    }
  }; // @todo if (fill[0] === '#')

  function decodeFill(el, index, count) {
    var model = el._model || {};
    var fill = model.fill;
    var target;

    if (fill === undefined) {
      fill = !!model.backgroundColor;
    }

    if (fill === false || fill === null) {
      return false;
    }

    if (fill === true) {
      return 'origin';
    }

    target = parseFloat(fill, 10);

    if (isFinite(target) && Math.floor(target) === target) {
      if (fill[0] === '-' || fill[0] === '+') {
        target = index + target;
      }

      if (target === index || target < 0 || target >= count) {
        return false;
      }

      return target;
    }

    switch (fill) {
      // compatibility
      case 'bottom':
        return 'start';

      case 'top':
        return 'end';

      case 'zero':
        return 'origin';
      // supported boundaries

      case 'origin':
      case 'start':
      case 'end':
        return fill;
      // invalid fill values

      default:
        return false;
    }
  }

  function computeLinearBoundary(source) {
    var model = source.el._model || {};
    var scale = source.el._scale || {};
    var fill = source.fill;
    var target = null;
    var horizontal;

    if (isFinite(fill)) {
      return null;
    } // Backward compatibility: until v3, we still need to support boundary values set on
    // the model (scaleTop, scaleBottom and scaleZero) because some external plugins and
    // controllers might still use it (e.g. the Smith chart).


    if (fill === 'start') {
      target = model.scaleBottom === undefined ? scale.bottom : model.scaleBottom;
    } else if (fill === 'end') {
      target = model.scaleTop === undefined ? scale.top : model.scaleTop;
    } else if (model.scaleZero !== undefined) {
      target = model.scaleZero;
    } else if (scale.getBasePixel) {
      target = scale.getBasePixel();
    }

    if (target !== undefined && target !== null) {
      if (target.x !== undefined && target.y !== undefined) {
        return target;
      }

      if (helpers$1.isFinite(target)) {
        horizontal = scale.isHorizontal();
        return {
          x: horizontal ? target : null,
          y: horizontal ? null : target
        };
      }
    }

    return null;
  }

  function computeCircularBoundary(source) {
    var scale = source.el._scale;
    var options = scale.options;
    var length = scale.chart.data.labels.length;
    var fill = source.fill;
    var target = [];
    var start, end, center, i, point;

    if (!length) {
      return null;
    }

    start = options.ticks.reverse ? scale.max : scale.min;
    end = options.ticks.reverse ? scale.min : scale.max;
    center = scale.getPointPositionForValue(0, start);

    for (i = 0; i < length; ++i) {
      point = fill === 'start' || fill === 'end' ? scale.getPointPositionForValue(i, fill === 'start' ? start : end) : scale.getBasePosition(i);

      if (options.gridLines.circular) {
        point.cx = center.x;
        point.cy = center.y;
        point.angle = scale.getIndexAngle(i) - Math.PI / 2;
      }

      target.push(point);
    }

    return target;
  }

  function computeBoundary(source) {
    var scale = source.el._scale || {};

    if (scale.getPointPositionForValue) {
      return computeCircularBoundary(source);
    }

    return computeLinearBoundary(source);
  }

  function resolveTarget(sources, index, propagate) {
    var source = sources[index];
    var fill = source.fill;
    var visited = [index];
    var target;

    if (!propagate) {
      return fill;
    }

    while (fill !== false && visited.indexOf(fill) === -1) {
      if (!isFinite(fill)) {
        return fill;
      }

      target = sources[fill];

      if (!target) {
        return false;
      }

      if (target.visible) {
        return fill;
      }

      visited.push(fill);
      fill = target.fill;
    }

    return false;
  }

  function createMapper(source) {
    var fill = source.fill;
    var type = 'dataset';

    if (fill === false) {
      return null;
    }

    if (!isFinite(fill)) {
      type = 'boundary';
    }

    return mappers[type](source);
  }

  function isDrawable(point) {
    return point && !point.skip;
  }

  function drawArea(ctx, curve0, curve1, len0, len1) {
    var i, cx, cy, r;

    if (!len0 || !len1) {
      return;
    } // building first area curve (normal)


    ctx.moveTo(curve0[0].x, curve0[0].y);

    for (i = 1; i < len0; ++i) {
      helpers$1.canvas.lineTo(ctx, curve0[i - 1], curve0[i]);
    }

    if (curve1[0].angle !== undefined) {
      cx = curve1[0].cx;
      cy = curve1[0].cy;
      r = Math.sqrt(Math.pow(curve1[0].x - cx, 2) + Math.pow(curve1[0].y - cy, 2));

      for (i = len1 - 1; i > 0; --i) {
        ctx.arc(cx, cy, r, curve1[i].angle, curve1[i - 1].angle, true);
      }

      return;
    } // joining the two area curves


    ctx.lineTo(curve1[len1 - 1].x, curve1[len1 - 1].y); // building opposite area curve (reverse)

    for (i = len1 - 1; i > 0; --i) {
      helpers$1.canvas.lineTo(ctx, curve1[i], curve1[i - 1], true);
    }
  }

  function doFill(ctx, points, mapper, view, color, loop) {
    var count = points.length;
    var span = view.spanGaps;
    var curve0 = [];
    var curve1 = [];
    var len0 = 0;
    var len1 = 0;
    var i, ilen, index, p0, p1, d0, d1, loopOffset;
    ctx.beginPath();

    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i % count;
      p0 = points[index]._view;
      p1 = mapper(p0, index, view);
      d0 = isDrawable(p0);
      d1 = isDrawable(p1);

      if (loop && loopOffset === undefined && d0) {
        loopOffset = i + 1;
        ilen = count + loopOffset;
      }

      if (d0 && d1) {
        len0 = curve0.push(p0);
        len1 = curve1.push(p1);
      } else if (len0 && len1) {
        if (!span) {
          drawArea(ctx, curve0, curve1, len0, len1);
          len0 = len1 = 0;
          curve0 = [];
          curve1 = [];
        } else {
          if (d0) {
            curve0.push(p0);
          }

          if (d1) {
            curve1.push(p1);
          }
        }
      }
    }

    drawArea(ctx, curve0, curve1, len0, len1);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  var plugin_filler = {
    id: 'filler',
    afterDatasetsUpdate: function afterDatasetsUpdate(chart, options) {
      var count = (chart.data.datasets || []).length;
      var propagate = options.propagate;
      var sources = [];
      var meta, i, el, source;

      for (i = 0; i < count; ++i) {
        meta = chart.getDatasetMeta(i);
        el = meta.dataset;
        source = null;

        if (el && el._model && el instanceof elements.Line) {
          source = {
            visible: chart.isDatasetVisible(i),
            fill: decodeFill(el, i, count),
            chart: chart,
            el: el
          };
        }

        meta.$filler = source;
        sources.push(source);
      }

      for (i = 0; i < count; ++i) {
        source = sources[i];

        if (!source) {
          continue;
        }

        source.fill = resolveTarget(sources, i, propagate);
        source.boundary = computeBoundary(source);
        source.mapper = createMapper(source);
      }
    },
    beforeDatasetsDraw: function beforeDatasetsDraw(chart) {
      var metasets = chart._getSortedVisibleDatasetMetas();

      var ctx = chart.ctx;
      var meta, i, el, view, points, mapper, color;

      for (i = metasets.length - 1; i >= 0; --i) {
        meta = metasets[i].$filler;

        if (!meta || !meta.visible) {
          continue;
        }

        el = meta.el;
        view = el._view;
        points = el._children || [];
        mapper = meta.mapper;
        color = view.backgroundColor || core_defaults.global.defaultColor;

        if (mapper && color && points.length) {
          helpers$1.canvas.clipArea(ctx, chart.chartArea);
          doFill(ctx, points, mapper, view, color, el._loop);
          helpers$1.canvas.unclipArea(ctx);
        }
      }
    }
  };
  var getRtlHelper$1 = helpers$1.rtl.getRtlAdapter;
  var noop$1 = helpers$1.noop;
  var valueOrDefault$e = helpers$1.valueOrDefault;

  core_defaults._set('global', {
    legend: {
      display: true,
      position: 'top',
      align: 'center',
      fullWidth: true,
      reverse: false,
      weight: 1000,
      // a callback that will handle
      onClick: function onClick(e, legendItem) {
        var index = legendItem.datasetIndex;
        var ci = this.chart;
        var meta = ci.getDatasetMeta(index); // See controller.isDatasetVisible comment

        meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null; // We hid a dataset ... rerender the chart

        ci.update();
      },
      onHover: null,
      onLeave: null,
      labels: {
        boxWidth: 40,
        padding: 10,
        // Generates labels shown in the legend
        // Valid properties to return:
        // text : text to display
        // fillStyle : fill of coloured box
        // strokeStyle: stroke of coloured box
        // hidden : if this legend item refers to a hidden item
        // lineCap : cap style for line
        // lineDash
        // lineDashOffset :
        // lineJoin :
        // lineWidth :
        generateLabels: function generateLabels(chart) {
          var datasets = chart.data.datasets;
          var options = chart.options.legend || {};
          var usePointStyle = options.labels && options.labels.usePointStyle;
          return chart._getSortedDatasetMetas().map(function (meta) {
            var style = meta.controller.getStyle(usePointStyle ? 0 : undefined);
            return {
              text: datasets[meta.index].label,
              fillStyle: style.backgroundColor,
              hidden: !chart.isDatasetVisible(meta.index),
              lineCap: style.borderCapStyle,
              lineDash: style.borderDash,
              lineDashOffset: style.borderDashOffset,
              lineJoin: style.borderJoinStyle,
              lineWidth: style.borderWidth,
              strokeStyle: style.borderColor,
              pointStyle: style.pointStyle,
              rotation: style.rotation,
              // Below is extra data used for toggling the datasets
              datasetIndex: meta.index
            };
          }, this);
        }
      }
    },
    legendCallback: function legendCallback(chart) {
      var list = document.createElement('ul');
      var datasets = chart.data.datasets;
      var i, ilen, listItem, listItemSpan;
      list.setAttribute('class', chart.id + '-legend');

      for (i = 0, ilen = datasets.length; i < ilen; i++) {
        listItem = list.appendChild(document.createElement('li'));
        listItemSpan = listItem.appendChild(document.createElement('span'));
        listItemSpan.style.backgroundColor = datasets[i].backgroundColor;

        if (datasets[i].label) {
          listItem.appendChild(document.createTextNode(datasets[i].label));
        }
      }

      return list.outerHTML;
    }
  });
  /**
   * Helper function to get the box width based on the usePointStyle option
   * @param {object} labelopts - the label options on the legend
   * @param {number} fontSize - the label font size
   * @return {number} width of the color box area
   */


  function getBoxWidth(labelOpts, fontSize) {
    return labelOpts.usePointStyle && labelOpts.boxWidth > fontSize ? fontSize : labelOpts.boxWidth;
  }
  /**
   * IMPORTANT: this class is exposed publicly as Chart.Legend, backward compatibility required!
   */


  var Legend = core_element.extend({
    initialize: function initialize(config) {
      var me = this;
      helpers$1.extend(me, config); // Contains hit boxes for each dataset (in dataset order)

      me.legendHitBoxes = [];
      /**
      	 * @private
      	 */

      me._hoveredItem = null; // Are we in doughnut mode which has a different data type

      me.doughnutMode = false;
    },
    // These methods are ordered by lifecycle. Utilities then follow.
    // Any function defined here is inherited by all legend types.
    // Any function can be extended by the legend type
    beforeUpdate: noop$1,
    update: function update(maxWidth, maxHeight, margins) {
      var me = this; // Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)

      me.beforeUpdate(); // Absorb the master measurements

      me.maxWidth = maxWidth;
      me.maxHeight = maxHeight;
      me.margins = margins; // Dimensions

      me.beforeSetDimensions();
      me.setDimensions();
      me.afterSetDimensions(); // Labels

      me.beforeBuildLabels();
      me.buildLabels();
      me.afterBuildLabels(); // Fit

      me.beforeFit();
      me.fit();
      me.afterFit(); //

      me.afterUpdate();
      return me.minSize;
    },
    afterUpdate: noop$1,
    //
    beforeSetDimensions: noop$1,
    setDimensions: function setDimensions() {
      var me = this; // Set the unconstrained dimension before label rotation

      if (me.isHorizontal()) {
        // Reset position before calculating rotation
        me.width = me.maxWidth;
        me.left = 0;
        me.right = me.width;
      } else {
        me.height = me.maxHeight; // Reset position before calculating rotation

        me.top = 0;
        me.bottom = me.height;
      } // Reset padding


      me.paddingLeft = 0;
      me.paddingTop = 0;
      me.paddingRight = 0;
      me.paddingBottom = 0; // Reset minSize

      me.minSize = {
        width: 0,
        height: 0
      };
    },
    afterSetDimensions: noop$1,
    //
    beforeBuildLabels: noop$1,
    buildLabels: function buildLabels() {
      var me = this;
      var labelOpts = me.options.labels || {};
      var legendItems = helpers$1.callback(labelOpts.generateLabels, [me.chart], me) || [];

      if (labelOpts.filter) {
        legendItems = legendItems.filter(function (item) {
          return labelOpts.filter(item, me.chart.data);
        });
      }

      if (me.options.reverse) {
        legendItems.reverse();
      }

      me.legendItems = legendItems;
    },
    afterBuildLabels: noop$1,
    //
    beforeFit: noop$1,
    fit: function fit() {
      var me = this;
      var opts = me.options;
      var labelOpts = opts.labels;
      var display = opts.display;
      var ctx = me.ctx;

      var labelFont = helpers$1.options._parseFont(labelOpts);

      var fontSize = labelFont.size; // Reset hit boxes

      var hitboxes = me.legendHitBoxes = [];
      var minSize = me.minSize;
      var isHorizontal = me.isHorizontal();

      if (isHorizontal) {
        minSize.width = me.maxWidth; // fill all the width

        minSize.height = display ? 10 : 0;
      } else {
        minSize.width = display ? 10 : 0;
        minSize.height = me.maxHeight; // fill all the height
      } // Increase sizes here


      if (!display) {
        me.width = minSize.width = me.height = minSize.height = 0;
        return;
      }

      ctx.font = labelFont.string;

      if (isHorizontal) {
        // Labels
        // Width of each line of legend boxes. Labels wrap onto multiple lines when there are too many to fit on one
        var lineWidths = me.lineWidths = [0];
        var totalHeight = 0;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        helpers$1.each(me.legendItems, function (legendItem, i) {
          var boxWidth = getBoxWidth(labelOpts, fontSize);
          var width = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;

          if (i === 0 || lineWidths[lineWidths.length - 1] + width + 2 * labelOpts.padding > minSize.width) {
            totalHeight += fontSize + labelOpts.padding;
            lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
          } // Store the hitbox width and height here. Final position will be updated in `draw`


          hitboxes[i] = {
            left: 0,
            top: 0,
            width: width,
            height: fontSize
          };
          lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
        });
        minSize.height += totalHeight;
      } else {
        var vPadding = labelOpts.padding;
        var columnWidths = me.columnWidths = [];
        var columnHeights = me.columnHeights = [];
        var totalWidth = labelOpts.padding;
        var currentColWidth = 0;
        var currentColHeight = 0;
        helpers$1.each(me.legendItems, function (legendItem, i) {
          var boxWidth = getBoxWidth(labelOpts, fontSize);
          var itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width; // If too tall, go to new column

          if (i > 0 && currentColHeight + fontSize + 2 * vPadding > minSize.height) {
            totalWidth += currentColWidth + labelOpts.padding;
            columnWidths.push(currentColWidth); // previous column width

            columnHeights.push(currentColHeight);
            currentColWidth = 0;
            currentColHeight = 0;
          } // Get max width


          currentColWidth = Math.max(currentColWidth, itemWidth);
          currentColHeight += fontSize + vPadding; // Store the hitbox width and height here. Final position will be updated in `draw`

          hitboxes[i] = {
            left: 0,
            top: 0,
            width: itemWidth,
            height: fontSize
          };
        });
        totalWidth += currentColWidth;
        columnWidths.push(currentColWidth);
        columnHeights.push(currentColHeight);
        minSize.width += totalWidth;
      }

      me.width = minSize.width;
      me.height = minSize.height;
    },
    afterFit: noop$1,
    // Shared Methods
    isHorizontal: function isHorizontal() {
      return this.options.position === 'top' || this.options.position === 'bottom';
    },
    // Actually draw the legend on the canvas
    draw: function draw() {
      var me = this;
      var opts = me.options;
      var labelOpts = opts.labels;
      var globalDefaults = core_defaults.global;
      var defaultColor = globalDefaults.defaultColor;
      var lineDefault = globalDefaults.elements.line;
      var legendHeight = me.height;
      var columnHeights = me.columnHeights;
      var legendWidth = me.width;
      var lineWidths = me.lineWidths;

      if (!opts.display) {
        return;
      }

      var rtlHelper = getRtlHelper$1(opts.rtl, me.left, me.minSize.width);
      var ctx = me.ctx;
      var fontColor = valueOrDefault$e(labelOpts.fontColor, globalDefaults.defaultFontColor);

      var labelFont = helpers$1.options._parseFont(labelOpts);

      var fontSize = labelFont.size;
      var cursor; // Canvas setup

      ctx.textAlign = rtlHelper.textAlign('left');
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = fontColor; // for strikethrough effect

      ctx.fillStyle = fontColor; // render in correct colour

      ctx.font = labelFont.string;
      var boxWidth = getBoxWidth(labelOpts, fontSize);
      var hitboxes = me.legendHitBoxes; // current position

      var drawLegendBox = function drawLegendBox(x, y, legendItem) {
        if (isNaN(boxWidth) || boxWidth <= 0) {
          return;
        } // Set the ctx for the box


        ctx.save();
        var lineWidth = valueOrDefault$e(legendItem.lineWidth, lineDefault.borderWidth);
        ctx.fillStyle = valueOrDefault$e(legendItem.fillStyle, defaultColor);
        ctx.lineCap = valueOrDefault$e(legendItem.lineCap, lineDefault.borderCapStyle);
        ctx.lineDashOffset = valueOrDefault$e(legendItem.lineDashOffset, lineDefault.borderDashOffset);
        ctx.lineJoin = valueOrDefault$e(legendItem.lineJoin, lineDefault.borderJoinStyle);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = valueOrDefault$e(legendItem.strokeStyle, defaultColor);

        if (ctx.setLineDash) {
          // IE 9 and 10 do not support line dash
          ctx.setLineDash(valueOrDefault$e(legendItem.lineDash, lineDefault.borderDash));
        }

        if (labelOpts && labelOpts.usePointStyle) {
          // Recalculate x and y for drawPoint() because its expecting
          // x and y to be center of figure (instead of top left)
          var radius = boxWidth * Math.SQRT2 / 2;
          var centerX = rtlHelper.xPlus(x, boxWidth / 2);
          var centerY = y + fontSize / 2; // Draw pointStyle as legend symbol

          helpers$1.canvas.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY, legendItem.rotation);
        } else {
          // Draw box as legend symbol
          ctx.fillRect(rtlHelper.leftForLtr(x, boxWidth), y, boxWidth, fontSize);

          if (lineWidth !== 0) {
            ctx.strokeRect(rtlHelper.leftForLtr(x, boxWidth), y, boxWidth, fontSize);
          }
        }

        ctx.restore();
      };

      var fillText = function fillText(x, y, legendItem, textWidth) {
        var halfFontSize = fontSize / 2;
        var xLeft = rtlHelper.xPlus(x, boxWidth + halfFontSize);
        var yMiddle = y + halfFontSize;
        ctx.fillText(legendItem.text, xLeft, yMiddle);

        if (legendItem.hidden) {
          // Strikethrough the text if hidden
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.moveTo(xLeft, yMiddle);
          ctx.lineTo(rtlHelper.xPlus(xLeft, textWidth), yMiddle);
          ctx.stroke();
        }
      };

      var alignmentOffset = function alignmentOffset(dimension, blockSize) {
        switch (opts.align) {
          case 'start':
            return labelOpts.padding;

          case 'end':
            return dimension - blockSize;

          default:
            // center
            return (dimension - blockSize + labelOpts.padding) / 2;
        }
      }; // Horizontal


      var isHorizontal = me.isHorizontal();

      if (isHorizontal) {
        cursor = {
          x: me.left + alignmentOffset(legendWidth, lineWidths[0]),
          y: me.top + labelOpts.padding,
          line: 0
        };
      } else {
        cursor = {
          x: me.left + labelOpts.padding,
          y: me.top + alignmentOffset(legendHeight, columnHeights[0]),
          line: 0
        };
      }

      helpers$1.rtl.overrideTextDirection(me.ctx, opts.textDirection);
      var itemHeight = fontSize + labelOpts.padding;
      helpers$1.each(me.legendItems, function (legendItem, i) {
        var textWidth = ctx.measureText(legendItem.text).width;
        var width = boxWidth + fontSize / 2 + textWidth;
        var x = cursor.x;
        var y = cursor.y;
        rtlHelper.setWidth(me.minSize.width); // Use (me.left + me.minSize.width) and (me.top + me.minSize.height)
        // instead of me.right and me.bottom because me.width and me.height
        // may have been changed since me.minSize was calculated

        if (isHorizontal) {
          if (i > 0 && x + width + labelOpts.padding > me.left + me.minSize.width) {
            y = cursor.y += itemHeight;
            cursor.line++;
            x = cursor.x = me.left + alignmentOffset(legendWidth, lineWidths[cursor.line]);
          }
        } else if (i > 0 && y + itemHeight > me.top + me.minSize.height) {
          x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
          cursor.line++;
          y = cursor.y = me.top + alignmentOffset(legendHeight, columnHeights[cursor.line]);
        }

        var realX = rtlHelper.x(x);
        drawLegendBox(realX, y, legendItem);
        hitboxes[i].left = rtlHelper.leftForLtr(realX, hitboxes[i].width);
        hitboxes[i].top = y; // Fill the actual label

        fillText(realX, y, legendItem, textWidth);

        if (isHorizontal) {
          cursor.x += width + labelOpts.padding;
        } else {
          cursor.y += itemHeight;
        }
      });
      helpers$1.rtl.restoreTextDirection(me.ctx, opts.textDirection);
    },

    /**
     * @private
     */
    _getLegendItemAt: function _getLegendItemAt(x, y) {
      var me = this;
      var i, hitBox, lh;

      if (x >= me.left && x <= me.right && y >= me.top && y <= me.bottom) {
        // See if we are touching one of the dataset boxes
        lh = me.legendHitBoxes;

        for (i = 0; i < lh.length; ++i) {
          hitBox = lh[i];

          if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
            // Touching an element
            return me.legendItems[i];
          }
        }
      }

      return null;
    },

    /**
     * Handle an event
     * @private
     * @param {IEvent} event - The event to handle
     */
    handleEvent: function handleEvent(e) {
      var me = this;
      var opts = me.options;
      var type = e.type === 'mouseup' ? 'click' : e.type;
      var hoveredItem;

      if (type === 'mousemove') {
        if (!opts.onHover && !opts.onLeave) {
          return;
        }
      } else if (type === 'click') {
        if (!opts.onClick) {
          return;
        }
      } else {
        return;
      } // Chart event already has relative position in it


      hoveredItem = me._getLegendItemAt(e.x, e.y);

      if (type === 'click') {
        if (hoveredItem && opts.onClick) {
          // use e.native for backwards compatibility
          opts.onClick.call(me, e.native, hoveredItem);
        }
      } else {
        if (opts.onLeave && hoveredItem !== me._hoveredItem) {
          if (me._hoveredItem) {
            opts.onLeave.call(me, e.native, me._hoveredItem);
          }

          me._hoveredItem = hoveredItem;
        }

        if (opts.onHover && hoveredItem) {
          // use e.native for backwards compatibility
          opts.onHover.call(me, e.native, hoveredItem);
        }
      }
    }
  });

  function createNewLegendAndAttach(chart, legendOpts) {
    var legend = new Legend({
      ctx: chart.ctx,
      options: legendOpts,
      chart: chart
    });
    core_layouts.configure(chart, legend, legendOpts);
    core_layouts.addBox(chart, legend);
    chart.legend = legend;
  }

  var plugin_legend = {
    id: 'legend',

    /**
     * Backward compatibility: since 2.1.5, the legend is registered as a plugin, making
     * Chart.Legend obsolete. To avoid a breaking change, we export the Legend as part of
     * the plugin, which one will be re-exposed in the chart.js file.
     * https://github.com/chartjs/Chart.js/pull/2640
     * @private
     */
    _element: Legend,
    beforeInit: function beforeInit(chart) {
      var legendOpts = chart.options.legend;

      if (legendOpts) {
        createNewLegendAndAttach(chart, legendOpts);
      }
    },
    beforeUpdate: function beforeUpdate(chart) {
      var legendOpts = chart.options.legend;
      var legend = chart.legend;

      if (legendOpts) {
        helpers$1.mergeIf(legendOpts, core_defaults.global.legend);

        if (legend) {
          core_layouts.configure(chart, legend, legendOpts);
          legend.options = legendOpts;
        } else {
          createNewLegendAndAttach(chart, legendOpts);
        }
      } else if (legend) {
        core_layouts.removeBox(chart, legend);
        delete chart.legend;
      }
    },
    afterEvent: function afterEvent(chart, e) {
      var legend = chart.legend;

      if (legend) {
        legend.handleEvent(e);
      }
    }
  };
  var noop$2 = helpers$1.noop;

  core_defaults._set('global', {
    title: {
      display: false,
      fontStyle: 'bold',
      fullWidth: true,
      padding: 10,
      position: 'top',
      text: '',
      weight: 2000 // by default greater than legend (1000) to be above

    }
  });
  /**
   * IMPORTANT: this class is exposed publicly as Chart.Legend, backward compatibility required!
   */


  var Title = core_element.extend({
    initialize: function initialize(config) {
      var me = this;
      helpers$1.extend(me, config); // Contains hit boxes for each dataset (in dataset order)

      me.legendHitBoxes = [];
    },
    // These methods are ordered by lifecycle. Utilities then follow.
    beforeUpdate: noop$2,
    update: function update(maxWidth, maxHeight, margins) {
      var me = this; // Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)

      me.beforeUpdate(); // Absorb the master measurements

      me.maxWidth = maxWidth;
      me.maxHeight = maxHeight;
      me.margins = margins; // Dimensions

      me.beforeSetDimensions();
      me.setDimensions();
      me.afterSetDimensions(); // Labels

      me.beforeBuildLabels();
      me.buildLabels();
      me.afterBuildLabels(); // Fit

      me.beforeFit();
      me.fit();
      me.afterFit(); //

      me.afterUpdate();
      return me.minSize;
    },
    afterUpdate: noop$2,
    //
    beforeSetDimensions: noop$2,
    setDimensions: function setDimensions() {
      var me = this; // Set the unconstrained dimension before label rotation

      if (me.isHorizontal()) {
        // Reset position before calculating rotation
        me.width = me.maxWidth;
        me.left = 0;
        me.right = me.width;
      } else {
        me.height = me.maxHeight; // Reset position before calculating rotation

        me.top = 0;
        me.bottom = me.height;
      } // Reset padding


      me.paddingLeft = 0;
      me.paddingTop = 0;
      me.paddingRight = 0;
      me.paddingBottom = 0; // Reset minSize

      me.minSize = {
        width: 0,
        height: 0
      };
    },
    afterSetDimensions: noop$2,
    //
    beforeBuildLabels: noop$2,
    buildLabels: noop$2,
    afterBuildLabels: noop$2,
    //
    beforeFit: noop$2,
    fit: function fit() {
      var me = this;
      var opts = me.options;
      var minSize = me.minSize = {};
      var isHorizontal = me.isHorizontal();
      var lineCount, textSize;

      if (!opts.display) {
        me.width = minSize.width = me.height = minSize.height = 0;
        return;
      }

      lineCount = helpers$1.isArray(opts.text) ? opts.text.length : 1;
      textSize = lineCount * helpers$1.options._parseFont(opts).lineHeight + opts.padding * 2;
      me.width = minSize.width = isHorizontal ? me.maxWidth : textSize;
      me.height = minSize.height = isHorizontal ? textSize : me.maxHeight;
    },
    afterFit: noop$2,
    // Shared Methods
    isHorizontal: function isHorizontal() {
      var pos = this.options.position;
      return pos === 'top' || pos === 'bottom';
    },
    // Actually draw the title block on the canvas
    draw: function draw() {
      var me = this;
      var ctx = me.ctx;
      var opts = me.options;

      if (!opts.display) {
        return;
      }

      var fontOpts = helpers$1.options._parseFont(opts);

      var lineHeight = fontOpts.lineHeight;
      var offset = lineHeight / 2 + opts.padding;
      var rotation = 0;
      var top = me.top;
      var left = me.left;
      var bottom = me.bottom;
      var right = me.right;
      var maxWidth, titleX, titleY;
      ctx.fillStyle = helpers$1.valueOrDefault(opts.fontColor, core_defaults.global.defaultFontColor); // render in correct colour

      ctx.font = fontOpts.string; // Horizontal

      if (me.isHorizontal()) {
        titleX = left + (right - left) / 2; // midpoint of the width

        titleY = top + offset;
        maxWidth = right - left;
      } else {
        titleX = opts.position === 'left' ? left + offset : right - offset;
        titleY = top + (bottom - top) / 2;
        maxWidth = bottom - top;
        rotation = Math.PI * (opts.position === 'left' ? -0.5 : 0.5);
      }

      ctx.save();
      ctx.translate(titleX, titleY);
      ctx.rotate(rotation);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var text = opts.text;

      if (helpers$1.isArray(text)) {
        var y = 0;

        for (var i = 0; i < text.length; ++i) {
          ctx.fillText(text[i], 0, y, maxWidth);
          y += lineHeight;
        }
      } else {
        ctx.fillText(text, 0, 0, maxWidth);
      }

      ctx.restore();
    }
  });

  function createNewTitleBlockAndAttach(chart, titleOpts) {
    var title = new Title({
      ctx: chart.ctx,
      options: titleOpts,
      chart: chart
    });
    core_layouts.configure(chart, title, titleOpts);
    core_layouts.addBox(chart, title);
    chart.titleBlock = title;
  }

  var plugin_title = {
    id: 'title',

    /**
     * Backward compatibility: since 2.1.5, the title is registered as a plugin, making
     * Chart.Title obsolete. To avoid a breaking change, we export the Title as part of
     * the plugin, which one will be re-exposed in the chart.js file.
     * https://github.com/chartjs/Chart.js/pull/2640
     * @private
     */
    _element: Title,
    beforeInit: function beforeInit(chart) {
      var titleOpts = chart.options.title;

      if (titleOpts) {
        createNewTitleBlockAndAttach(chart, titleOpts);
      }
    },
    beforeUpdate: function beforeUpdate(chart) {
      var titleOpts = chart.options.title;
      var titleBlock = chart.titleBlock;

      if (titleOpts) {
        helpers$1.mergeIf(titleOpts, core_defaults.global.title);

        if (titleBlock) {
          core_layouts.configure(chart, titleBlock, titleOpts);
          titleBlock.options = titleOpts;
        } else {
          createNewTitleBlockAndAttach(chart, titleOpts);
        }
      } else if (titleBlock) {
        core_layouts.removeBox(chart, titleBlock);
        delete chart.titleBlock;
      }
    }
  };
  var plugins = {};
  var filler = plugin_filler;
  var legend = plugin_legend;
  var title = plugin_title;
  plugins.filler = filler;
  plugins.legend = legend;
  plugins.title = title;
  /**
   * @namespace Chart
   */

  core_controller.helpers = helpers$1; // @todo dispatch these helpers into appropriated helpers/helpers.* file and write unit tests!

  core_helpers();
  core_controller._adapters = core_adapters;
  core_controller.Animation = core_animation;
  core_controller.animationService = core_animations;
  core_controller.controllers = controllers;
  core_controller.DatasetController = core_datasetController;
  core_controller.defaults = core_defaults;
  core_controller.Element = core_element;
  core_controller.elements = elements;
  core_controller.Interaction = core_interaction;
  core_controller.layouts = core_layouts;
  core_controller.platform = platform;
  core_controller.plugins = core_plugins;
  core_controller.Scale = core_scale;
  core_controller.scaleService = core_scaleService;
  core_controller.Ticks = core_ticks;
  core_controller.Tooltip = core_tooltip; // Register built-in scales

  core_controller.helpers.each(scales, function (scale, type) {
    core_controller.scaleService.registerScaleType(type, scale, scale._defaults);
  }); // Load to register built-in adapters (as side effects)
  // Loading built-in plugins

  for (var k in plugins) {
    if (plugins.hasOwnProperty(k)) {
      core_controller.plugins.register(plugins[k]);
    }
  }

  core_controller.platform.initialize();
  var src = core_controller;

  if (typeof window !== 'undefined') {
    window.Chart = core_controller;
  } // DEPRECATIONS

  /**
   * Provided for backward compatibility, not available anymore
   * @namespace Chart.Chart
   * @deprecated since version 2.8.0
   * @todo remove at version 3
   * @private
   */


  core_controller.Chart = core_controller;
  /**
   * Provided for backward compatibility, not available anymore
   * @namespace Chart.Legend
   * @deprecated since version 2.1.5
   * @todo remove at version 3
   * @private
   */

  core_controller.Legend = plugins.legend._element;
  /**
   * Provided for backward compatibility, not available anymore
   * @namespace Chart.Title
   * @deprecated since version 2.1.5
   * @todo remove at version 3
   * @private
   */

  core_controller.Title = plugins.title._element;
  /**
   * Provided for backward compatibility, use Chart.plugins instead
   * @namespace Chart.pluginService
   * @deprecated since version 2.1.5
   * @todo remove at version 3
   * @private
   */

  core_controller.pluginService = core_controller.plugins;
  /**
   * Provided for backward compatibility, inheriting from Chart.PlugingBase has no
   * effect, instead simply create/register plugins via plain JavaScript objects.
   * @interface Chart.PluginBase
   * @deprecated since version 2.5.0
   * @todo remove at version 3
   * @private
   */

  core_controller.PluginBase = core_controller.Element.extend({});
  /**
   * Provided for backward compatibility, use Chart.helpers.canvas instead.
   * @namespace Chart.canvasHelpers
   * @deprecated since version 2.6.0
   * @todo remove at version 3
   * @private
   */

  core_controller.canvasHelpers = core_controller.helpers.canvas;
  /**
   * Provided for backward compatibility, use Chart.layouts instead.
   * @namespace Chart.layoutService
   * @deprecated since version 2.7.3
   * @todo remove at version 3
   * @private
   */

  core_controller.layoutService = core_controller.layouts;
  /**
   * Provided for backward compatibility, not available anymore.
   * @namespace Chart.LinearScaleBase
   * @deprecated since version 2.8
   * @todo remove at version 3
   * @private
   */

  core_controller.LinearScaleBase = scale_linearbase;
  /**
   * Provided for backward compatibility, instead we should create a new Chart
   * by setting the type in the config (`new Chart(id, {type: '{chart-type}'}`).
   * @deprecated since version 2.8.0
   * @todo remove at version 3
   */

  core_controller.helpers.each(['Bar', 'Bubble', 'Doughnut', 'Line', 'PolarArea', 'Radar', 'Scatter'], function (klass) {
    core_controller[klass] = function (ctx, cfg) {
      return new core_controller(ctx, core_controller.helpers.merge(cfg || {}, {
        type: klass.charAt(0).toLowerCase() + klass.slice(1)
      }));
    };
  });
  return src;
});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _toConsumableArray; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
var arrayLikeToArray = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return Object(arrayLikeToArray["a" /* default */])(arr);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__(8);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || Object(unsupportedIterableToArray["a" /* default */])(arr) || _nonIterableSpread();
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.11.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var h = __webpack_require__(12),
    n = "function" === typeof Symbol && Symbol.for,
    p = n ? Symbol.for("react.element") : 60103,
    q = n ? Symbol.for("react.portal") : 60106,
    r = n ? Symbol.for("react.fragment") : 60107,
    t = n ? Symbol.for("react.strict_mode") : 60108,
    u = n ? Symbol.for("react.profiler") : 60114,
    v = n ? Symbol.for("react.provider") : 60109,
    w = n ? Symbol.for("react.context") : 60110,
    x = n ? Symbol.for("react.forward_ref") : 60112,
    y = n ? Symbol.for("react.suspense") : 60113;

n && Symbol.for("react.suspense_list");
var z = n ? Symbol.for("react.memo") : 60115,
    aa = n ? Symbol.for("react.lazy") : 60116;
n && Symbol.for("react.fundamental");
n && Symbol.for("react.responder");
n && Symbol.for("react.scope");
var A = "function" === typeof Symbol && Symbol.iterator;

function B(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) {
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  }

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var C = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
},
    D = {};

function E(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = c || C;
}

E.prototype.isReactComponent = {};

E.prototype.setState = function (a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(B(85));
  this.updater.enqueueSetState(this, a, b, "setState");
};

E.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function F() {}

F.prototype = E.prototype;

function G(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = c || C;
}

var H = G.prototype = new F();
H.constructor = G;
h(H, E.prototype);
H.isPureReactComponent = !0;
var I = {
  current: null
},
    J = {
  current: null
},
    K = Object.prototype.hasOwnProperty,
    L = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function M(a, b, c) {
  var e,
      d = {},
      g = null,
      l = null;
  if (null != b) for (e in void 0 !== b.ref && (l = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    K.call(b, e) && !L.hasOwnProperty(e) && (d[e] = b[e]);
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = c;else if (1 < f) {
    for (var k = Array(f), m = 0; m < f; m++) {
      k[m] = arguments[m + 2];
    }

    d.children = k;
  }
  if (a && a.defaultProps) for (e in f = a.defaultProps, f) {
    void 0 === d[e] && (d[e] = f[e]);
  }
  return {
    $$typeof: p,
    type: a,
    key: g,
    ref: l,
    props: d,
    _owner: J.current
  };
}

function ba(a, b) {
  return {
    $$typeof: p,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function N(a) {
  return "object" === typeof a && null !== a && a.$$typeof === p;
}

function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var O = /\/+/g,
    P = [];

function Q(a, b, c, e) {
  if (P.length) {
    var d = P.pop();
    d.result = a;
    d.keyPrefix = b;
    d.func = c;
    d.context = e;
    d.count = 0;
    return d;
  }

  return {
    result: a,
    keyPrefix: b,
    func: c,
    context: e,
    count: 0
  };
}

function R(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > P.length && P.push(a);
}

function S(a, b, c, e) {
  var d = typeof a;
  if ("undefined" === d || "boolean" === d) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (d) {
    case "string":
    case "number":
      g = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case p:
        case q:
          g = !0;
      }

  }
  if (g) return c(e, a, "" === b ? "." + T(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var l = 0; l < a.length; l++) {
    d = a[l];
    var f = b + T(d, l);
    g += S(d, f, c, e);
  } else if (null === a || "object" !== typeof a ? f = null : (f = A && a[A] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), l = 0; !(d = a.next()).done;) {
    d = d.value, f = b + T(d, l++), g += S(d, f, c, e);
  } else if ("object" === d) throw c = "" + a, Error(B(31, "[object Object]" === c ? "object with keys {" + Object.keys(a).join(", ") + "}" : c, ""));
  return g;
}

function U(a, b, c) {
  return null == a ? 0 : S(a, "", b, c);
}

function T(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}

function ca(a, b) {
  a.func.call(a.context, b, a.count++);
}

function da(a, b, c) {
  var e = a.result,
      d = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? V(a, e, c, function (a) {
    return a;
  }) : null != a && (N(a) && (a = ba(a, d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(O, "$&/") + "/") + c)), e.push(a));
}

function V(a, b, c, e, d) {
  var g = "";
  null != c && (g = ("" + c).replace(O, "$&/") + "/");
  b = Q(b, g, e, d);
  U(a, da, b);
  R(b);
}

function W() {
  var a = I.current;
  if (null === a) throw Error(B(321));
  return a;
}

var X = {
  Children: {
    map: function map(a, b, c) {
      if (null == a) return a;
      var e = [];
      V(a, e, null, b, c);
      return e;
    },
    forEach: function forEach(a, b, c) {
      if (null == a) return a;
      b = Q(null, null, b, c);
      U(a, ca, b);
      R(b);
    },
    count: function count(a) {
      return U(a, function () {
        return null;
      }, null);
    },
    toArray: function toArray(a) {
      var b = [];
      V(a, b, null, function (a) {
        return a;
      });
      return b;
    },
    only: function only(a) {
      if (!N(a)) throw Error(B(143));
      return a;
    }
  },
  createRef: function createRef() {
    return {
      current: null
    };
  },
  Component: E,
  PureComponent: G,
  createContext: function createContext(a, b) {
    void 0 === b && (b = null);
    a = {
      $$typeof: w,
      _calculateChangedBits: b,
      _currentValue: a,
      _currentValue2: a,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    a.Provider = {
      $$typeof: v,
      _context: a
    };
    return a.Consumer = a;
  },
  forwardRef: function forwardRef(a) {
    return {
      $$typeof: x,
      render: a
    };
  },
  lazy: function lazy(a) {
    return {
      $$typeof: aa,
      _ctor: a,
      _status: -1,
      _result: null
    };
  },
  memo: function memo(a, b) {
    return {
      $$typeof: z,
      type: a,
      compare: void 0 === b ? null : b
    };
  },
  useCallback: function useCallback(a, b) {
    return W().useCallback(a, b);
  },
  useContext: function useContext(a, b) {
    return W().useContext(a, b);
  },
  useEffect: function useEffect(a, b) {
    return W().useEffect(a, b);
  },
  useImperativeHandle: function useImperativeHandle(a, b, c) {
    return W().useImperativeHandle(a, b, c);
  },
  useDebugValue: function useDebugValue() {},
  useLayoutEffect: function useLayoutEffect(a, b) {
    return W().useLayoutEffect(a, b);
  },
  useMemo: function useMemo(a, b) {
    return W().useMemo(a, b);
  },
  useReducer: function useReducer(a, b, c) {
    return W().useReducer(a, b, c);
  },
  useRef: function useRef(a) {
    return W().useRef(a);
  },
  useState: function useState(a) {
    return W().useState(a);
  },
  Fragment: r,
  Profiler: u,
  StrictMode: t,
  Suspense: y,
  createElement: M,
  cloneElement: function cloneElement(a, b, c) {
    if (null === a || void 0 === a) throw Error(B(267, a));
    var e = h({}, a.props),
        d = a.key,
        g = a.ref,
        l = a._owner;

    if (null != b) {
      void 0 !== b.ref && (g = b.ref, l = J.current);
      void 0 !== b.key && (d = "" + b.key);
      if (a.type && a.type.defaultProps) var f = a.type.defaultProps;

      for (k in b) {
        K.call(b, k) && !L.hasOwnProperty(k) && (e[k] = void 0 === b[k] && void 0 !== f ? f[k] : b[k]);
      }
    }

    var k = arguments.length - 2;
    if (1 === k) e.children = c;else if (1 < k) {
      f = Array(k);

      for (var m = 0; m < k; m++) {
        f[m] = arguments[m + 2];
      }

      e.children = f;
    }
    return {
      $$typeof: p,
      type: a.type,
      key: d,
      ref: g,
      props: e,
      _owner: l
    };
  },
  createFactory: function createFactory(a) {
    var b = M.bind(null, a);
    b.type = a;
    return b;
  },
  isValidElement: N,
  version: "16.11.0",
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentDispatcher: I,
    ReactCurrentBatchConfig: {
      suspense: null
    },
    ReactCurrentOwner: J,
    IsSomeRendererActing: {
      current: !1
    },
    assign: h
  }
},
    Y = {
  default: X
},
    Z = Y && X || Y;
module.exports = Z.default || Z;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.11.0
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/


var aa = __webpack_require__(0),
    n = __webpack_require__(12),
    q = __webpack_require__(19);

function u(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) {
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  }

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

if (!aa) throw Error(u(227));
var ba = null,
    ca = {};

function da() {
  if (ba) for (var a in ca) {
    var b = ca[a],
        c = ba.indexOf(a);
    if (!(-1 < c)) throw Error(u(96, a));

    if (!ea[c]) {
      if (!b.extractEvents) throw Error(u(97, a));
      ea[c] = b;
      c = b.eventTypes;

      for (var d in c) {
        var e = void 0;
        var f = c[d],
            g = b,
            h = d;
        if (fa.hasOwnProperty(h)) throw Error(u(99, h));
        fa[h] = f;
        var k = f.phasedRegistrationNames;

        if (k) {
          for (e in k) {
            k.hasOwnProperty(e) && ha(k[e], g, h);
          }

          e = !0;
        } else f.registrationName ? (ha(f.registrationName, g, h), e = !0) : e = !1;

        if (!e) throw Error(u(98, d, a));
      }
    }
  }
}

function ha(a, b, c) {
  if (ia[a]) throw Error(u(100, a));
  ia[a] = b;
  ja[a] = b.eventTypes[c].dependencies;
}

var ea = [],
    fa = {},
    ia = {},
    ja = {};

function ka(a, b, c, d, e, f, g, h, k) {
  var l = Array.prototype.slice.call(arguments, 3);

  try {
    b.apply(c, l);
  } catch (m) {
    this.onError(m);
  }
}

var la = !1,
    ma = null,
    na = !1,
    oa = null,
    pa = {
  onError: function onError(a) {
    la = !0;
    ma = a;
  }
};

function qa(a, b, c, d, e, f, g, h, k) {
  la = !1;
  ma = null;
  ka.apply(pa, arguments);
}

function ra(a, b, c, d, e, f, g, h, k) {
  qa.apply(this, arguments);

  if (la) {
    if (la) {
      var l = ma;
      la = !1;
      ma = null;
    } else throw Error(u(198));

    na || (na = !0, oa = l);
  }
}

var sa = null,
    ua = null,
    va = null;

function wa(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = va(c);
  ra(d, b, void 0, a);
  a.currentTarget = null;
}

function xa(a, b) {
  if (null == b) throw Error(u(30));
  if (null == a) return b;

  if (Array.isArray(a)) {
    if (Array.isArray(b)) return a.push.apply(a, b), a;
    a.push(b);
    return a;
  }

  return Array.isArray(b) ? [a].concat(b) : [a, b];
}

function ya(a, b, c) {
  Array.isArray(a) ? a.forEach(b, c) : a && b.call(c, a);
}

var za = null;

function Aa(a) {
  if (a) {
    var b = a._dispatchListeners,
        c = a._dispatchInstances;
    if (Array.isArray(b)) for (var d = 0; d < b.length && !a.isPropagationStopped(); d++) {
      wa(a, b[d], c[d]);
    } else b && wa(a, b, c);
    a._dispatchListeners = null;
    a._dispatchInstances = null;
    a.isPersistent() || a.constructor.release(a);
  }
}

function Ba(a) {
  null !== a && (za = xa(za, a));
  a = za;
  za = null;

  if (a) {
    ya(a, Aa);
    if (za) throw Error(u(95));
    if (na) throw a = oa, na = !1, oa = null, a;
  }
}

var Ca = {
  injectEventPluginOrder: function injectEventPluginOrder(a) {
    if (ba) throw Error(u(101));
    ba = Array.prototype.slice.call(a);
    da();
  },
  injectEventPluginsByName: function injectEventPluginsByName(a) {
    var b = !1,
        c;

    for (c in a) {
      if (a.hasOwnProperty(c)) {
        var d = a[c];

        if (!ca.hasOwnProperty(c) || ca[c] !== d) {
          if (ca[c]) throw Error(u(102, c));
          ca[c] = d;
          b = !0;
        }
      }
    }

    b && da();
  }
};

function Da(a, b) {
  var c = a.stateNode;
  if (!c) return null;
  var d = sa(c);
  if (!d) return null;
  c = d[b];

  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;

    default:
      a = !1;
  }

  if (a) return null;
  if (c && "function" !== typeof c) throw Error(u(231, b, typeof c));
  return c;
}

var Ea = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
Ea.hasOwnProperty("ReactCurrentDispatcher") || (Ea.ReactCurrentDispatcher = {
  current: null
});
Ea.hasOwnProperty("ReactCurrentBatchConfig") || (Ea.ReactCurrentBatchConfig = {
  suspense: null
});
var Fa = /^(.*)[\\\/]/,
    w = "function" === typeof Symbol && Symbol.for,
    Ga = w ? Symbol.for("react.element") : 60103,
    Ha = w ? Symbol.for("react.portal") : 60106,
    Ia = w ? Symbol.for("react.fragment") : 60107,
    Ja = w ? Symbol.for("react.strict_mode") : 60108,
    Ka = w ? Symbol.for("react.profiler") : 60114,
    La = w ? Symbol.for("react.provider") : 60109,
    Ma = w ? Symbol.for("react.context") : 60110,
    Na = w ? Symbol.for("react.concurrent_mode") : 60111,
    Oa = w ? Symbol.for("react.forward_ref") : 60112,
    Pa = w ? Symbol.for("react.suspense") : 60113,
    Qa = w ? Symbol.for("react.suspense_list") : 60120,
    Ra = w ? Symbol.for("react.memo") : 60115,
    Sa = w ? Symbol.for("react.lazy") : 60116;
w && Symbol.for("react.fundamental");
w && Symbol.for("react.responder");
w && Symbol.for("react.scope");
var Ta = "function" === typeof Symbol && Symbol.iterator;

function Ua(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ta && a[Ta] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}

function Va(a) {
  if (-1 === a._status) {
    a._status = 0;
    var b = a._ctor;
    b = b();
    a._result = b;
    b.then(function (b) {
      0 === a._status && (b = b.default, a._status = 1, a._result = b);
    }, function (b) {
      0 === a._status && (a._status = 2, a._result = b);
    });
  }
}

function Wa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;

  switch (a) {
    case Ia:
      return "Fragment";

    case Ha:
      return "Portal";

    case Ka:
      return "Profiler";

    case Ja:
      return "StrictMode";

    case Pa:
      return "Suspense";

    case Qa:
      return "SuspenseList";
  }

  if ("object" === typeof a) switch (a.$$typeof) {
    case Ma:
      return "Context.Consumer";

    case La:
      return "Context.Provider";

    case Oa:
      var b = a.render;
      b = b.displayName || b.name || "";
      return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");

    case Ra:
      return Wa(a.type);

    case Sa:
      if (a = 1 === a._status ? a._result : null) return Wa(a);
  }
  return null;
}

function Xa(a) {
  var b = "";

  do {
    a: switch (a.tag) {
      case 3:
      case 4:
      case 6:
      case 7:
      case 10:
      case 9:
        var c = "";
        break a;

      default:
        var d = a._debugOwner,
            e = a._debugSource,
            f = Wa(a.type);
        c = null;
        d && (c = Wa(d.type));
        d = f;
        f = "";
        e ? f = " (at " + e.fileName.replace(Fa, "") + ":" + e.lineNumber + ")" : c && (f = " (created by " + c + ")");
        c = "\n    in " + (d || "Unknown") + f;
    }

    b += c;
    a = a.return;
  } while (a);

  return b;
}

var Ya = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement),
    Za = null,
    $a = null,
    ab = null;

function bb(a) {
  if (a = ua(a)) {
    if ("function" !== typeof Za) throw Error(u(280));
    var b = sa(a.stateNode);
    Za(a.stateNode, a.type, b);
  }
}

function cb(a) {
  $a ? ab ? ab.push(a) : ab = [a] : $a = a;
}

function db() {
  if ($a) {
    var a = $a,
        b = ab;
    ab = $a = null;
    bb(a);
    if (b) for (a = 0; a < b.length; a++) {
      bb(b[a]);
    }
  }
}

function eb(a, b) {
  return a(b);
}

function fb(a, b, c, d) {
  return a(b, c, d);
}

function gb() {}

var hb = eb,
    ib = !1,
    jb = !1;

function kb() {
  if (null !== $a || null !== ab) gb(), db();
}

new Map();
var lb = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    mb = Object.prototype.hasOwnProperty,
    nb = {},
    ob = {};

function pb(a) {
  if (mb.call(ob, a)) return !0;
  if (mb.call(nb, a)) return !1;
  if (lb.test(a)) return ob[a] = !0;
  nb[a] = !0;
  return !1;
}

function qb(a, b, c, d) {
  if (null !== c && 0 === c.type) return !1;

  switch (typeof b) {
    case "function":
    case "symbol":
      return !0;

    case "boolean":
      if (d) return !1;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;

    default:
      return !1;
  }
}

function rb(a, b, c, d) {
  if (null === b || "undefined" === typeof b || qb(a, b, c, d)) return !0;
  if (d) return !1;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;

    case 4:
      return !1 === b;

    case 5:
      return isNaN(b);

    case 6:
      return isNaN(b) || 1 > b;
  }
  return !1;
}

function B(a, b, c, d, e, f) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f;
}

var D = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
  D[a] = new B(a, 0, !1, a, null, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
  var b = a[0];
  D[b] = new B(b, 1, !1, a[1], null, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
  D[a] = new B(a, 2, !1, a.toLowerCase(), null, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (a) {
  D[a] = new B(a, 2, !1, a, null, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
  D[a] = new B(a, 3, !1, a.toLowerCase(), null, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function (a) {
  D[a] = new B(a, 3, !0, a, null, !1);
});
["capture", "download"].forEach(function (a) {
  D[a] = new B(a, 4, !1, a, null, !1);
});
["cols", "rows", "size", "span"].forEach(function (a) {
  D[a] = new B(a, 6, !1, a, null, !1);
});
["rowSpan", "start"].forEach(function (a) {
  D[a] = new B(a, 5, !1, a.toLowerCase(), null, !1);
});
var sb = /[\-:]([a-z])/g;

function tb(a) {
  return a[1].toUpperCase();
}

"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
  var b = a.replace(sb, tb);
  D[b] = new B(b, 1, !1, a, null, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
  var b = a.replace(sb, tb);
  D[b] = new B(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
  var b = a.replace(sb, tb);
  D[b] = new B(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1);
});
["tabIndex", "crossOrigin"].forEach(function (a) {
  D[a] = new B(a, 1, !1, a.toLowerCase(), null, !1);
});
D.xlinkHref = new B("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0);
["src", "href", "action", "formAction"].forEach(function (a) {
  D[a] = new B(a, 1, !1, a.toLowerCase(), null, !0);
});

function ub(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return a;

    default:
      return "";
  }
}

function vb(a, b, c, d) {
  var e = D.hasOwnProperty(b) ? D[b] : null;
  var f = null !== e ? 0 === e.type : d ? !1 : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? !1 : !0;
  f || (rb(b, c, e, d) && (c = null), d || null === e ? pb(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
}

function wb(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}

function xb(a) {
  var b = wb(a) ? "checked" : "value",
      c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
      d = "" + a[b];

  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get,
        f = c.set;
    Object.defineProperty(a, b, {
      configurable: !0,
      get: function get() {
        return e.call(this);
      },
      set: function set(a) {
        d = "" + a;
        f.call(this, a);
      }
    });
    Object.defineProperty(a, b, {
      enumerable: c.enumerable
    });
    return {
      getValue: function getValue() {
        return d;
      },
      setValue: function setValue(a) {
        d = "" + a;
      },
      stopTracking: function stopTracking() {
        a._valueTracker = null;
        delete a[b];
      }
    };
  }
}

function yb(a) {
  a._valueTracker || (a._valueTracker = xb(a));
}

function zb(a) {
  if (!a) return !1;
  var b = a._valueTracker;
  if (!b) return !0;
  var c = b.getValue();
  var d = "";
  a && (d = wb(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), !0) : !1;
}

function Ab(a, b) {
  var c = b.checked;
  return n({}, b, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != c ? c : a._wrapperState.initialChecked
  });
}

function Bb(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue,
      d = null != b.checked ? b.checked : b.defaultChecked;
  c = ub(null != b.value ? b.value : c);
  a._wrapperState = {
    initialChecked: d,
    initialValue: c,
    controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
  };
}

function Cb(a, b) {
  b = b.checked;
  null != b && vb(a, "checked", b, !1);
}

function Eb(a, b) {
  Cb(a, b);
  var c = ub(b.value),
      d = b.type;
  if (null != c) {
    if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
  } else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? Fb(a, b.type, c) : b.hasOwnProperty("defaultValue") && Fb(a, b.type, ub(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}

function Gb(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }

  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !a.defaultChecked;
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}

function Fb(a, b, c) {
  if ("number" !== b || a.ownerDocument.activeElement !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}

function Hb(a) {
  var b = "";
  aa.Children.forEach(a, function (a) {
    null != a && (b += a);
  });
  return b;
}

function Ib(a, b) {
  a = n({
    children: void 0
  }, b);
  if (b = Hb(b.children)) a.children = b;
  return a;
}

function Jb(a, b, c, d) {
  a = a.options;

  if (b) {
    b = {};

    for (var e = 0; e < c.length; e++) {
      b["$" + c[e]] = !0;
    }

    for (c = 0; c < a.length; c++) {
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
    }
  } else {
    c = "" + ub(c);
    b = null;

    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = !0;
        d && (a[e].defaultSelected = !0);
        return;
      }

      null !== b || a[e].disabled || (b = a[e]);
    }

    null !== b && (b.selected = !0);
  }
}

function Kb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(u(91));
  return n({}, b, {
    value: void 0,
    defaultValue: void 0,
    children: "" + a._wrapperState.initialValue
  });
}

function Lb(a, b) {
  var c = b.value;

  if (null == c) {
    c = b.defaultValue;
    b = b.children;

    if (null != b) {
      if (null != c) throw Error(u(92));

      if (Array.isArray(b)) {
        if (!(1 >= b.length)) throw Error(u(93));
        b = b[0];
      }

      c = b;
    }

    null == c && (c = "");
  }

  a._wrapperState = {
    initialValue: ub(c)
  };
}

function Mb(a, b) {
  var c = ub(b.value),
      d = ub(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}

function Nb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}

var Ob = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};

function Pb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";

    case "math":
      return "http://www.w3.org/1998/Math/MathML";

    default:
      return "http://www.w3.org/1999/xhtml";
  }
}

function Qb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? Pb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}

var Rb,
    Sb = function (a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function () {
      return a(b, c, d, e);
    });
  } : a;
}(function (a, b) {
  if (a.namespaceURI !== Ob.svg || "innerHTML" in a) a.innerHTML = b;else {
    Rb = Rb || document.createElement("div");
    Rb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";

    for (b = Rb.firstChild; a.firstChild;) {
      a.removeChild(a.firstChild);
    }

    for (; b.firstChild;) {
      a.appendChild(b.firstChild);
    }
  }
});

function Tb(a, b) {
  if (b) {
    var c = a.firstChild;

    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }

  a.textContent = b;
}

function Ub(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}

var Vb = {
  animationend: Ub("Animation", "AnimationEnd"),
  animationiteration: Ub("Animation", "AnimationIteration"),
  animationstart: Ub("Animation", "AnimationStart"),
  transitionend: Ub("Transition", "TransitionEnd")
},
    Wb = {},
    Xb = {};
Ya && (Xb = document.createElement("div").style, "AnimationEvent" in window || (delete Vb.animationend.animation, delete Vb.animationiteration.animation, delete Vb.animationstart.animation), "TransitionEvent" in window || delete Vb.transitionend.transition);

function Yb(a) {
  if (Wb[a]) return Wb[a];
  if (!Vb[a]) return a;
  var b = Vb[a],
      c;

  for (c in b) {
    if (b.hasOwnProperty(c) && c in Xb) return Wb[a] = b[c];
  }

  return a;
}

var Zb = Yb("animationend"),
    $b = Yb("animationiteration"),
    ac = Yb("animationstart"),
    bc = Yb("transitionend"),
    dc = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");

function ec(a) {
  var b = a,
      c = a;
  if (a.alternate) for (; b.return;) {
    b = b.return;
  } else {
    a = b;

    do {
      b = a, 0 !== (b.effectTag & 1026) && (c = b.return), a = b.return;
    } while (a);
  }
  return 3 === b.tag ? c : null;
}

function fc(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }

  return null;
}

function gc(a) {
  if (ec(a) !== a) throw Error(u(188));
}

function hc(a) {
  var b = a.alternate;

  if (!b) {
    b = ec(a);
    if (null === b) throw Error(u(188));
    return b !== a ? null : a;
  }

  for (var c = a, d = b;;) {
    var e = c.return;
    if (null === e) break;
    var f = e.alternate;

    if (null === f) {
      d = e.return;

      if (null !== d) {
        c = d;
        continue;
      }

      break;
    }

    if (e.child === f.child) {
      for (f = e.child; f;) {
        if (f === c) return gc(e), a;
        if (f === d) return gc(e), b;
        f = f.sibling;
      }

      throw Error(u(188));
    }

    if (c.return !== d.return) c = e, d = f;else {
      for (var g = !1, h = e.child; h;) {
        if (h === c) {
          g = !0;
          c = e;
          d = f;
          break;
        }

        if (h === d) {
          g = !0;
          d = e;
          c = f;
          break;
        }

        h = h.sibling;
      }

      if (!g) {
        for (h = f.child; h;) {
          if (h === c) {
            g = !0;
            c = f;
            d = e;
            break;
          }

          if (h === d) {
            g = !0;
            d = f;
            c = e;
            break;
          }

          h = h.sibling;
        }

        if (!g) throw Error(u(189));
      }
    }
    if (c.alternate !== d) throw Error(u(190));
  }

  if (3 !== c.tag) throw Error(u(188));
  return c.stateNode.current === c ? a : b;
}

function ic(a) {
  a = hc(a);
  if (!a) return null;

  for (var b = a;;) {
    if (5 === b.tag || 6 === b.tag) return b;
    if (b.child) b.child.return = b, b = b.child;else {
      if (b === a) break;

      for (; !b.sibling;) {
        if (!b.return || b.return === a) return null;
        b = b.return;
      }

      b.sibling.return = b.return;
      b = b.sibling;
    }
  }

  return null;
}

var jc,
    kc,
    lc,
    mc = !1,
    nc = [],
    oc = null,
    pc = null,
    qc = null,
    rc = new Map(),
    sc = new Map(),
    tc = [],
    uc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(" "),
    vc = "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(" ");

function wc(a) {
  var b = xc(a);
  uc.forEach(function (c) {
    yc(c, a, b);
  });
  vc.forEach(function (c) {
    yc(c, a, b);
  });
}

function zc(a, b, c, d) {
  return {
    blockedOn: a,
    topLevelType: b,
    eventSystemFlags: c | 32,
    nativeEvent: d
  };
}

function Ac(a, b) {
  switch (a) {
    case "focus":
    case "blur":
      oc = null;
      break;

    case "dragenter":
    case "dragleave":
      pc = null;
      break;

    case "mouseover":
    case "mouseout":
      qc = null;
      break;

    case "pointerover":
    case "pointerout":
      rc.delete(b.pointerId);
      break;

    case "gotpointercapture":
    case "lostpointercapture":
      sc.delete(b.pointerId);
  }
}

function Bc(a, b, c, d, e) {
  if (null === a || a.nativeEvent !== e) return a = zc(b, c, d, e), null !== b && (b = Cc(b), null !== b && kc(b)), a;
  a.eventSystemFlags |= d;
  return a;
}

function Dc(a, b, c, d) {
  switch (b) {
    case "focus":
      return oc = Bc(oc, a, b, c, d), !0;

    case "dragenter":
      return pc = Bc(pc, a, b, c, d), !0;

    case "mouseover":
      return qc = Bc(qc, a, b, c, d), !0;

    case "pointerover":
      var e = d.pointerId;
      rc.set(e, Bc(rc.get(e) || null, a, b, c, d));
      return !0;

    case "gotpointercapture":
      return e = d.pointerId, sc.set(e, Bc(sc.get(e) || null, a, b, c, d)), !0;
  }

  return !1;
}

function Ec(a) {
  var b = Fc(a.target);

  if (null !== b) {
    var c = ec(b);
    if (null !== c) if (b = c.tag, 13 === b) {
      if (b = fc(c), null !== b) {
        a.blockedOn = b;
        q.unstable_runWithPriority(a.priority, function () {
          lc(c);
        });
        return;
      }
    } else if (3 === b && c.stateNode.hydrate) {
      a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
      return;
    }
  }

  a.blockedOn = null;
}

function Gc(a) {
  if (null !== a.blockedOn) return !1;
  var b = Hc(a.topLevelType, a.eventSystemFlags, a.nativeEvent);

  if (null !== b) {
    var c = Cc(b);
    null !== c && kc(c);
    a.blockedOn = b;
    return !1;
  }

  return !0;
}

function Ic(a, b, c) {
  Gc(a) && c.delete(b);
}

function Jc() {
  for (mc = !1; 0 < nc.length;) {
    var a = nc[0];

    if (null !== a.blockedOn) {
      a = Cc(a.blockedOn);
      null !== a && jc(a);
      break;
    }

    var b = Hc(a.topLevelType, a.eventSystemFlags, a.nativeEvent);
    null !== b ? a.blockedOn = b : nc.shift();
  }

  null !== oc && Gc(oc) && (oc = null);
  null !== pc && Gc(pc) && (pc = null);
  null !== qc && Gc(qc) && (qc = null);
  rc.forEach(Ic);
  sc.forEach(Ic);
}

function Kc(a, b) {
  a.blockedOn === b && (a.blockedOn = null, mc || (mc = !0, q.unstable_scheduleCallback(q.unstable_NormalPriority, Jc)));
}

function Lc(a) {
  function b(b) {
    return Kc(b, a);
  }

  if (0 < nc.length) {
    Kc(nc[0], a);

    for (var c = 1; c < nc.length; c++) {
      var d = nc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }

  null !== oc && Kc(oc, a);
  null !== pc && Kc(pc, a);
  null !== qc && Kc(qc, a);
  rc.forEach(b);
  sc.forEach(b);

  for (c = 0; c < tc.length; c++) {
    d = tc[c], d.blockedOn === a && (d.blockedOn = null);
  }

  for (; 0 < tc.length && (c = tc[0], null === c.blockedOn);) {
    Ec(c), null === c.blockedOn && tc.shift();
  }
}

function Mc(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}

function Nc(a) {
  do {
    a = a.return;
  } while (a && 5 !== a.tag);

  return a ? a : null;
}

function Oc(a, b, c) {
  if (b = Da(a, c.dispatchConfig.phasedRegistrationNames[b])) c._dispatchListeners = xa(c._dispatchListeners, b), c._dispatchInstances = xa(c._dispatchInstances, a);
}

function Pc(a) {
  if (a && a.dispatchConfig.phasedRegistrationNames) {
    for (var b = a._targetInst, c = []; b;) {
      c.push(b), b = Nc(b);
    }

    for (b = c.length; 0 < b--;) {
      Oc(c[b], "captured", a);
    }

    for (b = 0; b < c.length; b++) {
      Oc(c[b], "bubbled", a);
    }
  }
}

function Qc(a, b, c) {
  a && c && c.dispatchConfig.registrationName && (b = Da(a, c.dispatchConfig.registrationName)) && (c._dispatchListeners = xa(c._dispatchListeners, b), c._dispatchInstances = xa(c._dispatchInstances, a));
}

function Rc(a) {
  a && a.dispatchConfig.registrationName && Qc(a._targetInst, null, a);
}

function Sc(a) {
  ya(a, Pc);
}

function Tc() {
  return !0;
}

function Uc() {
  return !1;
}

function E(a, b, c, d) {
  this.dispatchConfig = a;
  this._targetInst = b;
  this.nativeEvent = c;
  a = this.constructor.Interface;

  for (var e in a) {
    a.hasOwnProperty(e) && ((b = a[e]) ? this[e] = b(c) : "target" === e ? this.target = d : this[e] = c[e]);
  }

  this.isDefaultPrevented = (null != c.defaultPrevented ? c.defaultPrevented : !1 === c.returnValue) ? Tc : Uc;
  this.isPropagationStopped = Uc;
  return this;
}

n(E.prototype, {
  preventDefault: function preventDefault() {
    this.defaultPrevented = !0;
    var a = this.nativeEvent;
    a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = Tc);
  },
  stopPropagation: function stopPropagation() {
    var a = this.nativeEvent;
    a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = Tc);
  },
  persist: function persist() {
    this.isPersistent = Tc;
  },
  isPersistent: Uc,
  destructor: function destructor() {
    var a = this.constructor.Interface,
        b;

    for (b in a) {
      this[b] = null;
    }

    this.nativeEvent = this._targetInst = this.dispatchConfig = null;
    this.isPropagationStopped = this.isDefaultPrevented = Uc;
    this._dispatchInstances = this._dispatchListeners = null;
  }
});
E.Interface = {
  type: null,
  target: null,
  currentTarget: function currentTarget() {
    return null;
  },
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function timeStamp(a) {
    return a.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

E.extend = function (a) {
  function b() {}

  function c() {
    return d.apply(this, arguments);
  }

  var d = this;
  b.prototype = d.prototype;
  var e = new b();
  n(e, c.prototype);
  c.prototype = e;
  c.prototype.constructor = c;
  c.Interface = n({}, d.Interface, a);
  c.extend = d.extend;
  Vc(c);
  return c;
};

Vc(E);

function Wc(a, b, c, d) {
  if (this.eventPool.length) {
    var e = this.eventPool.pop();
    this.call(e, a, b, c, d);
    return e;
  }

  return new this(a, b, c, d);
}

function Xc(a) {
  if (!(a instanceof this)) throw Error(u(279));
  a.destructor();
  10 > this.eventPool.length && this.eventPool.push(a);
}

function Vc(a) {
  a.eventPool = [];
  a.getPooled = Wc;
  a.release = Xc;
}

var Yc = E.extend({
  animationName: null,
  elapsedTime: null,
  pseudoElement: null
}),
    Zc = E.extend({
  clipboardData: function clipboardData(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  }
}),
    $c = E.extend({
  view: null,
  detail: null
}),
    ad = $c.extend({
  relatedTarget: null
});

function bd(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}

var cd = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
},
    ed = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
},
    fd = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};

function gd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = fd[a]) ? !!b[a] : !1;
}

function hd() {
  return gd;
}

var id = $c.extend({
  key: function key(a) {
    if (a.key) {
      var b = cd[a.key] || a.key;
      if ("Unidentified" !== b) return b;
    }

    return "keypress" === a.type ? (a = bd(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? ed[a.keyCode] || "Unidentified" : "";
  },
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: hd,
  charCode: function charCode(a) {
    return "keypress" === a.type ? bd(a) : 0;
  },
  keyCode: function keyCode(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  },
  which: function which(a) {
    return "keypress" === a.type ? bd(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }
}),
    jd = 0,
    kd = 0,
    ld = !1,
    md = !1,
    nd = $c.extend({
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  pageX: null,
  pageY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  getModifierState: hd,
  button: null,
  buttons: null,
  relatedTarget: function relatedTarget(a) {
    return a.relatedTarget || (a.fromElement === a.srcElement ? a.toElement : a.fromElement);
  },
  movementX: function movementX(a) {
    if ("movementX" in a) return a.movementX;
    var b = jd;
    jd = a.screenX;
    return ld ? "mousemove" === a.type ? a.screenX - b : 0 : (ld = !0, 0);
  },
  movementY: function movementY(a) {
    if ("movementY" in a) return a.movementY;
    var b = kd;
    kd = a.screenY;
    return md ? "mousemove" === a.type ? a.screenY - b : 0 : (md = !0, 0);
  }
}),
    od = nd.extend({
  pointerId: null,
  width: null,
  height: null,
  pressure: null,
  tangentialPressure: null,
  tiltX: null,
  tiltY: null,
  twist: null,
  pointerType: null,
  isPrimary: null
}),
    pd = nd.extend({
  dataTransfer: null
}),
    qd = $c.extend({
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null,
  getModifierState: hd
}),
    rd = E.extend({
  propertyName: null,
  elapsedTime: null,
  pseudoElement: null
}),
    sd = nd.extend({
  deltaX: function deltaX(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function deltaY(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: null,
  deltaMode: null
}),
    td = [["blur", "blur", 0], ["cancel", "cancel", 0], ["click", "click", 0], ["close", "close", 0], ["contextmenu", "contextMenu", 0], ["copy", "copy", 0], ["cut", "cut", 0], ["auxclick", "auxClick", 0], ["dblclick", "doubleClick", 0], ["dragend", "dragEnd", 0], ["dragstart", "dragStart", 0], ["drop", "drop", 0], ["focus", "focus", 0], ["input", "input", 0], ["invalid", "invalid", 0], ["keydown", "keyDown", 0], ["keypress", "keyPress", 0], ["keyup", "keyUp", 0], ["mousedown", "mouseDown", 0], ["mouseup", "mouseUp", 0], ["paste", "paste", 0], ["pause", "pause", 0], ["play", "play", 0], ["pointercancel", "pointerCancel", 0], ["pointerdown", "pointerDown", 0], ["pointerup", "pointerUp", 0], ["ratechange", "rateChange", 0], ["reset", "reset", 0], ["seeked", "seeked", 0], ["submit", "submit", 0], ["touchcancel", "touchCancel", 0], ["touchend", "touchEnd", 0], ["touchstart", "touchStart", 0], ["volumechange", "volumeChange", 0], ["drag", "drag", 1], ["dragenter", "dragEnter", 1], ["dragexit", "dragExit", 1], ["dragleave", "dragLeave", 1], ["dragover", "dragOver", 1], ["mousemove", "mouseMove", 1], ["mouseout", "mouseOut", 1], ["mouseover", "mouseOver", 1], ["pointermove", "pointerMove", 1], ["pointerout", "pointerOut", 1], ["pointerover", "pointerOver", 1], ["scroll", "scroll", 1], ["toggle", "toggle", 1], ["touchmove", "touchMove", 1], ["wheel", "wheel", 1], ["abort", "abort", 2], [Zb, "animationEnd", 2], [$b, "animationIteration", 2], [ac, "animationStart", 2], ["canplay", "canPlay", 2], ["canplaythrough", "canPlayThrough", 2], ["durationchange", "durationChange", 2], ["emptied", "emptied", 2], ["encrypted", "encrypted", 2], ["ended", "ended", 2], ["error", "error", 2], ["gotpointercapture", "gotPointerCapture", 2], ["load", "load", 2], ["loadeddata", "loadedData", 2], ["loadedmetadata", "loadedMetadata", 2], ["loadstart", "loadStart", 2], ["lostpointercapture", "lostPointerCapture", 2], ["playing", "playing", 2], ["progress", "progress", 2], ["seeking", "seeking", 2], ["stalled", "stalled", 2], ["suspend", "suspend", 2], ["timeupdate", "timeUpdate", 2], [bc, "transitionEnd", 2], ["waiting", "waiting", 2]],
    ud = {},
    vd = {},
    xd = 0;

for (; xd < td.length; xd++) {
  var yd = td[xd],
      zd = yd[0],
      Ad = yd[1],
      Bd = yd[2],
      Cd = "on" + (Ad[0].toUpperCase() + Ad.slice(1)),
      Dd = {
    phasedRegistrationNames: {
      bubbled: Cd,
      captured: Cd + "Capture"
    },
    dependencies: [zd],
    eventPriority: Bd
  };
  ud[Ad] = Dd;
  vd[zd] = Dd;
}

var Ed = {
  eventTypes: ud,
  getEventPriority: function getEventPriority(a) {
    a = vd[a];
    return void 0 !== a ? a.eventPriority : 2;
  },
  extractEvents: function extractEvents(a, b, c, d) {
    var e = vd[a];
    if (!e) return null;

    switch (a) {
      case "keypress":
        if (0 === bd(c)) return null;

      case "keydown":
      case "keyup":
        a = id;
        break;

      case "blur":
      case "focus":
        a = ad;
        break;

      case "click":
        if (2 === c.button) return null;

      case "auxclick":
      case "dblclick":
      case "mousedown":
      case "mousemove":
      case "mouseup":
      case "mouseout":
      case "mouseover":
      case "contextmenu":
        a = nd;
        break;

      case "drag":
      case "dragend":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "dragstart":
      case "drop":
        a = pd;
        break;

      case "touchcancel":
      case "touchend":
      case "touchmove":
      case "touchstart":
        a = qd;
        break;

      case Zb:
      case $b:
      case ac:
        a = Yc;
        break;

      case bc:
        a = rd;
        break;

      case "scroll":
        a = $c;
        break;

      case "wheel":
        a = sd;
        break;

      case "copy":
      case "cut":
      case "paste":
        a = Zc;
        break;

      case "gotpointercapture":
      case "lostpointercapture":
      case "pointercancel":
      case "pointerdown":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "pointerup":
        a = od;
        break;

      default:
        a = E;
    }

    b = a.getPooled(e, b, c, d);
    Sc(b);
    return b;
  }
},
    Fd = q.unstable_UserBlockingPriority,
    Gd = q.unstable_runWithPriority,
    Hd = Ed.getEventPriority,
    Id = 10,
    Jd = [];

function Kd(a) {
  var b = a.targetInst,
      c = b;

  do {
    if (!c) {
      a.ancestors.push(c);
      break;
    }

    var d = c;
    if (3 === d.tag) d = d.stateNode.containerInfo;else {
      for (; d.return;) {
        d = d.return;
      }

      d = 3 !== d.tag ? null : d.stateNode.containerInfo;
    }
    if (!d) break;
    b = c.tag;
    5 !== b && 6 !== b || a.ancestors.push(c);
    c = Fc(d);
  } while (c);

  for (c = 0; c < a.ancestors.length; c++) {
    b = a.ancestors[c];
    var e = Mc(a.nativeEvent);
    d = a.topLevelType;

    for (var f = a.nativeEvent, g = a.eventSystemFlags, h = null, k = 0; k < ea.length; k++) {
      var l = ea[k];
      l && (l = l.extractEvents(d, b, f, e, g)) && (h = xa(h, l));
    }

    Ba(h);
  }
}

var Ld = !0;

function F(a, b) {
  Md(b, a, !1);
}

function Md(a, b, c) {
  switch (Hd(b)) {
    case 0:
      var d = Nd.bind(null, b, 1);
      break;

    case 1:
      d = Od.bind(null, b, 1);
      break;

    default:
      d = Pd.bind(null, b, 1);
  }

  c ? a.addEventListener(b, d, !0) : a.addEventListener(b, d, !1);
}

function Nd(a, b, c) {
  ib || gb();
  var d = Pd,
      e = ib;
  ib = !0;

  try {
    fb(d, a, b, c);
  } finally {
    (ib = e) || kb();
  }
}

function Od(a, b, c) {
  Gd(Fd, Pd.bind(null, a, b, c));
}

function Qd(a, b, c, d) {
  if (Jd.length) {
    var e = Jd.pop();
    e.topLevelType = a;
    e.eventSystemFlags = b;
    e.nativeEvent = c;
    e.targetInst = d;
    a = e;
  } else a = {
    topLevelType: a,
    eventSystemFlags: b,
    nativeEvent: c,
    targetInst: d,
    ancestors: []
  };

  try {
    if (b = Kd, c = a, jb) b(c, void 0);else {
      jb = !0;

      try {
        hb(b, c, void 0);
      } finally {
        jb = !1, kb();
      }
    }
  } finally {
    a.topLevelType = null, a.nativeEvent = null, a.targetInst = null, a.ancestors.length = 0, Jd.length < Id && Jd.push(a);
  }
}

function Pd(a, b, c) {
  if (Ld) if (0 < nc.length && -1 < uc.indexOf(a)) a = zc(null, a, b, c), nc.push(a);else {
    var d = Hc(a, b, c);
    null === d ? Ac(a, c) : -1 < uc.indexOf(a) ? (a = zc(d, a, b, c), nc.push(a)) : Dc(d, a, b, c) || (Ac(a, c), Qd(a, b, c, null));
  }
}

function Hc(a, b, c) {
  var d = Mc(c);
  d = Fc(d);

  if (null !== d) {
    var e = ec(d);
    if (null === e) d = null;else {
      var f = e.tag;

      if (13 === f) {
        d = fc(e);
        if (null !== d) return d;
        d = null;
      } else if (3 === f) {
        if (e.stateNode.hydrate) return 3 === e.tag ? e.stateNode.containerInfo : null;
        d = null;
      } else e !== d && (d = null);
    }
  }

  Qd(a, b, c, d);
  return null;
}

function Rd(a) {
  if (!Ya) return !1;
  a = "on" + a;
  var b = (a in document);
  b || (b = document.createElement("div"), b.setAttribute(a, "return;"), b = "function" === typeof b[a]);
  return b;
}

var Sd = new ("function" === typeof WeakMap ? WeakMap : Map)();

function xc(a) {
  var b = Sd.get(a);
  void 0 === b && (b = new Set(), Sd.set(a, b));
  return b;
}

function yc(a, b, c) {
  if (!c.has(a)) {
    switch (a) {
      case "scroll":
        Md(b, "scroll", !0);
        break;

      case "focus":
      case "blur":
        Md(b, "focus", !0);
        Md(b, "blur", !0);
        c.add("blur");
        c.add("focus");
        break;

      case "cancel":
      case "close":
        Rd(a) && Md(b, a, !0);
        break;

      case "invalid":
      case "submit":
      case "reset":
        break;

      default:
        -1 === dc.indexOf(a) && F(a, b);
    }

    c.add(a);
  }
}

var Td = {
  animationIterationCount: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
},
    Ud = ["Webkit", "ms", "Moz", "O"];
Object.keys(Td).forEach(function (a) {
  Ud.forEach(function (b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    Td[b] = Td[a];
  });
});

function Vd(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || Td.hasOwnProperty(a) && Td[a] ? ("" + b).trim() : b + "px";
}

function Wd(a, b) {
  a = a.style;

  for (var c in b) {
    if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"),
          e = Vd(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
  }
}

var Xd = n({
  menuitem: !0
}, {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
});

function Yd(a, b) {
  if (b) {
    if (Xd[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(u(137, a, ""));

    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(u(60));
      if (!("object" === typeof b.dangerouslySetInnerHTML && "__html" in b.dangerouslySetInnerHTML)) throw Error(u(61));
    }

    if (null != b.style && "object" !== typeof b.style) throw Error(u(62, ""));
  }
}

function Zd(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;

  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;

    default:
      return !0;
  }
}

function $d(a, b) {
  a = 9 === a.nodeType || 11 === a.nodeType ? a : a.ownerDocument;
  var c = xc(a);
  b = ja[b];

  for (var d = 0; d < b.length; d++) {
    yc(b[d], a, c);
  }
}

function ae() {}

function be(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;

  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}

function ce(a) {
  for (; a && a.firstChild;) {
    a = a.firstChild;
  }

  return a;
}

function de(a, b) {
  var c = ce(a);
  a = 0;

  for (var d; c;) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return {
        node: c,
        offset: b - a
      };
      a = d;
    }

    a: {
      for (; c;) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }

        c = c.parentNode;
      }

      c = void 0;
    }

    c = ce(c);
  }
}

function ee(a, b) {
  return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? ee(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
}

function fe() {
  for (var a = window, b = be(); b instanceof a.HTMLIFrameElement;) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = !1;
    }

    if (c) a = b.contentWindow;else break;
    b = be(a.document);
  }

  return b;
}

function ge(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}

var he = "$",
    ie = "/$",
    je = "$?",
    ke = "$!",
    le = null,
    me = null;

function ne(a, b) {
  switch (a) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!b.autoFocus;
  }

  return !1;
}

function oe(a, b) {
  return "textarea" === a || "option" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}

var pe = "function" === typeof setTimeout ? setTimeout : void 0,
    qe = "function" === typeof clearTimeout ? clearTimeout : void 0;

function re(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
  }

  return a;
}

function se(a) {
  a = a.previousSibling;

  for (var b = 0; a;) {
    if (8 === a.nodeType) {
      var c = a.data;

      if (c === he || c === ke || c === je) {
        if (0 === b) return a;
        b--;
      } else c === ie && b++;
    }

    a = a.previousSibling;
  }

  return null;
}

var te = Math.random().toString(36).slice(2),
    ue = "__reactInternalInstance$" + te,
    ve = "__reactEventHandlers$" + te,
    we = "__reactContainere$" + te;

function Fc(a) {
  var b = a[ue];
  if (b) return b;

  for (var c = a.parentNode; c;) {
    if (b = c[we] || c[ue]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = se(a); null !== a;) {
        if (c = a[ue]) return c;
        a = se(a);
      }
      return b;
    }

    a = c;
    c = a.parentNode;
  }

  return null;
}

function Cc(a) {
  a = a[ue] || a[we];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}

function xe(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(u(33));
}

function ye(a) {
  return a[ve] || null;
}

var ze = null,
    Ae = null,
    Be = null;

function Ce() {
  if (Be) return Be;
  var a,
      b = Ae,
      c = b.length,
      d,
      e = "value" in ze ? ze.value : ze.textContent,
      f = e.length;

  for (a = 0; a < c && b[a] === e[a]; a++) {
    ;
  }

  var g = c - a;

  for (d = 1; d <= g && b[c - d] === e[f - d]; d++) {
    ;
  }

  return Be = e.slice(a, 1 < d ? 1 - d : void 0);
}

var De = E.extend({
  data: null
}),
    Ee = E.extend({
  data: null
}),
    Fe = [9, 13, 27, 32],
    Ge = Ya && "CompositionEvent" in window,
    He = null;
Ya && "documentMode" in document && (He = document.documentMode);
var Ie = Ya && "TextEvent" in window && !He,
    Je = Ya && (!Ge || He && 8 < He && 11 >= He),
    Ke = String.fromCharCode(32),
    Le = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: "onBeforeInput",
      captured: "onBeforeInputCapture"
    },
    dependencies: ["compositionend", "keypress", "textInput", "paste"]
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: "onCompositionEnd",
      captured: "onCompositionEndCapture"
    },
    dependencies: "blur compositionend keydown keypress keyup mousedown".split(" ")
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: "onCompositionStart",
      captured: "onCompositionStartCapture"
    },
    dependencies: "blur compositionstart keydown keypress keyup mousedown".split(" ")
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: "onCompositionUpdate",
      captured: "onCompositionUpdateCapture"
    },
    dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(" ")
  }
},
    Me = !1;

function Ne(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== Fe.indexOf(b.keyCode);

    case "keydown":
      return 229 !== b.keyCode;

    case "keypress":
    case "mousedown":
    case "blur":
      return !0;

    default:
      return !1;
  }
}

function Oe(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}

var Pe = !1;

function Qe(a, b) {
  switch (a) {
    case "compositionend":
      return Oe(b);

    case "keypress":
      if (32 !== b.which) return null;
      Me = !0;
      return Ke;

    case "textInput":
      return a = b.data, a === Ke && Me ? null : a;

    default:
      return null;
  }
}

function Re(a, b) {
  if (Pe) return "compositionend" === a || !Ge && Ne(a, b) ? (a = Ce(), Be = Ae = ze = null, Pe = !1, a) : null;

  switch (a) {
    case "paste":
      return null;

    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }

      return null;

    case "compositionend":
      return Je && "ko" !== b.locale ? null : b.data;

    default:
      return null;
  }
}

var Se = {
  eventTypes: Le,
  extractEvents: function extractEvents(a, b, c, d) {
    var e;
    if (Ge) b: {
      switch (a) {
        case "compositionstart":
          var f = Le.compositionStart;
          break b;

        case "compositionend":
          f = Le.compositionEnd;
          break b;

        case "compositionupdate":
          f = Le.compositionUpdate;
          break b;
      }

      f = void 0;
    } else Pe ? Ne(a, c) && (f = Le.compositionEnd) : "keydown" === a && 229 === c.keyCode && (f = Le.compositionStart);
    f ? (Je && "ko" !== c.locale && (Pe || f !== Le.compositionStart ? f === Le.compositionEnd && Pe && (e = Ce()) : (ze = d, Ae = "value" in ze ? ze.value : ze.textContent, Pe = !0)), f = De.getPooled(f, b, c, d), e ? f.data = e : (e = Oe(c), null !== e && (f.data = e)), Sc(f), e = f) : e = null;
    (a = Ie ? Qe(a, c) : Re(a, c)) ? (b = Ee.getPooled(Le.beforeInput, b, c, d), b.data = a, Sc(b)) : b = null;
    return null === e ? b : null === b ? e : [e, b];
  }
},
    Te = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};

function Ue(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!Te[a.type] : "textarea" === b ? !0 : !1;
}

var Ve = {
  change: {
    phasedRegistrationNames: {
      bubbled: "onChange",
      captured: "onChangeCapture"
    },
    dependencies: "blur change click focus input keydown keyup selectionchange".split(" ")
  }
};

function We(a, b, c) {
  a = E.getPooled(Ve.change, a, b, c);
  a.type = "change";
  cb(c);
  Sc(a);
  return a;
}

var Xe = null,
    Ye = null;

function Ze(a) {
  Ba(a);
}

function $e(a) {
  var b = xe(a);
  if (zb(b)) return a;
}

function af(a, b) {
  if ("change" === a) return b;
}

var bf = !1;
Ya && (bf = Rd("input") && (!document.documentMode || 9 < document.documentMode));

function cf() {
  Xe && (Xe.detachEvent("onpropertychange", df), Ye = Xe = null);
}

function df(a) {
  if ("value" === a.propertyName && $e(Ye)) if (a = We(Ye, a, Mc(a)), ib) Ba(a);else {
    ib = !0;

    try {
      eb(Ze, a);
    } finally {
      ib = !1, kb();
    }
  }
}

function ef(a, b, c) {
  "focus" === a ? (cf(), Xe = b, Ye = c, Xe.attachEvent("onpropertychange", df)) : "blur" === a && cf();
}

function ff(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return $e(Ye);
}

function gf(a, b) {
  if ("click" === a) return $e(b);
}

function hf(a, b) {
  if ("input" === a || "change" === a) return $e(b);
}

var jf = {
  eventTypes: Ve,
  _isInputEventSupported: bf,
  extractEvents: function extractEvents(a, b, c, d) {
    var e = b ? xe(b) : window,
        f = e.nodeName && e.nodeName.toLowerCase();
    if ("select" === f || "input" === f && "file" === e.type) var g = af;else if (Ue(e)) {
      if (bf) g = hf;else {
        g = ff;
        var h = ef;
      }
    } else (f = e.nodeName) && "input" === f.toLowerCase() && ("checkbox" === e.type || "radio" === e.type) && (g = gf);
    if (g && (g = g(a, b))) return We(g, c, d);
    h && h(a, e, b);
    "blur" === a && (a = e._wrapperState) && a.controlled && "number" === e.type && Fb(e, "number", e.value);
  }
},
    kf = {
  mouseEnter: {
    registrationName: "onMouseEnter",
    dependencies: ["mouseout", "mouseover"]
  },
  mouseLeave: {
    registrationName: "onMouseLeave",
    dependencies: ["mouseout", "mouseover"]
  },
  pointerEnter: {
    registrationName: "onPointerEnter",
    dependencies: ["pointerout", "pointerover"]
  },
  pointerLeave: {
    registrationName: "onPointerLeave",
    dependencies: ["pointerout", "pointerover"]
  }
},
    lf,
    mf = {
  eventTypes: kf,
  extractEvents: function extractEvents(a, b, c, d, e) {
    var f = "mouseover" === a || "pointerover" === a,
        g = "mouseout" === a || "pointerout" === a;
    if (f && 0 === (e & 32) && (c.relatedTarget || c.fromElement) || !g && !f) return null;
    e = d.window === d ? d : (e = d.ownerDocument) ? e.defaultView || e.parentWindow : window;

    if (g) {
      if (g = b, b = (b = c.relatedTarget || c.toElement) ? Fc(b) : null, null !== b && (f = ec(b), b !== f || 5 !== b.tag && 6 !== b.tag)) b = null;
    } else g = null;

    if (g === b) return null;

    if ("mouseout" === a || "mouseover" === a) {
      var h = nd;
      var k = kf.mouseLeave;
      var l = kf.mouseEnter;
      var m = "mouse";
    } else if ("pointerout" === a || "pointerover" === a) h = od, k = kf.pointerLeave, l = kf.pointerEnter, m = "pointer";

    a = null == g ? e : xe(g);
    e = null == b ? e : xe(b);
    k = h.getPooled(k, g, c, d);
    k.type = m + "leave";
    k.target = a;
    k.relatedTarget = e;
    d = h.getPooled(l, b, c, d);
    d.type = m + "enter";
    d.target = e;
    d.relatedTarget = a;
    h = g;
    m = b;
    if (h && m) a: {
      l = h;
      a = m;
      g = 0;

      for (b = l; b; b = Nc(b)) {
        g++;
      }

      b = 0;

      for (e = a; e; e = Nc(e)) {
        b++;
      }

      for (; 0 < g - b;) {
        l = Nc(l), g--;
      }

      for (; 0 < b - g;) {
        a = Nc(a), b--;
      }

      for (; g--;) {
        if (l === a || l === a.alternate) break a;
        l = Nc(l);
        a = Nc(a);
      }

      l = null;
    } else l = null;
    a = l;

    for (l = []; h && h !== a;) {
      g = h.alternate;
      if (null !== g && g === a) break;
      l.push(h);
      h = Nc(h);
    }

    for (h = []; m && m !== a;) {
      g = m.alternate;
      if (null !== g && g === a) break;
      h.push(m);
      m = Nc(m);
    }

    for (m = 0; m < l.length; m++) {
      Qc(l[m], "bubbled", k);
    }

    for (m = h.length; 0 < m--;) {
      Qc(h[m], "captured", d);
    }

    if (c === lf) return lf = null, [k];
    lf = c;
    return [k, d];
  }
};

function nf(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}

var of = "function" === typeof Object.is ? Object.is : nf,
    pf = Object.prototype.hasOwnProperty;

function qf(a, b) {
  if (of(a, b)) return !0;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
  var c = Object.keys(a),
      d = Object.keys(b);
  if (c.length !== d.length) return !1;

  for (d = 0; d < c.length; d++) {
    if (!pf.call(b, c[d]) || !of(a[c[d]], b[c[d]])) return !1;
  }

  return !0;
}

var rf = Ya && "documentMode" in document && 11 >= document.documentMode,
    sf = {
  select: {
    phasedRegistrationNames: {
      bubbled: "onSelect",
      captured: "onSelectCapture"
    },
    dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")
  }
},
    tf = null,
    uf = null,
    vf = null,
    wf = !1;

function xf(a, b) {
  var c = b.window === b ? b.document : 9 === b.nodeType ? b : b.ownerDocument;
  if (wf || null == tf || tf !== be(c)) return null;
  c = tf;
  "selectionStart" in c && ge(c) ? c = {
    start: c.selectionStart,
    end: c.selectionEnd
  } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
    anchorNode: c.anchorNode,
    anchorOffset: c.anchorOffset,
    focusNode: c.focusNode,
    focusOffset: c.focusOffset
  });
  return vf && qf(vf, c) ? null : (vf = c, a = E.getPooled(sf.select, uf, a, b), a.type = "select", a.target = tf, Sc(a), a);
}

var yf = {
  eventTypes: sf,
  extractEvents: function extractEvents(a, b, c, d) {
    var e = d.window === d ? d.document : 9 === d.nodeType ? d : d.ownerDocument,
        f;

    if (!(f = !e)) {
      a: {
        e = xc(e);
        f = ja.onSelect;

        for (var g = 0; g < f.length; g++) {
          if (!e.has(f[g])) {
            e = !1;
            break a;
          }
        }

        e = !0;
      }

      f = !e;
    }

    if (f) return null;
    e = b ? xe(b) : window;

    switch (a) {
      case "focus":
        if (Ue(e) || "true" === e.contentEditable) tf = e, uf = b, vf = null;
        break;

      case "blur":
        vf = uf = tf = null;
        break;

      case "mousedown":
        wf = !0;
        break;

      case "contextmenu":
      case "mouseup":
      case "dragend":
        return wf = !1, xf(c, d);

      case "selectionchange":
        if (rf) break;

      case "keydown":
      case "keyup":
        return xf(c, d);
    }

    return null;
  }
};
Ca.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
var zf = Cc;
sa = ye;
ua = zf;
va = xe;
Ca.injectEventPluginsByName({
  SimpleEventPlugin: Ed,
  EnterLeaveEventPlugin: mf,
  ChangeEventPlugin: jf,
  SelectEventPlugin: yf,
  BeforeInputEventPlugin: Se
});
new Set();
var Af = [],
    Bf = -1;

function G(a) {
  0 > Bf || (a.current = Af[Bf], Af[Bf] = null, Bf--);
}

function I(a, b) {
  Bf++;
  Af[Bf] = a.current;
  a.current = b;
}

var Cf = {},
    J = {
  current: Cf
},
    K = {
  current: !1
},
    Df = Cf;

function Ef(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Cf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {},
      f;

  for (f in c) {
    e[f] = b[f];
  }

  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}

function L(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}

function Ff(a) {
  G(K, a);
  G(J, a);
}

function Gf(a) {
  G(K, a);
  G(J, a);
}

function Hf(a, b, c) {
  if (J.current !== Cf) throw Error(u(168));
  I(J, b, a);
  I(K, c, a);
}

function If(a, b, c) {
  var d = a.stateNode;
  a = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();

  for (var e in d) {
    if (!(e in a)) throw Error(u(108, Wa(b) || "Unknown", e));
  }

  return n({}, c, {}, d);
}

function Jf(a) {
  var b = a.stateNode;
  b = b && b.__reactInternalMemoizedMergedChildContext || Cf;
  Df = J.current;
  I(J, b, a);
  I(K, K.current, a);
  return !0;
}

function Kf(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(u(169));
  c ? (b = If(a, b, Df), d.__reactInternalMemoizedMergedChildContext = b, G(K, a), G(J, a), I(J, b, a)) : G(K, a);
  I(K, c, a);
}

var Lf = q.unstable_runWithPriority,
    Mf = q.unstable_scheduleCallback,
    Nf = q.unstable_cancelCallback,
    Of = q.unstable_shouldYield,
    Pf = q.unstable_requestPaint,
    Qf = q.unstable_now,
    Rf = q.unstable_getCurrentPriorityLevel,
    Sf = q.unstable_ImmediatePriority,
    Tf = q.unstable_UserBlockingPriority,
    Uf = q.unstable_NormalPriority,
    Vf = q.unstable_LowPriority,
    Wf = q.unstable_IdlePriority,
    Xf = {},
    Yf = void 0 !== Pf ? Pf : function () {},
    Zf = null,
    $f = null,
    ag = !1,
    bg = Qf(),
    cg = 1E4 > bg ? Qf : function () {
  return Qf() - bg;
};

function dg() {
  switch (Rf()) {
    case Sf:
      return 99;

    case Tf:
      return 98;

    case Uf:
      return 97;

    case Vf:
      return 96;

    case Wf:
      return 95;

    default:
      throw Error(u(332));
  }
}

function eg(a) {
  switch (a) {
    case 99:
      return Sf;

    case 98:
      return Tf;

    case 97:
      return Uf;

    case 96:
      return Vf;

    case 95:
      return Wf;

    default:
      throw Error(u(332));
  }
}

function fg(a, b) {
  a = eg(a);
  return Lf(a, b);
}

function gg(a, b, c) {
  a = eg(a);
  return Mf(a, b, c);
}

function hg(a) {
  null === Zf ? (Zf = [a], $f = Mf(Sf, ig)) : Zf.push(a);
  return Xf;
}

function jg() {
  if (null !== $f) {
    var a = $f;
    $f = null;
    Nf(a);
  }

  ig();
}

function ig() {
  if (!ag && null !== Zf) {
    ag = !0;
    var a = 0;

    try {
      var b = Zf;
      fg(99, function () {
        for (; a < b.length; a++) {
          var c = b[a];

          do {
            c = c(!0);
          } while (null !== c);
        }
      });
      Zf = null;
    } catch (c) {
      throw null !== Zf && (Zf = Zf.slice(a + 1)), Mf(Sf, jg), c;
    } finally {
      ag = !1;
    }
  }
}

var kg = 3;

function lg(a, b, c) {
  c /= 10;
  return 1073741821 - (((1073741821 - a + b / 10) / c | 0) + 1) * c;
}

function mg(a, b) {
  if (a && a.defaultProps) {
    b = n({}, b);
    a = a.defaultProps;

    for (var c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }

  return b;
}

var ng = {
  current: null
},
    og = null,
    pg = null,
    qg = null;

function rg() {
  qg = pg = og = null;
}

function sg(a, b) {
  var c = a.type._context;
  I(ng, c._currentValue, a);
  c._currentValue = b;
}

function tg(a) {
  var b = ng.current;
  G(ng, a);
  a.type._context._currentValue = b;
}

function ug(a, b) {
  for (; null !== a;) {
    var c = a.alternate;
    if (a.childExpirationTime < b) a.childExpirationTime = b, null !== c && c.childExpirationTime < b && (c.childExpirationTime = b);else if (null !== c && c.childExpirationTime < b) c.childExpirationTime = b;else break;
    a = a.return;
  }
}

function vg(a, b) {
  og = a;
  qg = pg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (a.expirationTime >= b && (wg = !0), a.firstContext = null);
}

function xg(a, b) {
  if (qg !== a && !1 !== b && 0 !== b) {
    if ("number" !== typeof b || 1073741823 === b) qg = a, b = 1073741823;
    b = {
      context: a,
      observedBits: b,
      next: null
    };

    if (null === pg) {
      if (null === og) throw Error(u(308));
      pg = b;
      og.dependencies = {
        expirationTime: 0,
        firstContext: b,
        responders: null
      };
    } else pg = pg.next = b;
  }

  return a._currentValue;
}

var yg = !1;

function zg(a) {
  return {
    baseState: a,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}

function Ag(a) {
  return {
    baseState: a.baseState,
    firstUpdate: a.firstUpdate,
    lastUpdate: a.lastUpdate,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}

function Bg(a, b) {
  return {
    expirationTime: a,
    suspenseConfig: b,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
    nextEffect: null
  };
}

function Cg(a, b) {
  null === a.lastUpdate ? a.firstUpdate = a.lastUpdate = b : (a.lastUpdate.next = b, a.lastUpdate = b);
}

function Dg(a, b) {
  var c = a.alternate;

  if (null === c) {
    var d = a.updateQueue;
    var e = null;
    null === d && (d = a.updateQueue = zg(a.memoizedState));
  } else d = a.updateQueue, e = c.updateQueue, null === d ? null === e ? (d = a.updateQueue = zg(a.memoizedState), e = c.updateQueue = zg(c.memoizedState)) : d = a.updateQueue = Ag(e) : null === e && (e = c.updateQueue = Ag(d));

  null === e || d === e ? Cg(d, b) : null === d.lastUpdate || null === e.lastUpdate ? (Cg(d, b), Cg(e, b)) : (Cg(d, b), e.lastUpdate = b);
}

function Eg(a, b) {
  var c = a.updateQueue;
  c = null === c ? a.updateQueue = zg(a.memoizedState) : Fg(a, c);
  null === c.lastCapturedUpdate ? c.firstCapturedUpdate = c.lastCapturedUpdate = b : (c.lastCapturedUpdate.next = b, c.lastCapturedUpdate = b);
}

function Fg(a, b) {
  var c = a.alternate;
  null !== c && b === c.updateQueue && (b = a.updateQueue = Ag(b));
  return b;
}

function Gg(a, b, c, d, e, f) {
  switch (c.tag) {
    case 1:
      return a = c.payload, "function" === typeof a ? a.call(f, d, e) : a;

    case 3:
      a.effectTag = a.effectTag & -4097 | 64;

    case 0:
      a = c.payload;
      e = "function" === typeof a ? a.call(f, d, e) : a;
      if (null === e || void 0 === e) break;
      return n({}, d, e);

    case 2:
      yg = !0;
  }

  return d;
}

function Hg(a, b, c, d, e) {
  yg = !1;
  b = Fg(a, b);

  for (var f = b.baseState, g = null, h = 0, k = b.firstUpdate, l = f; null !== k;) {
    var m = k.expirationTime;
    m < e ? (null === g && (g = k, f = l), h < m && (h = m)) : (Ig(m, k.suspenseConfig), l = Gg(a, b, k, l, c, d), null !== k.callback && (a.effectTag |= 32, k.nextEffect = null, null === b.lastEffect ? b.firstEffect = b.lastEffect = k : (b.lastEffect.nextEffect = k, b.lastEffect = k)));
    k = k.next;
  }

  m = null;

  for (k = b.firstCapturedUpdate; null !== k;) {
    var C = k.expirationTime;
    C < e ? (null === m && (m = k, null === g && (f = l)), h < C && (h = C)) : (l = Gg(a, b, k, l, c, d), null !== k.callback && (a.effectTag |= 32, k.nextEffect = null, null === b.lastCapturedEffect ? b.firstCapturedEffect = b.lastCapturedEffect = k : (b.lastCapturedEffect.nextEffect = k, b.lastCapturedEffect = k)));
    k = k.next;
  }

  null === g && (b.lastUpdate = null);
  null === m ? b.lastCapturedUpdate = null : a.effectTag |= 32;
  null === g && null === m && (f = l);
  b.baseState = f;
  b.firstUpdate = g;
  b.firstCapturedUpdate = m;
  Jg(h);
  a.expirationTime = h;
  a.memoizedState = l;
}

function Kg(a, b, c) {
  null !== b.firstCapturedUpdate && (null !== b.lastUpdate && (b.lastUpdate.next = b.firstCapturedUpdate, b.lastUpdate = b.lastCapturedUpdate), b.firstCapturedUpdate = b.lastCapturedUpdate = null);
  Lg(b.firstEffect, c);
  b.firstEffect = b.lastEffect = null;
  Lg(b.firstCapturedEffect, c);
  b.firstCapturedEffect = b.lastCapturedEffect = null;
}

function Lg(a, b) {
  for (; null !== a;) {
    var c = a.callback;

    if (null !== c) {
      a.callback = null;
      var d = b;
      if ("function" !== typeof c) throw Error(u(191, c));
      c.call(d);
    }

    a = a.nextEffect;
  }
}

var Mg = Ea.ReactCurrentBatchConfig,
    Ng = new aa.Component().refs;

function Og(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : n({}, b, c);
  a.memoizedState = c;
  d = a.updateQueue;
  null !== d && 0 === a.expirationTime && (d.baseState = c);
}

var Sg = {
  isMounted: function isMounted(a) {
    return (a = a._reactInternalFiber) ? ec(a) === a : !1;
  },
  enqueueSetState: function enqueueSetState(a, b, c) {
    a = a._reactInternalFiber;
    var d = Pg(),
        e = Mg.suspense;
    d = Qg(d, a, e);
    e = Bg(d, e);
    e.payload = b;
    void 0 !== c && null !== c && (e.callback = c);
    Dg(a, e);
    Rg(a, d);
  },
  enqueueReplaceState: function enqueueReplaceState(a, b, c) {
    a = a._reactInternalFiber;
    var d = Pg(),
        e = Mg.suspense;
    d = Qg(d, a, e);
    e = Bg(d, e);
    e.tag = 1;
    e.payload = b;
    void 0 !== c && null !== c && (e.callback = c);
    Dg(a, e);
    Rg(a, d);
  },
  enqueueForceUpdate: function enqueueForceUpdate(a, b) {
    a = a._reactInternalFiber;
    var c = Pg(),
        d = Mg.suspense;
    c = Qg(c, a, d);
    d = Bg(c, d);
    d.tag = 2;
    void 0 !== b && null !== b && (d.callback = b);
    Dg(a, d);
    Rg(a, c);
  }
};

function Tg(a, b, c, d, e, f, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !qf(c, d) || !qf(e, f) : !0;
}

function Ug(a, b, c) {
  var d = !1,
      e = Cf;
  var f = b.contextType;
  "object" === typeof f && null !== f ? f = xg(f) : (e = L(b) ? Df : J.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Ef(a, e) : Cf);
  b = new b(c, f);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Sg;
  a.stateNode = b;
  b._reactInternalFiber = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
  return b;
}

function Vg(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Sg.enqueueReplaceState(b, b.state, null);
}

function Wg(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = Ng;
  var f = b.contextType;
  "object" === typeof f && null !== f ? e.context = xg(f) : (f = L(b) ? Df : J.current, e.context = Ef(a, f));
  f = a.updateQueue;
  null !== f && (Hg(a, f, c, e, d), e.state = a.memoizedState);
  f = b.getDerivedStateFromProps;
  "function" === typeof f && (Og(a, b, f, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Sg.enqueueReplaceState(e, e.state, null), f = a.updateQueue, null !== f && (Hg(a, f, c, e, d), e.state = a.memoizedState));
  "function" === typeof e.componentDidMount && (a.effectTag |= 4);
}

var Xg = Array.isArray;

function Yg(a, b, c) {
  a = c.ref;

  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;

      if (c) {
        if (1 !== c.tag) throw Error(u(309));
        var d = c.stateNode;
      }

      if (!d) throw Error(u(147, a));
      var e = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;

      b = function b(a) {
        var b = d.refs;
        b === Ng && (b = d.refs = {});
        null === a ? delete b[e] : b[e] = a;
      };

      b._stringRef = e;
      return b;
    }

    if ("string" !== typeof a) throw Error(u(284));
    if (!c._owner) throw Error(u(290, a));
  }

  return a;
}

function Zg(a, b) {
  if ("textarea" !== a.type) throw Error(u(31, "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, ""));
}

function $g(a) {
  function b(b, c) {
    if (a) {
      var d = b.lastEffect;
      null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;
      c.nextEffect = null;
      c.effectTag = 8;
    }
  }

  function c(c, d) {
    if (!a) return null;

    for (; null !== d;) {
      b(c, d), d = d.sibling;
    }

    return null;
  }

  function d(a, b) {
    for (a = new Map(); null !== b;) {
      null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
    }

    return a;
  }

  function e(a, b, c) {
    a = ah(a, b, c);
    a.index = 0;
    a.sibling = null;
    return a;
  }

  function f(b, c, d) {
    b.index = d;
    if (!a) return c;
    d = b.alternate;
    if (null !== d) return d = d.index, d < c ? (b.effectTag = 2, c) : d;
    b.effectTag = 2;
    return c;
  }

  function g(b) {
    a && null === b.alternate && (b.effectTag = 2);
    return b;
  }

  function h(a, b, c, d) {
    if (null === b || 6 !== b.tag) return b = bh(c, a.mode, d), b.return = a, b;
    b = e(b, c, d);
    b.return = a;
    return b;
  }

  function k(a, b, c, d) {
    if (null !== b && b.elementType === c.type) return d = e(b, c.props, d), d.ref = Yg(a, b, c), d.return = a, d;
    d = ch(c.type, c.key, c.props, null, a.mode, d);
    d.ref = Yg(a, b, c);
    d.return = a;
    return d;
  }

  function l(a, b, c, d) {
    if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = dh(c, a.mode, d), b.return = a, b;
    b = e(b, c.children || [], d);
    b.return = a;
    return b;
  }

  function m(a, b, c, d, f) {
    if (null === b || 7 !== b.tag) return b = eh(c, a.mode, d, f), b.return = a, b;
    b = e(b, c, d);
    b.return = a;
    return b;
  }

  function C(a, b, c) {
    if ("string" === typeof b || "number" === typeof b) return b = bh("" + b, a.mode, c), b.return = a, b;

    if ("object" === typeof b && null !== b) {
      switch (b.$$typeof) {
        case Ga:
          return c = ch(b.type, b.key, b.props, null, a.mode, c), c.ref = Yg(a, null, b), c.return = a, c;

        case Ha:
          return b = dh(b, a.mode, c), b.return = a, b;
      }

      if (Xg(b) || Ua(b)) return b = eh(b, a.mode, c, null), b.return = a, b;
      Zg(a, b);
    }

    return null;
  }

  function y(a, b, c, d) {
    var e = null !== b ? b.key : null;
    if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);

    if ("object" === typeof c && null !== c) {
      switch (c.$$typeof) {
        case Ga:
          return c.key === e ? c.type === Ia ? m(a, b, c.props.children, d, e) : k(a, b, c, d) : null;

        case Ha:
          return c.key === e ? l(a, b, c, d) : null;
      }

      if (Xg(c) || Ua(c)) return null !== e ? null : m(a, b, c, d, null);
      Zg(a, c);
    }

    return null;
  }

  function H(a, b, c, d, e) {
    if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);

    if ("object" === typeof d && null !== d) {
      switch (d.$$typeof) {
        case Ga:
          return a = a.get(null === d.key ? c : d.key) || null, d.type === Ia ? m(b, a, d.props.children, e, d.key) : k(b, a, d, e);

        case Ha:
          return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
      }

      if (Xg(d) || Ua(d)) return a = a.get(c) || null, m(b, a, d, e, null);
      Zg(b, d);
    }

    return null;
  }

  function z(e, g, h, k) {
    for (var l = null, m = null, r = g, x = g = 0, A = null; null !== r && x < h.length; x++) {
      r.index > x ? (A = r, r = null) : A = r.sibling;
      var p = y(e, r, h[x], k);

      if (null === p) {
        null === r && (r = A);
        break;
      }

      a && r && null === p.alternate && b(e, r);
      g = f(p, g, x);
      null === m ? l = p : m.sibling = p;
      m = p;
      r = A;
    }

    if (x === h.length) return c(e, r), l;

    if (null === r) {
      for (; x < h.length; x++) {
        r = C(e, h[x], k), null !== r && (g = f(r, g, x), null === m ? l = r : m.sibling = r, m = r);
      }

      return l;
    }

    for (r = d(e, r); x < h.length; x++) {
      A = H(r, e, x, h[x], k), null !== A && (a && null !== A.alternate && r.delete(null === A.key ? x : A.key), g = f(A, g, x), null === m ? l = A : m.sibling = A, m = A);
    }

    a && r.forEach(function (a) {
      return b(e, a);
    });
    return l;
  }

  function ta(e, g, h, k) {
    var l = Ua(h);
    if ("function" !== typeof l) throw Error(u(150));
    h = l.call(h);
    if (null == h) throw Error(u(151));

    for (var m = l = null, r = g, x = g = 0, A = null, p = h.next(); null !== r && !p.done; x++, p = h.next()) {
      r.index > x ? (A = r, r = null) : A = r.sibling;
      var z = y(e, r, p.value, k);

      if (null === z) {
        null === r && (r = A);
        break;
      }

      a && r && null === z.alternate && b(e, r);
      g = f(z, g, x);
      null === m ? l = z : m.sibling = z;
      m = z;
      r = A;
    }

    if (p.done) return c(e, r), l;

    if (null === r) {
      for (; !p.done; x++, p = h.next()) {
        p = C(e, p.value, k), null !== p && (g = f(p, g, x), null === m ? l = p : m.sibling = p, m = p);
      }

      return l;
    }

    for (r = d(e, r); !p.done; x++, p = h.next()) {
      p = H(r, e, x, p.value, k), null !== p && (a && null !== p.alternate && r.delete(null === p.key ? x : p.key), g = f(p, g, x), null === m ? l = p : m.sibling = p, m = p);
    }

    a && r.forEach(function (a) {
      return b(e, a);
    });
    return l;
  }

  return function (a, d, f, h) {
    var k = "object" === typeof f && null !== f && f.type === Ia && null === f.key;
    k && (f = f.props.children);
    var l = "object" === typeof f && null !== f;
    if (l) switch (f.$$typeof) {
      case Ga:
        a: {
          l = f.key;

          for (k = d; null !== k;) {
            if (k.key === l) {
              if (7 === k.tag ? f.type === Ia : k.elementType === f.type) {
                c(a, k.sibling);
                d = e(k, f.type === Ia ? f.props.children : f.props, h);
                d.ref = Yg(a, k, f);
                d.return = a;
                a = d;
                break a;
              } else {
                c(a, k);
                break;
              }
            } else b(a, k);
            k = k.sibling;
          }

          f.type === Ia ? (d = eh(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = ch(f.type, f.key, f.props, null, a.mode, h), h.ref = Yg(a, d, f), h.return = a, a = h);
        }

        return g(a);

      case Ha:
        a: {
          for (k = f.key; null !== d;) {
            if (d.key === k) {
              if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                c(a, d.sibling);
                d = e(d, f.children || [], h);
                d.return = a;
                a = d;
                break a;
              } else {
                c(a, d);
                break;
              }
            } else b(a, d);
            d = d.sibling;
          }

          d = dh(f, a.mode, h);
          d.return = a;
          a = d;
        }

        return g(a);
    }
    if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f, h), d.return = a, a = d) : (c(a, d), d = bh(f, a.mode, h), d.return = a, a = d), g(a);
    if (Xg(f)) return z(a, d, f, h);
    if (Ua(f)) return ta(a, d, f, h);
    l && Zg(a, f);
    if ("undefined" === typeof f && !k) switch (a.tag) {
      case 1:
      case 0:
        throw a = a.type, Error(u(152, a.displayName || a.name || "Component"));
    }
    return c(a, d);
  };
}

var fh = $g(!0),
    gh = $g(!1),
    hh = {},
    ih = {
  current: hh
},
    jh = {
  current: hh
},
    kh = {
  current: hh
};

function lh(a) {
  if (a === hh) throw Error(u(174));
  return a;
}

function mh(a, b) {
  I(kh, b, a);
  I(jh, a, a);
  I(ih, hh, a);
  var c = b.nodeType;

  switch (c) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : Qb(null, "");
      break;

    default:
      c = 8 === c ? b.parentNode : b, b = c.namespaceURI || null, c = c.tagName, b = Qb(b, c);
  }

  G(ih, a);
  I(ih, b, a);
}

function nh(a) {
  G(ih, a);
  G(jh, a);
  G(kh, a);
}

function oh(a) {
  lh(kh.current);
  var b = lh(ih.current);
  var c = Qb(b, a.type);
  b !== c && (I(jh, a, a), I(ih, c, a));
}

function ph(a) {
  jh.current === a && (G(ih, a), G(jh, a));
}

var M = {
  current: 0
};

function qh(a) {
  for (var b = a; null !== b;) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || c.data === je || c.data === ke)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.effectTag & 64)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }

    if (b === a) break;

    for (; null === b.sibling;) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }

    b.sibling.return = b.return;
    b = b.sibling;
  }

  return null;
}

function rh(a, b) {
  return {
    responder: a,
    props: b
  };
}

var sh = Ea.ReactCurrentDispatcher,
    N = Ea.ReactCurrentBatchConfig,
    th = 0,
    uh = null,
    O = null,
    vh = null,
    wh = null,
    P = null,
    xh = null,
    yh = 0,
    zh = null,
    Ah = 0,
    Bh = !1,
    Ch = null,
    Gh = 0;

function Q() {
  throw Error(u(321));
}

function Hh(a, b) {
  if (null === b) return !1;

  for (var c = 0; c < b.length && c < a.length; c++) {
    if (!of(a[c], b[c])) return !1;
  }

  return !0;
}

function Ih(a, b, c, d, e, f) {
  th = f;
  uh = b;
  vh = null !== a ? a.memoizedState : null;
  sh.current = null === vh ? Jh : Kh;
  b = c(d, e);

  if (Bh) {
    do {
      Bh = !1, Gh += 1, vh = null !== a ? a.memoizedState : null, xh = wh, zh = P = O = null, sh.current = Kh, b = c(d, e);
    } while (Bh);

    Ch = null;
    Gh = 0;
  }

  sh.current = Lh;
  a = uh;
  a.memoizedState = wh;
  a.expirationTime = yh;
  a.updateQueue = zh;
  a.effectTag |= Ah;
  a = null !== O && null !== O.next;
  th = 0;
  xh = P = wh = vh = O = uh = null;
  yh = 0;
  zh = null;
  Ah = 0;
  if (a) throw Error(u(300));
  return b;
}

function Mh() {
  sh.current = Lh;
  th = 0;
  xh = P = wh = vh = O = uh = null;
  yh = 0;
  zh = null;
  Ah = 0;
  Bh = !1;
  Ch = null;
  Gh = 0;
}

function Nh() {
  var a = {
    memoizedState: null,
    baseState: null,
    queue: null,
    baseUpdate: null,
    next: null
  };
  null === P ? wh = P = a : P = P.next = a;
  return P;
}

function Oh() {
  if (null !== xh) P = xh, xh = P.next, O = vh, vh = null !== O ? O.next : null;else {
    if (null === vh) throw Error(u(310));
    O = vh;
    var a = {
      memoizedState: O.memoizedState,
      baseState: O.baseState,
      queue: O.queue,
      baseUpdate: O.baseUpdate,
      next: null
    };
    P = null === P ? wh = a : P.next = a;
    vh = O.next;
  }
  return P;
}

function Ph(a, b) {
  return "function" === typeof b ? b(a) : b;
}

function Qh(a) {
  var b = Oh(),
      c = b.queue;
  if (null === c) throw Error(u(311));
  c.lastRenderedReducer = a;

  if (0 < Gh) {
    var d = c.dispatch;

    if (null !== Ch) {
      var e = Ch.get(c);

      if (void 0 !== e) {
        Ch.delete(c);
        var f = b.memoizedState;

        do {
          f = a(f, e.action), e = e.next;
        } while (null !== e);

        of(f, b.memoizedState) || (wg = !0);
        b.memoizedState = f;
        b.baseUpdate === c.last && (b.baseState = f);
        c.lastRenderedState = f;
        return [f, d];
      }
    }

    return [b.memoizedState, d];
  }

  d = c.last;
  var g = b.baseUpdate;
  f = b.baseState;
  null !== g ? (null !== d && (d.next = null), d = g.next) : d = null !== d ? d.next : null;

  if (null !== d) {
    var h = e = null,
        k = d,
        l = !1;

    do {
      var m = k.expirationTime;
      m < th ? (l || (l = !0, h = g, e = f), m > yh && (yh = m, Jg(yh))) : (Ig(m, k.suspenseConfig), f = k.eagerReducer === a ? k.eagerState : a(f, k.action));
      g = k;
      k = k.next;
    } while (null !== k && k !== d);

    l || (h = g, e = f);
    of(f, b.memoizedState) || (wg = !0);
    b.memoizedState = f;
    b.baseUpdate = h;
    b.baseState = e;
    c.lastRenderedState = f;
  }

  return [b.memoizedState, c.dispatch];
}

function Rh(a) {
  var b = Nh();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = b.queue = {
    last: null,
    dispatch: null,
    lastRenderedReducer: Ph,
    lastRenderedState: a
  };
  a = a.dispatch = Sh.bind(null, uh, a);
  return [b.memoizedState, a];
}

function Th(a) {
  return Qh(Ph, a);
}

function Uh(a, b, c, d) {
  a = {
    tag: a,
    create: b,
    destroy: c,
    deps: d,
    next: null
  };
  null === zh ? (zh = {
    lastEffect: null
  }, zh.lastEffect = a.next = a) : (b = zh.lastEffect, null === b ? zh.lastEffect = a.next = a : (c = b.next, b.next = a, a.next = c, zh.lastEffect = a));
  return a;
}

function Vh(a, b, c, d) {
  var e = Nh();
  Ah |= a;
  e.memoizedState = Uh(b, c, void 0, void 0 === d ? null : d);
}

function Wh(a, b, c, d) {
  var e = Oh();
  d = void 0 === d ? null : d;
  var f = void 0;

  if (null !== O) {
    var g = O.memoizedState;
    f = g.destroy;

    if (null !== d && Hh(d, g.deps)) {
      Uh(0, c, f, d);
      return;
    }
  }

  Ah |= a;
  e.memoizedState = Uh(b, c, f, d);
}

function Xh(a, b) {
  return Vh(516, 192, a, b);
}

function Yh(a, b) {
  return Wh(516, 192, a, b);
}

function Zh(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function () {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
    b.current = null;
  };
}

function $h() {}

function ai(a, b) {
  Nh().memoizedState = [a, void 0 === b ? null : b];
  return a;
}

function bi(a, b) {
  var c = Oh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Hh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}

function Sh(a, b, c) {
  if (!(25 > Gh)) throw Error(u(301));
  var d = a.alternate;
  if (a === uh || null !== d && d === uh) {
    if (Bh = !0, a = {
      expirationTime: th,
      suspenseConfig: null,
      action: c,
      eagerReducer: null,
      eagerState: null,
      next: null
    }, null === Ch && (Ch = new Map()), c = Ch.get(b), void 0 === c) Ch.set(b, a);else {
      for (b = c; null !== b.next;) {
        b = b.next;
      }

      b.next = a;
    }
  } else {
    var e = Pg(),
        f = Mg.suspense;
    e = Qg(e, a, f);
    f = {
      expirationTime: e,
      suspenseConfig: f,
      action: c,
      eagerReducer: null,
      eagerState: null,
      next: null
    };
    var g = b.last;
    if (null === g) f.next = f;else {
      var h = g.next;
      null !== h && (f.next = h);
      g.next = f;
    }
    b.last = f;
    if (0 === a.expirationTime && (null === d || 0 === d.expirationTime) && (d = b.lastRenderedReducer, null !== d)) try {
      var k = b.lastRenderedState,
          l = d(k, c);
      f.eagerReducer = d;
      f.eagerState = l;
      if (of(l, k)) return;
    } catch (m) {} finally {}
    Rg(a, e);
  }
}

var Lh = {
  readContext: xg,
  useCallback: Q,
  useContext: Q,
  useEffect: Q,
  useImperativeHandle: Q,
  useLayoutEffect: Q,
  useMemo: Q,
  useReducer: Q,
  useRef: Q,
  useState: Q,
  useDebugValue: Q,
  useResponder: Q,
  useDeferredValue: Q,
  useTransition: Q
},
    Jh = {
  readContext: xg,
  useCallback: ai,
  useContext: xg,
  useEffect: Xh,
  useImperativeHandle: function useImperativeHandle(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return Vh(4, 36, Zh.bind(null, b, a), c);
  },
  useLayoutEffect: function useLayoutEffect(a, b) {
    return Vh(4, 36, a, b);
  },
  useMemo: function useMemo(a, b) {
    var c = Nh();
    b = void 0 === b ? null : b;
    a = a();
    c.memoizedState = [a, b];
    return a;
  },
  useReducer: function useReducer(a, b, c) {
    var d = Nh();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a = d.queue = {
      last: null,
      dispatch: null,
      lastRenderedReducer: a,
      lastRenderedState: b
    };
    a = a.dispatch = Sh.bind(null, uh, a);
    return [d.memoizedState, a];
  },
  useRef: function useRef(a) {
    var b = Nh();
    a = {
      current: a
    };
    return b.memoizedState = a;
  },
  useState: Rh,
  useDebugValue: $h,
  useResponder: rh,
  useDeferredValue: function useDeferredValue(a, b) {
    var c = Rh(a),
        d = c[0],
        e = c[1];
    Xh(function () {
      q.unstable_next(function () {
        var c = N.suspense;
        N.suspense = void 0 === b ? null : b;

        try {
          e(a);
        } finally {
          N.suspense = c;
        }
      });
    }, [a, b]);
    return d;
  },
  useTransition: function useTransition(a) {
    var b = Rh(!1),
        c = b[0],
        d = b[1];
    return [ai(function (b) {
      d(!0);
      q.unstable_next(function () {
        var c = N.suspense;
        N.suspense = void 0 === a ? null : a;

        try {
          d(!1), b();
        } finally {
          N.suspense = c;
        }
      });
    }, [a, c]), c];
  }
},
    Kh = {
  readContext: xg,
  useCallback: bi,
  useContext: xg,
  useEffect: Yh,
  useImperativeHandle: function useImperativeHandle(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return Wh(4, 36, Zh.bind(null, b, a), c);
  },
  useLayoutEffect: function useLayoutEffect(a, b) {
    return Wh(4, 36, a, b);
  },
  useMemo: function useMemo(a, b) {
    var c = Oh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Hh(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  },
  useReducer: Qh,
  useRef: function useRef() {
    return Oh().memoizedState;
  },
  useState: Th,
  useDebugValue: $h,
  useResponder: rh,
  useDeferredValue: function useDeferredValue(a, b) {
    var c = Th(a),
        d = c[0],
        e = c[1];
    Yh(function () {
      q.unstable_next(function () {
        var c = N.suspense;
        N.suspense = void 0 === b ? null : b;

        try {
          e(a);
        } finally {
          N.suspense = c;
        }
      });
    }, [a, b]);
    return d;
  },
  useTransition: function useTransition(a) {
    var b = Th(!1),
        c = b[0],
        d = b[1];
    return [bi(function (b) {
      d(!0);
      q.unstable_next(function () {
        var c = N.suspense;
        N.suspense = void 0 === a ? null : a;

        try {
          d(!1), b();
        } finally {
          N.suspense = c;
        }
      });
    }, [a, c]), c];
  }
},
    ci = null,
    di = null,
    ei = !1;

function fi(a, b) {
  var c = gi(5, null, null, 0);
  c.elementType = "DELETED";
  c.type = "DELETED";
  c.stateNode = b;
  c.return = a;
  c.effectTag = 8;
  null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
}

function hi(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, !0) : !1;

    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, !0) : !1;

    case 13:
      return !1;

    default:
      return !1;
  }
}

function ii(a) {
  if (ei) {
    var b = di;

    if (b) {
      var c = b;

      if (!hi(a, b)) {
        b = re(c.nextSibling);

        if (!b || !hi(a, b)) {
          a.effectTag = a.effectTag & -1025 | 2;
          ei = !1;
          ci = a;
          return;
        }

        fi(ci, c);
      }

      ci = a;
      di = re(b.firstChild);
    } else a.effectTag = a.effectTag & -1025 | 2, ei = !1, ci = a;
  }
}

function ji(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) {
    a = a.return;
  }

  ci = a;
}

function ki(a) {
  if (a !== ci) return !1;
  if (!ei) return ji(a), ei = !0, !1;
  var b = a.type;
  if (5 !== a.tag || "head" !== b && "body" !== b && !oe(b, a.memoizedProps)) for (b = di; b;) {
    fi(a, b), b = re(b.nextSibling);
  }
  ji(a);

  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(u(317));

    a: {
      a = a.nextSibling;

      for (b = 0; a;) {
        if (8 === a.nodeType) {
          var c = a.data;

          if (c === ie) {
            if (0 === b) {
              di = re(a.nextSibling);
              break a;
            }

            b--;
          } else c !== he && c !== ke && c !== je || b++;
        }

        a = a.nextSibling;
      }

      di = null;
    }
  } else di = ci ? re(a.stateNode.nextSibling) : null;

  return !0;
}

function li() {
  di = ci = null;
  ei = !1;
}

var mi = Ea.ReactCurrentOwner,
    wg = !1;

function R(a, b, c, d) {
  b.child = null === a ? gh(b, null, c, d) : fh(b, a.child, c, d);
}

function ni(a, b, c, d, e) {
  c = c.render;
  var f = b.ref;
  vg(b, e);
  d = Ih(a, b, c, d, f, e);
  if (null !== a && !wg) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), oi(a, b, e);
  b.effectTag |= 1;
  R(a, b, d, e);
  return b.child;
}

function pi(a, b, c, d, e, f) {
  if (null === a) {
    var g = c.type;
    if ("function" === typeof g && !qi(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, ri(a, b, g, d, e, f);
    a = ch(c.type, null, d, null, b.mode, f);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }

  g = a.child;
  if (e < f && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : qf, c(e, d) && a.ref === b.ref)) return oi(a, b, f);
  b.effectTag |= 1;
  a = ah(g, d, f);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}

function ri(a, b, c, d, e, f) {
  return null !== a && qf(a.memoizedProps, d) && a.ref === b.ref && (wg = !1, e < f) ? oi(a, b, f) : si(a, b, c, d, f);
}

function ti(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.effectTag |= 128;
}

function si(a, b, c, d, e) {
  var f = L(c) ? Df : J.current;
  f = Ef(b, f);
  vg(b, e);
  c = Ih(a, b, c, d, f, e);
  if (null !== a && !wg) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), oi(a, b, e);
  b.effectTag |= 1;
  R(a, b, c, e);
  return b.child;
}

function ui(a, b, c, d, e) {
  if (L(c)) {
    var f = !0;
    Jf(b);
  } else f = !1;

  vg(b, e);
  if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), Ug(b, c, d, e), Wg(b, c, d, e), d = !0;else if (null === a) {
    var g = b.stateNode,
        h = b.memoizedProps;
    g.props = h;
    var k = g.context,
        l = c.contextType;
    "object" === typeof l && null !== l ? l = xg(l) : (l = L(c) ? Df : J.current, l = Ef(b, l));
    var m = c.getDerivedStateFromProps,
        C = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
    C || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Vg(b, g, d, l);
    yg = !1;
    var y = b.memoizedState;
    k = g.state = y;
    var H = b.updateQueue;
    null !== H && (Hg(b, H, d, g, e), k = b.memoizedState);
    h !== d || y !== k || K.current || yg ? ("function" === typeof m && (Og(b, c, m, d), k = b.memoizedState), (h = yg || Tg(b, c, h, d, y, k, l)) ? (C || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.effectTag |= 4)) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), d = !1);
  } else g = b.stateNode, h = b.memoizedProps, g.props = b.type === b.elementType ? h : mg(b.type, h), k = g.context, l = c.contextType, "object" === typeof l && null !== l ? l = xg(l) : (l = L(c) ? Df : J.current, l = Ef(b, l)), m = c.getDerivedStateFromProps, (C = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Vg(b, g, d, l), yg = !1, k = b.memoizedState, y = g.state = k, H = b.updateQueue, null !== H && (Hg(b, H, d, g, e), y = b.memoizedState), h !== d || k !== y || K.current || yg ? ("function" === typeof m && (Og(b, c, m, d), y = b.memoizedState), (m = yg || Tg(b, c, h, d, k, y, l)) ? (C || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, y, l), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, y, l)), "function" === typeof g.componentDidUpdate && (b.effectTag |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.effectTag |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 256), b.memoizedProps = d, b.memoizedState = y), g.props = d, g.state = y, g.context = l, d = m) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 256), d = !1);
  return vi(a, b, c, d, f, e);
}

function vi(a, b, c, d, e, f) {
  ti(a, b);
  var g = 0 !== (b.effectTag & 64);
  if (!d && !g) return e && Kf(b, c, !1), oi(a, b, f);
  d = b.stateNode;
  mi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.effectTag |= 1;
  null !== a && g ? (b.child = fh(b, a.child, null, f), b.child = fh(b, null, h, f)) : R(a, b, h, f);
  b.memoizedState = d.state;
  e && Kf(b, c, !0);
  return b.child;
}

function wi(a) {
  var b = a.stateNode;
  b.pendingContext ? Hf(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Hf(a, b.context, !1);
  mh(a, b.containerInfo);
}

var xi = {
  dehydrated: null,
  retryTime: 0
};

function yi(a, b, c) {
  var d = b.mode,
      e = b.pendingProps,
      f = M.current,
      g = !1,
      h;
  (h = 0 !== (b.effectTag & 64)) || (h = 0 !== (f & 2) && (null === a || null !== a.memoizedState));
  h ? (g = !0, b.effectTag &= -65) : null !== a && null === a.memoizedState || void 0 === e.fallback || !0 === e.unstable_avoidThisFallback || (f |= 1);
  I(M, f & 1, b);

  if (null === a) {
    void 0 !== e.fallback && ii(b);

    if (g) {
      g = e.fallback;
      e = eh(null, d, 0, null);
      e.return = b;
      if (0 === (b.mode & 2)) for (a = null !== b.memoizedState ? b.child.child : b.child, e.child = a; null !== a;) {
        a.return = e, a = a.sibling;
      }
      c = eh(g, d, c, null);
      c.return = b;
      e.sibling = c;
      b.memoizedState = xi;
      b.child = e;
      return c;
    }

    d = e.children;
    b.memoizedState = null;
    return b.child = gh(b, null, d, c);
  }

  if (null !== a.memoizedState) {
    a = a.child;
    d = a.sibling;

    if (g) {
      e = e.fallback;
      c = ah(a, a.pendingProps, 0);
      c.return = b;
      if (0 === (b.mode & 2) && (g = null !== b.memoizedState ? b.child.child : b.child, g !== a.child)) for (c.child = g; null !== g;) {
        g.return = c, g = g.sibling;
      }
      d = ah(d, e, d.expirationTime);
      d.return = b;
      c.sibling = d;
      c.childExpirationTime = 0;
      b.memoizedState = xi;
      b.child = c;
      return d;
    }

    c = fh(b, a.child, e.children, c);
    b.memoizedState = null;
    return b.child = c;
  }

  a = a.child;

  if (g) {
    g = e.fallback;
    e = eh(null, d, 0, null);
    e.return = b;
    e.child = a;
    null !== a && (a.return = e);
    if (0 === (b.mode & 2)) for (a = null !== b.memoizedState ? b.child.child : b.child, e.child = a; null !== a;) {
      a.return = e, a = a.sibling;
    }
    c = eh(g, d, c, null);
    c.return = b;
    e.sibling = c;
    c.effectTag |= 2;
    e.childExpirationTime = 0;
    b.memoizedState = xi;
    b.child = e;
    return c;
  }

  b.memoizedState = null;
  return b.child = fh(b, a, e.children, c);
}

function zi(a, b) {
  a.expirationTime < b && (a.expirationTime = b);
  var c = a.alternate;
  null !== c && c.expirationTime < b && (c.expirationTime = b);
  ug(a.return, b);
}

function Ai(a, b, c, d, e, f) {
  var g = a.memoizedState;
  null === g ? a.memoizedState = {
    isBackwards: b,
    rendering: null,
    last: d,
    tail: c,
    tailExpiration: 0,
    tailMode: e,
    lastEffect: f
  } : (g.isBackwards = b, g.rendering = null, g.last = d, g.tail = c, g.tailExpiration = 0, g.tailMode = e, g.lastEffect = f);
}

function Bi(a, b, c) {
  var d = b.pendingProps,
      e = d.revealOrder,
      f = d.tail;
  R(a, b, d.children, c);
  d = M.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.effectTag |= 64;else {
    if (null !== a && 0 !== (a.effectTag & 64)) a: for (a = b.child; null !== a;) {
      if (13 === a.tag) null !== a.memoizedState && zi(a, c);else if (19 === a.tag) zi(a, c);else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;

      for (; null === a.sibling;) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }

      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  I(M, d, b);
  if (0 === (b.mode & 2)) b.memoizedState = null;else switch (e) {
    case "forwards":
      c = b.child;

      for (e = null; null !== c;) {
        a = c.alternate, null !== a && null === qh(a) && (e = c), c = c.sibling;
      }

      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      Ai(b, !1, e, c, f, b.lastEffect);
      break;

    case "backwards":
      c = null;
      e = b.child;

      for (b.child = null; null !== e;) {
        a = e.alternate;

        if (null !== a && null === qh(a)) {
          b.child = e;
          break;
        }

        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }

      Ai(b, !0, c, null, f, b.lastEffect);
      break;

    case "together":
      Ai(b, !1, null, null, void 0, b.lastEffect);
      break;

    default:
      b.memoizedState = null;
  }
  return b.child;
}

function oi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  var d = b.expirationTime;
  0 !== d && Jg(d);
  if (b.childExpirationTime < c) return null;
  if (null !== a && b.child !== a.child) throw Error(u(153));

  if (null !== b.child) {
    a = b.child;
    c = ah(a, a.pendingProps, a.expirationTime);
    b.child = c;

    for (c.return = b; null !== a.sibling;) {
      a = a.sibling, c = c.sibling = ah(a, a.pendingProps, a.expirationTime), c.return = b;
    }

    c.sibling = null;
  }

  return b.child;
}

function Ci(a) {
  a.effectTag |= 4;
}

var Hi, Ii, Ji, Ki;

Hi = function Hi(a, b) {
  for (var c = b.child; null !== c;) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;

    for (; null === c.sibling;) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }

    c.sibling.return = c.return;
    c = c.sibling;
  }
};

Ii = function Ii() {};

Ji = function Ji(a, b, c, d, e) {
  var f = a.memoizedProps;

  if (f !== d) {
    var g = b.stateNode;
    lh(ih.current);
    a = null;

    switch (c) {
      case "input":
        f = Ab(g, f);
        d = Ab(g, d);
        a = [];
        break;

      case "option":
        f = Ib(g, f);
        d = Ib(g, d);
        a = [];
        break;

      case "select":
        f = n({}, f, {
          value: void 0
        });
        d = n({}, d, {
          value: void 0
        });
        a = [];
        break;

      case "textarea":
        f = Kb(g, f);
        d = Kb(g, d);
        a = [];
        break;

      default:
        "function" !== typeof f.onClick && "function" === typeof d.onClick && (g.onclick = ae);
    }

    Yd(c, d);
    var h, k;
    c = null;

    for (h in f) {
      if (!d.hasOwnProperty(h) && f.hasOwnProperty(h) && null != f[h]) if ("style" === h) for (k in g = f[h], g) {
        g.hasOwnProperty(k) && (c || (c = {}), c[k] = "");
      } else "dangerouslySetInnerHTML" !== h && "children" !== h && "suppressContentEditableWarning" !== h && "suppressHydrationWarning" !== h && "autoFocus" !== h && (ia.hasOwnProperty(h) ? a || (a = []) : (a = a || []).push(h, null));
    }

    for (h in d) {
      var l = d[h];
      g = null != f ? f[h] : void 0;
      if (d.hasOwnProperty(h) && l !== g && (null != l || null != g)) if ("style" === h) {
        if (g) {
          for (k in g) {
            !g.hasOwnProperty(k) || l && l.hasOwnProperty(k) || (c || (c = {}), c[k] = "");
          }

          for (k in l) {
            l.hasOwnProperty(k) && g[k] !== l[k] && (c || (c = {}), c[k] = l[k]);
          }
        } else c || (a || (a = []), a.push(h, c)), c = l;
      } else "dangerouslySetInnerHTML" === h ? (l = l ? l.__html : void 0, g = g ? g.__html : void 0, null != l && g !== l && (a = a || []).push(h, "" + l)) : "children" === h ? g === l || "string" !== typeof l && "number" !== typeof l || (a = a || []).push(h, "" + l) : "suppressContentEditableWarning" !== h && "suppressHydrationWarning" !== h && (ia.hasOwnProperty(h) ? (null != l && $d(e, h), a || g === l || (a = [])) : (a = a || []).push(h, l));
    }

    c && (a = a || []).push("style", c);
    e = a;
    (b.updateQueue = e) && Ci(b);
  }
};

Ki = function Ki(a, b, c, d) {
  c !== d && Ci(b);
};

function Li(a, b) {
  switch (a.tailMode) {
    case "hidden":
      b = a.tail;

      for (var c = null; null !== b;) {
        null !== b.alternate && (c = b), b = b.sibling;
      }

      null === c ? a.tail = null : c.sibling = null;
      break;

    case "collapsed":
      c = a.tail;

      for (var d = null; null !== c;) {
        null !== c.alternate && (d = c), c = c.sibling;
      }

      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}

function Mi(a) {
  switch (a.tag) {
    case 1:
      L(a.type) && Ff(a);
      var b = a.effectTag;
      return b & 4096 ? (a.effectTag = b & -4097 | 64, a) : null;

    case 3:
      nh(a);
      Gf(a);
      b = a.effectTag;
      if (0 !== (b & 64)) throw Error(u(285));
      a.effectTag = b & -4097 | 64;
      return a;

    case 5:
      return ph(a), null;

    case 13:
      return G(M, a), b = a.effectTag, b & 4096 ? (a.effectTag = b & -4097 | 64, a) : null;

    case 19:
      return G(M, a), null;

    case 4:
      return nh(a), null;

    case 10:
      return tg(a), null;

    default:
      return null;
  }
}

function Ni(a, b) {
  return {
    value: a,
    source: b,
    stack: Xa(b)
  };
}

var Oi = "function" === typeof WeakSet ? WeakSet : Set;

function Pi(a, b) {
  var c = b.source,
      d = b.stack;
  null === d && null !== c && (d = Xa(c));
  null !== c && Wa(c.type);
  b = b.value;
  null !== a && 1 === a.tag && Wa(a.type);

  try {
    console.error(b);
  } catch (e) {
    setTimeout(function () {
      throw e;
    });
  }
}

function Qi(a, b) {
  try {
    b.props = a.memoizedProps, b.state = a.memoizedState, b.componentWillUnmount();
  } catch (c) {
    Ri(a, c);
  }
}

function Si(a) {
  var b = a.ref;
  if (null !== b) if ("function" === typeof b) try {
    b(null);
  } catch (c) {
    Ri(a, c);
  } else b.current = null;
}

function Ti(a, b) {
  switch (b.tag) {
    case 0:
    case 11:
    case 15:
      Ui(2, 0, b);
      break;

    case 1:
      if (b.effectTag & 256 && null !== a) {
        var c = a.memoizedProps,
            d = a.memoizedState;
        a = b.stateNode;
        b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : mg(b.type, c), d);
        a.__reactInternalSnapshotBeforeUpdate = b;
      }

      break;

    case 3:
    case 5:
    case 6:
    case 4:
    case 17:
      break;

    default:
      throw Error(u(163));
  }
}

function Ui(a, b, c) {
  c = c.updateQueue;
  c = null !== c ? c.lastEffect : null;

  if (null !== c) {
    var d = c = c.next;

    do {
      if (0 !== (d.tag & a)) {
        var e = d.destroy;
        d.destroy = void 0;
        void 0 !== e && e();
      }

      0 !== (d.tag & b) && (e = d.create, d.destroy = e());
      d = d.next;
    } while (d !== c);
  }
}

function Vi(a, b, c) {
  "function" === typeof Wi && Wi(b);

  switch (b.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      a = b.updateQueue;

      if (null !== a && (a = a.lastEffect, null !== a)) {
        var d = a.next;
        fg(97 < c ? 97 : c, function () {
          var a = d;

          do {
            var c = a.destroy;

            if (void 0 !== c) {
              var g = b;

              try {
                c();
              } catch (h) {
                Ri(g, h);
              }
            }

            a = a.next;
          } while (a !== d);
        });
      }

      break;

    case 1:
      Si(b);
      c = b.stateNode;
      "function" === typeof c.componentWillUnmount && Qi(b, c);
      break;

    case 5:
      Si(b);
      break;

    case 4:
      Xi(a, b, c);
  }
}

function Yi(a) {
  var b = a.alternate;
  a.return = null;
  a.child = null;
  a.memoizedState = null;
  a.updateQueue = null;
  a.dependencies = null;
  a.alternate = null;
  a.firstEffect = null;
  a.lastEffect = null;
  a.pendingProps = null;
  a.memoizedProps = null;
  null !== b && Yi(b);
}

function Zi(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}

function $i(a) {
  a: {
    for (var b = a.return; null !== b;) {
      if (Zi(b)) {
        var c = b;
        break a;
      }

      b = b.return;
    }

    throw Error(u(160));
  }

  b = c.stateNode;

  switch (c.tag) {
    case 5:
      var d = !1;
      break;

    case 3:
      b = b.containerInfo;
      d = !0;
      break;

    case 4:
      b = b.containerInfo;
      d = !0;
      break;

    default:
      throw Error(u(161));
  }

  c.effectTag & 16 && (Tb(b, ""), c.effectTag &= -17);

  a: b: for (c = a;;) {
    for (; null === c.sibling;) {
      if (null === c.return || Zi(c.return)) {
        c = null;
        break a;
      }

      c = c.return;
    }

    c.sibling.return = c.return;

    for (c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag;) {
      if (c.effectTag & 2) continue b;
      if (null === c.child || 4 === c.tag) continue b;else c.child.return = c, c = c.child;
    }

    if (!(c.effectTag & 2)) {
      c = c.stateNode;
      break a;
    }
  }

  for (var e = a;;) {
    var f = 5 === e.tag || 6 === e.tag;

    if (f) {
      var g = f ? e.stateNode : e.stateNode.instance;
      if (c) {
        if (d) {
          f = b;
          var h = g;
          g = c;
          8 === f.nodeType ? f.parentNode.insertBefore(h, g) : f.insertBefore(h, g);
        } else b.insertBefore(g, c);
      } else d ? (h = b, 8 === h.nodeType ? (f = h.parentNode, f.insertBefore(g, h)) : (f = h, f.appendChild(g)), h = h._reactRootContainer, null !== h && void 0 !== h || null !== f.onclick || (f.onclick = ae)) : b.appendChild(g);
    } else if (4 !== e.tag && null !== e.child) {
      e.child.return = e;
      e = e.child;
      continue;
    }

    if (e === a) break;

    for (; null === e.sibling;) {
      if (null === e.return || e.return === a) return;
      e = e.return;
    }

    e.sibling.return = e.return;
    e = e.sibling;
  }
}

function Xi(a, b, c) {
  for (var d = b, e = !1, f, g;;) {
    if (!e) {
      e = d.return;

      a: for (;;) {
        if (null === e) throw Error(u(160));
        f = e.stateNode;

        switch (e.tag) {
          case 5:
            g = !1;
            break a;

          case 3:
            f = f.containerInfo;
            g = !0;
            break a;

          case 4:
            f = f.containerInfo;
            g = !0;
            break a;
        }

        e = e.return;
      }

      e = !0;
    }

    if (5 === d.tag || 6 === d.tag) {
      a: for (var h = a, k = d, l = c, m = k;;) {
        if (Vi(h, m, l), null !== m.child && 4 !== m.tag) m.child.return = m, m = m.child;else {
          if (m === k) break;

          for (; null === m.sibling;) {
            if (null === m.return || m.return === k) break a;
            m = m.return;
          }

          m.sibling.return = m.return;
          m = m.sibling;
        }
      }

      g ? (h = f, k = d.stateNode, 8 === h.nodeType ? h.parentNode.removeChild(k) : h.removeChild(k)) : f.removeChild(d.stateNode);
    } else if (4 === d.tag) {
      if (null !== d.child) {
        f = d.stateNode.containerInfo;
        g = !0;
        d.child.return = d;
        d = d.child;
        continue;
      }
    } else if (Vi(a, d, c), null !== d.child) {
      d.child.return = d;
      d = d.child;
      continue;
    }

    if (d === b) break;

    for (; null === d.sibling;) {
      if (null === d.return || d.return === b) return;
      d = d.return;
      4 === d.tag && (e = !1);
    }

    d.sibling.return = d.return;
    d = d.sibling;
  }
}

function aj(a, b) {
  switch (b.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Ui(4, 8, b);
      break;

    case 1:
      break;

    case 5:
      var c = b.stateNode;

      if (null != c) {
        var d = b.memoizedProps,
            e = null !== a ? a.memoizedProps : d;
        a = b.type;
        var f = b.updateQueue;
        b.updateQueue = null;

        if (null !== f) {
          c[ve] = d;
          "input" === a && "radio" === d.type && null != d.name && Cb(c, d);
          Zd(a, e);
          b = Zd(a, d);

          for (e = 0; e < f.length; e += 2) {
            var g = f[e],
                h = f[e + 1];
            "style" === g ? Wd(c, h) : "dangerouslySetInnerHTML" === g ? Sb(c, h) : "children" === g ? Tb(c, h) : vb(c, g, h, b);
          }

          switch (a) {
            case "input":
              Eb(c, d);
              break;

            case "textarea":
              Mb(c, d);
              break;

            case "select":
              b = c._wrapperState.wasMultiple, c._wrapperState.wasMultiple = !!d.multiple, a = d.value, null != a ? Jb(c, !!d.multiple, a, !1) : b !== !!d.multiple && (null != d.defaultValue ? Jb(c, !!d.multiple, d.defaultValue, !0) : Jb(c, !!d.multiple, d.multiple ? [] : "", !1));
          }
        }
      }

      break;

    case 6:
      if (null === b.stateNode) throw Error(u(162));
      b.stateNode.nodeValue = b.memoizedProps;
      break;

    case 3:
      b = b.stateNode;
      b.hydrate && (b.hydrate = !1, Lc(b.containerInfo));
      break;

    case 12:
      break;

    case 13:
      c = b;
      null === b.memoizedState ? d = !1 : (d = !0, c = b.child, bj = cg());
      if (null !== c) a: for (a = c;;) {
        if (5 === a.tag) f = a.stateNode, d ? (f = f.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (f = a.stateNode, e = a.memoizedProps.style, e = void 0 !== e && null !== e && e.hasOwnProperty("display") ? e.display : null, f.style.display = Vd("display", e));else if (6 === a.tag) a.stateNode.nodeValue = d ? "" : a.memoizedProps;else if (13 === a.tag && null !== a.memoizedState && null === a.memoizedState.dehydrated) {
          f = a.child.sibling;
          f.return = a;
          a = f;
          continue;
        } else if (null !== a.child) {
          a.child.return = a;
          a = a.child;
          continue;
        }
        if (a === c) break a;

        for (; null === a.sibling;) {
          if (null === a.return || a.return === c) break a;
          a = a.return;
        }

        a.sibling.return = a.return;
        a = a.sibling;
      }
      cj(b);
      break;

    case 19:
      cj(b);
      break;

    case 17:
      break;

    case 20:
      break;

    case 21:
      break;

    default:
      throw Error(u(163));
  }
}

function cj(a) {
  var b = a.updateQueue;

  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Oi());
    b.forEach(function (b) {
      var d = dj.bind(null, a, b);
      c.has(b) || (c.add(b), b.then(d, d));
    });
  }
}

var ej = "function" === typeof WeakMap ? WeakMap : Map;

function fj(a, b, c) {
  c = Bg(c, null);
  c.tag = 3;
  c.payload = {
    element: null
  };
  var d = b.value;

  c.callback = function () {
    gj || (gj = !0, hj = d);
    Pi(a, b);
  };

  return c;
}

function ij(a, b, c) {
  c = Bg(c, null);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;

  if ("function" === typeof d) {
    var e = b.value;

    c.payload = function () {
      Pi(a, b);
      return d(e);
    };
  }

  var f = a.stateNode;
  null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
    "function" !== typeof d && (null === jj ? jj = new Set([this]) : jj.add(this), Pi(a, b));
    var c = b.stack;
    this.componentDidCatch(b.value, {
      componentStack: null !== c ? c : ""
    });
  });
  return c;
}

var kj = Math.ceil,
    lj = Ea.ReactCurrentDispatcher,
    mj = Ea.ReactCurrentOwner,
    S = 0,
    nj = 8,
    oj = 16,
    pj = 32,
    qj = 0,
    rj = 1,
    sj = 2,
    tj = 3,
    uj = 4,
    vj = 5,
    T = S,
    U = null,
    V = null,
    W = 0,
    X = qj,
    wj = null,
    xj = 1073741823,
    yj = 1073741823,
    zj = null,
    Aj = 0,
    Bj = !1,
    bj = 0,
    Cj = 500,
    Y = null,
    gj = !1,
    hj = null,
    jj = null,
    Dj = !1,
    Ej = null,
    Fj = 90,
    Gj = null,
    Hj = 0,
    Ij = null,
    Jj = 0;

function Pg() {
  return (T & (oj | pj)) !== S ? 1073741821 - (cg() / 10 | 0) : 0 !== Jj ? Jj : Jj = 1073741821 - (cg() / 10 | 0);
}

function Qg(a, b, c) {
  b = b.mode;
  if (0 === (b & 2)) return 1073741823;
  var d = dg();
  if (0 === (b & 4)) return 99 === d ? 1073741823 : 1073741822;
  if ((T & oj) !== S) return W;
  if (null !== c) a = lg(a, c.timeoutMs | 0 || 5E3, 250);else switch (d) {
    case 99:
      a = 1073741823;
      break;

    case 98:
      a = lg(a, 150, 100);
      break;

    case 97:
    case 96:
      a = lg(a, 5E3, 250);
      break;

    case 95:
      a = 2;
      break;

    default:
      throw Error(u(326));
  }
  null !== U && a === W && --a;
  return a;
}

function Rg(a, b) {
  if (50 < Hj) throw Hj = 0, Ij = null, Error(u(185));
  a = Kj(a, b);

  if (null !== a) {
    var c = dg();
    1073741823 === b ? (T & nj) !== S && (T & (oj | pj)) === S ? Lj(a) : (Z(a), T === S && jg()) : Z(a);
    (T & 4) === S || 98 !== c && 99 !== c || (null === Gj ? Gj = new Map([[a, b]]) : (c = Gj.get(a), (void 0 === c || c > b) && Gj.set(a, b)));
  }
}

function Kj(a, b) {
  a.expirationTime < b && (a.expirationTime = b);
  var c = a.alternate;
  null !== c && c.expirationTime < b && (c.expirationTime = b);
  var d = a.return,
      e = null;
  if (null === d && 3 === a.tag) e = a.stateNode;else for (; null !== d;) {
    c = d.alternate;
    d.childExpirationTime < b && (d.childExpirationTime = b);
    null !== c && c.childExpirationTime < b && (c.childExpirationTime = b);

    if (null === d.return && 3 === d.tag) {
      e = d.stateNode;
      break;
    }

    d = d.return;
  }
  null !== e && (U === e && (Jg(b), X === uj && Mj(e, W)), Nj(e, b));
  return e;
}

function Oj(a) {
  var b = a.lastExpiredTime;
  if (0 !== b) return b;
  b = a.firstPendingTime;
  if (!Pj(a, b)) return b;
  b = a.lastPingedTime;
  a = a.nextKnownPendingLevel;
  return b > a ? b : a;
}

function Z(a) {
  if (0 !== a.lastExpiredTime) a.callbackExpirationTime = 1073741823, a.callbackPriority = 99, a.callbackNode = hg(Lj.bind(null, a));else {
    var b = Oj(a),
        c = a.callbackNode;
    if (0 === b) null !== c && (a.callbackNode = null, a.callbackExpirationTime = 0, a.callbackPriority = 90);else {
      var d = Pg();
      1073741823 === b ? d = 99 : 1 === b || 2 === b ? d = 95 : (d = 10 * (1073741821 - b) - 10 * (1073741821 - d), d = 0 >= d ? 99 : 250 >= d ? 98 : 5250 >= d ? 97 : 95);

      if (null !== c) {
        var e = a.callbackPriority;
        if (a.callbackExpirationTime === b && e >= d) return;
        c !== Xf && Nf(c);
      }

      a.callbackExpirationTime = b;
      a.callbackPriority = d;
      b = 1073741823 === b ? hg(Lj.bind(null, a)) : gg(d, Qj.bind(null, a), {
        timeout: 10 * (1073741821 - b) - cg()
      });
      a.callbackNode = b;
    }
  }
}

function Qj(a, b) {
  Jj = 0;
  if (b) return b = Pg(), Rj(a, b), Z(a), null;
  var c = Oj(a);

  if (0 !== c) {
    b = a.callbackNode;
    if ((T & (oj | pj)) !== S) throw Error(u(327));
    Sj();
    a === U && c === W || Tj(a, c);

    if (null !== V) {
      var d = T;
      T |= oj;
      var e = Uj(a);

      do {
        try {
          Vj();
          break;
        } catch (h) {
          Wj(a, h);
        }
      } while (1);

      rg();
      T = d;
      lj.current = e;
      if (X === rj) throw b = wj, Tj(a, c), Mj(a, c), Z(a), b;
      if (null === V) switch (e = a.finishedWork = a.current.alternate, a.finishedExpirationTime = c, d = X, U = null, d) {
        case qj:
        case rj:
          throw Error(u(345));

        case sj:
          Rj(a, 2 < c ? 2 : c);
          break;

        case tj:
          Mj(a, c);
          d = a.lastSuspendedTime;
          c === d && (a.nextKnownPendingLevel = Xj(e));

          if (1073741823 === xj && (e = bj + Cj - cg(), 10 < e)) {
            if (Bj) {
              var f = a.lastPingedTime;

              if (0 === f || f >= c) {
                a.lastPingedTime = c;
                Tj(a, c);
                break;
              }
            }

            f = Oj(a);
            if (0 !== f && f !== c) break;

            if (0 !== d && d !== c) {
              a.lastPingedTime = d;
              break;
            }

            a.timeoutHandle = pe(Yj.bind(null, a), e);
            break;
          }

          Yj(a);
          break;

        case uj:
          Mj(a, c);
          d = a.lastSuspendedTime;
          c === d && (a.nextKnownPendingLevel = Xj(e));

          if (Bj && (e = a.lastPingedTime, 0 === e || e >= c)) {
            a.lastPingedTime = c;
            Tj(a, c);
            break;
          }

          e = Oj(a);
          if (0 !== e && e !== c) break;

          if (0 !== d && d !== c) {
            a.lastPingedTime = d;
            break;
          }

          1073741823 !== yj ? d = 10 * (1073741821 - yj) - cg() : 1073741823 === xj ? d = 0 : (d = 10 * (1073741821 - xj) - 5E3, e = cg(), c = 10 * (1073741821 - c) - e, d = e - d, 0 > d && (d = 0), d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3E3 > d ? 3E3 : 4320 > d ? 4320 : 1960 * kj(d / 1960)) - d, c < d && (d = c));

          if (10 < d) {
            a.timeoutHandle = pe(Yj.bind(null, a), d);
            break;
          }

          Yj(a);
          break;

        case vj:
          if (1073741823 !== xj && null !== zj) {
            f = xj;
            var g = zj;
            d = g.busyMinDurationMs | 0;
            0 >= d ? d = 0 : (e = g.busyDelayMs | 0, f = cg() - (10 * (1073741821 - f) - (g.timeoutMs | 0 || 5E3)), d = f <= e ? 0 : e + d - f);

            if (10 < d) {
              Mj(a, c);
              a.timeoutHandle = pe(Yj.bind(null, a), d);
              break;
            }
          }

          Yj(a);
          break;

        default:
          throw Error(u(329));
      }
      Z(a);
      if (a.callbackNode === b) return Qj.bind(null, a);
    }
  }

  return null;
}

function Lj(a) {
  var b = a.lastExpiredTime;
  b = 0 !== b ? b : 1073741823;
  if (a.finishedExpirationTime === b) Yj(a);else {
    if ((T & (oj | pj)) !== S) throw Error(u(327));
    Sj();
    a === U && b === W || Tj(a, b);

    if (null !== V) {
      var c = T;
      T |= oj;
      var d = Uj(a);

      do {
        try {
          Zj();
          break;
        } catch (e) {
          Wj(a, e);
        }
      } while (1);

      rg();
      T = c;
      lj.current = d;
      if (X === rj) throw c = wj, Tj(a, b), Mj(a, b), Z(a), c;
      if (null !== V) throw Error(u(261));
      a.finishedWork = a.current.alternate;
      a.finishedExpirationTime = b;
      U = null;
      Yj(a);
      Z(a);
    }
  }
  return null;
}

function ak() {
  if (null !== Gj) {
    var a = Gj;
    Gj = null;
    a.forEach(function (a, c) {
      Rj(c, a);
      Z(c);
    });
    jg();
  }
}

function bk(a, b) {
  var c = T;
  T |= 1;

  try {
    return a(b);
  } finally {
    T = c, T === S && jg();
  }
}

function ck(a, b) {
  var c = T;
  T &= -2;
  T |= nj;

  try {
    return a(b);
  } finally {
    T = c, T === S && jg();
  }
}

function Tj(a, b) {
  a.finishedWork = null;
  a.finishedExpirationTime = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, qe(c));
  if (null !== V) for (c = V.return; null !== c;) {
    var d = c;

    switch (d.tag) {
      case 1:
        var e = d.type.childContextTypes;
        null !== e && void 0 !== e && Ff(d);
        break;

      case 3:
        nh(d);
        Gf(d);
        break;

      case 5:
        ph(d);
        break;

      case 4:
        nh(d);
        break;

      case 13:
        G(M, d);
        break;

      case 19:
        G(M, d);
        break;

      case 10:
        tg(d);
    }

    c = c.return;
  }
  U = a;
  V = ah(a.current, null, b);
  W = b;
  X = qj;
  wj = null;
  yj = xj = 1073741823;
  zj = null;
  Aj = 0;
  Bj = !1;
}

function Wj(a, b) {
  do {
    try {
      rg();
      Mh();
      if (null === V || null === V.return) return X = rj, wj = b, null;

      a: {
        var c = a,
            d = V.return,
            e = V,
            f = b;
        b = W;
        e.effectTag |= 2048;
        e.firstEffect = e.lastEffect = null;

        if (null !== f && "object" === typeof f && "function" === typeof f.then) {
          var g = f,
              h = 0 !== (M.current & 1),
              k = d;

          do {
            var l;

            if (l = 13 === k.tag) {
              var m = k.memoizedState;
              if (null !== m) l = null !== m.dehydrated ? !0 : !1;else {
                var C = k.memoizedProps;
                l = void 0 === C.fallback ? !1 : !0 !== C.unstable_avoidThisFallback ? !0 : h ? !1 : !0;
              }
            }

            if (l) {
              var y = k.updateQueue;

              if (null === y) {
                var H = new Set();
                H.add(g);
                k.updateQueue = H;
              } else y.add(g);

              if (0 === (k.mode & 2)) {
                k.effectTag |= 64;
                e.effectTag &= -2981;
                if (1 === e.tag) if (null === e.alternate) e.tag = 17;else {
                  var z = Bg(1073741823, null);
                  z.tag = 2;
                  Dg(e, z);
                }
                e.expirationTime = 1073741823;
                break a;
              }

              f = void 0;
              e = b;
              var ta = c.pingCache;
              null === ta ? (ta = c.pingCache = new ej(), f = new Set(), ta.set(g, f)) : (f = ta.get(g), void 0 === f && (f = new Set(), ta.set(g, f)));

              if (!f.has(e)) {
                f.add(e);
                var r = dk.bind(null, c, g, e);
                g.then(r, r);
              }

              k.effectTag |= 4096;
              k.expirationTime = b;
              break a;
            }

            k = k.return;
          } while (null !== k);

          f = Error((Wa(e.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + Xa(e));
        }

        X !== vj && (X = sj);
        f = Ni(f, e);
        k = d;

        do {
          switch (k.tag) {
            case 3:
              g = f;
              k.effectTag |= 4096;
              k.expirationTime = b;
              var x = fj(k, g, b);
              Eg(k, x);
              break a;

            case 1:
              g = f;
              var A = k.type,
                  p = k.stateNode;

              if (0 === (k.effectTag & 64) && ("function" === typeof A.getDerivedStateFromError || null !== p && "function" === typeof p.componentDidCatch && (null === jj || !jj.has(p)))) {
                k.effectTag |= 4096;
                k.expirationTime = b;
                var t = ij(k, g, b);
                Eg(k, t);
                break a;
              }

          }

          k = k.return;
        } while (null !== k);
      }

      V = ek(V);
    } catch (v) {
      b = v;
      continue;
    }

    break;
  } while (1);
}

function Uj() {
  var a = lj.current;
  lj.current = Lh;
  return null === a ? Lh : a;
}

function Ig(a, b) {
  a < xj && 2 < a && (xj = a);
  null !== b && a < yj && 2 < a && (yj = a, zj = b);
}

function Jg(a) {
  a > Aj && (Aj = a);
}

function Zj() {
  for (; null !== V;) {
    V = fk(V);
  }
}

function Vj() {
  for (; null !== V && !Of();) {
    V = fk(V);
  }
}

function fk(a) {
  var b = gk(a.alternate, a, W);
  a.memoizedProps = a.pendingProps;
  null === b && (b = ek(a));
  mj.current = null;
  return b;
}

function ek(a) {
  V = a;

  do {
    var b = V.alternate;
    a = V.return;

    if (0 === (V.effectTag & 2048)) {
      a: {
        var c = b;
        b = V;
        var d = W;
        var e = b.pendingProps;

        switch (b.tag) {
          case 2:
            break;

          case 16:
            break;

          case 15:
          case 0:
            break;

          case 1:
            L(b.type) && Ff(b);
            break;

          case 3:
            nh(b);
            Gf(b);
            e = b.stateNode;
            e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null);
            (null === c || null === c.child) && ki(b) && Ci(b);
            Ii(b);
            break;

          case 5:
            ph(b);
            d = lh(kh.current);
            var f = b.type;
            if (null !== c && null != b.stateNode) Ji(c, b, f, e, d), c.ref !== b.ref && (b.effectTag |= 128);else if (e) {
              var g = lh(ih.current);

              if (ki(b)) {
                e = b;
                var h = e.stateNode;
                c = e.type;
                var k = e.memoizedProps,
                    l = d;
                h[ue] = e;
                h[ve] = k;
                f = void 0;
                d = h;

                switch (c) {
                  case "iframe":
                  case "object":
                  case "embed":
                    F("load", d);
                    break;

                  case "video":
                  case "audio":
                    for (h = 0; h < dc.length; h++) {
                      F(dc[h], d);
                    }

                    break;

                  case "source":
                    F("error", d);
                    break;

                  case "img":
                  case "image":
                  case "link":
                    F("error", d);
                    F("load", d);
                    break;

                  case "form":
                    F("reset", d);
                    F("submit", d);
                    break;

                  case "details":
                    F("toggle", d);
                    break;

                  case "input":
                    Bb(d, k);
                    F("invalid", d);
                    $d(l, "onChange");
                    break;

                  case "select":
                    d._wrapperState = {
                      wasMultiple: !!k.multiple
                    };
                    F("invalid", d);
                    $d(l, "onChange");
                    break;

                  case "textarea":
                    Lb(d, k), F("invalid", d), $d(l, "onChange");
                }

                Yd(c, k);
                h = null;

                for (f in k) {
                  k.hasOwnProperty(f) && (g = k[f], "children" === f ? "string" === typeof g ? d.textContent !== g && (h = ["children", g]) : "number" === typeof g && d.textContent !== "" + g && (h = ["children", "" + g]) : ia.hasOwnProperty(f) && null != g && $d(l, f));
                }

                switch (c) {
                  case "input":
                    yb(d);
                    Gb(d, k, !0);
                    break;

                  case "textarea":
                    yb(d);
                    Nb(d, k);
                    break;

                  case "select":
                  case "option":
                    break;

                  default:
                    "function" === typeof k.onClick && (d.onclick = ae);
                }

                f = h;
                e.updateQueue = f;
                e = null !== f ? !0 : !1;
                e && Ci(b);
              } else {
                c = b;
                l = f;
                k = e;
                h = 9 === d.nodeType ? d : d.ownerDocument;
                g === Ob.html && (g = Pb(l));
                g === Ob.html ? "script" === l ? (k = h.createElement("div"), k.innerHTML = "<script>\x3c/script>", h = k.removeChild(k.firstChild)) : "string" === typeof k.is ? h = h.createElement(l, {
                  is: k.is
                }) : (h = h.createElement(l), "select" === l && (l = h, k.multiple ? l.multiple = !0 : k.size && (l.size = k.size))) : h = h.createElementNS(g, l);
                k = h;
                k[ue] = c;
                k[ve] = e;
                Hi(k, b, !1, !1);
                b.stateNode = k;
                l = f;
                c = e;
                var m = d,
                    C = Zd(l, c);

                switch (l) {
                  case "iframe":
                  case "object":
                  case "embed":
                    F("load", k);
                    d = c;
                    break;

                  case "video":
                  case "audio":
                    for (d = 0; d < dc.length; d++) {
                      F(dc[d], k);
                    }

                    d = c;
                    break;

                  case "source":
                    F("error", k);
                    d = c;
                    break;

                  case "img":
                  case "image":
                  case "link":
                    F("error", k);
                    F("load", k);
                    d = c;
                    break;

                  case "form":
                    F("reset", k);
                    F("submit", k);
                    d = c;
                    break;

                  case "details":
                    F("toggle", k);
                    d = c;
                    break;

                  case "input":
                    Bb(k, c);
                    d = Ab(k, c);
                    F("invalid", k);
                    $d(m, "onChange");
                    break;

                  case "option":
                    d = Ib(k, c);
                    break;

                  case "select":
                    k._wrapperState = {
                      wasMultiple: !!c.multiple
                    };
                    d = n({}, c, {
                      value: void 0
                    });
                    F("invalid", k);
                    $d(m, "onChange");
                    break;

                  case "textarea":
                    Lb(k, c);
                    d = Kb(k, c);
                    F("invalid", k);
                    $d(m, "onChange");
                    break;

                  default:
                    d = c;
                }

                Yd(l, d);
                h = void 0;
                g = l;
                var y = k,
                    H = d;

                for (h in H) {
                  if (H.hasOwnProperty(h)) {
                    var z = H[h];
                    "style" === h ? Wd(y, z) : "dangerouslySetInnerHTML" === h ? (z = z ? z.__html : void 0, null != z && Sb(y, z)) : "children" === h ? "string" === typeof z ? ("textarea" !== g || "" !== z) && Tb(y, z) : "number" === typeof z && Tb(y, "" + z) : "suppressContentEditableWarning" !== h && "suppressHydrationWarning" !== h && "autoFocus" !== h && (ia.hasOwnProperty(h) ? null != z && $d(m, h) : null != z && vb(y, h, z, C));
                  }
                }

                switch (l) {
                  case "input":
                    yb(k);
                    Gb(k, c, !1);
                    break;

                  case "textarea":
                    yb(k);
                    Nb(k, c);
                    break;

                  case "option":
                    null != c.value && k.setAttribute("value", "" + ub(c.value));
                    break;

                  case "select":
                    d = k;
                    d.multiple = !!c.multiple;
                    k = c.value;
                    null != k ? Jb(d, !!c.multiple, k, !1) : null != c.defaultValue && Jb(d, !!c.multiple, c.defaultValue, !0);
                    break;

                  default:
                    "function" === typeof d.onClick && (k.onclick = ae);
                }

                (e = ne(f, e)) && Ci(b);
              }

              null !== b.ref && (b.effectTag |= 128);
            } else if (null === b.stateNode) throw Error(u(166));
            break;

          case 6:
            if (c && null != b.stateNode) Ki(c, b, c.memoizedProps, e);else {
              if ("string" !== typeof e && null === b.stateNode) throw Error(u(166));
              d = lh(kh.current);
              lh(ih.current);
              ki(b) ? (e = b, f = e.stateNode, d = e.memoizedProps, f[ue] = e, (e = f.nodeValue !== d) && Ci(b)) : (f = b, e = (9 === d.nodeType ? d : d.ownerDocument).createTextNode(e), e[ue] = f, b.stateNode = e);
            }
            break;

          case 11:
            break;

          case 13:
            G(M, b);
            e = b.memoizedState;

            if (0 !== (b.effectTag & 64)) {
              b.expirationTime = d;
              break a;
            }

            e = null !== e;
            f = !1;
            null === c ? void 0 !== b.memoizedProps.fallback && ki(b) : (d = c.memoizedState, f = null !== d, e || null === d || (d = c.child.sibling, null !== d && (k = b.firstEffect, null !== k ? (b.firstEffect = d, d.nextEffect = k) : (b.firstEffect = b.lastEffect = d, d.nextEffect = null), d.effectTag = 8)));
            if (e && !f && 0 !== (b.mode & 2)) if (null === c && !0 !== b.memoizedProps.unstable_avoidThisFallback || 0 !== (M.current & 1)) X === qj && (X = tj);else {
              if (X === qj || X === tj) X = uj;
              0 !== Aj && null !== U && (Mj(U, W), Nj(U, Aj));
            }
            if (e || f) b.effectTag |= 4;
            break;

          case 7:
            break;

          case 8:
            break;

          case 12:
            break;

          case 4:
            nh(b);
            Ii(b);
            break;

          case 10:
            tg(b);
            break;

          case 9:
            break;

          case 14:
            break;

          case 17:
            L(b.type) && Ff(b);
            break;

          case 19:
            G(M, b);
            e = b.memoizedState;
            if (null === e) break;
            f = 0 !== (b.effectTag & 64);
            k = e.rendering;
            if (null === k) {
              if (f) Li(e, !1);else {
                if (X !== qj || null !== c && 0 !== (c.effectTag & 64)) for (c = b.child; null !== c;) {
                  k = qh(c);

                  if (null !== k) {
                    b.effectTag |= 64;
                    Li(e, !1);
                    f = k.updateQueue;
                    null !== f && (b.updateQueue = f, b.effectTag |= 4);
                    null === e.lastEffect && (b.firstEffect = null);
                    b.lastEffect = e.lastEffect;
                    e = d;

                    for (f = b.child; null !== f;) {
                      d = f, c = e, d.effectTag &= 2, d.nextEffect = null, d.firstEffect = null, d.lastEffect = null, k = d.alternate, null === k ? (d.childExpirationTime = 0, d.expirationTime = c, d.child = null, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null) : (d.childExpirationTime = k.childExpirationTime, d.expirationTime = k.expirationTime, d.child = k.child, d.memoizedProps = k.memoizedProps, d.memoizedState = k.memoizedState, d.updateQueue = k.updateQueue, c = k.dependencies, d.dependencies = null === c ? null : {
                        expirationTime: c.expirationTime,
                        firstContext: c.firstContext,
                        responders: c.responders
                      }), f = f.sibling;
                    }

                    I(M, M.current & 1 | 2, b);
                    b = b.child;
                    break a;
                  }

                  c = c.sibling;
                }
              }
            } else {
              if (!f) if (c = qh(k), null !== c) {
                if (b.effectTag |= 64, f = !0, d = c.updateQueue, null !== d && (b.updateQueue = d, b.effectTag |= 4), Li(e, !0), null === e.tail && "hidden" === e.tailMode) {
                  b = b.lastEffect = e.lastEffect;
                  null !== b && (b.nextEffect = null);
                  break;
                }
              } else cg() > e.tailExpiration && 1 < d && (b.effectTag |= 64, f = !0, Li(e, !1), b.expirationTime = b.childExpirationTime = d - 1);
              e.isBackwards ? (k.sibling = b.child, b.child = k) : (d = e.last, null !== d ? d.sibling = k : b.child = k, e.last = k);
            }

            if (null !== e.tail) {
              0 === e.tailExpiration && (e.tailExpiration = cg() + 500);
              d = e.tail;
              e.rendering = d;
              e.tail = d.sibling;
              e.lastEffect = b.lastEffect;
              d.sibling = null;
              e = M.current;
              e = f ? e & 1 | 2 : e & 1;
              I(M, e, b);
              b = d;
              break a;
            }

            break;

          case 20:
            break;

          case 21:
            break;

          default:
            throw Error(u(156, b.tag));
        }

        b = null;
      }

      e = V;

      if (1 === W || 1 !== e.childExpirationTime) {
        f = 0;

        for (d = e.child; null !== d;) {
          c = d.expirationTime, k = d.childExpirationTime, c > f && (f = c), k > f && (f = k), d = d.sibling;
        }

        e.childExpirationTime = f;
      }

      if (null !== b) return b;
      null !== a && 0 === (a.effectTag & 2048) && (null === a.firstEffect && (a.firstEffect = V.firstEffect), null !== V.lastEffect && (null !== a.lastEffect && (a.lastEffect.nextEffect = V.firstEffect), a.lastEffect = V.lastEffect), 1 < V.effectTag && (null !== a.lastEffect ? a.lastEffect.nextEffect = V : a.firstEffect = V, a.lastEffect = V));
    } else {
      b = Mi(V, W);
      if (null !== b) return b.effectTag &= 2047, b;
      null !== a && (a.firstEffect = a.lastEffect = null, a.effectTag |= 2048);
    }

    b = V.sibling;
    if (null !== b) return b;
    V = a;
  } while (null !== V);

  X === qj && (X = vj);
  return null;
}

function Xj(a) {
  var b = a.expirationTime;
  a = a.childExpirationTime;
  return b > a ? b : a;
}

function Yj(a) {
  var b = dg();
  fg(99, ik.bind(null, a, b));
  return null;
}

function ik(a, b) {
  Sj();
  if ((T & (oj | pj)) !== S) throw Error(u(327));
  var c = a.finishedWork,
      d = a.finishedExpirationTime;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedExpirationTime = 0;
  if (c === a.current) throw Error(u(177));
  a.callbackNode = null;
  a.callbackExpirationTime = 0;
  a.callbackPriority = 90;
  a.nextKnownPendingLevel = 0;
  var e = Xj(c);
  a.firstPendingTime = e;
  d <= a.lastSuspendedTime ? a.firstSuspendedTime = a.lastSuspendedTime = a.nextKnownPendingLevel = 0 : d <= a.firstSuspendedTime && (a.firstSuspendedTime = d - 1);
  d <= a.lastPingedTime && (a.lastPingedTime = 0);
  d <= a.lastExpiredTime && (a.lastExpiredTime = 0);
  a === U && (V = U = null, W = 0);
  1 < c.effectTag ? null !== c.lastEffect ? (c.lastEffect.nextEffect = c, e = c.firstEffect) : e = c : e = c.firstEffect;

  if (null !== e) {
    var f = T;
    T |= pj;
    mj.current = null;
    le = Ld;
    var g = fe();

    if (ge(g)) {
      if ("selectionStart" in g) var h = {
        start: g.selectionStart,
        end: g.selectionEnd
      };else a: {
        h = (h = g.ownerDocument) && h.defaultView || window;
        var k = h.getSelection && h.getSelection();

        if (k && 0 !== k.rangeCount) {
          h = k.anchorNode;
          var l = k.anchorOffset,
              m = k.focusNode;
          k = k.focusOffset;

          try {
            h.nodeType, m.nodeType;
          } catch (Db) {
            h = null;
            break a;
          }

          var C = 0,
              y = -1,
              H = -1,
              z = 0,
              ta = 0,
              r = g,
              x = null;

          b: for (;;) {
            for (var A;;) {
              r !== h || 0 !== l && 3 !== r.nodeType || (y = C + l);
              r !== m || 0 !== k && 3 !== r.nodeType || (H = C + k);
              3 === r.nodeType && (C += r.nodeValue.length);
              if (null === (A = r.firstChild)) break;
              x = r;
              r = A;
            }

            for (;;) {
              if (r === g) break b;
              x === h && ++z === l && (y = C);
              x === m && ++ta === k && (H = C);
              if (null !== (A = r.nextSibling)) break;
              r = x;
              x = r.parentNode;
            }

            r = A;
          }

          h = -1 === y || -1 === H ? null : {
            start: y,
            end: H
          };
        } else h = null;
      }
      h = h || {
        start: 0,
        end: 0
      };
    } else h = null;

    me = {
      focusedElem: g,
      selectionRange: h
    };
    Ld = !1;
    Y = e;

    do {
      try {
        jk();
      } catch (Db) {
        if (null === Y) throw Error(u(330));
        Ri(Y, Db);
        Y = Y.nextEffect;
      }
    } while (null !== Y);

    Y = e;

    do {
      try {
        for (g = a, h = b; null !== Y;) {
          var p = Y.effectTag;
          p & 16 && Tb(Y.stateNode, "");

          if (p & 128) {
            var t = Y.alternate;

            if (null !== t) {
              var v = t.ref;
              null !== v && ("function" === typeof v ? v(null) : v.current = null);
            }
          }

          switch (p & 1038) {
            case 2:
              $i(Y);
              Y.effectTag &= -3;
              break;

            case 6:
              $i(Y);
              Y.effectTag &= -3;
              aj(Y.alternate, Y);
              break;

            case 1024:
              Y.effectTag &= -1025;
              break;

            case 1028:
              Y.effectTag &= -1025;
              aj(Y.alternate, Y);
              break;

            case 4:
              aj(Y.alternate, Y);
              break;

            case 8:
              l = Y, Xi(g, l, h), Yi(l);
          }

          Y = Y.nextEffect;
        }
      } catch (Db) {
        if (null === Y) throw Error(u(330));
        Ri(Y, Db);
        Y = Y.nextEffect;
      }
    } while (null !== Y);

    v = me;
    t = fe();
    p = v.focusedElem;
    h = v.selectionRange;

    if (t !== p && p && p.ownerDocument && ee(p.ownerDocument.documentElement, p)) {
      null !== h && ge(p) && (t = h.start, v = h.end, void 0 === v && (v = t), "selectionStart" in p ? (p.selectionStart = t, p.selectionEnd = Math.min(v, p.value.length)) : (v = (t = p.ownerDocument || document) && t.defaultView || window, v.getSelection && (v = v.getSelection(), l = p.textContent.length, g = Math.min(h.start, l), h = void 0 === h.end ? g : Math.min(h.end, l), !v.extend && g > h && (l = h, h = g, g = l), l = de(p, g), m = de(p, h), l && m && (1 !== v.rangeCount || v.anchorNode !== l.node || v.anchorOffset !== l.offset || v.focusNode !== m.node || v.focusOffset !== m.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), v.removeAllRanges(), g > h ? (v.addRange(t), v.extend(m.node, m.offset)) : (t.setEnd(m.node, m.offset), v.addRange(t))))));
      t = [];

      for (v = p; v = v.parentNode;) {
        1 === v.nodeType && t.push({
          element: v,
          left: v.scrollLeft,
          top: v.scrollTop
        });
      }

      "function" === typeof p.focus && p.focus();

      for (p = 0; p < t.length; p++) {
        v = t[p], v.element.scrollLeft = v.left, v.element.scrollTop = v.top;
      }
    }

    me = null;
    Ld = !!le;
    le = null;
    a.current = c;
    Y = e;

    do {
      try {
        for (p = d; null !== Y;) {
          var Dh = Y.effectTag;

          if (Dh & 36) {
            var cc = Y.alternate;
            t = Y;
            v = p;

            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Ui(16, 32, t);
                break;

              case 1:
                var dd = t.stateNode;
                if (t.effectTag & 4) if (null === cc) dd.componentDidMount();else {
                  var hk = t.elementType === t.type ? cc.memoizedProps : mg(t.type, cc.memoizedProps);
                  dd.componentDidUpdate(hk, cc.memoizedState, dd.__reactInternalSnapshotBeforeUpdate);
                }
                var Eh = t.updateQueue;
                null !== Eh && Kg(t, Eh, dd, v);
                break;

              case 3:
                var Fh = t.updateQueue;

                if (null !== Fh) {
                  g = null;
                  if (null !== t.child) switch (t.child.tag) {
                    case 5:
                      g = t.child.stateNode;
                      break;

                    case 1:
                      g = t.child.stateNode;
                  }
                  Kg(t, Fh, g, v);
                }

                break;

              case 5:
                var xk = t.stateNode;
                null === cc && t.effectTag & 4 && ne(t.type, t.memoizedProps) && xk.focus();
                break;

              case 6:
                break;

              case 4:
                break;

              case 12:
                break;

              case 13:
                if (null === t.memoizedState) {
                  var Di = t.alternate;

                  if (null !== Di) {
                    var Ei = Di.memoizedState;

                    if (null !== Ei) {
                      var Fi = Ei.dehydrated;
                      null !== Fi && Lc(Fi);
                    }
                  }
                }

                break;

              case 19:
              case 17:
              case 20:
              case 21:
                break;

              default:
                throw Error(u(163));
            }
          }

          if (Dh & 128) {
            t = void 0;
            var wd = Y.ref;

            if (null !== wd) {
              var Gi = Y.stateNode;

              switch (Y.tag) {
                case 5:
                  t = Gi;
                  break;

                default:
                  t = Gi;
              }

              "function" === typeof wd ? wd(t) : wd.current = t;
            }
          }

          Y = Y.nextEffect;
        }
      } catch (Db) {
        if (null === Y) throw Error(u(330));
        Ri(Y, Db);
        Y = Y.nextEffect;
      }
    } while (null !== Y);

    Y = null;
    Yf();
    T = f;
  } else a.current = c;

  if (Dj) Dj = !1, Ej = a, Fj = b;else for (Y = e; null !== Y;) {
    b = Y.nextEffect, Y.nextEffect = null, Y = b;
  }
  b = a.firstPendingTime;
  0 === b && (jj = null);
  1073741823 === b ? a === Ij ? Hj++ : (Hj = 0, Ij = a) : Hj = 0;
  "function" === typeof kk && kk(c.stateNode, d);
  Z(a);
  if (gj) throw gj = !1, a = hj, hj = null, a;
  if ((T & nj) !== S) return null;
  jg();
  return null;
}

function jk() {
  for (; null !== Y;) {
    var a = Y.effectTag;
    0 !== (a & 256) && Ti(Y.alternate, Y);
    0 === (a & 512) || Dj || (Dj = !0, gg(97, function () {
      Sj();
      return null;
    }));
    Y = Y.nextEffect;
  }
}

function Sj() {
  if (90 !== Fj) {
    var a = 97 < Fj ? 97 : Fj;
    Fj = 90;
    return fg(a, lk);
  }
}

function lk() {
  if (null === Ej) return !1;
  var a = Ej;
  Ej = null;
  if ((T & (oj | pj)) !== S) throw Error(u(331));
  var b = T;
  T |= pj;

  for (a = a.current.firstEffect; null !== a;) {
    try {
      var c = a;
      if (0 !== (c.effectTag & 512)) switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Ui(128, 0, c), Ui(0, 64, c);
      }
    } catch (d) {
      if (null === a) throw Error(u(330));
      Ri(a, d);
    }

    c = a.nextEffect;
    a.nextEffect = null;
    a = c;
  }

  T = b;
  jg();
  return !0;
}

function mk(a, b, c) {
  b = Ni(c, b);
  b = fj(a, b, 1073741823);
  Dg(a, b);
  a = Kj(a, 1073741823);
  null !== a && Z(a);
}

function Ri(a, b) {
  if (3 === a.tag) mk(a, a, b);else for (var c = a.return; null !== c;) {
    if (3 === c.tag) {
      mk(c, a, b);
      break;
    } else if (1 === c.tag) {
      var d = c.stateNode;

      if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === jj || !jj.has(d))) {
        a = Ni(b, a);
        a = ij(c, a, 1073741823);
        Dg(c, a);
        c = Kj(c, 1073741823);
        null !== c && Z(c);
        break;
      }
    }

    c = c.return;
  }
}

function dk(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  U === a && W === c ? X === uj || X === tj && 1073741823 === xj && cg() - bj < Cj ? Tj(a, W) : Bj = !0 : Pj(a, c) && (b = a.lastPingedTime, 0 !== b && b < c || (a.lastPingedTime = c, a.finishedExpirationTime === c && (a.finishedExpirationTime = 0, a.finishedWork = null), Z(a)));
}

function dj(a, b) {
  var c = a.stateNode;
  null !== c && c.delete(b);
  b = 0;
  0 === b && (b = Pg(), b = Qg(b, a, null));
  a = Kj(a, b);
  null !== a && Z(a);
}

var gk;

gk = function gk(a, b, c) {
  var d = b.expirationTime;

  if (null !== a) {
    var e = b.pendingProps;
    if (a.memoizedProps !== e || K.current) wg = !0;else {
      if (d < c) {
        wg = !1;

        switch (b.tag) {
          case 3:
            wi(b);
            li();
            break;

          case 5:
            oh(b);
            if (b.mode & 4 && 1 !== c && e.hidden) return b.expirationTime = b.childExpirationTime = 1, null;
            break;

          case 1:
            L(b.type) && Jf(b);
            break;

          case 4:
            mh(b, b.stateNode.containerInfo);
            break;

          case 10:
            sg(b, b.memoizedProps.value);
            break;

          case 13:
            if (null !== b.memoizedState) {
              d = b.child.childExpirationTime;
              if (0 !== d && d >= c) return yi(a, b, c);
              I(M, M.current & 1, b);
              b = oi(a, b, c);
              return null !== b ? b.sibling : null;
            }

            I(M, M.current & 1, b);
            break;

          case 19:
            d = b.childExpirationTime >= c;

            if (0 !== (a.effectTag & 64)) {
              if (d) return Bi(a, b, c);
              b.effectTag |= 64;
            }

            e = b.memoizedState;
            null !== e && (e.rendering = null, e.tail = null);
            I(M, M.current, b);
            if (!d) return null;
        }

        return oi(a, b, c);
      }

      wg = !1;
    }
  } else wg = !1;

  b.expirationTime = 0;

  switch (b.tag) {
    case 2:
      d = b.type;
      null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
      a = b.pendingProps;
      e = Ef(b, J.current);
      vg(b, c);
      e = Ih(null, b, d, a, e, c);
      b.effectTag |= 1;

      if ("object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
        b.tag = 1;
        Mh();

        if (L(d)) {
          var f = !0;
          Jf(b);
        } else f = !1;

        b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
        var g = d.getDerivedStateFromProps;
        "function" === typeof g && Og(b, d, g, a);
        e.updater = Sg;
        b.stateNode = e;
        e._reactInternalFiber = b;
        Wg(b, d, a, c);
        b = vi(null, b, d, !0, f, c);
      } else b.tag = 0, R(null, b, e, c), b = b.child;

      return b;

    case 16:
      e = b.elementType;
      null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
      a = b.pendingProps;
      Va(e);
      if (1 !== e._status) throw e._result;
      e = e._result;
      b.type = e;
      f = b.tag = nk(e);
      a = mg(e, a);

      switch (f) {
        case 0:
          b = si(null, b, e, a, c);
          break;

        case 1:
          b = ui(null, b, e, a, c);
          break;

        case 11:
          b = ni(null, b, e, a, c);
          break;

        case 14:
          b = pi(null, b, e, mg(e.type, a), d, c);
          break;

        default:
          throw Error(u(306, e, ""));
      }

      return b;

    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : mg(d, e), si(a, b, d, e, c);

    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : mg(d, e), ui(a, b, d, e, c);

    case 3:
      wi(b);
      d = b.updateQueue;
      if (null === d) throw Error(u(282));
      e = b.memoizedState;
      e = null !== e ? e.element : null;
      Hg(b, d, b.pendingProps, null, c);
      d = b.memoizedState.element;
      if (d === e) li(), b = oi(a, b, c);else {
        if (e = b.stateNode.hydrate) di = re(b.stateNode.containerInfo.firstChild), ci = b, e = ei = !0;
        if (e) for (c = gh(b, null, d, c), b.child = c; c;) {
          c.effectTag = c.effectTag & -3 | 1024, c = c.sibling;
        } else R(a, b, d, c), li();
        b = b.child;
      }
      return b;

    case 5:
      return oh(b), null === a && ii(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, oe(d, e) ? g = null : null !== f && oe(d, f) && (b.effectTag |= 16), ti(a, b), b.mode & 4 && 1 !== c && e.hidden ? (b.expirationTime = b.childExpirationTime = 1, b = null) : (R(a, b, g, c), b = b.child), b;

    case 6:
      return null === a && ii(b), null;

    case 13:
      return yi(a, b, c);

    case 4:
      return mh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = fh(b, null, d, c) : R(a, b, d, c), b.child;

    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : mg(d, e), ni(a, b, d, e, c);

    case 7:
      return R(a, b, b.pendingProps, c), b.child;

    case 8:
      return R(a, b, b.pendingProps.children, c), b.child;

    case 12:
      return R(a, b, b.pendingProps.children, c), b.child;

    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        g = b.memoizedProps;
        f = e.value;
        sg(b, f);

        if (null !== g) {
          var h = g.value;
          f = of(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0;

          if (0 === f) {
            if (g.children === e.children && !K.current) {
              b = oi(a, b, c);
              break a;
            }
          } else for (h = b.child, null !== h && (h.return = b); null !== h;) {
            var k = h.dependencies;

            if (null !== k) {
              g = h.child;

              for (var l = k.firstContext; null !== l;) {
                if (l.context === d && 0 !== (l.observedBits & f)) {
                  1 === h.tag && (l = Bg(c, null), l.tag = 2, Dg(h, l));
                  h.expirationTime < c && (h.expirationTime = c);
                  l = h.alternate;
                  null !== l && l.expirationTime < c && (l.expirationTime = c);
                  ug(h.return, c);
                  k.expirationTime < c && (k.expirationTime = c);
                  break;
                }

                l = l.next;
              }
            } else g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;

            if (null !== g) g.return = h;else for (g = h; null !== g;) {
              if (g === b) {
                g = null;
                break;
              }

              h = g.sibling;

              if (null !== h) {
                h.return = g.return;
                g = h;
                break;
              }

              g = g.return;
            }
            h = g;
          }
        }

        R(a, b, e.children, c);
        b = b.child;
      }

      return b;

    case 9:
      return e = b.type, f = b.pendingProps, d = f.children, vg(b, c), e = xg(e, f.unstable_observedBits), d = d(e), b.effectTag |= 1, R(a, b, d, c), b.child;

    case 14:
      return e = b.type, f = mg(e, b.pendingProps), f = mg(e.type, f), pi(a, b, e, f, d, c);

    case 15:
      return ri(a, b, b.type, b.pendingProps, d, c);

    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : mg(d, e), null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), b.tag = 1, L(d) ? (a = !0, Jf(b)) : a = !1, vg(b, c), Ug(b, d, e, c), Wg(b, d, e, c), vi(null, b, d, !0, a, c);

    case 19:
      return Bi(a, b, c);
  }

  throw Error(u(156, b.tag));
};

var kk = null,
    Wi = null;

function ok(a) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
  var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (b.isDisabled || !b.supportsFiber) return !0;

  try {
    var c = b.inject(a);

    kk = function kk(a) {
      try {
        b.onCommitFiberRoot(c, a, void 0, 64 === (a.current.effectTag & 64));
      } catch (e) {}
    };

    Wi = function Wi(a) {
      try {
        b.onCommitFiberUnmount(c, a);
      } catch (e) {}
    };
  } catch (d) {}

  return !0;
}

function pk(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.effectTag = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childExpirationTime = this.expirationTime = 0;
  this.alternate = null;
}

function gi(a, b, c, d) {
  return new pk(a, b, c, d);
}

function qi(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}

function nk(a) {
  if ("function" === typeof a) return qi(a) ? 1 : 0;

  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Oa) return 11;
    if (a === Ra) return 14;
  }

  return 2;
}

function ah(a, b) {
  var c = a.alternate;
  null === c ? (c = gi(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.effectTag = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
  c.childExpirationTime = a.childExpirationTime;
  c.expirationTime = a.expirationTime;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : {
    expirationTime: b.expirationTime,
    firstContext: b.firstContext,
    responders: b.responders
  };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}

function ch(a, b, c, d, e, f) {
  var g = 2;
  d = a;
  if ("function" === typeof a) qi(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
    case Ia:
      return eh(c.children, e, f, b);

    case Na:
      g = 8;
      e |= 7;
      break;

    case Ja:
      g = 8;
      e |= 1;
      break;

    case Ka:
      return a = gi(12, c, b, e | 8), a.elementType = Ka, a.type = Ka, a.expirationTime = f, a;

    case Pa:
      return a = gi(13, c, b, e), a.type = Pa, a.elementType = Pa, a.expirationTime = f, a;

    case Qa:
      return a = gi(19, c, b, e), a.elementType = Qa, a.expirationTime = f, a;

    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case La:
          g = 10;
          break a;

        case Ma:
          g = 9;
          break a;

        case Oa:
          g = 11;
          break a;

        case Ra:
          g = 14;
          break a;

        case Sa:
          g = 16;
          d = null;
          break a;
      }
      throw Error(u(130, null == a ? a : typeof a, ""));
  }
  b = gi(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.expirationTime = f;
  return b;
}

function eh(a, b, c, d) {
  a = gi(7, a, d, b);
  a.expirationTime = c;
  return a;
}

function bh(a, b, c) {
  a = gi(6, a, null, b);
  a.expirationTime = c;
  return a;
}

function dh(a, b, c) {
  b = gi(4, null !== a.children ? a.children : [], a.key, b);
  b.expirationTime = c;
  b.stateNode = {
    containerInfo: a.containerInfo,
    pendingChildren: null,
    implementation: a.implementation
  };
  return b;
}

function qk(a, b, c) {
  this.tag = b;
  this.current = null;
  this.containerInfo = a;
  this.pingCache = this.pendingChildren = null;
  this.finishedExpirationTime = 0;
  this.finishedWork = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = c;
  this.callbackNode = null;
  this.callbackPriority = 90;
  this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0;
}

function Pj(a, b) {
  var c = a.firstSuspendedTime;
  a = a.lastSuspendedTime;
  return 0 !== c && c >= b && a <= b;
}

function Mj(a, b) {
  var c = a.firstSuspendedTime,
      d = a.lastSuspendedTime;
  c < b && (a.firstSuspendedTime = b);
  if (d > b || 0 === c) a.lastSuspendedTime = b;
  b <= a.lastPingedTime && (a.lastPingedTime = 0);
  b <= a.lastExpiredTime && (a.lastExpiredTime = 0);
}

function Nj(a, b) {
  b > a.firstPendingTime && (a.firstPendingTime = b);
  var c = a.firstSuspendedTime;
  0 !== c && (b >= c ? a.firstSuspendedTime = a.lastSuspendedTime = a.nextKnownPendingLevel = 0 : b >= a.lastSuspendedTime && (a.lastSuspendedTime = b + 1), b > a.nextKnownPendingLevel && (a.nextKnownPendingLevel = b));
}

function Rj(a, b) {
  var c = a.lastExpiredTime;
  if (0 === c || c > b) a.lastExpiredTime = b;
}

function rk(a, b, c, d) {
  var e = b.current,
      f = Pg(),
      g = Mg.suspense;
  f = Qg(f, e, g);

  a: if (c) {
    c = c._reactInternalFiber;

    b: {
      if (ec(c) !== c || 1 !== c.tag) throw Error(u(170));
      var h = c;

      do {
        switch (h.tag) {
          case 3:
            h = h.stateNode.context;
            break b;

          case 1:
            if (L(h.type)) {
              h = h.stateNode.__reactInternalMemoizedMergedChildContext;
              break b;
            }

        }

        h = h.return;
      } while (null !== h);

      throw Error(u(171));
    }

    if (1 === c.tag) {
      var k = c.type;

      if (L(k)) {
        c = If(c, k, h);
        break a;
      }
    }

    c = h;
  } else c = Cf;

  null === b.context ? b.context = c : b.pendingContext = c;
  b = Bg(f, g);
  b.payload = {
    element: a
  };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  Dg(e, b);
  Rg(e, f);
  return f;
}

function sk(a) {
  a = a.current;
  if (!a.child) return null;

  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;

    default:
      return a.child.stateNode;
  }
}

function tk(a, b) {
  a = a.memoizedState;
  null !== a && null !== a.dehydrated && a.retryTime < b && (a.retryTime = b);
}

function uk(a, b) {
  tk(a, b);
  (a = a.alternate) && tk(a, b);
}

function vk(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: Ha,
    key: null == d ? null : "" + d,
    children: a,
    containerInfo: b,
    implementation: c
  };
}

jc = function jc(a) {
  if (13 === a.tag) {
    var b = lg(Pg(), 150, 100);
    Rg(a, b);
    uk(a, b);
  }
};

kc = function kc(a) {
  if (13 === a.tag) {
    Pg();
    var b = kg++;
    Rg(a, b);
    uk(a, b);
  }
};

lc = function lc(a) {
  if (13 === a.tag) {
    var b = Pg();
    b = Qg(b, a, null);
    Rg(a, b);
    uk(a, b);
  }
};

Za = function Za(a, b, c) {
  switch (b) {
    case "input":
      Eb(a, c);
      b = c.name;

      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode;) {
          c = c.parentNode;
        }

        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');

        for (b = 0; b < c.length; b++) {
          var d = c[b];

          if (d !== a && d.form === a.form) {
            var e = ye(d);
            if (!e) throw Error(u(90));
            zb(d);
            Eb(d, e);
          }
        }
      }

      break;

    case "textarea":
      Mb(a, c);
      break;

    case "select":
      b = c.value, null != b && Jb(a, !!c.multiple, b, !1);
  }
};

function wk(a, b, c) {
  c = null != c && !0 === c.hydrate;
  var d = new qk(a, b, c),
      e = gi(3, null, null, 2 === b ? 7 : 1 === b ? 3 : 0);
  d.current = e;
  e.stateNode = d;
  a[we] = d.current;
  c && 0 !== b && wc(9 === a.nodeType ? a : a.ownerDocument);
  this._internalRoot = d;
}

wk.prototype.render = function (a, b) {
  var c = this._internalRoot;
  rk(a, c, null, void 0 === b ? null : b);
};

wk.prototype.unmount = function (a) {
  var b = this._internalRoot;
  rk(null, b, null, void 0 === a ? null : a);
};

function yk(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}

eb = bk;

fb = function fb(a, b, c, d) {
  var e = T;
  T |= 4;

  try {
    return fg(98, a.bind(null, b, c, d));
  } finally {
    T = e, T === S && jg();
  }
};

gb = function gb() {
  (T & (1 | oj | pj)) === S && (ak(), Sj());
};

hb = function hb(a, b) {
  var c = T;
  T |= 2;

  try {
    return a(b);
  } finally {
    T = c, T === S && jg();
  }
};

function zk(a, b) {
  b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));
  if (!b) for (var c; c = a.lastChild;) {
    a.removeChild(c);
  }
  return new wk(a, 0, b ? {
    hydrate: !0
  } : void 0);
}

function Ak(a, b, c, d, e) {
  var f = c._reactRootContainer;

  if (f) {
    var g = f._internalRoot;

    if ("function" === typeof e) {
      var h = e;

      e = function e() {
        var a = sk(g);
        h.call(a);
      };
    }

    rk(b, g, a, e);
  } else {
    f = c._reactRootContainer = zk(c, d);
    g = f._internalRoot;

    if ("function" === typeof e) {
      var k = e;

      e = function e() {
        var a = sk(g);
        k.call(a);
      };
    }

    ck(function () {
      rk(b, g, a, e);
    });
  }

  return sk(g);
}

function Bk(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!yk(b)) throw Error(u(200));
  return vk(a, b, null, c);
}

var Ck = {
  createPortal: Bk,
  findDOMNode: function findDOMNode(a) {
    if (null == a) return null;
    if (1 === a.nodeType) return a;
    var b = a._reactInternalFiber;

    if (void 0 === b) {
      if ("function" === typeof a.render) throw Error(u(188));
      throw Error(u(268, Object.keys(a)));
    }

    a = ic(b);
    a = null === a ? null : a.stateNode;
    return a;
  },
  hydrate: function hydrate(a, b, c) {
    if (!yk(b)) throw Error(u(200));
    return Ak(null, a, b, !0, c);
  },
  render: function render(a, b, c) {
    if (!yk(b)) throw Error(u(200));
    return Ak(null, a, b, !1, c);
  },
  unstable_renderSubtreeIntoContainer: function unstable_renderSubtreeIntoContainer(a, b, c, d) {
    if (!yk(c)) throw Error(u(200));
    if (null == a || void 0 === a._reactInternalFiber) throw Error(u(38));
    return Ak(a, b, c, !1, d);
  },
  unmountComponentAtNode: function unmountComponentAtNode(a) {
    if (!yk(a)) throw Error(u(40));
    return a._reactRootContainer ? (ck(function () {
      Ak(null, null, a, !1, function () {
        a._reactRootContainer = null;
      });
    }), !0) : !1;
  },
  unstable_createPortal: function unstable_createPortal() {
    return Bk.apply(void 0, arguments);
  },
  unstable_batchedUpdates: bk,
  flushSync: function flushSync(a, b) {
    if ((T & (oj | pj)) !== S) throw Error(u(187));
    var c = T;
    T |= 1;

    try {
      return fg(99, a.bind(null, b));
    } finally {
      T = c, jg();
    }
  },
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    Events: [Cc, xe, ye, Ca.injectEventPluginsByName, fa, Sc, function (a) {
      ya(a, Rc);
    }, cb, db, Pd, Ba, Sj, {
      current: !1
    }]
  }
};

(function (a) {
  var b = a.findFiberByHostInstance;
  return ok(n({}, a, {
    overrideHookState: null,
    overrideProps: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Ea.ReactCurrentDispatcher,
    findHostInstanceByFiber: function findHostInstanceByFiber(a) {
      a = ic(a);
      return null === a ? null : a.stateNode;
    },
    findFiberByHostInstance: function findFiberByHostInstance(a) {
      return b ? b(a) : null;
    },
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null
  }));
})({
  findFiberByHostInstance: Fc,
  bundleType: 0,
  version: "16.11.0",
  rendererPackageName: "react-dom"
});

var Dk = {
  default: Ck
},
    Ek = Dk && Ck || Dk;
module.exports = Ek.default || Ek;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(20);
} else {}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.17.0
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _f, g, h, k, l;

if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var p = null,
      q = null,
      t = function t() {
    if (null !== p) try {
      var a = exports.unstable_now();
      p(!0, a);
      p = null;
    } catch (b) {
      throw setTimeout(t, 0), b;
    }
  },
      u = Date.now();

  exports.unstable_now = function () {
    return Date.now() - u;
  };

  _f = function f(a) {
    null !== p ? setTimeout(_f, 0, a) : (p = a, setTimeout(t, 0));
  };

  g = function g(a, b) {
    q = setTimeout(a, b);
  };

  h = function h() {
    clearTimeout(q);
  };

  k = function k() {
    return !1;
  };

  l = exports.unstable_forceFrameRate = function () {};
} else {
  var w = window.performance,
      x = window.Date,
      y = window.setTimeout,
      z = window.clearTimeout,
      A = window.requestAnimationFrame,
      B = window.cancelAnimationFrame;
  "undefined" !== typeof console && ("function" !== typeof A && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" !== typeof B && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));
  if ("object" === typeof w && "function" === typeof w.now) exports.unstable_now = function () {
    return w.now();
  };else {
    var C = x.now();

    exports.unstable_now = function () {
      return x.now() - C;
    };
  }
  var D = !1,
      E = null,
      F = -1,
      G = 5,
      H = 0;

  k = function k() {
    return exports.unstable_now() >= H;
  };

  l = function l() {};

  exports.unstable_forceFrameRate = function (a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : G = 0 < a ? Math.floor(1E3 / a) : 33.33;
  };

  var I = new MessageChannel(),
      J = I.port2;

  I.port1.onmessage = function () {
    if (null !== E) {
      var a = exports.unstable_now();
      H = a + G;

      try {
        E(!0, a) ? J.postMessage(null) : (D = !1, E = null);
      } catch (b) {
        throw J.postMessage(null), b;
      }
    } else D = !1;
  };

  _f = function _f(a) {
    E = a;
    D || (D = !0, J.postMessage(null));
  };

  g = function g(a, b) {
    F = y(function () {
      a(exports.unstable_now());
    }, b);
  };

  h = function h() {
    z(F);
    F = -1;
  };
}

function K(a, b) {
  var c = a.length;
  a.push(b);

  a: for (;;) {
    var d = Math.floor((c - 1) / 2),
        e = a[d];
    if (void 0 !== e && 0 < L(e, b)) a[d] = b, a[c] = e, c = d;else break a;
  }
}

function M(a) {
  a = a[0];
  return void 0 === a ? null : a;
}

function N(a) {
  var b = a[0];

  if (void 0 !== b) {
    var c = a.pop();

    if (c !== b) {
      a[0] = c;

      a: for (var d = 0, e = a.length; d < e;) {
        var m = 2 * (d + 1) - 1,
            n = a[m],
            v = m + 1,
            r = a[v];
        if (void 0 !== n && 0 > L(n, c)) void 0 !== r && 0 > L(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);else if (void 0 !== r && 0 > L(r, c)) a[d] = r, a[v] = c, d = v;else break a;
      }
    }

    return b;
  }

  return null;
}

function L(a, b) {
  var c = a.sortIndex - b.sortIndex;
  return 0 !== c ? c : a.id - b.id;
}

var O = [],
    P = [],
    Q = 1,
    R = null,
    S = 3,
    T = !1,
    U = !1,
    V = !1;

function W(a) {
  for (var b = M(P); null !== b;) {
    if (null === b.callback) N(P);else if (b.startTime <= a) N(P), b.sortIndex = b.expirationTime, K(O, b);else break;
    b = M(P);
  }
}

function X(a) {
  V = !1;
  W(a);
  if (!U) if (null !== M(O)) U = !0, _f(Y);else {
    var b = M(P);
    null !== b && g(X, b.startTime - a);
  }
}

function Y(a, b) {
  U = !1;
  V && (V = !1, h());
  T = !0;
  var c = S;

  try {
    W(b);

    for (R = M(O); null !== R && (!(R.expirationTime > b) || a && !k());) {
      var d = R.callback;

      if (null !== d) {
        R.callback = null;
        S = R.priorityLevel;
        var e = d(R.expirationTime <= b);
        b = exports.unstable_now();
        "function" === typeof e ? R.callback = e : R === M(O) && N(O);
        W(b);
      } else N(O);

      R = M(O);
    }

    if (null !== R) var m = !0;else {
      var n = M(P);
      null !== n && g(X, n.startTime - b);
      m = !1;
    }
    return m;
  } finally {
    R = null, S = c, T = !1;
  }
}

function Z(a) {
  switch (a) {
    case 1:
      return -1;

    case 2:
      return 250;

    case 5:
      return 1073741823;

    case 4:
      return 1E4;

    default:
      return 5E3;
  }
}

var aa = l;
exports.unstable_ImmediatePriority = 1;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_NormalPriority = 3;
exports.unstable_IdlePriority = 5;
exports.unstable_LowPriority = 4;

exports.unstable_runWithPriority = function (a, b) {
  switch (a) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;

    default:
      a = 3;
  }

  var c = S;
  S = a;

  try {
    return b();
  } finally {
    S = c;
  }
};

exports.unstable_next = function (a) {
  switch (S) {
    case 1:
    case 2:
    case 3:
      var b = 3;
      break;

    default:
      b = S;
  }

  var c = S;
  S = b;

  try {
    return a();
  } finally {
    S = c;
  }
};

exports.unstable_scheduleCallback = function (a, b, c) {
  var d = exports.unstable_now();

  if ("object" === typeof c && null !== c) {
    var e = c.delay;
    e = "number" === typeof e && 0 < e ? d + e : d;
    c = "number" === typeof c.timeout ? c.timeout : Z(a);
  } else c = Z(a), e = d;

  c = e + c;
  a = {
    id: Q++,
    callback: b,
    priorityLevel: a,
    startTime: e,
    expirationTime: c,
    sortIndex: -1
  };
  e > d ? (a.sortIndex = e, K(P, a), null === M(O) && a === M(P) && (V ? h() : V = !0, g(X, e - d))) : (a.sortIndex = c, K(O, a), U || T || (U = !0, _f(Y)));
  return a;
};

exports.unstable_cancelCallback = function (a) {
  a.callback = null;
};

exports.unstable_wrapCallback = function (a) {
  var b = S;
  return function () {
    var c = S;
    S = b;

    try {
      return a.apply(this, arguments);
    } finally {
      S = c;
    }
  };
};

exports.unstable_getCurrentPriorityLevel = function () {
  return S;
};

exports.unstable_shouldYield = function () {
  var a = exports.unstable_now();
  W(a);
  var b = M(O);
  return b !== R && null !== R && null !== b && null !== b.callback && b.startTime <= a && b.expirationTime < R.expirationTime || k();
};

exports.unstable_requestPaint = aa;

exports.unstable_continueExecution = function () {
  U || T || (U = !0, _f(Y));
};

exports.unstable_pauseExecution = function () {};

exports.unstable_getFirstCallbackNode = function () {
  return M(O);
};

exports.unstable_Profiling = null;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(3);

var _createClass = __webpack_require__(4);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Network = /*#__PURE__*/function () {
  function Network(layers) {
    _classCallCheck(this, Network);

    this.learningTimeStep = 0;

    if (layers.length !== 3) {
      throw new Error('Having more or less than 1 hidden layer is not yet supported.');
    }

    this.inputLayer = layers[0];
    this.hiddenLayer = layers[1];
    this.hiddenLayer.setInputLayer(this.inputLayer);
    this.outputLayer = layers[2];
    this.outputLayer.setInputLayer(this.hiddenLayer);
    this.hiddenLayer.setOutputLayer(this.outputLayer);
  }

  _createClass(Network, [{
    key: "invoke",
    value: function invoke(inputs) {
      // for (let i = 0, len = inputs.length; i < len; i++) {
      //     if (!isFinite(inputs[i])) {
      //         throw new Error('Neural network input is not a finite number.');
      //     }
      // }
      this.inputLayer.feedForward(inputs);
      this.hiddenLayer.feedForward();
      var outputs = this.outputLayer.feedForward(); //@TODO disable or put in debug mode

      for (var i = 0, len = outputs.length; i < len; i++) {
        if (!isFinite(outputs[i])) {
          throw new Error('Neural network output is not a finite number.');
        }
      }

      return outputs;
    }
  }, {
    key: "learn",
    value: function learn(targetOutputs) {
      this.learningTimeStep++;
      this.outputLayer.backPropagateCalculateErrorGradient(targetOutputs);
      this.hiddenLayer.backPropagateCalculateErrorGradient();
      this.outputLayer.backPropagateOptimize(this.learningTimeStep);
      this.hiddenLayer.backPropagateOptimize(this.learningTimeStep);
    }
  }, {
    key: "loadFromJson",
    value: function loadFromJson(json) {
      var weights = json.layers[1].weights;

      for (var i = 0; i < weights.length; i++) {
        //@TODO do this inside the layers
        this.hiddenLayer.weights[i] = weights[i];
      }

      weights = json.layers[2].weights;

      for (var _i = 0; _i < weights.length; _i++) {
        //@TODO do this inside the layers
        this.outputLayer.weights[_i] = weights[_i];
      }
    }
  }, {
    key: "saveToJson",
    value: function saveToJson() {
      return {
        layers: [{}, {
          weights: Array.from(this.hiddenLayer.weights)
        }, {
          weights: Array.from(this.outputLayer.weights)
        } //@TODO do this inside the layers
        ]
      }; //@TODO do this inside the layers
    }
  }]);

  return Network;
}();

exports.default = Network;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(3);

var _createClass = __webpack_require__(4);

var _inherits = __webpack_require__(23);

var _createSuper = __webpack_require__(25);

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var OutputLayer_1 = __importDefault(__webpack_require__(13));

var HiddenLayer = /*#__PURE__*/function (_OutputLayer_1$defaul) {
  _inherits(HiddenLayer, _OutputLayer_1$defaul);

  var _super = _createSuper(HiddenLayer);

  function HiddenLayer() {
    _classCallCheck(this, HiddenLayer);

    return _super.apply(this, arguments);
  }

  _createClass(HiddenLayer, [{
    key: "setOutputLayer",
    value: function setOutputLayer(outputLayer) {
      this.outputLayer = outputLayer;
    }
  }, {
    key: "backPropagateCalculateErrorGradient",
    value: function backPropagateCalculateErrorGradient() {
      //Defining these locally speeds up the loop below by reducing object property access
      var nodeCount = this.nodeCount;
      var errorGradients = this.errorGradients;
      var outputs = this.outputs;
      var activationFunctionDerivative = this.activationFunctionDerivative;
      var outputLayerNodeCount = this.outputLayer.nodeCount;
      var outputLayerWeights = this.outputLayer.weights;
      var outputLayerInputNodeCount = this.outputLayer.inputNodeCount;
      var outputLayerErrorGradients = this.outputLayer.errorGradients;
      var inputs = this.inputs;
      var inputCount = this.inputCount;
      var inputNodeCount = this.inputNodeCount;
      var weightErrorGradients = this.weightErrorGradients; // Defining these here ideally speeds up the loop below

      var inputI;
      var errorWithRespectToOutput;
      var activationErrorGradient;
      var outputI;

      for (var neuronI = 0; neuronI < nodeCount; neuronI++) {
        errorWithRespectToOutput = 0;

        for (outputI = 0; outputI < outputLayerNodeCount; outputI++) {
          errorWithRespectToOutput += outputLayerErrorGradients[outputI] * outputLayerWeights[outputI * outputLayerInputNodeCount + neuronI];
        }

        activationErrorGradient = errorWithRespectToOutput * activationFunctionDerivative(outputs[neuronI]);
        errorGradients[neuronI] = activationErrorGradient;

        for (inputI = 0; inputI < inputCount; inputI++) {
          weightErrorGradients[neuronI * inputNodeCount + inputI] = inputs[inputI] * activationErrorGradient;
        }

        weightErrorGradients[neuronI * inputNodeCount + inputCount] = activationErrorGradient; //Bias node
      }
    }
  }]);

  return HiddenLayer;
}(OutputLayer_1.default);

exports.default = HiddenLayer;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(24);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(26);

var isNativeReflectConstruct = __webpack_require__(27);

var possibleConstructorReturn = __webpack_require__(28);

function _createSuper(Derived) {
  var hasNativeReflectConstruct = isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return possibleConstructorReturn(this, result);
  };
}

module.exports = _createSuper;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(29);

var assertThisInitialized = __webpack_require__(30);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(3);

var _createClass = __webpack_require__(4);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var InputLayer = /*#__PURE__*/function () {
  function InputLayer(nodeCount) {
    _classCallCheck(this, InputLayer);

    this.nodeCount = nodeCount;
    this.outputs = new Float64Array(nodeCount); //@TODO new array not really used?
  }

  _createClass(InputLayer, [{
    key: "feedForward",
    value: function feedForward(inputs) {
      this.outputs = inputs;
    }
  }]);

  return InputLayer;
}();

exports.default = InputLayer;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(3);

var _createClass = __webpack_require__(4);

Object.defineProperty(exports, "__esModule", {
  value: true
});
var slopeBelowZero = 0.01;

var LeakyRelu = /*#__PURE__*/function () {
  function LeakyRelu() {
    _classCallCheck(this, LeakyRelu);
  }

  _createClass(LeakyRelu, [{
    key: "xToY",
    value: function xToY(x) {
      if (x > 0) {
        return x;
      } else {
        return slopeBelowZero * x;
      }
    }
  }, {
    key: "yToSlope",
    value: function yToSlope(y) {
      if (y > 0) {
        return 1;
      } else {
        return slopeBelowZero;
      }
    }
  }]);

  return LeakyRelu;
}();

exports.default = LeakyRelu;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(3);

var _createClass = __webpack_require__(4);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Linear = /*#__PURE__*/function () {
  function Linear() {
    _classCallCheck(this, Linear);
  }

  _createClass(Linear, [{
    key: "xToY",
    value: function xToY(x) {
      return x;
    }
  }, {
    key: "yToSlope",
    value: function yToSlope() {
      return 1;
    }
  }]);

  return Linear;
}();

exports.default = Linear;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(3);

var _createClass = __webpack_require__(4);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LogisticSigmoid = /*#__PURE__*/function () {
  function LogisticSigmoid() {
    _classCallCheck(this, LogisticSigmoid);
  }

  _createClass(LogisticSigmoid, [{
    key: "xToY",
    value: function xToY(x) {
      return 1 / (1 + Math.exp(-x));
    }
  }, {
    key: "yToSlope",
    value: function yToSlope(y) {
      return y * (1 - y);
    }
  }]);

  return LogisticSigmoid;
}();

exports.default = LogisticSigmoid;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(3);

var _createClass = __webpack_require__(4);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Tanh = /*#__PURE__*/function () {
  function Tanh() {
    _classCallCheck(this, Tanh);
  }

  _createClass(Tanh, [{
    key: "xToY",
    value: function xToY(x) {
      return Math.tanh(x);
    }
  }, {
    key: "yToSlope",
    value: function yToSlope(y) {
      return 1 - y * y;
    }
  }]);

  return Tanh;
}();

exports.default = Tanh;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(3);

var _createClass = __webpack_require__(4);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AdamOptimizer = /*#__PURE__*/function () {
  function AdamOptimizer() {
    _classCallCheck(this, AdamOptimizer);

    this.optimizeWeights = this.optimizeWeights.bind(this);
    this._m = new Float64Array(0); //@TODO avoid unneeded array?

    this._v = new Float64Array(0); //@TODO avoid unneeded array?
  }

  _createClass(AdamOptimizer, [{
    key: "init",
    value: function init(weightCount) {
      this._m = new Float64Array(weightCount);
      this._v = new Float64Array(weightCount);
    }
  }, {
    key: "optimizeWeights",
    value: function optimizeWeights(weights, weightErrorGradients, learningTimeStep) {
      //@TODO allow these to be passed into the constructor
      var learningRate = 0.001;
      var beta1 = 0.9;
      var beta2 = 0.999;
      var eps = 0.00000001; //Defining these locally speeds up the loop below by reducing object property access

      var m = this._m;
      var v = this._v;
      var oneMinusBeta1 = 1 - beta1;
      var oneMinusBeta2 = 1 - beta2;
      var mtDivisor = 1 - Math.pow(beta1, learningTimeStep);
      var vtDivisor = 1 - Math.pow(beta2, learningTimeStep);
      var gradient;

      for (var i = 0, len = weights.length; i < len; i++) {
        gradient = weightErrorGradients[i];
        m[i] = beta1 * m[i] + oneMinusBeta1 * gradient;
        v[i] = beta2 * v[i] + oneMinusBeta2 * gradient * gradient;
        weights[i] += -learningRate * m[i] / mtDivisor / (Math.sqrt(v[i] / vtDivisor) + eps);
      }
    }
  }]);

  return AdamOptimizer;
}();

exports.default = AdamOptimizer;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(3);

var _createClass = __webpack_require__(4);

Object.defineProperty(exports, "__esModule", {
  value: true
}); //@TODO have a default learning rate

var GradientDescentOptimizer = /*#__PURE__*/function () {
  function GradientDescentOptimizer(learningRate) {
    _classCallCheck(this, GradientDescentOptimizer);

    this.learningRate = learningRate;
    this.optimizeWeights = this.optimizeWeights.bind(this);
  }

  _createClass(GradientDescentOptimizer, [{
    key: "init",
    value: function init() {//Do nothing. We don't use weight count in this optimizer.
    }
  }, {
    key: "optimizeWeights",
    value: function optimizeWeights(weights, weightErrorGradients) {
      //Defining locally speeds up the loop below by reducing object property access
      var learningRate = this.learningRate;

      for (var i = 0, len = weights.length; i < len; i++) {
        weights[i] -= learningRate * weightErrorGradients[i];
      }
    }
  }]);

  return GradientDescentOptimizer;
}();

exports.default = GradientDescentOptimizer;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function arrayShuffle(array) {
  var counter = array.length; // While there are elements in the array

  while (counter > 0) {
    // Pick a random index
    var index = Math.floor(Math.random() * counter); // Decrease counter by 1

    counter--; // And swap the last element with it

    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

exports.default = arrayShuffle;

/***/ }),
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var require;//! moment.js
;

(function (global, factory) {
   true ? module.exports = factory() : undefined;
})(this, function () {
  'use strict';

  var hookCallback;

  function hooks() {
    return hookCallback.apply(null, arguments);
  } // This is done to register the method called with moment()
  // without creating circular dependencies.


  function setHookCallback(callback) {
    hookCallback = callback;
  }

  function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
  }

  function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
  }

  function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
      return Object.getOwnPropertyNames(obj).length === 0;
    } else {
      var k;

      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          return false;
        }
      }

      return true;
    }
  }

  function isUndefined(input) {
    return input === void 0;
  }

  function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
  }

  function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
  }

  function map(arr, fn) {
    var res = [],
        i;

    for (i = 0; i < arr.length; ++i) {
      res.push(fn(arr[i], i));
    }

    return res;
  }

  function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }

  function extend(a, b) {
    for (var i in b) {
      if (hasOwnProp(b, i)) {
        a[i] = b[i];
      }
    }

    if (hasOwnProp(b, 'toString')) {
      a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
      a.valueOf = b.valueOf;
    }

    return a;
  }

  function createUTC(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
  }

  function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
      empty: false,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: false,
      invalidMonth: null,
      invalidFormat: false,
      userInvalidated: false,
      iso: false,
      parsedDateParts: [],
      meridiem: null,
      rfc2822: false,
      weekdayMismatch: false
    };
  }

  function getParsingFlags(m) {
    if (m._pf == null) {
      m._pf = defaultParsingFlags();
    }

    return m._pf;
  }

  var some;

  if (Array.prototype.some) {
    some = Array.prototype.some;
  } else {
    some = function some(fun) {
      var t = Object(this);
      var len = t.length >>> 0;

      for (var i = 0; i < len; i++) {
        if (i in t && fun.call(this, t[i], i, t)) {
          return true;
        }
      }

      return false;
    };
  }

  function isValid(m) {
    if (m._isValid == null) {
      var flags = getParsingFlags(m);
      var parsedParts = some.call(flags.parsedDateParts, function (i) {
        return i != null;
      });
      var isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);

      if (m._strict) {
        isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
      }

      if (Object.isFrozen == null || !Object.isFrozen(m)) {
        m._isValid = isNowValid;
      } else {
        return isNowValid;
      }
    }

    return m._isValid;
  }

  function createInvalid(flags) {
    var m = createUTC(NaN);

    if (flags != null) {
      extend(getParsingFlags(m), flags);
    } else {
      getParsingFlags(m).userInvalidated = true;
    }

    return m;
  } // Plugins that add properties should also add the key here (null value),
  // so we can properly clone ourselves.


  var momentProperties = hooks.momentProperties = [];

  function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
      to._isAMomentObject = from._isAMomentObject;
    }

    if (!isUndefined(from._i)) {
      to._i = from._i;
    }

    if (!isUndefined(from._f)) {
      to._f = from._f;
    }

    if (!isUndefined(from._l)) {
      to._l = from._l;
    }

    if (!isUndefined(from._strict)) {
      to._strict = from._strict;
    }

    if (!isUndefined(from._tzm)) {
      to._tzm = from._tzm;
    }

    if (!isUndefined(from._isUTC)) {
      to._isUTC = from._isUTC;
    }

    if (!isUndefined(from._offset)) {
      to._offset = from._offset;
    }

    if (!isUndefined(from._pf)) {
      to._pf = getParsingFlags(from);
    }

    if (!isUndefined(from._locale)) {
      to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
      for (i = 0; i < momentProperties.length; i++) {
        prop = momentProperties[i];
        val = from[prop];

        if (!isUndefined(val)) {
          to[prop] = val;
        }
      }
    }

    return to;
  }

  var updateInProgress = false; // Moment prototype object

  function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);

    if (!this.isValid()) {
      this._d = new Date(NaN);
    } // Prevent infinite loop in case updateOffset creates new moment
    // objects.


    if (updateInProgress === false) {
      updateInProgress = true;
      hooks.updateOffset(this);
      updateInProgress = false;
    }
  }

  function isMoment(obj) {
    return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
  }

  function absFloor(number) {
    if (number < 0) {
      // -0 -> 0
      return Math.ceil(number) || 0;
    } else {
      return Math.floor(number);
    }
  }

  function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      value = absFloor(coercedNumber);
    }

    return value;
  } // compare two arrays, return the number of differences


  function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;

    for (i = 0; i < len; i++) {
      if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
        diffs++;
      }
    }

    return diffs + lengthDiff;
  }

  function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
      console.warn('Deprecation warning: ' + msg);
    }
  }

  function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function () {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(null, msg);
      }

      if (firstTime) {
        var args = [];
        var arg;

        for (var i = 0; i < arguments.length; i++) {
          arg = '';

          if (typeof arguments[i] === 'object') {
            arg += '\n[' + i + '] ';

            for (var key in arguments[0]) {
              arg += key + ': ' + arguments[0][key] + ', ';
            }

            arg = arg.slice(0, -2); // Remove trailing comma and space
          } else {
            arg = arguments[i];
          }

          args.push(arg);
        }

        warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
        firstTime = false;
      }

      return fn.apply(this, arguments);
    }, fn);
  }

  var deprecations = {};

  function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(name, msg);
    }

    if (!deprecations[name]) {
      warn(msg);
      deprecations[name] = true;
    }
  }

  hooks.suppressDeprecationWarnings = false;
  hooks.deprecationHandler = null;

  function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
  }

  function set(config) {
    var prop, i;

    for (i in config) {
      prop = config[i];

      if (isFunction(prop)) {
        this[i] = prop;
      } else {
        this['_' + i] = prop;
      }
    }

    this._config = config; // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.

    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
  }

  function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig),
        prop;

    for (prop in childConfig) {
      if (hasOwnProp(childConfig, prop)) {
        if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
          res[prop] = {};
          extend(res[prop], parentConfig[prop]);
          extend(res[prop], childConfig[prop]);
        } else if (childConfig[prop] != null) {
          res[prop] = childConfig[prop];
        } else {
          delete res[prop];
        }
      }
    }

    for (prop in parentConfig) {
      if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
        // make sure changes to properties don't modify parent config
        res[prop] = extend({}, res[prop]);
      }
    }

    return res;
  }

  function Locale(config) {
    if (config != null) {
      this.set(config);
    }
  }

  var keys;

  if (Object.keys) {
    keys = Object.keys;
  } else {
    keys = function keys(obj) {
      var i,
          res = [];

      for (i in obj) {
        if (hasOwnProp(obj, i)) {
          res.push(i);
        }
      }

      return res;
    };
  }

  var defaultCalendar = {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L'
  };

  function calendar(key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
  }

  var defaultLongDateFormat = {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A'
  };

  function longDateFormat(key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
      return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
      return val.slice(1);
    });
    return this._longDateFormat[key];
  }

  var defaultInvalidDate = 'Invalid date';

  function invalidDate() {
    return this._invalidDate;
  }

  var defaultOrdinal = '%d';
  var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

  function ordinal(number) {
    return this._ordinal.replace('%d', number);
  }

  var defaultRelativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  };

  function relativeTime(number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
  }

  function pastFuture(diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  }

  var aliases = {};

  function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
  }

  function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
  }

  function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
      if (hasOwnProp(inputObject, prop)) {
        normalizedProp = normalizeUnits(prop);

        if (normalizedProp) {
          normalizedInput[normalizedProp] = inputObject[prop];
        }
      }
    }

    return normalizedInput;
  }

  var priorities = {};

  function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
  }

  function getPrioritizedUnits(unitsObj) {
    var units = [];

    for (var u in unitsObj) {
      units.push({
        unit: u,
        priority: priorities[u]
      });
    }

    units.sort(function (a, b) {
      return a.priority - b.priority;
    });
    return units;
  }

  function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
  }

  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
  var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
  var formatFunctions = {};
  var formatTokenFunctions = {}; // token:    'M'
  // padded:   ['MM', 2]
  // ordinal:  'Mo'
  // callback: function () { this.month() + 1 }

  function addFormatToken(token, padded, ordinal, callback) {
    var func = callback;

    if (typeof callback === 'string') {
      func = function func() {
        return this[callback]();
      };
    }

    if (token) {
      formatTokenFunctions[token] = func;
    }

    if (padded) {
      formatTokenFunctions[padded[0]] = function () {
        return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
      };
    }

    if (ordinal) {
      formatTokenFunctions[ordinal] = function () {
        return this.localeData().ordinal(func.apply(this, arguments), token);
      };
    }
  }

  function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|\]$/g, '');
    }

    return input.replace(/\\/g, '');
  }

  function makeFormatFunction(format) {
    var array = format.match(formattingTokens),
        i,
        length;

    for (i = 0, length = array.length; i < length; i++) {
      if (formatTokenFunctions[array[i]]) {
        array[i] = formatTokenFunctions[array[i]];
      } else {
        array[i] = removeFormattingTokens(array[i]);
      }
    }

    return function (mom) {
      var output = '',
          i;

      for (i = 0; i < length; i++) {
        output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
      }

      return output;
    };
  } // format date using native date object


  function formatMoment(m, format) {
    if (!m.isValid()) {
      return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
    return formatFunctions[format](m);
  }

  function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
      return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;

    while (i >= 0 && localFormattingTokens.test(format)) {
      format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
      localFormattingTokens.lastIndex = 0;
      i -= 1;
    }

    return format;
  }

  var match1 = /\d/; //       0 - 9

  var match2 = /\d\d/; //      00 - 99

  var match3 = /\d{3}/; //     000 - 999

  var match4 = /\d{4}/; //    0000 - 9999

  var match6 = /[+-]?\d{6}/; // -999999 - 999999

  var match1to2 = /\d\d?/; //       0 - 99

  var match3to4 = /\d\d\d\d?/; //     999 - 9999

  var match5to6 = /\d\d\d\d\d\d?/; //   99999 - 999999

  var match1to3 = /\d{1,3}/; //       0 - 999

  var match1to4 = /\d{1,4}/; //       0 - 9999

  var match1to6 = /[+-]?\d{1,6}/; // -999999 - 999999

  var matchUnsigned = /\d+/; //       0 - inf

  var matchSigned = /[+-]?\d+/; //    -inf - inf

  var matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z

  var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

  var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
  // any word (or two) characters or numbers including two/three word month in arabic.
  // includes scottish gaelic two word and hyphenated months

  var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
  var regexes = {};

  function addRegexToken(token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
      return isStrict && strictRegex ? strictRegex : regex;
    };
  }

  function getParseRegexForToken(token, config) {
    if (!hasOwnProp(regexes, token)) {
      return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
  } // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript


  function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
      return p1 || p2 || p3 || p4;
    }));
  }

  function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  var tokens = {};

  function addParseToken(token, callback) {
    var i,
        func = callback;

    if (typeof token === 'string') {
      token = [token];
    }

    if (isNumber(callback)) {
      func = function func(input, array) {
        array[callback] = toInt(input);
      };
    }

    for (i = 0; i < token.length; i++) {
      tokens[token[i]] = func;
    }
  }

  function addWeekParseToken(token, callback) {
    addParseToken(token, function (input, array, config, token) {
      config._w = config._w || {};
      callback(input, config._w, config, token);
    });
  }

  function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
      tokens[token](input, config._a, config, token);
    }
  }

  var YEAR = 0;
  var MONTH = 1;
  var DATE = 2;
  var HOUR = 3;
  var MINUTE = 4;
  var SECOND = 5;
  var MILLISECOND = 6;
  var WEEK = 7;
  var WEEKDAY = 8; // FORMATTING

  addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
  });
  addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
  });
  addFormatToken(0, ['YYYY', 4], 0, 'year');
  addFormatToken(0, ['YYYYY', 5], 0, 'year');
  addFormatToken(0, ['YYYYYY', 6, true], 0, 'year'); // ALIASES

  addUnitAlias('year', 'y'); // PRIORITIES

  addUnitPriority('year', 1); // PARSING

  addRegexToken('Y', matchSigned);
  addRegexToken('YY', match1to2, match2);
  addRegexToken('YYYY', match1to4, match4);
  addRegexToken('YYYYY', match1to6, match6);
  addRegexToken('YYYYYY', match1to6, match6);
  addParseToken(['YYYYY', 'YYYYYY'], YEAR);
  addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
  });
  addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
  });
  addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
  }); // HELPERS

  function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
  }

  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  } // HOOKS


  hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
  }; // MOMENTS


  var getSetYear = makeGetSet('FullYear', true);

  function getIsLeapYear() {
    return isLeapYear(this.year());
  }

  function makeGetSet(unit, keepTime) {
    return function (value) {
      if (value != null) {
        set$1(this, unit, value);
        hooks.updateOffset(this, keepTime);
        return this;
      } else {
        return get(this, unit);
      }
    };
  }

  function get(mom, unit) {
    return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
  }

  function set$1(mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
      if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
      } else {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
      }
    }
  } // MOMENTS


  function stringGet(units) {
    units = normalizeUnits(units);

    if (isFunction(this[units])) {
      return this[units]();
    }

    return this;
  }

  function stringSet(units, value) {
    if (typeof units === 'object') {
      units = normalizeObjectUnits(units);
      var prioritized = getPrioritizedUnits(units);

      for (var i = 0; i < prioritized.length; i++) {
        this[prioritized[i].unit](units[prioritized[i].unit]);
      }
    } else {
      units = normalizeUnits(units);

      if (isFunction(this[units])) {
        return this[units](value);
      }
    }

    return this;
  }

  function mod(n, x) {
    return (n % x + x) % x;
  }

  var indexOf;

  if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function indexOf(o) {
      // I know
      var i;

      for (i = 0; i < this.length; ++i) {
        if (this[i] === o) {
          return i;
        }
      }

      return -1;
    };
  }

  function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
      return NaN;
    }

    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
  } // FORMATTING


  addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
  });
  addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
  });
  addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
  }); // ALIASES

  addUnitAlias('month', 'M'); // PRIORITY

  addUnitPriority('month', 8); // PARSING

  addRegexToken('M', match1to2);
  addRegexToken('MM', match1to2, match2);
  addRegexToken('MMM', function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
  });
  addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
  });
  addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
  });
  addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict); // if we didn't find a month name, mark the date as invalid.


    if (month != null) {
      array[MONTH] = month;
    } else {
      getParsingFlags(config).invalidMonth = input;
    }
  }); // LOCALES

  var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
  var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');

  function localeMonths(m, format) {
    if (!m) {
      return isArray(this._months) ? this._months : this._months['standalone'];
    }

    return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
  }

  var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');

  function localeMonthsShort(m, format) {
    if (!m) {
      return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
    }

    return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
  }

  function handleStrictParse(monthName, format, strict) {
    var i,
        ii,
        mom,
        llc = monthName.toLocaleLowerCase();

    if (!this._monthsParse) {
      // this is not used
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];

      for (i = 0; i < 12; ++i) {
        mom = createUTC([2000, i]);
        this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
        this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
      }
    }

    if (strict) {
      if (format === 'MMM') {
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'MMM') {
        ii = indexOf.call(this._shortMonthsParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }

  function localeMonthsParse(monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
      return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
    } // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse


    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, i]);

      if (strict && !this._longMonthsParse[i]) {
        this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
        this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
      }

      if (!strict && !this._monthsParse[i]) {
        regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
        this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
      } // test the regex


      if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
        return i;
      } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
        return i;
      } else if (!strict && this._monthsParse[i].test(monthName)) {
        return i;
      }
    }
  } // MOMENTS


  function setMonth(mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
      // No op
      return mom;
    }

    if (typeof value === 'string') {
      if (/^\d+$/.test(value)) {
        value = toInt(value);
      } else {
        value = mom.localeData().monthsParse(value); // TODO: Another silent failure?

        if (!isNumber(value)) {
          return mom;
        }
      }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));

    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);

    return mom;
  }

  function getSetMonth(value) {
    if (value != null) {
      setMonth(this, value);
      hooks.updateOffset(this, true);
      return this;
    } else {
      return get(this, 'Month');
    }
  }

  function getDaysInMonth() {
    return daysInMonth(this.year(), this.month());
  }

  var defaultMonthsShortRegex = matchWord;

  function monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        computeMonthsParse.call(this);
      }

      if (isStrict) {
        return this._monthsShortStrictRegex;
      } else {
        return this._monthsShortRegex;
      }
    } else {
      if (!hasOwnProp(this, '_monthsShortRegex')) {
        this._monthsShortRegex = defaultMonthsShortRegex;
      }

      return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
    }
  }

  var defaultMonthsRegex = matchWord;

  function monthsRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        computeMonthsParse.call(this);
      }

      if (isStrict) {
        return this._monthsStrictRegex;
      } else {
        return this._monthsRegex;
      }
    } else {
      if (!hasOwnProp(this, '_monthsRegex')) {
        this._monthsRegex = defaultMonthsRegex;
      }

      return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
    }
  }

  function computeMonthsParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }

    var shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom;

    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, i]);
      shortPieces.push(this.monthsShort(mom, ''));
      longPieces.push(this.months(mom, ''));
      mixedPieces.push(this.months(mom, ''));
      mixedPieces.push(this.monthsShort(mom, ''));
    } // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.


    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);

    for (i = 0; i < 12; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
    }

    for (i = 0; i < 24; i++) {
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
  }

  function createDate(y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date; // the date constructor remaps years 0-99 to 1900-1999

    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      date = new Date(y + 400, m, d, h, M, s, ms);

      if (isFinite(date.getFullYear())) {
        date.setFullYear(y);
      }
    } else {
      date = new Date(y, m, d, h, M, s, ms);
    }

    return date;
  }

  function createUTCDate(y) {
    var date; // the Date.UTC function remaps years 0-99 to 1900-1999

    if (y < 100 && y >= 0) {
      var args = Array.prototype.slice.call(arguments); // preserve leap years using a full 400 year cycle, then reset

      args[0] = y + 400;
      date = new Date(Date.UTC.apply(null, args));

      if (isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
      }
    } else {
      date = new Date(Date.UTC.apply(null, arguments));
    }

    return date;
  } // start-of-first-week - start-of-year


  function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
    fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
    return -fwdlw + fwd - 1;
  } // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday


  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear,
        resDayOfYear;

    if (dayOfYear <= 0) {
      resYear = year - 1;
      resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
      resYear = year + 1;
      resDayOfYear = dayOfYear - daysInYear(year);
    } else {
      resYear = year;
      resDayOfYear = dayOfYear;
    }

    return {
      year: resYear,
      dayOfYear: resDayOfYear
    };
  }

  function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek,
        resYear;

    if (week < 1) {
      resYear = mom.year() - 1;
      resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
      resWeek = week - weeksInYear(mom.year(), dow, doy);
      resYear = mom.year() + 1;
    } else {
      resYear = mom.year();
      resWeek = week;
    }

    return {
      week: resWeek,
      year: resYear
    };
  }

  function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
  } // FORMATTING


  addFormatToken('w', ['ww', 2], 'wo', 'week');
  addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek'); // ALIASES

  addUnitAlias('week', 'w');
  addUnitAlias('isoWeek', 'W'); // PRIORITIES

  addUnitPriority('week', 5);
  addUnitPriority('isoWeek', 5); // PARSING

  addRegexToken('w', match1to2);
  addRegexToken('ww', match1to2, match2);
  addRegexToken('W', match1to2);
  addRegexToken('WW', match1to2, match2);
  addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
  }); // HELPERS
  // LOCALES

  function localeWeek(mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
  }

  var defaultLocaleWeek = {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6 // The week that contains Jan 6th is the first week of the year.

  };

  function localeFirstDayOfWeek() {
    return this._week.dow;
  }

  function localeFirstDayOfYear() {
    return this._week.doy;
  } // MOMENTS


  function getSetWeek(input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
  }

  function getSetISOWeek(input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
  } // FORMATTING


  addFormatToken('d', 0, 'do', 'day');
  addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
  });
  addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
  });
  addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
  });
  addFormatToken('e', 0, 0, 'weekday');
  addFormatToken('E', 0, 0, 'isoWeekday'); // ALIASES

  addUnitAlias('day', 'd');
  addUnitAlias('weekday', 'e');
  addUnitAlias('isoWeekday', 'E'); // PRIORITY

  addUnitPriority('day', 11);
  addUnitPriority('weekday', 11);
  addUnitPriority('isoWeekday', 11); // PARSING

  addRegexToken('d', match1to2);
  addRegexToken('e', match1to2);
  addRegexToken('E', match1to2);
  addRegexToken('dd', function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
  });
  addRegexToken('ddd', function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
  });
  addRegexToken('dddd', function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
  });
  addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict); // if we didn't get a weekday name, mark the date as invalid


    if (weekday != null) {
      week.d = weekday;
    } else {
      getParsingFlags(config).invalidWeekday = input;
    }
  });
  addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
  }); // HELPERS

  function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
      return input;
    }

    if (!isNaN(input)) {
      return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);

    if (typeof input === 'number') {
      return input;
    }

    return null;
  }

  function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
      return locale.weekdaysParse(input) % 7 || 7;
    }

    return isNaN(input) ? null : input;
  } // LOCALES


  function shiftWeekdays(ws, n) {
    return ws.slice(n, 7).concat(ws.slice(0, n));
  }

  var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');

  function localeWeekdays(m, format) {
    var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format) ? 'format' : 'standalone'];
    return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
  }

  var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');

  function localeWeekdaysShort(m) {
    return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
  }

  var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');

  function localeWeekdaysMin(m) {
    return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
  }

  function handleStrictParse$1(weekdayName, format, strict) {
    var i,
        ii,
        mom,
        llc = weekdayName.toLocaleLowerCase();

    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._minWeekdaysParse = [];

      for (i = 0; i < 7; ++i) {
        mom = createUTC([2000, 1]).day(i);
        this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
        this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
        this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
      }
    }

    if (strict) {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }

  function localeWeekdaysParse(weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
      return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._minWeekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, 1]).day(i);

      if (strict && !this._fullWeekdaysParse[i]) {
        this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
        this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
        this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
      }

      if (!this._weekdaysParse[i]) {
        regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
        this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
      } // test the regex


      if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
        return i;
      }
    }
  } // MOMENTS


  function getSetDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();

    if (input != null) {
      input = parseWeekday(input, this.localeData());
      return this.add(input - day, 'd');
    } else {
      return day;
    }
  }

  function getSetLocaleDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
  }

  function getSetISODayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    } // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.


    if (input != null) {
      var weekday = parseIsoWeekday(input, this.localeData());
      return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
      return this.day() || 7;
    }
  }

  var defaultWeekdaysRegex = matchWord;

  function weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysStrictRegex;
      } else {
        return this._weekdaysRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        this._weekdaysRegex = defaultWeekdaysRegex;
      }

      return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
  }

  var defaultWeekdaysShortRegex = matchWord;

  function weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysShortStrictRegex;
      } else {
        return this._weekdaysShortRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysShortRegex')) {
        this._weekdaysShortRegex = defaultWeekdaysShortRegex;
      }

      return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
  }

  var defaultWeekdaysMinRegex = matchWord;

  function weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysMinStrictRegex;
      } else {
        return this._weekdaysMinRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysMinRegex')) {
        this._weekdaysMinRegex = defaultWeekdaysMinRegex;
      }

      return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
  }

  function computeWeekdaysParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }

    var minPieces = [],
        shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom,
        minp,
        shortp,
        longp;

    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, 1]).day(i);
      minp = this.weekdaysMin(mom, '');
      shortp = this.weekdaysShort(mom, '');
      longp = this.weekdays(mom, '');
      minPieces.push(minp);
      shortPieces.push(shortp);
      longPieces.push(longp);
      mixedPieces.push(minp);
      mixedPieces.push(shortp);
      mixedPieces.push(longp);
    } // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.


    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);

    for (i = 0; i < 7; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
  } // FORMATTING


  function hFormat() {
    return this.hours() % 12 || 12;
  }

  function kFormat() {
    return this.hours() || 24;
  }

  addFormatToken('H', ['HH', 2], 0, 'hour');
  addFormatToken('h', ['hh', 2], 0, hFormat);
  addFormatToken('k', ['kk', 2], 0, kFormat);
  addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
  });
  addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });
  addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
  });
  addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });

  function meridiem(token, lowercase) {
    addFormatToken(token, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
  }

  meridiem('a', true);
  meridiem('A', false); // ALIASES

  addUnitAlias('hour', 'h'); // PRIORITY

  addUnitPriority('hour', 13); // PARSING

  function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse;
  }

  addRegexToken('a', matchMeridiem);
  addRegexToken('A', matchMeridiem);
  addRegexToken('H', match1to2);
  addRegexToken('h', match1to2);
  addRegexToken('k', match1to2);
  addRegexToken('HH', match1to2, match2);
  addRegexToken('hh', match1to2, match2);
  addRegexToken('kk', match1to2, match2);
  addRegexToken('hmm', match3to4);
  addRegexToken('hmmss', match5to6);
  addRegexToken('Hmm', match3to4);
  addRegexToken('Hmmss', match5to6);
  addParseToken(['H', 'HH'], HOUR);
  addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
  });
  addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
  });
  addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
  });
  addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
  }); // LOCALES

  function localeIsPM(input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return (input + '').toLowerCase().charAt(0) === 'p';
  }

  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;

  function localeMeridiem(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? 'pm' : 'PM';
    } else {
      return isLower ? 'am' : 'AM';
    }
  } // MOMENTS
  // Setting the hour should keep the time, because the user explicitly
  // specified which hour they want. So trying to maintain the same hour (in
  // a new timezone) makes sense. Adding/subtracting hours does not follow
  // this rule.


  var getSetHour = makeGetSet('Hours', true);
  var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,
    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,
    week: defaultLocaleWeek,
    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,
    meridiemParse: defaultLocaleMeridiemParse
  }; // internal storage for locale config files

  var locales = {};
  var localeFamilies = {};
  var globalLocale;

  function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
  } // pick the locale from the array
  // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
  // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root


  function chooseLocale(names) {
    var i = 0,
        j,
        next,
        locale,
        split;

    while (i < names.length) {
      split = normalizeLocale(names[i]).split('-');
      j = split.length;
      next = normalizeLocale(names[i + 1]);
      next = next ? next.split('-') : null;

      while (j > 0) {
        locale = loadLocale(split.slice(0, j).join('-'));

        if (locale) {
          return locale;
        }

        if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
          //the next array item is better than a shallower substring of this one
          break;
        }

        j--;
      }

      i++;
    }

    return globalLocale;
  }

  function loadLocale(name) {
    var oldLocale = null; // TODO: Find a better way to register and load all the locales in Node

    if (!locales[name] && typeof module !== 'undefined' && module && module.exports) {
      try {
        oldLocale = globalLocale._abbr;
        var aliasedRequire = require;
        !(function webpackMissingModule() { var e = new Error("Cannot find module 'undefined'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
        getSetGlobalLocale(oldLocale);
      } catch (e) {}
    }

    return locales[name];
  } // This function will load locale and then set the global locale.  If
  // no arguments are passed in, it will simply return the current global
  // locale key.


  function getSetGlobalLocale(key, values) {
    var data;

    if (key) {
      if (isUndefined(values)) {
        data = getLocale(key);
      } else {
        data = defineLocale(key, values);
      }

      if (data) {
        // moment.duration._locale = moment._locale = data;
        globalLocale = data;
      } else {
        if (typeof console !== 'undefined' && console.warn) {
          //warn user if arguments are passed but the locale could not be set
          console.warn('Locale ' + key + ' not found. Did you forget to load it?');
        }
      }
    }

    return globalLocale._abbr;
  }

  function defineLocale(name, config) {
    if (config !== null) {
      var locale,
          parentConfig = baseConfig;
      config.abbr = name;

      if (locales[name] != null) {
        deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
        parentConfig = locales[name]._config;
      } else if (config.parentLocale != null) {
        if (locales[config.parentLocale] != null) {
          parentConfig = locales[config.parentLocale]._config;
        } else {
          locale = loadLocale(config.parentLocale);

          if (locale != null) {
            parentConfig = locale._config;
          } else {
            if (!localeFamilies[config.parentLocale]) {
              localeFamilies[config.parentLocale] = [];
            }

            localeFamilies[config.parentLocale].push({
              name: name,
              config: config
            });
            return null;
          }
        }
      }

      locales[name] = new Locale(mergeConfigs(parentConfig, config));

      if (localeFamilies[name]) {
        localeFamilies[name].forEach(function (x) {
          defineLocale(x.name, x.config);
        });
      } // backwards compat for now: also set the locale
      // make sure we set the locale AFTER all child locales have been
      // created, so we won't end up with the child locale set.


      getSetGlobalLocale(name);
      return locales[name];
    } else {
      // useful for testing
      delete locales[name];
      return null;
    }
  }

  function updateLocale(name, config) {
    if (config != null) {
      var locale,
          tmpLocale,
          parentConfig = baseConfig; // MERGE

      tmpLocale = loadLocale(name);

      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }

      config = mergeConfigs(parentConfig, config);
      locale = new Locale(config);
      locale.parentLocale = locales[name];
      locales[name] = locale; // backwards compat for now: also set the locale

      getSetGlobalLocale(name);
    } else {
      // pass null for config to unupdate, useful for tests
      if (locales[name] != null) {
        if (locales[name].parentLocale != null) {
          locales[name] = locales[name].parentLocale;
        } else if (locales[name] != null) {
          delete locales[name];
        }
      }
    }

    return locales[name];
  } // returns locale data


  function getLocale(key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
      key = key._locale._abbr;
    }

    if (!key) {
      return globalLocale;
    }

    if (!isArray(key)) {
      //short-circuit everything else
      locale = loadLocale(key);

      if (locale) {
        return locale;
      }

      key = [key];
    }

    return chooseLocale(key);
  }

  function listLocales() {
    return keys(locales);
  }

  function checkOverflow(m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
      overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;

      if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
        overflow = DATE;
      }

      if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
        overflow = WEEK;
      }

      if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
        overflow = WEEKDAY;
      }

      getParsingFlags(m).overflow = overflow;
    }

    return m;
  } // Pick the first defined of two or three arguments.


  function defaults(a, b, c) {
    if (a != null) {
      return a;
    }

    if (b != null) {
      return b;
    }

    return c;
  }

  function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());

    if (config._useUTC) {
      return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }

    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
  } // convert an array to a date.
  // the array should mirror the parameters below
  // note: all values past the year are optional and will default to the lowest possible value.
  // [year, month, day , hour, minute, second, millisecond]


  function configFromArray(config) {
    var i,
        date,
        input = [],
        currentDate,
        expectedWeekday,
        yearToUse;

    if (config._d) {
      return;
    }

    currentDate = currentDateArray(config); //compute day of the year from weeks and weekdays

    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
      dayOfYearFromWeekInfo(config);
    } //if the day of the year is set, figure out what it is


    if (config._dayOfYear != null) {
      yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

      if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
        getParsingFlags(config)._overflowDayOfYear = true;
      }

      date = createUTCDate(yearToUse, 0, config._dayOfYear);
      config._a[MONTH] = date.getUTCMonth();
      config._a[DATE] = date.getUTCDate();
    } // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything


    for (i = 0; i < 3 && config._a[i] == null; ++i) {
      config._a[i] = input[i] = currentDate[i];
    } // Zero out whatever was not defaulted, including time


    for (; i < 7; i++) {
      config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
    } // Check for 24:00:00.000


    if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
      config._nextDay = true;
      config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay(); // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.

    if (config._tzm != null) {
      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
      config._a[HOUR] = 24;
    } // check for mismatching day of week


    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
      getParsingFlags(config).weekdayMismatch = true;
    }
  }

  function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
    w = config._w;

    if (w.GG != null || w.W != null || w.E != null) {
      dow = 1;
      doy = 4; // TODO: We need to take the current isoWeekYear, but that depends on
      // how we interpret now (local, utc, fixed offset). So create
      // a now version of current config (take local/utc/offset flags, and
      // create now).

      weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
      week = defaults(w.W, 1);
      weekday = defaults(w.E, 1);

      if (weekday < 1 || weekday > 7) {
        weekdayOverflow = true;
      }
    } else {
      dow = config._locale._week.dow;
      doy = config._locale._week.doy;
      var curWeek = weekOfYear(createLocal(), dow, doy);
      weekYear = defaults(w.gg, config._a[YEAR], curWeek.year); // Default to current week.

      week = defaults(w.w, curWeek.week);

      if (w.d != null) {
        // weekday -- low day numbers are considered next week
        weekday = w.d;

        if (weekday < 0 || weekday > 6) {
          weekdayOverflow = true;
        }
      } else if (w.e != null) {
        // local weekday -- counting starts from beginning of week
        weekday = w.e + dow;

        if (w.e < 0 || w.e > 6) {
          weekdayOverflow = true;
        }
      } else {
        // default to beginning of week
        weekday = dow;
      }
    }

    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
      getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
      getParsingFlags(config)._overflowWeekday = true;
    } else {
      temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
      config._a[YEAR] = temp.year;
      config._dayOfYear = temp.dayOfYear;
    }
  } // iso 8601 regex
  // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)


  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
  var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
  var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
  var isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/], // YYYYMM is NOT allowed by the standard
  ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/]]; // iso time formats and regexes

  var isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]];
  var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i; // date from iso format

  function configFromISO(config) {
    var i,
        l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime,
        dateFormat,
        timeFormat,
        tzFormat;

    if (match) {
      getParsingFlags(config).iso = true;

      for (i = 0, l = isoDates.length; i < l; i++) {
        if (isoDates[i][1].exec(match[1])) {
          dateFormat = isoDates[i][0];
          allowTime = isoDates[i][2] !== false;
          break;
        }
      }

      if (dateFormat == null) {
        config._isValid = false;
        return;
      }

      if (match[3]) {
        for (i = 0, l = isoTimes.length; i < l; i++) {
          if (isoTimes[i][1].exec(match[3])) {
            // match[2] should be 'T' or space
            timeFormat = (match[2] || ' ') + isoTimes[i][0];
            break;
          }
        }

        if (timeFormat == null) {
          config._isValid = false;
          return;
        }
      }

      if (!allowTime && timeFormat != null) {
        config._isValid = false;
        return;
      }

      if (match[4]) {
        if (tzRegex.exec(match[4])) {
          tzFormat = 'Z';
        } else {
          config._isValid = false;
          return;
        }
      }

      config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
      configFromStringAndFormat(config);
    } else {
      config._isValid = false;
    }
  } // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3


  var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

  function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];

    if (secondStr) {
      result.push(parseInt(secondStr, 10));
    }

    return result;
  }

  function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);

    if (year <= 49) {
      return 2000 + year;
    } else if (year <= 999) {
      return 1900 + year;
    }

    return year;
  }

  function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
      // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
      var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
          weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();

      if (weekdayProvided !== weekdayActual) {
        getParsingFlags(config).weekdayMismatch = true;
        config._isValid = false;
        return false;
      }
    }

    return true;
  }

  var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
  };

  function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
      return obsOffsets[obsOffset];
    } else if (militaryOffset) {
      // the only allowed military tz is Z
      return 0;
    } else {
      var hm = parseInt(numOffset, 10);
      var m = hm % 100,
          h = (hm - m) / 100;
      return h * 60 + m;
    }
  } // date and time from ref 2822 format


  function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));

    if (match) {
      var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);

      if (!checkWeekday(match[1], parsedArray, config)) {
        return;
      }

      config._a = parsedArray;
      config._tzm = calculateOffset(match[8], match[9], match[10]);
      config._d = createUTCDate.apply(null, config._a);

      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

      getParsingFlags(config).rfc2822 = true;
    } else {
      config._isValid = false;
    }
  } // date from iso format or fallback


  function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
      config._d = new Date(+matched[1]);
      return;
    }

    configFromISO(config);

    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    }

    configFromRFC2822(config);

    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    } // Final attempt, use Input Fallback


    hooks.createFromInputFallback(config);
  }

  hooks.createFromInputFallback = deprecate('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged and will be removed in an upcoming major release. Please refer to ' + 'http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
    config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
  }); // constant that refers to the ISO standard

  hooks.ISO_8601 = function () {}; // constant that refers to the RFC 2822 form


  hooks.RFC_2822 = function () {}; // date from string and format string


  function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
      configFromISO(config);
      return;
    }

    if (config._f === hooks.RFC_2822) {
      configFromRFC2822(config);
      return;
    }

    config._a = [];
    getParsingFlags(config).empty = true; // This array is used to make a Date, either with `new Date` or `Date.UTC`

    var string = '' + config._i,
        i,
        parsedInput,
        tokens,
        token,
        skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;
    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];
      parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0]; // console.log('token', token, 'parsedInput', parsedInput,
      //         'regex', getParseRegexForToken(token, config));

      if (parsedInput) {
        skipped = string.substr(0, string.indexOf(parsedInput));

        if (skipped.length > 0) {
          getParsingFlags(config).unusedInput.push(skipped);
        }

        string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
        totalParsedInputLength += parsedInput.length;
      } // don't parse if it's not a known token


      if (formatTokenFunctions[token]) {
        if (parsedInput) {
          getParsingFlags(config).empty = false;
        } else {
          getParsingFlags(config).unusedTokens.push(token);
        }

        addTimeToArrayFromToken(token, parsedInput, config);
      } else if (config._strict && !parsedInput) {
        getParsingFlags(config).unusedTokens.push(token);
      }
    } // add remaining unparsed input length to the string


    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;

    if (string.length > 0) {
      getParsingFlags(config).unusedInput.push(string);
    } // clear _12h flag if hour is <= 12


    if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
      getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem; // handle meridiem

    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
    configFromArray(config);
    checkOverflow(config);
  }

  function meridiemFixWrap(locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
      // nothing to do
      return hour;
    }

    if (locale.meridiemHour != null) {
      return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
      // Fallback
      isPm = locale.isPM(meridiem);

      if (isPm && hour < 12) {
        hour += 12;
      }

      if (!isPm && hour === 12) {
        hour = 0;
      }

      return hour;
    } else {
      // this is not supposed to happen
      return hour;
    }
  } // date from string and array of format strings


  function configFromStringAndArray(config) {
    var tempConfig, bestMoment, scoreToBeat, i, currentScore;

    if (config._f.length === 0) {
      getParsingFlags(config).invalidFormat = true;
      config._d = new Date(NaN);
      return;
    }

    for (i = 0; i < config._f.length; i++) {
      currentScore = 0;
      tempConfig = copyConfig({}, config);

      if (config._useUTC != null) {
        tempConfig._useUTC = config._useUTC;
      }

      tempConfig._f = config._f[i];
      configFromStringAndFormat(tempConfig);

      if (!isValid(tempConfig)) {
        continue;
      } // if there is any input that was not parsed add a penalty for that format


      currentScore += getParsingFlags(tempConfig).charsLeftOver; //or tokens

      currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
      getParsingFlags(tempConfig).score = currentScore;

      if (scoreToBeat == null || currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }

    extend(config, bestMoment || tempConfig);
  }

  function configFromObject(config) {
    if (config._d) {
      return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
      return obj && parseInt(obj, 10);
    });
    configFromArray(config);
  }

  function createFromConfig(config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));

    if (res._nextDay) {
      // Adding is smart enough around DST
      res.add(1, 'd');
      res._nextDay = undefined;
    }

    return res;
  }

  function prepareConfig(config) {
    var input = config._i,
        format = config._f;
    config._locale = config._locale || getLocale(config._l);

    if (input === null || format === undefined && input === '') {
      return createInvalid({
        nullInput: true
      });
    }

    if (typeof input === 'string') {
      config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
      return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
      config._d = input;
    } else if (isArray(format)) {
      configFromStringAndArray(config);
    } else if (format) {
      configFromStringAndFormat(config);
    } else {
      configFromInput(config);
    }

    if (!isValid(config)) {
      config._d = null;
    }

    return config;
  }

  function configFromInput(config) {
    var input = config._i;

    if (isUndefined(input)) {
      config._d = new Date(hooks.now());
    } else if (isDate(input)) {
      config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
      configFromString(config);
    } else if (isArray(input)) {
      config._a = map(input.slice(0), function (obj) {
        return parseInt(obj, 10);
      });
      configFromArray(config);
    } else if (isObject(input)) {
      configFromObject(config);
    } else if (isNumber(input)) {
      // from milliseconds
      config._d = new Date(input);
    } else {
      hooks.createFromInputFallback(config);
    }
  }

  function createLocalOrUTC(input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
      strict = locale;
      locale = undefined;
    }

    if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
      input = undefined;
    } // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423


    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;
    return createFromConfig(c);
  }

  function createLocal(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
  }

  var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
    var other = createLocal.apply(null, arguments);

    if (this.isValid() && other.isValid()) {
      return other < this ? this : other;
    } else {
      return createInvalid();
    }
  });
  var prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
    var other = createLocal.apply(null, arguments);

    if (this.isValid() && other.isValid()) {
      return other > this ? this : other;
    } else {
      return createInvalid();
    }
  }); // Pick a moment m from moments so that m[fn](other) is true for all
  // other. This relies on the function fn to be transitive.
  //
  // moments should either be an array of moment objects or an array, whose
  // first element is an array of moment objects.

  function pickBy(fn, moments) {
    var res, i;

    if (moments.length === 1 && isArray(moments[0])) {
      moments = moments[0];
    }

    if (!moments.length) {
      return createLocal();
    }

    res = moments[0];

    for (i = 1; i < moments.length; ++i) {
      if (!moments[i].isValid() || moments[i][fn](res)) {
        res = moments[i];
      }
    }

    return res;
  } // TODO: Use [].sort instead?


  function min() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isBefore', args);
  }

  function max() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isAfter', args);
  }

  var now = function now() {
    return Date.now ? Date.now() : +new Date();
  };

  var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

  function isDurationValid(m) {
    for (var key in m) {
      if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
        return false;
      }
    }

    var unitHasDecimal = false;

    for (var i = 0; i < ordering.length; ++i) {
      if (m[ordering[i]]) {
        if (unitHasDecimal) {
          return false; // only allow non-integers for smallest unit
        }

        if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
          unitHasDecimal = true;
        }
      }
    }

    return true;
  }

  function isValid$1() {
    return this._isValid;
  }

  function createInvalid$1() {
    return createDuration(NaN);
  }

  function Duration(duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;
    this._isValid = isDurationValid(normalizedInput); // representation for dateAddRemove

    this._milliseconds = +milliseconds + seconds * 1e3 + // 1000
    minutes * 6e4 + // 1000 * 60
    hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately

    this._days = +days + weeks * 7; // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.

    this._months = +months + quarters * 3 + years * 12;
    this._data = {};
    this._locale = getLocale();

    this._bubble();
  }

  function isDuration(obj) {
    return obj instanceof Duration;
  }

  function absRound(number) {
    if (number < 0) {
      return Math.round(-1 * number) * -1;
    } else {
      return Math.round(number);
    }
  } // FORMATTING


  function offset(token, separator) {
    addFormatToken(token, 0, 0, function () {
      var offset = this.utcOffset();
      var sign = '+';

      if (offset < 0) {
        offset = -offset;
        sign = '-';
      }

      return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
    });
  }

  offset('Z', ':');
  offset('ZZ', ''); // PARSING

  addRegexToken('Z', matchShortOffset);
  addRegexToken('ZZ', matchShortOffset);
  addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
  }); // HELPERS
  // timezone chunker
  // '+10:00' > ['10',  '00']
  // '-1530'  > ['-15', '30']

  var chunkOffset = /([\+\-]|\d\d)/gi;

  function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
      return null;
    }

    var chunk = matches[matches.length - 1] || [];
    var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);
    return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
  } // Return a moment from input, that is local/utc/zone equivalent to model.


  function cloneWithOffset(input, model) {
    var res, diff;

    if (model._isUTC) {
      res = model.clone();
      diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf(); // Use low-level api, because this fn is low-level api.

      res._d.setTime(res._d.valueOf() + diff);

      hooks.updateOffset(res, false);
      return res;
    } else {
      return createLocal(input).local();
    }
  }

  function getDateOffset(m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
  } // HOOKS
  // This function will be called whenever a moment is mutated.
  // It is intended to keep the offset in sync with the timezone.


  hooks.updateOffset = function () {}; // MOMENTS
  // keepLocalTime = true means only change the timezone, without
  // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
  // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
  // +0200, so we adjust the time as needed, to be valid.
  //
  // Keeping the time actually adds/subtracts (one hour)
  // from the actual represented time. That is why we call updateOffset
  // a second time. In case it wants us to change the offset again
  // _changeInProgress == true case, then we have to adjust, because
  // there is no such time in the given timezone.


  function getSetOffset(input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;

    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    if (input != null) {
      if (typeof input === 'string') {
        input = offsetFromString(matchShortOffset, input);

        if (input === null) {
          return this;
        }
      } else if (Math.abs(input) < 16 && !keepMinutes) {
        input = input * 60;
      }

      if (!this._isUTC && keepLocalTime) {
        localAdjust = getDateOffset(this);
      }

      this._offset = input;
      this._isUTC = true;

      if (localAdjust != null) {
        this.add(localAdjust, 'm');
      }

      if (offset !== input) {
        if (!keepLocalTime || this._changeInProgress) {
          addSubtract(this, createDuration(input - offset, 'm'), 1, false);
        } else if (!this._changeInProgress) {
          this._changeInProgress = true;
          hooks.updateOffset(this, true);
          this._changeInProgress = null;
        }
      }

      return this;
    } else {
      return this._isUTC ? offset : getDateOffset(this);
    }
  }

  function getSetZone(input, keepLocalTime) {
    if (input != null) {
      if (typeof input !== 'string') {
        input = -input;
      }

      this.utcOffset(input, keepLocalTime);
      return this;
    } else {
      return -this.utcOffset();
    }
  }

  function setOffsetToUTC(keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
  }

  function setOffsetToLocal(keepLocalTime) {
    if (this._isUTC) {
      this.utcOffset(0, keepLocalTime);
      this._isUTC = false;

      if (keepLocalTime) {
        this.subtract(getDateOffset(this), 'm');
      }
    }

    return this;
  }

  function setOffsetToParsedOffset() {
    if (this._tzm != null) {
      this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
      var tZone = offsetFromString(matchOffset, this._i);

      if (tZone != null) {
        this.utcOffset(tZone);
      } else {
        this.utcOffset(0, true);
      }
    }

    return this;
  }

  function hasAlignedHourOffset(input) {
    if (!this.isValid()) {
      return false;
    }

    input = input ? createLocal(input).utcOffset() : 0;
    return (this.utcOffset() - input) % 60 === 0;
  }

  function isDaylightSavingTime() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }

  function isDaylightSavingTimeShifted() {
    if (!isUndefined(this._isDSTShifted)) {
      return this._isDSTShifted;
    }

    var c = {};
    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
      var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
      this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
    } else {
      this._isDSTShifted = false;
    }

    return this._isDSTShifted;
  }

  function isLocal() {
    return this.isValid() ? !this._isUTC : false;
  }

  function isUtcOffset() {
    return this.isValid() ? this._isUTC : false;
  }

  function isUtc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
  } // ASP.NET json date format regex


  var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/; // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
  // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
  // and further modified to allow for strings containing both week and day

  var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

  function createDuration(input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
    match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
      duration = {
        ms: input._milliseconds,
        d: input._days,
        M: input._months
      };
    } else if (isNumber(input)) {
      duration = {};

      if (key) {
        duration[key] = input;
      } else {
        duration.milliseconds = input;
      }
    } else if (!!(match = aspNetRegex.exec(input))) {
      sign = match[1] === '-' ? -1 : 1;
      duration = {
        y: 0,
        d: toInt(match[DATE]) * sign,
        h: toInt(match[HOUR]) * sign,
        m: toInt(match[MINUTE]) * sign,
        s: toInt(match[SECOND]) * sign,
        ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match

      };
    } else if (!!(match = isoRegex.exec(input))) {
      sign = match[1] === '-' ? -1 : 1;
      duration = {
        y: parseIso(match[2], sign),
        M: parseIso(match[3], sign),
        w: parseIso(match[4], sign),
        d: parseIso(match[5], sign),
        h: parseIso(match[6], sign),
        m: parseIso(match[7], sign),
        s: parseIso(match[8], sign)
      };
    } else if (duration == null) {
      // checks for null or undefined
      duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
      diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
      duration = {};
      duration.ms = diffRes.milliseconds;
      duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
      ret._locale = input._locale;
    }

    return ret;
  }

  createDuration.fn = Duration.prototype;
  createDuration.invalid = createInvalid$1;

  function parseIso(inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.')); // apply sign while we're at it

    return (isNaN(res) ? 0 : res) * sign;
  }

  function positiveMomentsDifference(base, other) {
    var res = {};
    res.months = other.month() - base.month() + (other.year() - base.year()) * 12;

    if (base.clone().add(res.months, 'M').isAfter(other)) {
      --res.months;
    }

    res.milliseconds = +other - +base.clone().add(res.months, 'M');
    return res;
  }

  function momentsDifference(base, other) {
    var res;

    if (!(base.isValid() && other.isValid())) {
      return {
        milliseconds: 0,
        months: 0
      };
    }

    other = cloneWithOffset(other, base);

    if (base.isBefore(other)) {
      res = positiveMomentsDifference(base, other);
    } else {
      res = positiveMomentsDifference(other, base);
      res.milliseconds = -res.milliseconds;
      res.months = -res.months;
    }

    return res;
  } // TODO: remove 'name' arg after deprecation is removed


  function createAdder(direction, name) {
    return function (val, period) {
      var dur, tmp; //invert the arguments, but complain about it

      if (period !== null && !isNaN(+period)) {
        deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
        tmp = val;
        val = period;
        period = tmp;
      }

      val = typeof val === 'string' ? +val : val;
      dur = createDuration(val, period);
      addSubtract(this, dur, direction);
      return this;
    };
  }

  function addSubtract(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
      // No op
      return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
      setMonth(mom, get(mom, 'Month') + months * isAdding);
    }

    if (days) {
      set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }

    if (milliseconds) {
      mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }

    if (updateOffset) {
      hooks.updateOffset(mom, days || months);
    }
  }

  var add = createAdder(1, 'add');
  var subtract = createAdder(-1, 'subtract');

  function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
  }

  function calendar$1(time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';
    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
  }

  function clone() {
    return new Moment(this);
  }

  function isAfter(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() > localInput.valueOf();
    } else {
      return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
  }

  function isBefore(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() < localInput.valueOf();
    } else {
      return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
  }

  function isBetween(from, to, units, inclusivity) {
    var localFrom = isMoment(from) ? from : createLocal(from),
        localTo = isMoment(to) ? to : createLocal(to);

    if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
      return false;
    }

    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
  }

  function isSame(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() === localInput.valueOf();
    } else {
      inputMs = localInput.valueOf();
      return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
  }

  function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
  }

  function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
  }

  function diff(input, units, asFloat) {
    var that, zoneDelta, output;

    if (!this.isValid()) {
      return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
      return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
    units = normalizeUnits(units);

    switch (units) {
      case 'year':
        output = monthDiff(this, that) / 12;
        break;

      case 'month':
        output = monthDiff(this, that);
        break;

      case 'quarter':
        output = monthDiff(this, that) / 3;
        break;

      case 'second':
        output = (this - that) / 1e3;
        break;
      // 1000

      case 'minute':
        output = (this - that) / 6e4;
        break;
      // 1000 * 60

      case 'hour':
        output = (this - that) / 36e5;
        break;
      // 1000 * 60 * 60

      case 'day':
        output = (this - that - zoneDelta) / 864e5;
        break;
      // 1000 * 60 * 60 * 24, negate dst

      case 'week':
        output = (this - that - zoneDelta) / 6048e5;
        break;
      // 1000 * 60 * 60 * 24 * 7, negate dst

      default:
        output = this - that;
    }

    return asFloat ? output : absFloor(output);
  }

  function monthDiff(a, b) {
    // difference in months
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
    anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2,
        adjust;

    if (b - anchor < 0) {
      anchor2 = a.clone().add(wholeMonthDiff - 1, 'months'); // linear across the month

      adjust = (b - anchor) / (anchor - anchor2);
    } else {
      anchor2 = a.clone().add(wholeMonthDiff + 1, 'months'); // linear across the month

      adjust = (b - anchor) / (anchor2 - anchor);
    } //check for negative zero, return zero if negative zero


    return -(wholeMonthDiff + adjust) || 0;
  }

  hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

  function toString() {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }

  function toISOString(keepOffset) {
    if (!this.isValid()) {
      return null;
    }

    var utc = keepOffset !== true;
    var m = utc ? this.clone().utc() : this;

    if (m.year() < 0 || m.year() > 9999) {
      return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    if (isFunction(Date.prototype.toISOString)) {
      // native implementation is ~50x faster, use it when we can
      if (utc) {
        return this.toDate().toISOString();
      } else {
        return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
      }
    }

    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
  }
  /**
   * Return a human readable representation of a moment that can
   * also be evaluated to get a new moment which is the same
   *
   * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
   */


  function inspect() {
    if (!this.isValid()) {
      return 'moment.invalid(/* ' + this._i + ' */)';
    }

    var func = 'moment';
    var zone = '';

    if (!this.isLocal()) {
      func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
      zone = 'Z';
    }

    var prefix = '[' + func + '("]';
    var year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';
    return this.format(prefix + year + datetime + suffix);
  }

  function format(inputString) {
    if (!inputString) {
      inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }

    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
  }

  function from(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        to: this,
        from: time
      }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }

  function fromNow(withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
  }

  function to(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        from: this,
        to: time
      }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }

  function toNow(withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
  } // If passed a locale key, it will set the locale for this
  // instance.  Otherwise, it will return the locale configuration
  // variables for this instance.


  function locale(key) {
    var newLocaleData;

    if (key === undefined) {
      return this._locale._abbr;
    } else {
      newLocaleData = getLocale(key);

      if (newLocaleData != null) {
        this._locale = newLocaleData;
      }

      return this;
    }
  }

  var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
    if (key === undefined) {
      return this.localeData();
    } else {
      return this.locale(key);
    }
  });

  function localeData() {
    return this._locale;
  }

  var MS_PER_SECOND = 1000;
  var MS_PER_MINUTE = 60 * MS_PER_SECOND;
  var MS_PER_HOUR = 60 * MS_PER_MINUTE;
  var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR; // actual modulo - handles negative numbers (for dates before 1970):

  function mod$1(dividend, divisor) {
    return (dividend % divisor + divisor) % divisor;
  }

  function localStartOfDate(y, m, d) {
    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      return new Date(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return new Date(y, m, d).valueOf();
    }
  }

  function utcStartOfDate(y, m, d) {
    // Date.UTC remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return Date.UTC(y, m, d);
    }
  }

  function startOf(units) {
    var time;
    units = normalizeUnits(units);

    if (units === undefined || units === 'millisecond' || !this.isValid()) {
      return this;
    }

    var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
      case 'year':
        time = startOfDate(this.year(), 0, 1);
        break;

      case 'quarter':
        time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
        break;

      case 'month':
        time = startOfDate(this.year(), this.month(), 1);
        break;

      case 'week':
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
        break;

      case 'isoWeek':
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;

      case 'day':
      case 'date':
        time = startOfDate(this.year(), this.month(), this.date());
        break;

      case 'hour':
        time = this._d.valueOf();
        time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
        break;

      case 'minute':
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_MINUTE);
        break;

      case 'second':
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_SECOND);
        break;
    }

    this._d.setTime(time);

    hooks.updateOffset(this, true);
    return this;
  }

  function endOf(units) {
    var time;
    units = normalizeUnits(units);

    if (units === undefined || units === 'millisecond' || !this.isValid()) {
      return this;
    }

    var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
      case 'year':
        time = startOfDate(this.year() + 1, 0, 1) - 1;
        break;

      case 'quarter':
        time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
        break;

      case 'month':
        time = startOfDate(this.year(), this.month() + 1, 1) - 1;
        break;

      case 'week':
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;

      case 'isoWeek':
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;

      case 'day':
      case 'date':
        time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
        break;

      case 'hour':
        time = this._d.valueOf();
        time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
        break;

      case 'minute':
        time = this._d.valueOf();
        time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
        break;

      case 'second':
        time = this._d.valueOf();
        time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
        break;
    }

    this._d.setTime(time);

    hooks.updateOffset(this, true);
    return this;
  }

  function valueOf() {
    return this._d.valueOf() - (this._offset || 0) * 60000;
  }

  function unix() {
    return Math.floor(this.valueOf() / 1000);
  }

  function toDate() {
    return new Date(this.valueOf());
  }

  function toArray() {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
  }

  function toObject() {
    var m = this;
    return {
      years: m.year(),
      months: m.month(),
      date: m.date(),
      hours: m.hours(),
      minutes: m.minutes(),
      seconds: m.seconds(),
      milliseconds: m.milliseconds()
    };
  }

  function toJSON() {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
  }

  function isValid$2() {
    return isValid(this);
  }

  function parsingFlags() {
    return extend({}, getParsingFlags(this));
  }

  function invalidAt() {
    return getParsingFlags(this).overflow;
  }

  function creationData() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict
    };
  } // FORMATTING


  addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
  });
  addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
  });

  function addWeekYearFormatToken(token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
  }

  addWeekYearFormatToken('gggg', 'weekYear');
  addWeekYearFormatToken('ggggg', 'weekYear');
  addWeekYearFormatToken('GGGG', 'isoWeekYear');
  addWeekYearFormatToken('GGGGG', 'isoWeekYear'); // ALIASES

  addUnitAlias('weekYear', 'gg');
  addUnitAlias('isoWeekYear', 'GG'); // PRIORITY

  addUnitPriority('weekYear', 1);
  addUnitPriority('isoWeekYear', 1); // PARSING

  addRegexToken('G', matchSigned);
  addRegexToken('g', matchSigned);
  addRegexToken('GG', match1to2, match2);
  addRegexToken('gg', match1to2, match2);
  addRegexToken('GGGG', match1to4, match4);
  addRegexToken('gggg', match1to4, match4);
  addRegexToken('GGGGG', match1to6, match6);
  addRegexToken('ggggg', match1to6, match6);
  addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
  });
  addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
  }); // MOMENTS

  function getSetWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }

  function getSetISOWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
  }

  function getISOWeeksInYear() {
    return weeksInYear(this.year(), 1, 4);
  }

  function getWeeksInYear() {
    var weekInfo = this.localeData()._week;

    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
  }

  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;

    if (input == null) {
      return weekOfYear(this, dow, doy).year;
    } else {
      weeksTarget = weeksInYear(input, dow, doy);

      if (week > weeksTarget) {
        week = weeksTarget;
      }

      return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
  }

  function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
  } // FORMATTING


  addFormatToken('Q', 0, 'Qo', 'quarter'); // ALIASES

  addUnitAlias('quarter', 'Q'); // PRIORITY

  addUnitPriority('quarter', 7); // PARSING

  addRegexToken('Q', match1);
  addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
  }); // MOMENTS

  function getSetQuarter(input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
  } // FORMATTING


  addFormatToken('D', ['DD', 2], 'Do', 'date'); // ALIASES

  addUnitAlias('date', 'D'); // PRIORITY

  addUnitPriority('date', 9); // PARSING

  addRegexToken('D', match1to2);
  addRegexToken('DD', match1to2, match2);
  addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
  });
  addParseToken(['D', 'DD'], DATE);
  addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
  }); // MOMENTS

  var getSetDayOfMonth = makeGetSet('Date', true); // FORMATTING

  addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear'); // ALIASES

  addUnitAlias('dayOfYear', 'DDD'); // PRIORITY

  addUnitPriority('dayOfYear', 4); // PARSING

  addRegexToken('DDD', match1to3);
  addRegexToken('DDDD', match3);
  addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
  }); // HELPERS
  // MOMENTS

  function getSetDayOfYear(input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
  } // FORMATTING


  addFormatToken('m', ['mm', 2], 0, 'minute'); // ALIASES

  addUnitAlias('minute', 'm'); // PRIORITY

  addUnitPriority('minute', 14); // PARSING

  addRegexToken('m', match1to2);
  addRegexToken('mm', match1to2, match2);
  addParseToken(['m', 'mm'], MINUTE); // MOMENTS

  var getSetMinute = makeGetSet('Minutes', false); // FORMATTING

  addFormatToken('s', ['ss', 2], 0, 'second'); // ALIASES

  addUnitAlias('second', 's'); // PRIORITY

  addUnitPriority('second', 15); // PARSING

  addRegexToken('s', match1to2);
  addRegexToken('ss', match1to2, match2);
  addParseToken(['s', 'ss'], SECOND); // MOMENTS

  var getSetSecond = makeGetSet('Seconds', false); // FORMATTING

  addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
  });
  addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
  });
  addFormatToken(0, ['SSS', 3], 0, 'millisecond');
  addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
  });
  addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
  });
  addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
  });
  addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
  });
  addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
  });
  addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
  }); // ALIASES

  addUnitAlias('millisecond', 'ms'); // PRIORITY

  addUnitPriority('millisecond', 16); // PARSING

  addRegexToken('S', match1to3, match1);
  addRegexToken('SS', match1to3, match2);
  addRegexToken('SSS', match1to3, match3);
  var token;

  for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
  }

  function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
  }

  for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
  } // MOMENTS


  var getSetMillisecond = makeGetSet('Milliseconds', false); // FORMATTING

  addFormatToken('z', 0, 0, 'zoneAbbr');
  addFormatToken('zz', 0, 0, 'zoneName'); // MOMENTS

  function getZoneAbbr() {
    return this._isUTC ? 'UTC' : '';
  }

  function getZoneName() {
    return this._isUTC ? 'Coordinated Universal Time' : '';
  }

  var proto = Moment.prototype;
  proto.add = add;
  proto.calendar = calendar$1;
  proto.clone = clone;
  proto.diff = diff;
  proto.endOf = endOf;
  proto.format = format;
  proto.from = from;
  proto.fromNow = fromNow;
  proto.to = to;
  proto.toNow = toNow;
  proto.get = stringGet;
  proto.invalidAt = invalidAt;
  proto.isAfter = isAfter;
  proto.isBefore = isBefore;
  proto.isBetween = isBetween;
  proto.isSame = isSame;
  proto.isSameOrAfter = isSameOrAfter;
  proto.isSameOrBefore = isSameOrBefore;
  proto.isValid = isValid$2;
  proto.lang = lang;
  proto.locale = locale;
  proto.localeData = localeData;
  proto.max = prototypeMax;
  proto.min = prototypeMin;
  proto.parsingFlags = parsingFlags;
  proto.set = stringSet;
  proto.startOf = startOf;
  proto.subtract = subtract;
  proto.toArray = toArray;
  proto.toObject = toObject;
  proto.toDate = toDate;
  proto.toISOString = toISOString;
  proto.inspect = inspect;
  proto.toJSON = toJSON;
  proto.toString = toString;
  proto.unix = unix;
  proto.valueOf = valueOf;
  proto.creationData = creationData;
  proto.year = getSetYear;
  proto.isLeapYear = getIsLeapYear;
  proto.weekYear = getSetWeekYear;
  proto.isoWeekYear = getSetISOWeekYear;
  proto.quarter = proto.quarters = getSetQuarter;
  proto.month = getSetMonth;
  proto.daysInMonth = getDaysInMonth;
  proto.week = proto.weeks = getSetWeek;
  proto.isoWeek = proto.isoWeeks = getSetISOWeek;
  proto.weeksInYear = getWeeksInYear;
  proto.isoWeeksInYear = getISOWeeksInYear;
  proto.date = getSetDayOfMonth;
  proto.day = proto.days = getSetDayOfWeek;
  proto.weekday = getSetLocaleDayOfWeek;
  proto.isoWeekday = getSetISODayOfWeek;
  proto.dayOfYear = getSetDayOfYear;
  proto.hour = proto.hours = getSetHour;
  proto.minute = proto.minutes = getSetMinute;
  proto.second = proto.seconds = getSetSecond;
  proto.millisecond = proto.milliseconds = getSetMillisecond;
  proto.utcOffset = getSetOffset;
  proto.utc = setOffsetToUTC;
  proto.local = setOffsetToLocal;
  proto.parseZone = setOffsetToParsedOffset;
  proto.hasAlignedHourOffset = hasAlignedHourOffset;
  proto.isDST = isDaylightSavingTime;
  proto.isLocal = isLocal;
  proto.isUtcOffset = isUtcOffset;
  proto.isUtc = isUtc;
  proto.isUTC = isUtc;
  proto.zoneAbbr = getZoneAbbr;
  proto.zoneName = getZoneName;
  proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
  proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
  proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
  proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
  proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

  function createUnix(input) {
    return createLocal(input * 1000);
  }

  function createInZone() {
    return createLocal.apply(null, arguments).parseZone();
  }

  function preParsePostFormat(string) {
    return string;
  }

  var proto$1 = Locale.prototype;
  proto$1.calendar = calendar;
  proto$1.longDateFormat = longDateFormat;
  proto$1.invalidDate = invalidDate;
  proto$1.ordinal = ordinal;
  proto$1.preparse = preParsePostFormat;
  proto$1.postformat = preParsePostFormat;
  proto$1.relativeTime = relativeTime;
  proto$1.pastFuture = pastFuture;
  proto$1.set = set;
  proto$1.months = localeMonths;
  proto$1.monthsShort = localeMonthsShort;
  proto$1.monthsParse = localeMonthsParse;
  proto$1.monthsRegex = monthsRegex;
  proto$1.monthsShortRegex = monthsShortRegex;
  proto$1.week = localeWeek;
  proto$1.firstDayOfYear = localeFirstDayOfYear;
  proto$1.firstDayOfWeek = localeFirstDayOfWeek;
  proto$1.weekdays = localeWeekdays;
  proto$1.weekdaysMin = localeWeekdaysMin;
  proto$1.weekdaysShort = localeWeekdaysShort;
  proto$1.weekdaysParse = localeWeekdaysParse;
  proto$1.weekdaysRegex = weekdaysRegex;
  proto$1.weekdaysShortRegex = weekdaysShortRegex;
  proto$1.weekdaysMinRegex = weekdaysMinRegex;
  proto$1.isPM = localeIsPM;
  proto$1.meridiem = localeMeridiem;

  function get$1(format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
  }

  function listMonthsImpl(format, index, field) {
    if (isNumber(format)) {
      index = format;
      format = undefined;
    }

    format = format || '';

    if (index != null) {
      return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];

    for (i = 0; i < 12; i++) {
      out[i] = get$1(format, i, field, 'month');
    }

    return out;
  } // ()
  // (5)
  // (fmt, 5)
  // (fmt)
  // (true)
  // (true, 5)
  // (true, fmt, 5)
  // (true, fmt)


  function listWeekdaysImpl(localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
      if (isNumber(format)) {
        index = format;
        format = undefined;
      }

      format = format || '';
    } else {
      format = localeSorted;
      index = format;
      localeSorted = false;

      if (isNumber(format)) {
        index = format;
        format = undefined;
      }

      format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
      return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];

    for (i = 0; i < 7; i++) {
      out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }

    return out;
  }

  function listMonths(format, index) {
    return listMonthsImpl(format, index, 'months');
  }

  function listMonthsShort(format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
  }

  function listWeekdays(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
  }

  function listWeekdaysShort(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
  }

  function listWeekdaysMin(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
  }

  getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function ordinal(number) {
      var b = number % 10,
          output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    }
  }); // Side effect imports

  hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
  hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);
  var mathAbs = Math.abs;

  function abs() {
    var data = this._data;
    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);
    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.months = mathAbs(data.months);
    data.years = mathAbs(data.years);
    return this;
  }

  function addSubtract$1(duration, input, value, direction) {
    var other = createDuration(input, value);
    duration._milliseconds += direction * other._milliseconds;
    duration._days += direction * other._days;
    duration._months += direction * other._months;
    return duration._bubble();
  } // supports only 2.0-style add(1, 's') or add(duration)


  function add$1(input, value) {
    return addSubtract$1(this, input, value, 1);
  } // supports only 2.0-style subtract(1, 's') or subtract(duration)


  function subtract$1(input, value) {
    return addSubtract$1(this, input, value, -1);
  }

  function absCeil(number) {
    if (number < 0) {
      return Math.floor(number);
    } else {
      return Math.ceil(number);
    }
  }

  function bubble() {
    var milliseconds = this._milliseconds;
    var days = this._days;
    var months = this._months;
    var data = this._data;
    var seconds, minutes, hours, years, monthsFromDays; // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166

    if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
      milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
      days = 0;
      months = 0;
    } // The following code bubbles up values, see the tests for
    // examples of what that means.


    data.milliseconds = milliseconds % 1000;
    seconds = absFloor(milliseconds / 1000);
    data.seconds = seconds % 60;
    minutes = absFloor(seconds / 60);
    data.minutes = minutes % 60;
    hours = absFloor(minutes / 60);
    data.hours = hours % 24;
    days += absFloor(hours / 24); // convert days to months

    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays)); // 12 months -> 1 year

    years = absFloor(months / 12);
    months %= 12;
    data.days = days;
    data.months = months;
    data.years = years;
    return this;
  }

  function daysToMonths(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
  }

  function monthsToDays(months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
  }

  function as(units) {
    if (!this.isValid()) {
      return NaN;
    }

    var days;
    var months;
    var milliseconds = this._milliseconds;
    units = normalizeUnits(units);

    if (units === 'month' || units === 'quarter' || units === 'year') {
      days = this._days + milliseconds / 864e5;
      months = this._months + daysToMonths(days);

      switch (units) {
        case 'month':
          return months;

        case 'quarter':
          return months / 3;

        case 'year':
          return months / 12;
      }
    } else {
      // handle milliseconds separately because of floating point math errors (issue #1867)
      days = this._days + Math.round(monthsToDays(this._months));

      switch (units) {
        case 'week':
          return days / 7 + milliseconds / 6048e5;

        case 'day':
          return days + milliseconds / 864e5;

        case 'hour':
          return days * 24 + milliseconds / 36e5;

        case 'minute':
          return days * 1440 + milliseconds / 6e4;

        case 'second':
          return days * 86400 + milliseconds / 1000;
        // Math.floor prevents floating point math errors here

        case 'millisecond':
          return Math.floor(days * 864e5) + milliseconds;

        default:
          throw new Error('Unknown unit ' + units);
      }
    }
  } // TODO: Use this.as('ms')?


  function valueOf$1() {
    if (!this.isValid()) {
      return NaN;
    }

    return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
  }

  function makeAs(alias) {
    return function () {
      return this.as(alias);
    };
  }

  var asMilliseconds = makeAs('ms');
  var asSeconds = makeAs('s');
  var asMinutes = makeAs('m');
  var asHours = makeAs('h');
  var asDays = makeAs('d');
  var asWeeks = makeAs('w');
  var asMonths = makeAs('M');
  var asQuarters = makeAs('Q');
  var asYears = makeAs('y');

  function clone$1() {
    return createDuration(this);
  }

  function get$2(units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
  }

  function makeGetter(name) {
    return function () {
      return this.isValid() ? this._data[name] : NaN;
    };
  }

  var milliseconds = makeGetter('milliseconds');
  var seconds = makeGetter('seconds');
  var minutes = makeGetter('minutes');
  var hours = makeGetter('hours');
  var days = makeGetter('days');
  var months = makeGetter('months');
  var years = makeGetter('years');

  function weeks() {
    return absFloor(this.days() / 7);
  }

  var round = Math.round;
  var thresholds = {
    ss: 44,
    // a few seconds to seconds
    s: 45,
    // seconds to minute
    m: 45,
    // minutes to hour
    h: 22,
    // hours to day
    d: 26,
    // days to month
    M: 11 // months to year

  }; // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize

  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  }

  function relativeTime$1(posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds = round(duration.as('s'));
    var minutes = round(duration.as('m'));
    var hours = round(duration.as('h'));
    var days = round(duration.as('d'));
    var months = round(duration.as('M'));
    var years = round(duration.as('y'));
    var a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days] || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];
    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
  } // This function allows you to set the rounding function for relative time strings


  function getSetRelativeTimeRounding(roundingFunction) {
    if (roundingFunction === undefined) {
      return round;
    }

    if (typeof roundingFunction === 'function') {
      round = roundingFunction;
      return true;
    }

    return false;
  } // This function allows you to set a threshold for relative time strings


  function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === undefined) {
      return false;
    }

    if (limit === undefined) {
      return thresholds[threshold];
    }

    thresholds[threshold] = limit;

    if (threshold === 's') {
      thresholds.ss = limit - 1;
    }

    return true;
  }

  function humanize(withSuffix) {
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
      output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
  }

  var abs$1 = Math.abs;

  function sign(x) {
    return (x > 0) - (x < 0) || +x;
  }

  function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days = abs$1(this._days);
    var months = abs$1(this._months);
    var minutes, hours, years; // 3600 seconds -> 60 minutes -> 1 hour

    minutes = absFloor(seconds / 60);
    hours = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60; // 12 months -> 1 year

    years = absFloor(months / 12);
    months %= 12; // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js

    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
      // this is the same as C#'s (Noda) and python (isodate)...
      // but not other JS (goog.date)
      return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';
    return totalSign + 'P' + (Y ? ymSign + Y + 'Y' : '') + (M ? ymSign + M + 'M' : '') + (D ? daysSign + D + 'D' : '') + (h || m || s ? 'T' : '') + (h ? hmsSign + h + 'H' : '') + (m ? hmsSign + m + 'M' : '') + (s ? hmsSign + s + 'S' : '');
  }

  var proto$2 = Duration.prototype;
  proto$2.isValid = isValid$1;
  proto$2.abs = abs;
  proto$2.add = add$1;
  proto$2.subtract = subtract$1;
  proto$2.as = as;
  proto$2.asMilliseconds = asMilliseconds;
  proto$2.asSeconds = asSeconds;
  proto$2.asMinutes = asMinutes;
  proto$2.asHours = asHours;
  proto$2.asDays = asDays;
  proto$2.asWeeks = asWeeks;
  proto$2.asMonths = asMonths;
  proto$2.asQuarters = asQuarters;
  proto$2.asYears = asYears;
  proto$2.valueOf = valueOf$1;
  proto$2._bubble = bubble;
  proto$2.clone = clone$1;
  proto$2.get = get$2;
  proto$2.milliseconds = milliseconds;
  proto$2.seconds = seconds;
  proto$2.minutes = minutes;
  proto$2.hours = hours;
  proto$2.days = days;
  proto$2.weeks = weeks;
  proto$2.months = months;
  proto$2.years = years;
  proto$2.humanize = humanize;
  proto$2.toISOString = toISOString$1;
  proto$2.toString = toISOString$1;
  proto$2.toJSON = toISOString$1;
  proto$2.locale = locale;
  proto$2.localeData = localeData;
  proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
  proto$2.lang = lang; // Side effect imports
  // FORMATTING

  addFormatToken('X', 0, 0, 'unix');
  addFormatToken('x', 0, 0, 'valueOf'); // PARSING

  addRegexToken('x', matchSigned);
  addRegexToken('X', matchTimestamp);
  addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
  });
  addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
  }); // Side effect imports

  hooks.version = '2.24.0';
  setHookCallback(createLocal);
  hooks.fn = proto;
  hooks.min = min;
  hooks.max = max;
  hooks.now = now;
  hooks.utc = createUTC;
  hooks.unix = createUnix;
  hooks.months = listMonths;
  hooks.isDate = isDate;
  hooks.locale = getSetGlobalLocale;
  hooks.invalid = createInvalid;
  hooks.duration = createDuration;
  hooks.isMoment = isMoment;
  hooks.weekdays = listWeekdays;
  hooks.parseZone = createInZone;
  hooks.localeData = getLocale;
  hooks.isDuration = isDuration;
  hooks.monthsShort = listMonthsShort;
  hooks.weekdaysMin = listWeekdaysMin;
  hooks.defineLocale = defineLocale;
  hooks.updateLocale = updateLocale;
  hooks.locales = listLocales;
  hooks.weekdaysShort = listWeekdaysShort;
  hooks.normalizeUnits = normalizeUnits;
  hooks.relativeTimeRounding = getSetRelativeTimeRounding;
  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  hooks.calendarFormat = getCalendarFormat;
  hooks.prototype = proto; // currently HTML5 input type only supports 24-hour formats

  hooks.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
    // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
    // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
    // <input type="datetime-local" step="0.001" />
    DATE: 'YYYY-MM-DD',
    // <input type="date" />
    TIME: 'HH:mm',
    // <input type="time" />
    TIME_SECONDS: 'HH:mm:ss',
    // <input type="time" step="1" />
    TIME_MS: 'HH:mm:ss.SSS',
    // <input type="time" step="0.001" />
    WEEK: 'GGGG-[W]WW',
    // <input type="week" />
    MONTH: 'YYYY-MM' // <input type="month" />

  };
  return hooks;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(41)(module)))

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
]]);
//# sourceMappingURL=2.8b65f0c3.chunk.js.map