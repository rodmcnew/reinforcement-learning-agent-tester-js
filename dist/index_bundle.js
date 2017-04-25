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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AgentObservation__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__generateInitialState__ = __webpack_require__(35);



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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DQNAgent__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(7);

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

let currentAgent; //@TODO WARNING IS HUGE HACK

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

    document.getElementById('dump-agent-internal-data').addEventListener('click', ()=> {
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
        document.getElementById('q-learning-data').innerHTML = JSON.stringify(currentAgent.toJSON());
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
            actionElements[i].innerHTML = fixedValue;
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
        // create the DQN agent
        var spec = {alpha: 0.01}; // see full options on DQN page
        this._agent = new __WEBPACK_IMPORTED_MODULE_0__DQNAgent__["a" /* DQNAgent */](numberOfStates, 4, spec);
        if (typeof previousSavedData !== 'undefined') {
            this._agent.fromJSON(previousSavedData);
        }

        this._learningEnabled = learningEnabled;
    }

    getAction(state, reward) {
        currentAgent = this._agent;

        if (this._learningEnabled) {
            if (reward !== null) {
                this._agent.learn(reward);
                if (__WEBPACK_IMPORTED_MODULE_1__index__["userSettings"].renderingEnabled) {
                    renderReward(reward)
                }
            }
        }
        let actionResponse = this._agent.act(state);

        if (__WEBPACK_IMPORTED_MODULE_1__index__["userSettings"].renderingEnabled) {
            renderActionResponse(actionResponse);
        }

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

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
	fixUrls = __webpack_require__(26);

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderer_HtmlTableRenderer__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agent_ColumnCompare__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agent_LookAheadWide__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agent_LookAheadWideAndDeep__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agent_AlwaysDown__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agent_RL_DQN_5X5TrimmedViewport_InLearningMode__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agent_BarelyLookAhead__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__agent_RL_DQN_5X5TrimmedViewport_PreTrained__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__agent_RL_DQN_InLearningMode__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__agent_RL_DQN_PreTrained__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__GameRunner__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__style_css__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__style_css__);













// import ReinforcementLearnerDeepQNetworkPreTrained from './agent/ReinforcementLearnerDeepQNetworkPreTrained'


const userSettings = {
    renderingEnabled: true
};
/* harmony export (immutable) */ __webpack_exports__["userSettings"] = userSettings;


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
    if (newEnableRenderingValue != userSettings.renderingEnabled) {
        userSettings.renderingEnabled = newEnableRenderingValue;
        newGame();
    }
    setupInterval();
});

function setupInterval() {
    clearInterval(intervalReference);
    if (autoPlay) {
        if (userSettings.renderingEnabled) {
            intervalReference = setInterval(gameRunner.tick, speed);
        } else {
            //Normal ticking takes 3ms between ticks which is not fast enough, so tick 100 times
            intervalReference = setInterval(function () {
                for (let i = 0; i < 200; i++) {
                    gameRunner.tick();
                }
            }, 0);
        }
    }
}

document.body.addEventListener('keydown', function (event) {
    gameRunner.takeAction(event.key);
    // if (userSettings.renderingEnabled) {
    //     const agentObservation = environment.getAgentObservation();
    //     renderer.render(agentObservation, environment.getGodObservation());
    // }
});

function newGame() {
    gameRunner.newGame(agents[currentAgentName], userSettings.renderingEnabled);
}

newGame();
setupInterval();


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
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
/* 9 */
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
        this._renderingEnabled = false;
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
            this._stats.scoreSum += this._agentObservation.score;
            this._stats.gameCount += 1;
            this.newGame(this._agentClass, this._renderingEnabled);
        }

        if (this._renderingEnabled) {
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__neural_network_saves_view_port_5_5_0_1_games_10000__ = __webpack_require__(31);
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
/* 17 */
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__neural_network_saves_view_port_9_9_0_2_best__ = __webpack_require__(32);




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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css__ = __webpack_require__(27);
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
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(20)
var ieee754 = __webpack_require__(25)
var isArray = __webpack_require__(22)

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "#info {\n    margin-right: 2em;\n    /*float: left*/\n}\n\n.InfectionGameHtmlTableRender {\n    /*float: left;*/\n    overflow: auto;\n}\n\n.InfectionGameHtmlTableRender table {\n    padding-right: 2em;\n    border-spacing: 0;\n    border-collapse:collapse;\n}\n\n.InfectionGameHtmlTableRender table td {\n    border: 0; /*For iphones*/\n}\n\n.InfectionGameHtmlTableRender > div {\n    float: left;\n    border-spacing: 0;\n    margin-right: 2em;\n}\n\n/*.InfectionGameHtmlTableRender table.renderer-table-canvas-agent {*/\n    /*padding: 10px;*/\n    /*background-color: black;*/\n/*}*/\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-god td {\n    height: 5px;\n    width: 5px;\n}\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-agent td {\n    height: 22px;\n    width: 22px;\n}\n\n#agentRendererContainer {\n    margin-top: 1em;\n}", ""]);

// exports


/***/ }),
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Recurrent__ = __webpack_require__(30);


// syntactic sugar function for getting default parameter values
var getopt = function (opt, field_name, default_value) {
    if (typeof opt === 'undefined') {
        return default_value;
    }
    return (typeof opt[field_name] !== 'undefined') ? opt[field_name] : default_value;
};

var randi = __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].randi;

const DQNAgent = function (numberOfStates, maxNumberOfActions, opt) {
    this.gamma = getopt(opt, 'gamma', 0.75); // future reward discount factor
    this.epsilon = getopt(opt, 'epsilon', 0.1); // for epsilon-greedy policy
    this.alpha = getopt(opt, 'alpha', 0.01); // value function learning rate

    this.experience_add_every = getopt(opt, 'experience_add_every', 25); // number of time steps before we add another experience to replay memory
    this.experience_size = getopt(opt, 'experience_size', 5000); // size of experience replay
    this.learning_steps_per_iteration = getopt(opt, 'learning_steps_per_iteration', 10);
    this.tderror_clamp = getopt(opt, 'tderror_clamp', 1.0);

    this.num_hidden_units = getopt(opt, 'num_hidden_units', 100);

    this.ns = numberOfStates;
    this.na = maxNumberOfActions;

    this.reset();
};
/* harmony export (immutable) */ __webpack_exports__["a"] = DQNAgent;

DQNAgent.prototype = {
    reset: function () {
        this.nh = this.num_hidden_units; // number of hidden units

        // nets are hardcoded for now as key (str) -> Mat
        // not proud of this. better solution is to have a whole Net object
        // on top of Mats, but for now sticking with this
        this.net = {};
        this.net.W1 = new __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].RandMat(this.nh, this.ns, 0, 0.01);
        this.net.b1 = new __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].Mat(this.nh, 1, 0, 0.01);
        this.net.W2 = new __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].RandMat(this.na, this.nh, 0, 0.01);
        this.net.b2 = new __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].Mat(this.na, 1, 0, 0.01);

        this.exp = []; // experience
        this.expi = 0; // where to insert

        this.t = 0;

        this.r0 = null;
        this.s0 = null;
        this.s1 = null;
        this.a0 = null;
        this.a1 = null;
    },
    toJSON: function () {
        // save function
        var j = {};
        j.nh = this.nh;
        j.ns = this.ns;
        j.na = this.na;
        j.net = __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].netToJSON(this.net);
        return j;
    },
    fromJSON: function (j) {
        // load function
        this.nh = j.nh;
        this.ns = j.ns;
        this.na = j.na;
        this.net = __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].netFromJSON(j.net);
    },
    forwardQ: function (net, s, needs_backprop) {
        var G = new __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].Graph(needs_backprop);
        var a1mat = G.add(G.mul(net.W1, s), net.b1);
        var h1mat = G.tanh(a1mat);
        var a2mat = G.add(G.mul(net.W2, h1mat), net.b2);
        this.lastG = G; // back this up. Kind of hacky isn't it
        return a2mat;
    },
    act: function (slist) {
        // convert to a Mat column vector
        var state = new __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].Mat(this.ns, 1);
        state.setFrom(slist);

        let actionWasRandom = false;
        let actionWeights = null;
        let action;

        // epsilon greedy policy
        if (Math.random() < this.epsilon) {
            action = randi(0, this.na);
            actionWasRandom = true;
        } else {
            // greedy wrt Q function
            var actionMatrix = this.forwardQ(this.net, state, false);

            actionWeights = actionMatrix.w;
            action = __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].maxi(actionMatrix.w); // returns index of argmax action
        }

        // shift state memory
        this.s0 = this.s1;
        this.a0 = this.a1;
        this.s1 = state;
        this.a1 = action;

        return {
            action: action,
            wasRandom: actionWasRandom,
            weights: actionWeights
        };
    },
    learn: function (r1) {
        // perform an update on Q function
        if (!(this.r0 == null) && this.alpha > 0) {

            // learn from this tuple to get a sense of how "surprising" it is to the agent
            var tderror = this.learnFromTuple(this.s0, this.a0, this.r0, this.s1);

            // decide if we should keep this experience in the replay
            if (this.t % this.experience_add_every === 0) {
                this.exp[this.expi] = [this.s0, this.a0, this.r0, this.s1];
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
                this.learnFromTuple(e[0], e[1], e[2], e[3])
            }
        }
        this.r0 = r1; // store for next update
        return {
            tderror: tderror
        }
    },
    learnFromTuple: function (s0, a0, r0, s1) {

        // want: Q(s,a) = r + gamma * max_a' Q(s',a')

        // compute the target Q value
        var tmat = this.forwardQ(this.net, s1, false);
        var qmax = r0 + this.gamma * tmat.w[__WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].maxi(tmat.w)];

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
        __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].updateNet(this.net, this.alpha);

        return tderror;
    }
};


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Utility fun
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        throw new Error(message);
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
};
var randi = function (a, b) {
    return Math.floor(Math.random() * (b - a) + a);
};
var randn = function (mu, std) {
    return mu + gaussRandom() * std;
};

// Mat holds a matrix
var Mat = function (n, d) {
    // n is number of rows d is number of columns
    this.n = n;
    this.d = d;
    this.w = new Float64Array(n * d);
    this.dw = new Float64Array(n * d);
};
Mat.prototype = {
    setFrom: function (arr) {
        for (var i = 0, n = arr.length; i < n; i++) {
            this.w[i] = arr[i];
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
        this.w = new Float64Array(this.n * this.d);
        this.dw = new Float64Array(this.n * this.d);
        for (var i = 0, n = this.n * this.d; i < n; i++) {
            this.w[i] = json.w[i]; // copy over weights
        }
    }
};

var copyMat = function (b) {
    var a = new Mat(b.n, b.d);
    a.setFrom(b.w);
    return a;
};

var copyNet = function (net) {
    // nets are (k,v) pairs with k = string key, v = Mat()
    var new_net = {};
    for (var p in net) {
        if (net.hasOwnProperty(p)) {
            new_net[p] = copyMat(net[p]);
        }
    }
    return new_net;
};

var updateMat = function (m, alpha) {
    // updates in place
    for (var i = 0, n = m.n * m.d; i < n; i++) {
        if (m.dw[i] !== 0) {
            m.w[i] += -alpha * m.dw[i];
            m.dw[i] = 0;
        }
    }
};

var updateNet = function (net, alpha) {
    for (var p in net) {
        if (net.hasOwnProperty(p)) {
            updateMat(net[p], alpha);
        }
    }
};

var netToJSON = function (net) {
    var j = {};
    for (var p in net) {
        if (net.hasOwnProperty(p)) {
            j[p] = net[p].toJSON();
        }
    }
    return j;
};
var netFromJSON = function (j) {
    var net = {};
    for (var p in j) {
        if (j.hasOwnProperty(p)) {
            net[p] = new Mat(1, 1); // not proud of this
            net[p].fromJSON(j[p]);
        }
    }
    return net;
};

// return Mat but filled with random numbers from gaussian
var RandMat = function (n, d, mu, std) {
    var m = new Mat(n, d);
    fillRandn(m, mu, std);
    //fillRand(m,-std,std); // kind of :P
    return m;
};

// Mat utils
// fill matrix with random gaussian numbers
var fillRandn = function (m, mu, std) {
    for (var i = 0, n = m.w.length; i < n; i++) {
        m.w[i] = randn(mu, std);
    }
};

// Transformer definitions
var Graph = function (needs_backprop) {
    this.needs_backprop = needs_backprop;

    // this will store a list of functions that perform backprop,
    // in their forward pass order. So in backprop we will go
    // backwards and evoke each one
    this.backprop = [];
};
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
            };
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
            };
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
            };
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
            var backwardMul = function () {
                for (var i = 0; i < m1.n; i++) { // loop over rows of m1
                    for (var k = 0; k < m1.d; k++) { // dot product loop
                        for (var j = 0; j < m2.d; j++) { // loop over cols of m2
                            var b = out.dw[d * i + j];
                            m1.dw[m1.d * i + k] += m2.w[m2.d * k + j] * b;
                            m2.dw[m2.d * k + j] += m1.w[m1.d * i + k] * b;
                        }
                    }
                }
            };
            this.backprop.push(backwardMul);
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
            };
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
            };
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
            };
            this.backprop.push(backward);
        }
        return out;
    },
};

var sig = function (x) {
    // helper function for computing sigmoid
    return 1.0 / (1 + Math.exp(-x));
};

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
};

// various utils
var R = {};
R.assert = assert;
R.maxi = maxi;
R.randi = randi;
R.randn = randn;
// classes
R.Mat = Mat;
R.RandMat = RandMat;
// more utils
R.updateMat = updateMat;
R.updateNet = updateNet;
R.copyMat = copyMat;
R.copyNet = copyNet;
R.netToJSON = netToJSON;
R.netFromJSON = netFromJSON;
// optimization
R.Graph = Graph;


const Recurrent = R;
/* harmony export (immutable) */ __webpack_exports__["a"] = Recurrent;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const data =
{"nh":100,"ns":26,"na":4,"net":{"W1":{"n":100,"d":26,"w":{"0":-2.4414722931691513,"1":1.8460361757904233,"2":2.514241002435676,"3":0.7923637600674817,"4":-1.7697941809644957,"5":-3.7717574513041843,"6":-1.1878929003913699,"7":-2.321408692257701,"8":3.2957688821029962,"9":0.8905160280515853,"10":-0.6201747639006566,"11":0.04001279487502466,"12":1.9861232903138284,"13":6.080281765463795,"14":0.6530598367612849,"15":1.2185733694733847,"16":2.5714405650392256,"17":-0.13115526750408185,"18":2.909277812197576,"19":1.9643345160173984,"20":0.5666493677953074,"21":0.984780336003616,"22":-3.340841679093962,"23":-1.224509578775548,"24":-1.520014389876947,"25":2.203664303031456,"26":-0.20877987888866148,"27":0.06083425838160159,"28":-0.7358218250111687,"29":1.6307583935802699,"30":0.41007478704085437,"31":0.08701269122203278,"32":2.1921616674963773,"33":-0.40068336471263405,"34":0.2620791573702439,"35":-3.0490590119519343,"36":1.6944829001208335,"37":2.405542503094418,"38":-6.544749744812885,"39":-2.2335157957912206,"40":0.8682109863749912,"41":-0.03347619738050305,"42":6.2695060437490016,"43":3.12088595608357,"44":2.040315362182967,"45":1.3519237357611122,"46":-0.7060633716648459,"47":1.8470576154151697,"48":0.6693652845441682,"49":0.2721552709724237,"50":2.4422848792326537,"51":0.152889894793167,"52":-0.7016803714087909,"53":0.4897805060587934,"54":2.442099918136107,"55":5.338618308481412,"56":-3.02431743064583,"57":-0.6649477419454294,"58":2.0466633530636704,"59":-0.6294171739773768,"60":3.378233140377425,"61":-0.2589688724449277,"62":0.0392785356446366,"63":-2.390271739842619,"64":-3.5517490478362705,"65":-3.225171030922226,"66":-2.0044185772471006,"67":-0.8726196656619629,"68":-3.903683591180494,"69":-0.724514010333049,"70":1.0245358179794526,"71":-2.915508500475005,"72":2.2718790430680142,"73":-1.2426997903009485,"74":-0.5388856716888129,"75":1.313173743753369,"76":0.5242413549526934,"77":-0.06165013126096113,"78":-0.8806429481507093,"79":1.847383408972109,"80":0.8906835026725043,"81":-2.493560739769525,"82":-2.6818725288291496,"83":2.5422807695435887,"84":-1.1927903486526141,"85":-2.597482000447508,"86":-6.320003373069259,"87":-1.904704726280851,"88":0.7822445311534818,"89":-4.184874524254549,"90":-0.35225359282969576,"91":2.955463742517854,"92":3.4122285522513094,"93":3.0511932653895744,"94":-1.0942241983116023,"95":4.9725091036572575,"96":3.2998281880681133,"97":2.26422991143869,"98":4.176114696942353,"99":0.4997799827395601,"100":-2.529550896735318,"101":-0.6888912648059989,"102":1.517489641909242,"103":-0.5427801737055208,"104":-0.8654336712934191,"105":0.24226299862362963,"106":-0.37635414988517135,"107":0.6305995376133248,"108":-1.3083671185186814,"109":0.33901396357581515,"110":0.004172063669840205,"111":6.9854737743847926,"112":-3.268368522697201,"113":-3.3643941665674286,"114":0.8573194729851791,"115":-1.1337948046967394,"116":-0.5916077632227335,"117":9.188212792787493,"118":-0.18395486962705898,"119":0.6603303554985277,"120":2.4037956372715175,"121":0.3183540921239374,"122":-2.186719743515744,"123":-1.4180778696678094,"124":-1.0548396788747763,"125":0.38466170590128346,"126":0.028455542419864765,"127":0.3457154634569579,"128":0.029011843981572794,"129":0.6684880833572744,"130":-1.9420003077977206,"131":0.40156850433663555,"132":1.0209994454513815,"133":1.0864479390167905,"134":0.9975975308474813,"135":2.6143997784188215,"136":-1.701201116393482,"137":-1.2043965684198883,"138":4.329675827949447,"139":2.4081165800943984,"140":-0.13593880032254224,"141":-0.09617888851314293,"142":0.40386564566391076,"143":2.722043302378791,"144":1.826967621546299,"145":1.574406229396373,"146":0.03939600019931026,"147":3.706928333243833,"148":2.4705905392128678,"149":0.10232490796267805,"150":3.4962905029156928,"151":-2.7889676683109585,"152":-0.849552715604075,"153":0.8728162519632832,"154":1.3360418648181862,"155":-0.43581635552370646,"156":-0.07140382045661205,"157":-0.18661474825566207,"158":3.644721079927231,"159":-1.9782254638454866,"160":-0.7233429038838521,"161":1.487573324688443,"162":-1.4152539693798416,"163":-2.06460355792337,"164":-5.58636368944102,"165":0.5313117433301254,"166":4.30578116792683,"167":-0.0975061825323269,"168":1.9674839589561604,"169":-0.8346884871301562,"170":-2.826078142300141,"171":-1.1998539282594751,"172":0.2178891653216785,"173":-1.9260854266065717,"174":-3.04642623837161,"175":0.23634574022838098,"176":0.39405062902731974,"177":0.8199437587360083,"178":-1.312897355357991,"179":-0.050724709368522546,"180":1.5510284136663397,"181":3.256662384320362,"182":0.6696058497873112,"183":-0.012120685278307218,"184":0.6366077643076613,"185":2.1461457342044823,"186":1.3781342353721606,"187":-1.6625722393363118,"188":-2.1538914392721087,"189":3.11331215264942,"190":3.7697694514277478,"191":1.7946143336239966,"192":-0.13394054688571008,"193":-2.26710922223756,"194":2.798415157496441,"195":1.0161267990982548,"196":2.6353206072789677,"197":1.5480969611395454,"198":-6.071371945698394,"199":2.0060222899375937,"200":1.3508746615288125,"201":0.02061474381504277,"202":-1.2916902587401438,"203":1.2015719723426923,"204":2.176189266293213,"205":-0.13625930921786328,"206":-2.712135098551645,"207":0.2592092509152128,"208":1.3478438546636216,"209":1.4302900760965673,"210":2.551137947203141,"211":2.715395941054412,"212":3.415058813549664,"213":3.0228934956037596,"214":3.952984203441756,"215":3.609713132106559,"216":3.621189182964769,"217":2.5258708157497045,"218":0.17539547087428592,"219":-5.2382913521762715,"220":2.4660258529502705,"221":3.3169959588097595,"222":3.585192549392206,"223":-0.561009984700942,"224":3.112698991695763,"225":4.953482847025491,"226":4.131603116813726,"227":1.9469446148821759,"228":-1.7207255895413491,"229":0.5685571442450724,"230":3.529248090389411,"231":3.9917079574300223,"232":6.104415119862382,"233":-0.6417766645916619,"234":1.0362512431196194,"235":-4.075646332786012,"236":-5.794777996821279,"237":-2.4516741362507717,"238":-1.3801872812187446,"239":-0.8618926843769277,"240":-2.635103550341968,"241":6.021497938236601,"242":8.383207097233967,"243":3.3537099939835975,"244":-0.40260529425813407,"245":-0.7460354647495993,"246":-3.1347099893224573,"247":-5.1252348547396975,"248":-0.005642022945071946,"249":-0.06561686233411772,"250":-0.8124782816264234,"251":-1.5323990783389971,"252":-0.664844749857404,"253":-1.559480163663233,"254":-0.5157861772890755,"255":-0.947107254057141,"256":-0.32969698009755244,"257":-0.13389360645232737,"258":-1.0916453685388285,"259":0.38958601694230605,"260":0.2768521263650484,"261":-0.590031082980059,"262":-1.2195942019965238,"263":6.100605068228311,"264":-0.07635451600720566,"265":3.2572590687447285,"266":0.9898767891596097,"267":-0.6546084913091043,"268":0.24190978027641888,"269":-1.2555244801800916,"270":0.9843365651096129,"271":1.7588683859902972,"272":1.2007085869129455,"273":1.2905053563828242,"274":3.656525759646613,"275":1.6001066408269968,"276":3.32189779019082,"277":1.6432645284495426,"278":1.290339367019808,"279":-5.658273856986738,"280":-0.10254548149660492,"281":-0.7656443414843431,"282":2.0699292531862477,"283":3.369522439345885,"284":-3.97668404665268,"285":1.6247487909638434,"286":1.3384369357517885,"287":0.5378152707925452,"288":3.7906573005172204,"289":-2.7177020426669474,"290":0.16830954893450256,"291":0.21369665613326494,"292":-2.8859210577422045,"293":-2.8987766729057935,"294":-4.382418574721101,"295":-1.259410177277955,"296":1.8009316102457993,"297":2.112314213888771,"298":1.3303052008272056,"299":-1.8027764069944636,"300":6.686746069251767,"301":-1.0341597210312066,"302":0.3382751728768367,"303":3.539429751851719,"304":0.5984681915724208,"305":0.979938380688181,"306":0.4030588499744294,"307":-2.667891061835092,"308":2.431778568508016,"309":-0.026039102119901358,"310":1.8758144488603854,"311":-0.729444944247028,"312":1.0028651146749707,"313":2.595320456333738,"314":0.6469707339161692,"315":0.6875963575627194,"316":-1.5192242577345156,"317":-1.3665212254937609,"318":-1.649773343851086,"319":-3.9754489763217813,"320":-5.35741844869512,"321":4.72480613173964,"322":-4.017913106109671,"323":0.0729592695433514,"324":0.14096409624087441,"325":-3.4557619939080437,"326":-1.061870817260486,"327":2.8286708004588985,"328":0.04937172655755461,"329":0.7193505574021671,"330":-0.058646524310200114,"331":1.5952138936338707,"332":3.618315447347544,"333":-0.30915547946851935,"334":1.5550574505088042,"335":-0.3989311006927292,"336":-0.6519296601408501,"337":0.7344660302287093,"338":-1.9984380910094648,"339":0.9766272587889723,"340":-4.3765623379948,"341":1.7332956071303662,"342":-0.32634055195451467,"343":0.9526233171610464,"344":0.2937129348611235,"345":5.200851340444846,"346":0.6874272315999809,"347":-2.44628972569508,"348":-0.7513536236103159,"349":-0.267692640165146,"350":0.649723641272475,"351":-2.6280218269969566,"352":4.75188143314872,"353":1.1601942735085626,"354":-1.7145101630738429,"355":-1.3388654894332674,"356":-1.6173801926194635,"357":-1.0500316137794867,"358":-0.1390251081418117,"359":-0.7427993861478658,"360":-0.24883987386628906,"361":-2.1744110119386058,"362":-1.3800979018165813,"363":-1.85329658062619,"364":-0.6610096352284839,"365":-0.32933791434105436,"366":-0.11197763816061342,"367":-3.7569066430652684,"368":-3.8802952723941297,"369":-1.2507634979835884,"370":0.5254959369604972,"371":3.8764863711877204,"372":5.0194083009316195,"373":2.55699038904002,"374":-3.125599117285534,"375":-5.11150173023499,"376":-6.839292316580409,"377":-1.787650310992297,"378":-0.6015561636836115,"379":-1.0754333809812313,"380":0.4951851269318048,"381":-3.973499497433243,"382":-2.686773596095241,"383":1.6955882788661067,"384":-0.20235547111836943,"385":2.2091611649350855,"386":-0.043161278214004575,"387":1.8940706710202304,"388":-2.9261204867834096,"389":-0.39835449485291824,"390":-6.406892313212976,"391":-0.12232013928791534,"392":-1.2436630225061953,"393":-2.266535199189236,"394":0.4961385296428596,"395":-2.660786920340411,"396":1.9748407210648498,"397":-2.4228302460786613,"398":-0.7000577471558148,"399":4.7735483429787795,"400":1.9999026508031188,"401":-4.115543677369344,"402":-0.7268356651598102,"403":-0.4356827762540996,"404":-3.9330532781028515,"405":3.632408508463482,"406":1.4745840510230144,"407":0.6666776445833225,"408":-2.8890405120300735,"409":0.558630112654433,"410":1.119980210521641,"411":2.8125586220220677,"412":-0.7497457164320488,"413":-0.740009849987446,"414":1.2015579079668022,"415":-2.8459018348187985,"416":1.0519244985524194,"417":-0.6075066724240229,"418":0.23835009198133286,"419":2.2118336751413765,"420":2.0689226175859075,"421":0.0074770442139249285,"422":2.0112809104969425,"423":7.982701803088407,"424":4.289671182972002,"425":2.5738356054670586,"426":3.230974893262021,"427":2.9113315492580023,"428":-1.196189840638507,"429":-2.4021340202077512,"430":-2.003646740990149,"431":0.183771730705326,"432":-2.003821791732923,"433":1.273906678940683,"434":0.09378289331419687,"435":-0.3821105367602186,"436":0.8866622001821419,"437":0.5046810922013043,"438":-0.8635128131568528,"439":0.7489758737919316,"440":0.29996768077398756,"441":-0.0037971386018613514,"442":0.3457811126961694,"443":0.8467896778892856,"444":-0.7661779673474487,"445":-0.04574437727639884,"446":0.679839613800861,"447":-0.7150256752974368,"448":0.5760032840600312,"449":0.9418621879076033,"450":0.002113443386731308,"451":0.14142586751813355,"452":0.7120925056879367,"453":1.0624007776127555,"454":0.24025209698739816,"455":-0.7589163913965727,"456":0.10955975859034174,"457":0.16819487464939403,"458":0.6369471214674125,"459":6.435450768409401,"460":7.358156209784191,"461":-0.3880825368662084,"462":0.6722608301646008,"463":-0.18214381499127508,"464":3.578024153744692,"465":2.429291132849055,"466":-0.5064304035935572,"467":-0.1129342143116449,"468":-0.2759340719809289,"469":-0.2636015096072918,"470":-2.9812142065229787,"471":-1.1468527004986633,"472":-1.0771755557254095,"473":-1.0680781597087845,"474":3.4569823776334556,"475":8.112591054995352,"476":1.3750818105614473,"477":0.6153753275641044,"478":-4.0386347921654995,"479":-2.332456713457759,"480":-7.656537645208055,"481":0.5202687958617033,"482":-0.7280029596079448,"483":1.2751874819538471,"484":0.5399767903985564,"485":1.4588053107858525,"486":0.4538035323847945,"487":-0.771991723983139,"488":0.6284831282136045,"489":0.49658353939461586,"490":0.5274447368236596,"491":-0.052277339739167775,"492":-0.4399350572444428,"493":-0.7314777447261307,"494":-1.2981220830909739,"495":-0.10097560670977843,"496":-1.8283987002675497,"497":-1.4825901599825433,"498":-1.4032609262943159,"499":-1.9023068645757968,"500":-2.974779761764979,"501":-0.4962762793049116,"502":1.3733230302016832,"503":1.0078651208730571,"504":3.782404704204886,"505":7.821930522886654,"506":8.242028652153497,"507":4.36853949672236,"508":-0.09777320629662212,"509":1.51903847871617,"510":1.9508447681922534,"511":0.5990108294091068,"512":0.2536050728733692,"513":-0.5094235734224968,"514":0.27960131895587786,"515":1.959428869785271,"516":-1.7202575929515052,"517":2.013923543657874,"518":-2.9527506946533646,"519":0.5591760571977784,"520":-0.6070970533472478,"521":-1.5036070288511107,"522":2.2743291239965466,"523":-0.6866758302070498,"524":-2.3131215886466894,"525":2.205614476826256,"526":-1.138395156500132,"527":1.2751936477358632,"528":3.551687158137198,"529":6.0829802759776355,"530":-0.8500962586826186,"531":0.9413763823135722,"532":1.519501200580075,"533":5.872708210930255,"534":3.8523680715288835,"535":0.7270711893563351,"536":2.5308306131206946,"537":1.6649900383756475,"538":-0.2302463579982504,"539":-0.18244379394904275,"540":-0.146205502354482,"541":3.9599896035916227,"542":-0.863140046002638,"543":-1.3876695715406107,"544":-0.11521176204902278,"545":0.37306048119406515,"546":0.39956734094986324,"547":1.6555327039209728,"548":-3.0034537773276146,"549":0.8104067009577429,"550":0.4079725249226458,"551":-0.38240561280552726,"552":1.2165593272983757,"553":1.1107729632787622,"554":0.737164222864668,"555":3.3431575025353766,"556":-1.8906185484922915,"557":-1.8165447136579038,"558":1.084061334736119,"559":-8.13610494767135,"560":-7.158745717071922,"561":1.875201929512601,"562":1.431099459400676,"563":1.9282615577919888,"564":-4.603710541465634,"565":0.6066758893572315,"566":2.6253159872347362,"567":-1.948662561779519,"568":-0.024896476782922294,"569":1.170738285071753,"570":0.7505250349376869,"571":-1.1047929590926933,"572":2.294021592442454,"573":-1.9330447799530823,"574":-0.7928492199465973,"575":-0.20454271184523765,"576":1.0864203660961584,"577":0.28047200534371547,"578":-0.6089976302169352,"579":7.881352260358575,"580":0.669798211429009,"581":2.208016040317073,"582":-0.9615190299908144,"583":-2.235724863413922,"584":0.0374825025679096,"585":-7.9371494858607825,"586":-1.602966496395171,"587":0.09634249660342127,"588":1.345193276630443,"589":2.347711833762815,"590":5.607168717540605,"591":2.2940832802050184,"592":-2.6308427069475915,"593":-2.885614644460591,"594":-0.07293427675958022,"595":1.6006651793534605,"596":1.807884769796729,"597":0.02186807776140381,"598":0.41382937917512924,"599":2.0192706374655933,"600":0.0937542487454208,"601":1.0632357022042023,"602":4.708203362231942,"603":0.8379190168307699,"604":-1.0188236418411816,"605":-4.0675574330323885,"606":-1.9137767136479162,"607":-2.522176546774542,"608":-2.162942525699245,"609":-0.050820745627211616,"610":3.9457808977584046,"611":2.508706286922154,"612":3.777425271084128,"613":-0.16975767660487626,"614":0.014263511270812528,"615":-1.1256001460170422,"616":1.571143558120975,"617":3.5691098843985563,"618":-1.8690773497998046,"619":2.4777930303883737,"620":2.3168507012012505,"621":-1.7011073419865765,"622":2.656363727477885,"623":-3.1377622378544867,"624":-0.5247243161458472,"625":0.6333009567921833,"626":-0.6793854777295781,"627":-3.34535114876321,"628":4.702640838676025,"629":1.5301568282433355,"630":-0.30820076683755004,"631":5.1508326191300675,"632":0.742291368203852,"633":4.112665882958749,"634":-5.602665740310854,"635":-3.1409958561766707,"636":-4.307650483986578,"637":-4.6552714072957375,"638":-2.465418085670083,"639":-1.246936757538002,"640":3.4286474414842893,"641":0.2774619201991259,"642":-1.7558229875504512,"643":-2.044097222623459,"644":-0.8427952459595545,"645":0.6584277326934725,"646":0.2977173190836448,"647":1.3804633307308738,"648":1.6723121525335976,"649":0.0023541741424288713,"650":0.8224240442220021,"651":-2.7981368399614466,"652":0.6895773155815741,"653":1.5960109081592384,"654":1.890766091658878,"655":1.7911810965932353,"656":1.3740137481506531,"657":3.040668903150539,"658":2.3854612139754274,"659":2.186571681704883,"660":2.615270251330116,"661":1.6652090338991612,"662":-1.489890723497212,"663":5.100909823630293,"664":2.635645860676067,"665":1.2082030212557295,"666":-6.199460594101933,"667":2.2310042241877954,"668":1.2465722670182888,"669":3.2466093940580367,"670":0.36001890119987934,"671":0.26832183451690106,"672":-0.8288197941618164,"673":-0.2162492370882727,"674":0.19205830595810594,"675":0.08980429113650971,"676":-0.5456773376309163,"677":-0.4140049716953141,"678":-3.4178818403546325,"679":0.7201075825243519,"680":0.8432908475686304,"681":0.002295891410941821,"682":1.3756310720241416,"683":1.9514024618229675,"684":1.463977262416332,"685":0.7002078429453948,"686":-2.7780178769478407,"687":-1.2777968035507898,"688":-3.6901302419931943,"689":4.718842135818032,"690":-1.2464440175795246,"691":0.5506660990850064,"692":-0.24239158518496973,"693":-2.4001455934388463,"694":-2.905486442440493,"695":1.8871995942634434,"696":0.3663275661320471,"697":-1.5661561550699425,"698":-1.280134832900492,"699":-1.3488235089807157,"700":4.098665027915036,"701":-0.09878553835899659,"702":-3.522903059056162,"703":-1.295261515373283,"704":-0.28209123647642004,"705":-0.21704048359522604,"706":2.659575128780271,"707":-3.101936737803112,"708":-0.25894820462756885,"709":0.009251192600460962,"710":-5.489667601297026,"711":-2.2492949304411067,"712":2.5758360591807183,"713":1.8618607813493153,"714":-3.3679421799033635,"715":2.779762259682177,"716":1.9242770921721943,"717":0.6136034240836274,"718":4.109434599660582,"719":2.090210857696716,"720":0.013920145010225525,"721":0.2151479301829043,"722":0.5714086715304955,"723":0.3925482912869933,"724":1.6352852333928996,"725":5.405305143989082,"726":2.094032991248032,"727":-0.21151188175621813,"728":0.6257437441799759,"729":-0.45248550866062626,"730":-0.9022184273527614,"731":-0.18479839811789114,"732":-1.5953234078999579,"733":0.9189885417630514,"734":-1.0593560809638591,"735":-0.04121498065525734,"736":0.7678249573631398,"737":-0.0885873944623028,"738":-0.3785025864959505,"739":0.020558921227644637,"740":0.8861053106322209,"741":-0.673537695749344,"742":-1.9285160675072248,"743":0.27853514655653083,"744":10.403009476040953,"745":0.5589762821877909,"746":7.812986899580968,"747":1.0017736000983204,"748":-1.1419084360748912,"749":-0.8837871003688562,"750":2.1381757499543435,"751":1.5998195743426764,"752":2.2398511181012495,"753":-0.1261666776992136,"754":0.07164265037286255,"755":-1.7052111461990032,"756":0.8901073195874117,"757":-1.9653675715166092,"758":-1.990627329687795,"759":1.961329435251816,"760":-3.439910097089598,"761":0.9647949524122895,"762":-4.955594894676906,"763":-4.882590542121363,"764":-2.140147438986754,"765":1.9020805799831981,"766":-4.592843461779284,"767":-3.7354740811620117,"768":6.0346044476671,"769":0.6265545980497991,"770":2.1682171295397294,"771":-0.6419396539275376,"772":1.4752852413928566,"773":2.7638188778243697,"774":0.20771795559323206,"775":-1.065349881293131,"776":0.5994791288634091,"777":0.9266410911684868,"778":-1.3911130550914952,"779":-0.6236534808462878,"780":-0.5844668435335646,"781":-2.149868724308145,"782":-3.0568677609324273,"783":-1.9275310998619093,"784":-1.2314783099993154,"785":-1.1292104057323993,"786":1.0105054057135443,"787":0.56806778403116,"788":-6.315567002538247,"789":-1.3777057440205829,"790":-1.6585232724283472,"791":-2.9753243727184295,"792":3.331056520610308,"793":7.489424045819571,"794":8.362692044902293,"795":0.5800461694249524,"796":0.10692429026063026,"797":-0.3518308692038576,"798":0.1849205005551701,"799":-3.2874105143892596,"800":1.5330973540063788,"801":1.2122473085078143,"802":-0.7943742018285416,"803":1.9447887952403484,"804":4.1434250462040465,"805":1.1092837085712464,"806":0.8152562231889726,"807":-0.8266098579044295,"808":-1.6233609384282934,"809":1.1713737577756234,"810":-0.19352589353959385,"811":1.377079983289077,"812":0.4793507789066537,"813":-1.2901865393444758,"814":-2.821197019040875,"815":-3.9226378833614515,"816":-2.174347862676608,"817":-0.026023593417852806,"818":-0.3111493401870436,"819":-7.9296625061587305,"820":-1.099110133558289,"821":-2.500288810582154,"822":1.8530434539669833,"823":9.604257278613474,"824":3.0576316278569413,"825":1.678874342791096,"826":0.45017597304233387,"827":-2.045685767268064,"828":-0.5382165818487467,"829":0.8283689001957901,"830":-0.5613400874664634,"831":-0.7099789898061778,"832":-0.9918927721132865,"833":-0.27278155686565636,"834":0.5184729300310903,"835":-1.8582742970984834,"836":-0.8655983258265073,"837":-0.9688533078119738,"838":0.2185450633439954,"839":3.74031204454241,"840":1.9648355343178303,"841":-2.1641533473095733,"842":6.486207444707289,"843":1.7673159505608609,"844":-2.6915857455878034,"845":1.5639513182963891,"846":1.8766006896170613,"847":-3.349025355346589,"848":-3.3541843801026383,"849":-0.517388298125943,"850":-0.27020254472647526,"851":2.3344774879460504,"852":-4.135933553866774,"853":-0.2549407882657806,"854":-0.8298617160165833,"855":-0.3729336029642394,"856":-0.11110216407244475,"857":1.020327488016587,"858":-1.1478330263672105,"859":0.04346756445099163,"860":0.791843771804941,"861":-0.2817165305425026,"862":-0.2506809472881926,"863":0.5781552396778035,"864":-0.6079228000119888,"865":0.10617542714283383,"866":-0.5490045613550455,"867":0.22696782206293764,"868":0.4886020944332479,"869":-1.3939497293127319,"870":-2.399571559646257,"871":-2.28843473399942,"872":-0.46220973192295756,"873":-0.23981076027172055,"874":5.12527520835122,"875":8.85844157745206,"876":-6.405208325685757,"877":0.30130521249129505,"878":-0.16823748145604422,"879":-0.9503837778939346,"880":-1.271539805218198,"881":0.7640014938588091,"882":-0.06676765498307612,"883":-0.8804059691650464,"884":1.1482385480072177,"885":2.5782867997480854,"886":2.169388381684613,"887":1.7820440562036723,"888":-0.1972140174990944,"889":-4.468327802148705,"890":-2.2930754708834873,"891":-2.3479934150932036,"892":-6.029144442192835,"893":-5.250521946417253,"894":-1.6045112517958495,"895":-0.4213811578124245,"896":-0.8669281483568371,"897":-2.1930051366685825,"898":-1.3350167308305763,"899":0.5506399480069433,"900":-0.24792415927227412,"901":2.086307453199222,"902":0.24386434835779125,"903":3.243388738421447,"904":0.4457496229572752,"905":2.349987015484577,"906":-0.9003855119950668,"907":-0.5989572821270259,"908":-1.978316223035173,"909":-2.004784211360463,"910":-0.014672185865568144,"911":-0.1798631540581604,"912":-0.11063727036820573,"913":0.9922959297267444,"914":-0.058659446388695254,"915":-0.2958086052327884,"916":0.6046346139528022,"917":0.14015099539653608,"918":-0.1169537467680847,"919":0.38689049658938907,"920":0.012750173182658331,"921":0.4037308079362151,"922":1.5734576841373464,"923":0.3565565068023885,"924":-0.002788175061402859,"925":0.12388582096710499,"926":12.661081020040083,"927":7.12627974059213,"928":0.3180537147286852,"929":-0.5420066713213205,"930":0.033417262310754745,"931":4.190231610241083,"932":3.2908724145637636,"933":-0.5871049195264849,"934":-0.18056047137181663,"935":-0.1666867620426385,"936":-0.9421563225863234,"937":4.557227408947688,"938":-2.5675347294407556,"939":2.484959387584494,"940":-1.6896868597673422,"941":3.233266347685722,"942":-3.389780402557393,"943":2.6932846760660483,"944":0.685935928716467,"945":0.6034072893727864,"946":0.9963344523623372,"947":2.5712140114649533,"948":2.3450483207453092,"949":4.129077054698872,"950":7.525765121318015,"951":-1.4080206613092374,"952":-0.22520046939902888,"953":-1.831323797571007,"954":-1.457613732451097,"955":-2.834148142722312,"956":1.5283124324720314,"957":0.5345287451688292,"958":-0.8802285527756134,"959":-1.3062894261032745,"960":2.080342263303289,"961":0.5321589980439889,"962":2.2743050207286966,"963":-0.2756734167833132,"964":-1.1662962272803683,"965":3.9917870609391612,"966":-2.57067359426927,"967":4.529354038143289,"968":3.501184132460505,"969":-1.5258516580889867,"970":2.3777807906434476,"971":1.742818356753099,"972":1.7515509710038053,"973":1.0034006689014543,"974":3.461309890761619,"975":0.3752074146897285,"976":-1.346655335641507,"977":0.6920014250817669,"978":-6.2961847738006345,"979":-0.21604150368686034,"980":0.9792397054115566,"981":3.6920097047249496,"982":3.2722780222189316,"983":0.5796126664821234,"984":-1.8244678950645217,"985":-0.21839762247453853,"986":1.5718828998645429,"987":0.37071633440723734,"988":0.7133199341171211,"989":-0.24774464888775716,"990":0.6096142148077319,"991":1.4600620986977126,"992":2.762648446804481,"993":-0.8152041456267862,"994":0.5767854885261452,"995":4.563752490952141,"996":3.1499881855732683,"997":1.751465209763844,"998":0.9432391623924752,"999":1.3362142741103196,"1000":1.965866186761026,"1001":-9.930842053067462,"1002":-0.7128806785557423,"1003":-0.20008888380975465,"1004":-0.5708163725338834,"1005":-5.5402045627645995,"1006":-2.7067918353302924,"1007":-3.406610530281118,"1008":-0.16250364330548783,"1009":0.5928248730648132,"1010":-0.5126658181757489,"1011":-1.5518833367709828,"1012":-1.5307912750179726,"1013":0.7059315487134918,"1014":-0.45291191477653275,"1015":0.6040566250866861,"1016":0.1563518996595802,"1017":0.5675128931064483,"1018":-0.7477934435168393,"1019":0.2367567487727817,"1020":-0.04013689344487579,"1021":-0.9661171685383998,"1022":-0.7034397177550469,"1023":-0.2801750819859613,"1024":0.16042569259786604,"1025":0.334970789546936,"1026":-13.52087197818297,"1027":-2.8414871640635844,"1028":-0.5984691771331041,"1029":-0.3810338235981479,"1030":0.7535368391166684,"1031":-2.2865714252702194,"1032":1.2465727274481269,"1033":-0.4316768999489276,"1034":0.09241390899727518,"1035":0.9897835819412143,"1036":0.915157910090443,"1037":0.2590485018576026,"1038":0.0024639911479276255,"1039":-0.432570469157434,"1040":-0.4335217329312668,"1041":-0.8564798760730802,"1042":-0.7366811139368961,"1043":-0.3774527024882976,"1044":-2.810198464446183,"1045":1.2080260029924266,"1046":0.8112206255373405,"1047":2.0965190683506094,"1048":5.577847088747698,"1049":-0.7930258191288311,"1050":-2.2142394152537306,"1051":-1.8309419685438484,"1052":0.34320968409022223,"1053":7.30374320651527,"1054":3.3741290841122913,"1055":-0.06604083104862124,"1056":1.5046824600665325,"1057":-0.5079716116674955,"1058":2.1904010878356015,"1059":2.147247987487204,"1060":-0.3161817633681299,"1061":-0.44672693410535197,"1062":0.5514662631340929,"1063":-0.9647145364915157,"1064":-0.12506799530625237,"1065":-0.48175269867719606,"1066":0.9536632112766188,"1067":0.3869658337188193,"1068":0.5876695310883867,"1069":0.43612845015594137,"1070":0.7820206145116609,"1071":-1.0507828905060552,"1072":12.19770628933176,"1073":0.3176114334402164,"1074":0.9421298542665331,"1075":0.23594696582884284,"1076":0.18064703172027335,"1077":1.2509247017706686,"1078":1.111133577341476,"1079":-0.15222186129247778,"1080":-0.000625927915164911,"1081":1.1635437739197185,"1082":-0.3634483089904321,"1083":1.7496839504611996,"1084":-0.16311245622456458,"1085":0.37401902895228034,"1086":-1.149969738548296,"1087":1.2434622937685182,"1088":1.2101356342557263,"1089":1.0698686304584923,"1090":1.4380990318710525,"1091":-0.8504577192019374,"1092":-1.857027567143867,"1093":0.4416890508819219,"1094":4.003501360160659,"1095":-0.73432123175775,"1096":4.537384141040319,"1097":-3.112746300840493,"1098":-0.9963420996037927,"1099":1.5525737066020435,"1100":2.2446123622414147,"1101":-1.5441979391575509,"1102":3.3397182992100483,"1103":-0.30526690853590976,"1104":5.098476586145988,"1105":2.117051372808867,"1106":1.978814615248052,"1107":3.1232243337819288,"1108":-1.7246221972953089,"1109":2.2081717094665243,"1110":5.4904867386474105,"1111":3.8469605720212945,"1112":0.4422554448044208,"1113":1.7525238862707189,"1114":0.7038527817796896,"1115":3.8449203253768345,"1116":2.568766856533754,"1117":0.7204753866216395,"1118":1.1663322838559833,"1119":0.5589681143980606,"1120":-1.4331883449033784,"1121":1.3846788368929999,"1122":1.7550023206753178,"1123":1.6414838068007958,"1124":3.1534432973809174,"1125":-1.020944020982819,"1126":-0.458084282800854,"1127":0.11734104673331767,"1128":-1.776789803059987,"1129":2.0228359972042433,"1130":1.0576173829925621,"1131":2.5960383059863985,"1132":0.41269453359880237,"1133":2.8996386020985465,"1134":0.9288140966331817,"1135":0.05488770352793452,"1136":3.832790836101375,"1137":-1.3834388014840968,"1138":-2.752639191182886,"1139":-1.8709005638157798,"1140":1.0674065266992185,"1141":1.929791413368784,"1142":2.1822828788993127,"1143":2.3856449215622284,"1144":-0.7692392851614595,"1145":-1.6555658059609148,"1146":-0.8528962262963029,"1147":-2.726055323372456,"1148":2.4050885125676236,"1149":-0.3357320584926523,"1150":0.7133453283537746,"1151":-0.11176724888557849,"1152":-1.7487859203390683,"1153":-3.7732624385373925,"1154":1.91950694221007,"1155":2.3669027682986172,"1156":1.6706238717405126,"1157":-5.179069666548324,"1158":-3.6823854168203294,"1159":-0.5884453522777179,"1160":2.145600101569132,"1161":-2.1272909803142124,"1162":-1.2223053307234175,"1163":0.6633655919864282,"1164":-1.4915466078046324,"1165":0.5290932009658499,"1166":3.1656561397028105,"1167":-0.5165206744893945,"1168":-3.953911601953151,"1169":-0.33770578827736236,"1170":-4.74937110467969,"1171":2.9154864797265954,"1172":2.9525649966967387,"1173":6.009802792814829,"1174":-5.401769786493283,"1175":-0.16228350172235587,"1176":4.65932368790054,"1177":3.173088267482271,"1178":1.1053107212624933,"1179":-0.24879842655849294,"1180":0.74549894772128,"1181":0.044408101605718696,"1182":0.025360344491592322,"1183":-0.6130429738316211,"1184":-3.681801232136676,"1185":0.7898536761625947,"1186":-2.464852825550014,"1187":-1.788243768652295,"1188":0.8787005567021657,"1189":0.4021307772837164,"1190":0.9302528681300309,"1191":-1.4164347702563962,"1192":-0.25046292421590916,"1193":-2.857608468686834,"1194":-1.5203592780994186,"1195":0.41284177860557936,"1196":1.668849174780013,"1197":-1.4699062738910402,"1198":-2.5254020271442106,"1199":-1.4977391605965498,"1200":-2.76335690390817,"1201":0.9826940200064009,"1202":3.1092164666454924,"1203":1.6544097657252055,"1204":1.017654843792269,"1205":2.373604190455587,"1206":-4.698295567954666,"1207":-4.073288028553543,"1208":-4.7306344552026,"1209":0.22810029624849326,"1210":-1.3629151680712266,"1211":1.3722476599390514,"1212":-2.5367729963015075,"1213":4.883316609090695,"1214":0.35919679480290456,"1215":0.00852783790769799,"1216":0.9631926065531643,"1217":4.977213035148329,"1218":0.22371759648051628,"1219":-1.8984488430677777,"1220":-3.0232500784356753,"1221":-1.0810610444184228,"1222":-0.5526014240059701,"1223":-0.7916471352539072,"1224":2.083134433857531,"1225":-1.5909557647037893,"1226":2.3217557081397224,"1227":-1.5517378586558277,"1228":-0.7258517816201934,"1229":-1.8057512354531937,"1230":0.0819026039235291,"1231":-0.39913387169746256,"1232":0.09346955338196707,"1233":1.5080124281061984,"1234":0.20834729030295407,"1235":3.8070337557189835,"1236":-1.9602617794469979,"1237":-1.7399898144876036,"1238":-1.0355183950022857,"1239":2.2437508358333513,"1240":-0.9694134853814943,"1241":2.6351308922885335,"1242":0.9425791502104551,"1243":1.5719649321727793,"1244":1.8960108946690113,"1245":-1.0040582475022048,"1246":-6.28931022377398,"1247":-0.24453672364150542,"1248":1.9829023454985226,"1249":-0.33731120000775094,"1250":1.0573619027191643,"1251":1.1256224614849801,"1252":0.33355767104509665,"1253":0.5118622041655794,"1254":2.6746008477741303,"1255":2.8918942706028727,"1256":-2.329776635635653,"1257":2.216426059425025,"1258":5.777162068704373,"1259":0.41730603516669834,"1260":2.6006579210827634,"1261":4.462078435512905,"1262":2.367422699801827,"1263":-4.636372480026029,"1264":0.5485917774363367,"1265":1.0402306135111823,"1266":0.7763414130406389,"1267":-4.044861545573772,"1268":-1.1642390092911992,"1269":2.8547881141588625,"1270":-0.04154459662877169,"1271":-0.0761119378229596,"1272":0.7393354908291871,"1273":-2.8282553772293997,"1274":-0.322114660401283,"1275":0.8508767273498002,"1276":-0.5506676841598086,"1277":1.659659427824409,"1278":-2.3072985405782522,"1279":-0.14404525886615213,"1280":-2.650753210399876,"1281":-2.325444802986021,"1282":3.2136564232719964,"1283":-1.6170467273305573,"1284":-1.8162268485385233,"1285":3.680714323434447,"1286":5.343043249799459,"1287":5.480496174281469,"1288":-2.3749681055025795,"1289":2.118148286765502,"1290":2.935359835690789,"1291":4.284689816644218,"1292":0.5485987660190397,"1293":0.16387662768916833,"1294":3.5620484230405203,"1295":1.731410034258989,"1296":-5.09321258672081,"1297":0.0019816218189787826,"1298":-1.44503753907361,"1299":1.3756958684958571,"1300":0.5598362304830977,"1301":-1.7096519561955141,"1302":2.6649005302741524,"1303":-0.7471478788317032,"1304":0.8610589905912035,"1305":-0.568642951206648,"1306":1.670794162551287,"1307":-0.006657030225268247,"1308":4.629364703410362,"1309":-1.3978914297960237,"1310":-1.3241550500349475,"1311":-3.3652312444114583,"1312":-0.5628162668845186,"1313":-0.9794452306221912,"1314":-1.9481622671363077,"1315":-5.435510616791012,"1316":4.112295997955101,"1317":-3.3970825081200307,"1318":-3.494023714309011,"1319":2.326699430770967,"1320":-1.1863434408226385,"1321":3.4912462357265395,"1322":-2.162400000516669,"1323":2.7472151361174175,"1324":3.9230397693766688,"1325":-0.3167270888759347,"1326":-2.0532619663929945,"1327":0.10063473993140563,"1328":-0.24333767383729726,"1329":0.5320005121679398,"1330":0.1562775840863043,"1331":-1.4891158855816826,"1332":-1.0022663829294194,"1333":-0.9007551113114141,"1334":1.8759766805952172,"1335":1.7358241448980114,"1336":5.01545552273072,"1337":3.024682717123172,"1338":0.4007065677627574,"1339":0.8465887625058447,"1340":4.491248894362966,"1341":0.8115619602400278,"1342":-0.627693034017554,"1343":-4.496445700830326,"1344":3.4890789071133574,"1345":1.7365890120645886,"1346":0.966682428772448,"1347":0.8932622427763255,"1348":0.7858282800177976,"1349":1.5102571687001816,"1350":1.5266363515257864,"1351":-0.3280163739716412,"1352":-1.2018440641046502,"1353":-2.5169243854289056,"1354":-3.542414851955564,"1355":-0.6933046265939046,"1356":-0.7926520567587882,"1357":-0.6170818199435609,"1358":-1.0168219602395594,"1359":-0.04704056347130527,"1360":2.009473999812457,"1361":1.3221138612452337,"1362":4.664885640910979,"1363":-2.840235501936602,"1364":-0.4750320493056981,"1365":2.3035019873863996,"1366":-0.3698324010930051,"1367":-1.320363761941271,"1368":-1.9456798759858,"1369":-1.2607771979347449,"1370":-2.407662369401736,"1371":-6.308526684473238,"1372":-0.4387606973526791,"1373":0.24029699702795626,"1374":0.12366725105690037,"1375":2.487869014184104,"1376":2.8843771162104352,"1377":0.2819276839107632,"1378":-1.7337466783175428,"1379":-1.6513784682817443,"1380":-1.5818040681587897,"1381":-0.6377983811415903,"1382":-1.7937715996465695,"1383":1.2812195479881165,"1384":-1.662412208773924,"1385":-2.0729731715929622,"1386":-1.6307489761561438,"1387":0.11533410154651305,"1388":-0.6433459707122975,"1389":-2.081394811856743,"1390":1.8707073906372493,"1391":-1.4585017531735345,"1392":0.15593071486614143,"1393":-0.9374254929288073,"1394":2.23913387814668,"1395":0.09370187504428792,"1396":0.23295847463254996,"1397":-2.8303332017796756,"1398":1.9842280982404148,"1399":-0.3743464515537837,"1400":1.3957895321601959,"1401":-2.1409508007588944,"1402":-1.063968601463949,"1403":-0.6064280416724822,"1404":0.00046020250947802384,"1405":-0.09217630867950043,"1406":0.6530310149140142,"1407":0.7841615107524329,"1408":-1.3949337526149326,"1409":-0.695418397686987,"1410":-1.3432371453531824,"1411":-2.549160148825509,"1412":-2.3649495814843573,"1413":0.5084295247973707,"1414":0.7501328545147807,"1415":-2.346835728885209,"1416":-5.753969029832736,"1417":-1.7841182490295318,"1418":-0.01137318594106035,"1419":0.9991477805464841,"1420":-4.0995690092379045,"1421":7.769321785577161,"1422":3.682801881579607,"1423":2.1565958010733794,"1424":-0.693935401945119,"1425":-2.083157336429438,"1426":-0.36926336061877246,"1427":-2.97696935361747,"1428":-1.8266491365687287,"1429":0.6135304843437601,"1430":-1.4422276527719848,"1431":1.047711259668967,"1432":-0.5679007557599747,"1433":3.3822034324046064,"1434":3.8646960676588096,"1435":-0.39080940456100893,"1436":-0.06369906463739208,"1437":-0.03602454687562871,"1438":-3.2936868012616336,"1439":-7.007239500845187,"1440":-0.76221512981891,"1441":1.0491200449197657,"1442":-0.3233729823818923,"1443":3.1676777854016755,"1444":5.840690032189299,"1445":0.660883616621712,"1446":-1.2231535936382762,"1447":0.7551134870714177,"1448":0.40849976593365445,"1449":0.4660103663912955,"1450":-0.9274180692346904,"1451":-0.31598268642774335,"1452":2.8609862540549416,"1453":0.1471801046107859,"1454":-0.651823535524178,"1455":1.7400884172132154,"1456":1.0457273416003965,"1457":-1.8245801927344634,"1458":1.094900257182872,"1459":-0.5501438045322482,"1460":2.8292851222866062,"1461":2.9914925087221214,"1462":5.607066709627003,"1463":5.814987722932465,"1464":1.101267930100377,"1465":5.014244175987994,"1466":-1.1231778609264687,"1467":0.3884832935286025,"1468":2.371598421144035,"1469":1.4859108848156362,"1470":2.1495855432690654,"1471":0.03589902537258043,"1472":-0.8133117897368928,"1473":-1.8291951360452725,"1474":-0.4534320464965364,"1475":-0.8417688550834862,"1476":-0.9484514020253532,"1477":-1.1538025143470731,"1478":0.8519736502448086,"1479":-0.6407227310482589,"1480":-0.08919566990004776,"1481":-2.288806347916422,"1482":1.514983827161002,"1483":0.013554622640731769,"1484":2.0878904628554893,"1485":-0.38209193025867905,"1486":-0.18606488767005464,"1487":-0.763265019155453,"1488":0.6231730823861358,"1489":-2.08060582153276,"1490":1.7820318835638735,"1491":1.3462282390482565,"1492":-2.689188318690305,"1493":0.3583846252107261,"1494":-1.344325936268584,"1495":1.07615751253893,"1496":-0.9289005749163237,"1497":0.520998198613769,"1498":-0.23865960220189814,"1499":-0.284621333697717,"1500":0.009325940894258495,"1501":0.8945474292585011,"1502":-1.0120513180632649,"1503":-1.293728554595976,"1504":0.867223073898859,"1505":-0.47749650371653524,"1506":-0.015554914715990962,"1507":0.4905185024506283,"1508":-0.12679600213437528,"1509":1.3584408483668218,"1510":1.3669415800671887,"1511":4.364124254145447,"1512":2.3095249275984227,"1513":-1.9244145132990305,"1514":-2.860016165842706,"1515":2.581303611675746,"1516":2.192069626731367,"1517":2.247624943022793,"1518":3.087195318926138,"1519":-1.2695133624090893,"1520":4.481457669835021,"1521":1.9509668032465242,"1522":2.4069503030913135,"1523":1.274321423391926,"1524":-1.2321789961929766,"1525":2.421686489930539,"1526":3.9620985715622,"1527":3.536122382389326,"1528":2.316306359572966,"1529":1.7491762059873561,"1530":4.809338727399987,"1531":1.9488653063805876,"1532":2.332804115767742,"1533":0.0473331100774683,"1534":0.38402505313685653,"1535":0.7683395548412549,"1536":-0.17247194414223316,"1537":-0.004087564676527426,"1538":-0.15938426345876242,"1539":0.6158617780743504,"1540":0.9896624311785174,"1541":7.447132256686528,"1542":6.023089381773896,"1543":5.796697729057314,"1544":-2.060021684021425,"1545":-1.3060534151723262,"1546":-0.38386952573870087,"1547":-3.405966979405834,"1548":-0.16269887698075516,"1549":0.07495087514088342,"1550":-1.1359807379314097,"1551":-0.9080437841744361,"1552":-3.299665991102039,"1553":-4.396239162698381,"1554":2.171405922564665,"1555":0.2449052955951826,"1556":0.373762745112859,"1557":0.050461519844756254,"1558":0.9871037075769586,"1559":1.3426038233920161,"1560":0.45003746886182283,"1561":-0.8964031617405589,"1562":-0.8518535972293517,"1563":-0.8040167379736981,"1564":-0.3977752561932158,"1565":-0.4200638423752579,"1566":0.18513097987966978,"1567":7.457234884148331,"1568":8.938031938303347,"1569":6.871414250121355,"1570":-0.2656385126638248,"1571":-0.8031719262330972,"1572":0.5388602415535607,"1573":4.5014536486102745,"1574":-0.1018635347845247,"1575":-0.14751376809715122,"1576":-0.9796871279643278,"1577":0.04755584868040682,"1578":-0.38229142541088124,"1579":-0.6625523461183886,"1580":0.3021757160802578,"1581":-0.3648169266465085,"1582":-0.1354246708516578,"1583":0.30849187461552197,"1584":-1.6253666976954035,"1585":-0.8376945329770936,"1586":-0.1559638406896204,"1587":-4.380736472748121,"1588":-2.744206673457098,"1589":-2.316885696596329,"1590":-0.027201034774962274,"1591":-0.392872851573052,"1592":-1.2193397175945495,"1593":-9.635329080382418,"1594":0.8160784678050529,"1595":-0.2995221886744559,"1596":-0.3702833335933889,"1597":0.18488988418610983,"1598":1.106511246396372,"1599":0.6675325869821044,"1600":0.08421120325204919,"1601":0.7672029341121456,"1602":-0.7579251067758191,"1603":-0.8036953698046693,"1604":0.1435886068750726,"1605":-0.024805678085190547,"1606":-0.38451599372197587,"1607":0.1803370134808733,"1608":0.21920433727785363,"1609":-0.2714771385953994,"1610":-0.4580481633791793,"1611":0.10276861034970378,"1612":1.039628596464408,"1613":-0.7861656693056676,"1614":-1.1708046698295558,"1615":0.9707853007446364,"1616":2.4865722098391867,"1617":0.7577533221151332,"1618":-0.19947850320797045,"1619":-5.130407829851233,"1620":-6.0999628788393,"1621":-4.514512534819338,"1622":-0.7493640972138063,"1623":-0.8909262918955551,"1624":-1.3216260044434958,"1625":3.909376655822024,"1626":9.119928548430162,"1627":1.4566766591312506,"1628":-0.6819501513317531,"1629":1.468607682338201,"1630":0.556847371615828,"1631":1.775521093902935,"1632":1.0393774056085021,"1633":2.4404310825938897,"1634":-0.5636300398172504,"1635":-1.641264768752596,"1636":-0.1112343342800557,"1637":-0.1169991988165833,"1638":-2.514264601263523,"1639":0.8809651963234987,"1640":-1.439196188341902,"1641":-1.9761375649747865,"1642":0.963885629454835,"1643":-3.134852829304007,"1644":-2.596261948331483,"1645":3.8497439657243238,"1646":-0.8100631222186462,"1647":-0.7889618105470588,"1648":-2.522473925847315,"1649":2.3470159705389806,"1650":1.7421004380759129,"1651":-2.724369579704978,"1652":8.92526658892965,"1653":0.8759913923509159,"1654":-0.1373414966678784,"1655":-0.04632180625840851,"1656":-0.3359677607674547,"1657":0.40225378093837827,"1658":2.3346685138729684,"1659":1.2348906387432717,"1660":-3.0917908349282563,"1661":-0.7742226594381013,"1662":0.06082124767475917,"1663":1.854111949157665,"1664":-0.5184009921950867,"1665":0.22986333111976415,"1666":0.8425009560861565,"1667":-0.5773013920475623,"1668":0.2525678128107712,"1669":-0.8794473937717402,"1670":0.04734760679910972,"1671":0.9246491983936092,"1672":0.7167172713954642,"1673":0.9364568025456296,"1674":-0.9009434490876043,"1675":0.8844946827608177,"1676":-1.0857088477156152,"1677":-4.223764675146934,"1678":-0.5009728135219694,"1679":0.2859095993087632,"1680":-0.05541755062704813,"1681":-5.699557956912611,"1682":-8.430688817506603,"1683":-9.759430090557732,"1684":0.2883113423257681,"1685":0.2851744042869047,"1686":0.7229647701171498,"1687":0.46056305862178015,"1688":0.26499193206705457,"1689":-0.7032556151659108,"1690":-0.32031301272759954,"1691":-0.08458276998340532,"1692":1.2201397328265189,"1693":-1.7830609315013435,"1694":0.4912188492011817,"1695":1.0437355053028832,"1696":3.1210716455550553,"1697":-5.08072002602215,"1698":-1.798700814565875,"1699":-2.393552118187533,"1700":1.4195753329665965,"1701":-1.4803159300364044,"1702":1.796355223550053,"1703":-3.6155200027691916,"1704":-1.4382125877578513,"1705":-2.4298302779924317,"1706":4.371849484474424,"1707":1.6460467330063024,"1708":2.5378597606812363,"1709":4.4484463747823275,"1710":0.8468123402519288,"1711":2.292053999976175,"1712":3.313414507651368,"1713":-5.65034668921098,"1714":-1.7512117117258903,"1715":0.6692891719582753,"1716":0.03225878583099158,"1717":-2.6020450302195512,"1718":-0.1492755257836329,"1719":-2.432579601572766,"1720":-3.7773303778105514,"1721":0.9940918954418311,"1722":-2.905433200151588,"1723":-1.1456780922733856,"1724":-2.0800942767544326,"1725":-0.2437827902135947,"1726":-3.7286507233237742,"1727":2.9484194191845794,"1728":0.07593202730334371,"1729":1.657768207128445,"1730":-1.9220149470301324,"1731":-0.5250299700289373,"1732":2.389263108808738,"1733":5.23348458471186,"1734":2.072966710338989,"1735":-1.3950851424277115,"1736":-0.9038761153725946,"1737":-0.9005126953046965,"1738":-3.055946091947108,"1739":2.0544642428360307,"1740":-0.8846489319497355,"1741":4.263129628822539,"1742":-1.9483705944449163,"1743":-1.4858846537348518,"1744":-1.2200503227354007,"1745":-3.6095432315625438,"1746":1.384335276778533,"1747":-3.270160749531831,"1748":-4.37685537045598,"1749":-0.2670533571093521,"1750":0.2584482826138587,"1751":-0.20329695244973517,"1752":-2.956204592214078,"1753":-0.994347151539876,"1754":10.21971083248167,"1755":0.3113671103963739,"1756":-1.2482321169027457,"1757":-0.7081590575190316,"1758":1.2112215504699104,"1759":-0.762371512417185,"1760":1.834953035783505,"1761":-4.93362291932494,"1762":-0.3440584608965805,"1763":1.4013718763198328,"1764":1.584509696275672,"1765":-0.34523765665564454,"1766":-1.4359739623871388,"1767":1.6811182113499323,"1768":2.472067315043197,"1769":1.531714063335573,"1770":1.5136327301981087,"1771":1.1838786837326274,"1772":-0.8758943894293207,"1773":2.7747900229437943,"1774":0.762090037098641,"1775":-4.076561367855272,"1776":-2.7352281177271633,"1777":-1.8769328037184747,"1778":1.8948624386807733,"1779":4.137403501810433,"1780":-0.8328137001019001,"1781":6.413786485223573,"1782":5.513353620583527,"1783":1.7817128254276198,"1784":-0.23638484531121612,"1785":-1.2359504204722367,"1786":-1.363702912588658,"1787":-5.449397123668984,"1788":-1.8930108471731255,"1789":-2.8520022327173318,"1790":0.14790851293806254,"1791":-0.9812797258214946,"1792":-1.9828802637253178,"1793":1.7290170580747177,"1794":1.6461990222698502,"1795":-0.6617142123077677,"1796":-3.466307107045331,"1797":2.5199846145981364,"1798":1.4524276568845607,"1799":0.8835044348918993,"1800":3.1726595561078956,"1801":0.14611907233333632,"1802":4.946613123033519,"1803":1.9500753639267072,"1804":3.798822681105352,"1805":-1.2056959283829383,"1806":-3.5767601251705865,"1807":-2.5591066326134246,"1808":-3.384620079954752,"1809":1.7279659798650575,"1810":-0.7198610904592261,"1811":3.8977626458266985,"1812":1.7050719119488373,"1813":0.16549785952794066,"1814":0.4325818820149847,"1815":-2.654428249262137,"1816":-2.3594602341149042,"1817":0.28908596683301097,"1818":-4.420800357056564,"1819":-0.47444456548618397,"1820":-0.6545772101930314,"1821":-1.7617059418444923,"1822":1.4125501882843148,"1823":2.0706382373543057,"1824":-2.5870232478511386,"1825":0.3705955600121367,"1826":-0.38807105313124457,"1827":-4.873239935633285,"1828":-4.6315041082507085,"1829":-4.2711285516469255,"1830":-0.10395198354851866,"1831":-1.7703762778133,"1832":-1.306611611107063,"1833":-3.554111626767336,"1834":-3.3067338587478234,"1835":3.2776247915398597,"1836":2.2318320832244334,"1837":-1.5405227551766698,"1838":-2.2603565449180474,"1839":-0.30973373770188994,"1840":-1.1771902764106266,"1841":0.7598359098293131,"1842":-0.3870573999896574,"1843":-1.7108576623216571,"1844":-3.148532656450419,"1845":-0.6764459166336844,"1846":0.8535860189855173,"1847":2.7022720316407196,"1848":-1.2934329441020032,"1849":-1.7527083672153554,"1850":-0.682148280857677,"1851":0.24828942515763328,"1852":1.7887501099546803,"1853":0.7884749411603326,"1854":4.0296096573525775,"1855":4.140954052175015,"1856":-0.7791617820092341,"1857":-0.2584524363427825,"1858":6.776519949240771,"1859":6.950904302278288,"1860":2.682720725653526,"1861":-1.9743402931904248,"1862":2.607680539271447,"1863":0.06012141243909666,"1864":-6.626907148198322,"1865":-1.8082320620375807,"1866":0.6927986134277762,"1867":-2.1676751649928607,"1868":-1.4346086123031891,"1869":-1.7344619820661547,"1870":-0.8160438894914283,"1871":-0.3960781919970463,"1872":-1.5509625748344236,"1873":2.2246874255492886,"1874":1.696179482155211,"1875":2.3131530244419647,"1876":2.057750769633902,"1877":-3.449788668603296,"1878":2.5092601918907307,"1879":1.0785033018586458,"1880":-2.3162094948294336,"1881":0.45689608720096203,"1882":-1.7990125927934015,"1883":-1.6218351440922056,"1884":-7.677032830815633,"1885":-4.836173435131845,"1886":-3.0924676866801253,"1887":-4.305449285874837,"1888":1.5481577264212958,"1889":2.4678424074231793,"1890":-0.5979630948357118,"1891":-2.355489524096977,"1892":-0.45197651760872476,"1893":-2.2300858921572875,"1894":3.0423767144407936,"1895":1.0690605762132896,"1896":-1.7937558730693903,"1897":-1.1766138391813505,"1898":-0.7314273709474434,"1899":1.208069580494033,"1900":0.7808846988833671,"1901":0.2636022425286427,"1902":3.6026738640381115,"1903":-0.8061937858017696,"1904":1.0514034412845457,"1905":1.311301228087006,"1906":-0.944989817497881,"1907":-1.5216749778082774,"1908":-1.648666801013114,"1909":-6.982682336741551,"1910":0.21975827100152295,"1911":4.6656649164059765,"1912":3.167864428928685,"1913":-2.1618986259163586,"1914":2.998738607564934,"1915":-1.5939833337264562,"1916":0.5515666124690427,"1917":1.3323582345729397,"1918":1.361036387363603,"1919":-0.6001209595550937,"1920":-3.1598101255265565,"1921":-1.6130396286608266,"1922":2.1522665112966695,"1923":0.5692959708154036,"1924":1.9110911219357265,"1925":0.6182442293853246,"1926":5.108925553830404,"1927":3.819888478936757,"1928":1.2440341005476199,"1929":-0.02222793119776367,"1930":-1.312191797122312,"1931":3.0741956732420657,"1932":0.05824845903478719,"1933":-3.860504000679043,"1934":0.47110284838586985,"1935":2.430793494935693,"1936":3.6312368766822964,"1937":-0.5520116075416013,"1938":1.4496117363545642,"1939":-0.34886662596519746,"1940":-0.5161668670094623,"1941":-1.1548910528317131,"1942":1.1685970272593391,"1943":-0.5380682816952818,"1944":1.204868216074985,"1945":-1.8208402269373594,"1946":0.3978391320310037,"1947":-0.4445789779636031,"1948":1.1268737224687404,"1949":1.515634620558529,"1950":0.7800054711792223,"1951":-2.838110624903852,"1952":-1.5548203454241547,"1953":-1.7756376053514562,"1954":1.0751835493494772,"1955":-1.8529462466041802,"1956":1.775323499272121,"1957":-2.229540216733316,"1958":-6.242039352064176,"1959":-5.025314692304924,"1960":-2.4299951921459413,"1961":-1.5950979221059258,"1962":2.407005893995572,"1963":3.505238880987379,"1964":4.789092294542891,"1965":-0.3272608432116538,"1966":0.7567319208174809,"1967":1.709222996376704,"1968":-3.985438957754508,"1969":-2.122172620020453,"1970":-2.0721992815826287,"1971":1.9118154760729724,"1972":-0.9615401689830361,"1973":-0.920588186820064,"1974":-1.7081648213448735,"1975":2.6615077041363535,"1976":-2.2810330763849973,"1977":-2.7485296974628115,"1978":0.5973922781881099,"1979":0.9950371488818414,"1980":-0.966498487396172,"1981":-0.1289013409577693,"1982":-3.315939881922809,"1983":1.5272771886741152,"1984":-8.177532796206625,"1985":-2.614215957848821,"1986":-2.1282553806106868,"1987":3.1728725032045704,"1988":-0.5817936703035552,"1989":-2.2636947811849484,"1990":0.6706874937781734,"1991":-0.8109748814280211,"1992":3.7875692555670772,"1993":-0.5985168941860155,"1994":-2.185878080928974,"1995":-0.09228209131307342,"1996":2.666865341692212,"1997":-0.2365567120320066,"1998":3.4180842090059604,"1999":-2.193022508107972,"2000":0.7727915236674334,"2001":1.1485888381623532,"2002":2.25869994187929,"2003":-0.35131002162400443,"2004":2.9042411539132167,"2005":4.259935889255852,"2006":3.862258196644587,"2007":3.2230256792234013,"2008":-1.7369221705831208,"2009":4.1844479824921335,"2010":3.464982551263125,"2011":3.462624083371719,"2012":1.5685419583916367,"2013":-0.005852455243952848,"2014":3.5332839050757006,"2015":0.3982682275227457,"2016":1.6225015665396234,"2017":-3.0196742425849417,"2018":0.11375162904843705,"2019":4.410140911342747,"2020":3.143990758347775,"2021":2.9481121931650365,"2022":0.2776844441477411,"2023":1.74445178965741,"2024":1.9257248513743161,"2025":3.3690601893535406,"2026":3.0883134248569886,"2027":0.05287319340381891,"2028":0.33107119854323835,"2029":-2.670093641253074,"2030":3.24837511767306,"2031":2.0992876557694173,"2032":-0.4777242364667755,"2033":3.4134596633234957,"2034":-2.068855509926789,"2035":5.214416112914395,"2036":2.0462662727977756,"2037":1.0147430838110256,"2038":0.27401172565903376,"2039":3.132138944920353,"2040":-3.482243128457271,"2041":1.6149241637133667,"2042":0.519253557650071,"2043":0.027029436911530317,"2044":-0.028618949682287707,"2045":-5.459692212590129,"2046":0.1911389362984459,"2047":-0.7813243438209266,"2048":1.1311266332369314,"2049":0.9141855337868702,"2050":0.6709934473497279,"2051":-1.3133891184186814,"2052":-0.5156405967557093,"2053":0.5057062513077217,"2054":1.380866325668851,"2055":-0.6756389519129898,"2056":-3.3821049144223196,"2057":-2.9737142020717617,"2058":-4.304649150545979,"2059":-0.1145614726996016,"2060":1.5907402422680879,"2061":-3.1345034615412612,"2062":-4.887406450065384,"2063":-3.017741649460873,"2064":-2.436942987389461,"2065":4.49497750066572,"2066":-2.544632140183701,"2067":-2.553145255642751,"2068":-3.6535860049895983,"2069":2.6899975034551784,"2070":0.23621943330582484,"2071":-5.07778120836197,"2072":-3.316778948700732,"2073":-3.3431237337449184,"2074":0.3556553450963761,"2075":-0.7927480971163615,"2076":-3.4559382374048737,"2077":-3.1321197728898484,"2078":-3.0015235019822875,"2079":-0.30790711077153815,"2080":-1.1074347331013232,"2081":-2.1500790584515195,"2082":0.6322262453616124,"2083":-3.0358093986456653,"2084":-3.847028149521107,"2085":-3.4778712607311375,"2086":-4.190538359548286,"2087":-2.4456320054668392,"2088":-2.6405083400099,"2089":-2.3290685773021926,"2090":-0.8868680288184999,"2091":3.887368552135823,"2092":1.2831798239378918,"2093":-3.154290774064701,"2094":-2.055799492816548,"2095":-2.3868195924400673,"2096":-4.360793580866089,"2097":1.1439932170647553,"2098":1.627861849572595,"2099":0.41259549515264377,"2100":-5.0411920850036385,"2101":0.19878011848160576,"2102":-0.6158300613158497,"2103":2.2461374419748874,"2104":-1.0588324503889799,"2105":-0.24088098035316213,"2106":-0.5358971028041509,"2107":2.5182798478575634,"2108":2.1419298264319586,"2109":3.49904066669386,"2110":2.931870583658852,"2111":-0.5129166322522097,"2112":-0.2626691578547449,"2113":2.7530075822314295,"2114":3.0285237679573864,"2115":0.9843868331376889,"2116":1.153499233058888,"2117":4.219577242045802,"2118":-4.09112955236525,"2119":6.439433395878304,"2120":1.7109993328291464,"2121":2.2645909521743812,"2122":2.3403143234495962,"2123":0.38869745502736613,"2124":3.3505023901535873,"2125":0.044641085882746664,"2126":-1.2681138586936185,"2127":-0.4737927989728625,"2128":-1.9034467943317817,"2129":-2.369563546677504,"2130":-0.5161235045742878,"2131":-0.5306507393726414,"2132":1.4048592247934646,"2133":-0.09479461669630704,"2134":0.9624546909573186,"2135":-0.3528304624589685,"2136":-0.2911973818697277,"2137":1.3815265474104859,"2138":-1.0923891387016227,"2139":2.2423423003948186,"2140":2.1569838012828746,"2141":1.558571676822743,"2142":0.20537893256670753,"2143":2.0939420426879902,"2144":5.581279346426725,"2145":-7.964089159532528,"2146":0.019301062588694733,"2147":-0.3291022595615165,"2148":-1.0994423443630212,"2149":6.4920705431830585,"2150":3.9985912328414384,"2151":1.8125236498178043,"2152":-0.2816971103070886,"2153":-0.9268693192423381,"2154":1.9136581243479935,"2155":1.6509968904648182,"2156":2.246010993007797,"2157":-0.02705501606071901,"2158":-0.7302180413707975,"2159":-0.2949083844413593,"2160":1.1297515401173712,"2161":-0.44100093758398046,"2162":-0.34102495698979435,"2163":0.10308974168280734,"2164":-1.2651570965147414,"2165":-0.9315851776051549,"2166":-0.7927443902728659,"2167":-0.959829257272662,"2168":1.1334656417952058,"2169":-0.6525252228387264,"2170":0.31561519184011677,"2171":-0.8781123440270242,"2172":-1.198610781490917,"2173":0.16535481927085355,"2174":-12.025202927695108,"2175":-2.15684069486902,"2176":-2.223607192335822,"2177":0.37526505640753033,"2178":1.4223701186649629,"2179":2.2215628162117036,"2180":0.2877272518147841,"2181":-1.5551175185973414,"2182":-0.9946082812025748,"2183":0.09750462954549663,"2184":1.4285806621638313,"2185":2.7702069012884794,"2186":2.869131540718531,"2187":-2.176199063707382,"2188":2.0354053278061834,"2189":-0.15556170572528435,"2190":1.4148234413607874,"2191":2.487419172471137,"2192":0.5910148862676382,"2193":1.8754819501608955,"2194":5.819274154832697,"2195":-1.043673101737649,"2196":-0.5356667549597663,"2197":-2.2986021575342144,"2198":-0.5504393655467628,"2199":-1.3836000325347653,"2200":-0.5921525637623387,"2201":-3.608852019049184,"2202":-2.6056234272565937,"2203":2.125065355345137,"2204":-1.9100656253398987,"2205":0.49263076974197856,"2206":-5.342439123403595,"2207":-0.6745513301437716,"2208":-1.3575288649745854,"2209":-1.4811151629375257,"2210":-0.5624333090666122,"2211":-4.057673025595455,"2212":-1.138722138994092,"2213":1.137056268330495,"2214":2.1996607501927796,"2215":2.504027633629195,"2216":-1.7527060331841058,"2217":3.552928552125533,"2218":-2.3129258912901407,"2219":6.621051335288329,"2220":-0.5366026129581464,"2221":-0.25888151597692527,"2222":1.5884790885441606,"2223":3.8984002310743042,"2224":-0.8362391628858972,"2225":-1.2223584656617805,"2226":-0.5707345784111167,"2227":-1.4704133435570912,"2228":0.2451739336491535,"2229":-3.101338412366491,"2230":-1.6517660004518053,"2231":-1.6483851328797625,"2232":5.98353895417644,"2233":2.3719484552218018,"2234":-0.1778347382215801,"2235":-1.6747078460957632,"2236":-3.6593290912224736,"2237":-0.1406662684556022,"2238":0.49007301427844213,"2239":2.1775340216698496,"2240":-0.705748916544845,"2241":1.073526200827766,"2242":-0.009987455329693504,"2243":0.13427437036377182,"2244":1.4704606620705447,"2245":1.943291936423098,"2246":1.930980597011241,"2247":0.5577607510089574,"2248":-0.9984076718065228,"2249":-2.056970540523284,"2250":-0.3579162714769216,"2251":2.180464637816898,"2252":1.7731149910248842,"2253":0.0816883705986654,"2254":1.493322337648596,"2255":0.7591959621844057,"2256":0.9207045952906473,"2257":-2.0069472355300215,"2258":1.7162524580015288,"2259":0.64656444721473,"2260":3.633465721904076,"2261":-1.052604945533235,"2262":3.7490400274752047,"2263":0.650583315668585,"2264":-0.5182831298021289,"2265":0.8114209362146789,"2266":0.11809355256933213,"2267":-5.985553842947244,"2268":-1.2008774666943312,"2269":-1.0188475935656498,"2270":1.1366436799612865,"2271":3.272144432928612,"2272":2.915940188111515,"2273":0.5884973269368095,"2274":-0.04974469011300031,"2275":1.9986220135574824,"2276":-0.47541580851698745,"2277":-1.5959275975560478,"2278":3.299453405569844,"2279":3.7858612028534173,"2280":-0.24333054914603547,"2281":3.7024520005701955,"2282":-0.17826939713691253,"2283":0.9267510827752319,"2284":0.5784404212515399,"2285":0.25570400471723925,"2286":0.6777125811321316,"2287":-0.6438217598302651,"2288":-1.0277852455429974,"2289":0.44752059907534103,"2290":0.5920272722011557,"2291":-0.008891911020114331,"2292":-1.263182790612434,"2293":0.885876717250752,"2294":-2.088008004509003,"2295":1.6840774655764779,"2296":1.7562235930818075,"2297":-3.3466028835849384,"2298":1.084349386878261,"2299":-1.1624543123407824,"2300":-5.952952704929209,"2301":-3.4477180923594357,"2302":-4.983591968929156,"2303":-1.4493302953281884,"2304":-1.808434284459666,"2305":0.9603110764541525,"2306":-2.5901646532427347,"2307":2.8967030407874246,"2308":1.2493901602204738,"2309":3.1137254549944666,"2310":-2.5609058162109264,"2311":-0.6065232461114529,"2312":0.8543175355993959,"2313":0.3228813618695871,"2314":-1.076758241591376,"2315":-0.5810354558715174,"2316":-5.357376674408935,"2317":-2.566985053959928,"2318":-2.5719952772078143,"2319":2.2920613693488505,"2320":1.6903498362366034,"2321":0.18741201089805948,"2322":5.534977627959552,"2323":0.7853248365260361,"2324":-0.7707338413434639,"2325":-6.282283258507139,"2326":2.3278507074166135,"2327":0.8161142154362804,"2328":0.9691923109633924,"2329":1.2286823222950705,"2330":-0.7698396881174359,"2331":0.8417547745653644,"2332":1.2475227938903042,"2333":1.5682081096755556,"2334":1.2354732063105376,"2335":0.8407397986456578,"2336":0.23549023786270798,"2337":-0.6920203812055791,"2338":-0.4355043806225341,"2339":-0.8429265297720329,"2340":-1.7962937819941867,"2341":-2.5440824741321304,"2342":-1.6031823702611245,"2343":-0.589604218648372,"2344":-0.58225216384377,"2345":-6.497281986473492,"2346":-0.1859453474733915,"2347":-3.3098828912373905,"2348":2.5400143138935602,"2349":2.7922557925730036,"2350":0.3091321286458554,"2351":-0.012941478797042992,"2352":3.77967481504382,"2353":5.164513148228868,"2354":1.6104893598634211,"2355":3.286391251453867,"2356":1.6066108386414317,"2357":2.851656150664826,"2358":0.4321900580233349,"2359":1.5299710187742435,"2360":1.0853122133831203,"2361":1.2427524000835117,"2362":1.429838665736613,"2363":-3.3169737746800734,"2364":4.079748000074865,"2365":-1.168091914890961,"2366":0.6374925484877235,"2367":-0.35405782617482057,"2368":-7.9058822905434525,"2369":-3.0346049225331586,"2370":-1.5194565426093611,"2371":-0.5516854068104527,"2372":-3.8688198707759005,"2373":-4.45118787128347,"2374":-1.700201149741892,"2375":0.30094748168874297,"2376":-2.3250736883831986,"2377":2.6363151523686006,"2378":0.04586771936196909,"2379":0.6210451420659614,"2380":0.09961957333805575,"2381":-1.1196131847733024,"2382":-0.16080767243091537,"2383":0.563625187676567,"2384":1.3870334292745374,"2385":0.6916367972942327,"2386":0.7651653785009589,"2387":0.4723814147282118,"2388":1.4927721595448789,"2389":-3.156974838991648,"2390":0.8404901138575425,"2391":-0.609338192875043,"2392":-1.1814111324970764,"2393":1.2087860210004784,"2394":-0.24242810828483433,"2395":0.12633634458898274,"2396":-1.031259384759105,"2397":-0.004445720993490301,"2398":-0.29458285277790147,"2399":-1.9762636773957563,"2400":0.5039214800330584,"2401":1.280618181248341,"2402":0.1419380293244581,"2403":2.2854709967979416,"2404":0.10304959992875967,"2405":9.671926781032152,"2406":8.739473690148515,"2407":0.4677504257835688,"2408":-0.6419991995947265,"2409":-0.8374558428158105,"2410":-7.766994086437314,"2411":-0.5392856277301485,"2412":1.2985604444192307,"2413":-0.12263312537428704,"2414":-0.015573548659156234,"2415":-0.8390858348325759,"2416":-1.227314416550631,"2417":-0.5254091192202038,"2418":2.2846159196070115,"2419":-0.9443753732650703,"2420":1.7173181064624934,"2421":1.8682960309357854,"2422":-2.179370791200713,"2423":1.5907154638593284,"2424":-1.0469210243010683,"2425":3.556665925613837,"2426":-0.19593933792846358,"2427":0.2751745964728899,"2428":-2.165215453239783,"2429":-3.53012490935711,"2430":3.4270841719228016,"2431":-2.5292497632768853,"2432":6.478512385683319,"2433":0.19854042652513032,"2434":-6.770459034800383,"2435":2.851805004698713,"2436":1.0930121297637372,"2437":-1.1945958566186505,"2438":-0.9471097798703476,"2439":0.6031066494266449,"2440":-2.317836039516796,"2441":0.2572758420211313,"2442":-1.68995598281444,"2443":-1.3126444087980977,"2444":0.9367449774653733,"2445":0.508651089178217,"2446":3.4836360963331567,"2447":0.3318727036997112,"2448":-5.064944070491586,"2449":-0.34554952134439815,"2450":0.2836704262393363,"2451":2.847931302519721,"2452":-4.688860737324752,"2453":-0.29085986070295267,"2454":1.2965799243822105,"2455":1.9785033646488315,"2456":-5.118680983114206,"2457":-1.6601284761276347,"2458":-4.706103595391981,"2459":2.502637557146663,"2460":1.4031039263271694,"2461":-2.8636868673363023,"2462":4.262778822225164,"2463":2.277898125667915,"2464":2.4530215532630124,"2465":-1.0320655950179727,"2466":-2.5557054096972602,"2467":-3.3676967652413756,"2468":-1.6578694383845436,"2469":-0.7770806666843857,"2470":-0.6196776776923686,"2471":0.22515471772423848,"2472":2.4514503454312515,"2473":0.9814309517415543,"2474":2.1265072541153094,"2475":0.44365541223989596,"2476":6.628531891673429,"2477":5.955211880135245,"2478":6.82901181813592,"2479":2.829445266204602,"2480":0.0820220619286704,"2481":0.4386896791579156,"2482":-5.810904467298456,"2483":-4.220445600052043,"2484":0.5279215463089031,"2485":-0.13221892647559974,"2486":-1.1557051746826916,"2487":-0.6638806042268117,"2488":0.17496470838664002,"2489":-0.2658392065133251,"2490":0.7866775261248969,"2491":0.08686765228173708,"2492":0.27026195064337033,"2493":-0.6940978029735978,"2494":1.0155882057789993,"2495":-0.1370117280768072,"2496":-1.9725745262959937,"2497":2.57785506623015,"2498":0.1852918133530177,"2499":2.3785147922633105,"2500":1.8744563365340698,"2501":-3.36533605570648,"2502":-0.34340780103133006,"2503":-0.18831468742823135,"2504":3.255403864395097,"2505":1.4442563910705577,"2506":-4.055985603104229,"2507":-2.4959500800449255,"2508":-4.120093122575456,"2509":1.9459385129711513,"2510":2.9769842137519023,"2511":-3.2513412755519755,"2512":0.9429698485862865,"2513":-1.7214024391877991,"2514":3.4201540317804,"2515":3.307589310975692,"2516":-2.792079131628199,"2517":-0.8761237062903772,"2518":-0.8436998508503116,"2519":0.39741308610588405,"2520":-3.123972390175584,"2521":-0.9282668195556935,"2522":-0.06656228604015899,"2523":0.3226218638352146,"2524":0.1999343343657592,"2525":0.4672689588488808,"2526":-0.2123939124878444,"2527":-0.5618334887410026,"2528":-0.9420267117373577,"2529":2.5049711818247156,"2530":0.98053208766477,"2531":0.6496049268052358,"2532":-1.227896485531355,"2533":-0.894739751278706,"2534":1.4150743033875888,"2535":13.811369949803753,"2536":-8.059128176190034,"2537":-0.43448380205073167,"2538":0.14580263418494271,"2539":3.7205765263502584,"2540":0.9751067048808427,"2541":0.5200787716026326,"2542":0.5741847241689308,"2543":0.059223775008445084,"2544":0.6210339392937558,"2545":0.41026199038836425,"2546":0.44534193501718916,"2547":0.20434354710709302,"2548":-1.0797218378841555,"2549":-1.2905384734893004,"2550":2.075456583338012,"2551":5.7965237314848945,"2552":2.9267715986832985,"2553":4.87977561419638,"2554":-3.353530899014764,"2555":1.2106435028811116,"2556":-0.623956364937946,"2557":-1.3003981637758946,"2558":4.714118886056824,"2559":1.2507208199259403,"2560":-1.1687842231568732,"2561":0.20914137241300257,"2562":2.576099776400409,"2563":1.1133887553676018,"2564":2.800037464719004,"2565":-2.41171524492837,"2566":-1.357201055805874,"2567":1.7265212314932747,"2568":1.0924447986798724,"2569":1.2284699476439394,"2570":-1.4140109857709582,"2571":-1.7906192781693642,"2572":-1.0905929982142526,"2573":1.1621401067441033,"2574":0.48953219948846244,"2575":0.27594784974735015,"2576":-1.274016027131979,"2577":2.0879570189221113,"2578":0.10792554724772116,"2579":2.0026405238045144,"2580":0.5106143555005933,"2581":2.2621787517845444,"2582":0.5870112709589065,"2583":-0.4466192842023629,"2584":1.2910496248895387,"2585":-0.16862559334909377,"2586":-0.18831692932395394,"2587":5.118590473169265,"2588":5.088254151574484,"2589":-1.2286838775188011,"2590":3.4657197903412196,"2591":1.7536313589615335,"2592":7.363171769218375,"2593":-8.033666740152325,"2594":-1.3561932282076623,"2595":1.1285755419101389,"2596":-1.1121923420087407,"2597":1.9001699025323544,"2598":-0.5836117844920405,"2599":1.9876411018502176}},"b1":{"n":100,"d":1,"w":{"0":-0.6368083528048403,"1":0.6280452077143005,"2":4.066692439060908,"3":3.067067537867292,"4":-2.585599904591403,"5":1.6822191411849858,"6":7.28657675720245,"7":-6.272588086754009,"8":1.3054113234406635,"9":-0.413573115047001,"10":3.8682171401145506,"11":3.6664598708941476,"12":5.18796518982214,"13":-2.255911809884993,"14":0.8086884232686538,"15":-5.026814215923765,"16":-4.30685638071191,"17":-9.997648073684402,"18":4.731468004500242,"19":-2.6248512172753515,"20":0.46949357428438243,"21":-4.596170979571118,"22":-3.0709091707406073,"23":-3.903828508667496,"24":-2.84902389854567,"25":1.1269615746562092,"26":1.4015234862541968,"27":5.061797600666158,"28":-7.768218340124737,"29":1.0569795930955028,"30":3.7013062901997027,"31":0.6252284255961814,"32":-1.5839186733221977,"33":-2.414001749413486,"34":4.311109016831646,"35":-11.32553044446382,"36":-0.5040264118873711,"37":-0.10314460238558748,"38":5.445450597010178,"39":8.608917017730258,"40":-8.88905658268702,"41":-10.065841916502379,"42":2.057121931153479,"43":-0.4434688241251419,"44":0.9889532946137664,"45":0.23798281495595558,"46":-0.9684926338399535,"47":0.8733183508385982,"48":-6.667385383866112,"49":-3.8334752414277617,"50":3.934254546791752,"51":-8.152738368764181,"52":-2.7318844958276363,"53":-2.8406533271443264,"54":-1.4020237375551827,"55":-0.757356047089217,"56":-6.347658631450106,"57":-0.17511341233880773,"58":2.6175970157221746,"59":1.0766611474621761,"60":-3.983136558824584,"61":11.625065989541508,"62":0.6572702829528657,"63":-3.1617772359339646,"64":7.355541433817464,"65":0.3482634355592147,"66":0.3778725116832111,"67":-2.362041571537032,"68":5.753679445726626,"69":-1.7716448946285226,"70":4.001491238751097,"71":0.993288377206187,"72":2.6178537378317084,"73":-0.7287533286543028,"74":2.737895303006625,"75":2.663433332653454,"76":2.5519427269753683,"77":2.0092514545909914,"78":1.9668139469107373,"79":-5.768903133175919,"80":2.7024410469845517,"81":-4.688902405468023,"82":-0.2181059126040068,"83":9.495662314114913,"84":-1.406642029183317,"85":-3.1467365129430713,"86":-3.4268407284052183,"87":-7.77356970895496,"88":-5.9230227852688895,"89":0.841687798207114,"90":-0.685086379018929,"91":5.540404504470836,"92":5.362340360601585,"93":3.58930795067499,"94":0.707068597774121,"95":1.2007353212926797,"96":-2.047099955048824,"97":-10.992202848002007,"98":-3.2375831526919936,"99":0.6598490413496284}},"W2":{"n":4,"d":100,"w":{"0":0.12871950664078313,"1":-1.4844967974400847,"2":0.5789316035338521,"3":-0.2449599810503086,"4":0.14153874021560003,"5":-0.07888383165599708,"6":0.6188499920795631,"7":-0.8599960978010731,"8":0.21390779683073358,"9":-0.6130093345504083,"10":0.4029202734434017,"11":-0.6123390597889325,"12":0.8830225251716612,"13":1.4996260711735485,"14":1.0167288958120368,"15":-0.6651483353136051,"16":-1.1066524090588068,"17":0.05643265405390541,"18":-0.26053104213495054,"19":-2.6781611336686315,"20":1.409278754829415,"21":1.098221553419297,"22":-0.2231649951585809,"23":-0.113377547345678,"24":1.5729086007407491,"25":0.33135425053015044,"26":0.34948800826977944,"27":0.5151107062607616,"28":0.22725552273759952,"29":0.5981644631949292,"30":0.6965209000083238,"31":0.37216932791506013,"32":-1.3146993148885582,"33":-0.24932599284625948,"34":1.6887055487415046,"35":-1.1346007502238726,"36":-1.3451968151795872,"37":-1.2167641138239569,"38":1.141608749136672,"39":1.3101884491754814,"40":0.19394989774570795,"41":-0.3953995445250955,"42":0.2825801343932127,"43":1.8764921255716538,"44":-1.4338815797830429,"45":-0.9164108484606243,"46":1.5888769667010019,"47":-0.13207946759478612,"48":-1.504993907462999,"49":0.3086614712688007,"50":1.2161675485745234,"51":-1.624058862916979,"52":-2.550109765721939,"53":0.8122523212398507,"54":0.20186752132432542,"55":0.3963528714804274,"56":-1.019769180478784,"57":1.2454267600759183,"58":-0.6886525719675418,"59":0.399951009538904,"60":0.9247948196600103,"61":-0.002638393189286663,"62":0.5929364078888221,"63":0.1589396409064137,"64":-0.0920961510866861,"65":-1.5117306788758782,"66":-0.14690026054745653,"67":0.18723463190791748,"68":-0.09005424162335787,"69":-0.29051229970408393,"70":-0.008643756113043721,"71":-0.6454476493589356,"72":-0.3139080835441711,"73":1.1628619735881,"74":-1.6848072553746503,"75":0.16119271330874585,"76":0.5174580789483599,"77":0.5943372754841074,"78":0.9144145126666404,"79":0.2759885230735373,"80":0.540407100486863,"81":0.7610757011560803,"82":0.8704043506571435,"83":0.014790077336885582,"84":-1.9447676181786318,"85":0.7045231728874862,"86":0.0070693466124058975,"87":-1.2732542756813876,"88":2.372851102935966,"89":0.9300346272296899,"90":0.023385649319100466,"91":0.07291690458579149,"92":0.8766623335014574,"93":0.10244670295870881,"94":-0.3893069374821957,"95":-2.386905917200533,"96":1.6002032190021949,"97":-1.508411745632896,"98":-0.5214177845961318,"99":0.735069197964783,"100":0.005282341737612398,"101":-0.2681728797729169,"102":-0.24453688570485901,"103":-0.09955941022829053,"104":0.3381904428363319,"105":1.0123851971165,"106":1.0278199791421785,"107":-0.021737601660898512,"108":1.888827217966893,"109":1.7583806778586026,"110":0.07303996108862504,"111":-0.14144580036213253,"112":0.14115721097914347,"113":-0.2509244831432443,"114":0.9322345418375884,"115":0.7744710280770549,"116":-0.8644509826945257,"117":-0.2553125829765028,"118":-0.6391094695651436,"119":-0.6714735761704009,"120":0.6340430662924151,"121":0.4653073904947902,"122":0.21531454626664043,"123":0.3028708660357056,"124":-0.04703854307710496,"125":0.05026598260760067,"126":0.22377788743079408,"127":0.4339436506100186,"128":0.2865130494131403,"129":0.2854123866289223,"130":-0.11241494350487136,"131":0.01837149296123916,"132":-0.014247188272956677,"133":0.09794483133738821,"134":0.7130168947529146,"135":-0.08865503267863781,"136":-0.24505222847381372,"137":-0.22420919864446723,"138":-0.32866902313490315,"139":1.1500969728279824,"140":0.4306958474622119,"141":-7.984043696475472,"142":-0.4423317038960151,"143":0.09052409635300064,"144":0.3016818158460399,"145":-0.09018587281153764,"146":-0.3076815728630639,"147":-0.5142568845372649,"148":0.6731346604311189,"149":0.7505060033649396,"150":-0.29537833145703196,"151":-0.43051230208883023,"152":0.05903550221815493,"153":0.9799065341000904,"154":0.05904463450538698,"155":-0.9833045700533835,"156":-0.7358259001077354,"157":-0.5392502827243425,"158":-4.306263504427861,"159":-0.2100221122613092,"160":-1.42105986705905,"161":3.3678013948501024,"162":0.30247278244546844,"163":0.06141027735595105,"164":-0.09753603560954723,"165":0.12664596312911497,"166":-0.19103958441863922,"167":0.3356507526701849,"168":-0.37989526747511787,"169":0.11100532829255357,"170":0.13733827222042297,"171":-0.6649427945284775,"172":0.549638791682814,"173":0.19159101087240674,"174":0.7487852560531414,"175":-0.14787843369791237,"176":0.39103486631216455,"177":2.2118295652149857,"178":-0.07424371175914067,"179":-6.847744260576796,"180":-0.36779763967776186,"181":-0.178067022847353,"182":-0.5090187501224801,"183":0.6042215057068344,"184":0.05850166097373623,"185":-0.13487010555589238,"186":0.04381932212669806,"187":-0.33594349127967876,"188":0.28734434593560104,"189":-1.3271528609910181,"190":-0.33283818429552814,"191":0.5073475972055503,"192":0.15223321057149436,"193":0.13955997699533407,"194":0.2650988996923404,"195":-1.9145184348760256,"196":-0.37579077051183046,"197":-0.0735473357530106,"198":-0.43645529657194915,"199":0.9204427198073173,"200":-0.6003796327068962,"201":-0.5681567469200764,"202":0.42732380425756117,"203":-0.5413727314924639,"204":0.9622103912121603,"205":0.688333992394678,"206":0.5516052592254139,"207":-0.32982530321770587,"208":9.055905504986574,"209":0.5198772152068608,"210":1.3485146177246439,"211":-0.5039663717558291,"212":0.7036026669701383,"213":0.6899571684347674,"214":0.48965453039081747,"215":-1.2255921244886274,"216":-0.562308782983866,"217":-0.2296629601980858,"218":0.65692191721051,"219":-0.4175257181242568,"220":0.9152031020773873,"221":0.9186663490797318,"222":-0.6817597839920183,"223":-0.5773492173695285,"224":0.3798804883429978,"225":1.2458648072884229,"226":-0.289964893825871,"227":0.2906334478873367,"228":0.37246935861044994,"229":-0.4498629188046035,"230":-0.5891492092602262,"231":0.6677949733306368,"232":0.15796450570240608,"233":-0.38147887709309675,"234":0.27461860143523653,"235":-0.1922848576199536,"236":-0.3514920457451136,"237":-0.3437289493174012,"238":1.1907205898225606,"239":7.679425214477825,"240":-0.7293469713882973,"241":-0.47031350675705774,"242":1.8111981852392267,"243":0.7112430895411865,"244":-0.23097391538151252,"245":-0.4466676078710242,"246":0.16903453997457243,"247":-0.4052260983411663,"248":-0.27259226632878814,"249":0.3265409159633483,"250":0.2842412190740456,"251":-0.5381897611459351,"252":0.5157272637075802,"253":1.4876929425571885,"254":0.33173674673758086,"255":-0.2680305399657074,"256":-0.27403046689388866,"257":0.08366719694234305,"258":2.6449910187398684,"259":-1.0002475394701276,"260":-0.6823928474054275,"261":0.2315755514142291,"262":-0.6900535060155607,"263":-0.49411157569437036,"264":1.000416659831835,"265":0.32358477297925775,"266":-0.583379231505239,"267":-0.2929981652253986,"268":-0.9806511577134426,"269":0.3662414124211648,"270":-0.6841078318200241,"271":-0.584062913774471,"272":-0.17667414843838702,"273":-0.22008511900610916,"274":-1.4795440707005587,"275":0.5706687751237807,"276":0.40531400975217474,"277":2.277736466559928,"278":-0.8089875221112699,"279":-7.574095899965693,"280":-0.8469241080632173,"281":0.45460179349658575,"282":-0.8786838603469596,"283":0.17634630324579076,"284":0.3837588314256955,"285":-0.4429160774995708,"286":0.37295561434005986,"287":-0.37347281008575023,"288":0.8132354865155117,"289":-0.16042420022310522,"290":-0.5084490975085358,"291":0.5594206603624207,"292":-1.4078238064532818,"293":-0.4628067636696943,"294":0.21628534927859083,"295":0.05242782953026819,"296":-0.40001880622193,"297":-2.3734560839982386,"298":-0.4883270060913371,"299":-1.2200823095879627,"300":-0.3279907454892192,"301":-0.45604176687121456,"302":0.4325608717233908,"303":-0.07946661868732109,"304":-0.017927871112221133,"305":0.38472374305999724,"306":-0.30462330758481393,"307":0.4402929983944079,"308":4.893293206243045,"309":0.2870084445917142,"310":0.6319414265802337,"311":-0.03798641229603612,"312":0.17358503767666722,"313":0.24140119130201393,"314":-0.269977149098159,"315":0.2878475067967955,"316":0.04428718366994649,"317":-1.765956061132352,"318":-0.4386362317455544,"319":-0.05994223414289164,"320":-1.3365931394678385,"321":0.03364813878659899,"322":-0.299240585614072,"323":0.13953554785550282,"324":-0.028961728223170197,"325":0.13206330343706946,"326":0.03222301356917543,"327":-0.44584279522214004,"328":-1.5115735859568649,"329":0.062377690104834765,"330":-0.23129835918597907,"331":-0.36555040290422486,"332":-0.06423372626540279,"333":-2.453817759063053,"334":0.030673977287357494,"335":-4.415914510981239,"336":-0.17822410532865077,"337":0.16711724315957463,"338":0.6598912206933258,"339":-0.20647764691633136,"340":0.10055673872876249,"341":-0.1620164318820976,"342":-3.096606313861426,"343":-0.9856935783138622,"344":-0.03637959044899858,"345":0.2498306386051226,"346":0.23517816152723567,"347":0.011794345884600483,"348":-0.18990156756106147,"349":0.1394966776330358,"350":0.08786863631557465,"351":-0.33747108667212605,"352":0.5849318361547139,"353":-0.8189329991438493,"354":1.8683268639662327,"355":-0.07017068956127406,"356":-0.16072350153255816,"357":-0.40860503046641966,"358":3.730197192711479,"359":0.04951686164313678,"360":-0.09423364008928432,"361":0.06070304179269779,"362":0.2859296967002649,"363":-0.15748990326380463,"364":1.9341003342619785,"365":-0.15746093031615194,"366":0.27268994022816245,"367":0.1423160988235841,"368":-0.3549044547437002,"369":-0.3049144792005706,"370":0.07396943028460021,"371":-0.22068572476563209,"372":0.12692730022261542,"373":-0.16225421375240548,"374":-0.7939603503172886,"375":-0.14045264634257734,"376":0.09281858586514789,"377":1.6823950474865708,"378":0.060317371149093746,"379":-4.557717616912686,"380":0.04524352573666357,"381":0.12924611211165005,"382":-0.2808285708384106,"383":2.764239731197285,"384":0.3443509213774184,"385":0.008542346936572855,"386":-0.3887357203804043,"387":-0.4398791054709238,"388":0.2359427144009627,"389":0.0638595501705061,"390":-0.28894097459611895,"391":0.2864637962661823,"392":-0.0974619088085658,"393":-0.20814934178702654,"394":0.4926052182398759,"395":-0.2051047552109187,"396":0.19317313978482462,"397":0.08847430212671556,"398":0.11554081779283511,"399":-0.32243770676192607}},"b2":{"n":4,"d":1,"w":{"0":0.958937659059747,"1":3.7960602724483747,"2":-3.399670616823363,"3":1.4004244050814165}}}}
/* harmony export (immutable) */ __webpack_exports__["a"] = data;


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const data =
{"nh":100,"ns":82,"na":4,"net":{"W1":{"n":100,"d":82,"w":{"0":-0.04889790666997315,"1":0.6022596737324344,"2":0.2667856221576186,"3":-0.9867226970990195,"4":-0.6697895927376272,"5":1.117804234118775,"6":-1.313264968806956,"7":1.5692522528882076,"8":-0.10737499323824365,"9":-0.4127488358293407,"10":-2.083296997873677,"11":0.6356311479302896,"12":0.18637510492157275,"13":0.5909688855464315,"14":1.5683041015409525,"15":0.24400213951441332,"16":-0.3269944821067262,"17":1.3886832806519922,"18":0.00008295402570113694,"19":1.722279531915552,"20":-0.25281681094934094,"21":1.051084290019082,"22":0.2544054501942703,"23":-0.8351177293834487,"24":0.10823319109445712,"25":-1.0959723047822385,"26":1.2791271615099549,"27":-0.34254731658066045,"28":1.4356207553222005,"29":0.05348989015719875,"30":-0.5819655416372516,"31":0.6229077926763968,"32":-0.5111485399040228,"33":-1.8848075664323776,"34":-1.6564266517459898,"35":-1.2186823008821726,"36":-0.03698060916320685,"37":-0.1643460370761205,"38":-0.1610961248325486,"39":2.3280244051512553,"40":0.1531367636584381,"41":-0.39708316793977294,"42":0.8954724487854417,"43":1.900122112960759,"44":1.2187839734683923,"45":0.6483779131345896,"46":-0.9801433204708256,"47":-1.9001898353756965,"48":-1.801248786077492,"49":1.769590829530898,"50":1.5261352305216482,"51":1.2355389323015111,"52":1.3162969117211734,"53":0.18916758786624116,"54":-1.3030956017218676,"55":-0.49576911498382026,"56":-0.1901157558973541,"57":0.2683151868839434,"58":0.014765272666684742,"59":-0.08711326383222097,"60":0.6142323132044264,"61":1.2066724078865905,"62":0.43268583714667935,"63":2.3202526045563503,"64":-1.378077778526436,"65":-0.17685263774060694,"66":1.7321522269817853,"67":-0.19888725006982838,"68":1.2097139739145437,"69":0.9311809869929634,"70":1.7183862319805687,"71":0.5841660114876854,"72":-0.029132050283078924,"73":1.4813787325188645,"74":-1.3246792474712694,"75":0.9003614184553321,"76":-1.3943282303942348,"77":0.547969589269626,"78":0.2980636329266428,"79":-1.1597671620815753,"80":0.2141018214342329,"81":0.41417889072591685,"82":-1.5612876090045906,"83":1.074877567589261,"84":-1.4185326066766193,"85":-0.08995124461863566,"86":0.15723583538406996,"87":-0.5987317596810645,"88":1.1068977224477103,"89":-0.29558034625837193,"90":1.2019253474926408,"91":-0.003658820071114926,"92":0.11820075820586501,"93":0.46518289901910065,"94":1.4262176052782765,"95":0.42909129778237415,"96":-1.422684990418594,"97":-0.0776305991646076,"98":-0.062155141523129606,"99":1.0758082364175199,"100":0.18282823616272173,"101":-0.535352943862828,"102":-1.5437992568349768,"103":-0.3174527047126038,"104":1.177873771223637,"105":-2.7202553299141803,"106":0.42812862651529343,"107":-1.2899747488797704,"108":-0.5472380311447921,"109":0.21448355801864036,"110":1.0246300781326654,"111":0.17269112486928323,"112":-0.043294293517266914,"113":0.47047133810490827,"114":-0.4690268356332562,"115":0.38553254680432153,"116":0.761086979029745,"117":0.26017768043026257,"118":-1.0512572626382959,"119":-0.5926707175474252,"120":-0.7199679162190068,"121":1.6580489554275906,"122":7.592100025574379,"123":3.9556059965484867,"124":0.09714496597847562,"125":2.355319479094252,"126":-0.9556221358697019,"127":0.16614944683443067,"128":0.7673207478144601,"129":-1.496224645848457,"130":0.8045922209013863,"131":6.049759079552546,"132":-0.633756681071247,"133":1.1732918411317992,"134":-0.6220296594174024,"135":-1.4417603521610423,"136":-0.1569182863867655,"137":0.2603355758902263,"138":0.7114293501716984,"139":-0.4090069134828311,"140":-0.4705770159785766,"141":0.09400258005844522,"142":1.1184295555139165,"143":-0.03008002680888719,"144":-1.923003186928961,"145":-0.7481949826498492,"146":1.4039426149753365,"147":0.34789676706260475,"148":-0.14851854333542253,"149":0.14287213821538383,"150":1.1454773057170926,"151":1.5643128415385101,"152":0.7984395876424049,"153":-0.724995939185577,"154":-0.1772765579382326,"155":-1.4374308800195779,"156":0.9848601694909181,"157":0.29851099895968086,"158":-0.5127673791611133,"159":-0.5585219296616766,"160":-1.2468735955420895,"161":-0.8844635262893396,"162":0.10749384380246046,"163":0.02284707186541548,"164":0.677434997366051,"165":-0.05480020262899983,"166":0.32101229454205715,"167":0.11769351136414377,"168":0.052361024381133874,"169":-0.020631465508860004,"170":0.21735805766680993,"171":-0.3228526306190698,"172":-0.26498498885400473,"173":0.42019380193041955,"174":-0.23145643799014456,"175":0.040641514683149894,"176":0.845964732766038,"177":0.5471412400332094,"178":-0.027686543622001868,"179":0.35063170899299373,"180":0.4428501016598756,"181":-0.12812977739718012,"182":0.12006547901782497,"183":-0.5182743814349385,"184":0.5036011315444112,"185":0.37398253716439944,"186":0.505510367144286,"187":0.6240729689418262,"188":0.08368699269291938,"189":0.25478272488467263,"190":-0.26946568174119895,"191":-0.9743385931606849,"192":-0.2579028291754212,"193":0.17801408171759545,"194":0.23089324344073608,"195":0.3319485780863788,"196":0.2565126657913646,"197":-0.0919730000733949,"198":-0.1417050043537318,"199":-0.2446297188041963,"200":-0.2907847274546624,"201":1.0482022578436283,"202":-0.7444074941211373,"203":-0.4657636989677389,"204":-0.12222684094841495,"205":0.10225685596156599,"206":-0.42865480293240965,"207":-0.035542197278109366,"208":-0.23838038083179405,"209":0.26272045000392613,"210":-0.46802974365906785,"211":0.37815807058146156,"212":0.7585019923476722,"213":0.24489789892489502,"214":0.3101409987767419,"215":-0.16824395014572516,"216":0.40651380749330346,"217":0.5169489406858073,"218":-0.2752919268352539,"219":0.11919548565411105,"220":0.12422342051062454,"221":0.30116501505680743,"222":-0.03899041192640309,"223":0.49185559709968263,"224":0.4982724795772476,"225":-0.11802604486609658,"226":0.3586610815854135,"227":-0.2581450935510753,"228":1.2735417713184358,"229":0.05207333316508757,"230":0.5409781655025169,"231":0.5520749477248744,"232":-0.1463886099063626,"233":0.556561989749648,"234":-0.22442466927135934,"235":-0.006855278152024809,"236":0.4433827158258636,"237":0.4894465017400755,"238":0.08220269783369333,"239":0.18551541331918617,"240":0.1419205410455585,"241":0.2737478810741873,"242":0.5382948057750947,"243":0.07555516721731509,"244":0.1206140342290887,"245":0.1062983882175996,"246":1.0565286489607792,"247":0.47414978761280346,"248":-2.159610167807557,"249":-2.266268093121701,"250":-2.094896498356025,"251":0.768016801207183,"252":0.7339355448515817,"253":-0.4220618083908726,"254":-0.7230802602044084,"255":-0.4166448281431903,"256":-0.1837425751578488,"257":1.8380455924593033,"258":0.3411658975866239,"259":-0.5760293195541898,"260":0.1461124174476197,"261":-1.2969808895068091,"262":0.03615721604106031,"263":-0.4872002507372432,"264":-0.13900288227955568,"265":-0.1326563807369472,"266":0.851487699247952,"267":1.3329258606224546,"268":-0.5004798696160898,"269":0.24041357944964042,"270":1.9246080636660539,"271":1.4453139102840622,"272":-0.9106889632999653,"273":-0.7099583177893503,"274":2.2739805377483377,"275":-0.7349415942795592,"276":-1.0293461778736586,"277":1.4924281521307117,"278":0.7664484128219433,"279":-0.2990096195875501,"280":1.2515763396401138,"281":-2.00125034790451,"282":0.06118640282175848,"283":-1.0395595640943764,"284":0.10030947426497352,"285":-1.9508238188677138,"286":-0.264638730680042,"287":0.7461898033953143,"288":-1.524515696904213,"289":0.90811275789494,"290":0.6593095754130884,"291":0.6016080000784574,"292":1.9304990073703487,"293":-1.31962220323414,"294":-0.1907277195168832,"295":0.0765235633323862,"296":1.1891956121353644,"297":2.405378952158055,"298":-0.9360653342655768,"299":0.48337782426504294,"300":2.1449852031349987,"301":0.3464463448074302,"302":0.4136736844981546,"303":-0.9501370987731308,"304":-0.8383160803345078,"305":0.28187631640138966,"306":0.831427189686794,"307":1.227126295396723,"308":-0.2924208511453629,"309":-1.382964484418143,"310":1.8578164091687033,"311":0.3647735889908887,"312":0.030811566570136378,"313":1.0721094082830942,"314":-1.0315749962835723,"315":0.35236954967179507,"316":-1.296950198140058,"317":-0.021883174222318537,"318":2.9099210353555223,"319":-0.006327867452847323,"320":-0.2040784290159802,"321":0.6972879503997852,"322":-1.1182023965315986,"323":1.6735613921197956,"324":-1.1392898481056097,"325":0.6793993316858784,"326":0.1027451557965206,"327":-1.1078323991018837,"328":-1.2798976409078637,"329":-0.5343120923297278,"330":0.7642382444426903,"331":-2.5759734557918272,"332":1.7307058816606051,"333":0.46666575857301124,"334":-0.4928857107351482,"335":-0.7987504277976247,"336":-0.6351065345431871,"337":-0.11990539216076976,"338":-2.1301767082129013,"339":-0.23343255708687313,"340":-1.68955996577023,"341":0.4386923159154464,"342":-0.5600227228278063,"343":0.537891144762519,"344":-1.3480992763555295,"345":-0.018589679705599646,"346":0.6633296128469419,"347":-0.9016428507154476,"348":-0.12649571383310335,"349":0.5063825880940062,"350":1.710586005618682,"351":1.8416915505170521,"352":1.577782178301707,"353":1.3478149496564165,"354":-1.9149295862931348,"355":-0.6667275457628705,"356":-3.302477112630284,"357":-0.5666711173805505,"358":1.890328115273498,"359":2.9926073065659127,"360":1.7621228638923658,"361":0.6303274404099025,"362":-0.21942468746126476,"363":-0.09512861331873464,"364":-0.24176621113235633,"365":0.08660124225237777,"366":0.5109445360864926,"367":-2.030014874376896,"368":-1.328606721235416,"369":-1.6713232841213275,"370":1.87078289155372,"371":-0.9188918676451587,"372":-2.0012733695845393,"373":1.2513486781436318,"374":-0.2817990738645216,"375":0.31261767765855064,"376":4.082996760635953,"377":0.7868614586740681,"378":-0.19429604706543976,"379":-1.2117901557000097,"380":0.49404430808695116,"381":-0.6609483781614919,"382":-0.17192229547241697,"383":1.5579599096081582,"384":-1.3681480894397233,"385":1.6766033692206375,"386":-0.9357944008771235,"387":1.7751021555481028,"388":-0.26884513747862077,"389":1.191800532141603,"390":0.5135422805128519,"391":1.357285343799983,"392":0.06663245980564354,"393":0.300591987940929,"394":-1.4506698098996327,"395":-0.8018970439085858,"396":-0.09337229695735268,"397":0.7927787326314858,"398":0.618063735520954,"399":-1.321752383729883,"400":-2.1931270512662477,"401":0.5685195209301781,"402":-0.5919672673785882,"403":0.328434432407218,"404":-0.40202646194379393,"405":-0.5777350326917948,"406":-2.626173096504606,"407":0.34401413852930346,"408":-2.8868115949810695,"409":2.723899483457127,"410":2.498328456099277,"411":0.5797524689553031,"412":-0.4421822662054299,"413":-2.0426888189051504,"414":-1.3008113644259,"415":-1.2491020083410251,"416":-0.46838449907314345,"417":-0.9494329094848603,"418":-0.4417378269876825,"419":0.4119444530953054,"420":0.8609243056009394,"421":0.820654544532418,"422":-0.525363120368746,"423":-0.8601477613345774,"424":-1.5127522484572018,"425":-0.7666523560352395,"426":-0.479716013961506,"427":-0.7240583284808157,"428":0.27230356767703257,"429":-1.114831925182003,"430":-0.42360017520063187,"431":-0.03965405657458832,"432":-1.911785518225521,"433":-1.171591835913078,"434":-0.4384701315540831,"435":-0.3999881395629636,"436":-0.6498533877963235,"437":-0.003815735956611988,"438":-2.025859032864717,"439":1.4061397453175926,"440":-1.355561552310863,"441":-2.2412628329668682,"442":-1.527730796673099,"443":-0.2822532141075195,"444":-0.06799790335414731,"445":-0.5830189771774098,"446":-0.13924003605755994,"447":-0.3147001516170497,"448":1.9946610325645837,"449":1.2932378130208138,"450":-0.7965638841739618,"451":-1.285320665185211,"452":-0.34751456712413087,"453":-0.32563348519993607,"454":-0.7053808500002037,"455":2.2707944804973477,"456":-1.6211862292104415,"457":0.31457370605284846,"458":0.4002790103559207,"459":-0.004294549065251025,"460":-0.8138245948587196,"461":-0.9916812672336744,"462":-0.7458504931222227,"463":0.12460490279085736,"464":-0.39351908271294855,"465":-0.7089250670502502,"466":1.5324512557648644,"467":-1.26311256377235,"468":-0.9102895948904478,"469":-1.6872195343023524,"470":-0.3579568895528668,"471":-1.0286279701775078,"472":-0.7909445018059675,"473":1.3540337984749118,"474":-0.25464911565453274,"475":0.8412658685680428,"476":0.13130868690709255,"477":-2.1361497242341345,"478":-0.9555904941514005,"479":-0.9793463551834508,"480":-0.7174571188157447,"481":-0.9724611239385847,"482":0.787458572845378,"483":0.8461018619856324,"484":0.29236330938824634,"485":-0.2834186527905203,"486":-1.4788464633764589,"487":-0.6929630921415586,"488":-0.8884732011925306,"489":-0.7884540661768111,"490":-0.2362020656918714,"491":-1.9544512173074233,"492":0.6999235200882371,"493":-1.663670521412434,"494":1.156642599114395,"495":0.6435998331909707,"496":-3.439054813433996,"497":-1.1099217777615475,"498":1.8670186761107848,"499":0.051897578525056935,"500":1.6492191210573737,"501":-0.9965729798712591,"502":1.1843472315322052,"503":-0.7386830975433082,"504":0.6416489993886229,"505":1.7741795518769397,"506":-0.3178366119691117,"507":-2.123158989239394,"508":-1.696541985813734,"509":-1.6637598845541643,"510":-0.49332992390904445,"511":0.0749643858555335,"512":-0.15284430958760326,"513":0.8598413191529485,"514":2.663178500675168,"515":1.3321517688058542,"516":-1.3281144991176068,"517":0.07963891532769042,"518":-1.1338528724388592,"519":-2.1997541720771556,"520":-0.6390533436371658,"521":-0.033257044971447755,"522":0.4698144815716767,"523":1.6474708833859297,"524":-2.3433371651897876,"525":0.6852672992912267,"526":-0.0710902273337907,"527":-0.055431401030188,"528":-0.7152373830680278,"529":-1.2436509038497714,"530":1.7750488774826245,"531":-2.6803867180253853,"532":-1.0755156662766119,"533":-1.5125246714564171,"534":0.344073756646176,"535":1.622378459081876,"536":0.6747828034181457,"537":0.40390760651810204,"538":-1.8594413683014364,"539":4.58703165712603,"540":0.7497991653146706,"541":-0.4847746745277488,"542":-2.320591003851141,"543":-2.087417637489119,"544":-0.33613009502856,"545":0.37039324175104715,"546":0.23284315924815388,"547":1.6593134312519224,"548":-1.1409115335503586,"549":0.5850722274649587,"550":-0.3164702652326212,"551":0.8459994631089172,"552":0.8243297199697158,"553":0.3809069288534892,"554":0.693091040632489,"555":0.1749364002667365,"556":1.7586755388232602,"557":1.2388947243915627,"558":0.20239741151975607,"559":0.3590648045418326,"560":0.48987419826339385,"561":-1.6728663341590977,"562":-0.37241412918052796,"563":-0.061751639551669006,"564":-1.5869155911012878,"565":-1.4286707621176324,"566":-0.24170197544214755,"567":0.19111887482798304,"568":-0.8033274272408356,"569":-1.8432401458610834,"570":1.0806392216404088,"571":-0.033023727188015016,"572":2.282200515261407,"573":-0.5768922590520011,"574":0.4875888758056185,"575":1.150881421002726,"576":0.08416375839039633,"577":1.8511438237835416,"578":0.42127324665543076,"579":0.31042912992761024,"580":-0.10265825278093903,"581":-0.028533160514858002,"582":0.8839889083556365,"583":-0.6859573683972768,"584":0.1808986828011806,"585":2.5546104500344606,"586":1.4036366546505499,"587":0.2923373145000806,"588":-1.1688818465863313,"589":-0.5340970134986581,"590":0.7286127144683932,"591":0.46540151121088424,"592":0.9028324301934072,"593":-0.4110948613626751,"594":-1.1585657714614042,"595":-0.41209631390752455,"596":0.13779266225124315,"597":-1.3897124711615705,"598":1.4022056615997331,"599":0.07923851844399397,"600":-0.11446280515854795,"601":-0.07119357412027456,"602":-0.24398658252645086,"603":-1.1662483857348729,"604":1.9332470414619811,"605":3.0774273563516767,"606":4.316861837094208,"607":2.0377420372967174,"608":1.498107575885309,"609":3.482786400420721,"610":-0.8277476803238603,"611":1.0781532056515344,"612":1.4256611439966682,"613":-1.159270637863387,"614":-1.945902975427986,"615":-3.9379240727117377,"616":-2.096374333290726,"617":-0.17162672982989657,"618":-0.2227252384495016,"619":1.5164116794210831,"620":1.0366912082297421,"621":0.7223846121836648,"622":0.3696225651492038,"623":-1.6548270172914008,"624":0.5372254114574491,"625":-0.8892591597960549,"626":-1.0357116265381643,"627":0.5340015581788119,"628":-0.36382986474505763,"629":-0.03147077126911601,"630":-0.09325963264639255,"631":1.1881062952250445,"632":2.381384569352741,"633":-0.875039430184011,"634":0.9659280898323299,"635":-0.23713208852841652,"636":0.04757538377931918,"637":0.5546223483202399,"638":-1.3450500168448498,"639":-0.9460204200247057,"640":1.1800891632947463,"641":0.12036499298327999,"642":-0.31398627116185485,"643":-0.2661636654109648,"644":-0.16208405236580814,"645":0.930057915624993,"646":1.1627558302397405,"647":0.3347125073214016,"648":1.800990173002645,"649":2.140967603398805,"650":1.0341872772117566,"651":0.8097598631188595,"652":0.5558468014287432,"653":-0.17557038160273267,"654":-0.05150278587332111,"655":0.22472962605156918,"656":-0.9901492120177229,"657":0.503584961762497,"658":1.819658964016045,"659":2.196226752408358,"660":1.2248935845256232,"661":0.2635595910925858,"662":0.5433458345153148,"663":0.3505196794557644,"664":-0.5406730874189737,"665":-1.051098785063213,"666":-0.4771459649565619,"667":0.5811067234186292,"668":-0.13633735086650042,"669":0.040149948754549615,"670":-1.9612023399532947,"671":-0.602860612022028,"672":0.5895295913914279,"673":3.201288544137322,"674":1.2489068517911808,"675":-0.9756641507682984,"676":2.1953577039307755,"677":0.8887956175553411,"678":-0.665120499911534,"679":-1.108059505337364,"680":-0.7276626362440427,"681":0.3211862316996185,"682":-1.6457315962747083,"683":-0.8738174267458912,"684":-0.5111804364734535,"685":-0.5368812494274382,"686":2.3975040955410956,"687":-1.2769418540306503,"688":-3.370043779840887,"689":-0.9589611812159382,"690":-1.4192002406591817,"691":-1.8961506138936426,"692":1.1112116311830291,"693":3.122757999321835,"694":-0.848159483061501,"695":-2.8933606498920783,"696":-0.2862789949629259,"697":-1.9067144223498758,"698":-0.8496933779584361,"699":1.480877321022116,"700":-0.8059304780376407,"701":-0.7560265422908469,"702":0.677500536343582,"703":0.8959076231952471,"704":0.01597589070835067,"705":-0.5545344055140982,"706":-2.9272731139285515,"707":0.06947734362552484,"708":0.8407430861833615,"709":-1.4854937983413459,"710":-1.1142788805967585,"711":0.5341153212223144,"712":-0.5870854158661372,"713":-0.9750487213310648,"714":1.4055260131466538,"715":-0.04268771796438177,"716":0.6538653011030243,"717":-1.290206868076875,"718":-1.63138476824086,"719":1.3210297504188073,"720":-0.4934186890059441,"721":-0.37501636311340636,"722":-1.0819087443302249,"723":-1.3839052365232705,"724":-0.5018307667666683,"725":1.2778019373244156,"726":-0.6908526951437861,"727":0.35262574523204576,"728":-1.0576980690026399,"729":0.21198104174409274,"730":0.4087762822770417,"731":-0.5198028667516428,"732":-0.436068360737497,"733":1.6549905307662782,"734":3.0476813614772555,"735":0.45788010603598045,"736":-0.9663227419069642,"737":1.172439846808471,"738":2.073573946557791,"739":-0.3329241970425428,"740":-0.8878764126900278,"741":-0.3092083661957781,"742":-0.8191705066404026,"743":0.38164955473008033,"744":1.0256332907147192,"745":-0.5083178992196297,"746":0.01568499829927657,"747":-1.1708281130008855,"748":0.3705465920033365,"749":-0.44292358092627676,"750":0.8261245403874992,"751":1.8927334581740387,"752":1.9801885299009154,"753":0.7119911306627249,"754":0.3368206299299791,"755":0.45658503445951154,"756":-0.1853568774535331,"757":2.1487484113586177,"758":-0.4709630737102499,"759":0.784960520744377,"760":0.014674640039852057,"761":-1.742209521670103,"762":1.0679098047446653,"763":-0.4167686528361019,"764":-0.5376696660832908,"765":-1.3154819977096393,"766":-1.2511388676324668,"767":0.25682531245343043,"768":-2.313530246741062,"769":-0.7590827446240964,"770":-3.8107816166013433,"771":-1.7629126260573817,"772":-1.8064680277774041,"773":-0.3299832545869317,"774":-0.004957426384459316,"775":-0.7977940702152632,"776":0.7085317655925244,"777":-0.5884158371140359,"778":2.742206525842468,"779":5.029436670304377,"780":3.7686888719615053,"781":4.254128000333953,"782":2.90431083883823,"783":0.1804331483235331,"784":-2.555966361808802,"785":-0.9746570314430705,"786":-0.5201200375084691,"787":-2.648476149254619,"788":0.6531141930734323,"789":-0.456143871742578,"790":-1.7760740221946079,"791":-1.8705303628891705,"792":0.474897682802328,"793":-0.5737038787485135,"794":-0.7460335711272258,"795":1.4934525637854739,"796":0.8567973788142362,"797":1.067104991413652,"798":-0.43898993079274107,"799":0.6348906324535767,"800":-0.025207578963653145,"801":1.2566952192708976,"802":-0.578866341392073,"803":-1.7401163579789234,"804":0.1546062490257831,"805":2.836810899037314,"806":0.10764243724202417,"807":0.14745630439507154,"808":-0.15249914328672426,"809":-1.1787144077355247,"810":2.4159055981247612,"811":-0.4759611148909398,"812":1.6417398785228459,"813":0.29569118668655975,"814":-1.1745863277649073,"815":0.6563856293403763,"816":0.488963697667224,"817":0.3814313608053398,"818":1.1061492846525343,"819":1.4161354808451092,"820":0.6537743335701892,"821":-1.0523002797629006,"822":-0.3508892057468303,"823":-0.24585715743935635,"824":1.0563932394196944,"825":0.6112638235517923,"826":-1.2394070079207613,"827":0.9422329751958218,"828":0.28160277311991117,"829":0.27207500459455675,"830":0.019774785250061405,"831":-0.04000593034510927,"832":-0.029641411937397593,"833":-1.0980745729561678,"834":1.6326780938853742,"835":0.32670660700036963,"836":0.6290801133870947,"837":0.20999236892986772,"838":0.10093629346854846,"839":0.4144790343049651,"840":-0.057858666296572256,"841":0.8413654285363754,"842":0.6640989838563878,"843":0.8764544323506767,"844":-0.04857593461408542,"845":-0.5883067698727072,"846":1.1634282604167463,"847":-0.5117522406813683,"848":-0.4984679901571926,"849":-1.12788689069087,"850":1.3443843971291831,"851":1.2456734142414911,"852":1.6923090667250245,"853":2.4379492141603234,"854":-0.3861868116519001,"855":0.4566262383063742,"856":0.10749059886076526,"857":-0.7951261205970336,"858":0.8850105223404245,"859":-1.0327971145433117,"860":-4.92929245206573,"861":-5.657627456206241,"862":-10.047249202467007,"863":-5.482702667861318,"864":-0.15996063730439836,"865":0.22577311902763078,"866":0.6041882908855652,"867":-0.30577249722480193,"868":1.2124581637694798,"869":-1.4222808141869223,"870":1.807823819976268,"871":0.47012154471947126,"872":0.838279548483869,"873":-0.22913425988175337,"874":-0.27237805614266836,"875":-0.22201384943456515,"876":0.6305697301825954,"877":0.214264195844791,"878":-0.2654349541059262,"879":0.06849866269221813,"880":0.8997021688793505,"881":-0.8061182664191517,"882":0.6028863884131341,"883":-0.7279013212889075,"884":0.2973579580511075,"885":0.19868575892447063,"886":-0.3077564680846272,"887":0.7211020173269916,"888":-0.30157580039419984,"889":-0.2419707028718787,"890":-0.6669039635521593,"891":-0.5488285004070287,"892":0.2783339511498528,"893":-0.49987553608420304,"894":0.9277972484595265,"895":-0.05310593815280622,"896":-1.1307871031919143,"897":-0.7281199180089011,"898":-0.12202729262413256,"899":0.24805996440744868,"900":0.42109993568029747,"901":0.01817418519338225,"902":0.33941546842233883,"903":-0.5322195958347578,"904":-1.992219070521173,"905":0.20472279185881737,"906":0.2919206097095634,"907":0.40488578157547206,"908":1.2410723471142906,"909":1.1994494424538393,"910":0.1748475890990888,"911":-1.1747801347594515,"912":-0.7225811469591878,"913":0.16261160954307693,"914":-0.7999405315047207,"915":1.3197101354149603,"916":2.04431960605188,"917":0.6617005965799854,"918":1.1669570247389538,"919":1.8344632631781044,"920":0.3814356676961105,"921":0.11611001026864037,"922":0.38321185408073616,"923":0.08428277686797202,"924":-1.6347892813087115,"925":-2.7254742854130796,"926":1.7696035410799686,"927":0.2664421383772889,"928":2.9529024260388423,"929":-0.22052329700211765,"930":0.5482149833916253,"931":0.5217798264403767,"932":-0.773002835374357,"933":-2.1537152751297777,"934":-1.673817854067272,"935":-1.6598807518705034,"936":0.7103197239661176,"937":-0.11436209681310093,"938":0.6398012290084657,"939":-1.8258803506635994,"940":-0.3559179544867767,"941":0.26778439527665904,"942":-2.2429082673471723,"943":-2.7284711553027488,"944":0.5828757059430539,"945":-0.8532853712061987,"946":1.4048441188028835,"947":-0.10048253778073378,"948":0.6299624831449183,"949":-1.0612077615206847,"950":-1.361103049386309,"951":-3.52524633917574,"952":-2.104138127400216,"953":0.9798217410588944,"954":0.5577195477946842,"955":-0.4912813321168964,"956":0.11742452883784724,"957":-1.2408394782391707,"958":-0.25248503446410325,"959":0.8424551022152335,"960":-0.7661062995240209,"961":0.36661188265303946,"962":0.9335803379642329,"963":2.59109522648399,"964":2.1726974263293632,"965":1.531335143300196,"966":-0.158874381474831,"967":0.3431645401466437,"968":0.2069853395935548,"969":-0.48984428728288915,"970":0.0675423592090657,"971":1.90579141721919,"972":1.1702045181993543,"973":-1.4863207218409153,"974":1.3049785390555575,"975":-1.765751847313635,"976":0.870087544158019,"977":0.9296026873265285,"978":2.1572499349424636,"979":2.2970462910470895,"980":0.10942549015030123,"981":-1.3476982557458619,"982":1.5904028808981292,"983":1.428418296909579,"984":0.68892454056245,"985":0.05446653334396045,"986":-0.8063003199092827,"987":0.5094130557405336,"988":-0.032638867096344865,"989":-0.42071717862743224,"990":-0.22495578974400793,"991":0.6251025579577629,"992":0.6179753482938448,"993":-0.5034586337209628,"994":-0.18143396723687094,"995":-0.061639054275276335,"996":0.4116756210936724,"997":0.4993557488704864,"998":0.3916208133955072,"999":0.5935900380619231,"1000":0.6472290688239962,"1001":0.3206622505095878,"1002":-0.3581458536885927,"1003":-0.019278727698151144,"1004":-0.31349161888338456,"1005":0.43876980712536845,"1006":-0.03957624069326095,"1007":0.7587742064956151,"1008":0.41971479512682774,"1009":-0.1714574430297595,"1010":0.17458265102963733,"1011":0.2488154541930346,"1012":-0.11042268262406976,"1013":-0.06883000405220585,"1014":2.17130231851972,"1015":2.431899923951774,"1016":2.1045829190225347,"1017":0.7750415892951917,"1018":-0.11764750164603159,"1019":0.2629798903804307,"1020":-0.2417275589446365,"1021":0.3317348754850646,"1022":-0.30005953846552913,"1023":0.8863757286243427,"1024":9.945199136329315,"1025":0.7590077180088011,"1026":0.8221073884588638,"1027":0.4542442992576783,"1028":-0.6343699287793905,"1029":0.7137882473129695,"1030":-0.008209735472752932,"1031":-0.30140988783111183,"1032":-10.021317396233139,"1033":-5.947708915461457,"1034":-4.628470300015885,"1035":-0.5129856106527891,"1036":-1.6367124937406,"1037":-0.46402649206567664,"1038":-0.474299843992497,"1039":-1.1394571781198526,"1040":0.30459945024289486,"1041":-0.3109922630418694,"1042":-1.0000267643011038,"1043":-1.2789610193909793,"1044":-1.1486169411549325,"1045":-0.4378087061794015,"1046":-0.8260800977218967,"1047":0.13210191402961377,"1048":-0.4389395684447895,"1049":-0.47562266530935193,"1050":0.31967295858424716,"1051":-0.07876100323389174,"1052":-0.5728816460006416,"1053":-0.18487937110074867,"1054":0.3571305198319819,"1055":-0.021799145027245153,"1056":-0.7291429491182541,"1057":-0.6185040820666244,"1058":-0.7513605356991405,"1059":0.46581357910482407,"1060":-0.7600225343910587,"1061":0.3460646850550251,"1062":-0.2559275968484307,"1063":-0.1627648032408535,"1064":-0.24985669347674627,"1065":-0.537547731761212,"1066":0.2768149264199216,"1067":0.3151555537470399,"1068":-0.26544869231401486,"1069":-0.13319598946495237,"1070":0.3368144086196716,"1071":0.3212070590141747,"1072":-0.3032285380637115,"1073":-0.05613079264250615,"1074":-0.5098533622783017,"1075":0.3023911708883855,"1076":0.047117815039067215,"1077":-0.2811652211691112,"1078":-0.6098686056642731,"1079":0.13843307159438187,"1080":0.2250928243573443,"1081":-0.6248391632284512,"1082":0.7357975497547528,"1083":0.4560461189712552,"1084":-1.1309707516441203,"1085":-0.4394311967510262,"1086":0.07932100702878679,"1087":0.5220637338274983,"1088":-0.4897715011535312,"1089":0.2900125743847206,"1090":-0.07817219265286948,"1091":-0.5087395853123261,"1092":0.4677807047212811,"1093":-0.09888904789590115,"1094":0.16648846576681026,"1095":0.6248213543290655,"1096":0.7327873118484587,"1097":0.6842390741652288,"1098":-1.3122902783616868,"1099":-1.7242537277633994,"1100":-1.1185389345469277,"1101":-0.7002087250880632,"1102":-0.5394553518929137,"1103":-0.2993112917424254,"1104":0.49613641371680123,"1105":-1.9592928968633072,"1106":5.93328743362242,"1107":5.998000125298605,"1108":7.917912535199751,"1109":6.522672797364474,"1110":7.252378311305994,"1111":0.8794259597758293,"1112":0.7062031128564247,"1113":0.5988647840939288,"1114":-0.1437759015613291,"1115":-0.7629431886602156,"1116":-1.8029479844253564,"1117":-1.806224355868229,"1118":-1.2608191290468513,"1119":-0.8779701287755556,"1120":0.5844264859522746,"1121":-0.08409320946773086,"1122":0.5053190008353443,"1123":-0.2693670948034893,"1124":-0.2405412221459072,"1125":-0.8924595350754827,"1126":-0.6307410454085205,"1127":-1.0527461013908892,"1128":-0.7072045325264477,"1129":0.05814977448223053,"1130":0.7968539847953932,"1131":-0.05134392432723251,"1132":-0.4244494771994589,"1133":-0.864082139468561,"1134":-0.8551535488878848,"1135":-0.30615758798722,"1136":0.7509381549428847,"1137":-0.06286244532468245,"1138":-0.41645111489301595,"1139":-1.347059482407435,"1140":0.2900670314386034,"1141":0.19069263652083163,"1142":-0.009103615916956248,"1143":-0.3138497690443238,"1144":0.3618233677538477,"1145":0.3341419334331677,"1146":-0.4951920324503731,"1147":-0.5991627936061266,"1148":1.2733575388803406,"1149":-0.9090236135464445,"1150":1.759667084331929,"1151":-0.8756021956786272,"1152":0.9848931656957631,"1153":-0.05650397575182357,"1154":-0.6507164413627026,"1155":0.6212682523745002,"1156":2.202230170017732,"1157":-0.995251635021252,"1158":0.384402452540514,"1159":-0.3241624619245757,"1160":1.9046797547844387,"1161":-2.0932188083766126,"1162":-0.8027023672338913,"1163":0.4626848845556714,"1164":-1.2189895810678062,"1165":-0.38230731163350656,"1166":-0.6159816609280805,"1167":-1.0259677990884364,"1168":0.45445387752831523,"1169":-2.027242155750558,"1170":-1.8559081031883657,"1171":-1.513806234555242,"1172":-2.309266097306038,"1173":1.3592033545814122,"1174":0.10175815568913239,"1175":-0.6203916535755964,"1176":-0.749328101851744,"1177":0.3045373766765955,"1178":-0.31656606112902014,"1179":0.027208910138855576,"1180":0.27778191962324494,"1181":0.22283923115951196,"1182":-1.6955261784910283,"1183":-1.4867939120799838,"1184":-1.7363853560412283,"1185":1.448122385196407,"1186":-0.21877666810804328,"1187":1.0944905344558808,"1188":-5.337130266888875,"1189":-2.0806448047021693,"1190":-1.7413892692248063,"1191":-1.9483480493543464,"1192":-0.6178264483124143,"1193":-2.487464593379421,"1194":0.044655400857901546,"1195":0.12719172980144963,"1196":3.9587427808828513,"1197":1.8939378603688362,"1198":0.7890472532353715,"1199":1.0104504195959418,"1200":1.002204164875419,"1201":0.36152257467841004,"1202":0.6215097885440877,"1203":-0.052562193119361,"1204":3.071833881672057,"1205":-0.8178811582706309,"1206":-0.7295882023691848,"1207":0.14389934238987045,"1208":0.3634140673014779,"1209":-1.7867918230113427,"1210":0.5488936085883028,"1211":-0.22540063475799424,"1212":1.4968019050966053,"1213":1.6554102736680425,"1214":0.7686984231242316,"1215":0.17895295635160005,"1216":0.9333987438617248,"1217":0.5971441367173878,"1218":0.0383289747961449,"1219":-1.6363276338950685,"1220":-1.4861824329696975,"1221":-1.1397340386147852,"1222":-0.1213831505093762,"1223":-0.6111750567460035,"1224":-0.8637055316708534,"1225":-1.6153561463470212,"1226":0.05195331435092368,"1227":0.7047727075987763,"1228":-1.0715039404496467,"1229":0.6133488582225453,"1230":-1.546214701645908,"1231":-0.309700475997102,"1232":-1.8968728290161825,"1233":0.5199953704494812,"1234":0.9059028831944363,"1235":-1.6357862926789195,"1236":-0.7051399102896451,"1237":0.6261184673888688,"1238":0.4781056864895084,"1239":-1.6302541874494367,"1240":0.7985661531936743,"1241":0.6777616800495936,"1242":-0.3509385205520617,"1243":2.3196089988828636,"1244":0.699186297149579,"1245":-0.9641875007385304,"1246":-1.660291408981096,"1247":-1.3748388096546929,"1248":-0.44774904720759606,"1249":-0.6311361895933246,"1250":0.18047486568434087,"1251":1.715191250070232,"1252":2.3396759906628817,"1253":0.3298731263313371,"1254":2.168246691392841,"1255":-0.6898648720305386,"1256":-1.9829750753434656,"1257":-0.02673743885921517,"1258":1.4753760882381353,"1259":0.8808009458625339,"1260":4.46527231309413,"1261":3.9813055507286115,"1262":2.919792140495027,"1263":-0.5370607322427446,"1264":0.7541955522108528,"1265":0.585625805544635,"1266":-0.7915272278385579,"1267":2.1040237825085266,"1268":-1.9809017078932736,"1269":-1.3963085459926308,"1270":-1.002797680258977,"1271":-0.6917990001798826,"1272":0.21765247095719958,"1273":0.2483954214591226,"1274":-0.2711568744167675,"1275":-1.4303999737367858,"1276":-1.8700538191527711,"1277":-1.3920723670689348,"1278":-0.04198744815015796,"1279":1.084964101512679,"1280":0.32829524201348176,"1281":-0.01114486556769624,"1282":-1.06948574014866,"1283":-1.4085563995804775,"1284":1.3681423482178223,"1285":1.8127700405298628,"1286":-0.5896971011047208,"1287":-1.4272814760945378,"1288":-0.08516039962175412,"1289":2.302036880870249,"1290":-0.19349667061061354,"1291":-0.7959810428111176,"1292":-0.8279686574529761,"1293":0.12201953377752477,"1294":-1.493421485415428,"1295":2.3112725076688982,"1296":2.5313982023782886,"1297":1.0845000621874108,"1298":-0.21503148807090364,"1299":-3.470070418142852,"1300":1.4431106138559031,"1301":-0.09258853393065561,"1302":0.9684049004681161,"1303":1.894390535867701,"1304":1.2736618220626188,"1305":0.3271530134566496,"1306":-0.17750759326216092,"1307":-2.7054103427532517,"1308":1.3843422668756848,"1309":0.7431196717772721,"1310":1.02716680861311,"1311":0.20656273473654863,"1312":0.7628827711112484,"1313":0.8605268063679499,"1314":-0.9670473356271019,"1315":0.40425472570163734,"1316":-0.6078468819739881,"1317":-0.8223355262429127,"1318":1.5132147315719828,"1319":-0.5874372825604507,"1320":0.7792865394155646,"1321":-1.6651645248775282,"1322":0.5891402632233884,"1323":-0.3246240208298892,"1324":-1.8245051040232634,"1325":0.6998687571299048,"1326":0.6986105375511531,"1327":-0.2214121146915227,"1328":-0.43086372825971225,"1329":-1.1311077919504526,"1330":0.7487751359645599,"1331":0.2282874414052728,"1332":-0.7155401987106972,"1333":-2.8111853805988503,"1334":0.7087597921495766,"1335":-0.9329785769602713,"1336":0.5947477615922774,"1337":-1.6326822179902714,"1338":0.5265509989176147,"1339":-0.23927343492385825,"1340":-1.0750637268413499,"1341":1.2071291853314479,"1342":1.6349779831780802,"1343":0.9383577015979553,"1344":-0.2950910321144618,"1345":-2.4207622001186104,"1346":-2.259906448263728,"1347":0.36058877472155576,"1348":0.7698605542278143,"1349":-0.31957230433405476,"1350":0.40835141877108677,"1351":7.484741953998126,"1352":4.243138768798196,"1353":2.652863679404146,"1354":-0.19098390095432893,"1355":-2.1683730672355237,"1356":-0.1288110949701715,"1357":0.9091168989253059,"1358":1.4399084833369078,"1359":-1.197707583914406,"1360":1.7975130598847122,"1361":1.1157575424520556,"1362":1.1163803368189675,"1363":-1.3626703200620263,"1364":1.2376249454158812,"1365":1.0945719758123311,"1366":-1.1992071702960887,"1367":-0.9906890485742694,"1368":-0.28380819684794156,"1369":1.1889070942814413,"1370":0.7763931641576333,"1371":1.5906346619715759,"1372":-1.583053157533223,"1373":-0.8717196323976537,"1374":1.557928529313682,"1375":1.6257621292987032,"1376":0.10903155203641342,"1377":1.8481998137267208,"1378":-1.1429631357025203,"1379":-0.859426497676237,"1380":0.23219150545723632,"1381":-0.9518189845778171,"1382":0.6186290399870816,"1383":1.11643238774179,"1384":0.054284029916283914,"1385":0.8380130527441811,"1386":0.06171994229680302,"1387":-1.663848422714493,"1388":1.4258801501629899,"1389":-0.43059389656394464,"1390":0.8576187592849785,"1391":0.41023223377257106,"1392":-0.3360204124461476,"1393":-0.7129807389826557,"1394":-0.2699411355334849,"1395":0.17541883258377816,"1396":1.631286170391704,"1397":-0.01128802504811843,"1398":-0.1876791095713757,"1399":0.1440763930259852,"1400":0.43272301241743016,"1401":0.029201728464532038,"1402":1.344039504286293,"1403":-0.36595124203096335,"1404":-0.18528684427970196,"1405":0.4893230949446786,"1406":1.0458045025438674,"1407":-0.8177206483887408,"1408":0.7216395744984432,"1409":-1.1991163522383268,"1410":0.2312587226259815,"1411":0.5115004560576655,"1412":-0.14413885479554658,"1413":0.990130814274997,"1414":1.0220758963629555,"1415":0.9237816334876038,"1416":0.46465180917195414,"1417":0.02886320178743773,"1418":-0.8178374700319803,"1419":-0.06822276085377059,"1420":-0.0033773030174919323,"1421":0.07606340364859014,"1422":2.0292713182973867,"1423":-0.43559507674404463,"1424":0.11413191886787906,"1425":-0.42576988248394326,"1426":-1.1526840440168318,"1427":0.43169320894886754,"1428":-0.802985404043588,"1429":-1.4084973953026882,"1430":0.21347522966431892,"1431":-1.7754931272192034,"1432":-1.2586073661932906,"1433":-4.200725382885982,"1434":-1.9218098568670623,"1435":-0.6236252846351937,"1436":-1.3423763313074522,"1437":-0.33425243166041035,"1438":1.0593254101691383,"1439":-0.15999521150419288,"1440":1.7456857751406714,"1441":1.6335232038575753,"1442":4.76255421154055,"1443":5.550652780497267,"1444":-0.11032881515552084,"1445":-0.3711681757862669,"1446":0.5439002474222291,"1447":0.14791042343092986,"1448":-1.1505058846372822,"1449":-1.1860363187777583,"1450":0.601721225148845,"1451":3.372310382065363,"1452":-0.8579885761432083,"1453":-0.9013176685171169,"1454":-0.19552016708693012,"1455":0.37008456871783374,"1456":0.668453300086808,"1457":-0.16818819307266117,"1458":-1.0528636704500907,"1459":-1.489653716125547,"1460":-0.15175921661292288,"1461":2.045152779347419,"1462":1.6342227859329466,"1463":-0.4850109775135303,"1464":1.5655630841871728,"1465":1.1128333821572451,"1466":1.288059790577893,"1467":0.761232972765543,"1468":-0.15439169223367555,"1469":-0.27542954082279314,"1470":-0.9235452073022604,"1471":0.048732139482117375,"1472":-1.5570525099393702,"1473":-0.7077513239447661,"1474":-0.16805777193687732,"1475":0.3532747405640065,"1476":-1.838739630400094,"1477":-0.06735523666227285,"1478":-0.49789562895355566,"1479":-0.7601212593658666,"1480":1.1821128576463424,"1481":-2.1558023601416285,"1482":0.6110503755614181,"1483":-0.4202972822521207,"1484":-0.534866719660136,"1485":-0.8830850171990264,"1486":-0.4103032057516481,"1487":-0.5061791631442131,"1488":1.1144340728395856,"1489":-0.4963452012881393,"1490":-1.358558239969728,"1491":-0.022224271659186168,"1492":1.7252867099132734,"1493":0.40577755423990536,"1494":0.76770864041984,"1495":0.15519302749452352,"1496":0.16485790843260825,"1497":-1.8100028025505908,"1498":0.10598010494349798,"1499":-1.7128230415994672,"1500":-1.1028375575705665,"1501":-1.9245361183152556,"1502":0.6846546535977488,"1503":-0.21980790471131714,"1504":-2.3103783238345867,"1505":-0.4988580216412281,"1506":0.7747359762481247,"1507":-0.9687072261511303,"1508":-2.066843017891602,"1509":-1.9121610079701832,"1510":-1.563489233283821,"1511":0.1081855513698696,"1512":-0.41074856953400846,"1513":-0.21711302375247704,"1514":1.1949818138260666,"1515":0.08100407666368722,"1516":-1.0344781719215441,"1517":1.2621324000992027,"1518":0.4383599302193764,"1519":1.2245372545782143,"1520":0.5971270992819935,"1521":-0.039568465991409625,"1522":0.7939343292987027,"1523":0.9696909112930469,"1524":1.3097543355910062,"1525":0.5239563350631988,"1526":0.12304707443324986,"1527":0.1938732102523611,"1528":0.5322679759179975,"1529":-0.7838039796228017,"1530":-0.11180470138921625,"1531":-1.7808309709647652,"1532":-0.9816699996128185,"1533":-0.6503919751887323,"1534":1.2925732321916306,"1535":-1.2885375518586841,"1536":-2.565575449679266,"1537":-0.8279759606393786,"1538":-0.7137516585864719,"1539":0.7774137028178347,"1540":-0.26612488362906295,"1541":0.13205387390305878,"1542":0.8579504846495227,"1543":-0.38536764502269927,"1544":-0.4597483384834098,"1545":0.7785569105949111,"1546":-0.7140161582981766,"1547":-2.0255663939927837,"1548":-0.578838967453586,"1549":1.8340546246047285,"1550":0.0969783634038174,"1551":1.610945035815035,"1552":0.7138331655728435,"1553":0.20878066341755772,"1554":-0.13630398447577602,"1555":1.0941018629581365,"1556":0.15039639302302607,"1557":-0.14507223076445122,"1558":0.6199934205603173,"1559":-0.9475838329859825,"1560":-0.7442557485267556,"1561":-1.958697322673267,"1562":-1.216688275277657,"1563":-0.7568057698043301,"1564":1.538000077280387,"1565":0.9214030697477404,"1566":2.4086568366785435,"1567":1.2357100157648846,"1568":0.5616797132226596,"1569":0.5399608759684069,"1570":1.0687629966839245,"1571":0.1661858193914536,"1572":1.058763019568472,"1573":2.4133204103289403,"1574":0.2645655661762623,"1575":0.9325116364822489,"1576":-0.5992804691789163,"1577":-0.47388460521004344,"1578":-0.01996113876172862,"1579":-0.5054778061024229,"1580":1.120070659829814,"1581":-0.7787894313557892,"1582":0.8161213982137958,"1583":1.5794725441158717,"1584":0.8802519880627304,"1585":-1.1729145650524488,"1586":0.7917076567409863,"1587":0.7283440283299321,"1588":-0.2769040861514641,"1589":0.46139168000970127,"1590":-0.10380667312713053,"1591":1.4308957669806721,"1592":2.050717972763212,"1593":1.6745666225519311,"1594":-0.08403919697728503,"1595":-0.9865736088565774,"1596":1.9363088281508443,"1597":-1.9883783621956943,"1598":-3.0406183472716917,"1599":1.3925911149878325,"1600":-0.07534042196973657,"1601":0.10108466804646318,"1602":0.6242318015410414,"1603":-0.9564551873864278,"1604":0.5760626388828759,"1605":0.15101273098723955,"1606":-2.0434918781906597,"1607":-0.9338373039585013,"1608":-0.6549323000885695,"1609":0.6333177561620574,"1610":2.153688860162197,"1611":2.361269826891177,"1612":-0.6088258155679446,"1613":-0.8056642690189981,"1614":-0.4133537847121356,"1615":1.225591975340266,"1616":0.9142805544906039,"1617":1.0581054125951357,"1618":1.7614458583780617,"1619":2.4096443658923246,"1620":1.14560123617556,"1621":-0.6986375884134711,"1622":2.3192463667614027,"1623":-0.35846805392973036,"1624":2.609651042511917,"1625":-1.2084681514598314,"1626":0.6568242976760401,"1627":0.8143883041076094,"1628":0.7901835983751826,"1629":-1.07074987105847,"1630":0.3909682750271412,"1631":-0.9546679261724438,"1632":-2.3266811711254145,"1633":0.21507345990848237,"1634":-2.0607663953565316,"1635":0.7870530434417566,"1636":1.1736107390362538,"1637":1.8768981120884267,"1638":1.199723713946657,"1639":0.38144648860510744,"1640":-0.1531656775697729,"1641":-0.1399477852805576,"1642":-0.2945771182897826,"1643":-0.06743882440534854,"1644":-0.14483490031528845,"1645":-0.10065596698899028,"1646":-0.07308840658752992,"1647":-0.145228165081037,"1648":-0.11151573720350555,"1649":-0.2690942190628971,"1650":-0.2303959028084811,"1651":-0.1291622684744495,"1652":-0.36502532585675623,"1653":-0.28784921809956077,"1654":-0.2148630783843963,"1655":-0.16228436019149353,"1656":-0.15005691445720398,"1657":-0.19857921329622102,"1658":0.0913036826821845,"1659":-0.14218795013121568,"1660":-0.22524322029058752,"1661":-0.32065102392343686,"1662":-0.26775398617231927,"1663":-0.18115415097120327,"1664":-0.1690006586054296,"1665":-0.06785692629197726,"1666":-0.03322098571930262,"1667":-0.26709827198533487,"1668":-0.40270342981730567,"1669":0.04425293640864431,"1670":-0.17953737985120835,"1671":-0.2198719846777488,"1672":-0.21177398995648677,"1673":-0.07723266397871756,"1674":-0.03227139486698648,"1675":-0.10653131715903494,"1676":-0.1440327818820267,"1677":-0.22224947174445644,"1678":0.03939373318082142,"1679":0.4077916353588714,"1680":-0.06024121786042616,"1681":0.08752698232888641,"1682":0.05385147941285783,"1683":-0.03131091357026741,"1684":-0.05406639159273649,"1685":-0.2973474535979268,"1686":-0.0532438289735871,"1687":-0.23647888040179066,"1688":-0.22760795543771717,"1689":-0.20739033283313763,"1690":-0.1567981224953123,"1691":-0.09821041621209574,"1692":-0.22476901080717793,"1693":-0.0721221041660616,"1694":-0.20960061845628788,"1695":-0.03958861317356975,"1696":-0.08870857381511267,"1697":-0.15683216162543132,"1698":-0.2760925186105695,"1699":-0.142419259443011,"1700":-0.17302086275851328,"1701":-0.06025368844603922,"1702":-0.14502843097181492,"1703":-0.029116192173381388,"1704":-0.27352593635309524,"1705":-0.01803555928006648,"1706":-0.22880715676280283,"1707":-0.308013377552598,"1708":-0.26833842454374,"1709":-0.08645818695269351,"1710":-0.15417912572426523,"1711":-0.10500412274735618,"1712":-0.12774497609957244,"1713":-0.08476288133507179,"1714":-0.0962069227582294,"1715":-0.18383980485858784,"1716":-0.1859335271157792,"1717":-0.2830978770720731,"1718":-0.17276659942040853,"1719":-0.1659859794732221,"1720":-0.04717218694608836,"1721":-0.7361863021637012,"1722":-0.9365481172633875,"1723":-1.8714082726235934,"1724":-1.5629389982294566,"1725":-1.185632646688896,"1726":0.9652664737496683,"1727":0.14668225956049707,"1728":-2.1591434250785446,"1729":-0.2158248614922149,"1730":-2.6693653415657965,"1731":-1.0393860160803923,"1732":-0.17284268899242217,"1733":0.6336873399359593,"1734":1.9395294628722246,"1735":-0.8080584486485631,"1736":0.5481975710150111,"1737":0.4702876503080576,"1738":-0.49925047963012625,"1739":0.0075528083602809685,"1740":0.8725190395648217,"1741":-0.5243137635811533,"1742":-1.6711958144645285,"1743":-0.7459010189231713,"1744":0.03590401830766425,"1745":-1.491173130104815,"1746":-1.1870985901619653,"1747":-1.3839804766262798,"1748":0.07985635856362201,"1749":0.9327189923771776,"1750":-0.6169836573541014,"1751":0.08401820536404557,"1752":-2.3725565975302834,"1753":0.549561773105327,"1754":-2.6819654205259083,"1755":-2.284573020122723,"1756":-0.9663710968743764,"1757":0.18321825844812284,"1758":-0.8217442748971766,"1759":-0.28595076535510305,"1760":-1.1034787066952105,"1761":0.26065853811629514,"1762":-1.3515955710367862,"1763":-2.5974492362256525,"1764":-0.5537889243865857,"1765":-0.10627366916831632,"1766":-0.27128571531230716,"1767":0.1241894651509643,"1768":-0.1116576458150603,"1769":0.5796024222991477,"1770":0.6169268865438333,"1771":-0.421822569374161,"1772":-1.5458513971397554,"1773":-2.0111992286591955,"1774":-3.2634025681842234,"1775":-2.5678319921571386,"1776":0.03215457404966076,"1777":0.6846478547416298,"1778":0.23951682923293938,"1779":1.4984790126000822,"1780":-0.2280005071248775,"1781":1.475453602107271,"1782":0.4457309802384183,"1783":-1.579554148883673,"1784":-1.6072987787377901,"1785":-0.2559745845605312,"1786":1.141074828832962,"1787":1.0902395889640906,"1788":0.12213295713863234,"1789":0.5322347571312342,"1790":3.7301954444267476,"1791":0.7009472963483586,"1792":1.3029685056141886,"1793":1.2809375096229347,"1794":-0.49266815833515837,"1795":-0.7651105680952426,"1796":1.6274736982836129,"1797":1.9175870954068897,"1798":-0.8583019820635172,"1799":0.9004317600665489,"1800":-0.2928376129930687,"1801":-2.063955971245569,"1802":1.6703400220300448,"1803":0.15744021284039034,"1804":-0.019097228292725574,"1805":0.8437592638466291,"1806":1.715817608404373,"1807":3.036732256074304,"1808":-0.4626281758150284,"1809":-0.13445536459076649,"1810":-0.9809596071036563,"1811":0.20031830912634463,"1812":-0.47431492886445714,"1813":1.5499359644328536,"1814":1.4028016968645052,"1815":-0.715463061735761,"1816":-0.1683831486303721,"1817":1.7873980605023732,"1818":1.3147628223091543,"1819":1.5997634008916917,"1820":1.548686600420504,"1821":1.1282313506133859,"1822":1.123883475430487,"1823":-0.48963542744388333,"1824":0.05254896205241616,"1825":1.1435594617434381,"1826":1.9465776688447451,"1827":1.0898600493513804,"1828":-0.3635196212043392,"1829":2.636940536135907,"1830":-0.976459647403657,"1831":1.7031317085251754,"1832":-1.9044992280673916,"1833":-1.11889980738457,"1834":-0.756388831839243,"1835":1.382650653483771,"1836":0.3380356648976445,"1837":0.8575503836872118,"1838":1.3157000402100791,"1839":1.2705261833165236,"1840":-1.1871069587157714,"1841":1.7576782381015603,"1842":-1.920617125866144,"1843":-2.4021197412759023,"1844":0.22994381968084782,"1845":1.534873510868657,"1846":-1.6260759236649762,"1847":0.4527775480858422,"1848":0.9712420278094734,"1849":0.059886298842294565,"1850":-2.336763041425458,"1851":-3.8486588222813705,"1852":-4.503733601756267,"1853":-2.306961753146859,"1854":0.3678786553497938,"1855":1.094335259813663,"1856":0.3799665111926577,"1857":-0.5623042764467516,"1858":-0.3506229957686032,"1859":-0.23492513963501072,"1860":-3.2003446284575072,"1861":-0.570731427861115,"1862":-1.8623008348609034,"1863":0.13755493614831543,"1864":-0.7723425817365361,"1865":-0.23451663093321493,"1866":0.2584521268201145,"1867":0.6672812404657482,"1868":-1.5413185533239968,"1869":-0.36678726357083463,"1870":1.151418946431528,"1871":1.9741618997021042,"1872":1.8220217795830296,"1873":0.23725446724446314,"1874":1.5099174650891811,"1875":0.8239121620388292,"1876":1.0847386697777344,"1877":-1.7165046047633439,"1878":2.0004476608073993,"1879":0.1421291760875452,"1880":-0.7868035980919733,"1881":-0.5105665868568039,"1882":-0.3460559248734971,"1883":-0.3146384415274766,"1884":-0.393757088348943,"1885":1.0604308360842116,"1886":-0.7781268207317581,"1887":-0.40162373217315245,"1888":-1.1096956051248863,"1889":0.053438860092245084,"1890":-0.6048185706479309,"1891":0.072298223044324,"1892":-0.972162633239167,"1893":1.4471014249094694,"1894":-1.1347176580703957,"1895":-0.9975276845745121,"1896":0.15658853622334487,"1897":-0.16092050726137525,"1898":-1.0096232929047524,"1899":-0.8081888297418831,"1900":-0.30230083338921465,"1901":-0.4419358789015357,"1902":-1.451827212515788,"1903":-0.6544196332677186,"1904":0.7712587509567164,"1905":-0.07388292049992315,"1906":0.3971136518306958,"1907":1.3999056266170526,"1908":-1.781485439749345,"1909":-0.20471556206924182,"1910":0.9756403466577711,"1911":0.01916995898272191,"1912":-0.31072198612854834,"1913":-0.03015424680256447,"1914":-0.196850765209745,"1915":0.896984078198214,"1916":0.20082849235027014,"1917":-2.2028074571118674,"1918":-1.5491083592743906,"1919":-1.6684847206230287,"1920":-0.8184010373549676,"1921":1.090669152235089,"1922":0.5186196696257895,"1923":-1.0116815344786265,"1924":-0.2291260225256889,"1925":1.3706708177263687,"1926":-0.7723263270174122,"1927":2.6359974218140465,"1928":0.810680033437129,"1929":1.6528556601616118,"1930":0.5987328118304786,"1931":-0.4691537272614847,"1932":0.37080728221378706,"1933":-0.01242306509652973,"1934":-0.8717580274267646,"1935":-2.4561945185292045,"1936":0.7143692128561744,"1937":0.6726589733568896,"1938":-0.09937284490033621,"1939":0.3185238698674868,"1940":-1.1262732158930422,"1941":-0.29185943954775617,"1942":-1.3765745888528764,"1943":2.1376118790177725,"1944":-0.6515264184039504,"1945":-1.894165289560554,"1946":0.5839874269354649,"1947":-0.26509853414336476,"1948":0.5174343431541323,"1949":0.23664954954422202,"1950":-0.35733998211800255,"1951":0.18151666042662726,"1952":0.28517312809042866,"1953":-0.6276032054389699,"1954":-0.702221530794287,"1955":-1.6699337266410745,"1956":0.05549235407695045,"1957":-0.6877453825571047,"1958":1.0454818625625448,"1959":-1.232937129899748,"1960":-0.9985906977640601,"1961":0.04233883685978553,"1962":-0.7874375050970766,"1963":-0.6285140720193454,"1964":0.2131895744153427,"1965":0.4046130186193965,"1966":0.20377929038068832,"1967":-0.4163003398242295,"1968":0.33091057478093827,"1969":-0.8251932704590367,"1970":1.1361547431293084,"1971":1.3137111884329231,"1972":1.981959473570713,"1973":0.4957029952012742,"1974":-0.7019757363786742,"1975":0.5012283899091253,"1976":0.5748361402042954,"1977":2.234322177666077,"1978":0.2744111650118889,"1979":-0.25871127964562746,"1980":1.2466658748710941,"1981":0.2964333484123981,"1982":0.654625633622625,"1983":0.7316504282239786,"1984":-1.8110093049452978,"1985":0.6590237450919229,"1986":-0.8307613860459505,"1987":3.8333720446208566,"1988":-0.8754345638787533,"1989":0.8877625852711302,"1990":2.504659536653917,"1991":-0.7638288213004201,"1992":-0.0010339453830769288,"1993":0.4002435870061386,"1994":-0.24618774487013145,"1995":0.9793037782137267,"1996":0.5019411873543708,"1997":-0.6098697194104306,"1998":0.217822751439007,"1999":0.21500060397565707,"2000":-1.9249462835291864,"2001":-0.23096396883029519,"2002":-0.4629517881773588,"2003":2.0108486688312355,"2004":-2.7082986865693535,"2005":-0.4939755161182732,"2006":1.5958477999316225,"2007":3.662551645140075,"2008":1.9760094196070015,"2009":1.8392563489516263,"2010":2.8834301266180615,"2011":1.5700441934213947,"2012":0.8028637276224319,"2013":-1.2620416294412329,"2014":-2.8084115099589444,"2015":-0.08459552825447418,"2016":-0.976908474442516,"2017":1.5850887220539878,"2018":0.06855349097481214,"2019":-0.523291411287135,"2020":0.24981169852589238,"2021":1.4804088263634834,"2022":-0.5846849128820565,"2023":0.8327004484437037,"2024":2.368493475445859,"2025":2.351569763692844,"2026":-0.19364191490917704,"2027":0.023019524070999026,"2028":0.5845207751390689,"2029":0.15770184980911764,"2030":-0.6570866225968884,"2031":-0.5425224606637787,"2032":-0.3779301507474853,"2033":0.7744965802168314,"2034":0.16057343346079472,"2035":0.7012047657379784,"2036":0.204956674528401,"2037":0.6093106585146827,"2038":-0.01503581579603492,"2039":-0.08093532755138735,"2040":-1.7567830671509157,"2041":0.6471125611263128,"2042":-0.41462360290824757,"2043":0.4438312536739662,"2044":0.002239461331834621,"2045":-0.3677321929121648,"2046":0.4142739591698937,"2047":1.727669812211416,"2048":0.38136282564211904,"2049":0.3113213617590525,"2050":0.638329013461261,"2051":-2.0263182567258924,"2052":1.2456673005843835,"2053":-1.1399833136832973,"2054":0.954932033616631,"2055":0.7127480152087976,"2056":0.9953784574128749,"2057":0.8865929797077169,"2058":-0.4415385275081139,"2059":1.3462301474192249,"2060":0.9178834515860839,"2061":0.2598532085777448,"2062":-0.7355587321379169,"2063":-1.0619669022402103,"2064":0.9954425604484651,"2065":0.9789779220708928,"2066":1.263730848246975,"2067":-0.9450452166938809,"2068":-0.5810681444710778,"2069":-0.974534025384728,"2070":1.0478938663634214,"2071":-2.828883213978657,"2072":0.6559758164302802,"2073":-0.8237915613215332,"2074":0.7446721118434989,"2075":-1.4819963302468075,"2076":0.6079207346236237,"2077":1.4696376315338515,"2078":1.5515009967880236,"2079":1.6502366387934155,"2080":-0.5154283343284884,"2081":0.013980421902923907,"2082":0.7237635151403651,"2083":-0.927707559669846,"2084":0.11719374566787807,"2085":2.073056861094652,"2086":1.095495667957333,"2087":0.6370025783433438,"2088":0.2007553025417826,"2089":2.313978323396227,"2090":1.8669186910745925,"2091":1.6752409224147917,"2092":1.112489917113257,"2093":1.6777785709555384,"2094":0.11860595292134508,"2095":-2.844711710188401,"2096":-0.6309725055496195,"2097":-2.0768822337009087,"2098":-0.258373336562041,"2099":-1.6087689838910386,"2100":-1.2406290745008184,"2101":1.5426252173597077,"2102":2.2038953909250476,"2103":1.2051350337591915,"2104":-0.5261445743193952,"2105":0.28618503917476407,"2106":0.04250663605267548,"2107":-0.962555291759692,"2108":-2.151114990666523,"2109":-1.1876399526841066,"2110":-1.3040895040212166,"2111":-1.8882229577375305,"2112":-1.8030321653804011,"2113":-0.9180478724782933,"2114":0.6818197496295907,"2115":0.7114634624853583,"2116":0.10641720863928193,"2117":2.0883515934086496,"2118":-1.1704080573332183,"2119":0.8385874325211339,"2120":1.0255305180484682,"2121":0.27903876069366257,"2122":1.978943750261601,"2123":0.3170585035418488,"2124":0.004222562321684943,"2125":-2.6045957944435774,"2126":-0.9478276536333945,"2127":-4.458018062408498,"2128":0.13419159949387946,"2129":2.7531512344244624,"2130":-0.11834158713364555,"2131":-0.19596511235311923,"2132":2.6494354339275836,"2133":-0.07521571463663941,"2134":-0.2692960412498665,"2135":-0.25563182385825817,"2136":-1.068381172497683,"2137":-0.8442297005191003,"2138":-0.42753955334450033,"2139":1.128382073193204,"2140":-1.3120171022794913,"2141":-0.10679316087148198,"2142":0.2969548222625263,"2143":-1.3551935065302212,"2144":0.9045034732425206,"2145":1.3168882946797302,"2146":0.0014525763259036904,"2147":1.2765083316584012,"2148":-0.31093890016839226,"2149":-0.9788880863258823,"2150":-1.2326491261944217,"2151":0.2436088516065559,"2152":-0.5046307375261363,"2153":-0.19691909284671175,"2154":-1.3922207472028063,"2155":0.21774224535013562,"2156":-0.15406673725521736,"2157":0.5151791896405575,"2158":-0.10937571209842813,"2159":-1.404099051836358,"2160":-0.7103182300417353,"2161":-1.480597862649467,"2162":0.6075385911654411,"2163":3.3229747143891037,"2164":3.175140872994292,"2165":1.6889647740827147,"2166":2.3361711426651683,"2167":1.3279614286913888,"2168":0.4410416725972898,"2169":1.6339324141076748,"2170":0.47962235917777135,"2171":0.5909909083407765,"2172":4.508405182277702,"2173":5.388931711505065,"2174":2.773299849812212,"2175":1.578528773365973,"2176":2.0361209107862726,"2177":-0.8372669242432146,"2178":0.28658127332960387,"2179":0.03647445796854289,"2180":-1.2702972918864708,"2181":-3.3417816655813795,"2182":-1.257955633054957,"2183":-0.5141982174366574,"2184":0.10746545262787126,"2185":1.7095891241291021,"2186":-0.22091422144756148,"2187":0.8531654810553062,"2188":-0.9634574219845827,"2189":0.6741486320151238,"2190":0.09445216036637138,"2191":-0.47942826165350455,"2192":-0.6733789012159872,"2193":-0.30307251154620235,"2194":0.6675355816591275,"2195":-0.32165313760689646,"2196":0.30253991390506135,"2197":1.5670106431170208,"2198":-0.2674888559074471,"2199":1.5330914630635437,"2200":0.6764845048695431,"2201":0.08964497184298087,"2202":-0.3638146768954797,"2203":-1.727873647601186,"2204":-0.28181154215957777,"2205":-1.072181810521538,"2206":-0.8999615579693365,"2207":0.037976606290636164,"2208":0.9627243146938551,"2209":-1.3072878429522394,"2210":-0.4896198216997056,"2211":-1.856516283271137,"2212":-0.3029038946662483,"2213":-0.3867810115517229,"2214":-1.0785901550851964,"2215":0.24001220131879886,"2216":1.0078034517603403,"2217":3.3158709932912758,"2218":0.2438786558485758,"2219":2.4286849694685406,"2220":1.61021868905826,"2221":1.2417697100817313,"2222":0.8329965487968727,"2223":0.04888763261763121,"2224":0.3857897946411611,"2225":-1.0966759710927831,"2226":-1.4454684287650996,"2227":-0.44189458588369757,"2228":-1.231764410290432,"2229":1.1273894050978117,"2230":1.279745900421016,"2231":0.13176118720205252,"2232":-0.2599241191383057,"2233":-1.110451994622253,"2234":0.36768238743243753,"2235":0.41591801223222874,"2236":-0.18339270111337846,"2237":0.993257057561436,"2238":1.6251989172162302,"2239":1.1573038331403573,"2240":1.049894020080477,"2241":0.2750438791050177,"2242":1.107160798229024,"2243":0.2019755198086158,"2244":-0.32239354411400506,"2245":1.108092894619675,"2246":1.8161845088977493,"2247":0.6879579563895634,"2248":1.493113046756979,"2249":1.2781572289730405,"2250":1.3106252100516738,"2251":-0.07229985553964116,"2252":0.19324748134295686,"2253":-1.9800153211910585,"2254":-1.4531706557684843,"2255":0.6560194675418679,"2256":0.8744755398537593,"2257":0.3033292222008851,"2258":1.7864371416189746,"2259":0.6965016742643384,"2260":2.3612752815993048,"2261":2.503620035821966,"2262":0.7062423288272898,"2263":0.3462129148406468,"2264":0.8168490833312969,"2265":2.1797719743698876,"2266":0.66023189839148,"2267":0.7511413839384479,"2268":-0.25754784833611377,"2269":-2.2589006516865893,"2270":0.5874273905029725,"2271":1.8081167133357117,"2272":-0.10769922564455676,"2273":1.145919278863351,"2274":1.2326906807882283,"2275":1.2171108166897133,"2276":0.6960950449189659,"2277":0.6427700951214596,"2278":1.3075148389969957,"2279":-1.384787668205563,"2280":-0.540905896911674,"2281":-1.3367447972924031,"2282":-0.06051031018887781,"2283":0.09797407649775339,"2284":0.2345883036442663,"2285":0.019336000582299555,"2286":-1.9621247572855787,"2287":0.36590234830012536,"2288":-0.5913492538525598,"2289":1.3808605842115964,"2290":0.5608826574076962,"2291":-0.20963196681836743,"2292":2.067284614989169,"2293":0.3739830169978019,"2294":1.0407904755112227,"2295":-0.3895420836855082,"2296":-0.11724238376070531,"2297":-1.1900771017919685,"2298":0.15774419351310745,"2299":-0.0018644932760941582,"2300":0.45546941649447636,"2301":1.1412064390778032,"2302":0.4313961520289939,"2303":0.42925771411348235,"2304":-0.3343250231922487,"2305":0.07364705220473648,"2306":0.34184671185511945,"2307":0.052823576320111844,"2308":-0.15754210559994428,"2309":-0.29373438846618216,"2310":0.27952553081798376,"2311":-1.6905273810412225,"2312":0.17486221382821118,"2313":-0.9236051053800796,"2314":-0.1795175627143274,"2315":0.5514431695589198,"2316":0.33886563085399846,"2317":0.5431273240933063,"2318":-0.029169808374136873,"2319":-1.0491442317121527,"2320":2.291811981041914,"2321":-0.564298563988622,"2322":0.08338856654398011,"2323":-0.7623365103015588,"2324":0.4437459313114846,"2325":0.7791701663005441,"2326":-1.4663146661193838,"2327":0.8085539398663227,"2328":1.9281076263797863,"2329":0.6925710391433458,"2330":0.4421408447068931,"2331":-0.7569083912692238,"2332":-0.06853044527584393,"2333":0.2997586709637011,"2334":-0.8912078016840866,"2335":0.664161708550898,"2336":-4.366476276335476,"2337":-7.513436551231232,"2338":-6.003045915542094,"2339":-2.2820124066812664,"2340":-3.1008958831537807,"2341":0.8632490866036397,"2342":-1.2706617311650417,"2343":0.07713001394045833,"2344":0.5775746123808416,"2345":3.9813791877268243,"2346":1.8382346293096075,"2347":3.2461236649434375,"2348":-0.2822945654056275,"2349":0.3131082357066663,"2350":0.8457646946503903,"2351":0.09773043455277333,"2352":0.31092976896374974,"2353":-0.42643305998754694,"2354":0.17718146427495785,"2355":0.2830460875021301,"2356":-0.4896512607186674,"2357":1.0757302815752499,"2358":0.17513796758392605,"2359":1.105326826129262,"2360":-0.06771877757507623,"2361":0.4860204233352408,"2362":-0.46600002059318435,"2363":-0.6134967077302816,"2364":-0.466366359256582,"2365":0.6571473655767675,"2366":0.45714518076153,"2367":-1.369478216070087,"2368":-0.029162858269133472,"2369":-2.5060254381773577,"2370":-0.188281147896261,"2371":1.4428306172369254,"2372":0.038130988919620856,"2373":-0.7238900714661982,"2374":-0.4997951275509526,"2375":0.8498710649366243,"2376":-1.3589707930619144,"2377":-0.37526794528149665,"2378":0.09074810074924801,"2379":-0.8940478207922206,"2380":-1.0918916360938682,"2381":-0.08485238390800859,"2382":1.1968626976682357,"2383":1.3121462545393647,"2384":-0.8791839543701931,"2385":0.4359294557516741,"2386":3.216938023010097,"2387":-0.3242244778831126,"2388":-0.7332164275323229,"2389":0.0599235868107638,"2390":0.30251635391646975,"2391":-0.44089426988856106,"2392":-0.5767719907372642,"2393":0.49411822375250386,"2394":0.7333544196171855,"2395":-0.3253903302104752,"2396":-0.6778650972214845,"2397":-0.29083504333327853,"2398":-0.6853759274744834,"2399":-0.6785386360384188,"2400":1.21389214942124,"2401":-2.0057143566521316,"2402":-1.825517587207006,"2403":-0.2742294743171292,"2404":0.3520730375741089,"2405":0.12504313278875612,"2406":0.4640235258495413,"2407":0.3327410928592141,"2408":-2.3641710313163737,"2409":-2.2931206918341016,"2410":0.5519997260645331,"2411":0.1382447794798626,"2412":3.6892348336931766,"2413":1.6485730396791103,"2414":0.09351098825603583,"2415":-1.0748020907681806,"2416":0.5815795259913945,"2417":-0.5601859166591513,"2418":5.862166220540199,"2419":7.11904762519307,"2420":0.8928363275161213,"2421":0.7719901542148819,"2422":-0.7170277138359463,"2423":-0.28005704568816203,"2424":1.139435037541861,"2425":0.5500035703762004,"2426":-1.045880786610801,"2427":0.08596631423492744,"2428":-2.3062216251519483,"2429":-3.2619715267634604,"2430":-0.22378383354202658,"2431":-1.8745755176404353,"2432":1.4922864650758236,"2433":1.4127126174499134,"2434":0.7143299406005468,"2435":-0.8843505330649595,"2436":-0.08259651777543857,"2437":0.29810330720013495,"2438":-0.3364973447592907,"2439":0.4593434116407037,"2440":-0.1293024333509858,"2441":-0.7011597788075611,"2442":0.8098083017472687,"2443":0.07284098735237296,"2444":0.30493396713500176,"2445":0.08862535530949532,"2446":1.9767587352075835,"2447":0.10241012640655332,"2448":1.4037785325072545,"2449":-0.7746804741849175,"2450":0.8529292133458692,"2451":1.6292792327887995,"2452":0.9343901785869915,"2453":-0.2553238546210697,"2454":-0.05338362098875047,"2455":-0.05359995110575584,"2456":0.6355899507241275,"2457":-0.8479845593014141,"2458":1.2360220327838256,"2459":0.03307576581999394,"2460":-2.114355750232904,"2461":1.8745668897734773,"2462":0.16334850561767916,"2463":-1.001834369075314,"2464":0.682059653478383,"2465":-0.01389104822384346,"2466":-0.2781774049439508,"2467":-0.42393421043533425,"2468":-1.3425002827405272,"2469":0.05111986600859054,"2470":2.076195741201298,"2471":1.7790439517683716,"2472":0.5200514084633341,"2473":0.06789001562168219,"2474":0.579222120152942,"2475":-1.8945122252521904,"2476":0.18676592951639573,"2477":0.27613981364477536,"2478":-0.26669318494160354,"2479":-0.20555559508677165,"2480":2.000312442376856,"2481":1.4043805973187897,"2482":2.269203310698285,"2483":-0.1005323512583882,"2484":1.1370011153774067,"2485":0.34800948734586046,"2486":0.6549485424666668,"2487":-2.3464263759393282,"2488":-0.02224627535794248,"2489":0.22139145473310512,"2490":0.741802165380533,"2491":1.0595796157031718,"2492":0.11377029006535949,"2493":-1.3910650071580954,"2494":-2.560248423468248,"2495":-0.17224916148831992,"2496":0.022528579375642458,"2497":1.001338618289221,"2498":-1.1380075248169133,"2499":1.5051044675397,"2500":0.06598802165865901,"2501":-1.4849937165077534,"2502":1.2010025172653136,"2503":-1.0197196284648966,"2504":0.24228847650758756,"2505":2.170728549980353,"2506":1.2549338059220847,"2507":-5.922272852514897,"2508":-3.3190956858362464,"2509":-0.8067741533412898,"2510":-1.4273773358319253,"2511":-0.3563605052891673,"2512":-0.1096890697405097,"2513":0.9591682421144253,"2514":1.5199850189575685,"2515":-0.7336701278166833,"2516":-1.8653708037086603,"2517":-0.5384494258612628,"2518":-0.1248179114266159,"2519":-1.2199253595684454,"2520":0.6392125343868283,"2521":-0.22863495754287017,"2522":-0.18654962047765236,"2523":-0.79710587794641,"2524":-0.14229117654678552,"2525":-1.1883294679649663,"2526":1.6681281149546618,"2527":-1.371341462785789,"2528":0.6625255089165606,"2529":1.2913286331907041,"2530":0.7913271129727414,"2531":-0.41199193544500246,"2532":-1.9393793464765352,"2533":0.1617627719590059,"2534":-0.23121669731900463,"2535":0.348422793823723,"2536":-0.09563118472271107,"2537":0.21072698487538002,"2538":-0.2621065834364608,"2539":0.0347379997619867,"2540":1.2516794925005899,"2541":1.522064859512751,"2542":-0.22264792157187155,"2543":0.5335721927381587,"2544":-0.4569694105945257,"2545":0.028660281664331138,"2546":-0.348467985692458,"2547":-0.16564922554456793,"2548":0.09478435647947159,"2549":0.3662136502397485,"2550":-0.14769383623402446,"2551":-0.3549074970697334,"2552":-0.39372199157302823,"2553":-0.16880152742649482,"2554":-0.21061551103849552,"2555":-0.06918035417166934,"2556":0.4178981780796778,"2557":0.5443992635635717,"2558":-0.32216461906886934,"2559":0.16774080340239209,"2560":-0.4412390339619616,"2561":0.2852900857220301,"2562":-0.4419978423688448,"2563":-0.2478013136643284,"2564":-0.203366346423904,"2565":-0.5477900830629412,"2566":0.0927258681681585,"2567":-0.15562792387319554,"2568":-0.6795108285063574,"2569":0.2871600566331009,"2570":0.4308151874101995,"2571":0.13022991294510008,"2572":-2.747624763394593,"2573":-0.8999509564020882,"2574":-0.44212177593310087,"2575":-0.13279921834632807,"2576":-0.2066817958167089,"2577":0.25908228820637075,"2578":0.4220982863445308,"2579":0.3128511840583875,"2580":-0.387239825625252,"2581":-18.55132042644947,"2582":-6.542458745085541,"2583":-1.0640343907052965,"2584":-0.5615932822122274,"2585":-0.5758863791624066,"2586":-0.4235904665726457,"2587":0.24696574564625143,"2588":0.11301135871723793,"2589":0.8179130456162939,"2590":-6.807507993541087,"2591":1.6193526847462165,"2592":1.1098070126596264,"2593":1.366091729846585,"2594":-0.12618636267737826,"2595":-0.23934492037868074,"2596":0.20924853010542863,"2597":-0.29382064649040385,"2598":0.16697240168212502,"2599":0.5885229130098933,"2600":0.5591135229099563,"2601":0.8809674515594091,"2602":0.054768740039963,"2603":0.15996914297698459,"2604":0.30336654321739887,"2605":0.02051834604298899,"2606":0.00863110593145779,"2607":-0.0966807701777347,"2608":0.3635273183335328,"2609":0.379823568785326,"2610":-0.40401716836595275,"2611":0.11651394572814862,"2612":-0.0015909511749297187,"2613":-0.016601251130134793,"2614":-0.4441025003999916,"2615":0.1647446602125068,"2616":-0.02666300589962774,"2617":-0.424914112242347,"2618":-0.0720675812781108,"2619":-0.06414702944164838,"2620":0.08256150536376536,"2621":-0.27568336188292974,"2622":0.20496028232959318,"2623":0.5451761596964628,"2624":0.6579738171888674,"2625":-1.7070813343106468,"2626":2.5119689569658847,"2627":-0.06745905665991826,"2628":-1.1786255673196073,"2629":-0.76377855941236,"2630":1.0941585296632221,"2631":-1.9185677493639477,"2632":-0.6165494647813982,"2633":1.0641251622341508,"2634":-0.5838399804723051,"2635":-1.210800048321225,"2636":-0.27157242796733033,"2637":0.15971240341652274,"2638":0.1413336789446719,"2639":2.541917749077641,"2640":0.011766230017233585,"2641":0.8746099796044311,"2642":-0.01734526306001369,"2643":1.1666474383169823,"2644":-1.0505348966396866,"2645":-2.0091662580695226,"2646":-1.4866631862825999,"2647":0.33482690810950194,"2648":0.3825105182462768,"2649":1.9816172711495947,"2650":0.31256063492763375,"2651":1.1242236513425534,"2652":-1.2669533410255087,"2653":-0.1071486944553026,"2654":5.35159130342831,"2655":6.488500085767865,"2656":1.6269642271351892,"2657":0.5843570240309193,"2658":1.3408761986621673,"2659":-0.5909994133145773,"2660":1.0382660500650944,"2661":-2.178126811294654,"2662":1.3112189137025259,"2663":1.6583629189990405,"2664":0.8358300196294572,"2665":0.35974502949076487,"2666":1.3517698337889055,"2667":-1.5317271979812217,"2668":-1.5113698634026211,"2669":0.2632578486079485,"2670":0.28855082247755737,"2671":-1.0799559487448271,"2672":0.590966172285428,"2673":0.5083657534732421,"2674":0.06418590630984476,"2675":1.3569209849171273,"2676":0.4148568799364823,"2677":-1.141682495353834,"2678":0.6330162459815974,"2679":-0.5997359822051864,"2680":0.5486412802228433,"2681":-0.7235293592870659,"2682":1.542332986209848,"2683":0.5279554150695194,"2684":0.5052032282899763,"2685":-0.01655295331225198,"2686":-0.27848988863185625,"2687":-0.2780144145086116,"2688":1.7102009797553386,"2689":0.8757084666164576,"2690":-0.7926933717767811,"2691":-0.3644139521933388,"2692":1.0421432700618956,"2693":-0.4430407350345455,"2694":0.07196161770039408,"2695":-1.216986572675549,"2696":-2.2905968646889012,"2697":0.1884523706913568,"2698":-0.8851782320454412,"2699":0.5330110640128352,"2700":1.2977119440349694,"2701":0.520039721985925,"2702":0.5773511174979973,"2703":-2.577193723901336,"2704":-2.588177470924654,"2705":-0.6966658070444285,"2706":-0.007596210771102769,"2707":-1.982124975382652,"2708":-2.09575428242976,"2709":-0.5180969855740956,"2710":-1.7338161628267246,"2711":0.9303858525496257,"2712":0.025953077540799025,"2713":0.7943385591065956,"2714":-0.7476584650254385,"2715":0.35980504987133627,"2716":1.4951016768598393,"2717":-1.6902048652995165,"2718":1.10705326369791,"2719":2.133518493556445,"2720":-0.5659820233519481,"2721":-1.1385534351609499,"2722":1.158796572101374,"2723":-0.15694155653286396,"2724":0.8771829329906475,"2725":-1.1805177210206295,"2726":-0.04955784443277144,"2727":0.653483419386151,"2728":0.7759905011842086,"2729":0.5649484816498587,"2730":-2.5696605706930007,"2731":1.0774838103355129,"2732":-0.6204156347030785,"2733":0.35858747480899206,"2734":-1.062143777547951,"2735":-2.2050232132960343,"2736":0.08615073569368707,"2737":1.010342945910835,"2738":-1.5720150027321291,"2739":-0.29652533669337927,"2740":-0.07473719426070191,"2741":-0.36980907189499507,"2742":-0.1105413066274165,"2743":1.0734213645521715,"2744":1.3538909149609002,"2745":-0.47074361694903116,"2746":-0.9149109447083156,"2747":-0.11545394826968113,"2748":2.335727461938259,"2749":0.4192499321245079,"2750":-0.3665874246692535,"2751":-0.6733640547105407,"2752":0.28727060806764954,"2753":-0.4406653422601503,"2754":2.9807229351689695,"2755":3.0019420066085645,"2756":-2.009029208415118,"2757":-1.2427743317879119,"2758":-1.9907520074486356,"2759":-0.8007464774590213,"2760":-0.6171340815133349,"2761":0.7258551277147868,"2762":-2.3092597559697325,"2763":1.0931582314184904,"2764":1.2132569619819915,"2765":-0.5446592998288023,"2766":-0.37601365880798676,"2767":0.6249802478159783,"2768":0.4470626015422523,"2769":-3.691856298701496,"2770":-0.4803986482627809,"2771":0.6924569721536274,"2772":-0.4841054713600096,"2773":0.45061279306937,"2774":-0.22475911504922746,"2775":0.6311157319639464,"2776":2.2502160411035295,"2777":-0.22811051205490712,"2778":-1.5212488503237465,"2779":-0.5204524394493826,"2780":0.3138288819429274,"2781":1.1791506118298414,"2782":-2.7314477946171456,"2783":-1.203619377965394,"2784":-0.6051560295094173,"2785":0.5650185337951652,"2786":1.1482488113414722,"2787":-1.3599312169566427,"2788":1.396891231277025,"2789":-0.770666886769138,"2790":-1.0054831232969175,"2791":0.3335735025930881,"2792":0.9936409854556225,"2793":-0.7544584933864361,"2794":-1.80509214221462,"2795":-1.028085168225896,"2796":-1.580530461467868,"2797":0.9966605224688725,"2798":-2.698784565684603,"2799":-0.2316023571568661,"2800":-0.4738306743375541,"2801":0.529440704040307,"2802":-0.27241612371486135,"2803":-0.4296724808433731,"2804":-1.6437175118758536,"2805":-1.9947038130355523,"2806":-0.279938065345813,"2807":0.8080031303477281,"2808":-0.47866345291423623,"2809":1.0208853429488713,"2810":0.3157528795234488,"2811":-2.236874076885743,"2812":-1.16377847999271,"2813":-1.117489658499973,"2814":-0.32007018494668266,"2815":-2.163143579228919,"2816":0.30395812457601457,"2817":-0.11979807440011622,"2818":-0.18851844390353406,"2819":-1.566045823345258,"2820":-0.672371065939589,"2821":-2.7652987528292456,"2822":-1.6455471232340717,"2823":-1.5995070148505994,"2824":-0.6198589258222168,"2825":0.7030656350986396,"2826":1.0321062335659363,"2827":0.5672275515061972,"2828":-0.9527034885070165,"2829":-0.06602371765948721,"2830":-1.7949628970875597,"2831":-1.259801314966989,"2832":-1.5694763373137186,"2833":-0.1179652624533092,"2834":1.3042021547756018,"2835":0.30322111259527124,"2836":0.10762252991266585,"2837":2.1498972469235027,"2838":-0.13553801536265192,"2839":-1.6950840196489803,"2840":-2.0372106450145813,"2841":-1.3389006839687023,"2842":-0.5982178363997818,"2843":-1.7588429200428841,"2844":0.3753252501672271,"2845":2.8738470612925897,"2846":0.24239376534873236,"2847":-1.3451607937619365,"2848":-0.30579926014724396,"2849":-1.3128104356403096,"2850":-1.0016667392329828,"2851":0.9688835761607616,"2852":0.7811625140692361,"2853":0.741021572440301,"2854":0.6869309883085987,"2855":-1.650405641002836,"2856":-0.3489909843019295,"2857":-0.35052108274650207,"2858":-1.3747315679543726,"2859":-1.7540483004542966,"2860":0.19364314384549938,"2861":-1.3798135820662776,"2862":-2.481206804784459,"2863":1.496425945950947,"2864":0.9003809105229078,"2865":-1.7687723362613081,"2866":-1.1018641986450664,"2867":-0.9516190253436975,"2868":-0.33770886870616723,"2869":-0.12345097817945457,"2870":0.1768199644707793,"2871":-0.4271956263788031,"2872":-0.2198423107821455,"2873":1.2179780443057775,"2874":1.8734993983907844,"2875":-0.7450805100546466,"2876":-0.33453208860184497,"2877":1.036455396597217,"2878":-0.1664948086100423,"2879":0.18279302935894753,"2880":-1.036197302231273,"2881":-1.078239566381307,"2882":-1.9881571469422818,"2883":-0.7565387395307973,"2884":0.056505413856632034,"2885":1.1510843166870373,"2886":-1.6415487338028305,"2887":-0.8791946734197952,"2888":0.35437201401921675,"2889":1.538497642602044,"2890":0.4187494029079438,"2891":0.501665546780164,"2892":0.5224130099023632,"2893":-0.8768387970167985,"2894":0.3872269339255245,"2895":2.487886193021929,"2896":-0.06919538825976734,"2897":-0.4914069400324029,"2898":-0.33607995755598585,"2899":-2.4026357980649227,"2900":0.19454368617705536,"2901":0.026983092497554394,"2902":1.7015157773749545,"2903":1.450058150603502,"2904":2.377907966069858,"2905":1.62105289385099,"2906":-0.08610966121799973,"2907":0.11543312718352641,"2908":1.399230625759475,"2909":-1.9756203427462566,"2910":0.014287569275692838,"2911":0.6123460596322902,"2912":0.19719585498963338,"2913":0.8254138064207791,"2914":0.6763742542686518,"2915":0.4151251949042754,"2916":0.6907941280648885,"2917":-0.8384253869242776,"2918":-0.5370078497261485,"2919":0.8285369577470884,"2920":1.7988740140155415,"2921":0.19927479046271113,"2922":-0.4153016322631723,"2923":1.5601173558607688,"2924":0.8867054396921699,"2925":2.106775383673912,"2926":-1.085149184992127,"2927":-0.6234478867898715,"2928":0.8709197303613205,"2929":-0.05117773474605945,"2930":1.3258713486604252,"2931":2.393296412093951,"2932":0.3201965654501909,"2933":0.2007634010079082,"2934":-1.0828371028225081,"2935":-0.6941371550838853,"2936":1.5154259256417864,"2937":1.7488427100057862,"2938":1.267855143991399,"2939":0.9599471819966827,"2940":1.3664627468193387,"2941":0.5544983497005536,"2942":1.3782172166362832,"2943":1.7498877889747309,"2944":-0.4935139211187752,"2945":-0.023660881874934005,"2946":-0.3055088286542638,"2947":-1.4419748321821804,"2948":1.2909728259097608,"2949":-0.6419586876688856,"2950":1.4861385881768165,"2951":1.3943422864347013,"2952":1.4290655049825358,"2953":-0.8170495621636751,"2954":0.7111211877876844,"2955":-0.6510800628958414,"2956":0.32634983197273837,"2957":-2.2380228489534026,"2958":-1.251426261541786,"2959":-2.3470265632206124,"2960":0.030671142359926268,"2961":0.8163783686875282,"2962":0.45716926559737664,"2963":0.8790932098956619,"2964":1.3830678553486424,"2965":-0.08704113138181133,"2966":0.2906421656528382,"2967":0.2844929857642617,"2968":-1.6606371344106055,"2969":-2.0828881528382404,"2970":-1.265484998423031,"2971":3.1442883547612617,"2972":1.7656329716212409,"2973":0.6441729586823823,"2974":3.0901521700280687,"2975":2.1847304786794512,"2976":1.852565254259962,"2977":-1.3322122576575004,"2978":1.2254408999699753,"2979":-0.23768987121324556,"2980":2.2551489371359903,"2981":2.8611023109302565,"2982":3.7185001165927924,"2983":2.779360935928569,"2984":2.679612833028397,"2985":1.1061799406283923,"2986":-1.7449141553079137,"2987":0.6614183342055643,"2988":0.051141184440932554,"2989":-0.6363401627532178,"2990":-0.4873061697044459,"2991":1.2339138921633104,"2992":1.0259194887646306,"2993":-0.841536043863725,"2994":-0.582767922659055,"2995":0.33486562246749835,"2996":1.2041054047391686,"2997":-0.017797397989372365,"2998":-0.5603304177507868,"2999":-1.6736563494197825,"3000":-3.3053571446287924,"3001":1.1864372763002842,"3002":-2.3776992755080117,"3003":-1.101059602439224,"3004":0.6083993151967769,"3005":0.08813020346310924,"3006":0.445098990386712,"3007":0.06968721281732657,"3008":0.14169394481959788,"3009":-1.77649004450113,"3010":-0.5624437666333216,"3011":-1.624136652128065,"3012":0.09408865985514099,"3013":-1.7134111027854289,"3014":0.039833007376295526,"3015":-1.0586170610804175,"3016":-0.9832636272715974,"3017":1.3830527814035942,"3018":-1.0006368278183495,"3019":0.8116858861399731,"3020":-0.9487435198778588,"3021":-0.22941646149856199,"3022":-0.1407468719191976,"3023":-1.4918278983584068,"3024":-0.5776689455503381,"3025":-1.2782390109045079,"3026":-0.8182074061342371,"3027":1.2358176384194577,"3028":0.20577804905090935,"3029":0.46597661011769936,"3030":0.4556777333988176,"3031":-0.7119811200836432,"3032":-1.0449127337972361,"3033":-0.39435827267166035,"3034":-0.6146435734372684,"3035":1.446207563936899,"3036":-1.9418943469525352,"3037":-0.3526282829724758,"3038":1.638958209212937,"3039":0.034434061653454404,"3040":-0.21316939257017234,"3041":0.3232614557316135,"3042":0.40443849300323004,"3043":-0.7627604140602499,"3044":1.400549854498154,"3045":-1.0282361196112964,"3046":-2.441644207622169,"3047":-0.49457247704707846,"3048":1.4190300588355784,"3049":1.2279493231914929,"3050":1.02427414238179,"3051":0.7879344531644404,"3052":-0.8165722743098696,"3053":-0.25893559115130854,"3054":2.346752242340738,"3055":4.020889071364034,"3056":2.722587459732551,"3057":1.2511942108503091,"3058":-0.35048983265256056,"3059":-0.43524716716023115,"3060":1.3691500220798671,"3061":0.029875564921737485,"3062":0.829453235165127,"3063":1.1344632474952006,"3064":0.3838282653475685,"3065":-1.6553096057167431,"3066":2.879555930921769,"3067":1.1551521986816258,"3068":-2.329890671707797,"3069":-0.7069558963259477,"3070":1.2338088807754264,"3071":-4.119398792732017,"3072":-2.5388619551834704,"3073":0.9089735813008337,"3074":-1.3178457889181348,"3075":-0.03781597494552756,"3076":-0.19453096141269716,"3077":-0.09534223301305467,"3078":-0.22294106378022818,"3079":-0.8347549941631764,"3080":0.291951246439047,"3081":0.8031494746459891,"3082":0.3562556474611583,"3083":-0.9764566768872892,"3084":-0.25613185847190395,"3085":-3.394133896723789,"3086":-2.158647390919704,"3087":-1.744367858803103,"3088":-0.22837370343928926,"3089":-0.444052711181598,"3090":0.201628714987676,"3091":1.2105813835112749,"3092":0.5524675258415274,"3093":1.591293884467894,"3094":0.570112493918301,"3095":0.5955052606710514,"3096":-0.24895123533741917,"3097":-0.27665734604129416,"3098":0.3969942953212055,"3099":0.8163411754591657,"3100":-0.6746965239360071,"3101":-1.944664550863125,"3102":-1.151398415958813,"3103":-0.10087351169826343,"3104":1.4198219623611283,"3105":0.33883079773364033,"3106":-0.7838198436483146,"3107":0.4664188417360579,"3108":3.0934905433495885,"3109":-0.5509492143651428,"3110":-1.834404005039897,"3111":1.385529373317969,"3112":0.6608847392223159,"3113":1.9469514100388472,"3114":1.3296492096201273,"3115":0.6431693990331402,"3116":0.6977696900987563,"3117":-0.2403027709599713,"3118":-0.6170353857282174,"3119":0.3312778891383139,"3120":0.7342028324115683,"3121":1.1484056006819032,"3122":-0.8282668790449582,"3123":0.07555928125056935,"3124":0.23630565389665667,"3125":-0.015262672615686151,"3126":2.094604951862174,"3127":-0.12088554126711337,"3128":2.7465964077041765,"3129":-0.027747628811080786,"3130":0.005731223968967685,"3131":0.4973226709472304,"3132":-0.5955134229559821,"3133":-0.29131771990444605,"3134":-0.45098716264852795,"3135":0.16367349061921402,"3136":1.5122415537607148,"3137":0.649034015842116,"3138":0.449766057569716,"3139":1.7964768892790635,"3140":0.8988628449858022,"3141":-0.9350673894952077,"3142":0.6149566312912719,"3143":-0.5662597105804633,"3144":-0.6714000790796523,"3145":1.0864272685438578,"3146":-1.2415631804599425,"3147":0.43541786037486324,"3148":0.06861039460702371,"3149":-1.0115029469624233,"3150":0.8958388360805778,"3151":0.39040373580777893,"3152":0.8179455080276269,"3153":0.06526737316331291,"3154":0.39390738555752175,"3155":-1.9395519594279285,"3156":0.7721365358709542,"3157":-1.672925665175268,"3158":-0.7948260923094835,"3159":0.8201171152606065,"3160":-0.2123831716635651,"3161":-1.747937602775848,"3162":-0.570281076391252,"3163":0.20841162430379395,"3164":-0.727245001758538,"3165":0.3831202304311165,"3166":0.9115490970728262,"3167":1.035064432577813,"3168":1.4710302888652103,"3169":0.28986258422126376,"3170":-0.7399867271026283,"3171":0.252716481428053,"3172":-0.8836359194778488,"3173":-0.11131575003394999,"3174":0.6755461906730227,"3175":1.3004183355912726,"3176":0.5299402185771964,"3177":1.2530471350322876,"3178":1.3419785452932536,"3179":0.13948393513267066,"3180":1.2231621554822147,"3181":0.9481820282472161,"3182":-0.15846280960460718,"3183":1.1042413454628128,"3184":-0.35075478276107575,"3185":0.31506886137430723,"3186":-1.2597810443454642,"3187":-0.7472107699504065,"3188":-0.7081282721661009,"3189":1.3251562556894596,"3190":0.36130532619054956,"3191":-0.7041280103386607,"3192":0.8075275236953092,"3193":-0.4256425452033669,"3194":1.315185696497757,"3195":0.9797528540189946,"3196":0.705135033327679,"3197":0.7183075557980428,"3198":0.21611522411236145,"3199":-0.6629632692469308,"3200":-0.3027710577428525,"3201":0.13976050607673296,"3202":1.5509890383779195,"3203":1.4079842058721175,"3204":0.5838887132035985,"3205":1.9060025435711936,"3206":0.5806505404468233,"3207":0.5231102696105658,"3208":-0.9374348767590023,"3209":0.13208851568098376,"3210":-1.1568631415264101,"3211":0.40534403871109015,"3212":1.9080752429820171,"3213":-0.17426816710021276,"3214":1.1422791862589599,"3215":0.4931254630013664,"3216":-0.32359789090444907,"3217":-0.1223461999930542,"3218":0.30458830692464106,"3219":0.6683693481910583,"3220":1.5181654594310106,"3221":2.3353467427044636,"3222":0.30941893742003984,"3223":0.40423096413330745,"3224":1.501179250106397,"3225":0.8121272990484804,"3226":0.8298988632878548,"3227":1.7993586498028193,"3228":-0.00036290351907813576,"3229":-1.0370441670669743,"3230":2.1135280209716867,"3231":2.4822035812602494,"3232":-1.205423983385466,"3233":-0.3501063234230412,"3234":-0.9798891656346511,"3235":-0.25278435417122896,"3236":0.6639881088904073,"3237":-2.1844285387382585,"3238":-0.27643981122869743,"3239":0.6460548008182334,"3240":1.9006482693726354,"3241":0.2684483551831715,"3242":1.7599370598876813,"3243":-1.0457858126385795,"3244":-1.3676980012404567,"3245":0.80858727510993,"3246":-0.0320291973384579,"3247":2.049675285093324,"3248":-0.10475617534858074,"3249":0.3868985443077667,"3250":1.6171958569369194,"3251":-0.05335475942168251,"3252":0.3772084470565314,"3253":0.7303646920581042,"3254":-0.6821542589641852,"3255":-0.8739454306622998,"3256":-1.127825099177031,"3257":-0.5948529326830201,"3258":2.072526097610888,"3259":1.2225328877495085,"3260":0.7853865280071161,"3261":1.4536534728319956,"3262":-0.4670713941993496,"3263":-0.31073623967378705,"3264":-1.4360280285629474,"3265":-0.26717725808501697,"3266":1.0341537908911411,"3267":1.190556348430764,"3268":1.1333019606913723,"3269":-0.4146445426232131,"3270":-0.17843933125561934,"3271":-1.7194441251989008,"3272":-1.2052022223240755,"3273":-1.13825848160761,"3274":0.38419053003321557,"3275":0.9019181087045582,"3276":2.001634018218959,"3277":1.2979060101830668,"3278":0.8323687164077928,"3279":0.39903905314225896,"3280":0.5720068318101821,"3281":1.373314078719458,"3282":-0.23503111143582925,"3283":0.8359984491224443,"3284":-0.22546812850078182,"3285":-0.22232852264712796,"3286":-0.4367389350527513,"3287":-0.4977888789279492,"3288":0.8962709886043426,"3289":0.10349879118730267,"3290":-0.6839224486000526,"3291":-0.6164825996496796,"3292":0.3771674588369034,"3293":-0.22010714405467977,"3294":-0.87580749903078,"3295":0.31851131847800995,"3296":-0.481976950889621,"3297":-0.595479993049384,"3298":-0.2834396338634766,"3299":-0.4032403412611939,"3300":-1.1596098622605726,"3301":-0.8502323943507422,"3302":-0.125315671640563,"3303":-0.6739775550522501,"3304":0.8139246510083106,"3305":-1.0221277283643262,"3306":0.16587065567515835,"3307":0.12609732301298546,"3308":-0.4918220648500563,"3309":0.06908806671289648,"3310":8.989440107092731,"3311":9.636164719365695,"3312":1.3621931649917034,"3313":1.2389778455013305,"3314":0.9930346998434105,"3315":-0.44606725955600096,"3316":-0.4632686473499829,"3317":0.06375210138886571,"3318":0.47287323191962577,"3319":-4.859902817184094,"3320":1.3051426154645667,"3321":-0.27979328472700726,"3322":0.30577794498124894,"3323":0.6692292895754627,"3324":0.5860992829961837,"3325":-0.32939004006563216,"3326":0.17892170093640922,"3327":-0.3461804304144667,"3328":0.03026727380388504,"3329":1.1192369100619493,"3330":0.6437149878958871,"3331":-0.8335566756634737,"3332":0.2932267936357422,"3333":0.12789272785009556,"3334":-0.6843195517894256,"3335":-0.5611206067506248,"3336":0.19446741032760162,"3337":1.0246832453237147,"3338":0.4470824585309274,"3339":-0.20083108066375782,"3340":-0.4235687419983027,"3341":-0.627318484051368,"3342":0.6684167033378536,"3343":0.6019424898642961,"3344":-0.2839539072888228,"3345":-0.8059261230974005,"3346":-0.1397984920696183,"3347":-0.8680920970072211,"3348":-0.33200572233721204,"3349":0.44851656216467173,"3350":0.30557372427677504,"3351":-0.06573090799972803,"3352":0.2865777406233006,"3353":0.8451288851400461,"3354":0.8192048666717499,"3355":0.8409252922814098,"3356":0.06897253549062111,"3357":-0.9451608518661967,"3358":0.060915721424156015,"3359":0.10846211936859648,"3360":1.6178313168843546,"3361":0.7352209624974122,"3362":1.7921416752367973,"3363":-1.6795736491368265,"3364":-0.22127690412481923,"3365":-1.6173476349200708,"3366":-2.6696959740973196,"3367":0.02778287534334655,"3368":0.05725605926155093,"3369":-1.130034759410557,"3370":0.08203665086760395,"3371":-0.20310303084753167,"3372":0.8766530441789715,"3373":1.472330566509124,"3374":-0.9825182817638424,"3375":0.18217365064434016,"3376":-0.8413920619652083,"3377":-0.405722972239856,"3378":-0.50582853066858,"3379":-0.25078633760773145,"3380":-0.06139084652370184,"3381":-1.8504694521836442,"3382":-1.1656211218755201,"3383":-0.9022930479012112,"3384":-1.181148272106492,"3385":-0.17171346332385817,"3386":-0.5156144545168068,"3387":-1.2531573873625133,"3388":-1.3910684168517697,"3389":0.9669415604490381,"3390":-0.3850003170531968,"3391":0.16453155592392962,"3392":-0.9445747085503532,"3393":0.11797785476964018,"3394":-1.5980802264991267,"3395":-0.529368220077319,"3396":-0.17994454255918807,"3397":-0.1842420425726214,"3398":-0.655570752146532,"3399":-1.4323076869267832,"3400":1.635564994794331,"3401":-1.389492983482016,"3402":-2.4261052376526733,"3403":0.14868716696030376,"3404":-1.1240493111472263,"3405":-0.28330202147529343,"3406":-0.08202673716376943,"3407":-0.8550915021163832,"3408":0.5313121918408856,"3409":-0.5557084706119073,"3410":-0.10299459038179393,"3411":-0.82818567706098,"3412":-1.0456427492635878,"3413":-1.4152439634895195,"3414":-0.43544338914407077,"3415":0.49935480623444944,"3416":1.322366446444709,"3417":1.5683300217360543,"3418":1.880057981440035,"3419":-2.3004744797062537,"3420":-0.3259095291934545,"3421":-0.5007148221483178,"3422":-1.6459836861897983,"3423":-0.25710087341178034,"3424":-0.693301906110807,"3425":0.4554387113965292,"3426":-0.4096623092693939,"3427":-1.069657317961036,"3428":0.3063097856677499,"3429":-0.44667288484706313,"3430":-0.071208368459163,"3431":-0.8113773615667941,"3432":-0.5135271045350873,"3433":-0.7279638056275851,"3434":1.2392730090924793,"3435":-0.046685535874737,"3436":-0.3823306852511271,"3437":-1.6885407611770689,"3438":0.10785075772533714,"3439":0.7065492247855694,"3440":-0.9317543970712542,"3441":0.6428195878190166,"3442":-0.9980637306111968,"3443":-0.6434420003188888,"3444":-0.03581633019594204,"3445":-1.319295551987171,"3446":1.9726820493632231,"3447":-0.06926579518345843,"3448":0.2053684837587484,"3449":-0.06203121178287263,"3450":-1.4651930961449393,"3451":-0.5584046362723954,"3452":-2.475921579028681,"3453":-1.3022451440068907,"3454":0.7136953586990543,"3455":0.01448640770958148,"3456":-1.1587740882455426,"3457":-0.3833785744576528,"3458":-0.5864498215900676,"3459":-1.0491469697233387,"3460":-0.7913996456549897,"3461":-0.7783007147193137,"3462":0.6954580096188324,"3463":-1.4534652466961266,"3464":0.8456479409857929,"3465":-0.5293967749385112,"3466":-1.0205688659300909,"3467":1.4934802776610434,"3468":0.9618005203024846,"3469":-2.5775642836635417,"3470":0.7486277677240036,"3471":-0.3522610002712797,"3472":0.2708189593063211,"3473":0.24396075895643515,"3474":0.444763834173261,"3475":1.5768179834173284,"3476":1.847704790526403,"3477":-0.5965176945191285,"3478":0.45663258843606847,"3479":1.419998867997543,"3480":-0.6675505003618906,"3481":-0.10801147279232913,"3482":-2.0708335363466857,"3483":0.8429740816967767,"3484":-2.852015356461564,"3485":-4.546317632023022,"3486":-2.7157433224567975,"3487":-0.40240219021533413,"3488":-1.1563826324183901,"3489":-1.3370608310196235,"3490":1.4459086910888155,"3491":0.6003497015454258,"3492":-0.1428175195286327,"3493":-2.733031093974973,"3494":-0.9666620370402573,"3495":-2.436661591983358,"3496":-2.528006234293675,"3497":-1.5541038638840632,"3498":0.5023667029660372,"3499":1.5684641321806023,"3500":-0.9084011913966942,"3501":-0.986921889247151,"3502":0.49875678476730106,"3503":-0.8818460409648542,"3504":-0.4526911797999523,"3505":-1.632602206864547,"3506":-0.6740234131944297,"3507":-1.0399525712426259,"3508":-0.4658546769442899,"3509":-0.2381967899092637,"3510":-0.6421364836940754,"3511":1.459704317395634,"3512":0.47334215918189515,"3513":-0.7805091026970656,"3514":-1.897521128100792,"3515":0.27269818479767327,"3516":-0.42211167666261235,"3517":1.0038426367941282,"3518":-0.6334063594203679,"3519":-0.4818972908529899,"3520":-0.8735841955811813,"3521":0.04841914479850177,"3522":-1.5403823623107866,"3523":-1.794886253030234,"3524":-0.7338089197562774,"3525":2.260038919155335,"3526":-0.4143606452427949,"3527":1.402023497313049,"3528":-0.24799528537654714,"3529":-1.0057977023598812,"3530":0.6340133300367355,"3531":-0.9122372336722995,"3532":0.5677361383815673,"3533":-0.1162002460433415,"3534":1.2444379829118644,"3535":0.5028085563780359,"3536":-0.9841728052019842,"3537":0.11526631172519126,"3538":-0.49778988753085573,"3539":-1.556528202330319,"3540":-1.077936114891106,"3541":0.46654325543697195,"3542":-0.6227875578171786,"3543":0.6659946883603552,"3544":-1.0391734606681615,"3545":-0.14128827681445463,"3546":-0.10304997146650773,"3547":0.27394634615133695,"3548":-0.32430412770507394,"3549":-0.3824432155082197,"3550":-0.48352137950552987,"3551":0.8916037781746068,"3552":-0.333702286017814,"3553":4.036039046109897,"3554":-0.0852263024065926,"3555":2.4596838219665065,"3556":3.2160436633695046,"3557":-2.4609929362110017,"3558":1.938958464663687,"3559":-0.1692930751265691,"3560":-0.9544382419460568,"3561":-1.059226790894867,"3562":-1.448514487457722,"3563":-0.18904151139722444,"3564":0.4200702167565721,"3565":2.241603669818514,"3566":1.997577865768883,"3567":-2.23857254622861,"3568":2.306259592883033,"3569":0.10274256296701936,"3570":-0.9803506773737873,"3571":-1.6433727865778798,"3572":0.3707163644446374,"3573":-0.5936645995137276,"3574":0.04756741591518066,"3575":-2.485266534733626,"3576":1.2716490179487012,"3577":0.1302982229822522,"3578":-0.0918071643762622,"3579":-0.8107620464689138,"3580":-1.5941796799785095,"3581":0.8809182534770414,"3582":0.9332797359711476,"3583":0.5236697218204898,"3584":-2.744959517208318,"3585":0.1516578618883905,"3586":-0.6456765429830278,"3587":1.928117138360429,"3588":-0.6805247403605453,"3589":0.9267054538932595,"3590":-0.6934734078555314,"3591":-0.33804475477694734,"3592":-1.7824395249348555,"3593":0.5669260437208646,"3594":-0.2904193431033013,"3595":-0.43797556319476805,"3596":-1.10245152422366,"3597":0.28620748866588946,"3598":-1.0510033276249768,"3599":2.282775395512041,"3600":2.196133246319226,"3601":-0.9459697471621159,"3602":-0.7431880146182687,"3603":-1.0735652181421125,"3604":-1.4719230715794156,"3605":-0.607899117664539,"3606":0.40819791376470277,"3607":-0.6057128512582652,"3608":-1.3338906653321336,"3609":0.05237853251601674,"3610":0.030600559547136155,"3611":-0.03486768030720581,"3612":0.2708249066644768,"3613":-0.5409970170826134,"3614":0.42005164031061065,"3615":0.2263822007801544,"3616":0.5415938129519899,"3617":-0.7478331057478477,"3618":-1.2086200150069029,"3619":0.5971314965544017,"3620":0.41562527362080937,"3621":-0.4200763153483038,"3622":0.28517580229747125,"3623":-1.0742856135260979,"3624":0.6454534680602919,"3625":0.9460723421876026,"3626":-0.7373811620765844,"3627":0.09134837414193397,"3628":0.3144091942598097,"3629":-0.17019517300254006,"3630":-0.17496082107894936,"3631":0.7794308860012888,"3632":0.6297603747645437,"3633":0.6006832404332821,"3634":0.426897316337965,"3635":0.35369394282838995,"3636":0.79424299787712,"3637":-0.9716287454909552,"3638":-0.35071420674088394,"3639":0.1518616094007534,"3640":-0.3384307347363393,"3641":-0.12475743108666777,"3642":-0.6508373232335616,"3643":-0.37626578430594093,"3644":0.19257775702644758,"3645":-0.24674771035035556,"3646":0.2738433969493996,"3647":10.125241900753428,"3648":0.4488545825881676,"3649":0.19515405649566755,"3650":-0.16923068519115378,"3651":0.43311851585622163,"3652":-0.5159110843657279,"3653":0.9166175314079578,"3654":0.8159192843142822,"3655":-6.104058193108652,"3656":-8.931596163743167,"3657":-6.666238049823123,"3658":-0.928963075878308,"3659":-1.0472325876488855,"3660":0.7473158076824576,"3661":0.06866418216235479,"3662":0.030256708506400287,"3663":0.14220272112285928,"3664":0.44693549159244694,"3665":-1.160534659564203,"3666":-1.2721331159850429,"3667":-1.0837160158712398,"3668":0.20607249179028367,"3669":0.18852374985981155,"3670":0.6043778271967339,"3671":0.06029592593239049,"3672":-0.54414880892428,"3673":0.25745792883177815,"3674":0.27675971298517044,"3675":-0.002455810889817087,"3676":-0.06442829523019324,"3677":-0.23525302749959748,"3678":0.6173642080302744,"3679":0.1721250026537776,"3680":-0.5023448635842863,"3681":0.46133801087501936,"3682":-0.12117372327354826,"3683":-0.6972954922972713,"3684":-0.5978703756148483,"3685":-0.5765692020737573,"3686":0.037326136106514654,"3687":-0.7481531577655471,"3688":0.6375571924180654,"3689":-0.19286332269664178,"3690":-0.3964630374349871,"3691":-0.9194674202245212,"3692":-0.02915334348201839,"3693":-0.1539877843061274,"3694":0.18164041330211944,"3695":0.3844528815145776,"3696":-0.27681937216736235,"3697":0.26555594355610157,"3698":-0.1622201518977751,"3699":-0.9464794808219756,"3700":-0.24066117742015267,"3701":0.08788792017262415,"3702":0.2981191559086434,"3703":0.1807319912072637,"3704":-0.4244590901627656,"3705":-0.5205449930728157,"3706":-0.13958531628572052,"3707":0.3241858842652871,"3708":-0.34991217371018474,"3709":-0.5655711583497173,"3710":0.4553559164019208,"3711":0.11803482763560608,"3712":0.2918554929206127,"3713":-0.46898823785188676,"3714":0.17283394904514154,"3715":0.02613579265933284,"3716":-0.013561186118276893,"3717":-0.22980001559165095,"3718":-0.2557602069818238,"3719":-0.6812266953688961,"3720":-0.07259110152976295,"3721":-0.43847688376274435,"3722":1.0388937130934182,"3723":0.2741950334774484,"3724":-0.5335592734268817,"3725":0.021362939217211316,"3726":-1.9701851117293843,"3727":10.100192386159604,"3728":9.354935198074154,"3729":-0.17573933052253146,"3730":0.38983554828903044,"3731":-0.061092940225184696,"3732":-0.49296591765734443,"3733":0.054014195111786456,"3734":-0.48658153533566856,"3735":-0.14907522024260353,"3736":-0.4720912213016169,"3737":0.018050044369309775,"3738":-0.0997763437235997,"3739":0.1473672306746408,"3740":-0.07483389018477875,"3741":0.20700389555627943,"3742":-0.13300673263105162,"3743":-0.33141276568293204,"3744":-0.5972427968077195,"3745":-0.6068619652352186,"3746":0.2355337641982936,"3747":-0.0196508551174234,"3748":0.3938577857295922,"3749":-0.22365034353966134,"3750":-0.4888923796150281,"3751":-0.09196576679747119,"3752":-0.3192932640906927,"3753":-0.45819769046257647,"3754":-0.7834781891504525,"3755":0.2276087483829422,"3756":-0.3492726865170235,"3757":-0.6194420246829008,"3758":0.41137997640122276,"3759":-0.2837602437697162,"3760":-0.11187669227082547,"3761":-0.3574902717469913,"3762":0.12065281541628468,"3763":-0.4981583526706329,"3764":-0.09338059542969605,"3765":0.4367609858628583,"3766":-0.2852724461774679,"3767":-0.11362567066820844,"3768":0.553655320049084,"3769":0.3482561738494094,"3770":0.24818640365636396,"3771":0.020313602626485714,"3772":0.32202341896921977,"3773":0.7912717170312439,"3774":0.971250727624871,"3775":-1.153744799206253,"3776":0.6880852221017839,"3777":-0.8510788740045429,"3778":0.43766897306810737,"3779":0.06108205903240941,"3780":1.5104008936112845,"3781":-0.07812197182200192,"3782":0.18649460439640309,"3783":1.9934118288452192,"3784":1.5402412564606127,"3785":0.7916942778563811,"3786":-0.7205926565364307,"3787":-0.4541898925962032,"3788":1.9333288299518074,"3789":0.44591753579855864,"3790":0.9469345784084994,"3791":-0.9327701847137579,"3792":-1.7914794098622495,"3793":-1.5424361717995392,"3794":1.7410435025972901,"3795":-1.5452267405697644,"3796":0.39769272850714893,"3797":-1.2389139665867508,"3798":-1.076028423060049,"3799":0.6403255272772604,"3800":1.5071562929366011,"3801":0.19399122114557743,"3802":0.3130796437385121,"3803":-1.1419029528744469,"3804":-1.5003282599662262,"3805":-1.2182284114400355,"3806":-1.719380673278279,"3807":-0.4151319068582624,"3808":2.2128311891634826,"3809":-0.46574969106120756,"3810":0.03094530101660989,"3811":0.24539041163396572,"3812":0.2446719108437922,"3813":-0.23778900774905226,"3814":-1.4269627627023949,"3815":-0.8822558584606576,"3816":0.4022716712066981,"3817":0.22188213525712813,"3818":1.3196229081541737,"3819":-3.1196572150850215,"3820":-4.344277698527503,"3821":-0.24425926904230266,"3822":-2.034877206225604,"3823":-2.143547000410119,"3824":0.7330227376511252,"3825":-0.045241382164226435,"3826":0.45126030196411193,"3827":-0.8660539447018378,"3828":0.44530625090884113,"3829":1.4208658292736724,"3830":-2.88920333769514,"3831":-2.585090888686305,"3832":0.4863028911216576,"3833":-0.14535367509167513,"3834":-2.0797424686467796,"3835":0.6032214184388575,"3836":-1.4276499921537475,"3837":0.3045336169897858,"3838":-2.908330686084984,"3839":1.0658530643174953,"3840":-0.6553092083958985,"3841":1.0760521582622862,"3842":-0.21829364861234624,"3843":0.16536200740144788,"3844":1.6267897933994673,"3845":1.2664056414186244,"3846":0.24336653633834968,"3847":0.9624441830206846,"3848":2.2817704553777576,"3849":-0.6990632520392587,"3850":1.3557781598958807,"3851":0.2463693993169328,"3852":-1.1335546071746812,"3853":0.9517425807087948,"3854":0.47439146663136833,"3855":-1.8188572877218934,"3856":0.29989870103130034,"3857":1.0285899398361098,"3858":1.7487480806142108,"3859":1.11736362126377,"3860":0.6334770243670326,"3861":0.7132031985303499,"3862":0.7222807619374557,"3863":-0.9394136529697731,"3864":-0.6868644997332807,"3865":1.029947124904486,"3866":3.6831216203014825,"3867":1.607564248398718,"3868":1.1727280470669772,"3869":0.8160487361823412,"3870":0.5578351128124979,"3871":0.5925750863089285,"3872":-2.331185864407697,"3873":-1.7354011420437632,"3874":0.6022317795306129,"3875":2.349946157998331,"3876":1.8627007960515063,"3877":0.5495614612157619,"3878":0.6423846112838267,"3879":0.48603812766136084,"3880":0.571155876461938,"3881":1.0667200719503862,"3882":-0.44841478065284346,"3883":-1.4496867990090674,"3884":2.5130584894561276,"3885":1.6413106134561308,"3886":0.3700826415686091,"3887":0.6327864640772557,"3888":0.6292252329711447,"3889":0.6806114954200706,"3890":1.18205674976872,"3891":-1.1945393675553673,"3892":-1.5258569470963501,"3893":1.556294285200147,"3894":1.169615594809493,"3895":1.35488332771019,"3896":0.46996028240522664,"3897":0.33706815354982705,"3898":0.3848946297797362,"3899":2.0347466627096247,"3900":-0.08768773861816147,"3901":-4.4332142252414934,"3902":1.5683999378106195,"3903":1.5233066363922685,"3904":1.7785764698565825,"3905":0.7209590539714862,"3906":0.6267077073551517,"3907":0.6530332585412951,"3908":-0.3016916979338654,"3909":-0.9360260701427724,"3910":0.26700755741993765,"3911":2.9446465047560206,"3912":1.3657517304437867,"3913":0.8865079746637382,"3914":0.871242054603825,"3915":0.47326526413264924,"3916":0.9819302542168767,"3917":2.101114137163309,"3918":-0.08312753928152505,"3919":-0.16755763152913689,"3920":3.096778235708597,"3921":2.249648578013448,"3922":0.82379216864546,"3923":0.7342047652415433,"3924":0.7972509691282219,"3925":0.40006797790669274,"3926":0.39774673442588954,"3927":-1.6817610076016287,"3928":0.2073248977557105,"3929":1.763642151600921,"3930":1.8372436899858997,"3931":1.5471257679454224,"3932":0.694172304777777,"3933":0.5384162135450341,"3934":0.7891217432957892,"3935":1.4303743063504664,"3936":-0.13864149922268412,"3937":-0.11303326848821554,"3938":0.61150551849927,"3939":0.821022331573809,"3940":1.1681770642199578,"3941":0.3881934315160574,"3942":-0.007250296669623767,"3943":0.3018954537768488,"3944":0.43557059768901557,"3945":-0.31012025412735944,"3946":0.06189891186490205,"3947":-0.038102722362100085,"3948":0.010137133430034027,"3949":-0.7308789119434969,"3950":0.42278679997684304,"3951":0.014609530341594292,"3952":-0.5246778429260391,"3953":-0.3623994300240658,"3954":-0.5061625266031751,"3955":-0.6029555539071001,"3956":-0.080656879784707,"3957":-0.15248265495511915,"3958":0.7343061922508443,"3959":0.426401149625571,"3960":0.9644761113060881,"3961":0.9700981234045153,"3962":0.19984854278884223,"3963":0.5794546677684544,"3964":0.2648014714394827,"3965":0.4849822766199822,"3966":10.222212322088945,"3967":7.919920084524301,"3968":3.6612590885314455,"3969":0.9638593411960374,"3970":0.6634782447342097,"3971":0.43689750398396915,"3972":-0.1780924764890282,"3973":0.27101398519311576,"3974":-0.26936480180806305,"3975":-0.49465311993020694,"3976":-9.251985942567126,"3977":-1.6377619535221082,"3978":-0.876645833140032,"3979":-1.1120211917718825,"3980":0.11228776102042866,"3981":0.25565496965492973,"3982":1.079179106915317,"3983":0.012888645969792435,"3984":-1.9333392915424195,"3985":-2.273268742871222,"3986":-1.8451431391068116,"3987":-0.6912264709641275,"3988":-0.41611869210776903,"3989":-0.563067446263688,"3990":0.008560919621107034,"3991":-0.45447774914482236,"3992":-0.23055283729599513,"3993":0.31890321671176786,"3994":-0.004079110891558436,"3995":-0.11402624153648312,"3996":0.32012694166578,"3997":0.006826490596726639,"3998":-0.15884398530474717,"3999":-0.5075815644138124,"4000":0.7911742835734528,"4001":0.36536549377672606,"4002":0.0611766675848868,"4003":-0.36492610331150527,"4004":0.6581474885802682,"4005":-0.30191490568009016,"4006":-0.05913560628932865,"4007":-0.1862001274482626,"4008":-0.3766330059915336,"4009":0.7607677640859261,"4010":-0.3426271817526748,"4011":-0.3701866792220399,"4012":-0.03308518319983034,"4013":0.48081820318100266,"4014":-0.7512772711190553,"4015":0.31033689841695333,"4016":-0.0518426743324438,"4017":0.519402280353108,"4018":-0.03213102395039315,"4019":-0.35853533350218003,"4020":-0.5599792929703423,"4021":-0.10168029577645356,"4022":-0.5531538470836415,"4023":-0.400431169706408,"4024":0.0666927968065096,"4025":-0.3730666723371091,"4026":-0.03771251884926527,"4027":-0.4274274159487771,"4028":-0.6544690955517254,"4029":-0.08127889327338648,"4030":-0.25704815308538537,"4031":-0.24119545454036195,"4032":-0.17679631188970354,"4033":-0.2785089458972175,"4034":-1.039509171001893,"4035":-0.23446478447230723,"4036":0.9599920364675724,"4037":0.277227769452513,"4038":-0.07110709081083504,"4039":-0.3242463154551882,"4040":-0.38094010598695577,"4041":0.5610481411776443,"4042":-0.6125840763670544,"4043":0.6386920246445121,"4044":-0.25435924248699665,"4045":-0.06260831195217405,"4046":0.5498061657112031,"4047":-0.1394831666026553,"4048":-0.6499776547586575,"4049":0.36575424133191087,"4050":0.060415437212345394,"4051":-0.5680649039097422,"4052":0.004864182661410881,"4053":-0.5256889328643489,"4054":-0.0017712948559290066,"4055":-0.4491776831191569,"4056":2.645188467380426,"4057":-1.9553823559035726,"4058":0.005686076732649425,"4059":0.02786998456703807,"4060":0.42949281196793276,"4061":-0.44582113882325997,"4062":0.10196382349272275,"4063":-0.47888351718625427,"4064":0.4813318234700387,"4065":12.34948451212076,"4066":-0.009547456567518983,"4067":-0.0029926411191695036,"4068":-0.108821767424196,"4069":-0.24802122472302504,"4070":0.03880258033879454,"4071":0.12272097284007916,"4072":0.9422093655708674,"4073":-0.5065036817213859,"4074":0.36309653679495135,"4075":-0.7891278224171404,"4076":0.09805405448964961,"4077":-0.2768405460686338,"4078":-0.3056927446701305,"4079":-0.41510785094762453,"4080":0.5055264790305056,"4081":-0.015513896534644113,"4082":-0.7429764707090168,"4083":-0.13478821275558667,"4084":-0.17852870189585995,"4085":-0.6868947024235094,"4086":-0.44670595525025014,"4087":0.07330585992036986,"4088":-0.008523429371059751,"4089":-0.2130048148285627,"4090":-0.4998337495039713,"4091":0.16387138048409405,"4092":-0.2825126439928602,"4093":-0.0034887422753326408,"4094":-0.08007649085125154,"4095":-0.4060313087143465,"4096":0.06908877297387324,"4097":-0.6920897568345808,"4098":-0.5079834293376632,"4099":0.041159812174080976,"4100":-0.30020309957555025,"4101":0.666902864629666,"4102":0.5628693673729266,"4103":0.34575433957173063,"4104":0.12272584944209106,"4105":0.4711042414030813,"4106":0.032109248250427415,"4107":-0.04058157134248256,"4108":0.0532064097392818,"4109":0.9781177748895916,"4110":0.858175805682859,"4111":-0.15805261924853284,"4112":0.20313143825909027,"4113":0.6752334611101412,"4114":0.3012169725933182,"4115":0.02712999860614879,"4116":0.1314238417626323,"4117":0.2733524419498089,"4118":-0.1991548196346036,"4119":1.306734968806562,"4120":-0.09245682683018279,"4121":0.4616225122641096,"4122":0.6173562884831156,"4123":0.6965087943498873,"4124":0.08833805357544948,"4125":0.3210414965808971,"4126":-0.3049406809473904,"4127":0.22919493596453702,"4128":-0.07736678096702908,"4129":-13.502377108322284,"4130":-0.21771788917865983,"4131":0.48788878886953807,"4132":0.3795844699623393,"4133":0.0743838773769092,"4134":0.24568005371234297,"4135":-0.036633450213530525,"4136":0.17795233862607743,"4137":-1.3840643184141521,"4138":-1.8095843730856522,"4139":2.1241827026740685,"4140":0.11996794452561822,"4141":0.03550449700280603,"4142":0.10789462821510927,"4143":0.6272509743178064,"4144":-0.13898422665435284,"4145":-0.29709677542287993,"4146":-1.2656464013015427,"4147":0.31636313983051567,"4148":0.8341117442633779,"4149":0.5727936560093584,"4150":0.17650717410146147,"4151":0.03987749475164854,"4152":0.6553288832451757,"4153":0.5572738419343667,"4154":-1.4791984290177616,"4155":0.6188113068859441,"4156":-0.26903932443156603,"4157":-0.03516241766442986,"4158":-0.52582350035191,"4159":0.05066515324967325,"4160":-0.4360927887142321,"4161":0.11685847616655214,"4162":-0.2830548455186381,"4163":-0.342577323456375,"4164":0.08495733362074209,"4165":-1.1636007528932533,"4166":0.3755152769290098,"4167":0.7249391519552602,"4168":0.010544725775465117,"4169":0.34429314220542573,"4170":0.2266116287865613,"4171":0.034511896157860406,"4172":-0.014747645205697501,"4173":0.9076986990752688,"4174":0.13491687367587304,"4175":-0.24411880390055113,"4176":0.37861128199101896,"4177":-0.39494505224988885,"4178":0.2966098582088608,"4179":-0.36779158746202795,"4180":-0.41626604369363707,"4181":0.11982831576966292,"4182":0.26669638466037376,"4183":0.890295751483844,"4184":0.522516714443466,"4185":0.239868629901637,"4186":0.5170973565016221,"4187":0.6902030810717592,"4188":1.299050838057393,"4189":-1.3104396759041423,"4190":-0.40744109374986903,"4191":-1.3236698145779509,"4192":2.909138300933685,"4193":0.40046009659147236,"4194":1.0596193397896323,"4195":0.9928898882310613,"4196":-0.1517034345463617,"4197":0.0916037826989603,"4198":0.6275288007271608,"4199":-0.42772467636022526,"4200":1.1931232170416344,"4201":-0.5493757818261141,"4202":1.5416356366073107,"4203":1.0832493895790303,"4204":-0.655108567033294,"4205":0.865382551541733,"4206":-0.5704051160916146,"4207":0.5714886922109199,"4208":1.3679732899502246,"4209":-1.0587716947984074,"4210":-1.7257575617376868,"4211":0.36503880006723943,"4212":-3.1658852881217654,"4213":0.5512101177239137,"4214":1.9700160557682032,"4215":0.5735460205548173,"4216":1.4613862179899997,"4217":1.0325740414305558,"4218":-1.0776136215612695,"4219":-2.3831222001344665,"4220":-0.659923225155231,"4221":0.06180810819155622,"4222":-3.955448242074677,"4223":1.8615379571711603,"4224":-1.8353908737032008,"4225":1.7311377616302532,"4226":-1.0878590775105454,"4227":-3.484089861966191,"4228":-0.44841117312641454,"4229":-0.26127574391121294,"4230":-3.312860859922606,"4231":0.05289277303449533,"4232":-1.0805387457052902,"4233":-0.1470422795539395,"4234":-0.05986170810888899,"4235":-0.557189502778014,"4236":-1.2461728605179379,"4237":1.0594055570884984,"4238":-1.09673286912781,"4239":0.04917961264706438,"4240":-0.3436300181779699,"4241":-0.22069823408803377,"4242":0.8836294803936562,"4243":-0.6992628015298208,"4244":-1.1478153769390376,"4245":1.7511943665994996,"4246":0.7090633231014158,"4247":0.20440204086714564,"4248":0.19899018785908845,"4249":0.23199066120790396,"4250":0.04193423094397787,"4251":0.1461360304645581,"4252":-0.39423059342339917,"4253":-1.4186264184275552,"4254":0.9319334869336714,"4255":1.3128370628290649,"4256":1.2556202459638701,"4257":0.2538158950748243,"4258":0.1319564946308708,"4259":-1.0967754494170583,"4260":-1.5542809368437491,"4261":0.7499885773143141,"4262":1.2660673768140038,"4263":1.3307653365346677,"4264":-0.0903347912532947,"4265":-0.7028660434950019,"4266":0.00761533927584255,"4267":-0.20934531464726733,"4268":1.023915756205806,"4269":0.6793561630495815,"4270":0.45959039986777955,"4271":0.440410006306949,"4272":0.8309854764679333,"4273":0.07398164022758119,"4274":-0.8832493909290232,"4275":-0.5937467303437752,"4276":0.044020532543854435,"4277":0.47388682075998745,"4278":0.43878343507249756,"4279":-0.27867758168799855,"4280":-0.20997485093078416,"4281":-0.6043942633838237,"4282":0.3636601918403241,"4283":-0.35605056681253794,"4284":-0.3018110932666793,"4285":-0.4127269719033409,"4286":0.15707330651040372,"4287":-0.4462984437876573,"4288":-0.5398512990907424,"4289":-0.113284648045711,"4290":-0.8026121442306106,"4291":0.7132213197186493,"4292":0.22081883786806022,"4293":-0.5035507205500671,"4294":-0.456534166947729,"4295":-0.33832061526210944,"4296":-0.2459751129469154,"4297":0.12768761683419846,"4298":0.5453378006703588,"4299":-0.5600649089304199,"4300":-0.37120118114538925,"4301":-0.9862533738844548,"4302":-0.11180330635093888,"4303":1.7764394136686341,"4304":0.0971166262189074,"4305":0.2197607754404831,"4306":-0.21701023180063878,"4307":0.6286883075606067,"4308":0.7699777656493857,"4309":0.5449355933177538,"4310":0.5064833769631312,"4311":-11.0804417144441,"4312":-7.988385428158301,"4313":0.906086990000297,"4314":1.1095110546339364,"4315":-0.22096878545282744,"4316":-0.026669809727269043,"4317":0.03671969427740811,"4318":0.46262661490424695,"4319":0.25634158479200286,"4320":-4.3022049711818084,"4321":-1.5779715204369416,"4322":-1.061334867653887,"4323":0.1311246876292801,"4324":-0.43725962241902006,"4325":0.015465922973858301,"4326":-0.311922611606883,"4327":-0.16332322726248458,"4328":0.03765421105428668,"4329":-0.5957333888565441,"4330":0.2706427844558136,"4331":-0.5273042603804711,"4332":-0.17004770505859854,"4333":-0.15106910037069882,"4334":0.3679516962999202,"4335":-0.4893330421247737,"4336":0.4091108946695742,"4337":0.7948746303807965,"4338":0.15692519549272488,"4339":0.5330006679619945,"4340":-0.17197715355754895,"4341":0.33383830667312137,"4342":-0.28660466013533376,"4343":-0.28742999693250776,"4344":-0.5866360984469121,"4345":0.4712070834608154,"4346":-1.0167354436493732,"4347":1.3404318910378095,"4348":1.8214682222502785,"4349":0.47018692652846417,"4350":0.07338426207322832,"4351":0.2801996085334078,"4352":-1.5646631725036066,"4353":0.17225338974568224,"4354":-1.0538377831246069,"4355":0.4830682745738274,"4356":0.2852971827048095,"4357":0.6604647580164227,"4358":0.6953983013227443,"4359":0.21549358196711793,"4360":0.7325737717501661,"4361":0.6702042909536611,"4362":-2.0653930543277137,"4363":-0.426959027811349,"4364":0.02888745605988544,"4365":-0.25544885185324406,"4366":-0.3240778066163811,"4367":0.2807900145014948,"4368":-1.9593991416420824,"4369":-1.194706760092617,"4370":-0.15791949194446206,"4371":-0.7079807469096852,"4372":0.9872392739226112,"4373":-0.8656695190837888,"4374":-0.6038690361336373,"4375":-1.035550330711303,"4376":-1.1641998740845307,"4377":-1.9994372984470656,"4378":-1.1063618328648375,"4379":-0.005973316625444385,"4380":1.3982430075479402,"4381":1.9804615001783843,"4382":-0.5461770678729676,"4383":1.4068660444151138,"4384":1.1375890692217452,"4385":1.3307612382551106,"4386":7.137988834861436,"4387":9.321665881004039,"4388":2.328149746069842,"4389":0.7348819654144393,"4390":-0.05669447203100377,"4391":-0.6360218752731357,"4392":-0.8606959629111848,"4393":-0.7693198156995588,"4394":-1.210193803968463,"4395":-2.934766259131624,"4396":-0.10806340546550468,"4397":1.4921392713574713,"4398":0.05110859205814796,"4399":0.6427500636543643,"4400":-0.6442914127598363,"4401":-1.0959150711581986,"4402":-0.9073234750542234,"4403":-1.5502183656215287,"4404":0.20647279802180019,"4405":-0.2908366375365342,"4406":0.5785372369061789,"4407":0.23238287673853897,"4408":-0.07917995660033507,"4409":0.7155077402417316,"4410":-1.8459380625078072,"4411":0.6569071383402774,"4412":-0.504652579899772,"4413":0.34453676733032756,"4414":1.0590326926313058,"4415":1.0663398731880709,"4416":-0.7980435608152683,"4417":-0.5801440700348377,"4418":-0.054689300703248594,"4419":-1.1935301719346096,"4420":-0.787761020441639,"4421":1.615606622251162,"4422":-0.4068388362379563,"4423":-0.1896762840523507,"4424":1.3261709512771063,"4425":-1.5503359160747248,"4426":0.6199694931941236,"4427":0.631245617970024,"4428":-0.21908374351605117,"4429":0.5831170127752345,"4430":0.247428056840839,"4431":-1.5062103357512089,"4432":-0.19196171372442697,"4433":0.44183785735627484,"4434":-0.34671978555043903,"4435":-0.4713488511884762,"4436":0.03864654843755835,"4437":0.13906661575017418,"4438":-1.0500758569495687,"4439":-0.15989121350123947,"4440":0.3468535706975992,"4441":-0.22725223578947795,"4442":0.13310478162401343,"4443":0.2429415579775138,"4444":0.48407329285954054,"4445":0.5633358835031034,"4446":-0.18725798840589927,"4447":-0.3979293412295051,"4448":0.6478348131701009,"4449":-0.619470704017207,"4450":-0.34427983593658573,"4451":-0.42953244657929224,"4452":0.9064646611575138,"4453":-0.5195200957496308,"4454":0.8244588288746034,"4455":0.16361654351744054,"4456":-0.8711630736071537,"4457":-0.06762980479089406,"4458":0.735078513712059,"4459":2.277868175848375,"4460":2.092941670729269,"4461":1.408483761874521,"4462":-0.5512887891058411,"4463":0.7322834490333571,"4464":0.2580717681586441,"4465":-0.3284576303220042,"4466":0.8111055324915969,"4467":0.9119180484793986,"4468":1.576727910608184,"4469":4.597956370695965,"4470":2.673153277323798,"4471":1.9691361384550314,"4472":0.17044344510650297,"4473":0.7257841927989259,"4474":0.6660200254755879,"4475":-0.3669698708331788,"4476":-0.12051182429657072,"4477":-8.493937130692577,"4478":-7.749353774652467,"4479":-6.811067448313035,"4480":-3.722390499092617,"4481":-2.2982790147370356,"4482":-1.393109498812562,"4483":-0.34767109555073034,"4484":0.16940940229473972,"4485":-0.6476495999145667,"4486":-0.2738185404893018,"4487":-0.5348121345582315,"4488":0.2274413797376749,"4489":0.06713319414727358,"4490":-0.5571042431874453,"4491":0.5688449565529459,"4492":-0.151173950070852,"4493":-0.1395922177408151,"4494":0.3599573144400131,"4495":-0.301252393161173,"4496":-0.42870334181238373,"4497":-0.21573935124790966,"4498":-0.7040016331362392,"4499":-0.2333014307433811,"4500":-0.12108238757471737,"4501":0.9592380052235335,"4502":0.7238835901459307,"4503":-1.1007501991744308,"4504":-0.13041321099623712,"4505":-0.9012699055077373,"4506":0.0020311491230933,"4507":0.3584218694238799,"4508":-0.9040045904216217,"4509":-0.3758681724427303,"4510":-0.7884231396377898,"4511":0.16291165392769125,"4512":1.9768120262232163,"4513":2.20642030854455,"4514":1.9406177668177003,"4515":2.347811165673669,"4516":-0.32595294286082455,"4517":-0.8715949285542957,"4518":-1.6954264818949631,"4519":2.4324784901839576,"4520":-0.3754158228279378,"4521":-0.5330154081368061,"4522":1.0573627614298717,"4523":0.20083464633548156,"4524":0.5017933416702525,"4525":1.1855248182453693,"4526":0.1361174876433662,"4527":-1.0366371161316776,"4528":-1.3023373650573742,"4529":0.5044582748096627,"4530":1.3275452610139358,"4531":-0.522896479757503,"4532":0.25201453239082866,"4533":-0.226974081732742,"4534":-1.6784722409344257,"4535":1.4370532904508517,"4536":-1.258389923317217,"4537":2.377176361814649,"4538":0.2215522885040498,"4539":2.256183221391128,"4540":1.3816385898733254,"4541":0.48128351543247166,"4542":1.4761185985997396,"4543":-0.7456501254060829,"4544":3.1633954866504124,"4545":-1.6604076299530568,"4546":1.0935264553659327,"4547":-0.14470335200905105,"4548":0.05437027845855435,"4549":-1.6859851957779823,"4550":-0.598131415138705,"4551":-0.605183258011746,"4552":-1.5491051482706686,"4553":-0.8651643628586871,"4554":-1.5050422453673022,"4555":-0.9079148459711844,"4556":-0.6393671749901101,"4557":-1.8771839538103452,"4558":0.3329267339436111,"4559":-0.42058774902664314,"4560":-1.8769253923440938,"4561":-0.6485571771681661,"4562":-4.398115793773531,"4563":-0.9868277953817051,"4564":1.092013395854528,"4565":-1.006693804398317,"4566":-0.6711340302202224,"4567":-1.531058902475582,"4568":0.03717171861248976,"4569":-0.10144710285233483,"4570":-0.7355006339352865,"4571":-0.3198093385549061,"4572":-0.7475979087887202,"4573":-1.3085865558310934,"4574":1.0732935347454218,"4575":0.28704970892548237,"4576":1.8176224874438611,"4577":-0.7300174325092939,"4578":-0.027898278620596503,"4579":-0.07197875502722613,"4580":-2.3090398427255545,"4581":-1.174364181749925,"4582":0.23997602163952433,"4583":-2.0162439108733152,"4584":1.6008782965992743,"4585":-1.769432813206356,"4586":1.4677499369932379,"4587":-0.2584726184181204,"4588":-0.699014689821593,"4589":1.385467266053821,"4590":-1.2781676429554798,"4591":-0.2833162659736771,"4592":1.5438727712310136,"4593":-0.09153876854645997,"4594":-0.3786267129497873,"4595":0.04678099725363455,"4596":-0.3058971333849375,"4597":-1.107051432487631,"4598":1.6125610849514966,"4599":-1.1955916364336394,"4600":1.8384328078822318,"4601":-1.8857314086671397,"4602":-1.5840687903024848,"4603":-0.13056128723564897,"4604":-0.9926577262630972,"4605":-1.3599383391745532,"4606":-0.26806271468441156,"4607":0.8121668573295268,"4608":1.205152247845086,"4609":1.0620290236631544,"4610":-1.0408971876331277,"4611":-0.5670298571646223,"4612":0.8126427246706642,"4613":-1.6820074927746476,"4614":-1.998138251333211,"4615":-1.6501182958518557,"4616":-2.8768384244956824,"4617":-1.4247029370911177,"4618":0.3114503864861829,"4619":-2.0396460286901603,"4620":2.5840322811111207,"4621":-0.20269692544978188,"4622":-2.284837716764755,"4623":0.2707394460024555,"4624":-0.47932200578885187,"4625":-2.645734607181211,"4626":-0.25382314441439313,"4627":-0.8299851837134863,"4628":0.7271544427307649,"4629":0.9760100844700663,"4630":2.1204763924647407,"4631":1.5262807433862413,"4632":0.07063269020097315,"4633":1.5413294178261903,"4634":2.1286429950594763,"4635":0.9241828314820337,"4636":1.4126337664187758,"4637":1.767065268476297,"4638":0.7114064996169954,"4639":0.20889903620845926,"4640":-1.9436490330714757,"4641":0.3106944118950112,"4642":-1.8367397194561503,"4643":2.682482936034343,"4644":0.002397867286605981,"4645":-0.5012265929986499,"4646":1.3733333288600094,"4647":-0.5806329277191854,"4648":-0.2670480227989983,"4649":-0.3931298082312277,"4650":-2.9846515445502617,"4651":0.9210190105616701,"4652":2.163063896479332,"4653":-0.30974803699411846,"4654":-0.9465316128234326,"4655":1.3181445383486927,"4656":-1.3459656455073785,"4657":-1.0568348835889896,"4658":-1.9477932271005232,"4659":-1.317213059808356,"4660":-0.004340128240146432,"4661":-1.1133228597572862,"4662":-0.28194716999378505,"4663":1.3380336009056226,"4664":0.8662480590920113,"4665":2.113332635008393,"4666":0.892363554155639,"4667":-1.1827670376490353,"4668":-0.12196606026023343,"4669":0.6237218446028726,"4670":2.527740462128083,"4671":-0.14878014396932723,"4672":-0.4947005713811467,"4673":0.017774526227042738,"4674":2.860777395700363,"4675":0.5039093660880455,"4676":-0.5478086725969138,"4677":-0.4781626851077226,"4678":1.2133955228942865,"4679":-0.8638771818375117,"4680":1.1867736555263,"4681":-0.8615352275696925,"4682":-0.47395195980618365,"4683":-0.6745035019178816,"4684":0.2098862945550016,"4685":-0.3639870106314246,"4686":0.14153450024803862,"4687":-0.021944322587678443,"4688":1.379760702422046,"4689":-0.18655620262410225,"4690":0.2808864745966136,"4691":0.3296341084843283,"4692":0.6367710726302817,"4693":-0.3027007726748286,"4694":0.8619267023067496,"4695":1.6972176913082455,"4696":1.6140030126068783,"4697":-0.3685085903102991,"4698":1.252830052997268,"4699":1.1556440498041616,"4700":0.2564417356064927,"4701":0.638488983942545,"4702":-0.6382396796472584,"4703":-1.4142711169383633,"4704":1.0915852825488734,"4705":-0.320119881092419,"4706":1.334036543548914,"4707":1.2945063405093338,"4708":1.058375599034748,"4709":1.2499300328791823,"4710":0.041768621542053304,"4711":0.47900905766183716,"4712":-2.9156737381513005,"4713":1.9799487469156714,"4714":-0.42471022825130333,"4715":0.021248359264091136,"4716":1.961150838286675,"4717":-0.8211896515749632,"4718":0.6162564774104775,"4719":-0.013164234749634575,"4720":1.3101300319672549,"4721":-0.9978319745120035,"4722":2.112229238488206,"4723":0.6459039549563149,"4724":1.0345199165306165,"4725":1.3040444157576485,"4726":0.6445254114588467,"4727":0.9408232706440329,"4728":-0.9269436549389447,"4729":1.346835134285439,"4730":0.5167386627231266,"4731":1.1512839922143834,"4732":1.2268925135426392,"4733":-0.43801081766057953,"4734":0.36001336090659497,"4735":0.673183177183121,"4736":0.8317105538453831,"4737":-0.8796885595321814,"4738":1.2659538001611244,"4739":0.7791363758368524,"4740":0.15443033545927942,"4741":-0.3451092484482065,"4742":-0.16291637150385338,"4743":0.4739408144020103,"4744":1.8334383929263636,"4745":1.3211747757423065,"4746":-0.017374876013416137,"4747":1.6821708170179492,"4748":2.1843254390750095,"4749":-0.861672359122666,"4750":0.8627911931598692,"4751":1.6091488731798456,"4752":0.43779306306307847,"4753":1.8031243687535135,"4754":-0.20353649160655324,"4755":-0.13250664437864718,"4756":-1.3264674089639197,"4757":-0.14838448971313042,"4758":-0.06032092558496355,"4759":0.8144539925087865,"4760":-0.2766873570297503,"4761":-1.1473836796718413,"4762":1.9814787108932854,"4763":1.9521555537806479,"4764":-1.0504366778373548,"4765":-1.0578967451480605,"4766":0.14622266215336008,"4767":0.3391010963792996,"4768":1.5912857216248188,"4769":0.8073045414191848,"4770":-0.7813621333741521,"4771":-1.43456785800442,"4772":0.23175308167020733,"4773":-0.3464470818664886,"4774":2.1893740849471977,"4775":1.4289387311793083,"4776":0.6249497629511341,"4777":-0.26022392597832766,"4778":-0.8997902199073993,"4779":1.250553656484708,"4780":-0.32135320482243396,"4781":0.17230132684577404,"4782":0.930689699836166,"4783":0.14195987374590818,"4784":-0.47182580855941453,"4785":1.1570269181455697,"4786":0.5798782453352315,"4787":4.975807709491411,"4788":7.325415558475652,"4789":4.809781815164008,"4790":3.853133345836479,"4791":1.8163385085115917,"4792":-0.10470706814129446,"4793":0.038055021894107505,"4794":0.5519283415385877,"4795":-1.1396824332271078,"4796":1.3214959683105418,"4797":-1.2875912897776365,"4798":-2.5516685270853885,"4799":-0.9246755368404909,"4800":-0.4445235037239029,"4801":0.19240610548595347,"4802":0.8740624924513769,"4803":-0.4746024798986629,"4804":-1.707295309240462,"4805":-1.547852842380966,"4806":-3.3762433437838757,"4807":-2.4308873013965884,"4808":-1.9932371161254727,"4809":-2.8118652909190156,"4810":-0.7723506399009624,"4811":-0.8083891590513339,"4812":0.2876120122830784,"4813":1.947130825218248,"4814":-0.13495223955535293,"4815":-0.02843541158273279,"4816":-0.28937559156215015,"4817":-1.92304164537494,"4818":-0.28007397649550325,"4819":1.6311891712941193,"4820":2.139332986168043,"4821":2.068779362282308,"4822":1.3960840905174916,"4823":0.434519239111429,"4824":-0.11996359358981373,"4825":-0.3733173597829653,"4826":0.7136187235039904,"4827":1.0504685229132833,"4828":0.5566013803270909,"4829":-0.15558643900278651,"4830":-0.6464703442379148,"4831":0.6630545088833147,"4832":0.7031808875838823,"4833":-1.0616420868362548,"4834":0.8407535436450934,"4835":0.3765261586577653,"4836":0.2582583525907562,"4837":0.18263046771360072,"4838":-2.2400675333737152,"4839":-1.9638564553174014,"4840":-1.6138856206921128,"4841":-1.3870413567244428,"4842":-2.104900275108823,"4843":-1.48812896101421,"4844":-0.890576342561786,"4845":-0.7898750376063831,"4846":-0.680441160975794,"4847":-0.7071560087421417,"4848":-1.5403538775703478,"4849":-1.0680361055664631,"4850":-0.6299275873075146,"4851":-1.716261531522759,"4852":-0.696237406380677,"4853":-0.44430528128724917,"4854":-0.8330204455551562,"4855":-0.6316855105686727,"4856":-0.527731134843077,"4857":-0.6042319894844935,"4858":0.046609246679798585,"4859":-2.1285057455321557,"4860":-0.7471759535735037,"4861":-0.9087282989846983,"4862":-0.8971210663229837,"4863":-0.814959878002129,"4864":-0.46696747963685253,"4865":0.23658375583122468,"4866":1.44375197384501,"4867":-0.27936376631412474,"4868":-0.9424415095389943,"4869":-0.9848335076170492,"4870":-0.17225395169685145,"4871":0.010779618325255048,"4872":-0.5580852712456036,"4873":-0.41914514527154545,"4874":-0.009716891576207844,"4875":-1.3290752214978163,"4876":2.4462028043003126,"4877":-0.3376880687227252,"4878":-1.2035114605626964,"4879":-0.9086421782865614,"4880":-0.951740830713871,"4881":-0.3642833168017063,"4882":-0.5439838543888432,"4883":0.12427622682997806,"4884":-1.2644278104833113,"4885":1.9527799467785314,"4886":0.7041049420737985,"4887":-1.534725465073678,"4888":-1.486641469927577,"4889":-0.7928617433075796,"4890":-0.5237111278457813,"4891":-0.9894379113926951,"4892":-1.9741649601590012,"4893":1.493651945948536,"4894":-1.2095143755537558,"4895":-0.895441377824237,"4896":-1.7486143299516599,"4897":-0.560137429425816,"4898":-0.24930638960831245,"4899":-0.7059375216683923,"4900":-0.809303526011812,"4901":-1.3639415362338423,"4902":2.186526060529698,"4903":0.5119168700695936,"4904":-1.417652863480861,"4905":-1.4798381396334994,"4906":-1.0979829971722794,"4907":-0.8449157443961629,"4908":-0.7891661713376669,"4909":-0.44974883672709015,"4910":-1.3634071887637238,"4911":-0.8561241752841204,"4912":1.7317781008397861,"4913":-1.5377381903797553,"4914":0.526916479632957,"4915":-1.0512137658315928,"4916":-0.753731589956678,"4917":-0.7316648862415227,"4918":-0.6739743012609352,"4919":-0.36566640922962274,"4920":0.4059632727365506,"4921":1.0859195278066773,"4922":1.012463603939021,"4923":-0.723069016433501,"4924":1.120467129485379,"4925":0.04332441804212903,"4926":-2.566283674764401,"4927":-1.494580568183417,"4928":-0.5417734331785479,"4929":0.9689582277274059,"4930":1.577055733960835,"4931":-0.35563198996081197,"4932":1.4373893074696151,"4933":1.3837214609565152,"4934":-1.414851121763271,"4935":-0.8846734119519402,"4936":-0.47756237768266513,"4937":-2.6088286305367516,"4938":-0.584980812867678,"4939":1.3402249482160653,"4940":-0.37359053732066444,"4941":-0.41882481202912575,"4942":-0.01828182694495744,"4943":0.05177308294508626,"4944":-2.042652929483937,"4945":-0.17856843233866984,"4946":-0.39040436297403736,"4947":-0.6602102649448468,"4948":-0.902225278164069,"4949":-2.9534718892526306,"4950":-2.887083131462097,"4951":-2.3194578931326464,"4952":1.3667157238411014,"4953":-0.4275002887906662,"4954":0.18135734395374123,"4955":0.9754294630351628,"4956":0.7545375028153591,"4957":2.339210028077609,"4958":0.4448919005144104,"4959":2.674665187235323,"4960":1.959791584929118,"4961":-0.5728143695786488,"4962":1.540759389728562,"4963":1.9003949051871076,"4964":0.9193503886517235,"4965":-0.982170649916891,"4966":-0.010042454657485144,"4967":0.7900286148013921,"4968":0.5484416940052433,"4969":0.9599490807429071,"4970":0.13558451802230329,"4971":-1.4253967387663495,"4972":0.031093643771154443,"4973":-2.9815238202461467,"4974":-0.3949886594854838,"4975":-0.6895236244523507,"4976":0.418232321654745,"4977":1.7511512983773028,"4978":1.342727601750169,"4979":0.18862032966738215,"4980":4.842219077811198,"4981":0.3543504945877338,"4982":1.3935967770715514,"4983":-0.35420077449985793,"4984":0.3489384947775833,"4985":1.5952629440543966,"4986":1.6427015154591702,"4987":-0.5200021320573798,"4988":0.34432216133370963,"4989":0.5530406180025197,"4990":-0.4930178410477151,"4991":-1.2683863436301785,"4992":0.12170595486612512,"4993":0.3770491450338056,"4994":-0.7153490631767665,"4995":1.4014174375905333,"4996":-0.5919771746726085,"4997":-0.4229542395184848,"4998":-0.5967338416422571,"4999":1.7265265869268502,"5000":0.3256956318496634,"5001":0.7142662968460197,"5002":-1.4436698797591114,"5003":1.562845314115021,"5004":-0.4357433564013686,"5005":-2.86601110146504,"5006":1.350757034403106,"5007":0.3213907561550759,"5008":-0.7190162181424539,"5009":0.5563001233082118,"5010":0.9470922223232352,"5011":1.2704427144547217,"5012":0.8423572457295918,"5013":1.5170500838308847,"5014":0.4070726751101268,"5015":1.0987343934969804,"5016":1.1374815904620572,"5017":1.0464587567199943,"5018":-0.04477114358879896,"5019":0.48029827068281467,"5020":-0.03728234975765864,"5021":-0.5797357892831282,"5022":0.44341293284742567,"5023":0.5856133160892764,"5024":-0.05038344324370799,"5025":1.3482469738978191,"5026":-0.5807019733478044,"5027":-0.8920375705770719,"5028":-0.44695102393521813,"5029":1.4763708729865728,"5030":-0.9940767409608303,"5031":0.36760221942846605,"5032":3.0554390274489744,"5033":1.921294074685733,"5034":1.3150597251131806,"5035":-2.0394346396279364,"5036":-1.684548504458282,"5037":0.06875319457378586,"5038":1.4285879113482913,"5039":-0.8950193822287023,"5040":0.23505581628098332,"5041":-2.3444887569365087,"5042":-3.849409779870181,"5043":-2.7265137727420052,"5044":-1.7546167985229544,"5045":-0.3115923147872718,"5046":1.0854933291847293,"5047":0.7462170476331299,"5048":-2.7204517974435793,"5049":-0.8612784512141264,"5050":0.16257121501440985,"5051":-0.5579941569040768,"5052":-3.292260065746821,"5053":-2.5009823985306285,"5054":-1.4679154915931172,"5055":-2.163927629975182,"5056":-1.2355163391634774,"5057":1.1107728267866668,"5058":-0.17669238171300583,"5059":-0.9425697946059379,"5060":-1.3225330827198072,"5061":0.19858880392799133,"5062":0.06101624696005732,"5063":-2.281598754993745,"5064":-0.07055179408411096,"5065":0.2645911720335541,"5066":-1.4699125415721574,"5067":0.67894436317531,"5068":-0.2369009472879921,"5069":-0.6355703659138735,"5070":1.9889233781766935,"5071":0.2564154262939285,"5072":-1.1726070230803252,"5073":1.2365384676304683,"5074":2.5779858944937386,"5075":-1.3514176723497378,"5076":0.10184512589740004,"5077":-0.6869409067059498,"5078":-0.24014072753350044,"5079":0.5323068967766645,"5080":0.6186038991124592,"5081":0.059199947007384936,"5082":2.072513916648741,"5083":-1.2750771862425667,"5084":0.9878775853037008,"5085":-2.429288258750868,"5086":-0.4693177595076042,"5087":-0.6014896234262455,"5088":0.6457759893605952,"5089":-0.3540181439228829,"5090":0.2724558796626309,"5091":0.23497434580930684,"5092":-0.19850735810290118,"5093":-2.263535839573616,"5094":2.0053634034664194,"5095":-0.12238948907083368,"5096":0.002951185042496578,"5097":-0.7616039266415272,"5098":1.3531548780804283,"5099":1.3782957382005032,"5100":0.90881631280227,"5101":-0.41441536966764875,"5102":-0.006349805771530212,"5103":-0.7621875952340708,"5104":2.4523703067415696,"5105":-1.075193022494002,"5106":0.5046223810286669,"5107":1.529781075201654,"5108":-0.8322819343908767,"5109":-1.9683506658950571,"5110":-0.8646964581869,"5111":-0.9909499103111953,"5112":-2.148099644124026,"5113":2.980445118793232,"5114":4.02168303673089,"5115":-1.7767026493743425,"5116":1.255198776269126,"5117":0.7642832392971574,"5118":0.32463056121793143,"5119":0.4449277090649549,"5120":1.1614048567418678,"5121":-1.6229132804141242,"5122":0.6879243330197822,"5123":-1.7289638849245703,"5124":1.8253139915518086,"5125":2.085698556577644,"5126":1.3459837207702356,"5127":0.4975896624418821,"5128":-1.2217919063183456,"5129":-0.9113754044961203,"5130":0.33565842106684973,"5131":-2.039193519742531,"5132":-2.5638265428233504,"5133":-0.43603291860794485,"5134":1.8700882079953376,"5135":0.10821724680615745,"5136":0.19987838921534784,"5137":0.14913690177307165,"5138":-0.5309302561872639,"5139":-0.7633481193731622,"5140":1.8618190560109626,"5141":-1.7939907635578483,"5142":0.3355803137463062,"5143":-0.6079306680057218,"5144":-1.5858170412432926,"5145":-0.8162905560363083,"5146":-0.33890937234395346,"5147":1.4455021339889005,"5148":0.9583515254457006,"5149":-0.2037448654626837,"5150":-2.0097038149463904,"5151":1.22480677023579,"5152":-1.5174896310782149,"5153":0.03636635992179945,"5154":-0.542405410151745,"5155":1.607573403418214,"5156":0.8987483481150046,"5157":0.8004160702538764,"5158":0.6346955347603296,"5159":0.23216185452170182,"5160":1.482233844713888,"5161":-0.12620299775775892,"5162":1.4896052162805549,"5163":0.4685889657904291,"5164":-1.170673315682281,"5165":0.30901439725751145,"5166":0.5994525090421192,"5167":0.9364115295133517,"5168":-0.12693379020712822,"5169":-1.0345285510308244,"5170":-0.8998582056017496,"5171":0.9282336375352135,"5172":-0.6515095084573957,"5173":0.2626266636343573,"5174":-1.8639072086622417,"5175":0.6394622567417345,"5176":0.08005721069568864,"5177":-1.5532763145513047,"5178":-1.6582157221450162,"5179":-0.19999264724496438,"5180":2.9048522206730167,"5181":0.7721196366265427,"5182":0.09907172758151857,"5183":0.27400852220210803,"5184":-0.5077138838107517,"5185":0.7802044399720448,"5186":0.1964427882775982,"5187":1.4024162317241855,"5188":-0.48842269729023813,"5189":-0.4386451405076347,"5190":-0.5090563036925909,"5191":-2.229615730270857,"5192":1.2395505216800904,"5193":0.7268891510113751,"5194":-1.5152233103498767,"5195":-1.2513104399314219,"5196":-0.7709409290822499,"5197":-0.39950022158763276,"5198":0.18837751460210878,"5199":-0.6645692039773944,"5200":-1.1418225651393143,"5201":-1.5747960474337408,"5202":-0.6435833720106712,"5203":-0.5433775994130311,"5204":-0.9477069464160263,"5205":7.3170657815657245,"5206":4.706680893339426,"5207":0.8829654581516704,"5208":-0.7575454256627491,"5209":0.1580041057520486,"5210":0.07488145041653914,"5211":1.8258854724417686,"5212":-0.5647630663797216,"5213":1.0756803911927983,"5214":-0.5403278662574093,"5215":0.6192338784179477,"5216":-0.2852087252290929,"5217":-1.693987322550302,"5218":-1.250004937642751,"5219":-2.508982945878461,"5220":0.09606702261349098,"5221":0.11315447399635063,"5222":1.2663101177551481,"5223":1.8556942036578314,"5224":0.11950367165210339,"5225":2.1889464830997545,"5226":0.2829712857014653,"5227":0.45934792626481674,"5228":-1.7917736440115895,"5229":-0.19974390480456122,"5230":-0.237944484696494,"5231":-0.9063668583152963,"5232":0.01370080402407648,"5233":1.720698362232385,"5234":0.16585295639143918,"5235":-1.5259885412230279,"5236":0.06641763558723354,"5237":0.21979730634097205,"5238":1.7467515096658388,"5239":-0.9602805559008636,"5240":-0.45104358586599413,"5241":0.06520338615922845,"5242":0.11213088949393991,"5243":0.9756147365217978,"5244":1.3169190835901516,"5245":-0.5468327756425007,"5246":0.7885952188692135,"5247":-0.8033734123200678,"5248":1.85323400444917,"5249":-0.3096219497938355,"5250":0.7217574919574772,"5251":0.013841228007743813,"5252":-1.6272591318274883,"5253":-0.34878698453619467,"5254":1.4222953376192364,"5255":-2.8621635665432943,"5256":-0.9166834185940759,"5257":-0.7670558414320168,"5258":-1.1422482123582205,"5259":-1.5387030842115437,"5260":1.6384256779583053,"5261":0.2529376579308342,"5262":0.069696696969799,"5263":-0.476530594899748,"5264":-1.7406669071027303,"5265":-0.7446107975096895,"5266":0.40513655280337474,"5267":-1.2030484382778193,"5268":-1.324097821284715,"5269":1.5929277040552416,"5270":1.086119319309811,"5271":-0.6235261467398596,"5272":0.13749839027279914,"5273":-0.6272914353724887,"5274":0.7716202882867812,"5275":-0.7694082966146379,"5276":-1.509431514206194,"5277":1.7111334874952497,"5278":-1.0588436066805584,"5279":2.1397356870371707,"5280":-2.1668483081673378,"5281":0.6643091821249005,"5282":-1.9418015022508786,"5283":-1.024400925821323,"5284":0.17321762465074378,"5285":-0.0760149509220771,"5286":1.6176083344105403,"5287":4.713783167841514,"5288":2.979540329028662,"5289":2.20353754018697,"5290":-0.9541047243196166,"5291":-0.67322189449507,"5292":-1.1620120863694248,"5293":-0.07000890523105542,"5294":0.5232332679845519,"5295":2.4094941543878443,"5296":-1.585925547632314,"5297":3.8006948374500173,"5298":0.4516830408761323,"5299":-1.4491076233195297,"5300":-0.3173348541338053,"5301":0.5399256857407604,"5302":0.48291509586326237,"5303":0.010856216293593873,"5304":-0.8155476763500389,"5305":-1.498387038115287,"5306":0.13223016338346344,"5307":-3.7470572922926766,"5308":-0.8853638146445754,"5309":-0.1832659496037696,"5310":-0.07378415074112424,"5311":-2.1256001841536682,"5312":1.7451624372160994,"5313":-1.3163596833373714,"5314":-0.3611558602763386,"5315":-0.020673444459671737,"5316":1.4400212850152057,"5317":0.8441727710496186,"5318":-0.703501060228291,"5319":-1.6967014986436,"5320":-0.04445218915152859,"5321":0.02220512799017738,"5322":-0.485594878469081,"5323":0.05022439213851769,"5324":-1.6243476422618752,"5325":0.20881866268362922,"5326":2.063903578732786,"5327":0.545338398645545,"5328":0.5411953324835055,"5329":-0.27496341650647876,"5330":1.3344317793008902,"5331":1.2493426571052997,"5332":0.7879741058435594,"5333":-2.3409924491695,"5334":-0.4637983757175724,"5335":-0.9399942056754416,"5336":0.12708031527671768,"5337":-0.2007038814485086,"5338":-0.8485220665275142,"5339":0.0750030880697157,"5340":1.4534768915596241,"5341":-0.18873939487294666,"5342":-0.11773202112765936,"5343":0.10681482735795292,"5344":0.36863885801661317,"5345":-0.7841282236096867,"5346":-1.1252669473670536,"5347":2.234444836688913,"5348":0.48021499643693843,"5349":0.8443236894157912,"5350":1.8501564311338394,"5351":-3.3568445057357392,"5352":-1.5972582944236504,"5353":-0.6602961490966855,"5354":2.205405095798422,"5355":1.5793298270201501,"5356":-0.8092244421299132,"5357":-0.21768248993164097,"5358":-0.3760698008300516,"5359":-3.003071246637453,"5360":-2.2644535918878805,"5361":-4.59921771422972,"5362":-0.20832355697768132,"5363":-0.15820972428694727,"5364":-0.0869918005359883,"5365":0.8847887258811882,"5366":1.6117719822543672,"5367":1.9344478508483043,"5368":-0.40765835848433085,"5369":-0.26579804518690736,"5370":-0.27340143408709516,"5371":0.7735950631965892,"5372":2.608317253329569,"5373":1.4164627396267244,"5374":0.3021660184605928,"5375":-0.9310864443255256,"5376":-0.4491236967002338,"5377":-1.9842555836769444,"5378":-0.9411657507199661,"5379":0.14356213013068936,"5380":-2.0533231683403863,"5381":-1.0565104120996507,"5382":-0.12937917334766777,"5383":1.5305646106918227,"5384":0.4259248071899696,"5385":0.9732197339264776,"5386":-0.7413437799649573,"5387":-0.34228114074631855,"5388":0.20639508574848558,"5389":-0.4842427632785119,"5390":-1.1838699120155098,"5391":0.06909908429767221,"5392":0.07026919153653385,"5393":-1.2950591952589197,"5394":-1.7775798901052295,"5395":-0.7759590094398838,"5396":-0.11333318942670344,"5397":-1.4212830625265032,"5398":0.8672895942291662,"5399":0.15947321747234047,"5400":-0.7371607677703734,"5401":-0.983367630939429,"5402":0.0020496503003593586,"5403":-0.19009202206088016,"5404":0.8120781577636941,"5405":-0.48230932974483004,"5406":-0.48928107672114063,"5407":1.044311543414755,"5408":-0.3671446039481973,"5409":0.26488041367310494,"5410":1.086518990713767,"5411":2.4086186832081653,"5412":-0.9850638001860602,"5413":0.4014232417798223,"5414":-1.2044233560384618,"5415":1.6978868556242128,"5416":1.3514576988442457,"5417":0.7234252730610202,"5418":0.7902469946482858,"5419":0.4078014772066476,"5420":0.5450849941499334,"5421":1.5294630142367356,"5422":-1.0675332053401794,"5423":0.868340921594106,"5424":2.173532545982505,"5425":1.4401835701268628,"5426":0.9267354962980938,"5427":0.4314201414668309,"5428":0.3991123424938652,"5429":0.41400989969423124,"5430":3.093586103723429,"5431":1.347972893485343,"5432":1.395428139649506,"5433":2.0259108164251836,"5434":1.464885390709412,"5435":0.6975916124594519,"5436":0.46435187675361406,"5437":0.40133225336213746,"5438":0.13924617377173332,"5439":1.3975223261703589,"5440":-0.25270244837031963,"5441":-1.9466621194040283,"5442":1.9717687477111485,"5443":1.491258348051269,"5444":1.0279341357923195,"5445":0.497188234234168,"5446":0.42176940494241716,"5447":0.6262131687724978,"5448":0.3802909521355769,"5449":1.1922477312337734,"5450":-5.021879561436542,"5451":-0.5989661609945766,"5452":0.6829727556241858,"5453":0.8775239731898887,"5454":0.5019644430442333,"5455":0.20990188966401635,"5456":0.30409246043601595,"5457":-0.470981455574759,"5458":0.026269866729340466,"5459":-1.2306591506591427,"5460":1.7520616028192046,"5461":1.4639774741461182,"5462":0.6727315334623287,"5463":0.6140424156501112,"5464":0.29852925342655545,"5465":0.37070698438196076,"5466":-0.41411419801020016,"5467":0.1374701058602642,"5468":0.1258761067686157,"5469":1.874538827615119,"5470":1.150466124890502,"5471":1.0948241747400895,"5472":0.8154660166865542,"5473":0.29509453266713664,"5474":0.49360073397727866,"5475":-2.5573678063030156,"5476":1.8523530761786424,"5477":-0.6212090951881927,"5478":1.2025484663781585,"5479":1.641548774486587,"5480":1.0187974691133488,"5481":0.4908143384888986,"5482":0.5079567110771166,"5483":0.3577317716477828,"5484":0.48484896902215135,"5485":1.0387812404065948,"5486":0.835686984364091,"5487":1.9490210349849588,"5488":1.8480353976442518,"5489":1.0955138391438768,"5490":0.7309793855719947,"5491":0.6648201692443422,"5492":0.4510817742715849,"5493":0.867238426704154,"5494":-0.3372602367771453,"5495":0.08382735792152894,"5496":1.6682423260130743,"5497":3.105471349723383,"5498":-0.4818292045343599,"5499":-1.688690922521523,"5500":-0.7148257786757196,"5501":-1.7912303643112848,"5502":0.6214845650332619,"5503":0.12684772239080683,"5504":0.2576471725916064,"5505":-0.2748534059000046,"5506":2.4035713858892387,"5507":1.7138980270259616,"5508":1.5531446629482148,"5509":-0.9452319149159365,"5510":0.8812914873551533,"5511":0.39589792503848914,"5512":0.49237490843521864,"5513":-0.8983916477686091,"5514":-0.26088439714564654,"5515":-0.7632923974250232,"5516":-0.0994384180242387,"5517":-0.07634957466503128,"5518":-1.3048603327231962,"5519":0.0654968958335755,"5520":-1.1121087480932192,"5521":2.1235608843768206,"5522":0.8387281852152968,"5523":-0.45694387713613366,"5524":-1.3271646037101452,"5525":-2.4759948401851957,"5526":-2.2430759853917297,"5527":-0.3794002505613835,"5528":-1.5713989647391524,"5529":-0.1898691601295871,"5530":-1.3207292072482135,"5531":-0.45175151298245664,"5532":1.5960618074581872,"5533":1.8231468791691963,"5534":2.948281654183077,"5535":7.529545820321684,"5536":2.531185020316032,"5537":-0.6014937952898959,"5538":1.58257645904494,"5539":0.89743020122145,"5540":0.3529339468109842,"5541":-0.37043299120808687,"5542":-0.25082150293365624,"5543":0.6636362397263786,"5544":-0.33337651642794136,"5545":1.6875779950175571,"5546":1.084435307908582,"5547":0.06389594731894903,"5548":-1.4689460819802045,"5549":-0.3874046198673151,"5550":0.3933241715935576,"5551":0.16142547210739044,"5552":-0.6792359812450018,"5553":-0.3333346113623224,"5554":-0.552229469950581,"5555":0.3971995050791708,"5556":0.2844176691415704,"5557":1.511263031583732,"5558":0.09170283261351211,"5559":-1.1927725516281142,"5560":-0.22100080842376138,"5561":0.8346276248103075,"5562":-0.9604504202835407,"5563":0.9185556721972534,"5564":-0.974855623168206,"5565":1.5793354931692702,"5566":-1.823421527586082,"5567":-0.844046815029469,"5568":-0.8401200791561925,"5569":-1.0663511287668568,"5570":1.8835571476369837,"5571":0.1746173926238295,"5572":-2.1663834715144246,"5573":2.473590223321967,"5574":-1.7579839582001473,"5575":1.2160718062139317,"5576":-0.1332693121710644,"5577":-0.1794140390578994,"5578":0.6056283694057346,"5579":0.03037661313354525,"5580":0.12146780833536433,"5581":0.538717156445418,"5582":-0.37827651154521996,"5583":-0.12561635254305448,"5584":-0.848384081871077,"5585":0.2698859701644864,"5586":-0.1156189691575908,"5587":0.05608634734081922,"5588":0.6445231608496675,"5589":-0.5619431425330694,"5590":-0.14424599876607727,"5591":0.7353071964778067,"5592":0.3013372291936434,"5593":0.1402458892127748,"5594":0.014019308788749293,"5595":-0.1770328651787003,"5596":4.238889919657644,"5597":2.7639186898979324,"5598":0.4694245459341708,"5599":0.0584321693843669,"5600":-0.7509222449791454,"5601":-0.3267312069799822,"5602":0.14720844842816252,"5603":-0.09315585285494722,"5604":-0.4756561232126787,"5605":12.913837926003241,"5606":8.305208826987988,"5607":-0.8829671011892438,"5608":-0.8095390095238795,"5609":-0.5735794866833919,"5610":0.7150173650021135,"5611":0.5559299890143087,"5612":0.04752811722511163,"5613":0.490682995997721,"5614":-0.8240471596084202,"5615":1.7366663104035507,"5616":-0.16037086814871396,"5617":-0.16907801700489516,"5618":-0.1065439365356567,"5619":0.18869197421742903,"5620":-0.1943727561985526,"5621":0.17730077524973697,"5622":0.339828913636445,"5623":0.5711902270968354,"5624":0.12031199768465603,"5625":1.2680098518805427,"5626":-0.2439553777195124,"5627":0.4829340778812019,"5628":0.8754507357427946,"5629":-0.28900892998925615,"5630":0.33890115065712645,"5631":0.5251118306622624,"5632":0.5736505702248924,"5633":-0.03719062077700461,"5634":0.9843392658746095,"5635":-0.1492098499419957,"5636":0.48250364192505435,"5637":-0.4513778909574279,"5638":-0.2280809950792211,"5639":-0.29813638153100963,"5640":0.6725014760049924,"5641":-0.2771220161116181,"5642":-0.5674879951121123,"5643":-0.14723729691742923,"5644":0.05047980970147652,"5645":0.16630639271012176,"5646":-0.006437911448599396,"5647":-0.5120989243848753,"5648":0.5906544611573775,"5649":0.1651170828243827,"5650":-0.19823914965703937,"5651":0.032382229267772136,"5652":-0.054423577389663295,"5653":-0.06290026322808358,"5654":0.5661633521051456,"5655":0.3084507713058452,"5656":-0.14271688778134176,"5657":0.2819564008291389,"5658":-1.9307103184741239,"5659":-2.4519534077453806,"5660":0.976657073147918,"5661":-1.899651410037871,"5662":-1.3436842591887415,"5663":-0.8290032628038239,"5664":-0.3318339582136293,"5665":-1.1694192170438948,"5666":-0.1051291681813666,"5667":-0.6116934987484286,"5668":-0.2724848351898734,"5669":-0.5616540866043561,"5670":-1.1684618508733744,"5671":0.32844249753922783,"5672":-0.4448887614536678,"5673":-0.37160572857399454,"5674":-0.3518519624862717,"5675":-0.164479490915321,"5676":1.3214251664809884,"5677":0.5807256207966792,"5678":1.2644268304217574,"5679":-1.530045568170505,"5680":-1.3141552678982156,"5681":-1.1473714715862386,"5682":-0.5362970861914044,"5683":-0.6148382186473114,"5684":-0.792508940112746,"5685":1.3960519685495254,"5686":-2.369616013794,"5687":0.8729558559241569,"5688":-1.251631653299314,"5689":-1.4184826414233975,"5690":-0.6818175794333003,"5691":-1.1981695415986224,"5692":-0.2583475831378006,"5693":-0.642633946873219,"5694":-1.2663030427186666,"5695":1.6403132102554043,"5696":2.1483636085715485,"5697":2.94358149007056,"5698":1.0257452072779345,"5699":-0.5706415574303731,"5700":-0.3707143232888236,"5701":-0.7427671505164286,"5702":-0.7026188530474061,"5703":-1.220657999426646,"5704":1.8262400407517,"5705":1.0441776141760157,"5706":-1.7755164792876825,"5707":-0.9764539801151984,"5708":-0.5134834098893213,"5709":-0.6164081868445891,"5710":-0.21795180530451502,"5711":-1.296252004903312,"5712":0.5038541918665009,"5713":0.07083510204096914,"5714":-2.3645584848890153,"5715":-2.3106468753080547,"5716":-1.702628815943086,"5717":-1.000098035347644,"5718":-1.1411352003515163,"5719":-1.2621116691703953,"5720":-1.3313062763317534,"5721":-2.065648424150439,"5722":0.6564384289810629,"5723":1.0170285295944357,"5724":-0.6752697217522022,"5725":-1.282487436112908,"5726":-1.1369832494629633,"5727":-0.4750893750063545,"5728":-0.9308788073735723,"5729":-0.6798233010001589,"5730":0.42663058858012404,"5731":-0.005057247392841755,"5732":0.9385162740422297,"5733":-0.3416604541442724,"5734":-0.17303179048305448,"5735":-1.143533431455136,"5736":0.05092776334542757,"5737":-1.1998657091273173,"5738":-0.297440541668102,"5739":-0.22092524647846234,"5740":-1.4398487569994918,"5741":0.34094239122198544,"5742":-1.3008516818827718,"5743":0.9973596794250188,"5744":0.2665997459213413,"5745":-0.7830400891140411,"5746":-0.8407061838987379,"5747":-0.3329514719552415,"5748":-0.7722421627898581,"5749":-0.46527002347986873,"5750":1.0555057085729604,"5751":-0.6046065334070486,"5752":-0.26615743774420025,"5753":-0.024771901499807146,"5754":0.6037230145344815,"5755":-1.50736163076759,"5756":0.08878912379352923,"5757":-0.2901764026776961,"5758":0.08338111979997184,"5759":-1.5996241005196439,"5760":0.21403259722913728,"5761":-0.8209134669380445,"5762":1.20352385241168,"5763":1.0306621082907146,"5764":-0.8208308701952995,"5765":-0.623124214041194,"5766":-0.9091799501612333,"5767":-0.7270589102745885,"5768":-1.5014947169043324,"5769":0.9171012009498507,"5770":-0.5579024643597884,"5771":-0.7340931530716307,"5772":-0.9057660315859778,"5773":-0.5099910292349729,"5774":1.4479902919694234,"5775":-2.3930133754857104,"5776":0.7456121789866339,"5777":-0.212527056480485,"5778":0.027392663160127746,"5779":-1.046932436123984,"5780":0.3556011297654305,"5781":-0.35956468358767085,"5782":0.05174592318434957,"5783":-1.7646051871089947,"5784":-0.16792533535130458,"5785":-1.8394248445664096,"5786":-0.05996756603183008,"5787":1.7068250248346086,"5788":0.5215070532213543,"5789":0.6091624014845525,"5790":-0.22992209247635473,"5791":-0.4090958986669125,"5792":0.7926566330615843,"5793":-1.7290284218878362,"5794":0.25615490933531987,"5795":-0.5730236007580005,"5796":-0.8465842852910253,"5797":0.5654845220185585,"5798":-2.302101903188686,"5799":-0.7110252478748664,"5800":-0.686471668260758,"5801":-0.1878080382901659,"5802":0.20378301367884746,"5803":-0.7118687693458425,"5804":-0.3432771805257658,"5805":-0.9038185790317145,"5806":-0.1859990572267911,"5807":-2.1479025950140573,"5808":0.6388796796162253,"5809":0.12413590763601225,"5810":-1.7778933996320339,"5811":-1.2279890740478587,"5812":1.0425573614405839,"5813":1.3788767063154097,"5814":-0.7343156964011345,"5815":-0.18653166321411158,"5816":0.48184282336419704,"5817":-0.5501958087607797,"5818":-0.15173826501191576,"5819":-0.5730913550935471,"5820":-1.3190434162206714,"5821":-0.8641631931464383,"5822":0.5189500209933804,"5823":-0.41054740574085574,"5824":-0.8765465187577235,"5825":-0.7854748574284758,"5826":-1.1880826876980768,"5827":0.16188776876632763,"5828":-0.34689333506641806,"5829":-1.0339972781999645,"5830":0.44768783063117573,"5831":0.9799029143342874,"5832":0.6270982580973711,"5833":-0.34790019062069005,"5834":-0.10774348686543511,"5835":-0.8817372965639043,"5836":-2.655921898578652,"5837":-0.005064582136685574,"5838":-0.9276641213785753,"5839":0.33251006606246275,"5840":-0.7051466767384614,"5841":-1.4222864334515566,"5842":-0.45444435298776426,"5843":0.8439513640246286,"5844":0.3528410481131098,"5845":-0.31369195665752814,"5846":0.23701784791037023,"5847":0.3563714008257994,"5848":-0.12398628919554161,"5849":-1.8380211291529833,"5850":-1.1737995499143261,"5851":0.7942670905615067,"5852":0.9539557328635078,"5853":0.7161144104637014,"5854":-1.1689119580368588,"5855":0.7697066132683813,"5856":0.12581677688591586,"5857":1.4460195574641905,"5858":-0.8348746979744378,"5859":1.4781116945475732,"5860":-0.05293303110120626,"5861":1.1656776212170745,"5862":0.5911386217351152,"5863":1.0389641047388738,"5864":0.6336203558557333,"5865":-0.892508781273527,"5866":0.5016957150827623,"5867":0.882380216450978,"5868":1.2894697810671714,"5869":-0.10012202542518425,"5870":4.194879097968857,"5871":2.0931649967617183,"5872":1.9196410356222817,"5873":0.018785075542386252,"5874":-0.9065409222638969,"5875":0.07997660795753425,"5876":0.3174890928236486,"5877":-0.26199672505003585,"5878":-4.714666176405874,"5879":-4.544934675921685,"5880":-2.5347160953177506,"5881":-1.7144580492829395,"5882":-1.3536218623937966,"5883":-0.7565277360215128,"5884":-0.8584157165791645,"5885":0.4652763922121693,"5886":0.4553321613232584,"5887":-0.6186161839727418,"5888":-0.3337377268652976,"5889":0.9984128331173424,"5890":-0.03518136879800243,"5891":-0.9512797831286062,"5892":-0.7892193234948917,"5893":-1.223346335662902,"5894":-0.8931887160800379,"5895":-0.6780918010215179,"5896":-2.0629019305614364,"5897":-0.04487970073659001,"5898":0.43373812244978194,"5899":0.3405088029991888,"5900":-1.1827549576427867,"5901":0.539053273285067,"5902":-0.6170425284611027,"5903":-0.7429265185732732,"5904":0.05973924462622642,"5905":-0.5497545357071921,"5906":0.34256054057100943,"5907":-1.0678985871447573,"5908":-0.4075525159513099,"5909":0.03659125114307796,"5910":-0.22927425142742508,"5911":-0.2060104509021611,"5912":-0.3115179107164019,"5913":-0.6940582202790568,"5914":-0.6046012072795416,"5915":1.3137818905349061,"5916":-0.91015206287355,"5917":-1.0687557755447759,"5918":-0.3204443590012067,"5919":-0.017162044403192057,"5920":-0.21219496799586612,"5921":-0.23888929477353382,"5922":-1.7484899186486083,"5923":0.899499572617452,"5924":-0.7329978823977072,"5925":-0.41032790195739893,"5926":-0.6987518332433342,"5927":-0.4970776376326899,"5928":-0.25972267896932205,"5929":-0.670747544562813,"5930":-0.5441925782200115,"5931":-1.3127517443993117,"5932":-0.5444706839839288,"5933":1.1437979031013001,"5934":-0.21728031740887566,"5935":-0.7549043576110908,"5936":-0.5186304471541319,"5937":-0.04079266650261896,"5938":0.4276215061111059,"5939":-0.14579602524992238,"5940":0.09296077057079427,"5941":-0.46841749805982946,"5942":-0.17776714187805503,"5943":-1.1622048487469143,"5944":-0.1259726366498146,"5945":-0.784016656051085,"5946":-0.028469275299224713,"5947":-0.6329815887227541,"5948":-0.30120825097896503,"5949":-1.1531852015366564,"5950":1.090541459914767,"5951":-1.471306494330248,"5952":-0.49958098924532024,"5953":-0.282282801647967,"5954":-0.4442974812199476,"5955":0.09712414753361856,"5956":-0.14126011631718968,"5957":0.03460554826727516,"5958":0.16616030906566923,"5959":-1.11606614824359,"5960":-0.907580305106085,"5961":-0.49635667525561716,"5962":-0.8435368811486722,"5963":-0.19823716848892722,"5964":-0.08421271965877253,"5965":-0.2206251245533092,"5966":-0.4478633401544511,"5967":-1.2047175222378226,"5968":-1.0917891045825934,"5969":-1.6185568394366987,"5970":-0.5199673650848877,"5971":-0.3448056853921718,"5972":-0.14451688005993976,"5973":-0.6759085531681964,"5974":0.2314569078294429,"5975":-0.2074002402226504,"5976":-1.4094634781446886,"5977":0.716497950273173,"5978":0.7764498355947225,"5979":-0.9690812455081732,"5980":-1.1491210942301815,"5981":-0.5558784865592435,"5982":-0.1120847913588312,"5983":-0.7081094877698527,"5984":-0.30092478371172515,"5985":-0.5494272230061514,"5986":0.5526459329746506,"5987":0.21020185598086072,"5988":0.3561221127560382,"5989":0.8215678947610184,"5990":-0.08945356536064776,"5991":0.07061385166773552,"5992":0.7592927388621646,"5993":-0.13018708205127896,"5994":-0.15631759668440678,"5995":-0.10930673457667886,"5996":-0.5284217397993326,"5997":0.2934098880338709,"5998":0.12471717254400251,"5999":0.8497821260304891,"6000":0.5609145819842557,"6001":-0.0006692655455272408,"6002":0.31566384501120454,"6003":-0.141089086923577,"6004":0.4261281249452071,"6005":-0.3109477637985489,"6006":0.2747224039184243,"6007":0.9850051216867526,"6008":0.18241470255571535,"6009":0.6196980603246213,"6010":-0.15742542140588536,"6011":-0.47303611226377507,"6012":-0.17384625515528443,"6013":-0.4802728706240305,"6014":0.5013608007184853,"6015":-0.41529381667116116,"6016":-0.02690040194152716,"6017":0.7086057844888292,"6018":0.1915397901977009,"6019":-0.028562566656379792,"6020":0.8749041970906279,"6021":0.31601278287995405,"6022":0.13296321176258766,"6023":0.5579816565667878,"6024":-0.34065450591855806,"6025":-12.268378615523906,"6026":0.3100081908037557,"6027":-0.3454048038721813,"6028":0.3816688132316119,"6029":0.308190491883092,"6030":-0.11532313670108926,"6031":0.45911121978743985,"6032":0.1416331882775473,"6033":-0.6635923593915969,"6034":0.07245310363685441,"6035":0.23487720992580285,"6036":0.1570055583773611,"6037":0.01856762618272324,"6038":0.04935153320809568,"6039":0.046696420720561384,"6040":0.03195923854049944,"6041":0.9410254043103654,"6042":0.15057914525423877,"6043":-0.4052488836958578,"6044":0.338840749399948,"6045":-0.1424401013688596,"6046":0.06347311882929725,"6047":0.14543146375885543,"6048":-0.08873566855664379,"6049":0.6051469406197422,"6050":-1.072034374481671,"6051":-0.07065723387931722,"6052":0.22021287667383158,"6053":-0.22583310157376596,"6054":0.21237096847474016,"6055":0.3688722727011708,"6056":0.4589385300208554,"6057":0.16652329144678038,"6058":0.1525291648338595,"6059":-0.447219104597543,"6060":0.12957431750645446,"6061":0.4890165398942031,"6062":-0.3125386561334545,"6063":0.06536186149216264,"6064":-0.15723745080282797,"6065":0.025834225918780408,"6066":0.12545948696538622,"6067":-0.1947256180786691,"6068":-0.864258389390459,"6069":1.1197385356887357,"6070":-0.4001853876583659,"6071":0.10837811341986422,"6072":0.5627653545360218,"6073":-0.7750677971140822,"6074":-0.0875105093942644,"6075":-0.7769878683636734,"6076":1.2216265075185806,"6077":0.6520198885538746,"6078":-0.7536022544465679,"6079":1.9886932820762586,"6080":-0.11880338211126826,"6081":0.4808502992680314,"6082":-0.047799726947181424,"6083":0.11722014003363496,"6084":-1.4203235612163567,"6085":-0.36145102936854656,"6086":-0.8930474916037143,"6087":-0.39838494677654707,"6088":0.03677904915709279,"6089":0.580790697009746,"6090":-0.4691585002024915,"6091":0.06729925741150707,"6092":-1.1226048950900203,"6093":-0.10085338924809696,"6094":-1.9188241207153733,"6095":0.48028887436667195,"6096":-1.339070640518224,"6097":1.15489986238847,"6098":-1.9266540162190966,"6099":0.23908929343424307,"6100":0.7058182137940832,"6101":0.34174845598626624,"6102":2.3647140102588864,"6103":1.3320575841636448,"6104":-0.9308106018090134,"6105":0.8600724270636007,"6106":-0.753557276007969,"6107":-4.840722496664396,"6108":-3.123821340587445,"6109":-4.415132999061364,"6110":-3.2472577376892486,"6111":-3.25892151772498,"6112":-1.3960328782912164,"6113":-0.019025626350472707,"6114":1.468657259238297,"6115":2.058184322873012,"6116":1.2996388872875815,"6117":0.4504446094017979,"6118":2.1768337901161665,"6119":0.959091265677177,"6120":0.3839938259724557,"6121":-0.09744842964308432,"6122":0.10186751089503347,"6123":1.237153403193154,"6124":1.2255067572866614,"6125":1.853063432029846,"6126":-0.23351276302171206,"6127":0.17635742007402833,"6128":0.03186571410949191,"6129":1.9401000142979137,"6130":-1.7408576603384416,"6131":0.5042428380711641,"6132":0.21946046088785764,"6133":-0.9755807183681862,"6134":-0.5376198217489351,"6135":0.11275229565622301,"6136":-1.4606002596182872,"6137":0.0029207394330887657,"6138":-0.6193179791478187,"6139":-0.19307406837111463,"6140":-1.8562832635191546,"6141":0.8376559203090074,"6142":-1.3855299697586372,"6143":-1.0706880013532583,"6144":-1.1587222965879387,"6145":-0.9467563454387202,"6146":0.1574323677125269,"6147":0.21142821949052398,"6148":-1.9680137583019992,"6149":-1.8914972088490445,"6150":-0.3405928668818518,"6151":0.8098673231003852,"6152":-2.5037967566944173,"6153":0.311211650700216,"6154":-0.4456816582731053,"6155":0.5235537009948588,"6156":1.8703892984291317,"6157":-1.4733392810715558,"6158":-0.8877774861237456,"6159":0.26516509915405506,"6160":1.0565088659180044,"6161":2.258015335910783,"6162":1.1027467636771622,"6163":2.0471473441878554,"6164":-1.030736429724699,"6165":-1.0558700277752122,"6166":-1.4759419779501193,"6167":-0.9119843264259786,"6168":-0.9566763839395822,"6169":1.5708580082515544,"6170":-1.017195533059802,"6171":0.55513584830924,"6172":-0.5436366639473441,"6173":-0.1131428077175447,"6174":0.8812625102863366,"6175":-0.7466884624044807,"6176":-2.9994294365663903,"6177":0.28817785511033533,"6178":0.9435204039438116,"6179":0.5956995411337065,"6180":0.23600723905242166,"6181":0.4528099382193253,"6182":0.45022843188584744,"6183":-1.0062151585372654,"6184":-3.129927062668379,"6185":-1.7327391007626365,"6186":-0.5185591249624013,"6187":-0.21042682579855013,"6188":-1.219436780471188,"6189":0.26795041603057373,"6190":-2.543279549411312,"6191":-1.309482030091858,"6192":-1.454108137129285,"6193":-2.7911555493064633,"6194":-0.10865865459747596,"6195":0.41239185213699875,"6196":0.49505776376957483,"6197":-0.18058586838430843,"6198":-0.05113950915226597,"6199":-0.49536444477287134,"6200":-0.20613511724965092,"6201":0.16088046097683636,"6202":0.21862863474409047,"6203":-0.6567469288926179,"6204":-2.104050020303182,"6205":2.871241162185912,"6206":-2.0323401237957786,"6207":-0.9945612602263287,"6208":-0.6384105477683418,"6209":-1.6521069241938764,"6210":-0.42298135617443694,"6211":-0.40654560369292475,"6212":0.23337916541343942,"6213":2.0658930592612057,"6214":0.593934308923227,"6215":-0.7329078231382082,"6216":1.456874715485682,"6217":1.6463019922733229,"6218":-2.1244002070993147,"6219":-0.5029632520956984,"6220":1.5912769864436926,"6221":-0.14884766624061155,"6222":0.03828287648711614,"6223":0.36504468349872243,"6224":0.2625548427747411,"6225":-1.1947955853809327,"6226":1.3491743568180214,"6227":-0.06491992999083092,"6228":-0.2915857169235702,"6229":-1.4588330420952935,"6230":-1.224456782562985,"6231":0.04717298994230381,"6232":0.480703546639114,"6233":0.41457125214044854,"6234":0.11376960490609446,"6235":1.2678310539913666,"6236":1.6014945248238348,"6237":0.4933183881088535,"6238":0.6878517076470614,"6239":0.5647615907567634,"6240":0.45524985005903945,"6241":1.117993675015538,"6242":1.1448609436356003,"6243":0.32668797217952483,"6244":2.7742326995900615,"6245":1.6227225487400008,"6246":0.7220927176377312,"6247":0.6432777560284701,"6248":0.4664282467423072,"6249":0.4900469870883274,"6250":-0.533821388008611,"6251":1.486804280725924,"6252":1.6279465610090478,"6253":1.3389217620708087,"6254":2.0008445910700963,"6255":0.4409317070408033,"6256":1.1178289633532754,"6257":0.7580094920817803,"6258":0.4413297237345978,"6259":-1.2286822609243426,"6260":-0.09048639219529812,"6261":2.0271687848752005,"6262":1.6980560086776464,"6263":1.4094130195717052,"6264":1.5067505713361853,"6265":0.3702145846264891,"6266":0.27915334051828067,"6267":0.29319839351837135,"6268":0.5453469952244575,"6269":-0.4303799810556469,"6270":-3.210746363922301,"6271":0.8028068348959421,"6272":1.0949236090333012,"6273":0.2649863841731211,"6274":0.3942126061870221,"6275":0.528311770811096,"6276":0.2704973082709122,"6277":-1.361186308885821,"6278":-0.45091764206119916,"6279":2.8932820108028863,"6280":2.403441993904358,"6281":1.51294797870502,"6282":0.652058710988442,"6283":0.6183230246177708,"6284":0.3483249503240893,"6285":0.33429380586977486,"6286":0.6348848067238054,"6287":1.7237148013793602,"6288":-1.4303561802602822,"6289":1.8048670060965255,"6290":1.4910860292879398,"6291":0.8103721304265458,"6292":0.9705692838423963,"6293":0.46478655758846693,"6294":0.5696490363402728,"6295":0.1543091894445074,"6296":-0.18905424247749036,"6297":0.3709680672073911,"6298":2.7329640095228465,"6299":1.536354423142768,"6300":0.729297673745101,"6301":0.7355989351021289,"6302":0.47822786888510393,"6303":0.5265558579948069,"6304":1.8770257410567903,"6305":1.5966171009649697,"6306":-1.4594884800671715,"6307":1.2307592016515867,"6308":1.2277688953372574,"6309":1.0313548856649832,"6310":0.8175722596807535,"6311":0.7010133608754247,"6312":0.4085295019506879,"6313":-1.4941231848297096,"6314":-0.04525719242113075,"6315":-1.2946574423090345,"6316":-1.1456343255112764,"6317":-1.6263413299050447,"6318":-0.5954816200967031,"6319":-0.49112019944959445,"6320":-0.8194061852093503,"6321":-0.4301260227281252,"6322":1.5215127791176546,"6323":0.20896641441012234,"6324":-0.533490150056185,"6325":-0.8868649528971174,"6326":-1.9631277033530674,"6327":-1.6938438036912808,"6328":-0.16031146329661583,"6329":-0.11972170880297607,"6330":0.25101741330393107,"6331":-1.9380631138516067,"6332":-0.6244906715808991,"6333":-0.6482183762905023,"6334":0.8867267027681632,"6335":-0.7649505866235747,"6336":-1.1060963869560316,"6337":2.5705457121461084,"6338":0.14451542168378598,"6339":0.18700903916804407,"6340":1.2675841253297282,"6341":0.3215025983030791,"6342":0.6428078472153795,"6343":-0.3240830931958469,"6344":1.4927570145855775,"6345":2.117593617491509,"6346":0.9173042410862668,"6347":-0.34833558008595844,"6348":0.9972601004847942,"6349":-1.3185110598512293,"6350":1.223220563778261,"6351":1.806109159795976,"6352":-0.7144907347139011,"6353":1.6796266408321112,"6354":7.024757925561326,"6355":-0.8483008599868743,"6356":-1.7552166714716118,"6357":-0.21352699401815037,"6358":-0.3518588745894251,"6359":0.5218048440355433,"6360":0.5027269185113254,"6361":-2.6961641827571565,"6362":3.3762904285310014,"6363":4.289983546010421,"6364":-0.1015380720424649,"6365":1.5745467223186256,"6366":-0.08594776521854872,"6367":0.6917020573881758,"6368":0.0926985109726553,"6369":-0.0630117027337008,"6370":-0.3662082992238686,"6371":0.7620712732493838,"6372":0.16556860422682415,"6373":-0.254823279216853,"6374":0.7718531813417238,"6375":0.6244632507792794,"6376":0.7851648624200571,"6377":1.2209474984508077,"6378":-1.511176209225795,"6379":-0.9097983397489011,"6380":-1.356137424122528,"6381":-1.6316649395165281,"6382":0.7962408524733388,"6383":1.5898390958850845,"6384":-0.2351763508897404,"6385":1.7852387407999994,"6386":-1.6941352731458046,"6387":0.10339736617637128,"6388":0.5644148250096709,"6389":-0.2229411321368075,"6390":2.000297087452826,"6391":0.022329310722186697,"6392":0.25978199940731517,"6393":-1.8646257742942491,"6394":1.1898957166637525,"6395":0.049951207944485765,"6396":-1.313538307169507,"6397":-1.9720898132079043,"6398":0.11303282169284597,"6399":0.5236928172627427,"6400":0.28745405283630826,"6401":-0.13451615512069293,"6402":-1.9736054949404704,"6403":0.3270355080693161,"6404":-1.3292577405947816,"6405":1.127433708044731,"6406":-0.5957908491791738,"6407":0.14247511444646968,"6408":0.22108721014261695,"6409":0.3112374363846598,"6410":-1.255309148247399,"6411":-0.2725906508455584,"6412":-0.7235357401244383,"6413":-0.8952573641931835,"6414":-0.6642481162525924,"6415":-1.552934461865488,"6416":0.9188662098349352,"6417":0.11768940752697594,"6418":-0.6779295168553199,"6419":0.12407364418903745,"6420":0.3833385443441624,"6421":1.507728805543155,"6422":2.4672792307394356,"6423":-0.7354565492568755,"6424":2.003627267999055,"6425":1.6530055233866676,"6426":1.6872711423744269,"6427":3.7756742073965626,"6428":1.56321783405822,"6429":0.33152642177204195,"6430":-1.9106610977093688,"6431":0.6477607768872354,"6432":-1.6275622158530625,"6433":1.7789227877722518,"6434":1.605835762710582,"6435":1.3632223723917307,"6436":1.0836184468465277,"6437":0.41199136305166434,"6438":-0.0892642408981428,"6439":0.6353158180374409,"6440":0.5641540963664307,"6441":0.252738698937903,"6442":-1.2903059125297254,"6443":-1.010087367066287,"6444":4.840392209647868,"6445":5.863889669724163,"6446":3.5738971464645073,"6447":3.3628449636474453,"6448":1.568466330321193,"6449":2.484898528343551,"6450":-0.8247517701437226,"6451":0.4815338820603487,"6452":-1.1310645887660637,"6453":-0.7203784819735638,"6454":-0.4087662040543619,"6455":0.4227544664280364,"6456":-0.3114112264476345,"6457":-0.28997584986353103,"6458":-2.1392866046669003,"6459":0.5772457004939575,"6460":2.1278937718882402,"6461":-0.24062190383370974,"6462":-2.0675510324085837,"6463":-0.8704428852142024,"6464":-0.7463392910702088,"6465":-1.0951885732247464,"6466":-0.28550719679217423,"6467":-0.587960226809435,"6468":-1.3205553577310376,"6469":-0.7564169397394773,"6470":0.33498362430293804,"6471":-1.3734961841959807,"6472":-0.2426897594206133,"6473":1.1258197258623202,"6474":0.4811458350806167,"6475":0.5214740048913991,"6476":-0.6579326574754307,"6477":-0.6404092858906268,"6478":-0.7630638088496624,"6479":1.9749988273655776,"6480":0.07299323460941566,"6481":-0.5402722134456996,"6482":-0.7983701423924259,"6483":0.8419041474005121,"6484":1.584225362744916,"6485":0.2653209085787427,"6486":-1.9540371352521066,"6487":0.30648679970901743,"6488":-0.49514022413870906,"6489":0.3721087821361883,"6490":0.011061818140119804,"6491":-0.5330402845820157,"6492":-0.7656709675683885,"6493":-1.242494453610797,"6494":0.8164062431983022,"6495":0.7755723229187301,"6496":-0.20648927118232602,"6497":-1.2387165380822283,"6498":1.5313967935210355,"6499":-1.636919377592976,"6500":-0.30687242571837403,"6501":-0.3309272078233163,"6502":0.45296879679732227,"6503":-0.13778527978666366,"6504":2.5239123921412996,"6505":0.5337370973613764,"6506":-0.42105296119987085,"6507":0.24602123050075284,"6508":1.7288545653553127,"6509":-1.8514015372850738,"6510":0.9333119183511581,"6511":0.8489893786851337,"6512":0.07202017880546714,"6513":1.6677854960570682,"6514":-0.13785848673792536,"6515":0.6383538108923088,"6516":1.2606069562978464,"6517":2.736236580616956,"6518":2.9330957362549244,"6519":5.350274795727853,"6520":3.3195005380704363,"6521":0.8495913259929704,"6522":-0.08823870317171022,"6523":0.9140974712962231,"6524":-0.36009696391622265,"6525":1.2461239995224178,"6526":-3.6653416091918287,"6527":-0.13577730645819347,"6528":3.2615846449742576,"6529":1.3589528218996427,"6530":1.2190034665656735,"6531":1.5104223556390495,"6532":-0.8519465009547329,"6533":0.041958980336076195,"6534":-1.7794100575406528,"6535":-0.22802175287547902,"6536":-0.8359630665901454,"6537":1.9490988845058477,"6538":0.07365625243987178,"6539":-1.7968316989270772,"6540":0.8208501067385495,"6541":-0.2872324028942819,"6542":-0.7557128456710305,"6543":1.4112836976782632,"6544":0.6087038547511555,"6545":-0.44088577131526974,"6546":-1.242837319848299,"6547":0.4181766055578387,"6548":-1.2489508800827775,"6549":-0.3587549939046407,"6550":0.5478664883874669,"6551":-1.840556261016757,"6552":-1.2189077563758464,"6553":0.17722060621211042,"6554":-2.3076825382231743,"6555":0.5108259801279118,"6556":-0.4803707108937534,"6557":-1.6052633797762192,"6558":-1.1783781679713308,"6559":-0.9167503662426203,"6560":1.2250425309729467,"6561":0.43203189856462465,"6562":0.6215590814318734,"6563":0.045535168739452375,"6564":0.9041950754555138,"6565":-2.3851578752817106,"6566":0.9946957881002896,"6567":-0.9134468494855047,"6568":0.5064077975567254,"6569":0.6295375152728274,"6570":0.5376557558039194,"6571":0.25574222922772694,"6572":0.6888408070304652,"6573":0.3430942320269465,"6574":0.17224557964933246,"6575":0.08431882158749511,"6576":-0.4016430848003798,"6577":1.7563879553572284,"6578":-0.09957169464813923,"6579":1.0179700284015896,"6580":0.9447590004457579,"6581":-0.2955720062862167,"6582":0.24453085343475162,"6583":1.0565169038059947,"6584":0.6534119973700487,"6585":-1.8893760814664782,"6586":-0.03017292994257561,"6587":0.7718949937776531,"6588":1.589254840361895,"6589":-4.782251593859936,"6590":-1.3950439797209777,"6591":0.36378608048454814,"6592":-1.2623330898072573,"6593":0.8002848628843975,"6594":-1.5873921273690015,"6595":0.3753329850393204,"6596":0.6890154776138201,"6597":-2.1329228672961253,"6598":0.3832043998057296,"6599":-3.5280216263077206,"6600":-0.4652622235192003,"6601":-0.5798261778707746,"6602":0.39537496942554007,"6603":1.4407126448523624,"6604":-1.4314176034229853,"6605":0.6607896361261424,"6606":-0.2980275289170655,"6607":-0.20600203346529658,"6608":3.067577185080722,"6609":4.678828899756442,"6610":2.1128501315270247,"6611":0.67187455320191,"6612":0.8282485360045793,"6613":1.9262800701665446,"6614":0.09609130437033198,"6615":-0.40688098045466453,"6616":1.6522813430848278,"6617":1.4382544717784604,"6618":2.5001336198340427,"6619":1.0335435368518948,"6620":1.9180763483221759,"6621":1.8801715556437106,"6622":0.3977481318690409,"6623":0.005728665995077764,"6624":-0.141063456191121,"6625":-0.5378011357262288,"6626":0.7486641631105149,"6627":0.7046886676718207,"6628":0.5001261642331506,"6629":1.45842500164736,"6630":-0.24097751878086252,"6631":-1.1053081193452163,"6632":-0.26060613913536257,"6633":0.2674934840510693,"6634":1.7880786064861687,"6635":-0.36097828907460944,"6636":0.4086452278637533,"6637":-0.6196575736455838,"6638":-0.02537786594616073,"6639":1.0682442959944367,"6640":0.3547361034045942,"6641":-1.6610928036863832,"6642":0.2411996340958521,"6643":-0.7874343389147648,"6644":-0.7538831896159419,"6645":1.9479599651836754,"6646":-0.6626744550556395,"6647":-3.0859564331525693,"6648":-0.25153088961368736,"6649":-0.0873806033131816,"6650":-1.3078763618404434,"6651":1.1749753908564593,"6652":0.44274660626035733,"6653":-0.790971688400507,"6654":-0.9471235559900493,"6655":-1.22247179247033,"6656":0.8770790195754664,"6657":-0.9268788782806996,"6658":1.7824700200429353,"6659":1.0760087575821047,"6660":0.9722476801128478,"6661":-1.189188791513579,"6662":-0.6591908126585492,"6663":1.1593126660459265,"6664":-1.4091295572889468,"6665":1.9013016839337673,"6666":1.399125379024682,"6667":0.18257711218242195,"6668":1.2853662052598223,"6669":-0.05274149781312203,"6670":1.1069925963814282,"6671":1.5861432896753902,"6672":-1.2712340667463693,"6673":-1.1388994068256304,"6674":0.16962475923647716,"6675":-1.8219277481461984,"6676":-0.29416445168120237,"6677":0.3908167051421537,"6678":1.3395830198124727,"6679":-1.959961668749158,"6680":-1.4395413623780127,"6681":-2.6858149833837417,"6682":-0.543455807368245,"6683":0.4249459218216083,"6684":1.7990872582840016,"6685":1.5347547989200765,"6686":0.3658584156204909,"6687":-0.37353420571717666,"6688":1.6295502288702002,"6689":-1.3290738657276684,"6690":-0.9004967584059611,"6691":-4.834770196822594,"6692":-3.2858546094062517,"6693":-3.154676632761644,"6694":-2.238166308257897,"6695":-2.4814218229293314,"6696":-0.12581200805783738,"6697":0.4884219889127663,"6698":1.4380491185108408,"6699":1.392151809869171,"6700":-0.20406062388713755,"6701":0.5575154936308673,"6702":-1.624828996387613,"6703":-1.2547865485756218,"6704":0.16697864667918585,"6705":0.2771695284622952,"6706":0.45873684663316583,"6707":0.5024261702051103,"6708":-0.3748545675440439,"6709":1.223215056236996,"6710":0.18715239102779932,"6711":1.3865585459448977,"6712":-0.20745273606444584,"6713":-1.9136261735360072,"6714":-0.4129199628650632,"6715":0.9063145888604807,"6716":-1.303456097966999,"6717":-1.393682400806794,"6718":0.8895658310525861,"6719":0.5379158704726813,"6720":-0.5926318630592519,"6721":-0.2625544938913507,"6722":-2.3347349610995307,"6723":-0.1316900955089774,"6724":0.6685731902971519,"6725":0.6784702451546668,"6726":-1.3598424834798792,"6727":-1.8790067107780686,"6728":1.1184889206682551,"6729":0.9849435476727556,"6730":1.727241858995952,"6731":0.7595616263000317,"6732":1.631923028320367,"6733":-2.799892470896737,"6734":-1.789535498943533,"6735":0.1431046705715528,"6736":-1.0002869988095329,"6737":-0.1981973390615831,"6738":0.0010090918763329744,"6739":0.17123208852586788,"6740":1.4841906573521746,"6741":1.9589761013599825,"6742":-0.40073913662271643,"6743":-1.3358666157025454,"6744":0.3993752458167741,"6745":0.5869647074813608,"6746":0.5391142694888338,"6747":1.7041601442140764,"6748":0.4231848866387549,"6749":1.5544720139272992,"6750":1.7610289108678323,"6751":-1.7030541544901785,"6752":-1.1461505344677867,"6753":1.7232832612209368,"6754":2.092716826663277,"6755":2.5446316930936757,"6756":2.323124570412941,"6757":-1.1455815911659832,"6758":-0.3821856890707161,"6759":-0.18582019148751286,"6760":0.24347496023731108,"6761":0.04714796281957509,"6762":-1.5508312385624459,"6763":-3.353298011276835,"6764":-3.8520516402379443,"6765":-0.02005589106275318,"6766":-2.1170722170743885,"6767":-1.3149917749601414,"6768":-1.0398841038028166,"6769":-1.1014694632948525,"6770":-0.7703986468382343,"6771":-1.1262122086068864,"6772":1.257550039420079,"6773":1.3293778795212492,"6774":1.2136742837515762,"6775":3.4743196908957996,"6776":0.03307982640784322,"6777":-0.06502621012661312,"6778":0.8282706142000789,"6779":-0.2506168488352451,"6780":0.28369824365385343,"6781":-0.3730526499118384,"6782":0.33117035800844685,"6783":0.7470275478401567,"6784":1.9678829669934,"6785":1.4025737856289022,"6786":-0.12598490858105613,"6787":-0.17752572265066605,"6788":-0.45595765831506413,"6789":0.3857380774567818,"6790":0.4476414958302397,"6791":-0.5528045022040132,"6792":0.8547498878658425,"6793":1.2448880510031999,"6794":-0.69978684297201,"6795":2.559671700911636,"6796":0.24077438949300564,"6797":-0.7815904434117725,"6798":-0.5450853196012325,"6799":-1.0351348494061983,"6800":1.125365695888032,"6801":1.733184695626639,"6802":-0.18760191390407963,"6803":-1.1438712279164203,"6804":1.3441217530880434,"6805":0.6089802533576556,"6806":-0.2349474712895172,"6807":0.2899951924066185,"6808":0.10291172500947841,"6809":-0.48860789456112513,"6810":0.5033811527322032,"6811":0.24537072706323748,"6812":0.685875504265967,"6813":-0.11573597355266455,"6814":-0.19613383716143307,"6815":-0.6278199843971336,"6816":-0.05801749160522619,"6817":-0.5310538005462059,"6818":0.3411004728719847,"6819":-0.09126364419852427,"6820":-0.023663825778729268,"6821":-0.22689166917739934,"6822":0.19822923559897962,"6823":1.2908110193617623,"6824":0.23641693504035818,"6825":-0.34811763600354995,"6826":-0.0024470220686887752,"6827":-1.1836775034598284,"6828":-2.2927905573457665,"6829":-0.8910291892097114,"6830":-1.206122632548932,"6831":-0.9013033644101656,"6832":0.1992312483756703,"6833":-0.2906080567108776,"6834":-0.35710584406394874,"6835":-0.5973637412243183,"6836":3.99632168358842,"6837":8.047620423593541,"6838":7.7508401405997205,"6839":5.825370370491733,"6840":4.001476699914344,"6841":2.7578350843516266,"6842":1.3161080990045075,"6843":-1.063478396217282,"6844":1.2502306966839494,"6845":-0.7783540402533733,"6846":-0.7739242359535917,"6847":-1.3333963708264114,"6848":-0.8289953130260944,"6849":-0.6298522558003541,"6850":-0.0291068291621864,"6851":-1.056349535960352,"6852":-1.5212386931577093,"6853":-0.9152679048890244,"6854":0.13910420325885436,"6855":0.5575019595892305,"6856":-1.276696195196882,"6857":-0.04109265480497329,"6858":-2.0791103643747113,"6859":1.3391582314831592,"6860":1.3311642598574969,"6861":0.8624476210213591,"6862":0.784213702481067,"6863":1.1870233368363081,"6864":-0.18481306720124305,"6865":1.0777081277731775,"6866":0.7433370714743118,"6867":0.37106051100456205,"6868":0.4361664327542888,"6869":-1.3890607683113827,"6870":-0.5415864242911052,"6871":-0.4098547921123619,"6872":0.5547332633966979,"6873":0.9122698570237318,"6874":0.18862124120877793,"6875":1.7096566737834633,"6876":0.2581603387710348,"6877":-1.152472988383667,"6878":-0.15979248421649353,"6879":0.28723959636474533,"6880":-0.9317641257272742,"6881":-0.15951034888694637,"6882":-0.4562135860190785,"6883":0.5260345165581467,"6884":-0.20027202122602789,"6885":-0.2970960562932384,"6886":0.10540308673868456,"6887":0.6424649329401664,"6888":1.1305503731066568,"6889":-3.1901323516336406,"6890":-1.4199749000559152,"6891":-0.19600087229435684,"6892":2.034657786323303,"6893":2.8547023988486937,"6894":2.3657614085983734,"6895":1.632964722368483,"6896":0.11565785829629152,"6897":2.502176852505355,"6898":0.5728930827385423,"6899":-0.5712858373528619,"6900":-0.1797297068743072,"6901":-1.5495978560799277,"6902":-1.706524266959022,"6903":-0.1251392656397029,"6904":0.9972928024424998,"6905":-0.6776405301473376,"6906":2.384225918255015,"6907":1.923983397050645,"6908":1.0820533018880605,"6909":0.450402307226516,"6910":0.11929917237827424,"6911":-0.43009332164764214,"6912":1.5041692535734368,"6913":-0.1265784130104223,"6914":0.9874658183682442,"6915":-1.2568555976871412,"6916":-1.33521172109486,"6917":-0.5877392772319993,"6918":0.33278718761890047,"6919":2.0131222690671526,"6920":0.6558599066817601,"6921":0.8962271285052693,"6922":1.4101223186516327,"6923":1.544297852383933,"6924":-0.7006626408179246,"6925":1.4830599682704904,"6926":-0.6639912901183019,"6927":-1.8715089596626622,"6928":1.491756994599302,"6929":3.051399803543388,"6930":4.1126080628629325,"6931":2.857495418358455,"6932":1.6615400639737061,"6933":-0.0724845519666841,"6934":0.5087909394142587,"6935":1.1063561759387743,"6936":-0.7832517292319061,"6937":0.6129154022859722,"6938":-1.0391742657311616,"6939":-0.6312727216087028,"6940":-0.28931127908380083,"6941":-0.5041717947063772,"6942":0.7960905553923397,"6943":0.8753610051922152,"6944":1.1648906799843748,"6945":-0.5821686582323845,"6946":0.9195034901287905,"6947":-0.40160108682914614,"6948":1.4821750931362996,"6949":-1.84705559986722,"6950":0.9334563821075378,"6951":-0.3904673268725584,"6952":0.31626982046123664,"6953":-0.44805077357901846,"6954":-0.2708054488702974,"6955":-1.5875791496377627,"6956":-1.1512031116861545,"6957":-0.940635682101574,"6958":0.21927704621737285,"6959":-0.5433360305958335,"6960":-0.6047659891994427,"6961":0.023668397812727438,"6962":0.46330663715761466,"6963":-1.9409920611918614,"6964":-0.4352110844598131,"6965":-1.4653483007287522,"6966":1.185792568901084,"6967":-0.060286327945383314,"6968":0.914841189837782,"6969":-1.006785782741393,"6970":-0.8536237796244656,"6971":0.697437171610618,"6972":-0.3375241928983619,"6973":0.8983794625713157,"6974":-0.320974319733804,"6975":-0.721671827321061,"6976":0.04693455562342297,"6977":-0.30226461322414017,"6978":-0.31213763136809575,"6979":-0.2662367419101647,"6980":-1.6014423721990705,"6981":0.8204496092432552,"6982":-1.786888522952483,"6983":-1.1600907910932357,"6984":-0.023607598767133676,"6985":0.07248926177341129,"6986":-0.06327367528169543,"6987":-0.4218369821512457,"6988":-0.3309970698483738,"6989":0.20363204553490646,"6990":0.9447221661630769,"6991":-0.6370185662439646,"6992":-0.36837276401353086,"6993":-0.1241042084214802,"6994":0.28611254772806516,"6995":0.3041500699903617,"6996":-0.40650330933094053,"6997":-2.754997796895802,"6998":0.6310575576469889,"6999":-0.23397389231822907,"7000":0.4337669708399741,"7001":-1.0001588538740558,"7002":-0.13129700130852937,"7003":-0.6296084826047739,"7004":-0.16671527006825665,"7005":-0.2681430831099931,"7006":-1.028084468163459,"7007":-0.22929033482052127,"7008":1.5073255200044764,"7009":-0.9528474660014741,"7010":-0.8401530750021179,"7011":-0.3545366280689332,"7012":-0.662595513477564,"7013":-0.4161938409118673,"7014":0.075498258232397,"7015":-1.9431094159187803,"7016":1.7897617797265954,"7017":-1.2387947877756273,"7018":0.5928695191782557,"7019":-0.8725448953746275,"7020":-0.4792715557416776,"7021":-0.23671799666955892,"7022":-0.39884555391093257,"7023":-0.01866026304227893,"7024":-0.7700088126917487,"7025":-0.4382686874638157,"7026":0.8398196409153402,"7027":0.419843108105806,"7028":-0.34361245555258535,"7029":-1.2251457421324703,"7030":-0.3001852810944263,"7031":-0.1937354263173355,"7032":-0.014015775445978792,"7033":0.6975274947393179,"7034":-0.6350827584497607,"7035":-1.2248475164126156,"7036":-0.06476786492173595,"7037":-1.127152201161685,"7038":-0.9092382022551698,"7039":-0.5434321705765062,"7040":0.0348326207003474,"7041":-0.46533687936196083,"7042":-0.8142785507481558,"7043":-0.9669055760520426,"7044":-0.15432942310059986,"7045":1.1693648369083525,"7046":-1.076361579451254,"7047":-0.8179668629224524,"7048":-0.5647817196850464,"7049":-0.5573194048463216,"7050":-0.4907484613302882,"7051":-0.568955663523518,"7052":1.0330683383064743,"7053":0.39798035054760683,"7054":2.5643901355691487,"7055":0.087207833137287,"7056":-1.1178087209871528,"7057":-0.36808302399470993,"7058":-0.6666461332018313,"7059":0.9089792148087099,"7060":-1.15516343308292,"7061":-0.38847512900645303,"7062":-0.571429175512315,"7063":1.353534861508779,"7064":0.951366905169089,"7065":-0.04131809354919131,"7066":-1.1351721738695806,"7067":-0.40172338238137173,"7068":-0.11403536907147087,"7069":-0.24402015001037908,"7070":0.2106160246291966,"7071":0.91951020067048,"7072":-4.0299536559919495,"7073":-0.36362216933254365,"7074":0.3003920979791503,"7075":-1.0774712596674338,"7076":-0.8212387870758959,"7077":-0.9013876979469831,"7078":0.7860108425483893,"7079":-0.1664375848303464,"7080":0.28684383278011744,"7081":0.7476037500246101,"7082":-0.35198444334012974,"7083":1.5776407533840107,"7084":1.5536245241168658,"7085":0.9192876475337314,"7086":2.353118725182392,"7087":2.3390150749541148,"7088":-1.1260770837194334,"7089":-0.9224609943551358,"7090":2.6017398105778144,"7091":5.708220381503004,"7092":2.617041977658061,"7093":1.641241456139086,"7094":-0.8371422603129337,"7095":1.5196001817146698,"7096":0.3291447578641001,"7097":-0.48456582206331644,"7098":0.8706572336374581,"7099":-1.3723792889293724,"7100":-1.039644390472317,"7101":-0.42714331139388545,"7102":-0.34649591247943523,"7103":1.5617553848577714,"7104":0.5551616523680731,"7105":-1.3721999483322223,"7106":0.2494919206394807,"7107":1.0589634003663362,"7108":-0.5316779586183755,"7109":-0.690451787188077,"7110":0.11317980933550324,"7111":-0.379020454487364,"7112":-0.8759662775032638,"7113":1.317869932200169,"7114":-0.6025662216991285,"7115":-1.016052110029161,"7116":-0.37078492158777887,"7117":-0.6349479497484066,"7118":0.9959574615645684,"7119":0.6202989569691435,"7120":0.3487345923775428,"7121":-1.4926988146022424,"7122":-0.28951055726452235,"7123":0.6412761443330567,"7124":1.211786102239229,"7125":1.4812937020128887,"7126":-0.5643553284068897,"7127":0.4505834321896608,"7128":-0.7165883781885253,"7129":1.7250163260031346,"7130":1.6309046462815149,"7131":-1.5383158979624336,"7132":-0.3650217087841412,"7133":0.3388256083202115,"7134":-0.15541492953316388,"7135":-0.06875593123390711,"7136":0.6398211326765163,"7137":-0.37129991163005005,"7138":-0.17582444771610625,"7139":-0.3376909341955442,"7140":0.10441882197231923,"7141":0.01469904368273251,"7142":-0.19472686489357074,"7143":-0.18499960354679804,"7144":0.1861314958344391,"7145":-0.21825239706348273,"7146":0.8404605905983737,"7147":0.22331397357112126,"7148":-0.5571513967959544,"7149":-0.18810057108417916,"7150":-0.21282136844916616,"7151":-0.5361186625478213,"7152":0.22278659469669207,"7153":-0.15207058799660775,"7154":-0.24769911033087236,"7155":-0.8711869399271425,"7156":-0.2794076878990244,"7157":-0.6151072686288694,"7158":-0.07387924181315192,"7159":-0.5440693973083504,"7160":0.41886860567469314,"7161":-0.18475089205316148,"7162":-0.5317654881292915,"7163":-0.1166053307116882,"7164":0.23142569955635992,"7165":4.304981553659463,"7166":0.007600201441948355,"7167":-0.4041023117611258,"7168":0.36035405896680384,"7169":0.27738095463638685,"7170":-0.43607301588380143,"7171":0.35724810189934675,"7172":-0.9988154001362151,"7173":-0.24040704438696286,"7174":15.169538497688894,"7175":6.030642714452831,"7176":0.16894851813077658,"7177":-0.6785238724210677,"7178":0.10733764958127866,"7179":-0.052178059720345456,"7180":0.029677738985010776,"7181":-0.5085418793082688,"7182":-0.9406978527719938,"7183":3.0745988569792124,"7184":0.9819335653500897,"7185":0.6594111393444438,"7186":-0.28053112572075717,"7187":0.04362414162170317,"7188":0.1952769490394863,"7189":0.2985249425807614,"7190":0.30211838538771907,"7191":-0.20115131180096468,"7192":0.21372191904211682,"7193":0.3708801458397771,"7194":-0.6988327974950674,"7195":0.5022258609876106,"7196":-0.5397455165614728,"7197":0.66318360555029,"7198":-0.36759430401665516,"7199":-0.2848136046988958,"7200":0.5310160395676056,"7201":-0.6116975712994248,"7202":0.46062014964576337,"7203":-0.48570864588977475,"7204":-0.5615212038025339,"7205":0.28610814904989695,"7206":-0.13564541478320077,"7207":-0.33601718063467023,"7208":0.17409761396511308,"7209":0.017044981195094056,"7210":0.8724296296493695,"7211":0.1838292670817562,"7212":0.43798065966556265,"7213":-0.5451254344884923,"7214":0.009866931136429908,"7215":-0.11946734073873115,"7216":-0.6655079616368967,"7217":-0.42990245583735,"7218":0.8966243212518755,"7219":1.2307279370940765,"7220":1.5846501902486314,"7221":1.1699374496024126,"7222":0.24205524675358053,"7223":1.0502712426271532,"7224":1.0667425184937924,"7225":0.6407678721574505,"7226":-0.4015536017283431,"7227":-1.091603772464685,"7228":0.16841253607561968,"7229":1.8150418194196871,"7230":2.5135802944375514,"7231":0.006576362552736701,"7232":0.7305474890550567,"7233":0.4084183181928653,"7234":0.7573068494165736,"7235":0.3106954260431862,"7236":0.15758218166437465,"7237":-0.44265895661204524,"7238":0.5285270128962316,"7239":1.4717076240343296,"7240":0.2061512649348222,"7241":1.5412296126058038,"7242":1.2086849511812405,"7243":0.9476968940014082,"7244":0.9615804175591063,"7245":0.15347310974808362,"7246":-2.421538853197839,"7247":1.5299423092326505,"7248":2.1878709719050735,"7249":1.102800099984434,"7250":0.7795466591065383,"7251":0.7745558597291121,"7252":-1.206302760521479,"7253":0.185954759144334,"7254":-1.8507175160624034,"7255":-2.9393721372437054,"7256":1.7616539256496513,"7257":1.1844239125099956,"7258":1.379592146153194,"7259":0.8169100959580259,"7260":0.7900717681568131,"7261":0.7964576773981783,"7262":-1.2967362520200676,"7263":0.3005770555578016,"7264":0.10046675649867927,"7265":0.7407748120183227,"7266":1.8853601625104282,"7267":0.43452525538797715,"7268":1.066355050092272,"7269":1.0302845417464421,"7270":-1.7687886842372937,"7271":-0.23941578331189484,"7272":2.1814053429097333,"7273":0.5379695362317185,"7274":0.745597071493153,"7275":1.942808922835219,"7276":0.6405641343230561,"7277":0.5543126049236602,"7278":0.8278259640497572,"7279":-1.5474966349710617,"7280":-0.2695655716923931,"7281":0.14066363143012667,"7282":1.653850171893031,"7283":-0.0522648809395466,"7284":2.2949322512302315,"7285":0.9069402078588787,"7286":0.7062506114288064,"7287":0.2870364861255869,"7288":1.270164813881961,"7289":1.0535195729406546,"7290":0.7720965652199742,"7291":-1.0613358386376,"7292":0.6509246097924506,"7293":1.238085525458292,"7294":0.3162561566493082,"7295":0.8124669435206407,"7296":0.789876043663531,"7297":-0.05411328419891122,"7298":-1.4813935365853108,"7299":-0.8214859725852767,"7300":-1.534957430105794,"7301":1.5824699032497067,"7302":1.4304737869543018,"7303":-0.015662669341368826,"7304":-0.26437278752840265,"7305":-0.5483433021410415,"7306":1.3881560734060998,"7307":-1.1433236703606064,"7308":1.0212294469770304,"7309":0.9285411771507757,"7310":0.8892239053758433,"7311":-0.8593716405616801,"7312":0.8785424650336321,"7313":0.028758911978461744,"7314":-1.2770356166551238,"7315":0.4132713133130813,"7316":0.7977102467309007,"7317":-0.15443924081052518,"7318":-1.0259696183700349,"7319":0.9986204076166294,"7320":1.3266647360656556,"7321":-0.6584431086270878,"7322":-0.05408474085789927,"7323":-0.34244307730205276,"7324":0.3680729189367059,"7325":1.1386632520121875,"7326":2.1285952839785685,"7327":-1.3742438108185504,"7328":1.3477335086889641,"7329":2.2561294128043197,"7330":4.096859931853733,"7331":3.3968930753785487,"7332":1.7290669436253554,"7333":0.7279647314364646,"7334":0.7012540031760537,"7335":0.41887908612105695,"7336":-2.164328511347726,"7337":-3.063358863088395,"7338":4.1715245854025405,"7339":3.7202786726907764,"7340":1.3646460917656227,"7341":1.6764027902314143,"7342":2.199386466873807,"7343":0.6673300138236997,"7344":-0.41081358704153437,"7345":-1.3080807893283941,"7346":-1.4883227527798515,"7347":-4.097048291126313,"7348":-1.5051224182544871,"7349":-0.5301182021798998,"7350":-1.153609650128424,"7351":0.6614729846923402,"7352":1.4182797184816305,"7353":0.7723113981317559,"7354":-0.29541249407654463,"7355":-0.5300494601636997,"7356":-1.1394438326365628,"7357":-2.190835025279609,"7358":-0.9719165543964147,"7359":1.5941094504460467,"7360":-1.0553905793758322,"7361":0.5514857001379748,"7362":-0.3496107039779449,"7363":-1.3276703086809993,"7364":0.7034126934196036,"7365":-3.0357661424982543,"7366":0.0751102155801288,"7367":-0.0496462996427592,"7368":-0.8190537722019362,"7369":0.10601890135794319,"7370":-0.005285454477890544,"7371":-0.7321618795015744,"7372":0.15347388234136797,"7373":-1.0551061141669087,"7374":-1.3137760115394006,"7375":1.744033791601362,"7376":0.13448017761833828,"7377":-1.3027385037972345,"7378":1.0210193422736562,"7379":1.2263737698040795,"7380":0.18633835227619439,"7381":0.09608185347652946,"7382":0.39185172365063603,"7383":-0.8210344973879363,"7384":-1.3116539948832666,"7385":-0.26924934613463364,"7386":-0.9024579242468826,"7387":-1.0269896752721954,"7388":0.09600944018945093,"7389":0.9993557124126565,"7390":-0.2085113642221692,"7391":-1.508218445565713,"7392":-1.2329832407532655,"7393":0.23897231146565714,"7394":0.3131732925285873,"7395":2.2729002646039844,"7396":2.9537667650827495,"7397":0.8534380137552529,"7398":-1.990796064695487,"7399":0.48755734898500247,"7400":1.3075585809700336,"7401":-0.04503964413888581,"7402":0.8144144806679878,"7403":-0.03511605264968097,"7404":0.11230282880254042,"7405":-1.834799855109793,"7406":0.3638705656896532,"7407":-0.09820727419650219,"7408":0.054482138157630255,"7409":-0.015596997020672167,"7410":-1.1844803079400121,"7411":-3.450779279866876,"7412":-4.608973820782367,"7413":-1.8623001115374722,"7414":-0.2103042631699315,"7415":1.1200666816928024,"7416":-0.8623065757565084,"7417":2.465290501412301,"7418":1.579131061105389,"7419":-3.8458383630555284,"7420":-2.7035715292785496,"7421":-0.9449781946089083,"7422":-1.504067988565312,"7423":-1.386797474342855,"7424":-0.009014654895226385,"7425":-1.0048178456874137,"7426":-0.4525267059020489,"7427":0.2319031231733305,"7428":0.21205519202908388,"7429":0.9721005493412792,"7430":-1.4473616539927485,"7431":-2.6265374142161915,"7432":-1.387955099820292,"7433":2.6302858048030884,"7434":1.3620775051264407,"7435":1.1270376975831065,"7436":-2.5202510034026684,"7437":-2.09139567958157,"7438":-0.001629920381552736,"7439":0.5988608166383684,"7440":-2.059394114129324,"7441":1.8594278545016267,"7442":1.3684762710660416,"7443":-0.2972116300550386,"7444":0.4649404544659167,"7445":0.9263835546562692,"7446":0.21324677463902347,"7447":0.5552875377138625,"7448":0.12885341548545906,"7449":1.5498045709192578,"7450":1.049417735070773,"7451":0.1149935213643764,"7452":0.032893370448007116,"7453":-0.0981341986275885,"7454":-1.5849807405708511,"7455":-0.43552025009429657,"7456":0.2551424183235182,"7457":0.7760942507725409,"7458":0.7984300360464002,"7459":0.8972174527249793,"7460":1.531417795197543,"7461":0.8636632825100076,"7462":0.449879732001986,"7463":2.4944012207508988,"7464":0.7610167340379148,"7465":2.4403227127968705,"7466":1.0777089651311396,"7467":0.7231566240280803,"7468":0.26339305350682846,"7469":0.28400900946482965,"7470":0.4550800470448552,"7471":-1.7957546078572455,"7472":1.5911129941343827,"7473":2.1184715192117056,"7474":2.0263158551675744,"7475":1.4777761524320687,"7476":0.649128266723582,"7477":0.5196283930170259,"7478":0.3169338392873784,"7479":0.4162904757386746,"7480":1.271907318586592,"7481":-0.7445792241758782,"7482":-0.2757667841939056,"7483":2.005771677356602,"7484":1.403695235106385,"7485":0.6057320464069427,"7486":0.3245425929135548,"7487":0.2124081157101942,"7488":0.09008377339796214,"7489":1.0752564961619087,"7490":0.8130277946013101,"7491":1.8849835759621296,"7492":2.7999782608147195,"7493":1.237048692215421,"7494":0.8974057066695156,"7495":0.2864807296929534,"7496":0.12291840346124122,"7497":0.2560880213698798,"7498":-0.6992658698685202,"7499":-1.0390890393935994,"7500":-1.3281742172982542,"7501":1.930581875537346,"7502":0.9177067415925145,"7503":0.6293824668908677,"7504":0.2541688617818792,"7505":0.26854308955010514,"7506":0.18011736895692215,"7507":-0.9443599857425503,"7508":-1.6263209598149926,"7509":-0.13936468169282226,"7510":1.6414538864010744,"7511":1.0643102568515421,"7512":0.4826833962417087,"7513":0.41078904745640454,"7514":0.19265689195030525,"7515":0.2996457793900669,"7516":0.0056914101649338964,"7517":0.8303755080226846,"7518":-0.17478508778657167,"7519":1.777188444204828,"7520":0.6468962372295513,"7521":0.2844366517076898,"7522":0.31054854992466796,"7523":0.2411056771968494,"7524":0.37941391915226946,"7525":0.9407017087318835,"7526":1.8101713388287664,"7527":-1.4885164987346664,"7528":2.335566819891612,"7529":1.535059400152847,"7530":0.6163366355102283,"7531":0.32358635730066365,"7532":0.3320913383585075,"7533":0.3174767334170072,"7534":-1.422308240492208,"7535":-1.696309654632247,"7536":-1.5820521176838054,"7537":1.6471484169877644,"7538":1.2310895160355657,"7539":1.0380072712134514,"7540":0.4766157394494088,"7541":0.31136532582659215,"7542":0.18558594263753692,"7543":0.48342467221371277,"7544":0.9242967605953468,"7545":0.35912560534146193,"7546":0.27211522624299156,"7547":-0.8867977682855369,"7548":3.7511226964936752,"7549":-0.19609022393475548,"7550":-0.35176454578506633,"7551":-0.3988333323929776,"7552":1.170983746606579,"7553":0.4284465393997218,"7554":1.4719360353191946,"7555":1.8790094796834749,"7556":-0.5388543523068157,"7557":-0.8912527994064444,"7558":1.4295505683809484,"7559":-0.7990446957318447,"7560":-2.459270289054614,"7561":0.2431684195107855,"7562":-0.9970478588035674,"7563":1.592292330937493,"7564":1.85838558825741,"7565":-0.989001159427228,"7566":0.8744760923442314,"7567":-0.7971809157924393,"7568":0.5937541757131092,"7569":-0.9620240908295733,"7570":0.3316459155591732,"7571":-0.18882110450723089,"7572":-1.2576565199299126,"7573":-0.1988660158706119,"7574":-0.2065603165165125,"7575":-2.061656668925362,"7576":-1.464174373972118,"7577":0.11995240090017062,"7578":-0.9810933301492724,"7579":-0.09661689904171393,"7580":-0.40874415709035794,"7581":-0.1905829466725477,"7582":-0.4936597379475919,"7583":-2.3858506824626673,"7584":-3.7307140338091234,"7585":-1.814811958832555,"7586":-2.024461693440127,"7587":1.0915959267668223,"7588":-1.6691456778585878,"7589":-0.5938622723974517,"7590":-1.9689414770985798,"7591":0.6072119488396481,"7592":-1.1404034485820063,"7593":-2.0612789882828695,"7594":0.18247606575512365,"7595":0.21661638204523773,"7596":0.43263253324571055,"7597":-0.6522508734449863,"7598":-0.8101511999022568,"7599":0.18987465370548473,"7600":1.9913600773655928,"7601":0.21809251973119498,"7602":-1.6548590858351744,"7603":0.5469556986685727,"7604":-2.490866281442197,"7605":1.1210436776312376,"7606":-2.1374557299700143,"7607":0.12996609063041475,"7608":1.3479861613969237,"7609":-1.2277904449013641,"7610":-1.8518310617674423,"7611":-1.140851565913026,"7612":-0.32853831473729067,"7613":0.6884754910314375,"7614":-1.723454269226195,"7615":-0.4921455012243287,"7616":1.6737308061278056,"7617":-0.5033124535844845,"7618":0.7878033089314647,"7619":0.09297589365486372,"7620":1.619532717975519,"7621":1.6840623938158426,"7622":-0.7591706504247349,"7623":-0.13192077641815983,"7624":1.0171229888626128,"7625":2.4060983206304525,"7626":-0.49144681656253425,"7627":0.4940601776719465,"7628":0.2037166077797828,"7629":1.0214794914451129,"7630":-0.3847744747557988,"7631":-0.8219987519499011,"7632":-0.43164276902731474,"7633":1.352390617929523,"7634":0.4216225195566352,"7635":-0.8248565006941344,"7636":0.7680483531083299,"7637":2.8199930250491674,"7638":0.3571922223187367,"7639":-0.5974496446439,"7640":-1.9736328933771947,"7641":-0.5119206634882805,"7642":-0.5533111908908611,"7643":-0.8454577399270362,"7644":-1.2023989499078236,"7645":-1.2798282000093602,"7646":0.413394057542905,"7647":0.1315036227466029,"7648":-1.5373320472295822,"7649":-1.3032426631802394,"7650":-1.053505334806429,"7651":-0.9659215953975314,"7652":-2.2899265933458306,"7653":-0.5353833371789727,"7654":-1.2650712552137264,"7655":-0.020237269673054944,"7656":-4.801993812412217,"7657":-2.7997078925393284,"7658":-1.596449167397943,"7659":-0.19345126008860486,"7660":-0.9226004862956294,"7661":0.25003875567228434,"7662":-1.266139492618255,"7663":-1.0395367096274841,"7664":-0.7528885017732662,"7665":1.2509388865602638,"7666":6.8143846328937485,"7667":4.138814378257415,"7668":1.081733702981314,"7669":0.5124541558234759,"7670":0.5409211796149073,"7671":-1.6607093809709539,"7672":2.293313743531496,"7673":0.893450653851354,"7674":0.7056664112347434,"7675":2.8200178281779555,"7676":3.1602778146989357,"7677":1.9824475667337818,"7678":0.28930143923463825,"7679":0.07232630355552642,"7680":0.09837869059976674,"7681":0.2748307431394824,"7682":-1.7846669037896072,"7683":1.4613877844618866,"7684":0.4425468432860041,"7685":-1.021889796362438,"7686":-1.2467798192353017,"7687":0.6985221215088655,"7688":2.2667732107475467,"7689":0.3039053338207432,"7690":-0.08519866995227146,"7691":-0.27039634385656275,"7692":0.12034439322349498,"7693":0.51898481687436,"7694":1.3512622130118992,"7695":0.10024515205974303,"7696":0.5448478499209296,"7697":-0.12032674179195861,"7698":0.32930678036839395,"7699":0.060865853378133286,"7700":0.003133807866007434,"7701":-0.4446382260281997,"7702":2.2681487067008277,"7703":1.272679143138449,"7704":2.819318833506185,"7705":2.233881589990777,"7706":0.8479168842398378,"7707":0.3168500326695366,"7708":-0.0632588535364383,"7709":-2.72578489356578,"7710":-0.7509520549122791,"7711":0.4847292957463171,"7712":-0.14322080364149045,"7713":0.5863382864904736,"7714":0.41277983379015465,"7715":1.1402359278827967,"7716":0.6778880709715416,"7717":-0.6782979464695281,"7718":-2.712644839045419,"7719":-2.289524053375319,"7720":-1.7494942610254687,"7721":-0.0009911887376737967,"7722":-0.4993172365597868,"7723":1.1342152382855633,"7724":-0.898541696245621,"7725":-0.2077426371678744,"7726":0.1467570483908331,"7727":1.0114476367032326,"7728":1.2503628419115667,"7729":0.8022628567642164,"7730":-0.7991943083986603,"7731":-0.03068283180675696,"7732":1.2157967385513642,"7733":-0.11173975804214269,"7734":0.0912735317837247,"7735":-0.15086058265547908,"7736":2.1557553554488926,"7737":0.7814731178155069,"7738":1.539317864067527,"7739":0.2821811512668792,"7740":1.812038436758427,"7741":0.27586035567980743,"7742":1.8912021495651519,"7743":-1.216890620593261,"7744":0.015744722083048814,"7745":4.773220562088956,"7746":3.5598997645091246,"7747":1.6544977321716523,"7748":0.9828061075196577,"7749":-2.699180577248539,"7750":0.226133740196296,"7751":1.4158443836025945,"7752":0.47483760295568445,"7753":-1.0820527265080289,"7754":0.3519381216454214,"7755":0.31603857009546193,"7756":-0.5954653728524132,"7757":0.28331328644927334,"7758":-1.26192555243131,"7759":-2.7486769596615876,"7760":-2.6759999678225928,"7761":-1.493984183840937,"7762":1.1192989750332412,"7763":-1.830262084276652,"7764":0.7732664008862119,"7765":-0.5805499619039383,"7766":-1.0643623130733628,"7767":1.1061419286977239,"7768":0.5161240938143999,"7769":1.5044089830936869,"7770":-1.3759810319565642,"7771":-0.4971360847869541,"7772":-0.215101407257649,"7773":-0.6779320533094886,"7774":-0.7784085633051663,"7775":-1.1564474737242327,"7776":-1.9053787118826164,"7777":-1.0678068626256811,"7778":-1.5373493014549708,"7779":0.45201007624754597,"7780":0.5639003853889626,"7781":-0.5081421108529536,"7782":-0.7445643311846516,"7783":0.5072025333136355,"7784":-0.1777534668396582,"7785":1.9032170137384665,"7786":-0.83140461481246,"7787":-0.6368307561070418,"7788":-0.03709523284915025,"7789":-0.06862861461631067,"7790":0.689339869761475,"7791":0.5928677258225203,"7792":1.0685437228105028,"7793":2.1202496775343684,"7794":0.02156842472141868,"7795":-0.27555305674251857,"7796":1.4774092293388816,"7797":0.29527400693226497,"7798":-0.096787485996678,"7799":1.0656131056343148,"7800":0.1724127292084242,"7801":0.11459970786128787,"7802":1.3623941156098456,"7803":0.6998605634909085,"7804":1.139384427008429,"7805":0.2925661004124985,"7806":-1.1801137616172195,"7807":-0.06725842144586246,"7808":-0.15246342152981612,"7809":-0.7225799959307714,"7810":-0.16752342994662944,"7811":0.2878045198584876,"7812":-0.1708105495589058,"7813":0.49066945658375316,"7814":0.03646106056156416,"7815":-0.4609059074413562,"7816":-1.0970862417115514,"7817":1.339097108694156,"7818":-0.40278216837755615,"7819":0.5523777206806529,"7820":-0.31669754147000617,"7821":-0.0030937300246565956,"7822":0.2681305346030329,"7823":0.29763461676823283,"7824":-0.5708574857853506,"7825":0.9884412742883489,"7826":0.24773689260433002,"7827":0.02918872717924389,"7828":-0.6551051976935611,"7829":-1.525255498888672,"7830":-0.739883767224538,"7831":-0.41322245179076983,"7832":-0.7441705942950474,"7833":1.9799173660569989,"7834":0.06992651684512738,"7835":-0.30854092544375633,"7836":-0.34268387308081144,"7837":-2.548821214247713,"7838":5.198771419713106,"7839":7.19154525989175,"7840":6.316557050070327,"7841":4.514529552000643,"7842":1.7190410632434114,"7843":0.39479235939743346,"7844":-0.5132755757182469,"7845":-0.609560944215101,"7846":-0.992921629786831,"7847":-3.60152809627767,"7848":-2.691521573979888,"7849":-2.122007379755862,"7850":-0.7213723234567628,"7851":0.012090707064674362,"7852":0.05170542855838456,"7853":0.3014186044079016,"7854":-0.2506143384636644,"7855":-0.3916684505284221,"7856":0.20583111837533172,"7857":0.6921211726614789,"7858":-0.6994607944540577,"7859":0.4954513177828593,"7860":-0.12145216133017091,"7861":-0.08142584128120975,"7862":0.5432128238537974,"7863":0.3677918320926284,"7864":0.1757997539620648,"7865":-1.2666281369493235,"7866":0.6280518995374812,"7867":0.19409593502730868,"7868":0.10670573680451124,"7869":-0.6838378389697692,"7870":-0.584905758964469,"7871":-0.1584451356964999,"7872":-0.9780378520520403,"7873":-1.4069304063734236,"7874":0.639233891846893,"7875":1.0461816510477513,"7876":-1.3154450127027448,"7877":-0.9138632118358883,"7878":-0.5975970839032481,"7879":-0.17045430859081795,"7880":-0.28121160251072874,"7881":1.5416740689487933,"7882":0.6505331641415425,"7883":0.3049971616618067,"7884":-0.9369467106259891,"7885":-1.9762810129789627,"7886":-0.02804840791663901,"7887":-1.0584216323332751,"7888":-0.7580108686421331,"7889":-0.9141205271772803,"7890":-0.5473894706432139,"7891":0.46886441138769447,"7892":0.15895574544859603,"7893":-0.019731333029602692,"7894":-0.785505489629034,"7895":0.2302179222958585,"7896":-0.8966896771109631,"7897":-0.700633941334131,"7898":-0.3880385699696246,"7899":-0.7745772713991309,"7900":0.4827410181151631,"7901":0.6811053363777908,"7902":-0.3424588397800034,"7903":-0.7367181791421213,"7904":-0.9556099175434294,"7905":-0.6309161898635922,"7906":-0.7129268028721256,"7907":-0.6417971223996873,"7908":-0.6281245134617404,"7909":2.384662647047064,"7910":1.2321613007897536,"7911":0.012257433963993073,"7912":-0.6072158967558492,"7913":-0.7895482013020682,"7914":-0.23193987203808852,"7915":0.001203862632122231,"7916":-0.8421526917449046,"7917":-0.49867151175639896,"7918":-1.0662933574304179,"7919":-0.36849704863363,"7920":-0.24909128217792428,"7921":-0.72814771688851,"7922":-0.803479254204172,"7923":-0.17942519032362408,"7924":0.20959661193828832,"7925":-0.3294941222685227,"7926":-0.24535990739094135,"7927":-2.127271240387753,"7928":-0.633318146491284,"7929":-0.8094925192402251,"7930":-1.1414599396122531,"7931":-1.1546312966212207,"7932":-1.495309645626171,"7933":-0.3011640420743044,"7934":0.05980603322526502,"7935":-2.571482129789463,"7936":-2.325886116882608,"7937":-1.0821830825739913,"7938":-0.16223991887030492,"7939":-0.9913978546281692,"7940":0.355619703874155,"7941":-0.18230208697077313,"7942":-0.13765168437378472,"7943":-0.07701635437606182,"7944":0.14926454481201668,"7945":-1.1853444433386426,"7946":1.0576926509390454,"7947":0.17141139561146884,"7948":-1.1695238550160938,"7949":-0.21758700551537022,"7950":-0.5579222170142519,"7951":-0.17229723971951158,"7952":-0.08669862768462532,"7953":0.30286486513036515,"7954":-0.4534050312748817,"7955":-0.05371916968217559,"7956":1.7986336923757216,"7957":0.003717318430067998,"7958":0.08684477530983088,"7959":0.7489400599815562,"7960":-0.9776404624434941,"7961":0.03260615457728087,"7962":-1.1087509598963243,"7963":-0.19992034314357338,"7964":0.20649361380014591,"7965":1.214907621112373,"7966":0.0011280754985491122,"7967":-0.5709727413056234,"7968":0.37661511735579095,"7969":-2.289176465464961,"7970":1.3747534349747674,"7971":0.06467698163133921,"7972":2.6992462887250395,"7973":0.4733884393637976,"7974":-0.6006354780943338,"7975":-1.48109212462479,"7976":-0.09942109513881782,"7977":-0.640321453935679,"7978":-0.9333644311706736,"7979":-0.8289995533432315,"7980":-2.4511755069447285,"7981":0.9040925243364502,"7982":1.3953102365023926,"7983":1.8163799168486294,"7984":0.14482322015000862,"7985":-0.012313572375432255,"7986":-2.2510927560414826,"7987":-1.0933297553957226,"7988":-1.2013050254813156,"7989":-1.1636577046322305,"7990":0.9914282513253965,"7991":0.36233884112531484,"7992":0.14663714802210936,"7993":-0.48720995974765186,"7994":6.985927259481749,"7995":6.951456328630863,"7996":5.165916198384032,"7997":3.27969622399412,"7998":0.9246573448321544,"7999":-0.7619338216962694,"8000":-0.4927596178584271,"8001":-1.2378132929260837,"8002":1.3740881394613123,"8003":-1.2110844461110026,"8004":-3.048455126781696,"8005":0.3401842495015892,"8006":1.2362885572713098,"8007":1.328566458695041,"8008":-0.7558805923350875,"8009":1.6384599062837353,"8010":0.4925167892132342,"8011":0.2160294669523145,"8012":-0.34413285908027746,"8013":0.4540079969114689,"8014":-0.24055757430966485,"8015":-1.6480668305672748,"8016":-0.42591897339994966,"8017":-1.1519666580379948,"8018":-0.3118427584366857,"8019":0.8082672623554725,"8020":-1.5038025301803681,"8021":0.047047236261780506,"8022":-0.2680653428489107,"8023":0.20833848971757934,"8024":-1.1141191919345437,"8025":-0.25906271467186265,"8026":-1.0763965124549475,"8027":0.22076951796966154,"8028":0.3377314332977206,"8029":1.0686745587112751,"8030":0.11752335531821324,"8031":0.6105358819605045,"8032":-0.703472875490722,"8033":-0.1572472690752159,"8034":-2.0584187695959413,"8035":0.8155695248296433,"8036":-0.3659857660379707,"8037":-0.412761774860779,"8038":-0.008405149335731388,"8039":-0.5355337678212768,"8040":-0.5599090448764177,"8041":0.14515543554964086,"8042":0.2687218264681737,"8043":-0.2922871053951497,"8044":0.43632869136765595,"8045":0.15872907343405263,"8046":0.08698047155630519,"8047":-0.20729846000377902,"8048":0.0055698567673709955,"8049":0.03821186731111366,"8050":-0.1864180949344811,"8051":-0.0007080660289879573,"8052":0.0705997454948496,"8053":-0.6187172225639074,"8054":-0.2902413821138404,"8055":-0.25449630059395234,"8056":-0.3224279278835,"8057":0.23586957981435824,"8058":0.1117466931918491,"8059":0.23333204143750977,"8060":-0.6731810042712596,"8061":-0.5201427700898836,"8062":0.7611913756354238,"8063":-0.136483192623986,"8064":0.5255128511305978,"8065":0.31866429194286944,"8066":-4.031655644965429,"8067":-1.7279264267354306,"8068":-0.5798556581574721,"8069":0.005483182413159253,"8070":-1.0587666846214054,"8071":0.04884805885248063,"8072":0.06497180602734108,"8073":-0.46166123545886756,"8074":-0.19352001522448312,"8075":-15.377811956510897,"8076":-7.717021139085135,"8077":1.3920432445673605,"8078":0.7284935176521774,"8079":0.03568952913597131,"8080":0.02376318391484919,"8081":0.5931123870396698,"8082":0.1853850829924736,"8083":-0.6530490510249579,"8084":-3.0476666580704936,"8085":-2.4261247679826665,"8086":-1.1961514479595707,"8087":-0.8191720837519942,"8088":0.7866918764351883,"8089":-0.7017008535117832,"8090":0.5448226766568858,"8091":-0.6329777711473298,"8092":0.2566488435197195,"8093":0.1888107168659034,"8094":-0.7468073790188197,"8095":-0.2105452527810796,"8096":0.17149679388488495,"8097":0.587199434619635,"8098":-0.936232452393511,"8099":-0.9195794280135638,"8100":0.6864883096264836,"8101":-0.6009005378560303,"8102":-0.07422064574139245,"8103":-0.06706001207199498,"8104":0.41658866133921213,"8105":0.3965960302417126,"8106":0.36066114934574117,"8107":0.23096096838580826,"8108":0.5797851283423716,"8109":0.40229030768021923,"8110":0.18910647438099432,"8111":-1.0172384994633084,"8112":0.6755634504541207,"8113":-0.47502031875242906,"8114":0.12954327786479009,"8115":0.5539671405056157,"8116":-1.1521613738162297,"8117":0.09947611873648878,"8118":0.5770302290077409,"8119":0.5886813146317258,"8120":0.06623730943753495,"8121":-0.7160665941221573,"8122":-0.4367684374191633,"8123":0.7162727272729003,"8124":1.069593387862135,"8125":-0.6414343662153805,"8126":0.0272730961052526,"8127":-0.9677692495123797,"8128":-0.5195694575612342,"8129":0.21755826735434555,"8130":-2.882910757047361,"8131":0.9569094409512102,"8132":-1.4355098250847527,"8133":-2.0227987671864565,"8134":0.8287333932644046,"8135":-0.3656982017389452,"8136":0.22745398589406773,"8137":0.41476536354765486,"8138":-0.9925260641671925,"8139":-0.8093324812164429,"8140":0.18987962648105666,"8141":0.25223693041055184,"8142":-0.6623471056097014,"8143":-0.44925963451055134,"8144":-0.16719644201727102,"8145":-1.0739079447430278,"8146":-0.4157962142780673,"8147":0.21139808281316463,"8148":-0.9004716530408906,"8149":-0.46050298059504263,"8150":1.1599017342185647,"8151":0.3058687413588006,"8152":0.34790425495665495,"8153":-1.4979795394594138,"8154":0.5107777834292341,"8155":-0.5682246905618941,"8156":-1.4337809316087273,"8157":0.5836132132807573,"8158":-1.407306177261717,"8159":-0.41864677641612774,"8160":2.3799969770781955,"8161":-1.0345007180726733,"8162":-1.261451748753327,"8163":0.35446653951537466,"8164":1.6012943917857612,"8165":-2.33337238808139,"8166":-0.879747790600674,"8167":-3.238590800564303,"8168":1.6535028000536207,"8169":0.14547451614429785,"8170":0.05390361546788183,"8171":-0.7730503745631228,"8172":0.4866117092401314,"8173":0.7946067925415332,"8174":0.3688148692687523,"8175":0.05911118203169624,"8176":-0.9335644852647386,"8177":2.208101531189171,"8178":-0.3958973880533407,"8179":-1.4589933163691287,"8180":-0.5020616859817603,"8181":0.18105256991618268,"8182":2.4664121762769025,"8183":-1.6518165410244947,"8184":-0.10307531396306212,"8185":-0.4811867370503502,"8186":1.7629914168268457,"8187":0.15798977206911965,"8188":-2.026981026914553,"8189":-1.2832038347618322,"8190":0.46357178063882576,"8191":0.6323104053717542,"8192":1.3067496046724172,"8193":-0.48583032678933064,"8194":0.00854099112340921,"8195":0.7013483936739494,"8196":-0.2268534957106714,"8197":0.6289722744418748,"8198":-1.018911623734673,"8199":-0.34731047783814517}},"b1":{"n":100,"d":1,"w":{"0":2.553541382498117,"1":-8.564942169087733,"2":0.23143772041411195,"3":-2.30449798056596,"4":-3.4065890065521507,"5":-1.6241440548879267,"6":-0.7458933379894254,"7":0.3643741458689816,"8":1.7415505878933868,"9":0.39120886295223634,"10":-3.029168925421386,"11":5.720250552337142,"12":-7.142785932537152,"13":4.554418798428411,"14":1.841398297077297,"15":-4.22032834304144,"16":-1.3210854095328344,"17":-3.338066333321929,"18":-0.7205307598549723,"19":3.4804253572662547,"20":-0.6938845293524959,"21":7.890583650732732,"22":0.36594885959172996,"23":-1.2606545811121992,"24":0.6009519975002987,"25":0.6727579844998945,"26":-3.1699096906022626,"27":-0.1066184959590939,"28":-1.6990036481733002,"29":0.471345554303731,"30":3.7860125432019567,"31":12.555217063358057,"32":-2.1071632789052455,"33":0.05833114252371946,"34":0.7788058045739306,"35":-0.987833843590112,"36":-3.2289088904525847,"37":-1.658011711136018,"38":1.2967105683260267,"39":1.0451619860981565,"40":-1.7497481554368908,"41":-2.0339982369841905,"42":6.306284509588156,"43":-1.275004408401744,"44":-2.8656257910684113,"45":-2.1203036192740994,"46":5.193005874322906,"47":1.5206167414699123,"48":6.928706176110698,"49":-3.2179033469582943,"50":1.7808970570274933,"51":3.7614330261397315,"52":6.833029132688101,"53":2.311133455337789,"54":-3.158883151910791,"55":3.134563605426875,"56":1.125671496111377,"57":-0.6702567928114428,"58":-0.8306798144217473,"59":0.31393145253274074,"60":-2.9106362886166464,"61":2.651559144441661,"62":-2.813666149077089,"63":-4.560336884276173,"64":-1.795336977695252,"65":4.259953884576751,"66":1.4615966476714868,"67":-2.315933128247522,"68":-14.34010561199553,"69":-2.1338404292054896,"70":0.610933072113984,"71":-3.099740026760165,"72":-0.42607485572273934,"73":3.3182690494257563,"74":-0.5573153083400677,"75":6.731524607170839,"76":0.03613412054760561,"77":-7.413879140709657,"78":-2.9716625137314034,"79":-2.6488295354902807,"80":-2.4355796208385647,"81":2.702156160958244,"82":-3.263081077277374,"83":-0.9536245965894429,"84":-4.800060375444856,"85":-0.4977657749339069,"86":-0.9372741712996012,"87":-9.705678535852691,"88":0.6179728036976725,"89":-3.9203559950471423,"90":4.728334101068679,"91":1.1340370238304085,"92":4.7934230943332325,"93":-4.634411744651314,"94":-0.9687023890196949,"95":1.9631039768677143,"96":-0.7187637633414907,"97":0.9275417626891305,"98":14.46154110906846,"99":-1.4457093208736702}},"W2":{"n":4,"d":100,"w":{"0":0.5148452330481491,"1":0.27298216289887606,"2":0.9539118488549115,"3":-0.5956736333251963,"4":-0.22387506613627062,"5":-0.2024155705402673,"6":1.0218682217765134,"7":0.13974735406384026,"8":0.10501111454612179,"9":0.21733722169651784,"10":0.3560474971713058,"11":1.0386569553500598,"12":0.2656202694087222,"13":0.685983983400136,"14":0.41891595925012537,"15":-0.22606716359932943,"16":-0.4935132441896415,"17":-0.0848467168652411,"18":1.014121479613421,"19":0.7671399921387441,"20":-0.9045482481064916,"21":0.17462322684366652,"22":-0.698401515419325,"23":1.0788605455683868,"24":-2.81542871791528,"25":-0.25977630533911883,"26":-0.35717970043605446,"27":0.17722025763931307,"28":0.405917080533749,"29":0.5242421009067189,"30":-0.22680827482096888,"31":1.2739735090390616,"32":-0.15676709669741187,"33":-0.07304826370286441,"34":-1.2055619913514461,"35":0.3497876605956868,"36":0.6253911989257831,"37":0.4794109069429893,"38":0.718681009772947,"39":-0.4594228811933202,"40":-0.485078314045521,"41":1.7810614370361608,"42":0.6932202241987273,"43":-0.449929958199027,"44":1.7415697540312407,"45":-8.150293958910561,"46":0.5081709176329019,"47":-1.5581042324318088,"48":-0.455243962032497,"49":-0.9480112494535762,"50":0.2033804560643589,"51":0.7071991588177295,"52":0.44606153558131034,"53":-0.18334546232268906,"54":0.5668874112678719,"55":0.11801198591425203,"56":-0.18264727052586455,"57":-2.5338209948099735,"58":-0.7797819836155218,"59":0.19669238580578025,"60":-1.4241419123778947,"61":0.5038895235039997,"62":-0.1575526247608733,"63":-0.28710292748334243,"64":-0.34338224828618324,"65":-0.1455490133575337,"66":-1.2514658022171283,"67":-0.2280271856762756,"68":-0.7545157987684672,"69":-0.557254857755195,"70":-0.6392307985744295,"71":-0.7954020678214223,"72":-0.8087795002406828,"73":2.6976880729525243,"74":1.75841098621067,"75":-0.5880183107992842,"76":-1.2030465721044878,"77":-0.7736863127314801,"78":-0.17916115617638434,"79":-0.2102642864996813,"80":-0.3476008627740349,"81":-0.27558296745561794,"82":-0.465794710367774,"83":-1.259699651768485,"84":-0.35587416560700447,"85":-2.8093688044677707,"86":0.012382762074255751,"87":-0.15326673912911146,"88":3.0500142327827096,"89":-0.5058356323529415,"90":0.24364455461143134,"91":1.1835089810004364,"92":-0.6235418152652838,"93":-0.5121012401132822,"94":-0.7574167945898194,"95":0.15779074371230778,"96":-0.42051547654153276,"97":-0.9297363663316068,"98":0.5424456206831428,"99":-0.03835316671386283,"100":0.6128071602058711,"101":-0.38100522117621655,"102":-0.07579943089561436,"103":-0.7028721515333495,"104":-0.36154931418013836,"105":-1.40172175737568,"106":-0.5808169395086707,"107":-0.9014822961513251,"108":-0.2617864562418716,"109":-0.37418432854800776,"110":0.04526489879298451,"111":0.2611407037673485,"112":-0.3620737682968101,"113":-0.48542286745565716,"114":0.36889643661506133,"115":-0.562710112842311,"116":-0.2877757011791291,"117":-0.7042016362476319,"118":0.47297656955594614,"119":0.963798086747886,"120":-0.2827812378424603,"121":0.607162370118451,"122":-0.8650306659713183,"123":0.4310164727968521,"124":-1.5737278209635361,"125":-0.28407449818605457,"126":-0.48487923971644853,"127":0.08098108053640757,"128":0.2547213500388921,"129":0.1536651236848753,"130":-0.7564723514458889,"131":0.30506897823793255,"132":-0.4179133326271279,"133":0.6434396639818519,"134":-1.140401457229163,"135":-0.8670393300545636,"136":-1.0242481831943782,"137":-0.6689568975722853,"138":-1.2060232505678203,"139":0.41290409558786445,"140":-1.7490698526255806,"141":-1.6965118840660203,"142":0.2799467148925003,"143":-0.6075421005709442,"144":-0.5433010835545425,"145":-0.10867988845720467,"146":0.2939766564284261,"147":1.7590436040444322,"148":-0.8416944865958685,"149":-0.839942996722065,"150":5.823728682686493,"151":0.5302734880242371,"152":0.6575774376591346,"153":-0.13976284832250369,"154":0.18180506955683534,"155":-0.04786394496621702,"156":0.6894156385171222,"157":3.8963691934587406,"158":-0.13773365736897383,"159":-0.7066520220367418,"160":0.13412392654191863,"161":-0.1926214394998735,"162":-0.6131719477309727,"163":0.09656693791021272,"164":0.042390614583298916,"165":1.1583936981500094,"166":0.2754656443219688,"167":-0.4188846209995584,"168":-2.849699735516768,"169":0.5523678550283346,"170":-0.8238128687466088,"171":-0.32130747897990747,"172":-0.15365148145635413,"173":0.702738800704195,"174":1.0239272569409767,"175":0.24138724556587335,"176":-0.4760552820680556,"177":-0.6270325173672896,"178":-0.7066065048315859,"179":-0.008140337819695002,"180":0.83851376651971,"181":0.045297537918941186,"182":-0.6922392613641656,"183":-1.1881337277928576,"184":-0.27928120297774045,"185":-1.422472554375672,"186":-0.5625986231192388,"187":0.5695853728488471,"188":0.33941527145654304,"189":-0.17308830460423105,"190":0.2750678267692383,"191":-2.61411595279797,"192":0.3887585534326316,"193":0.48177923516898047,"194":0.09480594698436506,"195":-0.1067466281203659,"196":-2.609479747856737,"197":0.05502605986473161,"198":0.1958036600323771,"199":-0.41315511181100606,"200":-0.43788524894254,"201":-0.6427360650091195,"202":-1.663728618760337,"203":0.01060672939385187,"204":-0.23035168006131493,"205":-1.9504865275329755,"206":0.29070995888083323,"207":-0.8215188241993203,"208":0.1645520524924722,"209":-0.5762715058237234,"210":0.6700244936820644,"211":0.5338260833940099,"212":2.0716974958703407,"213":-1.025067539864958,"214":0.4678947642708659,"215":-0.32397938707763424,"216":0.24684930925099458,"217":-0.0547406384432739,"218":0.66213632450682,"219":0.745036221465393,"220":1.5661049740255275,"221":0.4634769003089647,"222":0.004802125070765593,"223":0.7393923081166768,"224":-0.6485996194689767,"225":-0.5015779341792796,"226":-0.4246910869973771,"227":0.7830668062030562,"228":0.5279700870074152,"229":-0.4368848390500427,"230":0.22741786364915223,"231":1.9013923574821419,"232":-0.2538241259895997,"233":0.4270584992926102,"234":-0.5049137606331706,"235":0.5099523865840898,"236":0.05894120086335725,"237":-0.3754113503536359,"238":-1.194864768102914,"239":1.2348453411418248,"240":0.5004649543849529,"241":-2.086037810707564,"242":0.5272432465815478,"243":-0.11644489106447856,"244":-0.5193378937527582,"245":-0.08152893384802667,"246":0.40113322841324006,"247":1.6237993367986212,"248":-1.9900289272763725,"249":-0.1303943953043646,"250":0.22416399445691718,"251":0.32778698276380064,"252":-0.12085466472031901,"253":-0.6290520653199831,"254":1.2142119268374052,"255":0.5126633818316223,"256":0.4222431821941121,"257":1.4892641842734928,"258":-0.5464260210477959,"259":-1.4152218721867758,"260":-0.19442872064916855,"261":0.5099857622989891,"262":-0.2468077437636099,"263":-0.5056271512313596,"264":-0.16227899941062252,"265":-0.09380911475397284,"266":6.992963339022388,"267":-0.4437673971059121,"268":0.0804441812052665,"269":-2.8414378252307757,"270":-1.1859221443609966,"271":-0.401155395735818,"272":3.707419645272355,"273":6.257025452423087,"274":0.5245578419952479,"275":0.3968249365326001,"276":3.121768084057165,"277":-0.3341160468017302,"278":-0.33081412544107547,"279":-0.4364468070239726,"280":-0.12127423322755107,"281":0.5629767723872725,"282":-0.24055047877858507,"283":-0.4161131713117034,"284":-0.26659542064117553,"285":-2.027507022388155,"286":0.2804679278876972,"287":-1.6648636926526845,"288":1.3374478817441149,"289":-0.3394646831188759,"290":0.5621911910465999,"291":3.931701473930245,"292":0.4067423838797384,"293":-0.36567848721783147,"294":0.3405890726821199,"295":-0.2920893361226902,"296":-1.7510702497503452,"297":-0.5921409071117494,"298":1.0511507592403584,"299":-0.5883599869703783,"300":1.0185092435743963,"301":-0.5287714779322411,"302":0.836125363294264,"303":-0.5213562701490898,"304":-0.651049372338346,"305":-0.9011999290058096,"306":0.19788504180826794,"307":0.1565123284500078,"308":-0.0760288721108461,"309":-0.5732678323889266,"310":0.13084355540283465,"311":1.23215261701279,"312":0.6748657550371784,"313":-0.23190000923276022,"314":-0.28415888477096796,"315":-0.30634557809143537,"316":-0.4487127263778265,"317":-0.8800845239781037,"318":-0.18464563154649416,"319":0.05064507113541259,"320":-1.0053639232616995,"321":0.16104028982001029,"322":0.934793633783191,"323":-0.22947907980651183,"324":-1.358236961405298,"325":0.05485564378352138,"326":-0.13662432276197406,"327":0.6465606827965353,"328":0.1301035085660615,"329":-0.3004589726192002,"330":0.9097302129731899,"331":0.5719111535725028,"332":-0.4144035796249674,"333":0.08087780750386732,"334":-0.8258623709531215,"335":-0.5680981589316108,"336":0.6016159279969573,"337":-0.10869408059728645,"338":-0.49310928117202246,"339":-0.10140770280938403,"340":0.2698158483341989,"341":1.8608182180977633,"342":0.17142870645045627,"343":0.3344869438694069,"344":2.1802562002533286,"345":0.0018510039130297468,"346":0.5707964072438836,"347":-2.917999058761895,"348":-0.16974952951092015,"349":-7.102857103959144,"350":0.49158714753956917,"351":0.6805457891380176,"352":2.146657156345762,"353":0.25235861980567836,"354":1.0267397435630092,"355":0.3329765370606215,"356":0.5041041626221412,"357":2.0142770885649024,"358":0.2654646043233817,"359":-2.9699174860784816,"360":-0.3336224357519039,"361":0.4687676666040382,"362":0.348908283932833,"363":-0.48504480523760835,"364":0.7106706884044045,"365":0.22851966659865716,"366":-1.525183703538421,"367":0.17607065395541027,"368":-0.39027898547685286,"369":-1.5534336291952768,"370":-1.1655253891860886,"371":2.3991014817355047,"372":-1.7225040630980388,"373":1.5558855906311655,"374":1.0176176377380493,"375":0.31239051445197347,"376":2.637657425942706,"377":-0.5002865823986444,"378":-0.3135914529172503,"379":-0.21712875331137932,"380":-0.9573575141643775,"381":0.5087657871502779,"382":-0.003769721384821347,"383":-0.4525143079683986,"384":-0.14256428434286517,"385":-2.6963178556619924,"386":-0.6208372305967755,"387":0.31323841987994017,"388":0.8816453161893858,"389":-0.43115636142622304,"390":-0.12987338345459631,"391":-1.8500917461956723,"392":0.3453472653864494,"393":-0.1639952891097259,"394":0.447502224120028,"395":-1.7868146412515298,"396":-0.967493160272032,"397":-0.012437456570038133,"398":0.27764292967708853,"399":-0.49858850414555395}},"b2":{"n":4,"d":1,"w":{"0":0.3755161186686643,"1":0.10212534074384134,"2":-0.7729651005635783,"3":1.1577374885542586}}}}
/* harmony export (immutable) */ __webpack_exports__["a"] = data;


/***/ }),
/* 33 */
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
/* 34 */
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
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__State__ = __webpack_require__(34);
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