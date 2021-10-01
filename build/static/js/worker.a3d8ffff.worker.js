/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 1 */
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
/* 2 */
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

var Network_1 = __webpack_require__(6);

Object.defineProperty(exports, "Network", {
  enumerable: true,
  get: function get() {
    return __importDefault(Network_1).default;
  }
});

var HiddenLayer_1 = __webpack_require__(7);

Object.defineProperty(exports, "HiddenLayer", {
  enumerable: true,
  get: function get() {
    return __importDefault(HiddenLayer_1).default;
  }
});

var InputLayer_1 = __webpack_require__(16);

Object.defineProperty(exports, "InputLayer", {
  enumerable: true,
  get: function get() {
    return __importDefault(InputLayer_1).default;
  }
});

var OutputLayer_1 = __webpack_require__(5);

Object.defineProperty(exports, "OutputLayer", {
  enumerable: true,
  get: function get() {
    return __importDefault(OutputLayer_1).default;
  }
});

var LeakyRelu_1 = __webpack_require__(17);

Object.defineProperty(exports, "LeakyRelu", {
  enumerable: true,
  get: function get() {
    return __importDefault(LeakyRelu_1).default;
  }
});

var Linear_1 = __webpack_require__(18);

Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function get() {
    return __importDefault(Linear_1).default;
  }
});

var LogisticSigmoid_1 = __webpack_require__(19);

Object.defineProperty(exports, "LogisticSigmoid", {
  enumerable: true,
  get: function get() {
    return __importDefault(LogisticSigmoid_1).default;
  }
});

var Tanh_1 = __webpack_require__(20);

Object.defineProperty(exports, "Tanh", {
  enumerable: true,
  get: function get() {
    return __importDefault(Tanh_1).default;
  }
});

var AdamOptimizer_1 = __webpack_require__(21);

Object.defineProperty(exports, "AdamOptimizer", {
  enumerable: true,
  get: function get() {
    return __importDefault(AdamOptimizer_1).default;
  }
});

var GradientDescentOptimizer_1 = __webpack_require__(22);

Object.defineProperty(exports, "GradientDescentOptimizer", {
  enumerable: true,
  get: function get() {
    return __importDefault(GradientDescentOptimizer_1).default;
  }
});

var shuffleTrain_1 = __webpack_require__(3);

Object.defineProperty(exports, "shuffleTrain", {
  enumerable: true,
  get: function get() {
    return __importDefault(shuffleTrain_1).default;
  }
});

/***/ }),
/* 3 */
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

var arrayShuffle_1 = __importDefault(__webpack_require__(23));

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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(0);

var _createClass = __webpack_require__(1);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(0);

var _createClass = __webpack_require__(1);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(0);

var _createClass = __webpack_require__(1);

var _inherits = __webpack_require__(8);

var _createSuper = __webpack_require__(10);

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var OutputLayer_1 = __importDefault(__webpack_require__(5));

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(9);

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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(11);

var isNativeReflectConstruct = __webpack_require__(12);

var possibleConstructorReturn = __webpack_require__(13);

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
/* 11 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(14);

var assertThisInitialized = __webpack_require__(15);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(0);

var _createClass = __webpack_require__(1);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(0);

var _createClass = __webpack_require__(1);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(0);

var _createClass = __webpack_require__(1);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(0);

var _createClass = __webpack_require__(1);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(0);

var _createClass = __webpack_require__(1);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(0);

var _createClass = __webpack_require__(1);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = __webpack_require__(0);

var _createClass = __webpack_require__(1);

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
/* 23 */
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "WorkerInputActions", function() { return /* binding */ WorkerInputActions; });
__webpack_require__.d(__webpack_exports__, "WorkerOutputActions", function() { return /* binding */ WorkerOutputActions; });

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
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
// CONCATENATED MODULE: ./src/config.js
var config_config={app:{renderingEnabled:true,initialSpeed:100},ludicrousSpeed:{initialGameTicksPerRender:1,maxGameTickBatchDurationMs:50,// UX best practices say nothing should take over 50ms to can respond to user action within 100ms
batchSizeAdjustmentMultiplier:2},lookAhead9x3:{// wasteTimeMs: 6
wasteTimeMs:null}};/* harmony default export */ var src_config = (config_config);
// CONCATENATED MODULE: ./src/modules/environment/nestedFloatMatrixMath.js
/**
 * Creates a matrix out of nested Float64Arrays and returns it
 *
 * @param {Array} dimensions [xLength, yLength]
 * @returns {Array}
 */function createMatrix(dimensions){var matrix=[];for(var i=0;i<dimensions[0];i++){matrix[i]=new Float64Array(dimensions[1]);}return matrix;}/**
 * Shifts and trims the given matrix by the given amounts. Is useful for creating viewport output.
 *
 * @param matrix
 * @param shiftVector
 * @param defaultValue
 * @param trimVector
 * @param outputMatrix Output is written here rather than returned because instantiating arrays is slow in JS
 * @returns {*}
 */function shiftAndTrimMatrix(matrix,shiftVector,defaultValue,trimVector,outputMatrix){shiftVector=[shiftVector[0]+trimVector[0],shiftVector[1]+trimVector[1]];var shiftX=shiftVector[0];var shiftY=shiftVector[1];var fromXLen=matrix.length;var fromYLen=matrix[0].length;var xLen=fromXLen-trimVector[0]*2;var yLen=fromYLen-trimVector[1]*2;if(outputMatrix.length!==xLen||outputMatrix[0].length!==yLen){throw new Error('Output matrix has the wrong dimensions. '+'Expected:'+xLen+'x'+yLen+' ,'+'Actual:'+outputMatrix.length+'x'+outputMatrix[0].length);}for(var x=0;x<xLen;x++){var fromX=x+shiftX;var fromXRow=matrix[fromX];var toXRow=outputMatrix[x];for(var y=0;y<yLen;y++){var fromY=y+shiftY;if(fromX>=0&&fromX<fromXLen&&fromY>=0&&fromY<fromYLen){toXRow[y]=fromXRow[y+shiftY];}else{toXRow[y]=defaultValue;}}}//Thought this may be faster but it was not
// for (var x = 0; x < xLen; x++) {
//     for (var y = 0; y < yLen; y++) {
//         if (x + shiftX >= 0 && x + shiftX < fromXLen && y + shiftY >= 0 && y + shiftY < fromYLen) {
//             outputMatrix[x][y] = matrix[x + shiftX][y + shiftY]
//         } else {
//             outputMatrix[x][y] = defaultValue;
//         }
//     }
// }
}/**
 * Converts a matrix made of nested arrays to a single flat array and returns it
 *
 * @param {Array} matrix
 * @returns {Float64Array}
 */function matrixToFlatArray(matrix){var xLen=matrix.length;var yLen=matrix[0].length;var vectorI=0;// var vector = new Float64Array(xLen * yLen);
var vector=new Float64Array(xLen*yLen);// var vector = [];
for(var xI=0;xI<xLen;xI++){for(var yI=0;yI<yLen;yI++){vector[vectorI]=matrix[xI][yI];vectorI++;}}return vector;}
// CONCATENATED MODULE: ./src/modules/environment/AgentObservation.js
/**
 * Data model that holds what the agent gets to see about the environment
 */var AgentObservation_AgentObservation=/**
     *
     * @param {Array} tileTypes
     * @param {int} score
    //  * @param {Array} position
     */function AgentObservation(tileTypes,lastReward/*, position*/){_classCallCheck(this,AgentObservation);/**
         * @type {Array}
         */this.tileTypes=tileTypes;/**
         * @type {Number}
         */this.lastReward=lastReward;// /**
//  *
//  * @type {Array} A vector contained the X and Y of the current agent position
//  */
// this.position = position;
};
// CONCATENATED MODULE: ./src/modules/environment/State.js
/**
 * Data model that holds the environment's full internal state
 */var State_State=/**
     * @param {Array} tileTypes
     * @param {Array} position [x,y]
     * @param {Number} score
     * @param {Boolean} isComplete
     */function State(tileTypes,position,score,isComplete){_classCallCheck(this,State);/**
         * @type {Array}
         */this.tileTypes=tileTypes;/**
         * @type {Array} position [x,y]
         */this.position=position;/**
         * @type {Number}
         */this.score=score;/**
         * @type {Boolean}
         */this.isComplete=isComplete;/*
         * @type {Number}
         */this.lastReward=0;};
// CONCATENATED MODULE: ./src/modules/environment/generateInitialState.js
/**
 * Returns a random initial starting state
 *
 * @returns {State}
 */var generateInitialState_generateInitialState=function generateInitialState(){return new State_State(generateRandomTileTypes(environment_config.size),[Math.floor(environment_config.size[0]/2),0],0,false);};/**
 * Generates a random set of tileTypes for generated random environment states
 *
 * @param {Array} size
 * @returns {Array}
 */function generateRandomTileTypes(size){var tileTypes=[];var xLen=size[0];var yLen=size[1];for(var xi=0;xi<xLen;xi++){tileTypes[xi]=new Array(yLen);for(var yi=0;yi<size[1];yi++){// tileTypes[xi][yi] = Math.random() < 0.7 ? 0 : 1;
tileTypes[xi][yi]=Math.random()<0.2?1:0;}}return tileTypes;}
// CONCATENATED MODULE: ./src/modules/environment/index.js
var easyMode=true;var environment_config={//Environment size
size:[31,31],//Viewport settings
viewPortSize:[9,9],viewPortOffset:[0,2],viewPortPosition:[4,2],//Scoring settings
actionCodeToDeltaScore:{w:-0.11,a:-0.01,s:0.09,d:-0.01},tileTypeToDeltaScore:[0,-0.50],getToBottomDeltaScore:0// maxDeltaScoreAbs: 1000
};var actions=['w','a','s','d'];/**
 * The main environment class for this game. This is the public interface for the game.
 */var environment_Environment=/*#__PURE__*/function(){function Environment(){_classCallCheck(this,Environment);this._state=generateInitialState_generateInitialState();//Bind these to create proper JavaScript "this" context
this.applyAction=this.applyAction.bind(this);this.getAgentObservation=this.getAgentObservation.bind(this);this.getGlobalObservation=this.getGlobalObservation.bind(this);//This viewport output matrix is only instantiated once to increase performance
this.viewportOutputMatrix=createMatrix(environment_config.viewPortSize);}/**
     * Mutates the environment's internal state by processing the given action
     *
     * @param actionCode
     */_createClass(Environment,[{key:"applyAction",value:function applyAction(actionCode){var deltaScore=environment_config.actionCodeToDeltaScore[actionCode];switch(actionCode){case"w":if(this._state.position[1]>0){this._state.position[1]--;}else{deltaScore+=environment_config.tileTypeToDeltaScore[1];//Edges are tileType 1 (red)
}break;case"a":if(this._state.position[0]>0){this._state.position[0]--;}else{deltaScore+=environment_config.tileTypeToDeltaScore[1];//Edges are tileType 1 (red)
}break;case"s":this._state.position[1]++;break;case"d":if(this._state.position[0]<environment_config.size[0]-1){this._state.position[0]++;}else{deltaScore+=environment_config.tileTypeToDeltaScore[1];//Edges are tileType 1 (red)
}break;default:throw new Error('Unknown action: '+actionCode);}var tileType=this._state.tileTypes[this._state.position[0]][this._state.position[1]];this._state.isComplete=this._state.position[1]===environment_config.size[1]-1;deltaScore+=environment_config.tileTypeToDeltaScore[tileType];if(this._state.isComplete){deltaScore+=environment_config.getToBottomDeltaScore;}this._state.lastReward=deltaScore;this._state.score+=this._state.lastReward;}/**
     * Returns what the agent can see about the current environment state
     *
     * @returns {AgentObservation}
     */},{key:"getAgentObservation",value:function getAgentObservation(){var shiftVector=[Math.ceil(this._state.position[0]-environment_config.size[0]/2),Math.ceil(this._state.position[1]-environment_config.size[0]/2)+environment_config.viewPortOffset[1]];var trimVector=[Math.floor((environment_config.size[0]-environment_config.viewPortSize[0])/2),Math.floor((environment_config.size[1]-environment_config.viewPortSize[1])/2)];shiftAndTrimMatrix(this._state.tileTypes,shiftVector,1,trimVector,this.viewportOutputMatrix);//Make the bottom exit edge look safe by making its tiles not red
var limit=environment_config.size[1]-trimVector[1]-shiftVector[1];if(limit<environment_config.viewPortSize[1]){for(var x=0;x<environment_config.viewPortSize[0];x++){for(var y=limit;y<environment_config.viewPortSize[1];y++){this.viewportOutputMatrix[x][y]=0;}}}return new AgentObservation_AgentObservation(this.viewportOutputMatrix,this._state.lastReward//,
// config.viewPortPosition
);}},{key:"getGlobalObservation",value:function getGlobalObservation(){return this._state;}}]);return Environment;}();
// CONCATENATED MODULE: ./src/modules/agent-hand-programmed-look-ahead/helper/feeler.js
var oppositeActions={w:'s',a:'d',s:'w',d:'a'};var actionVectors={//[dX, dY, dScore]
w:[0,-1,environment_config.actionCodeToDeltaScore['w']],a:[-1,0,environment_config.actionCodeToDeltaScore['a']],s:[0,1,environment_config.actionCodeToDeltaScore['s']],d:[1,0,environment_config.actionCodeToDeltaScore['d']]};function getFeelerValue(observation,feelerSteps){// let position = [observation.position[0], observation.position[1]];
var position=environment_config.viewPortPosition;var value=0;feelerSteps.forEach(function(step){var vector=actionVectors[step];position=[position[0]+vector[0],position[1]+vector[1]];var cost;if(typeof observation[position[0]]==='undefined'||typeof observation[position[0]][position[1]]==='undefined'){cost=environment_config.tileTypeToDeltaScore[1];//If going off map, make look very expensive
}else{cost=environment_config.tileTypeToDeltaScore[observation[position[0]][position[1]]];}value=value+vector[2]+cost;});return value;}function getFeelerValues(observation,feelerPaths){return feelerPaths.map(function(feelerPath){return{path:feelerPath,value:getFeelerValue(observation,feelerPath)};});}function filterPathsWithFirstAction(paths,blacklistedFirstAction){return paths.filter(function(path){return path[0]!==blacklistedFirstAction;});}function getBestFeeler(feelersWithValues){return feelersWithValues.reduce(function(bestFeelerSoFar,feeler){if(bestFeelerSoFar===null||feeler.value>bestFeelerSoFar.value){return feeler;}else{return bestFeelerSoFar;}},null);}function getActionViaFeelers(observation,feelerPaths,lastAction){//This filter prevents infinite back-and-forth movement
var safeFeelerPaths=filterPathsWithFirstAction(feelerPaths,oppositeActions[lastAction]);var feelersWithValues=getFeelerValues(observation,safeFeelerPaths);var bestFeeler=getBestFeeler(feelersWithValues);return actions.indexOf(bestFeeler.path[0]);}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// CONCATENATED MODULE: ./src/modules/agent-hand-programmed-look-ahead/helper/generateFeelerPathsXByThree.js
function generateFeelerPaths(maxSidewaysMoves){var permutator=function permutator(inputArr){var result=[];var permute=function permute(arr){var m=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];if(arr.length===0){result.push(m);}else{for(var _i=0;_i<arr.length;_i++){var curr=arr.slice();var next=curr.splice(_i,1);permute(curr.slice(),m.concat(next));}}};permute(inputArr);return result;};var feelerPaths=[['s','s']];var leftPaths=['s','s'];var rightPaths=['s','s'];for(var i=0;i<maxSidewaysMoves;i++){leftPaths.push('a');rightPaths.push('d');feelerPaths=feelerPaths.concat(permutator(leftPaths),permutator(rightPaths));}//Remove duplicate paths
feelerPaths=_toConsumableArray(new Set(feelerPaths.map(function(path){return path.join(',');}))).map(function(path){return path.split(',');});//Remove paths that don't end with a down action
feelerPaths=feelerPaths.filter(function(path){return path[path.length-1]==='s';});feelerPaths=feelerPaths.sort(function(a,b){var aString=a.join();var bString=b.join();if(aString<bString){return-1;}if(aString>bString){return 1;}return 0;});return feelerPaths;}
// CONCATENATED MODULE: ./src/modules/agent-hand-programmed-look-ahead/LookAhead9x3.js
var LookAhead9x3_LookAhead9x3=/*#__PURE__*/function(){function LookAhead9x3(){_classCallCheck(this,LookAhead9x3);this._state={lastAction:null};this.feelerPaths=generateFeelerPaths(4);}_createClass(LookAhead9x3,[{key:"getAction",value:function getAction(lastAction,lastReward,observationMatrix){/**
         * This is for testing purposes only. This could be removed later.
         */if(src_config.lookAhead9x3.wasteTimeMs){var wasteTimeUntil=Date.now()+src_config.lookAhead9x3.wasteTimeMs;while(Date.now()<wasteTimeUntil){}}var action=getActionViaFeelers(observationMatrix,this.feelerPaths,this._state.lastAction);this._state.lastAction=action;return[action,{}];}},{key:"newGame",value:function newGame(){}}],[{key:"getName",value:function getName(){return'Hand Programmed - Look Ahead - 9x3 Viewport';}},{key:"getDescription",value:function getDescription(){return'This agent was programmed by hand. It looks ahead in time by several actions.';}}]);return LookAhead9x3;}();
// CONCATENATED MODULE: ./src/data/saves/deep-q-network.js
var data=JSON.parse('{"layers":[{},{"weights":[-0.10641233930463219,0.2285240657768392,0.1499106963379266,-0.2297138519612531,0.5243044233381444,0.13779469694399263,0.4048854749197842,0.44331575053620614,-0.2960553354724864,0.21078195068399033,-0.20572311827217513,0.4070819683175802,0.021477406711542288,-0.17726832359197028,0.22914162228889765,0.1524676521678768,0.3418605048258681,-0.011411844298875418,0.22125515000868143,0.24369486041779714,0.2558041100096103,0.3072376029383397,0.3030595043786242,0.3265960509324497,0.2896831398329576,0.15403845767471921,-0.026814722142198717,0.08342504150592858,0.4176688400878904,0.47212890576148664,0.25617651651697787,0.04869793686340303,0.2943245368723323,0.22822687958664734,0.21601134556340792,0.4044412229623399,-0.15627699117416857,0.5260203138164531,-2.137727240686719,0.4598731991690207,0.2642747928408596,0.14549444274361623,0.17370041657210475,0.28927764967641784,0.061656807686637026,-0.017039530938900795,-0.07681646064403541,0.20058732370292828,0.15371205577811034,-0.030397299766122102,0.18171210326773443,0.03158561432644714,0.11775053749369523,0.27281177176597254,-0.09172632398267125,0.29366984984994426,0.27077922681933536,0.25754069621960207,0.024803881490284355,0.09164089633543693,0.33831772624996387,0.35704423775398636,-0.021503164505219136,0.04047544381210927,0.037494065756388896,0.14073764901838098,0.18721704728059738,0.3347424537700203,0.3375232704404719,-0.13481034903645145,-0.040952730920590895,0.1583825322319078,-0.31025769820345667,-0.1020962894786444,0.0505780925047137,0.3140691358976436,0.27001852265889387,0.1839735203566295,0.2600466698379531,0.25192050843408786,0.05756913934934314,-5.493644227787163,-0.2751394516237191,-0.09069390782346336,-0.14657106077010112,0.43482053415673544,0.3097485899130979,0.00735569004350336,0.4282843892789471,-0.19209781489889025,1.0692449509483455,-0.44449343761142246,0.69870648762381,-0.48169305181731625,0.141156613472126,0.9129253906080596,0.5370107348540494,0.540372970268373,0.501959084562684,-0.1654001254379243,-0.2659320085937581,-0.1238557321436987,0.8314108478668623,0.1298606407888689,0.5887967159069254,-0.09068503679451402,-0.4569472690416957,-0.5507701845546917,0.2091144526670938,-0.0580561038159965,-0.41306618569267295,0.2566428368075304,0.13206747773040453,-0.4905901799484713,0.3362087473917061,0.32492863091677326,0.8617972139276385,-0.5365475514147549,0.03641171451247911,0.6651170813360893,0.7643294400505828,0.1760343913158537,-0.3382838346760821,0.9745289280189527,0.7849011193645493,0.02112445895639697,0.24105655770497808,-0.11502237239375987,-0.3182342288070043,-0.38372479688232775,0.08955413953328975,0.2176800924440688,0.5159798058311476,0.3288208705666323,-1.511302557222337,0.5141198427187377,-0.03522767996287771,0.21521066885975343,0.37821244727431036,0.25691311077476947,0.24058506137342411,0.6056607479622035,-0.3071681744018142,0.4270630021241393,-0.404637214509054,-0.4263580976297771,0.062030582407276616,0.1035446036253074,-0.6162971214841567,0.345151025114172,0.6697920615352893,0.4155299474250944,-0.0647212565155392,0.4697127318660724,-0.044135680703684954,-0.22355039372604799,0.4478674655779798,-0.025153785681962016,-0.27837449093191724,0.2972252814152129,-0.5769919298865815,-0.07381679228750718,-0.022194144138142375,-5.47371126186574,-0.9662907286443378,0.05482951466107876,0.34522969121630726,0.09122702901621377,-0.4012980363714201,0.21470616503166892,0.10199797182030682,1.0907276831729118,-0.7210254882781977,-0.6479609385889387,-0.2980951923909979,0.45072606856769304,0.49762820272475705,0.21595104706480706,0.38629856660001705,0.5936365935587078,0.4394718508403466,-0.19549596542599204,0.18782834207655866,-0.645345904597543,-0.04621974640039875,0.06617157902087842,0.29454694872879283,0.11683656556723217,0.07582976256773569,-0.24426420513403257,0.14839916747099965,0.572915499555036,0.2161492595879236,0.3625462884603765,0.3599582323603421,-0.2203163426635933,0.45213133631636027,-0.593437792424314,0.2132015384583992,-0.3723922437914459,-0.20288396557744082,0.8374953588503982,0.6543070828211327,0.10945591506031307,0.1486987809093504,0.24616648753859233,0.14430760814842167,-0.28046259001290075,0.16660032510151068,0.22056872763468002,-0.14750223004585641,0.29903144541032467,0.7520724353612955,-0.023730495091449397,0.24894600626509283,0.17379149793115334,0.4832261003130345,0.3057085036659246,0.20363989960350087,1.1531391419123835,0.029851942774853712,0.7395242929435326,0.4220443438737631,-0.27602925814761353,-0.20929466981694503,0.10109271057418495,0.13477646007020969,-0.12444869715747701,0.2716272166720833,0.02660883543386627,0.7078925115174761,0.7905746120939778,-0.12727908284496214,0.4242183100825219,0.5620033692442765,1.0004859976799831,0.3765263355611205,-0.3700988744007414,-0.17582130980012084,0.06613774106187109,0.4487557097781703,0.2828308498739597,0.3671486583249476,0.5427407651609056,-0.04443196398286418,-6.661711089921347,-0.11562288827707769,-0.2815081445070303,0.11636198716498919,0.16865427505538003,0.19254733198688026,0.06352366769822967,1.0836703917440693,0.3310245645633314,0.5973799374319181,-0.6923661625648694,0.05516294142545261,0.03936449850634484,0.026688992194644396,0.16207150947199764,0.7242839187860474,0.4444863523523269,0.6120226898164509,-0.7796047603040789,-0.39104809604788465,-0.8593147979017811,0.1532873100047231,-0.042389262434960065,-0.21866993226014012,0.5041377115444533,0.6779024975586602,0.026823312114318158,0.6460123763943589,0.5095966494273994,0.2094010226399073,0.34108803602894516,0.6067725238145082,0.36616202843472545,0.3926584393029707,0.034041927862420426,0.595968246372769,0.6511389003817638,0.1277303619181532,-0.15706212234733552,0.4981676171219442,0.5714770303134988,0.6474619369092239,0.5243499703074816,0.5552346095589161,0.14683798277354937,-0.05870795599004473,0.10507231035504185,0.03098123697716166,-0.16919379294339482,0.23327338665892697,0.48471267924551587,0.017786815394613475,-0.11464265671726595,-0.03307991967826789,0.3878978319066875,0.5159952897912641,-0.036235531234760913,0.36301960530193583,0.5627710707371917,0.21226090766389258,0.03575955321923297,-0.08048843143388607,0.06118708403020921,0.5559579486873191,0.35901974154073196,-0.013460285792735203,0.34742423181401166,0.14693885836256643,0.4413077648448595,0.14848367856934622,0.3716801151403251,0.09701387055960581,0.049605810799026866,0.20962895709970417,0.15872624739763147,0.2920576334126002,0.2735755546800945,-0.2215701647651021,0.3743240303731351,0.0036620888357942203,-0.1963272556601327,0.32892256020637944,-7.449968972177396,-0.327189523046552,0.009903635375308523,0.6269763752162931,-0.10307827601891881,0.6009065095566333,0.15517375410703682,-0.04671077078584575,0.08736963447687905,-0.46882820242736933,0.1550398571226616,-0.0015110666214160858,0.4725114346735418,0.4632495543590848,0.18836209989221617,0.16392841470491437,0.0570510988399869,0.25091097891030306,-0.21392830688550238,-0.06794877146144362,0.23997202308667687,0.3058407307555873,0.18056067421283084,0.35360255731289436,0.6081220238577848,0.3672071410218765,0.4415724165463575,0.0549404673665784,0.624172471421901,0.4066528261859862,0.45996951020978133,0.319493685337424,0.10511453658950667,0.6032862631668342,0.3427158864176159,0.443300275377951,0.5914374299008414,-0.37864025491607944,0.6218153764614591,0.43190697685232227,0.7306222285196076,0.6396496794194478,0.1285812077799614,0.37800487112198117,0.5314741179386613,0.3318503196780781,0.2965034744415542,0.1232621700629043,0.28850354643172443,0.15427255467946324,0.24985839725911246,0.21463072978708359,0.43832555621808117,0.5718154312140838,0.2690987878683161,0.0903059181720834,0.17455611093593063,0.24929057934918336,0.03733679174530257,0.5639011311270581,0.2825960543018628,0.1478514783480898,-0.033676580784166577,0.24340776961626104,0.0769843192970573,-0.12279340645127908,0.35527219523053105,0.4389363598296927,0.4501785510430018,0.2720493003301931,-0.18539543863712976,-0.40600895616220734,-0.07479530390417334,-0.29225159564391306,-0.3287907627447577,0.0293113128338685,0.14710829147795945,0.4106675700060241,-0.022155905264727868,0.27888384727131066,0.26206369233503435,0.24061736174831902,-7.4554841633339795,-0.17721577634133273,0.6823390517799742,-0.46409618826408494,0.6550511163365507,0.8226690515178751,-0.07125644640883727,0.26129876536503,0.05536393633766389,0.599136519532491,0.5176265445065891,0.01658157427963212,-0.8120679796524579,0.08704135368733207,1.2891370891465808,0.17253047777686545,0.07823848802651386,0.6343420189935209,0.8539921856865268,-0.17732794187414383,0.5599233264967384,-0.044489963150535904,0.23504527995682162,1.539843215130614,0.9836942764937651,0.3572070671661106,0.040563258002626584,-0.19429063867693264,-0.281087292516447,0.17351717980107922,0.37713835626391257,-0.33091002322188623,-0.7806479715757505,0.9068006767391348,-0.28790619963188674,0.43543890555416015,0.21358255006526972,0.004317835007294153,0.1417272085885217,1.3646888817678506,0.8253542429567877,-0.0288427723413998,0.5607236844626224,1.5241889943516607,0.7223961433193052,1.254941878400477,-0.5537477577282217,0.576998094613924,0.05162174553122573,-0.013714061710266862,0.03947468339215084,1.061770118747054,0.6795699581966992,0.9322046942698631,-0.0245672357740808,-0.30167361074019744,-0.4387290666435164,-0.1768654227409185,0.03327561748767932,0.7409351699364435,0.06207555166244243,0.30891498561941677,0.22652636167679735,-0.21863593836220196,-0.8909876353331319,-0.2002701978834881,0.4933813740622249,0.5133236628284437,0.12591358084601814,-0.520923304587019,0.1864396887190755,0.650850345782739,0.27487734312354767,-0.7667511566125261,0.12276489283077394,0.8855523666126023,0.2148793870584793,0.6856805126514381,0.5596896867994449,0.5987324347136468,-0.6537082191887701,0.8334827515289335,-8.749541294256217,-0.32708140560938587,-0.5155577987491637,0.11391817353352339,-0.2568404528487948,-0.22838063568618433,0.1277401772683493,0.05687475102312994,-0.011988433407690482,0.4292823390288729,0.030529493395290083,-0.8747690804399113,0.14174812259127387,0.26622184136815746,0.16990322009041553,-0.47603530050531345,-0.09941256794208496,0.2170021279581622,0.7212591651851327,0.24376778800595067,-0.14046231327280445,-0.19503943761796644,0.22202904711829838,-0.062338727699860534,0.8115573107598646,0.6157167500776416,0.3940406732628115,0.8866631996887917,0.3062584168127336,0.07633312366579392,0.31425608396398097,1.1448257829884065,0.2615738668568356,0.27066453894766596,-0.19187514094923733,0.08294118214977321,0.6555913812129441,0.16174585562018853,-0.20306675947314753,1.2442816953694884,0.7277753722407616,0.40712866185312774,0.39371946338984143,-0.1355166082564225,-0.4230384913969207,-0.24035382778162986,-0.3420436749335481,0.28152354797825835,0.3939672740261642,-0.458195384971729,1.0940083297587946,0.9468567715937284,-0.2129306202468882,-0.10093876520150483,0.0013145665025488743,0.057725086370188916,0.45938894558083565,-0.2336245264158818,0.05677901508188119,0.8875526970500701,0.36820143873143024,0.27884802169507794,0.8876317855956665,0.6125159207026583,-0.15553559859099012,-0.8037221178600424,0.2647206021738638,-0.03860984214725645,0.1926510896663838,-0.3608476982564866,0.04000045450173656,0.8194500371333153,0.08259823759913261,0.15389215026440328,0.5062085782141061,0.26329683623259925,0.37197820620627403,0.2838948228358855,0.4459331229128483,0.9445847510319264,0.07167284805839944,-0.04207289917909699,-6.923867974105616,-0.023521772419856368,0.12254619380002765,-0.4207129476951807,0.026044991380867393,0.503725645924793,-0.29557592265924265,0.6198781832320928,0.012771045056058647,0.20865002779673997,-0.36603956589351294,0.08548042053213643,0.2543983847850918,-0.6031067923218337,0.3788775290861095,-0.14408064132075113,0.4926677282950909,0.20933938054867565,0.6839342169045236,0.20448336868928554,0.7635902662184493,0.5119041100669852,0.09405313729065011,0.2545666467244017,-0.22628502638203052,0.645399575946033,0.8662640269273543,-0.3780390264639816,-0.23394896829072595,0.1937725009270221,0.8484080633666357,0.49372536054404975,1.1586097695758024,0.5383238003710727,-0.03193671241328058,0.4687658554233973,0.22082464390365059,0.08874007028525777,0.7042549854204092,1.534119690624902,0.6981154578857628,0.43067122857936024,0.6644339971687336,0.49310261053686455,-0.3422486611733372,-0.4084610879615205,0.034009046378360296,-0.028731804978831123,0.3606189637897405,1.0657193578306856,0.3327862399881444,-0.44005859385422574,-0.2893454094943363,-0.367789215624343,-0.3371965716579647,-0.529529575842612,-0.6445108407287486,-0.16882468773432532,0.6356144400646635,0.0841398865647095,-0.04644497039103444,-0.17553170926049796,0.6349430360855658,0.8399509952664543,-0.933164870699855,0.025244262441714214,-0.3659326761984401,-0.40079032173540224,0.07109261068859811,0.4459215189133333,1.0432396698047233,0.4459195166499347,1.001289992175773,-0.5393032664025362,-0.16120568129209567,0.24388332375190672,0.08640171962145411,-0.1580261186457678,0.21561617810763523,-0.1343992137082371,0.5346430066913275,0.814671282662323,-7.419977244282782,0.059376208789964004,-0.24043377438556826,-0.014828515539763195,0.16857232669918265,0.19976887082623582,0.12089637687642175,0.260308972701909,0.05773225308560416,0.16183869661450992,0.18538097144635524,-0.11310405617599242,0.20146685154587443,0.007824963320289447,0.2775684985915421,0.35736900033920227,-0.19195258426775108,-0.029353300611501508,0.4620512790065329,-0.38406922121751996,-0.046071025748394584,0.23958608337315426,0.04981222687263974,0.5152248878794474,0.15523801698496908,0.14189679735456653,0.3871909916121491,0.5129374704711739,0.22159293161186494,0.5599651389145858,0.43995804786610176,0.6981667809254387,0.48356823731312454,0.14250194511827854,0.4065228672683437,0.4896215044663161,0.4108089785230896,-0.5867954390667882,0.26300539357472846,0.6947129065033586,0.5458167699674497,0.31798519298369443,0.21092599304704376,0.22654241793068003,0.4987250675026561,0.4183686533301499,0.20213816679718472,-0.02000238051260151,0.19787237324250467,-0.028566900816146133,0.43711507763984564,0.11925612958309062,0.32634363555862744,0.24463554414049424,0.4626536805689302,0.484570112710395,-0.17334893319552275,0.570340294016095,0.03524121300208438,0.34764210687163993,0.38461023948762935,0.30090138544535056,0.6462507736757958,0.0629453555765172,-0.17367656855268368,0.0005108644146304972,0.3071514677851495,0.5662238650128129,0.28958351286072925,-0.12032188188932137,0.33089788734539277,0.2727376268196267,0.14139623664803277,-0.2577008481638351,0.18655397842716492,0.21570092142190328,0.23438748307481952,0.4373081054498835,0.008776568088050423,0.6338630142492477,-0.07920654416805584,0.36188470893069175,-7.803274334296147,0.19802706421682256,0.2746415597537648,0.011382604677213401,-0.17492548660314322,0.9227112560501549,-0.8386163208260072,-0.4579459048903725,-0.22032659489626658,0.4431013406429111,-0.304845159622291,0.1374541958236706,0.5168056143509125,-0.017955392414303682,-0.46929332731599593,0.029680404665481778,-0.27360163756688427,-0.3102136507708997,0.16439009855064493,-0.2516862517946983,0.211224037046528,0.34280882595036194,-0.18216727501141078,0.48288613001616476,0.31272016666389885,0.7301882873594466,0.6593383046464202,0.4493146630772301,0.04713078851649098,-0.6959091279942715,-0.09848130670338431,0.9388314200667375,0.5830519880587693,0.15132479189473644,-0.38514494453990833,0.7756445823224624,0.1937843605805966,0.9908296857484178,0.3164822331740115,1.5301312610422242,0.03273556505212948,0.7930116730809029,0.01472450389575513,0.506954427756561,0.36058879093002233,0.39878644663748114,0.4624761628014593,0.07542225972260426,0.41149471362600737,0.38880004614311486,-0.027207562113412135,-0.0469364141612318,0.274279951302148,0.9157125833249533,0.6381116684002707,0.4255750736401578,0.11531429262731352,0.45983926228908223,0.3839867604144681,-0.3009858409312125,-0.1311230960135725,-0.3574828639394046,0.5798878476256931,0.4599733417618387,-0.13090516385327464,0.2097868784999681,0.016012250588295966,0.8929644172736033,0.4954026854565276,0.46225732988751217,-0.16725093061949586,0.20499470527511174,-0.19225852773505867,0.05509252076542724,-0.09845816533696963,0.1289863553672546,0.4629279421304614,0.20741973019461976,-0.036259072417035555,0.17318532308596157,-0.42508739410231,-0.14443731421318093,-7.36195039211477,0.08954960551894836,-0.2510270854233696,-0.20263462186960388,-0.20909974103185508,-0.36754915296410584,0.01905968169790945,-1.251136714716348,-1.3992895780730747,-0.8893122085755247,-0.09118797631432227,-0.5258036475686694,0.09568146094573071,-0.6426388363633664,-0.6222117546181627,-0.3902758832889751,-0.5993508830840524,-1.3864704244414572,-1.4472067625835996,0.5298914592843482,-0.08158387628214007,-0.4361906638896939,-0.39208984017769644,-1.0491018278955677,-0.8933325799061741,-0.5768063326020774,-0.37774427218090784,-0.5227459512272441,-0.07814088742906315,-0.7398576050491963,-0.3271376608530888,-0.3250298774007278,0.5385503010572048,1.034259359372168,0.46998102539029757,0.45137728568192564,0.3735886806666733,0.10184927385757872,0.9968728256322321,1.7506488601475352,2.9110301874049886,1.6061254073302886,1.1876742395551623,1.2094616680576875,1.2196520907101835,-0.726077385536881,0.4892501042763697,0.5954910581521301,1.4449822995487311,1.4775052493338183,1.3707427981539768,0.5690438613598131,0.5546703773161432,1.5661863470024617,0.5840119112422482,-0.2997428795806326,0.02897628549151243,0.09820700533041402,0.5857788322629447,0.4689822089746073,0.9735450391327163,0.3263207810873522,-0.10424525894281685,0.19852994836946508,-0.43579422075972724,-0.42354989274193466,0.48395328028503976,0.35315640180703023,-0.4480441452025214,-0.04692004122647926,0.3189853157697891,-0.8931412744505475,-1.1642442323699478,-0.05791338734345213,-0.19900652359519955,0.1570759193998759,-0.9098397104937663,-1.0142957826595451,-0.8542763701746197,-1.7504455219921602,-1.114784427243895,-1.50464060972712,-6.693291874605647,-0.17656604400170972,0.27283660692391176,0.2434384140175848,0.2886480811502405,0.3307058465925588,0.4204674196732042,-0.1439787366837999,0.32227155278562414,0.13468459497250498,0.2889330743230232,0.3985268682929773,0.5229638049109008,0.14150636620997914,0.6653382928088633,0.5043725260107622,-0.08803394453082387,-0.09448861080899104,0.056139429949323603,0.17250298969122593,0.3513480223513179,0.4199668238570122,0.6955291340706313,0.2827799314404189,0.45989935243518676,0.22187098256583207,0.2166990102790487,0.14758550861771416,-0.034066590838961734,0.4817732275028767,0.15321930407075235,0.06710523170396342,0.2810278571117333,0.5282742234985094,0.04078156908138054,0.36843644425354743,0.47297048292555527,-0.3664620978294207,-1.4978847706141338,-1.7037385047932685,0.6303905807052378,0.36799091727471356,0.11094712381716945,0.21589221045585014,0.6494191803037421,0.6049655848192317,0.0014583182996554523,0.1786785745638337,0.15923502447610738,0.06486165910517684,0.03740579511897857,0.44016603802135573,0.14520520540649237,0.24448733231941297,-0.2504137592485319,-0.01901996502131911,-0.011521611600971354,0.5251370723192551,0.4779930741989415,0.6446769255532053,0.0218391496943807,0.30685629851259955,0.4725496379942543,-0.00917636563997883,0.3594736966299863,0.05462658442192309,0.1160219094476341,0.3106470720423797,0.2344760029505606,0.5924091289365061,0.30649123831350494,0.2834211116956002,-0.021606440809847204,-0.18453864795769367,-0.03801445508259385,0.283753443107165,0.5647344247532319,0.630703153376202,0.326496490349925,0.366120874405471,0.19350669937039006,0.31853079019485947,-7.731075612255217,-0.06871047322986219,-0.041964711141093784,-0.0020725481453243337,-0.11098228478461443,0.10794465518784195,0.28791214059788656,-0.2538856808707925,0.37668220826210974,-0.0007171831301894249,-0.11216688897096413,-0.3280738714513777,0.06301141472980545,0.14626893631423402,-0.007579906555081519,0.46056850246172604,0.23217347497048055,0.1585086765922475,0.4092070713835865,-0.3960416383308959,-0.2246443117129791,-0.251927582981863,0.48433645318417073,0.21603052701671785,0.03877393906383096,-0.25997266025349136,-0.12914695114776786,-0.0686422327094414,0.09047936719536756,0.09431494475114506,0.08216991927785076,0.13397550322855103,1.2716259330072457,0.6578489468090276,0.09859669120671322,-0.26284768337032083,-0.2048707127227072,-0.3053828478554614,-0.10230987163856196,0.09035199821303319,-0.4211015497377897,-1.8063754728899588,3.0001845111515255,-0.21926380945323107,0.32066078013090993,0.17556056181975818,0.01536625587764716,0.45821959794221845,-0.4302576026781236,0.4897836646807494,1.018093660909465,0.771276986186651,0.2852288252864107,-0.18079726022668577,-0.2122034802043411,-0.3778826529870252,-0.09838832037461802,0.13140883388628266,0.5530876763307435,0.40736191592556814,0.2169326167368319,0.2603909954753382,0.1225762401712058,0.06759998528749775,0.10832864340978414,0.016711944234849584,-0.5704754001284259,0.009042669828053821,0.06711017398478396,-0.08042275355486482,0.32952586210198537,-0.15284037189738667,-0.07396023208986079,-0.13682261183689726,0.12232721346336946,0.11657101996678,0.04257673888725414,0.3648657543400885,-0.2396145829513396,0.5279929995144643,0.20326230052916527,0.3903718555037433,-5.3742812658630985,0.2809687232536721,-0.1381858702903119,0.6403251360410059,0.6778435262179647,0.35652109944767074,-0.15061233986583228,0.4732036390926888,-0.22386136838489312,-0.22439828322793315,0.5355469764809988,-0.22692888706848485,0.6791724576184935,-0.3391271693043849,-0.02267058023240041,0.02439396697897681,0.1673683217963027,0.21106521879603324,-0.49182588354418316,-0.5364602214433103,-0.3797768281810974,0.7514622880313085,0.5622521718423336,0.010745856516774153,-0.1599895492521939,0.13347719677995137,0.24092999985124464,-0.17813527403562587,0.4661926970178813,0.21889084031191997,0.7398009342148535,0.5291011747598542,0.4259648596799572,0.3759932554302709,0.23977064346111052,0.11416200505678684,0.23812779634352216,-0.4872438424956752,0.40295580298982925,1.0141391411326892,1.0550839224615343,0.11873928819258137,0.6952877819063643,0.5841960904025089,0.9135813618125953,0.7554349581653449,-0.5138224763989756,0.2497430122537313,0.4229976615188811,0.27691065821302635,-0.15388029335890024,0.3699428256447957,0.33549447372809427,0.41028959825666106,1.037957246362705,-0.0706348369570502,-0.1406605194626773,0.2872575882665133,0.4921222233638621,0.33832086652108523,0.3094627843210893,0.05990632338013165,0.49073088635815215,-0.4865474897934221,-0.0815841668171606,-0.14355784081978415,0.6440572602801121,0.11281077467393244,-0.20030393799357582,0.08295844425600711,0.31385875847730665,0.6196462435144102,-0.2687323717870685,0.2507562094975162,-0.41984509569923983,0.7538942388325998,-0.2606329167112934,-0.14733677625863506,-0.36050487419121907,0.01409294528213497,0.279580212398733,0.8636581511893424,-7.119172553674466,-0.26367657370333103,-0.5464136191951537,0.5229963136013395,0.5477700039354919,0.8196765055557156,0.25373807979940405,0.40498778293273163,0.44627919121405973,-0.7114479937544655,-0.0988903822586082,-0.2604026346968289,0.19105354722389106,-0.303630661185702,0.1913567838934096,0.7771334452584813,0.08047156142715173,0.1222386999279944,0.3344495134715264,0.12520253997539577,-0.2722846826006353,0.013128915023759678,0.17214839155479522,0.30407704149224307,0.6515327673766009,0.4530556761325154,-0.0803341711608942,0.7839715268166271,-0.3002248637269115,-0.9785558879170791,0.5476055845927188,-0.3723767785261008,0.3083710390104788,0.3243362305687465,0.6707752575465166,-0.03146294834879166,-0.019004101720925155,-1.2031526510784958,-21.743670211636324,-3.3827837766979245,0.547430157620586,-0.040815612092071754,0.19966139296632915,0.14070086284322728,0.394913368372084,1.0934312842508824,0.0975378391073728,-0.3682772675209165,0.49124754471371856,-0.3356358764217975,0.2740173720326041,0.19787662235089254,0.7904618934768802,0.5164548518912697,0.014969576827064048,-0.15537718099571832,-0.5744829819086253,0.3835106120780521,0.4919038153803862,0.4911742663367876,0.08480497462771819,0.5833217595102403,0.30700666451976233,-0.05508442504283868,0.5060698354037957,-0.06037911257999255,0.6572199010002385,0.28975348272019874,-0.04159135667804623,-0.05468750002393536,0.41599595592960625,-0.05665992700793838,-0.051566945178215216,-1.0532728186503375,0.18567371344233558,0.7365955710567391,0.019379509532128476,-0.18313715201355343,0.058970470903809726,0.0829356315420789,0.08970070873979304,-0.15248405915868302,-8.42510359396222,-0.23956183400718853,-0.13809531423066246,0.43117508501978696,0.34385687403767046,0.5158967667058663,0.49054101943697176,0.39370600717698395,0.25371260793079853,-0.6156954321775417,0.1974571137871981,-0.001246864254190419,0.44773442092725735,0.2685295557239485,0.10736674164507691,0.40926362239636416,0.3162512382549625,0.05495863509258173,0.11962194927304891,-0.2714223731498248,0.17464574007956038,0.1441455483810439,0.34693963805718464,0.33857480626517594,0.4176377037955607,0.12597985788690613,0.08209525742034435,0.16153960613776863,0.25515998970687803,0.3380034684920843,0.6677034024954162,0.11395934325504124,0.11237570360546577,0.1421355249045787,0.29905185638553805,0.6461554799126523,0.6187320175079505,-0.28109679749425076,0.6626018870232134,0.4770444586350546,0.4775572580202896,0.793144173281982,0.2426250063638287,0.11970737369606786,0.32517026860597353,0.49971917477008976,0.04766598657702075,-0.1918273988510464,0.5640658060451701,0.16127177587476826,0.3004871685827917,0.48484588452450234,0.261332174369339,0.3792294380700027,0.6336747231108403,0.0523830394806655,0.42540203849369557,0.27746762290566457,0.22596410366726744,0.3691630194045378,0.48048624178020743,0.4243265977071104,0.27416922141029915,-0.010914744882537679,0.023968358219547032,-0.07618542866847855,0.4288767701713981,0.29489804513568585,0.2762871465464317,0.4151651661922277,0.23706478644920254,-0.17162629346940045,0.3496269097061392,-0.0477873669933753,-0.08107723217897958,0.34647563121520736,0.16553856866174632,0.10338906499299642,0.13699479357117245,0.48634035418383004,0.0669852564345926,0.3382639513451339,-7.526073937992138,0.8936106200081515,-0.3869821125913229,-0.903589769007035,0.12481217614414863,-0.3159756923377199,0.5790340502036823,0.6865622218139823,0.26576234396874676,0.480080913654639,-0.42998128192295326,0.22570263824980405,-0.008728524765324196,0.553191855646323,0.7953332479506223,-0.38589784400828947,-0.533106029696742,0.7156259781757558,0.3424223575285827,-0.5422366838564117,-0.07533322233495053,0.5323478690587152,0.7613130964286446,0.14825910024825112,0.940702508566825,0.5014573784132257,0.8292926592145391,0.8444626977941686,-0.2507923343636726,-0.3223181192450328,-0.19122002565341156,0.3808958533998427,0.8251639658979419,0.23434788061892067,1.143658415830747,0.6923758111088,0.9877100706223045,-0.24963859045320688,0.1549501749025984,1.4735677851870579,-0.027329492014102567,0.15453896428202477,0.34916822935803776,0.01793669868601452,0.8929355513035481,-0.580571745874511,1.101179895046004,0.04173730202264095,-0.30065897794912116,-0.3170735288970791,0.2745563636268127,-0.18457711645813127,1.3807514828170857,0.13325655371121115,0.19153576869522726,-0.14012580899960217,-0.09968305059076384,0.14238590062507858,0.4482623407063456,0.32089505590198986,-0.015256820474573557,0.1566057483413818,0.858802055281695,1.0146999549538198,-0.4202950353915975,0.49123363629434236,-0.1350159461209249,-0.03281678170857179,-0.939294123691723,-0.15746670435774368,-0.7541863729833777,0.27330958594199667,1.0884898627610915,0.2167098958476959,0.3117584930848581,-0.24345986131297853,0.44548019848840126,0.9721429555341196,0.19890921626075214,-0.26112159199299934,0.8038781748242029,0.35340416284891324,-9.3027825643838,-0.20600108792085614,-0.03275087925251064,0.545766756304181,0.23783272760682936,0.5138354081928479,-0.02451779750698319,0.11550499550179369,0.21404953974289165,0.1902986962243278,-0.13672383159803844,0.05063357079583129,0.28096072180593035,0.41157471729600764,0.214594170543896,0.0033099728981745144,-0.034129706242254886,-0.1936814691300167,0.2305072725548864,-0.08236665131775037,-0.03104820443074069,0.36716601388434034,0.8683509646389209,0.7619668405647562,0.4291110657840105,0.21111985895187457,-0.06116332200436682,-0.19605604153479075,-0.1061007378148947,0.20203108381667312,-0.426613705881319,-0.32662940274341434,-0.161723862158766,0.23404644303120462,-0.16458712380863194,0.148425991612526,0.25076945299303627,0.4062920876843217,0.5163270227864405,-1.2430736963433429,1.3022948419046876,0.2499818698212192,-0.46336629230025106,-0.06609541908213898,0.28968971946853334,0.371397358440891,0.5656514341479995,0.023352082086471947,0.22395383179897027,0.20460759404902432,0.2014681672147307,0.6014701322488729,0.12203349394815814,0.10796180111700085,0.2968347423750486,-0.16836923483507502,-0.023041127155228897,0.3896905194751129,0.5183102935503096,-0.03418370206865357,0.3015830812535011,-0.12524627054506288,-0.23486997367113918,-0.13883747291063234,-0.17869882573537063,-0.16968259048395412,0.2492634286691753,0.3999567438018894,0.32440013851137495,0.12937289984821898,0.1653613189778395,-0.13127411351717733,-0.39208300510818056,0.08254259901098207,-0.1725820252491688,0.35958625734640404,0.16621277605484341,0.25188807915735967,-0.33841235576089584,0.10871663773297569,0.2539242745073691,0.14011601997114936,-5.674703154219196,-0.47428489326968526,0.132602429275039,-0.0780617382017807,0.06287443037176997,0.2258217913457729,-0.03184501195792991,-0.5326086547856375,1.1712941590417056,-0.08215570917762448,-0.6313645446721672,-0.39848449580533873,-0.07807166371069883,0.1347984003310788,0.4032175456132902,0.3297316660305621,0.5467913200284519,-0.03992615754312206,0.1302043546230076,0.4418866059561727,-0.04620361399307931,-0.49707860539154597,0.7129210031002613,0.6798029588260622,0.3129956588563773,0.6709166988933993,0.675105686658157,0.5716912554780684,0.7415723378044314,0.00717927549527632,-0.008616047336736855,-0.19867437289885587,0.07092593759748976,0.25621526364420943,0.9347128724355127,0.2291410321407009,0.6945501408546308,-0.2917808668412362,0.2860711699872297,0.9364170275354479,1.0978946424850227,0.2951961694479979,-0.22359465125442585,-0.7578238737442716,0.09162727942311852,0.1399240796848707,-0.1922728797682195,-0.5343392077096083,0.19579050779286344,0.7620595272743932,0.309112839471502,0.6974546143695155,0.8072656772802229,0.6539309353073598,-0.39179543187899385,0.20720931519024596,-0.07258368499393725,0.2366496409347603,0.39810892751168064,-0.40593034204771217,0.4076602916649476,-0.3802195698020808,-0.3955692479477173,0.2700989021786154,-0.8080652859713228,-0.5431492047277382,0.6625448748765008,-0.49015524097954705,-0.008326322723325784,1.1616819681096493,0.18092022825613868,0.6493664009210339,0.45103977784314425,0.7130883022850931,0.6302881844299353,-0.14352726310732605,0.11502964799342218,-0.14136069411825025,0.3110806535496527,-0.17751231745915896,0.4612225022857854,0.5211068243739964,-7.321402706507628,-0.2682888603481861,0.22788678019527928,-0.3409253295376445,-0.03955477588881141,0.16768970812330627,0.5456631834234944,0.5855834367771582,0.7592911383675002,0.0008399755775207601,0.07432322041308642,-0.018502656034710633,-0.40824124456702315,-0.23467813117554193,0.16098905622524431,0.06473856719661372,0.09460598355683085,-0.04912568911598388,0.1583744086066242,-0.06405371450022364,-0.18932191641279955,-1.1371970270371508,-1.9664778107773897,-1.4677586770683726,-0.5117026490475005,-0.842610450487643,-0.7398852085779299,-0.07693607391008828,0.18824673588407978,-0.3830118187330726,-22.473265432245285,-6.349365026866164,-4.001710752868815,-1.8785913354094335,-0.8416152060003267,-0.29910076523471607,0.24212649827963495,-0.21945637119693756,-0.3882111587396169,-0.2505711796132924,0.6901936145593534,-1.424726657031397,-0.9054603852175134,-0.6026307924696712,-0.425331197626434,0.27839831129116155,-0.16183805663201706,-0.4764851948720291,0.9729238683754292,0.46219761960533445,0.4543795751377946,-0.5097565361699737,0.39992479251702134,-0.04784204145748233,0.5242737547731495,-0.236436617342294,0.020028633676046848,0.754568412138244,-0.032576525921876494,0.2311907928228991,0.3911320216967562,0.40404283747310676,0.5218609286414156,0.7598954142358613,0.4165842265139615,-0.07398533892359457,0.4103836773854727,0.4143044867218845,0.2112420534864966,-0.06046038623613831,0.6219433082687462,0.6156779164729907,0.5485714669161456,0.36156016459784923,0.3296838111790212,0.304861466772863,0.15630498098647813,-0.1302613766861333,0.12974643655674936,-0.13971781851574755,0.10309821027111597,0.24130998481994248,-5.3672345488544675,0.10375099998019094,0.5215867800572168,0.48271872456456033,0.025883451563997843,0.5967222664623691,0.3180565789606194,0.4340471810574977,0.6524455498819599,0.033573442963933706,0.05690527400256564,-0.0031498334285084903,0.2740534251683252,0.36490706827522157,0.533494299499779,0.4620767018677694,0.41839417116336225,0.41918288587829516,0.2004792694122836,-0.15005859499039959,0.2992731326700334,0.39067401632837834,0.19566296355920215,0.15657211772884275,-0.03543560999753806,0.618797719870818,0.16735703223044116,-0.19536483299774027,0.3090056500941705,0.13897222686602112,0.504254304693844,0.08127804412089586,0.27389423602398727,0.10937126494334394,0.13973583976002646,0.41769421873608625,0.4181266548455859,0.26478294688246273,-1.6077650641150933,-2.1539832192728494,0.5924926803967961,0.6642295452193281,0.46122478716998205,0.4152080499654934,0.681749056447854,0.22360513269640167,-0.014006962595205296,0.1217084663346349,0.1546375899478868,-0.1452907935094449,0.18268518666235342,0.14291242795350645,-0.07962603490805739,0.19219816393107592,0.21391906380345926,0.1416634468302611,0.4101710729928283,0.5682312299499152,0.4107738708752639,0.0897824942876874,-0.05879367747025775,0.3247680564038057,0.1724578890602157,-0.2199777808555128,0.24166848451949363,0.2721297295169929,0.29836159365449294,0.00737346895769208,0.1685439791370346,0.6197726309245627,-0.1506107249511504,0.02766751430869923,-0.042431756043019665,-0.2518566442614981,0.03400102258364231,0.2601316132172649,0.5139751908434324,0.3142849137637137,0.09206010122583395,0.04495794305663844,0.05054281694721634,0.2411364986590818,-7.1820120461897865,-0.0817035807217167,0.08958269048009816,0.3932756551115336,0.183962619446477,1.1971897488302699,0.1669089617673714,0.590311092788314,0.4551405696697906,-0.3565294257232497,-0.029545109566006228,-0.16423478747036524,0.3664700216359802,-0.025912371575938915,0.09761329626794643,0.1468248641714308,0.464101296646221,0.04008669862710413,0.8649511039775009,-0.2116474810826038,0.11524441117323032,0.045310346831421815,0.12354160394629286,0.0497317516725131,0.08180474937433088,-0.4683908214302757,0.842097687265327,1.1060856195963737,-0.6384755473401338,1.0858968982677994,0.6711154231916955,0.5527964304954835,0.3207140269045137,0.10243798470501721,1.0618105668663038,0.012552681797929365,0.3059328404784372,0.10648930836017052,-0.20027163899161504,0.797250266551807,0.3678039199766515,0.7947025757360249,0.8109232381680624,0.8574584984345409,0.2617842720913348,-0.6032453761500775,0.2551998363543247,-0.17483078725280207,0.8072787669456402,0.8486023094476942,0.28454604893071883,0.5389619718683138,0.30525854610050407,-0.3981505834178837,0.414082152363144,0.3126504366179119,-0.12837719786117732,0.520960856915582,-0.11520572452086664,0.07076815545860812,0.26542600467633315,0.960122715758078,-0.003921804810065417,0.06683812328116227,-0.4419478116046938,0.28332151358544483,0.5413329542616238,0.12171556459228959,0.03310265928246089,0.44241138154460014,0.2044618548648243,-0.18255765041463307,0.06536732984543961,-0.009613953761106703,-0.01749146922645329,0.3530462021010726,0.6557096028903378,0.6767907239021903,0.5147700099805341,-0.11566016486682085,0.03457338026255766,0.3030627753218908,-8.35073455003573,-0.09995835787907321,-0.01914153940665531,0.42403564842281055,0.14768723452000143,0.4981366415623512,0.3183229782840181,0.5992824762419313,0.45806995923456106,-0.012895423450379768,0.12991983757014286,0.1830491397413998,0.05022484630213259,0.09347898225384685,0.2868166330695278,0.3872448760890072,0.30654387389891535,-0.14394927062819954,0.2762446971128808,0.10930582396707625,0.25421555621822617,0.6010004373714437,0.300254538469503,0.712936093765576,0.42751582127933685,0.5347380728231768,0.4362680065850015,0.20795485267908537,0.15744387210504648,0.03865071546897707,0.6465346768131861,0.15446565899925727,-0.11197425764848429,0.6864026617047531,0.49559878681674835,0.15010523829320124,0.3862033520880756,0.014010507013232898,0.391357015359755,0.8094862504176689,0.7818300713075419,0.7459863047432548,0.2954560213302324,0.361778680974172,0.9247588377881562,0.18958804472912796,-0.14155656307558812,-0.19458610087218953,0.7093845086260792,0.11955050620211459,0.24511872337639506,0.4981371235332864,0.29137724204348814,0.07437358429639075,0.7409794069446285,0.0035670342696829576,0.1950054182135094,0.25954670001238456,0.01419594870855724,0.04595304617831502,0.09658293472877787,0.2665618976267913,0.12440239740043572,0.239836476934261,0.1444025627395828,-0.060077019463641905,0.3609276556606804,0.29122843758771605,0.13417803973130515,0.644047901097456,0.2979154393670112,0.5070691682839131,0.5526114243777039,-0.06604084052571968,-0.04869607646720256,0.49493800712136005,0.2552845566924428,0.34724020713532106,0.5270544015698292,-0.010636196641731975,0.49771703152335134,0.2601624631095313,-7.9967527370774745,0.25242898570841865,-0.033345248217403596,0.19988300661848304,0.4442253599632925,0.43446005357506223,-0.4614276545153754,0.3035073241179884,0.16584724079848012,-0.07093033999830105,0.20739740480689994,-0.3051090601300304,0.225380793263195,0.0932955461160883,-0.18184700154452552,0.4531902204518282,0.11707539382001853,-0.11973313412981378,0.22722664113827076,0.20396366114589304,-0.34555426581434556,-0.19232487183511418,-0.08047163625163087,0.09191741399617656,0.07364916803054748,0.09961624517052795,0.2379931496317821,0.331668252903439,0.2817408860598678,0.09864477004434805,0.47971593039046057,0.3994942040995122,-0.09575306683329872,-0.2781733865772685,-0.03524903456856677,0.3461492693631237,0.5176812217855483,0.16266067290036,0.13724804065857663,0.602502165363397,0.6523404691695291,0.3298665581580683,0.23048916406395353,0.0451412356067868,0.3810019438746772,0.08893782809629083,0.031615930080934176,-0.3490364495287894,-0.047608330426646944,-0.4244844241598142,0.6160609956604071,0.24916226828941496,0.6606228410282746,0.6293242411928962,0.5551808587564347,-0.18192706083207447,-0.15076380166087716,-0.005048448308608384,0.03125548771893225,-0.23158369993731023,0.20344297228696065,0.08375028706254417,-0.4536372280021297,0.1774077690285679,0.04149114235059663,0.25790111924817916,0.2571147229781114,0.17443645875250394,0.5825183045594801,-0.19480021480578902,0.2188115605558211,0.10322219161437396,-0.589066459615741,-0.03345353737667289,0.08021178650943528,0.7127662809221038,-0.21075990889734528,-0.3997431646335074,-0.0713981038797898,0.2700803201946488,0.45829044519133194,-0.06806636363336872,-5.4770813095042294,-0.12454787235401385,0.2267344045390311,0.2511068810246059,-0.2985407427267953,0.45116373798971826,0.32925142676229097,0.4337164500021328,0.2131996357148938,0.5378798779474815,-0.08116917932746202,0.20797282314473492,0.31923003594755617,0.7637188396800961,-0.21539540182880135,0.28866838953367907,0.2588599891080338,-0.03521957146424615,0.23845149959268414,0.07542880518683331,0.2713190731172138,-0.05783839371018022,1.0290481006060468,-0.20869771228505274,0.4349416458372103,-0.20417329185914398,0.40763057120031426,0.28971914208070204,-0.3904144647444844,0.15880206740073438,0.0354694991143196,0.27239394157428637,0.6906875662302517,0.41478408246051857,0.2385021975307114,1.0509025392494529,0.4666771603602767,-0.02682470847298599,0.21158980498175578,0.8290485338190188,0.8305154817505002,1.0595330360426052,0.49718163631056755,0.37358366742285226,0.795305125388176,0.49042661051961856,0.30345953922779795,0.2160494995931738,0.8698295017503979,-0.1697033146879352,0.029480246997705316,-0.09501535456392704,0.0341756642202635,0.01056489446910209,0.5412620479258095,0.02807475399469204,0.46964587953160897,0.5121342783298714,0.04737220392807927,0.5681356074962433,-0.3106506930426215,0.09769152765539184,0.5815989857957269,0.4540399036968668,-0.05171825480283401,-0.21357389516272093,0.6831798451247096,0.25030758621500915,0.7115890100122471,0.28223827486986613,0.4506645828089709,-0.5781201655244278,0.2369539488830099,0.20265140100556409,-0.3011578826230786,0.0798268160145834,0.33839822752008164,-0.05475906457865601,0.33441111847427873,-0.23573622548961212,0.2496952178679876,0.3982873970227136,-8.175336001085812,0.14109145418143776,0.8276290119692402,-0.36944960324401366,-0.13501033406144594,0.21607198107445524,-0.22955974412495367,-0.20969971217946978,0.022475867848760944,-0.15800977073686195,0.3675998379165375,0.16875562720002926,-0.33704731223283646,0.2545893707103138,0.37607940224365893,-0.29420320966805835,0.618131347673062,0.288238728679742,0.8108683651999599,-0.12876429570755454,-0.6616562433277396,0.39725020905894454,0.5303267465110831,0.3821064287717916,-0.3645951390089635,-0.12004213066533019,-0.3170933794832126,-0.789101556358807,-0.36464976685080797,-0.05608910112972089,0.188132889852504,0.834251467507867,0.8427033541291571,0.74808934521454,0.5965454922466459,-0.10665198808074602,0.6141201213184385,-0.2266964701041107,-0.8029975106658734,0.8545636744804846,0.7757309409619965,1.5827753729054594,1.2367202971069515,0.11728525294896788,0.5767710779812555,0.1275910648070377,0.10327055359724707,-0.12724548576430522,0.5085704389833746,-0.894402407944111,-1.390813267073705,-1.3111796761045589,-1.2677291920473017,-0.9301449278208659,-0.6671594820758678,-0.5538715123522951,0.002838973103960814,-0.1602994359694325,0.29275855077235463,-0.20412632536344136,-0.562839318725988,0.2273574343426928,0.2550841015706818,0.25534139710726383,0.093175762483449,0.8631272050502645,-0.3908758225664459,0.3057845439791125,-0.1091746736080475,-0.0586398447839183,0.107149313610102,-0.3056680732711574,0.012030821016378944,0.06263608587265748,-0.2231677060281175,0.0060751419101109354,-0.18327766138085744,0.19550085135072603,-0.5849510909906837,0.4221557855747769,-0.14132680041595896,0.3349834530053914,-4.018595851479596,0.6060665651193465,-0.20696118825248047,0.6765870941510608,-0.7974842641194296,0.46599256469607603,1.0296655224581912,0.7127274310203752,0.3470909281600611,0.4000444024134794,-0.5057076884157247,-0.16047181458397106,0.5165231624606784,-0.10474686860520031,0.3996908415227579,0.441836419094961,-0.5135690356497278,-0.19157760275620078,0.19156595823507722,0.2651212146127004,0.08070909036764687,0.0839588661169781,-0.22019701732016356,0.6378822674236441,0.9794833562498155,-0.21652513944298118,0.22462712925529438,0.330689947802471,-0.5300354207957565,0.5295547491485305,0.43888480680918474,0.6119357970118623,0.1855784348267328,0.8521999808243642,-0.6394328989212625,0.08266766064458823,0.21757185752420352,-0.5078148437119397,1.0996163245554733,2.0717547984782834,0.2140644746928166,0.46585902045804484,0.47534832919103465,0.5500018651605414,-0.40279146593981324,0.10835580939647911,-0.6257571050413756,0.017004415231247027,0.1991629105340889,-0.05056513178449527,0.672474276237164,1.0357763687479864,-0.8867512040535582,-0.7562281101431155,0.7588081704406004,-0.2949238296161451,-1.0682666964048622,0.33039266632723346,0.019551710831690095,0.15803863713449942,0.7826837640231599,0.31605779449154126,0.6811975522018742,1.1483999129853966,0.3654084178822602,-0.33479966633845776,-0.2828829781296561,-0.13586586391003844,0.5708911156808126,-0.22279302994721656,1.059003219295308,0.40525202068426436,0.21381944453800628,0.47882291914857417,-0.7690705222007759,0.17321375602974723,0.6537288984815995,-0.022973588247681614,0.6977359598846864,-0.833785417298028,0.14364463419477902,0.12093495458918738,-7.33259111663862,-0.3513292530579315,-0.23589498098406442,0.3398877452659503,-0.019861251687902044,0.004974835532713832,0.36893037205731216,0.0954206949123557,0.5485288811332196,0.23622313085266575,-0.18515506016080757,-0.2559572288938363,0.08642160831703104,0.40162908934758285,0.3293604201018866,-0.03566296665763686,-0.24759828546707122,-0.024263933778316107,0.2878909737223664,-0.08859397423066986,-0.47534003165970334,0.3864686481279464,0.27272513978639085,0.32702738933741893,0.1230034804254641,0.39911537680992903,0.6412704211362271,0.44515490906724015,0.37591622665383134,0.3133438830551212,0.394577875692774,0.3349279133898448,0.42169126270214363,0.17315950725775747,0.4305366524012263,0.31672699786073144,0.5542186959687695,-0.4613328119400214,0.3444217727005887,0.7129522410892581,0.6994790225576206,0.2255202879839467,0.4363212485837645,0.41162366438127673,0.628984687241874,0.09569672481376161,-0.018305346912119824,0.25093236168415106,0.2512170518892766,0.09889403097547148,0.4202767241331041,0.47472930153981774,0.03615439267114746,0.32306824542289675,0.07785837606994207,0.1009890349386803,-0.06560610838348965,0.2986468867456201,0.1974710900921279,0.43172692810127977,0.4345791171177795,0.5815583726505513,0.2857317185367937,0.2759035664664228,0.08098530262463648,0.11231079596565724,0.371442392773697,0.4217576519736198,0.058685464532431744,0.3526031760116668,0.12868008912165463,0.25843362911612994,0.0675390321585141,-0.050091487282649304,0.28802033854221787,-0.20812410681233318,0.08169402388192346,0.12351592791847849,0.2462143334623728,0.3416483708735086,-0.08439888271502229,0.19212014789716517,-7.115226577718507,0.6350951505527216,0.06923640845753586,0.01365185094288177,-0.16202129547579755,0.1479537531496246,-0.6502100201588233,0.5568859909897977,0.24064497085791772,-0.4034063413398897,-0.6371391737229104,0.4590650639150548,-0.14835271990968046,0.6293120507235804,0.20358953284373202,-0.14714161252116353,-0.3900594210203609,0.10591811871164299,-0.47305171801511325,-0.6858803751356009,-0.6752751111092248,0.45336711757050263,-0.08333607448774494,0.19522242662550143,-0.4166385373153949,-1.0157564096745504,0.5874624262003073,0.6918422613432478,0.369944655807251,0.30109299905896186,0.2012466879169007,0.011149208056984479,0.6469274909840474,0.9888486941222864,0.5968986149434121,0.761557607777963,0.5196885106797503,-0.17795238538450325,-0.07577292720061118,1.2077100214299399,1.1997117240561548,0.6950110819511468,0.6644679337730489,0.6955567880064427,0.153805839742407,-0.24046065805550543,0.37611079143689974,0.05091668061003854,-1.3263549075682457,-1.6320940324321385,-2.046879634594065,-1.8942397825225847,-1.5326591837247785,-1.4094593804523072,-0.7987985301456224,-0.5736233710944586,0.09050365374806173,0.4084497012317852,0.22424041001850648,0.40504266798429145,0.42721816144259983,0.5445043985488859,-0.23851727224512806,-0.2873389055981985,0.3315314394895229,0.2106374927173655,-0.2681377009196368,0.06960847268782978,0.5034350804371847,1.0779119975592193,0.07639686242157635,0.054830741456321434,-0.4446568774325692,-0.7200244200956718,-0.7358232009225202,0.43177010022494844,-0.1355064310015259,0.13866407344521095,-0.7079984366144103,0.21424347938693938,0.04254572888330065,0.5416835823988587,-4.060447366991348,0.2536463894109231,0.3023463244249803,0.12358529309825232,0.053719451140153,0.23028749521656583,-0.18411163894309407,-0.07235729894592985,0.1616022555619931,-0.1090789499111967,-0.029966575600444915,-0.09419985484563947,-0.06044308127699552,0.07806031706117407,0.12424310428111887,-0.07811688332545585,0.4758633590835008,0.06838412247451454,0.08053422655120702,0.02795133558073611,-0.4454683624533593,0.2901573768770189,0.33904989775456007,0.15385162395926136,-0.21652318169202414,0.04292964119676568,-0.0388193425814067,0.2652445803640045,0.07865997826746562,0.07115355766082866,-0.3635062135738173,1.2929701612163287,0.6592370027492023,0.14376734389923862,-0.42826311145647356,-0.21569848829351235,0.09016689971102627,0.11313293093209281,-0.05570140975700552,-0.09541991918222631,-0.27333072059931546,3.374214655771907,-0.2129501835574204,0.05773332124050617,0.05451559468582041,0.1747239908724176,0.11813106006170306,-0.11511840876987155,-0.09420488001264794,1.1976892376191197,0.9183863966822524,-0.06880144704666073,0.12895295218153965,-0.18032378575210845,0.00884822515904259,0.03590150514751403,0.005516852638011807,0.6226984374307137,0.46930534067440827,0.15205706403779157,0.34120414384620146,0.1946404836776078,-0.03388484457554008,-0.048749809542555846,0.08458533646743455,-0.43262237868417885,-0.01776325148269235,0.10591626107725932,0.2346438967961805,0.13927838603472883,-0.060937181273180575,0.003207775204156181,0.24033857046108437,-0.04876123125164056,0.17458746126178276,-0.3422516023149364,0.06999761373584101,-0.004161481042059157,0.2018037306087223,0.3902208367080563,0.053598582297314075,0.17636967811808532,-5.7473544868656345,-0.18794808531498394,0.19353187622752918,0.34678545982420295,0.4760440962228042,0.4764061086243554,0.3242376245444207,0.3725865464033896,0.0787377908355521,0.44030366645063634,-0.2849879798713812,-0.27059262923293853,0.4165451799648286,0.13388275799008395,0.18952913885779196,0.5864556593425051,0.02487377548056973,0.1749315349793739,0.21033010578887804,-0.1696257687703959,-0.0024856406148624655,0.19922063245034552,0.8194917299622696,0.621263111418416,0.23770363698300379,0.23263474686872238,-0.07367442249700942,-0.016069637912456282,0.09379988637854014,-0.06556004879116688,0.7613380353982703,0.488979022039866,0.13986816974338806,0.023826500726574704,0.18184691477797688,0.12897036359993674,0.4092224475226648,0.0170780471596491,0.5094455117135402,0.7164254350610304,0.2866407999448296,1.0546467685957202,0.8164877461321106,0.4284473792856901,0.7985297596073332,0.4575586809919235,-0.07807559016351287,-0.17461259153731765,0.5989116843537386,0.0039036276003063266,-0.008842755669891435,0.2582288386637703,0.20577065715436715,0.4560991941517134,0.6516424162160038,-0.228621031865594,0.6448800304998179,0.10289999980392615,0.28301806987860256,0.3370630186650572,-0.026752246749790164,0.1642952624465171,0.6144692187412991,0.23954653328816375,0.11727303780515562,-0.02568713792604488,0.1809107290015498,0.04861059847570485,0.4989050288815617,0.5168412779064665,0.12174935434315116,-0.09554618060886112,0.642002341245288,-0.09323406312662633,0.3110571795671249,0.6815884301322728,0.4134129347534868,-0.06048943728770564,0.497692623547481,0.059082566836266226,0.3058311025075857,0.601104744828193,-8.103934954030644,-0.10815711249103942,0.06638636573124826,0.7066203442062603,0.37141995392541033,0.34157110417552494,0.6790656590794341,0.7639661712713186,0.40712470731039596,0.10563565383965602,-0.010089699985980933,-0.23993657708159472,0.1937856228717624,0.30313896386395467,0.5554586048237088,0.38602537804544007,0.3877353553802746,0.09732029352950447,0.42472954082526504,-0.013951880177983185,-0.18663489337671946,0.21132291899690564,0.5863222552954939,0.4543746156406972,0.5344521341856007,0.0063827530173139685,0.3331441002849575,0.3152218298740204,0.14581541538201576,0.060037591854139184,0.5573698955659637,0.45480638849323957,0.25393490897322135,0.36481798880948046,0.05458193911590167,0.326547057758361,0.30078736958419955,0.02436372681765407,0.49409702180249004,0.8673754284285985,0.8606842484609523,0.48409588843829104,0.4505617715029292,0.4182480680064833,0.7736921138195321,0.45603258142634456,0.04297652747571157,-0.1911407444533874,0.5920353755582473,0.1884778728424815,0.09151572318482064,0.6034254875058611,0.3095281790106511,0.24659799344578867,0.41237257076187206,0.25457063085824894,0.32828426423156787,0.26662332011423423,0.18377872072354004,0.23821650673532388,0.29723674541614653,0.2185869146675921,0.26482913851214834,-0.08941788820370118,0.3032521375440924,0.11915762806209182,0.43858004672242035,0.09416386354115357,0.0282238585937439,0.7129627805848617,0.047015266852285145,0.2807415506098742,0.6259450270573935,-0.027457868455662178,-0.0550117953513576,0.31244409782873145,0.07093861690945251,0.10535380784351024,0.3630063289245955,0.22667732073241645,0.3397772353541655,0.4288906319520761,-8.458665704256868,-0.44989921671896016,0.4548438844338995,-0.35482634256448453,-0.11755429323222964,0.5365791511091893,0.3897417202832253,0.2879189163606515,0.3276274387587503,0.23103129433755104,-0.24261644628597673,0.5817918296207929,0.2410402970600084,-0.09613022013177723,-0.10213810755822263,0.8546043685405854,0.1346486868305653,-0.4342970452493989,0.08677337549729312,-0.37156748687870567,0.3718020742652134,0.32268798945859634,-0.12204729757769009,0.2604448276240861,-0.3112058112592632,-0.3713110456155875,-0.40761252039642376,-0.1278203086815585,0.3681584343752032,-0.18123007762250215,1.2577698448295294,1.1085563094351476,1.1468355012322053,-0.41377109073782475,0.23826051562897296,-0.04672415709592371,-0.2865621427961433,0.17515918929012853,-0.1601596282966513,0.47111030902105633,2.3281072408909367,0.8306204251878941,-0.23340210331493436,0.01858887144870104,-0.21302953950050882,-0.5431628698935361,-0.10570811982772578,-0.5718930861121649,0.8427801139227511,2.0302288775650634,-0.28348149477192996,-0.7470281144333888,-0.5259600466375499,-0.6160186850709225,-0.5496075299161007,0.31784952544964196,0.8246157217448318,0.974479094572524,-0.01385062426310325,0.19791199052362532,-0.5300554298137236,0.4486231869868783,-0.4462813327299375,0.280111361488388,0.10331125608998588,0.28051314011410655,0.8351981031994161,0.4119838513110207,0.1439707493302891,-0.06895230363174668,0.2087975574595308,-0.275237762375857,-0.37716731148487026,0.06925779289819563,-0.3508640421086401,-0.49441508682053925,0.14101701136619418,0.3462196466615205,0.4782436526952129,0.8080896612315693,-0.1451356108005464,-0.010339316394468943,-6.945730634834873,-0.012157930627659687,0.03859186313903129,0.003979464930296706,0.031097306043487576,-0.04483867033827544,-0.03176731956009395,0.047609100036040936,0.05404344315213171,0.1852236537483028,-0.06627534637505571,-0.10048807261510681,-0.10846617861268706,-0.01885629514456761,0.04352689048169126,0.06479470790322346,-0.07206888430830675,-0.03961583302928063,0.1184451984394119,0.03228757861995308,-0.028965051069711166,0.010980368676399746,0.005259449230217939,0.17272560563326037,0.2374966703540948,0.23134069121624146,0.09701926540863022,0.11433393708029786,-0.003966195500495063,-0.03846478654422451,-0.04939647099848859,0.048463309962448846,0.31651459905882834,0.4805935108717779,0.5421454696251415,0.2580774422265828,0.14289411201828056,0.00973452017403528,-0.08781389203394793,-0.31159258238040916,-6.6647408966876664,-3.2704959089431993,-3.6423386740092036,-3.587006125863416,-3.507419593013056,-3.0836498648683768,0.0007864283705426386,0.00831926016361123,-0.015624867264957194,0.16355908739483388,0.2957415204217234,0.4387426166616122,0.4052198440683525,0.3583793758317733,0.29387772987164007,-0.0028649168758197977,-0.046569287325284946,-0.06411598729511654,-0.08611680450325927,0.049714258260306385,0.08652685798372353,0.20365550954586603,0.14983622384794668,0.2668255992597105,0.0035464807025183996,-0.03386778115083748,0.013945373396806782,0.042406850615979125,0.05970507703015591,0.1069975935944431,0.06612007565274992,0.11884754208572859,0.2480587698641037,-0.004493615858957588,-0.051359525728038855,-0.0327686591961351,-0.05704320612174692,-0.0737873886931605,0.1417175858966458,0.11343946194119955,0.05672749471429139,0.1371140903842545,0.07044124411503226,-0.7665569662187749,0.019666396416672376,0.3811567332724112,-0.05850342582952458,0.9501624216758138,0.40261731838611214,0.11269858462295569,0.1823346573707723,0.13576582303288792,0.34576837349028644,-0.053139408961290956,-0.3713076237021314,-0.17687119246397515,0.20702001533989986,0.29127449396916283,0.5169822282959574,0.7113983748712376,0.09089543836534722,0.49522600133153544,-0.1099130767270278,-0.07558604654174798,-0.10612566019910125,0.8682112857050395,1.0277867244722818,0.3588841148013395,0.11374151720045597,0.08090908365278848,0.05391819054225704,0.26658181962443606,0.06054446649972798,-0.13740205083357154,0.14792888218985545,0.9802711577875647,0.624508349036459,-0.48927188902182395,0.2998865484319638,0.2344620435915673,0.37959489822559384,0.6990309094445697,0.1300611752664735,0.21543876018697813,0.7425404494780755,0.5496092860225572,-0.0005642853815252718,-0.18474983775575202,-0.4939709648262405,-0.4300591820585088,-0.15126968312502143,-0.20877211371888268,0.8445729007164235,0.26575722395548895,0.30307231370581617,0.5797965706138254,-0.044749986741302206,-0.7517799727681955,-0.323747012261487,0.40985164726631046,0.8091706097506206,0.23247901513277194,0.1559318077025286,0.6476386653226245,0.6004627558700683,0.2362308512441459,0.5822552994744529,0.7349008121141952,0.5536730071432463,0.21525564706063824,-0.40493436369882635,0.3009991851614333,-0.17541336313094716,0.6717025048324624,-0.07148515448343065,0.3775360717609315,-0.17410083773695353,0.26150840106589873,0.5972440721609511,-0.38030688299300314,0.8178429122372977,0.38480777896893126,0.16098521529143173,0.3787812581351038,-7.90652020371764,0.2861630107180616,-0.14774832119673093,-0.1826995718756566,-0.1073014919176005,-0.10012568080584466,-0.2794286851879364,-0.08272725591420214,-0.7353277892729272,0.0421387098926047,0.28352380196562943,-0.1140952904654202,-0.7292346961542808,-0.4068585781713297,0.1618723090996609,0.1817586914660506,0.32732805817885713,0.4699399240743673,0.3919851120706748,0.3097314553046985,0.2448323297464249,-0.05883653469482267,-0.3596662027996248,0.37114364844031333,0.3395191089550417,0.8520610292038583,0.32194716600228357,0.6805669834550174,0.0743676394396741,0.29619635624441465,-1.771332408557242,-0.37116744509718214,0.22153009842122787,0.04822223330578375,0.34299265013946784,-0.00692983212335673,0.7345440337690766,-0.05586407605772321,0.057412261164697685,0.23363053072894704,1.387579717061352,0.6678413108200011,0.6724587423215085,0.1085420702564171,-0.22681182395434693,0.3275053396316599,-0.024317813222098514,-0.7513272192031103,-27.318073303400606,-7.584570873782003,-7.020952187795137,-3.2426803704470344,-2.62736598458438,-2.122429715647894,-0.9831903696763765,0.18822438933294747,0.23964319299837117,-0.7142650111551715,-2.3182313470131026,-1.733148209546335,-1.7389087778403847,-0.44618848319702326,-0.33002117404044545,0.007252611813712021,-0.1431163507889936,-0.5300147220371009,-0.12214035496951822,-0.32248097893340244,-0.29840678339707083,-0.7597303178204807,0.4003573659605334,0.21673321200516432,0.4314877423813156,0.03575258845534142,0.22474333707338975,0.0018674190573191082,0.1483587142548436,-0.045606874931272356,0.7804958290615409,0.14406000267702807,0.08417814444596551,0.3419434373880925,-4.584097893033742,-0.15265332903727194,-0.12183904825265712,0.5295928465575619,0.20926264320233237,0.44472590669534673,0.4024617423422745,0.10356556067618217,0.37865867091209315,0.21642607026148417,-0.10988574954031316,-0.23295115615942083,0.07787325831710257,0.5133943286283552,0.5347052141012513,0.554856097734387,-0.031615932202268146,0.19473099885491624,0.33993310006212396,-0.4747010260319516,0.18544056552397972,0.3932908029254016,0.517581258417106,0.7171772478449296,0.5711595202569134,0.4077732340430201,0.45246025558422337,0.2801273396796814,0.22510195448575923,0.43190949019695546,0.676415765674167,0.7269476361027487,0.5748758572274156,-0.0032430874030014004,0.3848627647753278,0.30576169385296653,0.09230641017010349,-0.32734944807065824,0.47226917554109205,1.2050894183725451,0.6467153843032905,0.9556226286108729,0.04809282985592539,0.48931240559575206,0.4956766433765295,0.5415155568354525,-0.29225565128697384,-0.011091305401804658,0.6631133739377922,0.14423990303099918,0.2780368103660598,0.3818990117424946,0.08294963665976658,0.47166523883902944,0.4624665860900405,-0.06388957429767197,0.1671897606822849,0.3287456580216079,-0.011754663713300816,0.29842030973164774,0.2933306613691082,0.3567605279935489,0.6763196734771559,0.1639645724548289,-0.03261446255408532,-0.32350053662320505,0.5649720348526385,0.5608359290168381,0.27282953680212113,0.4273452597645353,0.19726217884579392,0.5659354032532833,0.403311546785181,-0.17619059983473037,0.1954051109923342,-0.045146705582617866,0.3761463555921499,0.2300670751470261,0.4737023466490464,0.1916653728282032,0.38240608395429476,0.3404861001246657,-8.833163795312567,-0.0995289126679416,-0.09317190933425953,0.018830209457793515,-0.09100784514017751,-0.21484862727967993,-0.23746890523478545,-0.29197774199103504,-0.12007838140412369,0.04175128837617747,0.06450326190747768,0.11171552074465993,0.0813154395706661,-0.010264861155253071,-0.0032648567152690966,-0.03254779137122978,-0.19151551964126537,-0.18101839361288077,-0.0018701158984138343,0.10088107223593323,0.012537461597190552,0.03549699620702201,0.06669516857692741,-0.09725377741193977,-0.19452073961412733,-0.2613856245588018,-0.15730697930029036,-0.28196173831386545,-0.12337686663562573,-0.21979859305086685,-0.11723324173264092,-3.0896636373450193,-2.850652576104146,-2.5797577495055175,-2.217413501829635,-1.487746917529582,-1.1440197093309274,-0.04725589155280444,-0.2815962015018173,0.14142258165409877,1.0369484083049931,1.2441516990701755,0.7282052293494499,0.4199623636452129,0.12181574380867521,-0.01125222641782525,0.0924926719831001,0.11378310257986617,0.08107817072607093,0.1367211360029498,0.4000444269544645,0.6686196592099867,0.5341019019125823,0.5889773610789523,0.5247938232347089,-0.053525435579847916,-0.1463678812674343,-0.09022154538811125,-0.006438434129276817,-0.0028985605780594394,-0.11891030598987391,-0.001775912236912691,-0.008028677327828544,0.2123597494242471,0.056461441415288645,0.004334703982865318,-0.046276232538085695,-0.019606905919037423,-0.05842197586402983,0.09477902526944648,0.05929739394104182,-0.0014259682809267223,0.2064994010520404,0.011330416609090784,0.07553718697420878,0.018037870425777782,0.04965725299533915,0.01999831010935573,0.10219099172412796,0.10100532034353084,-0.20041885094172887,-0.20682730680563952,-0.120560812996345,-0.38731985072718095,-0.533819236095998,0.05783690381240877,-0.04298575424866079,-0.13765654153902884,0.11396920612495033,0.4496790455506305,0.10598988896188696,0.4483269294979721,0.09208863710632702,-0.2730967741558042,0.3140511842268724,0.019115984385090032,-0.1829224513969585,-0.16642329118989652,-0.5894692985258694,0.3483928070489731,-0.003424303097170786,0.22220637359040546,0.02101188491591996,-0.057567524000448754,0.2266391775738389,0.7762144990333691,0.321456213081032,0.26253631206730016,0.4403368154894526,0.5875963285035409,0.08579773115345814,-0.2253179388549189,-0.6855685089317133,0.6434977115266652,0.28159978048495243,-0.13232568939575906,0.08386154530252238,0.672288493241885,-0.2530434228324724,0.11617327856304563,-0.4311320368531792,-2.187261364191501,1.6287093080118458,1.47943601051861,0.2687457043925073,-0.07971630405538925,0.025489802002863153,-0.08320191105308976,0.19934937179835838,-0.35666034354147924,-0.7240041795875954,-1.6487483721473049,-1.996273754828517,-1.1360382212094837,-0.6690313405980943,-0.9088468473906329,-0.4939311008267306,0.7924842188736771,0.0975223728522113,0.46998368904700033,0.7630779444533424,0.4187208294047051,0.7702044361723621,0.424791146441759,0.2530462776099974,-0.25793102450120586,0.39714548243126335,0.376672926431994,-0.41590521224829263,-0.5323969514732099,0.5035923027314223,0.4321019237703531,-0.5437174983029006,0.798256450108902,0.5580861164803045,-0.23530657185385145,-0.458890953677314,0.10196875754298201,0.027579639302065858,0.3675252016213012,0.23623797281342018,0.20983924145326963,0.0885991502681675,0.13095256897223698,-5.296835413091952,-0.7123808084613548,0.03869307333764205,0.2658251613590428,-0.037474295346575294,0.1091363857066116,0.22861194492996031,0.6118423529817886,-0.3235290368434598,0.5174586761773907,0.20642257949488718,-0.38210801432873764,-0.3518428868205807,0.386685978951894,0.0798865728220229,0.34383131526327854,0.18046252874901475,-0.12763435560984346,-0.7446166699151805,0.12422064319150733,0.3059670065654829,-0.016803486078637218,-0.011887328064296411,-0.5426161857565235,0.5266501819621087,-0.11207376640825946,-0.14200946188343086,0.18423867758184773,0.1947498804242568,-0.07438342288159541,0.9115282678805215,1.0358932620574748,0.4620744528222923,0.7544129188374359,0.8531180944400047,0.8409598167298955,-0.3536549267682459,-0.11684326214850523,0.4173684789799643,0.935837854341615,0.4266533125457185,0.8906197157526482,0.7633524735270649,0.5893613334709932,0.6357169172784934,0.32509652645265685,-0.19491543616262366,0.13458860372383405,0.27964835741632427,0.8907103499823825,0.4562334621715466,0.4423120959597937,0.7718497594409656,0.8707188978247274,-0.04569490622863629,0.5428349310392402,0.4662560791326414,0.2804942305121026,-0.1898527258763628,0.34678858063613777,0.21353168479940898,-0.2335621572556413,0.28336789921662986,-0.35020138822789765,-0.7169023535924882,-0.22606837987446488,-0.06785843816243538,0.059914288375489407,-0.6307686989099949,0.5394437349195395,-0.28828943846215643,0.6894251689832163,0.25905562083918765,-0.5904520585461529,-0.7241013444849967,-0.7654162696282097,1.3270802252862275,0.48295973531539715,0.21667688435539328,0.3856170428930472,-0.19714659296828005,-0.011467710376565585,-6.5480361977383925,-0.1219410778879486,-0.28447864408200874,-0.15349141357020119,0.05768435726670431,0.1301034405587319,0.24030415568900104,0.2916944911910887,0.7444948492887536,0.5607065364948179,-0.4375257213726769,-0.15101056532040044,-0.053308301356133125,0.4224719752253158,-0.24464742482589663,0.03728094903695546,0.278806141238991,0.007720112581773087,0.70870224333086,0.6983407342446369,-0.04077621040760849,0.5955903783842708,0.7029031234236444,-0.04323353193842949,-0.20649722045880253,0.21213053131720835,-0.09215295390079196,0.21828227088348146,-0.03122322498308804,-0.6267236059523221,0.05228971897108637,-0.5934630497670315,-0.5790123299693087,0.1445739741756958,0.12607857451885612,0.1921064086010585,0.38911146197180874,-0.5596880040131939,-11.382104163532297,-5.3354879303884735,-0.5226294566131455,-0.5277140636912355,-0.12968723651716316,-0.22717702967482867,0.086996307725126,0.32633997681646876,-0.011917550416933907,0.1691562396182799,-0.2105279346324725,0.44829533685446044,0.4780504639753049,0.019072178837920593,-0.13543030642144033,-0.510404757607176,0.27907701795597095,0.06451411488753113,-0.08142308000313743,-0.36363242359235737,-0.1064469113216415,0.4347039223880049,1.0036546483743654,0.4201272812399315,0.02585718438293049,-0.2775972904334179,0.01976233166392394,0.07633682545281334,-0.08735335094873511,0.5811817990973346,0.18653555576052488,0.6056633545484688,0.8052383257744641,0.9566235185647661,0.5636572200452208,-0.019706362579226224,0.418048885723113,0.8389250499279517,0.7111561533896388,0.7176420524790105,0.1619321346015139,0.12908475320769536,-0.17704114473636243,0.3942864489256306,-7.205112444121485,-0.2715997552695909,-0.04382686588301029,0.4241715592817312,0.1830118467526012,0.1753411302692567,0.31220313500341584,0.4018256237475864,0.5954476654183402,0.07137854559547548,-0.1495786662573115,-0.47744823801560093,-0.053043246480580196,0.42753223638545,0.04471111342286657,0.2759876898884714,0.23778696384376258,-0.03451535136257869,0.26406614011737106,-0.20130764862617767,0.07679535897012552,0.5303022605064602,0.5521692463644144,0.47552789425466324,0.10399793945333857,0.14262687674702468,0.1496050513737246,0.2025693259777411,-0.01512096763657335,0.16392143345701576,0.3539100090296741,0.3351653849862125,0.1217633537608055,-0.002801891628526557,-0.10042362250713364,0.15409595849688268,-0.04849975662139081,-0.19951926202481163,0.39126833435495745,0.6899960172512383,0.7331490361634758,0.8992175583840043,0.2803855698014167,0.16433378921261105,0.7436883830519513,0.4606297637178078,0.17491488250804788,0.1040334495049537,0.28330449998875396,0.14137526045055362,0.09890789206911184,0.4205992068853679,0.3589358149525519,0.5481674676060097,0.399438542662152,0.03742008565747149,0.4414151993295378,0.3234244802685953,0.1630536743531697,0.5435642856934298,0.3133970360254328,0.306722059078989,0.4879982498177249,0.24313434824768854,0.2802981895148253,0.06932244057192938,0.379098628227888,0.47559794275149897,0.16010264289292928,0.48995709450036085,0.4227172479302489,0.5723995610084658,0.2898394024233982,-0.05611733068429612,0.1509557703258728,0.49400145457794153,0.34643156956856935,0.3072971398933627,0.28450293324834736,0.1076006223586428,0.20453403866508502,0.18768401109864652,-8.08960903596248,-0.017863838854746756,-0.020739932749405967,0.023658376108006918,-0.290967336084001,0.09024164426358217,0.2862913394755859,-0.3588702753710574,-0.0012592986030554463,-1.0310145726026492,-0.7876564041231285,-0.12920171697733754,0.25261260493679644,-0.43542953859941685,-0.2784554138038704,0.3070250934920835,0.14716867458016625,0.09550440190431185,0.05298717200986661,-0.7530484354509258,-0.11202530079019138,0.5306368095949365,0.6879443243480187,0.18960216777236186,-0.36913425502124836,-0.004955133609492173,-0.6864877085882163,-0.06857480838655444,0.32910944379928153,-0.491206654376158,0.8758385119833378,1.4328289162734635,0.2735157398939405,-0.11921048085512959,-0.6833906238948873,0.19269746289412656,0.6432426416551351,-0.1735023129271172,0.3368750744043733,0.8044441461299797,2.440595487463268,0.7695874147360692,0.11344807911560315,0.22046794448661622,0.15054286852145324,0.38216975137793213,0.023540933454839416,0.652291663049144,1.0152330336028674,-0.7066535496348412,-0.12056342147261202,0.26123988362533535,0.29440759550166384,0.23163033052623952,0.09724606500022114,0.023337157626067462,-0.0902712384163259,-0.2678152558588246,0.0973568792221733,0.21018208230279298,-0.4766286187836227,-0.16338694520990563,0.582879483289801,-0.26364646052070007,0.779191315226537,-0.18779315485362516,-0.18461611440706063,-0.07760375403469304,-0.1567604096012132,0.020827749291500674,-0.28682863619162047,0.6571904279039631,0.1576398302736667,0.06292805802662825,0.3726080705195674,0.46603321742588283,0.0919278298361784,-0.2985858147443156,-0.18959310056298015,-0.2273793971904346,-0.23529371934625443,0.22406458819192893,-5.120362602198519,-0.18257052258688242,-0.6418267108553143,-0.20066288270575586,0.2534795264883306,1.207698345418539,-0.17436499420621973,0.1653718077274043,0.7569426926094057,0.022958718708567055,-0.30921113631277064,0.36355159751659855,0.009931890209783585,0.7223312184374224,0.9669778762734441,-0.05677577801704347,-0.6474371402431895,-0.22823023759619046,0.16890654214226067,-0.13603290001271826,0.4951639543164769,0.8351059926806914,0.6420083535880268,0.4635252502101865,0.7699590171315105,0.22211084571265227,0.9619130474867468,0.08637801848750815,0.7123246314518599,0.49407947156400145,0.749654625073523,0.3519474845906185,0.7079207393465238,0.33970831459059236,0.9385755589008902,0.6797756218100285,0.2665911874106569,-0.1504373399607028,0.003960342058940701,1.0305002667073868,1.1072204741676714,0.44450033223001734,0.4453375591780969,0.007513454692101407,0.7641076042513103,0.2261670160087384,0.18432308700369146,0.42984800836499454,0.2831747070143854,0.420606612810751,-0.10117854774467161,0.09339345469875866,0.6031117098213019,0.25078668271325877,1.0259230387162177,-0.9245022084025224,-0.608993509289757,-0.015078677687732949,0.3621467406607263,0.2750470948189981,-0.018842792050566513,-0.14181957547972118,0.6295346043474174,-0.8626933253910596,-0.386850998335328,0.443760289926387,0.2992705586805514,0.031891143612758716,0.21626629976641865,-0.6035978703915558,0.14287653243788345,0.46739007707505664,-0.41534113638241044,-0.13121965262150267,0.7087939144689852,0.10358945222455483,0.02885568818346716,0.7060989861057233,0.12617851316882403,0.31814505199532467,-0.13600809266977718,-0.0020320310195885505,-7.844939391399929,-0.4346351426119084,0.3804572474944104,0.31391343204100824,0.465806804499822,0.5676690781916711,0.5516763813466309,0.300069057652632,0.23202722651026664,-0.10842052821327247,0.04377907996430163,0.07879634992012374,0.0493281810133833,0.2215206077266286,0.849802739529913,0.7724845707352773,0.14909792238601546,0.07897732730920004,0.23558135286300186,-0.4040573065304946,0.05263596600684306,0.50861016959261,0.4030091051240913,0.302554121649534,0.6334591895350214,0.6084443445275954,0.4988936081753017,0.45694864846934374,0.027890604793882796,0.09078003173830408,0.20146675523225324,0.4159744009701297,0.1296947107091395,0.30367086987656455,0.44839323253673896,0.38359259268828566,0.31749286255125736,-0.051790090594948074,0.31689201093057207,-0.7522363951840935,0.8889483941337611,0.8116846788978594,0.31791827455616967,1.0414118264121106,0.6565826876759279,0.23684629592973552,0.04569385227529916,0.16345451231595884,0.6031432814889176,-0.06036253067802045,0.7125936089868128,0.5303453084099777,0.204928516774702,0.3523478012292126,0.3544374456062184,0.21088290421656072,0.679737071809786,0.505306871639452,0.021910750693737765,0.39814340759346073,0.18056356777510493,0.25520614456097435,0.6457194665080325,-0.05200789200784686,0.35165388198905134,-0.21788508574331153,0.2200947223954242,0.16234255072034334,0.15165259429521336,0.3794382013139889,-0.06079494689026381,0.2628971383569181,0.3828525672738398,-0.189226246858628,0.05090397354650495,0.6414368279865792,0.6320820485733627,0.3405085211948732,0.3337541374345256,0.42739388341530365,0.4797400737344885,0.14516084941428084,-8.861390352772702,0.9663651661949838,0.07133547751913662,-0.10471611150043686,0.5296516558012202,-0.057553589334532536,-0.4491372430998438,-0.6932208614151878,-0.06355549340114756,0.5060875220069984,0.10677143207009517,0.09567879769051812,-0.6105065346915076,0.49007828928075503,0.258719891775274,0.1968811339460907,-0.03780972224633125,0.3998453191843622,-0.30529795089997996,-0.051768369721559855,0.024214924601206084,-0.05951004145005053,0.2978347018248239,1.2046324820578496,0.224928737449053,0.41177539815907616,0.18162939127516742,-0.203490370945263,-0.17269404480981387,-0.45142007185570304,0.31829190293103266,0.23417866271446955,-0.3509248369794969,0.5356983391288231,1.0700103109365282,-0.045395331397279574,-0.5877378246388132,0.39072109108039854,-0.9920919688490326,0.46290206522311744,0.8213287190540125,0.5581030170493612,0.31419679472855594,0.5931302269508052,-0.37552188401923825,-1.02973713107496,-0.3085070224111774,-0.5893581267944517,0.18128540236979848,0.554695280206811,0.6674477586073293,0.705721586465452,0.9096001613412048,0.314638445986239,0.408144921010835,-1.0391131475380018,-0.2490460196255771,0.37490166041293144,0.7598429512800101,0.031972047149616066,-0.3103653701839607,0.21240187002427388,0.5574602359285252,-0.3184264638089524,-0.1130905504794387,-0.46519020790838733,-0.26526365731504986,0.6847114264739514,1.109342956625187,0.2585340952147832,1.0835403023989556,0.041990247116802215,0.3551028113729356,0.4538470976705589,0.06550443675008012,0.5984364263711187,1.0182922814989566,-0.5360744178524974,-0.478584079718104,-0.29881415012353146,0.4078333454284509,0.2867861000345577,-6.9805540578188,-0.20491501231139364,0.1479450905436937,0.6824811758396665,0.18915779943536576,-0.0017826956307014294,0.1454549105310517,0.45188033879216977,0.5353470211898388,-0.07174629032765473,-0.046465054071909366,-0.39219446691387816,0.6091598578867627,0.06482207204776823,0.4886802765378744,0.7111540000739495,0.4847688579499552,-0.10961290175940655,0.12441924335787563,-0.13579220088284977,-0.1305243689409696,0.17888201292932793,0.41000036654633193,0.2822565851527477,0.07421808599229944,0.7899285431535897,-0.22166249472965127,0.05759561983706749,-0.1873863239695525,0.005548965801185098,0.31155330759784017,-0.4891112851378399,0.4474972423100107,0.697532056478637,-0.2161383419837458,0.6453013485520347,0.3765297301629338,0.22629441338792602,-0.1430092457671156,1.6296372579942127,0.8764908445527462,0.14551791943264153,0.09719399131720695,0.40465815907229374,0.2766734872876775,0.34515138594937667,-0.2591850748639461,0.32574550143430975,0.041675397990680894,0.6199654109089687,0.7110344311761868,0.7371937905352806,-0.27552696905434587,0.7194304960547031,0.44134698785310067,-0.10765633499213861,0.4759656686776516,-0.21323449475980344,0.21903463175253876,0.006873042080148921,0.4204786022783894,1.2753518361667726,0.026027699138242415,0.3701159165742076,0.07977867750434915,0.30132819386653925,0.3435018602521479,0.38891417299464504,-0.049697314776155105,0.03814143108489733,-0.05048075829107426,0.14146951041981642,0.10475069297200111,0.5465938847801999,0.2151599156944683,-0.7045281141710474,-0.4475716402664275,0.03436626769658727,-0.19984185348988423,-0.12710053889005202,0.5311258896758518,0.401718999012501,-7.4729831996662925,0.015845698993670415,-0.18839611215178823,0.45296211250670504,-0.23807655873206482,0.11476932316846702,0.06706576228804592,0.04865420056357174,0.013293224456911647,0.41998678021844776,0.36057935050550066,-0.07843696731817745,-0.17366139537942699,-0.15679439936629921,-0.1359071186085878,-0.06165809831111812,0.14587072012956062,0.39368936009984845,0.22106933191239642,-0.05918127568023316,-0.41401031931533855,-0.08577317338363173,0.35458375501136347,0.19895371207074788,-0.20481916710004294,0.17543904947496874,-0.15973085899509626,0.09038056078883096,0.39718879699185566,0.043546738893227264,0.214707057988837,-0.14422527133688479,-0.18174043990726424,0.583937466062962,0.30661699627334593,0.32712306768723404,0.509903627952615,0.06777000781728484,0.011546416130751918,-0.7649558897673866,0.6934016044600735,0.3027310408102051,0.11929056092741598,0.530832284885056,0.9204238546034561,0.07893211937013934,0.12200703247562458,0.27665234632798247,0.2771982619180982,-0.06435700097749321,0.3613399812136951,0.07071134954529305,0.38197356106555275,0.2033105437281906,0.05412130803768337,0.41584508261312875,-0.0918219244883063,0.19814232209651267,0.6265608169696139,0.3199661883640532,0.8478208943273337,0.28376104904875615,0.10119482689259819,0.8979841910841952,-0.18541958744481382,0.038072751200727055,0.13735935777066943,0.004443795694705138,0.10513101637148145,-0.10454138290225952,0.12619662428028183,-0.3881761909394095,0.4879870821878235,0.019024613070235834,-0.2029155169443008,0.49453236067636835,0.03870071934931827,0.21907376499806436,0.9188349449081633,0.16994858834186757,-0.03056466223434307,0.35599888239616556,-6.1915056650713165,0.2779824521875207,0.09519667354854751,-0.2078460521255041,0.10968636551141374,0.28071510959412066,-0.03343894235785565,0.19617649880530896,-1.7231253202648689,-0.49415028374276004,-0.046066574610064796,0.6038170401490425,0.19216284140691114,-0.1190772882422145,0.08756826870559312,0.2606019538306518,-0.42749780927177367,0.23408492875561665,-1.0390767869113973,0.42594950029112816,0.1494889085502024,0.4543971330670326,0.39216359799698913,0.5984796137420817,0.48051287287869754,0.36026943642513787,0.7024140060021239,0.04276085699619325,-0.3894301188037956,-0.9045280015877893,0.5321877829709404,-0.3853881195431573,0.7558143374220908,1.1431263526775566,0.8030585050081651,0.38825033149335736,-0.08921999354011398,-0.40480835766155243,-6.590991933884596,-1.4764528937204253,1.9040284631886168,1.3993475939885813,1.0781109541944158,0.6424470315750207,0.407618168298436,-1.9311498923181987,0.26997263040305286,-0.6353458709290876,0.5679101977020914,0.5456119148634271,0.6630660126487466,0.054529128615933335,0.1183060375816999,0.23667341333291708,-0.1288687681652698,0.021707241974232697,0.5561125995825777,0.5067660407124155,-0.11648406543377042,0.1882430799716417,0.3570475024193878,-0.17731397239294008,-0.9445175524135963,-0.561925255006127,0.1437090208777975,0.3712703606932225,-0.3401000374038884,-0.022644075234584147,-0.28205651997011155,0.6700573368428915,-0.26507519244886457,-0.11629860186402953,-1.5149995912016243,-0.19632897623238366,0.15884221082247235,0.05030196703402977,0.516686551938508,-0.46918234920715646,0.24878582630005192,-0.5097060445150475,-0.6924699293121481,-1.9648679253786143,-7.084308102077682,0.16338694673990656,0.3764144781727718,0.46362570658498453,0.059928988722757315,0.0756622743807536,0.11586941129043289,-0.048255156352221135,0.09334330723012586,0.27098266288972817,-0.2770261289717961,-0.3646468369385038,0.08717116110992705,0.10398741286851386,0.37092119693683917,0.3758410199922241,0.3423982338651658,-0.274654764973048,0.3476554319890413,0.07745008503950651,0.23569887076071833,0.21988379254540902,0.4171508752395755,0.4730504416519322,-0.007574214828038186,0.3249187247437934,0.07170252021687991,0.19373251636782143,-0.178422397201062,0.6694015248597548,0.3399266767433578,0.4611329219237282,0.253748593003766,-0.032693267627725765,0.10969826626697717,0.7246345867329246,0.6594489217143263,0.08336817950499481,0.2553164300468949,0.8252136419143753,0.6375064609612123,0.7157752653114444,0.13983877392924354,0.09490767397808139,0.4545439241047904,0.5480937052005624,-0.2321282194513808,-0.79297257673025,0.3268243286757423,0.25628576539169207,0.06598393385740262,0.30564137400685865,-0.0014185784277209494,0.15315234351291085,0.39724084230704587,0.20771117988813292,0.16813738095149275,0.2740108126228655,0.13813319876439759,0.21748272435603264,0.127848430065065,0.4378503508074907,0.13150918850814383,0.5260401766185524,-0.2024283048377941,0.19196570458233528,0.31048042713448465,0.3445178716511757,0.33347942702117644,0.12728281617653253,-0.0558030086451385,-0.08786738122352153,0.14647632938444072,-0.20163254554196158,0.20615914321446077,0.19804665527230936,0.47097928869836236,0.09067518990087828,0.35948540949029134,0.15300812890521956,0.2871004058114715,0.1310281955559769,-6.275791157112266,-0.6515817007981822,0.28520741600415306,-0.23097017950079435,0.4222982487982192,0.1370557600826265,-0.3093337416619167,0.6129903139679107,0.10856138997429278,0.051909678048291163,0.02894618344771363,0.7941741534436755,-0.12182898614150701,0.3373447561376777,-0.014521178382642136,0.36056149929002745,-0.1365378203967067,0.5331607931458006,0.48474433210813606,0.25019479803796923,-0.05796943632750008,-0.07000659449593585,0.821304115630611,0.477386571429818,0.373614940935981,0.7981608349372564,0.32563645666670754,0.5558066672565612,-0.4371063794768449,-0.14380611015997952,-0.11199040515755697,0.5356576625846511,0.5794468680780172,0.7400300869074594,-0.25469329870116447,0.027568209212226212,0.7720701475960821,0.03078697182451692,-0.07985691121179904,-0.07284279329466892,0.31022825501016904,-0.3789945274922237,-0.5948500088031096,1.148032954347522,0.583361718676626,0.4077548724451858,-0.4133685179081178,-0.25718663149721577,0.8936942874388188,0.2676123901980822,-0.06129318631017558,0.13639289339908314,0.6918854808825832,0.8860971357127806,0.0952340921965593,-0.07731477968521218,-0.09231945717953834,0.24955004859366264,0.6167348251730692,0.8928956903122521,-0.00425157472848981,0.06514843562362005,-0.0992237106670871,-0.35804766202156685,0.2875665982472463,-0.026774122578253186,-0.10503714969347576,-0.19017177975536584,0.8004444657228399,1.0338219126062589,-0.4109676851426744,-0.107973044476124,-0.35402325614373686,-0.5571533312242135,-0.06358465359831265,-0.21971833686411965,0.4560299057789984,-0.5742066563714143,0.4456795238680513,-0.264597659985941,0.8315291715945752,-0.5995825629231738,-6.91146795841966,-0.47461798971669866,-0.11806931964216154,0.202126472232037,0.13418867559425213,-0.4558986690849266,0.6288823528997569,0.3157060552502825,0.40120226481720267,0.2290946593854242,0.12761125451224045,-0.27762287841899813,-0.2926990666371678,0.23833731201341637,0.8014047898900565,-0.36848421687755306,0.17876187896743623,0.03800774416127726,0.6246755188218083,0.43295027367724465,0.8770892952773975,0.7982548881634549,0.0859132374383954,-0.2475278567263558,0.6099216347548791,0.11867397924727745,0.22776139007952834,0.5052995409946184,-0.4161869506565576,0.03010187281824747,0.16859786706373261,0.7832571735882595,-0.3736734399153093,0.05113195574021525,0.7805050219362558,0.531771259381843,-0.5728720964816709,0.2528389077390794,0.28358147823507746,1.1753913893375414,1.123254253078673,0.46403034450703323,0.20080902405370818,0.1904969978237179,-0.24440665905053127,0.29373973422107447,-0.3759862375664996,0.02976601793536059,1.2156893022474198,1.2775025212998259,0.3727992678164323,0.19451377662469604,-0.1646241389624511,-0.20351969131612496,0.12318867011070561,-0.5353774285400312,-0.26664187951727775,1.281651702495343,0.7298730781821776,-0.3607660243393422,0.6838211079738972,0.3119409645445711,-0.6267618472178558,0.16164464610060833,0.035998910022430435,-0.23222648301119375,-0.5008943822163199,0.09506166120597137,0.5617751299840916,-0.22471862589425468,-0.5090842657414142,0.45025162141766806,-0.538031159437038,0.14460865258451344,-0.5649416255082859,0.41356940869109493,-0.3255380161479297,-0.23994803226082678,-0.3397300763579805,0.012718993702004506,-0.014968285114503552,-0.463777322226702,-7.228192539394373,-0.660582081132919,-0.32922045124694616,0.2522370342699232,-0.20750648684491296,-0.1544100049361773,-0.01172805030598843,-0.09471730913786472,-0.40551209700933866,0.14100497828499076,-0.010436013030247774,0.769074932772145,0.32681491888244374,-0.18344837907142808,0.12418981018044838,-0.18133019876341866,0.5904448713553145,0.11318890588664765,-0.06154828852650472,-0.10329946041967684,-0.06910140525232704,0.8422263323948141,-0.010635767152449094,0.5237734801259225,-0.5623619351489334,0.006807793916155479,-0.4665541342609925,0.0228520425431028,0.07043337928470103,-0.4401454186298911,0.055006069877391234,0.8698621551175588,-0.6781519468261064,-0.6593469417767548,-0.49023997914034817,-0.493278934226701,-0.616079197447221,0.04248963384229036,-0.1277824354844443,-0.7589221424977649,-0.6751356714947071,-0.39049824298070973,0.47575136899765963,0.6826598107887596,0.30498649529129906,0.1704157709623447,-0.3244544151196405,0.19048692978436285,0.30016447462379364,-0.1637452201397603,-0.34899330465955924,0.15730279147282103,0.5806242988528828,0.597650958370818,0.7366375587814531,0.4621740818956401,0.10441050774301486,-0.17823375632137659,-0.3766580628136529,0.36724688135015193,0.4234213977075965,-0.45926208005117514,-0.01024907081174353,-0.550008287542166,-0.6350881437831325,0.21961622893072646,0.6155689371742541,0.23813317976816004,0.640306990027057,0.35238592323561424,0.46382918774760235,0.023865052230919295,0.028228545892819486,-0.1252351714049599,-0.15222806648301707,0.4246565757867722,0.2538508651442649,0.10343050446517324,0.15151602772265296,0.17158210644764793,-0.058693362930645046,0.04647740473696369,-4.487841115642473,-0.017371472170244963,0.08766496655230735,0.389522003878046,0.504509318808309,0.25385964830384417,0.28476440108893075,0.1697185330503925,0.18463589203623249,0.02669722959674084,0.1096346487200447,-0.33777984447078707,0.4439008315448509,0.39488274583364985,0.3148849177881808,0.3026619806459832,0.09406354671747176,0.31162689270484384,0.14516065957692267,-0.10270679835495629,0.28546667512172275,0.4176377901165143,0.4424771503058613,0.3849080887236488,0.3960159864568431,0.3360597629093571,0.25110971272776805,0.3454942732622686,0.09916294130160752,0.33544693529790376,0.46019802815644206,0.4241861873669457,0.31669108070948954,0.3221197472123138,0.2170250211977326,0.3508122007440781,0.40171621150947423,-0.017074270849537273,0.10012618979788096,0.9185711543133763,0.6755894834441701,0.5539176249616904,0.2827313279208963,0.4359716677570421,0.6315812724914508,0.12159722086334014,-0.1577525543423052,0.14411395199869498,0.1808286963428228,0.4154876142946515,-0.2134948743657926,0.18455231274323447,0.11766699032486709,0.13403558491281825,0.2562386473908291,-0.2746370481983655,0.19382627418125198,0.3688909066801772,0.31231667244886957,-0.11932365479622838,0.0872661091247665,0.5276279054928915,0.014000352905627384,-0.0584713523920937,0.2677778289534599,-0.1278822303740696,0.11854251763264771,0.24385775597487164,-0.15240947195706786,-0.01974678233750139,-0.017262277466370244,0.4095985784250368,-0.023633737664989662,-0.28437568495696036,0.0165048350684498,-0.13795701002510172,0.4097454057647676,0.13695187946051063,0.4313047040091359,0.061459794704400494,-0.12481124474241032,-0.0535592524658522,-6.155813743239216,-0.2273615520370738,-0.21800457131065795,0.8763181525815563,-0.002963558410722703,-0.2915341129008925,-0.78915711291563,-0.551974285372507,-0.004519659511127779,0.13112630054644608,-0.004308293568945958,-0.4502790036131984,0.391538809282463,-0.17770604278532803,-0.0034487379244586185,0.02721031780423008,-0.048800400041877745,0.2519241458361484,-0.5905012128049161,0.20141830072173025,0.1111985560436609,-0.48458494794808066,-0.19939972646157672,-0.47700949559390193,0.5270209757811168,-0.088577581643527,0.012278148435882928,-0.39748973714526475,-0.5322540523133604,-0.47939698871345066,0.020616737907520506,0.8445587613299491,-0.009777579889068135,1.6232147727109973,1.094056581863353,0.433563281484665,0.1316950819258672,0.487872772487707,0.11639941217674024,0.8440403625622362,0.14140199896027428,0.8697559966082741,-0.19584740242668797,1.5144845036384718,0.8054406765963803,0.3338995920023367,-0.4433102827116409,0.46749713277277993,-0.3698618874263685,0.8619147294047019,0.5965040762974899,0.7117833566872291,0.9194244880582837,0.3953526459496602,-0.2593814848906414,0.2151233001514174,-0.0941361628266432,0.07635064304746984,0.5777397403182717,0.7542064586614435,-0.552696562659416,0.293474014944413,0.2875232018005331,0.2716098836633815,0.10839161758903838,0.12291545137996963,-0.03705359687531236,0.5912396246297746,-0.08216578465899191,-0.4989417126253803,-0.052710560227166026,0.28608436820629746,-0.8636175533477193,0.291042606551692,-0.14069028062393743,0.3859084412676259,0.35820021109188394,-0.8064743017164971,-1.1472145605141457,-0.5202396270923844,0.5367683683400547,-0.8256092156585656,-6.584639705497478,-0.06937588522958672,-0.27264890037289735,0.17901563256488198,0.3402055444543622,0.39078618094445366,0.21317973254989664,0.3018100574642628,0.009660973437532673,-0.15652813892934808,-0.08733995194864996,-0.26632258988169827,0.08271015201601585,0.32018722015367324,0.0679827546530758,0.3880344132875661,0.25523800520236617,0.2293323161605887,0.3931036320761827,0.07007659082050627,0.27363056552704385,0.14666050957045107,0.2970897103746575,0.0933583137554597,0.5653932810364982,0.5203402228659669,0.34252873259436845,0.506246709306949,0.05269004823147636,0.3476775426152711,0.621867140114838,0.5955015286807784,0.44684150398364375,0.4950943952043629,-0.004403359811511217,0.30648097660084855,0.3480783074955757,0.034749959713619896,0.35652575732145647,1.036163944856012,0.6492490496915633,0.6606998684095388,0.2733046847880079,0.45112426620420204,0.1971378497591829,0.39649556774890005,0.43557092694644195,-0.12117589407768438,0.26959531689974936,0.2666058699177388,0.027815460949329393,0.38600953989740533,-0.24329028429235464,0.3076756980901171,0.24748600771688084,-0.023662389491532286,0.20243454978687642,0.6162411038205338,-0.05218525220982252,0.5945204655487206,0.21047687401244827,0.3709845018471738,-0.02251957704948387,0.06256480564120902,0.08968941580172245,-0.40670676350260154,0.4423198412584321,0.08984440503075218,0.03137062359884609,0.41737540673532714,0.25630128997375223,0.5804292469563966,0.25406486342668555,-0.08774098404936666,-0.08007800055546953,0.16815350356273892,0.20949402941646317,0.5174236783889032,0.2585270370116677,-0.11612150579340044,0.41627857959017395,0.296183690195714,-6.976966657451128,-0.006028507984927369,-0.09389326429483703,0.35709448544805156,0.4235888745617743,-0.5056215199178827,-0.6153890801009234,-0.300462626388637,0.25942349208876025,0.36006396422452863,0.6213456235162839,0.30330883055448854,0.364505878865135,1.053240334286612,-0.2199113748829728,-0.14380090370542434,-0.6297405793833626,-0.28046418894497893,0.2681134565745179,-0.37145676628431745,0.7435821625037117,-0.5508494491567613,-0.1685985569527729,-0.3994063880092097,-0.4011708924117711,-0.26981816054578556,0.6197226211225498,0.18804583440041434,-0.2791138973939635,-0.1236045920850147,0.6058469424730166,0.9592950472571372,0.1594232061334588,0.22521776024718043,-0.3440557122828824,0.5779481923501729,-0.6448178765462828,-0.1583820707074691,-0.2309342054251148,0.4862741528166872,1.0025620437671179,1.3593598475721373,-0.25048683756300666,0.14574541897251678,-0.5031286691652131,0.19038021201671015,0.6829270742048916,-0.1890871459855577,0.1391198175862209,0.9886362680436318,0.19022813632267568,0.39031660873303897,-0.3427851794301372,-0.003486850316100808,0.7379291152291136,0.03751775981831316,0.6921334416950812,0.6307886662740791,-0.381518406394405,-0.05112521598322703,0.2631305289493682,-0.04015171177726887,0.545981708557077,0.24350208642174437,-0.18506556633678464,0.3095069963671838,-0.007492291955251142,0.0002622843504705759,-0.39182067195203946,-0.20147666583146084,-0.18338073395177584,0.3121384206827586,0.5662078417571476,-0.031612142850288266,-1.10979276192073,-0.46955882150040273,-0.6665026274694077,0.7086568592962337,0.03866628001578159,0.3144056083765848,-0.2074834315866441,-0.004002588986384725,-5.874576642351516,-0.16520566746723914,0.09259218312751875,0.7733307129971052,0.07271058213438619,0.2957508882536194,0.2845476921814139,0.4906596896358669,0.5331220840925922,0.09426526834595762,-0.12262952094418615,-0.20591419265718972,0.27715493293609655,0.42230126558839315,-0.10271594259784197,0.3019997146134059,-0.29747469374174135,-0.05198949855026574,0.2470659835341303,-0.20561597569079748,0.4243460898687054,0.3013693372692316,0.5794530763836685,0.785554918860966,0.2671042445684683,0.0513029176808652,-0.10476911683644473,0.14348338610469102,-0.08939852356650227,0.2770167628463189,0.1485578109957706,0.2926053754194258,0.13825998105256082,0.07710237892727434,0.3960126770086787,0.20822256455666707,0.2594971805821696,0.03203234525213273,0.605302055993452,0.849931357749058,0.48396179852077786,0.8999784777545985,0.30730529263126644,0.2923678692693178,0.6675009114477943,0.5205927338731441,0.1291147467827919,-0.04079807943314187,0.7989567791017701,-0.21313834064503498,0.2209621433093085,0.19180724679866848,0.46155007934412945,0.5686854697699828,0.43399215753661236,0.25154678913355416,0.2537907121667063,0.5122928497621096,0.16625884149874265,0.46885395082907133,0.5519162565761111,0.7707932400319607,0.7239130127353607,-0.2431038333012675,0.26350298597716787,-0.1207191730211771,0.6153281911368353,0.4914283239705126,0.11709958198443993,0.35235613130826327,0.23852623279864196,0.3485834038099751,0.4652106527673036,0.0892047177217454,0.2587692220523377,0.37305474247354276,0.8825875964177917,0.17925758310149276,0.5746381391247581,0.4516939892934852,0.2381575156632488,0.3921082686885108,-8.820809292296504,-0.14094832121144812,0.03402859060751537,0.5612170416339635,0.3777829202819631,0.4579379505679101,0.28571896961176385,0.7951827071221159,0.4175751637680881,0.12982015249701395,0.10100627070548535,0.13975346425067373,0.28652936736377305,0.8514759235930427,0.39976012178942416,0.4116675497815429,0.1827029879424465,0.08782135348398531,0.3120715546590855,-0.33476888207359246,0.008512465058686934,0.7444387154512292,0.45993461383103795,0.5850678486378367,0.5829872979128974,0.4955024374129593,0.5059150772863135,0.38973458537950234,0.2323534049841186,0.00902276016007738,-0.004909927418260308,0.26056266008877316,0.26399455757214774,0.3296358015892455,0.3918549397327156,0.28440378283361306,0.18331644424035054,-0.043384045833668894,0.6474542639553348,0.9659823095334873,0.8016966605832563,0.7625205845064372,0.4111032460060152,0.4980071098500108,0.6913591234454993,0.7006122206914616,-0.03304454563521276,-0.00360969662451929,0.37190358425480835,-0.04169992849820832,0.3064531408241807,0.09540410677899629,0.5972324169879832,0.5340410830919747,0.6626640928501036,0.30596813099736325,0.0580142532145356,0.44616004904226786,0.5064190529598642,0.07366508267018938,-0.14674628153056765,0.31600304394436884,0.45231951581527374,0.014883451938931896,0.2870105545180973,-0.48635208047124284,0.4850008638353654,0.2421650702427891,0.10452520420280617,0.539137982165929,0.19805847196442977,0.28751111610780394,0.07587441809707465,-0.05267453093618674,0.025614228391032827,0.4184724020474342,0.38860953385453534,0.14349124143606717,0.4895847619617738,0.08642305745720696,0.2727045905381867,0.28994170631506866,-8.540961965075102,0.3794479023837486,-0.31870222915561497,0.9240519730325978,0.3975781536205187,0.08936969728183061,0.7220985927334472,0.4648605401145579,0.4533513576582565,0.20188000036152806,0.004314604204237033,-0.572319329382204,0.22733186385367848,0.26548856971750134,0.1615622879480772,0.735457244375841,0.5228527138675085,0.6316557271139899,-0.08249411713041561,0.40137494070842067,-0.3276016337456385,0.622939956536207,0.5760638204393329,0.5463103322510656,-0.007938419620649381,0.13684297112003038,0.2006318437459717,0.6650325712410983,0.003026416169771589,0.34987172515062076,0.7217083286779423,0.07231562007466241,0.03283938466564795,0.4396983347090491,0.508390876879296,0.1713809178624379,0.23006918619035555,0.1668151596220771,-0.08685554159190499,0.39633849793843673,0.46885734281440783,0.20570725914818552,0.585738923783942,0.6171950600408463,0.31957590660313206,0.02637350181896253,0.19408326149469565,0.014990069511896069,0.4750440264614135,-0.11305147191669636,0.32986222314282254,0.45599214867058785,0.037776778361042394,0.43582029965656516,0.17095117527545634,0.2623583657903214,0.4324621539133717,0.7038266737875983,-0.31883539819487206,-0.018445054791250536,0.051037506117304704,0.16057799063353884,0.6659136193367191,0.17230287451468773,0.1274599498049555,-0.03588067659474402,-0.1326424516142047,0.3566341211591161,0.29153957717250667,0.7054127171127328,0.022919518771260593,0.1976134763026887,0.48828118448768304,-0.2185482719378472,0.3293065727459176,0.22008052281517257,-0.09826048311591562,0.05842815434981728,0.4992472045813959,0.15198014675489988,0.1489064817795007,-0.018678613402871712,-8.071701914717663,0.2026029956154962,-0.06013357176229448,-0.13546014792265618,0.30135707575274584,0.19805168514693117,-0.055631607696401394,-0.012776065758672295,0.45021451318455663,0.1257455438030632,0.008836730989995007,-0.42585624301698116,0.3982400519359043,0.13854441477061877,0.7332961486385046,0.8075945299400834,0.1501082729276598,0.5400587666181845,0.5388781282632567,-0.538308858938814,0.49142792169324223,0.11288156876946823,0.1798164816235124,0.41957718718444575,0.4092159842432289,0.16552943203467008,0.18291967935818818,0.49419550123949446,0.5045938828538722,0.850342277890673,-0.36902461355778166,0.20599852041202427,0.18802447555537316,-0.9186146611126175,0.22172930157576204,-0.11485185658264349,-0.05225412303699747,0.6428068878739669,1.6190668435915185,1.5402968118965163,-17.320157125276005,-3.488208423808294,-0.6970290728345481,-0.06612718212280522,0.36942073199441894,1.4084697009318266,-0.439119587446559,0.4654750342060809,0.4068244452399014,-0.43983017506174127,-0.2588549352997429,-0.3545113207665316,0.3596989989856212,0.5506008706599447,-0.5040025205797508,0.44262740449424165,-0.5320057538023236,0.7110018526085736,0.7173620868246509,0.23495714688709696,0.5701921857991464,0.4469428407887418,0.7778150830762616,0.38741136979145746,-0.34333059755690803,-0.0747824142381108,-0.07938956681908024,0.7589069932307151,0.0690300867103458,-0.22595606142421792,-0.001015253309071742,-0.21533392840799553,0.7845492502655641,0.40084708346826525,-0.3300389663597295,0.19433954260265773,-0.011736011301711593,0.9888566532802067,0.8716462133971469,0.15234960005669568,0.5258480983797861,0.5744586012410788,-9.678971806354927,-0.4518332230237822,-0.7043908388681417,0.0712426234238228,-0.9504482345534507,0.9991080895477487,0.03340334451723868,0.588769686548705,-0.18913304210569043,0.14837629528573515,-0.5264597590817248,-0.4411179045678388,-0.21629512925025074,0.20126861311378827,0.6251671275756943,0.775608422566359,0.039043600364705174,0.397605706207475,0.8029446020042877,-0.1826991727353134,0.04281655156857479,-0.6350623285809945,0.7754052158976126,0.47662090806684615,-0.5532336626578059,1.1799467010650742,0.18619799805978296,0.45896598738023536,0.3421606358368139,0.17913474793474118,0.9549929521853838,0.46311496938328905,0.022030379479048515,0.6323330510613812,0.10985835167242489,-0.0257397887231107,0.18429557962137444,0.4996340290491334,0.00819103685406665,1.073271341914037,0.8363123951176169,0.4465078678111152,-0.555373710890703,0.897183835742945,0.7982087336551256,0.8570619006280423,0.30755811993567694,0.4183695914032109,0.531105314916431,-0.3962883343322543,0.41397607875581105,0.8795522057413206,0.1581570782772692,0.3188552127583173,-0.45022491787613395,0.6095847822995208,0.771433420201024,0.04612673871085669,0.6134259738262847,0.31370867189674045,0.23188959927412608,0.8168122851655265,0.12453719365796576,-0.1727322554989859,0.19962964396391647,0.543430743441875,-0.30363733923745684,-0.10365576595688965,-0.700542731049609,0.10377760935856738,-0.15751452324523893,0.37295571328640237,0.6230994616504107,-0.1579370004428932,-1.209098966226291,-0.24602332265808288,0.2243764965644567,0.010137756050641104,0.550109539311591,0.653798977531795,0.04521051685188458,-0.1919760038169441,-7.697164042054007,-0.0335547603517433,-0.16723380125322787,-0.11046642486901857,0.1015662659811363,0.818884784608358,0.637705821908473,0.44788849322162183,0.44741426561571623,0.14381616117035823,0.12161008890554714,0.13684559415389813,0.29888627952129254,0.3187261497901898,0.5214938530955187,0.6980225648129937,0.6187944505686366,0.8597530395192345,0.33455443492225523,-0.15031694958413502,0.005193104694598835,-0.6502567557613076,0.14550609612016197,0.048218949539534234,-0.1800026794923834,0.17937425959139378,0.037783743889907934,0.08954945134361958,-0.050692742929772536,0.1479029746857454,0.34295743176167226,0.4899558153933413,-0.1588050335379402,-0.5273139929293506,-1.2921117769321568,-0.8596224221390886,-0.4757151800606098,-0.04156957988589719,0.5886869159559411,-0.7232688198355384,-30.35456768245172,-7.8545374139516575,-3.5974723800210215,-1.5830014565394788,-0.12538882151764771,0.5392765973291314,0.04719023117832081,-0.05402259237124953,-1.193475527444774,-0.039972834400396354,-0.9824121917538019,-1.7694077699298156,-1.5411679792693977,-1.2418942668240986,-0.9010355607394747,-0.36254382521236767,0.3399549800021463,0.561654298224112,0.7838306920642307,0.167991451527076,-0.28539481296745123,0.04641859017180565,0.41541684952735414,0.44324106083073617,-0.12009259777510248,-0.18060953924724682,0.5206895244121859,0.11803165614242965,0.358757212435718,-0.07642834272535524,0.3613775161524699,0.6907571236016209,0.12801019630330007,0.02778534714369973,0.1330768101910058,0.22321574650420534,0.3295427277158041,0.4615683004448355,0.5677659871778483,0.4188590341897826,1.1720571543054927,0.36373849145407205,-7.065243462746523,-0.11394507961104569,-0.790014801416491,-0.3813687820394996,0.007240146144124078,0.37275062220334254,0.3305452271208334,0.0786229146016228,0.3066743959738353,-0.11467204912713358,-0.45387816283674515,0.2540001578278049,0.10066662682877973,0.9088651931708118,0.5044685149334225,0.4028965520112774,-0.07571059463894139,-0.1795457684611508,-0.31237036137409935,-0.013669815562695236,-0.25740142524403553,0.6358178441412312,0.24953724989913462,-0.17583871502035353,0.267670657313986,0.21482333101292284,-0.5547344273999585,-0.14263593973199745,-0.35930693786316814,-0.4145055124469838,0.13430588574350322,0.7435946652527632,0.1901207197697551,0.07262090155157765,1.0321798182359447,0.3716137478201001,0.4874395011785867,0.7899102021440056,-0.04000212831078289,-0.10970943718335263,1.293397401057367,0.38348149702400874,0.025996986915398864,0.8390388809388106,0.2303703840614409,-0.18994736099899387,0.014068651391274856,0.3118714297952832,0.7967241551394139,1.1507930752780804,0.3322542137060514,0.7750819303684677,0.5165331164454455,0.24128369285181378,0.4118497330645603,0.04801917937417925,-0.39151265032995075,-0.588758263299802,-0.10177415151205181,-0.28948138291363207,0.39754868438354035,1.1689166632214683,-0.4581616718902776,-0.3267823891528216,0.4885084011629863,0.22855746520440143,0.18204844399807912,-0.4609916303885829,0.12395882133390679,-0.21463682246961457,-0.39210950822390656,0.5354442539453311,-0.7905585452660155,-0.00031304263377567894,0.6520927716808367,0.10471371909300888,-0.02274917721158575,0.6046341359928515,0.05447618970405685,-0.05745421950835643,0.29013824546069805,0.1811384468584565,-6.923734457084978]},{"weights":[0.025002407162012418,-0.04822438247544643,-0.11080573946857504,-0.008547544800385736,0.009848098268758855,-0.17046465174797992,-0.017458468957700216,-0.046086441212961446,0.014424537057931276,-0.33509750340489225,-0.052839679243116985,-0.04328721253078328,-0.04937589699469779,0.04218400804759834,1.864486531806204,0.029305778627691823,-0.09508027616896769,0.06149542767212814,-0.019007295721678908,0.24537915986333517,0.02925551508341473,0.011842787366296193,-0.034492448300794315,-0.018045087990718685,0.0019599052047498066,0.086657880282559,-0.14454527132767583,0.016593200805842232,0.04983785637930376,-0.05520737739820272,0.018606787333546353,-0.056144706656396544,-0.037396876517533414,0.06318853596482481,-0.006425432316319564,0.10144011195539432,0.06770697218213377,0.004297941705589632,0.11249058143682643,-0.054642078210558984,0.8473511602685497,-0.0615476051770212,0.013342137209706744,-0.0035432260516635485,0.09420305379855937,0.036140778939044466,-0.1490078958070673,0.0659346156656009,0.13702934530741112,-0.033033772764627094,0.025967341829052838,-0.09747340097635658,0.12107978942527176,0.026055807013263647,-0.1081856345218859,-0.023988283386765348,-0.014010907030794774,-0.01296417198967907,-0.03384438431137108,-0.08367425944003977,-0.5179786237100441,-0.02205860897620563,0.8577783102724515,0.0435029589957356,0.779526829531254,0.06777080702356471,-0.03417973318756156,0.0036717748342127697,0.025690461827975485,0.11079550568778201,-0.06755235322395195,-0.026874010203895855,-0.08397349529603465,-0.037802751761970434,0.09153443577517263,0.0962935110627623,0.015052837323449753,-0.008481692406190549,0.09796474471321197,0.010076405613185005,0.046827423860753094,-0.046181521233796485,0.08393213725545436,-0.02443855280463494,2.2393620907170697,0.009096366739317205,-0.0643607954503866,0.001007277570475537,0.2034841367745815,-0.06948291680123049,0.08185490160232217,0.013601303495045616,-0.08842190512932749,0.07858479448030868,-0.03805398257896214,0.020516930698508757,-0.045914635804675225,-0.07447570703975914,0.0383359674884689,0.04274837604450348,0.08179737896265568,0.03697387582858124,0.061177064715093626,0.07591561421538771,0.1150358788290435,-0.022724760248430207,-0.019408432329737095,-0.12008952686681656,0.03523647406226956,-0.02226533119653894,-0.09247498754794616,0.014453565559925118,0.12715343870225698,0.0030394268695108444,0.011508983496737114,0.04060113527129049,-0.050935265904478645,0.08182744531392583,0.036865970204197115,0.08563267410511273,0.03891993660743139,0.03732057554644836,-0.008355074080007241,-0.007272129089268806,-0.07009524251504691,0.13343242045623663,0.0816107791710067,0.11718028627461283,-0.08817369494508598,0.899204477454777,0.01357416850898374,-0.07074580148314169,-0.06523320316753456,-0.021799551449253458,0.03828108714202254,-0.005123438992586923,-0.043399923122197294,-0.04761689181630481,0.026020376559449065,-0.023172379291413504,-0.24958962002753415,0.01256419745214409,-0.08784976193813511,-0.046815603646396066,-0.24138220498843774,0.03649460825488536,-0.035711027508623705,0.05888487774750961,-0.059277449904961116,-0.03338718894931242,0.02432242191622095,-0.038711427928973884,-0.001618864944083087,0.0037489500416335664,0.10118851867694752,0.1165893277364541,-0.09611195640021052,0.009954470224228197,0.07207823618666029,-0.11820528495854417,0.02058269141730319,0.07603427088655385,-0.05462744872488646,0.07786917953080492,-0.05606010495581166,-0.113517608630308,-0.0026021528931311965,0.07306635308432799,0.10680652427483468,-0.06207060950071977,0.5990205268504256,-0.0008789666821096155,-0.019981208087611602,-0.038740252586990195,0.007277068991544322,-0.07533520511366269,-0.05322762372131795,0.07729922383274386,-0.11052367863464505,0.057378633204008864,-0.06318098166116502,-0.06825303005388386,0.11592727440821068,0.004100052502985508,-0.03306732268396833,-0.05671404460337612,-0.08645336294618786,0.002932505844703362,0.04931239594556316,-0.017984344453000494,0.39737784962503286,-0.035607093257521746,1.3075732512471077,-0.044346731615259254,0.872759896011075,-0.04324232302537192,-0.07975186717673745,0.007277243437860967,-0.09705726176594094,0.02294073327807137,-0.018173613375831447,-0.046773723447008295,-0.15201695088007644,0.015044687424088207,0.019694381743522733,-0.19379524625373848,0.0021258174889640094,-0.016316536013368816,0.0905146686566603,-0.019553414826711663,-0.010659266940991794,-0.04117280133233906,0.032129712420587465,0.04609187669019779,-0.06880665431972065,0.049844073452107805,-0.04385781350755871,-0.022927882783969004,0.14596961737653388,0.0159633047354747,0.023545236692839523,-0.03853199793662206,0.03924383041872158,0.08449850955338686,-0.053506344418795614,0.05986892301696149,0.0003838875925732836,-0.09927501588831938,0.04365143308212326,-0.05332347159659682,1.9687574455140997,0.0768435260938015,-0.00003286853474387823,0.10986304167809793,-0.029789491962700792,0.12299031622291404,0.06139755769400911,0.04811784069110617,0.11168745173435515,-0.019186646502695158,-0.04712521360631287,0.0357449981445188,0.015062268278876223,-0.07971217483814781,-0.0057922284340797565,0.020517614587128023,-0.09741085570231364,-0.12189951233270403,0.016936589088366105,0.09031011125921326,-0.06441271448149735,-0.029611571338263896,0.07176672998861573,0.011852233653666855,-0.08394441487795364,-0.2503074233031577,-0.02087285206610389,0.3843759338562284,0.059779957699558246,0.9003666310742444]}]}');
// EXTERNAL MODULE: ./node_modules/layerganza/lib/index.js
var lib = __webpack_require__(2);

// CONCATENATED MODULE: ./src/modules/agent-deep-q-scratch-built/lib-deep-q-network-scratch-built/neural-network/NeuralNetwork.js
// } from '../../../layerganza'//@TODO and rm symlink too (cd src/modules; ln -s ../../../layerganza/lib/cjs/ layerganza)
/* harmony default export */ var NeuralNetwork = (function(inputCount,hiddenCount,outputCount){return new lib["Network"]([new lib["InputLayer"](inputCount),new lib["HiddenLayer"](hiddenCount,new lib["LeakyRelu"](),new lib["AdamOptimizer"]()),new lib["OutputLayer"](outputCount,new lib["Linear"](),new lib["AdamOptimizer"]())]);});
// EXTERNAL MODULE: ./node_modules/layerganza/lib/trainer/shuffleTrain.js
var shuffleTrain = __webpack_require__(3);
var shuffleTrain_default = /*#__PURE__*/__webpack_require__.n(shuffleTrain);

// CONCATENATED MODULE: ./src/modules/agent-deep-q-scratch-built/lib-deep-q-network-scratch-built/neural-network/networkTest.js
function networkTest(){var trainingSets=[//left, down, right
[[0,0,0],[-0.01,0.09,-0.01]],[[0,0,1],[-0.01,0.09,-0.51]],[[0,1,0],[-0.01,-0.41,-0.01]],[[0,1,1],[-0.01,-0.41,-0.51]],[[1,0,0],[-0.51,0.09,-0.01]],[[1,0,1],[-0.51,0.09,-0.51]],[[1,1,0],[-0.51,-0.41,-0.01]],[[1,1,1],[-0.51,-0.41,-0.51]]];var network=new NeuralNetwork(3,100,3);shuffleTrain_default()(network,trainingSets,1000);}// networkTest();
// import shallowNetworkTest from '../../fast-deep-net/network/shallowNetworkTest'
// shallowNetworkTest();
// import deepNetworkTest from '../../fast-deep-net/network/deepNetworkTest'
// deepNetworkTest();
// CONCATENATED MODULE: ./src/modules/agent-deep-q-scratch-built/lib-deep-q-network-scratch-built/math/arrayMath.js
function getIndexOfMaxValue(array){var maxValue=array[0];var maxIndex=0;for(var i=1,length=array.length;i<length;i++){var v=array[i];if(v>maxValue){maxIndex=i;maxValue=v;}}return maxIndex;}
// CONCATENATED MODULE: ./src/modules/agent-deep-q-scratch-built/lib-deep-q-network-scratch-built/math/random.js
function getRandomIntWithZeroMin(max){return Math.floor(Math.random()*max);}
// CONCATENATED MODULE: ./src/modules/agent-deep-q-scratch-built/lib-deep-q-network-scratch-built/Agent.js
// import Matrix from './Matrix'
var Agent_Agent=/*#__PURE__*/function(){function Agent(inputCount,numberOfActions,options){_classCallCheck(this,Agent);var defaultOptions={discountFactor:0.9,//was .075, future reward discount factor
randomActionProbability:0.05,// for epsilon-greedy policy
learningRate:0.01,//was 0.01, value function learning rate //@TODO this is not used in the NN anymore
experienceRecordInterval:25,// number of time steps before we add another experience to replay memory
experienceSize:5000,// size of experience replay
learningStepsPerIteration:10,tdErrorClamp:1.0};this._options=Object.assign(defaultOptions,options);this._neuralNetwork=new NeuralNetwork(inputCount,64,numberOfActions);//@TODO use state count rather than 100?
this.numberOfInputs=inputCount;this.numberOfActions=numberOfActions;this._lastActionStats={action:0,wasRandom:false,weights:new Float64Array(numberOfActions),tdError:0};this.exp=[];// experience records
this.expi=0;// where to insert new experience
this.t=0;this.lastReward=null;this.lastObservation=null;this.currentObservation=null;this.lastAction=null;this.currentAction=null;}/**
     *
     * @param {Number} lastReward - pass null if this is the first step or you want to skip learning
     * @param {Array} currentObservation
     * @returns {*}
     */_createClass(Agent,[{key:"learnAndAct",value:function learnAndAct(lastReward,currentObservation){var tdError=0;if(lastReward!==null){tdError=this._learn(lastReward);}// convert to a Matrix column vector
// var state = new Matrix(this.numberOfInputs, 1);
// state.setFrom(currentObservation);
var state=currentObservation;var actionWasRandom=false;var actionWeights=null;var action;// greedy wrt Q function
var actionMatrix=this._neuralNetwork.invoke(state);actionWeights=actionMatrix;action=getIndexOfMaxValue(actionMatrix);// returns index of argmax action
//epsilon greedy policy
if(Math.random()<this._options.randomActionProbability){action=getRandomIntWithZeroMin(this.numberOfActions);actionWasRandom=true;}// action = 0;
// console.log(actionWeights);
// shift state memory
this.lastObservation=this.currentObservation;this.lastAction=this.currentAction;this.currentObservation=state;this.currentAction=action;var lastActionStats=this._lastActionStats;lastActionStats.action=action;lastActionStats.wasRandom=actionWasRandom;lastActionStats.weights=actionWeights;lastActionStats.tdError=tdError;return action;}},{key:"getLastActionStats",value:function getLastActionStats(){return this._lastActionStats;}},{key:"_learn",value:function _learn(r1){// perform an update on Q function
if(this.lastObservation!==null&&this.lastReward!==null&&this._options.learningRate>0){// learn from this tuple to get a sense of how "surprising" it is to the agent
var tdError=this._learnFromExample(this.lastObservation,this.lastAction,this.lastReward,this.currentObservation);// decide if we should keep this experience in the replay //@TODO don't use this.t for replays
if(this.t%this._options.experienceRecordInterval===0){this.exp[this.expi]=[this.lastObservation,this.lastAction,this.lastReward,this.currentObservation];this.expi+=1;if(this.expi>this._options.experienceSize){this.expi=0;}// roll over when we run out
}this.t+=1;// sample some additional experience from replay memory and learn from it//@TODO re-enable
for(var k=0;k<this._options.learningStepsPerIteration;k++){var ri=getRandomIntWithZeroMin(this.exp.length);var e=this.exp[ri];this._learnFromExample(e[0],e[1],e[2],e[3]);}}this.lastReward=r1;// store for next update
return tdError;}},{key:"_learnFromExample",value:function _learnFromExample(lastObservation,lastAction,lastReward,currentObservation){// goal: Q(s,a) = r + discountFactor * max_a' Q(s',a')
// var actionMatrix = this._neuralNetwork.invoke(currentObservation);
// var estimatedFutureReward = actionMatrix[arrayMath.getIndexOfMaxValue(actionMatrix)];
var estimatedFutureReward=this.estimateFutureReward(currentObservation);var prediction=this._neuralNetwork.invoke(lastObservation);// var lastActionPredictedReward = prediction[lastAction];
//
// var tdError = lastActionPredictedReward - lastReward - estimatedFutureReward * this._options.discountFactor;
//
// if (tdError > this._options.tdErrorClamp) {
//     tdError = this._options.tdErrorClamp
// } else if (tdError < -this._options.tdErrorClamp) {
//     tdError = -this._options.tdErrorClamp
// }
//@TODO td error clamp?
var target=prediction.slice();var targetActionValue=lastReward+estimatedFutureReward*this._options.discountFactor;//@TODO uncomment
target[lastAction]=targetActionValue;// console.log('pred', prediction);
// console.log('targ', target);
this._neuralNetwork.learn(target);// console.log('npre', this._neuralNetwork.invoke(lastObservation));
// console.log('-');
//@TODO learn only from error output and not others?
var error=prediction[lastAction]-targetActionValue;// console.log('error:' + error);
return error;//@TODO chart error?
}},{key:"estimateFutureReward",value:function estimateFutureReward(currentObservation){var _this=this;var actionMatrix=this._neuralNetwork.invoke(currentObservation);var nonRandomReward=(1-this._options.randomActionProbability)*actionMatrix[getIndexOfMaxValue(actionMatrix)];var randomReward=this._options.randomActionProbability*actionMatrix.reduce(function(accumulator,currentValue){return accumulator+currentValue/_this.numberOfActions;});return nonRandomReward+randomReward;}},{key:"loadFromJson",value:function loadFromJson(json){this._neuralNetwork.loadFromJson(json);}},{key:"saveToJson",value:function saveToJson(){return this._neuralNetwork.saveToJson();}}]);return Agent;}();;
// CONCATENATED MODULE: ./src/modules/lib-agent-helper/qStateRenderer.js
var actionElements=null;var randomActionElement=null;var rewardElements=null;var randomActionValueElement;//@TODO move to react or canvas or chart lib?
//@TODO somehow show where the dynamic section of the bar starts?
// function ensureElementsExist() {
//     if (document.getElementById('DQNRender') && actionElements !== null) {
//         return;
//     }
//     document.getElementById('agentRendererContainer').innerHTML =
//         `<div id="DQNRender">
// Predicted expected reward from each action:
//     <div style="overflow: auto"><div style="float: left">w:&nbsp;</div> <div id="action0" style="background-color: lightgoldenrodyellow"></div></div>
//     <div style="overflow: auto"><div style="float: left">a:&nbsp;</div> <div id="action1" style="background-color: lightsalmon"></div></div>
//     <div style="overflow: auto"><div style="float: left">s:&nbsp;</div> <div id="action2" style="background-color: lightskyblue"></div></div>
//     <div style="overflow: auto"><div style="float: left">d:&nbsp;</div> <div id="action3" style="background-color: lightseagreen"></div></div>
//         <div style="overflow: auto"><div style="float: left">random action:&nbsp;<span id="actionRandomValue"></span></div><div id="actionRandom" style="background-color: lightcoral;height: 1em"></div></div>
//         <br>
//         Reward from last action:
//         <div style="overflow: auto"><div style="float: left">good&nbsp;</div> <div id="good" style="background-color: greenyellow"></div></div>
//     <div style="overflow: auto"><div style="float: left">bad&nbsp;</div> <div id="bad" style="background-color: orangered"></div></div>
// <br />
// </div>`;
//     actionElements = [
//         document.getElementById('action0'),
//         document.getElementById('action1'),
//         document.getElementById('action2'),
//         document.getElementById('action3'),
//     ];
//     randomActionElement = document.getElementById('actionRandom');
//     randomActionValueElement = document.getElementById('actionRandomValue');
//     rewardElements = [
//         document.getElementById('good'),
//         document.getElementById('bad'),
//     ];
// }
var lineHeight=15;var lengthMultiplier=100;var lineCount=10;var canvasHeight=lineHeight*lineCount;/**
 * Note: This function assumes it was called from inside a window.requestAnimationFrame
 */function renderAgentData(data){if(data.actionResponse){renderActionResponse(data.actionResponse);}if(data.reward){renderReward(data.reward);}}function renderActionResponse(actionResponse){//@TODO move out
// ensureElementsExist();
var maxActionValue=1;//actionResponse.weights[maxAction];
// const barFrontPadding = 100;
// const multiplier = 150;
var canvas=document.getElementById('agentRendererCanvas');//@TODO
if(!canvas){return;}var ctx=canvas.getContext('2d');if(canvas.height!==canvasHeight){canvas.height=canvasHeight;}ctx.clearRect(0,0,canvas.width,lineHeight*7);var renderBar=function renderBar(lineNumber,length,color,label){ctx.fillStyle=color;ctx.fillRect(0,lineNumber*lineHeight,length*lengthMultiplier,lineHeight);ctx.fillStyle='black';ctx.fillText(label,3,(lineNumber+1)*lineHeight-4);};renderBar(0,0,'white','Predicted expected reward from each action:');var colors=['lightgoldenrodyellow','lightsalmon','lightskyblue','lightseagreen'];var labels=['w','a','s','d'];var minActionValue=-1;for(var i=0,len=actionResponse.weights.length;i<len;i++){var value=actionResponse.weights[i];var fixedValue=value-minActionValue;if(fixedValue<minActionValue){fixedValue=0;}else if(fixedValue>maxActionValue*2){fixedValue=maxActionValue*2;}fixedValue+=1;// actionElements[i].style.width = (fixedValue * multiplier + barFrontPadding) + 'px';
// actionElements[i].innerHTML = value.toFixed(3);
renderBar(i+1,fixedValue,colors[i],labels[i]+': '+value.toFixed(3));}if(actionResponse.wasRandom){// randomActionValueElement.innerHTML = 'Infinity';
// randomActionElement.style.width = (3 * multiplier + barFrontPadding) + 'px';
renderBar(5,3,'lightcoral','random: Infinity');}else{// randomActionValueElement.innerHTML = '0';
// randomActionElement.style.width = '10px';
renderBar(5,0,'lightcoral','random: 0');}}function renderReward(reward){//@TODO move out
var canvas=document.getElementById('agentRendererCanvas');//@TODO
if(!canvas){return;}var ctx=canvas.getContext('2d');ctx.clearRect(0,lineHeight*7,canvas.width,canvas.height);var renderBar=function renderBar(lineNumber,length,color,label){//@TODO don't duplicate this code with the version above
ctx.fillStyle=color;ctx.fillRect(0,lineNumber*lineHeight,length*lengthMultiplier,lineHeight);ctx.fillStyle='black';ctx.fillText(label,3,(lineNumber+1)*lineHeight-4);};renderBar(7,0,'white','Reward from last action:');// const barFrontPadding = 100;
var multiplier=30;// ensureElementsExist();
// reward *= 100;
var good=0;var bad=0;if(reward<0){bad=-reward;}else{good=reward;}renderBar(8,good*multiplier,'greenyellow',"good: ".concat(good.toFixed(3)));// rewardElements[0].style.width = (good * multiplier + barFrontPadding) + 'px';
// rewardElements[0].innerHTML = good.toFixed(3);
renderBar(9,bad*multiplier,'orangered',"bad: ".concat(bad.toFixed(3)));// rewardElements[1].style.width = (bad * multiplier + barFrontPadding) + 'px';
// rewardElements[1].innerHTML = bad.toFixed(3);
}
// CONCATENATED MODULE: ./src/modules/agent-deep-q-scratch-built/DeepQNetwork.js
// import * as viewportConversions from '../../environment/viewportConversions'
// import RewardCalculator from '../lib-agent-helper/RewardCalculator'
// const inputCount = 5 * 3;
var DeepQNetwork_inputCount=environment_config.viewPortSize[0]*environment_config.viewPortSize[1];var agent=new Agent_Agent(DeepQNetwork_inputCount,actions.length);// let rewardCalculator = new RewardCalculator();
agent.loadFromJson(data);var DeepQNetwork_MatrixDeepQNetwork=/*#__PURE__*/function(){function MatrixDeepQNetwork(){// rewardCalculator = new RewardCalculator();
_classCallCheck(this,MatrixDeepQNetwork);}_createClass(MatrixDeepQNetwork,[{key:"getAction",value:/**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */function getAction(lastAction,lastReward,observationMatrix,_ref){var renderingEnabled=_ref.renderingEnabled;// const lastReward = rewardCalculator.calcLastReward(observation);
// const state = matrixToFlatArray(viewportConversions.convert9x9to5x3(observation.tileTypes));
var state=matrixToFlatArray(observationMatrix);var actionIndex=agent.learnAndAct(lastReward,state);var actionResponse=agent.getLastActionStats();var renderData={};if(renderingEnabled){renderData.actionResponse=actionResponse;if(lastReward!==null){renderData.reward=lastReward;}}// }
// let action = actions[actionIndex];
return[actionIndex,renderData];}},{key:"newGame",value:function newGame(){}},{key:"clearBrain",value:function clearBrain(){agent=new Agent_Agent(DeepQNetwork_inputCount,actions.length);// rewardCalculator = new RewardCalculator();
}},{key:"exportBrain",value:function exportBrain(){return agent.saveToJson();}}],[{key:"getName",value:function getName(){return'Reinforcement Learning - SARSA Deep Q Network with Layerganza - 9x9 Viewport';}},{key:"getDescription",value:function getDescription(){return'This agent uses the Expected-SARSA algorithm with a deep neural network as the Q function. The neural network is was built from scratch and is called Layerganza.';}}]);return MatrixDeepQNetwork;}();
// CONCATENATED MODULE: ./src/modules/environment/viewportConversions.js
// export function convert9x9to5x5(matrix) {
//     return shiftAndTrimMatrix(matrix, [0, -1], 1, [2, 2])
// }
var convert9x9to7x5OutputMatrix=createMatrix([7,5]);//Object pool to increase performance
function convert9x9to7x5(matrix){shiftAndTrimMatrix(matrix,[0,-1],1,[1,2],convert9x9to7x5OutputMatrix);return convert9x9to7x5OutputMatrix;}var convert9x9to5x5OutputMatrix=createMatrix([5,5]);//Object pool to increase performance
function convert9x9to5x5(matrix){shiftAndTrimMatrix(matrix,[0,-1],1,[2,2],convert9x9to5x5OutputMatrix);return convert9x9to5x5OutputMatrix;}var convert9x9to5x3OutputMatrix=createMatrix([5,3]);//Object pool to increase performance
function convert9x9to5x3(matrix){shiftAndTrimMatrix(matrix,[0,-1],1,[2,3],convert9x9to5x3OutputMatrix);return convert9x9to5x3OutputMatrix;}// var convert9x9to5x2OutputMatrix = createMatrix([5, 2]);//Object pool to increase performance
// export function convert9x9to5x2(matrix) {
//     shiftAndTrimMatrix(matrix, [0, -0], 1, [2, 2], convert9x9to5x2OutputMatrix);
//     return convert9x9to5x2OutputMatrix;
// }
// var convert9x9to3x2OutputMatrix = createMatrix([3, 2]);//Object pool to increase performance
// export function convert9x9to3x2(matrix) {
//     shiftAndTrimMatrix(matrix, [0, -0], 1, [3, 2], convert9x9to3x2OutputMatrix);
//     return convert9x9to3x2OutputMatrix;
// }
// EXTERNAL MODULE: ./node_modules/tabular-sarsa/src/index.js
var src = __webpack_require__(4);

// CONCATENATED MODULE: ./src/modules/agent-tabular-sarsa/TabularSARSA.js
// import { data as savedBrain } from '../../data/saves/tabular-sarsa'
// import { settings } from '../../App'
/**
 * This controls whether we make the agent aware of what it's last action was. Setting this to true causes the agent
 * to get stuck in "back and forth" loops much less often but it also unfortunately makes it impossible to load saved
 * brain data in Chrome because chrome returns "call stack size exceeded" when parsing the large saved JSON.
 * @type {boolean}
 */var rememberLastAction=true;var viewportPixelCount=5*3;var stateCount=Math.pow(2,viewportPixelCount)*(rememberLastAction?actions.length:1);var TabularSARSA_agent=new src["Agent"](stateCount,actions.length);// agent.loadFromJson(savedBrain);//Load the previously saved brain
/**
 * Takes an array of 0s and 1s and converts the whole thing to a single int
 *
 * @param array
 * @returns {number}
 */function arrayOfBinariesToInt(array){var output=0;for(var i=0,len=array.length;i<len;i++){output+=array[i]*Math.pow(2,i);}return output;}/**
 * Take an observation object and returns an int that represents the given observation state
 *
 * @param {AgentObservation} observation
 * @param lastAction
 * @returns {number}
 */function observationToInt(observation,lastAction){var viewportState=arrayOfBinariesToInt(matrixToFlatArray(//Trim down the viewport to reduce the combinatorial explosion
convert9x9to5x3(observation)));if(rememberLastAction){return viewportState*(lastAction+1);}else{return viewportState;}}var TabularSARSA_TabularSARSA=/*#__PURE__*/function(){function TabularSARSA(){_classCallCheck(this,TabularSARSA);this._lastAction=0;// rewardCalculator = new RewardCalculator();
}_createClass(TabularSARSA,[{key:"getAction",value:/**
     * @param {AgentObservation} observation
     * @TODO clear last actions when is new game
     * @return {string} action code
     */function getAction(lastAction,lastReward,observationMatrix,_ref){var renderingEnabled=_ref.renderingEnabled;// let reward = rewardCalculator.calcLastReward(observation);
var state=observationToInt(observationMatrix,this._lastAction);var actionIndex=TabularSARSA_agent.decide(lastReward,state);var lastActionStats=TabularSARSA_agent.getLastActionStats();var renderData={};if(renderingEnabled){renderData.actionResponse={weights:lastActionStats.weights,wasRandom:lastActionStats.wasRandomlyChosen};if(lastReward!==null){renderData.reward=lastReward;}}this._lastAction=actionIndex;return[actionIndex,renderData];}},{key:"newGame",value:function newGame(){}},{key:"clearBrain",value:function clearBrain(){TabularSARSA_agent=new src["Agent"](stateCount,actions.length);}},{key:"exportBrain",value:function exportBrain(){return TabularSARSA_agent.saveToJson();}}],[{key:"getName",value:function getName(){return'Reinforcement Learning - Tabular SARSA - 5x3 Viewport - Not Pre-trained';}},{key:"getDescription",value:function getDescription(){return'This agent uses the Expected-SARSA algorithm with a table-based Q function.'+' The table stores the expected reward for '+stateCount+' possible states.'+' This agent views a 5x3 section of the viewport. '+(rememberLastAction?' It also remembers the last action it took to help avoid loops.':'');}}]);return TabularSARSA;}();
// CONCATENATED MODULE: ./src/agents.js
// import DeepQNetworkTensorFlow from './modules/agent-deep-q-network-tensor-flow'
var agents=[// {
//     name: DeepQNetworkTensorFlow.getName(),
//     class: DeepQNetworkTensorFlow
// },
{name:DeepQNetwork_MatrixDeepQNetwork.getName(),class:DeepQNetwork_MatrixDeepQNetwork,description:DeepQNetwork_MatrixDeepQNetwork.getDescription(),render:renderAgentData},{name:TabularSARSA_TabularSARSA.getName(),class:TabularSARSA_TabularSARSA,description:TabularSARSA_TabularSARSA.getDescription(),render:renderAgentData},{name:LookAhead9x3_LookAhead9x3.getName(),class:LookAhead9x3_LookAhead9x3,description:LookAhead9x3_LookAhead9x3.getDescription()}];
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
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// CONCATENATED MODULE: ./src/GameRunner.js
var historyLength=1000;var defaultStats={currentScore:0,lastGameScore:0,scoreSum:0,gameCount:0,actionCount:0,actionsPerSecond:0,lastSecondsActionCount:0,lastFinalScores:[],gameCountToScore:[],gameCountToAverageScore:[],averageFinalScore:0,lastActionScore:0,totalReward:0};var GameRunner_GameRunner=/*#__PURE__*/function(){function GameRunner(){var _this=this;_classCallCheck(this,GameRunner);this._universalGameNumber=0;this._renderingEnabled=false;this._stats=Object.assign({},defaultStats);this._agentObservation=null;this._globalObservation=null;// this._agentClass = null;
// this._nextAction = null;
this._nextAction=0;//@TODO this doesn't seem right
this.newGame=this.newGame.bind(this);this.takeAction=this.takeAction.bind(this);this.tick=this.tick.bind(this);this.clearStats=this.clearStats.bind(this);this.setRenderingEnabled=this.setRenderingEnabled.bind(this);this.last={action:null,reward:null};setInterval(function(){//@TODO accomplish this without an interval?
_this._stats.actionsPerSecond=_this._stats.actionCount-_this._stats.lastSecondsActionCount;_this._stats.lastSecondsActionCount=_this._stats.actionCount;},1000);}_createClass(GameRunner,[{key:"newGame",value:function newGame(agentInstance){this._universalGameNumber++;this._agent=agentInstance;this._environment=new environment_Environment();this._stats.currentScore=0;//@TODO get from environment?
this._updateObservations();}},{key:"clearCurrentAgentBrain",value:function clearCurrentAgentBrain(){if(this._agent.clearBrain){this._agent.clearBrain();}}},{key:"getStats",value:function getStats(){return this._stats;}/**
     *
     * @param actionCode
     */},{key:"takeAction",value:function takeAction(action){var stats=this._stats;var actionCode=actions[action];//Apply the action and get the next observation
if(actionCode!==null){this._environment.applyAction(actionCode);}this._updateObservations();if(this._globalObservation.isComplete){//@Find better way to communicate "isComplete"
this._agent.getAction(this.last.action,this.last.reward,this._agentObservation.tileTypes,{renderingEnabled:this._renderingEnabled});//Ask for one more action so the agent can see the observation after its last action
this._agent.newGame();stats.lastGameScore=stats.currentScore;stats.lastFinalScores.push(stats.currentScore);if(stats.lastFinalScores.length>100){stats.lastFinalScores.shift();}var totalScoreFinaleScore=stats.lastFinalScores.reduce(function(acc,val){return acc+val;},0);stats.averageFinalScore=totalScoreFinaleScore/stats.lastFinalScores.length||0;stats.scoreSum+=stats.currentScore;stats.gameCountToScore.push(stats.lastGameScore);stats.gameCountToAverageScore.push(stats.averageFinalScore);stats.gameCount+=1;//If the history arrays get twice as large as the preferred history length, slice them off.
if(stats.gameCountToScore.length>historyLength*2){stats.gameCountToScore=stats.gameCountToScore.slice(-historyLength);stats.gameCountToAverageScore=stats.gameCountToAverageScore.slice(-historyLength);}this.newGame(this._agent);}var renderData=null;if(this._renderingEnabled){renderData={agentObservation:this._agentObservation,globalObservation:this._globalObservation,universalGameNumber:this._universalGameNumber,stats:stats};}stats.actionCount++;var reward=this._agentObservation.lastReward;stats.lastActionScore=stats.lastActionScore+this._agentObservation.lastReward;stats.currentScore+=this._agentObservation.lastReward;stats.totalReward+=reward;this.last.reward=reward;this.last.action=action;var _this$_agent$getActio=this._agent.getAction(this.last.action,this.last.reward,this._agentObservation.tileTypes,{renderingEnabled:this._renderingEnabled}),_this$_agent$getActio2=_slicedToArray(_this$_agent$getActio,2),nextAction=_this$_agent$getActio2[0],agentRenderData=_this$_agent$getActio2[1];this._nextAction=nextAction;return _objectSpread2(_objectSpread2({},renderData),{},{agentRenderData:agentRenderData});}},{key:"setRenderingEnabled",value:function setRenderingEnabled(renderingEnabled){this._renderingEnabled=renderingEnabled;}},{key:"getCurrentAgentInstance",value:function getCurrentAgentInstance(){return this._agent;}},{key:"tick",value:function tick(){return this.takeAction(this._nextAction);}},{key:"clearStats",value:function clearStats(){this._stats=Object.assign({},defaultStats);this._stats.lastFinalScores=[];this._stats.gameCountToScore=[];this._stats.gameCountToAverageScore=[];this._stats.currentScore=0;}},{key:"_updateObservations",value:function _updateObservations(){this._agentObservation=this._environment.getAgentObservation();this._globalObservation=this._environment.getGlobalObservation();}}]);return GameRunner;}();
// CONCATENATED MODULE: ./src/LudicrousSpeedTicker.js
/**
 * The purpose of this class is to run as many ticks as possible while still pausing for a moment periodically
 * so that JS can run event handlers for worker post-message events.
 * 
 * Batch sizes are automatically adjusted based on how long batches are taking to complete. This allows the app
 * to run well on a wide variety of hardware.
 * 
 * @TODO put this deeper in folder structure?
 */var LudicrousSpeedTicker_LudicrousSpeedTicker=/*#__PURE__*/function(){function LudicrousSpeedTicker(tickCallback,config){_classCallCheck(this,LudicrousSpeedTicker);this.config=config;this.tickCallback=tickCallback;this.ludicrousSpeedEnabled=false;this.ludicrousBatchSize=this.config.initialGameTicksPerRender;this.runGameTickBatch=this.runGameTickBatch.bind(this);this.startTickerLoop=this.startTickerLoop.bind(this);this.setLudicrousSpeedTickingEnabled=this.setLudicrousSpeedTickingEnabled.bind(this);}/**
     * Calling this when an agent changes prevents lag when switching from a very fast agent to a slower agent.
     */_createClass(LudicrousSpeedTicker,[{key:"handleAgentChange",value:function handleAgentChange(){this.ludicrousBatchSize=this.config.initialGameTicksPerRender;}/**
     * Run a batch of game ticks and adjust the batch size if necessary
     */},{key:"runGameTickBatch",value:function runGameTickBatch(){var batchStartTimeMs=Date.now();for(var i=0;i<this.ludicrousBatchSize;i++){this.tickCallback();}var batchDurationMs=Date.now()-batchStartTimeMs;if(batchDurationMs>this.config.maxGameTickBatchDurationMs){this.ludicrousBatchSize=this.ludicrousBatchSize/this.config.batchSizeAdjustmentMultiplier;}else if(batchDurationMs<this.config.maxGameTickBatchDurationMs/this.config.batchSizeAdjustmentMultiplier){// const newValue = Math.min(1, this.ludicrousBatchSize * this.config.batchSizeAdjustmentMultiplier);
// if (newValue > 1) {
//      newValue;
// }
this.ludicrousBatchSize=Math.max(this.ludicrousBatchSize*this.config.batchSizeAdjustmentMultiplier,1);}}/**
     * Start ticking. This calls its self to keep ticking. The setTimeout allows JS a chance to check for events such as worker messages
     */},{key:"startTickerLoop",value:function startTickerLoop(){if(this.ludicrousSpeedEnabled){this.runGameTickBatch();setTimeout(this.startTickerLoop);//@TODO is there a better way to listen for messages than setTimeout?
}}/**
     * Turns ludicrous speed on or off
     */},{key:"setLudicrousSpeedTickingEnabled",value:function setLudicrousSpeedTickingEnabled(tickingEnabled){var ludicrousSpeedWasEnabled=this.ludicrousSpeedEnabled;this.ludicrousSpeedEnabled=tickingEnabled;if(this.ludicrousSpeedEnabled&&!ludicrousSpeedWasEnabled){this.startTickerLoop();}}}]);return LudicrousSpeedTicker;}();/* harmony default export */ var src_LudicrousSpeedTicker = (LudicrousSpeedTicker_LudicrousSpeedTicker);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--5-oneOf-2!./src/worker.js
var ctx=self;var WorkerInputActions={Tick:'TICK',ClearStatsAndNewGame:'CLEAR_STATS_AND_NEW_GAME',SetLudicrousSpeedEnabled:'SET_LUDICROUS_SPEED_ENABLED',RequestStats:'REQUEST_STATS',UserMove:'USER_MOVE',SetAgentIndex:'SET_AGENT_INDEX',ClearAgentBrain:'CLEAR_AGENT_BRAIN'};var WorkerOutputActions={UpdateState:'UPDATE_STATE'};var gameRunner=new GameRunner_GameRunner();var ludicrousSpeedTicker=new src_LudicrousSpeedTicker(gameRunner.tick,src_config.ludicrousSpeed);var agentInstances=[];var agentIndex=0;var worker_clearStatsAndNewGame=function clearStatsAndNewGame(){if(!agentInstances[agentIndex]){agentInstances[agentIndex]=new agents[agentIndex].class();}gameRunner.setRenderingEnabled(!ludicrousSpeedTicker.ludicrousSpeedEnabled);gameRunner.clearStats();gameRunner.newGame(agentInstances[agentIndex]);ludicrousSpeedTicker.handleAgentChange();};/**
 * Handle messages from the parent thread
 */ctx.addEventListener("message",function(event){var action=event.data;// console.log('action to worker', action);
switch(action.type){case WorkerInputActions.Tick:ctx.postMessage({type:WorkerOutputActions.UpdateState,payload:gameRunner.tick()});break;case WorkerInputActions.ClearStatsAndNewGame:worker_clearStatsAndNewGame();break;case WorkerInputActions.SetLudicrousSpeedEnabled:ludicrousSpeedTicker.setLudicrousSpeedTickingEnabled(action.payload);gameRunner.setRenderingEnabled(!ludicrousSpeedTicker.ludicrousSpeedEnabled);break;case WorkerInputActions.RequestStats:ctx.postMessage({type:WorkerOutputActions.UpdateState,payload:{stats:gameRunner.getStats()// stats: {
//     ...gameRunner.getStats(),
//     batchSize: ludicrousSpeedTicker.ludicrousBatchSize
// }
}});break;case WorkerInputActions.UserMove:ctx.postMessage({type:WorkerOutputActions.UpdateState,payload:gameRunner.takeAction(action.payload)});break;case WorkerInputActions.SetAgentIndex:agentIndex=action.payload;worker_clearStatsAndNewGame();break;case WorkerInputActions.ClearAgentBrain:gameRunner.clearCurrentAgentBrain();worker_clearStatsAndNewGame();break;}});

/***/ })
/******/ ]);
//# sourceMappingURL=worker.a3d8ffff.worker.js.map