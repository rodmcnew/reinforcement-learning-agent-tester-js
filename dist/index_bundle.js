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

                const randomElement = document.getElementById('actionRandom');
                // randomElement.innerHTML = 0;
                randomElement.style.width = '10px';
                var a = R.maxi(amat.w); // returns index of argmax action

                amat.w.forEach(function (value, i) { //@TODO what about if not in this else?
                    const element = document.getElementById('action' + i);
                    let fixedValue = Math.floor(value / amat.w[a] * 100);
                    if (fixedValue < 0 || fixedValue > 100) {
                        fixedValue = 0;
                    }
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
{"nh":100,"ns":26,"na":4,"net":{"W1":{"n":100,"d":26,"w":{"0":-0.6360557319011961,"1":1.4809370905684447,"2":0.5748027514253957,"3":1.1334914910730096,"4":-4.934416160941566,"5":1.5201725118393785,"6":-0.8652088283075325,"7":-1.2793105672505125,"8":1.9413630781259943,"9":-1.764470932144634,"10":1.048206608874869,"11":1.6348951864985148,"12":5.933238804060305,"13":2.071841288168816,"14":1.309334352164126,"15":-1.4146636882464043,"16":-10.725446085303211,"17":-6.690882738056989,"18":-7.252915143363173,"19":-0.08196080711841236,"20":-2.4371286058658246,"21":-4.024203854163815,"22":3.123611606990901,"23":-0.6653423699665947,"24":-0.6969300124997316,"25":2.2376176942560746,"26":3.8836224689116685,"27":3.274722746515881,"28":7.33625935419401,"29":-4.798374064367293,"30":-5.106042043919215,"31":0.6115961476510613,"32":-1.694406091503329,"33":0.7382896271687727,"34":-3.928662492394183,"35":-4.465764448162403,"36":-1.3258016390264178,"37":-2.15293728037018,"38":-5.759052851623489,"39":-3.212882422478244,"40":-4.090048681778843,"41":-5.523178271343103,"42":-0.9701691421959772,"43":-2.0963066115470412,"44":-6.987655714236883,"45":-3.5320502975846857,"46":1.779579451560816,"47":-0.034899434639182506,"48":-2.268231477662308,"49":-5.388549290798111,"50":-5.459470748477055,"51":-0.848881389332932,"52":1.7411797551484238,"53":-2.099048446982113,"54":-3.013097722833739,"55":-1.4913293480174996,"56":-0.5873652436620707,"57":-0.09281560711636579,"58":0.28155563400686434,"59":-2.952571980741987,"60":-2.3451015004215354,"61":-2.1049616052677296,"62":2.7165686457801783,"63":2.1888233382493483,"64":-1.3915845625670176,"65":-1.509993183600057,"66":-1.8185008512971277,"67":-3.121798810826392,"68":-3.2539075350134468,"69":-2.5331066123799424,"70":-2.8415667805898575,"71":-1.3642945940927451,"72":-2.3875458938432237,"73":0.9350053938709539,"74":1.0785766582118068,"75":-3.336786412095817,"76":-1.7000108888961765,"77":1.0692138482762854,"78":-2.166440424323747,"79":-2.1537364919134867,"80":0.0545917256080813,"81":-2.147005283072326,"82":-0.5781016992927489,"83":1.2658878530492803,"84":-0.12377212904452457,"85":1.0384541060726697,"86":-0.8565978341514466,"87":-0.397798610168241,"88":0.8603065167083487,"89":-1.9865309481337958,"90":-2.2363890532938733,"91":-1.221653376654658,"92":0.1506407905574475,"93":-1.1984109954297801,"94":-0.09124306723442241,"95":-1.6993255176123279,"96":-1.4459432695829506,"97":-0.06245881973823825,"98":-0.25084831231939325,"99":1.6133355757964247,"100":-0.7765727755322271,"101":-1.6654297040611652,"102":-0.847174667058197,"103":-0.655075812303862,"104":0.4623978580538551,"105":0.7776444756320405,"106":0.38631816028870836,"107":0.19662925994313504,"108":0.7869970013172409,"109":-0.3695105561494318,"110":0.5662617994337261,"111":0.4917424198249843,"112":0.6588449311348705,"113":0.6386660039377908,"114":0.2803412796907093,"115":-1.1218183055813549,"116":0.23706437373515837,"117":0.20995064399685998,"118":0.38544020589594746,"119":0.41950672286723056,"120":-0.005086013385001528,"121":0.915727036128542,"122":0.7588755686822143,"123":-0.03167290622012128,"124":0.1796709365410478,"125":-0.5722562600640564,"126":0.4658913834710314,"127":0.5688639116695167,"128":0.5252337005265872,"129":1.276179163988157,"130":-0.8576226076576363,"131":-0.9379040085779784,"132":0.7864415280531717,"133":-0.7480526864459627,"134":-1.1837589014546088,"135":-0.014014693968229054,"136":-0.605895669160193,"137":-1.6484854915975338,"138":-1.8217561063763805,"139":-0.7547737168077933,"140":-1.1533525803883913,"141":0.919820037720848,"142":0.5660579339249221,"143":-1.4860112172092417,"144":-1.9265374412016762,"145":-2.0710155127592613,"146":0.8873298139337769,"147":-2.0590977155288486,"148":-1.317207781906052,"149":-1.1010385756016452,"150":0.3686745676524111,"151":0.43512694495569143,"152":-2.672326942946226,"153":-0.8843391514180448,"154":-0.558997371358317,"155":-1.7354099288779163,"156":-0.15157008343361736,"157":-2.2272494581794855,"158":-2.359133619540898,"159":-1.1140041651884385,"160":-1.5309362191329143,"161":1.8037973837142685,"162":1.2309853224906355,"163":-1.5541141487695729,"164":-1.9625409819676682,"165":-1.17608124112775,"166":2.0631062053577356,"167":2.8505259999651003,"168":-0.989231183709953,"169":-1.389157092429365,"170":-1.4712293079200012,"171":-0.4407150072117449,"172":-2.6976092835592924,"173":-1.7113999768312294,"174":-1.9365669044962845,"175":-1.4640960085986758,"176":-0.9096990325201034,"177":-0.4390049264345255,"178":-0.5549426463907614,"179":-1.0468021459018955,"180":-1.6419929620348401,"181":-1.5576214512694497,"182":-1.0244325595745765,"183":-0.9270521068309179,"184":-1.060804495733969,"185":-0.7686983823789215,"186":-0.8415697753994852,"187":0.29579713578506156,"188":1.4554402848313435,"189":-0.8529991102763348,"190":-0.5581299522602129,"191":-0.6930415836477153,"192":-0.4450679896801378,"193":-1.2156310414299067,"194":-0.8005493117607945,"195":-0.7849223286226649,"196":-0.4007093927795521,"197":0.3904066442269939,"198":-0.7238010824289195,"199":-1.6814744591568482,"200":-1.052535935994684,"201":0.06814645398898661,"202":-0.3570395599109865,"203":0.49093807926119026,"204":-1.2014615320668594,"205":-1.0462856991490892,"206":-0.778373861145975,"207":-1.4652034198105617,"208":-2.5836741221135306,"209":-2.345628398099518,"210":-0.86946436937048,"211":-0.9020737052371818,"212":4.030324417068523,"213":-1.4014358211247244,"214":-3.8820372516493813,"215":0.4963824156206788,"216":0.9719957434441355,"217":-1.6538886896046767,"218":-1.8702957308664254,"219":-1.308987832915967,"220":1.7156605967270813,"221":0.3487195923896945,"222":0.5523632399208689,"223":0.7199126688835313,"224":-1.8293643558111823,"225":-3.8685962029699157,"226":-1.9679964652440978,"227":-0.6241751038422962,"228":-1.5080268060082977,"229":2.7663030791463754,"230":-0.8232270764953072,"231":2.8504866124774497,"232":-2.746503910860885,"233":0.35555441022604195,"234":1.6999306634434808,"235":-1.2320019185019562,"236":1.0334378784739222,"237":-1.1534956805392451,"238":-1.3338206660636207,"239":-0.15425110103259476,"240":-0.8939008815759745,"241":1.3434617741357926,"242":-0.9206627961540989,"243":-0.8189264704519416,"244":-0.44482433552366873,"245":-1.1380946188828975,"246":-0.2926334719671972,"247":-0.5276646807224522,"248":-0.19051527137917101,"249":-0.2706438696153481,"250":0.20614341963295754,"251":-0.558275301391851,"252":-1.2828575341768214,"253":-0.521447125358301,"254":0.4021223478518959,"255":-0.7648922020162503,"256":-1.444963717561101,"257":-0.2585276341213024,"258":-0.2527699750471221,"259":-1.7942549049706704,"260":0.03201575715098442,"261":2.3755643736575793,"262":5.920746202837366,"263":3.021117737938739,"264":4.148722217510681,"265":1.0560217223281472,"266":-1.2162660001731884,"267":3.297144330890893,"268":3.927343930092507,"269":3.5437604799436198,"270":-1.0038850212961437,"271":0.45615031706549247,"272":2.7039336442185635,"273":2.375465140792315,"274":4.012223072435687,"275":1.0944380357948091,"276":-1.2524773516078296,"277":5.553748104068481,"278":3.9290694085702613,"279":2.6272047657968884,"280":-1.911845911711058,"281":1.9103879780028457,"282":6.330546204223946,"283":3.0246239235850214,"284":3.9880344677105377,"285":1.457621392741476,"286":0.5386272279169946,"287":-0.07600693443350594,"288":0.03521281761343859,"289":-0.6423504509309342,"290":-1.0591635975637241,"291":-0.425800394756177,"292":-0.5641579535439394,"293":0.33366074900673154,"294":-0.5635395840637502,"295":-0.9576660176850715,"296":-0.8528700006106961,"297":-0.010114518882239918,"298":0.22247096090330135,"299":-0.8207598296648595,"300":-0.4005890740737442,"301":-1.0698487127770762,"302":-0.053529022374628386,"303":-1.0101109653481077,"304":-0.86795216791852,"305":0.34294126721889506,"306":-1.3740343432640254,"307":1.2454454278216522,"308":-1.129414698426215,"309":-0.6497436367571747,"310":0.4271623967293108,"311":-1.6853419483613876,"312":-2.296208704909548,"313":4.077800767626829,"314":9.838570371132956,"315":9.235616035432628,"316":6.318605076151222,"317":-5.591324995385308,"318":6.713653817220122,"319":5.500366469182651,"320":7.234470915061987,"321":8.041023896946362,"322":0.6664801877376488,"323":-5.0394733672150585,"324":6.114787279990373,"325":3.7149941160517455,"326":5.381771050448074,"327":1.5040508649269488,"328":6.672011611037798,"329":4.51172650089908,"330":6.705703327891303,"331":4.251528364786563,"332":3.662058740761807,"333":-2.038939155711451,"334":3.8778209409646043,"335":9.983444230790141,"336":4.013484821420229,"337":-0.09989570071292904,"338":2.980598563901128,"339":2.9887948715333463,"340":-4.742146817282707,"341":0.4163858783359855,"342":-5.9687500264077435,"343":-4.766276142263983,"344":4.083919312333247,"345":2.2526521095138032,"346":-2.146814204603034,"347":-2.960040844138647,"348":0.8567083932561496,"349":-8.399760478756583,"350":5.008071171407857,"351":3.4325233084106808,"352":3.2824327126474553,"353":-4.529516329810715,"354":4.745546583190824,"355":-0.4646402606733628,"356":1.325893432798272,"357":-1.0732888531941087,"358":-5.500086077371926,"359":3.4740014722978554,"360":-0.28333201767876964,"361":4.340234853546401,"362":0.1291403448236628,"363":2.991256976379234,"364":-3.4557037228472924,"365":1.9377127150324633,"366":-3.7702287150093112,"367":4.65488019223061,"368":1.1742924135487132,"369":-1.679458964434234,"370":-2.8838646910004275,"371":3.9245632985217616,"372":-2.4650673092477846,"373":1.5682400042444211,"374":-3.8240541124295175,"375":-5.735188405826938,"376":-5.791401541988416,"377":-6.2958252548845355,"378":-10.884877907286228,"379":0.9298814141456997,"380":-0.8968174026683209,"381":4.3668877169302505,"382":-0.41682565163091867,"383":-0.5561908095087712,"384":-0.39869406448252603,"385":0.05311493988369074,"386":-1.8449639156463717,"387":1.0017913336663524,"388":0.5765010614346905,"389":0.556877087081884,"390":0.37325802198246427,"391":0.8631123126571459,"392":0.7650877018047103,"393":0.49464733273856987,"394":0.6364514099191246,"395":0.2703600429969785,"396":0.45384767140702376,"397":-0.21870534384874557,"398":0.8416836278023299,"399":0.5057514481893262,"400":0.34437117578144083,"401":0.29871350356613807,"402":0.5586297700024148,"403":0.8409748431159987,"404":0.8230315151754878,"405":-0.4678088037136491,"406":-0.1831190531455688,"407":-0.21652201486530986,"408":0.3281166803669364,"409":0.6926677481622837,"410":0.1778143327100792,"411":-0.06359014364740927,"412":0.41119603971095975,"413":0.2216879658549888,"414":0.21857833423724501,"415":0.9129172716840269,"416":-4.334169658841126,"417":2.986478291547247,"418":-4.643740057604325,"419":-4.2710400553008965,"420":-3.07722413788091,"421":1.7703680469544154,"422":1.9113893929236692,"423":-6.804266070458729,"424":-1.6343653754765741,"425":-3.3937343332075782,"426":2.942545158256852,"427":-4.517477301137227,"428":-2.013906466736154,"429":-1.9176537985967463,"430":-2.195886622170844,"431":2.3342847792968167,"432":-3.517314214675049,"433":-3.9941418627203444,"434":-5.181138811683646,"435":-2.5013139275246052,"436":-0.15560396075157276,"437":-3.1528269947634184,"438":-5.887044501530447,"439":-4.198396417440314,"440":-2.421471521390947,"441":-0.40582988377908796,"442":-4.297139480396985,"443":-2.1948875966098305,"444":3.390052127023025,"445":3.816749318084089,"446":3.823266213853389,"447":-2.562351538309154,"448":3.303623349538489,"449":5.325597027847553,"450":6.547960870907529,"451":2.120640656369543,"452":-1.7275615359661043,"453":1.7052733334906496,"454":7.3756687713839755,"455":4.848072694002751,"456":6.224264346448615,"457":-3.6558629303109815,"458":0.6101026603108866,"459":6.4305497153161,"460":6.162125034539304,"461":2.6467343503820033,"462":1.0001800922210824,"463":3.3493098038275244,"464":8.086900178680727,"465":3.224002641560952,"466":4.367836188027123,"467":-1.7524213341751373,"468":2.411969001511229,"469":-2.410599699409786,"470":-2.4960719465360293,"471":-3.7039426334458874,"472":-2.984633677007567,"473":4.01097356879799,"474":-0.03488053656620658,"475":-6.24356919841804,"476":-2.03587159958909,"477":-3.2551592519388173,"478":-5.468165003792099,"479":-5.2782488435168355,"480":-4.21774347165121,"481":-3.6472660770157335,"482":-0.74821876015084,"483":-0.1514470433939045,"484":-4.1941712765761325,"485":-2.141640816128454,"486":-3.0563638002121447,"487":-1.952303024033365,"488":2.675592663162613,"489":-6.572326410802929,"490":-3.673579886947409,"491":-2.8256530595630402,"492":-2.136758678596852,"493":-1.2941825112447451,"494":-1.2214714248805396,"495":-0.7377920348784118,"496":5.115682970792384,"497":6.575114782087996,"498":4.108776824568355,"499":2.098517780470306,"500":0.3674251759283737,"501":8.482070404443435,"502":7.712649052932202,"503":8.551519627246632,"504":4.741117949485532,"505":-0.451345182451563,"506":5.052375722324751,"507":5.117673100285031,"508":5.2758699183292705,"509":0.7109607749711587,"510":-0.16238514647949762,"511":4.701304218894283,"512":7.630949478684534,"513":4.361246858772691,"514":-0.9193667239429654,"515":-2.3384064696544646,"516":8.676099587824746,"517":7.6744821948534465,"518":6.546829087784012,"519":-1.5139254532557347,"520":-2.5618629592565036,"521":-2.7265200026878804,"522":1.6535788983343402,"523":-2.281825492580569,"524":-2.56930096112901,"525":1.8013262233519094,"526":0.4580936642646515,"527":3.334176826577597,"528":-2.6186189992160585,"529":-2.187936903812289,"530":-1.3790920945446272,"531":0.3787903116204739,"532":-0.13384923015870043,"533":-1.338378550529959,"534":-2.689800515432795,"535":1.3863099474023735,"536":0.6678241005847102,"537":0.06144787189312777,"538":-2.3687638382537886,"539":-2.2721420782558672,"540":0.8898295586471971,"541":0.7674124428794402,"542":-0.8136798096041553,"543":-3.5748925698876337,"544":-2.269776888720777,"545":-0.9852730549513328,"546":3.922133004889451,"547":-2.5162308918339935,"548":-7.90798213059409,"549":-3.897749188332963,"550":-2.6082107974758832,"551":1.8089132251812594,"552":4.459855505009514,"553":-4.694050804961884,"554":-5.313366649438358,"555":-3.8814126229053922,"556":-0.5740980423185317,"557":-4.359664298998144,"558":-4.4354627867545995,"559":-3.4726972342572604,"560":-3.1610374258442246,"561":-3.532922771767631,"562":1.5449014592196457,"563":-6.853169413403268,"564":-4.859891397538322,"565":-2.912639614827199,"566":0.2361170106811999,"567":0.38818090397105315,"568":-6.211313318970561,"569":-3.8439466890495204,"570":-5.03119621468719,"571":-2.5055948669613417,"572":0.006240547555177713,"573":-0.9679714997305641,"574":-6.306351757793773,"575":-7.659387765317107,"576":-6.205470764192013,"577":1.6198141772311707,"578":-2.9568316928712868,"579":-8.566403522584947,"580":-8.533117482057436,"581":-3.967885966291327,"582":0.9001229529880728,"583":2.1295602152433832,"584":-7.237181097994555,"585":-6.977095065485371,"586":-4.627984845537996,"587":-1.7806055095025086,"588":0.4136644054493236,"589":-9.00487220415065,"590":-5.038456710241751,"591":-3.930069352633517,"592":-1.0790036971846648,"593":-1.5861831528544827,"594":-7.318232013364907,"595":-6.018589040926267,"596":-4.827494711998214,"597":1.7617295211123987,"598":3.0062595059309163,"599":0.5451842821191677,"600":-0.8650235692267284,"601":-0.8984017395292868,"602":-1.3728204732622273,"603":0.770386835970395,"604":0.7765730635850507,"605":-2.055532505060822,"606":-1.404841497532693,"607":-0.9621364416310969,"608":3.1002638625510666,"609":0.34547159213702694,"610":-5.9888580422179665,"611":-6.167697313624399,"612":-4.7029702516730305,"613":-0.10128521541317104,"614":-1.1219742627785807,"615":-2.957036083712326,"616":-4.679201413613393,"617":-3.250763651838689,"618":0.7115176266190272,"619":-0.2024259436210286,"620":1.208852959821527,"621":-0.6565409523550847,"622":-0.9578615545465375,"623":1.6140746256384766,"624":-0.016760370297194082,"625":-0.7128465247938487,"626":-0.7469297141514897,"627":0.8681740765563712,"628":-0.7407046638034266,"629":0.2720919237203416,"630":-0.45378133519338326,"631":-0.2601376029384388,"632":-0.40592039193320617,"633":-0.6017647097874754,"634":0.021174159174112882,"635":0.7280678346307199,"636":0.19851884870883785,"637":-0.19027674471834882,"638":0.15303971592535784,"639":-0.5744801612639973,"640":0.008438833212750173,"641":-1.1015738722696753,"642":-0.9940714373308099,"643":-0.19593969184783364,"644":-0.9055126276513455,"645":0.20605207118100224,"646":0.046915803802341664,"647":-0.3698546469632908,"648":-0.00703176168351437,"649":-0.6342872850330185,"650":0.3184491741041208,"651":-0.7255159400517543,"652":-0.659820392947549,"653":1.0874067990626601,"654":-0.9246445033708117,"655":0.36251225766987494,"656":-0.09463179279993339,"657":-0.08861050322394778,"658":-0.6623834811918182,"659":-0.7082995699447497,"660":0.2816444105031949,"661":0.9110954046298116,"662":0.4273344318204641,"663":-0.42028039101138404,"664":0.12239947192245876,"665":-0.48712959906285147,"666":0.0017412553779027624,"667":-0.9599184318142506,"668":-0.9625577877659508,"669":0.06961357800145086,"670":-0.9532658248656051,"671":0.5566626002788735,"672":-0.3066238911905833,"673":-0.2979437415327791,"674":-0.1004030500170648,"675":-0.701131450567643,"676":2.5219630139699856,"677":-1.6025582401223466,"678":2.1164937940151334,"679":-0.05690178926464312,"680":0.9486334616422848,"681":-0.14739625027911113,"682":0.2174458664514608,"683":-1.5959755869210008,"684":-0.9949301146047695,"685":0.9407384777243142,"686":-1.7609569066662432,"687":-0.945479878722448,"688":-1.7695826424069483,"689":-2.1502648474982147,"690":-3.1456060375528874,"691":-1.4981895067356663,"692":-1.0450920188986061,"693":-2.488007813777187,"694":-1.6057409111288714,"695":-0.969137871342455,"696":0.13893526031851605,"697":0.6178944981074748,"698":0.5067314651321195,"699":0.13648941210174337,"700":0.7966852052486371,"701":-0.18765652954574713,"702":1.6611772462070706,"703":-0.12700138068714598,"704":-0.5576865794583484,"705":0.45097255816666687,"706":0.13589796876268317,"707":0.5729715584028467,"708":-1.708676853423419,"709":-0.06254146126004702,"710":0.7502010127475937,"711":1.1256976254163795,"712":1.9935982282125158,"713":-2.7812808773086686,"714":7.662018259023049,"715":4.228293183054012,"716":3.734415002092735,"717":-0.42883287133188397,"718":-2.537198015152729,"719":0.19042605839832305,"720":2.4460850657467024,"721":1.5418840564286034,"722":0.2648088002472653,"723":0.11880198031571595,"724":1.6073496830889482,"725":0.6956830364823534,"726":-0.24188377073301603,"727":0.2409378542759101,"728":-1.7133428101441506,"729":0.4780688225138273,"730":-0.40528719064862884,"731":-0.08392367671794093,"732":2.6740562448488747,"733":-2.3569900333961487,"734":0.44136762093353127,"735":1.680223213221185,"736":-0.2973505206481529,"737":2.2353043260435608,"738":-0.1603642015405357,"739":-0.49289528085198364,"740":13.869855226818336,"741":4.324050534434046,"742":-1.4497380795282164,"743":2.3218537436607347,"744":2.349978547606333,"745":2.8432904623998136,"746":2.248749057068225,"747":-0.580300177186655,"748":0.16335464588216783,"749":0.8972472594261695,"750":-0.8685385340888161,"751":-1.459066435549599,"752":-0.7848121756649401,"753":-0.4146556282597747,"754":0.2940803349081644,"755":0.7508757551553406,"756":0.4748314213778262,"757":0.0846882998769495,"758":0.5606929321416879,"759":-0.2784221909447569,"760":0.49830271691684674,"761":0.4294856572492255,"762":0.6086315383679605,"763":0.6112329193961118,"764":0.20023470103272328,"765":-0.4251581786237254,"766":-0.0777977184497977,"767":0.15962083106023994,"768":0.13584912650787814,"769":0.3464538364438473,"770":0.25748268699007887,"771":0.7086530003230037,"772":0.7787995468159402,"773":-0.12204690866362858,"774":0.1873632952722568,"775":-0.2830504548264628,"776":0.5380188406733223,"777":0.5495554961792227,"778":0.3942440839324265,"779":1.00200079585621,"780":4.213552896278878,"781":4.178474976350188,"782":1.7492056530413929,"783":5.150067553601302,"784":6.312850189934216,"785":-0.4207623266485112,"786":-5.24698941412355,"787":5.417332201241043,"788":1.636424719953347,"789":3.0677914189443145,"790":-0.3815951514942909,"791":5.549980644991385,"792":4.438807201196295,"793":5.871302690972482,"794":4.034914707936511,"795":3.37859273970355,"796":-1.1324107320237322,"797":7.689458933559562,"798":5.6131595844193365,"799":3.5859088094501015,"800":2.722027532525497,"801":-0.6996382587893323,"802":4.464508218073529,"803":2.2824803300750953,"804":2.630817681856456,"805":1.4921186398373487,"806":-1.999134154980353,"807":0.7144489570071882,"808":-0.6071401093336737,"809":6.939392484323562,"810":7.556348891881336,"811":1.9852968135837739,"812":-3.028109203629965,"813":0.6531624752075063,"814":6.362090118994886,"815":7.0616452720512175,"816":7.348373505753102,"817":-2.73196736216066,"818":2.020145688738151,"819":6.993278670071647,"820":6.810382762752646,"821":-0.4906590220500206,"822":-2.3029387290222303,"823":-3.138077021392031,"824":8.564935066225532,"825":6.305635944213134,"826":-2.072525350879705,"827":-1.636977101601635,"828":2.439697407661682,"829":4.165041795542299,"830":4.2528024771744874,"831":2.796537222817655,"832":-0.6442997657406921,"833":-1.5965750214579824,"834":2.9321556914207196,"835":-4.812380461971726,"836":-3.7369894549331533,"837":-3.351795544651456,"838":5.3445706815076,"839":-1.5203535330251563,"840":1.339489241491145,"841":1.176211525887455,"842":4.692567058795695,"843":3.3990546267872523,"844":-2.5965358439291455,"845":-2.258865434227096,"846":-7.6791764290244915,"847":0.49014346114150226,"848":3.6264580867254153,"849":-3.1724185530179283,"850":-1.4795394558621386,"851":-4.403554159437299,"852":0.8513124498466804,"853":-0.24011034873092793,"854":-2.4192464916799805,"855":-3.4567404845773866,"856":-2.9053290999264556,"857":1.2803814247388323,"858":-2.1900547729048867,"859":-0.8238686215247717,"860":-2.3656118118693628,"861":-1.3824068998489638,"862":-1.6497778650807535,"863":0.1355639210391149,"864":0.9399301426722867,"865":-1.9614615549885293,"866":0.7130807826964105,"867":-0.8281233201355138,"868":-2.102175779448611,"869":-1.8851593899444845,"870":-0.8519073460502395,"871":-2.087083744201008,"872":-1.7769547216770827,"873":-0.6641488869960923,"874":2.652884208493008,"875":-2.753475115473786,"876":-2.5481215066644336,"877":-1.7342313646887082,"878":-4.4108685725628485,"879":-1.3398073559768044,"880":-2.52896540450043,"881":-2.1256739623990546,"882":-0.2845435434123849,"883":-0.6312126665172767,"884":0.5392248025111891,"885":0.4933427516995564,"886":-3.346291605816533,"887":-0.8440416255414319,"888":-5.551777027001934,"889":-0.30100299260002217,"890":2.443160822637502,"891":4.041324572120563,"892":-4.183347409032608,"893":-0.21056862688467665,"894":-0.8296781377674579,"895":0.6292749421576553,"896":-5.36928624905947,"897":0.9137472102227069,"898":2.299315498141818,"899":-4.4892060759346215,"900":-6.5445132428130925,"901":-0.2934909650856227,"902":-3.438214139526753,"903":-4.760375114188137,"904":-0.804086961961464,"905":-2.2081131991709846,"906":-3.5662212498089514,"907":0.8890956103189714,"908":4.5611045368394425,"909":0.9521306573584829,"910":0.07230665208584248,"911":-1.3856094311952523,"912":-0.7361030417734633,"913":2.438545084873532,"914":1.8518624589029544,"915":1.0872738498992953,"916":-0.4808844667049909,"917":-1.471853229263281,"918":4.68901776587137,"919":2.2549030755084942,"920":-0.3459929572788892,"921":0.21795099126631337,"922":1.1242165478522268,"923":0.502324095121403,"924":0.4594054862611972,"925":1.9507522798595778,"926":-2.620944115116654,"927":0.11319297756965924,"928":0.6351193975864451,"929":3.8787776816321555,"930":0.12119260735630015,"931":1.71346891326561,"932":-2.3545609588698793,"933":2.6818025218254915,"934":2.2206897748658765,"935":2.125591712084862,"936":-1.503896974130795,"937":5.656028908666633,"938":-4.81411410861086,"939":-3.8493445448899353,"940":-3.214865257423963,"941":-1.8811185848159033,"942":-6.575103065383504,"943":-3.337380649916023,"944":-4.531699782715908,"945":-1.0792879535017845,"946":-0.3973502534160033,"947":-7.287435234057279,"948":-1.6913372420754555,"949":-1.7549820410964931,"950":-2.363905238024302,"951":1.1401206907862447,"952":1.2982411993011216,"953":-0.6941907263638644,"954":-2.8721791414961135,"955":-4.064969436151754,"956":1.6069287582917007,"957":-4.842542649052482,"958":-3.663658250785241,"959":-2.991256187993445,"960":-2.8573081981688633,"961":0.37221154831026976,"962":0.41118143791062,"963":2.5654180826568997,"964":3.6492658638709274,"965":2.659208769017216,"966":2.076013139318115,"967":-2.212360520840059,"968":-0.0655483545602192,"969":-0.00998799868365335,"970":2.4939228843127497,"971":1.2551299699472576,"972":0.2789865540953155,"973":0.9492222740025791,"974":-1.4191849660117457,"975":0.014735030296977963,"976":1.2192468942201042,"977":-2.2103689801350916,"978":0.04235979032195112,"979":3.047584686752222,"980":1.9721884362962219,"981":1.3767743796325018,"982":0.6101760145005709,"983":-0.9613449094985832,"984":-1.480459596790724,"985":0.6502930412563112,"986":1.303334359375118,"987":0.9635574718194206,"988":-0.07411032228025773,"989":-0.17394731941298996,"990":-2.2450043814395606,"991":-0.7484486528877629,"992":-0.5898053030598048,"993":4.47488447803488,"994":7.818507653795604,"995":2.6491759921027214,"996":-1.117213970714266,"997":0.8767991762536791,"998":-1.8517219086865386,"999":0.6020783579288711,"1000":2.3989267631526565,"1001":-6.977389890745857,"1002":4.556158545361355,"1003":-0.7451072196773534,"1004":-5.226316666617647,"1005":-3.462966542858366,"1006":2.2878500118082865,"1007":-2.9626154659207864,"1008":0.2436785174289655,"1009":-1.6225077612375194,"1010":-2.6915100956512985,"1011":-2.14773049453855,"1012":1.7958953578404404,"1013":-1.0059092682197806,"1014":-0.24466207462860587,"1015":2.3524367385186817,"1016":7.9676295160040835,"1017":7.438218747021765,"1018":4.46213250764619,"1019":-1.2243466748638951,"1020":-1.1291037315814347,"1021":5.109582966948449,"1022":5.135796709549522,"1023":3.924596740877522,"1024":-1.9278014585486296,"1025":-1.878318846608632,"1026":4.672975728501994,"1027":3.0937917324743522,"1028":2.7304733533914556,"1029":6.234381023151561,"1030":-3.524063789170069,"1031":6.536397945252999,"1032":5.4226623200118445,"1033":3.2346253415793336,"1034":-2.328550738896493,"1035":-1.2263730390892313,"1036":3.7665424161691896,"1037":1.5041577148257932,"1038":4.538203296703269,"1039":1.748943063085358,"1040":3.369651224740465,"1041":-2.7372166401305966,"1042":1.7799522079809584,"1043":5.303735421569219,"1044":3.760518178505113,"1045":0.5050813360827078,"1046":-0.6519094611554573,"1047":5.753227541866013,"1048":3.839208701267152,"1049":2.084718986529092,"1050":-2.610976493442908,"1051":4.300658947981025,"1052":1.8744665998108536,"1053":0.7433512099477231,"1054":3.0635886802695125,"1055":-0.08615878992252604,"1056":0.12743408123117617,"1057":4.971182162291132,"1058":1.2960898284656082,"1059":1.3335021894958647,"1060":-0.9238740708685147,"1061":-3.3558457100247336,"1062":4.986762380722231,"1063":4.885278952927689,"1064":3.6534670915741856,"1065":2.4779528984724646,"1066":-1.0453508396244644,"1067":-2.989129840689227,"1068":0.29912748609105416,"1069":6.334793745008189,"1070":1.8915577613009342,"1071":-0.6294647969619207,"1072":3.806196785869298,"1073":2.7781480002137946,"1074":3.865838610197886,"1075":4.789766989782817,"1076":3.917889724007785,"1077":0.2690518019099728,"1078":0.2951520009577844,"1079":2.41095861648597,"1080":3.397369306009151,"1081":1.363465782280325,"1082":3.5060217732124923,"1083":-0.13935469510893045,"1084":3.3425472654853348,"1085":3.513694040277823,"1086":-3.339997975505094,"1087":-0.39466480003500065,"1088":-1.1320285872983495,"1089":4.125266054714539,"1090":3.04435660278689,"1091":1.3011327119906688,"1092":1.4799357192078386,"1093":1.2255057842153425,"1094":-0.9378079433731786,"1095":3.2336215686583563,"1096":3.9775219676944333,"1097":5.914589745431713,"1098":-0.7728717891790842,"1099":0.8805066133026925,"1100":1.6542432517744527,"1101":2.018838646567437,"1102":-2.2807553682295767,"1103":-0.15604502685916682,"1104":3.2434345895929613,"1105":1.4925307899388238,"1106":5.65323452162729,"1107":0.8450458228646931,"1108":-5.194418895489236,"1109":1.6559183196199183,"1110":-4.4684539341348835,"1111":1.2728848204852172,"1112":3.2154884518072437,"1113":0.5783969363880949,"1114":4.756698698772302,"1115":-0.9843768800222091,"1116":1.6311082745039,"1117":0.4332977655629782,"1118":-2.955549809406178,"1119":-0.6982393351518905,"1120":1.902510792841745,"1121":2.1363893391506155,"1122":-0.3743876602404731,"1123":-1.2222856979119734,"1124":2.4282082043540427,"1125":-0.9460485599145967,"1126":-2.43929893747411,"1127":-3.8240618112747353,"1128":0.3057314642524557,"1129":-0.7564958615023469,"1130":6.395816550379989,"1131":0.23577627756485192,"1132":0.7529806907999814,"1133":2.6197290767057257,"1134":-3.938808368379166,"1135":-5.5920909556164995,"1136":1.83340935278771,"1137":3.715863758092338,"1138":0.4452168623959543,"1139":-3.277721657292852,"1140":-6.3168698078841405,"1141":0.11503378141212642,"1142":-2.309421706770702,"1143":4.1107438011970645,"1144":3.3832590500203326,"1145":0.3729249058430624,"1146":-0.4317323620397197,"1147":0.6661826692577296,"1148":2.8085559389618813,"1149":-0.9778342512888998,"1150":-3.858628107888393,"1151":1.4493114781189491,"1152":0.6546037721643718,"1153":2.671181181157754,"1154":0.04036231950052417,"1155":3.247819218527389,"1156":-0.509002278890156,"1157":1.9247456144764812,"1158":1.2993287843898447,"1159":1.683186135730759,"1160":1.3075376272402301,"1161":2.203881711515851,"1162":2.933171644641649,"1163":0.575273017533762,"1164":1.7916916274827925,"1165":-0.5935482951891331,"1166":2.333399256700984,"1167":1.183673353683742,"1168":0.7168639126169175,"1169":1.6239466821818724,"1170":-2.417552253775655,"1171":-0.6710279950929288,"1172":1.4740351878337519,"1173":-2.3100169062271423,"1174":-3.470964399552055,"1175":1.0794561126187698,"1176":4.332371304389566,"1177":-1.361197994649841,"1178":-2.7044084697287096,"1179":-2.34759848844716,"1180":2.4483932743274535,"1181":-4.231185933998527,"1182":-3.1212660079862546,"1183":-2.1721799910552635,"1184":-1.5821834731363045,"1185":-1.268695387386118,"1186":0.3723237974810779,"1187":-0.15175052532220473,"1188":-3.0055555935551728,"1189":-0.7603113211323556,"1190":-1.953067308090408,"1191":-1.3724334859346496,"1192":-4.225358890775268,"1193":-3.068115280230941,"1194":-2.9666750463223583,"1195":-2.0725655694835066,"1196":0.6914102438575462,"1197":-1.6951577269712137,"1198":-2.253133807497789,"1199":-3.6621085796542543,"1200":-2.195839077581318,"1201":0.5990655082500849,"1202":-1.1431334862106155,"1203":-2.7787347753737235,"1204":-2.4049884880622976,"1205":-2.292656124364794,"1206":3.9450993860880343,"1207":-1.582545501864259,"1208":-2.0558194457486425,"1209":-1.5061274014688102,"1210":-2.5706383404799618,"1211":-1.4682846481133986,"1212":2.077648429494641,"1213":-4.006126773301907,"1214":-2.211976091133983,"1215":-1.1571812939744859,"1216":1.8573459742922116,"1217":0.4361350416690265,"1218":-4.095544571682659,"1219":-2.0563828039677876,"1220":-2.4872715956877216,"1221":-3.9060647668608066,"1222":0.15783999691463793,"1223":0.09989025790274418,"1224":-0.3484223739738571,"1225":1.1559769183653108,"1226":1.1172539144937448,"1227":0.6840766684134029,"1228":0.4510494917668462,"1229":-1.1615756095294076,"1230":0.8792768230132068,"1231":0.7098900340263875,"1232":1.1587876569348943,"1233":-0.39292919215680344,"1234":0.6866532071099168,"1235":0.4068534336171291,"1236":0.49332036482954544,"1237":0.8565471797107573,"1238":-1.1173848820236485,"1239":0.9891389798307846,"1240":1.3599889251608428,"1241":0.625600713707745,"1242":-0.40164223788800935,"1243":-0.5616648574677662,"1244":-0.07689294196262672,"1245":0.9549287703122457,"1246":0.30513634556009145,"1247":2.091887134645493,"1248":0.017405783510176232,"1249":1.9151606751641626,"1250":2.3068699845478235,"1251":1.161891450517268,"1252":1.6476976731927446,"1253":-2.2485382817114945,"1254":-0.9134665003124143,"1255":1.2888863177667502,"1256":2.0401857856704075,"1257":1.2391802186309513,"1258":-2.111306859446896,"1259":-3.0821137826631855,"1260":0.692746159912086,"1261":1.3123742724753211,"1262":1.6500922471947224,"1263":0.6355106390805109,"1264":2.969935338161527,"1265":1.530580274179011,"1266":1.9703033819081042,"1267":1.4390534757677538,"1268":0.6794611005500131,"1269":0.22827082462793477,"1270":0.9234324231054442,"1271":0.8773651422486328,"1272":1.5182142673505772,"1273":1.576666584004978,"1274":-0.4082560524017721,"1275":-0.22537242466276014,"1276":-7.293144041257009,"1277":-8.941409977531285,"1278":-8.031113941454192,"1279":3.2793110840414146,"1280":-0.9244968984375491,"1281":-9.385138197520034,"1282":-8.40215966830207,"1283":-7.834975362547743,"1284":0.22486959716077695,"1285":-0.48775163508893393,"1286":-6.968728410608148,"1287":-8.12212070510308,"1288":-6.4289320191918895,"1289":-0.4527132609318599,"1290":-0.6692437258917817,"1291":-12.65352910343682,"1292":-5.9908484869127605,"1293":-6.78780817574779,"1294":-1.533829553286747,"1295":-0.9785857172153516,"1296":-5.989364635934567,"1297":-5.760241637404065,"1298":-6.161535943685808,"1299":-2.776102265843186,"1300":4.676978731605697,"1301":1.194211045005393,"1302":-4.686775982224167,"1303":-0.7471954088954534,"1304":-5.081432961644507,"1305":-6.224960464378576,"1306":1.0171737397607878,"1307":-6.278664220827928,"1308":-4.405780018558523,"1309":-7.1373116002141925,"1310":0.8561261393296765,"1311":-5.834209148832102,"1312":-4.22821590973016,"1313":-5.982265930610793,"1314":-5.01868763845612,"1315":-0.9069979698114246,"1316":-5.095949480220193,"1317":0.3551055737329203,"1318":-2.2759389976185003,"1319":-5.840208795149975,"1320":3.2976226410243146,"1321":-2.101312709706257,"1322":-6.030956233798128,"1323":-3.742594072258645,"1324":-4.864153865428826,"1325":-2.76362728834819,"1326":-1.68069136046166,"1327":2.924903610191111,"1328":1.5914464925460687,"1329":-4.058711800668542,"1330":0.5708698963215983,"1331":1.164397143653263,"1332":0.8834491925580257,"1333":-0.1890780351278988,"1334":-1.576874185863354,"1335":0.11970788032878203,"1336":1.120562826632144,"1337":0.20543478460581932,"1338":-1.3421697012479326,"1339":0.9508885598574462,"1340":-6.563123427980039,"1341":-4.941602470038288,"1342":-6.489711806124686,"1343":-2.5004179850097548,"1344":-2.038687306660587,"1345":-0.7927442504187104,"1346":1.6831564770917469,"1347":1.982520003723169,"1348":-2.444694444793068,"1349":-5.66999080769332,"1350":-1.5934764231659517,"1351":0.6992547856752479,"1352":0.5553128183427795,"1353":3.3034222977454406,"1354":2.646476187876303,"1355":2.2854001935792545,"1356":1.7310740956633512,"1357":-3.295442626654022,"1358":1.5561393878864453,"1359":1.5673495935154942,"1360":1.9898049245864422,"1361":2.317903269450309,"1362":-0.8634848729299222,"1363":-1.379626070787899,"1364":0.9375069414059148,"1365":-0.005237527261881256,"1366":1.298692350749312,"1367":2.973263569488555,"1368":2.9287021031570832,"1369":0.5014049173993793,"1370":2.002558373790772,"1371":2.6798353598680613,"1372":1.4286762016601826,"1373":0.28300020372892115,"1374":2.833965889117882,"1375":1.6917276525656544,"1376":2.0366010271066606,"1377":-0.5269489503899644,"1378":-2.57667403738689,"1379":-6.7475415360301865,"1380":0.10715591158805375,"1381":-0.7868599451963745,"1382":-2.739850235122186,"1383":0.5358954068673829,"1384":5.116573076396334,"1385":0.8631871277694616,"1386":-1.662112192376846,"1387":-2.4791061049879226,"1388":6.4621883543707135,"1389":2.50803641042719,"1390":-0.13803939372426166,"1391":3.2446187910249087,"1392":1.4874148684804682,"1393":1.0128753923831713,"1394":-2.3368347182460796,"1395":1.517431116151769,"1396":-2.372773737044204,"1397":-2.8910797404408792,"1398":-2.0954993977960497,"1399":-3.570422557731057,"1400":6.255625230377705,"1401":1.846572383344779,"1402":-5.7121666051335,"1403":-0.6592944346149576,"1404":-0.4798126071010741,"1405":-0.8562810001328607,"1406":-0.6847877918552348,"1407":-0.607610170189331,"1408":-0.8279651806093,"1409":-0.5335316075255347,"1410":-0.5730743753516886,"1411":0.054322425578670036,"1412":-0.894126288172539,"1413":-0.5574149483083329,"1414":-0.2770924364879699,"1415":-0.39656056156396435,"1416":-0.5914056771409697,"1417":-0.9012564939470908,"1418":-0.9301275271509319,"1419":0.25734251199572333,"1420":0.20128454577535018,"1421":-0.000571598025477391,"1422":-0.3591268453452618,"1423":-0.8282084279381653,"1424":-0.2025235787166932,"1425":-0.23693069800869712,"1426":-0.36201018197994056,"1427":-0.19451700959088508,"1428":-0.30197745285608796,"1429":-0.9466224104860436,"1430":2.297120881765079,"1431":4.176697251697076,"1432":0.1770488866833129,"1433":-0.6515244357888029,"1434":-1.4053165951621707,"1435":-3.553764949701282,"1436":0.40133597786879605,"1437":6.301273994140492,"1438":1.4301399224920746,"1439":0.380370349829305,"1440":1.6456893837310493,"1441":-3.715124704954621,"1442":1.568100069453598,"1443":1.3596429017887977,"1444":-0.44115358447522346,"1445":0.9047516011830259,"1446":-10.139809446351828,"1447":-6.476530899622859,"1448":-2.053895286633206,"1449":-0.7316855765085034,"1450":-1.1143701776525465,"1451":-2.2643867841027907,"1452":-4.362881281691803,"1453":-2.1217673937240007,"1454":-1.0569833326664353,"1455":-0.6065312449551389,"1456":0.4731097748826194,"1457":5.333859224306614,"1458":-3.402980288486881,"1459":1.499380040599668,"1460":2.558879454595566,"1461":6.043889372059158,"1462":0.19984804262349365,"1463":3.497625934469603,"1464":4.232491213609043,"1465":2.556078253656349,"1466":-0.5967880406436746,"1467":1.6934239330688128,"1468":-3.006127618793759,"1469":3.1610918000529926,"1470":2.734713810048886,"1471":1.2845580628020383,"1472":-1.8755147428086034,"1473":1.3428986496924562,"1474":2.2747097732455273,"1475":1.9396268961492786,"1476":3.6166189172845797,"1477":0.0719029250000709,"1478":-0.51317225986298,"1479":3.019444699991309,"1480":3.954169188347853,"1481":-1.1569715183006315,"1482":0.11250149158541979,"1483":0.5112140145661216,"1484":0.18989452456318667,"1485":0.30305868588655555,"1486":0.8320632155483921,"1487":0.20221664893528088,"1488":0.43972952013104355,"1489":0.1736331329968967,"1490":0.6107170074335809,"1491":0.7360057444322741,"1492":0.6067002834747796,"1493":-0.2105557400508418,"1494":0.016903956786585256,"1495":0.48209698065183454,"1496":0.2288525566765422,"1497":0.7716263489652363,"1498":0.27812438211467655,"1499":0.9323677232268885,"1500":0.7827628117694574,"1501":-0.3852405736836351,"1502":0.8187284183663026,"1503":-0.7640830313496855,"1504":1.004208350854147,"1505":0.5825372081942047,"1506":0.0775954771119167,"1507":1.4475412024825276,"1508":-2.703090398614692,"1509":2.972016968781806,"1510":5.9867577056593735,"1511":4.771959079047831,"1512":4.0315369085560295,"1513":-3.9484986379319515,"1514":4.202472301798135,"1515":3.0917984198572257,"1516":4.461091003028248,"1517":7.577894966340411,"1518":-1.0531591312170165,"1519":-5.102711823962349,"1520":7.048562809161856,"1521":4.3132853728850105,"1522":4.514373535839185,"1523":3.9109738209994402,"1524":2.4907819390607457,"1525":2.1076694023344573,"1526":4.766866636852844,"1527":6.169425856508945,"1528":0.5584157873686829,"1529":0.3592810212172933,"1530":10.395128071011966,"1531":6.8548898667980085,"1532":4.765085290183278,"1533":-2.2041678585938063,"1534":2.116391554585917,"1535":-2.3789484954501545,"1536":-2.6229216714316803,"1537":-5.277480432491257,"1538":-4.171054770081161,"1539":-2.3857054818541306,"1540":-0.6610248441568083,"1541":-2.8108589081811153,"1542":-2.2400474354664546,"1543":-6.6486024872167215,"1544":3.6138850918623393,"1545":2.8307253776808783,"1546":7.6426072033994235,"1547":-1.5743162015416103,"1548":1.0322489940987671,"1549":1.871087065715492,"1550":9.662168663628051,"1551":1.313364869301168,"1552":-1.8036472886284072,"1553":1.0149179382076126,"1554":-1.8167274954639345,"1555":1.9095526383369124,"1556":0.716871225263921,"1557":0.4575097868239002,"1558":-2.546255039406284,"1559":2.0808157288548235,"1560":-0.13967775128884774,"1561":2.9179790554993303,"1562":1.4462659141963836,"1563":2.3222203986652175,"1564":0.6856978447105312,"1565":-3.3476381044254047,"1566":1.646981877211527,"1567":1.211291068562109,"1568":1.993868771960093,"1569":2.626890526921341,"1570":-1.2557887346666803,"1571":-1.3997435028377523,"1572":-0.06557334309722293,"1573":0.5065297399054154,"1574":1.4376900968676882,"1575":3.4255024411813606,"1576":3.1590424545726945,"1577":0.9257248879961755,"1578":2.2905961993207815,"1579":2.749270886941883,"1580":2.174995323011984,"1581":1.2094375321682158,"1582":2.615156594855927,"1583":2.536190335982404,"1584":2.6691292876589454,"1585":-0.92934771123925,"1586":-0.6084786811079278,"1587":-0.22836878397168422,"1588":-0.261263370392549,"1589":2.9461033204409386,"1590":-3.265045190887272,"1591":0.0807031529299169,"1592":-1.0400794604236288,"1593":-0.049773785158536664,"1594":0.4007087922524761,"1595":2.2105920600654727,"1596":1.023004995402974,"1597":-1.272629309397205,"1598":5.798149526040852,"1599":4.989231987274884,"1600":9.07879743907203,"1601":-1.45243323554508,"1602":1.0798162448431285,"1603":-5.4575343608864895,"1604":-1.2392914978977558,"1605":-1.6971582322741852,"1606":-0.04207668194710314,"1607":0.4105495278813582,"1608":2.4357736825487954,"1609":3.126231628623671,"1610":3.8894646804438064,"1611":-1.0138696204821749,"1612":0.2512053825203674,"1613":-0.9813877045699954,"1614":8.520223748330828,"1615":7.566822217481104,"1616":5.187783507925156,"1617":-1.6609494948377415,"1618":0.8341741463212875,"1619":7.39083625469702,"1620":6.189355142705849,"1621":6.748346367931296,"1622":-0.8986723643012389,"1623":1.0466265376658732,"1624":8.011031783251411,"1625":5.505062722354419,"1626":6.599028211027746,"1627":0.33364540350636923,"1628":0.789229698413854,"1629":6.63388324069713,"1630":6.062465907720909,"1631":6.248939083456163,"1632":-2.1674130276663526,"1633":1.479910472115534,"1634":7.6116989787542435,"1635":4.7814030627757695,"1636":5.588290222120552,"1637":1.2246543382948025,"1638":1.1406820222362943,"1639":-1.9996520324242109,"1640":-2.3759371529045112,"1641":-3.7189264872192647,"1642":-0.48706773719898194,"1643":0.8561046588650778,"1644":-3.0544904996263944,"1645":-3.883562011809254,"1646":4.232212242510108,"1647":0.5934258612414446,"1648":0.2039329552886528,"1649":0.80766925128078,"1650":3.1219122337306318,"1651":1.355280986615871,"1652":3.3968884846347955,"1653":0.37036724798785003,"1654":-4.652098519513234,"1655":3.299194258698471,"1656":-0.8796868770387277,"1657":-3.1950725208684374,"1658":0.34301863503862895,"1659":-0.8259219068129667,"1660":-3.521636333375475,"1661":-0.5374970174689608,"1662":-3.796417945424324,"1663":0.7484818244981313,"1664":0.5661141097609442,"1665":-0.19426407643195948,"1666":0.3658622601296754,"1667":-0.6914175382320621,"1668":-0.8728798890011643,"1669":-0.6020933370893113,"1670":-0.4988616865595856,"1671":0.06089943560148816,"1672":-0.33122407849774727,"1673":-0.6587102049031476,"1674":-0.7584523850856374,"1675":-0.3806262892644501,"1676":0.14297999702750677,"1677":-0.6064187279862084,"1678":-0.3614421941041033,"1679":-0.9290151640745693,"1680":0.07035949132402886,"1681":-0.950213581708983,"1682":-0.5434341914623214,"1683":-0.21024616115362893,"1684":-1.0777842346825561,"1685":0.8721760779894416,"1686":-1.3024756840145353,"1687":-0.6677131339713103,"1688":0.007127513275711697,"1689":-1.3744634731849392,"1690":-1.3282824569740255,"1691":-3.3742650502132414,"1692":-0.7310333477263012,"1693":2.9705026726244395,"1694":1.7620205187327203,"1695":1.0890196164530204,"1696":-3.4767294431962408,"1697":0.6392132498905295,"1698":3.9119415670191584,"1699":4.495227812001752,"1700":7.965050270343853,"1701":1.3626129004713898,"1702":1.9093550347378643,"1703":5.882296484496366,"1704":5.206696550292443,"1705":7.070170943184495,"1706":3.4785142628372117,"1707":2.0683926019401624,"1708":3.400520979945172,"1709":3.982884641986874,"1710":2.049294169625142,"1711":-0.14825293292275663,"1712":4.903007799280523,"1713":3.507663559470979,"1714":4.007841583162672,"1715":-1.1888364479557596,"1716":0.07747502326603443,"1717":2.770249283060959,"1718":0.3109525683951235,"1719":0.9960768335014469,"1720":1.0949697509656418,"1721":-0.7609164049804262,"1722":-0.2778521919931089,"1723":1.9970650628287856,"1724":2.3378695082406042,"1725":0.26282077519735086,"1726":-2.329550397020271,"1727":-4.350480126193498,"1728":1.140450469906312,"1729":1.3797188533090419,"1730":0.2265921426568478,"1731":2.6113186500657015,"1732":1.7021039398874367,"1733":2.056630148531051,"1734":0.6669024395642669,"1735":1.929525784243303,"1736":-1.3629567874609216,"1737":0.755504593927528,"1738":2.5078780326822994,"1739":1.9824153418586836,"1740":1.9679719091154306,"1741":0.6102676889961107,"1742":-1.8653439261895048,"1743":-4.912254809645211,"1744":-1.4479829121307375,"1745":-3.1104170259915707,"1746":-1.6736579205439455,"1747":4.861608674963803,"1748":0.39479138142149806,"1749":-2.2781362892152996,"1750":-3.03036970732652,"1751":-1.6363205945106045,"1752":-1.4371212653079901,"1753":0.5075419584839788,"1754":-2.1023643942735024,"1755":0.16005490651963775,"1756":-0.050546994185076334,"1757":-4.571069154272179,"1758":-1.0804933740156684,"1759":-0.9527864026587503,"1760":-3.0159356357778946,"1761":-3.1549638550125163,"1762":-1.5441026397627104,"1763":1.2736209149622582,"1764":-4.026283179028477,"1765":-2.2956885390527226,"1766":-2.7531679262002715,"1767":-0.21232073548170163,"1768":-0.9199302339300921,"1769":-1.9759301616884906,"1770":-0.4223043718190648,"1771":-1.828179063841349,"1772":-2.4036991079783077,"1773":3.8558910296946345,"1774":-0.0415925390983506,"1775":-2.8135208827255473,"1776":0.9874156151110618,"1777":-2.8911927595570672,"1778":2.4749873610646516,"1779":1.091554470013468,"1780":-2.1165516705752356,"1781":-2.38094425117277,"1782":-3.478231581223935,"1783":-1.17859323575755,"1784":-1.924761809899932,"1785":3.5351716724781777,"1786":-3.074152243261045,"1787":-3.459920947412565,"1788":0.6475567854713846,"1789":-0.34551661335520467,"1790":-3.540562854566749,"1791":-2.058531434553923,"1792":-2.663264331392903,"1793":-1.4192163300141032,"1794":1.0833520267900782,"1795":0.21386715665546502,"1796":1.0797129979312472,"1797":0.6494870913837335,"1798":0.6648900252869596,"1799":-0.7077583001616274,"1800":-0.12698868038244177,"1801":0.4431203482795485,"1802":0.0822146324434142,"1803":0.9868550686767883,"1804":0.3128603194616607,"1805":-1.2790028140603735,"1806":-0.32659436908299755,"1807":0.8675757334880935,"1808":0.5557186109491655,"1809":0.7075976634312613,"1810":0.216132759940082,"1811":0.7744837156866229,"1812":0.1968398354501529,"1813":0.6284368433347443,"1814":-0.04636690938322539,"1815":1.037061785708281,"1816":-0.4808667759106466,"1817":0.5857831040356092,"1818":1.1085667670493042,"1819":1.2446856211826738,"1820":-1.0122316159205633,"1821":-0.9298830688921101,"1822":2.6877069947428023,"1823":3.271401892209868,"1824":2.0613178547593445,"1825":4.319977572304679,"1826":6.331707515682241,"1827":6.602822595046384,"1828":2.825815356148141,"1829":1.9486041155349787,"1830":1.3249716729816008,"1831":5.599088319231125,"1832":3.8877267574063814,"1833":4.449551658048403,"1834":2.202420979012731,"1835":-0.21404130237177385,"1836":-1.8527070200694984,"1837":4.410528243495911,"1838":1.9732545680669926,"1839":2.4759187819896935,"1840":-4.106720912093844,"1841":-1.494361599210657,"1842":3.860140268764842,"1843":3.6795723957913977,"1844":2.0264143519413937,"1845":0.18504265603648498,"1846":-0.9710175335944189,"1847":-2.121771296842451,"1848":-0.6745696977946225,"1849":-2.4054114199403327,"1850":3.4562128555582587,"1851":-2.2772330969942933,"1852":2.52163095490624,"1853":-2.398687050542474,"1854":-2.8259027535632835,"1855":1.7167197568589332,"1856":2.6416251054644118,"1857":-4.617994761413537,"1858":-4.997530812270989,"1859":-3.603144118811272,"1860":-2.5545014308161824,"1861":0.61195940701339,"1862":-4.543305608862419,"1863":-7.677506619271242,"1864":0.7785515938481656,"1865":-2.5761496274467888,"1866":-1.5555250145460235,"1867":5.54598437385556,"1868":2.937906629872455,"1869":-0.46125438689643744,"1870":2.2581084510088125,"1871":1.9637124904759353,"1872":-3.5976069252773692,"1873":1.9261290606693362,"1874":11.532022455289795,"1875":6.995651852904555,"1876":6.441657140422694,"1877":4.99545327085422,"1878":3.388330309063772,"1879":8.523082407207658,"1880":6.407992038283486,"1881":3.972104072031006,"1882":-2.9755755674037223,"1883":2.3226551095478007,"1884":6.2100013905738205,"1885":5.321575288082585,"1886":3.2666224978742604,"1887":1.5500573787258096,"1888":-1.8392062071264106,"1889":7.231525576723165,"1890":4.866617259548274,"1891":3.232068848984078,"1892":-0.745148322379653,"1893":2.4300793532391256,"1894":8.965945570738606,"1895":4.921416173148371,"1896":2.710603002855624,"1897":1.690217043513377,"1898":2.0196055419144567,"1899":-0.2195735568833081,"1900":-0.7724047327484309,"1901":0.8532982867676158,"1902":-2.5971299096254583,"1903":-5.511323649582768,"1904":0.7835721890460335,"1905":0.1817758746684688,"1906":0.5880849135973714,"1907":-0.6002811128042771,"1908":-5.917229358489529,"1909":-1.4063254670584926,"1910":-2.543663043464444,"1911":-5.02656769700852,"1912":-7.939329336292527,"1913":4.152166426948042,"1914":5.584561013069749,"1915":4.513465463229637,"1916":1.602143392344689,"1917":-0.3034171310043979,"1918":-3.3075389159015165,"1919":-0.9381741566095144,"1920":-0.06476500323295702,"1921":0.6514879652318064,"1922":-0.5179979928732633,"1923":-1.031214409065627,"1924":1.3919186096402587,"1925":2.765119163708893,"1926":5.626253557878098,"1927":3.0758597962586935,"1928":2.3212135860906167,"1929":1.016091969555935,"1930":-0.9226534771753386,"1931":0.6555580414373354,"1932":3.807322330533008,"1933":3.188685476621224,"1934":1.3028866032414754,"1935":3.115685420032357,"1936":2.7869073804246236,"1937":2.907356728746419,"1938":2.4532425714922237,"1939":-4.972940887416239,"1940":0.1303216803484117,"1941":-0.1832939484857969,"1942":3.256415145086625,"1943":2.6272682778589673,"1944":-0.027976856511740048,"1945":0.43087485578815604,"1946":-1.6474055488447332,"1947":2.803871596494813,"1948":2.4272989829397402,"1949":2.457138117422537,"1950":-2.099858176357785,"1951":-3.8521019625434163,"1952":-2.7694140441893134,"1953":-2.0725755416716103,"1954":-1.3311982557574666,"1955":4.546387854728039,"1956":-1.2974963576945586,"1957":-0.9483499526847285,"1958":-2.2154692989084475,"1959":-1.6744438295407742,"1960":0.29669685876446467,"1961":0.6189543052522796,"1962":0.08811311509490623,"1963":-0.6675148134247163,"1964":-1.6383610325448044,"1965":-3.419627987250981,"1966":-1.3464693393553924,"1967":-1.10857052614558,"1968":-2.4482992979839646,"1969":-2.395436893989143,"1970":-1.0185665025655692,"1971":0.6514752207909289,"1972":-3.642737365139079,"1973":-2.08583641987021,"1974":-1.7645952679130228,"1975":-0.8926501044122209,"1976":-0.3782478380450517,"1977":-0.7160700278046519,"1978":0.5112296028494162,"1979":-1.8165816562659725,"1980":-0.3575257000125808,"1981":-1.4117685953053203,"1982":9.50061526790405,"1983":9.168660725500347,"1984":8.634898301494799,"1985":1.1549930712351795,"1986":-1.0893927925259423,"1987":1.784671603705391,"1988":-0.62076391792652,"1989":-2.756029547707198,"1990":0.6236508326717858,"1991":-0.32190410471808245,"1992":-1.364797740669388,"1993":-0.6886742717126594,"1994":-2.043389538252512,"1995":-2.28861675867331,"1996":-0.12539946126127796,"1997":-0.8179193650803894,"1998":-1.0980001748891177,"1999":0.47435850494371595,"2000":-0.6130940333153726,"2001":2.0830760845415153,"2002":-0.8462948926295606,"2003":0.2678281254234862,"2004":-1.7081255642401358,"2005":0.6169648557626816,"2006":-0.8347577586098868,"2007":0.12074130366639586,"2008":-0.333286397662973,"2009":-0.1955089660571295,"2010":-0.5252092049592874,"2011":-0.7950353778130242,"2012":-0.24371596570773438,"2013":1.393815173241821,"2014":1.261828028648426,"2015":-1.0458479046835694,"2016":-0.5198235307812413,"2017":-1.3523361413545119,"2018":0.05157332601401295,"2019":0.10404690056408841,"2020":-0.215709137110293,"2021":-1.0078958752292329,"2022":0.8454089147105547,"2023":-1.6067686566313064,"2024":-0.7086907683892819,"2025":-0.9069438472062201,"2026":-1.3882379536437282,"2027":-1.7398791637242974,"2028":2.998260553166138,"2029":-2.7410318427904055,"2030":-9.67287959224487,"2031":-6.066883378472524,"2032":-4.716694072433672,"2033":-0.4874989778233265,"2034":2.980517746074219,"2035":-6.183768371141536,"2036":-5.381860214979941,"2037":-5.57096776616556,"2038":1.6058240970375566,"2039":4.554453187388696,"2040":-6.770222071565984,"2041":-3.7466347635677595,"2042":-3.4869953823697473,"2043":-3.544087021348402,"2044":0.43241331906539665,"2045":-5.378766333808295,"2046":-5.839632137285502,"2047":-3.2938826935123413,"2048":2.1276328470740262,"2049":-0.12326704788399787,"2050":-6.7305669855550745,"2051":-2.436584560153107,"2052":-4.911237600854016,"2053":-1.142575451337877,"2054":-2.056453426341179,"2055":-0.4576368773557306,"2056":-1.0760846974883773,"2057":-1.525426907001013,"2058":0.27306410590083735,"2059":2.6788208519613237,"2060":0.5830012761240755,"2061":-0.5869242495669191,"2062":-0.8000420785194543,"2063":-0.5464782828004681,"2064":0.20907468308498325,"2065":1.4318751008838566,"2066":1.6620816072359452,"2067":-1.7244159943016506,"2068":1.1670035249068484,"2069":-1.5836319276197715,"2070":-1.3123047472838614,"2071":-1.8374367665817668,"2072":-0.020791235376033248,"2073":-0.3185640807447269,"2074":0.6144910249616998,"2075":-0.9836077028564033,"2076":-1.2823041478563817,"2077":-1.6562397796629926,"2078":-0.15286377711353152,"2079":-0.2775902873655696,"2080":-3.857341431349281,"2081":1.7793695249309895,"2082":0.8007235978650858,"2083":-1.626755387152754,"2084":-5.008287155122836,"2085":-0.6364947377249675,"2086":0.21890617276838908,"2087":-0.007998409040868616,"2088":-3.6943236531592496,"2089":-5.769703130947065,"2090":0.9635172111357614,"2091":-3.8840386006815324,"2092":4.5277706534383215,"2093":0.8410325879620565,"2094":-4.6497457212897,"2095":-0.08978882608386518,"2096":2.1164300481406735,"2097":-1.8176247295799632,"2098":0.21785130009885764,"2099":-6.103533351191495,"2100":-1.1228176837757324,"2101":1.3905320041638647,"2102":-0.5858950810787181,"2103":-2.267011269502971,"2104":-7.1820895287700495,"2105":1.0729489997178794,"2106":-1.1798752529335057,"2107":1.563781922593122,"2108":-4.224850879430727,"2109":5.66619575536674,"2110":4.403340109447474,"2111":4.061512308649709,"2112":0.29071537246436285,"2113":-0.5762194252055545,"2114":4.767243791902788,"2115":4.105284763747181,"2116":4.1349946060740015,"2117":-0.3568611426442318,"2118":2.976394324985356,"2119":5.174565702994268,"2120":3.2411843530984603,"2121":0.07248719608741679,"2122":-1.3488833963915874,"2123":0.6659029316785997,"2124":5.373339890133363,"2125":3.856227664615991,"2126":-6.918920718419593,"2127":3.906464920757426,"2128":-2.130981443334595,"2129":5.052762076730575,"2130":6.126894675495147,"2131":0.03743850048985042,"2132":-5.267086441071794,"2133":-1.2484348947958028,"2134":-0.6607965382448775,"2135":-4.816866154346305,"2136":-4.340420066457858,"2137":0.4465598822006635,"2138":0.022857120869882737,"2139":-2.9402199756965812,"2140":-4.7329256059621105,"2141":-4.645690348100232,"2142":-5.352783336481762,"2143":-3.8878636249260423,"2144":-5.28149338918366,"2145":-3.261170199408442,"2146":-3.256918325268493,"2147":-3.8440624943915878,"2148":0.17657119232338597,"2149":0.900401449366085,"2150":-5.41461370154102,"2151":-3.8657326054694194,"2152":3.054986083903757,"2153":-1.652501285841923,"2154":-5.735437011188565,"2155":-4.728337110491255,"2156":-4.560695116306525,"2157":0.39680204947272163,"2158":-1.471270704748297,"2159":-2.2210477027472497,"2160":0.1815625148881618,"2161":-7.100847615644816,"2162":-3.1222070755862337,"2163":0.4662678650380506,"2164":-5.2513787663639775,"2165":-1.1901520642497716,"2166":-4.928992920763092,"2167":-5.535972889163161,"2168":-0.23618492488666168,"2169":2.082276286937164,"2170":-3.1888526379984334,"2171":-4.51264716340893,"2172":-4.697285507563439,"2173":1.636633502822088,"2174":-3.511506695216034,"2175":3.780409883509342,"2176":-6.047468011454648,"2177":-5.688815717189736,"2178":3.2759187394570453,"2179":-0.34484582320982093,"2180":-1.504297854393571,"2181":-5.449657258569758,"2182":-6.34729592573522,"2183":-1.4011779626877878,"2184":-1.1685739705750589,"2185":-2.694438235680791,"2186":6.958992234343608,"2187":8.44081528594644,"2188":6.637137211568413,"2189":-0.12308808917242418,"2190":-0.017352515366957616,"2191":9.195349566419708,"2192":8.35726004641042,"2193":7.794345046962624,"2194":2.0254187449812875,"2195":1.3671641348197274,"2196":8.439178132201514,"2197":6.578037780011382,"2198":6.485533765866706,"2199":-1.947320871594508,"2200":-1.2819306350897988,"2201":6.138521275224924,"2202":8.877304550984718,"2203":4.199579353361264,"2204":-0.4623697152574865,"2205":-0.2772620324078526,"2206":5.8580327885340235,"2207":8.197955248728176,"2208":7.937607696801746,"2209":-0.6410401245757289,"2210":-1.8092598423909372,"2211":0.6791165176722082,"2212":5.315004952471399,"2213":3.536645996545784,"2214":4.108473076649944,"2215":2.8915376592243187,"2216":-2.780117582544885,"2217":0.12332211405690129,"2218":3.20397128428691,"2219":4.104458052305994,"2220":2.9414665824701363,"2221":0.48025023121556065,"2222":3.0209264886160274,"2223":1.8737078757756687,"2224":3.2999915519009893,"2225":0.8211907892920205,"2226":-1.6692619208537247,"2227":-2.17041185126423,"2228":2.2098650073066426,"2229":3.143131905229364,"2230":0.18904627734411272,"2231":-3.8443930894148264,"2232":-1.5999369710718252,"2233":5.569046083713845,"2234":2.8450047833327177,"2235":-0.2687609734139789,"2236":-0.5931982638218507,"2237":-4.414833650438139,"2238":-0.28604586152808104,"2239":1.012020063861592,"2240":-0.15974001195542142,"2241":3.2129251598813737,"2242":-2.473680695256755,"2243":-2.749933753405475,"2244":0.14453869921838924,"2245":-3.0834140402885035,"2246":3.0251867269862514,"2247":-3.1045141388111954,"2248":-7.2061888155594955,"2249":-3.7718709001312503,"2250":-0.30282885173780977,"2251":-1.38906397048505,"2252":12.687785280976854,"2253":-0.08875295879668775,"2254":1.6646824889072707,"2255":1.556364748987447,"2256":1.9211605486492274,"2257":-0.218933035981873,"2258":0.1349447838943465,"2259":-0.04873014808380902,"2260":-1.1321025664793627,"2261":-1.4608786939167955,"2262":0.6987241565027437,"2263":1.4229878960217324,"2264":3.647449181598571,"2265":2.9323767256468223,"2266":3.2302614138953096,"2267":0.491521468909221,"2268":1.3706486354651775,"2269":-1.5732750292810884,"2270":3.7189001995111193,"2271":2.756284106341971,"2272":0.6281661131233109,"2273":2.2323794778083546,"2274":2.818818964027458,"2275":2.1727943674152965,"2276":2.9411951705923522,"2277":-1.8154552179930512,"2278":0.09160038442283829,"2279":0.7939496485757157,"2280":3.164742342727989,"2281":3.2967781362494715,"2282":2.3340145687175515,"2283":-0.5313230900137295,"2284":-1.543652285568687,"2285":3.217358625817321,"2286":2.7860164736063058,"2287":1.8497923220592642,"2288":1.5257903939114106,"2289":-1.3381442441407538,"2290":-0.04223928061828442,"2291":0.6971000688814584,"2292":-1.5390283480895321,"2293":0.46934592179222373,"2294":-0.18746022498163864,"2295":1.5008359839391983,"2296":0.9188996193696959,"2297":-0.8914926809570619,"2298":-1.3082977748819034,"2299":0.5415154122149791,"2300":12.62519918384209,"2301":6.287086489943126,"2302":-2.7351363541802116,"2303":-0.6617708403466083,"2304":0.2699868080006547,"2305":2.4493867709128843,"2306":-0.569797729583182,"2307":0.8478213420506719,"2308":0.5534930498401285,"2309":-0.50677793908651,"2310":-0.25342573580847194,"2311":0.17440789275451102,"2312":1.258960166859726,"2313":-0.4370661568228786,"2314":2.2449276911735496,"2315":-2.8379211968464846,"2316":1.3487788002384318,"2317":0.5407416278123758,"2318":1.7306022495298956,"2319":-5.777312322926016,"2320":2.4628889869852415,"2321":-0.9932544380752502,"2322":3.9062469109452684,"2323":4.06334271878837,"2324":-1.1785473579225283,"2325":0.2779206253789742,"2326":0.8577890096091311,"2327":2.7701864449799305,"2328":3.2524288490237563,"2329":1.0807094659847294,"2330":3.7118285953771264,"2331":2.064167356143456,"2332":-0.30605981154371353,"2333":2.5505725125378036,"2334":4.134378891805338,"2335":0.6618217682024239,"2336":2.9305955504828587,"2337":3.453061408445978,"2338":1.7742560447592013,"2339":0.5651075023933028,"2340":2.129772884232492,"2341":0.35460538560609095,"2342":-0.8192094911629465,"2343":-0.6386235405345392,"2344":-1.6248688451632387,"2345":-2.113830286706504,"2346":1.4278670060587493,"2347":0.8008379283198883,"2348":-0.18231657592587694,"2349":-1.6722327198984286,"2350":-1.2806395986439987,"2351":-0.24360161421892634,"2352":0.9301000694923593,"2353":-1.674554591330811,"2354":-1.066601136357915,"2355":-0.6161753197243087,"2356":0.765767536165346,"2357":-2.7080423208811464,"2358":-0.007748198732011409,"2359":-1.0122683714125833,"2360":-1.5637961893199661,"2361":1.3311427910735913,"2362":0.034973909998782506,"2363":0.18127701644894126,"2364":-0.9021372756739611,"2365":-0.9969523982509363,"2366":3.1295786853907583,"2367":-4.959193695812692,"2368":-7.041921397528363,"2369":-3.4782718021224923,"2370":-3.8585581267261997,"2371":4.904132181181707,"2372":-5.549846878432968,"2373":-5.248345660469758,"2374":-3.4999500971908604,"2375":-3.0626176300163674,"2376":-3.9589264128693538,"2377":1.4085516959411266,"2378":-4.761841089071619,"2379":-5.403690252732383,"2380":-5.66430580213984,"2381":-3.6327416443807294,"2382":-7.412581676812972,"2383":-7.608319481199361,"2384":-4.3203344033017625,"2385":-4.797410775565219,"2386":-6.187017307372181,"2387":3.4502882562043835,"2388":-3.9070501502653943,"2389":-6.355461660701729,"2390":-4.134201596380633,"2391":0.7086151039686321,"2392":-2.7629680951354723,"2393":-1.5919187924194225,"2394":2.901587459469278,"2395":3.493981239372818,"2396":2.212008528692608,"2397":-0.21614721227352773,"2398":0.2725612455005006,"2399":5.829929237405561,"2400":4.067253913125985,"2401":4.371322624059454,"2402":-2.96414098534034,"2403":5.852311452125981,"2404":1.3151100564679332,"2405":2.438292604091355,"2406":3.1204019994180165,"2407":1.712995791983253,"2408":0.9342195824092373,"2409":3.1406080417781537,"2410":3.8591719981622785,"2411":3.235935432135756,"2412":-0.6609429273620605,"2413":-2.1571236315884432,"2414":5.812063175138768,"2415":3.6897265262150234,"2416":4.171187733611039,"2417":2.1564252801326957,"2418":1.6814356053307884,"2419":0.40282472005631315,"2420":-0.7086599973582738,"2421":3.203733141596336,"2422":1.9247814948071351,"2423":-1.1355991426344318,"2424":-2.870704869520273,"2425":0.8496900717505541,"2426":3.7689549527574426,"2427":2.933284194234676,"2428":-5.39076361752979,"2429":-1.7991549423556907,"2430":4.629597368577649,"2431":1.8924741956932105,"2432":2.6208206368203175,"2433":6.648785645917643,"2434":-3.911816489724394,"2435":3.150842450538423,"2436":-0.35517260135252116,"2437":2.4626207428751328,"2438":-3.2980871552077553,"2439":-1.3663444660143051,"2440":6.164420957368498,"2441":3.351925861607803,"2442":3.8061288356513328,"2443":2.862783545758064,"2444":5.000960837531439,"2445":-0.22744117785480622,"2446":-1.2435665370612619,"2447":-7.956452258061953,"2448":-6.444965421078867,"2449":3.7179326607363024,"2450":-7.004970189372836,"2451":-1.0911815734477741,"2452":-6.583578263179486,"2453":-5.516019666282636,"2454":-0.7015393261415779,"2455":-5.175498522908126,"2456":-1.358416807170419,"2457":-4.281697802313388,"2458":-5.969551969516071,"2459":-1.8520952329410287,"2460":4.593670887975621,"2461":-2.055261428532855,"2462":-7.474374083654568,"2463":-5.703139974888056,"2464":-1.8132143645633318,"2465":-2.3117452322047516,"2466":-3.491757692652626,"2467":-4.995881928202863,"2468":-4.581650880149999,"2469":1.658197123435493,"2470":-0.18429080900834563,"2471":-0.33356137529358093,"2472":-0.37536775394507754,"2473":-0.5304483994594731,"2474":-0.5476648618282364,"2475":-0.6273437083316618,"2476":0.26817066948518226,"2477":-0.3138039971223957,"2478":-0.4771364227218143,"2479":-0.42156099079186243,"2480":0.019599997976441106,"2481":-0.7160610190081915,"2482":-0.07392079891938923,"2483":-0.3982862533799235,"2484":-0.3607290246297858,"2485":-0.43609517049829943,"2486":-0.2704681745054076,"2487":-0.9174842870498879,"2488":-0.5470423249269212,"2489":-0.3848413114176701,"2490":-0.4647675986646838,"2491":0.3451329886811919,"2492":-0.8104448937288868,"2493":-0.7068007564942005,"2494":-0.5320921148478149,"2495":-1.0921511419038037,"2496":-0.6032348373244718,"2497":-1.667139616012375,"2498":-1.5505356032792932,"2499":-2.761503482815789,"2500":-0.9925879658819902,"2501":-2.0421332390218736,"2502":-0.12930544862668447,"2503":-1.9345566408955905,"2504":1.1627240728840609,"2505":-0.44180168472338044,"2506":-0.767018044155155,"2507":0.2253440214111702,"2508":-0.6074228234616853,"2509":-1.652345152380969,"2510":-0.025107196448088193,"2511":-1.9264882301304322,"2512":3.1758570889481597,"2513":-0.13107278063732658,"2514":0.020961219007635385,"2515":0.6870161342910127,"2516":-1.9192491810274932,"2517":0.9445144551489465,"2518":-1.888396749169749,"2519":-0.49157274864150613,"2520":-0.2844535944536237,"2521":-1.4214744043891143,"2522":-1.5455891841267113,"2523":0.5906967451980961,"2524":0.02661733667907476,"2525":1.5590992257810135,"2526":1.7414997379569446,"2527":1.7020172778474763,"2528":4.024591108049948,"2529":5.4158169742716,"2530":3.2525918682579356,"2531":0.9382102351927993,"2532":1.4692555049851008,"2533":-2.200773497991387,"2534":-8.880234210206103,"2535":-0.33962230488724987,"2536":-1.8423264685144747,"2537":-1.4850044764188597,"2538":0.8278399824547444,"2539":3.8598370628417253,"2540":-1.5236215076713135,"2541":-0.4950586770405725,"2542":-1.0437179668089798,"2543":0.14452021894992026,"2544":-0.492303036256315,"2545":2.0546674723667473,"2546":-0.7370717347151157,"2547":0.543910554670832,"2548":-2.7108580117565753,"2549":0.09261539419209115,"2550":4.11296923529979,"2551":-5.752896619738599,"2552":-6.038368204948251,"2553":-3.4480260112403047,"2554":-1.4331977954206752,"2555":-4.171470489723976,"2556":-6.715353949247458,"2557":-5.454793472228797,"2558":-5.5674083849248985,"2559":-5.447125728948062,"2560":-4.309029746782773,"2561":-4.020528554628442,"2562":-4.527474824835093,"2563":-0.3436173428819192,"2564":4.774779354080503,"2565":3.595676887468267,"2566":-5.69375635118101,"2567":-3.3741504079209115,"2568":0.5008178468396496,"2569":3.73600952786962,"2570":-1.855508489395236,"2571":-7.067956192491242,"2572":-6.364397902906682,"2573":1.4393792076251348,"2574":0.7576333584003131,"2575":3.0404274116509393,"2576":2.7600102778608164,"2577":2.6508741273466927,"2578":2.1144776175258886,"2579":-0.7071514252712588,"2580":-3.033452693248133,"2581":2.816278134636802,"2582":2.2343442717691975,"2583":2.490654350033931,"2584":-0.5810768104903037,"2585":-2.6462103142602866,"2586":2.358920202958877,"2587":1.8700945248925493,"2588":2.011315510407179,"2589":0.9755017775210619,"2590":1.3961881549733628,"2591":0.8047993794365005,"2592":2.4860674824032714,"2593":2.440722750153465,"2594":2.123219888775869,"2595":-0.47822730983758427,"2596":-1.6108844952434993,"2597":1.4415459401265545,"2598":2.9340570643645645,"2599":0.5187752010831033}},"b1":{"n":100,"d":1,"w":{"0":-4.036009286063092,"1":-5.9776207614461745,"2":-4.769264244338511,"3":-0.8409283369568544,"4":0.40916182642572213,"5":-1.2636110106672902,"6":-3.0258451459659597,"7":0.46842610305313687,"8":-2.831449060638632,"9":-1.1270841599836146,"10":3.3465233660680744,"11":-0.5741459321939867,"12":-4.76399431336158,"13":-2.7603823291277383,"14":1.9933136206874862,"15":0.9361348864736633,"16":-2.6144836229542934,"17":3.1935836238217052,"18":0.26598390763459695,"19":2.0985735793013163,"20":-3.0522782340170562,"21":-1.5446060044112715,"22":1.9697647540972298,"23":8.866969707573116,"24":-0.6147099213223817,"25":-0.557783279854223,"26":-0.017017560073680625,"27":-10.166546889173055,"28":-8.474622228570645,"29":0.5313064171983024,"30":-8.369797438957548,"31":-1.5444546163017596,"32":1.2150028222877898,"33":1.3860448359087139,"34":3.2448960661656057,"35":1.3151943939628796,"36":-4.300697144539042,"37":1.3076227632051882,"38":-2.5523960668740857,"39":2.695546782489357,"40":-0.3068410449108551,"41":-0.19778111152646774,"42":1.7196978807303882,"43":-8.165085315955537,"44":-0.7837548239678844,"45":0.6439862230007732,"46":-2.3067476025589086,"47":1.2092749530665121,"48":3.229067673930829,"49":10.551579717373981,"50":0.8996579094918,"51":-1.118927215311038,"52":2.476411107022169,"53":0.16401875960545717,"54":-1.3502343324679222,"55":1.3553286077058513,"56":3.321019940580232,"57":0.6089042246585925,"58":3.26076525409638,"59":-4.7562954599356395,"60":2.6073988301640516,"61":-2.512943013492288,"62":-4.170646083989307,"63":-0.6181602382075577,"64":-1.1099608249875004,"65":4.566440466591376,"66":3.2593313726034205,"67":-1.704673753626768,"68":-2.554119408149816,"69":0.5541882035567499,"70":4.908441819257599,"71":-3.5435051697242206,"72":-5.4757316137455,"73":-4.355395311688117,"74":2.199613299917065,"75":-1.4439699739469527,"76":0.5929512896524554,"77":-0.32146429698233087,"78":-0.5975899216141315,"79":-0.8485851178585955,"80":-2.7585246675027264,"81":10.100959550557292,"82":-0.5098055291696046,"83":-0.3115992139920358,"84":-0.004165800054975854,"85":6.883483238920649,"86":3.521702431206314,"87":3.3990791628552124,"88":-6.645321085769522,"89":2.5266428964409817,"90":-2.8714811825324063,"91":1.5957964826972497,"92":-1.75341312203785,"93":0.3387856108740155,"94":-5.7552461817255045,"95":-0.8390543584046426,"96":-0.922773814733534,"97":-0.4446011706087799,"98":-8.751760205307011,"99":4.627269793771931}},"W2":{"n":4,"d":100,"w":{"0":5.800066882547218,"1":1.8947585637706785,"2":4.240368195225503,"3":1.6435986609635282,"4":-0.8368757686617261,"5":0.9662933060769059,"6":3.216809600926884,"7":1.3832998548522903,"8":4.798163063726484,"9":-0.05030893121924528,"10":4.918868942168689,"11":0.9061161988528151,"12":22.61026110633316,"13":4.298654674882741,"14":2.383355900631091,"15":-0.8942186152678243,"16":11.418104607372502,"17":0.8929157535531382,"18":8.346705512793422,"19":0.9690397942988095,"20":1.7082544755334204,"21":-9.809961461726283,"22":-5.919858124317669,"23":-1.372097233113355,"24":0.7913978669963359,"25":0.7966880199268707,"26":2.5023387885717328,"27":-0.9467391970796937,"28":-4.637559416585243,"29":-0.763712950666208,"30":4.537902033694756,"31":-0.3043312727103237,"32":-3.0896307070585323,"33":3.7991163420693237,"34":-2.9649006802369002,"35":-0.18494928547154005,"36":8.924859619592631,"37":-2.9621724673800833,"38":4.024405238697472,"39":12.835175059994537,"40":-7.8488363938151755,"41":1.4527192448198165,"42":-3.210956966018763,"43":-2.1796239898442913,"44":-1.1628004311067537,"45":1.3010783145086957,"46":-6.374545910386684,"47":-1.2382148878585957,"48":-3.4107466379188565,"49":-1.4301287859817162,"50":0.25664420216340406,"51":1.812410359054913,"52":-1.8024339801367286,"53":-3.0955485483017045,"54":0.8854316757312473,"55":-0.7603433848618456,"56":-1.9474651882658358,"57":-0.8676507266716383,"58":5.834019203776725,"59":-3.7013894192496037,"60":-2.494389354648502,"61":-0.6140947500942934,"62":8.649164120479078,"63":-1.6206004500798263,"64":0.8642121296830774,"65":-2.691769852446248,"66":0.9502604246591821,"67":1.573393424239702,"68":2.2702354573167605,"69":-0.8655395895058007,"70":-15.457303295244154,"71":-3.3350163896685445,"72":12.233545317936631,"73":3.0213029045593274,"74":-1.0406855473658523,"75":1.0906180351330206,"76":2.1333680460324747,"77":0.9807827263343825,"78":-7.10869497559346,"79":0.9029270661078086,"80":-0.5918109898462638,"81":-3.0934070243445633,"82":3.439719993538664,"83":-3.7359780621466054,"84":-1.4481106086508464,"85":-2.8523048679970446,"86":0.5448665275190413,"87":-1.4059351905619355,"88":-1.4503935554627818,"89":-2.8444048996310274,"90":0.8557596104682816,"91":-27.121732802554476,"92":3.2195752353857197,"93":6.3453035806657665,"94":9.667787958891836,"95":0.7398225206447001,"96":2.807483775749745,"97":-2.3929150519745184,"98":1.9442532348770802,"99":-3.9891869571498417,"100":3.008521982754626,"101":4.061242282187068,"102":3.12751308029813,"103":3.9869359521695142,"104":-3.7341002132157395,"105":3.9061591878096023,"106":3.0553139848892523,"107":3.1917854351799466,"108":2.071366486127465,"109":3.3978726543474935,"110":0.1905568758293829,"111":3.7708961580618254,"112":12.796833878289702,"113":-1.222895605461946,"114":1.672502808031922,"115":-3.098870216556621,"116":3.1466235535938063,"117":1.152991809833292,"118":-9.41154040405317,"119":12.186959951569843,"120":1.9494131493776685,"121":-1.5782351613957606,"122":-16.27904043931323,"123":0.6308233103637476,"124":3.4121495682911287,"125":3.4710740568976357,"126":2.1804003042058557,"127":1.3969359137423027,"128":-2.109297592608135,"129":-3.5558355149633645,"130":9.176156973079744,"131":9.817453629718965,"132":-2.901982396622117,"133":3.63294742956178,"134":0.26636839681463154,"135":-2.9290145490586714,"136":3.777137830205045,"137":-4.092578925011973,"138":-3.9264183681443128,"139":2.012552972982363,"140":-1.862312832271055,"141":-1.2987756208492676,"142":-3.2588803863807723,"143":-0.5926226333622688,"144":-2.4502343631265897,"145":2.311105233261246,"146":1.2114241003198476,"147":-3.2031410876268316,"148":-3.1024733458653535,"149":-12.428483070073792,"150":-6.794720231874181,"151":2.7375598037356617,"152":-3.631433992672719,"153":-2.0532246281355233,"154":3.228816517421041,"155":-0.3628036681160053,"156":0.36856746151721925,"157":-3.689299791812451,"158":13.467097191495366,"159":-0.1798218893892591,"160":-3.506633988695674,"161":-0.7192189031194921,"162":20.135106131931895,"163":3.1836403389524968,"164":3.481863909458594,"165":10.444108227482607,"166":-4.060488311398397,"167":3.9065768054950225,"168":3.478017039321655,"169":-3.085422648850759,"170":-0.8489391345638787,"171":0.43073929161920727,"172":13.44487887819937,"173":0.9796093045031445,"174":-4.025518270584166,"175":4.2079752978893925,"176":-5.057119229549203,"177":2.9132420633026217,"178":-2.421379206669515,"179":3.3381041431701495,"180":0.4462511269007117,"181":-2.6863900797973335,"182":0.9635711880203908,"183":1.71957855060319,"184":19.077796654490427,"185":-2.175913595128874,"186":2.3717676261150715,"187":-3.008839319985404,"188":-0.36939604663225983,"189":-3.231649248595029,"190":3.449460102668048,"191":-10.11860456701254,"192":-1.5245768811426734,"193":0.6367786483293999,"194":0.8232226505555094,"195":3.24005323639002,"196":3.6769548367571323,"197":-2.225605624924475,"198":1.9290198770917057,"199":-2.612060896425932,"200":0.38749315485578584,"201":14.511182809476308,"202":7.709909917670039,"203":-2.3337758195296328,"204":-0.371298301426393,"205":6.634049242603534,"206":8.536992807626563,"207":0.28943440233734086,"208":0.42712415486266564,"209":-1.7825109085545998,"210":5.878080972515223,"211":1.6898889045820151,"212":12.615395117772406,"213":-0.7861211863229163,"214":1.1150120419998202,"215":-4.047848550786469,"216":-8.239255019704537,"217":0.2748881550026944,"218":2.559449383436394,"219":15.63535385377858,"220":-6.8469993271622585,"221":-5.968728805005547,"222":-9.308837440628858,"223":1.7360429973634262,"224":1.7823686825375418,"225":1.8972996674267129,"226":0.2551154603631528,"227":-1.6796053695672468,"228":-2.2442901242773208,"229":-1.066487145673274,"230":-1.4287963589366106,"231":8.443296881344136,"232":0.7856033787494827,"233":0.5953045667645395,"234":0.5357782804550654,"235":7.57370417872594,"236":-8.076774403066056,"237":2.833104291005099,"238":-0.2155668188652009,"239":8.293242806709872,"240":8.658838860318728,"241":10.859239451531396,"242":-1.1325337080487135,"243":-0.18911625728610187,"244":2.382433828271694,"245":-7.227901283423205,"246":-2.9671544692655023,"247":0.5725517593052267,"248":-9.122668666952055,"249":-21.424148358861054,"250":9.184503934372671,"251":-1.403228026386339,"252":-12.346845005326616,"253":-0.11453651823754786,"254":4.439643904207252,"255":0.16679832924257834,"256":8.597865541305357,"257":-1.4324312105987058,"258":14.448479569509372,"259":-0.23675915664688046,"260":-10.967876514052755,"261":-1.1732863806570515,"262":18.55205775317475,"263":-0.7298720933346643,"264":1.0859109458396798,"265":-2.9884907975066084,"266":-9.552953861200715,"267":12.715800129852722,"268":9.462636939602001,"269":1.6583574416422997,"270":8.131891886625265,"271":0.2512728971134367,"272":4.70498313150408,"273":0.7399810173368293,"274":-11.619103296504823,"275":10.218698596239062,"276":-0.36962178498707926,"277":-1.857223427466628,"278":-11.549300431941148,"279":-0.8921045665824062,"280":-3.8588227224301983,"281":-17.03467125819425,"282":12.876760666323472,"283":-10.170811607299589,"284":19.045313602480533,"285":-11.378938658138852,"286":0.8107143914948635,"287":-8.707863196021565,"288":-3.5563962563811886,"289":-9.857255907629959,"290":-3.5874100030938934,"291":2.12018417685826,"292":5.890412259507451,"293":0.3316935717571306,"294":10.598090955192445,"295":0.7423010827278892,"296":-2.855684872781104,"297":0.8163683172135047,"298":15.497226491108293,"299":-7.953867236052531,"300":2.6662340388104964,"301":0.9644704469313046,"302":5.948283915499448,"303":1.8105025539561377,"304":-2.9248353935133617,"305":3.6218988636526155,"306":3.374286424213765,"307":3.6639312791368064,"308":1.9405586889767827,"309":3.5533164153841685,"310":8.108730745205694,"311":3.160034873749233,"312":3.3611845496474797,"313":-1.4598587707028063,"314":0.5719426572774794,"315":-3.4152555091583756,"316":5.743853662705029,"317":21.26784338723667,"318":-9.059736709991318,"319":8.736709699401178,"320":2.347959860973344,"321":-10.895541000082531,"322":-10.666129609861896,"323":1.0492206685622043,"324":3.061032630531221,"325":3.155151524121274,"326":2.0424492919387522,"327":0.07665820917800947,"328":-1.2537684408753762,"329":-3.0162358722587377,"330":11.374621091685913,"331":3.6115643121486567,"332":-0.21217692553150044,"333":5.330836196256223,"334":1.09243407814547,"335":-1.7468891764782504,"336":5.918781315791007,"337":-2.033285027164679,"338":1.0939666714452234,"339":8.052612193290779,"340":6.797893694725521,"341":-1.784814665470691,"342":-0.2752676218708418,"343":1.8867105078181146,"344":-6.93053035101768,"345":8.232737209932798,"346":-6.999268052441882,"347":-2.9228348145563054,"348":-3.1532715608411204,"349":-20.23779616583233,"350":-13.680925193644589,"351":-0.3877807929911398,"352":-4.285828062731524,"353":1.315463292163564,"354":3.472802467013231,"355":2.5848749271086584,"356":-1.1853922466879532,"357":-2.9795179136287224,"358":-5.858705659934015,"359":-1.9196687429484498,"360":-4.258817897202234,"361":0.40967383166181465,"362":10.770021092198872,"363":1.343218930317392,"364":3.515069892253648,"365":-10.964900519937958,"366":-5.435715739601922,"367":3.7944735402288,"368":4.424207970018822,"369":-2.808917289105216,"370":1.0180390331765048,"371":2.62860874103038,"372":14.74294360461213,"373":-2.7187169245265834,"374":-4.698276217395982,"375":5.077380547568928,"376":-0.3393662848070324,"377":3.642429667035232,"378":-13.923301648836778,"379":1.434944539631842,"380":-0.9360685056571451,"381":-2.2048703577181175,"382":3.692577889033685,"383":-1.1478093592013565,"384":11.49821506890355,"385":-4.747083281998145,"386":-3.1255715066914953,"387":-3.12106888995737,"388":-0.32953029009466145,"389":-3.2974829594873967,"390":3.4647992447597344,"391":6.125192589004773,"392":10.817797615267516,"393":9.746849825294714,"394":7.218783701390256,"395":3.089227037688616,"396":0.40848872722098545,"397":-1.4302426065644376,"398":3.0776292690933316,"399":-4.109931440025416}},"b2":{"n":4,"d":1,"w":{"0":-1.015555199460989,"1":-4.1304196583493065,"2":-0.33769421097076524,"3":-2.7160533782834997}}}}
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
        <div style="overflow: auto"><div style="float: left">random action:&nbsp;</div> <div id="actionRandom" style="background-color: red;height: 1em"></div></div>
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