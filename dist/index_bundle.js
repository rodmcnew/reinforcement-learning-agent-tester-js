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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__neural_network_saves_view_port_9_9_0_2_games_10000__ = __webpack_require__(30);




const actions = ['w', 'a', 's', 'd'];

const numberOfStates = __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize[0] * __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize[1] + 1;

let rlDqn = new __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__["a" /* default */](true, numberOfStates, __WEBPACK_IMPORTED_MODULE_3__neural_network_saves_view_port_9_9_0_2_games_10000__["a" /* data */]);

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
{"nh":100,"ns":82,"na":4,"net":{"W1":{"n":100,"d":82,"w":{"0":-1.1732586720851927,"1":0.9402095596064672,"2":-0.5117818861280319,"3":-0.2937577348002691,"4":-0.3653543610381633,"5":-0.8642295569877178,"6":-2.6280152823534237,"7":-0.5037162871892069,"8":-1.0723312534231682,"9":-0.7737114126445588,"10":-0.7591801129787623,"11":-0.3227591321301659,"12":2.480503624525177,"13":-0.3192030300829237,"14":2.081825835312433,"15":-0.9810249455481338,"16":-2.1363308607321043,"17":-1.1394134216946745,"18":-1.7648998671669576,"19":-0.08247674594661587,"20":1.3139390252856589,"21":0.6639530284996455,"22":0.2423195703255657,"23":1.593922369505827,"24":0.47761141570018223,"25":2.340283802808103,"26":0.26405193928341264,"27":0.8534658232875953,"28":3.082032516512257,"29":2.5976544619868744,"30":0.5246210506276637,"31":-2.7024281875670515,"32":-0.5730348911210407,"33":0.8101281348113599,"34":-0.5670767394453415,"35":-1.0734223822245816,"36":-0.3939046681994338,"37":-1.5099154746274337,"38":0.29380537504874865,"39":-0.6471629727593056,"40":2.76757208640281,"41":-0.5377248309202731,"42":1.211000416879887,"43":1.0062182071143746,"44":1.3183408369782792,"45":-2.307746420984434,"46":0.21721819886842708,"47":-1.633217867405294,"48":0.4823475837541761,"49":-2.2266989239460777,"50":1.3301002990519295,"51":0.7633358975886424,"52":1.909990154151159,"53":1.1689615910245916,"54":-0.27404591497260394,"55":-1.2599600079888664,"56":0.0884329411747152,"57":-1.5682569134763213,"58":-0.9641769788400436,"59":-1.1478151488437494,"60":0.10411676220197703,"61":-2.711017402347138,"62":-2.4982533944953245,"63":-1.1187229988534348,"64":0.06046997707481539,"65":0.5748352733507762,"66":0.7652031947847088,"67":-0.5865550816674485,"68":0.1715442273743635,"69":-0.5135139968757118,"70":-0.6655237635833556,"71":-0.9117779617082569,"72":1.1300539969096142,"73":0.03784216446422697,"74":0.2634320318846581,"75":1.7936554035446461,"76":0.3934301906485221,"77":0.34394677287029496,"78":-1.1302028029402649,"79":-0.038280721928775255,"80":1.0793913047254724,"81":0.8788209455121918,"82":0.6825929521750672,"83":0.36873526891733127,"84":-0.260788087511954,"85":0.48657236549118094,"86":-0.6653062308043143,"87":0.8155557257565782,"88":-0.2287991533419321,"89":-0.17702252383573,"90":0.7726625936477143,"91":-0.6055199977271434,"92":-0.9979982308245867,"93":1.1768328918536828,"94":1.1468071036829548,"95":0.8879331100904673,"96":-0.5607267520350553,"97":0.5829384439832227,"98":-0.8134071335310354,"99":0.7127776668425427,"100":-0.19615570730540108,"101":0.5859147174873797,"102":0.6169992241547213,"103":-1.5916612257904226,"104":-0.081466365293425,"105":0.2907981664260872,"106":0.6498928093202527,"107":-0.5555743869182134,"108":1.7154606083096893,"109":1.0999397752180882,"110":-1.0910313053132863,"111":-0.5436955777831985,"112":-0.7571228878446384,"113":-0.4083039016546617,"114":-0.9699917004850559,"115":-0.8230528942095526,"116":1.4082427051848176,"117":0.1207309035337291,"118":0.9420440004618603,"119":0.22516902023491064,"120":-0.1210537418100449,"121":-0.5081161749466538,"122":-1.1691704860097687,"123":-0.7070316050820817,"124":-1.2757711141489827,"125":0.938203339295675,"126":-0.2757268229493702,"127":0.6994481735935448,"128":1.3177866565858716,"129":-0.0371342221934453,"130":-1.3662944071924508,"131":-0.3267861374112907,"132":0.5303715396602017,"133":-0.577875467928716,"134":0.996839512889976,"135":-0.6079015750403215,"136":0.07112077996144263,"137":1.1494330283117915,"138":-0.6270002332620858,"139":-0.7693711486138473,"140":0.5470352741473791,"141":0.5637251716245734,"142":-0.4012372225882372,"143":-0.36709650138584293,"144":-1.0520776101086795,"145":-0.5319138437028924,"146":-0.17219668621128098,"147":-0.257409470037685,"148":-0.2555413928709009,"149":-0.5812266148516249,"150":1.0747480377949146,"151":-0.7288717439532079,"152":1.0671569623174642,"153":1.0937239487593369,"154":-0.853375737121973,"155":-0.2828797889976931,"156":0.848816455666181,"157":-1.072684073417422,"158":1.6562008223968545,"159":-1.3439853557581314,"160":0.6592422233201171,"161":0.1476194420696529,"162":-0.18232568943254784,"163":-0.16953627555609535,"164":-1.2113429853620983,"165":0.13169480799214525,"166":1.5519584838975664,"167":-0.06477784070160043,"168":0.3218324680225999,"169":0.659780837826518,"170":0.6811902641298246,"171":0.21862569565213974,"172":1.9561520920520996,"173":-1.272383683486894,"174":0.1731619504593417,"175":-0.5682576269296182,"176":-0.16562616265236949,"177":1.233965912570796,"178":-1.0159884805207084,"179":0.7315932238814392,"180":1.3263713144005733,"181":-0.025096386481593836,"182":0.7584711757986596,"183":0.09500176911830548,"184":0.2667095348639231,"185":0.3930407794578807,"186":0.015281493585197451,"187":-0.3162024182304655,"188":-0.48896547966562026,"189":-0.003218154847428152,"190":0.20869998110667254,"191":0.6676758622535433,"192":-0.6543472127296267,"193":-2.137352110664706,"194":4.017220704891745,"195":3.188734634860636,"196":0.5126141518415412,"197":-0.14729590459679232,"198":0.6036358193784361,"199":-0.027117124584255744,"200":0.13775694431337904,"201":1.1398275116036947,"202":0.40926637908611546,"203":3.6120886239282464,"204":-6.6806953062312555,"205":-5.5531608531803265,"206":-2.249957789572589,"207":0.32528456944725814,"208":-0.49596509439065367,"209":0.30585271952599896,"210":-0.2286012057717939,"211":0.15530837196883257,"212":1.5199841406015808,"213":3.3950700893956083,"214":2.2325311050129266,"215":2.109964331006626,"216":0.9037155597925547,"217":-0.17760451298665597,"218":-0.34050169054265605,"219":-0.3324587338368789,"220":0.8063557246808979,"221":0.6426240596255736,"222":0.9706561545512804,"223":0.6235496305198699,"224":0.31208955791581333,"225":0.2731557290355037,"226":0.007935486335071004,"227":0.45918949327288217,"228":-0.3171805180467238,"229":-0.0718120695786328,"230":0.00485051210905679,"231":0.4569893199446454,"232":-1.8812970101079174,"233":1.4448833809553767,"234":-0.8701458564952301,"235":1.5217551925342445,"236":0.10371712935379766,"237":-0.04664175444924761,"238":0.5211574108466915,"239":0.7006510813817837,"240":0.8125443576216268,"241":0.7841428432527907,"242":-0.11466645177342427,"243":-0.3264058830613185,"244":0.8722023138468005,"245":-0.27074472986603404,"246":0.11341692352986021,"247":0.6886809312161655,"248":-1.3263818425322007,"249":-2.5155519374176625,"250":-0.514687542038702,"251":0.8232119893644095,"252":2.179547289029573,"253":0.22316481790057865,"254":-0.3365211754812351,"255":0.07853963342889048,"256":0.5570739905093209,"257":0.783938770690203,"258":0.44760360484755907,"259":-0.09113359947554119,"260":0.7867580711438463,"261":1.475721509263186,"262":0.1317820635116459,"263":0.039247234000742454,"264":1.2555155673055236,"265":0.4506864491422688,"266":0.44980955958186175,"267":0.4287514704109997,"268":1.3594449777736903,"269":0.6325811923947857,"270":-0.8951948732958281,"271":-2.1030517645813895,"272":-0.16000392960702498,"273":-1.593873039161652,"274":0.7080642966720514,"275":2.135238274998849,"276":-1.9456335507935087,"277":-1.384376785144812,"278":-1.8598793333355144,"279":-1.0498387516636032,"280":-0.14278865190482806,"281":0.7003106442730797,"282":-2.02326569365478,"283":0.3794952833693323,"284":-0.2333276688592499,"285":-1.680540061282276,"286":-5.315322272787824,"287":-3.2758079733342913,"288":-0.983766235071357,"289":-0.32566680529952363,"290":-1.8970795361085122,"291":0.21276878230062524,"292":-0.16721779960473743,"293":-1.3554743769669788,"294":0.0637661489922136,"295":-0.8240119586105991,"296":-0.3155852033053506,"297":0.01603252743436335,"298":-0.7187961163395,"299":0.6365633105195312,"300":-0.7124964022411012,"301":-0.7832180902241322,"302":0.6450810510253074,"303":-0.7488704110036302,"304":1.5165038852565922,"305":-0.15463642239275335,"306":-1.5884588130030557,"307":-0.009748644474343392,"308":-0.6396418355879895,"309":-0.03458853707296017,"310":-1.2685920175697134,"311":-1.3020633675460882,"312":0.33442602946540606,"313":-0.5622746545432115,"314":1.293999343659301,"315":-0.013475795928067982,"316":-0.6141590653778506,"317":-0.0900274103596495,"318":0.493390013719144,"319":1.3519355823299162,"320":-0.44937097930540093,"321":-0.3009265444423422,"322":1.4223996184937913,"323":-0.051627130036584645,"324":0.028557617503747544,"325":-1.030105794731819,"326":-0.0904665246265057,"327":0.15627333658397857,"328":0.01554060817711031,"329":0.11085990453691294,"330":-1.276596922900695,"331":-0.5045667038672987,"332":-0.6335873487606042,"333":-0.5830201850478888,"334":0.03465053020597317,"335":-0.3233739486821435,"336":0.3382858706874448,"337":-0.4520869949590703,"338":-0.38650547838329236,"339":-0.4185205436858906,"340":-0.16216010716511367,"341":-0.3191540680955957,"342":0.5459634529692061,"343":0.1359072804942293,"344":-0.36869855700977777,"345":-0.6813177354881319,"346":-0.4794286633904916,"347":-0.4107181034450606,"348":0.2713893607952154,"349":-0.528542911665087,"350":-0.04107434518298655,"351":-0.49535545153753535,"352":0.11335582615563139,"353":0.024826341382537427,"354":0.6521553656922245,"355":-0.45025192695239274,"356":0.15278694165132767,"357":0.06388860063353467,"358":-0.7714191800293172,"359":0.01387667218548386,"360":-0.7140066254885978,"361":0.28174658017500953,"362":0.0693681028037959,"363":0.5496510618816415,"364":-0.21695372127637308,"365":-0.6389564301540918,"366":0.06860452556072162,"367":0.8408623085605355,"368":1.418861382358796,"369":1.0713657599882753,"370":-0.02814082421012276,"371":-0.5574023319936924,"372":0.04272643325272545,"373":0.6821810285361409,"374":0.8362100557616448,"375":-0.4647454604044769,"376":1.5723947690567908,"377":3.5647041604920826,"378":2.3403354261138234,"379":1.4849184434891411,"380":0.8562434712948713,"381":-0.1401565405633322,"382":0.0063981854472650755,"383":0.4804213084972502,"384":-2.865578678197434,"385":-3.350143513466963,"386":-4.01690729875823,"387":-2.436431003312238,"388":-1.0963886581280484,"389":-0.20889677717241303,"390":-0.9921345182331116,"391":-0.29744887977280027,"392":0.6001665766955989,"393":0.46095533281858925,"394":0.6455973463550582,"395":-0.794952561962321,"396":-1.3886398365807875,"397":-0.9032703091139453,"398":-0.23261936414135634,"399":-1.4249147277803849,"400":-0.3130721665062783,"401":-0.09797530573076692,"402":-0.2783762875741925,"403":-0.3729819923928779,"404":0.4688996604188802,"405":-0.2379299201892989,"406":-1.3018319753747567,"407":0.021755516012234664,"408":0.05023294199487827,"409":-0.3433050514265304,"410":-0.42870637461654876,"411":-0.1523015927759583,"412":0.5773830995725541,"413":0.3778089204979738,"414":0.2581905319522958,"415":-0.09370754246840786,"416":-0.2055664905819795,"417":-0.586491867858278,"418":-0.08537637679090333,"419":-0.8467721765184945,"420":-0.6818044619515787,"421":0.1702643696161993,"422":-0.6468700359938245,"423":0.028333649889199387,"424":0.9520923943373751,"425":0.7338738983550556,"426":0.3324320255804251,"427":0.5780671895498554,"428":0.4438028729284197,"429":0.01975680515903847,"430":-0.8855152195496273,"431":-1.3298788534250368,"432":-1.8723440073878745,"433":-2.2023701571693572,"434":-1.7292366345474395,"435":-0.5379725439658715,"436":0.379272520074652,"437":-1.0207241276939398,"438":0.2481907746366068,"439":-1.133550140634346,"440":5.009327054586793,"441":7.709843924976551,"442":6.964996485670714,"443":3.6985040001766927,"444":4.149664002897065,"445":1.3416276865806895,"446":0.28518441861203864,"447":0.878415785714794,"448":-0.6910711242070541,"449":-0.7538901960457937,"450":-1.7048029328149001,"451":-2.5439473483018507,"452":-0.7579982588177385,"453":0.4143590077556606,"454":0.3480966041687127,"455":2.012777053011108,"456":0.8007925205335026,"457":-0.7273651624523177,"458":-1.2246955903963532,"459":-0.9542881239399962,"460":-2.778262929499506,"461":-1.662997200797042,"462":0.25550221098395626,"463":-0.021854495062491524,"464":0.026719592818511925,"465":0.6923443440161651,"466":0.18238906742752917,"467":-0.6386031993339616,"468":0.1918545396904897,"469":-0.14942823852076384,"470":1.1548758374285335,"471":0.505064358567259,"472":-0.06735101084079659,"473":-0.9724297520059242,"474":-0.023309996752239874,"475":0.21529430022977794,"476":0.7304984252925371,"477":0.43404405234242216,"478":0.7790161950280465,"479":0.4949915922426729,"480":0.39010182097592155,"481":-0.24040550415683767,"482":0.325662731585387,"483":0.16475154539399328,"484":-1.0023442369665234,"485":-0.17441790311421115,"486":-0.4532217559074791,"487":0.698349588065374,"488":0.3860178209064915,"489":-0.5329130418109704,"490":-0.9172542620401393,"491":0.12908208980811212,"492":0.35723069152097237,"493":-0.5918921201221697,"494":0.2692559639572595,"495":0.8121452665897897,"496":-0.5438147738037769,"497":-0.37084872755942794,"498":0.512712459928265,"499":-0.22358544020567367,"500":0.1438544373611149,"501":-0.3242479974123088,"502":1.0558597163807324,"503":-0.7559706359191455,"504":0.6504890908064079,"505":-0.12778650601727748,"506":-0.3265589289817717,"507":0.4009438718585301,"508":-0.301755319186716,"509":-0.5878394946539791,"510":-0.4781951602423287,"511":0.3244031298404488,"512":-0.35349512195342997,"513":-0.41217166879488537,"514":-1.1405471258896895,"515":0.15858849699450386,"516":-1.0527483236799777,"517":-0.8763309470075161,"518":-0.5660195988034301,"519":-0.3092493417203857,"520":0.1834578352993273,"521":0.09273569227867538,"522":-6.844200020611943,"523":-3.9873869802910624,"524":-3.8163083522988863,"525":-1.3151263070970427,"526":-0.7078759279195163,"527":-0.6296965998066282,"528":0.2458445191159927,"529":0.09459445863697345,"530":-1.1127128072531607,"531":-2.653306852176448,"532":6.540823356534503,"533":1.2081052241704706,"534":0.5727657774307715,"535":0.5444889069980792,"536":0.4482914596147505,"537":-0.08180611036061483,"538":-0.46609990665757123,"539":0.3756100110261852,"540":1.4879661796142096,"541":2.208182084869717,"542":1.655768966352654,"543":1.35855265112342,"544":0.019885719846584472,"545":0.14612596599298663,"546":-0.8325283746172417,"547":0.39566658098957186,"548":-0.03492544157249363,"549":-0.8047712549685445,"550":0.3102374545779913,"551":0.4699066840477031,"552":-0.0040598945385529744,"553":0.8182143009815609,"554":-0.220623232510933,"555":0.2931214599078312,"556":-0.4664701305295785,"557":0.3668170152208673,"558":-0.4998997082350077,"559":-0.08632657883799318,"560":-0.29013927019393126,"561":0.17247625505821734,"562":-0.27452344020213104,"563":0.0468553571228287,"564":-1.7019939915342295,"565":-0.29765534629430135,"566":-0.4749300712198817,"567":-0.2521379920737457,"568":0.2720027434457868,"569":0.40930895258055133,"570":0.7039723070130538,"571":-0.33211971811281626,"572":-0.4797379586716867,"573":-0.7439450282435546,"574":-1.4861880722822043,"575":0.29646505267249124,"576":-0.8009782599586749,"577":-1.440687267892317,"578":-0.7824470110349743,"579":-0.6439717536597902,"580":-0.4536557296855041,"581":-0.19337968122791338,"582":-0.39917118739634755,"583":-0.022734697491317662,"584":0.19498879635968172,"585":-1.3928445285704945,"586":-0.9887517608591572,"587":-1.0466755062409505,"588":-0.4996190748423171,"589":-0.5510863974127532,"590":-0.13811008980817294,"591":-0.249906027687375,"592":0.6488703551392061,"593":1.0685634502025063,"594":-1.103706161412495,"595":-1.3806885984155766,"596":-0.9519269597767264,"597":-0.3308117987012312,"598":-0.24494233902131535,"599":-0.49745164042715306,"600":-0.26410614441032065,"601":-0.5374566327049031,"602":0.11195390114535202,"603":-0.9185436109823303,"604":-1.706427422713191,"605":-0.6072205781142513,"606":-0.5132103400330252,"607":-0.11518575245558707,"608":-0.5291972079693038,"609":-0.15993748627878404,"610":-0.3059894821992195,"611":0.17583274361341703,"612":3.3785017512558717,"613":-1.3307196314997984,"614":-0.25041014517873106,"615":-0.3480804181243715,"616":-0.41775926084042087,"617":-0.21122731758372454,"618":-0.325213109538684,"619":-0.5169026450763609,"620":1.1417258445220448,"621":-0.353198835017108,"622":-1.0177363131199912,"623":-0.9483442783570483,"624":-0.4126041927163356,"625":-0.33710940413144247,"626":-0.4624684105356254,"627":-0.4191749808351544,"628":-1.1151983887008194,"629":-0.4996980818970878,"630":-0.22545218506617598,"631":-1.8586435978893032,"632":-0.6759262634048776,"633":-0.6851312183819462,"634":-0.5151464419406612,"635":-0.33801887403852093,"636":-0.49894338222322543,"637":0.12930003948585375,"638":0.45302098067541374,"639":0.592967815966074,"640":-1.115969007212802,"641":-1.071883974683806,"642":-0.3860027523078379,"643":-0.5447770385834744,"644":-0.4833841627676795,"645":-0.5954062772815412,"646":0.17657764896645586,"647":-1.2503299368949319,"648":-0.517347074328051,"649":-1.1536774784502957,"650":-0.8354024266022403,"651":-0.7153656839916696,"652":-0.5234863538335446,"653":-0.18979055758145652,"654":-0.3190425394748933,"655":-0.12585157914133072,"656":-1.012202044565453,"657":-0.4745784177902906,"658":-0.8727971603985231,"659":-0.3376915194182154,"660":-1.4832485134259203,"661":-0.45836829367227555,"662":0.043444495547515866,"663":0.15204768486997006,"664":-0.876496222713353,"665":-0.535014334727051,"666":2.8617147340189955,"667":-0.31945727568564575,"668":-0.9883157967209812,"669":-0.5487201549015763,"670":-0.9242871280645927,"671":-0.09495674433617446,"672":-0.5628195483541537,"673":-0.3545524708983639,"674":-1.9736478053602209,"675":-0.9359552813646401,"676":1.880844623226501,"677":-1.480268210246483,"678":-1.4060744419094422,"679":-1.0441198426753109,"680":-0.17742220661222663,"681":-0.23906441983899332,"682":-0.28950427149982166,"683":0.3748549267895099,"684":0.4558872586550402,"685":-1.7920678439834175,"686":-1.3110442849491235,"687":-0.8560936305416964,"688":-0.7743216879181042,"689":-0.1538826817970318,"690":-0.6294333047968422,"691":-0.007243567618207276,"692":-0.41273149378796053,"693":-0.11600517577123015,"694":1.616427591257963,"695":-0.05103549227165496,"696":-0.8446964454525169,"697":-1.1753408328312953,"698":-0.3710041696615871,"699":-0.34836884676538826,"700":-0.13513204662371087,"701":0.5421396703633169,"702":1.8105688193443579,"703":0.7607270792099048,"704":-1.638373441386136,"705":-1.5506177985539733,"706":-1.5121193170848743,"707":-0.43858953485462954,"708":-0.9002021245833879,"709":-0.18522725628752162,"710":-0.7675301999334665,"711":0.9825422766765716,"712":2.0895276337506252,"713":-1.2836811669920916,"714":-1.463421131032121,"715":-0.9260741901140656,"716":-0.664632025901714,"717":-0.5424216629734204,"718":-0.31161434382852893,"719":0.7994422385199219,"720":0.8164415056374881,"721":-0.4015474105463983,"722":-0.9564941410456055,"723":-1.0086877536912233,"724":-0.620630286673452,"725":-0.6242089328283256,"726":-0.09118217374721634,"727":-0.567653337533444,"728":-0.9758945259267172,"729":-0.8746911382360328,"730":-0.5906743679623033,"731":-1.3037914365413528,"732":-1.0794801242111027,"733":-0.7733612017551388,"734":-0.4977561510463031,"735":-0.038329672250915506,"736":0.1092801427465908,"737":-1.4288537301105948,"738":0.08329473350974716,"739":-0.22309968821286344,"740":0.21387787225206395,"741":-0.6683155516183931,"742":1.1716165252334598,"743":0.30909071524461934,"744":0.2663851080539645,"745":-0.23382030568632212,"746":0.4240601181599554,"747":-0.32748722155124554,"748":0.12893921561629434,"749":0.15571403257061772,"750":-0.03736671063627698,"751":0.37218661245067264,"752":-0.08628799392375576,"753":-0.0944098226242484,"754":-0.2601764558907212,"755":0.21200371416177316,"756":0.21770668364184156,"757":-0.14592216194041052,"758":2.9448169600833776,"759":1.1627164727074548,"760":0.8454848104432682,"761":-0.38489410488311077,"762":0.15591985269632241,"763":-0.21026998330166335,"764":0.5151760277480661,"765":0.2721152891027691,"766":-0.29826712007366213,"767":11.506959187006025,"768":8.114310487141609,"769":-1.0384943186579096,"770":-0.10672370960738681,"771":-0.11659046472745732,"772":-0.7974066930349243,"773":-0.3985170804899813,"774":0.5102923976169571,"775":0.9460887707470648,"776":-0.6474311098032073,"777":1.2529651269121893,"778":0.5209803783310932,"779":-0.17915507484011056,"780":0.12715546963620566,"781":0.17258057080373698,"782":0.3019496118383074,"783":0.6161263619308139,"784":-0.27083198393556573,"785":-0.5300032300036723,"786":-0.009598910363058882,"787":0.9965671948045465,"788":-0.5964198171748175,"789":-0.300730528379492,"790":0.2635305054547183,"791":0.7307571549342033,"792":-0.2748827957410812,"793":0.6697324623461955,"794":0.050730249582268676,"795":-0.2754658693881142,"796":-0.12164212839922606,"797":0.5939940021177965,"798":-0.46154987227207167,"799":0.42945572573217533,"800":-0.3254629932326435,"801":-0.5770893708187038,"802":-0.21083095602824184,"803":0.5731064847523873,"804":0.10309697803183379,"805":-0.45405809251833856,"806":-0.456714992289635,"807":-0.33094754779268765,"808":0.9466803473310577,"809":-0.4179108511556736,"810":-0.03056067124714632,"811":0.7245451734438826,"812":-0.43017445354268125,"813":0.1741013076729159,"814":0.30302212282244256,"815":0.43245934266876845,"816":-0.09809274596920237,"817":0.3979806464263357,"818":0.9653414783343824,"819":0.3409788310345474,"820":-2.630755055690785,"821":-0.4686438495602334,"822":-0.02845861122929482,"823":-0.5179166511761717,"824":0.1633347731945001,"825":0.9176815274668041,"826":0.5054630321656417,"827":0.7170516703402526,"828":1.396779911474791,"829":-0.599979029272908,"830":0.7099207171301398,"831":-0.6411592410958689,"832":-0.5238560177659789,"833":-0.6318731642861133,"834":0.5115030637072182,"835":0.37171435508684697,"836":0.1405162518529675,"837":0.46303872399653623,"838":-0.018528227718653548,"839":1.3075833686198297,"840":0.576776399697131,"841":1.387130742000257,"842":1.8906994476843866,"843":0.12286674930540173,"844":0.25333276762156365,"845":-0.2868102319382902,"846":-1.1410563684815749,"847":-0.7276656396074548,"848":-1.840952841622624,"849":0.515818127294962,"850":2.8069493864782995,"851":-0.8786667343540882,"852":-1.354925102303214,"853":1.5487091131744766,"854":1.3508607520739415,"855":-0.24644113197175269,"856":0.02423767932176532,"857":-0.5266360764950302,"858":1.0479733339720594,"859":-1.3014004608209364,"860":-8.962114655537873,"861":-7.218758790477311,"862":-0.21644707275248803,"863":-0.5141829913722015,"864":-0.2858507855000494,"865":0.2645962183602355,"866":-0.36140604650675245,"867":-0.19539028151870885,"868":2.3539670968502118,"869":-1.0592206342537058,"870":0.07948337550266933,"871":0.26393778549396163,"872":-0.18954579946173575,"873":-1.1238488911311073,"874":0.3852203719271677,"875":0.6168809453595703,"876":-0.5371020025602812,"877":1.79713828232412,"878":0.8033179302208769,"879":1.6383509936266942,"880":0.7359141631830549,"881":0.26762769261666297,"882":0.5366303054643282,"883":1.26751147985137,"884":0.9413390989133417,"885":-0.16561549819380653,"886":0.9560899089700856,"887":-0.5514843562414494,"888":1.2951811660271961,"889":-0.3230520815443971,"890":0.3661944609306586,"891":0.8848718841327783,"892":-0.21471458887151465,"893":1.116589544930568,"894":0.9660999679650513,"895":-0.9924805826223393,"896":-0.9120120259607765,"897":1.8507075486562636,"898":-0.08938008923666581,"899":-0.1840424321541589,"900":-2.091927041531299,"901":-0.5484356097111633,"902":-0.5557085076542672,"903":-0.5474886178361819,"904":-0.4987405041158521,"905":-0.6948582923588709,"906":-0.7151461927724306,"907":-0.7634743896274934,"908":0.3705900289915871,"909":-0.34968492757748537,"910":-0.904581843909829,"911":-0.7752671597968949,"912":-0.8344442216592971,"913":0.028808332336580516,"914":-0.18935269141220618,"915":-0.5210783004550392,"916":0.20383369736870993,"917":-0.5215547137063927,"918":-0.600029225875688,"919":0.9678221949736124,"920":1.0977087927767284,"921":-1.3802811403992468,"922":0.4059984270755528,"923":-0.6232219261901139,"924":-0.6178991509248217,"925":0.1514783968694699,"926":0.6466044366374932,"927":-0.20556689214343654,"928":0.11817380113645912,"929":0.26308991033698587,"930":0.08969560944421744,"931":-0.6875781494126282,"932":1.1409833362375892,"933":2.389411897816861,"934":1.7687740692567262,"935":0.4457957440841053,"936":1.0633122022801176,"937":0.5197104547210548,"938":0.3716188730284515,"939":0.7086247577669382,"940":0.16703706729537,"941":1.421879151402965,"942":0.5445890409001384,"943":4.844210877798666,"944":3.6550007004434506,"945":1.2551432135734302,"946":0.37604725627265567,"947":-0.2098733346800193,"948":1.1141877104398195,"949":0.0678013486208878,"950":0.08415315876676766,"951":-6.794532951520492,"952":-6.937307125462202,"953":-5.102555465358017,"954":-2.8362343512685273,"955":-2.3433339505233213,"956":-0.48843107030635785,"957":-0.03190288104510153,"958":0.0009858351018709503,"959":-0.8875553960599047,"960":-1.310758355788196,"961":-0.6101926428812826,"962":-0.8968839113908902,"963":0.9966855223331581,"964":0.045972933241641464,"965":1.6358454695273463,"966":-0.853464922968997,"967":-0.17671065709901473,"968":-0.16968070077906214,"969":0.10915986634365434,"970":-0.43500743403385655,"971":-1.8751197507397428,"972":-0.5487573156916377,"973":-0.4211495933449757,"974":-0.6718217461689107,"975":0.17467315981455597,"976":-0.6378922623369196,"977":-0.15080979407905745,"978":0.8241631187531171,"979":0.04305530734026232,"980":-0.7588919530753162,"981":0.06082053771545152,"982":0.49215720998225126,"983":-0.7713093392703588,"984":0.23752753207325694,"985":0.6135599674728551,"986":0.11177250992081601,"987":-0.5634525668392193,"988":-0.4719456535418434,"989":0.0008886790598816234,"990":0.028682555195237387,"991":0.034198612229046486,"992":0.023705147867299232,"993":0.9673930208142492,"994":0.5909243448945714,"995":0.2498083614826636,"996":-0.2813406604298672,"997":-0.5869815451886979,"998":0.32355682236186745,"999":-0.28481502483963506,"1000":0.729942141862453,"1001":-0.8172195941309766,"1002":0.15560826796074487,"1003":-0.04242870647013941,"1004":0.1372928868211792,"1005":-0.4542457556363918,"1006":0.6161641550643028,"1007":0.1449792403724598,"1008":-0.3395942058554661,"1009":0.7468056902329692,"1010":0.20517402368648932,"1011":1.6290744363133651,"1012":0.22270538115357758,"1013":0.34917372930332624,"1014":-0.4566855275687212,"1015":0.029581456670666764,"1016":-0.4042393764253133,"1017":-0.18511562183762628,"1018":0.6034557315097111,"1019":0.05813260893151467,"1020":0.1867123919176003,"1021":-8.237059062587724,"1022":-4.8285606275092485,"1023":0.35351823722807013,"1024":-0.6548150499161435,"1025":0.0086324856491945,"1026":0.7886663789120281,"1027":-0.31169151617257496,"1028":0.1216272749137039,"1029":0.3659860192180842,"1030":0.08281627795754466,"1031":0.7223291177866226,"1032":-0.37507381647130994,"1033":-0.08221705297983858,"1034":-0.2763157005895969,"1035":-0.5263226427949226,"1036":-0.44611831986722195,"1037":1.1199565760342334,"1038":0.6296221107598026,"1039":0.6591114157277504,"1040":0.3113427704102885,"1041":0.3228914605754535,"1042":-0.059535152551042546,"1043":0.05372406927424727,"1044":-0.31461313632567245,"1045":-0.2602497455295428,"1046":-0.1412097991883918,"1047":0.7609321223448464,"1048":0.21174643977567523,"1049":0.20208761713652648,"1050":0.29399219552726397,"1051":-0.26817588848949836,"1052":-0.8562947201142359,"1053":0.008009353960506484,"1054":0.34148703781089623,"1055":-0.07286751047553032,"1056":-0.08453888207890063,"1057":0.7594116746813239,"1058":-0.17186616548489436,"1059":0.37305759925679605,"1060":-0.7739869615794643,"1061":0.056476946738490234,"1062":-0.8631228678916331,"1063":-0.5551966159420244,"1064":-0.42074184673056325,"1065":0.16764378616100828,"1066":1.4880585144513683,"1067":1.7120133925932828,"1068":1.1809762711374767,"1069":1.8196554989259286,"1070":0.7063426034805191,"1071":0.7452925645282904,"1072":1.3653377105013182,"1073":-0.12314893741697171,"1074":0.733839632347418,"1075":0.13935481645535122,"1076":-0.30109675834714295,"1077":0.041272551182468475,"1078":1.5781527441657694,"1079":0.3454451220210653,"1080":-0.9157729364456108,"1081":-0.02965778366703236,"1082":-0.2568051975724635,"1083":-0.41666120496084896,"1084":-1.1528077044050289,"1085":3.017280680465111,"1086":-1.7446759090958794,"1087":-2.364486850435647,"1088":-0.8331516342260691,"1089":0.505403821606202,"1090":0.06569625798623414,"1091":0.908229427502943,"1092":2.449985474710232,"1093":-0.6235719558685906,"1094":0.00933956358542308,"1095":-4.785699051500187,"1096":-4.538587941043503,"1097":-1.7478260523214504,"1098":-0.10992271637004973,"1099":0.3951016479172182,"1100":0.13914652979875616,"1101":1.6442462419286075,"1102":0.2567292717759196,"1103":-0.1187906074676878,"1104":-0.8924504534476145,"1105":-0.6583167164439994,"1106":2.7956963281612928,"1107":0.30016601228023215,"1108":-0.20578357251970805,"1109":0.864219660399507,"1110":-1.1080083415124586,"1111":0.3330360625221606,"1112":1.7117356836952566,"1113":-0.3456303323075999,"1114":2.153056856609053,"1115":0.027877916877057,"1116":-0.3001048830499275,"1117":-0.13097389582307115,"1118":1.1191950316754484,"1119":0.1335205303819779,"1120":0.6842136321556783,"1121":-1.695223587138339,"1122":0.06531957840617422,"1123":0.3973005974709283,"1124":0.8382143847141649,"1125":0.8699480828187697,"1126":-1.0247961563181864,"1127":0.17450046623836543,"1128":-0.30767154750417774,"1129":0.9579601837658857,"1130":-0.9531533698927461,"1131":0.13933053127240497,"1132":-0.7198176952961649,"1133":1.5209246686863662,"1134":-0.1606881169476494,"1135":-0.22446097214688135,"1136":-0.5100265054586985,"1137":0.31017440323083806,"1138":-0.8074884050525087,"1139":0.0021784606148119367,"1140":2.13559802237956,"1141":-0.11491677279101435,"1142":-0.7178696521019893,"1143":0.9766498378851255,"1144":-1.0883919960958932,"1145":0.9321284889139518,"1146":0.8875587477867841,"1147":-1.1389779468124719,"1148":0.21819276715315114,"1149":-0.3008848103199724,"1150":-0.5815475897493775,"1151":0.27870045979090474,"1152":-1.5393273518099058,"1153":-0.20814873001051878,"1154":0.0896890256667642,"1155":-0.1609692741418069,"1156":-2.0637966264244003,"1157":0.3567500251946397,"1158":0.7908722595813764,"1159":0.851599022498883,"1160":-0.16712619061953832,"1161":0.40680270634290305,"1162":-0.3881285958102387,"1163":1.3795814401771493,"1164":-1.1056118907787418,"1165":0.8805615947960335,"1166":0.9984914626864012,"1167":0.547443550220598,"1168":-2.4112438525328983,"1169":0.22506150094107152,"1170":0.09657797772947652,"1171":0.9454329818066701,"1172":0.09235970687049207,"1173":1.5564091577651522,"1174":0.3956882163224952,"1175":0.2842155861532222,"1176":-0.24792476259607193,"1177":-0.8608887096822556,"1178":-0.22503095693161024,"1179":1.9552012156499334,"1180":-0.41254847024362173,"1181":0.6097068621252205,"1182":-0.36166513470379136,"1183":0.6303643254771525,"1184":-1.0933231542575637,"1185":0.7315832978310695,"1186":-0.17367861750907782,"1187":0.2425353970414819,"1188":-1.014931223678403,"1189":-0.832458721004008,"1190":-0.77973666707089,"1191":0.23981738416951243,"1192":-0.8727451860054489,"1193":1.550359690113565,"1194":1.5560353547466992,"1195":-1.68318574361286,"1196":-4.149250361776576,"1197":0.5869688360755503,"1198":-0.13437379015789544,"1199":-1.5304177342473702,"1200":0.6105346849744239,"1201":-0.49612586635672073,"1202":1.247616336146016,"1203":1.355600641417213,"1204":0.46663173511279354,"1205":-0.14756319393610995,"1206":-0.9203960538519489,"1207":-2.5613072678327247,"1208":0.8315371686431624,"1209":0.006495440848251889,"1210":0.01656635061844849,"1211":-1.0307778312611302,"1212":-2.9934536911198837,"1213":-1.23777309877947,"1214":-0.6669261072263272,"1215":0.5927598269473735,"1216":0.1775961277184695,"1217":0.13763163487027938,"1218":-0.9035512566148122,"1219":0.8960676304311642,"1220":0.7825936540478841,"1221":1.9003244051736061,"1222":-0.2654075257181002,"1223":0.996369402584168,"1224":0.859117993351389,"1225":-0.7246140093949776,"1226":-2.186062821060872,"1227":1.8013526052880076,"1228":0.8715995811332069,"1229":0.23818282950901198,"1230":-1.4283084470447633,"1231":0.6797371645579304,"1232":1.2066976430142877,"1233":0.7050989109002265,"1234":0.17052545058261448,"1235":0.7333131053056313,"1236":0.8254960562040643,"1237":0.8304796623656913,"1238":-0.4259016578728982,"1239":1.0552331645985271,"1240":-0.23539041709658856,"1241":-2.2568234722509444,"1242":-1.9345854570099954,"1243":-0.8611892340941101,"1244":0.06415275204629033,"1245":0.5568023150666271,"1246":0.4875111270766374,"1247":0.3768850914541251,"1248":0.6862883670797356,"1249":-1.2405811305837682,"1250":-0.2361283328349849,"1251":1.3391879478027702,"1252":-0.8768171808898886,"1253":-0.3750677575423478,"1254":-1.6717630023001542,"1255":0.5615547507078159,"1256":-0.30413556152528437,"1257":1.3417514901990888,"1258":0.05754548453483625,"1259":-0.00875091743886659,"1260":-4.098958870476046,"1261":-2.4338597484274795,"1262":-0.07888440454263886,"1263":-0.06733366584794165,"1264":-0.3439497450874504,"1265":1.8955796219167136,"1266":1.429164960869297,"1267":1.0379901954702324,"1268":-0.4238835733726144,"1269":0.9974519254281782,"1270":0.0931791424953332,"1271":-3.1811103007714743,"1272":0.11999881633916339,"1273":-0.4064710867319189,"1274":-0.7781281913863393,"1275":0.6649464399327091,"1276":0.20824231386239225,"1277":-0.7133114834185071,"1278":-2.5149307328436983,"1279":-1.236332139553705,"1280":-0.8408158135204507,"1281":0.161499922645143,"1282":-0.43114704193634584,"1283":0.8344494043595491,"1284":-0.7230289381551048,"1285":0.7985173696412686,"1286":-0.15047021478126404,"1287":0.5842928967354861,"1288":-0.9237173252307618,"1289":0.4744608178879431,"1290":-0.08550432277639936,"1291":0.17830255408098816,"1292":-0.828258994591167,"1293":1.9901704133592268,"1294":0.13761982504262663,"1295":1.0250154813814871,"1296":-0.7509201310063579,"1297":-0.2657862558939467,"1298":0.2631358381691665,"1299":0.920218166627842,"1300":-0.8939374526295296,"1301":0.5002237481720452,"1302":-1.6678875170797027,"1303":-1.0300759441853062,"1304":0.5608403585490394,"1305":1.2982504626537306,"1306":0.10891322790058189,"1307":0.538863285502883,"1308":0.609947191184414,"1309":1.833890233392455,"1310":0.18326011063961992,"1311":-0.08278115135002971,"1312":-1.9548175922839326,"1313":0.006105933431209424,"1314":0.5265124945247122,"1315":1.2105660683194066,"1316":0.8833575876635631,"1317":0.3563737169415414,"1318":0.35946305025226605,"1319":0.41492301567690304,"1320":0.3675126989338863,"1321":2.0376216636507043,"1322":1.3059351060675886,"1323":1.2210161755947655,"1324":0.7661850959292451,"1325":0.9649074783323845,"1326":0.7468901140497514,"1327":0.437864480421378,"1328":0.4448259799937869,"1329":0.24441442513843337,"1330":-1.3552901999305524,"1331":-1.3632506981850925,"1332":1.1229217051060827,"1333":1.0816876513566378,"1334":1.3643562173011863,"1335":0.5040392286594269,"1336":0.47880514455077766,"1337":0.48773391825002305,"1338":0.283154624463972,"1339":0.32011500924683434,"1340":-0.9904825085880236,"1341":-0.6211141324407551,"1342":1.3430918241109482,"1343":0.7837592260651202,"1344":0.4799231157120204,"1345":0.3525427592310909,"1346":0.4117382502682074,"1347":0.4594374653538462,"1348":0.5608576947489409,"1349":-0.5589756187178543,"1350":-3.601398445339216,"1351":1.6300355971499332,"1352":0.8843106319892289,"1353":0.569934860443735,"1354":0.6073862615785379,"1355":0.33989924307590325,"1356":0.4253201494669052,"1357":-0.582648647530996,"1358":-0.8471172768273345,"1359":0.14007499774854565,"1360":1.149084225899377,"1361":0.9947356364064269,"1362":0.4526087704425718,"1363":0.5669345359572266,"1364":0.5792848645777953,"1365":0.41712661073497503,"1366":-0.667677687035645,"1367":-1.0985864086606583,"1368":0.9877399478889854,"1369":1.8161569841512457,"1370":0.8058542455821179,"1371":0.7024393374834997,"1372":0.391491679776133,"1373":0.249002824564879,"1374":0.3801270495602399,"1375":-0.535132809449068,"1376":-0.5087980772054006,"1377":0.3021368268344979,"1378":1.0157121223215704,"1379":1.2858630570864178,"1380":0.8057964493280984,"1381":0.4511493928209769,"1382":0.4687062720200223,"1383":0.5270878953977707,"1384":0.94991885617481,"1385":0.43950033755304435,"1386":-0.07500455443707182,"1387":1.3489063811983533,"1388":0.9647439339887874,"1389":0.7630098904372447,"1390":0.5031453075157853,"1391":0.3882565051055595,"1392":0.17692383244011017,"1393":1.4074037846820386,"1394":0.5702359797838836,"1395":1.4964812948529804,"1396":1.9447715113619028,"1397":0.3246921379222843,"1398":1.104852054805698,"1399":0.5134423603768029,"1400":0.29057991331281763,"1401":0.32410365621564535,"1402":0.46259566130212904,"1403":-1.903956287632869,"1404":2.1332186819428505,"1405":-0.2921397327837806,"1406":0.7947028486939071,"1407":1.0722921933096492,"1408":0.6208904419925972,"1409":0.31877528412193895,"1410":0.3221985209800222,"1411":0.42187565555065026,"1412":-1.578002886607808,"1413":2.482268153721093,"1414":0.38222366943921476,"1415":0.9485136784058072,"1416":0.635477231039129,"1417":0.6821576279329128,"1418":0.5765416308334242,"1419":0.46518537361524503,"1420":0.35371395473975714,"1421":-1.205832706418331,"1422":-0.08298066368817095,"1423":1.141126881317876,"1424":1.299264478505117,"1425":1.0280097629658858,"1426":0.7297336261143952,"1427":0.37297749603185465,"1428":0.5734495711933785,"1429":0.49645340274227046,"1430":-0.8885938524967054,"1431":1.423111174380503,"1432":-2.786875888949154,"1433":1.0719366411825146,"1434":0.35530701120558883,"1435":0.47042420059207873,"1436":0.45563529768002575,"1437":0.40940430291205854,"1438":0.3080348100906958,"1439":0.7943831350446964,"1440":0.04928452049147376,"1441":0.38104649241938504,"1442":1.3034488403677922,"1443":1.1004865195952402,"1444":0.6950617986086187,"1445":0.3826479386931718,"1446":0.5713241214362618,"1447":0.36655566380149424,"1448":-1.042815887650426,"1449":0.34007577323763233,"1450":1.2529546708378918,"1451":1.5591996088487419,"1452":1.4108697442453133,"1453":0.6971317938379784,"1454":0.4254279522575968,"1455":0.29652972412243317,"1456":0.42499925873899363,"1457":-1.6944344585567839,"1458":-0.6482222013001008,"1459":-0.5748814415118807,"1460":1.4066596899879762,"1461":1.4113535165860953,"1462":0.6087453599205285,"1463":0.6940125069817765,"1464":0.6491651906070666,"1465":0.5964244766951803,"1466":-0.5857806355258232,"1467":-0.4149998250931799,"1468":-0.5452530084870378,"1469":2.066859143561552,"1470":1.3761175557794914,"1471":0.7829752082270727,"1472":0.5085846171002162,"1473":0.23961459792756015,"1474":0.19669428722583962,"1475":0.5053273110735245,"1476":0.2241679161381236,"1477":-0.16770797256193773,"1478":-0.5044499187662463,"1479":0.627778131624642,"1480":0.756970578800689,"1481":0.4593508252701081,"1482":0.28619404393173264,"1483":0.31561650236429145,"1484":0.29927714319668947,"1485":0.00008141473785897886,"1486":0.9663522989074522,"1487":0.816075622635065,"1488":0.8330865741206211,"1489":0.8131449306296353,"1490":0.4222086373642859,"1491":0.4057799762770004,"1492":0.30321790329766113,"1493":0.27978012487948617,"1494":-0.6493118207168389,"1495":-1.3049109424367678,"1496":0.7300627784166226,"1497":0.9664588474211468,"1498":0.8796783551730999,"1499":0.5714619517129729,"1500":0.42398575265593874,"1501":0.33919501401156305,"1502":0.21101925642164848,"1503":1.0656205083846093,"1504":1.249969625423712,"1505":1.6139715684617795,"1506":1.029930382917594,"1507":0.7951655759542032,"1508":0.5245898914244429,"1509":0.21646621616233805,"1510":0.41464404362825813,"1511":0.09908130580128346,"1512":0.40833191288988013,"1513":-0.26634275728151335,"1514":-2.714097375044223,"1515":1.427709171456124,"1516":0.04728622783774661,"1517":0.38773897534082147,"1518":0.20372696543192334,"1519":-0.0043858720679762426,"1520":0.1595705427525241,"1521":0.8266476559649844,"1522":-0.15422437811273015,"1523":0.26231005083461667,"1524":1.0172780344020778,"1525":1.114270794647266,"1526":0.29107632325220595,"1527":0.34443426083593237,"1528":0.33224913014903856,"1529":0.49872116075192213,"1530":0.3555428271333551,"1531":-0.6887493562599516,"1532":0.756154920502479,"1533":1.674049645156232,"1534":0.9578320515155369,"1535":0.5613931421624107,"1536":0.5502232216484042,"1537":0.4553462877563456,"1538":0.3887755893148337,"1539":1.133569230446136,"1540":-1.9230926638910113,"1541":-0.38383558778462756,"1542":1.0073733626897965,"1543":0.6355901560271511,"1544":0.3836499951564846,"1545":0.4930971917886642,"1546":0.4421662788537351,"1547":0.25722671393782987,"1548":-0.16015638887583117,"1549":1.17849311622436,"1550":2.230328876388764,"1551":0.5366155182508532,"1552":1.1854453565914185,"1553":0.6863997761342162,"1554":0.4548316234514787,"1555":0.25795998917394797,"1556":0.20261066296849697,"1557":0.060931877546046946,"1558":0.26897660415749536,"1559":0.6654369874674182,"1560":0.37301500732838566,"1561":0.46434777998536547,"1562":-0.02860450038667668,"1563":-0.09904678734611523,"1564":0.5722630803608345,"1565":-0.18384886313904927,"1566":0.1982441675713982,"1567":0.06221707651702206,"1568":0.383095528265157,"1569":0.6316597512264163,"1570":0.5575006711352454,"1571":0.21084044813260255,"1572":-0.2974973186664449,"1573":0.5309326139939871,"1574":-0.10740673762793884,"1575":-0.2808860195290082,"1576":-0.0023041306089724867,"1577":0.520557239214945,"1578":0.38397818346306106,"1579":-0.3382210664108304,"1580":0.5342301323084714,"1581":-0.030307048525755633,"1582":-1.0898409047725617,"1583":-0.03118080098909018,"1584":-0.15939123196141516,"1585":-0.11739798809913211,"1586":0.4069342221040867,"1587":0.7420071680296314,"1588":-2.6183712025002692,"1589":-2.2325541749542697,"1590":-1.2464967215932983,"1591":-1.3048084778581581,"1592":-0.9223685031549387,"1593":0.08272511443381521,"1594":-0.13658150773889471,"1595":-0.020051135987871747,"1596":1.2540199812265205,"1597":-0.1950894670346142,"1598":-8.808209745196555,"1599":-1.1481810078134707,"1600":0.2834526469445425,"1601":0.08593258494337946,"1602":0.38946386262200233,"1603":0.3054879057422783,"1604":-0.23363393291885018,"1605":0.2867958674709454,"1606":7.610161937192182,"1607":6.842571624675961,"1608":3.622842750419055,"1609":0.10721707058779605,"1610":-0.2018608844823235,"1611":0.062112243522743395,"1612":-0.6684581944274866,"1613":-0.11176596906226839,"1614":0.2241108712784086,"1615":-0.2637304255039404,"1616":0.613704921370594,"1617":-0.19522567413122677,"1618":0.49350164550579956,"1619":0.7298493766521778,"1620":0.34726913732409,"1621":0.2759429892291618,"1622":0.5341325463979424,"1623":0.926325230951374,"1624":1.009769980475299,"1625":0.13647304250354023,"1626":-0.05372430672337625,"1627":0.09321135385450074,"1628":0.3069343167545836,"1629":0.9756276809396005,"1630":0.37613819020179207,"1631":0.020381837296991733,"1632":-0.15258225043927073,"1633":0.30970003000527174,"1634":-0.28349585371847974,"1635":0.14100836615738088,"1636":-0.17994227991203854,"1637":-0.1689984649599325,"1638":0.18041486239292306,"1639":0.03698157839204872,"1640":0.6110694975457466,"1641":-1.1158929809235487,"1642":1.3932733491673472,"1643":-0.02034904766274775,"1644":0.8975895502407183,"1645":-0.10549231896885507,"1646":-1.361857923486963,"1647":-0.8699812565367816,"1648":-0.09336977378873136,"1649":0.036739113446573504,"1650":1.1099149838438145,"1651":0.4495993359117224,"1652":0.4123945367583443,"1653":1.797669443764564,"1654":0.10923925183415795,"1655":1.1874058313726177,"1656":-0.023677323329049087,"1657":-0.30457945265719655,"1658":0.2185430921761943,"1659":-1.0107953631131057,"1660":0.18754585523449516,"1661":-0.13719242434155823,"1662":0.8470495159663197,"1663":1.1788949373180937,"1664":0.8138175468370601,"1665":-1.3662787318925373,"1666":0.044853959617031286,"1667":-0.2623307039902906,"1668":-1.3475346749626593,"1669":0.294816933826735,"1670":-1.1167425191815876,"1671":-0.448319182819053,"1672":1.7503217415256467,"1673":-1.7057060278967238,"1674":1.6616730843665888,"1675":-1.8602504927518209,"1676":0.8919258996395126,"1677":1.1677699564111188,"1678":-0.7255086288604239,"1679":-0.554659319203844,"1680":-2.015713564292892,"1681":-1.496879260227159,"1682":0.06658244407691624,"1683":0.6556361275044137,"1684":-1.4574893498263373,"1685":2.0497984105534597,"1686":-0.2649384039268214,"1687":1.524675920563927,"1688":0.12055875792209615,"1689":-1.470448639583187,"1690":-1.4793215299655031,"1691":1.2314087680016308,"1692":0.2049201157514263,"1693":-1.2373726886217162,"1694":-0.45201294682806825,"1695":0.566471545046081,"1696":-0.16448480266326268,"1697":-0.391835418669661,"1698":-0.2939271762616146,"1699":0.44643707406583516,"1700":-1.6308204027119304,"1701":0.1043474965505241,"1702":0.025660801460125202,"1703":-1.5605633529502903,"1704":-2.883927622730498,"1705":1.9065286791529548,"1706":0.05312883079790361,"1707":0.14652787422144134,"1708":-1.0804175256521549,"1709":0.07986751114133261,"1710":-1.9419746247924141,"1711":0.3504414020326377,"1712":-0.30140700031431267,"1713":-0.1707707166404356,"1714":0.15674173470952069,"1715":1.7756647141494168,"1716":0.8751511718024065,"1717":-0.07939732994722755,"1718":2.139249825952392,"1719":0.49534955048867424,"1720":1.4494363476485412,"1721":1.0315385092001117,"1722":0.8497823640152704,"1723":2.2511805732051426,"1724":-1.4103805963813856,"1725":-0.7988513501479995,"1726":0.0468955172651817,"1727":0.7220610076785705,"1728":-1.0697717812144043,"1729":-0.11406215011204145,"1730":0.4325266604580681,"1731":0.7265817131758856,"1732":0.3307355613400328,"1733":-0.9311442745796751,"1734":-1.2628886767617378,"1735":1.2270752687521,"1736":1.0007309847988402,"1737":1.1756132915431983,"1738":0.30024786133739667,"1739":0.4403618028739601,"1740":-2.161459870533648,"1741":-0.6784295662727217,"1742":1.0295016692280632,"1743":1.6998994942132843,"1744":0.750201980869289,"1745":1.5257319849563824,"1746":1.3296796452925685,"1747":-0.22457208466084191,"1748":-0.5759544292382741,"1749":1.04499961175139,"1750":-0.5747458794653474,"1751":-0.4171367662806981,"1752":-1.8383788957135303,"1753":-2.290225335724916,"1754":-0.4681260862578148,"1755":-2.30592945787109,"1756":-0.21960967037871332,"1757":1.5359102426281759,"1758":0.08996494397260452,"1759":1.16514320467336,"1760":2.0249839572236112,"1761":3.2120042769462533,"1762":0.9730899495250278,"1763":1.0523151345308261,"1764":0.9042858590341961,"1765":-0.5298328317524267,"1766":1.4008081634173866,"1767":0.6448825043947293,"1768":-0.054890553002464634,"1769":-0.18833674100193037,"1770":-0.9637606523929653,"1771":-2.8140686113475253,"1772":-1.0262757909708808,"1773":-1.821570430836025,"1774":-0.7024471716057906,"1775":-0.2787886009171776,"1776":-1.7780220249816971,"1777":0.22963271534266852,"1778":0.4399120780941681,"1779":1.2191084150786982,"1780":3.4211837783156738,"1781":1.7782232777373999,"1782":0.16141304465658132,"1783":-0.2732184508853028,"1784":0.9964084177227708,"1785":0.6767815732293703,"1786":0.8235229508874272,"1787":1.3289136825044618,"1788":0.8202920544768327,"1789":0.33540512888445645,"1790":0.8569105144067761,"1791":0.543274323896408,"1792":1.0193201154692506,"1793":0.5466829089996817,"1794":-0.3163890172657546,"1795":0.4817042349080026,"1796":-0.4133441805486429,"1797":0.1920006938972077,"1798":-0.7191753475884838,"1799":1.2812697392748331,"1800":0.4040025175631903,"1801":-1.1438139058240344,"1802":0.1605751766989812,"1803":-0.32162839861533116,"1804":-0.45960244996182953,"1805":-0.13492415893792895,"1806":-0.7847212209821042,"1807":-1.0535733227045896,"1808":-0.3149180333976806,"1809":-0.7535308263217559,"1810":0.42920263691379046,"1811":-0.37726471168618997,"1812":-0.5459477261353004,"1813":0.20781510211064524,"1814":-0.1570321826907988,"1815":0.877254592324424,"1816":-0.07783505812769563,"1817":-0.3533003049074873,"1818":0.4995981981282293,"1819":-0.3936246608060804,"1820":-0.28249516164655364,"1821":0.16202657311563035,"1822":-0.8402902594988731,"1823":-0.2602364972875745,"1824":-0.7799669311028267,"1825":-1.5012949484188067,"1826":-0.4837342679587321,"1827":-0.4978999466217071,"1828":0.18158867316950553,"1829":-0.3434610657348473,"1830":-0.816906188185263,"1831":0.7770193407105396,"1832":-0.14267925203270354,"1833":0.011550506319107843,"1834":-0.3828982941481791,"1835":0.21982617616061836,"1836":-0.41878530344060017,"1837":0.0942556582278085,"1838":0.06383584374930659,"1839":0.7079713359116064,"1840":-0.8849863605021958,"1841":-1.270072718649947,"1842":-0.2664669195214905,"1843":6.566813612421585,"1844":-0.05811839086037758,"1845":0.27585849339492147,"1846":0.2173684736375369,"1847":0.7054115207289365,"1848":0.0787610845311222,"1849":0.45417539191897216,"1850":-0.7358175664842758,"1851":-2.633296623163854,"1852":-8.037803454532924,"1853":-7.103257074606962,"1854":-2.181799128243232,"1855":-0.7733496762830568,"1856":0.7418279031524173,"1857":-0.9092758941080175,"1858":0.022280017503875416,"1859":0.2934192718840332,"1860":-0.20769010373996155,"1861":0.216021157582414,"1862":0.36531970994145885,"1863":-0.4780233516427224,"1864":-0.6112606298546145,"1865":0.2853697187185283,"1866":-0.011169525195641553,"1867":-0.49928180099158387,"1868":-0.44785956618809597,"1869":-0.9212415686484223,"1870":-0.8513073095965221,"1871":0.0627942343200795,"1872":0.0013087011963877663,"1873":-0.6081642013345309,"1874":-0.16348251464385982,"1875":-0.3276494581569604,"1876":0.2277002574899926,"1877":0.19036496215053159,"1878":-1.2613224143266164,"1879":0.2861172191623494,"1880":-0.8689968922897441,"1881":1.1198345466928528,"1882":-0.2616542365705219,"1883":-0.14135151900127188,"1884":-0.3114809298176781,"1885":-0.5447558636347676,"1886":-0.8872122990991446,"1887":1.8488142964623406,"1888":-0.8534753292948561,"1889":-0.5740501160169327,"1890":-0.7426731984116297,"1891":2.468897637367302,"1892":-0.6762675502931079,"1893":-0.8027922679635717,"1894":0.8818441445526932,"1895":-0.15097203608735624,"1896":0.15919104333723952,"1897":0.21324079948534938,"1898":-3.031870310089193,"1899":-0.798222562360639,"1900":-0.7290385062254421,"1901":-0.9418836214893831,"1902":2.4324736815186325,"1903":0.4398947615067737,"1904":-0.2575810703119523,"1905":-1.9011944532583893,"1906":0.7255733173720537,"1907":-0.33408372960699995,"1908":0.6911175201662086,"1909":1.4355545824976357,"1910":-0.266988652457407,"1911":-1.0747043858051342,"1912":0.26367461484022686,"1913":0.9958769466435937,"1914":1.7037530985907132,"1915":-1.2235294286808287,"1916":-1.5113144612876717,"1917":-0.055257532282355484,"1918":-0.9461510442661692,"1919":-0.9245490105434708,"1920":1.5660849746324474,"1921":-1.9004496849414723,"1922":0.894722891952559,"1923":3.195466062816346,"1924":2.3712163430433737,"1925":0.21727327723171494,"1926":2.1961168789921643,"1927":-0.4091471313882554,"1928":-1.192417014534224,"1929":-0.4026123587353818,"1930":-0.6128791256074069,"1931":0.06471141066901301,"1932":-1.0653345067819624,"1933":-1.0367343488448892,"1934":-0.22237234849935703,"1935":-1.329496419560499,"1936":1.389565391658924,"1937":0.4428429516725508,"1938":0.4547007117962461,"1939":-0.7349488522455565,"1940":0.9022212781929685,"1941":0.6959225110323121,"1942":1.5292192268096652,"1943":0.2249787217519047,"1944":-0.38125899891785525,"1945":-2.219712680484463,"1946":-0.8481946334059567,"1947":-0.7743292707893594,"1948":0.49887575319757077,"1949":1.1168344991378913,"1950":0.8970898830602424,"1951":0.7342396846973434,"1952":-0.1679836546646398,"1953":-0.3669379002926953,"1954":0.41890808835976817,"1955":-0.13772861682256163,"1956":0.1500524378404426,"1957":0.506836246047484,"1958":0.7240944852181551,"1959":-0.2854673608592385,"1960":1.4519783279460907,"1961":-1.0498167505803648,"1962":0.7240737077598973,"1963":-1.0868061520783763,"1964":1.6514684797117036,"1965":0.2781943212740327,"1966":1.5284807268285463,"1967":-1.1511908717319839,"1968":-0.14666275624637803,"1969":-0.15993946418775426,"1970":-1.1773842812252957,"1971":-0.4276441462747762,"1972":0.6364996729290565,"1973":-0.36569492045894253,"1974":0.0460225041385257,"1975":-0.8095695568089696,"1976":1.2430091424502687,"1977":0.1877237600869829,"1978":0.0799396059955851,"1979":-1.3269988161428665,"1980":-0.8649625445450705,"1981":1.6183552714753504,"1982":-0.6698174695931736,"1983":-1.7815920356677573,"1984":0.17268882670477514,"1985":-0.5556317929729048,"1986":-0.026627727390984075,"1987":-0.7429588433700762,"1988":0.31124812293634246,"1989":1.3082035321770376,"1990":0.5728248076969278,"1991":1.2131750051048131,"1992":2.330554486701963,"1993":-0.51568219544903,"1994":-0.28969066725618464,"1995":0.7757701906397204,"1996":0.3478552022915678,"1997":0.8680482629699592,"1998":-0.12202703431522703,"1999":-1.986966208741682,"2000":-1.5903400841027668,"2001":-0.10448849506820305,"2002":0.4067680539241191,"2003":-0.6017144060259868,"2004":-1.18275657027257,"2005":-1.545637785550336,"2006":-0.37677919743696026,"2007":1.7018547271070728,"2008":1.5974454363489896,"2009":2.7949033523507443,"2010":0.10308237099772508,"2011":-0.07488677057342202,"2012":-0.504434086736907,"2013":-0.5804722052464552,"2014":1.2411853806544324,"2015":0.5232066566528851,"2016":-2.6825171724996655,"2017":-6.649389362267077,"2018":-4.018184258015538,"2019":-1.7375594418190365,"2020":-1.2663521853318884,"2021":0.9540150113914542,"2022":0.16047757248561373,"2023":0.8638531759413184,"2024":0.16321028801599374,"2025":1.285389742897766,"2026":0.3578626445826048,"2027":-1.7884186729795906,"2028":-0.8476753074119758,"2029":-0.47443316126688884,"2030":-0.6849169195262468,"2031":-0.4092927416267613,"2032":-0.20547218439485757,"2033":-0.31862405303087654,"2034":-0.0035467363108254804,"2035":0.2071655506757245,"2036":-0.5438901309314147,"2037":-0.6678810230234961,"2038":-0.35127027159924373,"2039":0.6680246113391297,"2040":0.40802895013426504,"2041":-0.09433828695316646,"2042":0.12200181325110439,"2043":-0.7170683592241007,"2044":0.2894236193034028,"2045":-0.49566138858595815,"2046":-1.711428988096064,"2047":-0.7132264791569518,"2048":1.4036659448470523,"2049":0.9986526139027287,"2050":1.4620209445562038,"2051":-0.5898545454287795,"2052":0.4972035434273366,"2053":-1.2201588488463702,"2054":-1.2947721460099164,"2055":0.43412602294905756,"2056":-0.7193286055398395,"2057":0.47229249763811665,"2058":-0.29153287938668665,"2059":0.4656627663812146,"2060":-1.2351326204727588,"2061":0.370274598180441,"2062":-1.4780085114274473,"2063":-0.8701410511524844,"2064":-0.537641459382673,"2065":-0.5201823460803277,"2066":1.3731250468914336,"2067":0.8768419447030015,"2068":0.12542658484057642,"2069":-0.04835672897814358,"2070":-0.5518000394844012,"2071":1.2609215408568009,"2072":0.1337839555208524,"2073":-0.47159103783463147,"2074":0.1893778053170385,"2075":0.741652359958386,"2076":-0.3907958208196144,"2077":-0.1300612304062145,"2078":-0.3177226044686893,"2079":0.17764547340711043,"2080":-3.1573188083711017,"2081":-1.9735481249462348,"2082":-1.979999230716362,"2083":-1.8860562782024313,"2084":0.24076127551842752,"2085":-0.4111904339252763,"2086":0.36239724321997085,"2087":-0.78784574556439,"2088":0.7424551147670779,"2089":2.7148611594299066,"2090":8.569878352615708,"2091":5.953739133338419,"2092":0.9660414671048997,"2093":-1.088729871870327,"2094":-0.8533468510920992,"2095":0.31990767960920824,"2096":0.056339030063397987,"2097":-1.4472821728349061,"2098":-0.6155091726845411,"2099":1.7284466116451969,"2100":1.5896834655846341,"2101":-1.0255595212425086,"2102":1.744093532912477,"2103":-0.5625645954678934,"2104":0.8927523844998565,"2105":0.5237026554010781,"2106":-0.007431340479175008,"2107":0.01349916467171734,"2108":0.09410564757359978,"2109":0.7370810027481652,"2110":-0.29110485803056835,"2111":1.1428528900781543,"2112":-0.7060942010360977,"2113":0.47908510056512604,"2114":-0.004996577903966513,"2115":1.5280695934246213,"2116":0.7118142613211836,"2117":0.012195651874795106,"2118":-0.5711098142107408,"2119":-0.4677638379287311,"2120":0.4979399356589765,"2121":-0.23836040037267156,"2122":-0.2314615964117818,"2123":1.5013515083699105,"2124":-0.6071507383963657,"2125":-0.5160088478792594,"2126":-0.7724696584282525,"2127":0.23001152267416916,"2128":-0.5058461754915005,"2129":-1.3524258352420222,"2130":-0.2139321780490851,"2131":0.8810540576100917,"2132":-1.013559148190118,"2133":0.8387658123907464,"2134":0.9915050104923022,"2135":-1.794797262921241,"2136":0.2430154612140995,"2137":1.123015897703505,"2138":-0.12096069429516333,"2139":0.700583999296713,"2140":-1.4142734478244225,"2141":0.11422777649211732,"2142":0.8633347195466017,"2143":-0.784835383657294,"2144":0.8613922517898839,"2145":0.43351224441357544,"2146":1.5187310300985384,"2147":0.647922949197176,"2148":0.43755192921130104,"2149":-1.4290116074141235,"2150":1.0587483311897226,"2151":0.3848560927666726,"2152":-1.7190223546076822,"2153":-1.147471991434076,"2154":-2.457507286105712,"2155":-0.3481857542649705,"2156":-0.24274293042298076,"2157":0.2895866063297373,"2158":-0.47904068459580323,"2159":0.44816268605315773,"2160":0.3255487657599003,"2161":-1.0281714855441493,"2162":-2.1109418103875663,"2163":-0.27756332835522907,"2164":-0.8966650128529007,"2165":-1.380938800422156,"2166":-0.8583770739150183,"2167":1.2392736412548462,"2168":-0.34037947547291536,"2169":-0.3510577179717904,"2170":0.3584739958734188,"2171":0.7743577824443736,"2172":0.6375089371360563,"2173":-0.31512715671183444,"2174":-2.6276403433451563,"2175":-1.205432519856524,"2176":-0.16352111534405905,"2177":-0.3871635178718062,"2178":-1.6400073263560395,"2179":0.20761017748309252,"2180":-0.2636528679092597,"2181":0.25437925000939476,"2182":-0.3606969306827351,"2183":-3.016598659400513,"2184":-2.1146923670661195,"2185":-0.6494159375875688,"2186":0.4761296588790135,"2187":0.5481949814516691,"2188":1.0996947187559674,"2189":1.8047537846942798,"2190":-1.1082517950879145,"2191":0.35306913767440745,"2192":0.15747249862816073,"2193":1.293799466102717,"2194":-0.3923670235956147,"2195":-0.2765757028515716,"2196":1.579876491401866,"2197":0.1026784818423686,"2198":0.6666048803835793,"2199":1.4467649638522688,"2200":-0.6007906207457206,"2201":-0.1245425596773158,"2202":-1.7568130244990439,"2203":0.2593688137341088,"2204":1.9127500820478536,"2205":0.0766638390879471,"2206":-2.8080822116889435,"2207":1.3067034344377801,"2208":0.11222624729248608,"2209":0.9311953199043963,"2210":-0.05877637493599484,"2211":-0.15173161074198105,"2212":0.8120519529487868,"2213":-0.22967810994420684,"2214":0.2836772536997291,"2215":1.5672976319621568,"2216":-0.7292778970283593,"2217":0.8126332597350312,"2218":-0.13578743198450885,"2219":0.8737978128231986,"2220":1.718746861836819,"2221":-0.3753671582072245,"2222":-0.7495243757417904,"2223":0.22634152623764808,"2224":-0.8543649701727364,"2225":-1.5429095997880529,"2226":-1.157096486692597,"2227":-1.023222901472204,"2228":-0.10453018853344055,"2229":1.3689327195857806,"2230":-0.26798664636959385,"2231":0.7337407260114721,"2232":-1.4301764437239346,"2233":-0.7360310009852608,"2234":0.17209267303645676,"2235":-0.6769840116728596,"2236":-1.0316732163743385,"2237":-1.8544469003091046,"2238":-0.8523334938044669,"2239":-0.45717353183963944,"2240":-0.14540309860829745,"2241":-0.3488339626101737,"2242":-0.8993929704376288,"2243":0.44907482085060674,"2244":-5.247710335571461,"2245":-3.1210605926589015,"2246":-0.18024828255691203,"2247":-0.19498524007417142,"2248":-0.14137805017017716,"2249":-0.8252045326113949,"2250":0.1404679480111004,"2251":-0.8919462578634546,"2252":-0.42813791589688344,"2253":-2.3978400769941843,"2254":4.9423209183386945,"2255":2.3590178047193566,"2256":2.099571533171358,"2257":-0.23203919284636873,"2258":-0.5995127117070843,"2259":-0.4873390201940518,"2260":0.3453614860800463,"2261":0.5483383487012081,"2262":1.781547560705483,"2263":2.9255453924849224,"2264":1.2345477002801755,"2265":1.3109137384985485,"2266":0.6138407806700351,"2267":-0.5434927479893538,"2268":-0.632750632997533,"2269":-0.693753579628789,"2270":-0.34105464568072874,"2271":0.245467677145364,"2272":1.3000977845716548,"2273":1.1886028685060495,"2274":1.3024894145874142,"2275":0.5455299140820017,"2276":0.9888156586375434,"2277":0.5779191680615646,"2278":1.5099435724826291,"2279":-1.2142219174545625,"2280":-1.7939828641886721,"2281":1.9414597042981274,"2282":0.9446428144770854,"2283":-0.8579527638542943,"2284":3.040072889201409,"2285":-0.28456378780564107,"2286":1.7906683831028805,"2287":2.3028430504191735,"2288":0.6750655672888104,"2289":-0.4083952750623423,"2290":-0.2623299594912989,"2291":1.1610124262638226,"2292":-0.9688202175819152,"2293":0.5577759610224305,"2294":0.42522518581354407,"2295":-0.07657188916296222,"2296":-2.3499950251193096,"2297":0.4236946903149403,"2298":-1.8514894747458857,"2299":-0.8859571623274125,"2300":-0.8565919213040052,"2301":-2.2052684219009526,"2302":0.7013407568572786,"2303":-1.7047164655955396,"2304":0.5615171831001556,"2305":-0.22207848140684858,"2306":0.23182503863302306,"2307":-1.753064995492151,"2308":-0.7060305716197783,"2309":-0.5266174399297947,"2310":-0.37768677919780114,"2311":0.8434859762683917,"2312":0.8038326086853954,"2313":0.4384111926004715,"2314":-0.8067737254505433,"2315":0.0799781579859644,"2316":-0.7675898338285246,"2317":-0.32967612741061625,"2318":1.9724827646262055,"2319":0.9169989523281502,"2320":-0.28875272176253325,"2321":1.4795720314188514,"2322":1.569592095578215,"2323":-0.7032521653729281,"2324":0.008515803601690089,"2325":1.8662705622205171,"2326":2.987565504383977,"2327":3.378012462775744,"2328":0.19151507019956088,"2329":-1.6403179771369558,"2330":-1.6343656692597095,"2331":-2.0814742678601843,"2332":1.8201318096429868,"2333":-0.06394762923469817,"2334":0.4704632841887493,"2335":0.7924098776148456,"2336":-2.273746731642836,"2337":-0.6406084480704896,"2338":-0.34930571405086874,"2339":1.2467210756349687,"2340":0.6274402348308089,"2341":1.4957381137971328,"2342":1.1543878806628969,"2343":1.0541929988355392,"2344":-0.018022497168692097,"2345":0.01739815229723058,"2346":0.12672461600993745,"2347":-0.3397469791023951,"2348":0.31389043764630453,"2349":-1.6093497518382769,"2350":0.8207391266125021,"2351":-1.2241459446161274,"2352":0.43011880191799123,"2353":-0.3469523166749725,"2354":1.2513268792649146,"2355":-1.7395049769271116,"2356":0.22564858786498684,"2357":0.8711449018059606,"2358":1.4991734207628735,"2359":-0.06370759345229052,"2360":0.035095723790729415,"2361":0.5635083834160478,"2362":-0.9795739350370013,"2363":1.7499455255701346,"2364":-0.6143402658053578,"2365":-1.5204070690372549,"2366":0.11737612373718849,"2367":1.0876590137640179,"2368":1.892010431199458,"2369":-1.5242603174177998,"2370":0.4561160267835225,"2371":0.5946892392507647,"2372":-1.6311863105039768,"2373":-2.16155860599415,"2374":-2.1419412228992893,"2375":-0.33856121851679505,"2376":0.4979900389448929,"2377":-0.24863454480355732,"2378":0.020682311613386385,"2379":0.06428347115247372,"2380":-0.3929587559159234,"2381":0.3230167731140215,"2382":0.6492724734016543,"2383":-0.9984067168692944,"2384":1.2838469694836756,"2385":0.8065596833637757,"2386":1.4105638148119495,"2387":1.0102231742187673,"2388":-0.6835606293092066,"2389":-0.021120507489442112,"2390":0.6014773582457428,"2391":0.012272797742981678,"2392":0.42860144883440326,"2393":-0.3051751998861676,"2394":-1.2182947153192119,"2395":0.8270367725332741,"2396":-2.069492877974836,"2397":0.22913988207027616,"2398":-0.5166775951266332,"2399":-1.940686688795909,"2400":-0.7695788281936057,"2401":-0.10031500976103605,"2402":0.5333314238591931,"2403":-0.6052755976001397,"2404":-0.48697678065709704,"2405":-0.3270166790080001,"2406":-0.2572774754137313,"2407":0.15585335423235425,"2408":6.973539577499141,"2409":8.945290189623334,"2410":4.111397436813574,"2411":0.8824752873469678,"2412":-0.9524465221883465,"2413":2.348432588418416,"2414":0.25580735564188795,"2415":0.2108028529316677,"2416":-0.6007972833066195,"2417":-1.2537763491990197,"2418":-1.3135542444358956,"2419":-0.7482373454362935,"2420":0.23934034627947476,"2421":0.8142687731404321,"2422":-0.3945138382808751,"2423":0.6333764878196724,"2424":-0.671974086517736,"2425":-1.1045383007953657,"2426":-0.4265651059139383,"2427":-1.1364698279181362,"2428":0.47749236597273986,"2429":0.36854888081376497,"2430":0.5003946080832702,"2431":-0.09240247384872421,"2432":-1.1541008951025895,"2433":-0.8200445484098925,"2434":0.9697737325118175,"2435":0.763554086986357,"2436":-0.3175244636305168,"2437":0.007391559841480611,"2438":-0.9758338836437311,"2439":1.3829176722384462,"2440":-2.2220274059615885,"2441":-0.022684111940503567,"2442":0.6522983238983946,"2443":-0.4211586519132706,"2444":-0.15845842875775043,"2445":0.3501980570444711,"2446":0.06782827061553473,"2447":1.3310921401823435,"2448":0.24601889801571356,"2449":0.07568849696179697,"2450":-0.01297736825695344,"2451":-0.38103573310587263,"2452":0.14473702114458076,"2453":0.8847699620080917,"2454":0.6974315306022876,"2455":0.4684374228520707,"2456":0.46943964298243696,"2457":0.5703936622008826,"2458":0.0959482729016926,"2459":0.10126051249079829,"2460":0.8396028179496011,"2461":0.275580696404132,"2462":0.8343597449640113,"2463":0.4714638670903833,"2464":-0.8378327460372811,"2465":-0.749212149625542,"2466":0.8551303626744959,"2467":-0.12709923117260302,"2468":-0.40360535838637285,"2469":-0.047271114569794825,"2470":0.21690336829478554,"2471":1.0637011941535228,"2472":-0.4669454901172456,"2473":-1.566009337899714,"2474":0.0001545610932749339,"2475":-0.5985181348802522,"2476":0.12000556854121898,"2477":0.08945449803239852,"2478":-0.16224461840345555,"2479":-0.03175616423854575,"2480":-0.1122569801940172,"2481":1.5130560533983668,"2482":-1.8143308104970672,"2483":-0.5994589935571576,"2484":0.008789615417521069,"2485":-0.15248746819738615,"2486":-0.710331262042063,"2487":-0.11656535315283864,"2488":-0.30627419672471373,"2489":-1.1655529857603164,"2490":-0.0614558700744874,"2491":0.38628379997321005,"2492":-0.15990905692873525,"2493":0.7460521970965689,"2494":-1.0653600457995904,"2495":0.04705157113383548,"2496":-0.1930013032878287,"2497":-0.01667132632218164,"2498":0.0816625491087931,"2499":-1.1078658157695913,"2500":-0.9341129187240019,"2501":0.2038823201433586,"2502":0.14844505511574566,"2503":-1.2776228334135888,"2504":-0.9258092687185046,"2505":-1.096506218380079,"2506":-0.5638504342232076,"2507":3.896147056144917,"2508":6.802340183474232,"2509":-0.11583399662258517,"2510":-1.1833191303220953,"2511":2.066287660505618,"2512":-0.1310146809364805,"2513":-1.4286239418278657,"2514":1.67553208966848,"2515":1.404376807138768,"2516":3.8472485305825974,"2517":2.421049620013903,"2518":0.4959304959385042,"2519":0.2628635709094092,"2520":1.511557685677373,"2521":0.35519922658412484,"2522":-0.3949856550444176,"2523":0.6526352599307272,"2524":-0.4088990368117738,"2525":0.39249105778079274,"2526":-0.5273215186948831,"2527":1.479940481173838,"2528":1.0354450509041146,"2529":-0.5384817716124497,"2530":0.5942523632557607,"2531":0.04965932829712704,"2532":0.1877230526079394,"2533":-0.07977221650641285,"2534":0.48488520514789224,"2535":-2.098576492727053,"2536":1.4180579957639396,"2537":0.4926655230416478,"2538":-0.9097387392847193,"2539":-0.32512659590515697,"2540":0.25556220048012696,"2541":-1.4662240406920657,"2542":-2.3832207419075613,"2543":0.8031995822337977,"2544":-0.41804714136974874,"2545":0.05150818125217402,"2546":-0.29281171891260993,"2547":-1.0478213014880355,"2548":-1.0069993507174804,"2549":-1.5863716912611814,"2550":-1.588463471894063,"2551":0.9887362026255764,"2552":2.0210910435443954,"2553":2.6215512585198684,"2554":-0.5902130222485976,"2555":0.36966282650246135,"2556":0.6670368536472083,"2557":-0.2361185988004939,"2558":-1.6398074633233528,"2559":0.7799073347533904,"2560":1.0760491355569408,"2561":-0.05154395675974354,"2562":0.8606928007106969,"2563":-0.23825183973888855,"2564":0.7917438449046974,"2565":0.884098938205943,"2566":1.5528153327908902,"2567":-0.848284389431375,"2568":1.5052104511432065,"2569":0.34090875883856275,"2570":1.8639483623780921,"2571":0.7176255297479918,"2572":-0.5587774171025933,"2573":1.22593339846413,"2574":2.1888607122678696,"2575":-1.190986195321808,"2576":-1.1339187209294714,"2577":0.7086165901585887,"2578":-0.9746311936373978,"2579":-0.1150404736727709,"2580":0.023391971058029634,"2581":0.9875769830955717,"2582":1.4934259676069668,"2583":1.0869993306399548,"2584":0.8065203654922023,"2585":3.6613619968917925,"2586":2.1135197969783244,"2587":0.020444679620669037,"2588":-0.5874895563875281,"2589":-0.20335284417236113,"2590":-1.2717967970661255,"2591":1.6378188578551756,"2592":1.8837191645697084,"2593":2.6507637725660125,"2594":0.17584023082983297,"2595":-0.04874050236195509,"2596":-1.2587065758884515,"2597":-0.96408267190713,"2598":1.991818409583295,"2599":-2.336073972606733,"2600":-1.2860607578939127,"2601":-3.1573897474435375,"2602":-0.7666878509715783,"2603":1.08953855927506,"2604":-0.7816232265615335,"2605":1.9177600945294866,"2606":-0.08976547154789899,"2607":-0.006465520209811428,"2608":0.7307319390726941,"2609":0.3982100105742018,"2610":0.7226291314195679,"2611":0.8939174309371171,"2612":0.5962142286901921,"2613":-0.1289037614957772,"2614":-1.827130358258305,"2615":-0.7214915788560188,"2616":-1.6610784782503878,"2617":1.7042374948589387,"2618":-0.7489307999731821,"2619":-0.1675088787941409,"2620":-0.05959997046455871,"2621":0.5714721114328841,"2622":-0.3756116316782777,"2623":0.13829845930774418,"2624":-1.380832926862851,"2625":-1.2271408872948066,"2626":-0.09656480062512776,"2627":0.5717106141443555,"2628":0.5933894703914884,"2629":-1.4742685782577698,"2630":0.7936404079378995,"2631":-0.2946128368438086,"2632":-0.3438736802234942,"2633":0.736983523141904,"2634":-0.043378389949823036,"2635":-1.6594878911378588,"2636":-0.5719594613531037,"2637":0.6032515420321182,"2638":0.7781992740080943,"2639":1.4124421020326996,"2640":-1.649966697693463,"2641":-0.604042348614198,"2642":-1.1009820532717385,"2643":-0.4170293815233045,"2644":-0.13548236904230038,"2645":-0.8937544935451517,"2646":-0.6582182415493313,"2647":2.4234366317419456,"2648":-2.1748071677888543,"2649":1.3695394289926512,"2650":0.9657139540766054,"2651":-0.11811773678538137,"2652":-0.5771052793527043,"2653":-0.3684412900313785,"2654":3.1179602369670825,"2655":1.3590100952358917,"2656":0.3365090836214453,"2657":-0.49013804145514334,"2658":0.601260144976344,"2659":-2.19189828339768,"2660":0.7411553646965775,"2661":-0.9962853469667664,"2662":-1.8518312032573447,"2663":4.6078152821771665,"2664":2.884496345297248,"2665":0.5240287649133792,"2666":0.8271282354837721,"2667":-0.9392175486625203,"2668":-0.39830158527216186,"2669":0.3324668235909602,"2670":-0.7568041410254464,"2671":-0.742872462356543,"2672":1.2181688856288,"2673":1.870262975649458,"2674":1.7675258677622943,"2675":-0.4306381653082981,"2676":0.8128132757756881,"2677":2.4116452828143924,"2678":0.05152119927863247,"2679":0.4446573387486617,"2680":-1.9561542880237015,"2681":-1.257535118074977,"2682":0.775395430027941,"2683":-1.1993268399316404,"2684":0.6406371260396078,"2685":0.30167352610342635,"2686":-0.3818864269959745,"2687":1.5572567630350636,"2688":-0.602794540546733,"2689":0.8514492129050334,"2690":-0.5929606268939122,"2691":0.9456576218877006,"2692":0.37468024828451274,"2693":1.3159703983196425,"2694":-0.9676920333170576,"2695":-0.012919826774901508,"2696":0.02960307855274459,"2697":0.33047832754803763,"2698":1.1575964730933535,"2699":-0.6909169387502101,"2700":-0.753869329041122,"2701":0.16240769567690266,"2702":0.7868408166093296,"2703":0.8430358486451249,"2704":-0.9743964979139733,"2705":0.544355995478626,"2706":0.4781934087536876,"2707":-0.157142837284208,"2708":0.1447942691203971,"2709":-0.3515180604817309,"2710":-0.37598748557333767,"2711":0.22145511829918083,"2712":0.42371959885434196,"2713":-0.28683807855613974,"2714":0.18701745248275492,"2715":0.6912582037897643,"2716":-0.5118093199977299,"2717":-0.5773081161623119,"2718":-0.6141924342120029,"2719":-0.07714042667001623,"2720":0.01935436684184828,"2721":-0.1717671899608806,"2722":-0.2851703939978971,"2723":0.2375237852855095,"2724":0.5564643146137555,"2725":0.6022474967034726,"2726":0.5688383933348223,"2727":-0.13113721409712611,"2728":-0.2876281086682097,"2729":0.02910647018469808,"2730":0.18609793310517908,"2731":-0.14969624704618936,"2732":0.21528685442581122,"2733":-0.8568735201523175,"2734":-0.5455639112595406,"2735":0.31425461999817067,"2736":0.0017003050675028246,"2737":-0.4311264123371652,"2738":-0.5566948791464983,"2739":-0.361732182144753,"2740":-0.3685975527032217,"2741":0.11505013425954885,"2742":-0.27699048606838705,"2743":0.17859137008144743,"2744":1.0640917927919518,"2745":13.245039204933601,"2746":-0.2624759979213594,"2747":-0.796371458001022,"2748":-0.6957157722857764,"2749":0.1603695070815277,"2750":-0.28945246200538505,"2751":0.12308798091304862,"2752":-1.1917878277758653,"2753":0.5564010635180987,"2754":-0.06717125628248324,"2755":-0.23470789172122555,"2756":0.18597719279792238,"2757":-0.1714795018882148,"2758":-0.5531910417156095,"2759":-0.38745367617332443,"2760":0.2642827329164177,"2761":0.33068299765499487,"2762":0.0011723867480638902,"2763":-0.5761034869116352,"2764":-0.18621111600039678,"2765":-0.3901987546843055,"2766":-0.4750303443382718,"2767":0.1406100595491205,"2768":-0.10137601066284681,"2769":-0.7505070146398272,"2770":-0.3911918570248037,"2771":1.0621170379970886,"2772":-0.024761132987608632,"2773":-0.2068899783120376,"2774":-0.18901587150264143,"2775":-0.2776415718357887,"2776":-0.4812577833878279,"2777":-0.1100151135019017,"2778":-0.6757225905103768,"2779":-0.2752197174313893,"2780":-0.4850587893546591,"2781":-0.5597722602460997,"2782":0.06300076201397362,"2783":-0.06476523859274634,"2784":-0.1699314436111905,"2785":-0.11546509447862242,"2786":-0.13110147754950027,"2787":-0.2657679275648912,"2788":1.0677597091999247,"2789":-0.5538067776584725,"2790":-0.7590354469303235,"2791":0.20615816430725836,"2792":0.04778056933069347,"2793":0.34205180597885354,"2794":0.32472742407556615,"2795":0.9052111761744402,"2796":0.11888955092265763,"2797":0.9508252671739164,"2798":0.5754302071991902,"2799":-0.7698104416740899,"2800":0.7290743559272558,"2801":-0.24250869282271856,"2802":0.1327777999679123,"2803":0.12646441889630222,"2804":0.09553504734150416,"2805":0.01969558455045554,"2806":0.15695967942410982,"2807":-0.3932512375600726,"2808":0.3187191254628678,"2809":0.4032384173048774,"2810":-0.22732990984351195,"2811":0.5439568538021847,"2812":0.5220613288441672,"2813":0.19728496877779783,"2814":0.6879627197133614,"2815":0.0458299976355974,"2816":0.06586980819385867,"2817":-12.234879662028789,"2818":0.5706309000578935,"2819":0.6306588344511698,"2820":0.061968432530493556,"2821":-0.04778988979358208,"2822":0.4499479097308798,"2823":-0.1532986147973106,"2824":0.8954255173308068,"2825":0.6693069144968468,"2826":-1.5238018114844138,"2827":2.4786162806337115,"2828":-0.142911207047528,"2829":0.37750776833925526,"2830":0.04426337031362146,"2831":-0.06018969613494442,"2832":0.16274092453069935,"2833":0.4905173392437873,"2834":-0.05506499039503626,"2835":-1.8347746047603315,"2836":-0.16283102831873447,"2837":0.26107759090894167,"2838":-0.016336349782402882,"2839":-0.027468564088807997,"2840":0.11421899869519826,"2841":0.10605442680649887,"2842":0.47548377749603415,"2843":0.22912791811719488,"2844":-0.12569899440918939,"2845":-0.27038515225765314,"2846":0.5252124809961324,"2847":0.21280899257574062,"2848":0.11208233731430492,"2849":-0.1944044173639875,"2850":-0.002041582985419495,"2851":-0.6636858982373582,"2852":-0.17957199373979316,"2853":0.25627876443972736,"2854":0.5167187617598707,"2855":0.26063392068471936,"2856":0.6620515362878177,"2857":-0.1688989017682639,"2858":-0.19401313177994164,"2859":0.2477034297358207,"2860":0.13222315035408405,"2861":-1.1927518295579842,"2862":-0.7104618754039986,"2863":-0.17304099353797858,"2864":-0.10346822921908119,"2865":0.3775978673021944,"2866":0.06525648492678489,"2867":-0.0517122949857696,"2868":0.47608673797541984,"2869":0.8060126052666032,"2870":-0.32342563610951863,"2871":0.25129903817430493,"2872":-0.5370668774573112,"2873":0.04569151168343915,"2874":0.16783432362882092,"2875":0.012678406062303367,"2876":0.1449487489175385,"2877":-0.16101495164381238,"2878":-0.21660115142574093,"2879":0.7774832594797763,"2880":0.6628914748789146,"2881":0.14440632687653046,"2882":0.32824342216617053,"2883":-0.21167901563695093,"2884":0.26281598949984725,"2885":-0.02593818555920932,"2886":0.5011395748908001,"2887":-0.6770144081407771,"2888":0.021799596133103852,"2889":0.8829758404048147,"2890":-0.301773253142288,"2891":-0.10314688146714308,"2892":0.6587600453172858,"2893":-0.09420792296652858,"2894":0.14825082920865537,"2895":0.12225045338071416,"2896":-0.7010428164304351,"2897":-0.24511115808493872,"2898":-0.11318542484528525,"2899":-0.013380685335309214,"2900":2.390933255531006,"2901":0.5305959603295877,"2902":0.44516951609784194,"2903":-0.04743652601669843,"2904":0.17793964297528386,"2905":0.6089388298224833,"2906":-0.219287280180649,"2907":0.5089046096374377,"2908":-0.24734565763377447,"2909":0.27889756212098177,"2910":7.166893202819135,"2911":1.9076068220195042,"2912":1.4890467069083304,"2913":0.9446170587114158,"2914":0.6422309378206033,"2915":0.5994825092545994,"2916":-0.03262027304557139,"2917":0.10595453778836601,"2918":6.626878234929763,"2919":-2.080913494992592,"2920":-1.4151334282884478,"2921":-1.2837395948131431,"2922":-0.08480878078730066,"2923":0.03033273045044585,"2924":-0.07346099538030193,"2925":0.018598043244017405,"2926":0.14848265103780706,"2927":-0.5350982973487051,"2928":-0.1532906429848754,"2929":-0.45356723016992845,"2930":-0.6460079412861334,"2931":-0.3130737745524562,"2932":0.3810872128335987,"2933":-0.3182064138276775,"2934":-0.26998796842949757,"2935":-0.14986297458325173,"2936":-0.5943240808432286,"2937":-0.06957010649422647,"2938":-0.5253935711058478,"2939":-0.2822051306549323,"2940":-0.1364114923319983,"2941":0.07635807079669481,"2942":0.16206571902521916,"2943":0.06573823725583874,"2944":0.400312222223324,"2945":0.3317959071487591,"2946":-0.5614878353306446,"2947":0.6278416822716179,"2948":-0.5061710796537074,"2949":-0.0011642468750163247,"2950":0.27484936000514604,"2951":-0.6831143742019216,"2952":-0.6964433743068771,"2953":0.018038775003837104,"2954":-0.3911273622757159,"2955":0.2169293792705062,"2956":-1.422393772672946,"2957":-0.9747519894216906,"2958":-0.8837944559275926,"2959":-0.045438692185150405,"2960":0.9477884193236952,"2961":0.7554745223950388,"2962":1.0141063193494428,"2963":0.38138702539134806,"2964":0.5249414942351488,"2965":-1.4472216600661514,"2966":-0.16439549624368385,"2967":-1.9748657965624257,"2968":-0.7102098990437217,"2969":0.2729327601566222,"2970":0.13225746478916184,"2971":0.17348673378014845,"2972":-0.17872950634686724,"2973":-1.188384182394774,"2974":-0.50447139798345,"2975":-0.4534238006614164,"2976":-0.9355318722839744,"2977":-0.3910936628388311,"2978":-0.10247655253069701,"2979":-0.24768566230129865,"2980":0.11231713529889267,"2981":-1.0896143771365279,"2982":-6.313295796905576,"2983":-7.428885892528454,"2984":-2.2415808299389175,"2985":1.1089743150710607,"2986":-1.4228900380475602,"2987":-0.9148858768192869,"2988":-0.3133762524280227,"2989":-1.1264822465119848,"2990":0.4552444351871647,"2991":7.132229427394079,"2992":-0.2887443390949427,"2993":0.11974279359636765,"2994":-0.006522685469331122,"2995":0.18628788873994154,"2996":-1.2112679567857534,"2997":-0.18933897498599753,"2998":1.068337992268994,"2999":1.442184597740268,"3000":0.46242238603731983,"3001":-0.7197410504181444,"3002":-0.0409678633989926,"3003":1.0999740120445602,"3004":0.5636832611800192,"3005":-0.009405171325530577,"3006":-0.4676273496571479,"3007":-1.1768070185356365,"3008":0.8982906572363406,"3009":-1.7633180159098172,"3010":0.05672947021862091,"3011":-0.46404123821513743,"3012":0.6901853606059298,"3013":0.07035186083614771,"3014":-1.3197589801718133,"3015":-0.009964220896097145,"3016":-0.22962899562785893,"3017":0.25064975115498067,"3018":-0.20878184422725474,"3019":0.10861095138127504,"3020":-0.5874315458225099,"3021":-0.7737359196974317,"3022":0.1935026810573201,"3023":-0.9298642604042,"3024":0.13945746963213718,"3025":-0.2582485270635714,"3026":-1.06520337070665,"3027":-0.694957039668065,"3028":0.5532756165244782,"3029":-0.4833212623945374,"3030":-0.3480725514540173,"3031":-0.6167715048048027,"3032":0.6482571723494022,"3033":0.09323651477945598,"3034":2.2807692071856525,"3035":0.8242299120039961,"3036":1.4428985937597543,"3037":-0.32376766074593766,"3038":0.19647663421757047,"3039":-0.4105970146575124,"3040":-0.23784174987577805,"3041":0.22433080947181436,"3042":1.1296653706325719,"3043":0.011251451873085752,"3044":-0.008172645017152985,"3045":-0.8872863315641457,"3046":0.5859596184230803,"3047":-2.2324280798550915,"3048":-0.06964599062071058,"3049":1.6976840211557982,"3050":-1.708259922826967,"3051":-0.8528860601206159,"3052":-1.1217926922145245,"3053":-0.47418044199328496,"3054":1.6372368604300456,"3055":-0.24760387329514588,"3056":-0.5550135184651412,"3057":-0.3966088877141341,"3058":-0.004868399510349909,"3059":0.4369629959952919,"3060":-0.012263297740303113,"3061":-1.2342308083679634,"3062":-1.2929038767086773,"3063":-0.03125507487928415,"3064":-1.559276401721835,"3065":-2.104652720451985,"3066":-0.16356255519247295,"3067":-1.1683316250153633,"3068":0.7762614997533145,"3069":-2.5667358029764085,"3070":-1.2458289404311924,"3071":1.7823264788267104,"3072":-0.2296628044227569,"3073":0.4842861284035181,"3074":-0.10448166642810007,"3075":0.8957491335559928,"3076":0.3697657252333692,"3077":0.9251642519763107,"3078":-0.4486218566604221,"3079":-0.2851472014288879,"3080":2.0170228474738616,"3081":0.45142262091885027,"3082":-1.6421275437824583,"3083":-1.9293800029317665,"3084":-1.2600022364242744,"3085":-0.9877923134991503,"3086":-0.18127018520456917,"3087":0.049303164268128474,"3088":0.11434718263423245,"3089":-0.2812744414265044,"3090":1.11079037088336,"3091":-1.6587095435543953,"3092":-2.654298245291122,"3093":-2.9283872301583056,"3094":-3.3065100059625285,"3095":0.5243803267045698,"3096":-1.7545605468017935,"3097":-2.3038902290749763,"3098":0.7042222127383998,"3099":0.31456923108879714,"3100":-0.42928634242048525,"3101":0.7661560619912569,"3102":0.31966405485223126,"3103":-0.043120013893091454,"3104":-1.4468076087441468,"3105":0.7896272133787907,"3106":-0.16362291100739368,"3107":0.33708867110220825,"3108":0.9946400683437052,"3109":1.9517233087765078,"3110":-0.8052109353997573,"3111":0.48134318835165574,"3112":1.2521715397170639,"3113":-0.3419627178673194,"3114":-0.4795318927673812,"3115":1.8873812242157944,"3116":-0.6615929232254191,"3117":0.8367501055353962,"3118":0.3431213002660675,"3119":-0.563599911842091,"3120":0.4356875110962709,"3121":-0.46189099984799764,"3122":0.25899600355280217,"3123":-0.9460441919564748,"3124":1.7694324420883893,"3125":0.1117916050604448,"3126":0.9059777379911248,"3127":-0.6681539742869128,"3128":1.34094923828535,"3129":0.36679764567170037,"3130":-0.2300233154095404,"3131":0.582019702013205,"3132":-1.7165248151526828,"3133":-1.007269517181188,"3134":0.17782921350495567,"3135":-0.2170968238154741,"3136":2.513792895601522,"3137":1.5250889614610816,"3138":1.9777003287281725,"3139":0.9794703860589846,"3140":-0.3887416002521862,"3141":0.7797807576898445,"3142":-1.2400842610531246,"3143":-0.7423518073973396,"3144":0.9234329816546686,"3145":1.9581607531109357,"3146":3.626339427654059,"3147":0.6108510988225021,"3148":2.02477780329806,"3149":1.064328292626687,"3150":-0.6090882923151401,"3151":-1.506296936976262,"3152":-0.04665799044064452,"3153":0.11598864824397292,"3154":-1.3601709306002172,"3155":-1.715554931231866,"3156":-1.4061468382489293,"3157":-0.25238541023879324,"3158":-1.5304023901900143,"3159":0.16640434607633106,"3160":-0.8936305706528929,"3161":-1.445285010616346,"3162":-1.0275333709287389,"3163":1.5840261952802857,"3164":2.4429741016273123,"3165":1.351563795385231,"3166":0.07807930198275599,"3167":1.6705062489632767,"3168":-0.9454279730763226,"3169":0.8420563687343363,"3170":-0.725128643329129,"3171":0.9419319582250093,"3172":-1.3989893028213067,"3173":-1.638686281213537,"3174":-0.21781778576714028,"3175":-0.8150857558370654,"3176":-1.4859170604330012,"3177":-0.06596797721732915,"3178":-0.4000607011574387,"3179":-1.2599977440892292,"3180":0.35073693323049887,"3181":-2.0282689660611295,"3182":-0.7019658096578266,"3183":0.00979508169573731,"3184":0.5753255514929994,"3185":1.0263934224573728,"3186":-0.2682702018965316,"3187":-1.336452227641509,"3188":-1.4834806574450863,"3189":2.768437124862199,"3190":1.892592793737703,"3191":-0.0736309402389165,"3192":1.7302216660852552,"3193":0.21138293422976426,"3194":-1.6901796390027775,"3195":-0.3976971236523733,"3196":-1.7575942808233895,"3197":0.470778959692043,"3198":0.396859860916388,"3199":-1.9541808183764748,"3200":2.2344177459175354,"3201":-0.7334642879162117,"3202":-1.0978977007048645,"3203":-0.34871630052816305,"3204":-0.29173675852179654,"3205":-0.43028920475611937,"3206":-0.16600956817526868,"3207":-0.6662732877394559,"3208":-0.8727669706915239,"3209":0.30747158031310334,"3210":0.07063929029272727,"3211":-1.0507008449831,"3212":-0.3765009203230657,"3213":-0.2863914166015331,"3214":-0.15325335998594994,"3215":-0.3857139421577793,"3216":0.5530942307794285,"3217":-0.39550252624727156,"3218":-0.47514578180231715,"3219":-1.145095452268713,"3220":-0.9228258825648348,"3221":-0.612037209094647,"3222":-0.49383974384879253,"3223":-0.6461342952228729,"3224":-0.3410245682441724,"3225":-1.4691541433345376,"3226":0.3440046760951085,"3227":-1.1999008938747395,"3228":-1.3425596915216835,"3229":-1.0650315118545448,"3230":-0.7543638936069552,"3231":-0.2403346959746467,"3232":-0.3103102697298309,"3233":-0.35323724048146427,"3234":-0.5228170953117558,"3235":-0.053618472113291286,"3236":2.8924194507875547,"3237":-1.2453035559789631,"3238":-0.2124725781716225,"3239":-0.32399344835597016,"3240":-0.40656442974446655,"3241":-0.2284699504288847,"3242":-0.41396287056284764,"3243":-0.9233561240407515,"3244":-0.3561801457439585,"3245":0.6884759876327008,"3246":-1.1419024826341528,"3247":-0.8978299505583485,"3248":-0.3220524526346852,"3249":-0.22768499072824472,"3250":-0.3140115340081405,"3251":-0.41513181547937184,"3252":-0.09872425342081252,"3253":-1.396224463085469,"3254":-1.674364679564507,"3255":-1.2040259059883405,"3256":-0.9843058323684918,"3257":-0.8620800014512633,"3258":-0.5748172725093136,"3259":-0.3531578403547536,"3260":-0.530132173163415,"3261":-1.2094903916367823,"3262":-0.08319591561218458,"3263":0.4782218247738974,"3264":-1.0419518113182862,"3265":-0.6954284310930752,"3266":-0.6984544207028097,"3267":-0.4013146535464085,"3268":-0.4064209501139536,"3269":-0.3744998406573813,"3270":0.3692582570904435,"3271":-1.5422372502372579,"3272":1.068331732440642,"3273":-0.5725847242852852,"3274":-1.2057384496116532,"3275":-0.8608088385089075,"3276":-0.4096456428485152,"3277":-0.23896761196891309,"3278":-0.24568760030906991,"3279":0.44928345521205176,"3280":-1.3380475238938858,"3281":-0.923114089590755,"3282":-0.007111557235822842,"3283":-2.0524266757570655,"3284":-0.7221223792982236,"3285":0.38648852388531213,"3286":1.2916968801439184,"3287":1.991493224178122,"3288":1.1966575548147307,"3289":-0.7241578778808685,"3290":-0.13165763748860965,"3291":1.036741667272961,"3292":-0.005726884146681533,"3293":-0.1862736196726201,"3294":1.926773265355892,"3295":-0.3563322185464147,"3296":0.4056156365969303,"3297":-0.029689603100167734,"3298":-1.4759881309544507,"3299":1.06291220895377,"3300":0.437120076754954,"3301":0.043739933831016306,"3302":-0.49661049102837684,"3303":-1.0004940744532405,"3304":-0.5874197810330728,"3305":0.9581652129294471,"3306":2.0152521998776667,"3307":-1.370042579785222,"3308":-0.7324825556373961,"3309":-0.19322944189353916,"3310":-1.8249002583515133,"3311":-2.704520382294487,"3312":-2.3672165761288837,"3313":-1.1750211868533014,"3314":-0.5424328948418841,"3315":-0.4768812659519531,"3316":0.8488602008849984,"3317":0.8080779360870948,"3318":0.8942315428475833,"3319":0.9842177510797597,"3320":1.6504081994265623,"3321":2.858179293490513,"3322":2.529040223819826,"3323":1.2382148935459387,"3324":-0.6124717852815705,"3325":-0.11956277353610574,"3326":2.1223055770549433,"3327":0.3424537351677433,"3328":-0.8284194621734504,"3329":1.5168390218672934,"3330":3.388625715796144,"3331":3.74046023915658,"3332":2.594955883288949,"3333":2.7275192085577427,"3334":-0.08901771907247825,"3335":0.40129097232841193,"3336":0.13803012018523073,"3337":0.5037922864465424,"3338":0.8588780608455944,"3339":0.5808902763360352,"3340":-0.1230691879681433,"3341":0.9794073636908063,"3342":-0.44960614096078155,"3343":1.6890867135827736,"3344":0.2774606591475945,"3345":-0.6023387648315829,"3346":-1.1809385286649214,"3347":-2.1421750878536296,"3348":-0.5750842483368982,"3349":0.06275746384103482,"3350":-0.4364260337112793,"3351":-1.2429100833948352,"3352":-0.04431170810591348,"3353":1.447666474511483,"3354":0.07477217527100821,"3355":-1.4759774999912154,"3356":0.6996618309150129,"3357":-0.8623105291103618,"3358":1.9046366349132342,"3359":0.23751824640198818,"3360":-1.4997762244907897,"3361":-0.01672440355987989,"3362":-0.699642295246738,"3363":0.33301258598175176,"3364":-0.3020160788759707,"3365":0.7494648209483824,"3366":1.0270777623374236,"3367":-0.0007854143933772713,"3368":0.20877947223461735,"3369":0.8962269623785787,"3370":1.1978628888427252,"3371":-0.13569179026490413,"3372":-0.12470642033122539,"3373":0.5227044519723218,"3374":0.7919151113658047,"3375":0.5293160309001045,"3376":-0.2082496557023025,"3377":0.2775702722657072,"3378":0.20900274049386208,"3379":0.11695458345335649,"3380":0.2716332041804946,"3381":-0.221927811476372,"3382":-0.9704696335393473,"3383":-1.195726501248835,"3384":0.2881907999270008,"3385":0.10217929641707267,"3386":-0.8531230547858358,"3387":-0.116934775300867,"3388":0.1828570493001994,"3389":-0.5413080614483166,"3390":0.44833040584340905,"3391":-0.1811669709399179,"3392":-3.6707011545053922,"3393":-1.8687422361230581,"3394":0.17146105656463356,"3395":0.47625137667442013,"3396":0.16283047504668255,"3397":0.6029054111712695,"3398":0.42826138923880835,"3399":-0.03353182601792255,"3400":0.7039394643376059,"3401":-1.5792837471626473,"3402":-9.698023010619693,"3403":1.5683737204329076,"3404":0.5500771083709697,"3405":-0.23659563741232206,"3406":-0.8982339755013306,"3407":0.48236308798055055,"3408":0.4598783930640377,"3409":0.4253332360832175,"3410":-3.365206882070511,"3411":-1.9089485096076115,"3412":-0.8609675368846862,"3413":0.39021350286452605,"3414":0.2642474157882897,"3415":0.25912228914185975,"3416":-0.10270924631847284,"3417":0.5931360577391288,"3418":0.16748791368597785,"3419":-0.413181366886868,"3420":-0.7887282155458089,"3421":-0.5234205093760499,"3422":0.18484171781263647,"3423":0.6131679413370701,"3424":-0.02447220807496987,"3425":0.1553378756823223,"3426":0.38736632025524953,"3427":0.5163746936526076,"3428":-0.024178058558067556,"3429":-0.29510743648920784,"3430":0.13062406884967384,"3431":-0.26180548142980137,"3432":1.1264439242593602,"3433":-0.2787960382080082,"3434":-0.03197088827871376,"3435":-0.33297509631637484,"3436":0.10922853347295161,"3437":-0.07007280043566116,"3438":-0.2048381501075458,"3439":-0.564431040238877,"3440":-0.6614368519656445,"3441":0.3627686544965789,"3442":-0.17254521660194072,"3443":0.5785050889048837,"3444":-0.7150798224006173,"3445":-0.3642585453161465,"3446":-1.1569421186534508,"3447":0.26919906695488466,"3448":-1.6019187726182995,"3449":-0.8791238346226427,"3450":-0.6010001186392344,"3451":-1.4829163709364102,"3452":-1.8413892233307763,"3453":0.26461266638968506,"3454":-0.20895838054435997,"3455":0.8110862836831721,"3456":0.771003663292701,"3457":0.11053059015524139,"3458":-0.5877714497348828,"3459":-2.0706490671580213,"3460":-0.10983857999661836,"3461":-0.3314665130262562,"3462":-0.3440085555791883,"3463":0.3766171854342434,"3464":-0.7879964216538479,"3465":0.8274292687562836,"3466":-1.681782697972178,"3467":-1.4142610386187342,"3468":-1.931449598615336,"3469":-1.621136376315283,"3470":-0.5649498343565438,"3471":-0.305756378964512,"3472":-0.7492635983847497,"3473":0.022328554614090036,"3474":0.7855835151708156,"3475":-0.5006256999612503,"3476":-0.9701549046188693,"3477":-0.45826527904656933,"3478":-1.5732901427569577,"3479":-0.7630665835687166,"3480":-1.2729360809090149,"3481":-0.16545315075230047,"3482":-0.0647217833786936,"3483":2.10932785490725,"3484":-0.7932839764098912,"3485":-2.0224119422645352,"3486":-2.1843701851388886,"3487":-1.2595545886169157,"3488":-0.25432983031325346,"3489":1.271423432600746,"3490":0.5983317457293692,"3491":0.4925207109128371,"3492":-0.2947994796654247,"3493":-1.0424883077874212,"3494":-1.4238223007064321,"3495":-0.65763085104505,"3496":-1.0370248195739904,"3497":-0.7105166942100384,"3498":1.389295219804001,"3499":-0.5010122743554958,"3500":-2.3550693722555125,"3501":-0.19257766974473153,"3502":-1.1432967704023391,"3503":-1.20420177988018,"3504":-1.665518696806144,"3505":-1.29610617426367,"3506":-1.2880049467009111,"3507":-0.5639554974534936,"3508":-1.1486696557501899,"3509":-0.8958813418531758,"3510":-0.027070793872932687,"3511":0.012709739674613103,"3512":0.332009564518965,"3513":-0.7967182460513976,"3514":-0.5126385756222837,"3515":-0.9123271432153062,"3516":-2.1791250158386304,"3517":1.3732205685717074,"3518":-0.5711656114033912,"3519":1.448106040896655,"3520":-0.1898997271898143,"3521":-0.4205683390811772,"3522":-0.24165309079521827,"3523":-1.131344443915112,"3524":-1.1894720490784156,"3525":0.35331492558274397,"3526":0.7790890742095408,"3527":-0.2938923547533353,"3528":1.277429888765508,"3529":0.934167280622176,"3530":-0.11594232738999753,"3531":-0.36643349236931083,"3532":0.1804918957468319,"3533":-0.44698870291468734,"3534":1.8081957356454985,"3535":1.4353129588575408,"3536":0.4896606208306518,"3537":1.028302049342357,"3538":2.23907010348346,"3539":0.9227484660429316,"3540":0.590278088009559,"3541":0.821608648216373,"3542":0.2885378488272068,"3543":-0.0526213934324844,"3544":-0.3660716235345848,"3545":-0.6349159640954062,"3546":-0.1594778702432713,"3547":0.31369579425799077,"3548":1.3351168054662965,"3549":0.04282853678269326,"3550":1.5320081791073459,"3551":-1.2108641345729634,"3552":-0.2885085912311037,"3553":0.5220245815140253,"3554":-2.3259211529643613,"3555":-0.03879972020619418,"3556":-0.9806095300743204,"3557":1.203786060729898,"3558":0.2626976378375434,"3559":2.425706908729084,"3560":0.9875485817642451,"3561":1.768549760530804,"3562":-0.40523449651744375,"3563":-0.8949806084862494,"3564":-0.36438613251704743,"3565":1.7818797130917872,"3566":0.27122002401715867,"3567":-0.1705656201337058,"3568":-0.5855662018191307,"3569":0.31806481431818723,"3570":-1.2102643983628172,"3571":0.7076024245730423,"3572":0.2260649941141828,"3573":-1.5212663734588114,"3574":0.6450306765414021,"3575":0.14133631713227396,"3576":0.2924758912267832,"3577":-0.7482306306602746,"3578":0.7861041253803521,"3579":0.31780282066829,"3580":2.575554394767936,"3581":-1.1801082118800852,"3582":-0.016118970937543862,"3583":-0.43295650597708757,"3584":0.8208452776069184,"3585":1.1334134315558675,"3586":1.4062300379671338,"3587":1.4380535231766314,"3588":0.3883672661823308,"3589":-0.26298452278696005,"3590":-0.9811942907857177,"3591":0.1456930886842329,"3592":1.5447809739368363,"3593":0.22724932370289916,"3594":2.172889145420484,"3595":0.05329058108559717,"3596":-0.23411291748235502,"3597":0.733178709291923,"3598":0.8381982562156868,"3599":0.4860529636140512,"3600":1.9088708301647304,"3601":-0.4776332752721642,"3602":1.5930258639818031,"3603":2.3789464245630323,"3604":0.03554421277078362,"3605":1.0436789700641143,"3606":0.50538681693617,"3607":-0.05805954639968784,"3608":1.1268933237785441,"3609":-1.0287816197782524,"3610":-0.6864856259169354,"3611":0.08243428777149557,"3612":0.4139416933061866,"3613":0.3192005736665175,"3614":-0.16071197101917203,"3615":-0.4274712278938883,"3616":-0.8537338988007412,"3617":-0.6092670790550487,"3618":-0.698518939546819,"3619":1.2927971321472689,"3620":-0.4223450106821213,"3621":-0.9200020658464363,"3622":0.08764772695443217,"3623":0.36980373301895836,"3624":-1.6987998312392498,"3625":2.1670314936333224,"3626":-1.404917565142581,"3627":-0.09127949921425514,"3628":1.3845994755469615,"3629":0.007241276286013828,"3630":1.158465003326589,"3631":0.5244438651782396,"3632":0.9206365523896112,"3633":-0.22386392967746513,"3634":0.7331451648774832,"3635":-0.3254852907221132,"3636":-0.31427043647619407,"3637":-1.2361528540676676,"3638":2.506851501466848,"3639":3.2872267282853382,"3640":2.1624476783423074,"3641":0.9077322720138948,"3642":0.7109741757907392,"3643":1.0276750492928384,"3644":0.5526799708851761,"3645":0.17207711816431187,"3646":1.316844833581874,"3647":-2.325909736212549,"3648":-3.6713196875721876,"3649":-3.876264157053669,"3650":-0.844482060248666,"3651":-0.6449284287984721,"3652":-0.08252953445867758,"3653":0.8843743049410173,"3654":-0.4596027029337469,"3655":0.9010365135283751,"3656":-1.8800532252697644,"3657":-4.677610224939621,"3658":-4.409650163812164,"3659":-2.0260360308836,"3660":-1.2409217275463034,"3661":0.11818058935624855,"3662":-0.3306557162761739,"3663":1.0080654263547435,"3664":-0.09306238456118032,"3665":0.22412718416482486,"3666":0.3922599317982892,"3667":-0.03429573319869436,"3668":-0.3767231498366685,"3669":-1.0040373171084094,"3670":1.600096829559986,"3671":0.17440948842780368,"3672":1.0726561058648791,"3673":0.31109653169499935,"3674":-0.8860006313434328,"3675":1.1354067508765224,"3676":-0.5820398733484081,"3677":0.087393789804567,"3678":0.1539250362423712,"3679":-0.6504625584586778,"3680":0.9865939625504304,"3681":0.1892413374440068,"3682":-0.10237563057067935,"3683":-0.8895457287662509,"3684":-0.8869386534095894,"3685":-0.6013027541452005,"3686":-0.7196495243786903,"3687":0.08048774425374838,"3688":-0.5055417752372209,"3689":-0.3699388346281413,"3690":0.8662171180891237,"3691":2.2441781494713315,"3692":-1.6579642777854817,"3693":0.5417148481124716,"3694":-0.4403438309630111,"3695":-0.4372568664127319,"3696":-0.9965854935324201,"3697":-0.7780615823397168,"3698":0.5608235560941217,"3699":0.44942502887755587,"3700":-0.22266572537751744,"3701":-0.4654025728151375,"3702":-0.4355170927612186,"3703":0.10182831546476073,"3704":0.6733614648197052,"3705":0.4932112106892615,"3706":0.9061943889287393,"3707":0.7140522064590749,"3708":-0.6358949916864906,"3709":0.4850162779229989,"3710":0.6042131572018038,"3711":0.6995917188671046,"3712":0.08348114773889447,"3713":0.6342832915982645,"3714":-1.017749894927009,"3715":0.06791326266774518,"3716":0.22515811526161247,"3717":0.2596483180009535,"3718":-0.015918852489643663,"3719":2.457345806139167,"3720":2.165686958341145,"3721":0.4426768483241089,"3722":1.2328178060893957,"3723":-0.0472355618494139,"3724":0.4443812998694286,"3725":1.77898093969798,"3726":-0.6530442375602659,"3727":-0.8948371607472003,"3728":0.192369131414875,"3729":-0.8053233188783847,"3730":2.836712097969105,"3731":4.598024250835733,"3732":4.400219024609429,"3733":3.1876146622028507,"3734":2.0306888546213737,"3735":-1.3503169466517126,"3736":-0.5655319626356279,"3737":0.2609653579706658,"3738":-2.0356570372034484,"3739":-1.8401474812479794,"3740":-1.1838546820323979,"3741":-3.2858283234313133,"3742":-3.084114958844541,"3743":-0.9018767489331658,"3744":0.5878107995566241,"3745":0.6821942491613608,"3746":-0.9040704715901203,"3747":-0.0017454859198355603,"3748":0.12515844580392463,"3749":-0.15000967163941012,"3750":-0.2645697820107704,"3751":-1.586682437764488,"3752":0.3553741001185565,"3753":-1.4172976785421891,"3754":-1.3360111518529287,"3755":-0.3614261214599472,"3756":0.02775836463654429,"3757":-0.24397677745584026,"3758":1.4263203347997908,"3759":-0.23881178359690225,"3760":-0.20614029874102907,"3761":1.7298842927274722,"3762":-0.7591135736842745,"3763":-1.7202256979490167,"3764":1.0896681217074213,"3765":-0.41220278070297683,"3766":-0.03218675827095335,"3767":-1.7841094111941278,"3768":-0.8801196249002332,"3769":0.07946590071912027,"3770":-0.2784634371741575,"3771":0.9397657502332976,"3772":0.004750170879305467,"3773":-1.1755417947896296,"3774":-0.8709037208144076,"3775":0.33721934892365685,"3776":-0.2391430585398822,"3777":0.4894556602584276,"3778":-1.2447601770708931,"3779":0.7594715482257876,"3780":-0.32009599948795425,"3781":0.287049964497519,"3782":0.4720771987374046,"3783":0.49472273881091156,"3784":-0.011726039463790054,"3785":-0.7348209278633724,"3786":-1.1498401733668675,"3787":-1.058018802339617,"3788":-0.5026711316553493,"3789":1.7044115146790937,"3790":-1.0884660717176255,"3791":0.0505424010012799,"3792":-0.5112424973089238,"3793":0.25236182693876535,"3794":-0.2184751470600394,"3795":0.9382110907457845,"3796":0.400181868922075,"3797":1.211876712145482,"3798":-0.1539101447562204,"3799":0.06762423544398445,"3800":0.9781577710574181,"3801":-0.8406990911723562,"3802":-0.253913527049766,"3803":3.0062053682439043,"3804":3.0487471299902547,"3805":0.03752205887991948,"3806":-0.3513424184493,"3807":0.2617366854735283,"3808":-0.20090013820571193,"3809":-1.507250183890038,"3810":0.22424779453744698,"3811":-0.2183320522505376,"3812":-5.90834040768236,"3813":-7.814067301162072,"3814":-6.293314869582543,"3815":-1.7867176194449705,"3816":-0.7831499868350488,"3817":0.6444790808357886,"3818":0.01732994423868924,"3819":1.445938878817298,"3820":0.2792702860337954,"3821":0.8316810074595777,"3822":1.837017044288581,"3823":1.391583710565564,"3824":-0.8925833825482591,"3825":0.04730622581121826,"3826":0.44035692641984986,"3827":-0.8661459748675527,"3828":-1.603116014555743,"3829":0.3686855610492481,"3830":-1.3542129382270078,"3831":1.523476375364313,"3832":0.11799505109457889,"3833":-0.5437088876123578,"3834":-1.12829105274408,"3835":-1.042407728529982,"3836":0.29684419497852504,"3837":-0.40550723517018383,"3838":-0.6330713336775129,"3839":0.7864656558231132,"3840":-0.05803415711076262,"3841":-0.43765190286361866,"3842":0.7080601788913636,"3843":-0.38479099532969246,"3844":-0.012871447387553138,"3845":1.468198983792199,"3846":-1.09577744722451,"3847":-0.24307335832976273,"3848":-0.7630718528286526,"3849":-0.3521696838700236,"3850":0.7133282789640599,"3851":1.4286460273153074,"3852":-0.617767159831341,"3853":1.1106456634853907,"3854":-0.9061696625464851,"3855":0.15240575415770463,"3856":-0.09593596483204346,"3857":1.5796133620751904,"3858":-0.05066767023607941,"3859":-0.41807801349367385,"3860":0.16518754214931344,"3861":-2.0271183785825517,"3862":0.9208238766058473,"3863":-0.30492330827496383,"3864":-0.35599103703033774,"3865":0.8109381322654862,"3866":0.6388088793763821,"3867":-0.7250449942243852,"3868":-0.21654062211273267,"3869":0.8760407809155925,"3870":0.9140101753524046,"3871":0.5817766316042908,"3872":2.350539512894333,"3873":-0.35284274989410186,"3874":-0.5494960242383,"3875":0.31070966304847986,"3876":-1.7666705688148985,"3877":-3.211582424715533,"3878":-0.5009714005189664,"3879":-1.091560158790103,"3880":-0.9465238844301082,"3881":0.1914855047836279,"3882":0.9106984819177263,"3883":-1.85188284880423,"3884":-2.678282655585752,"3885":-1.427530723537785,"3886":-1.6886441326579706,"3887":0.21800625199603502,"3888":-0.38474558354927035,"3889":2.0004231789576443,"3890":-1.3882255139500184,"3891":2.604215039317475,"3892":1.0317344455140036,"3893":-1.326387746118285,"3894":2.835660840571432,"3895":2.703425417542707,"3896":4.895405669084044,"3897":4.40718090495119,"3898":0.5089261114294964,"3899":-0.24901013168176134,"3900":-0.1638278974028048,"3901":1.5511765683135434,"3902":0.8254157310211994,"3903":-0.9611587472649168,"3904":-0.5524030106801621,"3905":0.16645867750689852,"3906":-0.695964158845592,"3907":-1.5781758860057165,"3908":0.16342819174142212,"3909":-0.15048798895925847,"3910":-0.5342296490038712,"3911":1.2500297045098008,"3912":-0.9079387124973674,"3913":0.8139143633430417,"3914":0.3089442927819517,"3915":1.1723750675794085,"3916":0.6342426527378766,"3917":0.07151686020451203,"3918":-0.7254891973169721,"3919":0.6719753006081284,"3920":0.39686587218601665,"3921":0.6834810794818864,"3922":-0.6963481046203835,"3923":-0.9489440302074688,"3924":1.6243303956566755,"3925":0.3005693956637527,"3926":-0.9416466101609999,"3927":-0.5551565796131263,"3928":-0.9364095558746865,"3929":1.726103365514462,"3930":1.3566110536825298,"3931":-0.9837256918932847,"3932":-1.9365195686187893,"3933":0.6713709460657936,"3934":-0.14376486163119334,"3935":0.3061853234219141,"3936":1.99221218004409,"3937":-0.8140271820035545,"3938":0.49705605001390235,"3939":-0.35946608715410566,"3940":0.7429518728221721,"3941":1.792935283071669,"3942":-0.28327308900866266,"3943":0.8585078498728055,"3944":0.21764112848020134,"3945":0.21445234888223208,"3946":0.2666018513618103,"3947":0.3681389214347842,"3948":1.481735731244593,"3949":-0.3490351215769481,"3950":0.311360530341066,"3951":-0.8525301605695254,"3952":-0.3418097377815569,"3953":-0.6884983360185002,"3954":1.614339005367496,"3955":0.5666126193014369,"3956":-0.07171962719401412,"3957":0.44488512698459914,"3958":0.32233303443014816,"3959":1.0799601576405522,"3960":0.1669449462301774,"3961":-1.9866394075716995,"3962":0.5608473042773197,"3963":0.7027976123674272,"3964":-1.2609260129066426,"3965":-1.6348377487451475,"3966":-1.8308797225859612,"3967":0.22673819133456796,"3968":2.2386192191244634,"3969":2.4118286156829254,"3970":3.0359161096325153,"3971":1.794296054886799,"3972":-1.1284299401675046,"3973":2.5186293206323302,"3974":1.8990691648249758,"3975":2.969624761474801,"3976":-0.5862115143954347,"3977":0.6802401444171079,"3978":1.5887407146668118,"3979":0.3464651309909294,"3980":1.9928255636556556,"3981":1.989571151487304,"3982":0.49254370511507345,"3983":-0.24584311717538543,"3984":1.0195008200465836,"3985":0.92398180437611,"3986":1.1181990199951066,"3987":-0.6686924451202055,"3988":0.16357112882517857,"3989":-0.02930603781763676,"3990":0.37279422035080706,"3991":0.5688498194942221,"3992":-0.9537149991291294,"3993":-0.5241008633370019,"3994":-1.3921389804683797,"3995":-1.4987160908131025,"3996":-0.9200445435174465,"3997":-2.559508072582609,"3998":0.2968825315706354,"3999":-0.572057367349066,"4000":-0.23321842819092367,"4001":0.8275986410192469,"4002":1.493493419510013,"4003":-0.6250364646657526,"4004":-2.2098587683831084,"4005":-0.8229080099760103,"4006":-0.996632130847309,"4007":0.13124585735063796,"4008":-0.5935874304717128,"4009":-0.3631536144246659,"4010":0.45694339436879694,"4011":0.3851783796032056,"4012":-2.5224860561663816,"4013":-2.4782851253679605,"4014":-0.42827204071203806,"4015":1.7101298240785616,"4016":0.6699749983848544,"4017":-0.17414611453823023,"4018":0.1851835404968191,"4019":-0.07600739882956335,"4020":0.4806148539632585,"4021":-0.0828321678169973,"4022":0.4734047048334273,"4023":-0.06101342540859385,"4024":-0.03023877654484114,"4025":-0.010027328021223478,"4026":-1.222708051184534,"4027":0.14488949347145194,"4028":-0.5477922369625879,"4029":0.3036640942213322,"4030":-1.0659004018421014,"4031":-0.10837582400545823,"4032":-0.4802921297081931,"4033":0.31994203493868334,"4034":0.14806130376266377,"4035":-0.5389096680624758,"4036":-0.7510837352619852,"4037":0.17656563459220342,"4038":0.1543926533755974,"4039":0.1948479395472916,"4040":-0.42344937729748405,"4041":-0.6108724844856275,"4042":-1.1615190327403602,"4043":-0.7172000552645432,"4044":-0.12050575245746108,"4045":-0.8752941957527861,"4046":-0.3551651666473469,"4047":-0.9339657869173872,"4048":1.180621835046471,"4049":-4.236353052587466,"4050":-5.839589117929197,"4051":-4.244608760593661,"4052":-2.469750503259845,"4053":-1.9045245856189459,"4054":-0.2053717548429352,"4055":-0.3259891467155379,"4056":0.217865569195981,"4057":-0.6251555569123044,"4058":-5.361236920488184,"4059":2.3255739382493577,"4060":3.6521748323441723,"4061":1.2118017129168066,"4062":1.4479552312664565,"4063":1.5423011618526268,"4064":1.0442891385203021,"4065":-0.11845663000705432,"4066":0.09918639807999302,"4067":0.5587710965793681,"4068":1.360700453613915,"4069":1.5650983109225984,"4070":1.4631387857529303,"4071":1.0542259961360452,"4072":0.6382567090113624,"4073":0.10502880690241147,"4074":0.12287238537797572,"4075":-0.19611033817034823,"4076":-0.44545264042307786,"4077":-0.06667798117955917,"4078":0.18667575480631174,"4079":-0.5791279240622108,"4080":-1.1586637567928468,"4081":-1.4331664908235802,"4082":-0.10042985028898369,"4083":0.02804545497785673,"4084":0.0715281670462765,"4085":-0.8776021411151727,"4086":-1.0911579794232704,"4087":-0.32901517724197316,"4088":0.003943160507976376,"4089":-0.01166231066123554,"4090":-0.16620518633621612,"4091":-0.19885682031436888,"4092":0.27581597486340886,"4093":-0.1875732328024122,"4094":-0.23156479882602804,"4095":-0.48708749162395615,"4096":0.26719054048955815,"4097":0.17131805409002757,"4098":0.6627456074464669,"4099":-0.4785519243651611,"4100":-0.9578222021860089,"4101":-2.3817492684869648,"4102":1.2319645783357671,"4103":1.0315249997882927,"4104":1.5390472155615693,"4105":-0.3128397599379602,"4106":1.0592941051018328,"4107":-1.3830379736589524,"4108":0.19891143658098576,"4109":0.7660242929083363,"4110":-0.6742773817558712,"4111":-0.5526537521093956,"4112":-0.7727828159401303,"4113":1.6527961665203712,"4114":1.3393187086720288,"4115":0.794477284879403,"4116":0.1138729896413962,"4117":2.1938814244071825,"4118":-1.2809379080978724,"4119":-0.9701040477000783,"4120":0.2781505887167326,"4121":-3.466299311887839,"4122":0.35058262276584873,"4123":1.4377903152833678,"4124":-3.6075248776565267,"4125":1.224250954108737,"4126":-0.17334583368978837,"4127":-2.2700904075143766,"4128":0.9583324839549892,"4129":-1.4262491846126828,"4130":-1.2976820934704993,"4131":-2.0790160543394527,"4132":0.5384562020444644,"4133":-0.7189307581060546,"4134":-1.1059810404347152,"4135":-0.19747799949164346,"4136":1.3164902269937369,"4137":-0.5437511587218213,"4138":-1.5212858771226339,"4139":-1.338748911370654,"4140":0.1299877123982107,"4141":0.7362310831125168,"4142":0.1855501741013146,"4143":0.07335027852219086,"4144":0.6597931402933753,"4145":-0.3293012775748055,"4146":-0.40177345716954094,"4147":0.6948919926386501,"4148":0.010852015898990286,"4149":1.0803439942220503,"4150":1.2228053664560556,"4151":1.0769218220196364,"4152":1.6094291497805966,"4153":1.729004002621631,"4154":-0.13408943694329675,"4155":2.6865247473252345,"4156":0.947576809234671,"4157":0.46653146337471196,"4158":0.6475137352841458,"4159":1.3817441414581497,"4160":1.0279639522028534,"4161":0.9474326723242166,"4162":0.5789540810641481,"4163":-1.0292872861478093,"4164":-1.314915700583475,"4165":0.02916479098931886,"4166":-0.18032029282367523,"4167":0.5828244454832324,"4168":0.6297642565917321,"4169":0.5935835457450618,"4170":0.21165458206744828,"4171":1.1278481206046587,"4172":-0.09836505312965071,"4173":0.4723980617178295,"4174":-1.0192706176335324,"4175":-1.3206617336420357,"4176":0.08181852775590882,"4177":0.9242406652499451,"4178":1.2879729104784143,"4179":0.6482443929932622,"4180":-2.128881572744876,"4181":0.5498089836329385,"4182":-0.19978868887245257,"4183":-1.6632716162091201,"4184":0.9229919805007063,"4185":0.04940400856591785,"4186":0.21156165531119658,"4187":0.7596137400865629,"4188":-0.7399102560493017,"4189":-1.4261637104543636,"4190":0.6250100741294548,"4191":1.0020413372215837,"4192":-0.43109845400631724,"4193":0.5515616763488049,"4194":-0.016823750758325748,"4195":0.7493905575098968,"4196":0.5140137775326153,"4197":-1.3246982475451354,"4198":-0.08145092887802137,"4199":0.1704027572689333,"4200":0.3465981209876589,"4201":-0.7750305862611189,"4202":0.6245520007786884,"4203":-0.012782294269001775,"4204":-2.050753779307581,"4205":-2.7121162803795413,"4206":-0.6016502036949469,"4207":-0.1830790595985014,"4208":0.9423910795693022,"4209":0.4412168994712851,"4210":-2.2985367134991277,"4211":-1.0992370852549445,"4212":-2.6332895488416415,"4213":-4.090433862968116,"4214":-3.4964700035825813,"4215":-2.1149785477388696,"4216":-1.2859795452653202,"4217":0.32274892700808844,"4218":0.02069388960506712,"4219":1.670763882481204,"4220":0.332129566214388,"4221":3.2534314199855023,"4222":-3.124889792160722,"4223":-3.0177636260005714,"4224":-0.6931488908615281,"4225":-0.13233485354448685,"4226":-1.8377059511407674,"4227":0.3217701390256923,"4228":0.08505880128971695,"4229":1.0063899424835752,"4230":2.27816910137457,"4231":4.5432730836161905,"4232":3.7007427823674135,"4233":2.350308149073031,"4234":-0.16794060917330242,"4235":0.5525434313824703,"4236":-0.9031814518658091,"4237":0.7534561342577702,"4238":0.48804038714637393,"4239":0.19613410803670897,"4240":-0.5441115174398468,"4241":-0.3463462014018007,"4242":0.05909679245929672,"4243":1.5343736331405131,"4244":0.48284546759797564,"4245":0.406827204290551,"4246":-1.3962431330883296,"4247":0.05258835151608543,"4248":-0.5059015762611865,"4249":1.4642489244209984,"4250":0.2012726024683096,"4251":0.3806088908463905,"4252":1.5375397319863535,"4253":0.25331734258783073,"4254":-0.6692876196186255,"4255":-0.1446552790844128,"4256":0.1276495351052716,"4257":1.0149668392351308,"4258":-1.1341291719072446,"4259":-0.042534035738407555,"4260":-0.07243370516924336,"4261":1.4890366776141424,"4262":-0.17822788920242552,"4263":0.397282779626953,"4264":-0.6505959212228263,"4265":0.8466838688340996,"4266":0.4866689489202152,"4267":-0.4390369198018882,"4268":1.615916218723898,"4269":-0.9213059347273777,"4270":0.6173603015565315,"4271":-1.1069981392337824,"4272":-0.6251624156282264,"4273":-0.7316128390501397,"4274":-0.22399431360538724,"4275":0.5381289831842564,"4276":0.2750019220113639,"4277":0.9193800276380824,"4278":-0.2922384950339094,"4279":0.12895830847406203,"4280":0.9443067539130799,"4281":-2.1559237564656333,"4282":1.7134386266993056,"4283":1.1811158891012805,"4284":-0.22506254973529763,"4285":-0.35365360691160524,"4286":-0.7629568882476873,"4287":-0.551129358722752,"4288":-2.6204097166819227,"4289":-0.32202908421649945,"4290":-0.019400058725119275,"4291":-0.6293306589126193,"4292":-0.05043915240355853,"4293":0.3940896648246332,"4294":-2.178746909319234,"4295":-1.2717510111993349,"4296":-2.482686546346311,"4297":-1.8030608127670738,"4298":0.08131274137999675,"4299":-3.55596585749794,"4300":-0.15285576066865686,"4301":1.6542167763687246,"4302":-0.8665950962314193,"4303":0.5465673920908013,"4304":-2.3930875192070764,"4305":-2.1466659964871075,"4306":0.10562897655985685,"4307":-0.2792565299948471,"4308":-1.6263505530529336,"4309":0.6956837926273405,"4310":-1.6095144471584306,"4311":1.2056868553712532,"4312":0.14357426393072784,"4313":0.271677862292747,"4314":-0.6667048978992148,"4315":-1.0304668821014022,"4316":-0.9591601519028977,"4317":1.2277395497451562,"4318":0.9926679838018376,"4319":-0.5938649702351052,"4320":-0.12542702699877195,"4321":1.287951048841538,"4322":1.0180960041622082,"4323":-1.4587006834070995,"4324":1.2385262943015798,"4325":-0.2323320961666358,"4326":0.9333010581237063,"4327":-1.3322602600833955,"4328":1.0425393834704355,"4329":-0.34049351893983837,"4330":-1.2894659047308457,"4331":0.9607397989958689,"4332":-0.5352147276224062,"4333":0.937598436481001,"4334":-1.2715240216112889,"4335":1.2920181617589077,"4336":0.8588535654430498,"4337":-0.42148581138215824,"4338":0.08465614516868558,"4339":-0.12851864161949494,"4340":0.5173117235876,"4341":-0.04061173885498631,"4342":0.11663271779608293,"4343":-0.20551900309090404,"4344":1.1498946247926598,"4345":0.5030735549856119,"4346":0.4337940240836311,"4347":0.34542357053408085,"4348":-0.8457500730588084,"4349":-0.23660400078607094,"4350":0.32643195155672794,"4351":0.01973482827049993,"4352":1.43569449304096,"4353":0.10648844679716779,"4354":-0.014934740928731,"4355":0.133548343468593,"4356":-0.6998831086885061,"4357":0.7829643247697458,"4358":0.032729856134399535,"4359":-0.41667674571735064,"4360":0.8189779850043013,"4361":0.2394716186302082,"4362":0.2445566158329447,"4363":-0.2513219037602297,"4364":0.28537556555745697,"4365":-0.2698568557793603,"4366":0.650863743816762,"4367":-0.06345569744658913,"4368":-0.05816353063929263,"4369":0.24467122480638562,"4370":-0.29677428096870817,"4371":0.20073348216465195,"4372":-0.015730696548489857,"4373":0.010004670101986574,"4374":-0.08177617616392656,"4375":1.1070686822736076,"4376":0.7744357825229463,"4377":1.148775350105464,"4378":1.3401885596690857,"4379":1.1269288773577417,"4380":0.6975746887266772,"4381":0.3968892546861907,"4382":-0.046973039492607144,"4383":0.632224455081887,"4384":-0.5801705236105974,"4385":-0.1895461897624877,"4386":-6.550446256231276,"4387":-6.4695670226564,"4388":-8.13426844929031,"4389":-6.8719067679510895,"4390":-3.542923060362895,"4391":-0.7625494035105597,"4392":0.4777645526578041,"4393":-0.36952698581447535,"4394":-0.3755562640786296,"4395":0.6927483334038166,"4396":1.7586031070902013,"4397":1.7270164186017607,"4398":2.171189750402461,"4399":1.1313841506475557,"4400":-0.32683526875686736,"4401":-0.11185125641327494,"4402":0.9112297467200736,"4403":-0.4599454435814974,"4404":0.4013200942156386,"4405":0.25128935577209793,"4406":0.34317815464843004,"4407":0.03450829554312576,"4408":0.7735238910669362,"4409":0.3050733162124548,"4410":0.2388745002739727,"4411":0.5871314441249738,"4412":-0.08956597219737852,"4413":0.17981540478631233,"4414":0.23289230476532607,"4415":0.2505761227486937,"4416":0.3501110762929402,"4417":-0.09987161568032152,"4418":-0.25414281972193054,"4419":0.07084427280426832,"4420":-0.20019433524916638,"4421":-0.5889774124099056,"4422":-0.25333818419165816,"4423":0.2992678609301934,"4424":0.2882222046179506,"4425":-0.7584204725871766,"4426":0.26715073868537415,"4427":-0.4677255460385277,"4428":-1.816017914700755,"4429":0.46629840866400213,"4430":0.4888265636058119,"4431":-0.7692476245757698,"4432":0.3125785345609732,"4433":-0.3442975649142311,"4434":0.7276635845466588,"4435":0.46867218152961465,"4436":-0.8583306923112655,"4437":0.3653831680306827,"4438":-0.6678307563697616,"4439":0.36946486897342445,"4440":1.02637131588848,"4441":0.5347893918976067,"4442":1.2382375838995645,"4443":0.22140795273897768,"4444":-2.2435829920194243,"4445":-0.13877447150377784,"4446":-0.9554789937550086,"4447":1.8622476730871016,"4448":0.9350443305847541,"4449":-1.2885470808409945,"4450":-0.34650046316868455,"4451":-0.5726310302341061,"4452":-1.0240838672061667,"4453":0.8579527020635905,"4454":0.65467092484287,"4455":-0.11528778615612396,"4456":1.264355515801607,"4457":1.481075991618514,"4458":-1.5653210114334628,"4459":-2.9997693219478063,"4460":-2.568168392605907,"4461":-2.457501063333141,"4462":-0.6129755800499191,"4463":1.2669116526010773,"4464":1.7988050878863573,"4465":0.013128256152416166,"4466":0.07771771583217821,"4467":0.5656499822028933,"4468":-3.6570076219416063,"4469":-2.712638461280403,"4470":-2.847389048636002,"4471":-1.967965911124018,"4472":-0.9478062954044145,"4473":-1.4105355450736525,"4474":2.018075805512336,"4475":-0.581392021223941,"4476":1.3323024029757031,"4477":3.1953755773911623,"4478":3.6838405455160603,"4479":1.9352780099853413,"4480":0.8508878435404068,"4481":0.6008373190407784,"4482":-0.38639651623803295,"4483":-1.221005602798577,"4484":-0.780721910438288,"4485":2.2685616660472285,"4486":-0.16480082634222662,"4487":1.7433598654614384,"4488":1.1639727193805862,"4489":1.1510517277087036,"4490":0.7317486426069778,"4491":1.2299525983434887,"4492":-0.831863172629481,"4493":0.6373551364276839,"4494":0.5970349380046536,"4495":-0.6082528520931679,"4496":-0.41369422550466445,"4497":-0.28842118100898995,"4498":1.3272122537181834,"4499":-0.5416256993563853,"4500":-0.770648491447235,"4501":-0.18323563812366253,"4502":1.2997506131561278,"4503":0.07160263994358003,"4504":0.1835381546871244,"4505":-0.8759690067167717,"4506":-0.34423424912634704,"4507":-0.2794113270741166,"4508":1.7501631741604118,"4509":-1.8556151567287773,"4510":-1.6060465443600804,"4511":-1.2265313922545857,"4512":0.7899389448102442,"4513":-0.07668782921897166,"4514":-1.8861467616960212,"4515":-0.3184771262048473,"4516":-1.632717105999056,"4517":0.1606281858946575,"4518":2.7059383868241063,"4519":1.6072181025307455,"4520":-0.892829959892804,"4521":0.6218487824203311,"4522":0.5840125713483155,"4523":-0.3092659209181533,"4524":0.5287673521702903,"4525":-0.03098457049004453,"4526":-1.56305312193587,"4527":0.7736165652076932,"4528":0.8822123073989909,"4529":1.7815404623436344,"4530":0.9158118539937101,"4531":0.06568031078412029,"4532":0.4318176676584996,"4533":-1.8086424684025444,"4534":-1.694130409155268,"4535":-0.31317641881995584,"4536":0.09057032238856494,"4537":0.21483384032088212,"4538":-0.6444995453950574,"4539":4.005859630035837,"4540":2.7444851430660537,"4541":0.030877924313177426,"4542":0.021535224254382767,"4543":-0.0431763861240743,"4544":-0.4835720882770739,"4545":-0.8102775793465745,"4546":0.07296060888885046,"4547":-0.6582134072779237,"4548":1.3706366279756257,"4549":4.683943642144852,"4550":-1.0398918858052462,"4551":1.932460798763863,"4552":0.7454206271250907,"4553":0.029198422773325836,"4554":-0.08175241651474868,"4555":-0.34577471355277656,"4556":1.3308059166885344,"4557":1.0271823176479324,"4558":-2.3267186346611166,"4559":-2.1015774016812134,"4560":-2.369750077566338,"4561":1.5132259713401341,"4562":-1.160427113505679,"4563":-1.552871896507736,"4564":0.7884169724914502,"4565":-0.03598361148153667,"4566":-0.6095603857259695,"4567":-0.09327556675095691,"4568":-1.6032118259960735,"4569":-1.0689328977911603,"4570":-1.2745039404192882,"4571":-0.9554726379809932,"4572":1.7287064004049,"4573":-1.2345973424833603,"4574":0.3775249247455075,"4575":0.4791989870915504,"4576":-0.6737459114211802,"4577":-1.4475484892935235,"4578":-0.38168072681668375,"4579":0.08286705856100852,"4580":1.1339690922976355,"4581":0.15274698651944532,"4582":-1.501250520842913,"4583":0.28775715098759597,"4584":0.6230003707639948,"4585":-0.6593480283550207,"4586":-1.3769730236205624,"4587":-0.5443009662387962,"4588":0.3778271656249932,"4589":0.3961448829369768,"4590":-0.2643216165036241,"4591":-0.5580681037993049,"4592":0.1399601418210877,"4593":2.398392683245005,"4594":1.5714073063594645,"4595":0.4972171381817446,"4596":-0.5488529332500828,"4597":-0.7708659627711844,"4598":1.7336239111317726,"4599":1.5847697162100434,"4600":-1.5324535631422542,"4601":-0.6995880080075628,"4602":-0.32515459031219374,"4603":-1.4930882946389172,"4604":1.117504862528298,"4605":-1.5381968402645856,"4606":0.15538614280085572,"4607":0.12848051469630567,"4608":1.7243466986740463,"4609":0.8001933537665484,"4610":0.48345439455248956,"4611":0.3756192446906057,"4612":1.759080054030469,"4613":-0.04183812590547412,"4614":-0.7874949800061869,"4615":0.801740461304774,"4616":0.7397162406570499,"4617":1.3562022032260657,"4618":0.36390780046673316,"4619":0.40783045041289884,"4620":1.2097390056119564,"4621":1.253958959096871,"4622":-1.458885208525468,"4623":2.1735797102703804,"4624":0.013201829924676377,"4625":-0.6767348125725192,"4626":1.0605067054283326,"4627":0.6611581175925854,"4628":-0.31292326945050947,"4629":1.2649209242850827,"4630":1.1614721548794829,"4631":1.933705353092927,"4632":0.8984271352338216,"4633":0.848978804091285,"4634":0.5694397057262124,"4635":-0.14997887459549994,"4636":-2.3996208357148157,"4637":-1.1392277506095922,"4638":2.309827279431556,"4639":1.9240139202658177,"4640":0.21337512179027737,"4641":2.9130156367273323,"4642":0.9417828664762271,"4643":1.3755353603643643,"4644":0.8208311723183284,"4645":-0.8894328124265618,"4646":0.18162509631882764,"4647":-2.618697263350299,"4648":-0.2831746345849783,"4649":0.34992721206959726,"4650":0.6094331209005074,"4651":0.731442551311409,"4652":-2.2444114559332,"4653":0.743665248212313,"4654":2.258532898511711,"4655":-1.7264918177704347,"4656":0.34223420099043556,"4657":1.2051754628095859,"4658":-1.8549393567924926,"4659":-0.0717967840019362,"4660":-0.3458583322959663,"4661":-2.0845248702605015,"4662":-0.45714527400858207,"4663":-0.43052713381251734,"4664":-0.28358114159810044,"4665":-0.8842236144334592,"4666":0.03487985183613208,"4667":-1.1490426891350294,"4668":-1.8451122349574827,"4669":-0.5072322917747388,"4670":0.6547450798936293,"4671":-0.17236078004554964,"4672":1.9126508820088424,"4673":-1.0487473015214386,"4674":0.7609131841051988,"4675":-0.9301538659343564,"4676":0.07129286783895417,"4677":-0.7997541651349522,"4678":-2.250454682998855,"4679":0.09760002500781605,"4680":-0.9546526935081323,"4681":-0.20097395226358147,"4682":0.11127271407804992,"4683":0.6389603362296709,"4684":1.8613745605000511,"4685":0.5166861616055197,"4686":0.32727484135397655,"4687":0.3635586952816971,"4688":0.3661919984463568,"4689":-1.5540488542682864,"4690":-0.6967428290601456,"4691":-1.0631163802715462,"4692":-0.7720058928873809,"4693":1.9098724207637314,"4694":0.7744611792099239,"4695":0.25306700631256834,"4696":-1.3490962599139558,"4697":-2.629018433155343,"4698":-2.4043016844162257,"4699":-0.07195902139216007,"4700":-0.7658159011664176,"4701":-2.43461955926507,"4702":-1.1669608831748934,"4703":-0.017393573147327323,"4704":-1.776965136651084,"4705":1.014694158518796,"4706":-0.9496644807338974,"4707":0.20454078464180525,"4708":-0.38242854560330486,"4709":0.059894741126439895,"4710":1.4697245913655392,"4711":-0.2082269848888561,"4712":0.32684158866485435,"4713":-3.2700027203836655,"4714":2.0614932212284565,"4715":1.7095336757700905,"4716":0.8915328621051176,"4717":0.5136518409365818,"4718":-0.1064625137321151,"4719":0.6037135395881396,"4720":0.13487363163393612,"4721":1.479613956195029,"4722":1.2038989500721093,"4723":-1.481558593512009,"4724":-2.5515773545863594,"4725":0.2560197075839273,"4726":-0.3899628186236391,"4727":-0.6183013692732003,"4728":-1.2535881687040547,"4729":1.9080037826666982,"4730":0.657943554514791,"4731":-2.716428297939256,"4732":-0.04036078508000971,"4733":-0.698452761708397,"4734":-0.9676014440594258,"4735":-1.3647423113337096,"4736":1.4898899396882967,"4737":0.3583297880145303,"4738":0.40020667926321635,"4739":0.6774225085467356,"4740":-0.780387288238836,"4741":1.1036467063693158,"4742":0.5242299949113098,"4743":-0.97589221566673,"4744":1.267544047300685,"4745":0.2630818019841373,"4746":-1.1614786847358132,"4747":1.3313143835468573,"4748":-0.7315085920297654,"4749":0.2968504734546008,"4750":0.17205292974672803,"4751":-1.0586440274026694,"4752":-0.2607646797747305,"4753":-1.6301539509002216,"4754":1.5042047484708518,"4755":-0.7771281597586309,"4756":0.15445665739251055,"4757":0.5622008133079648,"4758":2.4188927478411624,"4759":0.6733545424795201,"4760":1.2260230181270169,"4761":0.6199026000989286,"4762":0.0919065045525709,"4763":0.23760171803437827,"4764":-0.385497648446186,"4765":0.19239555511734951,"4766":0.13581444583740826,"4767":-1.5308469605104462,"4768":1.5950928222405956,"4769":-1.3681006581273771,"4770":1.2712978950106018,"4771":-0.5839583861814832,"4772":0.35035030502034514,"4773":1.4786048590646985,"4774":-1.1921341620557973,"4775":-2.4830566775624727,"4776":1.7202666371320767,"4777":-1.026529961474816,"4778":-1.7424488885507154,"4779":-1.6715333353903719,"4780":-0.3238035455138618,"4781":0.9132065235129477,"4782":0.15265645873481126,"4783":0.6478879376376043,"4784":-1.2003626552352353,"4785":1.30541516906525,"4786":0.977643756706557,"4787":-1.5515423486781257,"4788":-0.3689601373739797,"4789":-1.7615973081938479,"4790":-0.8889078696646511,"4791":-0.4391331657384392,"4792":-0.14837399242989896,"4793":2.193532990940837,"4794":-0.18826019865337684,"4795":-1.2034708934405862,"4796":-2.018720186611401,"4797":-1.5843332740570457,"4798":-0.5024516523804459,"4799":-1.4545181698558463,"4800":0.8522444577315239,"4801":0.9456934839750953,"4802":-0.5589280296951606,"4803":-0.2765501304950093,"4804":0.23808208782184712,"4805":-0.9526391551166238,"4806":-2.448785186677303,"4807":-1.0875277482187544,"4808":-1.270478567125505,"4809":-2.042123388888425,"4810":-0.06619886773836224,"4811":-0.03715040909866183,"4812":1.4055493178165512,"4813":0.146034350303831,"4814":-0.6724120800037235,"4815":-1.274508863952524,"4816":0.3191692836079021,"4817":-0.25527169678302636,"4818":1.5274514289898862,"4819":0.509220402859509,"4820":-0.6177696028484317,"4821":-2.2951128955473323,"4822":1.3751919944774615,"4823":-0.5256307037179896,"4824":-0.870236387111463,"4825":2.1665775707455315,"4826":0.5634184724067717,"4827":-2.5300344451510535,"4828":0.45656609330773046,"4829":0.2867125327645062,"4830":2.3041204484683226,"4831":-0.06809758582818667,"4832":-0.12364639269348698,"4833":2.1224032386776033,"4834":0.02874207256966172,"4835":-1.5334170704063372,"4836":1.558891663457562,"4837":0.2668681691465494,"4838":-0.11187218537650662,"4839":-0.021998951465347093,"4840":-0.595966070537759,"4841":1.04589355868307,"4842":0.3110763784414539,"4843":-0.3575633552897531,"4844":-1.2148888972118248,"4845":0.619865695362297,"4846":-1.863634385982631,"4847":-0.44015485982485125,"4848":1.3048358228082324,"4849":1.5160590794513005,"4850":0.04903880229126128,"4851":0.9442175353836907,"4852":0.13459709428240674,"4853":-0.8088352608825392,"4854":-0.8191300111871531,"4855":-0.45892246291274325,"4856":0.46144122980040675,"4857":0.2826076195417841,"4858":1.0446576054526442,"4859":-0.26430851561793034,"4860":-1.171771187420812,"4861":-0.05359333903287921,"4862":0.2350932664146515,"4863":-0.6323281399088174,"4864":-0.13889858632782293,"4865":1.4366774899165713,"4866":0.644573667395077,"4867":-2.169523561857865,"4868":-4.498536779505784,"4869":-3.798720965520762,"4870":-0.8569297697949776,"4871":-0.005249592163797816,"4872":-0.45089161105615283,"4873":-0.7462340461876845,"4874":0.9796448426525568,"4875":0.010063000667155781,"4876":1.2126008759285036,"4877":2.026420623702027,"4878":6.899001641360923,"4879":1.9507350029170691,"4880":1.312328190731668,"4881":0.6561852729404022,"4882":0.43244817925976364,"4883":1.0654411383182096,"4884":-0.1550144792387849,"4885":-0.7736728076289842,"4886":3.3855451499362337,"4887":3.347626172949361,"4888":1.7370908690826512,"4889":1.2832754390978562,"4890":1.540804082853954,"4891":0.7609574425146783,"4892":0.03199296531690692,"4893":0.1471235334459134,"4894":-1.4987949689634843,"4895":-0.025364844430768373,"4896":0.3068974064895928,"4897":0.5485338898243654,"4898":-0.062030543108531976,"4899":-1.3405962229326425,"4900":0.9865366256247425,"4901":-1.540592456742768,"4902":0.2450200744547429,"4903":-0.5617300064806368,"4904":1.4162686599700718,"4905":-0.03765372741613825,"4906":0.4719874605247975,"4907":-0.49220578192547454,"4908":-0.1649322462135867,"4909":-0.1625746154110091,"4910":-0.01817444313054074,"4911":-1.1450569773165091,"4912":-0.5569119725442903,"4913":0.7898028529307758,"4914":0.35580536738628044,"4915":-1.2466013697738307,"4916":-0.8774604717491666,"4917":0.3669887004065517,"4918":0.28803154221178784,"4919":-0.3305385006762081,"4920":0.9416093318807293,"4921":-0.1662736582382707,"4922":0.6293993383079207,"4923":-0.14069236574976413,"4924":-1.0474326747722482,"4925":-1.592715063133096,"4926":1.8395653729989834,"4927":0.3120272214509826,"4928":-1.7675974534778245,"4929":2.259426007869803,"4930":-1.4131452976084493,"4931":0.9084184131621723,"4932":0.46797421569540226,"4933":-0.94235937157341,"4934":2.7672680473491136,"4935":1.8671466606337959,"4936":1.9518027343324067,"4937":0.9959932559855493,"4938":-1.406367484544216,"4939":1.6123105451388224,"4940":-0.391130770321506,"4941":-1.5221835807576518,"4942":1.1490536819899528,"4943":0.8833496087654272,"4944":0.04071295804994918,"4945":-0.18918375653220476,"4946":1.767811099467611,"4947":0.5794198657204135,"4948":-1.4813165308636518,"4949":-0.6936947352750303,"4950":-0.1675826287425465,"4951":-0.7880699206894849,"4952":0.654079026710284,"4953":-1.4828416744214044,"4954":-1.099058854533891,"4955":0.6024904271927205,"4956":2.1183704107226724,"4957":-0.7438156353177754,"4958":0.31546868094316893,"4959":0.5049365208033573,"4960":1.5817129493850872,"4961":1.0730794717540109,"4962":1.0444962423134587,"4963":1.4632398637358692,"4964":3.0237628584027236,"4965":-0.2581694401146856,"4966":0.66074513126282,"4967":-1.6825831672019373,"4968":-4.302471813866231,"4969":-2.1342480285911094,"4970":-0.3553182180844489,"4971":0.21686687976522434,"4972":-0.5134071146819561,"4973":-0.409031262087283,"4974":-1.4630116339922221,"4975":0.3811702591638767,"4976":-0.009093820936931122,"4977":1.6859773186394216,"4978":1.1142119604025769,"4979":0.7583201014159633,"4980":-0.807262456700222,"4981":0.5619712886153414,"4982":-0.857389179801762,"4983":1.061089888339413,"4984":0.1992183448194226,"4985":0.7662360016371726,"4986":-1.634213941363465,"4987":-0.15225458563497105,"4988":0.3689212292191741,"4989":-0.9459739270132568,"4990":-0.6151344772533973,"4991":0.9178795494813125,"4992":0.21109469051832727,"4993":0.2501826360139432,"4994":0.5349582370025939,"4995":-1.3303591536077999,"4996":-0.21698601330250766,"4997":-1.3891187075645264,"4998":1.4955153389886142,"4999":0.8174628196773376,"5000":-0.6695052979497818,"5001":-0.7791765585011802,"5002":-0.15593705888533071,"5003":-1.6832649731270348,"5004":-0.2053591055654219,"5005":-1.490880636139402,"5006":-1.6300873146072972,"5007":-0.7460988452821031,"5008":-0.3879744569367396,"5009":-0.4023250256791109,"5010":-0.45210564564815375,"5011":-0.03575397941026973,"5012":-1.7083493805383292,"5013":-0.6469286913370337,"5014":-1.105059816310793,"5015":-1.309931415315522,"5016":-0.8907092286408222,"5017":-0.7266090656086365,"5018":-0.5583385584106997,"5019":-0.6127898095613055,"5020":-0.7260679398512322,"5021":-0.8585862625961965,"5022":0.22614761402510622,"5023":-2.5387836880785466,"5024":-1.0569635513554083,"5025":-0.9932034479841689,"5026":-0.5046599719974881,"5027":-0.5813885621184197,"5028":-0.3232378719542114,"5029":-0.8131610986569174,"5030":1.2119107686284334,"5031":0.6741657579679476,"5032":-1.6229101942527429,"5033":-1.1433781944720676,"5034":-0.7457922787784944,"5035":-0.46546432981030117,"5036":-0.5132842674470633,"5037":-0.6028933826812748,"5038":-1.3345188058677222,"5039":-0.07584155823638375,"5040":3.804751768995856,"5041":-1.1362088646705608,"5042":-0.40225493113515226,"5043":-0.45374479489971375,"5044":-0.388394814618513,"5045":-0.5508772261707477,"5046":-0.5678730502562703,"5047":2.749547650546982,"5048":-2.041530659203826,"5049":1.0681836941049812,"5050":-1.41117513507424,"5051":-1.7102660735153434,"5052":-1.054531928155959,"5053":-0.7481496350871008,"5054":-0.9028736830286361,"5055":-0.42196904221211856,"5056":0.6115798499922714,"5057":-0.4646216219319298,"5058":1.857558648919117,"5059":-1.6528034644944982,"5060":-1.5336605674098807,"5061":-0.9695448129963465,"5062":-0.5634071280364854,"5063":-0.4015693354667319,"5064":-0.6494879430912893,"5065":-1.0339462007786446,"5066":-0.2227223405074371,"5067":-0.06827999270950867,"5068":-1.1259724238672217,"5069":-1.5869671687338438,"5070":-0.7694729590475731,"5071":-0.5490944737974773,"5072":-0.6550714834333069,"5073":-0.5970895504148903,"5074":2.1010461224717543,"5075":0.1422476779511864,"5076":-2.670540254174254,"5077":-1.6187260633724092,"5078":-1.855717930768646,"5079":-0.9658017385221193,"5080":-0.4920798757627518,"5081":-0.42234938053391974,"5082":-0.6243407324407351,"5083":-0.6195575534000196,"5084":-0.5332310494278462,"5085":-1.5442154981370286,"5086":-1.644961095090741,"5087":0.0972675723482572,"5088":-2.1417141136550244,"5089":-1.9648477842807774,"5090":0.46200950125211815,"5091":1.287813789482414,"5092":-0.16087429334470338,"5093":-0.9891183559058843,"5094":-0.7436657321683615,"5095":1.8394243591650976,"5096":-0.7181746966082437,"5097":-0.832464805175012,"5098":-0.01298783745012061,"5099":0.20800800770447853,"5100":0.6282149854066912,"5101":0.3258860951815837,"5102":-0.5463507295345656,"5103":1.3388110872863486,"5104":-2.6112922456080607,"5105":-3.0536340090787073,"5106":-0.830985041522324,"5107":-2.5774651888125764,"5108":-2.085211917837546,"5109":-2.0558762672177986,"5110":-0.22796639900474408,"5111":-1.9743942734547384,"5112":1.0701158221167493,"5113":0.7689128321516837,"5114":-0.05191466856828938,"5115":-0.3604507260408591,"5116":-0.8188812138605572,"5117":0.2814689489359848,"5118":0.9399490621873596,"5119":-0.9096654828180362,"5120":-0.8176812287658278,"5121":0.7364746072134597,"5122":0.10434162913176993,"5123":3.0039194647220118,"5124":0.7130602794043295,"5125":1.597631099202548,"5126":0.621196749651214,"5127":-0.4460268097838292,"5128":-0.40742582515996273,"5129":-0.5397225498485547,"5130":0.5753237152094441,"5131":0.8725701522668008,"5132":1.1024870482164109,"5133":2.0231261470655317,"5134":2.413525136709834,"5135":0.7633292900193197,"5136":-0.002047353895299123,"5137":-0.060705983902499275,"5138":-0.5707032623810486,"5139":-1.0407533260452975,"5140":1.4752984883498663,"5141":2.498981484705169,"5142":1.7630050571738156,"5143":0.5731049534083644,"5144":0.03750791952600722,"5145":0.14133334836457576,"5146":0.6520328759363438,"5147":0.08486519176090614,"5148":-1.5667891625067978,"5149":0.2164655753598808,"5150":-0.4087135197051222,"5151":-1.4602433927605916,"5152":-0.8243897197009452,"5153":0.8587346782844023,"5154":-0.4316987997935637,"5155":0.2879934398107351,"5156":0.5013293348862581,"5157":-0.3708778205243116,"5158":0.7562443410242528,"5159":1.0085136487393642,"5160":0.8966133255535262,"5161":0.19793155201319068,"5162":-0.1683645149210756,"5163":-0.8538037985145696,"5164":0.9150734518193154,"5165":-1.8747549433792747,"5166":-1.4175597040485597,"5167":0.7388009495955806,"5168":-0.39869807043859073,"5169":1.1960450599307435,"5170":-1.099363848075889,"5171":-1.188150191934407,"5172":-0.025818521210610717,"5173":-0.5009583413671341,"5174":-1.5242883526059403,"5175":1.4096349489361584,"5176":-1.0576230597665504,"5177":-0.8136927613375254,"5178":0.84394825045855,"5179":-0.5759002593811422,"5180":-1.3957657526534721,"5181":-1.3329457957553084,"5182":-0.14953363504790132,"5183":-1.5149097564363891,"5184":-0.2932928715002701,"5185":-0.3486655437915327,"5186":-1.136528441797969,"5187":0.3978337539706597,"5188":0.0865579709382515,"5189":-0.7618053899859843,"5190":-1.3634293101847634,"5191":-1.1294316776824704,"5192":0.12412426691451682,"5193":0.6499024387676212,"5194":-2.4883525825697412,"5195":0.06695678339920987,"5196":-1.065265592689951,"5197":-1.5848367788481994,"5198":0.07358011062636252,"5199":-1.1673623676961844,"5200":-0.8958681815528383,"5201":-0.1456156720569848,"5202":2.1870316622597636,"5203":-0.8832913128686269,"5204":-0.6134464473841966,"5205":2.2696055029184916,"5206":1.0501842886696207,"5207":0.6581844596208123,"5208":-1.4517547769880037,"5209":-1.1408863529322748,"5210":-0.8889208911459351,"5211":-0.23044767910081074,"5212":-1.8452353768936176,"5213":-0.31210807233413435,"5214":-0.20712217260774635,"5215":0.0013633460985540036,"5216":-0.17530616746737945,"5217":-0.5990050098419089,"5218":-1.46530485407907,"5219":-1.3301247461988968,"5220":-0.4021860141129125,"5221":-0.0827307725903943,"5222":1.1835786447895946,"5223":0.02940331823298132,"5224":-0.39419939590834374,"5225":-0.8847268829248962,"5226":0.03566533635120627,"5227":-0.6165488619954342,"5228":-0.7778422636538241,"5229":-1.874056408311355,"5230":-0.34443048344867233,"5231":-1.294454557477236,"5232":-0.8845583414998734,"5233":-1.4006096336908018,"5234":-0.569863536753613,"5235":-1.3978432147322983,"5236":0.2096122818105456,"5237":-0.5468037694455978,"5238":0.21097869510581008,"5239":0.34272624879181846,"5240":0.4278376547381981,"5241":-1.2919786391881345,"5242":-0.008096564524692589,"5243":0.02373369227345134,"5244":-0.36815647090171444,"5245":-1.2302290143204364,"5246":-0.3189995508345186,"5247":0.259048627719982,"5248":-0.5097600444170021,"5249":-0.05799902282005358,"5250":0.06883979392699516,"5251":-0.2818458063992593,"5252":0.5065108414461523,"5253":0.6985312312190152,"5254":-0.14316240584156942,"5255":-0.25476755988023025,"5256":-0.3530879067054761,"5257":-0.3859353141620454,"5258":-1.3639904283065194,"5259":-0.13466207890377954,"5260":-0.31563286525733747,"5261":-0.9869465874812531,"5262":-1.1491913848453015,"5263":-0.6312478312234463,"5264":-0.22623363690769116,"5265":0.005352470792021511,"5266":-0.037473510678652636,"5267":-0.1404971664078789,"5268":0.4096011543158591,"5269":-0.2607255029095005,"5270":-0.39573664081025195,"5271":-0.9441684977393818,"5272":-0.5816283629712329,"5273":-0.48726198824130196,"5274":-0.8628216225618541,"5275":1.299836614710441,"5276":-0.4042768561451653,"5277":-0.17817537166827604,"5278":-6.623227437540126,"5279":-4.688363169579655,"5280":-3.1883140561508814,"5281":-2.145925070259067,"5282":-1.7186854956099262,"5283":-0.6941126089295893,"5284":0.8067552364303182,"5285":0.3992472221638262,"5286":-0.6670815144300432,"5287":1.553025607723081,"5288":5.49509524452861,"5289":2.176203793539139,"5290":1.1487222154462637,"5291":0.8833959653376168,"5292":0.3031006664312848,"5293":1.107737340434103,"5294":0.7929818358027965,"5295":-0.5972820976651065,"5296":0.5782857119322737,"5297":2.001228681817219,"5298":1.5841327688458977,"5299":0.7775028615074837,"5300":-0.009338504261262093,"5301":0.5200148723626149,"5302":-0.10096172481243437,"5303":-0.6157572757032045,"5304":0.5410318225585697,"5305":-0.28909033564397024,"5306":-0.1805594005510386,"5307":-0.07761491625814172,"5308":0.21677837359913,"5309":0.17067455491598318,"5310":-0.2568791582231061,"5311":-0.8920611365520995,"5312":0.7272485782689176,"5313":-0.23618804853618725,"5314":-0.2990893899876051,"5315":-1.3688751629949674,"5316":-0.40039872397656867,"5317":-1.2359571709302557,"5318":0.519220777133612,"5319":0.25341094073099585,"5320":1.3776087242433028,"5321":-1.4304109575739559,"5322":0.417711939776462,"5323":-1.0029387661906757,"5324":-1.8355200174353241,"5325":-0.12173696840433024,"5326":-0.6212938361632062,"5327":0.938465621824898,"5328":-0.41301763277833464,"5329":-0.44278131838139584,"5330":-0.6224533619065241,"5331":-0.6078700543095831,"5332":-0.10846063174645758,"5333":-0.2804549813067536,"5334":-0.38901235206238033,"5335":-0.37209276702023275,"5336":-0.13799145202566543,"5337":0.1975397838152076,"5338":-0.161792970608675,"5339":-0.3192938195773242,"5340":-0.2538388057450411,"5341":-0.2716760547487862,"5342":-0.030432818616185124,"5343":-0.3557926046534735,"5344":0.2401010717083623,"5345":-0.5063150845942265,"5346":0.01196760475338083,"5347":0.13518099443581558,"5348":0.6002810034834393,"5349":-0.13446517642350866,"5350":-0.08604110990893163,"5351":0.2780171025268988,"5352":-0.05726200620018242,"5353":-0.010708043861781738,"5354":-0.12472244505777684,"5355":-0.4674434794431273,"5356":-0.1690082733354177,"5357":0.1782336049489668,"5358":-0.4174209656990047,"5359":0.39254413501419066,"5360":-0.1741729668774232,"5361":0.024867759721994117,"5362":-0.231624922281699,"5363":0.0799640028441041,"5364":-0.40535538001126387,"5365":-0.26237180850053615,"5366":0.07907810056596518,"5367":-0.004214040576966219,"5368":-0.21401712814867666,"5369":1.2034371375778186,"5370":1.121908093475253,"5371":0.3043954545720707,"5372":-0.12097296621867688,"5373":-0.12462976442493248,"5374":0.05147533736550772,"5375":0.3473746422242349,"5376":-0.21144241562536975,"5377":-0.4967474859975658,"5378":0.18761476190581788,"5379":0.11997672517732084,"5380":-0.08773642226129638,"5381":-0.4791210834547698,"5382":-0.4326464962411975,"5383":-0.19636086386141552,"5384":-0.14013023974445504,"5385":-0.3729021349626495,"5386":-0.7736359239367159,"5387":-0.7034729430456588,"5388":-0.06118046125104244,"5389":-0.12926002497179492,"5390":-0.11958177563315214,"5391":-0.147832904854742,"5392":-0.08152518312516674,"5393":-0.3563307122647832,"5394":-0.33927233092388004,"5395":-0.19806018395632738,"5396":-0.3247905861576344,"5397":0.08850369931340525,"5398":-0.4120815775189454,"5399":-0.21278932352516286,"5400":-0.0036491451529140806,"5401":-0.3039846336152553,"5402":-0.08480922245394813,"5403":-0.3367471826445099,"5404":-0.4739924151534296,"5405":0.01463860162345363,"5406":-0.2725779808223284,"5407":-0.42464106194453977,"5408":0.4132790755656703,"5409":0.43214882209944255,"5410":0.6569747009997091,"5411":-0.2859621440476681,"5412":0.27139811282404164,"5413":0.055092789205099205,"5414":-1.0827703862015037,"5415":0.014480792734039453,"5416":1.4443625524278483,"5417":0.39598917853639115,"5418":-0.28707645042973146,"5419":-1.7703768475208386,"5420":0.587397972715969,"5421":-1.267018636363111,"5422":1.416007589334343,"5423":-1.8861848886137529,"5424":0.11302277522409675,"5425":0.6038237657382712,"5426":0.44530419599094273,"5427":0.5665749811070131,"5428":0.3709060506563526,"5429":0.6464604065563264,"5430":0.24162566695714022,"5431":-0.812979875554138,"5432":-0.608699635106073,"5433":-2.7283484147980634,"5434":-0.0697701303941784,"5435":1.0404903781672632,"5436":-0.9651257582295685,"5437":-1.9219178376221577,"5438":-0.6964683484088575,"5439":-0.6749016755653351,"5440":2.531931213741298,"5441":1.5570757688104484,"5442":-0.8357502727996092,"5443":-0.8064621753620825,"5444":-2.5884527643880357,"5445":-2.4720711340057773,"5446":-0.23278368712536066,"5447":-0.8201728849694654,"5448":-1.3843642369808742,"5449":-0.7276406976456002,"5450":-0.2529138142417058,"5451":-1.6546488324752135,"5452":-1.2001848712597398,"5453":-1.983617920474163,"5454":1.1520742391360146,"5455":1.7971909846593501,"5456":0.7432150664804092,"5457":0.85996089318175,"5458":0.09968445050463849,"5459":-2.2609236756842597,"5460":1.9557235840278593,"5461":2.1783195158031674,"5462":2.8569564073340956,"5463":3.647499449728033,"5464":2.194428543691932,"5465":2.2742732196604805,"5466":1.3605283230464087,"5467":0.7831812480754906,"5468":-0.9632774525708165,"5469":1.5132773334691096,"5470":0.4987858456345739,"5471":2.7357865598157782,"5472":-0.09060022544898176,"5473":1.4710437497603825,"5474":1.2852461242412334,"5475":1.0600426502723868,"5476":0.24467678552281497,"5477":0.5389072353534533,"5478":-0.976838593777537,"5479":0.5338759021494631,"5480":1.1054073903114816,"5481":-0.6708327967906416,"5482":0.049502700694630856,"5483":0.6912908669961141,"5484":-0.6593393334482254,"5485":-0.11706620758133668,"5486":-0.7388413398326028,"5487":0.7832091865081359,"5488":0.9527731571465905,"5489":1.0817997610895356,"5490":1.513835054264898,"5491":0.19836708617697557,"5492":-0.28765832312967576,"5493":1.0372556154180927,"5494":0.11320918228664872,"5495":-1.181296989540687,"5496":-0.9822608246950792,"5497":0.693371770958235,"5498":-0.7026833810719063,"5499":0.46166901229820734,"5500":1.8366059588726114,"5501":1.3047396203597355,"5502":-0.3477285567091417,"5503":1.328502240862473,"5504":0.31648971003326865,"5505":-0.1536088263300975,"5506":-1.3269472862266005,"5507":-1.5692829141472555,"5508":0.1628221569040053,"5509":0.7776827532266228,"5510":-2.851773815494188,"5511":0.348536458451253,"5512":-0.3321978894619443,"5513":-0.7623279381873528,"5514":-1.3400205361455677,"5515":0.0034574537450971503,"5516":-0.5494354079039736,"5517":0.8582079679935463,"5518":0.2036836711639407,"5519":-0.23116238570522224,"5520":0.7620714671383869,"5521":0.2252987434453837,"5522":-0.7874073479627008,"5523":0.4831714764877479,"5524":0.009972540775799685,"5525":-0.4944761514474303,"5526":0.3101381178812948,"5527":-1.1399157729994882,"5528":0.5539122346436862,"5529":-0.8542495903455863,"5530":-1.3835449223474943,"5531":-0.20831282600670115,"5532":0.9059916827699991,"5533":-1.1399957723061056,"5534":-2.279190895068308,"5535":-2.609241914938405,"5536":-1.2566981686495988,"5537":-1.257099327028446,"5538":-1.069238736813038,"5539":0.013240095459381412,"5540":1.5793310480272238,"5541":-0.1892974380227992,"5542":3.4307836529618005,"5543":7.461059354042502,"5544":3.7608509617085057,"5545":2.41074592957218,"5546":-0.435668559062783,"5547":0.22847748109859972,"5548":-0.739079026242663,"5549":0.15704420417189988,"5550":-0.6033725254500389,"5551":-1.0595138329610756,"5552":2.196229316211055,"5553":0.5416434595044928,"5554":1.7091941166631046,"5555":0.3370349787625464,"5556":2.4922872966724725,"5557":-0.109336081424554,"5558":1.838408562736891,"5559":-1.7386457607213943,"5560":0.8693727208594314,"5561":-0.40760703196394493,"5562":0.8163101833164897,"5563":-0.6433231592592845,"5564":0.05481361775164378,"5565":-0.2557105185412404,"5566":0.6950740297860345,"5567":1.7082972966342866,"5568":2.1753399898918295,"5569":0.29010691825630647,"5570":1.5210032224796128,"5571":0.348604548116533,"5572":0.05570417381543866,"5573":1.5048531186521132,"5574":-0.3198627545099263,"5575":0.06205044032925633,"5576":0.7153640513189955,"5577":-0.533824323362326,"5578":0.03601075455914748,"5579":0.16253519247653606,"5580":0.015841584830373595,"5581":0.2662031470632562,"5582":0.38052492003218563,"5583":-0.525518906197255,"5584":-0.30389873961841757,"5585":0.28634862624406626,"5586":2.3517092772946575,"5587":-0.15007198718530892,"5588":-1.6781099065620444,"5589":-0.5170573576459064,"5590":0.37173376258765434,"5591":0.35412898707476304,"5592":0.07452150188517559,"5593":-0.23353023054184224,"5594":-0.49960298597053504,"5595":0.1921357991687237,"5596":1.616943646318792,"5597":-1.3105154178130507,"5598":-0.7200399905341551,"5599":-0.6097989477731156,"5600":-1.215554892758354,"5601":-0.2868291421765526,"5602":0.8404518377041659,"5603":0.22330727943791837,"5604":0.24620584973126722,"5605":0.63535877616567,"5606":0.16024007576083885,"5607":0.34839404336724206,"5608":0.4716134846895364,"5609":-0.3224105162999422,"5610":-1.788107382197036,"5611":0.17634976550247358,"5612":-1.078238053103195,"5613":2.4320746130290116,"5614":1.758522966084849,"5615":0.9786450277327683,"5616":1.302404310679371,"5617":0.0217179752742862,"5618":-2.602071023755832,"5619":-1.391193575353772,"5620":-0.5291923733691223,"5621":-0.4935512359335081,"5622":1.0794884866491168,"5623":1.5821131696114286,"5624":-3.632614185138873,"5625":-6.31771611359631,"5626":-3.3293794895556186,"5627":-1.7816058941046014,"5628":0.23375112001634163,"5629":-0.10615958001340804,"5630":0.1705007250793649,"5631":0.4852578225713622,"5632":1.5228781289713926,"5633":0.635501461497903,"5634":0.708124483903735,"5635":1.4276673948644931,"5636":-0.5018349198615422,"5637":-1.091287887620193,"5638":-1.1394887543025072,"5639":0.6912911075540306,"5640":1.0235142046313788,"5641":0.3496084085928176,"5642":0.8226061159989743,"5643":0.015767772746672896,"5644":0.21063701946468744,"5645":-0.95713663416699,"5646":1.9207785920985359,"5647":0.29273707047311237,"5648":-0.8763155961511936,"5649":-0.20234510290973134,"5650":0.15470532930222153,"5651":0.7385425091780783,"5652":0.7117138867718033,"5653":0.0855519539814417,"5654":0.5641009239076847,"5655":0.1642381298569716,"5656":-1.1109639391392152,"5657":-0.4639458777252879,"5658":-0.29090369717942133,"5659":-0.25608024844218946,"5660":-0.17453816748753034,"5661":-0.17138945889333249,"5662":-0.16846873902670262,"5663":-0.06244831224488799,"5664":-0.021041043933163868,"5665":0.04457098642757855,"5666":-0.14299656963897492,"5667":0.08079730705675163,"5668":-0.2231106734463034,"5669":-0.2770048537385773,"5670":-0.26439390700105303,"5671":-0.04084488614215884,"5672":-0.07721357481866459,"5673":-0.09409579269438983,"5674":0.023979678310953587,"5675":-0.07816631058397049,"5676":-0.01464677441926532,"5677":-0.2089834194587954,"5678":-0.26954906236597864,"5679":-0.1633288888117167,"5680":-0.032543716609259206,"5681":-0.15613115507390773,"5682":-0.13318999814408405,"5683":-0.12478006516702779,"5684":-0.19285467478161056,"5685":-0.09663498816634503,"5686":-0.25118252143350717,"5687":-0.11517626078858766,"5688":-0.2135544672765074,"5689":-0.09325453165448541,"5690":-0.06313680789598244,"5691":0.09477768495748884,"5692":-0.2179184696378464,"5693":-0.1255829295283251,"5694":-0.06353034754357459,"5695":0.1401003043026061,"5696":0.11807574740613512,"5697":0.7786291155874844,"5698":0.31014450943847266,"5699":0.13933159937379777,"5700":0.06460500968101518,"5701":-0.04339458029445659,"5702":0.07101354136283002,"5703":-0.24581261142043956,"5704":-0.1285142816299531,"5705":-0.12421844247601145,"5706":-0.018728062757688443,"5707":-0.14974442620907785,"5708":-0.1700251686846052,"5709":-0.09284846932430117,"5710":-0.296098279076317,"5711":-0.1688857157064179,"5712":-0.32431874289817647,"5713":-0.15307263435611806,"5714":-0.0984006880017771,"5715":-0.3563418476149221,"5716":-0.1920809873149233,"5717":-0.30521914428419195,"5718":-0.0826260011277347,"5719":-0.12803619494723875,"5720":-0.18086504493552147,"5721":-0.2435809343596635,"5722":-0.1929345551002186,"5723":-0.05660335309180539,"5724":-0.13664736797330893,"5725":-0.12902022722630987,"5726":-0.25313072959409094,"5727":-0.22427175252491752,"5728":-0.06156064263194604,"5729":-0.1714666905927911,"5730":-0.337150975634883,"5731":-0.03965760265961325,"5732":-0.10361752621033629,"5733":-0.2685645679408922,"5734":-0.27303865968286317,"5735":-0.21284964518578248,"5736":-0.11301406989495333,"5737":-0.05572486767531782,"5738":0.012866790995848103,"5739":-0.43302309076447193,"5740":0.38801936171219664,"5741":-1.530122781764487,"5742":-0.8048148411838207,"5743":3.195837380369915,"5744":-2.168376670386868,"5745":1.5452896323811982,"5746":0.6407873289945885,"5747":-0.22232088214568232,"5748":-0.5112310695654984,"5749":-0.35861692212447865,"5750":-0.5865551712672795,"5751":2.91472327482118,"5752":0.9678229411240518,"5753":-0.6069787308005031,"5754":1.6053172260332589,"5755":0.7869802864874739,"5756":0.5174409129681317,"5757":-0.7747837835731604,"5758":-1.0369937188386829,"5759":1.1335745646564146,"5760":-0.3445837152519488,"5761":1.3226359252669655,"5762":1.7636250864862189,"5763":0.1388930481163455,"5764":1.0656669442740196,"5765":-0.7208412662288671,"5766":1.3713386389558455,"5767":-1.0514654437575113,"5768":-0.7643497446852235,"5769":-1.4201422599524525,"5770":-0.2333643758624778,"5771":0.3331158523372046,"5772":-0.3846055472471642,"5773":-0.6591560026533261,"5774":-1.974275599165889,"5775":0.5133302680247046,"5776":0.8929122057136752,"5777":-1.6176263101062296,"5778":-0.38634299229791613,"5779":-1.0858092005998223,"5780":-1.4086322886877805,"5781":-2.578127551419053,"5782":-1.723518933461134,"5783":0.7092719206447672,"5784":-0.9989955714851578,"5785":-0.6524161336739376,"5786":-0.8647111308551656,"5787":-0.7927399902332648,"5788":-2.9605145053491038,"5789":-0.007009522886296112,"5790":-1.148399256167447,"5791":-1.283614711954785,"5792":-0.35049548502178346,"5793":-0.3988463027655614,"5794":0.32206199398570856,"5795":-0.651830419855821,"5796":-0.302522201743922,"5797":0.06589185037302894,"5798":0.16815936946433008,"5799":0.903166405873648,"5800":-0.3546020662780309,"5801":-1.0738566945261738,"5802":1.4196010117171567,"5803":0.1568746860671101,"5804":1.513183228290071,"5805":1.7694310645106361,"5806":1.8945361638536757,"5807":1.6672952005458004,"5808":0.174601001935472,"5809":-0.34290770424625683,"5810":0.6087867170944179,"5811":0.20752773327134497,"5812":0.678582157458283,"5813":-0.8726703588559643,"5814":0.44249164085822346,"5815":1.5217918873228191,"5816":-1.3594706899567381,"5817":-1.1897576847355746,"5818":1.99045675269279,"5819":1.5894598048174413,"5820":-1.70415201399437,"5821":-0.9298283236519939,"5822":-1.0205694411170385,"5823":-1.5793888126795312,"5824":1.2851408937238784,"5825":-0.2864744081553761,"5826":-0.6599727735280847,"5827":1.5296843526118968,"5828":0.7018800187955507,"5829":-0.7589057602516025,"5830":2.526225167628955,"5831":-0.30279121296703965,"5832":0.1634674492952294,"5833":-1.2136417938254307,"5834":-0.35930307616067914,"5835":-0.6323210067594951,"5836":-0.3345746510174161,"5837":-0.827445258227339,"5838":-0.09821211500542745,"5839":0.4868610751860154,"5840":-0.5827320697933424,"5841":-0.17278713118057398,"5842":-0.48749250158162777,"5843":-0.9428295987832984,"5844":0.9070618110086319,"5845":2.1087803584653804,"5846":0.08048256247247548,"5847":1.830256916540195,"5848":-0.891142867336531,"5849":0.6053381890312071,"5850":-0.8075989323543176,"5851":1.1096727545321654,"5852":3.19883211377755,"5853":2.0720222069433714,"5854":2.1897920647602906,"5855":1.4186362567795965,"5856":0.49089418785759753,"5857":0.23695269380172293,"5858":0.3994951080775098,"5859":-0.4826832008415653,"5860":-1.1256427928325001,"5861":-2.296398305319396,"5862":0.6778491208916169,"5863":-3.480753374273054,"5864":-4.130077432105863,"5865":-1.2596000501842852,"5866":-2.2121979540136287,"5867":-0.6000567594295806,"5868":0.7546411587821434,"5869":-1.38895074325872,"5870":0.6931734195091764,"5871":1.2879240591049526,"5872":0.3638379587526139,"5873":2.4490730013075415,"5874":0.8725183615264435,"5875":3.9698828889470885,"5876":-0.2225189563477642,"5877":-0.6835893079137076,"5878":1.2892363893591994,"5879":0.9269439469351717,"5880":-0.9054157285859115,"5881":-1.7585729368460306,"5882":0.6017338642911165,"5883":-1.0459023841269028,"5884":0.06024560138148646,"5885":0.5371540418435964,"5886":0.46599077563238445,"5887":0.5200011900383367,"5888":0.38499979386993666,"5889":-0.8452456009273357,"5890":-0.5863329850238977,"5891":-1.8078848153342733,"5892":-0.11947215657645678,"5893":0.8751196559264454,"5894":-0.5373578641065536,"5895":-0.4475241949181368,"5896":-1.396549372085507,"5897":0.1651113552480759,"5898":0.6168924256363851,"5899":1.6615917525969721,"5900":0.5355139062188463,"5901":-1.0659938216256513,"5902":1.63303075813936,"5903":1.838914395809169,"5904":0.4020129969690147,"5905":0.605552123025951,"5906":-0.4106911632217347,"5907":0.757931070536706,"5908":-0.7113409296403425,"5909":1.9589882982657734,"5910":1.2253872065501945,"5911":-0.6360248235554928,"5912":0.5021948089920444,"5913":-0.3893521595694754,"5914":0.23921159738283088,"5915":-3.0595404547704668,"5916":-0.49128128152601686,"5917":1.281229285658899,"5918":-0.3471216112454834,"5919":-1.442106069418939,"5920":1.6181499781517439,"5921":-1.800040345746024,"5922":1.6235830628662817,"5923":-1.6493533804205724,"5924":1.5689002416645672,"5925":0.4720427498493082,"5926":-0.5041106742137179,"5927":1.8072505740961584,"5928":-1.7075569094607723,"5929":1.8482684284164659,"5930":-0.3422357329396343,"5931":-0.7977836945109889,"5932":0.660869131494902,"5933":-0.6232820475920242,"5934":-0.014840335674586858,"5935":1.560099264974944,"5936":-2.22729065601414,"5937":0.4046724008249337,"5938":-0.5882267188236583,"5939":0.8317465503415756,"5940":0.7871254371304003,"5941":-0.0023822817320168816,"5942":0.23038063215715265,"5943":3.4405252396569574,"5944":3.129221872942995,"5945":2.5068084512949595,"5946":-0.3314563150184288,"5947":-0.35634934189351414,"5948":0.5745108316015715,"5949":-1.9427173961341762,"5950":0.9273785386471985,"5951":-2.4997507976171622,"5952":-0.3523375955519745,"5953":1.8676342403787152,"5954":-1.6979871998510785,"5955":-1.3420215485175735,"5956":-1.0879421910414246,"5957":0.1492527578456928,"5958":-1.8546579902737121,"5959":1.5494552924393066,"5960":-0.8273662554030697,"5961":-1.4051906746747038,"5962":-1.3348846990583347,"5963":-0.1098065775541819,"5964":0.3839789347829047,"5965":1.3467497872954757,"5966":0.7922484851996049,"5967":-0.42527243699997713,"5968":-0.5998957097328146,"5969":-0.3228193298068464,"5970":0.7139422133199022,"5971":-0.6304559411143632,"5972":0.4626683914223449,"5973":-1.4775086732490144,"5974":0.5206488533936965,"5975":-0.5645766640740298,"5976":-0.6027679092440051,"5977":-0.058952716418660726,"5978":-1.8751208407836668,"5979":-0.9041179588085207,"5980":0.3388922964847897,"5981":1.6552527307577192,"5982":0.20269222188798855,"5983":-0.06156328362668471,"5984":0.6856705565104033,"5985":-0.45728112542283,"5986":-0.28640550628608075,"5987":-0.29098236686502327,"5988":-0.5702154949860302,"5989":0.20948788812108746,"5990":-0.0932623257873998,"5991":0.17018437200893116,"5992":0.025466159799344624,"5993":-0.23746329288483578,"5994":0.09708385160590051,"5995":-0.35034938944239946,"5996":-0.7377415936947709,"5997":0.5168976390900459,"5998":0.11176123681113918,"5999":0.587007753692818,"6000":-0.007930285140980533,"6001":0.4324062161558999,"6002":0.02862293527816599,"6003":-0.5550869786125777,"6004":-0.7311042212150733,"6005":-1.2346725344123823,"6006":-0.07512497883155375,"6007":-0.5942186018294155,"6008":0.4073415429392604,"6009":-0.6194865436680035,"6010":-0.48927802920472835,"6011":-0.0017175220099567422,"6012":0.01935222424007972,"6013":-0.5331762109802698,"6014":0.8644204483830608,"6015":0.9686961869844398,"6016":0.24087658556606345,"6017":0.5912007839630145,"6018":-0.42175278751052997,"6019":-0.1845983672841557,"6020":-0.5879561396740135,"6021":-0.8974160412973857,"6022":-1.1347913146948376,"6023":7.662930144680867,"6024":8.446613915815513,"6025":1.369055483756256,"6026":0.21511090819326573,"6027":0.5558397402473975,"6028":0.26334932782388987,"6029":-0.18735925277151996,"6030":-0.9594920783690787,"6031":0.7525183647648601,"6032":0.09948519463772046,"6033":0.9899818978741863,"6034":-0.48584861335943197,"6035":0.09072331183747753,"6036":-0.19560907252002527,"6037":0.4812682879115595,"6038":-0.26010220635392794,"6039":-0.6563385059008761,"6040":-1.280011230029183,"6041":0.37336663169906614,"6042":0.2669420132569056,"6043":0.07790281889468664,"6044":0.24345315004414672,"6045":-0.3279418536619434,"6046":0.6898126980695283,"6047":0.20262522277729675,"6048":-1.1652910741818225,"6049":-0.27682562876402905,"6050":-0.7627265195033259,"6051":-0.6214569196012988,"6052":-0.36580544492259676,"6053":-0.08151400589168932,"6054":-0.6068069624386008,"6055":-0.6893481825463478,"6056":-0.14799610043356967,"6057":0.07511949813191342,"6058":-0.7498785740583667,"6059":-0.052656681044344185,"6060":-1.0324843771354613,"6061":-0.5936880059103871,"6062":0.16017434622798954,"6063":0.26707893148239314,"6064":0.19562640018027577,"6065":-0.1159017376208057,"6066":-0.587941267361813,"6067":-0.5450082859694253,"6068":1.2769173847548667,"6069":0.8868785917384263,"6070":0.5681924688696036,"6071":0.6111804277138194,"6072":0.18602689911948914,"6073":-1.3845412813740163,"6074":-0.3987024738549688,"6075":-0.06653852361410556,"6076":-2.4435631740141712,"6077":1.9625057114781101,"6078":-0.029348721044290822,"6079":-0.12064415660676753,"6080":0.3979839175170864,"6081":0.28158662425923636,"6082":0.730380720226236,"6083":-1.5295196428766034,"6084":-0.07391190478074545,"6085":-1.3177643153231389,"6086":0.03695319060866107,"6087":1.3173253463875059,"6088":1.2677400011516833,"6089":-1.3601800094551748,"6090":-1.6950528677902776,"6091":-0.43657411574199495,"6092":-0.7744347243173939,"6093":0.09128436221513477,"6094":1.3631579883464322,"6095":0.7938363621572669,"6096":1.84812600364992,"6097":1.982836447381841,"6098":2.2295040757774824,"6099":1.608462268501128,"6100":-1.027257359157299,"6101":-1.8674619185828194,"6102":0.9740420543178029,"6103":1.6574636466118828,"6104":0.2819592132566193,"6105":-1.3079422074347085,"6106":1.4722253620057772,"6107":0.06618356650622546,"6108":-4.481388537149342,"6109":-3.4918180947029738,"6110":-1.0249670923379477,"6111":-0.29122993839980205,"6112":-1.0137406158815983,"6113":-1.6599113394351785,"6114":-0.27778749353563903,"6115":-0.01201659711235377,"6116":-2.4165615348198495,"6117":-3.197209710940609,"6118":-1.0651857211635851,"6119":-1.9375903143460518,"6120":-0.20053277548402984,"6121":-1.4329130012384255,"6122":-1.3969500168887308,"6123":-1.0019356491216609,"6124":-0.12457081782473504,"6125":-0.8032936191787606,"6126":0.23535379231217984,"6127":-0.4333940300456113,"6128":-1.2860078058135875,"6129":-0.8484258572211363,"6130":-0.6651838565219818,"6131":0.6139770406922129,"6132":-0.48956416439806694,"6133":1.9311627925830173,"6134":-0.3752467052253666,"6135":0.27726654560189723,"6136":0.07696446403190495,"6137":-1.7262269008033078,"6138":0.6382715467533191,"6139":-0.714164938411071,"6140":0.8538243447781765,"6141":-0.10654738394279512,"6142":1.2704031550601032,"6143":0.0020737567015968674,"6144":1.211903750291094,"6145":0.19290179858453357,"6146":-0.883307094166319,"6147":-0.2620587594164577,"6148":0.23571851399532678,"6149":1.182227434308959,"6150":-0.6085910237671958,"6151":1.1583790843098178,"6152":1.193016102358333,"6153":0.4754736905478918,"6154":0.6207158151563481,"6155":-0.09118586124441222,"6156":0.7812247131414936,"6157":-0.027701743257494308,"6158":-0.4435440668380677,"6159":-0.9084670980758943,"6160":0.47452685000570777,"6161":-0.7323421199454234,"6162":-0.8291899260866337,"6163":-0.25231130309681327,"6164":0.3289388820609007,"6165":-0.7655992379691134,"6166":0.02272844261670923,"6167":0.5660340008302951,"6168":-1.272040160644281,"6169":1.7542216404958368,"6170":-1.8988536476162594,"6171":-1.3017270896441782,"6172":0.44737196062087936,"6173":3.3144843698185564,"6174":0.22145459999085332,"6175":-1.9804177030442585,"6176":-0.8145812871910988,"6177":-0.15464240313783098,"6178":1.138165186194132,"6179":-0.24848624182684084,"6180":-3.2079931833183446,"6181":-1.9325266681501356,"6182":-0.7200487158140091,"6183":-1.9028589860114102,"6184":-0.23349050781643274,"6185":-0.8778717125817885,"6186":0.9150183562424463,"6187":-0.3956561969912891,"6188":-1.4618229102749527,"6189":-0.0861307309117772,"6190":-3.316519149000093,"6191":-2.7876554419548425,"6192":-0.5059112409206474,"6193":1.58352677873304,"6194":-0.8194594943222414,"6195":-0.547284464526934,"6196":1.234878751945879,"6197":0.5068122465924623,"6198":-0.7732144144659594,"6199":0.3553994666675114,"6200":-0.6370294739472855,"6201":-0.7712104855005882,"6202":-1.1381261538946743,"6203":-0.810501997686759,"6204":-0.058616773831052106,"6205":0.16445103961103144,"6206":-2.8548626806881856,"6207":0.4072285547551811,"6208":1.6330584116493134,"6209":-1.0269354424190544,"6210":-0.5930078200701351,"6211":-1.9982590911992868,"6212":1.8059261368261887,"6213":-1.4420419928134485,"6214":-1.0519905912418215,"6215":-0.18707903673313936,"6216":-0.7700866351812098,"6217":1.2922177074830643,"6218":1.9796260501487606,"6219":2.080640750174347,"6220":-0.9063929195474297,"6221":0.7026703889057945,"6222":0.01191119718397403,"6223":2.1352051233424034,"6224":-1.4937375742992947,"6225":-1.0037450499446574,"6226":0.1019897941091894,"6227":0.6469076220140694,"6228":0.07023843094338972,"6229":0.33111459959712924,"6230":0.11063126240679354,"6231":1.429856194783404,"6232":1.5372827619040477,"6233":-1.1317136779122656,"6234":-1.1047451245810838,"6235":1.0792674497362185,"6236":-2.3441840070285154,"6237":0.6657513827934193,"6238":0.16162458004635896,"6239":1.6599140738482387,"6240":-1.4223991401879785,"6241":0.9963305860818744,"6242":-0.9119492292870307,"6243":1.4387024894482803,"6244":0.03852068160044659,"6245":0.5212079906958133,"6246":0.01585892817177646,"6247":-0.6579119517118619,"6248":0.5983094034645475,"6249":0.154945000661468,"6250":-0.888350371274864,"6251":-1.0012234072907467,"6252":0.737735507244579,"6253":-1.2232668816736816,"6254":0.017215722117556495,"6255":0.9164233147758637,"6256":0.9007309173867261,"6257":0.15192576600805124,"6258":0.34263758219459106,"6259":-0.8413334331604341,"6260":-2.6102154031043034,"6261":-0.05121315433276155,"6262":-0.9294155605088097,"6263":-0.5282299584029625,"6264":-0.001861829580364703,"6265":-1.1136709300287262,"6266":2.7171109656221786,"6267":2.9796458943850657,"6268":-1.3582110310152167,"6269":-0.6451374712752062,"6270":-0.22780413834231644,"6271":-0.25082548169833807,"6272":2.7592772979073623,"6273":2.353739600107712,"6274":3.2392098713046344,"6275":1.376113346098289,"6276":1.2223575437207586,"6277":-0.21365824646430606,"6278":0.16575909964843222,"6279":-1.281130171187929,"6280":0.1637410309142656,"6281":-0.8007043194498433,"6282":-0.7396811162410472,"6283":-1.4633240003699204,"6284":-0.5128281893423241,"6285":0.8195676317840062,"6286":0.5472910425082586,"6287":-1.5145603962081313,"6288":-0.201040809265058,"6289":0.9332253894506221,"6290":-0.24344245663836397,"6291":-0.24567273284491603,"6292":-0.8830376638905045,"6293":0.8017222951308656,"6294":0.49572882767869914,"6295":0.5888182708354727,"6296":0.5537022595215184,"6297":0.17282889569892393,"6298":0.01602063444824432,"6299":-0.8472739058167855,"6300":0.12059743535557717,"6301":0.3492824881432443,"6302":-0.04275277720021633,"6303":0.1297003043978619,"6304":1.999437809299242,"6305":-0.9894032591098519,"6306":-0.38006921404629107,"6307":-0.468322414264117,"6308":-0.015911857016975964,"6309":0.9749774812454384,"6310":0.24066359668625473,"6311":1.5447357789086942,"6312":-0.006952878598973491,"6313":-0.2608900169959148,"6314":-0.44260582644821617,"6315":0.20236568752449458,"6316":-0.6653417389501431,"6317":-0.69729264182739,"6318":0.5515791521740225,"6319":0.7304492093314416,"6320":0.7215450164179908,"6321":0.8416998323553017,"6322":-0.44412170148240054,"6323":-0.6075571234955514,"6324":0.10867633204078209,"6325":-0.5238215468486208,"6326":-0.21439406444298892,"6327":0.47506293983023845,"6328":1.290532843577734,"6329":0.06084532310289904,"6330":-1.6028763542226845,"6331":-0.29160544429088137,"6332":0.6619866125803926,"6333":0.6578661142832024,"6334":0.5251929250772509,"6335":0.36617577432460824,"6336":-0.7355453013446849,"6337":0.7997174039868366,"6338":-0.7241101955590014,"6339":-0.6436321747894923,"6340":0.11442499651298436,"6341":-0.7067846772890061,"6342":-0.29070460326083264,"6343":-0.0828984344203416,"6344":0.11557553518225133,"6345":2.886986653379205,"6346":1.267573636009874,"6347":0.7596244517485019,"6348":-0.33457015793633366,"6349":0.46038054448916604,"6350":-0.39479390225913846,"6351":0.41652551651750896,"6352":0.815546387579665,"6353":10.813452279493019,"6354":8.275346846373981,"6355":3.8093832921129875,"6356":-1.561517017330444,"6357":-0.7418258704940308,"6358":-0.46042195873686675,"6359":-0.22237415536529662,"6360":0.922696958504343,"6361":-0.14835467010350814,"6362":-0.4393452135552435,"6363":1.1283852514965058,"6364":1.345713390924633,"6365":0.46247750341774035,"6366":-0.7589971044786806,"6367":-0.8441814800550734,"6368":0.3525176577347208,"6369":0.06529574961709692,"6370":0.19833335511649547,"6371":-0.3469727466541589,"6372":1.0286828082276889,"6373":-1.2593313049527066,"6374":1.0594360301604382,"6375":-0.8401403545213004,"6376":0.057863634524006724,"6377":0.3661499644043119,"6378":-0.5464423441730992,"6379":-0.6717838269642392,"6380":0.058871150498278325,"6381":0.6511949862878662,"6382":-0.10318644929565512,"6383":-0.3452013332718313,"6384":0.3565638466464067,"6385":-0.49267965737291053,"6386":-0.33206224080431385,"6387":-0.15495966824624818,"6388":0.4090564423215121,"6389":-0.8252334106876182,"6390":0.8986851441793311,"6391":-0.06897106679005724,"6392":0.4178323854116546,"6393":-0.3802319870561564,"6394":0.9652533540511542,"6395":0.2403731870972283,"6396":-0.6384417993738882,"6397":0.2909880483756917,"6398":-0.8887288403855701,"6399":-0.40380128035425056,"6400":-0.4416966825903357,"6401":0.45014453640138036,"6402":0.41907777511290145,"6403":-0.10310923521509859,"6404":-1.514035959351036,"6405":0.8515926672550749,"6406":-0.3864552872309923,"6407":1.5671577346614025,"6408":-2.4075411895575454,"6409":-0.9131727233627309,"6410":1.0967409730819226,"6411":0.6177339153576031,"6412":0.05031268167260295,"6413":1.0486879607904065,"6414":0.38961781081350655,"6415":-0.7407929929391183,"6416":-1.4689163603763418,"6417":0.4606991853690818,"6418":1.1271081254084172,"6419":0.43126819973893793,"6420":0.2075678935819068,"6421":-1.1359331242326978,"6422":-0.2839299960525319,"6423":-0.9154914213696823,"6424":-0.3652858415561268,"6425":-0.2779108927476711,"6426":-1.5407355268882599,"6427":-0.514860561152986,"6428":-0.25327639495600646,"6429":0.6862208902163065,"6430":-0.4926548880269921,"6431":-2.5805593013028156,"6432":0.17486767065186898,"6433":1.650711493399806,"6434":0.40293284153768794,"6435":0.5433210308876052,"6436":-3.0098932489592216,"6437":0.324246506554659,"6438":-0.5420651651745938,"6439":-0.4853973414363041,"6440":-0.31769602672330427,"6441":-0.859446333938923,"6442":-0.5800013476581938,"6443":3.299015925607487,"6444":4.122011539222017,"6445":3.003321651198995,"6446":0.8134881833334667,"6447":-1.0633115431675186,"6448":1.0757104626590346,"6449":1.1418343384540222,"6450":1.1521591829239823,"6451":-0.2785706825554734,"6452":0.6907278721800167,"6453":1.472923508123189,"6454":1.6898332909024352,"6455":0.5895116871513099,"6456":-0.27526590395484746,"6457":0.34018331509638655,"6458":-0.47713909835854224,"6459":-0.4011964073051763,"6460":-0.0013845428762151281,"6461":-0.09988293759273914,"6462":0.3229514888321747,"6463":0.06684057174756837,"6464":1.5236929221203508,"6465":1.9207825538897556,"6466":0.7796615871821856,"6467":0.5831934582897813,"6468":1.7710135803004086,"6469":0.302872482596565,"6470":-1.096064955358606,"6471":-0.47767782775749296,"6472":0.9288894303701126,"6473":0.5012726682966293,"6474":1.5925747780928607,"6475":1.7691612750094567,"6476":0.17368483533527432,"6477":-0.7024245503349922,"6478":-0.3731256617747152,"6479":-0.7928924323011239,"6480":-0.17331794011781,"6481":0.40463881513881206,"6482":-0.1822538769556412,"6483":-0.46955113019248196,"6484":0.34627825197109,"6485":-1.2773517868899387,"6486":0.27290480830400055,"6487":0.10069343804501785,"6488":0.8754559934941831,"6489":-1.1024649576748595,"6490":1.553894653268228,"6491":-1.060398112699569,"6492":0.03803834866201793,"6493":-0.5350840916464645,"6494":-2.4085071921476593,"6495":-0.36164878264239114,"6496":1.601073685593482,"6497":0.7352845373118584,"6498":-1.6783116601488788,"6499":0.5691861943911237,"6500":-0.6693601214349817,"6501":0.027557112446052412,"6502":0.20555361882532586,"6503":-0.9396152004424659,"6504":-0.9070074211671368,"6505":-1.5367022371254961,"6506":-0.09929565692424197,"6507":1.252829432397836,"6508":1.1446370786684028,"6509":0.6630676978396972,"6510":-1.2125487712303036,"6511":0.40387816556412676,"6512":0.29582928164892835,"6513":1.2692437363121587,"6514":0.22248353801395568,"6515":1.4904877888822368,"6516":-0.3229018464809196,"6517":7.815058025238666,"6518":2.5040429041216585,"6519":1.8492989321710904,"6520":-1.4646895794577488,"6521":-0.39827735840385814,"6522":0.36599344164170283,"6523":2.5742044586689796,"6524":0.7597976479729076,"6525":-2.384184725908527,"6526":1.031905271928654,"6527":2.3809946696055486,"6528":1.225931407511751,"6529":-0.42399540119251217,"6530":-0.34627669062904687,"6531":0.4528239130941134,"6532":-1.889175947991077,"6533":-0.46286348921529863,"6534":0.7796443789951037,"6535":0.9712152359697943,"6536":-1.4059805938625207,"6537":1.132773332178498,"6538":-0.5621086013409288,"6539":-0.5273736397533958,"6540":-0.22722990811751548,"6541":-1.4473216422420059,"6542":0.9933042395448651,"6543":-0.8502695002954199,"6544":-0.7785900337905379,"6545":0.2443401469484298,"6546":1.2489927631525761,"6547":-0.758018669896466,"6548":0.06600688650552597,"6549":-1.0276155230837003,"6550":0.6386249287067878,"6551":0.07785465102592183,"6552":-0.4198139382661837,"6553":0.24639138804550328,"6554":-0.38639282020535826,"6555":1.1733863962246887,"6556":1.1165107341655884,"6557":-0.9472241105514475,"6558":-1.79920885933614,"6559":-0.076919436546101,"6560":1.0663808687426817,"6561":-0.7967374041912586,"6562":-0.42403376275940213,"6563":-0.555383799391189,"6564":1.0293538097294128,"6565":-1.2916258269073626,"6566":-0.2481861503186539,"6567":0.6535320595253932,"6568":-1.9536281966765494,"6569":-0.747624132740437,"6570":0.11213569030092004,"6571":0.5280076732166881,"6572":0.20437491186405285,"6573":0.6642488990049215,"6574":-1.4692685404620722,"6575":-1.6506878656156474,"6576":0.7906469031928692,"6577":0.3142140731413945,"6578":0.7735672716044149,"6579":1.174074630767609,"6580":0.8626036523960867,"6581":-0.544168289847524,"6582":0.28073993044318907,"6583":-1.0058608653400323,"6584":1.23242087551478,"6585":0.1454530418650458,"6586":-0.24982471799208528,"6587":-0.5136782991532893,"6588":-0.8431834983284202,"6589":1.6692172962429794,"6590":2.487600368628867,"6591":1.7809244061323442,"6592":2.917802994511575,"6593":0.2188213038508176,"6594":0.7800609370037995,"6595":0.5583602100738407,"6596":-0.24928564545758575,"6597":-0.9184309320956449,"6598":0.4649364127735165,"6599":1.1850218916499584,"6600":4.582165711839465,"6601":1.898989897342704,"6602":1.19771861168202,"6603":-0.24436263916098766,"6604":-0.6749708466024503,"6605":-0.4558362149920619,"6606":-1.4965893970108761,"6607":1.3280348647498033,"6608":-0.8229830757146903,"6609":-0.3537173304750739,"6610":1.9426532689070921,"6611":-1.031473578957543,"6612":-1.0550958475487142,"6613":0.9298375504777044,"6614":-0.6304788869225805,"6615":-0.8069964218815135,"6616":0.8034369370804543,"6617":0.06278847938068415,"6618":-0.3935105049945205,"6619":0.6368539887460383,"6620":-0.06981162157173339,"6621":0.43026235572236343,"6622":1.3595520323287722,"6623":-0.17659122718367037,"6624":1.159763775362143,"6625":2.287132815704211,"6626":2.243574395529082,"6627":-1.4938812730025677,"6628":-0.6940139445740521,"6629":1.0799477761534682,"6630":-2.8517086065104054,"6631":-0.23108747990916642,"6632":1.7188391729787669,"6633":-2.397124439576739,"6634":-0.814918389664015,"6635":1.1180232034198483,"6636":0.04316699994129578,"6637":-1.501771451812702,"6638":-1.8767921091147954,"6639":-1.9615097373822241,"6640":0.36125289809292893,"6641":-0.40181744325523616,"6642":-2.447075501619015,"6643":0.7286023158184738,"6644":-1.2600471134215916,"6645":3.4414748903590566,"6646":1.4472223877467367,"6647":1.1057354826058614,"6648":0.6617790802521384,"6649":0.7278257704871411,"6650":0.5385429915631641,"6651":-0.2620373825040863,"6652":0.18460438044522945,"6653":-0.9811900372002336,"6654":2.1313857335898123,"6655":1.0480540938152276,"6656":0.9971218346683806,"6657":0.9255866280067159,"6658":0.9402020630961478,"6659":0.7365541476308441,"6660":0.48458662393659213,"6661":0.8351644836222757,"6662":-1.2905056170099691,"6663":2.8467586476461406,"6664":1.9939999480087556,"6665":1.4434319293677058,"6666":0.5835231633314047,"6667":0.45472616475665,"6668":0.8220957749193091,"6669":-1.2739604881639799,"6670":-0.05082540533601838,"6671":-3.1524661504805267,"6672":2.687982105302588,"6673":1.4051676061457017,"6674":1.1177878920646442,"6675":0.572452857123194,"6676":0.3596783929154728,"6677":0.44692595601573676,"6678":-0.678973154749553,"6679":-0.30750906404496237,"6680":-2.6848242851880384,"6681":2.081374579407536,"6682":1.9051637349028803,"6683":1.356728348008517,"6684":0.4442552206900106,"6685":0.8651202364606837,"6686":0.27735581766246736,"6687":-0.12657974824565837,"6688":0.46944780123365615,"6689":-1.0723642767971409,"6690":1.8103010285492322,"6691":1.5842196839283724,"6692":1.2027953698986893,"6693":1.3644075559752533,"6694":1.2745373842993564,"6695":0.6142976742454678,"6696":1.6206727188103676,"6697":-0.27580686895658735,"6698":0.8200075375257841,"6699":2.6203850350667244,"6700":2.214184821580764,"6701":1.0678770677994658,"6702":0.6905505834752986,"6703":0.5643217837704622,"6704":0.5896253133118168,"6705":0.49523367048650235,"6706":-0.5771357199895087,"6707":0.8272856016034204,"6708":2.3217205502351255,"6709":2.025659922396619,"6710":1.2809112014592838,"6711":0.6454724143902906,"6712":1.0342972564526907,"6713":0.7832731809577471,"6714":1.8599138393743981,"6715":-0.7219598526018207,"6716":-1.2310576171208445,"6717":3.7089009787895866,"6718":1.8548234206580068,"6719":1.2193819906650807,"6720":0.708036180086603,"6721":0.39022514274346154,"6722":0.7238484834404679,"6723":0.2057848211877843,"6724":-0.7199812232477014,"6725":0.4607376982062134,"6726":0.8878678255177367,"6727":-0.4780630993620503,"6728":-1.2857092327340403,"6729":0.4549136373951124,"6730":-0.4653205252249017,"6731":-0.543840478146514,"6732":-0.5772410641403939,"6733":-0.6350342445606311,"6734":-0.40006070522435216,"6735":0.5099293072432292,"6736":0.05473047521848831,"6737":-0.23220044244615837,"6738":0.8913474235948114,"6739":0.5253061696171678,"6740":0.688081354205758,"6741":-0.2805090410068894,"6742":-0.21691974839320588,"6743":0.2640486962209571,"6744":-0.06052699250264515,"6745":-0.3406038696215125,"6746":0.3370995867374004,"6747":0.08514605102603338,"6748":0.37100990135491857,"6749":0.13192949868108567,"6750":-0.00017667366489075987,"6751":0.328765168536128,"6752":0.8183879646550891,"6753":0.1629558719680306,"6754":0.12347569075532842,"6755":0.2456850924596938,"6756":0.04481055760235755,"6757":0.4023166183620439,"6758":0.6620274229108796,"6759":0.3725155487313225,"6760":0.39390715262404213,"6761":-0.1398144001205545,"6762":-0.4268541575733353,"6763":-1.0799643337729083,"6764":-0.45263452977169366,"6765":0.11392378839905963,"6766":-0.965887400421119,"6767":-0.4177608175645797,"6768":0.06507811490033734,"6769":-0.015376262761366064,"6770":-0.5820829794155602,"6771":11.51829836947981,"6772":-1.7834299082054845,"6773":-0.7756186860335779,"6774":-0.24030664969436616,"6775":0.3123599630402717,"6776":-0.5879311953293348,"6777":0.5274162240875139,"6778":0.8812869263670617,"6779":0.46146209243379577,"6780":0.10878424035661205,"6781":0.14560080860897057,"6782":-0.778229140445344,"6783":-1.151309846684286,"6784":-0.6103857496930309,"6785":-0.36364858035474007,"6786":-0.343514270624669,"6787":0.7387860090046106,"6788":-0.33910033302137166,"6789":-0.7479412672248074,"6790":0.20039456301058564,"6791":-0.20927065100119355,"6792":0.44867455741004625,"6793":0.2626620997178589,"6794":-0.6687510184864643,"6795":0.22910279019538068,"6796":0.18147540013443497,"6797":-0.5914437732309799,"6798":0.8341311462839915,"6799":0.36832405710261207,"6800":-0.6669927331264045,"6801":-0.7287123012826604,"6802":0.0699371931023892,"6803":-0.8890278259589595,"6804":0.23099036744836846,"6805":-0.5754603615077664,"6806":0.7227595090256707,"6807":0.7929423736616278,"6808":0.27246097810055453,"6809":-0.34130283173728737,"6810":-1.0473678785793454,"6811":-1.0048673978990499,"6812":-0.2815035066910029,"6813":-0.500403117375743,"6814":-1.495414750157743,"6815":0.06439631938318222,"6816":2.258289294672924,"6817":0.20582308806705799,"6818":-0.19349248865624114,"6819":-0.6950165480040388,"6820":-1.2063466927152733,"6821":-0.6894165523301212,"6822":-0.9680837344891858,"6823":-0.1562991312006136,"6824":-0.7334472314581795,"6825":-0.014243846285434885,"6826":-1.2995634857515197,"6827":-0.10921064785501129,"6828":-2.619926334890695,"6829":-0.9965647363641567,"6830":-0.33393185140083054,"6831":-0.45382264373475584,"6832":-0.8863723729860368,"6833":-0.42356587316550476,"6834":1.9640272265760021,"6835":-0.9890739022205967,"6836":0.8732727089755263,"6837":-1.079103467611928,"6838":-1.2696525436077282,"6839":-0.5650756205500385,"6840":-1.004330810151019,"6841":-0.1954198607351107,"6842":1.064605814044976,"6843":1.9475351627906121,"6844":0.9826994717950849,"6845":1.8405946722777735,"6846":-1.2753592415740118,"6847":-1.767551472348951,"6848":-0.41764524769360767,"6849":-0.5091038252187876,"6850":-0.9224712399134116,"6851":-1.4473212950915217,"6852":0.2624009376710164,"6853":-0.9419916019198252,"6854":0.035013656570045376,"6855":-2.548290517588006,"6856":-2.1779446131319244,"6857":-1.0292036050585822,"6858":-1.0007884095808026,"6859":-1.0574105718066962,"6860":-2.887316760128487,"6861":-0.30042722446992365,"6862":0.9481237125165041,"6863":1.2048055779539029,"6864":-2.0965680728862277,"6865":-1.7085228036477311,"6866":-1.6592545483227492,"6867":0.4751317767304353,"6868":-0.8553077733835103,"6869":0.266158807291962,"6870":-0.6696449850606758,"6871":-0.374712634983948,"6872":-0.023859989609382893,"6873":-1.5409499554048358,"6874":-1.8148504905723744,"6875":-0.7689985701183523,"6876":-0.37319128598758444,"6877":-1.0074288762623682,"6878":0.11238855772526464,"6879":0.0986884052529516,"6880":-0.5032676726775512,"6881":-0.29702698591206544,"6882":-1.0042732281704725,"6883":-2.0726827505304786,"6884":-0.9559046047677111,"6885":-0.46582600610722785,"6886":-0.34507687012413496,"6887":-0.3326526029270424,"6888":0.34799116538752256,"6889":0.2675109328302758,"6890":0.5709290778511604,"6891":1.3643387500577602,"6892":-0.300002467176721,"6893":0.12632550175835788,"6894":-0.18822094278003057,"6895":-0.5602237298659636,"6896":0.6116435242884809,"6897":-0.2628548303283337,"6898":0.2916254608417197,"6899":-1.7032454907660197,"6900":1.4224852410154958,"6901":0.5993036406163887,"6902":1.308136094347304,"6903":-1.8529058435513692,"6904":1.4419838030236338,"6905":0.23437390507428968,"6906":1.2370902254595586,"6907":-0.0029423626917313953,"6908":-0.2915653880431636,"6909":0.6687471043526789,"6910":0.029339558183054483,"6911":1.4411466112202453,"6912":-1.074684439615518,"6913":0.7187934810002722,"6914":1.0898472561245869,"6915":0.4597242888022097,"6916":-0.40901120056998774,"6917":-0.045035343801874,"6918":0.741896201636359,"6919":-0.53776173759715,"6920":-0.5066272832662693,"6921":-1.5594770814729693,"6922":-0.7285040293496448,"6923":1.8081452503805493,"6924":-0.7812787264487742,"6925":-0.2793018957550611,"6926":0.23355284816068905,"6927":0.5822392463336851,"6928":-1.6216820797879177,"6929":-0.5412530906382539,"6930":0.8938562793963639,"6931":0.23316385786440397,"6932":0.7263751776177219,"6933":-0.16522756212580184,"6934":-0.6693804875627597,"6935":-0.7645930027657807,"6936":0.8127646251761297,"6937":0.6397394594172593,"6938":-1.1757382649853216,"6939":-2.8270587661295847,"6940":-2.275323913063554,"6941":-0.07076356299144798,"6942":-0.8122757722482139,"6943":-0.7287074048062077,"6944":-1.3838573788351431,"6945":0.43311029516378735,"6946":-0.6580701440445158,"6947":0.41400315472178956,"6948":0.00929166820064345,"6949":-1.2450346020961356,"6950":-0.8834471729886105,"6951":1.1155181661406213,"6952":-0.6077537222843796,"6953":-0.07398603398881698,"6954":0.2086361182968212,"6955":-0.8257720711181845,"6956":1.534064668452088,"6957":-0.08998890252979615,"6958":-2.510145794983395,"6959":-0.6342250375482739,"6960":-0.012103366318417073,"6961":0.8735194088849874,"6962":-0.12947251996083753,"6963":-0.4901954761340744,"6964":-0.18370089954602417,"6965":0.4583939943897484,"6966":-0.9735832575954081,"6967":0.6071422701952124,"6968":0.44027513867444285,"6969":0.1471603004533895,"6970":-1.3501273780602292,"6971":0.9260507326954717,"6972":0.678697576072099,"6973":0.37894241384801436,"6974":1.6967088514152537,"6975":-0.7665880107381474,"6976":-1.5839379583062587,"6977":1.597565236882325,"6978":0.18825746031788052,"6979":0.6040223839900034,"6980":-0.8657605858932517,"6981":0.3671223933716187,"6982":-1.5981475089649755,"6983":-0.08839397674117559,"6984":-0.930138551116701,"6985":0.17904737730787967,"6986":-0.26608227155781095,"6987":0.6863438621911906,"6988":0.48779889800734194,"6989":1.616428404950085,"6990":1.2658914364086453,"6991":0.4487666913942176,"6992":0.018347444463270687,"6993":-0.9822017608425868,"6994":0.8658928879129473,"6995":-1.8044151496350112,"6996":-0.983232723184955,"6997":0.5188116776709839,"6998":-0.35532587934865567,"6999":-0.1179303716048074,"7000":-1.746742023966614,"7001":-0.9346342926591676,"7002":-0.11011911822281902,"7003":-0.8667677752057812,"7004":-1.4632108266369683,"7005":0.4714717905352223,"7006":0.0985215761051194,"7007":2.6893656386739355,"7008":-1.2838855542088494,"7009":0.6576719050029081,"7010":4.995358189386398,"7011":4.109160085937765,"7012":4.151395125709763,"7013":1.534336306278687,"7014":-0.43441935488608213,"7015":-0.8231032148768122,"7016":-1.5085497324412798,"7017":1.730723808709208,"7018":-2.8742216962617686,"7019":-4.298066568426342,"7020":-1.248905483121641,"7021":-0.9752055561730538,"7022":-0.4304381879768286,"7023":-0.5653727016453749,"7024":1.0641990940978199,"7025":0.9297084312964523,"7026":0.07297984549981233,"7027":0.5055703151115382,"7028":-0.7306111103340901,"7029":0.6488439798997419,"7030":-0.5640801982099257,"7031":0.4511610499247445,"7032":0.9127777475681673,"7033":0.08861043163232711,"7034":1.103704935089382,"7035":0.4266690706364215,"7036":-0.011596361671675527,"7037":0.23931810941788903,"7038":0.011797131359653566,"7039":0.8567255960560883,"7040":0.9152749858660806,"7041":-0.5173586579534363,"7042":0.1585603918530604,"7043":2.1354890808979103,"7044":0.11773929302849533,"7045":1.081875911854539,"7046":0.5865135361937659,"7047":2.5640503453577144,"7048":0.2496154285757937,"7049":-0.9973623382514866,"7050":0.25771717560021573,"7051":0.1282137887861736,"7052":-0.03945962921042663,"7053":-1.1117284573728796,"7054":-1.0740751847929653,"7055":0.8959072439692375,"7056":0.43906698725590104,"7057":0.6512788750987716,"7058":2.082146047300253,"7059":0.7743497225222749,"7060":0.8198433668625176,"7061":-0.06318577625247233,"7062":-0.6793749424458646,"7063":-0.16660804727529782,"7064":0.1423694438765621,"7065":-1.0085488011752697,"7066":1.0136909079415282,"7067":0.12362126663975881,"7068":0.5729818265398073,"7069":1.3428503349710816,"7070":-0.11992502497255304,"7071":0.6176858768875656,"7072":1.2541840508770337,"7073":0.4080070255372024,"7074":1.5082028557982563,"7075":0.4710240768717105,"7076":-0.6832982064424653,"7077":0.20896879968692675,"7078":-0.719140635002214,"7079":-0.7362807112346558,"7080":0.7104562864666629,"7081":1.721798727350252,"7082":1.2171929179739216,"7083":-0.10644471472114245,"7084":-2.1167399821387947,"7085":-2.912959553332038,"7086":-0.6506332383440441,"7087":-0.7931664789583563,"7088":-0.6953166070270457,"7089":1.181816416124918,"7090":0.8767613527900661,"7091":-0.5841218219808811,"7092":3.7130734716952136,"7093":2.838191017176878,"7094":4.6599120670355205,"7095":4.186451986518194,"7096":2.3728499775362293,"7097":-0.3298614192473796,"7098":0.6187660611114016,"7099":-0.5296489355728391,"7100":0.8364329578789244,"7101":-1.2082574867628362,"7102":-2.3747647954665867,"7103":-1.136801830558519,"7104":-0.16924405206485507,"7105":0.3438948291602838,"7106":0.2811704139875431,"7107":-0.23349975948152799,"7108":0.23150485475833707,"7109":-1.0539537483285655,"7110":0.453554010679785,"7111":0.4417813497562975,"7112":-0.20025034342549883,"7113":-0.9011320221617595,"7114":1.0537179336438467,"7115":0.5890087441137607,"7116":0.5538153859981578,"7117":-0.03888677905826027,"7118":0.4608755236254184,"7119":-1.1079149358383766,"7120":0.016492351143523043,"7121":0.3685052711248327,"7122":-0.5288619141973583,"7123":-0.5308026638224712,"7124":0.5656431893009867,"7125":1.7120247125737467,"7126":-0.8714778409777176,"7127":-0.5775092202422875,"7128":0.3714072130649867,"7129":0.9179268506522418,"7130":0.36833531294236527,"7131":0.15149539910402096,"7132":-0.7202203495264714,"7133":1.0607210804248537,"7134":0.5997228693912349,"7135":-0.3513705473324965,"7136":0.7599253030847638,"7137":0.11330935063187723,"7138":-0.9563206192838234,"7139":0.5196876849912437,"7140":-0.44247940857953705,"7141":-1.142841058435869,"7142":-1.4573525736343438,"7143":-0.7667465090552803,"7144":-1.1420774069704709,"7145":0.16075526738921259,"7146":-0.23256756599234632,"7147":-0.8953921887659964,"7148":-0.628283450711264,"7149":0.24252574518986697,"7150":-0.575654770165164,"7151":0.18730889357264938,"7152":-0.9999399025087665,"7153":-0.47011499300057347,"7154":2.0507690749622856,"7155":-0.48326022396674473,"7156":-0.7449490608089474,"7157":-1.0429058970612644,"7158":-0.4046019830770876,"7159":-0.6437334645526354,"7160":-0.783284441042882,"7161":-0.5416366999743276,"7162":-1.918122223062958,"7163":-0.20428200434972668,"7164":0.18127889548798598,"7165":-0.9421377267838512,"7166":1.2042951135518756,"7167":-0.45337736604009504,"7168":0.6494419567883212,"7169":-0.00994532105813065,"7170":-0.3714980558865673,"7171":-0.5675896189544362,"7172":0.5653349713698804,"7173":-0.7037821788264905,"7174":-0.8566762143283038,"7175":-0.37048160912365236,"7176":1.5043591740402888,"7177":0.08958252008221267,"7178":-0.4636652263405946,"7179":-0.6794920989415341,"7180":0.10210665043996844,"7181":1.0384771116937705,"7182":-0.32541863790372255,"7183":-0.6313327095740388,"7184":2.0826342151778774,"7185":-1.607995734383376,"7186":-1.0545108077667043,"7187":-1.1361092244376907,"7188":-0.7840185276937742,"7189":1.7487901690310996,"7190":-0.6630214297845928,"7191":-0.8883800561839783,"7192":0.8005212987280944,"7193":-0.27981591329917854,"7194":-1.0696968550089079,"7195":-0.017053991502494703,"7196":-0.08864827867707163,"7197":-1.7654081571788123,"7198":1.5238200600095564,"7199":-0.6974075089676244,"7200":-1.132173827423479,"7201":-0.9920031569577183,"7202":0.3846983126190212,"7203":-0.4800165675351231,"7204":-0.5317755014900745,"7205":-0.8462166309388827,"7206":-0.4392926508104361,"7207":-0.2928561789086888,"7208":-0.5819352482495079,"7209":-1.4811101385095027,"7210":0.129830655503297,"7211":-1.1125045967781717,"7212":-1.018882505095323,"7213":-0.5589804383081752,"7214":-0.8495391016076927,"7215":-0.9259912958277581,"7216":0.865605477704203,"7217":0.6083541006038141,"7218":0.013553874395237349,"7219":-0.4837549492377416,"7220":-0.1968676018730712,"7221":-0.37470769942924065,"7222":-0.654333527826544,"7223":-0.9364408432350377,"7224":-1.0486578796943686,"7225":-1.8477361779635861,"7226":0.09992331469686823,"7227":0.011131339915590123,"7228":-0.2010942387717302,"7229":-0.7981839194954946,"7230":0.012700551690896185,"7231":-1.0454174027199912,"7232":-0.8715591241386909,"7233":-1.7423588454035042,"7234":-0.2351373351269668,"7235":-0.19832421771577521,"7236":-0.3073727332651778,"7237":-0.9896977158444324,"7238":0.11828656281443259,"7239":0.1303232079658313,"7240":-1.208262112129406,"7241":-0.3255107327685537,"7242":-0.3973681349636186,"7243":0.7493987861309604,"7244":-0.03801070014390848,"7245":-0.3001236530555081,"7246":-1.2634324427039623,"7247":1.1327063982135395,"7248":1.1144178452283109,"7249":-1.085359449221276,"7250":-1.9361276120777864,"7251":-1.029514755368129,"7252":1.3034029332593928,"7253":0.30039317829448375,"7254":-1.532249525690272,"7255":-1.255949619960046,"7256":-1.1754830135315362,"7257":0.38461744425844424,"7258":-2.1483788937638844,"7259":-1.635174273537345,"7260":-0.2516682968828873,"7261":-0.47289779545752136,"7262":0.8371124235837478,"7263":0.9228747938912408,"7264":-0.08185010013610022,"7265":-0.4870641509008283,"7266":-1.1511066555346936,"7267":-1.3318900537432292,"7268":-2.391638184550701,"7269":-0.10057296220824159,"7270":-0.07653621789682763,"7271":0.5124000957973412,"7272":-0.6444998536579457,"7273":-0.027004253694737176,"7274":-1.3647484379088775,"7275":-0.568628092532748,"7276":0.022584211633215553,"7277":-2.60453155359139,"7278":-0.9649231344359247,"7279":0.3428472385996248,"7280":-0.01999810985630816,"7281":0.02139030274484948,"7282":-0.2287254164489801,"7283":0.216555395766795,"7284":-0.14257508760931867,"7285":-0.6101430727566756,"7286":-2.136149774679096,"7287":-1.3389259940600478,"7288":-0.09533725169614296,"7289":-1.7574855984371225,"7290":-0.30548831625464273,"7291":-0.8382793805629913,"7292":-0.33958916672695727,"7293":-1.627157028634962,"7294":-1.1104984119190622,"7295":-0.3532940499885151,"7296":-1.763826636410501,"7297":-0.3676280605797205,"7298":-1.5580513257411295,"7299":0.8464534864050918,"7300":-0.9200575951455281,"7301":-0.7245021644019155,"7302":-0.9627385230158293,"7303":-0.45426048245000344,"7304":0.17809157578544968,"7305":-0.22594567043821356,"7306":-1.4839400851299898,"7307":-0.8938987208645236,"7308":-0.5021411956833737,"7309":-0.29971270257080307,"7310":-0.18530888776984014,"7311":-0.597973068387066,"7312":-0.6694903399293217,"7313":0.6054856341871957,"7314":-0.07021823806165625,"7315":0.986534177828713,"7316":1.6316771534461127,"7317":0.9272117602746344,"7318":0.15439401071745576,"7319":-0.5488234191357472,"7320":-1.982770012325611,"7321":-0.9086444001393751,"7322":-0.7201972395182817,"7323":-0.8261748828800414,"7324":-1.5234197432962027,"7325":0.40613640261988726,"7326":-0.7861868656558632,"7327":-1.9003017279189451,"7328":-2.8047015575485985,"7329":-3.1087051207765044,"7330":-3.108506397244229,"7331":-3.639412048502706,"7332":-1.2862787816117844,"7333":-0.6340882224913827,"7334":0.7270880339912348,"7335":0.705616273709511,"7336":0.17081519009037124,"7337":2.5347877016248384,"7338":1.4853066622204096,"7339":4.047285881914185,"7340":1.3844482926414836,"7341":0.18241190692823406,"7342":-0.7316811760531211,"7343":0.4149615504878349,"7344":-0.1137181971732498,"7345":-1.0638654822236746,"7346":-0.5260272893886073,"7347":0.015454334401071756,"7348":0.9943051296169125,"7349":1.7015947311733226,"7350":2.280519167914524,"7351":0.43242133815254974,"7352":-0.12346540902096428,"7353":-0.0832903635572784,"7354":0.9334264301133794,"7355":-0.20271776180517834,"7356":0.7221430097903055,"7357":-1.142602981024043,"7358":-0.6100810221554621,"7359":-0.7824181128413937,"7360":-0.21475355050660758,"7361":-0.8541208500779546,"7362":-0.6455393845690673,"7363":-0.5322371406752893,"7364":0.5405517518983646,"7365":-0.20896767945060357,"7366":-0.4643369447535125,"7367":0.1415692570577445,"7368":-1.4629005455287107,"7369":-0.7221710625481241,"7370":0.04564927978723171,"7371":0.9145299481528844,"7372":-3.428531604287608,"7373":-0.6726117196138998,"7374":0.20358231532889107,"7375":0.25196354616482525,"7376":0.1006339802091429,"7377":-1.1663242784440346,"7378":-0.1729080581927293,"7379":0.30611868456714136,"7380":1.2874627603326694,"7381":-0.27586290155216064,"7382":0.04252395062994509,"7383":0.17731891888849932,"7384":-0.9023835360295568,"7385":0.3612795352562946,"7386":0.39044204370543006,"7387":0.415186474181417,"7388":0.17878761648315838,"7389":-0.14095394893808263,"7390":-1.1341492994711564,"7391":0.6014518600943848,"7392":-1.2446426291447343,"7393":-0.16565997918459682,"7394":-0.16377569410607995,"7395":1.0608241657966002,"7396":-0.12592026461802638,"7397":1.8333608915369595,"7398":0.8214642363458227,"7399":0.8442172505696925,"7400":-0.44927313653313666,"7401":-1.1074248206456867,"7402":-1.0104897693396653,"7403":0.4111122233013213,"7404":0.3349070016760905,"7405":0.6943476233382094,"7406":0.4479112782671961,"7407":-0.18266363376352063,"7408":0.8035460767507036,"7409":-0.09301927418993339,"7410":0.8424465197905954,"7411":2.0717819194606077,"7412":-0.5751091576097386,"7413":-0.02416609443223775,"7414":-1.272980733968675,"7415":1.104810174130888,"7416":-0.8947058709018213,"7417":0.23259714488827565,"7418":-0.47094062788976443,"7419":-0.8989890706404042,"7420":-9.292751476197022,"7421":-5.426043490680498,"7422":-2.9916411031014163,"7423":-1.447024939803041,"7424":-0.8289602946138976,"7425":-0.04449503785060134,"7426":0.1168910210032576,"7427":-0.06540771281935007,"7428":3.330904684769714,"7429":1.4471496018840393,"7430":-1.5064089792927775,"7431":-2.4069840135289042,"7432":-0.48814607496845847,"7433":-0.12201484998764198,"7434":0.5006924276062099,"7435":-0.3152976549412374,"7436":0.35439128726302943,"7437":-0.9388483382586501,"7438":1.2586411190939661,"7439":-1.3493463492834006,"7440":0.6921855708117237,"7441":0.506260779549758,"7442":0.5442433459930193,"7443":0.4654417697200517,"7444":2.1118500851799924,"7445":-0.4204383580670198,"7446":-0.08334129745324928,"7447":-1.0788203164761996,"7448":-1.465901996232796,"7449":0.18556453627444297,"7450":1.7101353498835377,"7451":-0.3111083310576397,"7452":-1.1651941897683706,"7453":-0.5222089228226361,"7454":0.6421194766190547,"7455":-0.06251063275597536,"7456":-0.06781667597105594,"7457":-0.12861440058325463,"7458":0.6270138584162406,"7459":-0.12751108355334134,"7460":0.12086833544926529,"7461":0.2805822311186118,"7462":-0.018615347639719455,"7463":0.11996912497797436,"7464":0.8998928339204239,"7465":-0.6158348089551704,"7466":0.46420219043339156,"7467":0.15128431391115085,"7468":0.2742040922193842,"7469":-1.3948605058663475,"7470":-0.7415069544138688,"7471":-0.32399448739661496,"7472":0.13664041785843722,"7473":1.4533063610731487,"7474":-0.7122336116070374,"7475":-0.16361660469940564,"7476":-0.41802261766692494,"7477":-0.32861419473599546,"7478":-0.24678527389187985,"7479":0.5489037783765971,"7480":-0.09146941462334118,"7481":0.703378219202264,"7482":0.06868553543245522,"7483":-0.12550511255287666,"7484":0.329505947673032,"7485":-0.6317835838297913,"7486":0.006028557733012146,"7487":-0.761476422226702,"7488":-0.30768067715478975,"7489":-0.9902925719351031,"7490":-0.02406823058876291,"7491":-0.14321007407985348,"7492":0.0631610798376837,"7493":5.114838650457474,"7494":-0.4563614469738882,"7495":0.7426136659961179,"7496":-0.6742726436609883,"7497":0.3458991351343156,"7498":-0.3104461017308522,"7499":-0.5206580745544414,"7500":1.7241017943124968,"7501":1.025808259530546,"7502":-0.41797748102538584,"7503":5.284927251793748,"7504":-0.020927419523380997,"7505":0.6023655057108548,"7506":-0.06098273313990658,"7507":-0.20764222539887323,"7508":0.4019699626088163,"7509":0.15377317674470395,"7510":-0.7700984408099635,"7511":3.217960709342416,"7512":0.42756822243641923,"7513":-0.3840060987636775,"7514":0.011270955045230222,"7515":-1.3562098015233737,"7516":-0.2689393939348864,"7517":-1.1061566888539025,"7518":-0.9894317588343033,"7519":-1.050773178922511,"7520":0.870228422776594,"7521":-0.7361704222225267,"7522":-0.09225929403107734,"7523":-0.24067281251414466,"7524":-1.0841739691831493,"7525":-0.9431869848131217,"7526":-0.9523786016966509,"7527":0.5576445248600365,"7528":-0.9655017195661124,"7529":0.36426119969427473,"7530":-0.02254328303077411,"7531":0.14025388444247483,"7532":-0.5278567538899755,"7533":-0.6418372280985287,"7534":0.08674065284418776,"7535":-0.6084463228699116,"7536":0.05254275540367856,"7537":-0.2352954356387381,"7538":-0.4977469675529278,"7539":-0.8854993718990276,"7540":0.5370091648120437,"7541":0.17071273015862345,"7542":-0.7842940719261368,"7543":-1.3117762740062449,"7544":-0.03890230994026601,"7545":1.2654634998199787,"7546":-0.2952029491088803,"7547":1.0671022975500812,"7548":0.6496181409770515,"7549":0.22755915105677058,"7550":0.4911048141003759,"7551":-0.0017268659511599004,"7552":-0.30013285831923525,"7553":1.2418702371198744,"7554":0.3330913646437705,"7555":-0.7287792897707986,"7556":1.3281296284376203,"7557":0.7137774737877267,"7558":0.2377979639113305,"7559":0.6256787085347143,"7560":0.35064501127884,"7561":0.3889883199261961,"7562":0.2915996234455738,"7563":-0.16071957331422118,"7564":-0.47292670304930773,"7565":0.7801946243609013,"7566":-0.14301985587390378,"7567":0.4408654041657737,"7568":-0.11183806345152605,"7569":0.16607298707917825,"7570":0.11303088979149517,"7571":-0.5432197022817518,"7572":-0.06258437685843156,"7573":-1.6338797742612179,"7574":0.5733753201528786,"7575":1.0791677942704958,"7576":0.05738448858125823,"7577":0.3669280590853233,"7578":-0.24111397213581784,"7579":1.0475151740687365,"7580":0.40164736859483635,"7581":-0.37053049624178375,"7582":-1.4104680049849152,"7583":1.0251741300286905,"7584":-0.2152235435055586,"7585":0.6343926224218307,"7586":0.43811136426640834,"7587":0.33353210460116045,"7588":-0.2407317378427918,"7589":0.2284571236411055,"7590":0.5848702070110929,"7591":-13.238399489268806,"7592":0.10163606191576449,"7593":0.6495308599147637,"7594":0.23452700577600594,"7595":0.4885773036770885,"7596":0.013974893362851204,"7597":-0.27268061046593417,"7598":-0.31789507633130876,"7599":1.3492179219156815,"7600":0.6238789710811864,"7601":1.0902410395936764,"7602":0.357492830816768,"7603":-0.3145294574099465,"7604":0.4686448088056512,"7605":0.4180636536864799,"7606":0.9236119524954075,"7607":-0.9842665821956287,"7608":-0.5238914315514284,"7609":0.4606848344847292,"7610":-0.05337373642716096,"7611":1.1556000736092555,"7612":0.9768982832938583,"7613":-0.05679821461357243,"7614":-0.10868238362598719,"7615":-0.15901195219709066,"7616":0.23851084446046572,"7617":-1.2458063545663853,"7618":-0.3874020112742476,"7619":0.4498566699030344,"7620":0.4251035685139018,"7621":0.2884979252992508,"7622":-0.24157186947110423,"7623":-0.20944428776851673,"7624":-0.5117938384604895,"7625":-0.13891418101985384,"7626":0.0029097591484489897,"7627":-1.1987267603326248,"7628":1.512154792511776,"7629":0.5116175959976386,"7630":0.8533521879667408,"7631":0.7304923698266965,"7632":0.49976154996675687,"7633":-1.4762894935441644,"7634":1.422203052088929,"7635":0.006169498632243621,"7636":-0.8578390428416668,"7637":1.2801403528527806,"7638":-0.2622655344199839,"7639":-2.159220377848886,"7640":-0.08077462398718403,"7641":-0.4488962904536087,"7642":0.17118841016508748,"7643":0.29047248186299035,"7644":-1.2887772386565997,"7645":0.30829908843709697,"7646":-0.6793957910243872,"7647":-0.2590672592743136,"7648":0.05353447290512356,"7649":-1.3376643105282138,"7650":0.8758702012171063,"7651":-0.22079839973322596,"7652":-0.40087879524964126,"7653":-1.418026987954823,"7654":-0.25995767406297576,"7655":0.08922930167268746,"7656":1.1580494572081177,"7657":3.7799203598360496,"7658":2.3374282492020853,"7659":2.918332373830004,"7660":0.3862794841143528,"7661":2.598675871708213,"7662":-0.26771088452395025,"7663":-0.3194707617773859,"7664":-1.002782239872555,"7665":0.8160230513459915,"7666":-1.0579911493927903,"7667":2.4495889076011905,"7668":1.7918147211021433,"7669":-0.05096118025382763,"7670":1.3221861211933659,"7671":0.30563520636402786,"7672":-0.19908757901794663,"7673":1.497778983551369,"7674":-1.9600627006916245,"7675":-2.3174947665204986,"7676":-2.9119047261911786,"7677":1.3450222733758057,"7678":-1.6943970215761175,"7679":0.5337826013585537,"7680":0.23588429737095293,"7681":0.4521359598478194,"7682":0.5595575513037716,"7683":0.7769320156045834,"7684":1.1437317196703358,"7685":1.922037529957774,"7686":1.0934663823506159,"7687":-0.15590565540848297,"7688":-0.9748291538354419,"7689":2.518275822289478,"7690":-0.6417187617107085,"7691":-0.35758867863470967,"7692":0.09113523950844864,"7693":0.6675000506688734,"7694":0.48360022614934306,"7695":0.9450398599280894,"7696":-1.6594951120492767,"7697":-0.8599679890713285,"7698":-0.6274293257077046,"7699":0.8512426513968526,"7700":-0.9252713555804771,"7701":1.263797123655462,"7702":-0.024861914892686892,"7703":1.6125806429349672,"7704":2.2966332959728573,"7705":-0.42473452565252745,"7706":0.26025974796552503,"7707":-0.0848456154807356,"7708":0.3373348296105929,"7709":-0.2678259958649148,"7710":0.3716104848637764,"7711":0.12459620602557815,"7712":0.2398169420442514,"7713":0.16650428816234988,"7714":0.5253249253166844,"7715":-0.23464148830773868,"7716":0.5263232310293826,"7717":0.08556418241555507,"7718":0.29789750404220544,"7719":0.8412367685704508,"7720":0.8549077873977144,"7721":-0.2853897656570799,"7722":0.3956921667213668,"7723":0.07606594079979988,"7724":-0.026098682918941372,"7725":-1.2601265205275767,"7726":0.6837711206222569,"7727":0.6955207832683505,"7728":1.2836557036410665,"7729":-0.23219245508829922,"7730":-0.3271699037849922,"7731":-0.004178743551355749,"7732":0.6652181763592262,"7733":-0.08320902081553065,"7734":-0.2490947426679394,"7735":1.0080802553308912,"7736":0.17071224068123325,"7737":1.231301122384956,"7738":0.06757422226666708,"7739":-0.6228198504841039,"7740":0.16538137458122937,"7741":-0.6101322899972382,"7742":0.034387651294327394,"7743":-0.3750685723956933,"7744":-0.4643106150377764,"7745":0.47693054753125136,"7746":-0.6701071159860476,"7747":-3.141346140323292,"7748":0.9786604694024281,"7749":-0.37957838167750263,"7750":0.7617279749433895,"7751":0.20234167525303998,"7752":0.5679429038882462,"7753":-0.3079013584263223,"7754":-0.26996885209177796,"7755":-2.939606512806908,"7756":-8.888177565253425,"7757":0.13019021659919847,"7758":2.0281094058108105,"7759":0.6316440183631834,"7760":0.9233914906664299,"7761":-0.529258765566139,"7762":-0.29997861603472964,"7763":-0.16212085218736688,"7764":-3.040496404350008,"7765":-2.1056619774828094,"7766":-1.0988263139669767,"7767":0.5963036540480815,"7768":-0.602707932058223,"7769":-0.04873440403740299,"7770":0.7166547393880356,"7771":0.3852470439403782,"7772":0.1897699098517152,"7773":0.11429793733584896,"7774":-0.40235051869772664,"7775":-0.7522785684479566,"7776":0.20505422536063977,"7777":0.2193082837440597,"7778":0.5215539969954947,"7779":0.2536605462642859,"7780":-0.4995087006771806,"7781":0.6548831391491614,"7782":-0.6057386122548775,"7783":0.25876007051647754,"7784":-0.9412739187286349,"7785":0.35263821300838505,"7786":0.5407033969753147,"7787":0.028180014413273065,"7788":-0.3898234062786525,"7789":0.40394905186326086,"7790":0.5080870273477547,"7791":0.7956381663741354,"7792":-0.6175322419340228,"7793":1.2303463444746177,"7794":0.7009964894618503,"7795":-1.2352906968573012,"7796":0.050398889449414,"7797":0.9579265510779947,"7798":0.17038837918600985,"7799":-0.39978380347486964,"7800":-0.7437680835981789,"7801":0.7806689452293635,"7802":0.010862737137394263,"7803":-1.4699735466665527,"7804":0.0946571300343608,"7805":0.008843541395976236,"7806":0.518527043634216,"7807":0.4450113649328264,"7808":-0.6280608093941513,"7809":-0.23289289896437468,"7810":-0.1972962105953746,"7811":0.20343225636910497,"7812":0.41249324926974135,"7813":-0.6482873243663251,"7814":1.8364450611047023,"7815":-0.7460838333296987,"7816":-0.3871602437119085,"7817":-0.014034309708097183,"7818":0.24828378385438934,"7819":0.34607748691282214,"7820":0.5889300228687506,"7821":0.22767376133501008,"7822":0.6488369864917554,"7823":-0.6215767287396086,"7824":-1.081326864090292,"7825":-1.2722629124175677,"7826":-0.8799279607401916,"7827":1.1773324796647577,"7828":-0.4099080913134822,"7829":-1.0817793048248188,"7830":-7.256099230924055,"7831":-8.906851027189447,"7832":-4.464033837442073,"7833":-2.335442407990752,"7834":-0.6678180936419462,"7835":-1.3803009501837893,"7836":-0.9209807980911497,"7837":-0.6800474775952181,"7838":0.13966858056722226,"7839":4.740530602337579,"7840":1.6232967874777822,"7841":0.429613357451935,"7842":-0.9798895168227756,"7843":-1.4111094066194096,"7844":0.3642157559508845,"7845":0.657430365366435,"7846":0.8294250801430234,"7847":-0.5127626941341736,"7848":0.12350663866143174,"7849":0.3437184919656156,"7850":-0.37885434489697034,"7851":1.1271115507774976,"7852":0.3254144507023205,"7853":0.8094159199472345,"7854":-0.6338919846816418,"7855":-0.08275576603300712,"7856":-0.18705215426887167,"7857":-1.2565259273990834,"7858":1.1025965079716222,"7859":-0.2702935730727592,"7860":-0.41556773915799045,"7861":1.035001132590194,"7862":0.57510180473112,"7863":0.04958246661423675,"7864":-0.7564244994971391,"7865":0.21868570416692223,"7866":0.2881161958685266,"7867":-0.2693885060885326,"7868":-0.39239450630744643,"7869":1.0090063766449788,"7870":-0.7852564928366028,"7871":0.07532189376871462,"7872":-1.1555983668750562,"7873":-0.13989555013429134,"7874":1.5811551539089916,"7875":0.333331400954942,"7876":1.081635441731057,"7877":0.5607433382797067,"7878":-0.6613940222388913,"7879":0.7727073133919645,"7880":-0.4277662986158436,"7881":-1.1253100479501574,"7882":-0.7181052558159825,"7883":-0.16423334988500338,"7884":0.7569882876606547,"7885":-0.017386905826280583,"7886":-0.5366325646983797,"7887":-0.1845350301946895,"7888":-1.4492553562890356,"7889":0.6552256454211042,"7890":0.19256616733072698,"7891":-1.0059735447921978,"7892":-0.5805907348743579,"7893":-0.4143856443496777,"7894":0.32905596090719186,"7895":-0.14554607758367022,"7896":0.2611359109969293,"7897":-0.4827211719020556,"7898":0.10003485599144642,"7899":1.4859948701574373,"7900":-0.4892690342146016,"7901":-0.8437380970655859,"7902":2.037649191813536,"7903":1.2388190049805723,"7904":-0.35600411206417987,"7905":1.241227443768894,"7906":-0.12592229102552133,"7907":-0.3622840206039365,"7908":0.6837365683935187,"7909":-0.05838575776992737,"7910":0.4965442593484119,"7911":0.9206861342800823,"7912":8.598965002657415,"7913":-0.065334784496072,"7914":-0.19705729941707337,"7915":-1.0231453965498156,"7916":-3.0805107777835965,"7917":0.6921123421492087,"7918":-0.774912049885835,"7919":1.941671987082733,"7920":1.5054187267786467,"7921":1.9321111617724303,"7922":0.15826915102193848,"7923":-0.7716860045191971,"7924":0.4341096151251042,"7925":0.12647211325370925,"7926":-0.9119352244864294,"7927":0.8612315617437054,"7928":-1.4310516101643993,"7929":1.303186073985634,"7930":0.9323222039835134,"7931":1.6905448216058188,"7932":-0.26250820716550755,"7933":0.9695991320452302,"7934":-1.5706696465379213,"7935":-0.7393345953101244,"7936":-1.5288169185973797,"7937":-0.27846630353855967,"7938":-0.5567659049018433,"7939":-0.4811863120853408,"7940":0.2407045417967714,"7941":-0.6394344790644397,"7942":0.7096935881100382,"7943":0.26066192437740676,"7944":0.04084181073748635,"7945":-0.5108249401190907,"7946":-0.9217797746817075,"7947":-0.9564485198157416,"7948":-0.22722845522957966,"7949":-0.9064715854516763,"7950":-0.44069405179276633,"7951":0.4800842105115791,"7952":-0.11065517647500839,"7953":-0.6381755174450127,"7954":-1.0206631917220679,"7955":-0.5475777683882036,"7956":-0.14169770753384203,"7957":0.570014539273844,"7958":-0.6606537918103027,"7959":-1.8334211249480274,"7960":-0.18912491036279414,"7961":-0.1455039499773379,"7962":1.515500780648764,"7963":0.20799109246901804,"7964":-0.21152500267533703,"7965":0.5895075354338015,"7966":0.6493482164683828,"7967":-0.5011600105928324,"7968":0.12068766977790422,"7969":0.11069867839837388,"7970":-0.23497859916894906,"7971":1.0927013105697476,"7972":0.1736915263788278,"7973":0.39543746635967564,"7974":0.658693556472227,"7975":0.6165951115844186,"7976":-0.4609351318809046,"7977":0.8036725972106167,"7978":0.706806665181836,"7979":1.0807068203616397,"7980":-0.8672754819295582,"7981":0.025246674202444423,"7982":0.0015267232381698664,"7983":2.0659511486701825,"7984":0.5640922485213171,"7985":0.17386565608750515,"7986":0.14682726500030704,"7987":0.5842344520380521,"7988":-0.6819649433897221,"7989":1.4506197440141906,"7990":2.1916865676143815,"7991":-6.621117930364186,"7992":-3.4572765100079894,"7993":3.2026747871420462,"7994":-1.7606832656098792,"7995":0.7895344883955758,"7996":-1.4401945350982877,"7997":-0.9073180609265874,"7998":1.0654972165722154,"7999":-0.6853553662807842,"8000":0.07422871931275722,"8001":0.2650852587119092,"8002":-0.18160250504826242,"8003":2.4573334182485187,"8004":0.6529930408041478,"8005":0.34481128925399446,"8006":-1.582984815665946,"8007":0.23673616085012916,"8008":1.7139406007024407,"8009":-1.0141515055733317,"8010":-0.18957918736515103,"8011":0.3185124021554393,"8012":1.2402708573218824,"8013":-0.8451522324675858,"8014":-1.35172148303203,"8015":-0.7798220838022213,"8016":-0.4823515222224946,"8017":0.23685666132932082,"8018":1.7614557209867199,"8019":1.8738100179630939,"8020":-0.5918201903170658,"8021":-0.06354391878607837,"8022":0.05169460169153821,"8023":-0.36051966261520574,"8024":0.7398243831657182,"8025":0.45723729579914146,"8026":0.45790244352962045,"8027":0.588263300775843,"8028":0.5774727242625034,"8029":0.2752173681045428,"8030":-0.5817666431961924,"8031":0.5117219471643887,"8032":0.09218857465116059,"8033":-0.6395451671442904,"8034":-0.09102701463729565,"8035":-0.7730503238975079,"8036":0.11731020712523248,"8037":-0.18723337218050903,"8038":1.1321646156919687,"8039":-1.0865257710213991,"8040":0.9707966462292394,"8041":-1.789093289232236,"8042":-0.37068858988609893,"8043":1.5025710056910355,"8044":-0.13447550605525455,"8045":0.5740813367446004,"8046":0.2502286238603939,"8047":-0.6346852670697023,"8048":0.2511116722882577,"8049":0.18958323645886457,"8050":0.2109229044516015,"8051":0.896231086600275,"8052":-0.3574346917032572,"8053":-0.16049911975735234,"8054":1.6588297996990604,"8055":-0.9926132725019713,"8056":0.007857653852473811,"8057":-1.0246035537152143,"8058":0.1644330653693589,"8059":-1.9946328108026663,"8060":0.747872352727402,"8061":-0.1620458867140556,"8062":-0.5821157512356715,"8063":0.7969465258921272,"8064":-1.770729034827006,"8065":0.05787315636773233,"8066":0.27803055997417886,"8067":-0.35424293974197635,"8068":-0.23118438726008037,"8069":1.3143328124853815,"8070":-0.49241552606553424,"8071":0.830200560532544,"8072":0.5790410570783786,"8073":0.17240657945340732,"8074":-1.195265121127409,"8075":-3.8873186056990723,"8076":-1.1056414115117075,"8077":-0.5755082612020783,"8078":-0.511438611251718,"8079":-1.0645386964077859,"8080":-0.22038803906622367,"8081":-0.06499680486070404,"8082":2.5386795631385177,"8083":4.264232209456073,"8084":5.52526081850825,"8085":6.103153728883453,"8086":1.01434629808137,"8087":1.0336176772435457,"8088":1.3535674055614837,"8089":0.3521075484198206,"8090":0.8593543023657574,"8091":2.124398190343104,"8092":0.34246605007744163,"8093":3.1103619660035213,"8094":1.9345366110264246,"8095":2.0233626144552224,"8096":-0.29832432105096934,"8097":0.8645645999512992,"8098":0.02969519850860332,"8099":-1.1043870942932783,"8100":-0.8900872628603801,"8101":-0.37087270100366904,"8102":0.06248471167495663,"8103":-0.9473073411362612,"8104":-0.6929876443742367,"8105":-0.12888263516144013,"8106":-1.076393037619707,"8107":0.05586710792037426,"8108":0.33298566279759273,"8109":0.6262926584204371,"8110":0.23521845048674322,"8111":1.5812794062273243,"8112":-0.21927529687022057,"8113":0.934525186442207,"8114":-1.0735229310127912,"8115":-0.420146236903609,"8116":-0.8110558023380522,"8117":-0.3873736077513941,"8118":0.4479273066690273,"8119":1.2653487799487775,"8120":-0.06750637924890002,"8121":-0.784100501999732,"8122":-0.042366216008592805,"8123":0.3526648101209864,"8124":1.7303195969853529,"8125":0.4297575567391004,"8126":1.0670553270312608,"8127":-0.032745617510264134,"8128":-1.0568876250323074,"8129":2.3515801470902553,"8130":-0.2911926321623582,"8131":-2.034629352506796,"8132":0.19363946273096908,"8133":-0.7051024520173148,"8134":-0.7083551607317672,"8135":-0.9437779981843675,"8136":1.2947541789507622,"8137":0.9659997025764823,"8138":0.4291099017853485,"8139":-0.34753219445577327,"8140":0.5634785245248914,"8141":1.8273672335367286,"8142":0.04943394249854683,"8143":1.263575133477221,"8144":0.6787204886405344,"8145":1.2873368525740896,"8146":-0.30911470523079776,"8147":-0.5087758522176273,"8148":-2.5936389415397927,"8149":-0.9849574694862547,"8150":-0.6762559534008831,"8151":0.9977567878697331,"8152":0.5533670902599667,"8153":0.8550177534702675,"8154":-0.7761531490657383,"8155":-0.32966862369864497,"8156":-0.0006451329690504053,"8157":-2.7616967666777237,"8158":-5.425999053876208,"8159":-1.9212418652719991,"8160":0.05499777527059071,"8161":-1.0309379306111663,"8162":1.3639692943143136,"8163":0.4001241725632882,"8164":-0.33999509479379636,"8165":1.5247816570361479,"8166":-0.6554871996237187,"8167":-1.9192940932040876,"8168":-1.297754235318331,"8169":-0.9585059302396975,"8170":1.930877190045993,"8171":0.6592921375875738,"8172":1.9291245323377848,"8173":0.3841543476728853,"8174":-1.5801540819454087,"8175":1.0200983902289753,"8176":-1.5486491745122752,"8177":1.2462086308358713,"8178":2.1440450295319704,"8179":0.4898306232325184,"8180":-0.1279196100089989,"8181":-1.3817575773012771,"8182":-0.15769829310951608,"8183":0.12435781169076485,"8184":-0.7999396063836988,"8185":-0.5324932609235223,"8186":1.1617997488914944,"8187":0.49716346652646204,"8188":-0.7670132910579309,"8189":-0.7118925773663269,"8190":1.2655916145943602,"8191":-2.648443366076577,"8192":-0.7038566105360746,"8193":-0.8106673332599479,"8194":-0.354688867990271,"8195":-0.3837731955429969,"8196":-0.1745967027070411,"8197":0.37657133024345757,"8198":-0.5257834375786189,"8199":0.9180643371722786}},"b1":{"n":100,"d":1,"w":{"0":-0.5077675168735664,"1":0.9866862663362808,"2":1.6495050581405555,"3":6.359659684753499,"4":-1.3153363386366839,"5":3.0904342911102174,"6":-4.986803811942418,"7":-0.5577373507142576,"8":-2.1502275022036104,"9":-11.719215338206386,"10":1.602469814691434,"11":-1.0561859837718612,"12":2.2090806117853137,"13":2.0827500629080435,"14":0.9484493738724848,"15":2.349660520143808,"16":1.081963153163631,"17":0.8502347144411141,"18":0.1179669225120961,"19":6.575120767844088,"20":5.223149591090039,"21":-0.26459780617021045,"22":3.003658165349161,"23":-1.4214809387024214,"24":2.1013014916960917,"25":-2.629403513794756,"26":2.096603873121527,"27":-1.835126669603592,"28":-2.957770389569841,"29":-0.43686467928722406,"30":-4.368706184227551,"31":-2.539849840698661,"32":-6.80571308730622,"33":-2.5968597261854685,"34":1.541422185293064,"35":-14.99473663563428,"36":2.002770762455134,"37":2.673888425834756,"38":-3.5025423108884883,"39":-0.25603977105059045,"40":-2.583113421386237,"41":11.7782160402998,"42":3.291875446290931,"43":0.38917370209170354,"44":3.226284855315429,"45":0.6800662837160001,"46":-2.7050443858195687,"47":-0.1581789624864573,"48":-3.662547952765663,"49":-2.5128413290066485,"50":0.3535213793033318,"51":0.9898109451173303,"52":6.146122998501875,"53":-4.148765226016314,"54":2.3841779743462204,"55":-1.1309557873895284,"56":-2.787596159843695,"57":0.20232913075645872,"58":4.125639611361817,"59":-3.155915770958685,"60":-0.7620582119116617,"61":-1.1862864781129716,"62":-3.2146213433264563,"63":-1.3364208849803578,"64":-2.799941068125531,"65":-0.8371166784166643,"66":-0.7660450547054664,"67":0.3266351120161571,"68":0.03743021702314863,"69":-0.5172911571417675,"70":1.9351106215875133,"71":-4.170026863996074,"72":-3.6155733845446116,"73":-0.06866317948691274,"74":4.222991827052943,"75":3.0534857207776858,"76":-0.6521889330953199,"77":-7.231153065289305,"78":-2.941734782284969,"79":-3.603258579234362,"80":-3.8406857821654548,"81":1.113741129677664,"82":-3.8979274669985284,"83":0.8787142915001529,"84":-0.3978958622071737,"85":-1.420970767418719,"86":-0.30492345091884415,"87":-0.1123772440541993,"88":4.023048483944006,"89":1.5993033232540323,"90":1.8874254942179052,"91":-5.88393530781633,"92":1.5787291577142848,"93":-3.8208680362104706,"94":7.884082709576261,"95":1.030516168211946,"96":-6.868127968876665,"97":-0.21473425431952486,"98":-2.9057174181852568,"99":4.471549609824047}},"W2":{"n":4,"d":100,"w":{"0":-0.722355269041531,"1":-0.2740408068961914,"2":-0.019776355455374123,"3":0.8294423433726521,"4":-0.16899103938608848,"5":-0.5845932101401494,"6":0.41754750269764174,"7":-0.34919695402055356,"8":0.7660620388555329,"9":-0.25290597116501873,"10":0.5293185770780271,"11":0.1806756947526441,"12":5.130854223966978,"13":0.23181061552107485,"14":0.39479095551289767,"15":0.028585801456603048,"16":2.641815837430496,"17":1.8868795022514908,"18":-0.16301888820080976,"19":-0.9999280149379559,"20":0.4443814284049573,"21":-0.0555614162352102,"22":1.0586618961390308,"23":-0.009068745548519117,"24":0.33558167241644266,"25":-0.5628997815331858,"26":0.6182957669100023,"27":0.28744413500860794,"28":-0.5964069620145923,"29":0.2768473364801618,"30":-0.2219898145052422,"31":0.22260207012348768,"32":-0.6851641839331014,"33":-3.4687652407693976,"34":0.33142488288535754,"35":-0.03997980667332344,"36":0.7225201272011247,"37":0.17162037570563776,"38":-0.2714078097936654,"39":-1.4882002499002531,"40":-0.2675635561048231,"41":0.4194100236066935,"42":-0.09945438862420371,"43":0.9449049246491618,"44":0.08332193810714919,"45":-0.3791015312582785,"46":0.35181502797058106,"47":-0.6831078800030572,"48":-0.4671129054659517,"49":-0.3331562574513977,"50":-0.007563364862065271,"51":0.41656365647156596,"52":-0.1982237473431797,"53":-0.2414119859218043,"54":0.24704546689930826,"55":0.316597364258144,"56":-0.6459507430064176,"57":-0.1990303115141451,"58":-0.4086442186398307,"59":-0.44463646545793384,"60":-0.4700288222009451,"61":3.179628043339002,"62":-0.021755528840749293,"63":-1.5929141743868573,"64":1.1037006882226854,"65":-0.6548427654520391,"66":0.01950900823922962,"67":-0.15941262566598255,"68":-0.6150871115548766,"69":-0.5183740941719754,"70":0.39124918856031493,"71":-0.2772903722073384,"72":0.5154240976330965,"73":-2.723869575269543,"74":0.44038334502192095,"75":-0.15913048819412104,"76":-0.13828392253614302,"77":-0.6087304505231617,"78":-0.5458400409477591,"79":-0.4274415837944205,"80":-0.7242937429685922,"81":-1.7393366702666557,"82":-1.4968154840026335,"83":-1.5534173234733242,"84":0.003024288358347533,"85":-0.9645987680239257,"86":-0.7201318936825101,"87":2.046959789323952,"88":0.47618152733717173,"89":0.6537967862539178,"90":-0.39952482388964555,"91":-0.15939142067443193,"92":-1.1964775203080116,"93":0.5711109826059034,"94":-0.13963232860911748,"95":-0.15303762102525958,"96":0.9738921356176172,"97":1.420679152141866,"98":-0.6051399536169786,"99":0.31985351610537993,"100":-0.4256289042696342,"101":0.04018411158449225,"102":-0.283718626610131,"103":0.1820489877824133,"104":0.009219111863036243,"105":-1.095698059009376,"106":-0.07336475313338686,"107":-2.595735180094383,"108":-0.016416753813448738,"109":-2.894570520389999,"110":-0.3875863170606743,"111":0.22502146725814606,"112":-0.3522967700087506,"113":0.9401333626195075,"114":-0.7155318048708917,"115":0.8030444748547619,"116":0.6472023824459687,"117":0.9560081920671546,"118":3.8516502404400197,"119":0.5230591547943431,"120":-0.422741832183201,"121":-0.8309570923928447,"122":0.2870640314269141,"123":0.12927765998849192,"124":0.37692800005078353,"125":-0.289976357235051,"126":0.4291228172501269,"127":0.15407767089299984,"128":-0.45070587961203434,"129":-1.1545290560716293,"130":-0.5051154120202653,"131":-0.3537403572156324,"132":0.03561295052677367,"133":-0.28242924527908797,"134":6.019696107157683,"135":-0.5491531510737853,"136":1.4977052677154423,"137":0.19074259008639147,"138":-0.6576450461311957,"139":-2.314794302482941,"140":0.020098727424185836,"141":-0.1950299990163627,"142":-0.5605670565427012,"143":1.4535550533039046,"144":0.050267968389726,"145":-0.17040121906777433,"146":0.25110649776968497,"147":0.07316864525350358,"148":-0.5261430595242452,"149":0.22680094246148058,"150":0.8961021968850144,"151":0.4862006266622574,"152":0.2692082625366262,"153":0.6634149857842909,"154":0.21266106911457974,"155":-0.15960439259015036,"156":-0.7313853996799174,"157":0.9067282541059195,"158":0.5716365255544277,"159":0.5604357618795573,"160":-0.2855333227000957,"161":-2.795268702763692,"162":0.7859339515628431,"163":-1.47374411671995,"164":0.32389407312186047,"165":-0.22710637786741106,"166":-0.35581375016620126,"167":0.03670007364410313,"168":0.05193954376926853,"169":0.25232226221774146,"170":0.47618696888036743,"171":-0.5579139262751258,"172":-0.3474085496923413,"173":-0.1378778864577106,"174":-0.12300073958846684,"175":0.1448647291769603,"176":-0.13983338623422345,"177":-1.1965593748707444,"178":-0.6527533649864792,"179":-0.16786052676941754,"180":-0.32249792726998466,"181":-1.800653712620365,"182":-1.3303727884614442,"183":-0.5865946763760831,"184":0.039333423074044804,"185":0.4055958412669373,"186":-0.10249748545540949,"187":1.583978211368642,"188":-0.3595545031412819,"189":0.6047551437556048,"190":0.3467619325254878,"191":-0.06502010683653332,"192":-0.9754501342118446,"193":-0.44375125405100246,"194":0.04276544944319796,"195":0.4699486291819145,"196":0.03318917645766423,"197":0.39763485973399865,"198":0.20977063797384587,"199":0.4394772727251124,"200":-0.3390574935657976,"201":0.22135599801122488,"202":-0.7030723059813394,"203":0.36663812836767995,"204":0.2666478598403994,"205":-0.7209645886339895,"206":1.394171432109526,"207":-2.7455903817376592,"208":-2.855007902464515,"209":-0.15312536807803379,"210":0.6401071341588349,"211":0.9589504316035393,"212":0.21232079270416415,"213":-0.2449369940705051,"214":-0.05506119457750781,"215":0.24565681185334484,"216":3.4784810489580997,"217":2.3394225303797005,"218":2.114124276974223,"219":-1.5776194443654044,"220":0.5053997430547947,"221":0.14853643088028556,"222":-0.07796350516520242,"223":-0.3306302313996021,"224":0.36040865454298493,"225":-0.4690453484101646,"226":0.25164668767128373,"227":-0.4433853092794154,"228":0.3237251233636868,"229":-0.21379789720722692,"230":-0.2833508181473322,"231":-0.4234391186209015,"232":-0.4116870425489215,"233":-8.429307003138009,"234":-0.02856934377300625,"235":-2.03246096529326,"236":-0.2700491320780441,"237":0.19127432682182532,"238":-0.19339125131497037,"239":-1.921167143679768,"240":-0.5346235830054221,"241":0.9252342652005106,"242":-1.0153330112202181,"243":-1.0533465326018596,"244":0.4512156427483861,"245":-0.4994649983545637,"246":0.7144845091123626,"247":-0.37668254768058795,"248":-0.27126971443644116,"249":0.9790218252455888,"250":-0.1456732632188977,"251":0.25283765486015475,"252":0.3302706625931103,"253":1.117388684811662,"254":0.4982603955751284,"255":-0.07338678414253273,"256":-0.31831483134245653,"257":0.328520169865157,"258":0.28515219941173325,"259":-0.49166084553913053,"260":-0.40412917709532603,"261":-3.5228953429377987,"262":0.47805957645974784,"263":-1.5939293036674058,"264":1.165112112311243,"265":-0.27725528912483505,"266":-0.509171498567618,"267":-0.3883522956704385,"268":0.2903159623197425,"269":0.8656022458664054,"270":0.28667199063450255,"271":-0.2562543673522732,"272":-0.18078754220915208,"273":0.29586831122215407,"274":0.3691677212763973,"275":0.2191851861178404,"276":-0.32300394260411275,"277":-0.5975398690686223,"278":0.22011749564822683,"279":-0.3475688440587465,"280":-0.28108700491766186,"281":2.4430166519158334,"282":-1.03267071053309,"283":-1.7867008063437133,"284":0.3522680808098912,"285":-0.444828457282352,"286":-0.7162779321806614,"287":-0.6064659207949618,"288":-0.7671854223731263,"289":0.4240007967274988,"290":0.44602774712592486,"291":-0.8046809162961612,"292":-0.6628573697328111,"293":-0.3356022038177078,"294":-0.20827444632450337,"295":0.6580579131730155,"296":-0.6547236082982734,"297":0.1980267240894984,"298":-0.14113530347942874,"299":0.3299023536702094,"300":-0.3618561375705187,"301":0.2000365989321764,"302":-0.27993662454649887,"303":0.49286722604437583,"304":2.1048997681705965,"305":0.22967751226564542,"306":0.27231651816691504,"307":-1.3372118498693892,"308":-1.668358105069549,"309":-0.26491888455192825,"310":0.17104222670984556,"311":0.3767194455291671,"312":-0.5267963506691914,"313":0.2858681561821482,"314":0.5297653715987963,"315":0.4171985349391511,"316":4.409734003395628,"317":1.495051972013606,"318":0.4220649450829178,"319":-0.21198360895647825,"320":0.5399887623201173,"321":-0.8433778191747984,"322":1.4368760890233092,"323":-0.32253245115985535,"324":0.7012415798945033,"325":-0.20993989131452828,"326":-0.32881784240686834,"327":-0.06057469279318795,"328":-0.20112644243397884,"329":-0.4857131088146963,"330":-1.002524966287998,"331":-0.5612796047515964,"332":0.04441288955774886,"333":-0.7069351644305956,"334":-0.28604769094221555,"335":-1.15835819094673,"336":-0.37700486416051493,"337":0.49798668085346176,"338":-0.6212709999258603,"339":-1.1324132175065653,"340":-0.016099231606621262,"341":0.05204591528749966,"342":-0.8335823128804428,"343":-1.0638316496299105,"344":0.7017080790870899,"345":-0.21894781083517928,"346":0.039552369227041126,"347":0.15389939535514383,"348":-0.7516491722225267,"349":0.0517601225271999,"350":-0.028907444985614653,"351":-0.9145037297089876,"352":0.1760242059307779,"353":0.3155784071084305,"354":0.035216854556480943,"355":0.4873947911017146,"356":-0.6651675966541777,"357":-0.16158470044239362,"358":0.5436537077710455,"359":-0.21191403433492265,"360":-0.10501405887769544,"361":-0.6213202634453105,"362":-1.3660856000556278,"363":-0.5580491981727861,"364":-0.4925646199895041,"365":0.9815547778280976,"366":-0.5997546828570947,"367":-0.5927215313714945,"368":0.8272970788780726,"369":0.1349037643787759,"370":-0.008624632939064018,"371":-0.16623898636202525,"372":0.06397728251462974,"373":-0.284570671782307,"374":0.2966628269704221,"375":0.29964295689745796,"376":-0.0886145535832282,"377":-0.592883915267881,"378":-0.33313738030069756,"379":-0.4106804412241121,"380":0.10389268729024304,"381":-3.0882476536291246,"382":-4.4629959285637,"383":-0.8579445296597875,"384":0.06913283317088441,"385":0.037517993533244434,"386":-0.3968144025533764,"387":-0.9671231895960545,"388":-0.9810911606154551,"389":-0.007869008552142134,"390":-0.15097015144329276,"391":-0.16557020073916232,"392":4.010710223343826,"393":-0.32756233078091135,"394":2.2197890199068655,"395":0.16701688993310235,"396":-0.001771255548336135,"397":0.3918566607736482,"398":-1.316636793699866,"399":-0.7989204723488106}},"b2":{"n":4,"d":1,"w":{"0":-0.7456070965559362,"1":-1.5931369287783774,"2":-1.2146208515810348,"3":-0.6197646507336819}}}}
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
    'RL_DQN_PreTrained - ranked 188': __WEBPACK_IMPORTED_MODULE_9__agent_RL_DQN_PreTrained__["a" /* default */],
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