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
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AgentObservation__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__generateInitialState__ = __webpack_require__(33);



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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rl__ = __webpack_require__(28);


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
        `<div id="DQNRender">
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
/* 3 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20).Buffer))

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
	fixUrls = __webpack_require__(25);

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
var content = __webpack_require__(23);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(3);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(3);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(3);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(3);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_viewportConversions__ = __webpack_require__(6);



const actions = ['w', 'a', 's', 'd'];

const numberOfStates = 5 * 5 + 1;

let rlDqn = new __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__["a" /* default */](true, numberOfStates);

class RL_DQN_5X5TrimmedViewport_InLearningMode {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = RL_DQN_5X5TrimmedViewport_InLearningMode;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__neural_network_saves_view_port_5_5_0_1_games_10000__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_RlDqn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_viewportConversions__ = __webpack_require__(6);





const actions = ['w', 'a', 's', 'd'];

// const numberOfStates = environmentConfig.viewPortSize[0] * environmentConfig.viewPortSize[1];
const numberOfStates = 5 * 5 + 1;

let rlDqn = new __WEBPACK_IMPORTED_MODULE_3__helper_RlDqn__["a" /* default */](true, numberOfStates, __WEBPACK_IMPORTED_MODULE_2__neural_network_saves_view_port_5_5_0_1_games_10000__["a" /* data */]);

class RL_DQN_5X5TrimmedViewport_PreTrained {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = RL_DQN_5X5TrimmedViewport_PreTrained;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__ = __webpack_require__(2);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__neural_network_saves_view_port_9_9_0_2_best__ = __webpack_require__(30);




const actions = ['w', 'a', 's', 'd'];

const numberOfStates = __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize[0] * __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize[1] + 1;

let rlDqn = new __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__["a" /* default */](true, numberOfStates, __WEBPACK_IMPORTED_MODULE_3__neural_network_saves_view_port_9_9_0_2_best__["a" /* data */]);

class RL_DQN_PreTrained {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = RL_DQN_PreTrained;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css__ = __webpack_require__(26);
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(19)
var ieee754 = __webpack_require__(24)
var isArray = __webpack_require__(21)

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "#info {\n    margin-right: 2em;\n    /*float: left*/\n}\n\n.InfectionGameHtmlTableRender {\n    /*float: left;*/\n    overflow: auto;\n}\n\n.InfectionGameHtmlTableRender table {\n    padding-right: 2em;\n    border-spacing: 0;\n    border-collapse:collapse;\n}\n\n.InfectionGameHtmlTableRender table td {\n    border: 0; /*For iphones*/\n}\n\n.InfectionGameHtmlTableRender > div {\n    float: left;\n    border-spacing: 0;\n    margin-right: 2em;\n}\n\n/*.InfectionGameHtmlTableRender table.renderer-table-canvas-agent {*/\n    /*padding: 10px;*/\n    /*background-color: black;*/\n/*}*/\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-god td {\n    height: 5px;\n    width: 5px;\n}\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-agent td {\n    height: 22px;\n    width: 22px;\n}\n\n#agentRendererContainer {\n    margin-top: 1em;\n}", ""]);

// exports


/***/ }),
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const data =
{"nh":100,"ns":26,"na":4,"net":{"W1":{"n":100,"d":26,"w":{"0":-2.4414722931691513,"1":1.8460361757904233,"2":2.514241002435676,"3":0.7923637600674817,"4":-1.7697941809644957,"5":-3.7717574513041843,"6":-1.1878929003913699,"7":-2.321408692257701,"8":3.2957688821029962,"9":0.8905160280515853,"10":-0.6201747639006566,"11":0.04001279487502466,"12":1.9861232903138284,"13":6.080281765463795,"14":0.6530598367612849,"15":1.2185733694733847,"16":2.5714405650392256,"17":-0.13115526750408185,"18":2.909277812197576,"19":1.9643345160173984,"20":0.5666493677953074,"21":0.984780336003616,"22":-3.340841679093962,"23":-1.224509578775548,"24":-1.520014389876947,"25":2.203664303031456,"26":-0.20877987888866148,"27":0.06083425838160159,"28":-0.7358218250111687,"29":1.6307583935802699,"30":0.41007478704085437,"31":0.08701269122203278,"32":2.1921616674963773,"33":-0.40068336471263405,"34":0.2620791573702439,"35":-3.0490590119519343,"36":1.6944829001208335,"37":2.405542503094418,"38":-6.544749744812885,"39":-2.2335157957912206,"40":0.8682109863749912,"41":-0.03347619738050305,"42":6.2695060437490016,"43":3.12088595608357,"44":2.040315362182967,"45":1.3519237357611122,"46":-0.7060633716648459,"47":1.8470576154151697,"48":0.6693652845441682,"49":0.2721552709724237,"50":2.4422848792326537,"51":0.152889894793167,"52":-0.7016803714087909,"53":0.4897805060587934,"54":2.442099918136107,"55":5.338618308481412,"56":-3.02431743064583,"57":-0.6649477419454294,"58":2.0466633530636704,"59":-0.6294171739773768,"60":3.378233140377425,"61":-0.2589688724449277,"62":0.0392785356446366,"63":-2.390271739842619,"64":-3.5517490478362705,"65":-3.225171030922226,"66":-2.0044185772471006,"67":-0.8726196656619629,"68":-3.903683591180494,"69":-0.724514010333049,"70":1.0245358179794526,"71":-2.915508500475005,"72":2.2718790430680142,"73":-1.2426997903009485,"74":-0.5388856716888129,"75":1.313173743753369,"76":0.5242413549526934,"77":-0.06165013126096113,"78":-0.8806429481507093,"79":1.847383408972109,"80":0.8906835026725043,"81":-2.493560739769525,"82":-2.6818725288291496,"83":2.5422807695435887,"84":-1.1927903486526141,"85":-2.597482000447508,"86":-6.320003373069259,"87":-1.904704726280851,"88":0.7822445311534818,"89":-4.184874524254549,"90":-0.35225359282969576,"91":2.955463742517854,"92":3.4122285522513094,"93":3.0511932653895744,"94":-1.0942241983116023,"95":4.9725091036572575,"96":3.2998281880681133,"97":2.26422991143869,"98":4.176114696942353,"99":0.4997799827395601,"100":-2.529550896735318,"101":-0.6888912648059989,"102":1.517489641909242,"103":-0.5427801737055208,"104":-0.8654336712934191,"105":0.24226299862362963,"106":-0.37635414988517135,"107":0.6305995376133248,"108":-1.3083671185186814,"109":0.33901396357581515,"110":0.004172063669840205,"111":6.9854737743847926,"112":-3.268368522697201,"113":-3.3643941665674286,"114":0.8573194729851791,"115":-1.1337948046967394,"116":-0.5916077632227335,"117":9.188212792787493,"118":-0.18395486962705898,"119":0.6603303554985277,"120":2.4037956372715175,"121":0.3183540921239374,"122":-2.186719743515744,"123":-1.4180778696678094,"124":-1.0548396788747763,"125":0.38466170590128346,"126":0.028455542419864765,"127":0.3457154634569579,"128":0.029011843981572794,"129":0.6684880833572744,"130":-1.9420003077977206,"131":0.40156850433663555,"132":1.0209994454513815,"133":1.0864479390167905,"134":0.9975975308474813,"135":2.6143997784188215,"136":-1.701201116393482,"137":-1.2043965684198883,"138":4.329675827949447,"139":2.4081165800943984,"140":-0.13593880032254224,"141":-0.09617888851314293,"142":0.40386564566391076,"143":2.722043302378791,"144":1.826967621546299,"145":1.574406229396373,"146":0.03939600019931026,"147":3.706928333243833,"148":2.4705905392128678,"149":0.10232490796267805,"150":3.4962905029156928,"151":-2.7889676683109585,"152":-0.849552715604075,"153":0.8728162519632832,"154":1.3360418648181862,"155":-0.43581635552370646,"156":-0.07140382045661205,"157":-0.18661474825566207,"158":3.644721079927231,"159":-1.9782254638454866,"160":-0.7233429038838521,"161":1.487573324688443,"162":-1.4152539693798416,"163":-2.06460355792337,"164":-5.58636368944102,"165":0.5313117433301254,"166":4.30578116792683,"167":-0.0975061825323269,"168":1.9674839589561604,"169":-0.8346884871301562,"170":-2.826078142300141,"171":-1.1998539282594751,"172":0.2178891653216785,"173":-1.9260854266065717,"174":-3.04642623837161,"175":0.23634574022838098,"176":0.39405062902731974,"177":0.8199437587360083,"178":-1.312897355357991,"179":-0.050724709368522546,"180":1.5510284136663397,"181":3.256662384320362,"182":0.6696058497873112,"183":-0.012120685278307218,"184":0.6366077643076613,"185":2.1461457342044823,"186":1.3781342353721606,"187":-1.6625722393363118,"188":-2.1538914392721087,"189":3.11331215264942,"190":3.7697694514277478,"191":1.7946143336239966,"192":-0.13394054688571008,"193":-2.26710922223756,"194":2.798415157496441,"195":1.0161267990982548,"196":2.6353206072789677,"197":1.5480969611395454,"198":-6.071371945698394,"199":2.0060222899375937,"200":1.3508746615288125,"201":0.02061474381504277,"202":-1.2916902587401438,"203":1.2015719723426923,"204":2.176189266293213,"205":-0.13625930921786328,"206":-2.712135098551645,"207":0.2592092509152128,"208":1.3478438546636216,"209":1.4302900760965673,"210":2.551137947203141,"211":2.715395941054412,"212":3.415058813549664,"213":3.0228934956037596,"214":3.952984203441756,"215":3.609713132106559,"216":3.621189182964769,"217":2.5258708157497045,"218":0.17539547087428592,"219":-5.2382913521762715,"220":2.4660258529502705,"221":3.3169959588097595,"222":3.585192549392206,"223":-0.561009984700942,"224":3.112698991695763,"225":4.953482847025491,"226":4.131603116813726,"227":1.9469446148821759,"228":-1.7207255895413491,"229":0.5685571442450724,"230":3.529248090389411,"231":3.9917079574300223,"232":6.104415119862382,"233":-0.6417766645916619,"234":1.0362512431196194,"235":-4.075646332786012,"236":-5.794777996821279,"237":-2.4516741362507717,"238":-1.3801872812187446,"239":-0.8618926843769277,"240":-2.635103550341968,"241":6.021497938236601,"242":8.383207097233967,"243":3.3537099939835975,"244":-0.40260529425813407,"245":-0.7460354647495993,"246":-3.1347099893224573,"247":-5.1252348547396975,"248":-0.005642022945071946,"249":-0.06561686233411772,"250":-0.8124782816264234,"251":-1.5323990783389971,"252":-0.664844749857404,"253":-1.559480163663233,"254":-0.5157861772890755,"255":-0.947107254057141,"256":-0.32969698009755244,"257":-0.13389360645232737,"258":-1.0916453685388285,"259":0.38958601694230605,"260":0.2768521263650484,"261":-0.590031082980059,"262":-1.2195942019965238,"263":6.100605068228311,"264":-0.07635451600720566,"265":3.2572590687447285,"266":0.9898767891596097,"267":-0.6546084913091043,"268":0.24190978027641888,"269":-1.2555244801800916,"270":0.9843365651096129,"271":1.7588683859902972,"272":1.2007085869129455,"273":1.2905053563828242,"274":3.656525759646613,"275":1.6001066408269968,"276":3.32189779019082,"277":1.6432645284495426,"278":1.290339367019808,"279":-5.658273856986738,"280":-0.10254548149660492,"281":-0.7656443414843431,"282":2.0699292531862477,"283":3.369522439345885,"284":-3.97668404665268,"285":1.6247487909638434,"286":1.3384369357517885,"287":0.5378152707925452,"288":3.7906573005172204,"289":-2.7177020426669474,"290":0.16830954893450256,"291":0.21369665613326494,"292":-2.8859210577422045,"293":-2.8987766729057935,"294":-4.382418574721101,"295":-1.259410177277955,"296":1.8009316102457993,"297":2.112314213888771,"298":1.3303052008272056,"299":-1.8027764069944636,"300":6.686746069251767,"301":-1.0341597210312066,"302":0.3382751728768367,"303":3.539429751851719,"304":0.5984681915724208,"305":0.979938380688181,"306":0.4030588499744294,"307":-2.667891061835092,"308":2.431778568508016,"309":-0.026039102119901358,"310":1.8758144488603854,"311":-0.729444944247028,"312":1.0028651146749707,"313":2.595320456333738,"314":0.6469707339161692,"315":0.6875963575627194,"316":-1.5192242577345156,"317":-1.3665212254937609,"318":-1.649773343851086,"319":-3.9754489763217813,"320":-5.35741844869512,"321":4.72480613173964,"322":-4.017913106109671,"323":0.0729592695433514,"324":0.14096409624087441,"325":-3.4557619939080437,"326":-1.061870817260486,"327":2.8286708004588985,"328":0.04937172655755461,"329":0.7193505574021671,"330":-0.058646524310200114,"331":1.5952138936338707,"332":3.618315447347544,"333":-0.30915547946851935,"334":1.5550574505088042,"335":-0.3989311006927292,"336":-0.6519296601408501,"337":0.7344660302287093,"338":-1.9984380910094648,"339":0.9766272587889723,"340":-4.3765623379948,"341":1.7332956071303662,"342":-0.32634055195451467,"343":0.9526233171610464,"344":0.2937129348611235,"345":5.200851340444846,"346":0.6874272315999809,"347":-2.44628972569508,"348":-0.7513536236103159,"349":-0.267692640165146,"350":0.649723641272475,"351":-2.6280218269969566,"352":4.75188143314872,"353":1.1601942735085626,"354":-1.7145101630738429,"355":-1.3388654894332674,"356":-1.6173801926194635,"357":-1.0500316137794867,"358":-0.1390251081418117,"359":-0.7427993861478658,"360":-0.24883987386628906,"361":-2.1744110119386058,"362":-1.3800979018165813,"363":-1.85329658062619,"364":-0.6610096352284839,"365":-0.32933791434105436,"366":-0.11197763816061342,"367":-3.7569066430652684,"368":-3.8802952723941297,"369":-1.2507634979835884,"370":0.5254959369604972,"371":3.8764863711877204,"372":5.0194083009316195,"373":2.55699038904002,"374":-3.125599117285534,"375":-5.11150173023499,"376":-6.839292316580409,"377":-1.787650310992297,"378":-0.6015561636836115,"379":-1.0754333809812313,"380":0.4951851269318048,"381":-3.973499497433243,"382":-2.686773596095241,"383":1.6955882788661067,"384":-0.20235547111836943,"385":2.2091611649350855,"386":-0.043161278214004575,"387":1.8940706710202304,"388":-2.9261204867834096,"389":-0.39835449485291824,"390":-6.406892313212976,"391":-0.12232013928791534,"392":-1.2436630225061953,"393":-2.266535199189236,"394":0.4961385296428596,"395":-2.660786920340411,"396":1.9748407210648498,"397":-2.4228302460786613,"398":-0.7000577471558148,"399":4.7735483429787795,"400":1.9999026508031188,"401":-4.115543677369344,"402":-0.7268356651598102,"403":-0.4356827762540996,"404":-3.9330532781028515,"405":3.632408508463482,"406":1.4745840510230144,"407":0.6666776445833225,"408":-2.8890405120300735,"409":0.558630112654433,"410":1.119980210521641,"411":2.8125586220220677,"412":-0.7497457164320488,"413":-0.740009849987446,"414":1.2015579079668022,"415":-2.8459018348187985,"416":1.0519244985524194,"417":-0.6075066724240229,"418":0.23835009198133286,"419":2.2118336751413765,"420":2.0689226175859075,"421":0.0074770442139249285,"422":2.0112809104969425,"423":7.982701803088407,"424":4.289671182972002,"425":2.5738356054670586,"426":3.230974893262021,"427":2.9113315492580023,"428":-1.196189840638507,"429":-2.4021340202077512,"430":-2.003646740990149,"431":0.183771730705326,"432":-2.003821791732923,"433":1.273906678940683,"434":0.09378289331419687,"435":-0.3821105367602186,"436":0.8866622001821419,"437":0.5046810922013043,"438":-0.8635128131568528,"439":0.7489758737919316,"440":0.29996768077398756,"441":-0.0037971386018613514,"442":0.3457811126961694,"443":0.8467896778892856,"444":-0.7661779673474487,"445":-0.04574437727639884,"446":0.679839613800861,"447":-0.7150256752974368,"448":0.5760032840600312,"449":0.9418621879076033,"450":0.002113443386731308,"451":0.14142586751813355,"452":0.7120925056879367,"453":1.0624007776127555,"454":0.24025209698739816,"455":-0.7589163913965727,"456":0.10955975859034174,"457":0.16819487464939403,"458":0.6369471214674125,"459":6.435450768409401,"460":7.358156209784191,"461":-0.3880825368662084,"462":0.6722608301646008,"463":-0.18214381499127508,"464":3.578024153744692,"465":2.429291132849055,"466":-0.5064304035935572,"467":-0.1129342143116449,"468":-0.2759340719809289,"469":-0.2636015096072918,"470":-2.9812142065229787,"471":-1.1468527004986633,"472":-1.0771755557254095,"473":-1.0680781597087845,"474":3.4569823776334556,"475":8.112591054995352,"476":1.3750818105614473,"477":0.6153753275641044,"478":-4.0386347921654995,"479":-2.332456713457759,"480":-7.656537645208055,"481":0.5202687958617033,"482":-0.7280029596079448,"483":1.2751874819538471,"484":0.5399767903985564,"485":1.4588053107858525,"486":0.4538035323847945,"487":-0.771991723983139,"488":0.6284831282136045,"489":0.49658353939461586,"490":0.5274447368236596,"491":-0.052277339739167775,"492":-0.4399350572444428,"493":-0.7314777447261307,"494":-1.2981220830909739,"495":-0.10097560670977843,"496":-1.8283987002675497,"497":-1.4825901599825433,"498":-1.4032609262943159,"499":-1.9023068645757968,"500":-2.974779761764979,"501":-0.4962762793049116,"502":1.3733230302016832,"503":1.0078651208730571,"504":3.782404704204886,"505":7.821930522886654,"506":8.242028652153497,"507":4.36853949672236,"508":-0.09777320629662212,"509":1.51903847871617,"510":1.9508447681922534,"511":0.5990108294091068,"512":0.2536050728733692,"513":-0.5094235734224968,"514":0.27960131895587786,"515":1.959428869785271,"516":-1.7202575929515052,"517":2.013923543657874,"518":-2.9527506946533646,"519":0.5591760571977784,"520":-0.6070970533472478,"521":-1.5036070288511107,"522":2.2743291239965466,"523":-0.6866758302070498,"524":-2.3131215886466894,"525":2.205614476826256,"526":-1.138395156500132,"527":1.2751936477358632,"528":3.551687158137198,"529":6.0829802759776355,"530":-0.8500962586826186,"531":0.9413763823135722,"532":1.519501200580075,"533":5.872708210930255,"534":3.8523680715288835,"535":0.7270711893563351,"536":2.5308306131206946,"537":1.6649900383756475,"538":-0.2302463579982504,"539":-0.18244379394904275,"540":-0.146205502354482,"541":3.9599896035916227,"542":-0.863140046002638,"543":-1.3876695715406107,"544":-0.11521176204902278,"545":0.37306048119406515,"546":0.39956734094986324,"547":1.6555327039209728,"548":-3.0034537773276146,"549":0.8104067009577429,"550":0.4079725249226458,"551":-0.38240561280552726,"552":1.2165593272983757,"553":1.1107729632787622,"554":0.737164222864668,"555":3.3431575025353766,"556":-1.8906185484922915,"557":-1.8165447136579038,"558":1.084061334736119,"559":-8.13610494767135,"560":-7.158745717071922,"561":1.875201929512601,"562":1.431099459400676,"563":1.9282615577919888,"564":-4.603710541465634,"565":0.6066758893572315,"566":2.6253159872347362,"567":-1.948662561779519,"568":-0.024896476782922294,"569":1.170738285071753,"570":0.7505250349376869,"571":-1.1047929590926933,"572":2.294021592442454,"573":-1.9330447799530823,"574":-0.7928492199465973,"575":-0.20454271184523765,"576":1.0864203660961584,"577":0.28047200534371547,"578":-0.6089976302169352,"579":7.881352260358575,"580":0.669798211429009,"581":2.208016040317073,"582":-0.9615190299908144,"583":-2.235724863413922,"584":0.0374825025679096,"585":-7.9371494858607825,"586":-1.602966496395171,"587":0.09634249660342127,"588":1.345193276630443,"589":2.347711833762815,"590":5.607168717540605,"591":2.2940832802050184,"592":-2.6308427069475915,"593":-2.885614644460591,"594":-0.07293427675958022,"595":1.6006651793534605,"596":1.807884769796729,"597":0.02186807776140381,"598":0.41382937917512924,"599":2.0192706374655933,"600":0.0937542487454208,"601":1.0632357022042023,"602":4.708203362231942,"603":0.8379190168307699,"604":-1.0188236418411816,"605":-4.0675574330323885,"606":-1.9137767136479162,"607":-2.522176546774542,"608":-2.162942525699245,"609":-0.050820745627211616,"610":3.9457808977584046,"611":2.508706286922154,"612":3.777425271084128,"613":-0.16975767660487626,"614":0.014263511270812528,"615":-1.1256001460170422,"616":1.571143558120975,"617":3.5691098843985563,"618":-1.8690773497998046,"619":2.4777930303883737,"620":2.3168507012012505,"621":-1.7011073419865765,"622":2.656363727477885,"623":-3.1377622378544867,"624":-0.5247243161458472,"625":0.6333009567921833,"626":-0.6793854777295781,"627":-3.34535114876321,"628":4.702640838676025,"629":1.5301568282433355,"630":-0.30820076683755004,"631":5.1508326191300675,"632":0.742291368203852,"633":4.112665882958749,"634":-5.602665740310854,"635":-3.1409958561766707,"636":-4.307650483986578,"637":-4.6552714072957375,"638":-2.465418085670083,"639":-1.246936757538002,"640":3.4286474414842893,"641":0.2774619201991259,"642":-1.7558229875504512,"643":-2.044097222623459,"644":-0.8427952459595545,"645":0.6584277326934725,"646":0.2977173190836448,"647":1.3804633307308738,"648":1.6723121525335976,"649":0.0023541741424288713,"650":0.8224240442220021,"651":-2.7981368399614466,"652":0.6895773155815741,"653":1.5960109081592384,"654":1.890766091658878,"655":1.7911810965932353,"656":1.3740137481506531,"657":3.040668903150539,"658":2.3854612139754274,"659":2.186571681704883,"660":2.615270251330116,"661":1.6652090338991612,"662":-1.489890723497212,"663":5.100909823630293,"664":2.635645860676067,"665":1.2082030212557295,"666":-6.199460594101933,"667":2.2310042241877954,"668":1.2465722670182888,"669":3.2466093940580367,"670":0.36001890119987934,"671":0.26832183451690106,"672":-0.8288197941618164,"673":-0.2162492370882727,"674":0.19205830595810594,"675":0.08980429113650971,"676":-0.5456773376309163,"677":-0.4140049716953141,"678":-3.4178818403546325,"679":0.7201075825243519,"680":0.8432908475686304,"681":0.002295891410941821,"682":1.3756310720241416,"683":1.9514024618229675,"684":1.463977262416332,"685":0.7002078429453948,"686":-2.7780178769478407,"687":-1.2777968035507898,"688":-3.6901302419931943,"689":4.718842135818032,"690":-1.2464440175795246,"691":0.5506660990850064,"692":-0.24239158518496973,"693":-2.4001455934388463,"694":-2.905486442440493,"695":1.8871995942634434,"696":0.3663275661320471,"697":-1.5661561550699425,"698":-1.280134832900492,"699":-1.3488235089807157,"700":4.098665027915036,"701":-0.09878553835899659,"702":-3.522903059056162,"703":-1.295261515373283,"704":-0.28209123647642004,"705":-0.21704048359522604,"706":2.659575128780271,"707":-3.101936737803112,"708":-0.25894820462756885,"709":0.009251192600460962,"710":-5.489667601297026,"711":-2.2492949304411067,"712":2.5758360591807183,"713":1.8618607813493153,"714":-3.3679421799033635,"715":2.779762259682177,"716":1.9242770921721943,"717":0.6136034240836274,"718":4.109434599660582,"719":2.090210857696716,"720":0.013920145010225525,"721":0.2151479301829043,"722":0.5714086715304955,"723":0.3925482912869933,"724":1.6352852333928996,"725":5.405305143989082,"726":2.094032991248032,"727":-0.21151188175621813,"728":0.6257437441799759,"729":-0.45248550866062626,"730":-0.9022184273527614,"731":-0.18479839811789114,"732":-1.5953234078999579,"733":0.9189885417630514,"734":-1.0593560809638591,"735":-0.04121498065525734,"736":0.7678249573631398,"737":-0.0885873944623028,"738":-0.3785025864959505,"739":0.020558921227644637,"740":0.8861053106322209,"741":-0.673537695749344,"742":-1.9285160675072248,"743":0.27853514655653083,"744":10.403009476040953,"745":0.5589762821877909,"746":7.812986899580968,"747":1.0017736000983204,"748":-1.1419084360748912,"749":-0.8837871003688562,"750":2.1381757499543435,"751":1.5998195743426764,"752":2.2398511181012495,"753":-0.1261666776992136,"754":0.07164265037286255,"755":-1.7052111461990032,"756":0.8901073195874117,"757":-1.9653675715166092,"758":-1.990627329687795,"759":1.961329435251816,"760":-3.439910097089598,"761":0.9647949524122895,"762":-4.955594894676906,"763":-4.882590542121363,"764":-2.140147438986754,"765":1.9020805799831981,"766":-4.592843461779284,"767":-3.7354740811620117,"768":6.0346044476671,"769":0.6265545980497991,"770":2.1682171295397294,"771":-0.6419396539275376,"772":1.4752852413928566,"773":2.7638188778243697,"774":0.20771795559323206,"775":-1.065349881293131,"776":0.5994791288634091,"777":0.9266410911684868,"778":-1.3911130550914952,"779":-0.6236534808462878,"780":-0.5844668435335646,"781":-2.149868724308145,"782":-3.0568677609324273,"783":-1.9275310998619093,"784":-1.2314783099993154,"785":-1.1292104057323993,"786":1.0105054057135443,"787":0.56806778403116,"788":-6.315567002538247,"789":-1.3777057440205829,"790":-1.6585232724283472,"791":-2.9753243727184295,"792":3.331056520610308,"793":7.489424045819571,"794":8.362692044902293,"795":0.5800461694249524,"796":0.10692429026063026,"797":-0.3518308692038576,"798":0.1849205005551701,"799":-3.2874105143892596,"800":1.5330973540063788,"801":1.2122473085078143,"802":-0.7943742018285416,"803":1.9447887952403484,"804":4.1434250462040465,"805":1.1092837085712464,"806":0.8152562231889726,"807":-0.8266098579044295,"808":-1.6233609384282934,"809":1.1713737577756234,"810":-0.19352589353959385,"811":1.377079983289077,"812":0.4793507789066537,"813":-1.2901865393444758,"814":-2.821197019040875,"815":-3.9226378833614515,"816":-2.174347862676608,"817":-0.026023593417852806,"818":-0.3111493401870436,"819":-7.9296625061587305,"820":-1.099110133558289,"821":-2.500288810582154,"822":1.8530434539669833,"823":9.604257278613474,"824":3.0576316278569413,"825":1.678874342791096,"826":0.45017597304233387,"827":-2.045685767268064,"828":-0.5382165818487467,"829":0.8283689001957901,"830":-0.5613400874664634,"831":-0.7099789898061778,"832":-0.9918927721132865,"833":-0.27278155686565636,"834":0.5184729300310903,"835":-1.8582742970984834,"836":-0.8655983258265073,"837":-0.9688533078119738,"838":0.2185450633439954,"839":3.74031204454241,"840":1.9648355343178303,"841":-2.1641533473095733,"842":6.486207444707289,"843":1.7673159505608609,"844":-2.6915857455878034,"845":1.5639513182963891,"846":1.8766006896170613,"847":-3.349025355346589,"848":-3.3541843801026383,"849":-0.517388298125943,"850":-0.27020254472647526,"851":2.3344774879460504,"852":-4.135933553866774,"853":-0.2549407882657806,"854":-0.8298617160165833,"855":-0.3729336029642394,"856":-0.11110216407244475,"857":1.020327488016587,"858":-1.1478330263672105,"859":0.04346756445099163,"860":0.791843771804941,"861":-0.2817165305425026,"862":-0.2506809472881926,"863":0.5781552396778035,"864":-0.6079228000119888,"865":0.10617542714283383,"866":-0.5490045613550455,"867":0.22696782206293764,"868":0.4886020944332479,"869":-1.3939497293127319,"870":-2.399571559646257,"871":-2.28843473399942,"872":-0.46220973192295756,"873":-0.23981076027172055,"874":5.12527520835122,"875":8.85844157745206,"876":-6.405208325685757,"877":0.30130521249129505,"878":-0.16823748145604422,"879":-0.9503837778939346,"880":-1.271539805218198,"881":0.7640014938588091,"882":-0.06676765498307612,"883":-0.8804059691650464,"884":1.1482385480072177,"885":2.5782867997480854,"886":2.169388381684613,"887":1.7820440562036723,"888":-0.1972140174990944,"889":-4.468327802148705,"890":-2.2930754708834873,"891":-2.3479934150932036,"892":-6.029144442192835,"893":-5.250521946417253,"894":-1.6045112517958495,"895":-0.4213811578124245,"896":-0.8669281483568371,"897":-2.1930051366685825,"898":-1.3350167308305763,"899":0.5506399480069433,"900":-0.24792415927227412,"901":2.086307453199222,"902":0.24386434835779125,"903":3.243388738421447,"904":0.4457496229572752,"905":2.349987015484577,"906":-0.9003855119950668,"907":-0.5989572821270259,"908":-1.978316223035173,"909":-2.004784211360463,"910":-0.014672185865568144,"911":-0.1798631540581604,"912":-0.11063727036820573,"913":0.9922959297267444,"914":-0.058659446388695254,"915":-0.2958086052327884,"916":0.6046346139528022,"917":0.14015099539653608,"918":-0.1169537467680847,"919":0.38689049658938907,"920":0.012750173182658331,"921":0.4037308079362151,"922":1.5734576841373464,"923":0.3565565068023885,"924":-0.002788175061402859,"925":0.12388582096710499,"926":12.661081020040083,"927":7.12627974059213,"928":0.3180537147286852,"929":-0.5420066713213205,"930":0.033417262310754745,"931":4.190231610241083,"932":3.2908724145637636,"933":-0.5871049195264849,"934":-0.18056047137181663,"935":-0.1666867620426385,"936":-0.9421563225863234,"937":4.557227408947688,"938":-2.5675347294407556,"939":2.484959387584494,"940":-1.6896868597673422,"941":3.233266347685722,"942":-3.389780402557393,"943":2.6932846760660483,"944":0.685935928716467,"945":0.6034072893727864,"946":0.9963344523623372,"947":2.5712140114649533,"948":2.3450483207453092,"949":4.129077054698872,"950":7.525765121318015,"951":-1.4080206613092374,"952":-0.22520046939902888,"953":-1.831323797571007,"954":-1.457613732451097,"955":-2.834148142722312,"956":1.5283124324720314,"957":0.5345287451688292,"958":-0.8802285527756134,"959":-1.3062894261032745,"960":2.080342263303289,"961":0.5321589980439889,"962":2.2743050207286966,"963":-0.2756734167833132,"964":-1.1662962272803683,"965":3.9917870609391612,"966":-2.57067359426927,"967":4.529354038143289,"968":3.501184132460505,"969":-1.5258516580889867,"970":2.3777807906434476,"971":1.742818356753099,"972":1.7515509710038053,"973":1.0034006689014543,"974":3.461309890761619,"975":0.3752074146897285,"976":-1.346655335641507,"977":0.6920014250817669,"978":-6.2961847738006345,"979":-0.21604150368686034,"980":0.9792397054115566,"981":3.6920097047249496,"982":3.2722780222189316,"983":0.5796126664821234,"984":-1.8244678950645217,"985":-0.21839762247453853,"986":1.5718828998645429,"987":0.37071633440723734,"988":0.7133199341171211,"989":-0.24774464888775716,"990":0.6096142148077319,"991":1.4600620986977126,"992":2.762648446804481,"993":-0.8152041456267862,"994":0.5767854885261452,"995":4.563752490952141,"996":3.1499881855732683,"997":1.751465209763844,"998":0.9432391623924752,"999":1.3362142741103196,"1000":1.965866186761026,"1001":-9.930842053067462,"1002":-0.7128806785557423,"1003":-0.20008888380975465,"1004":-0.5708163725338834,"1005":-5.5402045627645995,"1006":-2.7067918353302924,"1007":-3.406610530281118,"1008":-0.16250364330548783,"1009":0.5928248730648132,"1010":-0.5126658181757489,"1011":-1.5518833367709828,"1012":-1.5307912750179726,"1013":0.7059315487134918,"1014":-0.45291191477653275,"1015":0.6040566250866861,"1016":0.1563518996595802,"1017":0.5675128931064483,"1018":-0.7477934435168393,"1019":0.2367567487727817,"1020":-0.04013689344487579,"1021":-0.9661171685383998,"1022":-0.7034397177550469,"1023":-0.2801750819859613,"1024":0.16042569259786604,"1025":0.334970789546936,"1026":-13.52087197818297,"1027":-2.8414871640635844,"1028":-0.5984691771331041,"1029":-0.3810338235981479,"1030":0.7535368391166684,"1031":-2.2865714252702194,"1032":1.2465727274481269,"1033":-0.4316768999489276,"1034":0.09241390899727518,"1035":0.9897835819412143,"1036":0.915157910090443,"1037":0.2590485018576026,"1038":0.0024639911479276255,"1039":-0.432570469157434,"1040":-0.4335217329312668,"1041":-0.8564798760730802,"1042":-0.7366811139368961,"1043":-0.3774527024882976,"1044":-2.810198464446183,"1045":1.2080260029924266,"1046":0.8112206255373405,"1047":2.0965190683506094,"1048":5.577847088747698,"1049":-0.7930258191288311,"1050":-2.2142394152537306,"1051":-1.8309419685438484,"1052":0.34320968409022223,"1053":7.30374320651527,"1054":3.3741290841122913,"1055":-0.06604083104862124,"1056":1.5046824600665325,"1057":-0.5079716116674955,"1058":2.1904010878356015,"1059":2.147247987487204,"1060":-0.3161817633681299,"1061":-0.44672693410535197,"1062":0.5514662631340929,"1063":-0.9647145364915157,"1064":-0.12506799530625237,"1065":-0.48175269867719606,"1066":0.9536632112766188,"1067":0.3869658337188193,"1068":0.5876695310883867,"1069":0.43612845015594137,"1070":0.7820206145116609,"1071":-1.0507828905060552,"1072":12.19770628933176,"1073":0.3176114334402164,"1074":0.9421298542665331,"1075":0.23594696582884284,"1076":0.18064703172027335,"1077":1.2509247017706686,"1078":1.111133577341476,"1079":-0.15222186129247778,"1080":-0.000625927915164911,"1081":1.1635437739197185,"1082":-0.3634483089904321,"1083":1.7496839504611996,"1084":-0.16311245622456458,"1085":0.37401902895228034,"1086":-1.149969738548296,"1087":1.2434622937685182,"1088":1.2101356342557263,"1089":1.0698686304584923,"1090":1.4380990318710525,"1091":-0.8504577192019374,"1092":-1.857027567143867,"1093":0.4416890508819219,"1094":4.003501360160659,"1095":-0.73432123175775,"1096":4.537384141040319,"1097":-3.112746300840493,"1098":-0.9963420996037927,"1099":1.5525737066020435,"1100":2.2446123622414147,"1101":-1.5441979391575509,"1102":3.3397182992100483,"1103":-0.30526690853590976,"1104":5.098476586145988,"1105":2.117051372808867,"1106":1.978814615248052,"1107":3.1232243337819288,"1108":-1.7246221972953089,"1109":2.2081717094665243,"1110":5.4904867386474105,"1111":3.8469605720212945,"1112":0.4422554448044208,"1113":1.7525238862707189,"1114":0.7038527817796896,"1115":3.8449203253768345,"1116":2.568766856533754,"1117":0.7204753866216395,"1118":1.1663322838559833,"1119":0.5589681143980606,"1120":-1.4331883449033784,"1121":1.3846788368929999,"1122":1.7550023206753178,"1123":1.6414838068007958,"1124":3.1534432973809174,"1125":-1.020944020982819,"1126":-0.458084282800854,"1127":0.11734104673331767,"1128":-1.776789803059987,"1129":2.0228359972042433,"1130":1.0576173829925621,"1131":2.5960383059863985,"1132":0.41269453359880237,"1133":2.8996386020985465,"1134":0.9288140966331817,"1135":0.05488770352793452,"1136":3.832790836101375,"1137":-1.3834388014840968,"1138":-2.752639191182886,"1139":-1.8709005638157798,"1140":1.0674065266992185,"1141":1.929791413368784,"1142":2.1822828788993127,"1143":2.3856449215622284,"1144":-0.7692392851614595,"1145":-1.6555658059609148,"1146":-0.8528962262963029,"1147":-2.726055323372456,"1148":2.4050885125676236,"1149":-0.3357320584926523,"1150":0.7133453283537746,"1151":-0.11176724888557849,"1152":-1.7487859203390683,"1153":-3.7732624385373925,"1154":1.91950694221007,"1155":2.3669027682986172,"1156":1.6706238717405126,"1157":-5.179069666548324,"1158":-3.6823854168203294,"1159":-0.5884453522777179,"1160":2.145600101569132,"1161":-2.1272909803142124,"1162":-1.2223053307234175,"1163":0.6633655919864282,"1164":-1.4915466078046324,"1165":0.5290932009658499,"1166":3.1656561397028105,"1167":-0.5165206744893945,"1168":-3.953911601953151,"1169":-0.33770578827736236,"1170":-4.74937110467969,"1171":2.9154864797265954,"1172":2.9525649966967387,"1173":6.009802792814829,"1174":-5.401769786493283,"1175":-0.16228350172235587,"1176":4.65932368790054,"1177":3.173088267482271,"1178":1.1053107212624933,"1179":-0.24879842655849294,"1180":0.74549894772128,"1181":0.044408101605718696,"1182":0.025360344491592322,"1183":-0.6130429738316211,"1184":-3.681801232136676,"1185":0.7898536761625947,"1186":-2.464852825550014,"1187":-1.788243768652295,"1188":0.8787005567021657,"1189":0.4021307772837164,"1190":0.9302528681300309,"1191":-1.4164347702563962,"1192":-0.25046292421590916,"1193":-2.857608468686834,"1194":-1.5203592780994186,"1195":0.41284177860557936,"1196":1.668849174780013,"1197":-1.4699062738910402,"1198":-2.5254020271442106,"1199":-1.4977391605965498,"1200":-2.76335690390817,"1201":0.9826940200064009,"1202":3.1092164666454924,"1203":1.6544097657252055,"1204":1.017654843792269,"1205":2.373604190455587,"1206":-4.698295567954666,"1207":-4.073288028553543,"1208":-4.7306344552026,"1209":0.22810029624849326,"1210":-1.3629151680712266,"1211":1.3722476599390514,"1212":-2.5367729963015075,"1213":4.883316609090695,"1214":0.35919679480290456,"1215":0.00852783790769799,"1216":0.9631926065531643,"1217":4.977213035148329,"1218":0.22371759648051628,"1219":-1.8984488430677777,"1220":-3.0232500784356753,"1221":-1.0810610444184228,"1222":-0.5526014240059701,"1223":-0.7916471352539072,"1224":2.083134433857531,"1225":-1.5909557647037893,"1226":2.3217557081397224,"1227":-1.5517378586558277,"1228":-0.7258517816201934,"1229":-1.8057512354531937,"1230":0.0819026039235291,"1231":-0.39913387169746256,"1232":0.09346955338196707,"1233":1.5080124281061984,"1234":0.20834729030295407,"1235":3.8070337557189835,"1236":-1.9602617794469979,"1237":-1.7399898144876036,"1238":-1.0355183950022857,"1239":2.2437508358333513,"1240":-0.9694134853814943,"1241":2.6351308922885335,"1242":0.9425791502104551,"1243":1.5719649321727793,"1244":1.8960108946690113,"1245":-1.0040582475022048,"1246":-6.28931022377398,"1247":-0.24453672364150542,"1248":1.9829023454985226,"1249":-0.33731120000775094,"1250":1.0573619027191643,"1251":1.1256224614849801,"1252":0.33355767104509665,"1253":0.5118622041655794,"1254":2.6746008477741303,"1255":2.8918942706028727,"1256":-2.329776635635653,"1257":2.216426059425025,"1258":5.777162068704373,"1259":0.41730603516669834,"1260":2.6006579210827634,"1261":4.462078435512905,"1262":2.367422699801827,"1263":-4.636372480026029,"1264":0.5485917774363367,"1265":1.0402306135111823,"1266":0.7763414130406389,"1267":-4.044861545573772,"1268":-1.1642390092911992,"1269":2.8547881141588625,"1270":-0.04154459662877169,"1271":-0.0761119378229596,"1272":0.7393354908291871,"1273":-2.8282553772293997,"1274":-0.322114660401283,"1275":0.8508767273498002,"1276":-0.5506676841598086,"1277":1.659659427824409,"1278":-2.3072985405782522,"1279":-0.14404525886615213,"1280":-2.650753210399876,"1281":-2.325444802986021,"1282":3.2136564232719964,"1283":-1.6170467273305573,"1284":-1.8162268485385233,"1285":3.680714323434447,"1286":5.343043249799459,"1287":5.480496174281469,"1288":-2.3749681055025795,"1289":2.118148286765502,"1290":2.935359835690789,"1291":4.284689816644218,"1292":0.5485987660190397,"1293":0.16387662768916833,"1294":3.5620484230405203,"1295":1.731410034258989,"1296":-5.09321258672081,"1297":0.0019816218189787826,"1298":-1.44503753907361,"1299":1.3756958684958571,"1300":0.5598362304830977,"1301":-1.7096519561955141,"1302":2.6649005302741524,"1303":-0.7471478788317032,"1304":0.8610589905912035,"1305":-0.568642951206648,"1306":1.670794162551287,"1307":-0.006657030225268247,"1308":4.629364703410362,"1309":-1.3978914297960237,"1310":-1.3241550500349475,"1311":-3.3652312444114583,"1312":-0.5628162668845186,"1313":-0.9794452306221912,"1314":-1.9481622671363077,"1315":-5.435510616791012,"1316":4.112295997955101,"1317":-3.3970825081200307,"1318":-3.494023714309011,"1319":2.326699430770967,"1320":-1.1863434408226385,"1321":3.4912462357265395,"1322":-2.162400000516669,"1323":2.7472151361174175,"1324":3.9230397693766688,"1325":-0.3167270888759347,"1326":-2.0532619663929945,"1327":0.10063473993140563,"1328":-0.24333767383729726,"1329":0.5320005121679398,"1330":0.1562775840863043,"1331":-1.4891158855816826,"1332":-1.0022663829294194,"1333":-0.9007551113114141,"1334":1.8759766805952172,"1335":1.7358241448980114,"1336":5.01545552273072,"1337":3.024682717123172,"1338":0.4007065677627574,"1339":0.8465887625058447,"1340":4.491248894362966,"1341":0.8115619602400278,"1342":-0.627693034017554,"1343":-4.496445700830326,"1344":3.4890789071133574,"1345":1.7365890120645886,"1346":0.966682428772448,"1347":0.8932622427763255,"1348":0.7858282800177976,"1349":1.5102571687001816,"1350":1.5266363515257864,"1351":-0.3280163739716412,"1352":-1.2018440641046502,"1353":-2.5169243854289056,"1354":-3.542414851955564,"1355":-0.6933046265939046,"1356":-0.7926520567587882,"1357":-0.6170818199435609,"1358":-1.0168219602395594,"1359":-0.04704056347130527,"1360":2.009473999812457,"1361":1.3221138612452337,"1362":4.664885640910979,"1363":-2.840235501936602,"1364":-0.4750320493056981,"1365":2.3035019873863996,"1366":-0.3698324010930051,"1367":-1.320363761941271,"1368":-1.9456798759858,"1369":-1.2607771979347449,"1370":-2.407662369401736,"1371":-6.308526684473238,"1372":-0.4387606973526791,"1373":0.24029699702795626,"1374":0.12366725105690037,"1375":2.487869014184104,"1376":2.8843771162104352,"1377":0.2819276839107632,"1378":-1.7337466783175428,"1379":-1.6513784682817443,"1380":-1.5818040681587897,"1381":-0.6377983811415903,"1382":-1.7937715996465695,"1383":1.2812195479881165,"1384":-1.662412208773924,"1385":-2.0729731715929622,"1386":-1.6307489761561438,"1387":0.11533410154651305,"1388":-0.6433459707122975,"1389":-2.081394811856743,"1390":1.8707073906372493,"1391":-1.4585017531735345,"1392":0.15593071486614143,"1393":-0.9374254929288073,"1394":2.23913387814668,"1395":0.09370187504428792,"1396":0.23295847463254996,"1397":-2.8303332017796756,"1398":1.9842280982404148,"1399":-0.3743464515537837,"1400":1.3957895321601959,"1401":-2.1409508007588944,"1402":-1.063968601463949,"1403":-0.6064280416724822,"1404":0.00046020250947802384,"1405":-0.09217630867950043,"1406":0.6530310149140142,"1407":0.7841615107524329,"1408":-1.3949337526149326,"1409":-0.695418397686987,"1410":-1.3432371453531824,"1411":-2.549160148825509,"1412":-2.3649495814843573,"1413":0.5084295247973707,"1414":0.7501328545147807,"1415":-2.346835728885209,"1416":-5.753969029832736,"1417":-1.7841182490295318,"1418":-0.01137318594106035,"1419":0.9991477805464841,"1420":-4.0995690092379045,"1421":7.769321785577161,"1422":3.682801881579607,"1423":2.1565958010733794,"1424":-0.693935401945119,"1425":-2.083157336429438,"1426":-0.36926336061877246,"1427":-2.97696935361747,"1428":-1.8266491365687287,"1429":0.6135304843437601,"1430":-1.4422276527719848,"1431":1.047711259668967,"1432":-0.5679007557599747,"1433":3.3822034324046064,"1434":3.8646960676588096,"1435":-0.39080940456100893,"1436":-0.06369906463739208,"1437":-0.03602454687562871,"1438":-3.2936868012616336,"1439":-7.007239500845187,"1440":-0.76221512981891,"1441":1.0491200449197657,"1442":-0.3233729823818923,"1443":3.1676777854016755,"1444":5.840690032189299,"1445":0.660883616621712,"1446":-1.2231535936382762,"1447":0.7551134870714177,"1448":0.40849976593365445,"1449":0.4660103663912955,"1450":-0.9274180692346904,"1451":-0.31598268642774335,"1452":2.8609862540549416,"1453":0.1471801046107859,"1454":-0.651823535524178,"1455":1.7400884172132154,"1456":1.0457273416003965,"1457":-1.8245801927344634,"1458":1.094900257182872,"1459":-0.5501438045322482,"1460":2.8292851222866062,"1461":2.9914925087221214,"1462":5.607066709627003,"1463":5.814987722932465,"1464":1.101267930100377,"1465":5.014244175987994,"1466":-1.1231778609264687,"1467":0.3884832935286025,"1468":2.371598421144035,"1469":1.4859108848156362,"1470":2.1495855432690654,"1471":0.03589902537258043,"1472":-0.8133117897368928,"1473":-1.8291951360452725,"1474":-0.4534320464965364,"1475":-0.8417688550834862,"1476":-0.9484514020253532,"1477":-1.1538025143470731,"1478":0.8519736502448086,"1479":-0.6407227310482589,"1480":-0.08919566990004776,"1481":-2.288806347916422,"1482":1.514983827161002,"1483":0.013554622640731769,"1484":2.0878904628554893,"1485":-0.38209193025867905,"1486":-0.18606488767005464,"1487":-0.763265019155453,"1488":0.6231730823861358,"1489":-2.08060582153276,"1490":1.7820318835638735,"1491":1.3462282390482565,"1492":-2.689188318690305,"1493":0.3583846252107261,"1494":-1.344325936268584,"1495":1.07615751253893,"1496":-0.9289005749163237,"1497":0.520998198613769,"1498":-0.23865960220189814,"1499":-0.284621333697717,"1500":0.009325940894258495,"1501":0.8945474292585011,"1502":-1.0120513180632649,"1503":-1.293728554595976,"1504":0.867223073898859,"1505":-0.47749650371653524,"1506":-0.015554914715990962,"1507":0.4905185024506283,"1508":-0.12679600213437528,"1509":1.3584408483668218,"1510":1.3669415800671887,"1511":4.364124254145447,"1512":2.3095249275984227,"1513":-1.9244145132990305,"1514":-2.860016165842706,"1515":2.581303611675746,"1516":2.192069626731367,"1517":2.247624943022793,"1518":3.087195318926138,"1519":-1.2695133624090893,"1520":4.481457669835021,"1521":1.9509668032465242,"1522":2.4069503030913135,"1523":1.274321423391926,"1524":-1.2321789961929766,"1525":2.421686489930539,"1526":3.9620985715622,"1527":3.536122382389326,"1528":2.316306359572966,"1529":1.7491762059873561,"1530":4.809338727399987,"1531":1.9488653063805876,"1532":2.332804115767742,"1533":0.0473331100774683,"1534":0.38402505313685653,"1535":0.7683395548412549,"1536":-0.17247194414223316,"1537":-0.004087564676527426,"1538":-0.15938426345876242,"1539":0.6158617780743504,"1540":0.9896624311785174,"1541":7.447132256686528,"1542":6.023089381773896,"1543":5.796697729057314,"1544":-2.060021684021425,"1545":-1.3060534151723262,"1546":-0.38386952573870087,"1547":-3.405966979405834,"1548":-0.16269887698075516,"1549":0.07495087514088342,"1550":-1.1359807379314097,"1551":-0.9080437841744361,"1552":-3.299665991102039,"1553":-4.396239162698381,"1554":2.171405922564665,"1555":0.2449052955951826,"1556":0.373762745112859,"1557":0.050461519844756254,"1558":0.9871037075769586,"1559":1.3426038233920161,"1560":0.45003746886182283,"1561":-0.8964031617405589,"1562":-0.8518535972293517,"1563":-0.8040167379736981,"1564":-0.3977752561932158,"1565":-0.4200638423752579,"1566":0.18513097987966978,"1567":7.457234884148331,"1568":8.938031938303347,"1569":6.871414250121355,"1570":-0.2656385126638248,"1571":-0.8031719262330972,"1572":0.5388602415535607,"1573":4.5014536486102745,"1574":-0.1018635347845247,"1575":-0.14751376809715122,"1576":-0.9796871279643278,"1577":0.04755584868040682,"1578":-0.38229142541088124,"1579":-0.6625523461183886,"1580":0.3021757160802578,"1581":-0.3648169266465085,"1582":-0.1354246708516578,"1583":0.30849187461552197,"1584":-1.6253666976954035,"1585":-0.8376945329770936,"1586":-0.1559638406896204,"1587":-4.380736472748121,"1588":-2.744206673457098,"1589":-2.316885696596329,"1590":-0.027201034774962274,"1591":-0.392872851573052,"1592":-1.2193397175945495,"1593":-9.635329080382418,"1594":0.8160784678050529,"1595":-0.2995221886744559,"1596":-0.3702833335933889,"1597":0.18488988418610983,"1598":1.106511246396372,"1599":0.6675325869821044,"1600":0.08421120325204919,"1601":0.7672029341121456,"1602":-0.7579251067758191,"1603":-0.8036953698046693,"1604":0.1435886068750726,"1605":-0.024805678085190547,"1606":-0.38451599372197587,"1607":0.1803370134808733,"1608":0.21920433727785363,"1609":-0.2714771385953994,"1610":-0.4580481633791793,"1611":0.10276861034970378,"1612":1.039628596464408,"1613":-0.7861656693056676,"1614":-1.1708046698295558,"1615":0.9707853007446364,"1616":2.4865722098391867,"1617":0.7577533221151332,"1618":-0.19947850320797045,"1619":-5.130407829851233,"1620":-6.0999628788393,"1621":-4.514512534819338,"1622":-0.7493640972138063,"1623":-0.8909262918955551,"1624":-1.3216260044434958,"1625":3.909376655822024,"1626":9.119928548430162,"1627":1.4566766591312506,"1628":-0.6819501513317531,"1629":1.468607682338201,"1630":0.556847371615828,"1631":1.775521093902935,"1632":1.0393774056085021,"1633":2.4404310825938897,"1634":-0.5636300398172504,"1635":-1.641264768752596,"1636":-0.1112343342800557,"1637":-0.1169991988165833,"1638":-2.514264601263523,"1639":0.8809651963234987,"1640":-1.439196188341902,"1641":-1.9761375649747865,"1642":0.963885629454835,"1643":-3.134852829304007,"1644":-2.596261948331483,"1645":3.8497439657243238,"1646":-0.8100631222186462,"1647":-0.7889618105470588,"1648":-2.522473925847315,"1649":2.3470159705389806,"1650":1.7421004380759129,"1651":-2.724369579704978,"1652":8.92526658892965,"1653":0.8759913923509159,"1654":-0.1373414966678784,"1655":-0.04632180625840851,"1656":-0.3359677607674547,"1657":0.40225378093837827,"1658":2.3346685138729684,"1659":1.2348906387432717,"1660":-3.0917908349282563,"1661":-0.7742226594381013,"1662":0.06082124767475917,"1663":1.854111949157665,"1664":-0.5184009921950867,"1665":0.22986333111976415,"1666":0.8425009560861565,"1667":-0.5773013920475623,"1668":0.2525678128107712,"1669":-0.8794473937717402,"1670":0.04734760679910972,"1671":0.9246491983936092,"1672":0.7167172713954642,"1673":0.9364568025456296,"1674":-0.9009434490876043,"1675":0.8844946827608177,"1676":-1.0857088477156152,"1677":-4.223764675146934,"1678":-0.5009728135219694,"1679":0.2859095993087632,"1680":-0.05541755062704813,"1681":-5.699557956912611,"1682":-8.430688817506603,"1683":-9.759430090557732,"1684":0.2883113423257681,"1685":0.2851744042869047,"1686":0.7229647701171498,"1687":0.46056305862178015,"1688":0.26499193206705457,"1689":-0.7032556151659108,"1690":-0.32031301272759954,"1691":-0.08458276998340532,"1692":1.2201397328265189,"1693":-1.7830609315013435,"1694":0.4912188492011817,"1695":1.0437355053028832,"1696":3.1210716455550553,"1697":-5.08072002602215,"1698":-1.798700814565875,"1699":-2.393552118187533,"1700":1.4195753329665965,"1701":-1.4803159300364044,"1702":1.796355223550053,"1703":-3.6155200027691916,"1704":-1.4382125877578513,"1705":-2.4298302779924317,"1706":4.371849484474424,"1707":1.6460467330063024,"1708":2.5378597606812363,"1709":4.4484463747823275,"1710":0.8468123402519288,"1711":2.292053999976175,"1712":3.313414507651368,"1713":-5.65034668921098,"1714":-1.7512117117258903,"1715":0.6692891719582753,"1716":0.03225878583099158,"1717":-2.6020450302195512,"1718":-0.1492755257836329,"1719":-2.432579601572766,"1720":-3.7773303778105514,"1721":0.9940918954418311,"1722":-2.905433200151588,"1723":-1.1456780922733856,"1724":-2.0800942767544326,"1725":-0.2437827902135947,"1726":-3.7286507233237742,"1727":2.9484194191845794,"1728":0.07593202730334371,"1729":1.657768207128445,"1730":-1.9220149470301324,"1731":-0.5250299700289373,"1732":2.389263108808738,"1733":5.23348458471186,"1734":2.072966710338989,"1735":-1.3950851424277115,"1736":-0.9038761153725946,"1737":-0.9005126953046965,"1738":-3.055946091947108,"1739":2.0544642428360307,"1740":-0.8846489319497355,"1741":4.263129628822539,"1742":-1.9483705944449163,"1743":-1.4858846537348518,"1744":-1.2200503227354007,"1745":-3.6095432315625438,"1746":1.384335276778533,"1747":-3.270160749531831,"1748":-4.37685537045598,"1749":-0.2670533571093521,"1750":0.2584482826138587,"1751":-0.20329695244973517,"1752":-2.956204592214078,"1753":-0.994347151539876,"1754":10.21971083248167,"1755":0.3113671103963739,"1756":-1.2482321169027457,"1757":-0.7081590575190316,"1758":1.2112215504699104,"1759":-0.762371512417185,"1760":1.834953035783505,"1761":-4.93362291932494,"1762":-0.3440584608965805,"1763":1.4013718763198328,"1764":1.584509696275672,"1765":-0.34523765665564454,"1766":-1.4359739623871388,"1767":1.6811182113499323,"1768":2.472067315043197,"1769":1.531714063335573,"1770":1.5136327301981087,"1771":1.1838786837326274,"1772":-0.8758943894293207,"1773":2.7747900229437943,"1774":0.762090037098641,"1775":-4.076561367855272,"1776":-2.7352281177271633,"1777":-1.8769328037184747,"1778":1.8948624386807733,"1779":4.137403501810433,"1780":-0.8328137001019001,"1781":6.413786485223573,"1782":5.513353620583527,"1783":1.7817128254276198,"1784":-0.23638484531121612,"1785":-1.2359504204722367,"1786":-1.363702912588658,"1787":-5.449397123668984,"1788":-1.8930108471731255,"1789":-2.8520022327173318,"1790":0.14790851293806254,"1791":-0.9812797258214946,"1792":-1.9828802637253178,"1793":1.7290170580747177,"1794":1.6461990222698502,"1795":-0.6617142123077677,"1796":-3.466307107045331,"1797":2.5199846145981364,"1798":1.4524276568845607,"1799":0.8835044348918993,"1800":3.1726595561078956,"1801":0.14611907233333632,"1802":4.946613123033519,"1803":1.9500753639267072,"1804":3.798822681105352,"1805":-1.2056959283829383,"1806":-3.5767601251705865,"1807":-2.5591066326134246,"1808":-3.384620079954752,"1809":1.7279659798650575,"1810":-0.7198610904592261,"1811":3.8977626458266985,"1812":1.7050719119488373,"1813":0.16549785952794066,"1814":0.4325818820149847,"1815":-2.654428249262137,"1816":-2.3594602341149042,"1817":0.28908596683301097,"1818":-4.420800357056564,"1819":-0.47444456548618397,"1820":-0.6545772101930314,"1821":-1.7617059418444923,"1822":1.4125501882843148,"1823":2.0706382373543057,"1824":-2.5870232478511386,"1825":0.3705955600121367,"1826":-0.38807105313124457,"1827":-4.873239935633285,"1828":-4.6315041082507085,"1829":-4.2711285516469255,"1830":-0.10395198354851866,"1831":-1.7703762778133,"1832":-1.306611611107063,"1833":-3.554111626767336,"1834":-3.3067338587478234,"1835":3.2776247915398597,"1836":2.2318320832244334,"1837":-1.5405227551766698,"1838":-2.2603565449180474,"1839":-0.30973373770188994,"1840":-1.1771902764106266,"1841":0.7598359098293131,"1842":-0.3870573999896574,"1843":-1.7108576623216571,"1844":-3.148532656450419,"1845":-0.6764459166336844,"1846":0.8535860189855173,"1847":2.7022720316407196,"1848":-1.2934329441020032,"1849":-1.7527083672153554,"1850":-0.682148280857677,"1851":0.24828942515763328,"1852":1.7887501099546803,"1853":0.7884749411603326,"1854":4.0296096573525775,"1855":4.140954052175015,"1856":-0.7791617820092341,"1857":-0.2584524363427825,"1858":6.776519949240771,"1859":6.950904302278288,"1860":2.682720725653526,"1861":-1.9743402931904248,"1862":2.607680539271447,"1863":0.06012141243909666,"1864":-6.626907148198322,"1865":-1.8082320620375807,"1866":0.6927986134277762,"1867":-2.1676751649928607,"1868":-1.4346086123031891,"1869":-1.7344619820661547,"1870":-0.8160438894914283,"1871":-0.3960781919970463,"1872":-1.5509625748344236,"1873":2.2246874255492886,"1874":1.696179482155211,"1875":2.3131530244419647,"1876":2.057750769633902,"1877":-3.449788668603296,"1878":2.5092601918907307,"1879":1.0785033018586458,"1880":-2.3162094948294336,"1881":0.45689608720096203,"1882":-1.7990125927934015,"1883":-1.6218351440922056,"1884":-7.677032830815633,"1885":-4.836173435131845,"1886":-3.0924676866801253,"1887":-4.305449285874837,"1888":1.5481577264212958,"1889":2.4678424074231793,"1890":-0.5979630948357118,"1891":-2.355489524096977,"1892":-0.45197651760872476,"1893":-2.2300858921572875,"1894":3.0423767144407936,"1895":1.0690605762132896,"1896":-1.7937558730693903,"1897":-1.1766138391813505,"1898":-0.7314273709474434,"1899":1.208069580494033,"1900":0.7808846988833671,"1901":0.2636022425286427,"1902":3.6026738640381115,"1903":-0.8061937858017696,"1904":1.0514034412845457,"1905":1.311301228087006,"1906":-0.944989817497881,"1907":-1.5216749778082774,"1908":-1.648666801013114,"1909":-6.982682336741551,"1910":0.21975827100152295,"1911":4.6656649164059765,"1912":3.167864428928685,"1913":-2.1618986259163586,"1914":2.998738607564934,"1915":-1.5939833337264562,"1916":0.5515666124690427,"1917":1.3323582345729397,"1918":1.361036387363603,"1919":-0.6001209595550937,"1920":-3.1598101255265565,"1921":-1.6130396286608266,"1922":2.1522665112966695,"1923":0.5692959708154036,"1924":1.9110911219357265,"1925":0.6182442293853246,"1926":5.108925553830404,"1927":3.819888478936757,"1928":1.2440341005476199,"1929":-0.02222793119776367,"1930":-1.312191797122312,"1931":3.0741956732420657,"1932":0.05824845903478719,"1933":-3.860504000679043,"1934":0.47110284838586985,"1935":2.430793494935693,"1936":3.6312368766822964,"1937":-0.5520116075416013,"1938":1.4496117363545642,"1939":-0.34886662596519746,"1940":-0.5161668670094623,"1941":-1.1548910528317131,"1942":1.1685970272593391,"1943":-0.5380682816952818,"1944":1.204868216074985,"1945":-1.8208402269373594,"1946":0.3978391320310037,"1947":-0.4445789779636031,"1948":1.1268737224687404,"1949":1.515634620558529,"1950":0.7800054711792223,"1951":-2.838110624903852,"1952":-1.5548203454241547,"1953":-1.7756376053514562,"1954":1.0751835493494772,"1955":-1.8529462466041802,"1956":1.775323499272121,"1957":-2.229540216733316,"1958":-6.242039352064176,"1959":-5.025314692304924,"1960":-2.4299951921459413,"1961":-1.5950979221059258,"1962":2.407005893995572,"1963":3.505238880987379,"1964":4.789092294542891,"1965":-0.3272608432116538,"1966":0.7567319208174809,"1967":1.709222996376704,"1968":-3.985438957754508,"1969":-2.122172620020453,"1970":-2.0721992815826287,"1971":1.9118154760729724,"1972":-0.9615401689830361,"1973":-0.920588186820064,"1974":-1.7081648213448735,"1975":2.6615077041363535,"1976":-2.2810330763849973,"1977":-2.7485296974628115,"1978":0.5973922781881099,"1979":0.9950371488818414,"1980":-0.966498487396172,"1981":-0.1289013409577693,"1982":-3.315939881922809,"1983":1.5272771886741152,"1984":-8.177532796206625,"1985":-2.614215957848821,"1986":-2.1282553806106868,"1987":3.1728725032045704,"1988":-0.5817936703035552,"1989":-2.2636947811849484,"1990":0.6706874937781734,"1991":-0.8109748814280211,"1992":3.7875692555670772,"1993":-0.5985168941860155,"1994":-2.185878080928974,"1995":-0.09228209131307342,"1996":2.666865341692212,"1997":-0.2365567120320066,"1998":3.4180842090059604,"1999":-2.193022508107972,"2000":0.7727915236674334,"2001":1.1485888381623532,"2002":2.25869994187929,"2003":-0.35131002162400443,"2004":2.9042411539132167,"2005":4.259935889255852,"2006":3.862258196644587,"2007":3.2230256792234013,"2008":-1.7369221705831208,"2009":4.1844479824921335,"2010":3.464982551263125,"2011":3.462624083371719,"2012":1.5685419583916367,"2013":-0.005852455243952848,"2014":3.5332839050757006,"2015":0.3982682275227457,"2016":1.6225015665396234,"2017":-3.0196742425849417,"2018":0.11375162904843705,"2019":4.410140911342747,"2020":3.143990758347775,"2021":2.9481121931650365,"2022":0.2776844441477411,"2023":1.74445178965741,"2024":1.9257248513743161,"2025":3.3690601893535406,"2026":3.0883134248569886,"2027":0.05287319340381891,"2028":0.33107119854323835,"2029":-2.670093641253074,"2030":3.24837511767306,"2031":2.0992876557694173,"2032":-0.4777242364667755,"2033":3.4134596633234957,"2034":-2.068855509926789,"2035":5.214416112914395,"2036":2.0462662727977756,"2037":1.0147430838110256,"2038":0.27401172565903376,"2039":3.132138944920353,"2040":-3.482243128457271,"2041":1.6149241637133667,"2042":0.519253557650071,"2043":0.027029436911530317,"2044":-0.028618949682287707,"2045":-5.459692212590129,"2046":0.1911389362984459,"2047":-0.7813243438209266,"2048":1.1311266332369314,"2049":0.9141855337868702,"2050":0.6709934473497279,"2051":-1.3133891184186814,"2052":-0.5156405967557093,"2053":0.5057062513077217,"2054":1.380866325668851,"2055":-0.6756389519129898,"2056":-3.3821049144223196,"2057":-2.9737142020717617,"2058":-4.304649150545979,"2059":-0.1145614726996016,"2060":1.5907402422680879,"2061":-3.1345034615412612,"2062":-4.887406450065384,"2063":-3.017741649460873,"2064":-2.436942987389461,"2065":4.49497750066572,"2066":-2.544632140183701,"2067":-2.553145255642751,"2068":-3.6535860049895983,"2069":2.6899975034551784,"2070":0.23621943330582484,"2071":-5.07778120836197,"2072":-3.316778948700732,"2073":-3.3431237337449184,"2074":0.3556553450963761,"2075":-0.7927480971163615,"2076":-3.4559382374048737,"2077":-3.1321197728898484,"2078":-3.0015235019822875,"2079":-0.30790711077153815,"2080":-1.1074347331013232,"2081":-2.1500790584515195,"2082":0.6322262453616124,"2083":-3.0358093986456653,"2084":-3.847028149521107,"2085":-3.4778712607311375,"2086":-4.190538359548286,"2087":-2.4456320054668392,"2088":-2.6405083400099,"2089":-2.3290685773021926,"2090":-0.8868680288184999,"2091":3.887368552135823,"2092":1.2831798239378918,"2093":-3.154290774064701,"2094":-2.055799492816548,"2095":-2.3868195924400673,"2096":-4.360793580866089,"2097":1.1439932170647553,"2098":1.627861849572595,"2099":0.41259549515264377,"2100":-5.0411920850036385,"2101":0.19878011848160576,"2102":-0.6158300613158497,"2103":2.2461374419748874,"2104":-1.0588324503889799,"2105":-0.24088098035316213,"2106":-0.5358971028041509,"2107":2.5182798478575634,"2108":2.1419298264319586,"2109":3.49904066669386,"2110":2.931870583658852,"2111":-0.5129166322522097,"2112":-0.2626691578547449,"2113":2.7530075822314295,"2114":3.0285237679573864,"2115":0.9843868331376889,"2116":1.153499233058888,"2117":4.219577242045802,"2118":-4.09112955236525,"2119":6.439433395878304,"2120":1.7109993328291464,"2121":2.2645909521743812,"2122":2.3403143234495962,"2123":0.38869745502736613,"2124":3.3505023901535873,"2125":0.044641085882746664,"2126":-1.2681138586936185,"2127":-0.4737927989728625,"2128":-1.9034467943317817,"2129":-2.369563546677504,"2130":-0.5161235045742878,"2131":-0.5306507393726414,"2132":1.4048592247934646,"2133":-0.09479461669630704,"2134":0.9624546909573186,"2135":-0.3528304624589685,"2136":-0.2911973818697277,"2137":1.3815265474104859,"2138":-1.0923891387016227,"2139":2.2423423003948186,"2140":2.1569838012828746,"2141":1.558571676822743,"2142":0.20537893256670753,"2143":2.0939420426879902,"2144":5.581279346426725,"2145":-7.964089159532528,"2146":0.019301062588694733,"2147":-0.3291022595615165,"2148":-1.0994423443630212,"2149":6.4920705431830585,"2150":3.9985912328414384,"2151":1.8125236498178043,"2152":-0.2816971103070886,"2153":-0.9268693192423381,"2154":1.9136581243479935,"2155":1.6509968904648182,"2156":2.246010993007797,"2157":-0.02705501606071901,"2158":-0.7302180413707975,"2159":-0.2949083844413593,"2160":1.1297515401173712,"2161":-0.44100093758398046,"2162":-0.34102495698979435,"2163":0.10308974168280734,"2164":-1.2651570965147414,"2165":-0.9315851776051549,"2166":-0.7927443902728659,"2167":-0.959829257272662,"2168":1.1334656417952058,"2169":-0.6525252228387264,"2170":0.31561519184011677,"2171":-0.8781123440270242,"2172":-1.198610781490917,"2173":0.16535481927085355,"2174":-12.025202927695108,"2175":-2.15684069486902,"2176":-2.223607192335822,"2177":0.37526505640753033,"2178":1.4223701186649629,"2179":2.2215628162117036,"2180":0.2877272518147841,"2181":-1.5551175185973414,"2182":-0.9946082812025748,"2183":0.09750462954549663,"2184":1.4285806621638313,"2185":2.7702069012884794,"2186":2.869131540718531,"2187":-2.176199063707382,"2188":2.0354053278061834,"2189":-0.15556170572528435,"2190":1.4148234413607874,"2191":2.487419172471137,"2192":0.5910148862676382,"2193":1.8754819501608955,"2194":5.819274154832697,"2195":-1.043673101737649,"2196":-0.5356667549597663,"2197":-2.2986021575342144,"2198":-0.5504393655467628,"2199":-1.3836000325347653,"2200":-0.5921525637623387,"2201":-3.608852019049184,"2202":-2.6056234272565937,"2203":2.125065355345137,"2204":-1.9100656253398987,"2205":0.49263076974197856,"2206":-5.342439123403595,"2207":-0.6745513301437716,"2208":-1.3575288649745854,"2209":-1.4811151629375257,"2210":-0.5624333090666122,"2211":-4.057673025595455,"2212":-1.138722138994092,"2213":1.137056268330495,"2214":2.1996607501927796,"2215":2.504027633629195,"2216":-1.7527060331841058,"2217":3.552928552125533,"2218":-2.3129258912901407,"2219":6.621051335288329,"2220":-0.5366026129581464,"2221":-0.25888151597692527,"2222":1.5884790885441606,"2223":3.8984002310743042,"2224":-0.8362391628858972,"2225":-1.2223584656617805,"2226":-0.5707345784111167,"2227":-1.4704133435570912,"2228":0.2451739336491535,"2229":-3.101338412366491,"2230":-1.6517660004518053,"2231":-1.6483851328797625,"2232":5.98353895417644,"2233":2.3719484552218018,"2234":-0.1778347382215801,"2235":-1.6747078460957632,"2236":-3.6593290912224736,"2237":-0.1406662684556022,"2238":0.49007301427844213,"2239":2.1775340216698496,"2240":-0.705748916544845,"2241":1.073526200827766,"2242":-0.009987455329693504,"2243":0.13427437036377182,"2244":1.4704606620705447,"2245":1.943291936423098,"2246":1.930980597011241,"2247":0.5577607510089574,"2248":-0.9984076718065228,"2249":-2.056970540523284,"2250":-0.3579162714769216,"2251":2.180464637816898,"2252":1.7731149910248842,"2253":0.0816883705986654,"2254":1.493322337648596,"2255":0.7591959621844057,"2256":0.9207045952906473,"2257":-2.0069472355300215,"2258":1.7162524580015288,"2259":0.64656444721473,"2260":3.633465721904076,"2261":-1.052604945533235,"2262":3.7490400274752047,"2263":0.650583315668585,"2264":-0.5182831298021289,"2265":0.8114209362146789,"2266":0.11809355256933213,"2267":-5.985553842947244,"2268":-1.2008774666943312,"2269":-1.0188475935656498,"2270":1.1366436799612865,"2271":3.272144432928612,"2272":2.915940188111515,"2273":0.5884973269368095,"2274":-0.04974469011300031,"2275":1.9986220135574824,"2276":-0.47541580851698745,"2277":-1.5959275975560478,"2278":3.299453405569844,"2279":3.7858612028534173,"2280":-0.24333054914603547,"2281":3.7024520005701955,"2282":-0.17826939713691253,"2283":0.9267510827752319,"2284":0.5784404212515399,"2285":0.25570400471723925,"2286":0.6777125811321316,"2287":-0.6438217598302651,"2288":-1.0277852455429974,"2289":0.44752059907534103,"2290":0.5920272722011557,"2291":-0.008891911020114331,"2292":-1.263182790612434,"2293":0.885876717250752,"2294":-2.088008004509003,"2295":1.6840774655764779,"2296":1.7562235930818075,"2297":-3.3466028835849384,"2298":1.084349386878261,"2299":-1.1624543123407824,"2300":-5.952952704929209,"2301":-3.4477180923594357,"2302":-4.983591968929156,"2303":-1.4493302953281884,"2304":-1.808434284459666,"2305":0.9603110764541525,"2306":-2.5901646532427347,"2307":2.8967030407874246,"2308":1.2493901602204738,"2309":3.1137254549944666,"2310":-2.5609058162109264,"2311":-0.6065232461114529,"2312":0.8543175355993959,"2313":0.3228813618695871,"2314":-1.076758241591376,"2315":-0.5810354558715174,"2316":-5.357376674408935,"2317":-2.566985053959928,"2318":-2.5719952772078143,"2319":2.2920613693488505,"2320":1.6903498362366034,"2321":0.18741201089805948,"2322":5.534977627959552,"2323":0.7853248365260361,"2324":-0.7707338413434639,"2325":-6.282283258507139,"2326":2.3278507074166135,"2327":0.8161142154362804,"2328":0.9691923109633924,"2329":1.2286823222950705,"2330":-0.7698396881174359,"2331":0.8417547745653644,"2332":1.2475227938903042,"2333":1.5682081096755556,"2334":1.2354732063105376,"2335":0.8407397986456578,"2336":0.23549023786270798,"2337":-0.6920203812055791,"2338":-0.4355043806225341,"2339":-0.8429265297720329,"2340":-1.7962937819941867,"2341":-2.5440824741321304,"2342":-1.6031823702611245,"2343":-0.589604218648372,"2344":-0.58225216384377,"2345":-6.497281986473492,"2346":-0.1859453474733915,"2347":-3.3098828912373905,"2348":2.5400143138935602,"2349":2.7922557925730036,"2350":0.3091321286458554,"2351":-0.012941478797042992,"2352":3.77967481504382,"2353":5.164513148228868,"2354":1.6104893598634211,"2355":3.286391251453867,"2356":1.6066108386414317,"2357":2.851656150664826,"2358":0.4321900580233349,"2359":1.5299710187742435,"2360":1.0853122133831203,"2361":1.2427524000835117,"2362":1.429838665736613,"2363":-3.3169737746800734,"2364":4.079748000074865,"2365":-1.168091914890961,"2366":0.6374925484877235,"2367":-0.35405782617482057,"2368":-7.9058822905434525,"2369":-3.0346049225331586,"2370":-1.5194565426093611,"2371":-0.5516854068104527,"2372":-3.8688198707759005,"2373":-4.45118787128347,"2374":-1.700201149741892,"2375":0.30094748168874297,"2376":-2.3250736883831986,"2377":2.6363151523686006,"2378":0.04586771936196909,"2379":0.6210451420659614,"2380":0.09961957333805575,"2381":-1.1196131847733024,"2382":-0.16080767243091537,"2383":0.563625187676567,"2384":1.3870334292745374,"2385":0.6916367972942327,"2386":0.7651653785009589,"2387":0.4723814147282118,"2388":1.4927721595448789,"2389":-3.156974838991648,"2390":0.8404901138575425,"2391":-0.609338192875043,"2392":-1.1814111324970764,"2393":1.2087860210004784,"2394":-0.24242810828483433,"2395":0.12633634458898274,"2396":-1.031259384759105,"2397":-0.004445720993490301,"2398":-0.29458285277790147,"2399":-1.9762636773957563,"2400":0.5039214800330584,"2401":1.280618181248341,"2402":0.1419380293244581,"2403":2.2854709967979416,"2404":0.10304959992875967,"2405":9.671926781032152,"2406":8.739473690148515,"2407":0.4677504257835688,"2408":-0.6419991995947265,"2409":-0.8374558428158105,"2410":-7.766994086437314,"2411":-0.5392856277301485,"2412":1.2985604444192307,"2413":-0.12263312537428704,"2414":-0.015573548659156234,"2415":-0.8390858348325759,"2416":-1.227314416550631,"2417":-0.5254091192202038,"2418":2.2846159196070115,"2419":-0.9443753732650703,"2420":1.7173181064624934,"2421":1.8682960309357854,"2422":-2.179370791200713,"2423":1.5907154638593284,"2424":-1.0469210243010683,"2425":3.556665925613837,"2426":-0.19593933792846358,"2427":0.2751745964728899,"2428":-2.165215453239783,"2429":-3.53012490935711,"2430":3.4270841719228016,"2431":-2.5292497632768853,"2432":6.478512385683319,"2433":0.19854042652513032,"2434":-6.770459034800383,"2435":2.851805004698713,"2436":1.0930121297637372,"2437":-1.1945958566186505,"2438":-0.9471097798703476,"2439":0.6031066494266449,"2440":-2.317836039516796,"2441":0.2572758420211313,"2442":-1.68995598281444,"2443":-1.3126444087980977,"2444":0.9367449774653733,"2445":0.508651089178217,"2446":3.4836360963331567,"2447":0.3318727036997112,"2448":-5.064944070491586,"2449":-0.34554952134439815,"2450":0.2836704262393363,"2451":2.847931302519721,"2452":-4.688860737324752,"2453":-0.29085986070295267,"2454":1.2965799243822105,"2455":1.9785033646488315,"2456":-5.118680983114206,"2457":-1.6601284761276347,"2458":-4.706103595391981,"2459":2.502637557146663,"2460":1.4031039263271694,"2461":-2.8636868673363023,"2462":4.262778822225164,"2463":2.277898125667915,"2464":2.4530215532630124,"2465":-1.0320655950179727,"2466":-2.5557054096972602,"2467":-3.3676967652413756,"2468":-1.6578694383845436,"2469":-0.7770806666843857,"2470":-0.6196776776923686,"2471":0.22515471772423848,"2472":2.4514503454312515,"2473":0.9814309517415543,"2474":2.1265072541153094,"2475":0.44365541223989596,"2476":6.628531891673429,"2477":5.955211880135245,"2478":6.82901181813592,"2479":2.829445266204602,"2480":0.0820220619286704,"2481":0.4386896791579156,"2482":-5.810904467298456,"2483":-4.220445600052043,"2484":0.5279215463089031,"2485":-0.13221892647559974,"2486":-1.1557051746826916,"2487":-0.6638806042268117,"2488":0.17496470838664002,"2489":-0.2658392065133251,"2490":0.7866775261248969,"2491":0.08686765228173708,"2492":0.27026195064337033,"2493":-0.6940978029735978,"2494":1.0155882057789993,"2495":-0.1370117280768072,"2496":-1.9725745262959937,"2497":2.57785506623015,"2498":0.1852918133530177,"2499":2.3785147922633105,"2500":1.8744563365340698,"2501":-3.36533605570648,"2502":-0.34340780103133006,"2503":-0.18831468742823135,"2504":3.255403864395097,"2505":1.4442563910705577,"2506":-4.055985603104229,"2507":-2.4959500800449255,"2508":-4.120093122575456,"2509":1.9459385129711513,"2510":2.9769842137519023,"2511":-3.2513412755519755,"2512":0.9429698485862865,"2513":-1.7214024391877991,"2514":3.4201540317804,"2515":3.307589310975692,"2516":-2.792079131628199,"2517":-0.8761237062903772,"2518":-0.8436998508503116,"2519":0.39741308610588405,"2520":-3.123972390175584,"2521":-0.9282668195556935,"2522":-0.06656228604015899,"2523":0.3226218638352146,"2524":0.1999343343657592,"2525":0.4672689588488808,"2526":-0.2123939124878444,"2527":-0.5618334887410026,"2528":-0.9420267117373577,"2529":2.5049711818247156,"2530":0.98053208766477,"2531":0.6496049268052358,"2532":-1.227896485531355,"2533":-0.894739751278706,"2534":1.4150743033875888,"2535":13.811369949803753,"2536":-8.059128176190034,"2537":-0.43448380205073167,"2538":0.14580263418494271,"2539":3.7205765263502584,"2540":0.9751067048808427,"2541":0.5200787716026326,"2542":0.5741847241689308,"2543":0.059223775008445084,"2544":0.6210339392937558,"2545":0.41026199038836425,"2546":0.44534193501718916,"2547":0.20434354710709302,"2548":-1.0797218378841555,"2549":-1.2905384734893004,"2550":2.075456583338012,"2551":5.7965237314848945,"2552":2.9267715986832985,"2553":4.87977561419638,"2554":-3.353530899014764,"2555":1.2106435028811116,"2556":-0.623956364937946,"2557":-1.3003981637758946,"2558":4.714118886056824,"2559":1.2507208199259403,"2560":-1.1687842231568732,"2561":0.20914137241300257,"2562":2.576099776400409,"2563":1.1133887553676018,"2564":2.800037464719004,"2565":-2.41171524492837,"2566":-1.357201055805874,"2567":1.7265212314932747,"2568":1.0924447986798724,"2569":1.2284699476439394,"2570":-1.4140109857709582,"2571":-1.7906192781693642,"2572":-1.0905929982142526,"2573":1.1621401067441033,"2574":0.48953219948846244,"2575":0.27594784974735015,"2576":-1.274016027131979,"2577":2.0879570189221113,"2578":0.10792554724772116,"2579":2.0026405238045144,"2580":0.5106143555005933,"2581":2.2621787517845444,"2582":0.5870112709589065,"2583":-0.4466192842023629,"2584":1.2910496248895387,"2585":-0.16862559334909377,"2586":-0.18831692932395394,"2587":5.118590473169265,"2588":5.088254151574484,"2589":-1.2286838775188011,"2590":3.4657197903412196,"2591":1.7536313589615335,"2592":7.363171769218375,"2593":-8.033666740152325,"2594":-1.3561932282076623,"2595":1.1285755419101389,"2596":-1.1121923420087407,"2597":1.9001699025323544,"2598":-0.5836117844920405,"2599":1.9876411018502176}},"b1":{"n":100,"d":1,"w":{"0":-0.6368083528048403,"1":0.6280452077143005,"2":4.066692439060908,"3":3.067067537867292,"4":-2.585599904591403,"5":1.6822191411849858,"6":7.28657675720245,"7":-6.272588086754009,"8":1.3054113234406635,"9":-0.413573115047001,"10":3.8682171401145506,"11":3.6664598708941476,"12":5.18796518982214,"13":-2.255911809884993,"14":0.8086884232686538,"15":-5.026814215923765,"16":-4.30685638071191,"17":-9.997648073684402,"18":4.731468004500242,"19":-2.6248512172753515,"20":0.46949357428438243,"21":-4.596170979571118,"22":-3.0709091707406073,"23":-3.903828508667496,"24":-2.84902389854567,"25":1.1269615746562092,"26":1.4015234862541968,"27":5.061797600666158,"28":-7.768218340124737,"29":1.0569795930955028,"30":3.7013062901997027,"31":0.6252284255961814,"32":-1.5839186733221977,"33":-2.414001749413486,"34":4.311109016831646,"35":-11.32553044446382,"36":-0.5040264118873711,"37":-0.10314460238558748,"38":5.445450597010178,"39":8.608917017730258,"40":-8.88905658268702,"41":-10.065841916502379,"42":2.057121931153479,"43":-0.4434688241251419,"44":0.9889532946137664,"45":0.23798281495595558,"46":-0.9684926338399535,"47":0.8733183508385982,"48":-6.667385383866112,"49":-3.8334752414277617,"50":3.934254546791752,"51":-8.152738368764181,"52":-2.7318844958276363,"53":-2.8406533271443264,"54":-1.4020237375551827,"55":-0.757356047089217,"56":-6.347658631450106,"57":-0.17511341233880773,"58":2.6175970157221746,"59":1.0766611474621761,"60":-3.983136558824584,"61":11.625065989541508,"62":0.6572702829528657,"63":-3.1617772359339646,"64":7.355541433817464,"65":0.3482634355592147,"66":0.3778725116832111,"67":-2.362041571537032,"68":5.753679445726626,"69":-1.7716448946285226,"70":4.001491238751097,"71":0.993288377206187,"72":2.6178537378317084,"73":-0.7287533286543028,"74":2.737895303006625,"75":2.663433332653454,"76":2.5519427269753683,"77":2.0092514545909914,"78":1.9668139469107373,"79":-5.768903133175919,"80":2.7024410469845517,"81":-4.688902405468023,"82":-0.2181059126040068,"83":9.495662314114913,"84":-1.406642029183317,"85":-3.1467365129430713,"86":-3.4268407284052183,"87":-7.77356970895496,"88":-5.9230227852688895,"89":0.841687798207114,"90":-0.685086379018929,"91":5.540404504470836,"92":5.362340360601585,"93":3.58930795067499,"94":0.707068597774121,"95":1.2007353212926797,"96":-2.047099955048824,"97":-10.992202848002007,"98":-3.2375831526919936,"99":0.6598490413496284}},"W2":{"n":4,"d":100,"w":{"0":0.12871950664078313,"1":-1.4844967974400847,"2":0.5789316035338521,"3":-0.2449599810503086,"4":0.14153874021560003,"5":-0.07888383165599708,"6":0.6188499920795631,"7":-0.8599960978010731,"8":0.21390779683073358,"9":-0.6130093345504083,"10":0.4029202734434017,"11":-0.6123390597889325,"12":0.8830225251716612,"13":1.4996260711735485,"14":1.0167288958120368,"15":-0.6651483353136051,"16":-1.1066524090588068,"17":0.05643265405390541,"18":-0.26053104213495054,"19":-2.6781611336686315,"20":1.409278754829415,"21":1.098221553419297,"22":-0.2231649951585809,"23":-0.113377547345678,"24":1.5729086007407491,"25":0.33135425053015044,"26":0.34948800826977944,"27":0.5151107062607616,"28":0.22725552273759952,"29":0.5981644631949292,"30":0.6965209000083238,"31":0.37216932791506013,"32":-1.3146993148885582,"33":-0.24932599284625948,"34":1.6887055487415046,"35":-1.1346007502238726,"36":-1.3451968151795872,"37":-1.2167641138239569,"38":1.141608749136672,"39":1.3101884491754814,"40":0.19394989774570795,"41":-0.3953995445250955,"42":0.2825801343932127,"43":1.8764921255716538,"44":-1.4338815797830429,"45":-0.9164108484606243,"46":1.5888769667010019,"47":-0.13207946759478612,"48":-1.504993907462999,"49":0.3086614712688007,"50":1.2161675485745234,"51":-1.624058862916979,"52":-2.550109765721939,"53":0.8122523212398507,"54":0.20186752132432542,"55":0.3963528714804274,"56":-1.019769180478784,"57":1.2454267600759183,"58":-0.6886525719675418,"59":0.399951009538904,"60":0.9247948196600103,"61":-0.002638393189286663,"62":0.5929364078888221,"63":0.1589396409064137,"64":-0.0920961510866861,"65":-1.5117306788758782,"66":-0.14690026054745653,"67":0.18723463190791748,"68":-0.09005424162335787,"69":-0.29051229970408393,"70":-0.008643756113043721,"71":-0.6454476493589356,"72":-0.3139080835441711,"73":1.1628619735881,"74":-1.6848072553746503,"75":0.16119271330874585,"76":0.5174580789483599,"77":0.5943372754841074,"78":0.9144145126666404,"79":0.2759885230735373,"80":0.540407100486863,"81":0.7610757011560803,"82":0.8704043506571435,"83":0.014790077336885582,"84":-1.9447676181786318,"85":0.7045231728874862,"86":0.0070693466124058975,"87":-1.2732542756813876,"88":2.372851102935966,"89":0.9300346272296899,"90":0.023385649319100466,"91":0.07291690458579149,"92":0.8766623335014574,"93":0.10244670295870881,"94":-0.3893069374821957,"95":-2.386905917200533,"96":1.6002032190021949,"97":-1.508411745632896,"98":-0.5214177845961318,"99":0.735069197964783,"100":0.005282341737612398,"101":-0.2681728797729169,"102":-0.24453688570485901,"103":-0.09955941022829053,"104":0.3381904428363319,"105":1.0123851971165,"106":1.0278199791421785,"107":-0.021737601660898512,"108":1.888827217966893,"109":1.7583806778586026,"110":0.07303996108862504,"111":-0.14144580036213253,"112":0.14115721097914347,"113":-0.2509244831432443,"114":0.9322345418375884,"115":0.7744710280770549,"116":-0.8644509826945257,"117":-0.2553125829765028,"118":-0.6391094695651436,"119":-0.6714735761704009,"120":0.6340430662924151,"121":0.4653073904947902,"122":0.21531454626664043,"123":0.3028708660357056,"124":-0.04703854307710496,"125":0.05026598260760067,"126":0.22377788743079408,"127":0.4339436506100186,"128":0.2865130494131403,"129":0.2854123866289223,"130":-0.11241494350487136,"131":0.01837149296123916,"132":-0.014247188272956677,"133":0.09794483133738821,"134":0.7130168947529146,"135":-0.08865503267863781,"136":-0.24505222847381372,"137":-0.22420919864446723,"138":-0.32866902313490315,"139":1.1500969728279824,"140":0.4306958474622119,"141":-7.984043696475472,"142":-0.4423317038960151,"143":0.09052409635300064,"144":0.3016818158460399,"145":-0.09018587281153764,"146":-0.3076815728630639,"147":-0.5142568845372649,"148":0.6731346604311189,"149":0.7505060033649396,"150":-0.29537833145703196,"151":-0.43051230208883023,"152":0.05903550221815493,"153":0.9799065341000904,"154":0.05904463450538698,"155":-0.9833045700533835,"156":-0.7358259001077354,"157":-0.5392502827243425,"158":-4.306263504427861,"159":-0.2100221122613092,"160":-1.42105986705905,"161":3.3678013948501024,"162":0.30247278244546844,"163":0.06141027735595105,"164":-0.09753603560954723,"165":0.12664596312911497,"166":-0.19103958441863922,"167":0.3356507526701849,"168":-0.37989526747511787,"169":0.11100532829255357,"170":0.13733827222042297,"171":-0.6649427945284775,"172":0.549638791682814,"173":0.19159101087240674,"174":0.7487852560531414,"175":-0.14787843369791237,"176":0.39103486631216455,"177":2.2118295652149857,"178":-0.07424371175914067,"179":-6.847744260576796,"180":-0.36779763967776186,"181":-0.178067022847353,"182":-0.5090187501224801,"183":0.6042215057068344,"184":0.05850166097373623,"185":-0.13487010555589238,"186":0.04381932212669806,"187":-0.33594349127967876,"188":0.28734434593560104,"189":-1.3271528609910181,"190":-0.33283818429552814,"191":0.5073475972055503,"192":0.15223321057149436,"193":0.13955997699533407,"194":0.2650988996923404,"195":-1.9145184348760256,"196":-0.37579077051183046,"197":-0.0735473357530106,"198":-0.43645529657194915,"199":0.9204427198073173,"200":-0.6003796327068962,"201":-0.5681567469200764,"202":0.42732380425756117,"203":-0.5413727314924639,"204":0.9622103912121603,"205":0.688333992394678,"206":0.5516052592254139,"207":-0.32982530321770587,"208":9.055905504986574,"209":0.5198772152068608,"210":1.3485146177246439,"211":-0.5039663717558291,"212":0.7036026669701383,"213":0.6899571684347674,"214":0.48965453039081747,"215":-1.2255921244886274,"216":-0.562308782983866,"217":-0.2296629601980858,"218":0.65692191721051,"219":-0.4175257181242568,"220":0.9152031020773873,"221":0.9186663490797318,"222":-0.6817597839920183,"223":-0.5773492173695285,"224":0.3798804883429978,"225":1.2458648072884229,"226":-0.289964893825871,"227":0.2906334478873367,"228":0.37246935861044994,"229":-0.4498629188046035,"230":-0.5891492092602262,"231":0.6677949733306368,"232":0.15796450570240608,"233":-0.38147887709309675,"234":0.27461860143523653,"235":-0.1922848576199536,"236":-0.3514920457451136,"237":-0.3437289493174012,"238":1.1907205898225606,"239":7.679425214477825,"240":-0.7293469713882973,"241":-0.47031350675705774,"242":1.8111981852392267,"243":0.7112430895411865,"244":-0.23097391538151252,"245":-0.4466676078710242,"246":0.16903453997457243,"247":-0.4052260983411663,"248":-0.27259226632878814,"249":0.3265409159633483,"250":0.2842412190740456,"251":-0.5381897611459351,"252":0.5157272637075802,"253":1.4876929425571885,"254":0.33173674673758086,"255":-0.2680305399657074,"256":-0.27403046689388866,"257":0.08366719694234305,"258":2.6449910187398684,"259":-1.0002475394701276,"260":-0.6823928474054275,"261":0.2315755514142291,"262":-0.6900535060155607,"263":-0.49411157569437036,"264":1.000416659831835,"265":0.32358477297925775,"266":-0.583379231505239,"267":-0.2929981652253986,"268":-0.9806511577134426,"269":0.3662414124211648,"270":-0.6841078318200241,"271":-0.584062913774471,"272":-0.17667414843838702,"273":-0.22008511900610916,"274":-1.4795440707005587,"275":0.5706687751237807,"276":0.40531400975217474,"277":2.277736466559928,"278":-0.8089875221112699,"279":-7.574095899965693,"280":-0.8469241080632173,"281":0.45460179349658575,"282":-0.8786838603469596,"283":0.17634630324579076,"284":0.3837588314256955,"285":-0.4429160774995708,"286":0.37295561434005986,"287":-0.37347281008575023,"288":0.8132354865155117,"289":-0.16042420022310522,"290":-0.5084490975085358,"291":0.5594206603624207,"292":-1.4078238064532818,"293":-0.4628067636696943,"294":0.21628534927859083,"295":0.05242782953026819,"296":-0.40001880622193,"297":-2.3734560839982386,"298":-0.4883270060913371,"299":-1.2200823095879627,"300":-0.3279907454892192,"301":-0.45604176687121456,"302":0.4325608717233908,"303":-0.07946661868732109,"304":-0.017927871112221133,"305":0.38472374305999724,"306":-0.30462330758481393,"307":0.4402929983944079,"308":4.893293206243045,"309":0.2870084445917142,"310":0.6319414265802337,"311":-0.03798641229603612,"312":0.17358503767666722,"313":0.24140119130201393,"314":-0.269977149098159,"315":0.2878475067967955,"316":0.04428718366994649,"317":-1.765956061132352,"318":-0.4386362317455544,"319":-0.05994223414289164,"320":-1.3365931394678385,"321":0.03364813878659899,"322":-0.299240585614072,"323":0.13953554785550282,"324":-0.028961728223170197,"325":0.13206330343706946,"326":0.03222301356917543,"327":-0.44584279522214004,"328":-1.5115735859568649,"329":0.062377690104834765,"330":-0.23129835918597907,"331":-0.36555040290422486,"332":-0.06423372626540279,"333":-2.453817759063053,"334":0.030673977287357494,"335":-4.415914510981239,"336":-0.17822410532865077,"337":0.16711724315957463,"338":0.6598912206933258,"339":-0.20647764691633136,"340":0.10055673872876249,"341":-0.1620164318820976,"342":-3.096606313861426,"343":-0.9856935783138622,"344":-0.03637959044899858,"345":0.2498306386051226,"346":0.23517816152723567,"347":0.011794345884600483,"348":-0.18990156756106147,"349":0.1394966776330358,"350":0.08786863631557465,"351":-0.33747108667212605,"352":0.5849318361547139,"353":-0.8189329991438493,"354":1.8683268639662327,"355":-0.07017068956127406,"356":-0.16072350153255816,"357":-0.40860503046641966,"358":3.730197192711479,"359":0.04951686164313678,"360":-0.09423364008928432,"361":0.06070304179269779,"362":0.2859296967002649,"363":-0.15748990326380463,"364":1.9341003342619785,"365":-0.15746093031615194,"366":0.27268994022816245,"367":0.1423160988235841,"368":-0.3549044547437002,"369":-0.3049144792005706,"370":0.07396943028460021,"371":-0.22068572476563209,"372":0.12692730022261542,"373":-0.16225421375240548,"374":-0.7939603503172886,"375":-0.14045264634257734,"376":0.09281858586514789,"377":1.6823950474865708,"378":0.060317371149093746,"379":-4.557717616912686,"380":0.04524352573666357,"381":0.12924611211165005,"382":-0.2808285708384106,"383":2.764239731197285,"384":0.3443509213774184,"385":0.008542346936572855,"386":-0.3887357203804043,"387":-0.4398791054709238,"388":0.2359427144009627,"389":0.0638595501705061,"390":-0.28894097459611895,"391":0.2864637962661823,"392":-0.0974619088085658,"393":-0.20814934178702654,"394":0.4926052182398759,"395":-0.2051047552109187,"396":0.19317313978482462,"397":0.08847430212671556,"398":0.11554081779283511,"399":-0.32243770676192607}},"b2":{"n":4,"d":1,"w":{"0":0.958937659059747,"1":3.7960602724483747,"2":-3.399670616823363,"3":1.4004244050814165}}}}
/* harmony export (immutable) */ __webpack_exports__["a"] = data;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const data =
{"nh":100,"ns":82,"na":4,"net":{"W1":{"n":100,"d":82,"w":{"0":-1.145952755107516,"1":-0.4376081508225643,"2":-0.007920265174957553,"3":-0.7775195174649078,"4":-0.9506407588688986,"5":-0.968010860301908,"6":-2.6918158873282563,"7":-0.7431428809376434,"8":-1.5005473247243273,"9":-1.1238995655924227,"10":-0.347154883518617,"11":0.30981333481408,"12":2.0675786288614755,"13":-0.17417269832816004,"14":2.7456379240225486,"15":-0.676815649332452,"16":-2.309467615365306,"17":-2.3410211683809417,"18":-1.647746432494097,"19":-0.13356977980879334,"20":0.5181641866009631,"21":0.4362678106428555,"22":0.6827496136397008,"23":1.1358211709185793,"24":0.5452701986935545,"25":2.099832304806032,"26":0.03848688361846758,"27":1.7635183248490407,"28":2.6445525778953645,"29":2.739290274928228,"30":0.8032313203100772,"31":-1.9310877944379805,"32":-0.3086325669036704,"33":0.6428509078110665,"34":-0.22004618588851388,"35":-1.6599938011512325,"36":-0.3232594722774771,"37":-1.8415279531743936,"38":0.22430170963057436,"39":-1.236943994995727,"40":2.9319924716400685,"41":-0.09062685853703023,"42":0.875803722728809,"43":1.018874205818949,"44":1.0435387444270996,"45":-2.2406446843039656,"46":-0.10322317284697693,"47":-1.2625735702673253,"48":0.3541174875314707,"49":-1.753928853283511,"50":1.1062409419817927,"51":0.9439342802555059,"52":2.4258323627203007,"53":1.246935942890612,"54":-0.34047589543445583,"55":-0.6208066133491902,"56":0.8996807423384687,"57":-1.4130938906282164,"58":-1.3243566144963668,"59":-0.5920318402462671,"60":-0.1826297169086592,"61":-3.1255178334791056,"62":-3.02533707990888,"63":-0.7743444966264925,"64":-0.017273390180986125,"65":0.49113665149803315,"66":1.1593781496733986,"67":-0.521506346708085,"68":-0.3308047105285894,"69":-0.11891107060883213,"70":-1.037424192376154,"71":-0.7416142692560773,"72":0.8769226285679145,"73":1.229375601091085,"74":0.6320480749875258,"75":1.4823139293197762,"76":0.44658737333919696,"77":0.03313284119003086,"78":-1.3199345482232687,"79":-1.0218822555772553,"80":1.221964782032327,"81":1.4426757023666987,"82":-0.027328310745228946,"83":0.7696225457745459,"84":-0.17572124762522062,"85":1.9230552914537917,"86":0.09072563084441611,"87":-0.3008978297756482,"88":-0.07229437224688354,"89":-0.47588948079319027,"90":-0.5818723173537963,"91":-0.5827861862746401,"92":-1.214673198250842,"93":1.4896495232511986,"94":1.6986576870986392,"95":1.095959537047865,"96":-2.414556077198267,"97":-0.21619299781186319,"98":0.3524921047100583,"99":1.9371617419758562,"100":-0.15986661366573018,"101":0.6136090252340148,"102":2.750533223289578,"103":-2.026390507390208,"104":-0.4846413338789208,"105":0.8174302245498314,"106":1.0149573070999853,"107":-0.8487091578189666,"108":2.083396169650699,"109":0.4985008565991681,"110":-1.8338015564455696,"111":-0.626976499689095,"112":-0.10220013128601954,"113":-1.4143577534187621,"114":1.5810837228326902,"115":-0.9453112652810699,"116":0.8728672595188869,"117":1.2649718880566956,"118":1.9906611032132564,"119":0.4223457819546351,"120":-0.33217380788890466,"121":1.3629673155006827,"122":-1.8763175383863506,"123":-0.9450385930236432,"124":-0.7965698419925743,"125":0.2394621928349574,"126":0.0745036492260144,"127":-0.42180046931318693,"128":1.9357701088996373,"129":-0.1182562021216412,"130":-0.9367417508677837,"131":-0.46322672880971644,"132":-0.3726492368925112,"133":-1.4098618407306616,"134":1.485553835543327,"135":-1.4349467573183867,"136":-1.6614871381855543,"137":0.20011268854000913,"138":-0.9801278961983161,"139":-0.6120407008841002,"140":0.6683649002285669,"141":0.6574097790371969,"142":-1.2459923627972744,"143":-0.2100715875391022,"144":-0.9944667829778002,"145":-0.5618611229172583,"146":-0.008249425577970064,"147":0.47981824891041724,"148":-1.184747017843953,"149":-0.23110782350736514,"150":1.9722936453292519,"151":0.035116245807706295,"152":0.5343207716985939,"153":0.8382744660072953,"154":-2.153897681378826,"155":-0.1965697376917988,"156":0.8233655927128368,"157":-1.5361197284686088,"158":1.2035116161330983,"159":-1.12620138322943,"160":0.5676304134351532,"161":-1.5889991795022744,"162":0.34497412887889406,"163":-1.3884133879609266,"164":-1.337637440972842,"165":0.16726985621434842,"166":0.7224446741637742,"167":-0.08058905574307422,"168":0.007537386753252399,"169":-0.1396840709593419,"170":0.9597788122184171,"171":1.0231323354122595,"172":1.6358427685269765,"173":-0.33776090198031916,"174":0.23144784476066413,"175":0.3071209901629839,"176":0.5143778966137494,"177":1.321140574015826,"178":-1.450887872907874,"179":1.3471124351610966,"180":1.4718097048975798,"181":0.534985420506419,"182":0.6303364393270753,"183":-0.3350575051736837,"184":0.6686169251489338,"185":0.8457443610784495,"186":-0.14181675192759866,"187":0.999919622046142,"188":0.05014766425141918,"189":-0.18768823912127677,"190":0.20203609972918174,"191":0.8512349157481437,"192":-1.3781219918225027,"193":-0.5644162873385425,"194":4.370219129988114,"195":3.2811505174725264,"196":-0.7468922042116009,"197":0.3301509281679284,"198":1.1101850609656234,"199":-0.016567437798397464,"200":1.038100758522971,"201":0.7083622862642286,"202":0.5123097777556938,"203":2.5512184835504996,"204":-7.525890343750405,"205":-6.35036160016224,"206":-2.2989668991976933,"207":-0.6826150829754046,"208":-1.0808776002732896,"209":-1.0460521829660943,"210":0.7469180163389315,"211":1.0196933599817317,"212":1.0472879072921426,"213":3.2000393737938504,"214":2.9670741474140043,"215":3.0469565622539374,"216":1.1579753357450495,"217":-0.26751847294090014,"218":0.5142547457305497,"219":-0.836273945242988,"220":1.1289456452272904,"221":0.8138111793619364,"222":0.7440207481919162,"223":-0.14006826516258106,"224":0.061449058059082955,"225":0.5814279549985554,"226":0.10935702316090401,"227":-0.4006575130704576,"228":-0.1272041237376971,"229":0.7823171983639386,"230":-0.10911392716262276,"231":-0.670488361149863,"232":-1.2123266846354799,"233":1.0767593408573797,"234":-0.048917708495273514,"235":1.5627033174080145,"236":-0.055775233973444895,"237":-0.12582590474540237,"238":0.09418282937012176,"239":0.1575060450202851,"240":0.7682971231769855,"241":1.2109570897837645,"242":-1.2902587389547877,"243":-1.4497225466713959,"244":-0.07430154560428513,"245":0.2583853842067513,"246":-0.02954223714400529,"247":1.3221503164850013,"248":-0.9460009285622155,"249":-1.671379188210346,"250":-0.6912610635475079,"251":0.318384906931675,"252":1.6199957985782925,"253":1.6293587492298656,"254":-0.7475758654841455,"255":1.1704041846618358,"256":0.07272826366760689,"257":1.7789419494374155,"258":-0.18783084869855945,"259":1.7511587642771538,"260":-0.12965423098687384,"261":1.498904573763183,"262":-0.09449021869530848,"263":-0.25457687829785436,"264":2.181896243262854,"265":0.6713498064004628,"266":-0.9999329708844243,"267":1.5009447224369958,"268":0.07678261412394842,"269":1.1632659395085783,"270":-0.8678897350213329,"271":-2.2436043786158653,"272":-0.06590002712714658,"273":-1.7181382841045214,"274":-0.4189442377283678,"275":1.2970441271545143,"276":-2.392045498200504,"277":-1.330874011842996,"278":-3.5685277050114697,"279":-1.600249384300983,"280":0.3040254138859771,"281":0.5691476858754887,"282":-1.4211086668464263,"283":0.7936214100786063,"284":0.052394575389155075,"285":-3.1151312256416532,"286":-4.639880197682509,"287":-3.673442493295047,"288":-1.4311208514861584,"289":0.11721552939428448,"290":-1.308622044535474,"291":-0.6101740329580964,"292":-1.085478567686704,"293":-1.5465249742552278,"294":1.269301282414104,"295":0.6701097723481912,"296":-2.247992938045631,"297":0.41462003551795185,"298":-2.060221815240241,"299":0.6844808042025451,"300":-0.20722200864053011,"301":-0.25883981926646393,"302":0.42000198447143017,"303":-1.1160825657723148,"304":3.2655140003525385,"305":-0.35657399783416505,"306":0.03819113535238764,"307":-0.4565079510700061,"308":-0.9562632408637552,"309":-0.525231431101812,"310":-1.740254876803643,"311":-0.9016047489476499,"312":-0.34838613630185683,"313":-1.541572254424799,"314":0.19762391056679848,"315":-0.9986799851354404,"316":-2.1714513921454417,"317":0.5294960954261644,"318":-0.5668179141138204,"319":1.9037257132396408,"320":-1.551982712429925,"321":-0.28512077197192476,"322":0.9495945962884352,"323":-0.7061638895072669,"324":0.2751647981008055,"325":0.5259349922349547,"326":0.5811186165751875,"327":-0.4041983890872594,"328":0.39881195206977577,"329":-0.960518585996106,"330":-1.5351449985036596,"331":-0.8985714971146511,"332":0.10226545996019208,"333":-0.30662439182908263,"334":-0.7844396031703698,"335":0.14950401945829717,"336":0.7995716739379806,"337":-0.4887364914995665,"338":-0.08376767378561469,"339":-0.2505921042209622,"340":0.3543539099367631,"341":-0.7561425104391301,"342":-0.08001516414360293,"343":-0.08941663722679652,"344":-0.35281824335872547,"345":-0.7392241406858431,"346":0.3771226628883015,"347":0.06912123591228597,"348":0.5197646809001069,"349":0.4009988205915547,"350":-0.8736518925720609,"351":-0.9607214207001398,"352":0.38262341668544103,"353":0.32308503338534844,"354":-0.32964308725016095,"355":0.21784238513101065,"356":0.12734966682783286,"357":0.18589733283173807,"358":0.8520699402057554,"359":0.689761355810493,"360":-0.03679293415721698,"361":0.5186734564971053,"362":-0.590832515606118,"363":-0.1741780037142181,"364":-0.0876683940773895,"365":-0.8341309971900643,"366":-0.03804115213076806,"367":0.8793006292783503,"368":0.9430675230587999,"369":0.901326685237438,"370":-0.061772757518613435,"371":-0.5526077218059923,"372":0.735451431474124,"373":1.117607066452954,"374":-0.6529107948488918,"375":-1.0021025980404483,"376":1.430239935776832,"377":4.477610825599053,"378":2.612150649082433,"379":1.163803735388919,"380":0.9533294638880264,"381":0.4722941319741503,"382":-0.20889553963614654,"383":0.09594767571287585,"384":-3.260122524030108,"385":-4.51972742869414,"386":-4.541958076489366,"387":-4.481247492647751,"388":-1.8145832135527462,"389":-0.2506287568429034,"390":0.19450414168826838,"391":0.5745011238910844,"392":0.20776849818317597,"393":-0.4795572862761925,"394":0.10067716273413028,"395":-2.1823695401231498,"396":-0.832810418576561,"397":-1.535369331196219,"398":0.25643307559123835,"399":-0.843768734871186,"400":0.47557714401342527,"401":-1.1403762490519664,"402":-1.238925415736458,"403":-0.6489582681383728,"404":-0.462330564828182,"405":0.15930614240310945,"406":-0.6043082858931671,"407":-0.7843447391868108,"408":-0.8064921901489955,"409":-0.6801485406001896,"410":0.16241938843171252,"411":-0.6990115380505946,"412":1.3122543799296644,"413":-0.5355988036101363,"414":0.24445757420467276,"415":0.179104627811985,"416":0.13929308621365688,"417":-0.052477839439324034,"418":-0.7530756019467348,"419":0.4167008012990086,"420":-0.24938170046810323,"421":-0.6776296046026791,"422":-0.11147837263465296,"423":0.2681725464659555,"424":-0.30639669635219335,"425":-0.0612393708529419,"426":-0.10997233057858538,"427":0.6609585590474217,"428":0.5273753192950814,"429":-0.17665118706082875,"430":-0.10009595549161658,"431":-1.6390122726359675,"432":-2.3570765440374757,"433":-2.0096284499317276,"434":-1.8522001902675822,"435":-0.07889161874781216,"436":0.47562673409052686,"437":-0.8235687465998741,"438":0.44237624250208246,"439":0.7585673463538333,"440":4.940082814334234,"441":8.78370333741264,"442":7.947974825677156,"443":4.525432507458707,"444":5.030092852647747,"445":2.1021888217426636,"446":0.008243415465034211,"447":0.41319963048290514,"448":-0.4524092293552503,"449":-1.262241193490229,"450":-0.5978762767769223,"451":-0.9104695091578087,"452":-1.0919424336828887,"453":-0.04886134324042076,"454":0.27455023141419604,"455":-0.12121465111937255,"456":0.3791258534331041,"457":-0.28256226260024975,"458":-2.218753293488919,"459":-0.6039307309793769,"460":-0.8223623289191756,"461":-1.2314995873408041,"462":-0.5744409376774392,"463":-0.2957209257352972,"464":0.2244355486385423,"465":0.43556802804831746,"466":-0.07597355792327612,"467":-0.34908488242948676,"468":0.42703893376392527,"469":0.22824103222789083,"470":0.6767632018838045,"471":0.546100503949508,"472":-0.7120568908697392,"473":-1.1320768327255188,"474":-0.38560685135121475,"475":0.896510518008881,"476":-0.0552869102577592,"477":-0.6505035623271981,"478":0.5274296977204643,"479":0.1755690316658459,"480":0.2297136509548829,"481":-0.3059143518418534,"482":0.2322532240431723,"483":-1.15864155027332,"484":-0.01125167139879312,"485":-0.22005015194575805,"486":0.5416144168831065,"487":0.24986481418182654,"488":-0.3628040986444128,"489":0.5628156485086667,"490":-1.1023021779631381,"491":-0.03237704966047507,"492":-0.7534053218337183,"493":-0.5665924037879626,"494":-0.12088313296947648,"495":-0.15358376355969233,"496":-0.08952149298959759,"497":-0.6260482505780329,"498":-0.7507793879050131,"499":-0.553273037695475,"500":-0.05224503232034595,"501":-0.38753945843811854,"502":-0.016376381233373705,"503":-0.102807490851359,"504":0.36842259952712947,"505":-0.3015407489306241,"506":-0.1735410367920311,"507":0.5578758469709802,"508":-0.8063681180353551,"509":0.11213278940196,"510":-0.170962170168931,"511":0.7002217242902108,"512":0.1621587797958814,"513":-0.31751261430330896,"514":-1.50783602202531,"515":-1.0253382946109604,"516":-1.4481777944583156,"517":-0.3619010996522274,"518":-0.049752200260922905,"519":-0.3933234675959749,"520":-0.11426261569909403,"521":-0.36643256547113334,"522":-8.452826924009958,"523":-4.967723310832142,"524":-3.8198546243408984,"525":-1.379999599700381,"526":-0.17636631384852777,"527":-0.40038038336952037,"528":0.1765619840230552,"529":0.40767585470959733,"530":-0.888727031167286,"531":-2.022603625101929,"532":7.81097115959561,"533":1.4717379685967105,"534":-0.6910137875850485,"535":0.08920152177418215,"536":0.22180615136458323,"537":0.10991195525327813,"538":-0.17841334292547442,"539":0.6095286740921507,"540":1.6670130070487097,"541":2.2399571580399527,"542":2.46797113920395,"543":1.183283627348228,"544":0.040715602360040494,"545":-0.041273545650476855,"546":-0.4427649345775682,"547":0.47396392912466134,"548":0.22633672256032797,"549":0.3863607965637059,"550":-0.13106542039170835,"551":0.2873821818882777,"552":0.6184099909994125,"553":0.3324601543140575,"554":-0.016998342454412556,"555":-0.39850802077072045,"556":-0.6426747906253958,"557":-0.693359286868475,"558":0.5581195798927664,"559":0.032762543627534016,"560":-0.11444813885743058,"561":0.6525719368184865,"562":0.36261230682205237,"563":0.5273379174138532,"564":-0.8424963602054486,"565":0.7603539711839118,"566":0.21042929857232667,"567":-0.21620310897507783,"568":0.12615542577089955,"569":0.009635266913311416,"570":0.5280389841262181,"571":0.26612836987596267,"572":-0.26330794017093845,"573":-0.7650077370792342,"574":-0.169730810665289,"575":0.4411449002793049,"576":-0.9169007428638745,"577":-1.5202535839013385,"578":-1.0680738654833684,"579":-0.8276484141866365,"580":-0.519043453856237,"581":-0.5982441011325341,"582":-0.666819406209904,"583":-0.11192402902500816,"584":0.4691978106456861,"585":-1.8242676781410245,"586":-1.3194562653167832,"587":-1.3832557871890658,"588":-0.6338228446686065,"589":-0.721111259307771,"590":-0.22815521960781945,"591":-0.3331027567353995,"592":0.15556093362277412,"593":0.25419072843202756,"594":-0.19716699450987152,"595":-1.6308210707051822,"596":-1.4816347553016482,"597":-0.638875329238236,"598":-0.5987543138756891,"599":-0.623503235815011,"600":-0.36579598214183395,"601":1.0063496067120374,"602":0.7305757988109872,"603":-0.10827576365985633,"604":-2.0164351469117183,"605":-0.9426386456720034,"606":-0.6387290471573912,"607":-0.3195854836874207,"608":-0.6191815045723791,"609":-0.2188911109599179,"610":-0.20556672639390133,"611":0.6675470398145984,"612":3.5143449873694577,"613":-1.5138634039250631,"614":-0.6281685554282426,"615":-0.4638177322563076,"616":-0.7830647727963652,"617":-0.5123145359560874,"618":-0.42197517938031787,"619":1.2895898817159825,"620":1.6719049254833243,"621":1.8901307881183567,"622":-1.506849713183829,"623":-1.300608107806827,"624":-0.5230239897206771,"625":-0.4462570324703024,"626":-0.5651501438591704,"627":-0.4987996618884546,"628":-0.7948885801186508,"629":-0.41386982051517374,"630":0.8866014394019479,"631":-1.8665622913934887,"632":-1.1209822382025347,"633":-0.8275144832059191,"634":-0.7532874878696122,"635":-0.39099602876092265,"636":-0.8358881312778491,"637":-0.16102057094286293,"638":-1.3530538040886846,"639":1.5239800826289778,"640":-1.3971834952821538,"641":-1.8079247305237964,"642":-0.6077319168841577,"643":-0.6222151882821787,"644":-0.8132176620104083,"645":-0.9036699858531633,"646":0.9368983747971639,"647":-1.715249394165897,"648":0.36867540220048384,"649":-2.162942683141536,"650":-1.0833542703247239,"651":-0.8417901411617871,"652":-0.7356767044143221,"653":-0.26563738400178144,"654":-0.8559378487808724,"655":-0.8394335222373019,"656":-1.045969624568672,"657":-0.8604102618529421,"658":-0.9993249014348293,"659":-0.37904251915159864,"660":-1.5086368498107963,"661":-0.45944142195055304,"662":0.06897143052142768,"663":0.15069394012462292,"664":-0.8759597601799807,"665":-0.680517155766787,"666":2.564693494954848,"667":-0.3517466206104208,"668":-1.019909428367996,"669":-0.5294128419948592,"670":-0.9240994678396246,"671":-0.09561367710357156,"672":-0.5645248765818954,"673":-0.3269180948505422,"674":-2.123129723442307,"675":-0.9685571544489222,"676":1.7065318682801918,"677":-1.5231527853227194,"678":-1.4444785750714717,"679":-1.0440453596707422,"680":-0.18051311407026494,"681":-0.23992126342102268,"682":-0.2985269439188237,"683":0.2878497056417402,"684":0.366273014196107,"685":-1.8409338101179304,"686":-1.384942743574947,"687":-0.8812307374437018,"688":-0.7751375151009312,"689":-0.15328119655767322,"690":-0.6299181172190823,"691":-0.015049829984164967,"692":-0.49336203213194313,"693":-0.21181792147613326,"694":1.6578792965027889,"695":-0.057113035771200436,"696":-0.8685288490652715,"697":-1.1759353132835482,"698":-0.37083676924910214,"699":-0.3560825420638005,"700":-0.10894596568614487,"701":0.47689667695177423,"702":1.4133079834819406,"703":0.4941153929418947,"704":-1.6381764688028537,"705":-1.552097286235861,"706":-1.5129102755556898,"707":-0.44627581863485327,"708":-0.9001515115717099,"709":-0.1873812714377466,"710":-0.9333839146797921,"711":0.9810299065220913,"712":1.7205029479920806,"713":-1.3009835458672843,"714":-1.477035564373754,"715":-0.9262818625661481,"716":-0.6647767205755543,"717":-0.5433877318179234,"718":-0.3125786623854452,"719":0.7683937522654766,"720":0.4449634703552778,"721":-0.5877119141739356,"722":-0.9624480774573919,"723":-1.0255865097428554,"724":-0.6200105923669603,"725":-0.6258172058513518,"726":-0.09189477344831994,"727":-0.5487560565734262,"728":-1.0256939570792412,"729":-0.9171797548689089,"730":-0.6439483526754428,"731":-1.3048384264163444,"732":-1.0840946070221567,"733":-0.7732252799538877,"734":-0.505395963882512,"735":-0.047796981906395156,"736":0.10678297372975433,"737":-1.9628484471088228,"738":-0.3910381756143389,"739":0.001718579198490874,"740":-0.6517456823009161,"741":-0.22456712215898614,"742":0.14330657179540912,"743":-0.012220810687467248,"744":-0.0635068003397501,"745":-0.5057985424227194,"746":-0.5445162430481252,"747":0.28284010774586626,"748":-0.22719783717911476,"749":1.2845518535251474,"750":1.1978294833129242,"751":0.6616102485686074,"752":0.546710137083995,"753":0.08835241017086716,"754":0.7315984353250309,"755":-0.08191570960005254,"756":0.19142586473810708,"757":0.29819205046269925,"758":4.383558865153955,"759":2.0693756637176377,"760":1.416492205645418,"761":-0.14471938058946002,"762":-0.012199521222860572,"763":-0.6817259161951289,"764":0.42970572771079596,"765":0.20234083056004404,"766":-0.2936049198723163,"767":12.422062987195373,"768":9.004488963047923,"769":-1.0201728117217388,"770":-0.8420694300355528,"771":-0.30157693961330595,"772":-0.09622437369833609,"773":-0.01768355960675116,"774":0.19429559445791497,"775":0.39629648004407525,"776":0.1903982427352897,"777":0.9903504489227645,"778":0.28802631906865467,"779":0.1611919451324481,"780":-0.022162605530389286,"781":-0.14757984263216078,"782":-0.09178036840193507,"783":-0.17967754975982836,"784":0.018959674642995656,"785":0.3539666374571147,"786":-0.13952215547662924,"787":0.5178321509861527,"788":0.19310964355545276,"789":0.24996055786559765,"790":-0.5036121607699763,"791":0.393810515111494,"792":-0.8641665565015226,"793":0.5769578581886123,"794":0.16316364820578277,"795":-0.09259776768098246,"796":0.012937112405513108,"797":-0.13620064601774753,"798":-0.37043481807588763,"799":0.33821982571321,"800":0.9974174437173963,"801":0.4435497370016716,"802":-0.32541466077355974,"803":-0.5496473953337611,"804":-0.4365699560771262,"805":0.12061524568743108,"806":-0.3019091262521814,"807":0.21019380654322606,"808":0.1973117977730039,"809":0.05939665440658618,"810":-0.7574213704069791,"811":0.6650044868237031,"812":0.6039803222752723,"813":-0.5385601651044649,"814":-0.10164080051672493,"815":-0.2950435235523637,"816":-0.37708311726324595,"817":0.5149542259311388,"818":0.6683616184481467,"819":0.3474050086187703,"820":-3.3524146481801114,"821":-0.1560703128074763,"822":-1.5454408319280863,"823":0.17093231983285928,"824":0.18890514473468098,"825":1.6958822331364731,"826":0.9441717633307175,"827":1.0722927404188702,"828":1.4367049635952611,"829":-0.3025587126733081,"830":-0.49973661659836255,"831":-1.1448279330740958,"832":-0.8612683490794905,"833":-0.3006013728579058,"834":-0.45362845677968777,"835":-0.4642376268629442,"836":0.5948232819792991,"837":0.11127031161897814,"838":0.8644319535562571,"839":0.8221325630730436,"840":0.20623061407201376,"841":2.154552670672775,"842":1.2466003385097904,"843":-0.269515616278983,"844":-0.33680828064971385,"845":-0.10763911744150585,"846":-2.1440275082485276,"847":0.4455899159475476,"848":-2.6286316070119025,"849":0.16520820566866684,"850":2.2274752410713736,"851":-1.0911617267099445,"852":-0.8224018908472783,"853":0.3134718085273333,"854":1.5746651627244481,"855":0.13794885963707326,"856":-0.20938781660544867,"857":-1.2233605506284333,"858":0.24872512513200337,"859":-1.7978164220959503,"860":-9.274889567654379,"861":-7.861974924011498,"862":-0.6204259809863353,"863":-0.6172966236839829,"864":-0.026042328075038233,"865":0.44289174184416874,"866":-0.977554380123719,"867":0.8132788650555078,"868":2.0728062558584974,"869":-0.6632752392713234,"870":0.23584417669359795,"871":0.6367802931036001,"872":-0.8726806703896777,"873":-0.3394703224885622,"874":-0.7163039283231224,"875":0.5066449321010422,"876":0.18568303211492912,"877":2.699124962649188,"878":0.29474335003504337,"879":1.087172099519407,"880":0.4709889198900458,"881":2.1243848517228567,"882":-0.5288730286128022,"883":1.309326236590965,"884":1.0823190144575516,"885":0.49698357738274096,"886":1.3841647018627568,"887":0.2810266675998471,"888":0.18875057210377524,"889":-1.4019654365607483,"890":0.8924189903136004,"891":1.73688916266495,"892":-0.90188762857654,"893":0.12350966762426839,"894":0.307577136579108,"895":-0.9845740161387816,"896":-0.1228866369039738,"897":2.2133443118696747,"898":1.238324729106114,"899":-0.38310869174308887,"900":-1.9802006759597854,"901":0.2293782570223946,"902":-1.391477914043656,"903":-0.746447165927771,"904":0.8293869736005244,"905":-1.1020326938768337,"906":-0.6264647331730202,"907":-0.09156167352644294,"908":0.16529203828664937,"909":0.14498014469248818,"910":-0.44233171751493,"911":-0.3557672853896387,"912":-0.18642342487742955,"913":-0.2567399346888523,"914":-1.4389117395613307,"915":-0.24908717335577737,"916":-0.7191505221082388,"917":0.1377250880295326,"918":-0.719692090798916,"919":-0.29027742529358913,"920":-0.6848480917393935,"921":-0.2865602317445638,"922":0.2703989029820334,"923":-0.307389248272272,"924":-0.42474050206682495,"925":0.16252157912040266,"926":-0.10602789129321966,"927":-0.09062149338203308,"928":-0.15611477867127138,"929":-0.6933379915815782,"930":-0.3272017369053712,"931":-1.1604509125904148,"932":0.49972588251779637,"933":2.4313770603309157,"934":1.3476484849553105,"935":1.234288138807555,"936":1.8824134634786762,"937":0.058821508104488454,"938":0.8102696988239232,"939":0.9163782391918059,"940":-0.5479704394628037,"941":1.1869550801856295,"942":1.0444637333906324,"943":6.084912187780295,"944":2.7754279445658714,"945":1.265994515710802,"946":0.7291800588303498,"947":0.6189610974026672,"948":0.35938094614182275,"949":0.34963526451834626,"950":0.043476396974174464,"951":-7.18757934715529,"952":-7.686356298777246,"953":-6.514572100159535,"954":-3.9499528805532744,"955":-2.345319114324753,"956":-1.0969797985498801,"957":-0.3793569042754946,"958":-0.15295980317961586,"959":-0.2301913622784068,"960":-0.89475528460666,"961":-0.6933358173147317,"962":-0.07592527694895898,"963":0.1512710653761695,"964":-0.1158381288795354,"965":1.483609112646645,"966":0.15695146280274272,"967":-0.5004561156532531,"968":-0.44623053210702524,"969":-1.0266630587684613,"970":-0.9184159396788016,"971":-1.1193733289416925,"972":0.21076904061284488,"973":0.3769172614651784,"974":1.5468451182341874,"975":0.4029760238907247,"976":0.030372698177808733,"977":-0.6013355465041249,"978":0.44229547537432323,"979":-0.9985692988060675,"980":-0.9708762444654879,"981":0.1739532362695065,"982":0.855850273669428,"983":-0.2732967116999601,"984":-0.059238859497034835,"985":-0.034690712522492395,"986":0.6934781157909269,"987":0.20882232902596323,"988":-0.45782752306264807,"989":0.0008284570634121475,"990":-0.31856618939708314,"991":0.2492445551847888,"992":-0.8366542017551817,"993":0.7880837140725555,"994":-0.401317105787039,"995":1.064665688588338,"996":-0.4425094146316625,"997":-0.21085459235075416,"998":-0.4636592077546736,"999":-0.14255952618021925,"1000":0.36429773983855906,"1001":-0.2839899469512421,"1002":-0.22073084206434307,"1003":0.29658575063348314,"1004":-0.9940921581025495,"1005":-0.8230528838443212,"1006":0.06458659260424074,"1007":-0.206493411017461,"1008":-0.7124799229155343,"1009":0.5104990829421748,"1010":-0.19115371137838333,"1011":0.839552632849037,"1012":0.7520886180704538,"1013":0.40644687551246567,"1014":-0.7472128808472717,"1015":0.3818044355671597,"1016":0.10120702522112682,"1017":-0.19690810369200346,"1018":0.4957772091014158,"1019":0.2558296887524545,"1020":0.671329618992368,"1021":-10.044899788253376,"1022":-4.730220917223346,"1023":0.20203733751844855,"1024":0.5301242966209342,"1025":0.7323666194486185,"1026":0.1691238905179042,"1027":-0.24136060461235892,"1028":-0.11500202389508608,"1029":0.34605799739927545,"1030":0.3073669795718522,"1031":0.03412289298023081,"1032":-0.09798483901046867,"1033":-0.3342067471639792,"1034":0.020464427379898755,"1035":-0.29383363565219234,"1036":-0.815018562693057,"1037":0.34567192164880794,"1038":1.2816386033800655,"1039":1.1973281434348828,"1040":0.9602649477767569,"1041":0.2226665229871603,"1042":-0.06896916706355588,"1043":0.16463796975707196,"1044":-0.18390000059192557,"1045":0.36882346278562383,"1046":0.31825439372313985,"1047":-0.2190917122123836,"1048":0.7386898606239868,"1049":-0.40427622614797976,"1050":0.4774101394014882,"1051":-0.5438538222714497,"1052":-0.14086973011158357,"1053":-0.19764958895991838,"1054":0.07070747571075413,"1055":-0.5663598177340164,"1056":-0.04522796878385072,"1057":1.151863611641344,"1058":-0.6427546912050683,"1059":-0.04565962308156905,"1060":-0.4030504339468297,"1061":0.22706938422516576,"1062":0.6509311168397952,"1063":0.38398975101008204,"1064":0.2837518556476564,"1065":0.5918717975312199,"1066":1.069104170545133,"1067":1.636222444737405,"1068":0.8518670532877071,"1069":2.197633458661165,"1070":0.7607769080815067,"1071":0.7654504344803267,"1072":1.6265078720891228,"1073":0.6679253473067237,"1074":0.854101732867479,"1075":-0.04234353710083301,"1076":-1.4066389102855654,"1077":0.3697717485975146,"1078":3.1152166907767165,"1079":0.27167381012407754,"1080":-0.1802931002991632,"1081":0.5637560021976258,"1082":-1.280144253370019,"1083":-1.7090073667394843,"1084":-1.7061168366123602,"1085":2.3189921147483488,"1086":-1.8189713442621207,"1087":-2.448554012862307,"1088":-0.5492727131651822,"1089":-0.20370268267405078,"1090":-0.10550173338126026,"1091":-0.35726372593200756,"1092":0.7167720719354227,"1093":-0.9508907371262332,"1094":-0.948161669726364,"1095":-5.151268201282377,"1096":-3.804060441752311,"1097":-1.9880233929869007,"1098":-0.5098779801847249,"1099":0.3338636912222578,"1100":-0.33220386964102233,"1101":1.9152429138306533,"1102":0.7991916819914321,"1103":0.13183825643399888,"1104":-1.0745582686367785,"1105":-1.6519591146281725,"1106":2.9592289479328824,"1107":1.0233291968352747,"1108":-0.19728012487621546,"1109":0.9418002798652261,"1110":-0.3461132731233292,"1111":0.3185708614914125,"1112":1.439709067482209,"1113":-0.0784557418613638,"1114":1.9898686794384377,"1115":0.4615322838141034,"1116":-0.8602522556687718,"1117":1.8453692142248364,"1118":0.5705632998926329,"1119":-0.5206164326141128,"1120":-0.19795750038041787,"1121":-2.352998441602341,"1122":0.15866370752770675,"1123":0.755379368701547,"1124":1.4585983858253762,"1125":0.5779735144202854,"1126":-2.1463122663163916,"1127":-0.11901091592430461,"1128":-0.6722937139037949,"1129":0.4709752938047824,"1130":-0.7228202766865508,"1131":0.6772782048827918,"1132":-0.2700571025369681,"1133":1.5094731008109628,"1134":0.38114778512145475,"1135":-0.6294793468069789,"1136":-0.7310074166874067,"1137":1.6963876571272025,"1138":-1.3344741173854384,"1139":0.2607616776578353,"1140":3.085953014753337,"1141":0.18806888006162292,"1142":0.34225842497210796,"1143":0.5729703889647808,"1144":-0.3470797691129002,"1145":1.3918504092936423,"1146":0.4084182402539455,"1147":-1.3717083590390533,"1148":-0.004978327720758598,"1149":-0.08854695243623126,"1150":-0.654333135654379,"1151":0.7648987761413487,"1152":-0.8190077576115173,"1153":0.02521471407968433,"1154":-0.8502482518733167,"1155":-0.01337655895025553,"1156":-3.1610571073579745,"1157":0.403406568403393,"1158":1.9396192913151231,"1159":2.0035358933499796,"1160":-0.5110404862699984,"1161":1.2971418029939066,"1162":-0.32582765325539387,"1163":3.056163799855665,"1164":-0.17752657684340106,"1165":1.9217947016638375,"1166":1.3027301430362335,"1167":-0.68463539827408,"1168":-1.789795498260985,"1169":0.8835207237209924,"1170":-0.9387794900791623,"1171":-0.33409088262542,"1172":0.36052106779600696,"1173":1.7061764405258675,"1174":2.02007598326244,"1175":0.9187112956660305,"1176":-0.5963491765407962,"1177":-0.3285640477638424,"1178":-0.12983175316386203,"1179":1.774803313322787,"1180":-0.21237413043336306,"1181":1.5197279436911557,"1182":0.1872525471134609,"1183":-0.17132757269413051,"1184":-0.1414611029417371,"1185":0.18939624121745785,"1186":-0.9642615812254728,"1187":-0.08819803865832952,"1188":-1.6239842598626322,"1189":-0.6723419530104214,"1190":0.3074642764882829,"1191":0.3394829565804826,"1192":-1.010745479934779,"1193":2.057597218551429,"1194":0.8916260380176868,"1195":-0.6215880975559094,"1196":-4.109269124962672,"1197":-1.2693981922636792,"1198":-0.5891739634186747,"1199":-0.9051643702153761,"1200":-0.0219912190388237,"1201":-0.8122789797669588,"1202":1.1256048191243264,"1203":0.14521058622364957,"1204":-0.21461933692512522,"1205":0.07004194236687725,"1206":-0.7404121613044301,"1207":-2.585594895647763,"1208":1.178329646461919,"1209":1.500938589823848,"1210":1.0922004393539435,"1211":-1.3556987161077068,"1212":-3.1179455395123976,"1213":-1.24763461227386,"1214":-2.176535437718816,"1215":0.795930596964936,"1216":-0.8567851602914365,"1217":-0.20265325137327944,"1218":-0.5650383244988354,"1219":0.38116288081796307,"1220":1.2406210194403657,"1221":2.7504345447055454,"1222":0.041964256493575575,"1223":1.7706187778456242,"1224":-0.39774655656243296,"1225":-0.5471450952551628,"1226":-1.62350350025249,"1227":0.8477018213913827,"1228":1.7914583648512288,"1229":0.31796237033043606,"1230":-1.19550686545224,"1231":1.1806637045907278,"1232":1.8606934787576996,"1233":0.7908834155335518,"1234":0.0751513641842445,"1235":0.6134382026759052,"1236":0.414613934961872,"1237":1.1181528623186716,"1238":0.08524001065263083,"1239":1.572877905325732,"1240":0.4954173858930162,"1241":-1.9319715643482536,"1242":-1.4268907334776206,"1243":-0.6190862296286047,"1244":-0.4456477872405685,"1245":-0.0900647163977766,"1246":0.37178450778985833,"1247":0.2551333337716344,"1248":-0.303401567887616,"1249":-2.543555276546531,"1250":0.026076436555348272,"1251":0.7245308358834641,"1252":-0.4332493180491365,"1253":0.24877472312144758,"1254":-1.6257253019088367,"1255":0.201078682328353,"1256":0.6764321780455309,"1257":1.5757894711301128,"1258":0.7144651644949038,"1259":0.42559427659982113,"1260":-5.007298554948067,"1261":-2.1916861166035537,"1262":-1.1429043356917767,"1263":-1.0780065271302184,"1264":-0.11537881971867947,"1265":0.5056321922462486,"1266":0.643248995647618,"1267":0.29387315854385526,"1268":0.5499610589127704,"1269":1.5537491991338523,"1270":0.18562805966434212,"1271":-2.172312225315576,"1272":-1.2631677280023197,"1273":-0.01889935860114871,"1274":-1.405505811088862,"1275":-0.5429095754833053,"1276":-0.020043267039375073,"1277":-1.8057256474043728,"1278":-2.9045005683652385,"1279":-1.0538741237342628,"1280":-1.398029727001756,"1281":-0.7309725274779596,"1282":-0.8156943661860678,"1283":1.8013831272399452,"1284":-0.8451273733671757,"1285":-0.3532783263298813,"1286":-0.33872429428073536,"1287":0.7400900625855094,"1288":-0.09833310059061184,"1289":0.2149936620621351,"1290":0.43346517512541566,"1291":0.2222694591813961,"1292":-1.81971617649421,"1293":2.313443837980005,"1294":0.057385266223521345,"1295":1.3507474224179938,"1296":-1.0995131751569005,"1297":-0.8376286786773475,"1298":1.4323708646731936,"1299":0.7694659415329317,"1300":-0.9151310230587378,"1301":0.6854623888738779,"1302":-0.5995501904473256,"1303":-1.3042527720723722,"1304":0.34036064881335765,"1305":1.7388835789486914,"1306":-0.7477035326283008,"1307":-0.07397086809846219,"1308":1.1391452086330387,"1309":2.521859688445141,"1310":1.5121146920597481,"1311":-0.3543458995092581,"1312":-0.6727166530572468,"1313":0.21750283357629202,"1314":0.541827592996664,"1315":1.2734103492392153,"1316":0.9441087830481515,"1317":0.4285721392263486,"1318":0.49058973334466766,"1319":0.48773188285103464,"1320":0.34985107403309335,"1321":1.1546302865975786,"1322":0.6748918800021615,"1323":0.9143421592245267,"1324":0.8230180069324609,"1325":1.0391896464227937,"1326":0.748321891974619,"1327":0.43211102638010884,"1328":0.48322228721988386,"1329":0.2785118380793296,"1330":-0.9812350432025105,"1331":-1.5949554772547874,"1332":1.236004551129273,"1333":1.2172129120702064,"1334":1.4290561737782417,"1335":0.5030700079053525,"1336":0.48207331304605056,"1337":0.4743088736368997,"1338":0.32423717399558777,"1339":0.7186276946871221,"1340":-0.6526585915322775,"1341":-1.3887340791878462,"1342":1.4370109387642345,"1343":1.0345203916312546,"1344":0.5498706575535643,"1345":0.3893961007325071,"1346":0.42975787666759696,"1347":0.5104684314356962,"1348":1.0047315203275347,"1349":-0.42368706937382977,"1350":-4.694769082940338,"1351":1.8048444151992726,"1352":1.0091309375878172,"1353":0.6835839928766277,"1354":0.5985283169203853,"1355":0.45212094256672297,"1356":0.43294709583885427,"1357":-1.052054035634876,"1358":-0.39186202785515073,"1359":1.0530727345726452,"1360":1.2010604639861895,"1361":1.08948936943258,"1362":0.5839944399103343,"1363":0.623564477993064,"1364":0.5510327590786658,"1365":0.4643906656099377,"1366":0.5068685058932179,"1367":-1.2174519389644884,"1368":-0.34149978374415835,"1369":1.8071536455629866,"1370":0.9957781230994358,"1371":0.6780321560199154,"1372":0.525446850600326,"1373":0.35663152694969674,"1374":0.44926213056854963,"1375":-0.29951578748174046,"1376":1.083971672239314,"1377":1.64245129509061,"1378":1.0294985677971533,"1379":1.525518674786308,"1380":0.793064902176115,"1381":0.4456323942540403,"1382":0.4787840957343494,"1383":0.4990944538160475,"1384":1.0972230338190057,"1385":-0.2684262614270854,"1386":-0.7016590999298259,"1387":1.4357725512273416,"1388":0.9533150044831759,"1389":0.7485184211305432,"1390":0.5364958326706428,"1391":0.5079695589143072,"1392":0.2784718330413575,"1393":1.0313075153119327,"1394":1.3492411141571887,"1395":1.608250988260651,"1396":2.3053686263707798,"1397":0.5470573028181707,"1398":1.2299013411915702,"1399":0.6305178027417001,"1400":0.3405217294369487,"1401":0.3503181976935379,"1402":0.540324710611778,"1403":-1.647619176020014,"1404":1.5317393896627558,"1405":-2.124224163145049,"1406":0.9348720434108793,"1407":1.1985642101280298,"1408":0.6693333279949637,"1409":0.38899550915426706,"1410":0.3819246434667714,"1411":0.4926262318036575,"1412":-0.5699241070343086,"1413":2.03890209218945,"1414":-0.33134260910627095,"1415":1.1025692970912886,"1416":0.4678641204357487,"1417":0.8557345072499144,"1418":0.6781472741495953,"1419":0.5109316418300985,"1420":0.38543979784167715,"1421":-0.3276651359923918,"1422":0.062435424131648286,"1423":0.6674475486411708,"1424":1.4328140939642036,"1425":1.1081829550656555,"1426":0.8283037351735085,"1427":0.4533318586973262,"1428":0.575776504186334,"1429":0.58246176446836,"1430":0.2538299145717964,"1431":1.194293396320214,"1432":-4.0467020243026415,"1433":1.0902409826046735,"1434":0.5580666641766703,"1435":0.5647234024746104,"1436":0.5007792197155803,"1437":0.4933039989335299,"1438":0.32947903669822665,"1439":1.369357585405806,"1440":0.004971898413278661,"1441":-0.3185818551650451,"1442":1.425948683161772,"1443":1.3235552081834647,"1444":0.7723792753627108,"1445":0.4453283385269511,"1446":0.6446770204518907,"1447":0.39440543958472857,"1448":-0.3577531064501779,"1449":0.5127361274295057,"1450":0.272781086420967,"1451":1.693363518227085,"1452":1.4966160008101694,"1453":0.8198295831422266,"1454":0.49309535774668356,"1455":0.35968405150594723,"1456":0.48547058976408736,"1457":-0.8260372020033842,"1458":0.49224632296871257,"1459":-0.2749456145936014,"1460":1.49770487819897,"1461":1.4998065074192237,"1462":0.6393465262500607,"1463":0.7982523447788933,"1464":0.7589501052672003,"1465":0.6289976665722488,"1466":-0.8887295748056093,"1467":-2.1841242564265535,"1468":-1.5335267296494026,"1469":2.075969488986776,"1470":1.39758573325053,"1471":0.8218653766691745,"1472":0.5512295528662918,"1473":0.24710512195674497,"1474":0.2313495121338972,"1475":0.7666475196637623,"1476":0.7155191437837097,"1477":-0.05809966860189124,"1478":-0.8789880649575489,"1479":0.27461590017462356,"1480":0.6287974321553941,"1481":0.45639708268428947,"1482":0.2961471712734287,"1483":0.4424177460011532,"1484":0.30177224193920976,"1485":0.007220143465661864,"1486":0.6033022611849965,"1487":0.9917504977433229,"1488":0.7957756348389039,"1489":0.7106922194222164,"1490":0.4943283926042951,"1491":0.449065625729561,"1492":0.2544762125897593,"1493":0.23669476885741794,"1494":-0.9487257159768964,"1495":-0.32449117797867033,"1496":0.006405810846819639,"1497":1.0606068485351754,"1498":0.8866003270694117,"1499":0.5475768392985666,"1500":0.5474427931696074,"1501":0.3161399439066073,"1502":0.1708338731291482,"1503":0.8315898607391331,"1504":1.5102892012605968,"1505":1.8650122287302104,"1506":1.008840581323762,"1507":0.8187547718216676,"1508":0.5674803120043355,"1509":0.33314395783569084,"1510":0.44195585216974825,"1511":0.10745376039767368,"1512":0.6238322565343063,"1513":-0.7360180119014486,"1514":-3.9731354826020087,"1515":1.6323612603292623,"1516":0.19167943632602746,"1517":0.40775751953364986,"1518":0.2483163330870061,"1519":-0.03623303986395019,"1520":0.292672379319806,"1521":0.1411836869611943,"1522":-0.05291479499886911,"1523":0.2054817365823556,"1524":1.2368829896320874,"1525":1.0808348823662828,"1526":0.23739167724291863,"1527":0.5080207557429323,"1528":0.3221039443767378,"1529":0.644587816430746,"1530":0.36129119479281796,"1531":-0.5583195903344098,"1532":0.49909579170577917,"1533":1.691180987845597,"1534":0.9553568314729035,"1535":0.6100562936558145,"1536":0.5798914954153013,"1537":0.4436867448358285,"1538":0.37584893044440926,"1539":1.4463762435640224,"1540":-0.5789119537067313,"1541":-0.30885331803642807,"1542":1.081288085582357,"1543":0.6576685613761011,"1544":0.37692329423043663,"1545":0.4807036634469203,"1546":0.5246229125800453,"1547":0.2298079946386166,"1548":-1.035595450345888,"1549":1.4578067609984977,"1550":1.873300488722529,"1551":0.6748931289186566,"1552":1.1405853159819077,"1553":0.6906966451127505,"1554":0.5725360077008735,"1555":0.2501335337042248,"1556":0.33460162303635854,"1557":0.7386053208995739,"1558":-0.030644606005172076,"1559":-0.45955716547629727,"1560":0.10164036301783227,"1561":-0.4306992388168852,"1562":0.48704460365385394,"1563":0.21527229282955504,"1564":0.4507253069595024,"1565":-0.6000980354759176,"1566":0.5720810712782762,"1567":0.39099062108895705,"1568":0.036782241796381156,"1569":1.077673569575426,"1570":0.07122156344877138,"1571":0.19306032748196086,"1572":-0.1805311163598838,"1573":-0.3360136326745558,"1574":0.4600558202396039,"1575":0.3849641877131843,"1576":-0.7773548486944968,"1577":0.4274813255519347,"1578":0.7241533333199157,"1579":-1.2296077104700276,"1580":-0.6996480401105054,"1581":-0.2885961444145722,"1582":-0.13240558908810973,"1583":0.14031381042575253,"1584":-0.2776061158628997,"1585":-0.11950290763998446,"1586":0.03400630363455842,"1587":0.7650316281839896,"1588":-2.6028380179787307,"1589":-2.2122180091665764,"1590":-2.011828641376005,"1591":-0.19352705161920503,"1592":-0.7413611086357702,"1593":0.9089859152572364,"1594":-0.37211850510411765,"1595":0.8255193927390626,"1596":0.21280041077884687,"1597":-0.676829953510504,"1598":-10.05410551392095,"1599":-0.6291027838254014,"1600":-0.013473733555875252,"1601":1.2507172823744628,"1602":-0.1359305757149561,"1603":-0.004890603604889333,"1604":0.2723411280514854,"1605":0.521134696116057,"1606":8.364848942192383,"1607":7.817961323017877,"1608":4.7469218896285215,"1609":0.31454306788860525,"1610":-0.02643505394915528,"1611":1.0538155293752223,"1612":-0.17951557805244847,"1613":0.2667566778312883,"1614":0.18049124348996315,"1615":-0.21958104343698084,"1616":0.27109158637709235,"1617":0.42475845466393897,"1618":0.1832930361662988,"1619":0.006833651363551744,"1620":0.786064993344497,"1621":-0.2835800488371438,"1622":-0.48978480413343206,"1623":0.4828593640706881,"1624":-0.16009414332926056,"1625":0.16705443081729132,"1626":0.26414482413575224,"1627":-0.4061062782841302,"1628":0.4377264334089789,"1629":0.5089978299123404,"1630":0.3683751138668881,"1631":0.24891756007695978,"1632":-0.20627415967840423,"1633":-0.0660301100071144,"1634":0.027769532327065805,"1635":-0.1058299369437059,"1636":0.42621828050589233,"1637":0.4667793698338684,"1638":0.4168404518495246,"1639":0.8221289415532774,"1640":0.9194667619587301,"1641":-1.4916149196436819,"1642":1.150675411517415,"1643":0.5232574119607081,"1644":0.8127875640135636,"1645":0.9102509914211282,"1646":-1.2545799899070407,"1647":-0.5989057507048877,"1648":0.40289353166856545,"1649":0.18570127401384104,"1650":0.6562964032347964,"1651":0.49813601256210194,"1652":0.772689358000988,"1653":1.3506409591860662,"1654":0.3829946422136407,"1655":0.5920293912465289,"1656":0.38071482701142756,"1657":-0.22662799565010516,"1658":0.4649844381728254,"1659":-0.8958555617185174,"1660":0.7397253849168892,"1661":-0.6575285407303303,"1662":1.4900245254542785,"1663":1.628031726747797,"1664":0.36964049052162407,"1665":-1.006940230329682,"1666":-0.41515291883237393,"1667":-0.21853888615267456,"1668":-0.9125497219208294,"1669":0.4312676312185322,"1670":-0.3746470860175001,"1671":-0.5996299580933635,"1672":1.3619013949502834,"1673":-1.4503505086978403,"1674":1.943596500091609,"1675":-1.206931699070063,"1676":0.9063666142214691,"1677":1.0051277969213803,"1678":-0.6677393493958372,"1679":-0.31776988455985117,"1680":-2.720692797646184,"1681":-1.475798558781908,"1682":-0.14847484391036198,"1683":0.7710157585007714,"1684":-1.1927352159270717,"1685":1.5729275346919098,"1686":0.0012386719692936787,"1687":1.3759124033345984,"1688":0.519076965339031,"1689":-0.9118469078094751,"1690":-1.2944228691840243,"1691":1.63154559978244,"1692":-0.2518660247548668,"1693":-1.89268551836749,"1694":-0.5842947513766819,"1695":0.41693404385594707,"1696":0.26983062542175995,"1697":0.1351563380203715,"1698":-0.5556958432319432,"1699":0.6265883676821747,"1700":-0.7097877119870125,"1701":-0.10177713034021237,"1702":0.45657617299759773,"1703":-1.9267390356040697,"1704":-2.884286484751778,"1705":1.7294985099273008,"1706":0.049486526881250235,"1707":-0.15738486130593055,"1708":-0.8432255870781142,"1709":-0.4355903014109948,"1710":-1.8369776319891438,"1711":1.0543253513669988,"1712":-0.6765602147256164,"1713":-0.5904039080255506,"1714":0.2955390690446865,"1715":1.8898931258569827,"1716":0.026401293452809966,"1717":0.12491235208586278,"1718":2.17607947755906,"1719":0.14750496924858755,"1720":1.6686560510218893,"1721":2.0099934460090556,"1722":1.0728747994200385,"1723":1.6279868190172067,"1724":-1.2790951931238586,"1725":0.04941915352045354,"1726":0.8029959202800941,"1727":1.065059646919006,"1728":-0.1711099866716749,"1729":-0.4122258219768842,"1730":1.340953436792244,"1731":0.9875881440594374,"1732":0.1329647780187996,"1733":-1.3917386844037547,"1734":-1.1730867616690677,"1735":1.4354229002046728,"1736":-0.5671701017380028,"1737":1.3415034732048947,"1738":0.43417736249896055,"1739":0.9759535768646793,"1740":-1.682236597848012,"1741":-0.5975956117908193,"1742":1.8132896156043956,"1743":2.6721524546072453,"1744":0.45271519332471494,"1745":2.2569153061364626,"1746":0.724970124091702,"1747":0.0011980770800835861,"1748":-1.212408439168196,"1749":2.124403902043235,"1750":0.949586932215127,"1751":0.3855788967132864,"1752":-1.7847507003936178,"1753":-1.902278924605527,"1754":-1.926901597146937,"1755":-2.636878945230332,"1756":-1.424499781383514,"1757":0.43557517214569447,"1758":-0.1230697494426081,"1759":0.9062134546897587,"1760":2.3265831070186556,"1761":3.0792714748343584,"1762":0.2564209355674038,"1763":1.6577484829655806,"1764":1.5232664526845503,"1765":-0.6783949909505971,"1766":2.030086842417732,"1767":1.0923024002317765,"1768":-1.0936719942186788,"1769":-1.331162333603831,"1770":-2.0295508180067388,"1771":-2.983005218635891,"1772":-2.646485982488348,"1773":-2.288911080825453,"1774":-0.40956255135528413,"1775":-1.7503508507838477,"1776":-1.812547698707103,"1777":1.3681774309686747,"1778":-1.1357369959223211,"1779":-0.20835038359834024,"1780":2.645680792544729,"1781":1.7371067940853477,"1782":-0.2073743296958771,"1783":0.7262921334546978,"1784":0.27025064202348975,"1785":0.16019805171687307,"1786":0.9619176414393433,"1787":0.7470723450639888,"1788":0.6030663007338203,"1789":-0.5551737883821987,"1790":0.6156174000655857,"1791":1.8027028059240173,"1792":2.1306029918994662,"1793":-0.0006369089602125995,"1794":0.650027023442997,"1795":-0.2249016265633079,"1796":-1.6041222466998672,"1797":-0.3243507072350354,"1798":0.32766398880518205,"1799":2.0679364743354243,"1800":0.09635447961462981,"1801":-1.2316097915792494,"1802":0.2852980719089713,"1803":-1.8579565926051185,"1804":0.419633475257004,"1805":-0.36093485622956184,"1806":-0.0457890785149925,"1807":-0.7407754063400539,"1808":0.000063897935799061,"1809":-0.2493800282066815,"1810":-0.7024615488707718,"1811":0.8402339839500018,"1812":-0.08495103748068643,"1813":-0.17264441238667877,"1814":-0.0931883385558963,"1815":0.6787084856810867,"1816":-0.29544955899065306,"1817":-0.0975338552157109,"1818":0.00641815366330376,"1819":-0.5922766920097255,"1820":0.08098597427707134,"1821":0.25426299896515075,"1822":0.32790784616517965,"1823":0.6897519484115476,"1824":-0.1626757959105997,"1825":-0.24041471431712846,"1826":0.45366174150293814,"1827":-0.0010132966056638586,"1828":-0.7471926400081443,"1829":-0.6670969068366785,"1830":-0.24436121346847306,"1831":-0.13190846740302775,"1832":-0.4392581102946516,"1833":-0.9091463026881672,"1834":-0.6529895822145334,"1835":-0.4637610164170129,"1836":0.4167928001527801,"1837":0.5246457708477584,"1838":0.36096530670801996,"1839":0.3362342381028253,"1840":0.5604115701498038,"1841":0.06633393566218158,"1842":0.06691216323162483,"1843":7.208689758794538,"1844":-1.032572658994893,"1845":-0.9852929495421199,"1846":0.5941701454836815,"1847":-0.48226706599978136,"1848":0.8189196534356004,"1849":0.06123917749601894,"1850":0.2267215939882866,"1851":-3.491088450334557,"1852":-8.69983397455145,"1853":-8.84738840357352,"1854":-2.007650875808436,"1855":-0.1333101335282797,"1856":-0.025833970750158898,"1857":0.03700896059327965,"1858":0.29019351623964185,"1859":-0.7183750476876971,"1860":-0.23525196315301727,"1861":1.250109776969917,"1862":-0.361943617235482,"1863":0.011497901246494411,"1864":-0.30506630580697824,"1865":-0.3479313436423363,"1866":-0.028894612061633528,"1867":0.11155879198263095,"1868":0.2936810460803612,"1869":-0.850223311929825,"1870":-0.38998546963011654,"1871":0.05081536549765894,"1872":0.18877957594634343,"1873":-0.12239953011127754,"1874":-0.22115421006273528,"1875":0.012573645651362576,"1876":-0.4881552595480541,"1877":0.15046703453814422,"1878":-1.094858219159169,"1879":0.31548098521880746,"1880":-0.11519641702895073,"1881":0.038982950727246946,"1882":-0.2560303736841977,"1883":-0.4652590963957331,"1884":-0.191739356537054,"1885":-0.4226434867687364,"1886":-1.55011367432651,"1887":2.146268026656718,"1888":-0.42798967273379557,"1889":0.08073916673503173,"1890":-1.0039117235087238,"1891":2.734341104557367,"1892":-0.8963530158709477,"1893":-0.9541915869020652,"1894":0.5471333112748614,"1895":-0.40054374908005436,"1896":0.851882892617111,"1897":0.052497417193994464,"1898":-2.4171704852265434,"1899":-1.257843974323561,"1900":-1.148666846938833,"1901":-1.5655552090051363,"1902":1.9786857843699042,"1903":0.039824580662640954,"1904":0.033155054431417155,"1905":-1.6749148134773646,"1906":1.2171971414416183,"1907":-1.0905960948587539,"1908":0.47261832000083237,"1909":0.9279886037155292,"1910":-0.040670096993175434,"1911":-0.2653559741938799,"1912":-0.17829434304860756,"1913":1.205153591377581,"1914":1.3775092268567066,"1915":-0.8185890694437824,"1916":-0.9054828068874154,"1917":-0.019801919853562916,"1918":-1.505940080569545,"1919":-1.669904225836295,"1920":0.8266858572258954,"1921":-1.4047874959174127,"1922":1.0855925493633125,"1923":3.507791706705694,"1924":3.180815387626518,"1925":-0.3446162762201139,"1926":2.928026772981031,"1927":-0.47413007450803646,"1928":-0.4141566848313925,"1929":0.4871760849820999,"1930":-0.5827728646321144,"1931":-0.4494778981998393,"1932":-1.1464942588011957,"1933":-1.4546152714655027,"1934":-1.0824360949284417,"1935":-1.0225779016728458,"1936":0.9603696436801648,"1937":1.1872413193818456,"1938":0.5066477179822153,"1939":-0.9182914476393883,"1940":-0.7187492317605682,"1941":0.8352928041440092,"1942":1.0321606399247467,"1943":-0.17215043377663045,"1944":0.21813578250943078,"1945":-1.5921951996653028,"1946":-0.7294280482570807,"1947":-0.8362657178919125,"1948":0.010355525995840203,"1949":1.161158868781172,"1950":1.2465076829230481,"1951":1.4652121629323613,"1952":-0.004266617818664985,"1953":-1.4020740020560567,"1954":1.2289507362079346,"1955":-0.1905594793204299,"1956":-1.1808255356424147,"1957":0.6533925692783744,"1958":1.4134671428882541,"1959":-1.4480620216711053,"1960":1.9932132695973406,"1961":-0.9868490847461937,"1962":0.42233848963930753,"1963":-0.2980049663594724,"1964":1.760588410327859,"1965":1.4495480897951845,"1966":0.5486549437005669,"1967":-1.6614423097128894,"1968":-1.3330847774491879,"1969":0.9497458322833117,"1970":-0.5364137842143919,"1971":-0.3057693594962237,"1972":1.4876982996081174,"1973":-0.33487624088693996,"1974":0.08868882322225603,"1975":-1.2817765307193065,"1976":2.7717485759708897,"1977":1.67639752000363,"1978":-0.0431307656177874,"1979":-0.8318472179100058,"1980":0.5909412407636045,"1981":1.4015739213424692,"1982":0.07882831711931072,"1983":-0.6310112257377528,"1984":0.035213904098333554,"1985":0.4797174259774412,"1986":-0.6274837650680938,"1987":-1.420753835002984,"1988":-1.3294097305550874,"1989":0.20762117999934776,"1990":1.1323979616139013,"1991":1.1915899216703656,"1992":2.8641232760932493,"1993":0.0405369338643738,"1994":-0.9007602050453891,"1995":0.30843378116337833,"1996":-0.38364398486659496,"1997":0.5400939745836789,"1998":0.8784090913315792,"1999":-2.5123308595584173,"2000":-2.0090470676163403,"2001":-0.286902883779384,"2002":-0.28010588472505565,"2003":-1.2219844028733804,"2004":-0.6578214962060105,"2005":-0.8149314108494145,"2006":0.37839234453058557,"2007":0.2141248140865719,"2008":2.195610603643633,"2009":3.5259604709720738,"2010":0.5927928620946527,"2011":0.17251968089872027,"2012":-1.2676510619850316,"2013":-0.2867094698433095,"2014":1.2709250718479153,"2015":1.3286988204014227,"2016":-2.099775356567539,"2017":-7.346683369073321,"2018":-5.065645093770608,"2019":-1.9795291084410565,"2020":-1.5060165899182767,"2021":0.6207873334586,"2022":0.43430248429915896,"2023":0.3303520776728571,"2024":-0.7369758213504555,"2025":1.8332819221932568,"2026":-0.0954627399514646,"2027":-0.6459498002558861,"2028":-0.722608835248373,"2029":0.6361802593386626,"2030":-1.1013994851053794,"2031":0.07175161075498403,"2032":-0.8405602987594474,"2033":0.14241459601346396,"2034":0.25857382635372206,"2035":0.1469765614755842,"2036":-0.6420807596052228,"2037":-0.8602031727532032,"2038":0.5173513579224029,"2039":-0.4015687580903118,"2040":-0.44729751689297204,"2041":-0.7389850893128094,"2042":0.013410434617239973,"2043":-1.0958264215772369,"2044":-1.630752876450262,"2045":-0.48345266744268445,"2046":-2.5665624255870267,"2047":0.39973693361624346,"2048":0.5899775128111969,"2049":-0.43924960699349863,"2050":1.9383084953402034,"2051":-2.701942987025223,"2052":0.11757103124230173,"2053":-0.5227408136348998,"2054":-1.496363931660212,"2055":0.5869292293323282,"2056":-0.17438623569078812,"2057":0.27622750269965,"2058":0.007740767657687021,"2059":0.8026218956088474,"2060":-2.103668862261876,"2061":0.9520147368519801,"2062":-1.480001386718716,"2063":-0.1472517516819518,"2064":-0.21898177425024762,"2065":-1.1504271055518018,"2066":1.5461095074131528,"2067":0.21920562215313183,"2068":0.9848235340656282,"2069":0.4554821236246003,"2070":-0.4324083280325188,"2071":1.1550654882884541,"2072":0.11932793074042823,"2073":0.12673742588275413,"2074":-1.0633796536942017,"2075":0.40344549248301015,"2076":-0.5651220940047406,"2077":1.460189976132168,"2078":-0.04527369557182597,"2079":0.9769947583558871,"2080":-1.9150186258164787,"2081":-3.197120637347135,"2082":-1.705603216899814,"2083":-1.1351690110412689,"2084":1.3819768295599342,"2085":-0.2055245473529173,"2086":0.9164940327071772,"2087":-0.9720472487633827,"2088":0.5120425647321588,"2089":2.7353733560294793,"2090":8.526180104794149,"2091":7.390381455230894,"2092":1.061732730711318,"2093":0.009332512398425766,"2094":-1.9973867393174276,"2095":1.6458675192702892,"2096":0.7780275379104181,"2097":0.5104071518654724,"2098":-1.0674838332790866,"2099":1.6060431379799374,"2100":1.75641273328314,"2101":-0.8945155789668489,"2102":0.9352274072978487,"2103":-0.08610587002803342,"2104":0.9168843326045862,"2105":0.7381015425682946,"2106":1.0988669098602972,"2107":-0.5057096637309735,"2108":-0.2579959314342052,"2109":-0.6928531472014969,"2110":-0.011527154680467859,"2111":0.1563019156600293,"2112":-0.22602410055184347,"2113":0.9637785460077744,"2114":0.20198792563867177,"2115":0.8856174409044842,"2116":1.7561374415038964,"2117":-0.3096929228578277,"2118":-2.178146332865808,"2119":-0.37531568301028934,"2120":0.35081892138043774,"2121":-0.4177207400260731,"2122":-1.105145997720368,"2123":-0.448352787986936,"2124":0.2378464026823273,"2125":1.5296620664707938,"2126":-1.4404893382861679,"2127":-0.6907421561216964,"2128":0.10710744041672492,"2129":-0.7583659119698494,"2130":-0.07764778404908328,"2131":0.41507584635313977,"2132":-1.0663864420980917,"2133":0.10654135392626184,"2134":0.9434135268588731,"2135":-1.6129478020208134,"2136":-0.3720182648882248,"2137":1.0972705091068515,"2138":0.1608345805904348,"2139":0.4213948469700197,"2140":-1.1152649982925558,"2141":1.951690691744751,"2142":0.6869451866958105,"2143":-0.7747219722152905,"2144":1.4590985190804657,"2145":1.4265684785474397,"2146":0.8468153560932551,"2147":0.3645774651356803,"2148":0.2449129930538558,"2149":-1.6203413865385177,"2150":1.8122561799784418,"2151":0.36071439987806647,"2152":-1.6890415308343854,"2153":-2.4908032747073907,"2154":-3.4253569281314276,"2155":-2.326496262797897,"2156":0.5835930581772099,"2157":0.900117046126949,"2158":-2.2702621924604824,"2159":0.728125857361944,"2160":1.2620288434915532,"2161":-0.4358978765515887,"2162":-1.4368463825202056,"2163":-0.5018670750798647,"2164":-1.9547651900822967,"2165":-0.39310977567814726,"2166":-0.9621844727555205,"2167":1.8615995276420911,"2168":-0.32789966271014304,"2169":-0.092781232233504,"2170":1.4928425434406483,"2171":1.0843959679185617,"2172":0.3888628861317302,"2173":-0.16639009778677238,"2174":-3.6149855681685965,"2175":-1.0184924063668535,"2176":-0.6277604808990397,"2177":0.038626507704674316,"2178":-0.7999809064991382,"2179":0.8124044634789159,"2180":-1.582405153794412,"2181":-0.2106796090200931,"2182":0.09589356446819217,"2183":-2.5564740867562334,"2184":-1.9970614076842705,"2185":-0.3076788335003527,"2186":1.6424079778645315,"2187":0.9972952138323012,"2188":0.3843233217696589,"2189":1.5003577462425226,"2190":-1.1250300561533106,"2191":-1.3451636576283394,"2192":-1.5339123254062668,"2193":0.7949352927329357,"2194":-0.05724615497880243,"2195":-0.6129047255532121,"2196":1.0123698203199056,"2197":1.0975237446956105,"2198":-0.2744556048204895,"2199":0.42310720701609256,"2200":-0.3969475275818794,"2201":-0.7999998808806634,"2202":-1.258319456762888,"2203":-0.03845088604321963,"2204":1.941925646435923,"2205":1.257424737894854,"2206":-2.28589916595313,"2207":1.0434756943096397,"2208":0.6978436241879924,"2209":1.5484706678059459,"2210":-0.4256979129225316,"2211":0.11191511735620939,"2212":0.10416359612378463,"2213":0.375400153985803,"2214":-0.9364542910508143,"2215":0.788254466063868,"2216":-0.39262668056980865,"2217":-0.22700959231381973,"2218":0.18870118246464995,"2219":0.13695705146430867,"2220":2.568856363585358,"2221":1.0367378954515811,"2222":-1.2166870599661372,"2223":-0.6476886677110543,"2224":0.04963541571650581,"2225":-2.060293796622969,"2226":-0.6159510233023785,"2227":-0.4159725349154563,"2228":0.2397181664480045,"2229":2.2403151651102635,"2230":-0.24847756726526177,"2231":1.190306589616064,"2232":-0.7748761961334089,"2233":-0.8352943977731803,"2234":-0.2593918728168478,"2235":-1.9764863712731797,"2236":-0.851368812552574,"2237":-0.9234224354198232,"2238":1.0384977352254916,"2239":0.016121972567557114,"2240":0.610605327645936,"2241":-0.5465567470821492,"2242":-0.8976735011472746,"2243":0.9488415486581485,"2244":-3.897823423997038,"2245":-3.2492916673881274,"2246":0.40909374858876935,"2247":-0.17986563032580102,"2248":-0.11407091661121566,"2249":-0.19510178636824874,"2250":0.1612477869837325,"2251":-1.1927374958942925,"2252":-0.009934673664844528,"2253":-2.6985317845179164,"2254":5.578594437938846,"2255":2.526548022387837,"2256":2.241055379364958,"2257":-1.253323371428866,"2258":-0.33604671754781357,"2259":-1.1421411333580123,"2260":-0.3327980563694669,"2261":0.959627925929322,"2262":0.5501677737244953,"2263":3.3048988034126325,"2264":1.0402966142404544,"2265":1.3698169930032775,"2266":0.9636875295968881,"2267":-0.99641877935673,"2268":-1.2948941906732594,"2269":-0.29449844795759206,"2270":-1.6318907872563537,"2271":0.31327080832429377,"2272":1.2013052625427723,"2273":0.957229197123393,"2274":1.545240986445514,"2275":1.021505271733651,"2276":1.862125314757601,"2277":1.5499990203299694,"2278":-0.33860146646020767,"2279":-0.6749432034733283,"2280":-1.4444619327275738,"2281":2.3161214988535126,"2282":2.384788746285798,"2283":-0.2693911923358239,"2284":3.5805856904236792,"2285":0.7462244557399542,"2286":2.424000524654188,"2287":1.9913841974038096,"2288":0.3865681013410366,"2289":0.08559463570931193,"2290":-1.0133598142716824,"2291":1.9112524107769213,"2292":-0.401736426247676,"2293":1.082890528623813,"2294":0.03576012826614477,"2295":-0.5486386392421829,"2296":-2.35733984405032,"2297":-0.07177051954070873,"2298":-1.640075783339046,"2299":-0.9320419220675241,"2300":-0.5469397095390217,"2301":-2.7822248511502985,"2302":0.9289778274345558,"2303":-1.5567243739634367,"2304":-0.04124411479809921,"2305":-0.3548918361545481,"2306":0.06406331014677108,"2307":0.05168314696135861,"2308":-1.0630477227528548,"2309":-0.304435782725495,"2310":0.21039045508194726,"2311":2.1158509279190767,"2312":0.42429949056012695,"2313":-0.05903295646801908,"2314":-0.9817786330269217,"2315":0.44450885819107805,"2316":-0.46988700346684803,"2317":0.418490212020978,"2318":3.0008288224517545,"2319":0.7196224290496684,"2320":-0.7640131787749319,"2321":0.12427834032240649,"2322":1.745018248287597,"2323":-0.3434783719032459,"2324":-0.045933088499364574,"2325":1.8045854958369683,"2326":2.908000623709884,"2327":3.147216651021451,"2328":0.7113553324437089,"2329":-1.394709094562263,"2330":-2.103198251987611,"2331":-1.9549336260669383,"2332":2.126785519806178,"2333":0.6929673796885649,"2334":0.35563210576906723,"2335":0.3592665370908182,"2336":-2.4271719253587727,"2337":-1.1177059387765471,"2338":0.09463465551553504,"2339":0.9847954484492524,"2340":1.1008685334724853,"2341":1.674236082858747,"2342":-0.07163121335017449,"2343":1.1760923209786607,"2344":-0.22175485800315872,"2345":-0.5486323519882361,"2346":-0.2732913183778017,"2347":-0.7443678282946106,"2348":-0.7676969173373513,"2349":-2.0865538410565194,"2350":0.5827329819812032,"2351":-1.7766294732740298,"2352":0.681024787802582,"2353":-1.1144664001858773,"2354":0.4517786458445114,"2355":-1.4026427722709016,"2356":0.09548210988225955,"2357":-0.7868270158909725,"2358":1.9179622580335842,"2359":-0.23869187808450038,"2360":-0.6333309651276974,"2361":0.8530988495935588,"2362":-1.3171315146702165,"2363":1.1237946341680407,"2364":-1.229809016251494,"2365":-1.166857669018719,"2366":-0.5533924773222016,"2367":1.3992375341729002,"2368":2.027944710992477,"2369":-1.3106768343427095,"2370":0.23747368326598361,"2371":0.22907038988266168,"2372":-2.0954397018498323,"2373":-2.0533455196268533,"2374":-2.833400512572707,"2375":-0.9321726294608784,"2376":0.7395995128134684,"2377":-0.19922394964369844,"2378":0.09440484752625,"2379":-0.40617664698641776,"2380":-0.9141527917868977,"2381":-0.13104246765778527,"2382":0.36856202441343655,"2383":-1.511762233289432,"2384":0.4211919819204542,"2385":0.13655886534211406,"2386":0.9865504977919071,"2387":1.9103684131647616,"2388":0.34123269912994225,"2389":0.06692254429693986,"2390":1.1009264024547574,"2391":-0.8443223919507515,"2392":-0.9926817575721879,"2393":-0.5642626161785657,"2394":-1.5833180841468482,"2395":0.021481319055349866,"2396":-0.4755257959917636,"2397":0.4573842817001135,"2398":0.041921594303605474,"2399":-1.5416817305351347,"2400":-1.6718106773243007,"2401":0.42838844133423354,"2402":1.0288056469916038,"2403":-1.3304021982507874,"2404":-0.3832344419332629,"2405":-0.5021504776562684,"2406":0.051890640877111836,"2407":-0.16902958014108738,"2408":6.849270848859017,"2409":10.227092892816529,"2410":4.81684684910577,"2411":0.8113004994679042,"2412":-1.1511513771123136,"2413":2.199365657436239,"2414":-0.3759710070455904,"2415":0.8583508217963242,"2416":0.1700673234188529,"2417":-0.9759921838310627,"2418":-2.0133792739339547,"2419":-0.5061072465394346,"2420":0.5142448583848853,"2421":0.1899632716193176,"2422":-0.07403651039564174,"2423":0.2185518327904871,"2424":-0.6113126282772319,"2425":-0.8066389592973132,"2426":-0.07064186599917112,"2427":-0.9749172452859423,"2428":0.7642949883384672,"2429":0.41755263305071916,"2430":1.1618453004464988,"2431":0.02958027327581198,"2432":-0.5816170365889847,"2433":0.07914787112322469,"2434":0.8350504513476638,"2435":1.0952988931067407,"2436":-1.2598821178152924,"2437":-0.7146033245077527,"2438":-1.407530017442755,"2439":0.24032813760482574,"2440":-0.8306529750416394,"2441":-0.1063947443961621,"2442":0.13563794747474067,"2443":0.19632927118891477,"2444":-0.5939919911545063,"2445":0.2864158796575517,"2446":-0.9282347390962473,"2447":-0.18120846566951326,"2448":1.0520868361867344,"2449":-0.027405526992935882,"2450":0.5034259897166747,"2451":0.8223150658785432,"2452":0.5229245191772122,"2453":1.2060292062488227,"2454":0.50240316439279,"2455":0.17841670200550358,"2456":0.23991169117064032,"2457":0.9225503475470275,"2458":0.29437476737184837,"2459":-0.3331090563731318,"2460":0.6389563749163495,"2461":0.5412740398691076,"2462":0.12689067723665032,"2463":0.9121911853530333,"2464":-0.7966152657717019,"2465":-1.469370298606436,"2466":0.3752987474976608,"2467":-0.25211098413334876,"2468":0.33317745112469566,"2469":-0.6903575420014526,"2470":0.5107693504269134,"2471":0.6344418539540821,"2472":0.3132753279904394,"2473":-1.5609482785519804,"2474":-1.0129986957340051,"2475":-0.8564670408603714,"2476":0.40368884794608045,"2477":0.13648330555083196,"2478":0.19984560432344625,"2479":0.14668722412868096,"2480":0.2669248646750107,"2481":2.353809926251158,"2482":-0.9974352415365041,"2483":-0.27335804924245094,"2484":-0.6975480288179732,"2485":-0.12384738759647651,"2486":-0.0753102656497795,"2487":-0.08167263937609663,"2488":-0.2619148426446547,"2489":-2.0967361327241765,"2490":0.33033234541227835,"2491":0.9402078015264397,"2492":-0.40205338609984376,"2493":-0.21056048841097721,"2494":-0.20677293164124144,"2495":-0.16683504140278774,"2496":-1.1889208738357901,"2497":-0.5659106732302221,"2498":0.01187314179836239,"2499":-1.9125169225353245,"2500":-1.198829273318513,"2501":-0.15175627545530598,"2502":0.5927550782077383,"2503":-0.07510886726625089,"2504":0.32716051672809776,"2505":-0.959736395931533,"2506":-1.0223729075000854,"2507":2.951953641609031,"2508":7.827496692029593,"2509":0.30538511259500223,"2510":-1.3517531938258285,"2511":1.6792529346732834,"2512":0.5120661849786157,"2513":-1.2945116791139175,"2514":0.8502976296823561,"2515":0.962354267553611,"2516":3.780191597137687,"2517":1.4500601646092992,"2518":-0.211518330009107,"2519":1.5783734492548065,"2520":1.3125295691736871,"2521":-0.91200908602959,"2522":1.083041378532453,"2523":2.2575416818826244,"2524":-1.2808548411715632,"2525":0.41542071184236007,"2526":0.18648384515368713,"2527":1.8709743628689968,"2528":0.30927926910021475,"2529":-0.0916193478319639,"2530":0.23955456380640697,"2531":-1.191531272815993,"2532":0.09229860761085072,"2533":0.2743821721974636,"2534":-0.6431332062137737,"2535":-1.3739979507660434,"2536":0.9265201599021758,"2537":0.03571470662600279,"2538":-0.9862529245321536,"2539":-0.22699063803066788,"2540":0.3551444069606226,"2541":-1.5220225511125516,"2542":-2.6590117164162814,"2543":0.3974543044834891,"2544":-1.019293002996691,"2545":0.8559337446534339,"2546":0.2949002122000522,"2547":-0.9362883065193113,"2548":-0.6620575573686976,"2549":-1.8368322122928216,"2550":-1.8872319417166605,"2551":-0.0709709195269754,"2552":2.543741015761445,"2553":1.9475112811593445,"2554":-1.2209489338222272,"2555":-0.4008849438406045,"2556":1.129972471390547,"2557":-1.475960599317548,"2558":0.7141544021518159,"2559":1.643826443035261,"2560":1.0559749399353173,"2561":-0.28682680069463357,"2562":1.45231136798277,"2563":0.009816282652404253,"2564":0.45829517296869293,"2565":0.5709623032652456,"2566":3.3031294998304137,"2567":-0.7419761140035037,"2568":2.063165072716944,"2569":0.3804633804997967,"2570":2.4320652446620046,"2571":-0.45642289159881777,"2572":0.6257078066955611,"2573":0.9346075245991183,"2574":2.0087446847291113,"2575":-1.3454161173384038,"2576":-0.8932855799726387,"2577":-0.05669740061722789,"2578":-0.776884581908116,"2579":0.043717198457867014,"2580":-0.5304004591466306,"2581":2.094368058105544,"2582":1.0408048396820788,"2583":0.7892543128482724,"2584":0.5974824942693581,"2585":3.1960266657132013,"2586":1.5009887151626127,"2587":-1.3429701981679492,"2588":-1.3735319263938566,"2589":-1.480037179639559,"2590":-0.810800622183481,"2591":0.9473032485873276,"2592":2.230655030221869,"2593":2.1428637032624285,"2594":0.1092329160084752,"2595":0.3380505218278582,"2596":-1.2551811128141632,"2597":-1.4440461020608428,"2598":2.519938573958337,"2599":-3.195615639312164,"2600":0.49409256614175584,"2601":-2.6825499697191164,"2602":-1.3552343335441734,"2603":0.892454428141429,"2604":-1.4887641790011956,"2605":1.9446866915349226,"2606":1.1146356375173687,"2607":0.012055498832153143,"2608":0.2555884957064119,"2609":-0.3249712501284127,"2610":0.7578091230730342,"2611":1.307824483723053,"2612":1.261910951950643,"2613":-0.5399886952733663,"2614":-2.1089713715064673,"2615":-1.0096422667749705,"2616":-2.787745166977161,"2617":1.3256621419840566,"2618":-0.9358238853057336,"2619":-0.6651166094072647,"2620":-0.7623075564284748,"2621":1.1447605793576359,"2622":-1.1714555512411724,"2623":-0.3352326041760892,"2624":0.046592169674589214,"2625":-1.1680130908720503,"2626":0.7697070713760633,"2627":-0.42346862107443023,"2628":-0.010366065462534763,"2629":-1.0799234110426794,"2630":-0.6117007743294762,"2631":-1.281750988102556,"2632":0.49316234191619635,"2633":0.8711821433294611,"2634":-1.2005856836146727,"2635":-0.9404589448744165,"2636":-1.2794895456281297,"2637":0.64536189474258,"2638":1.3513443761331585,"2639":0.501525963195984,"2640":-1.6179111856678534,"2641":-1.5667087630013765,"2642":0.8315778262900685,"2643":0.48412679774029066,"2644":-0.3040657962168451,"2645":-1.0565285255017411,"2646":-0.3384277132732888,"2647":1.3074226060518812,"2648":-3.854000289198158,"2649":1.3375944742651145,"2650":1.4733651359543714,"2651":1.4333838334428783,"2652":-0.1723489236408251,"2653":-0.8402654496700064,"2654":2.7798400466606537,"2655":1.9486395056771262,"2656":1.160475254503143,"2657":-0.5137794030186867,"2658":0.9614254925605481,"2659":-2.3855585780852895,"2660":1.3859362385507494,"2661":0.5180718695378963,"2662":-1.0224116965975611,"2663":3.876139700485822,"2664":3.7956609428761645,"2665":0.8863079260298722,"2666":0.9289929327010995,"2667":-1.320736633876565,"2668":0.7714962466754367,"2669":0.8939001457940955,"2670":-1.0954276517564676,"2671":-2.4679146530583576,"2672":0.40791756017830366,"2673":2.2037876188180703,"2674":1.1858167726969548,"2675":-1.338633695390856,"2676":2.539920994729305,"2677":2.19413931528979,"2678":0.6856538618275739,"2679":0.46159653297771824,"2680":-2.892034979584864,"2681":-2.0353005477556048,"2682":-0.13114538682639476,"2683":-1.7046275600190886,"2684":0.5762131670904718,"2685":0.8342389547636708,"2686":-0.7147239647145722,"2687":0.6971349866312422,"2688":0.8750984497798786,"2689":0.7792702062775309,"2690":0.4190464488721119,"2691":2.2196670941634338,"2692":0.8756012560396227,"2693":1.7294348607535077,"2694":-0.908961453935661,"2695":-0.4885678807482567,"2696":1.2476280857011242,"2697":-0.4594881624382529,"2698":1.3241507094512501,"2699":0.3980991917634045,"2700":-0.08333714477900865,"2701":-0.9252928023190642,"2702":0.3700805794271873,"2703":-0.06728511044603858,"2704":-1.219067306612584,"2705":0.4630461314003194,"2706":0.11829937725304142,"2707":0.06943291288757808,"2708":0.025400195709144088,"2709":-0.35319135622038855,"2710":-0.44051227475371163,"2711":0.019595444194843714,"2712":0.30749912458824435,"2713":-0.19253999118772536,"2714":-0.012241377070530787,"2715":0.7918624043345661,"2716":-0.2118699660551009,"2717":-0.6165953814007925,"2718":-0.3165720693014953,"2719":-0.2663007198081804,"2720":0.12449427411957888,"2721":-0.12723615190292956,"2722":-0.008202192207750921,"2723":0.23944855739624407,"2724":0.3349028161575334,"2725":0.27851900860984785,"2726":0.06461802155159899,"2727":-0.2666492451710075,"2728":-0.5780118971614959,"2729":0.2582872605135674,"2730":0.3468028506506051,"2731":-0.1991014943610434,"2732":0.11471381150301593,"2733":-0.7550626188058628,"2734":-0.14704418671642652,"2735":0.12857642926355453,"2736":-0.03930812276687356,"2737":-0.6249468798508055,"2738":-0.36705091155245134,"2739":-0.36135883109532135,"2740":-0.2563597161487668,"2741":0.2861226480669132,"2742":-0.2751412889195786,"2743":0.04842997017311219,"2744":0.9604894505232353,"2745":13.615436718099096,"2746":-0.3404916205514783,"2747":-0.5094884536113645,"2748":-0.4030942736539607,"2749":0.09762097453090851,"2750":-0.24455699526869734,"2751":0.28201936484050555,"2752":-1.077877322619307,"2753":0.31115817172593635,"2754":-0.0842413378869418,"2755":-0.03329531152220836,"2756":0.005688823523666934,"2757":-0.11274264043538514,"2758":-0.28635974760218,"2759":-0.10342063392044715,"2760":0.21480536595640648,"2761":-0.03770657756165182,"2762":0.10524655467500532,"2763":-0.5028630077185656,"2764":-0.10109475109885645,"2765":-0.47118659178004507,"2766":-0.2400055163552367,"2767":-0.09213089532976039,"2768":-0.12186968286614284,"2769":-0.45931327419143736,"2770":-0.041256958085726436,"2771":0.41213891346221965,"2772":0.10623173859813007,"2773":-0.2260381260748136,"2774":0.10780613368497043,"2775":-0.03446238257347393,"2776":-0.3875715752754147,"2777":-0.11493924726843548,"2778":-0.37117369670949685,"2779":-0.13394756401773378,"2780":-0.2739345712782859,"2781":-0.33736688506279666,"2782":-0.21217466248152012,"2783":0.13436664603811438,"2784":-0.32827300783908925,"2785":-0.01837987056249319,"2786":-0.053841164426598136,"2787":-0.41675330215989476,"2788":0.3725898557885246,"2789":-0.021480731471404446,"2790":-0.17146208780959857,"2791":0.0025766296675383883,"2792":-0.3470330645118587,"2793":0.3165077248904061,"2794":0.5547715236921225,"2795":0.7468682382062879,"2796":0.30221487562156313,"2797":0.7295237397782829,"2798":0.4863550450153382,"2799":-0.9990510196572523,"2800":0.31991211427068583,"2801":0.19441142526542074,"2802":0.12344133488119072,"2803":0.02262452628672585,"2804":0.1649935863422438,"2805":0.4076795629824366,"2806":-0.0397245957100914,"2807":0.004113752541352977,"2808":0.02662105082313613,"2809":0.5950474210361344,"2810":-0.37357523265974246,"2811":0.33865115833907594,"2812":0.2836311738491869,"2813":0.13382636886758148,"2814":0.7400878622024112,"2815":0.5574004202142474,"2816":-0.7163749365256247,"2817":-12.81311126930962,"2818":0.33455844166307214,"2819":0.3881913046469996,"2820":0.199048532369442,"2821":-0.34345004532813467,"2822":0.5310711390393356,"2823":0.01791716744729536,"2824":0.14307711928043088,"2825":0.59470202754737,"2826":-2.111217079832058,"2827":2.417197148789548,"2828":-0.4396111534973685,"2829":0.14186739891070568,"2830":-0.06069089869279513,"2831":0.12145525241192498,"2832":-0.07483336602514386,"2833":0.45994050774764694,"2834":-0.18580617156506618,"2835":-1.4317619396128758,"2836":-0.09911205172849841,"2837":0.10383958677806798,"2838":0.11012381453339128,"2839":0.29061294321227554,"2840":-0.14345457852461266,"2841":0.01565791206849422,"2842":-0.2919811765531795,"2843":0.6278969798472077,"2844":-0.2512174921320736,"2845":-0.0014791407081632096,"2846":0.7234876718679357,"2847":0.044662873996456735,"2848":0.289370109376682,"2849":0.15498034673331879,"2850":-0.08277870179463587,"2851":0.32385271800431575,"2852":0.2852305925006724,"2853":0.36614740339565754,"2854":0.736266317302826,"2855":-0.005694448578145914,"2856":0.04369677094009297,"2857":0.005035987643836142,"2858":-0.019601957849931857,"2859":0.12208814516830645,"2860":0.2636910049591275,"2861":-0.6269512807564541,"2862":-0.15547762389307576,"2863":-0.032327336860604905,"2864":0.280608745702273,"2865":0.011719043851992681,"2866":-0.12940615583228454,"2867":0.1269231160676517,"2868":0.4896090943055114,"2869":0.6534789591759028,"2870":0.28810087805614276,"2871":-0.1682268741020991,"2872":0.39594861847299906,"2873":0.4923997833525463,"2874":0.19816017115002812,"2875":0.24716267436790224,"2876":-1.0595178640044982,"2877":-0.3106430059038924,"2878":-0.3556371573636647,"2879":0.1445694905752829,"2880":0.7488566029913376,"2881":0.2918335005942625,"2882":0.5649152713114768,"2883":0.12064976940049162,"2884":-0.24887479870944854,"2885":-0.06803816118861977,"2886":0.11727098013037603,"2887":0.060241648984176374,"2888":0.6054541637019462,"2889":-0.2311818138700353,"2890":0.6734862787866691,"2891":0.40286990305207604,"2892":0.2542008743077772,"2893":0.9366646476806428,"2894":0.21791302653678035,"2895":-0.14941386845046442,"2896":-0.5499208424125372,"2897":-0.60462034403622,"2898":0.2878420690286375,"2899":-0.11294242433523317,"2900":3.3138436270682154,"2901":1.1475707289846475,"2902":0.009909690284132296,"2903":-0.33671090049500546,"2904":-0.41490595783926537,"2905":-0.553002661951307,"2906":-0.2061282992936238,"2907":-0.23384942372139475,"2908":0.38244492164304117,"2909":0.3547257063906665,"2910":6.816716030385944,"2911":1.6812889771221038,"2912":1.6914811517259865,"2913":1.2932622949805652,"2914":0.10020323796928197,"2915":-0.44285467481080937,"2916":-0.5838599931899707,"2917":0.5643215437054121,"2918":8.07790447288866,"2919":-1.4605424161253173,"2920":-0.6860613827914901,"2921":-0.4631327311151972,"2922":0.7354194516448667,"2923":-0.2799074655947217,"2924":0.7235432274465172,"2925":0.051355485643879775,"2926":0.660496123621831,"2927":-1.046028717741764,"2928":-0.3198681130115925,"2929":0.04627821605055466,"2930":0.07743736029231128,"2931":-0.2111527340964055,"2932":0.06898854679617658,"2933":-0.7744188573825138,"2934":-0.7388630841605959,"2935":0.13766840547867457,"2936":-0.888684196033489,"2937":0.008905933914829247,"2938":-0.2111624597666273,"2939":-0.09048769801242044,"2940":-0.3622879212683467,"2941":0.840689117336973,"2942":0.29587301908943314,"2943":-0.22755275940890923,"2944":0.2976661436569114,"2945":-0.029169575569094625,"2946":0.2924250375539681,"2947":-0.33969032334678767,"2948":-0.5275284972331061,"2949":-0.5927177376831517,"2950":-0.23816715485517892,"2951":-0.08150509638116661,"2952":-0.4870727037153511,"2953":0.7286368022798573,"2954":-1.2221704022461775,"2955":0.24496352330238416,"2956":-0.39314550812314153,"2957":-0.2886101134914119,"2958":-1.0032636039690055,"2959":-0.31119817170785324,"2960":1.2449794657175512,"2961":0.16317591071773044,"2962":0.08782688319155452,"2963":0.22120888307491962,"2964":-0.04161988121589979,"2965":-1.3030122703320601,"2966":-0.6655527340543014,"2967":-1.7955087195875106,"2968":-0.9408765440736697,"2969":-0.17845473800301354,"2970":0.1721543812754939,"2971":-0.5410750486895327,"2972":-0.9052520871962044,"2973":-0.9266913519794947,"2974":-1.3895115423025135,"2975":-1.0753963160816074,"2976":-1.0758378373224287,"2977":-0.2689873224374608,"2978":0.40324973791940905,"2979":-0.9567298520512768,"2980":-0.5991676178747468,"2981":-1.126765843179434,"2982":-7.7031087692733164,"2983":-7.651585833574939,"2984":-1.2750467765135938,"2985":0.5182696637250663,"2986":-0.35229533512920314,"2987":0.19771797764981341,"2988":-1.1628396588923702,"2989":-0.34882481642795155,"2990":0.5845917751707437,"2991":9.841009143451027,"2992":0.2129794135402273,"2993":0.5774274587940639,"2994":0.13755544755287685,"2995":-0.3053567718869962,"2996":0.039379563871938666,"2997":-0.1322900791216756,"2998":1.1533242486106792,"2999":0.5565371978004839,"3000":0.6737310378220838,"3001":-0.7034145724721128,"3002":-0.9683763337479778,"3003":-0.5067901429618171,"3004":-0.34579015317078116,"3005":0.3372152915205096,"3006":-0.5038572724293011,"3007":-0.9484045083310558,"3008":0.1660374373231879,"3009":-0.9851424436542396,"3010":0.46762457889342507,"3011":-0.693726919229236,"3012":-0.05984627418466682,"3013":0.6027805302424544,"3014":-0.7395968081837616,"3015":-0.6261154569344213,"3016":0.9127195078101868,"3017":-0.6698211988239463,"3018":-0.5975782518756679,"3019":0.30731485183815604,"3020":-0.44250725988190903,"3021":-0.4204022151708107,"3022":0.010669304532761712,"3023":-0.31860952573376944,"3024":0.2441307030782072,"3025":0.9801365837941806,"3026":-0.41070190009783225,"3027":-0.13314434791733917,"3028":-0.12621412100323842,"3029":0.6279053745876487,"3030":-0.6404707956323145,"3031":-1.3859316064875535,"3032":0.5271782017648441,"3033":-0.1478579346400931,"3034":2.229506019490882,"3035":0.9301887787161969,"3036":2.231575449559799,"3037":0.25899826456909636,"3038":0.20181183158044336,"3039":-0.4906150229992343,"3040":-0.39501486415296705,"3041":1.0121931519603131,"3042":0.6985675301347042,"3043":0.3114291214394322,"3044":0.05144107659643659,"3045":-0.030762486213150544,"3046":0.25722203823765477,"3047":-3.0157535980439247,"3048":-0.03557230928524676,"3049":1.4726855658841091,"3050":-1.902987736962547,"3051":-1.446289247654942,"3052":0.4656898904201884,"3053":-0.32737954173884315,"3054":0.9864620021917945,"3055":-0.3798804136988782,"3056":-0.09622237340091727,"3057":-1.5874561176872444,"3058":0.3389736450548088,"3059":-0.041791862106815326,"3060":0.16796364489491286,"3061":-2.1184937004326674,"3062":-1.3966553548645784,"3063":-0.18307010995854198,"3064":-0.9282888894346271,"3065":-2.991370034022486,"3066":-1.1255285420778744,"3067":-0.6380179020495486,"3068":0.979996914795524,"3069":-2.591494211895668,"3070":-0.4956431683329791,"3071":0.7920504178516921,"3072":0.3832429753135857,"3073":-1.1301813877447469,"3074":1.1755080707046308,"3075":0.07838599348225185,"3076":0.6402425419484218,"3077":2.0963254596819074,"3078":0.2363580031032707,"3079":-1.3772374653467538,"3080":1.4673593714127022,"3081":0.4585080670178819,"3082":-2.4585853965280475,"3083":-1.8299779048775944,"3084":-0.9405676821171446,"3085":-1.5399931872313415,"3086":-0.6409285731839512,"3087":-0.5468959520141428,"3088":-0.31169382391830197,"3089":0.7787727297304143,"3090":1.6257588497553912,"3091":-1.6006895218589083,"3092":-3.0129550533397875,"3093":-1.3860951277867477,"3094":-3.3760963062285887,"3095":0.4996477331144466,"3096":-0.15304007789073742,"3097":-2.120600676661022,"3098":1.1442525014854374,"3099":1.093856426954229,"3100":-1.7954379505035494,"3101":0.6611515021177463,"3102":0.6476674089646957,"3103":0.15861011993070329,"3104":-1.36886852542566,"3105":0.5608596276108664,"3106":-1.1362787183784875,"3107":-0.23367050864965283,"3108":-0.37042665844833994,"3109":1.7797105703558846,"3110":-0.6435908485160979,"3111":0.7162107679060242,"3112":2.0683327034465417,"3113":0.3899155826397423,"3114":-1.4828699852261753,"3115":1.6418924828035655,"3116":-1.7786101782022015,"3117":2.184109185687297,"3118":1.3575177122893471,"3119":-1.6171457982427127,"3120":0.8009253874881572,"3121":0.15937217738163018,"3122":-0.8730640765576966,"3123":-1.0696779188614083,"3124":0.2299651281043915,"3125":-1.8321927757681409,"3126":0.732539484824298,"3127":-0.3659333727959459,"3128":1.5148814790984224,"3129":0.37540534066728704,"3130":0.26046690511165216,"3131":0.5882147095285889,"3132":-1.2203145522900705,"3133":-0.7079905321366196,"3134":-0.22675084308684437,"3135":-0.9519576716527578,"3136":3.356330349803716,"3137":1.7303373328000666,"3138":2.294482244524601,"3139":0.018190535852149747,"3140":-0.9306436744534184,"3141":1.3297610776200366,"3142":-0.8367839261864887,"3143":-1.0084610672097887,"3144":0.1804317183669416,"3145":2.207518409927582,"3146":3.579175063331085,"3147":1.9601404715638326,"3148":2.0108753396433134,"3149":1.0771452386470228,"3150":0.3176478728686774,"3151":-1.4595207616077441,"3152":0.2076518847207717,"3153":-0.5604290013929258,"3154":-1.7042505144272484,"3155":-1.5990905873011356,"3156":-0.9469725348050055,"3157":0.16529135630029607,"3158":-1.2660405655022304,"3159":-0.09273225570588582,"3160":-0.8999758618442248,"3161":-0.0171220990420436,"3162":-1.9244713800962725,"3163":1.5893616137901903,"3164":2.8183872165177823,"3165":0.004306811838765885,"3166":-0.6564987508839063,"3167":1.3324973714301893,"3168":-0.49616190677317223,"3169":1.3974232885435747,"3170":-0.6466748489447813,"3171":0.8930906130439173,"3172":-0.6915503955281455,"3173":-1.5110036779118847,"3174":-1.328484587410613,"3175":-1.2831740922646757,"3176":-0.8999684504093163,"3177":0.37826346231586755,"3178":0.05911678306808261,"3179":-0.7836997758555815,"3180":-0.2103630810541355,"3181":-2.0831062566801997,"3182":-0.4891022399241905,"3183":0.14094680374067367,"3184":0.020571429255740476,"3185":-0.1948068928865716,"3186":0.052611206395512845,"3187":-0.5158872792038097,"3188":-0.7400803568960649,"3189":2.756443136562643,"3190":2.327429945308708,"3191":-0.9523030503501622,"3192":0.8662207585051431,"3193":-0.41135471377873434,"3194":-1.9012668226489498,"3195":-1.529546955207106,"3196":-1.7502790403647823,"3197":0.25840215140188794,"3198":-0.6976370297221809,"3199":-1.6359953766396569,"3200":2.5927816360291387,"3201":-0.19946989200089094,"3202":-1.106937598167052,"3203":-0.30420849811116296,"3204":-0.10400973640514334,"3205":-0.38234765010847227,"3206":-0.21223022658270405,"3207":-0.49207092940068237,"3208":-0.3030388106281776,"3209":0.9033031334228082,"3210":-0.10715787552743686,"3211":-1.1537106697371218,"3212":-0.6848213786624172,"3213":-0.33300934387964376,"3214":-0.14217563087205998,"3215":-0.404201920378697,"3216":-0.3411317067873851,"3217":-0.6919434631266299,"3218":-0.6621404265221432,"3219":-1.6218809577481672,"3220":-0.8566989980703381,"3221":-0.6594062489602298,"3222":-0.5902500489180336,"3223":-0.4542953360012872,"3224":-0.3821145209913271,"3225":-1.1471758831958896,"3226":-0.3329680562004751,"3227":-1.9356244059565035,"3228":-1.7113738244320436,"3229":-1.2050174572854273,"3230":-0.7892604301790084,"3231":-0.25375997058490446,"3232":-0.34568172465671765,"3233":-0.359036805953327,"3234":-0.6129840707994783,"3235":-0.143493713489178,"3236":3.188187809964739,"3237":-1.0428922047915898,"3238":-0.3958371184784502,"3239":-0.18397706030582708,"3240":-0.4820509031684797,"3241":-0.02575355859401266,"3242":-0.4881102657848111,"3243":-1.9125798976717538,"3244":-0.7920484354803291,"3245":0.11579592983289347,"3246":-1.2455692642723952,"3247":-0.8836517705603762,"3248":-0.16395658496244636,"3249":-0.2697596752450372,"3250":-0.40583902286943296,"3251":-0.44667098402030353,"3252":-0.8927669340570362,"3253":-0.5282170360506793,"3254":-1.068301510362734,"3255":-1.1250815494207027,"3256":-1.1336165475318158,"3257":-0.9577699520273184,"3258":-0.6415483103689291,"3259":-0.3901113220732403,"3260":-0.5279454368271094,"3261":-1.5957151136123038,"3262":-0.60129346074835,"3263":-0.5039177601521485,"3264":-0.9837901245522376,"3265":-0.6854019896144399,"3266":-0.985971985528311,"3267":-0.48647506295269355,"3268":-0.41562977529347145,"3269":-0.4145378387481596,"3270":0.10949424876535248,"3271":-1.4037076115748155,"3272":1.32284184528698,"3273":-0.6642234179070821,"3274":-1.2266745753797312,"3275":-0.9740988314595738,"3276":-0.41906292581471305,"3277":-0.345692857326869,"3278":-0.33195265469599505,"3279":-0.21130918993878522,"3280":-2.192958645863212,"3281":-1.0360804288259233,"3282":1.6927032172403982,"3283":-0.6254386721252678,"3284":0.18817497454664908,"3285":-0.08966573125510559,"3286":-0.12043060215097147,"3287":1.7501323876485702,"3288":2.27097217057966,"3289":-0.2896277821906102,"3290":1.1105478908285467,"3291":0.3408965969332741,"3292":-0.966031733130914,"3293":0.14552042571031837,"3294":0.5352743529238266,"3295":-0.525816221298553,"3296":-0.017685109526060127,"3297":0.8097095284676287,"3298":-1.8558182894969852,"3299":0.5187370512428364,"3300":0.36565305117238994,"3301":0.8402755214934717,"3302":-0.2517179226333506,"3303":0.17671911101567928,"3304":-1.5869171646837497,"3305":-1.0026916763285865,"3306":1.7362848295586495,"3307":-1.2421861165164256,"3308":-1.016843440921463,"3309":-0.3412828522668322,"3310":-2.87645869943435,"3311":-0.6989695416687763,"3312":-0.36456879820333454,"3313":-1.2292896245765663,"3314":0.24430598355947397,"3315":0.1573429322822408,"3316":0.8049028533002145,"3317":0.4871469240160679,"3318":0.19312434020852062,"3319":0.7795738816246958,"3320":2.475309745786783,"3321":2.3559822356382356,"3322":2.100731170991968,"3323":0.26292707590384323,"3324":-0.025635744281437736,"3325":0.7830409922419177,"3326":1.4764598660144397,"3327":-0.12264240080112951,"3328":-0.14390135051022465,"3329":-0.5282181091215796,"3330":4.718239060012562,"3331":5.984812362406182,"3332":3.4819813155561015,"3333":3.24653537711243,"3334":-0.600539688514954,"3335":-0.5086732601541023,"3336":0.8550207996429341,"3337":0.23615271601311982,"3338":0.16657973012156826,"3339":0.5072492061637445,"3340":-0.8879270294412765,"3341":1.5755846257052029,"3342":0.10850201992641295,"3343":2.9583047943993384,"3344":1.717022482326289,"3345":-0.5186842754039467,"3346":-2.354569827321785,"3347":-1.962279000884614,"3348":-0.2688193858384495,"3349":-0.17400733455644696,"3350":-1.1239023019096739,"3351":0.36140598592723494,"3352":-1.37204349294246,"3353":0.8397984226502271,"3354":-0.46430992071602484,"3355":-1.7311930181407569,"3356":1.1934953551297687,"3357":-0.7866242315130572,"3358":0.6543797334103287,"3359":-0.2778195668165713,"3360":-0.06347777003497079,"3361":0.10715815415517743,"3362":-0.2260171167989298,"3363":-0.4424710247483717,"3364":1.3893847453427763,"3365":-0.10116303670182325,"3366":0.25149647933929187,"3367":0.7074229977008195,"3368":-0.1337868887212344,"3369":0.6472119890508434,"3370":0.3693977957907392,"3371":-0.7256923754366864,"3372":-0.9717765125112764,"3373":-0.8395240102153502,"3374":0.8947848157481081,"3375":1.103390287624545,"3376":-0.3086032303557248,"3377":-0.07791612617004001,"3378":-0.4337472567201154,"3379":0.05838743228864818,"3380":-0.05365387496274129,"3381":0.7792494891526449,"3382":0.10510223488306479,"3383":-1.155532896760376,"3384":0.590736371657146,"3385":-0.11386906249261515,"3386":-0.42788773892990645,"3387":0.17451169368825267,"3388":1.0811144041532337,"3389":0.07541519471011146,"3390":-0.5067399179325406,"3391":0.39208294164446456,"3392":-4.803505544477424,"3393":-2.1918510319590694,"3394":-0.7266757254435561,"3395":0.6618464355500241,"3396":0.04802775955238345,"3397":1.2497581408285579,"3398":0.831850595149842,"3399":-0.3435144642076453,"3400":0.9154403109118677,"3401":-1.2054723447809719,"3402":-11.579400292123482,"3403":1.6395941416594335,"3404":0.06288465383676858,"3405":1.043111633547042,"3406":-0.831561217349286,"3407":-0.41914846841058967,"3408":0.11008862074720643,"3409":0.19981149678340382,"3410":-3.0355871896060567,"3411":-0.48689927679825173,"3412":0.5695560358855715,"3413":0.11131664359827835,"3414":0.14526528917800316,"3415":0.9545228872523186,"3416":-0.27396357197256777,"3417":0.32663953460294043,"3418":0.17874518570633427,"3419":-0.5057947165384684,"3420":0.3779282003310536,"3421":-1.0207983801990572,"3422":0.3905534853127714,"3423":0.45172140420070955,"3424":-0.43977567350964814,"3425":0.6658111933237203,"3426":-0.44551619819595106,"3427":0.02335032604600256,"3428":0.25518711286265133,"3429":-1.6332868719726725,"3430":-0.05530861095081848,"3431":-0.3290382649443196,"3432":0.2797448641738629,"3433":0.9775318676546054,"3434":0.46952098619966726,"3435":-0.844598293790537,"3436":0.12131298576861271,"3437":-0.09939000036126228,"3438":-0.5787522848569221,"3439":0.5061371100435622,"3440":0.9768485136648006,"3441":0.21080269686950232,"3442":-0.1260216348451461,"3443":0.40010809247328716,"3444":-1.2280781919481651,"3445":-0.6859842476512691,"3446":-1.826731078087165,"3447":-0.3120331444744125,"3448":-0.168575345359729,"3449":-1.5900684672128897,"3450":-1.276169659263966,"3451":-1.2776432688119361,"3452":-2.434170397615258,"3453":-0.08649247312328101,"3454":0.4461323800760906,"3455":0.5333441325909791,"3456":-0.2965088026151476,"3457":-0.3787556117437666,"3458":-0.2700299403198418,"3459":-1.1798236787641558,"3460":-1.14429525258921,"3461":-0.8570055066274656,"3462":0.10976425898014612,"3463":-0.0493332250933602,"3464":0.4278285326094277,"3465":1.0248565242021994,"3466":-0.49682557379800957,"3467":-1.8178028511647013,"3468":-1.8840412857635358,"3469":-1.9963918338909334,"3470":-0.6368812206348059,"3471":-0.4081905270778888,"3472":-0.6007214420160689,"3473":0.1835259454746179,"3474":-0.5877176543242951,"3475":-0.9559926936087079,"3476":-1.6256350237053865,"3477":-0.9579784210142481,"3478":-1.6418929947145418,"3479":-1.7165547243025312,"3480":-0.25358175906078323,"3481":-1.2756294378985087,"3482":-0.22993094043312187,"3483":2.088416554170582,"3484":-0.8464578353493243,"3485":-2.6175184743557587,"3486":-1.8121138289560004,"3487":-1.5479991767888912,"3488":-0.5598369552352294,"3489":1.7270146221925218,"3490":-0.1724936098591763,"3491":0.1710416982952289,"3492":0.19370038624006145,"3493":0.49340816446118146,"3494":-1.710719217330812,"3495":-1.1931011318929874,"3496":-1.291215896720322,"3497":-1.0138785236937566,"3498":1.2300404782629413,"3499":-0.019384893409961686,"3500":-1.4429966678358528,"3501":-0.43164187260154374,"3502":1.3185463965505035,"3503":-0.04876158812723852,"3504":-2.123585115350187,"3505":-1.8007512334208162,"3506":-1.6829970248962205,"3507":-0.6353829949678881,"3508":-0.2810660931248496,"3509":-1.288948082602075,"3510":0.5814173411870285,"3511":0.4764836786995985,"3512":-0.0795622537654524,"3513":-1.4363378866786063,"3514":-1.4118437124561896,"3515":-1.8092414350103,"3516":-1.8554790703682549,"3517":1.6330275683277755,"3518":-1.45597225556591,"3519":0.4086696283973309,"3520":-0.35575901913269364,"3521":-0.8618497342545313,"3522":-0.5852938155235192,"3523":-1.0677598158928143,"3524":-1.5839362100732164,"3525":-0.10411823107413422,"3526":0.3047784621007274,"3527":0.7338787002069832,"3528":1.6091494123617167,"3529":0.2661013712323345,"3530":0.19068476528585054,"3531":-0.5348729015390624,"3532":-0.10074662304883839,"3533":-0.7162679665131546,"3534":1.937550928765455,"3535":2.276456314802237,"3536":-0.6658770605073504,"3537":0.4942394539582409,"3538":1.9172217127127145,"3539":1.9005793663440176,"3540":0.5128163154829917,"3541":0.7742876272186412,"3542":0.7760740479572664,"3543":0.18490751490700064,"3544":-1.0974821075411656,"3545":-0.12563714657772773,"3546":-0.46957492458111133,"3547":0.25809531664436425,"3548":1.0917942084587604,"3549":0.3483930812479096,"3550":1.376307163501421,"3551":-1.0908699359140677,"3552":0.3779581309783107,"3553":0.13061619384800277,"3554":-2.276106795598657,"3555":-0.5008750444369712,"3556":-1.0139438949751494,"3557":1.5995265404526784,"3558":0.11393491256058984,"3559":2.4186958659238953,"3560":1.5326278514015823,"3561":1.8376230119707793,"3562":-0.3998084539117644,"3563":-0.7425385955326687,"3564":0.218171344409045,"3565":1.856928650429327,"3566":0.5154303994543483,"3567":-0.7410031966453251,"3568":-0.20013877186986637,"3569":-0.25885737322437674,"3570":-1.0162136766226793,"3571":0.4022486097596971,"3572":0.33336085811445526,"3573":-0.9253829267535754,"3574":1.1178975804290974,"3575":0.6735705925941808,"3576":0.14656738840487415,"3577":-0.4656817973293558,"3578":0.40295748828813477,"3579":0.8292218761329049,"3580":3.0060516371585746,"3581":-0.5229101233970532,"3582":0.05774087345547102,"3583":-0.10130900607670841,"3584":1.5170712831499673,"3585":0.8521417664509411,"3586":1.3606335299563395,"3587":0.9781337507476419,"3588":0.16284460759825867,"3589":-0.27729068413156255,"3590":-0.06253753108156551,"3591":0.7440569931034332,"3592":1.8229486482684152,"3593":0.4850895103402478,"3594":2.281065933479611,"3595":0.30928835301525903,"3596":-0.004965281276388427,"3597":1.1043744050445803,"3598":1.9911354671558752,"3599":0.1710705347806702,"3600":2.4096394984315825,"3601":-0.7671219400383681,"3602":1.155935520961593,"3603":2.377917729515558,"3604":0.0828593101204729,"3605":0.12670199247429312,"3606":0.058142989721628534,"3607":0.23428299985318066,"3608":0.07700916361915128,"3609":-0.5041971085546048,"3610":1.1798401543952917,"3611":-0.12017073066408446,"3612":0.1650812979388466,"3613":-0.9354581185357881,"3614":-0.13445768395900887,"3615":-0.1896210269486607,"3616":-1.1035612814103852,"3617":-1.4024526640241881,"3618":0.7658779458921365,"3619":1.5014751455394053,"3620":-0.13360305246963505,"3621":-1.061524815139481,"3622":-0.410829350812512,"3623":-0.2799160851295323,"3624":-1.2960971896384317,"3625":1.3246574662984658,"3626":-2.2272807736022635,"3627":0.30077580507226154,"3628":1.888014452396026,"3629":1.3569276803353878,"3630":0.896859171607151,"3631":0.1737830437286698,"3632":-0.010743162372843538,"3633":-0.6952936072336903,"3634":0.8703787619455454,"3635":-0.25636631332925935,"3636":0.17724448877710605,"3637":-1.968803861856222,"3638":1.617731229612165,"3639":4.46149852435355,"3640":1.7463250714138623,"3641":1.3006877876361749,"3642":0.6435701213658277,"3643":0.541761967933007,"3644":0.0701026851061464,"3645":0.3421931955847651,"3646":1.1069668140108673,"3647":-0.7106132889785828,"3648":-4.3336261050044715,"3649":-4.647821433913675,"3650":-0.6424933979764219,"3651":-0.6125815332489478,"3652":-0.7147663974256913,"3653":0.9518426833071253,"3654":-0.9082567642221736,"3655":0.9929670188404955,"3656":-1.7041637383669368,"3657":-6.143395834524925,"3658":-4.720130136073415,"3659":-1.8552092168623424,"3660":-1.9257578192916547,"3661":0.19008563519303476,"3662":-1.0829388934041526,"3663":0.5509650978832611,"3664":-1.281380509064991,"3665":0.23362218283804723,"3666":-0.03336140899592106,"3667":-0.873235829619282,"3668":-0.508054096296492,"3669":-1.5218932812871084,"3670":2.0556837341846643,"3671":1.185635346198377,"3672":0.7528371511701701,"3673":0.4782980613666488,"3674":0.3454179236169548,"3675":1.7696376519466201,"3676":0.39854561586833853,"3677":0.15081305781890786,"3678":0.21311667847352403,"3679":0.7440456861825051,"3680":0.4237943059796621,"3681":0.06377214142981766,"3682":0.2997629701274553,"3683":-1.2452534828820516,"3684":-0.4057534848787794,"3685":-0.005145234910517229,"3686":-0.17336439355053845,"3687":0.6222585867433171,"3688":-1.1353561234175669,"3689":-0.1858484913063524,"3690":-0.14618040227356555,"3691":3.743148745424297,"3692":-1.678853007295479,"3693":-0.19884109413108753,"3694":-0.8748597941322669,"3695":-0.8963683945248699,"3696":-0.9723578297290156,"3697":-0.5272919086608379,"3698":0.5381285908130655,"3699":0.23322112868917313,"3700":0.9733471393676849,"3701":-0.8635331443062455,"3702":-0.18286259778280953,"3703":-0.6652020069616464,"3704":0.1801592144347635,"3705":0.24489948246319135,"3706":-0.03986821668598842,"3707":2.019585940665717,"3708":-1.672039058268259,"3709":-1.4945066068454973,"3710":-0.08404846245835637,"3711":2.2387100008696765,"3712":-0.8154067254294619,"3713":0.9369673787673998,"3714":0.9613419141830825,"3715":1.4824669190991904,"3716":0.4606661783952152,"3717":0.0618509720180997,"3718":0.15087562236122964,"3719":1.946295166830272,"3720":2.2257312676039325,"3721":0.7858503108889818,"3722":1.1109503872168347,"3723":0.22248659958518485,"3724":0.7171821446181286,"3725":1.4081631332502402,"3726":-0.9211173861303322,"3727":-0.05985751289209399,"3728":-0.7660928961381,"3729":-1.6810716879823622,"3730":2.7920375070091827,"3731":4.4678455511813295,"3732":4.187857236167181,"3733":3.6735525244916114,"3734":1.9660732020911744,"3735":-0.5077848734293368,"3736":-1.214366210628497,"3737":-0.059487129963461054,"3738":-1.1514720744636495,"3739":-2.735113163328154,"3740":-1.9774953188008533,"3741":-3.5541520411242162,"3742":-1.784905673951404,"3743":-2.2537553023457075,"3744":0.6661925723608436,"3745":2.3018867864362713,"3746":-1.5917860932430126,"3747":-0.34353550121604637,"3748":-0.4522992503065163,"3749":-0.2804798254333425,"3750":0.7354756279000972,"3751":-1.6847354371196386,"3752":1.2374516986888926,"3753":-0.8302208621758003,"3754":-1.1478072354829978,"3755":1.8068607475773908,"3756":0.6051672385876998,"3757":-0.6457130333670327,"3758":2.327497224411448,"3759":-0.006246975105530918,"3760":-0.3500653440584416,"3761":1.5946792982714642,"3762":-1.0169391401948389,"3763":-1.2165570351145476,"3764":0.310081232630054,"3765":-1.4215890387497805,"3766":1.2648696970003253,"3767":-0.4695802402534142,"3768":0.4846651852325365,"3769":0.14889155304216467,"3770":0.13257115278495873,"3771":-0.8201303786528512,"3772":0.3196728085666671,"3773":-0.8681911305444444,"3774":0.1887788495286733,"3775":-0.18448226396365267,"3776":-0.2929484369048073,"3777":0.7028663594361929,"3778":0.2486366106020555,"3779":0.8804006451377802,"3780":-0.5288151054155474,"3781":-0.09660618413318739,"3782":-0.15383978807131307,"3783":-0.2699787349446721,"3784":-0.42944148111995606,"3785":-0.28076815373490277,"3786":-0.2561523782845433,"3787":-0.8262452075896385,"3788":0.06438234831025651,"3789":0.634939850235908,"3790":-1.1000762275695708,"3791":-0.47854167705023165,"3792":-0.24738124064533493,"3793":-0.1657555040452483,"3794":0.05299550351671768,"3795":-0.5757279937081123,"3796":0.8979031746839277,"3797":1.6962222881932278,"3798":0.5226117081766352,"3799":-1.311727293091135,"3800":0.2185288879030963,"3801":-1.1871098054868394,"3802":-0.025339689912859963,"3803":2.5288407094368064,"3804":3.3566822679926975,"3805":1.1583805224144248,"3806":-1.3632808704302797,"3807":2.106407315398487,"3808":-0.14044217858595548,"3809":-1.7968507525803719,"3810":0.20135074178878568,"3811":1.8012642247298147,"3812":-6.895339192830167,"3813":-8.302949831185765,"3814":-7.549264013077158,"3815":-2.2647971633503516,"3816":-0.04607766002877279,"3817":0.7635683127889485,"3818":-0.8529295745259345,"3819":0.9425858029569105,"3820":0.6528867022125597,"3821":1.0960532455150431,"3822":1.9156872280005235,"3823":-0.0965487472018655,"3824":-1.2548315209213123,"3825":-1.1984035814757719,"3826":0.5530449616428018,"3827":-0.07264116725784915,"3828":-2.183272860588409,"3829":-0.20677577016913753,"3830":0.3821154130436864,"3831":1.3387918251310909,"3832":0.2450753465274817,"3833":0.09275758693888554,"3834":-1.5239471671957365,"3835":-0.15158806641895464,"3836":-0.6076859689827543,"3837":-1.6913224995766483,"3838":0.27905550587387085,"3839":-0.49600918607573935,"3840":0.5984215455544496,"3841":-0.16100282659791776,"3842":0.032432897327700924,"3843":0.3079773926142316,"3844":0.12020188542698386,"3845":0.9309461600750972,"3846":-0.503502701102545,"3847":-0.5652245894928665,"3848":-1.3199931832863563,"3849":0.15110695956195017,"3850":0.5027640343805203,"3851":1.2304059998283121,"3852":-0.21815815743737046,"3853":1.4473406719914936,"3854":-0.6438944993896775,"3855":0.7035336067507258,"3856":0.23365582687492867,"3857":1.2259678043994133,"3858":-0.08251237547463587,"3859":-0.20355869826900283,"3860":0.6136436667272316,"3861":-2.126205645694976,"3862":0.7048831364477707,"3863":0.125610154049107,"3864":-0.2563250532666624,"3865":1.4454494195966057,"3866":1.093446949357896,"3867":-0.7698080862795965,"3868":-1.0458823051738848,"3869":1.6928925017901226,"3870":1.4889358939625599,"3871":1.246647355811186,"3872":1.7270847260607745,"3873":0.5312025185796884,"3874":-0.33230352318750556,"3875":-0.774272336836368,"3876":-1.0861122360434585,"3877":-3.3215488811396914,"3878":-0.09369904920220311,"3879":-0.6452013039283151,"3880":-1.0120869300486455,"3881":0.825075871478772,"3882":1.3040724894478648,"3883":-0.7528698071070578,"3884":-3.037567163246206,"3885":-1.7444825988036174,"3886":-2.9724964775597655,"3887":0.3982085668582659,"3888":-1.1091046608155364,"3889":1.223937577103342,"3890":-2.1075542368506515,"3891":1.780322102789268,"3892":0.8776810129006263,"3893":-2.5076331445827766,"3894":3.4682771156967136,"3895":2.1027962654689754,"3896":5.52597195025209,"3897":4.641877681701259,"3898":0.4113699507210702,"3899":-0.12326607056481532,"3900":0.1249983957898435,"3901":1.94293596549665,"3902":0.6627866762553946,"3903":-1.7778146765657266,"3904":-1.6327470998630667,"3905":-0.015825392912910168,"3906":-0.6392110203660331,"3907":-1.0924837798042448,"3908":-0.32391399622543043,"3909":-0.2669613075884851,"3910":-0.04217297888963937,"3911":2.26157687562145,"3912":-0.6801947529406641,"3913":0.606640882318476,"3914":0.9687821270242172,"3915":0.6624731784522284,"3916":0.9190346729283904,"3917":-0.2899224172507853,"3918":-1.4443623356984077,"3919":0.4865560965581038,"3920":0.528410856982362,"3921":0.5588012822715477,"3922":-1.1222077129397543,"3923":-1.5153239051470595,"3924":1.8017568336464687,"3925":1.857351676663614,"3926":-0.6335305950114652,"3927":0.05107760460712495,"3928":0.07330124505257982,"3929":0.8103060943573368,"3930":0.6372058456581763,"3931":0.7225932148739864,"3932":-2.056696870285593,"3933":0.4443829227829407,"3934":0.13583637738058316,"3935":0.10678812340170897,"3936":1.3981617266441868,"3937":0.02169530922169541,"3938":0.4704716126791465,"3939":0.41843020896590566,"3940":0.0900358552130881,"3941":2.8377954122526012,"3942":0.46996707854307956,"3943":-0.10880767193469384,"3944":0.8924432021694252,"3945":0.6992831770384194,"3946":-0.40445813735377145,"3947":0.6017572344516162,"3948":2.767251287867139,"3949":-1.0632287182470774,"3950":-0.9840593809183494,"3951":-0.03378787537704069,"3952":-1.1666198744092044,"3953":-0.6410725796824092,"3954":0.4848926780654328,"3955":1.6037211532736613,"3956":0.7021110944063803,"3957":0.3657731018691402,"3958":1.326823222612661,"3959":0.9690850452006363,"3960":0.043533102229055855,"3961":-1.1742459740146607,"3962":0.6370085482458512,"3963":0.48930302095114836,"3964":-0.47050764728779043,"3965":-2.806382417459886,"3966":-1.1103166464443763,"3967":-0.4464096297609852,"3968":2.243392032950484,"3969":2.162027539611784,"3970":3.1620926787901285,"3971":2.929252797686358,"3972":-0.45706285043323747,"3973":2.158757169661853,"3974":1.922239428834695,"3975":2.9033840828724067,"3976":-0.44673981072559155,"3977":1.2261631832512117,"3978":1.9430731018616463,"3979":0.31979181432392706,"3980":2.2316494527212436,"3981":1.4779526773972433,"3982":-0.5451150019172448,"3983":0.25646812136800834,"3984":0.45251869068338,"3985":1.0101655958675615,"3986":0.4341744951877458,"3987":-1.1135955987983295,"3988":1.548252373216172,"3989":-0.047288066915497494,"3990":-0.08497016434753599,"3991":0.6727894222750413,"3992":-0.00655779699558756,"3993":-0.6475303323650197,"3994":-1.4798959682511705,"3995":-2.1243419459206385,"3996":-1.622646689692521,"3997":-2.4581553022816656,"3998":0.14116768359025175,"3999":-1.8115179913001496,"4000":-0.9497452389807889,"4001":-0.5160097822375552,"4002":1.052037717500619,"4003":0.3356366524914663,"4004":-2.7223604372855914,"4005":-1.0748248727232075,"4006":-0.1827322263198329,"4007":-0.46896930720798874,"4008":0.8105605464366511,"4009":0.26083931506174685,"4010":0.9894745981181228,"4011":0.38166091259736845,"4012":-1.3869354367801543,"4013":-3.101576836792188,"4014":-1.7056548536618963,"4015":0.028419826844734652,"4016":0.6899806606099629,"4017":0.9922856009713482,"4018":0.5359508649828173,"4019":-0.1044930707165981,"4020":-0.4253224407935826,"4021":-0.6327381097547069,"4022":0.47594563301243525,"4023":-0.654263669333427,"4024":0.17118015853387453,"4025":1.0654102231030453,"4026":0.23613345672931096,"4027":0.22719779192783432,"4028":-0.5415911873300109,"4029":-0.4440811869217156,"4030":0.15195306109234186,"4031":0.7569151637580032,"4032":0.5290557821438834,"4033":-0.4635467956104006,"4034":-0.30687747442184676,"4035":-0.33307470908307796,"4036":-0.47956876370732804,"4037":-0.7840060877118302,"4038":0.7644101138347003,"4039":-0.3532181688693418,"4040":-0.8472905131909003,"4041":-0.6060244067704951,"4042":-1.2940198613047589,"4043":-0.7455432027644406,"4044":-0.11429493357004408,"4045":0.5499479755987914,"4046":0.24163183379257708,"4047":-1.4134614751003722,"4048":1.4954769217103037,"4049":-5.167796184415331,"4050":-6.569520795114949,"4051":-4.532839142821538,"4052":-3.263055272206006,"4053":-1.4871393618351625,"4054":-0.00240978276592207,"4055":-0.11401763527806393,"4056":0.5561460754481833,"4057":0.24179073864004233,"4058":-5.579349459518812,"4059":3.719054395877354,"4060":2.8086101138900763,"4061":1.0959750128483203,"4062":1.4415998408740882,"4063":1.1534848531734385,"4064":0.6078774400290612,"4065":-0.24702996093056442,"4066":-0.8999759002533994,"4067":0.06661037825973104,"4068":1.1957319047541695,"4069":1.3537310741851625,"4070":2.02287571528121,"4071":0.711501959803865,"4072":0.4196835958603045,"4073":0.1799585353759397,"4074":-0.8064728394880911,"4075":-0.14898763041139593,"4076":0.4711180055620676,"4077":-0.06843004170149895,"4078":0.7052187285089816,"4079":-0.42636141383684306,"4080":0.06658827645501633,"4081":-0.24735724122468833,"4082":0.14834222662130905,"4083":0.6266394567413541,"4084":-0.33131989747120616,"4085":-1.0432383925011224,"4086":-0.505032537631743,"4087":-1.0988467255209302,"4088":-0.0500768152169824,"4089":0.014457967473563179,"4090":-0.8907612678960164,"4091":-0.18353948508850315,"4092":0.8079493154940648,"4093":0.5215698430159995,"4094":0.35994296537989456,"4095":-0.23518648679993673,"4096":0.1565090398727216,"4097":0.5364614004072252,"4098":0.32978128937641527,"4099":-0.5814174286780242,"4100":-0.8386136919202016,"4101":-3.858631469489438,"4102":0.7277615188236418,"4103":1.27986244312954,"4104":2.4586524072284788,"4105":0.0002536874930523494,"4106":0.7907598561492035,"4107":-1.164547154554219,"4108":0.7651927579494249,"4109":0.11016296555835688,"4110":-0.7993510246761735,"4111":-0.5707668870886412,"4112":-0.6321197333355826,"4113":1.9302718037092745,"4114":1.2394737662871227,"4115":0.47445953867978424,"4116":0.31094516059373883,"4117":2.0356879977708395,"4118":-1.081269423500552,"4119":-0.9504128773929202,"4120":0.024272593022533075,"4121":-4.015092260187281,"4122":-0.056725053621515864,"4123":1.2021767483305978,"4124":-3.3623843001587006,"4125":0.6938369773709857,"4126":1.288877509276054,"4127":-2.3337181239132994,"4128":0.7318009372798469,"4129":-1.3420853615702106,"4130":-1.7854910642756667,"4131":-3.1921974873830545,"4132":0.9774441273223492,"4133":-0.3370462771321687,"4134":-0.7402965800747273,"4135":0.28228675246229157,"4136":0.6256670323606434,"4137":-0.125677637873087,"4138":-1.6944379619458616,"4139":-1.1821808284180106,"4140":-0.3703674413523993,"4141":0.9259213000999873,"4142":-0.7972356823730365,"4143":-0.07335476587080575,"4144":0.9788658114822334,"4145":-0.685349601854388,"4146":-0.5256229036896226,"4147":0.14305866230641842,"4148":0.2480160185326895,"4149":1.3877726293087664,"4150":0.5857352911722964,"4151":1.8833648175297177,"4152":1.8526500051129786,"4153":1.437490530706152,"4154":0.1297634430483927,"4155":2.6583288546471353,"4156":-0.19842402114409602,"4157":-0.03252237571313519,"4158":0.6736944106843888,"4159":0.41217156809288014,"4160":1.2100551353362055,"4161":0.6989914821837064,"4162":-0.30243834842330836,"4163":-0.5115420379879793,"4164":-1.8353509298926682,"4165":0.2019102452144355,"4166":0.5360606157159267,"4167":-0.05713747463224642,"4168":1.2923322716156866,"4169":1.0078524634461163,"4170":0.13287894463826616,"4171":0.6801437224785832,"4172":-1.2063907238879996,"4173":0.03149942682310871,"4174":0.03960306515524101,"4175":-1.4998567110251153,"4176":0.11558580563872335,"4177":1.3838893962146137,"4178":0.7905900884737143,"4179":0.9684102845747796,"4180":-1.7360662658113566,"4181":0.7875376578943316,"4182":-0.6289644487218883,"4183":-1.9390796117853704,"4184":-0.18333877136984766,"4185":-0.3504605051007412,"4186":-1.8364152164480594,"4187":0.7135929365791316,"4188":-0.3715333925429766,"4189":-1.0709317457048368,"4190":-0.16449438419401632,"4191":1.4977550394584782,"4192":0.0863249193444469,"4193":0.3804033431088416,"4194":0.014126969750285996,"4195":1.5446325744473977,"4196":0.027788876576652875,"4197":-1.0035486398364788,"4198":0.31418883412162146,"4199":-0.5320334325296548,"4200":-0.08871023848903266,"4201":-0.34819980147865603,"4202":1.1078305596140716,"4203":-0.7299286508560261,"4204":-1.6690817859089855,"4205":-2.3528852739329085,"4206":-2.0765451144143903,"4207":-0.46411204542122736,"4208":0.11186581868248369,"4209":-0.6786772948444701,"4210":-2.5154431115985867,"4211":-0.1196387998439437,"4212":-4.652869190359296,"4213":-4.483807852272835,"4214":-2.7047872926054164,"4215":-2.160742339549778,"4216":-0.9382591130368122,"4217":-0.22216281725165465,"4218":0.11044998893494419,"4219":1.308264642459524,"4220":1.3943174154039877,"4221":3.4534494615828364,"4222":-2.970075224889135,"4223":-3.418169665578069,"4224":-1.9926095317781498,"4225":-1.255834176521755,"4226":-1.4502393105667677,"4227":0.32436858006584984,"4228":0.21008945562810577,"4229":0.8750904294527396,"4230":0.6298350081738604,"4231":3.144008442210108,"4232":5.037841674969797,"4233":2.111962378650472,"4234":0.6411024910418055,"4235":1.4058774012553668,"4236":-1.269534966289906,"4237":0.44160953901942596,"4238":0.8392766514187981,"4239":3.02062838372303,"4240":0.1258490735466937,"4241":0.24276790810543278,"4242":-0.20007022650970133,"4243":1.2151402577656092,"4244":0.5093445225665145,"4245":0.29161829910227594,"4246":-0.5451076535858781,"4247":-0.38013754528564325,"4248":0.45579123549585376,"4249":0.6112962420816528,"4250":1.1863179930661731,"4251":-0.39347582731701974,"4252":1.707228036148934,"4253":-0.12426366169823697,"4254":-0.358760914028816,"4255":-1.1178112183744395,"4256":1.0596733907009124,"4257":0.12416179494237925,"4258":-0.8366742343080203,"4259":-0.18567490393928052,"4260":0.5903445736004729,"4261":1.4320226142129342,"4262":-1.4084446761682272,"4263":-0.7257164518414662,"4264":-0.2785594793822822,"4265":0.6497726861386278,"4266":0.06518486257446963,"4267":0.18700312914694503,"4268":1.7167135867437644,"4269":-0.019501341990749904,"4270":0.5467607691820984,"4271":-0.5293111291997964,"4272":-0.37545968678145386,"4273":0.998888373720221,"4274":-0.4862293205314192,"4275":1.3133126896292717,"4276":0.06898331399406456,"4277":-1.9998900220768914,"4278":-0.44036348227930255,"4279":-0.4215694178872096,"4280":0.1909132020854496,"4281":-1.7612139796392594,"4282":2.2110199975290485,"4283":1.7243106482634336,"4284":0.24437652026042175,"4285":0.2981734723119583,"4286":-2.080439081734887,"4287":-1.391143301889327,"4288":-1.637738797457398,"4289":-0.5727334239573434,"4290":0.053786649099896486,"4291":-0.6787302150526803,"4292":1.4062670256260963,"4293":1.3342817532808395,"4294":-1.7394265718516047,"4295":-0.6695124050657886,"4296":-3.853299339903535,"4297":-2.055631121576662,"4298":-1.652389805598277,"4299":-2.827532362349311,"4300":-0.15788575572253657,"4301":1.8192053763283527,"4302":0.27985699542516884,"4303":-0.11579709404444152,"4304":-3.819559523250702,"4305":-2.0825207674571153,"4306":0.04079778957044281,"4307":-0.11284861627096664,"4308":-1.538090540369973,"4309":-0.5431775277325227,"4310":-0.8283590400314117,"4311":0.5655485073342077,"4312":0.010839562477043133,"4313":0.45687653588791816,"4314":0.6221120023685238,"4315":-0.5377391069759705,"4316":-0.0915621945830382,"4317":0.19608280714945156,"4318":0.8468952804151464,"4319":-0.166996848854549,"4320":-0.20346594973005094,"4321":0.9867313360456154,"4322":1.7128355740822931,"4323":-0.9881944281942152,"4324":0.5922261648107172,"4325":1.7311519356617615,"4326":1.107264671510629,"4327":-0.01614718343397168,"4328":0.8986347086509037,"4329":0.579051390444539,"4330":-1.028737289116412,"4331":-0.010652237084163154,"4332":-1.660679639792708,"4333":0.2591844941873907,"4334":-1.7776660591055344,"4335":2.127087097119223,"4336":1.9024891915067481,"4337":-1.5633936776985493,"4338":0.5057647710307445,"4339":0.1845862458239969,"4340":0.30191176654213553,"4341":-0.1546325504342843,"4342":-1.0498246903462523,"4343":-0.24963239003563273,"4344":0.5487239221203252,"4345":0.20814089629271326,"4346":-1.0561205344219817,"4347":0.6171598810660841,"4348":-0.25566940948079975,"4349":-0.19681012544932053,"4350":-0.09692668998129995,"4351":-0.07651884029707233,"4352":0.28022144089916134,"4353":0.30197146013283016,"4354":0.34186433626895085,"4355":0.12179669671331794,"4356":-0.5638058813308686,"4357":-0.26814436121347907,"4358":0.10118539944603813,"4359":0.0645267637613865,"4360":0.3032371712516425,"4361":0.4628829108958488,"4362":-0.5500442039395836,"4363":1.8929225240710166,"4364":0.49783244086603967,"4365":0.1518208326697842,"4366":-0.1639806823411458,"4367":0.6241484127084906,"4368":0.5804263463930185,"4369":0.007501374544033213,"4370":0.5715287693803335,"4371":0.7370919792458193,"4372":0.6740143613108859,"4373":-0.6461583162648838,"4374":0.2556750079899818,"4375":-0.20313713140849585,"4376":0.6221800586028983,"4377":0.7849054402636467,"4378":1.2062918816544117,"4379":1.1536351568065972,"4380":0.1999127596835807,"4381":-0.021500658840442104,"4382":-0.14307265550038967,"4383":0.7274181736936941,"4384":-0.14909798928941553,"4385":0.9922820396164527,"4386":-6.2134472962155884,"4387":-7.455373776640364,"4388":-8.087550104567663,"4389":-8.077377580629395,"4390":-4.679197160076729,"4391":0.1678381888694271,"4392":0.6967723553468262,"4393":-0.12489092381910419,"4394":-0.08007076676180903,"4395":0.9723559888782413,"4396":2.0059267248752737,"4397":1.8130776492714367,"4398":2.114560884911877,"4399":1.3378611122721447,"4400":0.10620859394441873,"4401":-0.07956463786657662,"4402":0.22482217125017945,"4403":-0.33150818540363447,"4404":-0.4919729911271795,"4405":-0.23189737578722555,"4406":0.20719228680890484,"4407":-0.2953938249828113,"4408":1.0809045957674384,"4409":0.8620604024532895,"4410":0.5657751280770686,"4411":0.8127240925651242,"4412":-0.00802750239040848,"4413":0.2705478212095018,"4414":0.13251171587904234,"4415":0.678185318147658,"4416":0.2594047847256733,"4417":0.07272411939437011,"4418":-0.24666219913918483,"4419":0.38021579030004327,"4420":-0.016092305680347776,"4421":0.17595749408685013,"4422":0.4067587227208972,"4423":0.8068065101103313,"4424":0.6006891005134235,"4425":-0.7910363099623018,"4426":-0.7882568008522274,"4427":-1.1651400212102214,"4428":-2.3230593856324733,"4429":0.7701036618850838,"4430":-0.1080111383542139,"4431":-0.571747760306482,"4432":0.9449996155160115,"4433":0.7365635086318324,"4434":1.4470125150582591,"4435":-0.11043000097913552,"4436":-0.8240473669428052,"4437":-0.8871942230357719,"4438":-1.8641616285441744,"4439":1.1398121721051455,"4440":1.3173158896332264,"4441":1.4144024422169104,"4442":0.8909429131146175,"4443":-0.14922392711699775,"4444":-2.523349191118547,"4445":0.2347525817287525,"4446":0.15011084487274054,"4447":2.251248155948968,"4448":0.10567389697692607,"4449":-1.2843856932264928,"4450":-0.6033513018714665,"4451":-0.9335283225342614,"4452":-1.3096858456515768,"4453":-0.35726311505475994,"4454":0.1697442059992188,"4455":1.135592326527465,"4456":0.12483540602401855,"4457":1.0496238286916164,"4458":-1.231233640258742,"4459":-3.3407118488005,"4460":-1.4013771005336428,"4461":-2.375327816959722,"4462":-0.49488859889714865,"4463":1.280417022089426,"4464":1.7859343139723474,"4465":0.09849893112506365,"4466":0.47157185696519127,"4467":1.0046514527422739,"4468":-4.735909866585978,"4469":-4.732099592799069,"4470":-3.339530073974158,"4471":-1.8504438889240278,"4472":-0.053020058263329554,"4473":-1.4581165931039257,"4474":2.252953507231623,"4475":0.3766789197552879,"4476":1.3796423630074826,"4477":3.4170285535954696,"4478":3.7745302301012233,"4479":2.036243328911193,"4480":-0.1658216540218472,"4481":0.9219538609274813,"4482":-0.15621818656349673,"4483":-1.3459501589296778,"4484":0.1838700408912687,"4485":1.5263183767621709,"4486":-0.8493561422642145,"4487":1.2000008451071895,"4488":0.9882954842860128,"4489":0.8783221881412837,"4490":1.0566152704594751,"4491":0.340188360036786,"4492":0.2499108728551097,"4493":0.5757715163375864,"4494":0.019664185992964336,"4495":0.5282416821844158,"4496":-0.10778726990027176,"4497":-0.7234936011274312,"4498":0.9760470822129104,"4499":-0.9577931876873796,"4500":-1.277886037070367,"4501":0.17280322884140506,"4502":1.0452663138972937,"4503":0.5652182518228966,"4504":0.33957052052445297,"4505":-0.9375429000203884,"4506":-1.0821675264535193,"4507":0.09236071162491298,"4508":1.2274170937344095,"4509":-1.012831997220582,"4510":-1.4797059255600775,"4511":0.5427181512989067,"4512":0.31382420612342643,"4513":-0.017664186225311164,"4514":-0.9908324461778649,"4515":-0.5708361404304907,"4516":-1.869098845615381,"4517":0.29650262805400274,"4518":1.9215769757412149,"4519":2.1049000350052403,"4520":-1.4215854663507046,"4521":1.1985556868080514,"4522":0.6395507025323968,"4523":-0.7135233648088017,"4524":1.1552788718899445,"4525":0.1384935481791677,"4526":-1.1832422393069335,"4527":0.8534080189525234,"4528":0.8234947849701278,"4529":1.2637465467615048,"4530":1.0729468805200344,"4531":0.17166952141568878,"4532":1.0104595911996144,"4533":-1.3720748639343605,"4534":-2.028720332625969,"4535":-0.3702787941082446,"4536":0.26234379966289445,"4537":0.6587221459381638,"4538":-1.1423317485241744,"4539":3.6865901662698835,"4540":3.490876666727651,"4541":1.3983111724248354,"4542":-0.39779024586843353,"4543":-0.8750945752767658,"4544":0.7467523335231763,"4545":-0.7643564576578447,"4546":0.016793326853786913,"4547":-0.2906613683480125,"4548":1.541253946423434,"4549":4.877988319803977,"4550":-1.301853696486178,"4551":1.619005198160953,"4552":1.585287736596738,"4553":0.014592387616321909,"4554":0.721847342727307,"4555":-1.3129436572698008,"4556":1.3845038014212097,"4557":0.23511235595079055,"4558":-2.001048567547531,"4559":-2.4846717145780044,"4560":-2.4341384695590795,"4561":1.9140189110332095,"4562":-0.9913512365892823,"4563":-1.1289586727631762,"4564":-0.17290768661940326,"4565":0.4025712773781744,"4566":0.1652598853128241,"4567":1.057053686380319,"4568":-1.6523690189845317,"4569":-1.1957448634033174,"4570":-1.846084995315039,"4571":-0.37073062093988823,"4572":1.6057285521016402,"4573":-0.8891451709990098,"4574":0.164236596199645,"4575":0.8674057045525168,"4576":-0.8644273491555063,"4577":-2.0323839636841377,"4578":-0.4646886715557803,"4579":0.36378104962189933,"4580":0.5945711270918966,"4581":0.606804171895712,"4582":-1.1914017773441263,"4583":-0.8893688084460517,"4584":0.2174783549406951,"4585":-0.5786327034301946,"4586":-0.9954828830464102,"4587":-2.0335079265047615,"4588":0.9208279196647531,"4589":-0.7491887224899415,"4590":0.11374145869448368,"4591":-1.2572274023055665,"4592":-0.12100454973607351,"4593":2.9799847964377366,"4594":1.6572919570244322,"4595":0.5469265229478539,"4596":-1.3517983497695176,"4597":-0.7113235531950829,"4598":1.1006271459008197,"4599":2.0083124375603285,"4600":-1.5593376534630736,"4601":-0.6782613269227528,"4602":-0.3291113550920674,"4603":-1.0838997617584059,"4604":1.4392923220722262,"4605":-2.4162937522870385,"4606":0.44435070534594817,"4607":0.5185205723415218,"4608":1.8534561262010676,"4609":0.45449848324064,"4610":-0.2175401938082334,"4611":0.3301507016234765,"4612":1.433989953881598,"4613":-0.2189558554125073,"4614":-1.5016454952129143,"4615":-0.14663227669429837,"4616":-0.19936259349012414,"4617":0.8860755927356749,"4618":0.219886996021053,"4619":0.8265958119747181,"4620":0.9769670468894376,"4621":1.435157279324531,"4622":-0.9074556617212595,"4623":2.6472867118860437,"4624":-0.5809109016212438,"4625":0.24299194318849282,"4626":0.4278348237652173,"4627":0.908855170834572,"4628":-0.8445587365112187,"4629":1.4114436335041238,"4630":0.4705803915682383,"4631":0.4515599855426437,"4632":0.16505790438440585,"4633":2.6374779519919533,"4634":0.6590127441382169,"4635":-0.3634196251122655,"4636":-2.6200424125580954,"4637":-1.0586518795929918,"4638":1.774430198513733,"4639":2.023530324329414,"4640":1.415716999531106,"4641":3.5148519576879327,"4642":1.770674416873956,"4643":2.2850707183438477,"4644":1.1191205398412656,"4645":-1.2536255063942676,"4646":1.6356852237031612,"4647":-2.2005332237728163,"4648":-0.11160308958894788,"4649":0.023349727580157218,"4650":1.2329183077375128,"4651":-0.2633880112224272,"4652":-2.796218326428722,"4653":0.7929064583294958,"4654":2.1929796532507964,"4655":-2.822050166686615,"4656":0.08127938125294715,"4657":1.2202869754928003,"4658":-1.1846438531757288,"4659":0.49036284313821094,"4660":-0.18433713965535473,"4661":-2.6665490391122235,"4662":0.6937409703947887,"4663":-0.6061127950858591,"4664":-0.19232985086345297,"4665":0.0560541744182476,"4666":1.1884492699799603,"4667":0.155436056193526,"4668":-0.9770583183006352,"4669":-0.09025924282959939,"4670":-0.05856893847885249,"4671":-0.3456784650343869,"4672":0.5239928380870883,"4673":-0.5059462911662863,"4674":2.0953888208999545,"4675":-1.3885718518157986,"4676":0.27699826433442104,"4677":-0.5848598992854017,"4678":-0.3021973066399261,"4679":0.2717889131746668,"4680":0.3892358276238569,"4681":-0.7950854468431354,"4682":-0.5494653667870907,"4683":0.7226457409116607,"4684":1.2974384881189025,"4685":1.1971667431660526,"4686":-1.0627969212148116,"4687":-0.9838458818988824,"4688":0.9541023242241895,"4689":-1.547025310433496,"4690":-0.4932725330269996,"4691":-1.6845144002569874,"4692":-0.554598242098751,"4693":1.987246536417777,"4694":2.146701414616607,"4695":-0.3279344042222573,"4696":-2.260755179150774,"4697":-1.9546715054939017,"4698":-1.9324022434036001,"4699":-0.47727348106333767,"4700":-0.5579815245219166,"4701":-2.849015773322002,"4702":-0.957723981005534,"4703":-0.580075434173971,"4704":-2.1065569382526164,"4705":0.49700724049434747,"4706":-0.8926049248550935,"4707":0.2057730765958342,"4708":-0.707646700634783,"4709":0.012603816901377787,"4710":2.159732041751036,"4711":-0.8657291774155276,"4712":0.39230252846759894,"4713":-3.7164990575522925,"4714":1.6947675966797422,"4715":2.003901580766203,"4716":1.300738915181093,"4717":-0.873416005647367,"4718":0.5234362732910207,"4719":0.04909483596587179,"4720":0.20032222376836184,"4721":1.4233029323619948,"4722":1.2777734750779528,"4723":-2.1689779536628575,"4724":-2.2944347648614243,"4725":0.4128163127781581,"4726":-1.0481012076193856,"4727":-0.4597172240342947,"4728":0.12026519257948652,"4729":1.8146212933354098,"4730":-0.036008407199905036,"4731":-3.122923336224092,"4732":-1.2393731626200721,"4733":-1.3205861041611626,"4734":-0.8524374795015085,"4735":-0.9456559144960536,"4736":2.4548186651538226,"4737":0.10333782183310723,"4738":-0.27227702100683626,"4739":1.3084284649986304,"4740":-1.3563858768361299,"4741":-0.14721807042694673,"4742":0.48195478963703003,"4743":-0.7009390158572226,"4744":1.567484561914271,"4745":0.9718071566598967,"4746":-0.5549386937601323,"4747":0.4038226196299656,"4748":-0.5700462160906055,"4749":0.4997047533871092,"4750":-0.4153919918492816,"4751":-1.1717400945688914,"4752":-0.7622527005977278,"4753":-1.8532946901503384,"4754":1.6451998891695698,"4755":-0.3352347257775253,"4756":-0.121817096629477,"4757":0.738246862892729,"4758":2.4995257997646307,"4759":1.8759748512099177,"4760":2.2717625275151114,"4761":1.2561993821226276,"4762":0.15154054800590896,"4763":-0.3813290715718407,"4764":-1.4322053611631835,"4765":-0.7164467463623735,"4766":0.4953281200800293,"4767":-2.52320818028438,"4768":2.1749139896650487,"4769":-1.3329859009064375,"4770":0.7420588518231926,"4771":-0.7600235323743826,"4772":0.5283551184107937,"4773":0.45077601155908587,"4774":-0.8584528638112088,"4775":-3.110363086392207,"4776":2.0002111854567013,"4777":-0.46968999230907227,"4778":0.3685095659716705,"4779":-1.5352581822653777,"4780":0.4813735147601894,"4781":0.14361635346726478,"4782":-0.031872286889795494,"4783":0.7008906818269953,"4784":-1.0203486776432038,"4785":1.2218000849680475,"4786":-0.9836214535577814,"4787":-3.227597325990415,"4788":-0.03538959035105607,"4789":-2.441210711617009,"4790":0.6320910827610607,"4791":-0.8722282592520914,"4792":-0.8499408168930535,"4793":2.7198454549801125,"4794":-1.3058853830206165,"4795":-1.4690088831629673,"4796":-1.7892508101130835,"4797":-2.4370544293705647,"4798":-0.5825748388153159,"4799":-0.3023989789572467,"4800":0.5106180571009028,"4801":1.4734545703645827,"4802":0.789715125354777,"4803":0.2282561484045801,"4804":1.0105254997631534,"4805":-1.6414686504218872,"4806":-2.7066228019355063,"4807":-1.2244753274667481,"4808":-0.5914923441039216,"4809":-2.458003349896904,"4810":-0.21581433478304682,"4811":-0.05377051301489123,"4812":0.9737240191836872,"4813":-0.4028288344882743,"4814":-2.053819846670268,"4815":-1.888861382607213,"4816":-1.0083203109868095,"4817":-0.9154102906916587,"4818":2.3066547360823604,"4819":-0.11002583378080215,"4820":0.40505126156130233,"4821":-1.564572175540575,"4822":1.6548845136554888,"4823":-1.154602516029754,"4824":-0.49035305369437865,"4825":2.0271099600445326,"4826":-0.7302900595446722,"4827":-2.1569419079339966,"4828":2.002790658390018,"4829":-0.9785767887099914,"4830":2.4301363342803404,"4831":0.589345714158852,"4832":1.494998664656092,"4833":1.0112658862632238,"4834":-0.03754148294671671,"4835":-1.5069397960636899,"4836":1.292450270799366,"4837":-0.30117245531080833,"4838":1.1043813262649012,"4839":0.35162786137334423,"4840":-0.40993348461650925,"4841":0.22142544281987567,"4842":-0.09015576047520953,"4843":-0.2543407870105988,"4844":-1.2566339840489793,"4845":0.151980800787876,"4846":-3.790275104623337,"4847":-2.0045427537174705,"4848":1.5773008770891823,"4849":1.5344571135568872,"4850":-0.7148504082524966,"4851":1.1272821005949227,"4852":1.3996314092634288,"4853":-0.609348535371089,"4854":-0.360241483470344,"4855":-2.192120330117944,"4856":-0.2589810056812848,"4857":0.2698072725396885,"4858":1.5363149029606622,"4859":-0.5121431415187943,"4860":-2.7546389942482223,"4861":0.849120044848194,"4862":0.5742501223706511,"4863":-1.3822892878377486,"4864":0.8032286028537652,"4865":0.9247126454621629,"4866":0.805985127516651,"4867":-2.045033040771234,"4868":-4.03206835900522,"4869":-4.243545235273024,"4870":-0.4828480296914062,"4871":-0.8287586444453433,"4872":-1.3175377554129304,"4873":-1.0257624543068178,"4874":1.1170522756433814,"4875":0.28255354740043986,"4876":1.191466648781401,"4877":2.221795698533622,"4878":6.786627240222071,"4879":2.7434261358785914,"4880":1.3920250524979234,"4881":0.7745063557856394,"4882":-0.4510129025184856,"4883":1.4979143638804198,"4884":-0.21438471933340542,"4885":-0.6966961299665364,"4886":3.5757875441669786,"4887":2.796637983896331,"4888":1.3603030929751252,"4889":1.1161389198021914,"4890":1.6748142974548095,"4891":0.12823900396373814,"4892":0.47018230824002394,"4893":0.6159850386598371,"4894":-1.5466897805282154,"4895":0.21089254987838935,"4896":0.6616729482670237,"4897":0.15463727760314144,"4898":-0.43376600611165883,"4899":0.1790444237796752,"4900":1.982533927069734,"4901":-0.27396310150304415,"4902":0.4259946067456825,"4903":-0.9298491837422935,"4904":1.0775254316855407,"4905":-1.2390022564744434,"4906":-0.029988753474602812,"4907":-0.6292061931610204,"4908":0.41605173681378715,"4909":0.3264338383153334,"4910":0.2719391732518779,"4911":-1.3009968863667174,"4912":0.4201069834358366,"4913":1.2803219606787606,"4914":0.7862865524420997,"4915":-0.18388002921117386,"4916":0.5545567999290947,"4917":1.0012204516833292,"4918":1.6302648317035409,"4919":-1.523979761373563,"4920":0.7784806213716594,"4921":-0.004572471497299088,"4922":1.442995995780153,"4923":-1.2545010870315212,"4924":-0.32501215282054136,"4925":-2.062999880102688,"4926":2.432938938535763,"4927":1.2490032843634724,"4928":-1.5043945137336314,"4929":1.3804308229860491,"4930":-1.288196073942985,"4931":1.0825146395093557,"4932":0.4624349221973195,"4933":-0.6890765836751443,"4934":2.0141158520405646,"4935":1.913056839218884,"4936":1.2069446332176783,"4937":1.1309987230555618,"4938":-0.9668164194370392,"4939":2.56469920713363,"4940":-0.3071918991383183,"4941":-1.366875089599082,"4942":1.1008894738128419,"4943":1.101957180682867,"4944":0.4132197616345872,"4945":1.1061121683256694,"4946":1.4747159603766185,"4947":-0.4508145091050784,"4948":-2.4935842925193974,"4949":-0.6477663439500505,"4950":-0.13447459743595394,"4951":-0.44975001063463926,"4952":0.49027273870851146,"4953":-1.1455662306693302,"4954":-1.073678341893519,"4955":1.458044461701473,"4956":1.7688549274255818,"4957":-0.044164364637331345,"4958":-0.03916304177084414,"4959":1.1740547940004038,"4960":1.7259313620446841,"4961":0.6364434068649161,"4962":1.5009072478767376,"4963":1.4866933919781256,"4964":3.0500658423340448,"4965":0.27521120266463983,"4966":0.7931313243895607,"4967":-1.6385264613536639,"4968":-4.5259827128400625,"4969":-2.286595697340353,"4970":-0.905484196419439,"4971":0.7405107078781693,"4972":-0.3673350528994282,"4973":-0.1121188616636462,"4974":-1.56880729609959,"4975":1.3219534559562909,"4976":-0.366112111607229,"4977":1.5647158071331027,"4978":1.5428957097518952,"4979":0.15004844698803962,"4980":-0.7042785754827091,"4981":0.5079216964993172,"4982":-1.0029955295967135,"4983":0.5153042325313513,"4984":-0.13259384542169966,"4985":0.4190206385383296,"4986":-1.6891786528800277,"4987":-0.23087401797581023,"4988":0.5529423685105249,"4989":-0.4241199123584642,"4990":0.25319463227368566,"4991":0.9727137904350537,"4992":0.420289602307191,"4993":-0.6637823991271309,"4994":0.9575003978005694,"4995":-1.758195811378346,"4996":-0.472664717807396,"4997":-0.2810778661690147,"4998":2.115305262467414,"4999":0.277738274378567,"5000":-0.3870206470251572,"5001":-0.6464417450009631,"5002":-1.1097278100696835,"5003":-1.5042238128479282,"5004":-0.8724673617296774,"5005":-1.4961174878731978,"5006":-1.6845066681553733,"5007":-0.7777792004317422,"5008":-0.40682229733262365,"5009":-0.47289252229192263,"5010":-0.4605117861149209,"5011":0.9067320760579053,"5012":-0.773310222439806,"5013":1.0492191463750238,"5014":-1.531915746042763,"5015":-1.4379650463205855,"5016":-0.9249406576755947,"5017":-0.7326907778383509,"5018":-0.5593427325475864,"5019":-0.6126883422920703,"5020":-1.7534391381784902,"5021":-0.19543201028856613,"5022":-0.12952359382587295,"5023":-2.57665016699459,"5024":-1.205933403445648,"5025":-0.9950220974915291,"5026":-0.5871252681205802,"5027":-0.5893964380602681,"5028":-0.32182126555753876,"5029":-0.9545836723560714,"5030":1.0761784492133735,"5031":0.5356167393242438,"5032":-1.579754497326018,"5033":-1.2776715426932934,"5034":-0.7447389797365983,"5035":-0.5505568218964573,"5036":-0.5146033265923332,"5037":-0.611615184307594,"5038":0.30902381095746057,"5039":0.06306024199397371,"5040":3.45380124216228,"5041":-1.8533048156197325,"5042":-0.5442980628201616,"5043":-0.46753762809046034,"5044":-0.4060651062928765,"5045":-0.5607091175703657,"5046":-0.6421808025779028,"5047":3.0193043369820294,"5048":-2.4261019797759076,"5049":-0.8691665321713209,"5050":-1.9285303897191581,"5051":-1.7422523692183824,"5052":-1.05462265697735,"5053":-0.8164463113888959,"5054":-0.9034542963248474,"5055":-0.49475298481533336,"5056":-0.026733936439338607,"5057":0.009575763973379774,"5058":2.7461714166614195,"5059":-1.8098900132923936,"5060":-1.6331600588763089,"5061":-0.9883031097477625,"5062":-0.5686499075338146,"5063":-0.40769104863927275,"5064":-0.6573436431823325,"5065":-1.0237064231035224,"5066":-0.5120489745523746,"5067":0.06328780349630295,"5068":-1.3975050698229843,"5069":-1.7011140914030454,"5070":-0.7724255534696645,"5071":-0.5475259370368526,"5072":-0.7231543062478593,"5073":-0.5972718747395314,"5074":1.022178418228766,"5075":0.004635790414395145,"5076":-2.629938115377448,"5077":-1.7674840895365251,"5078":-1.8974319324511386,"5079":-0.9965525619662059,"5080":-0.5613466995344067,"5081":-0.42249980070932563,"5082":-0.696893773069513,"5083":-0.8296530621185293,"5084":0.3182350209354091,"5085":-0.6527998424900193,"5086":-1.8429630466427673,"5087":-0.39482125770049764,"5088":-1.887093055596176,"5089":-1.434924229785005,"5090":0.4521742298394148,"5091":0.49751243009829194,"5092":-0.4097831430445158,"5093":-0.5990206341539452,"5094":-0.5754932290396055,"5095":1.2722320661764845,"5096":-0.9990883782311769,"5097":-0.8990274132232107,"5098":0.24550757953515628,"5099":-0.26023949938592467,"5100":0.6917041588048669,"5101":0.5519016228917697,"5102":-1.4295060463462914,"5103":1.3729300338773058,"5104":-1.618604816179633,"5105":-3.3045188265734846,"5106":-1.9440399986519694,"5107":-3.501119622996628,"5108":-2.8818270403378143,"5109":-2.345036004971553,"5110":-0.27788450522270325,"5111":-1.1345479294555558,"5112":1.8206175606171382,"5113":0.922171698368238,"5114":-0.4135774253582528,"5115":0.26888572113981296,"5116":0.1290046779377289,"5117":-0.21377531115595075,"5118":0.7967698046151148,"5119":-1.3034434989363404,"5120":0.005110158674274678,"5121":0.5050144371431821,"5122":-0.05405676709336346,"5123":2.9033478305131792,"5124":1.428670661397904,"5125":1.6347957400513766,"5126":0.29179412540340127,"5127":0.02204026710087089,"5128":0.6723621594035866,"5129":0.24168737402656368,"5130":-0.40610664149644804,"5131":0.8267741756753075,"5132":1.0216814365101943,"5133":1.4401832600418996,"5134":2.1387861919751696,"5135":0.28691320548729826,"5136":-0.014615372184142363,"5137":0.377176510086708,"5138":-0.4660730011596619,"5139":-1.5232896965043983,"5140":1.770181232405041,"5141":1.545776043446921,"5142":1.6717877184852525,"5143":-0.862899030704711,"5144":-0.1563408846523767,"5145":1.0451807283739099,"5146":1.2104870943029549,"5147":-1.2927665483533721,"5148":-1.174294517355499,"5149":0.07926938855083167,"5150":-0.34145073991122354,"5151":-1.393065814287287,"5152":-1.1418553221029681,"5153":1.5852679100991949,"5154":-1.1694686969639743,"5155":1.1733318624595683,"5156":0.24110068858527736,"5157":0.21141825745792206,"5158":1.073427085770504,"5159":0.7547592680217589,"5160":1.5925370915633765,"5161":1.163460674274256,"5162":0.2532809665428331,"5163":0.08746692786755235,"5164":0.6363756684459139,"5165":-1.9020254064459163,"5166":-1.995750262757544,"5167":0.7191736290308991,"5168":-0.5827448167421304,"5169":1.406569722959244,"5170":-1.105276893466242,"5171":-1.172907900365947,"5172":-0.04965714292180735,"5173":-0.5326891003875248,"5174":-1.5227316608864137,"5175":1.064421447664477,"5176":-1.0277181899529222,"5177":-0.9404309619674347,"5178":1.065258191562378,"5179":-0.7785862275113343,"5180":-1.4320098065694298,"5181":-1.3367573514164997,"5182":-0.1584808613366763,"5183":-1.5126495748976938,"5184":0.09498351703429354,"5185":-0.17625609336406514,"5186":-0.9652681338640829,"5187":0.033481132980250794,"5188":0.21111232709260302,"5189":-0.8343687264370261,"5190":-1.3661774591826155,"5191":-1.163235620508581,"5192":0.09508924101694366,"5193":0.25086669879460005,"5194":-2.5491686229725423,"5195":0.4813245238008792,"5196":-0.9914848333039484,"5197":-1.5878719446828355,"5198":-0.14081806990071336,"5199":-1.2134250414145038,"5200":-0.8928985698653714,"5201":-0.1593006199490628,"5202":2.1475586584255923,"5203":-0.8880625741085693,"5204":-0.6287225715156011,"5205":2.1858951195292167,"5206":1.0670957728910042,"5207":0.6729317939504775,"5208":-1.4311098242782263,"5209":-1.1571917907179117,"5210":-0.9004730303956191,"5211":-0.4821232774442329,"5212":-1.8669346887588736,"5213":0.13664213752350965,"5214":-0.18340279783172864,"5215":0.0728616255473244,"5216":-0.2985027820733357,"5217":-0.5967796224021806,"5218":-1.4713593946263779,"5219":-1.3297986952885945,"5220":-0.5788376013867028,"5221":-0.31425226994896094,"5222":1.231575100645773,"5223":0.06368134919751421,"5224":-0.41607127007784883,"5225":-0.9139518559220174,"5226":0.022602439460458965,"5227":-0.6328071961326528,"5228":-0.7711800745543946,"5229":-1.839932172162433,"5230":-0.8606322553710548,"5231":-0.42552374083708033,"5232":-0.48661405610592523,"5233":-1.624612836930909,"5234":-0.6696013741618441,"5235":-1.4289501126806559,"5236":0.1898232651620206,"5237":-0.5470674208308456,"5238":0.41969800537781105,"5239":0.19703898778703788,"5240":-0.1859047094027834,"5241":-1.0136577227003896,"5242":-0.018810917488483087,"5243":-0.009988534283267193,"5244":-0.379627492631643,"5245":-1.231965764284682,"5246":-0.3225272690628517,"5247":-0.7509723630298419,"5248":-1.1179502160218218,"5249":-0.42094643019149974,"5250":-0.290173578253899,"5251":0.19315893763358621,"5252":0.2759244636454995,"5253":0.12612545841639372,"5254":-0.4182572917337429,"5255":-0.06487094396297466,"5256":-0.49871787308188054,"5257":-0.28559604889785994,"5258":-0.10232549419775393,"5259":-0.467707576023984,"5260":-0.7366149070810576,"5261":0.06081275155062414,"5262":-0.9306836751384461,"5263":-0.004940797425641615,"5264":-0.38106078672117916,"5265":-0.12970456492862906,"5266":-0.3994102249774694,"5267":-0.8764941545130571,"5268":-0.0958354499859398,"5269":-0.35407566820578246,"5270":0.7436636443465258,"5271":0.29202443285463486,"5272":-0.2665248597257661,"5273":-0.888494068409608,"5274":-1.1187259590869705,"5275":0.3694783085581383,"5276":0.5432712526940314,"5277":-0.7897215186832044,"5278":-6.98520659532191,"5279":-5.738477246322311,"5280":-4.3443434625828985,"5281":-2.551435577877579,"5282":-1.6590915739754102,"5283":-0.7119608871358212,"5284":0.3855486481245074,"5285":1.4054230376721264,"5286":-0.597652619871374,"5287":1.6355313243356164,"5288":5.608828379964534,"5289":1.4957678152533422,"5290":1.498948409616883,"5291":0.6919645998110192,"5292":0.8431008844054085,"5293":0.7489248920623747,"5294":-0.3619806873028501,"5295":-0.44035823451536554,"5296":0.605234380427424,"5297":2.164476842553262,"5298":0.7082580004340102,"5299":0.5727702039853175,"5300":0.49899516227885765,"5301":0.6747766868862525,"5302":-0.08588100062154998,"5303":-1.1147657252111107,"5304":0.1499381758637181,"5305":-0.17563983793669904,"5306":0.46923952199294194,"5307":-0.025854258466286684,"5308":0.2499554055696338,"5309":0.5385221605808505,"5310":0.33419760686682626,"5311":0.42813947606447816,"5312":0.3075922597266965,"5313":-1.1774915252818923,"5314":0.2178251885487808,"5315":-0.5213150866687615,"5316":-0.7415960611271685,"5317":-0.419392123348589,"5318":-0.18813973971007145,"5319":0.31087333356457614,"5320":0.4806252158255605,"5321":-1.4854418863464987,"5322":0.04240925660506723,"5323":0.4983137993514607,"5324":-1.4511132228119201,"5325":-0.9751359634609348,"5326":-1.6749138108725876,"5327":1.535011642199639,"5328":0.8698466421524236,"5329":-0.26148763018045984,"5330":-0.34848166510196255,"5331":-0.7856732985697721,"5332":-0.8680052521074877,"5333":-0.2595633892065002,"5334":-0.3194323225862085,"5335":-0.8689511486719748,"5336":-0.6826126626363558,"5337":-0.01674059971947785,"5338":-0.9183340616497934,"5339":-0.9554300083134473,"5340":-0.6255870608063695,"5341":0.021612415333197296,"5342":-0.4151305177785472,"5343":0.05206317335346356,"5344":-0.45172034747158823,"5345":-0.2771152167833749,"5346":0.17283841168783826,"5347":-0.9782322961558562,"5348":0.398911669787799,"5349":-0.23557555066968075,"5350":0.11240009192731978,"5351":0.6771337849376385,"5352":1.256181980727202,"5353":0.039247811642488244,"5354":0.6906861357990028,"5355":-0.991497383646425,"5356":-1.6491210879501863,"5357":0.7522294901675909,"5358":0.12846920842099452,"5359":0.09142426225308327,"5360":0.7266993869866635,"5361":-0.5028462234239719,"5362":-0.3786852167316403,"5363":0.9958966499045087,"5364":-0.7622639191913361,"5365":-1.7464000769469015,"5366":1.432263807485908,"5367":0.3699589955799196,"5368":0.30331298015515984,"5369":1.3706720310437064,"5370":1.822198420136959,"5371":0.33814972472413124,"5372":-0.07355847772795988,"5373":-0.7519490771249159,"5374":0.15177330996756083,"5375":-0.08874131214595699,"5376":0.031663399379465,"5377":-0.009151915096341175,"5378":1.315560818156615,"5379":0.7018336205038345,"5380":0.6049620476228008,"5381":-0.7664372232571622,"5382":0.7304534167640236,"5383":-0.153052718583313,"5384":-0.5817563609446129,"5385":-0.29392761383151755,"5386":-1.2042022762029918,"5387":-0.5958558998003788,"5388":-0.6416599371726341,"5389":-0.052232143879335946,"5390":-0.4996379433261955,"5391":-0.19000160201149013,"5392":-0.11432341830547829,"5393":0.3256361989913709,"5394":-1.911125232667551,"5395":0.3430724556355978,"5396":0.1284665687295229,"5397":-0.4259934726719705,"5398":-0.5037298094066457,"5399":-0.160186735666779,"5400":-1.4007321650516997,"5401":-0.016053668662618745,"5402":0.3588315237011988,"5403":-0.6215850662905431,"5404":-0.9651006678204452,"5405":1.9767992151157994,"5406":-0.8422621254326336,"5407":-0.8409859324486787,"5408":1.607040526279033,"5409":-0.4946696878301021,"5410":1.6023572763497655,"5411":-0.6514798244649137,"5412":1.0993106817240348,"5413":-0.8231746400192034,"5414":-0.5222416408158029,"5415":-0.3609825220681206,"5416":1.358301703737059,"5417":0.42556647408449383,"5418":-0.3523069460330772,"5419":-1.1296515747354559,"5420":1.1707370755961117,"5421":-1.6850538077913797,"5422":1.705677843185227,"5423":-1.92440308858391,"5424":-0.983495007130117,"5425":-0.13526965112246417,"5426":0.011534846850020063,"5427":1.0013662893197077,"5428":0.29198693967310646,"5429":-0.19886846446822706,"5430":0.26271928364141844,"5431":-0.2515314239081056,"5432":-0.04606562806854448,"5433":-1.6976245422077387,"5434":-0.4887857399585707,"5435":0.580519124751622,"5436":0.8433787076994471,"5437":-2.241668621839798,"5438":-0.6586224755664681,"5439":0.30031228431970525,"5440":1.3586050652129193,"5441":0.31046574028592633,"5442":-0.03778583129636404,"5443":-0.6678087255279029,"5444":-2.747723725343585,"5445":-2.7452981352954575,"5446":-0.6576127791495417,"5447":-1.8021503320631096,"5448":-0.4631768076863678,"5449":-0.647203807593285,"5450":-0.7232805427695725,"5451":-2.2699467257913297,"5452":-0.8617447648978788,"5453":-1.9241437106145614,"5454":0.5969909794858509,"5455":1.6060272908186324,"5456":0.9319941420699721,"5457":0.4405037345146265,"5458":-0.02508144087439337,"5459":-2.767259864332586,"5460":3.5185464992348723,"5461":3.1667804748796775,"5462":3.1515313675365006,"5463":3.7452555914918335,"5464":3.5716323464347743,"5465":2.903348326546247,"5466":0.8100128467601635,"5467":1.3607133862375578,"5468":-1.8598291885435647,"5469":0.725819201187895,"5470":-0.16943746943742158,"5471":2.9391476384690987,"5472":1.3132549943962009,"5473":1.2117306379162232,"5474":0.3520244544563722,"5475":0.5657268686236784,"5476":0.40908409248685496,"5477":0.9267183198724166,"5478":-1.247806331109394,"5479":2.2506045195107878,"5480":0.9342206843539508,"5481":-0.24250919641875654,"5482":0.030211529366714663,"5483":0.07214410024036634,"5484":-0.8706995682807411,"5485":-0.12271453669796523,"5486":-0.5560787724510171,"5487":0.044904928599474064,"5488":0.5843286098922225,"5489":0.784854977684153,"5490":0.8468517904569232,"5491":1.1046018702697467,"5492":-1.1947787194041635,"5493":1.4127049263830787,"5494":0.0073251269031506154,"5495":-0.3091886091643713,"5496":-0.6961965693463458,"5497":0.4004280855876532,"5498":0.6484463623433547,"5499":0.3358258827567379,"5500":2.457670769940054,"5501":0.39595294159923644,"5502":-0.6161340381951672,"5503":1.0255578168608885,"5504":0.7861404058770043,"5505":0.45548896460949756,"5506":-1.074487933290236,"5507":-1.2747649081641117,"5508":-0.37717292428187343,"5509":1.1188150497351204,"5510":-2.491847884796816,"5511":0.5156327712164424,"5512":-0.1558656080120922,"5513":-1.1053908769508012,"5514":-0.5342214390241351,"5515":0.4528602498822979,"5516":-0.2969008577895397,"5517":0.14599952886754639,"5518":-0.021738603508482553,"5519":-1.036634726168022,"5520":-0.41372755880331363,"5521":-0.7176017438140347,"5522":-1.702249985203514,"5523":-0.012984804197173117,"5524":-0.4745995017519548,"5525":-0.5800154770149644,"5526":-0.33750005194130056,"5527":-1.9159076602205776,"5528":-0.09293355858078566,"5529":-1.385820294364629,"5530":-0.7266024273622986,"5531":-1.1121817560557543,"5532":0.6914001778828371,"5533":-2.0002265015890557,"5534":-3.0569388289123243,"5535":-3.174341683894605,"5536":-0.7711307755938773,"5537":-1.3518299706126184,"5538":-0.33001783324942047,"5539":1.518736813914829,"5540":2.321013350511197,"5541":-1.1875086362311067,"5542":3.4098488588908165,"5543":7.761655703463367,"5544":4.229644480957605,"5545":3.441197541882063,"5546":0.27813904747513324,"5547":0.5331131448686768,"5548":-1.2972786418327023,"5549":-0.5838640935562962,"5550":-0.9964459388960772,"5551":-0.5011681787908333,"5552":2.3093446822932844,"5553":0.6122869543223064,"5554":1.6050941998807844,"5555":1.0969845969090144,"5556":2.1733553671909824,"5557":-0.23418462262560819,"5558":2.2691574690395657,"5559":-1.3604549165041826,"5560":0.8737240665001358,"5561":0.9753007477913357,"5562":1.1443245214181148,"5563":-0.6374664474602184,"5564":0.538526198921132,"5565":0.04752095035961161,"5566":0.10881710613712715,"5567":1.351426940939048,"5568":2.2850919274464,"5569":0.7060602023834336,"5570":0.6617358616250464,"5571":-0.17154299616045499,"5572":-0.6233851500055122,"5573":1.812559391301414,"5574":-0.22313621530654687,"5575":0.8683656269592117,"5576":0.9965205178708577,"5577":0.30094438115342115,"5578":-0.11203991484334802,"5579":0.4917278400359757,"5580":-0.5522199860863367,"5581":0.2778081059034191,"5582":0.7405782080360087,"5583":-1.4788171255482323,"5584":0.5193637097853407,"5585":0.4457786758643149,"5586":0.7089133927856811,"5587":1.019314248015228,"5588":-2.5132187222567053,"5589":-1.3340995417061408,"5590":0.09226217111061077,"5591":0.3796740530064942,"5592":1.4870813499349813,"5593":0.3048022301113856,"5594":0.7175578247973611,"5595":0.7255792972404793,"5596":1.741907524459657,"5597":-1.891655627819718,"5598":-0.8013280983094168,"5599":-0.18040946903185226,"5600":-0.4983787294927044,"5601":0.5372362656303201,"5602":-0.028525850177616784,"5603":0.49098612697818794,"5604":0.7199016371089744,"5605":-0.44944965631691836,"5606":-0.022715446901922058,"5607":0.069762631361332,"5608":0.4542044364341804,"5609":-0.24158563209717626,"5610":-0.6238454531944307,"5611":1.3755924510729307,"5612":-1.4862393299252432,"5613":2.202378497179575,"5614":1.3565110000223912,"5615":1.1470659406543344,"5616":0.0032734915958670253,"5617":-0.3726743090821311,"5618":-1.9248666937345886,"5619":-1.6425567168629427,"5620":-1.4563957353481292,"5621":-0.6418955384185963,"5622":0.6616709456935832,"5623":0.7672095614524922,"5624":-3.7191671757074656,"5625":-6.077041434040993,"5626":-5.382773321636518,"5627":-2.7776231627379353,"5628":1.0421546112682285,"5629":-0.813920225729651,"5630":0.354922688716137,"5631":-1.1558272535874414,"5632":2.0851431389330517,"5633":0.767011092048193,"5634":1.219954812148573,"5635":1.684615151297333,"5636":-0.16693971276880862,"5637":0.30479935264192265,"5638":-0.5711440355683535,"5639":-1.0819557919270317,"5640":1.2125494302152817,"5641":-0.5044037960924191,"5642":0.23354539140911654,"5643":-0.32546271362847956,"5644":0.4688469332327892,"5645":-0.4411763040649972,"5646":1.220987278350126,"5647":0.6465787550822452,"5648":-0.878313693866048,"5649":-0.5216483115762431,"5650":0.9733481822299955,"5651":-0.0011530951574219258,"5652":-0.018528697944851083,"5653":0.13886875555214745,"5654":1.6376946261901222,"5655":0.7180810009182091,"5656":-1.448140218852751,"5657":-0.7105695977581078,"5658":-0.637374473194601,"5659":-0.46955969204499415,"5660":-0.09643493467464981,"5661":0.17500621972582842,"5662":-0.5418930561578984,"5663":-1.6353391275809912,"5664":0.40218725447639153,"5665":-0.19615183375682232,"5666":-0.15631882089051918,"5667":0.07721130381208911,"5668":1.0904164563095173,"5669":-0.0032013157224021305,"5670":-0.2099088534176057,"5671":-1.0202361663628547,"5672":-0.2551662449207822,"5673":-0.3308592722779957,"5674":0.2543362062122706,"5675":-0.09496796439670933,"5676":-0.28618594478161724,"5677":0.7149160405585043,"5678":0.10746701662832031,"5679":-0.11508580787298736,"5680":-0.810376178590195,"5681":0.7459052150755204,"5682":0.2359297329311203,"5683":-0.4437674368974397,"5684":-0.04318117047590856,"5685":-1.0602446436635888,"5686":-0.5767342279166742,"5687":0.3604665661330794,"5688":-0.9790784355556855,"5689":0.6216988667853198,"5690":0.025650835518851778,"5691":-0.1504317687826495,"5692":-1.373331723785751,"5693":-0.7627933696789575,"5694":0.03177424425451125,"5695":-1.0326911535111232,"5696":-1.4238191900693924,"5697":1.064070670681703,"5698":-1.008789086167367,"5699":-0.7341031745861049,"5700":3.3166617802492246,"5701":1.047886420537465,"5702":0.4447504515905519,"5703":0.040436631648632544,"5704":0.6743868005727214,"5705":0.02115502202361865,"5706":0.5614862449936255,"5707":1.3487640924095838,"5708":-2.2172863856754006,"5709":-1.1866139928705315,"5710":-1.7792344214086415,"5711":-0.5639359960851663,"5712":-0.8244053099407703,"5713":0.27148203038093927,"5714":-1.1139976259951478,"5715":-0.3150832282305393,"5716":0.18529580181472075,"5717":0.4254643422404431,"5718":0.7568312844065498,"5719":-0.502791192247304,"5720":-0.8023466637072224,"5721":-0.14441857252413595,"5722":1.7601341716310552,"5723":-1.0931547538407256,"5724":0.8860788416276666,"5725":-0.836595660088253,"5726":1.671514209030661,"5727":-0.4866526708212253,"5728":-0.7426325568476166,"5729":-0.8969578196872935,"5730":-0.0918476294289311,"5731":-0.026238912191192593,"5732":-0.5124015182645973,"5733":-0.6485936961373358,"5734":-0.8940944870678128,"5735":-0.7181869101916337,"5736":1.3532548225395433,"5737":-1.0269862335547295,"5738":0.07714398061338162,"5739":-0.07643105738593703,"5740":0.5992319996957576,"5741":-2.145212813957786,"5742":-1.188551595772966,"5743":2.6551078168754403,"5744":-1.1321888392058264,"5745":2.5784536392822637,"5746":1.3266394120937188,"5747":-0.6148301763634422,"5748":-0.2928685061184546,"5749":0.17943277397027627,"5750":-0.7104944652472731,"5751":3.0920550025902713,"5752":0.5097650437544048,"5753":-0.26863666578262635,"5754":1.635955016803049,"5755":0.8171432947678716,"5756":0.7497984719439522,"5757":-0.3014132286519468,"5758":-0.7911455705507108,"5759":0.6297980375698604,"5760":-0.4983327942591763,"5761":1.73001150220709,"5762":2.3055589095222917,"5763":-0.49786204411444324,"5764":0.7948662697182635,"5765":-0.8378069930310312,"5766":1.7529992942236066,"5767":-1.3838204472586353,"5768":-1.6170945289430885,"5769":-0.7180651666598288,"5770":0.6565253629970522,"5771":0.12247187631347255,"5772":-0.6168377996511477,"5773":-0.6666205439145888,"5774":-1.2029742272106045,"5775":2.1631919510254582,"5776":1.1904897777139576,"5777":-0.90679921860597,"5778":-0.9009816248184905,"5779":-0.07374884144228522,"5780":-1.4712833809999144,"5781":-1.9358031407910774,"5782":-1.4802017042125148,"5783":-0.615675932026609,"5784":-0.9869083280532067,"5785":-1.508045990377025,"5786":-0.18239240503825324,"5787":0.27482053358136305,"5788":-2.469301854239001,"5789":-0.6827748961908546,"5790":-0.738172217324311,"5791":-1.1940909564172304,"5792":0.3399491168286772,"5793":-1.0245519251120918,"5794":0.002274407580581973,"5795":-0.16260323683071704,"5796":0.6800097150740991,"5797":0.3086838584280044,"5798":-0.27073212492873316,"5799":0.840123272188527,"5800":-0.7488619667084311,"5801":-0.9369189038005039,"5802":1.9260170489308719,"5803":-0.07126322781665896,"5804":1.2888034138189806,"5805":2.792385564168718,"5806":1.7265089091724664,"5807":1.0623772325616638,"5808":0.4124430622397322,"5809":0.39693997755454136,"5810":1.3373070761624504,"5811":1.0642206948070816,"5812":1.2393188303393183,"5813":-1.7908875447662582,"5814":-0.22474568415247909,"5815":2.2277502406045717,"5816":-0.9106809163346783,"5817":-1.948298647342358,"5818":2.666623417619927,"5819":2.1276848606460406,"5820":-1.4765128483105296,"5821":-0.29934495409071593,"5822":-1.0581629977976186,"5823":-0.6102777291103499,"5824":1.3836216302952706,"5825":0.14469394362529966,"5826":-0.10776251734848394,"5827":1.625359207401944,"5828":0.3689650388973085,"5829":-0.42462670286652315,"5830":1.8578972711010304,"5831":-1.5644122973979735,"5832":0.9393900771450252,"5833":-1.5980679697607558,"5834":-0.1269089842856203,"5835":-1.1603456476941778,"5836":0.33067209256622954,"5837":-1.2282321452033307,"5838":-0.6246740640345947,"5839":-1.489025787665495,"5840":-0.5756488880083508,"5841":-0.8026238661434594,"5842":-1.7554174929169877,"5843":-1.3211594541242226,"5844":0.9841999401628847,"5845":1.0168333311028261,"5846":-0.3027523712270497,"5847":2.322841457775364,"5848":-0.5328176336287623,"5849":1.5592635094743583,"5850":-1.6213177250287054,"5851":1.05726783869374,"5852":3.703369366120833,"5853":1.6436704962482858,"5854":0.8249282140346099,"5855":-0.07334531747032548,"5856":0.7528218374659262,"5857":0.2576405224775564,"5858":0.250640949068603,"5859":0.32382613955889017,"5860":-0.7384892823720379,"5861":-1.1700621083284342,"5862":0.40471966658222697,"5863":-3.0564433856976034,"5864":-4.252347603775449,"5865":-1.3584223947974896,"5866":-2.2335102988360584,"5867":-0.4828285020303774,"5868":0.0907796540050808,"5869":-0.30602287328448546,"5870":0.6900458765212114,"5871":1.599621605925793,"5872":0.06798926558393915,"5873":1.7017627445451668,"5874":1.376814108925508,"5875":5.485812683692442,"5876":0.38949337279465673,"5877":0.15800621643927115,"5878":0.5243390945867793,"5879":2.064748270540858,"5880":-1.712575454838696,"5881":-2.423998678216923,"5882":1.3646152048468159,"5883":-1.3959994716403754,"5884":0.08249117225968208,"5885":0.7599312330518033,"5886":1.2834301840800344,"5887":-0.35968292260307644,"5888":-0.19393212104041907,"5889":-0.7238259124855952,"5890":-0.8523631852716452,"5891":-1.2070333197204421,"5892":-0.16393003590790792,"5893":1.4417165760512756,"5894":-0.6904516770632905,"5895":-0.33488150900675245,"5896":-2.400535221875537,"5897":0.9804419903492497,"5898":0.04887143884918118,"5899":2.247056128408077,"5900":0.5061560820015041,"5901":-0.49706896807127754,"5902":2.2668903447921185,"5903":1.6412534066975173,"5904":0.8948453816257844,"5905":0.7439816078946951,"5906":-0.957997060102065,"5907":0.3097033771199142,"5908":-1.0365004201788968,"5909":2.212441832023798,"5910":1.3906654111188599,"5911":-1.2253317462541835,"5912":-0.6095593402475222,"5913":-0.5664252960540238,"5914":0.8691105479184286,"5915":-2.292222984015678,"5916":-0.1348226511567184,"5917":0.9656949185978042,"5918":-0.47332222551244524,"5919":-1.7466003460756692,"5920":1.7041714673828547,"5921":-1.6858986776236047,"5922":2.8353812325937233,"5923":-0.980682781752341,"5924":1.2864000732318082,"5925":0.14186626151935935,"5926":0.4491578033115809,"5927":2.308747620172588,"5928":-1.9185273150632336,"5929":1.7340933699598902,"5930":-0.9344797878420197,"5931":-0.9086251172723218,"5932":1.6838420722816267,"5933":-0.7561004562853259,"5934":-0.43421319706645367,"5935":2.288485926206654,"5936":-2.038776259473199,"5937":2.31688834384933,"5938":-0.9254648361659534,"5939":0.27937283340107283,"5940":-0.08887343814758654,"5941":-0.28771080673116,"5942":0.5469735031903546,"5943":2.795423825194587,"5944":3.3910997240962724,"5945":2.61317290188546,"5946":-0.3776551033180079,"5947":-0.2628264280191255,"5948":0.1286293359860939,"5949":-1.0070205733306863,"5950":0.7944055822578456,"5951":-3.049616908505303,"5952":-0.1835085338425942,"5953":1.4203986878852886,"5954":-1.1066901570741603,"5955":-1.1933639457861678,"5956":-2.2833276224409387,"5957":-0.07790576003214263,"5958":-1.3382300408348715,"5959":1.0377263400988344,"5960":0.023332657257744138,"5961":-0.7350503263163578,"5962":-1.2054444184360538,"5963":-0.3571178365579275,"5964":1.097237855234154,"5965":1.9546675631147457,"5966":1.0766817829496,"5967":-0.7775048193650106,"5968":-0.47710618669456295,"5969":-0.4386964232931981,"5970":0.3295662268656427,"5971":-1.2027481906138313,"5972":0.2075137153795526,"5973":0.1752630213980451,"5974":0.42601056369480633,"5975":0.013566501766713668,"5976":-0.23948755570026822,"5977":-0.5915098412242259,"5978":-2.1215200246447297,"5979":-1.7076786389175111,"5980":0.6664348916217554,"5981":0.6900681797965782,"5982":-0.07757344251657587,"5983":-0.4136672316893917,"5984":1.4205868511252364,"5985":-0.5123826556041348,"5986":-0.3149109408094802,"5987":-1.0769563045888206,"5988":-0.740078373372025,"5989":0.7389397294531425,"5990":-0.8404246205948268,"5991":-0.005619248778448621,"5992":-0.22244095497480115,"5993":-0.36690246057651305,"5994":-0.10431086965347404,"5995":-0.8094270917904665,"5996":-0.7858584542158877,"5997":0.1487704744501533,"5998":-0.5254384525726726,"5999":-0.6560802599483332,"6000":-0.5388344204318314,"6001":0.0996512910198108,"6002":-0.30078062326191185,"6003":0.049020044861325836,"6004":-0.21374863554740173,"6005":-1.1033570243339126,"6006":-0.11041573599901326,"6007":0.2825734649450417,"6008":-0.06301483679008466,"6009":-0.9741384023414947,"6010":-0.09751850048879279,"6011":-0.43763435118645977,"6012":-0.7134388350420894,"6013":-0.866629327500729,"6014":-0.5833267301014525,"6015":0.7489439957846844,"6016":1.140066507005939,"6017":0.6046281407365451,"6018":-0.2867173298367939,"6019":-0.37110806005439473,"6020":-0.9556917359648281,"6021":-0.36037614422057834,"6022":-0.7587240281601831,"6023":8.919597632286633,"6024":8.552907498992555,"6025":0.8443215668960655,"6026":0.6014612550486396,"6027":-0.007380141324444401,"6028":0.5590965797876034,"6029":0.43304781369962214,"6030":-0.843375058126073,"6031":-0.22002912703604124,"6032":0.6573260570883106,"6033":0.46670728755681323,"6034":0.32792672106142,"6035":-0.6623368210258092,"6036":-0.3568466865866773,"6037":0.918318741417148,"6038":-0.2925869015772792,"6039":0.20436677935860292,"6040":-0.3949972583662061,"6041":-0.47999336208655285,"6042":-0.4151861518409779,"6043":0.38339590375777943,"6044":0.276683094228812,"6045":-0.012420347358511998,"6046":-0.04236121337832743,"6047":-0.21113291916184532,"6048":-1.0538158508572406,"6049":0.010224065409175167,"6050":-0.545365353772792,"6051":-0.5248791086398352,"6052":0.08311708885899505,"6053":-0.031922159000687095,"6054":-0.3349206479986908,"6055":-0.09511659803656734,"6056":-0.05960764909043667,"6057":0.02742911540897895,"6058":-1.1030957200424742,"6059":-0.5005958085698949,"6060":-1.0893429721340147,"6061":-0.4928142480072252,"6062":0.12954983641887438,"6063":0.5409847824796149,"6064":0.6456507443197759,"6065":0.16106540453754672,"6066":-0.6334951372142974,"6067":0.05395327908224264,"6068":1.0861901309386002,"6069":1.070796773930938,"6070":0.13434967672394726,"6071":0.3330789329953262,"6072":1.609487805158906,"6073":-1.3476152272277004,"6074":0.3892475299180946,"6075":1.2581305444095314,"6076":-1.4461778742243638,"6077":2.128760254361585,"6078":-0.40218264661264663,"6079":-0.17613918428554562,"6080":0.47157412067206966,"6081":0.2149790282712927,"6082":0.5661944502450676,"6083":-1.423705471347907,"6084":1.4972294186715527,"6085":-0.7809355974721992,"6086":0.3931972765291197,"6087":0.7341718061529012,"6088":1.9308649282727806,"6089":-0.9495737837990748,"6090":-0.543037311007643,"6091":0.3843022854886649,"6092":-1.8954488102985585,"6093":-0.3289816167587553,"6094":0.1310611570054825,"6095":1.8546506135168024,"6096":1.366051096810889,"6097":1.855822689028134,"6098":1.6457191475752246,"6099":2.1967979667808257,"6100":-0.9909826010749704,"6101":-1.580298802659743,"6102":1.5919870842202413,"6103":1.3638807814030414,"6104":-1.2344364912040944,"6105":-0.6894935211191949,"6106":1.551710770094771,"6107":0.5299447050707771,"6108":-5.882909637533912,"6109":-2.756976813304447,"6110":0.19572675366137385,"6111":0.5145146240480023,"6112":-0.9650190054920005,"6113":-0.26532153898371913,"6114":0.27778366721963843,"6115":0.6648076593657003,"6116":-1.4397397540674275,"6117":-3.048406800839653,"6118":-2.760472542897831,"6119":-2.2294704731778454,"6120":0.08858163671330464,"6121":-1.2703363550801743,"6122":-0.49439425758050837,"6123":-2.3928726762929897,"6124":-0.44407848144835016,"6125":-0.9553925786610333,"6126":0.11750291376595456,"6127":-0.07430297976779358,"6128":-2.121683557028565,"6129":-0.35697694837440075,"6130":-0.434597473834352,"6131":1.02348365602566,"6132":-1.1606375930922261,"6133":2.1624376568167554,"6134":0.2123734386823434,"6135":0.8261061951649075,"6136":0.26702085287738025,"6137":-0.9799270943201108,"6138":0.44889794621408646,"6139":-0.31126643765041295,"6140":0.9506708284819148,"6141":1.4208848966288987,"6142":1.1530439631216691,"6143":0.39306676465254287,"6144":2.0823043347786254,"6145":0.8436058027034202,"6146":-0.836075293031938,"6147":0.061514265864037264,"6148":0.1546901116928433,"6149":1.4916457203071292,"6150":0.3946910285024202,"6151":0.973639653500828,"6152":1.320069040376969,"6153":0.42262541377396284,"6154":1.1165787843076607,"6155":-0.18084240963667153,"6156":0.3571679714560635,"6157":1.4134194581504098,"6158":0.3168456857377933,"6159":-0.6188634036139831,"6160":-0.8054534548029411,"6161":-0.49259681414667583,"6162":-1.3039437946187236,"6163":0.33439504694964745,"6164":0.9001174681936815,"6165":-1.5405203714822977,"6166":0.012008621603249354,"6167":1.612231388059362,"6168":0.2794277510241933,"6169":1.8479258044796958,"6170":-1.696772268416288,"6171":-1.3294388279803722,"6172":-0.20536750874760634,"6173":2.2031552968145487,"6174":1.4467566923074913,"6175":-3.1246301713261753,"6176":-0.707504153206967,"6177":-0.12724938365001853,"6178":0.9344915560920517,"6179":1.110710505844772,"6180":-2.652099689132308,"6181":-1.3516067991797596,"6182":-0.4964311582751802,"6183":-1.034002380268015,"6184":-0.5829637910949487,"6185":-0.5085674291004011,"6186":0.9906445003214316,"6187":-0.10155593653143613,"6188":-1.217438761788028,"6189":0.7679919254478259,"6190":-3.3517743961826523,"6191":-3.276087254850561,"6192":-0.4075760147921541,"6193":1.7130179308593,"6194":-1.0098469395595417,"6195":-0.5697077976207947,"6196":2.0499197642036586,"6197":0.25860305167999365,"6198":-0.9953291135134582,"6199":0.4308628404951143,"6200":-2.3554584370632634,"6201":-1.649195762273886,"6202":-0.41691697157329594,"6203":-0.8696930970380401,"6204":-0.33517866251486855,"6205":0.19843200227897456,"6206":-3.7301150388914417,"6207":0.554271118679908,"6208":0.8535982080972762,"6209":-1.0099949902424525,"6210":0.8987875052990102,"6211":-2.914567925318535,"6212":1.4309320725554295,"6213":-0.6733233271666264,"6214":-1.3410781382864814,"6215":-0.08581528059416495,"6216":0.24166433716683874,"6217":2.522217278595173,"6218":0.5863207226095073,"6219":2.2775856243966355,"6220":-1.0684096386990574,"6221":1.6261687215917169,"6222":0.21447695531250593,"6223":1.8515358038472443,"6224":-0.5475222905725917,"6225":-1.700740591717593,"6226":0.6570541575390695,"6227":1.994215055418471,"6228":-0.022631477778140723,"6229":-0.007520317404270217,"6230":0.29217628986057287,"6231":1.5524181756099376,"6232":1.313383396988819,"6233":-2.0705194764283927,"6234":-0.3460421510851871,"6235":0.04383003783324413,"6236":-1.9549628254488487,"6237":-1.5672973790352926,"6238":0.2022283470689659,"6239":2.2738217945622337,"6240":-1.4902366725626082,"6241":1.1764047846145345,"6242":-1.6250413004470292,"6243":0.06388377903880058,"6244":-0.46924264848689606,"6245":0.948652906371783,"6246":1.1224776161888081,"6247":-1.0269439543817678,"6248":1.4777446372068437,"6249":0.039123919160888254,"6250":-1.0161521536461193,"6251":0.32344902402395825,"6252":-1.237193523869374,"6253":0.1669445135104514,"6254":0.6826870838809895,"6255":1.410702010144802,"6256":0.860041756219866,"6257":-0.9167013210761726,"6258":-0.37261925485068825,"6259":0.606534084992817,"6260":-1.6947701410766696,"6261":0.30491967280610416,"6262":-2.2164478993807757,"6263":-0.11008896795747927,"6264":1.030363905300556,"6265":1.067216513603355,"6266":1.885486835717985,"6267":3.685898996083816,"6268":-0.0338768063882619,"6269":-0.5685528046969128,"6270":0.061277588986945866,"6271":-0.7059520109640091,"6272":3.0921928242206302,"6273":2.5238101463952205,"6274":3.674766131356118,"6275":1.5813391397103882,"6276":2.1140985946039335,"6277":0.01493403643874293,"6278":-0.2902114006682902,"6279":-4.586031614481606,"6280":-2.068740369434081,"6281":-1.8002094942918219,"6282":-2.3439363154145108,"6283":-0.3591491467285995,"6284":-1.0818857288082213,"6285":0.31789691030051787,"6286":0.8587860102560673,"6287":-0.8021661501850625,"6288":-0.567106284783081,"6289":2.1561186705355593,"6290":0.7617779895922456,"6291":0.6282198444307164,"6292":-0.05627327257274077,"6293":-0.7232738894431594,"6294":0.9249994705876259,"6295":0.482690831311782,"6296":0.3719432248605639,"6297":-1.7760697463968786,"6298":0.08030758605730921,"6299":-1.2132043465184181,"6300":-1.2618752709466476,"6301":0.1017513548147869,"6302":0.09935207781492987,"6303":0.08083262135625269,"6304":1.3955136806031838,"6305":0.12837316421624898,"6306":-0.31504742469912556,"6307":-0.10723135131754444,"6308":0.6065101584512996,"6309":1.7717800751601107,"6310":-0.6563802401317643,"6311":0.07019340039201055,"6312":0.31350134995167994,"6313":0.1929325715983046,"6314":-0.7950041508912492,"6315":-0.1806191497359114,"6316":0.46307554877998625,"6317":0.5305122767373524,"6318":1.2941500871106077,"6319":0.09541527865226175,"6320":0.2357999506536915,"6321":-0.7546700448803049,"6322":-0.17650128216986918,"6323":-0.05686404159450182,"6324":-0.1277603954793199,"6325":0.2403931337029683,"6326":0.46006908105543776,"6327":-0.32828609635505196,"6328":0.11694203531495925,"6329":-0.612938617502628,"6330":-0.6407673878625825,"6331":-0.06969869011730315,"6332":0.4286162505391858,"6333":0.5395239866908862,"6334":-0.09860234752163334,"6335":-0.16006961036080763,"6336":0.7301968242300287,"6337":0.31039374739501985,"6338":-0.8555211773786352,"6339":0.02559401637235814,"6340":-0.6171310050415221,"6341":-0.09374473518212349,"6342":0.07963745199094203,"6343":0.5833397499677092,"6344":-0.5795805256345539,"6345":2.1441829598957765,"6346":1.5687580614754355,"6347":-0.13566663711841356,"6348":0.5887129166366869,"6349":-0.34228220659382236,"6350":0.154240861098174,"6351":0.007855256793433319,"6352":-0.34496805336121394,"6353":12.421295864165755,"6354":9.32160653725659,"6355":4.3241628275268615,"6356":-0.00807068124368597,"6357":-0.4756914456045962,"6358":-0.26523806823463514,"6359":0.36716247883930897,"6360":1.2333398362357715,"6361":0.8246520243964178,"6362":0.4079854927108579,"6363":2.332601171215511,"6364":0.7575880650133975,"6365":0.09119296227154264,"6366":0.1461955823257483,"6367":-0.13498449055853534,"6368":-0.2281691398600289,"6369":-0.28131984533303883,"6370":-0.01385224603640297,"6371":-0.34120168736358203,"6372":0.23488776563733377,"6373":-0.8276569006152628,"6374":0.5261909971584049,"6375":0.19087898446407742,"6376":0.3495471529405347,"6377":0.0046822076465566345,"6378":-0.9496776605832674,"6379":0.43354166081964185,"6380":0.13814549123981948,"6381":1.2010965126287554,"6382":-0.5930334157396213,"6383":-1.3495741028241257,"6384":0.9107506975956963,"6385":-0.29920023176384847,"6386":0.8684758997441904,"6387":-0.5820597247318589,"6388":0.3000359624074077,"6389":-0.9699223123819019,"6390":-0.03688997145215551,"6391":-0.16928094645241412,"6392":0.1591556916999993,"6393":0.19383719776690703,"6394":-0.3566257294213193,"6395":0.3768105653451132,"6396":-0.4033288295291269,"6397":-1.1924555938465318,"6398":-1.072351802190419,"6399":0.2925549964398667,"6400":0.5010452407996855,"6401":0.9650834144121039,"6402":-0.46484591162988304,"6403":1.2625849814727514,"6404":-0.7885142601137782,"6405":0.8216343588238296,"6406":-1.6289264909952683,"6407":1.274070034225412,"6408":-1.356134104967863,"6409":-0.7571893276295265,"6410":0.43487840964750585,"6411":0.1499645189648916,"6412":0.18798475501313344,"6413":-0.0482976881502104,"6414":0.5420155610618633,"6415":0.014361086201064544,"6416":-1.4683563610825305,"6417":-0.23164126666679521,"6418":1.0949021802462837,"6419":2.2148961209384583,"6420":1.2614881986937312,"6421":-0.6687462872757033,"6422":-0.28668007832412673,"6423":-0.7763852991655786,"6424":-1.2594488684466836,"6425":-0.6333397115452177,"6426":-2.9961965288612253,"6427":-1.442682057876307,"6428":0.16708664057191006,"6429":0.1325868758659165,"6430":-0.1309570333283814,"6431":-2.9091940822308806,"6432":1.775256768988398,"6433":1.9194276532271994,"6434":1.428686134229238,"6435":1.151279413765255,"6436":-2.9065389479617307,"6437":-1.5865161439700544,"6438":-1.2106739244991063,"6439":-0.9034259298181092,"6440":0.43243745715414333,"6441":-0.3119059019701704,"6442":-0.23747990005715555,"6443":2.4984881759990416,"6444":4.349662117609391,"6445":3.9011885313920684,"6446":1.0858076743616667,"6447":-0.9411834267576481,"6448":0.6443294612748811,"6449":0.41576653638541655,"6450":0.40197768609005174,"6451":-0.783677390178378,"6452":-0.9743791218411799,"6453":1.53879563958774,"6454":1.7843997808409526,"6455":1.3299372729390713,"6456":-0.24107916338005325,"6457":-0.15173511712849305,"6458":1.1602895932602653,"6459":-0.5328191944748242,"6460":0.891745127077797,"6461":-0.5612254539129921,"6462":0.3769429581576545,"6463":1.0016408366680503,"6464":0.9606223744033267,"6465":2.5923368893597547,"6466":0.7007446030511202,"6467":1.19286732807496,"6468":0.8940785513833872,"6469":-0.5396589421555611,"6470":-1.0959293230852853,"6471":-1.1689399965054281,"6472":0.7245841260883757,"6473":0.04816459954865938,"6474":2.0777858894756305,"6475":1.1927278518823223,"6476":-0.46238817578114016,"6477":-0.48118317495980906,"6478":-1.2220810919323652,"6479":-0.9557847048566913,"6480":-0.9749180746141576,"6481":-0.28856450722339716,"6482":-0.3503605578760858,"6483":-0.0551058183703176,"6484":-0.3883023047241345,"6485":-0.08713421558933823,"6486":0.34925218536850056,"6487":0.5408705674231667,"6488":0.8303378648014221,"6489":-0.46220292250030987,"6490":-0.5662880344049204,"6491":-0.877552001707856,"6492":-0.8695881365201187,"6493":0.16292507568522321,"6494":-1.5988730043317518,"6495":-0.324068016158157,"6496":2.298625832979597,"6497":0.08856206382327464,"6498":-1.1920194069345724,"6499":2.2770749744649477,"6500":-1.0061549396023919,"6501":-0.006937071822049921,"6502":-0.31395134739133296,"6503":-0.5967795631015578,"6504":-0.666041726916409,"6505":-1.1161074633196872,"6506":-0.5294066077959418,"6507":-0.0451236355805846,"6508":-0.021655749528231124,"6509":1.571067236695519,"6510":-0.9165184305892994,"6511":1.5104542070717448,"6512":-0.05260782447490204,"6513":1.2040527834096812,"6514":-0.1864880546592186,"6515":-0.2763873169439337,"6516":-0.30720765042187076,"6517":8.298308380083771,"6518":4.4661940320577775,"6519":2.002208341945181,"6520":-2.248345805699573,"6521":-0.19475605257922715,"6522":0.06232555575544498,"6523":0.21517169474137113,"6524":1.2989421361038973,"6525":-2.3824857751191137,"6526":1.1413098077305541,"6527":4.350951618037991,"6528":0.6604526848007118,"6529":-0.9614086056085647,"6530":0.19550662221534063,"6531":0.9216315233395412,"6532":-0.3411972745705269,"6533":-1.1137754106037379,"6534":1.3956249956370579,"6535":1.603385018423561,"6536":-0.8789936197612841,"6537":0.41314237625534506,"6538":0.5478896632448806,"6539":0.7106724769360084,"6540":-1.0779529536667034,"6541":-0.6787973682881131,"6542":1.2400155424098722,"6543":-1.2501136245026294,"6544":-0.5537207507208705,"6545":0.11712209065873613,"6546":2.0596729292228644,"6547":-1.2740459900722756,"6548":0.013670025860105132,"6549":-1.5370325719594362,"6550":0.843876349877467,"6551":0.16978687762758066,"6552":-0.010754946693560988,"6553":-0.6869254278623529,"6554":-0.06507983435668363,"6555":-0.3057729816688745,"6556":1.076626711403505,"6557":-0.8656586447547698,"6558":-0.6910073341785106,"6559":-0.5816587000097694,"6560":0.6518182870805951,"6561":0.017988287223556935,"6562":-0.2046605097526517,"6563":0.4739516975631826,"6564":-0.3327876560677672,"6565":-1.0072790297370802,"6566":-0.15111346853133803,"6567":0.8986507044413105,"6568":-3.7304814522777083,"6569":-1.2284072645739235,"6570":-0.3613754053103368,"6571":1.2767965773997847,"6572":0.8187188598099169,"6573":0.39280933245057037,"6574":-0.12173275278993581,"6575":-1.722254776035504,"6576":1.3214221646609006,"6577":-0.226896735987476,"6578":0.7628019174736612,"6579":1.0010300956779912,"6580":0.8935552021319716,"6581":0.38434268819705375,"6582":1.1770889053360076,"6583":-0.7221234380069429,"6584":1.2933928516102164,"6585":0.12654392931953315,"6586":1.8920925497035757,"6587":-0.7888266041670942,"6588":-0.5364447369860491,"6589":1.3682037111263419,"6590":1.9325042768123912,"6591":1.54758785042243,"6592":2.6912436992414626,"6593":1.8991060620361753,"6594":0.3477158088182052,"6595":0.9390585035508011,"6596":-1.0485650026201112,"6597":-1.1512709188137227,"6598":-0.036862730580635834,"6599":2.2853151774813454,"6600":4.7555808846222165,"6601":3.0786098415289898,"6602":1.021835112893623,"6603":0.8024366506171463,"6604":-1.2534342055186263,"6605":-1.619411646440777,"6606":-1.707070348790915,"6607":-0.294312893831714,"6608":-0.45263979706477453,"6609":-0.3271517439937954,"6610":1.962283863993965,"6611":0.6733198800342955,"6612":-1.202281425241023,"6613":-0.2014735439804485,"6614":-1.260185930399611,"6615":-0.5341563265668406,"6616":0.26675088528972124,"6617":0.9527599484368185,"6618":0.03139289742504206,"6619":0.4867278752022046,"6620":0.6214677655771681,"6621":-0.18903907410782259,"6622":0.9976078451053699,"6623":-0.1272168766609086,"6624":0.5165668430935808,"6625":1.6613195857980327,"6626":2.199251159164204,"6627":-2.9157052720990886,"6628":-0.5754848867180549,"6629":1.8607341739473982,"6630":-2.8692847399073136,"6631":-0.5673687008981925,"6632":1.6939735265382545,"6633":-2.5850108366027977,"6634":-1.1280959057933793,"6635":0.4129498565302364,"6636":-0.8527190035588718,"6637":-2.121564499079634,"6638":-1.4772797179332215,"6639":-2.1336186631871388,"6640":1.4813034203316473,"6641":-1.692983754804101,"6642":-2.3169316089775145,"6643":-0.026047021245405318,"6644":-2.2256249476005787,"6645":4.069936343413719,"6646":1.104042730484348,"6647":1.1810129112190062,"6648":0.716856553624382,"6649":0.735735679926628,"6650":0.6082100122899325,"6651":-0.025929399307262912,"6652":0.8312256255695181,"6653":-0.9640591628113547,"6654":2.427124922953611,"6655":0.7133976977111633,"6656":1.0208342330625557,"6657":0.9381406506047123,"6658":0.9502040345584849,"6659":0.7472194770512082,"6660":0.4311074182964197,"6661":0.4918755567540502,"6662":-0.7784022083776443,"6663":3.25992341323155,"6664":2.1646321345998336,"6665":1.5224319414061909,"6666":0.589896328429447,"6667":0.43265806367445603,"6668":0.8431117528287282,"6669":-0.4239352859025712,"6670":-0.40349840560425726,"6671":-2.8652115303293404,"6672":3.0575450566905995,"6673":1.6890142311685348,"6674":1.191454149089407,"6675":0.6114631177272786,"6676":0.3876179149684988,"6677":0.4952486892894989,"6678":-0.7003893381445727,"6679":0.22307985316161746,"6680":-2.1804092821385854,"6681":2.773300100697623,"6682":2.0790476189585094,"6683":1.3859514486972118,"6684":0.4641000950395118,"6685":0.8629897921826962,"6686":0.28961051480329225,"6687":-0.47132412762631754,"6688":-0.557235787063434,"6689":0.20108733460071038,"6690":1.588103724148754,"6691":1.9015807621482237,"6692":1.1919004212181445,"6693":1.3951055630160514,"6694":1.2770347558489286,"6695":0.620773034156234,"6696":0.17792955828946058,"6697":-0.5997647173773807,"6698":1.2380389571196746,"6699":2.649549793135471,"6700":1.8826902927769429,"6701":1.0963885822807686,"6702":0.7217013780237777,"6703":0.5148703784304243,"6704":0.5870269010857684,"6705":-0.12246485090970065,"6706":-0.2526906265620003,"6707":1.3619872149637162,"6708":2.5269749125532974,"6709":2.191504707117334,"6710":1.3064443689499192,"6711":0.6843092944010288,"6712":1.0374223143861212,"6713":0.8156813603702199,"6714":1.3331692964715263,"6715":-1.170918218972965,"6716":-0.8786756051368542,"6717":5.128414370492609,"6718":2.0355576987991326,"6719":1.2808959993507458,"6720":0.757636783483559,"6721":0.47012789820687734,"6722":0.7345662724217933,"6723":0.38265292590914063,"6724":-0.3043611400190074,"6725":0.6732875332675047,"6726":0.2698715370770555,"6727":0.5455232075393682,"6728":-0.9464901802728444,"6729":0.5656446481652349,"6730":-0.21271469374845137,"6731":-0.1309453171676565,"6732":0.12450754763705318,"6733":-0.7115407779248479,"6734":-0.2661435737376161,"6735":-0.5048630266845714,"6736":-0.16926882634598645,"6737":-0.050987253207195486,"6738":0.15646166371468906,"6739":0.35172381206129816,"6740":0.19546514424312977,"6741":0.03547392850970259,"6742":-0.20950024047628849,"6743":0.9503857898171211,"6744":0.2355461225463797,"6745":-0.19629233939407587,"6746":0.3605835587596372,"6747":-0.12534241453404615,"6748":-0.04052524865143345,"6749":0.3363787349828305,"6750":0.4501086880207028,"6751":-0.052133545202342285,"6752":0.9174452373531143,"6753":0.4659675868827382,"6754":0.515984143805781,"6755":0.3343386402205468,"6756":0.5442110480643089,"6757":-0.3680869463801212,"6758":0.1593582417057369,"6759":0.42763297654509125,"6760":-0.011717020225939173,"6761":-0.3020462475963075,"6762":-0.25771123001841506,"6763":-1.1515984554441208,"6764":-0.915297388336548,"6765":-0.053223694212188116,"6766":-0.5900557550892849,"6767":0.3799078581542407,"6768":0.06917734521317334,"6769":0.09019989104245435,"6770":-0.9319599654698861,"6771":12.42014671052534,"6772":-1.2036481432537987,"6773":-0.41679496716982345,"6774":-0.5604838394600248,"6775":0.16374037208461253,"6776":0.28276245351391044,"6777":0.4170967103084256,"6778":0.10745268023612374,"6779":-0.6078150555166117,"6780":0.21475812673229866,"6781":0.1267885338071529,"6782":-0.20935962867591096,"6783":-0.18387052514862262,"6784":0.12425917166184938,"6785":-0.44053892656132754,"6786":-0.2829680678193064,"6787":0.3043229599745131,"6788":-0.5590318806550683,"6789":-0.6049373008766868,"6790":-0.43718686313085037,"6791":0.44848728610319977,"6792":0.25140635923449955,"6793":0.18607420454922655,"6794":-0.6952822141667383,"6795":0.05227090817357626,"6796":-0.35354218737679133,"6797":-0.8303021899326305,"6798":0.48834044963697465,"6799":0.6666469508453498,"6800":-0.4726406331725733,"6801":-0.7580575910272915,"6802":-0.3923763151447256,"6803":-0.7314107455780687,"6804":0.3426102600506884,"6805":0.0801218599318671,"6806":-0.06556210162568596,"6807":-0.8860888290819773,"6808":0.4684010751756161,"6809":0.6226621799092774,"6810":-1.3587741144757188,"6811":-1.5187168099528798,"6812":-0.9866007972484289,"6813":-0.6136552066900056,"6814":-1.4458585247462101,"6815":-0.022407263592783246,"6816":1.0449373509249522,"6817":0.47874428673018293,"6818":0.2668564827187775,"6819":-0.056814801840788534,"6820":-1.3637787771963488,"6821":-0.9705712698239248,"6822":-0.9703578931422601,"6823":-0.2542382421972715,"6824":-0.6125781341971258,"6825":0.5271117209026226,"6826":-0.7873673685197916,"6827":0.2057834075055986,"6828":-1.0139005459857884,"6829":-1.1926353594579417,"6830":-0.6451849697783514,"6831":-0.9964230204792943,"6832":-0.8361708766477154,"6833":0.05204753982106355,"6834":1.3028395488989961,"6835":-1.403244781026759,"6836":0.6592127321703845,"6837":-2.9644401825536626,"6838":-1.7605160336046308,"6839":-1.3185967938997853,"6840":-1.1841341286950338,"6841":-0.6015663533284568,"6842":0.9344791723167134,"6843":1.7552701084643494,"6844":1.5308562157983276,"6845":3.0429940953202257,"6846":-1.3434849240970668,"6847":-2.0881524350766063,"6848":-0.5908841923654061,"6849":-0.7176326785235682,"6850":-1.0052057890149753,"6851":-1.9760762817848796,"6852":-0.7634718377339844,"6853":-0.018150613136862868,"6854":0.0641299400812323,"6855":-2.615915841671422,"6856":-2.508375779332495,"6857":-1.1019683336074948,"6858":-1.1349447989345964,"6859":-1.0077421690847135,"6860":-2.9430360487252956,"6861":-0.17734432142166198,"6862":0.12094981448850017,"6863":1.3784030733675074,"6864":-2.344932181493127,"6865":-2.1090605972201173,"6866":-1.7029648095848988,"6867":0.21095783444656255,"6868":-1.1552868350705372,"6869":-0.17491364598121842,"6870":0.7468356700681045,"6871":0.20183053177259538,"6872":1.6288091371023181,"6873":-1.6318464744960013,"6874":-2.1290485380791164,"6875":-1.3393644592028096,"6876":-0.720103574176237,"6877":-1.0427782766882614,"6878":1.5429267299381995,"6879":-1.4500416865374943,"6880":-0.042817551546453135,"6881":0.05914788543979761,"6882":-1.6178133802625139,"6883":-2.2691064097415645,"6884":-1.0311411743310372,"6885":-0.6005185332095495,"6886":-0.2891576632377035,"6887":-0.8296254222682075,"6888":1.1522318601244625,"6889":0.36918461175138173,"6890":2.339625827597028,"6891":0.7585826552463509,"6892":1.1831587140787554,"6893":0.9022130498224782,"6894":0.616503021189842,"6895":-0.8725179103448456,"6896":2.0025143944571835,"6897":-0.430649304773158,"6898":-0.3591278711394719,"6899":-0.5239031063180962,"6900":1.1496803058614524,"6901":-0.013761862213629576,"6902":1.7865540327340095,"6903":-2.9424716906299575,"6904":2.137335683006574,"6905":0.35526612763208676,"6906":2.1495291624140833,"6907":-0.20350803431944878,"6908":-0.42730692857170705,"6909":-1.692211432304941,"6910":-0.30109790036712675,"6911":-0.02533946350577619,"6912":-0.826216090344417,"6913":0.3557295372052825,"6914":1.8161102792224075,"6915":0.45498252538414496,"6916":-0.08666198057515996,"6917":-1.1089503579878424,"6918":1.1101731187730566,"6919":-0.27051381310524364,"6920":-1.0584693359834936,"6921":-1.2519007198800594,"6922":-0.8356272493930877,"6923":1.595259404474498,"6924":-1.2740568805663521,"6925":-0.00010621307268770372,"6926":0.9807702879171059,"6927":0.7446468263020306,"6928":-2.346860369508922,"6929":0.6719232264699599,"6930":0.945216284713226,"6931":-0.4273085974353251,"6932":1.521819925924284,"6933":-1.3743776542970823,"6934":1.1117872861387423,"6935":-0.9697082064390319,"6936":1.4309982634052216,"6937":-0.5380370447420392,"6938":-1.0747103906493576,"6939":-1.5007904395918767,"6940":-2.4909515612873103,"6941":0.6027873238982295,"6942":-0.7337227473140604,"6943":-0.5046004263547975,"6944":-1.8856006345120149,"6945":1.7492045557413767,"6946":-1.5456103396834655,"6947":0.7684042397422969,"6948":-1.1094063044523201,"6949":-2.0184487863204836,"6950":-1.4441424474946114,"6951":1.1864026960617695,"6952":-1.2767332367372115,"6953":1.9315905996107208,"6954":0.16255917748334178,"6955":-0.5316170210933523,"6956":0.5973879717879318,"6957":0.33885776545344365,"6958":-3.352522689136348,"6959":-0.3038028533190048,"6960":0.14602512729223344,"6961":1.447743989956051,"6962":0.7865842641260764,"6963":-0.9873327154267324,"6964":-0.5535622519469741,"6965":-0.34281270681381076,"6966":-1.1255166673969348,"6967":0.7860400326065208,"6968":-0.4915973892516805,"6969":0.6853910539026143,"6970":-2.3676102322613843,"6971":1.721783363236302,"6972":-0.4349757518146116,"6973":0.29900456377442136,"6974":0.5218165244850141,"6975":-0.4630932613849376,"6976":-0.5775062095212041,"6977":0.8968246529747279,"6978":-0.6448558261987142,"6979":0.23512264587953835,"6980":-1.2280942812276963,"6981":-0.4898867430925659,"6982":-1.8970839063960399,"6983":0.13791934659358063,"6984":-1.0155773480295391,"6985":0.35309342045035336,"6986":-0.983184910243959,"6987":0.25816752319057096,"6988":0.4422137261035401,"6989":2.3944208495950146,"6990":-0.01963708939335202,"6991":-0.038154185616331056,"6992":-0.7447576004014581,"6993":-0.2381077765836149,"6994":0.8560669800565659,"6995":-0.9410226076790187,"6996":-0.6436680203838504,"6997":-0.619671300657564,"6998":-0.6309257237833095,"6999":0.048436596644595,"7000":-2.323928060110668,"7001":0.21389939995984858,"7002":0.3955360878822448,"7003":0.48553363496093704,"7004":-2.3581767123122686,"7005":0.5063276249708716,"7006":-0.3097536415795455,"7007":1.9204619385354473,"7008":-1.3152775032434414,"7009":0.36720844060572516,"7010":6.5722231072673205,"7011":3.582809140903728,"7012":5.226322192304631,"7013":0.9894983173580566,"7014":-0.08347071101643405,"7015":-1.8540951328962003,"7016":-0.9374252214107739,"7017":0.7087401280630056,"7018":-3.404712659268008,"7019":-4.880050652867007,"7020":-1.4153439026719765,"7021":-1.9849851614814462,"7022":0.45747211571834984,"7023":0.10776276133385541,"7024":1.1533810929983475,"7025":0.25474544973537083,"7026":1.78586584871987,"7027":-0.2674402919752197,"7028":0.6254386628544414,"7029":0.8440881396293052,"7030":0.030961533911583194,"7031":0.7393457607469974,"7032":0.6525652411994635,"7033":0.9949870919748256,"7034":-0.6464041065162772,"7035":1.330511202346507,"7036":-0.4768626126678273,"7037":0.2244968793189098,"7038":-0.2220741170368662,"7039":0.07903464846786407,"7040":1.5905887817254876,"7041":-0.24737468089328815,"7042":1.2964911095533491,"7043":2.2277697741462332,"7044":-0.8730731502194717,"7045":1.3514477471074469,"7046":0.9199480977999506,"7047":2.7787881038411952,"7048":1.8617271186372042,"7049":-0.6738964612451571,"7050":-0.6586407118792913,"7051":0.0632859777915836,"7052":-0.08017873139312434,"7053":-0.2043102878495592,"7054":0.9305549635945184,"7055":0.9658188114651189,"7056":0.4868046436806943,"7057":0.7357261675618528,"7058":0.5183361017490591,"7059":-0.6161855763462533,"7060":0.5461431859298017,"7061":-0.2913701298269267,"7062":-1.1235491733955216,"7063":0.9704443552993571,"7064":0.4998700132176274,"7065":-1.7062161673318788,"7066":0.6121650787708015,"7067":0.18486348075978784,"7068":0.007033594216983878,"7069":0.6245206144257285,"7070":0.9604624973971704,"7071":0.43879485062932405,"7072":1.7960062541141684,"7073":0.6117148187454698,"7074":0.7360535725488684,"7075":-1.1091273084258486,"7076":-0.39184406434052516,"7077":2.3877417726147043,"7078":-0.37341640682571914,"7079":0.8534669660409931,"7080":0.7824754384183256,"7081":1.635640032820127,"7082":1.1237877928527993,"7083":0.30749331386856066,"7084":-2.5978410441665636,"7085":-1.2544237427167233,"7086":-1.1595265030712776,"7087":0.35245996152730336,"7088":-0.9538917751588006,"7089":0.6901266374675734,"7090":1.8470082458837658,"7091":-0.602127523749631,"7092":3.918419943751483,"7093":3.043342043859521,"7094":6.63525211467649,"7095":4.945509239963752,"7096":2.8259840383767982,"7097":-0.4043945202656035,"7098":0.04530710439575846,"7099":-1.0029994830096696,"7100":-0.3319326849275907,"7101":-0.5579269082693987,"7102":-2.2171493678232683,"7103":-1.1007246595223095,"7104":-1.1679563496453924,"7105":-0.6035368624241122,"7106":-0.20117951783017954,"7107":-1.743698117704731,"7108":0.18247024319175723,"7109":0.31489986793299946,"7110":0.33620822650945303,"7111":-0.7825971935856841,"7112":-0.12267178535478221,"7113":-1.6328313535068206,"7114":0.7927579375078094,"7115":0.5813161812012647,"7116":-0.7277294582215306,"7117":-0.22611109601652096,"7118":0.5444653452981566,"7119":-0.6518184040179794,"7120":0.18185272602610947,"7121":1.274823547803493,"7122":-1.074226900197907,"7123":1.6423108704509264,"7124":0.15324308841384474,"7125":1.0672541063662213,"7126":-0.7225515608770751,"7127":-0.6883634512845118,"7128":-0.3818276012906103,"7129":1.525094231698678,"7130":-0.4207015071817212,"7131":-0.8618222713951781,"7132":-1.5019321746228573,"7133":1.1695132536384882,"7134":-0.38891231534864934,"7135":-0.40925760815205353,"7136":-0.37633563650173274,"7137":0.7463506058823142,"7138":0.012856191576271795,"7139":-0.16262181833091446,"7140":0.4626483437213887,"7141":-0.8312147717410473,"7142":-0.8006752457408652,"7143":-0.6868069807336141,"7144":0.07097141385307901,"7145":-0.6905406956513301,"7146":-0.315420345958833,"7147":-0.7332425812737362,"7148":-0.0042852001445875835,"7149":0.3316436903520082,"7150":0.03645046287521442,"7151":1.2786284684638978,"7152":-2.12945738834562,"7153":0.664950462322816,"7154":2.5547751239055008,"7155":-0.10358546510250381,"7156":-0.9551970612963538,"7157":-1.1373778001391115,"7158":0.3946274677443076,"7159":0.2636679902164714,"7160":-0.49545467358029055,"7161":-1.2787824493765956,"7162":-1.742085600286708,"7163":0.4118284544516244,"7164":-0.18589072029878145,"7165":-0.8275604447514996,"7166":2.3812622501483562,"7167":-0.052267768924081574,"7168":-0.26723422894437443,"7169":1.0904122131510015,"7170":-0.21000411208189435,"7171":-0.30642131569529696,"7172":0.5405675303080208,"7173":-1.29121845559221,"7174":-1.3126636401731693,"7175":-0.439381498772738,"7176":3.258059412647633,"7177":-0.09834380009925782,"7178":-0.8264307312529056,"7179":-0.38324522699340124,"7180":0.7418416104216556,"7181":0.5991800489389719,"7182":-0.9330442014090592,"7183":-1.3402857049168804,"7184":2.5407105295022787,"7185":-2.090558319041385,"7186":-1.2282874258745673,"7187":-0.34925373760611333,"7188":-0.7698108069370572,"7189":1.8726438134583816,"7190":-0.11117321769363851,"7191":-0.7430294888818749,"7192":1.5636105523601338,"7193":-0.8455476396090772,"7194":-1.2280272924951627,"7195":0.08610768758394699,"7196":0.12240515769409308,"7197":-1.4365125981518414,"7198":0.6088810477703543,"7199":-1.002156150852887,"7200":-1.02300051025567,"7201":-0.4040194613884446,"7202":0.4929650279255079,"7203":-0.41804212770706745,"7204":0.21249005885969874,"7205":-1.057754846728426,"7206":-1.3414482778211023,"7207":0.7490245106615866,"7208":-1.4662067480952208,"7209":-1.4798963578178244,"7210":-0.46710646534008765,"7211":-0.05883741292618477,"7212":-1.0521096763670195,"7213":-0.8942411819099231,"7214":-0.7277744149644827,"7215":-1.3029102098504661,"7216":1.1091389144432096,"7217":0.0747285427693748,"7218":0.6848046328316135,"7219":-0.22094934606529704,"7220":-0.03830311606678649,"7221":-0.4565634688969663,"7222":-0.2278045985762206,"7223":-0.751780329615846,"7224":-1.3892396044638795,"7225":-0.6422292984314477,"7226":-0.9441692528374729,"7227":-0.46898969851082883,"7228":0.12572572041605262,"7229":-0.48274044103207653,"7230":-0.3138321698872442,"7231":-1.1417835955196276,"7232":-1.3341189880687658,"7233":-1.3692913435690075,"7234":0.3125594005437491,"7235":-0.147950119966347,"7236":-0.21688883182661664,"7237":-1.4262131797028497,"7238":0.285794449785847,"7239":-0.3270636979229257,"7240":-1.9481640963734286,"7241":-1.1785817591302588,"7242":-0.7462324838660304,"7243":-0.49438435995084445,"7244":-0.31474495262558766,"7245":-0.5609033283783407,"7246":-1.7316143173890564,"7247":0.2038310812813834,"7248":0.613030174249554,"7249":-1.9453065175790167,"7250":-2.004041541322805,"7251":-1.7698207065419602,"7252":-0.05458118353219371,"7253":-0.07154156844086954,"7254":-2.236510404294631,"7255":-1.5595409183582616,"7256":-0.6698567643766972,"7257":-0.14880609258595692,"7258":-2.420651279518884,"7259":-1.6452659792514632,"7260":-0.1916703090167453,"7261":-0.825840358453754,"7262":1.40122904243769,"7263":1.1667796616097696,"7264":0.12857336704570263,"7265":-0.037830316358087576,"7266":-1.2454391679518906,"7267":-1.8299570585038873,"7268":-2.584706766381307,"7269":-1.5856441442183096,"7270":0.631205978318487,"7271":0.6957409087664428,"7272":0.8243029757375167,"7273":0.9008314214347877,"7274":-0.21038486918196034,"7275":0.48695295338167927,"7276":-0.4795906939482911,"7277":-2.565416872516314,"7278":-1.221722140780099,"7279":0.6393928055477587,"7280":-0.7234280137493522,"7281":0.3560902033762399,"7282":-0.03152177329397806,"7283":-0.19820513727874664,"7284":-0.84342177519976,"7285":-0.7016068905008821,"7286":-2.466684932286555,"7287":-1.2134813134245752,"7288":-0.2715609607609565,"7289":-1.0172569367109008,"7290":-0.04387740966394429,"7291":-1.2377118743231463,"7292":0.06830680910183075,"7293":-1.124429396196591,"7294":-0.33393734298966465,"7295":-0.6189350620900874,"7296":-2.038201947352033,"7297":-0.039793941304183594,"7298":-0.44467070571564077,"7299":0.6037618154921923,"7300":0.08833263664457307,"7301":-1.7253133614896066,"7302":-1.2477525578051716,"7303":-0.8639247662336372,"7304":0.7642416760284778,"7305":-0.09020488147936474,"7306":-0.037497323717571494,"7307":-1.0481186567159784,"7308":-0.998215595314246,"7309":1.0307496937949054,"7310":-0.7962823503681152,"7311":0.43530477522251687,"7312":-1.4569491757992659,"7313":0.24849220132666336,"7314":0.16137643854005324,"7315":-0.5872629117585327,"7316":1.1501052929105182,"7317":-0.3173253036211283,"7318":-0.25602450472755484,"7319":-1.0781148053251397,"7320":-2.6889097252866794,"7321":-1.435709488059142,"7322":-1.1467470729336948,"7323":-0.9611336218820662,"7324":-1.6192097270835766,"7325":0.19932801762027383,"7326":-0.09665043123950652,"7327":-1.582674279449363,"7328":-3.7905586868680334,"7329":-3.2333745582896527,"7330":-4.224981138883632,"7331":-3.59179809274836,"7332":-1.5374711866086117,"7333":-0.9470487057143024,"7334":0.6850789669209592,"7335":-0.42656739012825673,"7336":0.3745252636533925,"7337":2.599707113210318,"7338":1.638855399398285,"7339":5.166884516788409,"7340":0.8754219936058464,"7341":0.4972238559729221,"7342":-0.023877807273138575,"7343":-0.3940552776895396,"7344":-1.879340783505738,"7345":-1.5459675227786753,"7346":-0.8557964141400816,"7347":1.0808004425041087,"7348":1.7700665589815527,"7349":1.2417058154597798,"7350":2.283718942926288,"7351":1.6601003034477364,"7352":0.49057976587960556,"7353":0.13436155194663266,"7354":0.9680607182344818,"7355":-0.7320423755996827,"7356":1.4696507244641965,"7357":-0.4071193864688327,"7358":-0.3311693716518309,"7359":-1.5838327161645471,"7360":-1.3776487055983295,"7361":0.5112011350939755,"7362":-0.3358067905923374,"7363":-0.2646804940157089,"7364":-0.12282067456509478,"7365":-0.2372995902996791,"7366":-0.9110226658189617,"7367":0.6613942447132726,"7368":-1.3993768382327614,"7369":-2.1249116116918834,"7370":0.11838977214491499,"7371":0.25710909784499336,"7372":-3.152523910874824,"7373":-0.5243914812830992,"7374":0.28433223658603435,"7375":0.7208460260358192,"7376":0.7264118922511885,"7377":-0.7703154436326967,"7378":-1.364673812182526,"7379":0.08765238966493616,"7380":1.753404278169631,"7381":0.6423638884441973,"7382":1.4877877089590579,"7383":1.6115883868857896,"7384":-0.5762807749571933,"7385":-0.6711391014815417,"7386":-0.19141689261867012,"7387":-0.45116694662863843,"7388":0.2480604070550952,"7389":-1.543667644404359,"7390":0.1867975015200372,"7391":0.06173021068533924,"7392":-0.6318925226663905,"7393":-0.056970263555581546,"7394":0.3905487597430739,"7395":-0.08354323053127287,"7396":-0.41484192182409596,"7397":1.3301624666372174,"7398":-0.21183476487376693,"7399":0.39853109635376843,"7400":-0.1961879722469763,"7401":0.807766188241618,"7402":-0.32629062020523286,"7403":-0.5612180277650687,"7404":0.23855347108598454,"7405":-0.43499692712752924,"7406":1.5469354453998863,"7407":0.4227979940991982,"7408":-0.17755432065222057,"7409":0.3404300287473127,"7410":1.3246396889363032,"7411":0.876651428539798,"7412":-0.4078043467811989,"7413":-0.6689748008436317,"7414":-1.983349793999974,"7415":2.0749526212883733,"7416":-1.6923509525401208,"7417":0.9458653140116087,"7418":-1.2971284051677041,"7419":-0.7082656979266954,"7420":-10.239730665769917,"7421":-5.739782692401156,"7422":-4.539948800692592,"7423":-2.031790385287373,"7424":-1.585088535315835,"7425":-0.45792596581552014,"7426":1.002771590235522,"7427":0.17597458120928414,"7428":2.641890598733821,"7429":0.9463365546238562,"7430":-1.2959246010849397,"7431":-2.2855558664022286,"7432":-2.0798238586477247,"7433":-0.5194145966947792,"7434":0.016790044961712356,"7435":-0.33249101913064927,"7436":0.8033332164535011,"7437":-1.132923333388697,"7438":0.9987008476072795,"7439":0.15116513694961944,"7440":0.6449838070804698,"7441":0.494540193869,"7442":1.2810503603059287,"7443":1.3583108476253314,"7444":0.5943323420688222,"7445":-0.803695744252242,"7446":0.8968738346881951,"7447":-0.16512056358615643,"7448":-2.0015007928450683,"7449":-0.49072365311431404,"7450":2.5634879229011998,"7451":-0.636303806256629,"7452":-0.0052792978394453445,"7453":-0.4728659046693494,"7454":0.6167702595719681,"7455":1.0304151833111819,"7456":-0.277795495444742,"7457":0.7942820326036485,"7458":0.07976392311449682,"7459":-0.44051568441816624,"7460":-0.46613264097786694,"7461":-0.3833456426225916,"7462":0.6786025379823221,"7463":0.15818032108742586,"7464":-0.48681996835096136,"7465":-0.23310892799773508,"7466":-0.4364239332285833,"7467":-0.6986013046937088,"7468":0.16382440323062278,"7469":-0.26230509884714354,"7470":-0.4149519406224,"7471":-0.7943239118749483,"7472":-0.28476611490621107,"7473":0.4783765245096804,"7474":-0.09080224266522408,"7475":-1.3948687795193828,"7476":-0.014562318831248816,"7477":-0.29586929630987113,"7478":-0.7476298279704856,"7479":-0.12013165655489122,"7480":0.06332205888927939,"7481":-0.655122188647601,"7482":-0.2099030290291297,"7483":0.11814931904338882,"7484":-0.05288632905900515,"7485":0.17047283989155043,"7486":0.7369220315646577,"7487":0.3168618925849481,"7488":0.06601606114361169,"7489":-0.8300070146321653,"7490":-1.241409681550234,"7491":-0.16682052491984373,"7492":-0.29047531279651945,"7493":5.918227365537161,"7494":0.48690082924285477,"7495":-0.35245550829428557,"7496":-0.3623047546224503,"7497":0.15226100019471814,"7498":-1.1700273924608544,"7499":-0.7072712065972269,"7500":0.6276529766858003,"7501":1.574622300028855,"7502":-1.6017313372330084,"7503":6.199979462422871,"7504":-0.17118944450577386,"7505":-0.6714369862278061,"7506":0.34735806890702575,"7507":-0.22439433361754035,"7508":-0.7111834550131404,"7509":-0.31693488261274,"7510":0.2037200318339376,"7511":3.1471000813765935,"7512":0.7607776903936153,"7513":0.6032524813224891,"7514":0.6909435678653651,"7515":0.6775170720793864,"7516":0.13467497437062456,"7517":-0.13961779337377148,"7518":-0.9356289860063255,"7519":-0.36739469590968266,"7520":0.36485258300139745,"7521":-0.5783256339880589,"7522":0.451855100130437,"7523":0.2521141352408412,"7524":0.13751112158232115,"7525":-0.3407969059966821,"7526":0.8727924176467542,"7527":0.09245677028253259,"7528":-0.8630643610306782,"7529":-0.7604513465673473,"7530":1.1298516527607714,"7531":-0.21520329594855803,"7532":0.021571226324301484,"7533":0.3703282418932845,"7534":0.41607225228489614,"7535":-0.8815542253367683,"7536":0.11982209500746789,"7537":-0.8702042966141122,"7538":-0.42956483805810286,"7539":-0.441237447368593,"7540":0.3952809166400817,"7541":-1.0327764321030797,"7542":-0.8872798121646284,"7543":-0.1849712384133391,"7544":-0.42743864725533176,"7545":0.35976178785154844,"7546":0.6832729034194094,"7547":1.2346148891549606,"7548":0.744700876270084,"7549":0.46385163261953705,"7550":0.7552777168720458,"7551":0.055171191612664275,"7552":0.6781086673300276,"7553":-0.11456305894465742,"7554":0.17797873438550854,"7555":-0.3648141149506894,"7556":1.8659853791108438,"7557":-0.2802387258338924,"7558":1.1212892851026526,"7559":1.161389928594648,"7560":-0.13579490848519565,"7561":0.10163039991686536,"7562":-0.39681656628147643,"7563":-0.9377637311146063,"7564":0.04439008972411041,"7565":0.5526265081099137,"7566":0.7578703971336024,"7567":0.28548627566099194,"7568":-0.4369666743883376,"7569":0.5029616813606791,"7570":0.8523157571830893,"7571":0.6526014927633403,"7572":-0.7779346609704831,"7573":-1.9591453730135284,"7574":0.9486531431140742,"7575":1.1995937705318314,"7576":0.24735526046460599,"7577":0.7495857878214733,"7578":-1.7472629106403008,"7579":0.41365012680578955,"7580":0.9848362232192035,"7581":-0.02106880537584966,"7582":-0.42302935476674364,"7583":1.9906987471510393,"7584":-0.09092100999652032,"7585":-0.3014159633421432,"7586":0.3660551311276865,"7587":0.16245505055456924,"7588":0.053817836484602234,"7589":1.3374690764802037,"7590":1.7978135573486644,"7591":-15.052262540611904,"7592":0.704001016527164,"7593":1.0371911506781486,"7594":0.13692633032263105,"7595":0.017495067816962192,"7596":0.689936591397343,"7597":-0.7504679019594123,"7598":-0.7870022252848901,"7599":0.300667363704113,"7600":-0.3261947002275354,"7601":1.5160656285691976,"7602":0.36483355813184093,"7603":-0.30740800872022084,"7604":-0.1735641213146863,"7605":0.6752692187449998,"7606":1.15028442078508,"7607":1.3572048640488386,"7608":-0.18442744531751776,"7609":0.3189787124647172,"7610":0.8359421427838628,"7611":0.6951915295523107,"7612":-0.04761020817209916,"7613":0.36960748728576187,"7614":-0.17319974144683262,"7615":0.703816467120044,"7616":-0.41535054356718853,"7617":0.16037696841040847,"7618":0.9666005341300258,"7619":1.5524126547959611,"7620":-0.3143691653300655,"7621":-0.24123414469657314,"7622":-0.2918276619038552,"7623":0.14477877101873096,"7624":-0.701833721041965,"7625":-0.5413708738064437,"7626":-0.610349244544901,"7627":0.24871029774400422,"7628":1.2598194151455784,"7629":1.5736020385731833,"7630":0.8843099885105903,"7631":1.530743545709773,"7632":1.8569358947742285,"7633":-0.4922228888082693,"7634":0.9883741536165792,"7635":0.9648956323613562,"7636":-1.0595068206386704,"7637":0.4905726327258845,"7638":-1.3681389782945803,"7639":-1.2853994996765383,"7640":-0.42099315232725965,"7641":0.5430244430467388,"7642":-0.28334986646566707,"7643":1.0738043508949469,"7644":-1.8186145748333256,"7645":-0.8445397281117192,"7646":-0.4741937470348517,"7647":0.27808047396264957,"7648":0.5621817612877265,"7649":-0.8636127534786929,"7650":0.47534679368291494,"7651":0.2982237509686778,"7652":0.1796271883890243,"7653":-1.2470050609283083,"7654":-1.2333133252001347,"7655":-0.20686077391946311,"7656":0.8981537779180255,"7657":3.0241461269841294,"7658":1.9176433429710809,"7659":3.364024378013718,"7660":0.6637974235905246,"7661":3.3646621489592823,"7662":-0.8194616114098824,"7663":-0.7286136034220403,"7664":-0.05900885198632775,"7665":1.0899818952765994,"7666":-1.1214828021323489,"7667":1.9280216039113387,"7668":2.138538415510733,"7669":-0.04220028748121529,"7670":3.0510616350441415,"7671":-0.32316010015479024,"7672":-0.44918087428796866,"7673":1.5254385803162465,"7674":-1.6636564522543242,"7675":-2.6911778708840077,"7676":-1.8904598623512838,"7677":1.0123585145208696,"7678":-2.1867978262781205,"7679":0.372980469498577,"7680":0.6433742410878212,"7681":0.9251941803152715,"7682":0.734761336959064,"7683":0.6760109999402119,"7684":0.7981324898996469,"7685":2.6811651415579805,"7686":2.5851994757730092,"7687":-0.3934031613968947,"7688":0.17898825336420096,"7689":2.6754512709302367,"7690":-0.25062138501928893,"7691":-0.7582190218336589,"7692":-0.04664236480039002,"7693":-0.09209821895253363,"7694":-0.7570196999364468,"7695":-0.16824622742984158,"7696":-1.0634888333661396,"7697":-0.09180599534063913,"7698":-1.4028820957036314,"7699":-0.4286411318429356,"7700":-1.6613577918111195,"7701":2.259590040686305,"7702":0.20786105810767766,"7703":1.300914498952845,"7704":2.687432494250098,"7705":0.684212523851993,"7706":1.0350989439614957,"7707":0.588514001029381,"7708":0.42984194498022954,"7709":0.03970503571528373,"7710":0.11669343166034024,"7711":0.1452510452880086,"7712":-0.5050530650901534,"7713":0.44528726211634356,"7714":0.2498072776901377,"7715":0.7666358868936851,"7716":0.49048380597788627,"7717":-0.5421422249791992,"7718":0.6805786579266224,"7719":1.0360609835126484,"7720":0.5409924506039582,"7721":-0.818605449763426,"7722":-0.09574448934603233,"7723":-0.14569497213802454,"7724":0.0022634707799309276,"7725":-0.48916701770298576,"7726":0.31644146061721806,"7727":-0.04094418542998002,"7728":-0.24403844347981635,"7729":0.48727992630108496,"7730":-0.14516105379664912,"7731":0.23613857386638273,"7732":0.44722247158828915,"7733":-0.5221493837762317,"7734":-0.443309928193469,"7735":0.4669015248294417,"7736":-0.040816727095460886,"7737":0.26662694437388085,"7738":-0.5022838550488571,"7739":-0.17942270043037675,"7740":-0.5217816170094506,"7741":-0.05985124794381561,"7742":-0.24999109672468908,"7743":-0.36854050183861714,"7744":-0.23520586070592284,"7745":-0.42186213734202344,"7746":-0.5385494145936986,"7747":-2.272649269253817,"7748":0.04137915425554628,"7749":-0.09391118541195881,"7750":1.0538721169071241,"7751":-0.3949795819622974,"7752":0.7406907629558313,"7753":-0.37905811751388613,"7754":0.30184538160211155,"7755":-1.792173855159365,"7756":-9.051620031324806,"7757":0.22505266374152558,"7758":0.9879162751896737,"7759":0.46524953157855775,"7760":0.49958601977249967,"7761":0.35261317501777084,"7762":-0.3326581769061699,"7763":0.09520281710178888,"7764":-5.23760203232474,"7765":-2.6674437702697804,"7766":-0.8572808474485835,"7767":0.9892344877829548,"7768":-0.8384874618124191,"7769":0.20334915378082807,"7770":-0.18520357766463047,"7771":0.11583631059726938,"7772":0.5211284727383937,"7773":-0.26301560831234605,"7774":0.015688705547668626,"7775":-0.6455794804573751,"7776":-0.7277781156606126,"7777":0.17767913002145208,"7778":0.3195679441438899,"7779":0.33958983244321844,"7780":-0.15639812616578327,"7781":0.4030781033082387,"7782":-0.06915638426384589,"7783":0.06931831925914164,"7784":0.08002131071689433,"7785":0.4793067393609208,"7786":0.0790187148690723,"7787":-0.021341500335222866,"7788":-0.2885943782003729,"7789":1.027101951084438,"7790":0.4355092099895468,"7791":-0.614491471351607,"7792":0.2980049649929217,"7793":0.12061575531984697,"7794":-0.1769367640270227,"7795":-1.4405335886000834,"7796":0.32205055441785757,"7797":1.3142801920706648,"7798":1.1729088242553243,"7799":0.17865254845770767,"7800":-0.0665471630268626,"7801":-0.7898502225885768,"7802":-1.5423287802910002,"7803":-1.2399687569486717,"7804":0.7498211111509534,"7805":-0.3154694399892591,"7806":0.6999406925642213,"7807":-2.1258068868991353,"7808":0.2061320297666078,"7809":0.09614908077880958,"7810":-0.4826731466352975,"7811":0.051683901887905705,"7812":0.5907595524145732,"7813":-0.16737460645941796,"7814":0.7019303352719296,"7815":0.7701475698263253,"7816":-1.1873951828791722,"7817":1.0985804485622803,"7818":0.9782542400554126,"7819":0.7369492801779886,"7820":0.5700707090727705,"7821":0.47786002656916005,"7822":0.8588312127062117,"7823":1.2486657954800202,"7824":0.07219543187514448,"7825":-1.6200167222858948,"7826":-0.24851674034449295,"7827":0.14904450039797348,"7828":-0.4373394852733774,"7829":-2.7801495232937503,"7830":-8.339283129260773,"7831":-9.749683349956884,"7832":-5.768453784704118,"7833":-3.7916767494532206,"7834":0.03872920954176398,"7835":-0.6676538752939053,"7836":-1.4949296064010313,"7837":0.12887974641495875,"7838":-0.3045034204694898,"7839":3.9917127222454547,"7840":0.9724099952876233,"7841":1.1947069145026925,"7842":0.3859294037794676,"7843":-2.159282804610271,"7844":0.4083900279838109,"7845":0.20915625595803125,"7846":1.2102123901173094,"7847":-0.3696427105794101,"7848":0.9576110591936007,"7849":-0.17018044874108695,"7850":0.034755855227343035,"7851":2.078664362976483,"7852":0.8603942417368412,"7853":0.9201694337414957,"7854":-1.460151554378832,"7855":0.2212093139571535,"7856":0.8538144742830532,"7857":-0.47013873272755835,"7858":0.6224564548779604,"7859":-0.5357289261047073,"7860":0.03059242498451008,"7861":-0.04642880529839524,"7862":0.8320252643251049,"7863":0.2187103687923251,"7864":0.29487493100082585,"7865":0.19652054943988156,"7866":0.5580754312844519,"7867":-0.5386680428050786,"7868":-0.9337711291054267,"7869":-0.446467498052678,"7870":-0.7538132245765613,"7871":-0.7971539348588095,"7872":-1.2364934113479409,"7873":2.451441758033129,"7874":1.4194202527581405,"7875":-0.1454193908546421,"7876":0.2965577819233184,"7877":0.6524472500068932,"7878":-0.33972867942311336,"7879":-0.12231471132236676,"7880":0.4340257986346281,"7881":-1.3982022931321025,"7882":-1.004373667228776,"7883":-0.5384160666283322,"7884":0.5420389205174061,"7885":0.6877230844781864,"7886":0.27820124673133123,"7887":-1.0934838752472607,"7888":-1.2781270048551887,"7889":0.5704358927541429,"7890":0.05506207522299018,"7891":0.6329766879430887,"7892":-1.0497695315796458,"7893":-1.001900735007446,"7894":0.7270632900355273,"7895":-0.4659087242501661,"7896":0.46757505759977197,"7897":1.0625403551636292,"7898":0.7797326037368171,"7899":0.8765591808491312,"7900":-0.7969074552750356,"7901":-0.33836077896010175,"7902":1.758798525815511,"7903":-0.3308892451807483,"7904":0.21163598826031751,"7905":0.3212280745766549,"7906":0.20457744657748048,"7907":-1.2686273521838443,"7908":0.818617643153658,"7909":-0.6544573730464661,"7910":0.01605260473233242,"7911":0.9781546646814844,"7912":9.375571797770752,"7913":-1.5664279487524746,"7914":-0.11667905476511026,"7915":-0.9310437647799932,"7916":-1.8949760533518976,"7917":0.9096635596936511,"7918":-0.35882541346507985,"7919":0.7806050678181504,"7920":1.8548876536557712,"7921":1.7861815435097292,"7922":0.29257235919081637,"7923":-0.7305599874861219,"7924":0.552064015839609,"7925":-0.2523331009033384,"7926":0.035350096722414646,"7927":0.7644711420573048,"7928":-2.2547264696228617,"7929":1.9771475881582978,"7930":0.6338094558372317,"7931":0.8782538227491926,"7932":-0.9467674953250891,"7933":1.160149541624081,"7934":-1.2192517281546151,"7935":-0.8588016771019903,"7936":-0.9445248948492891,"7937":-0.9079354698318842,"7938":0.2353214256092059,"7939":-0.8106974752481801,"7940":0.2902605963273837,"7941":0.018768260570145974,"7942":0.8748513523292076,"7943":0.7375026629143845,"7944":-1.7008008942613349,"7945":0.9565635742731269,"7946":-0.6183931238528763,"7947":-1.1432333738718905,"7948":-0.832148304375997,"7949":-0.6091568468378472,"7950":-1.5479038421249927,"7951":1.6436154817103203,"7952":-0.5685977905929251,"7953":-1.425302130423059,"7954":-1.2439492850224212,"7955":0.6363361645942933,"7956":0.11254334943036759,"7957":0.18775053683332804,"7958":-0.2672326732097453,"7959":-1.0138756657053005,"7960":0.1697873503115799,"7961":-0.70744588138063,"7962":1.4152165219787105,"7963":1.1903016906236747,"7964":0.011973351578985174,"7965":0.39554368515379035,"7966":-0.34070170490391843,"7967":0.5376244632846563,"7968":0.8876176361846363,"7969":0.8050670970095891,"7970":0.30130739372461673,"7971":0.6401728966634999,"7972":0.654750898849445,"7973":0.4276872097715655,"7974":0.363455443359481,"7975":0.37519059972726687,"7976":0.14845510472524773,"7977":0.9475737472808626,"7978":0.9708110737778582,"7979":0.38210133682495107,"7980":-0.2587740589972552,"7981":-1.284623214207504,"7982":0.26846778983640585,"7983":2.3713238312153173,"7984":-0.04028388172984466,"7985":0.5112187632379148,"7986":1.0849860619333507,"7987":0.1926635377479702,"7988":-0.5665012236010625,"7989":1.5453159331023865,"7990":2.2676128789796777,"7991":-6.798572066043605,"7992":-2.846980093730137,"7993":4.195221621015453,"7994":-0.19199890435216221,"7995":0.08388412653295851,"7996":-1.9772244285268494,"7997":-0.9439330184328566,"7998":2.0490089186388443,"7999":-0.9662448140488064,"8000":0.9735202841820145,"8001":0.3559473862606348,"8002":0.4938158488785712,"8003":3.113598385522712,"8004":1.1417811633999444,"8005":-0.8424081823982323,"8006":-1.1026831416790046,"8007":0.8524322740809851,"8008":0.2610922992304602,"8009":-0.7914654000014956,"8010":-0.2172588065160611,"8011":1.210460356039158,"8012":1.5150170909867593,"8013":-0.7510409407560006,"8014":-2.0310061876277063,"8015":-0.7968099830219997,"8016":-0.6993700051741428,"8017":-0.0378218648594895,"8018":1.8686163489282324,"8019":0.9367587414154391,"8020":0.15371920554538313,"8021":-0.10542392063097059,"8022":1.0762822758127177,"8023":-0.2961768541816915,"8024":0.9371650287857798,"8025":0.7397317375266348,"8026":-0.4295218144274534,"8027":1.359542996755011,"8028":0.5788235538818657,"8029":-0.08103784853829447,"8030":-0.12931470693486857,"8031":1.3541713483080295,"8032":0.5738597659074142,"8033":0.5540373250729342,"8034":0.26489530814340995,"8035":-0.9509700169476938,"8036":0.24643491999886824,"8037":-0.26466794165459906,"8038":0.3799254427654444,"8039":-1.2656343705368656,"8040":-0.003538515937044054,"8041":-1.6237476558936002,"8042":-0.3004036327095079,"8043":1.2206620824092151,"8044":-0.5578414177785861,"8045":-0.3323219324655415,"8046":1.0935929123128427,"8047":0.1150474366652105,"8048":0.7186707583251272,"8049":-0.7074468990125163,"8050":0.45405731703800384,"8051":-0.29724102442915695,"8052":0.41367959699101486,"8053":-0.7340151076989365,"8054":0.06409337468529533,"8055":-0.6365728708129926,"8056":1.3121849033898696,"8057":0.5881623899870978,"8058":-0.6120280357150586,"8059":-0.5486174165730854,"8060":0.5903380832547297,"8061":0.37767858989678904,"8062":-0.6006422198206504,"8063":0.28381064630552566,"8064":-1.4729629984930934,"8065":-0.5853932236335126,"8066":-0.2265927017869035,"8067":-0.8475611129445009,"8068":-0.001375779121380611,"8069":0.9908693515144733,"8070":0.2999126289512692,"8071":0.9561362185283284,"8072":0.819063179853646,"8073":-0.019274072340849022,"8074":-2.4102237290696755,"8075":-4.277773714991458,"8076":-1.507597095082475,"8077":-1.112966576539061,"8078":-0.5700993292335937,"8079":-0.403763959037469,"8080":-0.33879416615234914,"8081":-0.09046538488595664,"8082":1.8349571433328136,"8083":2.140333105775561,"8084":7.775288414717225,"8085":6.575111967410153,"8086":2.4177732528609077,"8087":1.2572249922881706,"8088":1.6498789078328593,"8089":0.05347174963095063,"8090":-0.28241160347157446,"8091":1.7463710818743445,"8092":0.0308088227917695,"8093":4.621601796597174,"8094":2.4177333399796517,"8095":2.1729398081357303,"8096":-1.2859890160529728,"8097":-0.2996841497717149,"8098":-0.660997143150373,"8099":-1.746310048972156,"8100":-0.570894581739963,"8101":0.07705314434701256,"8102":-0.9658887567773966,"8103":0.07125492775818158,"8104":0.61695451267819,"8105":0.09020423544284462,"8106":-1.4861852516040124,"8107":0.787686329060087,"8108":0.032259732757276983,"8109":0.5310998430515917,"8110":0.042750160142907084,"8111":0.4299518299273205,"8112":-0.8781576172162704,"8113":0.4802588178468939,"8114":-0.7847835084843872,"8115":-0.9449127214746452,"8116":-0.19842237645471789,"8117":-0.8364596408203309,"8118":1.0837735924944454,"8119":1.072575656807881,"8120":-0.12815379372784258,"8121":0.3465408159708841,"8122":-0.518803514119714,"8123":0.014185467689010916,"8124":1.189594023936036,"8125":0.8365595760470433,"8126":0.9732819084002654,"8127":-1.3013680340710534,"8128":-0.711390345650389,"8129":2.1478065349629043,"8130":-0.14407022059234054,"8131":-2.413480390337421,"8132":0.011782711537537141,"8133":-0.7041334990176269,"8134":-0.03222911240848033,"8135":-0.6157640501382315,"8136":0.7750403414058706,"8137":0.9257448346488294,"8138":0.42822265624925937,"8139":0.46627315511165407,"8140":-0.40459662565375465,"8141":0.3784278274806254,"8142":0.16086968191787035,"8143":1.1566155101146491,"8144":1.3017157756646207,"8145":1.0481063282440757,"8146":-0.3343905929803515,"8147":0.5429642698219809,"8148":-1.610708513605385,"8149":-1.0491188407160046,"8150":-0.19966064409674572,"8151":1.1435051846772726,"8152":0.27289705094964356,"8153":0.7687304977980793,"8154":-1.0588148630990684,"8155":-0.19993476266847213,"8156":-0.35624386922105084,"8157":-2.549176328851291,"8158":-7.8239166560077775,"8159":-1.8554748510733803,"8160":-0.0638185991752735,"8161":-0.11306877871350404,"8162":0.9769762162265611,"8163":0.8752046002166175,"8164":-1.577165599440086,"8165":1.618287434882536,"8166":-0.40437301190506997,"8167":-1.076357045395056,"8168":-1.5707394426914563,"8169":-1.3231321658348132,"8170":2.210953240655182,"8171":1.3560575495689817,"8172":1.501820148762483,"8173":0.8254693557808184,"8174":-2.3182594268669745,"8175":0.9090612783294173,"8176":-1.2305900788182826,"8177":0.06757104412044411,"8178":0.9730765691300652,"8179":1.3624343001739627,"8180":0.11270289449128079,"8181":-0.2726319822222816,"8182":-0.2442095472869084,"8183":-0.3217045368711784,"8184":-0.5520465300780092,"8185":-1.0745568472057867,"8186":0.27024628878425233,"8187":0.3025423872689258,"8188":-0.6880465465918697,"8189":-0.5272548062107356,"8190":0.8406654874866173,"8191":-2.113663982001779,"8192":-1.071325733804893,"8193":0.5601700523122726,"8194":0.7860927881274443,"8195":-1.2531996783913244,"8196":-0.27169815445632617,"8197":-0.2875865017738677,"8198":-0.0038908285562249782,"8199":1.1856728590774976}},"b1":{"n":100,"d":1,"w":{"0":-0.19710288881463583,"1":0.8692057024360407,"2":1.4041697609580785,"3":5.732045262792069,"4":-1.68166736601281,"5":4.076438780894615,"6":-5.427417312483684,"7":-1.26667038216725,"8":-2.4838459453120514,"9":-12.548164248359432,"10":2.2648706253897144,"11":-1.397671287089417,"12":2.666319913157676,"13":1.633642159850857,"14":1.5423198667998328,"15":2.4842764122948444,"16":0.9926112808007999,"17":1.171599791751963,"18":0.7932689999540953,"19":6.813677902564745,"20":5.8030674791030155,"21":0.25057519592781546,"22":1.1129577638770416,"23":-1.8468544644350715,"24":1.3289415848356416,"25":-3.144549796286984,"26":1.9824511714950492,"27":-2.5974564355468184,"28":-3.287571558083872,"29":-0.11649217628467631,"30":-4.909513231375683,"31":-2.7431239784707073,"32":-7.504044660748343,"33":-2.7729134693678104,"34":1.9586497707406243,"35":-17.427344880117417,"36":1.5899721006627219,"37":2.9091160895803245,"38":-4.054661580532213,"39":-0.713978796660431,"40":-2.968402846845754,"41":12.462527782708904,"42":3.4026355171521607,"43":0.4255842621669437,"44":3.8803843280378842,"45":-0.1938199200919777,"46":-2.819611975810686,"47":-0.3399919702522561,"48":-3.623533455563202,"49":-4.145084207504505,"50":0.687933346649028,"51":0.8520121979543784,"52":6.890552243488069,"53":-4.161901831142676,"54":2.5179464075654976,"55":-1.2057387008698022,"56":-2.3789245396020915,"57":-0.20558295644334018,"58":4.0063686490533295,"59":-3.5617600945200203,"60":-0.8888388100217868,"61":-1.6295752007916129,"62":-3.8956327951754806,"63":-1.8228794798696486,"64":-3.295121862891529,"65":-1.243602989780937,"66":-0.23972143866895468,"67":1.0759741409323258,"68":-0.018040720065220943,"69":-0.3486403579026024,"70":1.8740242549329824,"71":-4.0155451133120685,"72":-3.6378352111358927,"73":-0.0028606357662863302,"74":5.541955016918162,"75":3.5581033617588527,"76":-0.7507274769576094,"77":-9.133131914329464,"78":-2.7996302894867493,"79":-4.308727093054187,"80":-4.515428724612113,"81":1.2031695024417357,"82":-3.9070052668563213,"83":0.3736927395327794,"84":0.8825111145679608,"85":-1.4106112597413365,"86":-0.8286801712898753,"87":-0.3700776944178883,"88":4.513981126953851,"89":1.6108237947990647,"90":2.9788732871439096,"91":-8.059917416475276,"92":1.0736356586046991,"93":-3.8311883487400324,"94":10.524407545280242,"95":0.16817564282390493,"96":-7.44822757903897,"97":-0.3694557937813893,"98":-3.339265661754164,"99":4.747073133122075}},"W2":{"n":4,"d":100,"w":{"0":0.6390028010853883,"1":0.17200891422014716,"2":-0.5696156779870823,"3":0.2802921667822065,"4":1.03407901377647,"5":-0.3120935894797839,"6":0.851463958693459,"7":0.38363519491815634,"8":1.222739008414924,"9":-0.299169604181898,"10":0.43562652707252136,"11":0.5606301314327108,"12":6.0889669764279315,"13":-0.12393720846061944,"14":0.7516109066949619,"15":0.09945004391436796,"16":2.273705486587189,"17":2.1713154923979574,"18":0.7573579511847424,"19":-1.1449607649453746,"20":0.17964356956871222,"21":0.1568239158268518,"22":1.0420974591733574,"23":-0.0916638176151415,"24":-0.297637510152257,"25":-0.14830766866652942,"26":-0.4519495595491639,"27":-0.12971624113798788,"28":-0.33992671691890763,"29":0.14204921663502262,"30":0.5099557630569748,"31":-0.19118225503187697,"32":-0.2490182378228371,"33":-3.8767055038179814,"34":0.3112413139097122,"35":-0.09974717595668099,"36":0.8087707297663514,"37":0.6812444840603896,"38":-0.42676198298839446,"39":-1.4820989330588916,"40":0.08342650218938298,"41":0.296732388992441,"42":-0.5400313923029584,"43":0.5733051820169416,"44":0.36673438665025243,"45":-0.19672587537684386,"46":0.5511371723537217,"47":-0.5374174678429723,"48":-0.6289712480403373,"49":-0.5474270744228829,"50":-0.13690408169426205,"51":0.6924855676332553,"52":0.05510020931721654,"53":-0.3061998103761565,"54":0.5300099845937779,"55":-0.18011067042493473,"56":-0.4582578433004298,"57":-0.5831332086250091,"58":0.19405714690117762,"59":-0.27529662633357965,"60":0.22683263704713072,"61":3.080011733292833,"62":-0.3461163254018468,"63":-1.7801963609932987,"64":1.043446972512029,"65":-0.034884839356682504,"66":-0.06146283023400345,"67":-0.08394837183504952,"68":0.2678097240465253,"69":-0.5556726313760021,"70":0.5677691625873879,"71":-0.009184818476981781,"72":0.22108809406213836,"73":-2.972991472562823,"74":-0.7713017504168033,"75":0.38927991690876096,"76":-0.041196396367698125,"77":-0.9837523484495653,"78":-0.15095699955422942,"79":-0.27476499048223085,"80":-0.6062735185542857,"81":-2.09147731869851,"82":-1.3069034533919337,"83":-1.3871897531787694,"84":-0.22643799501518252,"85":-0.4091637308098818,"86":-0.6187463576344092,"87":0.7720792996031898,"88":-0.4586414215311389,"89":0.7225061521052882,"90":-0.013612497229731268,"91":0.44097035067846163,"92":-1.1205335514219825,"93":-0.6048035489850555,"94":-0.49283462253475857,"95":0.5614225618754133,"96":0.06639592353290506,"97":1.4128196906014945,"98":-1.011846748308441,"99":0.7536011141504522,"100":0.23421401260186045,"101":0.22664234529101138,"102":-0.29149274399628594,"103":0.09179912870620775,"104":0.4693732946493734,"105":-1.3923103643377113,"106":0.07304190401396468,"107":-1.967762377695586,"108":0.25183416208908316,"109":-2.8865526970056115,"110":0.09429523648783435,"111":0.25487046430142607,"112":-0.5982323681485389,"113":-0.5420151184245072,"114":-0.21850904912165703,"115":0.9649071479624418,"116":0.3852543430449239,"117":2.622351913977088,"118":2.9710958213023724,"119":0.20322558438630253,"120":-0.3387989800148192,"121":-0.4096655615185247,"122":-0.03885328617094312,"123":-0.32381757060814015,"124":0.4232874876966533,"125":-0.16375417546723642,"126":0.3943411322221665,"127":-0.14652216966449597,"128":-0.9024967753739674,"129":-1.295966182499988,"130":0.3376011445353576,"131":-0.8070372842242444,"132":-0.5676528944367448,"133":-1.435483198699394,"134":6.870638263330795,"135":-0.16677584605099566,"136":1.747423958377133,"137":0.12764908420735663,"138":-0.5824074511525626,"139":-1.8455907651863548,"140":-0.6038658643894768,"141":0.3018012495490874,"142":-1.4211299524007246,"143":0.869746475822385,"144":0.22126539380526714,"145":-0.5955209764982656,"146":0.34847336807769064,"147":0.5027886878562735,"148":0.6663352928482978,"149":0.0720691963469074,"150":0.5415830889801048,"151":0.5294926261678158,"152":0.223152256392945,"153":0.6325774234511915,"154":0.24662962399932922,"155":0.6967322204368652,"156":-0.10475705897330118,"157":0.22572503395208035,"158":0.18453018635984797,"159":0.5738815304680127,"160":0.6301312990083219,"161":-3.3787556346692162,"162":1.315012921874991,"163":-1.0067285997860183,"164":0.5379468344363617,"165":-0.9105890860850263,"166":0.5482054675976705,"167":0.02007542092976776,"168":0.14223479536509628,"169":0.11011958978756439,"170":-0.030792234970826136,"171":-0.682236865764773,"172":-0.19412973012646983,"173":-0.6103471081306601,"174":0.1931901322572065,"175":-0.19155467248840852,"176":-0.7765982020055215,"177":-1.2643477344008098,"178":0.19982534703706617,"179":-0.09625316806066604,"180":-0.3951412166599429,"181":-2.093483901618493,"182":-3.294436105122633,"183":-1.9452778290990296,"184":0.4970959258232537,"185":0.1579310627918276,"186":-0.2945570940936758,"187":1.219241508995044,"188":-0.5378107952622981,"189":1.10891257773122,"190":0.40647067375807183,"191":0.2012836064940274,"192":-3.0685846346539303,"193":-0.17673289246420845,"194":-0.015034373752965662,"195":0.8285567120808655,"196":0.348378065404857,"197":-0.22748661478181956,"198":-0.7268957355252473,"199":-0.6089986481628757,"200":0.08456442125729861,"201":0.44222963927643905,"202":-0.7319056140654939,"203":0.47901204587465157,"204":0.7040596426621468,"205":-0.8603321599780158,"206":1.6610155138888034,"207":-3.8363527361805168,"208":-1.815223279456829,"209":-0.0792462971434165,"210":0.5478490025092427,"211":0.9675434317893261,"212":0.2996122955864635,"213":-0.2866802406129594,"214":0.26448465461685633,"215":0.3174939261873305,"216":3.9196786291954693,"217":3.0400964802375716,"218":1.4928695118119801,"219":-1.6483226785761524,"220":0.8849050278372598,"221":0.40083130378006016,"222":0.21599691233169221,"223":-0.17738133573373488,"224":0.42175153381909614,"225":-0.4276135397799562,"226":0.20466428634607517,"227":-0.42029664123875643,"228":0.38034803744012363,"229":-0.03574120325701014,"230":0.1186716266933071,"231":-0.20897097709466775,"232":-0.33089548322850326,"233":-8.50612828216331,"234":-0.11280408653821433,"235":-2.002957484218541,"236":-0.31316887226280415,"237":0.25299265959090106,"238":-0.06676467185856853,"239":-2.36772086700761,"240":-0.4092428107777677,"241":0.8180481603147318,"242":-1.3653847385661673,"243":-1.9292339220350174,"244":0.48556546305252635,"245":-0.33526442757053593,"246":0.7316351773393683,"247":-0.36623701522035684,"248":-0.1346596996814346,"249":1.2011460171118546,"250":-0.014586698159090751,"251":0.525708418385235,"252":0.37224960574418475,"253":1.1821300401786066,"254":0.31437896952378946,"255":-0.20876213792977236,"256":0.24831905486298664,"257":0.37215676691305116,"258":0.172002409854335,"259":-0.5241285030275117,"260":-0.07727759099950364,"261":-1.9351391532462547,"262":0.1618741282858981,"263":-1.176680657126823,"264":0.9959909225873651,"265":-0.5272365808205013,"266":-0.3744151309338596,"267":-0.4147371900967303,"268":0.1802048805310414,"269":0.6800912468692422,"270":0.29392910769237607,"271":0.020057991243633815,"272":-0.3824601124863614,"273":0.09559841642649365,"274":0.45442465360683915,"275":0.23533926163790392,"276":-0.571169185428388,"277":-0.7028199401737896,"278":0.32438845825585133,"279":-0.3764028046102468,"280":-0.3488927828575281,"281":1.689502147054772,"282":-1.13742038578164,"283":-2.345830856332712,"284":0.3854083152754846,"285":-0.3798199604770713,"286":-0.6517860185974281,"287":-0.5215714388479405,"288":-1.1655465555736884,"289":0.21729577821165608,"290":0.7906024956434436,"291":-0.9408527935803501,"292":-0.6820632634221674,"293":-0.4305935482981854,"294":-0.1342559617965106,"295":0.7006292738330004,"296":-0.6441782443294396,"297":-0.1958341636764568,"298":-0.3027915091171595,"299":0.35574763207042276,"300":0.38228401886703123,"301":0.327179280752683,"302":-0.17092059263141512,"303":0.4417083156273106,"304":2.5205527320146364,"305":0.08889083085322257,"306":0.4632498068586883,"307":-1.9726267648751374,"308":-1.5291510273815188,"309":0.28373348739502785,"310":-0.10494439452237218,"311":0.4965638915647675,"312":0.2767486114049379,"313":0.3868855543564791,"314":0.24163816775091737,"315":0.47605514332490045,"316":4.042780284819818,"317":1.1395055784975916,"318":1.053955925514944,"319":-0.5264585806568117,"320":-0.15034093848302485,"321":-0.5196995907761447,"322":1.892874853817686,"323":0.2810292898196098,"324":1.0069141798008827,"325":0.3353951548750181,"326":0.40003166988788397,"327":0.16559359624415568,"328":0.5602460414223576,"329":-0.4673439802170058,"330":-0.6245180794542327,"331":-0.2596875894644607,"332":-0.031044695067764902,"333":-0.5792495387036599,"334":0.22324588319015104,"335":-0.6312036934355095,"336":-0.4691335333078825,"337":0.43717249323921764,"338":0.23533115275323493,"339":-1.1889205687129318,"340":-0.09478255824426528,"341":-0.04249281341349638,"342":-0.7186623902849274,"343":-0.9782871330480772,"344":0.5103449483084406,"345":0.28336487236891184,"346":0.579862862886975,"347":0.000734486045556185,"348":-0.485950189878314,"349":0.1303187249426407,"350":0.11271065988167558,"351":0.032707280653484376,"352":-0.29059921440246067,"353":0.2785009452506583,"354":0.13365791154561074,"355":0.37648738064102166,"356":-0.4917418466011056,"357":-0.28328372998583096,"358":0.4732762370072704,"359":-0.03771613538080232,"360":-0.025977109127124746,"361":-1.0811105812479336,"362":-0.17523944190501334,"363":-0.3444824472214537,"364":0.03847565798239056,"365":0.3017550004178347,"366":-0.5276600366806702,"367":-0.3860153389204608,"368":1.0642792083158708,"369":0.49941868659734484,"370":0.44367325324013324,"371":-0.4008051742052476,"372":0.5549530573659718,"373":0.3688812766055796,"374":0.6353264823486353,"375":0.9098837351992316,"376":-0.1293097082437649,"377":-1.0248067034093222,"378":-0.9457731570083696,"379":-0.38667040088133425,"380":-0.2608424553704987,"381":-3.020382829136803,"382":-4.774276041048201,"383":-1.5233529623028421,"384":-0.4062996258594998,"385":0.008122432228907503,"386":-0.41240023490515726,"387":-0.07187506461646104,"388":-1.3443689164391661,"389":0.20811249114282263,"390":0.22769279251074204,"391":0.008268136852658802,"392":4.016575074870926,"393":-0.12361315189723436,"394":2.6449355428411354,"395":0.5850113349004438,"396":-0.5584862081694113,"397":-0.23938233138842882,"398":-0.8841213313999569,"399":0.4031540992736335}},"b2":{"n":4,"d":1,"w":{"0":-1.1948257679230943,"1":-2.1897004672132496,"2":-2.1716786387755347,"3":-0.7858098725379152}}}}
/* harmony export (immutable) */ __webpack_exports__["a"] = data;



/***/ }),
/* 31 */
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
/* 32 */
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
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__State__ = __webpack_require__(32);
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
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderer_HtmlTableRenderer__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agent_ColumnCompare__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agent_LookAheadWide__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agent_LookAheadWideAndDeep__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agent_AlwaysDown__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agent_RL_DQN_5X5TrimmedViewport_InLearningMode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agent_BarelyLookAhead__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__agent_RL_DQN_5X5TrimmedViewport_PreTrained__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__agent_RL_DQN_InLearningMode__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__agent_RL_DQN_PreTrained__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__GameRunner__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__style_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__style_css__);













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
    '\n- Gain ' + __WEBPACK_IMPORTED_MODULE_10__environment__["a" /* config */].verticalDeltaScore + ' points for every row lower you go' +
    '\n- Loose ' + __WEBPACK_IMPORTED_MODULE_10__environment__["a" /* config */].verticalDeltaScore + ' points for every row higher you go' +
    '\n- Loose ' + -__WEBPACK_IMPORTED_MODULE_10__environment__["a" /* config */].tileValueMap[1] + ' points when moving into a red square' +
    '\n- Loose ' + -__WEBPACK_IMPORTED_MODULE_10__environment__["a" /* config */].tileValueMap[0] + ' points when moving into a grey square' +
    '</pre>';
const scoreElement = document.getElementById('score');

let enableRendering = true;
let autoPlay = true;
let speed = 250;
let intervalReference = null;
let agent;
let currentAgentName;
let renderer = new __WEBPACK_IMPORTED_MODULE_0__renderer_HtmlTableRenderer__["a" /* default */](document.getElementById('rendererContainer'));

let gameRunner = new __WEBPACK_IMPORTED_MODULE_11__GameRunner__["a" /* default */](renderer, handleGameRunnerStatusChange);

let agents = {
    'RL_DQN_PreTrained - ranked 192': __WEBPACK_IMPORTED_MODULE_9__agent_RL_DQN_PreTrained__["a" /* default */],
    'RL_DQN_InLearningMode': __WEBPACK_IMPORTED_MODULE_8__agent_RL_DQN_InLearningMode__["a" /* default */],
    'RL_DQN_5X5TrimmedViewport_PreTrained - ranked 192': __WEBPACK_IMPORTED_MODULE_7__agent_RL_DQN_5X5TrimmedViewport_PreTrained__["a" /* default */],
    'RL_DQN_5X5TrimmedViewport_InLearningMode': __WEBPACK_IMPORTED_MODULE_5__agent_RL_DQN_5X5TrimmedViewport_InLearningMode__["a" /* default */],
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