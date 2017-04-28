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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(2);
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
/* 2 */
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
/* 3 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22).Buffer))

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
	fixUrls = __webpack_require__(27);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__matrixOperations__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Matrix__ = __webpack_require__(3);




function buildMatrices(inputSize, outputSize, hiddenLayerSize) {
    var matrices = [];

    matrices[0] = new __WEBPACK_IMPORTED_MODULE_1__Matrix__["a" /* default */](hiddenLayerSize, inputSize); //Hidden layer weights
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__matrixOperations__["a" /* fillWithRandomValues */])(matrices[0], 0, 0.01);

    matrices[1] = new __WEBPACK_IMPORTED_MODULE_1__Matrix__["a" /* default */](hiddenLayerSize, 1, 0, 0.01); //Hidden layer biases

    matrices[2] = new __WEBPACK_IMPORTED_MODULE_1__Matrix__["a" /* default */](outputSize, hiddenLayerSize); //Output layer weights
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__matrixOperations__["a" /* fillWithRandomValues */])(matrices[2], 0, 0.01);

    matrices[3] = new __WEBPACK_IMPORTED_MODULE_1__Matrix__["a" /* default */](outputSize, 1, 0, 0.01); //Output layer biases

    return matrices;
}

class NeuralNetwork {
    constructor(inputSize, outputSize, hiddenLayerSize) {
        this.forward = this.forward.bind(this);
        this.backPropagate = this.backPropagate.bind(this);

        this._matrices = buildMatrices(inputSize, outputSize, hiddenLayerSize);

        this.outs = [
            null,//Gets replaced by the input matrix later
            new __WEBPACK_IMPORTED_MODULE_1__Matrix__["a" /* default */](hiddenLayerSize, 1),
            new __WEBPACK_IMPORTED_MODULE_1__Matrix__["a" /* default */](hiddenLayerSize, 1),
            new __WEBPACK_IMPORTED_MODULE_1__Matrix__["a" /* default */](hiddenLayerSize, 1),
            new __WEBPACK_IMPORTED_MODULE_1__Matrix__["a" /* default */](outputSize, 1),
            new __WEBPACK_IMPORTED_MODULE_1__Matrix__["a" /* default */](outputSize, 1),
        ];
    }

    forward(input) {
        this.outs[0] = input;

        __WEBPACK_IMPORTED_MODULE_0__matrixOperations__["b" /* mul */](this._matrices[0], this.outs[0], this.outs[1]);
        __WEBPACK_IMPORTED_MODULE_0__matrixOperations__["c" /* add */](this.outs[1], this._matrices[1], this.outs[2]);
        __WEBPACK_IMPORTED_MODULE_0__matrixOperations__["d" /* tanH */](this.outs[2], this.outs[3]);
        __WEBPACK_IMPORTED_MODULE_0__matrixOperations__["b" /* mul */](this._matrices[2], this.outs[3], this.outs[4]);
        __WEBPACK_IMPORTED_MODULE_0__matrixOperations__["c" /* add */](this.outs[4], this._matrices[3], this.outs[5]);

        return this.outs[5];
    }

    backPropagate(outputError, alpha) {

        //Clear old deltas before starting. Re-using the same matrices (Float64Arrays) provides a 15% performance gain
        __WEBPACK_IMPORTED_MODULE_0__matrixOperations__["e" /* clearDeltasInArrayOfMatrices */](this.outs);

        this.outs[5].dw = outputError.w;

        __WEBPACK_IMPORTED_MODULE_0__matrixOperations__["f" /* backwardAdd */](this.outs[4], this._matrices[3], this.outs[5]);
        __WEBPACK_IMPORTED_MODULE_0__matrixOperations__["g" /* backwardMul */](this._matrices[2], this.outs[3], this.outs[4]);
        __WEBPACK_IMPORTED_MODULE_0__matrixOperations__["h" /* backwardTanH */](this.outs[2], this.outs[3]);
        __WEBPACK_IMPORTED_MODULE_0__matrixOperations__["f" /* backwardAdd */](this.outs[1], this._matrices[1], this.outs[2]);
        __WEBPACK_IMPORTED_MODULE_0__matrixOperations__["g" /* backwardMul */](this._matrices[0], this.outs[0], this.outs[1]);

        __WEBPACK_IMPORTED_MODULE_0__matrixOperations__["i" /* updateValuesFromDeltasInArrayOfMatrices */](this._matrices, alpha);
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = gaussRandom;
var return_v = false;
var v_val = 0.0;
function gaussRandom() {
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


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gaussRandom__ = __webpack_require__(7);
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
        throw new Error();
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
        m.w[i] = mu + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__gaussRandom__["a" /* default */])() * std;
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DQN_QNetworkAgent__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DQN_NeuralNetwork__ = __webpack_require__(6);

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

let currentNeuralNetwork; //@TODO WARNING IS HUGE HACK

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
        var numberOfActions = 4;
        // create the DQN agent
        var spec = {alpha: 0.01}; // see full options on DQN page
        this._neuralNetwork = new __WEBPACK_IMPORTED_MODULE_2__DQN_NeuralNetwork__["a" /* default */](numberOfStates, numberOfActions, 100);
        if (typeof previousSavedData !== 'undefined') {
            this._neuralNetwork.fromJSON(previousSavedData);
        }
        this._agent = new __WEBPACK_IMPORTED_MODULE_0__DQN_QNetworkAgent__["a" /* default */](
            numberOfStates,
            numberOfActions,
            this._neuralNetwork,
            spec,
        );

        this._learningEnabled = learningEnabled;
    }

    getAction(state, reward) {
        currentNeuralNetwork = this._neuralNetwork;

        if (this._learningEnabled) {
            if (reward !== null) {
                this._agent.learn(reward);
                if (__WEBPACK_IMPORTED_MODULE_1__index__["settings"].renderingEnabled) {
                    renderReward(reward)
                }
            }
        }
        let actionResponse = this._agent.act(state);

        if (__WEBPACK_IMPORTED_MODULE_1__index__["settings"].renderingEnabled) {
            renderActionResponse(actionResponse);
        }

        return actionResponse.action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RlDqn;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderer_HtmlTableRenderer__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agent_ColumnCompare__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agent_LookAheadWide__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agent_LookAheadWideAndDeep__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agent_AlwaysDown__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agent_BarelyLookAhead__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agent_RL_DQN_Untrained__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__agent_RL_DQN_PreTrained__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__GameRunner__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__style_css__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__style_css__);











// import ReinforcementLearnerDeepQNetworkPreTrained from './agent/ReinforcementLearnerDeepQNetworkPreTrained'


const settings = {
    renderingEnabled: true,
    speed: 250,
    ticksPerIntervalWhenNotRendering: 10,//100 is good for speed, 10 is good for precise "actions per second" readout
};
/* harmony export (immutable) */ __webpack_exports__["settings"] = settings;


document.body.innerHTML =
    '<div id="info">Agent: <select id="agentSelector"></select>' +
    '<br>Speed Interval: <select id="interval">' +
    '<option value="no-render">0ms with no rendering</option>' +
    '<option value="0">0ms</option>' +
    '<option value="100">100ms</option>' +
    '<option value="200">200ms</option>' +
    '<option value="250">250ms</option>' +
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
    '\n- Gain ' + __WEBPACK_IMPORTED_MODULE_8__environment__["a" /* config */].verticalDeltaScore + ' points for every row lower you go' +
    '\n- Loose ' + __WEBPACK_IMPORTED_MODULE_8__environment__["a" /* config */].verticalDeltaScore + ' points for every row higher you go' +
    '\n- Loose ' + -__WEBPACK_IMPORTED_MODULE_8__environment__["a" /* config */].tileValueMap[1] + ' points when moving into a red square' +
    '\n- Loose ' + -__WEBPACK_IMPORTED_MODULE_8__environment__["a" /* config */].tileValueMap[0] + ' points when moving into a grey square' +
    '</pre>';
const scoreElement = document.getElementById('score');

let autoPlay = true;
let intervalReference = null;
let agent;
let currentAgentName;
let renderer = new __WEBPACK_IMPORTED_MODULE_0__renderer_HtmlTableRenderer__["a" /* default */](document.getElementById('rendererContainer'));

let gameRunner = new __WEBPACK_IMPORTED_MODULE_9__GameRunner__["a" /* default */](renderer, handleGameRunnerStatusChange);

let agents = {
    'RL_DQN_PreTrained - ranked 192': __WEBPACK_IMPORTED_MODULE_7__agent_RL_DQN_PreTrained__["a" /* default */],
    'RL_DQN_Untrained': __WEBPACK_IMPORTED_MODULE_6__agent_RL_DQN_Untrained__["a" /* default */],
    'LookAheadWideAndDeep - ranked 234': __WEBPACK_IMPORTED_MODULE_3__agent_LookAheadWideAndDeep__["a" /* default */],
    'LookAheadWide - ranked 230': __WEBPACK_IMPORTED_MODULE_2__agent_LookAheadWide__["a" /* default */],
    'ColumnCompare - ranked 208': __WEBPACK_IMPORTED_MODULE_1__agent_ColumnCompare__["a" /* default */],
    'BarelyLookAhead - ranked 192': __WEBPACK_IMPORTED_MODULE_5__agent_BarelyLookAhead__["a" /* default */],
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
        '\nActions per second: ' + stats.actionsPerSecond +
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

let intervalSelectElement = document.getElementById('interval');

//Display the default setting in the UI select box
if (!settings.renderingEnabled) {
    intervalSelectElement.value = 'no-render';
} else {
    intervalSelectElement.value = settings.speed;
}

intervalSelectElement.addEventListener('change', (event) => {
    const value = event.target.value;
    let newEnableRenderingValue = true;
    autoPlay = true;
    if (value === 'no-render') {
        newEnableRenderingValue = false;
        settings.speed = 0;
        renderer.clear();
    } else if (value === 'paused') {
        autoPlay = false;
    } else {
        settings.speed = value;
    }
    if (newEnableRenderingValue != settings.renderingEnabled) {
        settings.renderingEnabled = newEnableRenderingValue;
        newGame();
    }
    setupInterval();
});

function setupInterval() {
    clearInterval(intervalReference);
    if (autoPlay) {
        if (settings.renderingEnabled) {
            intervalReference = setInterval(gameRunner.tick, settings.speed);
        } else {
            //Normal ticking takes 3ms between ticks which is not fast enough, so tick 100 times
            intervalReference = setInterval(function () {
                for (let i = 0; i < settings.ticksPerIntervalWhenNotRendering; i++) {
                    gameRunner.tick();
                }
            }, 0);
        }
    }
}

document.body.addEventListener('keydown', function (event) {
    gameRunner.takeAction(event.key);
    // if (settings.renderingEnabled) {
    //     const agentObservation = environment.getAgentObservation();
    //     renderer.render(agentObservation, environment.getGodObservation());
    // }
});

function newGame() {
    gameRunner.newGame(agents[currentAgentName], settings.renderingEnabled);
}

newGame();
setupInterval();


/***/ }),
/* 11 */
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
/* 12 */
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
    lastSecondsActionCount: 0
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
/* 13 */
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(1);


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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(1);


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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(1);


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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(1);


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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment__ = __webpack_require__(0);



const actions = ['w', 'a', 's', 'd'];

const numberOfStates = __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize[0] * __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* config */].viewPortSize[1] + 1;

let rlDqn = new __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__["a" /* default */](true, numberOfStates);

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
/* harmony export (immutable) */ __webpack_exports__["a"] = RL_DQN_Untrained;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_RlDqn__ = __webpack_require__(9);
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tensorTools__ = __webpack_require__(2);
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(21)
var ieee754 = __webpack_require__(26)
var isArray = __webpack_require__(23)

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "#info {\n    margin-right: 2em;\n    /*float: left*/\n}\n\n.InfectionGameHtmlTableRender {\n    /*float: left;*/\n    overflow: auto;\n}\n\n.InfectionGameHtmlTableRender table {\n    padding-right: 2em;\n    border-spacing: 0;\n    border-collapse:collapse;\n}\n\n.InfectionGameHtmlTableRender table td {\n    border: 0; /*For iphones*/\n}\n\n.InfectionGameHtmlTableRender > div {\n    float: left;\n    border-spacing: 0;\n    margin-right: 2em;\n}\n\n/*.InfectionGameHtmlTableRender table.renderer-table-canvas-agent {*/\n    /*padding: 10px;*/\n    /*background-color: black;*/\n/*}*/\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-god td {\n    height: 5px;\n    width: 5px;\n}\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-agent td {\n    height: 22px;\n    width: 22px;\n}\n\n#agentRendererContainer {\n    margin-top: 1em;\n}", ""]);

// exports


/***/ }),
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Recurrent__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Matrix__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NeuralNetwork__ = __webpack_require__(6);




// syntactic sugar function for getting default parameter values
var getopt = function (opt, field_name, default_value) {
    if (typeof opt === 'undefined') {
        return default_value;
    }
    return (typeof opt[field_name] !== 'undefined') ? opt[field_name] : default_value;
};

var randi = __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].randi;

class Agent {
    constructor(numberOfStates, maxNumberOfActions, neuralNetwork, opt) {
        this.gamma = getopt(opt, 'gamma', 0.75); // future reward discount factor
        this.epsilon = getopt(opt, 'epsilon', 0.1); // for epsilon-greedy policy
        this.alpha = getopt(opt, 'alpha', 0.01); // value function learning rate

        this.experience_add_every = getopt(opt, 'experience_add_every', 25); // number of time steps before we add another experience to replay memory
        this.experience_size = getopt(opt, 'experience_size', 5000); // size of experience replay
        this.learning_steps_per_iteration = getopt(opt, 'learning_steps_per_iteration', 10);
        this.tderror_clamp = getopt(opt, 'tderror_clamp', 1.0);

        this.num_hidden_units = getopt(opt, 'num_hidden_units', 100);

        this.numberOfInputs = numberOfStates;
        this.numberOfActions = maxNumberOfActions;

        this.reset();

        this._neuralNetwork = neuralNetwork;
    }

    reset() {
        // this.nh = this.num_hidden_units; // number of hidden units

        this.exp = []; // experience
        this.expi = 0; // where to insert

        this.t = 0;

        this.r0 = null;
        this.s0 = null;
        this.s1 = null;
        this.a0 = null;
        this.a1 = null;
    }

    toJSON() {
        // save function
        var j = {};
        j.nh = this.nh;
        j.numberOfInputs = this.numberOfInputs;
        j.numberOfActions = this.numberOfActions;
        j.net = __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].netToJSON(this.net);
        return j;
    }

    fromJSON(j) {
        // load function
        this.nh = j.nh;
        this.numberOfInputs = j.numberOfInputs;
        this.numberOfActions = j.numberOfActions;
        this.net = __WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].netFromJSON(j.net);
    }

    act(slist) {
        // convert to a Matrix column vector
        var state = new __WEBPACK_IMPORTED_MODULE_1__Matrix__["a" /* default */](this.numberOfInputs, 1);
        state.setFrom(slist);

        let actionWasRandom = false;
        let actionWeights = null;
        let action;

        // epsilon greedy policy
        if (Math.random() < this.epsilon) {
            action = randi(0, this.numberOfActions);
            actionWasRandom = true;
        } else {
            // greedy wrt Q function
            var actionMatrix = this._neuralNetwork.forward(state, false);

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
    }

    learn(r1) {
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
    }

    learnFromTuple(s0, a0, r0, s1) {

        // want: Q(s,a) = r + gamma * max_a' Q(s',a')

        // compute the target Q value
        var tmat = this._neuralNetwork.forward(s1, false);
        var qmax = r0 + this.gamma * tmat.w[__WEBPACK_IMPORTED_MODULE_0__Recurrent__["a" /* Recurrent */].maxi(tmat.w)];//@TODO ROD NOTE - should we look more than one step ahead?

        // now predict
        var pred = this._neuralNetwork.forward(s0, true);

        var tderror = pred.w[a0] - qmax;
        var clamp = this.tderror_clamp;

        if (tderror > clamp) {
            tderror = clamp
        } else if (tderror < -clamp) {
            tderror = -clamp
        }

        var outputError = new __WEBPACK_IMPORTED_MODULE_1__Matrix__["a" /* default */](this.numberOfActions, 1);
        outputError.w[a0] = tderror;

        this._neuralNetwork.backPropagate(outputError, this.alpha);

        return tderror;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Agent;
;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Matrix__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gaussRandom__ = __webpack_require__(7);



// Utility fun
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        throw new Error(message);
    }
}

var randi = function (a, b) {
    return Math.floor(Math.random() * (b - a) + a);
};

var copyMatrix = function (b) {
    var a = new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](b.n, b.d);
    a.setFrom(b.w);
    return a;
};

var copyNet = function (net) {
    // nets are (k,v) pairs with k = string key, v = Matrix()
    var new_net = {};
    for (var p in net) {
        if (net.hasOwnProperty(p)) {
            new_net[p] = copyMatrix(net[p]);
        }
    }
    return new_net;
};

// var updateMatrix = function (m, alpha) {
//     // updates in place
//     for (var i = 0, n = m.n * m.d; i < n; i++) {
//         if (m.dw[i] !== 0) {
//             m.w[i] += -alpha * m.dw[i];
//             m.dw[i] = 0;
//         }
//     }
// };

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
            net[p] = new __WEBPACK_IMPORTED_MODULE_0__Matrix__["a" /* default */](1, 1); // not proud of this
            net[p].fromJSON(j[p]);
        }
    }
    return net;
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

// more utils
// R.updateMatrix = updateMatrix;
// R.updateNet = updateNet;
R.copyMatrix = copyMatrix;
R.copyNet = copyNet;
R.netToJSON = netToJSON;
R.netFromJSON = netFromJSON;

const Recurrent = R;
/* harmony export (immutable) */ __webpack_exports__["a"] = Recurrent;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const data =
    {"matrices":[{"n":100,"d":82,"w":{"0":-0.24028021422839552,"1":0.9047290996728675,"2":1.3939945365929132,"3":0.20552973416276527,"4":0.0477156628030926,"5":1.2744015448657489,"6":-0.2405264715774584,"7":0.7541498365500586,"8":-0.28940501694521337,"9":-0.6539866936733734,"10":-0.04393870078785579,"11":1.9718966220384742,"12":0.17549414321532394,"13":0.1341096825628174,"14":0.10363476311001234,"15":-0.67301885076963,"16":-1.1499985741068515,"17":0.2268281962606132,"18":-0.7311100604460103,"19":0.5198491960897292,"20":-0.537937152352604,"21":0.35934524536336354,"22":-0.5809245333268228,"23":1.4252975380635338,"24":-0.3920424578126628,"25":-0.20696808864490354,"26":0.9413149244802317,"27":1.2863064627911585,"28":0.4925797478553592,"29":-1.9468342202941058,"30":-0.1991568575117851,"31":0.3942554002686577,"32":2.102347982013396,"33":0.6991883122208008,"34":-1.0577231628412753,"35":0.9714765746330406,"36":-0.7147487236191511,"37":1.3850104296145027,"38":0.21605187915810273,"39":3.469210744675839,"40":1.6253474974849544,"41":-0.05764946765767565,"42":-0.9966121708659363,"43":0.8123470156834515,"44":-0.20687167318150854,"45":-0.7208865327809446,"46":0.6180768303037203,"47":-0.7012038738274269,"48":-1.4293364139476412,"49":-1.5215111770649752,"50":-1.3251147176977511,"51":-1.5183396402553326,"52":0.9242621928931988,"53":-0.5549286898769056,"54":0.10800212597078519,"55":-0.4390719071604942,"56":1.3873787254845527,"57":0.8820182471385093,"58":-0.01761017358525914,"59":0.059051831619137206,"60":-0.2758135251706375,"61":-0.009782638161701603,"62":0.24252507822279143,"63":0.41252594933393544,"64":-1.0375004146369469,"65":0.719551418287616,"66":-0.7634830094447987,"67":0.039775386314022096,"68":0.5776989236363665,"69":-0.9214109788228897,"70":-0.20073359691761195,"71":-0.2125467329019828,"72":0.28975074351020574,"73":0.7259917538298947,"74":0.23021487441401323,"75":-0.24399521698110807,"76":0.1654290115476923,"77":-1.005913754850208,"78":0.98805677409483,"79":-0.40922256287412545,"80":1.1834433638859316,"81":0.11415526417752274,"82":0.941063569485599,"83":0.18256881269915662,"84":0.776956699500542,"85":0.10345395961769899,"86":0.6088136353447462,"87":0.5135470516680616,"88":1.7975621902609848,"89":0.6807316373455737,"90":-0.8677103098819979,"91":-0.8385653534106658,"92":0.5148541462539175,"93":0.5420346969854375,"94":-0.2988107447261188,"95":0.4652393003110928,"96":0.13697261357045695,"97":0.861446919904485,"98":0.22988279105378795,"99":-0.3246983628837163,"100":0.3744975037983674,"101":0.6571955659447574,"102":1.2546465585020994,"103":0.28612053285251127,"104":0.08578987504535632,"105":0.9536096254195008,"106":0.22226732567501845,"107":-0.4803179443883057,"108":0.029594965552409435,"109":0.6925537808153515,"110":-0.20570828355135362,"111":-0.4490623286207667,"112":-0.6356822681676331,"113":-2.0306278098898987,"114":-1.7521096018342621,"115":-2.9935514588515706,"116":-1.2209773638420127,"117":-1.5545708204608861,"118":-0.5167140453735505,"119":-0.019994947315571637,"120":0.10084934496048782,"121":1.0143704335640478,"122":1.7064043058812666,"123":2.465505776884285,"124":4.51513537971667,"125":4.419387233797204,"126":3.124719460615344,"127":0.13484929826160463,"128":0.17862436755227107,"129":0.6906768763293595,"130":0.3402491631485779,"131":-0.20679032250111332,"132":-1.5140826104664098,"133":-1.3051389944412841,"134":-0.9214031897703419,"135":0.03075970773909008,"136":0.5422802195185722,"137":0.1463953034659048,"138":0.3237858554921767,"139":-0.10918157801145946,"140":0.10588553326352956,"141":-0.04013250134065455,"142":0.39679113604820854,"143":0.21452765834856224,"144":-0.36171339956505033,"145":0.19025390453511506,"146":-0.2480675628783725,"147":-0.6859721379850707,"148":0.3294309485499618,"149":0.24792831906050627,"150":-0.03978112549477047,"151":0.27582778684122083,"152":-0.3184186117429332,"153":0.3751655258706167,"154":0.2659415079515819,"155":-0.3045238756218563,"156":-0.4180506905505891,"157":0.4857256770775436,"158":0.30510295366632517,"159":-0.23164451272961706,"160":-1.636602573104558,"161":-0.6424218616515438,"162":0.13315341964115934,"163":0.08118290931096434,"164":-0.8304865250317105,"165":-0.03422248729417015,"166":-0.199252254507399,"167":0.059205479940035305,"168":0.2751602446066993,"169":0.17555969773861482,"170":0.3165187181959767,"171":0.056804241656413214,"172":-0.11813106895072102,"173":0.3323700557426367,"174":-0.6394057151399404,"175":-0.6724151981875827,"176":0.18734805075015348,"177":0.22011981280557424,"178":0.022197308862555373,"179":0.2862774136893958,"180":0.045716641224488146,"181":0.08495507460421667,"182":0.16464621273913954,"183":0.17462725251677397,"184":-0.5309202856359295,"185":0.19338594882068055,"186":0.0346530661355832,"187":0.2844650578818412,"188":-0.03064076410714177,"189":0.31476237860657813,"190":0.4108195245090912,"191":0.24336338529899273,"192":-0.06961810136149692,"193":8.87458268808326,"194":0.3727923919484467,"195":0.23143634148433045,"196":0.019623334341451516,"197":0.2453723758319676,"198":-0.06979286800361875,"199":0.21668683239659517,"200":-0.6661362175367567,"201":-0.40285169393301984,"202":-0.22076285826093606,"203":-0.10130874642370571,"204":0.0520505731364536,"205":-0.025301031539122446,"206":0.03018028147487142,"207":0.03523885179171283,"208":0.0433638881170346,"209":-0.10801555168861023,"210":0.6225390048231073,"211":-0.06050462654859797,"212":0.018778739393387957,"213":0.38008065648873596,"214":-0.2940679543605536,"215":-0.22153643229046688,"216":-0.06123968388294727,"217":-0.18041883968364206,"218":-0.013954200366324077,"219":-0.05449500789069354,"220":-0.44479750310091337,"221":-0.05721469436316451,"222":0.28293842100875927,"223":0.17527579782845168,"224":-0.21179507836208464,"225":-0.1511550785009,"226":-0.21566231807860073,"227":0.3052704846744807,"228":-0.671753134714043,"229":-0.8582292582975195,"230":-0.033457950983588176,"231":0.18825163318091473,"232":0.2723318262856687,"233":0.14807274496627829,"234":0.06279091553781688,"235":0.18867235024446358,"236":0.036767702951059356,"237":-0.2437402405294435,"238":0.3891035382095819,"239":-0.2625161983724062,"240":0.17732278622389877,"241":-0.11497236137721348,"242":0.5817142555747484,"243":0.16997501312516008,"244":-0.11005876179729586,"245":-0.5487139344173608,"246":0.09841786143278547,"247":-0.42901685389435423,"248":0.2723614428600335,"249":0.04541343042287048,"250":-0.5996549351911018,"251":-0.4102911265085984,"252":0.6589651494242065,"253":-0.741162053638984,"254":-0.031881352099055994,"255":-0.7324508453480699,"256":0.06198788068087333,"257":-0.5658505235376555,"258":-0.14412138692979212,"259":0.5713364433428091,"260":-0.9384697206096267,"261":0.20649984961377302,"262":-0.5408594516659172,"263":-0.403018143866339,"264":-0.7744491646137613,"265":-0.9975236806597169,"266":0.19334275769455822,"267":0.12215940817034014,"268":-0.29585180552288126,"269":-0.013343317641419843,"270":0.36324328981561266,"271":0.6106216919540303,"272":-0.22260986407671896,"273":-0.059964243252816456,"274":-0.06979218531485862,"275":-0.19476256921996088,"276":0.5706967957910113,"277":1.3709251618309932,"278":2.0676331243308335,"279":1.9403002986909832,"280":0.5270952893551953,"281":0.4350021506790505,"282":-1.257645623273151,"283":0.021751417406441126,"284":-0.3224173734453441,"285":0.3200532893946639,"286":-1.9437480657196018,"287":-4.288980433798244,"288":-3.6715897219676297,"289":-2.900149567799223,"290":-1.1517270146361493,"291":0.6947731688889814,"292":1.46276212847124,"293":-0.03430736717339848,"294":-0.2478909881888479,"295":1.2142794939624575,"296":1.0985606287558423,"297":0.42762655570469255,"298":0.7527514464467198,"299":0.8672623065327238,"300":-0.41431659880322574,"301":-0.1055926849048754,"302":1.4005241991371973,"303":-0.32248974191322466,"304":-0.05494989476022469,"305":0.9617158332832125,"306":-0.13610973295132361,"307":-0.5356450606371191,"308":-0.8598705709738005,"309":0.8504194885113617,"310":-0.16434465377608237,"311":-0.2070920516151898,"312":-0.7306168730804447,"313":-0.26762862356391703,"314":-0.05305289277582229,"315":-0.04174165435726712,"316":-0.27876098670739696,"317":0.26834966082245304,"318":-0.07328239354116113,"319":-0.5879496358059575,"320":0.9644149171490229,"321":0.017083351164650415,"322":0.4236177479916154,"323":0.20489688248492657,"324":0.7729645514503265,"325":-0.39218773582788324,"326":-0.6922324905292307,"327":-0.2775523583803787,"328":2.1174552289271875,"329":1.5515997645228259,"330":1.4033588606953837,"331":0.34353692916094547,"332":-1.2247947572786724,"333":-0.1727951160105837,"334":0.3161903822422735,"335":-0.37106142452274443,"336":-0.3509618528292106,"337":-0.17349911775483332,"338":1.0939956977412364,"339":0.03560181955459954,"340":-0.9463466541671526,"341":0.8547214647711203,"342":-1.0299210868996302,"343":0.7216649947406643,"344":0.5142499991831737,"345":0.3754246467701615,"346":1.125043343604638,"347":-0.22868896059328567,"348":-0.22927787769206873,"349":-0.1600664723587479,"350":0.9108652762309696,"351":-0.8425364070677539,"352":-0.6904867746928268,"353":0.44149240003375345,"354":-0.3372636967281229,"355":-1.1227659972752193,"356":-0.0634688940732042,"357":0.4320854236484578,"358":-1.172293455023593,"359":-2.6258384114980298,"360":-3.0598074986335604,"361":-3.388132861672402,"362":-1.2602678501569997,"363":-0.9427986735872917,"364":-0.07051480370458611,"365":0.04844719493065872,"366":0.611395739177266,"367":-0.8998064182057776,"368":0.1283478872957362,"369":-1.6422047737343177,"370":-0.5273196593443187,"371":0.6112669737022944,"372":-0.26789365852607255,"373":0.4308164236339545,"374":-0.699285442912615,"375":0.6972106232215842,"376":0.871110104584251,"377":-0.46279852909276953,"378":-1.6895331722915394,"379":-0.33329154592170446,"380":-0.7807073110882912,"381":-0.44938194551906097,"382":-0.2984750233896472,"383":-0.37403450345881556,"384":0.22857748623997043,"385":-2.519734744708802,"386":0.3329347767930429,"387":-0.14511681337975454,"388":-0.1756336795644377,"389":-0.068856587437126,"390":-0.3082953880993158,"391":0.015232619513393941,"392":-0.07426698448865685,"393":-0.1805463744481627,"394":0.654613535707403,"395":1.1081502341213638,"396":0.6559056091971803,"397":-0.44987740549684,"398":-0.5018055645384663,"399":-0.5100144100517147,"400":0.6596666072628636,"401":1.0009756707933766,"402":0.3203396984742698,"403":-1.3395694182242581,"404":-0.08937127440139944,"405":-0.3829586339774084,"406":0.7953734893259842,"407":-1.2968091483504105,"408":-1.1360102282872906,"409":1.2170559557594907,"410":0.7924810689928795,"411":0.19203675396003286,"412":0.7546504360197848,"413":1.0395057061426467,"414":-1.260649887553137,"415":-0.6433684809602542,"416":-0.565786972822611,"417":-0.5221260790548331,"418":-1.1654592423621235,"419":-0.56346008218953,"420":0.021396723188278195,"421":-0.044394992694842726,"422":-0.016150537347010097,"423":-0.08794042664516907,"424":-0.46028850621434647,"425":-0.8438390891211842,"426":-0.2933023275651543,"427":-0.7731709741750477,"428":-1.013824205622747,"429":-0.8108178102740481,"430":-0.4693161659714616,"431":-0.8920932152607086,"432":0.03143296562570537,"433":-0.5432713807152875,"434":-0.7043110134765508,"435":-0.3572583850835957,"436":-0.6349121165360008,"437":0.107430850905473,"438":0.2429656279304395,"439":0.4936915524027249,"440":0.34250811396830955,"441":-0.3459293141364125,"442":-0.3222711490133525,"443":0.1055883879361365,"444":-0.4288679222606083,"445":-0.552227424332401,"446":-0.517041028359931,"447":-0.49775270806903227,"448":-0.746512607350851,"449":0.4543310413780344,"450":-1.0667317416247628,"451":-0.3081754678688717,"452":-0.21699519156424352,"453":-0.4512317040010335,"454":-0.7448059794248525,"455":-0.12661452253035557,"456":0.7947626198073126,"457":-1.2145215036437704,"458":0.5132719917184445,"459":0.5501533383132207,"460":-0.347341659603811,"461":-0.5399460001498249,"462":-1.2171141555240845,"463":-0.5943812812025939,"464":-0.3214064142007166,"465":-0.9230730155795315,"466":0.8412189321006464,"467":-0.6374289955528586,"468":-0.19783343841189474,"469":-0.03653890132072732,"470":-0.6693457893556074,"471":-0.657441404086385,"472":0.05786125849198284,"473":-0.08717131313757809,"474":-0.5872631618451754,"475":-1.1465510737315,"476":-0.16973220028328154,"477":-1.1638556493480448,"478":-0.9003067160031124,"479":0.20267982373892027,"480":-0.5827560881374138,"481":-0.11386543003347946,"482":0.30506240806616547,"483":-0.21602769074324704,"484":-0.5924530313541111,"485":-0.2912966624017117,"486":0.4605196938407582,"487":-0.08507791236414602,"488":0.25419656739991436,"489":-0.13477640855686185,"490":-0.43890940871977446,"491":0.6838972727109401,"492":0.17883713902849369,"493":0.21675786755609583,"494":0.19955677618834838,"495":2.086647982619904,"496":-0.18857332091692483,"497":0.9900666768763667,"498":0.7907645976534418,"499":0.6726006304935149,"500":0.8054519039320038,"501":0.25938957675913327,"502":-0.8756728225121334,"503":0.7453090448860483,"504":1.5250600500123745,"505":1.1653414506673456,"506":0.8705807062553957,"507":0.4362765018087243,"508":0.5021399919027886,"509":0.32075157162424933,"510":-0.1785601326726785,"511":0.622921494057777,"512":0.42277419722804144,"513":0.899101674790866,"514":0.8343968596764759,"515":0.40564087135491733,"516":1.062680090893046,"517":0.6511167847570631,"518":0.6555739553025658,"519":0.2561191847094426,"520":0.488698534222478,"521":0.8904659775976937,"522":1.2041095740483332,"523":1.7518933230976919,"524":1.4246712987459387,"525":0.36739184000886493,"526":0.7165476838328219,"527":0.4775512521785295,"528":-1.4766821069475269,"529":-0.2337313007393162,"530":0.49267149764465,"531":2.5495082546990346,"532":1.5782245503827335,"533":0.8298601055895107,"534":0.23446275818930956,"535":0.5064526580993427,"536":0.18422573344761034,"537":1.830417986123193,"538":1.1601744086612993,"539":-2.9145868830992825,"540":0.5504435739118032,"541":1.4400474515381039,"542":0.8265651249125245,"543":0.5602810846351158,"544":0.7426747608051032,"545":0.5620472094360595,"546":-0.5359184287871096,"547":0.5785548343475782,"548":0.7992246819057821,"549":1.0605793168739557,"550":1.6334522910350804,"551":1.0093180193663476,"552":-0.04393739783600335,"553":0.7109058004444155,"554":0.692785961524013,"555":-0.024438085765157446,"556":1.4004546765595571,"557":-0.8571457590677192,"558":1.8702244459802855,"559":0.635149727577933,"560":0.8550294357894043,"561":0.45964811247411724,"562":0.2976124937216481,"563":0.5790612744613772,"564":-0.7010448201623336,"565":0.6198679602243673,"566":0.27177373821581186,"567":1.4362421237538285,"568":0.17516028534671485,"569":0.354355425632025,"570":0.32274372869535956,"571":0.57562284464581,"572":0.3840798561609878,"573":-0.5040610987097663,"574":-0.14521277397428195,"575":0.1785921964010541,"576":-0.17335658971475448,"577":-0.22818423943550517,"578":-0.1243057325547986,"579":-0.06513949205603518,"580":-0.12438251939902323,"581":0.02920925102623613,"582":-0.3462979062097872,"583":0.08091566539633784,"584":0.039892949605572825,"585":0.03985124405342989,"586":0.05027847359434148,"587":0.12799763925261518,"588":-0.15878039794698925,"589":-0.19091828111253073,"590":-0.08767716239966371,"591":-0.15804916037804376,"592":0.05327165530368236,"593":-0.2766871985022596,"594":-0.13623136434155741,"595":-0.6052423131091781,"596":-0.2373438647756989,"597":-0.2740414074116454,"598":-0.17506905254401234,"599":0.08810042014686757,"600":-0.27986598649712985,"601":-0.2568970585552895,"602":0.1623514479208999,"603":-0.3043274686189607,"604":0.15280253253592002,"605":-0.282535561227022,"606":-0.14855675610577976,"607":-0.0015025829418787433,"608":0.08596711363223683,"609":-0.171612522204067,"610":-0.09639795593036737,"611":-0.22275594312771602,"612":-0.23502798036059583,"613":0.9391573192821471,"614":0.29009412585891087,"615":0.40055084693743764,"616":-0.3535390022934058,"617":-0.3812554377991642,"618":0.10436151209232042,"619":-0.01213495369697823,"620":-0.18986741762078174,"621":0.11458989125019678,"622":-0.11535024935011524,"623":0.19470402923479885,"624":0.2784962988742739,"625":-0.15454925514566953,"626":0.4243906653942544,"627":-0.053549988808026604,"628":-0.21156291383326062,"629":0.2369375351907522,"630":-0.20302560908347947,"631":0.02984380658427687,"632":-0.24167255337534752,"633":-0.08483206993086213,"634":-0.3519964525485,"635":0.008203321845172048,"636":-0.19940681263541554,"637":-0.28664868466522064,"638":-0.38579593689614167,"639":-0.017030373827123718,"640":-0.07250107104722411,"641":-0.23673501761697513,"642":-0.15424778087211624,"643":0.06941765490127341,"644":0.5951428796177293,"645":-0.11249465608671126,"646":-0.00266295689931654,"647":-0.247168142047765,"648":-0.2540616341617517,"649":-0.13423582682711696,"650":-0.14138003057102314,"651":0.043325686071099136,"652":-0.10933503920302329,"653":0.09303465640694138,"654":-0.10999719995837191,"655":-0.5733135942345666,"656":-0.5877912458732315,"657":0.09861970280967099,"658":0.17842121575050027,"659":0.0712728940437498,"660":0.005222838515733461,"661":0.6488807247491155,"662":-0.5057626217151217,"663":-0.46129239366701086,"664":-0.5461792650382628,"665":0.19651823074089464,"666":0.6253484157433199,"667":-0.47293049534247866,"668":0.7082862876632426,"669":0.08461493898689182,"670":0.8312636220968734,"671":-0.02768433913082059,"672":-0.40951531403212366,"673":0.7812666644221816,"674":0.853992872472338,"675":-0.5025484440943802,"676":-0.3114813602624627,"677":0.894847090828574,"678":-0.0048322754345801475,"679":0.2787464216423427,"680":0.36395056224487915,"681":-0.3760209804637583,"682":0.36629228991654533,"683":0.3303816286938517,"684":-0.870405722209422,"685":1.1641187698590116,"686":0.18166579689478682,"687":0.7955839807523081,"688":0.4867357263639718,"689":-0.3536443514951234,"690":-0.833158451503422,"691":0.2468550688511346,"692":0.6674098177752198,"693":-0.2685094267779017,"694":0.6710168824108482,"695":0.8011786737749804,"696":0.9762981023586252,"697":-0.7433079450071468,"698":-1.8517551212312393,"699":-0.3647507682190121,"700":-0.19022120786438038,"701":0.4408645897057705,"702":-0.6990179295250695,"703":-0.5962230758620896,"704":0.9801175389475066,"705":2.494951697920248,"706":2.6982108074632585,"707":3.0934910741051422,"708":2.2190268425415267,"709":0.6925144131607379,"710":0.2229697287907185,"711":0.25938692052554874,"712":-0.9913016981816535,"713":-2.353364555692593,"714":-1.5099501743919108,"715":-2.138542009574366,"716":-0.7436707530309672,"717":-0.8385914754828543,"718":-0.0030500865380892377,"719":0.6035614625530432,"720":0.1278027416143239,"721":-0.41914635627273716,"722":0.27509902891091764,"723":0.4284574677283624,"724":-0.1319456487165811,"725":0.5128218553503401,"726":0.310621703728788,"727":-0.34964469279390475,"728":0.4147737327455426,"729":0.07873160259479754,"730":-0.02705815243010543,"731":1.207240674359642,"732":0.3789247782868036,"733":1.8780523349639107,"734":-0.2974088209586883,"735":0.018165294882749858,"736":0.6605232741220297,"737":0.7258132038181973,"738":-0.34292631220980035,"739":-0.16833119194634444,"740":-0.08107314853923744,"741":-0.20036015068102958,"742":-0.36505992928789044,"743":-0.03100326711931542,"744":0.11603687397992493,"745":-0.10343398918438781,"746":-0.03405268057795358,"747":0.16554068521838805,"748":-0.20956640920055392,"749":-0.21405802822816297,"750":-0.10029280436428296,"751":0.35494397445225256,"752":-0.3102394407710855,"753":0.015734038669975955,"754":0.12596637312514414,"755":-0.22942829371309856,"756":-0.045098650540796134,"757":-0.34457962546236126,"758":0.2452297120765064,"759":-0.3759645463377294,"760":-0.005294295510289782,"761":-0.47200894700086643,"762":-0.19488718258190285,"763":-0.19082817386462517,"764":-0.1420056248004246,"765":-0.22856450236396555,"766":-0.05458406394114447,"767":-0.05028972367964932,"768":-0.11559467496075942,"769":-0.32074932240191883,"770":-0.023491896296180984,"771":0.04534549251115635,"772":-0.0311480986329757,"773":0.17081740180184954,"774":-0.17413959182909355,"775":-0.47489419527066523,"776":-0.052368064437527985,"777":0.492304866991532,"778":0.3756097086531498,"779":-0.1272604620043712,"780":-0.3531839149893568,"781":-0.13081380329643638,"782":-0.02921123939609346,"783":-0.30336442014554765,"784":0.03617642120036633,"785":-0.41658187768178107,"786":0.07118497018921842,"787":0.02031961845327129,"788":0.28251930635481026,"789":-0.3556359632724684,"790":0.03360327485912296,"791":0.08603284897025074,"792":-0.03785181473283654,"793":-0.09703485912547555,"794":-0.025569716324984573,"795":0.06589448879262592,"796":-0.22560334574750143,"797":-0.026391201263916024,"798":-0.4240177004005453,"799":0.5207689235470525,"800":-0.10203306653889717,"801":-0.08200021306513891,"802":-0.04957895208953501,"803":-0.0897440872701983,"804":0.006738047723458197,"805":0.35753162974000313,"806":0.378525566433661,"807":0.054879048963571514,"808":0.4068401762295168,"809":0.07119172369588818,"810":0.08282390928642616,"811":0.06015527594652986,"812":-0.3541540529778297,"813":-0.035121719660479465,"814":-0.3631456351361911,"815":0.13602357849514554,"816":0.0380607384520688,"817":-0.03555578239111437,"818":0.16077076797638942,"819":-0.6019304363684985,"820":-0.5435772416201229,"821":0.04438541838752061,"822":-0.39821169484298213,"823":-0.8800215775615654,"824":-0.7833255203241133,"825":1.0040732893566011,"826":0.5868306718417791,"827":0.953106900268393,"828":1.3794153338621737,"829":0.8894714426167619,"830":0.07213666963031591,"831":0.33957109537895463,"832":-0.6913374964103463,"833":-1.3172584490554997,"834":0.09896643118605473,"835":0.38940000204949826,"836":1.8746213532108866,"837":1.0925535508133908,"838":0.19146271677965232,"839":0.08315803188499808,"840":0.1795530437668582,"841":0.6389937981117547,"842":0.08979079613820183,"843":-0.11059154181888249,"844":0.7767714232648476,"845":0.2816314029922648,"846":1.108952312965856,"847":0.07539579673965886,"848":-0.8272174019870235,"849":-0.07233411728053181,"850":-1.3019549885267918,"851":-0.9987356592442155,"852":-0.7425845705586288,"853":-0.9958918717668825,"854":1.5436797758857836,"855":0.9116435708185419,"856":0.5533375175829167,"857":0.1917350696564875,"858":-0.9399457950889127,"859":0.08863413557192831,"860":0.9430925154458573,"861":2.3242913005622556,"862":1.8078949301681324,"863":1.073744640989628,"864":1.0577182758010057,"865":-0.3456092360142672,"866":-0.7703882386015145,"867":-0.4723791959862593,"868":0.027757477901621863,"869":0.7099164124133327,"870":0.5572793625419559,"871":2.1519081831326603,"872":1.3606340460924382,"873":0.37961146370133175,"874":0.9371837672010696,"875":0.4837148710551178,"876":0.5443276962436747,"877":-0.4253800079630373,"878":-0.29143671173626223,"879":-0.1444315163895565,"880":0.04809214836105388,"881":1.892882301387721,"882":1.0394272511790228,"883":-0.18696195802754684,"884":-0.7537250615230497,"885":-1.9766780815916136,"886":0.17065489087584348,"887":-1.1990586222123678,"888":-1.181885714418579,"889":0.3588653556850983,"890":0.9671502081378286,"891":0.13305096351603385,"892":-0.09484735633260083,"893":-1.1054446258618384,"894":0.3956702106133997,"895":-0.32212482750068533,"896":-0.6002861268107083,"897":-0.26189429309322937,"898":1.292532681355491,"899":0.21417821200421644,"900":0.5210872999314418,"901":-1.187546248269183,"902":-0.8226664186564456,"903":0.20221136470420142,"904":0.9769367888834796,"905":-0.16606299820878706,"906":0.4069995036205761,"907":-0.538426341275332,"908":0.2525048144914495,"909":0.7419446352021165,"910":-0.11593058282290067,"911":0.6688780970124446,"912":1.06067342202321,"913":0.25774787158221063,"914":0.1859468145234792,"915":-0.48417761963526273,"916":0.5744259222072942,"917":0.493397083934396,"918":-0.21588653388072176,"919":-0.9351294994489862,"920":-1.0067915473200335,"921":0.12064319011291637,"922":-0.4234495257903527,"923":-0.43031954670444383,"924":-0.5799536147607449,"925":-1.4811233246885993,"926":0.6482475726484695,"927":-0.04635265499115035,"928":-0.9157297217357937,"929":0.6752487289153449,"930":-0.5398060990751413,"931":-1.1658416248512604,"932":-2.7901141079961542,"933":-1.8875367767722222,"934":-0.1935247987065113,"935":0.1553716798440743,"936":-0.041810273212351284,"937":0.08457251004989072,"938":-0.5066159341068041,"939":-0.2939599516415447,"940":-0.2048274112718745,"941":0.5959263415501567,"942":4.592213221448809,"943":0.03815586250043828,"944":1.9304299091133619,"945":0.5589613794131952,"946":0.42828302029075155,"947":0.5861025507492605,"948":0.7831420025836178,"949":-0.6046472584224234,"950":1.7132207628105238,"951":0.8788021283259108,"952":2.411495602002629,"953":0.2532270837459761,"954":0.5669307556502526,"955":0.5795880112468671,"956":0.2694162252424725,"957":0.18619107254482098,"958":0.1464259481766052,"959":0.34686865011592494,"960":0.6764900993359582,"961":-0.4654240681790346,"962":0.05776780906234656,"963":1.795837164930398,"964":0.4672060942436697,"965":-0.4268514153852572,"966":-0.5629162757731663,"967":-0.9984052077730456,"968":-0.5174214354630758,"969":0.102343285763187,"970":-0.000574021068055803,"971":0.7223913294139647,"972":-0.19290247924764065,"973":-0.31631103313300557,"974":-0.7276336834004081,"975":-0.26803808934930645,"976":0.40431187251601874,"977":-0.8176866956155314,"978":-0.08002593730240329,"979":0.5550324522178752,"980":0.5572454399212973,"981":-0.5458515836736805,"982":-0.381180471864151,"983":0.10478742027336484,"984":-2.2318362588692744,"985":-0.9223101192789702,"986":-0.5171951130805091,"987":1.8436926435849816,"988":-0.034891229988626433,"989":-1.642974175905789,"990":0.8957925291273927,"991":-0.14344211385219185,"992":-0.05208438271839678,"993":2.135276012559775,"994":-0.29516602279966586,"995":-0.3637911792314418,"996":-0.5621630600573796,"997":-1.0704779742389328,"998":0.2639928963079189,"999":-0.8147813406840345,"1000":-0.07362978109794227,"1001":-1.621173189883072,"1002":-0.31441272014251687,"1003":-0.4324216793774162,"1004":1.3787224814156198,"1005":-0.6484915977547002,"1006":0.9081777120760184,"1007":-1.6511532673718388,"1008":0.8810033653429901,"1009":0.1817854166864516,"1010":-0.6711847286103395,"1011":-0.7257633903884266,"1012":1.1064173750977275,"1013":1.4286600730597894,"1014":3.1063053348762,"1015":-1.0336281026056895,"1016":0.7986866877863501,"1017":-0.39717414365112697,"1018":1.1718874783237507,"1019":0.30803862894159684,"1020":-0.5739730943491457,"1021":2.5019750475253577,"1022":0.5376328510463698,"1023":-0.10322347012658321,"1024":3.15532951252987,"1025":-1.00601102503564,"1026":0.6488747500019777,"1027":0.09354832775325546,"1028":0.4369198721712383,"1029":-0.4482840917653215,"1030":0.30130821238150296,"1031":0.163265769336523,"1032":0.9040315864758348,"1033":1.267611676972517,"1034":-0.18865508334561093,"1035":0.202418231315216,"1036":-0.5529932294333294,"1037":-1.5698325319903004,"1038":-0.6909410581170099,"1039":-0.7503563366971598,"1040":0.2974232839438738,"1041":-0.09729444183729048,"1042":-0.21215388995601844,"1043":-0.7349361086386772,"1044":-0.0604870870358154,"1045":0.35048195648049923,"1046":0.09217676258516279,"1047":-0.3382907710796209,"1048":0.004036708264064632,"1049":0.19765038068388618,"1050":0.5859697382848298,"1051":1.1430764684029326,"1052":-0.6991622629949322,"1053":-0.11148554535765866,"1054":-0.7463226155237627,"1055":-0.5920285544502004,"1056":-0.8868100387895992,"1057":0.3694464177325877,"1058":0.10170901205182555,"1059":-1.2111678095006742,"1060":-0.5806552532873949,"1061":-0.3226348844280611,"1062":-0.3523486819175534,"1063":0.9641625288096335,"1064":-0.5786485508197414,"1065":-0.2444300666563291,"1066":0.6245516979845488,"1067":0.37888982964841955,"1068":0.5709834921350261,"1069":0.18894207151940276,"1070":-0.2774216247574282,"1071":-0.12100645353732133,"1072":-0.8748699412358665,"1073":-0.2442626346880061,"1074":-0.2899354568700514,"1075":-0.9776471310790358,"1076":0.3207067901404898,"1077":0.747363485150024,"1078":1.0572753852401022,"1079":0.1726673398246043,"1080":-0.13124524231878956,"1081":-1.261080674638574,"1082":0.4221843884589625,"1083":-0.8847710012123168,"1084":-1.5520824239838906,"1085":-0.16384532750453812,"1086":-0.1398478727862823,"1087":0.3467364411131456,"1088":-0.9001148731869868,"1089":-0.41986220293516635,"1090":1.1529218316388405,"1091":0.404799676187909,"1092":-0.8122976927069006,"1093":0.13920444252350536,"1094":-0.0778627785636715,"1095":-0.1733343700404659,"1096":-0.014540187688885434,"1097":2.110040205871756,"1098":-0.5079870042895953,"1099":0.4131923764161143,"1100":-0.6791475147293285,"1101":0.8718040460163071,"1102":0.3858898780775855,"1103":0.5298652430115763,"1104":0.44487645505282924,"1105":0.8353417044440862,"1106":2.35624016796024,"1107":2.867420895448531,"1108":-0.818102027303458,"1109":1.881661192198032,"1110":-1.0548716301332226,"1111":-0.4865353628655363,"1112":0.6653016977213382,"1113":0.23773037920614093,"1114":1.0956289125527525,"1115":1.1109200271301893,"1116":0.9937104485061535,"1117":-0.5493989798135991,"1118":0.373066998447186,"1119":0.9527600639881311,"1120":-0.6486270927204675,"1121":0.41811961027790284,"1122":-0.6937108529479231,"1123":-1.1188870432269566,"1124":-0.42152823944627976,"1125":1.0173676956221005,"1126":-0.6545174617195507,"1127":0.09890835746910315,"1128":0.19414563730979845,"1129":-0.3431296120065223,"1130":-0.8621571713670897,"1131":0.5469436654669348,"1132":-0.6314757780063794,"1133":-0.33759260141235764,"1134":-0.10236551235689446,"1135":-0.9223773103792892,"1136":-1.656470055213191,"1137":-0.265349711900678,"1138":0.28736221137313095,"1139":-0.4338657879108588,"1140":-0.1776005466351153,"1141":0.25223929138966605,"1142":-1.6811979099605703,"1143":1.1083414481841214,"1144":-0.1218326191544322,"1145":0.23097604231074367,"1146":1.0125994862771934,"1147":0.7145319872796075,"1148":0.8055888955563024,"1149":-0.5438202467022437,"1150":-0.41979911050004853,"1151":-0.41972456701525973,"1152":-0.15989891562761188,"1153":0.19350672391456278,"1154":-1.6566604374080836,"1155":-1.1746095249559807,"1156":-0.3898397945895095,"1157":-0.13542720212546264,"1158":0.5395032479924722,"1159":-0.92194204124327,"1160":-0.6908812980174738,"1161":-0.16231259610274099,"1162":-1.3046230241803507,"1163":-1.099017750260487,"1164":-1.0010796291760586,"1165":-1.4787577295693481,"1166":0.41553030853122574,"1167":0.12039464170935515,"1168":0.5766217008675067,"1169":2.1927250399143405,"1170":0.6398975866670887,"1171":-1.4761563711871875,"1172":-0.5736199848066295,"1173":0.20859343308148737,"1174":-0.9077454893659461,"1175":-1.1021796627092588,"1176":0.09176924368142918,"1177":0.5487900727165579,"1178":0.9417275804279512,"1179":0.5855249386461181,"1180":0.840282904591789,"1181":0.4195028295225835,"1182":-0.17870278860269528,"1183":-0.8556467920763644,"1184":-0.25336913401415356,"1185":-0.04133583282846326,"1186":-0.26631365879959257,"1187":0.9867376180170253,"1188":1.697093717884854,"1189":0.02042937460043061,"1190":0.1390217960691593,"1191":-0.43168697031338704,"1192":-0.7230979295672908,"1193":0.4906971360206122,"1194":-0.4363149585658472,"1195":-0.21009190634126754,"1196":0.7885588285622614,"1197":1.3325715001921201,"1198":0.5818353005697675,"1199":-0.4312711968371631,"1200":-0.6644506967053226,"1201":-1.370790080182428,"1202":0.36146709963421647,"1203":-0.6309508513045539,"1204":-0.4381273650640083,"1205":2.3353348772861784,"1206":1.025881793808566,"1207":-0.8137154272276845,"1208":-1.300968334606343,"1209":-0.17185151254239495,"1210":-0.5376727805325867,"1211":-0.41872405846074257,"1212":0.6132684814442596,"1213":-0.9591834941752357,"1214":-0.4135682733781511,"1215":0.35747572812542866,"1216":1.2727860715450525,"1217":-0.6608578356017208,"1218":-0.7646492424670328,"1219":-0.7398421295328558,"1220":0.5579841579853105,"1221":0.575700714865678,"1222":-1.6508902882650707,"1223":-0.4968730952888373,"1224":0.925139373329146,"1225":-0.3133681661813857,"1226":-1.0163583308630788,"1227":-0.7491417894402084,"1228":1.1426155447732516,"1229":0.20168528847550132,"1230":-0.5264335533151435,"1231":0.07228111234124249,"1232":-0.3068677851809905,"1233":-0.0907817490389802,"1234":-0.24994206068490515,"1235":0.21687352609286478,"1236":0.2284426789260027,"1237":-0.5360049489914243,"1238":-0.18036302645075933,"1239":0.7923404810783676,"1240":0.3430485112784648,"1241":0.14264772839888856,"1242":-0.42181274987800715,"1243":-0.08450180619188251,"1244":-0.04595135200881629,"1245":0.13804757186373276,"1246":0.08121747413770027,"1247":0.14121712053037028,"1248":-0.026699628306407614,"1249":-0.32736691737017903,"1250":-0.029378534221619644,"1251":0.24466006244503624,"1252":-0.4648712925729538,"1253":0.4693449736675423,"1254":0.16779636511144155,"1255":-0.5818964817291781,"1256":-0.4645779124000323,"1257":0.03731512610080288,"1258":-0.22288278383458895,"1259":-0.24458369943130007,"1260":0.40648828327431685,"1261":1.2434739009813887,"1262":1.0825518222603652,"1263":1.3164075320696678,"1264":0.6590092355358823,"1265":0.6454664319946654,"1266":0.7743132762906781,"1267":-0.7310733513811214,"1268":-0.028904485002078078,"1269":0.8119522151152354,"1270":4.2662527109033705,"1271":2.407522074427727,"1272":1.396798482654221,"1273":0.5150813898779776,"1274":0.38668290373922326,"1275":-0.16990781773221147,"1276":0.24338229478087137,"1277":-0.5274577379331209,"1278":-6.421488808918295,"1279":-5.27092044122916,"1280":-4.284898664338531,"1281":-2.3731732097769593,"1282":-1.1175244758311962,"1283":-0.77976106219186,"1284":-0.3348278157616456,"1285":-0.15891834429121401,"1286":-0.11665819581009498,"1287":0.27870954270383147,"1288":-0.4449454886289545,"1289":-0.3306649978896036,"1290":-0.5179358457488283,"1291":-0.4238068465633925,"1292":-0.2730106071577163,"1293":-0.048764337034905,"1294":-0.29883255466639913,"1295":0.16323548278308897,"1296":0.3413451834669629,"1297":0.07901493421013879,"1298":-0.6742944186997867,"1299":-0.16087676839453596,"1300":0.6380915648200252,"1301":0.4669703421640344,"1302":-0.10398960569080606,"1303":-0.0022658650508771516,"1304":-0.7072428685407111,"1305":-0.7618974905586345,"1306":0.15275150561186254,"1307":-0.10925230718851488,"1308":-0.4998434000836604,"1309":-0.24985014512099518,"1310":-0.2851694929456744,"1311":-0.10972357149930326,"1312":-0.004782757346310915,"1313":0.22033429104145333,"1314":1.0994089266040494,"1315":1.32780186300461,"1316":-0.28246311427401194,"1317":0.08142836976350065,"1318":0.16848028502187962,"1319":-0.38338467734704423,"1320":-0.09658201484608576,"1321":0.2755670436938207,"1322":0.3631061994614883,"1323":-0.42197506423901837,"1324":0.3621315947348965,"1325":0.6726191692896016,"1326":0.43699424843030493,"1327":-0.40273819480985884,"1328":0.13558658520078318,"1329":0.5138892807327315,"1330":1.3076603871941903,"1331":0.5987317753148099,"1332":0.778759347920532,"1333":0.371794745370309,"1334":-0.00571404578551615,"1335":-0.6415902650113483,"1336":1.9626017928164843,"1337":-0.011280569216071384,"1338":0.9730741436237954,"1339":1.383920777492072,"1340":1.3129108391761162,"1341":-0.6018016594106518,"1342":-0.22570565721349165,"1343":0.4880679979785994,"1344":0.06703015256411697,"1345":1.2378697787054889,"1346":1.3738707219741788,"1347":0.6717005059847848,"1348":0.9320758310817701,"1349":-0.405076886421563,"1350":0.8307686777322932,"1351":-0.9252825799400439,"1352":0.2964356123896802,"1353":-1.1379002525477415,"1354":-0.6052763217337661,"1355":0.03575262545898667,"1356":0.0529585608975678,"1357":0.4730570123014386,"1358":-0.11284008776001865,"1359":-0.8203640805319056,"1360":0.7253601859239597,"1361":-1.1386972445702035,"1362":1.0354803081722854,"1363":0.07089798879858654,"1364":0.7353346612874025,"1365":0.17307753870681766,"1366":-0.9931727683997851,"1367":0.22073119546096087,"1368":0.3224564916616674,"1369":-0.001911394958796462,"1370":0.617020361536509,"1371":0.10340250532082902,"1372":0.36651872328212176,"1373":0.7730591335887544,"1374":-0.09504036601077424,"1375":-0.7582328812593345,"1376":1.018874381565247,"1377":-0.8932839243204557,"1378":-0.5507900669705682,"1379":-0.05299492932429884,"1380":0.02510621742108331,"1381":1.4922887304443646,"1382":-0.09719710543354879,"1383":0.8546726033168082,"1384":-1.1863664611408737,"1385":2.216659461900623,"1386":0.033452745824227345,"1387":0.042815538533812,"1388":1.3826570407780365,"1389":1.4174852160907998,"1390":0.0674647420288256,"1391":1.542749659794024,"1392":0.985099629455358,"1393":0.40183459084593487,"1394":0.5683954001176392,"1395":0.3829106735453164,"1396":0.3553533050035282,"1397":-0.8442082431348711,"1398":0.38377805617058386,"1399":-0.0716674683801187,"1400":0.18947708511274633,"1401":-1.0263761722454228,"1402":0.27427397808188314,"1403":0.22244007147121037,"1404":0.09606141177513564,"1405":-0.7707817134988373,"1406":0.4476592314227923,"1407":-0.24274366889489163,"1408":0.2695668846440424,"1409":0.18312739464552735,"1410":-0.11198156052725379,"1411":-0.035465073775694717,"1412":-0.011764944516831523,"1413":0.8095967867376505,"1414":0.057957247510700735,"1415":0.27312703856579923,"1416":-0.3342859826824786,"1417":-0.09685570052650627,"1418":0.10231996510079476,"1419":0.17877653260665563,"1420":0.3225548498549975,"1421":0.7186459062286511,"1422":-0.2421455771226668,"1423":0.21641414071594725,"1424":2.769004037566774,"1425":-0.1928052157840348,"1426":-0.6064769273538515,"1427":-0.803965240869657,"1428":-0.9130610572012092,"1429":-0.08467203973532719,"1430":0.7424869615317564,"1431":-1.372390680531067,"1432":0.21234891331140343,"1433":9.000247661235083,"1434":2.32269165656463,"1435":1.2937309782401825,"1436":0.017089341562307427,"1437":0.2636820614615259,"1438":-0.18332543978799315,"1439":0.5881812045828363,"1440":-0.009764302253766415,"1441":-0.3175854763503271,"1442":0.2130325535771482,"1443":1.5440101859951174,"1444":-0.34229589381760644,"1445":0.26426413489428846,"1446":-0.48463804269024663,"1447":-0.6743003873800054,"1448":0.22353817611462326,"1449":-0.08824279785955205,"1450":-0.23977031529474566,"1451":-0.44786270317987925,"1452":0.6728581624166572,"1453":0.11293640122032884,"1454":-0.037046029272136315,"1455":-0.18499769190920817,"1456":-0.21802979213326767,"1457":0.6146256159100096,"1458":-0.21046220273000402,"1459":-1.209000306669464,"1460":-0.4373972537222893,"1461":0.7414898524062531,"1462":0.6727829833357742,"1463":-0.32035464574228906,"1464":0.30612845778128156,"1465":-0.4576162334985837,"1466":-0.2955995372604935,"1467":0.028274586494692677,"1468":-0.2658187418044096,"1469":0.22378780958719324,"1470":-0.4854561518262062,"1471":0.6789980931664246,"1472":0.04694500039102772,"1473":-0.12502533455144574,"1474":0.16979292644525934,"1475":-0.6615824674850321,"1476":-0.43805320682887355,"1477":0.15742642647289407,"1478":0.19728753088286102,"1479":-0.46574915795568556,"1480":-0.0573401984100558,"1481":-0.12506674360796888,"1482":0.3016589492941894,"1483":0.01583335480877659,"1484":-0.051185521778044855,"1485":-0.4034830872347351,"1486":-0.12742663388087577,"1487":-0.304197242859949,"1488":-0.23801962873368412,"1489":0.23560951038313777,"1490":-0.23683757093802543,"1491":0.15141973291819896,"1492":-0.1454193020543929,"1493":-0.16022995967935436,"1494":-0.3381748072256746,"1495":-0.12503208793831835,"1496":-0.33706174472622347,"1497":-0.1814941590311108,"1498":-0.2833929824776074,"1499":-0.09856563215769389,"1500":-0.38929349161284166,"1501":-0.0008379494716937662,"1502":-0.34169062291069413,"1503":-0.026218149359123914,"1504":-0.4039801480595711,"1505":-0.3514745842786656,"1506":0.35939012292126116,"1507":0.03374475245200635,"1508":0.042829996041835926,"1509":-0.54265231542156,"1510":-0.2479546756493301,"1511":0.17231954739923136,"1512":-0.2776642380355034,"1513":-0.6227234268994223,"1514":-0.29631840157581835,"1515":1.0617165595659601,"1516":0.3841441964051318,"1517":-0.28573783994661184,"1518":0.22359515234197422,"1519":-0.1445644803972272,"1520":0.18882375323076955,"1521":-0.021762124919489964,"1522":-0.3451739679011578,"1523":-0.24399476733633169,"1524":0.25173679395613346,"1525":0.541932487243926,"1526":0.6032971830847006,"1527":-0.19858096640934672,"1528":0.30150607790739664,"1529":-0.11608618639800189,"1530":0.11243956915337999,"1531":-0.04977784982304037,"1532":0.2797854970582473,"1533":-0.08481390399664776,"1534":0.6784425604381014,"1535":-0.21032213809593642,"1536":-0.345491642848347,"1537":-0.4923520586939692,"1538":-0.26826773900112166,"1539":-0.5447865254634335,"1540":-0.1480425057720677,"1541":0.19881930545172385,"1542":-0.011281056970427094,"1543":0.05731848555336515,"1544":-0.031838456530782655,"1545":-0.20738225521509476,"1546":0.1452512190556269,"1547":-0.35706104589366183,"1548":0.15617055021124318,"1549":-0.007971043523724219,"1550":-0.45584050215629685,"1551":-0.06199556201848363,"1552":-0.06309690120671144,"1553":-0.4125626957376505,"1554":-0.3283892332982933,"1555":-0.1269502241238659,"1556":-0.015674801562514117,"1557":-0.548020121282627,"1558":-1.00918872854001,"1559":-0.05604916374724534,"1560":0.2506178833350112,"1561":0.43068439170374373,"1562":0.905790604387091,"1563":-0.22323573902052612,"1564":-0.19550295375146454,"1565":-0.3126778022464998,"1566":0.5801053039428534,"1567":0.198857695955226,"1568":0.6690489234860262,"1569":-0.6044997773999023,"1570":-0.3975944639264961,"1571":-0.6880849680987677,"1572":0.9136054039672484,"1573":-1.0206619801686303,"1574":0.3406133945111537,"1575":-1.1898327622496065,"1576":-1.3696696777862065,"1577":-0.8819754690376465,"1578":0.24147284307460054,"1579":0.7348724686946121,"1580":0.010466542295584002,"1581":-1.1575602359212662,"1582":-0.19682441929948769,"1583":0.7892471669840644,"1584":-1.3725932269067254,"1585":-0.5330454063195135,"1586":0.05907126554775303,"1587":-0.8415332879273004,"1588":0.7257417624852714,"1589":0.6439568787168923,"1590":0.9305244193287675,"1591":0.3526545747907955,"1592":-0.5337851424978695,"1593":-1.0968982400712042,"1594":-1.22826163184094,"1595":1.6533809685190834,"1596":1.3531576384617254,"1597":-1.5372769472291348,"1598":-2.0087074509295095,"1599":0.004093848930105808,"1600":0.9688148609033367,"1601":1.506228518084339,"1602":2.7001906186308955,"1603":0.7322820576291903,"1604":-0.5045129388288955,"1605":0.8485734423204997,"1606":0.2638711904828812,"1607":0.010813496687013296,"1608":-0.4410650316041162,"1609":-2.4601959016467636,"1610":-0.39986356642466064,"1611":-1.6512590702565662,"1612":0.5090724076674034,"1613":-0.4256891689839965,"1614":-0.5935654836880945,"1615":0.6620824748148214,"1616":-0.1901629353430809,"1617":-0.4764169468321071,"1618":0.25866546283619324,"1619":0.7160504711056168,"1620":-0.11313192142635517,"1621":-0.49223087045713765,"1622":0.44242172116928835,"1623":-0.34949846408000534,"1624":-0.03528564124525747,"1625":1.5557893584654325,"1626":-0.34234304119093184,"1627":0.32228362642193426,"1628":0.6269614535505542,"1629":-0.24997729742407487,"1630":-0.5462359574885672,"1631":-0.6773956977194714,"1632":-0.60241205293432,"1633":-0.631292377980927,"1634":0.5563166069925444,"1635":1.0438785662625154,"1636":-1.0536481043320656,"1637":-0.12398299199641948,"1638":-0.45045153353267137,"1639":-1.0194775115307424,"1640":-0.42808498340861706,"1641":-0.48853324293785166,"1642":-0.5495560524342269,"1643":1.0701356258624386,"1644":0.101355027801348,"1645":0.4435363431320922,"1646":0.5771746201887611,"1647":-0.4117898227712717,"1648":0.3442172703146361,"1649":0.20373193577575638,"1650":1.1918437195419316,"1651":0.8205035410240259,"1652":-1.433591116608189,"1653":0.7099358754321987,"1654":1.0903391973071375,"1655":1.039502966068683,"1656":-0.21836167740746998,"1657":-0.22641852013323457,"1658":0.677676257200633,"1659":-0.5388952662769646,"1660":0.02948380228500275,"1661":0.39128590065271734,"1662":1.1324891661101988,"1663":0.11234799056603574,"1664":-1.0349982793716166,"1665":0.3190925147920145,"1666":-0.18506553168108483,"1667":-0.16779904006395943,"1668":1.342423445727639,"1669":-0.019230024412015274,"1670":-0.6406671310756623,"1671":-0.6771925860375636,"1672":1.1668305521702844,"1673":-0.4333414131320012,"1674":1.7699497270888864,"1675":0.013231610663684158,"1676":0.38153324539992417,"1677":-1.3339004004416841,"1678":-1.62845309485853,"1679":-3.9626295686224102,"1680":-0.059335057231958824,"1681":0.39503133427800385,"1682":0.7956970218923196,"1683":1.2693828346258258,"1684":-0.501332445393932,"1685":-0.2514954457691049,"1686":-0.21646788270735043,"1687":1.5049460478484975,"1688":0.7202467267429392,"1689":2.8309728201882285,"1690":0.5155709539294678,"1691":1.041733948016162,"1692":-0.19663878841093468,"1693":0.7493854989718721,"1694":1.0521863661718955,"1695":-0.7140234833190986,"1696":-0.037903441783369705,"1697":-0.06596794397918808,"1698":0.3609318224793399,"1699":1.0195227512691887,"1700":-0.9371167376422986,"1701":0.3496460248788276,"1702":0.7772798789250925,"1703":0.014234493980084466,"1704":-0.5991658484466321,"1705":0.3143974529471125,"1706":1.2255887312847273,"1707":0.9960364672911597,"1708":0.6266794837011396,"1709":0.17158499491999235,"1710":0.1543219525843124,"1711":1.7102690331097483,"1712":0.500483303032125,"1713":1.7414232781135637,"1714":1.1563740567759762,"1715":-0.719625884301445,"1716":-0.2626930255603643,"1717":-0.2844659694648007,"1718":0.8318229338226882,"1719":-0.17814649909769187,"1720":-0.05374372596789091,"1721":-1.1374961879127623,"1722":-0.5546132977746642,"1723":-0.49343417521055527,"1724":-0.8982914673644904,"1725":0.6073552892385733,"1726":-0.7827713230954862,"1727":-0.26530024595392954,"1728":-0.38334903709145246,"1729":0.07575751980627028,"1730":-0.2241341950878507,"1731":-0.06252985296422243,"1732":-0.465728271578169,"1733":0.5108628344072381,"1734":-0.07842153750613862,"1735":-0.4492320018627695,"1736":0.19034721581481245,"1737":-0.3374562401500172,"1738":0.0619890080127239,"1739":1.0928324342703828,"1740":-0.3751261618316992,"1741":-0.5195739275574449,"1742":-0.8864523288425651,"1743":-0.8324466655097597,"1744":-0.7684771246042853,"1745":0.26486591831906586,"1746":0.07829248234083286,"1747":0.45680361999707314,"1748":-0.5723831933332402,"1749":-0.392074992984279,"1750":0.6088775737197021,"1751":0.12010136387867956,"1752":-1.0634874702215225,"1753":-0.12883463969627704,"1754":-0.9071733217275085,"1755":0.07471992798654072,"1756":-0.16663602315313739,"1757":-0.014793352369584256,"1758":0.0797337409120351,"1759":-0.4029939361103364,"1760":-0.878496288553219,"1761":-0.007619238495251613,"1762":0.5061470593236083,"1763":-0.06720615995304566,"1764":0.9132040826258434,"1765":0.7660608030584503,"1766":-0.6797542772796891,"1767":-0.6727108413847617,"1768":0.09985972095861377,"1769":-2.9962237157615967,"1770":-4.585833468999965,"1771":1.2448818416255836,"1772":0.0897343117606407,"1773":0.42836569694692483,"1774":-0.09676191963661807,"1775":0.556437751284976,"1776":0.6131600960330281,"1777":-1.0552078872938462,"1778":-2.674212176110562,"1779":-0.0014612218382359517,"1780":0.1711871075904054,"1781":0.6938577316601577,"1782":-1.0614338667000238,"1783":0.9962427166405959,"1784":0.2219051293890773,"1785":0.18293053223356276,"1786":-0.12763930037601326,"1787":-0.5692213502601554,"1788":0.04538604774860259,"1789":0.8383994762148297,"1790":0.22136826146682095,"1791":0.18784160144206108,"1792":-0.062399421424270116,"1793":-0.1554669810445353,"1794":0.7250803912466808,"1795":0.2152635999367153,"1796":0.6527855557254276,"1797":-0.3006993491275791,"1798":0.06209093079513867,"1799":-0.3115097976784907,"1800":-0.8009241888825281,"1801":0.2359968813517239,"1802":0.4143938120480322,"1803":1.306576942129357,"1804":-0.6770529920549033,"1805":0.7312386129473513,"1806":0.86735871206448,"1807":1.5490702029383463,"1808":0.8882540972385613,"1809":0.39884282485317335,"1810":1.3769427775257737,"1811":1.500079953931941,"1812":1.5509474528253648,"1813":0.0027895525286698248,"1814":-0.36761378022524266,"1815":-0.3267015825070052,"1816":-0.10148489232463652,"1817":-0.841416124081877,"1818":-0.4990681757982635,"1819":1.603933652926597,"1820":1.9459591402530465,"1821":0.8278366545077682,"1822":-0.24519565490039072,"1823":-0.1416175850056817,"1824":0.6873461282039824,"1825":0.015857667956981947,"1826":0.07514600515191004,"1827":0.8267569263059907,"1828":0.21584937812859725,"1829":0.8403858092503861,"1830":0.8425001131893294,"1831":0.30912034265455557,"1832":0.5671523497180948,"1833":0.41001602467370185,"1834":-0.055476775221411444,"1835":1.0791707395180605,"1836":0.8241501795257968,"1837":1.112959362995278,"1838":0.814062996895873,"1839":0.5907940245805722,"1840":0.25194061638172804,"1841":-0.1737270641635451,"1842":0.3652208241026416,"1843":-0.210404525459135,"1844":-0.08646858980310822,"1845":1.1519318709504667,"1846":0.8131419466185761,"1847":1.2111357518127364,"1848":1.2575065103367797,"1849":0.003698970213999912,"1850":-1.0495263939099944,"1851":-0.9752701833819726,"1852":0.29914351134519584,"1853":-1.685975399048477,"1854":0.7872789796540279,"1855":1.2354644096842324,"1856":1.470294345432661,"1857":0.9862487398194848,"1858":-0.256652072447516,"1859":-0.3695460204697799,"1860":1.0222176423713991,"1861":0.09941276309622267,"1862":-0.5576884665342385,"1863":-0.28939571266093733,"1864":-0.591295518379007,"1865":0.6301449527374359,"1866":1.2573059876620791,"1867":-1.413780985070061,"1868":0.19308957849159997,"1869":1.334896762357558,"1870":1.4790983441486114,"1871":1.0636852113970112,"1872":0.5556004810192489,"1873":1.4822870513420319,"1874":0.8604198068973606,"1875":1.2464355108825023,"1876":-0.00482103469711866,"1877":0.9464467370326398,"1878":0.2624320312305634,"1879":1.496544506137827,"1880":2.1535820401528687,"1881":1.21039172898555,"1882":1.7657025291030053,"1883":0.5363696689850785,"1884":0.9650458001180456,"1885":-0.7294144513576705,"1886":-0.40921212858932615,"1887":-0.8701825544370972,"1888":-0.13445578068079356,"1889":0.1434443140646317,"1890":-0.28977882854837417,"1891":-0.02250271045987339,"1892":0.060057170304916786,"1893":0.4885806139180526,"1894":-0.2745205259110593,"1895":-0.7250507780787051,"1896":0.07146266227671409,"1897":0.10292072795702174,"1898":0.6974023514357882,"1899":-0.010440341522511215,"1900":0.4673872695874856,"1901":-0.05469516129716484,"1902":-0.693172759268771,"1903":-0.35638348084472404,"1904":-0.49196114678200586,"1905":-0.8491829638898966,"1906":0.3780382649572432,"1907":0.128414877272054,"1908":-0.21697478347330423,"1909":-0.6382956288951439,"1910":-0.8536403532502147,"1911":-0.23334848009587386,"1912":-0.2820141861538125,"1913":-0.3560531980559117,"1914":0.319612034662693,"1915":-3.8770253278809617,"1916":-6.7841717972091224,"1917":-7.226730946170689,"1918":-0.8997972130794506,"1919":0.021259960806578323,"1920":0.17858032243751193,"1921":-0.5920130346420222,"1922":0.6077661006223863,"1923":-0.04168511561706433,"1924":0.16491337690707994,"1925":5.129490139168554,"1926":0.4314894763177706,"1927":0.8093977603111359,"1928":0.15278729785824346,"1929":-0.8653464822519237,"1930":0.007112020277959405,"1931":0.21045353781816198,"1932":-0.1288926517514912,"1933":0.21798382347003042,"1934":0.24459898525567386,"1935":-0.03580367446517075,"1936":0.3901616951498824,"1937":0.6077482108096353,"1938":0.4919205636951393,"1939":0.3157016305495865,"1940":0.13312981105491614,"1941":-0.1846133359712656,"1942":-0.5530941453406385,"1943":-0.41076213593712685,"1944":0.3838818745639939,"1945":-0.231617026339571,"1946":0.01375387773008299,"1947":0.0995336674478462,"1948":-0.17844329099694972,"1949":0.002043232130571898,"1950":-0.16799900505107018,"1951":0.06363279267994404,"1952":0.16636296965100647,"1953":0.08198293999984864,"1954":-0.06217007719985546,"1955":-0.01260129946492621,"1956":-0.17975938024897795,"1957":-0.5129534520248613,"1958":-0.23262951808965737,"1959":-0.08051281789581674,"1960":0.19318516198578295,"1961":-0.05510340381266457,"1962":-0.21761207521277162,"1963":-0.02808400344499808,"1964":0.11465944038363425,"1965":-0.5871286881911797,"1966":-0.7488361102145266,"1967":-0.14240825981608726,"1968":0.16523917239473404,"1969":0.19804506754455473,"1970":-0.8301761203153112,"1971":-0.2420881148643358,"1972":1.0910858536212769,"1973":0.30238119234027755,"1974":-1.1446890214713805,"1975":0.22496551607546947,"1976":0.3598999679325357,"1977":-0.05129942212755935,"1978":0.5985126537514064,"1979":-0.22429492833314355,"1980":1.080597475632153,"1981":-0.004978190134465972,"1982":0.9146757549972564,"1983":0.14457649401653894,"1984":1.0539082080826467,"1985":0.03929792220408571,"1986":0.23609954593086102,"1987":0.03273476293321771,"1988":0.5391985627344309,"1989":0.5504256277510987,"1990":0.3161043448414217,"1991":-1.0538174552781991,"1992":-0.7104654017279668,"1993":0.025084876660965528,"1994":-0.0408703487800113,"1995":0.39941957395234995,"1996":-0.47481435491546226,"1997":-0.30876751304167294,"1998":-1.397229635278737,"1999":-2.6746288835578995,"2000":-1.7056609929010673,"2001":-1.18388131032002,"2002":-0.06091960587620378,"2003":0.385745811915905,"2004":-0.4659795727483624,"2005":0.9019983438182572,"2006":0.19859208229726627,"2007":1.3430817674021378,"2008":5.466608837422413,"2009":7.034135322199101,"2010":2.564956986162206,"2011":2.0399914861652015,"2012":0.35609408868095765,"2013":-0.9766693967424479,"2014":0.3287813017486924,"2015":0.26782312958074456,"2016":0.04944475849235427,"2017":-1.4498145514413234,"2018":0.760858399109793,"2019":0.46465746740480934,"2020":0.23033760375749948,"2021":0.12230601552968139,"2022":-0.41506350318780244,"2023":0.03848274312435368,"2024":0.9712444584160118,"2025":-0.19810755456734847,"2026":0.8961125994555561,"2027":0.2525321102751094,"2028":0.39319726765684676,"2029":-0.06140039735564148,"2030":-1.126610495282129,"2031":-0.8606242181287497,"2032":0.0643621808362089,"2033":-0.7062483964849591,"2034":-0.22368066944289164,"2035":-0.16797436059482043,"2036":-0.008877245576144626,"2037":0.4012115359544867,"2038":-0.926679285137583,"2039":-0.16195462496749236,"2040":-0.48751218303248606,"2041":-0.07954542457236671,"2042":0.37198159980466733,"2043":0.8493961904606282,"2044":0.17264076140157011,"2045":0.5619755398653213,"2046":-0.9209996665317571,"2047":0.5668638226305871,"2048":-0.33505109383261494,"2049":0.021461828118332724,"2050":-0.12586198292781106,"2051":-0.4299717414426515,"2052":0.09822363343351068,"2053":-0.24237189525019678,"2054":-0.1299043017614802,"2055":-0.13686807715871407,"2056":0.05316238886904077,"2057":-0.4007771937206489,"2058":-0.32672293370371835,"2059":0.013002488154174412,"2060":0.7016855220090203,"2061":0.38622770071946205,"2062":0.18084947839387774,"2063":-0.5719118409336483,"2064":-0.036561897393241005,"2065":-0.41000897481768156,"2066":-0.14198348337867495,"2067":0.7661401592659143,"2068":0.07347944241641019,"2069":-0.13381242035307173,"2070":-0.4468938772352906,"2071":-1.1934962777910854,"2072":-0.23501846022071868,"2073":-0.21699655381253563,"2074":-0.411564719028646,"2075":-0.9622701473374639,"2076":0.22418985915598824,"2077":-0.4970890370894782,"2078":-0.14395515778169696,"2079":-0.980070264769881,"2080":-0.7601220645568596,"2081":-1.5000471298528222,"2082":-1.9738901576846566,"2083":0.028847877392203847,"2084":-1.1607607914403402,"2085":-0.14887596158825744,"2086":0.1319542902751568,"2087":0.7016734734609312,"2088":0.7867604242513196,"2089":-2.7740247023232523,"2090":-1.175181469966511,"2091":-0.29963851399477665,"2092":0.9518769867320626,"2093":0.22362731823622495,"2094":0.034428731511624504,"2095":-0.05891943653866535,"2096":0.37751996137779925,"2097":-1.2338387963996575,"2098":6.0807794928677135,"2099":4.962042585122524,"2100":2.0159580398328214,"2101":1.172713847953856,"2102":1.961105428074808,"2103":-0.3468327224144062,"2104":-0.85117942684766,"2105":0.8166978291474434,"2106":-1.234982577308287,"2107":0.03262932200308872,"2108":0.6361146256937604,"2109":-0.12236104148891133,"2110":0.6396413268499676,"2111":0.04641653550662797,"2112":-0.015738990033891523,"2113":-0.32558826405506425,"2114":-0.272255235747024,"2115":0.06421139440088154,"2116":0.012732165647692422,"2117":0.3413804562213321,"2118":-0.1476186814165868,"2119":-0.7696612511759012,"2120":0.5518155465398281,"2121":0.4442453793609735,"2122":-0.6923591106927249,"2123":-0.08286147335004375,"2124":0.7681969779746983,"2125":0.7652592772171304,"2126":0.1639738381472367,"2127":0.3267533291280183,"2128":0.6050496201393211,"2129":-0.2605240053217936,"2130":0.3904303693059952,"2131":1.100317547530891,"2132":-1.5572131505276412,"2133":-0.4913143836687009,"2134":0.692639263520056,"2135":-0.21688449395026,"2136":0.007823257914405551,"2137":0.9682212149859448,"2138":0.3755754021646727,"2139":0.15054160710061798,"2140":0.3436756534202327,"2141":0.8333921068165486,"2142":0.012047475434732134,"2143":0.3778176526386575,"2144":-0.8123632465634065,"2145":0.30548960358042404,"2146":0.9347315933758369,"2147":0.722488120192642,"2148":0.643601383408467,"2149":0.8457553310021306,"2150":-0.08686197232274169,"2151":0.9227197031785914,"2152":-0.3850146588242851,"2153":-0.4391915021466434,"2154":-0.34167043602785857,"2155":0.9518728468923727,"2156":0.9533347241432343,"2157":0.584597524900046,"2158":-0.28239158563521605,"2159":0.5325741814577993,"2160":1.0062348391892058,"2161":0.466819442279424,"2162":-0.6746840611792766,"2163":0.8248242299596652,"2164":1.2804515662776166,"2165":0.23507809141555122,"2166":-0.540738231625712,"2167":0.7460928559466657,"2168":1.0266246930709237,"2169":-0.07629652103228796,"2170":-0.06479649981991546,"2171":-1.8134854340605762,"2172":-0.43793658245753503,"2173":0.24433069502553723,"2174":0.09947915009637927,"2175":0.7703632359052988,"2176":-0.0686726845882875,"2177":-0.006853403110694761,"2178":1.4541875328937393,"2179":-1.3198904666741837,"2180":-1.3384893110715912,"2181":1.0412873123158366,"2182":0.6686195594102726,"2183":0.18761461370576749,"2184":0.8413268317991492,"2185":-0.06300116823795063,"2186":-0.9483067085659667,"2187":-0.23449756464375568,"2188":-1.0812709705723602,"2189":-1.129777278130932,"2190":-0.4116697842653758,"2191":1.9375255861263876,"2192":1.085606377938598,"2193":0.6766196743778571,"2194":0.6161666929874822,"2195":-0.009892290605583047,"2196":0.9069910033368641,"2197":0.8459971878147869,"2198":-0.7292148039651567,"2199":0.40489509108649524,"2200":1.4904699345485284,"2201":1.040610877311846,"2202":0.07331401431826233,"2203":0.40114673673455536,"2204":-0.1659317986394024,"2205":0.9012636611362278,"2206":0.8847340750924448,"2207":0.1440427119742494,"2208":1.9800813439710463,"2209":1.2604874215908988,"2210":0.11109605314745855,"2211":0.18483458563680039,"2212":0.46696384069107827,"2213":1.2288961883467278,"2214":-0.11521932996764632,"2215":1.1713380369327095,"2216":0.049749958707880924,"2217":0.9391045556894194,"2218":0.5939667295244146,"2219":0.4698757666004635,"2220":-0.1829083385407162,"2221":-0.9626703162865821,"2222":0.07844103474989705,"2223":0.361479081324989,"2224":0.42040643491650487,"2225":0.5353497619185981,"2226":0.8027512542860594,"2227":-0.5825878027270113,"2228":0.49002523264359316,"2229":0.6658488389437468,"2230":-0.6043913207752285,"2231":-0.7587586437023309,"2232":0.46914671285046355,"2233":-0.04935124197116975,"2234":0.5026521426878878,"2235":-1.7027450405564102,"2236":-0.3735752623201519,"2237":-0.3595738169957276,"2238":-0.4661961637164584,"2239":-0.6360961359598565,"2240":-0.8149364167341066,"2241":-0.6056220903720935,"2242":1.2460995118266067,"2243":0.7490719785713965,"2244":-0.5868279150352701,"2245":-0.29036488883662737,"2246":-1.3963364366355695,"2247":-0.8883626443822614,"2248":-0.6752838635356682,"2249":-0.9049747128435497,"2250":-0.6652815464175793,"2251":-0.6514977870699399,"2252":-1.3179306850018213,"2253":-2.4193662157159173,"2254":-3.5508896657084303,"2255":-0.46183535948308024,"2256":-1.7523504200477507,"2257":-0.3418022969077435,"2258":-1.0462248166403725,"2259":-0.21933642547062057,"2260":-0.8575874857613166,"2261":2.7496649773790924,"2262":1.6503667410256093,"2263":2.3203377304670663,"2264":-0.529616316112217,"2265":0.28010112326576697,"2266":-0.3145308599632063,"2267":0.003641225895424981,"2268":0.017923116719169574,"2269":-0.44322392015540707,"2270":1.5799614837160643,"2271":1.027321130451354,"2272":1.6554397684755886,"2273":0.46887270703869227,"2274":0.09698204796671446,"2275":0.7016597456659747,"2276":-0.4309235444163311,"2277":0.01848886310519752,"2278":0.33107894327605353,"2279":-0.5524293507466607,"2280":-0.24319840277000507,"2281":0.16118827600058314,"2282":-0.08768600602320709,"2283":-0.21840252635650703,"2284":0.0003594137830015271,"2285":0.6630469887945233,"2286":-0.47533366012328565,"2287":0.02401071125337692,"2288":-0.6058098602362857,"2289":0.9144006592106176,"2290":-0.4266774760845096,"2291":1.5732387085590471,"2292":0.031171080604490913,"2293":0.12998779890907017,"2294":0.8148776509037354,"2295":-0.3614440013957472,"2296":-0.11922453571839776,"2297":-1.2579204520745784,"2298":-0.5061749841564103,"2299":0.011841485971687833,"2300":0.1518290521138928,"2301":0.15270802633811595,"2302":0.4138198445048487,"2303":0.9683331279743529,"2304":-1.1356955798482948,"2305":0.512923983148806,"2306":-0.11727810218520053,"2307":-0.5536504685545233,"2308":-0.23139219096428143,"2309":0.3415282654561227,"2310":-0.17175568476353784,"2311":1.070691554257427,"2312":-0.42671963841074395,"2313":-0.3423133238031013,"2314":-0.6849314646410213,"2315":0.08994714014786183,"2316":0.5810710762758282,"2317":-0.051066922682580916,"2318":0.2950595589200916,"2319":0.6342425465865413,"2320":0.657167921976935,"2321":-0.2734139527832405,"2322":-0.38153225303107147,"2323":-0.05665736295203998,"2324":-0.19916126585888722,"2325":0.4299999475298134,"2326":2.3080346637378666,"2327":2.611322509603417,"2328":2.94296747253702,"2329":2.6065406616856683,"2330":1.9468452789081236,"2331":0.9413513090994748,"2332":-0.5682674090605838,"2333":0.8047918642209971,"2334":0.621495868197224,"2335":-0.9431344099132465,"2336":0.6847429919454565,"2337":1.493577241735823,"2338":0.1850399596152872,"2339":0.3797731329683648,"2340":-0.20821018770750419,"2341":0.7571845983197583,"2342":1.2290631242668082,"2343":1.3143367766435727,"2344":-0.3704494548932914,"2345":-2.0795560063298564,"2346":-0.4431690435301091,"2347":-0.9474600386543591,"2348":-0.8134305853850479,"2349":-1.0402395713906458,"2350":0.7655229578680384,"2351":-0.15635776169275178,"2352":0.7533769881952662,"2353":1.2590732267334486,"2354":0.21542198518858596,"2355":-1.0457905537019796,"2356":-0.18299977827088157,"2357":-0.3658254169304151,"2358":-0.34235353268043617,"2359":-0.4483660989967971,"2360":0.42189117109932156,"2361":-1.3914280597145048,"2362":0.10587895884439037,"2363":-0.8726645288293162,"2364":-0.09530209502240722,"2365":-0.15965093192351695,"2366":0.010895279003680583,"2367":-0.21184974847575455,"2368":0.1757535868434149,"2369":-0.4930159985316936,"2370":-0.31649594864521285,"2371":-0.4542176325514468,"2372":-0.02763254170219453,"2373":0.8927817385802058,"2374":-0.4349920239173818,"2375":0.4249095625588424,"2376":0.04886592716510287,"2377":-0.3244399606715769,"2378":0.5400807752219565,"2379":-0.01969530942157873,"2380":-0.6841044114425823,"2381":-0.24673178625035072,"2382":1.5532488380341694,"2383":0.36814412234423105,"2384":1.9038590411142786,"2385":-0.4637055469501968,"2386":0.3118980252537632,"2387":0.8911898964903003,"2388":0.05082285287395919,"2389":0.806383009248646,"2390":0.7195285272865426,"2391":0.02623321072696181,"2392":0.17339205090444404,"2393":0.06161599897142167,"2394":0.7682206001994314,"2395":0.6003752283833491,"2396":0.6400955668204878,"2397":-0.45384786171098906,"2398":-0.08925936542552886,"2399":0.6423324023364787,"2400":-0.9564709933336586,"2401":0.9169765698311174,"2402":-0.09164459378340001,"2403":0.5596659141613296,"2404":-0.20883652528705607,"2405":-0.2903460599368111,"2406":0.09348459958275755,"2407":-0.7617823906998301,"2408":-1.3535823425046238,"2409":3.29675973766179,"2410":2.35788621286367,"2411":1.161840187436099,"2412":1.6889858284115977,"2413":0.8261597847994303,"2414":0.6027117609779061,"2415":1.0580925513824613,"2416":0.04209444152622615,"2417":2.776943899083338,"2418":0.2369401177026283,"2419":-1.887317278755248,"2420":-2.09122990432643,"2421":-0.7134493921441025,"2422":-0.7652969744132132,"2423":-0.02366277213532367,"2424":-0.8476350930016705,"2425":-0.1568855372598819,"2426":0.09020083894358481,"2427":-0.5621550798355627,"2428":-0.32478388821255794,"2429":-0.9632834191396809,"2430":-0.9282275489732854,"2431":0.2007825335640045,"2432":0.5790304404581486,"2433":1.3158983833267035,"2434":0.48638871548345564,"2435":0.3664839234760257,"2436":-0.18637544363166747,"2437":-0.3648915900230519,"2438":0.5725047303559454,"2439":0.07564232224035371,"2440":-0.7809406873283168,"2441":0.9446369532269208,"2442":0.6081715577832622,"2443":-0.31321782976517365,"2444":0.43095186885700654,"2445":-0.48940029355066095,"2446":1.1920730139799172,"2447":0.5215038991404978,"2448":0.4511235552011702,"2449":0.4612519492418106,"2450":1.0074803652839832,"2451":-0.5618336056488464,"2452":0.23485688698763652,"2453":-0.4428974059286464,"2454":0.8520883768234805,"2455":-0.17261748719942965,"2456":-0.8656374451935945,"2457":0.501422148651881,"2458":0.9335428436620289,"2459":-0.33967057269319756,"2460":0.7857700618371661,"2461":-0.9886278061208774,"2462":1.5265459976131135,"2463":-0.7265301453312917,"2464":-1.050729723849679,"2465":-0.7945527158155528,"2466":-0.5813581415202451,"2467":-0.41548241228181776,"2468":-0.5423444983419187,"2469":-0.3476648765945277,"2470":-0.18473869098935788,"2471":-0.5788438145267635,"2472":-0.5521862563552681,"2473":-0.9304373356122482,"2474":-0.3570673565157786,"2475":-0.30129596066659453,"2476":-0.5495259427747782,"2477":-0.37363534793130376,"2478":-0.6463533459880756,"2479":-1.0637709824863915,"2480":-0.716069175853113,"2481":-1.0851655773896696,"2482":-1.241172942319859,"2483":-0.5753065192139193,"2484":-0.6674860330778627,"2485":-0.1838914924968365,"2486":-0.4091993961081721,"2487":-1.5468524065819549,"2488":-0.936129795097349,"2489":0.37145493128805573,"2490":-0.9065999001107644,"2491":-1.3497342325660895,"2492":-0.3880565810224459,"2493":-0.4876593646323062,"2494":-0.2972039326921194,"2495":-0.45832917480873264,"2496":0.64274573650305,"2497":-0.5295732389836962,"2498":4.2002930079832135,"2499":-0.3409950043375972,"2500":-0.6644027855476551,"2501":-0.6218966800901036,"2502":-0.2828768659908631,"2503":-0.5852782725977617,"2504":-0.28380066657972297,"2505":-0.4956925897927757,"2506":-1.2252649227020898,"2507":-0.9822848627180422,"2508":-0.9435471367927681,"2509":-1.3480820243311857,"2510":-0.386869107051334,"2511":-0.48812080992297163,"2512":-0.23260799417010797,"2513":-0.09527238685766416,"2514":0.5145932067498824,"2515":0.7098319104288945,"2516":0.037556331616313714,"2517":-1.025789886237657,"2518":-1.0874411454487467,"2519":-0.6690716394550631,"2520":-0.27411989149588023,"2521":-0.2616248438459721,"2522":-0.36578699714119683,"2523":0.7864266814425518,"2524":0.41215809384134117,"2525":0.004537086376340721,"2526":-1.3770093387180127,"2527":-1.2456462721183132,"2528":-0.44743392941318444,"2529":-0.415934196183804,"2530":-0.33222363616362305,"2531":-0.5210269068761061,"2532":-0.11209004043237658,"2533":-0.5740163342547088,"2534":0.11504188435112303,"2535":0.3105958335876383,"2536":-1.0523562189977778,"2537":-0.43676018621930235,"2538":-0.44405479221623145,"2539":-0.10604130763252022,"2540":-0.6084150857433079,"2541":0.19779462940035386,"2542":-0.3648996577152269,"2543":-1.0449342871171292,"2544":-0.9560180648972706,"2545":0.4701329670982927,"2546":-1.3543487116411737,"2547":-0.0464945573557413,"2548":-0.6704387621693216,"2549":-0.17984250699812224,"2550":-0.1469242809860634,"2551":-1.3750671038871278,"2552":0.02065927768350926,"2553":0.14662575245082912,"2554":1.4231359046493466,"2555":0.2684881737811393,"2556":0.06101234510698078,"2557":1.290396657351151,"2558":1.2740806130860873,"2559":0.07820164700308707,"2560":0.6909668452352905,"2561":-0.10371086224679081,"2562":0.4539126420274199,"2563":-0.8150011169299635,"2564":1.1649593643133036,"2565":2.260837866327599,"2566":0.17272089672435775,"2567":-1.8090195135450586,"2568":0.42355364137009055,"2569":-0.9793955279308784,"2570":1.053966352847277,"2571":-0.20177003240403887,"2572":1.0971370409461134,"2573":0.8956638626343421,"2574":-0.38491650996754156,"2575":1.6692929273619606,"2576":1.1550223141502134,"2577":0.4466158391802989,"2578":0.3854936788022703,"2579":-1.3561652815009317,"2580":-0.4833944749685105,"2581":1.2565286646172813,"2582":0.10258332810877949,"2583":-0.16382015949114315,"2584":-0.2055442760181424,"2585":0.21932080778819601,"2586":0.4308457389498297,"2587":0.9497004071116769,"2588":0.5368497976459401,"2589":-3.8843577225385175,"2590":0.15452503781843804,"2591":-0.1399550321839001,"2592":0.03906872885489882,"2593":2.0478107614989387,"2594":-0.8077337957961338,"2595":0.7388882725502461,"2596":0.009299715198310708,"2597":0.1905251117239956,"2598":0.9304885564937172,"2599":0.3784277125383844,"2600":-0.05106121630548785,"2601":1.1569653229900567,"2602":1.0172356078087224,"2603":0.7400070922830129,"2604":0.0956893310815189,"2605":-0.5167571105548107,"2606":-0.3194735977823167,"2607":-0.5700615184634242,"2608":1.098205646758831,"2609":0.5676431876607687,"2610":-0.2223424659388522,"2611":-0.8417761872105596,"2612":-0.5390788893431757,"2613":0.8259324330081113,"2614":-0.5185239157313094,"2615":0.2848936675621947,"2616":0.10449805846927011,"2617":0.060916781023985206,"2618":-0.2241204411434068,"2619":0.23518296425121502,"2620":-0.2239786732688252,"2621":-0.7851052615994574,"2622":-0.7528725968584492,"2623":-0.2946486153985751,"2624":-0.29935905415932845,"2625":-0.5454730136593132,"2626":0.6692334773233108,"2627":0.3337575017221922,"2628":-0.5391200399410909,"2629":0.5819751498630837,"2630":-0.6125898087862746,"2631":0.6353722130300148,"2632":0.8509294223914965,"2633":0.49440534953748794,"2634":1.0304301109203142,"2635":-0.3013765317102402,"2636":0.38029236539784306,"2637":0.07140436861279528,"2638":1.8873685525510056,"2639":0.30039589703819325,"2640":0.34914414636801466,"2641":-2.0320106655819603,"2642":-0.23420203317263433,"2643":0.1650629582175566,"2644":0.7682495105249536,"2645":0.14904026174071658,"2646":0.9735224103143312,"2647":1.763778128337616,"2648":-1.1487483614894909,"2649":0.8162032904781733,"2650":0.05248071665593168,"2651":-1.4425237101616233,"2652":0.5598953372454717,"2653":-0.7082505572350183,"2654":0.4952197640603601,"2655":0.6116931239567223,"2656":0.0691807196535456,"2657":0.667565380887028,"2658":-1.4706802661664298,"2659":0.3031288458893677,"2660":-0.5527644052623828,"2661":0.567443783446312,"2662":-0.40453006873919406,"2663":-3.127976626615886,"2664":-2.830399291115236,"2665":-1.1285035739275044,"2666":-0.9034486286730237,"2667":-1.1128773716021148,"2668":-0.7616442589689351,"2669":0.3925538228208805,"2670":-0.5453387584722972,"2671":-0.8725579331215297,"2672":-2.280757273568026,"2673":-0.13273776520833128,"2674":-1.8352537719618789,"2675":-0.933873654212216,"2676":-1.3284453791888777,"2677":0.2166171153976085,"2678":-0.06693413502282766,"2679":0.7706544191290476,"2680":0.05665218743818466,"2681":-1.0324878644220346,"2682":0.6963189037631553,"2683":0.2159720319495862,"2684":-0.06795418510235568,"2685":0.9506402880834354,"2686":-0.16005312961281967,"2687":-0.7467865688719326,"2688":1.1511150027481942,"2689":-0.2177105146506311,"2690":1.527740849605144,"2691":0.015119542165535826,"2692":0.41941352346186506,"2693":0.49531427789297283,"2694":-1.0320758466856712,"2695":0.07446564929244118,"2696":0.2854754125392854,"2697":0.27639809714719493,"2698":0.0023968011452319025,"2699":0.34310689464627386,"2700":-0.22728941428174246,"2701":0.17237331763710342,"2702":-0.1582057882409508,"2703":-0.09588856877485528,"2704":-0.42388357550781297,"2705":-0.3327874578758586,"2706":1.4361020644533602,"2707":-0.4186666762677508,"2708":-0.6552162523805036,"2709":0.4426092028546335,"2710":-0.3215982034975693,"2711":0.13946737468710693,"2712":0.4731320343167522,"2713":-0.257593982885541,"2714":-0.06574163986349801,"2715":-0.18748021541179247,"2716":0.13054447127209276,"2717":-0.17964945160951462,"2718":-0.7487740361594996,"2719":-0.16290337158221735,"2720":0.277187697545663,"2721":-0.9068462911457953,"2722":-0.25395103215638754,"2723":0.3816542703787192,"2724":0.4029467947322453,"2725":-1.0225673621082225,"2726":-0.9552108847070349,"2727":-0.08049827024486636,"2728":0.4708374732030447,"2729":-0.4663779120342798,"2730":0.37475818287476237,"2731":0.8038015532661088,"2732":0.22155344896377246,"2733":0.8617507860236352,"2734":0.5276090937414127,"2735":-0.09870609742852503,"2736":-0.08970936581295424,"2737":1.503261509601262,"2738":-0.06812835407403116,"2739":0.16794486943354,"2740":-0.1579207344462681,"2741":-1.0124863412659268,"2742":0.4207101675271056,"2743":-1.2006254287856313,"2744":0.15957711549894005,"2745":-5.347828755203184,"2746":-1.594576531799077,"2747":1.2546081348619147,"2748":-2.2610220003011623,"2749":0.3331455992477905,"2750":0.23229045750614025,"2751":0.24035646625317791,"2752":0.7100342935944337,"2753":1.8385407598358583,"2754":0.21665940780460943,"2755":1.4611360688564943,"2756":-1.119058050569183,"2757":0.9911997424125739,"2758":0.019082713539526456,"2759":-0.35410561896722687,"2760":0.28527791319238455,"2761":0.47615349558407877,"2762":1.2738898016806348,"2763":0.9812601068509362,"2764":-0.02098537996487495,"2765":-0.07375487199049165,"2766":-0.1584839366538634,"2767":-0.46472102641021346,"2768":0.005366350869105428,"2769":-0.17194281799934752,"2770":-0.35433368056317,"2771":-0.3737862269344673,"2772":-0.37921573208080966,"2773":-0.9218545372024726,"2774":0.38122316283721674,"2775":0.0468583925918586,"2776":-0.6437835725458536,"2777":-0.16165077986731674,"2778":0.2811556328376373,"2779":0.36094892969914977,"2780":0.16684311222179968,"2781":0.8229750185117548,"2782":0.5520945009668126,"2783":-0.9292499145005024,"2784":-0.06269077874067111,"2785":-0.2715831776622199,"2786":0.9096969748821884,"2787":0.7376548614837604,"2788":0.3095833630248949,"2789":-0.5737160695080841,"2790":0.3490265637232705,"2791":0.10000969832647182,"2792":0.25640292554968885,"2793":0.0835736618442209,"2794":-0.08179796153872732,"2795":0.37637335965177376,"2796":0.07536258151703945,"2797":0.11592967301051399,"2798":0.14779205827486713,"2799":0.7799204337805845,"2800":0.20151955581628622,"2801":0.706382921424477,"2802":-0.0866913784776546,"2803":0.18833318903754326,"2804":0.09609801643305226,"2805":-0.010322444248076398,"2806":0.675484073280684,"2807":0.14940550124755647,"2808":0.15547758193261516,"2809":-0.028768788802001507,"2810":0.06040420361847567,"2811":0.0679208435727903,"2812":-0.05337050731543557,"2813":0.011240036305556159,"2814":0.24451387939203767,"2815":0.14226319543234164,"2816":0.2638899396640078,"2817":-0.1530147943147798,"2818":0.6559997538645158,"2819":0.0901823922076081,"2820":0.3869621259430941,"2821":-0.07022971216352486,"2822":0.08889374758952902,"2823":-0.03262461492697782,"2824":-1.5290969127798106,"2825":-0.7183648469270522,"2826":0.47101500048299333,"2827":-11.60639261569865,"2828":0.5521698634963669,"2829":-0.11713027134604712,"2830":0.5977674333658752,"2831":0.3645034594607212,"2832":0.12441145705930043,"2833":-0.3344273638219017,"2834":-0.03423720519148656,"2835":-0.25487873142886736,"2836":0.21038357002502334,"2837":0.27340973935323654,"2838":0.15086673085654825,"2839":-0.07102198442356272,"2840":0.06033097569385454,"2841":0.11137846614918064,"2842":0.8336095400711138,"2843":0.3399944114910647,"2844":-0.45139718529494394,"2845":0.3741608271553046,"2846":-0.07076559590222893,"2847":-0.054327458007744106,"2848":0.21245647254102748,"2849":0.31985054850837835,"2850":0.08807242270111179,"2851":0.3214147861772259,"2852":0.987304495311728,"2853":0.3484528748898561,"2854":0.12464585085322753,"2855":0.2005486345334423,"2856":-0.15801188077176634,"2857":0.3793799920639989,"2858":0.24235597671686812,"2859":-0.10801248732741309,"2860":0.1955212408360132,"2861":0.08386158257785266,"2862":0.5030947083120089,"2863":0.46945745882315704,"2864":0.21971848032459337,"2865":0.01684552367401822,"2866":-0.09398503283196925,"2867":0.4732023497426153,"2868":-0.01210871264249639,"2869":0.3768930771975787,"2870":0.5759213249275852,"2871":1.5957996238102206,"2872":-0.027023205180468017,"2873":0.9119942099334056,"2874":0.27098790902955505,"2875":-1.043039896243409,"2876":0.14785095259960676,"2877":0.36265692001413047,"2878":-0.28650955429402425,"2879":1.2204082147442488,"2880":-0.06813974438857683,"2881":-1.1189720237088587,"2882":0.6144352886300395,"2883":0.05232294775418313,"2884":0.34018731155400134,"2885":-1.4220384133090416,"2886":-0.19341077883139027,"2887":-0.6800605251136798,"2888":-0.615650556790586,"2889":0.024779918984557062,"2890":-0.3870986489961928,"2891":-0.32078591252041583,"2892":-0.44100592319729137,"2893":-0.3280569288538234,"2894":-0.7469046300587223,"2895":0.014670527824267763,"2896":-0.05410113345424097,"2897":-1.2476150458719972,"2898":-0.08311453831166461,"2899":0.15505094912579506,"2900":-0.365455493539994,"2901":-0.1993055140349187,"2902":-0.8783105372504563,"2903":-0.5357064855325385,"2904":-0.2268304186599328,"2905":-0.5257834745259305,"2906":0.3308560300146702,"2907":0.10094817848089443,"2908":0.26705396364215944,"2909":3.0629287478627263,"2910":1.6371829277784875,"2911":1.038905640864213,"2912":0.031181416884669855,"2913":-0.12775450066864302,"2914":-1.402756951956184,"2915":0.11885579533958303,"2916":-0.1572928643791396,"2917":-0.11124863178859538,"2918":0.2926751939714216,"2919":0.21440355121126212,"2920":-0.350196391813562,"2921":-1.5364150366761729,"2922":0.4523281061328679,"2923":-0.4381741770041168,"2924":0.19828021613992453,"2925":-1.2535437683976713,"2926":0.20306549396654341,"2927":1.710902731777512,"2928":-0.5144422124952384,"2929":-0.21451066601592136,"2930":-0.2492648106477437,"2931":-0.8034915908169009,"2932":0.20980077189261181,"2933":0.038999853038712305,"2934":-0.6811017015181686,"2935":-0.37068777105897877,"2936":-0.5510027831885697,"2937":0.04304807512400494,"2938":0.1243023161976605,"2939":-0.04184910493013717,"2940":-0.16900303108131354,"2941":-0.05198011369927386,"2942":-1.0067499529850505,"2943":0.35413737331481726,"2944":-0.8923196519370401,"2945":-1.0752767317428937,"2946":-0.12653148391848576,"2947":-0.6440278204140973,"2948":-1.6269357078335507,"2949":-0.5116163795166916,"2950":-0.6597955737979452,"2951":-1.1300862379710188,"2952":0.5807606776347656,"2953":0.2644148406657151,"2954":-0.29623085085855677,"2955":-0.7649531554753229,"2956":0.34914818855135904,"2957":-0.7015455028823427,"2958":-0.4687265276233224,"2959":0.16905301985694857,"2960":-0.5743300686015481,"2961":0.41681256620728846,"2962":0.11475611765023973,"2963":-0.10946832003616803,"2964":1.0204588561431116,"2965":-0.2258186367716121,"2966":-0.11727912761146934,"2967":-0.26837050566106074,"2968":0.23760164645714518,"2969":-0.7985904166475379,"2970":-0.3005553766944741,"2971":-0.6489642312252039,"2972":-1.1223029868483998,"2973":-0.5796061637460139,"2974":0.18653875733671282,"2975":-0.8530131867589036,"2976":0.5445653064547763,"2977":-0.9633384211496177,"2978":0.1865715042392905,"2979":-0.41573351230746936,"2980":-0.8721131578398479,"2981":-0.2849204419940878,"2982":-0.25373688126353705,"2983":0.08124891880674853,"2984":0.11649833244620132,"2985":-0.12263919145076488,"2986":-0.1585499365210817,"2987":-0.5564762016018111,"2988":-0.3347654733172414,"2989":-0.04641097287812418,"2990":-0.33414927288721985,"2991":-0.18296352351956738,"2992":0.15905654457671203,"2993":0.47500255694129095,"2994":-0.8388333801848615,"2995":-0.5555887703486605,"2996":-0.17269590720661604,"2997":-0.6551043507854625,"2998":-0.27788930585975374,"2999":0.786734191032667,"3000":0.7344430872845898,"3001":-0.49131808319228876,"3002":-0.08943362838951867,"3003":-0.3930588589166908,"3004":-0.3670187265168641,"3005":0.313440830517583,"3006":-0.1893237499674808,"3007":-0.22868387241116792,"3008":-0.15425219426702674,"3009":0.09687707852943934,"3010":-0.3911420688933051,"3011":-0.5157468880083441,"3012":-0.009901243159563235,"3013":-0.9450764051863452,"3014":-0.8339138738148156,"3015":-0.7383154236451238,"3016":-1.0398415363200295,"3017":-0.9447099912125568,"3018":0.17403567617368712,"3019":-1.6902063607759206,"3020":-0.6708359779912683,"3021":-0.3909598799656959,"3022":0.21161494555946142,"3023":0.026701106544614807,"3024":-0.2377745457152934,"3025":0.7117648548759908,"3026":-1.6328043654248503,"3027":-1.1632835964619934,"3028":-0.09155214602263434,"3029":-1.1378201662154979,"3030":-0.18354435185704582,"3031":0.5790418226340852,"3032":-0.8617300346446815,"3033":0.3840125599029165,"3034":-0.6497412567860571,"3035":0.006885128576286646,"3036":0.9603557170058884,"3037":-0.5403539151900923,"3038":-0.2893679092831579,"3039":0.19927371141758782,"3040":0.38992383805819036,"3041":0.012158544599021142,"3042":0.7183328634059287,"3043":-0.4870997700392364,"3044":-0.6618455689587965,"3045":0.9228113278621499,"3046":0.3008364288524272,"3047":0.9393836958895768,"3048":-0.1777120841547261,"3049":-0.5645415475164866,"3050":-1.6692721265337978,"3051":-0.8006791299429785,"3052":0.3615403952643676,"3053":-1.0105880953018906,"3054":0.8894649475625807,"3055":0.15231980386897673,"3056":-0.4571309705556824,"3057":0.21564223023905277,"3058":-0.46404857157290014,"3059":0.5811526235938761,"3060":0.050647468294070595,"3061":-0.3400609008426851,"3062":-0.36850184063773783,"3063":0.772322460845474,"3064":-0.33038830143037967,"3065":0.6467743851090173,"3066":0.413694377844616,"3067":-0.9807499246470338,"3068":0.9666139777270674,"3069":0.41714715500100197,"3070":1.2033508539316,"3071":0.6209476667698561,"3072":-0.056508231547217166,"3073":-6.054930614741189,"3074":-1.5478493704780694,"3075":-0.32090989355355237,"3076":-0.4043450540357691,"3077":0.23425804636264516,"3078":-0.31003093023295375,"3079":-0.17799704740913735,"3080":-0.08040587911019276,"3081":3.4193808871765357,"3082":4.1164435316768,"3083":2.2886077948918815,"3084":0.779672200958821,"3085":-0.014415563576046533,"3086":0.4937718404682707,"3087":0.36830529900497166,"3088":0.28441767461488837,"3089":0.19542837139906133,"3090":0.7045935816531266,"3091":0.9614018914129022,"3092":1.3330484798015774,"3093":0.705694601201719,"3094":1.0391305126108137,"3095":0.06585649814692791,"3096":0.19063466520712918,"3097":0.12886704170502503,"3098":-0.03078217708284297,"3099":0.04630105196723967,"3100":0.4576186985588725,"3101":-0.5721152279737236,"3102":-0.24486560764422122,"3103":0.45669316525872145,"3104":-0.13430505955460056,"3105":0.13912009882122198,"3106":0.24132840028723337,"3107":-0.2761439481061172,"3108":0.11045989275138209,"3109":-0.7434691110457184,"3110":0.29476085755481835,"3111":-0.23704711021330443,"3112":-0.5858946569269331,"3113":-0.041893695235738514,"3114":0.011967828916525052,"3115":0.5468240781190085,"3116":-0.7852224506618776,"3117":-0.08122164254138478,"3118":0.016467227175665136,"3119":0.6912027391376947,"3120":-0.2739049477231906,"3121":1.184183203158104,"3122":-0.12183068040999989,"3123":-0.05475584419203158,"3124":-0.6206274237784054,"3125":-1.1949143483161642,"3126":-0.13190682164607637,"3127":-0.4010521213067521,"3128":-0.531595614010515,"3129":-0.4323151206322578,"3130":-0.5816567223525438,"3131":1.7863325753712425,"3132":-0.20257725483321465,"3133":0.7775486420749733,"3134":1.853405050551032,"3135":0.3304704127183679,"3136":-0.2254492344561726,"3137":-1.4199139889691534,"3138":0.6993632873492598,"3139":-1.2063180518981451,"3140":-1.3191362242570364,"3141":-0.2931993275655286,"3142":-0.20050651166587405,"3143":-0.015321282039326894,"3144":-0.053480906991157054,"3145":-0.7161839298359353,"3146":-4.1043135161928515,"3147":-2.320749687744118,"3148":-0.9254168857226936,"3149":-0.6124809636387754,"3150":-0.3784668559518741,"3151":-0.5053781469516949,"3152":-1.4883711497405832,"3153":-0.33399350003716194,"3154":-0.16401060004438062,"3155":4.179966311406228,"3156":3.3985427683055307,"3157":0.6467858345071215,"3158":1.0229983146044708,"3159":0.30256063334635136,"3160":0.014925813412587405,"3161":0.30242190924777235,"3162":0.5493635783287395,"3163":0.6818830852917803,"3164":0.11371311238339928,"3165":-2.422074377787975,"3166":-0.4652099132204845,"3167":0.12971184205441838,"3168":-0.8681250820536244,"3169":-0.29755874449306774,"3170":-0.18632243975956211,"3171":-0.7772114463431035,"3172":-0.5540829247062595,"3173":-0.9505946308640275,"3174":-0.38156472354825577,"3175":-1.470004652055406,"3176":0.5420823483837575,"3177":-1.0236164110404324,"3178":-0.29194850695396285,"3179":0.8079203388385742,"3180":0.7995993185766324,"3181":0.7873953971233343,"3182":-0.233297904596124,"3183":-0.28209884551862774,"3184":-0.8037112642800324,"3185":-1.7153529314823213,"3186":0.18349428053590217,"3187":0.019594252148905734,"3188":-0.00007384889761398352,"3189":-0.506215999839226,"3190":0.09499758708417808,"3191":-0.44334995578974146,"3192":-1.3268068619254367,"3193":0.7550292952539642,"3194":-0.4306015259101989,"3195":-0.17966185670808507,"3196":1.0689789034311235,"3197":-0.7091492002712254,"3198":-0.0645291233478033,"3199":-0.3637760430673488,"3200":0.06331272296046887,"3201":0.12826736437653233,"3202":-0.23611129742086737,"3203":0.1365022628723424,"3204":0.2071482292810863,"3205":-0.023809613721229778,"3206":0.05062798492462262,"3207":0.43858318377805855,"3208":0.12232562118264821,"3209":-0.038389843258368014,"3210":0.04886254908408491,"3211":-0.11641803540687264,"3212":-0.03337066825130694,"3213":-0.5671245147769715,"3214":-0.16208527554887012,"3215":-0.2509864657382888,"3216":0.1725518559500145,"3217":0.011831649251773586,"3218":0.004093093477707241,"3219":-0.4290416868753109,"3220":-0.22984003447006301,"3221":-0.3718643947938967,"3222":0.3705522314665947,"3223":0.47279923595418705,"3224":-0.46365483234719507,"3225":-0.16971367508052632,"3226":0.17270989543335094,"3227":0.2984194095431252,"3228":-3.415424126362303,"3229":-1.2049625486321947,"3230":-0.6847340074729954,"3231":0.007223040077314317,"3232":0.1767113717648534,"3233":0.3573262803857058,"3234":-0.0005598381142799885,"3235":0.7901630337948086,"3236":0.1928748301286828,"3237":0.3899117131208343,"3238":-6.276826554199128,"3239":-0.2722435954749955,"3240":-0.8355489046553143,"3241":-0.5107273736697323,"3242":-0.1666771045032778,"3243":0.037467099528542845,"3244":0.30180375718281566,"3245":0.4820121283733271,"3246":-5.9616188181857,"3247":0.8443911805499187,"3248":0.20894310933334553,"3249":0.6958898002529876,"3250":-0.032665171064735994,"3251":0.5439385774572975,"3252":-0.29732542372937715,"3253":-0.1583587284967745,"3254":0.20324731558444048,"3255":0.6207328432299558,"3256":0.33802281934614914,"3257":-0.02541503289433915,"3258":-0.1561144683505686,"3259":0.6747953979488525,"3260":0.5045402657454391,"3261":-0.27176442859265526,"3262":0.2854368641840861,"3263":0.30877003148242965,"3264":-0.10233684241649056,"3265":-0.080096614943236,"3266":-0.03291261748880549,"3267":0.18086205761232546,"3268":-0.3104445003901215,"3269":0.011317858584318823,"3270":-0.12833753558392483,"3271":0.5544465702542348,"3272":0.1854621364408035,"3273":0.2280121090603738,"3274":-0.10478001224821303,"3275":0.3606260346686033,"3276":0.0785484880991419,"3277":-0.046766730494805654,"3278":-0.15275033100955704,"3279":0.02043903885655584,"3280":-0.012219871521803077,"3281":0.7431430298262136,"3282":-0.8814165267576993,"3283":0.39100461159765787,"3284":0.4761239823435371,"3285":-0.06371508140998439,"3286":-0.37108635082261937,"3287":-0.04236214832381539,"3288":0.09109671767725026,"3289":0.47790847016715465,"3290":0.2028313922703303,"3291":-0.08485908998990392,"3292":1.2045318499083235,"3293":-0.10283548669472849,"3294":0.2704264845883167,"3295":-0.0815224613305776,"3296":-0.12497072407981692,"3297":-0.3802430087298944,"3298":0.35670402966426584,"3299":-1.6474486012479506,"3300":1.4082028235425192,"3301":2.8824220775450993,"3302":0.013191766759496458,"3303":0.2690693043939332,"3304":-0.10040262984851726,"3305":0.2185507415040217,"3306":-0.13993271457617232,"3307":0.5672613618689987,"3308":0.09458815994303892,"3309":1.7286347143410246,"3310":5.262290658978058,"3311":3.6196480394336867,"3312":-0.526793553956554,"3313":-0.07333853972058955,"3314":-0.16685988281848504,"3315":-0.14131623730012915,"3316":-0.21529715771333605,"3317":-0.1492555481591605,"3318":0.7480894645852294,"3319":0.7054678515966045,"3320":0.08941535943513672,"3321":-0.10928623508835024,"3322":0.06795503795119615,"3323":-0.2885640324166299,"3324":-0.27801068961169495,"3325":0.2672340338571238,"3326":0.39899058659210435,"3327":0.16943754010122267,"3328":-1.007182652199699,"3329":-0.7607212931256974,"3330":-0.8128890913629718,"3331":-0.18798724270979045,"3332":-0.5985208536788965,"3333":0.6803930510542443,"3334":-0.8061485693411917,"3335":-0.21049983204772196,"3336":-0.11079615727689869,"3337":-0.01665884659066726,"3338":-0.21949331476518452,"3339":0.4231707152003253,"3340":-0.556918410241496,"3341":0.14205553165352067,"3342":-0.9478344200467183,"3343":-0.3435150376447712,"3344":-0.4513730651811101,"3345":-0.15188731385667847,"3346":-0.4457082376713617,"3347":-0.38196335777903584,"3348":-0.038123753128551534,"3349":-0.660913852741259,"3350":-0.4382632414368568,"3351":-0.266052904935755,"3352":0.3513877450634981,"3353":0.23666349775637172,"3354":-0.7106786363757427,"3355":0.30971602213735994,"3356":0.7335835268618052,"3357":-0.7943662615341405,"3358":-0.13945554906195562,"3359":-0.00525575885897428,"3360":0.7828785425099937,"3361":-0.267564898184972,"3362":-0.4774986257871977,"3363":0.3426104070605855,"3364":0.08553815348272466,"3365":0.2609630107811297,"3366":-1.951759687460222,"3367":-0.7682038360749014,"3368":0.2406898118581018,"3369":-1.1592577167749278,"3370":0.07847922948517946,"3371":-1.4718135436378288,"3372":0.6540471034512059,"3373":1.322115905937321,"3374":0.16475080533267025,"3375":-0.030179155216013585,"3376":-0.2406493265796024,"3377":0.17501886834218042,"3378":-0.11786126828622843,"3379":-0.8247903430758273,"3380":0.9165647967121439,"3381":1.3542636189003743,"3382":0.19739909318429516,"3383":-1.2760173313960308,"3384":0.6103940983665946,"3385":0.2146318744689385,"3386":-0.7465866934322729,"3387":0.24777160673687923,"3388":0.3969655919742663,"3389":-1.3417352781149554,"3390":0.6239005713838723,"3391":-0.951331210719,"3392":-0.48722121497661686,"3393":1.8648968421329217,"3394":1.3083712674590051,"3395":0.2517377867513598,"3396":1.040129570697267,"3397":-0.2974946552795915,"3398":1.0221922857220722,"3399":-1.7465459057991348,"3400":0.19806521139781205,"3401":1.1132360211297005,"3402":1.3137040148603,"3403":4.102340902183026,"3404":-0.18797032982720863,"3405":-0.1495359227969193,"3406":0.5276471258975229,"3407":0.5808814188051613,"3408":-0.22898196982730198,"3409":-0.8771677020924682,"3410":0.5135522064908988,"3411":1.832054110680905,"3412":1.3477092092303598,"3413":1.4894978196520718,"3414":-0.10192112912120821,"3415":-1.4361400206005583,"3416":-0.28393665933228723,"3417":-0.9768723875021361,"3418":0.14696748029688705,"3419":0.23153363589596782,"3420":0.9313403247616497,"3421":-0.07904563932967389,"3422":0.29121895796068376,"3423":-0.5617087061877676,"3424":-0.43925569273796344,"3425":-0.7793792736073676,"3426":-0.8417155570115332,"3427":-0.6832534273484049,"3428":0.19116078655968108,"3429":1.4211821207445579,"3430":-0.2660909613685351,"3431":0.0054285066682572755,"3432":0.246197209849571,"3433":-0.3138313237025633,"3434":0.6470102665107307,"3435":0.042253281690786605,"3436":-0.628248189251794,"3437":0.5167599797010431,"3438":-0.8906504248594895,"3439":1.0696715144415283,"3440":0.15338083516530515,"3441":-0.06707699122895298,"3442":0.18667586732741417,"3443":-0.8206303363058666,"3444":0.05846487714126564,"3445":-0.24321920912299905,"3446":2.1832008507585314,"3447":0.37519083446398604,"3448":0.09001848670026735,"3449":0.8260164744557363,"3450":0.9721781634283456,"3451":0.5233487806537244,"3452":-1.3027800811303931,"3453":-0.3842861270893889,"3454":2.364748046395538,"3455":-0.8742301364302711,"3456":0.28773306070243965,"3457":-0.5731478657922318,"3458":0.2410515388614312,"3459":-0.34789886281895255,"3460":-0.8611618671200717,"3461":-0.8273744399818168,"3462":0.6524218375273854,"3463":-0.6492960065497495,"3464":0.5415283064150119,"3465":0.13785983979602381,"3466":-0.27666263086372983,"3467":-0.4786028676315303,"3468":-0.3064506470201173,"3469":-0.023381116252472033,"3470":-0.3484342739665251,"3471":0.4747158936367889,"3472":0.8525157934274505,"3473":-1.6693419721573772,"3474":-2.2369603196159202,"3475":-1.768604724429631,"3476":-0.48726890063492384,"3477":-0.3645093478334522,"3478":0.19783035527391277,"3479":0.4191669202298377,"3480":-0.014770932816969732,"3481":0.9752459164964683,"3482":0.26954390630744374,"3483":-1.508624474454532,"3484":-0.335795732095057,"3485":-0.5265149982210702,"3486":-1.9821202184368563,"3487":0.9947661107825526,"3488":0.41316327711070416,"3489":0.6514219628499142,"3490":-0.9025059278325561,"3491":-1.0912195594581318,"3492":-1.3247820828012145,"3493":-1.3926623162121885,"3494":-0.46684400299854706,"3495":-1.0914745498953942,"3496":1.2059226349597554,"3497":0.8329510923890109,"3498":-0.7070990385810523,"3499":0.26669695333761384,"3500":0.14476548762817368,"3501":-1.03383712610194,"3502":0.003195001471553406,"3503":-0.17293868477415159,"3504":-0.009805966579926524,"3505":-1.7173255171242623,"3506":-0.03839885967052504,"3507":-1.0640416996013005,"3508":0.11947965260225145,"3509":0.1459697274309405,"3510":0.40965904763575184,"3511":0.41733934298962666,"3512":0.25364425412101693,"3513":-0.032931115352862764,"3514":-0.728700183035296,"3515":0.16015249647629948,"3516":0.09376557015371258,"3517":-0.6318183050604663,"3518":0.10735654044973252,"3519":-0.27417217627409135,"3520":0.7039061643256482,"3521":0.6375230666105395,"3522":1.0453744937009197,"3523":0.8303485281530134,"3524":0.688261153141439,"3525":0.15876454813170518,"3526":0.3049567440855036,"3527":-0.12401806478431192,"3528":0.18978249258727942,"3529":0.2583974003520012,"3530":-0.056729369108077715,"3531":-0.25685524565254,"3532":-0.25818619572889084,"3533":0.14085993409180772,"3534":0.2716062664927933,"3535":0.10728825406832691,"3536":-0.13426623741923507,"3537":-0.09125167876119959,"3538":0.11648137029703919,"3539":-0.09092509365056392,"3540":-0.09941782547147698,"3541":0.0973031824847523,"3542":-0.10116911133250621,"3543":0.05676194609519146,"3544":-0.07979301335519166,"3545":0.08669726654191454,"3546":-0.24237550880625117,"3547":0.008320930896280696,"3548":-0.13349462802683398,"3549":-0.325036836114068,"3550":-0.3121511039614319,"3551":-0.06687324346852003,"3552":-0.22525171667084506,"3553":0.05578188151404077,"3554":-0.14416121449182806,"3555":-0.08627111242295564,"3556":0.09879251459384049,"3557":-0.03153997737420511,"3558":0.09793279333883503,"3559":-0.08627079339858955,"3560":0.1342980000122939,"3561":0.27542950833575164,"3562":-0.1290742929524865,"3563":0.14649657650797096,"3564":-0.0639614659857412,"3565":-0.033434787089943685,"3566":0.001912198452940376,"3567":-0.06490234687342121,"3568":-0.157926966296495,"3569":-0.014192578799610537,"3570":-0.1441553181202412,"3571":-0.09806633897659704,"3572":-0.2059148060203708,"3573":-0.04272114907624512,"3574":0.2254445313725653,"3575":-0.1102774779880374,"3576":0.11883373054497302,"3577":-0.11703687744621583,"3578":0.15448622114175614,"3579":0.021347698717674234,"3580":0.17327777073876743,"3581":-0.06480029953235747,"3582":-0.27659509275960004,"3583":0.30177654127971676,"3584":0.4553236594734982,"3585":0.1729764776642306,"3586":0.22381662892783255,"3587":0.22769284456019606,"3588":0.37610653892669166,"3589":-0.01921458445668839,"3590":0.041709582747120284,"3591":-0.21557473488055326,"3592":0.2845533431106212,"3593":-0.12417146123959551,"3594":-0.07754992312394948,"3595":0.04200917029842466,"3596":0.03495134878960688,"3597":-0.04371570256005171,"3598":0.1718039501986268,"3599":0.2575670097293111,"3600":-0.07155059531683441,"3601":0.11090250448262726,"3602":0.1801744684032349,"3603":0.1415043723824414,"3604":-0.35993328155268234,"3605":0.04902213128873066,"3606":-0.3334709764563923,"3607":0.10962043661613492,"3608":0.04341675698446799,"3609":-0.32263917204479686,"3610":-0.31886523368729663,"3611":-0.9112787855273715,"3612":0.39761650407353993,"3613":0.472976144688903,"3614":-1.1222745826638525,"3615":-0.05249948461675665,"3616":-1.2106642368785399,"3617":-0.09574984785891134,"3618":0.9927534305143193,"3619":0.5430474038553887,"3620":-0.9655409787183938,"3621":-1.8797503262024433,"3622":-0.47014458891266575,"3623":0.5944592053564227,"3624":-0.0723018525025291,"3625":0.15160802922870764,"3626":0.6287978313837239,"3627":-0.5104839563550018,"3628":0.4295705708721015,"3629":1.121029993720881,"3630":1.3170381542662417,"3631":-0.8438002245069952,"3632":0.8891231330741385,"3633":-1.7860697635957576,"3634":1.9357388751500002,"3635":0.9808739742175897,"3636":-0.2809401594415951,"3637":-0.16517709821951804,"3638":1.8893054157655498,"3639":0.8535194989001346,"3640":0.8286611457996913,"3641":0.5277077323468478,"3642":-0.8144325773652678,"3643":-0.37893664548813477,"3644":-0.2432703536805187,"3645":-1.0086549305085788,"3646":-1.6047459144052585,"3647":-2.0793469480374984,"3648":-2.044579882823564,"3649":-0.9362770687536209,"3650":0.5078153486614916,"3651":0.35945953760357746,"3652":0.29313723510383366,"3653":0.48709118165367526,"3654":0.422971162368011,"3655":-0.7779904660194685,"3656":-1.8134806605155411,"3657":-2.9276772349450333,"3658":-2.884358172779005,"3659":-2.261262728542761,"3660":0.48484040371669396,"3661":-1.2197682280755164,"3662":-0.13705390271203435,"3663":-0.48687898224449006,"3664":0.7348965459486445,"3665":0.4745340215363723,"3666":0.13408112441553552,"3667":-0.41036192401046045,"3668":-0.5314719906356116,"3669":0.5593182429504504,"3670":-0.7657972484819149,"3671":-0.8876968620994976,"3672":-0.5670270558839411,"3673":0.26031945428852926,"3674":1.2552412698566608,"3675":1.0990785910885355,"3676":0.023918448888209758,"3677":0.20546945576259235,"3678":0.3141371304625126,"3679":0.7937185188011133,"3680":1.2369686538098508,"3681":-0.6912796119575739,"3682":0.3873566075555167,"3683":0.3133395711054213,"3684":0.17902202322691155,"3685":-0.10213173451887109,"3686":-0.5792797238772163,"3687":0.3587194335817236,"3688":0.4073526263282856,"3689":-0.37048156859540476,"3690":0.36966931808529013,"3691":0.6814923789667697,"3692":-0.1475255532634162,"3693":0.4897915326389745,"3694":-0.14683122471733123,"3695":-0.3665118395104267,"3696":-1.3712449903769672,"3697":-0.7337148084138201,"3698":-0.25556058914632157,"3699":0.9139559710086225,"3700":-0.23955271632313116,"3701":-0.19405846079466238,"3702":-0.7377332477947157,"3703":-0.9713617109615972,"3704":-0.13475559212174154,"3705":-0.09163212870106041,"3706":-0.4647554987188609,"3707":-0.04060677762383933,"3708":0.7299871407576685,"3709":-1.0659169978521748,"3710":1.4410293528249682,"3711":0.8121947841025571,"3712":-0.9337886502433873,"3713":0.22097343712485523,"3714":-0.2543296328888581,"3715":-0.10763045861974033,"3716":0.3018926959026592,"3717":0.0017042648972906773,"3718":-0.5400663308945765,"3719":-0.08176717465554417,"3720":-2.046342060607076,"3721":-1.4172153748786918,"3722":-0.34324945184916195,"3723":-1.1732421900844936,"3724":-0.47244226421721586,"3725":-0.39772196895123724,"3726":1.0706021285282759,"3727":-0.6901936132640694,"3728":-0.31197844690118803,"3729":0.4269816062138804,"3730":1.7543619902975067,"3731":2.2045484965420266,"3732":1.739125424430683,"3733":-0.030723024116028102,"3734":0.4622573668231989,"3735":-0.42288716456297076,"3736":0.9068365834649603,"3737":0.4098369178460159,"3738":-0.32917814489497754,"3739":2.7860919764870875,"3740":1.1923945532766465,"3741":1.2675348119736862,"3742":0.8398569960257904,"3743":-0.1272682578252409,"3744":-0.2989016352319758,"3745":0.4803015166763362,"3746":0.46575001879635264,"3747":0.284483410346534,"3748":-1.1367646319367621,"3749":0.35305658529676753,"3750":0.07058227094850525,"3751":-1.251152300340555,"3752":0.29556484571119473,"3753":-1.361225085705583,"3754":0.020967272626199563,"3755":0.8193958779147743,"3756":-0.3035912636633995,"3757":0.09467782530953256,"3758":0.4850814928813781,"3759":-0.33472831638698813,"3760":0.7807275835825107,"3761":-0.6962642977593105,"3762":-0.5586019219961387,"3763":0.9811273694547898,"3764":-1.5381371388771419,"3765":-0.7538857743413955,"3766":1.0164839274284612,"3767":0.24332933481942423,"3768":-0.010705174651005442,"3769":-0.45880073186906684,"3770":0.012429639880211549,"3771":0.4972419068562378,"3772":0.36891807379469943,"3773":-0.13150429848310674,"3774":-0.4057270521525372,"3775":0.7926244496132221,"3776":0.8670003868480225,"3777":0.38286670863941014,"3778":0.46991804888100885,"3779":-0.14676305758088143,"3780":-0.028717062209328837,"3781":-0.4804662873822835,"3782":-0.15501013894391596,"3783":-0.7798822871240615,"3784":0.6247431162815068,"3785":0.31949457696618255,"3786":0.3620949572925731,"3787":0.4831417611754035,"3788":-0.205194515360222,"3789":0.7141109957548113,"3790":-0.43882378200256317,"3791":-0.33267329663562406,"3792":0.7291499564720754,"3793":-0.19336100963761613,"3794":-0.009172760916407246,"3795":-0.9584311654203491,"3796":0.003603962021123664,"3797":-0.2441802593864489,"3798":0.6663375013034439,"3799":0.17609498231956566,"3800":0.1663193838439194,"3801":0.41204379337304675,"3802":-2.894875784936088,"3803":-1.2033221495990638,"3804":-0.45653506584835085,"3805":-0.009226419421658447,"3806":0.7266100465665813,"3807":-0.897725306981732,"3808":0.09008816430139283,"3809":-0.18167086067533988,"3810":-0.01063989911726276,"3811":-1.6345559088587398,"3812":-8.357455219847493,"3813":2.02436817948448,"3814":0.2840073258577631,"3815":0.7009870255479276,"3816":0.41320908397201844,"3817":0.44613555513941755,"3818":0.06045094220916648,"3819":0.004662961320476331,"3820":-2.4601843547221915,"3821":-1.1494256569448313,"3822":-1.1482018200838493,"3823":-0.294855804619446,"3824":-0.24950955804375638,"3825":-0.08746964458278214,"3826":0.4976305142635836,"3827":0.24767065876953567,"3828":-0.46843758313725126,"3829":-0.4736728081061211,"3830":-0.33955463294309307,"3831":-1.108540065538378,"3832":-0.33394884057348806,"3833":0.33797754999648416,"3834":-0.4050534045191527,"3835":-0.32132263754633317,"3836":0.22091707714778314,"3837":-0.009378610397703924,"3838":0.5607290655631678,"3839":-0.03740017472582086,"3840":-0.5431213501934081,"3841":0.013225165588284316,"3842":-0.7756597029763613,"3843":-0.24890037379099722,"3844":0.143814925930653,"3845":-0.1912192064837949,"3846":-0.515165103044529,"3847":-0.15164265146348088,"3848":0.08135779752804467,"3849":-0.37700202065341976,"3850":0.03845006749015886,"3851":-0.33666613552970936,"3852":0.42902655495488856,"3853":0.1644147996239974,"3854":-0.4728663730753286,"3855":0.49112719138432026,"3856":-0.18776946437609535,"3857":0.16126019294764296,"3858":0.5779678266723104,"3859":0.8430686481892478,"3860":0.14601224951647837,"3861":0.3002191255247912,"3862":0.7738294327804806,"3863":0.0599007653285313,"3864":1.1817912389067486,"3865":-1.1108259452684617,"3866":-0.30395394291640315,"3867":0.01709717606292033,"3868":-0.5412915717391505,"3869":-1.2063499370684383,"3870":0.07139014665880854,"3871":-0.4782997528153167,"3872":-0.1280567869662258,"3873":0.14694881538030724,"3874":-0.28039793104326155,"3875":0.11908856159663048,"3876":-0.34253745432274285,"3877":0.3564955497753636,"3878":-0.46459624617513656,"3879":-1.1484591856577593,"3880":-0.37701294251132933,"3881":0.5164872740814983,"3882":0.0009285618547831367,"3883":0.05188430955293065,"3884":-0.43216906581198916,"3885":-0.8612213036530098,"3886":-0.874019065673561,"3887":-0.5960778649678031,"3888":-0.9876103256877865,"3889":0.21762745181480417,"3890":-0.5838891088956887,"3891":-0.8655794138456044,"3892":-0.2307197964433851,"3893":-0.509407238709571,"3894":-0.9400906776647906,"3895":-1.0706965026290343,"3896":-1.0382859780933187,"3897":0.1415265022562104,"3898":-0.09758191179133771,"3899":0.888707911552459,"3900":-0.35568450030643833,"3901":4.262192472918262,"3902":2.926220875132231,"3903":2.3734430163010165,"3904":1.3801325999820762,"3905":-0.6607169674232608,"3906":-1.6253767843012057,"3907":0.5897835847984003,"3908":0.7329557920011575,"3909":-0.38362018446888174,"3910":1.089116010221193,"3911":1.7537665253741483,"3912":1.4302865643948133,"3913":-1.1358425990999423,"3914":1.6126249282814498,"3915":0.7466145297866412,"3916":-0.699816591487247,"3917":0.33385028092082936,"3918":-0.9456391243719546,"3919":0.1315808494894638,"3920":0.712541526537189,"3921":-0.7589975584007362,"3922":-0.1525261972199458,"3923":0.8430129677805639,"3924":0.1009956732365915,"3925":-0.44444374008487164,"3926":-0.05482569248809437,"3927":0.43694014361526173,"3928":-0.23206515393944266,"3929":0.020835517479268817,"3930":0.06186193021275967,"3931":-0.5741460282098462,"3932":-0.7486689767913189,"3933":-0.7977511280636592,"3934":0.6228437747835822,"3935":-0.41972892666047235,"3936":0.6955682079323371,"3937":0.9171046522737826,"3938":-0.06301614954783682,"3939":0.18241698625489308,"3940":-0.017541311695939227,"3941":-0.7838485108949418,"3942":-0.26593902687364435,"3943":-0.8122607085469926,"3944":-0.5930806890177964,"3945":0.13054875472307267,"3946":-0.33507646158960763,"3947":-0.7355100571782095,"3948":1.4718645074002754,"3949":0.6770856779199277,"3950":0.41748889342741513,"3951":1.5290078241041267,"3952":-0.5641534585437428,"3953":-0.726006605643719,"3954":0.9411169901876408,"3955":-0.3693856404014088,"3956":0.8898093837920792,"3957":0.9485788629511442,"3958":-0.3249561109809519,"3959":-0.18103452280468002,"3960":0.28112656949410314,"3961":0.007429368715176066,"3962":-1.708980141099922,"3963":0.043302434630581255,"3964":0.014777122976325864,"3965":0.39430848531235707,"3966":0.41352727334145684,"3967":1.009486051629228,"3968":2.4026456193411065,"3969":1.1153204511255688,"3970":-0.2288529416435537,"3971":-0.8944367387544806,"3972":-1.621496193076261,"3973":-0.516232940588515,"3974":0.6920707759393386,"3975":3.610548244409821,"3976":4.623444768592886,"3977":2.7069401052366064,"3978":0.384938998962904,"3979":-0.2125571323110767,"3980":0.09205904277631381,"3981":0.049618640539187464,"3982":-0.6819785078428997,"3983":-0.10480705200525903,"3984":-0.7495008411087761,"3985":-0.016780123094885975,"3986":0.3171022047745012,"3987":-0.9552037195523336,"3988":-1.1377111953290093,"3989":0.778470693135543,"3990":0.31150400035399023,"3991":-0.34548574349265193,"3992":0.21765410038053506,"3993":-0.8409007153576513,"3994":-0.4749421470482787,"3995":0.29395279439350464,"3996":-0.27298608822920356,"3997":0.08861837771833447,"3998":0.12296207725217392,"3999":-0.5453054363371237,"4000":0.805861177919339,"4001":-0.7205323889951156,"4002":0.5052629883813858,"4003":0.5750475496682497,"4004":-0.45678840881970484,"4005":0.6317320783106966,"4006":-0.42625735962998573,"4007":0.5844986325173304,"4008":-0.9971994729547539,"4009":0.8336288707349537,"4010":0.2796771284724478,"4011":-0.37471586146793345,"4012":-0.40487748018834413,"4013":-1.2853257231615836,"4014":0.3673006610685955,"4015":-0.26586019797560956,"4016":0.8013511711785978,"4017":-0.06550446656492184,"4018":0.2763105290959804,"4019":-0.5245685003887334,"4020":0.4421156864678302,"4021":0.6575589718247751,"4022":-0.5500063117544248,"4023":-0.0007604174762221665,"4024":0.18442486029771038,"4025":-0.27180740053288055,"4026":-0.5167013786439151,"4027":0.22433861701634233,"4028":0.7561800773783529,"4029":0.8322767617266853,"4030":-0.10766545708426845,"4031":0.006322882322736907,"4032":-0.43295848770543255,"4033":-0.41557615742865717,"4034":0.2874627085111239,"4035":-1.0124716983711624,"4036":-0.585611122736616,"4037":0.15786645366585078,"4038":0.22813961012177314,"4039":0.1175177567418367,"4040":-0.23071488522319775,"4041":-0.7783518944580681,"4042":-0.024120341246160172,"4043":-0.12091446533518457,"4044":0.16410032673965358,"4045":-0.16967070871112444,"4046":-1.2210062455805875,"4047":0.45251274562118904,"4048":-0.13431175263742107,"4049":0.5447612902704577,"4050":-0.1542683037758193,"4051":-0.048378645738390395,"4052":0.9852628860050399,"4053":-0.5007586148350914,"4054":0.19410648273803255,"4055":0.6988820278151049,"4056":0.8596723085137175,"4057":0.37081546958552997,"4058":0.36242205710538083,"4059":-0.2673906143700083,"4060":0.038609663119718377,"4061":0.00519182296470553,"4062":0.35451137096060154,"4063":-0.9234748888078321,"4064":0.7140876225908631,"4065":-0.10090719258355993,"4066":0.7309729916822306,"4067":-0.5595805240225421,"4068":0.26682201518990534,"4069":0.2855847050163437,"4070":0.11665626738789159,"4071":0.35416493672658467,"4072":0.24064370867546123,"4073":0.010112117266279452,"4074":0.1867935388217762,"4075":-0.2841799101273415,"4076":-1.3617745609551795,"4077":0.2588804163657311,"4078":-0.9453643473308547,"4079":-0.07831830593315123,"4080":0.3274982822578849,"4081":-0.23448313645258187,"4082":0.1832058840153966,"4083":-1.0532844460231057,"4084":0.02500864918593701,"4085":-0.15968372107709367,"4086":0.20153438568716756,"4087":0.6263284181140687,"4088":-0.19748531815400983,"4089":-0.053091947263429896,"4090":0.2760984466307997,"4091":0.42691694799582464,"4092":0.5675876837670185,"4093":0.6641989192904696,"4094":0.6891751668090627,"4095":0.09000057478661994,"4096":0.09581791303343432,"4097":0.19842503602301087,"4098":0.2728517258097773,"4099":-0.006344667187184785,"4100":-0.23467990303190525,"4101":-0.22995828094652734,"4102":0.9106426456135065,"4103":-0.8744762416106757,"4104":-0.2582768102061658,"4105":-0.39379096002145164,"4106":-0.2274325695778522,"4107":0.005947246585131991,"4108":-0.8529672782782327,"4109":-0.43868981850359073,"4110":-0.059900974818284214,"4111":-0.381175791754329,"4112":-0.0701513003423094,"4113":1.1976466400918913,"4114":0.4079580781645806,"4115":-1.044350700061874,"4116":-0.6721980252974941,"4117":-0.2708694264234616,"4118":-0.46788540257820205,"4119":0.7165638389229013,"4120":0.8998243764295193,"4121":0.1672172193240044,"4122":1.767610252312885,"4123":1.3787045531967306,"4124":-1.0259988879481081,"4125":-0.6393534685595805,"4126":0.1331144227324176,"4127":-1.2639011641821678,"4128":0.8769339028753032,"4129":0.4318660179477798,"4130":2.3854749915140596,"4131":1.7099468190271518,"4132":-0.12365074314791429,"4133":-0.2494386871691373,"4134":-0.90195017445967,"4135":0.6011930294713195,"4136":0.6110243870429495,"4137":0.6734400531326332,"4138":0.20781387335890583,"4139":0.08479472940073811,"4140":-0.8998918861065154,"4141":0.2662600416984893,"4142":0.5322072135259434,"4143":-1.005350805629374,"4144":-0.5105286859464755,"4145":0.6512453687456308,"4146":1.3325821195926504,"4147":0.2814445117746803,"4148":-0.8228503893566493,"4149":0.5469954042208125,"4150":-0.11315709934307716,"4151":0.6753987014175719,"4152":-1.4184095866377502,"4153":-0.5135613457583146,"4154":1.4584310671696252,"4155":-0.9678904418271209,"4156":-1.0244895354495418,"4157":-1.0122399315385922,"4158":-0.7834613795576983,"4159":-0.4612235851119187,"4160":0.4433134363926436,"4161":-0.9273613542866872,"4162":-1.488633082731724,"4163":0.5621022195077082,"4164":0.35607347987305216,"4165":-0.9649950845221615,"4166":0.2012884443373148,"4167":-0.7223518227346546,"4168":-0.5475115043230001,"4169":-0.5200163739239931,"4170":0.24520173531068093,"4171":-0.6188652194839068,"4172":0.7128268792614365,"4173":-0.430449532563832,"4174":-0.7508516738511555,"4175":0.15520489208259214,"4176":-0.8942414828788472,"4177":0.8310743527034236,"4178":0.3937999352210231,"4179":-1.2955059138877858,"4180":-0.4399086316397981,"4181":0.3152820294420853,"4182":0.013109026588463916,"4183":0.4747754519372819,"4184":-0.6039974488855271,"4185":-0.1876574585841842,"4186":-0.11718261165908336,"4187":0.15199184548726688,"4188":0.6484886779280475,"4189":-0.4160414313918485,"4190":-0.5724149842476524,"4191":-0.415189540129206,"4192":0.3312750522807841,"4193":-0.18663447936109026,"4194":0.12206567371696393,"4195":0.28680440190332546,"4196":-0.5665437005784838,"4197":-0.8757579347215042,"4198":0.49524113614338466,"4199":0.1581918882735356,"4200":-0.7108221728930022,"4201":0.32020229754907387,"4202":-0.417841149484754,"4203":-0.3685236693694684,"4204":-0.5691864491363463,"4205":0.20759081042297425,"4206":0.37653712360160363,"4207":0.6410318272659923,"4208":0.051815024275520545,"4209":-0.8720722442703908,"4210":-0.08124334344433698,"4211":0.699944860512415,"4212":-0.02363904799308555,"4213":-0.8313005814241272,"4214":0.17658305634716776,"4215":0.8988447017226363,"4216":0.5318068274078117,"4217":-0.35789658996381274,"4218":0.1716746316419127,"4219":0.12810236364053276,"4220":0.04009679741964419,"4221":-0.3809613680190029,"4222":6.070689429621071,"4223":8.029694184501647,"4224":2.916517218814139,"4225":1.4339046495533396,"4226":0.20983334483627086,"4227":0.33842984277897686,"4228":-0.35050477159302634,"4229":0.5560138446175931,"4230":-0.5148619464635614,"4231":-3.009895583358611,"4232":-0.7278325353294811,"4233":0.09772191329437285,"4234":0.17092620168914766,"4235":0.7602453037861803,"4236":0.08938256773193604,"4237":-0.37554476466756703,"4238":0.5522628570262386,"4239":-0.19811005861047296,"4240":-1.2052945535607198,"4241":-0.07478457876188276,"4242":-0.6454622702159227,"4243":0.24512106678882895,"4244":0.5935150955704621,"4245":-0.23579351971846688,"4246":-0.8778103528467044,"4247":0.3039697048161218,"4248":0.2632793433844413,"4249":1.1640034848283975,"4250":-0.17706735780575183,"4251":-0.18720884806757884,"4252":0.2948910243038624,"4253":-0.2086726455348958,"4254":0.5501670607672913,"4255":-0.6728634439692113,"4256":-0.5208589995522599,"4257":-0.3836191802535944,"4258":-0.25325278921814093,"4259":-0.27647310808700987,"4260":-0.39936990405194933,"4261":-0.8633535980801329,"4262":0.44817548769721516,"4263":0.17932770010723414,"4264":-0.36684141227178546,"4265":0.47924699383270375,"4266":0.0718134767459449,"4267":-0.354915661116395,"4268":-0.3824627863930198,"4269":0.8598496054929817,"4270":-0.18659298842168964,"4271":-0.13622436688184822,"4272":0.6513400562568339,"4273":-0.5675303487299169,"4274":-0.6828805532046863,"4275":0.34556532222375136,"4276":0.07652578454218206,"4277":0.06524565676696069,"4278":-0.5863809786773213,"4279":1.045382148290254,"4280":1.0208738921428049,"4281":1.3795637782147319,"4282":1.1624016676968845,"4283":0.931470386332445,"4284":-0.020183067689422837,"4285":-0.03518144225467294,"4286":-0.3417293943805557,"4287":0.584856543959739,"4288":0.6685077717478157,"4289":-0.58131479985134,"4290":0.22174949331468413,"4291":-0.5766507146251123,"4292":0.6364096618824394,"4293":-0.24110757125542143,"4294":0.9374230960415764,"4295":1.8601781484034623,"4296":2.165432973568086,"4297":-0.11208433561462103,"4298":-1.0132844268670576,"4299":-0.9729413418748655,"4300":-0.4710208189449882,"4301":0.9466353523346164,"4302":1.756620638601536,"4303":0.15194810987838428,"4304":-2.552239893988089,"4305":-4.190138686752509,"4306":-3.7075451384466867,"4307":-0.33205100964462325,"4308":0.17932419406284458,"4309":0.7915295793274981,"4310":-0.7681130218546506,"4311":-0.5528919396735524,"4312":0.45722546361107225,"4313":0.2756839008473511,"4314":0.6488034945360364,"4315":1.6709115949376263,"4316":0.04441244273560174,"4317":-0.4691837813007764,"4318":0.12018196128668189,"4319":-0.6129214756918313,"4320":0.5554517119944264,"4321":-0.18703603377053055,"4322":0.07904142278750793,"4323":0.3639011994282182,"4324":-0.31367263536470197,"4325":-0.39104965515262796,"4326":-0.11482865246929203,"4327":-0.28654950506361027,"4328":-0.6654172501435016,"4329":-1.0181615205023196,"4330":-1.3091393011801575,"4331":-0.680763814283595,"4332":-0.5120792247957333,"4333":0.48656606443475914,"4334":0.6638234093298383,"4335":-0.20255552578396835,"4336":0.4261888302679449,"4337":0.31210438344677444,"4338":0.620089326833642,"4339":0.6091445822397988,"4340":-0.9101448361380964,"4341":-0.23359945755045172,"4342":-0.6053331455312861,"4343":-0.768799831921349,"4344":0.7478940064587811,"4345":-1.2032657581567423,"4346":0.4640470272710782,"4347":-0.1009163053797503,"4348":-0.668105921842814,"4349":-0.4383834999070131,"4350":0.0038189073602832033,"4351":-0.9862952625548085,"4352":0.2638475844411534,"4353":0.02366373928557026,"4354":-0.5950262136813486,"4355":0.22524744105692368,"4356":0.5424054656251704,"4357":-0.36333778394924676,"4358":-0.5430577327648769,"4359":0.5170372889426643,"4360":0.43242378622360556,"4361":-0.4838091258908706,"4362":0.6958711893511562,"4363":-0.46469796750909764,"4364":-0.7041939276142221,"4365":0.15188645795301733,"4366":1.42127724034771,"4367":1.441204822025555,"4368":1.069904434561195,"4369":1.8079401400209367,"4370":1.3984143705251915,"4371":-0.30047267962853597,"4372":-0.32116107842638575,"4373":0.40461203386798755,"4374":-0.14801966441546552,"4375":-0.9385016231803659,"4376":-2.9951710849429185,"4377":-3.1930780277883586,"4378":-4.874217275553304,"4379":-2.9839108565921033,"4380":-1.2562914422501712,"4381":-0.8803164357706674,"4382":-0.32955393993648946,"4383":0.14600025675740522,"4384":-0.3331931562365156,"4385":-3.4296680060116866,"4386":-2.0170595920029006,"4387":-0.459903715556493,"4388":-0.07601012155277131,"4389":0.5724473002973484,"4390":-0.572630854447073,"4391":0.1441110036060428,"4392":0.4007562004257142,"4393":0.38083807538664954,"4394":-1.0059930415637262,"4395":0.5657586033553708,"4396":0.47729663743876877,"4397":0.11834219505927848,"4398":0.534740267243887,"4399":-0.13846466421847542,"4400":-0.41592750932868794,"4401":-0.5437060870608738,"4402":-0.19243724965397732,"4403":-0.11295508647557043,"4404":-0.2615050561010228,"4405":0.7685869809136093,"4406":0.5474385829573121,"4407":0.41134409882341766,"4408":-0.14415052545171106,"4409":-0.5535951915934065,"4410":-0.8116009064550674,"4411":0.44116160660791254,"4412":-0.3815381721843566,"4413":-1.0579833432254064,"4414":-1.3436356784532941,"4415":0.05411158847093156,"4416":0.7383793275567311,"4417":-0.12319154540180986,"4418":-0.027834721123694433,"4419":0.39567632804411484,"4420":-0.1224199178760177,"4421":0.017729308554818503,"4422":0.5835700387426398,"4423":-0.14637501121990684,"4424":-0.18410374528423845,"4425":0.8378564182412278,"4426":-0.5847522544056322,"4427":0.10705813316262797,"4428":-1.296898106948585,"4429":-0.7682377249786756,"4430":0.2546631912265939,"4431":0.5247389824767317,"4432":-0.2987276780869837,"4433":-1.2198188714806868,"4434":-0.5007829392966726,"4435":0.7122829204909886,"4436":-0.06798337154790471,"4437":2.353780660792683,"4438":-0.33494474004387376,"4439":-0.5121644022905217,"4440":0.501621072239729,"4441":-0.2603385016894758,"4442":-0.46290505471367543,"4443":-0.13585605560815406,"4444":0.3579948673925507,"4445":-0.42063441442584226,"4446":0.08593244282219559,"4447":0.6490996271973946,"4448":-0.5022250350041287,"4449":-1.2632744876575899,"4450":-0.7158150817600853,"4451":0.5192862492332033,"4452":-0.14059484020147936,"4453":0.07305878691360515,"4454":-0.8785747401178355,"4455":0.07832272851583956,"4456":1.0076784339622755,"4457":1.2797356711685244,"4458":-0.00563238137470844,"4459":-1.4553816968528108,"4460":-1.3723851391133162,"4461":-1.1708592449575013,"4462":-1.9037193450062926,"4463":-0.7280057013940016,"4464":1.0132725026723661,"4465":2.3082305250571173,"4466":0.7366440734016374,"4467":0.39848565842949235,"4468":0.6658575376271139,"4469":-0.6652045889035658,"4470":0.8668274205313183,"4471":0.31981126319086317,"4472":-0.30092668279913937,"4473":0.8335162760540435,"4474":0.9022517821859931,"4475":-0.7925834371160748,"4476":0.41771385126398164,"4477":2.084513209262787,"4478":-0.5453648465484495,"4479":0.06414733859969131,"4480":-0.8457410523710998,"4481":-0.0013658296408564363,"4482":-0.19493273207607767,"4483":-0.8060138890715296,"4484":0.6166579200455832,"4485":0.2290348200668435,"4486":-0.05751661066399966,"4487":0.7725747518933961,"4488":-0.3174615683747534,"4489":-0.2299380239005148,"4490":0.7416052917789292,"4491":-0.7772494873196963,"4492":-0.9395575662670395,"4493":-0.6304047396043387,"4494":-0.06010808672975094,"4495":1.0715632662745624,"4496":-0.3867180404960916,"4497":0.5166214647683544,"4498":0.13296314789402827,"4499":0.1561550041817884,"4500":-0.04563031599485436,"4501":-0.04837680009998518,"4502":-0.18836618971699393,"4503":-0.4269240919273632,"4504":0.027970954669406117,"4505":1.777980732056082,"4506":-0.6261536711848388,"4507":-0.2308914742020187,"4508":-0.9244744549553159,"4509":-1.0532010230669917,"4510":-0.08840899325922758,"4511":-0.903123346282061,"4512":-0.4246408055599001,"4513":-0.49843081688885527,"4514":-1.215522088314265,"4515":-0.9458657869875209,"4516":0.5227050739032442,"4517":0.9449212933800811,"4518":0.18102931147050488,"4519":0.3115465236533392,"4520":-0.48032109629600545,"4521":-0.7648470823470793,"4522":1.4959283402155974,"4523":-0.5848224264791898,"4524":-0.34133958939677495,"4525":0.7659183634002455,"4526":0.18913162700625005,"4527":1.0575103899197515,"4528":1.719735833802094,"4529":-0.20268492629853554,"4530":2.0185069928062407,"4531":0.3269755132290549,"4532":1.1416877657725568,"4533":1.6725510857621713,"4534":-0.1710709718712909,"4535":-0.04648129946932884,"4536":0.0934051686338369,"4537":-0.2519865029371565,"4538":-0.9598430228254586,"4539":2.2300325050394316,"4540":4.065627467703966,"4541":2.278769344644326,"4542":0.07452202839935625,"4543":-1.1232262410840328,"4544":0.1455750514637499,"4545":-0.5541784836628442,"4546":-0.023364050119674355,"4547":-1.192404933717969,"4548":-0.45989432733905056,"4549":-2.33602396924632,"4550":0.34065207992161983,"4551":1.0352670498636274,"4552":-0.31186147529854147,"4553":-0.09792053697281865,"4554":0.45480256535870656,"4555":-1.3057599778439404,"4556":-0.07082295816790082,"4557":-0.6357459895134776,"4558":-0.15780871682552827,"4559":0.45755262700725974,"4560":-0.9516960610191665,"4561":0.2817818809930409,"4562":-0.6388117778220351,"4563":1.0941472148031093,"4564":0.04123200441930635,"4565":-0.6091921609992512,"4566":-0.4509090513571378,"4567":-0.8994738903044616,"4568":0.17323724726612288,"4569":0.3720357138731105,"4570":-0.4728235968465608,"4571":-0.7849687331708441,"4572":-0.05063275134701308,"4573":-0.6107549849920911,"4574":0.358317201071163,"4575":0.4001546812187101,"4576":0.9725293355232697,"4577":-0.27414734481782005,"4578":0.12660066752275137,"4579":-0.33129941608356833,"4580":0.4461025601796368,"4581":-1.0870235602586535,"4582":-0.15740725852304024,"4583":-0.4382897910780898,"4584":-0.009986049807447845,"4585":-0.12227053822413908,"4586":-0.29423619847549876,"4587":0.389704560649936,"4588":0.27124899478699904,"4589":0.7806674549509653,"4590":0.4260999013073509,"4591":0.022770512732085614,"4592":0.2927836720514893,"4593":-0.5630708803992686,"4594":0.9536769383707129,"4595":-1.243202249327865,"4596":0.969078487674153,"4597":-1.0709745690212595,"4598":0.7895766152516118,"4599":0.1563253021234151,"4600":-0.03346752254392044,"4601":0.27579596234651665,"4602":1.0935119584723658,"4603":-0.359777947188802,"4604":-1.4585060682858606,"4605":-0.25439673494089443,"4606":0.4780104449675311,"4607":-0.9641887266125164,"4608":0.46930076167024715,"4609":0.8521014328686716,"4610":0.1878535928133065,"4611":0.27390914719070675,"4612":-0.5295924461178132,"4613":-1.24666712511647,"4614":-0.6142680926600149,"4615":-0.5172996585936321,"4616":0.26792564462940077,"4617":0.3924340644753347,"4618":1.2759549164576567,"4619":-0.8568332414047156,"4620":1.230436674776882,"4621":-2.5767103501023114,"4622":-0.6840461637405978,"4623":-0.55127966616369,"4624":0.8561943324987703,"4625":-0.1702621354147413,"4626":-1.4964275280821868,"4627":0.5675390196972809,"4628":-1.1867817123435231,"4629":1.2374570901051833,"4630":0.25945764312241076,"4631":1.6129126742477333,"4632":1.267363035574107,"4633":1.1509723501175662,"4634":0.07231112183747954,"4635":0.39551513422465023,"4636":0.7023686496720682,"4637":0.33786317187962406,"4638":1.0535117351225434,"4639":-1.3180976959474187,"4640":-1.234287874902251,"4641":-0.6750351098137373,"4642":0.1179477979415892,"4643":0.822474083239933,"4644":0.3693151793180918,"4645":-0.5481800247116316,"4646":-0.8185131515113871,"4647":0.1366008494767374,"4648":0.13662766404232293,"4649":-0.8293782692235965,"4650":0.5473111757735247,"4651":0.5506443973141859,"4652":-0.8952197702798068,"4653":0.8768685702610515,"4654":0.33786061128666234,"4655":0.597582591493244,"4656":0.584095024242484,"4657":-0.39044241761632925,"4658":0.7577118547910108,"4659":1.424779419092118,"4660":-0.052541503797659636,"4661":0.965429159988686,"4662":0.2761808951396448,"4663":0.408914114894655,"4664":1.8681336012806942,"4665":0.2692901632075452,"4666":0.4959949021082104,"4667":-0.253968519560887,"4668":0.4690018788310061,"4669":1.2560856350269365,"4670":0.9662345280573575,"4671":0.34488484839637634,"4672":0.035624938745580065,"4673":0.47278293355290885,"4674":0.14489801480828463,"4675":0.40143011496884634,"4676":-0.10673380692431811,"4677":-0.7363785294452111,"4678":0.12715889106343398,"4679":-0.10975496008527272,"4680":-0.03811930500848513,"4681":0.16498830231084446,"4682":0.15741389846856038,"4683":0.008975603072015934,"4684":0.019132917182337287,"4685":0.3274981225466638,"4686":0.2610859729223579,"4687":0.21219452107466855,"4688":0.49123360335234395,"4689":-0.01706458201245077,"4690":0.28807942511150064,"4691":0.271512659280271,"4692":-0.2916908924560878,"4693":0.2513168998089451,"4694":-0.5887028320230492,"4695":-0.1629363241617116,"4696":-0.3196432299015428,"4697":-0.17555490904805507,"4698":-0.5005388076493837,"4699":-1.2909926906757059,"4700":-0.23420182671680667,"4701":-0.26997449757869235,"4702":-0.2723512538510886,"4703":-0.2366108633206804,"4704":-2.0099473972619113,"4705":-2.9644594007917817,"4706":-1.627204710967468,"4707":-0.614731571467741,"4708":-0.8794960426902314,"4709":0.04343794548486519,"4710":1.0417084076115646,"4711":-0.3420491934874769,"4712":0.0863046364141633,"4713":1.458037399606141,"4714":-5.8849836999881955,"4715":-2.1078713726436833,"4716":-0.37530487871031665,"4717":-0.04531567487198255,"4718":-0.4790874137388561,"4719":0.07235636173004678,"4720":0.06044888198734286,"4721":-1.18034561935248,"4722":5.51132388922699,"4723":2.408032619626509,"4724":1.608692815181548,"4725":0.5014370614890189,"4726":0.45718405757876324,"4727":0.22478012693024244,"4728":-0.19722090488826322,"4729":0.6535502368475009,"4730":-0.5052720917024205,"4731":-0.24772972693445464,"4732":-0.26829825856292344,"4733":-0.3440412506022002,"4734":0.16076882697508818,"4735":0.11108187358032387,"4736":-0.07120343792679422,"4737":0.5174983114455192,"4738":-0.2787448034584663,"4739":0.8509599135356313,"4740":0.04215625459050722,"4741":0.8353702429061658,"4742":0.17163031589006597,"4743":-0.5137140688085334,"4744":0.07589876693341632,"4745":0.415774916929857,"4746":-0.8155916129872505,"4747":-0.2672521275497163,"4748":-0.5632668860338348,"4749":-0.024990871918355036,"4750":0.08428902105916018,"4751":-0.1087351862325234,"4752":-0.5907369145637709,"4753":-0.2799665569749661,"4754":0.485550711389181,"4755":0.6084103915841316,"4756":0.7627596226185062,"4757":1.0430651880878978,"4758":-0.16100201000131953,"4759":-0.14252521570310228,"4760":0.15994303915551464,"4761":-0.9329674028592949,"4762":-0.5155209086725936,"4763":1.0141190187799185,"4764":-0.017348082803276293,"4765":1.2093139135580717,"4766":0.7673688154788353,"4767":-0.37180585452452725,"4768":1.7692210124442846,"4769":-0.06246250788113719,"4770":0.31529036273066685,"4771":0.3749312499197827,"4772":0.24500998563998508,"4773":1.0685175457960747,"4774":0.12633549511585354,"4775":1.1348231696431375,"4776":-0.5512786192280721,"4777":0.5306678311345624,"4778":-0.492350453578505,"4779":0.592318279070501,"4780":-0.3547938411996924,"4781":-0.9431589887476366,"4782":0.41783243070833914,"4783":0.3130256089901503,"4784":-0.4154952312098233,"4785":1.779573254711731,"4786":-0.1967789617123416,"4787":-0.5487532328588248,"4788":0.45043026934458746,"4789":-0.23654752323724892,"4790":-1.107101720680204,"4791":1.1253770722423535,"4792":-0.36978400096155195,"4793":-2.0391284950917696,"4794":-2.3688820054120567,"4795":-0.5193109183616353,"4796":-1.2424262864470241,"4797":-0.2564778238670498,"4798":-0.7650646753720076,"4799":0.004341339753633576,"4800":1.1400116396591808,"4801":-0.7056046549787734,"4802":0.8539654340519621,"4803":0.15425588573341031,"4804":-1.1139749184048076,"4805":-0.024253181859067555,"4806":-0.7638610956444571,"4807":-0.6052129055971361,"4808":-0.5889864187895254,"4809":0.15062793737704255,"4810":0.09480859390497881,"4811":0.30006634767360896,"4812":-0.9028001053906444,"4813":-0.6798057287308357,"4814":-0.5165690095360339,"4815":0.14597903043664934,"4816":-0.05904513004358866,"4817":0.5396028796763588,"4818":-0.501736097039697,"4819":-0.6532142992758597,"4820":-0.6055415328579964,"4821":0.08757317240115813,"4822":-0.3115874651491981,"4823":0.8470797580023679,"4824":0.9346465666711994,"4825":-0.529295523140511,"4826":1.2565048272288006,"4827":0.4359806132522472,"4828":-0.9743932598283895,"4829":0.07281592472442362,"4830":0.4835320960949629,"4831":-0.9070085069380259,"4832":-0.445853641147125,"4833":0.006866140752861118,"4834":-0.7429724971543574,"4835":-0.13207094232464908,"4836":0.3217110915467013,"4837":-0.6379352376186814,"4838":-0.5540382274125688,"4839":-0.9454603947012099,"4840":-1.163489261751429,"4841":-0.4219259750826134,"4842":-0.7655476644057236,"4843":-0.3467120191737196,"4844":-0.20387744071634167,"4845":-0.16866497065180622,"4846":-0.37375274747314724,"4847":-0.6597173514016328,"4848":-0.45758625669747494,"4849":0.9022236959258964,"4850":-0.4145801783496568,"4851":-0.3755699602184769,"4852":-0.2792072675518733,"4853":-0.3212323726956384,"4854":-0.22969867486791254,"4855":-0.150050981375254,"4856":1.107868622282901,"4857":-0.7001990378326495,"4858":-1.0511219843108144,"4859":-0.8038165096016862,"4860":-0.6954891080435862,"4861":-0.34910594832716024,"4862":-0.46011284851158674,"4863":-0.2897905698946658,"4864":-0.254151552648977,"4865":-0.9440236163885513,"4866":0.543329341037941,"4867":-0.4910733396467346,"4868":-0.6071803815317056,"4869":-0.7171585055998421,"4870":-0.3845235211241275,"4871":-0.27838899430542247,"4872":-0.20553264774619795,"4873":-0.26829122366635916,"4874":-0.0050570503388321095,"4875":-0.8663828361666015,"4876":2.625141963389723,"4877":0.1668050608033602,"4878":-0.6053051075782736,"4879":-0.17646099144633814,"4880":-0.24392926419507524,"4881":-0.2855417580197994,"4882":-0.2734323892293156,"4883":0.5716507104031902,"4884":0.8729950319044426,"4885":-0.5459135703598121,"4886":-1.111149874073455,"4887":-0.988419033100027,"4888":-0.4444470939418102,"4889":-0.2740917858861317,"4890":-0.17385798912269976,"4891":-0.26478078947212996,"4892":0.5184298340946666,"4893":0.4160776972387617,"4894":1.8818552363283432,"4895":-0.9131930868519591,"4896":-0.7963723515909871,"4897":-0.46333027904304025,"4898":-0.2261904257025013,"4899":-0.159225435304838,"4900":-0.1366824032670705,"4901":0.02278056449319502,"4902":-1.1612809434310374,"4903":0.1718237245601764,"4904":-0.7826835227530899,"4905":-0.6015587526659124,"4906":-0.32610253207836837,"4907":-0.1234339287219793,"4908":-0.353120725730369,"4909":-0.3259933919920565,"4910":0.017607509797620446,"4911":-0.4811461318776168,"4912":-0.4190378756850263,"4913":-0.12781262102860233,"4914":-1.077325030399997,"4915":-0.4706683121186308,"4916":-0.29200794699327326,"4917":-0.17232086381181494,"4918":-0.346588831049381,"4919":-0.6085794277743399,"4920":-0.007785279739876495,"4921":-0.16072767928493273,"4922":-0.8934426157735452,"4923":-0.30321611428864953,"4924":0.23873995086646535,"4925":0.8098490527898095,"4926":1.0292058917221605,"4927":0.2233057908456634,"4928":0.3192472466624468,"4929":0.38954536859769634,"4930":-2.061369131897208,"4931":0.29314524691646393,"4932":0.38301790696905974,"4933":-0.06691671476787119,"4934":1.0440379002377502,"4935":0.06604084690739614,"4936":0.8935331940130633,"4937":0.5618052417684823,"4938":0.29151867382591223,"4939":0.22010058985514067,"4940":-0.1174960368291384,"4941":-0.5425493522897257,"4942":-0.6123139066346989,"4943":-1.4468978708306723,"4944":-0.39676940621303336,"4945":-0.041877850646065494,"4946":-0.6934896551068005,"4947":-0.12392304079895337,"4948":1.6941051747411662,"4949":-1.2234394786137912,"4950":-2.870971731154858,"4951":-1.5791094342798522,"4952":-3.292095855516152,"4953":-0.9354079108083458,"4954":0.5984230516202371,"4955":0.1965892686743862,"4956":0.09021522267520773,"4957":-1.1686523450178878,"4958":-0.02556011567729146,"4959":-1.759542690003693,"4960":-0.40743949160363535,"4961":-1.0699835575450323,"4962":-0.4172759708005231,"4963":-1.1173307185264967,"4964":1.0153414852077491,"4965":-0.1130856282217422,"4966":1.1368920130661861,"4967":-0.7357970196255306,"4968":-0.5546159682674501,"4969":-0.655889809771724,"4970":-0.5786732095834448,"4971":-0.30607061036208427,"4972":0.8528214870278531,"4973":0.023235719246935987,"4974":-1.1008705923389095,"4975":0.3536524612478649,"4976":-0.8110108270767479,"4977":0.27155837899355184,"4978":0.3098295225609675,"4979":0.1199109929400224,"4980":0.569212174950131,"4981":0.2832022980618973,"4982":0.44578460287510774,"4983":-0.6942224673156556,"4984":0.6318189295984412,"4985":-0.4269460009457707,"4986":-1.3538812739391985,"4987":1.5965919954480985,"4988":0.05006970129068853,"4989":0.5149016699794489,"4990":0.10088058344581756,"4991":-1.1887385739195058,"4992":-0.19148982787542987,"4993":0.15814303917821787,"4994":0.22212572509580783,"4995":1.8730198693463318,"4996":-0.2987165573869757,"4997":0.16134141186358636,"4998":1.0086428687904003,"4999":0.5225620481160888,"5000":0.6498943867744088,"5001":0.514572090930871,"5002":-0.11354554527423184,"5003":-0.1382903801650373,"5004":-0.1079293042629427,"5005":-0.1524434082123045,"5006":-0.1733530877987063,"5007":-0.11870689967206155,"5008":-0.11222539691554023,"5009":-0.10655645572489005,"5010":-0.19210414292134695,"5011":-0.15536553684515636,"5012":-0.05172288665156275,"5013":-0.04808944851223696,"5014":-0.07126620271585857,"5015":-0.07277998940189377,"5016":-0.12214139704469387,"5017":-0.1474912488176801,"5018":-0.066025198333636,"5019":-0.17791617026695916,"5020":-0.1268988302836903,"5021":-0.2278486657047698,"5022":0.07330790393191305,"5023":-0.23316005044960922,"5024":-0.06913659318436906,"5025":-0.16141646621990677,"5026":-0.09691165248089355,"5027":-0.08775292431405537,"5028":-0.14103723766849194,"5029":-0.09406538197402928,"5030":-0.18072373322964216,"5031":-0.07985874773081059,"5032":-0.10607606750392519,"5033":-0.20610927587362524,"5034":-0.19190374674675892,"5035":-0.10396647579597758,"5036":-0.0879940213877267,"5037":-0.10783243281776964,"5038":-0.20212170607846341,"5039":-0.16910344275274433,"5040":-0.036735184904107154,"5041":0.3944857982000097,"5042":-0.023251849576330624,"5043":-0.054142191957985204,"5044":-0.07397261826400879,"5045":-0.16896509094759,"5046":-0.03386107939256344,"5047":-0.21686448619860998,"5048":-0.05205393384870278,"5049":-0.3292202677845388,"5050":-0.029691490109730732,"5051":-0.058376576609996754,"5052":-0.05734115556473414,"5053":-0.12548083185203088,"5054":-0.09238204764817495,"5055":-0.060626199485411765,"5056":-0.032410805849277656,"5057":-0.19378769464707055,"5058":-0.04582242192038615,"5059":-0.19911128197838684,"5060":-0.18534218595178917,"5061":-0.21226512960407593,"5062":-0.1834019048098353,"5063":-0.014159391220838773,"5064":-0.13585381250392145,"5065":-0.15581008544083796,"5066":-0.10672411923813362,"5067":-0.16110487437485893,"5068":-0.051421448520392286,"5069":-0.0799029319459812,"5070":-0.07752234430067845,"5071":-0.1072514389787146,"5072":0.013089276529776,"5073":-0.06287267443698266,"5074":-0.14379502032847918,"5075":-0.20662800500717018,"5076":-0.2674284053941981,"5077":-0.19930081814254086,"5078":-0.14756720633176842,"5079":-0.11258284384360452,"5080":-0.04886868190301317,"5081":-0.09481704233008535,"5082":-0.11386586684362499,"5083":-0.5653833534705298,"5084":0.3629315179275866,"5085":-0.8219405639472712,"5086":-1.1663553960417297,"5087":0.5176478395655892,"5088":0.16008036947610227,"5089":-0.34336923382228224,"5090":-0.08315113613849115,"5091":-0.5594635685347273,"5092":-1.1773195814441657,"5093":-0.6455060675729637,"5094":-0.20051349695189535,"5095":-0.2366054938687644,"5096":-0.08192719946904438,"5097":-0.4724323826473385,"5098":-0.039595007471131406,"5099":0.3225438774299037,"5100":0.2822112642176536,"5101":0.39921240892743504,"5102":0.044527848663231284,"5103":0.11907119135969488,"5104":1.1165824200593133,"5105":0.8515201922052955,"5106":0.11395291454035147,"5107":1.4136501187718364,"5108":0.16959322820430392,"5109":0.4850667376067871,"5110":-0.46065311571891965,"5111":-0.14633891966201806,"5112":-0.8186312716158753,"5113":-0.6830098524958061,"5114":0.4654557528527516,"5115":2.404795068560112,"5116":0.37687477467150116,"5117":-0.5638456289514021,"5118":-0.6383990282992812,"5119":0.6486377294422514,"5120":-0.2398699229583073,"5121":-0.3709831482768014,"5122":0.126104126764773,"5123":0.8315376239913114,"5124":-3.3660819605300834,"5125":-5.096603326004813,"5126":-2.649975719792664,"5127":-0.37626333531675715,"5128":-0.3567667898151392,"5129":-0.420025257251884,"5130":0.09684341895568065,"5131":0.7864983499050264,"5132":1.9449399566021535,"5133":0.11509970628340926,"5134":0.9238098260597383,"5135":-0.9299442665634574,"5136":-0.9914303636712439,"5137":-1.6455512244013322,"5138":-0.46447165222292264,"5139":1.082107922618329,"5140":0.12667508983625334,"5141":-0.2081516240381286,"5142":0.0631058898852242,"5143":0.24110002352300253,"5144":0.532132079714228,"5145":0.43261815291898115,"5146":0.2512541658154898,"5147":-0.028872434131155363,"5148":-0.47912479418818676,"5149":-0.22024485299048277,"5150":0.45990142953599905,"5151":2.4893271657282154,"5152":-0.900543424437975,"5153":-0.42029827990849505,"5154":-1.2749409888754286,"5155":-0.9598315501991089,"5156":0.6455754904233538,"5157":0.41489741724303625,"5158":-1.0568909140724327,"5159":-1.286115836407161,"5160":-0.050243859486429704,"5161":-0.6047299091043637,"5162":-0.147976524874172,"5163":-1.494494417827044,"5164":0.5052211050840519,"5165":-0.241238888326407,"5166":-0.5478007279652286,"5167":-0.7248220010593412,"5168":0.08812394084589494,"5169":-0.8347107063003436,"5170":-0.5369482036857417,"5171":-0.19057350503467552,"5172":-0.0046836977699093825,"5173":-0.25112021893501524,"5174":-0.3460456076136848,"5175":-1.8215277638999396,"5176":-1.1790398972617935,"5177":0.8123663885088995,"5178":0.10642205278884365,"5179":-0.14065692507863164,"5180":-0.24958153517237996,"5181":-0.3762053135420972,"5182":-0.27444388794493485,"5183":-0.23656718725840192,"5184":0.838407716930613,"5185":-0.9977512625408166,"5186":-0.2161451031847265,"5187":-0.7183944697588844,"5188":-0.3340566251096591,"5189":-0.2949849790697643,"5190":-0.3008410339778052,"5191":-0.3434704221239221,"5192":-0.17964312732929982,"5193":-0.5170029461632931,"5194":0.16006588618567155,"5195":0.793402321073694,"5196":-0.5482155036853072,"5197":-0.5944014941107552,"5198":-0.473215015535154,"5199":-0.20656237325269056,"5200":-0.15494260528866197,"5201":-0.12298766218037174,"5202":0.3870083286866983,"5203":-0.27597038537399027,"5204":1.946697676239131,"5205":0.9861060028481748,"5206":-0.6369838422559441,"5207":-0.20013109318534356,"5208":-0.2354098181054826,"5209":-0.3230796802850976,"5210":-0.30248107666087004,"5211":-0.5378887728054205,"5212":0.3764757049338349,"5213":0.317301944876761,"5214":-0.3498468695173572,"5215":-0.762438455844927,"5216":-0.5358711827138883,"5217":-0.16516867189984408,"5218":-0.32576620658724526,"5219":-0.18148702229836608,"5220":0.5020821948890101,"5221":0.15238537506981042,"5222":0.8094087073816871,"5223":-0.6212394718809727,"5224":-0.716951769144638,"5225":-0.4505870508303172,"5226":-0.31571862967942566,"5227":-0.22536535969715715,"5228":-0.11380451580427753,"5229":0.8987959668235078,"5230":-0.8322370338415499,"5231":-0.03185122815988747,"5232":-0.3527652897736344,"5233":-0.7535736384518796,"5234":-0.526060634318161,"5235":-0.2460187460287622,"5236":-0.4660635785213459,"5237":-0.3240069878660801,"5238":-0.48413363538313203,"5239":0.777758028068251,"5240":-0.5380806648544552,"5241":-0.21806991593370773,"5242":-0.9003004317594231,"5243":-0.2955554837559052,"5244":-0.34331509552878703,"5245":-0.25460760861209725,"5246":-0.22526368915549996,"5247":-0.9270551759135137,"5248":-0.07595065380038558,"5249":0.2509985495299153,"5250":0.35865476012165864,"5251":0.058860773175950516,"5252":-0.07613344038127258,"5253":0.6843240442425927,"5254":0.14795830267580498,"5255":0.34978355082151763,"5256":-0.26597742651642636,"5257":0.026037546800197212,"5258":0.3391641817385879,"5259":-0.04947709759081271,"5260":0.8228421300217303,"5261":0.5079738957521239,"5262":-0.11213790976334737,"5263":-0.05002920550683299,"5264":-0.02068998082101403,"5265":0.5067017466783805,"5266":-0.2901242905758512,"5267":-0.08539223298015888,"5268":1.0371296589548291,"5269":-0.12424305995593969,"5270":0.31944851127563323,"5271":0.4501335220749567,"5272":0.1179142461792884,"5273":0.7733078625527858,"5274":0.48466113103745334,"5275":0.6917093461007441,"5276":0.1598034166277472,"5277":0.09084723530499832,"5278":7.5203886470952,"5279":5.970900768668173,"5280":3.846390208457108,"5281":1.8876286684482955,"5282":1.6402146455070628,"5283":0.6556075351897865,"5284":-0.0811236065266876,"5285":-0.19106583045166642,"5286":-0.20178683626351637,"5287":-0.7736047839005771,"5288":-5.286415894273375,"5289":-2.2985756812930123,"5290":-0.46524167010976347,"5291":0.12851767915269582,"5292":0.23188455545125655,"5293":-0.0019663661339283816,"5294":0.052801189743133546,"5295":0.050548103194798494,"5296":-1.2412110005866497,"5297":-2.405110170014612,"5298":-1.8231173154403713,"5299":-1.387868920499438,"5300":-0.29885813896162866,"5301":-0.21366405805970243,"5302":0.4070716619257627,"5303":0.5200625683277857,"5304":0.285570913473355,"5305":-0.682774411460265,"5306":0.20697576532726433,"5307":-0.13677704177128652,"5308":0.038101499951772304,"5309":-0.47284384010779607,"5310":0.051721686929426886,"5311":0.4766698752892387,"5312":0.00606913477731539,"5313":-0.1682541853980373,"5314":0.14019416269418447,"5315":0.28675144157217086,"5316":0.010959148274249028,"5317":0.5027296033313297,"5318":0.33179902019431534,"5319":-0.2726777011032097,"5320":-0.06187830955052416,"5321":0.09904645284171866,"5322":-0.4840641977738155,"5323":-0.32354713808268,"5324":0.5217427661476173,"5325":1.3073611000706753,"5326":0.06701677567127977,"5327":0.513028683678326,"5328":-0.14489785518699425,"5329":0.24983277594867517,"5330":-0.09524550967358712,"5331":0.20177936746195463,"5332":-0.2101912397393239,"5333":-1.7690294257750723,"5334":-1.6990527046846329,"5335":-0.26225667618946913,"5336":0.13822662873841196,"5337":0.35665285786153017,"5338":0.7475175709489582,"5339":0.9172251150740054,"5340":-0.08643775869520559,"5341":0.25664540980192874,"5342":-0.48344968289458057,"5343":-0.48155837139820756,"5344":-0.10944261167589572,"5345":-0.15222463256523316,"5346":-0.42709944730843025,"5347":-0.9174497586131486,"5348":-0.029923254369432616,"5349":0.3919346993357328,"5350":-0.1484352630156797,"5351":0.29026876157825954,"5352":-0.41201857116324925,"5353":0.6419989247396644,"5354":-2.3937748617785557,"5355":1.1081274920790614,"5356":0.21383864724456592,"5357":-0.8227895759528445,"5358":0.2031182320197992,"5359":0.3666271357027313,"5360":-2.0638172437793036,"5361":-2.512849662907666,"5362":-0.9583759944226332,"5363":-0.12965260861754527,"5364":-1.4232248850923688,"5365":0.6330221013610815,"5366":0.35238248903948083,"5367":-0.3095492917832497,"5368":0.13237597078750754,"5369":-2.391021206793817,"5370":3.265198955428745,"5371":3.906802020731641,"5372":0.32942950466897986,"5373":-0.7302296576441715,"5374":-0.30749042174236324,"5375":0.12828825091889454,"5376":0.04834601929664056,"5377":-0.1714718139159574,"5378":-1.5865918212674615,"5379":-3.628876166609915,"5380":-3.3463112433097386,"5381":-1.3273489214080538,"5382":-0.5885339244815165,"5383":-1.3386152603228272,"5384":-0.42719455318451904,"5385":0.5695970832653275,"5386":0.606805506541427,"5387":-0.4220813700342202,"5388":0.46780706558913415,"5389":-0.6208919404651314,"5390":-1.2804565263539291,"5391":0.1357814224357118,"5392":-1.2690915090027206,"5393":-0.26928294101556544,"5394":-0.17316305901440582,"5395":-1.24571346163663,"5396":-1.2892890563832864,"5397":-0.24525940327756882,"5398":0.14297488897188632,"5399":-0.029927637249867804,"5400":0.5208405046526439,"5401":-0.3231527586445458,"5402":0.5924716813590786,"5403":0.6870377495198988,"5404":-0.14633713774750884,"5405":-0.3686900742962231,"5406":-0.43540772412235956,"5407":0.8752240369316711,"5408":-1.0574446074045112,"5409":-0.43218321720375263,"5410":-0.6120942624334531,"5411":-0.041877420916324216,"5412":-0.18779411490026066,"5413":0.7317813985108964,"5414":1.3079212282198678,"5415":-0.3982462976218947,"5416":0.23563106135707465,"5417":-0.6818863859986481,"5418":0.5263834635081328,"5419":-0.01768649472388207,"5420":0.528810910174958,"5421":0.11006198827038852,"5422":0.37120981872317727,"5423":-0.5231877358730821,"5424":0.18462882901468436,"5425":-0.3562237372646491,"5426":0.7138137383284565,"5427":-0.00947917555961426,"5428":0.10619852841978472,"5429":-0.10792582120429706,"5430":0.43871228668291223,"5431":-1.0127806538219541,"5432":-0.33519653190120013,"5433":-1.4477301032054395,"5434":-1.397965021560129,"5435":-0.5828424304096804,"5436":0.6815299966480053,"5437":0.9080862993881724,"5438":0.057162135928869,"5439":0.3202510917665209,"5440":0.11184462679186756,"5441":0.4602515249140837,"5442":0.25950723741100123,"5443":0.5639901070591689,"5444":-0.031856070049283265,"5445":-0.6148374366885138,"5446":0.3913316905551111,"5447":-1.1678691705233246,"5448":0.46012129059823725,"5449":-0.3625922067632107,"5450":0.9585127970156643,"5451":-1.44952216441605,"5452":-0.7066819322828503,"5453":-0.0526690575137567,"5454":-0.7537720517464085,"5455":-0.33207652560793277,"5456":0.527101461338023,"5457":-1.9848948555942254,"5458":0.9817760312530177,"5459":-0.22038929155907067,"5460":-3.9185985563433765,"5461":-4.221129678610208,"5462":-3.312441378983945,"5463":-1.9610589330625123,"5464":-1.5052225814266709,"5465":-2.376157728216501,"5466":-0.8501269908714225,"5467":-0.11118606839788277,"5468":1.4677936690766245,"5469":1.5184298033057904,"5470":0.7448369572200567,"5471":-0.3811235313644167,"5472":0.7711865787321363,"5473":-0.5944898821386482,"5474":0.5663038275695732,"5475":-0.24551665360241995,"5476":-1.0370417306775304,"5477":-1.2329283657362504,"5478":1.236357862846441,"5479":-0.11537965912135538,"5480":-0.23086262658592785,"5481":-0.1705050540751072,"5482":-0.8425057031461113,"5483":0.45205588409566344,"5484":-0.7183045247005007,"5485":-0.09926747741554649,"5486":0.11520967349483574,"5487":0.32696305486920085,"5488":-0.9829949834113584,"5489":-0.3332138011284991,"5490":0.10920746903714855,"5491":0.21048035627187214,"5492":-0.39924268574212995,"5493":1.048515530851846,"5494":0.3641012951634416,"5495":0.6080477285220683,"5496":-1.194329640935098,"5497":-0.16663004664877154,"5498":0.4148794713861715,"5499":-1.0214633159390514,"5500":0.03159477088654157,"5501":-0.46045808862892523,"5502":-0.2932132551572832,"5503":-0.31345266361875224,"5504":-0.7016590233732859,"5505":-0.32591364808207846,"5506":0.306947134513415,"5507":-1.0078063197007918,"5508":-1.7381833561920754,"5509":1.12370115519481,"5510":0.6936947977635697,"5511":-0.23791235025505467,"5512":-0.7480912711083948,"5513":0.7889861549268151,"5514":0.03069105067983979,"5515":0.09914937899637083,"5516":-0.4160634127991428,"5517":0.2850595757689691,"5518":0.2377640212483545,"5519":0.49779467515275766,"5520":-0.28237056875092503,"5521":0.956259085084484,"5522":1.4721618588149625,"5523":0.17255376138336193,"5524":-0.19288908715208258,"5525":-0.6748770407524789,"5526":-0.48701462622611796,"5527":-0.7557702570987775,"5528":1.0821448703713739,"5529":-1.3957395776375956,"5530":-0.08775252030409403,"5531":-1.0384299161563255,"5532":0.818871310780301,"5533":-2.5730384049350126,"5534":0.024644318634086067,"5535":0.6713496252699922,"5536":-0.5005533580307162,"5537":-1.385830865554896,"5538":-0.6822693102327875,"5539":-0.3248847787625175,"5540":-0.14282630936605495,"5541":5.85156546424767,"5542":2.7334612900283703,"5543":0.360025422034818,"5544":-0.37373773787752196,"5545":-0.15647770163284502,"5546":0.30116150896503974,"5547":-0.5179823759636366,"5548":0.48818076985347086,"5549":0.0647505924321257,"5550":1.2933961754788326,"5551":-0.8377819371842657,"5552":-1.1084636724300163,"5553":0.30124185045347174,"5554":0.4234902333140664,"5555":0.2557938732404703,"5556":-0.26828862244082624,"5557":-1.2894334190486483,"5558":-0.7310691894868915,"5559":-0.6341843355109882,"5560":-0.16952504668074814,"5561":0.41119761933030247,"5562":0.18849015553997775,"5563":-0.1848389551183585,"5564":-0.291917022143342,"5565":-0.03288289530364922,"5566":0.7615612656085498,"5567":-0.2439987428259549,"5568":-0.43446151682153644,"5569":-1.0059844176050687,"5570":-1.0518314715264063,"5571":-0.7039977539784763,"5572":0.5220947846458887,"5573":-0.6710442148291852,"5574":-0.2511613941764487,"5575":0.7464333727136255,"5576":0.23239043732129414,"5577":-0.8764117416095512,"5578":0.055221720429874485,"5579":-0.0776282179667254,"5580":-0.42358861978497103,"5581":0.4075998826787164,"5582":0.640163609458799,"5583":1.0342854799343282,"5584":-0.8673314584705977,"5585":0.9490803697116476,"5586":0.29814530126898015,"5587":-0.12838084637305996,"5588":0.7887212163809648,"5589":0.6303174518502355,"5590":-0.839873939340571,"5591":-1.9721411356133989,"5592":-0.6655866567833248,"5593":-0.2440317994919495,"5594":-0.9866592244462998,"5595":-0.28269223190363363,"5596":-0.6443561272565783,"5597":-1.0872726212122985,"5598":-0.5642087881167306,"5599":-0.24939872980995745,"5600":0.05252482887778424,"5601":-0.39638667474067263,"5602":-0.1638207660817891,"5603":-0.028258194492552086,"5604":-0.7305993192855091,"5605":0.5021178457440474,"5606":-0.5148230904349655,"5607":0.9410097627817201,"5608":0.23653950429764284,"5609":0.036852840235276206,"5610":-0.7998847463534782,"5611":0.026845307821480927,"5612":1.0428763887180836,"5613":-1.445438547826773,"5614":0.5798855773525979,"5615":-0.7653016513106464,"5616":0.7051995120648495,"5617":1.0614433998657045,"5618":-0.7026068350135922,"5619":-0.5618461827727239,"5620":-0.9647641939200461,"5621":0.9330018120015025,"5622":0.31198065073321707,"5623":-2.356064194714725,"5624":-3.2574909377434587,"5625":-3.447304469004328,"5626":-0.04480297121714723,"5627":-1.053046536731651,"5628":-0.42281077832020914,"5629":0.11546796447074685,"5630":0.2666526630845452,"5631":-0.3192535221498424,"5632":0.9016936228769488,"5633":-0.5657206235593951,"5634":-0.28185724192544204,"5635":-1.9644715863006497,"5636":-0.6689737175071095,"5637":0.2931738205715994,"5638":0.3398526936348566,"5639":0.6185118020346619,"5640":-0.036855880420131874,"5641":-0.75023112939581,"5642":1.0294898654290143,"5643":0.35668664088922886,"5644":0.8472712461081359,"5645":1.0111011308859408,"5646":0.14221815176038574,"5647":0.392962420406528,"5648":-0.4613093131425278,"5649":-0.24887345114132553,"5650":0.3832679373788675,"5651":0.3685655058174065,"5652":1.8295522694376096,"5653":-0.7269962469630303,"5654":-0.3144417921694739,"5655":-0.4244152292107063,"5656":0.723115818037764,"5657":-0.35879743026916866,"5658":0.909737912875076,"5659":0.7353289698763626,"5660":-0.315507308892576,"5661":-0.3460747932705154,"5662":-0.14630992175291008,"5663":0.41743504113370467,"5664":0.3433714599112144,"5665":0.6372740803991215,"5666":-0.8685994105910679,"5667":-1.8008178356565239,"5668":-0.7054059432152987,"5669":-1.2119810480522848,"5670":-0.026540544451439,"5671":-0.30945335240762534,"5672":0.335968799682123,"5673":-0.11212744060934854,"5674":-1.6050006077636003,"5675":-0.5444610033902427,"5676":0.0188052896640833,"5677":0.6635249478698431,"5678":-0.18765952112613293,"5679":-0.7393992081724505,"5680":-0.25100722394665953,"5681":0.947004669229778,"5682":-0.3831151522240536,"5683":-0.45423604202630335,"5684":-0.7203683047960732,"5685":-0.22180432845073494,"5686":1.0442845600664878,"5687":-0.38450720598455584,"5688":0.7905990797465005,"5689":0.7966235332141394,"5690":1.3937413540747803,"5691":0.21644880036946776,"5692":0.8503524151213001,"5693":-0.4284379090334478,"5694":-1.4839259616620812,"5695":-0.008703232501179643,"5696":-0.678786256686045,"5697":-0.17256164128153115,"5698":2.297082345333446,"5699":1.438272098346714,"5700":2.046309242569119,"5701":-0.07947435482119884,"5702":0.6161181946003087,"5703":0.13271060300953408,"5704":-0.36544844151368483,"5705":1.3717311077833512,"5706":0.6323430766273272,"5707":1.5233039334171974,"5708":2.5730795020831665,"5709":1.5414116698741673,"5710":0.5049735117313503,"5711":0.021470809033654593,"5712":0.325446501198386,"5713":-0.8794121799727316,"5714":-0.20549350281771453,"5715":0.08799583177986707,"5716":0.755915393854225,"5717":0.7047264227031546,"5718":0.23233345493629073,"5719":0.7891456741912574,"5720":-0.21611851941437343,"5721":0.7223285382903568,"5722":-0.5992832442536173,"5723":0.39915500327105047,"5724":-0.4507223145034636,"5725":-0.707145583353921,"5726":0.10622293360795285,"5727":0.19588289522410243,"5728":-0.5443130117913186,"5729":-0.5964100148779874,"5730":-0.3332654774146456,"5731":-0.6441661562158811,"5732":0.4335949046874245,"5733":-0.4288573079405472,"5734":-0.8474254877087946,"5735":-0.6370331546078444,"5736":0.08509066071135622,"5737":-0.634164479728657,"5738":-1.3473834590131482,"5739":-0.6073629351386445,"5740":0.1674383536294075,"5741":-1.311171237633048,"5742":-1.1296357637613903,"5743":-0.3294011841237094,"5744":0.00551038078408907,"5745":0.1657014506423627,"5746":-0.2546374669396268,"5747":0.5785192579422711,"5748":-0.07227374233825959,"5749":0.07676613288124513,"5750":-1.0369097515029972,"5751":-0.07444452098735405,"5752":0.8098850056950119,"5753":0.8396213948157304,"5754":1.2948256951761796,"5755":-1.351349830352418,"5756":0.03831779810966778,"5757":1.0706983169297832,"5758":-0.13636341903500235,"5759":0.04183275462387962,"5760":-0.6798417518169128,"5761":0.1217576353140496,"5762":-0.5237134635926546,"5763":0.6057320208526503,"5764":0.10579735849686822,"5765":-0.7571119882053194,"5766":-0.3340588053277821,"5767":-0.09207146711210662,"5768":1.0157391206537771,"5769":0.40725635345921074,"5770":0.38691980270217813,"5771":-1.190151122400133,"5772":-1.64733699454831,"5773":-2.509500616208804,"5774":-0.48776761943953884,"5775":0.7220825412846367,"5776":0.5558657138656216,"5777":0.623089218955778,"5778":0.9003372396130768,"5779":-1.612866232000687,"5780":-0.6107186296454369,"5781":1.9692267937547765,"5782":0.7095353630623837,"5783":0.5555200039356789,"5784":-0.4140382177002413,"5785":1.1223468122603555,"5786":0.16353685336890988,"5787":0.07041035478796667,"5788":0.619860370156837,"5789":0.4428936809729705,"5790":0.5270437186149692,"5791":-0.13278782392276936,"5792":0.2904521201098195,"5793":0.20259779761739224,"5794":-0.31370590753288385,"5795":-0.41335302710954713,"5796":0.11692699882230458,"5797":1.3795247365876322,"5798":0.6244907517545117,"5799":-0.39045413803207984,"5800":-0.17062365402110988,"5801":-0.07950681082943802,"5802":-0.7365917085751705,"5803":0.14052482750615192,"5804":-0.5227887377577699,"5805":-0.110860938995876,"5806":-0.6384963159891257,"5807":-0.4201244914908716,"5808":-1.0281849620923293,"5809":0.31137928823374705,"5810":-1.0266842142415105,"5811":-1.7661549806486034,"5812":0.20893556427709223,"5813":-0.9057147077543563,"5814":-0.7685502765221831,"5815":-1.871703174741414,"5816":-1.599348214975921,"5817":-0.035508654155193387,"5818":-0.9951112010508516,"5819":-0.21071030575147787,"5820":0.8204562959242686,"5821":-0.2581481698404341,"5822":2.1067127472398774,"5823":-0.44801112054739556,"5824":0.3337683465588196,"5825":-0.15670607489333055,"5826":-0.5604272909242556,"5827":-0.8363507151689474,"5828":-0.6983093834603699,"5829":-0.2762961911401996,"5830":-0.5496696320256393,"5831":0.08872998843155941,"5832":-0.9425174516704131,"5833":0.8634485691474318,"5834":-1.3015753539029726,"5835":-1.278971759257036,"5836":-0.5369202368069198,"5837":-0.5969013018048082,"5838":-0.5321398109378712,"5839":-0.37044296153643336,"5840":0.38723089166204716,"5841":0.12442457124499992,"5842":0.941578873741721,"5843":-1.8841860070241219,"5844":-0.9849136770514111,"5845":-0.5293328399922888,"5846":-0.45731318002992793,"5847":-0.39260005910145696,"5848":-0.3287878508518433,"5849":-2.1610527159116164,"5850":1.1540824705129105,"5851":-0.09064159357297798,"5852":-0.8286492201533648,"5853":-1.140425376137068,"5854":-0.5946405709721686,"5855":-0.4812896782506859,"5856":-0.41107732881038567,"5857":-0.35792487114493177,"5858":-1.4562875335401604,"5859":0.03976051814005679,"5860":1.9255008065255708,"5861":-1.1052992696415265,"5862":-1.0835468507073032,"5863":-0.6854153860806945,"5864":-0.3493558929948887,"5865":-0.5513550847414864,"5866":-0.22290316670017038,"5867":-1.4297120037625426,"5868":1.8589076672082034,"5869":0.5311591489063128,"5870":-1.4620249116249964,"5871":-0.9838841859145102,"5872":-0.8794782798962518,"5873":-0.5066814926449684,"5874":-0.3795080003446384,"5875":-0.4372479372620478,"5876":1.2808177859091456,"5877":-2.284341715482298,"5878":-1.0657490945806465,"5879":-1.1997208614116774,"5880":-1.2437938255209373,"5881":-0.6515599225578832,"5882":-0.5631110091200906,"5883":-0.11090041929155985,"5884":-0.4216873000435001,"5885":-1.5310227822987807,"5886":-0.2858913837304913,"5887":-0.8133343465086826,"5888":-1.207122858362138,"5889":-1.0893020632602397,"5890":-0.5707593420499251,"5891":-0.5194412703063245,"5892":-0.5360864762182236,"5893":-0.373946768500972,"5894":-1.333865285349778,"5895":0.8837876618026457,"5896":-0.5439261887584789,"5897":-1.7749396623066396,"5898":-1.4508877960553686,"5899":-0.5059089357699282,"5900":-0.5986573717002074,"5901":-0.35739142399888685,"5902":-0.41480762316039843,"5903":-0.37139361938972687,"5904":1.3897121977324685,"5905":-0.32225363366767,"5906":-0.3061616561311711,"5907":0.6235168417132056,"5908":0.1958519215563073,"5909":0.41313463028115127,"5910":-1.4088711581259266,"5911":-0.4909110732496957,"5912":0.06441655227666604,"5913":-0.974887077826687,"5914":0.03146053707299656,"5915":-0.9357702524125786,"5916":-0.052522468919841206,"5917":-0.0872750500103989,"5918":-0.5648476419791147,"5919":-0.15515650737809503,"5920":-0.5306106666281868,"5921":-0.23553895405182446,"5922":-0.28688976942449745,"5923":-0.23293704894619974,"5924":-0.5936146525763263,"5925":-0.20018507343983333,"5926":0.44143806506219574,"5927":0.8255449180122406,"5928":1.2750183213671302,"5929":0.3568248840401473,"5930":0.6756733884267279,"5931":0.5656530339195048,"5932":-0.6469237799152382,"5933":-0.7764707069248925,"5934":1.428287592996817,"5935":1.7914926445682984,"5936":1.5845393744236096,"5937":1.0965801509050275,"5938":-0.2231937876235546,"5939":-1.111096450810855,"5940":-0.07469464930687064,"5941":0.29258762595203613,"5942":1.7874711322322294,"5943":2.9013711571015115,"5944":2.336545720147389,"5945":0.1720141167803751,"5946":0.25348778065025585,"5947":-0.7746998579245666,"5948":0.6525405331509281,"5949":-0.39655814949804896,"5950":0.194143796944918,"5951":-0.44312640438313494,"5952":3.95905790777087,"5953":2.4316437749166346,"5954":0.3765905544674232,"5955":-0.46508022090688034,"5956":0.8159705089945705,"5957":0.7677767867654249,"5958":-0.8963623194889441,"5959":-0.6323772495693198,"5960":-1.6535561892084547,"5961":0.8894633159433937,"5962":-0.2799487387180726,"5963":-0.3092166227032531,"5964":0.4123554310041332,"5965":0.9389897678654194,"5966":-0.9489026013289215,"5967":-0.27796873662897775,"5968":0.41097859084006233,"5969":0.8474391053273025,"5970":0.3546405948012458,"5971":0.130116102694925,"5972":-0.3980550453761159,"5973":-0.8662836222585276,"5974":-1.0488301255048422,"5975":-0.5134414532389455,"5976":-0.29097121587659874,"5977":-0.13350586675085502,"5978":0.12882714646869214,"5979":-0.8098291174638763,"5980":0.16959669634387448,"5981":-1.9160295375686263,"5982":0.006967129701849735,"5983":-0.09979614021307745,"5984":-1.4759194324695668,"5985":0.5422995288865339,"5986":-1.2124894167204243,"5987":0.1912905655168508,"5988":-0.425482515814454,"5989":0.06562110596626353,"5990":-0.7154007544268208,"5991":-0.15802641044165108,"5992":-0.48020973651029913,"5993":-0.6640391279420668,"5994":0.8226712513140895,"5995":1.1615409932907095,"5996":-0.003973364485268523,"5997":-1.1740487956046124,"5998":-0.5968533068590317,"5999":0.47703758269934887,"6000":-1.2310243527174787,"6001":0.38266756324308865,"6002":1.785929177902306,"6003":0.18218703381488263,"6004":0.2540839860670704,"6005":-0.1394757639861277,"6006":0.7836731593632671,"6007":1.5622977708873866,"6008":0.14762181178441677,"6009":0.5699074926708493,"6010":-0.027060225418559417,"6011":-0.6623505428130244,"6012":-0.19197493573860244,"6013":-0.7566498687495115,"6014":-0.5345739730811535,"6015":-0.6495396926474943,"6016":0.38355211389548544,"6017":-0.3984389023438297,"6018":-2.233533475734309,"6019":-1.0366040955876816,"6020":-0.8999139888683003,"6021":0.49853356488970346,"6022":-0.651590068421845,"6023":0.2463231606207682,"6024":-0.01966200232654508,"6025":1.3907502548992403,"6026":5.001843716310005,"6027":4.4625249319828875,"6028":5.000485390910834,"6029":3.1562666462824374,"6030":2.5463310900092577,"6031":0.16235641855297192,"6032":0.38888010500038844,"6033":-0.7918279415356175,"6034":0.6938010367816271,"6035":-0.8759119727802667,"6036":-1.4572546868736027,"6037":-1.492292959487244,"6038":-0.9160205618288039,"6039":-0.6157145860202008,"6040":0.2102984295143657,"6041":0.6402476478132685,"6042":0.2248549125750504,"6043":-0.5554568485745356,"6044":0.013981260012965518,"6045":-0.07058786935264894,"6046":0.2296210604413781,"6047":-0.09574335592286494,"6048":0.41137997989533026,"6049":0.9570940149916646,"6050":0.48635744599518227,"6051":0.8456017501358997,"6052":0.9715313262294296,"6053":0.669176992985234,"6054":-0.2068814003003982,"6055":0.32716664655161887,"6056":0.8572717953451828,"6057":-0.019087091589713612,"6058":0.15043092226215943,"6059":-0.5563663685528716,"6060":0.3322564943034261,"6061":0.15984806770214313,"6062":0.27617668106571913,"6063":0.9800228583330652,"6064":1.120575219630954,"6065":-0.7390829853231122,"6066":-0.03361925186647519,"6067":-0.21951329055117505,"6068":0.09872359186202131,"6069":0.7585353842017327,"6070":0.5957797729770324,"6071":0.2569199790737723,"6072":0.1878632468501746,"6073":-0.3585941056094705,"6074":0.02781270541721942,"6075":0.2153990801900451,"6076":0.4128622555143932,"6077":0.9573326783087408,"6078":0.9808496794363419,"6079":0.3117625122706037,"6080":0.02715693328913075,"6081":-0.1112846437444633,"6082":0.23405710112241265,"6083":0.34415729776985876,"6084":0.2834637351854541,"6085":0.010643384584412975,"6086":1.1342481261740374,"6087":0.7390792328744817,"6088":-0.16711400635696297,"6089":0.2202797356269136,"6090":-0.3633477323865998,"6091":0.04387141511076415,"6092":-0.2324529481449492,"6093":-0.11782979717665541,"6094":0.09272792683538998,"6095":0.671926258024838,"6096":0.14184030133373227,"6097":0.7161252004544657,"6098":0.019199457809570854,"6099":0.34388358112184664,"6100":-0.14323420647175616,"6101":-0.18777729096464568,"6102":-0.3514576298397768,"6103":-0.13471122797714463,"6104":0.36261726276625283,"6105":-7.039471631997754,"6106":-6.476524182166877,"6107":0.5991806117457842,"6108":0.06760279533668996,"6109":0.03969951929819762,"6110":0.20090912406737194,"6111":0.06824908058198088,"6112":-0.3610998007538821,"6113":0.00961641849081683,"6114":-1.0178378087162017,"6115":-0.42021067544111546,"6116":-0.34466882245346503,"6117":0.046266379253826685,"6118":-1.3376388025535535,"6119":0.23508766895988348,"6120":0.09082744765684465,"6121":0.1456015560212218,"6122":-1.2053273805172318,"6123":0.8590000883371072,"6124":0.28304444066563494,"6125":-0.13165288566129585,"6126":-0.1710489338915098,"6127":-0.04654954972912639,"6128":0.11799053950857762,"6129":0.9199707064407473,"6130":0.21750796044989124,"6131":0.24524436334884617,"6132":0.19570752843599154,"6133":0.6619505599829182,"6134":-0.2365854636759074,"6135":-0.63329057604401,"6136":-0.22200449554652985,"6137":-0.3938000429233956,"6138":0.733517620197704,"6139":0.06488924420909813,"6140":0.7521780099644054,"6141":1.0083667039996167,"6142":0.13766236051853775,"6143":-0.06916630265255307,"6144":0.4020360353483517,"6145":0.29772983136598824,"6146":0.34200542542573714,"6147":-0.20858421863053858,"6148":-0.61672376500435,"6149":0.4178767198637968,"6150":1.6880774539847747,"6151":-0.6321260322399017,"6152":-0.5330518827404077,"6153":0.39872884203925407,"6154":0.28558144552382075,"6155":0.4841284915444626,"6156":0.5806014597517482,"6157":1.6591630596790408,"6158":0.6951741761525957,"6159":0.04063928185791858,"6160":0.7900618558675031,"6161":-1.3752882102277748,"6162":0.2902373769571653,"6163":1.079940751227391,"6164":0.5351985353639128,"6165":0.6421520633036302,"6166":0.44150215794461084,"6167":-0.18448799837911303,"6168":0.6417276719158272,"6169":-0.8452419168027591,"6170":1.5681830993107628,"6171":-0.15352070095604975,"6172":0.795281395202556,"6173":0.011083827290300007,"6174":0.9930538674886252,"6175":0.5134287868167864,"6176":0.6866937514643038,"6177":0.5648100769786465,"6178":-0.44203783597842616,"6179":-0.5775129541010932,"6180":0.03254385017229058,"6181":-0.04233475011402706,"6182":1.341993171536239,"6183":0.794406466251487,"6184":0.9241402975933232,"6185":1.089272524114634,"6186":0.11655332969941652,"6187":0.027493581627953255,"6188":1.433016551006811,"6189":-1.104602373381528,"6190":-0.943974032860586,"6191":0.9193890084965094,"6192":1.1217716917732776,"6193":0.7290861326147853,"6194":0.4072360690158652,"6195":-0.2215138482962349,"6196":1.4598145955807493,"6197":1.2642356273343833,"6198":-1.0677894816407068,"6199":0.856684850287568,"6200":-0.10749578535141942,"6201":0.4346885883268661,"6202":0.9440864678624427,"6203":0.746078293701334,"6204":1.2032499732372126,"6205":-0.1925597870384752,"6206":0.09944888772414309,"6207":-1.9866573288206384,"6208":0.007478444514207653,"6209":-0.19291125299202277,"6210":0.5968440225157761,"6211":0.5434679861055313,"6212":0.34695928035196566,"6213":0.7301875490365501,"6214":0.09858252821165973,"6215":0.020174663883558975,"6216":1.014701453453843,"6217":-0.017263543731563972,"6218":0.3355134225552576,"6219":1.1474994801557965,"6220":0.512835603899816,"6221":0.7800313315258866,"6222":-0.019483997615500053,"6223":-0.2008322356190705,"6224":0.3114889567035554,"6225":0.18316229174415324,"6226":0.018369273103298566,"6227":0.39407261208417643,"6228":0.2997902739113134,"6229":0.09386561240426881,"6230":0.3855865512115658,"6231":-0.5162719373034698,"6232":0.0068974610481388875,"6233":-0.24990611612679367,"6234":-0.5151031844709555,"6235":-0.46910436867115424,"6236":-0.44024482635345297,"6237":-0.7026603122135654,"6238":0.9604404388591845,"6239":-0.22972447808129323,"6240":0.600598360700783,"6241":0.7749662837186698,"6242":-0.2545176165163854,"6243":-0.5674424409336913,"6244":-0.2613689693864805,"6245":0.19540892303918492,"6246":-0.7232812357997624,"6247":-0.40453306636998143,"6248":-0.5609339484890464,"6249":-0.26679994749686853,"6250":-0.24744950305040408,"6251":0.9202398461845983,"6252":-1.0451407013671523,"6253":1.0638293387475362,"6254":-0.5636287093930344,"6255":-0.8661230623165029,"6256":-0.3695483630631185,"6257":-0.44953339938907433,"6258":-0.9466695467457666,"6259":0.26796478331451623,"6260":-0.8972290161872588,"6261":0.2586661770645097,"6262":-0.23557426171657214,"6263":-0.6641031867236007,"6264":0.0966339569969674,"6265":-0.31097419859207986,"6266":0.8213075779978186,"6267":-0.7009880549393017,"6268":0.5660699781212528,"6269":5.508824260884071,"6270":2.988916378195871,"6271":-0.36461068957071247,"6272":-0.556787865117632,"6273":0.35136761882539136,"6274":-0.31166422370550556,"6275":0.0019458592546928413,"6276":-0.33109876686453815,"6277":0.7409919631596646,"6278":-0.7161316165513564,"6279":-0.1579918438266672,"6280":-1.3832485319642,"6281":-0.900185821291193,"6282":-0.50591098112131,"6283":-0.8260231433023012,"6284":0.6633134640763763,"6285":-0.021149949066285836,"6286":0.755626012738948,"6287":-0.005044497323786706,"6288":1.2810575366037347,"6289":-0.4883551598495082,"6290":-0.20739218285752845,"6291":0.9866230790779814,"6292":-0.8787534501197992,"6293":-0.9049730617936428,"6294":0.11054562118029693,"6295":-0.7313618572996365,"6296":-1.2190396038066384,"6297":-0.746289757724745,"6298":-0.2569134393943514,"6299":-0.0931322830170336,"6300":-0.8423324616454081,"6301":0.28831195616513444,"6302":-0.5448585840746653,"6303":0.3565796322444953,"6304":-0.8122583748441056,"6305":-0.6098598574821958,"6306":-1.20691761092034,"6307":-0.7262047922017894,"6308":-0.9606679016735169,"6309":-0.06356633409423167,"6310":0.4611935595572563,"6311":-0.02692513728182334,"6312":0.9915111039080476,"6313":-0.007598773199682758,"6314":0.16852904922549397,"6315":-0.5588835122718211,"6316":-1.0252076197209692,"6317":0.5439633763538354,"6318":0.45550420460685254,"6319":-0.0351833647256345,"6320":-0.321706548352789,"6321":0.07242444549864628,"6322":0.0996864956709751,"6323":-0.05052219935039892,"6324":-0.209299119129915,"6325":-0.3951271737597723,"6326":-0.4546819018789241,"6327":0.45610131491480665,"6328":0.7988087844755647,"6329":-0.6001382635235587,"6330":-0.015297700436156402,"6331":-1.4685631952210512,"6332":-0.7613610242188428,"6333":-1.007152911206154,"6334":0.3697025256421224,"6335":-1.0031337045291586,"6336":-0.7538191080303701,"6337":0.04766834542461974,"6338":-0.5285178708823173,"6339":-0.18863892568289803,"6340":-0.9109736936273756,"6341":-0.054370352616498994,"6342":-0.3561665722118608,"6343":-0.7910352818863482,"6344":-1.5938724196888754,"6345":-2.1667564074231613,"6346":-1.7269668181376583,"6347":-0.6836214792072497,"6348":0.14855577014942445,"6349":-0.8146900439974305,"6350":0.9508490356990614,"6351":0.4505320324855427,"6352":-0.008685448562196933,"6353":5.706714640349074,"6354":1.1318002680502868,"6355":1.0259370609415608,"6356":0.8456628043983503,"6357":0.15064476039164543,"6358":0.07956727764728318,"6359":-0.48429088066629694,"6360":1.032956994170045,"6361":-0.19327846898831558,"6362":-2.157347470557614,"6363":-1.699348843443134,"6364":-0.32634278986682125,"6365":-0.368726535656123,"6366":-0.9722915438650201,"6367":-0.029791148327280567,"6368":0.7628016700683654,"6369":-0.017733003694576064,"6370":0.37735490361950713,"6371":1.090231279586355,"6372":-0.6307069856083263,"6373":-0.5031907497527295,"6374":-0.5063339485437149,"6375":0.36788371136404524,"6376":0.17271240739228982,"6377":-0.9404126850645821,"6378":-0.6309053798418739,"6379":1.2541647393353321,"6380":-0.4934448620659781,"6381":-1.215730254109871,"6382":0.41416793971530347,"6383":-0.6159892408708818,"6384":0.1713652302957587,"6385":0.1155844045508291,"6386":0.46483696682897063,"6387":0.9826607852310588,"6388":-0.22111520993772482,"6389":0.42195583083483434,"6390":1.194561404322549,"6391":0.021301872191228474,"6392":-0.1375054984561754,"6393":0.5467754636655842,"6394":0.06430146647858691,"6395":-0.7088014418565464,"6396":0.7019545427235407,"6397":-0.1033628185006105,"6398":-0.7296463280981111,"6399":0.7927607016257188,"6400":0.19636641291359047,"6401":0.9069891263107783,"6402":-1.3534711529877592,"6403":0.3144944616246751,"6404":0.5883180331102298,"6405":-0.022365834085333627,"6406":-0.3830500093779558,"6407":-0.14091401893311392,"6408":-0.34596336580839504,"6409":1.1262136774634186,"6410":-0.5524008788383657,"6411":0.7437454180059013,"6412":0.8485931093532212,"6413":-0.5400833595564426,"6414":0.5485254443627857,"6415":-0.2639970806575512,"6416":-0.7118105669461683,"6417":-0.9586974285936268,"6418":0.46525650720406553,"6419":0.3669808425429138,"6420":-0.04902638795279307,"6421":-0.057585952543939244,"6422":-0.2396560227172634,"6423":0.9609826510626694,"6424":0.028405502441772118,"6425":-2.1209423249928845,"6426":-2.949121036776063,"6427":-0.8187348530130338,"6428":0.1605469583923361,"6429":-0.026357207607657876,"6430":-0.6468397271573938,"6431":-0.22515666663021566,"6432":-1.131657049644403,"6433":0.18584868499749513,"6434":0.4700560600006033,"6435":-1.3374094521478253,"6436":-0.4804617599210162,"6437":-0.2064851457433797,"6438":0.61899567157082,"6439":-0.23925198233633502,"6440":0.8631319879003319,"6441":-1.9739234283317468,"6442":1.1508115161110875,"6443":1.7163515728205847,"6444":0.44023089926285675,"6445":1.5800918390492102,"6446":1.01780227777266,"6447":0.11285856905540186,"6448":-0.4564562315030129,"6449":1.0113345985816278,"6450":-0.2147232487607635,"6451":0.15178944729758986,"6452":0.9045660476261714,"6453":0.6793046743057338,"6454":-0.2966227191385835,"6455":1.6063576426631034,"6456":-0.5727038795176411,"6457":-0.7972489003932414,"6458":0.3379854540773873,"6459":-0.9523121685243531,"6460":0.685883661695419,"6461":-1.2110786002075487,"6462":1.649538433429171,"6463":-0.029243246177163968,"6464":0.7736271802310923,"6465":0.6700156884649348,"6466":0.7594330884912662,"6467":0.705903812026022,"6468":-1.126491863608526,"6469":-1.6761597343492687,"6470":1.0508797858215604,"6471":-0.41639890749580727,"6472":0.2717064727603904,"6473":-0.07724527030683247,"6474":0.42184392120565956,"6475":0.013686656461081661,"6476":0.5510579778934176,"6477":-0.06616155548953762,"6478":0.32070271333965955,"6479":-0.633379091902593,"6480":0.5092087865192378,"6481":-0.036892522101251796,"6482":0.5590940054099853,"6483":-0.1712650798729514,"6484":0.0962479110273903,"6485":0.6018662146030941,"6486":0.7375580950468561,"6487":-0.6870618497922694,"6488":-0.39910519458505134,"6489":-0.2570775899032367,"6490":0.29484675518870634,"6491":-0.3663411071578383,"6492":0.4617922106269415,"6493":0.5326541938590453,"6494":-1.1065445870309187,"6495":0.7107378693365087,"6496":0.14490014724711503,"6497":0.273960910081743,"6498":0.04854085524679356,"6499":-0.5630666039295744,"6500":0.012608413071961538,"6501":-0.45178097253076377,"6502":-0.2171159160097198,"6503":-0.14298476170115929,"6504":0.6844005417604757,"6505":0.5261303220470892,"6506":-0.3822566855923024,"6507":-0.7724971691431599,"6508":-0.591044100112534,"6509":0.2261226827950887,"6510":-0.9067383696233199,"6511":-1.058615245814554,"6512":-0.9924982225577795,"6513":0.2907885594185539,"6514":-0.21162290820592308,"6515":0.07965003021196834,"6516":-0.3961999085618101,"6517":0.08807481241493607,"6518":3.3726741371873774,"6519":4.2731556822707555,"6520":7.112386549466472,"6521":4.408810279452645,"6522":3.0407087526292917,"6523":0.3089935420563413,"6524":-0.04482814690085566,"6525":0.013793973705537602,"6526":-0.5664513613382189,"6527":-1.554264035058696,"6528":-2.2796254847448894,"6529":-1.6607225571014321,"6530":-0.9858054719404568,"6531":-0.8203646687792713,"6532":-0.05673804657782476,"6533":-0.09337434464495727,"6534":0.36401807379161066,"6535":-0.32702540493630183,"6536":-0.34290518626404376,"6537":0.921926011755507,"6538":0.09534920052236301,"6539":-0.7113490864046569,"6540":-0.08587861782526245,"6541":-0.023738660899302218,"6542":-0.25831989003234734,"6543":-0.2539071286019144,"6544":-0.5328663302948853,"6545":0.2509139333785334,"6546":0.7974866179253925,"6547":0.5638955209077631,"6548":-0.09769344233396882,"6549":0.5730479745096266,"6550":-0.538763652942188,"6551":0.5924140275625907,"6552":0.6128362715875162,"6553":0.20586904160138977,"6554":0.033913187769294174,"6555":-0.43007680173662893,"6556":0.0840306331156453,"6557":0.3458474008032097,"6558":0.3625774630300685,"6559":-0.6342253704155943,"6560":1.2045312188185275,"6561":0.6302124810282542,"6562":0.37725902810293377,"6563":0.5274210640971961,"6564":0.6187993775745827,"6565":0.31242199526830067,"6566":-0.7020559733463568,"6567":-0.2993341920716906,"6568":-0.43009141841595555,"6569":0.4249701006707237,"6570":0.002597439256079402,"6571":0.3045996998521131,"6572":-0.028323239085990166,"6573":0.1664228425466921,"6574":0.3071468504440692,"6575":-0.29882517907884,"6576":-1.0312686007493546,"6577":-1.1922742808707163,"6578":0.2507237850889774,"6579":0.49616270055494904,"6580":-0.7029376672727207,"6581":-0.42789351040349,"6582":-0.1921174631161805,"6583":-0.11022662159317978,"6584":0.31608115421750255,"6585":0.08643418877983147,"6586":-0.5403795720459121,"6587":0.15337611195536888,"6588":-0.08753223604338303,"6589":-0.2573149571890811,"6590":-0.19197344778054512,"6591":0.19066935921057127,"6592":0.6961594449484576,"6593":0.37228729014700657,"6594":0.06923901452173946,"6595":-0.21747877043783387,"6596":-0.475842084958974,"6597":-0.10225837097046962,"6598":-0.3073126073797509,"6599":-0.23118355529376863,"6600":0.04856537104085337,"6601":-0.69130645898314,"6602":-0.11368403318703427,"6603":-0.06025522310162507,"6604":0.7885296337137309,"6605":0.697791618416526,"6606":-0.19888036623181063,"6607":-5.3837919897132105,"6608":-6.497303870852073,"6609":1.8655808349486487,"6610":0.878540695395213,"6611":-0.3253369089244893,"6612":0.3791385893962266,"6613":-0.246139119811546,"6614":0.576028283278391,"6615":0.3684487858565623,"6616":-2.1706843515547996,"6617":-2.0486273976180986,"6618":-1.0055708006093644,"6619":-0.6658257600304064,"6620":-0.5723500411789673,"6621":0.27313815709642,"6622":-0.4139062956555249,"6623":-0.42584464926539756,"6624":0.049208583396447285,"6625":0.2704444248805273,"6626":0.11378671577882848,"6627":-1.0167094903287173,"6628":-0.23078462637703454,"6629":0.5832868041764963,"6630":0.14933401367258134,"6631":-0.5106708086573841,"6632":0.41141951165623847,"6633":-0.056650957818069,"6634":0.19542432386370973,"6635":-0.6874415079927567,"6636":0.23783738735784682,"6637":0.9102100398494049,"6638":0.36344407261781736,"6639":-0.43692508759902454,"6640":0.47218718455792447,"6641":0.7493222445587363,"6642":-0.6225837825965919,"6643":-0.2816026301235851,"6644":1.1149742865898669,"6645":1.5783579474134262,"6646":0.7928309171894989,"6647":0.19297311439485892,"6648":0.6919047168350043,"6649":0.39800228384263325,"6650":-0.3199192763182097,"6651":0.44448034564615374,"6652":-0.3704547189039191,"6653":-0.40456382121137097,"6654":1.1880809343592313,"6655":1.2578765924178843,"6656":0.18052022356261516,"6657":-1.0644440696607562,"6658":0.7734869751447874,"6659":0.4478237211502091,"6660":-0.1696863149622118,"6661":-0.48073130785671303,"6662":-0.011039896925538103,"6663":0.49609822895881694,"6664":0.12109133555316161,"6665":0.9903478382823355,"6666":0.5416202027215768,"6667":0.544375183795346,"6668":-0.4736899874960179,"6669":-0.3283316751882796,"6670":1.732544396220313,"6671":0.00837067491591593,"6672":-0.5243625355167865,"6673":-0.4840491400405304,"6674":0.6102270993227957,"6675":-0.1703713820541446,"6676":0.4397469017685386,"6677":0.8969429943758386,"6678":0.3339313139304488,"6679":0.314637734851359,"6680":0.8485275881920258,"6681":1.687451703068425,"6682":0.9062858777429195,"6683":0.5163479214044676,"6684":-0.3102202361293736,"6685":-0.8905519663161781,"6686":1.0126751204583795,"6687":-1.1705016264766706,"6688":0.39920886511980647,"6689":-1.1070636800501892,"6690":0.4523511309160046,"6691":0.38552566091064494,"6692":-0.09200540426863137,"6693":-0.04571592570569552,"6694":0.7193551276709892,"6695":-0.2026046135086358,"6696":0.9191043768145606,"6697":-1.2644646574107212,"6698":0.7468675267981202,"6699":-0.7510018281802373,"6700":0.14901250702948868,"6701":0.32059083362629526,"6702":0.8505461722891487,"6703":0.4560315397874422,"6704":0.3019541501149113,"6705":-0.7683316161152964,"6706":0.34465442391533824,"6707":-0.12613794391357627,"6708":0.5892359966724771,"6709":0.6033484013444916,"6710":-0.07603178021311054,"6711":0.29432425269466717,"6712":-0.33964598051372336,"6713":0.4417127290917,"6714":-0.25008840771858465,"6715":-0.8711956991970827,"6716":1.0439678874680816,"6717":0.5065052383997172,"6718":-0.09974915389681825,"6719":-0.05015187279049403,"6720":-0.7408086862034128,"6721":0.11334790378300051,"6722":-0.04865997790749934,"6723":1.5582394027599014,"6724":-0.5175883847754316,"6725":-1.2131854736627397,"6726":0.3932990448676868,"6727":0.05152728385796882,"6728":-0.44056582473313155,"6729":0.9705331386772793,"6730":-1.1883598630724082,"6731":0.11933601351452654,"6732":1.5171064332222481,"6733":-0.27966962346167035,"6734":0.3855234304790433,"6735":0.2332258442992124,"6736":0.40035702870372075,"6737":0.07101919369504966,"6738":0.9659387987389577,"6739":0.38330255174105354,"6740":-0.4939333330503931,"6741":-0.44855269223456884,"6742":-0.6669267643075487,"6743":-0.38805648230421874,"6744":-1.100699127841083,"6745":0.6871600389767518,"6746":0.6013155408689282,"6747":0.3577165198198177,"6748":0.3221327190619757,"6749":1.1278977819551004,"6750":-0.8230576366484187,"6751":0.27335639342739165,"6752":-0.4268625534263895,"6753":-3.858841383862813,"6754":-1.7095347213695815,"6755":1.0854487551658751,"6756":-0.8854196395753127,"6757":0.4990320961613487,"6758":0.7354852893170819,"6759":-0.281051314888403,"6760":-0.003016526195196598,"6761":-0.049000049957308764,"6762":-0.3083999571458939,"6763":0.3030713298579616,"6764":-0.6673970575229237,"6765":-1.3912727593334624,"6766":0.04629711484452297,"6767":0.5256959993611976,"6768":0.18345229531594645,"6769":-0.30028928172093067,"6770":0.3252888149831857,"6771":-0.23804784617178396,"6772":0.9053571402029251,"6773":1.7567215463246042,"6774":1.1456164804365296,"6775":1.5100472934941862,"6776":0.05479591220893224,"6777":-0.38483061926327145,"6778":0.2825729557477842,"6779":0.4603000308131278,"6780":0.18152428739508947,"6781":0.7279856015361859,"6782":0.17565121098968842,"6783":1.3473427928300095,"6784":0.5141627843127438,"6785":0.2186808755661915,"6786":-1.0048655469536791,"6787":-0.1849206099415577,"6788":1.282175751763554,"6789":0.6665196980749118,"6790":0.41519680358235267,"6791":0.2261366568995056,"6792":-0.8218456639657243,"6793":1.0267727391042354,"6794":-0.8373374297859101,"6795":-0.5098428418129475,"6796":0.14933320341848916,"6797":-0.540281408304061,"6798":-0.9979505730516108,"6799":0.3954755261666681,"6800":0.39306407001143817,"6801":0.5273208982697897,"6802":-1.5284219483302113,"6803":0.4882427539504144,"6804":0.40660823118153505,"6805":-0.10202104707325121,"6806":0.18725113518175698,"6807":0.542520671733479,"6808":-0.31174312991510783,"6809":-0.8175000092625315,"6810":-0.3158227326431822,"6811":0.9331279149012481,"6812":1.1565346918417414,"6813":-0.4707326211004277,"6814":0.9718885490652083,"6815":-0.38807141538474726,"6816":0.4252736696123191,"6817":0.5252406658673145,"6818":-0.1442431679879382,"6819":-1.223770306471996,"6820":0.2211799520771071,"6821":0.42507911231806544,"6822":-0.524874482625037,"6823":0.4657814766230679,"6824":1.2519088597867252,"6825":-0.4416602371015064,"6826":-0.5777210083247015,"6827":-0.6395569052046579,"6828":0.19654750520995393,"6829":0.3165701435296267,"6830":0.487342677426199,"6831":0.03619967057400698,"6832":0.4597742676320818,"6833":-0.1459126083381098,"6834":-1.3808334276365817,"6835":0.3262283097024893,"6836":-1.3866553786222935,"6837":-0.26154677578123653,"6838":-0.02839369911417666,"6839":-0.825586713979824,"6840":0.15737500646438962,"6841":-1.2188584474928803,"6842":-0.2115654842383704,"6843":0.575993795288891,"6844":0.21088133214119292,"6845":-0.6909069276126706,"6846":-1.270977964667341,"6847":-1.1800674066685373,"6848":0.061221922564341155,"6849":0.14620065123059134,"6850":-0.9788405947784619,"6851":0.20572531685803344,"6852":-1.1381161470523968,"6853":-1.7333766800099137,"6854":-0.6863145920294086,"6855":-2.7359059740010725,"6856":-2.345301208848608,"6857":0.2763802567943198,"6858":-0.6609397736081168,"6859":-1.2853611412627168,"6860":0.18553704286254838,"6861":0.6729493359977043,"6862":0.015153762120231623,"6863":0.3091467654289687,"6864":0.06156037023233759,"6865":-1.496961323931002,"6866":0.41184727913130414,"6867":0.32437507174492786,"6868":-0.9318176210555981,"6869":0.7953689657973633,"6870":0.3152350587532725,"6871":0.8181673750042172,"6872":0.29795082152681057,"6873":-0.1933964836921453,"6874":-0.09921595061343828,"6875":0.5319486961761264,"6876":0.5019792625371619,"6877":0.9127549345889506,"6878":-0.8388988321998819,"6879":-0.5599727320392752,"6880":0.48580756620167126,"6881":0.7271544391707876,"6882":0.9259710801279263,"6883":0.5157358653364004,"6884":0.27788445524410293,"6885":-1.38643720411324,"6886":0.06253791189848008,"6887":-0.0331832774087998,"6888":-0.38832359940823274,"6889":-0.7062169990087696,"6890":0.866356679194923,"6891":0.10691439609265589,"6892":0.33224845326886937,"6893":-0.06133209821641461,"6894":-0.08491575372382318,"6895":1.7582039504725304,"6896":0.7680608153981885,"6897":-1.1103347961379715,"6898":0.9084667814181139,"6899":0.044533554687867516,"6900":-0.5311222420262519,"6901":1.3116121492006094,"6902":0.587595086125081,"6903":-0.16010980577723807,"6904":1.1555972118798332,"6905":0.1829658131003759,"6906":0.5852718454135026,"6907":1.0505327315496773,"6908":-0.18965767766338698,"6909":0.7776372870308875,"6910":-1.797078433710984,"6911":0.13980653397406656,"6912":0.8396154269847628,"6913":0.2488011232794666,"6914":-0.7707685551387714,"6915":0.03409097547637591,"6916":0.7109628723087247,"6917":-0.5872696906791788,"6918":-0.2034782078299603,"6919":-0.6937507663742977,"6920":-1.6416896681673498,"6921":-0.6596526412029169,"6922":0.10941998769678483,"6923":-0.28050609214241723,"6924":0.3484970167251646,"6925":-0.11417310282944398,"6926":0.8261172375102801,"6927":-3.8375861397411373,"6928":0.015076686424796551,"6929":-2.4992295633331114,"6930":0.5669633547504249,"6931":0.6021371263990833,"6932":-0.8256222289895478,"6933":0.011797682982262357,"6934":-0.7003780030009275,"6935":-0.2892083586890166,"6936":2.703838296722792,"6937":0.48435818804997455,"6938":-1.0597994187751612,"6939":0.5822012000564997,"6940":-0.2993814295452017,"6941":-0.47517010718909997,"6942":0.6390589458437181,"6943":0.6463477517778704,"6944":-0.08867599865622838,"6945":0.18661699279674618,"6946":-1.6991598290611865,"6947":0.7716925076885195,"6948":0.22703015286616948,"6949":0.3758373332314563,"6950":-0.25323510372490715,"6951":0.388191081111646,"6952":-0.3695238229800622,"6953":-0.052822527289964206,"6954":0.46253995836475353,"6955":-0.6544425059480776,"6956":-0.27187003324289005,"6957":-0.47191644525139864,"6958":-0.40636372518532365,"6959":-0.12161291853951604,"6960":0.5262693891038719,"6961":0.7517790613585859,"6962":-0.7398737293004152,"6963":1.4317181020833483,"6964":-0.6202957181238958,"6965":0.14942233043387704,"6966":1.0379178550377577,"6967":0.5006188180732729,"6968":1.5175197508629859,"6969":-0.1267594473733374,"6970":-1.2263111824856014,"6971":0.2446519849054026,"6972":1.5946427797328706,"6973":0.030506794499998366,"6974":-0.22291286442993852,"6975":-0.3686342823823079,"6976":1.6891656845633343,"6977":0.23455445919123472,"6978":0.6892691784859815,"6979":0.23394033149740356,"6980":-0.03417302900355504,"6981":-0.1938117774222382,"6982":1.1019793490921395,"6983":-0.47125241788324435,"6984":0.2636978872718628,"6985":0.3370816059937037,"6986":0.7222103808354793,"6987":1.3098206396689078,"6988":-0.8392018300757486,"6989":1.247057710869868,"6990":0.43058229995133634,"6991":0.34939964518414446,"6992":1.8095546844523238,"6993":-0.6586798244154914,"6994":-0.6131530920106935,"6995":-0.26943309132367554,"6996":-0.43904685286540746,"6997":-1.2172387502591357,"6998":1.42826934594884,"6999":0.24990096295685693,"7000":-1.0668942362952996,"7001":-1.012956649132288,"7002":0.5532929013416258,"7003":0.3888738857172995,"7004":0.28629366753409874,"7005":0.17156277379793597,"7006":-0.8361283938382481,"7007":0.849083252763984,"7008":-0.020128227576063053,"7009":1.6118450592654403,"7010":0.6950111184874517,"7011":1.0027957261513594,"7012":0.23772817651100508,"7013":-0.26664958951499573,"7014":-0.01705242052573658,"7015":0.2679035842235868,"7016":-1.2142281910738497,"7017":-0.28275858876496285,"7018":-0.1446994780177886,"7019":0.23765628571990394,"7020":0.48381665989835343,"7021":2.2486390158378318,"7022":0.42439571761213124,"7023":0.5590064417042444,"7024":-1.752902649796172,"7025":0.497566908617416,"7026":0.6888555886551414,"7027":0.4722838503508791,"7028":1.1224649008465064,"7029":0.4904370897324921,"7030":-2.502617596873539,"7031":1.0788201507177169,"7032":-0.23828427052601606,"7033":-1.1621715029273874,"7034":0.20510665423159188,"7035":-0.08770372120111151,"7036":-0.4275816632987878,"7037":0.21465533896405112,"7038":-0.3534869868015529,"7039":-0.6156161053863469,"7040":0.4393211855584032,"7041":1.196568378689544,"7042":-0.2763115220967457,"7043":0.8314561814764857,"7044":-0.5907939529658348,"7045":0.49351805705278073,"7046":-0.3565649276166154,"7047":1.3234301304828648,"7048":-0.8861496904724765,"7049":0.7163290673377433,"7050":0.28749727878406595,"7051":0.013098544088668253,"7052":-0.4188968784541891,"7053":0.8534817469623992,"7054":-1.1866853263424466,"7055":-0.3099257356643254,"7056":-0.9521636821277296,"7057":0.04885725046424334,"7058":-0.3667988325819728,"7059":0.38693670254871937,"7060":-0.30342409102292284,"7061":0.5682696631120212,"7062":-0.4596622258199227,"7063":0.12892718581433885,"7064":-0.7656093973727337,"7065":-1.5395294429703401,"7066":-0.8034130982933513,"7067":-0.24393277677600017,"7068":-2.279169156841437,"7069":-1.521893579863712,"7070":-1.3398617646932365,"7071":-0.8249667337414253,"7072":-0.6874598949018884,"7073":0.3861047528678288,"7074":-0.0057443525211222516,"7075":-0.8745444952349677,"7076":-0.6595031258486498,"7077":-0.7446040866327427,"7078":0.09390697323498257,"7079":-0.6249128215744286,"7080":-0.6643399437109643,"7081":0.2979155841694774,"7082":0.6117288328315281,"7083":-0.7033040888818988,"7084":-0.05312854027220825,"7085":0.9518035683612107,"7086":1.1358685248286435,"7087":-0.6049965251629497,"7088":0.24285487127893696,"7089":0.15425116322138574,"7090":0.514969046750701,"7091":1.4575448472593984,"7092":1.0493945345639826,"7093":0.08872948059649387,"7094":0.2794016037907647,"7095":-0.1001665435215034,"7096":-0.4390738800454063,"7097":-1.9036149100944275,"7098":-1.0614963922649956,"7099":0.19128199607820262,"7100":2.0479290908667007,"7101":1.5713974770993346,"7102":1.2514493308372585,"7103":-0.8574863438985886,"7104":-0.2584018921937778,"7105":-1.256225512844501,"7106":-0.6131435702993268,"7107":-0.46213031523155323,"7108":0.3836788146613535,"7109":1.394386538298409,"7110":-0.1605286683506682,"7111":-0.3152819407450049,"7112":-1.0307544549942416,"7113":-0.400164892206321,"7114":0.3459322735768907,"7115":0.4635392483498639,"7116":-1.4435222084201764,"7117":-1.2988187098871131,"7118":-0.580914609153199,"7119":-1.0067496767080515,"7120":0.43486493058536757,"7121":-0.13653401274879728,"7122":-0.23746636497748352,"7123":0.3255912336024541,"7124":-0.5120966173645646,"7125":-0.9243020900645196,"7126":-0.020656419958543303,"7127":-0.4234317458083439,"7128":-0.8866705449510406,"7129":-0.4602002736529633,"7130":-1.0679277217493806,"7131":-0.4411351931966046,"7132":0.4743699333728898,"7133":-0.5041544832405531,"7134":0.35061455731300417,"7135":0.9733231863543041,"7136":0.23647761397596634,"7137":1.2679413835485152,"7138":1.1800234035520365,"7139":-0.6654362793531383,"7140":0.1609753813245807,"7141":-0.31601718337247736,"7142":0.3901021139260977,"7143":-0.1602080481762257,"7144":0.20595723393136695,"7145":-0.6202730641283131,"7146":0.8465450959968763,"7147":0.4646772779386288,"7148":0.2139937270719206,"7149":0.5224585720033121,"7150":1.1389915145635099,"7151":-0.9285284998420751,"7152":0.7143167478288779,"7153":-0.1203938468530876,"7154":-1.2174029077927508,"7155":-0.19197985467024078,"7156":0.9291732967465467,"7157":1.290451891558896,"7158":0.7493637305984506,"7159":0.13191322138031739,"7160":-1.6446233976283158,"7161":-0.21187722272856138,"7162":-1.3335059524274686,"7163":2.4582505749568986,"7164":2.776695094695989,"7165":1.0453530420165706,"7166":0.839320418377371,"7167":1.6651514286043136,"7168":0.23681045444671162,"7169":-0.8351495617859617,"7170":0.09038034137556011,"7171":1.0186372117589764,"7172":0.0656700729962576,"7173":0.8585020773985561,"7174":0.10453211642189213,"7175":0.5898247434875326,"7176":0.17509389401153735,"7177":-0.1603699198886373,"7178":0.6506597894499803,"7179":-0.7263100185908563,"7180":-0.22526708351262878,"7181":-1.6171645103618941,"7182":-1.1789170081173659,"7183":0.13387086937856976,"7184":-0.7805968918880883,"7185":1.4148623635785473,"7186":0.6564272759482561,"7187":-1.144362075469205,"7188":-0.13919883991686127,"7189":1.0715367370982927,"7190":0.5033201478935976,"7191":-1.4077031547683263,"7192":0.6198414211133749,"7193":-0.9632224296472209,"7194":0.20512053148003914,"7195":0.48024934064269753,"7196":-0.004411987825150176,"7197":-1.3256812571177101,"7198":-0.24226126620444854,"7199":1.1976048192393238,"7200":-0.032819087411189905,"7201":1.1863111115302083,"7202":-0.9505862606320981,"7203":-0.19861813694402572,"7204":0.352210084543288,"7205":-1.1046432197009253,"7206":-1.4336742436958074,"7207":0.7842773943238902,"7208":0.8140107169031031,"7209":-0.5663041382370845,"7210":0.7028569135303415,"7211":0.5889746487482007,"7212":-0.008457044640527623,"7213":-0.11919314604202129,"7214":-0.6806650425561275,"7215":0.43976051602059313,"7216":0.06643186739984719,"7217":-0.3138360105888135,"7218":-1.1341445408769943,"7219":-0.8398300248918263,"7220":-0.3598361261049697,"7221":0.8289007221434411,"7222":0.3527133659575687,"7223":0.05012299687023573,"7224":-1.3620044911302074,"7225":0.2695787176628653,"7226":-0.5972943467403836,"7227":-0.6535915067327667,"7228":1.5270618631361963,"7229":0.09723715329457966,"7230":0.4927097897649781,"7231":0.5468189476491786,"7232":-0.45371451778450067,"7233":1.4937378727554629,"7234":1.3248599919788426,"7235":-0.6939377882812053,"7236":-0.3239186494145655,"7237":0.4385160446513315,"7238":0.905112190661386,"7239":-0.3147286366165702,"7240":-0.8041546031373815,"7241":0.7271051093364584,"7242":-0.20098228890163908,"7243":0.1414799298381781,"7244":-0.29659721658393784,"7245":0.7344436538432337,"7246":1.579073417498249,"7247":1.5649867278574887,"7248":0.3577772110324071,"7249":0.26066863251398725,"7250":1.803792564649941,"7251":1.2322342982541417,"7252":-0.33968629950865353,"7253":0.42350035279425247,"7254":1.3008252540760588,"7255":2.668690492784515,"7256":1.0541149852510323,"7257":0.5119028577044291,"7258":0.4858667342536614,"7259":0.7734812037252445,"7260":0.7099926985732177,"7261":0.32639922646020264,"7262":-0.012677402931702973,"7263":-1.5162902109383232,"7264":-4.27284113569966,"7265":-3.5306360054765515,"7266":-2.0387988509193935,"7267":-1.9199666531269846,"7268":-0.07350354515106841,"7269":-0.6132177825080486,"7270":-0.74588099882657,"7271":0.44408145831174217,"7272":-0.26778796858377146,"7273":1.0492298727468963,"7274":0.8221128980145254,"7275":-0.08549546493900903,"7276":0.40859423591260535,"7277":0.8695984478711499,"7278":-0.7389470021228167,"7279":0.276537512159121,"7280":0.42806850128133367,"7281":1.03697967862328,"7282":-0.44613026127323535,"7283":1.2655612798374818,"7284":0.42789231526834703,"7285":-0.5269851104258062,"7286":0.14159368404070397,"7287":-0.7138243494425129,"7288":0.47276571298659886,"7289":0.4266053996321748,"7290":-0.04363980861396494,"7291":1.3520534565069782,"7292":0.7358061201995388,"7293":0.28462989662050364,"7294":0.8343823687690314,"7295":-0.5976654103873164,"7296":0.6502203646034931,"7297":0.3790055924216406,"7298":0.019037702594592625,"7299":-1.0120618615753545,"7300":-0.9316674035043369,"7301":0.16738441136049495,"7302":-0.4187607629147973,"7303":0.41696102530199325,"7304":-1.9436095552807175,"7305":-1.1141798331003683,"7306":-0.11092668869165491,"7307":-0.28117726631823065,"7308":0.9141201430574463,"7309":-0.8877449934986478,"7310":-0.44909426156797205,"7311":0.476806227780398,"7312":-0.14427257083864437,"7313":0.8120525496195857,"7314":0.7149751348453595,"7315":-0.25202041881096815,"7316":-0.9699737765826111,"7317":0.05453337350046383,"7318":0.2684580417281712,"7319":-0.09144118814354853,"7320":0.1006548850665844,"7321":-0.5205229522279957,"7322":0.835361801384298,"7323":1.1951376980036923,"7324":0.07065842700502444,"7325":-0.6872709413738102,"7326":-0.8564694458145107,"7327":1.3688120401020611,"7328":2.306227636766591,"7329":0.9757027141595623,"7330":1.2154792026804295,"7331":-0.6074298051103767,"7332":-0.7167794586644203,"7333":1.6098345648924655,"7334":-1.3980531053673348,"7335":-0.8038840256817809,"7336":-0.4032095330492637,"7337":-1.0484748281695497,"7338":-1.4298289418042607,"7339":0.11933014334564816,"7340":-1.024542507451251,"7341":-0.5962084643069072,"7342":0.31276855860447056,"7343":-1.2019349552403795,"7344":0.236266049133997,"7345":0.3885971316166934,"7346":-1.3747803132831908,"7347":-1.259396672970545,"7348":-0.9282135294359631,"7349":0.06519134351811941,"7350":0.5158101700990497,"7351":-0.1469219675749413,"7352":1.6109008223145003,"7353":0.6639178918095586,"7354":-0.49382185768842973,"7355":-1.3018387372065037,"7356":-0.6482456882785264,"7357":-1.5255701027468365,"7358":-0.6563788965972044,"7359":0.2531092105749539,"7360":-0.014050243251959051,"7361":-0.7043889055717155,"7362":0.04022713352367639,"7363":-0.1619749200326712,"7364":-1.2428291952096153,"7365":0.23131850473414584,"7366":1.7312412988567016,"7367":0.714832976306249,"7368":0.30814776729950555,"7369":-0.7376021667324887,"7370":-0.4936283280757465,"7371":0.13495574185543224,"7372":-0.08287735451686007,"7373":0.37367365783656925,"7374":-0.27020183865697983,"7375":0.00043734155690151037,"7376":-0.9608526485017588,"7377":0.39430569196144644,"7378":-0.4921395977496414,"7379":1.1262785027447233,"7380":0.03381443021318099,"7381":-0.18248572390626694,"7382":-0.09807507044902815,"7383":0.018018405489086183,"7384":0.4833760060552015,"7385":1.3559421468904034,"7386":0.45925280054164785,"7387":-0.2867914784439182,"7388":0.7129649230498857,"7389":-0.012181982445555538,"7390":0.47891495681196616,"7391":-0.515291659186024,"7392":0.34689953249530736,"7393":-0.1714888412292329,"7394":0.8861012749890964,"7395":0.6302306057324436,"7396":-0.9016124644100917,"7397":-0.20606220168134612,"7398":0.025025268841850436,"7399":-1.1488273813471526,"7400":-0.033241264010437054,"7401":0.3478527343253315,"7402":0.7123351198618713,"7403":-0.7503481005018379,"7404":-0.2893650921687489,"7405":0.42778354215737074,"7406":0.36078472532154704,"7407":-0.08758094887436613,"7408":-0.017759551392193502,"7409":0.27622925121731756,"7410":2.5677145982382847,"7411":-1.2060497423265597,"7412":-0.7631483364005447,"7413":-1.3641107927990859,"7414":0.40072176377095303,"7415":-0.577944637241251,"7416":0.37511869657634556,"7417":0.3707195403857289,"7418":-0.7080479134983777,"7419":-5.2602032672654,"7420":-8.095493644029567,"7421":-4.4775326261039785,"7422":-0.7728599208894907,"7423":-0.08725120710493826,"7424":-0.1279565325246229,"7425":0.014294412729856945,"7426":0.4007889664728087,"7427":-0.23270423169631732,"7428":1.35994226328914,"7429":0.05809832081171734,"7430":-0.17776668615580277,"7431":-0.5104476637694726,"7432":-0.5877098995532453,"7433":0.6841177008670375,"7434":-0.02519588140909726,"7435":0.2994834640752066,"7436":0.08667737262914359,"7437":0.5461753148076142,"7438":0.3411739397763641,"7439":0.3000186511765761,"7440":-0.2955180339403582,"7441":0.30762505904192883,"7442":-0.08068060227467758,"7443":-0.22054873814497233,"7444":-0.36366044110486023,"7445":0.14438518967063316,"7446":0.1423373586432319,"7447":1.0696388444380016,"7448":-0.3884063469109013,"7449":0.15012130875139135,"7450":-0.9626047651261972,"7451":0.2146285460793783,"7452":-0.5197349796986254,"7453":-0.3519043646607886,"7454":0.17124674871045115,"7455":-0.7091628414630157,"7456":0.290407357404034,"7457":0.558076168692446,"7458":0.3555859931391317,"7459":0.30899808818632757,"7460":0.5660523421672681,"7461":-0.36570834725962087,"7462":0.24927057663643562,"7463":0.8623226846899873,"7464":0.6048469477184572,"7465":-0.1912500096869469,"7466":0.23204721237242007,"7467":-0.05854949604760206,"7468":-0.6780426141469166,"7469":-1.064658209702845,"7470":0.019899101533153284,"7471":-0.09459591938028003,"7472":-0.7689127603172025,"7473":-0.3549981140031022,"7474":0.0009181774826563207,"7475":0.34423996583503585,"7476":0.2774163991432229,"7477":0.05374154004122187,"7478":-0.30934837197662945,"7479":0.22011412947843467,"7480":0.5989222265855053,"7481":0.8282218245699255,"7482":0.5806818335908331,"7483":0.354924243404754,"7484":-0.23155666909048778,"7485":-0.17528502242801564,"7486":0.7167192880215901,"7487":1.008182048057256,"7488":0.24316368501417515,"7489":0.6964787803419169,"7490":0.1447899270096492,"7491":1.3416921248129863,"7492":0.7397299929941434,"7493":-0.4402144130127792,"7494":0.5973370604113983,"7495":0.14653027526181434,"7496":1.7818523754432254,"7497":0.8662221515068502,"7498":-0.08815107079979488,"7499":-1.0601993981365518,"7500":-0.9935709543100457,"7501":-1.2279704728174359,"7502":-4.655074067732147,"7503":-3.7867129231549255,"7504":-0.10546212537674024,"7505":-0.5397865119337091,"7506":-0.23730762842569417,"7507":-0.13379996378516945,"7508":0.35216132338278017,"7509":-0.7376719506737922,"7510":-0.7029105323323156,"7511":-3.767116460516603,"7512":-0.5619056721344018,"7513":-0.9968779442201634,"7514":-1.2081875678864158,"7515":-0.8345665218611176,"7516":-0.2566610902870508,"7517":-0.24476363673009094,"7518":-0.4983524561054442,"7519":0.1347463620552884,"7520":-0.007156925955287028,"7521":0.35963415996338666,"7522":-0.6631937008566013,"7523":-1.207077658344834,"7524":0.5360608457294366,"7525":0.7254671049905222,"7526":-0.4901650433765246,"7527":0.19736095351955177,"7528":0.1876723915224402,"7529":-0.3677226732068467,"7530":-0.17711039886221053,"7531":0.14753935065696872,"7532":0.5552259439439047,"7533":-0.707778401958308,"7534":-0.32932944062366915,"7535":0.5068906528093599,"7536":-0.4828238093415523,"7537":0.33520741289578515,"7538":0.7883497393212602,"7539":0.5472534329094518,"7540":0.8289724044568073,"7541":0.6552706454670264,"7542":-0.3741237483545735,"7543":1.1061121539973409,"7544":-0.6190755906234525,"7545":-0.030601774939399657,"7546":-1.1904878843186342,"7547":-0.025666837509060927,"7548":0.6258253873099396,"7549":-1.4588823434422447,"7550":-0.2205448076332597,"7551":0.5509998804839356,"7552":-1.1069611995826707,"7553":1.0384312637563369,"7554":0.3037512642168766,"7555":-0.3205007224556457,"7556":0.0159142934823163,"7557":0.3149118146418808,"7558":-0.7176400498158536,"7559":-0.007917984092818936,"7560":0.3644491405622757,"7561":-0.21183164123867204,"7562":0.025589475005908725,"7563":0.2669553455825673,"7564":-0.4435152743570591,"7565":-2.4317826436881056,"7566":-2.437423591166914,"7567":0.13946641088340753,"7568":-0.6075721079400963,"7569":1.335437095968415,"7570":0.21580420971238806,"7571":-1.271892391601421,"7572":-0.7797196463473899,"7573":0.7271625557802334,"7574":0.9120966717612115,"7575":2.106937362698882,"7576":0.6443444698316887,"7577":-1.0041777472477553,"7578":0.6148173408210318,"7579":0.128600130530158,"7580":0.10174462017944823,"7581":-0.05399990843354565,"7582":-0.5803913718307357,"7583":0.7268254351692665,"7584":-1.2579917822107625,"7585":3.2171092734047506,"7586":0.641952930477303,"7587":0.4631205313871848,"7588":0.049980145994811084,"7589":-0.171197990016268,"7590":-0.3466658605158575,"7591":-0.7676503865280179,"7592":-1.3823016090259965,"7593":1.262734734222433,"7594":-0.4298772618924835,"7595":0.3982825784612264,"7596":0.0356900069959001,"7597":-0.9572377512900405,"7598":0.6072048534144326,"7599":0.6280411309167803,"7600":-0.88851411681718,"7601":-1.3451441411586067,"7602":-0.8883782685080244,"7603":-0.053549233442406356,"7604":-0.06624117184194632,"7605":-0.8780014834952727,"7606":-0.20757843643930735,"7607":1.3854764124358043,"7608":0.7979799657984465,"7609":-0.5104214476190312,"7610":0.010213484513026509,"7611":-0.35951774109874507,"7612":-0.456545966792333,"7613":-0.6301715229146098,"7614":0.687241079870832,"7615":-1.9085373591458474,"7616":0.5199484151413333,"7617":0.13828525799210947,"7618":-0.6654474075781832,"7619":-0.6145630547214095,"7620":0.9381510512784875,"7621":-1.224393910758157,"7622":-0.6034814994040657,"7623":-0.8806707625103044,"7624":0.9820245696672004,"7625":-0.8140540687886362,"7626":0.21265284890640856,"7627":0.15591974040355255,"7628":-0.4216005984998456,"7629":0.04857255630833325,"7630":-0.1905125779101207,"7631":-0.5393013249996964,"7632":0.012960732901516524,"7633":-0.15338672881194923,"7634":-0.4229559248274744,"7635":0.35244676570162276,"7636":0.3725516042404115,"7637":-0.5068488267816802,"7638":-0.09681151743886685,"7639":-0.013872475496659563,"7640":0.0937015588155822,"7641":-0.2773692779036164,"7642":-0.4385116831647817,"7643":0.3253183697248512,"7644":-0.20921393453228682,"7645":0.42396167903767984,"7646":-0.27882416418382133,"7647":0.07936524097679898,"7648":-0.3393911894862304,"7649":-0.8039407537506681,"7650":0.2001946473565913,"7651":-0.46654700185939046,"7652":-0.059797908955318294,"7653":-0.5705381041767661,"7654":0.9554907893059756,"7655":-0.054334391432561704,"7656":-0.34414757084055203,"7657":-0.0007341971663064622,"7658":0.22240558466275703,"7659":-0.5258443280763548,"7660":-0.028439269017706655,"7661":-0.43190296484897805,"7662":-0.2482452980321709,"7663":-0.27514943026184835,"7664":0.7651011231207049,"7665":-1.289759378916638,"7666":-0.3490867249528406,"7667":-0.37880395816556284,"7668":0.1811211537156369,"7669":0.13483872349325898,"7670":-0.247230985092276,"7671":-0.2045588677682134,"7672":-0.22565035431598804,"7673":9.20769608641429,"7674":0.3470317990260626,"7675":-0.21134311305865794,"7676":-0.22810369515156734,"7677":-0.026335539935797167,"7678":0.09807941615381152,"7679":-0.10399729808656388,"7680":0.517809163826554,"7681":0.408588575400784,"7682":-0.07933828471217612,"7683":-0.12889260644957268,"7684":-0.514048241195684,"7685":0.2933686508185925,"7686":-0.11876504180115739,"7687":-0.14293219029271104,"7688":-0.38161066353787026,"7689":-0.4608011375822189,"7690":0.025674144069876476,"7691":0.6170340902440439,"7692":-0.14062853197715566,"7693":-0.3628740122792181,"7694":-0.24939216186246335,"7695":-0.3653967096692669,"7696":-0.23994865346518346,"7697":0.020910825251014876,"7698":-0.4246782042286868,"7699":-0.7097190037431592,"7700":-0.3638491098921675,"7701":-0.2630383029993655,"7702":-0.6248212248703029,"7703":0.17262036319694765,"7704":-0.22733169481090942,"7705":-0.32527586671525605,"7706":-0.31365473771258334,"7707":-0.16044067924776792,"7708":-0.002405210727371707,"7709":-0.14532228945693895,"7710":-1.7255171844724886,"7711":0.2672622515716006,"7712":0.5293467600439173,"7713":0.9030313619874039,"7714":0.5408979241650967,"7715":0.6269311544953028,"7716":0.9355643372606094,"7717":-1.9510323664195626,"7718":0.3223840830502466,"7719":-0.6442336660983973,"7720":1.1148673593793854,"7721":0.4721262504901865,"7722":0.924037579403112,"7723":0.5186848085994255,"7724":0.657506725293395,"7725":0.4276499201899675,"7726":-0.3911960090166746,"7727":-0.11178104531658212,"7728":-1.7771602953591021,"7729":-0.019891596436112966,"7730":0.799737990640284,"7731":0.834434205907926,"7732":0.6314629278212557,"7733":0.4051069925384506,"7734":0.7109123281916678,"7735":-0.2269858875589312,"7736":-0.29044274763296035,"7737":-0.4855053895212428,"7738":-0.12619969753126878,"7739":0.6640866360370762,"7740":0.9097057448182154,"7741":0.3972777173466136,"7742":0.50488932394692,"7743":0.3988721267698683,"7744":0.6754346523506264,"7745":-0.8048165770218685,"7746":-1.9906609718151154,"7747":-0.8699393378479369,"7748":0.9949864029983926,"7749":0.9098207219336586,"7750":0.14894949930704682,"7751":0.7934369082586563,"7752":0.2433441718873728,"7753":1.4927511691545314,"7754":0.11477883157762747,"7755":0.4116181222589119,"7756":0.4850041377422101,"7757":0.5783929874566037,"7758":0.7143793177298209,"7759":0.3746638759820936,"7760":0.8307425095890263,"7761":0.4335100758394917,"7762":-0.1941719975401607,"7763":-1.0933814434386488,"7764":-0.19531287960569163,"7765":0.4451274539060244,"7766":0.8784917270241962,"7767":1.2829821119129774,"7768":0.40923388558532864,"7769":0.7370475022134407,"7770":0.4445469423784245,"7771":1.0546948836244516,"7772":0.13830046305271648,"7773":0.30536572575209225,"7774":-0.16516052567681802,"7775":1.4883208913952535,"7776":0.6484855624177512,"7777":0.4148090372391948,"7778":0.6761731496159207,"7779":0.5211772376789602,"7780":1.398277048684014,"7781":1.5287918893207155,"7782":2.3032860587983195,"7783":1.3223955251644113,"7784":0.9125472229754753,"7785":0.44430322082096846,"7786":0.2569512143421522,"7787":0.3990896098084752,"7788":0.3332484765365696,"7789":0.8884935442012335,"7790":0.5137816384645315,"7791":-0.42515942298389514,"7792":0.048567289645170916,"7793":-0.5410801772084819,"7794":0.40021652933214896,"7795":0.5820649359273287,"7796":0.217644181880153,"7797":0.4707005248188858,"7798":0.8127049165412822,"7799":-0.2393319522277201,"7800":0.3904982555921967,"7801":-0.41162623987955566,"7802":-0.012121438491282562,"7803":0.6325238842001804,"7804":0.8237043519482895,"7805":0.6220329829273735,"7806":0.319857750991952,"7807":0.470806777103415,"7808":-0.4202410823268429,"7809":0.5930973300459208,"7810":-0.03672102349409703,"7811":0.2100056964522137,"7812":0.23350409370712213,"7813":0.5348244517453298,"7814":0.7256131177526262,"7815":0.4209190948020252,"7816":0.23752903550878907,"7817":-0.9984109014148691,"7818":1.189279926976392,"7819":-1.373013497993471,"7820":0.37779787876331566,"7821":0.40523328542713777,"7822":0.9410814693494459,"7823":0.37150777924645595,"7824":0.3355409416891377,"7825":0.5517019197472609,"7826":-0.39618871535827627,"7827":0.5829165297834707,"7828":-1.8060005910314498,"7829":-2.1451429975165976,"7830":0.6968239066030926,"7831":0.637833876779626,"7832":0.3319591036289646,"7833":0.5528540841125095,"7834":0.17443804279586378,"7835":1.1539073346097966,"7836":-0.833706731280471,"7837":-2.067660735712111,"7838":0.6154361236044167,"7839":0.6551698933932755,"7840":0.7122703403449925,"7841":0.2443288881208148,"7842":0.5283998356024155,"7843":0.3090905627828605,"7844":1.0953596388868818,"7845":0.41330341031822415,"7846":-0.5752084351782273,"7847":0.5173507423225711,"7848":0.9811450504254966,"7849":0.8673130723237996,"7850":0.6019195016638728,"7851":0.1263271925716219,"7852":0.39411305433369137,"7853":1.0360623309507833,"7854":0.10579902134595642,"7855":0.06393582077638034,"7856":0.11011303029953852,"7857":-0.04297954788006964,"7858":0.6384880571938699,"7859":0.38857021419216936,"7860":0.4438505068647488,"7861":0.26685316280365967,"7862":0.46054419127887863,"7863":0.39416841166271954,"7864":0.25577569874542816,"7865":-0.28777549350902887,"7866":0.44165562816168946,"7867":0.47744650043580655,"7868":0.5099798243285056,"7869":0.2474369515709261,"7870":0.4547249101929908,"7871":0.754859413930627,"7872":1.1024333861097417,"7873":-0.4725159603710782,"7874":0.6537374023560938,"7875":-0.34267825932278,"7876":-0.8407848062152357,"7877":0.0636619921688691,"7878":0.4600957864619286,"7879":-1.5634829261890333,"7880":0.4974592082269325,"7881":2.5912416350927203,"7882":1.0498191563068136,"7883":0.00022322531981097817,"7884":-1.15221811128914,"7885":0.8306970618064327,"7886":-0.21051684869211576,"7887":-0.26951658083940977,"7888":0.762692843166484,"7889":-0.27972047433144903,"7890":0.00676902780727026,"7891":0.12059186224015897,"7892":-0.27060486656225285,"7893":-0.40673546929029003,"7894":-1.813085234189253,"7895":-0.3834383149591041,"7896":-0.4753205513625975,"7897":0.8592451699052048,"7898":-1.3520507700070334,"7899":0.04178938944089553,"7900":0.5758653702804303,"7901":-0.7812074877836108,"7902":-0.25119761526476,"7903":-0.06483698296462104,"7904":1.2140979555838884,"7905":-1.0296168896680287,"7906":0.45725326659283455,"7907":1.3104108430035053,"7908":-1.3820659696124067,"7909":-2.330795002978431,"7910":-2.4682822358405447,"7911":1.0743278428241991,"7912":2.05502894519035,"7913":0.6361530989515298,"7914":0.052375211679452895,"7915":-0.022147810489031014,"7916":-0.8192117428183073,"7917":-0.6362629134827593,"7918":-0.1288630618719868,"7919":-0.19674295104386647,"7920":0.0545377625834599,"7921":-0.8355978007215735,"7922":-1.135631531388446,"7923":1.1296767195063853,"7924":0.3690007899704442,"7925":1.2683908045827266,"7926":0.4062377486588012,"7927":0.6311588482108267,"7928":0.4902071145403179,"7929":-0.10158551232452129,"7930":0.4505240455337866,"7931":-0.20409978881300472,"7932":1.398383974449148,"7933":-0.004392735149498249,"7934":0.15385662439824496,"7935":0.7864303728413673,"7936":-0.049308085956875,"7937":-0.3396666177080771,"7938":-0.8455259801203532,"7939":-1.2962109195938052,"7940":0.040285913111833854,"7941":0.92965345847906,"7942":-0.01139712530745635,"7943":0.6973485457749885,"7944":-0.17285526540537854,"7945":-0.5630923714754774,"7946":0.1681936789869753,"7947":-0.1443066908481242,"7948":-0.468830164506487,"7949":-0.2008045642513872,"7950":-0.18903220553090277,"7951":-0.49974032516927347,"7952":0.022531756524112954,"7953":0.1986229492065813,"7954":-0.13997831816150005,"7955":2.4519198380232607,"7956":1.5156769131430636,"7957":2.0334276686758486,"7958":1.8281520319870053,"7959":1.2595534987960288,"7960":0.8887015121306857,"7961":0.49478181605743515,"7962":0.953587528074227,"7963":-0.6072987963908428,"7964":0.013615270895109038,"7965":1.0605436212146335,"7966":1.8500267633904242,"7967":1.2213888117953784,"7968":0.9028187089369503,"7969":1.0825797908207457,"7970":1.1365644173807796,"7971":0.2160475236810131,"7972":0.898915717498165,"7973":-2.5404962040885697,"7974":-1.4605988579601217,"7975":0.5753818964952192,"7976":1.1017295654063883,"7977":1.0358533873882894,"7978":0.8316132518131896,"7979":0.6583977157333231,"7980":0.9576166506521023,"7981":-2.2183827016088826,"7982":-0.11007062790969462,"7983":2.2327084545761755,"7984":1.6828030508040346,"7985":2.1704284922239525,"7986":1.3430421297227428,"7987":0.6139024468663101,"7988":0.5412751663362219,"7989":0.7673008639029203,"7990":-0.15599697620535508,"7991":-2.2582798135145516,"7992":-2.995651827752527,"7993":0.9619936848647404,"7994":1.8819268579138295,"7995":1.1018403069712224,"7996":0.9781378767810023,"7997":0.4693199392691334,"7998":0.47867213187346486,"7999":-1.1236466193082124,"8000":-0.314759715485525,"8001":1.1176536824253167,"8002":2.0607826287199527,"8003":2.36526198070716,"8004":1.176263467308834,"8005":1.0110380252037536,"8006":0.6633635592762681,"8007":0.4875955706042389,"8008":-1.2809903256423538,"8009":-0.29145946506457304,"8010":0.7210147870899556,"8011":1.6036498670956902,"8012":2.2361142424352956,"8013":1.2449773024454212,"8014":0.869653864352565,"8015":0.706053492356547,"8016":0.7868142460981621,"8017":-1.2004104566028313,"8018":-0.4291165174522399,"8019":1.7088855642447545,"8020":1.5483430813945143,"8021":1.3374712034315945,"8022":1.3492612535337014,"8023":0.7887770769680926,"8024":1.11268567599815,"8025":0.6507662576745687,"8026":-0.6913276991023686,"8027":0.6052914778273412,"8028":-0.6868010633982673,"8029":0.972125637771584,"8030":1.6242247138551205,"8031":1.4376041174019296,"8032":0.7256969302802313,"8033":0.2914671169263755,"8034":0.8556365280591399,"8035":-0.5889548136735787,"8036":-0.8499807855923883,"8037":0.6772274234467105,"8038":-0.7456114031540706,"8039":-0.05645249860486534,"8040":-0.40396020216413264,"8041":-0.20153793073749324,"8042":-0.836431888626854,"8043":-0.18305701330738913,"8044":0.3935014531727942,"8045":0.22335611933593782,"8046":-0.06558421089867991,"8047":-1.4441317654915187,"8048":-0.03255925957941591,"8049":0.29617889081886223,"8050":-0.23411752280288775,"8051":0.26075083888622036,"8052":0.10771738786952459,"8053":0.9016653976049449,"8054":0.5739146135188669,"8055":0.2721163029146954,"8056":-0.34165674027961096,"8057":1.3443482249799192,"8058":0.9063350060206993,"8059":-1.0836029202192967,"8060":-0.9837146175020218,"8061":-0.36200496800819854,"8062":1.974650872516717,"8063":-0.3103927989681962,"8064":-0.4746248008950152,"8065":0.3706111264314549,"8066":-1.1378935998788575,"8067":0.4482859882196091,"8068":-0.11024301619292681,"8069":0.42432212277599496,"8070":-1.135697641453164,"8071":-0.08687890757785974,"8072":0.6593484378748712,"8073":0.05344257684235198,"8074":0.9352159123210241,"8075":3.89813158327556,"8076":1.3150333322267385,"8077":1.3884100885035093,"8078":-0.6053176850475561,"8079":-0.3987943639299027,"8080":0.22288604234434153,"8081":-0.8557537466403673,"8082":0.41818187320400385,"8083":2.843065522420339,"8084":0.7337363774845421,"8085":0.39352258138916313,"8086":0.22592386248356483,"8087":0.6611387438922948,"8088":0.039725888507271594,"8089":0.7590041366176188,"8090":-0.4024391205341459,"8091":0.12727715741452,"8092":-1.657259570081584,"8093":-2.7265997723541004,"8094":-1.6765739891139566,"8095":-1.4705073035493335,"8096":-0.6441616009230093,"8097":-0.4224922731019296,"8098":-0.8566126545947607,"8099":0.7993903601135693,"8100":-0.011189049974194145,"8101":-0.5714480589485945,"8102":0.3278589911921232,"8103":-0.48922286844701085,"8104":-0.6752356789322357,"8105":-0.10762660274910174,"8106":0.3528389367956028,"8107":0.18481022934403643,"8108":-0.02153252557819522,"8109":0.3632997144167382,"8110":0.5497394084591868,"8111":0.3738221348499512,"8112":0.08237929255102587,"8113":-0.6552466694369143,"8114":0.09158404305845194,"8115":-0.9539542186487258,"8116":-0.4346105698049332,"8117":-1.0341028526577862,"8118":1.1368973525859205,"8119":-0.07843607772415717,"8120":1.5210660836603354,"8121":-0.5049033763528257,"8122":0.15810511960343832,"8123":0.8379077056322998,"8124":0.37364713021783136,"8125":0.06728807249476873,"8126":0.2752113541807145,"8127":-1.3653804952590867,"8128":-1.828935836241484,"8129":0.08252548905443842,"8130":0.15062328263415595,"8131":-0.31198781902330636,"8132":0.5749529204631793,"8133":0.019257565471688356,"8134":0.2965307231491024,"8135":0.3074610512161762,"8136":-0.5533223211694717,"8137":0.8092504082429964,"8138":-0.35220521529391535,"8139":0.8599986028878303,"8140":0.8342505064367617,"8141":0.6235243487894729,"8142":0.9417214778163799,"8143":0.7577984343331623,"8144":0.34401681274838297,"8145":-0.24603720182256755,"8146":-0.18046262846642505,"8147":0.055339978971934045,"8148":1.3227327811820697,"8149":0.5911726103515886,"8150":0.3053017424419932,"8151":0.7184288535300757,"8152":0.5223152920779425,"8153":0.22224416949960052,"8154":1.0173308899728755,"8155":0.06061169495101433,"8156":-0.5212008057500584,"8157":0.11709626276533501,"8158":0.5766297386369159,"8159":0.30118412565433156,"8160":0.19556311284086064,"8161":0.4327667469941006,"8162":0.28912568053734283,"8163":-0.9438949897073431,"8164":1.974458158256767,"8165":1.0695268074733204,"8166":1.3102674842916995,"8167":0.5644744294396692,"8168":0.4461919807837184,"8169":0.27639799373617113,"8170":0.2831014661653295,"8171":0.2617949547671454,"8172":0.6372191141376276,"8173":-0.18833441779798124,"8174":0.6902439773266935,"8175":-0.352903464331154,"8176":0.3981820259256978,"8177":-0.47722346931223325,"8178":0.4571879321791434,"8179":0.17815983217677273,"8180":-0.010197625365168191,"8181":-0.933624136854925,"8182":0.949489430790504,"8183":-0.1817252107798772,"8184":0.33905934337895766,"8185":1.281044361237386,"8186":0.17736047532714014,"8187":-0.16935268370195788,"8188":0.011844577837216604,"8189":0.41815622685450227,"8190":-1.3330189456962946,"8191":-1.0990729982213217,"8192":-0.8990590563555056,"8193":0.7425090115318027,"8194":0.976077141628298,"8195":0.09563438101462887,"8196":0.609323599893735,"8197":0.11070219943020061,"8198":0.44622741874398225,"8199":1.0888407387528427}},{"n":100,"d":1,"w":{"0":0.13051936511259282,"1":0.8958694734972346,"2":-3.6508791224099464,"3":-2.788584081398827,"4":2.6284963047381233,"5":-0.05040319124694907,"6":0.041952605245069635,"7":-0.8210696792407507,"8":-1.8164501923172183,"9":-0.5929479521112188,"10":-2.4591312307159603,"11":-2.3412164701557363,"12":-4.735996633758382,"13":-5.880777610436353,"14":-3.0949573596225313,"15":-2.6286136518779033,"16":0.23650385604281712,"17":-6.132288278033813,"18":-0.780679071317897,"19":0.6114266120511515,"20":-1.4768965688787974,"21":5.407516247901262,"22":-1.4011594311597064,"23":0.08987075301375948,"24":-0.7361449567332908,"25":0.040057887324994323,"26":0.05883032494772966,"27":2.0841631958450826,"28":-1.1737049427525381,"29":0.45987516361213815,"30":-0.5476603082782292,"31":-0.2918839841354638,"32":3.9573040145912772,"33":2.2114777676565573,"34":2.1634129590583933,"35":-1.6164072082177463,"36":-0.3981810910435957,"37":0.7124974229985951,"38":2.2906968616115964,"39":12.7856989625663,"40":-4.707071415784035,"41":-4.3623703572152515,"42":4.66881539517296,"43":-0.6144725453596739,"44":1.3554639084408961,"45":-1.897636000927491,"46":10.849201222888073,"47":-1.0991890793094334,"48":-3.107834279587893,"49":-0.8561487773768743,"50":-2.6481697662291728,"51":0.4215729677751398,"52":-0.7138721306598126,"53":2.5576061368006666,"54":0.4800292930432806,"55":-1.717191561130543,"56":-0.944761680438464,"57":2.611855624266806,"58":1.243267799317633,"59":-1.0743441380042287,"60":4.236766980565283,"61":-0.5995838044655405,"62":0.68101222333641,"63":-1.39431101115708,"64":3.320488328139144,"65":2.049492890166028,"66":2.692777861690738,"67":-0.9483373969906185,"68":4.475966234630256,"69":-4.765634545812646,"70":-0.20155240697562707,"71":-1.1557748866108861,"72":-4.550563127189476,"73":1.1189531866624014,"74":0.09357447826831013,"75":0.8239067857430988,"76":0.03134884354798548,"77":0.20990441930981246,"78":0.7808597437948602,"79":3.123638972779169,"80":5.066934741858362,"81":-0.15124341655170087,"82":1.5798392855213375,"83":2.9551214996150814,"84":2.096645817816034,"85":-0.18502221602568886,"86":-0.5107261248521974,"87":-2.38875876456134,"88":-0.5650746574524074,"89":-0.42578253414626455,"90":2.7134669681450827,"91":4.046147478238006,"92":-2.1877186328824423,"93":-1.271446811093332,"94":0.1065666615649792,"95":1.3513905779799888,"96":-0.10884499895994118,"97":0.7640817801081867,"98":-2.2070006155027104,"99":0.9776318695030591}},{"n":4,"d":100,"w":{"0":-0.7670977513466196,"1":-0.01901729794777144,"2":-0.7617840752545401,"3":-0.25841554753486123,"4":0.10408277845078265,"5":0.5359327435300719,"6":-2.800135379289623,"7":0.05981980815078606,"8":-0.03357169829696806,"9":-0.03347458756025644,"10":0.04492137230271302,"11":0.0490897662525831,"12":-0.008135889016406148,"13":-0.46382468461502896,"14":-0.042512829955311,"15":0.3676436089831959,"16":1.4239565739573032,"17":-0.6142930268904857,"18":0.07531824658794543,"19":0.326872105097066,"20":0.5651517457316926,"21":-0.07171214412481068,"22":0.2969253236240848,"23":0.9436738936556661,"24":-0.7446858614939056,"25":-1.2164829459731095,"26":1.465440943215346,"27":0.0583652988039947,"28":-0.37838599331363443,"29":-1.1608512647859055,"30":-1.7907943989209183,"31":-0.284499223833312,"32":0.17020021362523816,"33":-0.23836594182722248,"34":0.9656376527428426,"35":-0.6585229503912755,"36":0.04125160287348913,"37":-0.922120851272781,"38":-0.029288594426919987,"39":0.15020342108474086,"40":0.011247796857836435,"41":0.25929056115313714,"42":0.24484829353351667,"43":-0.34552855378879893,"44":0.7856300812977067,"45":-0.038729565284157955,"46":0.4852297332026608,"47":0.20917105183568233,"48":-0.7024471361133333,"49":-0.9293767437092608,"50":-0.010768824803602263,"51":0.19154143083941036,"52":0.1500073586227069,"53":-0.23191032089383945,"54":-0.7844596562366063,"55":-0.056617493132366095,"56":-0.8910007921367955,"57":0.1690651157822426,"58":0.9155743516691227,"59":-2.463760335807638,"60":0.5868464075985245,"61":0.019173711646136564,"62":0.14774704278491033,"63":-2.3741865657802035,"64":-0.4392692849568358,"65":0.6011752378554321,"66":0.16074092038845375,"67":0.020711584651634606,"68":0.5087726505025397,"69":-0.25431107428426625,"70":0.21173851948739014,"71":2.147767791235521,"72":-0.5275552526276969,"73":-1.4434218651673314,"74":6.147886088692698,"75":0.11612445112629081,"76":-2.3462545305614007,"77":-0.2799496392357515,"78":0.38445854455356115,"79":-0.3798436090834994,"80":-0.23764708165701692,"81":0.651386604316186,"82":-0.1317206268369903,"83":-0.18514037736363043,"84":0.5812429217949991,"85":-0.21571317751754654,"86":0.5984585440704872,"87":-0.35935420346208563,"88":-0.8485273844303362,"89":-0.14110973807513943,"90":0.6570450793144762,"91":0.026643034423715607,"92":0.2922467435935093,"93":-0.5931971824413963,"94":-1.1909518486500295,"95":1.5166565263539848,"96":0.4796641736193931,"97":-2.6202110825855853,"98":-1.2328213751150614,"99":0.38863891586554117,"100":0.045212585270661375,"101":-0.20919230959827304,"102":-7.564230307800012,"103":0.03043893331213729,"104":0.7872159325114085,"105":-1.2835377587921255,"106":0.2815713492077398,"107":0.12779822208302632,"108":0.0861075625304843,"109":-0.3377515905599638,"110":-0.26661120560524965,"111":-0.31774737758879446,"112":-0.9666714550221395,"113":-0.03591195927975029,"114":-0.6396110931266393,"115":-0.16376923274748606,"116":-1.9178119894585188,"117":-0.024169172690562103,"118":0.64273546940167,"119":-0.05594027835132136,"120":-0.5848951569490669,"121":0.395352385593295,"122":-0.12207596138508854,"123":1.7182682165414622,"124":-0.26840195185963095,"125":-0.052010140785223063,"126":0.052991662045913414,"127":0.47222558518130114,"128":-0.15585771517034425,"129":0.4200605406723449,"130":-0.7372208975813144,"131":-0.05443878800133545,"132":-0.025218195588001285,"133":-0.36792563732831896,"134":1.3232094375752295,"135":0.34199728181102834,"136":-2.07493804759391,"137":0.44506687574961845,"138":0.8469172665605131,"139":0.335769316063748,"140":-2.0416208488152563,"141":-0.05780262634319695,"142":0.4947443353885626,"143":0.1033493574765476,"144":0.6057096510909428,"145":0.432050124249593,"146":0.4523782109947795,"147":0.31762761681693924,"148":0.38231564911180493,"149":0.13568310265821457,"150":-0.804216474662064,"151":-0.3389256464085232,"152":-0.06696428688759244,"153":1.2741795867058268,"154":0.4644487677250014,"155":-1.1423975485325715,"156":-0.2721640140434775,"157":0.007129183611231754,"158":0.22712368929333976,"159":-0.9537331591543953,"160":0.7943075798039281,"161":-0.4987132409213489,"162":-0.010407367333048308,"163":-0.4059063317493846,"164":-0.6643277179422605,"165":-0.0020735601651342313,"166":0.4279493988489563,"167":0.26674647071273755,"168":0.5202287432508481,"169":-0.3584237438121246,"170":-0.11439487351521739,"171":-1.837502679340823,"172":0.005952757149103255,"173":-0.2004218007463948,"174":-0.10605802083569861,"175":0.1301881049105296,"176":0.4227050341998009,"177":0.7434128900292768,"178":0.4053773576284227,"179":-0.4312841556362326,"180":0.15512665151297733,"181":-2.1721065712618075,"182":0.9239313703742068,"183":-0.004610303729725442,"184":0.2577692386980169,"185":0.5377526575483395,"186":0.8436130227295284,"187":-0.6670235909841863,"188":-0.19193723698831458,"189":-0.29602689677682853,"190":0.23795552639921586,"191":-0.20217286219626981,"192":1.491500611834681,"193":-0.5307197653231418,"194":1.521752057734646,"195":0.8298600647810248,"196":0.18106350004345498,"197":1.2873360794825117,"198":0.413082935148974,"199":0.8551618904172219,"200":-0.17249394296887283,"201":-0.6338505696241273,"202":-0.2690815706891852,"203":0.6763192168914919,"204":0.47344232414407766,"205":-0.746856680003174,"206":1.3517773278116838,"207":1.4169906248795463,"208":-0.4018054075554778,"209":1.2687164301879352,"210":-0.37498648237777177,"211":-0.28970349760397063,"212":-0.3618744202822143,"213":-0.6493406333723748,"214":-0.3464834679235164,"215":1.360337621781086,"216":-1.0148700039059944,"217":-0.8709280451872848,"218":1.0948890246223082,"219":0.4197268886240506,"220":-0.2887823429801868,"221":0.10769008004999635,"222":1.250890725164912,"223":0.4333100491337757,"224":-0.5036957899864816,"225":-0.5150810822289429,"226":1.6988982554052685,"227":0.33115886101331793,"228":-0.49228497153410006,"229":-0.5334137160617752,"230":-4.036271053979994,"231":-0.3909173956112507,"232":0.35269671673649927,"233":0.3998789158666795,"234":6.496059289121851,"235":-1.4641510486802278,"236":1.1402809022938336,"237":0.23000093726396184,"238":0.32182835630851087,"239":2.13759343619312,"240":0.1726313732206679,"241":-0.5941230689416255,"242":0.38589858903626506,"243":-0.08705531890888943,"244":0.4080999988266756,"245":-0.43742921060669754,"246":1.2027981609530811,"247":-0.030121175446109177,"248":-0.502411045803314,"249":0.357153704855768,"250":0.28399307200243545,"251":-0.6966855299976559,"252":0.42918376875546754,"253":0.3466671851779243,"254":0.2662993797175659,"255":0.21960866611390154,"256":-0.30901195377022356,"257":0.6475661574984427,"258":0.38597863016844186,"259":-3.1342291561753712,"260":0.06920570549468574,"261":0.7875460891612363,"262":0.4931805662828026,"263":-1.4165592516420304,"264":-1.7951052410168418,"265":0.44630692195036553,"266":0.35224592398476956,"267":0.3624448847214892,"268":0.2324140851028241,"269":-0.46414690961333677,"270":0.42022371844308415,"271":-4.232099730132256,"272":-0.4626504730377991,"273":-0.5939011413139694,"274":-0.05936683307095138,"275":1.6969125100124482,"276":0.2792496329174879,"277":-0.5105059629304354,"278":0.15752662498969183,"279":-0.7953016998284828,"280":-0.06377090875344635,"281":-0.9357353271957147,"282":-0.30232569410755866,"283":0.3966095071685226,"284":0.648080764526032,"285":-0.22700176372139666,"286":1.0294653698169702,"287":-0.14315442723084693,"288":-0.3011202266355294,"289":0.2723474127092803,"290":0.47905604077762454,"291":0.6170843837038675,"292":-0.6663479873161817,"293":-0.36920201571176475,"294":2.032156368095,"295":2.2341989610719883,"296":-0.14977109716332485,"297":2.05464443697348,"298":-0.4874074131008258,"299":2.486227496750895,"300":-0.8032419290157327,"301":0.11046199952940731,"302":-0.48593819544246897,"303":0.11938459634059637,"304":-0.1759068707988806,"305":-0.9594099954764873,"306":-5.962099575632298,"307":-1.8883323848877622,"308":-0.9679438740450002,"309":-1.507312315402035,"310":-0.40837500849664954,"311":-0.46857682317972904,"312":-0.2920139532705199,"313":-0.21898672160434643,"314":-0.5106953081007553,"315":0.9461934186224129,"316":0.9778885216835154,"317":-0.5589976509834127,"318":-1.165990749261402,"319":0.04427812195319001,"320":-0.33671198334977404,"321":1.408815005226713,"322":-0.6271413318019261,"323":-0.2389752182188189,"324":-0.08498393352502207,"325":-0.9257117545803519,"326":-0.1559996780687933,"327":-0.30374767962107785,"328":-0.27089432339370273,"329":0.2551980904349928,"330":-1.3763276239523012,"331":0.5569305132144644,"332":0.41896461432087,"333":-0.5688134437414328,"334":0.365125881058817,"335":-0.45134612261014445,"336":-0.6689992288731262,"337":-1.3629237831184966,"338":0.5696001420509359,"339":-0.026265158445590492,"340":0.20434643335904226,"341":-0.4277653532730786,"342":0.3768721192540672,"343":-0.2661039190109143,"344":0.47089222413850707,"345":-0.24975371951317288,"346":0.1643216881024076,"347":-0.8021281447238555,"348":-0.3158445070891428,"349":-0.15513066962047883,"350":0.14573871658751236,"351":0.01224232167919011,"352":-0.09657922155306935,"353":0.6744407816305609,"354":-0.23772963290104923,"355":-0.17812445965795407,"356":-0.7007840717520708,"357":-0.14079485640650177,"358":0.282861694499612,"359":-2.7981745810656986,"360":0.5000132362292921,"361":-1.8269848247154152,"362":-0.02942178468237431,"363":-2.5518480491542967,"364":0.522498232038039,"365":0.6327557580333567,"366":0.9581631966812998,"367":-0.9716735278810807,"368":0.7413871449080388,"369":-0.4164006707771578,"370":0.3991505505610697,"371":1.4425234612835478,"372":-0.2947327029266609,"373":-0.6200880531466711,"374":-0.11776239792163821,"375":0.3859873842601188,"376":0.7381090163626017,"377":0.1829682476522284,"378":-0.31183552519137064,"379":-0.13553984399263863,"380":1.9499728070856108,"381":-3.7568874899938645,"382":-0.1871908176838153,"383":0.5374031335300524,"384":0.12488797983816279,"385":-0.40659339491619595,"386":-0.4831481951613204,"387":0.07049038939877651,"388":-1.304393686282157,"389":0.44288257921219193,"390":0.061118096966575955,"391":0.1347813728339387,"392":-0.010294697806553867,"393":-6.433532941056783,"394":0.8839202019841893,"395":1.2484889358019151,"396":0.05890153115080356,"397":2.0782434326269588,"398":0.3849217096340869,"399":0.331888165263112}},{"n":4,"d":1,"w":{"0":-0.02172633797991775,"1":0.5885205623177635,"2":-0.021424222397195773,"3":1.8951351706721418}}]}
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
