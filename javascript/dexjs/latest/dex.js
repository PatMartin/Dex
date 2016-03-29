(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dex = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 *
 * The main dexjs module.
 *
 * @module dex
 * @requires d3
 * @requires jquery
 * @requires jquery-ui
 * @requires underscore
 *
 */
var dex = {};

//require("d3");
//$ = require("jquery");
//require("jquery-ui");
//_ = require("underscore");

/**
 *
 * The version of dexjs.
 *
 * @name version
 * @type {string}
 *
 */
dex.version = "0.7";

/**
 * This routine will return an array [ start, ..., start + len ] using an increment of 1.
 *
 * @param {number} start - The starting index.
 * @param {number} len - The number of integers to generate.
 * @example {@lang javascript}
 * // returns [ 0, 1, 2 ]
 * range(0, 3)
 *
 * @returns {Array} An array consisting of elements [ start, ..., start + len ].
 *
 */
dex.range = function (start, len) {
  return _.range(start, start + len);
};

/**
 *
 * This routine is simply a convenience function as it
 * simply wraps underscore's implementation of a shallow
 * copy.  This method will create a shallow-copied clone
 * of the provided plain object. Any nested objects or
 * arrays will be copied by reference, not duplicated.
 *
 * @param obj
 * @returns {*}
 */
dex.copy = function(obj) {
  return _.copy(obj);
};

/**
 *
 * A module for dealing with arrays.
 *
 * @name array
 * @type {module:array}
 *
 */
dex.array = require('./array/array');

/**
 *
 * A module for configuring things.
 *
 * @name config
 * @type {module:config}
 *
 */
dex.config = require("./config/config");

/**
 *
 * The pub/sub bus used by dex in order to publish and subscribe to events.
 *
 * @name bus
 * @type {PubSub}
 * @see https://github.com/federico-lox/pubsub.js
 *
 */
dex.bus = require("../lib/pubsub");

/**
 *
 * A module for logging to the console.
 *
 * @name console
 * @type {module:console}
 *
 */
dex.console = require("./console/console");

/**
 * A module for dealing with colors.
 *
 * @name color
 * @type {module:color}
 *
 */
dex.color = require("./color/color");

/**
 *
 * A charting module.
 *
 * @name charts
 * @type {module:charts}
 *
 */
dex.charts = {'d3' : {'map' : {}},
  'c3'   : {},
  'dygraphs' : {},
  'd3plus'   : {},
  'google' : {},
  'handlebars' : {},
  'threejs' : {}};

/**
 *
 * A charting module.
 *
 * @name charts
 * @type {module:charts}
 *
 */
dex.ui = {'jqueryui' : {}};

/**
 *
 * A module for handling CSV data structures.
 *
 * @name csv
 * @type {module:csv}
 *
 */
dex.csv = require("./csv/csv");

/**
 *
 * A module providing utilities for data generation.
 *
 * @name datagen
 * @type {module:datagen}
 *
 */
dex.datagen = require("./datagen/datagen");

/**
 *
 * A module for dealing with JSON data.
 *
 * @name json
 * @type {module:json}
 *
 */
dex.json = require("./json/json");

/**
 * A module for dealing with matrices.
 *
 * @name matrix
 * @type {module:matrix}
 *
 */
dex.matrix = require("./matrix/matrix");

/**
 * A module for dealing with javascript objects.
 *
 * @name object
 * @type {module:object}
 *
 */
dex.object = require("./object/object");

/**
 *
 * A module for dealing dex components.
 *
 * @name component
 * @type {module:component}
 *
 */
dex.component = require("./component/component");

module.exports = dex;
},{"../lib/pubsub":2,"./array/array":3,"./color/color":4,"./component/component":5,"./config/config":6,"./console/console":7,"./csv/csv":8,"./datagen/datagen":9,"./json/json":10,"./matrix/matrix":11,"./object/object":12}],2:[function(require,module,exports){
/**
 * pubsub.js
 *
 * A tiny, optimized, tested, standalone and robust
 * pubsub implementation supporting different javascript environments
 *
 * @author Federico "Lox" Lucignano <http://plus.ly/federico.lox>
 *
 * @see https://github.com/federico-lox/pubsub.js
 */

/*global define, module*/
(function (context) {
  'use strict';

  /**
   * @private
   */
  function init() {
    //the channel subscription hash
    var channels = {},
    //help minification
      funcType = Function;

    return {
      /*
       * @public
       *
       * Publish some data on a channel
       *
       * @param String channel The channel to publish on
       * @param Mixed argument The data to publish, the function supports
       * as many data parameters as needed
       *
       * @example Publish stuff on '/some/channel'.
       * Anything subscribed will be called with a function
       * signature like: function(a,b,c){ ... }
       *
       * PubSub.publish(
       *		"/some/channel", "a", "b",
       *		{total: 10, min: 1, max: 3}
       * );
       */
      publish: function () {
        //help minification
        var args = arguments,
        // args[0] is the channel
          subs = channels[args[0]],
          len,
          params,
          x;

        if (subs) {
          len = subs.length;
          params = (args.length > 1) ?
            Array.prototype.splice.call(args, 1) : [];

          //run the callbacks asynchronously,
          //do not block the main execution process
          setTimeout(
            function () {
              //executes callbacks in the order
              //in which they were registered
              for (x = 0; x < len; x += 1) {
                subs[x].apply(context, params);
              }

              //clear references to allow garbage collection
              subs = context = params = null;
            },
            0
          );
        }
      },

      /*
       * @public
       *
       * Register a callback on a channel
       *
       * @param String channel The channel to subscribe to
       * @param Function callback The event handler, any time something is
       * published on a subscribed channel, the callback will be called
       * with the published array as ordered arguments
       *
       * @return Array A handle which can be used to unsubscribe this
       * particular subscription
       *
       * @example PubSub.subscribe(
       *				"/some/channel",
       *				function(a, b, c){ ... }
       *			);
       */
      subscribe: function (channel, callback) {
        if (typeof channel !== 'string') {
          throw "invalid or missing channel";
        }

        if (!(callback instanceof funcType)) {
          throw "invalid or missing callback";
        }

        if (!channels[channel]) {
          channels[channel] = [];
        }

        channels[channel].push(callback);

        return {channel: channel, callback: callback};
      },

      /*
       * @public
       *
       * Disconnect a subscribed function f.
       *
       * @param Mixed handle The return value from a subscribe call or the
       * name of a channel as a String
       * @param Function callback [OPTIONAL] The event handler originaally
       * registered, not needed if handle contains the return value
       * of subscribe
       *
       * @example
       * var handle = PubSub.subscribe("/some/channel", function(){});
       * PubSub.unsubscribe(handle);
       *
       * or
       *
       * PubSub.unsubscribe("/some/channel", callback);
       */
      unsubscribe: function (handle, callback) {
        if (handle.channel && handle.callback) {
          callback = handle.callback;
          handle = handle.channel;
        }

        if (typeof handle !== 'string') {
          throw "invalid or missing channel";
        }

        if (!(callback instanceof funcType)) {
          throw "invalid or missing callback";
        }

        var subs = channels[handle],
          x,
          y = (subs instanceof Array) ? subs.length : 0;

        for (x = 0; x < y; x += 1) {
          if (subs[x] === callback) {
            subs.splice(x, 1);
            break;
          }
        }
      }
    };
  }

  //UMD
  if (typeof define === 'function' && define.amd) {
    //AMD module
    define('pubsub', init);
  } else if (typeof module === 'object' && module.exports) {
    //CommonJS module
    module.exports = init();
  } else {
    //traditional namespace
    context.PubSub = init();
  }
}(this));
},{}],3:[function(require,module,exports){
/**
 *
 * This module provides routines for dealing with arrays.
 *
 * @module array
 *
 */

var array = {};
module.exports = array;

/**
 *
 * Take a slice of an array without modifying the original array.
 *
 * dex.array.slice(array) - Return a copy of the array.
 * dex.array.slice(array, rowRange) - Copy the array, then return a slice
 * within the specified range.
 * dex.array.slice(array, rowRange, maxRows) - Copy the array, then return a slice
 * within the specified range up to, but not exceeding, maxRows rows.
 *
 * @param (array) array - The array to slice.
 * @param (array|number) rowRange - If supplied an array, the range defined by the of rows to slice.
 * @param {number} maxRows - The maximum number of rows to return.
 *
 * @example {@lang javascript}
 * var myArray = [ 1, 2, 3, 4, 5 ];
 *
 * // Returns: [ 3, 4, 5]
 * slice(myArray, 2);
 *
 * // Returns: [ 1, 3, 5 ]
 * slice(myArray, [0, 2, 4]);
 *
 * // I am not sure why you would do this, but in the interest of supporting
 * // the Principle of Least Surprise, this returns the array unchanged.
 * // Returns: [ 1, 2, 3, 4, 5 ]
 * slice(myArray)
 *
 */
module.exports.slice = function (array, rowRange, maxRows) {
    var arraySlice = [];
    var range;
    var i;

    var arrayCopy = dex.array.copy(array);

    // Numeric.
    // Array.
    // Object.  Numeric with start and end.
    if (arguments.length < 2) {
        return arrayCopy;
    }
    else if (arguments.length == 2) {
        if (Array.isArray(rowRange)) {
            range = rowRange;
        }
        else {
            range = dex.range(rowRange, arrayCopy.length - rowRange);
        }
    }
    else if (arguments.length > 2) {
        if (Array.isArray(rowRange)) {
            range = rowRange;
        }
        else {
            range = dex.range(rowRange, maxRows);
        }
    }

    //dex.console.log("BEFORE: array.slice(range=" + range + "): arraySlice=" + arraySlice);
    for (i = 0; i < range.length; i++) {
        arraySlice.push(arrayCopy[range[i]]);
    }
    //dex.console.log("AFTER: array.slice(range=" + range + "): arraySlice=" + arraySlice);
    return arraySlice;
};

/**
 *
 * This method locates the array element whose id tag matches the supplied
 * id.  It returns the index of the first matching array element, or -1 if
 * none was found.
 *
 * @param array The array to search.
 * @param id The id to search on.
 *
 * @returns {number} The index of the first matching array element, or -1
 * if not found.
 *
 */
/*
 module.exports.indexOfById = function (array, id) {
 return _.findIndex(array, { id: id })
 };
 */

/**
 *
 * Is this routine actually used anymore?  Can I deprecate it?  It's long and
 * I don't remember exactly what its doing.
 *
 * @param data
 * @param numValues
 * @returns {*}
 *
 */
/*
 module.exports.indexBands = function (data, numValues) {
 dex.console.log("BANDS");
 var interval, residual, tickIndices, last, i;

 if (numValues <= 0) {
 tickIndices = [];
 }
 else if (numValues == 1) {
 tickIndices = [Math.floor(numValues / 2)];
 }
 else if (numValues == 2) {
 tickIndices = [0, data.length - 1];
 }
 else {
 // We have at least 2 ticks to display.
 // Calculate the rough interval between ticks.
 interval = Math.max(1, Math.floor(data.length / (numValues - 1)));

 // If it's not perfect, record it in the residual.
 residual = Math.floor(data.length % (numValues - 1));

 // Always label our first data point.
 tickIndices = [0];

 // Set stop point on the interior ticks.
 last = data.length - interval;

 dex.console.log("TEST", data, numValues, interval, residual, last);

 // Figure out the interior ticks, gently drift to accommodate
 // the residual.
 for (i = interval; i <= last; i += interval) {
 if (residual > 0) {
 i += 1;
 residual -= 1;
 }
 tickIndices.push(i);
 }
 // Always graph the last tick.
 tickIndices.push(data.length - 1);
 }
 dex.console.log("BANDS");
 return tickIndices;
 };
 */

/**
 * Return an array consisting of unique elements within the first.
 *
 * @param array The array to extract unique values from.
 *
 * @returns {Array} An array which consists of unique elements within
 * the user supplied array.
 *
 */
//module.exports.unique = function (array) {
//  return _.uniq(array);
//};

/**
 *
 * Returns an array of the mathematically smallest and largest
 * elements within the array.
 *
 * @param matrix The array to evaluate.
 * @param indices The array indices to be considered in the evaluation.
 *
 * @returns {Array} - An array consisting of [ min, max ] of the array.
 *
 */
module.exports.extent = function (matrix, indices) {
    if (!matrix || matrix.length <= 0 || !indices || indices.length <= 0) {
        return [0, 0];
    }

    var min = matrix[0][indices[0]];
    var max = min;

    indices.forEach(function (ci) {
        matrix.forEach(function (row) {
            if (min > row[ci]) {
                min = row[ci];
            }
            if (max < row[ci]) {
                max = row[ci];
            }
        })
    });
    return [min, max];
};

/**
 *
 * Return a distinct copy of an array.
 *
 * @param {Array} array The array to copy.
 * @returns {Array} The copy of the array.
 *
 */
module.exports.copy = function (array) {
    // Shallow copy
    return _.clone(array);
    // Deep copy:
    //return $.extend(true, {}, array);
};
},{}],4:[function(require,module,exports){
/**
 *
 * This module provides routines for dealing with colors.
 *
 * @module color
 *
 */

/**
 *
 * This routine converts a rgb(red, green, blue) color to it's
 * equivalent #ffffff hexadecimal form.
 *
 * @param color The color we wish to convert to hex.
 * @returns {*}
 */
exports.toHex = function (color) {
  if (color.substr(0, 1) === '#') {
    return color;
  }
  //console.log("COLOR: " + color)
  var digits = /rgb\((\d+),(\d+),(\d+)\)/.exec(color);
  //console.log("DIGITS: " + digits);
  var red = parseInt(digits[1]);
  var green = parseInt(digits[2]);
  var blue = parseInt(digits[3]);

  var rgb = blue | (green << 8) | (red << 16);
  return '#' + rgb.toString(16);
};

/**
 *
 * This routine returns the requested named color scheme with
 * the requested number of colors.
 *
 * @param colorScheme The named color schemes: cat10, cat20, cat20b, cat20c, HiContrast or
 * any of the named colors from colorbrewer.
 * @param numColors The number of colors being requested.
 *
 * @returns {*} The array of colors.
 */
exports.colorScheme = function (colorScheme, numColors) {
  if (colorScheme === "cat10" || colorScheme == "1") {
    return d3.scale.category10();
  }
  else if (colorScheme === "cat20" || colorScheme == "2") {
    return d3.scale.category20();
  }
  else if (colorScheme === "cat20b" || colorScheme == "3") {
    return d3.scale.category20b();
  }
  else if (colorScheme === "cat20c" || colorScheme == "4") {
    return d3.scale.category20c();
  }
  else if (colorScheme == "HiContrast") {
    return d3.scale.ordinal().range(colorbrewer[colorScheme][9]);
  }
  else if (colorScheme in colorbrewer) {
    //console.log("LENGTH: " + len);
    var c;
    var effColors = Math.pow(2, Math.ceil(Math.log(numColors) / Math.log(2)));
    //console.log("EFF LENGTH: " + len);

    // Find the best cmap:
    if (effColors > 128) {
      effColors = 256;
    }

    for (c = effColors; c >= 2; c--) {
      if (colorbrewer[colorScheme][c]) {
        return d3.scale.ordinal().range(colorbrewer[colorScheme][c]);
      }
    }
    for (c = effColors; c <= 256; c++) {
      if (colorbrewer[colorScheme][c]) {
        return d3.scale.ordinal().range(colorbrewer[colorScheme][c]);
      }
    }
    return d3.scale.category20();
  }
  else {
    return d3.scale.category20();
  }
};

/**
 *
 * Given a color, lighten or darken it by the requested percent.
 *
 * @param color The color to modify.
 * @param percent A floating point number in the range of [-1.0, 1.0].  Negative
 * values will lighten the color, positive values will darken it.
 *
 * @returns {string} The lightened or darkened color in the form of #ffffff.
 *
 */
exports.shadeColor = function (color, percent) {
  var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) *
    0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
};

/**
 *
 * Given two colors, blend them together.
 *
 * @param color1
 * @param color2
 * @param percent
 * @returns {string}
 *
 */
exports.blendColors = function(color1, color2, percent) {
  var f = parseInt(color1.slice(1), 16), t = parseInt(color2.slice(1), 16),
    R1 = f >> 16, G1 = f >> 8 & 0x00FF,
    B1 = f & 0x0000FF, R2 = t >> 16,
    G2 = t >> 8 & 0x00FF, B2 = t & 0x0000FF;

  return "#" + (0x1000000 + (Math.round((R2 - R1) * percent) + R1) * 0x10000 +
    (Math.round((G2 - G1) * percent) + G1) * 0x100 +
    (Math.round((B2 - B1) * percent) + B1)).toString(16).slice(1);
};

/**
 *
 * @param color
 * @param percent
 * @returns {string}
 */
exports.shadeRGBColor = function (color, percent) {
  var f = color.split(","), t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent, R = parseInt(f[0].slice(4)),
    G = parseInt(f[1]), B = parseInt(f[2]);
  return "rgb(" + (Math.round((t - R) * p) + R) + "," +
    (Math.round((t - G) * p) + G) + "," +
    (Math.round((t - B) * p) + B) + ")";
};

/**
 *
 * @param color1
 * @param color2
 * @param percent
 * @returns {string}
 */
exports.blendRGBColors = function(color1, color2, percent) {
  var f = color1.split(","), t = color2.split(","), R = parseInt(f[0].slice(4)),
    G = parseInt(f[1]), B = parseInt(f[2]);
  return "rgb(" + (Math.round((parseInt(t[0].slice(4)) - R) * p) + R) + "," +
    (Math.round((parseInt(t[1]) - G) * percent) + G) + "," +
    (Math.round((parseInt(t[2]) - B) * percent) + B) + ")";
};

/**
 *
 * @param color
 * @param percent
 * @returns {*}
 */
exports.shade = function(color, percent) {
  if (color.length > 7) return shadeRGBColor(color, percent);
  else return shadeColor2(color, percent);
};

/**
 *
 * @param color1
 * @param color2
 * @param percent
 */
exports.blend = function (color1, color2, percent) {
  if (color1.length > 7) return blendRGBColors(color1, color2, percent);
  else return blendColors(color1, color2, percent);
};

/**
 *
 * Given a color and a percent to lighten or darken it.
 *
 * @param color The base color.
 * @param percent The pecentage to lighten (negative) or darken (positive) the color.
 *
 * @returns {string} The computed color.
 *
 */
/*
 exports.shadeColor = function (color, percent) {
 var R = parseInt(color.substring(1, 3), 16)
 var G = parseInt(color.substring(3, 5), 16)
 var B = parseInt(color.substring(5, 7), 16);

 R = parseInt(R * (100 + percent) / 100);
 G = parseInt(G * (100 + percent) / 100);
 B = parseInt(B * (100 + percent) / 100);

 R = (R < 255) ? R : 255;
 G = (G < 255) ? G : 255;
 B = (B < 255) ? B : 255;

 var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
 var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
 var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

 return "#" + RR + GG + BB;
 };
 */

exports.gradient = function (baseColor) {
  if (baseColor.charAt(0) == 'r') {
    baseColor = colorToHex(baseColor);
  }
  var gradientId;
  gradientId = "gradient" + baseColor.substring(1)
  console.log("GradientId: " + gradientId);
  console.log("BaseColor : " + baseColor);

  //var lightColor = shadeColor(baseColor, -10)
  var darkColor = shadeColor(baseColor, -20)

  var grad = d3.select("#gradients").selectAll("#" + gradientId)
    .data([gradientId])
    .enter()
    .append("radialGradient")
    .attr("class", "colorGradient")
    .attr("id", gradientId)
    .attr("gradientUnits", "objectBoundingBox")
    .attr("fx", "30%")
    .attr("fy", "30%")

  grad.append("stop")
    .attr("offset", "0%")
    .attr("style", "stop-color:#FFFFFF")

  // Middle
  grad.append("stop")
    .attr("offset", "40%")
    .attr("style", "stop-color:" + baseColor)

  // Outer Edges
  grad.append("stop")
    .attr("offset", "100%")
    .attr("style", "stop-color:" + darkColor)

  return "url(#" + gradientId + ")";
};

},{}],5:[function(require,module,exports){
/**
 *
 * This module provides base capabilities which are available to all dex components.
 *
 * @interface
 *
 */

/**
 *
 * A matrix is a two dimensional array of values.  It's a data structure
 * which is a key component of a csv which is used extensively
 * throughout DexJs.  The data portion of a csv is simply a matrix.
 * A csv is the standard form of data input expected by dex components.
 *
 * @typedef {Array.<Array.<Object>>} matrix
 * @example {@lang javascript}
 * // A 2x2 matrix of numbers.
 * var matrix1 = [[1, 2], [3, 4]];
 *
 * // A 2x2 matrix of strings.
 * var matrix2 = [['Pat', 'Martin'], ['Mike', 'Parton']];
 */

/**
 * A CSV data structure.
 *
 * @typedef {Object} csv
 *
 * @property {Array} header - An array containing the headings for this csv.
 * @property {matrix} data - A matrix containing the data for this csv.
 * @example {@lang javascript}
 * var myCsv = { header : [ "FirstName", "LastName" ],
 *               data   : [[ "Bob", "Jones" ], [ "Ricky", "Bobby" ]] };
 *
 */

/**
 * A D3 axis specification.
 * @typedef {Object} d3axis_spec
 *
 * @property {d3scale} [scale=dex.config.scale({type:'linear'})] - The scale to be used for this axis.
 * @property {String} [orient=bottom] - The orientation of the axis. (left|right|top|bottom)
 * @property {String} [ticks] - The number of ticks to generate for this axis.
 * @property {Array} [tickValues] - Supply specific places to draw the ticks.
 * @property {String} [tickSize=[6,6]] - Sets the length of both the inner and outer ticks.
 * @property {String} [innerTickSize=d] - Sets the length of inner ticks.
 * @property {String} [outerTickSize=6] - Sets the length of outer ticks.
 * @property {String} [tickPadding=3] - Sets the tick padding in pixels.
 * @property {String} [tickFormat] - Sets the format of tick labels. ex: d3.format(",.0f")
 *
 */

/**
 *
 * A D3 scale specification.
 *
 * @typedef {Object} d3scale_spec
 *
 * @property {string} [type=linear] - The type of scale to create.  Valid types are
 * (linear|sqrt|pow|time|log|ordinal|quantile|quantize|identity)
 * @property {Array} [domain=[0, 100]] - The domain for this scale.
 * @property {Array} [range=[0, 800]] - The range for this scale.
 * @property {Array} [rangeRound] - Sets the scale's output range to the specified array of values, while also
 * setting the scale's interpolator to d3.interpolateRound.
 * @property {String} [interpolate] - When supplied, sets the scale's output
 * interpolator using the specified factory.
 * @property {String} [clamp] - Set to true in order to enable clamping, false to disable
 * it.  Ensures interpolation/extrapolation does not generate values outside of this
 * scale's range.
 * @property {String} [nice] - If true, will extend the scale's domain to begin and
 * end on nice round integer values.
 * @property {string} [tickFormat] - Only applies to time scales.  Set's the tick
 * format.
 *
 */

/**
 *
 * A D3 font specification.  More information can be found in the {@link http://www.w3.org/TR/SVG/text.html|W3C SVG 1.1 Text Specification}.
 *
 * @typedef {Object} d3font_spec
 *
 * @property {string} [decoration=none] - This property describes decorations that are added to the text of an element.
 * Valid values: ( none | underline | overline | line-through | blink | inherit )
 * @property {string} [family=sans-serif] - This property indicates which font family is to be used to render the text.
 * @property {string} [letterSpacing=normal] -
 * @property {integer} [size=14] - The size of the font.
 * @property {string} [style=normal] - This property specifies whether the text is to be rendered using a normal,
 * italic or oblique face. Valid values are: ( normal | italic | oblique | inherit ).
 * @property {string} [weight=normal] - This property indicates whether the text is to be rendered using the normal glyphs
 * for lowercase characters or using small-caps glyphs for lowercase characters.  Valid values for this field are:
 * ( normal | bold | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit)
 * @property {string|integer} [wordSpacing=normal] - Specifies the amount of space that is to be added between text characters.
 * Valid values: ( auto | <integer-length> | inherit )
 * @property {string} [variant=normal] - his property indicates whether the text is to be rendered using
 * the normal glyphs for lowercase characters or using small-caps glyphs for lowercase characters.
 * Valid values: ( normal | small-caps | inherit )
 *
 */

/**
 *
 * A D3 stroke specification.
 *
 * @typedef {Object} d3stroke_spec
 *
 * @property {float} [width=1] - The width (in pixels) of this stroke.
 * @property {string} [color=black] - The color of this stroke.
 * @property {float} [opacity=1] - The opacity of this stroke in the range of
 * where 0 is invisible and 1 represents 100% opaque stroke. [0, 1]
 * @property {string} [dasharray] - Used to draw dashed lines.  Ex: "1 1" will draw
 * a dashed line which consists of single pixel dashes separated by 1 empty pixel.
 * @property {string} [transform] - A transform to be applied to the stroke.
 *
 */

/**
 *
 * A D3 text specification.
 *
 * @typedef {Object} d3text_spec
 *
 * @property {d3font_spec} [font] - The d3 font specification for this stroke.
 * @property {integer} [x=0] - The x coordinate for the first character of this text.
 * @property {integer} [y=0] - The y coordinate for the first character of this text.
 * @property {integer} [textLength] - The author's estimation of the length of this text.
 * The system will use this as a preference and attempt to size the text to this length.
 * @property {integer} [lengthAdjust] - Indicates the type of adjustments which the user
 * agent shall make to make the rendered length of the text match the value specified on
 * the textLength attribute.  Valid values: ( spacing | spacingAndGlyphs )
 * @property {string} [transform] - Any extra transformations to be applied to this
 * text.
 * @property {string} [glyphOrientationVertical] - Allows the user to control the
 * orientation of text.  Valid values: ( auto | <angle> | inherit ).  Angle may be expressed
 * in degrees, radians, or as a gradient.
 * @property {string} [text] - The text we are representing.
 * @property {integer} [dx=0] - An x-axis offset to be applied to this text.
 * @property {integer} [dy=0] - A y-axis offset to be applied to this text.
 * @property {string} [writingMode] - Specifies whether text flows left to right,
 * right to left, top to bottom or bottom to top.  Valid values: ( lr-tb, rl-tb, tb-rl,
 * lr, rl, tb, inherit )
 * @property {string} [anchor=start] - Specifies where this text should be anchored to.
 * Valid values: ( start | middle | end )
 * @property {d3fill_spec} [fill] - The fill to be applied to this text.
 * @property {string} [format] - A d3 format to be applied to the text.
 *
 */

/**
 *
 * A D3 rectangle specification.
 *
 * @typedef {Object} d3rect_spec
 *
 * @property {number} [width=50] - The width of this rectangle.
 * @property {number} [height=50] - The height of this rectangle.
 * @property {number} [x=0] - The x coordinate of the top left corner of this rectangle.
 * @property {number} [y=0] - The y coordinate of the top left corner of this rectangle.
 * @property {number} [rx=0] - For rounded rectangles, the x-axis radius of the ellipse
 * used to round off the corners of the rectangle.
 * @property {number} [ry=0] - For rounded rectangles, the y-axis radius of the ellipse
 * used to round off the corners of the rectangle.
 * @property {d3stroke_spec} [stroke] - The stroke which will be used to draw the rectangle.
 * @property {number} [opacity=1] - The opacity for this rectangle expressed as a floating
 * point number in the range of [ 0.0, 1.0 ] where 0 is transparent, 1 is opaque, and all
 * others are somewhere in between fully transparent and fully opaque.
 * @property {d3colorscale} [color=d3.scale.category20()] - The color scale which we will
 * to color this rectangle.
 * @property {string} [transform] - A transform, if any, to be applied to this rectangle.
 * @property {events_spec} [events] - Any events which we wish to respond to.
 *
 */

/**
 *
 * An events specification.  Many events are supported, the ones listed here are a subset
 * of all of the possible events.  For a complete list, refer to Mozilla's developer documentation
 * concerning {@link https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events|standard events}.
 *
 * @typedef {Object} dexevents_spec
 *
 * @property {string} [mousedown] - Handles events generated when a pointing device button (usually a mouse)
 * is pressed on an element.
 * @property {string} [mouseenter] - Handles mouseover events generated when a pointing device is moved onto
 * the element that has the listener attached.
 * @property {string} [mouseleave] - Handles mouseover events generated when a pointing device is moved off
 * the element that has the listener attached.
 * @property {string} [mousemove] - Handles mouseover events generated when a pointing device is moved over
 * an element.
 * @property {string} [mouseout] - Handles mouseover events generated when a pointing device is moved off
 * the element that has the listener attached or off one of its children.
 * @property {string} [mouseover] - Handles mouseover events generated when a pointing device is moved
 * onto the element that has the listener attached or onto one of its children.
 * @property {string} [mouseup] - Handles mouseover events generated when a pointing device button is
 * released over an element.
 * @property {string} [dblclick] - Handles mouseover events generated when a pointing device is quickly
 * clicked twice on an element.
 * @property {string} [wheel] - The mouse wheel of a pointing device has been rotated in any direction.
 * @property {string} [keydown] - Handles mouseover events generated when a key is pressed down.
 * @property {string} [keypress] - Handles mouseover events generated when a key is pressed down
 * and that key normally produces a character value.
 * @property {string} [keyup] - Handles mouseover events generated when a key is released.
 * @property {string} [message] - A message is received from something.  ie: WebSocket, Web Worker,
 * iframe, parent window or other event source.
 * @property {string} [drag] - Handles mouseover events generated when an element or text selection
 * is being dragged (every 350ms).
 * @property {string} [dragend] - Handles mouseover events generated when a drag operation is being
 * ended (by releasing a mouse button or hitting the escape key).
 * @property {string} [dragenter] - Handles mouseover events generated when a dragged element or
 * text selection enters a valid drop target.
 * @property {string} [dragleave] - Handles mouseover events generated when a dragged element or
 * text selection leaves a valid drop target.
 * @property {string} [dragover] - Handles mouseover events generated when an n element or text
 * selection is being dragged over a valid drop target (every 350ms).
 * @property {string} [dragstart] - Handles mouseover events generated when the user starts
 * dragging an element or text selection.
 * @property {string} [drop] - Handles mouseover events generated when an element is dropped
 * on a valid drop target.
 *
 * @property {string} [touchcancel] - Handles mouseover events generated when a touch point
 * has been disrupted in an implementation-specific manners (too many touch points for example).
 * @property {string} [touchend] - Handles mouseover events generated when a touch point is
 * removed from the touch surface.
 * @property {string} [touchenter] - Handles mouseover events generated when a touch point
 * is moved onto the interactive area of an element.
 * @property {string} [touchleave] - Handles mouseover events generated when a touch point
 * is moved off the interactive area of an element.
 * @property {string} [touchmove] - Handles mouseover events generated when a touch point
 * is moved along the touch surface.
 * @property {string} [touchstart] - Handles mouseover events generated when a touch point
 * is placed on the touch surface.
 *
 */


/**
 *
 * A D3 line specification.
 *
 * @typedef {Object} d3line_spec
 *
 * @property {d3point_spec} [start] - The starting point for this line.
 * @property {d3_point_spec} [end] - The ending point for this line.
 * @property {d3stroke_spec} [strokc] - The stroke to be used when drawing this line.
 *
 */

/**
 *
 * A D3 point specification.
 *
 * @typedef {Object} d3point_spec
 *
 * @property {number} [x] - The starting point for this line.
 * @property {number} [y] - The ending point for this line.
 *
 */

/**
 *
 * A D3 circle specification.
 *
 * @typedef {Object} d3point_spec
 *
 * @property {number} [cx] - The x-coordinate of the center point of this circle.
 * @property {number} [cy] - The y-coordinate of the center point of this circle.
 * @property {number} [r] - The radius of the circle.
 * @property {d3fill_spec} [fill] - The circle's fill.
 * @property {d3stroke_spec} [stroke] - The circle's stroke.
 * @property {string} [transform] - A transform, if any, to be applied to this circle.
 * @property {string} [title] - The title of the circle.
 * @property {d3events_spec} [events] - Any events to be associated with this circle.
 *
 */

/**
 *
 * A D3 tick specification.
 *
 * @typedef {Object} d3tick_spec
 *
 * @property {number} [count] - The number of ticks to dra.
 * @property {object} [size] - The size of the tick.
 * @property {number} [size.major] - The length of the major ticks.
 * @property {number} [size.minor] - The length of the minor ticks.
 * @property {number} [size.end] - The length of the ticks at the ends of the axis.
 * @property {number} [padding] - The padding for ticks.
 * @property {string} [format] - The format to be applied to each tick label.
 * @property {d3text_spec} [label] - The specification for the appearance of tick
 * labels.
 *
 */

/**
 *
 * A D3 path specification.
 *
 * @typedef {Object} d3path_spec
 *
 * @property {d3fill_spec} [fill] - The fill to apply when drawing this path.
 * @property {d3stroke_spec} [stroke] - The stroke to use when drawing this path.
 *
 */

/**
 *
 * A D3 fill specification.
 * @typedef {Object} d3fill_spec
 *
 * @property {string} [fillColor=grey] - The color of this fill.
 * @property {float} [opacity=1] - The opacity of this fill in the range of
 * where 0 is invisible and 1 represents 100% opaque fill. [0, 1]
 *
 */

/**
 *
 * A D3 link specification.
 * @typedef {Object} d3link_spec
 *
 * @property {d3fill} [fill] - The fill to be used for this link.
 * @property {d3stroke} [stroke] - The stroke to be used for this link.
 * @property {string} [transform] - The transform to apply to this link.
 * @property {object} d - The data to associate with this link.
 * @property {d3events} [events] - The events to associate with this link.
 *
 */

/**
 *
 * This is the base constructor for all dex components.  It provides some of the common
 * functionality such as attribute getters/setters, ability to publish and subscribe
 * events as well as the ability for the user to provide customized settings for any
 * component configuration value.
 *
 * @constructor
 * @classdesc This interface provides a contract for dex components to implement.
 *
 * @name dex.component
 *
 * @param userConfig A map containing the various options the user wishes to override.
 * @param defaultConfig A map containing the default configuration for this component.
 *
 */
module.exports = function (userConfig, defaultConfig) {
  userConfig = userConfig || {};
  defaultConfig = defaultConfig || {};

  this.debug = false;

  // Allows component construction from other components.
  if (userConfig.hasOwnProperty('config')) {
    this.config = dex.config.expandAndOverlay(userConfig.config, defaultConfig);
  }
  // Else, we have a configuration.
  else {
    this.config = dex.config.expandAndOverlay(userConfig, defaultConfig);
  }

  dex.console.log("dex.component Configuration", this.config);

  if (!this.config.channel) {
    this.config.channel = (this.config.parent || "#parent") + "/" +
    (this.config.id || "unknown-id");
  }

  /**
   * This method provides getter/setter access for the configuration of a
   * DexComponent.
   *
   * Names can express hierarchy.  An attribute named 'a' may have a
   * child attribute named 'b'.  In this case, the name of attribute
   * 'a' is simply 'a'.  The name of attribute 'b' would be 'a.b'.
   *
   * attr(name) Retrieve retrieve the current value of the attribute with
   * matching name.
   *
   * attr(name, value) Set the attribute with the matching name to the
   * specified value.
   *
   * @method dex.component.attr
   *
   * @param name The name of the attribute.
   * @param value The value of the attribute.
   *
   * @example {@lang javascript}
   * // Set an attribute named "foo" to "bar"
   * myComponent.attr("foo", "bar");
   *
   * // Returns "bar"
   * myComponent.attr("foo");
   *
   * // Set an attribute named "foo" which belongs to an object named
   * // nested which in turn belongs to myComponent.
   * myComponent.attr("nested.foo", "bar");
   *
   * // Returns "bar"
   * myComponent.attr("nested.foo");
   *
   * // Does nothing, returns myComponent
   * myComponent.attr();
   *
   * @returns {string|component} If only name is provided, attr will return the value of
   * the requested attribute.  If both name and value are provided, then
   * the attribute corresponding to the name will be set to the supplied
   * value and the component itself will be returned.
   */
  this.attr = function (name, value) {
    if (arguments.length == 0) {
      return this.config;
    }
    else if (arguments.length == 1) {
      // REM: Need to getHierarchical
      return this.config[name];
    }
    else if (arguments.length == 2) {
      //console.log("Setting Hieararchical: " + name + "=" + value);
      //console.dir(this.config);

      // This will handle the setting of a single attribute
      dex.object.setHierarchical(this.config, name, value, '.');
    }
    return this;
  };

  /**
   * Subscribe this component to the events of type eventTYpe
   * generated by the source this.  When events are received,
   * invoke the callback.
   *
   * @method dex.this.subscribe
   *
   * @param {component} source - The source component
   * @param {string} eventType - The name of the event we are subscribing to.
   * @param callback - The function to be invoked when this event is
   * received.
   *
   * @returns {handle|false} False if function is called incorrectly.
   * Otherwise, the function returns a handle which can later be used
   * to unsubscribe to the events.
   *
   */
  this.subscribe = function (source, eventType, callback) {
    if (arguments.length == 3) {
      var channel = source.config.channel + '/' + eventType;

      dex.console.log("subscribe to " + channel);
      if (arguments.length < 3) {
        dex.console.log("failed");
        return false;
      }
      return dex.bus.subscribe(channel, callback);
    }
    else {
      return false;
    }
  };

  /**
   *
   * Unsubscribe this component.
   *
   * @method dex.component.unsubscribe
   *
   * @param handle - The handle attained via subscribe.
   *
   */
  this.unsubscribe = function (handle) {
    dex.bus.unsubscribe(handle);
  };

  /**
   *
   * Publish an event to the component's subscribers.
   *
   * @method dex.component.publish
   *
   * @param event - The event to publish.  An event can be any object, however,
   * it must define a property named "type".
   * @param event.type - The type of the event we are publishing.
   *
   */
  this.publish = function (event) {
    var channel;

    if (!event || !event.type) {
      dex.console.warn("publish of event to " + this.channel + " failed.");
      dex.bus.publish("error", {
        type          : "error",
        "description" : "Error publishing event: '" + event + "' to '" + this.channel + "'"
      });
    }
    else {
      channel = this.config.channel + '/' + event.type;
      dex.console.log("publish to " + channel);
      dex.bus.publish(channel, event);
    }
  };

  /**
   *
   * A default no-op implementation of render.  Subclasses should
   * override this method with one which provides an initial rendering
   * of their specific component.  This is a great place to put
   * one-time only initialization logic.
   *
   * @method dex.component.render
   *
   */
  this.render = function () {
    console.log("Unimplemented routine: render()");
  };

  /**
   *
   * A default no-op implementation of update.  This will update the
   * current component relative to any new setting or data changes.
   *
   * @method dex.component.update
   *
   */
  this.update = function () {
    console.log("Unimplemented routine: update()");
  };
};
},{}],6:[function(require,module,exports){
/**
 *
 * Config module.
 * @module config
 *
 */

/**
 *
 * This routine supports a shorthand notation allowing the
 * user to specify deeply nested configuration options without
 * having to deal with nested json structures.
 *
 * Options like:
 *
 * {
 *   'cell' : {
 *     'rect' : {
 *       'width' : 10,
 *       'height' : 20,
 *       'events' : {
 *         'mouseover' : function(d) { console.log("MouseOver: " + d); }
 *       }
 *     }
 *   }
 * }
 *
 * Can now be described more succinctly and more readably as:
 *
 * {
 *   'cell.rect.width'            : 10,
 *   'cell.rect.height'           : 20,
 *   'cell.rect.events.mouseover' : function(d) { console.log("Mouseover: " + d); }
 * }
 *
 * Or a hybrid strategy can be used:
 *
 * {
 *   'cell.rect' : {
 *     'width' : 10,
 *     'height' : 20,
 *     'events.mouseover' : function(d) { console.log("Mouseover: " + d); }
 *   }
 * }
 *
 * @param {object} config The configuration to expand.
 * @returns {*} The expanded configuration.  The original configuration
 *   is left untouched.
 *
 */
exports.expand = function expand(config) {
  var name, ci;
  var expanded = {};

  // We have nothing, return nothing.
  if (!config) {
    return config;
  }

  //dex.console.log("dex.config.expand(config=", config);

  for (var name in config) {
    if (config.hasOwnProperty(name)) {
      // Name contains hierarchy:
      if (name && name.indexOf('.') > -1) {
        expanded[name] = config[name];
        dex.object.setHierarchical(expanded, name,
          dex.object.clone(expanded[name]), '.');
        delete expanded[name];
      }
      // Simple name
      else {
        // If the target is an object with no children, clone it.
        if (dex.object.isEmpty(config[name])) {
          //dex.console.log("SET PRIMITIVE: " + name + "=" + config[name]);
          expanded[name] = dex.object.clone(config[name]);
          //expanded[name] = config[name];
        }
        else {
          //dex.console.log("SET OBJECT: " + name + " to the expansion of", config[name]);
          expanded[name] = dex.config.expand(config[name]);
        }
      }
    }
  }

  //dex.console.log("CONFIG", config, "EXPANDED", expanded);
  return expanded;
};

/**
 *
 * This routine will expand hiearchically delimited names such as
 * foo.bar into a structure { foo : { bar : value}}.  It will delete
 * the hierarchical name and overwrite the value into the proper
 * location leaving any previous object properties undisturbed.
 *
 * @param {Object} config The configuration which we will expand.
 *
 */

/*
 exports.expand_deprecate = function expand(config) {
 var name,
 ci,
 expanded;

 // We have nothing, return nothing.
 if (!config) {
 return config;
 }

 //dex.console.log("dex.config.expand(config=", config);

 // Make a clone of the previous configuration.
 expanded = dex.object.clone(config);

 // Iterate over the property names.
 for (name in config) {
 // If this is our property the process it, otherwise ignore.
 if (config.hasOwnProperty(name)) {
 // The property name is non-null.
 if (name) {
 // Determine character index.
 ci = name.indexOf('.');
 }
 else {
 // Default to -1
 ci = -1;
 }

 // if Character index is > -1, we have a hierarchical name.
 // Otherwise do nothing, copying was already handled in the
 // cloning activity.
 if (ci > -1) {
 // Set it...
 dex.object.setHierarchical(expanded, name,
 dex.object.clone(expanded[name]), '.');
 // Delete the old name.
 delete expanded[name];
 }
 }
 }

 //dex.console.log("CONFIG", config, "EXPANDED", expanded);
 return expanded;
 };
 */

/**
 *
 * This routine will take two hierarchies, top and bottom, and expand dot ('.')
 * delimited names such as: 'foo.bar.biz.baz' into a structure:
 * { 'foo' : { 'bar' : { 'biz' : 'baz' }}}
 * It will then overlay the top hierarchy onto the bottom one.  This is useful
 * for configuring objects based upon a default configuration while allowing
 * the client to conveniently override these defaults as needed.
 *
 * @param {object} top - The top object hierarchy.
 * @param {object} bottom - The bottom, base object hierarchy.
 * @returns {object} - A new object representing the expanded top object
 * hierarchy overlaid on top of the expanded bottom object hierarchy.
 *
 */
exports.expandAndOverlay = function expandAndOverlay(top, bottom) {
  //dex.console.log(
  //dex.config.getCallerString(arguments.callee.caller),
  //"TOP", top,
  //"BOTTOM", bottom,
  //"EXPANDED TOP", dex.config.expand(top),
  //"EXPANDED BOTTOM", dex.config.expand(bottom));
  return dex.object.overlay(dex.config.expand(top),
    dex.config.expand(bottom));
};

/**
 *
 * Return the configuration for a font after the user's customizations
 * have been applied.
 *
 * @param {d3font_spec} custom - The user customizations.
 * @returns {d3font_spec} - An object containing the font's specifications
 * after the user's customizations have been applied.
 *
 */
exports.font = function font(custom) {
  var defaults =
  {
    'decoration'    : 'none',
    'family'        : 'sans-serif',
    'letterSpacing' : 'normal',
    'size'          : 14,
    'style'         : 'normal',
    'weight'        : 'normal',
    'wordSpacing'   : 'normal',
    'variant'       : 'normal'
  };

  var fontSpec = dex.config.expandAndOverlay(custom, defaults);
  return fontSpec;
};

/**
 *
 * Configure the given font with the supplied font specification.
 *
 * @param {object} node - The node to be configured.
 * @param {d3font_spec} fontSpec - The font specification to be applied.
 *
 * @returns {*} The node after having the font specification applied.
 *
 */
exports.configureFont = function configureFont(node, fontSpec, i) {
  //dex.console.log("CONFIG-FONT: " + i);
  if (fontSpec) {
    dex.config.setAttr(node, 'font-family', fontSpec.family, i);
    dex.config.setAttr(node, 'font-size', fontSpec.size, i);
    dex.config.setAttr(node, 'font-weight', fontSpec.weight, i);
    dex.config.setAttr(node, 'font-style', fontSpec.style, i);
    dex.config.setAttr(node, 'text-decoration', fontSpec.decoration, i);

    dex.config.setAttr(node, 'word-spacing', fontSpec.wordSpacing, i);
    dex.config.setAttr(node, 'letter-spacing', fontSpec.letterSpacing, i);
    dex.config.setAttr(node, 'variant', fontSpec.variant, i);
  }
  return node;
};

/**
 *
 * Construct a text speficiation.
 *
 * @param {d3text_spec} custom - The user's adjustments to the default text
 * specification.
 *
 * @returns {d3text_spec} A revised text specification after having applied
 * the user's modfiications.
 *
 */
exports.text = function text(custom) {
  var defaults =
  {
    'font'                     : dex.config.font(),
    'x'                        : 0,
    'y'                        : 0,
    'textLength'               : undefined,
    'lengthAdjust'             : undefined,
    'transform'                : '',
    'glyphOrientationVertical' : undefined,
    'text'                     : undefined,
    'dx'                       : 0,
    'dy'                       : 0,
    'writingMode'              : undefined,
    'anchor'                   : 'start',
    'fill'                     : dex.config.fill(),
    'format'                   : undefined,
    'events'                   : dex.config.events()
  };

  var textSpec = dex.config.expandAndOverlay(custom, defaults);
  return textSpec;
};

/**
 *
 * This routine will dynamically configure an SVG text entity based upon the
 * supplied configuration.
 *
 * @param {object} node The SVG text node to be configured.
 * @param {d3text_spec} textSpec The text specification for this node.
 *
 * @returns {*} The node after having applied the text specification.
 *
 */
exports.configureText = function configureText(node, textSpec, i) {
  //dex.console.log("CONFIG-TEXT: " + i);
  if (textSpec) {
    dex.config.setAttr(node, "x", textSpec.x, i);
    dex.config.setAttr(node, "y", textSpec.y, i);
    dex.config.setAttr(node, "dx", textSpec.dx, i);
    dex.config.setAttr(node, "dy", textSpec.dy, i);
    dex.config.setStyle(node, "text-anchor", textSpec.anchor, i);
    dex.config.configureFont(node, textSpec.font, i);
    dex.config.setAttr(node, 'textLength', textSpec.textLength, i);
    dex.config.setAttr(node, 'lengthAdjust', textSpec.lengthAdjust, i);
    dex.config.setAttr(node, 'transform', textSpec.transform, i);
    dex.config.setAttr(node, 'glyph-orientation-vertical',
      textSpec.glyphOrientationVertical, i);
    dex.config.setAttr(node, 'writing-mode', textSpec.writingMode, i);
    dex.config.callIfDefined(node, 'text', textSpec.text, i);
    dex.config.configureFill(node, textSpec.fill, i);
    dex.config.configureEvents(node, textSpec.events, i);
  }
  return node;
};

/**
 *
 * Construct a stroke specification.
 *
 * @param {d3text_spec} strokeSpec - The user's customizations to the specification.
 *
 * @returns {d3text_spec} The stroke specification after having applied the user's
 * configuration.
 *
 */
exports.stroke = function stroke(strokeSpec) {
  var defaults =
  {
    'width'     : 1,
    'color'     : "black",
    'opacity'   : 1,
    'dasharray' : '',
    'transform' : ''
  };

  var config = dex.config.expandAndOverlay(strokeSpec, defaults);
  return config;
};

/**
 *
 * Apply a stroke specification to a node.
 *
 * @param {object} node - The node to be configured.
 * @param {d3stroke_spec} strokeSpec - The stroke specification to be applied.
 * @returns The newly configured node.
 */
exports.configureStroke = function configureStroke(node, strokeSpec, i) {
  if (strokeSpec) {
    dex.config.setAttr(node, "stroke", strokeSpec.color, i);
    dex.config.setStyle(node, 'stroke-width', strokeSpec.width, i);
    dex.config.setStyle(node, 'stroke-opacity', strokeSpec.opacity, i);
    dex.config.setStyle(node, 'stroke-dasharray', strokeSpec.dasharray, i);
    dex.config.setAttr(node, 'transform', strokeSpec.transform, i);
  }
  return node;
};
/**
 *
 * Construct a fill specification which allow the user to override any
 * its settings.
 *
 * @param {d3fill_spec} custom - The user's customizations.
 * @returns {d3fill_spec} A fill specification which has applied the user's
 * customizations.
 *
 */
exports.fill = function fill(custom) {
  var defaults =
  {
    'fillColor'   : "grey",
    'fillOpacity' : 1
  };

  var config = dex.config.expandAndOverlay(custom, defaults);
  return config;
};

/**
 *
 * Apply a fill specification to a node.
 *
 * @param {object} node - The node to be configured.
 * @param {d3fill_spec} config - The fill specification.
 *
 * @returns {object} The node after having applied the fill specification.
 *
 */
exports.configureFill = function configureFill(node, config, i) {
  if (config) {
    dex.config.setStyle(node, 'fill', config.fillColor, i);
    dex.config.setStyle(node, 'fill-opacity', config.fillOpacity, i);
  }
  return node;
};

/**
 *
 * Construct a link specification which allows the user to override any
 * of the settings.
 *
 * @param {d3link_spec} custom - The users customizations.
 *
 * @returns {d3link_spec} A link specification generated by combining the
 * default with the user's customizations.
 *
 */
exports.link = function link(custom) {
  var defaults =
  {
    'fill'      : dex.config.fill(),
    'stroke'    : dex.config.stroke(),
    'transform' : '',
    'd'         : undefined,
    'events'    : dex.config.events()
  };

  var config = dex.config.expandAndOverlay(custom, defaults);
  return config;
};

/**
 *
 * Apply a link specification to a node.
 *
 * @param {object} node - The node to apply the specification to.
 * @param {d3link_spec} config - The link specification.
 *
 * @returns {object} The node after having applied the specification.
 *
 */
exports.configureLink = function configureLink(node, config, i) {
  if (config) {
    dex.config.configureStroke(node, config.stroke, i);
    dex.config.configureFill(node, config.fill, i);
    dex.config.setAttr(node, 'transform', config.transform, i);
    dex.config.setAttr(node, 'd', config.d, i);
    dex.config.configureEvents(node, config.events, i);
  }
  return node;
}

/**
 *
 * Construct a rectangle specification which allows the user to override any
 * of the settings.
 *
 * @param {d3rect_spec} custom - The users customizations.
 *
 * @returns {d3rect_spec} A rectangle specification generated by combining the
 * default with the user's customizations.
 *
 */
exports.rectangle = function rectangle(custom) {
  var config =
  {
    'width'     : 50,
    'height'    : 50,
    'x'         : 0,
    'y'         : 0,
    'rx'        : 0,
    'ry'        : 0,
    'stroke'    : dex.config.stroke(),
    'opacity'   : 1,
    'color'     : d3.scale.category20(),
    'transform' : undefined,
    'events'    : dex.config.events()
  };
  if (custom) {
    config = dex.object.overlay(custom, config);
  }
  return config;
};

exports.configureRectangle = function configureRectangle(node, config, i) {
  if (config) {
    dex.config.setAttr(node, 'width', config.width, i);
    dex.config.setAttr(node, 'height', config.height, i);
    dex.config.setAttr(node, 'x', config.x, i);
    dex.config.setAttr(node, 'y', config.y, i);
    dex.config.setAttr(node, 'rx', config.rx, i);
    dex.config.setAttr(node, 'ry', config.ry, i);
    dex.config.setAttr(node, 'opacity', config.opacity, i);
    dex.config.setAttr(node, 'fill', config.color, i);
    dex.config.setAttr(node, 'transform', config.transform, i);
    dex.config.configureStroke(node, config.stroke, i);
    dex.config.configureEvents(node, config.events, i);
  }
  return node;
};

/**
 *
 * Construct an events specification which allows the user to override any
 * of the settings.
 *
 * @param {d3events_spec} custom - The users customizations.
 *
 * @returns {d3events_spec} An events specification generated by combining the
 * default with the user's customizations.
 *
 */
exports.events = function events(custom) {
  var defaults =
  {
    'mouseover' : function (d) {
      //console.log("Default mouseover");
    }
  };
  var config = defaults;

  if (custom) {
    config = dex.object.overlay(custom, defaults);
  }
  return config;
};

exports.configureEvents = function configureEvents(node, config, i) {
  //dex.console.log("Configure Events", config, i);
  if (config) {
    for (var key in config) {
      //dex.console.log("KEY", key, "VALUE", config[key]);
      dex.config.setEventHandler(node, key, config[key], i);
    }
  }

  return node;
};

/**
 *
 * Construct an line specification which allows the user to override any
 * of the settings.
 *
 * @param {d3line_spec} custom - The users customizations.
 *
 * @returns {d3line_spec} A line specification generated by combining the
 * default with the user's customizations.
 *
 */
exports.line = function line(custom) {
  var defaults =
  {
    'start'       : dex.config.point(),
    'end'         : dex.config.point(),
    'stroke'      : dex.config.stroke(),
    'fill'        : dex.config.fill(),
    'interpolate' : undefined
  };
  var config = dex.config.expandAndOverlay(custom, defaults);
  return config;
};

exports.configureLine = function configureLine(node, config, i) {
  if (config) {
    dex.config.setAttr(node, 'x1', config.start.x, i);
    dex.config.setAttr(node, 'y1', config.start.y, i);
    dex.config.setAttr(node, 'x2', config.end.x, i);
    dex.config.setAttr(node, 'y2', config.end.y, i);
    dex.config.configureStroke(node, config.stroke, i);
    dex.config.configureFill(node, config.fill, i);
    if (config.interpolate) {
      //dex.console.log("interpolate", node, config, i);
      node.interpolate(config.interpolate);
      // I think this is closer to correct....but breaks the motion line chart
      //node.interpolate(dex.config.optionValue(config.interpolate, i));
    }
  }
  return node;
};

/**
 *
 * Construct an path specification which allows the user to override any
 * of the settings.
 *
 * @param {d3path_spec} custom - The users customizations.
 *
 * @returns {d3path_spec} A path specification generated by combining the
 * default with the user's customizations.
 *
 */
exports.path = function path(custom) {
  var defaults =
  {
    'fill'   : dex.config.fill(),
    'stroke' : dex.config.stroke()
  };
  var config = dex.config.expandAndOverlay(custom, defaults);
  return config;
};

exports.configurePath = function configurePath(node, config, i) {
  if (config) {
    dex.config.configureFill(node, config.fill, i);
    dex.config.configureStroke(node, config.stroke, i);
  }
  return node;
};

exports.getCallers = function getCallers(caller) {
  var callers = [];
  var currentCaller = caller;
  for (; currentCaller; currentCaller = currentCaller.caller) {
    if (currentCaller.name) {
      callers.push(currentCaller.name);
    }
  }

  return callers.reverse();
}

exports.getCallerString = function getCallerString(caller) {
  return dex.config.getCallers(caller).join("->");
}

exports.setEventHandler = function setEventHandler(node, eventType, eventHandler, i) {
  var callerStr = dex.config.getCallerString(arguments.callee.caller);

  //dex.console.debug(callerStr + ": setEventHandler(node=" + node + ", eventType=" + eventType + ", eventHandler=" + eventHandler);
  if (!node) {
    dex.console.warn(callerStr + ": dex.config.setEventHandler(eventType='" + eventType + "eventHandler=" + eventHandler + ") : node is null.");
    return node;
  }
  if (!dex.object.isFunction(node.on)) {
    dex.console.warn(callerStr + ": dex.config.setEventHandler(eventType='" + eventType + "', eventHandler='" + eventHandler +
    "') : target node is missing function: node.on(eventType,eventHandler).  Node dump:", node);
    return node;
  }
  if (typeof eventHandler != 'undefined') {
    dex.console.debug(callerStr + ": Set Event Handler: '" + eventType + "'='" + eventHandler + "'");
    node.on(eventType, eventHandler);
  }
  else {
    dex.console.debug(callerStr += ": Undefined Event Handler: '" + eventType + "'='" + eventHandler + "'");
  }
  return node;
};

exports.setAttr = function setAttr(node, name, value, i) {
  var callerStr = dex.config.getCallerString(arguments.callee.caller);
  if (!node) {
    dex.console.warn(callerStr + ": dex.config.setAttr(name='" + name + "value=" + value + ") : node is null.");
    return node;
  }
  if (!dex.object.isFunction(node.attr)) {
    dex.console.warn(callerStr + ": dex.config.setAttr(name='" + name + "', value='" + value +
    "') : target node is missing function: node.attr.  Node dump:", node);
    return node;
  }
  if (typeof value != 'undefined') {
    dex.console.debug(callerStr + ": Set Attr: '" + name + "'='" + value + "'");
    node.attr(name, dex.config.optionValue(value, i));
  }
  else {
    dex.console.debug(callerStr += ": Undefined Attr: '" + name + "'='" + value + "'");
  }
  return node;
};

exports.setStyle = function setStyle(node, name, value, i) {
  var callerStr = dex.config.getCallerString(arguments.callee.caller);
  if (!node) {
    dex.console.warn(callerStr + ": dex.config.setAttr(name='" + name + "value=" + value + ") : node is null.");
    return node;
  }
  if (!dex.object.isFunction(node.style)) {
    dex.console.warn(callerStr + ": dex.config.setStyle(name='" + name + "', value='" + value +
    "') : target node is missing function: node.style.  Node Dump:", node);
    return node;
  }
  if (typeof value !== 'undefined' && node && dex.object.isFunction(node.style)) {
    dex.console.debug(callerStr + ": Set Style: name='" + name + "', Value Dump:",
      dex.config.optionValue(value, i));
    node.style(name, dex.config.optionValue(value, i));
  }
  else {
    dex.console.debug(callerStr + ": Undefined Style: name='" + name + "', Value Dump:", value);
  }
  return node;
};

exports.optionValue = function optionValue(option, i) {
  //dex.console.log("OPTION-I: " + i);

  // Curry value i:
  if (typeof i !== 'undefined') {
    return function (d) {
      //dex.console.log("OPTION", option, "D", d, "I", i);
      if (dex.object.isFunction(option)) {
        return option(d, i);
      }
      else {
        return option;
      }
    };
  }
  else {
    return function (d, i) {
      //dex.console.log("OPTION", option, "D", d, "I", i);
      if (dex.object.isFunction(option)) {
        return option(d, i);
      }
      else {
        return option;
      }
    };
  }
};

/**
 *
 * Is this correct?  It looks suspect to me.
 *
 * @param node
 * @param fn
 * @param value
 * @param i
 * @returns {*}
 */
exports.callIfDefined = function callIfDefined(node, fn, value, i) {
  //dex.console.log("CALL-IF-DEFINED: fn=" + fn + ", value=" + value + ", I=" + i);
  if (typeof value === 'undefined') {
    //dex.console.log("Skipping: " + fn + "()");
  }
  else {
    //dex.console.log("Calling: '" + fn + "(" + value + ")");
    return node[fn](dex.config.optionValue(value, i));
  }

  return node;
};

/**
 *
 * Construct an point specification which allows the user to override any
 * of the settings.
 *
 * @param {d3point_spec} custom - The users customizations.
 *
 * @returns {d3point_spec} A point specification generated by combining the
 * default with the user's customizations.
 *
 */
exports.point = function point(custom) {
  var config =
  {
    'x' : undefined,
    'y' : undefined
  };
  if (custom) {
    config = dex.object.overlay(custom, config);
  }
  return config;
};

exports.configurePoint = function configurePoint(node, config, i) {
  if (config) {
    node
      .attr('x', dex.config.optionValue(config.center.cx, i))
      .attr('y', dex.config.optionValue(config.center.cy, i));
  }
  return node;
};

// Configures: opacity, color, stroke.
exports.configureShapeStyle = function configureShapeStyle(node, config, i) {
  if (config) {
    node
      .call(dex.config.configureStroke, config.stroke, i)
      .attr('opacity', config.opacity)
      .style('fill', config.color);
  }
  return node;
};

/**
 *
 * Construct an circle specification which allows the user to override any
 * of the settings.
 *
 * @param {d3circle_spec} custom - The users customizations.
 *
 * @returns {d3circle_spec} A circle specification generated by combining the
 * default with the user's customizations.
 *
 */
exports.circle = function circle(custom) {
  var config =
  {
    'cx'        : 0,
    'cy'        : 0,
    'r'         : 10,
    'fill'      : dex.config.fill(),
    'stroke'    : dex.config.stroke(),
    'transform' : '',
    'title'     : '',
    'events'    : dex.config.events()
  };
  if (custom) {
    config = dex.object.overlay(custom, config);
  }
  return config;
};

exports.configureCircle = function configureCircle(node, config, i) {
  if (config) {
    dex.config.setAttr(node, "r", config.r, i);
    dex.config.setAttr(node, "cx", config.cx, i);
    dex.config.setAttr(node, "cy", config.cy, i);
    dex.config.setAttr(node, "transform", config.transform, i);
    dex.config.setAttr(node, "title", config.title, i);
    dex.config.configureStroke(node, config.stroke, i);
    dex.config.configureFill(node, config.fill, i);
    dex.config.configureEvents(node, config.events, i);
  }
  return node;
};

/*
 exports.configureAxis_deprecated = function configureAxis_deprecated(config) {
 var axis;

 if (config) {
 var axis = d3.svg.axis()
 .ticks(config.tick.count)
 .tickSubdivide(config.tick.subdivide)
 .tickSize(config.tick.size.major, config.tick.size.minor,
 config.tick.size.end)
 .tickPadding(config.tick.padding);

 // REM: Horrible way of doing this.  Need a function which
 // is more generic and smarter to short circuit stuff like
 // this.  But...for now it does what I want.
 if (!dex.object.isFunction(config.tick.format)) {
 axis.tickFormat(config.tick.format);
 }

 axis
 .orient(config.orient)
 .scale(config.scale);
 }
 else {
 axis = d3.svg.axis();
 }
 //axis.scale = config.scale;
 return axis;
 };
 */

/**
 *
 * Construct an tick specification which allows the user to override any
 * of the settings.
 *
 * @param {d3tick_spec} custom - The users customizations.
 *
 * @returns {d3tick_spec} A tick specification generated by combining the
 * default with the user's customizations.
 *
 */
exports.tick = function tick(custom) {
  var config =
  {
    'count'     : 5,
    //'tickValues'  : undefined,
    'subdivide' : 3,
    'size'      : {
      'major' : 5,
      'minor' : 3,
      'end'   : 5
    },
    'padding'   : 5,
    'format'    : d3.format(",d"),
    'label'     : dex.config.text()
  };
  if (custom) {
    config = dex.object.overlay(custom, config);
  }
  return config;
};

/*
 exports.xaxis_deprecate = function (custom) {
 var config =
 {
 'scale'  : d3.scale.linear(),
 'orient' : "bottom",
 'tick'   : this.tick(),
 'label'  : dex.config.text()
 };
 if (custom) {
 config = dex.object.overlay(custom, config);
 }
 return config;
 };

 exports.yaxis_deprecate = function (custom) {
 var config =
 {
 'scale'  : d3.scale.linear(),
 'orient' : 'left',
 'tick'   : this.tick(),
 'label'  : dex.config.text({'transform' : 'rotate(-90)'})
 };
 if (custom) {
 config = dex.object.overlay(custom, config);
 }
 return config;
 };
 */

exports.callConditionally = function callConditionally(fn, value, i) {
  //dex.console.log("- FN:" + fn);
  //dex.console.log("- VALUE:" + value);
  if (value !== undefined) {
    //dex.console.log("- CALLING: " + fn + " of " + value);
    if (i !== undefined) {
      fn(value, i);
    }
    else {
      fn(value);
    }
  }
  else {
  }
};

/**
 *
 * Configure the input parameters for configuring an axis.
 * Certain defaults are imposed should the "custom" variable
 * not specify that parameter.
 *
 * @param custom The user supplied axis configuration.
 *
 * @returns {d3axis_spec} The axis specification with
 * user supplied overrides applied.
 *
 */
exports.axis = function axis(custom) {
  var defaults =
  {
    'scale'         : dex.config.scale({'type' : 'linear'}),
    'orient'        : 'bottom',
    'ticks'         : undefined,
    'tickValues'    : undefined,
    'tickSize'      : undefined,
    'innerTickSize' : undefined,
    'outerTickSize' : undefined,
    'tickPadding'   : undefined,
    'tickFormat'    : undefined
    //'label'         : dex.config.text()
  };

  var axisSpec = dex.config.expandAndOverlay(custom, defaults);
  return axisSpec;
};

/**
 *
 * Create an axis with the specified configuration.
 *
 * @param axis The axis to configure.
 * @param config The user specified axis configuration.
 *
 * @returns {*} The newly configured axis.
 */
exports.configureAxis = function configureAxis(axis, config, i) {
  //dex.console.log("CONFAXIS: " + i);
  if (config) {
    [
      'scale',
      'orient',
      'ticks',
      'tickValues',
      'tickSize',
      'innerTickSize',
      'outerTickSize',
      'tickPadding',
      'tickFormat'
    ].forEach(function (fn) {
        //dex.console.log("Calling: " + fn);
        dex.config.callConditionally(axis[fn], config[fn], i);
      });
  }
  return axis;
};

exports.createAxis = function createAxis(userConfig, i) {
  var config = dex.config.axis(userConfig);
  return dex.config.configureAxis(d3.svg.axis(), config, i);
};

/**
 *
 * Construct a {d3axis_spec} based on reasonable defaults with
 * user customizations applied on top.
 *
 * @param custom The user customizations.
 *
 * @returns {d3scale_spec} The scale specification with
 * user supplied overrides applied.
 *
 */
exports.scale = function scale(custom) {
  var fmap =
  {
    'linear'   : dex.config.linearScale,
    'sqrt'     : dex.config.sqrtScale,
    'pow'      : dex.config.powScale,
    'time'     : dex.config.timeScale,
    'log'      : dex.config.logScale,
    'ordinal'  : dex.config.ordinalScale,
    'quantile' : dex.config.quantileScale,
    'quantize' : dex.config.quantizeScale,
    'identity' : dex.config.identityScale
  };

  var defaults =
  {
    'type' : 'linear'
  };

  var config = dex.config.expandAndOverlay(custom, defaults);

  return fmap[config.type](config);
}

/**
 *
 * Given a scale specification, create, configure, and return a
 * scale which meets that specification.
 *
 * @param {d3scale_spec} scaleSpec
 * @returns {Object} Returns a d3.scale with the supplied specification.
 *
 */
exports.createScale = function createScale(scaleSpec) {
  var scale;

  var fmap =
  {
    'linear'   : d3.scale.linear,
    'sqrt'     : d3.scale.sqrt,
    'pow'      : d3.scale.pow,
    'time'     : d3.time.scale,
    'log'      : d3.scale.log,
    'ordinal'  : d3.scale.ordinal,
    'quantile' : d3.scale.quantile,
    'quantize' : d3.scale.quantize,
    'identity' : d3.scale.identity
  };

  if (scaleSpec) {
    scale = fmap[scaleSpec.type]();

    // Since we create a non-parameterized scale, here we parameterize it based upon
    // the supplied specification
    dex.config.configureScale(scale, scaleSpec);
  }
  else {
    scale = d3.scale.linear();
  }

  return scale;
}

/**
 *
 * Construct a linear {d3scale_spec} based on reasonable
 * defaults with user customizations applied on top.
 *
 * @param custom The user customizations.
 *
 * @returns {d3scale_spec} The linear scale specification with
 * user supplied overrides applied.
 *
 */
exports.linearScale = function linearScale(custom) {
  var defaults =
  {
    'type'        : 'linear',
    'domain'      : [0, 100],
    'range'       : [0, 800],
    'rangeRound'  : undefined,
    'interpolate' : undefined,
    'clamp'       : undefined,
    'nice'        : undefined
  };

  var linearScaleSpec = dex.config.expandAndOverlay(custom, defaults);
  return linearScaleSpec;
};

/**
 *
 * Construct a power {d3scale_spec} based on reasonable
 * defaults with user customizations applied on top.
 *
 * @param custom The user customizations.
 *
 * @returns {d3scale_spec} The power scale specification with
 * user supplied overrides applied.
 *
 */
exports.powScale = function powScale(custom) {
  var defaults =
  {
    'type'        : 'pow',
    'domain'      : [0, 100],
    'range'       : [0, 800],
    'rangeRound'  : undefined,
    'interpolate' : undefined,
    'clamp'       : undefined,
    'nice'        : undefined
  };

  var config = dex.config.expandAndOverlay(custom, defaults);
  return config;
};

/**
 *
 * Construct a sqrt {d3scale_spec} based on reasonable
 * defaults with user customizations applied on top.
 *
 * @param custom The user customizations.
 *
 * @returns {d3scale_spec} The sqrt scale specification with
 * user supplied overrides applied.
 *
 */
exports.sqrtScale = function sqrtScale(custom) {
  var defaults =
  {
    'type'        : 'sqrt',
    'domain'      : [0, 100],
    'range'       : [0, 800],
    'rangeRound'  : undefined,
    'interpolate' : undefined,
    'clamp'       : undefined,
    'nice'        : undefined
  };

  var config = dex.config.expandAndOverlay(custom, defaults);
  return config;
};

/**
 *
 * Construct a log {d3scale_spec} based on reasonable
 * defaults with user customizations applied on top.
 *
 * @param custom The user customizations.
 *
 * @returns {d3scale_spec} The log scale specification with
 * user supplied overrides applied.
 *
 */
exports.logScale = function logScale(custom) {
  var defaults =
  {
    'type'        : 'log',
    'domain'      : [0, 100],
    'range'       : [0, 800],
    'rangeRound'  : undefined,
    'interpolate' : undefined,
    'clamp'       : undefined,
    'nice'        : undefined
  };

  var logSpec = dex.config.expandAndOverlay(custom, defaults);
  return logSpec;
};

/**
 *
 * Construct a ordinal {d3scale_spec} based on reasonable
 * defaults with user customizations applied on top.
 *
 * @param custom - The user customizations.
 * @param {object} [custom.rangeRoundBands] -
 * @param {object} [custom.rangeBands] -
 * @param {object} [custom.rangePoints] - rangePoints(interval [, padding]) : Sets the output range from the specified continuous
 * interval. The array interval contains two elements representing the minimum and maximum
 * numeric value. This interval is subdivided into n evenly-spaced points, where n is the
 * number of (unique) values in the input domain. The first and last point may be offset
 * from the edge of the interval according to the specified padding, which defaults to zero.
 * The padding is expressed as a multiple of the spacing between points. A reasonable value
 * is 1.0, such that the first and last point will be offset from the minimum and maximum
 * value by half the distance between points.
 * @param {object} [custom.rangeBands] -
 *
 * @returns {d3scale_spec} The ordinal scale specification with
 * user supplied overrides applied.
 *
 */
exports.ordinalScale = function ordinalScale(custom) {
  var defaults =
  {
    'type'            : 'ordinal',
    'domain'          : undefined,
    'range'           : undefined,
    'rangeRoundBands' : undefined,
    'rangePoints'     : undefined,
    'rangeBands'      : undefined
  };

  var ordinalSpec = dex.config.expandAndOverlay(custom, defaults);
  return ordinalSpec;
};

exports.timeScale = function timeScale(custom) {
  var defaults =
  {
    'type'        : 'time',
    'domain'      : undefined,
    'range'       : undefined,
    'rangeRound'  : undefined,
    'interpolate' : undefined,
    'clamp'       : undefined,
    'ticks'       : undefined,
    'tickFormat'  : undefined
  };

  var config = dex.config.expandAndOverlay(custom, defaults);
  return config;
};

exports.quantileScale = function quantileScale(custom) {
  var defaults =
  {
    'type'   : 'quantile',
    'domain' : undefined,
    'range'  : undefined
  };

  var config = dex.config.expandAndOverlay(custom, defaults);
  return config;
};

exports.quantizeScale = function quantizeScale(custom) {
  var defaults =
  {
    'type'   : 'quantize',
    'domain' : undefined,
    'range'  : undefined
  };

  var config = dex.config.expandAndOverlay(custom, defaults);
  return config;
};

exports.identityScale = function identityScale(custom) {
  var defaults =
  {
    'type'   : 'identity',
    'domain' : undefined,
    'range'  : undefined
  };

  var config = dex.config.expandAndOverlay(custom, defaults);
  return config;
};

exports.thresholdScale = function thresholdScale(custom) {
  var defaults =
  {
    'type'   : 'threshold',
    'domain' : undefined,
    'range'  : undefined
  };

  var config = dex.config.expandAndOverlay(custom, defaults);
  return config;
};

exports.configureScale = function configureScale(scale, config) {
  if (config) {
    for (var property in config) {
      dex.console.trace("ConfigureScale Property: '" + property + "'");
      if (config.hasOwnProperty(property) && property !== 'type' && config[property] !== undefined) {
        dex.console.trace("Property: '" + property + "'");
        dex.config.callConditionally(scale[property], config[property]);
      }
      else {
        dex.console.debug("Missing Property: '" + property + "'");
      }
    }
  }

  return scale;
};

//module.exports = config;
},{}],7:[function(require,module,exports){
/**
 *
 * This module provides console logging capabilities.
 *
 * @module console
 *
 */

/**
 *
 * @type {{TRACE: number, DEBUG: number, NORMAL: number, WARN: number, FATAL: number, NONE: number}}
 */
var logLevels = {
  'TRACE'  : 5,
  'DEBUG'  : 4,
  'NORMAL' : 3,
  'WARN'   : 2,
  'FATAL'  : 1,
  'NONE'   : 0
};

exports.logLevels = logLevels;

var logLevel = logLevels.NORMAL;

exports.logLevel = logLevel;

////
//
// dex.console : This module provides routines assisting with console output.
//
////

/**
 * Log this message if the current log level is greater than or equal
 * to dex.console.logLevel.
 *
 * @param msgLevel The log level for this message.
 * @param msg One or more messages to be logged.  Strings will simply
 * use console.log while objects will use console.dir.
 *
 * @returns {dex.console}
 */
exports.logWithLevel = function (msgLevel, msg) {
//  console.log(dex.console.logLevel());
//  console.log(msgLevel);
//  console.dir(msg);

  if (dex.console.logLevel() >= msgLevel) {
    for (i = 0; i < msg.length; i++) {
      if (typeof msg[i] == 'object') {
        console.dir(msg[i]);
      }
      else {
        console.log(msg[i]);
      }
    }
  }
  return this;
}

/**
 * Write one or more TRACE level messages.
 *
 * @param msg One or more TRACE messages to log.
 *
 * @returns {dex.console|*}
 */
exports.trace = function () {
  return dex.console.logWithLevel(logLevels.TRACE, arguments)
};

/**
 * Write one or more DEBUG level messages.
 *
 * @param msg One or more DEBUG messages to log.
 *
 * @returns {dex.console|*}
 */
exports.debug = function () {
  return dex.console.logWithLevel(logLevels.DEBUG, arguments)
};

/**
 * Write one or more NORMAL level messages.
 *
 * @param msg One or more NORMAL messages to log.
 *
 * @returns {dex.console|*}
 *
 */
exports.log = function () {
  //console.log("caller is " + arguments.callee.caller.toString());
  return dex.console.logWithLevel(logLevels.NORMAL, arguments)
};

/**
 * Write one or more WARN level messages.
 *
 * @param msg One or more WARN messages to log.
 *
 * @returns {dex.console|*}
 *
 */
exports.warn = function () {
  return dex.console.logWithLevel(logLevels.WARN, arguments)
};

/**
 * Write one or more FATAL level messages.
 *
 * @param msg One or more FATAL messages to log.
 *
 * @returns {dex.console|*}
 */
exports.fatal = function () {
  return dex.console.logWithLevel(logLevels.FATAL, arguments)
};

/**
 * This function returns the current log level.
 *
 * @returns The current log level.
 *
 */
exports.logLevel = function (_) {
  if (!arguments.length) return logLevel;
  logLevel = logLevels[_];
  return logLevel;
};

exports.logLevels = function () {
  return logLevels;
};

},{}],8:[function(require,module,exports){
/**
 *
 * This module provides support for dealing with csv structures.  This
 * is the core datatype on which dexjs components operate.
 *
 * @module csv
 *
 */

/**
 *
 * @param header
 * @param data
 * @returns {{header: *, data: *}}
 */
exports.csv = function (header, data) {
  var csv =
  {
    "header": header,
    "data": data
  };

  return csv;
};

/**
 *
 * @param csv
 * @returns {{header: *, data: {header, data}}}
 */
exports.transpose = function (csv) {
  return {
    "header": csv.header,
    "data": dex.matrix.transpose(csv.data)
  };
};

/**
 * Given a CSV, create a connection matrix suitable for feeding into a chord
 * diagram.  Ex, given CSV:
 *
 * @param csv
 * @returns {{header: Array, connections: Array}|*}
 *
 */
exports.getConnectionMatrix = function (csv) {
  var matrix = [];
  var ri, ci;
  var row;
  var cid;
  var header = [];
  var nameToIndex = {};
  var connectionMatrix;
  var uniques;
  var nameIndices = [];
  var src, dest;

  // Create a list of unique values to relate to one another.
  uniques = dex.matrix.uniques(csv.data);
  // Flatten them into our header.
  header = dex.matrix.flatten(uniques);

  // Create a map of names to header index for each column.
  nameToIndex = new Array(uniques.length);
  for (ri = 0, cid = 0; ri < uniques.length; ri++) {
    nameToIndex[ri] =
    {};
    for (ci = 0; ci < uniques[ri].length; ci++) {
      nameToIndex[ri][header[cid]] = cid;
      cid += 1;
    }
  }

  // Create a N x N matrix of zero values.
  matrix = new Array(header.length);
  for (ri = 0; ri < header.length; ri++) {
    row = new Array(header.length);
    for (ci = 0; ci < header.length; ci++) {
      row[ci] = 0;
    }
    matrix[ri] = row;
  }
  //dex.console.log("nameToIndex", nameToIndex, "matrix", matrix);

  for (ri = 0; ri < csv.data.length; ri++) {
    for (ci = 1; ci < csv.header.length; ci++) {
      src = nameToIndex[ci - 1][csv.data[ri][ci - 1]];
      dest = nameToIndex[ci][csv.data[ri][ci]];

      //dex.console.log(csv.data[ri][ci-1] + "<->" + csv.data[ri][ci], src + "<->" + dest);
      matrix[src][dest] = 1;
      matrix[dest][src] = 1;
    }
  }

  connectionMatrix = {"header": header, "connections": matrix};
  //dex.console.log("Connection Matrix", connectionMatrix);
  return connectionMatrix;
};

/**
 *
 * @param csv
 * @param keyIndex
 * @returns {{}}
 */
exports.createMap = function (csv, keyIndex) {
  var ri, ci, rowMap, map =
  {};

  for (ri = 0; ri < csv.data.length; ri += 1) {
    if (csv.data[ri].length === csv.header.length) {
      rowMap =
      {};

      for (ci = 0; ci < csv.header.length; ci += 1) {
        rowMap[csv.header[ci]] = csv.data[ri][ci];
      }
      map[csv.data[ri][keyIndex]] = rowMap;
    }
  }
  return map;
};

/**
 *
 * @param csv
 * @param rowIndex
 * @param columnIndex
 * @returns {*}
 */
exports.toJson = function (csv, rowIndex, columnIndex) {
  var jsonData = [];
  var ri, ci, jsonRow;

  if (arguments.length >= 3) {
    jsonRow = {};
    jsonRow[csv.header[columnIndex]] = csv.data[rowIndex][columnIndex];
    return jsonRow;
  }
  else if (arguments.length === 2) {
    var jsonRow =
    {};
    for (ci = 0; ci < csv.header.length; ci += 1) {
      jsonRow[csv.header[ci]] = csv.data[rowIndex][ci];
    }
    return jsonRow;
  }
  else if (arguments.length === 1) {
    for (ri = 0; ri < csv.data.length; ri++) {
      var jsonRow =
      {};
      for (ci = 0; ci < csv.header.length; ci++) {
        jsonRow[csv.header[ci]] = csv.data[ri][ci];
        //dex.console.log(csv.header[ci] + "=" + csv.data[ri][ci], jsonRow);
      }
      jsonData.push(jsonRow);
    }
  }
  return jsonData;
};

/**
 *
 * @param csv
 * @returns {{}}
 */
exports.toColumnArrayJson = function (csv) {
  var json = {};
  var ri, ci, jsonRow;

  if (arguments.length === 1) {
    for (ci = 0; ci < csv.header.length; ci++) {
      json[csv.header[ci]] = [];
    }

    for (ri = 0; ri < csv.data.length; ri++) {
      for (ci = 0; ci < csv.header.length; ci++) {
        json[csv.header[ci]].push(csv.data[ri][ci]);
      }
    }
  }

  return json;
};

/**
 *
 * @param csv
 * @returns {{header: *, data: *}}
 *
 */
exports.copy = function (csv) {
  var copy = {
    'header': dex.array.copy(csv.header),
    'data': dex.matrix.copy(csv.data)
  };
  return copy;
};

/**
 *
 * A utility transform for dealing with some of D3's more finiky formats.
 *
 * csv =
 * {
 * 	 header : {C1,C2,C3},
 *   data   : [
 *     [A,B,C],
 *     [A,B,D]
 *   ]
 * }
 * into:
 * json =
 * {
 * 	"name"     : rootName,
 *  "category" : category,
 *  "children" :
 *  [
 *    "children" :
 *     [
 *       {
 *         "name"     : "A",
 *         "category" : "C1",
 *         "children" :
 *         [
 *           {
 * 	           "name" : "B",
 *             "category" : "C2",
 *             "children" :
 *             [
 *               {
 *                 "name"     : "C",
 *                 "category" : "C3",
 *                 "size"     : 1
 *               }
 *               {
 *                 "name"     : "D",
 *                 "category" : "C3",
 *                 "size"     : 1
 *               }
 *             ]
 *           }
 *         ]
 *       }
 *     ]
 *  ]
 * }
 *
 * @param {Object} csv
 */
exports.toHierarchicalJson = function (csv) {
  var connections = dex.csv.connections(csv);
  return getChildren(connections, 0);

  function getChildren(connections, depth) {
    //dex.console.log("connections:", connections, "depth="+depth);
    var kids = [], cname;

    if (typeof connections === 'undefined') {
      return kids;
    }

    for (cname in connections) {
      //dex.console.log("CNAME", cname);
      if (connections.hasOwnProperty(cname)) {
        kids.push(createChild(cname, csv.header[depth],
          getChildren(connections[cname], depth + 1)));
      }
    }

    return kids;
  }

  function createChild(name, category, children) {
    var child =
    {
      "name": name,
      "category": category,
      "children": children
    };
    return child;
  }
};

/**
 *
 * Transforms:
 * csv =
 * {
 * 	 header : {C1,C2,C3},
 *   data   : [
 *     [A,B,C],
 *     [A,B,D]
 *   ]
 * }
 * into:
 * connections =
 * { A:{B:{C:{},D:{}}}}
 *
 * @param {Object} csv
 *
 */
exports.connections = function (csv) {
  var connections =
  {};
  var ri;

  for (ri = 0; ri < csv.data.length; ri++) {
    dex.object.connect(connections, csv.data[ri]);
  }

  //dex.console.log("connections:", connections);
  return connections;
};

/**
 *
 * @param csv
 * @param keyIndex
 * @returns {{}}
 *
 */
exports.createRowMap = function (csv, keyIndex) {
  var map =
  {};
  var ri;

  for (ri = 0; ri < csv.data.length; ri++) {
    if (csv.data[ri].length == csv.header.length) {
      map[csv.data[ri][keyIndex]] = csv.data[ri];
    }
  }
  return map;
};

/**
 *
 * @param csv
 * @param columns
 * @returns {{}}
 */
exports.columnSlice = function (csv, columns) {
  var slice = {};
  slice.header = dex.array.slice(csv.header, columns);
  slice.data = dex.matrix.slice(csv.data, columns);

  return slice;
};

/**
 *
 * @param csv
 * @returns {Array}
 */
exports.getNumericColumnNames = function (csv) {
  var possibleNumeric =
  {};
  var i, j, ri, ci;
  var numericColumns = [];

  for (i = 0; i < csv.header.length; i++) {
    possibleNumeric[csv.header[i]] = true;
  }

  // Iterate thru the data, skip the header.
  for (ri = 0; ri < csv.data.length; ri++) {
    for (ci = 0; ci < csv.data[ri].length && ci < csv.header.length; ci++) {
      if (possibleNumeric[csv.header[ci]] && !dex.object.isNumeric(csv.data[ri][ci])) {
        possibleNumeric[csv.header[ci]] = false;
      }
    }
  }

  for (ci = 0; ci < csv.header.length; ci++) {
    if (possibleNumeric[csv.header[ci]]) {
      numericColumns.push(csv.header[ci]);
    }
  }

  return numericColumns;
};

/**
 *
 * @param csv
 * @returns {Array}
 */
exports.guessTypes = function (csv) {
  var i = 0;
  var testResults = [];
  csv.header.forEach(function (hdr) {
    testResults.push({})
  });
  var numCols = csv.header.length;

  csv.data.forEach(function (row) {
    for (i = 0; i < numCols; i++) {

      if (!testResults[i]["notDate"]) {
        var date = new Date(row[i]);
        if (isNaN(date.getTime())) {
          dex.console.log("not date" + i);
          testResults[i]["notDate"] = true;
        }
      }

      if (!testResults[i]["notNumber"]) {
        if (isNaN(row[i])) {
          testResults[i]["notNumber"] = true;
        }
      }
    }
  });

  var types = [];

  for (i = 0; i < numCols; i++) {
    var results = testResults[i];
    if (!results.notDate && results.notNumber) {
      types.push('date');
    }
    else if (!results.notNumber) {
      types.push('number');
    }
    else {
      types.push('string');
    }
  }

  return types;
}

/**
 *
 * @param csv
 * @returns {*}
 */
exports.strictTypes = function strictTypes(csv) {
  var types = dex.csv.guessTypes(csv);

  for (var i = 0; i < types.length; i++) {
    if (types[i] == 'date') {
      csv.data.forEach(function (row, ri) {
        dex.console.log("row[" + ri + "]=" + row[ri]);
        csv.data[ri][i] = new Date(csv.data[ri][i]);
      })
    }
    else {
      if (types[i] == 'number') {
        csv.data.forEach(function (row, ri) {
          dex.console.log("row[" + ri + "]=" + row[ri]);
          csv.data[ri][i] = new Double(csv.data[ri][i]);
        })
      }
    }
  }

  return csv;
};

/**
 *
 * This routine will return a frames structure based on a csv and
 * an index.  It will first identify all unique values within the
 * selected column, then sort them into an array of frame indexes.
 * From there, it will return an array of csv where the elements
 * contain the specified frame index at the cooresponding location.
 * This routine supports things such as time/value filtering for
 * things like a time or slicing dimension for various charts.
 * IE: No need to write a motion bubble chart, simply combine a
 * vcr-player with a regular bubble chart connected to play/rewind
 * events and motion will follow.
 *
 * @param csv
 * @param columnIndex
 * @returns {{frameIndices: Array.<T>, frames: Array}}
 */
exports.getFramesByIndex = function(csv, columnIndex) {
  var types = dex.csv.guessTypes(csv);
  //dex.console.log("TYPES", types);
  var frameIndices;

  if (types[columnIndex] == "number")
  {
    frameIndices = _.uniq(csv.data.map(function (row) {
      return row[columnIndex]
    })).sort(function(a, b){return a-b});
  }
  else if (types[columnIndex] == "date")
  {
    frameIndices = _.uniq(csv.data.map(function (row) {
      return row[columnIndex]
    })).sort(function(a, b){
      a = new Date(a);
      b = new Date(b);
      return a>b ? 1 : a<b ? -1 : 0;
    });
  }
  else {
    frameIndices = _.uniq(csv.data.map(function (row) {
      return row[columnIndex]
    })).sort();
  }
  //dex.console.log("FRAME-INDICES", frameIndices)
  var header = dex.array.copy(csv.header);
  var frameIndexName = header.splice(columnIndex, 1);
  var frames = [];

  for (var fi=0; fi<frameIndices.length; fi++)
  {
    var frame = { header : header };
    var frameData = [];

    for (var ri=0; ri<csv.data.length; ri++)
    {
      if (csv.data[ri][columnIndex] == frameIndices[fi])
      {
        var frameRow = dex.array.copy(csv.data[ri]);
        frameRow.splice(columnIndex, 1);
        frameData.push(frameRow);
      }
    }
    frame["data"] = frameData;
    frames.push(frame);
  }

  return {
    'frameIndices' : frameIndices,
    'frames' : frames
  }
};

/**
 *
 * @param csv
 * @returns {Array}
 */
exports.getNumericIndices = function (csv) {
  var possibleNumeric =
  {};
  var i, j;
  var numericIndices = [];

  for (i = 0; i < csv.header.length; i++) {
    possibleNumeric[csv.header[i]] = true;
  }

  // Iterate thru the data, skip the header.
  for (i = 1; i < csv.data.length; i++) {
    for (j = 0; j < csv.data[i].length && j < csv.header.length; j++) {
      if (possibleNumeric[csv.header[j]] && !dex.object.isNumeric(csv.data[i][j])) {
        console.log("csv.header[" + j + "]=" + csv.header[j] + " is not numeric due to csv.data[" + i + "]["
          + j + "]=" + csv.data[i][j]);
        possibleNumeric[csv.header[j]] = false;
      }
    }
  }

  for (i = 0; i < csv.header.length; i++) {
    if (possibleNumeric[csv.header[i]]) {
      numericIndices.push(i);
    }
  }

  return numericIndices;
};

exports.getCategoricalIndices = function (csv) {
  var possibleNumeric =
  {};
  var i, j;
  var categoricalIndices = [];

  for (i = 0; i < csv.header.length; i++) {
    possibleNumeric[csv.header[i]] = true;
  }

  // Iterate thru the data, skip the header.
  for (i = 1; i < csv.data.length; i++) {
    for (j = 0; j < csv.data[i].length && j < csv.header.length; j++) {
      if (possibleNumeric[csv.header[j]] && !dex.object.isNumeric(csv.data[i][j])) {
        console.log("csv.header[" + j + "]=" + csv.header[j] + " is not numeric due to csv.data[" + i + "]["
          + j + "]=" + csv.data[i][j]);
        possibleNumeric[csv.header[j]] = false;
      }
    }
  }

  for (i = 0; i < csv.header.length; i++) {
    if (!possibleNumeric[csv.header[i]]) {
      categoricalIndices.push(i);
    }
  }

  return categoricalIndices;
};

/**
 *
 * @param csv
 * @param columnNum
 * @returns {boolean}
 */
exports.isColumnNumeric = function (csv, columnNum) {
  var i;

  for (i = 0; i < csv.data.length; i++) {
    if (!dex.object.isNumeric(csv.data[i][columnNum])) {
      return false;
    }
  }
  return true;
};

/**
 *
 * @param csv
 * @param columns
 * @returns {*}
 */
exports.group = function (csv, columns) {
  var ri, ci;
  var groups = {};
  var returnGroups = [];
  var values;
  var key;
  var otherColumns;
  var otherHeaders;
  var groupName;

  if (arguments < 2) {
    return csv;
  }

  function compare(a, b) {
    var si, h;

    for (si = 0; si < columns.length; si++) {
      h = csv.header[columns[si]]
      if (a[h] < b[h]) {
        return -1;
      }
      else if (a[h] > b[h]) {
        return 1
      }
    }

    return 0;
  }

  //otherColumns = dex.array.difference(dex.range(0, csv.header.length), columns);
  //otherHeaders = dex.array.slice(csv.header, otherColumns);

  for (ri = 0; ri < csv.data.length; ri += 1) {
    values = dex.array.slice(csv.data[ri], columns);
    key = values.join(':::');

    if (groups[key]) {
      group = groups[key];
    }
    else {
      //group = { 'csv' : dex.csv.csv(otherHeaders, []) };
      group =
      {
        'key': key,
        'values': [],
        'csv': dex.csv.csv(csv.header, [])
      };
      for (ci = 0; ci < values.length; ci++) {
        group.values.push({'name': csv.header[columns[ci]], 'value': values[ci]});
      }
      groups[key] = group;
    }
    //group.csv.data.push(dex.array.slice(csv.data[ri], otherColumns));
    group.csv.data.push(csv.data[ri]);
    //groups[key] = group;
  }

  for (groupName in groups) {
    if (groups.hasOwnProperty(groupName)) {
      returnGroups.push(groups[groupName]);
    }
  }

  return returnGroups.sort(compare);
};

/**
 *
 * @param csv
 * @param func
 */
exports.visitCells = function (csv, func) {
  var ci, ri;

  for (ri = 0; ri < csv.data.length; ri++) {
    for (ci = 0; ci < csv.header.length; ci++) {
      func(ci, ri, csv.data[ri][ci]);
    }
  }
};

/**
 *
 * @param csv
 * @returns {number}
 */
exports.longestWord = function (csv) {
  var longest = 0;
  for (var row = 0; row < csv.data.length; row++) {
    for (var col = 0; col < csv.data[row].length; col++) {
      if (longest < csv.data[row][col].length) {
        longest = csv.data[row][col].length;
      }
    }
  }
  return longest;
};

/**
 *
 * @param csv
 * @returns {{}|*}
 */
exports.numericSubset = function (csv) {
  return dex.csv.columnSlice(csv, dex.csv.getNumericIndices(csv));
};

exports.categoricalSubset = function (csv) {
  return dex.csv.columnSlice(csv, dex.csv.getCategoricalIndices(csv));
};

/*
 var data =

 */
exports.toJsonHierarchy = function (csv, ci) {
  // If 1 argument, then setup and call with 2.
  if (arguments.length == 1) {
    var result = {'name': 'root', children: dex.csv.toJsonHierarchy(csv, 0)};
    dex.console.log("RESULT", result);
    return result;
  }
  else if (arguments.length == 2) {
    var valueMap = {};

    for (var ri = 0; ri < csv.data.length; ri++) {
      if (valueMap.hasOwnProperty(csv.data[ri][ci])) {
        valueMap[csv.data[ri][ci]]++;
      }
      else {
        valueMap[csv.data[ri][ci]] = 1;
      }
    }

    if (ci >= csv.header.length - 1) {
      return _.keys(valueMap).map(function (key) {
        return {'name': key, 'size': valueMap[key]};
      });
    }
    else {
      return _.keys(valueMap).map(function (key) {
        return {'name': key, 'size': valueMap[key]};
      });
    }
  }
};

exports.getGraph = function (csv) {

  var nodes = [];
  var links = [];
  var nodeNum = 0;
  var indexMap = [];

  // Record uniques across the data, treating each column as it's own namespace.
  csv.header.map(function (col, ci) {
    indexMap.push({});
    csv.data.map(function (row, ri) {
      if (_.isUndefined(indexMap[ci][row[ci]]))
      {
        indexMap[ci][row[ci]]= nodeNum;
        nodes.push({'name' : row[ci]});
        nodeNum++;
      }
    });
  });

  for (var ci=1; ci<csv.header.length; ci++)
  {
    csv.data.map(function (row, ri) {
      links.push({ 'source' : indexMap[ci-1][row[ci-1]], 'target' : indexMap[ci][row[ci]], 'value' : 1});
    });
  }

  //dex.console.log("NODES", nodes, links, indexMap);
  return { 'nodes' : nodes, 'links' : links };
};

exports.toNestedJson = function (csv) {
  dex.console.log("CMAP", dex.csv.getConnectionMap(csv));
  var result = {'name': csv.header[0], 'children': dex.csv.toNestedJsonChildren(dex.csv.getConnectionMap(csv))};
  dex.console.log("RESULT", result);
  return result;
};

exports.toNestedJsonChildren = function (cmap) {
  //dex.console.log("CMAP", cmap);
  var children = [];

  _.keys(cmap).map(function (key) {
    var childMap = cmap[key];
    if (_.keys(childMap).length <= 0) {
      children.push({'name': key, 'size': 1000});
    }
    else {
      if (_.keys(childMap).length == 1) {
        //var grandChildMap = childMap[_.keys(childMap)[0]];

        //dex.console.log("GCMAP", grandChildMap);
        //if (_.keys(grandChildMap).length <= 0) {
        //  children.push({'name': key, 'size': 100});
        //}
        //else {
        children.push({'name': key, 'children': dex.csv.toNestedJsonChildren(cmap[key])});
        //}
      }
      else {
        children.push({'name': key, 'children': dex.csv.toNestedJsonChildren(cmap[key])});
      }
    }
  })
  return children;
};

exports.getConnectionMap = function (csv) {
  var rootMap = {};
  var curMap = {}

  for (var row = 0; row < csv.data.length; row++) {
    curMap = rootMap;

    for (var col = 0; col < csv.header.length; col++) {
      if (!_.has(curMap, csv.data[row][col])) {
        curMap[csv.data[row][col]] = {};
      }
      curMap = curMap[csv.data[row][col]];
    }
  }

  return rootMap;
};
},{}],9:[function(require,module,exports){
/**
 *
 * This module provides support for creating various datasets.
 *
 * @module datagen
 *
 */

/**
 * Creates a matrix of random integers within the specified range.
 *
 * @param spec The matrix specification.  Ex: \{rows:10, columns: 4, min: 0, max:100\}
 *
 * @returns {Array} An array containing spec.rows number of rows.  Each row consisting of
 * an array containing spec.columns elements.  Each element is a randomly generated integer
 * within the range [spec.min, spec.max]
 *
 */
exports.randomMatrix = function (spec) {
  var ri, ci;

  //{rows:10, columns: 4, min, 0, max:100})
  var matrix = [];
  var range = spec.max - spec.min;
  for (ri = 0; ri < spec.rows; ri++) {
    var row = [];

    for (ci = 0; ci < spec.columns; ci++) {
      row.push(Math.random() * range + spec.min);
    }
    matrix.push(row);
  }
  return matrix;
};

exports.randomIndexedMatrix = function (spec) {
  var ri, ci;

  //{rows:10, columns: 4, min, 0, max:100})
  var matrix = [];
  var range = spec.max - spec.min;
  for (ri = 0; ri < spec.rows; ri++) {
    var row = [];

    row.push(ri+1);
    for (ci = 0; ci < spec.columns - 1; ci++) {
      row.push(Math.random() * range + spec.min);
    }
    matrix.push(row);
  }
  return matrix;
};

exports.randomIntegerMatrix = function (spec) {
  var ri, ci;

  //{rows:10, columns: 4, min, 0, max:100})
  var matrix = [];
  var range = spec.max - spec.min;
  for (ri = 0; ri < spec.rows; ri++) {
    var row = [];

    for (ci = 0; ci < spec.columns; ci++) {
      row.push(Math.round(Math.random() * range + spec.min));
    }
    matrix.push(row);
  }
  return matrix;
};

/**
 * Creates a matrix of random integers within the specified range.
 *
 * @param spec The matrix specification.  Ex: \{rows:10, columns:4 \}
 *
 * @returns {Array} An array containing spec.rows number of rows.  Each row consisting of
 * an array containing spec.columns elements.  Each element is a randomly generated integer
 * within the range [spec.min, spec.max]
 *
 */
exports.identityCsv = function (spec) {
  var ri, ci;
  var csv = {};
  csv.header = dex.datagen.identityHeader(spec);
  csv.data = dex.datagen.identityMatrix(spec);
  return csv;
};

/**
 * This method will return an identity function meeting the supplied
 * specification.
 *
 * @param {object} spec - The identityMatrix specification.
 * @param {number} spec.rows - The number of rows to generate.
 * @param {number} spec.columns - The number of columns to generate.
 * @example {@lang javascript}
 * // Returns: [['R1C1', 'R1C2' ], ['R2C1', 'R2C2'], ['R3C1', 'R3C2']]
 * identityMatrix({rows: 3, columns: 2});
 * @returns {matrix}
 *
 */
exports.identityMatrix = function (spec) {
  var ri, ci;

  // { rows:10, columns:4 })
  var matrix = [];
  for (ri = 0; ri < spec.rows; ri++) {
    var row = [];

    for (ci = 0; ci < spec.columns; ci++) {
      row.push("R" + (ri + 1) + "C" + (ci + 1));
    }
    matrix.push(row);
  }
  return matrix;
};

/**
 * Returns an identity header array.
 *
 * @param spec - The specification for the header array.
 * @param spec.columns - The number of columns to generate.
 * @example
 * // Returns: [ 'C1', 'C2', 'C3' ]
 * identityHeader({ columns: 3 });
 * @returns {Array} Returns an array of the specified columns.
 *
 */
exports.identityHeader = function (spec) {
  return dex.range(1, spec.columns).map(function (i) {
    return "C" + i;
  });
};

},{}],10:[function(require,module,exports){
/**
 *
 * This module provides routines dealing with json data.
 *
 * @module json
 *
 */

/**
 * Converts JSON and a header to a CSV file.  It is used for parallel coordinate brush
 * events where the selected brush must be published to events as a csv.
 *
 * For example, given:
 *
 * json   = [ { A: 1, B: 3, C: 5, D: 7 },
 *            { A: 2, B: 4, C: 6, D: 8 } ];
 * header = [ 'A', 'B', 'C', 'D' ];
 *
 * This will return a csv where:
 *
 * csv = { header: [ 'A', 'B', 'C', 'D' ],
 *         data    [[ 1, 4, 5, 7 ], [ 2, 4, 6, 8 ]];
 *
 * @param json
 * @param header
 * @returns {*}
 */
exports.toCsv = function (json, header) {
  var csv;
  var ri, ci;
  var data = [];

  // Keys are provided.
  if (arguments.length == 2) {
    if (Array.isArray(json)) {
      for (ri = 0; ri < json.length; ri++) {
        var row = [];
        for (ci = 0; ci < header.length; ci++) {
          row.push(json[ri][header[ci]]);
        }
        data.push(row);
      }
    }
    else {
      var row = [];
      for (ci = 0; ci < header.length; ci++) {
        row.push(json[ri][header[ci]]);
      }
      data.push(row);
    }
    return dex.csv.csv(header, data);
  }
  else {
    return dex.json.toCsv(json, dex.json.keys(json));
  }
};

/**
 * Returns all keys found in a json structure or array of json structures.
 *
 * @param json  The json structure or array of json structures.
 * @returns {Array} A list of keys found within json.
 *
 */
exports.keys = function (json) {
  var keyMap = {};
  var keys = [];
  var ri, key;

  if (Array.isArray(json)) {
    for (ri = 0; ri < json.length; ri++) {
      for (key in json[ri]) {
        keyMap[key] = true;
      }
    }
  }
  else {
    for (key in json) {
      keyMap[key] = true;
    }
  }

  for (key in keyMap) {
    keys.push(key);
  }

  return keys;
};

},{}],11:[function(require,module,exports){
/**
 *
 * This module provides routines dealing with matrices.
 *
 * @module matrix
 *
 */

/**
 *
 * Return the specified slice of the matrix.  The original matrix is
 * not altered.
 *
 * @param {matrix} matrix The matrix to be sliced.
 * @param {Array.<number>} columns - An array of column indices to include within the slice.
 * @param {number} [rows] If supplied, the slice will consist only of the specified
 * number of rows.
 *
 * @returns {matrix}
 */
exports.slice = function (matrix, columns, rows) {
  var matrixSlice = new Array(0);
  //dex.console.log("PRE-SLICE (matrixSlize):" + matrixSlice);
  var ri;

  if (arguments.length === 3) {
    for (ri = 0; ri < rows.length; ri++) {
      matrixSlice.push(dex.array.slice(matrix[rows[ri]]));
    }
  }
  else {
    for (ri = 0; ri < matrix.length; ri++) {
      //dex.console.log("MATRIX-SLICE-BEFORE[" + ri + "]:" + matrixSlice);
      matrixSlice.push(dex.array.slice(matrix[ri], columns));
      //dex.console.log("MATRIX-SLICE-AFTER[" + ri + "]" + matrixSlice);
    }
  }
  return matrixSlice;
};

/**
 *
 * Returns a matrix consisting of unique values relative to each
 * column.
 *
 * @param {matrix} matrix The matrix to evaluate.
 *
 * @returns {Array.<Array.<Object>>} The unique values relative to each column. In the form
 * of [[ column 1 unique values], [column 2 unique values], ...]]
 *
 */
exports.uniques = function (matrix) {
  var ci;
  var uniques = [];
  var tmatrix = dex.matrix.transpose(matrix);
  var ncol = tmatrix.length;

  for (ci = 0; ci < ncol; ci += 1) {
    uniques.push(_.uniq(tmatrix[ci]));
  }
  return uniques;
};

/**
 *
 * Returns a transposed matrix where the rows of the new matrix are transposed
 * with it's columns.
 *
 * @param {matrix} matrix - The matrix to transpose.
 *
 * @returns {matrix} The transposed matrix, leaving the original matrix untouched.
 *
 * @example {@lang javascript}
 * // Returns [['R1C1', 'R2C1', 'R3C1'], ['R1C2', 'R2C2', 'R3C2' ]]
 * transpose([['R1C1', 'R1C2'], ['R2C1', 'R2C2], ['R3C1', 'R3C2']]);
 *
 */
exports.transpose = function (matrix) {
  var ci;
  var ncols;
  var transposedMatrix = [];
  //dex.console.log("Transposing:", matrix);

  if (!matrix || matrix.length <= 0 || !matrix[0] || matrix[0].length <= 0) {
    return [];
  }

  ncols = matrix[0].length;

  for (ci = 0; ci < ncols; ci++) {
    transposedMatrix.push(matrix.map(function (row) {
      return row[ci];
    }));
  }

  return transposedMatrix;
};

/**
 *
 * Return a slice of this matrix based upon the supplied columns.
 * The original matrix will be left untouched.
 *
 * @param {matrix} matrix - The matrix to slice.
 * @param {Array.<number>} columns - An array of column indexes to be included in the slice.
 *
 * @returns {*}
 *
 */
/*
 exports.columnSlice = function (matrix, columns) {
 // TODO: Determine, is this destructive?
 var slice = [];
 var ri;
 var transposeMatrix;

 if (arguments.length != 2) {
 return matrix;
 }

 transposeMatrix = dex.matrix.transpose(matrix);
 //dex.console.log("transposing", matrix, "transpose", transposedMatrix);

 // Specific columns targetted:
 if (Array.isArray(columns)) {
 for (ri = 0; ri < columns.length; ri += 1) {
 slice.push(transposeMatrix[columns[ri]]);
 }
 }
 // Single column.
 else {
 slice.push(transposeMatrix[columns]);
 }

 // Back to row/column format.
 return dex.matrix.transpose(slice);
 };
 */

/**
 *
 * Return a flattened version of the matrix.
 *
 * @param {matrix} matrix - The matrix to flatten.
 *
 * @returns {Array.<Object>} A flattened version of the matrix.
 *
 * @example {@lang javascript}
 * // Define a simple matrix.
 * var matrix = [['r1c1', 'r1c2'], ['r2c1', 'r2c2']]
 *
 * // Returns: ['r1c1', 'r1c2', 'r2c1', 'r2c2']
 * flatten(matrix);
 *
 */
exports.flatten = function (matrix) {
  return _.flatten(matrix);
};

/**
 *
 * Returns an array of the minimum and maximum value in the form of: [min,max]
 * from the specified subset of the matrix.
 *
 * @param {matrix} matrix - The matrix to scan.
 * @param {Array.<number>|number] [indices] - When supplied, will contrain the extent
 * search to just those columns specified by this list of indices.
 *
 * @returns {Array.<number>} An array of two elements: [ min, max ]
 *
 */
exports.extent = function (matrix, indices) {
  var values = matrix;
  if (arguments.length === 2) {
    values = dex.matrix.flatten(dex.matrix.slice(matrix, indices));
    var max = Math.max.apply(null, values);
    var min = Math.min.apply(null, values);
    return [min, max];
  }
};

/**
 *
 * Combine each column in matrix1 with each column in matrix2.
 *
 * @param {matrix} matrix1 The first matrix to combine.
 * @param {matrix} matrix2 The second matrix to combine.
 *
 * @returns {matrix} The combined matrix.
 *
 * @example {@lang javascript}
 * var matrix1 = [['m1r1c1', 'm1r1c2'], ['m1r2c1', 'm1r2c2']]
 * var matrix2 = [['m2r1c1', 'm2r1c2'], ['m2r2c1', 'm2r2c2']]
 *
 * // Returns: [['m1r1c1', 'm1r1c2', 'm2r1c1', 'm2r1c2'], ['m1r2c1', 'm1r2c2', 'm2r2c1', 'm2r2c2']]
 * var result = combine(matrix1, matrix2);
 *
 */
exports.combine = function (matrix1, matrix2) {
  var result = _.clone(matrix1);

  var ri;

  for (ri = 0; ri < matrix2.length; ri++) {
    result[ri] = result[ri].concat(matrix2[ri]);
  }

  return result;
};

/**
 *
 * Return a copy of the supplied matrix.
 *
 * @param {matrix} matrix The matrix to copy.
 *
 * @returns {Array} A copy of the original matrix.
 *
 */
exports.copy = function (matrix) {
  return matrix.map(function (row) {
    return _.clone(row);
  });
};

/**
 *
 * Insert a new column at position 0 within this matrix which will contain
 * integer values starting at 1, 2, 3, ...  This is useful if your dataset
 * lacks an existing unique index.
 *
 * @param {matrix} matrix - The matrix to index.
 * @returns {matrix} A copy of the original matrix with the index inserted.
 *
 */
exports.addIndex = function (matrix) {
  var indexMatrix = dex.matrix.copy(matrix);

  for (var ri = 0; ri < matrix.length; ri++) {
    indexMatrix[ri].unshift(ri + 1);
  }

  return indexMatrix;
};

/**
 *
 * Determine whether the supplied columnNum within the supplied matrix is
 * numeric or not.
 *
 * @param {matrix} matrix - The matrix to evaluate.
 * @param {number} columnNum - The column within the matrix to evaluate.
 *
 * @returns {boolean} True if the column is numeric, false otherwise.
 *
 */
exports.isColumnNumeric = function (matrix, columnNum) {
  for (var i = 0; i < matrix.length; i++) {
    if (!_.isNumber(matrix[i][columnNum])) {
      return false;
    }
  }
  return true;
};

/**
 *
 * Return the maximum value of the specified columnNum within the
 * supplied matrix.
 *
 * @param matrix The matrix to evaluate.
 * @param columnNum The column number within the matrix to evaluate.
 * @returns {*} The maximum value of the specified column within the
 * supplied matrix.
 *
 */
exports.max = function (matrix, columnNum) {
  var maxValue = matrix[0][columnNum];
  var i;

  if (dex.matrix.isColumnNumeric(matrix, columnNum)) {
    maxValue = parseFloat(matrix[0][columnNum]);
    for (i = 1; i < matrix.length; i++) {
      if (maxValue < parseFloat(matrix[i][columnNum])) {
        maxValue = parseFloat(matrix[i][columnNum]);
      }
    }
  }
  else {
    for (i = 1; i < matrix.length; i++) {
      if (maxValue < matrix[i][columnNum]) {
        maxValue = matrix[i][columnNum];
      }
    }
  }

  return maxValue;
};

/**
 *
 * Return the minimum value of the specified columnNum within the
 * supplied matrix.
 *
 * @param {matrix} matrix - The matrix to evaluate.
 * @param {number} columnNum - The column number within the matrix to evaluate.
 * @returns {number} The minimum value of the specified column within the
 * supplied matrix.
 *
 */
exports.min = function (matrix, columnNum) {
  var minValue = matrix[0][columnNum];
  var i;

  if (dex.matrix.isColumnNumeric(matrix, columnNum)) {
    minValue = parseFloat(matrix[0][columnNum]);
    for (i = 1; i < matrix.length; i++) {
      if (minValue > parseFloat(matrix[i][columnNum])) {
        minValue = parseFloat(matrix[i][columnNum]);
      }
    }
  }
  else {
    for (i = 1; i < matrix.length; i++) {
      if (minValue > matrix[i][columnNum]) {
        minValue = matrix[i][columnNum];
      }
    }
  }

  return minValue;
};

},{}],12:[function(require,module,exports){
/**
 *
 * This module provides routines dealing with javascript objects.
 *
 * @module object
 *
 */

/**
 *
 * Return the lccal keys of this object without the inherited ones.
 *
 * @param obj The object whose local keys we are interested in.
 *
 * @returns {Array} An array of 0 or more lccal keys.
 */
exports.keys = function keys(obj) {
  var keys = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  return keys;
};

/**
 *
 * A pretty good, but imperfect mechanism for performing a deep
 * clone of an object.
 *
 * @param obj The object to clone.
 * @returns {*} The cloned object.
 *
 */
exports.clone = function clone(obj) {
  var i, attr, len;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj)
    return obj;

  // Handle Date
  if (obj instanceof Date) {
    var copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    var copy = [];
    for (i = 0, len = obj.length; i < len; i++) {
      copy[i] = dex.object.clone(obj[i]);
    }
    return copy;
  }

  // DOM Nodes are nothing but trouble.
  if (dex.object.isElement(obj) ||
    dex.object.isNode(obj)) {
    return obj;
  }

  // Handle Object
  if (obj instanceof Object) {
    var copy = {};
    //jQuery.extend(copy, obj);
    for (attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = dex.object.clone(obj[attr]);
        //copy[attr] = obj[attr];
      }
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};

/*
  This version causes expand to continue forever.

exports.isEmpty = function isEmpty(obj) {
  return _.isEmpty(obj);
};
*/

/**
 *
 * Kind of misleading.  This really signals when expand should quit
 * expanding.  I need to clean this up.
 *
 * @param obj
 * @returns {boolean}
 */
exports.isEmpty = function isEmpty(obj) {
  //dex.console.log("isEmpty(" + obj + ") typeof=" + (typeof obj));
  if (!obj || obj instanceof Array) {
    return true;
  }
  if ("object" == typeof obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        //dex.console.log("OBJ: ", obj, " contains key '" + key + "'");
        return false;
      }
    }
  }

  return true;
}

/**
 *
 * Overlay the top object on top of the bottom.  This method will first clone
 * the bottom object.  Then it will drop the values within the top object
 * into the clone.
 *
 * @param {Object} top - The object who's properties will be on top.
 * @param {Object} bottom - The object who's properties will be on bottom.
 * @return {Object} The overlaid object where the properties in top override
 *                  properties in bottom.  The return object is a clone or
 *                  copy.
 *
 */
exports.overlay = function overlay(top, bottom) {
  // Make a clone of the bottom object.
  var overlay = dex.object.clone(bottom);
  var prop;

  // If we have parameters in the top object, overlay them on top
  // of the bottom object.
  if (top !== 'undefined') {
    // Iterate over the props in top.
    for (prop in top) {
      // Arrays are special cases. [A] on top of [A,B] should give [A], not [A,B]
      if (typeof top[prop] == 'object' && overlay[prop] != null && !(top[prop] instanceof Array)) {
        //console.log("PROP: " + prop + ", top=" + top + ", overlay=" + overlay);
        overlay[prop] = dex.object.overlay(top[prop], overlay[prop]);
      }
      // Simply overwrite for simple cases and arrays.
      else {
        overlay[prop] = top[prop];
      }
    }
  }

  //console.dir(config);
  return overlay;
};

/**
 *
 * This method returns whether or not the supplied object is a Node.
 *
 * @param {Object} obj - The object to test.
 *
 * @returns {boolean} True if obj is a Node, false otherwise.
 *
 */
exports.isNode = function isNode(obj) {
  return (
    typeof Node === "object" ? obj instanceof Node :
    obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName === "string"
  );
};

/**
 *
 * This method returns whether or not the supplied object is a
 * DOM node.
 *
 * @param {Object} obj - The object to test.
 *
 * @returns {boolean} - True if obj is a DOM node, false otherwise.
 *
 */
exports.isElement = function isElement(obj) {
  return (
    typeof HTMLElement === "object" ? obj instanceof HTMLElement : //DOM2
    obj && typeof obj === "object" && obj.nodeType === 1 && typeof obj.nodeName === "string"
  );
};

/**
 *
 * This method returns a boolean representing whether obj is contained
 * within container.
 *
 * @param {Object} container - The container to test.
 * @param {Object} obj - The object to test.
 *
 * @return True if container contains obj.  False otherwise.
 */
exports.contains = function contains(container, obj) {
  var i = container.length;
  while (i--) {
    if (container[i] === obj) {
      return true;
    }
  }
  return false;
};

/**
 *
 * Return whether or not the supplied object is a function.
 *
 * @param obj The object to check.
 * @returns {boolean} True if obj is a function, false otherwise.
 *
 */
exports.isFunction = function isFunction(obj) {
  //return typeof obj === 'function';
  return _.isFunction(obj);
};

/**
 *
 * Visit each local property within.
 *
 * @param obj
 * @param func
 */
/*
exports.visit = function (obj, func) {
  var prop;
  func(obj);
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] === 'object') {
        dex.object.visit(obj[prop], func);
      }
    }
  }
};
*/

/**
 *
 * @param map
 * @param values
 * @returns {exports}
 */
exports.connect = function connect(map, values) {
  dex.console.log("map:", map, "values:", values);

  if (!values || values.length <= 0) {
    return this;
  }
  if (!map[values[0]]) {
    map[values[0]] = {};
  }
  dex.object.connect(map[values[0]], values.slice(1));

  return this;
};

/**
 *
 * @param obj
 * @returns {boolean}
 */
exports.isNumeric = function (obj) {
  return !isNaN(parseFloat(obj)) && isFinite(obj);
};

/**
 *
 * @param hierarchy
 * @param name
 * @param value
 * @param delimiter
 * @returns {*}
 */
exports.setHierarchical = function (hierarchy, name, value, delimiter) {
  if (hierarchy == null) {
    hierarchy = {};
  }

  if (typeof hierarchy != 'object') {
    return hierarchy;
  }

  // Create an array of names by splitting delimiter, then call
  // this function in the 3 argument (Array of paths) context.
  if (arguments.length == 4) {
    return dex.object.setHierarchical(hierarchy,
      name.split(delimiter), value);
  }

  // Array of paths context.
  else {
    // This is the last variable name, just set the value.
    if (name.length === 1) {
      hierarchy[name[0]] = value;
    }
    // We still have to traverse.
    else {
      // Undefined container object, just create an empty.
      if (!(name[0] in hierarchy)) {
        hierarchy[name[0]] = {};
      }

      // Recursively traverse down the hierarchy.
      dex.object.setHierarchical(hierarchy[name[0]], name.splice(1), value);
    }
  }

  return hierarchy;
};

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZGV4LmpzIiwibGliL3B1YnN1Yi5qcyIsInNyYy9hcnJheS9hcnJheS5qcyIsInNyYy9jb2xvci9jb2xvci5qcyIsInNyYy9jb21wb25lbnQvY29tcG9uZW50LmpzIiwic3JjL2NvbmZpZy9jb25maWcuanMiLCJzcmMvY29uc29sZS9jb25zb2xlLmpzIiwic3JjL2Nzdi9jc3YuanMiLCJzcmMvZGF0YWdlbi9kYXRhZ2VuLmpzIiwic3JjL2pzb24vanNvbi5qcyIsInNyYy9tYXRyaXgvbWF0cml4LmpzIiwic3JjL29iamVjdC9vYmplY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN2dCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzV2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKlxyXG4gKiBUaGUgbWFpbiBkZXhqcyBtb2R1bGUuXHJcbiAqXHJcbiAqIEBtb2R1bGUgZGV4XHJcbiAqIEByZXF1aXJlcyBkM1xyXG4gKiBAcmVxdWlyZXMganF1ZXJ5XHJcbiAqIEByZXF1aXJlcyBqcXVlcnktdWlcclxuICogQHJlcXVpcmVzIHVuZGVyc2NvcmVcclxuICpcclxuICovXHJcbnZhciBkZXggPSB7fTtcclxuXHJcbi8vcmVxdWlyZShcImQzXCIpO1xyXG4vLyQgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xyXG4vL3JlcXVpcmUoXCJqcXVlcnktdWlcIik7XHJcbi8vXyA9IHJlcXVpcmUoXCJ1bmRlcnNjb3JlXCIpO1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFRoZSB2ZXJzaW9uIG9mIGRleGpzLlxyXG4gKlxyXG4gKiBAbmFtZSB2ZXJzaW9uXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqXHJcbiAqL1xyXG5kZXgudmVyc2lvbiA9IFwiMC43XCI7XHJcblxyXG4vKipcclxuICogVGhpcyByb3V0aW5lIHdpbGwgcmV0dXJuIGFuIGFycmF5IFsgc3RhcnQsIC4uLiwgc3RhcnQgKyBsZW4gXSB1c2luZyBhbiBpbmNyZW1lbnQgb2YgMS5cclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IC0gVGhlIHN0YXJ0aW5nIGluZGV4LlxyXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIC0gVGhlIG51bWJlciBvZiBpbnRlZ2VycyB0byBnZW5lcmF0ZS5cclxuICogQGV4YW1wbGUge0BsYW5nIGphdmFzY3JpcHR9XHJcbiAqIC8vIHJldHVybnMgWyAwLCAxLCAyIF1cclxuICogcmFuZ2UoMCwgMylcclxuICpcclxuICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSBjb25zaXN0aW5nIG9mIGVsZW1lbnRzIFsgc3RhcnQsIC4uLiwgc3RhcnQgKyBsZW4gXS5cclxuICpcclxuICovXHJcbmRleC5yYW5nZSA9IGZ1bmN0aW9uIChzdGFydCwgbGVuKSB7XHJcbiAgcmV0dXJuIF8ucmFuZ2Uoc3RhcnQsIHN0YXJ0ICsgbGVuKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBUaGlzIHJvdXRpbmUgaXMgc2ltcGx5IGEgY29udmVuaWVuY2UgZnVuY3Rpb24gYXMgaXRcclxuICogc2ltcGx5IHdyYXBzIHVuZGVyc2NvcmUncyBpbXBsZW1lbnRhdGlvbiBvZiBhIHNoYWxsb3dcclxuICogY29weS4gIFRoaXMgbWV0aG9kIHdpbGwgY3JlYXRlIGEgc2hhbGxvdy1jb3BpZWQgY2xvbmVcclxuICogb2YgdGhlIHByb3ZpZGVkIHBsYWluIG9iamVjdC4gQW55IG5lc3RlZCBvYmplY3RzIG9yXHJcbiAqIGFycmF5cyB3aWxsIGJlIGNvcGllZCBieSByZWZlcmVuY2UsIG5vdCBkdXBsaWNhdGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZGV4LmNvcHkgPSBmdW5jdGlvbihvYmopIHtcclxuICByZXR1cm4gXy5jb3B5KG9iaik7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQSBtb2R1bGUgZm9yIGRlYWxpbmcgd2l0aCBhcnJheXMuXHJcbiAqXHJcbiAqIEBuYW1lIGFycmF5XHJcbiAqIEB0eXBlIHttb2R1bGU6YXJyYXl9XHJcbiAqXHJcbiAqL1xyXG5kZXguYXJyYXkgPSByZXF1aXJlKCcuL2FycmF5L2FycmF5Jyk7XHJcblxyXG4vKipcclxuICpcclxuICogQSBtb2R1bGUgZm9yIGNvbmZpZ3VyaW5nIHRoaW5ncy5cclxuICpcclxuICogQG5hbWUgY29uZmlnXHJcbiAqIEB0eXBlIHttb2R1bGU6Y29uZmlnfVxyXG4gKlxyXG4gKi9cclxuZGV4LmNvbmZpZyA9IHJlcXVpcmUoXCIuL2NvbmZpZy9jb25maWdcIik7XHJcblxyXG4vKipcclxuICpcclxuICogVGhlIHB1Yi9zdWIgYnVzIHVzZWQgYnkgZGV4IGluIG9yZGVyIHRvIHB1Ymxpc2ggYW5kIHN1YnNjcmliZSB0byBldmVudHMuXHJcbiAqXHJcbiAqIEBuYW1lIGJ1c1xyXG4gKiBAdHlwZSB7UHViU3VifVxyXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mZWRlcmljby1sb3gvcHVic3ViLmpzXHJcbiAqXHJcbiAqL1xyXG5kZXguYnVzID0gcmVxdWlyZShcIi4uL2xpYi9wdWJzdWJcIik7XHJcblxyXG4vKipcclxuICpcclxuICogQSBtb2R1bGUgZm9yIGxvZ2dpbmcgdG8gdGhlIGNvbnNvbGUuXHJcbiAqXHJcbiAqIEBuYW1lIGNvbnNvbGVcclxuICogQHR5cGUge21vZHVsZTpjb25zb2xlfVxyXG4gKlxyXG4gKi9cclxuZGV4LmNvbnNvbGUgPSByZXF1aXJlKFwiLi9jb25zb2xlL2NvbnNvbGVcIik7XHJcblxyXG4vKipcclxuICogQSBtb2R1bGUgZm9yIGRlYWxpbmcgd2l0aCBjb2xvcnMuXHJcbiAqXHJcbiAqIEBuYW1lIGNvbG9yXHJcbiAqIEB0eXBlIHttb2R1bGU6Y29sb3J9XHJcbiAqXHJcbiAqL1xyXG5kZXguY29sb3IgPSByZXF1aXJlKFwiLi9jb2xvci9jb2xvclwiKTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBBIGNoYXJ0aW5nIG1vZHVsZS5cclxuICpcclxuICogQG5hbWUgY2hhcnRzXHJcbiAqIEB0eXBlIHttb2R1bGU6Y2hhcnRzfVxyXG4gKlxyXG4gKi9cclxuZGV4LmNoYXJ0cyA9IHsnZDMnIDogeydtYXAnIDoge319LFxyXG4gICdjMycgICA6IHt9LFxyXG4gICdkeWdyYXBocycgOiB7fSxcclxuICAnZDNwbHVzJyAgIDoge30sXHJcbiAgJ2dvb2dsZScgOiB7fSxcclxuICAnaGFuZGxlYmFycycgOiB7fSxcclxuICAndGhyZWVqcycgOiB7fX07XHJcblxyXG4vKipcclxuICpcclxuICogQSBjaGFydGluZyBtb2R1bGUuXHJcbiAqXHJcbiAqIEBuYW1lIGNoYXJ0c1xyXG4gKiBAdHlwZSB7bW9kdWxlOmNoYXJ0c31cclxuICpcclxuICovXHJcbmRleC51aSA9IHsnanF1ZXJ5dWknIDoge319O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEEgbW9kdWxlIGZvciBoYW5kbGluZyBDU1YgZGF0YSBzdHJ1Y3R1cmVzLlxyXG4gKlxyXG4gKiBAbmFtZSBjc3ZcclxuICogQHR5cGUge21vZHVsZTpjc3Z9XHJcbiAqXHJcbiAqL1xyXG5kZXguY3N2ID0gcmVxdWlyZShcIi4vY3N2L2NzdlwiKTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBBIG1vZHVsZSBwcm92aWRpbmcgdXRpbGl0aWVzIGZvciBkYXRhIGdlbmVyYXRpb24uXHJcbiAqXHJcbiAqIEBuYW1lIGRhdGFnZW5cclxuICogQHR5cGUge21vZHVsZTpkYXRhZ2VufVxyXG4gKlxyXG4gKi9cclxuZGV4LmRhdGFnZW4gPSByZXF1aXJlKFwiLi9kYXRhZ2VuL2RhdGFnZW5cIik7XHJcblxyXG4vKipcclxuICpcclxuICogQSBtb2R1bGUgZm9yIGRlYWxpbmcgd2l0aCBKU09OIGRhdGEuXHJcbiAqXHJcbiAqIEBuYW1lIGpzb25cclxuICogQHR5cGUge21vZHVsZTpqc29ufVxyXG4gKlxyXG4gKi9cclxuZGV4Lmpzb24gPSByZXF1aXJlKFwiLi9qc29uL2pzb25cIik7XHJcblxyXG4vKipcclxuICogQSBtb2R1bGUgZm9yIGRlYWxpbmcgd2l0aCBtYXRyaWNlcy5cclxuICpcclxuICogQG5hbWUgbWF0cml4XHJcbiAqIEB0eXBlIHttb2R1bGU6bWF0cml4fVxyXG4gKlxyXG4gKi9cclxuZGV4Lm1hdHJpeCA9IHJlcXVpcmUoXCIuL21hdHJpeC9tYXRyaXhcIik7XHJcblxyXG4vKipcclxuICogQSBtb2R1bGUgZm9yIGRlYWxpbmcgd2l0aCBqYXZhc2NyaXB0IG9iamVjdHMuXHJcbiAqXHJcbiAqIEBuYW1lIG9iamVjdFxyXG4gKiBAdHlwZSB7bW9kdWxlOm9iamVjdH1cclxuICpcclxuICovXHJcbmRleC5vYmplY3QgPSByZXF1aXJlKFwiLi9vYmplY3Qvb2JqZWN0XCIpO1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEEgbW9kdWxlIGZvciBkZWFsaW5nIGRleCBjb21wb25lbnRzLlxyXG4gKlxyXG4gKiBAbmFtZSBjb21wb25lbnRcclxuICogQHR5cGUge21vZHVsZTpjb21wb25lbnR9XHJcbiAqXHJcbiAqL1xyXG5kZXguY29tcG9uZW50ID0gcmVxdWlyZShcIi4vY29tcG9uZW50L2NvbXBvbmVudFwiKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGV4OyIsIi8qKlxyXG4gKiBwdWJzdWIuanNcclxuICpcclxuICogQSB0aW55LCBvcHRpbWl6ZWQsIHRlc3RlZCwgc3RhbmRhbG9uZSBhbmQgcm9idXN0XHJcbiAqIHB1YnN1YiBpbXBsZW1lbnRhdGlvbiBzdXBwb3J0aW5nIGRpZmZlcmVudCBqYXZhc2NyaXB0IGVudmlyb25tZW50c1xyXG4gKlxyXG4gKiBAYXV0aG9yIEZlZGVyaWNvIFwiTG94XCIgTHVjaWduYW5vIDxodHRwOi8vcGx1cy5seS9mZWRlcmljby5sb3g+XHJcbiAqXHJcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZlZGVyaWNvLWxveC9wdWJzdWIuanNcclxuICovXHJcblxyXG4vKmdsb2JhbCBkZWZpbmUsIG1vZHVsZSovXHJcbihmdW5jdGlvbiAoY29udGV4dCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgLyoqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy90aGUgY2hhbm5lbCBzdWJzY3JpcHRpb24gaGFzaFxyXG4gICAgdmFyIGNoYW5uZWxzID0ge30sXHJcbiAgICAvL2hlbHAgbWluaWZpY2F0aW9uXHJcbiAgICAgIGZ1bmNUeXBlID0gRnVuY3Rpb247XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLypcclxuICAgICAgICogQHB1YmxpY1xyXG4gICAgICAgKlxyXG4gICAgICAgKiBQdWJsaXNoIHNvbWUgZGF0YSBvbiBhIGNoYW5uZWxcclxuICAgICAgICpcclxuICAgICAgICogQHBhcmFtIFN0cmluZyBjaGFubmVsIFRoZSBjaGFubmVsIHRvIHB1Ymxpc2ggb25cclxuICAgICAgICogQHBhcmFtIE1peGVkIGFyZ3VtZW50IFRoZSBkYXRhIHRvIHB1Ymxpc2gsIHRoZSBmdW5jdGlvbiBzdXBwb3J0c1xyXG4gICAgICAgKiBhcyBtYW55IGRhdGEgcGFyYW1ldGVycyBhcyBuZWVkZWRcclxuICAgICAgICpcclxuICAgICAgICogQGV4YW1wbGUgUHVibGlzaCBzdHVmZiBvbiAnL3NvbWUvY2hhbm5lbCcuXHJcbiAgICAgICAqIEFueXRoaW5nIHN1YnNjcmliZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCBhIGZ1bmN0aW9uXHJcbiAgICAgICAqIHNpZ25hdHVyZSBsaWtlOiBmdW5jdGlvbihhLGIsYyl7IC4uLiB9XHJcbiAgICAgICAqXHJcbiAgICAgICAqIFB1YlN1Yi5wdWJsaXNoKFxyXG4gICAgICAgKlx0XHRcIi9zb21lL2NoYW5uZWxcIiwgXCJhXCIsIFwiYlwiLFxyXG4gICAgICAgKlx0XHR7dG90YWw6IDEwLCBtaW46IDEsIG1heDogM31cclxuICAgICAgICogKTtcclxuICAgICAgICovXHJcbiAgICAgIHB1Ymxpc2g6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2hlbHAgbWluaWZpY2F0aW9uXHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXHJcbiAgICAgICAgLy8gYXJnc1swXSBpcyB0aGUgY2hhbm5lbFxyXG4gICAgICAgICAgc3VicyA9IGNoYW5uZWxzW2FyZ3NbMF1dLFxyXG4gICAgICAgICAgbGVuLFxyXG4gICAgICAgICAgcGFyYW1zLFxyXG4gICAgICAgICAgeDtcclxuXHJcbiAgICAgICAgaWYgKHN1YnMpIHtcclxuICAgICAgICAgIGxlbiA9IHN1YnMubGVuZ3RoO1xyXG4gICAgICAgICAgcGFyYW1zID0gKGFyZ3MubGVuZ3RoID4gMSkgP1xyXG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmNhbGwoYXJncywgMSkgOiBbXTtcclxuXHJcbiAgICAgICAgICAvL3J1biB0aGUgY2FsbGJhY2tzIGFzeW5jaHJvbm91c2x5LFxyXG4gICAgICAgICAgLy9kbyBub3QgYmxvY2sgdGhlIG1haW4gZXhlY3V0aW9uIHByb2Nlc3NcclxuICAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAvL2V4ZWN1dGVzIGNhbGxiYWNrcyBpbiB0aGUgb3JkZXJcclxuICAgICAgICAgICAgICAvL2luIHdoaWNoIHRoZXkgd2VyZSByZWdpc3RlcmVkXHJcbiAgICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IGxlbjsgeCArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJzW3hdLmFwcGx5KGNvbnRleHQsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAvL2NsZWFyIHJlZmVyZW5jZXMgdG8gYWxsb3cgZ2FyYmFnZSBjb2xsZWN0aW9uXHJcbiAgICAgICAgICAgICAgc3VicyA9IGNvbnRleHQgPSBwYXJhbXMgPSBudWxsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAwXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8qXHJcbiAgICAgICAqIEBwdWJsaWNcclxuICAgICAgICpcclxuICAgICAgICogUmVnaXN0ZXIgYSBjYWxsYmFjayBvbiBhIGNoYW5uZWxcclxuICAgICAgICpcclxuICAgICAgICogQHBhcmFtIFN0cmluZyBjaGFubmVsIFRoZSBjaGFubmVsIHRvIHN1YnNjcmliZSB0b1xyXG4gICAgICAgKiBAcGFyYW0gRnVuY3Rpb24gY2FsbGJhY2sgVGhlIGV2ZW50IGhhbmRsZXIsIGFueSB0aW1lIHNvbWV0aGluZyBpc1xyXG4gICAgICAgKiBwdWJsaXNoZWQgb24gYSBzdWJzY3JpYmVkIGNoYW5uZWwsIHRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZFxyXG4gICAgICAgKiB3aXRoIHRoZSBwdWJsaXNoZWQgYXJyYXkgYXMgb3JkZXJlZCBhcmd1bWVudHNcclxuICAgICAgICpcclxuICAgICAgICogQHJldHVybiBBcnJheSBBIGhhbmRsZSB3aGljaCBjYW4gYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGlzXHJcbiAgICAgICAqIHBhcnRpY3VsYXIgc3Vic2NyaXB0aW9uXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBleGFtcGxlIFB1YlN1Yi5zdWJzY3JpYmUoXHJcbiAgICAgICAqXHRcdFx0XHRcIi9zb21lL2NoYW5uZWxcIixcclxuICAgICAgICpcdFx0XHRcdGZ1bmN0aW9uKGEsIGIsIGMpeyAuLi4gfVxyXG4gICAgICAgKlx0XHRcdCk7XHJcbiAgICAgICAqL1xyXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIChjaGFubmVsLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2hhbm5lbCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIHRocm93IFwiaW52YWxpZCBvciBtaXNzaW5nIGNoYW5uZWxcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghKGNhbGxiYWNrIGluc3RhbmNlb2YgZnVuY1R5cGUpKSB7XHJcbiAgICAgICAgICB0aHJvdyBcImludmFsaWQgb3IgbWlzc2luZyBjYWxsYmFja1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjaGFubmVsc1tjaGFubmVsXSkge1xyXG4gICAgICAgICAgY2hhbm5lbHNbY2hhbm5lbF0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoYW5uZWxzW2NoYW5uZWxdLnB1c2goY2FsbGJhY2spO1xyXG5cclxuICAgICAgICByZXR1cm4ge2NoYW5uZWw6IGNoYW5uZWwsIGNhbGxiYWNrOiBjYWxsYmFja307XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvKlxyXG4gICAgICAgKiBAcHVibGljXHJcbiAgICAgICAqXHJcbiAgICAgICAqIERpc2Nvbm5lY3QgYSBzdWJzY3JpYmVkIGZ1bmN0aW9uIGYuXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBwYXJhbSBNaXhlZCBoYW5kbGUgVGhlIHJldHVybiB2YWx1ZSBmcm9tIGEgc3Vic2NyaWJlIGNhbGwgb3IgdGhlXHJcbiAgICAgICAqIG5hbWUgb2YgYSBjaGFubmVsIGFzIGEgU3RyaW5nXHJcbiAgICAgICAqIEBwYXJhbSBGdW5jdGlvbiBjYWxsYmFjayBbT1BUSU9OQUxdIFRoZSBldmVudCBoYW5kbGVyIG9yaWdpbmFhbGx5XHJcbiAgICAgICAqIHJlZ2lzdGVyZWQsIG5vdCBuZWVkZWQgaWYgaGFuZGxlIGNvbnRhaW5zIHRoZSByZXR1cm4gdmFsdWVcclxuICAgICAgICogb2Ygc3Vic2NyaWJlXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAqIHZhciBoYW5kbGUgPSBQdWJTdWIuc3Vic2NyaWJlKFwiL3NvbWUvY2hhbm5lbFwiLCBmdW5jdGlvbigpe30pO1xyXG4gICAgICAgKiBQdWJTdWIudW5zdWJzY3JpYmUoaGFuZGxlKTtcclxuICAgICAgICpcclxuICAgICAgICogb3JcclxuICAgICAgICpcclxuICAgICAgICogUHViU3ViLnVuc3Vic2NyaWJlKFwiL3NvbWUvY2hhbm5lbFwiLCBjYWxsYmFjayk7XHJcbiAgICAgICAqL1xyXG4gICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24gKGhhbmRsZSwgY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoaGFuZGxlLmNoYW5uZWwgJiYgaGFuZGxlLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICBjYWxsYmFjayA9IGhhbmRsZS5jYWxsYmFjaztcclxuICAgICAgICAgIGhhbmRsZSA9IGhhbmRsZS5jaGFubmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICB0aHJvdyBcImludmFsaWQgb3IgbWlzc2luZyBjaGFubmVsXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIShjYWxsYmFjayBpbnN0YW5jZW9mIGZ1bmNUeXBlKSkge1xyXG4gICAgICAgICAgdGhyb3cgXCJpbnZhbGlkIG9yIG1pc3NpbmcgY2FsbGJhY2tcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdWJzID0gY2hhbm5lbHNbaGFuZGxlXSxcclxuICAgICAgICAgIHgsXHJcbiAgICAgICAgICB5ID0gKHN1YnMgaW5zdGFuY2VvZiBBcnJheSkgPyBzdWJzLmxlbmd0aCA6IDA7XHJcblxyXG4gICAgICAgIGZvciAoeCA9IDA7IHggPCB5OyB4ICs9IDEpIHtcclxuICAgICAgICAgIGlmIChzdWJzW3hdID09PSBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBzdWJzLnNwbGljZSh4LCAxKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy9VTURcclxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAvL0FNRCBtb2R1bGVcclxuICAgIGRlZmluZSgncHVic3ViJywgaW5pdCk7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgLy9Db21tb25KUyBtb2R1bGVcclxuICAgIG1vZHVsZS5leHBvcnRzID0gaW5pdCgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvL3RyYWRpdGlvbmFsIG5hbWVzcGFjZVxyXG4gICAgY29udGV4dC5QdWJTdWIgPSBpbml0KCk7XHJcbiAgfVxyXG59KHRoaXMpKTsiLCIvKipcclxuICpcclxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgcm91dGluZXMgZm9yIGRlYWxpbmcgd2l0aCBhcnJheXMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgYXJyYXlcclxuICpcclxuICovXHJcblxyXG52YXIgYXJyYXkgPSB7fTtcclxubW9kdWxlLmV4cG9ydHMgPSBhcnJheTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBUYWtlIGEgc2xpY2Ugb2YgYW4gYXJyYXkgd2l0aG91dCBtb2RpZnlpbmcgdGhlIG9yaWdpbmFsIGFycmF5LlxyXG4gKlxyXG4gKiBkZXguYXJyYXkuc2xpY2UoYXJyYXkpIC0gUmV0dXJuIGEgY29weSBvZiB0aGUgYXJyYXkuXHJcbiAqIGRleC5hcnJheS5zbGljZShhcnJheSwgcm93UmFuZ2UpIC0gQ29weSB0aGUgYXJyYXksIHRoZW4gcmV0dXJuIGEgc2xpY2VcclxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXHJcbiAqIGRleC5hcnJheS5zbGljZShhcnJheSwgcm93UmFuZ2UsIG1heFJvd3MpIC0gQ29weSB0aGUgYXJyYXksIHRoZW4gcmV0dXJuIGEgc2xpY2VcclxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UgdXAgdG8sIGJ1dCBub3QgZXhjZWVkaW5nLCBtYXhSb3dzIHJvd3MuXHJcbiAqXHJcbiAqIEBwYXJhbSAoYXJyYXkpIGFycmF5IC0gVGhlIGFycmF5IHRvIHNsaWNlLlxyXG4gKiBAcGFyYW0gKGFycmF5fG51bWJlcikgcm93UmFuZ2UgLSBJZiBzdXBwbGllZCBhbiBhcnJheSwgdGhlIHJhbmdlIGRlZmluZWQgYnkgdGhlIG9mIHJvd3MgdG8gc2xpY2UuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXhSb3dzIC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIHJvd3MgdG8gcmV0dXJuLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSB7QGxhbmcgamF2YXNjcmlwdH1cclxuICogdmFyIG15QXJyYXkgPSBbIDEsIDIsIDMsIDQsIDUgXTtcclxuICpcclxuICogLy8gUmV0dXJuczogWyAzLCA0LCA1XVxyXG4gKiBzbGljZShteUFycmF5LCAyKTtcclxuICpcclxuICogLy8gUmV0dXJuczogWyAxLCAzLCA1IF1cclxuICogc2xpY2UobXlBcnJheSwgWzAsIDIsIDRdKTtcclxuICpcclxuICogLy8gSSBhbSBub3Qgc3VyZSB3aHkgeW91IHdvdWxkIGRvIHRoaXMsIGJ1dCBpbiB0aGUgaW50ZXJlc3Qgb2Ygc3VwcG9ydGluZ1xyXG4gKiAvLyB0aGUgUHJpbmNpcGxlIG9mIExlYXN0IFN1cnByaXNlLCB0aGlzIHJldHVybnMgdGhlIGFycmF5IHVuY2hhbmdlZC5cclxuICogLy8gUmV0dXJuczogWyAxLCAyLCAzLCA0LCA1IF1cclxuICogc2xpY2UobXlBcnJheSlcclxuICpcclxuICovXHJcbm1vZHVsZS5leHBvcnRzLnNsaWNlID0gZnVuY3Rpb24gKGFycmF5LCByb3dSYW5nZSwgbWF4Um93cykge1xyXG4gICAgdmFyIGFycmF5U2xpY2UgPSBbXTtcclxuICAgIHZhciByYW5nZTtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIHZhciBhcnJheUNvcHkgPSBkZXguYXJyYXkuY29weShhcnJheSk7XHJcblxyXG4gICAgLy8gTnVtZXJpYy5cclxuICAgIC8vIEFycmF5LlxyXG4gICAgLy8gT2JqZWN0LiAgTnVtZXJpYyB3aXRoIHN0YXJ0IGFuZCBlbmQuXHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICByZXR1cm4gYXJyYXlDb3B5O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocm93UmFuZ2UpKSB7XHJcbiAgICAgICAgICAgIHJhbmdlID0gcm93UmFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByYW5nZSA9IGRleC5yYW5nZShyb3dSYW5nZSwgYXJyYXlDb3B5Lmxlbmd0aCAtIHJvd1JhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJvd1JhbmdlKSkge1xyXG4gICAgICAgICAgICByYW5nZSA9IHJvd1JhbmdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmFuZ2UgPSBkZXgucmFuZ2Uocm93UmFuZ2UsIG1heFJvd3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2RleC5jb25zb2xlLmxvZyhcIkJFRk9SRTogYXJyYXkuc2xpY2UocmFuZ2U9XCIgKyByYW5nZSArIFwiKTogYXJyYXlTbGljZT1cIiArIGFycmF5U2xpY2UpO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IHJhbmdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYXJyYXlTbGljZS5wdXNoKGFycmF5Q29weVtyYW5nZVtpXV0pO1xyXG4gICAgfVxyXG4gICAgLy9kZXguY29uc29sZS5sb2coXCJBRlRFUjogYXJyYXkuc2xpY2UocmFuZ2U9XCIgKyByYW5nZSArIFwiKTogYXJyYXlTbGljZT1cIiArIGFycmF5U2xpY2UpO1xyXG4gICAgcmV0dXJuIGFycmF5U2xpY2U7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogVGhpcyBtZXRob2QgbG9jYXRlcyB0aGUgYXJyYXkgZWxlbWVudCB3aG9zZSBpZCB0YWcgbWF0Y2hlcyB0aGUgc3VwcGxpZWRcclxuICogaWQuICBJdCByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgbWF0Y2hpbmcgYXJyYXkgZWxlbWVudCwgb3IgLTEgaWZcclxuICogbm9uZSB3YXMgZm91bmQuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxyXG4gKiBAcGFyYW0gaWQgVGhlIGlkIHRvIHNlYXJjaCBvbi5cclxuICpcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBmaXJzdCBtYXRjaGluZyBhcnJheSBlbGVtZW50LCBvciAtMVxyXG4gKiBpZiBub3QgZm91bmQuXHJcbiAqXHJcbiAqL1xyXG4vKlxyXG4gbW9kdWxlLmV4cG9ydHMuaW5kZXhPZkJ5SWQgPSBmdW5jdGlvbiAoYXJyYXksIGlkKSB7XHJcbiByZXR1cm4gXy5maW5kSW5kZXgoYXJyYXksIHsgaWQ6IGlkIH0pXHJcbiB9O1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBJcyB0aGlzIHJvdXRpbmUgYWN0dWFsbHkgdXNlZCBhbnltb3JlPyAgQ2FuIEkgZGVwcmVjYXRlIGl0PyAgSXQncyBsb25nIGFuZFxyXG4gKiBJIGRvbid0IHJlbWVtYmVyIGV4YWN0bHkgd2hhdCBpdHMgZG9pbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSBkYXRhXHJcbiAqIEBwYXJhbSBudW1WYWx1ZXNcclxuICogQHJldHVybnMgeyp9XHJcbiAqXHJcbiAqL1xyXG4vKlxyXG4gbW9kdWxlLmV4cG9ydHMuaW5kZXhCYW5kcyA9IGZ1bmN0aW9uIChkYXRhLCBudW1WYWx1ZXMpIHtcclxuIGRleC5jb25zb2xlLmxvZyhcIkJBTkRTXCIpO1xyXG4gdmFyIGludGVydmFsLCByZXNpZHVhbCwgdGlja0luZGljZXMsIGxhc3QsIGk7XHJcblxyXG4gaWYgKG51bVZhbHVlcyA8PSAwKSB7XHJcbiB0aWNrSW5kaWNlcyA9IFtdO1xyXG4gfVxyXG4gZWxzZSBpZiAobnVtVmFsdWVzID09IDEpIHtcclxuIHRpY2tJbmRpY2VzID0gW01hdGguZmxvb3IobnVtVmFsdWVzIC8gMildO1xyXG4gfVxyXG4gZWxzZSBpZiAobnVtVmFsdWVzID09IDIpIHtcclxuIHRpY2tJbmRpY2VzID0gWzAsIGRhdGEubGVuZ3RoIC0gMV07XHJcbiB9XHJcbiBlbHNlIHtcclxuIC8vIFdlIGhhdmUgYXQgbGVhc3QgMiB0aWNrcyB0byBkaXNwbGF5LlxyXG4gLy8gQ2FsY3VsYXRlIHRoZSByb3VnaCBpbnRlcnZhbCBiZXR3ZWVuIHRpY2tzLlxyXG4gaW50ZXJ2YWwgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKGRhdGEubGVuZ3RoIC8gKG51bVZhbHVlcyAtIDEpKSk7XHJcblxyXG4gLy8gSWYgaXQncyBub3QgcGVyZmVjdCwgcmVjb3JkIGl0IGluIHRoZSByZXNpZHVhbC5cclxuIHJlc2lkdWFsID0gTWF0aC5mbG9vcihkYXRhLmxlbmd0aCAlIChudW1WYWx1ZXMgLSAxKSk7XHJcblxyXG4gLy8gQWx3YXlzIGxhYmVsIG91ciBmaXJzdCBkYXRhIHBvaW50LlxyXG4gdGlja0luZGljZXMgPSBbMF07XHJcblxyXG4gLy8gU2V0IHN0b3AgcG9pbnQgb24gdGhlIGludGVyaW9yIHRpY2tzLlxyXG4gbGFzdCA9IGRhdGEubGVuZ3RoIC0gaW50ZXJ2YWw7XHJcblxyXG4gZGV4LmNvbnNvbGUubG9nKFwiVEVTVFwiLCBkYXRhLCBudW1WYWx1ZXMsIGludGVydmFsLCByZXNpZHVhbCwgbGFzdCk7XHJcblxyXG4gLy8gRmlndXJlIG91dCB0aGUgaW50ZXJpb3IgdGlja3MsIGdlbnRseSBkcmlmdCB0byBhY2NvbW1vZGF0ZVxyXG4gLy8gdGhlIHJlc2lkdWFsLlxyXG4gZm9yIChpID0gaW50ZXJ2YWw7IGkgPD0gbGFzdDsgaSArPSBpbnRlcnZhbCkge1xyXG4gaWYgKHJlc2lkdWFsID4gMCkge1xyXG4gaSArPSAxO1xyXG4gcmVzaWR1YWwgLT0gMTtcclxuIH1cclxuIHRpY2tJbmRpY2VzLnB1c2goaSk7XHJcbiB9XHJcbiAvLyBBbHdheXMgZ3JhcGggdGhlIGxhc3QgdGljay5cclxuIHRpY2tJbmRpY2VzLnB1c2goZGF0YS5sZW5ndGggLSAxKTtcclxuIH1cclxuIGRleC5jb25zb2xlLmxvZyhcIkJBTkRTXCIpO1xyXG4gcmV0dXJuIHRpY2tJbmRpY2VzO1xyXG4gfTtcclxuICovXHJcblxyXG4vKipcclxuICogUmV0dXJuIGFuIGFycmF5IGNvbnNpc3Rpbmcgb2YgdW5pcXVlIGVsZW1lbnRzIHdpdGhpbiB0aGUgZmlyc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcnJheSBUaGUgYXJyYXkgdG8gZXh0cmFjdCB1bmlxdWUgdmFsdWVzIGZyb20uXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gQW4gYXJyYXkgd2hpY2ggY29uc2lzdHMgb2YgdW5pcXVlIGVsZW1lbnRzIHdpdGhpblxyXG4gKiB0aGUgdXNlciBzdXBwbGllZCBhcnJheS5cclxuICpcclxuICovXHJcbi8vbW9kdWxlLmV4cG9ydHMudW5pcXVlID0gZnVuY3Rpb24gKGFycmF5KSB7XHJcbi8vICByZXR1cm4gXy51bmlxKGFycmF5KTtcclxuLy99O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIG1hdGhlbWF0aWNhbGx5IHNtYWxsZXN0IGFuZCBsYXJnZXN0XHJcbiAqIGVsZW1lbnRzIHdpdGhpbiB0aGUgYXJyYXkuXHJcbiAqXHJcbiAqIEBwYXJhbSBtYXRyaXggVGhlIGFycmF5IHRvIGV2YWx1YXRlLlxyXG4gKiBAcGFyYW0gaW5kaWNlcyBUaGUgYXJyYXkgaW5kaWNlcyB0byBiZSBjb25zaWRlcmVkIGluIHRoZSBldmFsdWF0aW9uLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IC0gQW4gYXJyYXkgY29uc2lzdGluZyBvZiBbIG1pbiwgbWF4IF0gb2YgdGhlIGFycmF5LlxyXG4gKlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMuZXh0ZW50ID0gZnVuY3Rpb24gKG1hdHJpeCwgaW5kaWNlcykge1xyXG4gICAgaWYgKCFtYXRyaXggfHwgbWF0cml4Lmxlbmd0aCA8PSAwIHx8ICFpbmRpY2VzIHx8IGluZGljZXMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICByZXR1cm4gWzAsIDBdO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtaW4gPSBtYXRyaXhbMF1baW5kaWNlc1swXV07XHJcbiAgICB2YXIgbWF4ID0gbWluO1xyXG5cclxuICAgIGluZGljZXMuZm9yRWFjaChmdW5jdGlvbiAoY2kpIHtcclxuICAgICAgICBtYXRyaXguZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgIGlmIChtaW4gPiByb3dbY2ldKSB7XHJcbiAgICAgICAgICAgICAgICBtaW4gPSByb3dbY2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYXggPCByb3dbY2ldKSB7XHJcbiAgICAgICAgICAgICAgICBtYXggPSByb3dbY2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFttaW4sIG1heF07XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogUmV0dXJuIGEgZGlzdGluY3QgY29weSBvZiBhbiBhcnJheS5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvcHkuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gVGhlIGNvcHkgb2YgdGhlIGFycmF5LlxyXG4gKlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMuY29weSA9IGZ1bmN0aW9uIChhcnJheSkge1xyXG4gICAgLy8gU2hhbGxvdyBjb3B5XHJcbiAgICByZXR1cm4gXy5jbG9uZShhcnJheSk7XHJcbiAgICAvLyBEZWVwIGNvcHk6XHJcbiAgICAvL3JldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgYXJyYXkpO1xyXG59OyIsIi8qKlxyXG4gKlxyXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyByb3V0aW5lcyBmb3IgZGVhbGluZyB3aXRoIGNvbG9ycy5cclxuICpcclxuICogQG1vZHVsZSBjb2xvclxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBUaGlzIHJvdXRpbmUgY29udmVydHMgYSByZ2IocmVkLCBncmVlbiwgYmx1ZSkgY29sb3IgdG8gaXQnc1xyXG4gKiBlcXVpdmFsZW50ICNmZmZmZmYgaGV4YWRlY2ltYWwgZm9ybS5cclxuICpcclxuICogQHBhcmFtIGNvbG9yIFRoZSBjb2xvciB3ZSB3aXNoIHRvIGNvbnZlcnQgdG8gaGV4LlxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydHMudG9IZXggPSBmdW5jdGlvbiAoY29sb3IpIHtcclxuICBpZiAoY29sb3Iuc3Vic3RyKDAsIDEpID09PSAnIycpIHtcclxuICAgIHJldHVybiBjb2xvcjtcclxuICB9XHJcbiAgLy9jb25zb2xlLmxvZyhcIkNPTE9SOiBcIiArIGNvbG9yKVxyXG4gIHZhciBkaWdpdHMgPSAvcmdiXFwoKFxcZCspLChcXGQrKSwoXFxkKylcXCkvLmV4ZWMoY29sb3IpO1xyXG4gIC8vY29uc29sZS5sb2coXCJESUdJVFM6IFwiICsgZGlnaXRzKTtcclxuICB2YXIgcmVkID0gcGFyc2VJbnQoZGlnaXRzWzFdKTtcclxuICB2YXIgZ3JlZW4gPSBwYXJzZUludChkaWdpdHNbMl0pO1xyXG4gIHZhciBibHVlID0gcGFyc2VJbnQoZGlnaXRzWzNdKTtcclxuXHJcbiAgdmFyIHJnYiA9IGJsdWUgfCAoZ3JlZW4gPDwgOCkgfCAocmVkIDw8IDE2KTtcclxuICByZXR1cm4gJyMnICsgcmdiLnRvU3RyaW5nKDE2KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBUaGlzIHJvdXRpbmUgcmV0dXJucyB0aGUgcmVxdWVzdGVkIG5hbWVkIGNvbG9yIHNjaGVtZSB3aXRoXHJcbiAqIHRoZSByZXF1ZXN0ZWQgbnVtYmVyIG9mIGNvbG9ycy5cclxuICpcclxuICogQHBhcmFtIGNvbG9yU2NoZW1lIFRoZSBuYW1lZCBjb2xvciBzY2hlbWVzOiBjYXQxMCwgY2F0MjAsIGNhdDIwYiwgY2F0MjBjLCBIaUNvbnRyYXN0IG9yXHJcbiAqIGFueSBvZiB0aGUgbmFtZWQgY29sb3JzIGZyb20gY29sb3JicmV3ZXIuXHJcbiAqIEBwYXJhbSBudW1Db2xvcnMgVGhlIG51bWJlciBvZiBjb2xvcnMgYmVpbmcgcmVxdWVzdGVkLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7Kn0gVGhlIGFycmF5IG9mIGNvbG9ycy5cclxuICovXHJcbmV4cG9ydHMuY29sb3JTY2hlbWUgPSBmdW5jdGlvbiAoY29sb3JTY2hlbWUsIG51bUNvbG9ycykge1xyXG4gIGlmIChjb2xvclNjaGVtZSA9PT0gXCJjYXQxMFwiIHx8IGNvbG9yU2NoZW1lID09IFwiMVwiKSB7XHJcbiAgICByZXR1cm4gZDMuc2NhbGUuY2F0ZWdvcnkxMCgpO1xyXG4gIH1cclxuICBlbHNlIGlmIChjb2xvclNjaGVtZSA9PT0gXCJjYXQyMFwiIHx8IGNvbG9yU2NoZW1lID09IFwiMlwiKSB7XHJcbiAgICByZXR1cm4gZDMuc2NhbGUuY2F0ZWdvcnkyMCgpO1xyXG4gIH1cclxuICBlbHNlIGlmIChjb2xvclNjaGVtZSA9PT0gXCJjYXQyMGJcIiB8fCBjb2xvclNjaGVtZSA9PSBcIjNcIikge1xyXG4gICAgcmV0dXJuIGQzLnNjYWxlLmNhdGVnb3J5MjBiKCk7XHJcbiAgfVxyXG4gIGVsc2UgaWYgKGNvbG9yU2NoZW1lID09PSBcImNhdDIwY1wiIHx8IGNvbG9yU2NoZW1lID09IFwiNFwiKSB7XHJcbiAgICByZXR1cm4gZDMuc2NhbGUuY2F0ZWdvcnkyMGMoKTtcclxuICB9XHJcbiAgZWxzZSBpZiAoY29sb3JTY2hlbWUgPT0gXCJIaUNvbnRyYXN0XCIpIHtcclxuICAgIHJldHVybiBkMy5zY2FsZS5vcmRpbmFsKCkucmFuZ2UoY29sb3JicmV3ZXJbY29sb3JTY2hlbWVdWzldKTtcclxuICB9XHJcbiAgZWxzZSBpZiAoY29sb3JTY2hlbWUgaW4gY29sb3JicmV3ZXIpIHtcclxuICAgIC8vY29uc29sZS5sb2coXCJMRU5HVEg6IFwiICsgbGVuKTtcclxuICAgIHZhciBjO1xyXG4gICAgdmFyIGVmZkNvbG9ycyA9IE1hdGgucG93KDIsIE1hdGguY2VpbChNYXRoLmxvZyhudW1Db2xvcnMpIC8gTWF0aC5sb2coMikpKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJFRkYgTEVOR1RIOiBcIiArIGxlbik7XHJcblxyXG4gICAgLy8gRmluZCB0aGUgYmVzdCBjbWFwOlxyXG4gICAgaWYgKGVmZkNvbG9ycyA+IDEyOCkge1xyXG4gICAgICBlZmZDb2xvcnMgPSAyNTY7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjID0gZWZmQ29sb3JzOyBjID49IDI7IGMtLSkge1xyXG4gICAgICBpZiAoY29sb3JicmV3ZXJbY29sb3JTY2hlbWVdW2NdKSB7XHJcbiAgICAgICAgcmV0dXJuIGQzLnNjYWxlLm9yZGluYWwoKS5yYW5nZShjb2xvcmJyZXdlcltjb2xvclNjaGVtZV1bY10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKGMgPSBlZmZDb2xvcnM7IGMgPD0gMjU2OyBjKyspIHtcclxuICAgICAgaWYgKGNvbG9yYnJld2VyW2NvbG9yU2NoZW1lXVtjXSkge1xyXG4gICAgICAgIHJldHVybiBkMy5zY2FsZS5vcmRpbmFsKCkucmFuZ2UoY29sb3JicmV3ZXJbY29sb3JTY2hlbWVdW2NdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGQzLnNjYWxlLmNhdGVnb3J5MjAoKTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICByZXR1cm4gZDMuc2NhbGUuY2F0ZWdvcnkyMCgpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBHaXZlbiBhIGNvbG9yLCBsaWdodGVuIG9yIGRhcmtlbiBpdCBieSB0aGUgcmVxdWVzdGVkIHBlcmNlbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSBjb2xvciBUaGUgY29sb3IgdG8gbW9kaWZ5LlxyXG4gKiBAcGFyYW0gcGVyY2VudCBBIGZsb2F0aW5nIHBvaW50IG51bWJlciBpbiB0aGUgcmFuZ2Ugb2YgWy0xLjAsIDEuMF0uICBOZWdhdGl2ZVxyXG4gKiB2YWx1ZXMgd2lsbCBsaWdodGVuIHRoZSBjb2xvciwgcG9zaXRpdmUgdmFsdWVzIHdpbGwgZGFya2VuIGl0LlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbGlnaHRlbmVkIG9yIGRhcmtlbmVkIGNvbG9yIGluIHRoZSBmb3JtIG9mICNmZmZmZmYuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLnNoYWRlQ29sb3IgPSBmdW5jdGlvbiAoY29sb3IsIHBlcmNlbnQpIHtcclxuICB2YXIgZiA9IHBhcnNlSW50KGNvbG9yLnNsaWNlKDEpLCAxNiksIHQgPSBwZXJjZW50IDwgMCA/IDAgOiAyNTUsXHJcbiAgICBwID0gcGVyY2VudCA8IDAgPyBwZXJjZW50ICogLTEgOiBwZXJjZW50LFxyXG4gICAgUiA9IGYgPj4gMTYsIEcgPSBmID4+IDggJiAweDAwRkYsIEIgPSBmICYgMHgwMDAwRkY7XHJcbiAgcmV0dXJuIFwiI1wiICsgKDB4MTAwMDAwMCArIChNYXRoLnJvdW5kKCh0IC0gUikgKiBwKSArIFIpICogMHgxMDAwMCArIChNYXRoLnJvdW5kKCh0IC0gRykgKiBwKSArIEcpICpcclxuICAgIDB4MTAwICsgKE1hdGgucm91bmQoKHQgLSBCKSAqIHApICsgQikpLnRvU3RyaW5nKDE2KS5zbGljZSgxKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBHaXZlbiB0d28gY29sb3JzLCBibGVuZCB0aGVtIHRvZ2V0aGVyLlxyXG4gKlxyXG4gKiBAcGFyYW0gY29sb3IxXHJcbiAqIEBwYXJhbSBjb2xvcjJcclxuICogQHBhcmFtIHBlcmNlbnRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICpcclxuICovXHJcbmV4cG9ydHMuYmxlbmRDb2xvcnMgPSBmdW5jdGlvbihjb2xvcjEsIGNvbG9yMiwgcGVyY2VudCkge1xyXG4gIHZhciBmID0gcGFyc2VJbnQoY29sb3IxLnNsaWNlKDEpLCAxNiksIHQgPSBwYXJzZUludChjb2xvcjIuc2xpY2UoMSksIDE2KSxcclxuICAgIFIxID0gZiA+PiAxNiwgRzEgPSBmID4+IDggJiAweDAwRkYsXHJcbiAgICBCMSA9IGYgJiAweDAwMDBGRiwgUjIgPSB0ID4+IDE2LFxyXG4gICAgRzIgPSB0ID4+IDggJiAweDAwRkYsIEIyID0gdCAmIDB4MDAwMEZGO1xyXG5cclxuICByZXR1cm4gXCIjXCIgKyAoMHgxMDAwMDAwICsgKE1hdGgucm91bmQoKFIyIC0gUjEpICogcGVyY2VudCkgKyBSMSkgKiAweDEwMDAwICtcclxuICAgIChNYXRoLnJvdW5kKChHMiAtIEcxKSAqIHBlcmNlbnQpICsgRzEpICogMHgxMDAgK1xyXG4gICAgKE1hdGgucm91bmQoKEIyIC0gQjEpICogcGVyY2VudCkgKyBCMSkpLnRvU3RyaW5nKDE2KS5zbGljZSgxKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gY29sb3JcclxuICogQHBhcmFtIHBlcmNlbnRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmV4cG9ydHMuc2hhZGVSR0JDb2xvciA9IGZ1bmN0aW9uIChjb2xvciwgcGVyY2VudCkge1xyXG4gIHZhciBmID0gY29sb3Iuc3BsaXQoXCIsXCIpLCB0ID0gcGVyY2VudCA8IDAgPyAwIDogMjU1LFxyXG4gICAgcCA9IHBlcmNlbnQgPCAwID8gcGVyY2VudCAqIC0xIDogcGVyY2VudCwgUiA9IHBhcnNlSW50KGZbMF0uc2xpY2UoNCkpLFxyXG4gICAgRyA9IHBhcnNlSW50KGZbMV0pLCBCID0gcGFyc2VJbnQoZlsyXSk7XHJcbiAgcmV0dXJuIFwicmdiKFwiICsgKE1hdGgucm91bmQoKHQgLSBSKSAqIHApICsgUikgKyBcIixcIiArXHJcbiAgICAoTWF0aC5yb3VuZCgodCAtIEcpICogcCkgKyBHKSArIFwiLFwiICtcclxuICAgIChNYXRoLnJvdW5kKCh0IC0gQikgKiBwKSArIEIpICsgXCIpXCI7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGNvbG9yMVxyXG4gKiBAcGFyYW0gY29sb3IyXHJcbiAqIEBwYXJhbSBwZXJjZW50XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnRzLmJsZW5kUkdCQ29sb3JzID0gZnVuY3Rpb24oY29sb3IxLCBjb2xvcjIsIHBlcmNlbnQpIHtcclxuICB2YXIgZiA9IGNvbG9yMS5zcGxpdChcIixcIiksIHQgPSBjb2xvcjIuc3BsaXQoXCIsXCIpLCBSID0gcGFyc2VJbnQoZlswXS5zbGljZSg0KSksXHJcbiAgICBHID0gcGFyc2VJbnQoZlsxXSksIEIgPSBwYXJzZUludChmWzJdKTtcclxuICByZXR1cm4gXCJyZ2IoXCIgKyAoTWF0aC5yb3VuZCgocGFyc2VJbnQodFswXS5zbGljZSg0KSkgLSBSKSAqIHApICsgUikgKyBcIixcIiArXHJcbiAgICAoTWF0aC5yb3VuZCgocGFyc2VJbnQodFsxXSkgLSBHKSAqIHBlcmNlbnQpICsgRykgKyBcIixcIiArXHJcbiAgICAoTWF0aC5yb3VuZCgocGFyc2VJbnQodFsyXSkgLSBCKSAqIHBlcmNlbnQpICsgQikgKyBcIilcIjtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gY29sb3JcclxuICogQHBhcmFtIHBlcmNlbnRcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnRzLnNoYWRlID0gZnVuY3Rpb24oY29sb3IsIHBlcmNlbnQpIHtcclxuICBpZiAoY29sb3IubGVuZ3RoID4gNykgcmV0dXJuIHNoYWRlUkdCQ29sb3IoY29sb3IsIHBlcmNlbnQpO1xyXG4gIGVsc2UgcmV0dXJuIHNoYWRlQ29sb3IyKGNvbG9yLCBwZXJjZW50KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gY29sb3IxXHJcbiAqIEBwYXJhbSBjb2xvcjJcclxuICogQHBhcmFtIHBlcmNlbnRcclxuICovXHJcbmV4cG9ydHMuYmxlbmQgPSBmdW5jdGlvbiAoY29sb3IxLCBjb2xvcjIsIHBlcmNlbnQpIHtcclxuICBpZiAoY29sb3IxLmxlbmd0aCA+IDcpIHJldHVybiBibGVuZFJHQkNvbG9ycyhjb2xvcjEsIGNvbG9yMiwgcGVyY2VudCk7XHJcbiAgZWxzZSByZXR1cm4gYmxlbmRDb2xvcnMoY29sb3IxLCBjb2xvcjIsIHBlcmNlbnQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEdpdmVuIGEgY29sb3IgYW5kIGEgcGVyY2VudCB0byBsaWdodGVuIG9yIGRhcmtlbiBpdC5cclxuICpcclxuICogQHBhcmFtIGNvbG9yIFRoZSBiYXNlIGNvbG9yLlxyXG4gKiBAcGFyYW0gcGVyY2VudCBUaGUgcGVjZW50YWdlIHRvIGxpZ2h0ZW4gKG5lZ2F0aXZlKSBvciBkYXJrZW4gKHBvc2l0aXZlKSB0aGUgY29sb3IuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21wdXRlZCBjb2xvci5cclxuICpcclxuICovXHJcbi8qXHJcbiBleHBvcnRzLnNoYWRlQ29sb3IgPSBmdW5jdGlvbiAoY29sb3IsIHBlcmNlbnQpIHtcclxuIHZhciBSID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDEsIDMpLCAxNilcclxuIHZhciBHID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDMsIDUpLCAxNilcclxuIHZhciBCID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDUsIDcpLCAxNik7XHJcblxyXG4gUiA9IHBhcnNlSW50KFIgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xyXG4gRyA9IHBhcnNlSW50KEcgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xyXG4gQiA9IHBhcnNlSW50KEIgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xyXG5cclxuIFIgPSAoUiA8IDI1NSkgPyBSIDogMjU1O1xyXG4gRyA9IChHIDwgMjU1KSA/IEcgOiAyNTU7XHJcbiBCID0gKEIgPCAyNTUpID8gQiA6IDI1NTtcclxuXHJcbiB2YXIgUlIgPSAoKFIudG9TdHJpbmcoMTYpLmxlbmd0aCA9PSAxKSA/IFwiMFwiICsgUi50b1N0cmluZygxNikgOiBSLnRvU3RyaW5nKDE2KSk7XHJcbiB2YXIgR0cgPSAoKEcudG9TdHJpbmcoMTYpLmxlbmd0aCA9PSAxKSA/IFwiMFwiICsgRy50b1N0cmluZygxNikgOiBHLnRvU3RyaW5nKDE2KSk7XHJcbiB2YXIgQkIgPSAoKEIudG9TdHJpbmcoMTYpLmxlbmd0aCA9PSAxKSA/IFwiMFwiICsgQi50b1N0cmluZygxNikgOiBCLnRvU3RyaW5nKDE2KSk7XHJcblxyXG4gcmV0dXJuIFwiI1wiICsgUlIgKyBHRyArIEJCO1xyXG4gfTtcclxuICovXHJcblxyXG5leHBvcnRzLmdyYWRpZW50ID0gZnVuY3Rpb24gKGJhc2VDb2xvcikge1xyXG4gIGlmIChiYXNlQ29sb3IuY2hhckF0KDApID09ICdyJykge1xyXG4gICAgYmFzZUNvbG9yID0gY29sb3JUb0hleChiYXNlQ29sb3IpO1xyXG4gIH1cclxuICB2YXIgZ3JhZGllbnRJZDtcclxuICBncmFkaWVudElkID0gXCJncmFkaWVudFwiICsgYmFzZUNvbG9yLnN1YnN0cmluZygxKVxyXG4gIGNvbnNvbGUubG9nKFwiR3JhZGllbnRJZDogXCIgKyBncmFkaWVudElkKTtcclxuICBjb25zb2xlLmxvZyhcIkJhc2VDb2xvciA6IFwiICsgYmFzZUNvbG9yKTtcclxuXHJcbiAgLy92YXIgbGlnaHRDb2xvciA9IHNoYWRlQ29sb3IoYmFzZUNvbG9yLCAtMTApXHJcbiAgdmFyIGRhcmtDb2xvciA9IHNoYWRlQ29sb3IoYmFzZUNvbG9yLCAtMjApXHJcblxyXG4gIHZhciBncmFkID0gZDMuc2VsZWN0KFwiI2dyYWRpZW50c1wiKS5zZWxlY3RBbGwoXCIjXCIgKyBncmFkaWVudElkKVxyXG4gICAgLmRhdGEoW2dyYWRpZW50SWRdKVxyXG4gICAgLmVudGVyKClcclxuICAgIC5hcHBlbmQoXCJyYWRpYWxHcmFkaWVudFwiKVxyXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcImNvbG9yR3JhZGllbnRcIilcclxuICAgIC5hdHRyKFwiaWRcIiwgZ3JhZGllbnRJZClcclxuICAgIC5hdHRyKFwiZ3JhZGllbnRVbml0c1wiLCBcIm9iamVjdEJvdW5kaW5nQm94XCIpXHJcbiAgICAuYXR0cihcImZ4XCIsIFwiMzAlXCIpXHJcbiAgICAuYXR0cihcImZ5XCIsIFwiMzAlXCIpXHJcblxyXG4gIGdyYWQuYXBwZW5kKFwic3RvcFwiKVxyXG4gICAgLmF0dHIoXCJvZmZzZXRcIiwgXCIwJVwiKVxyXG4gICAgLmF0dHIoXCJzdHlsZVwiLCBcInN0b3AtY29sb3I6I0ZGRkZGRlwiKVxyXG5cclxuICAvLyBNaWRkbGVcclxuICBncmFkLmFwcGVuZChcInN0b3BcIilcclxuICAgIC5hdHRyKFwib2Zmc2V0XCIsIFwiNDAlXCIpXHJcbiAgICAuYXR0cihcInN0eWxlXCIsIFwic3RvcC1jb2xvcjpcIiArIGJhc2VDb2xvcilcclxuXHJcbiAgLy8gT3V0ZXIgRWRnZXNcclxuICBncmFkLmFwcGVuZChcInN0b3BcIilcclxuICAgIC5hdHRyKFwib2Zmc2V0XCIsIFwiMTAwJVwiKVxyXG4gICAgLmF0dHIoXCJzdHlsZVwiLCBcInN0b3AtY29sb3I6XCIgKyBkYXJrQ29sb3IpXHJcblxyXG4gIHJldHVybiBcInVybCgjXCIgKyBncmFkaWVudElkICsgXCIpXCI7XHJcbn07XHJcbiIsIi8qKlxyXG4gKlxyXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBiYXNlIGNhcGFiaWxpdGllcyB3aGljaCBhcmUgYXZhaWxhYmxlIHRvIGFsbCBkZXggY29tcG9uZW50cy5cclxuICpcclxuICogQGludGVyZmFjZVxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBBIG1hdHJpeCBpcyBhIHR3byBkaW1lbnNpb25hbCBhcnJheSBvZiB2YWx1ZXMuICBJdCdzIGEgZGF0YSBzdHJ1Y3R1cmVcclxuICogd2hpY2ggaXMgYSBrZXkgY29tcG9uZW50IG9mIGEgY3N2IHdoaWNoIGlzIHVzZWQgZXh0ZW5zaXZlbHlcclxuICogdGhyb3VnaG91dCBEZXhKcy4gIFRoZSBkYXRhIHBvcnRpb24gb2YgYSBjc3YgaXMgc2ltcGx5IGEgbWF0cml4LlxyXG4gKiBBIGNzdiBpcyB0aGUgc3RhbmRhcmQgZm9ybSBvZiBkYXRhIGlucHV0IGV4cGVjdGVkIGJ5IGRleCBjb21wb25lbnRzLlxyXG4gKlxyXG4gKiBAdHlwZWRlZiB7QXJyYXkuPEFycmF5LjxPYmplY3Q+Pn0gbWF0cml4XHJcbiAqIEBleGFtcGxlIHtAbGFuZyBqYXZhc2NyaXB0fVxyXG4gKiAvLyBBIDJ4MiBtYXRyaXggb2YgbnVtYmVycy5cclxuICogdmFyIG1hdHJpeDEgPSBbWzEsIDJdLCBbMywgNF1dO1xyXG4gKlxyXG4gKiAvLyBBIDJ4MiBtYXRyaXggb2Ygc3RyaW5ncy5cclxuICogdmFyIG1hdHJpeDIgPSBbWydQYXQnLCAnTWFydGluJ10sIFsnTWlrZScsICdQYXJ0b24nXV07XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgQ1NWIGRhdGEgc3RydWN0dXJlLlxyXG4gKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBjc3ZcclxuICpcclxuICogQHByb3BlcnR5IHtBcnJheX0gaGVhZGVyIC0gQW4gYXJyYXkgY29udGFpbmluZyB0aGUgaGVhZGluZ3MgZm9yIHRoaXMgY3N2LlxyXG4gKiBAcHJvcGVydHkge21hdHJpeH0gZGF0YSAtIEEgbWF0cml4IGNvbnRhaW5pbmcgdGhlIGRhdGEgZm9yIHRoaXMgY3N2LlxyXG4gKiBAZXhhbXBsZSB7QGxhbmcgamF2YXNjcmlwdH1cclxuICogdmFyIG15Q3N2ID0geyBoZWFkZXIgOiBbIFwiRmlyc3ROYW1lXCIsIFwiTGFzdE5hbWVcIiBdLFxyXG4gKiAgICAgICAgICAgICAgIGRhdGEgICA6IFtbIFwiQm9iXCIsIFwiSm9uZXNcIiBdLCBbIFwiUmlja3lcIiwgXCJCb2JieVwiIF1dIH07XHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgRDMgYXhpcyBzcGVjaWZpY2F0aW9uLlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBkM2F4aXNfc3BlY1xyXG4gKlxyXG4gKiBAcHJvcGVydHkge2Qzc2NhbGV9IFtzY2FsZT1kZXguY29uZmlnLnNjYWxlKHt0eXBlOidsaW5lYXInfSldIC0gVGhlIHNjYWxlIHRvIGJlIHVzZWQgZm9yIHRoaXMgYXhpcy5cclxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtvcmllbnQ9Ym90dG9tXSAtIFRoZSBvcmllbnRhdGlvbiBvZiB0aGUgYXhpcy4gKGxlZnR8cmlnaHR8dG9wfGJvdHRvbSlcclxuICogQHByb3BlcnR5IHtTdHJpbmd9IFt0aWNrc10gLSBUaGUgbnVtYmVyIG9mIHRpY2tzIHRvIGdlbmVyYXRlIGZvciB0aGlzIGF4aXMuXHJcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IFt0aWNrVmFsdWVzXSAtIFN1cHBseSBzcGVjaWZpYyBwbGFjZXMgdG8gZHJhdyB0aGUgdGlja3MuXHJcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbdGlja1NpemU9WzYsNl1dIC0gU2V0cyB0aGUgbGVuZ3RoIG9mIGJvdGggdGhlIGlubmVyIGFuZCBvdXRlciB0aWNrcy5cclxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtpbm5lclRpY2tTaXplPWRdIC0gU2V0cyB0aGUgbGVuZ3RoIG9mIGlubmVyIHRpY2tzLlxyXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW291dGVyVGlja1NpemU9Nl0gLSBTZXRzIHRoZSBsZW5ndGggb2Ygb3V0ZXIgdGlja3MuXHJcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbdGlja1BhZGRpbmc9M10gLSBTZXRzIHRoZSB0aWNrIHBhZGRpbmcgaW4gcGl4ZWxzLlxyXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW3RpY2tGb3JtYXRdIC0gU2V0cyB0aGUgZm9ybWF0IG9mIHRpY2sgbGFiZWxzLiBleDogZDMuZm9ybWF0KFwiLC4wZlwiKVxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBBIEQzIHNjYWxlIHNwZWNpZmljYXRpb24uXHJcbiAqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IGQzc2NhbGVfc3BlY1xyXG4gKlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3R5cGU9bGluZWFyXSAtIFRoZSB0eXBlIG9mIHNjYWxlIHRvIGNyZWF0ZS4gIFZhbGlkIHR5cGVzIGFyZVxyXG4gKiAobGluZWFyfHNxcnR8cG93fHRpbWV8bG9nfG9yZGluYWx8cXVhbnRpbGV8cXVhbnRpemV8aWRlbnRpdHkpXHJcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IFtkb21haW49WzAsIDEwMF1dIC0gVGhlIGRvbWFpbiBmb3IgdGhpcyBzY2FsZS5cclxuICogQHByb3BlcnR5IHtBcnJheX0gW3JhbmdlPVswLCA4MDBdXSAtIFRoZSByYW5nZSBmb3IgdGhpcyBzY2FsZS5cclxuICogQHByb3BlcnR5IHtBcnJheX0gW3JhbmdlUm91bmRdIC0gU2V0cyB0aGUgc2NhbGUncyBvdXRwdXQgcmFuZ2UgdG8gdGhlIHNwZWNpZmllZCBhcnJheSBvZiB2YWx1ZXMsIHdoaWxlIGFsc29cclxuICogc2V0dGluZyB0aGUgc2NhbGUncyBpbnRlcnBvbGF0b3IgdG8gZDMuaW50ZXJwb2xhdGVSb3VuZC5cclxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtpbnRlcnBvbGF0ZV0gLSBXaGVuIHN1cHBsaWVkLCBzZXRzIHRoZSBzY2FsZSdzIG91dHB1dFxyXG4gKiBpbnRlcnBvbGF0b3IgdXNpbmcgdGhlIHNwZWNpZmllZCBmYWN0b3J5LlxyXG4gKiBAcHJvcGVydHkge1N0cmluZ30gW2NsYW1wXSAtIFNldCB0byB0cnVlIGluIG9yZGVyIHRvIGVuYWJsZSBjbGFtcGluZywgZmFsc2UgdG8gZGlzYWJsZVxyXG4gKiBpdC4gIEVuc3VyZXMgaW50ZXJwb2xhdGlvbi9leHRyYXBvbGF0aW9uIGRvZXMgbm90IGdlbmVyYXRlIHZhbHVlcyBvdXRzaWRlIG9mIHRoaXNcclxuICogc2NhbGUncyByYW5nZS5cclxuICogQHByb3BlcnR5IHtTdHJpbmd9IFtuaWNlXSAtIElmIHRydWUsIHdpbGwgZXh0ZW5kIHRoZSBzY2FsZSdzIGRvbWFpbiB0byBiZWdpbiBhbmRcclxuICogZW5kIG9uIG5pY2Ugcm91bmQgaW50ZWdlciB2YWx1ZXMuXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbdGlja0Zvcm1hdF0gLSBPbmx5IGFwcGxpZXMgdG8gdGltZSBzY2FsZXMuICBTZXQncyB0aGUgdGlja1xyXG4gKiBmb3JtYXQuXHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEEgRDMgZm9udCBzcGVjaWZpY2F0aW9uLiAgTW9yZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gdGhlIHtAbGluayBodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcvdGV4dC5odG1sfFczQyBTVkcgMS4xIFRleHQgU3BlY2lmaWNhdGlvbn0uXHJcbiAqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IGQzZm9udF9zcGVjXHJcbiAqXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZGVjb3JhdGlvbj1ub25lXSAtIFRoaXMgcHJvcGVydHkgZGVzY3JpYmVzIGRlY29yYXRpb25zIHRoYXQgYXJlIGFkZGVkIHRvIHRoZSB0ZXh0IG9mIGFuIGVsZW1lbnQuXHJcbiAqIFZhbGlkIHZhbHVlczogKCBub25lIHwgdW5kZXJsaW5lIHwgb3ZlcmxpbmUgfCBsaW5lLXRocm91Z2ggfCBibGluayB8IGluaGVyaXQgKVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2ZhbWlseT1zYW5zLXNlcmlmXSAtIFRoaXMgcHJvcGVydHkgaW5kaWNhdGVzIHdoaWNoIGZvbnQgZmFtaWx5IGlzIHRvIGJlIHVzZWQgdG8gcmVuZGVyIHRoZSB0ZXh0LlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2xldHRlclNwYWNpbmc9bm9ybWFsXSAtXHJcbiAqIEBwcm9wZXJ0eSB7aW50ZWdlcn0gW3NpemU9MTRdIC0gVGhlIHNpemUgb2YgdGhlIGZvbnQuXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc3R5bGU9bm9ybWFsXSAtIFRoaXMgcHJvcGVydHkgc3BlY2lmaWVzIHdoZXRoZXIgdGhlIHRleHQgaXMgdG8gYmUgcmVuZGVyZWQgdXNpbmcgYSBub3JtYWwsXHJcbiAqIGl0YWxpYyBvciBvYmxpcXVlIGZhY2UuIFZhbGlkIHZhbHVlcyBhcmU6ICggbm9ybWFsIHwgaXRhbGljIHwgb2JsaXF1ZSB8IGluaGVyaXQgKS5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt3ZWlnaHQ9bm9ybWFsXSAtIFRoaXMgcHJvcGVydHkgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRleHQgaXMgdG8gYmUgcmVuZGVyZWQgdXNpbmcgdGhlIG5vcm1hbCBnbHlwaHNcclxuICogZm9yIGxvd2VyY2FzZSBjaGFyYWN0ZXJzIG9yIHVzaW5nIHNtYWxsLWNhcHMgZ2x5cGhzIGZvciBsb3dlcmNhc2UgY2hhcmFjdGVycy4gIFZhbGlkIHZhbHVlcyBmb3IgdGhpcyBmaWVsZCBhcmU6XHJcbiAqICggbm9ybWFsIHwgYm9sZCB8IGxpZ2h0ZXIgfCAxMDAgfCAyMDAgfCAzMDAgfCA0MDAgfCA1MDAgfCA2MDAgfCA3MDAgfCA4MDAgfCA5MDAgfCBpbmhlcml0KVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ3xpbnRlZ2VyfSBbd29yZFNwYWNpbmc9bm9ybWFsXSAtIFNwZWNpZmllcyB0aGUgYW1vdW50IG9mIHNwYWNlIHRoYXQgaXMgdG8gYmUgYWRkZWQgYmV0d2VlbiB0ZXh0IGNoYXJhY3RlcnMuXHJcbiAqIFZhbGlkIHZhbHVlczogKCBhdXRvIHwgPGludGVnZXItbGVuZ3RoPiB8IGluaGVyaXQgKVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3ZhcmlhbnQ9bm9ybWFsXSAtIGhpcyBwcm9wZXJ0eSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgdGV4dCBpcyB0byBiZSByZW5kZXJlZCB1c2luZ1xyXG4gKiB0aGUgbm9ybWFsIGdseXBocyBmb3IgbG93ZXJjYXNlIGNoYXJhY3RlcnMgb3IgdXNpbmcgc21hbGwtY2FwcyBnbHlwaHMgZm9yIGxvd2VyY2FzZSBjaGFyYWN0ZXJzLlxyXG4gKiBWYWxpZCB2YWx1ZXM6ICggbm9ybWFsIHwgc21hbGwtY2FwcyB8IGluaGVyaXQgKVxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBBIEQzIHN0cm9rZSBzcGVjaWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBkM3N0cm9rZV9zcGVjXHJcbiAqXHJcbiAqIEBwcm9wZXJ0eSB7ZmxvYXR9IFt3aWR0aD0xXSAtIFRoZSB3aWR0aCAoaW4gcGl4ZWxzKSBvZiB0aGlzIHN0cm9rZS5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtjb2xvcj1ibGFja10gLSBUaGUgY29sb3Igb2YgdGhpcyBzdHJva2UuXHJcbiAqIEBwcm9wZXJ0eSB7ZmxvYXR9IFtvcGFjaXR5PTFdIC0gVGhlIG9wYWNpdHkgb2YgdGhpcyBzdHJva2UgaW4gdGhlIHJhbmdlIG9mXHJcbiAqIHdoZXJlIDAgaXMgaW52aXNpYmxlIGFuZCAxIHJlcHJlc2VudHMgMTAwJSBvcGFxdWUgc3Ryb2tlLiBbMCwgMV1cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkYXNoYXJyYXldIC0gVXNlZCB0byBkcmF3IGRhc2hlZCBsaW5lcy4gIEV4OiBcIjEgMVwiIHdpbGwgZHJhd1xyXG4gKiBhIGRhc2hlZCBsaW5lIHdoaWNoIGNvbnNpc3RzIG9mIHNpbmdsZSBwaXhlbCBkYXNoZXMgc2VwYXJhdGVkIGJ5IDEgZW1wdHkgcGl4ZWwuXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbdHJhbnNmb3JtXSAtIEEgdHJhbnNmb3JtIHRvIGJlIGFwcGxpZWQgdG8gdGhlIHN0cm9rZS5cclxuICpcclxuICovXHJcblxyXG4vKipcclxuICpcclxuICogQSBEMyB0ZXh0IHNwZWNpZmljYXRpb24uXHJcbiAqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IGQzdGV4dF9zcGVjXHJcbiAqXHJcbiAqIEBwcm9wZXJ0eSB7ZDNmb250X3NwZWN9IFtmb250XSAtIFRoZSBkMyBmb250IHNwZWNpZmljYXRpb24gZm9yIHRoaXMgc3Ryb2tlLlxyXG4gKiBAcHJvcGVydHkge2ludGVnZXJ9IFt4PTBdIC0gVGhlIHggY29vcmRpbmF0ZSBmb3IgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiB0aGlzIHRleHQuXHJcbiAqIEBwcm9wZXJ0eSB7aW50ZWdlcn0gW3k9MF0gLSBUaGUgeSBjb29yZGluYXRlIGZvciB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIHRoaXMgdGV4dC5cclxuICogQHByb3BlcnR5IHtpbnRlZ2VyfSBbdGV4dExlbmd0aF0gLSBUaGUgYXV0aG9yJ3MgZXN0aW1hdGlvbiBvZiB0aGUgbGVuZ3RoIG9mIHRoaXMgdGV4dC5cclxuICogVGhlIHN5c3RlbSB3aWxsIHVzZSB0aGlzIGFzIGEgcHJlZmVyZW5jZSBhbmQgYXR0ZW1wdCB0byBzaXplIHRoZSB0ZXh0IHRvIHRoaXMgbGVuZ3RoLlxyXG4gKiBAcHJvcGVydHkge2ludGVnZXJ9IFtsZW5ndGhBZGp1c3RdIC0gSW5kaWNhdGVzIHRoZSB0eXBlIG9mIGFkanVzdG1lbnRzIHdoaWNoIHRoZSB1c2VyXHJcbiAqIGFnZW50IHNoYWxsIG1ha2UgdG8gbWFrZSB0aGUgcmVuZGVyZWQgbGVuZ3RoIG9mIHRoZSB0ZXh0IG1hdGNoIHRoZSB2YWx1ZSBzcGVjaWZpZWQgb25cclxuICogdGhlIHRleHRMZW5ndGggYXR0cmlidXRlLiAgVmFsaWQgdmFsdWVzOiAoIHNwYWNpbmcgfCBzcGFjaW5nQW5kR2x5cGhzIClcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt0cmFuc2Zvcm1dIC0gQW55IGV4dHJhIHRyYW5zZm9ybWF0aW9ucyB0byBiZSBhcHBsaWVkIHRvIHRoaXNcclxuICogdGV4dC5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtnbHlwaE9yaWVudGF0aW9uVmVydGljYWxdIC0gQWxsb3dzIHRoZSB1c2VyIHRvIGNvbnRyb2wgdGhlXHJcbiAqIG9yaWVudGF0aW9uIG9mIHRleHQuICBWYWxpZCB2YWx1ZXM6ICggYXV0byB8IDxhbmdsZT4gfCBpbmhlcml0ICkuICBBbmdsZSBtYXkgYmUgZXhwcmVzc2VkXHJcbiAqIGluIGRlZ3JlZXMsIHJhZGlhbnMsIG9yIGFzIGEgZ3JhZGllbnQuXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbdGV4dF0gLSBUaGUgdGV4dCB3ZSBhcmUgcmVwcmVzZW50aW5nLlxyXG4gKiBAcHJvcGVydHkge2ludGVnZXJ9IFtkeD0wXSAtIEFuIHgtYXhpcyBvZmZzZXQgdG8gYmUgYXBwbGllZCB0byB0aGlzIHRleHQuXHJcbiAqIEBwcm9wZXJ0eSB7aW50ZWdlcn0gW2R5PTBdIC0gQSB5LWF4aXMgb2Zmc2V0IHRvIGJlIGFwcGxpZWQgdG8gdGhpcyB0ZXh0LlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3dyaXRpbmdNb2RlXSAtIFNwZWNpZmllcyB3aGV0aGVyIHRleHQgZmxvd3MgbGVmdCB0byByaWdodCxcclxuICogcmlnaHQgdG8gbGVmdCwgdG9wIHRvIGJvdHRvbSBvciBib3R0b20gdG8gdG9wLiAgVmFsaWQgdmFsdWVzOiAoIGxyLXRiLCBybC10YiwgdGItcmwsXHJcbiAqIGxyLCBybCwgdGIsIGluaGVyaXQgKVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2FuY2hvcj1zdGFydF0gLSBTcGVjaWZpZXMgd2hlcmUgdGhpcyB0ZXh0IHNob3VsZCBiZSBhbmNob3JlZCB0by5cclxuICogVmFsaWQgdmFsdWVzOiAoIHN0YXJ0IHwgbWlkZGxlIHwgZW5kIClcclxuICogQHByb3BlcnR5IHtkM2ZpbGxfc3BlY30gW2ZpbGxdIC0gVGhlIGZpbGwgdG8gYmUgYXBwbGllZCB0byB0aGlzIHRleHQuXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZm9ybWF0XSAtIEEgZDMgZm9ybWF0IHRvIGJlIGFwcGxpZWQgdG8gdGhlIHRleHQuXHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEEgRDMgcmVjdGFuZ2xlIHNwZWNpZmljYXRpb24uXHJcbiAqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IGQzcmVjdF9zcGVjXHJcbiAqXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbd2lkdGg9NTBdIC0gVGhlIHdpZHRoIG9mIHRoaXMgcmVjdGFuZ2xlLlxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2hlaWdodD01MF0gLSBUaGUgaGVpZ2h0IG9mIHRoaXMgcmVjdGFuZ2xlLlxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3g9MF0gLSBUaGUgeCBjb29yZGluYXRlIG9mIHRoZSB0b3AgbGVmdCBjb3JuZXIgb2YgdGhpcyByZWN0YW5nbGUuXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbeT0wXSAtIFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIHRvcCBsZWZ0IGNvcm5lciBvZiB0aGlzIHJlY3RhbmdsZS5cclxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtyeD0wXSAtIEZvciByb3VuZGVkIHJlY3RhbmdsZXMsIHRoZSB4LWF4aXMgcmFkaXVzIG9mIHRoZSBlbGxpcHNlXHJcbiAqIHVzZWQgdG8gcm91bmQgb2ZmIHRoZSBjb3JuZXJzIG9mIHRoZSByZWN0YW5nbGUuXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcnk9MF0gLSBGb3Igcm91bmRlZCByZWN0YW5nbGVzLCB0aGUgeS1heGlzIHJhZGl1cyBvZiB0aGUgZWxsaXBzZVxyXG4gKiB1c2VkIHRvIHJvdW5kIG9mZiB0aGUgY29ybmVycyBvZiB0aGUgcmVjdGFuZ2xlLlxyXG4gKiBAcHJvcGVydHkge2Qzc3Ryb2tlX3NwZWN9IFtzdHJva2VdIC0gVGhlIHN0cm9rZSB3aGljaCB3aWxsIGJlIHVzZWQgdG8gZHJhdyB0aGUgcmVjdGFuZ2xlLlxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gW29wYWNpdHk9MV0gLSBUaGUgb3BhY2l0eSBmb3IgdGhpcyByZWN0YW5nbGUgZXhwcmVzc2VkIGFzIGEgZmxvYXRpbmdcclxuICogcG9pbnQgbnVtYmVyIGluIHRoZSByYW5nZSBvZiBbIDAuMCwgMS4wIF0gd2hlcmUgMCBpcyB0cmFuc3BhcmVudCwgMSBpcyBvcGFxdWUsIGFuZCBhbGxcclxuICogb3RoZXJzIGFyZSBzb21ld2hlcmUgaW4gYmV0d2VlbiBmdWxseSB0cmFuc3BhcmVudCBhbmQgZnVsbHkgb3BhcXVlLlxyXG4gKiBAcHJvcGVydHkge2QzY29sb3JzY2FsZX0gW2NvbG9yPWQzLnNjYWxlLmNhdGVnb3J5MjAoKV0gLSBUaGUgY29sb3Igc2NhbGUgd2hpY2ggd2Ugd2lsbFxyXG4gKiB0byBjb2xvciB0aGlzIHJlY3RhbmdsZS5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt0cmFuc2Zvcm1dIC0gQSB0cmFuc2Zvcm0sIGlmIGFueSwgdG8gYmUgYXBwbGllZCB0byB0aGlzIHJlY3RhbmdsZS5cclxuICogQHByb3BlcnR5IHtldmVudHNfc3BlY30gW2V2ZW50c10gLSBBbnkgZXZlbnRzIHdoaWNoIHdlIHdpc2ggdG8gcmVzcG9uZCB0by5cclxuICpcclxuICovXHJcblxyXG4vKipcclxuICpcclxuICogQW4gZXZlbnRzIHNwZWNpZmljYXRpb24uICBNYW55IGV2ZW50cyBhcmUgc3VwcG9ydGVkLCB0aGUgb25lcyBsaXN0ZWQgaGVyZSBhcmUgYSBzdWJzZXRcclxuICogb2YgYWxsIG9mIHRoZSBwb3NzaWJsZSBldmVudHMuICBGb3IgYSBjb21wbGV0ZSBsaXN0LCByZWZlciB0byBNb3ppbGxhJ3MgZGV2ZWxvcGVyIGRvY3VtZW50YXRpb25cclxuICogY29uY2VybmluZyB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvRXZlbnRzI1N0YW5kYXJkX2V2ZW50c3xzdGFuZGFyZCBldmVudHN9LlxyXG4gKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBkZXhldmVudHNfc3BlY1xyXG4gKlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW21vdXNlZG93bl0gLSBIYW5kbGVzIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhIHBvaW50aW5nIGRldmljZSBidXR0b24gKHVzdWFsbHkgYSBtb3VzZSlcclxuICogaXMgcHJlc3NlZCBvbiBhbiBlbGVtZW50LlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW21vdXNlZW50ZXJdIC0gSGFuZGxlcyBtb3VzZW92ZXIgZXZlbnRzIGdlbmVyYXRlZCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIG1vdmVkIG9udG9cclxuICogdGhlIGVsZW1lbnQgdGhhdCBoYXMgdGhlIGxpc3RlbmVyIGF0dGFjaGVkLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW21vdXNlbGVhdmVdIC0gSGFuZGxlcyBtb3VzZW92ZXIgZXZlbnRzIGdlbmVyYXRlZCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIG1vdmVkIG9mZlxyXG4gKiB0aGUgZWxlbWVudCB0aGF0IGhhcyB0aGUgbGlzdGVuZXIgYXR0YWNoZWQuXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbW91c2Vtb3ZlXSAtIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyBtb3ZlZCBvdmVyXHJcbiAqIGFuIGVsZW1lbnQuXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbW91c2VvdXRdIC0gSGFuZGxlcyBtb3VzZW92ZXIgZXZlbnRzIGdlbmVyYXRlZCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIG1vdmVkIG9mZlxyXG4gKiB0aGUgZWxlbWVudCB0aGF0IGhhcyB0aGUgbGlzdGVuZXIgYXR0YWNoZWQgb3Igb2ZmIG9uZSBvZiBpdHMgY2hpbGRyZW4uXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbW91c2VvdmVyXSAtIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyBtb3ZlZFxyXG4gKiBvbnRvIHRoZSBlbGVtZW50IHRoYXQgaGFzIHRoZSBsaXN0ZW5lciBhdHRhY2hlZCBvciBvbnRvIG9uZSBvZiBpdHMgY2hpbGRyZW4uXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbW91c2V1cF0gLSBIYW5kbGVzIG1vdXNlb3ZlciBldmVudHMgZ2VuZXJhdGVkIHdoZW4gYSBwb2ludGluZyBkZXZpY2UgYnV0dG9uIGlzXHJcbiAqIHJlbGVhc2VkIG92ZXIgYW4gZWxlbWVudC5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkYmxjbGlja10gLSBIYW5kbGVzIG1vdXNlb3ZlciBldmVudHMgZ2VuZXJhdGVkIHdoZW4gYSBwb2ludGluZyBkZXZpY2UgaXMgcXVpY2tseVxyXG4gKiBjbGlja2VkIHR3aWNlIG9uIGFuIGVsZW1lbnQuXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbd2hlZWxdIC0gVGhlIG1vdXNlIHdoZWVsIG9mIGEgcG9pbnRpbmcgZGV2aWNlIGhhcyBiZWVuIHJvdGF0ZWQgaW4gYW55IGRpcmVjdGlvbi5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtrZXlkb3duXSAtIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhIGtleSBpcyBwcmVzc2VkIGRvd24uXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBba2V5cHJlc3NdIC0gSGFuZGxlcyBtb3VzZW92ZXIgZXZlbnRzIGdlbmVyYXRlZCB3aGVuIGEga2V5IGlzIHByZXNzZWQgZG93blxyXG4gKiBhbmQgdGhhdCBrZXkgbm9ybWFsbHkgcHJvZHVjZXMgYSBjaGFyYWN0ZXIgdmFsdWUuXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBba2V5dXBdIC0gSGFuZGxlcyBtb3VzZW92ZXIgZXZlbnRzIGdlbmVyYXRlZCB3aGVuIGEga2V5IGlzIHJlbGVhc2VkLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW21lc3NhZ2VdIC0gQSBtZXNzYWdlIGlzIHJlY2VpdmVkIGZyb20gc29tZXRoaW5nLiAgaWU6IFdlYlNvY2tldCwgV2ViIFdvcmtlcixcclxuICogaWZyYW1lLCBwYXJlbnQgd2luZG93IG9yIG90aGVyIGV2ZW50IHNvdXJjZS5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkcmFnXSAtIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhbiBlbGVtZW50IG9yIHRleHQgc2VsZWN0aW9uXHJcbiAqIGlzIGJlaW5nIGRyYWdnZWQgKGV2ZXJ5IDM1MG1zKS5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkcmFnZW5kXSAtIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhIGRyYWcgb3BlcmF0aW9uIGlzIGJlaW5nXHJcbiAqIGVuZGVkIChieSByZWxlYXNpbmcgYSBtb3VzZSBidXR0b24gb3IgaGl0dGluZyB0aGUgZXNjYXBlIGtleSkuXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZHJhZ2VudGVyXSAtIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhIGRyYWdnZWQgZWxlbWVudCBvclxyXG4gKiB0ZXh0IHNlbGVjdGlvbiBlbnRlcnMgYSB2YWxpZCBkcm9wIHRhcmdldC5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkcmFnbGVhdmVdIC0gSGFuZGxlcyBtb3VzZW92ZXIgZXZlbnRzIGdlbmVyYXRlZCB3aGVuIGEgZHJhZ2dlZCBlbGVtZW50IG9yXHJcbiAqIHRleHQgc2VsZWN0aW9uIGxlYXZlcyBhIHZhbGlkIGRyb3AgdGFyZ2V0LlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2RyYWdvdmVyXSAtIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhbiBuIGVsZW1lbnQgb3IgdGV4dFxyXG4gKiBzZWxlY3Rpb24gaXMgYmVpbmcgZHJhZ2dlZCBvdmVyIGEgdmFsaWQgZHJvcCB0YXJnZXQgKGV2ZXJ5IDM1MG1zKS5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkcmFnc3RhcnRdIC0gSGFuZGxlcyBtb3VzZW92ZXIgZXZlbnRzIGdlbmVyYXRlZCB3aGVuIHRoZSB1c2VyIHN0YXJ0c1xyXG4gKiBkcmFnZ2luZyBhbiBlbGVtZW50IG9yIHRleHQgc2VsZWN0aW9uLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Ryb3BdIC0gSGFuZGxlcyBtb3VzZW92ZXIgZXZlbnRzIGdlbmVyYXRlZCB3aGVuIGFuIGVsZW1lbnQgaXMgZHJvcHBlZFxyXG4gKiBvbiBhIHZhbGlkIGRyb3AgdGFyZ2V0LlxyXG4gKlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3RvdWNoY2FuY2VsXSAtIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhIHRvdWNoIHBvaW50XHJcbiAqIGhhcyBiZWVuIGRpc3J1cHRlZCBpbiBhbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBtYW5uZXJzICh0b28gbWFueSB0b3VjaCBwb2ludHMgZm9yIGV4YW1wbGUpLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3RvdWNoZW5kXSAtIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhIHRvdWNoIHBvaW50IGlzXHJcbiAqIHJlbW92ZWQgZnJvbSB0aGUgdG91Y2ggc3VyZmFjZS5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt0b3VjaGVudGVyXSAtIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhIHRvdWNoIHBvaW50XHJcbiAqIGlzIG1vdmVkIG9udG8gdGhlIGludGVyYWN0aXZlIGFyZWEgb2YgYW4gZWxlbWVudC5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt0b3VjaGxlYXZlXSAtIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhIHRvdWNoIHBvaW50XHJcbiAqIGlzIG1vdmVkIG9mZiB0aGUgaW50ZXJhY3RpdmUgYXJlYSBvZiBhbiBlbGVtZW50LlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3RvdWNobW92ZV0gLSBIYW5kbGVzIG1vdXNlb3ZlciBldmVudHMgZ2VuZXJhdGVkIHdoZW4gYSB0b3VjaCBwb2ludFxyXG4gKiBpcyBtb3ZlZCBhbG9uZyB0aGUgdG91Y2ggc3VyZmFjZS5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt0b3VjaHN0YXJ0XSAtIEhhbmRsZXMgbW91c2VvdmVyIGV2ZW50cyBnZW5lcmF0ZWQgd2hlbiBhIHRvdWNoIHBvaW50XHJcbiAqIGlzIHBsYWNlZCBvbiB0aGUgdG91Y2ggc3VyZmFjZS5cclxuICpcclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEEgRDMgbGluZSBzcGVjaWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBkM2xpbmVfc3BlY1xyXG4gKlxyXG4gKiBAcHJvcGVydHkge2QzcG9pbnRfc3BlY30gW3N0YXJ0XSAtIFRoZSBzdGFydGluZyBwb2ludCBmb3IgdGhpcyBsaW5lLlxyXG4gKiBAcHJvcGVydHkge2QzX3BvaW50X3NwZWN9IFtlbmRdIC0gVGhlIGVuZGluZyBwb2ludCBmb3IgdGhpcyBsaW5lLlxyXG4gKiBAcHJvcGVydHkge2Qzc3Ryb2tlX3NwZWN9IFtzdHJva2NdIC0gVGhlIHN0cm9rZSB0byBiZSB1c2VkIHdoZW4gZHJhd2luZyB0aGlzIGxpbmUuXHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEEgRDMgcG9pbnQgc3BlY2lmaWNhdGlvbi5cclxuICpcclxuICogQHR5cGVkZWYge09iamVjdH0gZDNwb2ludF9zcGVjXHJcbiAqXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbeF0gLSBUaGUgc3RhcnRpbmcgcG9pbnQgZm9yIHRoaXMgbGluZS5cclxuICogQHByb3BlcnR5IHtudW1iZXJ9IFt5XSAtIFRoZSBlbmRpbmcgcG9pbnQgZm9yIHRoaXMgbGluZS5cclxuICpcclxuICovXHJcblxyXG4vKipcclxuICpcclxuICogQSBEMyBjaXJjbGUgc3BlY2lmaWNhdGlvbi5cclxuICpcclxuICogQHR5cGVkZWYge09iamVjdH0gZDNwb2ludF9zcGVjXHJcbiAqXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbY3hdIC0gVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgY2VudGVyIHBvaW50IG9mIHRoaXMgY2lyY2xlLlxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2N5XSAtIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIGNlbnRlciBwb2ludCBvZiB0aGlzIGNpcmNsZS5cclxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtyXSAtIFRoZSByYWRpdXMgb2YgdGhlIGNpcmNsZS5cclxuICogQHByb3BlcnR5IHtkM2ZpbGxfc3BlY30gW2ZpbGxdIC0gVGhlIGNpcmNsZSdzIGZpbGwuXHJcbiAqIEBwcm9wZXJ0eSB7ZDNzdHJva2Vfc3BlY30gW3N0cm9rZV0gLSBUaGUgY2lyY2xlJ3Mgc3Ryb2tlLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3RyYW5zZm9ybV0gLSBBIHRyYW5zZm9ybSwgaWYgYW55LCB0byBiZSBhcHBsaWVkIHRvIHRoaXMgY2lyY2xlLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3RpdGxlXSAtIFRoZSB0aXRsZSBvZiB0aGUgY2lyY2xlLlxyXG4gKiBAcHJvcGVydHkge2QzZXZlbnRzX3NwZWN9IFtldmVudHNdIC0gQW55IGV2ZW50cyB0byBiZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaXJjbGUuXHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEEgRDMgdGljayBzcGVjaWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBkM3RpY2tfc3BlY1xyXG4gKlxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2NvdW50XSAtIFRoZSBudW1iZXIgb2YgdGlja3MgdG8gZHJhLlxyXG4gKiBAcHJvcGVydHkge29iamVjdH0gW3NpemVdIC0gVGhlIHNpemUgb2YgdGhlIHRpY2suXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbc2l6ZS5tYWpvcl0gLSBUaGUgbGVuZ3RoIG9mIHRoZSBtYWpvciB0aWNrcy5cclxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtzaXplLm1pbm9yXSAtIFRoZSBsZW5ndGggb2YgdGhlIG1pbm9yIHRpY2tzLlxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3NpemUuZW5kXSAtIFRoZSBsZW5ndGggb2YgdGhlIHRpY2tzIGF0IHRoZSBlbmRzIG9mIHRoZSBheGlzLlxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmddIC0gVGhlIHBhZGRpbmcgZm9yIHRpY2tzLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Zvcm1hdF0gLSBUaGUgZm9ybWF0IHRvIGJlIGFwcGxpZWQgdG8gZWFjaCB0aWNrIGxhYmVsLlxyXG4gKiBAcHJvcGVydHkge2QzdGV4dF9zcGVjfSBbbGFiZWxdIC0gVGhlIHNwZWNpZmljYXRpb24gZm9yIHRoZSBhcHBlYXJhbmNlIG9mIHRpY2tcclxuICogbGFiZWxzLlxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBBIEQzIHBhdGggc3BlY2lmaWNhdGlvbi5cclxuICpcclxuICogQHR5cGVkZWYge09iamVjdH0gZDNwYXRoX3NwZWNcclxuICpcclxuICogQHByb3BlcnR5IHtkM2ZpbGxfc3BlY30gW2ZpbGxdIC0gVGhlIGZpbGwgdG8gYXBwbHkgd2hlbiBkcmF3aW5nIHRoaXMgcGF0aC5cclxuICogQHByb3BlcnR5IHtkM3N0cm9rZV9zcGVjfSBbc3Ryb2tlXSAtIFRoZSBzdHJva2UgdG8gdXNlIHdoZW4gZHJhd2luZyB0aGlzIHBhdGguXHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEEgRDMgZmlsbCBzcGVjaWZpY2F0aW9uLlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBkM2ZpbGxfc3BlY1xyXG4gKlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2ZpbGxDb2xvcj1ncmV5XSAtIFRoZSBjb2xvciBvZiB0aGlzIGZpbGwuXHJcbiAqIEBwcm9wZXJ0eSB7ZmxvYXR9IFtvcGFjaXR5PTFdIC0gVGhlIG9wYWNpdHkgb2YgdGhpcyBmaWxsIGluIHRoZSByYW5nZSBvZlxyXG4gKiB3aGVyZSAwIGlzIGludmlzaWJsZSBhbmQgMSByZXByZXNlbnRzIDEwMCUgb3BhcXVlIGZpbGwuIFswLCAxXVxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBBIEQzIGxpbmsgc3BlY2lmaWNhdGlvbi5cclxuICogQHR5cGVkZWYge09iamVjdH0gZDNsaW5rX3NwZWNcclxuICpcclxuICogQHByb3BlcnR5IHtkM2ZpbGx9IFtmaWxsXSAtIFRoZSBmaWxsIHRvIGJlIHVzZWQgZm9yIHRoaXMgbGluay5cclxuICogQHByb3BlcnR5IHtkM3N0cm9rZX0gW3N0cm9rZV0gLSBUaGUgc3Ryb2tlIHRvIGJlIHVzZWQgZm9yIHRoaXMgbGluay5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt0cmFuc2Zvcm1dIC0gVGhlIHRyYW5zZm9ybSB0byBhcHBseSB0byB0aGlzIGxpbmsuXHJcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBkIC0gVGhlIGRhdGEgdG8gYXNzb2NpYXRlIHdpdGggdGhpcyBsaW5rLlxyXG4gKiBAcHJvcGVydHkge2QzZXZlbnRzfSBbZXZlbnRzXSAtIFRoZSBldmVudHMgdG8gYXNzb2NpYXRlIHdpdGggdGhpcyBsaW5rLlxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBUaGlzIGlzIHRoZSBiYXNlIGNvbnN0cnVjdG9yIGZvciBhbGwgZGV4IGNvbXBvbmVudHMuICBJdCBwcm92aWRlcyBzb21lIG9mIHRoZSBjb21tb25cclxuICogZnVuY3Rpb25hbGl0eSBzdWNoIGFzIGF0dHJpYnV0ZSBnZXR0ZXJzL3NldHRlcnMsIGFiaWxpdHkgdG8gcHVibGlzaCBhbmQgc3Vic2NyaWJlXHJcbiAqIGV2ZW50cyBhcyB3ZWxsIGFzIHRoZSBhYmlsaXR5IGZvciB0aGUgdXNlciB0byBwcm92aWRlIGN1c3RvbWl6ZWQgc2V0dGluZ3MgZm9yIGFueVxyXG4gKiBjb21wb25lbnQgY29uZmlndXJhdGlvbiB2YWx1ZS5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBjbGFzc2Rlc2MgVGhpcyBpbnRlcmZhY2UgcHJvdmlkZXMgYSBjb250cmFjdCBmb3IgZGV4IGNvbXBvbmVudHMgdG8gaW1wbGVtZW50LlxyXG4gKlxyXG4gKiBAbmFtZSBkZXguY29tcG9uZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB1c2VyQ29uZmlnIEEgbWFwIGNvbnRhaW5pbmcgdGhlIHZhcmlvdXMgb3B0aW9ucyB0aGUgdXNlciB3aXNoZXMgdG8gb3ZlcnJpZGUuXHJcbiAqIEBwYXJhbSBkZWZhdWx0Q29uZmlnIEEgbWFwIGNvbnRhaW5pbmcgdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmb3IgdGhpcyBjb21wb25lbnQuXHJcbiAqXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VyQ29uZmlnLCBkZWZhdWx0Q29uZmlnKSB7XHJcbiAgdXNlckNvbmZpZyA9IHVzZXJDb25maWcgfHwge307XHJcbiAgZGVmYXVsdENvbmZpZyA9IGRlZmF1bHRDb25maWcgfHwge307XHJcblxyXG4gIHRoaXMuZGVidWcgPSBmYWxzZTtcclxuXHJcbiAgLy8gQWxsb3dzIGNvbXBvbmVudCBjb25zdHJ1Y3Rpb24gZnJvbSBvdGhlciBjb21wb25lbnRzLlxyXG4gIGlmICh1c2VyQ29uZmlnLmhhc093blByb3BlcnR5KCdjb25maWcnKSkge1xyXG4gICAgdGhpcy5jb25maWcgPSBkZXguY29uZmlnLmV4cGFuZEFuZE92ZXJsYXkodXNlckNvbmZpZy5jb25maWcsIGRlZmF1bHRDb25maWcpO1xyXG4gIH1cclxuICAvLyBFbHNlLCB3ZSBoYXZlIGEgY29uZmlndXJhdGlvbi5cclxuICBlbHNlIHtcclxuICAgIHRoaXMuY29uZmlnID0gZGV4LmNvbmZpZy5leHBhbmRBbmRPdmVybGF5KHVzZXJDb25maWcsIGRlZmF1bHRDb25maWcpO1xyXG4gIH1cclxuXHJcbiAgZGV4LmNvbnNvbGUubG9nKFwiZGV4LmNvbXBvbmVudCBDb25maWd1cmF0aW9uXCIsIHRoaXMuY29uZmlnKTtcclxuXHJcbiAgaWYgKCF0aGlzLmNvbmZpZy5jaGFubmVsKSB7XHJcbiAgICB0aGlzLmNvbmZpZy5jaGFubmVsID0gKHRoaXMuY29uZmlnLnBhcmVudCB8fCBcIiNwYXJlbnRcIikgKyBcIi9cIiArXHJcbiAgICAodGhpcy5jb25maWcuaWQgfHwgXCJ1bmtub3duLWlkXCIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgcHJvdmlkZXMgZ2V0dGVyL3NldHRlciBhY2Nlc3MgZm9yIHRoZSBjb25maWd1cmF0aW9uIG9mIGFcclxuICAgKiBEZXhDb21wb25lbnQuXHJcbiAgICpcclxuICAgKiBOYW1lcyBjYW4gZXhwcmVzcyBoaWVyYXJjaHkuICBBbiBhdHRyaWJ1dGUgbmFtZWQgJ2EnIG1heSBoYXZlIGFcclxuICAgKiBjaGlsZCBhdHRyaWJ1dGUgbmFtZWQgJ2InLiAgSW4gdGhpcyBjYXNlLCB0aGUgbmFtZSBvZiBhdHRyaWJ1dGVcclxuICAgKiAnYScgaXMgc2ltcGx5ICdhJy4gIFRoZSBuYW1lIG9mIGF0dHJpYnV0ZSAnYicgd291bGQgYmUgJ2EuYicuXHJcbiAgICpcclxuICAgKiBhdHRyKG5hbWUpIFJldHJpZXZlIHJldHJpZXZlIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBhdHRyaWJ1dGUgd2l0aFxyXG4gICAqIG1hdGNoaW5nIG5hbWUuXHJcbiAgICpcclxuICAgKiBhdHRyKG5hbWUsIHZhbHVlKSBTZXQgdGhlIGF0dHJpYnV0ZSB3aXRoIHRoZSBtYXRjaGluZyBuYW1lIHRvIHRoZVxyXG4gICAqIHNwZWNpZmllZCB2YWx1ZS5cclxuICAgKlxyXG4gICAqIEBtZXRob2QgZGV4LmNvbXBvbmVudC5hdHRyXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYXR0cmlidXRlLlxyXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZS5cclxuICAgKlxyXG4gICAqIEBleGFtcGxlIHtAbGFuZyBqYXZhc2NyaXB0fVxyXG4gICAqIC8vIFNldCBhbiBhdHRyaWJ1dGUgbmFtZWQgXCJmb29cIiB0byBcImJhclwiXHJcbiAgICogbXlDb21wb25lbnQuYXR0cihcImZvb1wiLCBcImJhclwiKTtcclxuICAgKlxyXG4gICAqIC8vIFJldHVybnMgXCJiYXJcIlxyXG4gICAqIG15Q29tcG9uZW50LmF0dHIoXCJmb29cIik7XHJcbiAgICpcclxuICAgKiAvLyBTZXQgYW4gYXR0cmlidXRlIG5hbWVkIFwiZm9vXCIgd2hpY2ggYmVsb25ncyB0byBhbiBvYmplY3QgbmFtZWRcclxuICAgKiAvLyBuZXN0ZWQgd2hpY2ggaW4gdHVybiBiZWxvbmdzIHRvIG15Q29tcG9uZW50LlxyXG4gICAqIG15Q29tcG9uZW50LmF0dHIoXCJuZXN0ZWQuZm9vXCIsIFwiYmFyXCIpO1xyXG4gICAqXHJcbiAgICogLy8gUmV0dXJucyBcImJhclwiXHJcbiAgICogbXlDb21wb25lbnQuYXR0cihcIm5lc3RlZC5mb29cIik7XHJcbiAgICpcclxuICAgKiAvLyBEb2VzIG5vdGhpbmcsIHJldHVybnMgbXlDb21wb25lbnRcclxuICAgKiBteUNvbXBvbmVudC5hdHRyKCk7XHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfGNvbXBvbmVudH0gSWYgb25seSBuYW1lIGlzIHByb3ZpZGVkLCBhdHRyIHdpbGwgcmV0dXJuIHRoZSB2YWx1ZSBvZlxyXG4gICAqIHRoZSByZXF1ZXN0ZWQgYXR0cmlidXRlLiAgSWYgYm90aCBuYW1lIGFuZCB2YWx1ZSBhcmUgcHJvdmlkZWQsIHRoZW5cclxuICAgKiB0aGUgYXR0cmlidXRlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIG5hbWUgd2lsbCBiZSBzZXQgdG8gdGhlIHN1cHBsaWVkXHJcbiAgICogdmFsdWUgYW5kIHRoZSBjb21wb25lbnQgaXRzZWxmIHdpbGwgYmUgcmV0dXJuZWQuXHJcbiAgICovXHJcbiAgdGhpcy5hdHRyID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAvLyBSRU06IE5lZWQgdG8gZ2V0SGllcmFyY2hpY2FsXHJcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZ1tuYW1lXTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKFwiU2V0dGluZyBIaWVhcmFyY2hpY2FsOiBcIiArIG5hbWUgKyBcIj1cIiArIHZhbHVlKTtcclxuICAgICAgLy9jb25zb2xlLmRpcih0aGlzLmNvbmZpZyk7XHJcblxyXG4gICAgICAvLyBUaGlzIHdpbGwgaGFuZGxlIHRoZSBzZXR0aW5nIG9mIGEgc2luZ2xlIGF0dHJpYnV0ZVxyXG4gICAgICBkZXgub2JqZWN0LnNldEhpZXJhcmNoaWNhbCh0aGlzLmNvbmZpZywgbmFtZSwgdmFsdWUsICcuJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdGhpcyBjb21wb25lbnQgdG8gdGhlIGV2ZW50cyBvZiB0eXBlIGV2ZW50VFlwZVxyXG4gICAqIGdlbmVyYXRlZCBieSB0aGUgc291cmNlIHRoaXMuICBXaGVuIGV2ZW50cyBhcmUgcmVjZWl2ZWQsXHJcbiAgICogaW52b2tlIHRoZSBjYWxsYmFjay5cclxuICAgKlxyXG4gICAqIEBtZXRob2QgZGV4LnRoaXMuc3Vic2NyaWJlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2NvbXBvbmVudH0gc291cmNlIC0gVGhlIHNvdXJjZSBjb21wb25lbnRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHdlIGFyZSBzdWJzY3JpYmluZyB0by5cclxuICAgKiBAcGFyYW0gY2FsbGJhY2sgLSBUaGUgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoaXMgZXZlbnQgaXNcclxuICAgKiByZWNlaXZlZC5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtoYW5kbGV8ZmFsc2V9IEZhbHNlIGlmIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbmNvcnJlY3RseS5cclxuICAgKiBPdGhlcndpc2UsIHRoZSBmdW5jdGlvbiByZXR1cm5zIGEgaGFuZGxlIHdoaWNoIGNhbiBsYXRlciBiZSB1c2VkXHJcbiAgICogdG8gdW5zdWJzY3JpYmUgdG8gdGhlIGV2ZW50cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIHRoaXMuc3Vic2NyaWJlID0gZnVuY3Rpb24gKHNvdXJjZSwgZXZlbnRUeXBlLCBjYWxsYmFjaykge1xyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMykge1xyXG4gICAgICB2YXIgY2hhbm5lbCA9IHNvdXJjZS5jb25maWcuY2hhbm5lbCArICcvJyArIGV2ZW50VHlwZTtcclxuXHJcbiAgICAgIGRleC5jb25zb2xlLmxvZyhcInN1YnNjcmliZSB0byBcIiArIGNoYW5uZWwpO1xyXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICBkZXguY29uc29sZS5sb2coXCJmYWlsZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBkZXguYnVzLnN1YnNjcmliZShjaGFubmVsLCBjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogVW5zdWJzY3JpYmUgdGhpcyBjb21wb25lbnQuXHJcbiAgICpcclxuICAgKiBAbWV0aG9kIGRleC5jb21wb25lbnQudW5zdWJzY3JpYmVcclxuICAgKlxyXG4gICAqIEBwYXJhbSBoYW5kbGUgLSBUaGUgaGFuZGxlIGF0dGFpbmVkIHZpYSBzdWJzY3JpYmUuXHJcbiAgICpcclxuICAgKi9cclxuICB0aGlzLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKGhhbmRsZSkge1xyXG4gICAgZGV4LmJ1cy51bnN1YnNjcmliZShoYW5kbGUpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogUHVibGlzaCBhbiBldmVudCB0byB0aGUgY29tcG9uZW50J3Mgc3Vic2NyaWJlcnMuXHJcbiAgICpcclxuICAgKiBAbWV0aG9kIGRleC5jb21wb25lbnQucHVibGlzaFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IHRvIHB1Ymxpc2guICBBbiBldmVudCBjYW4gYmUgYW55IG9iamVjdCwgaG93ZXZlcixcclxuICAgKiBpdCBtdXN0IGRlZmluZSBhIHByb3BlcnR5IG5hbWVkIFwidHlwZVwiLlxyXG4gICAqIEBwYXJhbSBldmVudC50eXBlIC0gVGhlIHR5cGUgb2YgdGhlIGV2ZW50IHdlIGFyZSBwdWJsaXNoaW5nLlxyXG4gICAqXHJcbiAgICovXHJcbiAgdGhpcy5wdWJsaXNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB2YXIgY2hhbm5lbDtcclxuXHJcbiAgICBpZiAoIWV2ZW50IHx8ICFldmVudC50eXBlKSB7XHJcbiAgICAgIGRleC5jb25zb2xlLndhcm4oXCJwdWJsaXNoIG9mIGV2ZW50IHRvIFwiICsgdGhpcy5jaGFubmVsICsgXCIgZmFpbGVkLlwiKTtcclxuICAgICAgZGV4LmJ1cy5wdWJsaXNoKFwiZXJyb3JcIiwge1xyXG4gICAgICAgIHR5cGUgICAgICAgICAgOiBcImVycm9yXCIsXHJcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJFcnJvciBwdWJsaXNoaW5nIGV2ZW50OiAnXCIgKyBldmVudCArIFwiJyB0byAnXCIgKyB0aGlzLmNoYW5uZWwgKyBcIidcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjaGFubmVsID0gdGhpcy5jb25maWcuY2hhbm5lbCArICcvJyArIGV2ZW50LnR5cGU7XHJcbiAgICAgIGRleC5jb25zb2xlLmxvZyhcInB1Ymxpc2ggdG8gXCIgKyBjaGFubmVsKTtcclxuICAgICAgZGV4LmJ1cy5wdWJsaXNoKGNoYW5uZWwsIGV2ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEEgZGVmYXVsdCBuby1vcCBpbXBsZW1lbnRhdGlvbiBvZiByZW5kZXIuICBTdWJjbGFzc2VzIHNob3VsZFxyXG4gICAqIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHdpdGggb25lIHdoaWNoIHByb3ZpZGVzIGFuIGluaXRpYWwgcmVuZGVyaW5nXHJcbiAgICogb2YgdGhlaXIgc3BlY2lmaWMgY29tcG9uZW50LiAgVGhpcyBpcyBhIGdyZWF0IHBsYWNlIHRvIHB1dFxyXG4gICAqIG9uZS10aW1lIG9ubHkgaW5pdGlhbGl6YXRpb24gbG9naWMuXHJcbiAgICpcclxuICAgKiBAbWV0aG9kIGRleC5jb21wb25lbnQucmVuZGVyXHJcbiAgICpcclxuICAgKi9cclxuICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiVW5pbXBsZW1lbnRlZCByb3V0aW5lOiByZW5kZXIoKVwiKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEEgZGVmYXVsdCBuby1vcCBpbXBsZW1lbnRhdGlvbiBvZiB1cGRhdGUuICBUaGlzIHdpbGwgdXBkYXRlIHRoZVxyXG4gICAqIGN1cnJlbnQgY29tcG9uZW50IHJlbGF0aXZlIHRvIGFueSBuZXcgc2V0dGluZyBvciBkYXRhIGNoYW5nZXMuXHJcbiAgICpcclxuICAgKiBAbWV0aG9kIGRleC5jb21wb25lbnQudXBkYXRlXHJcbiAgICpcclxuICAgKi9cclxuICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiVW5pbXBsZW1lbnRlZCByb3V0aW5lOiB1cGRhdGUoKVwiKTtcclxuICB9O1xyXG59OyIsIi8qKlxyXG4gKlxyXG4gKiBDb25maWcgbW9kdWxlLlxyXG4gKiBAbW9kdWxlIGNvbmZpZ1xyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBUaGlzIHJvdXRpbmUgc3VwcG9ydHMgYSBzaG9ydGhhbmQgbm90YXRpb24gYWxsb3dpbmcgdGhlXHJcbiAqIHVzZXIgdG8gc3BlY2lmeSBkZWVwbHkgbmVzdGVkIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB3aXRob3V0XHJcbiAqIGhhdmluZyB0byBkZWFsIHdpdGggbmVzdGVkIGpzb24gc3RydWN0dXJlcy5cclxuICpcclxuICogT3B0aW9ucyBsaWtlOlxyXG4gKlxyXG4gKiB7XHJcbiAqICAgJ2NlbGwnIDoge1xyXG4gKiAgICAgJ3JlY3QnIDoge1xyXG4gKiAgICAgICAnd2lkdGgnIDogMTAsXHJcbiAqICAgICAgICdoZWlnaHQnIDogMjAsXHJcbiAqICAgICAgICdldmVudHMnIDoge1xyXG4gKiAgICAgICAgICdtb3VzZW92ZXInIDogZnVuY3Rpb24oZCkgeyBjb25zb2xlLmxvZyhcIk1vdXNlT3ZlcjogXCIgKyBkKTsgfVxyXG4gKiAgICAgICB9XHJcbiAqICAgICB9XHJcbiAqICAgfVxyXG4gKiB9XHJcbiAqXHJcbiAqIENhbiBub3cgYmUgZGVzY3JpYmVkIG1vcmUgc3VjY2luY3RseSBhbmQgbW9yZSByZWFkYWJseSBhczpcclxuICpcclxuICoge1xyXG4gKiAgICdjZWxsLnJlY3Qud2lkdGgnICAgICAgICAgICAgOiAxMCxcclxuICogICAnY2VsbC5yZWN0LmhlaWdodCcgICAgICAgICAgIDogMjAsXHJcbiAqICAgJ2NlbGwucmVjdC5ldmVudHMubW91c2VvdmVyJyA6IGZ1bmN0aW9uKGQpIHsgY29uc29sZS5sb2coXCJNb3VzZW92ZXI6IFwiICsgZCk7IH1cclxuICogfVxyXG4gKlxyXG4gKiBPciBhIGh5YnJpZCBzdHJhdGVneSBjYW4gYmUgdXNlZDpcclxuICpcclxuICoge1xyXG4gKiAgICdjZWxsLnJlY3QnIDoge1xyXG4gKiAgICAgJ3dpZHRoJyA6IDEwLFxyXG4gKiAgICAgJ2hlaWdodCcgOiAyMCxcclxuICogICAgICdldmVudHMubW91c2VvdmVyJyA6IGZ1bmN0aW9uKGQpIHsgY29uc29sZS5sb2coXCJNb3VzZW92ZXI6IFwiICsgZCk7IH1cclxuICogICB9XHJcbiAqIH1cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlndXJhdGlvbiB0byBleHBhbmQuXHJcbiAqIEByZXR1cm5zIHsqfSBUaGUgZXhwYW5kZWQgY29uZmlndXJhdGlvbi4gIFRoZSBvcmlnaW5hbCBjb25maWd1cmF0aW9uXHJcbiAqICAgaXMgbGVmdCB1bnRvdWNoZWQuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmV4cGFuZCA9IGZ1bmN0aW9uIGV4cGFuZChjb25maWcpIHtcclxuICB2YXIgbmFtZSwgY2k7XHJcbiAgdmFyIGV4cGFuZGVkID0ge307XHJcblxyXG4gIC8vIFdlIGhhdmUgbm90aGluZywgcmV0dXJuIG5vdGhpbmcuXHJcbiAgaWYgKCFjb25maWcpIHtcclxuICAgIHJldHVybiBjb25maWc7XHJcbiAgfVxyXG5cclxuICAvL2RleC5jb25zb2xlLmxvZyhcImRleC5jb25maWcuZXhwYW5kKGNvbmZpZz1cIiwgY29uZmlnKTtcclxuXHJcbiAgZm9yICh2YXIgbmFtZSBpbiBjb25maWcpIHtcclxuICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgLy8gTmFtZSBjb250YWlucyBoaWVyYXJjaHk6XHJcbiAgICAgIGlmIChuYW1lICYmIG5hbWUuaW5kZXhPZignLicpID4gLTEpIHtcclxuICAgICAgICBleHBhbmRlZFtuYW1lXSA9IGNvbmZpZ1tuYW1lXTtcclxuICAgICAgICBkZXgub2JqZWN0LnNldEhpZXJhcmNoaWNhbChleHBhbmRlZCwgbmFtZSxcclxuICAgICAgICAgIGRleC5vYmplY3QuY2xvbmUoZXhwYW5kZWRbbmFtZV0pLCAnLicpO1xyXG4gICAgICAgIGRlbGV0ZSBleHBhbmRlZFtuYW1lXTtcclxuICAgICAgfVxyXG4gICAgICAvLyBTaW1wbGUgbmFtZVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICAvLyBJZiB0aGUgdGFyZ2V0IGlzIGFuIG9iamVjdCB3aXRoIG5vIGNoaWxkcmVuLCBjbG9uZSBpdC5cclxuICAgICAgICBpZiAoZGV4Lm9iamVjdC5pc0VtcHR5KGNvbmZpZ1tuYW1lXSkpIHtcclxuICAgICAgICAgIC8vZGV4LmNvbnNvbGUubG9nKFwiU0VUIFBSSU1JVElWRTogXCIgKyBuYW1lICsgXCI9XCIgKyBjb25maWdbbmFtZV0pO1xyXG4gICAgICAgICAgZXhwYW5kZWRbbmFtZV0gPSBkZXgub2JqZWN0LmNsb25lKGNvbmZpZ1tuYW1lXSk7XHJcbiAgICAgICAgICAvL2V4cGFuZGVkW25hbWVdID0gY29uZmlnW25hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIC8vZGV4LmNvbnNvbGUubG9nKFwiU0VUIE9CSkVDVDogXCIgKyBuYW1lICsgXCIgdG8gdGhlIGV4cGFuc2lvbiBvZlwiLCBjb25maWdbbmFtZV0pO1xyXG4gICAgICAgICAgZXhwYW5kZWRbbmFtZV0gPSBkZXguY29uZmlnLmV4cGFuZChjb25maWdbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9kZXguY29uc29sZS5sb2coXCJDT05GSUdcIiwgY29uZmlnLCBcIkVYUEFOREVEXCIsIGV4cGFuZGVkKTtcclxuICByZXR1cm4gZXhwYW5kZWQ7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogVGhpcyByb3V0aW5lIHdpbGwgZXhwYW5kIGhpZWFyY2hpY2FsbHkgZGVsaW1pdGVkIG5hbWVzIHN1Y2ggYXNcclxuICogZm9vLmJhciBpbnRvIGEgc3RydWN0dXJlIHsgZm9vIDogeyBiYXIgOiB2YWx1ZX19LiAgSXQgd2lsbCBkZWxldGVcclxuICogdGhlIGhpZXJhcmNoaWNhbCBuYW1lIGFuZCBvdmVyd3JpdGUgdGhlIHZhbHVlIGludG8gdGhlIHByb3BlclxyXG4gKiBsb2NhdGlvbiBsZWF2aW5nIGFueSBwcmV2aW91cyBvYmplY3QgcHJvcGVydGllcyB1bmRpc3R1cmJlZC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlndXJhdGlvbiB3aGljaCB3ZSB3aWxsIGV4cGFuZC5cclxuICpcclxuICovXHJcblxyXG4vKlxyXG4gZXhwb3J0cy5leHBhbmRfZGVwcmVjYXRlID0gZnVuY3Rpb24gZXhwYW5kKGNvbmZpZykge1xyXG4gdmFyIG5hbWUsXHJcbiBjaSxcclxuIGV4cGFuZGVkO1xyXG5cclxuIC8vIFdlIGhhdmUgbm90aGluZywgcmV0dXJuIG5vdGhpbmcuXHJcbiBpZiAoIWNvbmZpZykge1xyXG4gcmV0dXJuIGNvbmZpZztcclxuIH1cclxuXHJcbiAvL2RleC5jb25zb2xlLmxvZyhcImRleC5jb25maWcuZXhwYW5kKGNvbmZpZz1cIiwgY29uZmlnKTtcclxuXHJcbiAvLyBNYWtlIGEgY2xvbmUgb2YgdGhlIHByZXZpb3VzIGNvbmZpZ3VyYXRpb24uXHJcbiBleHBhbmRlZCA9IGRleC5vYmplY3QuY2xvbmUoY29uZmlnKTtcclxuXHJcbiAvLyBJdGVyYXRlIG92ZXIgdGhlIHByb3BlcnR5IG5hbWVzLlxyXG4gZm9yIChuYW1lIGluIGNvbmZpZykge1xyXG4gLy8gSWYgdGhpcyBpcyBvdXIgcHJvcGVydHkgdGhlIHByb2Nlc3MgaXQsIG90aGVyd2lzZSBpZ25vcmUuXHJcbiBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAvLyBUaGUgcHJvcGVydHkgbmFtZSBpcyBub24tbnVsbC5cclxuIGlmIChuYW1lKSB7XHJcbiAvLyBEZXRlcm1pbmUgY2hhcmFjdGVyIGluZGV4LlxyXG4gY2kgPSBuYW1lLmluZGV4T2YoJy4nKTtcclxuIH1cclxuIGVsc2Uge1xyXG4gLy8gRGVmYXVsdCB0byAtMVxyXG4gY2kgPSAtMTtcclxuIH1cclxuXHJcbiAvLyBpZiBDaGFyYWN0ZXIgaW5kZXggaXMgPiAtMSwgd2UgaGF2ZSBhIGhpZXJhcmNoaWNhbCBuYW1lLlxyXG4gLy8gT3RoZXJ3aXNlIGRvIG5vdGhpbmcsIGNvcHlpbmcgd2FzIGFscmVhZHkgaGFuZGxlZCBpbiB0aGVcclxuIC8vIGNsb25pbmcgYWN0aXZpdHkuXHJcbiBpZiAoY2kgPiAtMSkge1xyXG4gLy8gU2V0IGl0Li4uXHJcbiBkZXgub2JqZWN0LnNldEhpZXJhcmNoaWNhbChleHBhbmRlZCwgbmFtZSxcclxuIGRleC5vYmplY3QuY2xvbmUoZXhwYW5kZWRbbmFtZV0pLCAnLicpO1xyXG4gLy8gRGVsZXRlIHRoZSBvbGQgbmFtZS5cclxuIGRlbGV0ZSBleHBhbmRlZFtuYW1lXTtcclxuIH1cclxuIH1cclxuIH1cclxuXHJcbiAvL2RleC5jb25zb2xlLmxvZyhcIkNPTkZJR1wiLCBjb25maWcsIFwiRVhQQU5ERURcIiwgZXhwYW5kZWQpO1xyXG4gcmV0dXJuIGV4cGFuZGVkO1xyXG4gfTtcclxuICovXHJcblxyXG4vKipcclxuICpcclxuICogVGhpcyByb3V0aW5lIHdpbGwgdGFrZSB0d28gaGllcmFyY2hpZXMsIHRvcCBhbmQgYm90dG9tLCBhbmQgZXhwYW5kIGRvdCAoJy4nKVxyXG4gKiBkZWxpbWl0ZWQgbmFtZXMgc3VjaCBhczogJ2Zvby5iYXIuYml6LmJheicgaW50byBhIHN0cnVjdHVyZTpcclxuICogeyAnZm9vJyA6IHsgJ2JhcicgOiB7ICdiaXonIDogJ2JheicgfX19XHJcbiAqIEl0IHdpbGwgdGhlbiBvdmVybGF5IHRoZSB0b3AgaGllcmFyY2h5IG9udG8gdGhlIGJvdHRvbSBvbmUuICBUaGlzIGlzIHVzZWZ1bFxyXG4gKiBmb3IgY29uZmlndXJpbmcgb2JqZWN0cyBiYXNlZCB1cG9uIGEgZGVmYXVsdCBjb25maWd1cmF0aW9uIHdoaWxlIGFsbG93aW5nXHJcbiAqIHRoZSBjbGllbnQgdG8gY29udmVuaWVudGx5IG92ZXJyaWRlIHRoZXNlIGRlZmF1bHRzIGFzIG5lZWRlZC5cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IHRvcCAtIFRoZSB0b3Agb2JqZWN0IGhpZXJhcmNoeS5cclxuICogQHBhcmFtIHtvYmplY3R9IGJvdHRvbSAtIFRoZSBib3R0b20sIGJhc2Ugb2JqZWN0IGhpZXJhcmNoeS5cclxuICogQHJldHVybnMge29iamVjdH0gLSBBIG5ldyBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBleHBhbmRlZCB0b3Agb2JqZWN0XHJcbiAqIGhpZXJhcmNoeSBvdmVybGFpZCBvbiB0b3Agb2YgdGhlIGV4cGFuZGVkIGJvdHRvbSBvYmplY3QgaGllcmFyY2h5LlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5leHBhbmRBbmRPdmVybGF5ID0gZnVuY3Rpb24gZXhwYW5kQW5kT3ZlcmxheSh0b3AsIGJvdHRvbSkge1xyXG4gIC8vZGV4LmNvbnNvbGUubG9nKFxyXG4gIC8vZGV4LmNvbmZpZy5nZXRDYWxsZXJTdHJpbmcoYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIpLFxyXG4gIC8vXCJUT1BcIiwgdG9wLFxyXG4gIC8vXCJCT1RUT01cIiwgYm90dG9tLFxyXG4gIC8vXCJFWFBBTkRFRCBUT1BcIiwgZGV4LmNvbmZpZy5leHBhbmQodG9wKSxcclxuICAvL1wiRVhQQU5ERUQgQk9UVE9NXCIsIGRleC5jb25maWcuZXhwYW5kKGJvdHRvbSkpO1xyXG4gIHJldHVybiBkZXgub2JqZWN0Lm92ZXJsYXkoZGV4LmNvbmZpZy5leHBhbmQodG9wKSxcclxuICAgIGRleC5jb25maWcuZXhwYW5kKGJvdHRvbSkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFJldHVybiB0aGUgY29uZmlndXJhdGlvbiBmb3IgYSBmb250IGFmdGVyIHRoZSB1c2VyJ3MgY3VzdG9taXphdGlvbnNcclxuICogaGF2ZSBiZWVuIGFwcGxpZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7ZDNmb250X3NwZWN9IGN1c3RvbSAtIFRoZSB1c2VyIGN1c3RvbWl6YXRpb25zLlxyXG4gKiBAcmV0dXJucyB7ZDNmb250X3NwZWN9IC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZvbnQncyBzcGVjaWZpY2F0aW9uc1xyXG4gKiBhZnRlciB0aGUgdXNlcidzIGN1c3RvbWl6YXRpb25zIGhhdmUgYmVlbiBhcHBsaWVkLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5mb250ID0gZnVuY3Rpb24gZm9udChjdXN0b20pIHtcclxuICB2YXIgZGVmYXVsdHMgPVxyXG4gIHtcclxuICAgICdkZWNvcmF0aW9uJyAgICA6ICdub25lJyxcclxuICAgICdmYW1pbHknICAgICAgICA6ICdzYW5zLXNlcmlmJyxcclxuICAgICdsZXR0ZXJTcGFjaW5nJyA6ICdub3JtYWwnLFxyXG4gICAgJ3NpemUnICAgICAgICAgIDogMTQsXHJcbiAgICAnc3R5bGUnICAgICAgICAgOiAnbm9ybWFsJyxcclxuICAgICd3ZWlnaHQnICAgICAgICA6ICdub3JtYWwnLFxyXG4gICAgJ3dvcmRTcGFjaW5nJyAgIDogJ25vcm1hbCcsXHJcbiAgICAndmFyaWFudCcgICAgICAgOiAnbm9ybWFsJ1xyXG4gIH07XHJcblxyXG4gIHZhciBmb250U3BlYyA9IGRleC5jb25maWcuZXhwYW5kQW5kT3ZlcmxheShjdXN0b20sIGRlZmF1bHRzKTtcclxuICByZXR1cm4gZm9udFNwZWM7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQ29uZmlndXJlIHRoZSBnaXZlbiBmb250IHdpdGggdGhlIHN1cHBsaWVkIGZvbnQgc3BlY2lmaWNhdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IG5vZGUgLSBUaGUgbm9kZSB0byBiZSBjb25maWd1cmVkLlxyXG4gKiBAcGFyYW0ge2QzZm9udF9zcGVjfSBmb250U3BlYyAtIFRoZSBmb250IHNwZWNpZmljYXRpb24gdG8gYmUgYXBwbGllZC5cclxuICpcclxuICogQHJldHVybnMgeyp9IFRoZSBub2RlIGFmdGVyIGhhdmluZyB0aGUgZm9udCBzcGVjaWZpY2F0aW9uIGFwcGxpZWQuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmNvbmZpZ3VyZUZvbnQgPSBmdW5jdGlvbiBjb25maWd1cmVGb250KG5vZGUsIGZvbnRTcGVjLCBpKSB7XHJcbiAgLy9kZXguY29uc29sZS5sb2coXCJDT05GSUctRk9OVDogXCIgKyBpKTtcclxuICBpZiAoZm9udFNwZWMpIHtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAnZm9udC1mYW1pbHknLCBmb250U3BlYy5mYW1pbHksIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRBdHRyKG5vZGUsICdmb250LXNpemUnLCBmb250U3BlYy5zaXplLCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAnZm9udC13ZWlnaHQnLCBmb250U3BlYy53ZWlnaHQsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRBdHRyKG5vZGUsICdmb250LXN0eWxlJywgZm9udFNwZWMuc3R5bGUsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRBdHRyKG5vZGUsICd0ZXh0LWRlY29yYXRpb24nLCBmb250U3BlYy5kZWNvcmF0aW9uLCBpKTtcclxuXHJcbiAgICBkZXguY29uZmlnLnNldEF0dHIobm9kZSwgJ3dvcmQtc3BhY2luZycsIGZvbnRTcGVjLndvcmRTcGFjaW5nLCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAnbGV0dGVyLXNwYWNpbmcnLCBmb250U3BlYy5sZXR0ZXJTcGFjaW5nLCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAndmFyaWFudCcsIGZvbnRTcGVjLnZhcmlhbnQsIGkpO1xyXG4gIH1cclxuICByZXR1cm4gbm9kZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBDb25zdHJ1Y3QgYSB0ZXh0IHNwZWZpY2lhdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtkM3RleHRfc3BlY30gY3VzdG9tIC0gVGhlIHVzZXIncyBhZGp1c3RtZW50cyB0byB0aGUgZGVmYXVsdCB0ZXh0XHJcbiAqIHNwZWNpZmljYXRpb24uXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkM3RleHRfc3BlY30gQSByZXZpc2VkIHRleHQgc3BlY2lmaWNhdGlvbiBhZnRlciBoYXZpbmcgYXBwbGllZFxyXG4gKiB0aGUgdXNlcidzIG1vZGZpaWNhdGlvbnMuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLnRleHQgPSBmdW5jdGlvbiB0ZXh0KGN1c3RvbSkge1xyXG4gIHZhciBkZWZhdWx0cyA9XHJcbiAge1xyXG4gICAgJ2ZvbnQnICAgICAgICAgICAgICAgICAgICAgOiBkZXguY29uZmlnLmZvbnQoKSxcclxuICAgICd4JyAgICAgICAgICAgICAgICAgICAgICAgIDogMCxcclxuICAgICd5JyAgICAgICAgICAgICAgICAgICAgICAgIDogMCxcclxuICAgICd0ZXh0TGVuZ3RoJyAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgJ2xlbmd0aEFkanVzdCcgICAgICAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICAndHJhbnNmb3JtJyAgICAgICAgICAgICAgICA6ICcnLFxyXG4gICAgJ2dseXBoT3JpZW50YXRpb25WZXJ0aWNhbCcgOiB1bmRlZmluZWQsXHJcbiAgICAndGV4dCcgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgICdkeCcgICAgICAgICAgICAgICAgICAgICAgIDogMCxcclxuICAgICdkeScgICAgICAgICAgICAgICAgICAgICAgIDogMCxcclxuICAgICd3cml0aW5nTW9kZScgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgJ2FuY2hvcicgICAgICAgICAgICAgICAgICAgOiAnc3RhcnQnLFxyXG4gICAgJ2ZpbGwnICAgICAgICAgICAgICAgICAgICAgOiBkZXguY29uZmlnLmZpbGwoKSxcclxuICAgICdmb3JtYXQnICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgJ2V2ZW50cycgICAgICAgICAgICAgICAgICAgOiBkZXguY29uZmlnLmV2ZW50cygpXHJcbiAgfTtcclxuXHJcbiAgdmFyIHRleHRTcGVjID0gZGV4LmNvbmZpZy5leHBhbmRBbmRPdmVybGF5KGN1c3RvbSwgZGVmYXVsdHMpO1xyXG4gIHJldHVybiB0ZXh0U3BlYztcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBUaGlzIHJvdXRpbmUgd2lsbCBkeW5hbWljYWxseSBjb25maWd1cmUgYW4gU1ZHIHRleHQgZW50aXR5IGJhc2VkIHVwb24gdGhlXHJcbiAqIHN1cHBsaWVkIGNvbmZpZ3VyYXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBub2RlIFRoZSBTVkcgdGV4dCBub2RlIHRvIGJlIGNvbmZpZ3VyZWQuXHJcbiAqIEBwYXJhbSB7ZDN0ZXh0X3NwZWN9IHRleHRTcGVjIFRoZSB0ZXh0IHNwZWNpZmljYXRpb24gZm9yIHRoaXMgbm9kZS5cclxuICpcclxuICogQHJldHVybnMgeyp9IFRoZSBub2RlIGFmdGVyIGhhdmluZyBhcHBsaWVkIHRoZSB0ZXh0IHNwZWNpZmljYXRpb24uXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmNvbmZpZ3VyZVRleHQgPSBmdW5jdGlvbiBjb25maWd1cmVUZXh0KG5vZGUsIHRleHRTcGVjLCBpKSB7XHJcbiAgLy9kZXguY29uc29sZS5sb2coXCJDT05GSUctVEVYVDogXCIgKyBpKTtcclxuICBpZiAodGV4dFNwZWMpIHtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCBcInhcIiwgdGV4dFNwZWMueCwgaSk7XHJcbiAgICBkZXguY29uZmlnLnNldEF0dHIobm9kZSwgXCJ5XCIsIHRleHRTcGVjLnksIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRBdHRyKG5vZGUsIFwiZHhcIiwgdGV4dFNwZWMuZHgsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRBdHRyKG5vZGUsIFwiZHlcIiwgdGV4dFNwZWMuZHksIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRTdHlsZShub2RlLCBcInRleHQtYW5jaG9yXCIsIHRleHRTcGVjLmFuY2hvciwgaSk7XHJcbiAgICBkZXguY29uZmlnLmNvbmZpZ3VyZUZvbnQobm9kZSwgdGV4dFNwZWMuZm9udCwgaSk7XHJcbiAgICBkZXguY29uZmlnLnNldEF0dHIobm9kZSwgJ3RleHRMZW5ndGgnLCB0ZXh0U3BlYy50ZXh0TGVuZ3RoLCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAnbGVuZ3RoQWRqdXN0JywgdGV4dFNwZWMubGVuZ3RoQWRqdXN0LCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAndHJhbnNmb3JtJywgdGV4dFNwZWMudHJhbnNmb3JtLCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAnZ2x5cGgtb3JpZW50YXRpb24tdmVydGljYWwnLFxyXG4gICAgICB0ZXh0U3BlYy5nbHlwaE9yaWVudGF0aW9uVmVydGljYWwsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRBdHRyKG5vZGUsICd3cml0aW5nLW1vZGUnLCB0ZXh0U3BlYy53cml0aW5nTW9kZSwgaSk7XHJcbiAgICBkZXguY29uZmlnLmNhbGxJZkRlZmluZWQobm9kZSwgJ3RleHQnLCB0ZXh0U3BlYy50ZXh0LCBpKTtcclxuICAgIGRleC5jb25maWcuY29uZmlndXJlRmlsbChub2RlLCB0ZXh0U3BlYy5maWxsLCBpKTtcclxuICAgIGRleC5jb25maWcuY29uZmlndXJlRXZlbnRzKG5vZGUsIHRleHRTcGVjLmV2ZW50cywgaSk7XHJcbiAgfVxyXG4gIHJldHVybiBub2RlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIENvbnN0cnVjdCBhIHN0cm9rZSBzcGVjaWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2QzdGV4dF9zcGVjfSBzdHJva2VTcGVjIC0gVGhlIHVzZXIncyBjdXN0b21pemF0aW9ucyB0byB0aGUgc3BlY2lmaWNhdGlvbi5cclxuICpcclxuICogQHJldHVybnMge2QzdGV4dF9zcGVjfSBUaGUgc3Ryb2tlIHNwZWNpZmljYXRpb24gYWZ0ZXIgaGF2aW5nIGFwcGxpZWQgdGhlIHVzZXInc1xyXG4gKiBjb25maWd1cmF0aW9uLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5zdHJva2UgPSBmdW5jdGlvbiBzdHJva2Uoc3Ryb2tlU3BlYykge1xyXG4gIHZhciBkZWZhdWx0cyA9XHJcbiAge1xyXG4gICAgJ3dpZHRoJyAgICAgOiAxLFxyXG4gICAgJ2NvbG9yJyAgICAgOiBcImJsYWNrXCIsXHJcbiAgICAnb3BhY2l0eScgICA6IDEsXHJcbiAgICAnZGFzaGFycmF5JyA6ICcnLFxyXG4gICAgJ3RyYW5zZm9ybScgOiAnJ1xyXG4gIH07XHJcblxyXG4gIHZhciBjb25maWcgPSBkZXguY29uZmlnLmV4cGFuZEFuZE92ZXJsYXkoc3Ryb2tlU3BlYywgZGVmYXVsdHMpO1xyXG4gIHJldHVybiBjb25maWc7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQXBwbHkgYSBzdHJva2Ugc3BlY2lmaWNhdGlvbiB0byBhIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBub2RlIC0gVGhlIG5vZGUgdG8gYmUgY29uZmlndXJlZC5cclxuICogQHBhcmFtIHtkM3N0cm9rZV9zcGVjfSBzdHJva2VTcGVjIC0gVGhlIHN0cm9rZSBzcGVjaWZpY2F0aW9uIHRvIGJlIGFwcGxpZWQuXHJcbiAqIEByZXR1cm5zIFRoZSBuZXdseSBjb25maWd1cmVkIG5vZGUuXHJcbiAqL1xyXG5leHBvcnRzLmNvbmZpZ3VyZVN0cm9rZSA9IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0cm9rZShub2RlLCBzdHJva2VTcGVjLCBpKSB7XHJcbiAgaWYgKHN0cm9rZVNwZWMpIHtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCBcInN0cm9rZVwiLCBzdHJva2VTcGVjLmNvbG9yLCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0U3R5bGUobm9kZSwgJ3N0cm9rZS13aWR0aCcsIHN0cm9rZVNwZWMud2lkdGgsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRTdHlsZShub2RlLCAnc3Ryb2tlLW9wYWNpdHknLCBzdHJva2VTcGVjLm9wYWNpdHksIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRTdHlsZShub2RlLCAnc3Ryb2tlLWRhc2hhcnJheScsIHN0cm9rZVNwZWMuZGFzaGFycmF5LCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAndHJhbnNmb3JtJywgc3Ryb2tlU3BlYy50cmFuc2Zvcm0sIGkpO1xyXG4gIH1cclxuICByZXR1cm4gbm9kZTtcclxufTtcclxuLyoqXHJcbiAqXHJcbiAqIENvbnN0cnVjdCBhIGZpbGwgc3BlY2lmaWNhdGlvbiB3aGljaCBhbGxvdyB0aGUgdXNlciB0byBvdmVycmlkZSBhbnlcclxuICogaXRzIHNldHRpbmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2QzZmlsbF9zcGVjfSBjdXN0b20gLSBUaGUgdXNlcidzIGN1c3RvbWl6YXRpb25zLlxyXG4gKiBAcmV0dXJucyB7ZDNmaWxsX3NwZWN9IEEgZmlsbCBzcGVjaWZpY2F0aW9uIHdoaWNoIGhhcyBhcHBsaWVkIHRoZSB1c2VyJ3NcclxuICogY3VzdG9taXphdGlvbnMuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmZpbGwgPSBmdW5jdGlvbiBmaWxsKGN1c3RvbSkge1xyXG4gIHZhciBkZWZhdWx0cyA9XHJcbiAge1xyXG4gICAgJ2ZpbGxDb2xvcicgICA6IFwiZ3JleVwiLFxyXG4gICAgJ2ZpbGxPcGFjaXR5JyA6IDFcclxuICB9O1xyXG5cclxuICB2YXIgY29uZmlnID0gZGV4LmNvbmZpZy5leHBhbmRBbmRPdmVybGF5KGN1c3RvbSwgZGVmYXVsdHMpO1xyXG4gIHJldHVybiBjb25maWc7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQXBwbHkgYSBmaWxsIHNwZWNpZmljYXRpb24gdG8gYSBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gbm9kZSAtIFRoZSBub2RlIHRvIGJlIGNvbmZpZ3VyZWQuXHJcbiAqIEBwYXJhbSB7ZDNmaWxsX3NwZWN9IGNvbmZpZyAtIFRoZSBmaWxsIHNwZWNpZmljYXRpb24uXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSBub2RlIGFmdGVyIGhhdmluZyBhcHBsaWVkIHRoZSBmaWxsIHNwZWNpZmljYXRpb24uXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmNvbmZpZ3VyZUZpbGwgPSBmdW5jdGlvbiBjb25maWd1cmVGaWxsKG5vZGUsIGNvbmZpZywgaSkge1xyXG4gIGlmIChjb25maWcpIHtcclxuICAgIGRleC5jb25maWcuc2V0U3R5bGUobm9kZSwgJ2ZpbGwnLCBjb25maWcuZmlsbENvbG9yLCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0U3R5bGUobm9kZSwgJ2ZpbGwtb3BhY2l0eScsIGNvbmZpZy5maWxsT3BhY2l0eSwgaSk7XHJcbiAgfVxyXG4gIHJldHVybiBub2RlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIENvbnN0cnVjdCBhIGxpbmsgc3BlY2lmaWNhdGlvbiB3aGljaCBhbGxvd3MgdGhlIHVzZXIgdG8gb3ZlcnJpZGUgYW55XHJcbiAqIG9mIHRoZSBzZXR0aW5ncy5cclxuICpcclxuICogQHBhcmFtIHtkM2xpbmtfc3BlY30gY3VzdG9tIC0gVGhlIHVzZXJzIGN1c3RvbWl6YXRpb25zLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7ZDNsaW5rX3NwZWN9IEEgbGluayBzcGVjaWZpY2F0aW9uIGdlbmVyYXRlZCBieSBjb21iaW5pbmcgdGhlXHJcbiAqIGRlZmF1bHQgd2l0aCB0aGUgdXNlcidzIGN1c3RvbWl6YXRpb25zLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5saW5rID0gZnVuY3Rpb24gbGluayhjdXN0b20pIHtcclxuICB2YXIgZGVmYXVsdHMgPVxyXG4gIHtcclxuICAgICdmaWxsJyAgICAgIDogZGV4LmNvbmZpZy5maWxsKCksXHJcbiAgICAnc3Ryb2tlJyAgICA6IGRleC5jb25maWcuc3Ryb2tlKCksXHJcbiAgICAndHJhbnNmb3JtJyA6ICcnLFxyXG4gICAgJ2QnICAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICAnZXZlbnRzJyAgICA6IGRleC5jb25maWcuZXZlbnRzKClcclxuICB9O1xyXG5cclxuICB2YXIgY29uZmlnID0gZGV4LmNvbmZpZy5leHBhbmRBbmRPdmVybGF5KGN1c3RvbSwgZGVmYXVsdHMpO1xyXG4gIHJldHVybiBjb25maWc7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQXBwbHkgYSBsaW5rIHNwZWNpZmljYXRpb24gdG8gYSBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gbm9kZSAtIFRoZSBub2RlIHRvIGFwcGx5IHRoZSBzcGVjaWZpY2F0aW9uIHRvLlxyXG4gKiBAcGFyYW0ge2QzbGlua19zcGVjfSBjb25maWcgLSBUaGUgbGluayBzcGVjaWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgbm9kZSBhZnRlciBoYXZpbmcgYXBwbGllZCB0aGUgc3BlY2lmaWNhdGlvbi5cclxuICpcclxuICovXHJcbmV4cG9ydHMuY29uZmlndXJlTGluayA9IGZ1bmN0aW9uIGNvbmZpZ3VyZUxpbmsobm9kZSwgY29uZmlnLCBpKSB7XHJcbiAgaWYgKGNvbmZpZykge1xyXG4gICAgZGV4LmNvbmZpZy5jb25maWd1cmVTdHJva2Uobm9kZSwgY29uZmlnLnN0cm9rZSwgaSk7XHJcbiAgICBkZXguY29uZmlnLmNvbmZpZ3VyZUZpbGwobm9kZSwgY29uZmlnLmZpbGwsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRBdHRyKG5vZGUsICd0cmFuc2Zvcm0nLCBjb25maWcudHJhbnNmb3JtLCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAnZCcsIGNvbmZpZy5kLCBpKTtcclxuICAgIGRleC5jb25maWcuY29uZmlndXJlRXZlbnRzKG5vZGUsIGNvbmZpZy5ldmVudHMsIGkpO1xyXG4gIH1cclxuICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIENvbnN0cnVjdCBhIHJlY3RhbmdsZSBzcGVjaWZpY2F0aW9uIHdoaWNoIGFsbG93cyB0aGUgdXNlciB0byBvdmVycmlkZSBhbnlcclxuICogb2YgdGhlIHNldHRpbmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2QzcmVjdF9zcGVjfSBjdXN0b20gLSBUaGUgdXNlcnMgY3VzdG9taXphdGlvbnMuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkM3JlY3Rfc3BlY30gQSByZWN0YW5nbGUgc3BlY2lmaWNhdGlvbiBnZW5lcmF0ZWQgYnkgY29tYmluaW5nIHRoZVxyXG4gKiBkZWZhdWx0IHdpdGggdGhlIHVzZXIncyBjdXN0b21pemF0aW9ucy5cclxuICpcclxuICovXHJcbmV4cG9ydHMucmVjdGFuZ2xlID0gZnVuY3Rpb24gcmVjdGFuZ2xlKGN1c3RvbSkge1xyXG4gIHZhciBjb25maWcgPVxyXG4gIHtcclxuICAgICd3aWR0aCcgICAgIDogNTAsXHJcbiAgICAnaGVpZ2h0JyAgICA6IDUwLFxyXG4gICAgJ3gnICAgICAgICAgOiAwLFxyXG4gICAgJ3knICAgICAgICAgOiAwLFxyXG4gICAgJ3J4JyAgICAgICAgOiAwLFxyXG4gICAgJ3J5JyAgICAgICAgOiAwLFxyXG4gICAgJ3N0cm9rZScgICAgOiBkZXguY29uZmlnLnN0cm9rZSgpLFxyXG4gICAgJ29wYWNpdHknICAgOiAxLFxyXG4gICAgJ2NvbG9yJyAgICAgOiBkMy5zY2FsZS5jYXRlZ29yeTIwKCksXHJcbiAgICAndHJhbnNmb3JtJyA6IHVuZGVmaW5lZCxcclxuICAgICdldmVudHMnICAgIDogZGV4LmNvbmZpZy5ldmVudHMoKVxyXG4gIH07XHJcbiAgaWYgKGN1c3RvbSkge1xyXG4gICAgY29uZmlnID0gZGV4Lm9iamVjdC5vdmVybGF5KGN1c3RvbSwgY29uZmlnKTtcclxuICB9XHJcbiAgcmV0dXJuIGNvbmZpZztcclxufTtcclxuXHJcbmV4cG9ydHMuY29uZmlndXJlUmVjdGFuZ2xlID0gZnVuY3Rpb24gY29uZmlndXJlUmVjdGFuZ2xlKG5vZGUsIGNvbmZpZywgaSkge1xyXG4gIGlmIChjb25maWcpIHtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAnd2lkdGgnLCBjb25maWcud2lkdGgsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRBdHRyKG5vZGUsICdoZWlnaHQnLCBjb25maWcuaGVpZ2h0LCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAneCcsIGNvbmZpZy54LCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAneScsIGNvbmZpZy55LCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAncngnLCBjb25maWcucngsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRBdHRyKG5vZGUsICdyeScsIGNvbmZpZy5yeSwgaSk7XHJcbiAgICBkZXguY29uZmlnLnNldEF0dHIobm9kZSwgJ29wYWNpdHknLCBjb25maWcub3BhY2l0eSwgaSk7XHJcbiAgICBkZXguY29uZmlnLnNldEF0dHIobm9kZSwgJ2ZpbGwnLCBjb25maWcuY29sb3IsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRBdHRyKG5vZGUsICd0cmFuc2Zvcm0nLCBjb25maWcudHJhbnNmb3JtLCBpKTtcclxuICAgIGRleC5jb25maWcuY29uZmlndXJlU3Ryb2tlKG5vZGUsIGNvbmZpZy5zdHJva2UsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5jb25maWd1cmVFdmVudHMobm9kZSwgY29uZmlnLmV2ZW50cywgaSk7XHJcbiAgfVxyXG4gIHJldHVybiBub2RlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIENvbnN0cnVjdCBhbiBldmVudHMgc3BlY2lmaWNhdGlvbiB3aGljaCBhbGxvd3MgdGhlIHVzZXIgdG8gb3ZlcnJpZGUgYW55XHJcbiAqIG9mIHRoZSBzZXR0aW5ncy5cclxuICpcclxuICogQHBhcmFtIHtkM2V2ZW50c19zcGVjfSBjdXN0b20gLSBUaGUgdXNlcnMgY3VzdG9taXphdGlvbnMuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkM2V2ZW50c19zcGVjfSBBbiBldmVudHMgc3BlY2lmaWNhdGlvbiBnZW5lcmF0ZWQgYnkgY29tYmluaW5nIHRoZVxyXG4gKiBkZWZhdWx0IHdpdGggdGhlIHVzZXIncyBjdXN0b21pemF0aW9ucy5cclxuICpcclxuICovXHJcbmV4cG9ydHMuZXZlbnRzID0gZnVuY3Rpb24gZXZlbnRzKGN1c3RvbSkge1xyXG4gIHZhciBkZWZhdWx0cyA9XHJcbiAge1xyXG4gICAgJ21vdXNlb3ZlcicgOiBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKFwiRGVmYXVsdCBtb3VzZW92ZXJcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuICB2YXIgY29uZmlnID0gZGVmYXVsdHM7XHJcblxyXG4gIGlmIChjdXN0b20pIHtcclxuICAgIGNvbmZpZyA9IGRleC5vYmplY3Qub3ZlcmxheShjdXN0b20sIGRlZmF1bHRzKTtcclxuICB9XHJcbiAgcmV0dXJuIGNvbmZpZztcclxufTtcclxuXHJcbmV4cG9ydHMuY29uZmlndXJlRXZlbnRzID0gZnVuY3Rpb24gY29uZmlndXJlRXZlbnRzKG5vZGUsIGNvbmZpZywgaSkge1xyXG4gIC8vZGV4LmNvbnNvbGUubG9nKFwiQ29uZmlndXJlIEV2ZW50c1wiLCBjb25maWcsIGkpO1xyXG4gIGlmIChjb25maWcpIHtcclxuICAgIGZvciAodmFyIGtleSBpbiBjb25maWcpIHtcclxuICAgICAgLy9kZXguY29uc29sZS5sb2coXCJLRVlcIiwga2V5LCBcIlZBTFVFXCIsIGNvbmZpZ1trZXldKTtcclxuICAgICAgZGV4LmNvbmZpZy5zZXRFdmVudEhhbmRsZXIobm9kZSwga2V5LCBjb25maWdba2V5XSwgaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9kZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBDb25zdHJ1Y3QgYW4gbGluZSBzcGVjaWZpY2F0aW9uIHdoaWNoIGFsbG93cyB0aGUgdXNlciB0byBvdmVycmlkZSBhbnlcclxuICogb2YgdGhlIHNldHRpbmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2QzbGluZV9zcGVjfSBjdXN0b20gLSBUaGUgdXNlcnMgY3VzdG9taXphdGlvbnMuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkM2xpbmVfc3BlY30gQSBsaW5lIHNwZWNpZmljYXRpb24gZ2VuZXJhdGVkIGJ5IGNvbWJpbmluZyB0aGVcclxuICogZGVmYXVsdCB3aXRoIHRoZSB1c2VyJ3MgY3VzdG9taXphdGlvbnMuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmxpbmUgPSBmdW5jdGlvbiBsaW5lKGN1c3RvbSkge1xyXG4gIHZhciBkZWZhdWx0cyA9XHJcbiAge1xyXG4gICAgJ3N0YXJ0JyAgICAgICA6IGRleC5jb25maWcucG9pbnQoKSxcclxuICAgICdlbmQnICAgICAgICAgOiBkZXguY29uZmlnLnBvaW50KCksXHJcbiAgICAnc3Ryb2tlJyAgICAgIDogZGV4LmNvbmZpZy5zdHJva2UoKSxcclxuICAgICdmaWxsJyAgICAgICAgOiBkZXguY29uZmlnLmZpbGwoKSxcclxuICAgICdpbnRlcnBvbGF0ZScgOiB1bmRlZmluZWRcclxuICB9O1xyXG4gIHZhciBjb25maWcgPSBkZXguY29uZmlnLmV4cGFuZEFuZE92ZXJsYXkoY3VzdG9tLCBkZWZhdWx0cyk7XHJcbiAgcmV0dXJuIGNvbmZpZztcclxufTtcclxuXHJcbmV4cG9ydHMuY29uZmlndXJlTGluZSA9IGZ1bmN0aW9uIGNvbmZpZ3VyZUxpbmUobm9kZSwgY29uZmlnLCBpKSB7XHJcbiAgaWYgKGNvbmZpZykge1xyXG4gICAgZGV4LmNvbmZpZy5zZXRBdHRyKG5vZGUsICd4MScsIGNvbmZpZy5zdGFydC54LCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAneTEnLCBjb25maWcuc3RhcnQueSwgaSk7XHJcbiAgICBkZXguY29uZmlnLnNldEF0dHIobm9kZSwgJ3gyJywgY29uZmlnLmVuZC54LCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCAneTInLCBjb25maWcuZW5kLnksIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5jb25maWd1cmVTdHJva2Uobm9kZSwgY29uZmlnLnN0cm9rZSwgaSk7XHJcbiAgICBkZXguY29uZmlnLmNvbmZpZ3VyZUZpbGwobm9kZSwgY29uZmlnLmZpbGwsIGkpO1xyXG4gICAgaWYgKGNvbmZpZy5pbnRlcnBvbGF0ZSkge1xyXG4gICAgICAvL2RleC5jb25zb2xlLmxvZyhcImludGVycG9sYXRlXCIsIG5vZGUsIGNvbmZpZywgaSk7XHJcbiAgICAgIG5vZGUuaW50ZXJwb2xhdGUoY29uZmlnLmludGVycG9sYXRlKTtcclxuICAgICAgLy8gSSB0aGluayB0aGlzIGlzIGNsb3NlciB0byBjb3JyZWN0Li4uLmJ1dCBicmVha3MgdGhlIG1vdGlvbiBsaW5lIGNoYXJ0XHJcbiAgICAgIC8vbm9kZS5pbnRlcnBvbGF0ZShkZXguY29uZmlnLm9wdGlvblZhbHVlKGNvbmZpZy5pbnRlcnBvbGF0ZSwgaSkpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbm9kZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBDb25zdHJ1Y3QgYW4gcGF0aCBzcGVjaWZpY2F0aW9uIHdoaWNoIGFsbG93cyB0aGUgdXNlciB0byBvdmVycmlkZSBhbnlcclxuICogb2YgdGhlIHNldHRpbmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2QzcGF0aF9zcGVjfSBjdXN0b20gLSBUaGUgdXNlcnMgY3VzdG9taXphdGlvbnMuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkM3BhdGhfc3BlY30gQSBwYXRoIHNwZWNpZmljYXRpb24gZ2VuZXJhdGVkIGJ5IGNvbWJpbmluZyB0aGVcclxuICogZGVmYXVsdCB3aXRoIHRoZSB1c2VyJ3MgY3VzdG9taXphdGlvbnMuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLnBhdGggPSBmdW5jdGlvbiBwYXRoKGN1c3RvbSkge1xyXG4gIHZhciBkZWZhdWx0cyA9XHJcbiAge1xyXG4gICAgJ2ZpbGwnICAgOiBkZXguY29uZmlnLmZpbGwoKSxcclxuICAgICdzdHJva2UnIDogZGV4LmNvbmZpZy5zdHJva2UoKVxyXG4gIH07XHJcbiAgdmFyIGNvbmZpZyA9IGRleC5jb25maWcuZXhwYW5kQW5kT3ZlcmxheShjdXN0b20sIGRlZmF1bHRzKTtcclxuICByZXR1cm4gY29uZmlnO1xyXG59O1xyXG5cclxuZXhwb3J0cy5jb25maWd1cmVQYXRoID0gZnVuY3Rpb24gY29uZmlndXJlUGF0aChub2RlLCBjb25maWcsIGkpIHtcclxuICBpZiAoY29uZmlnKSB7XHJcbiAgICBkZXguY29uZmlnLmNvbmZpZ3VyZUZpbGwobm9kZSwgY29uZmlnLmZpbGwsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5jb25maWd1cmVTdHJva2Uobm9kZSwgY29uZmlnLnN0cm9rZSwgaSk7XHJcbiAgfVxyXG4gIHJldHVybiBub2RlO1xyXG59O1xyXG5cclxuZXhwb3J0cy5nZXRDYWxsZXJzID0gZnVuY3Rpb24gZ2V0Q2FsbGVycyhjYWxsZXIpIHtcclxuICB2YXIgY2FsbGVycyA9IFtdO1xyXG4gIHZhciBjdXJyZW50Q2FsbGVyID0gY2FsbGVyO1xyXG4gIGZvciAoOyBjdXJyZW50Q2FsbGVyOyBjdXJyZW50Q2FsbGVyID0gY3VycmVudENhbGxlci5jYWxsZXIpIHtcclxuICAgIGlmIChjdXJyZW50Q2FsbGVyLm5hbWUpIHtcclxuICAgICAgY2FsbGVycy5wdXNoKGN1cnJlbnRDYWxsZXIubmFtZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY2FsbGVycy5yZXZlcnNlKCk7XHJcbn1cclxuXHJcbmV4cG9ydHMuZ2V0Q2FsbGVyU3RyaW5nID0gZnVuY3Rpb24gZ2V0Q2FsbGVyU3RyaW5nKGNhbGxlcikge1xyXG4gIHJldHVybiBkZXguY29uZmlnLmdldENhbGxlcnMoY2FsbGVyKS5qb2luKFwiLT5cIik7XHJcbn1cclxuXHJcbmV4cG9ydHMuc2V0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gc2V0RXZlbnRIYW5kbGVyKG5vZGUsIGV2ZW50VHlwZSwgZXZlbnRIYW5kbGVyLCBpKSB7XHJcbiAgdmFyIGNhbGxlclN0ciA9IGRleC5jb25maWcuZ2V0Q2FsbGVyU3RyaW5nKGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyKTtcclxuXHJcbiAgLy9kZXguY29uc29sZS5kZWJ1ZyhjYWxsZXJTdHIgKyBcIjogc2V0RXZlbnRIYW5kbGVyKG5vZGU9XCIgKyBub2RlICsgXCIsIGV2ZW50VHlwZT1cIiArIGV2ZW50VHlwZSArIFwiLCBldmVudEhhbmRsZXI9XCIgKyBldmVudEhhbmRsZXIpO1xyXG4gIGlmICghbm9kZSkge1xyXG4gICAgZGV4LmNvbnNvbGUud2FybihjYWxsZXJTdHIgKyBcIjogZGV4LmNvbmZpZy5zZXRFdmVudEhhbmRsZXIoZXZlbnRUeXBlPSdcIiArIGV2ZW50VHlwZSArIFwiZXZlbnRIYW5kbGVyPVwiICsgZXZlbnRIYW5kbGVyICsgXCIpIDogbm9kZSBpcyBudWxsLlwiKTtcclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuICBpZiAoIWRleC5vYmplY3QuaXNGdW5jdGlvbihub2RlLm9uKSkge1xyXG4gICAgZGV4LmNvbnNvbGUud2FybihjYWxsZXJTdHIgKyBcIjogZGV4LmNvbmZpZy5zZXRFdmVudEhhbmRsZXIoZXZlbnRUeXBlPSdcIiArIGV2ZW50VHlwZSArIFwiJywgZXZlbnRIYW5kbGVyPSdcIiArIGV2ZW50SGFuZGxlciArXHJcbiAgICBcIicpIDogdGFyZ2V0IG5vZGUgaXMgbWlzc2luZyBmdW5jdGlvbjogbm9kZS5vbihldmVudFR5cGUsZXZlbnRIYW5kbGVyKS4gIE5vZGUgZHVtcDpcIiwgbm9kZSk7XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiBldmVudEhhbmRsZXIgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGRleC5jb25zb2xlLmRlYnVnKGNhbGxlclN0ciArIFwiOiBTZXQgRXZlbnQgSGFuZGxlcjogJ1wiICsgZXZlbnRUeXBlICsgXCInPSdcIiArIGV2ZW50SGFuZGxlciArIFwiJ1wiKTtcclxuICAgIG5vZGUub24oZXZlbnRUeXBlLCBldmVudEhhbmRsZXIpO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIGRleC5jb25zb2xlLmRlYnVnKGNhbGxlclN0ciArPSBcIjogVW5kZWZpbmVkIEV2ZW50IEhhbmRsZXI6ICdcIiArIGV2ZW50VHlwZSArIFwiJz0nXCIgKyBldmVudEhhbmRsZXIgKyBcIidcIik7XHJcbiAgfVxyXG4gIHJldHVybiBub2RlO1xyXG59O1xyXG5cclxuZXhwb3J0cy5zZXRBdHRyID0gZnVuY3Rpb24gc2V0QXR0cihub2RlLCBuYW1lLCB2YWx1ZSwgaSkge1xyXG4gIHZhciBjYWxsZXJTdHIgPSBkZXguY29uZmlnLmdldENhbGxlclN0cmluZyhhcmd1bWVudHMuY2FsbGVlLmNhbGxlcik7XHJcbiAgaWYgKCFub2RlKSB7XHJcbiAgICBkZXguY29uc29sZS53YXJuKGNhbGxlclN0ciArIFwiOiBkZXguY29uZmlnLnNldEF0dHIobmFtZT0nXCIgKyBuYW1lICsgXCJ2YWx1ZT1cIiArIHZhbHVlICsgXCIpIDogbm9kZSBpcyBudWxsLlwiKTtcclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuICBpZiAoIWRleC5vYmplY3QuaXNGdW5jdGlvbihub2RlLmF0dHIpKSB7XHJcbiAgICBkZXguY29uc29sZS53YXJuKGNhbGxlclN0ciArIFwiOiBkZXguY29uZmlnLnNldEF0dHIobmFtZT0nXCIgKyBuYW1lICsgXCInLCB2YWx1ZT0nXCIgKyB2YWx1ZSArXHJcbiAgICBcIicpIDogdGFyZ2V0IG5vZGUgaXMgbWlzc2luZyBmdW5jdGlvbjogbm9kZS5hdHRyLiAgTm9kZSBkdW1wOlwiLCBub2RlKTtcclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIHZhbHVlICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICBkZXguY29uc29sZS5kZWJ1ZyhjYWxsZXJTdHIgKyBcIjogU2V0IEF0dHI6ICdcIiArIG5hbWUgKyBcIic9J1wiICsgdmFsdWUgKyBcIidcIik7XHJcbiAgICBub2RlLmF0dHIobmFtZSwgZGV4LmNvbmZpZy5vcHRpb25WYWx1ZSh2YWx1ZSwgaSkpO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIGRleC5jb25zb2xlLmRlYnVnKGNhbGxlclN0ciArPSBcIjogVW5kZWZpbmVkIEF0dHI6ICdcIiArIG5hbWUgKyBcIic9J1wiICsgdmFsdWUgKyBcIidcIik7XHJcbiAgfVxyXG4gIHJldHVybiBub2RlO1xyXG59O1xyXG5cclxuZXhwb3J0cy5zZXRTdHlsZSA9IGZ1bmN0aW9uIHNldFN0eWxlKG5vZGUsIG5hbWUsIHZhbHVlLCBpKSB7XHJcbiAgdmFyIGNhbGxlclN0ciA9IGRleC5jb25maWcuZ2V0Q2FsbGVyU3RyaW5nKGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyKTtcclxuICBpZiAoIW5vZGUpIHtcclxuICAgIGRleC5jb25zb2xlLndhcm4oY2FsbGVyU3RyICsgXCI6IGRleC5jb25maWcuc2V0QXR0cihuYW1lPSdcIiArIG5hbWUgKyBcInZhbHVlPVwiICsgdmFsdWUgKyBcIikgOiBub2RlIGlzIG51bGwuXCIpO1xyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG4gIGlmICghZGV4Lm9iamVjdC5pc0Z1bmN0aW9uKG5vZGUuc3R5bGUpKSB7XHJcbiAgICBkZXguY29uc29sZS53YXJuKGNhbGxlclN0ciArIFwiOiBkZXguY29uZmlnLnNldFN0eWxlKG5hbWU9J1wiICsgbmFtZSArIFwiJywgdmFsdWU9J1wiICsgdmFsdWUgK1xyXG4gICAgXCInKSA6IHRhcmdldCBub2RlIGlzIG1pc3NpbmcgZnVuY3Rpb246IG5vZGUuc3R5bGUuICBOb2RlIER1bXA6XCIsIG5vZGUpO1xyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIG5vZGUgJiYgZGV4Lm9iamVjdC5pc0Z1bmN0aW9uKG5vZGUuc3R5bGUpKSB7XHJcbiAgICBkZXguY29uc29sZS5kZWJ1ZyhjYWxsZXJTdHIgKyBcIjogU2V0IFN0eWxlOiBuYW1lPSdcIiArIG5hbWUgKyBcIicsIFZhbHVlIER1bXA6XCIsXHJcbiAgICAgIGRleC5jb25maWcub3B0aW9uVmFsdWUodmFsdWUsIGkpKTtcclxuICAgIG5vZGUuc3R5bGUobmFtZSwgZGV4LmNvbmZpZy5vcHRpb25WYWx1ZSh2YWx1ZSwgaSkpO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIGRleC5jb25zb2xlLmRlYnVnKGNhbGxlclN0ciArIFwiOiBVbmRlZmluZWQgU3R5bGU6IG5hbWU9J1wiICsgbmFtZSArIFwiJywgVmFsdWUgRHVtcDpcIiwgdmFsdWUpO1xyXG4gIH1cclxuICByZXR1cm4gbm9kZTtcclxufTtcclxuXHJcbmV4cG9ydHMub3B0aW9uVmFsdWUgPSBmdW5jdGlvbiBvcHRpb25WYWx1ZShvcHRpb24sIGkpIHtcclxuICAvL2RleC5jb25zb2xlLmxvZyhcIk9QVElPTi1JOiBcIiArIGkpO1xyXG5cclxuICAvLyBDdXJyeSB2YWx1ZSBpOlxyXG4gIGlmICh0eXBlb2YgaSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAvL2RleC5jb25zb2xlLmxvZyhcIk9QVElPTlwiLCBvcHRpb24sIFwiRFwiLCBkLCBcIklcIiwgaSk7XHJcbiAgICAgIGlmIChkZXgub2JqZWN0LmlzRnVuY3Rpb24ob3B0aW9uKSkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb24oZCwgaSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGkpIHtcclxuICAgICAgLy9kZXguY29uc29sZS5sb2coXCJPUFRJT05cIiwgb3B0aW9uLCBcIkRcIiwgZCwgXCJJXCIsIGkpO1xyXG4gICAgICBpZiAoZGV4Lm9iamVjdC5pc0Z1bmN0aW9uKG9wdGlvbikpIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9uKGQsIGkpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIElzIHRoaXMgY29ycmVjdD8gIEl0IGxvb2tzIHN1c3BlY3QgdG8gbWUuXHJcbiAqXHJcbiAqIEBwYXJhbSBub2RlXHJcbiAqIEBwYXJhbSBmblxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICogQHBhcmFtIGlcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnRzLmNhbGxJZkRlZmluZWQgPSBmdW5jdGlvbiBjYWxsSWZEZWZpbmVkKG5vZGUsIGZuLCB2YWx1ZSwgaSkge1xyXG4gIC8vZGV4LmNvbnNvbGUubG9nKFwiQ0FMTC1JRi1ERUZJTkVEOiBmbj1cIiArIGZuICsgXCIsIHZhbHVlPVwiICsgdmFsdWUgKyBcIiwgST1cIiArIGkpO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAvL2RleC5jb25zb2xlLmxvZyhcIlNraXBwaW5nOiBcIiArIGZuICsgXCIoKVwiKTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICAvL2RleC5jb25zb2xlLmxvZyhcIkNhbGxpbmc6ICdcIiArIGZuICsgXCIoXCIgKyB2YWx1ZSArIFwiKVwiKTtcclxuICAgIHJldHVybiBub2RlW2ZuXShkZXguY29uZmlnLm9wdGlvblZhbHVlKHZhbHVlLCBpKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9kZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBDb25zdHJ1Y3QgYW4gcG9pbnQgc3BlY2lmaWNhdGlvbiB3aGljaCBhbGxvd3MgdGhlIHVzZXIgdG8gb3ZlcnJpZGUgYW55XHJcbiAqIG9mIHRoZSBzZXR0aW5ncy5cclxuICpcclxuICogQHBhcmFtIHtkM3BvaW50X3NwZWN9IGN1c3RvbSAtIFRoZSB1c2VycyBjdXN0b21pemF0aW9ucy5cclxuICpcclxuICogQHJldHVybnMge2QzcG9pbnRfc3BlY30gQSBwb2ludCBzcGVjaWZpY2F0aW9uIGdlbmVyYXRlZCBieSBjb21iaW5pbmcgdGhlXHJcbiAqIGRlZmF1bHQgd2l0aCB0aGUgdXNlcidzIGN1c3RvbWl6YXRpb25zLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5wb2ludCA9IGZ1bmN0aW9uIHBvaW50KGN1c3RvbSkge1xyXG4gIHZhciBjb25maWcgPVxyXG4gIHtcclxuICAgICd4JyA6IHVuZGVmaW5lZCxcclxuICAgICd5JyA6IHVuZGVmaW5lZFxyXG4gIH07XHJcbiAgaWYgKGN1c3RvbSkge1xyXG4gICAgY29uZmlnID0gZGV4Lm9iamVjdC5vdmVybGF5KGN1c3RvbSwgY29uZmlnKTtcclxuICB9XHJcbiAgcmV0dXJuIGNvbmZpZztcclxufTtcclxuXHJcbmV4cG9ydHMuY29uZmlndXJlUG9pbnQgPSBmdW5jdGlvbiBjb25maWd1cmVQb2ludChub2RlLCBjb25maWcsIGkpIHtcclxuICBpZiAoY29uZmlnKSB7XHJcbiAgICBub2RlXHJcbiAgICAgIC5hdHRyKCd4JywgZGV4LmNvbmZpZy5vcHRpb25WYWx1ZShjb25maWcuY2VudGVyLmN4LCBpKSlcclxuICAgICAgLmF0dHIoJ3knLCBkZXguY29uZmlnLm9wdGlvblZhbHVlKGNvbmZpZy5jZW50ZXIuY3ksIGkpKTtcclxuICB9XHJcbiAgcmV0dXJuIG5vZGU7XHJcbn07XHJcblxyXG4vLyBDb25maWd1cmVzOiBvcGFjaXR5LCBjb2xvciwgc3Ryb2tlLlxyXG5leHBvcnRzLmNvbmZpZ3VyZVNoYXBlU3R5bGUgPSBmdW5jdGlvbiBjb25maWd1cmVTaGFwZVN0eWxlKG5vZGUsIGNvbmZpZywgaSkge1xyXG4gIGlmIChjb25maWcpIHtcclxuICAgIG5vZGVcclxuICAgICAgLmNhbGwoZGV4LmNvbmZpZy5jb25maWd1cmVTdHJva2UsIGNvbmZpZy5zdHJva2UsIGkpXHJcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgY29uZmlnLm9wYWNpdHkpXHJcbiAgICAgIC5zdHlsZSgnZmlsbCcsIGNvbmZpZy5jb2xvcik7XHJcbiAgfVxyXG4gIHJldHVybiBub2RlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIENvbnN0cnVjdCBhbiBjaXJjbGUgc3BlY2lmaWNhdGlvbiB3aGljaCBhbGxvd3MgdGhlIHVzZXIgdG8gb3ZlcnJpZGUgYW55XHJcbiAqIG9mIHRoZSBzZXR0aW5ncy5cclxuICpcclxuICogQHBhcmFtIHtkM2NpcmNsZV9zcGVjfSBjdXN0b20gLSBUaGUgdXNlcnMgY3VzdG9taXphdGlvbnMuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkM2NpcmNsZV9zcGVjfSBBIGNpcmNsZSBzcGVjaWZpY2F0aW9uIGdlbmVyYXRlZCBieSBjb21iaW5pbmcgdGhlXHJcbiAqIGRlZmF1bHQgd2l0aCB0aGUgdXNlcidzIGN1c3RvbWl6YXRpb25zLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5jaXJjbGUgPSBmdW5jdGlvbiBjaXJjbGUoY3VzdG9tKSB7XHJcbiAgdmFyIGNvbmZpZyA9XHJcbiAge1xyXG4gICAgJ2N4JyAgICAgICAgOiAwLFxyXG4gICAgJ2N5JyAgICAgICAgOiAwLFxyXG4gICAgJ3InICAgICAgICAgOiAxMCxcclxuICAgICdmaWxsJyAgICAgIDogZGV4LmNvbmZpZy5maWxsKCksXHJcbiAgICAnc3Ryb2tlJyAgICA6IGRleC5jb25maWcuc3Ryb2tlKCksXHJcbiAgICAndHJhbnNmb3JtJyA6ICcnLFxyXG4gICAgJ3RpdGxlJyAgICAgOiAnJyxcclxuICAgICdldmVudHMnICAgIDogZGV4LmNvbmZpZy5ldmVudHMoKVxyXG4gIH07XHJcbiAgaWYgKGN1c3RvbSkge1xyXG4gICAgY29uZmlnID0gZGV4Lm9iamVjdC5vdmVybGF5KGN1c3RvbSwgY29uZmlnKTtcclxuICB9XHJcbiAgcmV0dXJuIGNvbmZpZztcclxufTtcclxuXHJcbmV4cG9ydHMuY29uZmlndXJlQ2lyY2xlID0gZnVuY3Rpb24gY29uZmlndXJlQ2lyY2xlKG5vZGUsIGNvbmZpZywgaSkge1xyXG4gIGlmIChjb25maWcpIHtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCBcInJcIiwgY29uZmlnLnIsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5zZXRBdHRyKG5vZGUsIFwiY3hcIiwgY29uZmlnLmN4LCBpKTtcclxuICAgIGRleC5jb25maWcuc2V0QXR0cihub2RlLCBcImN5XCIsIGNvbmZpZy5jeSwgaSk7XHJcbiAgICBkZXguY29uZmlnLnNldEF0dHIobm9kZSwgXCJ0cmFuc2Zvcm1cIiwgY29uZmlnLnRyYW5zZm9ybSwgaSk7XHJcbiAgICBkZXguY29uZmlnLnNldEF0dHIobm9kZSwgXCJ0aXRsZVwiLCBjb25maWcudGl0bGUsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5jb25maWd1cmVTdHJva2Uobm9kZSwgY29uZmlnLnN0cm9rZSwgaSk7XHJcbiAgICBkZXguY29uZmlnLmNvbmZpZ3VyZUZpbGwobm9kZSwgY29uZmlnLmZpbGwsIGkpO1xyXG4gICAgZGV4LmNvbmZpZy5jb25maWd1cmVFdmVudHMobm9kZSwgY29uZmlnLmV2ZW50cywgaSk7XHJcbiAgfVxyXG4gIHJldHVybiBub2RlO1xyXG59O1xyXG5cclxuLypcclxuIGV4cG9ydHMuY29uZmlndXJlQXhpc19kZXByZWNhdGVkID0gZnVuY3Rpb24gY29uZmlndXJlQXhpc19kZXByZWNhdGVkKGNvbmZpZykge1xyXG4gdmFyIGF4aXM7XHJcblxyXG4gaWYgKGNvbmZpZykge1xyXG4gdmFyIGF4aXMgPSBkMy5zdmcuYXhpcygpXHJcbiAudGlja3MoY29uZmlnLnRpY2suY291bnQpXHJcbiAudGlja1N1YmRpdmlkZShjb25maWcudGljay5zdWJkaXZpZGUpXHJcbiAudGlja1NpemUoY29uZmlnLnRpY2suc2l6ZS5tYWpvciwgY29uZmlnLnRpY2suc2l6ZS5taW5vcixcclxuIGNvbmZpZy50aWNrLnNpemUuZW5kKVxyXG4gLnRpY2tQYWRkaW5nKGNvbmZpZy50aWNrLnBhZGRpbmcpO1xyXG5cclxuIC8vIFJFTTogSG9ycmlibGUgd2F5IG9mIGRvaW5nIHRoaXMuICBOZWVkIGEgZnVuY3Rpb24gd2hpY2hcclxuIC8vIGlzIG1vcmUgZ2VuZXJpYyBhbmQgc21hcnRlciB0byBzaG9ydCBjaXJjdWl0IHN0dWZmIGxpa2VcclxuIC8vIHRoaXMuICBCdXQuLi5mb3Igbm93IGl0IGRvZXMgd2hhdCBJIHdhbnQuXHJcbiBpZiAoIWRleC5vYmplY3QuaXNGdW5jdGlvbihjb25maWcudGljay5mb3JtYXQpKSB7XHJcbiBheGlzLnRpY2tGb3JtYXQoY29uZmlnLnRpY2suZm9ybWF0KTtcclxuIH1cclxuXHJcbiBheGlzXHJcbiAub3JpZW50KGNvbmZpZy5vcmllbnQpXHJcbiAuc2NhbGUoY29uZmlnLnNjYWxlKTtcclxuIH1cclxuIGVsc2Uge1xyXG4gYXhpcyA9IGQzLnN2Zy5heGlzKCk7XHJcbiB9XHJcbiAvL2F4aXMuc2NhbGUgPSBjb25maWcuc2NhbGU7XHJcbiByZXR1cm4gYXhpcztcclxuIH07XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIENvbnN0cnVjdCBhbiB0aWNrIHNwZWNpZmljYXRpb24gd2hpY2ggYWxsb3dzIHRoZSB1c2VyIHRvIG92ZXJyaWRlIGFueVxyXG4gKiBvZiB0aGUgc2V0dGluZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7ZDN0aWNrX3NwZWN9IGN1c3RvbSAtIFRoZSB1c2VycyBjdXN0b21pemF0aW9ucy5cclxuICpcclxuICogQHJldHVybnMge2QzdGlja19zcGVjfSBBIHRpY2sgc3BlY2lmaWNhdGlvbiBnZW5lcmF0ZWQgYnkgY29tYmluaW5nIHRoZVxyXG4gKiBkZWZhdWx0IHdpdGggdGhlIHVzZXIncyBjdXN0b21pemF0aW9ucy5cclxuICpcclxuICovXHJcbmV4cG9ydHMudGljayA9IGZ1bmN0aW9uIHRpY2soY3VzdG9tKSB7XHJcbiAgdmFyIGNvbmZpZyA9XHJcbiAge1xyXG4gICAgJ2NvdW50JyAgICAgOiA1LFxyXG4gICAgLy8ndGlja1ZhbHVlcycgIDogdW5kZWZpbmVkLFxyXG4gICAgJ3N1YmRpdmlkZScgOiAzLFxyXG4gICAgJ3NpemUnICAgICAgOiB7XHJcbiAgICAgICdtYWpvcicgOiA1LFxyXG4gICAgICAnbWlub3InIDogMyxcclxuICAgICAgJ2VuZCcgICA6IDVcclxuICAgIH0sXHJcbiAgICAncGFkZGluZycgICA6IDUsXHJcbiAgICAnZm9ybWF0JyAgICA6IGQzLmZvcm1hdChcIixkXCIpLFxyXG4gICAgJ2xhYmVsJyAgICAgOiBkZXguY29uZmlnLnRleHQoKVxyXG4gIH07XHJcbiAgaWYgKGN1c3RvbSkge1xyXG4gICAgY29uZmlnID0gZGV4Lm9iamVjdC5vdmVybGF5KGN1c3RvbSwgY29uZmlnKTtcclxuICB9XHJcbiAgcmV0dXJuIGNvbmZpZztcclxufTtcclxuXHJcbi8qXHJcbiBleHBvcnRzLnhheGlzX2RlcHJlY2F0ZSA9IGZ1bmN0aW9uIChjdXN0b20pIHtcclxuIHZhciBjb25maWcgPVxyXG4ge1xyXG4gJ3NjYWxlJyAgOiBkMy5zY2FsZS5saW5lYXIoKSxcclxuICdvcmllbnQnIDogXCJib3R0b21cIixcclxuICd0aWNrJyAgIDogdGhpcy50aWNrKCksXHJcbiAnbGFiZWwnICA6IGRleC5jb25maWcudGV4dCgpXHJcbiB9O1xyXG4gaWYgKGN1c3RvbSkge1xyXG4gY29uZmlnID0gZGV4Lm9iamVjdC5vdmVybGF5KGN1c3RvbSwgY29uZmlnKTtcclxuIH1cclxuIHJldHVybiBjb25maWc7XHJcbiB9O1xyXG5cclxuIGV4cG9ydHMueWF4aXNfZGVwcmVjYXRlID0gZnVuY3Rpb24gKGN1c3RvbSkge1xyXG4gdmFyIGNvbmZpZyA9XHJcbiB7XHJcbiAnc2NhbGUnICA6IGQzLnNjYWxlLmxpbmVhcigpLFxyXG4gJ29yaWVudCcgOiAnbGVmdCcsXHJcbiAndGljaycgICA6IHRoaXMudGljaygpLFxyXG4gJ2xhYmVsJyAgOiBkZXguY29uZmlnLnRleHQoeyd0cmFuc2Zvcm0nIDogJ3JvdGF0ZSgtOTApJ30pXHJcbiB9O1xyXG4gaWYgKGN1c3RvbSkge1xyXG4gY29uZmlnID0gZGV4Lm9iamVjdC5vdmVybGF5KGN1c3RvbSwgY29uZmlnKTtcclxuIH1cclxuIHJldHVybiBjb25maWc7XHJcbiB9O1xyXG4gKi9cclxuXHJcbmV4cG9ydHMuY2FsbENvbmRpdGlvbmFsbHkgPSBmdW5jdGlvbiBjYWxsQ29uZGl0aW9uYWxseShmbiwgdmFsdWUsIGkpIHtcclxuICAvL2RleC5jb25zb2xlLmxvZyhcIi0gRk46XCIgKyBmbik7XHJcbiAgLy9kZXguY29uc29sZS5sb2coXCItIFZBTFVFOlwiICsgdmFsdWUpO1xyXG4gIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAvL2RleC5jb25zb2xlLmxvZyhcIi0gQ0FMTElORzogXCIgKyBmbiArIFwiIG9mIFwiICsgdmFsdWUpO1xyXG4gICAgaWYgKGkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBmbih2YWx1ZSwgaSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgZm4odmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIHtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQ29uZmlndXJlIHRoZSBpbnB1dCBwYXJhbWV0ZXJzIGZvciBjb25maWd1cmluZyBhbiBheGlzLlxyXG4gKiBDZXJ0YWluIGRlZmF1bHRzIGFyZSBpbXBvc2VkIHNob3VsZCB0aGUgXCJjdXN0b21cIiB2YXJpYWJsZVxyXG4gKiBub3Qgc3BlY2lmeSB0aGF0IHBhcmFtZXRlci5cclxuICpcclxuICogQHBhcmFtIGN1c3RvbSBUaGUgdXNlciBzdXBwbGllZCBheGlzIGNvbmZpZ3VyYXRpb24uXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkM2F4aXNfc3BlY30gVGhlIGF4aXMgc3BlY2lmaWNhdGlvbiB3aXRoXHJcbiAqIHVzZXIgc3VwcGxpZWQgb3ZlcnJpZGVzIGFwcGxpZWQuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmF4aXMgPSBmdW5jdGlvbiBheGlzKGN1c3RvbSkge1xyXG4gIHZhciBkZWZhdWx0cyA9XHJcbiAge1xyXG4gICAgJ3NjYWxlJyAgICAgICAgIDogZGV4LmNvbmZpZy5zY2FsZSh7J3R5cGUnIDogJ2xpbmVhcid9KSxcclxuICAgICdvcmllbnQnICAgICAgICA6ICdib3R0b20nLFxyXG4gICAgJ3RpY2tzJyAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgJ3RpY2tWYWx1ZXMnICAgIDogdW5kZWZpbmVkLFxyXG4gICAgJ3RpY2tTaXplJyAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgJ2lubmVyVGlja1NpemUnIDogdW5kZWZpbmVkLFxyXG4gICAgJ291dGVyVGlja1NpemUnIDogdW5kZWZpbmVkLFxyXG4gICAgJ3RpY2tQYWRkaW5nJyAgIDogdW5kZWZpbmVkLFxyXG4gICAgJ3RpY2tGb3JtYXQnICAgIDogdW5kZWZpbmVkXHJcbiAgICAvLydsYWJlbCcgICAgICAgICA6IGRleC5jb25maWcudGV4dCgpXHJcbiAgfTtcclxuXHJcbiAgdmFyIGF4aXNTcGVjID0gZGV4LmNvbmZpZy5leHBhbmRBbmRPdmVybGF5KGN1c3RvbSwgZGVmYXVsdHMpO1xyXG4gIHJldHVybiBheGlzU3BlYztcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBDcmVhdGUgYW4gYXhpcyB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlndXJhdGlvbi5cclxuICpcclxuICogQHBhcmFtIGF4aXMgVGhlIGF4aXMgdG8gY29uZmlndXJlLlxyXG4gKiBAcGFyYW0gY29uZmlnIFRoZSB1c2VyIHNwZWNpZmllZCBheGlzIGNvbmZpZ3VyYXRpb24uXHJcbiAqXHJcbiAqIEByZXR1cm5zIHsqfSBUaGUgbmV3bHkgY29uZmlndXJlZCBheGlzLlxyXG4gKi9cclxuZXhwb3J0cy5jb25maWd1cmVBeGlzID0gZnVuY3Rpb24gY29uZmlndXJlQXhpcyhheGlzLCBjb25maWcsIGkpIHtcclxuICAvL2RleC5jb25zb2xlLmxvZyhcIkNPTkZBWElTOiBcIiArIGkpO1xyXG4gIGlmIChjb25maWcpIHtcclxuICAgIFtcclxuICAgICAgJ3NjYWxlJyxcclxuICAgICAgJ29yaWVudCcsXHJcbiAgICAgICd0aWNrcycsXHJcbiAgICAgICd0aWNrVmFsdWVzJyxcclxuICAgICAgJ3RpY2tTaXplJyxcclxuICAgICAgJ2lubmVyVGlja1NpemUnLFxyXG4gICAgICAnb3V0ZXJUaWNrU2l6ZScsXHJcbiAgICAgICd0aWNrUGFkZGluZycsXHJcbiAgICAgICd0aWNrRm9ybWF0J1xyXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xyXG4gICAgICAgIC8vZGV4LmNvbnNvbGUubG9nKFwiQ2FsbGluZzogXCIgKyBmbik7XHJcbiAgICAgICAgZGV4LmNvbmZpZy5jYWxsQ29uZGl0aW9uYWxseShheGlzW2ZuXSwgY29uZmlnW2ZuXSwgaSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuICByZXR1cm4gYXhpcztcclxufTtcclxuXHJcbmV4cG9ydHMuY3JlYXRlQXhpcyA9IGZ1bmN0aW9uIGNyZWF0ZUF4aXModXNlckNvbmZpZywgaSkge1xyXG4gIHZhciBjb25maWcgPSBkZXguY29uZmlnLmF4aXModXNlckNvbmZpZyk7XHJcbiAgcmV0dXJuIGRleC5jb25maWcuY29uZmlndXJlQXhpcyhkMy5zdmcuYXhpcygpLCBjb25maWcsIGkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIENvbnN0cnVjdCBhIHtkM2F4aXNfc3BlY30gYmFzZWQgb24gcmVhc29uYWJsZSBkZWZhdWx0cyB3aXRoXHJcbiAqIHVzZXIgY3VzdG9taXphdGlvbnMgYXBwbGllZCBvbiB0b3AuXHJcbiAqXHJcbiAqIEBwYXJhbSBjdXN0b20gVGhlIHVzZXIgY3VzdG9taXphdGlvbnMuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkM3NjYWxlX3NwZWN9IFRoZSBzY2FsZSBzcGVjaWZpY2F0aW9uIHdpdGhcclxuICogdXNlciBzdXBwbGllZCBvdmVycmlkZXMgYXBwbGllZC5cclxuICpcclxuICovXHJcbmV4cG9ydHMuc2NhbGUgPSBmdW5jdGlvbiBzY2FsZShjdXN0b20pIHtcclxuICB2YXIgZm1hcCA9XHJcbiAge1xyXG4gICAgJ2xpbmVhcicgICA6IGRleC5jb25maWcubGluZWFyU2NhbGUsXHJcbiAgICAnc3FydCcgICAgIDogZGV4LmNvbmZpZy5zcXJ0U2NhbGUsXHJcbiAgICAncG93JyAgICAgIDogZGV4LmNvbmZpZy5wb3dTY2FsZSxcclxuICAgICd0aW1lJyAgICAgOiBkZXguY29uZmlnLnRpbWVTY2FsZSxcclxuICAgICdsb2cnICAgICAgOiBkZXguY29uZmlnLmxvZ1NjYWxlLFxyXG4gICAgJ29yZGluYWwnICA6IGRleC5jb25maWcub3JkaW5hbFNjYWxlLFxyXG4gICAgJ3F1YW50aWxlJyA6IGRleC5jb25maWcucXVhbnRpbGVTY2FsZSxcclxuICAgICdxdWFudGl6ZScgOiBkZXguY29uZmlnLnF1YW50aXplU2NhbGUsXHJcbiAgICAnaWRlbnRpdHknIDogZGV4LmNvbmZpZy5pZGVudGl0eVNjYWxlXHJcbiAgfTtcclxuXHJcbiAgdmFyIGRlZmF1bHRzID1cclxuICB7XHJcbiAgICAndHlwZScgOiAnbGluZWFyJ1xyXG4gIH07XHJcblxyXG4gIHZhciBjb25maWcgPSBkZXguY29uZmlnLmV4cGFuZEFuZE92ZXJsYXkoY3VzdG9tLCBkZWZhdWx0cyk7XHJcblxyXG4gIHJldHVybiBmbWFwW2NvbmZpZy50eXBlXShjb25maWcpO1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICogR2l2ZW4gYSBzY2FsZSBzcGVjaWZpY2F0aW9uLCBjcmVhdGUsIGNvbmZpZ3VyZSwgYW5kIHJldHVybiBhXHJcbiAqIHNjYWxlIHdoaWNoIG1lZXRzIHRoYXQgc3BlY2lmaWNhdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtkM3NjYWxlX3NwZWN9IHNjYWxlU3BlY1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGEgZDMuc2NhbGUgd2l0aCB0aGUgc3VwcGxpZWQgc3BlY2lmaWNhdGlvbi5cclxuICpcclxuICovXHJcbmV4cG9ydHMuY3JlYXRlU2NhbGUgPSBmdW5jdGlvbiBjcmVhdGVTY2FsZShzY2FsZVNwZWMpIHtcclxuICB2YXIgc2NhbGU7XHJcblxyXG4gIHZhciBmbWFwID1cclxuICB7XHJcbiAgICAnbGluZWFyJyAgIDogZDMuc2NhbGUubGluZWFyLFxyXG4gICAgJ3NxcnQnICAgICA6IGQzLnNjYWxlLnNxcnQsXHJcbiAgICAncG93JyAgICAgIDogZDMuc2NhbGUucG93LFxyXG4gICAgJ3RpbWUnICAgICA6IGQzLnRpbWUuc2NhbGUsXHJcbiAgICAnbG9nJyAgICAgIDogZDMuc2NhbGUubG9nLFxyXG4gICAgJ29yZGluYWwnICA6IGQzLnNjYWxlLm9yZGluYWwsXHJcbiAgICAncXVhbnRpbGUnIDogZDMuc2NhbGUucXVhbnRpbGUsXHJcbiAgICAncXVhbnRpemUnIDogZDMuc2NhbGUucXVhbnRpemUsXHJcbiAgICAnaWRlbnRpdHknIDogZDMuc2NhbGUuaWRlbnRpdHlcclxuICB9O1xyXG5cclxuICBpZiAoc2NhbGVTcGVjKSB7XHJcbiAgICBzY2FsZSA9IGZtYXBbc2NhbGVTcGVjLnR5cGVdKCk7XHJcblxyXG4gICAgLy8gU2luY2Ugd2UgY3JlYXRlIGEgbm9uLXBhcmFtZXRlcml6ZWQgc2NhbGUsIGhlcmUgd2UgcGFyYW1ldGVyaXplIGl0IGJhc2VkIHVwb25cclxuICAgIC8vIHRoZSBzdXBwbGllZCBzcGVjaWZpY2F0aW9uXHJcbiAgICBkZXguY29uZmlnLmNvbmZpZ3VyZVNjYWxlKHNjYWxlLCBzY2FsZVNwZWMpO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIHNjYWxlID0gZDMuc2NhbGUubGluZWFyKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc2NhbGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBDb25zdHJ1Y3QgYSBsaW5lYXIge2Qzc2NhbGVfc3BlY30gYmFzZWQgb24gcmVhc29uYWJsZVxyXG4gKiBkZWZhdWx0cyB3aXRoIHVzZXIgY3VzdG9taXphdGlvbnMgYXBwbGllZCBvbiB0b3AuXHJcbiAqXHJcbiAqIEBwYXJhbSBjdXN0b20gVGhlIHVzZXIgY3VzdG9taXphdGlvbnMuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkM3NjYWxlX3NwZWN9IFRoZSBsaW5lYXIgc2NhbGUgc3BlY2lmaWNhdGlvbiB3aXRoXHJcbiAqIHVzZXIgc3VwcGxpZWQgb3ZlcnJpZGVzIGFwcGxpZWQuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmxpbmVhclNjYWxlID0gZnVuY3Rpb24gbGluZWFyU2NhbGUoY3VzdG9tKSB7XHJcbiAgdmFyIGRlZmF1bHRzID1cclxuICB7XHJcbiAgICAndHlwZScgICAgICAgIDogJ2xpbmVhcicsXHJcbiAgICAnZG9tYWluJyAgICAgIDogWzAsIDEwMF0sXHJcbiAgICAncmFuZ2UnICAgICAgIDogWzAsIDgwMF0sXHJcbiAgICAncmFuZ2VSb3VuZCcgIDogdW5kZWZpbmVkLFxyXG4gICAgJ2ludGVycG9sYXRlJyA6IHVuZGVmaW5lZCxcclxuICAgICdjbGFtcCcgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICAnbmljZScgICAgICAgIDogdW5kZWZpbmVkXHJcbiAgfTtcclxuXHJcbiAgdmFyIGxpbmVhclNjYWxlU3BlYyA9IGRleC5jb25maWcuZXhwYW5kQW5kT3ZlcmxheShjdXN0b20sIGRlZmF1bHRzKTtcclxuICByZXR1cm4gbGluZWFyU2NhbGVTcGVjO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIENvbnN0cnVjdCBhIHBvd2VyIHtkM3NjYWxlX3NwZWN9IGJhc2VkIG9uIHJlYXNvbmFibGVcclxuICogZGVmYXVsdHMgd2l0aCB1c2VyIGN1c3RvbWl6YXRpb25zIGFwcGxpZWQgb24gdG9wLlxyXG4gKlxyXG4gKiBAcGFyYW0gY3VzdG9tIFRoZSB1c2VyIGN1c3RvbWl6YXRpb25zLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7ZDNzY2FsZV9zcGVjfSBUaGUgcG93ZXIgc2NhbGUgc3BlY2lmaWNhdGlvbiB3aXRoXHJcbiAqIHVzZXIgc3VwcGxpZWQgb3ZlcnJpZGVzIGFwcGxpZWQuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLnBvd1NjYWxlID0gZnVuY3Rpb24gcG93U2NhbGUoY3VzdG9tKSB7XHJcbiAgdmFyIGRlZmF1bHRzID1cclxuICB7XHJcbiAgICAndHlwZScgICAgICAgIDogJ3BvdycsXHJcbiAgICAnZG9tYWluJyAgICAgIDogWzAsIDEwMF0sXHJcbiAgICAncmFuZ2UnICAgICAgIDogWzAsIDgwMF0sXHJcbiAgICAncmFuZ2VSb3VuZCcgIDogdW5kZWZpbmVkLFxyXG4gICAgJ2ludGVycG9sYXRlJyA6IHVuZGVmaW5lZCxcclxuICAgICdjbGFtcCcgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICAnbmljZScgICAgICAgIDogdW5kZWZpbmVkXHJcbiAgfTtcclxuXHJcbiAgdmFyIGNvbmZpZyA9IGRleC5jb25maWcuZXhwYW5kQW5kT3ZlcmxheShjdXN0b20sIGRlZmF1bHRzKTtcclxuICByZXR1cm4gY29uZmlnO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIENvbnN0cnVjdCBhIHNxcnQge2Qzc2NhbGVfc3BlY30gYmFzZWQgb24gcmVhc29uYWJsZVxyXG4gKiBkZWZhdWx0cyB3aXRoIHVzZXIgY3VzdG9taXphdGlvbnMgYXBwbGllZCBvbiB0b3AuXHJcbiAqXHJcbiAqIEBwYXJhbSBjdXN0b20gVGhlIHVzZXIgY3VzdG9taXphdGlvbnMuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkM3NjYWxlX3NwZWN9IFRoZSBzcXJ0IHNjYWxlIHNwZWNpZmljYXRpb24gd2l0aFxyXG4gKiB1c2VyIHN1cHBsaWVkIG92ZXJyaWRlcyBhcHBsaWVkLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5zcXJ0U2NhbGUgPSBmdW5jdGlvbiBzcXJ0U2NhbGUoY3VzdG9tKSB7XHJcbiAgdmFyIGRlZmF1bHRzID1cclxuICB7XHJcbiAgICAndHlwZScgICAgICAgIDogJ3NxcnQnLFxyXG4gICAgJ2RvbWFpbicgICAgICA6IFswLCAxMDBdLFxyXG4gICAgJ3JhbmdlJyAgICAgICA6IFswLCA4MDBdLFxyXG4gICAgJ3JhbmdlUm91bmQnICA6IHVuZGVmaW5lZCxcclxuICAgICdpbnRlcnBvbGF0ZScgOiB1bmRlZmluZWQsXHJcbiAgICAnY2xhbXAnICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgJ25pY2UnICAgICAgICA6IHVuZGVmaW5lZFxyXG4gIH07XHJcblxyXG4gIHZhciBjb25maWcgPSBkZXguY29uZmlnLmV4cGFuZEFuZE92ZXJsYXkoY3VzdG9tLCBkZWZhdWx0cyk7XHJcbiAgcmV0dXJuIGNvbmZpZztcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBDb25zdHJ1Y3QgYSBsb2cge2Qzc2NhbGVfc3BlY30gYmFzZWQgb24gcmVhc29uYWJsZVxyXG4gKiBkZWZhdWx0cyB3aXRoIHVzZXIgY3VzdG9taXphdGlvbnMgYXBwbGllZCBvbiB0b3AuXHJcbiAqXHJcbiAqIEBwYXJhbSBjdXN0b20gVGhlIHVzZXIgY3VzdG9taXphdGlvbnMuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkM3NjYWxlX3NwZWN9IFRoZSBsb2cgc2NhbGUgc3BlY2lmaWNhdGlvbiB3aXRoXHJcbiAqIHVzZXIgc3VwcGxpZWQgb3ZlcnJpZGVzIGFwcGxpZWQuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmxvZ1NjYWxlID0gZnVuY3Rpb24gbG9nU2NhbGUoY3VzdG9tKSB7XHJcbiAgdmFyIGRlZmF1bHRzID1cclxuICB7XHJcbiAgICAndHlwZScgICAgICAgIDogJ2xvZycsXHJcbiAgICAnZG9tYWluJyAgICAgIDogWzAsIDEwMF0sXHJcbiAgICAncmFuZ2UnICAgICAgIDogWzAsIDgwMF0sXHJcbiAgICAncmFuZ2VSb3VuZCcgIDogdW5kZWZpbmVkLFxyXG4gICAgJ2ludGVycG9sYXRlJyA6IHVuZGVmaW5lZCxcclxuICAgICdjbGFtcCcgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICAnbmljZScgICAgICAgIDogdW5kZWZpbmVkXHJcbiAgfTtcclxuXHJcbiAgdmFyIGxvZ1NwZWMgPSBkZXguY29uZmlnLmV4cGFuZEFuZE92ZXJsYXkoY3VzdG9tLCBkZWZhdWx0cyk7XHJcbiAgcmV0dXJuIGxvZ1NwZWM7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQ29uc3RydWN0IGEgb3JkaW5hbCB7ZDNzY2FsZV9zcGVjfSBiYXNlZCBvbiByZWFzb25hYmxlXHJcbiAqIGRlZmF1bHRzIHdpdGggdXNlciBjdXN0b21pemF0aW9ucyBhcHBsaWVkIG9uIHRvcC5cclxuICpcclxuICogQHBhcmFtIGN1c3RvbSAtIFRoZSB1c2VyIGN1c3RvbWl6YXRpb25zLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gW2N1c3RvbS5yYW5nZVJvdW5kQmFuZHNdIC1cclxuICogQHBhcmFtIHtvYmplY3R9IFtjdXN0b20ucmFuZ2VCYW5kc10gLVxyXG4gKiBAcGFyYW0ge29iamVjdH0gW2N1c3RvbS5yYW5nZVBvaW50c10gLSByYW5nZVBvaW50cyhpbnRlcnZhbCBbLCBwYWRkaW5nXSkgOiBTZXRzIHRoZSBvdXRwdXQgcmFuZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIGNvbnRpbnVvdXNcclxuICogaW50ZXJ2YWwuIFRoZSBhcnJheSBpbnRlcnZhbCBjb250YWlucyB0d28gZWxlbWVudHMgcmVwcmVzZW50aW5nIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtXHJcbiAqIG51bWVyaWMgdmFsdWUuIFRoaXMgaW50ZXJ2YWwgaXMgc3ViZGl2aWRlZCBpbnRvIG4gZXZlbmx5LXNwYWNlZCBwb2ludHMsIHdoZXJlIG4gaXMgdGhlXHJcbiAqIG51bWJlciBvZiAodW5pcXVlKSB2YWx1ZXMgaW4gdGhlIGlucHV0IGRvbWFpbi4gVGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50IG1heSBiZSBvZmZzZXRcclxuICogZnJvbSB0aGUgZWRnZSBvZiB0aGUgaW50ZXJ2YWwgYWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpZWQgcGFkZGluZywgd2hpY2ggZGVmYXVsdHMgdG8gemVyby5cclxuICogVGhlIHBhZGRpbmcgaXMgZXhwcmVzc2VkIGFzIGEgbXVsdGlwbGUgb2YgdGhlIHNwYWNpbmcgYmV0d2VlbiBwb2ludHMuIEEgcmVhc29uYWJsZSB2YWx1ZVxyXG4gKiBpcyAxLjAsIHN1Y2ggdGhhdCB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnQgd2lsbCBiZSBvZmZzZXQgZnJvbSB0aGUgbWluaW11bSBhbmQgbWF4aW11bVxyXG4gKiB2YWx1ZSBieSBoYWxmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHBvaW50cy5cclxuICogQHBhcmFtIHtvYmplY3R9IFtjdXN0b20ucmFuZ2VCYW5kc10gLVxyXG4gKlxyXG4gKiBAcmV0dXJucyB7ZDNzY2FsZV9zcGVjfSBUaGUgb3JkaW5hbCBzY2FsZSBzcGVjaWZpY2F0aW9uIHdpdGhcclxuICogdXNlciBzdXBwbGllZCBvdmVycmlkZXMgYXBwbGllZC5cclxuICpcclxuICovXHJcbmV4cG9ydHMub3JkaW5hbFNjYWxlID0gZnVuY3Rpb24gb3JkaW5hbFNjYWxlKGN1c3RvbSkge1xyXG4gIHZhciBkZWZhdWx0cyA9XHJcbiAge1xyXG4gICAgJ3R5cGUnICAgICAgICAgICAgOiAnb3JkaW5hbCcsXHJcbiAgICAnZG9tYWluJyAgICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgICdyYW5nZScgICAgICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgJ3JhbmdlUm91bmRCYW5kcycgOiB1bmRlZmluZWQsXHJcbiAgICAncmFuZ2VQb2ludHMnICAgICA6IHVuZGVmaW5lZCxcclxuICAgICdyYW5nZUJhbmRzJyAgICAgIDogdW5kZWZpbmVkXHJcbiAgfTtcclxuXHJcbiAgdmFyIG9yZGluYWxTcGVjID0gZGV4LmNvbmZpZy5leHBhbmRBbmRPdmVybGF5KGN1c3RvbSwgZGVmYXVsdHMpO1xyXG4gIHJldHVybiBvcmRpbmFsU3BlYztcclxufTtcclxuXHJcbmV4cG9ydHMudGltZVNjYWxlID0gZnVuY3Rpb24gdGltZVNjYWxlKGN1c3RvbSkge1xyXG4gIHZhciBkZWZhdWx0cyA9XHJcbiAge1xyXG4gICAgJ3R5cGUnICAgICAgICA6ICd0aW1lJyxcclxuICAgICdkb21haW4nICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICAncmFuZ2UnICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgJ3JhbmdlUm91bmQnICA6IHVuZGVmaW5lZCxcclxuICAgICdpbnRlcnBvbGF0ZScgOiB1bmRlZmluZWQsXHJcbiAgICAnY2xhbXAnICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgJ3RpY2tzJyAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgICd0aWNrRm9ybWF0JyAgOiB1bmRlZmluZWRcclxuICB9O1xyXG5cclxuICB2YXIgY29uZmlnID0gZGV4LmNvbmZpZy5leHBhbmRBbmRPdmVybGF5KGN1c3RvbSwgZGVmYXVsdHMpO1xyXG4gIHJldHVybiBjb25maWc7XHJcbn07XHJcblxyXG5leHBvcnRzLnF1YW50aWxlU2NhbGUgPSBmdW5jdGlvbiBxdWFudGlsZVNjYWxlKGN1c3RvbSkge1xyXG4gIHZhciBkZWZhdWx0cyA9XHJcbiAge1xyXG4gICAgJ3R5cGUnICAgOiAncXVhbnRpbGUnLFxyXG4gICAgJ2RvbWFpbicgOiB1bmRlZmluZWQsXHJcbiAgICAncmFuZ2UnICA6IHVuZGVmaW5lZFxyXG4gIH07XHJcblxyXG4gIHZhciBjb25maWcgPSBkZXguY29uZmlnLmV4cGFuZEFuZE92ZXJsYXkoY3VzdG9tLCBkZWZhdWx0cyk7XHJcbiAgcmV0dXJuIGNvbmZpZztcclxufTtcclxuXHJcbmV4cG9ydHMucXVhbnRpemVTY2FsZSA9IGZ1bmN0aW9uIHF1YW50aXplU2NhbGUoY3VzdG9tKSB7XHJcbiAgdmFyIGRlZmF1bHRzID1cclxuICB7XHJcbiAgICAndHlwZScgICA6ICdxdWFudGl6ZScsXHJcbiAgICAnZG9tYWluJyA6IHVuZGVmaW5lZCxcclxuICAgICdyYW5nZScgIDogdW5kZWZpbmVkXHJcbiAgfTtcclxuXHJcbiAgdmFyIGNvbmZpZyA9IGRleC5jb25maWcuZXhwYW5kQW5kT3ZlcmxheShjdXN0b20sIGRlZmF1bHRzKTtcclxuICByZXR1cm4gY29uZmlnO1xyXG59O1xyXG5cclxuZXhwb3J0cy5pZGVudGl0eVNjYWxlID0gZnVuY3Rpb24gaWRlbnRpdHlTY2FsZShjdXN0b20pIHtcclxuICB2YXIgZGVmYXVsdHMgPVxyXG4gIHtcclxuICAgICd0eXBlJyAgIDogJ2lkZW50aXR5JyxcclxuICAgICdkb21haW4nIDogdW5kZWZpbmVkLFxyXG4gICAgJ3JhbmdlJyAgOiB1bmRlZmluZWRcclxuICB9O1xyXG5cclxuICB2YXIgY29uZmlnID0gZGV4LmNvbmZpZy5leHBhbmRBbmRPdmVybGF5KGN1c3RvbSwgZGVmYXVsdHMpO1xyXG4gIHJldHVybiBjb25maWc7XHJcbn07XHJcblxyXG5leHBvcnRzLnRocmVzaG9sZFNjYWxlID0gZnVuY3Rpb24gdGhyZXNob2xkU2NhbGUoY3VzdG9tKSB7XHJcbiAgdmFyIGRlZmF1bHRzID1cclxuICB7XHJcbiAgICAndHlwZScgICA6ICd0aHJlc2hvbGQnLFxyXG4gICAgJ2RvbWFpbicgOiB1bmRlZmluZWQsXHJcbiAgICAncmFuZ2UnICA6IHVuZGVmaW5lZFxyXG4gIH07XHJcblxyXG4gIHZhciBjb25maWcgPSBkZXguY29uZmlnLmV4cGFuZEFuZE92ZXJsYXkoY3VzdG9tLCBkZWZhdWx0cyk7XHJcbiAgcmV0dXJuIGNvbmZpZztcclxufTtcclxuXHJcbmV4cG9ydHMuY29uZmlndXJlU2NhbGUgPSBmdW5jdGlvbiBjb25maWd1cmVTY2FsZShzY2FsZSwgY29uZmlnKSB7XHJcbiAgaWYgKGNvbmZpZykge1xyXG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gY29uZmlnKSB7XHJcbiAgICAgIGRleC5jb25zb2xlLnRyYWNlKFwiQ29uZmlndXJlU2NhbGUgUHJvcGVydHk6ICdcIiArIHByb3BlcnR5ICsgXCInXCIpO1xyXG4gICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KHByb3BlcnR5KSAmJiBwcm9wZXJ0eSAhPT0gJ3R5cGUnICYmIGNvbmZpZ1twcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGRleC5jb25zb2xlLnRyYWNlKFwiUHJvcGVydHk6ICdcIiArIHByb3BlcnR5ICsgXCInXCIpO1xyXG4gICAgICAgIGRleC5jb25maWcuY2FsbENvbmRpdGlvbmFsbHkoc2NhbGVbcHJvcGVydHldLCBjb25maWdbcHJvcGVydHldKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBkZXguY29uc29sZS5kZWJ1ZyhcIk1pc3NpbmcgUHJvcGVydHk6ICdcIiArIHByb3BlcnR5ICsgXCInXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc2NhbGU7XHJcbn07XHJcblxyXG4vL21vZHVsZS5leHBvcnRzID0gY29uZmlnOyIsIi8qKlxyXG4gKlxyXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBjb25zb2xlIGxvZ2dpbmcgY2FwYWJpbGl0aWVzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIGNvbnNvbGVcclxuICpcclxuICovXHJcblxyXG4vKipcclxuICpcclxuICogQHR5cGUge3tUUkFDRTogbnVtYmVyLCBERUJVRzogbnVtYmVyLCBOT1JNQUw6IG51bWJlciwgV0FSTjogbnVtYmVyLCBGQVRBTDogbnVtYmVyLCBOT05FOiBudW1iZXJ9fVxyXG4gKi9cclxudmFyIGxvZ0xldmVscyA9IHtcclxuICAnVFJBQ0UnICA6IDUsXHJcbiAgJ0RFQlVHJyAgOiA0LFxyXG4gICdOT1JNQUwnIDogMyxcclxuICAnV0FSTicgICA6IDIsXHJcbiAgJ0ZBVEFMJyAgOiAxLFxyXG4gICdOT05FJyAgIDogMFxyXG59O1xyXG5cclxuZXhwb3J0cy5sb2dMZXZlbHMgPSBsb2dMZXZlbHM7XHJcblxyXG52YXIgbG9nTGV2ZWwgPSBsb2dMZXZlbHMuTk9STUFMO1xyXG5cclxuZXhwb3J0cy5sb2dMZXZlbCA9IGxvZ0xldmVsO1xyXG5cclxuLy8vL1xyXG4vL1xyXG4vLyBkZXguY29uc29sZSA6IFRoaXMgbW9kdWxlIHByb3ZpZGVzIHJvdXRpbmVzIGFzc2lzdGluZyB3aXRoIGNvbnNvbGUgb3V0cHV0LlxyXG4vL1xyXG4vLy8vXHJcblxyXG4vKipcclxuICogTG9nIHRoaXMgbWVzc2FnZSBpZiB0aGUgY3VycmVudCBsb2cgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsXHJcbiAqIHRvIGRleC5jb25zb2xlLmxvZ0xldmVsLlxyXG4gKlxyXG4gKiBAcGFyYW0gbXNnTGV2ZWwgVGhlIGxvZyBsZXZlbCBmb3IgdGhpcyBtZXNzYWdlLlxyXG4gKiBAcGFyYW0gbXNnIE9uZSBvciBtb3JlIG1lc3NhZ2VzIHRvIGJlIGxvZ2dlZC4gIFN0cmluZ3Mgd2lsbCBzaW1wbHlcclxuICogdXNlIGNvbnNvbGUubG9nIHdoaWxlIG9iamVjdHMgd2lsbCB1c2UgY29uc29sZS5kaXIuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkZXguY29uc29sZX1cclxuICovXHJcbmV4cG9ydHMubG9nV2l0aExldmVsID0gZnVuY3Rpb24gKG1zZ0xldmVsLCBtc2cpIHtcclxuLy8gIGNvbnNvbGUubG9nKGRleC5jb25zb2xlLmxvZ0xldmVsKCkpO1xyXG4vLyAgY29uc29sZS5sb2cobXNnTGV2ZWwpO1xyXG4vLyAgY29uc29sZS5kaXIobXNnKTtcclxuXHJcbiAgaWYgKGRleC5jb25zb2xlLmxvZ0xldmVsKCkgPj0gbXNnTGV2ZWwpIHtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBtc2cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHR5cGVvZiBtc2dbaV0gPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjb25zb2xlLmRpcihtc2dbaV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1zZ1tpXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXcml0ZSBvbmUgb3IgbW9yZSBUUkFDRSBsZXZlbCBtZXNzYWdlcy5cclxuICpcclxuICogQHBhcmFtIG1zZyBPbmUgb3IgbW9yZSBUUkFDRSBtZXNzYWdlcyB0byBsb2cuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkZXguY29uc29sZXwqfVxyXG4gKi9cclxuZXhwb3J0cy50cmFjZSA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gZGV4LmNvbnNvbGUubG9nV2l0aExldmVsKGxvZ0xldmVscy5UUkFDRSwgYXJndW1lbnRzKVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlIG9uZSBvciBtb3JlIERFQlVHIGxldmVsIG1lc3NhZ2VzLlxyXG4gKlxyXG4gKiBAcGFyYW0gbXNnIE9uZSBvciBtb3JlIERFQlVHIG1lc3NhZ2VzIHRvIGxvZy5cclxuICpcclxuICogQHJldHVybnMge2RleC5jb25zb2xlfCp9XHJcbiAqL1xyXG5leHBvcnRzLmRlYnVnID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBkZXguY29uc29sZS5sb2dXaXRoTGV2ZWwobG9nTGV2ZWxzLkRFQlVHLCBhcmd1bWVudHMpXHJcbn07XHJcblxyXG4vKipcclxuICogV3JpdGUgb25lIG9yIG1vcmUgTk9STUFMIGxldmVsIG1lc3NhZ2VzLlxyXG4gKlxyXG4gKiBAcGFyYW0gbXNnIE9uZSBvciBtb3JlIE5PUk1BTCBtZXNzYWdlcyB0byBsb2cuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkZXguY29uc29sZXwqfVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgLy9jb25zb2xlLmxvZyhcImNhbGxlciBpcyBcIiArIGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLnRvU3RyaW5nKCkpO1xyXG4gIHJldHVybiBkZXguY29uc29sZS5sb2dXaXRoTGV2ZWwobG9nTGV2ZWxzLk5PUk1BTCwgYXJndW1lbnRzKVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlIG9uZSBvciBtb3JlIFdBUk4gbGV2ZWwgbWVzc2FnZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBtc2cgT25lIG9yIG1vcmUgV0FSTiBtZXNzYWdlcyB0byBsb2cuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkZXguY29uc29sZXwqfVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy53YXJuID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBkZXguY29uc29sZS5sb2dXaXRoTGV2ZWwobG9nTGV2ZWxzLldBUk4sIGFyZ3VtZW50cylcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXcml0ZSBvbmUgb3IgbW9yZSBGQVRBTCBsZXZlbCBtZXNzYWdlcy5cclxuICpcclxuICogQHBhcmFtIG1zZyBPbmUgb3IgbW9yZSBGQVRBTCBtZXNzYWdlcyB0byBsb2cuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtkZXguY29uc29sZXwqfVxyXG4gKi9cclxuZXhwb3J0cy5mYXRhbCA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gZGV4LmNvbnNvbGUubG9nV2l0aExldmVsKGxvZ0xldmVscy5GQVRBTCwgYXJndW1lbnRzKVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgY3VycmVudCBsb2cgbGV2ZWwuXHJcbiAqXHJcbiAqIEByZXR1cm5zIFRoZSBjdXJyZW50IGxvZyBsZXZlbC5cclxuICpcclxuICovXHJcbmV4cG9ydHMubG9nTGV2ZWwgPSBmdW5jdGlvbiAoXykge1xyXG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxvZ0xldmVsO1xyXG4gIGxvZ0xldmVsID0gbG9nTGV2ZWxzW19dO1xyXG4gIHJldHVybiBsb2dMZXZlbDtcclxufTtcclxuXHJcbmV4cG9ydHMubG9nTGV2ZWxzID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBsb2dMZXZlbHM7XHJcbn07XHJcbiIsIi8qKlxyXG4gKlxyXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBzdXBwb3J0IGZvciBkZWFsaW5nIHdpdGggY3N2IHN0cnVjdHVyZXMuICBUaGlzXHJcbiAqIGlzIHRoZSBjb3JlIGRhdGF0eXBlIG9uIHdoaWNoIGRleGpzIGNvbXBvbmVudHMgb3BlcmF0ZS5cclxuICpcclxuICogQG1vZHVsZSBjc3ZcclxuICpcclxuICovXHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGhlYWRlclxyXG4gKiBAcGFyYW0gZGF0YVxyXG4gKiBAcmV0dXJucyB7e2hlYWRlcjogKiwgZGF0YTogKn19XHJcbiAqL1xyXG5leHBvcnRzLmNzdiA9IGZ1bmN0aW9uIChoZWFkZXIsIGRhdGEpIHtcclxuICB2YXIgY3N2ID1cclxuICB7XHJcbiAgICBcImhlYWRlclwiOiBoZWFkZXIsXHJcbiAgICBcImRhdGFcIjogZGF0YVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBjc3Y7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGNzdlxyXG4gKiBAcmV0dXJucyB7e2hlYWRlcjogKiwgZGF0YToge2hlYWRlciwgZGF0YX19fVxyXG4gKi9cclxuZXhwb3J0cy50cmFuc3Bvc2UgPSBmdW5jdGlvbiAoY3N2KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIFwiaGVhZGVyXCI6IGNzdi5oZWFkZXIsXHJcbiAgICBcImRhdGFcIjogZGV4Lm1hdHJpeC50cmFuc3Bvc2UoY3N2LmRhdGEpXHJcbiAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHaXZlbiBhIENTViwgY3JlYXRlIGEgY29ubmVjdGlvbiBtYXRyaXggc3VpdGFibGUgZm9yIGZlZWRpbmcgaW50byBhIGNob3JkXHJcbiAqIGRpYWdyYW0uICBFeCwgZ2l2ZW4gQ1NWOlxyXG4gKlxyXG4gKiBAcGFyYW0gY3N2XHJcbiAqIEByZXR1cm5zIHt7aGVhZGVyOiBBcnJheSwgY29ubmVjdGlvbnM6IEFycmF5fXwqfVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5nZXRDb25uZWN0aW9uTWF0cml4ID0gZnVuY3Rpb24gKGNzdikge1xyXG4gIHZhciBtYXRyaXggPSBbXTtcclxuICB2YXIgcmksIGNpO1xyXG4gIHZhciByb3c7XHJcbiAgdmFyIGNpZDtcclxuICB2YXIgaGVhZGVyID0gW107XHJcbiAgdmFyIG5hbWVUb0luZGV4ID0ge307XHJcbiAgdmFyIGNvbm5lY3Rpb25NYXRyaXg7XHJcbiAgdmFyIHVuaXF1ZXM7XHJcbiAgdmFyIG5hbWVJbmRpY2VzID0gW107XHJcbiAgdmFyIHNyYywgZGVzdDtcclxuXHJcbiAgLy8gQ3JlYXRlIGEgbGlzdCBvZiB1bmlxdWUgdmFsdWVzIHRvIHJlbGF0ZSB0byBvbmUgYW5vdGhlci5cclxuICB1bmlxdWVzID0gZGV4Lm1hdHJpeC51bmlxdWVzKGNzdi5kYXRhKTtcclxuICAvLyBGbGF0dGVuIHRoZW0gaW50byBvdXIgaGVhZGVyLlxyXG4gIGhlYWRlciA9IGRleC5tYXRyaXguZmxhdHRlbih1bmlxdWVzKTtcclxuXHJcbiAgLy8gQ3JlYXRlIGEgbWFwIG9mIG5hbWVzIHRvIGhlYWRlciBpbmRleCBmb3IgZWFjaCBjb2x1bW4uXHJcbiAgbmFtZVRvSW5kZXggPSBuZXcgQXJyYXkodW5pcXVlcy5sZW5ndGgpO1xyXG4gIGZvciAocmkgPSAwLCBjaWQgPSAwOyByaSA8IHVuaXF1ZXMubGVuZ3RoOyByaSsrKSB7XHJcbiAgICBuYW1lVG9JbmRleFtyaV0gPVxyXG4gICAge307XHJcbiAgICBmb3IgKGNpID0gMDsgY2kgPCB1bmlxdWVzW3JpXS5sZW5ndGg7IGNpKyspIHtcclxuICAgICAgbmFtZVRvSW5kZXhbcmldW2hlYWRlcltjaWRdXSA9IGNpZDtcclxuICAgICAgY2lkICs9IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBDcmVhdGUgYSBOIHggTiBtYXRyaXggb2YgemVybyB2YWx1ZXMuXHJcbiAgbWF0cml4ID0gbmV3IEFycmF5KGhlYWRlci5sZW5ndGgpO1xyXG4gIGZvciAocmkgPSAwOyByaSA8IGhlYWRlci5sZW5ndGg7IHJpKyspIHtcclxuICAgIHJvdyA9IG5ldyBBcnJheShoZWFkZXIubGVuZ3RoKTtcclxuICAgIGZvciAoY2kgPSAwOyBjaSA8IGhlYWRlci5sZW5ndGg7IGNpKyspIHtcclxuICAgICAgcm93W2NpXSA9IDA7XHJcbiAgICB9XHJcbiAgICBtYXRyaXhbcmldID0gcm93O1xyXG4gIH1cclxuICAvL2RleC5jb25zb2xlLmxvZyhcIm5hbWVUb0luZGV4XCIsIG5hbWVUb0luZGV4LCBcIm1hdHJpeFwiLCBtYXRyaXgpO1xyXG5cclxuICBmb3IgKHJpID0gMDsgcmkgPCBjc3YuZGF0YS5sZW5ndGg7IHJpKyspIHtcclxuICAgIGZvciAoY2kgPSAxOyBjaSA8IGNzdi5oZWFkZXIubGVuZ3RoOyBjaSsrKSB7XHJcbiAgICAgIHNyYyA9IG5hbWVUb0luZGV4W2NpIC0gMV1bY3N2LmRhdGFbcmldW2NpIC0gMV1dO1xyXG4gICAgICBkZXN0ID0gbmFtZVRvSW5kZXhbY2ldW2Nzdi5kYXRhW3JpXVtjaV1dO1xyXG5cclxuICAgICAgLy9kZXguY29uc29sZS5sb2coY3N2LmRhdGFbcmldW2NpLTFdICsgXCI8LT5cIiArIGNzdi5kYXRhW3JpXVtjaV0sIHNyYyArIFwiPC0+XCIgKyBkZXN0KTtcclxuICAgICAgbWF0cml4W3NyY11bZGVzdF0gPSAxO1xyXG4gICAgICBtYXRyaXhbZGVzdF1bc3JjXSA9IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25uZWN0aW9uTWF0cml4ID0ge1wiaGVhZGVyXCI6IGhlYWRlciwgXCJjb25uZWN0aW9uc1wiOiBtYXRyaXh9O1xyXG4gIC8vZGV4LmNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBNYXRyaXhcIiwgY29ubmVjdGlvbk1hdHJpeCk7XHJcbiAgcmV0dXJuIGNvbm5lY3Rpb25NYXRyaXg7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGNzdlxyXG4gKiBAcGFyYW0ga2V5SW5kZXhcclxuICogQHJldHVybnMge3t9fVxyXG4gKi9cclxuZXhwb3J0cy5jcmVhdGVNYXAgPSBmdW5jdGlvbiAoY3N2LCBrZXlJbmRleCkge1xyXG4gIHZhciByaSwgY2ksIHJvd01hcCwgbWFwID1cclxuICB7fTtcclxuXHJcbiAgZm9yIChyaSA9IDA7IHJpIDwgY3N2LmRhdGEubGVuZ3RoOyByaSArPSAxKSB7XHJcbiAgICBpZiAoY3N2LmRhdGFbcmldLmxlbmd0aCA9PT0gY3N2LmhlYWRlci5sZW5ndGgpIHtcclxuICAgICAgcm93TWFwID1cclxuICAgICAge307XHJcblxyXG4gICAgICBmb3IgKGNpID0gMDsgY2kgPCBjc3YuaGVhZGVyLmxlbmd0aDsgY2kgKz0gMSkge1xyXG4gICAgICAgIHJvd01hcFtjc3YuaGVhZGVyW2NpXV0gPSBjc3YuZGF0YVtyaV1bY2ldO1xyXG4gICAgICB9XHJcbiAgICAgIG1hcFtjc3YuZGF0YVtyaV1ba2V5SW5kZXhdXSA9IHJvd01hcDtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG1hcDtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gY3N2XHJcbiAqIEBwYXJhbSByb3dJbmRleFxyXG4gKiBAcGFyYW0gY29sdW1uSW5kZXhcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnRzLnRvSnNvbiA9IGZ1bmN0aW9uIChjc3YsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkge1xyXG4gIHZhciBqc29uRGF0YSA9IFtdO1xyXG4gIHZhciByaSwgY2ksIGpzb25Sb3c7XHJcblxyXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIHtcclxuICAgIGpzb25Sb3cgPSB7fTtcclxuICAgIGpzb25Sb3dbY3N2LmhlYWRlcltjb2x1bW5JbmRleF1dID0gY3N2LmRhdGFbcm93SW5kZXhdW2NvbHVtbkluZGV4XTtcclxuICAgIHJldHVybiBqc29uUm93O1xyXG4gIH1cclxuICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICB2YXIganNvblJvdyA9XHJcbiAgICB7fTtcclxuICAgIGZvciAoY2kgPSAwOyBjaSA8IGNzdi5oZWFkZXIubGVuZ3RoOyBjaSArPSAxKSB7XHJcbiAgICAgIGpzb25Sb3dbY3N2LmhlYWRlcltjaV1dID0gY3N2LmRhdGFbcm93SW5kZXhdW2NpXTtcclxuICAgIH1cclxuICAgIHJldHVybiBqc29uUm93O1xyXG4gIH1cclxuICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICBmb3IgKHJpID0gMDsgcmkgPCBjc3YuZGF0YS5sZW5ndGg7IHJpKyspIHtcclxuICAgICAgdmFyIGpzb25Sb3cgPVxyXG4gICAgICB7fTtcclxuICAgICAgZm9yIChjaSA9IDA7IGNpIDwgY3N2LmhlYWRlci5sZW5ndGg7IGNpKyspIHtcclxuICAgICAgICBqc29uUm93W2Nzdi5oZWFkZXJbY2ldXSA9IGNzdi5kYXRhW3JpXVtjaV07XHJcbiAgICAgICAgLy9kZXguY29uc29sZS5sb2coY3N2LmhlYWRlcltjaV0gKyBcIj1cIiArIGNzdi5kYXRhW3JpXVtjaV0sIGpzb25Sb3cpO1xyXG4gICAgICB9XHJcbiAgICAgIGpzb25EYXRhLnB1c2goanNvblJvdyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBqc29uRGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gY3N2XHJcbiAqIEByZXR1cm5zIHt7fX1cclxuICovXHJcbmV4cG9ydHMudG9Db2x1bW5BcnJheUpzb24gPSBmdW5jdGlvbiAoY3N2KSB7XHJcbiAgdmFyIGpzb24gPSB7fTtcclxuICB2YXIgcmksIGNpLCBqc29uUm93O1xyXG5cclxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgZm9yIChjaSA9IDA7IGNpIDwgY3N2LmhlYWRlci5sZW5ndGg7IGNpKyspIHtcclxuICAgICAganNvbltjc3YuaGVhZGVyW2NpXV0gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHJpID0gMDsgcmkgPCBjc3YuZGF0YS5sZW5ndGg7IHJpKyspIHtcclxuICAgICAgZm9yIChjaSA9IDA7IGNpIDwgY3N2LmhlYWRlci5sZW5ndGg7IGNpKyspIHtcclxuICAgICAgICBqc29uW2Nzdi5oZWFkZXJbY2ldXS5wdXNoKGNzdi5kYXRhW3JpXVtjaV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ganNvbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gY3N2XHJcbiAqIEByZXR1cm5zIHt7aGVhZGVyOiAqLCBkYXRhOiAqfX1cclxuICpcclxuICovXHJcbmV4cG9ydHMuY29weSA9IGZ1bmN0aW9uIChjc3YpIHtcclxuICB2YXIgY29weSA9IHtcclxuICAgICdoZWFkZXInOiBkZXguYXJyYXkuY29weShjc3YuaGVhZGVyKSxcclxuICAgICdkYXRhJzogZGV4Lm1hdHJpeC5jb3B5KGNzdi5kYXRhKVxyXG4gIH07XHJcbiAgcmV0dXJuIGNvcHk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQSB1dGlsaXR5IHRyYW5zZm9ybSBmb3IgZGVhbGluZyB3aXRoIHNvbWUgb2YgRDMncyBtb3JlIGZpbmlreSBmb3JtYXRzLlxyXG4gKlxyXG4gKiBjc3YgPVxyXG4gKiB7XHJcbiAqIFx0IGhlYWRlciA6IHtDMSxDMixDM30sXHJcbiAqICAgZGF0YSAgIDogW1xyXG4gKiAgICAgW0EsQixDXSxcclxuICogICAgIFtBLEIsRF1cclxuICogICBdXHJcbiAqIH1cclxuICogaW50bzpcclxuICoganNvbiA9XHJcbiAqIHtcclxuICogXHRcIm5hbWVcIiAgICAgOiByb290TmFtZSxcclxuICogIFwiY2F0ZWdvcnlcIiA6IGNhdGVnb3J5LFxyXG4gKiAgXCJjaGlsZHJlblwiIDpcclxuICogIFtcclxuICogICAgXCJjaGlsZHJlblwiIDpcclxuICogICAgIFtcclxuICogICAgICAge1xyXG4gKiAgICAgICAgIFwibmFtZVwiICAgICA6IFwiQVwiLFxyXG4gKiAgICAgICAgIFwiY2F0ZWdvcnlcIiA6IFwiQzFcIixcclxuICogICAgICAgICBcImNoaWxkcmVuXCIgOlxyXG4gKiAgICAgICAgIFtcclxuICogICAgICAgICAgIHtcclxuICogXHQgICAgICAgICAgIFwibmFtZVwiIDogXCJCXCIsXHJcbiAqICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiA6IFwiQzJcIixcclxuICogICAgICAgICAgICAgXCJjaGlsZHJlblwiIDpcclxuICogICAgICAgICAgICAgW1xyXG4gKiAgICAgICAgICAgICAgIHtcclxuICogICAgICAgICAgICAgICAgIFwibmFtZVwiICAgICA6IFwiQ1wiLFxyXG4gKiAgICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiIDogXCJDM1wiLFxyXG4gKiAgICAgICAgICAgICAgICAgXCJzaXplXCIgICAgIDogMVxyXG4gKiAgICAgICAgICAgICAgIH1cclxuICogICAgICAgICAgICAgICB7XHJcbiAqICAgICAgICAgICAgICAgICBcIm5hbWVcIiAgICAgOiBcIkRcIixcclxuICogICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiA6IFwiQzNcIixcclxuICogICAgICAgICAgICAgICAgIFwic2l6ZVwiICAgICA6IDFcclxuICogICAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgICAgIF1cclxuICogICAgICAgICAgIH1cclxuICogICAgICAgICBdXHJcbiAqICAgICAgIH1cclxuICogICAgIF1cclxuICogIF1cclxuICogfVxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gY3N2XHJcbiAqL1xyXG5leHBvcnRzLnRvSGllcmFyY2hpY2FsSnNvbiA9IGZ1bmN0aW9uIChjc3YpIHtcclxuICB2YXIgY29ubmVjdGlvbnMgPSBkZXguY3N2LmNvbm5lY3Rpb25zKGNzdik7XHJcbiAgcmV0dXJuIGdldENoaWxkcmVuKGNvbm5lY3Rpb25zLCAwKTtcclxuXHJcbiAgZnVuY3Rpb24gZ2V0Q2hpbGRyZW4oY29ubmVjdGlvbnMsIGRlcHRoKSB7XHJcbiAgICAvL2RleC5jb25zb2xlLmxvZyhcImNvbm5lY3Rpb25zOlwiLCBjb25uZWN0aW9ucywgXCJkZXB0aD1cIitkZXB0aCk7XHJcbiAgICB2YXIga2lkcyA9IFtdLCBjbmFtZTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNvbm5lY3Rpb25zID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4ga2lkcztcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNuYW1lIGluIGNvbm5lY3Rpb25zKSB7XHJcbiAgICAgIC8vZGV4LmNvbnNvbGUubG9nKFwiQ05BTUVcIiwgY25hbWUpO1xyXG4gICAgICBpZiAoY29ubmVjdGlvbnMuaGFzT3duUHJvcGVydHkoY25hbWUpKSB7XHJcbiAgICAgICAga2lkcy5wdXNoKGNyZWF0ZUNoaWxkKGNuYW1lLCBjc3YuaGVhZGVyW2RlcHRoXSxcclxuICAgICAgICAgIGdldENoaWxkcmVuKGNvbm5lY3Rpb25zW2NuYW1lXSwgZGVwdGggKyAxKSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGtpZHM7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVDaGlsZChuYW1lLCBjYXRlZ29yeSwgY2hpbGRyZW4pIHtcclxuICAgIHZhciBjaGlsZCA9XHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBuYW1lLFxyXG4gICAgICBcImNhdGVnb3J5XCI6IGNhdGVnb3J5LFxyXG4gICAgICBcImNoaWxkcmVuXCI6IGNoaWxkcmVuXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGNoaWxkO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBUcmFuc2Zvcm1zOlxyXG4gKiBjc3YgPVxyXG4gKiB7XHJcbiAqIFx0IGhlYWRlciA6IHtDMSxDMixDM30sXHJcbiAqICAgZGF0YSAgIDogW1xyXG4gKiAgICAgW0EsQixDXSxcclxuICogICAgIFtBLEIsRF1cclxuICogICBdXHJcbiAqIH1cclxuICogaW50bzpcclxuICogY29ubmVjdGlvbnMgPVxyXG4gKiB7IEE6e0I6e0M6e30sRDp7fX19fVxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gY3N2XHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmNvbm5lY3Rpb25zID0gZnVuY3Rpb24gKGNzdikge1xyXG4gIHZhciBjb25uZWN0aW9ucyA9XHJcbiAge307XHJcbiAgdmFyIHJpO1xyXG5cclxuICBmb3IgKHJpID0gMDsgcmkgPCBjc3YuZGF0YS5sZW5ndGg7IHJpKyspIHtcclxuICAgIGRleC5vYmplY3QuY29ubmVjdChjb25uZWN0aW9ucywgY3N2LmRhdGFbcmldKTtcclxuICB9XHJcblxyXG4gIC8vZGV4LmNvbnNvbGUubG9nKFwiY29ubmVjdGlvbnM6XCIsIGNvbm5lY3Rpb25zKTtcclxuICByZXR1cm4gY29ubmVjdGlvbnM7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGNzdlxyXG4gKiBAcGFyYW0ga2V5SW5kZXhcclxuICogQHJldHVybnMge3t9fVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5jcmVhdGVSb3dNYXAgPSBmdW5jdGlvbiAoY3N2LCBrZXlJbmRleCkge1xyXG4gIHZhciBtYXAgPVxyXG4gIHt9O1xyXG4gIHZhciByaTtcclxuXHJcbiAgZm9yIChyaSA9IDA7IHJpIDwgY3N2LmRhdGEubGVuZ3RoOyByaSsrKSB7XHJcbiAgICBpZiAoY3N2LmRhdGFbcmldLmxlbmd0aCA9PSBjc3YuaGVhZGVyLmxlbmd0aCkge1xyXG4gICAgICBtYXBbY3N2LmRhdGFbcmldW2tleUluZGV4XV0gPSBjc3YuZGF0YVtyaV07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBtYXA7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGNzdlxyXG4gKiBAcGFyYW0gY29sdW1uc1xyXG4gKiBAcmV0dXJucyB7e319XHJcbiAqL1xyXG5leHBvcnRzLmNvbHVtblNsaWNlID0gZnVuY3Rpb24gKGNzdiwgY29sdW1ucykge1xyXG4gIHZhciBzbGljZSA9IHt9O1xyXG4gIHNsaWNlLmhlYWRlciA9IGRleC5hcnJheS5zbGljZShjc3YuaGVhZGVyLCBjb2x1bW5zKTtcclxuICBzbGljZS5kYXRhID0gZGV4Lm1hdHJpeC5zbGljZShjc3YuZGF0YSwgY29sdW1ucyk7XHJcblxyXG4gIHJldHVybiBzbGljZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gY3N2XHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICovXHJcbmV4cG9ydHMuZ2V0TnVtZXJpY0NvbHVtbk5hbWVzID0gZnVuY3Rpb24gKGNzdikge1xyXG4gIHZhciBwb3NzaWJsZU51bWVyaWMgPVxyXG4gIHt9O1xyXG4gIHZhciBpLCBqLCByaSwgY2k7XHJcbiAgdmFyIG51bWVyaWNDb2x1bW5zID0gW107XHJcblxyXG4gIGZvciAoaSA9IDA7IGkgPCBjc3YuaGVhZGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBwb3NzaWJsZU51bWVyaWNbY3N2LmhlYWRlcltpXV0gPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8gSXRlcmF0ZSB0aHJ1IHRoZSBkYXRhLCBza2lwIHRoZSBoZWFkZXIuXHJcbiAgZm9yIChyaSA9IDA7IHJpIDwgY3N2LmRhdGEubGVuZ3RoOyByaSsrKSB7XHJcbiAgICBmb3IgKGNpID0gMDsgY2kgPCBjc3YuZGF0YVtyaV0ubGVuZ3RoICYmIGNpIDwgY3N2LmhlYWRlci5sZW5ndGg7IGNpKyspIHtcclxuICAgICAgaWYgKHBvc3NpYmxlTnVtZXJpY1tjc3YuaGVhZGVyW2NpXV0gJiYgIWRleC5vYmplY3QuaXNOdW1lcmljKGNzdi5kYXRhW3JpXVtjaV0pKSB7XHJcbiAgICAgICAgcG9zc2libGVOdW1lcmljW2Nzdi5oZWFkZXJbY2ldXSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKGNpID0gMDsgY2kgPCBjc3YuaGVhZGVyLmxlbmd0aDsgY2krKykge1xyXG4gICAgaWYgKHBvc3NpYmxlTnVtZXJpY1tjc3YuaGVhZGVyW2NpXV0pIHtcclxuICAgICAgbnVtZXJpY0NvbHVtbnMucHVzaChjc3YuaGVhZGVyW2NpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbnVtZXJpY0NvbHVtbnM7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGNzdlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqL1xyXG5leHBvcnRzLmd1ZXNzVHlwZXMgPSBmdW5jdGlvbiAoY3N2KSB7XHJcbiAgdmFyIGkgPSAwO1xyXG4gIHZhciB0ZXN0UmVzdWx0cyA9IFtdO1xyXG4gIGNzdi5oZWFkZXIuZm9yRWFjaChmdW5jdGlvbiAoaGRyKSB7XHJcbiAgICB0ZXN0UmVzdWx0cy5wdXNoKHt9KVxyXG4gIH0pO1xyXG4gIHZhciBudW1Db2xzID0gY3N2LmhlYWRlci5sZW5ndGg7XHJcblxyXG4gIGNzdi5kYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xyXG4gICAgZm9yIChpID0gMDsgaSA8IG51bUNvbHM7IGkrKykge1xyXG5cclxuICAgICAgaWYgKCF0ZXN0UmVzdWx0c1tpXVtcIm5vdERhdGVcIl0pIHtcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHJvd1tpXSk7XHJcbiAgICAgICAgaWYgKGlzTmFOKGRhdGUuZ2V0VGltZSgpKSkge1xyXG4gICAgICAgICAgZGV4LmNvbnNvbGUubG9nKFwibm90IGRhdGVcIiArIGkpO1xyXG4gICAgICAgICAgdGVzdFJlc3VsdHNbaV1bXCJub3REYXRlXCJdID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGVzdFJlc3VsdHNbaV1bXCJub3ROdW1iZXJcIl0pIHtcclxuICAgICAgICBpZiAoaXNOYU4ocm93W2ldKSkge1xyXG4gICAgICAgICAgdGVzdFJlc3VsdHNbaV1bXCJub3ROdW1iZXJcIl0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB2YXIgdHlwZXMgPSBbXTtcclxuXHJcbiAgZm9yIChpID0gMDsgaSA8IG51bUNvbHM7IGkrKykge1xyXG4gICAgdmFyIHJlc3VsdHMgPSB0ZXN0UmVzdWx0c1tpXTtcclxuICAgIGlmICghcmVzdWx0cy5ub3REYXRlICYmIHJlc3VsdHMubm90TnVtYmVyKSB7XHJcbiAgICAgIHR5cGVzLnB1c2goJ2RhdGUnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCFyZXN1bHRzLm5vdE51bWJlcikge1xyXG4gICAgICB0eXBlcy5wdXNoKCdudW1iZXInKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0eXBlcy5wdXNoKCdzdHJpbmcnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0eXBlcztcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBjc3ZcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnRzLnN0cmljdFR5cGVzID0gZnVuY3Rpb24gc3RyaWN0VHlwZXMoY3N2KSB7XHJcbiAgdmFyIHR5cGVzID0gZGV4LmNzdi5ndWVzc1R5cGVzKGNzdik7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmICh0eXBlc1tpXSA9PSAnZGF0ZScpIHtcclxuICAgICAgY3N2LmRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93LCByaSkge1xyXG4gICAgICAgIGRleC5jb25zb2xlLmxvZyhcInJvd1tcIiArIHJpICsgXCJdPVwiICsgcm93W3JpXSk7XHJcbiAgICAgICAgY3N2LmRhdGFbcmldW2ldID0gbmV3IERhdGUoY3N2LmRhdGFbcmldW2ldKTtcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAodHlwZXNbaV0gPT0gJ251bWJlcicpIHtcclxuICAgICAgICBjc3YuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3csIHJpKSB7XHJcbiAgICAgICAgICBkZXguY29uc29sZS5sb2coXCJyb3dbXCIgKyByaSArIFwiXT1cIiArIHJvd1tyaV0pO1xyXG4gICAgICAgICAgY3N2LmRhdGFbcmldW2ldID0gbmV3IERvdWJsZShjc3YuZGF0YVtyaV1baV0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBjc3Y7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogVGhpcyByb3V0aW5lIHdpbGwgcmV0dXJuIGEgZnJhbWVzIHN0cnVjdHVyZSBiYXNlZCBvbiBhIGNzdiBhbmRcclxuICogYW4gaW5kZXguICBJdCB3aWxsIGZpcnN0IGlkZW50aWZ5IGFsbCB1bmlxdWUgdmFsdWVzIHdpdGhpbiB0aGVcclxuICogc2VsZWN0ZWQgY29sdW1uLCB0aGVuIHNvcnQgdGhlbSBpbnRvIGFuIGFycmF5IG9mIGZyYW1lIGluZGV4ZXMuXHJcbiAqIEZyb20gdGhlcmUsIGl0IHdpbGwgcmV0dXJuIGFuIGFycmF5IG9mIGNzdiB3aGVyZSB0aGUgZWxlbWVudHNcclxuICogY29udGFpbiB0aGUgc3BlY2lmaWVkIGZyYW1lIGluZGV4IGF0IHRoZSBjb29yZXNwb25kaW5nIGxvY2F0aW9uLlxyXG4gKiBUaGlzIHJvdXRpbmUgc3VwcG9ydHMgdGhpbmdzIHN1Y2ggYXMgdGltZS92YWx1ZSBmaWx0ZXJpbmcgZm9yXHJcbiAqIHRoaW5ncyBsaWtlIGEgdGltZSBvciBzbGljaW5nIGRpbWVuc2lvbiBmb3IgdmFyaW91cyBjaGFydHMuXHJcbiAqIElFOiBObyBuZWVkIHRvIHdyaXRlIGEgbW90aW9uIGJ1YmJsZSBjaGFydCwgc2ltcGx5IGNvbWJpbmUgYVxyXG4gKiB2Y3ItcGxheWVyIHdpdGggYSByZWd1bGFyIGJ1YmJsZSBjaGFydCBjb25uZWN0ZWQgdG8gcGxheS9yZXdpbmRcclxuICogZXZlbnRzIGFuZCBtb3Rpb24gd2lsbCBmb2xsb3cuXHJcbiAqXHJcbiAqIEBwYXJhbSBjc3ZcclxuICogQHBhcmFtIGNvbHVtbkluZGV4XHJcbiAqIEByZXR1cm5zIHt7ZnJhbWVJbmRpY2VzOiBBcnJheS48VD4sIGZyYW1lczogQXJyYXl9fVxyXG4gKi9cclxuZXhwb3J0cy5nZXRGcmFtZXNCeUluZGV4ID0gZnVuY3Rpb24oY3N2LCBjb2x1bW5JbmRleCkge1xyXG4gIHZhciB0eXBlcyA9IGRleC5jc3YuZ3Vlc3NUeXBlcyhjc3YpO1xyXG4gIC8vZGV4LmNvbnNvbGUubG9nKFwiVFlQRVNcIiwgdHlwZXMpO1xyXG4gIHZhciBmcmFtZUluZGljZXM7XHJcblxyXG4gIGlmICh0eXBlc1tjb2x1bW5JbmRleF0gPT0gXCJudW1iZXJcIilcclxuICB7XHJcbiAgICBmcmFtZUluZGljZXMgPSBfLnVuaXEoY3N2LmRhdGEubWFwKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgcmV0dXJuIHJvd1tjb2x1bW5JbmRleF1cclxuICAgIH0pKS5zb3J0KGZ1bmN0aW9uKGEsIGIpe3JldHVybiBhLWJ9KTtcclxuICB9XHJcbiAgZWxzZSBpZiAodHlwZXNbY29sdW1uSW5kZXhdID09IFwiZGF0ZVwiKVxyXG4gIHtcclxuICAgIGZyYW1lSW5kaWNlcyA9IF8udW5pcShjc3YuZGF0YS5tYXAoZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICByZXR1cm4gcm93W2NvbHVtbkluZGV4XVxyXG4gICAgfSkpLnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgIGEgPSBuZXcgRGF0ZShhKTtcclxuICAgICAgYiA9IG5ldyBEYXRlKGIpO1xyXG4gICAgICByZXR1cm4gYT5iID8gMSA6IGE8YiA/IC0xIDogMDtcclxuICAgIH0pO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIGZyYW1lSW5kaWNlcyA9IF8udW5pcShjc3YuZGF0YS5tYXAoZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICByZXR1cm4gcm93W2NvbHVtbkluZGV4XVxyXG4gICAgfSkpLnNvcnQoKTtcclxuICB9XHJcbiAgLy9kZXguY29uc29sZS5sb2coXCJGUkFNRS1JTkRJQ0VTXCIsIGZyYW1lSW5kaWNlcylcclxuICB2YXIgaGVhZGVyID0gZGV4LmFycmF5LmNvcHkoY3N2LmhlYWRlcik7XHJcbiAgdmFyIGZyYW1lSW5kZXhOYW1lID0gaGVhZGVyLnNwbGljZShjb2x1bW5JbmRleCwgMSk7XHJcbiAgdmFyIGZyYW1lcyA9IFtdO1xyXG5cclxuICBmb3IgKHZhciBmaT0wOyBmaTxmcmFtZUluZGljZXMubGVuZ3RoOyBmaSsrKVxyXG4gIHtcclxuICAgIHZhciBmcmFtZSA9IHsgaGVhZGVyIDogaGVhZGVyIH07XHJcbiAgICB2YXIgZnJhbWVEYXRhID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgcmk9MDsgcmk8Y3N2LmRhdGEubGVuZ3RoOyByaSsrKVxyXG4gICAge1xyXG4gICAgICBpZiAoY3N2LmRhdGFbcmldW2NvbHVtbkluZGV4XSA9PSBmcmFtZUluZGljZXNbZmldKVxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyIGZyYW1lUm93ID0gZGV4LmFycmF5LmNvcHkoY3N2LmRhdGFbcmldKTtcclxuICAgICAgICBmcmFtZVJvdy5zcGxpY2UoY29sdW1uSW5kZXgsIDEpO1xyXG4gICAgICAgIGZyYW1lRGF0YS5wdXNoKGZyYW1lUm93KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnJhbWVbXCJkYXRhXCJdID0gZnJhbWVEYXRhO1xyXG4gICAgZnJhbWVzLnB1c2goZnJhbWUpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgICdmcmFtZUluZGljZXMnIDogZnJhbWVJbmRpY2VzLFxyXG4gICAgJ2ZyYW1lcycgOiBmcmFtZXNcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGNzdlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqL1xyXG5leHBvcnRzLmdldE51bWVyaWNJbmRpY2VzID0gZnVuY3Rpb24gKGNzdikge1xyXG4gIHZhciBwb3NzaWJsZU51bWVyaWMgPVxyXG4gIHt9O1xyXG4gIHZhciBpLCBqO1xyXG4gIHZhciBudW1lcmljSW5kaWNlcyA9IFtdO1xyXG5cclxuICBmb3IgKGkgPSAwOyBpIDwgY3N2LmhlYWRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgcG9zc2libGVOdW1lcmljW2Nzdi5oZWFkZXJbaV1dID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vIEl0ZXJhdGUgdGhydSB0aGUgZGF0YSwgc2tpcCB0aGUgaGVhZGVyLlxyXG4gIGZvciAoaSA9IDE7IGkgPCBjc3YuZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgZm9yIChqID0gMDsgaiA8IGNzdi5kYXRhW2ldLmxlbmd0aCAmJiBqIDwgY3N2LmhlYWRlci5sZW5ndGg7IGorKykge1xyXG4gICAgICBpZiAocG9zc2libGVOdW1lcmljW2Nzdi5oZWFkZXJbal1dICYmICFkZXgub2JqZWN0LmlzTnVtZXJpYyhjc3YuZGF0YVtpXVtqXSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNzdi5oZWFkZXJbXCIgKyBqICsgXCJdPVwiICsgY3N2LmhlYWRlcltqXSArIFwiIGlzIG5vdCBudW1lcmljIGR1ZSB0byBjc3YuZGF0YVtcIiArIGkgKyBcIl1bXCJcclxuICAgICAgICAgICsgaiArIFwiXT1cIiArIGNzdi5kYXRhW2ldW2pdKTtcclxuICAgICAgICBwb3NzaWJsZU51bWVyaWNbY3N2LmhlYWRlcltqXV0gPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yIChpID0gMDsgaSA8IGNzdi5oZWFkZXIubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChwb3NzaWJsZU51bWVyaWNbY3N2LmhlYWRlcltpXV0pIHtcclxuICAgICAgbnVtZXJpY0luZGljZXMucHVzaChpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBudW1lcmljSW5kaWNlcztcclxufTtcclxuXHJcbmV4cG9ydHMuZ2V0Q2F0ZWdvcmljYWxJbmRpY2VzID0gZnVuY3Rpb24gKGNzdikge1xyXG4gIHZhciBwb3NzaWJsZU51bWVyaWMgPVxyXG4gIHt9O1xyXG4gIHZhciBpLCBqO1xyXG4gIHZhciBjYXRlZ29yaWNhbEluZGljZXMgPSBbXTtcclxuXHJcbiAgZm9yIChpID0gMDsgaSA8IGNzdi5oZWFkZXIubGVuZ3RoOyBpKyspIHtcclxuICAgIHBvc3NpYmxlTnVtZXJpY1tjc3YuaGVhZGVyW2ldXSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBJdGVyYXRlIHRocnUgdGhlIGRhdGEsIHNraXAgdGhlIGhlYWRlci5cclxuICBmb3IgKGkgPSAxOyBpIDwgY3N2LmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgIGZvciAoaiA9IDA7IGogPCBjc3YuZGF0YVtpXS5sZW5ndGggJiYgaiA8IGNzdi5oZWFkZXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgaWYgKHBvc3NpYmxlTnVtZXJpY1tjc3YuaGVhZGVyW2pdXSAmJiAhZGV4Lm9iamVjdC5pc051bWVyaWMoY3N2LmRhdGFbaV1bal0pKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjc3YuaGVhZGVyW1wiICsgaiArIFwiXT1cIiArIGNzdi5oZWFkZXJbal0gKyBcIiBpcyBub3QgbnVtZXJpYyBkdWUgdG8gY3N2LmRhdGFbXCIgKyBpICsgXCJdW1wiXHJcbiAgICAgICAgICArIGogKyBcIl09XCIgKyBjc3YuZGF0YVtpXVtqXSk7XHJcbiAgICAgICAgcG9zc2libGVOdW1lcmljW2Nzdi5oZWFkZXJbal1dID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvciAoaSA9IDA7IGkgPCBjc3YuaGVhZGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoIXBvc3NpYmxlTnVtZXJpY1tjc3YuaGVhZGVyW2ldXSkge1xyXG4gICAgICBjYXRlZ29yaWNhbEluZGljZXMucHVzaChpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBjYXRlZ29yaWNhbEluZGljZXM7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGNzdlxyXG4gKiBAcGFyYW0gY29sdW1uTnVtXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0cy5pc0NvbHVtbk51bWVyaWMgPSBmdW5jdGlvbiAoY3N2LCBjb2x1bW5OdW0pIHtcclxuICB2YXIgaTtcclxuXHJcbiAgZm9yIChpID0gMDsgaSA8IGNzdi5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoIWRleC5vYmplY3QuaXNOdW1lcmljKGNzdi5kYXRhW2ldW2NvbHVtbk51bV0pKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGNzdlxyXG4gKiBAcGFyYW0gY29sdW1uc1xyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydHMuZ3JvdXAgPSBmdW5jdGlvbiAoY3N2LCBjb2x1bW5zKSB7XHJcbiAgdmFyIHJpLCBjaTtcclxuICB2YXIgZ3JvdXBzID0ge307XHJcbiAgdmFyIHJldHVybkdyb3VwcyA9IFtdO1xyXG4gIHZhciB2YWx1ZXM7XHJcbiAgdmFyIGtleTtcclxuICB2YXIgb3RoZXJDb2x1bW5zO1xyXG4gIHZhciBvdGhlckhlYWRlcnM7XHJcbiAgdmFyIGdyb3VwTmFtZTtcclxuXHJcbiAgaWYgKGFyZ3VtZW50cyA8IDIpIHtcclxuICAgIHJldHVybiBjc3Y7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjb21wYXJlKGEsIGIpIHtcclxuICAgIHZhciBzaSwgaDtcclxuXHJcbiAgICBmb3IgKHNpID0gMDsgc2kgPCBjb2x1bW5zLmxlbmd0aDsgc2krKykge1xyXG4gICAgICBoID0gY3N2LmhlYWRlcltjb2x1bW5zW3NpXV1cclxuICAgICAgaWYgKGFbaF0gPCBiW2hdKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGFbaF0gPiBiW2hdKSB7XHJcbiAgICAgICAgcmV0dXJuIDFcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgLy9vdGhlckNvbHVtbnMgPSBkZXguYXJyYXkuZGlmZmVyZW5jZShkZXgucmFuZ2UoMCwgY3N2LmhlYWRlci5sZW5ndGgpLCBjb2x1bW5zKTtcclxuICAvL290aGVySGVhZGVycyA9IGRleC5hcnJheS5zbGljZShjc3YuaGVhZGVyLCBvdGhlckNvbHVtbnMpO1xyXG5cclxuICBmb3IgKHJpID0gMDsgcmkgPCBjc3YuZGF0YS5sZW5ndGg7IHJpICs9IDEpIHtcclxuICAgIHZhbHVlcyA9IGRleC5hcnJheS5zbGljZShjc3YuZGF0YVtyaV0sIGNvbHVtbnMpO1xyXG4gICAga2V5ID0gdmFsdWVzLmpvaW4oJzo6OicpO1xyXG5cclxuICAgIGlmIChncm91cHNba2V5XSkge1xyXG4gICAgICBncm91cCA9IGdyb3Vwc1trZXldO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIC8vZ3JvdXAgPSB7ICdjc3YnIDogZGV4LmNzdi5jc3Yob3RoZXJIZWFkZXJzLCBbXSkgfTtcclxuICAgICAgZ3JvdXAgPVxyXG4gICAgICB7XHJcbiAgICAgICAgJ2tleSc6IGtleSxcclxuICAgICAgICAndmFsdWVzJzogW10sXHJcbiAgICAgICAgJ2Nzdic6IGRleC5jc3YuY3N2KGNzdi5oZWFkZXIsIFtdKVxyXG4gICAgICB9O1xyXG4gICAgICBmb3IgKGNpID0gMDsgY2kgPCB2YWx1ZXMubGVuZ3RoOyBjaSsrKSB7XHJcbiAgICAgICAgZ3JvdXAudmFsdWVzLnB1c2goeyduYW1lJzogY3N2LmhlYWRlcltjb2x1bW5zW2NpXV0sICd2YWx1ZSc6IHZhbHVlc1tjaV19KTtcclxuICAgICAgfVxyXG4gICAgICBncm91cHNba2V5XSA9IGdyb3VwO1xyXG4gICAgfVxyXG4gICAgLy9ncm91cC5jc3YuZGF0YS5wdXNoKGRleC5hcnJheS5zbGljZShjc3YuZGF0YVtyaV0sIG90aGVyQ29sdW1ucykpO1xyXG4gICAgZ3JvdXAuY3N2LmRhdGEucHVzaChjc3YuZGF0YVtyaV0pO1xyXG4gICAgLy9ncm91cHNba2V5XSA9IGdyb3VwO1xyXG4gIH1cclxuXHJcbiAgZm9yIChncm91cE5hbWUgaW4gZ3JvdXBzKSB7XHJcbiAgICBpZiAoZ3JvdXBzLmhhc093blByb3BlcnR5KGdyb3VwTmFtZSkpIHtcclxuICAgICAgcmV0dXJuR3JvdXBzLnB1c2goZ3JvdXBzW2dyb3VwTmFtZV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJldHVybkdyb3Vwcy5zb3J0KGNvbXBhcmUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBjc3ZcclxuICogQHBhcmFtIGZ1bmNcclxuICovXHJcbmV4cG9ydHMudmlzaXRDZWxscyA9IGZ1bmN0aW9uIChjc3YsIGZ1bmMpIHtcclxuICB2YXIgY2ksIHJpO1xyXG5cclxuICBmb3IgKHJpID0gMDsgcmkgPCBjc3YuZGF0YS5sZW5ndGg7IHJpKyspIHtcclxuICAgIGZvciAoY2kgPSAwOyBjaSA8IGNzdi5oZWFkZXIubGVuZ3RoOyBjaSsrKSB7XHJcbiAgICAgIGZ1bmMoY2ksIHJpLCBjc3YuZGF0YVtyaV1bY2ldKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGNzdlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0cy5sb25nZXN0V29yZCA9IGZ1bmN0aW9uIChjc3YpIHtcclxuICB2YXIgbG9uZ2VzdCA9IDA7XHJcbiAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgY3N2LmRhdGEubGVuZ3RoOyByb3crKykge1xyXG4gICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgY3N2LmRhdGFbcm93XS5sZW5ndGg7IGNvbCsrKSB7XHJcbiAgICAgIGlmIChsb25nZXN0IDwgY3N2LmRhdGFbcm93XVtjb2xdLmxlbmd0aCkge1xyXG4gICAgICAgIGxvbmdlc3QgPSBjc3YuZGF0YVtyb3ddW2NvbF0ubGVuZ3RoO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBsb25nZXN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBjc3ZcclxuICogQHJldHVybnMge3t9fCp9XHJcbiAqL1xyXG5leHBvcnRzLm51bWVyaWNTdWJzZXQgPSBmdW5jdGlvbiAoY3N2KSB7XHJcbiAgcmV0dXJuIGRleC5jc3YuY29sdW1uU2xpY2UoY3N2LCBkZXguY3N2LmdldE51bWVyaWNJbmRpY2VzKGNzdikpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5jYXRlZ29yaWNhbFN1YnNldCA9IGZ1bmN0aW9uIChjc3YpIHtcclxuICByZXR1cm4gZGV4LmNzdi5jb2x1bW5TbGljZShjc3YsIGRleC5jc3YuZ2V0Q2F0ZWdvcmljYWxJbmRpY2VzKGNzdikpO1xyXG59O1xyXG5cclxuLypcclxuIHZhciBkYXRhID1cclxuXHJcbiAqL1xyXG5leHBvcnRzLnRvSnNvbkhpZXJhcmNoeSA9IGZ1bmN0aW9uIChjc3YsIGNpKSB7XHJcbiAgLy8gSWYgMSBhcmd1bWVudCwgdGhlbiBzZXR1cCBhbmQgY2FsbCB3aXRoIDIuXHJcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkge1xyXG4gICAgdmFyIHJlc3VsdCA9IHsnbmFtZSc6ICdyb290JywgY2hpbGRyZW46IGRleC5jc3YudG9Kc29uSGllcmFyY2h5KGNzdiwgMCl9O1xyXG4gICAgZGV4LmNvbnNvbGUubG9nKFwiUkVTVUxUXCIsIHJlc3VsdCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIpIHtcclxuICAgIHZhciB2YWx1ZU1hcCA9IHt9O1xyXG5cclxuICAgIGZvciAodmFyIHJpID0gMDsgcmkgPCBjc3YuZGF0YS5sZW5ndGg7IHJpKyspIHtcclxuICAgICAgaWYgKHZhbHVlTWFwLmhhc093blByb3BlcnR5KGNzdi5kYXRhW3JpXVtjaV0pKSB7XHJcbiAgICAgICAgdmFsdWVNYXBbY3N2LmRhdGFbcmldW2NpXV0rKztcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB2YWx1ZU1hcFtjc3YuZGF0YVtyaV1bY2ldXSA9IDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2kgPj0gY3N2LmhlYWRlci5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHJldHVybiBfLmtleXModmFsdWVNYXApLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHsnbmFtZSc6IGtleSwgJ3NpemUnOiB2YWx1ZU1hcFtrZXldfTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIF8ua2V5cyh2YWx1ZU1hcCkubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4geyduYW1lJzoga2V5LCAnc2l6ZSc6IHZhbHVlTWFwW2tleV19O1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnRzLmdldEdyYXBoID0gZnVuY3Rpb24gKGNzdikge1xyXG5cclxuICB2YXIgbm9kZXMgPSBbXTtcclxuICB2YXIgbGlua3MgPSBbXTtcclxuICB2YXIgbm9kZU51bSA9IDA7XHJcbiAgdmFyIGluZGV4TWFwID0gW107XHJcblxyXG4gIC8vIFJlY29yZCB1bmlxdWVzIGFjcm9zcyB0aGUgZGF0YSwgdHJlYXRpbmcgZWFjaCBjb2x1bW4gYXMgaXQncyBvd24gbmFtZXNwYWNlLlxyXG4gIGNzdi5oZWFkZXIubWFwKGZ1bmN0aW9uIChjb2wsIGNpKSB7XHJcbiAgICBpbmRleE1hcC5wdXNoKHt9KTtcclxuICAgIGNzdi5kYXRhLm1hcChmdW5jdGlvbiAocm93LCByaSkge1xyXG4gICAgICBpZiAoXy5pc1VuZGVmaW5lZChpbmRleE1hcFtjaV1bcm93W2NpXV0pKVxyXG4gICAgICB7XHJcbiAgICAgICAgaW5kZXhNYXBbY2ldW3Jvd1tjaV1dPSBub2RlTnVtO1xyXG4gICAgICAgIG5vZGVzLnB1c2goeyduYW1lJyA6IHJvd1tjaV19KTtcclxuICAgICAgICBub2RlTnVtKys7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBmb3IgKHZhciBjaT0xOyBjaTxjc3YuaGVhZGVyLmxlbmd0aDsgY2krKylcclxuICB7XHJcbiAgICBjc3YuZGF0YS5tYXAoZnVuY3Rpb24gKHJvdywgcmkpIHtcclxuICAgICAgbGlua3MucHVzaCh7ICdzb3VyY2UnIDogaW5kZXhNYXBbY2ktMV1bcm93W2NpLTFdXSwgJ3RhcmdldCcgOiBpbmRleE1hcFtjaV1bcm93W2NpXV0sICd2YWx1ZScgOiAxfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vZGV4LmNvbnNvbGUubG9nKFwiTk9ERVNcIiwgbm9kZXMsIGxpbmtzLCBpbmRleE1hcCk7XHJcbiAgcmV0dXJuIHsgJ25vZGVzJyA6IG5vZGVzLCAnbGlua3MnIDogbGlua3MgfTtcclxufTtcclxuXHJcbmV4cG9ydHMudG9OZXN0ZWRKc29uID0gZnVuY3Rpb24gKGNzdikge1xyXG4gIGRleC5jb25zb2xlLmxvZyhcIkNNQVBcIiwgZGV4LmNzdi5nZXRDb25uZWN0aW9uTWFwKGNzdikpO1xyXG4gIHZhciByZXN1bHQgPSB7J25hbWUnOiBjc3YuaGVhZGVyWzBdLCAnY2hpbGRyZW4nOiBkZXguY3N2LnRvTmVzdGVkSnNvbkNoaWxkcmVuKGRleC5jc3YuZ2V0Q29ubmVjdGlvbk1hcChjc3YpKX07XHJcbiAgZGV4LmNvbnNvbGUubG9nKFwiUkVTVUxUXCIsIHJlc3VsdCk7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmV4cG9ydHMudG9OZXN0ZWRKc29uQ2hpbGRyZW4gPSBmdW5jdGlvbiAoY21hcCkge1xyXG4gIC8vZGV4LmNvbnNvbGUubG9nKFwiQ01BUFwiLCBjbWFwKTtcclxuICB2YXIgY2hpbGRyZW4gPSBbXTtcclxuXHJcbiAgXy5rZXlzKGNtYXApLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICB2YXIgY2hpbGRNYXAgPSBjbWFwW2tleV07XHJcbiAgICBpZiAoXy5rZXlzKGNoaWxkTWFwKS5sZW5ndGggPD0gMCkge1xyXG4gICAgICBjaGlsZHJlbi5wdXNoKHsnbmFtZSc6IGtleSwgJ3NpemUnOiAxMDAwfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaWYgKF8ua2V5cyhjaGlsZE1hcCkubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAvL3ZhciBncmFuZENoaWxkTWFwID0gY2hpbGRNYXBbXy5rZXlzKGNoaWxkTWFwKVswXV07XHJcblxyXG4gICAgICAgIC8vZGV4LmNvbnNvbGUubG9nKFwiR0NNQVBcIiwgZ3JhbmRDaGlsZE1hcCk7XHJcbiAgICAgICAgLy9pZiAoXy5rZXlzKGdyYW5kQ2hpbGRNYXApLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgLy8gIGNoaWxkcmVuLnB1c2goeyduYW1lJzoga2V5LCAnc2l6ZSc6IDEwMH0pO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7J25hbWUnOiBrZXksICdjaGlsZHJlbic6IGRleC5jc3YudG9OZXN0ZWRKc29uQ2hpbGRyZW4oY21hcFtrZXldKX0pO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGNoaWxkcmVuLnB1c2goeyduYW1lJzoga2V5LCAnY2hpbGRyZW4nOiBkZXguY3N2LnRvTmVzdGVkSnNvbkNoaWxkcmVuKGNtYXBba2V5XSl9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgcmV0dXJuIGNoaWxkcmVuO1xyXG59O1xyXG5cclxuZXhwb3J0cy5nZXRDb25uZWN0aW9uTWFwID0gZnVuY3Rpb24gKGNzdikge1xyXG4gIHZhciByb290TWFwID0ge307XHJcbiAgdmFyIGN1ck1hcCA9IHt9XHJcblxyXG4gIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IGNzdi5kYXRhLmxlbmd0aDsgcm93KyspIHtcclxuICAgIGN1ck1hcCA9IHJvb3RNYXA7XHJcblxyXG4gICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgY3N2LmhlYWRlci5sZW5ndGg7IGNvbCsrKSB7XHJcbiAgICAgIGlmICghXy5oYXMoY3VyTWFwLCBjc3YuZGF0YVtyb3ddW2NvbF0pKSB7XHJcbiAgICAgICAgY3VyTWFwW2Nzdi5kYXRhW3Jvd11bY29sXV0gPSB7fTtcclxuICAgICAgfVxyXG4gICAgICBjdXJNYXAgPSBjdXJNYXBbY3N2LmRhdGFbcm93XVtjb2xdXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiByb290TWFwO1xyXG59OyIsIi8qKlxyXG4gKlxyXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBzdXBwb3J0IGZvciBjcmVhdGluZyB2YXJpb3VzIGRhdGFzZXRzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIGRhdGFnZW5cclxuICpcclxuICovXHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG1hdHJpeCBvZiByYW5kb20gaW50ZWdlcnMgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBzcGVjIFRoZSBtYXRyaXggc3BlY2lmaWNhdGlvbi4gIEV4OiBcXHtyb3dzOjEwLCBjb2x1bW5zOiA0LCBtaW46IDAsIG1heDoxMDBcXH1cclxuICpcclxuICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSBjb250YWluaW5nIHNwZWMucm93cyBudW1iZXIgb2Ygcm93cy4gIEVhY2ggcm93IGNvbnNpc3Rpbmcgb2ZcclxuICogYW4gYXJyYXkgY29udGFpbmluZyBzcGVjLmNvbHVtbnMgZWxlbWVudHMuICBFYWNoIGVsZW1lbnQgaXMgYSByYW5kb21seSBnZW5lcmF0ZWQgaW50ZWdlclxyXG4gKiB3aXRoaW4gdGhlIHJhbmdlIFtzcGVjLm1pbiwgc3BlYy5tYXhdXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLnJhbmRvbU1hdHJpeCA9IGZ1bmN0aW9uIChzcGVjKSB7XHJcbiAgdmFyIHJpLCBjaTtcclxuXHJcbiAgLy97cm93czoxMCwgY29sdW1uczogNCwgbWluLCAwLCBtYXg6MTAwfSlcclxuICB2YXIgbWF0cml4ID0gW107XHJcbiAgdmFyIHJhbmdlID0gc3BlYy5tYXggLSBzcGVjLm1pbjtcclxuICBmb3IgKHJpID0gMDsgcmkgPCBzcGVjLnJvd3M7IHJpKyspIHtcclxuICAgIHZhciByb3cgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNpID0gMDsgY2kgPCBzcGVjLmNvbHVtbnM7IGNpKyspIHtcclxuICAgICAgcm93LnB1c2goTWF0aC5yYW5kb20oKSAqIHJhbmdlICsgc3BlYy5taW4pO1xyXG4gICAgfVxyXG4gICAgbWF0cml4LnB1c2gocm93KTtcclxuICB9XHJcbiAgcmV0dXJuIG1hdHJpeDtcclxufTtcclxuXHJcbmV4cG9ydHMucmFuZG9tSW5kZXhlZE1hdHJpeCA9IGZ1bmN0aW9uIChzcGVjKSB7XHJcbiAgdmFyIHJpLCBjaTtcclxuXHJcbiAgLy97cm93czoxMCwgY29sdW1uczogNCwgbWluLCAwLCBtYXg6MTAwfSlcclxuICB2YXIgbWF0cml4ID0gW107XHJcbiAgdmFyIHJhbmdlID0gc3BlYy5tYXggLSBzcGVjLm1pbjtcclxuICBmb3IgKHJpID0gMDsgcmkgPCBzcGVjLnJvd3M7IHJpKyspIHtcclxuICAgIHZhciByb3cgPSBbXTtcclxuXHJcbiAgICByb3cucHVzaChyaSsxKTtcclxuICAgIGZvciAoY2kgPSAwOyBjaSA8IHNwZWMuY29sdW1ucyAtIDE7IGNpKyspIHtcclxuICAgICAgcm93LnB1c2goTWF0aC5yYW5kb20oKSAqIHJhbmdlICsgc3BlYy5taW4pO1xyXG4gICAgfVxyXG4gICAgbWF0cml4LnB1c2gocm93KTtcclxuICB9XHJcbiAgcmV0dXJuIG1hdHJpeDtcclxufTtcclxuXHJcbmV4cG9ydHMucmFuZG9tSW50ZWdlck1hdHJpeCA9IGZ1bmN0aW9uIChzcGVjKSB7XHJcbiAgdmFyIHJpLCBjaTtcclxuXHJcbiAgLy97cm93czoxMCwgY29sdW1uczogNCwgbWluLCAwLCBtYXg6MTAwfSlcclxuICB2YXIgbWF0cml4ID0gW107XHJcbiAgdmFyIHJhbmdlID0gc3BlYy5tYXggLSBzcGVjLm1pbjtcclxuICBmb3IgKHJpID0gMDsgcmkgPCBzcGVjLnJvd3M7IHJpKyspIHtcclxuICAgIHZhciByb3cgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNpID0gMDsgY2kgPCBzcGVjLmNvbHVtbnM7IGNpKyspIHtcclxuICAgICAgcm93LnB1c2goTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogcmFuZ2UgKyBzcGVjLm1pbikpO1xyXG4gICAgfVxyXG4gICAgbWF0cml4LnB1c2gocm93KTtcclxuICB9XHJcbiAgcmV0dXJuIG1hdHJpeDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbWF0cml4IG9mIHJhbmRvbSBpbnRlZ2VycyB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZS5cclxuICpcclxuICogQHBhcmFtIHNwZWMgVGhlIG1hdHJpeCBzcGVjaWZpY2F0aW9uLiAgRXg6IFxce3Jvd3M6MTAsIGNvbHVtbnM6NCBcXH1cclxuICpcclxuICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSBjb250YWluaW5nIHNwZWMucm93cyBudW1iZXIgb2Ygcm93cy4gIEVhY2ggcm93IGNvbnNpc3Rpbmcgb2ZcclxuICogYW4gYXJyYXkgY29udGFpbmluZyBzcGVjLmNvbHVtbnMgZWxlbWVudHMuICBFYWNoIGVsZW1lbnQgaXMgYSByYW5kb21seSBnZW5lcmF0ZWQgaW50ZWdlclxyXG4gKiB3aXRoaW4gdGhlIHJhbmdlIFtzcGVjLm1pbiwgc3BlYy5tYXhdXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmlkZW50aXR5Q3N2ID0gZnVuY3Rpb24gKHNwZWMpIHtcclxuICB2YXIgcmksIGNpO1xyXG4gIHZhciBjc3YgPSB7fTtcclxuICBjc3YuaGVhZGVyID0gZGV4LmRhdGFnZW4uaWRlbnRpdHlIZWFkZXIoc3BlYyk7XHJcbiAgY3N2LmRhdGEgPSBkZXguZGF0YWdlbi5pZGVudGl0eU1hdHJpeChzcGVjKTtcclxuICByZXR1cm4gY3N2O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGFuIGlkZW50aXR5IGZ1bmN0aW9uIG1lZXRpbmcgdGhlIHN1cHBsaWVkXHJcbiAqIHNwZWNpZmljYXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBzcGVjIC0gVGhlIGlkZW50aXR5TWF0cml4IHNwZWNpZmljYXRpb24uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzcGVjLnJvd3MgLSBUaGUgbnVtYmVyIG9mIHJvd3MgdG8gZ2VuZXJhdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzcGVjLmNvbHVtbnMgLSBUaGUgbnVtYmVyIG9mIGNvbHVtbnMgdG8gZ2VuZXJhdGUuXHJcbiAqIEBleGFtcGxlIHtAbGFuZyBqYXZhc2NyaXB0fVxyXG4gKiAvLyBSZXR1cm5zOiBbWydSMUMxJywgJ1IxQzInIF0sIFsnUjJDMScsICdSMkMyJ10sIFsnUjNDMScsICdSM0MyJ11dXHJcbiAqIGlkZW50aXR5TWF0cml4KHtyb3dzOiAzLCBjb2x1bW5zOiAyfSk7XHJcbiAqIEByZXR1cm5zIHttYXRyaXh9XHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmlkZW50aXR5TWF0cml4ID0gZnVuY3Rpb24gKHNwZWMpIHtcclxuICB2YXIgcmksIGNpO1xyXG5cclxuICAvLyB7IHJvd3M6MTAsIGNvbHVtbnM6NCB9KVxyXG4gIHZhciBtYXRyaXggPSBbXTtcclxuICBmb3IgKHJpID0gMDsgcmkgPCBzcGVjLnJvd3M7IHJpKyspIHtcclxuICAgIHZhciByb3cgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNpID0gMDsgY2kgPCBzcGVjLmNvbHVtbnM7IGNpKyspIHtcclxuICAgICAgcm93LnB1c2goXCJSXCIgKyAocmkgKyAxKSArIFwiQ1wiICsgKGNpICsgMSkpO1xyXG4gICAgfVxyXG4gICAgbWF0cml4LnB1c2gocm93KTtcclxuICB9XHJcbiAgcmV0dXJuIG1hdHJpeDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGlkZW50aXR5IGhlYWRlciBhcnJheS5cclxuICpcclxuICogQHBhcmFtIHNwZWMgLSBUaGUgc3BlY2lmaWNhdGlvbiBmb3IgdGhlIGhlYWRlciBhcnJheS5cclxuICogQHBhcmFtIHNwZWMuY29sdW1ucyAtIFRoZSBudW1iZXIgb2YgY29sdW1ucyB0byBnZW5lcmF0ZS5cclxuICogQGV4YW1wbGVcclxuICogLy8gUmV0dXJuczogWyAnQzEnLCAnQzInLCAnQzMnIF1cclxuICogaWRlbnRpdHlIZWFkZXIoeyBjb2x1bW5zOiAzIH0pO1xyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHNwZWNpZmllZCBjb2x1bW5zLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5pZGVudGl0eUhlYWRlciA9IGZ1bmN0aW9uIChzcGVjKSB7XHJcbiAgcmV0dXJuIGRleC5yYW5nZSgxLCBzcGVjLmNvbHVtbnMpLm1hcChmdW5jdGlvbiAoaSkge1xyXG4gICAgcmV0dXJuIFwiQ1wiICsgaTtcclxuICB9KTtcclxufTtcclxuIiwiLyoqXHJcbiAqXHJcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIHJvdXRpbmVzIGRlYWxpbmcgd2l0aCBqc29uIGRhdGEuXHJcbiAqXHJcbiAqIEBtb2R1bGUganNvblxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBKU09OIGFuZCBhIGhlYWRlciB0byBhIENTViBmaWxlLiAgSXQgaXMgdXNlZCBmb3IgcGFyYWxsZWwgY29vcmRpbmF0ZSBicnVzaFxyXG4gKiBldmVudHMgd2hlcmUgdGhlIHNlbGVjdGVkIGJydXNoIG11c3QgYmUgcHVibGlzaGVkIHRvIGV2ZW50cyBhcyBhIGNzdi5cclxuICpcclxuICogRm9yIGV4YW1wbGUsIGdpdmVuOlxyXG4gKlxyXG4gKiBqc29uICAgPSBbIHsgQTogMSwgQjogMywgQzogNSwgRDogNyB9LFxyXG4gKiAgICAgICAgICAgIHsgQTogMiwgQjogNCwgQzogNiwgRDogOCB9IF07XHJcbiAqIGhlYWRlciA9IFsgJ0EnLCAnQicsICdDJywgJ0QnIF07XHJcbiAqXHJcbiAqIFRoaXMgd2lsbCByZXR1cm4gYSBjc3Ygd2hlcmU6XHJcbiAqXHJcbiAqIGNzdiA9IHsgaGVhZGVyOiBbICdBJywgJ0InLCAnQycsICdEJyBdLFxyXG4gKiAgICAgICAgIGRhdGEgICAgW1sgMSwgNCwgNSwgNyBdLCBbIDIsIDQsIDYsIDggXV07XHJcbiAqXHJcbiAqIEBwYXJhbSBqc29uXHJcbiAqIEBwYXJhbSBoZWFkZXJcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5leHBvcnRzLnRvQ3N2ID0gZnVuY3Rpb24gKGpzb24sIGhlYWRlcikge1xyXG4gIHZhciBjc3Y7XHJcbiAgdmFyIHJpLCBjaTtcclxuICB2YXIgZGF0YSA9IFtdO1xyXG5cclxuICAvLyBLZXlzIGFyZSBwcm92aWRlZC5cclxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xyXG4gICAgICBmb3IgKHJpID0gMDsgcmkgPCBqc29uLmxlbmd0aDsgcmkrKykge1xyXG4gICAgICAgIHZhciByb3cgPSBbXTtcclxuICAgICAgICBmb3IgKGNpID0gMDsgY2kgPCBoZWFkZXIubGVuZ3RoOyBjaSsrKSB7XHJcbiAgICAgICAgICByb3cucHVzaChqc29uW3JpXVtoZWFkZXJbY2ldXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEucHVzaChyb3cpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdmFyIHJvdyA9IFtdO1xyXG4gICAgICBmb3IgKGNpID0gMDsgY2kgPCBoZWFkZXIubGVuZ3RoOyBjaSsrKSB7XHJcbiAgICAgICAgcm93LnB1c2goanNvbltyaV1baGVhZGVyW2NpXV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGRhdGEucHVzaChyb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRleC5jc3YuY3N2KGhlYWRlciwgZGF0YSk7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgcmV0dXJuIGRleC5qc29uLnRvQ3N2KGpzb24sIGRleC5qc29uLmtleXMoanNvbikpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFsbCBrZXlzIGZvdW5kIGluIGEganNvbiBzdHJ1Y3R1cmUgb3IgYXJyYXkgb2YganNvbiBzdHJ1Y3R1cmVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ganNvbiAgVGhlIGpzb24gc3RydWN0dXJlIG9yIGFycmF5IG9mIGpzb24gc3RydWN0dXJlcy5cclxuICogQHJldHVybnMge0FycmF5fSBBIGxpc3Qgb2Yga2V5cyBmb3VuZCB3aXRoaW4ganNvbi5cclxuICpcclxuICovXHJcbmV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uIChqc29uKSB7XHJcbiAgdmFyIGtleU1hcCA9IHt9O1xyXG4gIHZhciBrZXlzID0gW107XHJcbiAgdmFyIHJpLCBrZXk7XHJcblxyXG4gIGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XHJcbiAgICBmb3IgKHJpID0gMDsgcmkgPCBqc29uLmxlbmd0aDsgcmkrKykge1xyXG4gICAgICBmb3IgKGtleSBpbiBqc29uW3JpXSkge1xyXG4gICAgICAgIGtleU1hcFtrZXldID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIGZvciAoa2V5IGluIGpzb24pIHtcclxuICAgICAga2V5TWFwW2tleV0gPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yIChrZXkgaW4ga2V5TWFwKSB7XHJcbiAgICBrZXlzLnB1c2goa2V5KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBrZXlzO1xyXG59O1xyXG4iLCIvKipcclxuICpcclxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgcm91dGluZXMgZGVhbGluZyB3aXRoIG1hdHJpY2VzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIG1hdHJpeFxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBSZXR1cm4gdGhlIHNwZWNpZmllZCBzbGljZSBvZiB0aGUgbWF0cml4LiAgVGhlIG9yaWdpbmFsIG1hdHJpeCBpc1xyXG4gKiBub3QgYWx0ZXJlZC5cclxuICpcclxuICogQHBhcmFtIHttYXRyaXh9IG1hdHJpeCBUaGUgbWF0cml4IHRvIGJlIHNsaWNlZC5cclxuICogQHBhcmFtIHtBcnJheS48bnVtYmVyPn0gY29sdW1ucyAtIEFuIGFycmF5IG9mIGNvbHVtbiBpbmRpY2VzIHRvIGluY2x1ZGUgd2l0aGluIHRoZSBzbGljZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IFtyb3dzXSBJZiBzdXBwbGllZCwgdGhlIHNsaWNlIHdpbGwgY29uc2lzdCBvbmx5IG9mIHRoZSBzcGVjaWZpZWRcclxuICogbnVtYmVyIG9mIHJvd3MuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHttYXRyaXh9XHJcbiAqL1xyXG5leHBvcnRzLnNsaWNlID0gZnVuY3Rpb24gKG1hdHJpeCwgY29sdW1ucywgcm93cykge1xyXG4gIHZhciBtYXRyaXhTbGljZSA9IG5ldyBBcnJheSgwKTtcclxuICAvL2RleC5jb25zb2xlLmxvZyhcIlBSRS1TTElDRSAobWF0cml4U2xpemUpOlwiICsgbWF0cml4U2xpY2UpO1xyXG4gIHZhciByaTtcclxuXHJcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcclxuICAgIGZvciAocmkgPSAwOyByaSA8IHJvd3MubGVuZ3RoOyByaSsrKSB7XHJcbiAgICAgIG1hdHJpeFNsaWNlLnB1c2goZGV4LmFycmF5LnNsaWNlKG1hdHJpeFtyb3dzW3JpXV0pKTtcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBmb3IgKHJpID0gMDsgcmkgPCBtYXRyaXgubGVuZ3RoOyByaSsrKSB7XHJcbiAgICAgIC8vZGV4LmNvbnNvbGUubG9nKFwiTUFUUklYLVNMSUNFLUJFRk9SRVtcIiArIHJpICsgXCJdOlwiICsgbWF0cml4U2xpY2UpO1xyXG4gICAgICBtYXRyaXhTbGljZS5wdXNoKGRleC5hcnJheS5zbGljZShtYXRyaXhbcmldLCBjb2x1bW5zKSk7XHJcbiAgICAgIC8vZGV4LmNvbnNvbGUubG9nKFwiTUFUUklYLVNMSUNFLUFGVEVSW1wiICsgcmkgKyBcIl1cIiArIG1hdHJpeFNsaWNlKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG1hdHJpeFNsaWNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFJldHVybnMgYSBtYXRyaXggY29uc2lzdGluZyBvZiB1bmlxdWUgdmFsdWVzIHJlbGF0aXZlIHRvIGVhY2hcclxuICogY29sdW1uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdHJpeH0gbWF0cml4IFRoZSBtYXRyaXggdG8gZXZhbHVhdGUuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE9iamVjdD4+fSBUaGUgdW5pcXVlIHZhbHVlcyByZWxhdGl2ZSB0byBlYWNoIGNvbHVtbi4gSW4gdGhlIGZvcm1cclxuICogb2YgW1sgY29sdW1uIDEgdW5pcXVlIHZhbHVlc10sIFtjb2x1bW4gMiB1bmlxdWUgdmFsdWVzXSwgLi4uXV1cclxuICpcclxuICovXHJcbmV4cG9ydHMudW5pcXVlcyA9IGZ1bmN0aW9uIChtYXRyaXgpIHtcclxuICB2YXIgY2k7XHJcbiAgdmFyIHVuaXF1ZXMgPSBbXTtcclxuICB2YXIgdG1hdHJpeCA9IGRleC5tYXRyaXgudHJhbnNwb3NlKG1hdHJpeCk7XHJcbiAgdmFyIG5jb2wgPSB0bWF0cml4Lmxlbmd0aDtcclxuXHJcbiAgZm9yIChjaSA9IDA7IGNpIDwgbmNvbDsgY2kgKz0gMSkge1xyXG4gICAgdW5pcXVlcy5wdXNoKF8udW5pcSh0bWF0cml4W2NpXSkpO1xyXG4gIH1cclxuICByZXR1cm4gdW5pcXVlcztcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBSZXR1cm5zIGEgdHJhbnNwb3NlZCBtYXRyaXggd2hlcmUgdGhlIHJvd3Mgb2YgdGhlIG5ldyBtYXRyaXggYXJlIHRyYW5zcG9zZWRcclxuICogd2l0aCBpdCdzIGNvbHVtbnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0cml4fSBtYXRyaXggLSBUaGUgbWF0cml4IHRvIHRyYW5zcG9zZS5cclxuICpcclxuICogQHJldHVybnMge21hdHJpeH0gVGhlIHRyYW5zcG9zZWQgbWF0cml4LCBsZWF2aW5nIHRoZSBvcmlnaW5hbCBtYXRyaXggdW50b3VjaGVkLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSB7QGxhbmcgamF2YXNjcmlwdH1cclxuICogLy8gUmV0dXJucyBbWydSMUMxJywgJ1IyQzEnLCAnUjNDMSddLCBbJ1IxQzInLCAnUjJDMicsICdSM0MyJyBdXVxyXG4gKiB0cmFuc3Bvc2UoW1snUjFDMScsICdSMUMyJ10sIFsnUjJDMScsICdSMkMyXSwgWydSM0MxJywgJ1IzQzInXV0pO1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy50cmFuc3Bvc2UgPSBmdW5jdGlvbiAobWF0cml4KSB7XHJcbiAgdmFyIGNpO1xyXG4gIHZhciBuY29scztcclxuICB2YXIgdHJhbnNwb3NlZE1hdHJpeCA9IFtdO1xyXG4gIC8vZGV4LmNvbnNvbGUubG9nKFwiVHJhbnNwb3Npbmc6XCIsIG1hdHJpeCk7XHJcblxyXG4gIGlmICghbWF0cml4IHx8IG1hdHJpeC5sZW5ndGggPD0gMCB8fCAhbWF0cml4WzBdIHx8IG1hdHJpeFswXS5sZW5ndGggPD0gMCkge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgbmNvbHMgPSBtYXRyaXhbMF0ubGVuZ3RoO1xyXG5cclxuICBmb3IgKGNpID0gMDsgY2kgPCBuY29sczsgY2krKykge1xyXG4gICAgdHJhbnNwb3NlZE1hdHJpeC5wdXNoKG1hdHJpeC5tYXAoZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICByZXR1cm4gcm93W2NpXTtcclxuICAgIH0pKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0cmFuc3Bvc2VkTWF0cml4O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFJldHVybiBhIHNsaWNlIG9mIHRoaXMgbWF0cml4IGJhc2VkIHVwb24gdGhlIHN1cHBsaWVkIGNvbHVtbnMuXHJcbiAqIFRoZSBvcmlnaW5hbCBtYXRyaXggd2lsbCBiZSBsZWZ0IHVudG91Y2hlZC5cclxuICpcclxuICogQHBhcmFtIHttYXRyaXh9IG1hdHJpeCAtIFRoZSBtYXRyaXggdG8gc2xpY2UuXHJcbiAqIEBwYXJhbSB7QXJyYXkuPG51bWJlcj59IGNvbHVtbnMgLSBBbiBhcnJheSBvZiBjb2x1bW4gaW5kZXhlcyB0byBiZSBpbmNsdWRlZCBpbiB0aGUgc2xpY2UuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKlxyXG4gKi9cclxuLypcclxuIGV4cG9ydHMuY29sdW1uU2xpY2UgPSBmdW5jdGlvbiAobWF0cml4LCBjb2x1bW5zKSB7XHJcbiAvLyBUT0RPOiBEZXRlcm1pbmUsIGlzIHRoaXMgZGVzdHJ1Y3RpdmU/XHJcbiB2YXIgc2xpY2UgPSBbXTtcclxuIHZhciByaTtcclxuIHZhciB0cmFuc3Bvc2VNYXRyaXg7XHJcblxyXG4gaWYgKGFyZ3VtZW50cy5sZW5ndGggIT0gMikge1xyXG4gcmV0dXJuIG1hdHJpeDtcclxuIH1cclxuXHJcbiB0cmFuc3Bvc2VNYXRyaXggPSBkZXgubWF0cml4LnRyYW5zcG9zZShtYXRyaXgpO1xyXG4gLy9kZXguY29uc29sZS5sb2coXCJ0cmFuc3Bvc2luZ1wiLCBtYXRyaXgsIFwidHJhbnNwb3NlXCIsIHRyYW5zcG9zZWRNYXRyaXgpO1xyXG5cclxuIC8vIFNwZWNpZmljIGNvbHVtbnMgdGFyZ2V0dGVkOlxyXG4gaWYgKEFycmF5LmlzQXJyYXkoY29sdW1ucykpIHtcclxuIGZvciAocmkgPSAwOyByaSA8IGNvbHVtbnMubGVuZ3RoOyByaSArPSAxKSB7XHJcbiBzbGljZS5wdXNoKHRyYW5zcG9zZU1hdHJpeFtjb2x1bW5zW3JpXV0pO1xyXG4gfVxyXG4gfVxyXG4gLy8gU2luZ2xlIGNvbHVtbi5cclxuIGVsc2Uge1xyXG4gc2xpY2UucHVzaCh0cmFuc3Bvc2VNYXRyaXhbY29sdW1uc10pO1xyXG4gfVxyXG5cclxuIC8vIEJhY2sgdG8gcm93L2NvbHVtbiBmb3JtYXQuXHJcbiByZXR1cm4gZGV4Lm1hdHJpeC50cmFuc3Bvc2Uoc2xpY2UpO1xyXG4gfTtcclxuICovXHJcblxyXG4vKipcclxuICpcclxuICogUmV0dXJuIGEgZmxhdHRlbmVkIHZlcnNpb24gb2YgdGhlIG1hdHJpeC5cclxuICpcclxuICogQHBhcmFtIHttYXRyaXh9IG1hdHJpeCAtIFRoZSBtYXRyaXggdG8gZmxhdHRlbi5cclxuICpcclxuICogQHJldHVybnMge0FycmF5LjxPYmplY3Q+fSBBIGZsYXR0ZW5lZCB2ZXJzaW9uIG9mIHRoZSBtYXRyaXguXHJcbiAqXHJcbiAqIEBleGFtcGxlIHtAbGFuZyBqYXZhc2NyaXB0fVxyXG4gKiAvLyBEZWZpbmUgYSBzaW1wbGUgbWF0cml4LlxyXG4gKiB2YXIgbWF0cml4ID0gW1sncjFjMScsICdyMWMyJ10sIFsncjJjMScsICdyMmMyJ11dXHJcbiAqXHJcbiAqIC8vIFJldHVybnM6IFsncjFjMScsICdyMWMyJywgJ3IyYzEnLCAncjJjMiddXHJcbiAqIGZsYXR0ZW4obWF0cml4KTtcclxuICpcclxuICovXHJcbmV4cG9ydHMuZmxhdHRlbiA9IGZ1bmN0aW9uIChtYXRyaXgpIHtcclxuICByZXR1cm4gXy5mbGF0dGVuKG1hdHJpeCk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZSBpbiB0aGUgZm9ybSBvZjogW21pbixtYXhdXHJcbiAqIGZyb20gdGhlIHNwZWNpZmllZCBzdWJzZXQgb2YgdGhlIG1hdHJpeC5cclxuICpcclxuICogQHBhcmFtIHttYXRyaXh9IG1hdHJpeCAtIFRoZSBtYXRyaXggdG8gc2Nhbi5cclxuICogQHBhcmFtIHtBcnJheS48bnVtYmVyPnxudW1iZXJdIFtpbmRpY2VzXSAtIFdoZW4gc3VwcGxpZWQsIHdpbGwgY29udHJhaW4gdGhlIGV4dGVudFxyXG4gKiBzZWFyY2ggdG8ganVzdCB0aG9zZSBjb2x1bW5zIHNwZWNpZmllZCBieSB0aGlzIGxpc3Qgb2YgaW5kaWNlcy5cclxuICpcclxuICogQHJldHVybnMge0FycmF5LjxudW1iZXI+fSBBbiBhcnJheSBvZiB0d28gZWxlbWVudHM6IFsgbWluLCBtYXggXVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5leHRlbnQgPSBmdW5jdGlvbiAobWF0cml4LCBpbmRpY2VzKSB7XHJcbiAgdmFyIHZhbHVlcyA9IG1hdHJpeDtcclxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgdmFsdWVzID0gZGV4Lm1hdHJpeC5mbGF0dGVuKGRleC5tYXRyaXguc2xpY2UobWF0cml4LCBpbmRpY2VzKSk7XHJcbiAgICB2YXIgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgdmFsdWVzKTtcclxuICAgIHZhciBtaW4gPSBNYXRoLm1pbi5hcHBseShudWxsLCB2YWx1ZXMpO1xyXG4gICAgcmV0dXJuIFttaW4sIG1heF07XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIENvbWJpbmUgZWFjaCBjb2x1bW4gaW4gbWF0cml4MSB3aXRoIGVhY2ggY29sdW1uIGluIG1hdHJpeDIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0cml4fSBtYXRyaXgxIFRoZSBmaXJzdCBtYXRyaXggdG8gY29tYmluZS5cclxuICogQHBhcmFtIHttYXRyaXh9IG1hdHJpeDIgVGhlIHNlY29uZCBtYXRyaXggdG8gY29tYmluZS5cclxuICpcclxuICogQHJldHVybnMge21hdHJpeH0gVGhlIGNvbWJpbmVkIG1hdHJpeC5cclxuICpcclxuICogQGV4YW1wbGUge0BsYW5nIGphdmFzY3JpcHR9XHJcbiAqIHZhciBtYXRyaXgxID0gW1snbTFyMWMxJywgJ20xcjFjMiddLCBbJ20xcjJjMScsICdtMXIyYzInXV1cclxuICogdmFyIG1hdHJpeDIgPSBbWydtMnIxYzEnLCAnbTJyMWMyJ10sIFsnbTJyMmMxJywgJ20ycjJjMiddXVxyXG4gKlxyXG4gKiAvLyBSZXR1cm5zOiBbWydtMXIxYzEnLCAnbTFyMWMyJywgJ20ycjFjMScsICdtMnIxYzInXSwgWydtMXIyYzEnLCAnbTFyMmMyJywgJ20ycjJjMScsICdtMnIyYzInXV1cclxuICogdmFyIHJlc3VsdCA9IGNvbWJpbmUobWF0cml4MSwgbWF0cml4Mik7XHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmNvbWJpbmUgPSBmdW5jdGlvbiAobWF0cml4MSwgbWF0cml4Mikge1xyXG4gIHZhciByZXN1bHQgPSBfLmNsb25lKG1hdHJpeDEpO1xyXG5cclxuICB2YXIgcmk7XHJcblxyXG4gIGZvciAocmkgPSAwOyByaSA8IG1hdHJpeDIubGVuZ3RoOyByaSsrKSB7XHJcbiAgICByZXN1bHRbcmldID0gcmVzdWx0W3JpXS5jb25jYXQobWF0cml4MltyaV0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBSZXR1cm4gYSBjb3B5IG9mIHRoZSBzdXBwbGllZCBtYXRyaXguXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0cml4fSBtYXRyaXggVGhlIG1hdHJpeCB0byBjb3B5LlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IEEgY29weSBvZiB0aGUgb3JpZ2luYWwgbWF0cml4LlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5jb3B5ID0gZnVuY3Rpb24gKG1hdHJpeCkge1xyXG4gIHJldHVybiBtYXRyaXgubWFwKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgIHJldHVybiBfLmNsb25lKHJvdyk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogSW5zZXJ0IGEgbmV3IGNvbHVtbiBhdCBwb3NpdGlvbiAwIHdpdGhpbiB0aGlzIG1hdHJpeCB3aGljaCB3aWxsIGNvbnRhaW5cclxuICogaW50ZWdlciB2YWx1ZXMgc3RhcnRpbmcgYXQgMSwgMiwgMywgLi4uICBUaGlzIGlzIHVzZWZ1bCBpZiB5b3VyIGRhdGFzZXRcclxuICogbGFja3MgYW4gZXhpc3RpbmcgdW5pcXVlIGluZGV4LlxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdHJpeH0gbWF0cml4IC0gVGhlIG1hdHJpeCB0byBpbmRleC5cclxuICogQHJldHVybnMge21hdHJpeH0gQSBjb3B5IG9mIHRoZSBvcmlnaW5hbCBtYXRyaXggd2l0aCB0aGUgaW5kZXggaW5zZXJ0ZWQuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmFkZEluZGV4ID0gZnVuY3Rpb24gKG1hdHJpeCkge1xyXG4gIHZhciBpbmRleE1hdHJpeCA9IGRleC5tYXRyaXguY29weShtYXRyaXgpO1xyXG5cclxuICBmb3IgKHZhciByaSA9IDA7IHJpIDwgbWF0cml4Lmxlbmd0aDsgcmkrKykge1xyXG4gICAgaW5kZXhNYXRyaXhbcmldLnVuc2hpZnQocmkgKyAxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbmRleE1hdHJpeDtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgc3VwcGxpZWQgY29sdW1uTnVtIHdpdGhpbiB0aGUgc3VwcGxpZWQgbWF0cml4IGlzXHJcbiAqIG51bWVyaWMgb3Igbm90LlxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdHJpeH0gbWF0cml4IC0gVGhlIG1hdHJpeCB0byBldmFsdWF0ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtbk51bSAtIFRoZSBjb2x1bW4gd2l0aGluIHRoZSBtYXRyaXggdG8gZXZhbHVhdGUuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBjb2x1bW4gaXMgbnVtZXJpYywgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5pc0NvbHVtbk51bWVyaWMgPSBmdW5jdGlvbiAobWF0cml4LCBjb2x1bW5OdW0pIHtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IG1hdHJpeC5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKCFfLmlzTnVtYmVyKG1hdHJpeFtpXVtjb2x1bW5OdW1dKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFJldHVybiB0aGUgbWF4aW11bSB2YWx1ZSBvZiB0aGUgc3BlY2lmaWVkIGNvbHVtbk51bSB3aXRoaW4gdGhlXHJcbiAqIHN1cHBsaWVkIG1hdHJpeC5cclxuICpcclxuICogQHBhcmFtIG1hdHJpeCBUaGUgbWF0cml4IHRvIGV2YWx1YXRlLlxyXG4gKiBAcGFyYW0gY29sdW1uTnVtIFRoZSBjb2x1bW4gbnVtYmVyIHdpdGhpbiB0aGUgbWF0cml4IHRvIGV2YWx1YXRlLlxyXG4gKiBAcmV0dXJucyB7Kn0gVGhlIG1heGltdW0gdmFsdWUgb2YgdGhlIHNwZWNpZmllZCBjb2x1bW4gd2l0aGluIHRoZVxyXG4gKiBzdXBwbGllZCBtYXRyaXguXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLm1heCA9IGZ1bmN0aW9uIChtYXRyaXgsIGNvbHVtbk51bSkge1xyXG4gIHZhciBtYXhWYWx1ZSA9IG1hdHJpeFswXVtjb2x1bW5OdW1dO1xyXG4gIHZhciBpO1xyXG5cclxuICBpZiAoZGV4Lm1hdHJpeC5pc0NvbHVtbk51bWVyaWMobWF0cml4LCBjb2x1bW5OdW0pKSB7XHJcbiAgICBtYXhWYWx1ZSA9IHBhcnNlRmxvYXQobWF0cml4WzBdW2NvbHVtbk51bV0pO1xyXG4gICAgZm9yIChpID0gMTsgaSA8IG1hdHJpeC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAobWF4VmFsdWUgPCBwYXJzZUZsb2F0KG1hdHJpeFtpXVtjb2x1bW5OdW1dKSkge1xyXG4gICAgICAgIG1heFZhbHVlID0gcGFyc2VGbG9hdChtYXRyaXhbaV1bY29sdW1uTnVtXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBmb3IgKGkgPSAxOyBpIDwgbWF0cml4Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChtYXhWYWx1ZSA8IG1hdHJpeFtpXVtjb2x1bW5OdW1dKSB7XHJcbiAgICAgICAgbWF4VmFsdWUgPSBtYXRyaXhbaV1bY29sdW1uTnVtXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1heFZhbHVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFJldHVybiB0aGUgbWluaW11bSB2YWx1ZSBvZiB0aGUgc3BlY2lmaWVkIGNvbHVtbk51bSB3aXRoaW4gdGhlXHJcbiAqIHN1cHBsaWVkIG1hdHJpeC5cclxuICpcclxuICogQHBhcmFtIHttYXRyaXh9IG1hdHJpeCAtIFRoZSBtYXRyaXggdG8gZXZhbHVhdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5OdW0gLSBUaGUgY29sdW1uIG51bWJlciB3aXRoaW4gdGhlIG1hdHJpeCB0byBldmFsdWF0ZS5cclxuICogQHJldHVybnMge251bWJlcn0gVGhlIG1pbmltdW0gdmFsdWUgb2YgdGhlIHNwZWNpZmllZCBjb2x1bW4gd2l0aGluIHRoZVxyXG4gKiBzdXBwbGllZCBtYXRyaXguXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLm1pbiA9IGZ1bmN0aW9uIChtYXRyaXgsIGNvbHVtbk51bSkge1xyXG4gIHZhciBtaW5WYWx1ZSA9IG1hdHJpeFswXVtjb2x1bW5OdW1dO1xyXG4gIHZhciBpO1xyXG5cclxuICBpZiAoZGV4Lm1hdHJpeC5pc0NvbHVtbk51bWVyaWMobWF0cml4LCBjb2x1bW5OdW0pKSB7XHJcbiAgICBtaW5WYWx1ZSA9IHBhcnNlRmxvYXQobWF0cml4WzBdW2NvbHVtbk51bV0pO1xyXG4gICAgZm9yIChpID0gMTsgaSA8IG1hdHJpeC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAobWluVmFsdWUgPiBwYXJzZUZsb2F0KG1hdHJpeFtpXVtjb2x1bW5OdW1dKSkge1xyXG4gICAgICAgIG1pblZhbHVlID0gcGFyc2VGbG9hdChtYXRyaXhbaV1bY29sdW1uTnVtXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBmb3IgKGkgPSAxOyBpIDwgbWF0cml4Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChtaW5WYWx1ZSA+IG1hdHJpeFtpXVtjb2x1bW5OdW1dKSB7XHJcbiAgICAgICAgbWluVmFsdWUgPSBtYXRyaXhbaV1bY29sdW1uTnVtXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1pblZhbHVlO1xyXG59O1xyXG4iLCIvKipcclxuICpcclxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgcm91dGluZXMgZGVhbGluZyB3aXRoIGphdmFzY3JpcHQgb2JqZWN0cy5cclxuICpcclxuICogQG1vZHVsZSBvYmplY3RcclxuICpcclxuICovXHJcblxyXG4vKipcclxuICpcclxuICogUmV0dXJuIHRoZSBsY2NhbCBrZXlzIG9mIHRoaXMgb2JqZWN0IHdpdGhvdXQgdGhlIGluaGVyaXRlZCBvbmVzLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3Qgd2hvc2UgbG9jYWwga2V5cyB3ZSBhcmUgaW50ZXJlc3RlZCBpbi5cclxuICpcclxuICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSBvZiAwIG9yIG1vcmUgbGNjYWwga2V5cy5cclxuICovXHJcbmV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uIGtleXMob2JqKSB7XHJcbiAgdmFyIGtleXMgPSBbXTtcclxuXHJcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgIGtleXMucHVzaChrZXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGtleXM7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQSBwcmV0dHkgZ29vZCwgYnV0IGltcGVyZmVjdCBtZWNoYW5pc20gZm9yIHBlcmZvcm1pbmcgYSBkZWVwXHJcbiAqIGNsb25lIG9mIGFuIG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxyXG4gKiBAcmV0dXJucyB7Kn0gVGhlIGNsb25lZCBvYmplY3QuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmNsb25lID0gZnVuY3Rpb24gY2xvbmUob2JqKSB7XHJcbiAgdmFyIGksIGF0dHIsIGxlbjtcclxuXHJcbiAgLy8gSGFuZGxlIHRoZSAzIHNpbXBsZSB0eXBlcywgYW5kIG51bGwgb3IgdW5kZWZpbmVkXHJcbiAgaWYgKG51bGwgPT0gb2JqIHx8IFwib2JqZWN0XCIgIT0gdHlwZW9mIG9iailcclxuICAgIHJldHVybiBvYmo7XHJcblxyXG4gIC8vIEhhbmRsZSBEYXRlXHJcbiAgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgIHZhciBjb3B5ID0gbmV3IERhdGUoKTtcclxuICAgIGNvcHkuc2V0VGltZShvYmouZ2V0VGltZSgpKTtcclxuICAgIHJldHVybiBjb3B5O1xyXG4gIH1cclxuXHJcbiAgLy8gSGFuZGxlIEFycmF5XHJcbiAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICB2YXIgY29weSA9IFtdO1xyXG4gICAgZm9yIChpID0gMCwgbGVuID0gb2JqLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvcHlbaV0gPSBkZXgub2JqZWN0LmNsb25lKG9ialtpXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29weTtcclxuICB9XHJcblxyXG4gIC8vIERPTSBOb2RlcyBhcmUgbm90aGluZyBidXQgdHJvdWJsZS5cclxuICBpZiAoZGV4Lm9iamVjdC5pc0VsZW1lbnQob2JqKSB8fFxyXG4gICAgZGV4Lm9iamVjdC5pc05vZGUob2JqKSkge1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcblxyXG4gIC8vIEhhbmRsZSBPYmplY3RcclxuICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICB2YXIgY29weSA9IHt9O1xyXG4gICAgLy9qUXVlcnkuZXh0ZW5kKGNvcHksIG9iaik7XHJcbiAgICBmb3IgKGF0dHIgaW4gb2JqKSB7XHJcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoYXR0cikpIHtcclxuICAgICAgICBjb3B5W2F0dHJdID0gZGV4Lm9iamVjdC5jbG9uZShvYmpbYXR0cl0pO1xyXG4gICAgICAgIC8vY29weVthdHRyXSA9IG9ialthdHRyXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvcHk7XHJcbiAgfVxyXG5cclxuICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gY29weSBvYmohIEl0cyB0eXBlIGlzbid0IHN1cHBvcnRlZC5cIik7XHJcbn07XHJcblxyXG4vKlxyXG4gIFRoaXMgdmVyc2lvbiBjYXVzZXMgZXhwYW5kIHRvIGNvbnRpbnVlIGZvcmV2ZXIuXHJcblxyXG5leHBvcnRzLmlzRW1wdHkgPSBmdW5jdGlvbiBpc0VtcHR5KG9iaikge1xyXG4gIHJldHVybiBfLmlzRW1wdHkob2JqKTtcclxufTtcclxuKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBLaW5kIG9mIG1pc2xlYWRpbmcuICBUaGlzIHJlYWxseSBzaWduYWxzIHdoZW4gZXhwYW5kIHNob3VsZCBxdWl0XHJcbiAqIGV4cGFuZGluZy4gIEkgbmVlZCB0byBjbGVhbiB0aGlzIHVwLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0cy5pc0VtcHR5ID0gZnVuY3Rpb24gaXNFbXB0eShvYmopIHtcclxuICAvL2RleC5jb25zb2xlLmxvZyhcImlzRW1wdHkoXCIgKyBvYmogKyBcIikgdHlwZW9mPVwiICsgKHR5cGVvZiBvYmopKTtcclxuICBpZiAoIW9iaiB8fCBvYmogaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIGlmIChcIm9iamVjdFwiID09IHR5cGVvZiBvYmopIHtcclxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgLy9kZXguY29uc29sZS5sb2coXCJPQko6IFwiLCBvYmosIFwiIGNvbnRhaW5zIGtleSAnXCIgKyBrZXkgKyBcIidcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIE92ZXJsYXkgdGhlIHRvcCBvYmplY3Qgb24gdG9wIG9mIHRoZSBib3R0b20uICBUaGlzIG1ldGhvZCB3aWxsIGZpcnN0IGNsb25lXHJcbiAqIHRoZSBib3R0b20gb2JqZWN0LiAgVGhlbiBpdCB3aWxsIGRyb3AgdGhlIHZhbHVlcyB3aXRoaW4gdGhlIHRvcCBvYmplY3RcclxuICogaW50byB0aGUgY2xvbmUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0b3AgLSBUaGUgb2JqZWN0IHdobydzIHByb3BlcnRpZXMgd2lsbCBiZSBvbiB0b3AuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBib3R0b20gLSBUaGUgb2JqZWN0IHdobydzIHByb3BlcnRpZXMgd2lsbCBiZSBvbiBib3R0b20uXHJcbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIG92ZXJsYWlkIG9iamVjdCB3aGVyZSB0aGUgcHJvcGVydGllcyBpbiB0b3Agb3ZlcnJpZGVcclxuICogICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzIGluIGJvdHRvbS4gIFRoZSByZXR1cm4gb2JqZWN0IGlzIGEgY2xvbmUgb3JcclxuICogICAgICAgICAgICAgICAgICBjb3B5LlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5vdmVybGF5ID0gZnVuY3Rpb24gb3ZlcmxheSh0b3AsIGJvdHRvbSkge1xyXG4gIC8vIE1ha2UgYSBjbG9uZSBvZiB0aGUgYm90dG9tIG9iamVjdC5cclxuICB2YXIgb3ZlcmxheSA9IGRleC5vYmplY3QuY2xvbmUoYm90dG9tKTtcclxuICB2YXIgcHJvcDtcclxuXHJcbiAgLy8gSWYgd2UgaGF2ZSBwYXJhbWV0ZXJzIGluIHRoZSB0b3Agb2JqZWN0LCBvdmVybGF5IHRoZW0gb24gdG9wXHJcbiAgLy8gb2YgdGhlIGJvdHRvbSBvYmplY3QuXHJcbiAgaWYgKHRvcCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgcHJvcHMgaW4gdG9wLlxyXG4gICAgZm9yIChwcm9wIGluIHRvcCkge1xyXG4gICAgICAvLyBBcnJheXMgYXJlIHNwZWNpYWwgY2FzZXMuIFtBXSBvbiB0b3Agb2YgW0EsQl0gc2hvdWxkIGdpdmUgW0FdLCBub3QgW0EsQl1cclxuICAgICAgaWYgKHR5cGVvZiB0b3BbcHJvcF0gPT0gJ29iamVjdCcgJiYgb3ZlcmxheVtwcm9wXSAhPSBudWxsICYmICEodG9wW3Byb3BdIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlBST1A6IFwiICsgcHJvcCArIFwiLCB0b3A9XCIgKyB0b3AgKyBcIiwgb3ZlcmxheT1cIiArIG92ZXJsYXkpO1xyXG4gICAgICAgIG92ZXJsYXlbcHJvcF0gPSBkZXgub2JqZWN0Lm92ZXJsYXkodG9wW3Byb3BdLCBvdmVybGF5W3Byb3BdKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBTaW1wbHkgb3ZlcndyaXRlIGZvciBzaW1wbGUgY2FzZXMgYW5kIGFycmF5cy5cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgb3ZlcmxheVtwcm9wXSA9IHRvcFtwcm9wXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9jb25zb2xlLmRpcihjb25maWcpO1xyXG4gIHJldHVybiBvdmVybGF5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHN1cHBsaWVkIG9iamVjdCBpcyBhIE5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IHRvIHRlc3QuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIG9iaiBpcyBhIE5vZGUsIGZhbHNlIG90aGVyd2lzZS5cclxuICpcclxuICovXHJcbmV4cG9ydHMuaXNOb2RlID0gZnVuY3Rpb24gaXNOb2RlKG9iaikge1xyXG4gIHJldHVybiAoXHJcbiAgICB0eXBlb2YgTm9kZSA9PT0gXCJvYmplY3RcIiA/IG9iaiBpbnN0YW5jZW9mIE5vZGUgOlxyXG4gICAgb2JqICYmIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iai5ub2RlVHlwZSA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2Ygb2JqLm5vZGVOYW1lID09PSBcInN0cmluZ1wiXHJcbiAgKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzdXBwbGllZCBvYmplY3QgaXMgYVxyXG4gKiBET00gbm9kZS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIFRoZSBvYmplY3QgdG8gdGVzdC5cclxuICpcclxuICogQHJldHVybnMge2Jvb2xlYW59IC0gVHJ1ZSBpZiBvYmogaXMgYSBET00gbm9kZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0cy5pc0VsZW1lbnQgPSBmdW5jdGlvbiBpc0VsZW1lbnQob2JqKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIHR5cGVvZiBIVE1MRWxlbWVudCA9PT0gXCJvYmplY3RcIiA/IG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IDogLy9ET00yXHJcbiAgICBvYmogJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiBvYmoubm9kZVR5cGUgPT09IDEgJiYgdHlwZW9mIG9iai5ub2RlTmFtZSA9PT0gXCJzdHJpbmdcIlxyXG4gICk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIGJvb2xlYW4gcmVwcmVzZW50aW5nIHdoZXRoZXIgb2JqIGlzIGNvbnRhaW5lZFxyXG4gKiB3aXRoaW4gY29udGFpbmVyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGFpbmVyIC0gVGhlIGNvbnRhaW5lciB0byB0ZXN0LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byB0ZXN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIFRydWUgaWYgY29udGFpbmVyIGNvbnRhaW5zIG9iai4gIEZhbHNlIG90aGVyd2lzZS5cclxuICovXHJcbmV4cG9ydHMuY29udGFpbnMgPSBmdW5jdGlvbiBjb250YWlucyhjb250YWluZXIsIG9iaikge1xyXG4gIHZhciBpID0gY29udGFpbmVyLmxlbmd0aDtcclxuICB3aGlsZSAoaS0tKSB7XHJcbiAgICBpZiAoY29udGFpbmVyW2ldID09PSBvYmopIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBSZXR1cm4gd2hldGhlciBvciBub3QgdGhlIHN1cHBsaWVkIG9iamVjdCBpcyBhIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIG9iaiBpcyBhIGZ1bmN0aW9uLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnRzLmlzRnVuY3Rpb24gPSBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iaikge1xyXG4gIC8vcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbic7XHJcbiAgcmV0dXJuIF8uaXNGdW5jdGlvbihvYmopO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFZpc2l0IGVhY2ggbG9jYWwgcHJvcGVydHkgd2l0aGluLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqXHJcbiAqIEBwYXJhbSBmdW5jXHJcbiAqL1xyXG4vKlxyXG5leHBvcnRzLnZpc2l0ID0gZnVuY3Rpb24gKG9iaiwgZnVuYykge1xyXG4gIHZhciBwcm9wO1xyXG4gIGZ1bmMob2JqKTtcclxuICBmb3IgKHByb3AgaW4gb2JqKSB7XHJcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgIGlmICh0eXBlb2Ygb2JqW3Byb3BdID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGRleC5vYmplY3QudmlzaXQob2JqW3Byb3BdLCBmdW5jKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gbWFwXHJcbiAqIEBwYXJhbSB2YWx1ZXNcclxuICogQHJldHVybnMge2V4cG9ydHN9XHJcbiAqL1xyXG5leHBvcnRzLmNvbm5lY3QgPSBmdW5jdGlvbiBjb25uZWN0KG1hcCwgdmFsdWVzKSB7XHJcbiAgZGV4LmNvbnNvbGUubG9nKFwibWFwOlwiLCBtYXAsIFwidmFsdWVzOlwiLCB2YWx1ZXMpO1xyXG5cclxuICBpZiAoIXZhbHVlcyB8fCB2YWx1ZXMubGVuZ3RoIDw9IDApIHtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICBpZiAoIW1hcFt2YWx1ZXNbMF1dKSB7XHJcbiAgICBtYXBbdmFsdWVzWzBdXSA9IHt9O1xyXG4gIH1cclxuICBkZXgub2JqZWN0LmNvbm5lY3QobWFwW3ZhbHVlc1swXV0sIHZhbHVlcy5zbGljZSgxKSk7XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmpcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnRzLmlzTnVtZXJpYyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQob2JqKSkgJiYgaXNGaW5pdGUob2JqKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gaGllcmFyY2h5XHJcbiAqIEBwYXJhbSBuYW1lXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKiBAcGFyYW0gZGVsaW1pdGVyXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0cy5zZXRIaWVyYXJjaGljYWwgPSBmdW5jdGlvbiAoaGllcmFyY2h5LCBuYW1lLCB2YWx1ZSwgZGVsaW1pdGVyKSB7XHJcbiAgaWYgKGhpZXJhcmNoeSA9PSBudWxsKSB7XHJcbiAgICBoaWVyYXJjaHkgPSB7fTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgaGllcmFyY2h5ICE9ICdvYmplY3QnKSB7XHJcbiAgICByZXR1cm4gaGllcmFyY2h5O1xyXG4gIH1cclxuXHJcbiAgLy8gQ3JlYXRlIGFuIGFycmF5IG9mIG5hbWVzIGJ5IHNwbGl0dGluZyBkZWxpbWl0ZXIsIHRoZW4gY2FsbFxyXG4gIC8vIHRoaXMgZnVuY3Rpb24gaW4gdGhlIDMgYXJndW1lbnQgKEFycmF5IG9mIHBhdGhzKSBjb250ZXh0LlxyXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDQpIHtcclxuICAgIHJldHVybiBkZXgub2JqZWN0LnNldEhpZXJhcmNoaWNhbChoaWVyYXJjaHksXHJcbiAgICAgIG5hbWUuc3BsaXQoZGVsaW1pdGVyKSwgdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLy8gQXJyYXkgb2YgcGF0aHMgY29udGV4dC5cclxuICBlbHNlIHtcclxuICAgIC8vIFRoaXMgaXMgdGhlIGxhc3QgdmFyaWFibGUgbmFtZSwganVzdCBzZXQgdGhlIHZhbHVlLlxyXG4gICAgaWYgKG5hbWUubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGhpZXJhcmNoeVtuYW1lWzBdXSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8gV2Ugc3RpbGwgaGF2ZSB0byB0cmF2ZXJzZS5cclxuICAgIGVsc2Uge1xyXG4gICAgICAvLyBVbmRlZmluZWQgY29udGFpbmVyIG9iamVjdCwganVzdCBjcmVhdGUgYW4gZW1wdHkuXHJcbiAgICAgIGlmICghKG5hbWVbMF0gaW4gaGllcmFyY2h5KSkge1xyXG4gICAgICAgIGhpZXJhcmNoeVtuYW1lWzBdXSA9IHt9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZWN1cnNpdmVseSB0cmF2ZXJzZSBkb3duIHRoZSBoaWVyYXJjaHkuXHJcbiAgICAgIGRleC5vYmplY3Quc2V0SGllcmFyY2hpY2FsKGhpZXJhcmNoeVtuYW1lWzBdXSwgbmFtZS5zcGxpY2UoMSksIHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBoaWVyYXJjaHk7XHJcbn07XHJcbiJdfQ==
