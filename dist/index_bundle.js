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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AgentObservation__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__generateInitialState__ = __webpack_require__(31);



// import {getVisibleTiles} from './getVisibleTiles'

const config = {
    size: [31, 31],

    //TINY VIEWPORT
    // viewPortSize: [5, 5],
    // viewPortOffset: [0, 1],

    //SMALL VIEWPORT
    // viewPortSize: [7, 7],
    // viewPortOffset: [0, 1],

    //NORMAL VIEWPORT
    viewPortSize: [9, 9],
    viewPortOffset: [0, 2],

    verticalDeltaScore: 10,
    minTileValue: -20,
    tileValueMap: [-1, -20],
    // pointsForCompletion: 100
};
/* harmony export (immutable) */ __webpack_exports__["a"] = config;


/**
 * The main environment class for this game. This is the public interface for the game.
 */
class Environment {
    constructor() {
        this._state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__generateInitialState__["a" /* generateInitialState */])();

        //Bind these to create proper JavaScript "this" context
        this.applyAction = this.applyAction.bind(this);
        this.getAgentObservation = this.getAgentObservation.bind(this);
        this.getGodObservation = this.getGodObservation.bind(this);
    }

    /**
     * Mutates the environment's internal state by processing the given action
     *
     * @param actionCode
     */
    applyAction(actionCode) {
        switch (actionCode) {
            case "w":
                if (this._state.position[1] > 0) {
                    this._state.position[1]--;
                }
                this._state.score = this._state.score - config.verticalDeltaScore;
                break;
            case "a":
                if (this._state.position[0] > 0) {
                    this._state.position[0]--;
                }
                break;
            case "s":
                if (this._state.position[1] < config.size[1] - 1) {
                    this._state.position[1]++;
                }
                this._state.score = this._state.score + config.verticalDeltaScore;
                break;
            case "d":
                if (this._state.position[0] < config.size[0] - 1) {
                    this._state.position[0]++;
                }
                break;
        }
        this._state.isComplete = this._state.position[1] == config.size[1] - 1;// || this._state.score < -100;

        this._state.score = this._state.score + config.tileValueMap[this._state.tileTypes[this._state.position[0]][this._state.position[1]]];

        // if (this._state.isComplete) {
        //     this._state.score += config.pointsForCompletion;
        // }
    }

    /**
     * Returns what the agent can see about the current environment state
     *
     * @returns {AgentObservation}
     */
    getAgentObservation() {
        const trimAmount = [
            Math.floor((config.size[0] - config.viewPortSize[0]) / 2),
            Math.floor((config.size[1] - config.viewPortSize[1]) / 2)
        ];
        const shiftVector = [
            Math.ceil(this._state.position[0] - config.size[0] / 2),
            Math.ceil(this._state.position[1] - config.size[0] / 2) + config.viewPortOffset[1]
        ];
        const trimVector = [trimAmount[0], trimAmount[1]];

        let tileTypes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tensorTools__["b" /* shiftAndTrimMatrix */])(this._state.tileTypes, shiftVector, 1, trimVector);


        //Make the bottom exit row look safe by making its tile not red
        const limit = config.size[1] - trimAmount[1] - shiftVector[1];
        if (limit < config.viewPortSize[1]) {
            for (let x = 0; x < config.viewPortSize[0]; x++) {
                for (let y = limit; y < config.viewPortSize[1]; y++) {
                    tileTypes[x][y] = 0;
                }
            }
        }

        return new __WEBPACK_IMPORTED_MODULE_1__AgentObservation__["a" /* default */](
            // shiftAndTrimMatrix(getVisibleTiles(this._state), shiftVector, 1, trimVector),
            tileTypes,
            this._state.score,
            [
                Math.floor(config.size[0] / 2) - trimAmount[0],
                Math.floor(config.size[1] / 2) - trimAmount[1] - config.viewPortOffset[1]
            ]
        );
    }

    getGodObservation() {
        return this._state
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Environment;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createMatrix */
/* unused harmony export getMatrixDimensions */
/* unused harmony export matrixPositionExists */
/* unused harmony export forEachValueInMatrix */
/* unused harmony export shiftMatrix */
/* harmony export (immutable) */ __webpack_exports__["b"] = shiftAndTrimMatrix;
/* harmony export (immutable) */ __webpack_exports__["a"] = matrixToVector;
function createMatrix(dimensions, defaultValue) {//@TODO take dimensions instead of size
    let matrix = [];

    for (let i0 = 0; i0 < dimensions[0]; i0++) {
        matrix[i0] = [];
        for (let i1 = 0; i1 < dimensions[1]; i1++) {
            matrix[i0][i1] = defaultValue;
        }
    }

    return matrix;
}

function getMatrixDimensions(matrix) {
    return [matrix.length, matrix[0].length];
}

function matrixPositionExists(matrix, x, y) {
    return typeof matrix[x] !== 'undefined' && typeof matrix[x][y] !== 'undefined';
}

function forEachValueInMatrix(matrix, callback) {
    const dimensions = getMatrixDimensions(matrix);
    for (let x = 0; x < dimensions[0]; x++) {
        for (let y = 0; y < dimensions[1]; y++) {
            callback(x, y, matrix[x][y]);
        }
    }
}

function shiftMatrix(matrix, vector, defaultValue) {
    const dimensions = getMatrixDimensions(matrix);
    const newMatrix = createMatrix(dimensions, defaultValue);

    for (let x = 0; x < dimensions[0]; x++) {
        for (let y = 0; y < dimensions[1]; y++) {
            const fromX = x + vector[0];
            const fromY = y + vector[1];
            if (fromX >= 0 && fromX < dimensions[0] && fromY >= 0 && fromY < dimensions[0]) {
                newMatrix[x][y] = matrix[fromX][fromY]
            }
        }
    }

    return newMatrix;
}


function shiftAndTrimMatrix(matrix, shiftVector, defaultValue, trimVector) {
    shiftVector = [shiftVector[0] + trimVector[0], shiftVector[1] + trimVector[1]];
    const dimensions = [matrix.length, matrix[0].length];
    const newDimensions = [dimensions[0] - trimVector[0] * 2, dimensions[1] - trimVector[1] * 2];
    const newMatrix = createMatrix(newDimensions, defaultValue);

    for (let x = 0; x < newDimensions[0]; x++) {
        for (let y = 0; y < newDimensions[1]; y++) {
            const fromX = x + shiftVector[0];
            const fromY = y + shiftVector[1];
            if (fromX >= 0 && fromX < dimensions[0] && fromY >= 0 && fromY < dimensions[0]) {
                newMatrix[x][y] = matrix[fromX][fromY]
            }
        }
    }

    return newMatrix;
}

function matrixToVector(matrix) {
    let vector = [];
    for (let xI = 0, len = matrix[0].length; xI < len; xI++) {
        vector = [...vector, ...matrix[xI]];
    }
    return vector;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(0);
/* unused harmony export getFeelerValue */
/* unused harmony export getFeelerValues */
/* unused harmony export filterPathsWithFirstAction */
/* unused harmony export getBestFeeler */
/* harmony export (immutable) */ __webpack_exports__["a"] = getActionViaFeelers;


const oppositeActions = {
    w: 's',
    a: 'd',
    s: 'w',
    d: 'a'
};
/* unused harmony export oppositeActions */


const actionVectors = {
    //[dX, dY, dScore]
    w: [0, -1, -__WEBPACK_IMPORTED_MODULE_0__environment__["a" /* config */].verticalDeltaScore],
    a: [-1, 0, 0],
    s: [0, 1, __WEBPACK_IMPORTED_MODULE_0__environment__["a" /* config */].verticalDeltaScore],
    d: [1, 0, 0],
};

function getFeelerValue(observation, feelerSteps) {
    let position = [observation.position[0], observation.position[1]];
    let value = 0;
    feelerSteps.forEach((step) => {
        const vector = actionVectors[step];
        position = [position[0] + vector[0], position[1] + vector[1]];
        let cost;
        if (typeof observation.tileTypes[position[0]] === 'undefined' || typeof observation.tileTypes[position[0]][position[1]] === 'undefined') {
            cost = __WEBPACK_IMPORTED_MODULE_0__environment__["a" /* config */].minTileValue * 2; //If going off map, make look very expensive
            // } else
            //     if (observation.visibles[position[0]][position[1]] === 0) {
            //     cost = 1;//config.maxTileCost / 2; //@TODO there must be a better way to deal with unknown tiles
        } else {
            cost = __WEBPACK_IMPORTED_MODULE_0__environment__["a" /* config */].tileValueMap[observation.tileTypes[position[0]][position[1]]]
        }
        value = value + vector[2] + cost;
    });
    return value;
}

function getFeelerValues(observation, feelerPaths) {
    return feelerPaths.map((feelerPath) => {
        return {
            path: feelerPath,
            value: getFeelerValue(observation, feelerPath)
        }
    });
}

function filterPathsWithFirstAction(paths, blacklistedFirstAction) {
    return paths.filter((path) => path[0] !== blacklistedFirstAction);
}

function getBestFeeler(feelersWithValues) {
    return feelersWithValues.reduce((bestFeelerSoFar, feeler) => {
        if (bestFeelerSoFar === null || feeler.value > bestFeelerSoFar.value) {
            return feeler;
        } else {
            return bestFeelerSoFar
        }
    }, null)
}

function getActionViaFeelers(observation, feelerPaths, lastAction) {
    //This filter prevents infinite back-and-forth movement
    const safeFeelerPaths = filterPathsWithFirstAction(
        feelerPaths, oppositeActions[lastAction]
    );

    const feelersWithValues = getFeelerValues(observation, safeFeelerPaths);

    const bestFeeler = getBestFeeler(feelersWithValues);

    return bestFeeler.path[0];
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rl__ = __webpack_require__(27);


function getMinimumVectorIndex(w) {
    var minv = w[0];
    var minix = 0;
    for (var i = 1, n = w.length; i < n; i++) {
        var v = w[i];
        if (v < minv) {
            minix = i;
            minv = v;
        }
    }
    return minix;
}

// function maxi(w) {
//     var minv = w[0];
//     var minix = 0;
//     for (var i = 1, n = w.length; i < n; i++) {
//         var v = w[i];
//         if (v < minv) {
//             minix = i;
//             minv = v;
//         }
//     }
//     return minix;
// }

let actionElements = null;
let randomActionElement = null;
let rewardElements = null;

function ensureElementsExist() {
    if (document.getElementById('DQNRender')) {
        return;
    }
    document.getElementById('agentRendererContainer').innerHTML =
        `<div id="DQNRender"><strong>Deep Q-Network Stats</strong>
    <br />Action Choice:
    <div style="overflow: auto"><div style="float: left">w:&nbsp;</div> <div id="action0" style="background-color: lightgoldenrodyellow;"></div></div>
    <div style="overflow: auto"><div style="float: left">a:&nbsp;</div> <div id="action1" style="background-color: lightsalmon"></div></div>
    <div style="overflow: auto"><div style="float: left">s:&nbsp;</div> <div id="action2" style="background-color: lightskyblue"></div></div>
    <div style="overflow: auto"><div style="float: left">d:&nbsp;</div> <div id="action3" style="background-color: lightseagreen"></div></div>
        <div style="overflow: auto"><div style="float: left">random action&nbsp;</div> <div id="actionRandom" style="background-color: lightcoral;height: 1em"></div></div>
        <br>
        Reward:
        <div style="overflow: auto"><div style="float: left">good&nbsp;</div> <div id="good" style="background-color: greenyellow"></div></div>
    <div style="overflow: auto"><div style="float: left">bad&nbsp;</div> <div id="bad" style="background-color: orangered"></div></div>
</div>`;
    actionElements = [
        document.getElementById('action0'),
        document.getElementById('action1'),
        document.getElementById('action2'),
        document.getElementById('action3'),
    ];
    randomActionElement = document.getElementById('actionRandom');
    rewardElements = [
        document.getElementById('good'),
        document.getElementById('bad'),
    ];
}

function renderActionResponse(actionResponse) {
    ensureElementsExist();

    if (actionResponse.wasRandom) {
        // randomElement.innerHTML = 100;
        randomActionElement.style.width = (100 * 3 + 50) + 'px';
        actionElements.forEach((element)=> {
            element.innerHTML = 0;
            element.style.width = '50px';
        });
    } else {
        // randomElement.innerHTML = 0;
        randomActionElement.style.width = '10px';
        const minAction = getMinimumVectorIndex(actionResponse.weights);
        // const maxA = maxi(actionResponse.weights);
        const maxAction = actionResponse.action;
        actionResponse.weights.forEach(function (value, i) { //@TODO what about if not in this else?
            let adder = 0;
            if (actionResponse.weights[minAction] < 0) {
                adder = -actionResponse.weights[minAction];
            }
            let fixedValue = Math.floor((value + adder) / (actionResponse.weights[maxAction] + adder) * 100);

            actionElements[i].style.width = (fixedValue * 3 + 50) + 'px';
            actionElements[i].innerHTML = fixedValue;
        });
    }
}

function renderReward(reward) {
    let good = 0;
    let bad = 0;
    if (reward < 0) {
        bad = -reward;
    } else {
        good = reward;
    }

    rewardElements[0].style.width = (good * 15 + 50) + 'px';
    rewardElements[0].innerHTML = good;

    rewardElements[1].style.width = (bad * 15 + 50) + 'px';
    rewardElements[1].innerHTML = bad;
}

class RlDqn {
    constructor(learningEnabled, numberOfStates, previousSavedData) {
        // create an environment object
        var env = {};
        env.getNumStates = function () {
            return numberOfStates;
        };
        env.getMaxNumActions = function () {
            return 4;
        };

        // create the DQN agent
        var spec = {alpha: 0.01}; // see full options on DQN page
        this._agent = new __WEBPACK_IMPORTED_MODULE_0__rl__["a" /* rl */].DQNAgent(env, spec);
        if (typeof previousSavedData !== 'undefined') {
            this._agent.fromJSON(previousSavedData);
        }

        this._dumpTimer = 0;
        this._learningEnabled = learningEnabled;
    }

    getAction(state, reward) {
        if (this._learningEnabled) {
            if (reward !== null) {
                this._agent.learn(reward);
                renderReward(reward)
            }

            this._dumpTimer++;
            if (this._dumpTimer === 1000) {
                this._dumpTimer = 0;
                if (!document.getElementById('q-learning-data')) {
                    let div = document.createElement('div');
                    let label = document.createElement('div');
                    label.innerHTML = '<br/>Q Learner Internal State Dump';
                    let textArea = document.createElement("TEXTAREA");
                    textArea.style.width = '100%';
                    textArea.style.height = '10em';
                    textArea.setAttribute('id', 'q-learning-data');
                    div.appendChild(label);
                    div.appendChild(textArea);
                    document.body.appendChild(div);
                }
                document.getElementById('q-learning-data').innerHTML = JSON.stringify(this._agent.toJSON());
            }

        }
        let actionResponse = this._agent.act(state);

        renderActionResponse(actionResponse);

        return actionResponse.action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RlDqn;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(24);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = convert9x9to5x5;


function convert9x9to5x5(matrix){
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tensorTools__["b" /* shiftAndTrimMatrix */])(matrix, [0, -1], 1, [2, 2])
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(22);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(5)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(0);


const defaultStats = {
    currentScore: 0,
    lastGameScore: 0,
    scoreSum: 0,
    gameCount: 0
};

class GameRunner {
    constructor(renderer, onStatusChange) {
        this._enableRendering = false;
        this._renderer = renderer;
        this._stats = Object.assign({}, defaultStats);
        this._onStatusChange = onStatusChange;
        this._agentObservation = null;
        this._godObservation = null;
        this._agentClass = null;

        this.newGame = this.newGame.bind(this);
        this.takeAction = this.takeAction.bind(this);
        this.tick = this.tick.bind(this);
        this.clearStats = this.clearStats.bind(this);
    }

    newGame(agentClass, enableRendering) {
        this._agentClass = agentClass;
        this._agent = new this._agentClass();
        this._enableRendering = enableRendering;
        this._environment = new __WEBPACK_IMPORTED_MODULE_0__environment__["b" /* default */]();
        this._stats.currentScore = 0;//@TODO get from environment?
        if (this._enableRendering) {
            //@TODO have this render make the table its self inside a given div
            this._renderer.clear();
            this._renderer.render(this._environment.getAgentObservation(), this._environment.getGodObservation());
        } else {
            this._onStatusChange(this._stats);
        }
        this._updateObservations();
    }

    /**
     *
     * @param actionCode
     */
    takeAction(actionCode) {
        //Apply the action and get the next observation
        this._environment.applyAction(actionCode);
        this._updateObservations();

        if (this._godObservation.isComplete) {//@Find better way to communicate "isComplete"
            this._agent.getAction(this._agentObservation);//Ask for one more action so the agent can see the observation after its last action
            this._stats.lastGameScore = this._agentObservation.score;
            this._stats.scoreSum += this._agentObservation.score;
            this._stats.gameCount += 1;
            this.newGame(this._agentClass, this._enableRendering);
        }

        if (this._enableRendering) {
            this._renderer.render(this._agentObservation, this._godObservation);
            this._stats.currentScore = this._agentObservation.score;
            this._onStatusChange(this._stats);
        }
    }

    tick() {
        const action = this._agent.getAction(this._agentObservation);
        this.takeAction(action);
    }

    clearStats() {
        this._stats = Object.assign({}, defaultStats);
    }

    _updateObservations() {
        this._agentObservation = this._environment.getAgentObservation();
        this._godObservation = this._environment.getGodObservation();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameRunner;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * An agent that just always moves downwards no matter what
 *
 * @constructor
 */
class AlwaysDown {
    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return 's';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlwaysDown;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(2);


const feelerPaths = [
    ['s'],
    ['a', 's'],
    ['d', 's']
];

class BarelyLookAhead {
    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper_feeler__["a" /* getActionViaFeelers */])(observation, feelerPaths, null);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BarelyLookAhead;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(2);


const feelerPaths = [
    ['s','s','s','s','s'],
    ['a', 's','s','s','s','s'],
    ['a', 'a', 's','s','s','s','s'],
    ['a', 'a', 'a', 's','s','s','s','s'],
    ['a', 'a', 'a', 'a', 's','s','s','s','s'],
    ['d', 's','s','s','s','s'],
    ['d', 'd', 's','s','s','s','s'],
    ['d', 'd', 'd', 's','s','s','s','s'],
    ['d', 'd', 'd', 'd', 's','s','s','s','s'],
];

class ColumnCompare {
    /**
     * An agent that looks far to the sides but one tile downward
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper_feeler__["a" /* getActionViaFeelers */])(observation, feelerPaths, null);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ColumnCompare;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(2);


const feelerPaths = [
    ['s', 's'],

    ['a', 's', 's'],
    ['s', 'a', 's'],
    ['a', 'a', 's', 's'],
    ['s', 'a', 'a', 's'],
    ['s', 'a', 'a', 'a', 's'],
    ['a', 's', 'a', 'a', 's'],
    ['a', 'a', 's', 'a', 's'],
    ['a', 'a', 'a', 's', 's'],
    ['a', 'a', 'a', 'a', 's', 's'],

    ['d', 's', 's'],
    ['s', 'd', 's'],
    ['d', 'd', 's', 's'],
    ['s', 'd', 'd', 's'],
    ['s', 'd', 'd', 'd', 's'],
    ['d', 's', 'd', 'd', 's'],
    ['d', 'd', 's', 'd', 's'],
    ['d', 'd', 'd', 's', 's'],
    ['d', 'd', 'd', 'd', 's', 's'],
];

class LookAheadWide {
    constructor() {
        this._state = {lastAction: null};
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        let action = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper_feeler__["a" /* getActionViaFeelers */])(observation, feelerPaths, this._state.lastAction);

        this._state.lastAction = action;

        return action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LookAheadWide;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(2);


const feelerPaths = [ //Warning the paths below may not include all possibilities

    ['s', 's', 's'],

    ////

    ['s', 'a', 's', 's'],
    ['s', 'a', 's', 'a', 's'],
    ['s', 'a', 's', 'a', 'a', 's'],

    ['s', 'a', 'a', 's', 's'],
    ['s', 'a', 'a', 's', 'a', 's'],
    ['s', 'a', 'a', 'a', 's', 's'],

    ['s', 's', 'a', 's'],
    ['s', 's', 'a', 'a', 's'],
    ['s', 's', 'a', 'a', 'a', 's'],

    ['a', 's', 's', 's'],
    ['a', 's', 's', 'a', 's'],
    ['a', 's', 's', 'a', 'a', 's'],

    ['a', 's', 'a', 's', 's'],
    ['a', 's', 'a', 's', 'a', 's'],

    ['a', 'a', 's', 's', 's'],
    ['a', 'a', 's', 'a', 's', 's'],
    ['a', 'a', 's', 'a', 's', 'a', 's'],

    ['a', 'a', 'a', 's', 's', 's'],

    ////

    ['s', 'd', 's', 's'],
    ['s', 'd', 's', 'd', 's'],
    ['s', 'd', 's', 'd', 'd', 's'],

    ['s', 'd', 'd', 's', 's'],
    ['s', 'd', 'd', 's', 'd', 's'],
    ['s', 'd', 'd', 'd', 's', 's'],

    ['s', 's', 'd', 's'],
    ['s', 's', 'd', 'd', 's'],
    ['s', 's', 'd', 'd', 'd', 's'],

    ['d', 's', 's', 's'],
    ['d', 's', 's', 'd', 's'],
    ['d', 's', 's', 'd', 'd', 's'],

    ['d', 's', 'd', 's', 's'],
    ['d', 's', 'd', 's', 'd', 's'],

    ['d', 'd', 's', 's', 's'],
    ['d', 'd', 's', 'd', 's', 's'],
    ['d', 'd', 's', 'd', 's', 'd', 's'],

    ['d', 'd', 'd', 's', 's', 's'],

    ////

    ['a', 's', 's', 'd', 's'],
    ['a', 'a', 's', 's', 'd', 's'],
    ['a', 'a', 's', 's', 'd', 'd', 's'],
    ['a', 'a', 's', 's', 'd', 'd', 'd', 's'],
    ['a', 'a', 'a', 's', 's', 'd', 's'],
    ['a', 'a', 'a', 's', 's', 'd', 'd', 's'],
    ['a', 'a', 'a', 's', 's', 'd', 'd', 'd', 's'],

    ////

    ['d', 's', 's', 'a', 's'],
    ['d', 'd', 's', 's', 'a', 's'],
    ['d', 'd', 's', 's', 'a', 'a', 's'],
    ['d', 'd', 's', 's', 'a', 'a', 'a', 's'],
    ['d', 'd', 'd', 's', 's', 'a', 's'],
    ['d', 'd', 'd', 's', 's', 'a', 'a', 's'],
    ['d', 'd', 'd', 's', 's', 'a', 'a', 'a', 's'],
];

class LookAheadWideAndDeep {
    constructor() {
        this._state = {lastAction: null};
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        let action = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper_feeler__["a" /* getActionViaFeelers */])(observation, feelerPaths, this._state.lastAction);

        this._state.lastAction = action;

        return action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LookAheadWideAndDeep;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_viewportConversions__ = __webpack_require__(6);



const actions = ['w', 'a', 's', 'd'];

const numberOfStates = 5 * 5 + 1;

let rlDqn = new __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__["a" /* default */](true, numberOfStates);

class RL_DQN_5X5Viewport_In_Learning_Mode {
    constructor() {
        this._lastScore = null;
        this._lastActionIndex = 2; //2='s'
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        if (observation.tileTypes.length !== 9 || observation.tileTypes[0].length !== 9) {
            throw new Error('Incompatible viewport size');
        }

        const state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tensorTools__["a" /* matrixToVector */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helper_viewportConversions__["a" /* convert9x9to5x5 */])(observation.tileTypes));

        //Give the agent memory of the last action it took. This may be cheating.
        state.push(this._lastActionIndex);

        let reward = null;
        if (this._lastScore !== null) {
            reward = observation.score - this._lastScore;
        }

        const actionIndex = rlDqn.getAction(state, reward);

        let action = actions[actionIndex];

        this._lastScore = observation.score;
        this._lastActionIndex = actionIndex;
        return action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RL_DQN_5X5Viewport_In_Learning_Mode;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__neural_network_saves_view_port_5_5_0_1_games_10000__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_RlDqn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_viewportConversions__ = __webpack_require__(6);





const actions = ['w', 'a', 's', 'd'];

// const numberOfStates = environmentConfig.viewPortSize[0] * environmentConfig.viewPortSize[1];
const numberOfStates = 5 * 5 + 1;

let rlDqn = new __WEBPACK_IMPORTED_MODULE_3__helper_RlDqn__["a" /* default */](true, numberOfStates, __WEBPACK_IMPORTED_MODULE_2__neural_network_saves_view_port_5_5_0_1_games_10000__["a" /* data */]);

class RL_DQN_5X5 {
    constructor() {
        this._lastScore = null;
        this._lastActionIndex = 2; //2='s'
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        if (observation.tileTypes.length !== 9 || observation.tileTypes[0].length !== 9) {
            throw new Error('Incompatible viewport size');
        }

        const state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tensorTools__["a" /* matrixToVector */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helper_viewportConversions__["a" /* convert9x9to5x5 */])(observation.tileTypes));

        //Give the agent memory of the last action it took. This may be cheating.
        state.push(this._lastActionIndex);

        let reward = null;
        if (this._lastScore !== null) {
            reward = observation.score - this._lastScore;
        }

        const actionIndex = rlDqn.getAction(state, reward);

        let action = actions[actionIndex];

        this._lastScore = observation.score;
        this._lastActionIndex = actionIndex;
        return action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RL_DQN_5X5;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment__ = __webpack_require__(0);



const actions = ['w', 'a', 's', 'd'];

const numberOfStates = __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize[0] * __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize[1] + 1;

let rlDqn = new __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__["a" /* default */](true, numberOfStates);

class RL_DQN_InLearningMode {
    constructor() {
        this._lastScore = null;
        this._lastActionIndex = 2; //2='s'
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        const state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tensorTools__["a" /* matrixToVector */])(observation.tileTypes);

        //Give the agent memory of the last action it took. This may be cheating.
        state.push(this._lastActionIndex);

        let reward = null;
        if (this._lastScore !== null) {
            reward = observation.score - this._lastScore;
        }

        const actionIndex = rlDqn.getAction(state, reward);

        let action = actions[actionIndex];

        this._lastScore = observation.score;
        this._lastActionIndex = actionIndex;
        return action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RL_DQN_InLearningMode;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment__ = __webpack_require__(0);




function generateTableHtml(size, tableClassName) {
    let html = '';
    for (let y = 0; y < size[1]; y++) {
        html += '<tr>';
        for (let x = 0; x < size[0]; x++) {
            html += '<td class="tile-' + x + '-' + y + '"></td>';
        }
        html += '</tr>';
    }
    return '<table class="' + tableClassName + '">' + html + '</table>';
}

function getTdElements(size, tableClassName) {
    let tdElements = [];
    for (let x = 0; x < size[0]; x++) {
        tdElements[x] = [];
        for (let y = 0; y < size[1]; y++) {
            tdElements[x][y] = document.querySelector('table.' + tableClassName + ' td.tile-' + x + '-' + y);
        }
    }
    return tdElements;
}

class HtmlTableRenderer {
    constructor(containerElement) {
        this.clear();//Call clear to init internal observation properties

        containerElement.innerHTML = '<div class="InfectionGameHtmlTableRender">' +
            '<div>' +
            'Agent View' +
            generateTableHtml(__WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize, 'renderer-table-canvas-agent') +
            '</div>' +
            '<div>' +
            'Environment View' +
            generateTableHtml(__WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].size, 'renderer-table-canvas-god') +
            '</div>' +
            '</div>';

        this._agentTds = getTdElements(__WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize, 'renderer-table-canvas-agent');
        this._godTds = getTdElements(__WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].size, 'renderer-table-canvas-god')
    }

    /**
     * Clears the observation of the renderer causing it to forget any stored observation.
     */
    clear() {
        this._previousPositions = [];
    }

    /**
     * Render the current observation of the environment in HTML
     *
     * @param {AgentObservation} agentObservation
     * @param {State} godObservation
     */
    render(agentObservation, godObservation) {
        //Render the agent view
        let agentViewPortSize = [
            agentObservation.tileTypes.length,
            agentObservation.tileTypes[0].length
        ];
        for (let x = 0; x < agentViewPortSize[0]; x++) {
            for (let y = 0; y < agentViewPortSize[1]; y++) {
                let color = {r: 50, g: 50, b: 50};
                // if (agentObservation.visibles[x][y] === 0) {
                //     color = {r: 0, g: 0, b: 0};
                // } else
                if (x == agentObservation.position[0] && y == agentObservation.position[1] && agentObservation.tileTypes[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 0};
                } else if (x == agentObservation.position[0] && y == agentObservation.position[1]) {
                    color = {r: 0, g: 255, b: 0};
                } else if (agentObservation.tileTypes[x][y] !== 0) {
                    color = {r: 230, g: 0, b: 0};
                }
                this._agentTds[x][y].style
                    .backgroundColor = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
            }
        }

        //Render the god view
        for (let y = 0; y < __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].size[0]; y++) {
            for (let x = 0; x < __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].size[1]; x++) {
                let color = {r: 50, g: 50, b: 50};
                if (x == godObservation.position[0] && y == godObservation.position[1] && godObservation.tileTypes[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 0};
                } else if (x == godObservation.position[0] && y == godObservation.position[1]) {
                    color = {r: 0, g: 255, b: 0};
                } else if (this._previousPositions[x + ',' + y] && godObservation.tileTypes[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 128}
                } else if (this._previousPositions[x + ',' + y]) {
                    color = {r: 0, g: 128, b: 0}
                } else if (godObservation.tileTypes[x][y] !== 0) {
                    color = {r: 230, g: 0, b: 0};
                }
                // } else if (godObservation.visibles[x][y] === 0) {
                //     color = {r: 0, g: 0, b: 0};
                // }
                this._godTds[x][y].style
                    .backgroundColor = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
            }
        }

        this._previousPositions[godObservation.position[0] + ',' + godObservation.position[1]] = true;
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HtmlTableRenderer;



/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(18)
var ieee754 = __webpack_require__(23)
var isArray = __webpack_require__(20)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "#info {\n    margin-right: 2em;\n    /*float: left*/\n}\n\n.InfectionGameHtmlTableRender {\n    /*float: left;*/\n    overflow: auto;\n}\n\n.InfectionGameHtmlTableRender table {\n    padding-right: 2em;\n    border-spacing: 0;\n    border-collapse:collapse;\n}\n\n.InfectionGameHtmlTableRender table td {\n    border: 0; /*For iphones*/\n}\n\n.InfectionGameHtmlTableRender > div {\n    float: left;\n    border-spacing: 0;\n    margin-right: 2em;\n}\n\n.InfectionGameHtmlTableRender table.renderer-table-canvas-agent {\n    padding: 10px;\n    background-color: black;\n}\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-god td {\n    height: 5px;\n    width: 5px;\n}\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-agent td {\n    height: 20px;\n    width: 20px;\n}\n\n#agentRendererContainer {\n    margin-top: 1em;\n}", ""]);

// exports


/***/ }),
/* 23 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(5)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./HtmlTableRenderer.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./HtmlTableRenderer.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var R = {}; // the Recurrent library

(function (global) {
    "use strict";

    // Utility fun
    function assert(condition, message) {
        // from http://stackoverflow.com/questions/15313418/javascript-assert
        if (!condition) {
            message = message || "Assertion failed";
            if (typeof Error !== "undefined") {
                throw new Error(message);
            }
            throw message; // Fallback
        }
    }

    // Random numbers utils
    var return_v = false;
    var v_val = 0.0;
    var gaussRandom = function () {
        if (return_v) {
            return_v = false;
            return v_val;
        }
        var u = 2 * Math.random() - 1;
        var v = 2 * Math.random() - 1;
        var r = u * u + v * v;
        if (r == 0 || r > 1) return gaussRandom();
        var c = Math.sqrt(-2 * Math.log(r) / r);
        v_val = v * c; // cache this
        return_v = true;
        return u * c;
    }
    var randf = function (a, b) {
        return Math.random() * (b - a) + a;
    }
    var randi = function (a, b) {
        return Math.floor(Math.random() * (b - a) + a);
    }
    var randn = function (mu, std) {
        return mu + gaussRandom() * std;
    }

    // helper function returns array of zeros of length n
    // and uses typed arrays if available
    var zeros = function (n) {
        if (typeof(n) === 'undefined' || isNaN(n)) {
            return [];
        }
        if (typeof ArrayBuffer === 'undefined') {
            // lacking browser support
            var arr = new Array(n);
            for (var i = 0; i < n; i++) {
                arr[i] = 0;
            }
            return arr;
        } else {
            return new Float64Array(n);
        }
    }

    // Mat holds a matrix
    var Mat = function (n, d) {
        // n is number of rows d is number of columns
        this.n = n;
        this.d = d;
        this.w = zeros(n * d);
        this.dw = zeros(n * d);
    }
    Mat.prototype = {
        get: function (row, col) {
            // slow but careful accessor function
            // we want row-major order
            var ix = (this.d * row) + col;
            assert(ix >= 0 && ix < this.w.length);
            return this.w[ix];
        },
        set: function (row, col, v) {
            // slow but careful accessor function
            var ix = (this.d * row) + col;
            assert(ix >= 0 && ix < this.w.length);
            this.w[ix] = v;
        },
        setFrom: function (arr) {
            for (var i = 0, n = arr.length; i < n; i++) {
                this.w[i] = arr[i];
            }
        },
        setColumn: function (m, i) {
            for (var q = 0, n = m.w.length; q < n; q++) {
                this.w[(this.d * q) + i] = m.w[q];
            }
        },
        toJSON: function () {
            var json = {};
            json['n'] = this.n;
            json['d'] = this.d;
            json['w'] = this.w;
            return json;
        },
        fromJSON: function (json) {
            this.n = json.n;
            this.d = json.d;
            this.w = zeros(this.n * this.d);
            this.dw = zeros(this.n * this.d);
            for (var i = 0, n = this.n * this.d; i < n; i++) {
                this.w[i] = json.w[i]; // copy over weights
            }
        }
    }

    var copyMat = function (b) {
        var a = new Mat(b.n, b.d);
        a.setFrom(b.w);
        return a;
    }

    var copyNet = function (net) {
        // nets are (k,v) pairs with k = string key, v = Mat()
        var new_net = {};
        for (var p in net) {
            if (net.hasOwnProperty(p)) {
                new_net[p] = copyMat(net[p]);
            }
        }
        return new_net;
    }

    var updateMat = function (m, alpha) {
        // updates in place
        for (var i = 0, n = m.n * m.d; i < n; i++) {
            if (m.dw[i] !== 0) {
                m.w[i] += -alpha * m.dw[i];
                m.dw[i] = 0;
            }
        }
    }

    var updateNet = function (net, alpha) {
        for (var p in net) {
            if (net.hasOwnProperty(p)) {
                updateMat(net[p], alpha);
            }
        }
    }

    var netToJSON = function (net) {
        var j = {};
        for (var p in net) {
            if (net.hasOwnProperty(p)) {
                j[p] = net[p].toJSON();
            }
        }
        return j;
    }
    var netFromJSON = function (j) {
        var net = {};
        for (var p in j) {
            if (j.hasOwnProperty(p)) {
                net[p] = new Mat(1, 1); // not proud of this
                net[p].fromJSON(j[p]);
            }
        }
        return net;
    }
    var netZeroGrads = function (net) {
        for (var p in net) {
            if (net.hasOwnProperty(p)) {
                var mat = net[p];
                gradFillConst(mat, 0);
            }
        }
    }
    var netFlattenGrads = function (net) {
        var n = 0;
        for (var p in net) {
            if (net.hasOwnProperty(p)) {
                var mat = net[p];
                n += mat.dw.length;
            }
        }
        var g = new Mat(n, 1);
        var ix = 0;
        for (var p in net) {
            if (net.hasOwnProperty(p)) {
                var mat = net[p];
                for (var i = 0, m = mat.dw.length; i < m; i++) {
                    g.w[ix] = mat.dw[i];
                    ix++;
                }
            }
        }
        return g;
    }

    // return Mat but filled with random numbers from gaussian
    var RandMat = function (n, d, mu, std) {
        var m = new Mat(n, d);
        fillRandn(m, mu, std);
        //fillRand(m,-std,std); // kind of :P
        return m;
    }

    // Mat utils
    // fill matrix with random gaussian numbers
    var fillRandn = function (m, mu, std) {
        for (var i = 0, n = m.w.length; i < n; i++) {
            m.w[i] = randn(mu, std);
        }
    }
    var fillRand = function (m, lo, hi) {
        for (var i = 0, n = m.w.length; i < n; i++) {
            m.w[i] = randf(lo, hi);
        }
    }
    var gradFillConst = function (m, c) {
        for (var i = 0, n = m.dw.length; i < n; i++) {
            m.dw[i] = c
        }
    }

    // Transformer definitions
    var Graph = function (needs_backprop) {
        if (typeof needs_backprop === 'undefined') {
            needs_backprop = true;
        }
        this.needs_backprop = needs_backprop;

        // this will store a list of functions that perform backprop,
        // in their forward pass order. So in backprop we will go
        // backwards and evoke each one
        this.backprop = [];
    }
    Graph.prototype = {
        backward: function () {
            for (var i = this.backprop.length - 1; i >= 0; i--) {
                this.backprop[i](); // tick!
            }
        },
        rowPluck: function (m, ix) {
            // pluck a row of m with index ix and return it as col vector
            assert(ix >= 0 && ix < m.n);
            var d = m.d;
            var out = new Mat(d, 1);
            for (var i = 0, n = d; i < n; i++) {
                out.w[i] = m.w[d * ix + i];
            } // copy over the data

            if (this.needs_backprop) {
                var backward = function () {
                    for (var i = 0, n = d; i < n; i++) {
                        m.dw[d * ix + i] += out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        tanh: function (m) {
            // tanh nonlinearity
            var out = new Mat(m.n, m.d);
            var n = m.w.length;
            for (var i = 0; i < n; i++) {
                out.w[i] = Math.tanh(m.w[i]);
            }

            if (this.needs_backprop) {
                var backward = function () {
                    for (var i = 0; i < n; i++) {
                        // grad for z = tanh(x) is (1 - z^2)
                        var mwi = out.w[i];
                        m.dw[i] += (1.0 - mwi * mwi) * out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        sigmoid: function (m) {
            // sigmoid nonlinearity
            var out = new Mat(m.n, m.d);
            var n = m.w.length;
            for (var i = 0; i < n; i++) {
                out.w[i] = sig(m.w[i]);
            }

            if (this.needs_backprop) {
                var backward = function () {
                    for (var i = 0; i < n; i++) {
                        // grad for z = tanh(x) is (1 - z^2)
                        var mwi = out.w[i];
                        m.dw[i] += mwi * (1.0 - mwi) * out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        relu: function (m) {
            var out = new Mat(m.n, m.d);
            var n = m.w.length;
            for (var i = 0; i < n; i++) {
                out.w[i] = Math.max(0, m.w[i]); // relu
            }
            if (this.needs_backprop) {
                var backward = function () {
                    for (var i = 0; i < n; i++) {
                        m.dw[i] += m.w[i] > 0 ? out.dw[i] : 0.0;
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        mul: function (m1, m2) {
            // multiply matrices m1 * m2
            assert(m1.d === m2.n, 'matmul dimensions misaligned');

            var n = m1.n;
            var d = m2.d;
            var out = new Mat(n, d);
            for (var i = 0; i < m1.n; i++) { // loop over rows of m1
                for (var j = 0; j < m2.d; j++) { // loop over cols of m2
                    var dot = 0.0;
                    for (var k = 0; k < m1.d; k++) { // dot product loop
                        dot += m1.w[m1.d * i + k] * m2.w[m2.d * k + j];
                    }
                    out.w[d * i + j] = dot;
                }
            }

            if (this.needs_backprop) {
                var backward = function () {
                    for (var i = 0; i < m1.n; i++) { // loop over rows of m1
                        for (var j = 0; j < m2.d; j++) { // loop over cols of m2
                            for (var k = 0; k < m1.d; k++) { // dot product loop
                                var b = out.dw[d * i + j];
                                m1.dw[m1.d * i + k] += m2.w[m2.d * k + j] * b;
                                m2.dw[m2.d * k + j] += m1.w[m1.d * i + k] * b;
                            }
                        }
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        add: function (m1, m2) {
            assert(m1.w.length === m2.w.length);

            var out = new Mat(m1.n, m1.d);
            for (var i = 0, n = m1.w.length; i < n; i++) {
                out.w[i] = m1.w[i] + m2.w[i];
            }
            if (this.needs_backprop) {
                var backward = function () {
                    for (var i = 0, n = m1.w.length; i < n; i++) {
                        m1.dw[i] += out.dw[i];
                        m2.dw[i] += out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        dot: function (m1, m2) {
            // m1 m2 are both column vectors
            assert(m1.w.length === m2.w.length);
            var out = new Mat(1, 1);
            var dot = 0.0;
            for (var i = 0, n = m1.w.length; i < n; i++) {
                dot += m1.w[i] * m2.w[i];
            }
            out.w[0] = dot;
            if (this.needs_backprop) {
                var backward = function () {
                    for (var i = 0, n = m1.w.length; i < n; i++) {
                        m1.dw[i] += m2.w[i] * out.dw[0];
                        m2.dw[i] += m1.w[i] * out.dw[0];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        eltmul: function (m1, m2) {
            assert(m1.w.length === m2.w.length);

            var out = new Mat(m1.n, m1.d);
            for (var i = 0, n = m1.w.length; i < n; i++) {
                out.w[i] = m1.w[i] * m2.w[i];
            }
            if (this.needs_backprop) {
                var backward = function () {
                    for (var i = 0, n = m1.w.length; i < n; i++) {
                        m1.dw[i] += m2.w[i] * out.dw[i];
                        m2.dw[i] += m1.w[i] * out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
    }

    var softmax = function (m) {
        var out = new Mat(m.n, m.d); // probability volume
        var maxval = -999999;
        for (var i = 0, n = m.w.length; i < n; i++) {
            if (m.w[i] > maxval) maxval = m.w[i];
        }

        var s = 0.0;
        for (var i = 0, n = m.w.length; i < n; i++) {
            out.w[i] = Math.exp(m.w[i] - maxval);
            s += out.w[i];
        }
        for (var i = 0, n = m.w.length; i < n; i++) {
            out.w[i] /= s;
        }

        // no backward pass here needed
        // since we will use the computed probabilities outside
        // to set gradients directly on m
        return out;
    }

    var Solver = function () {
        this.decay_rate = 0.999;
        this.smooth_eps = 1e-8;
        this.step_cache = {};
    }
    Solver.prototype = {
        step: function (model, step_size, regc, clipval) {
            // perform parameter update
            var solver_stats = {};
            var num_clipped = 0;
            var num_tot = 0;
            for (var k in model) {
                if (model.hasOwnProperty(k)) {
                    var m = model[k]; // mat ref
                    if (!(k in this.step_cache)) {
                        this.step_cache[k] = new Mat(m.n, m.d);
                    }
                    var s = this.step_cache[k];
                    for (var i = 0, n = m.w.length; i < n; i++) {

                        // rmsprop adaptive learning rate
                        var mdwi = m.dw[i];
                        s.w[i] = s.w[i] * this.decay_rate + (1.0 - this.decay_rate) * mdwi * mdwi;

                        // gradient clip
                        if (mdwi > clipval) {
                            mdwi = clipval;
                            num_clipped++;
                        }
                        if (mdwi < -clipval) {
                            mdwi = -clipval;
                            num_clipped++;
                        }
                        num_tot++;

                        // update (and regularize)
                        m.w[i] += -step_size * mdwi / Math.sqrt(s.w[i] + this.smooth_eps) - regc * m.w[i];
                        m.dw[i] = 0; // reset gradients for next iteration
                    }
                }
            }
            solver_stats['ratio_clipped'] = num_clipped * 1.0 / num_tot;
            return solver_stats;
        }
    }

    var initLSTM = function (input_size, hidden_sizes, output_size) {
        // hidden size should be a list

        var model = {};
        for (var d = 0; d < hidden_sizes.length; d++) { // loop over depths
            var prev_size = d === 0 ? input_size : hidden_sizes[d - 1];
            var hidden_size = hidden_sizes[d];

            // gates parameters
            model['Wix' + d] = new RandMat(hidden_size, prev_size, 0, 0.08);
            model['Wih' + d] = new RandMat(hidden_size, hidden_size, 0, 0.08);
            model['bi' + d] = new Mat(hidden_size, 1);
            model['Wfx' + d] = new RandMat(hidden_size, prev_size, 0, 0.08);
            model['Wfh' + d] = new RandMat(hidden_size, hidden_size, 0, 0.08);
            model['bf' + d] = new Mat(hidden_size, 1);
            model['Wox' + d] = new RandMat(hidden_size, prev_size, 0, 0.08);
            model['Woh' + d] = new RandMat(hidden_size, hidden_size, 0, 0.08);
            model['bo' + d] = new Mat(hidden_size, 1);
            // cell write params
            model['Wcx' + d] = new RandMat(hidden_size, prev_size, 0, 0.08);
            model['Wch' + d] = new RandMat(hidden_size, hidden_size, 0, 0.08);
            model['bc' + d] = new Mat(hidden_size, 1);
        }
        // decoder params
        model['Whd'] = new RandMat(output_size, hidden_size, 0, 0.08);
        model['bd'] = new Mat(output_size, 1);
        return model;
    }

    var forwardLSTM = function (G, model, hidden_sizes, x, prev) {
        // forward prop for a single tick of LSTM
        // G is graph to append ops to
        // model contains LSTM parameters
        // x is 1D column vector with observation
        // prev is a struct containing hidden and cell
        // from previous iteration

        if (prev == null || typeof prev.h === 'undefined') {
            var hidden_prevs = [];
            var cell_prevs = [];
            for (var d = 0; d < hidden_sizes.length; d++) {
                hidden_prevs.push(new R.Mat(hidden_sizes[d], 1));
                cell_prevs.push(new R.Mat(hidden_sizes[d], 1));
            }
        } else {
            var hidden_prevs = prev.h;
            var cell_prevs = prev.c;
        }

        var hidden = [];
        var cell = [];
        for (var d = 0; d < hidden_sizes.length; d++) {

            var input_vector = d === 0 ? x : hidden[d - 1];
            var hidden_prev = hidden_prevs[d];
            var cell_prev = cell_prevs[d];

            // input gate
            var h0 = G.mul(model['Wix' + d], input_vector);
            var h1 = G.mul(model['Wih' + d], hidden_prev);
            var input_gate = G.sigmoid(G.add(G.add(h0, h1), model['bi' + d]));

            // forget gate
            var h2 = G.mul(model['Wfx' + d], input_vector);
            var h3 = G.mul(model['Wfh' + d], hidden_prev);
            var forget_gate = G.sigmoid(G.add(G.add(h2, h3), model['bf' + d]));

            // output gate
            var h4 = G.mul(model['Wox' + d], input_vector);
            var h5 = G.mul(model['Woh' + d], hidden_prev);
            var output_gate = G.sigmoid(G.add(G.add(h4, h5), model['bo' + d]));

            // write operation on cells
            var h6 = G.mul(model['Wcx' + d], input_vector);
            var h7 = G.mul(model['Wch' + d], hidden_prev);
            var cell_write = G.tanh(G.add(G.add(h6, h7), model['bc' + d]));

            // compute new cell activation
            var retain_cell = G.eltmul(forget_gate, cell_prev); // what do we keep from cell
            var write_cell = G.eltmul(input_gate, cell_write); // what do we write to cell
            var cell_d = G.add(retain_cell, write_cell); // new cell contents

            // compute hidden state as gated, saturated cell activations
            var hidden_d = G.eltmul(output_gate, G.tanh(cell_d));

            hidden.push(hidden_d);
            cell.push(cell_d);
        }

        // one decoder to outputs at end
        var output = G.add(G.mul(model['Whd'], hidden[hidden.length - 1]), model['bd']);

        // return cell memory, hidden representation and output
        return {'h': hidden, 'c': cell, 'o': output};
    }

    var sig = function (x) {
        // helper function for computing sigmoid
        return 1.0 / (1 + Math.exp(-x));
    }

    var maxi = function (w) {
        // argmax of array w
        var maxv = w[0];
        var maxix = 0;
        for (var i = 1, n = w.length; i < n; i++) {
            var v = w[i];
            if (v > maxv) {
                maxix = i;
                maxv = v;
            }
        }
        return maxix;
    }

    var samplei = function (w) {
        // sample argmax from w, assuming w are
        // probabilities that sum to one
        var r = randf(0, 1);
        var x = 0.0;
        var i = 0;
        while (true) {
            x += w[i];
            if (x > r) {
                return i;
            }
            i++;
        }
        return w.length - 1; // pretty sure we should never get here?
    }

    // various utils
    global.assert = assert;
    global.zeros = zeros;
    global.maxi = maxi;
    global.samplei = samplei;
    global.randi = randi;
    global.randn = randn;
    global.softmax = softmax;
    // classes
    global.Mat = Mat;
    global.RandMat = RandMat;
    global.forwardLSTM = forwardLSTM;
    global.initLSTM = initLSTM;
    // more utils
    global.updateMat = updateMat;
    global.updateNet = updateNet;
    global.copyMat = copyMat;
    global.copyNet = copyNet;
    global.netToJSON = netToJSON;
    global.netFromJSON = netFromJSON;
    global.netZeroGrads = netZeroGrads;
    global.netFlattenGrads = netFlattenGrads;
    // optimization
    global.Solver = Solver;
    global.Graph = Graph;
})(R);

// END OF RECURRENTJS

var RL = {};
(function (global) {
    "use strict";

// syntactic sugar function for getting default parameter values
    var getopt = function (opt, field_name, default_value) {
        if (typeof opt === 'undefined') {
            return default_value;
        }
        return (typeof opt[field_name] !== 'undefined') ? opt[field_name] : default_value;
    }

    var zeros = R.zeros; // inherit these
    var assert = R.assert;
    var randi = R.randi;
    var randf = R.randf;

    var setConst = function (arr, c) {
        for (var i = 0, n = arr.length; i < n; i++) {
            arr[i] = c;
        }
    }

    var sampleWeighted = function (p) {
        var r = Math.random();
        var c = 0.0;
        for (var i = 0, n = p.length; i < n; i++) {
            c += p[i];
            if (c >= r) {
                return i;
            }
        }
        assert(false, 'wtf');
    }

    var DQNAgent = function (env, opt) {
        this.gamma = getopt(opt, 'gamma', 0.75); // future reward discount factor
        this.epsilon = getopt(opt, 'epsilon', 0.1); // for epsilon-greedy policy
        this.alpha = getopt(opt, 'alpha', 0.01); // value function learning rate

        this.experience_add_every = getopt(opt, 'experience_add_every', 25); // number of time steps before we add another experience to replay memory
        this.experience_size = getopt(opt, 'experience_size', 5000); // size of experience replay
        this.learning_steps_per_iteration = getopt(opt, 'learning_steps_per_iteration', 10);
        this.tderror_clamp = getopt(opt, 'tderror_clamp', 1.0);

        this.num_hidden_units = getopt(opt, 'num_hidden_units', 100);

        this.env = env;
        this.reset();
    }
    DQNAgent.prototype = {
        reset: function () {
            this.nh = this.num_hidden_units; // number of hidden units
            this.ns = this.env.getNumStates();
            this.na = this.env.getMaxNumActions();

            // nets are hardcoded for now as key (str) -> Mat
            // not proud of this. better solution is to have a whole Net object
            // on top of Mats, but for now sticking with this
            this.net = {};
            this.net.W1 = new R.RandMat(this.nh, this.ns, 0, 0.01);
            this.net.b1 = new R.Mat(this.nh, 1, 0, 0.01);
            this.net.W2 = new R.RandMat(this.na, this.nh, 0, 0.01);
            this.net.b2 = new R.Mat(this.na, 1, 0, 0.01);

            this.exp = []; // experience
            this.expi = 0; // where to insert

            this.t = 0;

            this.r0 = null;
            this.s0 = null;
            this.s1 = null;
            this.a0 = null;
            this.a1 = null;

            this.tderror = 0; // for visualization only...
        },
        toJSON: function () {
            // save function
            var j = {};
            j.nh = this.nh;
            j.ns = this.ns;
            j.na = this.na;
            j.net = R.netToJSON(this.net);
            return j;
        },
        fromJSON: function (j) {
            // load function
            this.nh = j.nh;
            this.ns = j.ns;
            this.na = j.na;
            this.net = R.netFromJSON(j.net);
        },
        forwardQ: function (net, s, needs_backprop) {
            var G = new R.Graph(needs_backprop);
            var a1mat = G.add(G.mul(net.W1, s), net.b1);
            var h1mat = G.tanh(a1mat);
            var a2mat = G.add(G.mul(net.W2, h1mat), net.b2);
            this.lastG = G; // back this up. Kind of hacky isn't it
            return a2mat;
        },
        act: function (slist) {
            // convert to a Mat column vector
            var s = new R.Mat(this.ns, 1);
            s.setFrom(slist);

            let actionWasRandom = false;
            let actionWeights = null;
            let a;

            // epsilon greedy policy
            if (Math.random() < this.epsilon) {
                a = randi(0, this.na);
                actionWasRandom = true;
            } else {
                // greedy wrt Q function
                var amat = this.forwardQ(this.net, s, false);

                actionWeights = amat.w;
                a = R.maxi(amat.w); // returns index of argmax action
            }

            // shift state memory
            this.s0 = this.s1;
            this.a0 = this.a1;
            this.s1 = s;
            this.a1 = a;

            return {
                action: a,
                wasRandom: actionWasRandom,
                weights: actionWeights
            };
        },
        learn: function (r1) {
            // perform an update on Q function
            if (!(this.r0 == null) && this.alpha > 0) {

                // learn from this tuple to get a sense of how "surprising" it is to the agent
                var tderror = this.learnFromTuple(this.s0, this.a0, this.r0, this.s1, this.a1);
                this.tderror = tderror; // a measure of surprise

                // decide if we should keep this experience in the replay
                if (this.t % this.experience_add_every === 0) {
                    this.exp[this.expi] = [this.s0, this.a0, this.r0, this.s1, this.a1];
                    this.expi += 1;
                    if (this.expi > this.experience_size) {
                        this.expi = 0;
                    } // roll over when we run out
                }
                this.t += 1;

                // sample some additional experience from replay memory and learn from it
                for (var k = 0; k < this.learning_steps_per_iteration; k++) {
                    var ri = randi(0, this.exp.length); // todo: priority sweeps?
                    var e = this.exp[ri];
                    this.learnFromTuple(e[0], e[1], e[2], e[3], e[4])
                }
            }
            this.r0 = r1; // store for next update
        },
        learnFromTuple: function (s0, a0, r0, s1, a1) {
            // want: Q(s,a) = r + gamma * max_a' Q(s',a')

            // compute the target Q value
            var tmat = this.forwardQ(this.net, s1, false);
            var qmax = r0 + this.gamma * tmat.w[R.maxi(tmat.w)];

            // now predict
            var pred = this.forwardQ(this.net, s0, true);

            var tderror = pred.w[a0] - qmax;
            var clamp = this.tderror_clamp;
            if (Math.abs(tderror) > clamp) {  // huber loss to robustify
                if (tderror > clamp) tderror = clamp;
                if (tderror < -clamp) tderror = -clamp;
            }
            pred.dw[a0] = tderror;
            this.lastG.backward(); // compute gradients on net params

            // update net
            R.updateNet(this.net, this.alpha);
            return tderror;
        }
    }

// exports
//     global.DPAgent = DPAgent;
//     global.TDAgent = TDAgent;
    global.DQNAgent = DQNAgent;
//global.SimpleReinforceAgent = SimpleReinforceAgent;
//global.RecurrentReinforceAgent = RecurrentReinforceAgent;
//global.DeterministPG = DeterministPG;
})(RL);

const rl = RL;
/* harmony export (immutable) */ __webpack_exports__["a"] = rl;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const data =
{"nh":100,"ns":26,"na":4,"net":{"W1":{"n":100,"d":26,"w":{"0":-2.4414722931691513,"1":1.8460361757904233,"2":2.514241002435676,"3":0.7923637600674817,"4":-1.7697941809644957,"5":-3.7717574513041843,"6":-1.1878929003913699,"7":-2.321408692257701,"8":3.2957688821029962,"9":0.8905160280515853,"10":-0.6201747639006566,"11":0.04001279487502466,"12":1.9861232903138284,"13":6.080281765463795,"14":0.6530598367612849,"15":1.2185733694733847,"16":2.5714405650392256,"17":-0.13115526750408185,"18":2.909277812197576,"19":1.9643345160173984,"20":0.5666493677953074,"21":0.984780336003616,"22":-3.340841679093962,"23":-1.224509578775548,"24":-1.520014389876947,"25":2.203664303031456,"26":-0.20877987888866148,"27":0.06083425838160159,"28":-0.7358218250111687,"29":1.6307583935802699,"30":0.41007478704085437,"31":0.08701269122203278,"32":2.1921616674963773,"33":-0.40068336471263405,"34":0.2620791573702439,"35":-3.0490590119519343,"36":1.6944829001208335,"37":2.405542503094418,"38":-6.544749744812885,"39":-2.2335157957912206,"40":0.8682109863749912,"41":-0.03347619738050305,"42":6.2695060437490016,"43":3.12088595608357,"44":2.040315362182967,"45":1.3519237357611122,"46":-0.7060633716648459,"47":1.8470576154151697,"48":0.6693652845441682,"49":0.2721552709724237,"50":2.4422848792326537,"51":0.152889894793167,"52":-0.7016803714087909,"53":0.4897805060587934,"54":2.442099918136107,"55":5.338618308481412,"56":-3.02431743064583,"57":-0.6649477419454294,"58":2.0466633530636704,"59":-0.6294171739773768,"60":3.378233140377425,"61":-0.2589688724449277,"62":0.0392785356446366,"63":-2.390271739842619,"64":-3.5517490478362705,"65":-3.225171030922226,"66":-2.0044185772471006,"67":-0.8726196656619629,"68":-3.903683591180494,"69":-0.724514010333049,"70":1.0245358179794526,"71":-2.915508500475005,"72":2.2718790430680142,"73":-1.2426997903009485,"74":-0.5388856716888129,"75":1.313173743753369,"76":0.5242413549526934,"77":-0.06165013126096113,"78":-0.8806429481507093,"79":1.847383408972109,"80":0.8906835026725043,"81":-2.493560739769525,"82":-2.6818725288291496,"83":2.5422807695435887,"84":-1.1927903486526141,"85":-2.597482000447508,"86":-6.320003373069259,"87":-1.904704726280851,"88":0.7822445311534818,"89":-4.184874524254549,"90":-0.35225359282969576,"91":2.955463742517854,"92":3.4122285522513094,"93":3.0511932653895744,"94":-1.0942241983116023,"95":4.9725091036572575,"96":3.2998281880681133,"97":2.26422991143869,"98":4.176114696942353,"99":0.4997799827395601,"100":-2.529550896735318,"101":-0.6888912648059989,"102":1.517489641909242,"103":-0.5427801737055208,"104":-0.8654336712934191,"105":0.24226299862362963,"106":-0.37635414988517135,"107":0.6305995376133248,"108":-1.3083671185186814,"109":0.33901396357581515,"110":0.004172063669840205,"111":6.9854737743847926,"112":-3.268368522697201,"113":-3.3643941665674286,"114":0.8573194729851791,"115":-1.1337948046967394,"116":-0.5916077632227335,"117":9.188212792787493,"118":-0.18395486962705898,"119":0.6603303554985277,"120":2.4037956372715175,"121":0.3183540921239374,"122":-2.186719743515744,"123":-1.4180778696678094,"124":-1.0548396788747763,"125":0.38466170590128346,"126":0.028455542419864765,"127":0.3457154634569579,"128":0.029011843981572794,"129":0.6684880833572744,"130":-1.9420003077977206,"131":0.40156850433663555,"132":1.0209994454513815,"133":1.0864479390167905,"134":0.9975975308474813,"135":2.6143997784188215,"136":-1.701201116393482,"137":-1.2043965684198883,"138":4.329675827949447,"139":2.4081165800943984,"140":-0.13593880032254224,"141":-0.09617888851314293,"142":0.40386564566391076,"143":2.722043302378791,"144":1.826967621546299,"145":1.574406229396373,"146":0.03939600019931026,"147":3.706928333243833,"148":2.4705905392128678,"149":0.10232490796267805,"150":3.4962905029156928,"151":-2.7889676683109585,"152":-0.849552715604075,"153":0.8728162519632832,"154":1.3360418648181862,"155":-0.43581635552370646,"156":-0.07140382045661205,"157":-0.18661474825566207,"158":3.644721079927231,"159":-1.9782254638454866,"160":-0.7233429038838521,"161":1.487573324688443,"162":-1.4152539693798416,"163":-2.06460355792337,"164":-5.58636368944102,"165":0.5313117433301254,"166":4.30578116792683,"167":-0.0975061825323269,"168":1.9674839589561604,"169":-0.8346884871301562,"170":-2.826078142300141,"171":-1.1998539282594751,"172":0.2178891653216785,"173":-1.9260854266065717,"174":-3.04642623837161,"175":0.23634574022838098,"176":0.39405062902731974,"177":0.8199437587360083,"178":-1.312897355357991,"179":-0.050724709368522546,"180":1.5510284136663397,"181":3.256662384320362,"182":0.6696058497873112,"183":-0.012120685278307218,"184":0.6366077643076613,"185":2.1461457342044823,"186":1.3781342353721606,"187":-1.6625722393363118,"188":-2.1538914392721087,"189":3.11331215264942,"190":3.7697694514277478,"191":1.7946143336239966,"192":-0.13394054688571008,"193":-2.26710922223756,"194":2.798415157496441,"195":1.0161267990982548,"196":2.6353206072789677,"197":1.5480969611395454,"198":-6.071371945698394,"199":2.0060222899375937,"200":1.3508746615288125,"201":0.02061474381504277,"202":-1.2916902587401438,"203":1.2015719723426923,"204":2.176189266293213,"205":-0.13625930921786328,"206":-2.712135098551645,"207":0.2592092509152128,"208":1.3478438546636216,"209":1.4302900760965673,"210":2.551137947203141,"211":2.715395941054412,"212":3.415058813549664,"213":3.0228934956037596,"214":3.952984203441756,"215":3.609713132106559,"216":3.621189182964769,"217":2.5258708157497045,"218":0.17539547087428592,"219":-5.2382913521762715,"220":2.4660258529502705,"221":3.3169959588097595,"222":3.585192549392206,"223":-0.561009984700942,"224":3.112698991695763,"225":4.953482847025491,"226":4.131603116813726,"227":1.9469446148821759,"228":-1.7207255895413491,"229":0.5685571442450724,"230":3.529248090389411,"231":3.9917079574300223,"232":6.104415119862382,"233":-0.6417766645916619,"234":1.0362512431196194,"235":-4.075646332786012,"236":-5.794777996821279,"237":-2.4516741362507717,"238":-1.3801872812187446,"239":-0.8618926843769277,"240":-2.635103550341968,"241":6.021497938236601,"242":8.383207097233967,"243":3.3537099939835975,"244":-0.40260529425813407,"245":-0.7460354647495993,"246":-3.1347099893224573,"247":-5.1252348547396975,"248":-0.005642022945071946,"249":-0.06561686233411772,"250":-0.8124782816264234,"251":-1.5323990783389971,"252":-0.664844749857404,"253":-1.559480163663233,"254":-0.5157861772890755,"255":-0.947107254057141,"256":-0.32969698009755244,"257":-0.13389360645232737,"258":-1.0916453685388285,"259":0.38958601694230605,"260":0.2768521263650484,"261":-0.590031082980059,"262":-1.2195942019965238,"263":6.100605068228311,"264":-0.07635451600720566,"265":3.2572590687447285,"266":0.9898767891596097,"267":-0.6546084913091043,"268":0.24190978027641888,"269":-1.2555244801800916,"270":0.9843365651096129,"271":1.7588683859902972,"272":1.2007085869129455,"273":1.2905053563828242,"274":3.656525759646613,"275":1.6001066408269968,"276":3.32189779019082,"277":1.6432645284495426,"278":1.290339367019808,"279":-5.658273856986738,"280":-0.10254548149660492,"281":-0.7656443414843431,"282":2.0699292531862477,"283":3.369522439345885,"284":-3.97668404665268,"285":1.6247487909638434,"286":1.3384369357517885,"287":0.5378152707925452,"288":3.7906573005172204,"289":-2.7177020426669474,"290":0.16830954893450256,"291":0.21369665613326494,"292":-2.8859210577422045,"293":-2.8987766729057935,"294":-4.382418574721101,"295":-1.259410177277955,"296":1.8009316102457993,"297":2.112314213888771,"298":1.3303052008272056,"299":-1.8027764069944636,"300":6.686746069251767,"301":-1.0341597210312066,"302":0.3382751728768367,"303":3.539429751851719,"304":0.5984681915724208,"305":0.979938380688181,"306":0.4030588499744294,"307":-2.667891061835092,"308":2.431778568508016,"309":-0.026039102119901358,"310":1.8758144488603854,"311":-0.729444944247028,"312":1.0028651146749707,"313":2.595320456333738,"314":0.6469707339161692,"315":0.6875963575627194,"316":-1.5192242577345156,"317":-1.3665212254937609,"318":-1.649773343851086,"319":-3.9754489763217813,"320":-5.35741844869512,"321":4.72480613173964,"322":-4.017913106109671,"323":0.0729592695433514,"324":0.14096409624087441,"325":-3.4557619939080437,"326":-1.061870817260486,"327":2.8286708004588985,"328":0.04937172655755461,"329":0.7193505574021671,"330":-0.058646524310200114,"331":1.5952138936338707,"332":3.618315447347544,"333":-0.30915547946851935,"334":1.5550574505088042,"335":-0.3989311006927292,"336":-0.6519296601408501,"337":0.7344660302287093,"338":-1.9984380910094648,"339":0.9766272587889723,"340":-4.3765623379948,"341":1.7332956071303662,"342":-0.32634055195451467,"343":0.9526233171610464,"344":0.2937129348611235,"345":5.200851340444846,"346":0.6874272315999809,"347":-2.44628972569508,"348":-0.7513536236103159,"349":-0.267692640165146,"350":0.649723641272475,"351":-2.6280218269969566,"352":4.75188143314872,"353":1.1601942735085626,"354":-1.7145101630738429,"355":-1.3388654894332674,"356":-1.6173801926194635,"357":-1.0500316137794867,"358":-0.1390251081418117,"359":-0.7427993861478658,"360":-0.24883987386628906,"361":-2.1744110119386058,"362":-1.3800979018165813,"363":-1.85329658062619,"364":-0.6610096352284839,"365":-0.32933791434105436,"366":-0.11197763816061342,"367":-3.7569066430652684,"368":-3.8802952723941297,"369":-1.2507634979835884,"370":0.5254959369604972,"371":3.8764863711877204,"372":5.0194083009316195,"373":2.55699038904002,"374":-3.125599117285534,"375":-5.11150173023499,"376":-6.839292316580409,"377":-1.787650310992297,"378":-0.6015561636836115,"379":-1.0754333809812313,"380":0.4951851269318048,"381":-3.973499497433243,"382":-2.686773596095241,"383":1.6955882788661067,"384":-0.20235547111836943,"385":2.2091611649350855,"386":-0.043161278214004575,"387":1.8940706710202304,"388":-2.9261204867834096,"389":-0.39835449485291824,"390":-6.406892313212976,"391":-0.12232013928791534,"392":-1.2436630225061953,"393":-2.266535199189236,"394":0.4961385296428596,"395":-2.660786920340411,"396":1.9748407210648498,"397":-2.4228302460786613,"398":-0.7000577471558148,"399":4.7735483429787795,"400":1.9999026508031188,"401":-4.115543677369344,"402":-0.7268356651598102,"403":-0.4356827762540996,"404":-3.9330532781028515,"405":3.632408508463482,"406":1.4745840510230144,"407":0.6666776445833225,"408":-2.8890405120300735,"409":0.558630112654433,"410":1.119980210521641,"411":2.8125586220220677,"412":-0.7497457164320488,"413":-0.740009849987446,"414":1.2015579079668022,"415":-2.8459018348187985,"416":1.0519244985524194,"417":-0.6075066724240229,"418":0.23835009198133286,"419":2.2118336751413765,"420":2.0689226175859075,"421":0.0074770442139249285,"422":2.0112809104969425,"423":7.982701803088407,"424":4.289671182972002,"425":2.5738356054670586,"426":3.230974893262021,"427":2.9113315492580023,"428":-1.196189840638507,"429":-2.4021340202077512,"430":-2.003646740990149,"431":0.183771730705326,"432":-2.003821791732923,"433":1.273906678940683,"434":0.09378289331419687,"435":-0.3821105367602186,"436":0.8866622001821419,"437":0.5046810922013043,"438":-0.8635128131568528,"439":0.7489758737919316,"440":0.29996768077398756,"441":-0.0037971386018613514,"442":0.3457811126961694,"443":0.8467896778892856,"444":-0.7661779673474487,"445":-0.04574437727639884,"446":0.679839613800861,"447":-0.7150256752974368,"448":0.5760032840600312,"449":0.9418621879076033,"450":0.002113443386731308,"451":0.14142586751813355,"452":0.7120925056879367,"453":1.0624007776127555,"454":0.24025209698739816,"455":-0.7589163913965727,"456":0.10955975859034174,"457":0.16819487464939403,"458":0.6369471214674125,"459":6.435450768409401,"460":7.358156209784191,"461":-0.3880825368662084,"462":0.6722608301646008,"463":-0.18214381499127508,"464":3.578024153744692,"465":2.429291132849055,"466":-0.5064304035935572,"467":-0.1129342143116449,"468":-0.2759340719809289,"469":-0.2636015096072918,"470":-2.9812142065229787,"471":-1.1468527004986633,"472":-1.0771755557254095,"473":-1.0680781597087845,"474":3.4569823776334556,"475":8.112591054995352,"476":1.3750818105614473,"477":0.6153753275641044,"478":-4.0386347921654995,"479":-2.332456713457759,"480":-7.656537645208055,"481":0.5202687958617033,"482":-0.7280029596079448,"483":1.2751874819538471,"484":0.5399767903985564,"485":1.4588053107858525,"486":0.4538035323847945,"487":-0.771991723983139,"488":0.6284831282136045,"489":0.49658353939461586,"490":0.5274447368236596,"491":-0.052277339739167775,"492":-0.4399350572444428,"493":-0.7314777447261307,"494":-1.2981220830909739,"495":-0.10097560670977843,"496":-1.8283987002675497,"497":-1.4825901599825433,"498":-1.4032609262943159,"499":-1.9023068645757968,"500":-2.974779761764979,"501":-0.4962762793049116,"502":1.3733230302016832,"503":1.0078651208730571,"504":3.782404704204886,"505":7.821930522886654,"506":8.242028652153497,"507":4.36853949672236,"508":-0.09777320629662212,"509":1.51903847871617,"510":1.9508447681922534,"511":0.5990108294091068,"512":0.2536050728733692,"513":-0.5094235734224968,"514":0.27960131895587786,"515":1.959428869785271,"516":-1.7202575929515052,"517":2.013923543657874,"518":-2.9527506946533646,"519":0.5591760571977784,"520":-0.6070970533472478,"521":-1.5036070288511107,"522":2.2743291239965466,"523":-0.6866758302070498,"524":-2.3131215886466894,"525":2.205614476826256,"526":-1.138395156500132,"527":1.2751936477358632,"528":3.551687158137198,"529":6.0829802759776355,"530":-0.8500962586826186,"531":0.9413763823135722,"532":1.519501200580075,"533":5.872708210930255,"534":3.8523680715288835,"535":0.7270711893563351,"536":2.5308306131206946,"537":1.6649900383756475,"538":-0.2302463579982504,"539":-0.18244379394904275,"540":-0.146205502354482,"541":3.9599896035916227,"542":-0.863140046002638,"543":-1.3876695715406107,"544":-0.11521176204902278,"545":0.37306048119406515,"546":0.39956734094986324,"547":1.6555327039209728,"548":-3.0034537773276146,"549":0.8104067009577429,"550":0.4079725249226458,"551":-0.38240561280552726,"552":1.2165593272983757,"553":1.1107729632787622,"554":0.737164222864668,"555":3.3431575025353766,"556":-1.8906185484922915,"557":-1.8165447136579038,"558":1.084061334736119,"559":-8.13610494767135,"560":-7.158745717071922,"561":1.875201929512601,"562":1.431099459400676,"563":1.9282615577919888,"564":-4.603710541465634,"565":0.6066758893572315,"566":2.6253159872347362,"567":-1.948662561779519,"568":-0.024896476782922294,"569":1.170738285071753,"570":0.7505250349376869,"571":-1.1047929590926933,"572":2.294021592442454,"573":-1.9330447799530823,"574":-0.7928492199465973,"575":-0.20454271184523765,"576":1.0864203660961584,"577":0.28047200534371547,"578":-0.6089976302169352,"579":7.881352260358575,"580":0.669798211429009,"581":2.208016040317073,"582":-0.9615190299908144,"583":-2.235724863413922,"584":0.0374825025679096,"585":-7.9371494858607825,"586":-1.602966496395171,"587":0.09634249660342127,"588":1.345193276630443,"589":2.347711833762815,"590":5.607168717540605,"591":2.2940832802050184,"592":-2.6308427069475915,"593":-2.885614644460591,"594":-0.07293427675958022,"595":1.6006651793534605,"596":1.807884769796729,"597":0.02186807776140381,"598":0.41382937917512924,"599":2.0192706374655933,"600":0.0937542487454208,"601":1.0632357022042023,"602":4.708203362231942,"603":0.8379190168307699,"604":-1.0188236418411816,"605":-4.0675574330323885,"606":-1.9137767136479162,"607":-2.522176546774542,"608":-2.162942525699245,"609":-0.050820745627211616,"610":3.9457808977584046,"611":2.508706286922154,"612":3.777425271084128,"613":-0.16975767660487626,"614":0.014263511270812528,"615":-1.1256001460170422,"616":1.571143558120975,"617":3.5691098843985563,"618":-1.8690773497998046,"619":2.4777930303883737,"620":2.3168507012012505,"621":-1.7011073419865765,"622":2.656363727477885,"623":-3.1377622378544867,"624":-0.5247243161458472,"625":0.6333009567921833,"626":-0.6793854777295781,"627":-3.34535114876321,"628":4.702640838676025,"629":1.5301568282433355,"630":-0.30820076683755004,"631":5.1508326191300675,"632":0.742291368203852,"633":4.112665882958749,"634":-5.602665740310854,"635":-3.1409958561766707,"636":-4.307650483986578,"637":-4.6552714072957375,"638":-2.465418085670083,"639":-1.246936757538002,"640":3.4286474414842893,"641":0.2774619201991259,"642":-1.7558229875504512,"643":-2.044097222623459,"644":-0.8427952459595545,"645":0.6584277326934725,"646":0.2977173190836448,"647":1.3804633307308738,"648":1.6723121525335976,"649":0.0023541741424288713,"650":0.8224240442220021,"651":-2.7981368399614466,"652":0.6895773155815741,"653":1.5960109081592384,"654":1.890766091658878,"655":1.7911810965932353,"656":1.3740137481506531,"657":3.040668903150539,"658":2.3854612139754274,"659":2.186571681704883,"660":2.615270251330116,"661":1.6652090338991612,"662":-1.489890723497212,"663":5.100909823630293,"664":2.635645860676067,"665":1.2082030212557295,"666":-6.199460594101933,"667":2.2310042241877954,"668":1.2465722670182888,"669":3.2466093940580367,"670":0.36001890119987934,"671":0.26832183451690106,"672":-0.8288197941618164,"673":-0.2162492370882727,"674":0.19205830595810594,"675":0.08980429113650971,"676":-0.5456773376309163,"677":-0.4140049716953141,"678":-3.4178818403546325,"679":0.7201075825243519,"680":0.8432908475686304,"681":0.002295891410941821,"682":1.3756310720241416,"683":1.9514024618229675,"684":1.463977262416332,"685":0.7002078429453948,"686":-2.7780178769478407,"687":-1.2777968035507898,"688":-3.6901302419931943,"689":4.718842135818032,"690":-1.2464440175795246,"691":0.5506660990850064,"692":-0.24239158518496973,"693":-2.4001455934388463,"694":-2.905486442440493,"695":1.8871995942634434,"696":0.3663275661320471,"697":-1.5661561550699425,"698":-1.280134832900492,"699":-1.3488235089807157,"700":4.098665027915036,"701":-0.09878553835899659,"702":-3.522903059056162,"703":-1.295261515373283,"704":-0.28209123647642004,"705":-0.21704048359522604,"706":2.659575128780271,"707":-3.101936737803112,"708":-0.25894820462756885,"709":0.009251192600460962,"710":-5.489667601297026,"711":-2.2492949304411067,"712":2.5758360591807183,"713":1.8618607813493153,"714":-3.3679421799033635,"715":2.779762259682177,"716":1.9242770921721943,"717":0.6136034240836274,"718":4.109434599660582,"719":2.090210857696716,"720":0.013920145010225525,"721":0.2151479301829043,"722":0.5714086715304955,"723":0.3925482912869933,"724":1.6352852333928996,"725":5.405305143989082,"726":2.094032991248032,"727":-0.21151188175621813,"728":0.6257437441799759,"729":-0.45248550866062626,"730":-0.9022184273527614,"731":-0.18479839811789114,"732":-1.5953234078999579,"733":0.9189885417630514,"734":-1.0593560809638591,"735":-0.04121498065525734,"736":0.7678249573631398,"737":-0.0885873944623028,"738":-0.3785025864959505,"739":0.020558921227644637,"740":0.8861053106322209,"741":-0.673537695749344,"742":-1.9285160675072248,"743":0.27853514655653083,"744":10.403009476040953,"745":0.5589762821877909,"746":7.812986899580968,"747":1.0017736000983204,"748":-1.1419084360748912,"749":-0.8837871003688562,"750":2.1381757499543435,"751":1.5998195743426764,"752":2.2398511181012495,"753":-0.1261666776992136,"754":0.07164265037286255,"755":-1.7052111461990032,"756":0.8901073195874117,"757":-1.9653675715166092,"758":-1.990627329687795,"759":1.961329435251816,"760":-3.439910097089598,"761":0.9647949524122895,"762":-4.955594894676906,"763":-4.882590542121363,"764":-2.140147438986754,"765":1.9020805799831981,"766":-4.592843461779284,"767":-3.7354740811620117,"768":6.0346044476671,"769":0.6265545980497991,"770":2.1682171295397294,"771":-0.6419396539275376,"772":1.4752852413928566,"773":2.7638188778243697,"774":0.20771795559323206,"775":-1.065349881293131,"776":0.5994791288634091,"777":0.9266410911684868,"778":-1.3911130550914952,"779":-0.6236534808462878,"780":-0.5844668435335646,"781":-2.149868724308145,"782":-3.0568677609324273,"783":-1.9275310998619093,"784":-1.2314783099993154,"785":-1.1292104057323993,"786":1.0105054057135443,"787":0.56806778403116,"788":-6.315567002538247,"789":-1.3777057440205829,"790":-1.6585232724283472,"791":-2.9753243727184295,"792":3.331056520610308,"793":7.489424045819571,"794":8.362692044902293,"795":0.5800461694249524,"796":0.10692429026063026,"797":-0.3518308692038576,"798":0.1849205005551701,"799":-3.2874105143892596,"800":1.5330973540063788,"801":1.2122473085078143,"802":-0.7943742018285416,"803":1.9447887952403484,"804":4.1434250462040465,"805":1.1092837085712464,"806":0.8152562231889726,"807":-0.8266098579044295,"808":-1.6233609384282934,"809":1.1713737577756234,"810":-0.19352589353959385,"811":1.377079983289077,"812":0.4793507789066537,"813":-1.2901865393444758,"814":-2.821197019040875,"815":-3.9226378833614515,"816":-2.174347862676608,"817":-0.026023593417852806,"818":-0.3111493401870436,"819":-7.9296625061587305,"820":-1.099110133558289,"821":-2.500288810582154,"822":1.8530434539669833,"823":9.604257278613474,"824":3.0576316278569413,"825":1.678874342791096,"826":0.45017597304233387,"827":-2.045685767268064,"828":-0.5382165818487467,"829":0.8283689001957901,"830":-0.5613400874664634,"831":-0.7099789898061778,"832":-0.9918927721132865,"833":-0.27278155686565636,"834":0.5184729300310903,"835":-1.8582742970984834,"836":-0.8655983258265073,"837":-0.9688533078119738,"838":0.2185450633439954,"839":3.74031204454241,"840":1.9648355343178303,"841":-2.1641533473095733,"842":6.486207444707289,"843":1.7673159505608609,"844":-2.6915857455878034,"845":1.5639513182963891,"846":1.8766006896170613,"847":-3.349025355346589,"848":-3.3541843801026383,"849":-0.517388298125943,"850":-0.27020254472647526,"851":2.3344774879460504,"852":-4.135933553866774,"853":-0.2549407882657806,"854":-0.8298617160165833,"855":-0.3729336029642394,"856":-0.11110216407244475,"857":1.020327488016587,"858":-1.1478330263672105,"859":0.04346756445099163,"860":0.791843771804941,"861":-0.2817165305425026,"862":-0.2506809472881926,"863":0.5781552396778035,"864":-0.6079228000119888,"865":0.10617542714283383,"866":-0.5490045613550455,"867":0.22696782206293764,"868":0.4886020944332479,"869":-1.3939497293127319,"870":-2.399571559646257,"871":-2.28843473399942,"872":-0.46220973192295756,"873":-0.23981076027172055,"874":5.12527520835122,"875":8.85844157745206,"876":-6.405208325685757,"877":0.30130521249129505,"878":-0.16823748145604422,"879":-0.9503837778939346,"880":-1.271539805218198,"881":0.7640014938588091,"882":-0.06676765498307612,"883":-0.8804059691650464,"884":1.1482385480072177,"885":2.5782867997480854,"886":2.169388381684613,"887":1.7820440562036723,"888":-0.1972140174990944,"889":-4.468327802148705,"890":-2.2930754708834873,"891":-2.3479934150932036,"892":-6.029144442192835,"893":-5.250521946417253,"894":-1.6045112517958495,"895":-0.4213811578124245,"896":-0.8669281483568371,"897":-2.1930051366685825,"898":-1.3350167308305763,"899":0.5506399480069433,"900":-0.24792415927227412,"901":2.086307453199222,"902":0.24386434835779125,"903":3.243388738421447,"904":0.4457496229572752,"905":2.349987015484577,"906":-0.9003855119950668,"907":-0.5989572821270259,"908":-1.978316223035173,"909":-2.004784211360463,"910":-0.014672185865568144,"911":-0.1798631540581604,"912":-0.11063727036820573,"913":0.9922959297267444,"914":-0.058659446388695254,"915":-0.2958086052327884,"916":0.6046346139528022,"917":0.14015099539653608,"918":-0.1169537467680847,"919":0.38689049658938907,"920":0.012750173182658331,"921":0.4037308079362151,"922":1.5734576841373464,"923":0.3565565068023885,"924":-0.002788175061402859,"925":0.12388582096710499,"926":12.661081020040083,"927":7.12627974059213,"928":0.3180537147286852,"929":-0.5420066713213205,"930":0.033417262310754745,"931":4.190231610241083,"932":3.2908724145637636,"933":-0.5871049195264849,"934":-0.18056047137181663,"935":-0.1666867620426385,"936":-0.9421563225863234,"937":4.557227408947688,"938":-2.5675347294407556,"939":2.484959387584494,"940":-1.6896868597673422,"941":3.233266347685722,"942":-3.389780402557393,"943":2.6932846760660483,"944":0.685935928716467,"945":0.6034072893727864,"946":0.9963344523623372,"947":2.5712140114649533,"948":2.3450483207453092,"949":4.129077054698872,"950":7.525765121318015,"951":-1.4080206613092374,"952":-0.22520046939902888,"953":-1.831323797571007,"954":-1.457613732451097,"955":-2.834148142722312,"956":1.5283124324720314,"957":0.5345287451688292,"958":-0.8802285527756134,"959":-1.3062894261032745,"960":2.080342263303289,"961":0.5321589980439889,"962":2.2743050207286966,"963":-0.2756734167833132,"964":-1.1662962272803683,"965":3.9917870609391612,"966":-2.57067359426927,"967":4.529354038143289,"968":3.501184132460505,"969":-1.5258516580889867,"970":2.3777807906434476,"971":1.742818356753099,"972":1.7515509710038053,"973":1.0034006689014543,"974":3.461309890761619,"975":0.3752074146897285,"976":-1.346655335641507,"977":0.6920014250817669,"978":-6.2961847738006345,"979":-0.21604150368686034,"980":0.9792397054115566,"981":3.6920097047249496,"982":3.2722780222189316,"983":0.5796126664821234,"984":-1.8244678950645217,"985":-0.21839762247453853,"986":1.5718828998645429,"987":0.37071633440723734,"988":0.7133199341171211,"989":-0.24774464888775716,"990":0.6096142148077319,"991":1.4600620986977126,"992":2.762648446804481,"993":-0.8152041456267862,"994":0.5767854885261452,"995":4.563752490952141,"996":3.1499881855732683,"997":1.751465209763844,"998":0.9432391623924752,"999":1.3362142741103196,"1000":1.965866186761026,"1001":-9.930842053067462,"1002":-0.7128806785557423,"1003":-0.20008888380975465,"1004":-0.5708163725338834,"1005":-5.5402045627645995,"1006":-2.7067918353302924,"1007":-3.406610530281118,"1008":-0.16250364330548783,"1009":0.5928248730648132,"1010":-0.5126658181757489,"1011":-1.5518833367709828,"1012":-1.5307912750179726,"1013":0.7059315487134918,"1014":-0.45291191477653275,"1015":0.6040566250866861,"1016":0.1563518996595802,"1017":0.5675128931064483,"1018":-0.7477934435168393,"1019":0.2367567487727817,"1020":-0.04013689344487579,"1021":-0.9661171685383998,"1022":-0.7034397177550469,"1023":-0.2801750819859613,"1024":0.16042569259786604,"1025":0.334970789546936,"1026":-13.52087197818297,"1027":-2.8414871640635844,"1028":-0.5984691771331041,"1029":-0.3810338235981479,"1030":0.7535368391166684,"1031":-2.2865714252702194,"1032":1.2465727274481269,"1033":-0.4316768999489276,"1034":0.09241390899727518,"1035":0.9897835819412143,"1036":0.915157910090443,"1037":0.2590485018576026,"1038":0.0024639911479276255,"1039":-0.432570469157434,"1040":-0.4335217329312668,"1041":-0.8564798760730802,"1042":-0.7366811139368961,"1043":-0.3774527024882976,"1044":-2.810198464446183,"1045":1.2080260029924266,"1046":0.8112206255373405,"1047":2.0965190683506094,"1048":5.577847088747698,"1049":-0.7930258191288311,"1050":-2.2142394152537306,"1051":-1.8309419685438484,"1052":0.34320968409022223,"1053":7.30374320651527,"1054":3.3741290841122913,"1055":-0.06604083104862124,"1056":1.5046824600665325,"1057":-0.5079716116674955,"1058":2.1904010878356015,"1059":2.147247987487204,"1060":-0.3161817633681299,"1061":-0.44672693410535197,"1062":0.5514662631340929,"1063":-0.9647145364915157,"1064":-0.12506799530625237,"1065":-0.48175269867719606,"1066":0.9536632112766188,"1067":0.3869658337188193,"1068":0.5876695310883867,"1069":0.43612845015594137,"1070":0.7820206145116609,"1071":-1.0507828905060552,"1072":12.19770628933176,"1073":0.3176114334402164,"1074":0.9421298542665331,"1075":0.23594696582884284,"1076":0.18064703172027335,"1077":1.2509247017706686,"1078":1.111133577341476,"1079":-0.15222186129247778,"1080":-0.000625927915164911,"1081":1.1635437739197185,"1082":-0.3634483089904321,"1083":1.7496839504611996,"1084":-0.16311245622456458,"1085":0.37401902895228034,"1086":-1.149969738548296,"1087":1.2434622937685182,"1088":1.2101356342557263,"1089":1.0698686304584923,"1090":1.4380990318710525,"1091":-0.8504577192019374,"1092":-1.857027567143867,"1093":0.4416890508819219,"1094":4.003501360160659,"1095":-0.73432123175775,"1096":4.537384141040319,"1097":-3.112746300840493,"1098":-0.9963420996037927,"1099":1.5525737066020435,"1100":2.2446123622414147,"1101":-1.5441979391575509,"1102":3.3397182992100483,"1103":-0.30526690853590976,"1104":5.098476586145988,"1105":2.117051372808867,"1106":1.978814615248052,"1107":3.1232243337819288,"1108":-1.7246221972953089,"1109":2.2081717094665243,"1110":5.4904867386474105,"1111":3.8469605720212945,"1112":0.4422554448044208,"1113":1.7525238862707189,"1114":0.7038527817796896,"1115":3.8449203253768345,"1116":2.568766856533754,"1117":0.7204753866216395,"1118":1.1663322838559833,"1119":0.5589681143980606,"1120":-1.4331883449033784,"1121":1.3846788368929999,"1122":1.7550023206753178,"1123":1.6414838068007958,"1124":3.1534432973809174,"1125":-1.020944020982819,"1126":-0.458084282800854,"1127":0.11734104673331767,"1128":-1.776789803059987,"1129":2.0228359972042433,"1130":1.0576173829925621,"1131":2.5960383059863985,"1132":0.41269453359880237,"1133":2.8996386020985465,"1134":0.9288140966331817,"1135":0.05488770352793452,"1136":3.832790836101375,"1137":-1.3834388014840968,"1138":-2.752639191182886,"1139":-1.8709005638157798,"1140":1.0674065266992185,"1141":1.929791413368784,"1142":2.1822828788993127,"1143":2.3856449215622284,"1144":-0.7692392851614595,"1145":-1.6555658059609148,"1146":-0.8528962262963029,"1147":-2.726055323372456,"1148":2.4050885125676236,"1149":-0.3357320584926523,"1150":0.7133453283537746,"1151":-0.11176724888557849,"1152":-1.7487859203390683,"1153":-3.7732624385373925,"1154":1.91950694221007,"1155":2.3669027682986172,"1156":1.6706238717405126,"1157":-5.179069666548324,"1158":-3.6823854168203294,"1159":-0.5884453522777179,"1160":2.145600101569132,"1161":-2.1272909803142124,"1162":-1.2223053307234175,"1163":0.6633655919864282,"1164":-1.4915466078046324,"1165":0.5290932009658499,"1166":3.1656561397028105,"1167":-0.5165206744893945,"1168":-3.953911601953151,"1169":-0.33770578827736236,"1170":-4.74937110467969,"1171":2.9154864797265954,"1172":2.9525649966967387,"1173":6.009802792814829,"1174":-5.401769786493283,"1175":-0.16228350172235587,"1176":4.65932368790054,"1177":3.173088267482271,"1178":1.1053107212624933,"1179":-0.24879842655849294,"1180":0.74549894772128,"1181":0.044408101605718696,"1182":0.025360344491592322,"1183":-0.6130429738316211,"1184":-3.681801232136676,"1185":0.7898536761625947,"1186":-2.464852825550014,"1187":-1.788243768652295,"1188":0.8787005567021657,"1189":0.4021307772837164,"1190":0.9302528681300309,"1191":-1.4164347702563962,"1192":-0.25046292421590916,"1193":-2.857608468686834,"1194":-1.5203592780994186,"1195":0.41284177860557936,"1196":1.668849174780013,"1197":-1.4699062738910402,"1198":-2.5254020271442106,"1199":-1.4977391605965498,"1200":-2.76335690390817,"1201":0.9826940200064009,"1202":3.1092164666454924,"1203":1.6544097657252055,"1204":1.017654843792269,"1205":2.373604190455587,"1206":-4.698295567954666,"1207":-4.073288028553543,"1208":-4.7306344552026,"1209":0.22810029624849326,"1210":-1.3629151680712266,"1211":1.3722476599390514,"1212":-2.5367729963015075,"1213":4.883316609090695,"1214":0.35919679480290456,"1215":0.00852783790769799,"1216":0.9631926065531643,"1217":4.977213035148329,"1218":0.22371759648051628,"1219":-1.8984488430677777,"1220":-3.0232500784356753,"1221":-1.0810610444184228,"1222":-0.5526014240059701,"1223":-0.7916471352539072,"1224":2.083134433857531,"1225":-1.5909557647037893,"1226":2.3217557081397224,"1227":-1.5517378586558277,"1228":-0.7258517816201934,"1229":-1.8057512354531937,"1230":0.0819026039235291,"1231":-0.39913387169746256,"1232":0.09346955338196707,"1233":1.5080124281061984,"1234":0.20834729030295407,"1235":3.8070337557189835,"1236":-1.9602617794469979,"1237":-1.7399898144876036,"1238":-1.0355183950022857,"1239":2.2437508358333513,"1240":-0.9694134853814943,"1241":2.6351308922885335,"1242":0.9425791502104551,"1243":1.5719649321727793,"1244":1.8960108946690113,"1245":-1.0040582475022048,"1246":-6.28931022377398,"1247":-0.24453672364150542,"1248":1.9829023454985226,"1249":-0.33731120000775094,"1250":1.0573619027191643,"1251":1.1256224614849801,"1252":0.33355767104509665,"1253":0.5118622041655794,"1254":2.6746008477741303,"1255":2.8918942706028727,"1256":-2.329776635635653,"1257":2.216426059425025,"1258":5.777162068704373,"1259":0.41730603516669834,"1260":2.6006579210827634,"1261":4.462078435512905,"1262":2.367422699801827,"1263":-4.636372480026029,"1264":0.5485917774363367,"1265":1.0402306135111823,"1266":0.7763414130406389,"1267":-4.044861545573772,"1268":-1.1642390092911992,"1269":2.8547881141588625,"1270":-0.04154459662877169,"1271":-0.0761119378229596,"1272":0.7393354908291871,"1273":-2.8282553772293997,"1274":-0.322114660401283,"1275":0.8508767273498002,"1276":-0.5506676841598086,"1277":1.659659427824409,"1278":-2.3072985405782522,"1279":-0.14404525886615213,"1280":-2.650753210399876,"1281":-2.325444802986021,"1282":3.2136564232719964,"1283":-1.6170467273305573,"1284":-1.8162268485385233,"1285":3.680714323434447,"1286":5.343043249799459,"1287":5.480496174281469,"1288":-2.3749681055025795,"1289":2.118148286765502,"1290":2.935359835690789,"1291":4.284689816644218,"1292":0.5485987660190397,"1293":0.16387662768916833,"1294":3.5620484230405203,"1295":1.731410034258989,"1296":-5.09321258672081,"1297":0.0019816218189787826,"1298":-1.44503753907361,"1299":1.3756958684958571,"1300":0.5598362304830977,"1301":-1.7096519561955141,"1302":2.6649005302741524,"1303":-0.7471478788317032,"1304":0.8610589905912035,"1305":-0.568642951206648,"1306":1.670794162551287,"1307":-0.006657030225268247,"1308":4.629364703410362,"1309":-1.3978914297960237,"1310":-1.3241550500349475,"1311":-3.3652312444114583,"1312":-0.5628162668845186,"1313":-0.9794452306221912,"1314":-1.9481622671363077,"1315":-5.435510616791012,"1316":4.112295997955101,"1317":-3.3970825081200307,"1318":-3.494023714309011,"1319":2.326699430770967,"1320":-1.1863434408226385,"1321":3.4912462357265395,"1322":-2.162400000516669,"1323":2.7472151361174175,"1324":3.9230397693766688,"1325":-0.3167270888759347,"1326":-2.0532619663929945,"1327":0.10063473993140563,"1328":-0.24333767383729726,"1329":0.5320005121679398,"1330":0.1562775840863043,"1331":-1.4891158855816826,"1332":-1.0022663829294194,"1333":-0.9007551113114141,"1334":1.8759766805952172,"1335":1.7358241448980114,"1336":5.01545552273072,"1337":3.024682717123172,"1338":0.4007065677627574,"1339":0.8465887625058447,"1340":4.491248894362966,"1341":0.8115619602400278,"1342":-0.627693034017554,"1343":-4.496445700830326,"1344":3.4890789071133574,"1345":1.7365890120645886,"1346":0.966682428772448,"1347":0.8932622427763255,"1348":0.7858282800177976,"1349":1.5102571687001816,"1350":1.5266363515257864,"1351":-0.3280163739716412,"1352":-1.2018440641046502,"1353":-2.5169243854289056,"1354":-3.542414851955564,"1355":-0.6933046265939046,"1356":-0.7926520567587882,"1357":-0.6170818199435609,"1358":-1.0168219602395594,"1359":-0.04704056347130527,"1360":2.009473999812457,"1361":1.3221138612452337,"1362":4.664885640910979,"1363":-2.840235501936602,"1364":-0.4750320493056981,"1365":2.3035019873863996,"1366":-0.3698324010930051,"1367":-1.320363761941271,"1368":-1.9456798759858,"1369":-1.2607771979347449,"1370":-2.407662369401736,"1371":-6.308526684473238,"1372":-0.4387606973526791,"1373":0.24029699702795626,"1374":0.12366725105690037,"1375":2.487869014184104,"1376":2.8843771162104352,"1377":0.2819276839107632,"1378":-1.7337466783175428,"1379":-1.6513784682817443,"1380":-1.5818040681587897,"1381":-0.6377983811415903,"1382":-1.7937715996465695,"1383":1.2812195479881165,"1384":-1.662412208773924,"1385":-2.0729731715929622,"1386":-1.6307489761561438,"1387":0.11533410154651305,"1388":-0.6433459707122975,"1389":-2.081394811856743,"1390":1.8707073906372493,"1391":-1.4585017531735345,"1392":0.15593071486614143,"1393":-0.9374254929288073,"1394":2.23913387814668,"1395":0.09370187504428792,"1396":0.23295847463254996,"1397":-2.8303332017796756,"1398":1.9842280982404148,"1399":-0.3743464515537837,"1400":1.3957895321601959,"1401":-2.1409508007588944,"1402":-1.063968601463949,"1403":-0.6064280416724822,"1404":0.00046020250947802384,"1405":-0.09217630867950043,"1406":0.6530310149140142,"1407":0.7841615107524329,"1408":-1.3949337526149326,"1409":-0.695418397686987,"1410":-1.3432371453531824,"1411":-2.549160148825509,"1412":-2.3649495814843573,"1413":0.5084295247973707,"1414":0.7501328545147807,"1415":-2.346835728885209,"1416":-5.753969029832736,"1417":-1.7841182490295318,"1418":-0.01137318594106035,"1419":0.9991477805464841,"1420":-4.0995690092379045,"1421":7.769321785577161,"1422":3.682801881579607,"1423":2.1565958010733794,"1424":-0.693935401945119,"1425":-2.083157336429438,"1426":-0.36926336061877246,"1427":-2.97696935361747,"1428":-1.8266491365687287,"1429":0.6135304843437601,"1430":-1.4422276527719848,"1431":1.047711259668967,"1432":-0.5679007557599747,"1433":3.3822034324046064,"1434":3.8646960676588096,"1435":-0.39080940456100893,"1436":-0.06369906463739208,"1437":-0.03602454687562871,"1438":-3.2936868012616336,"1439":-7.007239500845187,"1440":-0.76221512981891,"1441":1.0491200449197657,"1442":-0.3233729823818923,"1443":3.1676777854016755,"1444":5.840690032189299,"1445":0.660883616621712,"1446":-1.2231535936382762,"1447":0.7551134870714177,"1448":0.40849976593365445,"1449":0.4660103663912955,"1450":-0.9274180692346904,"1451":-0.31598268642774335,"1452":2.8609862540549416,"1453":0.1471801046107859,"1454":-0.651823535524178,"1455":1.7400884172132154,"1456":1.0457273416003965,"1457":-1.8245801927344634,"1458":1.094900257182872,"1459":-0.5501438045322482,"1460":2.8292851222866062,"1461":2.9914925087221214,"1462":5.607066709627003,"1463":5.814987722932465,"1464":1.101267930100377,"1465":5.014244175987994,"1466":-1.1231778609264687,"1467":0.3884832935286025,"1468":2.371598421144035,"1469":1.4859108848156362,"1470":2.1495855432690654,"1471":0.03589902537258043,"1472":-0.8133117897368928,"1473":-1.8291951360452725,"1474":-0.4534320464965364,"1475":-0.8417688550834862,"1476":-0.9484514020253532,"1477":-1.1538025143470731,"1478":0.8519736502448086,"1479":-0.6407227310482589,"1480":-0.08919566990004776,"1481":-2.288806347916422,"1482":1.514983827161002,"1483":0.013554622640731769,"1484":2.0878904628554893,"1485":-0.38209193025867905,"1486":-0.18606488767005464,"1487":-0.763265019155453,"1488":0.6231730823861358,"1489":-2.08060582153276,"1490":1.7820318835638735,"1491":1.3462282390482565,"1492":-2.689188318690305,"1493":0.3583846252107261,"1494":-1.344325936268584,"1495":1.07615751253893,"1496":-0.9289005749163237,"1497":0.520998198613769,"1498":-0.23865960220189814,"1499":-0.284621333697717,"1500":0.009325940894258495,"1501":0.8945474292585011,"1502":-1.0120513180632649,"1503":-1.293728554595976,"1504":0.867223073898859,"1505":-0.47749650371653524,"1506":-0.015554914715990962,"1507":0.4905185024506283,"1508":-0.12679600213437528,"1509":1.3584408483668218,"1510":1.3669415800671887,"1511":4.364124254145447,"1512":2.3095249275984227,"1513":-1.9244145132990305,"1514":-2.860016165842706,"1515":2.581303611675746,"1516":2.192069626731367,"1517":2.247624943022793,"1518":3.087195318926138,"1519":-1.2695133624090893,"1520":4.481457669835021,"1521":1.9509668032465242,"1522":2.4069503030913135,"1523":1.274321423391926,"1524":-1.2321789961929766,"1525":2.421686489930539,"1526":3.9620985715622,"1527":3.536122382389326,"1528":2.316306359572966,"1529":1.7491762059873561,"1530":4.809338727399987,"1531":1.9488653063805876,"1532":2.332804115767742,"1533":0.0473331100774683,"1534":0.38402505313685653,"1535":0.7683395548412549,"1536":-0.17247194414223316,"1537":-0.004087564676527426,"1538":-0.15938426345876242,"1539":0.6158617780743504,"1540":0.9896624311785174,"1541":7.447132256686528,"1542":6.023089381773896,"1543":5.796697729057314,"1544":-2.060021684021425,"1545":-1.3060534151723262,"1546":-0.38386952573870087,"1547":-3.405966979405834,"1548":-0.16269887698075516,"1549":0.07495087514088342,"1550":-1.1359807379314097,"1551":-0.9080437841744361,"1552":-3.299665991102039,"1553":-4.396239162698381,"1554":2.171405922564665,"1555":0.2449052955951826,"1556":0.373762745112859,"1557":0.050461519844756254,"1558":0.9871037075769586,"1559":1.3426038233920161,"1560":0.45003746886182283,"1561":-0.8964031617405589,"1562":-0.8518535972293517,"1563":-0.8040167379736981,"1564":-0.3977752561932158,"1565":-0.4200638423752579,"1566":0.18513097987966978,"1567":7.457234884148331,"1568":8.938031938303347,"1569":6.871414250121355,"1570":-0.2656385126638248,"1571":-0.8031719262330972,"1572":0.5388602415535607,"1573":4.5014536486102745,"1574":-0.1018635347845247,"1575":-0.14751376809715122,"1576":-0.9796871279643278,"1577":0.04755584868040682,"1578":-0.38229142541088124,"1579":-0.6625523461183886,"1580":0.3021757160802578,"1581":-0.3648169266465085,"1582":-0.1354246708516578,"1583":0.30849187461552197,"1584":-1.6253666976954035,"1585":-0.8376945329770936,"1586":-0.1559638406896204,"1587":-4.380736472748121,"1588":-2.744206673457098,"1589":-2.316885696596329,"1590":-0.027201034774962274,"1591":-0.392872851573052,"1592":-1.2193397175945495,"1593":-9.635329080382418,"1594":0.8160784678050529,"1595":-0.2995221886744559,"1596":-0.3702833335933889,"1597":0.18488988418610983,"1598":1.106511246396372,"1599":0.6675325869821044,"1600":0.08421120325204919,"1601":0.7672029341121456,"1602":-0.7579251067758191,"1603":-0.8036953698046693,"1604":0.1435886068750726,"1605":-0.024805678085190547,"1606":-0.38451599372197587,"1607":0.1803370134808733,"1608":0.21920433727785363,"1609":-0.2714771385953994,"1610":-0.4580481633791793,"1611":0.10276861034970378,"1612":1.039628596464408,"1613":-0.7861656693056676,"1614":-1.1708046698295558,"1615":0.9707853007446364,"1616":2.4865722098391867,"1617":0.7577533221151332,"1618":-0.19947850320797045,"1619":-5.130407829851233,"1620":-6.0999628788393,"1621":-4.514512534819338,"1622":-0.7493640972138063,"1623":-0.8909262918955551,"1624":-1.3216260044434958,"1625":3.909376655822024,"1626":9.119928548430162,"1627":1.4566766591312506,"1628":-0.6819501513317531,"1629":1.468607682338201,"1630":0.556847371615828,"1631":1.775521093902935,"1632":1.0393774056085021,"1633":2.4404310825938897,"1634":-0.5636300398172504,"1635":-1.641264768752596,"1636":-0.1112343342800557,"1637":-0.1169991988165833,"1638":-2.514264601263523,"1639":0.8809651963234987,"1640":-1.439196188341902,"1641":-1.9761375649747865,"1642":0.963885629454835,"1643":-3.134852829304007,"1644":-2.596261948331483,"1645":3.8497439657243238,"1646":-0.8100631222186462,"1647":-0.7889618105470588,"1648":-2.522473925847315,"1649":2.3470159705389806,"1650":1.7421004380759129,"1651":-2.724369579704978,"1652":8.92526658892965,"1653":0.8759913923509159,"1654":-0.1373414966678784,"1655":-0.04632180625840851,"1656":-0.3359677607674547,"1657":0.40225378093837827,"1658":2.3346685138729684,"1659":1.2348906387432717,"1660":-3.0917908349282563,"1661":-0.7742226594381013,"1662":0.06082124767475917,"1663":1.854111949157665,"1664":-0.5184009921950867,"1665":0.22986333111976415,"1666":0.8425009560861565,"1667":-0.5773013920475623,"1668":0.2525678128107712,"1669":-0.8794473937717402,"1670":0.04734760679910972,"1671":0.9246491983936092,"1672":0.7167172713954642,"1673":0.9364568025456296,"1674":-0.9009434490876043,"1675":0.8844946827608177,"1676":-1.0857088477156152,"1677":-4.223764675146934,"1678":-0.5009728135219694,"1679":0.2859095993087632,"1680":-0.05541755062704813,"1681":-5.699557956912611,"1682":-8.430688817506603,"1683":-9.759430090557732,"1684":0.2883113423257681,"1685":0.2851744042869047,"1686":0.7229647701171498,"1687":0.46056305862178015,"1688":0.26499193206705457,"1689":-0.7032556151659108,"1690":-0.32031301272759954,"1691":-0.08458276998340532,"1692":1.2201397328265189,"1693":-1.7830609315013435,"1694":0.4912188492011817,"1695":1.0437355053028832,"1696":3.1210716455550553,"1697":-5.08072002602215,"1698":-1.798700814565875,"1699":-2.393552118187533,"1700":1.4195753329665965,"1701":-1.4803159300364044,"1702":1.796355223550053,"1703":-3.6155200027691916,"1704":-1.4382125877578513,"1705":-2.4298302779924317,"1706":4.371849484474424,"1707":1.6460467330063024,"1708":2.5378597606812363,"1709":4.4484463747823275,"1710":0.8468123402519288,"1711":2.292053999976175,"1712":3.313414507651368,"1713":-5.65034668921098,"1714":-1.7512117117258903,"1715":0.6692891719582753,"1716":0.03225878583099158,"1717":-2.6020450302195512,"1718":-0.1492755257836329,"1719":-2.432579601572766,"1720":-3.7773303778105514,"1721":0.9940918954418311,"1722":-2.905433200151588,"1723":-1.1456780922733856,"1724":-2.0800942767544326,"1725":-0.2437827902135947,"1726":-3.7286507233237742,"1727":2.9484194191845794,"1728":0.07593202730334371,"1729":1.657768207128445,"1730":-1.9220149470301324,"1731":-0.5250299700289373,"1732":2.389263108808738,"1733":5.23348458471186,"1734":2.072966710338989,"1735":-1.3950851424277115,"1736":-0.9038761153725946,"1737":-0.9005126953046965,"1738":-3.055946091947108,"1739":2.0544642428360307,"1740":-0.8846489319497355,"1741":4.263129628822539,"1742":-1.9483705944449163,"1743":-1.4858846537348518,"1744":-1.2200503227354007,"1745":-3.6095432315625438,"1746":1.384335276778533,"1747":-3.270160749531831,"1748":-4.37685537045598,"1749":-0.2670533571093521,"1750":0.2584482826138587,"1751":-0.20329695244973517,"1752":-2.956204592214078,"1753":-0.994347151539876,"1754":10.21971083248167,"1755":0.3113671103963739,"1756":-1.2482321169027457,"1757":-0.7081590575190316,"1758":1.2112215504699104,"1759":-0.762371512417185,"1760":1.834953035783505,"1761":-4.93362291932494,"1762":-0.3440584608965805,"1763":1.4013718763198328,"1764":1.584509696275672,"1765":-0.34523765665564454,"1766":-1.4359739623871388,"1767":1.6811182113499323,"1768":2.472067315043197,"1769":1.531714063335573,"1770":1.5136327301981087,"1771":1.1838786837326274,"1772":-0.8758943894293207,"1773":2.7747900229437943,"1774":0.762090037098641,"1775":-4.076561367855272,"1776":-2.7352281177271633,"1777":-1.8769328037184747,"1778":1.8948624386807733,"1779":4.137403501810433,"1780":-0.8328137001019001,"1781":6.413786485223573,"1782":5.513353620583527,"1783":1.7817128254276198,"1784":-0.23638484531121612,"1785":-1.2359504204722367,"1786":-1.363702912588658,"1787":-5.449397123668984,"1788":-1.8930108471731255,"1789":-2.8520022327173318,"1790":0.14790851293806254,"1791":-0.9812797258214946,"1792":-1.9828802637253178,"1793":1.7290170580747177,"1794":1.6461990222698502,"1795":-0.6617142123077677,"1796":-3.466307107045331,"1797":2.5199846145981364,"1798":1.4524276568845607,"1799":0.8835044348918993,"1800":3.1726595561078956,"1801":0.14611907233333632,"1802":4.946613123033519,"1803":1.9500753639267072,"1804":3.798822681105352,"1805":-1.2056959283829383,"1806":-3.5767601251705865,"1807":-2.5591066326134246,"1808":-3.384620079954752,"1809":1.7279659798650575,"1810":-0.7198610904592261,"1811":3.8977626458266985,"1812":1.7050719119488373,"1813":0.16549785952794066,"1814":0.4325818820149847,"1815":-2.654428249262137,"1816":-2.3594602341149042,"1817":0.28908596683301097,"1818":-4.420800357056564,"1819":-0.47444456548618397,"1820":-0.6545772101930314,"1821":-1.7617059418444923,"1822":1.4125501882843148,"1823":2.0706382373543057,"1824":-2.5870232478511386,"1825":0.3705955600121367,"1826":-0.38807105313124457,"1827":-4.873239935633285,"1828":-4.6315041082507085,"1829":-4.2711285516469255,"1830":-0.10395198354851866,"1831":-1.7703762778133,"1832":-1.306611611107063,"1833":-3.554111626767336,"1834":-3.3067338587478234,"1835":3.2776247915398597,"1836":2.2318320832244334,"1837":-1.5405227551766698,"1838":-2.2603565449180474,"1839":-0.30973373770188994,"1840":-1.1771902764106266,"1841":0.7598359098293131,"1842":-0.3870573999896574,"1843":-1.7108576623216571,"1844":-3.148532656450419,"1845":-0.6764459166336844,"1846":0.8535860189855173,"1847":2.7022720316407196,"1848":-1.2934329441020032,"1849":-1.7527083672153554,"1850":-0.682148280857677,"1851":0.24828942515763328,"1852":1.7887501099546803,"1853":0.7884749411603326,"1854":4.0296096573525775,"1855":4.140954052175015,"1856":-0.7791617820092341,"1857":-0.2584524363427825,"1858":6.776519949240771,"1859":6.950904302278288,"1860":2.682720725653526,"1861":-1.9743402931904248,"1862":2.607680539271447,"1863":0.06012141243909666,"1864":-6.626907148198322,"1865":-1.8082320620375807,"1866":0.6927986134277762,"1867":-2.1676751649928607,"1868":-1.4346086123031891,"1869":-1.7344619820661547,"1870":-0.8160438894914283,"1871":-0.3960781919970463,"1872":-1.5509625748344236,"1873":2.2246874255492886,"1874":1.696179482155211,"1875":2.3131530244419647,"1876":2.057750769633902,"1877":-3.449788668603296,"1878":2.5092601918907307,"1879":1.0785033018586458,"1880":-2.3162094948294336,"1881":0.45689608720096203,"1882":-1.7990125927934015,"1883":-1.6218351440922056,"1884":-7.677032830815633,"1885":-4.836173435131845,"1886":-3.0924676866801253,"1887":-4.305449285874837,"1888":1.5481577264212958,"1889":2.4678424074231793,"1890":-0.5979630948357118,"1891":-2.355489524096977,"1892":-0.45197651760872476,"1893":-2.2300858921572875,"1894":3.0423767144407936,"1895":1.0690605762132896,"1896":-1.7937558730693903,"1897":-1.1766138391813505,"1898":-0.7314273709474434,"1899":1.208069580494033,"1900":0.7808846988833671,"1901":0.2636022425286427,"1902":3.6026738640381115,"1903":-0.8061937858017696,"1904":1.0514034412845457,"1905":1.311301228087006,"1906":-0.944989817497881,"1907":-1.5216749778082774,"1908":-1.648666801013114,"1909":-6.982682336741551,"1910":0.21975827100152295,"1911":4.6656649164059765,"1912":3.167864428928685,"1913":-2.1618986259163586,"1914":2.998738607564934,"1915":-1.5939833337264562,"1916":0.5515666124690427,"1917":1.3323582345729397,"1918":1.361036387363603,"1919":-0.6001209595550937,"1920":-3.1598101255265565,"1921":-1.6130396286608266,"1922":2.1522665112966695,"1923":0.5692959708154036,"1924":1.9110911219357265,"1925":0.6182442293853246,"1926":5.108925553830404,"1927":3.819888478936757,"1928":1.2440341005476199,"1929":-0.02222793119776367,"1930":-1.312191797122312,"1931":3.0741956732420657,"1932":0.05824845903478719,"1933":-3.860504000679043,"1934":0.47110284838586985,"1935":2.430793494935693,"1936":3.6312368766822964,"1937":-0.5520116075416013,"1938":1.4496117363545642,"1939":-0.34886662596519746,"1940":-0.5161668670094623,"1941":-1.1548910528317131,"1942":1.1685970272593391,"1943":-0.5380682816952818,"1944":1.204868216074985,"1945":-1.8208402269373594,"1946":0.3978391320310037,"1947":-0.4445789779636031,"1948":1.1268737224687404,"1949":1.515634620558529,"1950":0.7800054711792223,"1951":-2.838110624903852,"1952":-1.5548203454241547,"1953":-1.7756376053514562,"1954":1.0751835493494772,"1955":-1.8529462466041802,"1956":1.775323499272121,"1957":-2.229540216733316,"1958":-6.242039352064176,"1959":-5.025314692304924,"1960":-2.4299951921459413,"1961":-1.5950979221059258,"1962":2.407005893995572,"1963":3.505238880987379,"1964":4.789092294542891,"1965":-0.3272608432116538,"1966":0.7567319208174809,"1967":1.709222996376704,"1968":-3.985438957754508,"1969":-2.122172620020453,"1970":-2.0721992815826287,"1971":1.9118154760729724,"1972":-0.9615401689830361,"1973":-0.920588186820064,"1974":-1.7081648213448735,"1975":2.6615077041363535,"1976":-2.2810330763849973,"1977":-2.7485296974628115,"1978":0.5973922781881099,"1979":0.9950371488818414,"1980":-0.966498487396172,"1981":-0.1289013409577693,"1982":-3.315939881922809,"1983":1.5272771886741152,"1984":-8.177532796206625,"1985":-2.614215957848821,"1986":-2.1282553806106868,"1987":3.1728725032045704,"1988":-0.5817936703035552,"1989":-2.2636947811849484,"1990":0.6706874937781734,"1991":-0.8109748814280211,"1992":3.7875692555670772,"1993":-0.5985168941860155,"1994":-2.185878080928974,"1995":-0.09228209131307342,"1996":2.666865341692212,"1997":-0.2365567120320066,"1998":3.4180842090059604,"1999":-2.193022508107972,"2000":0.7727915236674334,"2001":1.1485888381623532,"2002":2.25869994187929,"2003":-0.35131002162400443,"2004":2.9042411539132167,"2005":4.259935889255852,"2006":3.862258196644587,"2007":3.2230256792234013,"2008":-1.7369221705831208,"2009":4.1844479824921335,"2010":3.464982551263125,"2011":3.462624083371719,"2012":1.5685419583916367,"2013":-0.005852455243952848,"2014":3.5332839050757006,"2015":0.3982682275227457,"2016":1.6225015665396234,"2017":-3.0196742425849417,"2018":0.11375162904843705,"2019":4.410140911342747,"2020":3.143990758347775,"2021":2.9481121931650365,"2022":0.2776844441477411,"2023":1.74445178965741,"2024":1.9257248513743161,"2025":3.3690601893535406,"2026":3.0883134248569886,"2027":0.05287319340381891,"2028":0.33107119854323835,"2029":-2.670093641253074,"2030":3.24837511767306,"2031":2.0992876557694173,"2032":-0.4777242364667755,"2033":3.4134596633234957,"2034":-2.068855509926789,"2035":5.214416112914395,"2036":2.0462662727977756,"2037":1.0147430838110256,"2038":0.27401172565903376,"2039":3.132138944920353,"2040":-3.482243128457271,"2041":1.6149241637133667,"2042":0.519253557650071,"2043":0.027029436911530317,"2044":-0.028618949682287707,"2045":-5.459692212590129,"2046":0.1911389362984459,"2047":-0.7813243438209266,"2048":1.1311266332369314,"2049":0.9141855337868702,"2050":0.6709934473497279,"2051":-1.3133891184186814,"2052":-0.5156405967557093,"2053":0.5057062513077217,"2054":1.380866325668851,"2055":-0.6756389519129898,"2056":-3.3821049144223196,"2057":-2.9737142020717617,"2058":-4.304649150545979,"2059":-0.1145614726996016,"2060":1.5907402422680879,"2061":-3.1345034615412612,"2062":-4.887406450065384,"2063":-3.017741649460873,"2064":-2.436942987389461,"2065":4.49497750066572,"2066":-2.544632140183701,"2067":-2.553145255642751,"2068":-3.6535860049895983,"2069":2.6899975034551784,"2070":0.23621943330582484,"2071":-5.07778120836197,"2072":-3.316778948700732,"2073":-3.3431237337449184,"2074":0.3556553450963761,"2075":-0.7927480971163615,"2076":-3.4559382374048737,"2077":-3.1321197728898484,"2078":-3.0015235019822875,"2079":-0.30790711077153815,"2080":-1.1074347331013232,"2081":-2.1500790584515195,"2082":0.6322262453616124,"2083":-3.0358093986456653,"2084":-3.847028149521107,"2085":-3.4778712607311375,"2086":-4.190538359548286,"2087":-2.4456320054668392,"2088":-2.6405083400099,"2089":-2.3290685773021926,"2090":-0.8868680288184999,"2091":3.887368552135823,"2092":1.2831798239378918,"2093":-3.154290774064701,"2094":-2.055799492816548,"2095":-2.3868195924400673,"2096":-4.360793580866089,"2097":1.1439932170647553,"2098":1.627861849572595,"2099":0.41259549515264377,"2100":-5.0411920850036385,"2101":0.19878011848160576,"2102":-0.6158300613158497,"2103":2.2461374419748874,"2104":-1.0588324503889799,"2105":-0.24088098035316213,"2106":-0.5358971028041509,"2107":2.5182798478575634,"2108":2.1419298264319586,"2109":3.49904066669386,"2110":2.931870583658852,"2111":-0.5129166322522097,"2112":-0.2626691578547449,"2113":2.7530075822314295,"2114":3.0285237679573864,"2115":0.9843868331376889,"2116":1.153499233058888,"2117":4.219577242045802,"2118":-4.09112955236525,"2119":6.439433395878304,"2120":1.7109993328291464,"2121":2.2645909521743812,"2122":2.3403143234495962,"2123":0.38869745502736613,"2124":3.3505023901535873,"2125":0.044641085882746664,"2126":-1.2681138586936185,"2127":-0.4737927989728625,"2128":-1.9034467943317817,"2129":-2.369563546677504,"2130":-0.5161235045742878,"2131":-0.5306507393726414,"2132":1.4048592247934646,"2133":-0.09479461669630704,"2134":0.9624546909573186,"2135":-0.3528304624589685,"2136":-0.2911973818697277,"2137":1.3815265474104859,"2138":-1.0923891387016227,"2139":2.2423423003948186,"2140":2.1569838012828746,"2141":1.558571676822743,"2142":0.20537893256670753,"2143":2.0939420426879902,"2144":5.581279346426725,"2145":-7.964089159532528,"2146":0.019301062588694733,"2147":-0.3291022595615165,"2148":-1.0994423443630212,"2149":6.4920705431830585,"2150":3.9985912328414384,"2151":1.8125236498178043,"2152":-0.2816971103070886,"2153":-0.9268693192423381,"2154":1.9136581243479935,"2155":1.6509968904648182,"2156":2.246010993007797,"2157":-0.02705501606071901,"2158":-0.7302180413707975,"2159":-0.2949083844413593,"2160":1.1297515401173712,"2161":-0.44100093758398046,"2162":-0.34102495698979435,"2163":0.10308974168280734,"2164":-1.2651570965147414,"2165":-0.9315851776051549,"2166":-0.7927443902728659,"2167":-0.959829257272662,"2168":1.1334656417952058,"2169":-0.6525252228387264,"2170":0.31561519184011677,"2171":-0.8781123440270242,"2172":-1.198610781490917,"2173":0.16535481927085355,"2174":-12.025202927695108,"2175":-2.15684069486902,"2176":-2.223607192335822,"2177":0.37526505640753033,"2178":1.4223701186649629,"2179":2.2215628162117036,"2180":0.2877272518147841,"2181":-1.5551175185973414,"2182":-0.9946082812025748,"2183":0.09750462954549663,"2184":1.4285806621638313,"2185":2.7702069012884794,"2186":2.869131540718531,"2187":-2.176199063707382,"2188":2.0354053278061834,"2189":-0.15556170572528435,"2190":1.4148234413607874,"2191":2.487419172471137,"2192":0.5910148862676382,"2193":1.8754819501608955,"2194":5.819274154832697,"2195":-1.043673101737649,"2196":-0.5356667549597663,"2197":-2.2986021575342144,"2198":-0.5504393655467628,"2199":-1.3836000325347653,"2200":-0.5921525637623387,"2201":-3.608852019049184,"2202":-2.6056234272565937,"2203":2.125065355345137,"2204":-1.9100656253398987,"2205":0.49263076974197856,"2206":-5.342439123403595,"2207":-0.6745513301437716,"2208":-1.3575288649745854,"2209":-1.4811151629375257,"2210":-0.5624333090666122,"2211":-4.057673025595455,"2212":-1.138722138994092,"2213":1.137056268330495,"2214":2.1996607501927796,"2215":2.504027633629195,"2216":-1.7527060331841058,"2217":3.552928552125533,"2218":-2.3129258912901407,"2219":6.621051335288329,"2220":-0.5366026129581464,"2221":-0.25888151597692527,"2222":1.5884790885441606,"2223":3.8984002310743042,"2224":-0.8362391628858972,"2225":-1.2223584656617805,"2226":-0.5707345784111167,"2227":-1.4704133435570912,"2228":0.2451739336491535,"2229":-3.101338412366491,"2230":-1.6517660004518053,"2231":-1.6483851328797625,"2232":5.98353895417644,"2233":2.3719484552218018,"2234":-0.1778347382215801,"2235":-1.6747078460957632,"2236":-3.6593290912224736,"2237":-0.1406662684556022,"2238":0.49007301427844213,"2239":2.1775340216698496,"2240":-0.705748916544845,"2241":1.073526200827766,"2242":-0.009987455329693504,"2243":0.13427437036377182,"2244":1.4704606620705447,"2245":1.943291936423098,"2246":1.930980597011241,"2247":0.5577607510089574,"2248":-0.9984076718065228,"2249":-2.056970540523284,"2250":-0.3579162714769216,"2251":2.180464637816898,"2252":1.7731149910248842,"2253":0.0816883705986654,"2254":1.493322337648596,"2255":0.7591959621844057,"2256":0.9207045952906473,"2257":-2.0069472355300215,"2258":1.7162524580015288,"2259":0.64656444721473,"2260":3.633465721904076,"2261":-1.052604945533235,"2262":3.7490400274752047,"2263":0.650583315668585,"2264":-0.5182831298021289,"2265":0.8114209362146789,"2266":0.11809355256933213,"2267":-5.985553842947244,"2268":-1.2008774666943312,"2269":-1.0188475935656498,"2270":1.1366436799612865,"2271":3.272144432928612,"2272":2.915940188111515,"2273":0.5884973269368095,"2274":-0.04974469011300031,"2275":1.9986220135574824,"2276":-0.47541580851698745,"2277":-1.5959275975560478,"2278":3.299453405569844,"2279":3.7858612028534173,"2280":-0.24333054914603547,"2281":3.7024520005701955,"2282":-0.17826939713691253,"2283":0.9267510827752319,"2284":0.5784404212515399,"2285":0.25570400471723925,"2286":0.6777125811321316,"2287":-0.6438217598302651,"2288":-1.0277852455429974,"2289":0.44752059907534103,"2290":0.5920272722011557,"2291":-0.008891911020114331,"2292":-1.263182790612434,"2293":0.885876717250752,"2294":-2.088008004509003,"2295":1.6840774655764779,"2296":1.7562235930818075,"2297":-3.3466028835849384,"2298":1.084349386878261,"2299":-1.1624543123407824,"2300":-5.952952704929209,"2301":-3.4477180923594357,"2302":-4.983591968929156,"2303":-1.4493302953281884,"2304":-1.808434284459666,"2305":0.9603110764541525,"2306":-2.5901646532427347,"2307":2.8967030407874246,"2308":1.2493901602204738,"2309":3.1137254549944666,"2310":-2.5609058162109264,"2311":-0.6065232461114529,"2312":0.8543175355993959,"2313":0.3228813618695871,"2314":-1.076758241591376,"2315":-0.5810354558715174,"2316":-5.357376674408935,"2317":-2.566985053959928,"2318":-2.5719952772078143,"2319":2.2920613693488505,"2320":1.6903498362366034,"2321":0.18741201089805948,"2322":5.534977627959552,"2323":0.7853248365260361,"2324":-0.7707338413434639,"2325":-6.282283258507139,"2326":2.3278507074166135,"2327":0.8161142154362804,"2328":0.9691923109633924,"2329":1.2286823222950705,"2330":-0.7698396881174359,"2331":0.8417547745653644,"2332":1.2475227938903042,"2333":1.5682081096755556,"2334":1.2354732063105376,"2335":0.8407397986456578,"2336":0.23549023786270798,"2337":-0.6920203812055791,"2338":-0.4355043806225341,"2339":-0.8429265297720329,"2340":-1.7962937819941867,"2341":-2.5440824741321304,"2342":-1.6031823702611245,"2343":-0.589604218648372,"2344":-0.58225216384377,"2345":-6.497281986473492,"2346":-0.1859453474733915,"2347":-3.3098828912373905,"2348":2.5400143138935602,"2349":2.7922557925730036,"2350":0.3091321286458554,"2351":-0.012941478797042992,"2352":3.77967481504382,"2353":5.164513148228868,"2354":1.6104893598634211,"2355":3.286391251453867,"2356":1.6066108386414317,"2357":2.851656150664826,"2358":0.4321900580233349,"2359":1.5299710187742435,"2360":1.0853122133831203,"2361":1.2427524000835117,"2362":1.429838665736613,"2363":-3.3169737746800734,"2364":4.079748000074865,"2365":-1.168091914890961,"2366":0.6374925484877235,"2367":-0.35405782617482057,"2368":-7.9058822905434525,"2369":-3.0346049225331586,"2370":-1.5194565426093611,"2371":-0.5516854068104527,"2372":-3.8688198707759005,"2373":-4.45118787128347,"2374":-1.700201149741892,"2375":0.30094748168874297,"2376":-2.3250736883831986,"2377":2.6363151523686006,"2378":0.04586771936196909,"2379":0.6210451420659614,"2380":0.09961957333805575,"2381":-1.1196131847733024,"2382":-0.16080767243091537,"2383":0.563625187676567,"2384":1.3870334292745374,"2385":0.6916367972942327,"2386":0.7651653785009589,"2387":0.4723814147282118,"2388":1.4927721595448789,"2389":-3.156974838991648,"2390":0.8404901138575425,"2391":-0.609338192875043,"2392":-1.1814111324970764,"2393":1.2087860210004784,"2394":-0.24242810828483433,"2395":0.12633634458898274,"2396":-1.031259384759105,"2397":-0.004445720993490301,"2398":-0.29458285277790147,"2399":-1.9762636773957563,"2400":0.5039214800330584,"2401":1.280618181248341,"2402":0.1419380293244581,"2403":2.2854709967979416,"2404":0.10304959992875967,"2405":9.671926781032152,"2406":8.739473690148515,"2407":0.4677504257835688,"2408":-0.6419991995947265,"2409":-0.8374558428158105,"2410":-7.766994086437314,"2411":-0.5392856277301485,"2412":1.2985604444192307,"2413":-0.12263312537428704,"2414":-0.015573548659156234,"2415":-0.8390858348325759,"2416":-1.227314416550631,"2417":-0.5254091192202038,"2418":2.2846159196070115,"2419":-0.9443753732650703,"2420":1.7173181064624934,"2421":1.8682960309357854,"2422":-2.179370791200713,"2423":1.5907154638593284,"2424":-1.0469210243010683,"2425":3.556665925613837,"2426":-0.19593933792846358,"2427":0.2751745964728899,"2428":-2.165215453239783,"2429":-3.53012490935711,"2430":3.4270841719228016,"2431":-2.5292497632768853,"2432":6.478512385683319,"2433":0.19854042652513032,"2434":-6.770459034800383,"2435":2.851805004698713,"2436":1.0930121297637372,"2437":-1.1945958566186505,"2438":-0.9471097798703476,"2439":0.6031066494266449,"2440":-2.317836039516796,"2441":0.2572758420211313,"2442":-1.68995598281444,"2443":-1.3126444087980977,"2444":0.9367449774653733,"2445":0.508651089178217,"2446":3.4836360963331567,"2447":0.3318727036997112,"2448":-5.064944070491586,"2449":-0.34554952134439815,"2450":0.2836704262393363,"2451":2.847931302519721,"2452":-4.688860737324752,"2453":-0.29085986070295267,"2454":1.2965799243822105,"2455":1.9785033646488315,"2456":-5.118680983114206,"2457":-1.6601284761276347,"2458":-4.706103595391981,"2459":2.502637557146663,"2460":1.4031039263271694,"2461":-2.8636868673363023,"2462":4.262778822225164,"2463":2.277898125667915,"2464":2.4530215532630124,"2465":-1.0320655950179727,"2466":-2.5557054096972602,"2467":-3.3676967652413756,"2468":-1.6578694383845436,"2469":-0.7770806666843857,"2470":-0.6196776776923686,"2471":0.22515471772423848,"2472":2.4514503454312515,"2473":0.9814309517415543,"2474":2.1265072541153094,"2475":0.44365541223989596,"2476":6.628531891673429,"2477":5.955211880135245,"2478":6.82901181813592,"2479":2.829445266204602,"2480":0.0820220619286704,"2481":0.4386896791579156,"2482":-5.810904467298456,"2483":-4.220445600052043,"2484":0.5279215463089031,"2485":-0.13221892647559974,"2486":-1.1557051746826916,"2487":-0.6638806042268117,"2488":0.17496470838664002,"2489":-0.2658392065133251,"2490":0.7866775261248969,"2491":0.08686765228173708,"2492":0.27026195064337033,"2493":-0.6940978029735978,"2494":1.0155882057789993,"2495":-0.1370117280768072,"2496":-1.9725745262959937,"2497":2.57785506623015,"2498":0.1852918133530177,"2499":2.3785147922633105,"2500":1.8744563365340698,"2501":-3.36533605570648,"2502":-0.34340780103133006,"2503":-0.18831468742823135,"2504":3.255403864395097,"2505":1.4442563910705577,"2506":-4.055985603104229,"2507":-2.4959500800449255,"2508":-4.120093122575456,"2509":1.9459385129711513,"2510":2.9769842137519023,"2511":-3.2513412755519755,"2512":0.9429698485862865,"2513":-1.7214024391877991,"2514":3.4201540317804,"2515":3.307589310975692,"2516":-2.792079131628199,"2517":-0.8761237062903772,"2518":-0.8436998508503116,"2519":0.39741308610588405,"2520":-3.123972390175584,"2521":-0.9282668195556935,"2522":-0.06656228604015899,"2523":0.3226218638352146,"2524":0.1999343343657592,"2525":0.4672689588488808,"2526":-0.2123939124878444,"2527":-0.5618334887410026,"2528":-0.9420267117373577,"2529":2.5049711818247156,"2530":0.98053208766477,"2531":0.6496049268052358,"2532":-1.227896485531355,"2533":-0.894739751278706,"2534":1.4150743033875888,"2535":13.811369949803753,"2536":-8.059128176190034,"2537":-0.43448380205073167,"2538":0.14580263418494271,"2539":3.7205765263502584,"2540":0.9751067048808427,"2541":0.5200787716026326,"2542":0.5741847241689308,"2543":0.059223775008445084,"2544":0.6210339392937558,"2545":0.41026199038836425,"2546":0.44534193501718916,"2547":0.20434354710709302,"2548":-1.0797218378841555,"2549":-1.2905384734893004,"2550":2.075456583338012,"2551":5.7965237314848945,"2552":2.9267715986832985,"2553":4.87977561419638,"2554":-3.353530899014764,"2555":1.2106435028811116,"2556":-0.623956364937946,"2557":-1.3003981637758946,"2558":4.714118886056824,"2559":1.2507208199259403,"2560":-1.1687842231568732,"2561":0.20914137241300257,"2562":2.576099776400409,"2563":1.1133887553676018,"2564":2.800037464719004,"2565":-2.41171524492837,"2566":-1.357201055805874,"2567":1.7265212314932747,"2568":1.0924447986798724,"2569":1.2284699476439394,"2570":-1.4140109857709582,"2571":-1.7906192781693642,"2572":-1.0905929982142526,"2573":1.1621401067441033,"2574":0.48953219948846244,"2575":0.27594784974735015,"2576":-1.274016027131979,"2577":2.0879570189221113,"2578":0.10792554724772116,"2579":2.0026405238045144,"2580":0.5106143555005933,"2581":2.2621787517845444,"2582":0.5870112709589065,"2583":-0.4466192842023629,"2584":1.2910496248895387,"2585":-0.16862559334909377,"2586":-0.18831692932395394,"2587":5.118590473169265,"2588":5.088254151574484,"2589":-1.2286838775188011,"2590":3.4657197903412196,"2591":1.7536313589615335,"2592":7.363171769218375,"2593":-8.033666740152325,"2594":-1.3561932282076623,"2595":1.1285755419101389,"2596":-1.1121923420087407,"2597":1.9001699025323544,"2598":-0.5836117844920405,"2599":1.9876411018502176}},"b1":{"n":100,"d":1,"w":{"0":-0.6368083528048403,"1":0.6280452077143005,"2":4.066692439060908,"3":3.067067537867292,"4":-2.585599904591403,"5":1.6822191411849858,"6":7.28657675720245,"7":-6.272588086754009,"8":1.3054113234406635,"9":-0.413573115047001,"10":3.8682171401145506,"11":3.6664598708941476,"12":5.18796518982214,"13":-2.255911809884993,"14":0.8086884232686538,"15":-5.026814215923765,"16":-4.30685638071191,"17":-9.997648073684402,"18":4.731468004500242,"19":-2.6248512172753515,"20":0.46949357428438243,"21":-4.596170979571118,"22":-3.0709091707406073,"23":-3.903828508667496,"24":-2.84902389854567,"25":1.1269615746562092,"26":1.4015234862541968,"27":5.061797600666158,"28":-7.768218340124737,"29":1.0569795930955028,"30":3.7013062901997027,"31":0.6252284255961814,"32":-1.5839186733221977,"33":-2.414001749413486,"34":4.311109016831646,"35":-11.32553044446382,"36":-0.5040264118873711,"37":-0.10314460238558748,"38":5.445450597010178,"39":8.608917017730258,"40":-8.88905658268702,"41":-10.065841916502379,"42":2.057121931153479,"43":-0.4434688241251419,"44":0.9889532946137664,"45":0.23798281495595558,"46":-0.9684926338399535,"47":0.8733183508385982,"48":-6.667385383866112,"49":-3.8334752414277617,"50":3.934254546791752,"51":-8.152738368764181,"52":-2.7318844958276363,"53":-2.8406533271443264,"54":-1.4020237375551827,"55":-0.757356047089217,"56":-6.347658631450106,"57":-0.17511341233880773,"58":2.6175970157221746,"59":1.0766611474621761,"60":-3.983136558824584,"61":11.625065989541508,"62":0.6572702829528657,"63":-3.1617772359339646,"64":7.355541433817464,"65":0.3482634355592147,"66":0.3778725116832111,"67":-2.362041571537032,"68":5.753679445726626,"69":-1.7716448946285226,"70":4.001491238751097,"71":0.993288377206187,"72":2.6178537378317084,"73":-0.7287533286543028,"74":2.737895303006625,"75":2.663433332653454,"76":2.5519427269753683,"77":2.0092514545909914,"78":1.9668139469107373,"79":-5.768903133175919,"80":2.7024410469845517,"81":-4.688902405468023,"82":-0.2181059126040068,"83":9.495662314114913,"84":-1.406642029183317,"85":-3.1467365129430713,"86":-3.4268407284052183,"87":-7.77356970895496,"88":-5.9230227852688895,"89":0.841687798207114,"90":-0.685086379018929,"91":5.540404504470836,"92":5.362340360601585,"93":3.58930795067499,"94":0.707068597774121,"95":1.2007353212926797,"96":-2.047099955048824,"97":-10.992202848002007,"98":-3.2375831526919936,"99":0.6598490413496284}},"W2":{"n":4,"d":100,"w":{"0":0.12871950664078313,"1":-1.4844967974400847,"2":0.5789316035338521,"3":-0.2449599810503086,"4":0.14153874021560003,"5":-0.07888383165599708,"6":0.6188499920795631,"7":-0.8599960978010731,"8":0.21390779683073358,"9":-0.6130093345504083,"10":0.4029202734434017,"11":-0.6123390597889325,"12":0.8830225251716612,"13":1.4996260711735485,"14":1.0167288958120368,"15":-0.6651483353136051,"16":-1.1066524090588068,"17":0.05643265405390541,"18":-0.26053104213495054,"19":-2.6781611336686315,"20":1.409278754829415,"21":1.098221553419297,"22":-0.2231649951585809,"23":-0.113377547345678,"24":1.5729086007407491,"25":0.33135425053015044,"26":0.34948800826977944,"27":0.5151107062607616,"28":0.22725552273759952,"29":0.5981644631949292,"30":0.6965209000083238,"31":0.37216932791506013,"32":-1.3146993148885582,"33":-0.24932599284625948,"34":1.6887055487415046,"35":-1.1346007502238726,"36":-1.3451968151795872,"37":-1.2167641138239569,"38":1.141608749136672,"39":1.3101884491754814,"40":0.19394989774570795,"41":-0.3953995445250955,"42":0.2825801343932127,"43":1.8764921255716538,"44":-1.4338815797830429,"45":-0.9164108484606243,"46":1.5888769667010019,"47":-0.13207946759478612,"48":-1.504993907462999,"49":0.3086614712688007,"50":1.2161675485745234,"51":-1.624058862916979,"52":-2.550109765721939,"53":0.8122523212398507,"54":0.20186752132432542,"55":0.3963528714804274,"56":-1.019769180478784,"57":1.2454267600759183,"58":-0.6886525719675418,"59":0.399951009538904,"60":0.9247948196600103,"61":-0.002638393189286663,"62":0.5929364078888221,"63":0.1589396409064137,"64":-0.0920961510866861,"65":-1.5117306788758782,"66":-0.14690026054745653,"67":0.18723463190791748,"68":-0.09005424162335787,"69":-0.29051229970408393,"70":-0.008643756113043721,"71":-0.6454476493589356,"72":-0.3139080835441711,"73":1.1628619735881,"74":-1.6848072553746503,"75":0.16119271330874585,"76":0.5174580789483599,"77":0.5943372754841074,"78":0.9144145126666404,"79":0.2759885230735373,"80":0.540407100486863,"81":0.7610757011560803,"82":0.8704043506571435,"83":0.014790077336885582,"84":-1.9447676181786318,"85":0.7045231728874862,"86":0.0070693466124058975,"87":-1.2732542756813876,"88":2.372851102935966,"89":0.9300346272296899,"90":0.023385649319100466,"91":0.07291690458579149,"92":0.8766623335014574,"93":0.10244670295870881,"94":-0.3893069374821957,"95":-2.386905917200533,"96":1.6002032190021949,"97":-1.508411745632896,"98":-0.5214177845961318,"99":0.735069197964783,"100":0.005282341737612398,"101":-0.2681728797729169,"102":-0.24453688570485901,"103":-0.09955941022829053,"104":0.3381904428363319,"105":1.0123851971165,"106":1.0278199791421785,"107":-0.021737601660898512,"108":1.888827217966893,"109":1.7583806778586026,"110":0.07303996108862504,"111":-0.14144580036213253,"112":0.14115721097914347,"113":-0.2509244831432443,"114":0.9322345418375884,"115":0.7744710280770549,"116":-0.8644509826945257,"117":-0.2553125829765028,"118":-0.6391094695651436,"119":-0.6714735761704009,"120":0.6340430662924151,"121":0.4653073904947902,"122":0.21531454626664043,"123":0.3028708660357056,"124":-0.04703854307710496,"125":0.05026598260760067,"126":0.22377788743079408,"127":0.4339436506100186,"128":0.2865130494131403,"129":0.2854123866289223,"130":-0.11241494350487136,"131":0.01837149296123916,"132":-0.014247188272956677,"133":0.09794483133738821,"134":0.7130168947529146,"135":-0.08865503267863781,"136":-0.24505222847381372,"137":-0.22420919864446723,"138":-0.32866902313490315,"139":1.1500969728279824,"140":0.4306958474622119,"141":-7.984043696475472,"142":-0.4423317038960151,"143":0.09052409635300064,"144":0.3016818158460399,"145":-0.09018587281153764,"146":-0.3076815728630639,"147":-0.5142568845372649,"148":0.6731346604311189,"149":0.7505060033649396,"150":-0.29537833145703196,"151":-0.43051230208883023,"152":0.05903550221815493,"153":0.9799065341000904,"154":0.05904463450538698,"155":-0.9833045700533835,"156":-0.7358259001077354,"157":-0.5392502827243425,"158":-4.306263504427861,"159":-0.2100221122613092,"160":-1.42105986705905,"161":3.3678013948501024,"162":0.30247278244546844,"163":0.06141027735595105,"164":-0.09753603560954723,"165":0.12664596312911497,"166":-0.19103958441863922,"167":0.3356507526701849,"168":-0.37989526747511787,"169":0.11100532829255357,"170":0.13733827222042297,"171":-0.6649427945284775,"172":0.549638791682814,"173":0.19159101087240674,"174":0.7487852560531414,"175":-0.14787843369791237,"176":0.39103486631216455,"177":2.2118295652149857,"178":-0.07424371175914067,"179":-6.847744260576796,"180":-0.36779763967776186,"181":-0.178067022847353,"182":-0.5090187501224801,"183":0.6042215057068344,"184":0.05850166097373623,"185":-0.13487010555589238,"186":0.04381932212669806,"187":-0.33594349127967876,"188":0.28734434593560104,"189":-1.3271528609910181,"190":-0.33283818429552814,"191":0.5073475972055503,"192":0.15223321057149436,"193":0.13955997699533407,"194":0.2650988996923404,"195":-1.9145184348760256,"196":-0.37579077051183046,"197":-0.0735473357530106,"198":-0.43645529657194915,"199":0.9204427198073173,"200":-0.6003796327068962,"201":-0.5681567469200764,"202":0.42732380425756117,"203":-0.5413727314924639,"204":0.9622103912121603,"205":0.688333992394678,"206":0.5516052592254139,"207":-0.32982530321770587,"208":9.055905504986574,"209":0.5198772152068608,"210":1.3485146177246439,"211":-0.5039663717558291,"212":0.7036026669701383,"213":0.6899571684347674,"214":0.48965453039081747,"215":-1.2255921244886274,"216":-0.562308782983866,"217":-0.2296629601980858,"218":0.65692191721051,"219":-0.4175257181242568,"220":0.9152031020773873,"221":0.9186663490797318,"222":-0.6817597839920183,"223":-0.5773492173695285,"224":0.3798804883429978,"225":1.2458648072884229,"226":-0.289964893825871,"227":0.2906334478873367,"228":0.37246935861044994,"229":-0.4498629188046035,"230":-0.5891492092602262,"231":0.6677949733306368,"232":0.15796450570240608,"233":-0.38147887709309675,"234":0.27461860143523653,"235":-0.1922848576199536,"236":-0.3514920457451136,"237":-0.3437289493174012,"238":1.1907205898225606,"239":7.679425214477825,"240":-0.7293469713882973,"241":-0.47031350675705774,"242":1.8111981852392267,"243":0.7112430895411865,"244":-0.23097391538151252,"245":-0.4466676078710242,"246":0.16903453997457243,"247":-0.4052260983411663,"248":-0.27259226632878814,"249":0.3265409159633483,"250":0.2842412190740456,"251":-0.5381897611459351,"252":0.5157272637075802,"253":1.4876929425571885,"254":0.33173674673758086,"255":-0.2680305399657074,"256":-0.27403046689388866,"257":0.08366719694234305,"258":2.6449910187398684,"259":-1.0002475394701276,"260":-0.6823928474054275,"261":0.2315755514142291,"262":-0.6900535060155607,"263":-0.49411157569437036,"264":1.000416659831835,"265":0.32358477297925775,"266":-0.583379231505239,"267":-0.2929981652253986,"268":-0.9806511577134426,"269":0.3662414124211648,"270":-0.6841078318200241,"271":-0.584062913774471,"272":-0.17667414843838702,"273":-0.22008511900610916,"274":-1.4795440707005587,"275":0.5706687751237807,"276":0.40531400975217474,"277":2.277736466559928,"278":-0.8089875221112699,"279":-7.574095899965693,"280":-0.8469241080632173,"281":0.45460179349658575,"282":-0.8786838603469596,"283":0.17634630324579076,"284":0.3837588314256955,"285":-0.4429160774995708,"286":0.37295561434005986,"287":-0.37347281008575023,"288":0.8132354865155117,"289":-0.16042420022310522,"290":-0.5084490975085358,"291":0.5594206603624207,"292":-1.4078238064532818,"293":-0.4628067636696943,"294":0.21628534927859083,"295":0.05242782953026819,"296":-0.40001880622193,"297":-2.3734560839982386,"298":-0.4883270060913371,"299":-1.2200823095879627,"300":-0.3279907454892192,"301":-0.45604176687121456,"302":0.4325608717233908,"303":-0.07946661868732109,"304":-0.017927871112221133,"305":0.38472374305999724,"306":-0.30462330758481393,"307":0.4402929983944079,"308":4.893293206243045,"309":0.2870084445917142,"310":0.6319414265802337,"311":-0.03798641229603612,"312":0.17358503767666722,"313":0.24140119130201393,"314":-0.269977149098159,"315":0.2878475067967955,"316":0.04428718366994649,"317":-1.765956061132352,"318":-0.4386362317455544,"319":-0.05994223414289164,"320":-1.3365931394678385,"321":0.03364813878659899,"322":-0.299240585614072,"323":0.13953554785550282,"324":-0.028961728223170197,"325":0.13206330343706946,"326":0.03222301356917543,"327":-0.44584279522214004,"328":-1.5115735859568649,"329":0.062377690104834765,"330":-0.23129835918597907,"331":-0.36555040290422486,"332":-0.06423372626540279,"333":-2.453817759063053,"334":0.030673977287357494,"335":-4.415914510981239,"336":-0.17822410532865077,"337":0.16711724315957463,"338":0.6598912206933258,"339":-0.20647764691633136,"340":0.10055673872876249,"341":-0.1620164318820976,"342":-3.096606313861426,"343":-0.9856935783138622,"344":-0.03637959044899858,"345":0.2498306386051226,"346":0.23517816152723567,"347":0.011794345884600483,"348":-0.18990156756106147,"349":0.1394966776330358,"350":0.08786863631557465,"351":-0.33747108667212605,"352":0.5849318361547139,"353":-0.8189329991438493,"354":1.8683268639662327,"355":-0.07017068956127406,"356":-0.16072350153255816,"357":-0.40860503046641966,"358":3.730197192711479,"359":0.04951686164313678,"360":-0.09423364008928432,"361":0.06070304179269779,"362":0.2859296967002649,"363":-0.15748990326380463,"364":1.9341003342619785,"365":-0.15746093031615194,"366":0.27268994022816245,"367":0.1423160988235841,"368":-0.3549044547437002,"369":-0.3049144792005706,"370":0.07396943028460021,"371":-0.22068572476563209,"372":0.12692730022261542,"373":-0.16225421375240548,"374":-0.7939603503172886,"375":-0.14045264634257734,"376":0.09281858586514789,"377":1.6823950474865708,"378":0.060317371149093746,"379":-4.557717616912686,"380":0.04524352573666357,"381":0.12924611211165005,"382":-0.2808285708384106,"383":2.764239731197285,"384":0.3443509213774184,"385":0.008542346936572855,"386":-0.3887357203804043,"387":-0.4398791054709238,"388":0.2359427144009627,"389":0.0638595501705061,"390":-0.28894097459611895,"391":0.2864637962661823,"392":-0.0974619088085658,"393":-0.20814934178702654,"394":0.4926052182398759,"395":-0.2051047552109187,"396":0.19317313978482462,"397":0.08847430212671556,"398":0.11554081779283511,"399":-0.32243770676192607}},"b2":{"n":4,"d":1,"w":{"0":0.958937659059747,"1":3.7960602724483747,"2":-3.399670616823363,"3":1.4004244050814165}}}}
/* harmony export (immutable) */ __webpack_exports__["a"] = data;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Data model that holds what the agent gets to see about the environment
 */
class AgentObservation {
    /**
     *
    // * @param {Array} visibles
     * @param {Array} tileTypes
     * @param {int} score
     * @param {Array} position
     */
    constructor(/*visibles,*/ tileTypes, score, position) {
        /**
         * @type {Array}
         */
        this.tileTypes = tileTypes;
        // this.visibles = visibles;
        /**
         * @type {Number}
         */
        this.score = score;
        this.position = position;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AgentObservation;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Data model that holds the environment's full internal state
 */
class State {
    /**
     * @param {Array} tileTypes
     * @param {Array} position [x,y]
     * @param {Number} score
     * @param {Boolean} isComplete
     */
    constructor(tileTypes, position, score, isComplete) {
        /**
         * @type {Array}
         */
        this.tileTypes = tileTypes;
        /**
         * @type {Array} position [x,y]
         */
        this.position = position;
        /**
         * @type {Number}
         */
        this.score = score;
        /**
         * @type {Boolean}
         */
        this.isComplete = isComplete;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = State;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__State__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(0);



/**
 * Returns a random initial starting state
 *
 * @returns {State}
 */
const generateInitialState = () => {
    return new __WEBPACK_IMPORTED_MODULE_0__State__["a" /* default */](
        generateRandomTileTypes(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* config */].size),
        [Math.floor(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* config */].size[0] / 2), 0],
        0,
        false
    );
};
/* harmony export (immutable) */ __webpack_exports__["a"] = generateInitialState;


/**
 * Generates a random set of tileTypes for generated random environment states
 *
 * @param {Array} size
 * @returns {Array}
 */
function generateRandomTileTypes(size) {
    const tileTypes = [];
    const min = 1;
    const max = 9;
    for (let xi = 0; xi < size[0]; xi++) {
        tileTypes[xi] = [];
        for (let yi = 0; yi < size[1]; yi++) {
            let randomValue = Math.floor(Math.random() * (max - min + 1)) + min;

            let tileType;

            if (randomValue < 7) {
                tileType = 0;
            } else {
                tileType = 1;
            }

            tileTypes[xi][yi] = tileType;
        }
    }
    return tileTypes;
}


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderer_HtmlTableRenderer__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agent_ColumnCompare__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agent_LookAheadWide__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agent_LookAheadWideAndDeep__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agent_AlwaysDown__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agent_RL_DQN_5X5Viewport_In_Learning_Mode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agent_BarelyLookAhead__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__agent_RL_DQN_5X5Viewport_PreTrained__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__agent_RL_DQN_InLearningMode__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__GameRunner__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__style_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__style_css__);












// import ReinforcementLearnerDeepQNetworkPreTrained from './agent/ReinforcementLearnerDeepQNetworkPreTrained'


document.body.innerHTML =
    '<div id="info">Agent: <select id="agentSelector"></select>' +
    '<br>Speed Interval: <select id="interval">' +
    '<option value="no-render">0ms with no rendering</option>' +
    '<option value="0">0ms</option>' +
    '<option value="100">100ms</option>' +
    '<option value="200">200ms</option>' +
    '<option value="250" selected>250ms</option>' +
    '<option value="500">500ms</option>' +
    '<option value="1000">1000ms</option>' +
    '<option value="paused">Paused</option>' +
    '</select>' +
    '<pre id="score"></pre>' +
    '</div>' +
    '<div id="rendererContainer"></div>' +
    '<div id="agentRendererContainer"></div>' +
    '<pre>' +
    '\nGame Rules:' +
    // '\n- Gain ' + environmentConfig.pointsForCompletion + ' points for making it to the bottom row' +
    '\n- Gain ' + __WEBPACK_IMPORTED_MODULE_9__environment__["a" /* config */].verticalDeltaScore + ' points for every row lower you go' +
    '\n- Loose ' + __WEBPACK_IMPORTED_MODULE_9__environment__["a" /* config */].verticalDeltaScore + ' points for every row higher you go' +
    '\n- Loose ' + -__WEBPACK_IMPORTED_MODULE_9__environment__["a" /* config */].tileValueMap[1] + ' points when moving into a red square' +
    '\n- Loose ' + -__WEBPACK_IMPORTED_MODULE_9__environment__["a" /* config */].tileValueMap[0] + ' points when moving into a grey square' +
    '</pre>';
const scoreElement = document.getElementById('score');

let enableRendering = true;
let autoPlay = true;
let speed = 250;
let intervalReference = null;
let agent;
let currentAgentName;
let renderer = new __WEBPACK_IMPORTED_MODULE_0__renderer_HtmlTableRenderer__["a" /* default */](document.getElementById('rendererContainer'));

let gameRunner = new __WEBPACK_IMPORTED_MODULE_10__GameRunner__["a" /* default */](renderer, handleGameRunnerStatusChange);

let agents = {
    'RL_DQN_5X5Viewport_PreTrained - ranked 192': __WEBPACK_IMPORTED_MODULE_7__agent_RL_DQN_5X5Viewport_PreTrained__["a" /* default */],
    'RL_DQN_5X5Viewport_In_Learning_Mode': __WEBPACK_IMPORTED_MODULE_5__agent_RL_DQN_5X5Viewport_In_Learning_Mode__["a" /* default */],
    'RL_DQN_InLearningMode': __WEBPACK_IMPORTED_MODULE_8__agent_RL_DQN_InLearningMode__["a" /* default */],
    'LookAheadWideAndDeep - ranked 234': __WEBPACK_IMPORTED_MODULE_3__agent_LookAheadWideAndDeep__["a" /* default */],
    'LookAheadWide - ranked 230': __WEBPACK_IMPORTED_MODULE_2__agent_LookAheadWide__["a" /* default */],
    'ColumnCompare - ranked 208': __WEBPACK_IMPORTED_MODULE_1__agent_ColumnCompare__["a" /* default */],
    'BarelyLookAhead - ranked 192': __WEBPACK_IMPORTED_MODULE_6__agent_BarelyLookAhead__["a" /* default */],
    'AlwaysDown - ranked 80': __WEBPACK_IMPORTED_MODULE_4__agent_AlwaysDown__["a" /* default */],
};
for (agent in agents) {
    //Select the first agent in the list
    currentAgentName = agent;
    break;
}

function handleGameRunnerStatusChange(stats) {
    scoreElement.innerHTML =
        'Agent: ' + currentAgentName +
        '\nCurrent Score: ' + stats.currentScore +
        '\nLast Game Final Score: ' + stats.lastGameScore +
        '\nAvg Final Score: ' + (Math.round(stats.scoreSum / stats.gameCount) || 0) +
        '\nGame Count: ' + stats.gameCount;
}

let agentSelectorElement = document.getElementById('agentSelector');
for (agent in agents) {
    const optionElement = document.createElement('option');
    optionElement.text = agent;
    optionElement.value = agent;
    agentSelectorElement.appendChild(optionElement)
}
agentSelectorElement.addEventListener('change', (event) => {
    currentAgentName = agentSelectorElement.value;
    document.getElementById('agentRendererContainer').innerHTML = '';
    gameRunner.clearStats();
    newGame()
});

document.getElementById('interval').addEventListener('change', (event) => {
    const value = event.target.value;
    let newEnableRenderingValue = true;
    autoPlay = true;
    if (value === 'no-render') {
        newEnableRenderingValue = false;
        speed = 0;
        renderer.clear();
    } else if (value === 'paused') {
        autoPlay = false;
    } else {
        speed = value;
    }
    if (newEnableRenderingValue != enableRendering) {
        enableRendering = newEnableRenderingValue;
        newGame();
    }
    setupInterval();
});

function setupInterval() {
    clearInterval(intervalReference);
    if (autoPlay) {
        if (enableRendering) {
            intervalReference = setInterval(gameRunner.tick, speed);
        } else {
            //Normal ticking takes 3ms between ticks which is not fast enough, so tick 100 times
            intervalReference = setInterval(function () {
                for (let i = 0; i < 100; i++) {
                    gameRunner.tick();
                }
            }, 0);
        }
    }
}

document.body.addEventListener('keydown', function (event) {
    gameRunner.takeAction(event.key);
    // if (enableRendering) {
    //     const agentObservation = environment.getAgentObservation();
    //     renderer.render(agentObservation, environment.getGodObservation());
    // }
});

function newGame() {
    gameRunner.newGame(agents[currentAgentName], enableRendering);
}

newGame();
setupInterval();


/***/ })
/******/ ]);