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
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AgentObservation__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__generateInitialState__ = __webpack_require__(30);



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
    pointsForCompletion: 100
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18).Buffer))

/***/ }),
/* 4 */
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
	fixUrls = __webpack_require__(23);

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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rl__ = __webpack_require__(26);

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
        return this._agent.act(state);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RlDqn;


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
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
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

        this.newGame = this.newGame.bind(this);
        this.takeAction = this.takeAction.bind(this);
        this.tick = this.tick.bind(this);
        this.clearStats = this.clearStats.bind(this);
    }

    newGame(agent, enableRendering) {
        this._agent = agent;
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
            this.newGame(this._agent, this._enableRendering);
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

    _updateObservations(){
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__ = __webpack_require__(5);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__neural_network_saves_view_port_5_5_0_1_games_1000__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_RlDqn__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_viewportConversions__ = __webpack_require__(6);





const actions = ['w', 'a', 's', 'd'];

// const numberOfStates = environmentConfig.viewPortSize[0] * environmentConfig.viewPortSize[1];
const numberOfStates = 5 * 5 + 1;

let rlDqn = new __WEBPACK_IMPORTED_MODULE_3__helper_RlDqn__["a" /* default */](false, numberOfStates, __WEBPACK_IMPORTED_MODULE_2__neural_network_saves_view_port_5_5_0_1_games_1000__["a" /* data */]);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css__ = __webpack_require__(24);
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(17)
var ieee754 = __webpack_require__(22)
var isArray = __webpack_require__(19)

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25)))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "#info {\n    margin-right: 2em;\n    /*float: left*/\n}\n\n.InfectionGameHtmlTableRender {\n    /*float: left;*/\n    overflow: auto;\n}\n\n.InfectionGameHtmlTableRender table {\n    padding-right: 2em;\n    border-spacing: 0;\n}\n\n.InfectionGameHtmlTableRender > div {\n    float: left;\n    border-spacing: 0;\n    margin-right: 2em;\n}\n\n.InfectionGameHtmlTableRender table.renderer-table-canvas-agent {\n    padding: 10px;\n    background-color: black;\n}\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-god td {\n    height: 5px;\n    width: 5px;\n}\n.InfectionGameHtmlTableRender .renderer-table-canvas-agent td {\n    height: 20px;\n    width: 20px;\n}\n", ""]);

// exports


/***/ }),
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
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
/* 25 */
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
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var R = {}; // the Recurrent library

(function(global) {
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
    var gaussRandom = function() {
        if(return_v) {
            return_v = false;
            return v_val;
        }
        var u = 2*Math.random()-1;
        var v = 2*Math.random()-1;
        var r = u*u + v*v;
        if(r == 0 || r > 1) return gaussRandom();
        var c = Math.sqrt(-2*Math.log(r)/r);
        v_val = v*c; // cache this
        return_v = true;
        return u*c;
    }
    var randf = function(a, b) { return Math.random()*(b-a)+a; }
    var randi = function(a, b) { return Math.floor(Math.random()*(b-a)+a); }
    var randn = function(mu, std){ return mu+gaussRandom()*std; }

    // helper function returns array of zeros of length n
    // and uses typed arrays if available
    var zeros = function(n) {
        if(typeof(n)==='undefined' || isNaN(n)) { return []; }
        if(typeof ArrayBuffer === 'undefined') {
            // lacking browser support
            var arr = new Array(n);
            for(var i=0;i<n;i++) { arr[i] = 0; }
            return arr;
        } else {
            return new Float64Array(n);
        }
    }

    // Mat holds a matrix
    var Mat = function(n,d) {
        // n is number of rows d is number of columns
        this.n = n;
        this.d = d;
        this.w = zeros(n * d);
        this.dw = zeros(n * d);
    }
    Mat.prototype = {
        get: function(row, col) {
            // slow but careful accessor function
            // we want row-major order
            var ix = (this.d * row) + col;
            assert(ix >= 0 && ix < this.w.length);
            return this.w[ix];
        },
        set: function(row, col, v) {
            // slow but careful accessor function
            var ix = (this.d * row) + col;
            assert(ix >= 0 && ix < this.w.length);
            this.w[ix] = v;
        },
        setFrom: function(arr) {
            for(var i=0,n=arr.length;i<n;i++) {
                this.w[i] = arr[i];
            }
        },
        setColumn: function(m, i) {
            for(var q=0,n=m.w.length;q<n;q++) {
                this.w[(this.d * q) + i] = m.w[q];
            }
        },
        toJSON: function() {
            var json = {};
            json['n'] = this.n;
            json['d'] = this.d;
            json['w'] = this.w;
            return json;
        },
        fromJSON: function(json) {
            this.n = json.n;
            this.d = json.d;
            this.w = zeros(this.n * this.d);
            this.dw = zeros(this.n * this.d);
            for(var i=0,n=this.n * this.d;i<n;i++) {
                this.w[i] = json.w[i]; // copy over weights
            }
        }
    }

    var copyMat = function(b) {
        var a = new Mat(b.n, b.d);
        a.setFrom(b.w);
        return a;
    }

    var copyNet = function(net) {
        // nets are (k,v) pairs with k = string key, v = Mat()
        var new_net = {};
        for(var p in net) {
            if(net.hasOwnProperty(p)){
                new_net[p] = copyMat(net[p]);
            }
        }
        return new_net;
    }

    var updateMat = function(m, alpha) {
        // updates in place
        for(var i=0,n=m.n*m.d;i<n;i++) {
            if(m.dw[i] !== 0) {
                m.w[i] += - alpha * m.dw[i];
                m.dw[i] = 0;
            }
        }
    }

    var updateNet = function(net, alpha) {
        for(var p in net) {
            if(net.hasOwnProperty(p)){
                updateMat(net[p], alpha);
            }
        }
    }

    var netToJSON = function(net) {
        var j = {};
        for(var p in net) {
            if(net.hasOwnProperty(p)){
                j[p] = net[p].toJSON();
            }
        }
        return j;
    }
    var netFromJSON = function(j) {
        var net = {};
        for(var p in j) {
            if(j.hasOwnProperty(p)){
                net[p] = new Mat(1,1); // not proud of this
                net[p].fromJSON(j[p]);
            }
        }
        return net;
    }
    var netZeroGrads = function(net) {
        for(var p in net) {
            if(net.hasOwnProperty(p)){
                var mat = net[p];
                gradFillConst(mat, 0);
            }
        }
    }
    var netFlattenGrads = function(net) {
        var n = 0;
        for(var p in net) { if(net.hasOwnProperty(p)){ var mat = net[p]; n += mat.dw.length; } }
        var g = new Mat(n, 1);
        var ix = 0;
        for(var p in net) {
            if(net.hasOwnProperty(p)){
                var mat = net[p];
                for(var i=0,m=mat.dw.length;i<m;i++) {
                    g.w[ix] = mat.dw[i];
                    ix++;
                }
            }
        }
        return g;
    }

    // return Mat but filled with random numbers from gaussian
    var RandMat = function(n,d,mu,std) {
        var m = new Mat(n, d);
        fillRandn(m,mu,std);
        //fillRand(m,-std,std); // kind of :P
        return m;
    }

    // Mat utils
    // fill matrix with random gaussian numbers
    var fillRandn = function(m, mu, std) { for(var i=0,n=m.w.length;i<n;i++) { m.w[i] = randn(mu, std); } }
    var fillRand = function(m, lo, hi) { for(var i=0,n=m.w.length;i<n;i++) { m.w[i] = randf(lo, hi); } }
    var gradFillConst = function(m, c) { for(var i=0,n=m.dw.length;i<n;i++) { m.dw[i] = c } }

    // Transformer definitions
    var Graph = function(needs_backprop) {
        if(typeof needs_backprop === 'undefined') { needs_backprop = true; }
        this.needs_backprop = needs_backprop;

        // this will store a list of functions that perform backprop,
        // in their forward pass order. So in backprop we will go
        // backwards and evoke each one
        this.backprop = [];
    }
    Graph.prototype = {
        backward: function() {
            for(var i=this.backprop.length-1;i>=0;i--) {
                this.backprop[i](); // tick!
            }
        },
        rowPluck: function(m, ix) {
            // pluck a row of m with index ix and return it as col vector
            assert(ix >= 0 && ix < m.n);
            var d = m.d;
            var out = new Mat(d, 1);
            for(var i=0,n=d;i<n;i++){ out.w[i] = m.w[d * ix + i]; } // copy over the data

            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0,n=d;i<n;i++){ m.dw[d * ix + i] += out.dw[i]; }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        tanh: function(m) {
            // tanh nonlinearity
            var out = new Mat(m.n, m.d);
            var n = m.w.length;
            for(var i=0;i<n;i++) {
                out.w[i] = Math.tanh(m.w[i]);
            }

            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0;i<n;i++) {
                        // grad for z = tanh(x) is (1 - z^2)
                        var mwi = out.w[i];
                        m.dw[i] += (1.0 - mwi * mwi) * out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        sigmoid: function(m) {
            // sigmoid nonlinearity
            var out = new Mat(m.n, m.d);
            var n = m.w.length;
            for(var i=0;i<n;i++) {
                out.w[i] = sig(m.w[i]);
            }

            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0;i<n;i++) {
                        // grad for z = tanh(x) is (1 - z^2)
                        var mwi = out.w[i];
                        m.dw[i] += mwi * (1.0 - mwi) * out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        relu: function(m) {
            var out = new Mat(m.n, m.d);
            var n = m.w.length;
            for(var i=0;i<n;i++) {
                out.w[i] = Math.max(0, m.w[i]); // relu
            }
            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0;i<n;i++) {
                        m.dw[i] += m.w[i] > 0 ? out.dw[i] : 0.0;
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        mul: function(m1, m2) {
            // multiply matrices m1 * m2
            assert(m1.d === m2.n, 'matmul dimensions misaligned');

            var n = m1.n;
            var d = m2.d;
            var out = new Mat(n,d);
            for(var i=0;i<m1.n;i++) { // loop over rows of m1
                for(var j=0;j<m2.d;j++) { // loop over cols of m2
                    var dot = 0.0;
                    for(var k=0;k<m1.d;k++) { // dot product loop
                        dot += m1.w[m1.d*i+k] * m2.w[m2.d*k+j];
                    }
                    out.w[d*i+j] = dot;
                }
            }

            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0;i<m1.n;i++) { // loop over rows of m1
                        for(var j=0;j<m2.d;j++) { // loop over cols of m2
                            for(var k=0;k<m1.d;k++) { // dot product loop
                                var b = out.dw[d*i+j];
                                m1.dw[m1.d*i+k] += m2.w[m2.d*k+j] * b;
                                m2.dw[m2.d*k+j] += m1.w[m1.d*i+k] * b;
                            }
                        }
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        add: function(m1, m2) {
            assert(m1.w.length === m2.w.length);

            var out = new Mat(m1.n, m1.d);
            for(var i=0,n=m1.w.length;i<n;i++) {
                out.w[i] = m1.w[i] + m2.w[i];
            }
            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0,n=m1.w.length;i<n;i++) {
                        m1.dw[i] += out.dw[i];
                        m2.dw[i] += out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        dot: function(m1, m2) {
            // m1 m2 are both column vectors
            assert(m1.w.length === m2.w.length);
            var out = new Mat(1,1);
            var dot = 0.0;
            for(var i=0,n=m1.w.length;i<n;i++) {
                dot += m1.w[i] * m2.w[i];
            }
            out.w[0] = dot;
            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0,n=m1.w.length;i<n;i++) {
                        m1.dw[i] += m2.w[i] * out.dw[0];
                        m2.dw[i] += m1.w[i] * out.dw[0];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        eltmul: function(m1, m2) {
            assert(m1.w.length === m2.w.length);

            var out = new Mat(m1.n, m1.d);
            for(var i=0,n=m1.w.length;i<n;i++) {
                out.w[i] = m1.w[i] * m2.w[i];
            }
            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0,n=m1.w.length;i<n;i++) {
                        m1.dw[i] += m2.w[i] * out.dw[i];
                        m2.dw[i] += m1.w[i] * out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
    }

    var softmax = function(m) {
        var out = new Mat(m.n, m.d); // probability volume
        var maxval = -999999;
        for(var i=0,n=m.w.length;i<n;i++) { if(m.w[i] > maxval) maxval = m.w[i]; }

        var s = 0.0;
        for(var i=0,n=m.w.length;i<n;i++) {
            out.w[i] = Math.exp(m.w[i] - maxval);
            s += out.w[i];
        }
        for(var i=0,n=m.w.length;i<n;i++) { out.w[i] /= s; }

        // no backward pass here needed
        // since we will use the computed probabilities outside
        // to set gradients directly on m
        return out;
    }

    var Solver = function() {
        this.decay_rate = 0.999;
        this.smooth_eps = 1e-8;
        this.step_cache = {};
    }
    Solver.prototype = {
        step: function(model, step_size, regc, clipval) {
            // perform parameter update
            var solver_stats = {};
            var num_clipped = 0;
            var num_tot = 0;
            for(var k in model) {
                if(model.hasOwnProperty(k)) {
                    var m = model[k]; // mat ref
                    if(!(k in this.step_cache)) { this.step_cache[k] = new Mat(m.n, m.d); }
                    var s = this.step_cache[k];
                    for(var i=0,n=m.w.length;i<n;i++) {

                        // rmsprop adaptive learning rate
                        var mdwi = m.dw[i];
                        s.w[i] = s.w[i] * this.decay_rate + (1.0 - this.decay_rate) * mdwi * mdwi;

                        // gradient clip
                        if(mdwi > clipval) {
                            mdwi = clipval;
                            num_clipped++;
                        }
                        if(mdwi < -clipval) {
                            mdwi = -clipval;
                            num_clipped++;
                        }
                        num_tot++;

                        // update (and regularize)
                        m.w[i] += - step_size * mdwi / Math.sqrt(s.w[i] + this.smooth_eps) - regc * m.w[i];
                        m.dw[i] = 0; // reset gradients for next iteration
                    }
                }
            }
            solver_stats['ratio_clipped'] = num_clipped*1.0/num_tot;
            return solver_stats;
        }
    }

    var initLSTM = function(input_size, hidden_sizes, output_size) {
        // hidden size should be a list

        var model = {};
        for(var d=0;d<hidden_sizes.length;d++) { // loop over depths
            var prev_size = d === 0 ? input_size : hidden_sizes[d - 1];
            var hidden_size = hidden_sizes[d];

            // gates parameters
            model['Wix'+d] = new RandMat(hidden_size, prev_size , 0, 0.08);
            model['Wih'+d] = new RandMat(hidden_size, hidden_size , 0, 0.08);
            model['bi'+d] = new Mat(hidden_size, 1);
            model['Wfx'+d] = new RandMat(hidden_size, prev_size , 0, 0.08);
            model['Wfh'+d] = new RandMat(hidden_size, hidden_size , 0, 0.08);
            model['bf'+d] = new Mat(hidden_size, 1);
            model['Wox'+d] = new RandMat(hidden_size, prev_size , 0, 0.08);
            model['Woh'+d] = new RandMat(hidden_size, hidden_size , 0, 0.08);
            model['bo'+d] = new Mat(hidden_size, 1);
            // cell write params
            model['Wcx'+d] = new RandMat(hidden_size, prev_size , 0, 0.08);
            model['Wch'+d] = new RandMat(hidden_size, hidden_size , 0, 0.08);
            model['bc'+d] = new Mat(hidden_size, 1);
        }
        // decoder params
        model['Whd'] = new RandMat(output_size, hidden_size, 0, 0.08);
        model['bd'] = new Mat(output_size, 1);
        return model;
    }

    var forwardLSTM = function(G, model, hidden_sizes, x, prev) {
        // forward prop for a single tick of LSTM
        // G is graph to append ops to
        // model contains LSTM parameters
        // x is 1D column vector with observation
        // prev is a struct containing hidden and cell
        // from previous iteration

        if(prev == null || typeof prev.h === 'undefined') {
            var hidden_prevs = [];
            var cell_prevs = [];
            for(var d=0;d<hidden_sizes.length;d++) {
                hidden_prevs.push(new R.Mat(hidden_sizes[d],1));
                cell_prevs.push(new R.Mat(hidden_sizes[d],1));
            }
        } else {
            var hidden_prevs = prev.h;
            var cell_prevs = prev.c;
        }

        var hidden = [];
        var cell = [];
        for(var d=0;d<hidden_sizes.length;d++) {

            var input_vector = d === 0 ? x : hidden[d-1];
            var hidden_prev = hidden_prevs[d];
            var cell_prev = cell_prevs[d];

            // input gate
            var h0 = G.mul(model['Wix'+d], input_vector);
            var h1 = G.mul(model['Wih'+d], hidden_prev);
            var input_gate = G.sigmoid(G.add(G.add(h0,h1),model['bi'+d]));

            // forget gate
            var h2 = G.mul(model['Wfx'+d], input_vector);
            var h3 = G.mul(model['Wfh'+d], hidden_prev);
            var forget_gate = G.sigmoid(G.add(G.add(h2, h3),model['bf'+d]));

            // output gate
            var h4 = G.mul(model['Wox'+d], input_vector);
            var h5 = G.mul(model['Woh'+d], hidden_prev);
            var output_gate = G.sigmoid(G.add(G.add(h4, h5),model['bo'+d]));

            // write operation on cells
            var h6 = G.mul(model['Wcx'+d], input_vector);
            var h7 = G.mul(model['Wch'+d], hidden_prev);
            var cell_write = G.tanh(G.add(G.add(h6, h7),model['bc'+d]));

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
        var output = G.add(G.mul(model['Whd'], hidden[hidden.length - 1]),model['bd']);

        // return cell memory, hidden representation and output
        return {'h':hidden, 'c':cell, 'o' : output};
    }

    var sig = function(x) {
        // helper function for computing sigmoid
        return 1.0/(1+Math.exp(-x));
    }

    var maxi = function(w) {
        // argmax of array w
        var maxv = w[0];
        var maxix = 0;
        for(var i=1,n=w.length;i<n;i++) {
            var v = w[i];
            if(v > maxv) {
                maxix = i;
                maxv = v;
            }
        }
        return maxix;
    }

    var samplei = function(w) {
        // sample argmax from w, assuming w are
        // probabilities that sum to one
        var r = randf(0,1);
        var x = 0.0;
        var i = 0;
        while(true) {
            x += w[i];
            if(x > r) { return i; }
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
(function(global) {
    "use strict";

// syntactic sugar function for getting default parameter values
    var getopt = function(opt, field_name, default_value) {
        if(typeof opt === 'undefined') { return default_value; }
        return (typeof opt[field_name] !== 'undefined') ? opt[field_name] : default_value;
    }

    var zeros = R.zeros; // inherit these
    var assert = R.assert;
    var randi = R.randi;
    var randf = R.randf;

    var setConst = function(arr, c) {
        for(var i=0,n=arr.length;i<n;i++) {
            arr[i] = c;
        }
    }

    var sampleWeighted = function(p) {
        var r = Math.random();
        var c = 0.0;
        for(var i=0,n=p.length;i<n;i++) {
            c += p[i];
            if(c >= r) { return i; }
        }
        assert(false, 'wtf');
    }

// ------
// AGENTS
// ------

// DPAgent performs Value Iteration
// - can also be used for Policy Iteration if you really wanted to
// - requires model of the environment :(
// - does not learn from experience :(
// - assumes finite MDP :(
    var DPAgent = function(env, opt) {
        this.V = null; // state value function
        this.P = null; // policy distribution \pi(s,a)
        this.env = env; // store pointer to environment
        this.gamma = getopt(opt, 'gamma', 0.75); // future reward discount factor
        this.reset();
    }
    DPAgent.prototype = {
        reset: function() {
            // reset the agent's policy and value function
            this.ns = this.env.getNumStates();
            this.na = this.env.getMaxNumActions();
            this.V = zeros(this.ns);
            this.P = zeros(this.ns * this.na);
            // initialize uniform random policy
            for(var s=0;s<this.ns;s++) {
                var poss = this.env.allowedActions(s);
                for(var i=0,n=poss.length;i<n;i++) {
                    this.P[poss[i]*this.ns+s] = 1.0 / poss.length;
                }
            }
        },
        act: function(s) {
            // behave according to the learned policy
            var poss = this.env.allowedActions(s);
            var ps = [];
            for(var i=0,n=poss.length;i<n;i++) {
                var a = poss[i];
                var prob = this.P[a*this.ns+s];
                ps.push(prob);
            }
            var maxi = sampleWeighted(ps);
            return poss[maxi];
        },
        learn: function() {
            // perform a single round of value iteration
            self.evaluatePolicy(); // writes this.V
            self.updatePolicy(); // writes this.P
        },
        evaluatePolicy: function() {
            // perform a synchronous update of the value function
            var Vnew = zeros(this.ns);
            for(var s=0;s<this.ns;s++) {
                // integrate over actions in a stochastic policy
                // note that we assume that policy probability mass over allowed actions sums to one
                var v = 0.0;
                var poss = this.env.allowedActions(s);
                for(var i=0,n=poss.length;i<n;i++) {
                    var a = poss[i];
                    var prob = this.P[a*this.ns+s]; // probability of taking action under policy
                    if(prob === 0) { continue; } // no contribution, skip for speed
                    var ns = this.env.nextStateDistribution(s,a);
                    var rs = this.env.reward(s,a,ns); // reward for s->a->ns transition
                    v += prob * (rs + this.gamma * this.V[ns]);
                }
                Vnew[s] = v;
            }
            this.V = Vnew; // swap
        },
        updatePolicy: function() {
            // update policy to be greedy w.r.t. learned Value function
            for(var s=0;s<this.ns;s++) {
                var poss = this.env.allowedActions(s);
                // compute value of taking each allowed action
                var vmax, nmax;
                var vs = [];
                for(var i=0,n=poss.length;i<n;i++) {
                    var a = poss[i];
                    var ns = this.env.nextStateDistribution(s,a);
                    var rs = this.env.reward(s,a,ns);
                    var v = rs + this.gamma * this.V[ns];
                    vs.push(v);
                    if(i === 0 || v > vmax) { vmax = v; nmax = 1; }
                    else if(v === vmax) { nmax += 1; }
                }
                // update policy smoothly across all argmaxy actions
                for(var i=0,n=poss.length;i<n;i++) {
                    var a = poss[i];
                    this.P[a*this.ns+s] = (vs[i] === vmax) ? 1.0/nmax : 0.0;
                }
            }
        },
    }

// QAgent uses TD (Q-Learning, SARSA)
// - does not require environment model :)
// - learns from experience :)
    var TDAgent = function(env, opt) {
        this.update = getopt(opt, 'update', 'qlearn'); // qlearn | sarsa
        this.gamma = getopt(opt, 'gamma', 0.75); // future reward discount factor
        this.epsilon = getopt(opt, 'epsilon', 0.1); // for epsilon-greedy policy
        this.alpha = getopt(opt, 'alpha', 0.01); // value function learning rate

        // class allows non-deterministic policy, and smoothly regressing towards the optimal policy based on Q
        this.smooth_policy_update = getopt(opt, 'smooth_policy_update', false);
        this.beta = getopt(opt, 'beta', 0.01); // learning rate for policy, if smooth updates are on

        // eligibility traces
        this.lambda = getopt(opt, 'lambda', 0); // eligibility trace decay. 0 = no eligibility traces used
        this.replacing_traces = getopt(opt, 'replacing_traces', true);

        // optional optimistic initial values
        this.q_init_val = getopt(opt, 'q_init_val', 0);

        this.planN = getopt(opt, 'planN', 0); // number of planning steps per learning iteration (0 = no planning)

        this.Q = null; // state action value function
        this.P = null; // policy distribution \pi(s,a)
        this.e = null; // eligibility trace
        this.env_model_s = null;; // environment model (s,a) -> (s',r)
        this.env_model_r = null;; // environment model (s,a) -> (s',r)
        this.env = env; // store pointer to environment
        this.reset();
    }
    TDAgent.prototype = {
        reset: function(){
            // reset the agent's policy and value function
            this.ns = this.env.getNumStates();
            this.na = this.env.getMaxNumActions();
            this.Q = zeros(this.ns * this.na);
            if(this.q_init_val !== 0) { setConst(this.Q, this.q_init_val); }
            this.P = zeros(this.ns * this.na);
            this.e = zeros(this.ns * this.na);

            // model/planning vars
            this.env_model_s = zeros(this.ns * this.na);
            setConst(this.env_model_s, -1); // init to -1 so we can test if we saw the state before
            this.env_model_r = zeros(this.ns * this.na);
            this.sa_seen = [];
            this.pq = zeros(this.ns * this.na);

            // initialize uniform random policy
            for(var s=0;s<this.ns;s++) {
                var poss = this.env.allowedActions(s);
                for(var i=0,n=poss.length;i<n;i++) {
                    this.P[poss[i]*this.ns+s] = 1.0 / poss.length;
                }
            }
            // agent memory, needed for streaming updates
            // (s0,a0,r0,s1,a1,r1,...)
            this.r0 = null;
            this.s0 = null;
            this.s1 = null;
            this.a0 = null;
            this.a1 = null;
        },
        resetEpisode: function() {
            // an episode finished
        },
        act: function(s){
            // act according to epsilon greedy policy
            var poss = this.env.allowedActions(s);
            var probs = [];
            for(var i=0,n=poss.length;i<n;i++) {
                probs.push(this.P[poss[i]*this.ns+s]);
            }
            // epsilon greedy policy
            if(Math.random() < this.epsilon) {
                var a = poss[randi(0,poss.length)]; // random available action
                this.explored = true;
            } else {
                var a = poss[sampleWeighted(probs)];
                this.explored = false;
            }
            // shift state memory
            this.s0 = this.s1;
            this.a0 = this.a1;
            this.s1 = s;
            this.a1 = a;
            return a;
        },
        learn: function(r1){
            // takes reward for previous action, which came from a call to act()
            if(!(this.r0 == null)) {
                this.learnFromTuple(this.s0, this.a0, this.r0, this.s1, this.a1, this.lambda);
                if(this.planN > 0) {
                    this.updateModel(this.s0, this.a0, this.r0, this.s1);
                    this.plan();
                }
            }
            this.r0 = r1; // store this for next update
        },
        updateModel: function(s0, a0, r0, s1) {
            // transition (s0,a0) -> (r0,s1) was observed. Update environment model
            var sa = a0 * this.ns + s0;
            if(this.env_model_s[sa] === -1) {
                // first time we see this state action
                this.sa_seen.push(a0 * this.ns + s0); // add as seen state
            }
            this.env_model_s[sa] = s1;
            this.env_model_r[sa] = r0;
        },
        plan: function() {

            // order the states based on current priority queue information
            var spq = [];
            for(var i=0,n=this.sa_seen.length;i<n;i++) {
                var sa = this.sa_seen[i];
                var sap = this.pq[sa];
                if(sap > 1e-5) { // gain a bit of efficiency
                    spq.push({sa:sa, p:sap});
                }
            }
            spq.sort(function(a,b){ return a.p < b.p ? 1 : -1});

            // perform the updates
            var nsteps = Math.min(this.planN, spq.length);
            for(var k=0;k<nsteps;k++) {
                // random exploration
                //var i = randi(0, this.sa_seen.length); // pick random prev seen state action
                //var s0a0 = this.sa_seen[i];
                var s0a0 = spq[k].sa;
                this.pq[s0a0] = 0; // erase priority, since we're backing up this state
                var s0 = s0a0 % this.ns;
                var a0 = Math.floor(s0a0 / this.ns);
                var r0 = this.env_model_r[s0a0];
                var s1 = this.env_model_s[s0a0];
                var a1 = -1; // not used for Q learning
                if(this.update === 'sarsa') {
                    // generate random action?...
                    var poss = this.env.allowedActions(s1);
                    var a1 = poss[randi(0,poss.length)];
                }
                this.learnFromTuple(s0, a0, r0, s1, a1, 0); // note lambda = 0 - shouldnt use eligibility trace here
            }
        },
        learnFromTuple: function(s0, a0, r0, s1, a1, lambda) {
            var sa = a0 * this.ns + s0;

            // calculate the target for Q(s,a)
            if(this.update === 'qlearn') {
                // Q learning target is Q(s0,a0) = r0 + gamma * max_a Q[s1,a]
                var poss = this.env.allowedActions(s1);
                var qmax = 0;
                for(var i=0,n=poss.length;i<n;i++) {
                    var s1a = poss[i] * this.ns + s1;
                    var qval = this.Q[s1a];
                    if(i === 0 || qval > qmax) { qmax = qval; }
                }
                var target = r0 + this.gamma * qmax;
            } else if(this.update === 'sarsa') {
                // SARSA target is Q(s0,a0) = r0 + gamma * Q[s1,a1]
                var s1a1 = a1 * this.ns + s1;
                var target = r0 + this.gamma * this.Q[s1a1];
            }

            if(lambda > 0) {
                // perform an eligibility trace update
                if(this.replacing_traces) {
                    this.e[sa] = 1;
                } else {
                    this.e[sa] += 1;
                }
                var edecay = lambda * this.gamma;
                var state_update = zeros(this.ns);
                for(var s=0;s<this.ns;s++) {
                    var poss = this.env.allowedActions(s);
                    for(var i=0;i<poss.length;i++) {
                        var a = poss[i];
                        var saloop = a * this.ns + s;
                        var esa = this.e[saloop];
                        var update = this.alpha * esa * (target - this.Q[saloop]);
                        this.Q[saloop] += update;
                        this.updatePriority(s, a, update);
                        this.e[saloop] *= edecay;
                        var u = Math.abs(update);
                        if(u > state_update[s]) { state_update[s] = u; }
                    }
                }
                for(var s=0;s<this.ns;s++) {
                    if(state_update[s] > 1e-5) { // save efficiency here
                        this.updatePolicy(s);
                    }
                }
                if(this.explored && this.update === 'qlearn') {
                    // have to wipe the trace since q learning is off-policy :(
                    this.e = zeros(this.ns * this.na);
                }
            } else {
                // simpler and faster update without eligibility trace
                // update Q[sa] towards it with some step size
                var update = this.alpha * (target - this.Q[sa]);
                this.Q[sa] += update;
                this.updatePriority(s0, a0, update);
                // update the policy to reflect the change (if appropriate)
                this.updatePolicy(s0);
            }
        },
        updatePriority: function(s,a,u) {
            // used in planning. Invoked when Q[sa] += update
            // we should find all states that lead to (s,a) and upgrade their priority
            // of being update in the next planning step
            u = Math.abs(u);
            if(u < 1e-5) { return; } // for efficiency skip small updates
            if(this.planN === 0) { return; } // there is no planning to be done, skip.
            for(var si=0;si<this.ns;si++) {
                // note we are also iterating over impossible actions at all states,
                // but this should be okay because their env_model_s should simply be -1
                // as initialized, so they will never be predicted to point to any state
                // because they will never be observed, and hence never be added to the model
                for(var ai=0;ai<this.na;ai++) {
                    var siai = ai * this.ns + si;
                    if(this.env_model_s[siai] === s) {
                        // this state leads to s, add it to priority queue
                        this.pq[siai] += u;
                    }
                }
            }
        },
        updatePolicy: function(s) {
            var poss = this.env.allowedActions(s);
            // set policy at s to be the action that achieves max_a Q(s,a)
            // first find the maxy Q values
            var qmax, nmax;
            var qs = [];
            for(var i=0,n=poss.length;i<n;i++) {
                var a = poss[i];
                var qval = this.Q[a*this.ns+s];
                qs.push(qval);
                if(i === 0 || qval > qmax) { qmax = qval; nmax = 1; }
                else if(qval === qmax) { nmax += 1; }
            }
            // now update the policy smoothly towards the argmaxy actions
            var psum = 0.0;
            for(var i=0,n=poss.length;i<n;i++) {
                var a = poss[i];
                var target = (qs[i] === qmax) ? 1.0/nmax : 0.0;
                var ix = a*this.ns+s;
                if(this.smooth_policy_update) {
                    // slightly hacky :p
                    this.P[ix] += this.beta * (target - this.P[ix]);
                    psum += this.P[ix];
                } else {
                    // set hard target
                    this.P[ix] = target;
                }
            }
            if(this.smooth_policy_update) {
                // renomalize P if we're using smooth policy updates
                for(var i=0,n=poss.length;i<n;i++) {
                    var a = poss[i];
                    this.P[a*this.ns+s] /= psum;
                }
            }
        }
    }


    var DQNAgent = function(env, opt) {
        this.gamma = getopt(opt, 'gamma', 0.75); // future reward discount factor
        this.epsilon = getopt(opt, 'epsilon', 0.1); // for epsilon-greedy policy
        this.alpha = getopt(opt, 'alpha', 0.01); // value function learning rate

        this.experience_add_every = getopt(opt, 'experience_add_every', 25); // number of time steps before we add another experience to replay memory
        this.experience_size = getopt(opt, 'experience_size', 5000); // size of experience replay
        this.learning_steps_per_iteration = getopt(opt, 'learning_steps_per_iteration', 10);
        this.tderror_clamp = getopt(opt, 'tderror_clamp', 1.0);

        this.num_hidden_units =  getopt(opt, 'num_hidden_units', 100);

        this.env = env;
        this.reset();
    }
    DQNAgent.prototype = {
        reset: function() {
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
        toJSON: function() {
            // save function
            var j = {};
            j.nh = this.nh;
            j.ns = this.ns;
            j.na = this.na;
            j.net = R.netToJSON(this.net);
            return j;
        },
        fromJSON: function(j) {
            // load function
            this.nh = j.nh;
            this.ns = j.ns;
            this.na = j.na;
            this.net = R.netFromJSON(j.net);
        },
        forwardQ: function(net, s, needs_backprop) {
            var G = new R.Graph(needs_backprop);
            var a1mat = G.add(G.mul(net.W1, s), net.b1);
            var h1mat = G.tanh(a1mat);
            var a2mat = G.add(G.mul(net.W2, h1mat), net.b2);
            this.lastG = G; // back this up. Kind of hacky isn't it
            return a2mat;
        },
        act: function(slist) {
            // convert to a Mat column vector
            var s = new R.Mat(this.ns, 1);
            s.setFrom(slist);

            // epsilon greedy policy
            if(Math.random() < this.epsilon) {
                var a = randi(0, this.na);
            } else {
                // greedy wrt Q function
                var amat = this.forwardQ(this.net, s, false);
                var a = R.maxi(amat.w); // returns index of argmax action
            }

            // shift state memory
            this.s0 = this.s1;
            this.a0 = this.a1;
            this.s1 = s;
            this.a1 = a;

            return a;
        },
        learn: function(r1) {
            // perform an update on Q function
            if(!(this.r0 == null) && this.alpha > 0) {

                // learn from this tuple to get a sense of how "surprising" it is to the agent
                var tderror = this.learnFromTuple(this.s0, this.a0, this.r0, this.s1, this.a1);
                this.tderror = tderror; // a measure of surprise

                // decide if we should keep this experience in the replay
                if(this.t % this.experience_add_every === 0) {
                    this.exp[this.expi] = [this.s0, this.a0, this.r0, this.s1, this.a1];
                    this.expi += 1;
                    if(this.expi > this.experience_size) { this.expi = 0; } // roll over when we run out
                }
                this.t += 1;

                // sample some additional experience from replay memory and learn from it
                for(var k=0;k<this.learning_steps_per_iteration;k++) {
                    var ri = randi(0, this.exp.length); // todo: priority sweeps?
                    var e = this.exp[ri];
                    this.learnFromTuple(e[0], e[1], e[2], e[3], e[4])
                }
            }
            this.r0 = r1; // store for next update
        },
        learnFromTuple: function(s0, a0, r0, s1, a1) {
            // want: Q(s,a) = r + gamma * max_a' Q(s',a')

            // compute the target Q value
            var tmat = this.forwardQ(this.net, s1, false);
            var qmax = r0 + this.gamma * tmat.w[R.maxi(tmat.w)];

            // now predict
            var pred = this.forwardQ(this.net, s0, true);

            var tderror = pred.w[a0] - qmax;
            var clamp = this.tderror_clamp;
            if(Math.abs(tderror) > clamp) {  // huber loss to robustify
                if(tderror > clamp) tderror = clamp;
                if(tderror < -clamp) tderror = -clamp;
            }
            pred.dw[a0] = tderror;
            this.lastG.backward(); // compute gradients on net params

            // update net
            R.updateNet(this.net, this.alpha);
            return tderror;
        }
    }

// buggy implementation, doesnt work...
    var SimpleReinforceAgent = function(env, opt) {
        this.gamma = getopt(opt, 'gamma', 0.5); // future reward discount factor
        this.epsilon = getopt(opt, 'epsilon', 0.75); // for epsilon-greedy policy
        this.alpha = getopt(opt, 'alpha', 0.001); // actor net learning rate
        this.beta = getopt(opt, 'beta', 0.01); // baseline net learning rate
        this.env = env;
        this.reset();
    }
    SimpleReinforceAgent.prototype = {
        reset: function() {
            this.ns = this.env.getNumStates();
            this.na = this.env.getMaxNumActions();
            this.nh = 100; // number of hidden units
            this.nhb = 100; // and also in the baseline lstm

            this.actorNet = {};
            this.actorNet.W1 = new R.RandMat(this.nh, this.ns, 0, 0.01);
            this.actorNet.b1 = new R.Mat(this.nh, 1, 0, 0.01);
            this.actorNet.W2 = new R.RandMat(this.na, this.nh, 0, 0.1);
            this.actorNet.b2 = new R.Mat(this.na, 1, 0, 0.01);
            this.actorOutputs = [];
            this.actorGraphs = [];
            this.actorActions = []; // sampled ones

            this.rewardHistory = [];

            this.baselineNet = {};
            this.baselineNet.W1 = new R.RandMat(this.nhb, this.ns, 0, 0.01);
            this.baselineNet.b1 = new R.Mat(this.nhb, 1, 0, 0.01);
            this.baselineNet.W2 = new R.RandMat(this.na, this.nhb, 0, 0.01);
            this.baselineNet.b2 = new R.Mat(this.na, 1, 0, 0.01);
            this.baselineOutputs = [];
            this.baselineGraphs = [];

            this.t = 0;
        },
        forwardActor: function(s, needs_backprop) {
            var net = this.actorNet;
            var G = new R.Graph(needs_backprop);
            var a1mat = G.add(G.mul(net.W1, s), net.b1);
            var h1mat = G.tanh(a1mat);
            var a2mat = G.add(G.mul(net.W2, h1mat), net.b2);
            return {'a':a2mat, 'G':G}
        },
        forwardValue: function(s, needs_backprop) {
            var net = this.baselineNet;
            var G = new R.Graph(needs_backprop);
            var a1mat = G.add(G.mul(net.W1, s), net.b1);
            var h1mat = G.tanh(a1mat);
            var a2mat = G.add(G.mul(net.W2, h1mat), net.b2);
            return {'a':a2mat, 'G':G}
        },
        act: function(slist) {
            // convert to a Mat column vector
            var s = new R.Mat(this.ns, 1);
            s.setFrom(slist);

            // forward the actor to get action output
            var ans = this.forwardActor(s, true);
            var amat = ans.a;
            var ag = ans.G;
            this.actorOutputs.push(amat);
            this.actorGraphs.push(ag);

            // forward the baseline estimator
            var ans = this.forwardValue(s, true);
            var vmat = ans.a;
            var vg = ans.G;
            this.baselineOutputs.push(vmat);
            this.baselineGraphs.push(vg);

            // sample action from the stochastic gaussian policy
            var a = R.copyMat(amat);
            var gaussVar = 0.02;
            a.w[0] = R.randn(0, gaussVar);
            a.w[1] = R.randn(0, gaussVar);

            this.actorActions.push(a);

            // shift state memory
            this.s0 = this.s1;
            this.a0 = this.a1;
            this.s1 = s;
            this.a1 = a;

            return a;
        },
        learn: function(r1) {
            // perform an update on Q function
            this.rewardHistory.push(r1);
            var n = this.rewardHistory.length;
            var baselineMSE = 0.0;
            var nup = 100; // what chunk of experience to take
            var nuse = 80; // what chunk to update from
            if(n >= nup) {
                // lets learn and flush
                // first: compute the sample values at all points
                var vs = [];
                for(var t=0;t<nuse;t++) {
                    var mul = 1;
                    // compute the actual discounted reward for this time step
                    var V = 0;
                    for(var t2=t;t2<n;t2++) {
                        V += mul * this.rewardHistory[t2];
                        mul *= this.gamma;
                        if(mul < 1e-5) { break; } // efficiency savings
                    }
                    // get the predicted baseline at this time step
                    var b = this.baselineOutputs[t].w[0];
                    for(var i=0;i<this.na;i++) {
                        // [the action delta] * [the desirebility]
                        var update = - (V - b) * (this.actorActions[t].w[i] - this.actorOutputs[t].w[i]);
                        if(update > 0.1) { update = 0.1; }
                        if(update < -0.1) { update = -0.1; }
                        this.actorOutputs[t].dw[i] += update;
                    }
                    var update = - (V - b);
                    if(update > 0.1) { update = 0.1; }
                    if(update < 0.1) { update = -0.1; }
                    this.baselineOutputs[t].dw[0] += update;
                    baselineMSE += (V - b) * (V - b);
                    vs.push(V);
                }
                baselineMSE /= nuse;
                // backprop all the things
                for(var t=0;t<nuse;t++) {
                    this.actorGraphs[t].backward();
                    this.baselineGraphs[t].backward();
                }
                R.updateNet(this.actorNet, this.alpha); // update actor network
                R.updateNet(this.baselineNet, this.beta); // update baseline network

                // flush
                this.actorOutputs = [];
                this.rewardHistory = [];
                this.actorActions = [];
                this.baselineOutputs = [];
                this.actorGraphs = [];
                this.baselineGraphs = [];

                this.tderror = baselineMSE;
            }
            this.t += 1;
            this.r0 = r1; // store for next update
        },
    }

// buggy implementation as well, doesn't work
    var RecurrentReinforceAgent = function(env, opt) {
        this.gamma = getopt(opt, 'gamma', 0.5); // future reward discount factor
        this.epsilon = getopt(opt, 'epsilon', 0.1); // for epsilon-greedy policy
        this.alpha = getopt(opt, 'alpha', 0.001); // actor net learning rate
        this.beta = getopt(opt, 'beta', 0.01); // baseline net learning rate
        this.env = env;
        this.reset();
    }
    RecurrentReinforceAgent.prototype = {
        reset: function() {
            this.ns = this.env.getNumStates();
            this.na = this.env.getMaxNumActions();
            this.nh = 40; // number of hidden units
            this.nhb = 40; // and also in the baseline lstm

            this.actorLSTM = R.initLSTM(this.ns, [this.nh], this.na);
            this.actorG = new R.Graph();
            this.actorPrev = null;
            this.actorOutputs = [];
            this.rewardHistory = [];
            this.actorActions = [];

            this.baselineLSTM = R.initLSTM(this.ns, [this.nhb], 1);
            this.baselineG = new R.Graph();
            this.baselinePrev = null;
            this.baselineOutputs = [];

            this.t = 0;

            this.r0 = null;
            this.s0 = null;
            this.s1 = null;
            this.a0 = null;
            this.a1 = null;
        },
        act: function(slist) {
            // convert to a Mat column vector
            var s = new R.Mat(this.ns, 1);
            s.setFrom(slist);

            // forward the LSTM to get action distribution
            var actorNext = R.forwardLSTM(this.actorG, this.actorLSTM, [this.nh], s, this.actorPrev);
            this.actorPrev = actorNext;
            var amat = actorNext.o;
            this.actorOutputs.push(amat);

            // forward the baseline LSTM
            var baselineNext = R.forwardLSTM(this.baselineG, this.baselineLSTM, [this.nhb], s, this.baselinePrev);
            this.baselinePrev = baselineNext;
            this.baselineOutputs.push(baselineNext.o);

            // sample action from actor policy
            var gaussVar = 0.05;
            var a = R.copyMat(amat);
            for(var i=0,n=a.w.length;i<n;i++) {
                a.w[0] += R.randn(0, gaussVar);
                a.w[1] += R.randn(0, gaussVar);
            }
            this.actorActions.push(a);

            // shift state memory
            this.s0 = this.s1;
            this.a0 = this.a1;
            this.s1 = s;
            this.a1 = a;
            return a;
        },
        learn: function(r1) {
            // perform an update on Q function
            this.rewardHistory.push(r1);
            var n = this.rewardHistory.length;
            var baselineMSE = 0.0;
            var nup = 100; // what chunk of experience to take
            var nuse = 80; // what chunk to also update
            if(n >= nup) {
                // lets learn and flush
                // first: compute the sample values at all points
                var vs = [];
                for(var t=0;t<nuse;t++) {
                    var mul = 1;
                    var V = 0;
                    for(var t2=t;t2<n;t2++) {
                        V += mul * this.rewardHistory[t2];
                        mul *= this.gamma;
                        if(mul < 1e-5) { break; } // efficiency savings
                    }
                    var b = this.baselineOutputs[t].w[0];
                    // todo: take out the constants etc.
                    for(var i=0;i<this.na;i++) {
                        // [the action delta] * [the desirebility]
                        var update = - (V - b) * (this.actorActions[t].w[i] - this.actorOutputs[t].w[i]);
                        if(update > 0.1) { update = 0.1; }
                        if(update < -0.1) { update = -0.1; }
                        this.actorOutputs[t].dw[i] += update;
                    }
                    var update = - (V - b);
                    if(update > 0.1) { update = 0.1; }
                    if(update < 0.1) { update = -0.1; }
                    this.baselineOutputs[t].dw[0] += update;
                    baselineMSE += (V-b)*(V-b);
                    vs.push(V);
                }
                baselineMSE /= nuse;
                this.actorG.backward(); // update params! woohoo!
                this.baselineG.backward();
                R.updateNet(this.actorLSTM, this.alpha); // update actor network
                R.updateNet(this.baselineLSTM, this.beta); // update baseline network

                // flush
                this.actorG = new R.Graph();
                this.actorPrev = null;
                this.actorOutputs = [];
                this.rewardHistory = [];
                this.actorActions = [];

                this.baselineG = new R.Graph();
                this.baselinePrev = null;
                this.baselineOutputs = [];

                this.tderror = baselineMSE;
            }
            this.t += 1;
            this.r0 = r1; // store for next update
        },
    }

// Currently buggy implementation, doesnt work
    var DeterministPG = function(env, opt) {
        this.gamma = getopt(opt, 'gamma', 0.5); // future reward discount factor
        this.epsilon = getopt(opt, 'epsilon', 0.5); // for epsilon-greedy policy
        this.alpha = getopt(opt, 'alpha', 0.001); // actor net learning rate
        this.beta = getopt(opt, 'beta', 0.01); // baseline net learning rate
        this.env = env;
        this.reset();
    }
    DeterministPG.prototype = {
        reset: function() {
            this.ns = this.env.getNumStates();
            this.na = this.env.getMaxNumActions();
            this.nh = 100; // number of hidden units

            // actor
            this.actorNet = {};
            this.actorNet.W1 = new R.RandMat(this.nh, this.ns, 0, 0.01);
            this.actorNet.b1 = new R.Mat(this.nh, 1, 0, 0.01);
            this.actorNet.W2 = new R.RandMat(this.na, this.ns, 0, 0.1);
            this.actorNet.b2 = new R.Mat(this.na, 1, 0, 0.01);
            this.ntheta = this.na*this.ns+this.na; // number of params in actor

            // critic
            this.criticw = new R.RandMat(1, this.ntheta, 0, 0.01); // row vector

            this.r0 = null;
            this.s0 = null;
            this.s1 = null;
            this.a0 = null;
            this.a1 = null;
            this.t = 0;
        },
        forwardActor: function(s, needs_backprop) {
            var net = this.actorNet;
            var G = new R.Graph(needs_backprop);
            var a1mat = G.add(G.mul(net.W1, s), net.b1);
            var h1mat = G.tanh(a1mat);
            var a2mat = G.add(G.mul(net.W2, h1mat), net.b2);
            return {'a':a2mat, 'G':G}
        },
        act: function(slist) {
            // convert to a Mat column vector
            var s = new R.Mat(this.ns, 1);
            s.setFrom(slist);

            // forward the actor to get action output
            var ans = this.forwardActor(s, false);
            var amat = ans.a;
            var ag = ans.G;

            // sample action from the stochastic gaussian policy
            var a = R.copyMat(amat);
            if(Math.random() < this.epsilon) {
                var gaussVar = 0.02;
                a.w[0] = R.randn(0, gaussVar);
                a.w[1] = R.randn(0, gaussVar);
            }
            var clamp = 0.25;
            if(a.w[0] > clamp) a.w[0] = clamp;
            if(a.w[0] < -clamp) a.w[0] = -clamp;
            if(a.w[1] > clamp) a.w[1] = clamp;
            if(a.w[1] < -clamp) a.w[1] = -clamp;

            // shift state memory
            this.s0 = this.s1;
            this.a0 = this.a1;
            this.s1 = s;
            this.a1 = a;

            return a;
        },
        utilJacobianAt: function(s) {
            var ujacobian = new R.Mat(this.ntheta, this.na);
            for(var a=0;a<this.na;a++) {
                R.netZeroGrads(this.actorNet);
                var ag = this.forwardActor(this.s0, true);
                ag.a.dw[a] = 1.0;
                ag.G.backward();
                var gflat = R.netFlattenGrads(this.actorNet);
                ujacobian.setColumn(gflat,a);
            }
            return ujacobian;
        },
        learn: function(r1) {
            // perform an update on Q function
            //this.rewardHistory.push(r1);
            if(!(this.r0 == null)) {
                var Gtmp = new R.Graph(false);
                // dpg update:
                // first compute the features psi:
                // the jacobian matrix of the actor for s
                var ujacobian0 = this.utilJacobianAt(this.s0);
                // now form the features \psi(s,a)
                var psi_sa0 = Gtmp.mul(ujacobian0, this.a0); // should be [this.ntheta x 1] "feature" vector
                var qw0 = Gtmp.mul(this.criticw, psi_sa0); // 1x1
                // now do the same thing because we need \psi(s_{t+1}, \mu\_\theta(s\_t{t+1}))
                var ujacobian1 = this.utilJacobianAt(this.s1);
                var ag = this.forwardActor(this.s1, false);
                var psi_sa1 = Gtmp.mul(ujacobian1, ag.a);
                var qw1 = Gtmp.mul(this.criticw, psi_sa1); // 1x1
                // get the td error finally
                var tderror = this.r0 + this.gamma * qw1.w[0] - qw0.w[0]; // lol
                if(tderror > 0.5) tderror = 0.5; // clamp
                if(tderror < -0.5) tderror = -0.5;
                this.tderror = tderror;

                // update actor policy with natural gradient
                var net = this.actorNet;
                var ix = 0;
                for(var p in net) {
                    var mat = net[p];
                    if(net.hasOwnProperty(p)){
                        for(var i=0,n=mat.w.length;i<n;i++) {
                            mat.w[i] += this.alpha * this.criticw.w[ix]; // natural gradient update
                            ix+=1;
                        }
                    }
                }
                // update the critic parameters too
                for(var i=0;i<this.ntheta;i++) {
                    var update = this.beta * tderror * psi_sa0.w[i];
                    this.criticw.w[i] += update;
                }
            }
            this.r0 = r1; // store for next update
        },
    }

// exports
    global.DPAgent = DPAgent;
    global.TDAgent = TDAgent;
    global.DQNAgent = DQNAgent;
//global.SimpleReinforceAgent = SimpleReinforceAgent;
//global.RecurrentReinforceAgent = RecurrentReinforceAgent;
//global.DeterministPG = DeterministPG;
})(RL);

const rl = RL;
/* harmony export (immutable) */ __webpack_exports__["a"] = rl;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const data =
{"nh":100,"ns":26,"na":4,"net":{"W1":{"n":100,"d":26,"w":{"0":3.823495858004567,"1":-0.77977843740743,"2":3.318692271062407,"3":8.710780619260289,"4":4.987036517252181,"5":-0.24156064820885806,"6":-3.7899635349710925,"7":3.308432948850755,"8":4.805700041899076,"9":2.925373216922225,"10":4.844244749794819,"11":5.053803213914123,"12":2.3249658708864245,"13":6.419614092662006,"14":5.256602117574251,"15":3.348461045393343,"16":-0.7341865778434387,"17":-3.2904255726249954,"18":6.707518590262972,"19":5.432181998392805,"20":6.82266731341985,"21":1.127608330370214,"22":-4.749968200845077,"23":4.461331484995577,"24":5.197894978612947,"25":-0.31909374556877973,"26":-1.4650405199052061,"27":0.8342403414385253,"28":2.1829461444491067,"29":2.665527996780971,"30":-0.12060792340381009,"31":2.8559660042989408,"32":4.416689280004509,"33":-1.1860236357152147,"34":1.9722168040896,"35":4.548819641193721,"36":-0.8543709790054494,"37":-1.202127148539094,"38":-3.1201007906854588,"39":-1.2126932474089778,"40":-0.08461908583511184,"41":-0.9273567324573725,"42":-1.875691133961949,"43":-3.553528102237588,"44":3.3658983866346133,"45":1.309552077962659,"46":-0.473796058643183,"47":0.27958350987535335,"48":-4.622878162991376,"49":1.1419048890043555,"50":-0.7608465663822054,"51":0.7691846240232468,"52":-1.461586794242131,"53":4.529310996980513,"54":-3.6420541846017747,"55":1.732036861763474,"56":3.484909531075342,"57":2.0687354947805456,"58":6.2580284395168055,"59":3.995632773908293,"60":1.2148746320033705,"61":3.249018346002709,"62":1.5229374362227808,"63":-1.4800299510104857,"64":-1.9935132116340746,"65":-2.489224141196564,"66":-0.9971501979886896,"67":-0.22624973266037832,"68":6.957614334917275,"69":0.9930182640710861,"70":1.9092316249389516,"71":-1.8365556995302004,"72":-1.9280560878135642,"73":-2.384149389701464,"74":4.314202880468275,"75":-6.711314178913567,"76":1.1370649010675187,"77":-3.1749564769726035,"78":-0.28037540967589203,"79":1.6801202134496307,"80":-1.7485992867494806,"81":3.0232381822513212,"82":1.4133487835249299,"83":2.533073805818567,"84":-7.828039593906538,"85":-3.066852939787733,"86":2.4106019699968484,"87":0.5029568484490443,"88":2.3808591006514304,"89":0.5162387740150324,"90":1.90458361162698,"91":0.33056597086523704,"92":1.6606093751880826,"93":-0.4193104393942392,"94":-1.8723382637696624,"95":1.4425223736909465,"96":1.697355188729473,"97":1.574412288095502,"98":0.5320560989734058,"99":1.3023390639652666,"100":-2.2459412070764824,"101":4.0495443748412745,"102":-0.8413451927639158,"103":-3.65880035761991,"104":-0.10129809240396531,"105":0.5252182761957993,"106":0.5437352442011286,"107":-1.4775157734897593,"108":-1.1943872806941498,"109":-3.631131534247609,"110":0.131032471620541,"111":2.9129939676477603,"112":-1.1501110559076504,"113":2.3802315382003556,"114":1.7014829458162495,"115":1.3982068836912227,"116":-7.193796908362888,"117":-8.492191583364235,"118":-4.091947553872139,"119":-1.6530946271100435,"120":4.429945507136897,"121":0.5991090246835375,"122":-2.208681182589207,"123":0.3802665254874608,"124":0.0019203401702529562,"125":1.3505408148657798,"126":1.7962042958683624,"127":-1.9033271280378474,"128":0.8762615731490836,"129":-1.591810650060292,"130":5.622135702695643,"131":0.6687997763288259,"132":-2.1664161214175164,"133":0.3923736827092284,"134":2.7409471506082084,"135":-0.3471346287214931,"136":2.179744457025296,"137":1.8503985813403399,"138":4.047477872629288,"139":-1.57314994768879,"140":-0.4200244973814124,"141":0.7353666237764589,"142":-5.112279022531803,"143":1.9616895160515355,"144":-1.7986117448855237,"145":-0.2012564185345948,"146":-4.468362452985526,"147":-5.198628345795566,"148":-2.27747981214592,"149":0.9470077056071445,"150":3.724161946308221,"151":0.27938412134043933,"152":0.7293544847823904,"153":1.590555256438565,"154":0.6218750900588368,"155":0.7195949941469454,"156":-1.2967788802954714,"157":-3.907946823146576,"158":-2.747261777323102,"159":1.751850716811068,"160":-2.1367592932787605,"161":-0.8519165139392104,"162":-1.0641660107286448,"163":4.5404419698880165,"164":-0.6925068547931165,"165":-1.2864050743373987,"166":-0.5370532523514605,"167":-0.22911766157911406,"168":-2.750031062785831,"169":-4.968578666642523,"170":-2.1880796749181086,"171":-1.8416585767809985,"172":0.13491216703460912,"173":-0.9401024357349143,"174":-0.7010782897238577,"175":1.2915275878885746,"176":0.12510328114304053,"177":2.557711156144425,"178":-1.397594538241114,"179":3.0967077527224474,"180":0.6390878940141316,"181":-1.3329232950388001,"182":-4.446402718516989,"183":5.542854067339074,"184":0.6514105863111087,"185":1.7870135114894057,"186":-0.9295729361847345,"187":-4.727381347308599,"188":0.7212437487037926,"189":5.01493512725065,"190":1.2611708228018264,"191":0.5913188131589691,"192":-0.9846336315660976,"193":0.48460452508957735,"194":7.109794100724375,"195":1.9316540782794231,"196":-0.6412571816740977,"197":0.09619113466778033,"198":-1.4670235547531219,"199":2.0739270032815407,"200":2.300666602322758,"201":0.16255336113780627,"202":3.922454823250597,"203":-2.4336436562410624,"204":-0.1170436096230458,"205":-4.990456589609211,"206":-3.8875266283238448,"207":0.20728214468578948,"208":2.7458390632269656,"209":-5.230594566044238,"210":2.4124068669842833,"211":-4.405909610850019,"212":-2.3345222192731696,"213":0.20191095002647802,"214":0.0789971340095325,"215":-2.1221220605716837,"216":-3.6126248090341333,"217":-4.043340313576981,"218":-0.4584750711382321,"219":-0.521268668174883,"220":11.587039308608263,"221":1.68899671810283,"222":-2.745269636902116,"223":-4.254395309882091,"224":-0.541872293147193,"225":0.979680503312635,"226":-2.2303651621869824,"227":-3.644876356564056,"228":-0.9110192429327392,"229":2.455975049651661,"230":4.309065599521434,"231":-3.2313147118619954,"232":1.6534790438087978,"233":0.4035618690494296,"234":-5.870518805707141,"235":1.0511522323084344,"236":3.9123213370762673,"237":-4.028809634860146,"238":0.0728876200628571,"239":1.704727934215982,"240":-0.6886202043103926,"241":0.5227657000703863,"242":1.9188907920001423,"243":1.1712939199859314,"244":1.7094633873597418,"245":-2.756212439197408,"246":-3.9643518427438695,"247":-6.069065195257388,"248":-4.346113660413113,"249":-1.0615745315983023,"250":-1.2253797024324389,"251":-4.112104722431309,"252":-0.7438464072205374,"253":0.3108078883630452,"254":0.8658447015156919,"255":-1.5328788279091994,"256":-2.6101070736385794,"257":1.1211190912400735,"258":-1.8093154132557816,"259":1.0147488416588617,"260":4.028730398181002,"261":-1.0602265424613249,"262":-3.913563266969232,"263":-5.424150465915206,"264":0.81093782309133,"265":3.4538265706425535,"266":-1.3704370294428936,"267":-4.306068248350355,"268":-3.941334452361551,"269":-2.9508031461885222,"270":-4.391442550139963,"271":-1.0159186620257907,"272":-2.327705652621391,"273":-0.9401155803671442,"274":-4.017844935256726,"275":2.681955722352727,"276":-2.442082973939752,"277":-3.231573335594241,"278":-4.122228414136905,"279":-4.4158318157602405,"280":-3.747898705503133,"281":-2.251641573973013,"282":-6.482591620938876,"283":-3.1538935893873337,"284":-2.5813610168860808,"285":0.07306487778213183,"286":-4.55945656061073,"287":1.8635215368063678,"288":-2.4188523437077722,"289":-1.3884426284688682,"290":-0.6876051192769729,"291":3.103968844387855,"292":-0.49584253115801885,"293":-0.7664704850791699,"294":-0.8692520766311291,"295":0.331629641669386,"296":-0.6175144380397354,"297":2.0930772914241844,"298":-3.154330423461813,"299":-0.02965169557571454,"300":-0.11050088696421383,"301":-1.3166570637758943,"302":-4.985793270083793,"303":-4.155348585715865,"304":-3.65263191232558,"305":-2.1821061719317463,"306":-2.600799814807596,"307":-4.9961313266638845,"308":-0.576550439764213,"309":-3.027088503644216,"310":-0.9474783452708635,"311":-0.8899027088227669,"312":-2.844360295738725,"313":1.028290669793399,"314":-2.9968878667736236,"315":6.530009830655999,"316":5.3568712125967854,"317":-1.9105259888383646,"318":2.101892403411131,"319":1.6393972427299424,"320":7.389971459065342,"321":8.942549985714182,"322":0.26462981117136347,"323":-1.661344107324951,"324":7.763435072700483,"325":6.7026885991317755,"326":7.499036962573141,"327":-2.7170752110013496,"328":5.198412838211442,"329":0.2135177582503847,"330":7.640813077489906,"331":5.970871530053473,"332":-1.5420048536860949,"333":2.243397257292528,"334":6.163592237410736,"335":8.673931742133483,"336":2.0171293317741026,"337":3.5458529542493826,"338":-2.1785108326291707,"339":5.200261440925166,"340":5.129250402028813,"341":6.5354925551726835,"342":4.2639506225702295,"343":-0.329863657022151,"344":-4.358820138557931,"345":5.176949079442698,"346":6.417728597309588,"347":5.760433394958489,"348":-2.2224569599009447,"349":1.1468445805719336,"350":3.8469192549513944,"351":3.160161355674222,"352":3.968977921836365,"353":3.9950939578236224,"354":2.1247162322837956,"355":5.431722594159897,"356":6.865391838504947,"357":3.1168294501747553,"358":-0.09894555370074089,"359":1.1686471702345158,"360":12.208098236532122,"361":4.445419766041308,"362":5.71548409752246,"363":-0.7526652854087531,"364":-3.001022788880311,"365":0.8208345176895586,"366":-1.0756199025444462,"367":-1.6875057648174454,"368":0.5187514568321946,"369":-4.07409359397041,"370":-0.8045458401397778,"371":-4.395615181274889,"372":-1.3129180909013318,"373":0.20312252520222088,"374":1.8154188537863312,"375":-3.4860723806143197,"376":-2.1865165028324225,"377":-3.5652994619400302,"378":-1.0365915255675864,"379":0.37392867639384525,"380":1.5669833312708306,"381":-3.2207264593542533,"382":1.7023303066798512,"383":-3.699705992361686,"384":-3.6668824477001962,"385":1.5237701131990293,"386":2.23552636853952,"387":-2.330787466427331,"388":-0.6547502918066112,"389":0.37116342491634907,"390":-0.6535713266826189,"391":2.644148414246132,"392":5.7102514662723305,"393":4.133501791461386,"394":4.600469229398702,"395":-4.277400118548643,"396":1.845299749070181,"397":6.78962191602089,"398":7.325267304945324,"399":5.855661121078707,"400":3.936715202900493,"401":-0.628775858382319,"402":6.141077990282768,"403":4.596951837532833,"404":5.810416320408367,"405":-1.355916411840667,"406":-0.8029409142897752,"407":6.225305163383786,"408":5.2791103132510955,"409":8.932798208057502,"410":-1.9471317059979976,"411":4.418932210765641,"412":8.300012594520833,"413":5.122155335776872,"414":3.9041051730061516,"415":-1.3682752593448706,"416":-2.137997871750861,"417":-2.10434433135779,"418":1.7649171088116555,"419":1.7299788536279206,"420":0.9195489252998476,"421":0.6328071960902113,"422":0.8199249127037416,"423":-2.5312530244294535,"424":0.6080494394348356,"425":2.2172034710620125,"426":3.7236164747474314,"427":2.263054869635906,"428":6.098007157261629,"429":8.965488932729073,"430":2.6100535269556406,"431":1.7380302646003374,"432":3.3230371067460744,"433":-2.1096801495684416,"434":-1.627925011640428,"435":-1.4492539303556846,"436":-2.464641610240155,"437":-3.474563800244368,"438":2.365661476532491,"439":-0.8564344458735477,"440":-5.728811733862026,"441":0.0421611480752396,"442":2.1969437834890533,"443":-1.1606267574267277,"444":0.30934766814648085,"445":3.131841501526115,"446":-1.3937744824464313,"447":-0.0041020560254794135,"448":-7.031331373049832,"449":-1.7946027115683507,"450":-0.13513125717194355,"451":1.8254500962502442,"452":-5.805184727656951,"453":2.7155936862334085,"454":-5.269607440366402,"455":-0.9661125354872273,"456":1.762019637217367,"457":-4.208282423021887,"458":1.1646230849868051,"459":-2.2622221455551377,"460":-0.1784389221162906,"461":-0.6243243058348219,"462":1.0823275063445135,"463":2.670430014499669,"464":0.9379638281869056,"465":1.9129877394636479,"466":1.976977462667968,"467":0.435237415043508,"468":-0.8020408016268222,"469":-0.5063045981313367,"470":-4.1925199635114065,"471":-2.412573039204516,"472":0.5776190648256171,"473":-4.538545181034352,"474":-4.865015159212515,"475":-2.449313788364508,"476":-3.4384084440178646,"477":-1.3712083282730825,"478":0.7750686592040172,"479":-2.0570142727256258,"480":2.250087773807345,"481":-2.4138870133995183,"482":-1.9312802819283508,"483":0.9337652150552552,"484":2.2784031796715656,"485":-2.08094311174721,"486":-1.8097339154213725,"487":-2.617327096023764,"488":-1.912743262140752,"489":0.1987673495570826,"490":-2.3290206340477404,"491":-2.4942940148054813,"492":-3.8724634513421545,"493":-0.7028610278376315,"494":4.500061529811005,"495":0.3968527743690697,"496":1.8300698618038427,"497":4.1545591256206125,"498":5.9540250710721505,"499":-1.536753621060612,"500":3.838424953743928,"501":8.139714362509368,"502":3.693730328515378,"503":5.954398875538756,"504":-5.776551379690011,"505":3.3253486921703,"506":3.535426108572185,"507":3.17092693519589,"508":3.966989187648653,"509":0.794258947524225,"510":-0.184182171529062,"511":0.20956744328864674,"512":-1.4873111213023102,"513":3.24545202753121,"514":1.2316418985723026,"515":-2.991077370400246,"516":-2.454828750232232,"517":-1.1250997488224137,"518":4.766456799646687,"519":-1.7299115622950219,"520":-2.8650826531659392,"521":-3.397609364529292,"522":-4.515174032508195,"523":1.8373739135412073,"524":-0.5372457317625651,"525":-0.08999534367810502,"526":4.970877623985703,"527":-4.133165599105871,"528":0.4642994665903074,"529":1.381941747677791,"530":-1.396777299310262,"531":-1.334386969173002,"532":-2.3489490329370146,"533":-6.194010203838969,"534":-1.8717738118791698,"535":-3.807049938319731,"536":3.2629669986228595,"537":0.23129740019430362,"538":-2.287450073605883,"539":-4.212683164283549,"540":-5.745712663506714,"541":-1.5770638997557191,"542":-2.489155884047935,"543":-1.1004303496039676,"544":-1.7244178718093566,"545":3.058831680428099,"546":-0.7339002917699258,"547":7.0991230631399755,"548":-4.624925662366492,"549":-5.484024722584641,"550":-4.085511033987298,"551":1.5372574281557145,"552":-3.5264310046662533,"553":-6.743820886206409,"554":-7.093129664837115,"555":-4.161446845077192,"556":1.5616317088770653,"557":-1.0756203771208945,"558":-2.1018175379072646,"559":-5.726441970522039,"560":-4.216190147083492,"561":-1.5229921220562952,"562":3.2872633254700516,"563":-6.797070802876847,"564":-5.844165587932704,"565":-5.8037029424418725,"566":-5.131400564530527,"567":-3.078744469982387,"568":-4.972718189199992,"569":-2.828013291946448,"570":-1.986114747424649,"571":-2.4799398593418593,"572":1.301746295129999,"573":0.3639903295864274,"574":2.3746091802448253,"575":-0.43559806370166504,"576":0.9620720451085081,"577":-2.02844584437028,"578":2.579699707532991,"579":4.859832980897646,"580":2.215704164674109,"581":-2.159847298762288,"582":2.7126416695200124,"583":-3.9694910897403273,"584":4.4230720619000445,"585":1.0109869828560725,"586":3.3586969698760005,"587":-2.9583842302128187,"588":-3.42278617783512,"589":2.1915641095745575,"590":-4.517461486064871,"591":2.667710480371085,"592":1.3059030690282436,"593":2.081162310010264,"594":-3.24071570890204,"595":5.515630489905074,"596":1.8498001524990741,"597":-2.2713781647356,"598":-2.762630453405854,"599":1.881611596268356,"600":4.670756980549209,"601":-3.244112108404963,"602":-2.232112466983983,"603":2.5073128861314626,"604":2.257153486499577,"605":5.4325511247758955,"606":-0.3722725830756591,"607":-1.1325804064614005,"608":4.84937823051322,"609":-0.16777169673244674,"610":6.391857607580651,"611":-0.6225047693752689,"612":-4.5264271330493715,"613":1.4012136251514276,"614":-4.662452732545771,"615":0.8106153711941083,"616":-7.230520659568835,"617":-2.9131252503466776,"618":0.5140220236234543,"619":-0.6368096461155233,"620":-2.004566728425374,"621":-1.6612775502422554,"622":-2.6442918876884076,"623":-0.3289271329724232,"624":-0.3524035694778641,"625":-4.404149145124219,"626":5.542104095443307,"627":3.5614931787287496,"628":-1.5348732170661445,"629":0.6895287795790587,"630":4.677141017555834,"631":0.573844007433945,"632":2.5673076529455447,"633":-0.6052098397368639,"634":0.8261388014069021,"635":-1.4572200303200082,"636":-12.261896253582098,"637":0.3133769788087249,"638":2.1010074247137545,"639":-2.4420598547246044,"640":-4.057243351553728,"641":4.419996270573888,"642":0.06827588956237556,"643":-3.339892297196694,"644":-0.4959246488278399,"645":-0.399554078301166,"646":-1.9075904096504503,"647":-2.202417041313386,"648":1.4704856669170123,"649":1.9731443621869027,"650":0.9844777597415685,"651":-1.3627068398055973,"652":3.9499798955149656,"653":-1.782822255559635,"654":2.3809802108748874,"655":5.460729798272895,"656":3.953378072818382,"657":2.6861019569476383,"658":1.4478062815676984,"659":4.023380709087223,"660":0.7472561974328444,"661":0.7831376813839591,"662":1.3173967455924473,"663":-0.3983796720709339,"664":3.885371212980121,"665":0.7619027952550493,"666":-2.1263832610591447,"667":3.7799205308177353,"668":3.387382999290133,"669":1.9455717050309986,"670":6.275103365870085,"671":2.5422708630548883,"672":0.931067222864687,"673":3.5096180247119775,"674":2.413292709607425,"675":-0.5124104234853772,"676":-3.255446902519671,"677":2.4725413040712168,"678":1.6937868831070546,"679":5.52572445280014,"680":3.6949969991644207,"681":1.6781728307326818,"682":0.08190857024006407,"683":5.187883998033047,"684":5.382717369117975,"685":4.186676020834975,"686":7.081780653737102,"687":-2.1825426592834543,"688":-0.4045180761088158,"689":4.377956376230324,"690":4.454574238426974,"691":-0.09856093238807202,"692":-1.9653134877498708,"693":0.3580100822250917,"694":5.785801484288092,"695":4.551913701419717,"696":1.603155825437991,"697":0.613685324882035,"698":7.041774371474818,"699":4.863785929330981,"700":4.704601196608716,"701":-0.7544975336334621,"702":1.2732884282113717,"703":-6.64929774981152,"704":0.5583280562477186,"705":1.1753899685174738,"706":-1.2524258876687535,"707":0.8890982796680703,"708":1.9612434664511966,"709":-0.975330675620869,"710":-7.384048588269521,"711":2.306142547157455,"712":2.1159784443310707,"713":-1.3279018134490757,"714":3.3410858753817765,"715":4.60854605259778,"716":2.0513032521247316,"717":-1.8873436550511122,"718":-2.6931316584433977,"719":5.343438103213399,"720":4.5071268379259735,"721":-1.9998761692267792,"722":-0.1568834353700486,"723":1.056501930225066,"724":0.40814439213692416,"725":2.6738584314567717,"726":4.105395850997506,"727":-1.1498228731213895,"728":2.9352894869574686,"729":-3.7355462198761615,"730":3.198905694051807,"731":4.788479433236022,"732":4.728407303712231,"733":-0.30745131136761744,"734":-2.5225699812241626,"735":2.689350520146613,"736":5.687200733998357,"737":2.410275785349687,"738":5.013775332498715,"739":-3.164903814693143,"740":1.584475452342056,"741":3.2624001366622446,"742":3.182316375386448,"743":-0.2836692914690226,"744":-2.086907910781411,"745":1.9301165548363415,"746":4.586256843611984,"747":4.955680009077953,"748":1.7569638604079487,"749":3.476642619785103,"750":-1.832073537364069,"751":4.097682009490039,"752":4.138054574242118,"753":-2.0033733911937928,"754":2.4093933478518146,"755":-1.5732130283680512,"756":1.3771240985936302,"757":4.58800737350672,"758":0.15991653053888102,"759":3.029591091170344,"760":0.22260621555325455,"761":3.6426172340648204,"762":6.3399851188477685,"763":-0.3126758364278418,"764":5.293650818322053,"765":-3.072911010697832,"766":4.285216805444907,"767":0.10048876441585108,"768":3.321029410484824,"769":1.836331244338966,"770":-2.6112407857446827,"771":0.9611523481029645,"772":-2.230626740716858,"773":-0.5346092126604809,"774":2.348798369743665,"775":-1.8918969359653965,"776":-4.556952515088679,"777":-2.8849103149654,"778":2.463971431685804,"779":-0.8389834133491587,"780":0.14934564088788907,"781":-5.48862471452261,"782":-0.7956259181441089,"783":-1.0106571426611062,"784":3.8983681526257934,"785":2.387616676739802,"786":7.547210269111519,"787":-1.3186665586666562,"788":4.166034837320865,"789":4.535777936487698,"790":-1.1538683575726072,"791":2.5818319052800907,"792":-1.3312290943973104,"793":3.265873597616746,"794":2.87695633009747,"795":1.9518067425089523,"796":3.0946792549355444,"797":1.3405407735115378,"798":0.8708672465459153,"799":5.610678905702072,"800":-1.8099014884151867,"801":2.455567589331197,"802":1.082968588965251,"803":2.190487671676526,"804":3.8132774533754414,"805":0.017546481050660673,"806":1.4550278346695387,"807":-2.2251653479690847,"808":3.005535529429911,"809":-4.356233603983341,"810":0.6640195202388743,"811":-2.861989684120841,"812":-1.9161289062898175,"813":-3.375570285458282,"814":-2.4325428315113786,"815":-4.4350315100083995,"816":-0.03710302672815301,"817":0.5472906758762126,"818":-2.173570778008965,"819":-0.8885136206848011,"820":2.1974736382319087,"821":1.8515288876270826,"822":8.088400139969286,"823":-2.6907363578949606,"824":-2.162734643770591,"825":-0.006646525074361772,"826":-2.340214637793368,"827":0.13439108848942338,"828":-0.3054806402189031,"829":-1.1146112646570825,"830":-1.8112914009106187,"831":-0.021761577410706032,"832":-3.8765234659916024,"833":3.3803746512226325,"834":-5.550683845070635,"835":-1.7121582152858015,"836":0.3506665576871782,"837":0.30045988592001305,"838":-2.1204898394698692,"839":-5.902967104375159,"840":-2.821266992145108,"841":-2.666400970155746,"842":-1.337375541869565,"843":3.764655874401898,"844":2.88953745907637,"845":0.10987643926923166,"846":-1.7238108341148353,"847":0.009427737034350042,"848":-1.2061512900946347,"849":-1.715892923229957,"850":-3.369401545831348,"851":-3.0799158387707974,"852":-2.505242187507792,"853":-3.7232487026186107,"854":-3.9515262739574943,"855":-2.6796744799488375,"856":-3.625364621062059,"857":-0.9424595799665842,"858":-1.878706043187645,"859":-1.8946596943019762,"860":1.3112161494558872,"861":5.449837976662215,"862":6.217662797414251,"863":-2.1582021996325755,"864":1.9625849131600954,"865":3.1710423884531678,"866":5.425612161269491,"867":3.850027492630885,"868":5.185286221209132,"869":2.615414048528439,"870":4.755559477980042,"871":5.402665970180759,"872":4.8910696278884656,"873":1.1898435713462325,"874":-2.199502251631984,"875":-5.902458785449025,"876":1.4097753815598058,"877":3.8855605120743597,"878":-1.5848314364358829,"879":-3.88691429811085,"880":-1.1406433836911825,"881":0.6236107508063118,"882":6.50334268392052,"883":0.2545829378593203,"884":-0.11171535625100772,"885":-0.11047451818482443,"886":0.6415377062338978,"887":-2.8118445158495042,"888":2.2951041383072734,"889":3.586865548476511,"890":-4.332231505150152,"891":-4.325910642591456,"892":-1.4568284775076146,"893":0.5363544094196947,"894":-2.656914677100883,"895":0.8679411396921641,"896":10.703838631956334,"897":1.2622007234760488,"898":0.667919276621024,"899":1.7994947015669085,"900":-0.8462110963089293,"901":-4.029486656018605,"902":-0.8195919052933848,"903":0.39371981653606736,"904":-4.108980734284305,"905":-0.7016302865443071,"906":-1.4764580628139128,"907":-3.4586126069255174,"908":-1.0491945993288068,"909":-0.5234321949545697,"910":4.526016341288025,"911":-0.26499257815241417,"912":-2.066576311162645,"913":-5.298119510916256,"914":-1.6832062086276536,"915":0.7791306736926503,"916":-3.0529700565881392,"917":-3.4333510994227314,"918":-1.254681865645668,"919":-5.548007073050386,"920":-0.03954948078379822,"921":-2.387719343370884,"922":-4.918678824582335,"923":-3.7783950545543457,"924":-6.735751573810601,"925":-6.652667199996617,"926":-4.292354400772518,"927":-1.4935042804614476,"928":0.38349056719477553,"929":-4.503328815031592,"930":-3.3370065003283957,"931":1.4328941063575757,"932":1.5527243425071573,"933":-0.7693907673973771,"934":0.6956843802893447,"935":-0.8323594017826601,"936":2.4735371481032855,"937":2.214512954476894,"938":3.367038515414467,"939":-1.267482314910214,"940":-2.12559215827224,"941":-3.94049165939842,"942":-0.43158634836815507,"943":3.752265913230395,"944":0.3097958851977494,"945":-3.876793442996771,"946":-2.0319344885356814,"947":0.5579433571972859,"948":1.4959200381739022,"949":-1.8776824298276822,"950":-1.3387476720965206,"951":-2.2676540608836384,"952":-0.8177506747454234,"953":0.09848289854258616,"954":-3.4047132048263697,"955":-3.7665896947720214,"956":2.4703665218713033,"957":-0.06306853746426226,"958":3.2300574608641406,"959":-1.6187109215515572,"960":-3.248397242561992,"961":-6.177736072026626,"962":0.6058398294237979,"963":0.597352480389389,"964":0.8254590606778722,"965":0.29987958769703565,"966":0.41279843581559184,"967":0.3801016173029124,"968":0.11212493689120756,"969":0.3635906540821187,"970":0.7293206832214086,"971":0.5536049929442804,"972":0.7058372681796057,"973":-0.20774404536770152,"974":0.8677014748648009,"975":1.1384252414851046,"976":0.7524897434420562,"977":-0.3606065485521647,"978":0.3358194204713829,"979":0.1419626810649608,"980":0.164320578746461,"981":0.32089019575149,"982":0.9431715426166404,"983":0.25486491256771904,"984":-0.3211374051045552,"985":-0.2989837989062188,"986":0.7663857289946855,"987":0.405717334802984,"988":-0.370155918936856,"989":2.542467943248582,"990":-2.3742427212144155,"991":-0.6157779206667346,"992":0.10210922323717748,"993":1.6141094765220898,"994":-2.7324393566518292,"995":0.4967347599420162,"996":0.9887086238143542,"997":-0.07587702701271178,"998":2.7083731166528056,"999":0.9612906253220507,"1000":-4.581784885093118,"1001":-6.277586865927712,"1002":-3.3881732006483283,"1003":2.8546040249536255,"1004":0.03582568364700073,"1005":3.9438906753276615,"1006":2.7512296186151017,"1007":-2.7623268437779918,"1008":1.111938083719469,"1009":0.34532689867803656,"1010":2.6627839455285454,"1011":2.526478924510475,"1012":-3.1028524919023157,"1013":-4.238988823785996,"1014":0.4461853091100178,"1015":-1.7083163145317861,"1016":0.6643483967765611,"1017":-5.609648283189656,"1018":-7.795586034489505,"1019":-5.216946814216791,"1020":-4.229917726877944,"1021":0.6064907508722762,"1022":-5.032687372163885,"1023":-5.153406763471763,"1024":-9.297868159825738,"1025":7.345097952326075,"1026":0.26388391208726175,"1027":-6.911075005777444,"1028":-4.600706712935345,"1029":-2.633970609260369,"1030":2.564064324108599,"1031":-8.372949029458074,"1032":-6.524904793361,"1033":-4.393014697654827,"1034":-2.0684622465463414,"1035":3.3265043687192026,"1036":1.2048214048528383,"1037":-6.907037087170569,"1038":-7.281504199213943,"1039":2.2312655794151155,"1040":5.714928635756736,"1041":-3.447586572748855,"1042":2.5619263081665955,"1043":0.221193072725625,"1044":4.094551149919747,"1045":-0.7444910466304189,"1046":8.845243394972188,"1047":0.8083054167877066,"1048":-3.7602786350307786,"1049":-1.5263477713056377,"1050":-2.4499367944782287,"1051":-0.6584880301958153,"1052":-4.507958687264018,"1053":-4.085308122860203,"1054":-0.6400256971814595,"1055":-1.0406389828292035,"1056":-1.794956430607734,"1057":-1.2102329469929367,"1058":-1.0668630524975027,"1059":0.10431172228097386,"1060":3.395746244777432,"1061":5.075273783052335,"1062":3.5661140815054555,"1063":4.311751286712034,"1064":-2.313358098233284,"1065":-0.4265396888086254,"1066":-2.168086531682173,"1067":-1.8606458359675435,"1068":-1.1445436945369096,"1069":-2.0294257224149868,"1070":-5.250609682961371,"1071":0.0716622039542768,"1072":1.2160891533662428,"1073":-4.5170218244636775,"1074":-4.30472528832497,"1075":-6.557099253254511,"1076":2.7454962243561987,"1077":2.819216746996095,"1078":-0.5841919772480386,"1079":-4.314908429424232,"1080":-5.180027771566154,"1081":2.2556714971767233,"1082":0.33305089522855996,"1083":-1.4686061441925855,"1084":-4.276553730297069,"1085":-3.108043918379358,"1086":-0.6512641036951499,"1087":0.3567798992062662,"1088":0.21243793084703,"1089":-5.229264207513572,"1090":-1.8037079051678246,"1091":-2.3861268611645485,"1092":-0.40228566914970637,"1093":4.607385568867096,"1094":2.8150292984434873,"1095":-1.631874510143824,"1096":4.729122043853622,"1097":0.2200644245458001,"1098":0.3147372012905017,"1099":1.3352952921856014,"1100":6.044403087431167,"1101":5.7471017780781235,"1102":-2.124165725526548,"1103":-1.5456065857872818,"1104":9.826535558366981,"1105":2.4464325587711135,"1106":3.8355792207518395,"1107":-2.1971192425879114,"1108":1.7681149051308143,"1109":5.372245377051569,"1110":6.081465276886158,"1111":2.283720427914855,"1112":-3.510323513535026,"1113":-0.36038847653263323,"1114":6.991928258834845,"1115":4.236696298885472,"1116":4.569918990169997,"1117":1.1957170653897313,"1118":-1.9360024901215738,"1119":-2.0794049086116835,"1120":-0.5057750893903483,"1121":-0.15944340527171708,"1122":0.4944141473198978,"1123":-1.5358082940254787,"1124":4.332594637638222,"1125":9.07656337957692,"1126":-0.7794226710320896,"1127":1.259088214311114,"1128":-2.4020766880208875,"1129":4.897362802833898,"1130":-2.5395179759762505,"1131":-2.389392445944319,"1132":-2.3602547320390856,"1133":3.6133242872958076,"1134":2.89541572271278,"1135":0.41884500425066107,"1136":-2.7755425904908364,"1137":1.748114353195885,"1138":3.4227211183958293,"1139":-0.3829004871746842,"1140":-3.4850301111457855,"1141":-0.5726959961121891,"1142":-3.569788066803507,"1143":0.32407036613311746,"1144":-3.7148980935165006,"1145":-0.19488411692576088,"1146":5.501552902707943,"1147":7.983781851105105,"1148":6.371948803119176,"1149":-1.6215522561940656,"1150":0.12865593711183376,"1151":2.872391361969349,"1152":1.350590016130889,"1153":5.582419252435653,"1154":-5.527564434064569,"1155":2.6638073941595186,"1156":3.1221097847693473,"1157":4.18221857697491,"1158":4.816628392152399,"1159":1.9178413085607695,"1160":5.920662956000407,"1161":6.401786642304171,"1162":6.289364463364497,"1163":5.3137278134883275,"1164":-4.003092981829734,"1165":-2.896744674327452,"1166":1.4253355287808904,"1167":1.2735740745846102,"1168":6.873933622154851,"1169":-0.30643738799775916,"1170":-0.36732398087232315,"1171":-2.0218069303906936,"1172":-0.5962795874802727,"1173":-0.21948012089637423,"1174":0.9826305318602734,"1175":0.6029478442528844,"1176":0.31887523854276706,"1177":3.030536927635803,"1178":3.1326929844031377,"1179":2.401515405346898,"1180":-0.9630328786534278,"1181":-0.27707183541284813,"1182":1.0112981570438653,"1183":1.890236126391953,"1184":2.567239467386875,"1185":-0.9525828214911164,"1186":1.6409274640014893,"1187":-1.669514528424057,"1188":-2.374916926632596,"1189":-1.4696638564993212,"1190":2.359698597241935,"1191":1.9190497466548921,"1192":1.9474932401228846,"1193":1.9415908647376536,"1194":-1.6815163694410595,"1195":1.4545355470199646,"1196":-4.419244658151962,"1197":1.9217791839867917,"1198":8.405688650657648,"1199":5.0106389789160275,"1200":6.645812646209922,"1201":2.773998018023869,"1202":0.6333605411948168,"1203":-1.1028544780623226,"1204":4.581898348254116,"1205":4.108366097457585,"1206":3.511626019309362,"1207":0.2075774910452199,"1208":-0.15786590727693142,"1209":5.858079448107687,"1210":4.727525353055258,"1211":0.8615226963441663,"1212":0.02781158835831553,"1213":3.4940366503393667,"1214":6.910620237750805,"1215":3.8984883842231457,"1216":-2.512977789714382,"1217":-6.984828283324705,"1218":-2.1209486210796245,"1219":5.564005760790308,"1220":4.922463764424044,"1221":0.2458893624518231,"1222":1.3181625327379158,"1223":-3.343391056472539,"1224":4.475081398956561,"1225":-0.9824438577793725,"1226":1.5817823359642016,"1227":0.4884698427159844,"1228":-0.15197740096653636,"1229":3.0825487325385357,"1230":-5.242727658935292,"1231":3.1966320829510733,"1232":1.4479223878873484,"1233":1.307084266854264,"1234":3.244882211935609,"1235":0.013350954097472289,"1236":-2.2190955402460206,"1237":-1.028889746728677,"1238":-2.091407932139955,"1239":-0.47820804737402633,"1240":0.35211282083410683,"1241":-0.049116136149305996,"1242":0.4913270004179588,"1243":-0.8711556580691646,"1244":2.0475023273526114,"1245":-1.4170942423029012,"1246":0.4975389665787778,"1247":-0.1983558593077528,"1248":2.5376959025010017,"1249":3.8251227059192163,"1250":4.076943489570094,"1251":1.0931710439430342,"1252":2.1516322026373547,"1253":2.6505046183301535,"1254":2.7790897204313425,"1255":6.533990706947272,"1256":4.7778366906672085,"1257":3.4604540348760127,"1258":3.224903627389299,"1259":2.656621244514044,"1260":-0.32413578090799217,"1261":-1.4767543089121595,"1262":1.2642544210369875,"1263":1.0712551854971615,"1264":2.2978246534408977,"1265":-1.5688362622027967,"1266":1.1583266759842854,"1267":-1.4587979054420208,"1268":-2.1763849941106304,"1269":3.718011528391677,"1270":-0.9633987765929707,"1271":1.9328112057520783,"1272":1.4950279197149794,"1273":-0.5259045093896977,"1274":3.515524904526942,"1275":-4.903934731303603,"1276":-1.6930542111899294,"1277":2.398579518778772,"1278":-0.8225181392412756,"1279":4.136776960877104,"1280":-5.322118438482782,"1281":-2.1043400554551397,"1282":0.23570358783303264,"1283":-1.5964821105380294,"1284":1.9874373285546556,"1285":-4.836539638549181,"1286":0.7937891368007325,"1287":0.6490156236928639,"1288":0.6115174994738743,"1289":1.910531559932025,"1290":-1.8000731264380556,"1291":-0.05502629964058057,"1292":-2.204352030262712,"1293":0.8456588755327442,"1294":2.955090855033223,"1295":-3.514122846096759,"1296":-2.3386986750328105,"1297":0.5872827727791062,"1298":2.5993650886450874,"1299":0.34093742171461844,"1300":4.752688647570828,"1301":4.729493881306772,"1302":0.4373663947687259,"1303":6.099066452731076,"1304":4.91321338528078,"1305":-2.4266682804863655,"1306":8.435694606444914,"1307":6.258110349249696,"1308":5.042234816465355,"1309":7.9995243721159035,"1310":-2.022430422936284,"1311":5.1756256306802,"1312":3.356286046469281,"1313":7.986987719248909,"1314":5.725954910127104,"1315":0.9545687080306857,"1316":-1.7113885688285089,"1317":3.1916263754108516,"1318":5.6069426219383285,"1319":5.239198308026746,"1320":-4.288976096263567,"1321":-0.7056712458381268,"1322":-3.722480839115145,"1323":4.022914621825927,"1324":6.4513207462950515,"1325":-0.574621452116071,"1326":3.688254626652509,"1327":-4.288741023479272,"1328":-1.7859066434820963,"1329":-8.36251326143485,"1330":-6.607590644162365,"1331":-5.3634634473613705,"1332":0.43196756199468295,"1333":-5.10787421933648,"1334":-5.930305331573967,"1335":-5.049334437603403,"1336":0.9308567428636638,"1337":0.7176201056387415,"1338":-3.2328268375238514,"1339":-5.562441558306524,"1340":-6.236120123993796,"1341":-2.5408655156907725,"1342":0.4619919313961593,"1343":-1.5864919441879393,"1344":-6.199468766666099,"1345":-6.234786448752136,"1346":0.2716065801648291,"1347":4.57144050822366,"1348":-2.6031471877834367,"1349":-4.996466200080304,"1350":-3.083330443097211,"1351":0.06397999165281104,"1352":-1.6398798869016025,"1353":0.8434524902574184,"1354":-1.300194545386676,"1355":-1.366528776421852,"1356":-0.7195532801164307,"1357":2.06381149102399,"1358":2.144361672726297,"1359":-2.6053307032906052,"1360":2.6907272727468023,"1361":2.630493316957161,"1362":-2.2682161740928835,"1363":1.1805291071968547,"1364":-1.0388426795981847,"1365":1.4448983042412917,"1366":0.46210121798027654,"1367":-0.9823904308753408,"1368":3.1280830888539946,"1369":7.791143838019138,"1370":4.992397143332052,"1371":-0.2595218745133939,"1372":1.257053335169329,"1373":-2.655739124623119,"1374":-2.6544163059638506,"1375":-0.7047026634848257,"1376":3.4735017033307445,"1377":0.3512989870741379,"1378":3.7294441449180185,"1379":-0.022972491312517104,"1380":2.8831161323079644,"1381":-0.8464002969689323,"1382":-7.365505972563735,"1383":4.9491940622916415,"1384":-0.26647591958580397,"1385":-4.4651170605935,"1386":0.9391913802095575,"1387":1.317338841675667,"1388":-1.7821967896550401,"1389":-4.401881916362138,"1390":-7.65643325862116,"1391":-4.232858044276049,"1392":-0.10704033168227982,"1393":-0.1549358066152322,"1394":2.6316121175584843,"1395":2.074784112056195,"1396":-1.6011593359580456,"1397":-2.681860667327706,"1398":-0.7672385546030871,"1399":-3.367555967582711,"1400":-0.09139825748064158,"1401":1.0188936505105857,"1402":-0.4322722240627567,"1403":-1.538233135628628,"1404":2.098222928274791,"1405":-5.488176887691016,"1406":5.3825989043282965,"1407":5.787407136660238,"1408":3.664477911606747,"1409":0.06423047884794943,"1410":0.9614630888547289,"1411":7.616892533131298,"1412":4.856336384982048,"1413":4.190245706241542,"1414":-2.9889449398311663,"1415":1.1910811771816863,"1416":3.6266856014412183,"1417":4.188769629544889,"1418":3.5585143140549134,"1419":1.169751640457526,"1420":-3.547054492316555,"1421":6.378609552670893,"1422":4.391349574271923,"1423":5.494578690952777,"1424":5.095610646832977,"1425":2.926416847213361,"1426":5.956763162170871,"1427":3.457285318021815,"1428":3.0629728155672855,"1429":0.6324295387374684,"1430":1.2666185673751142,"1431":6.119339275854576,"1432":0.07483676826846072,"1433":-7.0674200630970185,"1434":-6.280268292642753,"1435":1.2978560902138172,"1436":-1.1561424097500108,"1437":-2.9988644981660206,"1438":-7.0702545549524585,"1439":-4.364808993305959,"1440":-2.959423913755904,"1441":0.04089334852194683,"1442":0.8276091437005272,"1443":-6.557371904519228,"1444":-5.682365949021363,"1445":-2.6338957992317544,"1446":0.30940157274053914,"1447":3.262757373196367,"1448":-4.7659537902112215,"1449":-4.736996358862326,"1450":0.08935383944135676,"1451":4.703676739583748,"1452":2.039818557516089,"1453":-5.19400825338979,"1454":-7.463406927595463,"1455":0.7905733451811414,"1456":-7.298872033413606,"1457":3.4919191486542704,"1458":-4.360330821388173,"1459":-6.857556646984812,"1460":-4.2135688344407605,"1461":1.6936097058624506,"1462":1.8014855453231584,"1463":-4.571078490076155,"1464":-4.024161891565618,"1465":-4.110191218940273,"1466":2.4958175100355606,"1467":2.924625198974099,"1468":-3.72969735117758,"1469":-5.306289398338987,"1470":-4.4157630466242,"1471":1.8999021174743034,"1472":3.639537239017955,"1473":-6.894529120939869,"1474":-3.7900336029426653,"1475":-5.2684501023902,"1476":-3.30170123334324,"1477":1.5233756023456648,"1478":-6.032221931012291,"1479":-3.717204083340563,"1480":-2.832289968191147,"1481":-0.4348267529609365,"1482":1.764252632232145,"1483":1.785944087220014,"1484":6.724566099064108,"1485":-2.9187759906875987,"1486":1.1508741953568506,"1487":-0.005733802054337046,"1488":1.754052557102343,"1489":1.7697769340917402,"1490":1.4473857584972467,"1491":-2.4253251197024173,"1492":2.2471736033400322,"1493":-1.1916095875256125,"1494":-2.7706135478731038,"1495":-2.4985509089132063,"1496":0.6722970700948875,"1497":1.694738180586944,"1498":6.438308394848258,"1499":6.382703060427262,"1500":-1.514485515285923,"1501":1.8045697839775363,"1502":0.2410748275775427,"1503":-3.22954035326112,"1504":2.5190892178482667,"1505":3.012353873858644,"1506":-1.49620144078606,"1507":-2.529208540587298,"1508":-2.4041805909643896,"1509":-0.05002048077672026,"1510":-4.998205420911129,"1511":-5.223341945860052,"1512":-4.0086324922197445,"1513":2.4516193313328785,"1514":0.26271779284721525,"1515":-3.5534657699017385,"1516":-3.719606520270307,"1517":-3.860988582337599,"1518":-2.3055979215873483,"1519":0.9902956656368473,"1520":2.832001494178529,"1521":-1.7204042305504827,"1522":-4.4353956312430896,"1523":4.3744696560544485,"1524":0.38535633942355757,"1525":-7.648670562251167,"1526":-5.913831403128029,"1527":-8.074212301211258,"1528":-1.4836587426203398,"1529":3.324955639546589,"1530":-7.161406162948753,"1531":-5.503982863214223,"1532":-5.347553239347477,"1533":-0.4188331672184634,"1534":-1.5288486237403027,"1535":-1.671528360005785,"1536":1.8978537523283179,"1537":2.010792155697161,"1538":-0.9074010691378308,"1539":-1.4411405485614737,"1540":3.1395213948172844,"1541":4.455337561783133,"1542":2.4291554268624345,"1543":0.5386725189594425,"1544":-4.530034821921327,"1545":-1.76178503792231,"1546":9.14240476433252,"1547":0.17703112183072162,"1548":2.9537221764187835,"1549":1.0125039631689339,"1550":7.183995079398603,"1551":0.5243174579569083,"1552":0.026336517215954626,"1553":0.36244804671572833,"1554":-1.8833647775566982,"1555":-4.975197492983125,"1556":-1.7637225876538491,"1557":-3.7874391057175654,"1558":-0.5906438193573312,"1559":0.5744591723023096,"1560":0.3568507556145667,"1561":-2.7501576042895493,"1562":-1.4744226395067457,"1563":-3.149394904381729,"1564":-1.0945095105866558,"1565":1.569226006015687,"1566":-7.361545340554257,"1567":3.596685030753746,"1568":-1.7013393307645426,"1569":-1.5830931825983179,"1570":1.121789684511975,"1571":1.8070675322011065,"1572":-1.7321773010728836,"1573":-2.157291057709354,"1574":-0.016875298561217226,"1575":1.2892506187693114,"1576":1.0480209853130733,"1577":5.2756225064494835,"1578":-1.8764413218153781,"1579":-1.8327085764949338,"1580":-6.433603094707603,"1581":-3.960835861343567,"1582":0.4084868525593305,"1583":0.9570381262437726,"1584":-0.9454905787858847,"1585":-0.03941726054406224,"1586":4.273924446826956,"1587":-2.583324443305422,"1588":5.256295880079108,"1589":7.098797677638212,"1590":3.7511041459588936,"1591":-0.24280049039346419,"1592":-3.108011815243002,"1593":6.62699418813632,"1594":5.468148184788533,"1595":4.767406244243504,"1596":0.4725018901682294,"1597":-2.553739819814167,"1598":3.257763480620249,"1599":3.4071113328220077,"1600":5.656541173491746,"1601":1.8717203105146523,"1602":-1.9937162387792595,"1603":7.842681840607044,"1604":5.832216532253385,"1605":6.145563441666923,"1606":-0.6177665356011827,"1607":3.651681500037619,"1608":7.519341664814243,"1609":4.780473987180876,"1610":3.457169790439369,"1611":-0.7763727977607939,"1612":-1.0187455222736566,"1613":0.3549672539969206,"1614":-2.417859463697232,"1615":3.5141017309241183,"1616":1.399203000764692,"1617":-0.36457746668446495,"1618":-2.508516687552846,"1619":0.1751275780800658,"1620":2.971933790303459,"1621":-3.5183143005524795,"1622":0.05063755371913741,"1623":-3.0647132230163856,"1624":-10.896865942956724,"1625":2.7270248065145606,"1626":2.6374367715036495,"1627":1.301789353623334,"1628":-1.5940272563745295,"1629":-0.6500755599285696,"1630":1.5274620885571817,"1631":-0.35545669999613516,"1632":3.028353173568132,"1633":2.7204233487963054,"1634":1.7609080239196078,"1635":1.1990201070131643,"1636":0.30571889961439996,"1637":-0.6042070743536633,"1638":-7.379669339037072,"1639":0.9368179149506957,"1640":-2.8500253596885177,"1641":-5.9651623511711085,"1642":-3.7371692282917213,"1643":-1.30000183937649,"1644":-0.38880876963591343,"1645":-6.753300373381577,"1646":-3.908150199368243,"1647":-4.214403229052295,"1648":1.720597106381258,"1649":3.3655578748266266,"1650":1.1105576514667213,"1651":-4.536616422468643,"1652":-3.691944697413301,"1653":-0.986426715922172,"1654":2.056917844568673,"1655":-7.708188895288589,"1656":-3.7770255743506773,"1657":-4.328882350944399,"1658":-3.39908708681129,"1659":-0.8291020990401174,"1660":-6.115598411292423,"1661":-3.5554288624742303,"1662":-2.8917082290118765,"1663":0.5649504302599228,"1664":1.428580038474098,"1665":1.7827539843711215,"1666":-0.0122458926859513,"1667":1.9038884198621537,"1668":-4.01887060854115,"1669":-0.08952816858523072,"1670":-3.1594695399804187,"1671":0.5987461714958664,"1672":-0.062201786952041885,"1673":1.1696844373570339,"1674":-1.6891717486408608,"1675":0.6162910678744484,"1676":4.923354392104132,"1677":-1.3390727649880176,"1678":4.9868521618705515,"1679":-2.348368424183277,"1680":-0.6740148397757857,"1681":-1.1744384020270942,"1682":3.0955749878449317,"1683":-1.5194668106449678,"1684":-3.776078352778755,"1685":4.000952512944713,"1686":3.2480996949989165,"1687":0.4308465744607144,"1688":3.795498009759232,"1689":-3.465564749861559,"1690":1.2832089018380284,"1691":-5.944829620574733,"1692":-3.987462424975265,"1693":-3.4121960177054036,"1694":-3.4176193715203858,"1695":1.7716176924867115,"1696":2.459088162514905,"1697":-1.5770790530153096,"1698":2.1447926299396167,"1699":-3.0453295021896265,"1700":0.1854900070108964,"1701":0.052462673652855354,"1702":5.472951093614669,"1703":4.9318946538868635,"1704":-1.541215731088069,"1705":1.996457937904114,"1706":-1.0126723332783056,"1707":3.487726513886536,"1708":-0.6675002606117774,"1709":-1.4943529397547621,"1710":-5.500611562484868,"1711":-4.966674274779801,"1712":0.11379694364828831,"1713":1.2693740794041184,"1714":-1.840225218327278,"1715":2.2143335935904624,"1716":0.3296418076864161,"1717":-2.33946231798254,"1718":-1.4741771367610057,"1719":1.4029586959069231,"1720":-2.482897176552729,"1721":1.1308413892873492,"1722":-1.981227925850211,"1723":-2.8744915883656255,"1724":2.7915115805094755,"1725":-0.8932560360048887,"1726":-1.6122603990669189,"1727":1.490667406004863,"1728":7.7763096426854155,"1729":6.294029062163883,"1730":4.551568338686093,"1731":-2.024931737462083,"1732":2.5093168183721706,"1733":-4.5026174016635485,"1734":-5.17372151287073,"1735":0.41705237359349395,"1736":-0.08351890632047691,"1737":3.4736386102185812,"1738":3.010377719912797,"1739":3.478556216405228,"1740":-0.8540479081642629,"1741":2.372347070123833,"1742":6.720904390189867,"1743":-1.398441409904199,"1744":4.0346440500765866,"1745":6.444546873068511,"1746":3.6845180054371998,"1747":-1.4639331854704407,"1748":-1.7836073572247775,"1749":6.363880530392714,"1750":4.603814089847747,"1751":3.961355580102109,"1752":-3.874361287249267,"1753":-3.0017853474660208,"1754":3.345382967660003,"1755":3.943800352951465,"1756":3.2533196261502537,"1757":0.16825361139125294,"1758":-2.723416115989677,"1759":7.437961238710464,"1760":3.3480675750666586,"1761":6.017824035676161,"1762":1.2468403892859035,"1763":-1.4754654657832882,"1764":6.134836919849116,"1765":4.461348174219731,"1766":2.6203406630300186,"1767":1.0952748842236966,"1768":-7.192814876889709,"1769":4.95034765045025,"1770":-7.05709460542305,"1771":-7.326339255239918,"1772":-8.437596465203281,"1773":2.6837483741906087,"1774":1.6189741934023583,"1775":-6.570845752347441,"1776":-2.748724564310854,"1777":-5.46321169127615,"1778":0.0565116939830709,"1779":-0.12966735166477922,"1780":3.071270439847811,"1781":-4.896001640720827,"1782":-4.092690944575054,"1783":-2.8281849303945403,"1784":1.2620363796562166,"1785":-1.4416533587296356,"1786":-6.219795708904956,"1787":-6.064199009121188,"1788":-5.484924471296943,"1789":1.3928711167801417,"1790":-1.166104170741187,"1791":-6.228442291536503,"1792":-5.498915684364328,"1793":0.14068403743489152,"1794":-1.5134483142860733,"1795":-0.8775048945973905,"1796":3.474586004044802,"1797":2.899834335356654,"1798":3.957138755426106,"1799":1.5255911266451465,"1800":-2.2016784411260453,"1801":0.39811359016007963,"1802":3.60970986026215,"1803":4.8036536982434,"1804":-0.13259017592608277,"1805":4.217343070920912,"1806":2.593387164514829,"1807":1.1403923770029512,"1808":6.407418245967798,"1809":-0.40528557321926806,"1810":-4.776003802952336,"1811":-2.8318959909829764,"1812":6.4820299240041654,"1813":7.168358587303555,"1814":1.652315708423955,"1815":-3.465574012374113,"1816":4.541496777302746,"1817":6.488414455011379,"1818":7.105930449128414,"1819":-0.3954666786879571,"1820":-0.8851340916184044,"1821":3.380966947865172,"1822":6.824554243812365,"1823":4.379407376820174,"1824":5.469595415483171,"1825":-0.6485898343236904,"1826":-1.205397402273634,"1827":-1.323062776320098,"1828":1.3277143269074545,"1829":3.8290093066992976,"1830":-5.879456598696506,"1831":-2.703180346929838,"1832":-3.336486325514614,"1833":0.865884780937865,"1834":1.3463055956971495,"1835":1.2809608903177039,"1836":2.5153790808626826,"1837":6.290897210860851,"1838":4.876199519039035,"1839":3.2384950249973583,"1840":3.5413801575149364,"1841":-0.010878984582402577,"1842":5.763796970205634,"1843":3.248389375311243,"1844":-0.5248127537240875,"1845":1.233512921068427,"1846":2.9670316470832288,"1847":-1.683102483646169,"1848":6.835264775297096,"1849":-1.49337801391117,"1850":2.8724575763286357,"1851":-4.004397817318237,"1852":3.2201478555505685,"1853":0.6015063110156025,"1854":-1.2633499574808753,"1855":0.32789136632855115,"1856":-0.3118922208586921,"1857":-2.1024767052520335,"1858":8.467999858306795,"1859":-0.6167328501731432,"1860":-1.6828040481891804,"1861":-4.331555743548177,"1862":0.20023639384061306,"1863":0.5904805565785608,"1864":5.9879072969744,"1865":1.7811250075162852,"1866":-0.34525579573779297,"1867":1.82283932831456,"1868":2.7564003773146717,"1869":0.9198732297780235,"1870":-1.0432864997512363,"1871":-0.6188180154082471,"1872":-3.6175678348633515,"1873":4.862571280794738,"1874":-5.303994334658497,"1875":-6.47639191160882,"1876":-4.4758473216836006,"1877":-0.6012399847287365,"1878":3.5038024459103405,"1879":-6.068073005336763,"1880":-3.1300758199577854,"1881":-3.6060976436179835,"1882":2.158864690991175,"1883":0.4244293907582212,"1884":-4.200655316738716,"1885":-4.183747747470339,"1886":-3.5365144753736932,"1887":-1.525592153677999,"1888":1.976396279165546,"1889":-7.610220352653947,"1890":-5.289049782677527,"1891":-4.703683649958036,"1892":-1.6819386579275335,"1893":-2.5237404391798495,"1894":-5.736999021306599,"1895":-4.187614962537069,"1896":-2.770077601075829,"1897":-0.6997134396724064,"1898":-4.166560383699232,"1899":0.33652236160607046,"1900":-5.181803505411015,"1901":-7.372524638272203,"1902":-4.490273740781809,"1903":-5.821852583547572,"1904":0.34082559172703275,"1905":-1.8589401913413899,"1906":-7.057562319193629,"1907":-5.522096288348903,"1908":-3.081105212686935,"1909":1.2590884205429476,"1910":-5.95338965572904,"1911":-4.115148174946772,"1912":-3.690898605303981,"1913":-2.7722921085214267,"1914":-8.970476502664948,"1915":-1.6396863781343345,"1916":-5.013190548715457,"1917":-4.4554044559496715,"1918":-5.145529842032329,"1919":1.8558368584971205,"1920":-3.0836067785202554,"1921":-5.215922486609895,"1922":-1.673652189208444,"1923":0.8670913086763794,"1924":3.6910089491446088,"1925":-3.428763586384789,"1926":-2.6876325505191327,"1927":-3.5417463150705912,"1928":2.4104914222534135,"1929":-3.489259957247491,"1930":-4.953173028122085,"1931":3.7155425812176737,"1932":-2.820572125079025,"1933":-1.1339391806945895,"1934":2.9808635190923978,"1935":-0.39663474515057684,"1936":0.7384413951068128,"1937":-5.994944527982749,"1938":3.521997454343156,"1939":0.8192018321233734,"1940":-1.2606868190777178,"1941":2.3399618143177334,"1942":-1.9173476274805517,"1943":-1.1168153533608487,"1944":1.1533148620953995,"1945":-4.569101663494883,"1946":-1.053468886380359,"1947":1.6127083842285104,"1948":1.8692780076866966,"1949":0.9146667783168408,"1950":4.865706354363703,"1951":-3.115192068999143,"1952":3.6802323252689466,"1953":7.320386255349632,"1954":4.3792583051485625,"1955":3.6797818862327616,"1956":-1.2675360819931984,"1957":7.681695844165338,"1958":4.640460821381473,"1959":4.72053675229441,"1960":-2.8200219084721407,"1961":-0.46069453888635603,"1962":3.8633026334278275,"1963":3.8710664415608855,"1964":4.092658105393479,"1965":0.7230363348151546,"1966":-1.41500400870279,"1967":6.809933428740625,"1968":4.949439498796219,"1969":5.02331496151001,"1970":0.9858403739536163,"1971":3.4085273697824396,"1972":6.336256029214989,"1973":3.708954543793661,"1974":2.4309525722454506,"1975":-0.9344896165631704,"1976":-6.994313512110119,"1977":0.6580660672325851,"1978":0.8112159608176748,"1979":-6.7285746367445975,"1980":-7.393676449514396,"1981":-6.995700174092412,"1982":1.2857548261996639,"1983":-0.8054734199587599,"1984":-4.568303532199515,"1985":-5.27971524298588,"1986":-0.04042883853159212,"1987":-0.5004497151306366,"1988":-2.2613980363280106,"1989":-4.936994208637447,"1990":-4.089283053576911,"1991":2.6469776320331713,"1992":-4.476537854645965,"1993":-5.65725043087715,"1994":-0.5131039124320691,"1995":-6.801960975460923,"1996":-1.343445729418074,"1997":-1.580960390193072,"1998":-0.11213199720233977,"1999":-1.5976603847281339,"2000":-4.399983059417848,"2001":1.6331882374231848,"2002":-5.045350734080686,"2003":-2.888909979508361,"2004":-1.5727213057940952,"2005":2.5516887531078067,"2006":1.8884868094055702,"2007":-1.4672976102868123,"2008":1.7962800099272127,"2009":-0.2327450469883701,"2010":4.815017975487938,"2011":3.458731205367484,"2012":1.2246081157399595,"2013":0.35395377480545204,"2014":1.6535054489257164,"2015":4.765903823406296,"2016":5.532231832313738,"2017":-2.061864242139155,"2018":0.9261759513297473,"2019":-1.317136513754833,"2020":2.0699382361880203,"2021":4.80107761478479,"2022":-4.159400744177644,"2023":-1.7889883052778923,"2024":1.20187751813393,"2025":0.12912955907215906,"2026":3.4861152167546052,"2027":2.7131667537070796,"2028":1.7776535547053882,"2029":5.777168486064769,"2030":-2.8794320343121886,"2031":2.50641278705482,"2032":-2.2268494412392483,"2033":-4.783179549647653,"2034":-1.907328991719406,"2035":0.7324655665756151,"2036":-0.45962855277322395,"2037":-3.259314586812258,"2038":3.5673260624021643,"2039":2.3755056470322464,"2040":0.9719716415644103,"2041":-3.3132624376758173,"2042":-4.711792847345925,"2043":1.8333776340808186,"2044":3.923703131212272,"2045":-3.506467674074002,"2046":-2.8780380077600984,"2047":2.6115469389882655,"2048":-0.9239040441511981,"2049":3.608939149965147,"2050":0.8391756079576868,"2051":1.1732892354418567,"2052":-2.0176362074714587,"2053":-0.11242347109381416,"2054":6.274599543234459,"2055":0.787672180382217,"2056":4.057064950608592,"2057":5.113859064436198,"2058":7.490182851661013,"2059":0.5688104348207316,"2060":-2.92716504915879,"2061":2.3024539518780096,"2062":5.780449902992287,"2063":4.6645474041416035,"2064":6.399419455749506,"2065":-1.7347219345473164,"2066":3.2447730858540895,"2067":5.010182368814766,"2068":4.301067486236984,"2069":-0.6466910092960765,"2070":2.656570845904401,"2071":0.012954670560036186,"2072":2.597651420517113,"2073":2.538591281418585,"2074":4.648056491214401,"2075":3.175283646841087,"2076":-2.5074698938566575,"2077":1.4926801415653772,"2078":3.169748031966743,"2079":-1.3971936848738644,"2080":-1.0527874927326266,"2081":-0.418945150346596,"2082":1.608101618849145,"2083":-1.9820229431449048,"2084":-0.6433792625464378,"2085":-4.452811953636287,"2086":-2.0582872403423615,"2087":3.2334205157790543,"2088":-0.5905635727803797,"2089":-3.074953794529797,"2090":0.06571165415805187,"2091":-1.653227453408609,"2092":-0.8064935428062261,"2093":-2.2947919682881643,"2094":-2.4144776328828215,"2095":-3.517037179772052,"2096":-2.1538097590749827,"2097":-2.8836361952686773,"2098":-3.1122832846075172,"2099":-2.0259462137982203,"2100":-3.481999153894269,"2101":0.7635058273421823,"2102":-4.257230308292878,"2103":-0.7610953753653362,"2104":-2.7183843045676013,"2105":-0.5590932019152836,"2106":-3.558302268722737,"2107":2.352461321008214,"2108":-5.815905502210794,"2109":-0.4138629237807155,"2110":-2.16593816437525,"2111":0.3531826636515127,"2112":2.6578184973349175,"2113":0.005810947454524892,"2114":-1.1114042253984973,"2115":-4.776644802823803,"2116":-1.7317895695308243,"2117":-1.6751614919085775,"2118":4.663943346147858,"2119":-4.171437650715463,"2120":-0.21500119016896538,"2121":-2.4832599752061757,"2122":3.782546618449304,"2123":-6.438935461956142,"2124":-4.069642517247519,"2125":-2.9372921226478867,"2126":-2.76814805957738,"2127":1.755127360948273,"2128":0.4969662247862457,"2129":-5.09040755989372,"2130":-4.6904796895179475,"2131":-1.0328296392309941,"2132":1.592895265550391,"2133":-1.5817699314186913,"2134":-1.5065038552354024,"2135":0.5237209511183387,"2136":0.5456512430112512,"2137":0.549898787263857,"2138":-6.086374858194317,"2139":-1.9016811216084981,"2140":-0.19313364345375705,"2141":-1.0402798298603708,"2142":-0.6575339430029974,"2143":-0.17820262759806776,"2144":-0.5521233102858463,"2145":1.469816812223486,"2146":0.6305792696585446,"2147":0.576114740252968,"2148":8.45358557482106,"2149":6.922710496529585,"2150":3.2898241406086117,"2151":0.801293111663046,"2152":1.78746539358424,"2153":4.51386413185789,"2154":1.1978709796176068,"2155":3.949017356971291,"2156":-1.808040414073064,"2157":-0.42364859758191364,"2158":-0.8628953146444102,"2159":-3.859761785228375,"2160":1.6425717335920316,"2161":0.09381761784267993,"2162":-1.2556542554825227,"2163":-0.23558222612308102,"2164":7.091979050768237,"2165":-1.059702035070146,"2166":1.9014741027447744,"2167":0.5445864667004816,"2168":1.3658998732537637,"2169":0.0004888450493734247,"2170":2.7209202796611893,"2171":-7.236027105170211,"2172":0.22175754798891412,"2173":1.8885316959643568,"2174":3.5727627381679476,"2175":-2.8842104744992487,"2176":-1.510122563004803,"2177":-2.1463613047776446,"2178":-2.660056967572507,"2179":0.40773759292118217,"2180":4.364630291283979,"2181":1.3394129511237236,"2182":1.9314831900136076,"2183":0.24762821286815886,"2184":1.8517153333832523,"2185":-2.0870590194562286,"2186":5.977879297861729,"2187":4.3597774859993565,"2188":4.702537180838185,"2189":-4.895830822932363,"2190":-0.7634304426960045,"2191":4.6986551866624575,"2192":7.142272512382588,"2193":6.239139977799381,"2194":1.4837247152377486,"2195":3.23461917334261,"2196":4.358528064822856,"2197":4.517633995097023,"2198":4.927097430300246,"2199":-2.2245853595135676,"2200":0.5135165875942419,"2201":7.167862589443816,"2202":5.23714526339701,"2203":5.609730263288732,"2204":4.692234969401781,"2205":-1.6036592232530664,"2206":2.301012580021458,"2207":4.270255252129639,"2208":5.738807866229792,"2209":-0.7444686976443329,"2210":0.9356032707033116,"2211":2.4764684528820164,"2212":-3.0407042271044062,"2213":-3.2267828038753783,"2214":-3.5862225413793563,"2215":-0.04081573323177335,"2216":0.9493108260678351,"2217":-3.879363605809508,"2218":-2.378819459995341,"2219":-3.162677397354125,"2220":-1.1067153124084643,"2221":1.3745163263930242,"2222":-4.755872010527347,"2223":-4.842648918196053,"2224":-3.800874943199594,"2225":-2.7927007958501977,"2226":-5.359767554615745,"2227":-3.3009774390672746,"2228":-3.8496195347253317,"2229":-3.2024930343257387,"2230":2.542710413151558,"2231":1.3613267456730176,"2232":-4.862527917425121,"2233":-3.590615247422725,"2234":-2.674602540140835,"2235":2.0907854149665854,"2236":0.9854377506592736,"2237":2.0758739627793275,"2238":-0.2313457847068984,"2239":0.44944496705625986,"2240":-1.2894783706418729,"2241":-3.712697114633838,"2242":-3.8515264505230644,"2243":7.515704828012487,"2244":5.310905339851237,"2245":-0.529913352761108,"2246":-8.558235517077406,"2247":-1.9115238242635402,"2248":2.6825614589966134,"2249":2.995852646940041,"2250":0.180212665595502,"2251":2.8105364004159332,"2252":-0.8041941323174653,"2253":-1.454720028264271,"2254":-3.446842011788724,"2255":-0.549879582172621,"2256":3.493037926043586,"2257":0.2881099232692283,"2258":2.306266541149949,"2259":-0.1819276443449455,"2260":0.45299407619428494,"2261":0.2094844618581866,"2262":1.5254650208916822,"2263":-1.9885571559753363,"2264":-0.09449748495871228,"2265":3.732165030061007,"2266":4.166822966519543,"2267":4.584299274403569,"2268":-0.42149740677585995,"2269":5.347006166270179,"2270":2.2878999854480027,"2271":3.6399879743203263,"2272":-0.12541842184151922,"2273":3.302746987408964,"2274":-1.6715466341676712,"2275":3.8013937538999434,"2276":5.2189972254871355,"2277":-3.474172398582128,"2278":-1.5066335814568308,"2279":-1.6969462898919188,"2280":3.4892708505067374,"2281":3.99960246069063,"2282":-3.536881780323489,"2283":-0.31237607987974275,"2284":-1.2390861486093498,"2285":1.8515157656870116,"2286":3.616716793961916,"2287":1.4303053871689617,"2288":-1.5850441372613573,"2289":0.8978079697104141,"2290":-2.6616647633597306,"2291":-5.522739253305912,"2292":-3.1908590889422332,"2293":-1.4143248291164119,"2294":-0.48849992191656016,"2295":-6.951833302851024,"2296":-5.402885331532447,"2297":0.44225856918887535,"2298":-3.8610865208443106,"2299":1.0054750123599627,"2300":-2.0645962448107804,"2301":-0.9637314125383778,"2302":-4.983929938274946,"2303":-1.1677479194475753,"2304":4.975823646961835,"2305":3.2703966733430794,"2306":-0.1250143779751607,"2307":-0.3877849784201864,"2308":-3.1841089214577125,"2309":0.2439664267259059,"2310":-3.8505807157512892,"2311":-1.3922401437434304,"2312":-2.49782308275704,"2313":-1.988674158256576,"2314":3.7681760747958473,"2315":-3.4866067668192886,"2316":2.433622780999623,"2317":8.92296864765636,"2318":4.787624273750425,"2319":3.0129713078759233,"2320":-2.6737539848936125,"2321":6.724854867366771,"2322":4.926197052831422,"2323":2.155420267859469,"2324":-0.9319376257819859,"2325":-3.360769194493597,"2326":2.701381588247467,"2327":2.8912751774560395,"2328":5.408589962620042,"2329":6.06337628812428,"2330":-2.233381886908247,"2331":7.812302668405399,"2332":5.763001890844145,"2333":4.703877473109488,"2334":2.5880269825280973,"2335":3.582889739312246,"2336":6.789641319264499,"2337":4.410305439185281,"2338":2.8675170824561844,"2339":-3.043430009156566,"2340":2.1013669052274944,"2341":-2.7008786160206264,"2342":-1.6137378921039491,"2343":3.4059393680341516,"2344":2.602155930512756,"2345":0.1518366032746433,"2346":4.224272005579021,"2347":3.825970218886756,"2348":2.6646115938010824,"2349":2.3911428065834635,"2350":-1.7936940529288794,"2351":-1.5897194398284868,"2352":1.6692779774109836,"2353":1.9962202105503304,"2354":2.5228386672977514,"2355":1.7072503749547996,"2356":-2.312023186018228,"2357":3.972987928953265,"2358":2.994690554778267,"2359":2.9696889730786533,"2360":5.007798190578413,"2361":3.530505838250723,"2362":5.234383824518004,"2363":2.243958315790023,"2364":4.4968775489959505,"2365":1.8031320516210423,"2366":-0.3958544410339042,"2367":-4.4533355461833715,"2368":4.078335346342078,"2369":0.547516041594355,"2370":-1.8582443695299817,"2371":2.7682975001252434,"2372":2.1526621112641973,"2373":2.1988107624737028,"2374":-1.1437251767841008,"2375":-3.5350078586668494,"2376":-0.0001565078558004236,"2377":-2.9280708008982863,"2378":-2.097459197575548,"2379":-6.585493318650745,"2380":-5.958479056753517,"2381":0.6184068858224225,"2382":-3.8028105525980602,"2383":4.346885078623568,"2384":-6.700684487954282,"2385":-4.092025892001503,"2386":-1.5481963919519017,"2387":-1.256383917646946,"2388":1.5927567867453396,"2389":-0.8139674660099558,"2390":0.1719445116129989,"2391":1.1153407735903567,"2392":2.8807853892861517,"2393":2.5898629070733694,"2394":5.098056941829269,"2395":-4.238667838353576,"2396":3.902762133456269,"2397":-3.090519297477038,"2398":-4.335921404293799,"2399":0.9694961669411146,"2400":0.7097076781450488,"2401":0.14020118014467398,"2402":-0.34548499090797796,"2403":-0.743692437250519,"2404":-0.9066449775831855,"2405":3.7158606176888904,"2406":3.9425756823846707,"2407":-3.8908827196652815,"2408":5.408176108877436,"2409":-2.5069834831592352,"2410":-1.461104882378067,"2411":0.6241557177207623,"2412":3.931846131390821,"2413":2.295489026631744,"2414":-3.055083404653088,"2415":-0.5757137583566547,"2416":-2.5833265562156904,"2417":-1.0826465656726225,"2418":-1.670782224545851,"2419":-3.837659901526064,"2420":4.09198992160619,"2421":-3.6184203670800725,"2422":2.259269595951851,"2423":-1.9287672127221156,"2424":-0.4338798853524432,"2425":-0.02931831346221089,"2426":3.2241218812214774,"2427":1.3718731414514402,"2428":-2.4936322878141897,"2429":-2.1614900236340997,"2430":-5.89129366330273,"2431":2.423299078173663,"2432":2.190406369502734,"2433":0.9488735535794229,"2434":-4.627782578290455,"2435":-2.6896602850683577,"2436":0.5747803832754317,"2437":-4.382221546623489,"2438":2.272209787137455,"2439":1.5768525269004237,"2440":0.6882655578298005,"2441":-1.653981418891483,"2442":-4.245807031381817,"2443":-0.4188910720149856,"2444":-1.5823184166172835,"2445":0.11400349946120784,"2446":-4.837531429104752,"2447":-5.971499910780448,"2448":-5.058589763160171,"2449":-3.0704393634515146,"2450":1.3127865807420513,"2451":-4.5172959881116626,"2452":-5.115406635858547,"2453":-5.33298818979965,"2454":1.5324540970161025,"2455":-0.27986066886250044,"2456":2.912762240762115,"2457":-2.005385751016617,"2458":-4.003566192680804,"2459":1.9976917325716894,"2460":4.792386775278704,"2461":2.206502233960058,"2462":-3.9319312047586985,"2463":-3.6303205161951984,"2464":0.9784497298077296,"2465":-3.744364356384833,"2466":-0.339809500862413,"2467":-2.5231197525920104,"2468":-6.245919296555617,"2469":0.92914590856251,"2470":3.495344330537799,"2471":-3.4010611139127884,"2472":1.4084097880017559,"2473":0.8562720306324169,"2474":0.8772089099527572,"2475":3.0247053248140374,"2476":2.857383361148874,"2477":-0.40692525186248113,"2478":1.8129579068477635,"2479":1.452633617043167,"2480":-1.5033953580003818,"2481":2.7861832515476057,"2482":0.179231015950952,"2483":1.4474530311723817,"2484":3.204846446383752,"2485":1.0627247754946367,"2486":1.1746323274877402,"2487":1.2116777945131167,"2488":1.8094530068931491,"2489":2.659401153495866,"2490":0.6162343544864352,"2491":-0.2849019958409367,"2492":3.257799957699995,"2493":1.6374764385696547,"2494":0.32600926112407785,"2495":2.028526890963971,"2496":2.153335772634458,"2497":0.4782823029853843,"2498":7.541154016973399,"2499":4.783443479889066,"2500":3.6524591336038688,"2501":0.06437063338639606,"2502":6.886213529435674,"2503":3.1284704530188696,"2504":3.4500121544615334,"2505":6.282232100845801,"2506":-3.7906398205539675,"2507":-0.5203021077190798,"2508":3.8601534836213145,"2509":4.047702819422574,"2510":4.19396700587342,"2511":0.6715388731650659,"2512":5.954382417283504,"2513":1.54777774865875,"2514":4.590591840558439,"2515":3.8517004609245067,"2516":-3.6603779774529883,"2517":5.459214175778754,"2518":0.4210358422657697,"2519":3.7526487511872832,"2520":4.200205799977813,"2521":-0.24405018486758034,"2522":-1.9431246686475638,"2523":3.7002638875205394,"2524":-6.117286201519702,"2525":-3.7244959950243124,"2526":-1.6425706336854198,"2527":1.5283704845629362,"2528":-1.6395659671540996,"2529":-4.011300018133404,"2530":-2.844723470313402,"2531":-2.564087468749078,"2532":-3.1030070969652295,"2533":5.022304426418091,"2534":-1.5528143829343544,"2535":-3.0557706217214764,"2536":-1.6970178102667568,"2537":0.36448632499661476,"2538":-5.464266762384857,"2539":-4.457127935758385,"2540":-1.9004120978068524,"2541":-2.151533264331318,"2542":-2.196976865702702,"2543":-5.706359670395564,"2544":-5.3544835642683815,"2545":-2.61306360011847,"2546":-2.508968277973389,"2547":-0.9344069363707921,"2548":2.4813018064897805,"2549":0.008291879037661766,"2550":-3.940997162853715,"2551":-0.7916681307829513,"2552":-0.542355155674262,"2553":3.685480087384444,"2554":-1.3966998234414232,"2555":0.023367829968855884,"2556":-0.5620855914922936,"2557":-1.4433763851013544,"2558":2.54747067123,"2559":-0.07243750630098308,"2560":0.3974163027362224,"2561":-2.9890687517758017,"2562":-0.8145227303373797,"2563":2.9357690977905824,"2564":-2.2988128239509615,"2565":0.6176190550012469,"2566":-0.8077497161597565,"2567":-1.7723397129612204,"2568":-0.4083035426602415,"2569":3.0755875988256665,"2570":3.0916263557776134,"2571":2.173068897191127,"2572":0.7823051245460607,"2573":-5.286439438620496,"2574":1.260006114267834,"2575":-0.15132147888818795,"2576":-0.49443830667435634,"2577":1.1309874125591213,"2578":2.302621273747338,"2579":4.551743456570809,"2580":-0.6686564585434044,"2581":1.1466486168221188,"2582":2.1892129405346186,"2583":3.50968175834404,"2584":1.6945596889573709,"2585":-0.24637984176155184,"2586":0.35946790207439244,"2587":0.6611869035290173,"2588":2.688344309258328,"2589":1.223421851373261,"2590":-1.2273502975486894,"2591":2.691013154229505,"2592":-0.09819293298645664,"2593":2.060466777941809,"2594":-1.555224401745181,"2595":3.1980270407519846,"2596":-0.6757975213682665,"2597":-1.6001783478135372,"2598":-0.4467523289818494,"2599":2.2726978169794685}},"b1":{"n":100,"d":1,"w":{"0":0.9820920772657488,"1":3.782847934337727,"2":0.8268748192271987,"3":5.92642354165725,"4":2.937101300939668,"5":2.747715348662286,"6":-2.8287493235331787,"7":0.30355721795781027,"8":-1.3372754929736321,"9":-3.0040860041528843,"10":-3.5036213406675594,"11":0.4436099809801453,"12":-4.982810379950312,"13":-1.9382306638345728,"14":-2.3966537959597494,"15":3.123060317330343,"16":0.875159030503456,"17":1.7603081566067496,"18":-0.2002926815565639,"19":10.283514972245465,"20":0.6769226534779338,"21":3.2673620823256515,"22":-3.858934657914855,"23":-2.554006115785436,"24":0.7395611529076406,"25":-1.734820396108036,"26":1.1724630597714543,"27":1.966971619879377,"28":5.860062255720325,"29":-0.12086456113393199,"30":1.4886465008848464,"31":0.9919885665137085,"32":0.3010898199608318,"33":11.562733756735431,"34":-3.4275077285350855,"35":-1.0118132003443214,"36":-1.405901126132754,"37":2.4135349767741454,"38":0.5705545215098757,"39":-8.293073254361836,"40":-4.322417327756439,"41":4.612829739870345,"42":0.23769526815227676,"43":-0.7151799281079673,"44":2.862923520289691,"45":1.7312897849015463,"46":11.634433192682538,"47":5.296154458244904,"48":-1.5882172602077358,"49":4.866108262414271,"50":7.691706168514042,"51":3.136283659958149,"52":-2.0371545185389657,"53":-2.8325898553449713,"54":-0.8646652093246227,"55":-13.828561546893425,"56":-1.5273650205703502,"57":0.35977938021998446,"58":-1.3607664741436485,"59":-3.906880413651288,"60":-0.9384470554035347,"61":2.0191573745062548,"62":-1.6558140242248027,"63":-0.09589290996968602,"64":-0.012976804298896612,"65":-0.3607160914237211,"66":-2.6198300930494836,"67":2.833982020902054,"68":3.14857998548566,"69":3.4499424868313566,"70":0.8949627132488494,"71":-2.0808077126317723,"72":0.3152923820486069,"73":3.104965236218037,"74":-1.1702523529776658,"75":0.47826568995011326,"76":-3.977188179248573,"77":8.74624735996152,"78":1.9720905378392446,"79":4.937106753030153,"80":-1.1070884315697647,"81":-1.6861825142343374,"82":-4.176396594542352,"83":-2.7511633673955926,"84":3.2009738821961693,"85":-4.181301990816331,"86":-0.7002296885812256,"87":7.378776092385013,"88":2.508958895073906,"89":4.543611633044626,"90":-0.02860874713774239,"91":-0.5042852681306197,"92":0.2537877011886336,"93":5.3039466804210615,"94":-7.634759415381502,"95":0.5405712939854959,"96":1.139439398083103,"97":-0.5407748278436357,"98":-0.7640967734704947,"99":-0.36197771755222824}},"W2":{"n":4,"d":100,"w":{"0":-0.20699048344764867,"1":-0.6379005519426306,"2":-3.823699312946032,"3":-1.8670242389462774,"4":-0.20464106330062493,"5":0.5312014010966141,"6":0.43861338505570696,"7":-2.0333180202978993,"8":-3.8981173144505545,"9":-0.5411681919992644,"10":-2.3245131102405745,"11":-5.7584816826825564,"12":1.398394185610729,"13":-1.5386930077422334,"14":3.616694112532646,"15":5.376548213242349,"16":-2.4149796241860155,"17":-0.2810853138868744,"18":3.154488589935382,"19":-1.655663054104716,"20":3.1729733838339214,"21":-4.455790130420136,"22":-0.554227537396716,"23":-1.8710219106493304,"24":-3.188762854668431,"25":-2.6130743400813623,"26":0.33034742898202774,"27":-0.9925627116421402,"28":-0.6084410416874501,"29":-1.5985468290898335,"30":2.0457290886157113,"31":-2.2447377327523426,"32":-4.073150066369162,"33":-2.000428349401187,"34":3.0407978266347877,"35":5.080486627600532,"36":-0.3028990105444939,"37":-1.6853745451460649,"38":0.7881188177385656,"39":-0.05444965353112674,"40":2.8654431819945785,"41":-0.9168059845144302,"42":0.24833548467089847,"43":-1.746534184999385,"44":0.21076832436906287,"45":-1.328101335582045,"46":-1.704451925725421,"47":-1.274032852823336,"48":-5.151800430668786,"49":0.7583825307286128,"50":1.5207369984799322,"51":-3.04075751797437,"52":-1.8937425103457075,"53":3.7424798791705225,"54":0.6644202896278176,"55":1.4377430936754818,"56":-2.915764396327084,"57":2.2182440786827025,"58":-0.1916847418689986,"59":4.4050420117051665,"60":3.869283491706431,"61":-0.8683776743568585,"62":2.9363131791149977,"63":-0.993974385903778,"64":-0.4747681454889039,"65":-1.0198160713690692,"66":-1.8269615539923076,"67":1.8315997994879623,"68":0.4942168137668558,"69":-1.8715789054901357,"70":-3.6943809781311883,"71":0.7955111903877636,"72":1.0938479662085077,"73":-0.933365338116325,"74":-4.311764800692687,"75":1.7650573561449572,"76":-0.5882813991688416,"77":-0.10441784913262162,"78":-2.0421708395199785,"79":2.9933681078885908,"80":1.5233077200738383,"81":-0.25881092978017295,"82":-0.6281136023069414,"83":-1.691516978359255,"84":-0.8349676183825507,"85":-1.681468517525258,"86":2.772103106106478,"87":-4.180862400877963,"88":2.849185881369121,"89":-0.7448742238838802,"90":-7.536317816864135,"91":2.2282478697483503,"92":-1.5341965107728837,"93":1.7787338187141537,"94":2.5562906726877515,"95":-2.9124632394840537,"96":14.936167982887543,"97":-16.00204492417792,"98":-0.3603300592375157,"99":-1.528129348900884,"100":-3.07927011464827,"101":-1.2178405940397634,"102":-1.7365824213288503,"103":2.4035002129897376,"104":0.7961132749866522,"105":-1.3162285032012406,"106":3.367098944386237,"107":-0.06882875205491482,"108":1.2405515928863973,"109":2.6224587993432595,"110":5.498365268543939,"111":-1.999316100823043,"112":-2.1066308312301545,"113":12.136436151014136,"114":4.195213807552228,"115":3.7772308819692837,"116":0.047025067797694914,"117":1.1877888485671924,"118":1.4263504664648883,"119":-1.8462978480604484,"120":-0.45626588273730295,"121":-7.688228642077001,"122":-1.755657623967863,"123":-1.8941255284901064,"124":-1.0536637464403218,"125":-1.904737658399138,"126":-1.67361689262271,"127":0.30249219023775037,"128":-0.1545504113748461,"129":-1.1468695567029703,"130":-0.04874448732556735,"131":0.948126708676291,"132":3.7970641420542326,"133":-3.419119542523289,"134":1.5389766524554176,"135":-1.1151642247118452,"136":-1.6575690390755782,"137":-1.9110585598019871,"138":1.114639270391472,"139":1.9524729129389826,"140":-1.3281971802374832,"141":-5.499740119357194,"142":9.498975346741751,"143":-1.9331054614959746,"144":7.943211306047324,"145":-2.786131745538814,"146":-1.8007445851418955,"147":0.009757037744768642,"148":-2.2302152879752977,"149":2.7970488598905416,"150":2.320673646275127,"151":-1.44464595710531,"152":-0.333736211702263,"153":-0.9293801833668777,"154":4.528090023468449,"155":0.930278226607056,"156":-3.5276666331126934,"157":0.7656187230393805,"158":-1.6842157169840437,"159":-1.0229499477826378,"160":0.7582380810924486,"161":2.411107274451226,"162":0.5385949624803887,"163":-1.949144567499637,"164":-0.7245558255770436,"165":-1.1590261030125537,"166":0.7044192313726483,"167":2.791185345349438,"168":-0.6246793761863199,"169":0.3582268125318054,"170":-3.532519322031839,"171":-0.8109644463288996,"172":-3.1569259421614917,"173":-0.6268042260685857,"174":0.8861283315140773,"175":2.5152782967064766,"176":1.2580164586188296,"177":-0.9302133094107289,"178":0.649929949689024,"179":0.3102015792715649,"180":3.101811358141356,"181":1.959579796376877,"182":0.09310880517642825,"183":-1.36351966173878,"184":3.644676781853325,"185":-4.3721679914431295,"186":0.14112499269490844,"187":0.3364112119588748,"188":4.079375558049086,"189":3.4786329151435917,"190":-14.083033752028545,"191":0.4849009358777693,"192":0.2686158811991616,"193":0.7535129710589441,"194":3.2020911418255844,"195":-3.132654307114046,"196":10.22241996295256,"197":4.119140188364332,"198":0.7854321209854003,"199":-2.2666952618446143,"200":8.279451799359192,"201":1.2355763470736507,"202":0.1356732917017842,"203":-0.5415671376173921,"204":1.76473011155169,"205":0.690803540039599,"206":1.7165286316883555,"207":-0.8780671163695565,"208":-1.407827350131271,"209":1.5410356663555176,"210":-18.1368499609198,"211":4.966730312475244,"212":8.869079585932909,"213":-12.980131036363598,"214":-1.6039159301078798,"215":21.53352526956297,"216":-1.3833785973914443,"217":1.0082223003044664,"218":5.447088017838088,"219":-17.506763920290656,"220":0.8702147758763243,"221":-13.634430979566655,"222":-1.0195655353607156,"223":-1.1823991815228794,"224":1.38224660463689,"225":-3.469282319575251,"226":8.076527126638966,"227":-1.0087743117776835,"228":-13.167027278510263,"229":-0.6386269634374346,"230":5.831108475066434,"231":0.9037712698688812,"232":-10.73699422208885,"233":-15.479414983938325,"234":-2.1373960702487826,"235":3.9368118880877683,"236":-6.0152336286579295,"237":-3.0964332624719106,"238":1.338676039901134,"239":13.753907502800466,"240":0.5234748524831498,"241":-2.619492279086141,"242":2.806430487958009,"243":-0.2761670808343063,"244":-6.22378076735783,"245":-1.6576264722223275,"246":-12.100937638339387,"247":1.0568402783215998,"248":-0.6973308452838437,"249":-0.26585311251865,"250":-22.50325016764811,"251":-9.183021951662623,"252":-0.27355648663279114,"253":0.9214466537146276,"254":14.402275791148043,"255":15.9592368349953,"256":-15.084376847751148,"257":0.7214195392673962,"258":-13.390882214203064,"259":-0.7607407220646771,"260":1.128851332943589,"261":17.55270261422782,"262":0.9769006459931889,"263":-13.751638377411215,"264":-1.587131740309638,"265":-0.9728825334421259,"266":-1.2552253348005038,"267":16.996189346238083,"268":9.86112593169041,"269":5.440281991067051,"270":-7.065169825344985,"271":-1.3460704376502737,"272":-12.160705193614643,"273":17.453846784317427,"274":0.0634449414761964,"275":14.227145367279391,"276":12.4671489617864,"277":-9.64301263843802,"278":0.6904188191818391,"279":-18.859448561184884,"280":10.33580084901536,"281":-8.334688424242755,"282":-0.35058853827567055,"283":0.36874483380716483,"284":15.541444657036443,"285":-7.238855272975244,"286":-0.9061701910477472,"287":-15.40036984376071,"288":0.16698288256297694,"289":16.132267619911755,"290":0.07553308471314082,"291":1.3228108522313915,"292":-0.48521377328550835,"293":0.4115053580357473,"294":14.676681631648162,"295":-5.386063801520354,"296":7.0292874675263946,"297":-12.946533691240703,"298":-0.9416147544020163,"299":-3.8272721546340382,"300":5.20049715272201,"301":-0.5021778418969135,"302":-1.7010111822104022,"303":0.10540808282295142,"304":0.17677421302811677,"305":1.1203382286168986,"306":1.0726140643051696,"307":-0.8965069433416397,"308":-0.22058550773039423,"309":-0.16315845806985488,"310":5.276773868391967,"311":5.640843987100657,"312":0.5496925441805892,"313":9.921064562703938,"314":5.586555977188269,"315":9.734390929319668,"316":0.2909002594162983,"317":0.4538744287057313,"318":8.963829245011757,"319":-4.9133978262627105,"320":-0.43240711541583277,"321":-10.35011863854064,"322":1.4198774538008918,"323":1.4090741853812192,"324":-0.27242969957754015,"325":-8.113992756207656,"326":6.1338589013175175,"327":-0.8389429951170981,"328":-4.3519153206916155,"329":2.8216824477597195,"330":-1.3957126608585102,"331":-1.3743711770517493,"332":8.583461247415983,"333":-4.785515897402389,"334":1.5310759205194626,"335":0.2918668368771245,"336":-2.9847926018893376,"337":-4.871041957786322,"338":1.7846450785283565,"339":7.745874496870054,"340":1.0394407406221386,"341":-2.2339493042824365,"342":10.445533902031995,"343":-1.0545328768211575,"344":5.826936815958532,"345":-4.519139418615542,"346":-5.582761645213529,"347":-0.06277909305231807,"348":-1.8762320818335325,"349":-0.6214783607544191,"350":-3.4518351253781483,"351":2.894441679988117,"352":-2.0196430671798358,"353":-0.37887113001195544,"354":11.455764956453955,"355":5.274968551283853,"356":-8.331252834219118,"357":-3.2289167496473263,"358":-0.6061366020780414,"359":-0.874884743740107,"360":-1.546537706094158,"361":11.769685011590385,"362":-0.7697096985113229,"363":-7.22076790557857,"364":-0.13708284717130903,"365":-0.9811269795689562,"366":-0.8597965200123645,"367":7.57819542690515,"368":-3.2752908509194296,"369":5.301019681901831,"370":-5.191825052490601,"371":-0.8101681474200016,"372":-12.024223144012787,"373":-9.556892265220904,"374":0.6475333230801655,"375":11.144717683376793,"376":8.184148630583783,"377":-2.189023568473051,"378":-0.899303846873709,"379":-4.396296841055394,"380":5.963373360048705,"381":-0.007676261234251567,"382":-3.596984320753179,"383":-1.0406654390162722,"384":6.337484677747061,"385":-7.296549070833685,"386":0.6285144639543933,"387":-4.5189478179357225,"388":-7.321032315890243,"389":9.417787781962355,"390":-6.226595048187412,"391":0.03744920232798886,"392":-2.006369963796591,"393":2.400396942808166,"394":4.294788519124785,"395":-10.220699093253764,"396":-3.065244050485832,"397":9.486799798710543,"398":0.28323424703161254,"399":-6.040312695045208}},"b2":{"n":4,"d":1,"w":{"0":-1.7787505583543353,"1":-1.6989661927699962,"2":-1.7376624491180022,"3":-4.777923775635788}}}}
/* harmony export (immutable) */ __webpack_exports__["a"] = data;


/***/ }),
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__State__ = __webpack_require__(29);
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderer_HtmlTableRenderer__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agent_ColumnCompare__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agent_LookAheadWide__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agent_LookAheadWideAndDeep__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agent_AlwaysDown__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agent_RL_DQN_5X5Viewport_In_Learning_Mode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agent_BarelyLookAhead__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__agent_RL_DQN_5X5Viewport_PreTrained__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__GameRunner__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__style_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__style_css__);











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
    '<div id="rendererContainer"></div>'+
    '<pre>' +
    '\nGame Rules:' +
    '\n- Gain ' + __WEBPACK_IMPORTED_MODULE_8__environment__["a" /* config */].pointsForCompletion + ' points for making it to the bottom row' +
    '\n- Gain ' + __WEBPACK_IMPORTED_MODULE_8__environment__["a" /* config */].verticalDeltaScore + ' points for every row lower you go' +
    '\n- Loose ' + __WEBPACK_IMPORTED_MODULE_8__environment__["a" /* config */].verticalDeltaScore + ' points for every row higher you go' +
    '\n- Loose ' + -__WEBPACK_IMPORTED_MODULE_8__environment__["a" /* config */].tileValueMap[1] + ' points when moving into a red square' +
    '\n- Loose ' + -__WEBPACK_IMPORTED_MODULE_8__environment__["a" /* config */].tileValueMap[0] + ' points when moving into a grey square' +
    '</pre>';
const scoreElement = document.getElementById('score');

let enableRendering = true;
let autoPlay = true;
let speed = 250;
let intervalReference = null;
let agent;
let currentAgentName;
let renderer = new __WEBPACK_IMPORTED_MODULE_0__renderer_HtmlTableRenderer__["a" /* default */](document.getElementById('rendererContainer'));

let gameRunner = new __WEBPACK_IMPORTED_MODULE_9__GameRunner__["a" /* default */](renderer, handleGameRunnerStatusChange);

let agents = {
    'LookAheadWideAndDeep - ranked 334': __WEBPACK_IMPORTED_MODULE_3__agent_LookAheadWideAndDeep__["a" /* default */],
    'RL_DQN_5X5Viewport_PreTrained - ranked 201': __WEBPACK_IMPORTED_MODULE_7__agent_RL_DQN_5X5Viewport_PreTrained__["a" /* default */],
    'RL_DQN_5X5Viewport_In_Learning_Mode': __WEBPACK_IMPORTED_MODULE_5__agent_RL_DQN_5X5Viewport_In_Learning_Mode__["a" /* default */],
    'LookAheadWide - ranked 330': __WEBPACK_IMPORTED_MODULE_2__agent_LookAheadWide__["a" /* default */],
    'ColumnCompare - ranked 308': __WEBPACK_IMPORTED_MODULE_1__agent_ColumnCompare__["a" /* default */],
    'BarelyLookAhead - ranked 292': __WEBPACK_IMPORTED_MODULE_6__agent_BarelyLookAhead__["a" /* default */],
    'AlwaysDown - ranked 180': __WEBPACK_IMPORTED_MODULE_4__agent_AlwaysDown__["a" /* default */],
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
    gameRunner.newGame(new agents[currentAgentName], enableRendering);
}

newGame();
setupInterval();


/***/ })
/******/ ]);