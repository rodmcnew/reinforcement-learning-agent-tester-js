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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__neural_network_saves_view_port_5_5_0_1_best__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_RlDqn__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_viewportConversions__ = __webpack_require__(6);





const actions = ['w', 'a', 's', 'd'];

// const numberOfStates = environmentConfig.viewPortSize[0] * environmentConfig.viewPortSize[1];
const numberOfStates = 5 * 5 + 1;

let rlDqn = new __WEBPACK_IMPORTED_MODULE_3__helper_RlDqn__["a" /* default */](true, numberOfStates, __WEBPACK_IMPORTED_MODULE_2__neural_network_saves_view_port_5_5_0_1_best__["a" /* data */]);

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
exports.push([module.i, "#info {\n    margin-right: 2em;\n    /*float: left*/\n}\n\n.InfectionGameHtmlTableRender {\n    /*float: left;*/\n    overflow: auto;\n}\n\n.InfectionGameHtmlTableRender table {\n    padding-right: 2em;\n    border-spacing: 0;\n    border-collapse:collapse;\n}\n\n.InfectionGameHtmlTableRender table td {\n    border: 0; /*For iphones*/\n}\n\n.InfectionGameHtmlTableRender > div {\n    float: left;\n    border-spacing: 0;\n    margin-right: 2em;\n}\n\n.InfectionGameHtmlTableRender table.renderer-table-canvas-agent {\n    padding: 10px;\n    background-color: black;\n}\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-god td {\n    height: 5px;\n    width: 5px;\n}\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-agent td {\n    height: 20px;\n    width: 20px;\n}\n\n#agentRendererContainer {\n    margin-top: 1em;\n}", ""]);

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

            // epsilon greedy policy
            if (Math.random() < this.epsilon) {
                var a = randi(0, this.na);

                const randomElement = document.getElementById('actionRandom');
                // randomElement.innerHTML = 100;
                randomElement.style.width = (100 * 3 + 50) + 'px';
            } else {
                // greedy wrt Q function
                var amat = this.forwardQ(this.net, s, false);

                var mini = function (w) {
                    // argmin of array w
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
                };

                const randomElement = document.getElementById('actionRandom');
                // randomElement.innerHTML = 0;
                randomElement.style.width = '10px';
                var a = R.maxi(amat.w); // returns index of argmax action
                let minA = mini(amat.w);
                amat.w.forEach(function (value, i) { //@TODO what about if not in this else?
                    const element = document.getElementById('action' + i);
                    let adder = 0;
                    if (amat.w[minA] < 0) {
                        adder = -amat.w[minA];
                    }
                    let fixedValue = Math.floor((value + adder) / (amat.w[a] + adder) * 100);

                    element.style.width = (fixedValue * 3 + 50) + 'px';
                    element.innerHTML = fixedValue;
                });
            }

            // shift state memory
            this.s0 = this.s1;
            this.a0 = this.a1;
            this.s1 = s;
            this.a1 = a;

            return a;
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const data =
{"nh":100,"ns":26,"na":4,"net":{"W1":{"n":100,"d":26,"w":{"0":0.1324519145010215,"1":1.2838761781492811,"2":0.06468020216454336,"3":1.6412324375894487,"4":-4.8802733530353155,"5":1.8170815510735032,"6":-0.32715128973745894,"7":-1.3377382497013526,"8":1.6459695803173058,"9":-1.7344283029712266,"10":0.17500758518991838,"11":1.5423004376192622,"12":5.567249275398219,"13":2.1691358676776518,"14":2.2691273168466397,"15":-1.7243209562488497,"16":-11.585719422808262,"17":-7.922018126480072,"18":-7.523207853341146,"19":-0.6712266665575288,"20":-2.5098846951847,"21":-3.745024551020324,"22":2.9502459300546326,"23":0.04347230887417887,"24":-0.8886556546153198,"25":1.6742084563726958,"26":3.398007611189673,"27":4.013624747801021,"28":7.770985556350155,"29":-4.696838086315596,"30":-4.986197862259373,"31":-1.2744242087780238,"32":-1.854061788211302,"33":1.0339159238508764,"34":-5.059502477544171,"35":-4.769341146383433,"36":-0.49234050214071273,"37":-2.4273044765255785,"38":-6.466722195696207,"39":-2.588496589016924,"40":-4.280719138176001,"41":-6.645615297017687,"42":-0.7277934899518738,"43":-2.7546176567408236,"44":-7.082958401216691,"45":-4.26550926873917,"46":1.667079999384116,"47":1.7887413615107965,"48":-2.3163520967818263,"49":-6.924539267111999,"50":-5.328142911698814,"51":-0.9096878595020602,"52":2.281788252745468,"53":-1.4662978732042198,"54":-2.559136472631906,"55":-1.7022352106210992,"56":-1.0805364701381437,"57":0.6814016236106116,"58":-0.7192493367440964,"59":-4.1474869302760835,"60":-2.1395502237695534,"61":-2.8758876343140822,"62":1.63758017018392,"63":1.3919146463049132,"64":-0.4297181488731861,"65":-2.2991058842912855,"66":-2.124175701073748,"67":-3.00760593629083,"68":-3.8254036108796474,"69":-3.8268601779896114,"70":-3.0232047570664435,"71":-1.3494407128243626,"72":-3.0392034562191097,"73":1.9120807988949973,"74":0.6328789612255227,"75":-4.461243149634886,"76":-2.304755518952366,"77":1.2711575190913487,"78":-2.0233607516547476,"79":-2.330317149189901,"80":-0.6775842436099313,"81":-1.955938413901429,"82":-0.8939648543240553,"83":1.3822661435234547,"84":0.12961668493446965,"85":1.7895652122492764,"86":-1.0077629824824617,"87":-1.315914883518019,"88":-0.09761121463696347,"89":-2.0710795976301815,"90":-2.2608786588989878,"91":-0.8281755662419773,"92":0.15916632796008737,"93":-1.471837917010345,"94":0.06341161653410415,"95":-1.9665243563137222,"96":-1.4376227757625482,"97":-0.5352292930588752,"98":-0.18143706775264654,"99":2.2623733661967376,"100":-0.7946914359972989,"101":-1.7512914913768958,"102":-0.6471946419598452,"103":-1.2623609545967407,"104":0.5318936145141431,"105":1.2247395962714844,"106":0.4858282767608017,"107":0.13367632346637512,"108":0.9197425580607859,"109":-0.2480943493918566,"110":0.6075708012733899,"111":0.650717651459318,"112":0.6444567215296947,"113":0.6849445634523467,"114":0.2885790032641536,"115":-0.9533323684265165,"116":0.21993758183181875,"117":0.2645795657757678,"118":0.34719257235547424,"119":0.5563815423243965,"120":-0.3141467015667185,"121":0.7933013049169441,"122":1.0989539288296781,"123":-0.004998254779933479,"124":0.4419956144130305,"125":-0.5845673714487798,"126":0.6150846835903401,"127":0.7415083641216917,"128":0.8545235796015594,"129":1.352047564074912,"130":-1.044354459230182,"131":-1.0514295563678093,"132":0.8804374501893394,"133":-0.8024162301850261,"134":-1.201084110239115,"135":0.11854582782924836,"136":-1.1500226287542152,"137":-1.6476643046416102,"138":-1.8007571067398127,"139":-0.5532405237756088,"140":-1.1781089958623563,"141":0.44006433500509834,"142":0.5869743811914827,"143":-1.4829191810085793,"144":-1.9241472688097394,"145":-2.1038010033980443,"146":0.7702695483293683,"147":-2.0776029746031153,"148":-1.3983058974706872,"149":-1.389742389132444,"150":-0.09216214074783403,"151":0.527984584606048,"152":-2.67045752874556,"153":-0.886295195654854,"154":-0.5277539062759001,"155":-1.4171053014282404,"156":-0.0009809378161773773,"157":-2.182583587907462,"158":-2.5006136228822724,"159":-1.3635258269900912,"160":-1.6332373093237131,"161":1.9396824495145315,"162":1.4822084750502782,"163":-1.7119824251931093,"164":-2.3203051002447648,"165":-0.8479205982120557,"166":2.1238439133698983,"167":3.0312114627976476,"168":-1.1032951510290205,"169":-1.439347296132388,"170":-1.50771015286935,"171":-0.45941128418278326,"172":-2.2646918379165464,"173":-1.8294458286153275,"174":-1.9500982289076714,"175":-1.5613852525405647,"176":-0.6566434136442614,"177":0.011650259560992226,"178":-1.0278138435856192,"179":-1.0926146696947474,"180":-1.6103486000641853,"181":-1.8939638541161345,"182":-1.4805466756989776,"183":-1.83109431413619,"184":-0.6685431125650991,"185":-0.9130113078850196,"186":-1.0680868717769265,"187":0.6040299611184161,"188":1.6694679812183195,"189":-0.8963701905112033,"190":-0.676381744467698,"191":-0.7651123391973031,"192":-1.0766774091736546,"193":-1.2165906886672346,"194":-1.0447094534477994,"195":-1.0359682808681434,"196":-0.2623960248423367,"197":0.1284334489093459,"198":-0.7831460232440395,"199":-1.051125740729836,"200":-1.1961540788406695,"201":-0.23227878632328403,"202":-0.04301436176241506,"203":1.1251511356868307,"204":-1.8179795604235123,"205":-1.1696442514937258,"206":-1.0223343982847355,"207":-1.5624576200436984,"208":-3.449920593364711,"209":-2.4941954288498174,"210":-0.9229308816661603,"211":-0.9481789640677081,"212":4.327552033491584,"213":-0.9721070924505084,"214":-3.655070302504492,"215":0.739233089479354,"216":1.2322578185421227,"217":-1.9106093586390864,"218":-2.035624936334032,"219":-0.866124209611078,"220":2.2550338579393965,"221":0.5058825230660277,"222":1.1382308871495375,"223":0.8443926187885524,"224":-2.9080289390087075,"225":-3.357101520975928,"226":-3.4145033423383073,"227":-1.489360153701637,"228":-1.0873683864296233,"229":1.8951948216079908,"230":-1.063874091088629,"231":2.4281477907725955,"232":-2.6100816716671553,"233":0.7008477467504751,"234":2.282485412781122,"235":-1.1490078072432963,"236":1.521469626035848,"237":-1.0732350319701236,"238":-1.7755920877223512,"239":-0.46087197220215487,"240":-0.8859180588649378,"241":0.9655935594179439,"242":-1.4625047892792982,"243":-1.1992365659541164,"244":-0.7345578741269984,"245":-1.5563833749376021,"246":-0.6535040188257714,"247":-0.6934994714039949,"248":-0.13034627625625086,"249":-0.4324305132335243,"250":0.14117840352585564,"251":0.8687777458534424,"252":-0.8015834940142624,"253":-0.6501285456871527,"254":-0.4565093642664576,"255":-1.4312478477381765,"256":-2.2992937075491584,"257":-0.35730082961485293,"258":-0.9271143585268941,"259":-1.1028874291021329,"260":0.11264858768429138,"261":2.373946023894302,"262":5.92072410186632,"263":3.0211444327925396,"264":4.148722134882936,"265":1.1367780990674892,"266":-1.1388378382889512,"267":3.297130092295845,"268":3.9273440878433723,"269":3.543852304080152,"270":-0.9207643399215781,"271":0.47341578010195495,"272":2.703951664439392,"273":2.37546821307129,"274":4.012223201568279,"275":1.1820382448806734,"276":-1.2439420672647572,"277":5.553803578086042,"278":3.929126121570372,"279":2.62720516760072,"280":-1.8253410436567703,"281":1.9106265289289774,"282":6.330546208588749,"283":3.0246341841546505,"284":3.9880344592365917,"285":1.456399492035366,"286":0.17485591874783535,"287":-0.6161137747829192,"288":-0.057113689006094565,"289":-0.7759555999675164,"290":-1.2414616131383036,"291":-0.785763563159862,"292":-0.8073017010474813,"293":0.06643051343725813,"294":-0.47809002799271705,"295":-0.6549663872794961,"296":-0.968979858438927,"297":-0.19002051952598076,"298":0.6735027738536375,"299":-0.9261243082692809,"300":-0.5050606681468287,"301":-1.2434576054395972,"302":-0.05653305653230958,"303":-0.982724793618569,"304":-1.1995900115127278,"305":0.17728620552818075,"306":-1.5563420999258086,"307":1.4240078950913206,"308":-1.0377368564971388,"309":-0.8387685078760355,"310":0.27089033256754164,"311":-1.4308017791635725,"312":-3.2822330478540334,"313":4.400602198347803,"314":10.738008635214106,"315":9.93316836496315,"316":6.548759278386507,"317":-4.851587299546816,"318":7.499332095085857,"319":6.6508926712905145,"320":8.065055727262934,"321":8.5721770620992,"322":1.2927994962992526,"323":-5.965396483605476,"324":6.867252777904703,"325":3.816043123882004,"326":5.740627230185324,"327":1.597999884544451,"328":6.484621916882391,"329":4.510942450898063,"330":6.756086510706587,"331":4.2960101178076995,"332":4.050455520756579,"333":-2.877082916195278,"334":6.040034493333663,"335":10.324196031703522,"336":4.71266012866776,"337":1.0410902394703732,"338":3.4012087991528754,"339":2.8535629096267874,"340":-4.80589047761127,"341":1.1818080370095398,"342":-6.210863415854313,"343":-4.897790854541667,"344":4.403126539608497,"345":2.0624011614625255,"346":-2.6289621534529353,"347":-3.2955620195527624,"348":0.61071706128048,"349":-8.733025870229964,"350":4.45595033140642,"351":3.349752694585036,"352":3.7543186332980762,"353":-4.668009648645767,"354":5.501685743989335,"355":-1.1886635021587277,"356":1.2115157693855931,"357":-0.9450373500674779,"358":-4.867770598485982,"359":3.1883948231392636,"360":-1.0708753839394696,"361":4.3720697644022675,"362":0.06471632129981242,"363":3.028299658761181,"364":-3.5686812354105526,"365":1.732729823517307,"366":-4.133824000360248,"367":4.07674627490781,"368":1.6785157924751892,"369":-0.9588423764748648,"370":-1.7070203938773996,"371":3.9203726739936293,"372":-1.4013345344002726,"373":1.313846336755664,"374":-3.686876102514561,"375":-6.673150474185216,"376":-6.426433632342333,"377":-7.060819639351168,"378":-11.111494399173063,"379":0.6766729417445112,"380":-0.5754802174156658,"381":3.8837051071301207,"382":-0.4600756178569477,"383":-1.091434235693008,"384":0.032814044848694386,"385":-0.021989939522699956,"386":-1.30371373220843,"387":0.3977694900907866,"388":0.46730062901969144,"389":0.3033373237700049,"390":-0.25741777399657245,"391":1.7127361928543774,"392":1.4357564905372497,"393":0.5995390005233747,"394":0.5805564821446904,"395":-0.27665604763808965,"396":0.800471131698029,"397":-0.6534754663459902,"398":0.5238716636449905,"399":0.3561648316707966,"400":-0.1103189472562454,"401":0.4723893120153043,"402":0.6778339324341677,"403":1.6125118663367886,"404":0.7699255748714535,"405":-1.227805055744464,"406":-0.41186959589533106,"407":-0.874866801686522,"408":1.1431357989771758,"409":1.3678664497368411,"410":0.8735499431370112,"411":-0.02696388790633865,"412":0.8371889361201049,"413":1.0191235746517628,"414":1.09393416030208,"415":0.9974845363007132,"416":-4.6155588603105775,"417":3.3550754573189097,"418":-5.408705774532112,"419":-4.330773595028573,"420":-3.4308591501621017,"421":0.617222197776792,"422":2.292627202149164,"423":-7.138656081543261,"424":-2.153528834850858,"425":-3.771456709713955,"426":3.259589930551407,"427":-4.515354112867981,"428":-1.9653888273474316,"429":-1.9780919733450695,"430":-2.2440170226878315,"431":3.886898633739859,"432":-2.6637100589129146,"433":-4.24038502905729,"434":-5.893098366328958,"435":-1.8711189578018819,"436":0.15882180902131796,"437":-2.844986277920666,"438":-5.888741201593395,"439":-4.386039263280224,"440":-2.482629048009616,"441":-0.8296218118337685,"442":-4.716456801951175,"443":-2.1483954332480626,"444":2.739016286677376,"445":3.923476239581405,"446":4.296533215954177,"447":-0.7326674815873321,"448":3.1307558586301023,"449":6.371206640158217,"450":7.214416738145139,"451":2.0915074749956544,"452":-1.1458653650919126,"453":3.8281541671397235,"454":8.234742671692729,"455":5.132680140072758,"456":6.278497328774206,"457":-4.362946136625968,"458":3.2245046767808603,"459":6.745369224834169,"460":6.225236917370998,"461":2.6775300557974857,"462":1.190617458293533,"463":1.4732976848921229,"464":8.897659994056067,"465":3.2474421408652647,"466":5.391259167764202,"467":-0.8442887138213149,"468":2.557225221947405,"469":-3.540718869563834,"470":-2.2212543719128184,"471":-3.514484515097168,"472":-2.8824326756067467,"473":4.246023363507884,"474":-0.2524109284260811,"475":-7.242138728035613,"476":-2.4917468618887497,"477":-3.5072758402633033,"478":-6.308985763392723,"479":-5.388453426466796,"480":-4.256600942384039,"481":-3.9572476298648738,"482":-1.0629796490795098,"483":0.8486115659838268,"484":-2.9160566515495203,"485":-2.205436777938504,"486":-3.2484766716763076,"487":-1.9117318334570141,"488":2.856059507182746,"489":-6.378703661304447,"490":-3.8554288392723994,"491":-2.9333909631491073,"492":-2.2365571146085075,"493":-0.2905258262885052,"494":-1.6924280813410522,"495":0.35694183896127724,"496":5.246181696135022,"497":6.760221834441962,"498":3.866585098319661,"499":2.3659891813488496,"500":0.34590789904783814,"501":8.990174489368522,"502":7.894642388070986,"503":9.34312081789442,"504":5.147047672712947,"505":-0.44515482823870606,"506":5.678707969507114,"507":5.625966038324689,"508":5.412578677459548,"509":0.4239786507592744,"510":-0.5100379774909639,"511":6.108249773713157,"512":8.009919202217143,"513":4.4963716269251846,"514":0.11422627797925405,"515":-2.7782850470576244,"516":8.649374037937383,"517":8.070010846101924,"518":6.613125810799985,"519":-1.3800514109557191,"520":-0.3967722533080287,"521":-2.2407588417421485,"522":2.997717300006437,"523":-2.0238795806285355,"524":-3.2522746599159924,"525":1.0316899712278127,"526":1.2856095615809764,"527":3.96638672657813,"528":-3.282648420146503,"529":-2.5406512922191506,"530":-2.3874810211079645,"531":-1.133690350486337,"532":0.01304332349333937,"533":-1.3271331083867621,"534":-3.725680918105933,"535":0.13484758925983595,"536":0.830050316400681,"537":0.5713381942548581,"538":-3.1536775710302116,"539":-3.4959046021953664,"540":0.20204115613442836,"541":-0.41917874382973863,"542":-1.7656487145018704,"543":-4.52846291209601,"544":-2.6548233166345674,"545":-1.7963499297042895,"546":3.804996704083784,"547":-1.9338169721761345,"548":-8.208190903968072,"549":-3.8545674354843253,"550":-3.1187917290677643,"551":1.9821468906020658,"552":5.380611242883524,"553":-5.073898334574321,"554":-5.651118482963967,"555":-4.285820755615327,"556":-0.5983956409071411,"557":-5.250318848711811,"558":-4.7493459842011925,"559":-3.6174773410425467,"560":-3.3017995181464808,"561":-3.5001411090423344,"562":1.825358184372959,"563":-7.338415692362247,"564":-5.114971341664091,"565":-2.9707968095571453,"566":0.8845436770785655,"567":-0.2738982951683172,"568":-6.687343191324922,"569":-3.9857906797795843,"570":-5.228478173626116,"571":-1.3365372179627988,"572":-1.981682208430407,"573":0.0010946842014121858,"574":-6.3257652853388775,"575":-8.151007306811852,"576":-6.533877785764697,"577":2.874025548400357,"578":-3.618493003673523,"579":-7.671444218603467,"580":-9.129251947812042,"581":-4.59386629108714,"582":-0.16604673208878307,"583":2.126137018013576,"584":-7.217310755680183,"585":-8.190713415811532,"586":-6.424769115688851,"587":-0.5909825418214611,"588":-0.21121543891540379,"589":-10.062105359844496,"590":-5.208018133960118,"591":-4.328797903553378,"592":-0.22115310107232206,"593":-2.783311416326963,"594":-7.774835438152247,"595":-6.313453400587868,"596":-5.425704934737735,"597":2.534320608441402,"598":3.016146180490944,"599":0.04988209826101213,"600":-0.07035509899436768,"601":-0.4039230882167256,"602":-1.8092174199174507,"603":0.39703941050053787,"604":0.7639408734950507,"605":-1.8632900590469255,"606":-1.4917122204506146,"607":-1.1185557283340029,"608":3.6760808500129145,"609":0.8440514620416125,"610":-6.305562482292504,"611":-6.580859610490976,"612":-4.074385144662146,"613":-0.04063220139898598,"614":-1.8858969389154303,"615":-3.2657651812364152,"616":-5.254097915634777,"617":-3.632036999421928,"618":0.7117548214714057,"619":0.5932812209784082,"620":1.092266572893889,"621":-1.0638877458059974,"622":-1.0819014350285607,"623":1.5279100062170892,"624":1.1022233150324205,"625":-0.556997462322954,"626":-1.3993843572347302,"627":0.3935312280193967,"628":-1.0757483200256834,"629":0.5218929122171876,"630":-1.997416232188677,"631":-1.0477656711286136,"632":0.7730172182028892,"633":-1.2958553893773748,"634":0.7465643813546071,"635":0.10902918346323344,"636":-0.37826947109712095,"637":-0.6133704967268757,"638":-1.1401125320696994,"639":0.030354618242383714,"640":-0.4762933572384457,"641":-1.6632659319588838,"642":-1.778220584397169,"643":-1.0366296501894152,"644":-0.7145396598405207,"645":-0.7093941941839264,"646":0.4799418420164325,"647":-0.5118110568534114,"648":0.14034135527404681,"649":0.11111468544931993,"650":0.6221488863146182,"651":-0.40226101612968,"652":-1.0882212238641393,"653":1.6032756965896913,"654":-1.4101840107444101,"655":0.9153203244334354,"656":0.568202448762661,"657":0.2074296960497128,"658":-1.0302050796678104,"659":-1.4016645897580753,"660":-0.12805471619292283,"661":0.9863975136437836,"662":-0.06901943714219447,"663":-0.8616573420893155,"664":0.3844414204854617,"665":-1.2455209820930295,"666":0.1972600315368276,"667":-2.114268926704125,"668":-1.731638325798773,"669":-0.2030380933471199,"670":-0.9739210582856626,"671":0.828366033229517,"672":0.07969182647088652,"673":-0.4408752532337263,"674":-0.32228318633676173,"675":-0.8059545197383042,"676":3.06312351286705,"677":-2.6320308553308687,"678":2.5827036221271253,"679":0.014270808152354188,"680":0.5479452889767317,"681":-0.36449869643064164,"682":-0.03652165051639458,"683":-2.3382279387947316,"684":-1.3452269444596934,"685":1.1205553350914026,"686":-1.9141563507145865,"687":-1.2950379150014864,"688":-2.455448339417067,"689":-2.5429880274357237,"690":-4.177708465446349,"691":-2.318737158420709,"692":-0.6271538115043701,"693":-3.2616731627731976,"694":-2.108827358437326,"695":-1.294652320544512,"696":0.23032957782342797,"697":0.41641538448304344,"698":0.27261739847071365,"699":0.23015817407523184,"700":0.19553539889570323,"701":-0.24117927462627786,"702":1.4026763038470627,"703":0.22531343474313933,"704":-0.5292904168952344,"705":1.5381481349315367,"706":1.0479374711816696,"707":0.2485481484039596,"708":-1.6400825931050937,"709":-0.44328250899592053,"710":1.184574961576583,"711":2.0713280463148176,"712":1.26466756025708,"713":-2.6883673992165322,"714":7.877650666085471,"715":5.120599728637552,"716":4.0949577797169185,"717":-0.5372924431262986,"718":-3.082008162333123,"719":0.10829069563444602,"720":1.6386567938433882,"721":1.5914636636061734,"722":0.5644960722815912,"723":-0.22775906671938842,"724":1.4063550192262977,"725":-0.548202818277928,"726":-0.07230537371292238,"727":0.4751427275725231,"728":-1.4834206250335158,"729":0.6233326315535891,"730":0.4869097630190474,"731":0.3073452083406302,"732":2.2452447052065776,"733":-1.9840951273086895,"734":-0.39797614900795236,"735":2.215104533269119,"736":-0.11649823462014654,"737":1.0905871884851133,"738":0.07753377866194322,"739":-0.16854785362649974,"740":15.003732234971814,"741":4.157467762927454,"742":-1.7337961426202562,"743":1.9040475238449872,"744":2.3238520142920795,"745":2.320900430404127,"746":1.9571010385269116,"747":-0.8442025821863063,"748":-0.08176413827517781,"749":0.8338654262757472,"750":-1.6446071280632661,"751":-1.2871334853609941,"752":-0.9582993159869924,"753":-0.5906866937129253,"754":0.10115965329108413,"755":1.191089505523909,"756":0.9631220701980476,"757":-0.22984792377310814,"758":0.8249147028665261,"759":-0.39134844530274215,"760":0.2388853261504675,"761":0.2516177677522561,"762":0.7437034597725488,"763":0.583413164781305,"764":0.2117470115599465,"765":-0.4501953166869805,"766":0.1301003396828275,"767":0.42948144358161255,"768":0.03749094489265589,"769":0.037355537701734505,"770":-0.10891484715326423,"771":0.5216165082426206,"772":1.1317829969940072,"773":0.22938877266084362,"774":0.2989371551926604,"775":-0.04338618049757297,"776":0.8354533043740945,"777":0.7216870387661557,"778":0.7825329614010662,"779":1.313750384512593,"780":4.1688298104477575,"781":4.688374471773468,"782":1.5046352363877258,"783":5.557844416093569,"784":6.508736130428975,"785":-0.4896496416499426,"786":-4.779850267788192,"787":5.794686424288578,"788":1.9235297326251999,"789":4.124014805105042,"790":0.35664426718339515,"791":5.133482158226606,"792":5.055119315415467,"793":6.077033977855813,"794":4.499581946201491,"795":3.0072427220129523,"796":-1.3984183588460501,"797":8.17841753274346,"798":5.247568042226401,"799":3.107487901854334,"800":2.8467764695349853,"801":-1.3297653962566882,"802":7.078200608901618,"803":2.1379057046763195,"804":2.854722523275076,"805":2.0846539898211254,"806":-2.175604180205506,"807":0.6303427426540761,"808":-0.2928863094394767,"809":7.81138174139797,"810":7.73619555811569,"811":2.296093644796285,"812":-3.0890856970464897,"813":-0.09077532205776188,"814":7.346746789284697,"815":7.294677346971568,"816":7.332047449140435,"817":-1.8635067824695832,"818":0.9529728636556863,"819":7.823301345162812,"820":6.888873285159203,"821":-0.3666410969933729,"822":-1.8898343489948275,"823":-2.9477602887164744,"824":8.876289664423464,"825":7.172431346578773,"826":-2.394119933856193,"827":-0.832596730964474,"828":2.3129497128346626,"829":6.178480442198357,"830":3.4640692849197174,"831":2.8406937376540426,"832":-1.3397898668913453,"833":-1.0412796039848746,"834":1.8891311984969885,"835":-4.675496334727625,"836":-3.4309431169678515,"837":-2.7968030081499635,"838":5.72307702131243,"839":-1.2924844623059115,"840":1.9638238540056439,"841":1.9275621317555895,"842":4.52335296561807,"843":3.6912062232375225,"844":-2.6164022103631708,"845":-3.0634344889227267,"846":-7.5605339672571485,"847":0.11480829979293401,"848":3.7060087068820566,"849":-3.6801688451854053,"850":-3.0520670972816344,"851":-4.151916938178089,"852":0.33963791711061475,"853":-0.32829542792792005,"854":-1.9623764300263615,"855":-4.116528638805606,"856":-3.476700172571209,"857":1.6333152405865985,"858":-1.887212523312425,"859":-1.7939595311774106,"860":-3.2905551156603616,"861":-2.4996786191930758,"862":-1.5306381611313897,"863":0.6810743561669486,"864":1.351324813369767,"865":-1.7431601879896252,"866":0.5594842474804662,"867":-1.0228317178103108,"868":-3.068633442171921,"869":-1.704202929122353,"870":-1.2285036584912397,"871":-1.8594294525730937,"872":-1.8383888314685146,"873":-1.1528570467774837,"874":2.8353750299389975,"875":-2.78585611900205,"876":-2.6857060489600197,"877":-1.576409721783317,"878":-4.7885592455645805,"879":-0.7165174386256595,"880":-3.190425772997162,"881":-1.9962204646310795,"882":-0.6206538457939069,"883":-0.9110034002741942,"884":1.1468037949401402,"885":0.3992113633319952,"886":-3.320979680046642,"887":-1.1550483121007225,"888":-5.8221917456959655,"889":-0.8264385434170848,"890":2.85579377816111,"891":3.6105105345042503,"892":-3.7942401932588083,"893":0.03604613512523065,"894":-1.2446214459475193,"895":1.300197937404255,"896":-5.4356985114727605,"897":1.0466165195525092,"898":2.792955763479564,"899":-4.751966008085175,"900":-6.715748799070439,"901":-0.16550151214898517,"902":-4.0696244704453,"903":-4.9303061751382895,"904":-0.8707080132213921,"905":-1.6079494585841412,"906":-3.885079161597686,"907":0.33929437642253135,"908":4.674455729970461,"909":0.9035521371492246,"910":1.2314941251133544,"911":-3.1273088719638644,"912":0.2029714956665314,"913":2.9682526610482602,"914":2.9558218925447775,"915":-0.19268117837085125,"916":-0.835103251973591,"917":-0.2463631996617919,"918":5.170937342894504,"919":2.5724721382337847,"920":-1.3099120668916402,"921":0.6941757255921254,"922":-0.025441420516242506,"923":1.6860071708214972,"924":2.159585408440603,"925":2.2544427296742384,"926":-1.0686255152303172,"927":-0.23400474043866698,"928":2.051228381656527,"929":5.553422901183614,"930":-0.7643060057335158,"931":2.980930983624969,"932":-1.30521596113536,"933":4.687472798656735,"934":2.8392251832250808,"935":0.7913780033076148,"936":-1.4122632434867515,"937":5.667488235717678,"938":-5.104382728674126,"939":-3.8654760256800125,"940":-4.03237993531119,"941":-2.175326620871737,"942":-6.363288446445974,"943":-3.7152918304244413,"944":-4.7582891232482485,"945":-2.0446771226277787,"946":-0.3705276720896141,"947":-7.394927131267664,"948":-1.5027626441874964,"949":-2.113714062959241,"950":-2.360505023609756,"951":1.5849594332694688,"952":1.1345783495321398,"953":-1.9120505055982766,"954":-2.9805879255214616,"955":-3.984866209106748,"956":1.911842558930895,"957":-4.706803796154492,"958":-4.464191447620322,"959":-3.2523653407167696,"960":-2.4200126883575575,"961":0.3791003930510168,"962":-0.04310599920345372,"963":3.4896001751229844,"964":4.133194220909288,"965":2.916462531338851,"966":1.0812052806317434,"967":-1.5473713989590052,"968":-0.8210755129323112,"969":0.11836353096946022,"970":2.4667229465804783,"971":1.4225376464302042,"972":0.2630595443128505,"973":0.8889980985285234,"974":-1.8587148470751678,"975":-0.7407156901342018,"976":2.345642087161173,"977":-1.7796874464526187,"978":-0.06273298280172512,"979":3.8760617662194927,"980":2.2683722528906163,"981":1.8566685222762938,"982":1.1072522586340576,"983":-1.603040013113877,"984":-1.1068126942048855,"985":0.9804627158039196,"986":0.7502558239615406,"987":0.8413618409424531,"988":-0.24512942862665704,"989":0.294984693588979,"990":-1.5532971317895388,"991":-1.0456390732652021,"992":-1.2809217078590707,"993":4.312313776897651,"994":8.933964682177493,"995":2.8329839795440934,"996":-0.8169651722346415,"997":1.0773256629641923,"998":-2.9016255624153713,"999":0.3707103319125063,"1000":2.2206914122839403,"1001":-6.63476055015054,"1002":5.290863210826126,"1003":0.1932843502044783,"1004":-5.051506634318684,"1005":-3.612789452635079,"1006":1.9520910326663548,"1007":-2.760532531965393,"1008":-0.27608108188523395,"1009":-1.3599961851046436,"1010":-2.9209290020807415,"1011":-1.4639904334660407,"1012":2.1997585887448636,"1013":-1.3059508262754482,"1014":-0.033735893773110044,"1015":1.1675595956813931,"1016":7.9712041135596285,"1017":7.47489296321564,"1018":4.746913176058098,"1019":-0.6016308146408206,"1020":-0.4800839135785589,"1021":5.924262742356115,"1022":5.39278222499959,"1023":3.9949171276059983,"1024":-5.450753411745433,"1025":-2.833062246122224,"1026":4.854110883705219,"1027":3.3180535512280414,"1028":3.1646711291356358,"1029":5.148185826664746,"1030":-5.745034063253709,"1031":6.753005705146402,"1032":5.629943633031481,"1033":2.8804123927113343,"1034":-2.0711150900291506,"1035":-2.3250049782341216,"1036":4.159973122568012,"1037":1.632550534288125,"1038":4.340014594459039,"1039":1.3580569914164264,"1040":3.814862050603336,"1041":-2.999429644916132,"1042":2.923726587143269,"1043":5.413248068100152,"1044":4.359290575197548,"1045":0.9361931919139831,"1046":-1.8394219978868904,"1047":6.038146300251943,"1048":4.5667705439090325,"1049":2.718793811273707,"1050":-2.3143014784066356,"1051":3.6830570833366094,"1052":1.7036309127757698,"1053":1.3372189067117253,"1054":3.214264217674472,"1055":0.9013922379215499,"1056":0.9285311613448225,"1057":4.9106737949246195,"1058":1.3693652246044612,"1059":1.5969017536534793,"1060":-0.363263795475431,"1061":-4.987817676744057,"1062":4.333417196235465,"1063":5.388225755223806,"1064":3.9514381443087916,"1065":3.0277879738604447,"1066":-1.1316561978560624,"1067":-3.418370276645903,"1068":0.9606751851001375,"1069":7.496836751463586,"1070":2.1445714262148172,"1071":-1.0884100275237472,"1072":4.356436869654441,"1073":2.444614521877369,"1074":4.8458597704683095,"1075":5.789389769759239,"1076":4.181134315372579,"1077":0.5328169993960338,"1078":0.4471497432759197,"1079":2.9849097056403004,"1080":3.138865220832462,"1081":1.110372225190865,"1082":3.9906247520395612,"1083":0.08021004875002907,"1084":4.032199187818572,"1085":3.8221551571177694,"1086":-3.368000852931831,"1087":-0.12310510582851117,"1088":-1.0649707301206373,"1089":4.515623172562719,"1090":4.003501402411886,"1091":1.4626264294430853,"1092":0.8382231396130954,"1093":1.504042093301714,"1094":-1.2492456390789268,"1095":2.9766308178524303,"1096":3.8449061742434343,"1097":5.574459462827672,"1098":0.1567502161467993,"1099":1.0771019702405247,"1100":1.4855864453538505,"1101":2.6842193261597265,"1102":-1.911946738381342,"1103":-0.8298832540703707,"1104":3.8180777688735703,"1105":1.8735376986284624,"1106":5.990936063463177,"1107":0.8499662953611758,"1108":-5.6137933096446675,"1109":1.6798007586875998,"1110":-4.731910966998863,"1111":1.521753934336584,"1112":2.73134104568688,"1113":1.0764798407856584,"1114":5.260301457212349,"1115":-0.23643601910239423,"1116":2.2407589363207134,"1117":-0.14667528163288004,"1118":-2.7455298551592806,"1119":-0.12177702587794882,"1120":2.4159116732686363,"1121":2.490715473665153,"1122":-0.5263781758376187,"1123":-0.36456057338413966,"1124":2.724777918969906,"1125":-2.01797041009111,"1126":-2.3117623722320313,"1127":-3.511956806917102,"1128":1.1592955172329578,"1129":0.07451099213434223,"1130":6.586221624300681,"1131":-0.13385140949818022,"1132":0.30143346641602026,"1133":2.67758723314115,"1134":-4.34968544474975,"1135":-5.178549383204723,"1136":0.7056792016908697,"1137":3.6083726087866803,"1138":1.3889320687535005,"1139":-3.89907058007171,"1140":-6.971186753235013,"1141":0.5722957432279526,"1142":-2.38777496323368,"1143":3.858350957270786,"1144":3.4174414794412424,"1145":0.6132651179524429,"1146":0.5638136960176277,"1147":1.261980897598403,"1148":3.091279510940036,"1149":-1.631289116661661,"1150":-4.0591486328247495,"1151":1.2030885278624837,"1152":1.2298864905069622,"1153":2.7974922035048477,"1154":1.3473129530472285,"1155":3.695798315476636,"1156":-0.27891794047034923,"1157":1.7416594481924057,"1158":1.5046273645048889,"1159":1.9675294072179683,"1160":1.248746476233282,"1161":2.9227801523326375,"1162":3.2238262256443417,"1163":0.9173269468293754,"1164":1.6311056758701261,"1165":-0.694275572040147,"1166":2.8197196278585652,"1167":2.0123191049726796,"1168":1.0584134386094959,"1169":1.668497505832195,"1170":-1.2327414118324773,"1171":-0.4653057543354757,"1172":1.27696920690532,"1173":-2.7762216863332614,"1174":-3.759170765841577,"1175":1.8078800312535133,"1176":4.2763517543837155,"1177":-2.352404688971282,"1178":-3.2532779375905436,"1179":-2.6988458314316186,"1180":2.5393555726186556,"1181":-4.2543472653910275,"1182":-3.802446763005517,"1183":-2.4229971241960935,"1184":-2.006626469214347,"1185":-0.7021471409496389,"1186":-0.28012071821783646,"1187":0.04103141283156587,"1188":-2.93249419385446,"1189":-1.3485314449517452,"1190":-1.70802117231932,"1191":-2.097524882626323,"1192":-4.7374116408579505,"1193":-3.2685617705584598,"1194":-3.570625059837279,"1195":-2.649392560083966,"1196":0.21660012648819577,"1197":-1.6905730089597684,"1198":-1.9477839395811671,"1199":-3.6329457449525657,"1200":-2.2062493522993267,"1201":0.08458243451729404,"1202":-1.6420308648766748,"1203":-2.5469310426140273,"1204":-2.4071026225356085,"1205":-2.4054137516868397,"1206":3.6881820700453822,"1207":-1.6096253916786407,"1208":-2.059930937994601,"1209":-1.3590980093624865,"1210":-2.5719521077653997,"1211":-1.9369288144333168,"1212":2.4304761336639364,"1213":-4.000816790263057,"1214":-2.3661592407964367,"1215":-1.2379035495849533,"1216":1.4414607495839002,"1217":0.39123636326779604,"1218":-4.094463468830192,"1219":-2.0562900840175615,"1220":-2.4849860002257227,"1221":-3.9325659061473806,"1222":-0.20245418427167763,"1223":0.187872669219292,"1224":-0.0229412524801341,"1225":1.1486367731721512,"1226":1.2198710264665065,"1227":0.7566479971368693,"1228":0.48679574023182726,"1229":-1.528328513941108,"1230":0.9672318141664223,"1231":0.6464523124109128,"1232":1.141055490523656,"1233":-0.41323757396180566,"1234":1.0340641159281567,"1235":0.17761896710701774,"1236":0.34440847417203846,"1237":1.5390169158165343,"1238":-1.294108658449642,"1239":1.0543982574878992,"1240":1.4260957265414942,"1241":0.6593453118008268,"1242":-0.9846685624732868,"1243":-0.40335659109866767,"1244":-0.12459458866636246,"1245":0.8799243097457053,"1246":0.5424865927535824,"1247":2.0416127194226874,"1248":-0.2915785730605095,"1249":1.6504812374765163,"1250":2.5429737299371604,"1251":1.419068418913607,"1252":1.7117318060569429,"1253":-2.1941437457215325,"1254":-1.0688890860465114,"1255":1.5779296657658095,"1256":2.6107272509221926,"1257":0.6946372555253754,"1258":-2.176138132293836,"1259":-3.1717976116041124,"1260":0.6013283897582408,"1261":1.1871718864148353,"1262":1.60653968663868,"1263":0.8167895083260789,"1264":2.59543790186224,"1265":1.7818243200193447,"1266":2.048297899013268,"1267":1.433398260722742,"1268":0.4889332807766596,"1269":-0.336462435734412,"1270":1.2569391367854135,"1271":0.9300758310211619,"1272":1.3913308865609335,"1273":2.173110854010877,"1274":-1.1543918349696407,"1275":0.15208795172077233,"1276":-8.615837610814346,"1277":-8.92424139855059,"1278":-7.703024219700473,"1279":3.0086766279218518,"1280":-1.5298970813070407,"1281":-8.559746330123092,"1282":-9.682194322086165,"1283":-7.968183154662121,"1284":0.1329107462690213,"1285":-0.7707345074733861,"1286":-7.3094740292463785,"1287":-8.277113622734987,"1288":-7.709084059647951,"1289":0.6903768403315984,"1290":-0.05796489843410299,"1291":-13.749577703177982,"1292":-7.706160844323569,"1293":-8.68298791559353,"1294":-1.1813154166947892,"1295":-0.9973831180542417,"1296":-5.6908447327271565,"1297":-5.4104154086998335,"1298":-6.921071609604167,"1299":-3.975403942128454,"1300":4.444391871565131,"1301":1.878552164037286,"1302":-4.618358830374341,"1303":-1.0506266774666366,"1304":-5.1520441264361585,"1305":-6.03304423750466,"1306":1.4776620994901086,"1307":-7.195141100341201,"1308":-5.375336060968537,"1309":-7.138879080777648,"1310":0.9653528215545715,"1311":-7.123688391793102,"1312":-4.425331412854286,"1313":-5.354467082671671,"1314":-4.998027228191437,"1315":-0.6569818784171905,"1316":-5.252616042327429,"1317":-0.06610806766704438,"1318":-2.022505967217246,"1319":-5.8383352255438545,"1320":3.6147962666144586,"1321":-2.895791571202848,"1322":-6.7363913677387455,"1323":-4.367831055906565,"1324":-4.079265716490974,"1325":-2.474086381404031,"1326":-2.3065234644268027,"1327":2.883596949756014,"1328":1.5580375204554762,"1329":-4.258308083624741,"1330":-0.5546801012377128,"1331":1.558897431174027,"1332":0.9859384036062538,"1333":-0.1001276775150442,"1334":-1.812451812277941,"1335":-0.08885212084070608,"1336":1.5822299759922458,"1337":-0.49333542666637475,"1338":-2.139856140323579,"1339":1.0703316137822885,"1340":-7.123773944886545,"1341":-5.28765327768056,"1342":-5.8319645596379495,"1343":-1.8115161563949929,"1344":-0.9371763631034146,"1345":-1.3493646475051142,"1346":2.937652760782734,"1347":1.3960148420683356,"1348":-3.0538101582284813,"1349":-5.757560408138282,"1350":-1.8725342597172638,"1351":0.5462438732162973,"1352":0.5051323936489706,"1353":3.7823788622129517,"1354":2.77586194522931,"1355":2.300970685702375,"1356":1.8951009679617323,"1357":-2.8337426219957433,"1358":1.7806975228396849,"1359":2.059768622170391,"1360":2.30824164599858,"1361":2.52050973249355,"1362":-1.3358829418793512,"1363":-1.8436365007001099,"1364":1.0737632108883288,"1365":-0.3336121894108948,"1366":1.3809140511325342,"1367":3.4117768854748736,"1368":3.5424310198335363,"1369":0.8371749621678364,"1370":1.7472034158187375,"1371":2.86445432377307,"1372":1.0175173532400148,"1373":0.9120989527958115,"1374":3.203533579912844,"1375":1.0842254385427998,"1376":2.4545470874633732,"1377":-1.186086579913229,"1378":-1.5952220769660994,"1379":-6.509222286493118,"1380":0.34326096192954725,"1381":-0.5980778149142064,"1382":-2.4230482491138168,"1383":0.6841050068299678,"1384":5.373980162064475,"1385":1.1261877616991562,"1386":-1.2466063824325047,"1387":-2.520297807703907,"1388":6.781495257391172,"1389":2.654875667649388,"1390":-0.2803670060230743,"1391":3.904443911659049,"1392":1.6570338248963101,"1393":0.1921025784580121,"1394":-1.9483223473919675,"1395":1.2752989162691268,"1396":-2.803738074260274,"1397":-4.317856916707871,"1398":-2.07702278064176,"1399":-3.6622924585810614,"1400":5.784717675216038,"1401":2.1065288315283532,"1402":-5.925451404922569,"1403":-1.2008991474338233,"1404":-0.4602545194008815,"1405":-1.0656001758115023,"1406":-0.6305868903241567,"1407":-0.6979485450189166,"1408":-0.7903794648667604,"1409":-0.25501390561058446,"1410":-0.5867667140937423,"1411":0.014288016044015816,"1412":-0.8275289806595753,"1413":-0.6379938457547238,"1414":-0.2337825976360727,"1415":-0.3254849796546018,"1416":-0.5909182799443937,"1417":-0.9146035027023212,"1418":-0.9166342724358273,"1419":0.4128683750693196,"1420":0.17693418040256104,"1421":0.5989795264230788,"1422":-0.41363756268382024,"1423":-0.845213378777272,"1424":-0.20122412009444876,"1425":-0.05663145378660417,"1426":-0.472217991872223,"1427":-0.30532222949154486,"1428":-0.3170811661976404,"1429":-0.7688968393056675,"1430":1.7186821178224092,"1431":4.234219194681516,"1432":-0.23813084297896323,"1433":-1.0933523639520746,"1434":-1.2114284342279118,"1435":-3.384214122083287,"1436":0.4396542616324752,"1437":5.647062294519349,"1438":1.427678536223458,"1439":0.8204685004373828,"1440":2.1244578754181593,"1441":-3.5504163242261444,"1442":2.128287690998157,"1443":0.935655179699051,"1444":-0.585283798581365,"1445":1.1494797252753068,"1446":-10.867494442117579,"1447":-7.476516078670773,"1448":-2.191493523722535,"1449":-1.0013370879544452,"1450":-0.7123255635435909,"1451":-2.4321828403889603,"1452":-4.419606005800734,"1453":-1.7750798641740224,"1454":-1.6137004898869876,"1455":-0.1495447900842233,"1456":0.8989444432144971,"1457":5.497152354962125,"1458":-4.383561788085875,"1459":1.917141695354127,"1460":3.0895177359790393,"1461":7.176831542352833,"1462":-0.11834721928640815,"1463":3.5920216992420073,"1464":4.629548188087903,"1465":3.038212876949194,"1466":0.593116922592924,"1467":1.5333420206621275,"1468":-2.672225562632729,"1469":3.3989031787288218,"1470":3.2063743498041206,"1471":0.738983346282914,"1472":-1.9547032569513259,"1473":1.279628592948726,"1474":1.089747843391393,"1475":2.2566674117606342,"1476":3.828036322485485,"1477":-0.6243181631961524,"1478":-0.10396757177141835,"1479":3.0033982277967346,"1480":4.1630670684569795,"1481":-0.9206376364233673,"1482":0.29400244570673295,"1483":0.8929432262098626,"1484":0.10130439568330074,"1485":0.31439906596534684,"1486":0.9793979622285169,"1487":0.33104859567014133,"1488":0.635327637698792,"1489":0.18778183828705128,"1490":0.6287002010326422,"1491":0.5709729450621458,"1492":0.6530320859260076,"1493":-0.15449743383537815,"1494":-0.15960206702704777,"1495":0.5368604970224954,"1496":0.2756108964006651,"1497":0.9916411319705163,"1498":0.18518996581101596,"1499":0.83934612372536,"1500":1.0842766063253624,"1501":-0.3072475858476562,"1502":1.003040513284246,"1503":-0.9728758926398057,"1504":1.0269296523611662,"1505":0.7003581475639828,"1506":0.3524381728889143,"1507":1.4699472355988836,"1508":-3.2305637201286697,"1509":1.4538160379479852,"1510":6.459638659665143,"1511":5.199552580381233,"1512":4.908245760199283,"1513":-3.531503972770942,"1514":4.444135908808588,"1515":2.1326911211088078,"1516":5.1074779897066245,"1517":8.053533365981261,"1518":0.12508070022446935,"1519":-4.879465738621952,"1520":7.605384836492458,"1521":5.089060266139356,"1522":4.880302463795112,"1523":5.174149081448998,"1524":1.4681134417652864,"1525":3.236592212990552,"1526":5.262086839013154,"1527":6.004815552367968,"1528":-0.9703886805293696,"1529":1.8123324973574035,"1530":10.54701331658645,"1531":7.612858093368425,"1532":5.236591981607158,"1533":-2.4058492109824003,"1534":2.3123952650601725,"1535":-2.5635843002244365,"1536":-2.6231584284984466,"1537":-5.388339848781776,"1538":-3.7835661470426825,"1539":-2.4970694997263485,"1540":-0.8286279468918453,"1541":-1.8849722634740378,"1542":-3.2755796773714003,"1543":-6.505213785727922,"1544":3.315993948741849,"1545":3.2810252441752077,"1546":7.960087120186262,"1547":-2.0767939259076056,"1548":1.7770441246801942,"1549":2.260496318133777,"1550":9.619149022250097,"1551":1.9742299145336963,"1552":-1.5960790823793989,"1553":0.9613913580223803,"1554":-1.4642633332371977,"1555":1.3333810029142505,"1556":0.38184511474956107,"1557":0.35588069647512394,"1558":-2.8816949038417694,"1559":2.0571596486738386,"1560":0.5451150857678406,"1561":3.74545506978331,"1562":1.7929073795351196,"1563":2.4422398615893086,"1564":0.33658477028356953,"1565":-2.7468149874554926,"1566":1.9610101464966985,"1567":1.5020045270463473,"1568":2.3027415619030553,"1569":2.7432034567777,"1570":-1.2268337261114497,"1571":-1.897500863418442,"1572":0.5233391145102391,"1573":0.8322016294696625,"1574":1.6815483925551886,"1575":4.142319143782429,"1576":4.484804170470336,"1577":1.2682054977879489,"1578":1.861602999572405,"1579":2.8693722710129155,"1580":1.3115264240918554,"1581":1.5200682238783099,"1582":2.8554331191505193,"1583":2.584375879122383,"1584":2.850417904260834,"1585":-0.9860415152293742,"1586":-1.105640623515493,"1587":-0.4154839309777189,"1588":0.1424124709334163,"1589":3.5435821474311395,"1590":-2.348179009179136,"1591":-0.29272837629308157,"1592":-0.9090990520521341,"1593":-0.5403477284791514,"1594":-0.28110603330560047,"1595":2.1675299191726474,"1596":1.4905366378528127,"1597":-1.052182301801357,"1598":6.273030015612941,"1599":5.6773658913092175,"1600":9.78929374120487,"1601":-1.2858217251921327,"1602":1.010418505072568,"1603":-4.301480586289006,"1604":-2.0099185790003276,"1605":-0.8101706898649956,"1606":-0.0978216246799631,"1607":1.0939766254023209,"1608":2.431549076581559,"1609":2.663183545283875,"1610":3.1856218844341586,"1611":-1.0136445301605714,"1612":1.2477688430555978,"1613":-0.4702492236025136,"1614":8.634596326618595,"1615":8.997954761865433,"1616":5.655045354507185,"1617":-1.3553565137366614,"1618":-0.3551603853012684,"1619":8.007490413376138,"1620":6.470323985890936,"1621":7.446581109804392,"1622":-0.21656187413917868,"1623":1.0055242020107706,"1624":8.208755176774961,"1625":4.851191928009889,"1626":6.771152131535607,"1627":-0.6641160277830366,"1628":1.0086803565404323,"1629":8.050493460519506,"1630":6.678980825195629,"1631":7.759342648168162,"1632":-1.3486481009645956,"1633":1.265981033043228,"1634":8.13319001606629,"1635":5.419885588498136,"1636":5.551067096989247,"1637":2.8209472665428437,"1638":1.5151718484928587,"1639":-1.7053740669891342,"1640":-2.500374055211516,"1641":-3.929284928142102,"1642":0.02025348379606018,"1643":0.6256871244585793,"1644":-3.1019392081757893,"1645":-4.162204300755556,"1646":5.529608806773236,"1647":-0.6299755834767127,"1648":0.4960115102597223,"1649":1.1485567606295122,"1650":3.7823836490844682,"1651":1.508968542354049,"1652":3.1347324783424004,"1653":-0.0854475035401129,"1654":-4.213293647460515,"1655":3.157449389213481,"1656":0.06942841990058551,"1657":-3.341459120706175,"1658":0.6816663438139132,"1659":-0.6265293583625715,"1660":-3.924142533533575,"1661":-1.326488336984892,"1662":-3.880661110814518,"1663":0.4329196655289463,"1664":0.46231168556191954,"1665":-0.5332336022725931,"1666":0.609323547510583,"1667":-0.7577198876873424,"1668":-0.976755844695365,"1669":-0.9562315074740769,"1670":-0.6495773886085956,"1671":-0.2760331027248984,"1672":-0.25878941474820993,"1673":-0.21321473381122133,"1674":-0.8215120503426423,"1675":-0.4315238326820974,"1676":0.7403931408536342,"1677":-0.5664281092193583,"1678":-0.42665967206421856,"1679":-1.286382550980527,"1680":-0.05284026867909401,"1681":-1.0344527057432509,"1682":-0.8625018766854056,"1683":-0.163933021450834,"1684":-1.147238688269134,"1685":1.1841489000848078,"1686":-1.1539025223248203,"1687":-0.8506547946259684,"1688":-0.23780726179031325,"1689":-0.9609816076894663,"1690":-3.665656444621258,"1691":-4.098905947179515,"1692":-0.46621295238974925,"1693":3.0478944310739267,"1694":1.8620425856673157,"1695":0.1530858869310305,"1696":-1.8695783557259587,"1697":-0.9195400825317989,"1698":3.851712541908272,"1699":4.576448619813183,"1700":8.010824348844617,"1701":3.0779182845321182,"1702":1.321571430236484,"1703":5.87437126051348,"1704":5.116392569662861,"1705":7.147517492284675,"1706":3.624121378610338,"1707":2.976277369742391,"1708":3.520390347716251,"1709":4.055989167014038,"1710":2.284749262097817,"1711":1.3883590161672335,"1712":4.975883837430843,"1713":3.2692799644783297,"1714":3.9851680764692987,"1715":-0.6623644015643262,"1716":0.12152254392975889,"1717":2.5858325673495406,"1718":1.434496961003084,"1719":1.1619507453740077,"1720":1.2034865596625368,"1721":-1.1835916946812266,"1722":0.1399298220649899,"1723":1.6630899484457111,"1724":2.2698517721738916,"1725":0.3487128495698374,"1726":-2.1997653925089193,"1727":-4.214719046043139,"1728":1.0293247031774961,"1729":1.2331021413076066,"1730":0.35606429058373545,"1731":2.88961116671054,"1732":1.3970936241100944,"1733":2.838085054539286,"1734":0.3673225171599111,"1735":2.0012777892748974,"1736":-1.8416018828475222,"1737":0.8095201842050308,"1738":2.895553897081401,"1739":2.213109833304664,"1740":1.864362065493611,"1741":0.7092253351872899,"1742":-2.8607136224230802,"1743":-5.772221931670086,"1744":-1.0356655989795314,"1745":-3.408197991579634,"1746":-1.9711639163491252,"1747":4.84596290241952,"1748":0.5555999146114352,"1749":-2.4470855200701287,"1750":-3.145718072896671,"1751":-2.032824754902008,"1752":-1.1890233046313312,"1753":0.4489145711650262,"1754":-1.972908627872232,"1755":-0.13821138187504098,"1756":-0.30389472967442366,"1757":-4.7473896058586025,"1758":-0.8569811504474536,"1759":-1.9604887422212391,"1760":-3.4365667841712324,"1761":-3.981009590990476,"1762":-1.7199990154688471,"1763":2.218015396437436,"1764":-3.9357182206809704,"1765":-2.4320002091212616,"1766":-3.1858908473270193,"1767":-0.32885545606527083,"1768":-2.177616342048412,"1769":-1.6470976076180852,"1770":0.3410846886180274,"1771":-1.9404177268812348,"1772":-2.424445022476907,"1773":3.747755033688878,"1774":-0.3315050080802048,"1775":-3.403098831228025,"1776":-0.2926913616943535,"1777":-3.4704875574661744,"1778":3.189648491916034,"1779":0.6453004128527972,"1780":-2.0401793387188487,"1781":-2.5025602121780564,"1782":-3.800205588830707,"1783":-1.298939211229408,"1784":-2.2963698158181445,"1785":3.455291061208712,"1786":-2.82198566472363,"1787":-3.5613922651179197,"1788":0.2660108714000986,"1789":-0.0459836408082231,"1790":-4.48738379176119,"1791":-2.9606650051569208,"1792":-3.917287467102053,"1793":-0.5744534323468369,"1794":1.04824540482626,"1795":0.4717668156679504,"1796":1.0512675204467443,"1797":0.7390478149981452,"1798":0.6850363257163171,"1799":-0.612032153962166,"1800":-0.2382283359493572,"1801":0.49763514030063233,"1802":-0.03673938381868364,"1803":1.0281029362650462,"1804":0.3006589191538732,"1805":-0.9429676908791078,"1806":-0.176954271456409,"1807":0.8111412134857888,"1808":0.7503958461943231,"1809":0.6785846305697731,"1810":0.4825110101055042,"1811":1.010442764913928,"1812":0.37119980276119596,"1813":0.6922365443051012,"1814":0.08870915132569031,"1815":0.9926650529645199,"1816":-0.4042062271635216,"1817":0.6643814396241249,"1818":1.166672743563726,"1819":1.3567416963070191,"1820":-1.274884963044542,"1821":-2.1411730634927757,"1822":2.5449321125238575,"1823":3.525568478804147,"1824":2.4116857334225945,"1825":4.113294399395423,"1826":6.747529603499629,"1827":7.008563961832722,"1828":3.0418035508185373,"1829":2.3846928120494417,"1830":1.199020576829318,"1831":5.7846942173157965,"1832":4.824565690536818,"1833":5.1088115187374115,"1834":2.2018059583133813,"1835":0.00506139427364033,"1836":-2.3655714517772797,"1837":4.688470543937189,"1838":1.9396442530231432,"1839":2.028443451661702,"1840":-4.750262321402477,"1841":-0.6651229639004733,"1842":5.401019358149447,"1843":3.6692715315561473,"1844":2.1424097124537838,"1845":0.35847662282494197,"1846":-0.9500460514492174,"1847":-2.552045220910212,"1848":-0.544963581851916,"1849":-1.9130316946855312,"1850":3.454572949064085,"1851":-2.508471497010288,"1852":2.5526079327979248,"1853":-1.987438067881351,"1854":-2.8607644304665802,"1855":1.8361898465714577,"1856":2.5161269730436344,"1857":-4.8832438069635655,"1858":-5.189051049615669,"1859":-3.447700226408966,"1860":-3.044996320574664,"1861":0.195033784099699,"1862":-5.44812094730341,"1863":-6.981940856754673,"1864":0.07965836348284029,"1865":-3.2223831306043644,"1866":-2.2835896349858764,"1867":6.133750049466883,"1868":3.013906191937334,"1869":-0.5172941919198207,"1870":2.4529232411342936,"1871":2.589019003525954,"1872":-3.8458566536308028,"1873":2.017524107585003,"1874":12.1934647650962,"1875":7.852407354926921,"1876":6.293239368174305,"1877":5.403924752702767,"1878":2.865178461001216,"1879":9.40659067835199,"1880":6.759141791026116,"1881":4.9764018367441265,"1882":-3.5489847475542207,"1883":2.3738577665838587,"1884":6.669964234131311,"1885":5.680901961606996,"1886":3.54909146207091,"1887":2.1604185797184545,"1888":-1.7332690234827168,"1889":8.13886760732367,"1890":5.356250255195445,"1891":3.944340731613863,"1892":-0.6379649551805802,"1893":1.3969611326458908,"1894":9.825474852715233,"1895":4.294940677779675,"1896":3.306839648491793,"1897":1.682970609499116,"1898":1.63160578147944,"1899":-0.43093727985437746,"1900":-1.0006807485061069,"1901":1.0694653501108164,"1902":-2.7718505714238284,"1903":-5.676598517106456,"1904":0.062363696521854396,"1905":0.09878367613461685,"1906":0.4517962974592579,"1907":-0.9823963867333826,"1908":-6.3367551418988235,"1909":-1.2484805117525357,"1910":-3.0750643616714846,"1911":-5.041101106938073,"1912":-7.622613854634333,"1913":4.69439465033197,"1914":5.926768108257475,"1915":4.962718330963467,"1916":2.286764980986262,"1917":0.021858121514654688,"1918":-2.656325248939306,"1919":-0.596495658656784,"1920":0.2283509755689141,"1921":0.5565796918514937,"1922":-0.06927274718379363,"1923":-0.8619408743384999,"1924":1.5298702825741581,"1925":3.0777828643051706,"1926":5.195113315459883,"1927":3.0773941973820325,"1928":2.332507413705893,"1929":1.141561279744761,"1930":-0.805751015786659,"1931":0.19228775221538458,"1932":3.682674747132541,"1933":3.1878869936368854,"1934":1.7664097000833419,"1935":3.092549992912454,"1936":3.069905981868846,"1937":2.94427628193491,"1938":2.4527265445575512,"1939":-5.379952798115456,"1940":0.2206610865839997,"1941":0.34748935736118863,"1942":3.261272796394305,"1943":2.69320858761366,"1944":0.22495677659942576,"1945":0.9606814934838316,"1946":-1.2487944924918641,"1947":2.7348431642338373,"1948":2.46504038367936,"1949":2.8375290770837376,"1950":-2.882404753169347,"1951":-4.099396696280407,"1952":-3.281810246427086,"1953":-2.2155590255121522,"1954":-1.5500534861668598,"1955":4.478360210921958,"1956":-1.115737922949866,"1957":-0.9630268825912575,"1958":-2.3274130243650895,"1959":-1.6956561169420021,"1960":0.4997833761342193,"1961":0.9863460147596385,"1962":-0.11636727840808118,"1963":-1.3445258355067913,"1964":-1.604868821167336,"1965":-3.3503174156197972,"1966":-1.9517899137074057,"1967":-1.617373350523617,"1968":-2.389914916609526,"1969":-2.800773261658131,"1970":-0.8052672861447804,"1971":0.38920989940681255,"1972":-3.5073994528905774,"1973":-2.289445227270159,"1974":-1.8913479272839298,"1975":-1.4568391351764045,"1976":-0.08551903082069091,"1977":-0.8924737899306716,"1978":0.38664107376324247,"1979":-2.0807024774465264,"1980":-0.6382470643361862,"1981":-0.6389369291217951,"1982":9.805624278253088,"1983":10.09360403887017,"1984":9.219653221377524,"1985":1.7860386072438077,"1986":-1.0394298393311558,"1987":1.9999205542134446,"1988":-1.231864954074106,"1989":-2.4525183124260814,"1990":0.26171773316964986,"1991":0.396258258884556,"1992":-2.0262277964701423,"1993":-1.0998339020245813,"1994":-1.7330504057470244,"1995":-2.4113449074186106,"1996":-0.9971235172271322,"1997":0.4934719954731101,"1998":-0.07462145492894746,"1999":-0.4898394254124824,"2000":-0.45711188444585954,"2001":1.5577096221465159,"2002":-1.3316135083103544,"2003":0.8235305526263818,"2004":-1.2678763497732186,"2005":0.8528964539055639,"2006":-1.5443357766312393,"2007":-0.1188984073244875,"2008":-1.3402695135007625,"2009":0.24839222285110413,"2010":-0.12391625704349894,"2011":-1.218103221004094,"2012":-0.41391730024435014,"2013":1.5202784993536615,"2014":0.7007999728212757,"2015":-0.20878767992749228,"2016":-0.9871153867581305,"2017":-1.6591784669419853,"2018":1.197466248770525,"2019":0.428362183254984,"2020":0.18131429681930913,"2021":-1.6424384492011024,"2022":1.3713519950731754,"2023":-2.018128024816571,"2024":-0.9428020779416487,"2025":-1.3946657800520026,"2026":-1.618938412763033,"2027":-1.6679678439290817,"2028":3.6042916026614567,"2029":-2.6010594233905038,"2030":-9.093454904876724,"2031":-6.01731755153878,"2032":-5.236290605843733,"2033":-0.0674619443988763,"2034":3.422358429485932,"2035":-6.829465868908081,"2036":-5.87020789104056,"2037":-6.249386983696274,"2038":2.406765419457516,"2039":5.102656331286968,"2040":-7.329191458746614,"2041":-4.191408685201455,"2042":-3.867938792828056,"2043":-4.070085578222969,"2044":0.6869610113716621,"2045":-6.667950786626144,"2046":-5.8788127568962985,"2047":-3.443891055055313,"2048":2.726438023339723,"2049":-0.6846500250655327,"2050":-7.188989571183892,"2051":-2.958638654640247,"2052":-5.2530434356299835,"2053":-1.0151924087743258,"2054":-1.9083488539625906,"2055":-1.9829441025646464,"2056":-0.745814654897976,"2057":-1.807536900106696,"2058":0.04957043015908753,"2059":2.3303801529221793,"2060":0.7787649833104007,"2061":-1.1811601374092198,"2062":-1.2946773840472205,"2063":-0.8605836797480404,"2064":0.2306976081078076,"2065":2.0792233983487565,"2066":2.309261751150383,"2067":-2.0171852186157513,"2068":1.5206411648485483,"2069":-1.3130247621885,"2070":-1.0310214986118145,"2071":-2.6107237385790114,"2072":0.5742859094799055,"2073":0.05925708989020251,"2074":0.22413280340967237,"2075":-0.4242454644990878,"2076":-1.2443618767708329,"2077":-1.8535669246309627,"2078":-0.4202647088568419,"2079":-0.061194706527692266,"2080":-4.717019152375491,"2081":3.3419206925177374,"2082":0.1466343039562243,"2083":-1.80780339870873,"2084":-4.9221910222150145,"2085":-0.4495148539980162,"2086":0.37914184785602445,"2087":-0.7783005434362666,"2088":-4.039721885411362,"2089":-6.15337844549788,"2090":0.4201643025361106,"2091":-4.129027177635448,"2092":3.9950835655404515,"2093":-0.41772141408195207,"2094":-4.884319690846983,"2095":-0.42857492708513145,"2096":3.9143792893946983,"2097":-1.300694152786927,"2098":-0.7512239179262891,"2099":-6.241346242732159,"2100":-0.7599248122961259,"2101":1.0966938050317252,"2102":-0.19076313065313463,"2103":-2.398591710035,"2104":-7.3022694113460815,"2105":0.7633624222577787,"2106":-1.3763024103348924,"2107":1.9734206958098173,"2108":-4.321818395956656,"2109":6.102475965117829,"2110":4.397654954802859,"2111":4.429640248533541,"2112":0.21086168528499064,"2113":-0.04829536241690904,"2114":5.086008626979636,"2115":4.339241384319685,"2116":4.72644440253113,"2117":-0.14285921038306754,"2118":3.9273048914553432,"2119":6.837763829237947,"2120":3.750798179855116,"2121":0.4267247535598114,"2122":-0.7017014024889702,"2123":0.933041048589427,"2124":7.32172104246718,"2125":4.1933928846148545,"2126":-7.261561193740593,"2127":4.176215869284553,"2128":-2.3119290921739455,"2129":5.114323859147529,"2130":6.507899114338011,"2131":-0.49001684928635775,"2132":-5.867589766784212,"2133":-1.8176290799944945,"2134":-1.1896738755640883,"2135":-4.80888129607659,"2136":-4.893229012499846,"2137":-1.3964167600158572,"2138":0.0752908968413997,"2139":-1.4519409276409114,"2140":-4.946005362940521,"2141":-5.665518314356096,"2142":-6.235772772012322,"2143":-4.856783698600889,"2144":-5.321307465908839,"2145":-4.31304118932369,"2146":-3.683076840576342,"2147":-3.8278168049763286,"2148":1.313175036884043,"2149":0.6317782308058341,"2150":-5.811542652040479,"2151":-4.1159782861207255,"2152":1.4182462919174015,"2153":-1.9322770990150213,"2154":-6.483785774743049,"2155":-4.809906041638299,"2156":-4.8516752766458495,"2157":0.9037969435732455,"2158":-1.222105614566342,"2159":-2.3670811256040207,"2160":-1.419543456620622,"2161":-7.302407228662988,"2162":-3.9963714952702327,"2163":0.613046772484144,"2164":-5.543201153311871,"2165":-1.5407950196883284,"2166":-4.87014083337702,"2167":-5.398816159066441,"2168":0.5935196468822758,"2169":2.1329629257934815,"2170":-3.3642714759491477,"2171":-5.866122892925025,"2172":-5.307560635806302,"2173":1.624776016827117,"2174":-2.970517843482698,"2175":4.427820362009147,"2176":-6.597908271721691,"2177":-6.0150768782837165,"2178":3.6625671328736074,"2179":-0.9108511550052232,"2180":-1.0301417231289554,"2181":-5.326937423197104,"2182":-6.6994004180978015,"2183":-1.0603883305629653,"2184":-1.363289865615588,"2185":-1.5609649607781544,"2186":6.907461281320132,"2187":8.637941424441975,"2188":6.932231270031143,"2189":0.13483390318701427,"2190":-1.295733777242558,"2191":9.310039808790268,"2192":8.51419051602404,"2193":8.389763375712452,"2194":1.7724035557531257,"2195":1.4817281481925144,"2196":8.54020428957122,"2197":6.766033579066262,"2198":6.843982461784135,"2199":-1.0992399840909222,"2200":-1.3391321998065984,"2201":9.12747209579749,"2202":9.256725659889145,"2203":4.36953589873921,"2204":-0.6947560745541886,"2205":-0.8032650131464725,"2206":7.04880832085082,"2207":8.229624738604844,"2208":7.969737501272066,"2209":0.5697003090228931,"2210":-1.917185273343762,"2211":0.8313264855141373,"2212":5.588023504492699,"2213":3.3343304847560713,"2214":4.920977037427137,"2215":1.9900995314061767,"2216":-2.259463282945337,"2217":-0.4200255551429177,"2218":4.549166945840908,"2219":5.12436166941208,"2220":4.798308737193653,"2221":0.5878903993129786,"2222":4.2944135980178455,"2223":2.929421792559119,"2224":3.4167752640456346,"2225":0.38228400730253315,"2226":-2.246080205643577,"2227":-1.9600704943605358,"2228":3.149557097520226,"2229":3.2728160028146767,"2230":0.20653177246972423,"2231":-3.672792800459799,"2232":-0.8252604655917781,"2233":6.1698569460601025,"2234":3.724353055696256,"2235":-1.1721868682332532,"2236":-0.5087506379233775,"2237":-3.709131229939516,"2238":0.11095990892974322,"2239":1.0130513418730054,"2240":-0.5013140370268268,"2241":3.145614845277933,"2242":-3.9239466049285086,"2243":-1.8238637175237395,"2244":-0.3235719288233088,"2245":-2.8479414535624312,"2246":3.0696264567269878,"2247":-3.869976437191688,"2248":-6.238808481642597,"2249":-3.8567329437623123,"2250":0.11719119938940177,"2251":-1.523508430738263,"2252":13.308365180673183,"2253":0.630676981432455,"2254":2.197623319556164,"2255":1.1794016226024107,"2256":1.9644368806156987,"2257":-0.014643923272592532,"2258":0.5966984367260055,"2259":-0.8624618479215009,"2260":-0.5688553873203546,"2261":-2.212881080633954,"2262":0.6965618160182178,"2263":1.447776422318169,"2264":3.6455293020576365,"2265":2.93233748036176,"2266":3.2302591514281978,"2267":0.463998532490865,"2268":1.3786922568913251,"2269":-1.113310449264699,"2270":3.718916518345322,"2271":2.75628307731852,"2272":0.5969246071597314,"2273":2.2323501164199913,"2274":2.8189953351532524,"2275":2.17133927881292,"2276":2.941195126147276,"2277":-1.338668127691798,"2278":0.11611198507616383,"2279":0.9825772180267806,"2280":3.1647437543884043,"2281":3.296778790515208,"2282":2.332802167315014,"2283":-0.3385175045967571,"2284":-1.050283814379076,"2285":3.217357821128312,"2286":2.7882810789375077,"2287":1.8494070603769368,"2288":1.1055724674683258,"2289":-1.8866588774798345,"2290":0.03077518615897575,"2291":-0.0533841629083571,"2292":-1.7272024126135985,"2293":0.6499198471240566,"2294":-0.6060357643873621,"2295":1.3357979162301283,"2296":0.8780987591593183,"2297":-0.9863967168288117,"2298":-0.9088830622035833,"2299":0.05340275696881304,"2300":12.601295580440471,"2301":6.284768100748887,"2302":-3.310588286750742,"2303":-0.47532818023292445,"2304":0.6747522874786825,"2305":2.615125334747407,"2306":-0.5993010414916645,"2307":-0.012842446945654984,"2308":-0.14703817700406946,"2309":-0.7481039600749486,"2310":0.18854476718579322,"2311":0.8268737143546642,"2312":1.1258199300262088,"2313":-0.05482775304081587,"2314":2.6622132212296434,"2315":-2.16501356969204,"2316":1.9409417090485266,"2317":1.4036149170644636,"2318":1.8432999677481487,"2319":-5.920419767601621,"2320":3.412514975888009,"2321":-0.29858010553389286,"2322":4.162858497428134,"2323":4.299883783879132,"2324":-1.3963404122120933,"2325":1.052126646161246,"2326":0.9852192061309464,"2327":2.9617311205701675,"2328":3.7778336983918255,"2329":-0.4739363446869952,"2330":3.248138653786067,"2331":1.8962290994747877,"2332":-0.28613630460136513,"2333":3.4913551153594464,"2334":4.03328421664328,"2335":0.6004656883757911,"2336":3.8969740850331367,"2337":3.6104905005466805,"2338":2.6915606440548614,"2339":0.875743031426194,"2340":3.093780029290667,"2341":-0.07865660322938763,"2342":-1.769096531493058,"2343":-0.3888345426316773,"2344":-1.7365174764098579,"2345":-2.254399274603946,"2346":0.6837806749844996,"2347":0.5654940374987151,"2348":0.3820978208738391,"2349":-2.127161814826511,"2350":-0.9989314301294272,"2351":0.03510114497230144,"2352":0.30053862510214,"2353":-2.0864317030517445,"2354":-2.05226984878784,"2355":-1.1535125054781674,"2356":1.0979798007103554,"2357":-2.939064688149692,"2358":-0.4401735204810431,"2359":-1.3628147268686857,"2360":-1.6639988750086505,"2361":1.2525723630355352,"2362":0.10058798171421099,"2363":-0.13943720061716428,"2364":-0.9396059966152305,"2365":-0.6550773092665285,"2366":5.310634405180033,"2367":-3.480501187056556,"2368":-8.085001747285801,"2369":-3.4374522301065706,"2370":-4.3647251100286075,"2371":5.5672905628206335,"2372":-6.733139867376773,"2373":-5.206799070446815,"2374":-3.8047478456139503,"2375":-2.899079507358733,"2376":-2.8275664927696744,"2377":3.349936495693615,"2378":-4.803348237971806,"2379":-5.846883673813412,"2380":-5.789789370830308,"2381":-3.55685280083391,"2382":-8.052128913908586,"2383":-8.054082541093253,"2384":-4.49660829313596,"2385":-4.956158451181104,"2386":-6.355420988892911,"2387":3.8189796622110284,"2388":-3.7514969610634963,"2389":-6.480515201390643,"2390":-4.0508919074779115,"2391":0.10939818013757292,"2392":-3.62231639488585,"2393":-2.40048313174461,"2394":2.6546469349605957,"2395":4.109409388891547,"2396":3.112729896438138,"2397":-0.1001638080040614,"2398":0.737079753235684,"2399":6.374014020949669,"2400":4.822838937680914,"2401":4.520408186664339,"2402":-2.1522144834821355,"2403":5.895553928956332,"2404":1.7957555564467327,"2405":2.969312699444672,"2406":3.2717636075383942,"2407":2.2816301607376754,"2408":0.9805492656716018,"2409":3.239302793666765,"2410":4.642737807691003,"2411":3.9284370592367335,"2412":0.16610081888431183,"2413":-1.3877889489637922,"2414":6.055607075784387,"2415":4.146259335819175,"2416":4.155116172175023,"2417":2.496894227125035,"2418":1.997012877776125,"2419":-0.8629555589316875,"2420":-0.003326716881230497,"2421":3.4033331310462622,"2422":2.735419912775162,"2423":-1.4769815390343173,"2424":-2.8204141739945374,"2425":0.4362134382224807,"2426":3.9481312115741285,"2427":3.1531241352392474,"2428":-6.4321090754965775,"2429":-2.124054532327969,"2430":5.1270212135438555,"2431":2.120466509144317,"2432":2.646340817814689,"2433":5.994196408436451,"2434":-4.015269823476952,"2435":4.051049724864785,"2436":-0.6031179341490462,"2437":2.5102375745588037,"2438":-1.8257942787864472,"2439":-0.32106945682140314,"2440":6.211227228927774,"2441":3.918695104620129,"2442":3.735964754777253,"2443":3.1677997210279196,"2444":5.0011256714043695,"2445":-0.4549830271383393,"2446":-0.11611701132793403,"2447":-7.985551670032052,"2448":-7.455410646942597,"2449":2.131896143389713,"2450":-7.703881376834353,"2451":-2.7367742354017994,"2452":-6.326617909874598,"2453":-6.03622015722785,"2454":-2.253520582578855,"2455":-4.916526127943985,"2456":-1.3289596952362943,"2457":-4.913977803097513,"2458":-6.070060887858956,"2459":-1.5454867438998476,"2460":5.127733585566177,"2461":-1.7400699570134055,"2462":-8.176257355404248,"2463":-6.147740319981303,"2464":-0.9589239474787519,"2465":-3.17682325959622,"2466":-3.9934766618475717,"2467":-6.379715248435948,"2468":-5.8963947241580446,"2469":2.7792950045863924,"2470":-0.1455235991832197,"2471":-0.4150981302755802,"2472":-0.3048338173111327,"2473":-0.5369213683784908,"2474":-0.5669629901172719,"2475":-0.5868876924407469,"2476":0.15798386434349254,"2477":-0.3584068976945187,"2478":-0.46679823271303666,"2479":-0.3922615775028246,"2480":-0.08728947651794529,"2481":-0.7158161071822754,"2482":-0.05108826770316781,"2483":-0.38060249861529755,"2484":-0.36520236001540507,"2485":-0.4094590556614317,"2486":-0.2559080591260081,"2487":-0.8407579157369302,"2488":-0.588802730758312,"2489":-0.3420880033673721,"2490":-0.4897127546493206,"2491":0.39066586253869673,"2492":-0.8541119524876241,"2493":-0.8206916511060429,"2494":-0.5398874245701347,"2495":-1.0986635901840474,"2496":-0.22960213941594929,"2497":-1.694322234451311,"2498":-1.7054040546587421,"2499":-3.0133114315147003,"2500":-1.5987354259528053,"2501":-2.172767993726776,"2502":-0.31787581234723344,"2503":-2.1744696857014425,"2504":1.5810403046997965,"2505":-0.5615665132300186,"2506":-1.2439512019577195,"2507":0.7554667668111468,"2508":-1.1930778049581834,"2509":-1.6264597620381,"2510":-0.6415236183130021,"2511":-2.0953816654657795,"2512":3.0011838112253053,"2513":-0.8329230523025688,"2514":-0.5447373795302591,"2515":1.0587162370532275,"2516":-1.8089817917360511,"2517":1.5112910649295965,"2518":-1.800967928128911,"2519":-1.203710981727726,"2520":-0.5479656257662227,"2521":-0.7305215710871753,"2522":-1.605780270012623,"2523":0.7339860920482837,"2524":0.8090258097480827,"2525":1.382831442615217,"2526":2.678050762547658,"2527":1.5821528108350644,"2528":3.303660438177795,"2529":5.598756401999894,"2530":3.2130036547880256,"2531":0.8272491805812467,"2532":2.2188624045531475,"2533":-2.1644237192718028,"2534":-9.746174451535644,"2535":-0.42854177948438893,"2536":-1.6735743114098176,"2537":-1.3240411345745204,"2538":0.49522554817206915,"2539":3.940350413353419,"2540":-1.5699713696215656,"2541":-0.024078878779015676,"2542":-1.047714928319414,"2543":-0.2758979189978333,"2544":-0.29552830027019333,"2545":2.3423616305918378,"2546":-0.6106115497935786,"2547":0.079957688979903,"2548":-2.9702914599642205,"2549":0.4627238044445344,"2550":4.579720900564409,"2551":-6.180249381597404,"2552":-6.304637992967441,"2553":-3.6803297337072554,"2554":-1.7777238850774146,"2555":-4.972221854603513,"2556":-6.83351615618332,"2557":-5.728876939541363,"2558":-5.856394675346288,"2559":-5.460722791792856,"2560":-4.705612860584418,"2561":-4.262504145162876,"2562":-4.6181013399499635,"2563":-0.7874301868108259,"2564":3.8626007307882677,"2565":4.233453431813078,"2566":-5.52556187777597,"2567":-3.4058317393598125,"2568":0.597797029091548,"2569":3.4913714775400697,"2570":-2.8542264452110557,"2571":-8.515626118608386,"2572":-6.930476814715388,"2573":1.467627083789704,"2574":0.7229201859651768,"2575":3.0875840779435815,"2576":2.764431720282172,"2577":2.6583831849049187,"2578":2.109301304722708,"2579":-0.7728839787247458,"2580":-2.9455033699760538,"2581":2.8166199068537527,"2582":2.252290735112945,"2583":2.4905540398764914,"2584":-0.5117549485958252,"2585":-2.9328324081660084,"2586":2.3693627993040187,"2587":1.8699819221921516,"2588":2.0102908180304926,"2589":0.9614887827084658,"2590":1.4134931658783452,"2591":1.1054399254640341,"2592":2.479472786180886,"2593":2.4402400187436224,"2594":2.1848408999098705,"2595":-0.5814327963562969,"2596":-1.4036880799191338,"2597":1.4618637081189565,"2598":2.933690916935524,"2599":0.5562163250228616}},"b1":{"n":100,"d":1,"w":{"0":-3.811246381214581,"1":-6.354349213026384,"2":-4.641235951166578,"3":-0.9051689334472621,"4":0.12246420697021997,"5":-1.1964086532942284,"6":-2.922945767329496,"7":1.0453283668365096,"8":-2.974155607577979,"9":-1.2079787828310464,"10":3.431920437124824,"11":-0.42971953080544745,"12":-4.084754247351772,"13":-2.942763949694218,"14":2.389674274504587,"15":-0.1302814227864566,"16":-4.073173196796454,"17":3.41176002467916,"18":-1.3997386363378932,"19":1.7200383356493203,"20":-4.416063700380732,"21":-1.7584204248155584,"22":1.0463090663948462,"23":8.308171990416785,"24":-0.8001873838659573,"25":-0.9113964471986497,"26":0.24438016196268275,"27":-9.837871903267525,"28":-8.263987943171948,"29":-0.11830238210852939,"30":-8.49339194430113,"31":-2.4934198609695186,"32":1.0730111086143432,"33":1.464877200525684,"34":3.5290910420868924,"35":2.133566127909391,"36":-5.4462210815983205,"37":1.600047122753073,"38":-2.6775541222823764,"39":2.7392776263886187,"40":-0.23048858120747606,"41":-0.03193496834784986,"42":1.7663316724467673,"43":-8.100852675251424,"44":-0.4945142209644376,"45":1.2914689496498153,"46":-2.575754815601403,"47":0.8239330569780078,"48":3.205329422072584,"49":12.373809225881768,"50":-0.5001361735106511,"51":-0.6652482036954848,"52":2.505888985799642,"53":0.007003485375149641,"54":-0.8308095939242801,"55":0.829503557133824,"56":3.7400623098183274,"57":0.38128204700977386,"58":3.2729957230472784,"59":-5.2963571333841655,"60":2.9172901838401795,"61":-1.9421446251901642,"62":-4.701438114891568,"63":-0.5102840138224422,"64":-0.72213411536684,"65":5.408910053143079,"66":3.6452862241482014,"67":-1.4541877012105833,"68":-2.8612961572525033,"69":0.7687505584271256,"70":4.555280050003771,"71":-3.717137221835544,"72":-5.653724500037634,"73":-4.173365857894902,"74":1.8508752302662839,"75":-1.4970891658916066,"76":0.5270020576652296,"77":-0.33269293181209764,"78":-0.3695959236890129,"79":-0.863509928672324,"80":-3.340455940589706,"81":10.276423429390857,"82":1.5460107581971427,"83":-0.6447151996139331,"84":-2.2839070873059253,"85":7.67706919349994,"86":3.5873050807383935,"87":3.858798271885,"88":-7.170258327896794,"89":2.7221158636748415,"90":-2.753381876703063,"91":1.175875026249512,"92":-2.0647569205415284,"93":0.7734924100772115,"94":-4.757600792645716,"95":-0.7270149485751729,"96":-0.8485695041055477,"97":0.30638859946411034,"98":-9.168183187638698,"99":4.700210020828804}},"W2":{"n":4,"d":100,"w":{"0":5.240179323153068,"1":2.121309194861274,"2":4.457854357771351,"3":1.457493874358186,"4":-0.8386813796580425,"5":0.9308942915168035,"6":3.4639518602782866,"7":2.2770796125593793,"8":5.286618418212381,"9":-0.739606406353839,"10":4.936061817530376,"11":0.7770105946102835,"12":25.280750129118335,"13":3.6186908951541588,"14":2.147299287933771,"15":-0.9246063222831798,"16":11.115924382159053,"17":1.6600997848863153,"18":9.46093921140445,"19":0.4236857475555972,"20":2.0795780346750674,"21":-8.147815157176824,"22":-6.672998705404151,"23":-0.26302223513912915,"24":0.31960201877841965,"25":1.038347567634179,"26":4.340996896195985,"27":-0.9881764570372691,"28":-4.284506583839447,"29":-0.7835151556073608,"30":4.9822689636903155,"31":0.2035318883165406,"32":-2.7298850223996616,"33":3.709854227389015,"34":-4.243561262892495,"35":-0.11921312715144303,"36":8.190057170917608,"37":-3.5498564818453984,"38":3.9507948272904954,"39":13.42897399174054,"40":-7.9003159723788094,"41":2.329063682061007,"42":-3.425422237240233,"43":-2.5161115248818797,"44":-2.0396388767137257,"45":1.231145797114929,"46":-6.171511530696428,"47":-1.5518763869351238,"48":-3.690150793773962,"49":-2.05918276354589,"50":-1.1551889366943586,"51":3.2181850505071607,"52":-1.8264499381271286,"53":-3.6166762248458446,"54":0.8565767962492113,"55":-1.4918837523021615,"56":-1.0120339036078783,"57":-0.7733704411388721,"58":5.786773376159544,"59":-3.808124763512331,"60":-2.40173190566401,"61":-0.27299740310677184,"62":8.374271010930551,"63":-1.4354348691064485,"64":0.6826515208155837,"65":-2.1278311558315,"66":1.1786170921053585,"67":1.995288287978421,"68":3.018819224664301,"69":-0.8738540322584367,"70":-15.900614048885352,"71":-2.904142804658837,"72":12.354909690428421,"73":3.218378738197902,"74":-1.5064776378308025,"75":1.0416338172484396,"76":1.721678751610741,"77":2.4961329830491223,"78":-5.625763707553488,"79":0.36153025838809116,"80":-0.9791828150009788,"81":-3.490192842170344,"82":2.87816180366448,"83":-4.411873508067472,"84":-1.7619328739433278,"85":-3.4314298957015716,"86":-0.1660131065889644,"87":-1.3621762217068698,"88":-0.9587549958832616,"89":-3.024685523569219,"90":1.4536142212286938,"91":-28.93561436650867,"92":3.283467251664084,"93":5.962867368575025,"94":8.588161065939254,"95":0.6862119011052626,"96":3.142083725761394,"97":-2.6514479177648558,"98":1.537602330801521,"99":-4.109770402804437,"100":2.363253899234991,"101":5.1192949092740205,"102":3.4083345280109896,"103":4.156496593946914,"104":-3.9814938788545784,"105":4.160451117337716,"106":3.155739324713092,"107":3.548673204677636,"108":2.0718152829028904,"109":4.234646639372715,"110":0.10268652237207432,"111":3.829469856420183,"112":12.317190734105832,"113":-0.9737891739119879,"114":1.6728790584459976,"115":-3.520872937997612,"116":3.124494931966236,"117":0.15085841424836383,"118":-9.392053666009518,"119":12.548344723860565,"120":1.2532039604766438,"121":-1.7671365835083006,"122":-16.55408448046512,"123":0.5645050549396897,"124":4.0353722698278895,"125":3.750324820221488,"126":2.1291737300078695,"127":0.7669451913294413,"128":-2.281514481493327,"129":-3.787190018577386,"130":9.994504891022379,"131":8.910807270764288,"132":-3.2648879998272844,"133":3.41617159781892,"134":-0.1762942681011148,"135":-1.7682922426062224,"136":3.5899734623410295,"137":-4.180604035992253,"138":-4.026573038884539,"139":1.8705633818549707,"140":-1.174463749934719,"141":0.04401357175941766,"142":-2.540303393733486,"143":-0.31304294438254376,"144":-2.3945046978138382,"145":2.083115192433102,"146":1.5901036798666455,"147":-3.3665254841527306,"148":-3.310558352278199,"149":-12.767126360792236,"150":-6.548521415831518,"151":1.4061995458915109,"152":-4.080325490022915,"153":-1.8222401036875087,"154":3.448002205752874,"155":-0.14707764011930763,"156":-0.9914697468982261,"157":-3.905497223355016,"158":13.283338146027502,"159":0.18150909605625362,"160":-3.9413696156336253,"161":-0.5404688430917041,"162":20.648039822289018,"163":3.0029278622823714,"164":3.57112370082802,"165":10.52518447634585,"166":-4.236872524720917,"167":4.074738607607786,"168":4.117751237623114,"169":-3.128637034673917,"170":-0.6365555313276773,"171":1.2139463829477275,"172":13.204586094394678,"173":0.6267261673910363,"174":-4.750771255390335,"175":4.4105452895841015,"176":-5.7370484451291555,"177":2.2872554287634825,"178":-2.4263647732586637,"179":2.472410249264576,"180":0.22639260123656066,"181":-2.8226202270172744,"182":0.9372791927043331,"183":1.0007613379336409,"184":19.56501529469047,"185":-1.0341789551820784,"186":1.5789127509727787,"187":-3.1007562470702545,"188":0.14896253428262282,"189":-2.8999741656343385,"190":3.6078873246174568,"191":-9.86875105197846,"192":-1.4248250999414516,"193":1.5257666136796406,"194":1.2197214651603137,"195":3.341032972883593,"196":3.7724112071014746,"197":-2.0976237995335247,"198":1.4796172714231417,"199":-2.7014256160035193,"200":0.4949449389880135,"201":15.696296189931028,"202":7.734821464180715,"203":-2.3125814929416935,"204":-0.8305117938846023,"205":6.917602021557065,"206":9.118894760726523,"207":0.5587133892963425,"208":0.3632979215400528,"209":-2.527727771456933,"210":5.55117243550886,"211":2.0968850034396995,"212":13.549555836956097,"213":-0.7368003888642213,"214":1.184506611301186,"215":-4.70287293478065,"216":-8.301711537807316,"217":1.620066105502266,"218":2.2258906195931045,"219":16.741043433161302,"220":-8.745355031014899,"221":-6.771647088649837,"222":-10.530616707300291,"223":2.0058923616947575,"224":0.9874386240757961,"225":2.330225312642102,"226":0.26201592595689016,"227":-1.8758385585062414,"228":-2.563818570923975,"229":-1.8179010125024764,"230":-1.4000271286454136,"231":7.116945220116178,"232":0.8060403127297792,"233":0.9262827352756413,"234":0.07147121580755408,"235":10.148209504272936,"236":-8.539412616130617,"237":2.519612255887683,"238":-0.2785568016138062,"239":8.262907295727564,"240":8.703802997134188,"241":11.678190924547728,"242":-0.9474513955736851,"243":-0.11519386598049267,"244":2.320764261984893,"245":-7.985675802857895,"246":-2.6277236093193137,"247":0.6611074406768889,"248":-9.717525557285054,"249":-22.39830308418168,"250":9.78607834207243,"251":-1.3148045081174933,"252":-13.048091618197612,"253":-0.18214804731443887,"254":4.711554207552828,"255":0.5012583292915505,"256":8.583835348010467,"257":-1.7808774578769948,"258":15.35995899557097,"259":-0.2896744817556765,"260":-11.551410116216442,"261":-1.574819057908721,"262":19.341616378081792,"263":-0.821572250976026,"264":1.4439897732416924,"265":-2.3319852730272674,"266":-10.556820876912877,"267":13.29712147937292,"268":9.632327604127287,"269":1.6179298652461125,"270":7.958593373095467,"271":0.165530524100551,"272":5.659059700495872,"273":0.5630884945995398,"274":-11.35031024832755,"275":11.102016185033944,"276":-0.4790631902878902,"277":-2.467681210224594,"278":-13.305611329043751,"279":-0.7063769281731356,"280":-5.081989347486799,"281":-18.504759111250507,"282":15.051187900830124,"283":-9.707880070773205,"284":19.801927941442777,"285":-13.038582968784514,"286":0.753173956367888,"287":-8.849060656517889,"288":-3.1442374517049876,"289":-11.038284209631136,"290":-3.5136266390442357,"291":0.9738126048509101,"292":6.536652207940601,"293":-0.11700841921806893,"294":10.165057719570338,"295":1.0808911546291602,"296":-2.4033919331173363,"297":0.9631576413483949,"298":17.23843168331712,"299":-8.507012652241471,"300":2.7788624318488577,"301":0.37814265644429657,"302":7.4140689967326425,"303":2.5789386235319576,"304":-2.8480070854045847,"305":3.6007519607955563,"306":3.362338564167819,"307":3.939170461674993,"308":1.8912105509059816,"309":3.53036980617765,"310":8.149467409940318,"311":3.2686829795276546,"312":3.4094830184311773,"313":-1.3576023954884398,"314":0.7842683809914449,"315":-3.1955669355226926,"316":5.695308961011413,"317":20.655764609722166,"318":-10.79327595942567,"319":8.974092009910018,"320":1.358586209812327,"321":-11.827424448320038,"322":-10.44132571049111,"323":1.149694598300017,"324":2.594192952131317,"325":3.41572457054974,"326":2.3274124979320807,"327":0.19558736609393493,"328":-0.5053504542725068,"329":-2.9030328258438165,"330":13.05752117265505,"331":3.8039353405463454,"332":-0.38269372553517045,"333":6.277764240850262,"334":1.168801137084408,"335":-0.5654776974271171,"336":6.671690521389535,"337":-0.9198794326783121,"338":0.7848041890669325,"339":7.12080533722844,"340":8.264239945583157,"341":-2.365604397499946,"342":-0.8052101607957715,"343":1.7020897076716965,"344":-7.152972767187117,"345":7.715545707296613,"346":-7.039825507436683,"347":-2.820276169852475,"348":-3.100899736163928,"349":-20.7378292216403,"350":-15.545902211696855,"351":0.4389117027801333,"352":-4.564849166563256,"353":0.6663570380498011,"354":3.447758834207904,"355":2.9241863070212912,"356":-0.7880881698694516,"357":-2.9902146645034127,"358":-7.825139355883637,"359":-1.7126981658456035,"360":-4.770625532542148,"361":0.15712570610522417,"362":11.108192420523768,"363":0.9791906146741053,"364":3.7243259805623152,"365":-12.713608582007717,"366":-6.026268814484264,"367":4.112955224787181,"368":3.985827002750108,"369":-2.7261106030191025,"370":1.155785957373728,"371":2.144427796290887,"372":14.982219747050447,"373":-3.239044714253764,"374":-5.234667137190097,"375":5.71250331334024,"376":-0.5349575942940425,"377":3.6404926527776404,"378":-14.851284183100569,"379":1.7998754218920494,"380":-1.67793054193653,"381":-1.4728226831575022,"382":4.328316820705958,"383":-0.9128447714233187,"384":11.310262123549373,"385":-4.3456700516330935,"386":-3.3120251266744885,"387":-3.0783848184302394,"388":-0.8877190864245829,"389":-4.3983151423028035,"390":3.5211982088339164,"391":5.578998515404989,"392":11.511076001569808,"393":8.648503830186918,"394":9.059326228950674,"395":3.055020017781425,"396":0.08060838361604353,"397":-1.1174647373779174,"398":3.3556947506149597,"399":-4.086710638995291}},"b2":{"n":4,"d":1,"w":{"0":-0.9903083516094489,"1":-4.218170685140632,"2":-0.6637093909158326,"3":-2.6753495718817772}}}}
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
    '<div id="rendererContainer"></div>' +
    `<div id="agentRendererContainer">
    Deep Q-Network Stats:
    <div style="overflow: auto"><div style="float: left">w:&nbsp;</div> <div id="action0" style="background-color: lightgoldenrodyellow;"></div></div>
    <div style="overflow: auto"><div style="float: left">a:&nbsp;</div> <div id="action1" style="background-color: lightsalmon"></div></div>
    <div style="overflow: auto"><div style="float: left">s:&nbsp;</div> <div id="action2" style="background-color: lightskyblue"></div></div>
    <div style="overflow: auto"><div style="float: left">d:&nbsp;</div> <div id="action3" style="background-color: lightseagreen"></div></div>
        <div style="overflow: auto"><div style="float: left">random action&nbsp;</div> <div id="actionRandom" style="background-color: lightcoral;height: 1em"></div></div>
    </div>` +
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
    'RL_DQN_5X5Viewport_PreTrained - ranked 241': __WEBPACK_IMPORTED_MODULE_7__agent_RL_DQN_5X5Viewport_PreTrained__["a" /* default */],
    'RL_DQN_5X5Viewport_In_Learning_Mode': __WEBPACK_IMPORTED_MODULE_5__agent_RL_DQN_5X5Viewport_In_Learning_Mode__["a" /* default */],
    'LookAheadWideAndDeep - ranked 334': __WEBPACK_IMPORTED_MODULE_3__agent_LookAheadWideAndDeep__["a" /* default */],
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