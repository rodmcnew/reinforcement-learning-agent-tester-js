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
{"nh":100,"ns":82,"na":4,"net":{"W1":{"n":100,"d":82,"w":{"0":-1.4151142854883354,"1":0.4644276996007683,"2":-0.3505077144076772,"3":-0.44136330386564326,"4":-0.7023605842250757,"5":-1.3711449077444167,"6":-2.7769210247688223,"7":-0.379187416553813,"8":-1.062313091602542,"9":-0.8486448151112449,"10":-0.6042373344349362,"11":-0.07016970698108364,"12":2.2446167474091103,"13":-0.09303661731346843,"14":2.428111678797554,"15":-1.0530573620913444,"16":-2.393977459727472,"17":-1.1439563377271713,"18":-1.469937022029433,"19":-0.11521240195819957,"20":1.2103052243328127,"21":0.7515109930184715,"22":0.5524449236603224,"23":1.5929713762476523,"24":0.6084510384654205,"25":2.4525115564529174,"26":0.5675623634946247,"27":1.3161567859252135,"28":3.4388509127340603,"29":2.901303255916267,"30":0.23205397600605385,"31":-2.5181334918938645,"32":-0.35172671639564546,"33":0.9036057404117662,"34":-0.2834263075879992,"35":-1.3371294224783088,"36":-0.19239944783647384,"37":-1.4070489072866932,"38":0.4897050180129817,"39":-0.7730491043148559,"40":2.723652540794338,"41":-0.4360207837310475,"42":0.9993468843136956,"43":1.012348860853665,"44":1.0276383552011774,"45":-2.091415552143776,"46":0.5620692661403753,"47":-1.36923604254353,"48":0.3418778496767019,"49":-2.3241508364910293,"50":1.5619970047569505,"51":0.9280404909731501,"52":1.6357369384888865,"53":1.0975807769704689,"54":-0.3757212741320607,"55":-0.7941711586917815,"56":0.29677857736661306,"57":-1.298324781255427,"58":-1.0644512014613559,"59":-0.7799689254062537,"60":0.08256905983447049,"61":-2.7478291788187006,"62":-2.483860663657213,"63":-0.8311245463576489,"64":-0.3634183658428158,"65":0.4340571966012099,"66":0.919193843274616,"67":-0.5522470068503734,"68":-0.27020852940594475,"69":-0.3067080549577889,"70":-0.45303345625031455,"71":-0.7113285135063818,"72":1.4422328506454194,"73":0.165303649314274,"74":0.7538738570022615,"75":1.568663371154351,"76":0.1224068242199496,"77":0.32991035127462925,"78":-1.1014248694380218,"79":-0.2914787749785996,"80":1.2278478401060324,"81":0.8567946334332034,"82":0.5891360855380011,"83":0.686413264927859,"84":0.03843338752106817,"85":1.3129295760098432,"86":-0.9859002021184429,"87":0.7267168362198341,"88":-0.5740222703891037,"89":0.1515289807920071,"90":0.40906836577715333,"91":-0.4003637990154064,"92":-1.0910860497001298,"93":0.5436004248236641,"94":1.0884986269988344,"95":1.0118457396544103,"96":-0.8550981638088014,"97":0.4632448989170144,"98":-0.6839328714442792,"99":1.231297758654784,"100":0.01975095114098698,"101":0.6195768774319296,"102":1.143622265485009,"103":-1.385630163373799,"104":-0.04207900833525968,"105":0.4939467896571268,"106":0.5627228702518589,"107":-0.44793306554343504,"108":1.396205312858769,"109":1.382346655224593,"110":-1.0811851568796274,"111":-0.3897764899344361,"112":-0.38109977068404965,"113":-0.7864518796040129,"114":-0.4921943228343846,"115":-0.9573712185166163,"116":0.6975843663583214,"117":-0.16072536335907198,"118":0.9122147297684949,"119":-0.05263019992128738,"120":-0.07157899205281806,"121":-0.3957973227584466,"122":-1.4969102191599075,"123":-0.6162800512890665,"124":-1.6890791207485036,"125":0.9984754512007451,"126":-0.7388627164895066,"127":0.5260516881237146,"128":2.0451484895463805,"129":-0.7664512124875515,"130":-1.5499161870004439,"131":-0.1105245810614038,"132":-0.11713863445859474,"133":-0.7412410383024594,"134":-0.2968710769919721,"135":-0.4716307613752758,"136":-0.21808500483666673,"137":0.5519955757209307,"138":-0.9199201199450258,"139":-0.7867862475712653,"140":1.1063085694696466,"141":0.5897961751791486,"142":-0.8680747310586877,"143":-0.23819184016093609,"144":-1.0572622159892935,"145":-1.1576151971746373,"146":0.11488920936636643,"147":-0.03590081242897616,"148":-0.742897890247166,"149":0.16447595200663123,"150":0.33786531056317987,"151":-0.7793315196289189,"152":0.7458399017795231,"153":1.8507266879710809,"154":-0.4196970160515893,"155":0.10592736180714428,"156":0.22610541246303356,"157":-1.2634688394760258,"158":1.4640149948789805,"159":-1.8489819908286906,"160":0.512655517441548,"161":-0.11963462238999961,"162":-0.12024001069622563,"163":-0.11001747704832857,"164":-1.354139578487715,"165":-0.1417727009429808,"166":1.603975172775427,"167":-0.28044338220424014,"168":0.4407069060409354,"169":0.3710304740472099,"170":0.5610561212932981,"171":0.2624960908939977,"172":2.2518477619412964,"173":-1.3071022704298367,"174":0.736987128768079,"175":-0.5938288879502162,"176":0.0715001956685779,"177":1.191810363558728,"178":-1.1173717493780795,"179":0.5779444125600353,"180":1.2105319769192064,"181":0.003593257135415784,"182":0.20833012816855653,"183":-0.3927728656323964,"184":0.7774143515599166,"185":0.6982362408494144,"186":-0.1338599029726547,"187":0.45622213672947726,"188":-0.5342300151598879,"189":-0.19826728825689657,"190":0.27792989873662466,"191":0.5537380533927744,"192":-0.9198205175745512,"193":-1.8311683434164683,"194":4.722155347951242,"195":2.974013973371514,"196":0.4818563916029217,"197":-0.09767665544359114,"198":0.8916177720835338,"199":0.09090951015207811,"200":0.500763024530872,"201":0.8767119064096044,"202":0.5410836659146608,"203":3.352072017857838,"204":-7.031185204293076,"205":-5.298002345087926,"206":-2.6486102421020807,"207":0.1070927241489215,"208":-0.5624561017795583,"209":-0.0016186485423508846,"210":0.18628752607647853,"211":0.174906313699598,"212":1.654197636709098,"213":3.2865869066729863,"214":2.140980704449271,"215":2.1534521380671983,"216":0.46411649103475666,"217":-0.5929457997178535,"218":0.03687195940881585,"219":-0.19888463054528993,"220":0.6902397100232128,"221":0.6524754159517043,"222":0.8339074275565406,"223":-0.1947010856075305,"224":0.11375863794426803,"225":0.049976391500182064,"226":0.1450093778301706,"227":-0.10277248551296907,"228":-0.7095778168722067,"229":0.47470342261766935,"230":-0.3938103247128979,"231":0.1473149688964168,"232":-1.8773428629708317,"233":0.9831861976529962,"234":-1.0607616880363988,"235":1.0461228185613232,"236":-0.15600843326706962,"237":-0.46227708388598027,"238":1.1206470041739152,"239":0.186704977254653,"240":0.41381769160752896,"241":0.7546936379457277,"242":-0.2773414546950571,"243":-0.6473083112787003,"244":0.7069730975140827,"245":0.08117985212143425,"246":0.1486231467938848,"247":0.874005029789902,"248":-1.1379266815178086,"249":-1.9381678483960103,"250":-0.4243527954163619,"251":0.5687020472375557,"252":1.8569937962943726,"253":0.3821953385060724,"254":-0.2543641994585585,"255":0.7755302360013813,"256":-0.5331462799470167,"257":1.026593357417101,"258":-0.16873105627789584,"259":0.41595221859749104,"260":0.8558808040858183,"261":1.7327273652022834,"262":0.17207428526981475,"263":0.017469208747329247,"264":0.6477498189223831,"265":0.31824213905002247,"266":0.3585371211144451,"267":0.5256078958092488,"268":0.5993618988068343,"269":0.4090440890272025,"270":-0.7635351587008345,"271":-1.782127454642391,"272":-0.21531804657344314,"273":-1.6484623315499667,"274":0.6325513223302185,"275":2.231019060905213,"276":-1.904668728805941,"277":-1.0382874634638242,"278":-2.3127030178994925,"279":-1.6286704384147555,"280":-0.1033825011209075,"281":0.7910668569840213,"282":-1.9824169673866638,"283":0.9972808967991483,"284":-0.29118477969024653,"285":-1.9427280500817972,"286":-5.342976285912783,"287":-3.398673309589002,"288":-0.7577951553469824,"289":0.2591020686920367,"290":-2.0700304245077357,"291":-0.12924869443954184,"292":-0.4378180636223202,"293":-1.7395450687261536,"294":0.050310260906620836,"295":0.27085819583232806,"296":-1.2944759766176195,"297":-0.39422702800748327,"298":-1.2831640935236874,"299":0.5640766015617279,"300":-0.8143740911230213,"301":-0.6931712799006221,"302":0.9883756546212765,"303":-0.959990620831818,"304":1.580794357715207,"305":0.5046486664939291,"306":-0.888196608058301,"307":0.13898146483548451,"308":-0.5087559289301518,"309":-0.5580637524676108,"310":-1.9113685509729315,"311":-1.4442158532301097,"312":1.1380181923618968,"313":-0.8316459307097481,"314":0.9426671859059371,"315":-0.2673110390990387,"316":-1.0354395565775898,"317":-0.27256739544517994,"318":0.14403278260354277,"319":1.0532815437904333,"320":-0.5090100031864276,"321":0.08651694245936001,"322":0.9335764282044234,"323":-0.20026968584564947,"324":0.40249987331887876,"325":-1.0227364123073803,"326":-0.22832134327964007,"327":0.03529540689744039,"328":-0.28552675840153247,"329":0.06554775968372746,"330":-1.4132900464423774,"331":-0.4298690231998666,"332":-0.24254822351303112,"333":-0.44658336664410997,"334":0.3402446334151677,"335":-0.017578536425757702,"336":0.5382799486086022,"337":-0.467030687338457,"338":-0.015522921689715896,"339":-0.5902854249794365,"340":-0.8298741016704464,"341":-0.44238121008328396,"342":0.06252580633561598,"343":0.31207141644825515,"344":-0.12331967340517364,"345":-0.8677473367060656,"346":0.1824251668590966,"347":-0.45132994147578026,"348":0.10118063066969972,"349":-0.276189008467373,"350":-0.21634402097027186,"351":-0.8505163800711781,"352":-0.1547369346412094,"353":0.04751651837263178,"354":0.01100978170469321,"355":-0.28470018726741236,"356":0.4188976770988503,"357":0.5224774540766773,"358":-0.3679273725551387,"359":0.8064585433180919,"360":-0.5156524580753684,"361":0.21236343186903184,"362":-0.349537279757267,"363":-0.06705388587167348,"364":-0.1872264273699951,"365":-0.8466779977148666,"366":-0.12810619264981132,"367":1.0720994484444235,"368":1.014063047504359,"369":1.3866342268802543,"370":0.027133146249754835,"371":-0.19871088401940235,"372":0.9552939073351258,"373":0.23381063441129096,"374":0.3265741329156647,"375":-0.533168833940836,"376":1.746486082757365,"377":3.890108146114409,"378":2.2882355326827097,"379":1.2647694735983757,"380":0.8590289902066311,"381":0.16902935054170123,"382":-0.3291612838122836,"383":0.3238903932795831,"384":-3.009062028929017,"385":-3.6928911115862535,"386":-4.064017515285008,"387":-2.684510068779412,"388":-1.040616241792173,"389":-0.5961840577753503,"390":-0.6529224956430293,"391":-0.09595158725536954,"392":0.09482351305122053,"393":0.08122643667276533,"394":0.26951363732754013,"395":-0.3592066050371931,"396":-0.9417887144184754,"397":-0.7058426025733922,"398":0.15002651253852559,"399":-1.2118559335078962,"400":-0.6202023727649392,"401":-0.37681144395986205,"402":-0.734168721552222,"403":-0.13899213872898575,"404":0.9579687234305665,"405":-0.5070968529230911,"406":-1.5752849921553271,"407":-0.04252049817035126,"408":-0.3833802404428681,"409":-0.15554837236264374,"410":-0.23222754855761626,"411":-0.003989622652874907,"412":0.9923027811164122,"413":0.697855210133859,"414":-0.032726879613858215,"415":0.6634438073254825,"416":0.18808834522830492,"417":-0.656354841072379,"418":-0.5442824917766451,"419":-0.750145030755599,"420":-0.20121739188479518,"421":-0.2901355593650475,"422":-0.9332170803440767,"423":-0.07972507170306373,"424":0.09711356840672704,"425":0.7803785660407985,"426":0.19038107155150596,"427":0.38587094771838815,"428":0.23599707217845403,"429":0.5292430057486817,"430":-0.6685469711690092,"431":-1.5466918318475567,"432":-1.5768506712162413,"433":-1.286073476375378,"434":-1.545102974262704,"435":-0.6942997929696985,"436":0.03486866802890237,"437":-0.4255489289513816,"438":0.08242886901463503,"439":-0.29341058187739544,"440":4.9975925178969405,"441":8.230935145298078,"442":7.357880480872729,"443":4.133357885315877,"444":4.063894561773357,"445":1.5918695493446076,"446":0.8627062811958846,"447":-0.01685622463293596,"448":-0.4035009313848583,"449":-0.9057304741914145,"450":-1.7251974303157054,"451":-2.4412485356567686,"452":-0.47939783520717966,"453":0.21726631074584238,"454":-0.06891256461258406,"455":2.0343263427966582,"456":0.7835655860068004,"457":-0.6619480961463018,"458":-1.2021414574030842,"459":-0.6418438947916262,"460":-1.8540175817761546,"461":-1.260820508278422,"462":-0.30993865408041754,"463":-0.14768628441489806,"464":-0.13384448151515604,"465":0.6188698592119625,"466":-0.10104350504504928,"467":-1.010515930259254,"468":0.4459702604372022,"469":0.06896998507254408,"470":0.988979659023838,"471":0.38920614863580705,"472":-0.7521998460856595,"473":-1.4328796636596923,"474":-0.13514735923324359,"475":0.2086289136927845,"476":0.04932017717160756,"477":-0.06262522381854187,"478":0.8397304843040212,"479":0.5125393553719977,"480":0.43665340726622104,"481":-0.1942578302671044,"482":-0.37142284717832275,"483":-0.18640270522897856,"484":-0.9339835811724566,"485":0.23025761759393792,"486":-0.5780027920788654,"487":0.7669549611690257,"488":1.2446241639366333,"489":-0.7223001850698075,"490":-0.525124991775137,"491":-0.06286180740316957,"492":0.051592308162386684,"493":-0.9498765154437228,"494":0.36111124568332414,"495":0.7344555706715922,"496":-0.4917167670964574,"497":-0.3971077716629387,"498":-0.08324290863333884,"499":-0.40376232653567606,"500":0.2747000115378751,"501":-0.5963278057675155,"502":0.7621029433917191,"503":-0.26684616214300155,"504":0.43283606537234703,"505":0.22525849013465649,"506":-0.09506722243437436,"507":0.0491949962449841,"508":-0.10747327190288823,"509":0.24434355550884823,"510":0.09800346394374472,"511":0.4912573797331678,"512":-0.27022795472439914,"513":-0.41315076891520924,"514":-1.0749061569384752,"515":-0.4964599603250111,"516":-1.0141210489585109,"517":-0.928863655362506,"518":-0.7072900177100708,"519":-0.2822155752331551,"520":-0.3512991596874131,"521":-0.10531577962676471,"522":-7.342014433586025,"523":-4.6879281708923966,"524":-3.7842855941208637,"525":-1.1150182639505182,"526":-0.24125024765136016,"527":-0.7287233346358947,"528":-0.46645293115579894,"529":0.052919477540954635,"530":-1.4166407597154242,"531":-2.247910092591884,"532":6.693696578854618,"533":1.2065291664197473,"534":0.8337071035448285,"535":0.19605523735980254,"536":0.4652248963809318,"537":0.448380222938406,"538":-0.06340150770500029,"539":0.5874599161695353,"540":1.3597311606553177,"541":1.9408002255465637,"542":1.612731173186111,"543":1.186849161919715,"544":0.04275367794650632,"545":0.4492838704673572,"546":0.061834062401452096,"547":0.40704253784765343,"548":-0.22701980905393915,"549":-0.421997444906314,"550":0.6077186654044319,"551":0.3013155614776917,"552":0.018423310857390105,"553":1.1444240544362871,"554":-0.28678132492281533,"555":-0.10636476264368289,"556":-0.005082132064850103,"557":0.1487499273452945,"558":-0.3995613424244046,"559":-0.22622777222216556,"560":-0.3810780717493554,"561":0.09068221831242576,"562":-0.5286569393159755,"563":0.18965654237175086,"564":-1.1190346913090248,"565":0.04067808148545297,"566":-0.6563913363515702,"567":-0.5849381992728163,"568":0.513443440537211,"569":0.212913720120985,"570":0.6563856647807043,"571":0.07720707403555428,"572":-0.42707374122109965,"573":-0.8403117577927781,"574":-1.809606337585332,"575":0.934994526667004,"576":-0.9408509907579523,"577":-1.4300266306246807,"578":-0.8253784168584525,"579":-0.6632856477783675,"580":-0.4680056624015228,"581":-0.19832194752893345,"582":-0.4116585793576037,"583":-0.4424661371496282,"584":0.45016329006394074,"585":-1.6451139234354113,"586":-1.0221516461991826,"587":-1.0782534228919738,"588":-0.502389648858082,"589":-0.5526013740694234,"590":-0.13707679042578833,"591":-0.24907478884935425,"592":0.820145003112492,"593":0.1658829409241506,"594":-0.6070794984604645,"595":-1.4538752429277566,"596":-1.0258988957717947,"597":-0.33603817723467855,"598":-0.2589746841473379,"599":-0.4980481317605941,"600":-0.2790509401601099,"601":-0.24873817484653235,"602":0.17440700357907393,"603":-0.7467356333361648,"604":-1.7350724126509918,"605":-0.6129383180284974,"606":-0.5201095861209514,"607":-0.11701018866070889,"608":-0.5468527726966027,"609":-0.17291330687294,"610":-0.5825330709004839,"611":0.6603114648352661,"612":3.4923776559979736,"613":-1.3324140334147718,"614":-0.29697892184524954,"615":-0.34974323200246116,"616":-0.4224826585634414,"617":-0.21478580849402917,"618":-0.338090559398882,"619":0.06340293472396012,"620":1.147685997315735,"621":0.31283074563299706,"622":-1.019437937982606,"623":-0.9733406609304461,"624":-0.42269633099907855,"625":-0.33799798148420496,"626":-0.4662418668457669,"627":-0.41841704458072376,"628":-1.4156536483204976,"629":-0.26078470290901423,"630":-0.09742600114456786,"631":-1.8684894525197555,"632":-0.7112294763946072,"633":-0.6910427617203538,"634":-0.5340986691421081,"635":-0.3491908084348941,"636":-0.502786262055064,"637":0.12334670783681974,"638":-0.28010468654017767,"639":0.7357019821130883,"640":-1.1659851537223527,"641":-1.1267816200633622,"642":-0.41642036230295365,"643":-0.5435901573869145,"644":-0.48374058719379276,"645":-0.5970209273321447,"646":0.9453364943157748,"647":-1.3019010047480133,"648":-0.2655419985229675,"649":-1.2184190420601342,"650":-0.8959130552337821,"651":-0.7141172587741754,"652":-0.5255532262587028,"653":-0.18875790670059106,"654":-0.32360969327263267,"655":-0.4840865306740437,"656":-1.0654163352036,"657":-0.5705806559222828,"658":-0.9603402005482226,"659":-0.34472731471738643,"660":-1.485727969342517,"661":-0.4590633525866772,"662":0.06973639447015526,"663":0.15208363594181906,"664":-0.8763608843033535,"665":-0.595738531991923,"666":2.6993886644238083,"667":-0.35260065976449,"668":-1.026517202839126,"669":-0.5293205575407693,"670":-0.9248496349372131,"671":-0.09615534306570182,"672":-0.5640144554581756,"673":-0.32789360211316104,"674":-1.9581314054457792,"675":-0.943319863142435,"676":1.7418398313263967,"677":-1.494119624812316,"678":-1.4352666412588475,"679":-1.0440604572530825,"680":-0.17887614693236822,"681":-0.23987106540246425,"682":-0.2907986283035655,"683":0.29042528088951886,"684":0.33799454886226804,"685":-1.7988728615086997,"686":-1.351812291649967,"687":-0.868074786068874,"688":-0.7749043596773622,"689":-0.1544856098009004,"690":-0.6295213025690162,"691":-0.007874560371432894,"692":-0.45307459950214635,"693":-0.21301952547317232,"694":1.6544125708902542,"695":-0.043292379020787926,"696":-0.8705497737169359,"697":-1.175887743461485,"698":-0.37123870876037346,"699":-0.3496011240390553,"700":-0.10913902901501278,"701":0.5219156140480603,"702":1.5641818138860764,"703":0.7067355467196659,"704":-1.640151578255129,"705":-1.550770066556468,"706":-1.5128969959512082,"707":-0.43893376168875975,"708":-0.9001380583054144,"709":-0.18741860472963928,"710":-0.8715646397919615,"711":1.0238898521844477,"712":1.926419980338419,"713":-1.289537908517047,"714":-1.469306359516361,"715":-0.9262147485340686,"716":-0.6647271827630183,"717":-0.5426950103630207,"718":-0.31176334655217447,"719":0.7329318107122507,"720":0.557496558775882,"721":-0.5027175742692094,"722":-0.9586673553009863,"723":-1.0144010104690486,"724":-0.6209714506690146,"725":-0.6255824418762486,"726":-0.09203924000209882,"727":-0.541401765510954,"728":-0.9564821893522355,"729":-1.02983856753884,"730":-0.7381422615576752,"731":-1.30031190742502,"732":-1.0830402373826653,"733":-0.773262418512318,"734":-0.4979327798732806,"735":-0.040388138952821395,"736":0.10774155673522978,"737":-1.7757155293120321,"738":0.16986976041485352,"739":-0.5203485409461068,"740":0.28256610611149025,"741":-0.5986927443163356,"742":0.4122045047871492,"743":0.4056563822862962,"744":0.19635269097218228,"745":0.0366957258456744,"746":0.27302437245077266,"747":-0.07686069794393273,"748":-0.14158602330597592,"749":0.2773355130891692,"750":0.04868170459147353,"751":0.1478073767518107,"752":-0.20919847962096122,"753":0.008977747197478729,"754":0.49712906473622037,"755":0.3753348657949965,"756":0.0007583550064039995,"757":-0.22650431489311765,"758":3.4278153499843826,"759":1.9959698856626118,"760":1.3094224964251113,"761":0.11998272442649038,"762":0.1177877378956125,"763":-0.5027030953759734,"764":0.411757601241957,"765":0.32217039032221495,"766":-0.4406852526614929,"767":11.819296509613043,"768":8.259356843836374,"769":-1.0813180094366814,"770":-0.07917462044405363,"771":-0.5496059521010169,"772":-0.7792893294003451,"773":0.03675194641538363,"774":-0.2024779540171576,"775":0.5157494962312448,"776":-0.6320334334421379,"777":1.116169934984218,"778":0.38602789820921724,"779":-0.3598854445671958,"780":-0.5139541586103009,"781":0.1537744421444368,"782":0.2405637405277235,"783":0.3212686841061408,"784":-0.15822333004064965,"785":-0.4154252704625875,"786":0.015839446762260873,"787":0.66342026378851,"788":-0.0531616607403264,"789":-0.19805519621312306,"790":0.07350434932873802,"791":0.5473860615356462,"792":-0.2412328704362884,"793":0.31327836325779007,"794":0.399295123735216,"795":0.07412632536515938,"796":0.06503655795577395,"797":0.8901207898716885,"798":-0.07882301707507558,"799":0.052930744703875154,"800":0.37211244488940454,"801":-0.17294852154423856,"802":-0.3222713954766388,"803":0.5773575577666359,"804":-0.08700768663986928,"805":-0.7218730096145679,"806":-0.39468210245594,"807":0.08397861100115597,"808":0.49388872809035644,"809":0.009640237998896418,"810":0.2542601989815858,"811":-0.21764071570524562,"812":-0.4849050129360623,"813":0.10973970757067504,"814":-0.07140860949591768,"815":-0.13050273134207255,"816":-0.021327834177163257,"817":-0.006695579589979,"818":0.5877492170489411,"819":0.4819798350116724,"820":-2.668437430129558,"821":-0.6563829143623234,"822":-0.31907402152324255,"823":-0.13524294338454868,"824":0.20680002686422772,"825":0.7784777424232004,"826":0.6290547065881241,"827":0.7717909361428603,"828":1.2659097125891325,"829":-0.6098899346663282,"830":-0.3456333981144436,"831":-0.5605935352042261,"832":-0.4520180094258229,"833":-0.7216169774053206,"834":0.33861153223566,"835":-0.12746255582688557,"836":0.31264470854980697,"837":0.5378942993989265,"838":-0.18326754538865303,"839":0.1392317247725898,"840":0.3874954684645233,"841":1.2669495607011134,"842":1.7086571853624235,"843":-0.07521863280467236,"844":0.4315399406527961,"845":-0.6448738096316764,"846":-2.1738626697623498,"847":-0.23677809032745553,"848":-2.2591185727067664,"849":0.563178815554976,"850":3.061695354499487,"851":-0.3904313982714199,"852":-0.7566470829111095,"853":0.987478877115895,"854":0.9316837829799841,"855":0.09899744798046892,"856":-0.21286583175190216,"857":-1.0681298351720843,"858":0.9435555908573071,"859":-1.6929919315707451,"860":-9.319887414434087,"861":-7.295853945864634,"862":-0.26703689885206067,"863":-0.812409372771615,"864":-0.36669342800731924,"865":0.2537780193526749,"866":-0.7226762906909339,"867":0.3985018660169932,"868":1.8411218101021174,"869":-1.2640206397000628,"870":-0.13537260436518922,"871":-0.34022582165506304,"872":-0.06345869380134289,"873":-0.744730792426004,"874":0.18502585473656935,"875":0.048637357888325995,"876":-0.90620763393716,"877":1.9875027154468028,"878":0.5597872072559271,"879":1.2192558246735008,"880":0.3827126569343965,"881":0.49054788621930473,"882":-0.03344586919741738,"883":1.115737937417399,"884":0.9114305435390893,"885":0.1553071071080129,"886":1.4454713682328804,"887":-0.21465746071914035,"888":1.221465130917466,"889":-1.2734276494399823,"890":0.26232086900460827,"891":0.8552530920670355,"892":-0.11917357885904548,"893":0.9089743462427362,"894":0.5552886270274665,"895":-1.3098129831803997,"896":-0.34534714168742625,"897":1.933840218240404,"898":0.003915269894819032,"899":-0.1277241871164132,"900":-2.480598917207773,"901":0.7319762411090666,"902":-0.8911458572665462,"903":-0.3390488161370558,"904":0.4179726448759737,"905":-1.3985258933762759,"906":-0.08470293995999505,"907":-0.5865927605648573,"908":0.4812220014467407,"909":-0.5906933264201066,"910":-1.1190846873921745,"911":-0.32867630810084864,"912":-0.24885036207828606,"913":-0.1388632541118333,"914":-0.46932593105916176,"915":-0.29656426930651947,"916":0.023342875023204236,"917":-0.506796572407522,"918":-0.24963976701331542,"919":0.6497855608407743,"920":-0.017780589266331925,"921":-0.7245440714179139,"922":0.718245589395061,"923":-0.7442117161894439,"924":-0.2540567918338181,"925":-0.12054969100398555,"926":0.0659207962056424,"927":-0.376219217498581,"928":-0.33539878242980303,"929":0.4642151999290237,"930":-0.6694489852501707,"931":-0.7839395644441791,"932":1.0755770694766866,"933":2.183609627760881,"934":1.4426334041042368,"935":0.6157542281658406,"936":1.3723594434781887,"937":0.20470671905883056,"938":0.15936681140944592,"939":0.5582498204493777,"940":0.0852998418260381,"941":1.544550214376569,"942":0.41824409924336836,"943":5.616603852659008,"944":3.565875177502941,"945":1.433427549180023,"946":0.5456579220656244,"947":-0.10624782895341855,"948":0.17453009169000105,"949":0.2012610065551616,"950":0.1154020185377295,"951":-6.824373354494217,"952":-7.024809648675179,"953":-5.067527290649657,"954":-3.149229232591242,"955":-1.9649543395094502,"956":-0.6613368922121575,"957":0.5275990445245375,"958":0.7606249767167422,"959":-0.9733526732189199,"960":-1.6058429639704117,"961":-0.648384237804793,"962":-0.9658362212380717,"963":1.1512539624600377,"964":0.16008616229126096,"965":1.330705500244418,"966":-0.748334633382961,"967":0.22314264127557812,"968":-0.8411675888942229,"969":0.0009054714749523329,"970":-1.097239058739167,"971":-1.575169699202805,"972":-0.6215635670822247,"973":-1.3058331902317406,"974":-0.6805986405601173,"975":0.36257165009514786,"976":0.39118748064949793,"977":-0.5044109030265904,"978":0.8953779108266166,"979":0.14391019551620193,"980":-0.4694833423188758,"981":0.09558244916180074,"982":0.4431013446211769,"983":-0.41356358129988646,"984":0.3007114313136832,"985":0.4743708464225671,"986":0.1256242186103169,"987":-0.1540003780881775,"988":-0.42138421909683293,"989":-0.06062034020683654,"990":-0.11681059493085846,"991":0.5977215640688407,"992":0.043874789542341044,"993":0.9229730093746604,"994":0.7396268916378117,"995":0.2982459570889375,"996":0.26970874668349687,"997":-0.5890490886336364,"998":0.28578857117369955,"999":-0.3389696796302935,"1000":0.6286901448353733,"1001":-0.7360994727264428,"1002":0.25378224114545767,"1003":0.2323008938431257,"1004":-0.28220392767586483,"1005":-0.632529575715861,"1006":0.18818501773234828,"1007":-0.12788878721743024,"1008":-0.09707841696095083,"1009":0.7488574281394844,"1010":0.055025834542812097,"1011":1.4778312288488737,"1012":0.41450929154569327,"1013":0.6322113335279724,"1014":-0.11460220637538593,"1015":0.059013694974833136,"1016":-0.16603070677959517,"1017":-0.28648962327886246,"1018":0.6641005249599625,"1019":-0.3420377580714285,"1020":0.004660466344434693,"1021":-8.484948311249552,"1022":-5.138298284411354,"1023":0.4812720791046642,"1024":0.22207171794534095,"1025":0.1049848120989798,"1026":0.849997143289785,"1027":-0.5624026828775659,"1028":0.09387823756833089,"1029":0.024818913027108404,"1030":0.2899824702227483,"1031":0.7504799428597384,"1032":-0.742378481895065,"1033":-0.25759167962153573,"1034":-0.31514095612426424,"1035":-0.007302270270281938,"1036":-0.5031368720936337,"1037":0.5442064604396054,"1038":0.8024050439616555,"1039":0.7845602392520367,"1040":0.04244651182790692,"1041":0.41217671120831834,"1042":-0.10531578685667757,"1043":-0.10460835096640919,"1044":-0.5348869281600094,"1045":-0.0906438835513372,"1046":-0.26993391952976337,"1047":0.5114651008827894,"1048":0.4190894097909896,"1049":0.20867176528002615,"1050":0.3336797492577694,"1051":0.044168296599912685,"1052":-0.7603972854020568,"1053":-0.4292498934797439,"1054":0.13702188479131744,"1055":-0.05834231560086736,"1056":0.0025784369655560543,"1057":0.9087972852212987,"1058":-0.26254070856600353,"1059":0.09850659897407463,"1060":-0.6254500473811422,"1061":-0.4500268482696724,"1062":-0.5466595975908477,"1063":-0.169792008862522,"1064":-0.17678248655385667,"1065":0.7903488269442652,"1066":1.2180282022838227,"1067":1.5378410617470097,"1068":1.2914512750346492,"1069":1.9546727632683896,"1070":0.6361449701288242,"1071":0.3661110094216023,"1072":1.0593606902727473,"1073":0.10550566752491827,"1074":0.6191839806904312,"1075":0.23815010486008412,"1076":-0.8837283442531886,"1077":0.27476614269618893,"1078":1.8935074369645415,"1079":0.4537957256622649,"1080":-0.8516771102986164,"1081":-0.18710069667288812,"1082":-0.33206315045309864,"1083":-0.9288697115010166,"1084":-1.3363648768387444,"1085":2.8682738905363063,"1086":-1.6956011072226376,"1087":-2.374702270459554,"1088":-0.44891308156527115,"1089":0.21326844232836537,"1090":0.2415933415110639,"1091":0.5504832519033854,"1092":2.1423034840263258,"1093":-1.1088953194925044,"1094":0.12781306613578086,"1095":-4.815581376180391,"1096":-4.723395352010102,"1097":-1.723973962374929,"1098":-0.17724966730751998,"1099":0.15338859957259912,"1100":-0.18943597691644695,"1101":1.3608488155422667,"1102":0.03852508203297254,"1103":-0.3222003935925563,"1104":-1.0399824384021834,"1105":-0.5473734685931484,"1106":2.9118636720931828,"1107":0.23991341969336094,"1108":-0.23591889576305614,"1109":0.6119956255495417,"1110":-1.1949807502706895,"1111":0.07913247515421441,"1112":1.464762411915238,"1113":-0.20096497055742163,"1114":1.996212220566161,"1115":0.29236609534744395,"1116":-0.4196663238211248,"1117":0.4219524503581572,"1118":1.1923367962774387,"1119":-0.2715897554518602,"1120":0.047181752044721297,"1121":-1.3469607203204363,"1122":0.22538297465647555,"1123":0.4023120927848259,"1124":0.8548055601432868,"1125":0.6850640209208774,"1126":-1.0494830052327744,"1127":0.20728642232272607,"1128":-0.9915405928130056,"1129":0.6515096390813347,"1130":-1.0160735400967398,"1131":0.3110160847411546,"1132":-0.6395973625089915,"1133":1.2639623036898577,"1134":-0.010069041249801186,"1135":-0.041277018101852886,"1136":-0.8824242581887757,"1137":0.8309775545310812,"1138":-1.3622045407497025,"1139":-0.039604955611318084,"1140":2.674031416399145,"1141":0.05088420389059939,"1142":-0.45873782643600186,"1143":0.8184378272075659,"1144":-1.5287654795343815,"1145":1.0060367346269325,"1146":0.6085087654444824,"1147":-1.3747709034112037,"1148":0.08372087553178033,"1149":-0.23780656736305747,"1150":-0.3727513980402993,"1151":0.25499802701993485,"1152":-1.5425061239286255,"1153":-0.34849868298013065,"1154":0.027469285053358404,"1155":-0.3520054279229079,"1156":-2.312230801229919,"1157":0.6936786766109911,"1158":0.9544836134385507,"1159":0.9140361155842416,"1160":-0.058541449811788694,"1161":0.6531067970841569,"1162":-0.09694426830774776,"1163":1.690122459216409,"1164":-1.2569391480915357,"1165":0.7356168943028005,"1166":0.8291495199770254,"1167":0.682921876528906,"1168":-2.0822202821970603,"1169":0.8006332919096181,"1170":0.3870758145297023,"1171":0.6628585313524203,"1172":0.30688254595452974,"1173":1.587152287426994,"1174":0.7648205507781634,"1175":0.390580859878309,"1176":-0.3642002664861395,"1177":-0.6687882282689782,"1178":0.25322005040742906,"1179":2.2165652203678112,"1180":-0.09440436456273665,"1181":1.1945817299100765,"1182":-0.01991446650954769,"1183":0.5889016234633327,"1184":-0.7426549572090103,"1185":0.5482360059916117,"1186":-0.36731289295043057,"1187":0.09662827550094018,"1188":-1.0226565274092272,"1189":-0.9467545182420556,"1190":-0.22477897216114984,"1191":0.35877298768034604,"1192":-0.8139925853763063,"1193":1.6916571987457434,"1194":1.4594533702804873,"1195":-1.713418877141322,"1196":-4.10581692835417,"1197":0.2836403154845775,"1198":-0.032812460537801236,"1199":-1.4114280307572995,"1200":0.43723171585649223,"1201":-0.516167920873866,"1202":1.4275611445952994,"1203":1.1197358820891887,"1204":0.2675367307939895,"1205":0.15535473314717943,"1206":-0.8361649235011334,"1207":-2.548978984797577,"1208":1.108862127325824,"1209":-0.017850196747363444,"1210":0.4390422670383383,"1211":-0.9126426881112834,"1212":-3.3059140671321243,"1213":-1.289081628466968,"1214":-0.9145283286650501,"1215":0.3358972240332194,"1216":-0.3625611836465952,"1217":0.37253364343983275,"1218":-0.7052226227166286,"1219":0.7710548378512181,"1220":0.6233227551654622,"1221":2.02385144040973,"1222":-0.7444913181254917,"1223":1.1861331307103826,"1224":0.8977914796077799,"1225":-0.5267938143370964,"1226":-2.050497227894529,"1227":1.7654594867169864,"1228":1.069993868580783,"1229":-0.16470017080848934,"1230":-1.6439151678959294,"1231":0.9018311718707208,"1232":1.3394708182291022,"1233":0.7910530808439604,"1234":0.5392773755862837,"1235":0.5982576194412219,"1236":0.8594711143436287,"1237":0.5248879990203043,"1238":-0.5886064547861812,"1239":0.933425583999006,"1240":-0.027510703553194536,"1241":-2.077675653432487,"1242":-1.846942323842693,"1243":-0.9782569574292129,"1244":-0.07749978054442597,"1245":0.4426434869103913,"1246":0.1823263257996634,"1247":0.15975196675233957,"1248":0.9182401021261751,"1249":-1.4630144179022746,"1250":-0.4696665954785516,"1251":0.9518771055429441,"1252":-0.8103361286659772,"1253":-0.48888426932906914,"1254":-1.8645294123620757,"1255":0.3287327788278982,"1256":-0.39687362386392494,"1257":1.3375866598438682,"1258":0.21462254237990466,"1259":-0.08329472667903969,"1260":-4.2020062161886855,"1261":-2.605157369649868,"1262":-0.3047712760448524,"1263":-0.4263599024533329,"1264":-0.3005852463690199,"1265":1.562744551375083,"1266":1.3905588280139989,"1267":0.8627093776066406,"1268":-0.4490906461226051,"1269":1.0577874022580538,"1270":0.3273996846540706,"1271":-2.9896274141270864,"1272":-0.15330955997799225,"1273":-0.516401403343,"1274":-0.2722334845213896,"1275":0.49287126697398315,"1276":0.14579943040184362,"1277":-0.5792216250103723,"1278":-2.713507499625167,"1279":-1.0451447031554717,"1280":-0.7157119930519512,"1281":-0.07791471596939303,"1282":-0.03219536309224995,"1283":1.301887252523235,"1284":-0.6203317838640864,"1285":0.39693320186422554,"1286":-0.14521548813979276,"1287":0.8435980799145459,"1288":-0.7766455477735594,"1289":0.32208187764392315,"1290":0.3129463294222422,"1291":0.11029523688306744,"1292":-1.049031297724558,"1293":1.7962126542890977,"1294":-0.1820067554706132,"1295":1.3636232243122888,"1296":-0.8360457190304138,"1297":-0.5496056021281682,"1298":0.33937637224107137,"1299":1.163582522791065,"1300":-0.8244648098033778,"1301":0.6116390373032428,"1302":-1.9269855626673666,"1303":-1.1042418436318697,"1304":0.5503013637155971,"1305":1.1511285954768145,"1306":0.20297946880225254,"1307":0.24078276594027698,"1308":0.6106988892093117,"1309":2.0401148002688165,"1310":0.47746208064295426,"1311":-0.38565934924964845,"1312":-1.8717680368599883,"1313":0.2223506668679151,"1314":0.6555062629871067,"1315":1.210281675999375,"1316":0.8884286792733821,"1317":0.4103567013784407,"1318":0.4597480247933529,"1319":0.5053606005709173,"1320":0.37690841021505106,"1321":1.6351029108612631,"1322":1.1299531625218104,"1323":1.1860135769591391,"1324":0.7624814234528627,"1325":0.9801100718954773,"1326":0.7533335788855549,"1327":0.4527014656261109,"1328":0.48278135834807145,"1329":0.24699870225951195,"1330":-0.8309992684581096,"1331":-1.039446137559247,"1332":1.0103487554707105,"1333":1.1470546124002727,"1334":1.4319367390443978,"1335":0.5459339958177187,"1336":0.5127720073780666,"1337":0.49382213599982366,"1338":0.2993554168963762,"1339":0.18003202021058562,"1340":-0.8606326006738383,"1341":-0.5980079837273974,"1342":1.4077397773511828,"1343":0.8872350089988819,"1344":0.570588498363891,"1345":0.40458168241123216,"1346":0.4625478640533048,"1347":0.49048922845665344,"1348":0.6489126026924863,"1349":-0.4428223642100482,"1350":-3.877977491487571,"1351":1.683354735948544,"1352":0.9524331106309556,"1353":0.5820165645097125,"1354":0.6194787304405573,"1355":0.3792842650348289,"1356":0.4269089095093919,"1357":-0.8047410605307694,"1358":-0.7439912136171355,"1359":0.5844060734788447,"1360":1.1664357555442513,"1361":1.0274164245471884,"1362":0.44985850900049934,"1363":0.6304716630727418,"1364":0.5872070843947897,"1365":0.4196545188553015,"1366":-0.17352162064391746,"1367":-1.4642888237929745,"1368":0.5535862105358705,"1369":1.7932748310053608,"1370":0.8592200672386934,"1371":0.7140338811640228,"1372":0.46656667502109594,"1373":0.27421715380469736,"1374":0.45293699699042805,"1375":-0.42523497934532045,"1376":-0.032653931265174345,"1377":0.6891347611478409,"1378":1.024456314310859,"1379":1.331655449756939,"1380":0.8080883244611167,"1381":0.46614775412257325,"1382":0.4859157845535306,"1383":0.5332289154250913,"1384":0.932242317127358,"1385":0.3651356440151083,"1386":0.037279428424354784,"1387":1.381804044629456,"1388":0.9611438575241096,"1389":0.7962482595386796,"1390":0.5036009917825084,"1391":0.4189040529390161,"1392":0.2262028652872129,"1393":1.6069250569496616,"1394":1.326763970017007,"1395":0.8867978667100699,"1396":2.0701341394964317,"1397":0.2785601982587849,"1398":1.064159338263494,"1399":0.5377706947452138,"1400":0.3133350929092631,"1401":0.3474314688974986,"1402":0.49424518518160004,"1403":-0.9426775210834955,"1404":2.1784268227378667,"1405":-0.4717475864285275,"1406":0.8339014985598826,"1407":1.1203471208674418,"1408":0.6351760783066671,"1409":0.3282197394018463,"1410":0.3351142615559941,"1411":0.436348855333168,"1412":-1.56807023157354,"1413":2.5632237198468824,"1414":-0.1163849811681129,"1415":1.0205392654532566,"1416":0.265473329848488,"1417":0.755273278993464,"1418":0.5880490315108791,"1419":0.4847098964429118,"1420":0.376701029611473,"1421":-1.1357616259499823,"1422":-0.1459402002183786,"1423":1.6680571833262734,"1424":1.3352388094293037,"1425":1.0283386498193092,"1426":0.7580925371305144,"1427":0.3738888197555754,"1428":0.5695325535416039,"1429":0.510192466092854,"1430":-0.9131508844508628,"1431":1.456471976005336,"1432":-3.133039361706585,"1433":1.0861703526812791,"1434":0.42426839941466216,"1435":0.48963921116639264,"1436":0.4419126262889616,"1437":0.4200661985732307,"1438":0.3104460900957719,"1439":0.870308447809639,"1440":0.06411607958288433,"1441":0.3528197882613678,"1442":1.337051065675656,"1443":1.1675877183623717,"1444":0.7217725452581891,"1445":0.40806753721988653,"1446":0.5953779230881793,"1447":0.36607749257830446,"1448":-1.1207369080254643,"1449":0.23788587301105815,"1450":0.5722555316223058,"1451":1.5444667911451933,"1452":1.4643430823817183,"1453":0.7071816708416314,"1454":0.41696615252097985,"1455":0.30018883967703053,"1456":0.4644487618908634,"1457":-1.576829801556522,"1458":-0.6693307731744845,"1459":-0.7510646901021785,"1460":1.407845135614882,"1461":1.4312410888604425,"1462":0.6087203697768537,"1463":0.7111755820227799,"1464":0.6631285195931561,"1465":0.6060449125762073,"1466":-0.9207943882027035,"1467":-1.258065100382651,"1468":-0.5765754726430912,"1469":2.0876614786343386,"1470":1.3802373795147564,"1471":0.7886604724313401,"1472":0.5065030079987751,"1473":0.25309415508575545,"1474":0.20544621642279723,"1475":1.0239626027187254,"1476":0.5823316416026407,"1477":-0.7196210613373851,"1478":-0.05118167440079912,"1479":0.48969285371567106,"1480":0.8196025023096677,"1481":0.46151637851047733,"1482":0.29132918212006975,"1483":0.33032472903893245,"1484":0.30529976532473374,"1485":-0.16692251419259663,"1486":0.8487976438569729,"1487":0.6334290912381749,"1488":0.8551023433140613,"1489":0.8255633067481131,"1490":0.41463763397123365,"1491":0.39340051111997393,"1492":0.29543558022163047,"1493":0.2757937603410936,"1494":-1.0138575880881662,"1495":-1.054342650142295,"1496":0.43151744855115853,"1497":1.0254469343436037,"1498":0.9453306527741342,"1499":0.5912590829687435,"1500":0.4369722250856068,"1501":0.3355368266163031,"1502":0.21099928020845027,"1503":1.418192090744188,"1504":0.7766246915264081,"1505":1.8194000540157067,"1506":1.0745721922205436,"1507":0.8701260726598301,"1508":0.5844322284434945,"1509":0.2094847182257991,"1510":0.4291485728302512,"1511":0.09696845599511872,"1512":0.6334672035407015,"1513":-0.14933040598371833,"1514":-3.1270717844467852,"1515":1.4583300813941396,"1516":0.065172817258647,"1517":0.4119286803164794,"1518":0.20417193438017633,"1519":0.008394049895038622,"1520":0.15852079288858545,"1521":0.7537284204047198,"1522":-0.1150985448885044,"1523":0.34370569912307697,"1524":1.0314530089086342,"1525":1.088009552616989,"1526":0.27894689898833674,"1527":0.34068367544747197,"1528":0.3232763130878572,"1529":0.5052949549080359,"1530":0.36412322846929196,"1531":-0.8597400330650425,"1532":0.4575836590451415,"1533":1.6467698595691038,"1534":0.9676023415390568,"1535":0.6111889913897945,"1536":0.5571942988170964,"1537":0.4556574946692233,"1538":0.37937477288525867,"1539":1.5323769250649126,"1540":-1.1697489683969933,"1541":-0.15049093793902837,"1542":1.0384922309303501,"1543":0.625339779609137,"1544":0.3978885020372241,"1545":0.4942317545148226,"1546":0.45141547778473556,"1547":0.2571711780259968,"1548":-0.5019125871198544,"1549":1.5869934220530728,"1550":2.174974013482323,"1551":0.6366895652904699,"1552":1.2037740315978291,"1553":0.6858010775044846,"1554":0.45648052776652887,"1555":0.2576319202642349,"1556":0.20308819325322355,"1557":0.43372393044779317,"1558":0.5085518433999037,"1559":-0.1704242466466325,"1560":0.19537715993926769,"1561":0.09336306821339323,"1562":0.11526906532447503,"1563":-0.3364745935710598,"1564":-0.13107855203326058,"1565":0.25172484284475904,"1566":0.09712352688394064,"1567":-0.204279897204121,"1568":0.4914638643359338,"1569":0.6289654776523127,"1570":0.4597409395715786,"1571":-0.1958266536385191,"1572":-0.25890330202641654,"1573":0.10806343901010403,"1574":-0.11785254172998587,"1575":-0.3385236342313498,"1576":-0.11255428826561409,"1577":0.5410799851500818,"1578":0.021994303292831526,"1579":-0.16045910681462663,"1580":0.34334099754879177,"1581":0.040684350613008964,"1582":-0.5769411831113318,"1583":0.19675130098524354,"1584":-0.23215913458451395,"1585":-0.3211594734157265,"1586":0.6915152675634106,"1587":0.3602516797844148,"1588":-2.0011837441296594,"1589":-2.227754950063418,"1590":-1.5552931037842816,"1591":-1.7264363725387344,"1592":-0.6991564059709711,"1593":-0.3891697038485671,"1594":-0.48556318335599846,"1595":0.7434951363698785,"1596":0.9931888688053241,"1597":-0.2768607115232777,"1598":-8.918654003232529,"1599":-0.9463715130534457,"1600":0.14470852031066883,"1601":-0.1629642004334773,"1602":0.04984200585003062,"1603":0.0356550181406672,"1604":-0.3554583122454605,"1605":0.20285667384398987,"1606":8.100233951418947,"1607":6.704614514688824,"1608":3.945269992886655,"1609":-0.07588241588061205,"1610":0.728050664075138,"1611":0.08422055458922921,"1612":-0.44478591980499654,"1613":-0.10316835156833783,"1614":0.05614851988116909,"1615":0.4323770293041864,"1616":0.8546395429427376,"1617":0.007007555276649712,"1618":0.7069554187390934,"1619":0.3449900245638887,"1620":0.5727423183891732,"1621":0.37892108675050173,"1622":0.11684991629067577,"1623":0.5151439426480439,"1624":0.8008559647650056,"1625":0.12478919286635226,"1626":-0.02959805170715666,"1627":-0.03529407702524412,"1628":0.3806933714705932,"1629":0.8972362663113006,"1630":0.2986767188894195,"1631":-0.6235673772460117,"1632":-0.6008408328051683,"1633":-0.021188407737103673,"1634":-0.09209814320312122,"1635":-0.022955273320978173,"1636":-0.40314971693172175,"1637":-0.4515903090493835,"1638":0.1601905490717771,"1639":0.6202495322671971,"1640":0.5380031982461706,"1641":-1.058371974727196,"1642":1.6476802591716297,"1643":0.21323068441236254,"1644":0.8790934768398697,"1645":-0.19917078372012606,"1646":-1.1414978687501247,"1647":-0.6316998975603489,"1648":0.09837822893360997,"1649":0.2787753002616382,"1650":0.9660603045055797,"1651":0.5629467174818686,"1652":0.626670068027486,"1653":1.6234334572349773,"1654":0.5536103990107013,"1655":0.9593869010668782,"1656":-0.07636807137490592,"1657":-0.0180226213980524,"1658":0.6695995862639333,"1659":-1.11290278895416,"1660":0.2750484892854503,"1661":0.049420320791005896,"1662":1.2032166865721154,"1663":1.298452029791162,"1664":0.9213426988820937,"1665":-1.0492599392829525,"1666":0.42129179885103213,"1667":-0.1105502963204768,"1668":-1.071172906689667,"1669":0.5033629583732696,"1670":-1.237969416620801,"1671":-0.5648054681847193,"1672":1.719058868053082,"1673":-1.5197782292637811,"1674":1.8894146593274765,"1675":-1.423712283544928,"1676":0.9195389232695809,"1677":0.9502986371533901,"1678":-0.46954765860180997,"1679":-0.5209514656526163,"1680":-2.3023777363888653,"1681":-1.4399088355190919,"1682":0.05448777363302138,"1683":0.857269451429046,"1684":-1.0782649800173163,"1685":2.103738167183633,"1686":-0.05855791032205033,"1687":1.404436124353869,"1688":0.4245049333448995,"1689":-1.5515466633399804,"1690":-1.0817161531202768,"1691":1.357855001363733,"1692":0.1562372099981029,"1693":-1.2965393206227667,"1694":-0.13703568538904645,"1695":0.5746340984170523,"1696":-0.20118736641999208,"1697":-0.4156485306482331,"1698":-0.0890987252932119,"1699":0.11758765781340685,"1700":-1.3164550469608258,"1701":-0.06685605562336776,"1702":0.29954273362906847,"1703":-1.4712094511772846,"1704":-2.799126847256321,"1705":1.910445997177827,"1706":0.2711824080971888,"1707":0.3168147970853138,"1708":-1.0548461941632883,"1709":-0.07225788325881266,"1710":-1.9049749217392495,"1711":0.49572501251988815,"1712":-0.2837704767623315,"1713":-0.16813464547882465,"1714":0.34199549411731645,"1715":1.9124827499253512,"1716":0.6601794970427577,"1717":-0.24378917663325234,"1718":2.344539751505264,"1719":0.2468023659855603,"1720":1.6115075549579632,"1721":1.567329910052514,"1722":0.7761949133925179,"1723":2.3644176907721994,"1724":-1.4475066367522378,"1725":-0.4722890327953471,"1726":-0.16590499829889183,"1727":0.6743725793763545,"1728":-0.9918259764880883,"1729":-0.5695946959759934,"1730":0.565013744897808,"1731":0.6081014614232977,"1732":0.48293065112584005,"1733":-0.965593757561668,"1734":-1.1376626338650586,"1735":1.2451999031416323,"1736":0.6625816823431113,"1737":0.9669354858803262,"1738":0.29373030081709356,"1739":0.6149580424909152,"1740":-2.0680451373083644,"1741":-0.4558099189954169,"1742":1.189736983727521,"1743":1.6054425133798647,"1744":0.6511370057898643,"1745":1.6900937675108973,"1746":1.3199723193290873,"1747":-0.6600572488573078,"1748":-1.0238567686431004,"1749":1.3349873904283645,"1750":-0.3044034927258392,"1751":-0.2042890830855352,"1752":-1.8324677062869696,"1753":-2.4420441445766037,"1754":-0.930694756277454,"1755":-2.2178135907107994,"1756":-0.6053809976399818,"1757":1.4182010758685424,"1758":0.12039996744975778,"1759":1.0817263296350028,"1760":2.039803187537535,"1761":3.0711802480585013,"1762":0.9093680250765013,"1763":1.2764485191084394,"1764":0.9898006789297499,"1765":-0.5628423027666065,"1766":1.2580880356857818,"1767":0.5740626585212056,"1768":-0.24782900342831873,"1769":-0.48213161833463625,"1770":-1.266308182821084,"1771":-2.7734688506418212,"1772":-1.372258961474704,"1773":-2.053203020029506,"1774":-0.8503309236057655,"1775":-0.44834689328977234,"1776":-1.7388517761355815,"1777":0.06745539374286412,"1778":0.47253048169430684,"1779":1.136665097055775,"1780":3.5127449379975446,"1781":1.5925246817970011,"1782":0.029098071841966434,"1783":-0.6726546126238455,"1784":0.8345400078730972,"1785":0.42117129796981273,"1786":0.3444327211262272,"1787":1.295579841416944,"1788":0.9166294192282555,"1789":0.014015116740670956,"1790":0.627614205256944,"1791":0.40715424213926,"1792":1.1102198992765089,"1793":0.4513414342930836,"1794":-0.3185859249593933,"1795":0.4442990062985498,"1796":-0.4547801860415491,"1797":-0.023111381653465633,"1798":-0.30254506177068835,"1799":1.460069129970557,"1800":0.5353912864952033,"1801":-1.1137308521971503,"1802":0.04617597839735656,"1803":-0.28422346255034714,"1804":-0.3347367023900893,"1805":-0.5750543451869837,"1806":-0.7583401889049547,"1807":-0.5590847425215234,"1808":-0.15664991171691048,"1809":-0.5696580896865657,"1810":-0.03749933921754839,"1811":-0.10392676921263082,"1812":-0.7371769381268686,"1813":-0.1126302009397896,"1814":0.0795810509476532,"1815":0.6183430729562632,"1816":-0.13796583215455988,"1817":-0.40645306161191747,"1818":0.29771584331369494,"1819":-0.19944145237339914,"1820":-0.4216339975683817,"1821":0.1754049403110379,"1822":-0.6904227088666554,"1823":-0.2629366247013441,"1824":-0.9960672811479488,"1825":-1.11240286577679,"1826":0.0008858470241711286,"1827":-0.18459419033296842,"1828":-0.0326295466770726,"1829":0.07169153466889469,"1830":-0.7512201596790887,"1831":1.097776096517729,"1832":-0.26514060706458653,"1833":-0.8444245285038108,"1834":0.029273134770883124,"1835":0.20786991026396576,"1836":0.23282753099872022,"1837":0.2736728212926864,"1838":0.24848765507846804,"1839":0.8057001987921161,"1840":-0.5293938128560909,"1841":-0.5948053373625022,"1842":-0.12448704801487848,"1843":6.9118189203655245,"1844":-0.2701478321750365,"1845":0.12631859613567936,"1846":0.6455452862529425,"1847":-0.02526103777440089,"1848":0.27010179304790793,"1849":0.21701776109331425,"1850":-0.3648763558054005,"1851":-2.944570930745162,"1852":-8.408996092184898,"1853":-7.367747461541616,"1854":-1.9946427773179463,"1855":-0.06116117250511336,"1856":0.848258236578273,"1857":-0.6689784792510667,"1858":0.5367311794485431,"1859":-0.04318100177477461,"1860":-0.013868656152471766,"1861":0.4057939663752622,"1862":0.1864589491629232,"1863":-0.7134029386597026,"1864":-0.5563216870902266,"1865":0.5623197936365623,"1866":-0.0015021480519542144,"1867":-0.4236300466765037,"1868":-0.037933903389569174,"1869":-0.6479391166008478,"1870":-0.5456741039559878,"1871":0.19416575764083888,"1872":-0.18233437806558386,"1873":-0.5752751879012654,"1874":0.12833929610753056,"1875":-0.08770568863303715,"1876":-0.1260952814074652,"1877":0.3972880400451863,"1878":-0.9928289085094141,"1879":0.3577392412662002,"1880":-0.3501136537226663,"1881":0.6750203919231413,"1882":-0.22902344576956116,"1883":-0.43144354916935396,"1884":-0.38996829130877136,"1885":-0.8457623908491675,"1886":-0.8832088659461669,"1887":1.882044561053971,"1888":-0.648662769180399,"1889":-0.5243908862580926,"1890":-0.8899086981603901,"1891":2.829401483092167,"1892":-0.4800046191557687,"1893":-1.09423187937155,"1894":0.942064806307345,"1895":-0.29127126117660085,"1896":0.10174415128413515,"1897":0.2100071314609449,"1898":-2.9135028253589748,"1899":-0.7395690905218407,"1900":-1.0128305138874196,"1901":-0.7753396853633066,"1902":2.4566729581832925,"1903":0.1808220370793349,"1904":-0.27431538035061176,"1905":-1.772734746967526,"1906":0.5748316983622463,"1907":-0.5365926830866687,"1908":-0.06878661658813327,"1909":1.2764787726164342,"1910":0.10632684962910949,"1911":-0.8136725482987431,"1912":0.3943255606368133,"1913":0.9064714296783424,"1914":1.6132999780339838,"1915":-1.5618667156329114,"1916":-1.3593322210971972,"1917":0.2705658191982642,"1918":-1.1834313556787175,"1919":-0.9352751183229239,"1920":1.3809869982781697,"1921":-1.714372070073248,"1922":0.7891508635127681,"1923":2.866386224734442,"1924":2.5602919077267523,"1925":0.6817120058456391,"1926":2.6209444884258613,"1927":0.07315744646028034,"1928":-0.9531546138500193,"1929":-0.0985985932508043,"1930":-0.5144856998809717,"1931":-0.11841529349925314,"1932":-0.7839376558915583,"1933":-1.3693099727598443,"1934":-0.5031673136835751,"1935":-0.9698342723494724,"1936":1.0880940185099295,"1937":0.6315649480912933,"1938":0.27638820203862,"1939":-0.7609464772559247,"1940":0.8357203814149644,"1941":0.07107428905407347,"1942":1.7007393707245648,"1943":0.09290585992037692,"1944":-0.33259312831302823,"1945":-2.2241732321515815,"1946":-0.8797821341491091,"1947":-0.7894022483634695,"1948":0.5731126903125512,"1949":0.7811820192700356,"1950":1.1240712939740274,"1951":1.3770099046591942,"1952":-0.5450661304023442,"1953":-0.3011753095538814,"1954":0.9668262287417673,"1955":-0.24977450726573813,"1956":0.14467399211686155,"1957":0.6295450373098485,"1958":0.7885096973911389,"1959":-0.5257818851706496,"1960":1.5892971130416873,"1961":-0.9456450624533149,"1962":0.4537705620360109,"1963":-0.9332556173035671,"1964":1.779391243243534,"1965":0.25801157289852295,"1966":1.6678749155234665,"1967":-1.522684249664081,"1968":0.2834992160174881,"1969":0.11766601160436849,"1970":-1.5154185638767959,"1971":-0.641516084084605,"1972":0.5189115010458721,"1973":-0.6775841929582008,"1974":-0.06575302693425505,"1975":-0.41758399616343445,"1976":1.9446779904043272,"1977":0.22417915984333212,"1978":-0.45806607821407536,"1979":-2.0342969751468565,"1980":-0.45221558803479406,"1981":1.9234292816441394,"1982":-0.36426752758508046,"1983":-1.1875199614292842,"1984":-0.08523818641171649,"1985":-0.292811307464393,"1986":-0.18651863395997412,"1987":-0.3445696239178813,"1988":-0.36359641735764453,"1989":1.0814578518980236,"1990":0.12826422661759687,"1991":1.4440221658117829,"1992":2.6588321947800484,"1993":-0.20349767122450746,"1994":-0.5000353361995578,"1995":0.6111836499051898,"1996":0.028603988048765124,"1997":0.8550898086987517,"1998":-0.5387822007415582,"1999":-2.1539688155390975,"2000":-2.2082826659029036,"2001":-0.2917674404820419,"2002":0.25674431646066936,"2003":-0.40342825132624605,"2004":-0.8948513834779699,"2005":-1.5542638476903703,"2006":-0.0589406745461841,"2007":1.7350793701112033,"2008":0.8827835248595297,"2009":3.1465680290701417,"2010":0.5889181664065948,"2011":-0.1927749960731291,"2012":-0.6213598301722736,"2013":-0.2708578482262077,"2014":1.5423323478367452,"2015":0.48385063948141654,"2016":-2.660835915462644,"2017":-6.469649629979634,"2018":-4.013420106931407,"2019":-1.4880868404777357,"2020":-1.21784560930194,"2021":0.91859524879132,"2022":0.16428251738572683,"2023":0.7783817220062189,"2024":-0.2215208667076923,"2025":1.4090771139652427,"2026":0.47883814177636985,"2027":-2.032195227678984,"2028":-0.5283196405863197,"2029":-0.6474800905594166,"2030":-0.7303349587143685,"2031":-0.19665973138041992,"2032":-0.8793719061632977,"2033":-0.07259095317147941,"2034":-0.1721809313816537,"2035":0.31445638859306435,"2036":-0.9056219797366905,"2037":-0.6527757324581831,"2038":0.04642575166371735,"2039":0.6236450399678449,"2040":0.33234818664677696,"2041":-0.02468577880138755,"2042":0.054632731770708126,"2043":-0.49264251499832473,"2044":0.03783901645838566,"2045":-0.37122343622004206,"2046":-1.767808075725824,"2047":0.10276956339621243,"2048":1.3378824743118034,"2049":0.29505995594428597,"2050":0.9813211640359141,"2051":-1.5786129446233188,"2052":0.39679880849827387,"2053":-1.1688942625927718,"2054":-1.1527279789926543,"2055":0.4320502999102541,"2056":-0.4941095742899864,"2057":0.12261369418008465,"2058":-0.6817645790373434,"2059":0.7149529350377387,"2060":-1.8765922239634751,"2061":1.219195414219354,"2062":-1.33075623286351,"2063":-0.6242850980481118,"2064":-0.3720300711303421,"2065":-0.34970438967342665,"2066":1.1730569745012727,"2067":1.1921810115215141,"2068":0.8322303711053048,"2069":0.5956742797906258,"2070":0.06766405786522346,"2071":0.4659134422808407,"2072":0.5766812308999232,"2073":-0.6493230060442691,"2074":0.17779472906959284,"2075":0.1765907919540108,"2076":-0.6706322632181801,"2077":0.06901502324514552,"2078":-0.325017107369858,"2079":0.6128443235926528,"2080":-2.373200352567635,"2081":-2.45664166658384,"2082":-2.1606656370668387,"2083":-1.5037439877209444,"2084":-0.2300105417432394,"2085":-0.07531182551339483,"2086":0.8979616297918654,"2087":-0.3981222134286992,"2088":0.9527231034242196,"2089":2.54446590780207,"2090":8.782297898837125,"2091":6.759650437769464,"2092":1.4646101907977382,"2093":-1.2388058221157585,"2094":-0.783841298516304,"2095":0.6190426801676424,"2096":0.35646251933371914,"2097":-0.7759131325397376,"2098":-0.9455732173169232,"2099":2.3151672026684147,"2100":1.550416973561058,"2101":-0.9708909441113954,"2102":0.9364309049494008,"2103":-0.08561523983379778,"2104":0.3455058321254409,"2105":0.5119913725041874,"2106":0.11771971844725178,"2107":0.08399682563268204,"2108":0.1387417208314527,"2109":0.7221413835215323,"2110":-0.0885002129424482,"2111":-0.05859235042098715,"2112":-0.43710151380872186,"2113":0.4077498042157604,"2114":0.20182031729341965,"2115":1.105192697157584,"2116":0.7294415565713261,"2117":-0.23425597611608784,"2118":-0.4015070935785163,"2119":-0.5122665716226368,"2120":0.38456412555323216,"2121":-0.5636349507781296,"2122":-0.045622939828853376,"2123":0.3076181047892301,"2124":-0.9496755886359941,"2125":0.07801663486990854,"2126":-1.4447395662011453,"2127":0.14127207653264778,"2128":-0.2175903691408857,"2129":-1.7647416009393728,"2130":-1.2747204181016314,"2131":1.5303250314627033,"2132":-1.3150951085500322,"2133":0.652375105213047,"2134":0.8102193766998289,"2135":-1.636225438552893,"2136":0.22848984832262845,"2137":0.9965991748852147,"2138":0.10258050726235471,"2139":0.4674162223598536,"2140":-1.5134613293052674,"2141":0.12858827422109037,"2142":0.5582159792148037,"2143":-0.7907597603018812,"2144":1.2592510062241895,"2145":0.5730411329712725,"2146":1.6402417215810747,"2147":1.0017763976726044,"2148":0.2952576100974035,"2149":-1.5565167687738026,"2150":1.209195457609475,"2151":0.5783431444464062,"2152":-1.7924018600350147,"2153":-1.3031409656608537,"2154":-2.3307563868676096,"2155":-0.4894929478202823,"2156":-0.1716143110483554,"2157":0.018348264610278758,"2158":-0.5706354347127476,"2159":0.05596214029986052,"2160":0.6467244604280711,"2161":-0.7771367691081189,"2162":-2.1375121668859354,"2163":-0.06330955622372664,"2164":-1.1606920929328728,"2165":-0.9730655965867414,"2166":-0.5941979321400326,"2167":1.6137721996426784,"2168":-0.6257202473644927,"2169":-0.7645223975766562,"2170":0.6244827424426197,"2171":0.9068296511756853,"2172":0.5199993454939216,"2173":-0.35839605837570854,"2174":-2.7335951289315896,"2175":-1.542883476986082,"2176":-0.3191175449661248,"2177":0.08891814136493784,"2178":-1.4795005282669065,"2179":0.18290248148398475,"2180":-0.5956633568694566,"2181":0.6991119304649003,"2182":-0.521855431388148,"2183":-2.617955394922825,"2184":-2.7301992232147274,"2185":-1.0271484569206564,"2186":0.5908495733391246,"2187":0.35616199347458666,"2188":0.9337593906172331,"2189":1.8921736082132363,"2190":-0.6431319057903702,"2191":-0.08603607202693661,"2192":0.276476971403442,"2193":1.2870674574083487,"2194":-0.14867687873828883,"2195":0.002714240027698241,"2196":1.2865550806115233,"2197":-0.04789706968172151,"2198":0.7724901079732529,"2199":1.4755063826496584,"2200":-0.15692452151095834,"2201":-0.07461786821754124,"2202":-2.041368159654425,"2203":0.19978655589747382,"2204":1.2681734996802363,"2205":0.4097028469795879,"2206":-2.6008968727245945,"2207":1.4279911350944552,"2208":0.5079313321646717,"2209":1.3581232908528829,"2210":-0.06914112612370032,"2211":0.12573426381892813,"2212":0.8291200603842382,"2213":-0.13008541864483328,"2214":-0.04031510143463914,"2215":1.2821184570178181,"2216":-0.20786428232981102,"2217":0.7433559066632776,"2218":0.19267673844613267,"2219":0.46137536747558905,"2220":2.148781429663437,"2221":-0.26838046014464373,"2222":-1.087211564221908,"2223":0.17947034358164946,"2224":-0.8652087024502658,"2225":-1.2516038128335638,"2226":-0.5272352716964588,"2227":-0.6094163224104773,"2228":0.4174762645474998,"2229":0.7994236516372782,"2230":-0.7369031730797473,"2231":0.7976632287880816,"2232":-1.0257196224038496,"2233":-1.095067812764387,"2234":0.08216243765374599,"2235":-0.7665165251370144,"2236":-1.0164182223147633,"2237":-1.5533772128113803,"2238":-0.5985630380424264,"2239":-0.48585279109973784,"2240":0.2567240507176223,"2241":0.16182410882844792,"2242":-1.4478491423650683,"2243":0.4575191370628442,"2244":-5.543080112731955,"2245":-2.5038683180868504,"2246":-0.49945678276388467,"2247":0.08928084619358245,"2248":0.019979239661960184,"2249":-0.4974919791844699,"2250":0.0692255426619303,"2251":-1.1190994870298596,"2252":-0.3630824390119597,"2253":-1.769286220699477,"2254":4.921985358300096,"2255":2.483872032110763,"2256":2.240305849801159,"2257":-0.16965517703085414,"2258":-0.4590741106195687,"2259":-0.8925941371119698,"2260":-0.717915648169606,"2261":0.4378670715752219,"2262":1.596839907283996,"2263":3.9272402876570736,"2264":0.8807388604002458,"2265":1.5611009153999782,"2266":0.9188714485491233,"2267":-1.5713247440024283,"2268":-0.5083352743251377,"2269":-0.8821883287788546,"2270":0.1292879139642968,"2271":0.41352850935016294,"2272":0.9279719270255595,"2273":0.8121166266319495,"2274":1.817882251306661,"2275":1.2341968554189577,"2276":1.7697734013289663,"2277":0.6420949247329671,"2278":0.7684821920232087,"2279":-1.0588987610396348,"2280":-1.059033365655789,"2281":2.0423668190053155,"2282":1.0121314202211054,"2283":-0.22145522727092543,"2284":3.3362011157913893,"2285":0.15690556660179736,"2286":1.996827610011827,"2287":2.2024972661486784,"2288":0.12293290439887677,"2289":-0.058592806658014376,"2290":0.017783856443367923,"2291":1.4298227365796592,"2292":-0.756872961397457,"2293":0.8028592717699036,"2294":0.38919242748853905,"2295":-0.31317797991602236,"2296":-2.2789492235138713,"2297":0.2840745087871631,"2298":-1.8522010999150222,"2299":-1.1887496352404665,"2300":-0.5357998817128808,"2301":-1.9220087861181328,"2302":0.8881176341741298,"2303":-2.0821495152069227,"2304":0.37671750150031424,"2305":-0.10150891322774667,"2306":0.2190464408246,"2307":-1.867929039949839,"2308":-1.045386389460413,"2309":-0.6304617270096146,"2310":-0.41817628469446827,"2311":0.48666515481432226,"2312":0.9481530811223885,"2313":0.1910758902802317,"2314":-0.6816080605486844,"2315":-0.02975967282069022,"2316":-0.6588981253308946,"2317":-0.5263849456812458,"2318":1.9927936395817336,"2319":0.446013562907985,"2320":-0.5204091531273956,"2321":1.3618921524168053,"2322":1.3658900528250453,"2323":-0.6208427885934071,"2324":-0.38914160186211394,"2325":1.9886628742620205,"2326":2.8840294028114872,"2327":3.3246160132189204,"2328":0.1675645420734117,"2329":-1.7784134148997233,"2330":-1.6333927079045143,"2331":-1.9708801040855586,"2332":1.604132198220079,"2333":0.24518527520893774,"2334":0.6147965811068632,"2335":0.5530499936323452,"2336":-2.16707780685609,"2337":-0.5577367183677404,"2338":-0.608437672601223,"2339":1.0618706387772807,"2340":0.5501940343648869,"2341":1.4699278546872718,"2342":0.9310327467857226,"2343":1.1255357309165313,"2344":-0.2866000482627311,"2345":-0.056703229050352605,"2346":-0.03322598928509018,"2347":-0.3664593658888885,"2348":-0.053041036532258945,"2349":-1.6685307422252367,"2350":0.8706218374782901,"2351":-1.2995960209282351,"2352":0.5362633195828439,"2353":-0.3117623994090677,"2354":1.1407738909620218,"2355":-1.6767241317794181,"2356":0.055593101908362454,"2357":0.5475765214490833,"2358":1.4139124681226274,"2359":-0.024210424052818588,"2360":0.018569835203089077,"2361":0.34515533409577714,"2362":-1.5031585297499792,"2363":1.4658451607747132,"2364":-1.022154495979507,"2365":-1.6830801032825968,"2366":-0.01853073590328302,"2367":1.1156436887185521,"2368":2.1571333415273557,"2369":-1.3848698164360684,"2370":0.4166870362146727,"2371":0.35763012903986147,"2372":-1.9400538680599082,"2373":-2.1909438463209012,"2374":-2.4707194798645395,"2375":-0.5080408355772407,"2376":0.44653371102710526,"2377":-0.4758479975134805,"2378":0.15382934258245937,"2379":0.12043051252670386,"2380":-0.593947311014426,"2381":0.6703877946975647,"2382":0.46406859230406583,"2383":-0.957389923736149,"2384":1.5100822820548934,"2385":1.0174197145048742,"2386":1.2303816156773337,"2387":1.2290824292820581,"2388":-0.14118707672714492,"2389":-0.12783113990445763,"2390":0.3827495138037774,"2391":-0.01503513037393086,"2392":0.5298639414835635,"2393":-0.7362129493057565,"2394":-1.2160982736015025,"2395":0.5532281312821605,"2396":-2.1353501943737663,"2397":0.37549094311009273,"2398":0.104953203604929,"2399":-1.8418445128685847,"2400":-1.2658140519198213,"2401":-0.025881081240270856,"2402":0.33355467545692613,"2403":-0.4579504011463145,"2404":-0.3821196937204039,"2405":-0.32295486979991883,"2406":-0.10107354746703612,"2407":0.3675978036788038,"2408":7.054108072849414,"2409":9.06219716621373,"2410":4.093326077665984,"2411":0.8128189809509132,"2412":-1.0715812255321955,"2413":2.4551362941008703,"2414":0.2968729888216875,"2415":0.17433866029884088,"2416":-0.3489551645951596,"2417":-1.6367647228779008,"2418":-1.6044847201380144,"2419":-0.5787907596709794,"2420":0.193659578430608,"2421":0.5607107639952214,"2422":-0.14002628530221525,"2423":-0.06662442667150341,"2424":-0.6849145617144317,"2425":-1.1668454883596495,"2426":-0.3408032998637928,"2427":-0.9455301178303188,"2428":0.5859466191692261,"2429":0.7500151531389118,"2430":0.6910231114936072,"2431":-0.015866911999961597,"2432":-0.9880855407699823,"2433":-0.2550917780524392,"2434":0.792547109266356,"2435":1.2389114804718746,"2436":-0.6551990265862222,"2437":0.06417915293508475,"2438":-1.1164691323280056,"2439":1.1609654156439024,"2440":-1.8983134050112753,"2441":-0.19785903028378127,"2442":0.3739852948812059,"2443":-0.2864586540796019,"2444":-0.2886627551393094,"2445":0.322635194303535,"2446":-0.32341950632158994,"2447":0.8992114284463111,"2448":0.45999031832374165,"2449":-0.08751208151220648,"2450":-0.2940577675039931,"2451":-0.12056167241130135,"2452":0.0336355846867425,"2453":0.5840663662513116,"2454":0.6260860033971111,"2455":0.26515286946905076,"2456":0.40061964596641064,"2457":0.3123567325877734,"2458":0.0680821878479997,"2459":-0.14269544048501076,"2460":0.913480325517173,"2461":0.7483220715599471,"2462":0.6539336327325328,"2463":0.5668662292524812,"2464":-0.9398541100681707,"2465":-0.5246867802436297,"2466":0.5435214366519088,"2467":-0.22438778756912983,"2468":-0.39892636057528386,"2469":0.1702662736287928,"2470":0.3109184610095471,"2471":0.8722613482866544,"2472":-0.13017397073979348,"2473":-1.6166579703604937,"2474":-0.2634267394128586,"2475":-0.26909019383408744,"2476":0.572738465757622,"2477":0.44345081514753254,"2478":-0.5041645844796929,"2479":-0.1533651879678634,"2480":0.002179531115809003,"2481":1.4820557096041969,"2482":-1.7487128100456935,"2483":-0.3534819959241084,"2484":-0.041021232534719135,"2485":-0.23622509860980812,"2486":-0.07592913128383828,"2487":-0.21346558455339915,"2488":-0.1082746963726363,"2489":-1.3624832759130272,"2490":-0.07885370166905427,"2491":0.801460635643481,"2492":0.5289552233930915,"2493":0.918687941541274,"2494":-1.1657334170226406,"2495":0.05729413365511168,"2496":-0.39338467647038056,"2497":-0.18734429045636142,"2498":-0.06728391071067255,"2499":-1.1689554899203045,"2500":-1.0676281336137885,"2501":0.013704253651960083,"2502":0.4752394431170134,"2503":-0.8694739603198512,"2504":-0.9286907822342036,"2505":-0.8780465778622455,"2506":-0.4899413635954267,"2507":3.7421382202297115,"2508":7.354839877880856,"2509":0.18439727455251442,"2510":-1.4308494647368615,"2511":2.119306434695225,"2512":-0.2380167227630482,"2513":-1.4189950312255284,"2514":1.3302639158844296,"2515":1.3985702767863029,"2516":3.6225344497075502,"2517":2.3845550461726424,"2518":0.6261074568142945,"2519":0.8149216316584353,"2520":1.1869280424569657,"2521":0.11014320983846101,"2522":-0.5498500639288112,"2523":1.1144213194704,"2524":-0.8087585946755642,"2525":0.4110409696557713,"2526":-0.8926162272047595,"2527":1.5758704657162812,"2528":0.8887106928069554,"2529":-0.3872670971674642,"2530":0.4679151330532163,"2531":0.2082089982850525,"2532":0.48746642229445303,"2533":-0.10848949347953013,"2534":0.3164791791386398,"2535":-1.6804537505087556,"2536":1.091257582096389,"2537":0.43934913300809153,"2538":-0.825925999209238,"2539":0.10254183162889814,"2540":0.7454104179204848,"2541":-1.332934191571646,"2542":-2.4247407025173247,"2543":1.0712320955271668,"2544":-0.6953474817424756,"2545":0.1586704411224891,"2546":-0.6224197336385366,"2547":-0.6253139702706157,"2548":-0.8810601365493388,"2549":-2.0746015318920974,"2550":-1.4310180452986367,"2551":0.41425583959393164,"2552":2.283444659499128,"2553":2.1647914831845267,"2554":-0.9764007768690337,"2555":-0.15260736857924836,"2556":1.0058438551476871,"2557":-0.9579967702908808,"2558":-1.2864295916223083,"2559":0.7972137760205128,"2560":1.1507172903546474,"2561":0.3438037025056581,"2562":1.581857374875321,"2563":0.09036127203412449,"2564":0.4509154118710595,"2565":0.24829442427885012,"2566":1.527357599756181,"2567":-0.7432563877076881,"2568":1.6281739818190577,"2569":0.47239475284929794,"2570":1.3857450151158748,"2571":0.4397372722837171,"2572":-0.067899946910344,"2573":1.0448939786526144,"2574":1.4369981300962764,"2575":-1.3394388385487122,"2576":-1.031451930535623,"2577":0.28450401382664386,"2578":-1.377428444723952,"2579":-0.31776750265859666,"2580":-0.3542258890991673,"2581":0.8911920271307965,"2582":0.8132672388153183,"2583":1.186425561064975,"2584":1.3913994900613167,"2585":3.92344121354993,"2586":1.7481966225552457,"2587":-0.09714862063559924,"2588":-0.5889506396648412,"2589":-0.38500766834871564,"2590":-1.082258805234568,"2591":1.335038855684038,"2592":1.7955460167754174,"2593":2.801198421091143,"2594":-0.1587723555509949,"2595":-0.2536905010951244,"2596":-1.4442270951531315,"2597":-1.3008444928814498,"2598":2.453498762223726,"2599":-2.3844276490073546,"2600":-0.8418730123735778,"2601":-3.379902286661369,"2602":-0.5286313890439781,"2603":1.0717307657672603,"2604":-0.9016397822139718,"2605":1.9752410046788953,"2606":0.4131316468968442,"2607":-0.3160069450510124,"2608":0.08980803004753332,"2609":0.23852615032779748,"2610":0.4377373552330136,"2611":1.1410336837325146,"2612":0.968599043827961,"2613":-0.02612279200705378,"2614":-1.9911961694315161,"2615":-0.941286105803163,"2616":-2.1078508369346647,"2617":1.4357048555107603,"2618":-1.264307108796175,"2619":-0.4787900278203195,"2620":-0.3474926415014615,"2621":0.5309752901041499,"2622":-0.463287534464898,"2623":-0.10047309581985246,"2624":-0.3222127359568646,"2625":-0.847240351970063,"2626":-0.18970310690489034,"2627":0.278287038327312,"2628":0.6223896015416722,"2629":-1.3350818345109285,"2630":1.2295473100444931,"2631":-0.5713802623350471,"2632":-0.35558805993252784,"2633":0.7432076457093902,"2634":-0.020226293961889966,"2635":-0.917600367965515,"2636":-0.888128845502678,"2637":0.533537934955171,"2638":0.6657706439218515,"2639":1.0563729849664427,"2640":-1.60106728521239,"2641":-0.7687718903056848,"2642":-0.5641857349947416,"2643":-0.2046112865604195,"2644":-0.4752376223837089,"2645":-0.7512868292365438,"2646":-0.326809985727447,"2647":2.0924657107095976,"2648":-2.433000053487332,"2649":1.109602245572414,"2650":0.8164884203264141,"2651":-0.4729093000340338,"2652":-0.8861098797922066,"2653":-0.35267500940451824,"2654":3.294183800738803,"2655":1.6838744255607219,"2656":0.6771337737401054,"2657":-0.5429826148109381,"2658":0.8614874694986948,"2659":-2.265979341266195,"2660":1.3059784684264004,"2661":-0.44428283559269605,"2662":-1.844392975288654,"2663":4.29443026221828,"2664":3.0294553502399015,"2665":0.9984615334534489,"2666":1.0628054565373086,"2667":-0.947167200718794,"2668":-0.5133347807998413,"2669":0.34977547685612725,"2670":-0.972708899094343,"2671":-0.8866529137586221,"2672":1.1547084771270533,"2673":1.9702400922991417,"2674":1.7691179261354215,"2675":-0.17953469487397467,"2676":1.172590060064205,"2677":2.2344898700197238,"2678":0.23826569247349053,"2679":0.33160905039177685,"2680":-2.4273192325428785,"2681":-1.3655238058764432,"2682":0.3618420409048656,"2683":-1.3330270518225742,"2684":0.8521715457638037,"2685":0.5567679474813344,"2686":-0.7509106455927161,"2687":1.2579701689664708,"2688":0.723224997448975,"2689":0.8348726556131576,"2690":-0.3246643458011377,"2691":1.046230052417054,"2692":0.5560773372932287,"2693":1.4976596781795368,"2694":-1.0883505630970651,"2695":-0.33725072485682606,"2696":0.25291865044385264,"2697":-0.2337203651292149,"2698":1.246295514784017,"2699":-1.068620837314745,"2700":-0.6759018069614655,"2701":-0.29964240807920545,"2702":0.6356074222496708,"2703":1.030006559244855,"2704":-0.7127284377584843,"2705":0.562453455820435,"2706":0.19534977709826437,"2707":-0.0999678057741781,"2708":0.010114692505283272,"2709":-0.30281544928279025,"2710":-0.3946249016386839,"2711":0.14301485798417815,"2712":0.37828160245451364,"2713":-0.20879107566869268,"2714":0.2259055274265863,"2715":0.6528661894293782,"2716":-0.4674612386205005,"2717":-0.5419297093310401,"2718":-0.4656391669476349,"2719":-0.07138433767869017,"2720":-0.009417814681659701,"2721":-0.09176426742233663,"2722":-0.1717593636038267,"2723":0.17676835282609635,"2724":0.524896027984291,"2725":0.29577406876373163,"2726":0.23247820448165066,"2727":-0.14281031973488098,"2728":-0.3561409890196,"2729":0.039438119031151894,"2730":0.30409611075757087,"2731":-0.1108811681856871,"2732":0.09094049161545721,"2733":-0.8122544433486139,"2734":-0.4804402872374733,"2735":0.05782688882398614,"2736":-0.057808966714696396,"2737":-0.44941570762582667,"2738":-0.4308248259906792,"2739":-0.32414565548636637,"2740":-0.23369465693476257,"2741":0.12585198439356818,"2742":-0.09955581043577448,"2743":0.12087104962584294,"2744":0.9789731089130945,"2745":13.458877317840384,"2746":-0.3174764701190678,"2747":-0.722559799333337,"2748":-0.5863241625388556,"2749":0.19626574159712254,"2750":-0.2730081427936126,"2751":0.080882875540311,"2752":-1.1451888995286024,"2753":0.3868054467286706,"2754":-0.1509623900464464,"2755":-0.21846301515294875,"2756":0.1765118152150272,"2757":-0.06358007055209886,"2758":-0.440804045369726,"2759":-0.37978767647231826,"2760":0.2555170881796733,"2761":0.25778366219658594,"2762":-0.1348929364795807,"2763":-0.5174052175728593,"2764":-0.13163900580126914,"2765":-0.3097500145934641,"2766":-0.2119049286772075,"2767":0.08285556188620133,"2768":-0.08872120426231916,"2769":-0.5357994102198985,"2770":-0.23797430557451274,"2771":0.8175502247488677,"2772":-0.14542931653422686,"2773":-0.0011065669131775742,"2774":-0.11524089273327058,"2775":-0.13486778160609855,"2776":-0.3557107566706713,"2777":0.02088117465113089,"2778":-0.6224952713042042,"2779":-0.29524018316925166,"2780":-0.30310049477129375,"2781":-0.5274585454035138,"2782":-0.00852776935171147,"2783":-0.13012113859700272,"2784":-0.21947162921074775,"2785":0.016238856940732637,"2786":-0.1616076707956981,"2787":-0.4208570399121042,"2788":0.6891452753517254,"2789":-0.4117679908782842,"2790":-0.714625696996844,"2791":0.13864154483058558,"2792":-0.05356523596168407,"2793":0.09696795443468277,"2794":0.5189598077899001,"2795":0.8077333104523584,"2796":0.09221461754476369,"2797":0.695932446581475,"2798":0.25442969576546715,"2799":-0.773735577959908,"2800":0.6285861873914351,"2801":-0.0019534610864029456,"2802":0.1701007721493093,"2803":0.118197258882365,"2804":-0.039661262755075484,"2805":0.07111564856221309,"2806":0.2120887150505351,"2807":-0.08913167699464904,"2808":0.44965420927999666,"2809":0.2877504524407585,"2810":-0.444358691384354,"2811":0.40060468174521807,"2812":0.2155120946255434,"2813":0.035111461677337315,"2814":0.6690302359236928,"2815":-0.23739914693674227,"2816":-0.3870787661772913,"2817":-12.583500347435299,"2818":0.5530838018314953,"2819":0.6263303434711304,"2820":0.20412781968769086,"2821":-0.1304433656239734,"2822":0.46950635306948113,"2823":-0.10801820241217176,"2824":0.4578739193290458,"2825":0.6563547313721618,"2826":-1.5830676931624663,"2827":2.446923495802078,"2828":-0.1298644676867313,"2829":0.44288209226020964,"2830":0.058218168843918214,"2831":0.01976637525179599,"2832":0.02980678580014814,"2833":-0.32013155048290115,"2834":-0.10998231337196963,"2835":-1.7460200818304563,"2836":0.09206689018232071,"2837":0.20866819624847818,"2838":0.004247961867814021,"2839":0.049873245297227926,"2840":0.184101216431815,"2841":0.09223147223603458,"2842":0.1435539913729064,"2843":0.040701535645928405,"2844":0.010552092235161424,"2845":-0.11919005884192442,"2846":0.5347291150734056,"2847":0.25249005110484884,"2848":0.2270440289608119,"2849":0.02529066072109543,"2850":-0.15641854994205653,"2851":-0.7053249652084816,"2852":-0.17051758210286974,"2853":0.26121408185314415,"2854":0.5813200982380676,"2855":0.15182036162224707,"2856":0.36958120314121806,"2857":-0.09253385941497975,"2858":-0.21365670281872873,"2859":0.19139233032887557,"2860":-0.005620113851538915,"2861":-1.0636954252143453,"2862":-0.4102869060372273,"2863":-0.24565732383129585,"2864":-0.22441779016470662,"2865":0.1393443808183904,"2866":0.0979842524426117,"2867":0.040968202550407,"2868":0.2616758039893882,"2869":0.7949740241108335,"2870":-0.5874513310979923,"2871":0.7200487082994098,"2872":0.07142669851845869,"2873":-0.1582187040502085,"2874":0.3579309119240693,"2875":-0.5225632486972432,"2876":-0.16250053763847266,"2877":0.048667418710940547,"2878":-0.1267944767776299,"2879":0.31981059057024364,"2880":0.6347174549471204,"2881":0.41066182805362805,"2882":0.5469128910063347,"2883":-0.18825174448776613,"2884":-0.3165730531019662,"2885":0.4599182378464121,"2886":0.2170610869047284,"2887":-0.18798467815487863,"2888":0.04381743463616975,"2889":0.4006029526993506,"2890":0.059417767382543896,"2891":0.18226704408840685,"2892":0.3293071761337642,"2893":-0.2507986525423094,"2894":-0.1651877006882536,"2895":0.41543946793372943,"2896":-0.4275878003464271,"2897":-0.593572061182515,"2898":0.011584382080854425,"2899":-0.32423555891633504,"2900":3.168974826262042,"2901":1.2255649132849167,"2902":0.4436979439114329,"2903":-0.19464491219422853,"2904":0.8436613085422444,"2905":0.9354442277080665,"2906":-0.3171623440180906,"2907":-0.04582094415300915,"2908":-0.26648188321498967,"2909":-0.12539235870799073,"2910":6.865935284107544,"2911":1.7468755924351673,"2912":0.763798534202393,"2913":0.4574971095817832,"2914":0.29455216400600975,"2915":-0.11215480024487721,"2916":0.08342792952015733,"2917":-0.0747038060671098,"2918":6.751952618068269,"2919":-1.6148128450193053,"2920":-1.2953612544591138,"2921":-0.9705561505262039,"2922":-0.29605177426856255,"2923":-0.2072910545023347,"2924":0.07503023536066163,"2925":-0.43918681847251373,"2926":-0.037227561127452374,"2927":-0.7176639190254973,"2928":-0.2568075760208824,"2929":0.14828923443899575,"2930":-0.232653041238268,"2931":-0.4317316523474826,"2932":0.47456441584352366,"2933":0.39358270732901735,"2934":-0.272247985435617,"2935":0.35314413163191816,"2936":-0.3416425972042003,"2937":0.12452537771167692,"2938":0.1188692390561082,"2939":-0.5833163521444363,"2940":-0.14851811204895896,"2941":0.5558937967343703,"2942":-0.2401029175059434,"2943":0.36077948982776226,"2944":-0.1709045289528628,"2945":-0.3307481100589199,"2946":-0.2411941468943475,"2947":0.9484328223527687,"2948":-0.5161061760292586,"2949":-0.3215544643741133,"2950":-0.14402499491164628,"2951":-0.2750704324944653,"2952":-0.16666691562897806,"2953":0.30473616444019214,"2954":-0.4580124874801806,"2955":0.1269743394400216,"2956":-0.9372821666260787,"2957":-0.803991903991075,"2958":-0.957176700068608,"2959":-0.21278590993538432,"2960":0.5014362430953982,"2961":0.38549532335146425,"2962":0.8447001372740095,"2963":0.3086518597332875,"2964":0.14920353609949438,"2965":-1.6595476885718594,"2966":-0.7702738824448105,"2967":-1.679512436839914,"2968":-0.821334216339433,"2969":0.25454724894579167,"2970":0.26406762900476366,"2971":-0.24677167839898254,"2972":-0.4617053000331787,"2973":-1.3499112839815113,"2974":-0.8058062002204791,"2975":-0.8606114289473827,"2976":-1.1313568150856954,"2977":-0.5375094855879703,"2978":-0.1724104112084709,"2979":-0.28772630775541247,"2980":-0.24583284667778793,"2981":-0.9631592557028201,"2982":-6.95494231557367,"2983":-7.371295187783646,"2984":-2.074732116620884,"2985":1.0628335847876291,"2986":-1.230570074539426,"2987":-0.8063730071012529,"2988":-0.19469811313975713,"2989":-0.4014589382425548,"2990":0.1525653204526448,"2991":7.493776152434682,"2992":0.006033711489739184,"2993":-0.016227150150717178,"2994":0.14393891033564046,"2995":-0.3321826562832211,"2996":-0.902322614156007,"2997":-0.01571612618826254,"2998":1.3336922092013848,"2999":1.358549371973088,"3000":0.5448463791664248,"3001":-0.8760006542361383,"3002":-0.16400926868427754,"3003":0.6548632508486136,"3004":-0.2875054206324454,"3005":0.2951951312641136,"3006":-0.6201765334964527,"3007":-0.5867182150346967,"3008":0.7516533192854763,"3009":-1.2916708523949825,"3010":-0.010933478103792905,"3011":-0.2742486968543778,"3012":0.0859585201828373,"3013":0.20397498009131868,"3014":-1.3126504600429967,"3015":0.5948616714479597,"3016":-0.20744072858418386,"3017":0.17952992638503365,"3018":-0.19121260908739685,"3019":-0.46536174852045714,"3020":-0.10416618814745714,"3021":-1.1120210914166722,"3022":0.5657329818412579,"3023":-0.8154149538739062,"3024":0.3832590981468575,"3025":-0.1248345501917479,"3026":-1.0373304592017636,"3027":-0.3486218172799492,"3028":0.5951069079078924,"3029":-0.6125172487072302,"3030":-0.6781751262925585,"3031":-0.5500777752115728,"3032":0.45835129702680283,"3033":0.2407351915337077,"3034":2.4773809731890744,"3035":0.5756721249396801,"3036":1.5857608022707408,"3037":-0.11826668288526733,"3038":0.12687325401658503,"3039":0.20412944277263606,"3040":-0.3173189529831176,"3041":0.38455199239271426,"3042":1.0131021623210958,"3043":0.45862583754604735,"3044":-0.32836366031005393,"3045":-0.7079973017109378,"3046":0.3626430816569313,"3047":-2.5244612856979756,"3048":-0.5283197419605793,"3049":1.3094896067024466,"3050":-2.1010649679134557,"3051":-0.7123001006362963,"3052":-0.9328333071764532,"3053":-0.9527458561489476,"3054":1.574030700362907,"3055":-0.3179972825587361,"3056":-0.5049491016548047,"3057":-0.11935728983046313,"3058":-0.33616157870593094,"3059":0.4416225874658688,"3060":-0.15682857153037044,"3061":-1.6415623777414325,"3062":-1.3858280376288967,"3063":-0.24238372206288747,"3064":-1.3754254552828715,"3065":-2.396864164243553,"3066":-0.6553496671259635,"3067":-0.9337479763083698,"3068":1.0715418629416371,"3069":-2.7781768818444803,"3070":-1.335168088171009,"3071":1.5883261653896952,"3072":0.14935442536385723,"3073":0.072405313939656,"3074":0.0053925322574469685,"3075":0.6886478829675415,"3076":0.22653139889161414,"3077":0.8225447039943224,"3078":-0.04036728696488491,"3079":-0.6096037899596884,"3080":2.0831800421011963,"3081":0.5395597769677684,"3082":-2.0165455558381056,"3083":-2.6564243095292843,"3084":-1.1793071639829154,"3085":-0.7181091735310557,"3086":-0.3088664019216137,"3087":-0.13972538434432366,"3088":-0.27695791914582385,"3089":0.06740264989624213,"3090":0.932083402359151,"3091":-1.5556507109004944,"3092":-2.8762180021664165,"3093":-2.8860124546306483,"3094":-2.906637899702055,"3095":0.32714903976744386,"3096":-1.1578808650211443,"3097":-2.429625095824366,"3098":0.6420928786664557,"3099":0.2546096194543067,"3100":-0.3592362791227193,"3101":0.7815207423150574,"3102":-0.006780819097620798,"3103":-0.09825827801866134,"3104":-1.313725848753421,"3105":0.5558484169198977,"3106":-0.46340101609422973,"3107":0.21976479005107916,"3108":0.6602774458682915,"3109":1.5098200461440474,"3110":-0.8672919984713772,"3111":0.4189153965170872,"3112":1.1767176640773254,"3113":-0.2881000942092844,"3114":-1.068646750903974,"3115":2.024525643468319,"3116":-1.2003013412062933,"3117":1.1823517708294373,"3118":0.8791404992275629,"3119":-0.9634432117757397,"3120":0.07613506117608398,"3121":-0.5880047531916182,"3122":-0.36348380091737825,"3123":-1.4864300539919308,"3124":1.543121446435269,"3125":-1.0073852784208663,"3126":0.8648492871940391,"3127":-0.7570857909577071,"3128":1.4780724757801293,"3129":-0.18562825673448058,"3130":-0.43348978767760776,"3131":0.39107036218218105,"3132":-1.793753231869795,"3133":-0.6825222150325576,"3134":0.041190180903879124,"3135":0.008767190625857423,"3136":2.716541974630973,"3137":1.5628086989766352,"3138":1.8111640737800188,"3139":0.4502447751295991,"3140":-0.4947232810208675,"3141":0.8597459705129513,"3142":-0.9688099346752725,"3143":-0.3734590367533711,"3144":0.4929509997058005,"3145":2.5900165702679905,"3146":3.3178865436993323,"3147":1.0644730262586086,"3148":2.3523992352425203,"3149":0.8237893651310677,"3150":-0.38672355347205484,"3151":-1.5553576086133087,"3152":-0.14361115505475291,"3153":0.0411200149043861,"3154":-1.4432595365572285,"3155":-1.7043848893404743,"3156":-1.3163342557816549,"3157":-0.18237336650790326,"3158":-1.1987645562505045,"3159":0.19787050299410006,"3160":-1.0416113301719288,"3161":-1.4397579727511882,"3162":-1.1134160665342243,"3163":1.2999622788639777,"3164":2.275607924595066,"3165":1.3007565525182136,"3166":-0.17937958226289116,"3167":2.1738028896524937,"3168":-0.9576613734580316,"3169":1.1737159524048433,"3170":-0.5508972050040507,"3171":0.95545216588169,"3172":-0.8110479613526692,"3173":-1.5592242629800728,"3174":-0.4709628493773934,"3175":-0.6754547799662761,"3176":-1.1458992589772854,"3177":-0.18719510703797992,"3178":-0.5436917751231466,"3179":-1.0312181284040136,"3180":-0.025291880100248052,"3181":-2.4460061506554833,"3182":-0.8105821393848471,"3183":-0.09639084483057721,"3184":0.7237949766341181,"3185":0.9245184194616868,"3186":-0.20487351166152817,"3187":-1.343996432956864,"3188":-1.2245616037787923,"3189":2.8713599887058163,"3190":2.0365880664479477,"3191":-0.5690920742071721,"3192":1.857806891759041,"3193":-0.23414400290498666,"3194":-1.8308368071818226,"3195":-0.5020259517032634,"3196":-1.388616720912785,"3197":0.5860279805235246,"3198":-0.6675125505802654,"3199":-1.8085454736113007,"3200":2.2412416527155554,"3201":-0.16887013070229467,"3202":-1.2547255688982064,"3203":-0.1749843209011181,"3204":-0.07460548257503512,"3205":-0.35904137179897405,"3206":-0.15592837269067084,"3207":-0.5264407703294355,"3208":-0.3907700745410048,"3209":1.2835796995887754,"3210":-0.23653820120991081,"3211":-1.096887775794651,"3212":-0.6848617172856563,"3213":-0.30346891969242595,"3214":-0.08052345798174755,"3215":-0.3895354835187119,"3216":0.22646018164118406,"3217":-0.28760133178944297,"3218":-0.8493911275694548,"3219":-1.5525596481274209,"3220":-0.7462189087310788,"3221":-0.6387961518412997,"3222":-0.5233764951070717,"3223":-0.4550974664970329,"3224":-0.34236386969497806,"3225":-0.8189932440078946,"3226":0.13427097582853448,"3227":-1.3603470219621652,"3228":-1.695448429363439,"3229":-1.1448777233507605,"3230":-0.7848133958168266,"3231":-0.23647333240442533,"3232":-0.30656314590051903,"3233":-0.35826738274664754,"3234":-0.7185737839334336,"3235":-0.15413240975712264,"3236":3.260904433990474,"3237":-1.2400736296766084,"3238":-0.3122899460606198,"3239":-0.12134098490930915,"3240":-0.4151727394489182,"3241":0.03394639380811197,"3242":-0.41993419237085383,"3243":-1.3659928463899649,"3244":-0.39407431087047473,"3245":1.0685517226308174,"3246":-1.2052886336525594,"3247":-0.8908849884220224,"3248":-0.05337127930519706,"3249":-0.20878892086482723,"3250":-0.3108219217106581,"3251":-0.4331378409604002,"3252":-0.7974153806517836,"3253":-1.4360389439093726,"3254":-1.4911989245874375,"3255":-1.0731641518349235,"3256":-1.1330107741086322,"3257":-0.8976023464078162,"3258":-0.5997834715977547,"3259":-0.3449309532777451,"3260":-0.5284607056231059,"3261":-0.7496203479424501,"3262":-0.5249479323484566,"3263":-0.2927768065290667,"3264":-0.9528973362856562,"3265":-0.7218948825656827,"3266":-0.9905751497673313,"3267":-0.40559946205180236,"3268":-0.4116819980118317,"3269":-0.3820109056096477,"3270":-0.18174277640189815,"3271":-1.474101714260638,"3272":1.3779284353278909,"3273":-0.5895518452888011,"3274":-1.1724237014122223,"3275":-0.9331765995246182,"3276":-0.39399189543143465,"3277":-0.25452747723875124,"3278":-0.23878234554289965,"3279":0.12868140718749008,"3280":-1.8024510898130637,"3281":-0.48875128159106507,"3282":0.8089378126335052,"3283":-1.6166146476475056,"3284":0.07308846838727372,"3285":-0.0398336823762336,"3286":0.5677385854158663,"3287":1.9359826041131416,"3288":1.421771379819062,"3289":-0.9594039201750613,"3290":0.5602443589374515,"3291":1.3577389475043675,"3292":-0.42190929194515026,"3293":-0.3687584599987206,"3294":2.0152715423803733,"3295":-0.702310655287664,"3296":-0.014069904255825933,"3297":-0.11826135416235724,"3298":-1.4299456823596977,"3299":0.3905373977852569,"3300":0.5634118805784606,"3301":-0.10734151859846328,"3302":-0.28542978543337133,"3303":-0.48955984867184876,"3304":-1.162605105515971,"3305":0.7825068774301632,"3306":2.3999448995760835,"3307":-1.031226268714971,"3308":-1.1248912730494174,"3309":0.6246071866007689,"3310":-1.479030481788411,"3311":-2.4186648525876695,"3312":-1.4840090991857542,"3313":-2.1902765793712784,"3314":-0.3444663618647522,"3315":-0.7488489424827444,"3316":0.28142004383639113,"3317":0.874935926142819,"3318":0.27238565290644984,"3319":1.0056099472208972,"3320":1.636485663792173,"3321":2.640716837614445,"3322":2.5987514474798665,"3323":1.0398012518322608,"3324":-0.06118002826066031,"3325":0.7100865449904892,"3326":1.8222102237583342,"3327":0.8411839243823717,"3328":-0.3661560483572743,"3329":1.652353184653292,"3330":3.709915450767556,"3331":3.779058590241424,"3332":3.064460207588221,"3333":3.223451600101812,"3334":-0.5116893261919807,"3335":-0.17302668460969656,"3336":0.30274304381050543,"3337":1.0806955723307978,"3338":0.7273602192426616,"3339":0.9552331653600947,"3340":-0.32373135718823914,"3341":1.4289915406052436,"3342":-1.0622495277593484,"3343":2.5824119723272214,"3344":0.6870096297417051,"3345":-1.0070564385909628,"3346":-1.4145471850250784,"3347":-1.8979422863579996,"3348":-0.8147500409193326,"3349":0.20715746637805496,"3350":-0.23593947951202793,"3351":-0.41625147089627446,"3352":-0.04570782980003598,"3353":1.248031541203556,"3354":-0.09407910822141727,"3355":-1.2092705961164893,"3356":0.9787857644398026,"3357":-0.9442081607065225,"3358":1.4135902068958588,"3359":-0.024606970410825543,"3360":-0.7500543811556055,"3361":-0.3194679359361201,"3362":-0.8756682481132744,"3363":0.6654869736581038,"3364":-0.16746853323352925,"3365":0.13950723511612145,"3366":0.590493783181434,"3367":-0.10755791956035352,"3368":0.15709154754460208,"3369":0.5751815949140934,"3370":0.7084419795276758,"3371":-0.03783442343072016,"3372":0.4999022996907676,"3373":-0.14423966125568527,"3374":0.6932482453257995,"3375":0.34419815473089777,"3376":0.34947263575554866,"3377":0.12405629436057153,"3378":-0.15115734988291005,"3379":0.5377004676961805,"3380":-0.11606677948012951,"3381":0.36457410451584854,"3382":-0.5496707883203512,"3383":-1.1551648069333729,"3384":0.2510316771036415,"3385":0.9229517942798551,"3386":-0.6881321627718464,"3387":0.10146780101873717,"3388":1.0412066301272827,"3389":-0.3605852578471104,"3390":0.22544447808065288,"3391":-0.3889808694856232,"3392":-4.411479997421585,"3393":-2.1579103708446774,"3394":-0.46704738422090614,"3395":1.2663935515556,"3396":-0.5567526488475781,"3397":0.6757654475373666,"3398":0.13490121889686418,"3399":0.08331242503687718,"3400":0.45811796400474225,"3401":-1.8846779726152507,"3402":-9.811530058046275,"3403":0.8291297624506846,"3404":-0.16033909724311718,"3405":-0.0413266364948475,"3406":-0.7255284840550557,"3407":-0.20245344174152619,"3408":0.04484773313071186,"3409":0.3700461832599184,"3410":-2.836134702269629,"3411":-1.9441284396265657,"3412":-0.8157176330967814,"3413":0.26119030488000045,"3414":0.8068188833173775,"3415":-0.00669178015082886,"3416":-0.5239119269104006,"3417":0.006447184842900911,"3418":-0.4907218130014225,"3419":-0.9215958752169736,"3420":0.16887712410456068,"3421":-0.3400287751005142,"3422":-0.0029787638997842546,"3423":-0.21512771481983575,"3424":-0.3641437587534682,"3425":0.4592681878784911,"3426":0.6560618454048203,"3427":0.22410606905006958,"3428":-0.11110914520721564,"3429":-0.9418016510993961,"3430":-0.15384113393666407,"3431":-0.05766029623213415,"3432":0.8933731572290929,"3433":0.3043381772144132,"3434":-0.27069605831358506,"3435":-0.796388702175921,"3436":-0.3911949108874217,"3437":-0.31972629538861697,"3438":-0.027719096440501544,"3439":0.0010794659214963236,"3440":0.3268096620736809,"3441":0.39871790065967927,"3442":-0.17197391339624848,"3443":0.731013239405797,"3444":-0.9958128096414639,"3445":0.12329764265093984,"3446":-1.0991722112592297,"3447":0.13612526356874957,"3448":-1.678142764897008,"3449":-1.1090419209654665,"3450":-0.43114023874936874,"3451":-1.1768586540592951,"3452":-1.9278369268927689,"3453":0.024529154416926522,"3454":-0.725017027966225,"3455":0.9043767353206588,"3456":0.4352060736262248,"3457":0.08705190255272939,"3458":-0.7892707252818856,"3459":-2.073656415833749,"3460":-0.39831742897904465,"3461":-0.0886050687932114,"3462":-0.556223528047977,"3463":0.5015827512033139,"3464":-0.0815153540910095,"3465":0.38790752844050325,"3466":-1.1502422477196583,"3467":-1.541361921632899,"3468":-2.030501657428537,"3469":-1.5494700652800888,"3470":-0.7939206132875002,"3471":-0.4701175586124576,"3472":-0.6129275987327023,"3473":0.5385753871578676,"3474":1.0623129803128892,"3475":-0.5453488384084814,"3476":-1.323584511576183,"3477":-0.4665627448680839,"3478":-1.649974629927832,"3479":-0.8137921079161673,"3480":-1.20607968188602,"3481":-0.6741353552944905,"3482":0.03154756051258411,"3483":2.2014379396838906,"3484":-1.0202051156066312,"3485":-1.6396068176306418,"3486":-2.2744317720690983,"3487":-1.2671735726291038,"3488":-0.24352349200898388,"3489":1.0478722095024737,"3490":1.112155497285696,"3491":0.6105610611306097,"3492":-0.47689404782600003,"3493":-0.8441455590910162,"3494":-1.6900622371042622,"3495":-0.5140678687444165,"3496":-1.1758859439985412,"3497":-0.6323349987406282,"3498":1.6394611434386692,"3499":-0.44236468927016415,"3500":-1.7827959818094044,"3501":0.12858076718697936,"3502":-1.3409007935907815,"3503":-0.8737534984458899,"3504":-1.7462305807076541,"3505":-1.3889605650923549,"3506":-1.3309050644573726,"3507":-0.7072841365870848,"3508":-1.2054099672092733,"3509":-0.8331966714665515,"3510":0.0002691602051900844,"3511":-0.5270403264035577,"3512":0.019623153595957343,"3513":-0.8720367041132997,"3514":-0.5833554860508579,"3515":-0.7992185838114163,"3516":-2.0147340906127256,"3517":1.6739470793085567,"3518":-0.9063174752937811,"3519":1.1666029658648138,"3520":-0.10819371765692243,"3521":-0.2230761713606713,"3522":-0.15917037229018577,"3523":-1.10326657718895,"3524":-1.2024164084154085,"3525":0.8783102093813346,"3526":0.5318396573547876,"3527":0.005315310236785535,"3528":1.2125812026632445,"3529":1.1173553549543498,"3530":0.06025020694934115,"3531":-0.49160232031990386,"3532":0.30669416928338666,"3533":-0.6000878364771691,"3534":1.7770723330233356,"3535":1.577423232229465,"3536":-0.11638801564707377,"3537":0.9497038927675393,"3538":2.134505739179194,"3539":0.9825766366357389,"3540":0.6327949224671494,"3541":0.8338363460942506,"3542":0.2641664030649102,"3543":0.12639292693581286,"3544":-0.17189107860437464,"3545":-0.5831494060150743,"3546":0.0486790043277591,"3547":0.7615142893114714,"3548":1.3744268104095834,"3549":0.21129991886592808,"3550":1.484848461240667,"3551":-1.262425800327218,"3552":-0.23922317328433773,"3553":0.18899559856151066,"3554":-2.045853100979898,"3555":-0.5299959418448326,"3556":-0.5323863110982175,"3557":1.3259389402684303,"3558":0.29073084088057427,"3559":2.4509151605905526,"3560":1.0507408657090094,"3561":1.8194965138539325,"3562":-0.5473032015704037,"3563":-0.542264867688034,"3564":-0.35302967979089084,"3565":1.9018496437324135,"3566":0.24306428635181296,"3567":0.02627000064693185,"3568":-0.3996797174882384,"3569":0.4582920226628498,"3570":-1.3510462998660249,"3571":0.84497585419651,"3572":0.3479904199278346,"3573":-1.6260427004856293,"3574":0.8298967847791352,"3575":0.39374141175205346,"3576":0.40186966986695344,"3577":-0.7304177439364471,"3578":0.7005081134226849,"3579":0.2227847690015543,"3580":2.6871568907889265,"3581":-0.9190315640245704,"3582":0.07030142458297978,"3583":-0.17545880454290058,"3584":1.0392165510703872,"3585":1.1810274782916486,"3586":1.2184581671794161,"3587":1.4460092454116877,"3588":0.22541191032261534,"3589":-0.29759242227900345,"3590":-0.9278112408995561,"3591":-0.3455637282582786,"3592":1.5919231562886664,"3593":0.133583919568618,"3594":2.163742359331235,"3595":0.21338848705201083,"3596":-0.17743194583804742,"3597":0.7219817266152505,"3598":1.4951341222584298,"3599":0.28636798239124395,"3600":1.9621426234580697,"3601":-0.41480219093895077,"3602":1.538503838520204,"3603":2.373078503944056,"3604":0.2071094974500375,"3605":0.9060904078019638,"3606":0.4496123442796613,"3607":0.3672462556122247,"3608":0.7673709549214931,"3609":-0.6251960321457545,"3610":-0.4466390052940559,"3611":0.28773950797418935,"3612":0.49963458467640864,"3613":-0.18826229396326302,"3614":-0.48277527168408085,"3615":-0.18248412519920013,"3616":-1.1467797244555211,"3617":-0.8156685374622357,"3618":-0.4051849817514623,"3619":1.5940651679856657,"3620":-0.19379963850803522,"3621":-1.161892192957929,"3622":-0.1164028313029023,"3623":0.645304699526145,"3624":-1.4891017329208058,"3625":1.6380435385784164,"3626":-1.2916179129702612,"3627":0.14694665016798564,"3628":1.4861010444435252,"3629":-0.06765614383157471,"3630":1.6307097827280759,"3631":1.0436488295222026,"3632":0.7967987027222297,"3633":-0.5189232865770115,"3634":0.7905494444502855,"3635":-0.12509720915612968,"3636":-0.6388274392018255,"3637":-1.2334057310452036,"3638":2.2916584026558406,"3639":3.0401345925012984,"3640":2.563164184381647,"3641":1.1156694006040033,"3642":0.6692168621789949,"3643":1.0370702446916948,"3644":0.2875324105167908,"3645":0.44951387309072144,"3646":1.4962261479880885,"3647":-1.7006041740672104,"3648":-3.3281327102112224,"3649":-4.169301122488214,"3650":-0.7730110490620228,"3651":-0.3962488094823981,"3652":-0.6566208823074315,"3653":0.8590445238453364,"3654":-0.48456323683409536,"3655":0.6987086260829984,"3656":-2.0764009824128618,"3657":-5.261081513439529,"3658":-4.337537012296118,"3659":-1.972284872307333,"3660":-1.1390585735229521,"3661":-0.5084712056481266,"3662":-0.6308863463665627,"3663":0.7751345948224163,"3664":-0.177238958994061,"3665":-0.049775775875729386,"3666":0.5608948113490092,"3667":-0.2373060917319339,"3668":-0.22272057034846376,"3669":-1.1229828765108978,"3670":1.6262304727975094,"3671":0.2699268430208033,"3672":1.6996870807206583,"3673":0.6550105512540261,"3674":-0.8791845243231533,"3675":1.2097116759213677,"3676":-0.262667680954165,"3677":0.46429360548469617,"3678":0.5071811612940003,"3679":-0.4732252663691638,"3680":0.9073667540444029,"3681":0.4937616211555341,"3682":-0.4285603920791461,"3683":-0.7307749395575283,"3684":-0.6911221632262758,"3685":-0.29185416798585456,"3686":-0.3000720424745587,"3687":0.09912477915132127,"3688":-0.8796980067941388,"3689":-0.5458243949255608,"3690":1.1842242992330971,"3691":2.2039531354879887,"3692":-1.17119603277354,"3693":0.2907101284962036,"3694":-0.5248947567295114,"3695":-1.1472166219084654,"3696":-0.823412515517529,"3697":-0.4391552205906679,"3698":0.6137636783834456,"3699":0.8447299284347006,"3700":0.2583588469167874,"3701":-0.5171041761746117,"3702":-0.44245977273626386,"3703":0.2095144240370791,"3704":0.8463770628667049,"3705":0.4390481320264376,"3706":0.8619906302393097,"3707":1.267908612652522,"3708":-1.1680052525224516,"3709":0.4340798059742463,"3710":0.8173213541144413,"3711":1.0154304613512657,"3712":-0.429831554004591,"3713":0.25908379726372527,"3714":-0.7698880608004461,"3715":0.6827401085650399,"3716":0.2745119607713078,"3717":0.7597698133154797,"3718":-0.022685844188639382,"3719":2.4274722532256767,"3720":2.0935324678124134,"3721":0.08065457315665069,"3722":0.8434766693364503,"3723":0.21731787072125808,"3724":0.7539608498407524,"3725":1.0120035677329378,"3726":-0.6553447515199794,"3727":-0.9441429436372957,"3728":-0.23955719606137854,"3729":-1.6760749541850968,"3730":2.666194932168987,"3731":4.88118910401706,"3732":4.652419465325768,"3733":3.8524985730391528,"3734":2.10787774333662,"3735":-0.8936691680892794,"3736":-0.9992020181369398,"3737":0.6787599099574949,"3738":-1.3762314069895447,"3739":-2.1754692171384495,"3740":-0.7778405969463901,"3741":-2.826251345222193,"3742":-2.6758921902588195,"3743":-1.7257619652965726,"3744":0.7289981222143392,"3745":0.747391731005547,"3746":-1.589927754823912,"3747":-0.10044491712818125,"3748":0.07849987665750656,"3749":-0.16652630962305134,"3750":-0.27899982403421747,"3751":-0.9818883544629663,"3752":0.8159248090209575,"3753":-1.4176355748017837,"3754":-1.52220498941774,"3755":0.5895674667674128,"3756":0.12518589473241065,"3757":-0.14144283700974455,"3758":1.7986043101748213,"3759":-1.0750770687030122,"3760":-0.04899823450989978,"3761":1.906952132593424,"3762":-0.6435721271212053,"3763":-1.344404506362514,"3764":0.7546787387478583,"3765":-0.38072489422102646,"3766":0.5371656874247851,"3767":-1.4038501801555547,"3768":-0.9896671760015205,"3769":-0.005769863096164427,"3770":-0.10485740629409708,"3771":0.1156142293851076,"3772":0.5580687392856708,"3773":-1.3499562363409483,"3774":-0.7851982037516757,"3775":0.4597465790475315,"3776":-0.15789142999133574,"3777":0.7352574390015374,"3778":-0.8999829595576853,"3779":1.2030901610369025,"3780":-0.2844158628500717,"3781":0.5970525045911778,"3782":0.2482861442258917,"3783":0.5140036607806364,"3784":0.0408185583724895,"3785":-0.9195670129050141,"3786":-0.6298900707263497,"3787":-1.650167557695297,"3788":-0.2706731247493644,"3789":1.755173421427059,"3790":-0.3041146694241553,"3791":0.48645956530045953,"3792":-0.4052754109873901,"3793":0.6348173957235402,"3794":-0.13619207952081147,"3795":0.5960201155854233,"3796":0.38793033092433954,"3797":1.397571046107914,"3798":0.18265311053855332,"3799":0.058007680459556885,"3800":0.7916093078673939,"3801":-0.7067397075557732,"3802":-0.715245616055534,"3803":2.834804313878825,"3804":2.883040824131843,"3805":0.09629078790608522,"3806":-0.189332951613211,"3807":0.8926139022559628,"3808":-0.10798062613352083,"3809":-1.008112184753791,"3810":0.20003686726636166,"3811":0.05160270211616501,"3812":-6.071037669000704,"3813":-7.848902770687722,"3814":-6.312718758466146,"3815":-2.118257356960595,"3816":-0.6886953643056108,"3817":0.7141392754517889,"3818":-0.32119125257698994,"3819":1.7035063821890868,"3820":-0.12443875624377965,"3821":0.8993854672290652,"3822":2.1484466474636856,"3823":0.9388113958672641,"3824":-1.1196536242402224,"3825":-0.24119404942372577,"3826":0.5826967394429658,"3827":-0.3069043164810291,"3828":-1.6203694370408732,"3829":-0.17573728960869348,"3830":-0.25321486132814996,"3831":1.8797301515894445,"3832":0.5281268190276616,"3833":-1.183908067981504,"3834":-1.5515229051284705,"3835":-0.9685160320627481,"3836":0.3017702267333456,"3837":-0.7307332958879625,"3838":-0.6727215748254189,"3839":0.6481688177238414,"3840":-0.500976966830378,"3841":-0.07545194147913294,"3842":0.8553510682837436,"3843":-0.5489335283421733,"3844":0.4031884568086056,"3845":1.227454970163113,"3846":-0.9553935346723466,"3847":-0.7139126970413078,"3848":-0.9197095703477133,"3849":-0.0880703361536825,"3850":0.3847643630251349,"3851":1.7811128327337595,"3852":-0.8045577732903836,"3853":0.4085028764046749,"3854":-0.6833614261541555,"3855":0.1276772090277276,"3856":0.08623273715651579,"3857":1.9511353113836902,"3858":0.12778977439066633,"3859":-0.01840149153300758,"3860":0.3418910952645649,"3861":-1.783813634646849,"3862":1.3128862973609703,"3863":-0.24259640428578505,"3864":-0.5876779410117501,"3865":1.1163248226425662,"3866":0.7258405124328605,"3867":-0.8632791158161499,"3868":-0.23657577969159022,"3869":1.3465060971653802,"3870":1.0659627995416776,"3871":0.6645248823651756,"3872":2.021184737812712,"3873":-0.05943969074268294,"3874":-0.4412010491853382,"3875":-0.07182047199415613,"3876":-1.765743660332316,"3877":-2.9255025878073058,"3878":-0.24988181594632833,"3879":-0.6056431168775086,"3880":-0.4838681125601047,"3881":0.2681152435354059,"3882":1.066255813976054,"3883":-1.8668720856633703,"3884":-2.6695468769533632,"3885":-1.9998245006773692,"3886":-1.832606353118858,"3887":0.718085292379541,"3888":-0.25114553572305165,"3889":1.9129668398730424,"3890":-1.4645554912246663,"3891":2.1501872891645033,"3892":1.039007791305809,"3893":-1.2908865450790792,"3894":2.6068171493509147,"3895":2.819839653208939,"3896":4.7897877353059455,"3897":4.561189470033956,"3898":0.6231774551169914,"3899":0.012305861423057026,"3900":-0.5077034263766447,"3901":1.8967301318474057,"3902":0.9288406394040225,"3903":-1.370219647709962,"3904":-0.551910872033165,"3905":0.5238443321842141,"3906":-0.9101453193700489,"3907":-1.4674345637613198,"3908":-0.2878105732767295,"3909":-0.12619502984616926,"3910":-0.12997306297995606,"3911":1.0837927743059796,"3912":-0.7693330550374216,"3913":0.4762046864974203,"3914":0.3870735251751087,"3915":1.2821434865343395,"3916":0.5778558397120231,"3917":0.06267318368709056,"3918":-0.9958937958862496,"3919":0.7876843985416393,"3920":0.5408348054878896,"3921":0.7835082721629848,"3922":-0.5511162471480059,"3923":-1.2754107550287739,"3924":1.482703769035916,"3925":0.4253859885132268,"3926":-0.7492097107751734,"3927":-0.46468561212276305,"3928":-0.8579041872041976,"3929":1.7573777028762994,"3930":1.4086014382171705,"3931":-1.5257918912974382,"3932":-1.7752230956245538,"3933":0.49534921076756777,"3934":0.26714573682860165,"3935":0.08604800697605357,"3936":1.9957247477726061,"3937":-0.18856401875664,"3938":0.38322330896616663,"3939":-0.06904989043472323,"3940":0.49857512622052785,"3941":2.3178933684673635,"3942":-0.05724953502454304,"3943":0.6512226987214799,"3944":0.3043982185050566,"3945":0.25915007488952013,"3946":0.19329924462418174,"3947":0.6923941488354775,"3948":1.8703941705750802,"3949":-0.5830341825482867,"3950":0.293621442772006,"3951":-0.29600533216949027,"3952":-0.1751137826950561,"3953":-0.4371367733471613,"3954":1.3748285627350414,"3955":0.8592491347677476,"3956":0.33814726280894974,"3957":0.20376404150283298,"3958":0.10780955847663337,"3959":0.7593651053626107,"3960":0.1034435616317929,"3961":-1.6021373540287902,"3962":-0.1620092378530126,"3963":0.6540647548173817,"3964":-1.275207244307247,"3965":-2.4500023944972833,"3966":-1.3142682433896287,"3967":-0.011517224562155882,"3968":2.039648176675924,"3969":2.1661241692008764,"3970":3.449197029655643,"3971":2.1537132656441402,"3972":-1.1354199745326279,"3973":2.184715923054615,"3974":1.6147329259437615,"3975":3.2941845312623825,"3976":-0.8864646766183061,"3977":1.1891347021372658,"3978":1.9424563206674865,"3979":0.23773924594195853,"3980":2.2509681146841305,"3981":2.3867350203162134,"3982":0.669214606667502,"3983":-0.12005250984941881,"3984":0.9248223907618756,"3985":0.6825903232712722,"3986":0.5299428437674569,"3987":-0.1979451938833161,"3988":0.4385705424840046,"3989":0.2606795743670503,"3990":-0.13478933807622454,"3991":0.12355470938976158,"3992":0.018361618954710977,"3993":-0.9214966415772959,"3994":-1.2019859725129995,"3995":-1.8225461934243787,"3996":-1.2187717488259437,"3997":-2.6854948091608826,"3998":0.32134584367278607,"3999":-0.7128670888638708,"4000":-0.07444276557500004,"4001":0.7536250709242677,"4002":1.3076714696514253,"4003":-0.5583772362024535,"4004":-2.453800858045064,"4005":-1.1472770157673082,"4006":-0.567389819814882,"4007":0.3226947635746433,"4008":0.24420431266877315,"4009":-0.25094363688571536,"4010":0.28872792462907304,"4011":0.45261350740367395,"4012":-2.593939946953409,"4013":-2.597575020334648,"4014":-0.45322719629665814,"4015":1.4517433589809212,"4016":0.7731499045293483,"4017":0.6396522281085584,"4018":0.38332500512084405,"4019":0.3899641747593801,"4020":0.2746390566299235,"4021":-0.09648299632423823,"4022":0.7016006660638849,"4023":-0.3471717965432175,"4024":-0.07691067380116794,"4025":0.02030574294430667,"4026":-0.5923058736827377,"4027":0.3710646278965786,"4028":-0.4665750616996508,"4029":-0.1782705965605915,"4030":-0.3953764303351394,"4031":0.23525846623799998,"4032":-0.6162817628915982,"4033":0.29664079134469296,"4034":0.5218463019403499,"4035":-0.1260183080730762,"4036":-0.695196504159425,"4037":0.13802541769940346,"4038":0.7320862373653404,"4039":0.02013957802514117,"4040":-0.8367052854066245,"4041":-1.0460372140458303,"4042":-1.0577482574921984,"4043":-0.7321033168672986,"4044":-0.2718566108971674,"4045":-0.8491340670938821,"4046":-0.49790831258599527,"4047":-0.7071498059603896,"4048":1.5560104527255714,"4049":-3.3356085553687835,"4050":-6.242400540594994,"4051":-4.477288694578904,"4052":-2.7541614335697506,"4053":-1.9690370989370503,"4054":-0.5002883425935587,"4055":-0.6331128050256017,"4056":0.5415445025472813,"4057":-0.3273985216061401,"4058":-5.74107286020222,"4059":2.668212017635463,"4060":3.345594098187578,"4061":1.8078687462399932,"4062":1.2217262850677042,"4063":0.8310242228758266,"4064":0.41631579005141267,"4065":0.3176387338519853,"4066":0.27863248953951786,"4067":0.7679061633619062,"4068":1.0336952279870344,"4069":1.4766028352861733,"4070":1.6929811537897845,"4071":0.9658008627147683,"4072":0.37088327468516086,"4073":-0.08947698976697546,"4074":-0.6955901882084484,"4075":0.1834348288898599,"4076":-0.29331273183944967,"4077":0.40200871192302884,"4078":0.12889935604489958,"4079":0.43618536642838357,"4080":-0.9204427585130418,"4081":-0.6505059415385853,"4082":-0.2232689689093049,"4083":0.375179184773925,"4084":0.165565916640552,"4085":-0.2636119872447059,"4086":-0.8118641792109941,"4087":-0.9075906794118234,"4088":0.09363570389413124,"4089":0.2085644414438382,"4090":-0.2604831063452754,"4091":-0.2943326198040832,"4092":-0.026999909927657068,"4093":-0.3551583525108219,"4094":-0.5306154312710628,"4095":-0.6284177786984568,"4096":0.3591048798804268,"4097":0.5726550539771863,"4098":1.3793499385322046,"4099":-0.22736800162113927,"4100":-0.5787727701092462,"4101":-2.7603976307324194,"4102":1.0829248329692827,"4103":1.1046350409578407,"4104":2.2154538212311743,"4105":-0.3840924683404824,"4106":0.6253355743803203,"4107":-1.272708291781461,"4108":0.08905146485888273,"4109":0.15850487344787928,"4110":-0.3188958783906221,"4111":-0.544767172108271,"4112":-0.42632217529036615,"4113":1.7431281918740287,"4114":0.9929681322903184,"4115":0.8885088475579721,"4116":0.14592967833612702,"4117":1.9460936592871747,"4118":-1.0078533822865627,"4119":-1.0974456364748875,"4120":0.30377836845643785,"4121":-3.174447704992548,"4122":0.24720202015816226,"4123":1.8008145521135912,"4124":-3.5720036808534723,"4125":1.141487099681797,"4126":0.3843257321664068,"4127":-2.5529716059405536,"4128":1.3894302113916535,"4129":-1.3066018896946578,"4130":-1.4990820119570631,"4131":-2.4007907868861507,"4132":0.5316248921023898,"4133":-0.7542733179740515,"4134":-1.3699917644654716,"4135":-0.31458278371393067,"4136":1.0331197804012309,"4137":-0.571118565239681,"4138":-1.6803755169995245,"4139":-1.34208543622244,"4140":0.29600290359022186,"4141":0.9137739793454531,"4142":-0.22838961894368973,"4143":-0.01252998428776173,"4144":0.9404411864204557,"4145":-0.3344725836897796,"4146":-0.22830895926671121,"4147":1.130938327903079,"4148":-0.04741529169313221,"4149":1.58415987634272,"4150":1.714901582464157,"4151":1.0669801426125007,"4152":1.4342677217898803,"4153":1.5741393234659138,"4154":0.16165211592515177,"4155":2.5307210622222596,"4156":0.4276474127056161,"4157":0.4358184271504153,"4158":0.60532242622386,"4159":0.925858552053047,"4160":1.1052657081748711,"4161":0.8155138536494826,"4162":0.48760790906249174,"4163":-1.482566998718119,"4164":-1.3816990673264926,"4165":-0.13617137622630407,"4166":-0.019266002100368232,"4167":0.9958421972147515,"4168":0.6646061750643762,"4169":0.41451402385764863,"4170":-0.19456159823685154,"4171":1.2602330837885711,"4172":-0.20812147271744916,"4173":0.138734254744209,"4174":-0.5544424694186679,"4175":-1.1500032596454466,"4176":0.17411317833430145,"4177":1.0516266835553745,"4178":1.13358570376648,"4179":1.0288909212957655,"4180":-2.106225805469934,"4181":1.2023308245211886,"4182":0.4482249743228998,"4183":-1.8776823211322506,"4184":0.015692406362019518,"4185":0.33999176443282125,"4186":-0.5520293579471248,"4187":0.867433043221152,"4188":-0.07937664058393745,"4189":-1.3377443368233906,"4190":0.8695488969383292,"4191":1.0840905434124752,"4192":-0.4037675802014508,"4193":0.47521389820819987,"4194":-0.8439478479485407,"4195":1.2127032212844582,"4196":1.1315147660187124,"4197":-1.1266137340504772,"4198":-0.3781050472259908,"4199":0.4165801369608408,"4200":-0.15647648691645435,"4201":-1.3800047916637985,"4202":0.6037403399726988,"4203":-0.13265199411222564,"4204":-1.7802311186622832,"4205":-2.251568013778832,"4206":-1.3948997803786203,"4207":-0.6065374405239635,"4208":0.7788691264596809,"4209":0.2183766561557152,"4210":-2.623573199546298,"4211":-1.4441774944866081,"4212":-3.182648613974311,"4213":-3.8781900699987486,"4214":-3.882812805863788,"4215":-2.0263766931756666,"4216":-1.401106177279452,"4217":0.43039353691547916,"4218":-0.059697975412415526,"4219":1.37819683451712,"4220":0.5572248145830464,"4221":3.463185643264363,"4222":-3.2843013816234006,"4223":-3.682918091292303,"4224":-0.874491658564149,"4225":-0.6424101389576902,"4226":-1.9744376681325186,"4227":0.301161599986417,"4228":0.07877897067265452,"4229":1.2045376263365823,"4230":1.0366968536330263,"4231":4.124818852063493,"4232":3.547672957457541,"4233":1.8995549267971652,"4234":0.16596132769700558,"4235":1.087739807506971,"4236":-1.5304281358810414,"4237":0.2814424788303523,"4238":1.2715409505311264,"4239":1.0030708727671152,"4240":-0.7916946376571357,"4241":-0.5823023395451676,"4242":0.43555350405088483,"4243":1.7500034117469405,"4244":0.7575479018092081,"4245":-0.14610865394527717,"4246":-0.1504425267986548,"4247":-0.07221585801033731,"4248":-0.1330529713380283,"4249":1.4660395770078327,"4250":0.15272464677962175,"4251":0.06219123789146821,"4252":1.7737524165575675,"4253":0.26183870838601275,"4254":-0.37965312169040905,"4255":-0.2368344447559459,"4256":0.33423129489867154,"4257":0.6212898003674799,"4258":-1.2583000338230754,"4259":-0.5266476450716782,"4260":-0.14021157400258313,"4261":1.2198830498004753,"4262":-0.08794122923662795,"4263":0.02321470665010852,"4264":-0.3506861978874096,"4265":0.6322268811356803,"4266":0.42066506622052074,"4267":-0.664634715227083,"4268":1.6778374093278399,"4269":-0.19408910093492074,"4270":0.7358414876235848,"4271":-0.716872823975953,"4272":-0.2718985846076515,"4273":-0.24637777390184407,"4274":-0.4242408272728582,"4275":0.7988245700726051,"4276":-0.34977615121744254,"4277":0.26407824521967915,"4278":-0.27697855643298563,"4279":0.13542445422744043,"4280":0.9554445773953679,"4281":-1.7698516034893725,"4282":1.5077708626927746,"4283":0.9639969777597908,"4284":-0.42737287267752433,"4285":0.002844553197656757,"4286":-1.0388184443106983,"4287":-0.07049405316623159,"4288":-2.5016027576530666,"4289":-0.6760122469539986,"4290":-0.38462248305432933,"4291":-0.8087285612227793,"4292":0.9490294439542959,"4293":0.8913042385471026,"4294":-2.585416145268269,"4295":-1.300108994023757,"4296":-2.84783183484226,"4297":-1.4204897235813323,"4298":-0.06061607254524773,"4299":-2.9994760468275365,"4300":-0.15788339508253932,"4301":1.2262896054037302,"4302":-0.1885247226224361,"4303":0.5672644826014385,"4304":-2.942778089501877,"4305":-2.3078336574248604,"4306":0.2962315740526358,"4307":-0.20540089429222352,"4308":-1.7491128353131447,"4309":0.7138202643150814,"4310":-1.0461989394288325,"4311":1.4138383667569185,"4312":-0.3233332893492452,"4313":0.05999656450055559,"4314":-0.7063717520180841,"4315":-0.9448714413070338,"4316":-1.0572493938128316,"4317":1.123676310505227,"4318":1.1104340762306977,"4319":0.0711195428345873,"4320":0.09238973228651408,"4321":1.3424302589286035,"4322":1.5539847592101355,"4323":-0.9051196354829372,"4324":1.5322950715079864,"4325":0.6090944382023725,"4326":1.1008203826441627,"4327":-0.706743782680727,"4328":0.8165346438319019,"4329":0.09809082452593469,"4330":-0.8128933666225596,"4331":1.0237243493688168,"4332":-1.1857181304394881,"4333":1.0925713274271522,"4334":-1.6180539416817536,"4335":1.7954835854661655,"4336":1.0426847256356218,"4337":-1.0854334142242197,"4338":0.8148906037635212,"4339":0.020550303867499776,"4340":0.9589584181218631,"4341":0.32649687043118014,"4342":-0.4976269529736428,"4343":-0.1695777494815726,"4344":1.0843681536566014,"4345":0.36516943562245574,"4346":-0.2500033474140751,"4347":0.056074167376136595,"4348":-1.3607107659051492,"4349":0.03813825597792351,"4350":0.41627100575229553,"4351":-0.07880743899413933,"4352":0.9527375410949493,"4353":0.36794592188265857,"4354":0.4346719799851089,"4355":0.024169287525145307,"4356":0.46817372314478317,"4357":0.22725482215832052,"4358":-0.03604997060505587,"4359":0.06443612691646335,"4360":-0.07189654495236082,"4361":0.21548258846297558,"4362":-0.347916783549531,"4363":0.57980893215014,"4364":-0.059571883863638625,"4365":-0.27343597687351173,"4366":0.008292665110934648,"4367":0.292886988493591,"4368":-0.06351014520898536,"4369":-0.28671897689737985,"4370":-0.5085245581220523,"4371":0.781602996875578,"4372":-0.2036402526018965,"4373":-0.15468189125523507,"4374":-0.6032441253714403,"4375":0.9899938118219366,"4376":0.5420022189631037,"4377":0.6562535401062046,"4378":1.1761188686697888,"4379":1.0014764892349148,"4380":0.5881420920785482,"4381":-0.40511898866759366,"4382":0.23036419847474587,"4383":0.854039769968518,"4384":-0.08389324334383659,"4385":0.5456846588598814,"4386":-6.095350410820959,"4387":-7.212717061020149,"4388":-8.133441633155494,"4389":-6.631239076731307,"4390":-3.5806149957301825,"4391":-0.33347200098939533,"4392":0.40368306755479005,"4393":-0.447384954386969,"4394":0.47860602252332135,"4395":1.0570520422129244,"4396":2.1041470436776355,"4397":1.7672653712862372,"4398":2.2845068102672923,"4399":1.1779573604471922,"4400":0.5476594996039588,"4401":-0.091776176099336,"4402":0.7631303910187703,"4403":0.021971823112481664,"4404":0.39735079895714254,"4405":-0.14869609398231437,"4406":0.30886463421514315,"4407":-0.0657934393638279,"4408":0.5874586918397169,"4409":0.7457153205874283,"4410":-0.5538876052749974,"4411":0.4675359301239418,"4412":-0.7801936380006664,"4413":-1.2245826295300728,"4414":-0.11753569198789665,"4415":0.103218167867544,"4416":1.549824668419726,"4417":0.33059240398889445,"4418":-0.2765089130362151,"4419":-0.0833561815467947,"4420":0.03575462542126368,"4421":-0.21806800687221406,"4422":-0.3525422973115522,"4423":0.32611723582357743,"4424":0.12006647289464221,"4425":-0.2962859640594572,"4426":-0.017271474196450837,"4427":-0.19802318871367192,"4428":-2.2024437475117327,"4429":0.371382639793364,"4430":0.06455728519414834,"4431":-1.066249363223467,"4432":0.3096268737341841,"4433":-0.26799212404614386,"4434":0.8773991288392888,"4435":0.10891809138500463,"4436":-0.7838905139087852,"4437":0.15914728878111967,"4438":-0.7625906520748947,"4439":0.6616881337903285,"4440":1.0320975733610929,"4441":0.43317101745492015,"4442":1.29900967746798,"4443":0.7274498273562442,"4444":-2.3274520031180614,"4445":-0.18819048990536108,"4446":-1.2320013009140305,"4447":2.053117987002379,"4448":0.541040650660608,"4449":-1.1721525868284712,"4450":-0.6343171954393046,"4451":-0.036708925191323974,"4452":-0.9916948667093053,"4453":0.6985770605549204,"4454":0.5168950608780523,"4455":0.13944728963406228,"4456":1.1073106364047565,"4457":1.5107697836952,"4458":-1.8656127963981572,"4459":-2.9859295471694267,"4460":-2.297158707118566,"4461":-2.137563277056709,"4462":-0.6468631846444471,"4463":1.359309269052436,"4464":1.9899441594041396,"4465":0.04299079652888478,"4466":0.13281917269250484,"4467":0.8645844663855351,"4468":-3.8011154568169547,"4469":-3.0006863168428843,"4470":-2.8928593421014175,"4471":-1.6083738763299051,"4472":-0.4746701342315915,"4473":-1.2747264701813912,"4474":2.0243787693027726,"4475":-0.1674372960132333,"4476":1.302340223861967,"4477":2.770861905480828,"4478":3.8864048270020946,"4479":2.0715036472838015,"4480":0.914103966122468,"4481":0.9014102831743995,"4482":-0.5990247760721896,"4483":-0.6103312690025203,"4484":-0.8113330760074488,"4485":1.7773268973439886,"4486":-0.1714445892065819,"4487":1.8995414444013183,"4488":1.4086255434317922,"4489":1.3066915701467074,"4490":0.33199061271756375,"4491":0.8227871810340792,"4492":-0.33243641232021676,"4493":0.6989823516841033,"4494":0.42046722655701224,"4495":-0.6696406262914225,"4496":-0.4170743911065175,"4497":-0.33141671522114896,"4498":1.5620043462389972,"4499":-0.8750462702483013,"4500":-1.082377696450377,"4501":-0.3355029116676867,"4502":1.5973212810937936,"4503":0.26389158369790816,"4504":0.24985850983686292,"4505":-0.7433626375488612,"4506":-0.61497771184396,"4507":-0.04585809884723487,"4508":2.1505747068028125,"4509":-1.7031489803935191,"4510":-1.449015994155116,"4511":-0.48940357806955437,"4512":0.6753667556044295,"4513":0.12787206765717554,"4514":-1.3751034130550308,"4515":-0.47440034973605033,"4516":-1.165465250825037,"4517":0.13540662693925093,"4518":2.501521872520286,"4519":1.5655167487628185,"4520":-0.8353885036295307,"4521":0.7780233316341761,"4522":0.39716689801061683,"4523":-0.5016253553673893,"4524":1.0306515085187673,"4525":0.07610955830952296,"4526":-1.6818388633196666,"4527":0.7593561888670486,"4528":0.49340811559433445,"4529":1.3912372566928646,"4530":1.0314305658570688,"4531":0.8208987157976902,"4532":0.442994736901488,"4533":-1.4762450926678932,"4534":-1.6392927022040475,"4535":-0.1242667726908985,"4536":0.23750114699682828,"4537":0.16805861619071494,"4538":-1.0503907173765996,"4539":3.8220631094103705,"4540":2.9868325612507323,"4541":0.025866709221927475,"4542":-0.20751577196178037,"4543":-0.0956548388047981,"4544":-0.09079864155549291,"4545":-0.5041749308211423,"4546":-0.07751374531195591,"4547":-0.5164737353241846,"4548":1.4517771357509905,"4549":5.172418472656544,"4550":-1.0932951495925127,"4551":1.8645527488627154,"4552":0.892702507742383,"4553":0.11267588487833714,"4554":-0.04392769242983458,"4555":-0.9102615455308137,"4556":1.540571849618151,"4557":0.8706528290895992,"4558":-2.7693528888835437,"4559":-2.156121443930955,"4560":-1.7785593465145269,"4561":1.4800876029140881,"4562":-1.576764161010135,"4563":-1.526441147958463,"4564":0.8263400907080503,"4565":-0.11940761845608208,"4566":-0.4761092763826866,"4567":-0.17871115309934904,"4568":-1.3420549685197551,"4569":-0.9872883450224555,"4570":-0.9114527955916136,"4571":-0.9016996378309373,"4572":1.6866390829572653,"4573":-1.2767340236364455,"4574":0.5653079263436859,"4575":0.5668384151570004,"4576":-0.7478729338953914,"4577":-1.7735624621243702,"4578":-0.26540388838547035,"4579":0.10093737053086729,"4580":1.2924084303390477,"4581":0.35179464740130895,"4582":-1.2625694635772953,"4583":0.5041073592191161,"4584":0.17386166927277033,"4585":-0.9428301544872716,"4586":-1.3151943661062027,"4587":-0.9046167598275537,"4588":0.6808256126722365,"4589":0.07733466809139067,"4590":-0.2585796561482632,"4591":-1.372317275841934,"4592":-0.03904627025373537,"4593":2.704029147325772,"4594":1.413078554486993,"4595":0.08381303564460903,"4596":-0.575660694185276,"4597":-0.640036345224182,"4598":1.281764418224035,"4599":1.54683170930193,"4600":-1.386207295472796,"4601":-1.484191671581983,"4602":-0.2144787408526604,"4603":-1.6067747376505745,"4604":0.9992560801847927,"4605":-1.8158399091862798,"4606":0.5645545130393063,"4607":0.024836864937667322,"4608":1.6933903770637428,"4609":0.495173058118,"4610":-0.022775122663098023,"4611":0.7886335804129747,"4612":2.1150456180653436,"4613":-0.23826481283251205,"4614":-0.7820080657887029,"4615":0.5280014062877976,"4616":0.40789324839654834,"4617":1.316882012275541,"4618":0.4628438199509901,"4619":0.10910637089314036,"4620":1.5097503499836002,"4621":1.0242722500024632,"4622":-1.5685193165283033,"4623":2.1765509215239853,"4624":-0.14673427815220091,"4625":-0.812511447932122,"4626":1.1051668741138663,"4627":0.45944862542570486,"4628":-0.989134203948293,"4629":1.0287163613984411,"4630":0.9841266984629949,"4631":1.0187381472423265,"4632":1.3503577382555754,"4633":1.4042941045650816,"4634":0.5349308245267824,"4635":-0.10981797012894386,"4636":-2.7724360358891245,"4637":-0.9988295731218474,"4638":2.0197290593477817,"4639":1.624683577815176,"4640":0.5145650603847787,"4641":3.4007067309872774,"4642":0.7261926301506435,"4643":1.648395794341509,"4644":0.6726972089349161,"4645":-1.34422043747481,"4646":0.6213483848295898,"4647":-2.586519895768943,"4648":-0.18005678947513312,"4649":0.2842296055638851,"4650":0.7052498941367606,"4651":0.37674900782229886,"4652":-2.466587823924563,"4653":0.19734856947230367,"4654":1.8696291154655984,"4655":-1.836560543073788,"4656":-0.15060006523867314,"4657":0.9405530951332918,"4658":-2.1611081508875745,"4659":0.39826533329860897,"4660":-0.25713017691286616,"4661":-2.3059853670862,"4662":-0.8170870408391885,"4663":-0.24150280546955963,"4664":-0.7602506743434603,"4665":-1.0560843664825061,"4666":0.6250330792332952,"4667":-0.9936466557238177,"4668":-1.6628789853045935,"4669":-0.4577308381054738,"4670":0.4073317997919666,"4671":0.09910201957581685,"4672":1.8546645323470117,"4673":-0.8851499437658068,"4674":1.0567203689592712,"4675":-0.8132046734838737,"4676":0.12239077246789593,"4677":-0.8195142761824423,"4678":-1.9490251388853115,"4679":0.41671064030288585,"4680":-0.879551547372311,"4681":0.006481022066916137,"4682":0.18817029990771805,"4683":0.5122419677752382,"4684":1.7863315208139405,"4685":0.274737855023011,"4686":0.414845398110783,"4687":0.48274725393415624,"4688":0.503600295722301,"4689":-1.5078934387457716,"4690":-0.897967209456195,"4691":-0.9308646606401312,"4692":-1.0222866397526265,"4693":1.8533413243458292,"4694":0.626152078849619,"4695":0.21645168546904595,"4696":-1.5206759711452953,"4697":-2.7144485989150153,"4698":-2.4642334294377486,"4699":-0.24604243568356957,"4700":-1.0862455352154876,"4701":-2.5813429566530015,"4702":-1.2802901118211385,"4703":-0.09102386521820843,"4704":-1.60576816190839,"4705":1.1093947197105478,"4706":-1.3918358369018982,"4707":0.365830840162607,"4708":-0.2261827270905409,"4709":0.06167556059897635,"4710":1.2901877716335544,"4711":-0.21878893131613816,"4712":0.314467085948943,"4713":-3.4448283285370938,"4714":2.2581597750965106,"4715":1.7375414299196623,"4716":1.2300510052698697,"4717":0.34320239328850194,"4718":0.09414787856879137,"4719":0.4335304545651173,"4720":0.2159784440253785,"4721":1.4002142600633964,"4722":0.9247573631663685,"4723":-1.3513501186914427,"4724":-2.4582604127302607,"4725":0.04211716972204322,"4726":-0.27052827969620846,"4727":-0.5537290294624758,"4728":-0.7215208795962957,"4729":1.9076973714871492,"4730":0.5123140534801489,"4731":-2.79394632496679,"4732":0.31938464744945755,"4733":-0.3888243887786568,"4734":-0.7299123932669205,"4735":-1.5096929777387909,"4736":1.5890841923346672,"4737":0.21417522588713123,"4738":0.265637987878067,"4739":0.6298360715148773,"4740":-0.6104488908789363,"4741":1.123120644549574,"4742":0.6268521504018532,"4743":-0.7627318207252334,"4744":1.3194210938716173,"4745":0.07979846079348438,"4746":-1.2728673771838614,"4747":1.0160396239067593,"4748":-0.9659631775504688,"4749":0.5292299808136932,"4750":0.29426380708529193,"4751":-0.7636762961252562,"4752":-0.08873260982500562,"4753":-1.6968143335025196,"4754":1.6249738501772102,"4755":-0.8748905030572993,"4756":-0.06298818111450048,"4757":0.6430494597986154,"4758":2.447335109461212,"4759":0.5211237112739344,"4760":1.1280246972367574,"4761":0.5822528008060811,"4762":0.20377722403403692,"4763":0.11500577878227075,"4764":-0.2173484836455038,"4765":-0.374033531288226,"4766":0.5847794276976217,"4767":-1.7744397682028534,"4768":1.595398363476722,"4769":-1.325551276586024,"4770":1.223165324076726,"4771":-1.085719693688096,"4772":0.8549992534496684,"4773":1.463037417845197,"4774":-1.2947572108651442,"4775":-2.2980915334597882,"4776":1.7567403732412414,"4777":-0.7869049768940722,"4778":-1.7969901385958627,"4779":-1.5459279689747807,"4780":-0.018746004273220603,"4781":0.36360803195205926,"4782":0.5597049658569776,"4783":0.2832641948548085,"4784":-0.9506966474391608,"4785":1.616343649068007,"4786":0.715889683268248,"4787":-2.2385406328757598,"4788":-0.0969340048154754,"4789":-1.9987563078170336,"4790":-0.917447875021199,"4791":-0.10237951247967153,"4792":-0.6191327855640817,"4793":1.929635880582963,"4794":-0.24796553925197648,"4795":-1.4219088321341633,"4796":-1.5191570421245593,"4797":-2.2029616224627744,"4798":-0.5216905794175802,"4799":-1.3105603060546722,"4800":0.6273309763704882,"4801":1.3371083135594686,"4802":-0.804685495842467,"4803":0.1909833624378923,"4804":-0.33858054275902055,"4805":-0.7456617056348845,"4806":-3.0696503591023014,"4807":-1.1672143933226073,"4808":-0.7241653423739114,"4809":-1.917143999020184,"4810":0.2084937093903297,"4811":0.027721462611814175,"4812":1.4744765545243173,"4813":0.5217617233720547,"4814":-1.25403014941765,"4815":-1.7121474666436338,"4816":0.43350438257439217,"4817":0.015156217751703166,"4818":1.8480841533813441,"4819":0.20398343499571087,"4820":-0.32211885156890174,"4821":-2.147982364021555,"4822":1.0395600254777038,"4823":-0.7049199417260559,"4824":-0.7912112822079453,"4825":2.0494352369741176,"4826":0.42890423315878057,"4827":-2.798456668511514,"4828":0.6021717755233221,"4829":0.04507096704240359,"4830":2.024800536752013,"4831":0.4235987274150751,"4832":0.32558717173569107,"4833":2.206131845668973,"4834":0.04609918373066722,"4835":-1.4482943186660548,"4836":1.1658307773064656,"4837":-0.3502320088291446,"4838":0.20848528636948135,"4839":0.4123768138283998,"4840":-0.3961453512767974,"4841":0.804123376433982,"4842":0.5477715336623612,"4843":0.13207143549033173,"4844":-1.2037269331563811,"4845":0.2481337601683371,"4846":-1.787991962500875,"4847":-1.1655425537143151,"4848":0.9108826016399346,"4849":0.6544830258053406,"4850":0.005561161252355028,"4851":0.745619368549461,"4852":0.6509018925446703,"4853":-1.3490438831573515,"4854":-0.7898874736615265,"4855":-1.2800468680750938,"4856":0.19345066769522976,"4857":0.40447752855871166,"4858":1.2417404235096847,"4859":-0.32196091739418314,"4860":-1.076165864766454,"4861":-0.17191581626149757,"4862":0.667428128251258,"4863":-0.7622802572293748,"4864":-0.3218983123484996,"4865":1.2537233719513021,"4866":0.5804229801293344,"4867":-2.7235549992481287,"4868":-4.457409364785016,"4869":-3.0956142178805055,"4870":-1.058209677967777,"4871":0.002926103967815808,"4872":-0.6025236323520315,"4873":-1.188615587208748,"4874":1.6344410953777364,"4875":-0.42458191753011804,"4876":0.5304589909346996,"4877":2.268586103554453,"4878":7.245813991445301,"4879":2.400550872318651,"4880":1.8709742357848016,"4881":0.90883140327545,"4882":0.7198912626707195,"4883":1.2438713108646835,"4884":-0.2983957048980252,"4885":-1.3306994930932412,"4886":3.666021608577908,"4887":3.09387985045254,"4888":1.5614530723920128,"4889":1.089502313340709,"4890":1.9982281409217666,"4891":0.6957430627141745,"4892":0.09124386146246284,"4893":0.7447296440281501,"4894":-1.7578060982253858,"4895":-0.046497559608690654,"4896":0.639206040084495,"4897":0.022725389066052447,"4898":-0.16646265271167174,"4899":-0.6405204074214453,"4900":1.0818914694995037,"4901":-1.3158979060304399,"4902":0.27500144710479213,"4903":0.06778357593553126,"4904":0.8688780179695845,"4905":-0.43735188891494764,"4906":0.5298230564448588,"4907":-0.16130414360026443,"4908":0.04967582460814049,"4909":-0.33232412059255473,"4910":-0.5463684569271063,"4911":-0.8132762809767302,"4912":-0.13573103739114886,"4913":1.081585324653182,"4914":1.0584989616011855,"4915":-0.5558130801585374,"4916":-0.5609914340769975,"4917":0.1679818798697215,"4918":0.6800843925543569,"4919":-0.23041130686958997,"4920":1.2371813222578467,"4921":-0.22805048772095246,"4922":0.8557993653441749,"4923":-0.20134034121581532,"4924":-0.5160451564374133,"4925":-1.6673048534401609,"4926":2.0911325512468815,"4927":0.8354223353727008,"4928":-2.033606555642093,"4929":1.974410890228993,"4930":-1.3152725841268322,"4931":0.751796117672264,"4932":0.7616751840879233,"4933":-0.6813320432424583,"4934":2.607194813222053,"4935":1.9611511821618364,"4936":1.965301280217246,"4937":0.90988677809024,"4938":-1.1357020542871097,"4939":2.1812006112817968,"4940":-0.28288046020286584,"4941":-1.4404376895027977,"4942":0.9492573842759776,"4943":1.0485877302414965,"4944":0.27278261089447536,"4945":0.3697097982681715,"4946":1.5955801964053322,"4947":0.5718525152801207,"4948":-1.6580315272028165,"4949":-0.7407093590218253,"4950":0.3389079320284636,"4951":-0.512600900204872,"4952":0.38176992551259975,"4953":-1.3674704242175486,"4954":-1.0928463536977433,"4955":1.341003434307456,"4956":2.0320829745816344,"4957":-0.42512624587696674,"4958":0.19933062249110634,"4959":0.559623336500854,"4960":1.7419806210714324,"4961":0.7957057036856343,"4962":1.2575388213527108,"4963":1.5943662073991918,"4964":3.3140791892850445,"4965":0.16530902958946583,"4966":0.7350041932963676,"4967":-1.4928804608775423,"4968":-4.6508336188328725,"4969":-1.8070069837062595,"4970":-0.539173839747559,"4971":0.5404539776502604,"4972":-0.5829308401527826,"4973":-0.5744484748505554,"4974":-0.9038175238907944,"4975":0.32480030789694464,"4976":-0.19497402576347603,"4977":1.774321095471265,"4978":1.026338012527419,"4979":0.8128546453980526,"4980":-0.22133174194374639,"4981":0.4496149367879909,"4982":-0.9079812493234458,"4983":1.0129866269764292,"4984":0.16808371496668909,"4985":0.5638298846436829,"4986":-1.7276994693363168,"4987":0.16884134277531643,"4988":0.6926221446173373,"4989":-0.5918747169322232,"4990":-0.358063046744855,"4991":1.0783699023881492,"4992":0.5160146645710318,"4993":0.10562965696509498,"4994":0.5509496651814535,"4995":-1.3861717199189785,"4996":0.21992160725595866,"4997":-0.830452903160079,"4998":1.6339757730805693,"4999":0.8525482385826447,"5000":-1.039987130280603,"5001":-0.24765001838805978,"5002":-0.8636343656621164,"5003":-1.3145747208727845,"5004":-0.2602320196477025,"5005":-1.5091873812156662,"5006":-1.6478251062298408,"5007":-0.7745229319112523,"5008":-0.4017352575275862,"5009":-0.3965220447587683,"5010":-0.45518862865189724,"5011":0.13470673269824232,"5012":-1.2369931351091032,"5013":-0.2114262918619051,"5014":-1.424932724466846,"5015":-1.3736637604313702,"5016":-0.924776733832969,"5017":-0.7322740258863105,"5018":-0.5592532381645318,"5019":-0.6127289363371724,"5020":-1.0200104584969678,"5021":-0.7286808160758659,"5022":-0.18257348991384906,"5023":-2.5680845920266364,"5024":-1.203331861559133,"5025":-0.9963517767298974,"5026":-0.5169038981653069,"5027":-0.5831486562470173,"5028":-0.32585784502547266,"5029":-0.3614671499438816,"5030":0.5145405280253965,"5031":0.7435573927506229,"5032":-1.6929350385497037,"5033":-1.240759406714473,"5034":-0.7416312650247118,"5035":-0.481487029743169,"5036":-0.5135233669985129,"5037":-0.6060137408958578,"5038":-0.6084392052227782,"5039":-0.22946453893059057,"5040":3.8622167775703393,"5041":-1.4590576130391166,"5042":-0.45776012807462946,"5043":-0.4637555307941105,"5044":-0.40493775639987734,"5045":-0.5540447463247257,"5046":-0.5723015255547381,"5047":2.663830279863022,"5048":-1.9408061802291106,"5049":0.04607528056316229,"5050":-1.6822743504856226,"5051":-1.7347936969125508,"5052":-1.0583019335402448,"5053":-0.7505439821100502,"5054":-0.9027299602461909,"5055":-0.42368970742938916,"5056":0.6008129807585648,"5057":-0.3530015119631599,"5058":2.2042779541923703,"5059":-1.7573658611174974,"5060":-1.5367639743384676,"5061":-0.9808506391402821,"5062":-0.5674701068854667,"5063":-0.40163639296634235,"5064":-0.6569145919905741,"5065":-0.8104564261556595,"5066":-0.4701918143108106,"5067":0.20328629037620818,"5068":-1.4990553149892165,"5069":-1.630308371518906,"5070":-0.7716866421584005,"5071":-0.547981747799802,"5072":-0.6569162634168823,"5073":-0.5959501221681398,"5074":2.0313194579792744,"5075":0.2830836306110096,"5076":-2.625490839388448,"5077":-1.9060019261091474,"5078":-1.8931839255395975,"5079":-0.9980422135894589,"5080":-0.4913898115718147,"5081":-0.42261197676687917,"5082":-0.6215416695731409,"5083":-0.853664623196843,"5084":-0.5662130086385793,"5085":-1.4451645652465708,"5086":-1.4982563570162921,"5087":-0.0952690411076165,"5088":-2.120969992683452,"5089":-1.9389434414801456,"5090":0.3748396793303852,"5091":1.0756673938396675,"5092":-0.2595263426300854,"5093":-1.0330471015954996,"5094":-0.7451712948728457,"5095":1.6491541626931148,"5096":-0.734206641493626,"5097":-0.8198287180387344,"5098":0.02247868214142678,"5099":0.1850909877503064,"5100":0.5023381531954567,"5101":0.27545197935355753,"5102":-0.6271336239426503,"5103":1.382039462232091,"5104":-2.5956338572856454,"5105":-3.33027958871426,"5106":-0.9212945554222648,"5107":-2.6996260171348534,"5108":-2.287654412488003,"5109":-2.142945962389188,"5110":-0.3383404851656857,"5111":-2.0105695007827653,"5112":1.136488923199207,"5113":0.6559496401710877,"5114":-0.27835363253660483,"5115":-0.369502890522472,"5116":-0.7454440637468265,"5117":0.15964983592536938,"5118":0.7685194825592393,"5119":-1.00029108413369,"5120":-0.8312346985418625,"5121":0.8368797133174025,"5122":0.03252305279398261,"5123":2.8485931800910675,"5124":0.8984093122922852,"5125":1.7113957553332886,"5126":0.3893283503066359,"5127":-0.3390914155812845,"5128":-0.2564357548801437,"5129":-0.7356792486958578,"5130":0.2534240352334482,"5131":0.7786259618815728,"5132":0.9899730045127246,"5133":1.7086988548880269,"5134":2.3084643385687076,"5135":0.7365378807520498,"5136":-0.2406421327424817,"5137":-0.22487512060801823,"5138":-0.56416247107785,"5139":-1.125875793074329,"5140":1.1780633712829445,"5141":2.4795623007692336,"5142":1.6604401595237495,"5143":0.3364347365709372,"5144":0.004895079284066493,"5145":-0.20820192868798612,"5146":0.487993123882737,"5147":-0.08831543697614248,"5148":-1.6870867693189977,"5149":0.20346213672404098,"5150":-0.26494201887476215,"5151":-1.3999491342058579,"5152":-0.6244968735450194,"5153":0.9166321462548813,"5154":-0.44987171027710116,"5155":0.3214988039953858,"5156":0.340193140180822,"5157":-0.481401073871825,"5158":0.5447911686596283,"5159":0.8999340084840965,"5160":0.9098076318300161,"5161":0.1580003130585414,"5162":-0.11326965667816831,"5163":-0.6873526363319779,"5164":0.9781795892766111,"5165":-2.318436151340179,"5166":-1.5554904194180372,"5167":0.5083823522043117,"5168":-0.600361744588316,"5169":0.9089260896363338,"5170":-1.1186164082072356,"5171":-1.194086266750924,"5172":-0.014923134540203557,"5173":-0.5277182667514004,"5174":-1.5232232124076543,"5175":0.9803488108004802,"5176":-1.358574235561547,"5177":-0.8964003606434114,"5178":0.6149249249384503,"5179":-0.7822330067954051,"5180":-1.4436732601461537,"5181":-1.3304504293502717,"5182":-0.16148234649603316,"5183":-1.5138738129835836,"5184":-0.20962466222294507,"5185":-0.20851809939216273,"5186":-1.2776603010686187,"5187":0.1452498458536209,"5188":0.2380452499095487,"5189":-0.7958845740512737,"5190":-1.3590599826766592,"5191":-1.1476526313805258,"5192":0.09903221086228399,"5193":0.6626544874934537,"5194":-2.5396431321736124,"5195":0.39610732277047717,"5196":-1.075485627869529,"5197":-1.6156468476415085,"5198":-0.14274986791592267,"5199":-1.1937284650582862,"5200":-0.8880128070247324,"5201":-0.1427727320849416,"5202":2.229430256857399,"5203":-0.8097533099490873,"5204":-0.6160181853112322,"5205":2.081123692580912,"5206":1.0135895804150716,"5207":0.6521226859484648,"5208":-1.433896924686194,"5209":-1.1539845052992797,"5210":-0.8978934243998812,"5211":-0.40859955067867443,"5212":-1.9068354313832339,"5213":-0.3046283855327491,"5214":-0.20112601989514675,"5215":-0.032550041583084714,"5216":-0.3043316792266468,"5217":-0.5894385731247189,"5218":-1.4701908317490782,"5219":-1.329388287174534,"5220":-0.8190174770733668,"5221":-0.42975898364599235,"5222":1.3090123563614575,"5223":-0.14965231885047767,"5224":-0.4343147207213232,"5225":-0.9195093328076577,"5226":0.023046251932000446,"5227":-0.6350961188998098,"5228":-0.7712126278450574,"5229":-1.99572740489663,"5230":-0.5178387821784005,"5231":-0.7809903023322462,"5232":-0.7557651576197331,"5233":-1.5836078436279586,"5234":-0.6319362465929073,"5235":-1.4029094599973377,"5236":0.19023269820833033,"5237":-0.5486369275824473,"5238":0.36122077466933555,"5239":0.21168984926828377,"5240":-0.19474298282618663,"5241":-1.3212243794682137,"5242":-0.06968239226167693,"5243":-0.036268201802956104,"5244":-0.38116106665883787,"5245":-1.2320167196868117,"5246":-0.31707762707975884,"5247":-0.43063740622590907,"5248":-0.6339237234205883,"5249":-0.06768636211595079,"5250":0.454426554176481,"5251":0.17372992708568408,"5252":0.8705149325877141,"5253":0.8149774217069845,"5254":-0.315509427310744,"5255":0.35636833516038363,"5256":-0.779372580901247,"5257":-0.3102576566317674,"5258":-0.6168655519033899,"5259":0.05334709731741298,"5260":-0.08175474605878201,"5261":-0.7807166690956313,"5262":-1.037547979943807,"5263":-0.2783862068867453,"5264":-0.07854000931984643,"5265":0.08004060292979692,"5266":0.3809997500508065,"5267":-0.16580326585175803,"5268":-0.24910080289133096,"5269":-0.40226179962768077,"5270":-0.5292636083787654,"5271":-0.162236236233087,"5272":-0.23061788994245155,"5273":-0.11611858916048906,"5274":-0.9450658352271124,"5275":0.9279040708838632,"5276":-0.49558685084684884,"5277":-0.9583352989990218,"5278":-6.8686702190592674,"5279":-4.899409054249381,"5280":-3.6317404526992734,"5281":-1.8812321144602167,"5282":-1.366007778631179,"5283":-0.7820976288119749,"5284":0.2889958850198634,"5285":0.7247452399138563,"5286":-0.7328765239857739,"5287":2.0436167830253176,"5288":5.731538219505606,"5289":2.2524289749336637,"5290":0.9522334900192477,"5291":0.5875827495281205,"5292":0.5791509812908299,"5293":1.1255288351627792,"5294":0.6787925297853757,"5295":-0.2556775562229776,"5296":0.9648715251794645,"5297":1.7134250871749102,"5298":1.3751011588742765,"5299":0.81070872051709,"5300":0.03713891950358746,"5301":0.41054667883898893,"5302":-0.2836664458279695,"5303":-0.4987850839224836,"5304":0.4485559953117062,"5305":0.23687503991640405,"5306":0.1035930756231581,"5307":0.20780422022888237,"5308":0.45281514894341673,"5309":0.2610428240107596,"5310":-0.393713608332982,"5311":-0.697096401718316,"5312":0.7543964907482078,"5313":-0.42521970049662033,"5314":-0.33271273349124264,"5315":-0.7208271352042741,"5316":-0.4527575972697263,"5317":-1.2474361906896563,"5318":0.20405133345511706,"5319":0.4762795595608463,"5320":1.014919010781734,"5321":-1.5845461321037893,"5322":0.33325742241213535,"5323":-0.5883296432607927,"5324":-1.6266680987322415,"5325":-0.286636664186709,"5326":-0.9830481125949425,"5327":0.5457772329041313,"5328":-0.2487853804072209,"5329":-0.9939367030718631,"5330":-0.2601869209783597,"5331":-0.8081993716660508,"5332":-0.34110015272325306,"5333":-0.43951188482770565,"5334":-0.3166149762363424,"5335":-0.3359245424013296,"5336":-0.2673706102076751,"5337":0.44854187084062075,"5338":-0.37437519437758604,"5339":-0.15221849226726772,"5340":-0.12983019064782741,"5341":-0.26940637073384543,"5342":-0.32120546739998673,"5343":-0.5339894009432365,"5344":0.10184740123852913,"5345":-0.5714269975188307,"5346":0.34338185198507765,"5347":0.3386869307712384,"5348":0.7341918169303245,"5349":-0.16320928112672758,"5350":-0.11601953171485288,"5351":0.27610430446543527,"5352":0.08350247426108418,"5353":0.21811164487386,"5354":0.01121514072217163,"5355":-0.4482913802290953,"5356":-0.17129662497866457,"5357":0.2313742150796358,"5358":-0.4822881461252434,"5359":0.43168896264547807,"5360":-0.008975654330894456,"5361":-0.2219979218948594,"5362":-0.01948987136862578,"5363":0.4021724795519948,"5364":-0.3578515561557405,"5365":-0.3650800814235226,"5366":0.5122843091294771,"5367":0.10989496748377939,"5368":-0.02114337221575844,"5369":0.7901235301320276,"5370":1.4142927710211532,"5371":0.08078218319219066,"5372":-0.23280144865201782,"5373":-0.1857385744901856,"5374":-0.0068383379202677525,"5375":0.16289054490310598,"5376":0.0949098638121205,"5377":-0.4566150976444695,"5378":0.18182314219306558,"5379":0.0179250488339693,"5380":-0.24742078674792536,"5381":-0.5496938735293104,"5382":-0.6543781055970711,"5383":0.04480859881853165,"5384":-0.05082393234629855,"5385":-0.18125540214800406,"5386":-1.022416701188299,"5387":-0.9700745012830159,"5388":-0.20208187963983135,"5389":0.020805878380650778,"5390":-0.21360288389028992,"5391":-0.3059629891015178,"5392":-0.2275112626060657,"5393":-0.1139084436510149,"5394":-0.42914001083674225,"5395":-0.08518920070124353,"5396":-0.4744854030118349,"5397":0.28773675663621096,"5398":-0.36155289816090735,"5399":-0.27604113874824676,"5400":0.11319515139139068,"5401":-0.5571141376315968,"5402":0.2269422589703964,"5403":-0.5072252413394193,"5404":-0.319991807012644,"5405":0.20936999955082677,"5406":-0.48466824848924517,"5407":-0.35115774784766784,"5408":0.5087032943494254,"5409":0.5651489925547524,"5410":0.8812787358016507,"5411":-0.15221225675172392,"5412":0.1639385066753578,"5413":0.3357664876873882,"5414":-0.7364259204859219,"5415":-0.33325929197684107,"5416":1.0869533823707442,"5417":0.3175823299927239,"5418":-0.4139630140246048,"5419":-1.4998054788797774,"5420":0.6339267464052,"5421":-1.58384931180645,"5422":1.4297004494287184,"5423":-1.5398005569464368,"5424":0.19066191310805405,"5425":0.6537424426824007,"5426":0.17726262368615386,"5427":0.4008629653628237,"5428":0.518287806143079,"5429":0.5886917762411977,"5430":0.5742350087917752,"5431":-1.2352776452403462,"5432":0.043755437307803804,"5433":-2.3530171017784838,"5434":-0.03083012829207419,"5435":1.094116205362342,"5436":-1.1134424603423256,"5437":-2.1493762761031174,"5438":-0.12825009438010765,"5439":-0.6689671620648107,"5440":2.4354049246846037,"5441":1.8184464190098448,"5442":-0.8679149747755313,"5443":-0.392830762229799,"5444":-2.3910792224459123,"5445":-2.5822653019529014,"5446":-0.17797476964753825,"5447":-1.274627002882352,"5448":-1.7185905370348915,"5449":-0.47768050241903126,"5450":-0.38815581000628513,"5451":-1.2884900395078394,"5452":-1.1928178343508178,"5453":-2.4341649064988804,"5454":1.1038067905412212,"5455":1.7686791165125921,"5456":0.6534304738697668,"5457":0.5183170712755202,"5458":0.057654557996295805,"5459":-1.6651904955760153,"5460":2.3828171253330597,"5461":2.655299658137731,"5462":2.8966017411406604,"5463":3.5502447305509484,"5464":2.1606244255162395,"5465":2.344626653027216,"5466":0.8933263719736761,"5467":0.47387466581971277,"5468":-1.2148469378290323,"5469":1.532144884440802,"5470":0.6355617104101965,"5471":2.652516700608612,"5472":0.2534448592381252,"5473":1.5816419450706987,"5474":0.9533131326229148,"5475":1.2906856113665015,"5476":0.08141849951411347,"5477":0.616262027851152,"5478":-1.0079388229207882,"5479":0.9673779778770496,"5480":1.1039659512356579,"5481":-0.9987427681199421,"5482":-0.44171539553460903,"5483":0.5923957678496524,"5484":-1.175448492937919,"5485":-0.07379269198441356,"5486":-0.5973437649761744,"5487":0.6887406184751372,"5488":1.169473013099525,"5489":0.9783273081733664,"5490":1.5120386458083357,"5491":0.5800287679146757,"5492":-0.2027290176632433,"5493":1.840929225870939,"5494":-0.01047694027643748,"5495":-1.210433081652332,"5496":-1.5674834623025247,"5497":1.0392536722453887,"5498":-0.7952511192390354,"5499":0.03113590431568777,"5500":1.7395837238736302,"5501":1.2788521311906937,"5502":-0.541074219554549,"5503":1.6009108025955494,"5504":0.3633041280873801,"5505":-0.25568689579712844,"5506":-1.473919974623165,"5507":-1.5304042297505722,"5508":0.4189019943960409,"5509":0.9292238395429071,"5510":-3.0491495687375303,"5511":0.2581326217386947,"5512":-0.6985549552528932,"5513":-0.47406116800051984,"5514":-0.7705463697089218,"5515":-0.28442526604805296,"5516":-0.06953014073720416,"5517":0.7150450512663166,"5518":0.5956099783632254,"5519":-0.08326248730280941,"5520":0.6434280362911234,"5521":0.0799804515261913,"5522":-1.0654630524639657,"5523":0.3431446214441371,"5524":-0.07928992977229568,"5525":-0.16983534397387182,"5526":0.3219570877135231,"5527":-1.3552319800192212,"5528":0.5643395048527617,"5529":-0.7258565923804908,"5530":-0.9966879380298016,"5531":-0.2656487533138351,"5532":0.7576933704046006,"5533":-1.2892291756307135,"5534":-1.8422361044081066,"5535":-2.999530367957361,"5536":-0.860023824277301,"5537":-1.2065759465218067,"5538":-0.6634532712692693,"5539":0.4908929740087799,"5540":1.7789577373045684,"5541":-0.3267644391376373,"5542":3.150951545245448,"5543":7.6437662645221165,"5544":3.9582293215023,"5545":2.4548765173211855,"5546":0.004956757527715195,"5547":0.7952242485902373,"5548":-0.48565735616673955,"5549":-0.04780749653443248,"5550":-0.6244563528814308,"5551":-1.4208346511526802,"5552":2.0866433796210173,"5553":0.7403119644406478,"5554":1.786858639285382,"5555":0.552343246240144,"5556":1.957611931778677,"5557":0.023356909809185023,"5558":1.8975388392890702,"5559":-2.13019218303814,"5560":0.43688045244144463,"5561":-0.12638879342131923,"5562":0.7127785108284282,"5563":-0.509494527052989,"5564":0.3474677682149751,"5565":-0.2652014286751031,"5566":0.7383915436447032,"5567":1.4862180492953954,"5568":2.028172925028545,"5569":-0.01385950127986816,"5570":1.4543536908018415,"5571":0.4100706243015691,"5572":-0.11235218959359579,"5573":1.666391187029407,"5574":-0.6616956197212901,"5575":0.13008752201528415,"5576":0.4834096094660712,"5577":-0.3423466322613131,"5578":0.19357600407298511,"5579":0.03566619616086813,"5580":-0.19514903360820632,"5581":0.3385565450092839,"5582":0.42797570317658673,"5583":-0.7200976928558028,"5584":-0.19508903866509827,"5585":0.5155024077536369,"5586":2.368781220545042,"5587":-0.0829031049116887,"5588":-1.4438951920159575,"5589":-0.3598863459245625,"5590":-0.02289716729618577,"5591":0.5033712420246391,"5592":0.5623841790995614,"5593":-0.3306952371256092,"5594":-0.6758939126511005,"5595":0.03888438649827378,"5596":1.4596412601395778,"5597":-1.3943676775529341,"5598":-0.7122678321939693,"5599":-0.7298149049933381,"5600":-1.3896475527130228,"5601":-0.38814058690531544,"5602":0.672360449446569,"5603":0.5632656099925828,"5604":0.8101552053258662,"5605":0.7393179972490832,"5606":-0.20856891914801595,"5607":0.18416919705012577,"5608":0.4234431682113386,"5609":-0.3418094475450399,"5610":-1.3341275253555391,"5611":0.3859437027414948,"5612":-1.2083287417813513,"5613":2.4816401041697076,"5614":1.9058971386164938,"5615":1.1620552074358848,"5616":1.0602978047751255,"5617":-0.2252804568847365,"5618":-2.1244189410762897,"5619":-1.389629236443798,"5620":-0.6247858785914256,"5621":-0.3101887706783431,"5622":0.6822720612421526,"5623":1.415966865698636,"5624":-3.7766932255774583,"5625":-6.606165126983942,"5626":-3.566854091161833,"5627":-1.608270231650665,"5628":0.36648512708801934,"5629":-0.1445971341602933,"5630":0.6576425249088721,"5631":0.5289065121458653,"5632":1.5528760000770876,"5633":0.4558681460043937,"5634":0.6479660433325919,"5635":1.6257751614477904,"5636":-0.4184745712840795,"5637":-0.990539278993061,"5638":-1.1884799501566188,"5639":-0.13919402553018398,"5640":1.0373163505556657,"5641":0.2924424984997381,"5642":0.949133111225415,"5643":-0.07024955568535067,"5644":0.24965418215715326,"5645":-0.7854330061377762,"5646":1.7781368485104734,"5647":-0.008139330482315993,"5648":-0.7287657589212738,"5649":0.3328244578537968,"5650":0.6201497385961315,"5651":0.7232778175655323,"5652":0.41927968360536416,"5653":0.05024597310270652,"5654":0.9688113685017289,"5655":0.1790701951189655,"5656":-0.8917169435344827,"5657":-0.9977695077552244,"5658":-0.21334025585770988,"5659":-0.2515789103198866,"5660":-0.1995710706671734,"5661":-0.15609624870733943,"5662":-0.11703457121874868,"5663":-0.04366377569444427,"5664":-0.014495629216811185,"5665":0.03955309069773194,"5666":-0.08787807646422598,"5667":0.13676815341920198,"5668":-0.23327980881614377,"5669":-0.28328648955594193,"5670":-0.24210421663558224,"5671":-0.03148281963947592,"5672":-0.11635074151314698,"5673":-0.0863355134037485,"5674":0.02644193744186173,"5675":-0.0307381489878477,"5676":0.05386640309376691,"5677":-0.1762965168634,"5678":-0.3069046224168621,"5679":-0.05049896516722682,"5680":-0.05575589721817279,"5681":-0.18920099591386302,"5682":-0.14271095682210522,"5683":-0.1341679932256526,"5684":-0.2068214374862051,"5685":-0.14562085178811368,"5686":-0.2404158763681323,"5687":-0.08933618511754801,"5688":-0.18074922773207697,"5689":-0.07554297152086221,"5690":-0.041940788650107134,"5691":0.12623078730104437,"5692":-0.21551224202718847,"5693":-0.114276221550487,"5694":-0.1007371562429536,"5695":0.1852553365271791,"5696":0.11648808215353845,"5697":0.819046472453452,"5698":0.2948783607723207,"5699":0.20577541728627965,"5700":0.07030924878440648,"5701":-0.010676664706243899,"5702":0.08873750896486134,"5703":-0.16050576897857782,"5704":-0.04080855182035251,"5705":-0.10813903117255325,"5706":0.08922107642408282,"5707":-0.138640556434255,"5708":-0.17288432454858885,"5709":-0.09133068225178127,"5710":-0.2883218182472116,"5711":-0.16828916155898882,"5712":-0.2979033956068601,"5713":-0.1404761487732451,"5714":-0.06684984807762422,"5715":-0.25089934315613094,"5716":-0.2014853360133241,"5717":-0.28303382170064423,"5718":-0.05731957563052468,"5719":-0.12705575141767145,"5720":-0.1739403357453037,"5721":-0.24934670371588566,"5722":-0.025992725574231924,"5723":-0.02188223198105206,"5724":-0.10812665198409169,"5725":-0.11705572934874556,"5726":-0.24482736752016204,"5727":-0.23327991978879578,"5728":-0.02552823359393855,"5729":-0.16873864805153527,"5730":-0.30477816676678293,"5731":0.02753198726016423,"5732":-0.07051705826736038,"5733":-0.2302373318214799,"5734":-0.27470941446700914,"5735":-0.21638470035741125,"5736":-0.09685630120473902,"5737":-0.023999541961947774,"5738":0.003431317473629257,"5739":-0.3435345860015476,"5740":0.5509025375322063,"5741":-1.6794412430851922,"5742":-0.9658149798662077,"5743":2.8307014266751014,"5744":-2.0420554966117237,"5745":1.5728013805741021,"5746":0.7874046343709201,"5747":-0.5440186727043169,"5748":-0.8351586197470543,"5749":-0.4416801276539362,"5750":-0.8379483259525333,"5751":2.650773939210946,"5752":0.6688402084284837,"5753":-0.3887805750423809,"5754":1.3039685945207735,"5755":0.7287118821075508,"5756":0.4632697732734548,"5757":-0.6936666975947442,"5758":-0.8535887400806922,"5759":1.406306236896129,"5760":-0.07276315859160842,"5761":1.3845148974794879,"5762":1.8538593072450802,"5763":0.029886468253649906,"5764":1.5240368273570284,"5765":-0.7435942317108122,"5766":1.6646998077125044,"5767":-1.0523399820013695,"5768":-0.6309869199790816,"5769":-1.3823302126949037,"5770":-0.1450008128035749,"5771":0.1743584996049077,"5772":-0.16322504691039152,"5773":-1.0502215278321723,"5774":-1.8513368109265325,"5775":0.33644356409556636,"5776":1.042098026283073,"5777":-1.3235339399215171,"5778":-0.32841326488417616,"5779":-0.8648800082259159,"5780":-1.1289073096354088,"5781":-3.2464048147829963,"5782":-1.7826012836234753,"5783":0.17360555786322449,"5784":-0.9504365746837957,"5785":-0.7463833837194809,"5786":-0.6189298120398825,"5787":-0.5939133765360424,"5788":-3.0432539192407577,"5789":-0.2224945788666867,"5790":-1.2641069221440147,"5791":-1.3501796965898745,"5792":-0.040846919088939566,"5793":-0.6763852692453298,"5794":0.4089176846881355,"5795":-0.3966497522029726,"5796":-0.0016861156474173918,"5797":-0.15587952620492435,"5798":0.18735984351130594,"5799":0.9023463063620604,"5800":-0.5227309697286262,"5801":-0.9080246377833732,"5802":1.5946774591354487,"5803":0.01294589782536812,"5804":1.50590851683384,"5805":2.0841237859104735,"5806":1.556550806541565,"5807":1.5014619864391667,"5808":-0.021621608637742772,"5809":-0.12519809750786748,"5810":0.7639571473637516,"5811":0.4530103253777137,"5812":1.0675236269466035,"5813":-0.9511820324560983,"5814":0.7196370882047801,"5815":1.342989702862478,"5816":-1.0487340440540338,"5817":-1.2729321306389307,"5818":2.20540491338533,"5819":2.0674195157700943,"5820":-1.577063152923027,"5821":-0.48862788228820847,"5822":-1.1701157242038958,"5823":-1.2557982385913082,"5824":1.2712314003105927,"5825":-0.38766348230797554,"5826":-0.3954220360573519,"5827":1.8442548966105328,"5828":0.28659126658439765,"5829":-0.7072416808421497,"5830":2.1452644501144165,"5831":-0.4276857192551082,"5832":0.3564508770659275,"5833":-0.8833543390904661,"5834":-0.34226110379410724,"5835":-0.7938863866649157,"5836":-0.16796398747645466,"5837":-0.9929935163403982,"5838":-0.37669504322170994,"5839":0.40434007430578056,"5840":-0.6640858121937647,"5841":-0.30901708710572234,"5842":-0.5814096810848983,"5843":-0.7484405291477356,"5844":1.0674585871413664,"5845":2.133312285730027,"5846":-0.2459056411557602,"5847":1.7328215005680945,"5848":-1.0063661495395206,"5849":0.7935174507161067,"5850":-1.2586732005426773,"5851":1.0965302540527728,"5852":3.1451977898702212,"5853":2.0474829482788026,"5854":2.1452146082560186,"5855":1.402079680210639,"5856":0.4350412426932171,"5857":0.520966901770076,"5858":0.27715009767744697,"5859":-0.17839668661358513,"5860":-1.0337764335993502,"5861":-2.4151718791315133,"5862":0.5233537959605691,"5863":-3.4206583226612683,"5864":-4.255918623612979,"5865":-1.1516051787470007,"5866":-2.0957076206853897,"5867":-0.9671689864813938,"5868":0.5993670294300959,"5869":-0.9664747611620366,"5870":0.8286274327097987,"5871":1.4125406716694746,"5872":0.8510525668172445,"5873":2.5639793679410148,"5874":0.953835838933116,"5875":3.887871180061489,"5876":-0.4127639174296074,"5877":-0.651698262276719,"5878":1.5321475868730363,"5879":1.096842132785261,"5880":-0.9871688963181365,"5881":-1.6922015554894148,"5882":0.636142540779625,"5883":-1.3384721793812966,"5884":0.2718300469051223,"5885":0.5881477470826014,"5886":0.6174303237757529,"5887":0.3695278957673108,"5888":0.16767246666578653,"5889":-0.7154298765547819,"5890":-0.17711217563246434,"5891":-1.7213864836713528,"5892":-0.20642174043085373,"5893":1.4466124573022672,"5894":-0.6624483709774135,"5895":-0.26300113291279287,"5896":-1.671458387688526,"5897":-0.006984434609939478,"5898":0.5384973726519984,"5899":1.6829437808749697,"5900":0.6287514634270395,"5901":-1.1322347589231407,"5902":1.8119346348694767,"5903":1.751860336504298,"5904":0.33862805978724586,"5905":0.5018166351529673,"5906":-0.33875608977054517,"5907":0.8417375354874684,"5908":-0.6596123964020251,"5909":2.1341702572668955,"5910":1.2574845187668928,"5911":-0.4483937613682204,"5912":0.3849001206115522,"5913":-0.4244920822495207,"5914":0.3397227339472489,"5915":-3.141728675579425,"5916":-0.44376259762311343,"5917":1.2130807061477538,"5918":-0.2583347305603625,"5919":-1.4251799721553908,"5920":1.7996619581057907,"5921":-1.877426676615641,"5922":1.7291976116392778,"5923":-1.7248021321714253,"5924":1.6341929588517077,"5925":0.6449552842264643,"5926":-0.331039725950246,"5927":2.169956237764466,"5928":-1.6730390414592162,"5929":1.7159488649178287,"5930":-0.16597723876655182,"5931":-0.7480057960714096,"5932":0.5084182240868945,"5933":-0.6544593769412547,"5934":-0.141289054402322,"5935":1.8213351724678304,"5936":-1.9764274256616838,"5937":0.5055544328696426,"5938":-0.5576711355390358,"5939":0.7740979949620229,"5940":0.7523789209284264,"5941":-0.022890547961538686,"5942":0.22108894971230159,"5943":3.5208692139553084,"5944":3.1753789063718902,"5945":2.6909262995600733,"5946":-0.40687215602917415,"5947":-0.4713658110723028,"5948":0.43319798773341717,"5949":-1.8600921580775893,"5950":1.094280177362162,"5951":-2.313196729293923,"5952":-0.3613201524084429,"5953":1.8963669412401751,"5954":-1.5925803963114575,"5955":-1.2586748513201453,"5956":-1.0802902063982551,"5957":0.18023113188822668,"5958":-1.7140590859973952,"5959":1.403091068556602,"5960":-0.5663583702150834,"5961":-1.2995856764901272,"5962":-1.3518412610945865,"5963":0.08418660477719152,"5964":0.34877653865798286,"5965":1.3146257063888853,"5966":0.7512681826220378,"5967":-0.4024113667039246,"5968":-0.5427752040373051,"5969":-0.42156925893477676,"5970":0.7518833121414747,"5971":-0.6755585454517691,"5972":0.376467283443853,"5973":-1.4912744533170583,"5974":0.8002219665811945,"5975":-0.5057937576591985,"5976":-0.5249494925507686,"5977":-0.2055638088961863,"5978":-1.706088218538442,"5979":-0.7205077570264552,"5980":0.54354436810304,"5981":1.6247648916748598,"5982":0.16589363412313848,"5983":-0.0602316936042667,"5984":0.7190172424190654,"5985":-0.046740442314300926,"5986":0.0599088538737719,"5987":-0.5616239536167453,"5988":-0.5546418253587225,"5989":0.6902307198353497,"5990":-0.18173006005436068,"5991":0.15812496688444364,"5992":0.4603486702846619,"5993":-0.19394124534226143,"5994":-0.01828777374671227,"5995":-0.4469925008280112,"5996":-0.9114006304767471,"5997":0.49574882365162687,"5998":-0.11598241176667641,"5999":-0.1269592875943381,"6000":-0.2120122109834905,"6001":0.387566714932995,"6002":-0.2390042439747974,"6003":-0.32550953464562704,"6004":-0.7128648127392067,"6005":-0.9275145438452762,"6006":0.22745918560675527,"6007":-0.17067656954541094,"6008":0.15534766735989525,"6009":-0.3632223545246226,"6010":-0.8457405301232034,"6011":-0.47144521610290296,"6012":-0.3869301902134986,"6013":-0.34404143545543625,"6014":0.2998381666603437,"6015":0.5014078025713399,"6016":0.30976777494058827,"6017":0.6114731952966018,"6018":-0.6090233502716349,"6019":0.0366731052543717,"6020":-0.5092660729189918,"6021":-0.441352309621708,"6022":-0.9290207028871375,"6023":8.373553593503713,"6024":8.52094500602404,"6025":1.008366125553748,"6026":0.16976125016653804,"6027":0.4882520811262356,"6028":0.2890066057779652,"6029":0.43922050533049845,"6030":-0.8006314192746601,"6031":0.72559353069217,"6032":0.4053739519603029,"6033":0.7921224670628938,"6034":-0.42994382224795075,"6035":0.12929865665519957,"6036":-0.3569413780003902,"6037":0.2699051357793214,"6038":-0.32585597185147736,"6039":-0.22116086727863044,"6040":-0.7197706421175823,"6041":0.3486609573225874,"6042":-0.12874226018768095,"6043":0.14028008333719205,"6044":-0.026540888940131006,"6045":-0.2055923477914283,"6046":-0.06647778335853192,"6047":-0.016225897647192882,"6048":-0.8350073102149527,"6049":0.06490644095329329,"6050":-0.5227864279331892,"6051":-0.4961627051187514,"6052":-0.2968745831588683,"6053":-0.09847896528040899,"6054":-0.7758998865603233,"6055":-0.6119963807621658,"6056":-0.05377737476761798,"6057":0.043483506364379254,"6058":-0.3243281649098375,"6059":-0.2815078715312047,"6060":-0.7106667588057675,"6061":-0.699202641865668,"6062":-0.06751291909104144,"6063":0.2018176951835921,"6064":0.1248691411980112,"6065":0.07178476973841673,"6066":-0.530615924014579,"6067":-0.47933867574273914,"6068":0.9453338788995035,"6069":0.9002335899413291,"6070":0.35754200332108627,"6071":0.7026262619470559,"6072":0.9605481428083403,"6073":-1.5548803322965985,"6074":0.09022484827529821,"6075":0.5345605064902313,"6076":-2.163773068158748,"6077":1.9128724638305452,"6078":-0.07942227707826999,"6079":-0.5179378051644669,"6080":-0.03931430784668275,"6081":0.33876161624322787,"6082":0.7609867266748408,"6083":-2.0201811734637873,"6084":0.7273142537929267,"6085":-1.1622870566296066,"6086":-0.035547273581356016,"6087":1.1946450551553192,"6088":1.0642394310248964,"6089":-0.9465464383618739,"6090":-0.96526999429002,"6091":-0.5613825040885984,"6092":-0.8318578286950444,"6093":0.32037482541507156,"6094":1.104689025616482,"6095":1.158874270604008,"6096":1.7256247610774755,"6097":1.9009262703660823,"6098":1.7953123375705575,"6099":1.4684771628399194,"6100":-0.9126163672726327,"6101":-1.2997493247843024,"6102":0.9904750880751942,"6103":1.4710293206441625,"6104":0.44682689462326514,"6105":-1.3187347335279682,"6106":1.4813822343020149,"6107":0.007195562148894344,"6108":-5.141814316823268,"6109":-3.56481398963257,"6110":-0.20656256224420325,"6111":-0.32033324932708424,"6112":-1.098135666201113,"6113":-1.1521464712805076,"6114":0.0424219826196717,"6115":0.09906734410157553,"6116":-1.777495988482035,"6117":-3.4932955494874216,"6118":-1.2372039002459223,"6119":-2.16506522054701,"6120":0.015209755182819567,"6121":-1.5054311574497086,"6122":-0.73488006344126,"6123":-1.6535994929917743,"6124":-0.6461342502370465,"6125":-1.1149697799651233,"6126":0.032477334622285456,"6127":0.06719481908213502,"6128":-1.3202785021992778,"6129":-0.7485867170015296,"6130":-0.506300263054364,"6131":1.3439334265583796,"6132":-0.2834797408037558,"6133":2.221988509804037,"6134":-0.43284444442751235,"6135":0.16077833308256217,"6136":0.7024105849248508,"6137":-1.8075252407116462,"6138":0.7606655846970463,"6139":-0.686995773986434,"6140":1.3702559167367132,"6141":0.5390406505845032,"6142":0.9336190888663615,"6143":0.2702260807820747,"6144":1.3885887077816235,"6145":0.5090060723307671,"6146":-1.1124688530700246,"6147":0.05681625783204818,"6148":-0.12217664429869411,"6149":1.0495912109609822,"6150":-0.5715971180906552,"6151":1.2347563599662013,"6152":1.368595910899226,"6153":0.01461843513669102,"6154":0.7041237323809728,"6155":-0.10149527655159288,"6156":0.994908124653383,"6157":0.2733808260335978,"6158":-0.38827855733013283,"6159":-0.8960846597001535,"6160":0.7916234979295363,"6161":-0.2889626149868814,"6162":-1.4980805197018268,"6163":-0.465136100892828,"6164":0.5966845437875946,"6165":-0.8094418495291901,"6166":-0.09132386988111531,"6167":0.48459965106526354,"6168":-0.8726778545737975,"6169":1.5601207028172506,"6170":-1.9640752971967395,"6171":-1.4458436280370022,"6172":0.7258153990737989,"6173":2.9083634241049303,"6174":0.6250801282225074,"6175":-1.8187827556055918,"6176":-1.1215009843860124,"6177":-0.46802713616268227,"6178":1.0867975017006406,"6179":0.30018953090723144,"6180":-2.7109410155436064,"6181":-1.7497569311150951,"6182":-0.9427513576782763,"6183":-1.8097912670698113,"6184":-0.5259980174070429,"6185":-1.4363034588792745,"6186":0.6963246965394754,"6187":-0.18627474589081824,"6188":-1.2870917362560956,"6189":0.23416505237356777,"6190":-3.536922760829159,"6191":-3.1076810991168626,"6192":-0.6323789578611523,"6193":1.6523041179799487,"6194":-0.6069542082491102,"6195":-0.7863053796111883,"6196":1.8792893921570555,"6197":0.19481914131485598,"6198":-0.7726607237783749,"6199":0.5369263653170195,"6200":-1.156359669456268,"6201":-0.5463409461954817,"6202":-0.34912412592599373,"6203":-1.0179037631955512,"6204":-0.3523139143239736,"6205":0.15572418601998517,"6206":-3.468391142153946,"6207":1.152575873063327,"6208":1.6293425723162183,"6209":-1.192830866877099,"6210":-0.3762792372174235,"6211":-1.9612725965474689,"6212":1.6472755058512827,"6213":-1.3380613591281443,"6214":-1.6025555525163238,"6215":0.18583902368821076,"6216":-0.5397108335124886,"6217":1.2979422280799375,"6218":1.624992389855637,"6219":1.4973305463122868,"6220":-1.362596231980296,"6221":0.930494989005125,"6222":-0.15586242981576487,"6223":1.7417871153826645,"6224":-1.3870830882110168,"6225":-1.03694763945983,"6226":0.1063290085766156,"6227":0.7511653388665933,"6228":-0.23411731028435287,"6229":0.5023926759861129,"6230":0.048142122838083605,"6231":1.2509148083630979,"6232":1.5024244912190003,"6233":-1.2890630540020631,"6234":-0.30929775300187573,"6235":1.0033938324553064,"6236":-2.015012564900383,"6237":1.0619537850285454,"6238":-0.3829255168359655,"6239":1.9226158677357246,"6240":-1.8340537333183788,"6241":0.8893152138281138,"6242":-0.7380445702668758,"6243":1.8200299392524022,"6244":-0.24266168913303296,"6245":0.21898066781997938,"6246":-0.2858625798398953,"6247":-1.1854160398597038,"6248":0.7365957946124895,"6249":-0.3420121946348659,"6250":-0.617768819360963,"6251":-1.1126143223592837,"6252":0.18270255713114963,"6253":-0.6101801036050865,"6254":0.0407001425082237,"6255":0.6007013917089971,"6256":1.089134830961372,"6257":-0.6996701580859558,"6258":0.7284374892886896,"6259":-0.5057131008538973,"6260":-2.880284451414005,"6261":-0.6459252158930353,"6262":-0.8489519406339425,"6263":-0.41458802753315394,"6264":0.38042411026860495,"6265":-0.12676365795120215,"6266":2.8147659278796966,"6267":3.1682239893862985,"6268":-1.6718713026549417,"6269":-0.8140342271008159,"6270":-0.47850942123668994,"6271":-0.06560069032682482,"6272":2.6186884585439234,"6273":1.8414188607713806,"6274":3.6941510410287384,"6275":1.6641826506775128,"6276":1.2516091765589468,"6277":0.29789164435625465,"6278":0.0020112658773319683,"6279":-1.7219172571814862,"6280":0.022077473048948294,"6281":-0.7137170749689781,"6282":-1.4418731916392564,"6283":-0.819462088403591,"6284":-0.578337160777335,"6285":0.4983017466975907,"6286":0.6712425195654462,"6287":-1.4209521338474118,"6288":-0.7746933830289408,"6289":1.2007812968816658,"6290":-0.376156835798585,"6291":0.1387223197565926,"6292":-0.7032446389732657,"6293":0.24536149546915167,"6294":0.07393756907611113,"6295":0.8461559636182062,"6296":0.9458333019339988,"6297":-0.24146101949065163,"6298":0.3996873081668787,"6299":-0.7620804642677527,"6300":0.025687896198345304,"6301":0.45205373068653465,"6302":0.03567392344227547,"6303":0.22301422753768715,"6304":2.1702458229087673,"6305":-0.4825484982827474,"6306":-0.7084061023177434,"6307":-0.2224978415641829,"6308":0.17674935589860177,"6309":1.2478994402436137,"6310":-0.04171509946581399,"6311":0.999221263065827,"6312":0.13104565169846036,"6313":-0.2983968182546154,"6314":-0.989937321512165,"6315":0.34416498532118034,"6316":-0.17265479966495167,"6317":-0.146324552886721,"6318":0.5254670624933925,"6319":0.7649347089905831,"6320":0.7530578824226499,"6321":-0.16484972702229966,"6322":-0.008816066529808762,"6323":-0.16074188602855885,"6324":-0.6242928015621757,"6325":-0.6380308206805455,"6326":0.1830229498986454,"6327":0.555279203877137,"6328":0.744815782284294,"6329":-0.1388731463740153,"6330":-0.7023732187770031,"6331":-0.3525604920473317,"6332":0.617625286462299,"6333":0.26066558997409295,"6334":0.4883324210134489,"6335":0.07310745449567856,"6336":-0.2958822247987659,"6337":0.8094183348283212,"6338":-0.5903531962731468,"6339":-0.6739838398269715,"6340":-0.1579178922623481,"6341":-0.28775648636858675,"6342":-0.006759312476758674,"6343":-0.18364771634930166,"6344":-0.2385843721605434,"6345":2.9643155114822215,"6346":1.3033286530090655,"6347":0.9416992748671256,"6348":-0.16728215708673555,"6349":0.6326446237500145,"6350":-0.812752906511793,"6351":0.1527743837759996,"6352":0.2562343687210631,"6353":11.178401155032242,"6354":8.540942377553314,"6355":4.5155581317508595,"6356":-0.442840834810428,"6357":-0.725119873568475,"6358":-0.4389476519093822,"6359":-0.5117151679075127,"6360":0.669000277704998,"6361":-0.5265900284905608,"6362":-0.4924390656025241,"6363":1.2743678433290733,"6364":1.5600142792523193,"6365":0.28752719808128285,"6366":-0.6462078754680326,"6367":-0.21202053870707607,"6368":0.35908076560853075,"6369":0.2635839020788782,"6370":0.2622065826240085,"6371":0.6151220215729197,"6372":1.169675341724819,"6373":-1.0678689290063677,"6374":0.5125892320643615,"6375":-1.4004325193166167,"6376":-0.24293465660908592,"6377":0.21850266100388127,"6378":-0.48274101818787857,"6379":-0.5666351334817568,"6380":0.0875442795830937,"6381":0.3214062098195637,"6382":-0.08599518481133664,"6383":-0.3494310861021208,"6384":-0.4721624542664889,"6385":-0.6377808556192973,"6386":-0.8303975662443109,"6387":-0.5106520936042187,"6388":0.4406182700634995,"6389":-0.7937065137826289,"6390":0.1648911926991971,"6391":0.5387756381581161,"6392":0.48085040367974213,"6393":-0.02747448719097451,"6394":0.6431644721832098,"6395":-0.04308307719103421,"6396":-1.1016550505931648,"6397":-0.16609313215539975,"6398":-1.2441917476778643,"6399":-0.5197530426339347,"6400":-0.7923587197802355,"6401":0.20441487327981736,"6402":0.38268624773511817,"6403":0.07469582791136274,"6404":-1.174329591202941,"6405":0.8691242393908529,"6406":-0.6847228695871129,"6407":1.603479583972302,"6408":-2.6520106965399264,"6409":-0.5467532187964539,"6410":1.3881129483954304,"6411":0.7462429040766962,"6412":-0.13692631168673128,"6413":0.5969157763500847,"6414":0.16311389317805833,"6415":-0.09096655009106723,"6416":-1.1034933447756672,"6417":0.43082837165405874,"6418":1.64688377813523,"6419":0.46354145859721835,"6420":0.012138845570171017,"6421":-1.1269619440137237,"6422":-0.31615310913243105,"6423":-0.816246286316933,"6424":-0.4502109156803788,"6425":-0.34282422339195795,"6426":-1.8040058689985634,"6427":-0.9853413913145879,"6428":0.13798218628434863,"6429":0.7605947887157183,"6430":-0.38898491128239354,"6431":-2.4686430003289055,"6432":0.39045450162491535,"6433":1.68470126576372,"6434":0.9463358678056915,"6435":0.5831584405008804,"6436":-3.2886886318997637,"6437":-0.4472166062079207,"6438":-0.8727895122297815,"6439":-0.3803417642850373,"6440":-0.4812062742106308,"6441":-0.37541367214190396,"6442":-0.7328101452344811,"6443":2.9640578856997886,"6444":4.357862291737896,"6445":2.8278060105889473,"6446":1.0372454638140232,"6447":-0.8940054101085315,"6448":0.8569475090529326,"6449":1.1049306520399795,"6450":0.6844817532877433,"6451":-0.017142177871283925,"6452":0.3816323197628261,"6453":1.2965874960647596,"6454":2.202813751858838,"6455":0.878267724692037,"6456":-0.18900913241967796,"6457":-0.06390390432097895,"6458":0.2536565418173682,"6459":-0.15134157083588862,"6460":-0.2874124751738343,"6461":0.2620396232412025,"6462":0.6037384713997886,"6463":0.4016069934067194,"6464":1.0040795974225436,"6465":2.0332289319732015,"6466":0.8223367010005601,"6467":0.41759779570527233,"6468":2.2575052503012216,"6469":0.10996833240064305,"6470":-0.7408542865438614,"6471":-0.5478015707994719,"6472":0.31632990916642295,"6473":0.39904457611442024,"6474":1.6820035466520105,"6475":2.0316933106190884,"6476":-0.011543736642223815,"6477":-0.38094406412095533,"6478":-0.6606184195961521,"6479":-0.955146472959889,"6480":-0.38339516089888853,"6481":-0.0343125950692576,"6482":0.41305935494298307,"6483":-0.8302132000565563,"6484":0.5544312918659791,"6485":-0.8080971645288869,"6486":0.742025492374302,"6487":-0.03039836191277165,"6488":0.7622606214712748,"6489":-1.0885586896673338,"6490":1.0385196347391785,"6491":-1.1036808977112056,"6492":-0.295466322624608,"6493":-1.2203001043190755,"6494":-2.0744996508705875,"6495":-0.42327919106613016,"6496":1.3206348766461695,"6497":0.4221097554290468,"6498":-1.7600056219185944,"6499":0.9823720350313907,"6500":-0.718668506470782,"6501":-0.318732297901004,"6502":0.3201539769585091,"6503":-0.1955599371154509,"6504":-1.0608569863059465,"6505":-1.139010730610821,"6506":0.014657147130864044,"6507":1.0495420536026685,"6508":0.8966181816120699,"6509":0.7895647890434538,"6510":-0.6123246056064698,"6511":0.6153427215930651,"6512":-0.08024878447677541,"6513":1.166949128534246,"6514":-0.034995378585488346,"6515":1.266671008334961,"6516":-0.6349279802490304,"6517":7.893962043385443,"6518":3.4567417036931065,"6519":1.668905399368382,"6520":-1.578259562170321,"6521":-0.09094526167251497,"6522":0.4478038399195773,"6523":2.158884253420404,"6524":1.1377858373063405,"6525":-2.6566166600613506,"6526":0.8436870018303543,"6527":2.4231178167851835,"6528":1.074928405544751,"6529":-0.7699474724024161,"6530":-0.21654977647813348,"6531":0.9775002458726545,"6532":-1.4572839450062978,"6533":-0.602054490532095,"6534":1.2166911521307433,"6535":1.6527793950986653,"6536":-1.9397756315798538,"6537":1.1543104123572259,"6538":-0.7091113575490235,"6539":-0.047891906637423695,"6540":-0.10448400234318996,"6541":-1.2943924302670726,"6542":1.2446157513018623,"6543":-1.3821984032141286,"6544":-0.13651902753545067,"6545":0.03212785027458448,"6546":0.9509152092420894,"6547":-1.0031525674217194,"6548":0.07487394106429146,"6549":-1.4679185056188804,"6550":0.6883370871760167,"6551":-0.11853059430583322,"6552":-0.7220354587541846,"6553":0.6074603217708141,"6554":-0.5754867236625948,"6555":0.849975564059649,"6556":0.4731305015002718,"6557":-0.6987958809478683,"6558":-1.5544319199122882,"6559":0.12120003017158062,"6560":1.092476752686989,"6561":-1.0341118051595581,"6562":0.007406883476629507,"6563":-0.7249128752563413,"6564":1.1447308292538758,"6565":-1.4782615021130625,"6566":-0.27166929412937724,"6567":0.5384326029358331,"6568":-2.029083253103532,"6569":-0.7364815214676949,"6570":0.09727274587464585,"6571":0.19673727717097564,"6572":-0.07137475379744161,"6573":0.5812837402937021,"6574":-1.3754139543466373,"6575":-1.5968306926572489,"6576":0.7599726010700634,"6577":0.06641528421500668,"6578":0.8160957280488771,"6579":1.239256230461087,"6580":0.7363694694747976,"6581":-0.1842742479454538,"6582":0.21676191330885347,"6583":-0.6941576773617122,"6584":1.2121818231934975,"6585":0.25422408018647236,"6586":-0.07625860712140228,"6587":-0.4957218476228326,"6588":-0.9807476937858092,"6589":1.4896467665538655,"6590":2.610061604427584,"6591":2.047167521662111,"6592":3.111064584508098,"6593":0.3173103160433628,"6594":0.7714311701021825,"6595":0.7220895408555938,"6596":-0.04813190772893193,"6597":-1.0699509574820838,"6598":0.5479186473552671,"6599":1.1871968204023053,"6600":4.505492487645882,"6601":2.2904756430126514,"6602":1.0674901035749977,"6603":-0.17084399465156516,"6604":-0.6375871416256972,"6605":-0.4635449478023241,"6606":-1.6654995727243895,"6607":1.1022256679371434,"6608":-1.0679665099198403,"6609":-0.24051286057629087,"6610":1.8412631373021395,"6611":-0.743689534600391,"6612":-1.164545276162442,"6613":0.8844343766719893,"6614":-0.546630792638767,"6615":-0.7225913819813988,"6616":0.6289372338271847,"6617":0.395139971932179,"6618":-0.5515629886443794,"6619":0.24081826526534533,"6620":0.18986960330915886,"6621":0.15049085977615784,"6622":1.0368520886698909,"6623":0.0017525250708860054,"6624":0.9151394172288367,"6625":1.889948974186231,"6626":2.2447847675970096,"6627":-1.3778837517188047,"6628":-0.7822551357589681,"6629":0.9503044725364304,"6630":-2.7576064434156007,"6631":-0.47022686523119667,"6632":1.8449430517352223,"6633":-2.6653349525156678,"6634":-0.6349739228854686,"6635":0.6670641127343216,"6636":-0.03749866342022949,"6637":-1.263242168633475,"6638":-1.639242998598047,"6639":-1.996996714133262,"6640":0.08537538322388913,"6641":-1.1365862391690822,"6642":-2.5590768685534777,"6643":1.3424994378498247,"6644":-0.6663456930790832,"6645":3.455008784572041,"6646":1.527741741390065,"6647":1.1044819537791255,"6648":0.6833954950986649,"6649":0.7301552294768324,"6650":0.5637788577938077,"6651":0.28397536730668715,"6652":-0.12066367279637588,"6653":-1.3372801851263816,"6654":2.1562721177284265,"6655":1.1192244528368749,"6656":0.9963602251177099,"6657":0.9247020826036371,"6658":0.9408459468469386,"6659":0.7567881667028482,"6660":1.122772156244178,"6661":0.45753773793214464,"6662":-1.855178832029451,"6663":2.943145728018813,"6664":2.078217420427455,"6665":1.4608100478684667,"6666":0.5862962938272857,"6667":0.45892851570430265,"6668":0.8440084105829379,"6669":-1.3053769900442576,"6670":-0.359052419982851,"6671":-2.3225053552212063,"6672":2.6544860427969734,"6673":1.4647677091534397,"6674":1.140677898500514,"6675":0.577969577326454,"6676":0.3869438630001739,"6677":0.4667084854147358,"6678":-0.46876456007276607,"6679":0.06197830746251482,"6680":-2.557584244302388,"6681":2.0694479504455496,"6682":1.8792754250195371,"6683":1.3752340802340053,"6684":0.46563228315792593,"6685":0.867153088004493,"6686":0.2757906593020145,"6687":0.06730650457033784,"6688":-0.341077333386204,"6689":-0.6522415754701462,"6690":1.8598445386913052,"6691":1.6852187218471628,"6692":1.2043474634950175,"6693":1.3643805673807508,"6694":1.2745652514655257,"6695":0.6154182852532356,"6696":1.4549546151970418,"6697":-0.21348996990729488,"6698":1.884440361093829,"6699":2.647827073835612,"6700":2.272691222558465,"6701":1.0889320136344856,"6702":0.7168592760404762,"6703":0.5644657600657507,"6704":0.5945568524798968,"6705":0.6236333639528014,"6706":-0.8526885929305767,"6707":0.778815145920609,"6708":2.3760986010042346,"6709":2.0897404650944895,"6710":1.2799487450587486,"6711":0.6660644098553802,"6712":1.0333356257686381,"6713":0.7830134199163921,"6714":2.2602015471880432,"6715":-0.17856311201151948,"6716":-1.7915289901588667,"6717":3.9079210510848132,"6718":1.9216094046771917,"6719":1.2409215455033542,"6720":0.7083407915361348,"6721":0.3913732635790635,"6722":0.7288229161477351,"6723":0.11231477849993832,"6724":-0.7453891294051688,"6725":0.3249744878940247,"6726":0.7252134573656971,"6727":-0.059480833682258295,"6728":-1.2887349167565587,"6729":0.15809878255540297,"6730":-0.43705528864801524,"6731":-0.3171359264293404,"6732":-0.42160616773872944,"6733":-0.5809718662195739,"6734":-0.24927382026870284,"6735":0.3171428510384682,"6736":-0.03149581422772227,"6737":-0.13224724628611279,"6738":0.5267178818301144,"6739":0.39906693485515804,"6740":0.2996314997040958,"6741":-0.15150498056934003,"6742":-0.38645917041904465,"6743":0.4439481032371752,"6744":0.3721081102481346,"6745":-0.09065225040368834,"6746":0.140731243591181,"6747":0.26748198914172633,"6748":0.07201165281588748,"6749":0.2563658589179941,"6750":-0.02781841746572192,"6751":0.2056935614202568,"6752":0.8400378895838825,"6753":0.4075068817185422,"6754":0.13265422402606586,"6755":0.14768762565015514,"6756":-0.003784579511877293,"6757":0.325303357979603,"6758":0.6161469691904227,"6759":0.28930119347738226,"6760":0.23326257678260456,"6761":-0.42661969690322876,"6762":-0.5351186857040146,"6763":-1.009222286302308,"6764":-0.5374535736468604,"6765":0.084593998392656,"6766":-0.814704566330673,"6767":-0.1736365278010135,"6768":0.15002626772206717,"6769":-0.1255164709076127,"6770":-0.6510379339005752,"6771":11.971597033010045,"6772":-1.6757972349428594,"6773":-0.5231328730507612,"6774":-0.22266017140531263,"6775":0.2498587451469113,"6776":-0.5551275138347539,"6777":0.3154645293840615,"6778":0.808827680071711,"6779":0.48186136276312835,"6780":0.23020264717811265,"6781":0.17668852777559335,"6782":-0.5187166646729134,"6783":-0.9448397235821792,"6784":-0.49722488719351693,"6785":-0.35753184134839866,"6786":-0.2911826176332329,"6787":0.4983353209678812,"6788":-0.11813473875485478,"6789":-0.6463969476472944,"6790":0.2636836389812423,"6791":-0.18726997466442272,"6792":0.21164365088541987,"6793":0.10751576285151383,"6794":-0.35630820991672746,"6795":0.19038790448181908,"6796":0.12941763229500022,"6797":-0.421143914772118,"6798":0.6369974413356351,"6799":0.10152659363463196,"6800":-0.5090988276416453,"6801":-0.5555666780228922,"6802":-0.22136552328530848,"6803":-0.6595789895471835,"6804":0.08505965844451205,"6805":0.09182847167111667,"6806":0.004492219317605908,"6807":0.7215081092165285,"6808":0.21357567079217027,"6809":-0.3765075197490092,"6810":-1.2429437343006327,"6811":-1.3041461145881033,"6812":-0.3645218367711866,"6813":-0.558750848898522,"6814":-1.5585319947708443,"6815":-0.5503068752035232,"6816":2.005769328398851,"6817":0.7680613521303425,"6818":-0.14484049217341916,"6819":-0.7780977486635194,"6820":-1.297027377864662,"6821":-0.8581912512442427,"6822":-1.015832708125233,"6823":-0.18555810526202657,"6824":-0.43011827042186457,"6825":0.33669440531328576,"6826":-1.2076380044551083,"6827":-0.38771289755544924,"6828":-2.555666572504896,"6829":-1.1247100596065596,"6830":-0.30074152521165315,"6831":-0.5458017919210885,"6832":-0.8814030911915794,"6833":-0.49434035316012537,"6834":1.616153044028921,"6835":-0.748809587088523,"6836":0.6319333331249049,"6837":-1.4678039154967053,"6838":-1.5956657484057903,"6839":-0.5591115276373967,"6840":-1.0435358538532604,"6841":-0.23077554077818332,"6842":1.3174240565735917,"6843":1.8076926090356233,"6844":0.6995158080219921,"6845":1.5747105387172258,"6846":-1.3726656786597777,"6847":-1.9121342738821363,"6848":-0.4470042532756221,"6849":-0.546633892275955,"6850":-0.9756334593081711,"6851":-1.452900804983765,"6852":0.3063989286602933,"6853":-0.7494430268027158,"6854":-0.45006725803907277,"6855":-2.702565136538683,"6856":-2.1519116119813058,"6857":-1.1012439095992146,"6858":-1.0352454514049416,"6859":-1.0724933093749038,"6860":-2.546752190854566,"6861":-0.23915837972071508,"6862":1.4463857004167209,"6863":0.9443310367108552,"6864":-1.8979146277611094,"6865":-1.9038711232460919,"6866":-1.6769192588246606,"6867":0.38012788672560277,"6868":-0.8831435984045779,"6869":0.49137817951626117,"6870":-0.5171853008403771,"6871":0.16690758739387368,"6872":-0.1419624964981729,"6873":-1.4152328217967185,"6874":-2.002770983541162,"6875":-0.8632969754022317,"6876":-0.47244563450701166,"6877":-1.0378296264930031,"6878":0.3136957005271228,"6879":-0.23511071711804307,"6880":-0.774297985113458,"6881":-0.6579108377416568,"6882":-1.320926878607257,"6883":-2.0734609041202106,"6884":-0.985104124106265,"6885":-0.46413542165648747,"6886":-0.3864693172092447,"6887":0.47272724915294745,"6888":-0.48834500528227137,"6889":0.32774157328285725,"6890":1.5534837400686825,"6891":0.9697208514118207,"6892":-0.6474265384857019,"6893":-0.6942066655411083,"6894":-0.028783598365156052,"6895":-0.4715686581404195,"6896":0.8199472015883043,"6897":0.2631076829678816,"6898":0.34255066833912606,"6899":-1.125611988219035,"6900":1.5381990424346117,"6901":-0.08533795116057814,"6902":1.3911569067407743,"6903":-1.9551324449840337,"6904":1.4437828739615168,"6905":0.48594501420324304,"6906":1.147205082624599,"6907":-0.2174640076452712,"6908":-0.059203619308132206,"6909":-0.2093777029664724,"6910":-0.4486972435500084,"6911":1.117147801256328,"6912":-0.5564761451320194,"6913":0.5987795597293338,"6914":1.0779447024821172,"6915":0.8492973032588167,"6916":-0.07029224927883387,"6917":-0.4189779900855565,"6918":1.0234766383052818,"6919":-0.05649367333217621,"6920":0.020167332453987157,"6921":-1.0050515160139912,"6922":-1.085645377789723,"6923":1.4617372013594618,"6924":-1.166595064870287,"6925":-0.4754944987357675,"6926":-0.039296716601657775,"6927":0.4778439478633836,"6928":-1.2193023867108843,"6929":0.14048736209769347,"6930":1.1240006591782026,"6931":0.21413364856053996,"6932":0.996197112176831,"6933":-0.02091410229357581,"6934":-0.4625680877309488,"6935":-1.0486274548335726,"6936":0.7422715714198095,"6937":0.6843524564677337,"6938":-1.0696298446070283,"6939":-3.1767991560542086,"6940":-2.2918116225896696,"6941":-0.1611937959727176,"6942":-0.5588851056797726,"6943":-1.2734800356169207,"6944":-2.03272076877793,"6945":0.7086483402496868,"6946":-0.8660746195522516,"6947":0.45478018843346735,"6948":0.14867232923314186,"6949":-1.8465808448251264,"6950":-1.6037593268465224,"6951":0.828378143697583,"6952":-0.39791068511358013,"6953":0.16203492190593352,"6954":-0.01673499675456142,"6955":-0.5779092436017592,"6956":1.4940889889572284,"6957":-0.10172306325363158,"6958":-2.9208960866843205,"6959":-0.47011125653626534,"6960":0.1526111478757425,"6961":1.258414788957982,"6962":0.6851609299384431,"6963":-0.6732231270698524,"6964":-0.042072638177217764,"6965":0.48040351636849793,"6966":-0.5750961980623983,"6967":0.46230578838118813,"6968":0.024943683504908568,"6969":0.886022165373104,"6970":-1.6029336889275232,"6971":0.9506656417854145,"6972":0.5646650720913945,"6973":0.8788002889365089,"6974":1.8000869093556688,"6975":-0.7137472881885827,"6976":-1.6012818350925,"6977":1.3459905690552925,"6978":0.4593011007340776,"6979":0.578103044724096,"6980":-0.7661737855293465,"6981":0.5017403991478582,"6982":-2.05341010511671,"6983":-0.05531114364461329,"6984":-0.43752429602849036,"6985":-0.13963688107424913,"6986":0.10547806340255655,"6987":1.0585781330666577,"6988":0.6880199186806628,"6989":2.3700119138092575,"6990":1.145342165074332,"6991":0.07286761774817918,"6992":-0.047922973198128764,"6993":-1.1759791105258013,"6994":0.8563870350688901,"6995":-1.3065515943207922,"6996":-1.5364179448091875,"6997":0.20457185861856547,"6998":-1.0231800048074204,"6999":0.04005733091874492,"7000":-1.556832721220115,"7001":-1.1484849826733956,"7002":-0.25936880600712064,"7003":-0.22434286121302982,"7004":-1.7154056211232946,"7005":1.066944023891094,"7006":0.6040037961526165,"7007":2.1062695162243266,"7008":-1.0714043862018714,"7009":-0.021270982967932166,"7010":4.658296509931298,"7011":4.599313728122562,"7012":4.706752799979596,"7013":1.324449387385648,"7014":-0.24191308756704827,"7015":-1.7326341941174628,"7016":-1.8225780443345794,"7017":1.0670545362670094,"7018":-3.0240485766021656,"7019":-3.930459309697736,"7020":-1.5714021840248509,"7021":-1.663955983591244,"7022":-0.45140363795362753,"7023":-0.5470361657051072,"7024":0.8440406276491383,"7025":0.5478556412728909,"7026":0.7360646307585359,"7027":-0.024249242970458006,"7028":-0.38751887377624983,"7029":0.5417278232779665,"7030":-0.49095507750981415,"7031":1.1203685977850746,"7032":0.9454774516353538,"7033":0.04537296780188062,"7034":0.37421308282190957,"7035":0.6312575519856383,"7036":-0.04241780807846174,"7037":0.046938473510967575,"7038":-0.19480564546931306,"7039":0.4841862746799229,"7040":1.5490991455442578,"7041":-0.555142043897204,"7042":0.2991237032899458,"7043":1.689889894519427,"7044":-0.49456476620007395,"7045":0.529335138866283,"7046":0.8500226784137211,"7047":2.348989842280521,"7048":0.5213843692295053,"7049":-0.7412829585679119,"7050":-0.14239621104234712,"7051":0.3008398673111193,"7052":0.2879482661304796,"7053":-1.0794128099685059,"7054":-0.9504847383532427,"7055":0.317752001199556,"7056":0.5725055261888929,"7057":0.2647277854804749,"7058":2.0375988393776057,"7059":0.04124320668847467,"7060":0.2819051047987814,"7061":-0.36339119108410173,"7062":-0.19309264331536607,"7063":0.17761116630249954,"7064":0.1302605286624006,"7065":-1.4736395008016803,"7066":0.6610094121734308,"7067":0.06498094451158519,"7068":0.4863688190742555,"7069":1.45239161289528,"7070":1.2364678036774246,"7071":1.2426605269734357,"7072":1.1127751231676013,"7073":0.5295987425315279,"7074":0.9805338185891884,"7075":-0.38012851732177116,"7076":0.42754604921019584,"7077":1.1743779018019203,"7078":-0.6536555529845741,"7079":-0.3342397193997035,"7080":0.4384645914159308,"7081":2.066919368765345,"7082":2.001928568348542,"7083":0.1526895163448661,"7084":-2.3626453188484757,"7085":-2.217432850443458,"7086":-0.5296694116131194,"7087":-0.333291923981958,"7088":-1.536488337950489,"7089":0.9720474621535948,"7090":0.9171239773978118,"7091":-0.3096074506244995,"7092":3.3327754860627428,"7093":2.956646112069164,"7094":5.263206944473098,"7095":3.834495784272982,"7096":2.76288391611357,"7097":-0.09132386236501458,"7098":0.3470770912372555,"7099":0.008512087501008002,"7100":0.7432526014950869,"7101":-0.8097868750748829,"7102":-2.571898700596851,"7103":-1.276062213585817,"7104":-0.704728400518576,"7105":-0.4684990422415817,"7106":-0.22003122580659543,"7107":-0.9720602339671617,"7108":0.1372781243827356,"7109":-1.0553044766304365,"7110":0.8616933680067032,"7111":0.26697625431058253,"7112":0.3601525898279551,"7113":-1.044652538492632,"7114":0.41731693362518024,"7115":1.2417580521941607,"7116":0.05912324138612475,"7117":0.44605787613145664,"7118":0.29830489016496564,"7119":-1.0650984812245194,"7120":-0.5231473942842739,"7121":1.1028614147511864,"7122":-0.2136535965440588,"7123":0.07009667269847748,"7124":0.46754541180908654,"7125":1.769824323778,"7126":-0.7817655325493557,"7127":-0.6034602601163837,"7128":0.8883033284477473,"7129":0.47667932765280013,"7130":0.569188195808187,"7131":-0.41647931644235625,"7132":-0.8828801409186273,"7133":0.5413190391919693,"7134":-0.011511624904682508,"7135":-0.7618636755142956,"7136":0.6841785497567258,"7137":0.38717048428884976,"7138":-0.8602998946678132,"7139":0.18844401152188017,"7140":-0.2125449451029576,"7141":-1.2854221908390753,"7142":-1.2415223612861608,"7143":-0.6408590281927802,"7144":-0.4834654325712715,"7145":0.42031055995176964,"7146":-0.5882181020414927,"7147":-0.7991777718841548,"7148":-0.3255956445547053,"7149":0.37345648584163554,"7150":-0.4960073535130629,"7151":0.3617620651475346,"7152":-1.6877043354681764,"7153":-0.7025932177888476,"7154":2.5940306008338063,"7155":-0.5307156935399289,"7156":-0.9776235835896502,"7157":-0.9883396623564258,"7158":-0.12820328701170927,"7159":-0.3670860741272796,"7160":-0.6937096391116137,"7161":-0.5491052315943256,"7162":-2.2002461236893187,"7163":0.2616323367249656,"7164":0.06943659284948132,"7165":-0.8141515396506317,"7166":1.6443310198734404,"7167":-0.5897134010588531,"7168":0.7146830569053024,"7169":0.5891807325145644,"7170":0.37138758745882783,"7171":-0.0918530695275348,"7172":0.768848638240038,"7173":-1.101860225512425,"7174":-1.0666119422905969,"7175":-0.239267251225774,"7176":1.6210242712629634,"7177":0.06934119404324407,"7178":-0.5964956732880937,"7179":-0.35746999562084963,"7180":0.503779248690383,"7181":0.5735930944444546,"7182":-0.08056511800255346,"7183":-0.6240451064757405,"7184":2.5114757920172117,"7185":-1.4920248755433547,"7186":-0.9629210145764375,"7187":-1.1154820875197382,"7188":-0.5632686347894968,"7189":1.7197929565046197,"7190":-0.4718418487234287,"7191":-0.6641835381213559,"7192":1.134708334586225,"7193":-0.6217794383538856,"7194":-1.0968684674486822,"7195":0.13907535935147078,"7196":0.11684245650764959,"7197":-1.38789316150404,"7198":0.6666892445927736,"7199":-0.496044316147924,"7200":-1.4449693671916202,"7201":-0.6164611105702963,"7202":0.39795677802246004,"7203":-0.5599374256594056,"7204":-0.2608344755485627,"7205":-0.5894327442024656,"7206":-1.0248514716629615,"7207":0.007806743568534527,"7208":-0.86777917884726,"7209":-1.6909810658137818,"7210":-0.43577789052116134,"7211":-0.7277079951125934,"7212":-1.264830017751093,"7213":-0.5656772680401878,"7214":-0.8494559507723279,"7215":-0.8163047999682581,"7216":0.8324434323085697,"7217":0.6495104418270204,"7218":-0.08018664240209626,"7219":-0.13207289004412437,"7220":-0.40550971550814635,"7221":-0.5007521426548769,"7222":-0.6050326453480321,"7223":-1.0319407922691926,"7224":-1.0479023765047117,"7225":-1.7605965975525213,"7226":-0.21200188648224558,"7227":-0.17283341711919858,"7228":-0.6073218911394651,"7229":-1.0527729137090294,"7230":-0.08428866250986024,"7231":-1.0678791933332585,"7232":-0.9125901915625072,"7233":-1.7607746243945495,"7234":-0.3156900181377452,"7235":-0.9558357200634728,"7236":-0.5247863222354613,"7237":-1.274541865302613,"7238":-0.24777937669708938,"7239":-0.09577748024852087,"7240":-1.1318764277141458,"7241":-0.417775436227087,"7242":-0.297903959754122,"7243":0.75823491333416,"7244":0.3104867508558597,"7245":-0.14589260751566135,"7246":-1.1082481922799137,"7247":1.0615548076616808,"7248":0.9513150353363157,"7249":-1.0141366496142172,"7250":-1.9820215990931211,"7251":-1.034401296628754,"7252":0.9309356074246287,"7253":0.29199654542205017,"7254":-1.4508417213381863,"7255":-1.8031457673123656,"7256":-1.32517197020726,"7257":0.4928962226457881,"7258":-2.112691450783214,"7259":-1.6118215056739358,"7260":-0.1965302550763686,"7261":-0.3485463783961539,"7262":0.9051299481900702,"7263":1.2556107337391966,"7264":-0.15874716698311875,"7265":-0.10280442800879035,"7266":-0.9548695199580197,"7267":-1.2227975432720422,"7268":-2.394855536774129,"7269":-0.17768555660317165,"7270":-0.5492574614527829,"7271":0.8371806823768737,"7272":-0.2700506065716347,"7273":-0.3498817063961731,"7274":-1.0893422555618633,"7275":-0.30092532507447955,"7276":0.06100982198998738,"7277":-2.652130277684149,"7278":-0.9738718714891669,"7279":0.46267879960184133,"7280":-0.08262892456963725,"7281":0.0014388563730852193,"7282":-0.4393105642429949,"7283":-0.11176778561998033,"7284":0.1335731697221603,"7285":-0.6612076321870721,"7286":-2.14421942758752,"7287":-1.3495756899561142,"7288":0.16920143332385984,"7289":-1.8987099965888476,"7290":-0.5458162295846715,"7291":-0.9519720001005354,"7292":-0.22650980179978877,"7293":-1.584708488416799,"7294":-1.0117842614486117,"7295":-0.5033633085738975,"7296":-1.7395750205773461,"7297":-0.7452151633607158,"7298":-1.501240906209221,"7299":1.216264257253529,"7300":-0.44666598621144976,"7301":-1.5409845112431078,"7302":-0.9713946939718976,"7303":-0.3735827224292042,"7304":0.6863249181561015,"7305":-0.05547217902152527,"7306":-1.2907690841175867,"7307":-0.5186887927531967,"7308":-1.1079894594351591,"7309":-0.3752440637532409,"7310":-0.24148996312747073,"7311":-0.20063344071792416,"7312":-1.1194840615092914,"7313":0.5837464112817371,"7314":0.024564494607666864,"7315":0.8969013966011046,"7316":1.9887694541151864,"7317":1.1291986516211898,"7318":-0.5875540496212082,"7319":-0.8143649132750196,"7320":-2.102181537430261,"7321":-1.0824952198116453,"7322":-0.5300306573338609,"7323":-0.6914795089635006,"7324":-1.8712645880557794,"7325":0.9268463774908737,"7326":0.02023599990674481,"7327":-1.358776778251458,"7328":-2.712791228949359,"7329":-2.8340200585353448,"7330":-2.9135592325179474,"7331":-3.6883941816298034,"7332":-1.461292377926929,"7333":-0.7960685346978938,"7334":-0.03005556295873659,"7335":0.47820678479381185,"7336":0.2664649044902908,"7337":2.590653353638767,"7338":1.642430267691975,"7339":4.7519615475241235,"7340":1.5956696767996865,"7341":0.3650869800066086,"7342":-0.30541996049287945,"7343":0.619377973081487,"7344":-1.071353824828113,"7345":-0.5208946398675955,"7346":-0.42647756575073714,"7347":-0.14119601794832837,"7348":0.7944525983559462,"7349":1.8158672923726982,"7350":2.316515961983862,"7351":1.105619676382448,"7352":-0.18220784721591116,"7353":-0.23098517591275888,"7354":0.12010656823106243,"7355":-0.8230804539671243,"7356":1.139719125109184,"7357":-0.33372520722032606,"7358":-0.12924301794125181,"7359":-0.9743934962238511,"7360":-0.4481081394641007,"7361":-0.9898729592767386,"7362":-0.38179324803587744,"7363":-0.5653877240632884,"7364":0.8462276214448906,"7365":-0.3381716191644049,"7366":-1.0306853352031076,"7367":-0.2971559476838079,"7368":-1.1152960428596264,"7369":-1.4049678211336811,"7370":0.03397127194466653,"7371":0.42966855133092857,"7372":-2.8083412842757878,"7373":-0.10694888830717285,"7374":0.6383827564230906,"7375":0.3527163604843845,"7376":0.033120318572716446,"7377":-0.9652907542914072,"7378":-0.4078604348464233,"7379":0.1836738826281633,"7380":0.9694211408034564,"7381":-0.17068723143646763,"7382":0.27964240259021145,"7383":0.6380887793906219,"7384":-0.8030881528075062,"7385":0.010825547406466475,"7386":-0.1342618075962131,"7387":0.20383592616193819,"7388":0.5615892370011812,"7389":-0.6620375007354191,"7390":-0.5806451069472469,"7391":0.7287650644425243,"7392":-0.9261951340399359,"7393":0.3525410530624763,"7394":-0.6230790369307123,"7395":0.9026543621393567,"7396":-0.06656257744230025,"7397":1.5935256833475346,"7398":0.3410078702693971,"7399":0.36722608834332876,"7400":-0.3707268589485493,"7401":-1.458151742981377,"7402":-0.7804748138218196,"7403":0.27335904614639783,"7404":0.46674463838646757,"7405":0.27217030987673846,"7406":0.04420938235899748,"7407":-0.3415571591547661,"7408":-0.0974371425245259,"7409":0.09449061936898445,"7410":1.2515859893123173,"7411":2.0619548439490467,"7412":-0.4679635291398861,"7413":-0.21501950146006987,"7414":-0.17193192166749494,"7415":0.7486513423035175,"7416":-0.5488595977275648,"7417":-0.12507703230096914,"7418":-0.2878964205985506,"7419":-1.2802185538826727,"7420":-9.23192014938593,"7421":-5.668430397827416,"7422":-4.569376915005604,"7423":-1.588444227037729,"7424":-1.3088703509194897,"7425":0.7142505492872987,"7426":0.039865958287923976,"7427":-0.3691756126404292,"7428":2.8314069137400524,"7429":0.6655102309301555,"7430":-2.246112890529387,"7431":-2.078167202851833,"7432":-0.7642264885463748,"7433":-0.7946202273164152,"7434":0.7365193701686344,"7435":-0.8751600216959985,"7436":0.6209952271686459,"7437":-0.584164385021349,"7438":1.0608279478832876,"7439":-1.345265251982151,"7440":0.8336437820967242,"7441":0.8032251409300484,"7442":0.5888115577977729,"7443":0.13298320860400245,"7444":1.1630804764040128,"7445":-0.036696064514242975,"7446":0.7356461157379478,"7447":-0.17532136112482746,"7448":-1.171343876752492,"7449":-0.035687379011313976,"7450":1.9672145364665075,"7451":-0.3918361858056315,"7452":-0.9178126413806577,"7453":-0.518633614257422,"7454":1.3276940711002112,"7455":0.6013628562249352,"7456":-0.15435368745190603,"7457":0.39034679974992115,"7458":0.94540449560046,"7459":0.1358812480698558,"7460":-0.7661601886827973,"7461":0.13096189005759667,"7462":-0.2924439199702544,"7463":0.025734910746789203,"7464":0.2193540922218167,"7465":-0.25481112975792103,"7466":0.2651372903680804,"7467":-0.16341984883551805,"7468":0.13841045744719768,"7469":-1.598830754453353,"7470":-0.5828529509404864,"7471":-0.49270233943338465,"7472":-0.748430971972595,"7473":0.548269297618382,"7474":-0.6842413157007313,"7475":-0.3856268229289581,"7476":-0.34908358829048725,"7477":-0.6219832502413077,"7478":0.4564269514316095,"7479":0.27804817307983837,"7480":-0.10907753174439581,"7481":0.6479120375743139,"7482":0.22226893765188402,"7483":-0.18177526309590725,"7484":0.36949605773279404,"7485":-0.6263704659917854,"7486":0.15589554927543747,"7487":0.17540473957478026,"7488":-0.08312917787244056,"7489":-0.6143310393268877,"7490":-0.9237870210282427,"7491":-0.6812975537039965,"7492":0.37910430260196826,"7493":5.169385359084909,"7494":-0.38617265417754737,"7495":0.45293625340683463,"7496":-0.18064202196476753,"7497":0.4426290592720378,"7498":-0.5154022504505091,"7499":-0.35628997877210045,"7500":1.0884694707144993,"7501":1.2000155655309794,"7502":0.2977303490734496,"7503":5.911307283212025,"7504":-0.40382568755678244,"7505":0.2748231052781619,"7506":0.23384389488288443,"7507":0.14997060776875826,"7508":0.11266447619897936,"7509":-0.49574929212014374,"7510":-0.39325531919460677,"7511":3.767856793682666,"7512":0.9834300426712858,"7513":0.12744618689031598,"7514":0.2554600416820773,"7515":-0.8751438620517519,"7516":-0.17449484453429331,"7517":-0.83301598004164,"7518":-0.5848432370581613,"7519":-0.5807902619021883,"7520":-0.0404092622968121,"7521":-0.4922209495881417,"7522":-0.0816555491783033,"7523":-0.1240769297825639,"7524":-0.5620395412081306,"7525":-1.1328028122160303,"7526":-0.7881849236189729,"7527":0.16515734918450883,"7528":-0.7250130653161632,"7529":0.2861605947482598,"7530":-0.10539435061944499,"7531":0.29720911339912287,"7532":-0.27327620234901906,"7533":0.13720445623795138,"7534":-0.02657313211693083,"7535":-0.13500403197467023,"7536":-0.2810737482017696,"7537":-0.9555799788989723,"7538":0.21148389629940587,"7539":-0.938712773671785,"7540":-0.1290046408652713,"7541":-0.2953593867202466,"7542":-0.919336460767284,"7543":-0.838275921950159,"7544":0.061107458419854925,"7545":0.8266882195111181,"7546":-0.2665837477627199,"7547":1.0048007921227364,"7548":0.6752499232720763,"7549":0.3661687795267701,"7550":0.38621658788682667,"7551":0.048759272659755146,"7552":-0.06348954048428837,"7553":0.4534445267398943,"7554":0.36200617063878865,"7555":-1.5985550849879893,"7556":1.4223328245268783,"7557":0.5961769705116612,"7558":0.4140682198814408,"7559":0.7207249513855165,"7560":0.2937009627322703,"7561":0.5869660295417509,"7562":0.32129280941176735,"7563":-0.2203079001908428,"7564":-0.10107416518517721,"7565":0.7093177533389534,"7566":-0.08996487712745452,"7567":0.4905968502527425,"7568":-0.08633981757703221,"7569":0.04220737852132349,"7570":-0.01710413798564948,"7571":-0.4073083219996019,"7572":0.13530451371625818,"7573":-2.0432010478944074,"7574":0.7125618367886343,"7575":0.791207633640409,"7576":0.04916576399631216,"7577":0.1982389502631379,"7578":-0.2839522527540441,"7579":0.9721045456482151,"7580":0.33644030121910246,"7581":-0.5558376175059244,"7582":-1.5444242582213563,"7583":1.7242869451429084,"7584":-0.0014057120500927376,"7585":0.3880967123138732,"7586":0.044903132318098886,"7587":0.20890815888562328,"7588":-0.35195532727374496,"7589":0.3750876697655626,"7590":1.1323967891002111,"7591":-13.53501881810705,"7592":0.06948330520874378,"7593":0.6156131335077866,"7594":0.4241066217347449,"7595":0.5733548480443785,"7596":-0.19017844602481243,"7597":-0.17589382754291563,"7598":-0.347600776445144,"7599":0.7154637950566973,"7600":0.3407677000238826,"7601":1.0186241464838597,"7602":0.3773230361697101,"7603":-0.23619090492842099,"7604":0.5053336252674077,"7605":0.4047291987149748,"7606":0.6349060800508071,"7607":-0.712543077426265,"7608":-0.4823739750556726,"7609":0.798733762810278,"7610":0.3468183392628771,"7611":1.1759074988680063,"7612":0.8859100984158348,"7613":-0.1013353751708555,"7614":-0.27073203483646435,"7615":0.11408015557780261,"7616":-0.2482003327648718,"7617":-0.7953186282526737,"7618":-0.3253027963159709,"7619":0.5322308145574838,"7620":0.7484735098138243,"7621":0.25522659165641637,"7622":-0.21262033318435816,"7623":-0.17234112560667916,"7624":-0.6049488566523237,"7625":-0.0343188021884352,"7626":-0.17470227515041467,"7627":-1.0404859455509623,"7628":1.707547988802988,"7629":0.761188068935207,"7630":1.0783345661128674,"7631":1.1360378728188523,"7632":0.6961919037722865,"7633":-1.3079048483702587,"7634":1.1685453209625087,"7635":0.421034310423004,"7636":-0.9623847832867971,"7637":0.9277057285410167,"7638":-0.6113998586216398,"7639":-2.2069311463598877,"7640":0.11818346759631092,"7641":-0.4646353544728226,"7642":0.48386558753174747,"7643":0.18401014610315164,"7644":-1.0968474064840543,"7645":-0.040477688326996546,"7646":-0.29375836614326717,"7647":-0.5370819423036174,"7648":0.2811869679566168,"7649":-1.2938414359181456,"7650":1.0215143272935454,"7651":-0.37183635550137717,"7652":-0.3899544137909312,"7653":-1.4979054325947576,"7654":-0.6630187872003493,"7655":-0.07065624090612414,"7656":1.3707728115731277,"7657":3.9348201683523283,"7658":2.332264064516917,"7659":3.053715049162989,"7660":0.622321057838924,"7661":2.4817150363810705,"7662":-0.4368528474080145,"7663":-0.4365556076938785,"7664":-0.8262513276659327,"7665":1.1239984965285386,"7666":-1.1162804900271364,"7667":2.423935771842606,"7668":1.7575964845064282,"7669":-0.2853503696783091,"7670":1.4311042234828597,"7671":0.5308126660264262,"7672":0.07882552923696158,"7673":1.6175970869558982,"7674":-1.4291017638602288,"7675":-2.353692042986844,"7676":-2.692971923002478,"7677":1.0583410506344704,"7678":-1.7617974650544619,"7679":0.46398749621294394,"7680":0.04386929967841447,"7681":0.36530307952576774,"7682":0.4555144780879623,"7683":0.5437732909889272,"7684":1.1850824818167918,"7685":2.046316196287761,"7686":1.1845503838248528,"7687":-0.3756315027851897,"7688":-0.9874580086936361,"7689":2.697697534731414,"7690":-0.37202299328058563,"7691":-0.27951970900268386,"7692":0.3077369190796611,"7693":0.625191327494053,"7694":0.7862502193627828,"7695":0.6745530581778831,"7696":-1.6209780242046556,"7697":-0.798687137107621,"7698":-0.6525970545690571,"7699":1.0035747559054213,"7700":-0.9841626175808811,"7701":1.3799319177723819,"7702":0.15811647040493643,"7703":1.9432633706406182,"7704":1.9286971405964326,"7705":-0.13626264840031385,"7706":0.22747656227691704,"7707":0.5887972314054253,"7708":0.543662411175176,"7709":-0.40146231789081394,"7710":0.2577429104744013,"7711":0.2501650159807384,"7712":0.31342517953812715,"7713":-0.03967682810417905,"7714":0.18639238683090562,"7715":-0.20590141038562235,"7716":0.44522430478973024,"7717":0.22712867636080086,"7718":0.18645932372317056,"7719":1.1061034363477085,"7720":0.19233036456606992,"7721":-0.10290163865266329,"7722":0.1709046480409685,"7723":0.10940528419067921,"7724":-0.5338528310810389,"7725":-0.1555497013713271,"7726":0.6571773928326257,"7727":0.20101209940216208,"7728":1.0872144030290523,"7729":-0.037366507005167894,"7730":-0.25507367030949535,"7731":0.6320729151922891,"7732":0.40868904901721687,"7733":0.0716550601504833,"7734":-0.7612087514778765,"7735":0.5031081155643404,"7736":0.06828436267438794,"7737":0.4961263895378175,"7738":-0.11002980453426388,"7739":-1.2386079853882768,"7740":0.580801642188822,"7741":-0.4833263444407618,"7742":0.03276490068128781,"7743":-0.2569049944339032,"7744":-0.46923159007361115,"7745":0.05599499103071673,"7746":-0.2255997709228281,"7747":-3.032108923264038,"7748":0.38839575832903966,"7749":-0.953190515490115,"7750":0.3568131079135306,"7751":-0.26810412028845243,"7752":0.6670705680170023,"7753":-0.4709470816697639,"7754":-0.4454165865397431,"7755":-2.7388497655275215,"7756":-9.191471471802005,"7757":0.059867756348977334,"7758":1.6512761594558305,"7759":0.08849752358307857,"7760":0.6097445548047218,"7761":-0.4911680165441714,"7762":-0.701734690425204,"7763":-0.10172975754115343,"7764":-3.4180592265410676,"7765":-2.5225614468307427,"7766":-0.9933023240490834,"7767":0.5805027507103091,"7768":-0.721271813977718,"7769":0.20005763149056657,"7770":0.6027190174671025,"7771":0.5661993615403812,"7772":0.3615850208749747,"7773":-0.11661513028286596,"7774":-0.4554073092586471,"7775":-0.36534765395293,"7776":-0.03134421860358998,"7777":-0.24416090248854208,"7778":0.6127247334957118,"7779":0.5473229955047229,"7780":-0.04068411106377922,"7781":0.9738412998339647,"7782":0.0038420714362177645,"7783":-0.22236284210886653,"7784":-0.18091928794176693,"7785":0.5664057574831399,"7786":0.24494794718517135,"7787":-0.4450028001637407,"7788":-0.5383339875790181,"7789":1.1675690530565048,"7790":0.3493190883556071,"7791":0.4847823081737669,"7792":-0.7117361559946664,"7793":0.841290735901228,"7794":0.11408399256750491,"7795":-1.4450762070329404,"7796":-0.2350974501203993,"7797":0.8753427106116627,"7798":0.20983290349897465,"7799":0.3330924862830518,"7800":-0.6041747746161579,"7801":0.21125979424492858,"7802":0.09123866907611111,"7803":-0.9498377420457947,"7804":0.37995737112108124,"7805":-0.26804258466347064,"7806":0.4131142357694403,"7807":-0.7042737840815849,"7808":0.006946520416504531,"7809":0.29356389976969965,"7810":-0.5239846107746984,"7811":0.06544639365223412,"7812":0.7647041144955176,"7813":-1.0189283711867902,"7814":1.0473724334802106,"7815":-0.0850054798317766,"7816":0.11350682643298828,"7817":0.3144179015855353,"7818":0.305606098631106,"7819":0.19067858988047764,"7820":0.5493587857483121,"7821":0.2123837397995635,"7822":0.7767350007220177,"7823":-1.2922974093953252,"7824":-0.47173684577121106,"7825":-1.508990167337758,"7826":-0.6290313745156471,"7827":1.174398091252882,"7828":0.042333401411659456,"7829":-0.6596358818243937,"7830":-7.391017639302028,"7831":-9.484065105869629,"7832":-4.985767073251892,"7833":-2.5116080468622863,"7834":-0.6816282433525731,"7835":-1.1221883483688933,"7836":-1.14570727199196,"7837":-0.7290320844836974,"7838":-0.09015311585323998,"7839":4.399265359255977,"7840":1.7201673553643777,"7841":0.6132988309336728,"7842":-0.742006585478571,"7843":-1.2590545594172127,"7844":0.30066952467155655,"7845":0.6721507036101791,"7846":0.5970463826086088,"7847":-0.8082673260402922,"7848":0.025354690439999383,"7849":0.022981588051865964,"7850":-0.5991806525064138,"7851":0.6741283046197378,"7852":0.4562271052022163,"7853":1.298319553936541,"7854":-0.12382128553866072,"7855":0.4943348482686788,"7856":0.23290825494549638,"7857":-0.9656698823597192,"7858":1.3257738494013505,"7859":-0.27013713810352974,"7860":-0.3609923994622075,"7861":0.6097259255920329,"7862":0.599180915600088,"7863":-0.23407675898325878,"7864":-0.3074801593196298,"7865":1.155225571301934,"7866":1.2949536645284265,"7867":-0.48729712366379435,"7868":-0.6202238216848813,"7869":0.6008869274051755,"7870":-0.8238380989241028,"7871":-0.31694177094423465,"7872":-0.7959100351890354,"7873":0.3129416240375756,"7874":1.1916604650274356,"7875":0.3044483004959572,"7876":1.1280021033937258,"7877":0.47587414108480836,"7878":-0.7613631949537749,"7879":0.6173694403436754,"7880":0.1899277549754409,"7881":-1.108767767975956,"7882":-0.40819508565506013,"7883":-0.24019855549844252,"7884":0.9360628517294729,"7885":0.33418689483075187,"7886":-0.6505495398402423,"7887":0.090599434110922,"7888":-1.4607040507250353,"7889":0.16960558777215345,"7890":-0.27053762017029154,"7891":-0.9255847271629627,"7892":-0.9667370407392002,"7893":-0.6815776420069087,"7894":-0.1112379769110965,"7895":-0.289711070501448,"7896":0.47736248637031536,"7897":-0.2842900526155331,"7898":0.2077748098615021,"7899":1.2627713800975318,"7900":-0.393593294552183,"7901":-1.3894045953698646,"7902":1.9136662315783157,"7903":1.0900908868889134,"7904":-0.13957037760684465,"7905":1.4736598202127928,"7906":0.10230955362193397,"7907":-0.5073299270892013,"7908":1.0258747664664545,"7909":-0.4748283151247077,"7910":0.4391569731887835,"7911":1.4021593296502028,"7912":8.774635143504701,"7913":-0.19887865542333,"7914":0.05159889298223668,"7915":-0.6851728743590098,"7916":-2.6801706594798445,"7917":0.44950321801856197,"7918":-0.5939446149503108,"7919":2.12501730543573,"7920":1.2346562773598277,"7921":2.1020000745762455,"7922":-0.1262727843349759,"7923":-0.0002527136395836613,"7924":0.5855452373582526,"7925":0.8236470439882244,"7926":-0.5560796432910052,"7927":0.7731915358636696,"7928":-1.028331191952433,"7929":1.1464915358028696,"7930":0.1795591429164387,"7931":0.9458692961521935,"7932":-0.9410293570491164,"7933":1.3847466829871455,"7934":-0.9351180142218197,"7935":-1.5589513966425443,"7936":-1.908718495992663,"7937":-0.1782972899503259,"7938":-0.4895210288991392,"7939":-0.6852145992962623,"7940":-0.1346591651174625,"7941":-0.7685584172896478,"7942":1.2694060584640292,"7943":-0.04874892496580811,"7944":-0.48914391979522376,"7945":-0.46115097568754937,"7946":-0.8305005240157771,"7947":-0.8103583203723934,"7948":-0.4504211851947025,"7949":-0.9902416101157924,"7950":-1.1563855982530367,"7951":1.1863634841050061,"7952":0.20751596469213032,"7953":-0.9357122402619027,"7954":-1.000074924468846,"7955":-0.2839254868932011,"7956":0.07275963544883322,"7957":0.46502404167184985,"7958":-0.47999087876893737,"7959":-1.41052062108264,"7960":-0.2702608027574165,"7961":-0.48975683605299725,"7962":1.2276297045839506,"7963":0.25013251301879746,"7964":-0.254963654724164,"7965":0.16006544014099217,"7966":0.4364486713775669,"7967":-0.3638396759638064,"7968":-0.22370816111738603,"7969":0.5616454566247941,"7970":-0.02856859500452663,"7971":0.752336729584662,"7972":0.6215070452600107,"7973":-0.16734757736796865,"7974":0.4311215363698157,"7975":0.7302873055657638,"7976":-0.7064252152237267,"7977":0.881306030088836,"7978":0.5698524744002988,"7979":0.6113396607998939,"7980":-0.9665050942001946,"7981":-0.0867426083011771,"7982":0.019604706148630906,"7983":2.278739664922326,"7984":0.3827824237925507,"7985":0.16600603494750404,"7986":0.2973378436238429,"7987":0.5576611402714392,"7988":-1.2491380601277056,"7989":1.3714364403266552,"7990":2.2149133163927663,"7991":-6.854085085694519,"7992":-3.723353767044368,"7993":3.3041299696893427,"7994":-1.3805141428365653,"7995":0.7032155060224794,"7996":-1.4990593781995958,"7997":-1.0323708134333152,"7998":1.1245599351529354,"7999":-0.6762954346105143,"8000":0.05798957318416339,"8001":0.6899391047468503,"8002":-0.3789861400457158,"8003":2.0074266991068126,"8004":0.9683628394429038,"8005":0.050219526558015815,"8006":-1.1212563692005915,"8007":0.27489702721431497,"8008":1.4474455409887699,"8009":-0.8056110246024314,"8010":-0.40316875544684366,"8011":0.19242021748012578,"8012":1.1234070297814744,"8013":-0.9103083351060987,"8014":-1.676253581479608,"8015":-0.9180653325631827,"8016":-0.6646222109265364,"8017":-0.07037595584899084,"8018":2.1337598035429575,"8019":2.0612259915213205,"8020":-0.43806160449716625,"8021":-0.014865733160367732,"8022":0.2403040175836655,"8023":-0.36339728967214435,"8024":0.6614610992143498,"8025":0.42638239920888743,"8026":0.15467097425046478,"8027":0.8532133889446858,"8028":0.3543443442360934,"8029":0.405941075984842,"8030":-0.19525762908750594,"8031":0.6070097050163481,"8032":0.07160266358620765,"8033":-0.4041006118913115,"8034":0.08956107879476169,"8035":-1.0540540285581244,"8036":0.13234668385599943,"8037":-0.3685689887172993,"8038":0.4874296889290585,"8039":-0.8612710633261308,"8040":1.1715272916272306,"8041":-1.6581210169718303,"8042":-0.5559318545157647,"8043":1.6938139601190274,"8044":-0.2436583063164975,"8045":0.5348767326442567,"8046":0.3149959236843737,"8047":-0.7079324240037079,"8048":0.3409948549320183,"8049":0.20425146825022106,"8050":0.7455967709542329,"8051":0.9348686084225551,"8052":-0.0370007058597919,"8053":-0.21110834946549042,"8054":1.5409425551633795,"8055":-1.0065069256768702,"8056":0.3346347035827203,"8057":-0.7630281737013073,"8058":0.1435240967856639,"8059":-1.821811366410375,"8060":0.4883837540015263,"8061":-0.4073248682651235,"8062":-0.507229088941531,"8063":0.5769221298946952,"8064":-1.6361273073491531,"8065":0.13124185752568326,"8066":0.0300067022244514,"8067":0.03910708218097258,"8068":0.09647646585372084,"8069":1.3112773903211508,"8070":-0.13681760234881873,"8071":1.0678340069745296,"8072":0.10438806198701357,"8073":-0.20206475179942945,"8074":-1.20062111377256,"8075":-3.8597163823339455,"8076":-1.323578632290356,"8077":-0.19382433833518237,"8078":0.09305834739893092,"8079":-1.0452350251236393,"8080":0.41198319902756386,"8081":0.3353466309630068,"8082":1.9277166010611713,"8083":4.278371147489286,"8084":5.961014080696387,"8085":6.235749528303129,"8086":1.216259376483234,"8087":1.2418237371389342,"8088":1.56199310286896,"8089":0.2672118378568448,"8090":0.18230931701588085,"8091":2.588927922810599,"8092":0.5237742163055342,"8093":2.7879259389520143,"8094":2.0707393850221183,"8095":1.8431155549877598,"8096":-0.3889858070431826,"8097":0.5281330139216196,"8098":-0.11461011635106612,"8099":-1.1711873470509027,"8100":-1.122757688904421,"8101":-0.49643491803897055,"8102":-0.2813845202539115,"8103":-0.7805349867674337,"8104":-0.28549628347578554,"8105":-0.059499328596212375,"8106":-0.6507251154625476,"8107":0.2789642181721182,"8108":-0.30089474210492323,"8109":0.3362180935811649,"8110":-0.19028002484547946,"8111":1.379368511092096,"8112":-0.15936677104463504,"8113":1.0701811816580278,"8114":-1.2376029640746493,"8115":-0.4540957856364643,"8116":-1.2296029789440344,"8117":-0.998519194719431,"8118":0.3354079262496564,"8119":0.8683613490748155,"8120":-0.1682317452354837,"8121":-0.6132362427924489,"8122":-0.1251499374591861,"8123":0.13986051571672445,"8124":1.5520316745668856,"8125":0.8764477499803621,"8126":1.0954292034760864,"8127":0.12869721058677236,"8128":-0.9642325096984025,"8129":2.2258055873954707,"8130":-0.23941490829551743,"8131":-1.9266002342032162,"8132":0.2846781790627139,"8133":-0.6007930071430473,"8134":-0.3542881345910443,"8135":-0.668512777960165,"8136":1.4138315691940109,"8137":0.8939690389975774,"8138":0.4362787217361645,"8139":-0.40649333300959384,"8140":0.4247945182288574,"8141":1.7898791227130786,"8142":-0.01941573078035442,"8143":1.132409123337323,"8144":0.7179580319818517,"8145":1.4551614363242862,"8146":0.14008188283619255,"8147":-0.6160188110281487,"8148":-2.568704550148519,"8149":-0.9538768054354845,"8150":-0.5645730523225531,"8151":1.07984859153165,"8152":0.454587743874572,"8153":0.9578541488038232,"8154":-0.7897303964450366,"8155":-0.1435626096044529,"8156":-0.08902129851361229,"8157":-2.7611531215173204,"8158":-5.951468541307216,"8159":-1.9956397332847005,"8160":-0.04757161958755813,"8161":-0.7048049770729912,"8162":1.2074867225619645,"8163":0.5371783076058738,"8164":-0.2721937435718913,"8165":1.4067736644807873,"8166":-0.6515704106048664,"8167":-1.8941960445697639,"8168":-1.100345184011724,"8169":-0.8067501425100146,"8170":1.8828718303938627,"8171":0.5953416528042913,"8172":1.9840380037469132,"8173":0.25336157451793345,"8174":-1.9847351564233722,"8175":0.8699875068417015,"8176":-1.4364240682918492,"8177":1.326129141693434,"8178":1.8375731244845934,"8179":0.5130119540647976,"8180":-0.10209646755663888,"8181":-1.2012444597419845,"8182":-0.03628673628043236,"8183":0.05925338156416166,"8184":-0.8046086618584488,"8185":-0.36174156156294807,"8186":0.8248121793985006,"8187":0.5460244171990347,"8188":-0.6844175908828314,"8189":-0.41964187410876647,"8190":1.4738112304235833,"8191":-2.665947655001035,"8192":-0.5658825682753474,"8193":-0.7666784466708362,"8194":-0.16839468841131794,"8195":-0.42512080159367027,"8196":-0.08116479579840283,"8197":0.44100850975702516,"8198":-0.4409526056986809,"8199":1.1791367708856633}},"b1":{"n":100,"d":1,"w":{"0":-0.4053588131677489,"1":1.0896102471085827,"2":1.483841306097462,"3":6.4255936200018695,"4":-1.5231190833858672,"5":3.274704479265822,"6":-5.076144444236348,"7":-0.7611685808226292,"8":-2.355529313925603,"9":-11.698557130511984,"10":1.5878603568986789,"11":-1.0903547455071227,"12":2.2243945746413574,"13":1.8902873617713813,"14":0.9046812071841811,"15":2.2145373033180595,"16":1.2338861412634092,"17":1.126295326866145,"18":0.2653802293486913,"19":6.827629569977284,"20":5.4237559148720305,"21":-0.23505274865301248,"22":2.5544334883312496,"23":-1.509413372813204,"24":1.8592491448744297,"25":-2.430007978680502,"26":2.0224092299186194,"27":-2.2201143409755786,"28":-3.1494947822425696,"29":-0.30553082591216746,"30":-4.381999957929462,"31":-2.813802168267483,"32":-7.105623315280843,"33":-2.7807273835973674,"34":1.6883492812473457,"35":-15.682481904656566,"36":2.0494143650831207,"37":2.69789859556487,"38":-3.4689315101949814,"39":-0.47043301246950125,"40":-2.752206784546982,"41":12.320082927852397,"42":3.485930202548325,"43":0.6083849798337154,"44":3.1071525436901615,"45":0.8216250105630062,"46":-2.5336328559963706,"47":-0.1755799959077983,"48":-3.646425174534257,"49":-2.5890234520461597,"50":0.5494685064191831,"51":1.1130950628926541,"52":6.570776648313593,"53":-4.3261588160525255,"54":2.7217826594333365,"55":-1.429868373636695,"56":-2.6396007332026743,"57":0.07732687998495151,"58":4.2847697050317874,"59":-3.3629731008504313,"60":-0.4742996758803162,"61":-1.3494984369339031,"62":-3.501129922318981,"63":-1.7145382595792837,"64":-2.8182310099898795,"65":-0.9648575200247957,"66":-0.38466903065702773,"67":0.39881181242421077,"68":-0.5324515978629752,"69":-0.43107518078742224,"70":2.1685676846795476,"71":-4.037542827620443,"72":-3.5088087648246886,"73":-0.22514174132811768,"74":4.727829972120202,"75":3.1767580692394732,"76":-1.0202848913678766,"77":-7.404782246682662,"78":-2.677565333968413,"79":-3.6580028980121084,"80":-4.215320129931376,"81":1.0059257738969913,"82":-3.7173324333451356,"83":1.3014539624605668,"84":-0.08978149344543812,"85":-1.6347116652892761,"86":-0.7467342294256509,"87":0.2576999462976582,"88":3.7755524364176605,"89":1.6975061419769735,"90":2.164494857272234,"91":-6.419860718549469,"92":1.1407802291598084,"93":-3.6903312516396953,"94":8.116993221032669,"95":0.7060452332635074,"96":-7.2747340841255275,"97":-0.27446827598374435,"98":-3.1478029578216637,"99":4.632111093137485}},"W2":{"n":4,"d":100,"w":{"0":-0.37369150418098757,"1":0.3255076928589351,"2":-0.39054523471356684,"3":0.843282409494277,"4":0.4700776607726591,"5":-0.14487140195491935,"6":0.19057146415741327,"7":-0.3164841665546562,"8":0.8134316389145818,"9":0.033445225376311255,"10":0.0836305197042759,"11":0.575119054692434,"12":5.520460271305619,"13":-0.2576301409468558,"14":0.2578526223464178,"15":0.6502061947183757,"16":2.557849519043908,"17":2.595283917702265,"18":-0.22516959612227144,"19":-0.7625270123938156,"20":0.646754390278404,"21":-0.2069359826147244,"22":0.6295818509473051,"23":-0.014101422555669305,"24":-0.15627225880308723,"25":-1.4144208738469544,"26":-0.42721986847405213,"27":0.40671446939794725,"28":-0.29175146653482675,"29":0.29733420686401646,"30":-0.1887213415431654,"31":-0.36219057873609495,"32":-0.17010880624988983,"33":-2.951469833926093,"34":0.6896439728312669,"35":0.2922819741324025,"36":0.4589152195829955,"37":0.0029277488214919712,"38":-0.23422380659623993,"39":-1.450391035383189,"40":-0.17011190255065314,"41":0.9199415201672401,"42":-0.29854971043115736,"43":0.7218172841660552,"44":-0.5901945871699923,"45":-0.26314955076863206,"46":0.5187636189762991,"47":0.06289960049944111,"48":-0.31614970003076004,"49":0.48976104391808706,"50":-0.3198146903585793,"51":-0.20439716302565067,"52":0.15297414868084516,"53":0.6142369428727167,"54":0.3518982005363621,"55":-0.7983578190156494,"56":-0.5890110657294392,"57":0.7697948760884541,"58":0.27784044394429586,"59":0.40419385000621333,"60":-0.712555220305905,"61":2.312864980684418,"62":-0.12563742334127959,"63":-1.4928252872917096,"64":1.087122474586116,"65":-0.7807667483189836,"66":0.5189201290187588,"67":-0.6380761029568326,"68":0.32942737241777054,"69":-0.4689085296874264,"70":0.7191284602318527,"71":-0.2390216146933169,"72":-0.13938849410508902,"73":-3.3049878656308542,"74":-0.38516700453840946,"75":-0.05279716957900131,"76":0.09852913599381176,"77":-0.7600846691254955,"78":-0.07360721979067106,"79":-0.2626579242636426,"80":0.07709944996818931,"81":-1.187567602377084,"82":-1.3543474527941404,"83":-0.8825250214311787,"84":0.29801097463979875,"85":-0.5992798222707237,"86":-0.7264017463026401,"87":1.792238554905015,"88":0.40373186995521215,"89":0.8194054145185427,"90":0.9054464342159073,"91":0.32722668142989647,"92":-0.38002413361705084,"93":1.0085628573889522,"94":0.19135933083435216,"95":0.0491051642058709,"96":-0.6924574807912459,"97":1.9040864911989677,"98":-0.6790660056679124,"99":-0.5033414462388904,"100":-0.350587248583131,"101":-0.22517542744218255,"102":-0.05091927338395076,"103":0.7649609940728551,"104":0.22747076435480534,"105":-1.4898969962094681,"106":0.17144441345782147,"107":-3.481661062278977,"108":0.14625087098059758,"109":-2.890283095165481,"110":-0.21286628869988233,"111":-0.31774660574636915,"112":-0.08549716056335577,"113":0.3010491729371251,"114":-0.5753893606109362,"115":0.22608517142579743,"116":0.37407508413570273,"117":0.5104233731041254,"118":3.491350124825387,"119":0.47454030907055916,"120":-1.1137715350300237,"121":-0.05506573187978808,"122":-0.13340061731704306,"123":-0.09008781827599595,"124":0.25182556209258383,"125":0.016290054051863498,"126":0.0181958235134759,"127":0.08513646804795585,"128":-0.7946265255380065,"129":-0.6239976006508384,"130":-0.396889469032853,"131":-0.2553181371540528,"132":-0.4967751139250235,"133":-0.1715751396670675,"134":6.498305826737605,"135":-1.0423503137980419,"136":1.3589667624579544,"137":0.33092115298453423,"138":-0.8527934300364022,"139":-2.2526199878106086,"140":-0.8749560303408952,"141":0.12430108819390778,"142":-0.5242874812158435,"143":1.2566838096144963,"144":-0.5480346592942674,"145":-0.42950847566169925,"146":0.13718988624627196,"147":0.3684941705979134,"148":-0.425493118890539,"149":0.16902433222427446,"150":0.44913490399159556,"151":0.19830933541907386,"152":0.38751714265837617,"153":0.41483355757388074,"154":0.21598977123368893,"155":-0.07307604014002815,"156":-0.8136963137832863,"157":0.32894100914278557,"158":0.693743587240694,"159":0.47264466351998163,"160":0.3128885135326578,"161":-2.0652735063986922,"162":0.8645219063231415,"163":-0.8328572963338668,"164":0.5236406963522053,"165":-0.27211590912000966,"166":0.8584332188915874,"167":-0.26163503460448234,"168":0.4019429688676708,"169":0.664394320895487,"170":0.34414237467044445,"171":-0.033612729828287446,"172":-0.4447102753418429,"173":-0.4616861340028039,"174":-0.03782358708796755,"175":0.2021285900530201,"176":-0.43838473822733,"177":-0.4053931555084107,"178":-0.2533304419439156,"179":-0.297230726727687,"180":-0.4443459245687387,"181":-2.0481275293810985,"182":-1.6357133813205675,"183":-1.316018362051942,"184":0.2421988871177044,"185":0.08185552499518821,"186":-0.2889967535544271,"187":1.7062510557358426,"188":-0.8004863987946159,"189":0.5971225091046265,"190":0.45784155378928953,"191":-0.12176620202301905,"192":-1.347021367233403,"193":-0.25914291040064114,"194":0.012711046054238655,"195":-0.11791393136474061,"196":-0.07357727045617254,"197":-0.22308800772057052,"198":-0.20147084097290818,"199":0.05727655490493064,"200":-0.11024857832781264,"201":0.32745669714565395,"202":-0.5691323861998104,"203":0.3293562075989536,"204":0.564637254886575,"205":-0.5548579397379363,"206":1.6654387102383235,"207":-3.935663629086472,"208":-2.5998148485912846,"209":-0.03663410340855059,"210":0.6333351894102981,"211":0.8469273894937109,"212":-0.15609393389388476,"213":-0.2191016655216052,"214":0.07069936671107258,"215":0.07817518946525369,"216":2.9677533556382403,"217":2.6575789148946454,"218":2.5931309713755035,"219":-1.618231270195545,"220":0.367949258222967,"221":-0.11823626447140123,"222":-0.02872615820735579,"223":-0.1871003519851795,"224":0.2618633808119028,"225":-0.5458738060597815,"226":0.31186437550740165,"227":-0.47370757148729625,"228":0.03858978110133535,"229":-0.2002802106013331,"230":0.04801014577929008,"231":-0.3127021300313224,"232":-0.35654340115696304,"233":-8.573770523382837,"234":-0.01666621741112289,"235":-2.01167276171224,"236":-0.1840460907128887,"237":0.5000419632991454,"238":-0.13162425417770066,"239":-2.721525892694247,"240":-0.4053267484002888,"241":1.1237808669545912,"242":-0.45453575886026365,"243":-1.753939139177192,"244":0.4459312318600051,"245":-0.7457868101849746,"246":0.44115155710711984,"247":-0.3527410631452994,"248":-0.18819511230548247,"249":1.1114294385538033,"250":-0.17455513965977518,"251":0.5669193758652612,"252":0.49834034045646813,"253":1.1049334585183566,"254":0.48042730817334445,"255":-0.10664179465855501,"256":-0.12209582837373435,"257":0.18449754571122104,"258":0.2813801597624903,"259":-0.43921538994629256,"260":-0.35386571693161234,"261":-2.3221328524887994,"262":-0.1561375550209527,"263":-1.899283105262074,"264":0.8027708202981017,"265":-0.38507594643012083,"266":-0.42222620774781344,"267":-0.3919000165864636,"268":0.24287351032888724,"269":1.1233391742523666,"270":0.21415013035338196,"271":-0.14035989054417097,"272":-0.07415641546654551,"273":-0.24940200668663814,"274":0.5329708592991454,"275":0.36319007152503374,"276":-0.45957724960766994,"277":-0.7741082863209007,"278":0.20218204054892483,"279":-0.3498112724475493,"280":-0.06818212861896494,"281":2.6391504567667576,"282":-0.12559290883189125,"283":-0.8708270376647939,"284":0.5492514586101516,"285":-0.4109322204235108,"286":-0.6627244454048626,"287":-0.9409964398456496,"288":-0.3447378746320269,"289":0.45392255096363704,"290":0.6266761417896928,"291":-1.0096814424747849,"292":0.015898159816774463,"293":-0.005708900968504741,"294":-0.013434957717383922,"295":0.7325053441952081,"296":-0.6555208917611159,"297":0.03082836246108208,"298":-0.14117009972371614,"299":-0.043743710377192525,"300":-0.054634703231186535,"301":0.13540493003267345,"302":0.3560739764666456,"303":0.8074184880183961,"304":1.6960380592581972,"305":-0.20840261064982088,"306":-0.3068835038800586,"307":-1.2537607317686408,"308":-1.6180570789754658,"309":0.12913302252395573,"310":0.14683544481032365,"311":0.544256249781409,"312":-0.14223949913945316,"313":0.0415672254418623,"314":0.47153488667406807,"315":0.24788939933128518,"316":4.096489718541436,"317":1.5987711264898177,"318":1.233208051781353,"319":-0.8373204910540404,"320":0.20852825670369868,"321":-0.7764092053992289,"322":2.044778765264558,"323":0.48281823996519374,"324":0.694275758631068,"325":-0.07466073120125565,"326":0.32824427744759355,"327":0.6493929597064313,"328":-0.34333342890976726,"329":-0.2700107446898056,"330":-0.7605314019536926,"331":-0.3043192265653302,"332":0.43794896250806836,"333":-1.3227525955949389,"334":0.3545053650452413,"335":-0.2723128888330297,"336":-0.22211638390513902,"337":0.5497085672630951,"338":-0.09370818885399172,"339":-1.2181003461926136,"340":-0.26325761780262025,"341":0.7292096616373337,"342":-0.4708809364421218,"343":-1.0664680860459752,"344":0.6006364401534151,"345":-0.08817775279617163,"346":0.33755490197502946,"347":-0.12331858538237293,"348":-0.5232066835321882,"349":0.23133670269091236,"350":-0.24127715449230064,"351":-0.5139647163184705,"352":0.2499368192319165,"353":0.35407770815772066,"354":-0.13014427679598833,"355":0.6168842728390582,"356":-0.13438024784524535,"357":0.6716326342440371,"358":0.5273429827062036,"359":-0.06520080571950454,"360":0.2082795406211416,"361":-0.9083079657917742,"362":-0.5878168687092982,"363":-0.5190865572290893,"364":-0.011481975302371734,"365":0.9321816203828852,"366":-0.08237570707866265,"367":-0.6400206876753273,"368":0.562553575510507,"369":0.12171542510800883,"370":0.16085347489200516,"371":-0.3580805486313321,"372":-0.0853324022890459,"373":-0.166732235167927,"374":0.3851078647200429,"375":0.033523249615378135,"376":-0.3954544691055454,"377":-0.41138830744469657,"378":-0.41767661249607635,"379":-0.2973879646910002,"380":0.30153429390263226,"381":-2.2773401353006006,"382":-3.9994015361159265,"383":-1.1964313077207387,"384":0.4995058402873546,"385":0.19565360006535995,"386":-0.9302974190066801,"387":-0.9268306205240385,"388":-0.9811742869142452,"389":-0.5220430862376455,"390":0.35415851850440905,"391":-0.15879115053984347,"392":4.155668099521442,"393":-0.0042716786591516466,"394":2.1351051242066026,"395":-0.37736884611224886,"396":-0.06585411307213465,"397":-0.01973808712246017,"398":-0.944365704958504,"399":0.05754259161159456}},"b2":{"n":4,"d":1,"w":{"0":-0.7817411297859516,"1":-1.9951275093802991,"2":-1.4409253595569298,"3":-0.6340581220392826}}}}
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