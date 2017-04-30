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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AgentObservation__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__generateInitialState__ = __webpack_require__(39);



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

    verticalDeltaScore: 10,//was 10
    minTileValue: -20,
    tileValueMap: [-1, -20],
    pointsForCompletion: 0
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

        if (this._state.isComplete) {
            this._state.score += config.pointsForCompletion;
        }
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

        let tileTypes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tensorTools__["a" /* shiftAndTrimMatrix */])(this._state.tileTypes, shiftVector, 1, trimVector);


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
/* harmony export (immutable) */ __webpack_exports__["a"] = shiftAndTrimMatrix;
/* harmony export (immutable) */ __webpack_exports__["b"] = matrixToVector;
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__deep_q_network_runTests__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderer_HtmlTableRenderer__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agent_hand_programmed_LookAheadWide__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agent_hand_programmed_LookAheadDeep__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agent_hand_programmed_AlwaysMoveStraightDown__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agent_hand_programmed_LookAheadOneMove__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agent_machine_learning_RL_DQN_Untrained__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__agent_machine_learning_OneStepDeepQNetwork_PreTrained__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__index_html__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__GameRunner__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__SpeedIntervalSelectElement__ = __webpack_require__(11);












const settings = {
    renderingEnabled: true,
    speed: 250,
    // renderingEnabled: true,
    // speed: 250,
    ticksPerIntervalWhenNotRendering: 100,//100 is good for speed, 10 is good for precise "actions per second" readout
    autoPlay: true,
};
/* harmony export (immutable) */ __webpack_exports__["settings"] = settings;


document.body.innerHTML = __WEBPACK_IMPORTED_MODULE_8__index_html__["a" /* default */];
const scoreElement = document.getElementById('score');

let intervalReference = null;
let agent;
let currentAgentName;
let renderer = new __WEBPACK_IMPORTED_MODULE_1__renderer_HtmlTableRenderer__["a" /* default */](document.getElementById('rendererContainer'));

let gameRunner = new __WEBPACK_IMPORTED_MODULE_9__GameRunner__["a" /* default */](renderer, handleGameRunnerStatusChange);

let agents = {
    'MachineLearning - RL_DQN_Untrained': __WEBPACK_IMPORTED_MODULE_6__agent_machine_learning_RL_DQN_Untrained__["a" /* default */],
    'MachineLearning - OneStepDeepQNetwork_PreTrained - ranked 192': __WEBPACK_IMPORTED_MODULE_7__agent_machine_learning_OneStepDeepQNetwork_PreTrained__["a" /* default */],
    'HandProgrammed - LookAheadDeep - ranked 234': __WEBPACK_IMPORTED_MODULE_3__agent_hand_programmed_LookAheadDeep__["a" /* default */],
    'HandProgrammed - LookAheadWide - ranked 228': __WEBPACK_IMPORTED_MODULE_2__agent_hand_programmed_LookAheadWide__["a" /* default */],
    'HandProgrammed - LookAheadOneMove - ranked 192': __WEBPACK_IMPORTED_MODULE_5__agent_hand_programmed_LookAheadOneMove__["a" /* default */],
    'HandProgrammed - AlwaysMoveStraightDown - ranked 80': __WEBPACK_IMPORTED_MODULE_4__agent_hand_programmed_AlwaysMoveStraightDown__["a" /* default */],
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
        '\nActions per second: ' + stats.actionsPerSecond +
        '\nAvg Final Score: ' + (Math.floor(stats.lastFinalScores.reduce((acc, val) => acc + val, 0) / stats.lastFinalScores.length) || 0) +
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

let speedIntervalSelectElement = new __WEBPACK_IMPORTED_MODULE_10__SpeedIntervalSelectElement__["a" /* default */](setupInterval, newGame, renderer);

function setupInterval() {
    clearInterval(intervalReference);
    if (settings.autoPlay) {
        var ticksPerInterval = settings.ticksPerIntervalWhenNotRendering;
        if (settings.renderingEnabled) {
            ticksPerInterval = 1
        }
        //Normal ticking takes 3ms between ticks which is not fast enough, so tick 100 times
        intervalReference = setInterval(function () {
            for (let i = 0; i < ticksPerInterval; i++) {
                gameRunner.tick();
            }
        }, settings.speed);
    }
}

document.body.addEventListener('keydown', function (event) {
    gameRunner.takeAction(event.key);
});

function newGame() {
    gameRunner.newGame(agents[currentAgentName], settings.renderingEnabled);
}

newGame();
setupInterval();


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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23).Buffer))

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
	fixUrls = __webpack_require__(28);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__deep_q_network_NeuralNetwork__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__deep_q_network_QNetworkAgentOneStep__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(3);


 //@TODO use DI instead for this


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

let actionElements = null;
let randomActionElement = null;
let rewardElements = null;

let currentNeuralNetwork; //@TODO WARNING IS HUGE HACK

function ensureElementsExist() {
    if (document.getElementById('DQNRender')) {
        return;
    }
    document.getElementById('agentRendererContainer').innerHTML =
        `<div id="DQNRender">
    <br />Predicted expected reward from each action:
    <div style="overflow: auto"><div style="float: left">w:&nbsp;</div> <div id="action0" style="background-color: lightgoldenrodyellow;"></div></div>
    <div style="overflow: auto"><div style="float: left">a:&nbsp;</div> <div id="action1" style="background-color: lightsalmon"></div></div>
    <div style="overflow: auto"><div style="float: left">s:&nbsp;</div> <div id="action2" style="background-color: lightskyblue"></div></div>
    <div style="overflow: auto"><div style="float: left">d:&nbsp;</div> <div id="action3" style="background-color: lightseagreen"></div></div>
        <div style="overflow: auto"><div style="float: left">random action&nbsp;</div> <div id="actionRandom" style="background-color: lightcoral;height: 1em"></div></div>
        <br>
        Reward:
        <div style="overflow: auto"><div style="float: left">good&nbsp;</div> <div id="good" style="background-color: greenyellow"></div></div>
    <div style="overflow: auto"><div style="float: left">bad&nbsp;</div> <div id="bad" style="background-color: orangered"></div></div>
<br /><button id="dump-agent-internal-data">Dump Agent Internal Data</button>
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

    document.getElementById('dump-agent-internal-data').addEventListener('click', () => {
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
        document.getElementById('q-learning-data').innerHTML = JSON.stringify(currentNeuralNetwork.toJSON());
    });
}

function renderActionResponse(actionResponse) {
    ensureElementsExist();

    if (actionResponse.wasRandom) {
        // randomElement.innerHTML = 100;
        randomActionElement.style.width = (100 * 3 + 50) + 'px';
        for (i = 0; i < actionElements.length; i++) {
            var element = actionElements[i];
            element.innerHTML = 0;
            element.style.width = '50px';
        }
    } else {
        // randomElement.innerHTML = 0;
        randomActionElement.style.width = '10px';
        const minAction = getMinimumVectorIndex(actionResponse.weights);
        // const maxA = maxi(actionResponse.weights);
        const maxAction = actionResponse.action;
        for (var i = 0, len = actionResponse.weights.length; i < len; i++) {
            let adder = 0;
            if (actionResponse.weights[minAction] < 0) {
                adder = -actionResponse.weights[minAction];
            }
            let fixedValue = Math.floor((actionResponse.weights[i] + adder) / (actionResponse.weights[maxAction] + adder) * 100);

            actionElements[i].style.width = (fixedValue * 3 + 50) + 'px';
            actionElements[i].innerHTML = Math.round(actionResponse.weights[i]), 2;
        }
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
        var numberOfActions = 4;
        // create the DQN agent
        this._neuralNetwork = new __WEBPACK_IMPORTED_MODULE_0__deep_q_network_NeuralNetwork__["a" /* default */](numberOfStates, numberOfActions, [100]);
        if (typeof previousSavedData !== 'undefined') {
            this._neuralNetwork.fromJSON(previousSavedData);
        }
        this._agent = new __WEBPACK_IMPORTED_MODULE_1__deep_q_network_QNetworkAgentOneStep__["a" /* default */](
            numberOfStates,
            numberOfActions,
            this._neuralNetwork,
            {},
        );

        this._learningEnabled = learningEnabled;
    }

    getAction(state, reward) {
        currentNeuralNetwork = this._neuralNetwork;

        if (!this._learningEnabled) {
            reward = null;//Passing null rewards to the agent disables learning inside it
        }

        let action = this._agent.learnAndAct(reward, state);
        let actionResponse = this._agent.getLastActionStats();

        if (__WEBPACK_IMPORTED_MODULE_2__index__["settings"].renderingEnabled) {
            renderActionResponse(actionResponse);
            if (reward !== null) {
                renderReward(reward)
            }
        }

        return action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RlDqn;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Matrix holds a matrix
class Matrix {
    constructor(n, d) {
        // n is number of rows d is number of columns
        this.n = n;
        this.d = d;
        this.w = new Float64Array(n * d);
        this.dw = new Float64Array(n * d);
    }

    setFrom(arr) {
        for (var i = 0, n = arr.length; i < n; i++) {
            this.w[i] = arr[i];
        }
    }

    toJSON() {
        return {
            n: this.n,
            d: this.d,
            w: this.w
        };
    }

    fromJSON(json) {
        this.n = json.n;
        this.d = json.d;
        this.w = new Float64Array(this.n * this.d);
        this.dw = new Float64Array(this.n * this.d);
        for (var i = 0, n = this.n * this.d; i < n; i++) {
            this.w[i] = json.w[i]; // copy over weights
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Matrix;
;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getIndexOfMaxValue;
function getIndexOfMaxValue(array) {
    var maxValue = array[0];
    var maxIndex = 0;
    for (var i = 1, length = array.length; i < length; i++) {
        var v = array[i];
        if (v > maxValue) {
            maxIndex = i;
            maxValue = v;
        }
    }
    return maxIndex;
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = gaussRandom;
/* unused harmony export getRandomInt */
/* harmony export (immutable) */ __webpack_exports__["a"] = getRandomIntWithZeroMin;
/**
 * Returns a random float who's distribution is gaussian.
 *
 * This uses the "Box-Muller transform". More info at:
 * http://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
 *
 * @returns {number}
 */
function gaussRandom() {
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomIntWithZeroMin(max) {
    return Math.floor(Math.random() * max);
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(0);


const defaultStats = {
    currentScore: 0,
    lastGameScore: 0,
    scoreSum: 0,
    gameCount: 0,
    actionCount: 0,
    actionsPerSecond: 0,
    lastSecondsActionCount: 0,
    lastFinalScores: []
};

class GameRunner {
    constructor(renderer, onStatusChange) {
        this._renderingEnabled = false;
        this._renderer = renderer;
        this._stats = Object.assign({}, defaultStats);
        this._onStatusChange = onStatusChange;
        this._agentObservation = null;
        this._godObservation = null;
        this._agentClass = null;
        this._nextAction = 0;

        this.newGame = this.newGame.bind(this);
        this.takeAction = this.takeAction.bind(this);
        this.tick = this.tick.bind(this);
        this.clearStats = this.clearStats.bind(this);

        setInterval(() => {//@TODO accomplish this without an interval
            this._stats.actionsPerSecond = this._stats.actionCount - this._stats.lastSecondsActionCount;
            this._stats.lastSecondsActionCount = this._stats.actionCount;
        }, 1000);
    }

    newGame(agentClass, renderingEnabled) {
        this._agentClass = agentClass;
        this._agent = new this._agentClass();
        this._renderingEnabled = renderingEnabled;
        this._environment = new __WEBPACK_IMPORTED_MODULE_0__environment__["b" /* default */]();
        this._stats.currentScore = 0;//@TODO get from environment?
        if (this._renderingEnabled) {
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
            this._stats.lastFinalScores.push(this._agentObservation.score);
            if (this._stats.lastFinalScores.length > 100) {
                this._stats.lastFinalScores.shift();
            }
            this._stats.scoreSum += this._agentObservation.score;
            this._stats.gameCount += 1;
            this.newGame(this._agentClass, this._renderingEnabled);
        }

        if (this._renderingEnabled) {
            this._renderer.render(this._agentObservation, this._godObservation);
            this._stats.currentScore = this._agentObservation.score;
            this._onStatusChange(this._stats);
        }

        this._stats.actionCount++;

        this._nextAction = this._agent.getAction(this._agentObservation);
    }

    tick() {
        this.takeAction(this._nextAction);
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(3);


class SpeedIntervalSelectElement {
    constructor(setupInterval, newGame, renderer) {
        let intervalSelectElement = document.getElementById('interval');

        //Display the default setting in the UI select box
        if (!__WEBPACK_IMPORTED_MODULE_0__index__["settings"].renderingEnabled) {
            intervalSelectElement.value = 'no-render';
        } else {
            intervalSelectElement.value = __WEBPACK_IMPORTED_MODULE_0__index__["settings"].speed;
        }

        intervalSelectElement.addEventListener('change', (event) => {
            const value = event.target.value;
            let newEnableRenderingValue = true;
            __WEBPACK_IMPORTED_MODULE_0__index__["settings"].autoPlay = true;
            if (value === 'no-render') {
                newEnableRenderingValue = false;
                __WEBPACK_IMPORTED_MODULE_0__index__["settings"].speed = 0;
                renderer.clear();
            } else if (value === 'paused') {
                __WEBPACK_IMPORTED_MODULE_0__index__["settings"].autoPlay = false;
            } else {
                __WEBPACK_IMPORTED_MODULE_0__index__["settings"].speed = value;
            }
            if (newEnableRenderingValue != __WEBPACK_IMPORTED_MODULE_0__index__["settings"].renderingEnabled) {
                __WEBPACK_IMPORTED_MODULE_0__index__["settings"].renderingEnabled = newEnableRenderingValue;
                newGame();
            }
            setupInterval();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpeedIntervalSelectElement;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * An agent that just always moves downwards no matter what
 *
 * @constructor
 */
class AlwaysMoveStraightDown {
    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return 's';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlwaysMoveStraightDown;



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

class LookAheadDeep {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = LookAheadDeep;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(2);


const feelerPaths = [
    ['s'],
    ['a', 's'],
    ['d', 's']
];

class LookAheadOneMove {
    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper_feeler__["a" /* getActionViaFeelers */])(observation, feelerPaths, null);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LookAheadOneMove;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environment__ = __webpack_require__(0);



const feelerPaths = [];
var lookToSideCount = Math.floor(__WEBPACK_IMPORTED_MODULE_1__environment__["a" /* config */].viewPortSize[0] / 2);
var leftPrepend = [];
var rightPrepend = [];
var append = ['s', 's'];
feelerPaths.push(append);
for (let sideWaysAmount = 1; sideWaysAmount <= lookToSideCount; sideWaysAmount++) {
    leftPrepend.push('a');
    rightPrepend.push('d');
    feelerPaths.push([...leftPrepend, ...append]);
    feelerPaths.push([...rightPrepend, ...append]);
}
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_deepQNetworkAdaptor__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_neural_network_saves_view_port_9_9_0_2_best__ = __webpack_require__(21);




const actions = ['w', 'a', 's', 'd'];

const numberOfStates = __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize[0] * __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize[1];

let rlDqn = new __WEBPACK_IMPORTED_MODULE_1__helper_deepQNetworkAdaptor__["a" /* default */](true, numberOfStates, __WEBPACK_IMPORTED_MODULE_3__data_neural_network_saves_view_port_9_9_0_2_best__["a" /* data */]);

class OneStepDeepQNetwork_PreTrained {
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
        const state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tensorTools__["b" /* matrixToVector */])(observation.tileTypes);

        //Give the agent memory of the last action it took. This may be cheating.
        // state.push(this._lastActionIndex);

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
/* harmony export (immutable) */ __webpack_exports__["a"] = OneStepDeepQNetwork_PreTrained;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_deepQNetworkAdaptor__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment__ = __webpack_require__(0);



const actions = ['w', 'a', 's', 'd'];

const numberOfStates = __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize[0] * __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize[1];

let rlDqn = new __WEBPACK_IMPORTED_MODULE_1__helper_deepQNetworkAdaptor__["a" /* default */](true, numberOfStates);

class RL_DQN_Untrained {
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
        const state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tensorTools__["b" /* matrixToVector */])(observation.tileTypes);

        //Give the agent memory of the last action it took. This may be cheating.
        // state.push(this._lastActionIndex);

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
/* harmony export (immutable) */ __webpack_exports__["a"] = RL_DQN_Untrained;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__arrayMath_test__ = __webpack_require__(34);



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_css__);



/* harmony default export */ __webpack_exports__["a"] = (`
<div id="info">Agent: <select id="agentSelector"></select>
<br>Speed Interval: <select id="interval">
<option value="no-render">0ms with no rendering</option>
<option value="0">0ms</option>
<option value="100">100ms</option>
<option value="200">200ms</option>
<option value="250">250ms</option>
<option value="500">500ms</option>
<option value="1000">1000ms</option>
<option value="paused">Paused</option>
</select>
<pre id="score"></pre>
</div>
<div id="rendererContainer"></div>
<div id="agentRendererContainer"></div>
<pre>
Game Rules:
- Gain ` + __WEBPACK_IMPORTED_MODULE_0__environment__["a" /* config */].pointsForCompletion + ` points for getting to the bottom row
- Gain ` + __WEBPACK_IMPORTED_MODULE_0__environment__["a" /* config */].verticalDeltaScore + ` points for every row lower you go
- Loose ` + __WEBPACK_IMPORTED_MODULE_0__environment__["a" /* config */].verticalDeltaScore + ` points for every row higher you go
- Loose ` + -__WEBPACK_IMPORTED_MODULE_0__environment__["a" /* config */].tileValueMap[1] + ` points when moving into a red square
- Loose ` + -__WEBPACK_IMPORTED_MODULE_0__environment__["a" /* config */].tileValueMap[0] + ` points when moving into a grey square
</pre>`);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment__ = __webpack_require__(0);




function generateTableHtml(size, tableClassName) {
    var html = '';
    for (var y = 0; y < size[1]; y++) {
        html += '<tr>';
        for (var x = 0; x < size[0]; x++) {
            html += '<td class="tile-' + x + '-' + y + '"></td>';
        }
        html += '</tr>';
    }
    return '<table class="' + tableClassName + '">' + html + '</table>';
}

function getTdElements(size, tableClassName) {
    var tdElements = [];
    for (var x = 0; x < size[0]; x++) {
        tdElements[x] = [];
        for (var y = 0; y < size[1]; y++) {
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
        this._previousPositions = new Array(__WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].size[0]);
        for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].size[0]; i++) {
            this._previousPositions[i] = new Array(__WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].size[1]);
        }
    }

    /**
     * Render the current observation of the environment in HTML
     *
     * @param {AgentObservation} agentObservation
     * @param {State} godObservation
     */
    render(agentObservation, godObservation) {
        //Render the agent view
        var agentViewPortSize = [
            agentObservation.tileTypes.length,
            agentObservation.tileTypes[0].length
        ];

        var xLength = agentViewPortSize[0];
        var yLength = agentViewPortSize[1];
        for (var x = 0; x < xLength; x++) {
            for (var y = 0; y < yLength; y++) {
                var color = {r: 50, g: 50, b: 50};
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
        var xLength = __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].size[0];
        var yLength = __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].size[1];
        for (var x = 0; x < xLength; x++) {
            for (var y = 0; y < yLength; y++) {
                var inPreviousPosition = this._previousPositions[x][y];
                var color = {r: 50, g: 50, b: 50};
                if (x == godObservation.position[0] && y == godObservation.position[1] && godObservation.tileTypes[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 0};
                } else if (x == godObservation.position[0] && y == godObservation.position[1]) {
                    color = {r: 0, g: 255, b: 0};
                } else if (inPreviousPosition && godObservation.tileTypes[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 128}
                } else if (inPreviousPosition) {
                    color = {r: 0, g: 128, b: 0}
                } else if (godObservation.tileTypes[x][y] !== 0) {
                    color = {r: 230, g: 0, b: 0};
                }
                this._godTds[x][y].style
                    .backgroundColor = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
            }
        }

        this._previousPositions[godObservation.position[0]][godObservation.position[1]] = true;
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HtmlTableRenderer;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const data =
    {"matrices":[{"n":100,"d":81,"w":{"0":0.08731274451929472,"1":-0.5564753676363852,"2":-0.29723935745857355,"3":-0.5524346938782777,"4":0.32585781819055065,"5":1.0554336153720467,"6":-0.02549323086418142,"7":-0.400400063846937,"8":0.4851347616860937,"9":0.2175605929458515,"10":-0.6308045971026799,"11":0.3567230808181947,"12":-0.4366439506651049,"13":-0.20214189798265222,"14":0.18934651666167035,"15":-0.1503050448932707,"16":0.2892849995767407,"17":0.6612585508870515,"18":0.6573821184136251,"19":-0.5702649409133799,"20":-0.42691256134016714,"21":-0.0200701258233128,"22":0.08002297874737466,"23":0.03469153115889079,"24":-0.11569971381989896,"25":0.22632438596332918,"26":-0.4153712216776939,"27":0.33977737091505456,"28":-0.3078850328168591,"29":-0.4461925222048232,"30":0.6675872482499055,"31":0.8924423588170788,"32":0.7823907027042204,"33":0.24829772835303413,"34":0.015610203941029173,"35":0.21303200408213563,"36":0.1552708900698825,"37":0.537135215173579,"38":-0.2592335065518226,"39":2.206922480958138,"40":2.67688369880127,"41":0.7703507093871891,"42":0.08445917768620441,"43":-0.3262485880473019,"44":-0.3593952454822657,"45":0.2277156054148827,"46":-0.2942660989150411,"47":-1.1062672835404175,"48":0.6250997095224174,"49":0.5583163068538696,"50":0.7796370399910296,"51":0.2989595785394339,"52":-0.21540200852726463,"53":0.28293553653425396,"54":0.07219277423440347,"55":-0.18832913884628336,"56":0.30366800441889097,"57":-0.36131795796888666,"58":-0.5610600330545726,"59":-0.43249246079025944,"60":-0.6680302015022269,"61":0.5540748897125412,"62":-0.1135194143766987,"63":-0.863279663252683,"64":0.1977393292803394,"65":0.481274408896342,"66":-0.14921503652747725,"67":0.0959679438613023,"68":-0.393797395641387,"69":-0.1827349955623466,"70":-0.007690417782407314,"71":0.1268209020013509,"72":-0.29049219239636176,"73":-0.07102094312527696,"74":-0.24217107748876693,"75":0.30880110882708245,"76":0.06792596936105327,"77":0.10974792632935691,"78":0.4566676356600056,"79":0.17414016246546257,"80":-0.39140486453186896,"81":-0.497122027861199,"82":0.4977300593890259,"83":0.4659116683121823,"84":-0.08712688625017798,"85":-0.17185682173390293,"86":-0.5679930935785977,"87":-0.45337618601448104,"88":0.1366749787812359,"89":-0.6776473339278406,"90":-0.13662785943155198,"91":-0.06428754924157319,"92":-0.1979339214182506,"93":-0.009026431798658896,"94":0.5545814830400033,"95":0.14426010224082647,"96":-0.6005147401742098,"97":-0.03313349086183925,"98":0.04913443243579929,"99":-0.5223148171383046,"100":0.011902452193252883,"101":0.8720212812176311,"102":0.03788363422837831,"103":0.7060057592421368,"104":-0.43070917323851654,"105":-0.5374365658997668,"106":-0.3287002111970571,"107":0.014252951035135304,"108":0.06327178133700614,"109":-0.0907088716729353,"110":0.5012443759376256,"111":1.5679030548761996,"112":1.1003793344223287,"113":-0.04453002314072073,"114":-0.12169927216976496,"115":-0.8634749053410038,"116":0.25762291581583663,"117":-0.08938200409753781,"118":-0.5222416180602447,"119":-0.9321129991738517,"120":3.8276339655209335,"121":2.4039263792555645,"122":-0.18943539606994916,"123":-0.6967877083878027,"124":-1.039741349983691,"125":0.30986067837772485,"126":-0.5648963936037089,"127":-0.18746236345432404,"128":0.3271340740026486,"129":0.7104971883594391,"130":1.236616902939871,"131":-0.24321300119483766,"132":-0.845218435054466,"133":-0.3469416735808157,"134":0.3598940008957597,"135":0.431848508811876,"136":-0.32891127684556143,"137":0.0006849351404876513,"138":-0.24931641039504113,"139":-0.37859774464588375,"140":-0.6422192187950323,"141":-0.44996720567340165,"142":-0.18525013405982807,"143":-0.567258279384284,"144":-0.09899684010464095,"145":0.013068422304114348,"146":-0.3148518511941371,"147":-0.05026660822213267,"148":0.3382257531425932,"149":-0.00733841117597616,"150":-0.49226092000174754,"151":-0.2996599585253924,"152":-0.37490518682544544,"153":0.26658891281669284,"154":0.23081776552954092,"155":-0.09733981200036959,"156":0.18283564673087424,"157":0.32174957798501763,"158":-0.8973101135957393,"159":-0.21209282969482443,"160":0.13827635795386098,"161":-0.430100660886778,"162":-0.6106830032512696,"163":0.10620509044576355,"164":0.3430483065440091,"165":0.4459492651428869,"166":0.3920216923626837,"167":0.10651027863918812,"168":-0.07328417861944304,"169":0.582502236605138,"170":0.3659280405935815,"171":-1.0075871552120157,"172":-0.20248600002727846,"173":0.1771361630665113,"174":0.27173127974035316,"175":-0.06441366441969008,"176":0.14165766552847736,"177":-0.1287605167805806,"178":-0.2568380693316917,"179":0.2952791001963285,"180":-0.04481135115307004,"181":-0.5009603098776555,"182":-0.1690962099744125,"183":-0.4386296966200911,"184":0.38754711204718206,"185":0.011585841413118081,"186":-0.023652568879862217,"187":-0.14917091547211617,"188":-0.09129688421136639,"189":0.2302575469701478,"190":0.6553526799598074,"191":0.4127027193689086,"192":0.15741706320160975,"193":-0.07504683499359904,"194":-0.17239028308472007,"195":-0.15181388817603103,"196":-0.11810455616573472,"197":-0.23555281940603304,"198":0.1092572215745938,"199":0.4741962985740151,"200":0.5963198777179354,"201":-0.3533442743831439,"202":-1.7357729113423737,"203":-1.4960324064785007,"204":-0.7724846273235341,"205":-0.28734412088198386,"206":-0.3158616173362147,"207":0.43962390494716364,"208":0.22366478212398105,"209":0.44068423520663785,"210":2.6809769409452247,"211":2.838607111750673,"212":2.645759004992831,"213":2.280477302071106,"214":1.3035561439262764,"215":0.57301645898656,"216":0.07087347914996385,"217":0.04387444866897132,"218":-0.12526983077775874,"219":-0.1130356612112541,"220":0.21693481637163933,"221":0.42670978279491156,"222":0.3508699896545943,"223":0.2343971569954929,"224":0.17868378842022814,"225":0.6259420872347744,"226":0.29728077062144403,"227":0.07415839380907173,"228":0.17551802337979652,"229":0.12777777312601463,"230":-0.20243823021170898,"231":0.5415506132434382,"232":0.10590110015874674,"233":0.6017195433024248,"234":0.14050680879275396,"235":0.386087997399536,"236":0.5508517367136728,"237":0.3842101982967011,"238":-0.3353764685981276,"239":0.31896374480592166,"240":0.1450357334903156,"241":0.21492938361391553,"242":-0.03463755521971719,"243":-0.02810942886108962,"244":0.6123471553790808,"245":0.40263092337339934,"246":-0.12886547027522824,"247":0.2598342961910312,"248":-0.15124607802275947,"249":-0.05758611812846139,"250":0.29515717818446746,"251":-0.0893975430175644,"252":-0.09832474774883898,"253":-0.06695422108120458,"254":0.05816780811704901,"255":0.21014812178856015,"256":0.15835437113525125,"257":0.23855461377896647,"258":-0.07648827328175345,"259":0.031187883611484724,"260":0.45510096221170226,"261":0.04585954622045059,"262":-0.13689618362644781,"263":0.5271286020041032,"264":0.36992133139057154,"265":-0.011914124675698776,"266":0.30489055773774876,"267":-0.300821216798095,"268":-0.37464566705009844,"269":0.20859703714603897,"270":0.8036204593055702,"271":0.07200964964841586,"272":0.12813572277848256,"273":-0.3500757628792807,"274":-0.3631825035801796,"275":-0.4982587326615316,"276":0.13441577632261628,"277":-0.04262481734515826,"278":-0.03328371865797296,"279":0.6102835622338295,"280":0.4705540741262555,"281":0.3618934238107724,"282":0.9557883204887545,"283":1.2229936870851401,"284":1.2202654999679592,"285":0.7544769064955414,"286":0.46308510631107086,"287":0.5140235166491693,"288":0.1708933133222073,"289":0.3874286967352481,"290":-0.49645618414477566,"291":-0.33308194655374074,"292":-0.8464096663998183,"293":-0.023586215364103446,"294":-0.1318122293791493,"295":0.435712796005812,"296":0.18735036097023772,"297":0.16521040168198836,"298":0.13440779926074944,"299":-0.4304263214638371,"300":-0.12279690076591303,"301":0.5957917243787757,"302":0.3580439703027303,"303":-0.034521940437430586,"304":-0.17347497859818772,"305":-0.07599365198763963,"306":-0.6697397156193388,"307":0.9310331829043119,"308":0.8596834716768531,"309":0.2166358009931624,"310":0.47019046511945567,"311":0.4148888530552203,"312":-0.33523720727632894,"313":-0.002187050716636315,"314":-0.07049239615272786,"315":0.2876080636086403,"316":0.4254285372349112,"317":0.3747034415052307,"318":0.5483442637369476,"319":-0.026212937977256975,"320":0.1392484616646709,"321":-0.00678485781445625,"322":0.017833361847162235,"323":0.12146213052243696,"324":-0.6729345585657318,"325":0.7707130376431653,"326":-0.21476149307238815,"327":-0.1589580028279104,"328":-0.5184252403451249,"329":0.06341453449058826,"330":0.31484964210958866,"331":0.3446341520229903,"332":0.38689752284396395,"333":-0.38163584676091966,"334":-0.7260316263215253,"335":0.5181951155337283,"336":0.10366717911779431,"337":0.29447420519564216,"338":0.18486883548222305,"339":0.5041644174749085,"340":-0.3372788858529222,"341":0.6338639341564424,"342":-0.24302754844440622,"343":0.36952432703447435,"344":0.9127713299173142,"345":0.388145169500316,"346":-0.1838061232537276,"347":0.18213489888075526,"348":-0.11587460931794805,"349":-0.36060076517089673,"350":-0.24009505277579654,"351":0.16115227331159418,"352":0.011215808351396224,"353":-1.4351426248173467,"354":-1.033843835200586,"355":-1.5814238042259916,"356":-0.6116614399256742,"357":-0.29347262441939054,"358":0.5582401670735221,"359":0.16807851297586787,"360":-0.02981272221198335,"361":-0.3942533887347288,"362":0.018223762579591594,"363":-2.3543730216252694,"364":-1.394218844020784,"365":-0.3379112629697445,"366":0.401141693375424,"367":0.1574135921391024,"368":0.12828317005959555,"369":-0.0007467731363783035,"370":-0.6592671108076676,"371":0.22985836373380117,"372":-0.7651974497927545,"373":-0.7807911910227466,"374":-0.039510285877343905,"375":0.870325895306772,"376":0.6253446699892322,"377":0.5197661509716596,"378":0.01862342054268721,"379":-0.17727500206285776,"380":0.8448680948184096,"381":-0.4492076173966645,"382":-0.07496517275810027,"383":0.06545666060331343,"384":0.3012567431824014,"385":0.203140089523687,"386":0.10872107687265048,"387":0.08562207422078989,"388":0.21104571318915366,"389":0.9267693735609911,"390":0.266511498803518,"391":-0.08201350875064334,"392":0.595560678171655,"393":-0.4983380583813203,"394":-0.30337991188330243,"395":-0.2622737176072354,"396":-0.47041509912680685,"397":-0.06407418221465312,"398":-0.2268765346887584,"399":0.026414865962975258,"400":-0.09967849179842031,"401":0.14783831144584508,"402":0.3272002629963016,"403":0.24941313730368178,"404":-0.2543297463342267,"405":-0.21931648335036247,"406":-0.31105575484060444,"407":0.3114437159007225,"408":0.15565236286917092,"409":-0.21947335788313968,"410":-0.34043759317443023,"411":-0.06507194393669717,"412":-0.10103772139816045,"413":0.08551666509041576,"414":-0.15141565169462598,"415":-0.05021899081914511,"416":-0.015448871988851155,"417":0.05623522506589738,"418":0.17686943182362483,"419":-0.2911625309420495,"420":-0.14954543751910604,"421":-0.29010141134283574,"422":-0.35378018047795046,"423":-0.021427065924842444,"424":-0.11130378579514344,"425":0.03132003828513726,"426":-0.0829818708133234,"427":0.002838168880715361,"428":-0.27645090464198463,"429":0.029074516066050105,"430":-0.13487611002578956,"431":-0.14261212138429838,"432":0.0676070869200441,"433":-0.3968854449801107,"434":0.16793383127493167,"435":0.1981153866731269,"436":-0.18896358374558306,"437":0.1602110627034407,"438":-0.06854743314658115,"439":-0.08992298508565211,"440":-0.3227068841503584,"441":0.6966294720817972,"442":0.13194975512283352,"443":-0.002776620146714045,"444":7.028618625940206,"445":-0.7261182372027487,"446":-0.39318938256516434,"447":0.0028013856188596935,"448":-0.16340269705499239,"449":-0.08061940394158292,"450":-0.24712599418060216,"451":0.024666131734904766,"452":-0.10925400467057395,"453":0.12505421589169516,"454":-0.44772071637205874,"455":-0.18949132305323058,"456":-0.10384989825489711,"457":-0.2705441989768675,"458":-0.13152653357776573,"459":0.031972934498004243,"460":0.0126872659320396,"461":-0.1460405638773008,"462":0.09053911064430387,"463":-0.1487697265094392,"464":-0.34329650115940363,"465":-0.24066849088721515,"466":-0.37595239896584415,"467":0.07418262083792009,"468":-0.07549103641973945,"469":0.0465319311956939,"470":0.007175098903370706,"471":0.17971746341849312,"472":0.18090487770805005,"473":-0.27160239398942837,"474":-0.3231201952966356,"475":0.07326963253243528,"476":-0.21386255715790184,"477":-0.4992161274211898,"478":-0.05616166179127283,"479":-0.24225817962767265,"480":0.09373326766469507,"481":-0.022081602196231922,"482":-0.2828337692306236,"483":-0.29304063157893556,"484":-0.24113459697054593,"485":0.3953715151666248,"486":-0.057883239499706134,"487":-0.072364842392977,"488":0.209924624927682,"489":0.11808268470511453,"490":0.18883337386206295,"491":0.06788275473312251,"492":-0.017870283261516334,"493":0.06758445895155826,"494":0.06674248358044832,"495":0.02935771023057009,"496":0.14509344303677715,"497":0.07187917247182399,"498":0.11407882467441077,"499":0.13248387933356714,"500":0.17836496623534404,"501":0.10856556899582237,"502":0.07189839625985724,"503":0.09658554637200656,"504":-0.06161873325990703,"505":0.2057543120281151,"506":-0.016663067583967548,"507":0.1265535817269378,"508":0.19841654103994988,"509":0.17646850554269983,"510":0.03412408824104549,"511":0.15062551768389046,"512":0.015784686088036674,"513":0.09210492203395146,"514":0.044055681006946165,"515":0.03239529452139681,"516":0.01162521103818468,"517":0.09617049022584845,"518":0.13431424556168037,"519":0.0823863311016014,"520":0.024553414392624314,"521":0.043171590264356005,"522":0.13262055626636982,"523":0.11857745219687259,"524":0.07065430725743035,"525":-0.23772907898259546,"526":-0.006176156324648804,"527":0.0682647691766223,"528":0.025681556758054985,"529":0.032196225476553174,"530":0.09790287373887412,"531":0.08913302799779765,"532":0.017539346889266727,"533":0.17304583175554875,"534":0.19234765088617647,"535":0.09611424509468944,"536":0.15763101567588156,"537":0.18466623380196445,"538":0.15209714278118425,"539":0.05089689973516702,"540":0.3690542659397837,"541":0.14108443001247034,"542":0.18743603967272307,"543":0.07757092577337794,"544":0.19223536596262852,"545":0.08917680815837976,"546":0.11803369174836648,"547":0.2013888667840558,"548":0.01607355768272822,"549":0.1317432608111834,"550":0.16982169705138703,"551":0.17472864639634997,"552":0.04941281484842313,"553":0.11477511911901743,"554":0.1312549240016825,"555":0.1573555707800807,"556":0.06670679926725197,"557":0.03821051383215301,"558":0.1589716088300345,"559":0.09113364540864534,"560":0.06848592371524599,"561":0.23619962261177224,"562":0.2428309824656209,"563":0.15727253177711353,"564":0.12116964633060873,"565":0.08574688140274946,"566":0.14125644852035782,"567":-0.005884450609601509,"568":-0.07350372742945888,"569":0.21019771973475684,"570":0.030189057052494566,"571":0.15323110784297742,"572":-0.06817605467822345,"573":-0.028644695930204755,"574":0.06482699798780092,"575":0.03921069652766677,"576":0.04917200817600365,"577":0.09155984794971711,"578":0.045000476066528294,"579":0.0773128482029574,"580":0.10278149980866128,"581":0.13375450493251068,"582":0.10257552129355685,"583":0.05794216793555621,"584":0.07147480200910139,"585":-0.052202792889182725,"586":0.1831161124800021,"587":0.049937085928130315,"588":0.08528172559931671,"589":0.1440045094529899,"590":0.10926803761934442,"591":0.03604126403177599,"592":0.09248484742141971,"593":-0.03639949489389976,"594":0.07029668638417949,"595":0.046045977086183534,"596":0.03161203274413536,"597":-0.021264654105599974,"598":0.012469930403571694,"599":0.0912999164876226,"600":0.029648445541314225,"601":0.0017919166429911154,"602":0.05541654864722046,"603":0.11345800767303557,"604":0.1181904874582634,"605":0.10189841411367771,"606":-0.3185737336116864,"607":-0.051793896259796204,"608":-0.036720464876891484,"609":0.013063016559458728,"610":-0.006525535187214343,"611":0.05600753255485934,"612":0.07329212093563098,"613":0.0035508774471706217,"614":0.053894503642586335,"615":0.03511090056697081,"616":-0.04762368931989212,"617":0.10654764194447998,"618":0.1398137557525196,"619":0.14417949235813587,"620":0.018227936701658943,"621":0.3353991309317024,"622":0.0721691123400455,"623":0.08179153594990902,"624":-0.016073384676937582,"625":0.14442913391042123,"626":0.02327530130362651,"627":0.0585681128963721,"628":0.16318386933637175,"629":-0.0046450955305807114,"630":0.12402197533263946,"631":0.14228619493445593,"632":0.12329649885396485,"633":-0.024618032843665434,"634":0.06602183701438834,"635":0.10991123903258555,"636":0.13200692015464516,"637":0.019405412657286923,"638":0.028958251293095184,"639":0.16257745136401675,"640":0.08451954739022641,"641":0.09614389968710398,"642":0.17286804438524167,"643":0.17303544184029074,"644":0.08850059978742605,"645":0.07123964762637723,"646":0.0596565014945519,"647":0.11564135316854741,"648":0.49487857343844077,"649":0.06710561936110009,"650":0.44278147800045203,"651":-0.059277078937554246,"652":0.4506262513756078,"653":-0.8032176989727713,"654":0.08277789248444883,"655":-0.19866264982297888,"656":-0.22929481345756708,"657":-0.12146350172487119,"658":-0.12803027762576846,"659":-0.34559515574879973,"660":-0.14394793203745887,"661":-0.46276608100910616,"662":0.28567953070586893,"663":0.08529773799431511,"664":-0.14635071451440862,"665":-0.2641520164972782,"666":0.005169395934528922,"667":-0.06639156958877675,"668":0.2116234197033206,"669":-0.3587369571989057,"670":-0.4585304113237578,"671":0.45691195853972705,"672":0.07708122488081866,"673":0.05942420114824333,"674":0.05605104037520867,"675":0.03389037316683678,"676":0.16436753838350693,"677":2.3361098741208357,"678":0.33607756036442155,"679":0.18378490471872502,"680":-0.5464756705273437,"681":0.26156700259431465,"682":-0.2614793988024454,"683":-0.42137112654728376,"684":-0.031384279408426044,"685":0.31805830641682337,"686":-0.24279787909510142,"687":-1.1895819093053794,"688":-0.27902648320053886,"689":-0.4373311795930367,"690":-0.4923011335944391,"691":-0.3553101578298274,"692":-0.5764341364373128,"693":-0.2482922406022639,"694":-0.3240480673134167,"695":0.3195025667417358,"696":0.05348118676262039,"697":0.13810989690750625,"698":0.09514131254099278,"699":0.6162480648333627,"700":-0.26498052957979107,"701":-0.35102038648555667,"702":-0.11281982863349424,"703":-0.3335725328006823,"704":-0.5625386961400255,"705":-0.77705810728477,"706":0.32605316150109437,"707":-0.5794591335085666,"708":-0.021346666106432204,"709":-0.12067934987490846,"710":-0.19157591283546105,"711":0.7286194989184697,"712":-0.3636618537493716,"713":-0.12142825887898537,"714":-0.029148977184401056,"715":0.03669011286277311,"716":-0.08012091415354254,"717":-0.04113728200266279,"718":-0.020062481932103315,"719":-0.39244209980590117,"720":0.07757471884694897,"721":-0.05462110697824389,"722":-0.23797537325278506,"723":-0.25799590867609185,"724":-0.20635119157947396,"725":0.3071055800644647,"726":-0.11469055381435633,"727":0.278502140160444,"728":0.1482024206178699,"729":0.18497494123031474,"730":0.8152340710174886,"731":-0.04803306505607882,"732":-0.6580787626162894,"733":-0.5560277922078029,"734":-1.0820864566556672,"735":-0.28158632433711644,"736":-0.18778204390058656,"737":-0.30896181212087837,"738":-0.010629471417516792,"739":-0.8706404543178514,"740":0.7769362390309762,"741":-0.39564035760350375,"742":-0.3702110869603717,"743":-1.0851087951841725,"744":-0.4511252313394972,"745":-0.46054560059508304,"746":-0.43336312963059714,"747":0.4358096203901632,"748":0.5413204803446138,"749":-0.3986163261926535,"750":-0.37287892664745437,"751":-0.5431835018724281,"752":-0.698891233128174,"753":-0.35244449361926666,"754":-0.29250303209830164,"755":-0.06096828871357565,"756":0.2567566519979157,"757":0.14370163706118536,"758":1.1362038533728125,"759":-0.19376894856921686,"760":-0.5677040693063854,"761":-0.6134897981315495,"762":-0.5571472863463527,"763":-0.4858247745631655,"764":-0.16779717173800898,"765":-0.28642419129068464,"766":-0.47249101276634947,"767":-0.08607013752806653,"768":0.2340072923398721,"769":-1.0140574165669105,"770":-0.5552391407294962,"771":-0.49165942163896786,"772":-0.10381905579991443,"773":-0.4670435781404057,"774":-0.0009263167910481515,"775":0.6813276066421777,"776":-0.06178187739015854,"777":-1.4979909582789686,"778":-1.191786535209477,"779":-0.7942484662755822,"780":-0.6164257689027702,"781":-0.18825769568054534,"782":-0.31882923806452984,"783":0.5541638883948754,"784":-0.43965317409447185,"785":-0.2875791909454007,"786":-0.7025421263347423,"787":-0.7356608513407016,"788":-0.9217341275224651,"789":-0.4760859776921282,"790":-0.7652329036356224,"791":-0.3921164542534726,"792":0.4476735387315618,"793":0.05990125186958685,"794":0.30273499437749146,"795":-0.18795994665822954,"796":-0.4004578574515949,"797":-0.7866660288266464,"798":-0.48351428638858013,"799":-0.4363880081750061,"800":-0.30593252785531333,"801":-0.5915949076593191,"802":-0.07383973594622897,"803":0.4423912421416776,"804":-0.36528493013453,"805":-1.3422035709171203,"806":-0.7354558923954939,"807":-0.2529917498422834,"808":-0.43782979042804354,"809":-0.3777809555259103,"810":0.12328923469074658,"811":0.36304162746777013,"812":-0.4797502620101376,"813":0.05923690381169216,"814":0.12174154600678319,"815":-0.20061137233332238,"816":-0.15445116758809976,"817":-0.4000671046235412,"818":-0.08223702875645318,"819":0.14574625228031315,"820":0.28667455462081926,"821":-0.40528783626505716,"822":-0.4325501956693484,"823":-0.0011764344887196935,"824":0.10685439082857016,"825":0.018651792885597082,"826":0.03374142972829445,"827":0.29021277964981507,"828":-0.3632715576217381,"829":-0.05385371678118116,"830":0.14810413653709759,"831":-0.0900336217280007,"832":0.3609317376633267,"833":0.24502153622608397,"834":0.0158533293354516,"835":-0.48610723959890667,"836":-0.10408326375334015,"837":0.3661827517878878,"838":-0.6724997812359573,"839":0.6534711897881107,"840":0.62513854543393,"841":-0.021290295292095043,"842":0.12253933910746072,"843":0.18813566644750507,"844":0.1424991940498462,"845":-0.3510664306413703,"846":-0.013315446900471244,"847":-0.17966240357641933,"848":-0.32156421817787445,"849":-0.16961266667962333,"850":0.06384429419369438,"851":0.5030432772168185,"852":0.3092985781192511,"853":-0.24925634577077824,"854":-0.34112039988365944,"855":-0.20888767723267795,"856":0.14017533134965846,"857":3.3732243430258384,"858":0.7261103577743865,"859":-0.13137914337095066,"860":0.08473833126794904,"861":0.49748245510917866,"862":0.5537099155728534,"863":-0.23663252979409,"864":-0.3509560293101919,"865":-0.07795598833941152,"866":0.639518534938635,"867":-0.3902792635137951,"868":0.18554260339220904,"869":0.14335177680498937,"870":-0.0931230707228689,"871":0.46803092937415636,"872":-0.02284420872963587,"873":-0.18009353499915362,"874":-0.7027083760966781,"875":-0.3968765234977267,"876":0.2289634680139186,"877":-0.4503657494541751,"878":-0.07432024298841254,"879":0.5236715571889398,"880":0.4567916942393674,"881":-0.35883827627030573,"882":0.09821119205793936,"883":-0.2568126263247762,"884":0.2312637383643204,"885":0.3802466000730164,"886":-0.32480461061612065,"887":-0.19579331834394503,"888":-0.011077004672708298,"889":0.20200774124604873,"890":-0.18865492915523321,"891":-0.06455887021698284,"892":0.10327998997639766,"893":0.36728922973797,"894":-0.16041469416106963,"895":0.10536265204560062,"896":-0.37988883444366334,"897":-0.22973363693678858,"898":0.5889731453667866,"899":0.4056298143723117,"900":0.16781759112167385,"901":-0.013509916706095255,"902":0.014432775495275907,"903":0.15785778284501603,"904":-0.3639274597225378,"905":-0.5913395587411736,"906":-0.37123655168747444,"907":0.357263639586225,"908":0.10111569806250512,"909":0.40989110528268363,"910":0.29107275476505184,"911":-0.8179262506474917,"912":-0.14046615995638578,"913":0.18869316953935508,"914":-0.6123651896093024,"915":-0.3194238519238756,"916":0.28453998208513204,"917":-0.2710272899347216,"918":0.1268947635554126,"919":-0.08236904639343016,"920":-2.3670251893514282,"921":-2.41037284701462,"922":0.45642432408071126,"923":-0.06869537209259802,"924":0.3196700650221415,"925":-0.40934604644744577,"926":-0.1062917531588332,"927":-0.3437231629370344,"928":0.39067223339076534,"929":0.23616970993325606,"930":-0.44553129652059337,"931":0.4154616949761135,"932":-0.2293736564982982,"933":-0.5509672678467364,"934":0.1170900176017631,"935":0.2338983097813625,"936":-0.07452278708790677,"937":0.15920179642325585,"938":-0.21328167296645198,"939":-0.08759871336159136,"940":0.059455203919704,"941":-0.033232254528919064,"942":0.08716370366601424,"943":0.2819239767181872,"944":0.42687220841265583,"945":0.0693215517492965,"946":0.21491004813600884,"947":-0.4909894109716334,"948":0.10376233994152359,"949":-0.34747397482886877,"950":0.10803693679192432,"951":0.09279838053405877,"952":0.043837480557855024,"953":-0.28979168831534197,"954":0.0753271733073157,"955":0.24842019387650324,"956":0.0717327942945602,"957":0.3324461608140405,"958":0.4787776858563747,"959":0.498763553766449,"960":0.10542859332103399,"961":-0.03980612590530437,"962":-0.26264458805313,"963":0.5843352039934708,"964":0.7067092371378746,"965":0.21437752104154953,"966":0.3084675451819083,"967":-0.006661196370223564,"968":-0.4592743874102071,"969":0.08906312191575991,"970":-0.05681752311386477,"971":-0.2227852404116513,"972":0.04547441331150455,"973":-0.06738932199361138,"974":0.20792346271883802,"975":0.08230199982764916,"976":0.16220447651706393,"977":0.06927335149193771,"978":0.025936787377270124,"979":0.06595557190390779,"980":0.018949811233871756,"981":0.16097746392059215,"982":0.23566976684132063,"983":0.0335631212751329,"984":0.07988662667250283,"985":0.1606735124316602,"986":0.17041411990085642,"987":0.11564907545345451,"988":0.05077988185305134,"989":0.047565848445636036,"990":0.03806278475318394,"991":0.2066808940204274,"992":0.015881349408360036,"993":0.07942978547154436,"994":0.17168916671041512,"995":0.1410432407566471,"996":0.032001560140431526,"997":0.1469471337723626,"998":0.06463000172133007,"999":0.07317115678302166,"1000":0.08358134184659956,"1001":0.16267282112627862,"1002":0.02960971842254452,"1003":0.05992744278129655,"1004":0.17364309317993185,"1005":0.15025963888972751,"1006":0.02533182283096419,"1007":0.09402356451415517,"1008":0.12869252246396623,"1009":0.08875541376202525,"1010":0.0882831216592677,"1011":-0.20440179660423732,"1012":0.02053505157749594,"1013":0.11259050504174153,"1014":0.025394235878329462,"1015":0.0657576233410661,"1016":0.11296997540353282,"1017":0.14715255377328856,"1018":0.02072244508087396,"1019":0.22220001710011422,"1020":0.18506316938959236,"1021":0.08382334836992283,"1022":0.13015779439559735,"1023":0.16044883339797203,"1024":0.17135410570022339,"1025":0.08823790015924324,"1026":0.44105139071552063,"1027":0.1303851704827968,"1028":0.18237493661294615,"1029":0.029767848889402936,"1030":0.13301219040791504,"1031":0.10462012677418847,"1032":0.11098520487163062,"1033":0.14667850546507266,"1034":0.017541926506881,"1035":0.17325386688205585,"1036":0.2052333030886105,"1037":0.13983931672385805,"1038":0.08601198242169897,"1039":0.10585521658944493,"1040":0.11494684058070612,"1041":0.1558056542196387,"1042":0.062285138997552815,"1043":0.02210439353596397,"1044":0.15790366786969381,"1045":0.1320376784735324,"1046":0.07529886412444373,"1047":0.19336290434389652,"1048":0.23806737552305623,"1049":0.13669712914541104,"1050":0.1140248159951275,"1051":0.010837608771892458,"1052":0.1199831361909058,"1053":0.0859087807209434,"1054":0.25172316993141003,"1055":0.2877376750336949,"1056":0.09433283622261188,"1057":-0.12355686005326101,"1058":0.15214578760983932,"1059":0.12800539110731068,"1060":0.13223239200306783,"1061":0.01626825000538303,"1062":-0.08475161349587908,"1063":0.5258153942504744,"1064":0.29374439988542256,"1065":-0.06097292668275833,"1066":0.00035209953669684813,"1067":0.3720989723918206,"1068":0.33838112737805504,"1069":-0.014020007358867473,"1070":0.017955930136391615,"1071":-0.17569396687053068,"1072":0.2890143192401191,"1073":0.06451042271041268,"1074":0.09338455808725407,"1075":0.34092332615081555,"1076":0.48504030166257667,"1077":0.24870824069096412,"1078":0.24347889066305428,"1079":-0.1785679200678901,"1080":0.29324037820900495,"1081":-0.034348840921690355,"1082":0.39150326866643387,"1083":2.2508161303548198,"1084":2.602809159681832,"1085":1.995771563723215,"1086":1.3428267086238062,"1087":1.2609406973892225,"1088":0.7158936641412721,"1089":0.07356499764773315,"1090":-0.19947086126052385,"1091":0.20262871444077876,"1092":-0.6149684678935308,"1093":-2.2387132415264346,"1094":-0.9333812645293523,"1095":-0.2504203207075914,"1096":-0.08676294534638744,"1097":0.06217957217872857,"1098":-0.0674110488984623,"1099":0.26024440857824055,"1100":0.4089840001306412,"1101":-0.4919248726472668,"1102":-0.4995011951774725,"1103":-0.40691709454811137,"1104":-0.39961720165193576,"1105":-0.2836486630510253,"1106":0.16528142394171783,"1107":0.20542913856038134,"1108":0.3741421030612035,"1109":0.426309132232708,"1110":0.25181386692301566,"1111":0.4735981406232581,"1112":0.32368077280937724,"1113":0.15967941421005832,"1114":0.6462891345691674,"1115":-0.0661674311321086,"1116":0.150893118132049,"1117":-0.1010404438859915,"1118":0.3142264853104483,"1119":0.14992639613879258,"1120":0.05978087129309341,"1121":0.12111729373349148,"1122":0.044422032829724456,"1123":0.29055424319171236,"1124":0.051784819684510465,"1125":-0.19145713308546497,"1126":-0.15563451003320042,"1127":0.0864132146693226,"1128":-0.12861629399134483,"1129":-0.0026317711562296683,"1130":-0.1015137744752106,"1131":0.10153520100345156,"1132":0.25125513305601205,"1133":0.0044038850700311005,"1134":0.26035005026471564,"1135":-0.13801585937123648,"1136":0.536513409403992,"1137":0.028056938296275227,"1138":0.16900601446729788,"1139":0.24518633053536215,"1140":0.12882178322964752,"1141":0.15376016746441737,"1142":0.10885807556656096,"1143":0.052314735520872624,"1144":0.027250927815598947,"1145":0.6895404578357218,"1146":0.3403463934393564,"1147":0.2771905698669071,"1148":0.3002160963925309,"1149":0.20865940677227,"1150":0.11908666086654772,"1151":0.1853866516014759,"1152":-0.1315430023674674,"1153":0.16672353216741118,"1154":0.028657255077318797,"1155":0.13874327159202418,"1156":0.3110953668143782,"1157":0.2859267209319892,"1158":0.23185055329021848,"1159":0.17090336701331818,"1160":0.14012627428605856,"1161":-0.14619861714624058,"1162":-0.31097025316309124,"1163":0.42984195108855205,"1164":0.10902669006963546,"1165":0.17293388299256882,"1166":0.22642108990493512,"1167":0.15607297480111518,"1168":0.14756448338178568,"1169":0.14060261806195082,"1170":0.10082677699238199,"1171":0.12887130153838763,"1172":-0.5387281366748635,"1173":-0.05175912308409933,"1174":0.3244938498858075,"1175":0.2620334596200951,"1176":0.1614408433319741,"1177":0.10619016158182405,"1178":0.10960599875044658,"1179":0.020517771012037528,"1180":-0.23230316080966926,"1181":0.1908200655904059,"1182":0.40028520420723646,"1183":0.2381688873033303,"1184":0.22128522434910083,"1185":0.17416323844363044,"1186":0.2326250298223784,"1187":0.11224636491215519,"1188":0.6508344628915727,"1189":-0.019457300552300865,"1190":0.05656018907847022,"1191":0.2637220742859789,"1192":0.3261171842749273,"1193":0.28004534917058876,"1194":0.2239921992484535,"1195":0.22755483923028164,"1196":0.1212345443334914,"1197":0.09719138025215061,"1198":0.38406816144238737,"1199":0.21825113152497094,"1200":0.1401222052560125,"1201":0.13232735914480362,"1202":0.26334115800431784,"1203":0.2678695171128377,"1204":0.12643391395690173,"1205":0.07666719987811887,"1206":-0.3499763509638718,"1207":-0.257114957119006,"1208":-0.2851340147746659,"1209":0.2954830342142658,"1210":0.3222706690803391,"1211":0.3357966870232996,"1212":0.23571187886457537,"1213":0.1628024484695443,"1214":0.18306030325355363,"1215":0.15178039136768073,"1216":1.0388576125285482,"1217":-0.49732743093259635,"1218":-0.3937037858645977,"1219":-0.10684094683133415,"1220":-0.4978245546770806,"1221":-0.8503942196534736,"1222":0.5754262944267255,"1223":-0.588701859541092,"1224":0.5572529394804493,"1225":-0.26917870882133677,"1226":0.12068055641782723,"1227":-0.3925100323163353,"1228":0.0735566750407218,"1229":-0.5361382240549962,"1230":0.3653494047783874,"1231":0.0764816024098739,"1232":-0.09072175590256305,"1233":0.11219693342780887,"1234":-0.3778426728767776,"1235":0.26075052639023705,"1236":-0.6397381525307797,"1237":-0.05105588016036865,"1238":-0.14593565310006565,"1239":0.3506721325861391,"1240":-0.3845194645334503,"1241":-0.06625578841559293,"1242":-0.01971872431695173,"1243":0.031085557171984753,"1244":-0.21236973711824048,"1245":1.0777941697144169,"1246":-0.038316725645578247,"1247":-0.385473566013702,"1248":-0.055637079870299096,"1249":0.12275632701443825,"1250":-0.1613337878645439,"1251":0.5744145215707123,"1252":-0.2983143402871738,"1253":-0.8800255469537905,"1254":2.8087295779357064,"1255":1.900258635920201,"1256":0.7347810660073604,"1257":0.14462086994938203,"1258":0.08297844588946364,"1259":-0.5049104717822164,"1260":-0.08270593412971936,"1261":-1.376566333356327,"1262":-0.22122193241391008,"1263":-0.4517175872197964,"1264":0.8515170130418511,"1265":-0.571839559920847,"1266":0.007249959110854638,"1267":-0.3662892793834658,"1268":-0.24239052680007656,"1269":-0.28668670625618037,"1270":-0.25237262722225995,"1271":-0.24345112582173462,"1272":-0.28345825695772797,"1273":0.231292991665029,"1274":-0.5034220118318035,"1275":0.08794297919871329,"1276":0.21763159915028932,"1277":0.024540588995997658,"1278":-0.11005150994384476,"1279":-0.595351198490159,"1280":-0.38013323867487697,"1281":-0.7912219157930196,"1282":-0.22134809528687388,"1283":0.04465075990715205,"1284":-0.44076383332726476,"1285":0.17348744208595007,"1286":-0.5325262960295829,"1287":0.18146444263845796,"1288":-0.725242182094155,"1289":0.516546136885653,"1290":0.0650740056350881,"1291":-0.12013064860811336,"1292":-0.12328708684940926,"1293":0.10083010353500796,"1294":0.4988547710735986,"1295":0.4788801010267061,"1296":0.006919188096597843,"1297":-0.0787945487724262,"1298":0.18979230935803654,"1299":0.07285331483619924,"1300":0.1715533782152319,"1301":0.031485896394351794,"1302":0.009057611636809666,"1303":0.06484776568445626,"1304":0.044922520836714844,"1305":0.07328276410202329,"1306":0.19078221045850524,"1307":0.06890725240173584,"1308":0.10879805014245074,"1309":0.16548283636101324,"1310":0.18679282603250605,"1311":0.13563870358588634,"1312":0.05965169495461294,"1313":0.09865207215689539,"1314":-0.0037003170214235334,"1315":0.23846441863632425,"1316":0.056129244150010554,"1317":0.0981479342156008,"1318":0.17513067024196458,"1319":0.1651282257945174,"1320":0.035279766722142364,"1321":0.1477882291710622,"1322":0.05370878739038734,"1323":0.08645976768210907,"1324":0.036190203999281176,"1325":0.12518408964998026,"1326":0.06287744113733913,"1327":0.032319034397590186,"1328":0.13454820742325302,"1329":0.09900630446664939,"1330":0.037647395265429325,"1331":0.09047121371684325,"1332":0.12387468072234502,"1333":0.10323705077528826,"1334":0.09604114598828807,"1335":-0.24494365024799292,"1336":0.010300788705965494,"1337":0.07240549188273405,"1338":0.06384121574892122,"1339":0.03506648816673591,"1340":0.11671804881656467,"1341":0.1266865161325514,"1342":-0.00427466391356607,"1343":0.18911670154091023,"1344":0.19755437058533254,"1345":0.05140044553778864,"1346":0.1472755684353606,"1347":0.15428946273387883,"1348":0.16491842109373755,"1349":0.05642354506307765,"1350":0.41762176476847146,"1351":0.12540546929571844,"1352":0.21701895007758173,"1353":0.03328790158578097,"1354":0.15541073533705954,"1355":0.117646370842118,"1356":0.10232432350195177,"1357":0.1774045080201548,"1358":0.05972272950490458,"1359":0.13630840709059575,"1360":0.1928861161704651,"1361":0.16411875823461847,"1362":0.06838430982826718,"1363":0.09753975681871817,"1364":0.15665502701627118,"1365":0.16345845961787936,"1366":0.03570004041871188,"1367":0.06143077574010164,"1368":0.16475463984451194,"1369":0.1035095997806824,"1370":0.06208202944903368,"1371":0.19474593218696423,"1372":0.23428742444789769,"1373":0.14596280883918789,"1374":0.11286287140573179,"1375":0.052367627421933294,"1376":0.1340539091637519,"1377":0.17184983910693,"1378":-0.46020531970194417,"1379":0.28253705337495594,"1380":-0.12022201646854176,"1381":0.019696069867758948,"1382":-0.1054109795409873,"1383":-0.28330003720362107,"1384":-0.5287280854060165,"1385":-0.38830370979958595,"1386":-0.017185047665793235,"1387":1.0375736005289349,"1388":0.8805047304651157,"1389":0.06172732242042062,"1390":-0.012210764690742676,"1391":-0.3303987076568595,"1392":0.12754337544021474,"1393":0.08833645705447182,"1394":-0.2883273324468158,"1395":0.10388703516995904,"1396":0.2463857129935397,"1397":-0.46077755070958853,"1398":-1.0866239519008218,"1399":0.20917750419649167,"1400":0.2647813826367175,"1401":0.013232455952840182,"1402":-0.1959627718111626,"1403":-0.45667822717055195,"1404":0.34854827644669245,"1405":-0.7018083204535205,"1406":-4.651107789126786,"1407":-2.2281942968155923,"1408":0.02724109955311399,"1409":0.06049491353552064,"1410":-0.02877512696934246,"1411":0.011070883738603885,"1412":0.29765909866206164,"1413":-0.2635841129699828,"1414":0.4016812636731276,"1415":-0.09975611671243188,"1416":0.2556174175225027,"1417":0.45697165137614243,"1418":0.009351472271505712,"1419":0.1880940503578351,"1420":0.01895714665729149,"1421":0.059997872142734485,"1422":0.12486840058746819,"1423":0.20356730709464957,"1424":0.1208974181977505,"1425":-0.13764907163578852,"1426":-0.2657453892807761,"1427":0.19553075987445243,"1428":0.4972014480403827,"1429":0.46303921182632235,"1430":0.04072079999952606,"1431":-0.21174304155034368,"1432":-0.16200111794088798,"1433":-0.2784653774963356,"1434":0.3703479108247146,"1435":-0.04520357443267106,"1436":0.34608536318070127,"1437":0.2730465382175582,"1438":-0.07885267511128252,"1439":0.03477398863096454,"1440":0.13855539475643217,"1441":-0.06403756390001566,"1442":0.3751802651131623,"1443":0.043855425805430885,"1444":0.005487795729124102,"1445":-0.05328329200066484,"1446":-0.5716536003527426,"1447":-0.34270111978332657,"1448":0.3996930567368862,"1449":0.044184826729262966,"1450":-0.09779689318384059,"1451":-0.2541400419706522,"1452":-0.438290539589052,"1453":-0.12177602822501105,"1454":0.20115778574239035,"1455":-0.15020395633670644,"1456":0.11411512275778449,"1457":0.15465187066041258,"1458":-0.059379037210216305,"1459":-0.5452417282095642,"1460":0.1364049088206031,"1461":-0.15696708096042328,"1462":-0.15424415213066484,"1463":-0.00851964424292177,"1464":0.07734695601407511,"1465":0.19217532143155555,"1466":0.21564209954692584,"1467":-0.20544788110472947,"1468":-0.3434897051204673,"1469":-0.13487903587186356,"1470":-0.019388489298419895,"1471":0.014135441347382635,"1472":0.10488079455497769,"1473":0.13279553118675574,"1474":0.5075273789297743,"1475":-0.21551423500464595,"1476":0.02443577981325905,"1477":-0.021820139169635218,"1478":-0.1564500944645013,"1479":-0.3871561463101267,"1480":0.008544347499984102,"1481":0.49372843487745643,"1482":-0.05910799738261481,"1483":0.4528945420655842,"1484":0.10652186417236985,"1485":0.06406382954693111,"1486":-0.041838276903217564,"1487":4.057542891299538,"1488":0.5214465917893059,"1489":0.22792965117295227,"1490":-0.10862782186693291,"1491":-0.03476769571041781,"1492":0.16179711874045644,"1493":-0.105630614513714,"1494":0.4361406892733327,"1495":-0.031596176403510486,"1496":0.357196519517154,"1497":-0.27135975377526944,"1498":0.7120376699219397,"1499":-0.216129407047251,"1500":-0.37104563631513504,"1501":-0.1914222326111687,"1502":0.22023131091127646,"1503":-0.7225393550376094,"1504":-0.16377024793948672,"1505":-0.4084062290328656,"1506":-0.0642030246056942,"1507":-0.3306549287747346,"1508":0.24614572320137892,"1509":-0.10054506123642928,"1510":-0.08196221683359123,"1511":0.1704914427777091,"1512":-0.24852321427292032,"1513":0.26253785879305364,"1514":-0.23607004818105826,"1515":0.2935722521271245,"1516":-0.2384019058786516,"1517":0.42850429731171336,"1518":-0.22648467819815807,"1519":0.309484545245134,"1520":-0.3446832457616396,"1521":-0.7477613055470281,"1522":0.02119006566245236,"1523":-0.8089030818352881,"1524":0.15343220141863415,"1525":0.20507579673445453,"1526":-0.24192089220558302,"1527":-0.2018375142559315,"1528":0.1801086306989832,"1529":-0.1844550274984814,"1530":0.026654132782063043,"1531":0.02951107037040842,"1532":-0.03128281614335308,"1533":-0.0033517401748653784,"1534":0.021295923873541008,"1535":0.12224936061222419,"1536":-0.008962419956740996,"1537":0.18475310563338318,"1538":-0.15882945055943254,"1539":-0.06323620650653268,"1540":0.2540917337106016,"1541":0.01189975801588181,"1542":-0.37675560081326886,"1543":0.12677133960725975,"1544":0.011167632705139832,"1545":0.20464009488898185,"1546":0.15452340240886567,"1547":-0.05465072205831954,"1548":-0.11944213313857129,"1549":-0.17110449860797108,"1550":-0.26428201385297534,"1551":-0.1945097216035552,"1552":0.2565233739468903,"1553":0.42039873387433524,"1554":0.7668190134577557,"1555":0.012587580548864323,"1556":0.07851405032896695,"1557":-0.5857090262328628,"1558":-0.7209588890390172,"1559":-0.37098834063296504,"1560":-0.3282015936381049,"1561":-0.030121278601605548,"1562":-0.11396569998118418,"1563":0.25643700172533773,"1564":-0.30853982317308953,"1565":0.27590333471693795,"1566":-0.09613035790866432,"1567":0.3204542564082112,"1568":0.10231803811724867,"1569":0.5812271521843677,"1570":0.6489893475748583,"1571":0.25811277827067564,"1572":0.022375784524616835,"1573":-0.025903879104425185,"1574":-0.10098314911256955,"1575":-0.024519498255014517,"1576":2.1121126405946784,"1577":0.9005208796310601,"1578":0.16706835567954165,"1579":0.3260199038658728,"1580":0.5491935954489433,"1581":0.11759185855463934,"1582":-0.05552615207490774,"1583":-0.22568270510801974,"1584":0.18735449292328007,"1585":-0.2392526134124064,"1586":-0.9813026744772226,"1587":-0.07718071506198426,"1588":-1.1899851776224444,"1589":-0.6843587641693798,"1590":-0.19476189234733227,"1591":-0.41606988456647376,"1592":-0.2936434845956937,"1593":-0.45369661966935904,"1594":-0.45513301150950786,"1595":-0.14517053055560644,"1596":-0.6189190728059708,"1597":-0.308453963565085,"1598":-0.47885389532529365,"1599":-0.4716454390560727,"1600":-0.22768666635205936,"1601":0.2124161200920231,"1602":-0.061762193311910546,"1603":0.3629749443255674,"1604":0.1943181766857293,"1605":0.1823597571695053,"1606":-0.12490699452665938,"1607":-0.29270068439504354,"1608":0.33579436163061405,"1609":0.21760022473478216,"1610":-0.1703985235715853,"1611":-0.22600084171576384,"1612":0.1488338638491544,"1613":-0.0772177180937201,"1614":-0.07142358635456349,"1615":-0.31930026844404685,"1616":-0.08913574891541005,"1617":-0.14750166420782904,"1618":0.060007965038560096,"1619":-0.9074684484496633,"1620":-0.010276784957287071,"1621":-0.07793866942957996,"1622":0.24046702661491295,"1623":0.06367922262420293,"1624":0.4239536496168569,"1625":0.15676095528641662,"1626":0.3165851857365723,"1627":0.11444008048945428,"1628":0.11901271065316522,"1629":-0.05914905613523862,"1630":-0.6401412757823444,"1631":0.08395310456236235,"1632":0.20311945335953957,"1633":-0.07575848607277157,"1634":0.5040336204919549,"1635":0.2988519672037733,"1636":0.2504652914688221,"1637":-0.1936745750347266,"1638":0.5035537073830784,"1639":0.218592880676906,"1640":0.05019836674378233,"1641":0.33465551703172286,"1642":0.4675011738144855,"1643":0.04572657737050052,"1644":0.0985334693218177,"1645":-0.25149836833337136,"1646":-0.11258801206538445,"1647":-0.2837776893861098,"1648":-0.009006613790896756,"1649":0.261296650506159,"1650":-0.16208266172971025,"1651":-0.08689329808266441,"1652":0.10335946720036716,"1653":0.09359585198812105,"1654":0.03901603862408634,"1655":-0.17198668255793198,"1656":-0.3094762476395232,"1657":-0.013302451027148776,"1658":0.06448406182351968,"1659":-0.027699411069048954,"1660":0.21360622561871095,"1661":0.01567107705344456,"1662":0.19435806293579727,"1663":-0.3902917554599535,"1664":0.19818915985636737,"1665":-0.0017418496694427256,"1666":-0.03288639316890914,"1667":-3.0317459206963027,"1668":-1.2572350528538607,"1669":-0.1567388763561774,"1670":-0.05460652492586615,"1671":0.12097480043352234,"1672":0.123408086383467,"1673":0.2745443459408062,"1674":0.5095968480481651,"1675":-0.6103711943297032,"1676":-0.0807678829960151,"1677":-0.32296945415036743,"1678":-0.13988518728960947,"1679":0.2752155845764417,"1680":0.302253383571799,"1681":0.5210938027923246,"1682":0.3884245223249096,"1683":0.48018526163513114,"1684":0.32770950634161317,"1685":0.47939973154745397,"1686":-0.15169055750578406,"1687":-0.20003987240881732,"1688":-0.450124586799681,"1689":0.03519043475882032,"1690":0.017362351635114348,"1691":-0.48150763684746023,"1692":-0.46259511619403065,"1693":0.12443526462210758,"1694":-0.5090345993613329,"1695":-0.07968801453207837,"1696":-0.34343431107079303,"1697":0.1980552259024646,"1698":-0.06901740526596932,"1699":-0.09019863056018577,"1700":0.45548562533091747,"1701":0.1793118365286506,"1702":-0.08210368648881466,"1703":0.7176084400340409,"1704":0.18862112446288087,"1705":0.12183843567949844,"1706":-0.26690654896763244,"1707":-0.166214061598369,"1708":-0.15225290173280548,"1709":0.07013970118147145,"1710":-0.47613613362572554,"1711":0.02150138151210511,"1712":0.36674483762587523,"1713":0.30547130482944385,"1714":0.28653517792401195,"1715":-0.26531576464512246,"1716":0.0282129459012377,"1717":0.05854566522937978,"1718":0.004027253275653826,"1719":-0.3901137269753962,"1720":-0.33170511283994075,"1721":-0.11789497348372292,"1722":0.053042799133341687,"1723":0.11438946116248672,"1724":0.1076018865847902,"1725":-0.11091580512516426,"1726":0.039786087525115546,"1727":-0.07631753152596671,"1728":0.2124211782861431,"1729":0.2719746044023099,"1730":0.08798435602901995,"1731":0.36920537541766274,"1732":0.2207696066998658,"1733":0.322474563106131,"1734":0.037751621575752084,"1735":0.17093509755927808,"1736":-0.1604014856481867,"1737":0.18717213509062136,"1738":-0.0771178196540257,"1739":-0.3936966172319322,"1740":-0.2993810130717568,"1741":-0.6463690927635004,"1742":-0.599926775160653,"1743":-0.6887458761413067,"1744":-0.5018037673104826,"1745":-0.35466528142096115,"1746":-0.07590513560453359,"1747":-0.24765564590553948,"1748":0.022004396627528736,"1749":-0.011636246926521243,"1750":-0.3961302515322489,"1751":-0.5838216129372847,"1752":-0.5435781413776328,"1753":-0.2608657358150675,"1754":-0.29971777388365456,"1755":0.08339674705246614,"1756":0.05803665202790971,"1757":0.10680489544666018,"1758":-0.0367040028601679,"1759":0.04154084800481504,"1760":-0.29144898003302827,"1761":-0.3180833653046717,"1762":-0.27236598323410366,"1763":-0.5038109540234699,"1764":-0.2876874905910559,"1765":0.30023017490271686,"1766":-0.256410124399323,"1767":0.10170977497952083,"1768":0.31090646853159454,"1769":-0.013354555512812947,"1770":0.15532501263683204,"1771":0.11278477510531831,"1772":0.2553250089658254,"1773":-0.239907627535047,"1774":-0.29985782427501,"1775":-0.6247092199162156,"1776":0.07527213806927865,"1777":-0.17979689321388406,"1778":-0.06868590691837914,"1779":0.05040739757537504,"1780":-0.10487840729789544,"1781":-0.20244938672933052,"1782":0.5577821905311414,"1783":-0.25637987961616,"1784":-0.38257454887625425,"1785":-0.5635045170077888,"1786":-0.5317724533832152,"1787":-0.03631727753350861,"1788":0.40953995536892795,"1789":-0.002618709760968585,"1790":0.33310931547505906,"1791":0.04054203690610292,"1792":0.06056038143082715,"1793":0.12484627076232044,"1794":-0.46062063701000133,"1795":-0.35668714656363293,"1796":0.32833826095059243,"1797":0.2622122232093987,"1798":-0.19088675744872702,"1799":0.4278771429191789,"1800":0.13996695839089418,"1801":-0.2556598569051535,"1802":0.015811621435063525,"1803":-0.3525730971078577,"1804":0.13253011044276108,"1805":-0.10907456321237458,"1806":0.2776847672992529,"1807":0.21722114562815084,"1808":-0.14279165179327544,"1809":-0.5281857596290204,"1810":0.042077198838923795,"1811":0.00807884561527759,"1812":-0.5427385180575138,"1813":-0.7808238911126115,"1814":-0.003151349599455335,"1815":-0.045404796373052864,"1816":0.4907742582803018,"1817":0.04345243785856078,"1818":0.29815023731621476,"1819":0.06854376095193361,"1820":-0.27241444574208723,"1821":0.5283776754818382,"1822":1.0707780791241666,"1823":1.9156128779864854,"1824":1.85049788681425,"1825":1.6014042015910184,"1826":1.5741011119141677,"1827":-0.09695340882660108,"1828":0.3317740829349967,"1829":-0.18977787784487984,"1830":-0.3989335979342192,"1831":-0.3974093263665042,"1832":-0.4872437721235402,"1833":0.7752939397030267,"1834":0.3883892892891551,"1835":0.21577254570310997,"1836":-0.1340267526217763,"1837":-0.13869436263324134,"1838":0.15498908283976104,"1839":0.2385766522224495,"1840":-0.06767592951024817,"1841":0.30352507867587947,"1842":0.2725387016246467,"1843":0.8191252179987418,"1844":0.4658768106658407,"1845":0.08300253673679901,"1846":0.24850970920581372,"1847":0.07536629482583658,"1848":-0.09982571667920147,"1849":0.2382880555314716,"1850":0.0752729570699585,"1851":0.45345023930160955,"1852":-0.27905472483256777,"1853":0.038363063246651,"1854":-0.5395688799169781,"1855":-0.44529359580289185,"1856":0.34478187470312294,"1857":-0.17718454457878105,"1858":0.5951467713491869,"1859":0.09205148240330707,"1860":0.18679562378388798,"1861":-0.2486659491884965,"1862":-0.362894189682185,"1863":0.3411923115841,"1864":0.10232186416149062,"1865":-0.7862908115257984,"1866":0.29098357264049063,"1867":0.0981201393206198,"1868":-0.06789617164453347,"1869":0.027626007188035578,"1870":0.5887871456766648,"1871":-0.004128949211293953,"1872":-0.31118182008749773,"1873":0.4290300101294191,"1874":-0.14888885006642558,"1875":0.12617455362667557,"1876":-0.08238183988334186,"1877":0.8082557233334636,"1878":0.1415904015387147,"1879":0.6598911814253942,"1880":-0.03561563889932783,"1881":0.3032654622582829,"1882":-0.5024398590214206,"1883":0.21461001587381448,"1884":-0.2566562427248761,"1885":-0.5296885757423198,"1886":-0.04191572793567084,"1887":-0.18433618151411493,"1888":0.08796916699017526,"1889":0.2009882541331689,"1890":0.19432438398958563,"1891":0.2668067341612397,"1892":1.3067276415298235,"1893":-0.8652577669135241,"1894":0.1423324305345168,"1895":-0.5444763203600804,"1896":-0.35639594745302955,"1897":-0.5990516246879235,"1898":0.17428543723775083,"1899":0.05193261557898445,"1900":0.43309896851431223,"1901":0.23453812841447236,"1902":-1.775491496958692,"1903":-2.008941104779769,"1904":-0.07935690545616621,"1905":-0.46893196905287726,"1906":-0.5642239421745888,"1907":-0.2428453516228527,"1908":-0.624513087946007,"1909":-0.8756343789496536,"1910":1.4853527349296487,"1911":1.443017170080608,"1912":1.0034332322170259,"1913":0.7304534911461747,"1914":-0.18779204742830108,"1915":-0.3797274461536885,"1916":0.0430405451934892,"1917":-0.2929823833898415,"1918":0.327437592200689,"1919":0.2896348414100046,"1920":-0.31537562030417693,"1921":0.5337611617256267,"1922":0.9869818733541296,"1923":-0.14933233216155373,"1924":-0.6794408189873924,"1925":-0.3977555645877332,"1926":0.19948707497134452,"1927":0.407856524044782,"1928":-0.3284964001221896,"1929":-0.13747969441309446,"1930":-0.7607962055973909,"1931":-0.268249231418307,"1932":0.4868586875311251,"1933":0.09458321674543192,"1934":-0.2689492259378962,"1935":-1.0918412354242641,"1936":0.018895068185114706,"1937":-0.4577954817905391,"1938":0.30805791046158654,"1939":-0.07107337283021087,"1940":0.018669042482342076,"1941":0.17118444373203281,"1942":-0.45120770570204044,"1943":0.1514348034613117,"1944":-0.025159264007811287,"1945":-0.027995498866289676,"1946":-0.040681203027582095,"1947":-0.37962237772622703,"1948":-0.06128377495201273,"1949":-0.017821482747391905,"1950":0.18589277835729723,"1951":-0.11694992557991127,"1952":0.1064313106665002,"1953":-0.176225315318539,"1954":0.22965083766251715,"1955":-0.31574754464314353,"1956":0.2215277530394363,"1957":0.026127795745831704,"1958":0.2943272371076815,"1959":-0.0990889482775464,"1960":0.005447880948664401,"1961":-0.29075378860661755,"1962":-0.24400306695360624,"1963":-0.1777469574524027,"1964":0.26762296598992885,"1965":0.006917975267987176,"1966":0.10712833287610468,"1967":0.13081330267218189,"1968":-0.12542428908024061,"1969":-0.18542258741399506,"1970":-0.5763206875689215,"1971":0.27536722131250946,"1972":-0.2967507064306976,"1973":-0.2327971132821523,"1974":0.4985303183696573,"1975":-0.3728410932999605,"1976":0.1625418837074504,"1977":0.037562251625117345,"1978":0.40008063907191715,"1979":-0.2270028085798827,"1980":-0.08732150165276194,"1981":-0.39357236113283467,"1982":-0.2032635769362591,"1983":-0.700552505016509,"1984":-0.24665020232311577,"1985":-0.2580669912100635,"1986":-0.6499851587620429,"1987":-0.9234833684451811,"1988":-0.40838744191958437,"1989":0.17056526384516135,"1990":0.15043039910558378,"1991":-0.05846505830685394,"1992":0.11078719484938838,"1993":-0.337752835803551,"1994":-0.5892008731584126,"1995":-0.41410769459304264,"1996":-0.035570474770558226,"1997":-0.3640222710742256,"1998":-0.14794826764208469,"1999":0.11337029670580044,"2000":-0.07184978371558012,"2001":-0.10483817357368734,"2002":-0.3518700077301924,"2003":-0.22722527783812826,"2004":-0.15787834272653958,"2005":-0.10143503487853142,"2006":-0.6630729735725975,"2007":0.2939570482027759,"2008":-0.1766222060843181,"2009":-0.3867167997060421,"2010":0.4039798516340495,"2011":0.222060894210966,"2012":-0.718228133423271,"2013":-0.11601323956928497,"2014":0.23833260185139382,"2015":-0.1373605648249564,"2016":0.4720011093637335,"2017":0.37799302242608573,"2018":-0.28361580965142824,"2019":-0.0032964253654231674,"2020":0.03711059106135222,"2021":-0.21065851639329397,"2022":0.13534035115141663,"2023":0.06448140036281251,"2024":-0.6514945221943755,"2025":0.22143049387056332,"2026":-0.16788317916341078,"2027":0.3150671293625659,"2028":-0.036157337297026984,"2029":0.1455346493858281,"2030":0.2483266149532352,"2031":0.09329822245876775,"2032":0.13929623200076205,"2033":0.11487084347529616,"2034":-0.043580691275202504,"2035":0.17459927466610745,"2036":0.5662351996101455,"2037":0.21352796935791593,"2038":0.19884532023998427,"2039":0.31473191613724755,"2040":0.19513392871194168,"2041":0.10683987072992511,"2042":0.17881266838072377,"2043":-0.14213979894237938,"2044":0.06698154792995344,"2045":0.005594167444067133,"2046":0.018141747060484586,"2047":0.27563476561273115,"2048":0.286817557892519,"2049":0.1856256603379314,"2050":0.16340096475271162,"2051":0.13673503675175175,"2052":-0.13260773030919354,"2053":-0.2350590340946202,"2054":0.3907258214300524,"2055":0.08633792662259523,"2056":0.09597997278555054,"2057":0.22885737317059163,"2058":0.15155781888460337,"2059":0.14009081793947942,"2060":0.139488905533965,"2061":0.14392556169781004,"2062":0.07435514756642522,"2063":-0.501523415083978,"2064":-0.02887820328475272,"2065":0.2739801125502544,"2066":0.2735054584995575,"2067":0.160812537162067,"2068":0.11011788962519127,"2069":0.1267470514231899,"2070":0.0037093241641799036,"2071":-0.18258271789644753,"2072":0.24727439531435294,"2073":0.34187991961935066,"2074":0.23030508877203443,"2075":0.20500502733887596,"2076":0.1988715740324628,"2077":0.20936361303740575,"2078":0.08800411236886004,"2079":0.5918076028693984,"2080":0.04019658396662425,"2081":0.057745365081811724,"2082":0.20926538853888443,"2083":0.30086897081548436,"2084":0.25863445895619497,"2085":0.20040905457336192,"2086":0.21495955780380377,"2087":0.12317306562516438,"2088":0.09934654517940988,"2089":0.3196288257124377,"2090":0.13972942772482824,"2091":0.07911447701448523,"2092":0.11966259911151686,"2093":0.21904776120638464,"2094":0.24672197953892028,"2095":0.12800493663250814,"2096":0.06360593886442344,"2097":-0.27576566009535786,"2098":-0.16553039778421552,"2099":-0.14452123451764212,"2100":0.2901961291186868,"2101":0.2476090422434894,"2102":0.3268776627868472,"2103":0.19422949519525995,"2104":0.12168627418089502,"2105":0.17653110648809528,"2106":0.2773868442784818,"2107":0.21984462320413287,"2108":0.36690026653391716,"2109":0.3294545776876565,"2110":0.11847008001856478,"2111":-0.514790261952857,"2112":-0.1772604046992946,"2113":0.027398250021085535,"2114":-0.6256957101432997,"2115":-0.32530728768897177,"2116":-0.4736759051493927,"2117":-0.24105409664581126,"2118":-0.29245001921433367,"2119":-0.013779036617440255,"2120":-0.3881175132803176,"2121":-0.1920951266383722,"2122":-0.13931569105550484,"2123":0.3595729253907333,"2124":0.25619285164775246,"2125":-0.07577517521677085,"2126":-0.1284533564846164,"2127":-0.4473092550973969,"2128":-0.8536301990426263,"2129":-0.3761133752215224,"2130":-0.451610417894624,"2131":-0.2989588197934331,"2132":-0.1985227812698316,"2133":0.5022397771682231,"2134":0.3882488115451459,"2135":-0.1819650997719251,"2136":-0.157971590521538,"2137":0.4967246869137207,"2138":-0.5076881735431228,"2139":0.020334348167893555,"2140":-0.24189132950229458,"2141":0.030210711911022047,"2142":-0.618491697436459,"2143":0.5873358434301087,"2144":0.2025501706514675,"2145":0.3340117890372841,"2146":-0.17985076431865665,"2147":0.5244966927637402,"2148":-0.28155698656464767,"2149":0.27471034428057506,"2150":0.05098549788702994,"2151":0.17309841448784852,"2152":0.198208447588152,"2153":0.06844686742479289,"2154":-0.6287180397089376,"2155":-0.3702361453310694,"2156":0.2579467518197447,"2157":0.08634821917480977,"2158":-0.3362258652285537,"2159":-0.42075617238801716,"2160":0.3937716915152022,"2161":-0.38466240184749684,"2162":-0.37526284003394716,"2163":-0.4495706714200571,"2164":-0.2640151677580243,"2165":-0.3400885895018159,"2166":-0.2253747428074319,"2167":-0.26705055712815706,"2168":-0.6475471123887384,"2169":0.8295361632852193,"2170":0.041191772941816314,"2171":-0.5115004013604636,"2172":-0.2807251804669537,"2173":-0.5715361335389089,"2174":-0.25299974720525437,"2175":-0.428435006284138,"2176":-0.06825385290912105,"2177":-0.11755479689812193,"2178":0.3673214913727906,"2179":-0.048607949193846416,"2180":-0.2449637647346254,"2181":-0.8108920162936128,"2182":-0.2551140319795437,"2183":-0.8571900511790591,"2184":-0.2279807074992498,"2185":-0.27611348260607105,"2186":-0.05018137746471118,"2187":-0.40005241724209556,"2188":-0.43140324592414553,"2189":0.09778342531928215,"2190":-0.22280994160449283,"2191":0.2232965244632047,"2192":-0.785761772125067,"2193":-0.4488536054224465,"2194":-0.6532944199429919,"2195":0.11608371224793639,"2196":-0.43256371932468096,"2197":0.24039168987216827,"2198":-0.9020606664809427,"2199":0.22176116260293316,"2200":0.03881068311687244,"2201":0.10190648174009319,"2202":0.35756683490759644,"2203":-0.3469634486565609,"2204":0.19890744688436213,"2205":-0.5117722996361037,"2206":-0.02096864800514752,"2207":-0.3325083737695471,"2208":-0.25485876671815316,"2209":0.220268086345498,"2210":-0.6624405589033657,"2211":-0.8273243904598763,"2212":-0.17532110788463862,"2213":0.10619317945121388,"2214":-0.079106550303337,"2215":0.21785594589002366,"2216":-0.08177793828808591,"2217":1.5069564833971418,"2218":0.1525916198532989,"2219":-0.37442764659979805,"2220":0.012106983616847363,"2221":-0.1151046597598639,"2222":0.35711536494512,"2223":0.2542997650491272,"2224":0.26546889811895186,"2225":-0.646718788092871,"2226":1.5970165050163845,"2227":2.8666269330632264,"2228":0.6281568576197046,"2229":0.5685084221333495,"2230":-0.08202811037543344,"2231":-0.13547388221976364,"2232":0.7460932058236002,"2233":-0.23238165547513895,"2234":-0.17422741518758053,"2235":1.5011988908862415,"2236":-0.18141214853221804,"2237":-0.38463501981409315,"2238":-0.22360164156008702,"2239":-0.6998547118782839,"2240":0.3674146442848545,"2241":-0.40756521553641833,"2242":-0.05681926829847957,"2243":0.0432155359374585,"2244":-0.15787224972236866,"2245":-0.12042653564215837,"2246":-0.18691202236046733,"2247":0.6021985149591068,"2248":-0.5882961773599739,"2249":0.011365319203391023,"2250":-0.028571447187332465,"2251":0.1610837284724679,"2252":-0.3426144343500768,"2253":0.1714838334207643,"2254":-0.25369288628708603,"2255":-0.6404866760675874,"2256":-0.6888717519734822,"2257":-0.2684646584797423,"2258":-0.4918263604062572,"2259":0.6883428405478033,"2260":-0.06432295072204759,"2261":-0.07147170407015299,"2262":0.23668458355550756,"2263":-0.48804507507891076,"2264":-0.039311475239471316,"2265":-0.11183079486229898,"2266":-0.45796037680018853,"2267":0.42390116195607863,"2268":0.530997551266967,"2269":0.04349143663473388,"2270":0.246694775065367,"2271":-0.4532027544318824,"2272":0.3196956517489887,"2273":0.19883817210930682,"2274":-0.3018447879640772,"2275":-0.20671956962726512,"2276":-0.5548302593256079,"2277":-0.39678393916993837,"2278":-0.050457209333330005,"2279":-0.7063232214505644,"2280":-0.31631019442493996,"2281":0.2190309742468768,"2282":0.1767044176185773,"2283":0.5401804036108327,"2284":-0.004774863457589818,"2285":-0.08460586329154829,"2286":-0.6125879430912706,"2287":-0.5148572815873533,"2288":0.10679328345843005,"2289":-0.12647202092012672,"2290":0.8429115444561416,"2291":0.21664346277302896,"2292":-0.03434585406828337,"2293":-0.32732132585954465,"2294":0.45866439470838605,"2295":0.3642557870936317,"2296":0.5629551107736782,"2297":0.928256034843478,"2298":1.4675948139897315,"2299":0.021508659015498248,"2300":-0.2472657597263599,"2301":-0.7898280855146562,"2302":-0.5391973176949777,"2303":-0.4539347261551127,"2304":0.004832942261234889,"2305":0.8529486142755736,"2306":0.08102432581664754,"2307":-0.7373930278456362,"2308":-2.3640727394248717,"2309":-2.4983265811421447,"2310":-0.6880262463495637,"2311":-1.2321592724733035,"2312":-0.057431889498661175,"2313":0.07823712948483597,"2314":0.3530145643203279,"2315":0.48686664117401884,"2316":0.9419042592618665,"2317":1.0520901478423708,"2318":0.19517489343468947,"2319":-0.588996374273247,"2320":-0.5979682574589753,"2321":0.1277163302855898,"2322":-0.1609471683620697,"2323":-0.18910069312562225,"2324":-0.3092483508033388,"2325":-0.04637590035509731,"2326":-0.06573168577923198,"2327":0.3527488038870306,"2328":0.003113669783918088,"2329":0.9922257381663702,"2330":-0.065612255480569,"2331":-0.09630222133296314,"2332":-0.6827596512352735,"2333":0.35658286773799286,"2334":-0.08684564096389968,"2335":1.0622196360959042,"2336":0.38394697596211014,"2337":0.024087072522006786,"2338":0.34962588692485885,"2339":0.1875042447893232,"2340":-0.32735624023880616,"2341":-1.3796921759192498,"2342":-0.7001047740185624,"2343":0.08274120387680199,"2344":0.34935072708498593,"2345":-0.07038328287450402,"2346":-0.13823728287526996,"2347":-0.36465354289335034,"2348":0.2732949240781629,"2349":-0.019956897117426785,"2350":0.26434680852257314,"2351":-0.08437925171647133,"2352":-0.10680986903337106,"2353":-0.14402090800523148,"2354":0.17619480649993566,"2355":-0.025001949489097355,"2356":-0.015959125383570222,"2357":-0.09863192908447808,"2358":0.1356152855537568,"2359":0.2876523140096504,"2360":-0.3461924036521111,"2361":-0.12773501497508422,"2362":0.19571209780654938,"2363":-0.3026335247047523,"2364":0.3358024186109206,"2365":-0.24321266120863277,"2366":-0.09080774893550686,"2367":0.1773469533910804,"2368":-0.2534183733500063,"2369":-0.21146028620093557,"2370":-0.3163440956071543,"2371":0.08976696600833668,"2372":-0.14479513744865444,"2373":0.06504562096839601,"2374":-0.11129313903950072,"2375":-0.37561473289014957,"2376":-0.008450196055237147,"2377":0.17880772687111401,"2378":-0.16265699075239246,"2379":-0.31081191448838474,"2380":-0.2859735127273456,"2381":-0.05811770686606623,"2382":-0.21736608906691238,"2383":-0.09644979251319206,"2384":-0.0751364432630769,"2385":0.009271669348799185,"2386":0.9035270815520273,"2387":0.1816231513431652,"2388":0.45110542306998486,"2389":0.2738402652001348,"2390":0.36311825345286475,"2391":0.10481329930563989,"2392":0.3687669296157661,"2393":-0.17541132427795988,"2394":0.20276432606049272,"2395":0.08673834656097076,"2396":0.7763112393661686,"2397":0.3731979229823336,"2398":0.5866238540006768,"2399":0.29180655330703353,"2400":0.03100807638204149,"2401":-0.17409050580286145,"2402":0.05422182426769749,"2403":-0.3745383428533817,"2404":-0.1444803211023214,"2405":-0.09676333055959038,"2406":0.03259829381193405,"2407":0.04953846744305306,"2408":0.01208221272042562,"2409":-0.08870225505529955,"2410":0.08463537828123446,"2411":0.14032714502474017,"2412":0.45772571360701003,"2413":0.3180415898994016,"2414":0.07185748528990292,"2415":-0.00918779082950362,"2416":-0.06016290011460289,"2417":0.10224896321091342,"2418":0.029359366540378157,"2419":0.08170663885349516,"2420":-0.16291820224673834,"2421":-0.13654401501572727,"2422":-0.0848157694569269,"2423":-0.41220161402448957,"2424":0.023469189424514314,"2425":-0.019027492602932874,"2426":-0.023893700145342908,"2427":-0.0039912046194674365,"2428":0.07215854884786102,"2429":-0.2332575231862302,"2430":0.04816295993271507,"2431":0.06251542718292037,"2432":-0.3008558152732078,"2433":0.004641210622358935,"2434":-0.42810259343077417,"2435":-0.21223240654468656,"2436":-0.15114625410989224,"2437":-0.11348748166804291,"2438":-0.11843039342763052,"2439":-0.39288771106444487,"2440":0.5298766640933393,"2441":0.06338629539044509,"2442":0.2214337979781085,"2443":-0.19537700042949263,"2444":-0.25768658553978224,"2445":-0.5973146295878528,"2446":-0.5126411443403851,"2447":0.13587953955565152,"2448":-0.18118619905343847,"2449":-0.04139832168887944,"2450":-0.02509527596383047,"2451":-0.3568471823838274,"2452":-0.2269609227051283,"2453":-0.0555163479956965,"2454":0.022169923316679954,"2455":-0.5158507110312539,"2456":0.002610702811928347,"2457":-0.0067874914477130885,"2458":0.29058947503736937,"2459":-0.7277424251021251,"2460":-0.07170482496575092,"2461":0.42230613005323286,"2462":0.12296858677218868,"2463":0.1336334984385216,"2464":0.4975353334840287,"2465":0.22073593663991187,"2466":0.6936027227800599,"2467":-0.155333868878524,"2468":-0.07613665237670529,"2469":1.0409038974949105,"2470":0.7209479519670332,"2471":0.37487274791250025,"2472":0.5509471132015124,"2473":0.10668060906981747,"2474":0.08019906431007567,"2475":0.1947449991401512,"2476":-0.06543508330480846,"2477":-0.20000381009231305,"2478":-1.1253728630451922,"2479":-1.205192378637993,"2480":-0.9795537668105908,"2481":-0.7224260548344418,"2482":-0.5814724332485208,"2483":-0.1821486179754251,"2484":0.23597241234275132,"2485":0.15660085992513711,"2486":-0.17561434786900268,"2487":0.08737435295513479,"2488":-0.3245883962368805,"2489":-0.4894237784695428,"2490":-0.12501983908464692,"2491":0.02203642826410408,"2492":-0.49750745541682556,"2493":-0.12767011204991655,"2494":-0.4250366318650409,"2495":0.027935336480623067,"2496":-0.4974164528754453,"2497":-0.5093277939728815,"2498":0.24645601692257582,"2499":0.19497978813496358,"2500":-0.32538926503381077,"2501":0.04134415888434293,"2502":-0.09798026214825904,"2503":-0.06375280045597852,"2504":0.007178448326250449,"2505":0.277861956853598,"2506":-0.09749412096269963,"2507":-0.09353573443614817,"2508":0.14547708757595657,"2509":0.07678743786892239,"2510":-0.01175007333037259,"2511":0.10368718266534922,"2512":-0.07792073912107489,"2513":-0.24549236788393147,"2514":0.18234290369299183,"2515":-0.09565441043151716,"2516":-0.1118193276076095,"2517":0.12250153346781135,"2518":-0.011250571057899785,"2519":0.04955561249545385,"2520":-0.09353189246330901,"2521":0.13542097629510785,"2522":0.13679329818896183,"2523":-0.028756773724204387,"2524":-0.08953769572821209,"2525":-0.0015310101107346946,"2526":-0.3208658264104773,"2527":-0.3798568511976803,"2528":-0.12915354983282376,"2529":-0.029324866354766062,"2530":-0.15982058024389717,"2531":-0.08745533966171891,"2532":0.007103375761148879,"2533":-0.0787651354687817,"2534":-0.3411207438078939,"2535":-0.03741064589803258,"2536":0.12391992608941005,"2537":-0.24383284327450996,"2538":0.13522974037750768,"2539":0.0690739868732137,"2540":-0.9115546569510395,"2541":-1.0468538768795104,"2542":-0.5671091800782324,"2543":-0.43574680518366504,"2544":-0.3811112787741016,"2545":0.014841622142852695,"2546":0.11987689939141188,"2547":0.06985070707218087,"2548":-0.36593996445661514,"2549":-0.28141189207435396,"2550":-1.0528166535249934,"2551":-0.48681369302238225,"2552":-0.20277746998381646,"2553":0.16487092418031055,"2554":0.2783658877655438,"2555":0.06264079274198775,"2556":0.05847369901491759,"2557":0.2598993672532509,"2558":0.04602486266466085,"2559":0.1132055923707165,"2560":-0.020446520293159638,"2561":-0.30824769035813987,"2562":0.1768829184691649,"2563":0.009498932803686782,"2564":0.10530137867765071,"2565":0.052156072502474234,"2566":0.17070903385233,"2567":0.021504349981176868,"2568":-0.08593592230790262,"2569":0.07907136034256272,"2570":0.010630572414807284,"2571":0.12545492466710945,"2572":0.11227686037918592,"2573":-0.04456686149307656,"2574":0.10975636417030664,"2575":-0.08131563962927464,"2576":-0.02698136185700411,"2577":-0.3726287071650858,"2578":0.13640002647816937,"2579":-0.015987564326317486,"2580":0.024628608306849587,"2581":-0.1656737052377333,"2582":0.3396724672218489,"2583":0.03575734710621193,"2584":0.3100442034856108,"2585":0.1507358551174986,"2586":0.16500552351893347,"2587":-0.17888011869120682,"2588":-0.011549977953705081,"2589":-0.09700394365214478,"2590":-0.03862682327177714,"2591":0.18361535445336757,"2592":-0.6196181733196069,"2593":-0.3970897959758506,"2594":0.43682740729204256,"2595":0.3963218914548084,"2596":-0.38308880554788194,"2597":0.294774144151156,"2598":0.0697837889348877,"2599":0.3691615383720694,"2600":0.25333819158679904,"2601":-0.03418871324389458,"2602":-1.1856930904130014,"2603":0.37024690673962657,"2604":0.31222790964453384,"2605":-0.021335824095314978,"2606":0.7169551500211421,"2607":0.2165265732036688,"2608":0.16297828433640862,"2609":0.17889088545077445,"2610":-0.8587767894091706,"2611":0.3765624641051452,"2612":0.6327542307912472,"2613":0.6174319180310607,"2614":0.7269324333801683,"2615":0.39263172515778577,"2616":0.21894214312407004,"2617":0.2772316673634775,"2618":-0.028441167777391464,"2619":0.8685272227528955,"2620":-0.4760559965548275,"2621":-0.2187540878814788,"2622":-0.09410170450524187,"2623":0.27513405972199234,"2624":0.5273309150170974,"2625":0.3265414505197076,"2626":0.11011844553753104,"2627":0.354260767500763,"2628":0.3913748956358471,"2629":0.0019548983568495647,"2630":-0.9802974901410959,"2631":-0.1521857353653205,"2632":0.27375365285294617,"2633":0.12296331186936721,"2634":0.4083067587941011,"2635":0.16688047686060514,"2636":0.2964757629712274,"2637":-0.4683602982451505,"2638":-0.03523315234951338,"2639":0.43904836505889394,"2640":0.5953566911550793,"2641":0.653337443369387,"2642":0.539501724290641,"2643":0.2293817557493525,"2644":0.3272070815196908,"2645":0.28509072161272053,"2646":-0.6060338274995196,"2647":0.25815247895475035,"2648":0.2532202570234458,"2649":0.8992266516170034,"2650":0.4170797668568355,"2651":0.45690613804364305,"2652":0.4878482004658417,"2653":0.4939636924591376,"2654":0.38638774205652626,"2655":0.16102558227461666,"2656":0.2580545961499269,"2657":-0.4124803063000214,"2658":0.5746973753939939,"2659":0.5422091780091485,"2660":0.5821305199809681,"2661":0.266566597776672,"2662":0.24031057026627384,"2663":0.309741730803664,"2664":0.11159977298177089,"2665":-0.35250424055007534,"2666":0.28187093395196317,"2667":0.7897555306341846,"2668":0.4665545963290582,"2669":0.4618243223576931,"2670":0.36594625271663955,"2671":0.41710339943278746,"2672":0.363070411520716,"2673":-0.31380128159610654,"2674":0.3101451187471073,"2675":0.18324610245018336,"2676":0.0746083752602524,"2677":0.24531685838396114,"2678":0.35641000130851846,"2679":0.48286716527786466,"2680":-0.47360062781622314,"2681":0.13796326420956007,"2682":-0.2662304881637883,"2683":0.060566767711709116,"2684":-0.1956025080542151,"2685":-0.5197608940197233,"2686":0.314322974459978,"2687":-0.4168359510978638,"2688":-0.0003613442218819658,"2689":0.1789956382867318,"2690":0.2065956436032556,"2691":-0.05381822365048397,"2692":0.16379803065560294,"2693":0.20975796267399419,"2694":0.1877250027799069,"2695":-0.06175073730412132,"2696":-0.33014345565123343,"2697":0.08746829743687205,"2698":0.15538461570747397,"2699":-0.2160153778188066,"2700":-0.08347354624414127,"2701":-0.08948740496882844,"2702":-0.056816511402826606,"2703":-1.2589971332755832,"2704":-2.229685474178066,"2705":-1.6504777277589395,"2706":-0.9581200358719504,"2707":-0.4285985741309179,"2708":-0.35722064023579697,"2709":-0.25768882509592866,"2710":-0.21629840148855106,"2711":-0.20693379960832323,"2712":-0.36849800924123555,"2713":-0.6009247141230719,"2714":-0.2782031989243548,"2715":-0.2654799479609837,"2716":-0.448159573433358,"2717":0.09281477451373737,"2718":-0.24355170135530732,"2719":0.18937700698074297,"2720":-0.2256527789045136,"2721":0.77996227193252,"2722":0.34432003832112523,"2723":0.2342300136568645,"2724":-0.13061697566097652,"2725":-0.545244091713088,"2726":-0.014914642421006286,"2727":-0.25068099032516805,"2728":0.05115661908779578,"2729":0.037634828522751816,"2730":0.2113457866713601,"2731":-0.059315840489946106,"2732":0.005356214527459702,"2733":0.28406664175262986,"2734":-0.15534629837037509,"2735":0.5281178678670972,"2736":-0.04213589465235793,"2737":0.2320344170746298,"2738":-0.07938651349157397,"2739":0.10129470502401137,"2740":0.008411203512244175,"2741":-0.18433679637773992,"2742":-0.2514053912649124,"2743":0.26563165426804847,"2744":-0.16325026839511717,"2745":0.023220371559608405,"2746":0.24251291284057097,"2747":0.12507177367638844,"2748":-0.18254497114258456,"2749":0.0439111314308416,"2750":0.31683011908896874,"2751":0.21752192114004976,"2752":0.2619698810755365,"2753":0.3481029654778386,"2754":-0.08152376565752088,"2755":0.11571718248686207,"2756":-0.281882290778849,"2757":0.01480072855336225,"2758":-0.2260070065121588,"2759":0.26587869797836855,"2760":0.015359041336406882,"2761":-0.07799579969648053,"2762":0.07413469724792497,"2763":-0.06532631859640975,"2764":-0.16714595322054512,"2765":-0.06853637391051079,"2766":-0.009092063310478831,"2767":-0.08167871832466744,"2768":-0.16521383270879708,"2769":-0.18118274452697614,"2770":-0.03663115851478015,"2771":-0.09620291446993083,"2772":-0.006387277967805231,"2773":-0.2701991681329221,"2774":-0.11595569628538102,"2775":-0.04465732628353915,"2776":-0.05329702031870887,"2777":-0.07496974651471941,"2778":-0.04841355915945564,"2779":-0.03077242062112138,"2780":0.12965875595220372,"2781":-0.10773357715254446,"2782":-0.11286709956161822,"2783":0.04428902411336054,"2784":0.007378489468472823,"2785":0.08622158046278869,"2786":-0.06918632806962129,"2787":0.04093421510646881,"2788":0.0820274936600859,"2789":-0.048821340457767044,"2790":-0.12690892983111277,"2791":-0.144726064595683,"2792":-0.1406965142996238,"2793":0.3398001072614858,"2794":0.1268638962975194,"2795":0.07979183733780668,"2796":0.03390663000704648,"2797":0.05567933699564678,"2798":-0.07808329208123911,"2799":-0.16018046049507692,"2800":-0.08552541731140736,"2801":0.03412050832596061,"2802":0.015256176221267004,"2803":0.18070267320025163,"2804":-0.11363907539859985,"2805":-0.14603974544630025,"2806":-0.17837321400360048,"2807":-0.04205636340430541,"2808":-0.31956706873232726,"2809":-0.08533903463869186,"2810":-0.0007873285621945593,"2811":0.12084830819671948,"2812":-0.09202381401990464,"2813":-0.045053818420901934,"2814":-0.05052288185006525,"2815":-0.1189706802466341,"2816":0.00522733559513975,"2817":-0.15407553649786265,"2818":-0.17257744868817154,"2819":-0.181955878544706,"2820":0.16956847064025746,"2821":0.04457474194085488,"2822":-0.14409475514390072,"2823":-0.04765750306283362,"2824":-0.04267200479721989,"2825":-0.003386030330573053,"2826":-0.2614242401337466,"2827":-0.09225038773219403,"2828":-0.16264339000187547,"2829":-0.20371191780040226,"2830":-0.1789521498049502,"2831":-0.09481724136151083,"2832":-0.0658787252741375,"2833":-0.011999301235755785,"2834":-0.1458015356742394,"2835":0.5179522897925206,"2836":0.2505163237465768,"2837":0.04329221235007505,"2838":-0.09126993585493373,"2839":0.01725673848937028,"2840":-0.07970705831973998,"2841":0.3012368467327511,"2842":0.2658975748821982,"2843":0.3833319092350285,"2844":0.17770303598989562,"2845":-0.5548500738976007,"2846":0.14675335542212598,"2847":-0.30060269186259286,"2848":-0.059372826708797316,"2849":-0.19403004148339953,"2850":0.3414842127089068,"2851":-0.2810146647387686,"2852":0.2703037922088657,"2853":0.32593160809030597,"2854":-0.004771403010899806,"2855":-0.22704318129475776,"2856":0.1156312550182997,"2857":0.4268668075233502,"2858":0.17068924488571555,"2859":0.14122173812290356,"2860":0.05601157889421957,"2861":-0.08837868655199672,"2862":-0.14668973183015355,"2863":-0.37160783906552153,"2864":0.6059444328648729,"2865":0.9157059129490193,"2866":-0.237085463215439,"2867":-0.6223413521368261,"2868":-0.44527560769013874,"2869":-0.20692945197236867,"2870":-0.279309165260837,"2871":0.3056989913041822,"2872":0.14815594405646942,"2873":0.3754178424029654,"2874":-0.8316066750806176,"2875":-5.375003680333694,"2876":-2.4785864746567645,"2877":-1.0090829528216025,"2878":-0.11539868103956245,"2879":0.17694576942413465,"2880":-0.15091415342641346,"2881":0.4357146086659493,"2882":-0.03872914608904361,"2883":1.346220116818144,"2884":0.19307046518539558,"2885":-0.5486982480398332,"2886":-0.31086911274750073,"2887":-0.13916953660428089,"2888":0.16593917034249014,"2889":-0.16741983427401808,"2890":-0.2251944282078218,"2891":0.9258514117813175,"2892":-0.1328519227758954,"2893":-0.12235033232750181,"2894":0.6103208907245733,"2895":0.40306946452885384,"2896":0.25914507772529843,"2897":0.467512990274174,"2898":0.2503239305593685,"2899":-0.036455567220037136,"2900":0.300269806108306,"2901":-0.09113573254411132,"2902":0.3324248081938712,"2903":-0.20517945103712187,"2904":-0.1574862781561035,"2905":0.04892593581052789,"2906":0.2792264632551287,"2907":0.4150343213633295,"2908":-0.6741926661357054,"2909":-0.07036967066899799,"2910":-0.06122667686796972,"2911":-0.042499835091166394,"2912":0.06571272508049945,"2913":-0.16220121112971062,"2914":0.1719174152948159,"2915":-0.35719878346466305,"2916":0.19519912858738628,"2917":-0.03128620101065534,"2918":-0.3966297717198769,"2919":-0.4176574272696182,"2920":-0.1209906355009722,"2921":-0.10686512068550616,"2922":-0.13742177419153248,"2923":0.038318072366163025,"2924":0.07737046457885148,"2925":-0.1464797851533502,"2926":-0.005662004912698052,"2927":-0.4001242134984997,"2928":0.0596019960733527,"2929":-0.10272831493263575,"2930":-0.37419547221013494,"2931":0.19806936455132554,"2932":0.01878380175091804,"2933":-0.017462609043263938,"2934":0.11511682527633393,"2935":-0.13412001690904787,"2936":-0.1629996289487045,"2937":-0.1183812968283862,"2938":-0.12146772396901649,"2939":0.27517715437116985,"2940":0.42637656668545676,"2941":-0.20146893068848543,"2942":-0.09372954153935552,"2943":0.11573454888400976,"2944":0.019343764847613437,"2945":0.25602486766111815,"2946":1.17655900483678,"2947":1.0567482539717337,"2948":0.7055970080315773,"2949":0.5847404843006874,"2950":0.14884713313880643,"2951":0.25201383401432303,"2952":-0.040740000214787735,"2953":0.5008346868799689,"2954":-0.014419426825901865,"2955":0.8502127060333148,"2956":1.0300735279641309,"2957":0.4024835534754329,"2958":-0.01766488741311739,"2959":-0.2881727814894815,"2960":0.05462335383161617,"2961":0.023539563598525028,"2962":0.14168886285931787,"2963":-0.008533135017932602,"2964":0.04953721355387416,"2965":0.24889797655898482,"2966":0.1740125441769442,"2967":0.2090829614318855,"2968":0.005676787662000831,"2969":-0.23585194443725008,"2970":-0.18723580660137734,"2971":0.12688373108493647,"2972":-0.1425862751106627,"2973":0.16125633711868378,"2974":0.09161909365626432,"2975":-0.041853045119484164,"2976":-0.016103536691448143,"2977":-0.013457987355034576,"2978":-0.13681603031786446,"2979":0.1979008281216508,"2980":-0.24991964635843275,"2981":-0.5416169084448793,"2982":-0.09280591203579605,"2983":0.0771231424027526,"2984":0.31041863761312316,"2985":0.22386187125971135,"2986":-0.0173599253806354,"2987":0.24385841417739798,"2988":0.04309130153095928,"2989":0.12155171876359842,"2990":-0.3337382267578381,"2991":-0.13704355037527505,"2992":-0.11102493517804901,"2993":0.06284034977082399,"2994":-0.07431084035314225,"2995":-0.19319021988019225,"2996":-0.08804796195643408,"2997":-0.36759620247796226,"2998":0.2536133155121021,"2999":-0.05215622276020795,"3000":0.12355763539275252,"3001":-0.2601606200790839,"3002":-0.05315462903339167,"3003":0.26922820227477545,"3004":0.21957348636287538,"3005":-0.2156137491908498,"3006":0.41339072883789685,"3007":0.0008442652066499097,"3008":-0.23672917545303107,"3009":-0.5098308563923218,"3010":0.23911359337324717,"3011":0.4473934459795795,"3012":0.16561138459243463,"3013":-0.10443525801960088,"3014":0.08935892954165138,"3015":-0.10442263204116498,"3016":0.0746323630184995,"3017":-0.5836861368331363,"3018":-0.26533918515553795,"3019":-0.05101098588368901,"3020":0.2677579149610964,"3021":0.41276982510088644,"3022":0.20004313033135632,"3023":-0.19475628137328194,"3024":-0.44747969524940906,"3025":-0.21642015994847472,"3026":1.154703399230826,"3027":1.559416293134542,"3028":2.0938273070595432,"3029":1.6836583833162757,"3030":0.3093611144129155,"3031":0.683611980587245,"3032":0.08590424204366287,"3033":-0.3846209482160921,"3034":0.16330695906610987,"3035":0.41774420042460825,"3036":-0.9187657310479187,"3037":0.7235063688436977,"3038":0.7506507348177348,"3039":0.15704679600290006,"3040":0.35912600582964177,"3041":0.035484384770259246,"3042":0.08048689565742154,"3043":-0.14478105504610322,"3044":-0.03668179750884456,"3045":0.3941813469232978,"3046":0.647409457227736,"3047":0.16500895380914615,"3048":0.4093113303906424,"3049":-0.019853857002907135,"3050":0.037588117730312974,"3051":0.07907480357790975,"3052":-0.5964360330976798,"3053":-0.19165455854638028,"3054":0.02188220909578677,"3055":-0.14307130733916554,"3056":0.5618339936829871,"3057":0.30779956178726997,"3058":-0.06713148919899002,"3059":-0.09218940168552335,"3060":0.2675398855767393,"3061":-0.1764694001352236,"3062":-0.2480551800241316,"3063":-0.5307048981292094,"3064":-0.3146378699618613,"3065":-0.47018057167913524,"3066":-0.13893319184046607,"3067":0.24857653813826297,"3068":0.3161155851142758,"3069":-0.6091403496190965,"3070":0.5572354106053091,"3071":0.33548687737771177,"3072":-0.06207287727008701,"3073":0.32497837401664437,"3074":-0.09788683285476718,"3075":0.2549296144773646,"3076":-0.3952309942426557,"3077":-0.2581582727492321,"3078":0.37113516089030946,"3079":0.25123087090248325,"3080":0.24277074742278118,"3081":-0.009668149472033245,"3082":0.2133047920143055,"3083":0.08100112555178632,"3084":-0.35505535965841295,"3085":-0.09646908519602715,"3086":0.2785419608841149,"3087":-0.01921670568807488,"3088":-0.035418685419765526,"3089":-0.15255287519460053,"3090":-0.4762449433211584,"3091":-0.22019941922922684,"3092":0.411549184904971,"3093":0.682730114886273,"3094":0.42594985771865007,"3095":0.5445907977261183,"3096":0.08111008678286337,"3097":-0.7111325438442244,"3098":0.2702653136574644,"3099":0.3547846791220039,"3100":-0.45456709008999463,"3101":0.18824870190874726,"3102":-0.37978666057556587,"3103":0.13393575625554344,"3104":0.08267414277766086,"3105":0.07185126231205688,"3106":-0.09677029727803159,"3107":0.4059258724378862,"3108":-0.1739761326266953,"3109":-0.10061511862049057,"3110":0.33185809498140845,"3111":0.6477417846607025,"3112":0.26154768828623903,"3113":0.3987979501519625,"3114":0.18465542037986316,"3115":0.3606589695136151,"3116":0.22838036993744293,"3117":-2.051312034543297,"3118":-1.2607422511655528,"3119":-0.1364851883617732,"3120":0.16552697665959906,"3121":0.0174983997937376,"3122":0.4111528925522653,"3123":0.4345247590269541,"3124":-0.3708675443377925,"3125":-0.9946486959110654,"3126":-0.9852798651863728,"3127":0.13999583800345203,"3128":0.08851013164477177,"3129":0.15211513841793853,"3130":0.5902466451238878,"3131":-0.20808521689974158,"3132":0.5114829500062272,"3133":0.08694532774213981,"3134":-0.26593734030312355,"3135":-0.13582887318088513,"3136":-0.27533474465467184,"3137":0.5461189983543204,"3138":-0.37333057617993626,"3139":0.20268596899623234,"3140":-0.1972375023781972,"3141":-0.08566657095216267,"3142":0.27552989111004256,"3143":-0.055994522594379384,"3144":0.7396166202764664,"3145":-0.13368286699814808,"3146":0.9895492509189022,"3147":-0.262477805756697,"3148":0.009774870012516803,"3149":-0.011814886253884686,"3150":0.6895262693463036,"3151":0.08096598931706891,"3152":0.1263020227664692,"3153":0.2202343135017197,"3154":0.2771634695300522,"3155":0.07430671560360178,"3156":0.4714212597474031,"3157":0.2165721278349296,"3158":0.20044974182086192,"3159":-0.09775462959524508,"3160":0.18681008604525898,"3161":-0.4955449256433903,"3162":-0.41716317449687695,"3163":-0.030799836976630243,"3164":-0.03598410300574505,"3165":-0.07626173616896373,"3166":-0.4667452799336898,"3167":-0.08351397434160476,"3168":-0.19965915545033325,"3169":-0.21759570444184848,"3170":0.39042935191328043,"3171":0.09020006413575456,"3172":-0.34594955514266,"3173":0.15827198270769663,"3174":-0.28547916949038843,"3175":-0.3220768897083614,"3176":-0.08499235591839473,"3177":0.07770589492836637,"3178":0.2803341212181633,"3179":-0.20147266579363896,"3180":-0.46430826545811027,"3181":-0.5658237821357087,"3182":-0.5939763189793448,"3183":-0.2996321890129243,"3184":-0.3264392026264897,"3185":0.0010403791510256932,"3186":-0.06024610474467452,"3187":0.44484250297425304,"3188":-0.45588606427721523,"3189":-0.2235487360997909,"3190":-0.6094162553150684,"3191":-0.18113679910482286,"3192":-0.17404432191314403,"3193":-0.633307320292807,"3194":-0.34331377481826697,"3195":-0.05199057885473619,"3196":-0.5015427094987315,"3197":-0.13313486960592122,"3198":-0.02345313586699267,"3199":0.06396010610219181,"3200":-0.30271156745874694,"3201":-0.33908312778505223,"3202":0.14518630419644696,"3203":-0.30030294590834455,"3204":-0.09098102894170414,"3205":-0.3658848001478276,"3206":5.458352376006915,"3207":0.546429777164958,"3208":0.9407114733355579,"3209":-0.553651401911756,"3210":0.05475598818353526,"3211":0.04561792780349192,"3212":-0.18718157146087863,"3213":0.8188262087102539,"3214":0.6644805611958184,"3215":-0.15754864866571083,"3216":0.4308137102961084,"3217":0.19454518265569531,"3218":0.5745545492045725,"3219":-0.22352083247903684,"3220":-0.3819963340334247,"3221":0.10218547887513836,"3222":0.47030695429955105,"3223":-0.2369328545930107,"3224":-0.2042980818865569,"3225":-0.07390026996206828,"3226":-0.04128235101326034,"3227":-0.2598798031673226,"3228":-0.22767453255699252,"3229":-0.19479785275465356,"3230":-0.18668503163107,"3231":-0.36994278827349003,"3232":-0.3533978183623432,"3233":0.4246528066137051,"3234":0.10662530444480103,"3235":-0.12834056417554993,"3236":0.009043341233927863,"3237":-0.33696378597238885,"3238":-0.29712543766562866,"3239":0.4362711754502944,"3240":-0.021873168517623904,"3241":-0.09137553040968227,"3242":0.16260527612579775,"3243":-0.14853581985605874,"3244":-0.14311153870443463,"3245":0.23280583149709289,"3246":0.4670758358592036,"3247":-0.36106658110306405,"3248":0.04170851464042576,"3249":0.3988941726297989,"3250":0.08829766592579187,"3251":-0.005512837621258582,"3252":0.025294885799651754,"3253":-0.01347623326259446,"3254":0.2811657445422093,"3255":-0.30431808754599743,"3256":-0.031668835512724834,"3257":0.15535601667448967,"3258":0.7070266384060863,"3259":-0.08033049947858338,"3260":0.17416578307691574,"3261":0.37759810687052897,"3262":0.36946649025058986,"3263":0.7327488812153845,"3264":0.021819476055273446,"3265":0.22614672189696988,"3266":-0.19264188255116557,"3267":0.03652330591447469,"3268":-0.055872015061451535,"3269":0.22028570735394903,"3270":1.7755673070424152,"3271":2.763082034702614,"3272":1.5832981620279971,"3273":1.262038125208501,"3274":0.620036564319614,"3275":0.5326434921493121,"3276":0.13879838601546218,"3277":-0.03384553043625105,"3278":0.06586744298308597,"3279":0.019453560452097157,"3280":0.34707658779058115,"3281":-0.43629495301983395,"3282":-0.023639998024707874,"3283":-0.0023135698168216152,"3284":0.11333024222316758,"3285":0.29057966952400727,"3286":-0.3481165582855276,"3287":-0.013012614254164712,"3288":-0.9389685996260142,"3289":-0.724934942527919,"3290":-0.11912473472778329,"3291":-0.23098564150173295,"3292":-0.3007004479634693,"3293":-0.19129008489653926,"3294":0.3208155107285552,"3295":0.2510501173410036,"3296":0.0035988179981052046,"3297":-0.044738023105414644,"3298":0.14567637404517647,"3299":-0.1541412441560297,"3300":-0.07341492220799349,"3301":-0.10491903409468403,"3302":-0.36620217883298256,"3303":0.2823704879576027,"3304":0.06075685488175311,"3305":-0.10924394643052754,"3306":-0.38665721876038905,"3307":-0.1182000971816894,"3308":0.28580063294348834,"3309":-0.6141141253223857,"3310":-0.5463945408607986,"3311":-0.25268551803873973,"3312":-0.05075287713759497,"3313":0.2812949418412969,"3314":0.3823405123735685,"3315":-0.29083937704364465,"3316":0.11807238537376687,"3317":-0.10440749080464211,"3318":-0.016716412530224167,"3319":0.07591392472136951,"3320":0.059894750936777694,"3321":-0.18711253711343165,"3322":-0.004739400976398625,"3323":-0.43168327610648083,"3324":0.2589798134116947,"3325":-0.2773165443092381,"3326":0.26142746771751396,"3327":0.08310053099861461,"3328":0.05987352665684308,"3329":0.639663016643503,"3330":0.02322120685484462,"3331":0.31369981691953663,"3332":0.07749403016494164,"3333":0.29451226425561644,"3334":0.3119907094466515,"3335":-0.13514336368462365,"3336":-0.17985120455224538,"3337":0.11151808415929965,"3338":0.36888594090546567,"3339":-0.569164672594612,"3340":-0.37949954997816665,"3341":-0.10872744022257595,"3342":0.47268598546578144,"3343":-0.07160087901436933,"3344":0.49839106638911207,"3345":0.020710652107833936,"3346":-0.06685096872570451,"3347":0.35505780901656664,"3348":-0.4915614137369717,"3349":-0.11027801335533179,"3350":-0.9875793780938126,"3351":0.450419351491605,"3352":-0.20224279163662015,"3353":-0.34368479299534094,"3354":0.44550860044538465,"3355":0.42603924195663934,"3356":0.4482126017963574,"3357":-0.3324998238087574,"3358":-0.40822707551103105,"3359":0.30167153583923695,"3360":0.7643269353935814,"3361":-0.41520232272130225,"3362":0.45473467816740626,"3363":0.12312831040316549,"3364":0.5690156202155395,"3365":0.6564087640414935,"3366":0.24455350828787115,"3367":-0.6614706890029268,"3368":0.088967914429922,"3369":-0.17570314008926904,"3370":0.5147999441541407,"3371":0.09311740949438259,"3372":0.37848264571277457,"3373":0.3584180876338414,"3374":0.5845472430220434,"3375":0.6291223703663618,"3376":0.07594047851918725,"3377":-0.29236866877143874,"3378":0.10954139443460532,"3379":0.2959702816277693,"3380":0.5622106763521688,"3381":0.4510698210852875,"3382":0.24456138788323495,"3383":-0.3339650451716127,"3384":-0.31689245479917183,"3385":-0.1133423334638554,"3386":0.691633887903749,"3387":-0.05871728316477872,"3388":0.07611849553908547,"3389":0.4778405685626241,"3390":0.3033448102899237,"3391":0.18100549607402316,"3392":0.5704821685524836,"3393":0.3699871260018865,"3394":-0.2973524882133249,"3395":0.2960671513618942,"3396":1.042482345727894,"3397":-0.23316978247123632,"3398":-0.36968982586544397,"3399":0.23024352698810235,"3400":-0.15544868648905116,"3401":0.4474996232510402,"3402":-0.03606382094023434,"3403":0.24134158426787378,"3404":0.08507013392261857,"3405":-0.25132557688556956,"3406":-0.12601464466312776,"3407":-0.10355752078145562,"3408":-0.03695742098289038,"3409":-0.23120245314449767,"3410":-0.02445282228700091,"3411":-0.016655315025289354,"3412":-0.014412437021491224,"3413":-0.1121844276792593,"3414":-0.23608849743372723,"3415":-0.10831818031776873,"3416":-0.2792323332145729,"3417":-0.11679655504730345,"3418":-0.06182038640057936,"3419":-0.14245487686891026,"3420":0.07880818267079831,"3421":-0.14714424950096364,"3422":-0.20004972499183188,"3423":-0.309660138205315,"3424":-0.3058168615696841,"3425":-0.09221325327288535,"3426":0.03311103971063211,"3427":-0.08520190230617054,"3428":0.07204938546733816,"3429":-0.23356295895380538,"3430":-0.0417094773624765,"3431":0.3411145828223396,"3432":0.005208379451071551,"3433":0.10305626692519868,"3434":-0.09226037084271421,"3435":-0.15635232228890777,"3436":0.027593089717555724,"3437":-0.19428184296234172,"3438":-0.16199227077697398,"3439":-0.13285307927815584,"3440":-0.09533653588442033,"3441":0.3875815614415622,"3442":0.25576909556465693,"3443":0.1483184843041956,"3444":-0.11201240218946343,"3445":0.038837110829534234,"3446":-0.15928153842041148,"3447":-0.05120172355599596,"3448":-0.21183165117828173,"3449":-0.28626210901703686,"3450":-0.24046798716306914,"3451":-0.20158903767659261,"3452":-0.15391466951547728,"3453":-0.1373046943375025,"3454":-0.199292710537232,"3455":-0.09233690015447639,"3456":-0.1074724268474394,"3457":-0.14334998098786234,"3458":-0.06919429799455581,"3459":-0.2565494340292689,"3460":-0.12396431324836425,"3461":-0.23528405231646662,"3462":-0.24019354506080673,"3463":-0.2687510141091172,"3464":-0.14485554778150148,"3465":-0.039466100594158254,"3466":-0.16274448279956225,"3467":-0.2888408771672733,"3468":-0.1922065905519914,"3469":-0.28365681984475016,"3470":-0.2514262005688622,"3471":-0.034997423565906564,"3472":-0.04402006331181517,"3473":-0.14411027575638669,"3474":-0.05049146959296809,"3475":-0.08804276660202422,"3476":-0.0792670780825528,"3477":-0.4163046782136058,"3478":-0.33209445290009065,"3479":-0.20258154676742948,"3480":-0.14876501431146158,"3481":-0.21151388972207313,"3482":-0.29960579106528945,"3483":0.012507919069027675,"3484":-0.05777248358356051,"3485":0.19125072959318531,"3486":0.07605036521309244,"3487":0.14410909309186987,"3488":0.05650705748846317,"3489":-0.014752749901272252,"3490":0.05458880283216803,"3491":0.036673819945564096,"3492":0.1089270785026871,"3493":0.19503225701688492,"3494":0.04763589939472077,"3495":0.07341020596536128,"3496":0.16550588250932072,"3497":0.17968777904850913,"3498":0.12997708941012232,"3499":0.06691330176163744,"3500":0.08150222996551647,"3501":-0.012613875425618598,"3502":0.22342548777433402,"3503":0.05105296409850791,"3504":0.07974115176177848,"3505":0.18573732464643372,"3506":0.15316157461491473,"3507":0.053256802357416366,"3508":0.14832806364839024,"3509":0.06096754814959708,"3510":0.027455672432475816,"3511":0.012292852138637978,"3512":0.1481256488404083,"3513":0.0365534255711863,"3514":0.05513187488899476,"3515":0.14506393851493754,"3516":0.11993519527348055,"3517":0.03340542034143762,"3518":0.08934660557931691,"3519":0.1193445966550685,"3520":0.06417855310646382,"3521":0.058613605518963593,"3522":-0.27364690496708777,"3523":-0.0011840599836686653,"3524":0.08277549577994439,"3525":0.04229644440612276,"3526":0.04459830779457001,"3527":0.12416157393629283,"3528":0.11560896916634063,"3529":-0.04375546596399297,"3530":0.17870126717993107,"3531":0.1799178929911287,"3532":0.03824279410778137,"3533":0.11064297486282973,"3534":0.14396249473729236,"3535":0.16384394493467955,"3536":0.06690512702355282,"3537":0.3734416262057919,"3538":0.13147483148078645,"3539":0.1783640141009385,"3540":0.04002578588792385,"3541":0.13628650815402737,"3542":0.0794031253426371,"3543":0.10552766734486276,"3544":0.16728243187949957,"3545":0.021791315483069743,"3546":0.16695964082099596,"3547":0.15885513781582208,"3548":0.16697785796533998,"3549":0.05657586528597275,"3550":0.11424340265787754,"3551":0.1493880669610681,"3552":0.16094675976832853,"3553":0.036191943406002285,"3554":0.033707321533496294,"3555":0.10795165567829079,"3556":0.0924991104406569,"3557":0.0939456543529311,"3558":0.19170576949938992,"3559":0.21800787994706472,"3560":0.14984552747770774,"3561":0.09925002748043621,"3562":0.053391393250088424,"3563":0.142526453056837,"3564":0.011385173745139745,"3565":0.16916142842250692,"3566":-0.1631788188013881,"3567":-0.04034019946202699,"3568":-0.12645342238493737,"3569":-0.10639176470383409,"3570":-0.02453616360666814,"3571":-0.1123709567195735,"3572":-0.07710847387885683,"3573":-0.03193606120173902,"3574":-0.18879871172923973,"3575":-0.10397782948700415,"3576":-0.0965050129591425,"3577":-0.15092608922736742,"3578":-0.19036437980995818,"3579":-0.1378766842767648,"3580":-0.06831831695194553,"3581":-0.11630784826903609,"3582":0.024152413076730245,"3583":-0.12933174273980586,"3584":0.044228501902174575,"3585":-0.0452170750626864,"3586":-0.16564876138940204,"3587":-0.15130147907444783,"3588":-0.0724170299302117,"3589":-0.1272175598731799,"3590":-0.11667673422082035,"3591":0.018890898261043114,"3592":0.05951314226803168,"3593":-0.18176972976707445,"3594":-0.07501772220180687,"3595":-0.09769500928957148,"3596":-0.16509728303534751,"3597":-0.12245187320771403,"3598":-0.06615671894742349,"3599":-0.09856548591512432,"3600":-0.1355000513741139,"3601":-0.06952777278899702,"3602":0.05386422910263644,"3603":0.10448917996749428,"3604":-0.15081552581910973,"3605":-0.13286709347329423,"3606":-0.07543049155876157,"3607":-0.05544306807083473,"3608":-0.10527805616348672,"3609":-0.1094291998572597,"3610":0.030405849478363185,"3611":-0.17250260555636363,"3612":-0.18725485221021393,"3613":-0.11906495695894055,"3614":-0.12593118938009593,"3615":-0.13600144018266025,"3616":-0.16812119632384223,"3617":-0.0568465857583017,"3618":-0.4085697414696569,"3619":-0.10371922680746289,"3620":-0.1559221531105517,"3621":-0.10820269022547402,"3622":-0.16674814562577056,"3623":-0.11217352421174223,"3624":-0.14098111000463334,"3625":-0.15450346637454457,"3626":-0.04542378513612424,"3627":-0.16596759061382169,"3628":-0.17363831806825847,"3629":-0.1568567549755021,"3630":-0.06374895882572007,"3631":-0.08669666779196954,"3632":-0.16833473064980645,"3633":-0.15669571607268878,"3634":-0.05723978440250518,"3635":-0.038079663975217545,"3636":-0.07373831270927887,"3637":-0.003231864741432169,"3638":0.035743879282419455,"3639":-0.18740349260812483,"3640":-0.19641063864146122,"3641":-0.13060107082381198,"3642":-0.10905317240993022,"3643":-0.056246618531939935,"3644":-0.137706723820273,"3645":-0.8465361868228143,"3646":0.4635947533960573,"3647":-0.22106496057285688,"3648":-0.1211842497173611,"3649":-0.1721961108027039,"3650":-0.13246547636088526,"3651":0.1257446359848902,"3652":-0.42448768117382946,"3653":-0.40930267754306654,"3654":0.11136836794448551,"3655":0.4286343511764304,"3656":-0.714377507436506,"3657":-0.5857698456986679,"3658":0.34685741083299415,"3659":-0.7043406694723452,"3660":-0.09906299462180479,"3661":-0.2854259314245579,"3662":0.0712538145757524,"3663":0.31434726289729353,"3664":-0.13181391491434818,"3665":0.47518225671185055,"3666":-0.33197747661012406,"3667":0.008494886344659107,"3668":0.04094173424221439,"3669":-0.06539845893416386,"3670":-0.3691803896985533,"3671":-0.041830313387593035,"3672":0.7523457215474538,"3673":0.23274943633030673,"3674":-0.19048258129179485,"3675":0.3575620968325949,"3676":0.14324723928912408,"3677":-0.3560671127568539,"3678":-0.5098487204471212,"3679":-0.5973641100618986,"3680":-0.12184770449836572,"3681":-0.41350611336837034,"3682":-0.34222894482273986,"3683":0.25251105899892645,"3684":0.6096601282782103,"3685":0.2939376345664674,"3686":-0.03785155024283765,"3687":-0.08577132015970568,"3688":-0.47887336180748347,"3689":-0.23918046686647707,"3690":0.5677055841738116,"3691":-0.3723947162876763,"3692":-0.7190829905317803,"3693":-0.5951878717301412,"3694":-0.1461199329834863,"3695":0.20723889275658167,"3696":0.047267563519543504,"3697":-0.4606536109266897,"3698":-0.18900132157265828,"3699":-0.7170269304255497,"3700":0.5178758576280248,"3701":-0.002697667722110642,"3702":-0.31217799188319184,"3703":-0.3036109989842863,"3704":0.2786183033293069,"3705":-0.34070507943025563,"3706":-0.20331408828235875,"3707":-0.34694894601737836,"3708":0.2884605947703433,"3709":-1.209525300354195,"3710":0.1965815821061054,"3711":-0.6885282193877953,"3712":-0.3379178757173353,"3713":-0.10175591086256672,"3714":0.280049874320828,"3715":-0.06054935867062163,"3716":-0.27718775961050734,"3717":0.07886221414556838,"3718":-0.31166740245877167,"3719":-0.15326832383354244,"3720":-1.015064595888475,"3721":-0.5791667449801037,"3722":-0.4038016427409655,"3723":-0.1821120673388406,"3724":-0.3335969568626242,"3725":-0.589009544727412,"3726":0.06489322243933691,"3727":-0.2666481704477163,"3728":0.4391364209169058,"3729":-0.22902594761321857,"3730":-0.5329815914227294,"3731":-0.4708982026380143,"3732":-0.314089540167387,"3733":0.16541903672386393,"3734":0.2985378286874823,"3735":0.2700285109674203,"3736":-0.6328773687836717,"3737":0.4593957352619511,"3738":-0.24234068466828443,"3739":-0.03788858289774609,"3740":0.2592401519678142,"3741":0.09353753329247945,"3742":0.4183030133791979,"3743":0.1892815634930273,"3744":0.023289349245765898,"3745":-0.038508847638026006,"3746":0.32967670613443073,"3747":-0.26035555709876174,"3748":-0.4083903826881888,"3749":-0.46527995524546,"3750":0.26380761683134146,"3751":-0.36243709281091985,"3752":0.19314734923440668,"3753":-0.06591485743239622,"3754":0.04729226833095169,"3755":-1.5414630593106693,"3756":-1.7345659658498853,"3757":-1.788201450943498,"3758":-0.6306538747006301,"3759":0.05296636662837064,"3760":-0.23443732439053017,"3761":-0.40716186148010247,"3762":-0.0005286608100572612,"3763":1.036744016962461,"3764":0.31257518462206296,"3765":-0.07150614502544407,"3766":0.18772517007310444,"3767":-0.03954748345276638,"3768":0.200262362979155,"3769":-0.02931474336075906,"3770":0.004337861198534682,"3771":0.2886904661422835,"3772":0.07601759231045284,"3773":-0.7429236366030569,"3774":0.36807919522004795,"3775":0.4232825243571273,"3776":0.33623288538305884,"3777":0.3561826507436155,"3778":-0.3083872205015644,"3779":-0.49781145244591596,"3780":-0.48308677625790997,"3781":-0.19044417723236842,"3782":0.3798537492299658,"3783":0.10450387090229973,"3784":-0.23797365729698008,"3785":0.13849194734280879,"3786":-0.27276026841812206,"3787":0.3801416147501324,"3788":0.20785098019885787,"3789":-0.1230331068149593,"3790":0.01372852742209469,"3791":0.17326721373913792,"3792":0.003325176472656689,"3793":-0.2802143524525285,"3794":0.39971248092830697,"3795":0.15350147644092696,"3796":-0.0031128714881060913,"3797":-0.08441796709886971,"3798":-0.14434378292892844,"3799":-0.42946691065294296,"3800":-0.18875242999503636,"3801":-0.07672001734617362,"3802":-0.18048166804397356,"3803":-0.5525011361966106,"3804":-0.5413929846313648,"3805":-0.01323976888514119,"3806":-0.4453011906594828,"3807":-0.2752438257848544,"3808":0.3543885077297087,"3809":0.210937709819794,"3810":-0.09683620029120438,"3811":-0.4673164117537574,"3812":0.014483627061145367,"3813":-0.11970182296791497,"3814":-0.523301890769855,"3815":-0.1355523526710832,"3816":-0.19101003218610968,"3817":-0.06345461172700759,"3818":0.13177822331930908,"3819":0.32882445246753167,"3820":0.15108452315365264,"3821":0.3820811653667937,"3822":-0.040568116927785745,"3823":-0.38077709168385704,"3824":0.031267849567960006,"3825":-0.3442145785244294,"3826":-0.28908350734672594,"3827":0.05413545078037145,"3828":0.8193336102175031,"3829":0.5260307861087467,"3830":0.2621047751828002,"3831":0.5203882032331469,"3832":-0.2344571838756008,"3833":0.21331301579220366,"3834":-0.04435797494895053,"3835":0.6172007650338487,"3836":1.6370764314624198,"3837":1.8150694546943105,"3838":1.4853801761824834,"3839":-0.07128699669975039,"3840":0.02866862813554216,"3841":-0.3516893302104217,"3842":0.5119910626898135,"3843":-0.06799586833118082,"3844":0.21645880129681067,"3845":-0.051636456248798035,"3846":-0.2708472507705668,"3847":-0.27010026403895265,"3848":0.37881535570936714,"3849":-0.24287675157421773,"3850":-0.08442966283607431,"3851":0.1584829316802959,"3852":-0.05037439491417115,"3853":-0.15778753637968182,"3854":-0.631388167181927,"3855":0.6539988362327472,"3856":-0.22635501183309345,"3857":-0.4001333022618038,"3858":-0.08453086699292763,"3859":0.07442235957613864,"3860":-0.5884624811796173,"3861":0.12230547883664267,"3862":-0.04511882795303843,"3863":-0.10122127558126645,"3864":-0.1447227170966237,"3865":0.09621527428836159,"3866":-0.19758456338541475,"3867":0.15074914578464632,"3868":-0.10343355517078616,"3869":-0.07286738883728121,"3870":0.5121450032270499,"3871":0.5135688627609292,"3872":-0.46289302347931716,"3873":0.11929237398094977,"3874":-0.6353341516382892,"3875":-0.3906774287503039,"3876":-0.23046877666617369,"3877":-0.09281538264115763,"3878":-0.10305209624619789,"3879":0.1365686448640512,"3880":0.4268399065888857,"3881":-0.3013318565936882,"3882":0.09295076215051212,"3883":-0.22896515489935004,"3884":0.1024777766177998,"3885":0.06224367153937692,"3886":-0.0515619997164918,"3887":0.1956461857840341,"3888":0.03270649727121907,"3889":0.1376776002687824,"3890":-0.20964287256977895,"3891":-0.07440708794231378,"3892":-0.16607907501199806,"3893":-0.10725565022317567,"3894":-0.01356010913799533,"3895":-0.07030413527795489,"3896":-0.07170804002067789,"3897":-0.06150922158110608,"3898":-0.22878951414465085,"3899":-0.12442091563322934,"3900":-0.09840398659811948,"3901":-0.1582315971465378,"3902":-0.19218861762196152,"3903":-0.1207004899727339,"3904":-0.08274955929110073,"3905":-0.12103135020378004,"3906":-0.007293431641357878,"3907":-0.16931530816223148,"3908":0.030177473588589458,"3909":-0.08833572472896299,"3910":-0.1884095757352993,"3911":-0.15779060209381432,"3912":-0.05057473076535016,"3913":-0.16733821412390235,"3914":-0.09257508700648041,"3915":-0.008532178093866763,"3916":-0.017840972028290297,"3917":-0.19179550923722505,"3918":-0.09405250285513285,"3919":-0.0970916819964937,"3920":-0.17264605452535128,"3921":-0.12536932105835363,"3922":-0.07738780817325963,"3923":-0.08171459520704069,"3924":-0.14470508047530442,"3925":-0.08226267123532803,"3926":0.03507238494488541,"3927":0.19267176779810888,"3928":-0.09491980824697009,"3929":-0.12420414187081236,"3930":-0.07129321436743459,"3931":-0.07256102667119564,"3932":-0.10311315688375035,"3933":-0.12748404997324694,"3934":0.06288045775690575,"3935":-0.16341327707580164,"3936":-0.2099777293963806,"3937":-0.12886970613074222,"3938":-0.13002921391674618,"3939":-0.14123103657248473,"3940":-0.1647904082035528,"3941":-0.08293107804807832,"3942":-0.4465608578697615,"3943":-0.11029216758030114,"3944":-0.17879937044101502,"3945":-0.09627226845208811,"3946":-0.17710226451878822,"3947":-0.13098932642754896,"3948":-0.13803149572932266,"3949":-0.16433617014125007,"3950":-0.04757574039384629,"3951":-0.16874875056757463,"3952":-0.1547380979724028,"3953":-0.14398701421064353,"3954":-0.09211704001823517,"3955":-0.0978229868862424,"3956":-0.16791044793908333,"3957":-0.19318271834969286,"3958":-0.0545161818736132,"3959":-0.06098842883131559,"3960":-0.12200220112545176,"3961":-0.03185896019353381,"3962":-0.011183601969728868,"3963":-0.19269891706413747,"3964":-0.2287579279327029,"3965":-0.16329862023525793,"3966":-0.10205459417286968,"3967":-0.07398793259630052,"3968":-0.1232416477109494,"3969":-0.08932464837862839,"3970":-0.16609353402191884,"3971":0.14191402372847817,"3972":0.020523996265329903,"3973":0.11808547485402293,"3974":0.0856446436051251,"3975":0.027263900590667196,"3976":0.0908470487310446,"3977":0.056901330498997545,"3978":0.018675922176191375,"3979":0.13060214524127747,"3980":0.0685095831166271,"3981":0.1487013996173538,"3982":0.15450545556475945,"3983":0.21428079292848973,"3984":0.14866374890623363,"3985":0.07363328267680971,"3986":0.1255971290865402,"3987":-0.10361641503581882,"3988":0.1762307985730259,"3989":-0.10442803987277034,"3990":0.041483076785494274,"3991":0.17155475213208748,"3992":0.18210207094169056,"3993":0.08736717033813467,"3994":0.12101226405509,"3995":0.08991379069951216,"3996":0.00015064289350221111,"3997":-0.09141591951538407,"3998":0.08368187043845939,"3999":0.05642291577021679,"4000":0.08262821653175291,"4001":0.15146584420308976,"4002":0.11871239036377466,"4003":0.04505745360471919,"4004":0.09240533766743683,"4005":0.09917803285645745,"4006":0.07141147985014,"4007":0.018350913009443547,"4008":-0.1225680274553472,"4009":0.12450306640068044,"4010":0.1254492682968708,"4011":0.0816774266426138,"4012":0.025647025299925352,"4013":0.10178831928132498,"4014":0.12227980054563066,"4015":-0.05113791226916818,"4016":0.1342577976637799,"4017":0.2027850759719656,"4018":0.100919435492776,"4019":0.16350806360333547,"4020":0.16508686886784793,"4021":0.16209688439039036,"4022":0.06276522842207785,"4023":0.31477381468675225,"4024":0.1609150189661705,"4025":0.18238274204817304,"4026":0.06988521762606548,"4027":0.18022668283811147,"4028":0.12193113444085657,"4029":0.1402618753176991,"4030":0.1468735824314017,"4031":0.024420050777508633,"4032":0.09310472369744797,"4033":0.06986007985306673,"4034":0.20532852555009426,"4035":0.03260832181712822,"4036":0.07772377778766135,"4037":0.15557120352986956,"4038":0.14474086481501205,"4039":0.0462626761359664,"4040":0.028080148415219358,"4041":0.0620671979716336,"4042":-0.04285878995420176,"4043":-0.06369953170767442,"4044":0.19983292937617583,"4045":0.22963549610214135,"4046":0.18739147931589065,"4047":0.12856965045162175,"4048":0.05115965075072657,"4049":0.13184300874931107,"4050":-0.06055928378751509,"4051":0.026994928777845695,"4052":-0.21127836635833197,"4053":-0.09263823726441218,"4054":-0.14646421291509418,"4055":-0.021570148638005895,"4056":0.024594691110606737,"4057":-0.07815906456222761,"4058":-0.043076757500944474,"4059":-0.11613265721652766,"4060":-0.18118876857530894,"4061":-0.06563795553299763,"4062":-0.05076563972447175,"4063":-0.11579440131046469,"4064":-0.1378451662651975,"4065":-0.11295570952459566,"4066":-0.07528317627754222,"4067":-0.09964172182660269,"4068":-0.07097611032877706,"4069":-0.1606819141885783,"4070":-0.0598184878244845,"4071":-0.07650409339157992,"4072":-0.11774866773354846,"4073":-0.10625715419075159,"4074":-0.06435462589366807,"4075":-0.11461647070743719,"4076":-0.06362961382069267,"4077":-0.12371742007913433,"4078":-0.051623869571263956,"4079":-0.15317753079824925,"4080":-0.03646816503683035,"4081":-0.07848187075833253,"4082":-0.11559987897870004,"4083":-0.08717753681864614,"4084":-0.021095818675741895,"4085":-0.08134564218609823,"4086":-0.13377283769425447,"4087":-0.08778347187014829,"4088":-0.051778412650360636,"4089":0.17199885253594066,"4090":-0.03755828516232817,"4091":-0.07563937431330806,"4092":-0.022732312286004072,"4093":-0.037725679851176495,"4094":-0.050108556518897646,"4095":-0.10442627910002535,"4096":-0.0566339424049359,"4097":-0.1745706440416937,"4098":-0.12089280978209549,"4099":-0.06251636012978312,"4100":-0.12503172676979185,"4101":-0.10583347533786776,"4102":-0.14341167073436106,"4103":-0.07368680488443201,"4104":-0.4209514317020361,"4105":-0.09811861205972662,"4106":-0.156547845212084,"4107":-0.056384929062957515,"4108":-0.13173019235078862,"4109":-0.06957487068759574,"4110":-0.12068727189503284,"4111":-0.1774336799075685,"4112":-0.01980308517562708,"4113":-0.1995160189605555,"4114":-0.16896601245019763,"4115":-0.11333589148771006,"4116":-0.03219928531478043,"4117":-0.04870739344216574,"4118":-0.12416797839680759,"4119":-0.17841881916655908,"4120":-0.047994248688297485,"4121":-0.04729093359476964,"4122":-0.19732480050472684,"4123":-0.10352914000002308,"4124":-0.046695040501699106,"4125":-0.1601594877140397,"4126":-0.17172132319146854,"4127":-0.11481537013892146,"4128":-0.08403091338413222,"4129":-0.03584139692897152,"4130":-0.11840753778786169,"4131":0.4358739175457428,"4132":0.2266057315080382,"4133":0.2922055854649894,"4134":-0.03519433598969941,"4135":0.03581286882194894,"4136":-0.2264023718338761,"4137":-0.3002018508040735,"4138":0.07718155159526778,"4139":-0.30689974182915125,"4140":-0.022367036745878078,"4141":0.0779439459126482,"4142":0.1646865839408174,"4143":0.5230622717137329,"4144":0.06434235806038167,"4145":0.6041301098718614,"4146":-0.10968421302654496,"4147":-0.0015341350596356027,"4148":-0.04418796581750221,"4149":0.20180331928585793,"4150":-0.3883768352787741,"4151":-0.5960968800588731,"4152":-0.4852735122510084,"4153":-0.04932388786268916,"4154":-0.09673402476509715,"4155":-0.5187020502125476,"4156":-0.08800289533482432,"4157":-0.19051033533683326,"4158":0.3756597359563981,"4159":0.12554446859336726,"4160":0.12147854265538405,"4161":-0.6976822153159051,"4162":0.5132161783745524,"4163":-0.05290648793328267,"4164":-0.5733697662781646,"4165":0.0024805132737818376,"4166":0.13217888225858143,"4167":0.12838304439438447,"4168":0.21128559626613663,"4169":-0.15083720859839117,"4170":0.3356722451300562,"4171":0.46920397405057634,"4172":0.5109101579826948,"4173":0.23533852199084263,"4174":-0.09917747196604294,"4175":0.6181148814911785,"4176":0.24128050068379392,"4177":-0.04499313345383573,"4178":1.0370616732040276,"4179":1.4708394526145452,"4180":0.5083602894988342,"4181":0.14801292920247752,"4182":-0.08815170436372842,"4183":0.3812698029472933,"4184":0.3898554454684099,"4185":0.265720969058798,"4186":-0.15650551247665362,"4187":0.05417458693972946,"4188":-0.2624750683271408,"4189":0.4317868243044104,"4190":0.2551385648280866,"4191":0.08789301764361371,"4192":0.16862650881209593,"4193":-0.2628086249545506,"4194":-0.2673930631155482,"4195":-0.06215627968119117,"4196":0.1384444333078909,"4197":-0.3926379080993207,"4198":-0.02643658627228156,"4199":0.016222657606962777,"4200":0.14361667735585432,"4201":0.003929624718437132,"4202":0.379455070560146,"4203":-0.0008688654134180566,"4204":0.03840407877919046,"4205":0.4679768100009444,"4206":-0.35037097544084506,"4207":0.07653673426786915,"4208":-0.5176742075793381,"4209":-0.12822591479823509,"4210":-0.19104421231769228,"4211":0.14442015733074526,"4212":-0.04276858885429556,"4213":-0.40832401463120177,"4214":0.21334599336777627,"4215":0.1854375528131985,"4216":0.2907916442556269,"4217":-0.221995283217669,"4218":-0.02781375531036976,"4219":0.08287525339806151,"4220":-0.5173872093741898,"4221":-0.11244023347271828,"4222":-0.025786066684772648,"4223":-0.11167652265626318,"4224":-0.5099386379379857,"4225":-0.019035657316172388,"4226":-0.25979511394460436,"4227":-0.017491440813181602,"4228":0.2866344171828746,"4229":0.6780683390196193,"4230":0.11977959434382081,"4231":-0.24021055795784102,"4232":-0.1825553414530716,"4233":-0.31465293602915334,"4234":-0.18327292008186877,"4235":-0.15361224755838876,"4236":0.10023013995178301,"4237":0.4021523686439648,"4238":-0.04856437089463194,"4239":0.10481241273988674,"4240":-0.16405431471409995,"4241":0.8454049186014341,"4242":1.676703097977865,"4243":2.5562324639284375,"4244":1.4585759578062265,"4245":1.06431731797673,"4246":0.994074782045852,"4247":0.6020331461589422,"4248":0.1441257271263858,"4249":-0.010652981856811882,"4250":-0.21589500785254623,"4251":-0.24265614183219905,"4252":0.5529408824219814,"4253":0.11366226889904271,"4254":0.4279848456530901,"4255":0.47359657598179405,"4256":0.3809434453586819,"4257":-0.3760760586948269,"4258":-0.11793416134705256,"4259":0.15093088652844042,"4260":-0.09676085635842908,"4261":-0.2647763307425994,"4262":-0.3709836735832128,"4263":-0.18448159855301333,"4264":-0.05215998734838007,"4265":0.6547461963053361,"4266":-0.4853776974017997,"4267":-0.12734869267921528,"4268":0.36170495899263155,"4269":0.18018026103696794,"4270":0.05593560733706641,"4271":0.39803884562871406,"4272":-0.05628086703872103,"4273":-0.18851433339231255,"4274":0.20750190169365867,"4275":0.011112990693458745,"4276":0.3729324776504994,"4277":0.08881857341430342,"4278":0.2553542427882561,"4279":-0.3590420120222639,"4280":0.35077226076053664,"4281":0.08108044401916689,"4282":0.060030859399607485,"4283":-0.11099562166260371,"4284":-0.0986583678691029,"4285":-0.35937735523108677,"4286":0.0010797897104552303,"4287":-0.058286530068977015,"4288":-0.03562345460061327,"4289":-0.3713039520320219,"4290":-0.07032720248607763,"4291":-0.390206303976131,"4292":0.23367051560009652,"4293":0.03892419425247425,"4294":-0.1319582476839041,"4295":0.1667755686034714,"4296":0.029298875130616565,"4297":0.1342216096027341,"4298":0.09057784717286181,"4299":0.023138384167597715,"4300":0.08063566846028639,"4301":0.04968044288611625,"4302":0.058033351348787836,"4303":0.22504972345587856,"4304":0.09654957983985137,"4305":0.08108829370557699,"4306":0.16166317839339855,"4307":0.20422445050400168,"4308":0.12120611275024915,"4309":0.07304928509854058,"4310":0.13002635908817592,"4311":0.013514149305684882,"4312":0.14204839037341147,"4313":0.005352495662835536,"4314":0.043585537157571935,"4315":0.16651923226503348,"4316":0.15908906019126554,"4317":0.058441807809849186,"4318":0.14912640935053842,"4319":0.11279119701848438,"4320":0.021602969316166495,"4321":-0.0032546467930484194,"4322":0.214152347613552,"4323":0.08863538672243773,"4324":0.06333163306414061,"4325":0.16876467760663078,"4326":0.12774139942035245,"4327":0.0874356730548231,"4328":0.08286337871644396,"4329":0.13071428676543898,"4330":0.06366741589851793,"4331":-0.02444609601925454,"4332":-0.16581630597190541,"4333":0.11509099212867388,"4334":0.10954478480380432,"4335":0.06744305305742336,"4336":0.07129610025920831,"4337":0.12600850852454076,"4338":0.09187406931184014,"4339":-0.031875763639460625,"4340":0.16031382286915738,"4341":0.18145443539917747,"4342":0.11031358969728074,"4343":0.13352006317313103,"4344":0.14413828386943572,"4345":0.17666163944160698,"4346":0.06667282416460425,"4347":0.44737268709273464,"4348":0.08205442554311732,"4349":0.19429541064484915,"4350":0.060541604957275376,"4351":0.1465846467730179,"4352":0.12382133998048776,"4353":0.12220474762697733,"4354":0.13410721511055415,"4355":0.0730173317565027,"4356":0.1685781401260971,"4357":0.17176960990155982,"4358":0.15373338658255933,"4359":0.06611624217877589,"4360":0.07429250567333667,"4361":0.15845508682449583,"4362":0.18045674985228713,"4363":0.06444443732834992,"4364":0.07370157843320688,"4365":0.11888349912057197,"4366":0.0399494854499488,"4367":0.010901730052474025,"4368":0.19358311202334189,"4369":0.2177138068302235,"4370":0.14115240094913792,"4371":0.09267251639799393,"4372":0.038814914453951035,"4373":0.15485202561483782,"4374":-0.27987317738383083,"4375":0.13574003352950337,"4376":0.0948113204796413,"4377":-0.20187777238500143,"4378":-0.01388605681052568,"4379":-0.24181517689185153,"4380":0.21702101262154866,"4381":0.23552751572160047,"4382":-0.010298078358619341,"4383":-0.11894185053525279,"4384":-0.41443300689608503,"4385":-0.29431600869569774,"4386":0.07084720931276246,"4387":-0.15595444297865185,"4388":-0.009895248311946134,"4389":0.18313691312152003,"4390":-0.11925720161237113,"4391":-0.1477037163312424,"4392":0.2819039531358747,"4393":-0.1409457614280186,"4394":0.11549228186864648,"4395":0.11949923477483057,"4396":-0.30195261055505024,"4397":-0.04326438921983144,"4398":-0.02485186042647959,"4399":0.09375326286802217,"4400":-0.2598499682366751,"4401":-0.08161976265517536,"4402":0.13602737789375668,"4403":0.07928316633535082,"4404":1.7386200429549648,"4405":0.3321086328542721,"4406":-0.11582146249025496,"4407":-0.1647635823343103,"4408":-0.4450619488641803,"4409":0.11144025834093221,"4410":-0.09187745160002622,"4411":0.424441115490312,"4412":-0.13915010480165924,"4413":7.037187742339589,"4414":2.787399552191092,"4415":0.03174881967128306,"4416":0.016639092615339093,"4417":-0.07229489584665313,"4418":0.010167320908343106,"4419":-0.11326210361617846,"4420":0.30007642641781573,"4421":-0.5420535889561248,"4422":1.1422191615583865,"4423":0.1428636377264904,"4424":0.35772767128723065,"4425":-0.5885895281949354,"4426":0.08832171842691235,"4427":-0.25080276971121573,"4428":0.05793908953112732,"4429":0.011461395337094163,"4430":-0.26839358156181653,"4431":0.46561908283320097,"4432":0.08463185856895854,"4433":0.15650222758375737,"4434":-0.2251684954026183,"4435":-0.11253280051807313,"4436":-0.14418012522351736,"4437":0.006274582195655052,"4438":-0.23244647379327338,"4439":0.21021982870205969,"4440":0.07117229370031676,"4441":-0.402617346909428,"4442":-0.021025570152970605,"4443":0.12863749412315476,"4444":-0.323823743231603,"4445":-0.0024639744072140627,"4446":-0.05953569962560977,"4447":-0.18829731211104875,"4448":-0.17801824812294118,"4449":0.2973325987967595,"4450":-0.03633717756638982,"4451":0.2832940151493355,"4452":0.02596934354870769,"4453":0.22854761036365365,"4454":0.20471482007563482,"4455":0.08824185651123893,"4456":-0.0001226753429185389,"4457":0.19715178640686246,"4458":0.053914834628987,"4459":0.15201255165723335,"4460":0.013782644854655583,"4461":-0.011212974239856498,"4462":0.060204494444599,"4463":0.003451842502180079,"4464":0.14677142167367513,"4465":0.23653907634385649,"4466":0.06407867727841482,"4467":0.03351131606345851,"4468":0.15648831929201373,"4469":0.19221629715460675,"4470":0.1414489422291114,"4471":0.06344963995218779,"4472":0.07749696980490167,"4473":0.04844637907090303,"4474":0.23689348999971213,"4475":0.09627474460065912,"4476":0.08290920894374694,"4477":0.1442778843175881,"4478":0.12372264200490342,"4479":0.05124068545607345,"4480":0.14287342856251478,"4481":0.046835048625383416,"4482":0.0700598333542757,"4483":0.1025236944781279,"4484":0.193164109623026,"4485":0.05885487424900764,"4486":0.06724069054739029,"4487":0.13589827218435976,"4488":0.12208762806924292,"4489":0.032723839814708854,"4490":0.10933569632472029,"4491":0.16274649612137473,"4492":0.09359858694196305,"4493":0.11734881822410599,"4494":-0.29384540697863637,"4495":-0.011539761484668455,"4496":0.0639941355661134,"4497":0.0522838346260896,"4498":0.03789104693842712,"4499":0.10678376390413384,"4500":0.13549055835876023,"4501":-0.008700971877587983,"4502":0.20300198180704282,"4503":0.15220309868850193,"4504":0.03874652909516311,"4505":0.1225055178795275,"4506":0.12983738343678822,"4507":0.20246671185453086,"4508":0.057827489675323966,"4509":0.40611399987077296,"4510":0.10734025897691268,"4511":0.20279857976352864,"4512":0.0253904294637899,"4513":0.1256051893835813,"4514":0.08997037812595635,"4515":0.10485285217109695,"4516":0.12635689780999484,"4517":0.04764189447799039,"4518":0.16874127079910056,"4519":0.20975843767041222,"4520":0.1657788741281418,"4521":0.044837842834382476,"4522":0.06679013454638943,"4523":0.1482085107009473,"4524":0.1393559042039747,"4525":0.05746558423274802,"4526":0.030703630042755902,"4527":0.1793801617143392,"4528":0.1463689338304854,"4529":0.1420735242800749,"4530":0.19852271805889488,"4531":0.20295797811369753,"4532":0.13478335148277293,"4533":0.12304116200387014,"4534":0.03223345063289167,"4535":0.13749698502910082,"4536":-0.07130448855284256,"4537":-0.3853582249246698,"4538":0.2635952683327159,"4539":0.03013708123154034,"4540":0.21773630776714611,"4541":-0.1123217361076014,"4542":-0.03920561324286664,"4543":0.5314486393375737,"4544":0.14129536924626016,"4545":-0.4265781525407005,"4546":-0.14934513288141937,"4547":0.07877773369490125,"4548":0.2524551189715398,"4549":0.19718068031835562,"4550":0.3067892609639548,"4551":0.39223887162265186,"4552":-0.4222220816822086,"4553":-0.11044678758546762,"4554":-0.09284393256776412,"4555":0.04366028874423571,"4556":0.04266943058760393,"4557":0.43570900265306634,"4558":0.045286165969213595,"4559":0.38297893393019955,"4560":0.11645297566316518,"4561":-0.019576923909710064,"4562":-0.4217755734839269,"4563":0.28563593746722576,"4564":-0.2126760484939952,"4565":-0.2676077767012476,"4566":-0.4439692478019203,"4567":0.27508048830351767,"4568":0.27766491458517034,"4569":-0.3954324548342237,"4570":-0.31562464779978233,"4571":0.21896517512993133,"4572":-0.15887827929473264,"4573":-0.6203491452289457,"4574":-0.297892035506061,"4575":-0.3805792265985219,"4576":-0.09881951750351098,"4577":0.10089069572645082,"4578":0.13813928112966017,"4579":-0.2103342681012884,"4580":-0.12416293615646953,"4581":0.05587356957425054,"4582":0.39706546838533086,"4583":-1.4359972371227905,"4584":-0.9478590031658223,"4585":-0.4737275115578857,"4586":-0.1887000341005762,"4587":0.7612439039610877,"4588":-0.17182921863463124,"4589":0.23679078791320937,"4590":0.4553663862478508,"4591":0.38438899132907123,"4592":-0.5394441848358534,"4593":-0.3917385925406646,"4594":-0.049513040322540745,"4595":0.16431993577751605,"4596":-0.11950745706989127,"4597":0.6757495761894591,"4598":-0.06009768150087296,"4599":0.32617607961935174,"4600":0.48462440006184243,"4601":0.14176507942740102,"4602":-0.32853866065559684,"4603":-0.04243576956698465,"4604":0.3852583524221058,"4605":-0.26486014571602423,"4606":-0.44561999968838145,"4607":0.34469367401425566,"4608":0.1287196562891079,"4609":0.22430793392441936,"4610":0.1928807961513332,"4611":-0.3526209698708716,"4612":0.1823963316282385,"4613":-0.00023600652802246668,"4614":0.04359195371777964,"4615":-0.001830971002484279,"4616":0.08951294483290112,"4617":-0.14265282314589228,"4618":-0.39109044625571343,"4619":-0.15200168945195233,"4620":0.7650146586800606,"4621":-0.06757891301587857,"4622":-0.2913659377648541,"4623":-0.30196526867707696,"4624":0.13832092064373855,"4625":0.2857535163256509,"4626":-0.18034814183799264,"4627":-0.007219422309253445,"4628":-0.04737392030982252,"4629":-0.35688626829119535,"4630":-0.3903608498963121,"4631":-0.016149357724936253,"4632":-0.27898020570140997,"4633":-0.16830517737751188,"4634":-0.1303287243223886,"4635":0.45343246541506715,"4636":-0.22527634443714392,"4637":0.5621170842718808,"4638":0.8799227202460552,"4639":-0.09585482244967132,"4640":0.2108218596619416,"4641":0.19353872467791342,"4642":0.34797970961102764,"4643":-0.4624929630700091,"4644":-0.10387522321402673,"4645":0.030287462075750674,"4646":0.6874445806562768,"4647":0.22005235413443658,"4648":0.07523440752350781,"4649":0.14551984352924502,"4650":-0.20156425848114712,"4651":0.13806879786939777,"4652":-0.03324079435040064,"4653":-0.1613695314735061,"4654":-2.102216110114815,"4655":-0.9737325037731757,"4656":-0.1545360982532477,"4657":0.2760031933188004,"4658":0.14646487117602158,"4659":0.42202031981705285,"4660":0.2342202197781602,"4661":0.2609440800904252,"4662":-0.21089627451271292,"4663":-0.045636300138436975,"4664":0.5516095319187208,"4665":0.5216262519250999,"4666":0.9873436906504195,"4667":0.35906720825637967,"4668":-0.013099056916866162,"4669":-0.09201124372078232,"4670":-0.056495564976499824,"4671":0.48236140757430046,"4672":0.25249439182134586,"4673":-0.023306741790426265,"4674":-0.02575854602709812,"4675":0.19687744112412217,"4676":0.28331840397449237,"4677":0.40105897809552077,"4678":-0.15642760497305047,"4679":0.2014562702292978,"4680":-0.13146721973190448,"4681":0.1027666292814722,"4682":-0.09987028216145906,"4683":-0.15738668474803333,"4684":-0.08570395581850276,"4685":0.3401348464660685,"4686":-0.04574880411324878,"4687":-0.8920598786124121,"4688":-0.21194772178800073,"4689":0.45347864576187624,"4690":0.11741676264554411,"4691":0.2916295045842456,"4692":-0.1724171407636153,"4693":-0.03380268389284557,"4694":0.230436466433457,"4695":0.033666165098445125,"4696":-0.12205596495076937,"4697":0.9596727711932662,"4698":-0.09268954550582319,"4699":-0.09374524277908478,"4700":-0.07991226019233282,"4701":-0.07066466144569125,"4702":-0.20631544371500196,"4703":0.10877976987602399,"4704":0.1084440970707452,"4705":0.21489984877675225,"4706":-0.2926239982093425,"4707":0.15789111426660335,"4708":-0.1395258485186651,"4709":-0.24644822017499624,"4710":-0.20087692442715302,"4711":-0.02066220083262495,"4712":0.04959296595258083,"4713":-0.13102165030642637,"4714":-0.16201439590753278,"4715":0.08095320400811438,"4716":0.24595188800608592,"4717":-0.10253840377911465,"4718":0.4033508604228183,"4719":-0.6668740816214844,"4720":-0.20901937339837784,"4721":-0.003314287828458715,"4722":-0.011119260908473642,"4723":0.4504045976879734,"4724":0.29983920089777616,"4725":-0.02242881433567981,"4726":-0.004874405988826748,"4727":-0.5897084069632419,"4728":-0.21900918136803468,"4729":-0.2504479176998981,"4730":-0.2225205863753107,"4731":0.3572524927985459,"4732":-0.21428537496834923,"4733":-0.07854601147125397,"4734":0.019932151308251298,"4735":0.5531814778943245,"4736":0.5935831627456895,"4737":-0.36727402727095704,"4738":-0.1259556572246123,"4739":-0.16855450229577063,"4740":-0.12366063674403892,"4741":-0.23034630866983322,"4742":-0.26305285084228847,"4743":0.13307146171736176,"4744":0.5556846985479811,"4745":-0.6841474671559892,"4746":-1.6662607279985333,"4747":-1.796311397940097,"4748":-0.5510739338023547,"4749":-0.0531509078385356,"4750":-0.08984203181035086,"4751":-0.1744904042685649,"4752":-0.18744223229889553,"4753":-0.19355776502570712,"4754":0.08771310048237152,"4755":0.02026212508514394,"4756":-0.5747620434488784,"4757":-0.13783619667926278,"4758":-0.011711945175789338,"4759":0.047165189397190575,"4760":-0.047184487536462,"4761":-0.3355528881157644,"4762":0.17337316988675386,"4763":0.08300610713049097,"4764":0.09027695244259977,"4765":-0.2623728225835121,"4766":-0.0616701522794288,"4767":0.19144117824752044,"4768":0.1920151843627966,"4769":-0.5604419751796857,"4770":0.16666598483916722,"4771":0.38071885742890654,"4772":0.23928003181848495,"4773":-0.05375190686702669,"4774":0.3383994107603899,"4775":0.3616108552227492,"4776":-0.02694198197544055,"4777":-0.169583523529273,"4778":0.00822218819012712,"4779":-0.13807084635195857,"4780":0.11553492227276571,"4781":-0.06524962167208719,"4782":-0.13823115618439522,"4783":-0.036587265219319855,"4784":-0.13574727258913769,"4785":0.08645703379310743,"4786":0.3446172278691166,"4787":0.036314242076207336,"4788":-0.3646320120248911,"4789":0.009397549986037116,"4790":-0.04313364383564645,"4791":-0.31360841066857964,"4792":-0.22451916363147675,"4793":-0.19115819780424173,"4794":-0.1721799673484074,"4795":-0.23685348272567225,"4796":0.013237458795764774,"4797":-0.1330872681165585,"4798":-0.2325873235290248,"4799":-0.05678627442436128,"4800":-0.3298767441381646,"4801":0.05822739801246068,"4802":-0.10902748464824985,"4803":0.0548358395169088,"4804":0.05154946857429044,"4805":-0.11481734265033063,"4806":0.33297366853705684,"4807":-0.5616109129230362,"4808":-0.20156407578795058,"4809":-0.42045827344279163,"4810":-0.14970070682432324,"4811":0.13184705281475903,"4812":0.12129076740235452,"4813":0.027787449596287848,"4814":0.12320976563586675,"4815":0.039064303713525976,"4816":-0.05523536342429523,"4817":-0.0074221533539599255,"4818":-0.3466641375197123,"4819":-0.3403393512960162,"4820":-0.016555878070902783,"4821":0.14930720096314037,"4822":0.09343804618916977,"4823":0.005266255605632023,"4824":0.18998480793689804,"4825":-0.041388461310655274,"4826":-0.8068984515732173,"4827":-1.0477787995401353,"4828":-0.6086459535915889,"4829":-0.6554618232744018,"4830":-0.02465559775153007,"4831":0.020411350092659937,"4832":0.3075028496991757,"4833":-0.07824696942321742,"4834":-0.2926715111250451,"4835":-0.03647478422333845,"4836":-0.2887950207221876,"4837":-0.27193748758181224,"4838":0.02814489055264881,"4839":0.10125978105738577,"4840":-0.1357820503686876,"4841":0.19783777109962383,"4842":0.018753861414518846,"4843":-0.2750712002764873,"4844":-0.1776364507203276,"4845":-0.3888256230636239,"4846":0.24503951956512002,"4847":0.01242058739599122,"4848":0.34840729223600875,"4849":-0.04592295753872893,"4850":0.29861695224506,"4851":-0.15233634847458288,"4852":-0.007364607865765751,"4853":0.35186244432367686,"4854":-0.17641954854151037,"4855":0.36722346458690885,"4856":0.13184662548323134,"4857":0.04006330667384689,"4858":0.05678807433548782,"4859":0.321022407272999,"4860":0.029431901292671835,"4861":-0.016849414872142043,"4862":0.23911545245915744,"4863":0.06402722660525972,"4864":0.15580015299757677,"4865":-0.0016937124238437756,"4866":0.004387356772106475,"4867":0.061058579212843765,"4868":0.017834436857745637,"4869":0.08546673310016217,"4870":0.18490842647982939,"4871":0.06806774971808208,"4872":0.06601866570156513,"4873":0.13622837198340754,"4874":0.15164511690283713,"4875":0.1231954821969727,"4876":0.08409284932784705,"4877":0.10860894166418489,"4878":0.01262248039522223,"4879":0.21182856421624546,"4880":0.07541523515195295,"4881":0.1100836270794593,"4882":0.16264756166150748,"4883":0.139990828764548,"4884":0.029658347172727605,"4885":0.132715088079336,"4886":0.040930758837621976,"4887":0.11153139015664032,"4888":0.05291276911858289,"4889":0.11238621037248248,"4890":0.02909242345228458,"4891":0.06298428295799613,"4892":0.13112113521999558,"4893":0.08451528149701344,"4894":0.01643564426754938,"4895":0.0669680105970236,"4896":0.10633184678458836,"4897":0.09660754406616359,"4898":0.10054684236004023,"4899":-0.3348831145859771,"4900":-0.023163904628546478,"4901":0.03987981830190616,"4902":0.029182667109623115,"4903":0.0048632100842329745,"4904":0.10174211253435733,"4905":0.1320148392461771,"4906":0.013147625410228802,"4907":0.14389079705734806,"4908":0.12034323719432793,"4909":0.03455559242243634,"4910":0.12633838736432604,"4911":0.15204607891905053,"4912":0.16773669592472001,"4913":0.05917967556368273,"4914":0.3758862829734262,"4915":0.08967203388820805,"4916":0.16102491014433576,"4917":0.03135924339488593,"4918":0.15919712574723296,"4919":0.06934326362827987,"4920":0.08347393501895137,"4921":0.15039254490755327,"4922":0.03741236903653677,"4923":0.16580405950859692,"4924":0.15814526873077392,"4925":0.16518742442372544,"4926":0.030307695546116484,"4927":0.06743711461604357,"4928":0.1440407318675718,"4929":0.14182415269695503,"4930":0.018226162041119084,"4931":0.030079947937647688,"4932":0.19464461803582567,"4933":0.10361666027401034,"4934":0.09714181297480881,"4935":0.20476233750588027,"4936":0.2125461366346025,"4937":0.1232445823381951,"4938":0.1008299005951536,"4939":0.05481848804634202,"4940":0.12532889445535822,"4941":-0.2365804122369328,"4942":0.032397276546045774,"4943":-0.059585354736992745,"4944":-0.33190799534166204,"4945":-0.24642713412286069,"4946":0.6796652688543109,"4947":-0.3373858583638245,"4948":0.25758283653799724,"4949":0.3451638644760936,"4950":0.18507366945545,"4951":-0.2776306592855467,"4952":-0.17448557858423977,"4953":0.3865932305657573,"4954":-0.08944420399268153,"4955":0.09697972796118393,"4956":-0.17541520501795974,"4957":-0.02466981848581843,"4958":0.11168891276320875,"4959":0.27985954485802694,"4960":-0.1160655513021462,"4961":-0.3371100298727764,"4962":-0.475902419479675,"4963":-0.22690105234635205,"4964":0.6736377884519804,"4965":-0.23321302005875894,"4966":0.40122850584619496,"4967":0.24790194293225296,"4968":-0.2793670179069379,"4969":-0.24742890413343185,"4970":-0.0013141461407475672,"4971":0.4145632492400301,"4972":0.5415493753525962,"4973":0.5433132202058227,"4974":0.10305319797321404,"4975":0.08969631791328662,"4976":-0.397435126223264,"4977":-0.19658079654728047,"4978":-0.40396771646467383,"4979":0.01278725586387146,"4980":-1.2932717457666012,"4981":-2.285022777008033,"4982":-3.0837990584799226,"4983":-2.8354045484914523,"4984":-1.3983560926725198,"4985":-0.6607830621696462,"4986":-0.13294937377804014,"4987":-0.2082936474754291,"4988":-0.08597738132060606,"4989":0.4703700765309137,"4990":0.1944925155118686,"4991":0.06835865327681119,"4992":0.29167410572969826,"4993":0.3668885291642114,"4994":0.026263638686837204,"4995":-0.25118556366479333,"4996":0.3982321403148615,"4997":0.06762394896944753,"4998":-0.01707969446469609,"4999":-0.13754219622161631,"5000":-0.4600894708017716,"5001":-0.07459521380854134,"5002":-0.10031330702497393,"5003":-0.47060854314874123,"5004":-0.27881414380795966,"5005":-0.4523980623021099,"5006":-0.28513315477148254,"5007":-0.43421922349519754,"5008":-0.35046403244094293,"5009":0.3145208447748976,"5010":-0.09808506443451144,"5011":-0.3585459399835835,"5012":0.5849791718348575,"5013":1.380308982039314,"5014":0.7008304652050035,"5015":0.6394368597710115,"5016":-0.2133652061634296,"5017":0.45989026266508215,"5018":-0.37562127252749783,"5019":0.013667008410710942,"5020":-0.0010960375782166675,"5021":0.3233223708922506,"5022":1.1539596974005566,"5023":0.3397227326149392,"5024":-0.28906377086597307,"5025":0.09669277799008855,"5026":-0.2825430231491906,"5027":0.21819506380539577,"5028":0.2787213000253869,"5029":-0.4566637739205175,"5030":-0.5363310994829321,"5031":0.22666133119921456,"5032":0.22324410181946755,"5033":0.3763531547556115,"5034":0.5350530140776955,"5035":0.515954422643744,"5036":-0.18038836310128958,"5037":0.2665508897525811,"5038":-0.9222344164734781,"5039":-0.1862633418548014,"5040":-0.5962076258264981,"5041":-0.06410493435482267,"5042":0.649401981301226,"5043":0.9484395045995522,"5044":1.064265368882325,"5045":0.22146668413170553,"5046":0.07884872997223139,"5047":0.018456782153016577,"5048":-0.3690744514555635,"5049":-0.6854019840777076,"5050":-0.0778175767922018,"5051":1.1102340479941777,"5052":1.3701964982872297,"5053":1.131922168396719,"5054":0.9128324705341029,"5055":0.3113085362457233,"5056":-0.18420322711342324,"5057":0.3026224559812991,"5058":0.21998857423060605,"5059":-0.5079971894578142,"5060":-0.49568429335195086,"5061":-0.026206412254323522,"5062":-0.9270701996600554,"5063":0.08236405903053012,"5064":-0.36526056968672826,"5065":-0.5665775832599337,"5066":-0.3611318642198848,"5067":-0.4436168047587338,"5068":-0.10609350485464776,"5069":0.3215552643563168,"5070":0.819355424603289,"5071":0.4010711797461663,"5072":0.14868073073903743,"5073":0.3604036995670341,"5074":-0.06889949465537697,"5075":0.21062501937573322,"5076":-0.26069832363965145,"5077":-0.1403822395867199,"5078":-0.029095638637235365,"5079":0.32249372341519916,"5080":-0.3981443320454614,"5081":0.004662691985612871,"5082":0.28111152689120494,"5083":-0.26844276446440674,"5084":-0.12941840493767612,"5085":-0.26725051872717037,"5086":0.8680070507938076,"5087":-0.5850035138324371,"5088":0.015168680989875328,"5089":-0.03639177949515471,"5090":0.1887305586321022,"5091":-0.17115442167520872,"5092":0.039058353729679564,"5093":0.5037874822876878,"5094":-0.05157492914009476,"5095":0.02275349058729833,"5096":0.0035501232106085914,"5097":-0.2406451627918224,"5098":-0.8014852464538655,"5099":0.2594480093307207,"5100":-0.31950101129333686,"5101":0.1404831088725022,"5102":-0.2526672759685967,"5103":-0.37199776946010626,"5104":-0.08359391411634783,"5105":0.36498566965766555,"5106":0.1611631013091586,"5107":0.17437784692301458,"5108":0.21033761284907437,"5109":-0.2612932206425368,"5110":0.2198551535424606,"5111":-0.24106348666689958,"5112":0.259577769633129,"5113":0.7443888748235211,"5114":-0.2479926080497895,"5115":-0.3327002002226768,"5116":-0.09146278761947972,"5117":-0.16457731720839897,"5118":-0.5988895048589251,"5119":-0.2998218662779596,"5120":-0.321400630430945,"5121":-0.6547194731049124,"5122":-0.3077662292585265,"5123":-0.9285608542988919,"5124":-0.0868930230476869,"5125":0.11073890750382184,"5126":0.3841646539068659,"5127":0.26913536326918863,"5128":0.13162724798606726,"5129":0.1025780823176153,"5130":-0.5126424100123558,"5131":0.3681405799927743,"5132":-0.21449162683467077,"5133":0.5752081035168077,"5134":0.16044550787865483,"5135":0.1581739377089639,"5136":-0.34433883710212554,"5137":0.4269511358127003,"5138":-0.19775675409144244,"5139":-0.10549258344206167,"5140":0.035539813565126255,"5141":-0.08729967911626343,"5142":1.2874068625120774,"5143":1.5570146874928081,"5144":0.1057500960811273,"5145":-0.4111515210667431,"5146":0.3443084894788503,"5147":-0.08114666350298748,"5148":0.025190357415888657,"5149":-0.4378621504108309,"5150":1.520090216651879,"5151":0.8826559725808478,"5152":0.32992582299660445,"5153":0.07315573485053846,"5154":0.3156588807535269,"5155":-0.25789366220044546,"5156":0.3296959970626916,"5157":0.17705876516154892,"5158":-0.4164582801946348,"5159":-0.05045971312233752,"5160":-0.15911865315758042,"5161":0.3892166096929575,"5162":0.09051513497626718,"5163":-0.4548592660796609,"5164":-0.6912242940694807,"5165":0.11073715653303538,"5166":0.25221209009779383,"5167":0.007639696128759441,"5168":-0.3096270723589192,"5169":-0.12928926373991906,"5170":-0.5095384746043716,"5171":-0.503557709050506,"5172":-0.20581288753630114,"5173":0.4253096536078037,"5174":-0.3426417701590408,"5175":0.04961127302244063,"5176":-0.273387241102234,"5177":-0.20444308113350299,"5178":0.2976579539779235,"5179":-0.38104558261858107,"5180":-0.027927956195295044,"5181":-0.5412200880847677,"5182":-0.35512623747229716,"5183":-0.39246599132510035,"5184":-0.07113192057299894,"5185":0.2523689250725423,"5186":-0.009805889503033832,"5187":-0.10066324222762357,"5188":0.05733120729395611,"5189":0.33313386138209927,"5190":-0.2295721300687498,"5191":-0.03250924256689713,"5192":0.2269069986509676,"5193":-0.05400977503930918,"5194":-0.21531004964887038,"5195":-0.006188210222977553,"5196":0.16950031786286124,"5197":0.05590238672442781,"5198":0.022993557947837143,"5199":0.17786112679954313,"5200":0.3433417058070777,"5201":-0.07736809541577572,"5202":-0.3526724932511735,"5203":0.004318656600597857,"5204":-0.11159856288508911,"5205":-0.0951712838583989,"5206":0.29560930685485926,"5207":0.3663471021469148,"5208":0.06709169346550933,"5209":-0.12022379772932151,"5210":0.3795603450826635,"5211":-0.02960163322045619,"5212":0.10461175666841487,"5213":0.7207872800912934,"5214":0.7585111619551987,"5215":0.5570576345959665,"5216":0.21848731392223925,"5217":0.5792121796808385,"5218":0.24269932411720876,"5219":0.06406555786145267,"5220":-0.02072768735142027,"5221":-0.0027114823117038696,"5222":0.29136879307534835,"5223":1.0648816674354324,"5224":0.7228513124732098,"5225":0.4352146556804362,"5226":-0.038421002869102515,"5227":-0.410594358919936,"5228":-0.04336838560248021,"5229":0.025861795311305304,"5230":-0.3826964579962442,"5231":-0.6295350721575549,"5232":-0.4923312483150839,"5233":0.2211248051770502,"5234":0.05004473873175388,"5235":0.27344543464285764,"5236":0.18321254359836395,"5237":0.1016843253154185,"5238":-0.07849069020192229,"5239":-0.026102777589952133,"5240":0.1203017455690451,"5241":-0.1839631295614897,"5242":-0.009909188212509487,"5243":-0.1147340782501039,"5244":-0.11474882349263471,"5245":-0.07568158097227098,"5246":0.08447668968757346,"5247":-0.16470501358503123,"5248":-0.23328421408551425,"5249":0.1240453303587854,"5250":0.30968740776660125,"5251":0.037682556627764346,"5252":-0.18315754273816287,"5253":0.13466975602094905,"5254":0.10360798412575144,"5255":-0.08842105173942491,"5256":-0.006149853365936376,"5257":-0.1713671677847054,"5258":-0.19345929755532584,"5259":-0.2594056567096749,"5260":0.0906225026867211,"5261":0.05031558157822807,"5262":0.061143966444373955,"5263":0.23890654167095604,"5264":-0.08818316794452843,"5265":-0.5399314593291344,"5266":-0.3955617157640277,"5267":-0.13454668644245438,"5268":0.0069982518528034525,"5269":-0.15315337332290238,"5270":-0.021816145756531683,"5271":0.7178575716144645,"5272":0.03070784812863292,"5273":0.3278409705016565,"5274":-0.3089801768760713,"5275":0.03228194648540485,"5276":-0.09323887689143853,"5277":0.40863269082215703,"5278":0.14544742296679977,"5279":0.3554611431552695,"5280":-0.21155168067350413,"5281":-0.14535873479883096,"5282":0.2716601530433486,"5283":-0.24018042840631454,"5284":0.03116701690785279,"5285":0.0862636597242204,"5286":0.0796839323035514,"5287":0.06069504483388115,"5288":-0.06341281152693189,"5289":0.18561190429148677,"5290":0.5464383194771839,"5291":0.1537928580288269,"5292":0.043951895069894664,"5293":-0.08582133649881592,"5294":-0.2063512204193327,"5295":-0.6431206687508488,"5296":-0.6511057599756039,"5297":-0.6299521101899541,"5298":-0.362237378611404,"5299":-0.42029299210270454,"5300":0.10292588228324832,"5301":-0.34733050919366,"5302":0.5545372299480983,"5303":0.37474007870493053,"5304":-0.9853109144258149,"5305":-0.8688828230485327,"5306":-0.6176951215003773,"5307":0.4264123229409099,"5308":0.185190577902002,"5309":-0.026041146889946024,"5310":0.08987314288820243,"5311":-0.33172138295122877,"5312":-0.524248612610093,"5313":0.23004771603168725,"5314":-0.38413149601546054,"5315":-0.19079166283233656,"5316":-0.3623799291485993,"5317":0.19612848208123887,"5318":0.08831447488771405,"5319":-0.18972256196054488,"5320":-0.006171362495427032,"5321":-0.38375940270977166,"5322":0.5111532128135097,"5323":0.08747923087651152,"5324":0.26536425007673353,"5325":0.16361174856968577,"5326":0.06201644594909001,"5327":0.778916700844638,"5328":-0.14050257740018332,"5329":-0.03897089128142708,"5330":0.1744425695016795,"5331":0.33717131283841323,"5332":0.11343688455985196,"5333":0.03170792954793196,"5334":0.12524428968896353,"5335":-0.06743163190754847,"5336":0.28304042313696326,"5337":-0.5143536999391305,"5338":0.042074905543563475,"5339":0.5270957448862007,"5340":0.030572391911914635,"5341":0.36319930669659256,"5342":-0.18934901441200883,"5343":-0.09503681498006081,"5344":0.13295261806950345,"5345":0.21191629286763744,"5346":0.10991758185884759,"5347":0.2362952449986188,"5348":-0.06615700850259414,"5349":0.22223654061553103,"5350":0.1986062183585945,"5351":0.04684841185618342,"5352":-0.07547639199719444,"5353":-0.25035274758802845,"5354":0.03755982418719329,"5355":0.26464878578340073,"5356":-0.4708305145997821,"5357":0.5871934470938438,"5358":-0.13902411465386844,"5359":-0.06291753538958839,"5360":-0.24292676261674526,"5361":-0.1324146641902832,"5362":0.12166543281818516,"5363":-0.04099858100861897,"5364":0.26236625779596107,"5365":0.1564105134698108,"5366":0.8213781703588122,"5367":0.04138318187999161,"5368":0.24434163706915987,"5369":0.3677028078850184,"5370":0.22573354085393701,"5371":0.20893109456059522,"5372":0.4876723640654535,"5373":-0.24695259723456697,"5374":-0.31505315941328205,"5375":0.6340043636036969,"5376":0.856993681207966,"5377":0.6140612898216722,"5378":0.3999324129063731,"5379":0.02371222673742697,"5380":-0.030437360555697027,"5381":-0.17045426326256155,"5382":0.024212611961101062,"5383":-1.0130116198243524,"5384":-0.43471014481618736,"5385":-0.22406554531688339,"5386":-0.7858988137736541,"5387":-0.3161551417588384,"5388":-0.37937967492592234,"5389":-0.6746049611375607,"5390":-0.13942808296551037,"5391":-0.22988655198741204,"5392":-0.06606759828111637,"5393":-0.7182625360072853,"5394":-1.0264919398662251,"5395":-0.0739712409282252,"5396":-0.5737531746165572,"5397":-0.23517426045994738,"5398":-0.30468699031804,"5399":0.1743274141165165,"5400":0.25412130461514526,"5401":-0.0454082874524713,"5402":-0.3379210641316608,"5403":-0.058891626985147834,"5404":-0.13255267456970474,"5405":0.35349027956967,"5406":0.19861772472140987,"5407":-0.09384566848958144,"5408":0.07971892003281322,"5409":-0.20859478500096953,"5410":-0.35885827589493224,"5411":-0.15390186262533076,"5412":-0.016218011849751288,"5413":-0.004748920965749821,"5414":-0.002199796008827291,"5415":0.45597452725182525,"5416":0.2913649855220948,"5417":-0.024307018333802787,"5418":-0.004714120196644917,"5419":-0.21653740434396443,"5420":-0.051006201554434714,"5421":-0.39843917308827015,"5422":0.09996910875844242,"5423":-0.0896455826318804,"5424":-0.12418505896538498,"5425":0.5891553737099016,"5426":0.30133295183097586,"5427":-0.01742236325351496,"5428":-0.051522931227802236,"5429":0.14305050992383045,"5430":0.1692267175675175,"5431":-0.1130318343512261,"5432":0.18226343448515858,"5433":0.07535557998191651,"5434":-0.00021797426184531074,"5435":-0.019392421700379206,"5436":-0.04396930762288542,"5437":0.08172917500558807,"5438":0.059714929041670396,"5439":0.07966052652231453,"5440":-0.05940543985294824,"5441":0.03315192468978093,"5442":0.029276931478314932,"5443":-0.011160276820166267,"5444":0.14579991035088952,"5445":0.010517783144509785,"5446":-0.012309432360587149,"5447":-0.06980353248873698,"5448":-0.040797467864710314,"5449":-0.044731311592298935,"5450":-0.12615416762736859,"5451":-0.12020497912219077,"5452":0.06369151426042378,"5453":0.09122362803975759,"5454":-0.013130293901969306,"5455":0.07256884604596346,"5456":-0.10289815194312987,"5457":-0.38686986840986864,"5458":-0.45185404190508804,"5459":-0.5579005738191799,"5460":-0.44406843361967374,"5461":-0.12872775150641777,"5462":-0.39455546592916174,"5463":-0.15143782123226807,"5464":-0.18346131331835072,"5465":0.07285964113003338,"5466":-0.37477850619171665,"5467":-0.27882914638385703,"5468":-0.2759340759759314,"5469":-0.13237155352104893,"5470":-0.00826399126542196,"5471":-0.010791428906737564,"5472":-0.13888528147347184,"5473":0.0799035979069547,"5474":-0.07617990852820865,"5475":-0.11091193815964581,"5476":-0.1516188339626025,"5477":-0.26808573421084636,"5478":-0.01819121675458628,"5479":0.15359355638147598,"5480":-0.0004715286426548908,"5481":0.02816637253821468,"5482":-0.03805862871525649,"5483":-0.12788261795878852,"5484":0.05630156266363364,"5485":-0.04230251337821203,"5486":0.048562539447234265,"5487":0.03901810149002757,"5488":0.009937982944032942,"5489":0.017600754585862,"5490":0.03559270162097323,"5491":0.11406192781945797,"5492":0.10356479229125666,"5493":-0.043212055687495345,"5494":0.023833432554041332,"5495":-0.12990612317098274,"5496":-0.0725323968513834,"5497":-0.06864767925784114,"5498":0.11007862443282922,"5499":0.09923295488281207,"5500":0.08830783951126825,"5501":0.08818243141189028,"5502":0.16960782127020096,"5503":0.09146949931804418,"5504":0.024614036021508474,"5505":0.12088449965247115,"5506":-0.02107276904049552,"5507":0.28135131121359297,"5508":-0.06703937999573903,"5509":-0.2038556935202707,"5510":-0.1416875170773405,"5511":-0.3886067941086556,"5512":-0.01772259473131301,"5513":-0.11889137412356506,"5514":-0.03564397669946391,"5515":-0.13743655220577183,"5516":-0.04942060947867388,"5517":0.15508500999526564,"5518":-0.31495319378374326,"5519":-0.7498585334255585,"5520":-0.6552874387038965,"5521":-0.0817619027103567,"5522":-0.4002572774040898,"5523":0.043589318728637326,"5524":0.18755613702986437,"5525":0.2803860527884318,"5526":-0.0022099788409133967,"5527":-0.25518837216422496,"5528":-0.062400452554239996,"5529":0.16980823600166248,"5530":-0.14762474359905828,"5531":0.8814628326446727,"5532":0.13371676027499446,"5533":-0.08051265381824352,"5534":-0.2569482217359044,"5535":-0.01021460016470192,"5536":-0.04098748023107904,"5537":-0.15396713528831507,"5538":0.5664093815228972,"5539":1.3429072445581463,"5540":1.0422818749179747,"5541":0.9823706517923209,"5542":0.2111214423040307,"5543":0.2007553048225982,"5544":-0.28629940984052904,"5545":-0.27438822333027624,"5546":0.14770844670569205,"5547":-0.11428065298320284,"5548":-1.9349484955141127,"5549":-2.9212581558583053,"5550":-3.1482962476100607,"5551":-2.20314394427372,"5552":-1.16851721276205,"5553":0.10529976099363252,"5554":-0.11880796758110923,"5555":-0.23760936282013254,"5556":0.14630405046444592,"5557":0.8482636129921723,"5558":1.0517808644902704,"5559":0.982753926184237,"5560":0.17201719939906293,"5561":-0.15183597468268922,"5562":0.14241320198616778,"5563":-0.041028436866073714,"5564":0.15472519650938432,"5565":0.4295180821142742,"5566":0.04144433915278604,"5567":-0.06446258962692651,"5568":-0.5238299098872848,"5569":0.3698367707642908,"5570":0.41093791840452815,"5571":-0.05763255138308781,"5572":0.4066701963229675,"5573":0.05809070548207382,"5574":-0.3984580541882911,"5575":-0.09890742719736384,"5576":-0.1112672893380915,"5577":-0.011487737421201611,"5578":0.2950205951509255,"5579":0.15854824225501443,"5580":-0.22339895314105776,"5581":-0.24158929552760075,"5582":-0.03886873886844387,"5583":-0.15236882313897193,"5584":-0.46007132201717643,"5585":-0.17282409690622766,"5586":-0.1260652337157327,"5587":-0.3271913966144832,"5588":-0.6213916791520155,"5589":0.33937878385674847,"5590":0.00869530564508675,"5591":-0.33838813118067623,"5592":-0.13094204972677667,"5593":-0.4473354222907151,"5594":-0.6634720825127634,"5595":0.11231601097934556,"5596":0.32605305155571856,"5597":-0.5215910249124484,"5598":-0.48385935856501094,"5599":-0.096427320855264,"5600":0.058313194183147794,"5601":-0.03351387424059322,"5602":-0.07103584572746431,"5603":-0.19874021780114723,"5604":0.39878009628949695,"5605":0.40185499962402593,"5606":-0.13235198580468419,"5607":-0.14215985962590458,"5608":-0.13756654645274258,"5609":0.5340903504405731,"5610":-0.03562875826147237,"5611":0.17618843145022553,"5612":-0.11973332407133215,"5613":-0.19181093801233703,"5614":-0.0898958610383321,"5615":-0.24283044075620938,"5616":-0.17801662229249623,"5617":-0.0036854859016929187,"5618":0.5658443942777288,"5619":0.34042300282072346,"5620":-0.1547410371093868,"5621":0.8045058317975607,"5622":0.6240805606603008,"5623":-0.3802424472002381,"5624":-0.19962649383796716,"5625":0.22819570883209206,"5626":-0.4778892363257904,"5627":-0.40545112828606017,"5628":0.69662399885462,"5629":-0.0662758370029515,"5630":0.35115669909379316,"5631":0.0785438779854828,"5632":0.12511832505209403,"5633":0.37691041433247147,"5634":-0.11108989130301987,"5635":-0.16885516859354815,"5636":1.480728115079607,"5637":2.354739036799366,"5638":2.1633764267268716,"5639":1.0031178951171558,"5640":0.3704630182605045,"5641":0.6712563132399368,"5642":0.36210500350385144,"5643":0.31084589642342614,"5644":-0.31886027241322124,"5645":-0.11772244626105155,"5646":-0.40569322100062105,"5647":-0.12050349373345871,"5648":-0.2951938305365792,"5649":0.34807643032843405,"5650":0.23294029773964903,"5651":-0.022480955836539158,"5652":0.1762716065973139,"5653":0.1460603284451958,"5654":-0.464708049733948,"5655":-0.6352431485332457,"5656":-0.7576238240617672,"5657":0.43590275801252376,"5658":-0.16792718739724105,"5659":-0.14881554253440615,"5660":0.022163635464203833,"5661":0.5979952886518766,"5662":0.2515025329246446,"5663":0.562621597576794,"5664":-0.5436193549291021,"5665":-0.2902779873015596,"5666":-0.28663032180938414,"5667":-0.014441777286053996,"5668":-0.41206634893885413,"5669":0.11351402559760047,"5670":0.17808517355442186,"5671":0.2659188990141423,"5672":0.7295551832182352,"5673":0.3476866098746418,"5674":0.03973517736227675,"5675":-0.2465762784097246,"5676":0.23925682972478643,"5677":0.22259506271325868,"5678":-0.2581829691794631,"5679":-0.15281366698148602,"5680":-0.1513204362865989,"5681":-0.05580739835242639,"5682":0.001038477067129874,"5683":-0.1063188162439187,"5684":0.08137413673248092,"5685":0.0719928577391752,"5686":0.1927740178390673,"5687":0.09713125089284984,"5688":-0.21055459501283097,"5689":0.06542494978555212,"5690":0.42119177832544236,"5691":0.4102387078293783,"5692":0.5847659756734843,"5693":0.0347065233642659,"5694":0.07407055780581402,"5695":-0.3075594347299486,"5696":-0.21079268996974124,"5697":0.24721867580370674,"5698":-0.1114331456604091,"5699":-0.5489825274106029,"5700":0.722966953949469,"5701":1.5343075776030273,"5702":0.38556298860073607,"5703":-0.15139700036738263,"5704":-0.2621477677051034,"5705":-0.23193523770207267,"5706":0.43906816639527535,"5707":0.3935365064447815,"5708":-0.6377738239259494,"5709":-0.5086231537710543,"5710":-3.9596326096968744,"5711":-4.459377907066372,"5712":-2.7312823794185466,"5713":-1.8012259449219628,"5714":-0.3884144667383952,"5715":-0.04080360716853405,"5716":0.22307862459439037,"5717":0.2027989036171832,"5718":0.27019230364044017,"5719":0.7531740928946967,"5720":0.3445396716029425,"5721":0.25245103018557297,"5722":-0.4138391633757448,"5723":-0.5487549768021014,"5724":0.3201675848452576,"5725":0.0028619503936599877,"5726":0.09502000053022447,"5727":0.24410295939938476,"5728":0.09884166827510318,"5729":0.13457344186321407,"5730":0.19274812556026918,"5731":-0.0038543366899131343,"5732":0.20699435473522235,"5733":-0.04731905331843475,"5734":0.016044762713451212,"5735":-0.19775675156251488,"5736":-0.2214266583777585,"5737":-0.0998310314236512,"5738":0.0364699862058712,"5739":-0.5691867668912662,"5740":-0.13156470902985404,"5741":-0.28054326908895244,"5742":-0.4208356786531877,"5743":0.143995069133809,"5744":-0.09435145296280506,"5745":-0.2646650437806832,"5746":-0.11852295452332616,"5747":-0.17330224124176669,"5748":-0.09353953044478085,"5749":-0.19791801208402002,"5750":-0.25130524024659495,"5751":0.002455553520579163,"5752":-0.15839895044672211,"5753":0.1692434868975659,"5754":0.03642127059028323,"5755":0.14642904790428582,"5756":0.076853084446172,"5757":0.04281478732905068,"5758":0.09631684223547038,"5759":0.0510020987364156,"5760":0.061521474476515084,"5761":0.16789475916452706,"5762":0.08019914708029327,"5763":0.0973341752195112,"5764":0.140851401609779,"5765":0.17846551077743078,"5766":0.13642140938507027,"5767":0.07986108592209754,"5768":0.13061843674662127,"5769":-0.004900213650107126,"5770":0.1519635607546081,"5771":-0.007083691296335302,"5772":0.01821934125080405,"5773":0.14077993211916046,"5774":0.1220295844076517,"5775":0.07198095506340074,"5776":0.13001762172270007,"5777":0.10851009111257927,"5778":0.03811287348850069,"5779":-0.07508122221242891,"5780":0.15812297787636603,"5781":0.0598682603694667,"5782":0.07661320678853722,"5783":0.1365816921017753,"5784":0.11241898566792034,"5785":0.048804294932132106,"5786":0.08170795595391235,"5787":0.09205350051711442,"5788":0.06896208057908197,"5789":-0.011774438411732736,"5790":-0.09951126988976484,"5791":0.1347174566032751,"5792":0.13581525627100977,"5793":0.05280277855527883,"5794":0.039561027349184215,"5795":0.09209009096647909,"5796":0.10352809122159873,"5797":-0.013271633703982811,"5798":0.11103153873771787,"5799":0.18754390364599355,"5800":0.09616391947510557,"5801":0.1505122763779297,"5802":0.12646489927308396,"5803":0.13832138687672496,"5804":0.05604689805327126,"5805":0.37429725022854654,"5806":0.09556969245550137,"5807":0.1674428685362695,"5808":0.08160514018790507,"5809":0.17662709774530538,"5810":0.10743438580897287,"5811":0.14351106914671122,"5812":0.16653168941770813,"5813":0.03950474839811405,"5814":0.17552004474334926,"5815":0.12135561282532524,"5816":0.1743548875117008,"5817":0.031131891756227107,"5818":0.07275861212513905,"5819":0.1500644771643153,"5820":0.16336829830276015,"5821":0.04766879515174095,"5822":0.05496739412503589,"5823":0.09635513698422613,"5824":-0.024363249172637543,"5825":-0.052572814871665687,"5826":0.19272107681633444,"5827":0.17152185091904776,"5828":0.14633072556008309,"5829":0.11246460902928078,"5830":0.05438704774228464,"5831":0.15061629823922626,"5832":0.5729806649808582,"5833":0.21191603820066307,"5834":-0.8230294026667152,"5835":-0.2695166741159721,"5836":0.49317353807621295,"5837":0.24573635984262407,"5838":-0.35699194204210694,"5839":0.38046723454266557,"5840":-0.12845675054889416,"5841":-0.12164957631498394,"5842":-0.12628017992244683,"5843":0.1839341367931828,"5844":0.04242211343236923,"5845":-0.25371862014124796,"5846":0.19476648585799533,"5847":-0.6908637415930734,"5848":-0.0828080871607494,"5849":-0.3133436683010718,"5850":0.5076257839035038,"5851":0.2260273774820772,"5852":-0.6995305390738603,"5853":0.0014225302809009307,"5854":-0.1417238289716628,"5855":0.2884597159355679,"5856":0.09211658275721636,"5857":-0.04792968861592419,"5858":-0.20315931289402128,"5859":-0.019352071551411953,"5860":0.2967756303250313,"5861":-0.020965453402350544,"5862":-0.8792855811759811,"5863":-0.1790837079235432,"5864":-0.060443885943170836,"5865":-0.16514132584134827,"5866":1.3034279938864122,"5867":0.4145672450200886,"5868":0.341576967226287,"5869":-0.641188065873501,"5870":0.5990015185894912,"5871":-3.413328155923121,"5872":-1.4899367587714225,"5873":-0.5052177061720198,"5874":0.12522788508918486,"5875":-0.06963416797660665,"5876":-0.22672730259504753,"5877":-0.09675421765186974,"5878":-0.5564054064964651,"5879":0.8160360256981051,"5880":0.11006417860920635,"5881":-0.08432576371763857,"5882":0.13663871247149534,"5883":0.29609621712944467,"5884":0.18213773251033863,"5885":-0.4198101680769429,"5886":0.5646732692993837,"5887":0.31697425735305435,"5888":0.3459616481123647,"5889":-0.08964926905014992,"5890":0.5622649727556154,"5891":0.40068508370023936,"5892":-0.7327235024974135,"5893":0.2561804510985248,"5894":0.031856172851061425,"5895":-0.45118555044604064,"5896":0.3723417987571326,"5897":-0.4122277287496096,"5898":0.07501653575674332,"5899":-0.2073756127626674,"5900":0.0146476495289733,"5901":-0.50070207381651,"5902":0.31460691533630547,"5903":0.25916533155983185,"5904":-0.29347092496644706,"5905":-0.4589606772865402,"5906":0.18272336499424344,"5907":-0.07856507095685611,"5908":0.4448719757869427,"5909":0.6846216204086347,"5910":-0.045103800219697,"5911":-0.09470808303304465,"5912":0.326534072933592,"5913":-0.5481603652665944,"5914":0.7633329064210264,"5915":-0.015800151381352955,"5916":-0.2884674337578571,"5917":-0.20054602269962826,"5918":-0.22424077391728514,"5919":-0.03490597321936244,"5920":-0.2704800132940144,"5921":-0.10696882598440212,"5922":0.43374342989113934,"5923":0.06117835648251013,"5924":-0.7629411913325033,"5925":-0.3088628537155346,"5926":-0.28175171283509315,"5927":-0.533589192145402,"5928":-0.11857100428185582,"5929":-0.07868051491441932,"5930":-0.14065228844348204,"5931":0.6366244768964726,"5932":0.2792345414460844,"5933":0.021873777330162852,"5934":-0.5294582498985935,"5935":-0.5067739823525454,"5936":-0.2075396790738242,"5937":-0.1410737505054752,"5938":-0.2375666093091415,"5939":-0.0066045175332012755,"5940":0.5027478012980058,"5941":-0.26524196772617675,"5942":-0.13545621154679363,"5943":-0.26340027627301293,"5944":-0.04456534926122391,"5945":-0.17933597287044103,"5946":-0.30798613303858485,"5947":-0.09681191791893391,"5948":-0.243233440723423,"5949":-0.24550822759262456,"5950":-0.1400235224617928,"5951":0.4348045754467801,"5952":0.4799875355530903,"5953":0.19642014399666724,"5954":0.027420691081503804,"5955":-0.32248423408138144,"5956":-0.11280153144079832,"5957":-0.3206022436713035,"5958":0.07728530816397781,"5959":0.12910598129430362,"5960":-0.8185071645271084,"5961":-0.5981450409514636,"5962":-0.396435981735045,"5963":-0.1477317514626738,"5964":-0.14400952804730416,"5965":-0.2135700219176667,"5966":-0.16282585669944033,"5967":-0.35746077647096347,"5968":0.4374458187578446,"5969":0.10667896769185227,"5970":-0.44588969582660987,"5971":-0.3916334735904208,"5972":-0.26145890253689985,"5973":-0.32473841925903646,"5974":-0.43440839453369334,"5975":-0.2815411574147886,"5976":-0.0966950607301592,"5977":-0.5451435813798685,"5978":0.20238812718724353,"5979":-0.23705425926122287,"5980":-0.42708749018440306,"5981":-0.4271928337986539,"5982":-0.1690360903497159,"5983":-0.09566507938350949,"5984":-0.25362199281438735,"5985":0.08664661811718352,"5986":-0.17489822762972237,"5987":-0.4124571182595874,"5988":-0.6865615983084479,"5989":-0.37014457959522823,"5990":-0.27773217012148055,"5991":-0.24635651390783594,"5992":-0.3380103158027533,"5993":-0.3839798981307489,"5994":-0.054591140784078986,"5995":0.022796443229262088,"5996":0.05613179972183489,"5997":0.23907775619367172,"5998":-0.36620301710456815,"5999":-0.3010981010928411,"6000":-0.24472308231879733,"6001":-0.19191810300161444,"6002":-0.33789849386393683,"6003":-0.34523660301151,"6004":-0.07416178320012723,"6005":0.11059885434370319,"6006":-0.4905455210400711,"6007":-0.015380302584974385,"6008":0.05170104694749263,"6009":0.030589280870593396,"6010":0.09166980576883145,"6011":0.2288978201618789,"6012":0.01830665010735049,"6013":-0.28273984733575996,"6014":-0.0495122208722888,"6015":-0.26926309419330124,"6016":0.08002956527756584,"6017":-0.30223654660817945,"6018":-0.2534088741218324,"6019":-0.28101856370428024,"6020":0.1673175827465453,"6021":-0.1393846301199923,"6022":0.10073104206291349,"6023":0.42020110368206776,"6024":-0.8256497992116866,"6025":-0.1413093921862839,"6026":0.02703021505738036,"6027":0.15285816723779094,"6028":0.4668136856898711,"6029":0.37254747303104435,"6030":0.02227684144412776,"6031":0.2257649914923141,"6032":0.10970751932956484,"6033":0.21974400505495742,"6034":1.2612098293232155,"6035":0.6121374342158309,"6036":0.48864731657924476,"6037":0.4192619151358006,"6038":0.07681632336047624,"6039":0.1434107312659191,"6040":0.10628350465348928,"6041":-0.131858746774253,"6042":0.6019946429335414,"6043":0.8089010624481624,"6044":0.6860399172801969,"6045":0.6354422902292014,"6046":0.17343376449940923,"6047":-0.09032999871165028,"6048":-0.2968412769041986,"6049":-0.05442201317080975,"6050":-0.37172195399220725,"6051":0.4526878291412326,"6052":0.026411501374943143,"6053":0.19314841263331592,"6054":-0.26898438787296375,"6055":-0.12677056319863025,"6056":0.2802085002643021,"6057":-0.05721215984669701,"6058":0.02201074226194709,"6059":-0.10993360396267712,"6060":-0.11569318504802827,"6061":0.5267513415967296,"6062":0.009194602475750529,"6063":-0.03552623995459042,"6064":-0.07940696582872885,"6065":-0.10032021584249633,"6066":-0.08005648237936273,"6067":-0.17519608577816645,"6068":0.008760394011669307,"6069":-0.24443731951897021,"6070":-0.014172132061499115,"6071":0.03521700831321451,"6072":-0.04311928399338831,"6073":-0.3670066869431748,"6074":-0.16167195486802508,"6075":-0.7705766800134186,"6076":-0.6545391501419346,"6077":-0.26858994797835833,"6078":-0.07226029306832808,"6079":-0.12787382725114455,"6080":-0.23040705809887072,"6081":0.053051244406573876,"6082":0.7385592033873108,"6083":-0.016164359749175072,"6084":-0.5420004982123756,"6085":-0.7218447259695019,"6086":-0.20364451602799236,"6087":0.04102532319659648,"6088":-0.05514218835981418,"6089":0.759061682365896,"6090":-0.15621545459183198,"6091":-0.058615311995032705,"6092":0.8022881884815465,"6093":-0.05456568604326402,"6094":-0.40273228352120094,"6095":0.8777462337864486,"6096":0.8982602125285278,"6097":0.8623773887551219,"6098":-0.2689728596331107,"6099":0.3637767777154777,"6100":0.05094023966268681,"6101":0.4302447711341462,"6102":0.2561565014986054,"6103":0.528716888204576,"6104":-0.2348517702447774,"6105":0.1156555377110489,"6106":-0.37373871219245103,"6107":-0.49968705831593874,"6108":0.04322740826242333,"6109":0.6139094538909601,"6110":-0.17196884438314394,"6111":0.11345346833734694,"6112":0.5091254779688121,"6113":0.23555179797533518,"6114":-1.031829263904979,"6115":-0.7591869626197342,"6116":-0.9061367051245779,"6117":0.6013669869062402,"6118":-0.06242927182997476,"6119":-0.09744458342392756,"6120":0.6858329052327915,"6121":-0.02634624545212563,"6122":0.150992176319427,"6123":-0.2878079678506557,"6124":-0.3244429305442706,"6125":-0.4270713241395299,"6126":0.5157954969987966,"6127":0.7001200840046206,"6128":-0.07915744837141805,"6129":-0.1168692462105987,"6130":-0.09347264197058831,"6131":-0.2072813141619328,"6132":0.6578546097694687,"6133":0.11651453119880836,"6134":-0.08886244615221209,"6135":0.3367939328006408,"6136":0.40243088450965747,"6137":0.7192133694591798,"6138":-0.5895711031089907,"6139":-0.28177185204104505,"6140":0.36502769883805597,"6141":0.39223988439363866,"6142":-0.0006560890088350719,"6143":0.535428542500406,"6144":0.10681192298955791,"6145":0.26253619220503954,"6146":-0.351758591745078,"6147":0.11540403963693735,"6148":0.10703758661020021,"6149":0.43234619849871275,"6150":0.17300342344907693,"6151":0.1016776469155182,"6152":0.0016936534350655186,"6153":0.1714600039816686,"6154":0.2842043716086498,"6155":-0.2631961781636839,"6156":0.3885550684721339,"6157":-0.8469500124354187,"6158":-0.518914970152119,"6159":-0.6340585310889179,"6160":-0.010532511778019577,"6161":-0.019729038688531122,"6162":-0.039887013880125693,"6163":-0.40683158819536847,"6164":0.42121113114098013,"6165":-0.48782177068439087,"6166":-0.5338610588029706,"6167":-0.3780324581541699,"6168":-0.4030279335745758,"6169":-0.6079401811282596,"6170":-0.44834654753498204,"6171":0.046477780593572805,"6172":-0.09134565894751112,"6173":-0.5285028279326484,"6174":0.14875000437465621,"6175":0.38174229289195194,"6176":0.3960437355661661,"6177":0.3351000966402688,"6178":-0.4509109754804088,"6179":0.752639195515497,"6180":-0.08465394238819916,"6181":0.09109400439840654,"6182":0.1367575199702115,"6183":0.11169991648433493,"6184":0.5073469890796738,"6185":-0.15648551603293331,"6186":0.9955015682702786,"6187":1.455551952267291,"6188":0.6717479537049026,"6189":-0.3752852161523843,"6190":0.7420694433327433,"6191":-0.22062622982546995,"6192":-0.107012348565844,"6193":1.0482259722286085,"6194":0.687583227585424,"6195":2.4565793329854912,"6196":1.8663304216541527,"6197":0.47841932709298723,"6198":-0.0051231752916524416,"6199":-0.6013717736319916,"6200":-0.24297238598871757,"6201":0.11597529631057114,"6202":0.11001585827485925,"6203":-0.17698522841295972,"6204":0.8010038778373003,"6205":1.3475865317213034,"6206":1.1306568827825625,"6207":-0.35228264414977933,"6208":0.001561089762408199,"6209":-0.534378750848305,"6210":-0.5990409316730863,"6211":-0.21844122903537083,"6212":-0.08417664388394916,"6213":0.11289876939098392,"6214":-0.03675298427495438,"6215":0.02195294718253392,"6216":-0.19039148137915438,"6217":-0.5826299820434442,"6218":-0.1811807917590941,"6219":0.8300635321624769,"6220":-0.16450818577605517,"6221":0.14184038203989438,"6222":-0.01632998607896056,"6223":-0.17059793607446563,"6224":-0.010244979731330373,"6225":-0.14096839411986287,"6226":-0.10048859520710132,"6227":0.1979898793817014,"6228":0.29514923152709416,"6229":-0.30112376285839265,"6230":-0.9525363941128955,"6231":-0.32860636805190324,"6232":0.3955793234286175,"6233":0.22034693969620678,"6234":0.3398385023823711,"6235":-0.20526834523427673,"6236":-0.6361744483974863,"6237":-0.3423046620834056,"6238":-0.25594693460386786,"6239":-0.09179987782838414,"6240":-0.04846439348439438,"6241":0.36712498439820124,"6242":-0.3019189893862442,"6243":-0.14307078188722702,"6244":0.24859675322785735,"6245":-0.22667974251975848,"6246":-0.06136243889528014,"6247":-0.12832705439959213,"6248":0.09141477655904692,"6249":0.5913100522273115,"6250":0.3526443241834969,"6251":0.08561023620166686,"6252":0.19982679950985557,"6253":0.3302195097265091,"6254":0.07406990390882044,"6255":0.24416044985656238,"6256":0.056860259326590015,"6257":-0.009910091589331153,"6258":-0.019275447443951522,"6259":0.39323624951731084,"6260":0.41191363004044285,"6261":0.7302061892390754,"6262":0.12129478180178273,"6263":0.4250363253913561,"6264":0.13407105991370488,"6265":-0.2069725760642175,"6266":1.1029529028067002,"6267":1.322001390163677,"6268":1.8749140129638826,"6269":1.4917459890105247,"6270":1.0498640597144908,"6271":0.4932049528478271,"6272":0.5352099643187488,"6273":-0.2856458173124115,"6274":0.4296037928532675,"6275":0.2204831458392199,"6276":0.35326565751920763,"6277":-0.9821644609505287,"6278":-0.15672571170881267,"6279":-0.49878103920045747,"6280":-0.21774084228994184,"6281":-0.2979665145379365,"6282":-0.043253284331004886,"6283":-0.12065657544886059,"6284":-0.8190017221816904,"6285":0.29137065378069277,"6286":0.3577211307918245,"6287":-0.2513150502517248,"6288":-0.10044871095378054,"6289":0.1266092742361569,"6290":-0.024111527675507866,"6291":-0.19048994127008406,"6292":-0.25408287764671816,"6293":0.1533956079416193,"6294":0.32171232743198214,"6295":-0.29197440440147,"6296":0.2876222688258498,"6297":0.06347627650665177,"6298":0.04308984372741011,"6299":0.44984486269354,"6300":0.44169247170321946,"6301":-0.15295084666435804,"6302":0.181785253285615,"6303":0.5673156990074624,"6304":0.47245825382159645,"6305":-0.370856248268677,"6306":0.06130736480362461,"6307":0.020978787068415407,"6308":-0.38926250513745964,"6309":-0.14771897115062096,"6310":0.2675184040984424,"6311":-0.7230898708990545,"6312":-0.07739903750502677,"6313":0.33169925349890467,"6314":-0.16973466196031814,"6315":-0.2200755553357951,"6316":-0.2056102694315917,"6317":0.024547317083864678,"6318":-0.1369689241592295,"6319":-0.2273387498892015,"6320":-0.3081134274199696,"6321":-0.16333368953842098,"6322":-0.22569315192425207,"6323":-0.12138562522627912,"6324":0.305966078163597,"6325":-0.022834109652700007,"6326":-0.12384043694280544,"6327":0.006859489315817749,"6328":-0.18483045961181765,"6329":-0.5185748081551736,"6330":0.2537449934124484,"6331":0.01623896544876308,"6332":0.0987250961112707,"6333":0.15323019660491927,"6334":0.1883424775099711,"6335":0.1796060957494356,"6336":-0.10324749913139669,"6337":0.004632960752448117,"6338":-0.2503884048115436,"6339":0.08240819707428634,"6340":0.3586902238572439,"6341":-0.06022444536751966,"6342":0.5130848624563918,"6343":-0.11301130508946781,"6344":0.15100981472812972,"6345":0.601186420028093,"6346":0.160127948339102,"6347":2.5671973284341822,"6348":0.767462672349306,"6349":0.11799215107834589,"6350":0.08047372229700034,"6351":-0.24809203233027183,"6352":0.5653536279009671,"6353":0.04563465879086209,"6354":0.22164915305312596,"6355":0.793756816363818,"6356":0.35237834077351843,"6357":-0.25242266069830827,"6358":-0.15607398009179965,"6359":0.29514574892356377,"6360":-0.09903034075526099,"6361":0.5824968161861234,"6362":-0.32047621503607526,"6363":0.07953894617404224,"6364":-0.2151582119640841,"6365":-0.6135181236266958,"6366":-0.18545317108246995,"6367":-0.501684584500846,"6368":0.08921324761264066,"6369":0.14087095763702387,"6370":-0.13173080094416076,"6371":-0.03257749929711578,"6372":0.37505537774009146,"6373":0.41274171689108996,"6374":-0.348772384297387,"6375":-0.08543382195911979,"6376":0.016837513020347156,"6377":-0.13777591471072523,"6378":0.046537122722372,"6379":0.010463103924227859,"6380":-0.09615435906024199,"6381":-0.4250940890800581,"6382":0.02036877275658322,"6383":-0.22202756596684928,"6384":0.27645657679329105,"6385":0.4918949658236312,"6386":-0.09139375962017046,"6387":-0.08451699723806419,"6388":0.14781874624797942,"6389":-0.299990543515296,"6390":-0.24453119100035253,"6391":-0.30182053563200695,"6392":-0.2063387011908525,"6393":0.3688780824425222,"6394":-0.2615017922755094,"6395":0.08133695160387328,"6396":0.3447658659286917,"6397":0.11170009989886996,"6398":0.09942227282345892,"6399":0.306906300893262,"6400":-0.23806603804256146,"6401":0.6158053774686874,"6402":0.02236389677186348,"6403":0.2202223251639941,"6404":0.28085110527093515,"6405":0.14399037687663166,"6406":0.13048250746125833,"6407":0.1352913297769494,"6408":-0.030873578183471296,"6409":-0.10129184011973338,"6410":0.879722714478422,"6411":0.4276366028627606,"6412":0.3742051823191423,"6413":0.3417293985795226,"6414":0.24430325843501718,"6415":0.12388493334062234,"6416":0.176578324758675,"6417":-0.21723434680831466,"6418":0.2930923682665635,"6419":-0.14404934323749907,"6420":0.13536320606560887,"6421":0.39617031080173554,"6422":0.33747101155655324,"6423":0.26406982721690836,"6424":0.20380133601457154,"6425":0.18638413377328847,"6426":-0.18875840384799372,"6427":-0.2501463090587562,"6428":0.417058906944945,"6429":0.08215436090297717,"6430":0.19272972029325894,"6431":0.2817263274962906,"6432":0.18649765202663945,"6433":0.16013122279477673,"6434":0.16972790744813265,"6435":0.13143729110614266,"6436":0.15674691055243778,"6437":-0.5812557910301824,"6438":-0.09587720531324578,"6439":0.353430081856276,"6440":0.29336991035826265,"6441":0.17189805067458688,"6442":0.16558172189274883,"6443":0.1316037191999075,"6444":0.024365669964162645,"6445":-0.36294751569816625,"6446":0.20501734979211003,"6447":0.45616741448099773,"6448":0.29258057632613543,"6449":0.2796885252610193,"6450":0.19677855443555972,"6451":0.2579319865902161,"6452":0.11592166733475306,"6453":0.6599137360377564,"6454":0.10652841431759513,"6455":0.12458574250201021,"6456":0.2491215666024242,"6457":0.3808167778711866,"6458":0.34984275615787336,"6459":0.24721313214775154,"6460":0.24329103806094818,"6461":0.12498927690456899,"6462":0.03642138909114443,"6463":0.4121394321416135,"6464":0.3319062139160259,"6465":0.13665636206050835,"6466":0.2019671995051252,"6467":0.30336459669659155,"6468":0.29780840513616946,"6469":0.1393563965529849,"6470":0.11926597299367805,"6471":-0.5082326903533982,"6472":-0.1907093348395332,"6473":-0.3505114690763883,"6474":0.35234226715402195,"6475":0.4037022556919815,"6476":0.38010485328740146,"6477":0.26288200132543094,"6478":0.16556378320570236,"6479":0.1956094371884174,"6480":0.060309127877174955,"6481":0.07516954965355858,"6482":-0.1951620332777585,"6483":0.08047760769199196,"6484":-0.12128950854859964,"6485":-0.21527308813329257,"6486":-0.03864879746926787,"6487":-0.14368045350626685,"6488":-0.09932078922475822,"6489":0.1937194609007831,"6490":-0.1998446171043146,"6491":-0.4820007940967818,"6492":-0.20987162183689,"6493":-0.15948020248327294,"6494":-0.32408798897271873,"6495":-0.1596564984322735,"6496":-0.10961919226005962,"6497":-0.18861210026174557,"6498":0.26931637445814144,"6499":-0.03881524088867909,"6500":0.18642458792318123,"6501":-0.0017216270279355708,"6502":-0.24714132756539509,"6503":-0.2624443105159024,"6504":-0.17265460218309583,"6505":-0.15292380083431156,"6506":-0.12276123552095705,"6507":0.12132814921290459,"6508":0.1591210102447551,"6509":-0.2479317097669346,"6510":-0.09606202596203472,"6511":-0.1113694356705268,"6512":-0.21503403528284068,"6513":-0.142867827233218,"6514":-0.1284502369192789,"6515":-0.1529038559798239,"6516":-0.096096030690335,"6517":-0.0654520766997363,"6518":0.37901276259497474,"6519":0.08851465666660557,"6520":-0.21696326146693098,"6521":-0.2535344321746601,"6522":-0.17176244070581967,"6523":-0.06377521384499296,"6524":-0.10883918600011046,"6525":-0.062268101127035146,"6526":0.34874095704551583,"6527":-0.19335940446703323,"6528":-0.32640504603493803,"6529":-0.23033457402119728,"6530":-0.2081603256372848,"6531":-0.19253398989445866,"6532":-0.1899258765792603,"6533":-0.10327329674953806,"6534":-0.3446472708574546,"6535":-0.13154875767567845,"6536":-0.1386102905329672,"6537":-0.1777129262246944,"6538":-0.31275381664477253,"6539":-0.21130195810784427,"6540":-0.219533814683486,"6541":-0.22127863549780086,"6542":-0.11597789852552468,"6543":0.08262691555835594,"6544":0.00703107988353533,"6545":-0.1558306539867086,"6546":-0.051841590083003576,"6547":-0.09794458881148747,"6548":-0.21318781207942214,"6549":-0.24565805973502788,"6550":-0.11426421347945183,"6551":-0.031539447157643515,"6552":0.03465190953578909,"6553":0.17943936404318028,"6554":0.10238483201480454,"6555":-0.3143944200074952,"6556":-0.2503557595890107,"6557":-0.2861075697486713,"6558":-0.19710470667233995,"6559":-0.09703942084716156,"6560":-0.16546890987299134,"6561":-0.025256950800291663,"6562":0.19054928023771914,"6563":0.46488904521833996,"6564":0.07171789054718063,"6565":-0.08516185813939077,"6566":-0.01772555139572319,"6567":0.24820319893670728,"6568":-0.25433595205599835,"6569":-0.06260827046452574,"6570":0.7346662851225256,"6571":-0.0710160691500103,"6572":-0.07291015075214095,"6573":-0.19212425391836363,"6574":0.12140083711512274,"6575":0.1562927451861361,"6576":-0.07228548127238975,"6577":0.1351426402650305,"6578":-0.11445313434564991,"6579":0.6546139440586556,"6580":0.5448091170308669,"6581":0.37431445849441825,"6582":-0.23497872945950463,"6583":0.40226514713568656,"6584":-0.12226348504569927,"6585":0.29382379432739275,"6586":0.1288924155124073,"6587":0.02444800982968435,"6588":-0.22713069800931493,"6589":-0.6499369971767036,"6590":-0.5644220473573454,"6591":-0.8213918122127163,"6592":0.06578324432856751,"6593":-0.519661661487478,"6594":0.07210142894901786,"6595":0.08107679195906403,"6596":0.39174227675723916,"6597":-0.3583737425052854,"6598":0.6736650178293097,"6599":0.6080326908851179,"6600":0.30898065004027037,"6601":0.1245752375609112,"6602":0.21598572281142162,"6603":0.38096014657794225,"6604":0.2284254373525068,"6605":0.08557422795737737,"6606":-0.07190648754714025,"6607":0.14635637063996718,"6608":0.20304023225929238,"6609":0.4780473398649235,"6610":0.2604530157888683,"6611":0.6389498063590021,"6612":0.25723990118180945,"6613":0.443240332088731,"6614":-0.1031715992356274,"6615":-0.3742326993016364,"6616":-0.020029088714493968,"6617":0.5041299436227499,"6618":0.03470239925834064,"6619":-0.2422092317576246,"6620":0.21497278554036667,"6621":0.6058334860663611,"6622":0.06778660399596034,"6623":0.22995714187340283,"6624":0.035312160566686034,"6625":-0.06257367678043925,"6626":0.5367320653562802,"6627":-0.11007023156890573,"6628":-0.32053533117705224,"6629":0.029846148512135476,"6630":0.256605909806091,"6631":-0.20103341764375493,"6632":0.1709116528691782,"6633":-0.0931049628057127,"6634":0.14948929609214426,"6635":0.47769014801604187,"6636":0.16177784092963873,"6637":0.2723785570330652,"6638":-0.051716879559166075,"6639":0.32747811262327065,"6640":0.25798621533591615,"6641":-0.08062948345205327,"6642":-0.0783600975692255,"6643":0.16764126927214393,"6644":-0.19207704495261246,"6645":0.0793627253975938,"6646":-0.10497998408410159,"6647":-0.21157455649246648,"6648":-0.06603523929957145,"6649":-0.15276922211849306,"6650":-0.10480926565336814,"6651":0.1228214889056403,"6652":-0.17428919395799344,"6653":-0.41545272977919934,"6654":-0.19030664355290916,"6655":-0.14987928330238182,"6656":-0.2945367237702988,"6657":-0.1769372858257867,"6658":-0.09702667098687993,"6659":-0.16292156562770593,"6660":0.1685341090969369,"6661":-0.006409513783902795,"6662":0.07790147061737895,"6663":-0.0012945736879800592,"6664":-0.24038659127819131,"6665":-0.2649808063308006,"6666":-0.18422215417596116,"6667":-0.17106908566581633,"6668":-0.1354981131110745,"6669":0.1065743055217296,"6670":0.22022915060120885,"6671":-0.3401651320673465,"6672":-0.07143673263118523,"6673":-0.121766376988601,"6674":-0.2331212873682675,"6675":-0.14664496508618588,"6676":-0.12437314076231228,"6677":-0.1480312672492994,"6678":-0.10978316677599453,"6679":-0.06124542299814355,"6680":0.39595377596143505,"6681":0.048855714700538844,"6682":-0.24992120774479334,"6683":-0.24687767882634187,"6684":-0.16286061448979372,"6685":-0.08666638982879647,"6686":-0.1110411898059603,"6687":-0.004020004333977495,"6688":0.1488146315021669,"6689":-0.1550274335345857,"6690":-0.26516246004847394,"6691":-0.2191996572889733,"6692":-0.21821711718534897,"6693":-0.1906126535166,"6694":-0.2013031871961918,"6695":-0.10699864806547968,"6696":-0.48541257997915177,"6697":-0.07666938321306388,"6698":-0.08092221461580379,"6699":-0.19248454457103487,"6700":-0.26863530983958767,"6701":-0.21208459287477016,"6702":-0.19349466584632327,"6703":-0.1917089348472374,"6704":-0.10119187120651599,"6705":-0.08161115161953014,"6706":-0.18690000874204618,"6707":-0.13880605436742913,"6708":-0.06978740668046107,"6709":-0.10020233811950281,"6710":-0.2061872065117908,"6711":-0.20980436923131926,"6712":-0.12660088529937985,"6713":-0.060443289619251016,"6714":0.09846460457776288,"6715":0.1798141987476274,"6716":0.16514231104942687,"6717":-0.2808495427738078,"6718":-0.22312914076055684,"6719":-0.27642488023196465,"6720":-0.17533081603099665,"6721":-0.08097022418198448,"6722":-0.15950816100511278,"6723":-0.09738886534624273,"6724":-0.030014951763205577,"6725":-0.2112300073533552,"6726":-0.052404265858483526,"6727":-0.16666279631985756,"6728":0.016082920221099493,"6729":0.022392441779755936,"6730":-0.07130024632605872,"6731":0.028714854213923086,"6732":-0.17845157109716187,"6733":-0.2565429772836881,"6734":-0.0199872001564624,"6735":-0.01188788242830014,"6736":-0.17819181079327462,"6737":-0.1790573443831361,"6738":-0.14754995033994575,"6739":-0.049195104401587704,"6740":-0.09368312316438046,"6741":-0.09258321522894561,"6742":-0.2381604431178529,"6743":-0.10436161727598638,"6744":-0.07407247420064593,"6745":-0.13693015316892848,"6746":-0.11537791696559295,"6747":-0.04958060458798217,"6748":-0.11058237232192482,"6749":-0.04377370470393494,"6750":-0.08559610267666365,"6751":-0.11279012362724426,"6752":-0.1577077135579436,"6753":-0.04263375205146253,"6754":-0.02662203039590485,"6755":-0.120825122582344,"6756":-0.1030061254327932,"6757":0.006810790467644624,"6758":-0.08565517726237688,"6759":-0.16555716430891607,"6760":-0.07071872096310332,"6761":-0.11412112003582177,"6762":0.27439669826813023,"6763":0.020533044625162252,"6764":-0.06878232578145883,"6765":-0.026898223065751056,"6766":-0.036877966328256045,"6767":-0.11580282594461133,"6768":-0.18760769558615636,"6769":-0.026254856896556874,"6770":-0.21460452074537878,"6771":-0.14153371288458577,"6772":-0.007968444248909596,"6773":-0.1036646026828313,"6774":-0.1504813235539612,"6775":-0.20538807371168713,"6776":-0.06701536933228167,"6777":-0.39061851242690093,"6778":-0.07861322000618828,"6779":-0.1943963041446424,"6780":-0.017756068375928635,"6781":-0.09198318734103607,"6782":-0.09122227655295645,"6783":-0.10905059976233304,"6784":-0.1127200927226743,"6785":-0.04590489025180027,"6786":-0.1859721313354124,"6787":-0.20170637540115355,"6788":-0.1989643616703777,"6789":-0.005740679622470637,"6790":-0.045441963540335216,"6791":-0.14882207257278912,"6792":-0.11560360688463124,"6793":-0.032369369824795276,"6794":-0.0017597314476052103,"6795":-0.21207512840769185,"6796":-0.15140361912476574,"6797":-0.14527710998249616,"6798":-0.2032654546008721,"6799":-0.20472180949848218,"6800":-0.1132877286549233,"6801":-0.0987052828728101,"6802":0.004913037907829272,"6803":-0.13088036939046108,"6804":-0.25244353588521334,"6805":0.05321652039018524,"6806":0.1504803126975263,"6807":0.18784556618074977,"6808":-0.054845096604206126,"6809":0.32627386537200564,"6810":0.1648941609270145,"6811":0.33354345223072146,"6812":-0.31704114114159143,"6813":0.01620245272144491,"6814":-0.05773745526883937,"6815":-0.025589584108873093,"6816":0.11472007439954171,"6817":-0.16156189049263028,"6818":0.07872218975371559,"6819":-0.0646946355438945,"6820":-0.1713846825141165,"6821":-0.020287008170587588,"6822":0.6796218300743148,"6823":-0.15153922255146,"6824":0.27100796278793526,"6825":0.33909405523811226,"6826":0.5171626606526526,"6827":-0.17300851088944022,"6828":0.29237748732007074,"6829":-0.3577649178480613,"6830":-0.1119332001500764,"6831":-0.2041673003553226,"6832":-0.2954784156291014,"6833":0.139864509819525,"6834":-0.16528677704890807,"6835":-0.34131118360029733,"6836":0.3617612065614335,"6837":0.12760554299964205,"6838":0.19089594457613066,"6839":0.21389613792800868,"6840":-0.3206543700203338,"6841":0.8234850365003819,"6842":0.17153734645531635,"6843":0.2339880873319533,"6844":-0.1824566142383777,"6845":0.17355064834685527,"6846":0.061367747638532213,"6847":0.524408083932436,"6848":0.05426093189521516,"6849":0.4139970437472723,"6850":0.30386091985340463,"6851":-2.1296474739763576,"6852":-0.7074524357403474,"6853":-0.737607872635513,"6854":-0.09312359437412351,"6855":-0.17640909932878804,"6856":0.2676803846167636,"6857":-0.03509120072495251,"6858":0.35336982497795927,"6859":-0.8643411440870683,"6860":-0.12013159520050759,"6861":0.061338331359548255,"6862":-0.1332239855444088,"6863":0.11733873571430645,"6864":0.08822505562273446,"6865":-0.07602177495473038,"6866":0.13103361068545627,"6867":0.45264830085112207,"6868":0.16874586458682658,"6869":0.2062114974546592,"6870":-0.06456550288621642,"6871":0.0895810318958151,"6872":-0.43387196275674583,"6873":-0.3368813044727486,"6874":-0.11216559315427137,"6875":-0.397884687405245,"6876":-0.08409866923810731,"6877":-0.09456072930572239,"6878":-0.22334327888002414,"6879":0.19307758430309377,"6880":-0.1358071799802262,"6881":0.2152908441616278,"6882":-0.4343784520023529,"6883":-0.0033042309128835465,"6884":0.2352048593489825,"6885":-0.5980655682534216,"6886":0.08987134594180098,"6887":-0.05520462389026581,"6888":-0.6209211669644253,"6889":0.15643767682235177,"6890":0.223457373652934,"6891":0.20988656977444545,"6892":-0.14355271428805724,"6893":-0.18858771943632693,"6894":-0.3092375873119692,"6895":0.2905382763710027,"6896":0.6109398645227092,"6897":-0.14122758018353232,"6898":-0.26408795795267426,"6899":-0.20278754145701486,"6900":0.12575883279596872,"6901":0.2792050963291357,"6902":0.19323821261490648,"6903":-0.24590210466868287,"6904":0.36340165214354564,"6905":0.9848987390554172,"6906":0.046035473188973164,"6907":0.4773517078524659,"6908":0.0859533383679764,"6909":-0.2835927311985163,"6910":-0.1108895290673855,"6911":-0.05048075128319376,"6912":-0.2972547602343471,"6913":-0.017806512539656396,"6914":5.8419004504619725,"6915":2.978153307960591,"6916":-0.6930121230397908,"6917":0.28165284012102676,"6918":-0.2187227414743856,"6919":-0.3844172962967636,"6920":-0.5948759059855568,"6921":0.0817267825563223,"6922":0.5997768964779202,"6923":0.22491732364165573,"6924":0.06063498180456574,"6925":0.5912750968151855,"6926":-0.3845613390704573,"6927":0.2299608416601242,"6928":-0.11818392203579246,"6929":-0.08423163559788781,"6930":0.11485270144415638,"6931":0.01282173760302218,"6932":0.09346353922524962,"6933":0.017243143109838554,"6934":-0.6878331327014755,"6935":-0.26824209340898,"6936":0.28495673221575474,"6937":-0.16882532182371413,"6938":-0.3801477102002507,"6939":-0.4206190041289444,"6940":-0.3282203040883276,"6941":0.12753813025070052,"6942":-0.3874118228802851,"6943":0.04885238628322387,"6944":-0.3508044260828437,"6945":0.14563374118014596,"6946":0.14202590090120346,"6947":0.09872263434273085,"6948":-0.011367703808916833,"6949":-0.30928628047747303,"6950":0.47682622641708966,"6951":-0.12238533906876946,"6952":0.1411269069014489,"6953":-0.12052029042436352,"6954":-0.05682884294622891,"6955":-0.0778421351095688,"6956":-0.5056036964836873,"6957":0.2573278626638641,"6958":-0.533201655524512,"6959":0.2849100646704055,"6960":-0.15117138647163392,"6961":-0.38246019737351933,"6962":-0.6767033803021387,"6963":0.27567159086069093,"6964":-0.3315042093202286,"6965":-0.3018184845477609,"6966":-0.0016307366027366555,"6967":0.3738946986880683,"6968":-0.23115422115138487,"6969":0.1354756901320715,"6970":-0.29682350619491615,"6971":-0.123255324126717,"6972":0.26044525514203937,"6973":-0.010763999172625488,"6974":-0.019505005711229227,"6975":-0.04729736885499143,"6976":-0.011413403650416222,"6977":0.08347583187891264,"6978":-0.21487409826058884,"6979":-0.1855563137447877,"6980":-0.2590241117006995,"6981":-0.20358113086631577,"6982":0.35595182416874666,"6983":0.02067652972457392,"6984":-0.15309151383803643,"6985":-0.07056872229870327,"6986":-0.06021748296666813,"6987":-0.3550078541982647,"6988":0.11685059326294701,"6989":-0.1753917884200204,"6990":-0.1319762130771385,"6991":0.20882505641254842,"6992":0.037835541690962766,"6993":0.12246274781680425,"6994":-0.04715603083564778,"6995":-0.26415217146527625,"6996":-0.07559631306921351,"6997":0.25890093293133976,"6998":0.02901584419468304,"6999":0.10798317868374274,"7000":-0.033957570526157256,"7001":-0.15027887548490587,"7002":0.18281517001467046,"7003":-0.5002562425529429,"7004":-0.4024448449173948,"7005":0.20642371658601283,"7006":0.14097187852430088,"7007":-0.05399392564947803,"7008":0.2557318736042265,"7009":-0.009563489012128081,"7010":0.19363752650742605,"7011":-0.2682255675032975,"7012":0.12227772870455342,"7013":-1.128889107298628,"7014":-1.295688817780956,"7015":-0.8514688334419392,"7016":-0.2733079711260269,"7017":-0.21459119886309735,"7018":-0.07928651177878997,"7019":0.16734936027540406,"7020":0.2708867319620715,"7021":0.1847622050942797,"7022":0.016416120295593677,"7023":-0.4605673301709854,"7024":-0.10457743376992445,"7025":-0.29674795545676486,"7026":0.058653008138479824,"7027":0.0183915756214942,"7028":0.1436939868292307,"7029":0.09729699064934956,"7030":-0.11462697857710306,"7031":-0.09181490914526397,"7032":0.04050449661911449,"7033":0.0014876196306076283,"7034":0.008932514029048664,"7035":0.3219397926814843,"7036":-0.05153917138790268,"7037":0.12207125384571164,"7038":0.16574778841951956,"7039":0.0747647780283239,"7040":0.20998722675640716,"7041":-0.42185353501862954,"7042":0.1500288415784341,"7043":0.14195840090374157,"7044":-0.17609509037455198,"7045":0.37663468848190046,"7046":0.23495760044434283,"7047":-0.15022422548626024,"7048":0.38492431640277147,"7049":0.3946897431697885,"7050":0.014535211365501271,"7051":-0.043666262981530514,"7052":-0.40881792019214613,"7053":-0.07238713666652447,"7054":-0.155043481630626,"7055":0.10912787569607192,"7056":-0.28267106567937417,"7057":-0.34438006372939656,"7058":0.1967884106355385,"7059":0.0942355313549239,"7060":-0.024303386160346274,"7061":0.5601429291076463,"7062":0.36980428102895896,"7063":0.21892918816353135,"7064":-0.08529877400534161,"7065":0.05553738828868037,"7066":0.03784650144097277,"7067":-0.4717321016332563,"7068":-0.10621438564320755,"7069":-0.05123936294761662,"7070":-0.19735832121133137,"7071":-0.04956691707124353,"7072":-0.21267160788901915,"7073":-0.03121403691120325,"7074":-0.09132698629233182,"7075":-0.1657038476408882,"7076":0.1656249790221542,"7077":0.10343496237873982,"7078":0.2796417285937212,"7079":0.397193305190151,"7080":0.5634379410422843,"7081":0.2672170981156129,"7082":-0.18129419126766136,"7083":-0.23695152547846163,"7084":0.5043908107756987,"7085":0.27635908760083017,"7086":0.33216925669795044,"7087":0.5343951879371097,"7088":0.17290455398622193,"7089":0.5273761544864711,"7090":-0.27367554971461866,"7091":0.16528401871810294,"7092":-0.1729011943538165,"7093":-0.12737222455954647,"7094":0.019379548740918014,"7095":0.9970768266300752,"7096":1.0322949172706382,"7097":1.2603453318615199,"7098":0.8659747406772106,"7099":0.565234848613827,"7100":0.14501945016854287,"7101":-0.03824767650033005,"7102":-0.07623811201493816,"7103":-0.027503628805586777,"7104":-0.03532876984707256,"7105":0.15366229475091817,"7106":-0.1618396662146112,"7107":-0.08294869202579122,"7108":-0.06701465652671312,"7109":0.2653220359838016,"7110":-0.1580068880751004,"7111":0.13964921474870245,"7112":0.12323402229850496,"7113":-0.02697792961696297,"7114":-0.008722416787803087,"7115":0.014135036716363689,"7116":0.4928181396596489,"7117":-0.18617667949941535,"7118":-0.23203817944195743,"7119":-0.2264608377348281,"7120":-0.3964443366091001,"7121":-0.3000448050847109,"7122":-0.2704293805753138,"7123":-0.07468713957658397,"7124":-0.1799236118199201,"7125":-0.14542573973550585,"7126":-0.2619681148297777,"7127":-0.27726666005314227,"7128":-0.03795693846717006,"7129":0.09231389538337617,"7130":-0.18743247674072042,"7131":-0.04353242546229691,"7132":-0.16529044948956867,"7133":-0.06727904995516791,"7134":-0.01774433110765454,"7135":-0.10546356857132132,"7136":-0.03483603354571182,"7137":-0.09867467908267427,"7138":-0.23138827234012627,"7139":-0.0606737153135286,"7140":-0.04331439267862708,"7141":-0.1549675278618734,"7142":-0.19267132331884446,"7143":-0.13312140787444682,"7144":-0.04050749222290642,"7145":-0.11458349669412861,"7146":-0.0104615885525698,"7147":-0.15255451313470741,"7148":-0.000856288633244944,"7149":-0.05315786163242191,"7150":-0.1641687719756673,"7151":-0.13127490884558304,"7152":-0.06787757280175603,"7153":-0.13363129544516705,"7154":-0.08486397618288759,"7155":-0.03805683069038988,"7156":0.013282874127667814,"7157":-0.16641749453244792,"7158":-0.026053125737997743,"7159":-0.07354848470022121,"7160":-0.14639938773598227,"7161":-0.10919547082338632,"7162":-0.04124303628468637,"7163":-0.09796954324764075,"7164":-0.1405690346961312,"7165":-0.05543114670774338,"7166":-0.023724159536809328,"7167":0.11577449354542116,"7168":-0.06036052443264912,"7169":-0.0972652270919427,"7170":-0.07353955172857773,"7171":-0.035835975137855976,"7172":-0.13612373405253536,"7173":-0.12137621886993558,"7174":0.009665678111680303,"7175":-0.20042652636441546,"7176":-0.18720507695113445,"7177":-0.0667164463309029,"7178":-0.15449082786133309,"7179":-0.15886799127324439,"7180":-0.17131003531239192,"7181":-0.08102648279198624,"7182":-0.4505282154553958,"7183":-0.09388747670793747,"7184":-0.18494940364970694,"7185":-0.06940409811461176,"7186":-0.143670454096985,"7187":-0.11602342750708973,"7188":-0.1252556018512126,"7189":-0.15805491552510328,"7190":-0.0402810656521735,"7191":-0.18401179069187729,"7192":-0.16903813319769986,"7193":-0.14391426459323461,"7194":-0.058672458758837184,"7195":-0.0751246824058369,"7196":-0.15234284299111026,"7197":-0.15890346730659943,"7198":-0.05218698658594708,"7199":-0.02236902108383373,"7200":-0.1316689973582296,"7201":-0.07076159520811204,"7202":-0.04446280606738192,"7203":-0.19713536538490656,"7204":-0.20513017296687486,"7205":-0.14891620215338752,"7206":-0.11166526480593883,"7207":-0.014425980363030461,"7208":-0.15039036861855903,"7209":-0.22316634416932177,"7210":-0.2377899413715413,"7211":-0.09727763914940293,"7212":-0.0750274346147547,"7213":-0.0891945503625477,"7214":0.38072268694349726,"7215":0.003879527898791771,"7216":-0.43522412151370254,"7217":-0.0032197134618272153,"7218":-0.26372183099882934,"7219":0.3382900906814447,"7220":-0.13003444442940626,"7221":0.5547532027140784,"7222":0.060819823540404695,"7223":0.027877297959941302,"7224":0.2721638804661298,"7225":-0.07131260421630113,"7226":-0.2639074795347601,"7227":-0.19523065471265197,"7228":-0.0594133774246402,"7229":-0.25621417863600926,"7230":-0.21098405885432636,"7231":0.2954696850846759,"7232":0.6130850437911155,"7233":0.4438329918510227,"7234":-0.399784337450164,"7235":-0.17976364322720068,"7236":-0.03692760804517168,"7237":0.0905423066350464,"7238":0.4059059357162361,"7239":0.1858929503701926,"7240":-0.10890503407141915,"7241":0.11682235880734342,"7242":-0.4357844979620431,"7243":0.11384562882873353,"7244":-0.05984607223440122,"7245":0.1290288117791131,"7246":2.1496772667308135,"7247":0.6478531503958125,"7248":0.34123861368351915,"7249":0.3068378478015848,"7250":0.26368039097335316,"7251":-0.27328107932995044,"7252":-0.10662808338066396,"7253":-0.1936247324103796,"7254":0.0024337873861819586,"7255":0.11808087079152292,"7256":-0.4915837295819111,"7257":0.22230015663341993,"7258":-0.4031705393933159,"7259":0.28447380832690056,"7260":-0.13573092544410031,"7261":-0.345244140403872,"7262":-0.48382829072250355,"7263":-0.2810670347655961,"7264":0.06185889442391532,"7265":0.19616870978752843,"7266":0.17842444666962073,"7267":-0.2354025925528305,"7268":-0.11458597605519151,"7269":-0.3287247360126062,"7270":-0.21729715063853755,"7271":-0.1071856984610801,"7272":0.22446541830227887,"7273":0.42163655447906406,"7274":0.001002916345474568,"7275":0.2976020987692273,"7276":-0.06522587077336456,"7277":-0.23183121628453685,"7278":0.3516002868891663,"7279":0.5351466960505453,"7280":0.10179874335733975,"7281":-0.07851459810211159,"7282":-0.30930749481144465,"7283":-0.13038857259096184,"7284":-0.48300469225785114,"7285":-0.5268281881307313,"7286":-0.16032515087229626,"7287":-0.09011130796631153,"7288":0.02015438923764801,"7289":-0.7276895395757749,"7290":0.08114256285926871,"7291":0.015524435406432672,"7292":0.04859945658743195,"7293":-0.09674805665790263,"7294":0.07222851808811658,"7295":0.0654667809381427,"7296":-0.026982964006134803,"7297":0.05868797330797838,"7298":0.052308028983191174,"7299":0.018588338742093008,"7300":0.030603606793069307,"7301":-0.1422759784978545,"7302":0.04304646801489162,"7303":0.04091651912706161,"7304":-0.06025765734052784,"7305":0.09903878310836235,"7306":-0.044198142270021,"7307":-0.07180785025257859,"7308":0.007960361714508646,"7309":-0.007580567560344169,"7310":-0.05442988459128519,"7311":-0.05968771798857793,"7312":-0.03823691259386557,"7313":0.015547118658406056,"7314":0.17601927927411232,"7315":-0.039463317116634984,"7316":0.00818306577347104,"7317":-0.046300423423782905,"7318":-0.04277664532272636,"7319":0.06716196337576626,"7320":0.22898470851437322,"7321":0.3802557911150916,"7322":0.2170040350423382,"7323":0.23229070592214976,"7324":0.07460952438330826,"7325":0.20522798735770337,"7326":0.05849844474553823,"7327":0.378644585411483,"7328":0.19409192199927702,"7329":0.34383927077048665,"7330":0.1995858370967168,"7331":0.23921243514897034,"7332":0.09280999931959809,"7333":0.0010301569225063141,"7334":-0.020720422432228894,"7335":0.04957014535857342,"7336":0.019290858707932748,"7337":0.03382337068533778,"7338":0.10875857139560118,"7339":0.10328695305278492,"7340":0.13569582867988222,"7341":-0.08463679143967774,"7342":-0.10805548725910569,"7343":-0.07563631024114818,"7344":0.010273149076588686,"7345":0.036110324240475423,"7346":-0.022602218092947452,"7347":-0.00648214364544187,"7348":-0.017853787136469464,"7349":-0.010632052926534049,"7350":-0.02244711701787761,"7351":-0.07186929417919595,"7352":0.014582838329867207,"7353":-0.038987082831415325,"7354":-0.026737111251929763,"7355":0.017308393791538392,"7356":0.06056873920586615,"7357":-0.02669560813842153,"7358":0.12594113914047644,"7359":-0.011513044241332364,"7360":0.048582832195105986,"7361":0.0028793428644967693,"7362":-0.0385016745155478,"7363":-0.06263893373165035,"7364":-0.0840410075551727,"7365":-0.02667910018465699,"7366":-0.030375096335314915,"7367":0.013500279661525989,"7368":0.01743564648299434,"7369":0.0007971416828153083,"7370":-0.09258215514959886,"7371":0.6946217091956561,"7372":0.3103333306894,"7373":0.38682932919960045,"7374":0.35392611029111565,"7375":0.06931113168333554,"7376":0.13889081142891435,"7377":0.12117524260562863,"7378":-0.010415241602959133,"7379":0.1870087573592095,"7380":0.43358209315705304,"7381":0.18421920752643162,"7382":-0.21699632321700307,"7383":0.005090406556803149,"7384":-0.2594991515392656,"7385":0.012145366958924273,"7386":0.016932029227091586,"7387":0.2717213728948658,"7388":-0.0423703512705851,"7389":0.3708600032424468,"7390":0.42287799779684926,"7391":0.3422215304515393,"7392":-0.14711888359168934,"7393":0.5634740523964705,"7394":-0.23557933386632604,"7395":0.005419495462249461,"7396":0.2699321281924584,"7397":-0.051554692284101734,"7398":0.061932108227126574,"7399":-0.19292181851787543,"7400":-0.6894013750143507,"7401":-0.001074607180570732,"7402":0.6469634383250212,"7403":0.20141872136576042,"7404":0.21332309802817148,"7405":0.015416104670452388,"7406":0.269491232372753,"7407":0.6666880439195645,"7408":0.4157646143269577,"7409":0.27213360612728704,"7410":0.26401798326034953,"7411":-0.2826976886761611,"7412":0.34088526275181485,"7413":0.10172763167036972,"7414":0.30182368755614325,"7415":0.7820730911986118,"7416":0.049104604582771244,"7417":0.20954410930034378,"7418":-0.26598643403015537,"7419":-0.18364371005189345,"7420":-0.49382534056420185,"7421":0.17468356372525665,"7422":0.460169186833004,"7423":0.18028579918732707,"7424":-0.10918323352842825,"7425":0.23455710804190927,"7426":-0.11092997631027186,"7427":0.35870836528209316,"7428":0.3503198688007727,"7429":-0.2762652980304028,"7430":-0.0718363139408155,"7431":0.5865324935343401,"7432":-0.11228933274825587,"7433":0.1907842572770679,"7434":-0.264940505251063,"7435":0.31116662405863926,"7436":0.06806195727208332,"7437":-0.16153089940401133,"7438":-0.16409135916010117,"7439":0.027122452649965288,"7440":0.30251827543248366,"7441":0.09321471624152375,"7442":0.5449773767350816,"7443":0.29225248609859433,"7444":0.7838219149841185,"7445":0.4647998204452215,"7446":-0.3203867963817079,"7447":0.3243168409728081,"7448":-0.04548736920007184,"7449":-0.09799389345922027,"7450":0.0015150245023462575,"7451":-0.0028949132603290607,"7452":0.3822275539534639,"7453":-0.21391366770020254,"7454":-0.25524204061245354,"7455":-0.20282244101236263,"7456":0.151766378195891,"7457":0.1824043931983653,"7458":-0.5118383313158763,"7459":-0.24022804783415946,"7460":-0.41797865072684764,"7461":0.06825407316964277,"7462":0.2476511960032553,"7463":0.19848618041617616,"7464":0.08617393240703969,"7465":0.35392846996458965,"7466":0.1392739335579062,"7467":0.10694912440596317,"7468":-0.016383173447348034,"7469":-0.1813647956114101,"7470":-0.16586550818205037,"7471":0.23213070769475347,"7472":0.3991196079048772,"7473":-0.12389391075295374,"7474":0.28301777951855367,"7475":-0.1367813929608063,"7476":-0.46888351224110986,"7477":-0.2880130438472928,"7478":-0.005391117723531495,"7479":-0.26810529828301044,"7480":0.24478783987020317,"7481":-0.3983965378860516,"7482":1.1904982409088551,"7483":-0.6691739195918958,"7484":-0.5665106704758092,"7485":-0.06406468841027967,"7486":-0.4660171762171745,"7487":0.39488071113239515,"7488":-0.06342297255405709,"7489":-0.12496387619754187,"7490":-0.7269421838128138,"7491":-1.3509064908708583,"7492":-4.669459952057946,"7493":-3.0359981445019515,"7494":-1.1784439011455008,"7495":0.0405686176485984,"7496":0.2572290599398123,"7497":0.7432680575674929,"7498":0.12334638072981008,"7499":0.2856403835717169,"7500":0.986724598190174,"7501":-0.1684469250072959,"7502":0.05095940676207588,"7503":-0.3520925478708294,"7504":-0.038842697340807385,"7505":-0.1264033707965952,"7506":-0.000537681022617252,"7507":-0.11679802679177767,"7508":-0.3511080570053648,"7509":0.6279242896859331,"7510":0.17138455272807943,"7511":-0.11495819860525827,"7512":-0.26172801991203415,"7513":-0.06275267186255572,"7514":-0.8450307673263222,"7515":-0.18100755845501373,"7516":0.27568024368136695,"7517":-0.07970281612130513,"7518":-0.13316191362594612,"7519":0.08507367297441787,"7520":-0.041101569129900775,"7521":0.05844505996236691,"7522":0.031135694129819952,"7523":0.3234417811405579,"7524":0.12990405230154944,"7525":0.23191239984365658,"7526":0.19414292678514777,"7527":0.029000066417431813,"7528":-0.38211972468810484,"7529":-0.032139126416458094,"7530":0.1182097352318871,"7531":0.13492366247664028,"7532":-0.534379185469391,"7533":-0.03138000783945767,"7534":-0.018294691300859513,"7535":0.09577455382131089,"7536":0.08762234719679442,"7537":0.03837655393786144,"7538":-0.2823365479255466,"7539":0.10726140862580617,"7540":0.1252631664634344,"7541":0.16756773407883027,"7542":0.012281250413107353,"7543":-0.019988606204451125,"7544":0.022178537544090528,"7545":0.030528649681228037,"7546":-0.09418173743471193,"7547":-0.15269447131603656,"7548":0.04973254890278639,"7549":0.08064037429484903,"7550":0.040465546725627986,"7551":-0.13543503350092156,"7552":-0.07036421173097412,"7553":-0.16661910644143266,"7554":-0.08721548038480276,"7555":-0.1383129069491682,"7556":0.08539716030969041,"7557":-0.030716128574421856,"7558":-0.01857219184510435,"7559":0.18621234306546505,"7560":-0.32514935609392837,"7561":0.08166584585699739,"7562":0.20595869967630143,"7563":-0.01517942777847524,"7564":-0.07334954720236564,"7565":-0.20481425942136178,"7566":-0.013093318104118633,"7567":-0.11936613805598925,"7568":0.03177910708756379,"7569":0.08655414374260317,"7570":0.37104165250302285,"7571":0.16439533723614785,"7572":-0.381397874275966,"7573":-0.3485201735619602,"7574":-0.18821901834223964,"7575":-0.30012313435029414,"7576":-0.017412476343680563,"7577":-0.013811400039023416,"7578":0.006767425039677915,"7579":0.02856699342069237,"7580":0.021091793229270822,"7581":-0.050866080177186364,"7582":-0.14597557645493936,"7583":-0.044997389913391944,"7584":-0.24523694224724246,"7585":0.15373658698915801,"7586":0.00342547921979289,"7587":0.3069958278634343,"7588":0.0711136766477886,"7589":0.021535358899111838,"7590":-0.14542193467234843,"7591":0.02606557773696481,"7592":-0.1473216845018554,"7593":-0.1629406793689751,"7594":-0.06491227389535247,"7595":-0.1550460940254169,"7596":-0.057302133313384275,"7597":0.15080809331008882,"7598":-0.04461065589569529,"7599":0.051921505886743664,"7600":-0.13256346341262878,"7601":0.033002823110099284,"7602":0.06635390886262486,"7603":-0.02342032752149074,"7604":-0.07121345992971496,"7605":0.022360099870906956,"7606":0.14818344182325044,"7607":-0.05282504613706349,"7608":-0.005621923976650145,"7609":-0.0025395715025456796,"7610":0.18797350269110702,"7611":0.07751104365605813,"7612":-0.04088750338234294,"7613":-0.04674952543678269,"7614":-0.14210020911579022,"7615":-0.15475909920734895,"7616":0.38978415534814914,"7617":-0.13837661609689972,"7618":-0.29030001961159907,"7619":-0.384837038923123,"7620":-0.010243032162717236,"7621":0.6417225348813518,"7622":-0.6194696276456494,"7623":-0.3610751269445774,"7624":-0.2959620896088944,"7625":-0.20718174016829713,"7626":0.6410360462927395,"7627":0.10576389752840164,"7628":0.0221739431475046,"7629":0.27832439884678756,"7630":0.4117461456940838,"7631":0.10045227581957888,"7632":-0.08419566305091454,"7633":-0.06923078487599912,"7634":0.436906889633982,"7635":0.4167127433729968,"7636":-0.03127914498745451,"7637":0.3657928274638783,"7638":0.43065640616936907,"7639":-0.08101511738632712,"7640":-0.0019903287877035677,"7641":0.5459053215631365,"7642":0.5783121630530548,"7643":0.2841480686152679,"7644":-0.8724734601796418,"7645":-1.1768070928262266,"7646":-0.7174946501917874,"7647":-0.005819286504114529,"7648":-0.15278449323741206,"7649":-0.41115366256724034,"7650":0.19747421902780204,"7651":-0.3093527593799788,"7652":0.6870755731337126,"7653":0.027500000607602847,"7654":2.6131962859425006,"7655":2.585436970800624,"7656":2.0708853373553353,"7657":1.3985561403415134,"7658":0.8735199999269415,"7659":0.2957734575785191,"7660":-0.18305530314719595,"7661":-0.17182432135708106,"7662":-0.7221357071866032,"7663":-1.2335047980732798,"7664":-0.7905768530591348,"7665":-0.02807345194213903,"7666":-0.38384115494096166,"7667":-0.11451353262872582,"7668":0.4968318412131756,"7669":0.04697833919168551,"7670":-0.10451623261561478,"7671":0.8431069847814889,"7672":0.24390874927426476,"7673":-0.13416390116622864,"7674":-0.5538270477696988,"7675":-0.29017310320452266,"7676":0.20060243083639226,"7677":-0.13052944798239194,"7678":0.19498990855314297,"7679":0.3601127223066765,"7680":-0.16627135765418363,"7681":0.12941281575761845,"7682":0.18586817501857883,"7683":-0.2827123930849555,"7684":0.40191999466803235,"7685":0.2719819523009794,"7686":-0.3003757229126644,"7687":0.007058254602121474,"7688":0.39546957891003326,"7689":0.7435489572314412,"7690":-0.19559722613600822,"7691":0.344989438822313,"7692":0.06305160150951418,"7693":0.09902293050493662,"7694":0.17760101338351045,"7695":-0.23249133299574767,"7696":-0.4170706238155932,"7697":-0.05844011428114256,"7698":0.12011624323341867,"7699":-0.4338974325906055,"7700":-0.2976546477176674,"7701":0.2340725713033927,"7702":0.08634959666381253,"7703":0.1512536506692333,"7704":-0.1733802667514957,"7705":-0.16835581269588223,"7706":-0.3235638166535283,"7707":0.09002618057325948,"7708":-0.048852528678007726,"7709":-0.10324235287299977,"7710":-0.015323684499448873,"7711":-0.09366042391894171,"7712":0.3469569655937055,"7713":0.19518731171272408,"7714":0.13077071054114056,"7715":0.257937067734056,"7716":0.22120475277024168,"7717":-0.06512050508183004,"7718":-0.3814170070681869,"7719":-0.0565887660221926,"7720":0.23244814385456228,"7721":0.000983904088477675,"7722":0.22315587840131354,"7723":0.10056144721321637,"7724":-0.3029702564444949,"7725":-0.28633722979113746,"7726":-0.2069389191032753,"7727":-0.4489092599964314,"7728":-0.3185760299891229,"7729":-0.28524164803435503,"7730":-0.2296931243855114,"7731":-0.0343863626987629,"7732":0.24077057037187377,"7733":0.5436596104725806,"7734":-0.6742344021917852,"7735":-0.7969094222245842,"7736":-0.6295925654460169,"7737":-0.17812416768288994,"7738":0.4214609605123659,"7739":-0.036555234404231626,"7740":0.122360871546861,"7741":0.042877089709989775,"7742":-0.22278609499739113,"7743":0.47319977602338376,"7744":-0.2946091908712905,"7745":-0.2892719225814914,"7746":-0.522704650406401,"7747":0.3099254301620171,"7748":0.21654245330761002,"7749":0.08124369796379943,"7750":0.1868667753707067,"7751":-0.145353335480728,"7752":0.2111814102609641,"7753":-0.10207876509601656,"7754":-0.14641769823610185,"7755":0.006635215019598692,"7756":-0.1189403268829472,"7757":0.5102729568740385,"7758":0.03239822954706915,"7759":-0.38716390457288535,"7760":0.42271698335517616,"7761":0.1382307122563614,"7762":-0.007232928875676686,"7763":0.33752376235024295,"7764":0.21466586811330143,"7765":-0.2555754683446953,"7766":0.255162772397162,"7767":-0.19875297723078342,"7768":0.11811830217447405,"7769":0.06520779705051924,"7770":0.16046496902868915,"7771":0.013758938418398163,"7772":0.02997707470003692,"7773":0.05657820652310749,"7774":0.16277125170533113,"7775":0.40451482196544597,"7776":0.06057149684037273,"7777":0.036934330998384786,"7778":-0.3683498438992989,"7779":-0.026376760563831356,"7780":-0.359875300074909,"7781":-0.06667099476066346,"7782":0.2140711497242972,"7783":-0.4165576309147789,"7784":0.35210863896477,"7785":-0.27596758612937494,"7786":0.3259940234039417,"7787":0.04837951631984685,"7788":-0.03168608655635848,"7789":-0.002918232958042779,"7790":0.055089875212068797,"7791":0.2260833513225818,"7792":0.39037194957391147,"7793":0.03115706040824838,"7794":0.623004464816352,"7795":0.07905391851418232,"7796":-0.4229371556968306,"7797":0.13869311806069243,"7798":0.1377274356515091,"7799":-0.7232449173257447,"7800":-0.05973557033532155,"7801":0.517195428225476,"7802":0.2312839754481278,"7803":0.1420694993064563,"7804":0.18443400425815662,"7805":0.10768827515959326,"7806":0.0815525274307716,"7807":0.361907506741263,"7808":-0.20765630416211536,"7809":0.06697670839084599,"7810":-0.22002648435737335,"7811":-0.12168836579410237,"7812":0.20399441490646633,"7813":-0.7713178847081444,"7814":-0.5151459405603109,"7815":-0.4933794289090934,"7816":-0.14265207646670228,"7817":0.09275619124612995,"7818":0.2487236647567158,"7819":-0.15739423577161288,"7820":-0.3263823062616805,"7821":-0.8036963483037034,"7822":-0.23126257157165295,"7823":-2.8991020691786766,"7824":-2.9745449641382,"7825":-0.8154603204345688,"7826":0.027876302027212967,"7827":-0.017939463668201615,"7828":-0.07910459900189407,"7829":-0.2916127302151044,"7830":0.13440170780797037,"7831":0.23596569795747344,"7832":-0.30797714819275684,"7833":-0.25928886509137344,"7834":-0.07225592287066727,"7835":-0.4939419611561586,"7836":0.3175574522771632,"7837":-0.17063374142584756,"7838":-0.3245724442831994,"7839":0.11310642675196292,"7840":-0.07920646473224559,"7841":0.14231299156997618,"7842":0.34918215688645915,"7843":-0.12814290554729393,"7844":0.5352907421509253,"7845":0.1029135107290085,"7846":-0.05375508818131082,"7847":-0.3410808228247542,"7848":0.16324790408282008,"7849":-0.19996185251517432,"7850":0.7635317285141209,"7851":-0.1126495313936129,"7852":0.3648924491042878,"7853":0.024479682474773463,"7854":0.07472236391696797,"7855":0.24860630346622356,"7856":0.21650083640016787,"7857":-0.014857513347431607,"7858":-0.22322472421878403,"7859":0.12927788715560823,"7860":0.011518297176164344,"7861":0.13798778023063002,"7862":0.1201197185718114,"7863":0.04035158550587069,"7864":0.09947383992969747,"7865":0.08665226641565038,"7866":0.012528194815704174,"7867":0.19701929213616934,"7868":0.1310567651719843,"7869":0.11256639838120362,"7870":0.12780499435913611,"7871":0.20493983698696694,"7872":0.12927868353733335,"7873":0.055464223822831955,"7874":0.13103691896557026,"7875":-0.03612905704137057,"7876":0.06410860943270619,"7877":-0.05588261728561615,"7878":0.016794084326176337,"7879":0.146063004217977,"7880":0.16488683015769987,"7881":0.09663980043250958,"7882":0.15647866863965484,"7883":0.12024369212972527,"7884":-0.024316657778894173,"7885":-0.13050686428789682,"7886":0.21963463999244412,"7887":0.05317316366063144,"7888":0.08604542530172106,"7889":0.17613240854586054,"7890":0.10510446649994655,"7891":0.06251508507872257,"7892":0.09413751964653387,"7893":0.1007684478656349,"7894":0.06583081313732193,"7895":-0.11736452162224108,"7896":-0.07260582411883634,"7897":0.14728584752082716,"7898":0.15859298084199916,"7899":0.08152456604337982,"7900":0.06681698148929778,"7901":0.10297454507327271,"7902":0.06669813942265108,"7903":-0.01546329831347222,"7904":0.1447749565167218,"7905":0.20142304196961114,"7906":0.13205407579060754,"7907":0.15923058323274633,"7908":0.14119144097183417,"7909":0.15311531791794897,"7910":0.08319335169633653,"7911":0.3958772833219962,"7912":0.06753004610198737,"7913":0.13045990201941668,"7914":0.13603097680393714,"7915":0.1904071306267004,"7916":0.14722789557660337,"7917":0.1353876874746868,"7918":0.17201370184339995,"7919":0.05460849802259846,"7920":0.14175481312333427,"7921":0.1417220295688671,"7922":0.13876317289300819,"7923":0.05471261606928295,"7924":0.0812476085864048,"7925":0.17229364220636875,"7926":0.16249347050612487,"7927":0.08521771109275562,"7928":0.05783931413030378,"7929":0.013634694760305774,"7930":-0.09108223733913852,"7931":-0.10843181357178368,"7932":0.20650890245312484,"7933":0.20188081702119814,"7934":0.19134593400216035,"7935":0.11208168327680186,"7936":0.06798379197877552,"7937":0.1380860321990391,"7938":0.8699090925603193,"7939":0.11764778378853363,"7940":-0.30701524289818416,"7941":0.19693814305647644,"7942":-0.058847908949006246,"7943":0.08743951800052514,"7944":0.12802189143531592,"7945":0.3965276461961373,"7946":0.5783077849764477,"7947":-0.3240895583323678,"7948":0.49463324113001655,"7949":-0.006157653997432913,"7950":0.16512034196943742,"7951":0.5523708260055192,"7952":0.22017429847295233,"7953":-0.29697827225469386,"7954":0.1386771892404671,"7955":0.05492699393980703,"7956":-0.08438234455567506,"7957":0.0242495761641706,"7958":0.9507264226471595,"7959":0.7740454178585685,"7960":-0.14983643269516903,"7961":-0.4803572412019053,"7962":-0.17329954297890116,"7963":0.4886223912951948,"7964":0.12941484383919608,"7965":0.1987005538436666,"7966":0.25613627198237376,"7967":0.5040610106979986,"7968":-0.19197695608339718,"7969":-0.2191529394856638,"7970":-0.3203144966556159,"7971":-0.31188176943934476,"7972":0.01680874571950326,"7973":0.5376007172490659,"7974":0.6517015032065715,"7975":-0.587072137473201,"7976":0.29957825681581074,"7977":-0.8280703302143643,"7978":-1.3364837358237114,"7979":-0.5133277236033519,"7980":-0.4407649691127917,"7981":0.13860451105895158,"7982":-0.14566892140336057,"7983":0.6476027364961457,"7984":0.688093993002784,"7985":0.09259978706911978,"7986":1.2229295035159389,"7987":0.9776606764454352,"7988":0.6489546703167399,"7989":0.7992416534366535,"7990":0.7419223225351893,"7991":0.566987818455858,"7992":-0.5962134676852751,"7993":0.09268093347111278,"7994":-0.0010692540419966917,"7995":0.3262281094265155,"7996":0.16845995164673874,"7997":0.2565540504702,"7998":0.7192210211327856,"7999":0.2524658143620397,"8000":0.4410233567775446,"8001":-0.19472595334097875,"8002":-0.11932965967289412,"8003":0.026253476667306788,"8004":0.38022171249247,"8005":0.5332057654303577,"8006":0.513753207475825,"8007":0.08367669836129309,"8008":-0.24851355799816865,"8009":0.1016173357664371,"8010":0.06291179797378393,"8011":0.5815015243401406,"8012":-0.6103013835309224,"8013":0.27634826883407126,"8014":-0.20663697607850678,"8015":0.2780879750939214,"8016":-0.5431291710862052,"8017":0.31367181312217834,"8018":0.3573013273913974,"8019":-0.005975144729136283,"8020":-0.14990785849052093,"8021":0.15762465477667253,"8022":0.03461473693885504,"8023":0.13541397836291344,"8024":0.08989323401348844,"8025":0.0033930505907056744,"8026":0.07850011094136172,"8027":0.07005759450430261,"8028":0.00039453447229616554,"8029":0.1369536477322449,"8030":0.10271540081435888,"8031":0.09321994607921154,"8032":0.14622825278823634,"8033":0.20018360632923965,"8034":0.12030683906200344,"8035":0.0787616894814726,"8036":0.1231133715540119,"8037":-0.036595502974481935,"8038":0.10904656866015065,"8039":-0.042893604189591664,"8040":0.04113752429614075,"8041":0.16345363627979942,"8042":0.1585152225937151,"8043":0.07292120903140559,"8044":0.15007915749741077,"8045":0.09123087564160495,"8046":0.009802932887452416,"8047":-0.04521425745625741,"8048":0.1853599413926225,"8049":0.04908165186046877,"8050":0.08264367361183007,"8051":0.15299407488716704,"8052":0.1407146778655192,"8053":0.038447735501559686,"8054":0.11240152121700533,"8055":0.12041735115188812,"8056":0.07644528419153067,"8057":-0.03289507290987308,"8058":-0.16673103716623464,"8059":0.10864774645462819,"8060":0.1247031288821481,"8061":0.05790621412626856,"8062":0.0511326092394944,"8063":0.09852121875115648,"8064":0.06651509795195407,"8065":-0.05363831114058193,"8066":0.15364661760874104,"8067":0.17014829116365598,"8068":0.13002061671826498,"8069":0.15946275783202657,"8070":0.14929655682235476,"8071":0.1531961407729386,"8072":0.07517522702759027,"8073":0.4040041737243596,"8074":0.11220366422475553,"8075":0.1851873381287579,"8076":0.06056168684013854,"8077":0.18356453172759638,"8078":0.10159986061708443,"8079":0.13327554270370717,"8080":0.16959086703956058,"8081":0.04741657901207269,"8082":0.13361277999989216,"8083":0.1362889105170136,"8084":0.12194942900782071,"8085":0.05043331221851173,"8086":0.07118763316198347,"8087":0.14752881900642628,"8088":0.18622763757560085,"8089":0.06275227297038437,"8090":0.03434485868712409,"8091":0.08646052246674457,"8092":0.01753366143977794,"8093":-0.018239683417350726,"8094":0.19920601808827132,"8095":0.21638964754748735,"8096":0.15781764008723453,"8097":0.10755999849604399,"8098":0.05790696801701104,"8099":0.10841716103136262}},{"n":100,"d":1,"w":{"0":-3.143990670965425,"1":-1.3263436191821965,"2":-1.1605358513278805,"3":-0.24575712468838665,"4":2.544346167099096,"5":-1.6251061366285842,"6":0.676827863012103,"7":0.6491972008818141,"8":0.340074324929986,"9":0.17049062129937181,"10":-2.642633890798738,"11":2.4590003670844434,"12":0.6522106351687753,"13":-0.6066026312664603,"14":0.5995267261624985,"15":-1.7262841869541163,"16":0.6736990907656238,"17":2.433991852609425,"18":-1.6702971551744188,"19":-0.24006137791124432,"20":1.8182707062729635,"21":1.446402526918696,"22":-1.1121296221484491,"23":1.1163006801358406,"24":1.268294726752579,"25":0.5127044437270608,"26":-0.5600881251071643,"27":-4.045923534579472,"28":-0.5306745410000184,"29":-0.6889207129376929,"30":0.9472079192316262,"31":1.181165372444732,"32":0.6388181449999758,"33":1.0922150708943033,"34":-0.687372187910036,"35":0.9197820088245406,"36":-1.6534303845475546,"37":-1.3212690174136368,"38":2.440298202487144,"39":-0.3986616035492734,"40":-1.0607551994856115,"41":-0.6673892430828755,"42":-0.9432544954158681,"43":0.6516416998259873,"44":-0.4773695117554146,"45":-1.3233658604260505,"46":1.0673134028882256,"47":-1.3047735658053046,"48":-0.5653688827436368,"49":0.4527637430691151,"50":-0.6405668103615828,"51":-2.020469963121994,"52":-1.1309247414861407,"53":0.546020869062605,"54":-4.733511248180275,"55":0.7241643177579546,"56":1.6371980999695894,"57":-1.076745383741979,"58":1.8316950011257478,"59":1.4432794661637502,"60":0.7335389628354732,"61":0.5050698711655299,"62":-1.5979488965616282,"63":-2.0076723128941305,"64":-1.2751906098452261,"65":1.1970019474583966,"66":0.6549900369121361,"67":1.0384942628981462,"68":-1.2735564089350722,"69":-2.031292478908095,"70":0.4487345609996787,"71":0.47423659601854434,"72":2.0567491007641054,"73":-1.1558690581430817,"74":-1.4913598277246463,"75":0.4180316974370283,"76":-2.3938907777402187,"77":-0.9976423060191517,"78":-1.3903674158026291,"79":0.5878296822429085,"80":-0.41275778012537223,"81":-1.5630845656484476,"82":-0.43341840906335866,"83":-0.7362817638244246,"84":1.354983606465637,"85":-1.9563700313100305,"86":1.0971039491390548,"87":-1.6819225725617615,"88":-0.5771703973958007,"89":-1.0806271779682743,"90":-0.8623176739140721,"91":-0.9823684929852812,"92":2.7196173302035844,"93":0.5761460899566969,"94":0.32092894363617747,"95":1.1820118618619164,"96":2.579312750697579,"97":0.4076689275979089,"98":-0.004226225985263626,"99":0.5089404866439392}},{"n":4,"d":100,"w":{"0":-0.6771900790498608,"1":0.34611924503101615,"2":-0.770265149035391,"3":-0.2550818894325779,"4":0.14350581790508177,"5":-0.5513067715664196,"6":-0.02773755555859674,"7":-0.044430898494471405,"8":0.2806074504863684,"9":0.029702449944862694,"10":-0.09927522149113978,"11":-0.40275399919451005,"12":0.04171952749779047,"13":-0.42552803419646307,"14":-0.2142881679149633,"15":0.10665193642275951,"16":0.019490112467745867,"17":0.020653004715919056,"18":-0.09711587534853652,"19":-2.0193001811986306,"20":0.16238490435923772,"21":0.36592230866238673,"22":-0.48402713856080987,"23":-0.18107871702271808,"24":0.4181839815190924,"25":-0.19827296325342017,"26":-0.6953221948892045,"27":-0.2029463432058384,"28":-0.3193463313448427,"29":-0.5766958279310661,"30":0.303897281639862,"31":0.22286429642791716,"32":0.5653461388532183,"33":0.5796606372815863,"34":0.09914714273545133,"35":0.6607561875965453,"36":-0.5685222155362144,"37":-0.02710814154140455,"38":0.4318154695830493,"39":-0.20027517370291206,"40":-0.05594394962522866,"41":-0.1439556376255112,"42":-0.22733830062732538,"43":0.05621532084220509,"44":0.1572364243700942,"45":-0.700093985446876,"46":-0.6896050875804813,"47":-0.3278717174685336,"48":0.0407288855871326,"49":-0.14376448328637118,"50":0.07263281049419067,"51":-0.2892658860329898,"52":-0.0894526547761643,"53":-0.08570273670822809,"54":-1.1699574925778196,"55":0.04651002141176045,"56":0.7090851927106766,"57":2.222819676167175,"58":-0.3959188921591575,"59":0.15123031897383324,"60":-0.03328265955726725,"61":0.08139725052413256,"62":0.12288042403341913,"63":-0.36550805570502076,"64":-0.2522733279465407,"65":-0.26768949205787324,"66":0.9482541650250004,"67":0.2058253606068101,"68":0.49933255602206156,"69":0.7183052242555931,"70":0.392689378304028,"71":-0.20339434255000743,"72":0.46038701944985516,"73":-0.45619916448788067,"74":-0.3701621140783886,"75":-0.14469290808764038,"76":-1.121544063334131,"77":-0.7708553365274751,"78":-0.5949391259071727,"79":-0.14056919468240958,"80":0.17936790589776397,"81":-0.6678604470422292,"82":0.2296257897555179,"83":-0.02550493770395194,"84":-0.2092456442720353,"85":-0.35994359426969486,"86":0.5092757853252361,"87":-0.448234944041361,"88":0.05502869860082073,"89":-2.381439747845737,"90":-0.2830370780891756,"91":-0.6374226516242218,"92":0.45469371732014346,"93":-0.14442393143864063,"94":-0.22866049940253852,"95":-0.2634488924997563,"96":0.6330417677562773,"97":-0.14518699810535513,"98":0.9592641241069075,"99":-0.0916522773245228,"100":-0.0220599179684069,"101":-0.19659990199954824,"102":-0.35077773224836617,"103":0.2588511677983889,"104":0.3857439444614374,"105":0.4808587331757586,"106":0.41825257576954683,"107":0.3177499618825735,"108":-0.42863853090746895,"109":-0.2804632835534081,"110":-0.22902318571857255,"111":1.4590104171163742,"112":0.5070463064768903,"113":-0.596057882362869,"114":0.39700278478544004,"115":0.522288636390055,"116":0.48369961721396887,"117":1.792823957328351,"118":-2.6041016882109234,"119":0.2792338988266014,"120":0.007065197494191077,"121":0.19123959593227485,"122":0.6957246643098248,"123":0.33158629334576617,"124":0.685333073630497,"125":0.5099070951301864,"126":0.49957586224519823,"127":0.07180550936463116,"128":0.07838970024359865,"129":0.3407434453470813,"130":0.27836983645636026,"131":0.2092984914113906,"132":0.47403992536404393,"133":0.7787405116470552,"134":-0.5804659130189881,"135":-0.24313025822339776,"136":-0.12954112404691343,"137":-0.6425490484731242,"138":-0.012709957573814946,"139":0.05526247330164642,"140":-0.8269589314051202,"141":-0.09064777506717446,"142":-0.699714950075474,"143":0.3709359535966301,"144":-0.48855936408730044,"145":-0.048205958187084993,"146":0.562415686962893,"147":-0.7887847682441118,"148":-0.4759873329879611,"149":0.4523911926443084,"150":-0.39696875213830723,"151":-0.0849598027712725,"152":-1.1378434092165752,"153":0.5366998378705279,"154":-0.2696578909187919,"155":0.4319346374589734,"156":0.37929358692695325,"157":-0.4038878322847902,"158":0.3961881318383243,"159":0.360777080587962,"160":0.35601488536000275,"161":0.6793528593799127,"162":-0.8926845409456672,"163":0.4532867526845881,"164":-0.26799750987148024,"165":0.5374031155234585,"166":-0.39863349181033675,"167":0.17579929774005792,"168":0.27264778024442204,"169":0.011161860279954762,"170":0.5609834926761124,"171":0.5005785306574901,"172":0.10554087069286107,"173":-0.4278991708807098,"174":-0.12017306831401392,"175":-0.6371056645272026,"176":-0.14087513044076935,"177":-0.676326084193363,"178":-1.2296923710628545,"179":0.41272023427245114,"180":-0.4040616352139529,"181":-0.8146909158501507,"182":-0.5431053286516158,"183":-0.46295765863827465,"184":-0.05095308117052383,"185":-3.1313488151348876,"186":0.0922254352623811,"187":-0.2316889282506366,"188":-0.51704457942888,"189":-0.384318137747281,"190":-0.07979257396539537,"191":-0.33451754711864395,"192":0.06608569067372771,"193":0.05449967997033402,"194":-0.5393364002936543,"195":0.01776627415318546,"196":0.11904855725285346,"197":0.5229996768613678,"198":-0.13530477591059842,"199":0.40069151884082505,"200":-0.6690879724294259,"201":-0.6612982617469438,"202":-1.0342721371526975,"203":-0.7762144332915486,"204":0.2679164053609654,"205":-4.992292614095216,"206":0.09387596282584806,"207":-0.20483407504248582,"208":0.3500053341119843,"209":-3.8608421888590905,"210":-0.2807375761524251,"211":0.16853866901016504,"212":0.2688192520302243,"213":-1.3801304261097254,"214":1.4371445445745226,"215":-0.8809539937718429,"216":0.16249797607360492,"217":-0.2079969237634646,"218":-0.3324758825890726,"219":0.38163680319720344,"220":-0.0881777002689548,"221":0.3045768873182821,"222":-0.5942738975453298,"223":0.5089686922105946,"224":0.2168530843209122,"225":1.2511554576657755,"226":-1.0031257515423413,"227":-1.4726883254621332,"228":0.687188036307093,"229":0.04001117825957049,"230":0.4885279526115144,"231":0.08106307317353086,"232":2.617572615039917,"233":0.2022283473153165,"234":0.34265163538591165,"235":0.989891370737312,"236":-0.3020474948239629,"237":0.5059194285378464,"238":0.5654224526501428,"239":0.20325787580872462,"240":-0.47955202999665103,"241":-0.6430897927805183,"242":0.06169536240110998,"243":0.12880779745793858,"244":-0.3381479985753477,"245":-2.501232661470865,"246":-0.005595441921087949,"247":0.19095879117768894,"248":-0.3793268216563576,"249":0.29437682952062766,"250":-0.08132448024268438,"251":-0.17677822531414988,"252":-0.060193749337039276,"253":0.39137139558403683,"254":-1.743884044874998,"255":0.18826521286682385,"256":-0.3157682625016909,"257":0.18227839712368601,"258":0.19584258271557006,"259":0.027436970588013282,"260":-0.020199012690468292,"261":0.7232590318332243,"262":-0.2672904287702747,"263":-0.6657717163955499,"264":-0.24934430787026846,"265":0.24878496137443445,"266":0.16320645913069076,"267":0.055252646237180125,"268":1.4901585812773672,"269":-0.44575540895764443,"270":1.037827216230012,"271":0.2826243557436419,"272":0.5912113315609518,"273":-2.449757850855284,"274":-0.4508909136514149,"275":0.3293380624548514,"276":-0.5482085242761765,"277":-0.666317927468225,"278":0.13408459809840897,"279":1.8226873401692831,"280":-0.988140801284537,"281":-0.20688535600381147,"282":-0.8778007960848896,"283":-0.12088722069258426,"284":0.07808791360210837,"285":0.29173652789763754,"286":0.032368035261757654,"287":-0.31788522575922695,"288":-0.2588881577171334,"289":-0.05507808501836446,"290":-0.03488491980946908,"291":-0.21485082519270743,"292":0.9129921411368377,"293":0.0532139685704354,"294":-0.8138789033700489,"295":0.1891565581829434,"296":0.10643913451580796,"297":0.40748797221494076,"298":-1.4578743414733397,"299":0.30179064761688495,"300":-0.026411772587979186,"301":-0.06302810283862775,"302":-1.5124787748600985,"303":-1.9455773637167144,"304":0.07773741913591413,"305":0.06726710841455644,"306":0.4524861626185147,"307":0.3400816506275274,"308":0.758772919047809,"309":0.5859856051078768,"310":-2.2866693821298716,"311":-0.03927829298563322,"312":0.5814378079317463,"313":-0.6788405141109439,"314":0.8165885984414923,"315":0.4914082798529795,"316":0.5685168584984016,"317":-0.03227859775661454,"318":0.022972991285018448,"319":0.6303763942274777,"320":1.5635685975287132,"321":0.23235663253044114,"322":0.028454427671557182,"323":-0.5477408837933585,"324":0.4712770802012105,"325":0.5676361482377842,"326":0.15747838509857623,"327":-0.050118340205992165,"328":-0.2567084077856497,"329":-0.21325319848722482,"330":0.7798659531380281,"331":0.22598441987318532,"332":0.7168634177427128,"333":-0.12307141885344342,"334":-0.4533320069276095,"335":0.21818924303654372,"336":-0.08265888141424238,"337":0.013704167904417246,"338":0.7104971460268502,"339":-3.1138635454444525,"340":0.0717368801299451,"341":-0.5173973403723725,"342":-0.12866458009169865,"343":0.48188300891475244,"344":-0.5282982052845681,"345":0.3014568615473201,"346":0.6977072697891231,"347":0.06737953868779982,"348":-0.6295941692521326,"349":0.35270164993056363,"350":-0.5692525460117372,"351":-0.7301436729110894,"352":-0.31801244107342264,"353":0.5918714740350979,"354":0.039782541345526515,"355":0.6198279118030852,"356":0.8620877226197959,"357":-0.5658666618546544,"358":0.7538117188703134,"359":0.4335157562482652,"360":0.5257201151758336,"361":0.30418932970083956,"362":-0.034341666427088816,"363":-0.24884164653277802,"364":0.043480494809408125,"365":0.14820342125307256,"366":0.8135642454660342,"367":-0.03312818133718182,"368":0.14226251928901287,"369":-0.9125593295523795,"370":0.3233484611477402,"371":0.45530696088844613,"372":-0.13220840406510512,"373":-0.3938277022851254,"374":-0.19843834120601486,"375":-0.2918030440096725,"376":-0.4857829763368753,"377":-0.004312979735248282,"378":0.08121617269597727,"379":0.8663002925951286,"380":-0.48399568245151703,"381":-0.47578389222033396,"382":-0.5489320706245997,"383":-0.6086524650900845,"384":1.1142041528069482,"385":-0.10934397099371426,"386":0.5875088894816937,"387":-0.43489198628325365,"388":-0.5658214969668625,"389":0.09286197935503918,"390":0.016709405160815594,"391":-0.5988531142163721,"392":0.09848671330945652,"393":0.051459081441511546,"394":-0.39445966725551945,"395":0.02178851867078041,"396":1.9688637358637364,"397":0.4966493599190441,"398":-0.6834118436384173,"399":0.4724636402961909}},{"n":4,"d":1,"w":{"0":-0.5040512494851767,"1":0.7967469901005727,"2":1.1127647112881558,"3":0.9610065035584683}}]}
/* harmony export (immutable) */ __webpack_exports__["a"] = data;



/***/ }),
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(22)
var ieee754 = __webpack_require__(27)
var isArray = __webpack_require__(24)

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "#info {\n    margin-right: 2em;\n    /*float: left*/\n}\n\n.InfectionGameHtmlTableRender {\n    /*float: left;*/\n    overflow: auto;\n}\n\n.InfectionGameHtmlTableRender table {\n    padding-right: 2em;\n    border-spacing: 0;\n    border-collapse:collapse;\n}\n\n.InfectionGameHtmlTableRender table td {\n    border: 0; /*For iphones*/\n}\n\n.InfectionGameHtmlTableRender > div {\n    float: left;\n    border-spacing: 0;\n    margin-right: 2em;\n}\n\n/*.InfectionGameHtmlTableRender table.renderer-table-canvas-agent {*/\n    /*padding: 10px;*/\n    /*background-color: black;*/\n/*}*/\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-god td {\n    height: 5px;\n    width: 5px;\n}\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-agent td {\n    height: 22px;\n    width: 22px;\n}\n\n#agentRendererContainer {\n    margin-top: 1em;\n}", ""]);

// exports


/***/ }),
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
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
/* 31 */
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
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Matrix__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__matrixMath__ = __webpack_require__(35);



function buildMatrices(inputSize, outputSize, hiddenLayerSizes) {
    var matrices = [];

    matrices[0] = new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](hiddenLayerSizes[0], inputSize); //Hidden layer weights
    __WEBPACK_IMPORTED_MODULE_1__matrixMath__["a" /* fillWithRandomValues */](matrices[0], 0, 0.01);

    matrices[1] = new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](hiddenLayerSizes[0], 1, 0, 0.01); //Hidden layer biases

    matrices[2] = new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](outputSize, hiddenLayerSizes[0]); //Output layer weights
    __WEBPACK_IMPORTED_MODULE_1__matrixMath__["a" /* fillWithRandomValues */](matrices[2], 0, 0.01);

    matrices[3] = new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](outputSize, 1, 0, 0.01); //Output layer biases

    return matrices;
}

/**
 * These output matrix's are reused which gives a 15% performance boost by avoiding array
 * instantiation.
 *
 * @param outputSize
 * @param hiddenLayerSizes
 * @returns {[*,*,*,*,*,*]}
 */
function buildOuts(outputSize, hiddenLayerSizes) {
    return [
        null,//Gets replaced by the input matrix later
        new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](hiddenLayerSizes[0], 1),
        new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](hiddenLayerSizes[0], 1),
        new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](hiddenLayerSizes[0], 1),
        new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](outputSize, 1),
        new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](outputSize, 1),
    ];
}

class NeuralNetwork {
    constructor(inputSize, outputSize, hiddenLayerSizes) {
        this.forward = this.forward.bind(this);
        this.backPropagate = this.backPropagate.bind(this);

        if (hiddenLayerSizes.length > 1) {
            throw new Error('Multiple hidden layers are not yet supported.');
        }

        this._matrices = buildMatrices(inputSize, outputSize, hiddenLayerSizes);
        this.outs = buildOuts(outputSize, hiddenLayerSizes);
    }

    forward(input) {
        this.outs[0] = input;

        __WEBPACK_IMPORTED_MODULE_1__matrixMath__["b" /* mul */](this._matrices[0], this.outs[0], this.outs[1]);
        __WEBPACK_IMPORTED_MODULE_1__matrixMath__["c" /* add */](this.outs[1], this._matrices[1], this.outs[2]);
        __WEBPACK_IMPORTED_MODULE_1__matrixMath__["d" /* tanH */](this.outs[2], this.outs[3]);
        __WEBPACK_IMPORTED_MODULE_1__matrixMath__["b" /* mul */](this._matrices[2], this.outs[3], this.outs[4]);
        __WEBPACK_IMPORTED_MODULE_1__matrixMath__["c" /* add */](this.outs[4], this._matrices[3], this.outs[5]);

        return this.outs[5];
    }

    backPropagate(outputError, alpha) {

        //Clear old deltas before starting. Re-using the same matrices (Float64Arrays) provides a 15% performance gain
        __WEBPACK_IMPORTED_MODULE_1__matrixMath__["e" /* clearDeltasInArrayOfMatrices */](this.outs);

        this.outs[5].dw = outputError.w;

        __WEBPACK_IMPORTED_MODULE_1__matrixMath__["f" /* backwardAdd */](this.outs[4], this._matrices[3], this.outs[5]);
        __WEBPACK_IMPORTED_MODULE_1__matrixMath__["g" /* backwardMul */](this._matrices[2], this.outs[3], this.outs[4]);
        __WEBPACK_IMPORTED_MODULE_1__matrixMath__["h" /* backwardTanH */](this.outs[2], this.outs[3]);
        __WEBPACK_IMPORTED_MODULE_1__matrixMath__["f" /* backwardAdd */](this.outs[1], this._matrices[1], this.outs[2]);
        __WEBPACK_IMPORTED_MODULE_1__matrixMath__["g" /* backwardMul */](this._matrices[0], this.outs[0], this.outs[1]);

        __WEBPACK_IMPORTED_MODULE_1__matrixMath__["i" /* updateValuesFromDeltasInArrayOfMatrices */](this._matrices, alpha);
    }

    toJSON() {
        return {matrices: this._matrices};
    }

    fromJSON(json) {
        for (var matricesI = 0, matricesCount = json.matrices.length; matricesI < matricesCount; matricesI++) {
            this._matrices[matricesI].fromJSON(json.matrices[matricesI]);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NeuralNetwork;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Matrix__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__arrayMath__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__random__ = __webpack_require__(9);



class Agent {
    constructor(numberOfStates, maxNumberOfActions, neuralNetwork, options) {
        var defaultOptions = {
            discountFactor: 0.75, // future reward discount factor
            randomActionProbability: 0.1,// for epsilon-greedy policy
            learningRate: 0.01,// value function learning rate
            experienceRecordInterval: 25,// number of time steps before we add another experience to replay memory
            experienceSize: 5000,// size of experience replay
            learningStepsPerIteration: 10,
            tdErrorClamp: 1.0
        };

        this._options = Object.assign(defaultOptions, options);

        this.numberOfInputs = numberOfStates;
        this.numberOfActions = maxNumberOfActions;

        this._neuralNetwork = neuralNetwork;
        this._lastActionStats = {
            action: 0,
            wasRandom: false,
            weights: new Float64Array(maxNumberOfActions),
            tdError: 0
        };

        this.exp = []; // experience records
        this.expi = 0; // where to insert new experience

        this.t = 0;

        this.r0 = null;
        this.s0 = null;
        this.s1 = null;
        this.a0 = null;
        this.a1 = null;
    }

    /**
     *
     * @param {Number} lastReward - pass null if this is the first step or you want to skip learning
     * @param {Array} currentObservation
     * @returns {*}
     */
    learnAndAct(lastReward, currentObservation) {
        var tdError = 0;
        if (lastReward !== null) {
            tdError = this._learn(lastReward);
        }

        // convert to a Matrix column vector
        var state = new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](this.numberOfInputs, 1);
        state.setFrom(currentObservation);

        let actionWasRandom = false;
        let actionWeights = null;
        let action;

        // epsilon greedy policy
        if (Math.random() < this._options.randomActionProbability) {
            action = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__random__["a" /* getRandomIntWithZeroMin */])(this.numberOfActions);
            actionWasRandom = true;
        } else {
            // greedy wrt Q function
            var actionMatrix = this._neuralNetwork.forward(state, false);

            actionWeights = actionMatrix.w;
            action = __WEBPACK_IMPORTED_MODULE_1__arrayMath__["a" /* getIndexOfMaxValue */](actionMatrix.w); // returns index of argmax action
        }

        // shift state memory
        this.s0 = this.s1;
        this.a0 = this.a1;
        this.s1 = state;
        this.a1 = action;

        var lastActionStats = this._lastActionStats;
        lastActionStats.action = action;
        lastActionStats.wasRandom = actionWasRandom;
        lastActionStats.weights = actionWeights;
        lastActionStats.tdError = tdError;

        return action;
    }

    getLastActionStats() {
        return this._lastActionStats;
    }

    _learn(r1) {
        // perform an update on Q function
        if (!(this.r0 == null) && this._options.learningRate > 0) {

            // learn from this tuple to get a sense of how "surprising" it is to the agent
            var tdError = this._learnFromExample(this.s0, this.a0, this.r0, this.s1);

            // decide if we should keep this experience in the replay
            if (this.t % this._options.experienceRecordInterval === 0) {
                this.exp[this.expi] = [this.s0, this.a0, this.r0, this.s1];
                this.expi += 1;
                if (this.expi > this._options.experienceSize) {
                    this.expi = 0;
                } // roll over when we run out
            }
            this.t += 1;

            // sample some additional experience from replay memory and learn from it
            for (var k = 0; k < this._options.learningStepsPerIteration; k++) {
                var ri = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__random__["a" /* getRandomIntWithZeroMin */])(this.exp.length); // todo: priority sweeps?
                var e = this.exp[ri];
                this._learnFromExample(e[0], e[1], e[2], e[3])
            }
        }
        this.r0 = r1; // store for next update
        return tdError;
    }

    _learnFromExample(s0, a0, r0, s1) {

        // want: Q(s,a) = r + gamma * max_a' Q(s',a')

        // compute the target Q value
        var tmat = this._neuralNetwork.forward(s1, false);
        var qmax = r0 + this._options.discountFactor * tmat.w[__WEBPACK_IMPORTED_MODULE_1__arrayMath__["a" /* getIndexOfMaxValue */](tmat.w)];//@TODO ROD NOTE - should we look more than one step ahead?

        // now predict
        var pred = this._neuralNetwork.forward(s0, true);

        var tdError = pred.w[a0] - qmax;
        var clamp = this._options.tdErrorClamp;

        if (tdError > clamp) {
            tdError = clamp
        } else if (tdError < -clamp) {
            tdError = -clamp
        }

        var outputError = new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](this.numberOfActions, 1);
        outputError.w[a0] = tdError;

        this._neuralNetwork.backPropagate(outputError, this._options.learningRate);

        return tdError;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Agent;
;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__arrayMath__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__testHelper__ = __webpack_require__(36);



__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__testHelper__["a" /* assertEquals */])(__WEBPACK_IMPORTED_MODULE_0__arrayMath__["a" /* getIndexOfMaxValue */]([1, 3, 4, 7, 2]), 3, 'arrayMath.getIndexOfMaxValue');


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__random__ = __webpack_require__(9);
/* harmony export (immutable) */ __webpack_exports__["d"] = tanH;
/* harmony export (immutable) */ __webpack_exports__["h"] = backwardTanH;
/* harmony export (immutable) */ __webpack_exports__["b"] = mul;
/* harmony export (immutable) */ __webpack_exports__["g"] = backwardMul;
/* harmony export (immutable) */ __webpack_exports__["c"] = add;
/* harmony export (immutable) */ __webpack_exports__["f"] = backwardAdd;
/* harmony export (immutable) */ __webpack_exports__["a"] = fillWithRandomValues;
/* unused harmony export updateFromDeltas */
/* harmony export (immutable) */ __webpack_exports__["e"] = clearDeltasInArrayOfMatrices;
/* harmony export (immutable) */ __webpack_exports__["i"] = updateValuesFromDeltasInArrayOfMatrices;
// Matrix utils
// fill matrix with random gaussian numbers


function tanH(m, out) {
    // tanh nonlinearity
    // var out = new Matrix(m.n, m.d);
    if (out.n != m.n || out.d != m.d) {
        throw new Error('Out should be ' + m.n + ' by ' + m.d + ' but is ' + out.n + ' by ' + out.d);
    }

    var n = m.n;
    for (var i = 0; i < n; i++) {
        out.w[i] = Math.tanh(m.w[i]);
    }

    // return out;
}

function backwardTanH(m, out) {
    for (var i = 0; i < m.n; i++) {
        // grad for z = tanh(x) is (1 - z^2)
        var mwi = out.w[i];
        m.dw[i] += (1.0 - mwi * mwi) * out.dw[i];
    }
}

/**
 *
 * Note: Re-using matrices (Float64Arrays) provides a 15% performance gain. This why "out" exists rather than returning
 *
 * @param m1
 * @param m2
 * @param out
 */
function mul(m1, m2, out) {//4.7 Float64Array
    if (m1.d !== m2.n) {
        throw new Error(m1.d + '!==' + m2.n);
    } else if (out.n != m1.n || out.d != m2.d) {
        throw new Error('Out should be ' + m1.n + ' by ' + m2.d + ' but is ' + out.n + ' by ' + out.d);
    }

    // var out = new Matrix(n, d);
    for (var i = 0; i < m1.n; i++) { // loop over rows of m1
        for (var j = 0; j < m2.d; j++) { // loop over cols of m2
            var dot = 0.0;
            for (var k = 0; k < m1.d; k++) { // dot product loop
                dot += m1.w[m1.d * i + k] * m2.w[m2.d * k + j];
            }
            out.w[m2.d * i + j] = dot;
        }
    }

    // return out;
}

function backwardMul(m1, m2, out) {
    for (var i = 0; i < m1.n; i++) {
        for (var k = 0; k < m1.d; k++) {
            for (var j = 0; j < m2.d; j++) {
                var b = out.dw[m2.d * i + j];
                m1.dw[m1.d * i + k] += m2.w[m2.d * k + j] * b;
                m2.dw[m2.d * k + j] += m1.w[m1.d * i + k] * b;
            }
        }
    }
}

function add(m1, m2, out) {
    if (m1.w.length !== m2.w.length) {
        throw new Error();
    }

    if (out.n != m1.n || out.d != m1.d) {
        throw new Error('Out should be ' + m1.n + ' by ' + m1.d + ' but is ' + out.n + ' by ' + out.d);
    }

    // var out = new Matrix(m1.n, m1.d);
    for (var i = 0, n = m1.w.length; i < n; i++) {
        out.w[i] = m1.w[i] + m2.w[i];
    }

    // return out;
}

function backwardAdd(m1, m2, out) {
    for (var i = 0, n = m1.w.length; i < n; i++) {
        m1.dw[i] += out.dw[i];
        m2.dw[i] += out.dw[i];
    }
}


function fillWithRandomValues(m, mu, std) {
    for (var i = 0, n = m.w.length; i < n; i++) {
        m.w[i] = mu + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__random__["b" /* gaussRandom */])() * std;
    }
}

function updateFromDeltas(m, alpha) {
    for (var i = 0, length = m.n * m.d; i < length; i++) {
        m.w[i] += -alpha * m.dw[i];
        m.dw[i] = 0;
    }
}

function clearDeltasInArrayOfMatrices(matrices) {
    for (var matricesI = 0, matricesCount = matrices.length; matricesI < matricesCount; matricesI++) {
        var matrix = matrices[matricesI];
        for (var i = 0, iCount = matrix.n * matrix.d; i < iCount; i++) {
            matrix.dw[i] = 0;
        }
    }
}

function updateValuesFromDeltasInArrayOfMatrices(matrices, alpha) {
    for (var matricesI = 0, matricesCount = matrices.length; matricesI < matricesCount; matricesI++) {
        var matrix = matrices[matricesI];
        for (var i = 0, length = matrix.n * matrix.d; i < length; i++) {
            matrix.w[i] += -alpha * matrix.dw[i];
            matrix.dw[i] = 0;
        }
    }
}


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = assertEquals;
function assertEquals(actual, expected, moreInfo) {
    if (actual !== expected) {
        var message = 'expected:' + actual + '!==actual:' + expected;
        if (moreInfo) {
            message += ', ' + moreInfo;
        }
        throw new Error(message);
    }
}


/***/ }),
/* 37 */
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
/* 38 */
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
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__State__ = __webpack_require__(38);
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


/***/ })
/******/ ]);