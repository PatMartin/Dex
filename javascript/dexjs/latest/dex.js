(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dex = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
/**
 *
 * This module provides routines for dealing with arrays.
 *
 * @module dex/array
 * @name array
 * @memberOf dex
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
},{}],3:[function(require,module,exports){
/**
 *
 * @name AreaChart
 * @constructor
 * @classdesc This class constructs a c3 area chart.
 * @memberOf dex.charts.c3
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var areachart = new dex.charts.c3.AreaChart({
 *   'parent' : "#AreaChart",
 *   'id'     : "AreaChart"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 *
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 *
 *  @inherit module:dex/component
 *
 */
var areachart = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#AreaChart',
        // Set these when you need to CSS style components independently.
        'id': 'AreaChart',
        'class': 'AreaChart',
        'resizable': true,
        'csv': {
            'header': [],
            'data': []
        },
        'linktype' : 'area-spline',
        'width': "100%",
        'height': "100%",
        'transform': "translate(0 0)",
    };

    var chart = new dex.component(userConfig, defaults);

    chart.render = function render() {
        window.onresize = this.resize;
        chart.resize();
    };

    chart.resize = function resize() {
        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height).update();
        }
        else {
            chart.update();
        }
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        var gtypes = dex.csv.guessTypes(csv);
        var ncsv = dex.csv.numericSubset(csv);
        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var types = {};
        dex.range(1, ncsv.header.length)
            .map(function(hi) { types[ncsv.header[hi-1]] = config.linktype; });

        var c3config = {
            'bindto' : config.parent,
            'data': {
                'columns': columns.data,
                'types': types,
                color : d3.scale.category20()
            },
            subchart: {
                show: true
            },
            zoom: {
                enabled: true
            },
            legend: {
                position : 'right'
            }
        };

        // Set categorical axis if first column is a string.
        if (gtypes[0] == "string")
        {
            c3config['axis'] = { 'x' : {
                'type' : 'category',
                'label' : { 'text' : csv.header[0],
                'position' : 'outer-center' },
                'categories': dex.csv.transpose(dex.csv.columnSlice(csv, [0])).data[0]
            }};
        }

        var chart = c3.generate(c3config);
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
};

module.exports = areachart;

},{}],4:[function(require,module,exports){
/**
 *
 * @constructor
 * @name BarChart
 * @classdesc This class constructs a c3 bar chart.
 * @memberOf dex.charts.c3
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var areachart = dex.charts.c3.BarChart({
 *   'parent' : "#AreaChart",
 *   'id'     : "AreaChart"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 *
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 *
 * @inherit module:dex/component
 *
 */
var barchart = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#BarChart',
        // Set these when you need to CSS style components independently.
        'id': 'BarChart',
        'class': 'BarChart',
        'resizable': true,
        'csv': {
            'header': [],
            'data': []
        },
        'width': "100%",
        'height': "100%",
        'transform': "translate(0 0)",
    };

    var chart = new dex.component(userConfig, defaults);

    chart.render = function render() {
        window.onresize = this.resize;
        chart.resize();
    };

    chart.resize = function resize() {
        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height).update();
        }
        else {
            chart.update();
        }
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        var gtypes = dex.csv.guessTypes(csv);
        var ncsv = dex.csv.numericSubset(csv);
        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var c3config = {
            'bindto' : config.parent,
            'data': {
                'columns': columns.data,
                'type': 'bar',
                color : d3.scale.category20()
            },
            'bar': {'width': { 'ratio': 0.9 }},
            subchart: {
                show: true
            },
            zoom: {
                enabled: true
            },
            legend: {
                position : 'right'
            }
        };

        // Set categorical axis if first column is a string.
        if (gtypes[0] == "string")
        {
            c3config['axis'] = { 'x' : {
                'type' : 'category',
                'label' : { 'text' : csv.header[0],
                'position' : 'outer-center' },
                'categories': dex.csv.transpose(dex.csv.columnSlice(csv, [0])).data[0]
            }};
        }

        var chart = c3.generate(c3config);
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
};

module.exports = barchart;
},{}],5:[function(require,module,exports){
/**
 *
 * @name LineChart
 * @constructor
 * @classdesc This class constructs a c3 line chart.
 * @memberOf dex.charts.c3
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var areachart = new dex.charts.c3.AreaChart({
 *   'parent' : "#AreaChart",
 *   'id'     : "AreaChart"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 *
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 *
 * @inherit module:dex/component
 *
 */

var linechart = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#LineChart',
        // Set these when you need to CSS style components independently.
        'id': 'LineChart',
        'class': 'LineChart',
        'resizable': true,
        'csv': {
            'header': [],
            'data': []
        },
        'linktype' : 'area',
        'width': "100%",
        'height': "100%"
    };

    var chart = new dex.component(userConfig, defaults);
    var internalChart;
    var selectedColumns = [];

    chart.render = function render() {

        //var chart = this;
        var config = chart.config;
        var csv = config.csv;
        window.onresize = this.render;

        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height);
        }
        d3.select(config.parent).selectAll("*").remove();
        var gtypes = dex.csv.guessTypes(csv);
        selectedColumns = dex.csv.getNumericIndices(csv);
        if (gtypes[0] == "string")
        {
            selectedColumns.unshift(0);
        }
        var ncsv = dex.csv.columnSlice(csv, selectedColumns);

        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var types = {};
        dex.range(1, ncsv.header.length)
          .map(function(hi) { types[ncsv.header[hi-1]] = config.linktype; });

        var c3config = {
            'bindto' : config.parent,
            'data': {
                'x' : columns.header[0],
                'columns' : columns.data,
                'types' : types
            },
            subchart: {
                show: true
            },
            zoom: {
                enabled: true
            },
            legend: {
                position : 'right'
            },
            groups: config.groups
        };

        if (gtypes[0] == "string")
        {
            c3config["axis"] = {
                "x": {
                    "type": "category",
                    "categories": [].concat.apply([],
                      dex.matrix.uniques(dex.matrix.slice(csv.data, [0]))).sort()
                }
            }
        }

        //dex.console.log("CATEGORIES", c3config);
        internalChart = c3.generate(c3config);
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        var gtypes = dex.csv.guessTypes(csv);

        var ncsv = dex.csv.columnSlice(csv, selectedColumns);
        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var types = {};
        dex.range(1, ncsv.header.length)
          .map(function(hi) { types[ncsv.header[hi-1]] = config.linktype; });

        var c3config = {
            'columns' : columns.data
        };

        //internalChart.groups(config.groups);
        internalChart.load(c3config);
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
};

module.exports = linechart;
},{}],6:[function(require,module,exports){
/**
 *
 * @constructor
 * @name StackedAreaChart
 * @classdesc This class constructs a c3 stacked area chart.
 * @memberOf dex.charts.c3
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var areachart = dex.charts.c3.BarChart({
 *   'parent' : "#AreaChart",
 *   'id'     : "AreaChart"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 *
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 *
 * @inherit module:dex/component
 *
 */
var stackedareachart = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#AreaChart',
        // Set these when you need to CSS style components independently.
        'id': 'AreaChart',
        'class': 'AreaChart',
        'resizable': true,
        'csv': {
            'header': [],
            'data': []
        },
        'width': "100%",
        'height': "100%",
        'transform': "translate(0 0)",
    };

    var chart = new dex.component(userConfig, defaults);

    chart.render = function render() {
        window.onresize = this.resize;
        chart.resize();
    };

    chart.resize = function resize() {
        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height).update();
        }
        else {
            chart.update();
        }
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        var gtypes = dex.csv.guessTypes(csv);
        var ncsv = dex.csv.numericSubset(csv);
        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var types = {};
        dex.range(1, ncsv.header.length)
            .map(function(hi) { types[ncsv.header[hi-1]] = 'area-spline'; });

        var c3config = {
            'bindto' : config.parent,
            'data': {
                'columns': columns.data,
                'types': types,
                'groups' : [ columns.header ],
                color : d3.scale.category20()
            },
            subchart: {
                show: true
            },
            zoom: {
                enabled: true
            },
            legend: {
                position : 'right'
            }
        };

        // Set categorical axis if first column is a string.
        if (gtypes[0] == "string")
        {
            c3config['axis'] = { 'x' : {
                'type' : 'category',
                'label' : { 'text' : csv.header[0],
                'position' : 'outer-center' },
                'categories': dex.csv.transpose(dex.csv.columnSlice(csv, [0])).data[0]
            }};
        }

        var chart = c3.generate(c3config);
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
};

module.exports = stackedareachart;
},{}],7:[function(require,module,exports){
/**
 *
 * @constructor
 * @name StackedBarChart
 * @classdesc This class constructs a c3 stacked bar chart.
 * @memberOf dex.charts.c3
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var areachart = dex.charts.c3.BarChart({
 *   'parent' : "#AreaChart",
 *   'id'     : "AreaChart"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 *
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 *
 * @inherit module:dex/component
 *
 */
var stackedbarchart = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#BarChart',
        // Set these when you need to CSS style components independently.
        'id': 'BarChart',
        'class': 'BarChart',
        'resizable': true,
        'csv': {
            'header': [],
            'data': []
        },
        'width': "100%",
        'height': "100%",
        'transform': "translate(0 0)",
    };

    var chart = new dex.component(userConfig, defaults);

    chart.render = function render() {
        window.onresize = this.resize;
        chart.resize();
    };

    chart.resize = function resize() {
        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height).update();
        }
        else {
            chart.update();
        }
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        var gtypes = dex.csv.guessTypes(csv);
        var ncsv = dex.csv.numericSubset(csv);
        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var c3config = {
            'bindto' : config.parent,
            'data': {
                'columns': columns.data,
                'type': 'bar',
                color : d3.scale.category20(),
                'groups' : [ columns.header ]
            },
            'bar': {'width': { 'ratio': 0.9 }},
            subchart: {
                show: true
            },
            zoom: {
                enabled: true
            },
            legend: {
                position : 'right'
            }
        };

        // Set categorical axis if first column is a string.
        if (gtypes[0] == "string")
        {
            c3config['axis'] = { 'x' : {
                'type' : 'category',
                'label' : { 'text' : csv.header[0],
                'position' : 'outer-center' },
                'categories': dex.csv.transpose(dex.csv.columnSlice(csv, [0])).data[0]
            }};
        }

        var chart = c3.generate(c3config);
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
}

module.exports = stackedbarchart;
},{}],8:[function(require,module,exports){
/**
 *
 * This module provides C3 based visualization components.
 *
 * @module dex/charts/c3
 * @name c3
 * @memberOf dex.charts
 *
 */
var c3 = {};

c3.AreaChart = require("./AreaChart");
c3.BarChart = require("./BarChart");
c3.LineChart = require("./LineChart");
c3.StackedAreaChart = require("./StackedAreaChart");
c3.StackedBarChart = require("./StackedBarChart");

module.exports = c3;
},{"./AreaChart":3,"./BarChart":4,"./LineChart":5,"./StackedAreaChart":6,"./StackedBarChart":7}],9:[function(require,module,exports){
/**
 *
 * This module provides visualization components for charting
 * out of a diverse set of base implementations ranging from
 * D3 to three.js and WebGL.
 *
 * @module dex/charts
 * @name charts
 * @memberOf dex
 *
 */
var charts = {};

charts.c3 = require("./c3/c3");
charts.d3 = require("./d3/d3");
charts.d3plus = require("./d3plus/d3plus");
charts.dygraphs = require("./dygraphs/dygraphs");
charts.google = require("./google/google");
charts.threejs= require("./threejs/threejs");

module.exports = charts;
},{"./c3/c3":8,"./d3/d3":36,"./d3plus/d3plus":38,"./dygraphs/dygraphs":40,"./google/google":46,"./threejs/threejs":48}],10:[function(require,module,exports){
/**
 *
 * @constructor
 * @name Axis
 * @classdesc This class constructs a d3 Axis.
 * @memberOf dex.charts.d3
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var axis = dex.charts.d3.Axis({
 *   'parent' : "#MyAxisContainer",
 *   'id'     : "MyAxisId"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 * @param {margin} userConfig.margin - The margin data.
 * @param {integer} [userConfig.margin.left=25] - The number of pixels to allocate to the left margin.
 * @param {integer} [userConfig.margin.right=25] - The number of pixels to allocate to the right margin.
 * @param {integer} [userConfig.margin.top=0] - The number of pixels to allocate the top margin.
 * @param {integer} [userConfig.margin.bottom=0] - The number of pixels to allocate the bottom margin.
 * @param {string}  [userConfig.transform=translate(0,2)] - A SVG transform string.  More information can be found
 * in the {@link http://www.w3.org/TR/SVG/coords.html#TransformAttribute|W3C SVG 1.1 Specification}.
 * @param {integer} [userConfig.column=0] The column within the supplied CSV to use to generate the Axis.
 * @param {d3axis_spec} [userConfig.axis] - A D3 axis specification.
 * @param {d3text} [userConfig.title] - A D3 text specification for the title of this axis.
 *
 * @inherit module:component
 *
 */
var axis = function (userConfig) {
  var defaults =
  {
    // The parent container of this chart.
    'parent'            : null,
    // Set these when you need to CSS style components independently.
    'id'                : 'Axis',
    'class'             : 'Axis',
    // Our data...
    'csv'               : {
      'header' : ["X", "Y"],
      'data'   : [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    'margin'            : {
      'left'   : 25,
      'right'  : 25,
      'top'    : 0,
      'bottom' : 0
    },
    // Something is slightly off, why must I do this y offset?
    'transform'         : 'translate(0,2)',
    'column'            : 0,
    'axis'              : dex.config.axis({
      'type'     : 'linear',
      'orient'   : 'bottom',
      'scale'    : dex.config.scale({'type' : 'linear'}),
      'ticks'    : 5,
      'tickSize' : 10,
      'tickLine' : dex.config.line({
        'stroke' : dex.config.stroke({'color' : 'black', 'width' : 2}),
        'fill'   : dex.config.fill({'fillColor' : 'none'})
      }),
      'path'     : dex.config.path({
        'fill'   : dex.config.fill({'fillColor' : 'none'}),
        'stroke' : dex.config.stroke({'color' : 'black', 'width' : 2})
      })
    }),
    'title.text'        : 'axis',
    'title.anchor'      : 'middle',
    'title.color'       : 'red',
    'title.y'           : -8,
    'title.font.weight' : 'italic',
    'title.transform'   : function (d, i) {
      return 'translate(' + (chart.config.width / 2) +
        ',' + (chart.config.height - chart.config.margin.bottom) + ')';
    }
  };

  console.log("Creating axis...");
  console.dir(userConfig);
  var chart = new dex.component(userConfig, defaults);
  console.dir(chart);
  /**
   *
   * Render the axis.
   *
   */
  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  /**
   *
   * Resize the axis.
   *
   */
  chart.resize = function resize() {
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart.attr("width", width).attr("height", height).update();
  };

  /**
   *
   * Something has changed, update the axis.
   *
   */
  chart.update = function update() {
    var chart = this;
    var config = chart.config;
    var axis = d3.svg.axis();

    dex.console.trace("axis.update()", config);

    // Create an axis based upon our dimensions and margins.  Regenerated every
    // time because of resize events.
    config.axis.scale.range = [config.margin.left, config.width - config.margin.right];
    config.axis.scale.domain = dex.matrix.extent(config.csv.data, [config.column - 1]);
    console.log(config.id + ":" + config.width + "x" + config.height + ", domain: " +
    config.axis.scale.domain + ", range: " + config.axis.scale.range);
    var axisScale = dex.config.createScale(config.axis.scale);
    dex.console.log(config.axis.scale);

    dex.config.configureAxis(axis, config.axis)
      .scale(axisScale);

    // Remove the old chart, ideally, we would prefer to update in place, but
    // too many issues to conquer before I get to that.  However, reproducing
    // visuals from scratch at each update does severely limit efficiency.
    d3.selectAll("#" + chart.config.id).remove();

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("class", config["class"])
      .attr("id", config["id"])
      .attr("transform", config.transform)
      .call(axis);

    // Axis path is drawn like this:
    // <path class="domain" d="M25,10V0H884V10" style="..."></path>
    //
    // Decomposing the value for the "d" attribute:
    //
    // M25,10 > Move pen to location (x,y) = (25,10)
    // V0     > Draw a line to (25, 0) > Draws the left tick.
    // H884   > Draw a line from (25,0) to (884, 0) > Draws axis line.
    // V10    > Draw a line from (884, 0) to (884, 10)
    //
    // This pen has styling options applied.

    chartContainer.select('path')
      .call(dex.config.configurePath, config.axis.path);

    var lines = chartContainer
      .selectAll('.tick line')
      .call(dex.config.configureLine, config.axis.tickLine);

    chartContainer.append("text")
      .call(dex.config.configureText, dex.config.text(config.title));
  };

  return chart;
};

module.exports = axis;
},{}],11:[function(require,module,exports){
/**
 *
 * @constructor
 * @classdesc This class constructs a d3 Axis.
 * @memberOf dex
 *
 * @example {@lang javascript}
 * var myAxis = new dex.charts.d3.Axis({
 *   'parent' : "#MyAxisContainer",
 *   'id'     : "MyAxisId"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 * @param {margin} userConfig.margin - The margin data.
 * @param {integer} [userConfig.margin.left=25] - The number of pixels to allocate to the left margin.
 * @param {integer} [userConfig.margin.right=25] - The number of pixels to allocate to the right margin.
 * @param {integer} [userConfig.margin.top=0] - The number of pixels to allocate the top margin.
 * @param {integer} [userConfig.margin.bottom=0] - The number of pixels to allocate the bottom margin.
 * @param {string}  [userConfig.transform=translate(0,2)] - A SVG transform string.  More information can be found
 * in the {@link http://www.w3.org/TR/SVG/coords.html#TransformAttribute|W3C SVG 1.1 Specification}.
 * @param {integer} [userConfig.column=0] The column within the supplied CSV to use to generate the Axis.
 * @param {d3axis_spec} [userConfig.axis] - A D3 axis specification.
 * @param {d3text_spec} [userConfig.title] - A D3 text specification for the title of this axis.
 *
 */
var barchart = function (userConfig) {
  var config;

  var defaults =
  {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'BarChart',
    'class'      : 'BarChart',
    'resizeable' : true,
    // Our data...
    'csv'        : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y"],
      'data'   : [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    'ymin'       : 0,
    'xmin'       : 0,
    'xaxis'      : dex.config.axis({
      'type'   : 'linear',
      'orient' : 'bottom',
      'label'  : dex.config.text()
    }),
    'yaxis'      : dex.config.axis({
      'type'   : 'linear',
      'orient' : 'left',
      'label'  : dex.config.text()
    }),
    // width and height of our bar chart.
    'width'      : "100%",
    'height'     : "100%",
    // The x an y indexes to chart.
    'xi'         : 0,
    'yi'         : [1],
    'transform'  : 'translate(100 100)',
    'color'      : d3.scale.category20(),
    'bars'       : {
      'mouseover' : dex.config.rectangle({
        'stroke' : {'width' : 2, 'color' : "red"},
        'color'  : function (d) {
          return config.color(d[3]);
        }
      }),
      'mouseout'  : dex.config.rectangle({
          'color' : function (d) {
            return config.color(d[3]);
          }
        }
      )
    }
  };

  // Things defined in terms of the defaults:
  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  // Replace the scale configuration with a real scale.
  var xscale = dex.config.createScale(dex.config.scale(config.xaxis.scale));
  config.xaxis.scale = xscale;
  // Replace the scale configuration with a real scale.
  var yscale = dex.config.createScale(dex.config.scale(config.yaxis.scale));
  config.yaxis.scale = yscale;

  config.bars.mouseover.height = config.bars.mouseout.height =
    function (d) {
      return config.height - yscale(d[1]);
    };

  config.bars.mouseout.width = config.bars.mouseover.width =
    xscale(config.csv.data[1][config.xi]) - xscale(config.csv.data[0][config.xi]);

  config.bars.mouseout.x = config.bars.mouseover.x = function (d) {
    return xscale(d[0])
  };

  config.bars.mouseout.y = config.bars.mouseover.y = function (d) {
    return yscale(d[1])
  };

  var data = config.csv.data;

  // Translate all of the y data columns to numerics.
  data.forEach(function (d) {
    config.yi.forEach(function (c) {
      d[c] = +d[c];
    });
  });

  var yextent = dex.matrix.extent(data, config.yi);

  if (config.ymin != null) {
    yextent[0] = config.ymin;
  }
  if (config.ymax != null) {
    yextent[1] = config.ymax;
  }

  config.yaxis.scale.domain(yextent);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (config.resizeable) {
      var width = d3.select(config.parent).property("clientWidth");
      var height = d3.select(config.parent).property("clientHeight");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {

    d3.selectAll("#" + config.id).remove();

    var xaxis = dex.config.createAxis(config.xaxis);

    var yaxis = dex.config.createAxis(config.yaxis);
    //dex.config.configureAxis(yaxis, config.yaxis);

    var chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    // X Axis
    chartContainer.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + config.height + ")")
      .call(xaxis);

    // Add the label
    chartContainer.select(".xaxis").append("text")
      .call(dex.config.configureText, config.xaxis.label);

    // Y Axis
    chartContainer.append("g")
      .attr("class", "yaxis")
      .call(yaxis);

    chartContainer.select(".yaxis").append("text")
      .call(dex.config.configureText, config.yaxis.label);

    var barData = dex.matrix.combine(
      dex.matrix.slice(data, [config.xi]),
      dex.matrix.slice(data, config.yi)
    );

    //dex.console.log("CSV DATA", csv);
    //dex.console.log("BAR DATA", barData);
    chartContainer.selectAll(".bar")
      .data(barData)
      .enter().append("rect")
      .call(dex.config.configureRectangle, config.bars.mouseout)
      .on("mouseover", function () {
        d3.select(this).call(dex.config.configureRectangle, config.bars.mouseover);
      })
      .on("mouseout", function () {
        d3.select(this).call(dex.config.configureRectangle, config.bars.mouseout);
      });
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = barchart;
},{}],12:[function(require,module,exports){
var chord = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent'       : '#ChordDiagram',
    // Set these when you need to CSS style components independently.
    'id'           : 'Chord',
    'class'        : 'Chord',
    'resizable'   : true,
    // Our data...
    'csv'          : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'width'        : "100%",
    'height'       : "100%",
    'transform'    : "translate(0 0)",
    'padding'      : 0.05,
    'nodes'        : {
      'mouseout'  : dex.config.link(
        {
          'stroke.color'     : "black",
          //'stroke.dasharray': '5 5',
          'stroke.width'     : 1,
          'fill.fillColor'   : function (d, i) {
            //dex.console.log("COLORD", d);
            return (chart.config.color(d.index));
          },
          'fill.fillOpacity' : 0.5,
          'fill.fill'        : 'none',
          'd'                : d3.svg.arc(),
          'transform'        : ''
        }),
      'mouseover' : dex.config.link(
        {
          'stroke.color'     : "red",
          //'stroke.dasharray': '5 5',
          'stroke.width'     : 1,
          'fill.fillColor'   : function (d, i) {
            //dex.console.log("COLORD", d);
            return (chart.config.color(d.index));
          },
          'fill.fillOpacity' : 1,
          'fill.fill'        : 'none',
          'd'                : d3.svg.arc(),
          'transform'        : ''
        })
    },
    'links'        : {
      'mouseout'  : dex.config.link(
        {
          'stroke.color'     : "grey",
          'stroke.dasharray' : '',
          'stroke.width'     : 0,
          'fill.fillColor'   : function (d, i) {
            return (chart.config.color(d.target.index));
          },
          'fill.fillOpacity' : 0.5,
          'fill.fill'        : 'none',
          'd'                : d3.svg.chord(),
          'transform'        : ''
        }),
      'mouseover' : dex.config.link(
        {
          'stroke.color'     : "red",
          'stroke.dasharray' : '',
          'stroke.width'     : 0,
          'fill.fillColor'   : function (d, i) {
            return (chart.config.color(d.target.index));
          },
          'transform'        : "",
          'fill.fillOpacity' : 1,
          'fill.fill'        : 'none',
          'd'                : d3.svg.chord()
        })
    },
//                .style("fill", function (d) {
//        return chart.config.color(d.index);
//      })
    'color'        : d3.scale.category20(),
    'innerRadius'  : 130,
    'outerRadius'  : 200,
    'tick.start.x' : 1,
    'tick.start.y' : 0,
    'tick.end.x'   : 5,
    'tick.end.y'   : 0,
    'tick.padding' : 10,
    'tick.stroke'  : dex.config.stroke(
      {
        'width' : 2,
        'color' : 'black'
        //'dasharray' : '1 2'
      }),
    'title'        : dex.config.text(),
    'label'        : dex.config.text()
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll("#" + config.id).remove();

    var minDimension = Math.min(config.width, config.height);
    var outer = Math.min(config.width, config.height) / 3;

    var inner = Math.max(outer - 20, 10);
    config.innerRadius = inner;
    config.outerRadius = outer;

    // Calculated attributes.
    config.nodes.mouseover.d.innerRadius(config.innerRadius).outerRadius(config.outerRadius + 2);
    config.nodes.mouseout.d.innerRadius(config.innerRadius).outerRadius(config.outerRadius);
    config.links.mouseover.d.radius(config.innerRadius);
    config.links.mouseout.d.radius(config.innerRadius);

    chart.attr("transform", "translate(" + (config.width / 2) + "," + (config.height / 2) + ")");

    //console.log("LONGEST: " + longest + ", FONT-SIZE: " + config.label.font.size + ", INNER: " + inner + ", OUTER: " + outer);
    if (config.debug) {
      console.log("===== Chord#" + config.id + "." + config.class +
      " Configuration =====");
      console.dir(config);
    }

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    chordData = dex.csv.getConnectionMatrix(csv);
    //dex.console.log("Connection Matrix:", chordData);
    //dex.console.log("CSV", csv);
    var chord = d3.layout.chord()
      .padding(config.padding)
      .sortSubgroups(d3.descending)
      .matrix(chordData.connections);

    //dex.console.log("LINKS", config.links);

    chartContainer.append("g")
      .selectAll("path")
      .data(chord.groups)
      .enter().append("path")
      .attr("id", "fillpath")
      .call(dex.config.configureLink, config.nodes.mouseout)
      .on("mouseover", function (activeChord) {
        d3.select(this).call(dex.config.configureLink, config.nodes.mouseover);
        //dex.console.log("F", activeChord);
        d3.selectAll("g.chord path")
          .filter(function (d) {
            //return false;
            //dex.console.log("ACTIVE D", d);
            return d.source.index == activeChord.index || d.target.index == activeChord.index;
          })
          //.call("opacity", config.links.mouseover.fill.fillOpacity);
          .call(dex.config.configureLink, config.links.mouseover);
      })
      .on("mouseout", function (inactiveChord) {
        d3.select(this)
          .call(dex.config.configureLink, config.nodes.mouseout)
        //dex.console.log("INACTIVE", inactiveChord);
        d3.selectAll("g.chord path")
          .filter(function (d) {
            //return false;
            //dex.console.log("INACTIVE D", d);
            return d.source.index == inactiveChord.index || d.target.index == inactiveChord.index;
          })
          .call(dex.config.configureLink, config.links.mouseout);
        //.style("opacity", config.links.mouseout.fill.fillOpacity);
      });

    // REM: Used to be svg.
    var ticks = chartContainer.append("g")
      .attr("id", "ChordTicks")
      .selectAll("g")
      .data(chord.groups)
      .enter().append("g")
      .selectAll("g")
      .data(groupTicks)
      .enter().append("g")
      .attr("transform", function (d) {
        //console.dir(d);
        // Probably a bad idea, but getting parent angle data from parent.
        var startAngle = this.parentNode.__data__.startAngle;
        var endAngle = this.parentNode.__data__.endAngle;
        var midAngle = startAngle + (endAngle - startAngle) / 2.0;
        return "rotate(" + (midAngle * 180 / Math.PI - 90) + ")"
          + "translate(" + config.outerRadius + ",0)";
        //return "translate(" + config.xoffset + "," + config.yoffset + ")rotate(" + (midAngle * 180 / Math.PI - 90) + ")"
        //    + "translate(" + config.outerRadius + ",0)";
        //return "translate(" + config.xoffset + "," + config.yoffset + ")rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
        //    + "translate(" + config.outerRadius + ",0)";
      });

    ticks.append("line")
      .call(dex.config.configureLine, config.tick);
    //.attr("x1", 1)
    //.attr("y1", 0)
    //.attr("x2", config.tickLength)
    //.attr("y2", 0)
    //.attr("stroke-width", config.strokeWidth)
    //.style("stroke", "#000");

    ticks.append("text")
      .attr("x", config.tick.padding + (config.tick.padding / 4))
      .attr("dy", ".35em")
      .attr("font-size", config.label.font.size)
      .attr("text-anchor", function (d) {
        return d.angle > Math.PI ? "end" : null;
      })
      .attr("transform", function (d) {
        return d.angle > Math.PI ? "rotate(180)translate(-" +
        ((config.tick.padding * 2) + (config.tick.padding / 2)) + ")" : null;
      })
      .text(function (d) {
        return d.label;
      });

    chartContainer.append("g")
      .attr("class", "chord")
      .selectAll("path")
      .data(chord.chords)
      .enter().append("path")
      .call(dex.config.configureLink, config.links.mouseout)
      .on("mouseover", function () {
        d3.select(this)
          .call(dex.config.configureLink, config.links.mouseover);
      })
      .on("mouseout", function () {
        d3.select(this)
          .call(dex.config.configureLink, config.links.mouseout);
      });

    var chartTitle = chartContainer.append("text").call(dex.config.configureText, config.title,
      config.title.text);

    /** Returns an array of tick angles and labels, given a group. */
    function groupTicks(d) {
      var k = (d.endAngle - d.startAngle) / d.value;
      return d3.range(0, d.value, 1000).map(function (v, i) {
        return {
          angle : v * k + d.startAngle,
          //label: i % 5 ? null : v / 1000 + "k"
          label : chordData.header[d.index]
        };
      });
    }
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
}

module.exports = chord;
},{}],13:[function(require,module,exports){
var clusteredforce = function (userConfig) {

  var defaults =
  {
    'parent'         : null,
    'id'             : "ClusteredForce",
    'class'          : "ClusteredForce",
    'height'         : "100%",
    'width'          : "100%",
    'csv'            : {
      'header' : ["X", "Y"],
      'data'   : [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    'xi'             : 0,
    'yi'             : 2,
    'transform'      : '',
    'color'          : d3.scale.category20(),
    'padding'        : 10,
    // TODO: Add normalization function.
    'sizingFunction' : function () {
      return d3.scale.linear()
    },
    'minRadius'      : 1,
    'maxRadius'      : 20,
    'gravity'        : 10,
    'charge'         : -100,
    'scaleColumns'   : true,
    'circle'         : dex.config.circle({
      'r'         : function (d) {
        return (dex.object.isNumeric(d.radius) ? d.radius : 1);
      },
      'fill'      : dex.config.fill({
        'fillColor' : function (d) {
          return d.color;
        }
      }),
      'stroke'    : dex.config.stroke(),
      'tooltip'   : function (d) {
        return d.text;
      },
      'transform' : ''
    })
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function () {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function () {
    d3.selectAll("#" + chart.config.id).remove();
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart.attr("width", width).attr("height", height).update();
  };

  chart.update = function () {
    var config = chart.config;

    var csv = config.csv;
    var ri, ci, hi;

    var numericHeaders = dex.csv.getNumericColumnNames(csv);
    var numericIndices = dex.csv.getNumericIndices(csv);

    var i;

    var m = numericHeaders.length,
      radius = d3.scale.sqrt().range([0, 12]);

    var n = (dex.length - 1) * numericHeaders.length;

    var minValue, maxValue;

    if (!config.scaleColumns) {
      minValue = dex.matrix.min(csv.data, numericIndices[0]);
      maxValue = dex.matrix.max(csv.data, numericIndices[0]);
      for (i = 0; i < numericIndices.length; i++) {
        minValue = Math.min(minValue, dex.matrix.min(csv.data, numericIndices[i]));
        maxValue = Math.max(maxValue, dex.matric.max(csv.data, numericIndices[i]));
      }
    }

    var nodes = [];

    function scaleNodes(minRadius, maxRadius) {
      var numericScales = [];

      for (i = 0; i < numericIndices.length; i++) {
        if (config.scaleColumns) {
          minValue = dex.matrix.min(csv.data, numericIndices[i]);
          maxValue = dex.matrix.max(csv.data, numericIndices[i]);
        }

        //console.log("I: " + i + ", MIN: " + minValue + ", MAX: " + maxValue);

        numericScales.push(config.sizingFunction()
          .domain([minValue, maxValue]).range([config.minRadius, config.maxRadius]));
      }

      if (nodes.length == 0) {
        nodes = new Array((csv.data.length - 1) * numericIndices.length);
      }

      for (ri = 0; ri < csv.data.length; ri++) {
        dex.console.debug("RI:", ri, csv.data[ri]);
        for (ci = 0; ci < numericIndices.length; ci++) {
          var label = "<table border='1'>";
          for (hi = 0; hi < csv.data[ri].length; hi++) {
            if (hi == numericIndices[ci]) {
              label += "<tr><td><b>" + csv.data[0][hi] + "</b></td><td><b>" + csv.data[ri][hi] + "</b></td></tr>";
            }
            else {
              label += "<tr><td>" + csv.data[0][hi] + "</td><td>" + csv.data[ri][hi] + "</td></tr>";
            }
          }
          label += "</table>";

          nodes[(ri) * numericIndices.length + ci] =
          {
            radius : numericScales[ci](csv.data[ri][numericIndices[ci]]),
            //radius: radius(0.1),
            color  : config.color(ci),
            text   : label
          };
        }
      }
    }

    scaleNodes(config.minRadius, config.maxRadius);

    force = d3.layout.force()
      .nodes(nodes)
      .size([config.width, config.height])
      .gravity(config.gravity / 100.0)
      .charge(config.charge / 100.0)
      .on("tick", tick)
      .start();

    var chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    var circle = chartContainer.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .call(dex.config.configureCircle, config.circle)
      .call(force.drag);

    circle.append("text")
      .text(config.circle.tooltip);

    function tick(e) {
      circle
        .each(cluster(10 * e.alpha * e.alpha))
        .each(collide(.5))
        .attr("radius", function (d) {
          return (dex.object.isNumeric(d.radius) ? d.radius : 1);
        })
        .attr("cx", function (d) {
          return (dex.object.isNumeric(d.x) ? d.x : 0);
        })
        .attr("cy", function (d) {
          return (dex.object.isNumeric(d.y) ? d.y : 0);
        });
    }

    // Move d to be adjacent to the cluster node.
    function cluster(alpha) {
      var max = {};

      // Find the largest node for each cluster.
      nodes.forEach(function (d) {
        if (!(d.color in max) || (d.radius > max[d.color].radius)) {
          max[d.color] = d;
        }
      });

      return function (d) {
        var node = max[d.color],
          l,
          r,
          x,
          y,
          i = -1;

        if (node == d) return;

        x = d.x - node.x;
        y = d.y - node.y;
        l = Math.sqrt(x * x + y * y);
        r = d.radius + node.radius;
        if (l != r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          node.x += x;
          node.y += y;
        }
      };
    }

    // Resolves collisions between d and all other circles.
    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function (d) {
        var r = d.radius + radius.domain()[1] + config.padding,
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
        quadtree.visit(function (quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.color !== quad.point.color) * config.padding;
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2
            || x2 < nx1
            || y1 > ny2
            || y2 < ny1;
        });
      };
    }
  };

  $(document).ready(function () {
    $(chart.config.parent).tooltip({
      items    : "circle",
      content  : function () {
        return $(this).find("text").text();
      },
      track    : true
    });

    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = clusteredforce;
},{}],14:[function(require,module,exports){
var dendrogram = function Dendrogram(userConfig) {
  var defaults =
  {
    // The parent container of this chart.
    'parent'      : null,
    // Set these  when you need to CSS style components independently.
    'id'          : 'Dendrogram',
    'class'       : 'Dendrogram',
    'resizable'   : true,
    'connectType' : 'elbow',
    // Our data...
    'csv'        : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y"],
      'data'   : [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    // width and height of our chart.
    'width'      : "100%",
    'height'     : "100%",
    'connection' : {
      'length' : 180,
      'style'  : {
        'stroke' : dex.config.stroke()
      }
    },
    'transform'  : 'translate(20,0)',
    'root'       : {
      'name'     : "ROOT",
      'category' : "ROOT"
    },
    'color'      : d3.scale.category20(),
    'node'       : {
      'expanded'  : {
        'label'  : dex.config.text({
          'x'              : 8,
          'y'              : 4,
          'font.weight'    : 'bold',
          'fill.fillColor' : 'black',
          'text'           : function (d) {
            return (d.name) ? d.name : d.category;
          }
        }),
        'circle' : dex.config.circle({
          'r'    : 4,
          'fill' : {
            'fillColor' : 'steelblue'
          }
        })
      },
      'collapsed' : {
        'label'  : dex.config.text({
          'x'           : 8,
          'y'           : 4,
          'font.weight' : 'bold',
          'text'        : function (d) {
            return (d.name) ? d.name : d.category;
          }
        }),
        'circle' : dex.config.circle({
          'r'    : 5,
          'fill' : {
            'fillColor'   : 'green',
            'fillOpacity' : .8
          }
        })
      }
    },
    'link'       : dex.config.link({
      'fill'   : {
        'fillColor' : 'none'
      },
      'stroke' : dex.config.stroke({
        'color'     : 'green',
        'width'     : 1,
        'opacity'   : .3,
        'dasharray' : "5 5"
      })
    })
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    var chart = this;
    window.onresize = chart.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    dex.console.log("PARENT: '" + chart.config.parent + "'");
    if (chart.config.resizable) {
      var width = $("" + chart.config.parent).width();
      var height = $("" + chart.config.parent).height();
      dex.console.log("RESIZE: " + width + "x" + height);
      chart.attr("width", width)
        .attr("height", height)
        //.attr("connection.length", width / chart.config.csv.header.length -
        //  ((chart.config.csv.header.length) * chart.config.node.expanded.label.font.size))
        //.attr("connection.length", 200)
        .update();
    }
    else
    {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;

    var csv = config.csv;
    var json;

    d3.selectAll("#" + chart.config.id).remove();

    if (config.debug) {
      console.log("===== Dendrogram Configuration =====");
      console.dir(config);
    }

    var i = 0, root;

    var tree = d3.layout.tree()
        .size([config.height, config.width]);

    var connectionType;

    if (config.connectionType == "elbow")
    {
      connectionType = function elbow(d, i) {
        return "M" + d.source.y + "," + d.source.x
          + "V" + d.target.x + "H" + d.target.y;
      }
    }
    else {
      connectionType = d3.svg.diagonal()
        .projection(function (d) {
          return [d.y, d.x];
        });
    }

    var chartContainer = d3.select(config.parent)
        .append("g")
        .attr("id", config["id"])
        .attr("class", config["class"])
        .attr("transform", config.transform);

    var gradient = chartContainer.append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#0c0")
      .attr("stop-opacity", 1);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#c00")
      .attr("stop-opacity", 1);

    json =
    {
      "name"     : config.root.name,
      "category" : config.root.category,
      "children" : dex.csv.toHierarchicalJson(csv)
    };

    root = json;
    root.x0 = config.height / 2;
    root.y0 = 0;

    function toggleAll(d) {
      if (d.children) {
        d.children.forEach(toggleAll);
        toggle(d);
      }
      else if (d.kids) {
        d.kids.forEach(toggleAll);
        toggle(d);
      }
    }

    // Initialize the display to show a few nodes.
    //root.kids.forEach(toggleAll);

    chart.root = json;
    update(chart.root);

    function update(source) {
      var duration = d3.event && d3.event.altKey ? 5000 : 500;
      var depthY = new Array();

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse();

      // Allow manually set lengths to be used instead of fixed length connectors
      var fixedLength = true;
      if (String(config.connection.length).indexOf(",") > -1)
      {
        fixedLength = false;
        depthY = String(config.connection.length).split(",")
      }

      // Set y offsets based on single fixed length or manual settings
      nodes.forEach(function (d) {
        if (fixedLength)
        {
          d.y = d.depth * config.connection.length;
        }
        else
        {
          d.y = +depthY[d.depth];
        }
      });

      // Update the nodes…
      var node = chartContainer.selectAll("g.node")
          .data(nodes, function (d) {
            return d.id || (d.id = ++i);
          });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("svg:g")
          .attr("class", "node")
          .attr("transform", function (d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
          })
          .on("click", function (d) {
            toggle(d);
            update(d);
          });

      // Come back here...
      nodeEnter.append("svg:circle")
          .each(function (d) {
            //dex.console.log("CALLING", this, d, i);
            var nodeConfig = (d._children) ?
                config.node.collapsed.circle : config.node.expanded.circle;
            d3.select(this).call(dex.config.configureCircle, nodeConfig);
          })
          .attr("r", 1e-6);

      // Add text nodes configured like we want them.
      nodeEnter.append("text")
          .each(function (d) {
            var nodeConfig = (d._children) ?
                config.node.collapsed.label : config.node.expanded.label;
            d3.select(this).call(dex.config.configureText, nodeConfig);
          })
        //.text(function(d) { return (d.name) ? d.name : d.category;})
          .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
          });

      nodeUpdate.selectAll("circle")
          .each(
          function (d) {
            var nodeConfig = (d._children) ?
                config.node.collapsed.circle : config.node.expanded.circle;
            d3.select(this).transition().call(dex.config.configureCircle, nodeConfig);
          });

      nodeUpdate.select("text")
          .each(
          function (d) {
            var nodeConfig = (d._children) ?
                config.node.collapsed.label : config.node.expanded.label;
            d3.select(this).call(dex.config.configureText, nodeConfig);
          })
          .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
          .duration(duration)
          .attr("transform", function (d) {
            return "translate(" + (source.y) + "," + (source.x) + ")";
          })
          .remove();

      nodeExit.select("circle")
          .attr("r", 1e-6);

      nodeExit.select("text")
          .style("fill-opacity", 1e-6);

      // Update the links…
      var link = chartContainer.selectAll("path.link")
          .data(tree.links(nodes), function (d) {
            return d.target.id;
          });

      // Enter any new links at the parent's previous position.
      link.enter().insert("svg:path", "g")
          .attr("class", "link")
          .call(dex.config.configureLink, config.link)
        //.style("fill", config.link.fill)
        //.style("fill-opacity", config.link.fillOpacity)
          .attr("d", function (d) {
            var o = {x : source.x0, y : source.y0};
            return connectionType({source : o, target : o});
          })
          .transition()
          .duration(duration)
          .attr("d", connectionType)
        ;

      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", connectionType);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function (d) {
            var o = {x : source.x, y : source.y};
            return connectionType({source : o, target : o});
          })
          .remove();

      // Stash the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Toggle children.
    function toggle(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      }
      else {
        d.children = d._children;
        d._children = null;
      }
    }
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = dendrogram;
},{}],15:[function(require,module,exports){
var force = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent'       : '#Force',
    // Set these when you need to CSS style components independently.
    'id'           : 'Force',
    'class'        : 'Force',
    'resizable'   : true,
    // Our data...
    'csv'          : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'width'        : "100%",
    'height'       : "100%",
    'transform'    : "translate(0 0)",
    'label'        : dex.config.text({
      'x'              : 8,
      'y'              : 4,
      'font.size' : 26,
      'font.weight'    : 'bold',
      'fill.fillColor' : 'black'
    }),
    'link'         : dex.config.link({
        'stroke.color'     : "grey",
        'stroke.dasharray' : '2 2',
        'stroke.width'     :.5,
        'fill.fillOpacity' : 0.1,
        'transform'        : ''
      }),
    'linkDistance' : 60,
    'charge' : -300,
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll("#" + config.id).remove();

    var links = [];

    for (var ci=1; ci<csv.header.length; ci++)
    {
      for (var ri=0; ri<csv.data.length; ri++)
      {
        links.push({ 'source' : csv.data[ri][ci-1], 'target' : csv.data[ri][ci], 'group' : csv.header[ci] });
      }
    }
    var fill = d3.scale.category20();
    var nodes = {};

    links.forEach(function(link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, 'group' : link.group});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target, 'group' : link.group});
    });

    var width = config.width,
      height = config.height;

    var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(links)
      .size([width, height])
      .linkDistance(config.linkDistance)
      .charge(config.charge)
      .on("tick", tick)
      .start();

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    var link = chartContainer.selectAll(".link")
      .data(force.links())
      .enter().append("line")
      .attr("class", "link")
      .call(dex.config.configureLink, config.link);

    var node = chartContainer.selectAll(".node")
      .data(force.nodes())
      .enter().append("g")
      .attr("class", "node")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .call(force.drag);

    node.append("circle")
      .attr("r", 8)
      .style("fill", function(d) { return fill(d.group); });

    node.append("text")
      .attr("x", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; })
      .call(dex.config.configureText, config.label);

    function tick() {
      link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    }

    function mouseover() {
      d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 16);
    }

    function mouseout() {
      d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 8);
    }

  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = force;

},{}],16:[function(require,module,exports){
var heatmap = function(userConfig) {
  var defaults =
  {
    // The parent container of this chart.
    'parent'    : null,
    // Set these when you need to CSS style components independently.
    'id'        : 'HeatMap',
    'class'     : 'HeatMap',
    // Our data...
    'csv'       : {
      // Give folks without data something to look at anyhow.
      'header' : [ "X", "Y" ],
      'data'   : [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    // width and height of our bar chart.
    'width'     : 600,
    'height'    : 400,
    // The x an y indexes to chart.
    'xi'        : 0,
    'yi'        : 1,
    'hi'        : 2,
    'transform' : function(d, i) { return 'translate(180 20)'; },
    'heat'      : {
      'color' : d3.scale.category20(),
      'scale' : d3.scale.linear().range(["white", "red"])
    },
    'xaxis'     : dex.config.axis({
        'orient' : 'bottom',
        'label' : dex.config.text() }
    ),
    'yaxis'     : dex.config.axis({
      'orient' : 'left',
      'label' : dex.config.text()
    }),
    'rect'      : dex.config.rectangle({
      //'transform' : 'skewX(45)'
    })
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  // Replace the scale configuration with a real scale.
  var xscale = dex.config.createScale(dex.config.scale(chart.config.xaxis.scale));
  chart.config.xaxis.scale = xscale;
  // Replace the scale configuration with a real scale.
  var yscale = dex.config.createScale(dex.config.scale(chart.config.yaxis.scale));
  chart.config.yaxis.scale = yscale;

  chart.render = function () {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function () {
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart.attr("width", width).attr("height", height).update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;

    var csv = config.csv;

    d3.selectAll("#" + chart.config.id).remove();

    if (config.debug) {
      console.log("===== HeatMap Configuration =====");
      console.dir(config);
    }

    var chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", dex.config.optionValue(config.transform));

    var x = config.xaxis.scale.range([0, config.width]),
      y = config.yaxis.scale.range([config.height, 0]);
    heat = config.heat.scale;

    // The size of the json in the CSV data file.
    // This could be inferred from the data if it weren't sparse.
    var xStep = 864e5, yStep = 100;

    //var json = dex.csv.toJson(csv);
    var data = csv.data;

    // Coerce the CSV data to the appropriate types.
    data.forEach(function (d) {
      d[config.x] = +d[config.xi];
      d[config.yi] = +d[config.yi];
      d[config.hi] = +d[config.hi];
    });

    // Compute the scale domains.
    x.domain(d3.extent(data, function (d) {
      return d[config.xi];
    }));
    y.domain(d3.extent(data, function (d) {
      return d[config.yi];
    }));
    heat.domain(d3.extent(data, function (d) {
      return d[config.hi];
    }));

    // Extend the x- and y-domain to fit the last bucket.
    // For example, the y-bucket 3200 corresponds to values [3200, 3300].
    x.domain([x.domain()[0], +x.domain()[1] + xStep]);
    y.domain([y.domain()[0], y.domain()[1] + yStep]);

    // Display the tiles for each non-zero bucket.
    // See http://bl.ocks.org/3074470 for an alternative implementation.
    var rect = chartContainer.selectAll(".tile")
      .data(data)
      .enter().append("rect")
      .attr("class", "tile")
      .call(dex.config.configureRectangle, config.rect)
      .attr("x", function (d) {
        return x(d[config.xi]);
      })
      .attr("y", function (d) {
        return y(d[config.yi] + yStep);
      })
      .attr("width", x(xStep) - x(0))
      .attr("height", y(0) - y(yStep))
      .style("fill", function (d) {
        return heat(d[config.hi]);
      })
      .on("mouseover", function (d) {
        if (config.event && config.event.mouseover) {
          config.event.mouseover(d);
        }
        else {
          //dex.console.log("on.mouseover", d);
        }
      });

    var xaxis = d3.svg.axis();
    dex.config.configureAxis(xaxis, config.xaxis);
//      .scale(x);

    var yaxis = d3.svg.axis();
    dex.config.configureAxis(yaxis, config.yaxis);
//      .scale(y);

    // Add an x-axis with label.
    chartContainer.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + config.height + ")")
      .call(xaxis)
      .append("text")
      .attr("class", "label")
      .call(dex.config.configureText, config.xaxis.label);

    // Add a y-axis with label.
    chartContainer.append("g")
      .attr("class", "y axis")
      .call(yaxis)
      .append("text")
      .attr("class", "label")
      .call(dex.config.configureText, config.yaxis.label);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = heatmap;

},{}],17:[function(require,module,exports){
var horizonchart = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent'      : '#HorizonChartArea',
    // Set these when you need to CSS style components independently.
    'id'          : 'HorizonChart',
    'class'       : 'DexComponent',
    // Our data...
    'csv'         : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'margin'      : {
      'top'    : 2,
      'bottom' : 0,
      'left'   : 1,
      'right'  : 1
    },
    'interpolate' : "basis",
    'numBands'    : 4,
    //'mode' : "offset",
    'mode'        : "mirror",
    'bandColors'  : ["#08519c", "#bdd7e7", "#bae4b3", "#006d2c"],
    //'bandColors': ["#0000ff", "#00ff00", "#ffff00", "#ff0000"],
    //'bandColors': ["#08519c","#3182bd","#6baed6","#bdd7e7"],
    //'bandColors': ["#08519c","#3182bd","#6baed6","#bdd7e7","#bae4b3","#74c476","#31a354","#006d2c"],
    //'bandColors': ["#B0E5FB", "#63AFD5", "#337BB1", "#175389"],
    'width'       : "100%",
    'height'      : "100%",
    'transform'   : "translate(0 0)"
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function () {
    d3.selectAll("#" + chart.config.id).remove();
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart.attr("width", width).attr("height", height).update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;
    var ncsv = dex.csv.numericSubset(csv);

    var ri, ci;

    var numCharts = ncsv.header.length - 1;

    var chartHeight = (config.height - ((config.margin.top + config.margin.bottom) * numCharts)) / numCharts;

    for (ci = 1; ci < ncsv.header.length; ci++) {

      var svg = d3.select(config.parent)
        .append("g")
        .attr('id', config["id"])
        .attr('class', config["class"])
        .attr("width", config.width)
        .attr("height", chartHeight)
        .attr("transform", "translate(" + config.margin.left + ", " +
        (chartHeight * (ci - 1) + (config.margin.top * ci) + (config.margin.bottom * (ci - 1))) + ")");

      var hchart = d3.horizon(config)
        .width(config.width)
        .height(chartHeight)
        .bands(config.numBands)
        .mode(config.mode)
        .interpolate(config.interpolate);

      // Reads into a map with key=columnName, value=[ columnRowValues, ... ]
      var seriesData = dex.csv.columnSlice(dex.csv.copy(ncsv), [0, ci]);

      // Offset so that positive is above-average and negative is below-average.
      var mean = seriesData.data.reduce(
          function (prev, cur) {
            return prev + cur[1];
          }, 0) / seriesData.data.length;

      data = seriesData.data.map(function (row) {
        return [row[0], row[1] - mean];
      });

      // Render the chart.
      svg.data([data]).call(hchart);
    }
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

// Implementation of horizon.js
(function () {
  d3.horizon = function (config) {
    var bands = 1, // between 1 and 5, typically
      mode = "offset", // or mirror
      interpolate = "linear", // or basis, monotone, step-before, etc.
      x = d3_horizonX,
      y = d3_horizonY,
      w = 960,
      h = 40,
      duration = 0;

    //var color = d3.scale.linear()
    //  .domain([-1, 0, 0, 1])
    //  .range(["#08519c", "#bdd7e7", "#bae4b3", "#006d2c"]);

    var color = d3.scale.linear()
      .domain([-1, 0, 0, 1])
      .range(config.bandColors);

    // For each small multiple…
    function horizon(g) {
      g.each(function (d, i) {
        var g = d3.select(this),
          n = 2 * bands + 1,
          xMin = Infinity,
          xMax = -Infinity,
          yMax = -Infinity,
          x0, // old x-scale
          y0, // old y-scale
          id; // unique id for paths

        // Compute x- and y-values along with extents.
        var data = d.map(function (d, i) {
          var xv = x.call(this, d, i),
            yv = y.call(this, d, i);
          if (xv < xMin) xMin = xv;
          if (xv > xMax) xMax = xv;
          if (-yv > yMax) yMax = -yv;
          if (yv > yMax) yMax = yv;
          return [xv, yv];
        });

        // Compute the new x- and y-scales, and transform.
        var x1 = d3.scale.linear().domain([xMin, xMax]).range([0, w]),
          y1 = d3.scale.linear().domain([0, yMax]).range([0, h * bands]),
          t1 = d3_horizonTransform(bands, h, mode);

        // Retrieve the old scales, if this is an update.
        if (this.__chart__) {
          x0 = this.__chart__.x;
          y0 = this.__chart__.y;
          t0 = this.__chart__.t;
          id = this.__chart__.id;
        } else {
          x0 = x1.copy();
          y0 = y1.copy();
          t0 = t1;
          id = ++d3_horizonId;
        }

        // We'll use a defs to store the area path and the clip path.
        var defs = g.selectAll("defs")
          .data([null]);

        // The clip path is a simple rect.
        defs.enter().append("defs").append("clipPath")
          .attr("id", "d3_horizon_clip" + id)
          .append("rect")
          .attr("width", w)
          .attr("height", h);

        defs.select("rect").transition()
          .duration(duration)
          .attr("width", w)
          .attr("height", h);

        // We'll use a container to clip all horizon layers at once.
        g.selectAll("g")
          .data([null])
          .enter().append("g")
          .attr("clip-path", "url(#d3_horizon_clip" + id + ")");

        // Instantiate each copy of the path with different transforms.
        var path = g.select("g").selectAll("path")
          .data(d3.range(-1, -bands - 1, -1).concat(d3.range(1, bands + 1)), Number);

        var d0 = d3_horizonArea
          .interpolate(interpolate)
          .x(function (d) {
            return x0(d[0]);
          })
          .y0(h * bands)
          .y1(function (d) {
            return h * bands - y0(d[1]);
          })
        (data);

        var d1 = d3_horizonArea
          .x(function (d) {
            return x1(d[0]);
          })
          .y1(function (d) {
            return h * bands - y1(d[1]);
          })
        (data);

        path.enter().append("path")
          .style("fill", color)
          .attr("transform", t0)
          .attr("d", d0);

        path.transition()
          .duration(duration)
          .style("fill", color)
          .attr("transform", t1)
          .attr("d", d1);

        path.exit().transition()
          .duration(duration)
          .attr("transform", t1)
          .attr("d", d1)
          .remove();

        // Stash the new scales.
        this.__chart__ = {x : x1, y : y1, t : t1, id : id};
      });
      d3.timer.flush();
    }

    horizon.duration = function (x) {
      if (!arguments.length) return duration;
      duration = +x;
      return horizon;
    };

    horizon.bands = function (x) {
      if (!arguments.length) return bands;
      bands = +x;
      color.domain([-bands, 0, 0, bands]);
      return horizon;
    };

    horizon.mode = function (x) {
      if (!arguments.length) return mode;
      mode = x + "";
      return horizon;
    };

    horizon.colors = function (x) {
      if (!arguments.length) return color.range();
      color.range(x);
      return horizon;
    };

    horizon.interpolate = function (x) {
      if (!arguments.length) return interpolate;
      interpolate = x + "";
      return horizon;
    };

    horizon.x = function (z) {
      if (!arguments.length) return x;
      x = z;
      return horizon;
    };

    horizon.y = function (z) {
      if (!arguments.length) return y;
      y = z;
      return horizon;
    };

    horizon.width = function (x) {
      if (!arguments.length) return w;
      w = +x;
      return horizon;
    };

    horizon.height = function (x) {
      if (!arguments.length) return h;
      h = +x;
      return horizon;
    };

    return horizon;
  };

  var d3_horizonArea = d3.svg.area(),
    d3_horizonId = 0;

  function d3_horizonX(d) {
    return d[0];
  }

  function d3_horizonY(d) {
    return d[1];
  }

  function d3_horizonTransform(bands, h, mode) {
    return mode == "offset"
      ? function (d) {
      return "translate(0," + (d + (d < 0) - bands) * h + ")";
    }
      : function (d) {
      return (d < 0 ? "scale(1,-1)" : "") + "translate(0," + (d - bands) * h + ")";
    };
  }
})();

module.exports = horizonchart;
},{}],18:[function(require,module,exports){
var horizontallegend = function (userConfig) {
  var defaults = {
    'parent'     : null,
    'labels'     : ["A", "B", "C"],
    'id'         : "HorizontalLegend",
    'class'      : "HorizontalLegend",
    'transform'  : 'translate(20,20)',
    'tickLength' : 25,
    'color'      : d3.scale.category20c(),
    'caption'    : dex.config.text({
      'text'   : "Legend",
      'x'      : 0,
      'y'      : -6,
      'anchor' : 'start',
      'font'   : dex.config.font({'size' : 14, 'weight' : 'bold'}),
      'fill'   : dex.config.fill({'fillColor' : 'black'})
    }),
    'axis'       : dex.config.axis({
      'tickSize'    : 25,
      'tickPadding' : 10,
      'orient'      : 'bottom',
      'tickFormat'  : function (d) {
        return d;
      },
      'tickLine'    : dex.config.line({
        'stroke' : dex.config.stroke({'color' : 'grey', 'width' : 1}),
        'fill'   : dex.config.fill({'fillColor' : 'none'})
      }),
      'path'        : dex.config.path({
        'fill'   : dex.config.fill({'fillColor' : 'none'}),
        'stroke' : dex.config.stroke({'color' : 'grey', 'width' : 1})
      })
    }),
    'cell'       : dex.config.rectangle({
        'stroke' : dex.config.stroke(),
        'color'  : d3.scale.category10(),
        'height' : 20,
        'width'  : 30
      }
    )
  };

  //config = dex.object.overlay(dex.config.expand(userConfig), dex.config.expand(defaults));
  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    this.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    dex.console.log("HorizontalLegend config:", config);
    // Create our x scale
    var x = d3.scale.ordinal()
      .domain(config.labels)
      .range(d3.range(config.labels.length).map(function (i) {
        return i * config.cell.width;
      }));

    // Create the x axis.
    var xAxis = dex.config.createAxis(config.axis)
      .scale(x)
      .tickValues(config.labels);

    // Append a graphics node to the supplied svg node.
    var chartContainer = d3.select(config.parent).append("g")
      .attr("class", config["class"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    // Draw a colored rectangle for each ordinal range.
    chartContainer.selectAll("rect")
      .data(config.labels)
      .enter().append("rect")
      //.attr("height", config.cellHeight)
      .call(dex.config.configureRectangle, config.cell)
      .attr("x", function (d, i) {
        return x(i);
      });

    // Add the caption.
    chartContainer.call(xAxis).append("text")
      //.attr("class", "caption")
      .call(dex.config.configureText, config.caption);
    //.attr("y", config.captionYOffset)
    //.attr("x", config.captionXOffset)
    //.text("GEEZE");
    //.style("font-size", config.captionFontSize);

    chartContainer.select('path')
      .call(dex.config.configurePath, config.axis.path);

    chartContainer.selectAll(".tick line")
      .call(dex.config.configureLine, config.axis.tickLine);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = horizontallegend;
},{}],19:[function(require,module,exports){
var linechart = function (userConfig) {
  var defaults =
  {
    'parent'      : null,
    'id'          : "LineChart",
    "class"       : "LineChart",
    'csv'         : {
      'header' : ["X", "Y"],
      'data'   : [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    'width'       : 600,
    'height'      : 400,
    'xi'          : 0,
    'yi'          : [1],
    'transform'   : '',
    'pointColors' : d3.scale.category20(),
    'pointLabel'  : dex.config.text(),
    'lineColors'  : d3.scale.category20(),
    'xaxis'       : dex.config.axis({
      'type'      : 'linear',
      'orient'    : 'bottom',
      'axisLabel' : dex.config.text(),
      'tickLabel' : dex.config.text({
        'dy' : 25
      }),
      'tickLine'  : dex.config.line({
        'stroke.color' : 'red',
        'stroke.width' : 2

      })
    }),
    'yaxis'       : dex.config.axis({
      'type'      : 'linear',
      'orient'    : 'left',
      'axisLabel' : dex.config.text(),
      'tickLabel' : dex.config.text({
        'dy' : 6,
        'dx' : -10
      }),
      'tickLine'  : dex.config.line({
        'stroke.color' : 'red',
        'stroke.width' : 2
        //'start.x' : 0, 'start.y' : 0, 'end.x' : 500, 'end.y' : 500
      })
    })
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    this.update();
  };

  chart.update = function () {
    var chart = this;
    var csv = config.csv;
    var i;

    var cfg = dex.config.expandAndOverlay(userConfig, defaults);
    // Replace the scale configuration with a real scale.
    var xscale = dex.config.createScale(dex.config.scale(cfg.xaxis.scale));
    chart.config.xaxis.scale = xscale;
    // Replace the scale configuration with a real scale.
    var yscale = dex.config.createScale(dex.config.scale(cfg.yaxis.scale));
    chart.config.yaxis.scale = yscale;

    //dex.console.log("CSV", csv);

    // TODO: Takes away user configurability.  Figure out a balance.
    xscale.domain(d3.extent(config.csv.data, function (d) {
      return +d[config.xi];
    })).range([0, config.width])
    yscale.range([config.height, 0]);

    var xaxis = d3.svg.axis();
    dex.config.configureAxis(xaxis, config.xaxis);

    var yaxis = d3.svg.axis();
    dex.config.configureAxis(yaxis, config.yaxis);
//    var x = config.xaxis.scale()
//      .domain(d3.extent(csv.data, function(d) { return +d[config.xi]; }))
//      .range([0, config.width]);

    // Use a linear scale for x, map the value range to the pixel range.
    //var x = config.xaxis.scale().range([0, config.width]);
    //x.domain(d3.extent(csv.data, function(d) { return +d[config.xi]; }));

    // Use a linear scale for y, map the value range to the pixel range.
    //var y = config.yaxis.scale
    //  .domain(d3.extent(
    //    dex.matrix.flatten(dex.matrix.slice(csv.data, config.yi))))
    //  .range([config.height, 0]);
    var y = yaxis.scale()
      .domain(d3.extent(
        dex.matrix.flatten(dex.matrix.slice(csv.data, config.yi))))
      .range([config.height, 0]);

    // I hate this kind of stuff, but it's necessary to share
    // with mouseOver function.  There's probably a better way to do
    // it but I don't feel like blowing a couple hours figuring it out.
    chart.xaxis = xaxis;
    chart.yaxis = yaxis;

    var lines = [];

    for (i = 0; i < config.yi.length; i++) {
      // Define a function to draw the line.
      var line = d3.svg.line()
        .x(function (d) {
          return xaxis.scale()(+d[config.xi]);
        })
        .y(function (d) {
          return yaxis.scale()(+d[config.yi[i]]);
        });
      lines.push(line);
    }

    // Append a graphics node to the parent, all drawing will be relative
    // to the supplied offsets.  This encapsulating transform simplifies
    // the offsets within the child nodes.
    d3.selectAll('#' + config['id']).remove();
    var chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    // Add an x-axis with label.
    var xaxisG = chartContainer.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + config.height + ")")
      .call(xaxis);

    // Add a y-axis.
    var yaxisG = chartContainer.append("g")
      .attr("class", "y axis")
      .call(yaxis);

    // Add the custom tick labels.
    chartContainer.selectAll(".y.axis text")
      .call(dex.config.configureText, config.yaxis.tickLabel);
    chartContainer.selectAll(".x.axis text")
      .call(dex.config.configureText, config.xaxis.tickLabel);

    //
    chartContainer.selectAll(".y.axis line")
      .call(dex.config.configureLine, config.yaxis.tickLine);
    chartContainer.selectAll(".x.axis line")
      .call(dex.config.configureLine, config.xaxis.tickLine);

    // Add the custom axis labels.
    chartContainer.selectAll(".y.axis").append("text")
      .call(dex.config.configureText, config.yaxis.axisLabel);
    chartContainer.selectAll(".x.axis").append("text")
      .call(dex.config.configureText, config.xaxis.axisLabel);

    // Add the Y Axis Label
    yaxisG.append("text")
      .attr("class", "label")
      .call(dex.config.configureText, config.yaxis.tickLabel)
    //.text(dex.array.slice(csv.header, config.yi).join(" "));

    xaxisG.append("text")
      .attr("class", "label")
      .call(dex.config.configureText, config.xaxis.tickLabel)
      .text(config.xaxis.tickLabel.text);
    //.text(dex.array.slice(csv.header, config.xaxis.label.text).join(" "));

    // Draw each of the lines.
    for (i = 0; i < lines.length; i++) {
      chartContainer.append("path")
        .datum(csv.data)
        .attr("class", "line")
        .attr("d", lines[i])
        .style("stroke", config.lineColors(i));
    }

    // We handle mouseover with transparent rectangles.  This will calculate
    // the width of each rectangle.
    var rectalWidth = (csv.data.length > 1) ?
    xaxis.scale()(csv.data[1][config.xi]) - xaxis.scale()(csv.data[0][config.xi]) : 0;

    // Add the transparent rectangles for our mouseover events.
    chartContainer.selectAll("rect")
      .data(csv.data.map(function (d) {
        return d;
      }))
      .enter().append("rect")
      .attr("class", "overlay")
      .attr("transform", function (d, i) {
        return "translate(" + xaxis.scale()(d[config.xi]) + ",0)";
      })
      .attr("opacity", 0.0)
      .attr("width", rectalWidth)
      .attr("height", config.height)
      .on("mouseover", function (d) {
        var chartEvent =
        {
          type : "mouseover",
          data : d
        };
        chart.mouseOverHandler(chartEvent);
        chart.publish(chartEvent);
      });
  };

  // REM: Fix this event handler.
  chart.mouseOverHandler = function (chartEvent) {
    var i;

    var xaxis = chart.xaxis;
    var yaxis = chart.yaxis;

    var config = chart.config;

    if (!config) {
      return;
    }

    //console.log("CHART CONFIG:");
    //console.dir(config);

    //console.log("CHART EVENT:");
    //console.dir(chartEvent);
    var chartContainer = d3.select("#" + config.id);

    //console.log(chart.config["id"]);
    //console.log("CHART CONTAINER:");
    //console.dir(chartContainer);
    //console.log("Chart Container: " + typeof chart);
    //console.dir(chart);
    // Remove any old circles.
    chartContainer.selectAll("circle").remove();
    chartContainer.selectAll("#circleLabel").remove();

    // Draw a small red circle over the mouseover point.
    for (i = 0; i < config.yi.length; i++) {
      //console.log("I: " + i);
      var circle = chartContainer.append("circle")
        .attr("fill", config.pointColors(i))
        .attr("r", 4)
        .attr("cx", xaxis.scale()(chartEvent.data[config.xi]))
        .attr("cy", yaxis.scale()(chartEvent.data[config.yi[i]]));

      chartContainer.append("text")
        .attr("id", "circleLabel")
        .call(dex.config.configureText, config.pointLabel)
        .attr("x", xaxis.scale()(chartEvent.data[config.xi]))
        .attr("y", yaxis.scale()(chartEvent.data[config.yi[i]]) - 10)
        //.attr("dy", ".35m")
        //.style("font-size", 14)
        //.attr("text-anchor", "top")
        //.attr("fill", "black")
        .text(function (d) {
          if (typeof config.pointLabel === 'undefined' ||
            typeof config.pointLabel.format === 'undefined') {
            return chartEvent.data[config.yi[i]];
          }
          else {
            return config.pointLabel.format(chartEvent.data[config.yi[i]]);
          }
        });
    }
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = linechart;
},{}],20:[function(require,module,exports){
var motionbarchart = function (userConfig) {
  var defaultColor = d3.scale.category10();

  var csv = {
    'header' : ['name', 'color', 'time', 'x', 'y', 'size'],
    'data'   : []
  }

  var i = 0;
  for (var time = 1800; time < 1810; time += 1) {
    for (var color = 1; color < 4; color++) {
      csv.data.push(["name-" + color, color, time,
                     i * color, i * i * color, i * i * i * color]);
    }
    i += 1;
  }

  var color = d3.scale.category20c();

  var defaults =
  {
    // The parent container of this chart.
    'parent' : null,
    // Set these when you need to CSS style components independently.
    'id'     : 'MotionBarhart',
    'class'  : 'MotionBarChart',
    // Our data...
    'csv'    : csv,

    // Tells us which columns represent what.
    'index'  : {
      'name'  : 0,
      'color' : 0,
      'time'  : 1,
      'y'     : 2
    },
    // Chart dimensions.
    'width'  : 600,
    'height' : 400,
    'margin' : {
      top    : 20,
      right  : 100,
      bottom : 100,
      left   : 100
    },

    'bar' : dex.config.rectangle({
        'color'        : function (d, i) {
          return color(i);
        },
        'stroke.width' : 1,
        'stroke.color' : 'black',
        'events'       : {
          'mouseover' : function () {
            d3.select(this)
              .style("stroke", 'red')
              .style("stroke-width", 2);
          },
          'mouseout'  : function () {
            d3.select(this)
              .style("stroke", chart.config.bar.stroke.color)
              .style("stroke-width", chart.config.bar.stroke.width);
          }
        }
      }
    ),

    // Main label configuration
    'label.font.size'        : 64,
    'label.fill.fillColor'   : 'steelblue',
    'label.fill.fillOpacity' : 0.4,
    'label.y'                : function (d) {
      return 0;
    },
    'label.x'                : function (d) {
      return chart.config.width * .5;
    },

    'transform' : 'translate(0,0)',
    'duration'  : 10000,

    'xaxis' : dex.config.axis({
      'scale.type'                : 'linear',
      'orient'                    : 'bottom',
      'label'                     : dex.config.text({
        'x'      : function (d) {
          return (chart.config.width - chart.config.margin.right) / 2;
        },
        'y'      : function (d) {
          return chart.config.height - chart.config.margin.bottom + 20;
        },
        'anchor' : 'end'
      }),
      'tick.stroke.color'         : 'black',
      'tick.stroke.width'         : 1,
      'tick.fill.fillColor'       : 'none',
      'axisLine.stroke.color'     : 'black',
      'axisLine.stroke.width'     : 1,
      'axisLine.stroke.dasharray' : "10 10",
      'axisLine.fill.fillColor'   : 'none'
    }),
    'yaxis' : dex.config.axis({
      'scale.type'                : 'linear',
      'orient'                    : 'left',
      'label'                     : dex.config.text({
        'x'         : function (d) {
          //return chart.config.width - chart.config.margin.right;
          //return chart.config.margin.top;
          return 0;
        },
        'y'         : function (d) {
          //return chart.config.height - chart.config.margin.top
          //  - chart.config.margin.bottom - chart.config.xaxis.label.font.size;
          //return -chart.config.margin.left/2;
          return 10;
        },
        'anchor'    : 'end',
        'dy'        : '.75em',
        'transform' : 'rotate(-90)'
      }),
      'tick.stroke.width'         : 1,
      'tick.fill.fillColor'       : 'none',
      'axisLine.stroke.color'     : 'black',
      'axisLine.stroke.width'     : 1,
      'axisLine.stroke.dasharray' : "10 10",
      'axisLine.fill.fillColor'   : 'none'
    })
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function render() {
    window.onresize = this.resize;
    this.resize();
  };

  chart.resize = function resize() {
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart
      .attr("width", width)
      .attr("height", height)
      .update();
  };

  chart.update = function update() {
    // If we need to call super:
    //DexComponent.prototype.update.call(this);
    var chart = this.chart;
    var config = this.config;
    var csv = config.csv;

    d3.selectAll('#' + config.id).remove();

    var keyMap = {};

    csv.data.forEach(function (row) {
      var curName = row[config.index.name];
      var curColor = row[config.index.color];
      var curTime = row[config.index.time];
      var curY = row[config.index.y];
      var curSize = +row[config.index.size];

      if (!keyMap[curName]) {
        keyMap[curName] = {
          'name'  : curName,
          'color' : curColor,
          'time'  : curTime,
          'y'     : [[curTime, curY]],
          'size'  : [[curTime, curSize]]
        };
      }
      else {
        keyMap[curName].y.push([curTime, curY]);
        keyMap[curName].size.push([curTime, curSize]);
      }
    });

    var uniques = dex.matrix.uniques(csv.data);

    var timeExtents = dex.matrix.extent(csv.data, [config.index.time]);
    //var xExtents = [0, uniques[config.index.name].length-1];
    var yExtents = dex.matrix.extent(csv.data, [config.index.y]);

    dex.console.log("EXTENTS: Y", yExtents, "UNIQUES", uniques[config.index.name]);

    var width = config.width - config.margin.right;
    var height = config.height - config.margin.top - config.margin.bottom;

    // Various scales. These domains make assumptions of data, naturally.
    var xScale = d3.scale.ordinal()
      .domain(uniques[config.index.name])
      .rangePoints([0, width]);

    //  d3.scale.linear().domain(xExtents).range([0, width - 60]);
    var yScale = dex.config.createScale(config.yaxis.scale)
      .domain([0, yExtents[1]]).range([height, 0]);

    // The x & y axes.
    var xAxis = dex.config.createAxis(config.xaxis)
      .scale(xScale);

    var yAxis = dex.config.createAxis(config.yaxis)
      .scale(yScale);

    var svg = d3.select(config.parent)
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    // Add the x-axis.
    svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the y-axis.
    svg.append("g")
      .attr("class", "yaxis")
      .call(yAxis);

    var xticks = svg.selectAll(".xaxis .tick");

    var xtickLines = xticks.selectAll("line")
      .call(dex.config.configureStroke, config.xaxis.tick.stroke)
      .call(dex.config.configureFill, config.xaxis.tick.fill);

    var yticks = svg.selectAll(".yaxis .tick");

    var yTickLines = yticks.selectAll("line")
      .call(dex.config.configureStroke, config.yaxis.tick.stroke)
      .call(dex.config.configureFill, config.yaxis.tick.fill);

    svg.selectAll(".xaxis path")
      .call(dex.config.configureStroke, config.xaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.xaxis.axisLine.fill);

    svg.selectAll(".yaxis path")
      .call(dex.config.configureStroke, config.yaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.yaxis.axisLine.fill);

    var xTickLabels = xticks.selectAll("text")
      .style("text-anchor", "start");

    // Add an x-axis label.
    svg.append("text")
      .attr("class", "xLabel")
      .call(dex.config.configureText, config.xaxis.label)
      .text(config.csv.header[config.index.name]);

    // Add a y-axis label.
    svg.append("text")
      .attr("class", "yLabel")
      .call(dex.config.configureText, config.yaxis.label)
      .text(config.csv.header[config.index.y]);

    // Add the year label; the value is set on transition.
    var label = svg.append("text")
      .attr("class", "timeLabel")
      .attr("text-anchor", "end")
      .call(dex.config.configureText, config.label)
      .text(timeExtents[0]);

    // Load the data.
    //d3.json("nations.json", function (nations) {

    // A bisector since many nation's data is sparsely-defined.
    var bisect = d3.bisector(function (d) {
      return d[0];
    });

    // Add a dot per nation. Initialize the data at min year value, and set the colors.
    var bars = svg.append("g")
      .attr("class", "bars")
      .selectAll(".bar")
      .data(interpolateData(timeExtents[0]))
      .enter().append("rect")
      .attr("class", "bar")
      .call(dex.config.configureRectangle, config.bar)
      .call(position);
    //.sort(order);

    // Add a title.
    bars
      .append("tooltip-content")
      .text(function (d, i) {
        //dex.console.log("DTITLE", d);
        return "<table>" +
          "<tr><td>Name:</td><td>" + d.name + "</td></tr>" +
          "<tr><td>Category:</td><td>" + d.color + "</td></tr>" +
          "</table>";
      });

    // Add an overlay for the year label.
    var box = label.node().getBBox();

    var overlay = svg.append("rect")
      .attr("class", "overlay")
      .attr("x", box.x)
      .attr("y", box.y)
      .attr("width", box.width)
      .attr("height", box.height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .style("cursor", "ew-resize")
      .on("mouseover", enableInteraction);

    // Start a transition that interpolates the data based on year.
    svg.transition()
      .duration(config.duration)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);

    // Positions the dots based on data.
    function position(bar) {
      var barWidth = Math.floor((config.width - config.margin.left - config.margin.right) / bar.size());

      bar
        .attr("x", function (d, i) {
          return xScale(d.name);
        })
        .attr("y", function (d) {
          return yScale(d.y);
        })
        .attr("width", function (d) {
          return barWidth;
        })
        .attr("height", function (d) {
          return yScale(0) - yScale(d.y);
        });
    }

    // Defines a sort order so that the smallest dots are drawn on top.
    //function order(a, b) {
    //  return b.y - a.y;
    // }

    // After the transition finishes, you can mouseover to change the year.
    function enableInteraction() {
      //dex.console.log("ENABLING INTERACTION");
      var yearScale = d3.scale.linear()
        .domain(timeExtents)
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

      // Cancel the current transition, if any.
      svg.transition().duration(0);

      overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

      function mouseover() {
        label.classed("active", true);
      }

      function mouseout() {
        label.classed("active", false);
      }

      function mousemove() {
        displayYear(yearScale.invert(d3.mouse(this)[0]));
      }
    }

    // Tweens the entire chart by first tweening the year, and then the data.
    // For the interpolated data, the dots and label are redrawn.
    function tweenYear() {
      var year = d3.interpolateNumber(timeExtents[0], timeExtents[1]);
      return function (t) {
        displayYear(year(t));
      };
    }

    // Updates the display to show the specified year.
    function displayYear(year) {
      //dex.console.log("key='" + key + "', interpolateData(" + year + ")=",
      //  interpolateData(year));
      bars.data(interpolateData(year), function (d) {
        return d.name;
      }).call(position);//.sort(order);
      label.text(Math.round(year));
    }

    // Interpolates the dataset for the given (fractional) year.
    function interpolateData(year) {
      var timeData = [];

      //
      for (var name in keyMap) {
        if (keyMap.hasOwnProperty(name)) {
          var entry = keyMap[name];

          //dex.console.log("ENTRY-DATA", entry);
          timeData.push({
            time  : year,
            name  : entry.name,
            color : entry.color,
            y     : interpolateValues(entry.y, year),
            size  : interpolateValues(entry.size, year)
          });
        }
      }
      //dex.console.log("interpolateData(" + year + ")=", timeData);
      return timeData;
    }

    // Finds (and possibly interpolates) the value for the specified year.
    function interpolateValues(values, year) {
      //dex.console.log("VALUES", values);
      var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
      if (i > 0) {
        var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
        return a[1] * (1 - t) + b[1] * t;
      }
      return a[1];
    }
  };

  $(document).ready(function () {

    // Add tooltips
    $(chart.config.parent).tooltip({
      items   : "rect",
      content : function () {
        return $(this).find("tooltip-content").text();
      },
      track   : true
    });

    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
    $(chart.config.parent).find("rect").draggable();
  });

  return chart;
};

module.exports = motionbarchart;
},{}],21:[function(require,module,exports){
var motionchart = function (userConfig) {
  var defaultColor = d3.scale.category10();

  var csv = {
    'header' : ['name', 'color', 'time', 'x', 'y', 'size'],
    'data'   : []
  }

  var i = 0;
  for (var time = 1800; time < 1810; time += 1) {
    for (var color = 1; color < 4; color++) {
      csv.data.push(["name-" + color, color, time,
                     i * color, i * i * color, i * i * i * color]);
    }
    i += 1;
  }

  var defaults =
  {
    // The parent container of this chart.
    'parent' : null,
    // Set these when you need to CSS style components independently.
    'id'     : 'MotionChart',
    'class'  : 'MotionChart',
    // Our data...
    'csv'    : csv,

    // Tells us which columns represent what.
    'index'  : {
      'name'  : 0,
      'time'  : 1,
      'x'     : 2,
      'y'     : 3,
      'color' : 4,
      'size'  : 5
    },
    // Chart dimensions.
    'width'  : 600,
    'height' : 400,
    'margin' : {top : 50, right : 50, bottom : 50, left : 100},

    // Configuration for drawing the data-circles.
    'circle' : dex.config.circle({
      'colorscale'       : d3.scale.category10(),
      //'stroke.dasharray' : "1 1",
      'stroke.width'     : 1,
      'stroke.color'     : 'black',
      'fill.fillColor'   : function (d) {
        //dex.console.log("color(", d, ")=");
        return chart.config.circle.colorscale(d.name);
      },
      'fill.fillOpacity' : .4,
      'sizeScale.type'   : 'linear',
      'events'           : {
        'mouseover' : function () {
          d3.select(this)
            .style("stroke", 'red')
            .style("stroke-width", 4)
            .style("fill-opacity", 1);
        },
        'mouseout'  : function () {
          d3.select(this)
            .style("stroke", chart.config.circle.stroke.color)
            .style("stroke-width", chart.config.circle.stroke.width)
            .style("opacity", chart.config.circle.fill.fillOpacity);
        }
      }
    }),

    // Main label configuration
    'label.font.size'        : 128,
    'label.fill.fillColor'   : 'steelblue',
    'label.fill.fillOpacity' : 0.4,
    'label.y'                : function (d) {
      return chart.config.height * .5;
    },
    'label.x'                : function (d) {
      return chart.config.width * .8;
    },

    'transform' : 'translate(0,0)',
    'duration'  : 10000,

    'xaxis' : dex.config.axis({
      'scale.type'              : 'linear',
      'orient'                  : 'bottom',
      'label'                   : dex.config.text({
        'x'      : function (d) {
          //dex.console.log("X=" + (chart.config.width - chart.config.margin.right));
          return chart.config.width - chart.config.margin.left - chart.config.margin.right;
        },
        'y'      : function (d) {
          //dex.console.log("Y=" + (chart.config.height - chart.config.margin.top
          //- chart.config.margin.bottom - chart.config.xaxis.label.font.size));
          return chart.config.height - chart.config.margin.top
            - chart.config.margin.bottom - chart.config.xaxis.label.font.size;
        },
        'anchor' : 'end'
      }),
      'tick.stroke.width'       : 1,
      'tick.fill.fillColor'     : 'none',
      'axisLine.stroke.color'   : 'black',
      'axisLine.stroke.width'   : 1,
      'axisLine.fill.fillColor' : 'none'
    }),
    'yaxis' : dex.config.axis({
      'scale.type'              : 'linear',
      'orient'                  : 'left',
      'label'                   : dex.config.text({
        'x' : function (d) {
          return chart.config.width - chart.config.margin.right;
        },
        'y' : function (d) {
          return chart.config.height - chart.config.margin.top
            - chart.config.margin.bottom - chart.config.xaxis.label.font.size;
        }
      }),
      'tick.stroke.width'       : 1,
      'tick.fill.fillColor'     : 'none',
      'axisLine.stroke.color'   : 'black',
      'axisLine.stroke.width'   : 1,
      'axisLine.fill.fillColor' : 'none'
    })
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function render() {
    window.onresize = this.resize;
    this.resize();
  };

  chart.resize = function resize() {
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart
      .attr("width", width)
      .attr("height", height)
      .update();
  };

  chart.update = function update() {
    // If we need to call super:
    //DexComponent.prototype.update.call(this);
    var chart = this.chart;
    var config = this.config;
    var csv = config.csv;

    d3.selectAll('#' + config.id).remove();

    if (config.debug) {
      console.log("===== Motion Chart Configuration =====");
      console.dir(config);
    }

    var keyMap = {};

    csv.data.forEach(function (row) {
      var curName = row[config.index.name];
      var curColor = row[config.index.color];
      var curTime = row[config.index.time];
      var curX = row[config.index.x];
      var curY = row[config.index.y];
      var curSize = +row[config.index.size];

      if (!keyMap[curName]) {
        keyMap[curName] = {
          'name'  : curName,
          'color' : curColor,
          'time'  : curTime,
          'x'     : [[curTime, curX]],
          'y'     : [[curTime, curY]],
          'size'  : [[curTime, curSize]]
        };
      }
      else {
        keyMap[curName].x.push([curTime, curX]);
        keyMap[curName].y.push([curTime, curY]);
        keyMap[curName].size.push([curTime, curSize]);
      }
    });

    // Various accessors that specify the four dimensions of data to visualize.
    function key(d) {
      return d.name;
    }

    function color(d) {
      return d.color;
    }

    function x(d) {
      return d.x;
    }

    function y(d) {
      return d.y;
    }

    function radius(d) {
      return d.size;
    }

    var timeExtents = dex.matrix.extent(csv.data, [config.index.time]);
    var xExtents = dex.matrix.extent(csv.data, [config.index.x]);
    var yExtents = dex.matrix.extent(csv.data, [config.index.y]);
    var sizeExtents = dex.matrix.extent(csv.data, [config.index.size]);

    //dex.console.log("EXTENTS: X", xExtents, "Y", yExtents, "RADIUS", sizeExtents);

    var width = config.width - config.margin.right;
    var height = config.height - config.margin.top - config.margin.bottom;

    // Various scales. These domains make assumptions of data, naturally.
    var xScale =
      dex.config.createScale(config.xaxis.scale)
        .domain(xExtents).range([0, width - 60]);

    //  d3.scale.linear().domain(xExtents).range([0, width - 60]);
    var yScale = dex.config.createScale(config.yaxis.scale)
      .domain(yExtents).range([height, 60]);

    //d3.scale.linear().domain(yExtents).range([height, 60]);
    var radiusScale = dex.config.createScale(config.circle.sizeScale)
      .domain(sizeExtents).range([2, 50]);
    //d3.scale.linear().domain(sizeExtents).range([2, 50]);

    // The x & y axes.
    var xAxis = dex.config.createAxis(config.xaxis)
      .scale(xScale);

    var yAxis = dex.config.createAxis(config.yaxis)
      .scale(yScale);

    var svg = d3.select(config.parent)
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    // Add the x-axis.
    svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the y-axis.
    svg.append("g")
      .attr("class", "yaxis")
      .call(yAxis);

    var xticks = svg.selectAll(".xaxis .tick line")
      .call(dex.config.configureStroke, config.xaxis.tick.stroke)
      .call(dex.config.configureFill, config.xaxis.tick.fill);

    var yticks = svg.selectAll(".yaxis .tick line")
      .call(dex.config.configureStroke, config.yaxis.tick.stroke)
      .call(dex.config.configureFill, config.yaxis.tick.fill);

    svg.selectAll(".xaxis path")
      .call(dex.config.configureStroke, config.xaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.xaxis.axisLine.fill);

    svg.selectAll(".yaxis path")
      .call(dex.config.configureStroke, config.yaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.yaxis.axisLine.fill);

    // Add an x-axis label.
    svg.append("text")
      .attr("class", "xLabel")
      .call(dex.config.configureText, config.xaxis.label)
      //.attr("text-anchor", "end")
      //.attr("x", width)
      //.attr("y", height - 6)
      .text(config.csv.header[config.index.x]);

    // Add a y-axis label.
    svg.append("text")
      .attr("class", "yLabel")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text(config.csv.header[config.index.y]);

    // Add the year label; the value is set on transition.
    var label = svg.append("text")
      .attr("class", "timeLabel")
      .attr("text-anchor", "end")
      .attr("y", height - 24)
      .attr("x", width)
      .call(dex.config.configureText, config.label)
      .text(timeExtents[0]);

    // Load the data.
    //d3.json("nations.json", function (nations) {

    // A bisector since many nation's data is sparsely-defined.
    var bisect = d3.bisector(function (d) {
      return d[0];
    });

    // Add a dot per nation. Initialize the data at min year value, and set the colors.
    var dot = svg.append("g")
      .attr("class", "dots")
      .selectAll(".dot")
      .data(interpolateData(timeExtents[0]))
      .enter().append("circle")
      .attr("class", "dot")
      .call(dex.config.configureCircle, config.circle)
      .call(position)
      .sort(order);

    // Add a title.
    dot.append("tooltip-content")
      .text(function (d) {
        //dex.console.log("DTITLE", d);
        return "<table>" +
          "<tr><td>Name:</td><td>" + d.name + "</td></tr>" +
          "<tr><td>Category:</td><td>" + d.color + "</td></tr>" +
          "<tr><td>Time:</td><td>" + d.time + "</td></tr>" +
          "<tr><td>X:</td><td>" + d.x + "</td></tr>" +
          "<tr><td>Y:</td><td>" + d.y + "</td></tr>" +
          "<tr><td>Size:</td><td>" + d.size + "</td></tr>" +
          "</table>";
      });

    // Add an overlay for the year label.
    var box = label.node().getBBox();

    var overlay = svg.append("rect")
      .attr("class", "overlay")
      .attr("x", box.x)
      .attr("y", box.y)
      .attr("width", box.width)
      .attr("height", box.height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .style("cursor", "ew-resize")
      .on("mouseover", enableInteraction);

    // Start a transition that interpolates the data based on year.
    svg.transition()
      .duration(config.duration)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);

    // Positions the dots based on data.
    function position(dot) {
      dot
        .attr("cx", function (d) {
          //dex.console.log("d=", d, "x(d)=" + x(d),
          //    "cx=xScale(x(d))=" + xScale(x(d)));
          return xScale(x(d));
        })
        .attr("cy", function (d) {
          //dex.console.log("d=", d, "y(d)=" + x(d),
          //  "cy=yScale(y(d))=" + yScale(y(d)));
          return yScale(y(d));
        })
        .attr("r", function (d) {
          //dex.console.log("d=", d, "radius(d)=" + radius(d),
          //    "r=radiusScale(radius(d))=" + radiusScale(radius(d)));
          return radiusScale(radius(d));
        });
      //.each(function (d) {
      //dex.console.log("circle.cx=" + xScale(x(d)) + ", cy=" + yScale(y(d)) +
      //", r=" + radiusScale(radius(d)));
      //});
    }

    // Defines a sort order so that the smallest dots are drawn on top.
    function order(a, b) {
      return radius(b) - radius(a);
    }

    // After the transition finishes, you can mouseover to change the year.
    function enableInteraction() {
      //dex.console.log("ENABLING INTERACTION");
      var yearScale = d3.scale.linear()
        .domain(timeExtents)
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

      // Cancel the current transition, if any.
      svg.transition().duration(0);

      overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

      function mouseover() {
        label.classed("active", true);
      }

      function mouseout() {
        label.classed("active", false);
      }

      function mousemove() {
        displayYear(yearScale.invert(d3.mouse(this)[0]));
      }
    }

    // Tweens the entire chart by first tweening the year, and then the data.
    // For the interpolated data, the dots and label are redrawn.
    function tweenYear() {
      var year = d3.interpolateNumber(timeExtents[0], timeExtents[1]);
      return function (t) {
        displayYear(year(t));
      };
    }

    // Updates the display to show the specified year.
    function displayYear(year) {
      //dex.console.log("key='" + key + "', interpolateData(" + year + ")=",
      //  interpolateData(year));
      dot.data(interpolateData(year), key).call(position).sort(order);
      label.text(Math.round(year));
    }

    // Interpolates the dataset for the given (fractional) year.
    function interpolateData(year) {
      var timeData = [];

      //
      for (var name in keyMap) {
        if (keyMap.hasOwnProperty(name)) {
          var entry = keyMap[name];

          //dex.console.log("ENTRY-DATA", entry);
          timeData.push({
            time  : year,
            name  : entry.name,
            color : entry.color,
            x     : interpolateValues(entry.x, year),
            y     : interpolateValues(entry.y, year),
            size  : interpolateValues(entry.size, year)
          });
        }
      }
      //dex.console.log("interpolateData(" + year + ")=", timeData);
      return timeData;
    }

    // Finds (and possibly interpolates) the value for the specified year.
    function interpolateValues(values, year) {
      //dex.console.log("VALUES", values);
      var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
      if (i > 0) {
        var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
        return a[1] * (1 - t) + b[1] * t;
      }
      return a[1];
    }
  };

  $(document).ready(function () {

    // Add tooltips
    $(document).tooltip({
      items   : "circle",
      content : function () {
        return $(this).find("tooltip-content").text();
      },
      track   : true
    });

    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
    //$(chart.config.parent).find("rect").draggable();
  });

  return chart;
};

module.exports = motionchart;
},{}],22:[function(require,module,exports){
var motioncirclechart = function (userConfig) {
  var defaultColor = d3.scale.category10();

  var csv = {
    'header' : ['name', 'color', 'time', 'x', 'y', 'size'],
    'data'   : []
  }

  var i = 0;
  for (var time = 1800; time < 1810; time += 1) {
    for (var color = 1; color < 4; color++) {
      csv.data.push(["name-" + color, color, time,
                     i * color, i * i * color, i * i * i * color]);
    }
    i += 1;
  }

  var color = d3.scale.category20c();

  var defaults =
  {
    // The parent container of this chart.
    'parent' : null,
    // Set these when you need to CSS style components independently.
    'id'     : 'MotionCircleChart',
    'class'  : 'MotionCircleChart',
    // Our data...
    'csv'    : csv,

    // Tells us which columns represent what.
    'index'  : {
      'name'  : 0,
      'color' : 1,
      'time'  : 2,
      'y'     : 4
    },
    // Chart dimensions.
    'width'  : 600,
    'height' : 400,
    'margin' : {
      top    : 20,
      right  : 100,
      bottom : 100,
      left   : 100
    },

    'circle' : dex.config.circle({
      'fill.fillColor' : function (d, i) {
        return color(i);
      },
      'stroke.width'   : 1,
      'stroke.color'   : 'black',
      'events'         : {
        'mouseover' : function () {
          d3.select(this)
            .style("stroke", 'red')
            .style("stroke-width", 2);
        },
        'mouseout'  : function () {
          d3.select(this)
            .style("stroke", chart.config.circle.stroke.color)
            .style("stroke-width", chart.config.circle.stroke.width);
        }
      }
    }),

    // Main label configuration
    'label.font.size'        : 64,
    'label.fill.fillColor'   : 'steelblue',
    'label.fill.fillOpacity' : 0.4,
    'label.y'                : function (d) {
      return 0;
    },
    'label.x'                : function (d) {
      return chart.config.width * .5;
    },

    'transform' : 'translate(0,0)',
    'duration'  : 10000,

    'xaxis' : dex.config.axis({
      'scale.type'                : 'linear',
      'orient'                    : 'bottom',
      'label'                     : dex.config.text({
        'x'      : function (d) {
          return (chart.config.width - chart.config.margin.right) / 2;
        },
        'y'      : function (d) {
          return chart.config.height - chart.config.margin.bottom + 20;
        },
        'anchor' : 'end'
      }),
      'tick.stroke.color'         : 'black',
      'tick.stroke.width'         : 1,
      'tick.fill.fillColor'       : 'none',
      'axisLine.stroke.color'     : 'black',
      'axisLine.stroke.width'     : 1,
      'axisLine.stroke.dasharray' : "10 10",
      'axisLine.fill.fillColor'   : 'none'
    }),
    'yaxis' : dex.config.axis({
      'scale.type'                : 'linear',
      'orient'                    : 'left',
      'label'                     : dex.config.text({
        'x'         : function (d) {
          //return chart.config.width - chart.config.margin.right;
          //return chart.config.margin.top;
          return 0;
        },
        'y'         : function (d) {
          //return chart.config.height - chart.config.margin.top
          //  - chart.config.margin.bottom - chart.config.xaxis.label.font.size;
          //return -chart.config.margin.left/2;
          return 10;
        },
        'anchor'    : 'end',
        'dy'        : '.75em',
        'transform' : 'rotate(-90)'
      }),
      'tick.stroke.width'         : 1,
      'tick.fill.fillColor'       : 'none',
      'axisLine.stroke.color'     : 'black',
      'axisLine.stroke.width'     : 1,
      'axisLine.stroke.dasharray' : "10 10",
      'axisLine.fill.fillColor'   : 'none'
    })
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function render() {
    window.onresize = this.resize;
    this.resize();
  };

  chart.resize = function resize() {
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart
      .attr("width", width)
      .attr("height", height)
      .update();
  };

  chart.update = function update() {
    // If we need to call super:
    //DexComponent.prototype.update.call(this);
    var chart = this.chart;
    var config = this.config;
    var csv = config.csv;

    d3.selectAll('#' + config.id).remove();

    var keyMap = {};

    csv.data.forEach(function (row) {
      var curName = row[config.index.name];
      var curColor = row[config.index.color];
      var curTime = row[config.index.time];
      var curY = row[config.index.y];
      var curSize = +row[config.index.size];

      if (!keyMap[curName]) {
        keyMap[curName] = {
          'name'  : curName,
          'color' : curColor,
          'time'  : curTime,
          'y'     : [[curTime, curY]],
          'size'  : [[curTime, curSize]]
        };
      }
      else {
        keyMap[curName].y.push([curTime, curY]);
        keyMap[curName].size.push([curTime, curSize]);
      }
    });

    var uniques = dex.matrix.uniques(csv.data);

    var timeExtents = dex.matrix.extent(csv.data, [config.index.time]);
    //var xExtents = [0, uniques[config.index.name].length-1];
    var yExtents = dex.matrix.extent(csv.data, [config.index.y]);

    dex.console.log("EXTENTS: Y", yExtents, "UNIQUES", uniques[config.index.name]);

    var width = config.width - config.margin.right;
    var height = config.height - config.margin.top - config.margin.bottom;

    // Various scales. These domains make assumptions of data, naturally.
    var xScale = d3.scale.ordinal()
      .domain(uniques[config.index.name])
      .rangePoints([0, width]);

    //  d3.scale.linear().domain(xExtents).range([0, width - 60]);
    var yScale = dex.config.createScale(config.yaxis.scale)
      .domain([0, yExtents[1]]).range([height, 0]);

    // The x & y axes.
    var xAxis = dex.config.createAxis(config.xaxis)
      .scale(xScale);

    var yAxis = dex.config.createAxis(config.yaxis)
      .scale(yScale);

    var svg = d3.select(config.parent)
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    // Add the x-axis.
    svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the y-axis.
    svg.append("g")
      .attr("class", "yaxis")
      .call(yAxis);

    var xticks = svg.selectAll(".xaxis .tick");

    var xtickLines = xticks.selectAll("line")
      .call(dex.config.configureStroke, config.xaxis.tick.stroke)
      .call(dex.config.configureFill, config.xaxis.tick.fill);

    var yticks = svg.selectAll(".yaxis .tick");

    var yTickLines = yticks.selectAll("line")
      .call(dex.config.configureStroke, config.yaxis.tick.stroke)
      .call(dex.config.configureFill, config.yaxis.tick.fill);

    svg.selectAll(".xaxis path")
      .call(dex.config.configureStroke, config.xaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.xaxis.axisLine.fill);

    svg.selectAll(".yaxis path")
      .call(dex.config.configureStroke, config.yaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.yaxis.axisLine.fill);

    var xTickLabels = xticks.selectAll("text")
      .style("text-anchor", "start");

    // Add an x-axis label.
    svg.append("text")
      .attr("class", "xLabel")
      .call(dex.config.configureText, config.xaxis.label)
      .text(config.csv.header[config.index.name]);

    // Add a y-axis label.
    svg.append("text")
      .attr("class", "yLabel")
      .call(dex.config.configureText, config.yaxis.label)
      .text(config.csv.header[config.index.y]);

    // Add the year label; the value is set on transition.
    var label = svg.append("text")
      .attr("class", "timeLabel")
      .attr("text-anchor", "end")
      .call(dex.config.configureText, config.label)
      .text(timeExtents[0]);

    // Load the data.
    //d3.json("nations.json", function (nations) {

    // A bisector since many nation's data is sparsely-defined.
    var bisect = d3.bisector(function (d) {
      return d[0];
    });

    // Add a dot per nation. Initialize the data at min year value, and set the colors.
    var circles = svg.append("g")
      .attr("class", "circles")
      .selectAll(".circle")
      .data(interpolateData(timeExtents[0]))
      .enter().append("circle")
      .attr("class", "circle")
      .call(dex.config.configureCircle, config.circle)
      .call(position);
    //.sort(order);

    // Add a title.
    circles
      .append("tooltip-content")
      .text(function (d, i) {
        //dex.console.log("DTITLE", d);
        return "<table>" +
          "<tr><td>Name:</td><td>" + d.name + "</td></tr>" +
          "<tr><td>Category:</td><td>" + d.color + "</td></tr>" +
          "</table>";
      });

    // Add an overlay for the year label.
    var box = label.node().getBBox();

    var overlay = svg.append("rect")
      .attr("class", "overlay")
      .attr("x", box.x)
      .attr("y", box.y)
      .attr("width", box.width)
      .attr("height", box.height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .style("cursor", "ew-resize")
      .on("mouseover", enableInteraction);

    // Start a transition that interpolates the data based on year.
    svg.transition()
      .duration(config.duration)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);

    // Positions the dots based on data.
    function position(circle) {
      //var circleRadius = Math.floor((config.width - config.margin.left - config.margin.right) / circle.size());
      //var circleRadius = chart.config.circle.r;
      var circleRadius = 10;

      circle
        .attr("cx", function (d, i) {
          return xScale(d.name);
        })
        .attr("cy", function (d) {
          return yScale(d.y);
        })
        .attr("r", function (d) {
          return 10;
          //return circleRadius;
        });
    }

    // Defines a sort order so that the smallest dots are drawn on top.
    //function order(a, b) {
    //  return b.y - a.y;
    // }

    // After the transition finishes, you can mouseover to change the year.
    function enableInteraction() {
      //dex.console.log("ENABLING INTERACTION");
      var yearScale = d3.scale.linear()
        .domain(timeExtents)
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

      // Cancel the current transition, if any.
      svg.transition().duration(0);

      overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

      function mouseover() {
        label.classed("active", true);
      }

      function mouseout() {
        label.classed("active", false);
      }

      function mousemove() {
        displayYear(yearScale.invert(d3.mouse(this)[0]));
      }
    }

    // Tweens the entire chart by first tweening the year, and then the data.
    // For the interpolated data, the dots and label are redrawn.
    function tweenYear() {
      var year = d3.interpolateNumber(timeExtents[0], timeExtents[1]);
      return function (t) {
        displayYear(year(t));
      };
    }

    // Updates the display to show the specified year.
    function displayYear(year) {
      //dex.console.log("key='" + key + "', interpolateData(" + year + ")=",
      //  interpolateData(year));
      circles.data(interpolateData(year), function (d) {
        return d.name;
      }).call(position);//.sort(order);
      label.text(Math.round(year));
    }

    // Interpolates the dataset for the given (fractional) year.
    function interpolateData(year) {
      var timeData = [];

      //
      for (var name in keyMap) {
        if (keyMap.hasOwnProperty(name)) {
          var entry = keyMap[name];

          //dex.console.log("ENTRY-DATA", entry);
          timeData.push({
            time  : year,
            name  : entry.name,
            color : entry.color,
            y     : interpolateValues(entry.y, year),
            size  : interpolateValues(entry.size, year)
          });
        }
      }
      //dex.console.log("interpolateData(" + year + ")=", timeData);
      return timeData;
    }

    // Finds (and possibly interpolates) the value for the specified year.
    function interpolateValues(values, year) {
      //dex.console.log("VALUES", values);
      var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
      if (i > 0) {
        var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
        return a[1] * (1 - t) + b[1] * t;
      }
      return a[1];
    }
  };

  $(document).ready(function () {

    // Add tooltips
    $(chart.config.parent).tooltip({
      items   : "rect",
      content : function () {
        return $(this).find("tooltip-content").text();
      },
      track   : true
    });

    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
    $(chart.config.parent).find("rect").draggable();
  });

  return chart;
};

module.exports = motioncirclechart;
},{}],23:[function(require,module,exports){
var motionlinechart = function (userConfig) {
  var defaultColor = d3.scale.category10();

  var csv = {
    'header' : ['name', 'color', 'time', 'x', 'y', 'size'],
    'data'   : []
  }

  var i = 0;
  for (var time = 1800; time < 1810; time += 1) {
    for (var color = 1; color < 4; color++) {
      csv.data.push(["name-" + color, color, time,
                     i * color, i * i * color, i * i * i * color]);
    }
    i += 1;
  }

  var color = d3.scale.category20c();

  var defaults =
  {
    // The parent container of this chart.
    'parent' : null,
    // Set these when you need to CSS style components independently.
    'id'     : 'MotionLineChart',
    'class'  : 'MotionLineChart',
    // Our data...
    'csv'    : csv,

    // Tells us which columns represent what.
    'index'  : {
      'name'  : 0,
      'color' : 1,
      'time'  : 2,
      'y'     : 4
    },
    // Chart dimensions.
    'width'  : 600,
    'height' : 400,
    'margin' : {
      top    : 20,
      right  : 100,
      bottom : 100,
      left   : 100
    },

    'circle'                 : dex.config.path({
      'fill.fillColor' : function (d, i) {
        return color(i);
      },
      'stroke.width'   : 1,
      'stroke.color'   : 'black',
      'events'         : {
        'mouseover' : function () {
          d3.select(this)
            .style("stroke", 'red')
            .style("stroke-width", 2);
        },
        'mouseout'  : function () {
          d3.select(this)
            .style("stroke", chart.config.circle.stroke.color)
            .style("stroke-width", chart.config.circle.stroke.width);
        }
      }
    }),
    'line'                   : dex.config.line({
      'stroke.color'   : 'black',
      'stroke.width'   : 1,
      'fill.fillColor' : 'none',
      'fill.opacity'   : 0,
      //'interpolate'    : 'linear'
      //'interpolate'    : 'linear-closed'
      //'interpolate'    : 'step-before'
      //'interpolate'    : 'basis'
      //'interpolate'    : 'basis-open'
      //'interpolate'    : 'basis-closed'
      //'interpolate'    : 'bundle'
      'interpolate'    : 'cardinal'
      //'interpolate'    : 'cardinal-open'
      //'interpolate'    : 'cardinal-closed'
      //'interpolate'    : 'monotone'
    }),
    // Main label configuration
    'label.font.size'        : 64,
    'label.fill.fillColor'   : 'steelblue',
    'label.fill.fillOpacity' : 0.4,
    'label.y'                : function (d) {
      return 0;
    },
    'label.x'                : function (d) {
      return chart.config.width * .5;
    },

    'transform' : 'translate(0,0)',
    'duration'  : 10000,

    'xaxis' : dex.config.axis({
      'scale.type'                : 'linear',
      'orient'                    : 'bottom',
      'label'                     : dex.config.text({
        'x'      : function (d) {
          return (chart.config.width - chart.config.margin.right) / 2;
        },
        'y'      : function (d) {
          return chart.config.height - chart.config.margin.bottom + 20;
        },
        'anchor' : 'end'
      }),
      'tick.stroke.color'         : 'black',
      'tick.stroke.width'         : 1,
      'tick.fill.fillColor'       : 'none',
      'axisLine.stroke.color'     : 'black',
      'axisLine.stroke.width'     : 1,
      'axisLine.stroke.dasharray' : "10 10",
      'axisLine.fill.fillColor'   : 'none'
    }),
    'yaxis' : dex.config.axis({
      'scale.type'                : 'linear',
      'orient'                    : 'left',
      'label'                     : dex.config.text({
        'x'         : function (d) {
          //return chart.config.width - chart.config.margin.right;
          //return chart.config.margin.top;
          return 0;
        },
        'y'         : function (d) {
          //return chart.config.height - chart.config.margin.top
          //  - chart.config.margin.bottom - chart.config.xaxis.label.font.size;
          //return -chart.config.margin.left/2;
          return 10;
        },
        'anchor'    : 'end',
        'dy'        : '.75em',
        'transform' : 'rotate(-90)'
      }),
      'tick.stroke.width'         : 1,
      'tick.fill.fillColor'       : 'none',
      'axisLine.stroke.color'     : 'black',
      'axisLine.stroke.width'     : 1,
      'axisLine.stroke.dasharray' : "10 10",
      'axisLine.fill.fillColor'   : 'none'
    })
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function render() {
    window.onresize = this.resize;
    this.resize();
  };

  chart.resize = function resize() {
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart
      .attr("width", width)
      .attr("height", height)
      .update();
  };

  chart.update = function update() {
    // If we need to call super:
    //DexComponent.prototype.update.call(this);
    var chart = this.chart;
    var config = this.config;
    var csv = config.csv;

    d3.selectAll('#' + config.id).remove();

    var keyMap = {};

    csv.data.forEach(function (row) {
      var curName = row[config.index.name];
      var curColor = row[config.index.color];
      var curTime = row[config.index.time];
      var curY = row[config.index.y];
      var curSize = +row[config.index.size];

      if (!keyMap[curName]) {
        keyMap[curName] = {
          'name'  : curName,
          'color' : curColor,
          'time'  : curTime,
          'y'     : [[curTime, curY]],
          'size'  : [[curTime, curSize]]
        };
      }
      else {
        keyMap[curName].y.push([curTime, curY]);
        keyMap[curName].size.push([curTime, curSize]);
      }
    });

    var uniques = dex.matrix.uniques(csv.data);

    var timeExtents = dex.matrix.extent(csv.data, [config.index.time]);
    //var xExtents = [0, uniques[config.index.name].length-1];
    var yExtents = dex.matrix.extent(csv.data, [config.index.y]);

    dex.console.log("EXTENTS: Y", yExtents, "UNIQUES", uniques[config.index.name]);

    var width = config.width - config.margin.right;
    var height = config.height - config.margin.top - config.margin.bottom;

    // Various scales. These domains make assumptions of data, naturally.
    var xScale = d3.scale.ordinal()
      .domain(uniques[config.index.name])
      .rangePoints([0, width]);

    //  d3.scale.linear().domain(xExtents).range([0, width - 60]);
    var yScale = dex.config.createScale(config.yaxis.scale)
      .domain([0, yExtents[1]]).range([height, 0]);

    // The x & y axes.
    var xAxis = dex.config.createAxis(config.xaxis)
      .scale(xScale);

    var yAxis = dex.config.createAxis(config.yaxis)
      .scale(yScale);

    var svg = d3.select(config.parent)
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    // Add the x-axis.
    svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the y-axis.
    svg.append("g")
      .attr("class", "yaxis")
      .call(yAxis);

    var xticks = svg.selectAll(".xaxis .tick");

    var xtickLines = xticks.selectAll("line")
      .call(dex.config.configureStroke, config.xaxis.tick.stroke)
      .call(dex.config.configureFill, config.xaxis.tick.fill);

    var yticks = svg.selectAll(".yaxis .tick");

    var yTickLines = yticks.selectAll("line")
      .call(dex.config.configureStroke, config.yaxis.tick.stroke)
      .call(dex.config.configureFill, config.yaxis.tick.fill);

    svg.selectAll(".xaxis path")
      .call(dex.config.configureStroke, config.xaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.xaxis.axisLine.fill);

    svg.selectAll(".yaxis path")
      .call(dex.config.configureStroke, config.yaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.yaxis.axisLine.fill);

    var xTickLabels = xticks.selectAll("text")
      .style("text-anchor", "start");

    // Add an x-axis label.
    svg.append("text")
      .attr("class", "xLabel")
      .call(dex.config.configureText, config.xaxis.label)
      .text(config.csv.header[config.index.name]);

    // Add a y-axis label.
    svg.append("text")
      .attr("class", "yLabel")
      .call(dex.config.configureText, config.yaxis.label)
      .text(config.csv.header[config.index.y]);

    // Add the year label; the value is set on transition.
    var label = svg.append("text")
      .attr("class", "timeLabel")
      .attr("text-anchor", "end")
      .call(dex.config.configureText, config.label)
      .text(timeExtents[0]);

    // Load the data.
    //d3.json("nations.json", function (nations) {

    // A bisector since many nation's data is sparsely-defined.
    var bisect = d3.bisector(function (d) {
      return d[0];
    });

    var initialData = interpolateData(timeExtents[0]);

    // Add a dot per nation. Initialize the data at min year value, and set the colors.
    var circles = svg.append("g")
      .attr("class", "circles")
      .selectAll(".circle")
      .data(initialData)
      .enter().append("circle")
      .attr("class", "circle")
      .call(dex.config.configureCircle, config.circle)
      .call(position);
    //.sort(order);

    dex.console.log("INITIAL DATA:", initialData);

    var d3line = d3.svg.line();
    dex.config.configureLine(d3line, config.line);

    d3line
      .x(function (d, i) {
        return xScale(d.name);
      })
      .y(function (d, i) {
        return yScale(d.y)
      });

    var line = svg.selectAll('path.dataline')
      .data([initialData])
      .enter()
      .append("svg:path")
      .attr("d", d3line);
      //.call(dex.config.configureLine, config.line);

    dex.console.log("LINE: ", line);

    // Add a title.
    circles
      .append("tooltip-content")
      .text(function (d, i) {
        //dex.console.log("DTITLE", d);
        return "<table>" +
          "<tr><td>Name:</td><td>" + d.name + "</td></tr>" +
          "<tr><td>Category:</td><td>" + d.color + "</td></tr>" +
          "</table>";
      });

    // Add an overlay for the year label.
    var box = label.node().getBBox();

    var overlay = svg.append("rect")
      .attr("class", "overlay")
      .attr("x", box.x)
      .attr("y", box.y)
      .attr("width", box.width)
      .attr("height", box.height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .style("cursor", "ew-resize")
      .on("mouseover", enableInteraction);

    // Start a transition that interpolates the data based on year.
    svg.transition()
      .duration(config.duration)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);

    // After the transition finishes, you can mouseover to change the year.
    function enableInteraction() {
      //dex.console.log("ENABLING INTERACTION");
      var yearScale = d3.scale.linear()
        .domain(timeExtents)
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

      // Cancel the current transition, if any.
      svg.transition().duration(0);

      overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

      function mouseover() {
        label.classed("active", true);
      }

      function mouseout() {
        label.classed("active", false);
      }

      function mousemove() {
        displayYear(yearScale.invert(d3.mouse(this)[0]));
      }
    }

    // Tweens the entire chart by first tweening the year, and then the data.
    // For the interpolated data, the dots and label are redrawn.
    function tweenYear() {
      var year = d3.interpolateNumber(timeExtents[0], timeExtents[1]);
      return function (t) {
        displayYear(year(t));
      };
    }

    // Positions the dots based on data.
    function position(circle) {
      //var circleRadius = Math.floor((config.width - config.margin.left - config.margin.right) / circle.size());
      //var circleRadius = chart.config.circle.r;
      var circleRadius = 10;

      circle
        .attr("cx", function (d, i) {
          return xScale(d.name);
        })
        .attr("cy", function (d) {
          return yScale(d.y);
        })
        .attr("r", function (d) {
          return 10;
          //return circleRadius;
        });
    }

    // Defines a sort order so that the smallest dots are drawn on top.
    //function order(a, b) {
    //  return b.y - a.y;
    // }

    // Updates the display to show the specified year.
    function displayYear(year) {
      //dex.console.log("key='" + key + "', interpolateData(" + year + ")=",
      //  interpolateData(year));
      var yearData = interpolateData(year);
      circles.data(yearData, function (d) {
        return d.name;
      }).call(position);//.sort(order);
      label.text(Math.round(year));

      line.data([yearData])
        .attr("d", d3line)
        .call(dex.config.configurePath, config.line);

//        .attr("x", function (d) {
//          return xScale(d.name);
//        })
//        .attr("y", function (d) {
//          dex.console.log("Y:" + yScale(d.y));
//          return yScale(d.y)
//        });
      //.call(positionLine);
    }

    // Interpolates the dataset for the given (fractional) year.
    function interpolateData(year) {
      var timeData = [];

      //
      for (var name in keyMap) {
        if (keyMap.hasOwnProperty(name)) {
          var entry = keyMap[name];

          //dex.console.log("ENTRY-DATA", entry);
          timeData.push({
            time  : year,
            name  : entry.name,
            color : entry.color,
            y     : interpolateValues(entry.y, year),
            size  : interpolateValues(entry.size, year)
          });
        }
      }
      //dex.console.log("interpolateData(" + year + ")=", timeData);
      return timeData;
    }

    // Finds (and possibly interpolates) the value for the specified year.
    function interpolateValues(values, year) {
      //dex.console.log("VALUES", values);
      var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
      if (i > 0) {
        var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
        return a[1] * (1 - t) + b[1] * t;
      }
      return a[1];
    }
  }
  ;

  $(document).ready(function () {

    // Add tooltips
    $(chart.config.parent).tooltip({
      items   : "rect",
      content : function () {
        return $(this).find("tooltip-content").text();
      },
      track   : true
    });

    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
    $(chart.config.parent).find("rect").draggable();
  });

  return chart;
};

module.exports = motionlinechart;
},{}],24:[function(require,module,exports){
var orbitallayout = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent': '#ChordDiagram',
    // Set these when you need to CSS style components independently.
    'id': 'Chord',
    'class': 'Chord',
    'resizable': true,
    // Our data...
    'csv': {
      // Give folks without data something to look at anyhow.
      'header': ["X", "Y", "Z"],
      'data': [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'width': "100%",
    'height': "100%",
    'transform': "translate(0 0)",
    'title': dex.config.text(),
    'label': dex.config.text(),
    'circles': dex.config.circle(),
    'orbits': dex.config.circle({
      'r': 5,
      'fill': {
        'fillColor': 'none',
        'fillOpacity': 1
      },
      'stroke': dex.config.stroke({
        'width': 1,
        'color': 'green',
        'opacity': .5,
        'dasharray': "2 2"
      })
    }),
    'refreshFrequencyMs' :50,
    'tickRadianStep' : 0.004363323129985824
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll("#" + config.id).remove();
    var data = dex.csv.toNestedJson(dex.csv.copy(csv));

    d3.layout.orbit = function () {
      var currentTickStep = 0;
      var orbitNodes;
      var orbitSize = [1, 1];
      var nestedNodes;
      var flattenedNodes = [];
      var orbitDispatch = d3.dispatch('tick');
      var tickInterval;
      var tickRadianStep = config.tickRadianStep;
      var orbitalRings = [];
      var orbitDepthAdjust = function () {
        return 2.95
      };
      var childrenAccessor = function (d) {
        return d.children
      };
      var tickRadianFunction = function () {
        return 1
      };

      function _orbitLayout() {

        return _orbitLayout;
      }

      _orbitLayout.mode = function () {
        //Atomic, Solar, other?
      }

      _orbitLayout.start = function () {
        //activate animation here
        tickInterval = setInterval(
          function () {
            currentTickStep++;
            flattenedNodes.forEach(function (_node) {
              if (_node.parent) {
                _node.x = _node.parent.x + ( (_node.parent.ring / 2) * Math.sin(_node.angle + (currentTickStep *
                    config.tickRadianStep * tickRadianFunction(_node))) );
                _node.y = _node.parent.y + ( (_node.parent.ring / 2) * Math.cos(_node.angle + (currentTickStep *
                    config.tickRadianStep * tickRadianFunction(_node))) );
              }
            })
            orbitalRings.forEach(function (_ring) {
              _ring.x = _ring.source.x;
              _ring.y = _ring.source.y;
            })
            orbitDispatch.tick();
          },
          config.refreshFrequencyMs);
      }

      _orbitLayout.stop = function () {
        //deactivate animation here
        clearInterval(tickInterval);
      }

      _orbitLayout.speed = function (_degrees) {
        if (!arguments.length) return tickRadianStep / (Math.PI / 360);
        tickRadianStep = tickRadianStep = _degrees * (Math.PI / 360);
        return this;
      }

      _orbitLayout.size = function (_value) {
        if (!arguments.length) return orbitSize;
        orbitSize = _value;
        return this;
        //change size here
      }

      _orbitLayout.revolution = function (_function) {
        //change ring size reduction (make that into dynamic function)
        if (!arguments.length) return tickRadianFunction;
        tickRadianFunction = _function;
        return this
      }

      _orbitLayout.orbitSize = function (_function) {
        //change ring size reduction (make that into dynamic function)
        if (!arguments.length) return orbitDepthAdjust;
        orbitDepthAdjust = _function;
        return this
      }

      _orbitLayout.orbitalRings = function () {
        //return an array of data corresponding to orbital rings
        if (!arguments.length) return orbitalRings;
        return this;
      }

      _orbitLayout.nodes = function (_data) {
        if (!arguments.length) return flattenedNodes;
        nestedNodes = _data;
        calculateNodes();
        return this;
      }

      _orbitLayout.children = function (_function) {
        if (!arguments.length) return childrenAccessor;

        //Probably should use d3.functor to turn a string into an object key
        childrenAccessor = _function;
        return this;


      }

      d3.rebind(_orbitLayout, orbitDispatch, "on");

      return _orbitLayout;
      function calculateNodes() {
        var _data = nestedNodes;
        //If you have an array of elements, then create a root node (center)
        //In the future, maybe make a binary star kind of thing?
        if (!childrenAccessor(_data)) {
          orbitNodes = {key: "root", values: _data}
          childrenAccessor(orbitNodes).forEach(function (_node) {
            _node.parent = orbitNodes;
          })
        }
        //otherwise assume it is an object with a root node
        else {
          orbitNodes = _data;
        }
        orbitNodes.x = orbitSize[0] / 2;
        orbitNodes.y = orbitSize[1] / 2;
        orbitNodes.deltaX = function (_x) {
          return _x
        }
        orbitNodes.deltaY = function (_y) {
          return _y
        }
        orbitNodes.ring = orbitSize[0] / 2;
        orbitNodes.depth = 0;

        flattenedNodes.push(orbitNodes);

        traverseNestedData(orbitNodes)

        function traverseNestedData(_node) {
          if (childrenAccessor(_node)) {
            var thisPie = d3.layout.pie().value(function (d) {
              return childrenAccessor(d) ? 4 : 1
            });
            var piedValues = thisPie(childrenAccessor(_node));

            orbitalRings.push({source: _node, x: _node.x, y: _node.y, r: _node.ring / 2});

            for (var x = 0; x < childrenAccessor(_node).length; x++) {

              childrenAccessor(_node)[x].angle = ((piedValues[x].endAngle - piedValues[x].startAngle) / 2) + piedValues[x].startAngle;

              childrenAccessor(_node)[x].parent = _node;
              childrenAccessor(_node)[x].depth = _node.depth + 1;

              childrenAccessor(_node)[x].x = childrenAccessor(_node)[x].parent.x + ( (childrenAccessor(_node)[x].parent.ring / 2) * Math.sin(childrenAccessor(_node)[x].angle) );
              childrenAccessor(_node)[x].y = childrenAccessor(_node)[x].parent.y + ( (childrenAccessor(_node)[x].parent.ring / 2) * Math.cos(childrenAccessor(_node)[x].angle) );

              childrenAccessor(_node)[x].deltaX = function (_x) {
                return _x
              }
              childrenAccessor(_node)[x].deltaY = function (_y) {
                return _y
              }
              childrenAccessor(_node)[x].ring = childrenAccessor(_node)[x].parent.ring / orbitDepthAdjust(_node);

              flattenedNodes.push(childrenAccessor(_node)[x]);
              traverseNestedData(childrenAccessor(_node)[x]);
            }
          }
        }
      }

    }

    //down with category20a()!!
    colors = d3.scale.category20();

    orbitScale = d3.scale.linear().domain([1, 3]).range([3.8, 1.5]).clamp(true);
    radiusScale = d3.scale.linear().domain([0, 1, 2, 3]).range([20, 10, 3, 1]).clamp(true);

    var minSize = Math.min(config.width, config.height);

    orbit = d3.layout.orbit().size([minSize, minSize])
      .children(function (d) {
        return d.children
      })
      .revolution(function (d) {
        return d.depth
      })
      .orbitSize(function (d) {
        return orbitScale(d.depth)
      })
      .speed(.1)
      .nodes(data);

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    chartContainer.selectAll("g.node").data(orbit.nodes())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")"
      })
      .on("mouseover", nodeOver)
      .on("mouseout", nodeOut)

    var circles = d3.selectAll("g.node")
      .append("circle");

    circles.call(dex.config.configureCircle, config.circles);
    circles.attr("r", function (d) {
        return radiusScale(d.depth)
      })
      .style("fill", function (d) {
        return colors(d.depth)
      });

    chartContainer.selectAll("circle.orbits")
      .data(orbit.orbitalRings())
      .enter()
      .insert("circle", "g")
      .call(dex.config.configureCircle, config.orbits)
      .attr("class", "ring")
      .attr("r", function (d) {
        return d.r
      })
      .attr("cx", function (d) {
        return d.x
      })
      .attr("cy", function (d) {
        return d.y
      });

    orbit.on("tick", function () {
      d3.selectAll("g.node")
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")"
        });

      d3.selectAll("circle.ring")
        .attr("cx", function (d) {
          return d.x
        })
        .attr("cy", function (d) {
          return d.y
        });
    });

    orbit.start();

    function nodeOver(d) {
      orbit.stop();
      d3.select(this).append("text").text(d.name).style("text-anchor", "middle").attr("y", 35);
      d3.select(this).select("circle").style("stroke", "black").style("stroke-width", 3);
    }

    function nodeOut() {
      orbit.start();
      //d3.selectAll("text").remove();
      d3.selectAll("g.node > circle").style("stroke", "none").style("stroke-width", 0);
    }
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = orbitallayout;
},{}],25:[function(require,module,exports){
var parallelcoordinates = function (userConfig) {
  var chart;

  defaults =
  {
    'id': "ParallelCoordinates",
    'class': "ParallelCoordinates",
    'parent': null,
    'width': "100%",
    'height': "100%",
    'resizable': true,
    'color': d3.scale.category20(),
    'title': 'Parallel Coordinates',
    'csv': {
      'header': ["X", "Y"],
      'data': [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    'rows': 0,
    //'transform'       : function (d) {
    //  return 'scale(.95, .95) translate(50, 50)'
    //},
    'normalize': false,
    'margin': {
      'left': 80,
      'right': 60,
      'top': 60,
      'bottom': 20
    },
    'axis': {
      'orient': 'left'
    },
    'axis.line': dex.config.line({
      'stroke': dex.config.stroke(
        {
          'color': function (d, i) {
            return "black";
          },
          'width': 1
        }),
      'fill': {
        'fillColor': "none",
        'fillOpacity': 1.0
      }
    }),
    'axis.label': dex.config.text({
      'font': {
        'size': function (d, i) {
          var uniques = _.uniq(_.flatten(dex.matrix.slice(chart.config.csv.data, [i])));

          var maxLabelLength =
            Math.min(("" + _.max(uniques,
              function (item) {
                return ("" + item).length;
              })).length, 40);

          // No need to adjust margins, initial transform already did.
          var maxFontSizeByHeight =
            ((chart.config.height) /
            (uniques.length ? uniques.length : 1) - 2);

          var maxFontSizeByWidth =
            (((chart.config.width) /
            (chart.config.csv.header.length - 1)) / maxLabelLength);

          //dex.console.log("AXIS-FONT-SIZE: I: " + i + ", MAX-HEIGHT: " + maxFontSizeByHeight +
          //", MAX-WIDTH: " + maxFontSizeByWidth + ", MAX-LABEL-LENGTH: " + maxLabelLength);
          return Math.min(Math.max(Math.min(maxFontSizeByWidth, maxFontSizeByHeight), 4), 18);
        }
      },
      'anchor': function (d, i) {
        if (i < chart.config.csv.header.length - 1) {
          return 'end';
        }
        else {
          return 'start';
        }
      },
      'dx': function (d, i) {
        return -1 * Math.max(chart.config.axis.label.font.size(d, i) / 2, 8);
      },
      'dy': ".35em",
      'fill.fillColor': 'black',
      'fill.fillOpacity': 1,
      'events': {
        'mouseover': function (d, i) {
          d3.select(this)
            .style('fill', 'red')
            .style('fill-opacity', 1);
        },
        'mouseout': function (d, i) {
          d3.select(this)
            .style('fill', 'black')
            .style('fill-opacity', 1);
        }
      }
    }),
    'verticalLabel': dex.config.text({
      // If you want to stagger labels.
      'dy': function (d, i) {
        return (i % 2) ?
        -chart.config.margin.top * .60 :
        -chart.config.margin.top * .20;
      },
      'font.size': function (d) {
        var maxFontSizeByHeight =
          chart.config.margin.top * .5;
        var maxFontSizeByWidth =
          (chart.config.width - chart.config.margin.left - chart.config.margin.right) /
          (chart.config.csv.header.length) / 10;
        //dex.console.log("TITLE-FONT-SIZE: MAX-HEIGHT: " + maxFontSizeByHeight +
        //", MAX-WIDTH: " + maxFontSizeByWidth);
        return Math.max(Math.min(maxFontSizeByWidth, maxFontSizeByHeight), 4);
      },
      'anchor': 'middle',
      'text': function (d) {
        return d;
      },
      'events': {
        'mouseover': function (d) {
          //dex.console.log("Mouseover detected...");
        }
      }
    }),
    'selected.link': {
      'stroke': dex.config.stroke(
        {
          'color': function (d, i) {
            return chart.config.color(i);
          },
          'width': 2
        }),
      'fill': {
        'fillColor': "none",
        'fillOpacity': 1.0
      },
      'events': {
        'mouseover': function () {
          d3.select(this)
            .style("stroke-width", chart.config.selected.link.stroke.width +
              Math.max(4, (chart.config.selected.link.stroke.width / 3)))
            .style("stroke-opacity", chart.config.selected.link.stroke.opacity);
        },
        'mouseout': function () {
          d3.select(this)
            .style("stroke-width", chart.config.selected.link.stroke.width)
            .style("stroke-opacity", chart.config.selected.link.stroke.opacity);
        }
      }
    },
    'unselected.link': {
      'stroke': dex.config.stroke(
        {
          'color': function (d, i) {
            return chart.config.color(i);
          },
          'width': 1,
          'dasharray': "10 10"
        }),
      'fill': {
        'fillColor': "none",
        'fillOpacity': 0.1
      }
    },
    'brush': {
      'width': 12,
      'x': -6,
      'opacity': .8,
      'color': "steelblue",
      'stroke': dex.config.stroke({'color': "black", 'width': 1})
    },
    'ui.config': {}
  };


  chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;
    d3.selectAll("#" + chart.config.id).remove();

    window.onresize = this.resize;
    chart.resize();

    var chartContainer;
    // Holds unselected paths.
    var background;
    // Holds selected paths.
    var foreground;
    // Will hold our column names.



    var numericColumns =
      dex.csv.getNumericColumnNames(csv);

    var jsonData = dex.csv.toJson(csv);

    var x = d3.scale.ordinal()
      .rangePoints([0, config.width], 1);

    var y = {};

    var line = d3.svg.line();

    var dimensions;
    var key;

    //dex.console.log("TRANSFORM:", config.transform, "HEIGHT: ", config.height, "WIDTH:", config.width);
    chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      //.attr("width", config.width)
      //.attr("height", config.height)
      .attr("transform", config.transform);

    // Extract the list of dimensions and create a scale for each.
    //x.domain(dimensions = d3.keys(cars[0]).filter(function(d)
    //{
    //  return d != "name" && (y[d] = d3.scale.linear()
    //    .domain(d3.extent(cars, function(p) { return +p[d]; }))
    //    .range([height, 0]));
    //}));
    var allExtents = []

    numericColumns.forEach(function (d) {
      allExtents = allExtents.concat(d3.extent(jsonData, function (p) {
        return +p[d];
      }));
    });

    var normalizedExtent = d3.extent(allExtents);

    // REM: Figure out how to switch over to consistent extents.  Snapping.
    x.domain(dimensions = d3.keys(jsonData[0]).filter(function (d) {
      if (d === "name") return false;

      if (dex.object.contains(numericColumns, d)) {
        var extent = d3.extent(jsonData, function (p) {
          return +p[d];
        });
        if (config.normalize) {
          extent = normalizedExtent;
        }

        y[d] = d3.scale.linear()
          .domain(extent)
          .range([config.height, 0]);
        allExtents.concat(extent);
      }
      else {
        y[d] = d3.scale.ordinal()
          .domain(jsonData.map(function (p) {
            return p[d];
          }))
          .rangePoints([config.height, 0]);
      }

      return true;
    }));

    // Add grey background lines for context.
    background = chartContainer.append("g")
      .attr("class", "background")
      .selectAll("path")
      .data(jsonData)
      .enter().append("path")
      .call(dex.config.configureLink, config.unselected.link)
      .attr("d", path)
      .attr("id", "fillpath");

    foreground = chartContainer.append("g")
      .attr("class", "foreground")
      .selectAll("path")
      .data(jsonData)
      .enter().append("path")
      .attr("d", path)
      .call(dex.config.configureLink, config.selected.link);

    foreground
      .append("tooltip-content").text(function (d, i) {
      var info = "<table border=\"1\">";
      for (key in jsonData[i]) {
        info += "<tr><td><b><i>" + key + "</i></b></td><td>" + jsonData[i][key] + "</td></tr>"
      }
      return info + "</table>";
    });

    // Returns the path for a given data point.
    function path(d) {
      return line(dimensions.map(function (p) {
        return [x(p), y[p](d[p])];
      }));
    }

    chart.update();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      chart
        .attr("width", width - chart.config.margin.left - chart.config.margin.right)
        .attr("height", height - chart.config.margin.top - chart.config.margin.bottom)
        .attr("transform", "translate(" + chart.config.margin.left + "," +
          chart.config.margin.top + ")");
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    var jsonData = dex.csv.toJson(csv);

    var allExtents = []

    var numericColumns =
      dex.csv.getNumericColumnNames(csv);

    var x = d3.scale.ordinal()
      .rangePoints([0, config.width], 1);
    var y = {};
    var line = d3.svg.line();

    numericColumns.forEach(function (d) {
      allExtents = allExtents.concat(d3.extent(jsonData, function (p) {
        return +p[d];
      }));
    });

    var normalizedExtent = d3.extent(allExtents);

    // REM: Figure out how to switch over to consistent extents.  Snapping.
    x.domain(dimensions = d3.keys(jsonData[0]).filter(function (d) {
      if (d === "name") return false;

      if (dex.object.contains(numericColumns, d)) {
        var extent = d3.extent(jsonData, function (p) {
          return +p[d];
        });
        if (config.normalize) {
          extent = normalizedExtent;
        }

        y[d] = d3.scale.linear()
          .domain(extent)
          .range([config.height, 0]);
        allExtents.concat(extent);
      }
      else {
        y[d] = d3.scale.ordinal()
          .domain(jsonData.map(function (p) {
            return p[d];
          }))
          .rangePoints([config.height, 0]);
      }

      return true;
    }));

    // Returns the path for a given data point.
    function path(d) {
      return line(dimensions.map(function (p) {
        //dex.console.log("x=" + x(p));
        return [x(p), y[p](d[p])];
      }));
    }

    d3.select("g .foreground")
      .selectAll("path")
      .data(jsonData)
      .transition(20)
      .attr("d", path);

    d3.select("g .foreground")
      .selectAll("path")
      .data(jsonData)

    d3.select("g .foreground")
      .selectAll("path")
      .data(jsonData).exit()
      .remove();

    d3.selectAll("g .foreground")
      .selectAll("path")
      .selectAll("tooltip-content")
      .remove();

    d3.selectAll("g .foreground")
      .selectAll("path")
      .append("tooltip-content")
      .text(function (d, i) {
        var info = "<table border=\"1\">";
        for (key in jsonData[i]) {
          info += "<tr><td><b><i>" + key + "</i></b></td><td>" + jsonData[i][key] + "</td></tr>"
        }
        return info + "</table>";
      });

    d3.selectAll("g .background")
      .selectAll("path")
      .data(jsonData)
      .transition(20)
      .attr("d", path);

    d3.selectAll("g .background")
      .selectAll("path")
      .data(jsonData)
      .enter()
      .append("path")
      .call(dex.config.configureLink, config.unselected.link)
      .attr("d", path)
      .attr("id", "fillpath");

    d3.selectAll("g .background")
      .selectAll("path")
      .data(jsonData)
      .exit()
      .remove();

    chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      //.attr("width", config.width)
      //.attr("height", config.height)
      .attr("transform", config.transform);

    var dimensions = chartContainer.selectAll(".dimension")
      .data(dimensions)
      .attr("class", "dimension")
      .attr("transform", function (d) {
        return "translate(" + x(d) + ")";
      });

    dimensions.enter()
      .append("g")
      .attr("class", "dimension")
      .attr("transform", function (d) {
        return "translate(" + x(d) + ")";
      });

    // Would be nice to transition axis too.
    d3.selectAll("g .axis").remove();
    d3.selectAll("g .brush").remove();

    dimensions.append("g")
     .attr("class", "axis")
     .each(function (d, i) {

     var axisScale = dex.config.createScale(dex.config.scale(config.axis.scale));
     var axis = d3.svg.axis()
     .scale(axisScale);

     var myConfig = dex.object.clone(config.axis);
     // If the last label, turn it to the right.
     if (i == config.csv.header.length - 1) {
     myConfig.orient = 'right';
     myConfig.label.dx = function (d, i) {
     return Math.max(chart.config.axis.label.font.size(d, i) / 2, 8);
     }
     }
     // Configure and apply the axis.
     dex.config.configureAxis(axis, myConfig, i);
     d3.select(this).call(axis.scale(y[d]));

     // Now that the axis has rendered, adjust the tick labels based on our spec.
     var tickLabels = d3.select(this)
     .selectAll('.tick')
     .selectAll("text")
     .call(dex.config.configureText, myConfig.label, i);
     })
     .append("text")
     .call(dex.config.configureText, config.verticalLabel);

    // Add and store a brush for each axis.
    dimensions.append("g")
      .attr("class", "brush")
      .each(function (d) {
        d3.select(this).call(y[d].brush =
          d3.svg.brush().y(y[d])
            .on("brush", brush)
            .on("brushend", brushend));
      })
      .selectAll("rect")
      .call(dex.config.configureRectangle, config.brush);

    // Configure the axis lines:
    //dex.console.log("DOMAIN", d3.selectAll(".domain"));
    d3.selectAll(".domain")
      .call(dex.config.configurePath, config.axis.line);

    // Handles a brush event, toggling the display of foreground lines.
    function brush() {
      // Get a list of our active brushes.
      var actives = dimensions.filter(function (p) {
          return !y[p].brush.empty();
        }),

      // Get an array of min/max values for each brush constraint.
        extents = actives.map(function (p) {
          return y[p].brush.extent();
        });

      foreground.style("display", function (d) {
        //dex.console.log("Calculating what lines to display: ", actives);
        return actives.every(
          // P is column name, i is an index
          function (p, i) {
            // Categorical
            //console.log("P: " + p + ", I: " + i);
            if (!dex.object.contains(numericColumns, p)) {
              return extents[i][0] <= y[p](d[p]) && y[p](d[p]) <= extents[i][1];
            }
            // Numeric
            else {
              return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }
          }) ? null : "none";
      });
    }

    // Handles a brush event, toggling the display of foreground lines.
    function brushend() {
      //dex.console.log("BRUSH-END: ", foreground);
      //dex.console.log("chart: ", chart);
      var activeData = [];
      var i;

      // WARNING:
      //
      // Can't find an elegant way to get back at the data so I am getting
      // at the data in a somewhat fragile manner instead.  Mike Bostock ever
      // changes the __data__ convention and this will break.
      for (i = 0; i < foreground[0].length; i++) {
        if (!(foreground[0][i]["style"]["display"] == "none")) {
          activeData.push(foreground[0][i]['__data__']);
        }
      }

      //dex.console.log("Selected: ", dex.json.toCsv(activeData, dimensions));
      chart.publish({
        "type": "select",
        "selected": dex.json.toCsv(activeData, dimensions)});
    }

  };


  $(document).ready(function () {
    $(document).tooltip({
      items: "path",
      content: function () {
        return $(this).find("tooltip-content").text();
      },
      track: true
    });
  });

  return chart;
};

module.exports = parallelcoordinates;
},{}],26:[function(require,module,exports){
var piechart = function (userConfig) {
  var chart = new dex.component(userConfig,
    {
      'parent'      : "#PieChart",
      'id'          : "PieChart",
      'class'       : "PieChart",
      'csv'         : {
        'header' : ["X", "Y"],
        'data'   : [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
      },
      'xi'          : 0,
      'yi'          : 2,
      'xoffset'     : 200,
      'yoffset'     : 0,
      'colors'      : d3.scale.category20(),
      'innerRadius' : 0,
      'outerRadius' : 190,
      'radius'      : 200,
      'label'       : {
        'fontSize'   : 16,
        'textAnchor' : 'middle'
      },
      'caption'     : {
        'text'       : '',
        'fontSize'   : 24,
        'textAnchor' : 'middle'
      }
    });

  chart.render = function () {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function () {
    d3.selectAll("#" + chart.config.id).remove();
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart
      .attr("width", width)
      .attr("height", height)
      .attr("outerRadius", Math.min(width / 2, height / 2))
      .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
      .update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

//  var radius = Math.min(config.width, config.height) / 2;

    var color = d3.scale.ordinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
      .outerRadius(config.outerRadius)
      .innerRadius(config.innerRadius);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function (d) {
        return d[config.yi];
      });

    var chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    var data = csv.data;

    // Convert all y values to numerics.
    data.forEach(function (d) {
      d[config.yi] = +d[config.yi];
    });

    var g = chartContainer.selectAll(".arc")
      .data(pie(data, function (d) {
        return d[config.yi];
      }))
      .enter().append("g")
      .attr("class", function (d) {
        return "arc";
      });

    g.append("path")
      .attr("d", arc)
      .style("fill", function (d, i) {
        return config.colors(i);
      });

    g.append("text")
      .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", config.label.textAnchor)
      .style("font-size", config.label.fontSize)
      .text(function (d) {
        return d.data[config.xi];
      });

    chartContainer.append("text")
      //.attr("dy", ".35em")
      .attr("y", -config.radius)
      .style("font-size", config.caption.fontSize)
      .style("text-anchor", config.caption.textAnchor)
      .text(config.caption.text);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = piechart;
},{}],27:[function(require,module,exports){
var radarchart = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#RadarChart',
        // Set these when you need to CSS style components independently.
        'id': 'RadarChart',
        'class': 'RadarChart',
        'resizable': true,
        // Our data...
        'csv': {
            // Give folks without data something to look at anyhow.
            'header': ["Salesman", "Q1", "Q2", "Q3", "Q4"],
            'data': [
                ["Bob", Math.random(), Math.random(), Math.random(), Math.random()],
                ["Sue", Math.random(), Math.random(), Math.random(), Math.random()],
                ["Joe", Math.random(), Math.random(), Math.random(), Math.random()],
                ["Peg", Math.random(), Math.random(), Math.random(), Math.random()],
                ["Pat", Math.random(), Math.random(), Math.random(), Math.random()],
                ["Jim", Math.random(), Math.random(), Math.random(), Math.random()],
                ["Tim", Math.random(), Math.random(), Math.random(), Math.random()],
                ["Sam", Math.random(), Math.random(), Math.random(), Math.random()]
            ]
        },
        'width': "100%",
        'height': "100%",
        'transform': "",
        'margin': {top: 20, right: 20, bottom: 20, left: 20},
        'wrapWidth': 60,
        'levels': 5,
        'maxValue': 0,
        'labelFactor': 1.25,
        'dotRadius': 4,
        'opacityCircles': 0.1,
        'strokeWidth': 2,
        'roundStrokes': false,
        'color': d3.scale.category10(),
        'title': dex.config.text(),
        'label': dex.config.text(),
        'opacityArea': 0.35,
        'radar.circle': dex.config.circle({
            'opacity': 0.1,
            'fill' : {
                'fillColor': '#CDCDCD',
                'fillOpacity' :.2
            },
            'stroke': {
                'width': 1,
                'color': 'black',
                'opacity': .1,
                'dasharray': "0"
            },
            'events': {
                'mouseover': function () {
                    d3.select(this)
                        .style("stroke", 'red')
                        .style("stroke-width", 2);
                },
                'mouseout': function () {
                    d3.select(this)
                        .style("stroke", chart.config.radar.circle.stroke.color)
                        .style("stroke-width", chart.config.radar.circle.stroke.width);
                }
            }
        })
    };

    var chart = new dex.component(userConfig, defaults);

    chart.render = function render() {
        window.onresize = this.resize;
        chart.resize();
    };

    chart.resize = function resize() {
        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height).update();
        }
        else {
            chart.update();
        }
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        d3.selectAll("#" + config.id).remove();

        data = csv.data.map(function (row) {
            return {
                'key': row[0],
                'values': row.slice(1).map(function (d, i) {
                    return {
                        'axis': csv.header[i + 1],
                        'value': +d
                    }
                })
            }
        });

        console.dir(data);

        data = data.map(function (d) {
            return d.values
        })

        console.dir(data);

        var extents = dex.matrix.extent(csv.data, dex.range(1, csv.header.length-1));

        //If the supplied maxValue is smaller than the actual one, replace by the max in the data
        var maxValue = extents[1];

        var allAxis = (data[0].map(function (i, j) {
                return i.axis
            })),	//Names of each axis
            total = allAxis.length,					//The number of different axes
            radius = Math.min(
                (config.width - config.margin.left - config.margin.right) / 2,
                (config.height - config.margin.top - config.margin.bottom) / 2),

            //Format = d3.format('%'),			 	//Percentage formatting
            angleSlice = Math.PI * 2 / total;			//The width in radians of each "slice"

        //Scale for the radius
        var rScale = d3.scale.linear()
            .range([0, radius])
            .domain([0, maxValue]);

        /////////////////////////////////////////////////////////
        //////////// Create the container SVG and g /////////////
        /////////////////////////////////////////////////////////

        //Initiate the radar chart SVG
        var chartContainer = d3.select(config.parent).append("g")
            .attr("id", config["id"])
            .attr("class", config["class"])
            //.attr("width", config.width)
            //.attr("height", config.height)
            .attr("transform", config.transform +
            "translate(" + config.width / 2 + " " + config.height / 2 + ")");

        /////////////////////////////////////////////////////////
        ////////// Glow filter for some extra pizzazz ///////////
        /////////////////////////////////////////////////////////

        //Filter for the outside glow
        var filter = chartContainer.append('defs').append('filter').attr('id', 'glow'),
            feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
            feMerge = filter.append('feMerge'),
            feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
            feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        /////////////////////////////////////////////////////////
        /////////////// Draw the Circular grid //////////////////
        /////////////////////////////////////////////////////////

        //Wrapper for the grid & axes
        var axisGrid = chartContainer.append("g").attr("class", "axisWrapper");

        //Draw the background circles, broken in WebView
        axisGrid.selectAll(".levels")
            .data(d3.range(1, (config.levels + 1)).reverse())
            .enter()
            .append("circle")
            .attr("class", "gridCircle")
            // TODO: This breaks webview.
            //.style("filter", "url(#glow)")
            .call(dex.config.configureCircle, config.radar.circle)
            .attr("r", function (d, i) {
                return radius / config.levels * d;
            });

        //Text indicating at what % each level is

        axisGrid.selectAll(".axisLabel")
            .data(d3.range(1, (config.levels + 1)).reverse())
            .enter().append("text")
            .attr("class", "axisLabel")
            .attr("x", 4)
            .attr("y", function (d) {
                return -d * radius / config.levels;
            })
            .attr("dy", "0.4em")
            .style("font-size", "10px")
            .attr("fill", "#737373")
            .text(function (d, i) {
                return maxValue * d / config.levels;
                //Format(maxValue * d / config.levels);
            });

        /////////////////////////////////////////////////////////
        //////////////////// Draw the axes //////////////////////
        /////////////////////////////////////////////////////////

        //Create the straight lines radiating outward from the center
        var axis = axisGrid.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");
        //Append the lines
        axis.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", function (d, i) {
                return rScale(maxValue * 1.1) * Math.cos(angleSlice * i);
            })
            .attr("y2", function (d, i) {
                return rScale(maxValue * 1.1) * Math.sin(angleSlice * i);
            })
            .attr("class", "line")
            .style("stroke", "white")
            .style("stroke-width", "2px");

        //Append the labels at each axis
        axis.append("text")
            .attr("class", "legend")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("x", function (d, i) {
                return rScale(maxValue * config.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2);
            })
            .attr("y", function (d, i) {
                return rScale(maxValue * config.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2);
            })
            .text(function (d) {
                return d
            })
            .call(wrap, config.wrapWidth);

        /////////////////////////////////////////////////////////
        ///////////// Draw the radar chart blobs ////////////////
        /////////////////////////////////////////////////////////

        //The radial line function
        var radarLine = d3.svg.line.radial()
            .interpolate("linear-closed")
            .radius(function (d) {
                return rScale(d.value);
            })
            .angle(function (d, i) {
                return i * angleSlice;
            });

        if (config.roundStrokes) {
            radarLine.interpolate("cardinal-closed");
        }

        //Create a wrapper for the blobs
        var blobWrapper = chartContainer.selectAll(".radarWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarWrapper");

        //Append the backgrounds
        blobWrapper
            .append("path")
            .attr("class", "radarArea")
            .attr("d", function (d, i) {
                return radarLine(d);
            })
            .style("fill", function (d, i) {
                return config.color(i);
            })
            .style("fill-opacity", config.opacityArea)
            .on('mouseover', function (d, i) {
                //Dim all blobs
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", 0.1);
                //Bring back the hovered over blob
                d3.select(this)
                    .transition().duration(200)
                    .style("fill-opacity", 0.7);
            })
            .on('mouseout', function () {
                //Bring back all blobs
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", config.opacityArea);
            });

        //Create the outlines
        blobWrapper.append("path")
            .attr("class", "radarStroke")
            .attr("d", function (d, i) {
                return radarLine(d);
            })
            .style("stroke-width", config.strokeWidth + "px")
            .style("stroke", function (d, i) {
                return config.color(i);
            })
            .style("fill", "none")
            .style("filter", "url(#glow)");

        //Append the circles
        blobWrapper.selectAll(".radarCircle")
            .data(function (d, i) {
                return d;
            })
            .enter().append("circle")
            .attr("class", "radarCircle")
            .attr("r", config.dotRadius)
            .attr("cx", function (d, i) {
                return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
            })
            .attr("cy", function (d, i) {
                return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
            })
            .style("fill", function (d, i, j) {
                return config.color(j);
            })
            .style("fill-opacity", 0.8);

        /////////////////////////////////////////////////////////
        //////// Append invisible circles for tooltip ///////////
        /////////////////////////////////////////////////////////

        //Wrapper for the invisible circles on top
        var blobCircleWrapper = chartContainer.selectAll(".radarCircleWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarCircleWrapper");

        //Append a set of invisible circles on top for the mouseover pop-up
        blobCircleWrapper.selectAll(".radarInvisibleCircle")
            .data(function (d, i) {
                return d;
            })
            .enter().append("circle")
            .attr("class", "radarInvisibleCircle")
            .attr("r", config.dotRadius * 1.5)
            .attr("cx", function (d, i) {
                return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
            })
            .attr("cy", function (d, i) {
                return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
            })
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function (d, i) {
                newX = parseFloat(d3.select(this).attr('cx')) - 10;
                newY = parseFloat(d3.select(this).attr('cy')) - 10;

                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(Format(d.value))
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });

        //Set up the small tooltip for when you hover over a circle
        var tooltip = chartContainer.append("text")
            .attr("class", "tooltip")
            .style("opacity", 0);

        /////////////////////////////////////////////////////////
        /////////////////// Helper Function /////////////////////
        /////////////////////////////////////////////////////////

        //Taken from http://bl.ocks.org/mbostock/7555321
        //Wraps SVG text
        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.4, // ems
                    y = text.attr("y"),
                    x = text.attr("x"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }
                }
            });
        }//wrap
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
};

module.exports = radarchart;

},{}],28:[function(require,module,exports){
var radialtree = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent'       : '#RadialTree',
    // Set these when you need to CSS style components independently.
    'id'           : 'RadialTree',
    'class'        : 'RadialTree',
    'resizable'   : true,
    // Our data...
    'csv'          : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'width'        : "100%",
    'height'       : "100%",
    'transform'    : "translate(0 0)",
    'title'        : dex.config.text(),
    'label'        : dex.config.text(
      {
        'font' : dex.config.font({
          'family': 'sans-serif',
          'size': 10,
        })
      }
    ),
    'connectionLength' : 80
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll("#" + config.id).remove();

    var data = dex.csv.toNestedJson(dex.csv.copy(csv));
    dex.console.log("DATA", csv, data);

    var diameter = Math.min(config.height, config.width);

    var margin = {top: 20, right: 60, bottom: 20, left: 60},
      width = diameter,
      height = diameter;

    var i = 0,
      duration = 350,
      root;

    var tree = d3.layout.tree()
      .size([360, diameter / 2 - 80])
      .separation(function(a, b) { return (a.parent == b.parent ? 1 : 10) / a.depth; });

    var diagonal = d3.svg.diagonal.radial()
      .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

    var chartContainer = d3.select(config.parent).append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    root = data;
    root.x0 = height / 2;
    root.y0 = 0;

    //root.children.forEach(collapse); // start with all children collapsed
    update(root);

    //d3.select(self.frameElement).style("height", "800px");

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root),
        links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * config.connectionLength; });

      // Update the nodes…
      var node = chartContainer.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
        .on("click", click);

      nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("text")
        .attr("x", 10)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        //.attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length * 8.5)  + ")"; })
        .text(function(d) { return d.name; })
        .call(dex.config.configureText, config.label);
        //.style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

      nodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeUpdate.select("text")
        .style("fill-opacity", 1)
        .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length + 50)  + ")"; });

      // TODO: appropriate transform
      var nodeExit = node.exit().transition()
        .duration(duration)
        //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
        .remove();

      nodeExit.select("circle")
        .attr("r", 1e-6);

      nodeExit.select("text")
        .style("fill-opacity", 1e-6);

      // Update the links…
      var link = chartContainer.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });

      // Transition links to their new position.
      link.transition()
        .duration(duration)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }

      update(d);
    }

    // Collapse nodes
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = radialtree;


},{}],29:[function(require,module,exports){
var sankey = function (userConfig) {
    var defaultColor = d3.scale.category20c();

    var defaults =
    {
        // The parent container of this chart.
        'parent': null,
        // Set these when you need to CSS style components independently.
        'id': 'Sankey',
        'class': 'Sankey',
        // Our data...
        'csv': {
            // Give folks without data something to look at anyhow.
            'header': ["X", "Y", "WEIGHT"],
            'data': [
                ["A1", "A2", 1],
                ["B1", "B2", 2],
                ["C1", "C2", 2],
                ["C2", "C3", 4]
            ]
        },
        'relationships': null,
        // width and height of our bar chart.
        'width': "100%",
        'height': "100%",
        // The x an y indexes to chart.
        "transform": "translate(5,0) scale(.95)",
        'layoutIterations': 32,
        'columnTitle': dex.config.text({
                'fill.fillColor': 'black',
                'x': function (d) {
                    var center = window.innerWidth / 2;
                    //var center = (typeof userConfig.width !== 'undefined' ?
                    //  userConfig.width : defaults.width) / 2;

                    var nodeWidth = (userConfig.mouseout && userConfig.mouseout.node &&
                    userConfig.mouseout.node.rectangle && userConfig.mouseout.node.rectangle.width) ?
                        userConfig.mouseout.node.rectangle.width : defaults.mouseout.node.rectangle.width;

                    var nodePadding = (userConfig.mouseout && userConfig.mouseout.node &&
                    userConfig.mouseout.node.padding) ?
                        userConfig.mouseout.node.padding : defaults.mouseout.node.padding;

                    //dex.console.log("d.x=" + d.x + ", width=" + window.innerWidth + ", nodeWidth=" + nodeWidth +
                    //  ", nodePadding=" + nodePadding + ", center=" + center);
                    if (+d > center) {
                        //return +d-nodePadding-nodeWidth;
                        return +d + nodeWidth / 2;
                    }
                    else {
                        //return +d + nodeWidth + nodePadding;
                        return +d + nodeWidth / 2;
                    }
                },
                "y": 10,
                "writingMode": "tb",
                "glyphOrientationVertical": 0,
                "anchor": function (d, i) {
                    //var center = (typeof userConfig.width !== 'undefined' ?
                    // userConfig.width : defaults.width) / 2;
                    var center = window.innerWidth / 2;

                    if (+d > center) {
                        // End if horizontal
                        return "start";
                    }
                    else {
                        return "start";
                    }
                },
                "text": function (d, i) {
                    return d + ", i" + i;
                }
            }
        ),
        'label': dex.config.text({
            'fill.fillColor': 'black',
            'x': function (d) {
                var center = window.innerWidth / 2;
                //var center = (typeof userConfig.width !== 'undefined' ?
                //  userConfig.width : defaults.width) / 2;

                var nodeWidth = (userConfig.mouseout && userConfig.mouseout.node &&
                userConfig.mouseout.node.rectangle &&
                userConfig.mouseout.node.rectangle.width) ?
                    userConfig.mouseout.node.rectangle.width : defaults.mouseout.node.rectangle.width;

                var nodePadding = (userConfig.mouseout && userConfig.mouseout.node &&
                userConfig.mouseout.node.padding) ?
                    userConfig.mouseout.node.padding : defaults.mouseout.node.padding;

                //dex.console.log("d.x=" + d.x + ", width=" + window.innerWidth + ", nodeWidth=" + nodeWidth +
                //  ", nodePadding=" + nodePadding + ", center=" + center);
                if (d.x > center) {
                    return -nodePadding;
                }
                else {
                    return nodeWidth + nodePadding;
                }
            },
            'y': function (d) {
                return d.dy / 2;
            },
            'transform': null,
            'dy': '.35em',
            'anchor': function (d, i) {
                //var center = (typeof userConfig.width !== 'undefined' ?
                // userConfig.width : defaults.width) / 2;
                var center = window.innerWidth / 2;

                if (d.x > center) {
                    return "end";
                }
                else {
                    return "start";
                }
            },
            'font': {
                'size': 14
            },
            'color': "black",
            'opacity': 1,
            'text': function (d) {
                return d.name;
            }
        }),
        //'columnLayout' : function(node, nodeMap) { return nodeMap[node.name].column },
        'mouseout': {
            'link': {
                'stroke': dex.config.stroke({
                    'opacity': .2,
                    'color': function (d) {
                        return defaultColor(d.category);
                    },
                    'width': function (d) {
                        //return 0;
                        return Math.max(1, d.dy);
                    }
                }),
                'fill' : dex.config.fill({
                    'fillColor': 'none',
                    'fillOpacity': .4
                }),
                'curvature': 0.5
            },
            'node': {
                'padding': 4,
                'rectangle': dex.config.rectangle(
                    {
                        'width': 32,
                        'color': function (d) {
                            return defaultColor(d.name.replace(/ .*/, ""));
                        },
                        'height': function (d) {
                            return d.dy;
                        },
                        'stroke': dex.config.stroke({
                            'color': function (d) {
                                return d3.rgb(d.color).darker(2);
                            }
                        })
                    })
            }
        },
        'mouseover': {
            'link': {
                'stroke': dex.config.stroke({
                    'opacity': .8,
                    'width': function (d) {
                        return Math.max(1, d.dy);
                    },
                    'color': function (d) {
                        return defaultColor(d.category);
                    }
                }),
                'fill' : dex.config.fill({
                    'fillColor': 'none',
                    'fillOpacity': .8
                }),
            },
            'node': {
                'stroke': dex.config.stroke({
                    'opacity': .8,
                    'width': function (d) {
                        return Math.max(1, d.dy);
                    },
                    'color': function (d) {
                        return defaultColor(d.category);
                    }
                }),
                'fill' : dex.config.fill({
                    'fillColor': 'none',
                    'fillOpacity': .8
                })
            }
        },
        'node': {
            'padding': 4,
            'rectangle': dex.config.rectangle(
                {
                    'width': 32,
                    'color': function (d) {
                        return defaultColor(d.name.replace(/ .*/, ""));
                    },
                    'height': function (d) {
                        return d.dy;
                    },
                    'stroke': dex.config.stroke({
                        'color': function (d) {
                            return d3.rgb(d.color).darker(2);
                        }
                    })
                })
        },
        "manualColumnLayout": false
    };

    //dex.console.log("USER-CONFIG", userConfig, "DEFAULTS:", defaults);
    var config = dex.object.overlay(dex.config.expand(userConfig), dex.config.expand(defaults));

    // If we do not have specifically defined relationship fields, then lets
    // try to make an educated guess about what to do with them.  If the last
    // column is numeric, we will assume that this is to be used as a weight.
    // Otherwise, we will use a uniform weighting of 1 for each link.
    if (!config.relationships) {
        // If we have less than 3 columns or the last column does not contain
        // numerics then we will create a set of relationships for each column
        // with a standard weight of 1 and a single category of 1.
        if (config.csv.header.length < 3 || !dex.csv.isColumnNumeric(config.csv, config.csv.header.length - 1)) {
            config.relationships = [];

            for (i = 1; i < config.csv.header.length; i++) {
                config.relationships.push(
                    {
                        'source': i - 1,
                        'target': i,
                        'value': function (csv, ri) {
                            return 1;
                        },
                        'category': function (csv, ri) {
                            return 1;
                        },
                        'column': function (csv, ri, ci) {
                            return i;
                        }
                    });
            }
        }
        // If we fall through here, then the last column is numeric.  We will
        // use this for our weight.
        else {
            config.relationships = [];

            for (i = 1; i < config.csv.header.length - 1; i++) {
                config.relationships.push(
                    {
                        'source': i - 1,
                        'target': i,
                        'value': function (csv, ri) {
                            return csv.data[ri][csv.header.length - 1];
                        },
                        'category': function (csv, ri) {
                            return 1;
                        },
                        'column': function (csv, ri, ci) {
                            return i;
                        }
                    });
            }
        }
    }

    var chart = new dex.component(userConfig, config);

    // TODO: Figure out how I want to do this.  Partial implementation.
    chart.renderGui = function () {
        dex.console.log("SETTINGS", d3.select("#settings").select("#" + chart.config.id).selectAll("#setting"));
        d3.select("#settings").select("#" + chart.config.id).selectAll("#setting").each(function (d) {
            dex.console.log("SETTING", d);
        });
    };

    chart.render = function () {
        window.onresize = this.resize;
        this.update();
    };

    chart.resize = function () {
        var width = window.innerWidth;
        var height = window.innerHeight;

        //dex.console.log(config.id + " RESIZING: " + width + "x" + height);
        d3.selectAll("#" + config.id).remove();

        chart.attr("width", width)
            .attr("height", height)
            .update();
    };

    chart.update = function () {
        var config = chart.config;
        //dex.console.log("UPDATING CHART....");
        //dex.console.log("-- WIDTH : " + config.width);
        //dex.console.log("-- HEIGHT: " + config.height);
        var width = d3.select(config.parent).property("clientWidth");
        var height = d3.select(config.parent).property("clientHeight");

        d3.selectAll("#" + config.id).remove();

        var chartContainer = d3.select(config.parent).append("g")
            .attr("class", config["id"])
            .attr("id", config["id"])
            .attr("width", config.width)
            .attr("height", config.height)
            .attr("transform", config.transform);

        var sankeyData = [];

        var nodeMap = {};

        for (ri = 0; ri < config.relationships.length; ri++) {
            for (i = 0; i < config.csv.data.length; i++) {
                var relation = [];
                var source;
                var target;

                if (dex.object.isFunction(config.relationships[ri].source)) {
                    source = config.relationships[ri].source(config.csv, i);
                }
                else {
                    source =
                    {
                        'nodeName': config.csv.data[i][config.relationships[ri].source],
                        'name': config.csv.data[i][config.relationships[ri].source],
                        'column': (config.relationships[ri].column) ?
                            config.relationships[ri].column(csv, i, config.relationships[ri].source) :
                            config.relationships[ri].source
                    };
                }

                if (dex.object.isFunction(config.relationships[ri].target)) {
                    target = config.relationships[ri].target(config.csv, i);
                }
                else {
                    target =
                    {
                        'nodeName': config.csv.data[i][config.relationships[ri].target],
                        'name': config.csv.data[i][config.relationships[ri].target],
                        'column': (config.relationships[ri].column) ?
                            config.relationships[ri].column(csv, i, config.relationships[ri].target) :
                            config.relationships[ri].target
                    }
                }

                relation.source = source.nodeName;
                relation.target = target.nodeName;

                // Store this to translate nodenames back to display names.
                nodeMap[source.nodeName] = source;
                nodeMap[target.nodeName] = target;

                // Wrap source and target info:
                //dex.console.log("RELATION", config.relationships[ri]);
                if (typeof config.relationships[ri].category === "undefined") {
                    //relation.category = csv.data[i][config.relationships[ri].source];
                    relation.category = 1;
                }
                else if (dex.object.isFunction(config.relationships[ri].category)) {
                    relation.category = config.relationships[ri].category(config.csv, i);
                }
                else {
                    relation.category = config.relationships[ri].category;
                }

                relation.linkid = "L" + i;

                if (typeof config.relationships[ri].value === "undefined") {
                    relation.value = 1;
                }
                else if (dex.object.isFunction(config.relationships[ri].value)) {
                    relation.value = config.relationships[ri].value(config.csv, i);
                }
                else {
                    relation.value = config.relationships[ri].value;
                }

                sankeyData.push(relation);
            }
        }
        //dex.console.log("sankeyData", sankeyData);
        var units = "Units";

        var formatNumber = d3.format(",.0f"),    // zero decimal places
            format = function (d) {
                return formatNumber(d) + " " + units;
            };

        chartContainer.onresize = chart.resize;

        function manualColumnLayout(nodes, nodeWidth, size) {
            var numSinks = 1;

            nodes.forEach(function (node) {
                //node.x = (nodeMap[node.name].column) * nodeWidth;
                node.x = (nodeMap[node.name].column - 1) * nodeWidth;
                numSinks = Math.max(numSinks, node.x);
                node.dx = nodeWidth;
            });

            var nodeBreadth = (size[0] - nodeWidth) / (numSinks - 1);
            nodes.forEach(function (node) {
                node.x *= nodeBreadth;
            });
        }

        // Set the sankey diagram properties
        var sankey = d3.sankey()
            .nodeWidth(config.mouseout.node.rectangle.width)
            .nodePadding(config.mouseout.node.padding)
            .size([width - config.mouseout.node.padding, height - config.mouseout.node.padding]);

        if (config.manualColumnLayout) {
            sankey.columnLayout(manualColumnLayout);
        }

        var path = sankey.link();

        //set up graph in same style as original example but empty
        graph = {"nodes": [], "links": []};

        sankeyData.forEach(function (d, i) {
            graph.nodes.push({"name": d.source});
            graph.nodes.push({"name": d.target});
            graph.links.push({
                "source": d.source, "target": d.target, "value": +d.value,
                "category": d.category, "linkid": d.linkid
            });
        });

        //dex.console.log("GRAPH NODES 1", graph.nodes);

        //thanks Mike Bostock https://groups.google.com/d/msg/d3-js/pl297cFtIQk/Eso4q_eBu1IJ
        //this handy little function returns only the distinct / unique nodes
        graph.nodes = d3.keys(d3.nest()
            .key(function (d) {
                return d.name;
            })
            .map(graph.nodes));

        //dex.console.log("GRAPH NODES 2", graph.nodes);

        // it appears d3 with force layout wants a numeric source and target
        // so loop through each link replacing the text with its index from node
        graph.links.forEach(function (d, i) {
            graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
            graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
        });

        //now loop through each nodes to make nodes an array of objects rather than an array of strings
        graph.nodes.forEach(function (d, i) {
            graph.nodes[i] = {"name": d};
        });

        sankey
            .nodes(graph.nodes)
            .links(graph.links)
            .curvature(config.mouseout.link.curvature)
            .layout(config.layoutIterations);

        // add in the links
        var link = chartContainer.append("g").selectAll(".link")
            .data(graph.links)
            .enter().append("path")
            .attr("class", "link")
            .attr("id", function (d) {
                return d.linkid;
            })
            .attr("d", path)
            .call(dex.config.configureLink, config.mouseout.link)
            .sort(function (a, b) {
                return b.dy - a.dy;
            })
            .on("mouseover", function (d) {
                d3.selectAll("#" + d.linkid)//.style("stroke-opacity", 1)
                    .call(dex.config.configureLink, config.mouseover.link);
            })
            .on("mouseout", function (d) {
                d3.selectAll("#" + d.linkid)//.style("stroke-opacity", config.link.stroke.opacity);
                    .call(dex.config.configureLink, config.mouseout.link);
            });

        // add the link titles
        link.append("tooltip-content")
            .text(function (d) {
                return nodeMap[d.source.name].name + " -> " +
                    nodeMap[d.target.name].name + "\n" + format(d.value);
            });

        // add in the nodes
        var node = chartContainer.append("g").selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .call(d3.behavior.drag()
                .origin(function (d) {
                    return d;
                })
                .on("dragstart", function () {
                    this.parentNode.appendChild(this);
                })
                .on("drag", dragmove));

        // add the rectangles for the nodes
        node.append("rect")
            .call(dex.config.configureRectangle, config.mouseout.node.rectangle)
            .on("mouseover", function (d) {
                var links = (d.sourceLinks.length > 0) ?
                    d.sourceLinks : d.targetLinks;

                links.forEach(function (link) {
                    d3.selectAll("#" + link.linkid)
                        .call(dex.config.configureLink, config.mouseover.node);
                });
            })
            .on("mouseout", function (d) {

                var links = (d.sourceLinks.length > 0) ?
                    d.sourceLinks : d.targetLinks;
                links.forEach(function (link) {
                    d3.selectAll("#" + link.linkid)
                        .call(dex.config.configureLink, config.mouseout.link);
                });
            })
            .append("title")
            .text(function (d) {
                return nodeMap[d.name].name + "\n" + format(d.value);
            });

        config.label.text = function (d) {
            return nodeMap[d.name].name;
        };

        /////////// A HACK TO ADD TITLE LABELS
        var locations = {};
        var rects = d3.selectAll("rect").each(function (rect) {
            locations[rect.x] = true;
        });

        var orderedLocations = dex.object.keys(locations).sort(function (a, b) {
            return a - b;
        });

        //var locationWidth = (orderedLocations[1] - orderedLocations[0]) / 2;

        //orderedLocations = orderedLocations.map(function(d) { return +d + locationWidth});

        var titles = chartContainer.append("g").selectAll("text")
            .data(orderedLocations)
            .enter()
            .append("text")
            .call(dex.config.configureText, config.columnTitle)
            .text(function (d, i) {
                return csv.header[i];
            });

        //////////// END OF HACK

        // add in the title for the nodes
        node.append("text")
            .call(dex.config.configureText, config.label);

        // the function for moving the nodes
        function dragmove(d) {
            d3.select(this).attr("transform",
                "translate(" + (
                    d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
                ) + "," + (
                    d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                ) + ")");
            sankey.relayout();
            link.attr("d", path);
        }
    };

    return chart;
}

// SANKEY.JS : from Mike Bostock
d3.sankey = function () {
    var sankey = {},
        nodeWidth = 24,
        nodePadding = 8,
        columnLayout = defaultColumnLayout,
        curvature = .5,
        size = [1, 1],
        nodes = [],
        links = [];

    sankey.columnLayout = function (_) {
        if (!arguments.length) return columnLayout;
        columnLayout = _;
        return sankey;
    };

    sankey.curvature = function (_) {
        if (!arguments.length) return curvature;
        curvature = +_;
        return sankey;
    };

    sankey.nodeWidth = function (_) {
        if (!arguments.length) return nodeWidth;
        nodeWidth = +_;
        return sankey;
    };

    sankey.nodePadding = function (_) {
        if (!arguments.length) return nodePadding;
        nodePadding = +_;
        return sankey;
    };

    sankey.nodes = function (_) {
        if (!arguments.length) return nodes;
        nodes = _;
        return sankey;
    };

    sankey.links = function (_) {
        if (!arguments.length) return links;
        links = _;
        return sankey;
    };

    sankey.size = function (_) {
        if (!arguments.length) return size;
        size = _;
        return sankey;
    };

    sankey.layout = function (iterations) {
        computeNodeLinks();
        computeNodeValues();
        computeNodeBreadths(nodes);
        computeNodeDepths(iterations);
        computeLinkDepths();
        return sankey;
    };

    sankey.relayout = function () {
        computeLinkDepths();
        return sankey;
    };

    sankey.link = function () {
//    var curvature = .5;

        function link(d) {
            var x0 = d.source.x + d.source.dx,
                x1 = d.target.x,
                xi = d3.interpolateNumber(x0, x1),
                x2 = xi(curvature),
                x3 = xi(1 - curvature),
                y0 = d.source.y + d.sy + d.dy / 2,
                y1 = d.target.y + d.ty + d.dy / 2;
            return "M" + x0 + "," + y0
                + "C" + x2 + "," + y0
                + " " + x3 + "," + y1
                + " " + x1 + "," + y1;
        }

        link.curvature = function (_) {
            if (!arguments.length) return curvature;
            curvature = +_;
            return link;
        };

        return link;
    };

    // Populate the sourceLinks and targetLinks for each node.
    // Also, if the source and target are not objects, assume they are indices.
    function computeNodeLinks() {
        nodes.forEach(function (node) {
            node.sourceLinks = [];
            node.targetLinks = [];
        });
        links.forEach(function (link) {
            var source = link.source,
                target = link.target;
            if (typeof source === "number") source = link.source = nodes[link.source];
            if (typeof target === "number") target = link.target = nodes[link.target];
            source.sourceLinks.push(link);
            target.targetLinks.push(link);
        });
    }

    // Compute the value (size) of each node by summing the associated links.
    function computeNodeValues() {
        nodes.forEach(function (node) {
            node.value = Math.max(
                d3.sum(node.sourceLinks, value),
                d3.sum(node.targetLinks, value)
            );
        });
    }

    // Iteratively assign the breadth (x-position) for each node.
    // Nodes are assigned the maximum breadth of incoming neighbors plus one;
    // nodes with no incoming links are assigned breadth zero, while
    // nodes with no outgoing links are assigned the maximum breadth.
    function computeNodeBreadths() {
        columnLayout(nodes, nodeWidth, size);
    }

    function defaultColumnLayout(nodes, nodeWidth, size) {
        var remainingNodes = nodes,
            visited = {},
            x = 0;

        //dex.console.log("NODE", nodes[0]);
        while (remainingNodes.length) {
            nextNodes = [];
            visited[remainingNodes[0].name] = true;
            remainingNodes.forEach(function (node) {
                node.x = x;
                node.dx = nodeWidth;
                node.sourceLinks.forEach(function (link) {
                    if (!visited[link.target.name]) {
                        nextNodes.push(link.target);
                    }
                    else {
                        dex.console.log("CYCLE DETECTED AT: " + node.name + "->" + link.target.name);
                    }
                });
            });
            remainingNodes = nextNodes;
            ++x;
        }

        moveSinksRight(x);
        scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
    }

    function moveSourcesRight() {
        nodes.forEach(function (node) {
            if (!node.targetLinks.length) {
                node.x = d3.min(node.sourceLinks, function (d) {
                        return d.target.x;
                    }) - 1;
            }
        });
    }

    function moveSinksRight(x) {
        nodes.forEach(function (node) {
            if (!node.sourceLinks.length) {
                node.x = x - 1;
            }
        });
    }

    function scaleNodeBreadths(kx) {
        nodes.forEach(function (node) {
            node.x *= kx;
        });
    }

    function computeNodeDepths(iterations) {
        var nodesByBreadth = d3.nest()
            .key(function (d) {
                return d.x;
            })
            .sortKeys(d3.ascending)
            .entries(nodes)
            .map(function (d) {
                return d.values;
            });

        //
        initializeNodeDepth();
        resolveCollisions();
        for (var alpha = 1; iterations > 0; --iterations) {
            relaxRightToLeft(alpha *= .99);
            resolveCollisions();
            relaxLeftToRight(alpha);
            resolveCollisions();
        }

        function initializeNodeDepth() {
            var ky = d3.min(nodesByBreadth, function (nodes) {
                return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
            });

            nodesByBreadth.forEach(function (nodes) {
                nodes.forEach(function (node, i) {
                    node.y = i;
                    node.dy = node.value * ky;
                });
            });

            links.forEach(function (link) {
                link.dy = link.value * ky;
            });
        }

        function relaxLeftToRight(alpha) {
            nodesByBreadth.forEach(function (nodes, breadth) {
                nodes.forEach(function (node) {
                    if (node.targetLinks.length) {
                        var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
                        node.y += (y - center(node)) * alpha;
                    }
                });
            });

            function weightedSource(link) {
                return center(link.source) * link.value;
            }
        }

        function relaxRightToLeft(alpha) {
            nodesByBreadth.slice().reverse().forEach(function (nodes) {
                nodes.forEach(function (node) {
                    if (node.sourceLinks.length) {
                        var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
                        node.y += (y - center(node)) * alpha;
                    }
                });
            });

            function weightedTarget(link) {
                return center(link.target) * link.value;
            }
        }

        function resolveCollisions() {
            nodesByBreadth.forEach(function (nodes) {
                var node,
                    dy,
                    y0 = 0,
                    n = nodes.length,
                    i;

                // Push any overlapping nodes down.
                nodes.sort(ascendingDepth);
                for (i = 0; i < n; ++i) {
                    node = nodes[i];
                    dy = y0 - node.y;
                    if (dy > 0) node.y += dy;
                    y0 = node.y + node.dy + nodePadding;
                }

                // If the bottommost node goes outside the bounds, push it back up.
                dy = y0 - nodePadding - size[1];
                if (dy > 0) {
                    y0 = node.y -= dy;

                    // Push any overlapping nodes back up.
                    for (i = n - 2; i >= 0; --i) {
                        node = nodes[i];
                        dy = node.y + node.dy + nodePadding - y0;
                        if (dy > 0) node.y -= dy;
                        y0 = node.y;
                    }
                }
            });
        }

        function ascendingDepth(a, b) {
            return a.y - b.y;
        }
    }

    function computeLinkDepths() {
        nodes.forEach(function (node) {
            node.sourceLinks.sort(ascendingTargetDepth);
            node.targetLinks.sort(ascendingSourceDepth);
        });
        nodes.forEach(function (node) {
            var sy = 0, ty = 0;
            node.sourceLinks.forEach(function (link) {
                link.sy = sy;
                sy += link.dy;
            });
            node.targetLinks.forEach(function (link) {
                link.ty = ty;
                ty += link.dy;
            });
        });

        function ascendingSourceDepth(a, b) {
            return a.source.y - b.source.y;
        }

        function ascendingTargetDepth(a, b) {
            return a.target.y - b.target.y;
        }
    }

    function center(node) {
        return node.y + node.dy / 2;
    }

    function value(link) {
        return link.value;
    }

    $(document).ready(function () {
        // Add tooltips
        $(document).tooltip({
            items: "path",
            content: function () {
                return $(this).find("tooltip-content").text();
            },
            track: true
        });

        // Make the entire chart draggable.
        //$(sankey.config.parent).draggable();
    });

    return sankey;
};

module.exports = sankey;
},{}],30:[function(require,module,exports){
var sankeyparticles = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent': '#SankeyParticles',
    // Set these when you need to CSS style components independently.
    'id': 'SankeyParticles',
    'class': 'SankeyParticles',
    'resizable': true,
    // Our data...
    'csv': {
      // Give folks without data something to look at anyhow.
      'header': ["X", "Y", "Z"],
      'data': [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'width': "100%",
    'height': "100%",
    'margin' : { 'top' : 2, 'bottom' : 10, 'left' : 2, 'right' : 10 },
    'transform': "translate(0 0)",
    'title': dex.config.text(),
    'label': dex.config.text()
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  d3.sankey = function () {
    var sankey = {},
      nodeWidth = 24,
      nodePadding = 8,
      size = [1, 1],
      nodes = [],
      links = [];

    sankey.nodeWidth = function (_) {
      if (!arguments.length) return nodeWidth;
      nodeWidth = +_;
      return sankey;
    };

    sankey.nodePadding = function (_) {
      if (!arguments.length) return nodePadding;
      nodePadding = +_;
      return sankey;
    };

    sankey.nodes = function (_) {
      if (!arguments.length) return nodes;
      nodes = _;
      return sankey;
    };

    sankey.links = function (_) {
      if (!arguments.length) return links;
      links = _;
      return sankey;
    };

    sankey.size = function (_) {
      if (!arguments.length) return size;
      size = _;
      return sankey;
    };

    sankey.layout = function (iterations) {
      computeNodeLinks();
      computeNodeValues();
      computeNodeBreadths();
      computeNodeDepths(iterations);
      computeLinkDepths();
      return sankey;
    };

    sankey.relayout = function () {
      computeLinkDepths();
      return sankey;
    };

    sankey.link = function () {
      var curvature = .5;

      function link(d) {
        var x0 = d.source.x + d.source.dx,
          x1 = d.target.x,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.sy + d.dy / 2,
          y1 = d.target.y + d.ty + d.dy / 2;
        return "M" + x0 + "," + y0
          + "C" + x2 + "," + y0
          + " " + x3 + "," + y1
          + " " + x1 + "," + y1;
      }

      link.curvature = function (_) {
        if (!arguments.length) return curvature;
        curvature = +_;
        return link;
      };

      return link;
    };

    // Populate the sourceLinks and targetLinks for each node.
    // Also, if the source and target are not objects, assume they are indices.
    function computeNodeLinks() {
      nodes.forEach(function (node) {
        node.sourceLinks = [];
        node.targetLinks = [];
      });
      links.forEach(function (link) {
        var source = link.source,
          target = link.target;
        if (typeof source === "number") source = link.source = nodes[link.source];
        if (typeof target === "number") target = link.target = nodes[link.target];
        source.sourceLinks.push(link);
        target.targetLinks.push(link);
      });
    }

    // Compute the value (size) of each node by summing the associated links.
    function computeNodeValues() {
      nodes.forEach(function (node) {
        node.value = Math.max(
          d3.sum(node.sourceLinks, value),
          d3.sum(node.targetLinks, value)
        );
      });
    }

    // Iteratively assign the breadth (x-position) for each node.
    // Nodes are assigned the maximum breadth of incoming neighbors plus one;
    // nodes with no incoming links are assigned breadth zero, while
    // nodes with no outgoing links are assigned the maximum breadth.
    function computeNodeBreadths() {
      var remainingNodes = nodes,
        nextNodes,
        x = 0;

      while (remainingNodes.length) {
        nextNodes = [];
        remainingNodes.forEach(function (node) {
          node.x = x;
          node.dx = nodeWidth;
          node.sourceLinks.forEach(function (link) {
            if (nextNodes.indexOf(link.target) < 0) {
              nextNodes.push(link.target);
            }
          });
        });
        remainingNodes = nextNodes;
        ++x;
      }

      //
      moveSinksRight(x);
      scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
    }

    function moveSourcesRight() {
      nodes.forEach(function (node) {
        if (!node.targetLinks.length) {
          node.x = d3.min(node.sourceLinks, function (d) {
              return d.target.x;
            }) - 1;
        }
      });
    }

    function moveSinksRight(x) {
      nodes.forEach(function (node) {
        if (!node.sourceLinks.length) {
          node.x = x - 1;
        }
      });
    }

    function scaleNodeBreadths(kx) {
      nodes.forEach(function (node) {
        node.x *= kx;
      });
    }

    function computeNodeDepths(iterations) {
      var nodesByBreadth = d3.nest()
        .key(function (d) {
          return d.x;
        })
        .sortKeys(d3.ascending)
        .entries(nodes)
        .map(function (d) {
          return d.values;
        });

      //
      initializeNodeDepth();
      resolveCollisions();
      for (var alpha = 1; iterations > 0; --iterations) {
        relaxRightToLeft(alpha *= .99);
        resolveCollisions();
        relaxLeftToRight(alpha);
        resolveCollisions();
      }

      function initializeNodeDepth() {
        var ky = d3.min(nodesByBreadth, function (nodes) {
          return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
        });

        nodesByBreadth.forEach(function (nodes) {
          nodes.forEach(function (node, i) {
            node.y = i;
            node.dy = node.value * ky;
          });
        });

        links.forEach(function (link) {
          link.dy = link.value * ky;
        });
      }

      function relaxLeftToRight(alpha) {
        nodesByBreadth.forEach(function (nodes, breadth) {
          nodes.forEach(function (node) {
            if (node.targetLinks.length) {
              var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
              node.y += (y - center(node)) * alpha;
            }
          });
        });

        function weightedSource(link) {
          return center(link.source) * link.value;
        }
      }

      function relaxRightToLeft(alpha) {
        nodesByBreadth.slice().reverse().forEach(function (nodes) {
          nodes.forEach(function (node) {
            if (node.sourceLinks.length) {
              var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
              node.y += (y - center(node)) * alpha;
            }
          });
        });

        function weightedTarget(link) {
          return center(link.target) * link.value;
        }
      }

      function resolveCollisions() {
        nodesByBreadth.forEach(function (nodes) {
          var node,
            dy,
            y0 = 0,
            n = nodes.length,
            i;

          // Push any overlapping nodes down.
          nodes.sort(ascendingDepth);
          for (i = 0; i < n; ++i) {
            node = nodes[i];
            dy = y0 - node.y;
            if (dy > 0) node.y += dy;
            y0 = node.y + node.dy + nodePadding;
          }

          // If the bottommost node goes outside the bounds, push it back up.
          dy = y0 - nodePadding - size[1];
          if (dy > 0) {
            y0 = node.y -= dy;

            // Push any overlapping nodes back up.
            for (i = n - 2; i >= 0; --i) {
              node = nodes[i];
              dy = node.y + node.dy + nodePadding - y0;
              if (dy > 0) node.y -= dy;
              y0 = node.y;
            }
          }
        });
      }

      function ascendingDepth(a, b) {
        return a.y - b.y;
      }
    }

    function computeLinkDepths() {
      nodes.forEach(function (node) {
        node.sourceLinks.sort(ascendingTargetDepth);
        node.targetLinks.sort(ascendingSourceDepth);
      });
      nodes.forEach(function (node) {
        var sy = 0, ty = 0;
        node.sourceLinks.forEach(function (link) {
          link.sy = sy;
          sy += link.dy;
        });
        node.targetLinks.forEach(function (link) {
          link.ty = ty;
          ty += link.dy;
        });
      });

      function ascendingSourceDepth(a, b) {
        return a.source.y - b.source.y;
      }

      function ascendingTargetDepth(a, b) {
        return a.target.y - b.target.y;
      }
    }

    function center(node) {
      return node.y + node.dy / 2;
    }

    function value(link) {
      return link.value;
    }

    return sankey;
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll("#" + config.id).remove();

    var data = dex.csv.getGraph(csv);
    dex.console.log("DATA", data);

    var margin = config.margin,
      width = config.width - margin.left - margin.right,
      height = config.height - margin.top - margin.bottom;

    var formatNumber = d3.format(",.0f"),
      format = function (d) {
        return formatNumber(d) + " TWh";
      },
      color = d3.scale.category20();

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    var sankey = d3.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .size([width, height]);

    var path = sankey.link();

    var freqCounter = 1;

    data.links.forEach(function (d) {
      d.o_value = d.value;
      d.value = 1;
    })

    sankey
      .nodes(data.nodes)
      .links(data.links)
      .layout(32);

    var link = chartContainer.append("g").selectAll(".link")
      .data(data.links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function (d) {
        return Math.max(1, d.dy);
      })
      .sort(function (a, b) {
        return b.dy - a.dy;
      });

    link.append("title")
      .text(function (d) {
        return d.source.name + " → " + d.target.name + "\n" + format(d.o_value);
      });

    var node = chartContainer.append("g").selectAll(".node")
      .data(data.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .call(d3.behavior.drag()
        .origin(function (d) {
          return d;
        })
        .on("dragstart", function () {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove));

    node.append("rect")
      .attr("height", function (d) {
        return d.dy;
      })
      .attr("width", sankey.nodeWidth())
      .style("fill", function (d) {
        return d.color = color(d.name.replace(/ .*/, ""));
      })
      .style("stroke", "none")
      .append("title")
      .text(function (d) {
        return d.name + "\n" + format(d.o_value);
      });

    node.append("text")
      .attr("x", -6)
      .attr("y", function (d) {
        return d.dy / 2;
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) {
        return d.name;
      })
      .filter(function (d) {
        return d.x < width / 2;
      })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

    function dragmove(d) {
      d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
      sankey.relayout();
      link.attr("d", path);
    }

    var linkExtent = d3.extent(data.links, function (d) {
      return d.o_value
    });
    var frequencyScale = d3.scale.linear().domain(linkExtent).range([0.05, 1]);
    var particleSize = d3.scale.linear().domain(linkExtent).range([1, 5]);


    data.links.forEach(function (link) {
      link.freq = frequencyScale(link.o_value);
      link.particleSize = 2;
      link.particleColor = d3.scale.linear().domain([0, 1])
        .range([link.source.color, link.target.color]);
    })

    var t = d3.timer(tick, 1000);
    var particles = [];

    function tick(elapsed, time) {

      particles = particles.filter(function (d) {
        return d.current < d.path.getTotalLength()
      });

      d3.selectAll("path.link")
        .each(
          function (d) {
//        if (d.freq < 1) {
            for (var x = 0; x < 2; x++) {
              var offset = (Math.random() - .5) * (d.dy - 4);
              if (Math.random() < d.freq) {
                var length = this.getTotalLength();
                particles.push({
                  link: d,
                  time: elapsed,
                  offset: offset,
                  path: this,
                  length: length,
                  animateTime: length,
                  speed: 0.5 + (Math.random())
                })
              }
            }

//        }
            /*        else {
             for (var x = 0; x<d.freq; x++) {
             var offset = (Math.random() - .5) * d.dy;
             particles.push({link: d, time: elapsed, offset: offset, path: this})
             }
             } */
          });

      particleEdgeCanvasPath(elapsed);
    }

    function particleEdgeCanvasPath(elapsed) {
      var context = d3.select("canvas").node().getContext("2d")

      context.clearRect(0, 0, 1000, 1000);

      context.fillStyle = "gray";
      context.lineWidth = "1px";
      for (var x in particles) {
        var currentTime = elapsed - particles[x].time;
//        var currentPercent = currentTime / 1000 * particles[x].path.getTotalLength();
        particles[x].current = currentTime * 0.15 * particles[x].speed;
        var currentPos = particles[x].path.getPointAtLength(particles[x].current);
        context.beginPath();
        context.fillStyle = particles[x].link.particleColor(0);
        context.arc(currentPos.x, currentPos.y + particles[x].offset, particles[x].link.particleSize, 0, 2 * Math.PI);
        context.fill();
      }
    }

  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = sankeyparticles;
},{}],31:[function(require,module,exports){
var scatterplot = function (userConfig) {
  var chart = new dex.component(userConfig,
    {
      'parent'           : "#ScatterPlot",
      "id"               : "ScatterPlot",
      "class"            : "ScatterPlot",
      'width'            : "100%",
      'height'           : "100%",
      'csv'              : {
        'header' : ["X", "Y"],
        'data'   : [
          [0, 0],
          [1, 1],
          [2, 4],
          [3, 9],
          [4, 16]
        ],
      },
      'margin'           : {top : 20, right : 15, bottom : 60, left : 60},
      'selectedColor'    : "red",
      'unselectedColor'  : "steelblue",
      'unselectedRadius' : 8,
      'selectedRadius'   : 8,
      'xi'               : 0,
      'yi'               : 1,
      'transform'        : 'scale(.95) translate(60,0)'
    });

  chart.render = function () {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function () {
    d3.selectAll("#" + chart.config.id).remove();
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart.attr("width", width).attr("height", height).update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    //console.log("CONFIG: " + this.config);
    //console.dir(this.registry);

    x = d3.scale.linear()
      .domain([0, d3.max(csv.data, function (d) {
        return d[0];
      })])
      .range([0, config.width]);

    y = d3.scale.linear()
      .domain([0, d3.max(csv.data, function (d) {
        return d[1];
      })])
      .range([config.height, 0]);

    var chartContainer = d3.select(config.parent)
      .append('g')
      .attr('class', config["class"])
      .attr('id', config["id"])
      .attr('transform', config.transform);

    // draw the x axis
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

    var brush = d3.svg.brush()
      .x(x)
      .y(y)
      .on("brushstart", function (d) {
        brushstartHandler({});
      })
      .on("brush", function (d) {
        brushmoveHandler({});
      })
      .on("brushend", function (d) {
        brushendHandler({});
      });

    //console.log("BRUSH: " + brush);

    chartContainer.append('g')
      .attr('transform', 'translate(0,' + config.height + ')')
      .attr('class', 'main axis date')
      .call(xAxis);

    // draw the y axis
    var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    chartContainer.append('g')
      .attr('transform', 'translate(0,0)')
      .attr('class', 'main axis date')
      .call(yAxis);

    var g = chartContainer.append("svg:g")
      .attr("id", "pointContainer")
      .call(brush);

    g.selectAll("scatter-dots")
      .data(csv.data)
      .enter().append("svg:circle")
      .attr("id", "scatter-dot")
      .attr("cx", function (d) {
        return x(d[config.xi]);
      })
      .attr("cy", function (d) {
        return y(d[config.yi]);
      })
      .attr("r", config.unselectedRadius)
      .style("fill", config.unselectedColor)
      .on("mouseover", function (d) {
        mouseOverHandler({node : this, data : d});
      })
      .on("mouseout", function (d) {
        mouseOutHandler({node : this, data : d});
      });

    function brushstartHandler(chartEvent) {
      //console.log("brush start()");
      //console.log("brush empty? " + brush.empty());
      d3.selectAll("#scatter-dot")
        .attr("r", config.unselectedRadius)
        .style("fill", config.unselectedColor);
    }

    function brushmoveHandler(chartEvent) {
      //console.log("brush move(" + brush.extent() + ")");
    }

    function brushendHandler(chartEvent) {
      //console.log("brushend");
      //console.log("FOO: " + chart);
      //this.dump("ScatterPlot.brushendHandler()");
      //console.dir(config);
      //console.dir(registry);
      var extent = brush.extent();
      //console.dir(brush.extent());

      var data = [];

      var active = d3.selectAll("#scatter-dot")
        .filter(function (d, i) {
          //console.dir(extent);
          //console.dir(d);
          if (d[0] >= extent[0][0] && d[0] <= extent[1][0] &&
            d[1] >= extent[0][1] && d[1] <= extent[1][1]) {
            data.push([d[0], d[1]]);
            return this;
          }
          return null;
        })
        .attr("r", config.selectedRadius)
        .style("fill", config.selectedColor);

      chart.publish({type : "brushend", data : data});
    }

    function mouseOverHandler(chartEvent) {
      //console.log("mouseover");
      //console.log("MOUSEOVER: node=" + node + ", data=" + data + ", originator=" + originator);
      // If we're the originator of this event, notify our listeners to
      // update themselves in turn.

      // Pick yourself so you have access to all the D3 goodies you get
      // through selection.
      d3.select(chartEvent.node)
        .style("fill", config.selectedColor)
        .attr("r", config.selectedRadius);

      d3.select("#pointContainer")
        .append("text")
        .attr("x", x(chartEvent.data[0]))
        .attr("y", y(chartEvent.data[1]) - 10)
        .attr("dy", ".35m")
        .style("font-size", 14)
        .attr("text-anchor", "top")
        .attr("fill", "black")
        .text(function (d) {
          return chartEvent.data[1];
        });
    }

    function mouseOutHandler(chartEvent) {
      d3.select("#pointContainer").selectAll("text").remove();
      d3.select(chartEvent.node)
        .style("fill", config.unselectedColor)
        .attr("r", config.unselectedRadius);
    }
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = scatterplot;
},{}],32:[function(require,module,exports){
var sunburst = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent': '#Sunburst',
    // Set these when you need to CSS style components independently.
    'id': 'Sunburst',
    'class': 'Sunburst',
    'resizable': true,
    // Our data...
    'csv': {
      // Give folks without data something to look at anyhow.
      'header': ["X", "Y", "Z"],
      'data': [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'width': "100%",
    'height': "100%",
    'transform': "translate(0 0)",
    'title': dex.config.text(),
    'label': dex.config.text()
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll("#" + config.id).remove();

    var data = dex.csv.toNestedJson(dex.csv.copy(csv));
    dex.console.log("DATA", csv, data);

    var width = 960,
      height = 700,
      radius = Math.min(width, height) / 2;

    var x = d3.scale.linear()
      .range([0, 2 * Math.PI]);

    var y = d3.scale.linear()
      .range([0, radius]);

    var color = d3.scale.category20c();

    var chartContainer = d3.select(config.parent).append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

    var partition = d3.layout.partition()
      .value(function (d) {
        return d.size;
      });

    var arc = d3.svg.arc()
      .startAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
      })
      .endAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
      })
      .innerRadius(function (d) {
        return Math.max(0, y(d.y));
      })
      .outerRadius(function (d) {
        return Math.max(0, y(d.y + d.dy));
      });



    //d3.json("https://s3-us-west-2.amazonaws.com/s.cdpn.io/65174/flare.json", function (error, root) {

    var root = data;

      var g = chartContainer.selectAll("g")
        .data(partition.nodes(root))
        .enter().append("g");

      var path = g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
          return color((d.children ? d : d.parent).name);
        })
        .on("click", click);

      var text = g.append("text")
        .attr("transform", function (d) {
          dex.console.log("D", d);
          return "rotate(" + computeTextRotation(d) + ")";
        })
        .attr("x", function (d) {
          return y(d.y);
        })
        .attr("dx", "6") // margin
        .attr("dy", ".35em") // vertical-align
        .text(function (d) {
          return d.name;
        });

      function click(d) {
        // fade out all text elements
        text.transition().attr("opacity", 0);

        path.transition()
          .duration(750)
          .attrTween("d", arcTween(d))
          .each("end", function (e, i) {
            // check if the animated element's data e lies within the visible angle span given in d
            if (e.x >= d.x && e.x < (d.x + d.dx)) {
              // get a selection of the associated text element
              var arcText = d3.select(this.parentNode).select("text");
              // fade in the text element and recalculate positions
              arcText.transition().duration(750)
                .attr("opacity", 1)
                .attr("transform", function () {
                  return "rotate(" + computeTextRotation(e) + ")"
                })
                .attr("x", function (d) {
                  return y(d.y);
                });
            }
          });
      }

    d3.select(self.frameElement).style("height", height + "px");

// Interpolate the scales!
    function arcTween(d) {
      var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        yd = d3.interpolate(y.domain(), [d.y, 1]),
        yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
      return function (d, i) {
        return i
          ? function (t) {
          return arc(d);
        }
          : function (t) {
          x.domain(xd(t));
          y.domain(yd(t)).range(yr(t));
          return arc(d);
        };
      };
    }

    function computeTextRotation(d) {
      return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
    }

  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = sunburst;
},{}],33:[function(require,module,exports){
var titledtreemap = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent': '#Treemap',
    // Set these when you need to CSS style components independently.
    'id': 'Treemap',
    'class': 'Treemap',
    'resizable': true,
    // Our data...
    'csv': {
      // Give folks without data something to look at anyhow.
      'header': ["NAME", "PACAGE", "SIZE"],
      'data': [
        ["name1", "package1", 100],
        ["name2", "package2", 50],
        ["name3", "package3", 25]
      ]
    },
    'width': "100%",
    'height': "100%",
    'transform': "translate(0 0)",
    'title': dex.config.text(),
    'label': dex.config.text()
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll("#" + config.id).remove();
    //var isIE = BrowserDetect.browser == 'Explorer';
    var chartWidth = config.width;
    var chartHeight = config.height;
    var xscale = d3.scale.linear().range([0, chartWidth]);
    var yscale = d3.scale.linear().range([0, chartHeight]);
    var color = d3.scale.category10();
    var headerHeight = 20;
    var headerColor = "#555555";
    var transitionDuration = 500;
    var root;
    var node;

    var treemap = d3.layout.treemap()
      .round(false)
      .size([chartWidth, chartHeight])
      .sticky(true)
      .value(function (d) {
        return d.size;
      });

    //var chart = d3.select("#body")
    //  .append("svg:svg")
    //  .attr("width", chartWidth)
    //  .attr("height", chartHeight)
    //  .append("svg:g");

    var chart = d3.select(config.parent)
      .append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    var data = dex.csv.toNestedJson(csv);

    node = root = data;
    var nodes = treemap.nodes(root);

    var children = nodes.filter(function (d) {
      return !d.children;
    });
    var parents = nodes.filter(function (d) {
      return d.children;
    });

    // create parent cells
    var parentCells = chart.selectAll("g.cell.parent")
      .data(parents, function (d) {
        return "p-" + d.name;
      });
    var parentEnterTransition = parentCells.enter()
      .append("g")
      .attr("class", "cell parent")
      .on("click", function (d) {
        zoom(d);
      });
    parentEnterTransition.append("rect")
      .attr("width", function (d) {
        return Math.max(0.01, d.dx);
      })
      .attr("height", function (d) {
        return d.dy;
      })
      .style("fill", headerColor);
    parentEnterTransition.append('foreignObject')
      .attr("class", "foreignObject")
      .append("xhtml:body")
      .attr("class", "labelbody")
      .append("div")
      .attr("class", "label");
    // update transition
    var parentUpdateTransition = parentCells.transition().duration(transitionDuration);
    parentUpdateTransition.select(".cell")
      .attr("transform", function (d) {
        return "translate(" + d.dx + "," + d.y + ")";
      });
    parentUpdateTransition.select("rect")
      .attr("width", function (d) {
        return Math.max(0.01, d.dx);
      })
      .attr("height", function (d) {
        return d.dy;
      })
      .style("fill", headerColor);
    parentUpdateTransition.select(".foreignObject")
      .attr("width", function (d) {
        return Math.max(0.01, d.dx);
      })
      .attr("height", function (d) {
        return d.dy;
      })
      .select(".labelbody .label")
      .text(function (d) {
        return "FOREIGN" + d.name;
      });
    // remove transition
    parentCells.exit()
      .remove();

    // create children cells
    var childrenCells = chart.selectAll("g.cell.child")
      .data(children, function (d) {
        return "c-" + d.name;
      });
    // enter transition
    var childEnterTransition = childrenCells.enter()
      .append("g")
      .attr("class", "cell child")
      .on("click", function (d) {
        zoom(node === d.parent ? root : d.parent);
      });
    childEnterTransition.append("rect")
      .classed("background", true)
      .style("fill", function (d) {
        return color(d.parent.name);
      });
    childEnterTransition.append('foreignObject')
      .attr("class", "foreignObject")
      .attr("width", function (d) {
        return Math.max(0.01, d.dx);
      })
      .attr("height", function (d) {
        return Math.max(0.01, d.dy);
      })
      .append("xhtml:body")
      .attr("class", "labelbody")
      .append("div")
      .attr("class", "label")
      .text(function (d) {
        return "FO" + d.name;
      });

//    if (isIE) {
//      childEnterTransition.selectAll(".foreignObject .labelbody .label")
//        .style("display", "none");
//    } else {
    childEnterTransition.selectAll(".foreignObject")
      .style("display", "none");
//    }

    // update transition
    var childUpdateTransition = childrenCells.transition().duration(transitionDuration);
    childUpdateTransition.select(".cell")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    childUpdateTransition.select("rect")
      .attr("width", function (d) {
        return Math.max(0.01, d.dx);
      })
      .attr("height", function (d) {
        return d.dy;
      })
      .style("fill", function (d) {
        return color(d.parent.name);
      });
    childUpdateTransition.select(".foreignObject")
      .attr("width", function (d) {
        return Math.max(0.01, d.dx);
      })
      .attr("height", function (d) {
        return Math.max(0.01, d.dy);
      })
      .select(".labelbody .label")
      .text(function (d) {
        return "FO2" + d.name;
      });
    // exit transition
    childrenCells.exit()
      .remove();

    d3.select("select").on("change", function () {
      console.log("select zoom(node)");
      treemap.value(this.value == "size" ? size : count)
        .nodes(root);
      zoom(node);
    });

    zoom(node);


    function size(d) {
      return d.size;
    }


    function count(d) {
      return 1;
    }


    //and another one
    function textHeight(d) {
      var ky = chartHeight / d.dy;
      yscale.domain([d.y, d.y + d.dy]);
      return (ky * d.dy) / headerHeight;
    }


    function getRGBComponents(color) {
      var r = color.substring(1, 3);
      var g = color.substring(3, 5);
      var b = color.substring(5, 7);
      return {
        R: parseInt(r, 16),
        G: parseInt(g, 16),
        B: parseInt(b, 16)
      };
    }


    function idealTextColor(bgColor) {
      var nThreshold = 105;
      var components = getRGBComponents(bgColor);
      var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);
      return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
    }

    function zoom(d) {
      treemap
        .padding([headerHeight / (chartHeight / d.dy), 4, 4, 4])
        .nodes(d);

      // moving the next two lines above treemap layout messes up padding of zoom result
      var kx = chartWidth / d.dx;
      var ky = chartHeight / d.dy;
      var level = d;

      xscale.domain([d.x, d.x + d.dx]);
      yscale.domain([d.y, d.y + d.dy]);

      if (node != level) {
//        if (isIE) {
//          chart.selectAll(".cell.child .foreignObject .labelbody .label")
//            .style("display", "none");
//        } else {
        chart.selectAll(".cell.child .foreignObject")
          .style("display", "none");
//        }
      }

      var zoomTransition = chart.selectAll("g.cell").transition().duration(transitionDuration)
        .attr("transform", function (d) {
          return "translate(" + xscale(d.x) + "," + yscale(d.y) + ")";
        })
        .each("end", function (d, i) {
          if (!i && (level !== self.root)) {
            chart.selectAll(".cell.child")
              .filter(function (d) {
                return d.parent === self.node; // only get the children for selected group
              })
              .select(".foreignObject .labelbody .label")
              .style("color", function (d) {
                return idealTextColor(color(d.parent.name));
              });

//            if (isIE) {
//              chart.selectAll(".cell.child")
//                .filter(function (d) {
//                  return d.parent === self.node; // only get the children for selected group
//                })
//                .select(".foreignObject .labelbody .label")
//                .style("display", "")
//            } else {
            chart.selectAll(".cell.child")
              .filter(function (d) {
                return d.parent === self.node; // only get the children for selected group
              })
              .select(".foreignObject")
              .style("display", "")
//            }
          }
        });

      zoomTransition.select(".foreignObject")
        .attr("width", function (d) {
          return Math.max(0.01, kx * d.dx);
        })
        .attr("height", function (d) {
          return d.children ? (ky * d.dy) : Math.max(0.01, ky * d.dy);
        })
        .select(".labelbody .label")
        .text(function (d) {
          dex.console.log("D", d);
          return d.name;
        });

      // update the width/height of the rects
      zoomTransition.select("rect")
        .attr("width", function (d) {
          return Math.max(0.01, kx * d.dx);
        })
        .attr("height", function (d) {
          return d.children ? (ky * d.dy) : Math.max(0.01, ky * d.dy);
        })
        .style("fill", function (d) {
          return d.children ? headerColor : color(d.parent.name);
        });

      node = d;

      if (d3.event) {
        d3.event.stopPropagation();
      }
    }
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = titledtreemap;

},{}],34:[function(require,module,exports){
var treemap = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#Treemap',
        // Set these when you need to CSS style components independently.
        'id': 'Treemap',
        'class': 'Treemap',
        'resizable': true,
        // Our data...
        'csv': {
            // Give folks without data something to look at anyhow.
            'header': ["NAME", "PACAGE", "SIZE"],
            'data': [
                ["name1", "package1", 100],
                ["name2", "package2", 50],
                ["name3", "package3", 25]
            ]
        },
        'width': "100%",
        'height': "100%",
        'transform': "translate(0 0)",
        'title': dex.config.text(),
        'label': dex.config.text()
    };

    var chart = new dex.component(userConfig, defaults);

    chart.render = function render() {
        window.onresize = this.resize;
        chart.resize();
    };

    chart.resize = function resize() {
        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height).update();
        }
        else {
            chart.update();
        }
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        d3.selectAll("#" + config.id).remove();

        var chartContainer = d3.select(config.parent).append("g")
            .attr("class", config["id"])
            .attr("id", config["id"])
            .attr("transform", config.transform);

        var w = 1280 - 80,
            h = 800 - 180,
            x = d3.scale.linear().range([0, w]),
            y = d3.scale.linear().range([0, h]),
            color = d3.scale.category20c(),
            root,
            node;

        var treemap = d3.layout.treemap()
            .round(false)
            .size([w, h])
            .sticky(true)
            .value(function (d) {
                return d.size;
            });

        var data = dex.csv.toNestedJson(dex.csv.copy(csv));
        dex.console.log("DATA", csv, data);

        /*
        var svg = d3.select("#body").append("div")
            .attr("class", "chart")
            .style("width", w + "px")
            .style("height", h + "px")
            .append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(.5,.5)");
*/

        node = root = data;

        var nodes = treemap.nodes(root)
            .filter(function (d) {
                return !d.children;
            });

        var cell = chartContainer.selectAll("g")
            .data(nodes)
            .enter().append("svg:g")
            .attr("class", "cell")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .on("click", function (d) {
                return zoom(node == d.parent ? root : d.parent);
            });

        cell.append("svg:rect")
            .attr("width", function (d) {
                return d.dx - 1;
            })
            .attr("height", function (d) {
                return d.dy - 1;
            })
            .style("fill", function (d) {
                return color(d.parent.name);
            });

        cell.append("svg:text")
            .attr("x", function (d) {
                return d.dx / 2;
            })
            .attr("y", function (d) {
                return d.dy / 2;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.name;
            })
            .style("opacity", function (d) {
                d.w = this.getComputedTextLength();
                return d.dx > d.w ? 1 : 0;
            });

        d3.select(window).on("click", function () {
            zoom(root);
        });

        d3.select("select").on("change", function () {
            treemap.value(this.value == "size" ? size : count).nodes(root);
            zoom(node);
        });


        function size(d) {
            return d.size;
        }

        function count(d) {
            return 1;
        }

        function zoom(d) {
            var kx = w / d.dx, ky = h / d.dy;
            x.domain([d.x, d.x + d.dx]);
            y.domain([d.y, d.y + d.dy]);

            var t = chartContainer.selectAll("g.cell").transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .attr("transform", function (d) {
                    return "translate(" + x(d.x) + "," + y(d.y) + ")";
                });

            t.select("rect")
                .attr("width", function (d) {
                    return kx * d.dx - 1;
                })
                .attr("height", function (d) {
                    return ky * d.dy - 1;
                })

            t.select("text")
                .attr("x", function (d) {
                    return kx * d.dx / 2;
                })
                .attr("y", function (d) {
                    return ky * d.dy / 2;
                })
                .style("opacity", function (d) {
                    return kx * d.dx > d.w ? 1 : 0;
                });

            node = d;
            d3.event.stopPropagation();
        }

    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
};

module.exports = treemap;
},{}],35:[function(require,module,exports){
var verticallegend = function (userConfig) {

  var defaults = {
    'labels'          : ["A", "B", "C"],
    'id'              : "VerticalLegend",
    'class'           : "VerticalLegend",
    'resizeable'      : false,
    'parent'          : null,
    'height'          : 250,
    'width'           : 250,
    //'transform'       : 'translate(100,100)',
    //'xoffset'         : 50,
    //'yoffset'         : 30,
    //'cellWidth'       : 30,
    //'cellHeight'      : 20,
    'tickLength'      : 5,
    'caption'         : "Legend",
    'captionFontSize' : 14,
    'captionXOffset'  : -30,
    'captionYOffset'  : -20,
    'margin'          : {
      'top'    : 10,
      'bottom' : 10,
      'left'   : 20,
      'right'  : 10
    },
    'cell'            : {
      'appearance.mouseover.rect.width' : 35,
      'appearance.mouseout.rect.width'  : 30,
      'appearance.mousedown.rect.width' : 50,
      'appearance.mouseup.rect.width'   : 35,
      'rect'                            : dex.config.rectangle({
        'width'  : 30,
        'height' : 20,
        'y'      : function (d) {
          return chart.config.yscale(d);
        },
        'x'      : function (d) {
          return chart.config.width / 10;
        },
        'events' : {
          'mouseover' : function (d, i) {
            dex.console.log("mouseover event(d=" + d + ", i=" + i + ")");
            //dex.console.log("this", d3.select(this), "Mouseover config",
            //chart.config);
            //dex.console.log("cell.events.mouseover.config",
            //  chart.config.cell.appearance.mouseover);
            d3.select(this).call(dex.config.configureRectangle,
              chart.config.cell.appearance.mouseover.rect);
            chart.publish({"type" : "mouseover", "d" : d});
          },
          'mouseout'  : function (d) {
            dex.console.log("mouseout event(d=" + d + ", i=" + i + ")");
            d3.select(this).call(dex.config.configureRectangle,
              chart.config.cell.appearance.mouseout.rect);
            chart.publish({"type" : "mouseout", "d" : d});
          },
          'mousedown' : function (d) {
            dex.console.log("mousedown event(d=" + d + ", i=" + i + ")");
            d3.select(this).call(dex.config.configureRectangle,
              chart.config.cell.appearance.mousedown.rect);
            chart.publish({"type" : "mousedown", "d" : d});
          },
          'mouseup'   : function (d) {
            dex.console.log("mouseup event(d=" + d + ", i=" + i + ")");
            d3.select(this).call(dex.config.configureRectangle,
              chart.config.cell.appearance.mouseup.rect);
            chart.publish({"type" : "mouseup", "d" : d});
          }
        }
      }),
      'label'                           : dex.config.text({
        'text'        : function (d) {
          return d;
        },
        'font.scale'  : function (d) {
          dex.console.log("FONT.SCALE: width=" + chart.config.width + 'x' + chart.config.height);
          var scale = d3.scale.linear()
            .domain([0, 150])
            .range([0, 32]);
          return scale;
        },
        'font.weight' : "bold",
        'font.size'   : function (d) {
          dex.console.log("FONT-SIZE: width=" + chart.config.width +
          ", height=" + chart.config.height +
          ", fontScale=" + chart.config.cell.label.font.scale()(chart.config.width * .2));
          return chart.config.cell.label.font.scale()(chart.config.width * .2);
        },
        'anchor'      : 'end',
        'y'           : function (d) {
          return chart.config.yscale(d);
        },
        'dx'          : function (d, i) {
          dex.console.log("dx", chart.config.cell.label.font.size(d));
          return -1 * chart.config.cell.label.font.size(d) / 2;
          //dex.console.log("this", this, "select(this)", d3.select(this), chart.config);
          //return -(chart.config.cell.label.font.size / 2);
        },
        'dy'          : function (d, i) {
          //dex.console.log("CURENT-FONT-SIZE " + chart.config.cell.label.font.size(d))
          ;         // return Math.floor(chart.config.cell.rect.height / 2);// + Math.floor(chart.config.cell.label.font.size(d) / 2);
          return 0;
        },
        'fill'        : dex.config.fill({'fillColor' : 'black'})
      })
    },
    'title'           : dex.config.text({
      'text'       : 'title.text',
      'anchor'     : 'middle',
      'font.scale' : function (d) {
        dex.console.log("TITLE.FONT.SCALE: width=" + chart.config.width + 'x' + chart.config.height);
        var scale = d3.scale.linear()
          .domain([0, 200])
          .range([4, 64]);
        return scale;
      },
      'font.size'  : function (d) {
        dex.console.log("TITLE-FONT-SIZE: width=" + chart.config.width +
        ", height=" + chart.config.height +
        ", fontScale=" + chart.config.cell.label.font.scale()(
          Math.min(chart.config.width, chart.config.height) / 5));
        return chart.config.title.font.scale()
        (Math.min(chart.config.width, chart.config.height) * .2);
      },
      'y'          : function (d) {
        return chart.config.height / 12;
      },
      'x'          : function (d) {
        return chart.config.width / 10 + chart.config.cell.rect.width / 2;
      }
    })
  };

  // Create our chart.
  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizeable) {

      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      var cellWidth = width * .4;
      var cellHeight = height * .8 / (chart.config.labels.length + 1);
      dex.console.log("Resizing VerticalLegend: " + width + "x" + height);
      chart
        .attr("width", width)
        .attr("height", height)
        .attr("cell.rect.width", cellWidth)
        .attr("cell.rect.height", cellHeight)
        .attr("margin.top", height * .1)
        .attr("margin.bottom", height * .1)
        .attr("margin.left", width * .1)
        .attr("margin.right", width * .1)
        .attr("cell.appearance.mouseover.rect.width", cellWidth * 1.1)
        .attr("cell.appearance.mouseout.rect.width", cellWidth)
        .attr("cell.appearance.mousedown.rect.width", cellWidth * 1.2)
        .attr("cell.appearance.mouseup.rect.width", cellWidth * 1.1)
        .attr("cell.label.dx", width * .4)
        .attr("cell.rect.x", width * .5)
        .attr("title.y", height * .08)
        .attr("title.x", width * .4 + cellWidth / 2)
        .attr("cell.label.x", width * .1)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = this.config;
    dex.console.log("RESIZE");
    dex.console.log(config.id + ": " + config.width + "x" + config.height);
    d3.selectAll("#" + config.id).remove();

    config.yscale = d3.scale.ordinal()
      .domain(config.labels)
      .rangeBands([config.margin.top, config.height - config.margin.bottom]);

    // Append a graphics node to the supplied svg node.
    var chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    var rects = chartContainer.selectAll("rect")
      .data(config.labels)
      .enter()
      .append("rect")
      .call(dex.config.configureRectangle, config.cell.rect);

    chartContainer.selectAll("label")
      .data(config.labels)
      .enter().append("text")
      .call(dex.config.configureText, config.cell.label);

    chartContainer.append("text")
      .call(dex.config.configureText, config.title)
      .text(config.title.text);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = verticallegend;
},{}],36:[function(require,module,exports){
/**
 *
 * This module provides D3 based visualization components.
 *
 * @module dex/charts/d3
 * @name d3
 * @memberOf dex.charts
 *
 */
var d3 = {};

/**
 *
 * A class for drawing an axis.
 *
 * @name Axis
 *
 */
d3.Axis = require("./Axis");
d3.BarChart = require("./BarChart");
d3.Chord = require("./Chord");
d3.ClusteredForce = require("./ClusteredForce");
d3.Dendrogram = require("./Dendrogram");
d3.Force = require("./Force");
d3.HeatMap = require("./HeatMap");
d3.HorizonChart = require("./HorizonChart");
d3.HorizontalLegend = require("./HorizontalLegend");
d3.LineChart = require("./LineChart");
d3.MotionBarChart = require("./MotionBarChart");
d3.MotionChart = require("./MotionChart");
d3.MotionCircleChart = require("./MotionCircleChart");
d3.MotionLineChart = require("./MotionLineChart");
d3.OrbitalLayout = require("./OrbitalLayout");
d3.ParallelCoordinates = require("./ParallelCoordinates");
d3.PieChart = require("./PieChart");
d3.RadarChart = require("./RadarChart");
d3.RadialTree = require("./RadialTree");
d3.Sankey = require("./Sankey");
d3.SankeyParticles = require("./SankeyParticles");
d3.ScatterPlot = require("./ScatterPlot");
d3.Sunburst = require("./Sunburst");
d3.TitledTreemap = require("./TitledTreemap");
d3.Treemap = require("./Treemap");
d3.VerticalLegend = require("./VerticalLegend");

// Too large, need optional config
//d3.map = require("./map/map");

module.exports = d3;
},{"./Axis":10,"./BarChart":11,"./Chord":12,"./ClusteredForce":13,"./Dendrogram":14,"./Force":15,"./HeatMap":16,"./HorizonChart":17,"./HorizontalLegend":18,"./LineChart":19,"./MotionBarChart":20,"./MotionChart":21,"./MotionCircleChart":22,"./MotionLineChart":23,"./OrbitalLayout":24,"./ParallelCoordinates":25,"./PieChart":26,"./RadarChart":27,"./RadialTree":28,"./Sankey":29,"./SankeyParticles":30,"./ScatterPlot":31,"./Sunburst":32,"./TitledTreemap":33,"./Treemap":34,"./VerticalLegend":35}],37:[function(require,module,exports){
var network = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#RingNetwork',
        // Set these when you need to CSS style components independently.
        'id': 'RingNetwork',
        'class': 'RingNetwork',
        'resizable': true,
        // Our data...
        'csv': {
            // Give folks without data something to look at anyhow.
            'header': ["NAME", "GENDER", "VEHICLE"],
            'data': [
                ["JIM", "M", "CAR"],
                ["JOE", "M", "CAR"],
                ["PAT", "M", "TRUCK"],
                ["SALLY", "F", "TRUCK"]
            ]
        },
        'connect': 'first',
        'type' : 'rings',
        //'connect' : 'all',
        'width': "100%",
        'height': "100%",
        'transform': "translate(0 0)",
    };

    var chart = new dex.component(userConfig, defaults);

    chart.render = function render() {
        window.onresize = this.resize;
        chart.resize();
    };

    chart.resize = function resize() {
        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height).update();
        }
        else {
            chart.update();
        }
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        var connections = [];

        // Connect everything in the row to the first column.
        if (config.connect == 'first') {
            for (var ri = 0; ri < csv.data.length; ri++) {
                for (var ci = 1; ci < csv.header.length; ci++) {
                    connections.push({'source': csv.data[ri][0], 'target': csv.data[ri][ci]});
                }
            }
        }
        // Connect everything in the row to everything else in the row.
        else {
            for (var ri = 0; ri < csv.data.length; ri++) {
                for (var ci = 1; ci < csv.header.length; ci++) {
                    connections.push({'source': csv.data[ri][ci - 1], 'target': csv.data[ri][ci]});
                }
                connections.push({'source': csv.data[ri][csv.header.length - 1], 'target': csv.data[ri][0]});
            }
        }

        //dex.console.log("Connections", connections);

        // instantiate d3plus
        var viz = d3plus.viz()
            .container(config.parent)
            .type(config.type)
            .edges(connections);

        if (config.edges)
        {
            viz.edges(config.edges);
        }

        if (config.focus)
        {
            viz.focus(config.focus);
        }

        viz.draw();             // finally, draw the visualization!
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
};

module.exports = network;
},{}],38:[function(require,module,exports){
/**
 *
 * This module provides d3plus based visualizations.
 *
 * @module dex/charts/d3plus
 * @name d3plus
 * @memberOf dex.charts
 *
 */
var d3plus = {};

d3plus.Network = require("./Network");

module.exports = d3plus;
},{"./Network":37}],39:[function(require,module,exports){
/**
 * This will construct a new DygraphsLineChart with the user supplied userConfig applied.
 * @param userConfig - A user supplied configuration of the form:
 * @returns {DexComponent} The LineChart
 * @constructor
 *
 */
var linechart = function (userConfig) {
  var defaults =
  {
    'parent'    : null,
    'id'        : "DygraphsLineChart",
    "class"     : "DygraphsLineChart",
    'csv'       : {
      'header' : ["X", "Y"],
      'data'   : [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    'width'     : 600,
    'height'    : 400,
    'transform' : '',
    'options'   : {}
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    this.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    var csvIndices = dex.range(0, csv.header.length);
    dex.console.trace("CSV INDICES: ", csvIndices);
    // Map the header.

    var csvData = csvIndices.map(function (i) {
        return csv.header[i];
      }).join(",") + "\n";

    csvData += config.csv.data.map(function (row) {
      return csvIndices.map(function (i) {
        return row[i];
      }).join(",");
    }).join("\n") + "\n";

    d3.selectAll(config.id).remove();
    g = new Dygraph(document.getElementById(config.parent.substring(1)),
      csvData, config.options);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = linechart;
},{}],40:[function(require,module,exports){
/**
 *
 * This module provides a dygraphs linechart component.
 *
 * @module dex/charts/dygraphs
 * @name dygraphs
 * @memberOf dex.charts
 *
 */

var dygraphs = {};

dygraphs.LineChart = require("./LineChart");

module.exports = dygraphs;
},{"./LineChart":39}],41:[function(require,module,exports){
var diffbarchart = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'PieChart',
    'class'      : 'PieChart',
    // Our data...
    'csv'        : {
      'header' : ['Category', 'Major', 'Degrees'],
      'data'   : [
        ['old', 'Business', 256070],
        ['old', 'Education', 108034],
        ['old', 'Social Sciences & History', 127101],
        ['old', 'Health', 81863],
        ['old', 'Psychology', 74194],
        ['new', 'Business', 358293],
        ['new', 'Education', 101265],
        ['new', 'Social Sciences & History', 172780],
        ['new', 'Health', 129634],
        ['new', 'Psychology', 97216]]
    },
    'resizeable' : true,
    'diff'       : {
      'compare'       : 'Category',
      'compareGroups' : ['old', 'new']
    },
    'options'    : {
      'bars' : 'horizontal',
      'hAxis.viewWindowMode' : 'maximized',
      'vAxis.viewWindowMode' : 'maximized',
      'chartArea.width' : function() { return chart.config.width * 0.8; },
      'chartArea.height' : function() { return chart.config.height * 0.8; }
    }
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.attr("options.chart.title", 'title')
      .attr("options.chart.subtitle", 'subtitle')
      .attr("options.colors", [
        'steelblue', 'red', 'blue', 'green',
        'orange', 'purple', 'grey', 'brown',
        'cyan', 'magenta']);
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizeable) {
      var config = chart.config;
      var target = (config.parent && config.parent[0] == '#') ?
        config.parent.substring(1) : config.parent;
      var targetElt = document.getElementById(target);

      var width = targetElt.clientWidth;
      var height = targetElt.clientHeight;
      dex.console.log("google.DiffPieChart Resize: " + width + "x" + height);

      chart
        .attr("width", width)
        .attr("height", height)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;

    // Keep a copy of the before and after data
    var beforeData = [dex.array.copy(config.csv.header)];
    var afterData = [dex.array.copy(config.csv.header)];

    // Find the category we're grouping on.
    var groupIndex = config.csv.header.indexOf(config.diff.category);

    // Nothing to chart if the group index is invalid.  Simply return.
    if (groupIndex < 0) {
      return;
    }

    // Iterate over each row in the data:
    config.csv.data.forEach(function (row) {
      // Copy the rows with matching group indexes.
      if (row[groupIndex] == config.diff.compareGroups[0]) {
        beforeData.push(dex.array.copy(row));
      }
      else if (row[groupIndex] == config.diff.compareGroups[1]) {
        afterData.push(dex.array.copy(row));
      }
    })

    // Remove the group index from the copied data.
    beforeData.forEach(function (row) {
      row.splice(groupIndex, 1);
    });
    afterData.forEach(function (row) {
      row.splice(groupIndex, 1);
    });

    dex.console.log("csv", config.csv, "before", beforeData, "after", afterData);

    // Get the valid query string for the parent:
    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    // Use js dom to locate the target node.
    var targetNode = document.getElementById(target);

    // Delete the children.
    while (targetNode.firstChild) {
      targetNode.removeChild(targetNode.firstChild);
    }

    var beforeDataTable = google.visualization.arrayToDataTable(beforeData);
    var afterDataTable = google.visualization.arrayToDataTable(afterData);

    var diffChart = new google.visualization.BarChart(targetNode);

    var diffDataTable = diffChart.computeDiff(beforeDataTable, afterDataTable);
    diffChart.draw(diffDataTable, config.options);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = diffbarchart;
},{}],42:[function(require,module,exports){
var diffpiechart = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'PieChart',
    'class'      : 'PieChart',
    // Our data...
    'csv'        : {
      'header' : ['Category', 'Major', 'Degrees'],
      'data'   : [
        ['old', 'Business', 256070],
        ['old', 'Education', 108034],
        ['old', 'Social Sciences & History', 127101],
        ['old', 'Health', 81863],
        ['old', 'Psychology', 74194],
        ['new', 'Business', 358293],
        ['new', 'Education', 101265],
        ['new', 'Social Sciences & History', 172780],
        ['new', 'Health', 129634],
        ['new', 'Psychology', 97216]]
    },
    'resizeable' : true,
    'diff'       : {
      'compare'       : 'Category',
      'compareGroups' : ['old', 'new']
    },
    'options'    : {
      'title'           : 'default title',
      'legend.position' : 'bottom'
    }
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart
      .resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizeable) {
      var config = chart.config;
      var target = (config.parent && config.parent[0] == '#') ?
        config.parent.substring(1) : config.parent;
      var targetElt = document.getElementById(target);

      var width = targetElt.clientWidth;
      var height = targetElt.clientHeight;
      dex.console.log("google.DiffPieChart Resize: " + width + "x" + height);

      chart
        .attr("width", width)
        .attr("height", height)
        .attr("options.chartArea.width", width * .8)
        .attr("options.chartArea.height", height * .8)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;

    var oldData = [dex.array.copy(config.csv.header)];
    var newData = [dex.array.copy(config.csv.header)];
    var groupIndex = config.csv.header.indexOf(config.diff.category);

    if (groupIndex < 0) {
      return;
    }

    config.csv.data.forEach(function (row) {
      if (row[groupIndex] == config.diff.compareGroups[0]) {
        oldData.push(dex.array.copy(row));
      }
      else if (row[groupIndex] == config.diff.compareGroups[1]) {
        newData.push(dex.array.copy(row));
      }
    })

    newData.forEach(function (row) {
      row.splice(groupIndex, 1);
    });
    oldData.forEach(function (row) {
      row.splice(groupIndex, 1);
    });

    dex.console.log("csv", config.csv, "old", oldData, "new", newData);

    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    var targetNode = document.getElementById(target);

    while (targetNode.firstChild) {
      targetNode.removeChild(targetNode.firstChild);
    }

    var oldDataTable = google.visualization.arrayToDataTable(oldData);
    var newDataTable = google.visualization.arrayToDataTable(newData);

    var diffChart = new google.visualization.PieChart(targetNode);

    var diffDataTable = diffChart.computeDiff(oldDataTable, newDataTable);
    diffChart.draw(diffDataTable, config.options);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = diffpiechart;
},{}],43:[function(require,module,exports){
/**
 *
 * @param userConfig A user supplied configuration object which will override the defaults.
 * @returns {DexComponent} Returns the Axis object.
 * @constructor
 *
 */
var piechart = function (userConfig) {

  // Todo: Mouseover events to communicate with other charting components.
  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'PieChart',
    'class'      : 'PieChart',
    // Our data...
    'csv'        : {
      'header' : ["Task", "Hours per Day"],
      'data'   : [
        ['Work', 8],
        ['Eat', 2],
        ['Watch TV', 1],
        ['Sleep', 7],
        ['Chores', 2],
        ['Code', 4]
      ]
    },
    'resizeable' : true,
    'title'      : "title",
    'options'    : {}
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizeable) {
      var config = chart.config;
      var target = (config.parent && config.parent[0] == '#') ?
        config.parent.substring(1) : config.parent;
      var targetNode = document.getElementById(target);

      while (targetNode.firstChild) {
        targetNode.removeChild(targetNode.firstChild);
      }

      var width = targetNode.clientWidth;
      var height = targetNode.clientHeight;
      //dex.console.log("google.PieChart Resize: " + width + "x" + height);
      //var width = d3.select(chart.config.parent).property("clientWidth");
      //var height = d3.select(chart.config.parent).property("clientHeight");
      //chart.attr("width", width).attr("height", height).update();
      chart.update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;

    var data = dex.matrix.copy(config.csv.data);
    data.unshift(dex.array.copy(config.csv.header));
    dex.console.log("google.PieChart Data:", data, "Options", config.options);

    var dataTable = google.visualization.arrayToDataTable(data);

    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    var chart = new google.visualization.PieChart(
      document.getElementById(target));

    chart.draw(dataTable, config.options);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable().zIndex(0);
  });

  return chart;
};

module.exports = piechart;
},{}],44:[function(require,module,exports){
/**
 *
 * @param userConfig A user supplied configuration object which will override the defaults.
 * @returns {DexComponent} Returns the Axis object.
 * @constructor
 *
 */
var timeline = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'Timeline',
    'class'      : 'Timeline',
    // Our data...
    'csv'        : {
      'header' : ["President", "Start", "End"],
      'data'   : [
        ['Washington', '3/29/1789', '2/3/1797'],
        ['Adams', '2/3/1797', '2/3/1801'],
        ['Jefferson', '2/3/1801', '2/3/1809']
      ]
    },
    'resizeable' : true,
    'title'      : "Timeline",
    'options'    : {}
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizeable || isNaN(chart.config.height) ||
      isNaN(chart.config.width)) {
      var config = chart.config;
      var target = (config.parent && config.parent[0] == '#') ?
        config.parent.substring(1) : config.parent;
      var targetElt = document.getElementById(target);

      var width = targetElt.clientWidth;
      var height = targetElt.clientHeight;
      dex.console.log("google.Timeline Resize: " + width + "x" + height);
      //var width = d3.select(chart.config.parent).property("clientWidth");
      //var height = d3.select(chart.config.parent).property("clientHeight");
      //chart.attr("width", width).attr("height", height).update();
      chart.update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;

    // Guessing types, then setting the category column to the first
    // string.  The fromIndex to the first occurrence of a 'date' type
    // and toIndex to the second occurrence of a 'date' type.
    //
    // If the data does not contain at least a string and two dates, it
    // will chart nothing.
    var categoryIndex;
    var fromIndex;
    var toIndex;

    var types = dex.csv.guessTypes(config.csv);

    categoryIndex = types.indexOf('string');
    fromIndex = types.indexOf('date');
    toIndex = types.indexOf('date', fromIndex + 1);

    if (categoryIndex == -1 || fromIndex == -1 || toIndex == -1) {
      return;
    }

    var chartCsv = dex.csv.columnSlice(config.csv, [categoryIndex, fromIndex, toIndex]);
    var data = chartCsv.data;
    data.unshift(dex.array.copy(chartCsv.header));
    dex.console.log("google.PieChart Data:", data, "Options", config.options);

    var dataTable = google.visualization.arrayToDataTable(data);

    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    var chart = new google.visualization.Timeline(
      document.getElementById(target));

    chart.draw(dataTable, config.options);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = timeline;
},{}],45:[function(require,module,exports){
/**
 *
 * @param userConfig A user supplied configuration object which will override the defaults.
 * @returns {DexComponent} Returns the Axis object.
 * @constructor
 *
 */
var wordtree = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'WordTree',
    'class'      : 'WordTree',
    // Our data...
    'csv'        : {
      'header' : ["LINE"],
      'data'   : [
        ['Now is the time for all good men to fight.'],
        ['Now is the time for all good men to flee.'],
        ['Now is not the time.']
      ]
    },
    'resizeable' : true,
    'options'    : {
      'wordtree' : {
        'format' : 'implicit'
      }
    }
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizeable) {
      var config = chart.config;
      var target = (config.parent && config.parent[0] == '#') ?
        config.parent.substring(1) : config.parent;
      var targetElt = document.getElementById(target);

      var width = targetElt.clientWidth;
      var height = targetElt.clientHeight;
      dex.console.log("google.WordTree Resize: " + width + "x" + height);
      //var width = d3.select(chart.config.parent).property("clientWidth");
      //var height = d3.select(chart.config.parent).property("clientHeight");
      //chart.attr("width", width).attr("height", height).update();
      chart
        //.attr("options.height", height)
        //.attr("options.width", width)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;
    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    var phrases = [["Phrases"]];
    config.csv.data.forEach(function (row) {
      row.forEach(function (col) {
        phrases.push([col.toLowerCase()]);
      })
    });

    dex.console.log("PHRASES", phrases);

    var data = google.visualization.arrayToDataTable(phrases);

    var chart = new google.visualization.WordTree(
      document.getElementById(target));
    chart.draw(data, config.options);
  };

  $(document).ready(function () {

    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = wordtree;
},{}],46:[function(require,module,exports){
/**
 *
 * This module provides routines for dealing with arrays.
 *
 * @module dex/charts/google
 * @name google
 * @memberOf dex.charts
 *
 */
var google = {};

google.DiffBarChart = require("./DiffBarChart");
google.DiffPieChart = require("./DiffPieChart");
google.PieChart = require("./PieChart");
google.Timeline = require("./Timeline");
google.WordTree = require("./WordTree");

module.exports = google;
},{"./DiffBarChart":41,"./DiffPieChart":42,"./PieChart":43,"./Timeline":44,"./WordTree":45}],47:[function(require,module,exports){
var scatterplot = function (userConfig) {
  var defaults = {
    // The parent container of this chart.
    'parent'  : null,
    // Set these when you need to CSS style components independently.
    'id'      : 'ScatterPlot3D',
    'class'   : 'ScatterPlot3D',
    // Our data...
    'csv'     : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [[0, 0, 0], [1, 1, 1], [2, 4, 8], [3, 9, 27]]
    },
    'width'   : 400,
    'height'  : 400,
    'xoffset' : 20,
    'yoffset' : 0
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function () {
    this.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    var bounds =
    {
      'maxx' : dex.matrix.max(csv.data, 0),
      'minx' : dex.matrix.min(csv.data, 0),
      'maxy' : dex.matrix.max(csv.data, 1),
      'miny' : dex.matrix.min(csv.data, 1),
      'maxz' : dex.matrix.max(csv.data, 2),
      'minz' : dex.matrix.min(csv.data, 2)
    };

    var i, j;

// <!--
    function mousewheel(event) {
      var fovMAX = 160;
      var fovMIN = 1;

      camera.fov -= event.wheelDeltaY * 0.05;
      camera.fov = Math.max(Math.min(camera.fov, fovMAX), fovMIN);
      camera.projectionMatrix = new THREE.Matrix4().makePerspective(camera.fov, config.width / config.height, camera.near, camera.far);
    }

    function generateTexture() {
      // draw a circle in the center of the canvas
      var size = 128;

      // create canvas
      var canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      // get context
      var context = canvas.getContext('2d');

      // draw circle
      var centerX = size / 2;
      var centerY = size / 2;
      var radius = size / 2;

//var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
//        gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
//        gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
//        gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
//        gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      //context.fillStyle = gradient;
      //context.fillRect( 0, 0, canvas.width, canvas.height );
      context.fillStyle = "#FFFFFF";
      context.fill();

      return canvas;
    }

    function createTextCanvas(text, color, font, size) {
      size = size || 24;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var fontStr = (size + 'px ') + (font || 'Arial');
      ctx.font = fontStr;
      var w = ctx.measureText(text).width;
      var h = Math.ceil(size);
      canvas.width = w;
      canvas.height = h;
      ctx.font = fontStr;
      ctx.fillStyle = color || 'black';
      ctx.fillText(text, 0, Math.ceil(size * 0.8));
      return canvas;
    }

    function createText2D(text, color, font, size, segW, segH) {
      var canvas = createTextCanvas(text, color, font, size);
      var plane = new THREE.PlaneGeometry(canvas.width, canvas.height, segW, segH);
      var tex = new THREE.Texture(canvas);
      tex.needsUpdate = true;
      var planeMat = new THREE.MeshBasicMaterial({
        map : tex, color : 0xffffff, transparent : true
      });
      var mesh = new THREE.Mesh(plane, planeMat);
      mesh.scale.set(0.25, 0.25, 0.25);
      mesh.doubleSided = true;
      return mesh;
    }

    var maxRange = Math.max(Math.max(bounds.maxx - bounds.minx, bounds.maxy - bounds.miny),
      bounds.maxz - bounds.minz);
    var renderer = new THREE.WebGLRenderer({antialias : true});
    var w = config.width;
    var h = config.height;
    renderer.setSize(w, h);

//document.body.appendChild(renderer.domElement);
    config.parent.appendChild(renderer.domElement);

    renderer.setClearColorHex(0xEEEEEE, 1.0);

//var camera = new THREE.PerspectiveCamera(45, w/h, 1, 1000 );
    var camera = new THREE.PerspectiveCamera(45, w / h, 1, 100000);
//var camera = new THREE.OrthographicCamera( w / - 2, w / 2, h / 2, h / - 2, 1, h );
    camera.position.z = bounds.maxz * 4;
    camera.position.x = 0;
    camera.position.y = bounds.maxy * 1.25;

    var scene = new THREE.Scene();
//scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.000005 );

    var scatterPlot = new THREE.Object3D();
    scene.add(scatterPlot);

    scatterPlot.rotation.y = 0.5;
    function v(x, y, z) {
      return new THREE.Vertex(new THREE.Vector3(x, y, z));
    }

//var lineGeo = new THREE.CubeGeometry(bounds.maxx - bounds.maxx, bounds.maxy - bounds.miny,
//  bounds.maxz - bounds.minz);

    var xAxisGeo = new THREE.Geometry();
    var yAxisGeo = new THREE.Geometry();
    var zAxisGeo = new THREE.Geometry();
    var boundaryGeo = new THREE.Geometry();

    xAxisGeo.vertices.push(v(bounds.minx, 0, 0), v(bounds.maxx, 0, 0));
    yAxisGeo.vertices.push(v(0, bounds.miny, 0), v(0, bounds.maxy, 0));
    zAxisGeo.vertices.push(v(0, 0, bounds.minz), v(0, 0, bounds.maxz));
    boundaryGeo.vertices.push(
      v(bounds.minx, bounds.maxy, bounds.minz), v(bounds.maxx, bounds.maxy, bounds.minz),
      v(bounds.minx, bounds.miny, bounds.minz), v(bounds.maxx, bounds.miny, bounds.minz),
      v(bounds.minx, bounds.maxy, bounds.maxz), v(bounds.maxx, bounds.maxy, bounds.maxz),
      v(bounds.minx, bounds.miny, bounds.maxz), v(bounds.maxx, bounds.miny, bounds.maxz),

      v(bounds.minx, 0, bounds.maxz), v(bounds.maxx, 0, bounds.maxz),
      v(bounds.minx, 0, bounds.minz), v(bounds.maxx, 0, bounds.minz),
      v(bounds.minx, bounds.maxy, 0), v(bounds.maxx, bounds.maxy, 0),
      v(bounds.minx, bounds.miny, 0), v(bounds.maxx, bounds.miny, 0),

      v(bounds.maxx, bounds.miny, bounds.minz), v(bounds.maxx, bounds.maxy, bounds.minz),
      v(bounds.minx, bounds.miny, bounds.minz), v(bounds.minx, bounds.maxy, bounds.minz),
      v(bounds.maxx, bounds.miny, bounds.maxz), v(bounds.maxx, bounds.maxy, bounds.maxz),
      v(bounds.minx, bounds.miny, bounds.maxz), v(bounds.minx, bounds.maxy, bounds.maxz),

      v(0, bounds.miny, bounds.maxz), v(0, bounds.maxy, bounds.maxz),
      v(0, bounds.miny, bounds.minz), v(0, bounds.maxy, bounds.minz),
      v(bounds.maxx, bounds.miny, 0), v(bounds.maxx, bounds.maxy, 0),
      v(bounds.minx, bounds.miny, 0), v(bounds.minx, bounds.maxy, 0),

      v(bounds.maxx, bounds.maxy, bounds.minz), v(bounds.maxx, bounds.maxy, bounds.maxz),
      v(bounds.maxx, bounds.miny, bounds.minz), v(bounds.maxx, bounds.miny, bounds.maxz),
      v(bounds.minx, bounds.maxy, bounds.minz), v(bounds.minx, bounds.maxy, bounds.maxz),
      v(bounds.minx, bounds.miny, bounds.minz), v(bounds.minx, bounds.miny, bounds.maxz),

      v(bounds.minx, 0, bounds.minz), v(bounds.minx, 0, bounds.maxz),
      v(bounds.maxx, 0, bounds.minz), v(bounds.maxx, 0, bounds.maxz),
      v(0, bounds.maxy, bounds.minz), v(0, bounds.maxy, bounds.maxz),
      v(0, bounds.miny, bounds.minz), v(0, bounds.miny, bounds.maxz)
    );

    var xAxisMat = new THREE.LineBasicMaterial({color : 0xff0000, lineWidth : 1});
    var xAxis = new THREE.Line(xAxisGeo, xAxisMat);
    xAxis.type = THREE.Lines;
    scatterPlot.add(xAxis);

    var yAxisMat = new THREE.LineBasicMaterial({color : 0x0000ff, lineWidth : 1});
    var yAxis = new THREE.Line(yAxisGeo, yAxisMat);
    yAxis.type = THREE.Lines;
    scatterPlot.add(yAxis);

    var zAxisMat = new THREE.LineBasicMaterial({color : 0x00ff00, lineWidth : 1});
    var zAxis = new THREE.Line(zAxisGeo, zAxisMat);
    zAxis.type = THREE.Lines;
    scatterPlot.add(zAxis);

    var boundaryMat = new THREE.LineBasicMaterial({color : 0x090909, lineWidth : 1, transparent : true});
    var boundary = new THREE.Line(boundaryGeo, boundaryMat);
    boundary.type = THREE.Lines;
    scatterPlot.add(boundary);

    var fontSize = Math.max(Math.round(maxRange / 4), 8);
    var fontOffset = Math.min(Math.round(fontSize / 4), 8);
    console.log("OFFSET: " + fontOffset);
    console.log("  FONT: " + fontSize);

    var titleX = createText2D("-" + csv.header[0], new THREE.Color().setRGB(1, 0, 0), "", fontSize);
    titleX.position.x = bounds.minx - fontOffset;
    scatterPlot.add(titleX);

    var titleX = createText2D(csv.header[0], new THREE.Color().setRGB(1, 0, 0), "", fontSize);
    titleX.position.x = bounds.maxx + fontOffset;
    scatterPlot.add(titleX);

    var titleY = createText2D('-' + csv.header[1], new THREE.Color().setRGB(1, 0, 0), "", fontSize);
    titleY.position.y = bounds.miny - fontOffset;
    scatterPlot.add(titleY);

// (text, color, font, size, segW, segH)
    var titleY = createText2D(csv.header[1], new THREE.Color().setRGB(1, 0, 0), "", fontSize);
    titleY.position.y = bounds.maxy + fontOffset;
    scatterPlot.add(titleY);

    var titleZ = createText2D('-' + csv.header[2], new THREE.Color().setRGB(1, 0, 0), "", fontSize);
    titleZ.position.z = bounds.minz - fontOffset;
    scatterPlot.add(titleZ);

    var titleZ = createText2D(csv.header[2], new THREE.Color().setRGB(1, 0, 0), "", fontSize);
    titleZ.position.z = bounds.maxz + fontOffset;
    scatterPlot.add(titleZ);

    attributes = {

      size        : {type : 'f', value : []},
      customColor : {type : 'c', value : []}

    };

    uniforms =
    {
      amplitude : {type : "f", value : 1.0},
      color     : {type : "c", value : new THREE.Color(0xff0000)}
      //texture: { type: "t", value: THREE.ImageUtils.loadTexture( "textures/ball.png" ) },
    };

    var texture = new THREE.Texture(generateTexture());
    texture.needsUpdate = true; // important

//var mat = new THREE.ParticleBasicMaterial({vertexColors:true, size: 1});
//var mat = new THREE.ParticleBasicMaterial( { blending: THREE.AdditiveBlending, vertexColors: true, size: 1, map: THREE.ImageUtils.loadTexture( 'textures/ball.png' ) } );
//var mat = new THREE.ParticleBasicMaterial({vertexColors:true, size: 1});
//var mat = new THREE.ParticleCanvasMaterial( { size: 50, map: new THREE.Texture( generateSprite() ), blending: THREE.AdditiveBlending } );
    var mat = new THREE.ParticleBasicMaterial(
      {
        size         : Math.max(maxRange / 25, 1),
        map          : texture,
        blending     : THREE.AdditiveBlending, // required
        depthTest    : false, // required
        transparent  : false,
        opacity      : 0.7,
        vertexColors : true // optional
      });

    var pointGeo = new THREE.Geometry();

//var pointCount = 1000;

    var colors =
      [
        new THREE.Color().setRGB(1, 0, 0),
        new THREE.Color().setRGB(0, 0, 1),
        new THREE.Color().setRGB(0, 1, 0),
        new THREE.Color().setRGB(1, 0, 1),
        new THREE.Color().setRGB(1, 1, 0),
        new THREE.Color().setRGB(0, 1, 1),
        new THREE.Color().setRGB(.5, .5, .5)
      ];

    for (i = 0; i < csv.data.length; i++) {
      //var x = Math.random() * 100 - 50;
      //var y = x*0.8+Math.random() * 20 - 10;
      //var z = x*0.7+Math.random() * 30 - 15;

      for (j = 2; j < csv.header.length; j++) {
        pointGeo.vertices.push(new THREE.Vertex(new THREE.Vector3(csv.data[i][0], csv.data[i][1], csv.data[i][j])));
        pointGeo.colors.push(colors[(j - 2) % colors.length]);
      }
    }

    var points = new THREE.ParticleSystem(pointGeo, mat);
    scatterPlot.add(points);

//camera.lookAt( scatterPlot );
//camera.target.position.copy( scatterPlot );

    renderer.render(scene, camera);
    var paused = false;
    var last = new Date().getTime();
    var down = false;
    var sx = 0, sy = 0;
    window.onmousedown = function (ev) {
      down = true;
      sx = ev.clientX;
      sy = ev.clientY;
    };

    window.addEventListener('DOMMouseScroll', mousewheel, false);
    window.addEventListener('mousewheel', mousewheel, false);

    window.onmouseup = function () {
      down = false;
    };
    window.onmousemove = function (ev) {
      if (down) {
        var dx = ev.clientX - sx;
        var dy = ev.clientY - sy;
        scatterPlot.rotation.y += dx * 0.01;
        camera.position.y += dy;
        sx += dx;
        sy += dy;
      }
    };

    var animating = false;
    window.ondblclick = function () {
      animating = !animating;
    };
    function animate(t) {
      if (!paused) {
        last = t;
        if (animating) {
          var v = pointGeo.vertices;
          for (i = 0; i < v.length; i++) {
            var u = v[i];
            u.angle += u.speed * 0.01;
            u.position.x = Math.cos(u.angle) * u.radius;
            u.position.z = Math.sin(u.angle) * u.radius;
          }
          pointGeo.__dirtyVertices = true;
        }
        renderer.clear();
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }
      window.requestAnimationFrame(animate, renderer.domElement);
    };
    animate(new Date().getTime());
    onmessage = function (ev) {
      paused = (ev.data == 'pause');
    };
//-->

  };

  return chart;
};

module.exports = scatterplot;
},{}],48:[function(require,module,exports){
/**
 *
 * This module provides ThreeJS/WebGL based visualization components.
 *
 * @module dex/charts/threejs
 * @name d3plus
 * @memberOf dex.charts
 *
 */
var threejs = {};

threejs.ScatterPlot = require("./ScatterPlot");

module.exports = threejs;
},{"./ScatterPlot":47}],49:[function(require,module,exports){
/**
 *
 * This module provides routines for dealing with colors.
 *
 * @module dex/color
 * @name color
 * @memberOf dex
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

},{}],50:[function(require,module,exports){
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
},{}],51:[function(require,module,exports){
/**
 *
 * Config module.
 * @module dex/config
 * @name config
 * @memberOf dex
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
},{}],52:[function(require,module,exports){
/**
 *
 * This module provides console logging capabilities.
 *
 * @module dex/console
 * @name console
 * @memberOf dex
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

},{}],53:[function(require,module,exports){
/**
 *
 * This module provides support for dealing with csv structures.  This
 * is the core datatype on which dexjs components operate.
 *
 * @module dex/csv
 * @name csv
 * @memberOf dex
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
},{}],54:[function(require,module,exports){
/**
 *
 * This module provides support for creating various datasets.
 *
 * @module dex/datagen
 * @name datagen
 * @memberOf dex
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

},{}],55:[function(require,module,exports){
/**
 *
 * The main dexjs module.
 *
 * @module dex
 * @name dex
 *
 * @requires d3
 * @requires jquery
 * @requires jquery-ui
 * @requires underscore
 *
 */
var dex = {};

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
 * A module for dealing with arrays.
 *
 * @name array
 * @type {module:dex.array}
 *
 */
dex.array = require('./array/array');

/**
 * A module for dealing with colors.
 *
 * @name color
 * @type {module:dex.color}
 *
 */
dex.color = require("./color/color");

/**
 *
 * A module for configuring things.
 *
 * @name config
 * @type {module:dex.config}
 *
 */
dex.config = require("./config/config");

/**
 *
 * A module for logging to the console.
 *
 * @name console
 * @type {module:dex.console}
 *
 */
dex.console = require("./console/console");

/**
 *
 * A module for handling CSV data structures.
 *
 * @name csv
 * @type {module:dex.csv}
 *
 */
dex.csv = require("./csv/csv");

/**
 *
 * A module providing utilities for data generation.
 *
 * @name datagen
 * @type {module:dex.datagen}
 *
 */
dex.datagen = require("./datagen/datagen");

/**
 *
 * A module for dealing with JSON data.
 *
 * @name json
 * @type {module:dex.json}
 *
 */
dex.json = require("./json/json");

/**
 * A module for dealing with matrices.
 *
 * @name matrix
 * @type {module:dex/matrix}
 *
 */
dex.matrix = require("./matrix/matrix");

/**
 * @module dex/object
 */
dex.object = require("./object/object");

/**
 *
 * A module for creating ui components such as players and sliders.
 *
 * @name ui
 * @type {module:ui}
 *
 */
dex.ui = require("./ui/ui");

/**
 *
 * A module for dealing dex components.
 *
 * @name component
 * @type {module:component}
 *
 */
dex.component = require("./component/component");

/**
 *
 * An overall charting module composed of many sub-modules.
 *
 * @name charts
 * @type {module:charts}
 *
 */
dex.charts = require("./charts/charts");

module.exports = dex;
},{"../lib/pubsub":1,"./array/array":2,"./charts/charts":9,"./color/color":49,"./component/component":50,"./config/config":51,"./console/console":52,"./csv/csv":53,"./datagen/datagen":54,"./json/json":56,"./matrix/matrix":57,"./object/object":58,"./ui/ui":68}],56:[function(require,module,exports){
/**
 *
 * This module provides routines dealing with json data.
 *
 * @module dex/json
 * @name json
 * @memberOf dex
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

},{}],57:[function(require,module,exports){
/**
 *
 * This module provides routines dealing with matrices.
 *
 * @module dex/matrix
 * @name matrix
 * @memberOf dex
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

},{}],58:[function(require,module,exports){
/**
 *
 * This module provides routines dealing with javascript objects.
 *
 * @module dex/object
 * @name object
 * @memberOf dex
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

},{}],59:[function(require,module,exports){
/**
 *
 * This class creates and attaches a SqlQuery user interface onto the
 * parent node.
 *
 * @name dex.ui.SqlQuery
 * @param userConfig The following configuration options are available for configuring the
 * behavior of the SqlQuery component.<br><br>
 *
 * 'parent' : The default
 *
 * @returns {SqlQuery}
 *
 * @constructor
 *
 */
var sqlquery = function (userConfig) {

  var defaults =
  {
    'parent' : '#SqlQuery', // The parent container of this chart.
    // Set these when you need to CSS style components independently.
    'id'     : 'SqlQuery',
    'class'  : 'SqlQuery',
    'query'  : 'select * from dex;',
    // Our data...
    'csv'    : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    }
  };

  var chart = new dex.component(userConfig, defaults);
  var config = config;

  var sql = window.SQL;
  var db = new sql.Database();

  chart.render = function () {
    // Create the table only at render time.
    var createStr = "create table dex(" + csv.header.map(function (h, i) {
        var colName = h.trim();
        return "'" + colName + "' " + ((dex.csv.isColumnNumeric(csv, i)) ? "float" : "text");
      }).join(",") + ")";
    console.log("CREATESTR: " + createStr);
    db.exec("drop table if exists dex;");
    db.exec(createStr);

    var populateSql = "BEGIN;" + csv.data.map(function (row) {
        var insertStr =
          "insert into dex values(" + row.map(function (col) {
            return "'" + col.replace("'", "") + "'";
          }).join(",") + ");";
        //console.log(insertStr);
        //db.exec(insertStr);
        return insertStr;
      }).join("") + "COMMIT;";
    console.log(populateSql);
    db.exec(populateSql);
    chart.update();
  };

  chart.query = function (query) {
    var csv = [];
    var myQuery = chart.attr("query");
    if (query && query.length > 0) {
      myQuery = query;
    }
    console.log("QUERY: " + myQuery);

    csv.header = [];
    csv.data = [];

    var rs = db.exec(myQuery);

    console.log("RS:");
    console.dir(rs);
    csv.header = rs[0].columns.map(function (s) {
      return s.trim();
    });
    csv.data = rs[0].values;

    console.log(csv);
    return csv;
  }

  chart.update = function () {
  };

  return chart;
};

module.exports = sqlquery;
},{}],60:[function(require,module,exports){
/**
 *
 * @constructor
 * @classdesc This class constructs an html table from the supplied CSV data.
 * @memberOf dex/ui
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var myTable = new dex.ui.Table({
 *   'parent' : "#MyTableContainer",
 *   'id'     : "MyTableId"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} [userConfig.parent=#Table] - The parent node to which this component will be attached.
 * Ex: #MyParent will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Table] - The id of this component.
 * @param {string} [userConfig.class=Table] - The class of this component.
 * @param {csv} userConfig.csv - The user's CSV data.
 *
 */
var table = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent' : '#Table',
    // Set these when you need to CSS style components independently.
    'id'     : 'Table',
    'class'  : 'Table',
    // Our data...
    'csv'    : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    }
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    chart.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll("#" + config.id).remove();

    var table = d3.select(config.parent)
      .append("table")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("border", 1)
      .attr("class", config["class"])
      .attr("id", config["id"]);

    var thead = table.append("thead");
    var tbody = table.append("tbody");

    thead.append("tr")
      .selectAll("th")
      .data(csv.header)
      .enter()
      .append("th")
      .text(function (column) {
        return column;
      });

    var rows = tbody.selectAll("tr")
      .data(csv.data)
      .enter()
      .append("tr");

    var cells = rows.selectAll("td")
      .data(function (row) {
        return csv.header.map(function (column, i) {
          return {column : i, value : row[i]};
        });
      })
      .enter()
      .append("td")
      .html(function (d) {
        return d.value;
      });
  };

  return chart;
};

module.exports = table;
},{}],61:[function(require,module,exports){
var typestable = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent' : '#Table',
    // Set these when you need to CSS style components independently.
    'id'     : 'Table',
    'class'  : 'Table',
    // Our data...
    'csv'    : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    }
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function () {
    chart.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var types = dex.csv.guessTypes(config.csv);
    var csv = dex.csv.copy(config.csv);

    d3.selectAll("#" + config.id).remove();

    var table = d3.select(config.parent)
      .append("table")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("border", 1)
      .attr("class", config["class"])
      .attr("id", config["id"]);

    var thead = table.append("thead");
    var tbody = table.append("tbody");

    thead.append("tr")
      .selectAll("th")
      .data(csv.header)
      .enter()
      .append("th")
      .text(function (column, i) {
        return column + " (" + types[i] + ")";
      });

    var rows = tbody.selectAll("tr")
      .data(csv.data)
      .enter()
      .append("tr");

    var cells = rows.selectAll("td")
      .data(function (row) {
        return csv.header.map(function (column, i) {
          return {
            column : i,
            value  : row[i]
          };
        });
      })
      .enter()
      .append("td")
      .html(function (d) {
        return d.value;
      });
  };

  return chart;
};

module.exports = typestable;
},{}],62:[function(require,module,exports){
var configurationbox = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent'     : 'body',
    // Set these when you need to CSS style components independently.
    'id'         : 'ConfigurationBox',
    'class'      : 'ui-widget-content',
    'width'      : 600,
    'height'     : 100,
    'xoffset'    : 10,
    'yoffset'    : 10,
    'title'      : "Options",
    'components' : [],
    'resizable' : true,
    'draggable'  : true
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function () {
    var chart = this;
    var config = chart.config;
    var i;

    var chartContainer = $(config.parent);

    chart.main =
      jQuery('<div/>',
        {
          'id'    : config['id'],
          'class' : config['class']
        }).appendTo(chartContainer);

    for (i = 0; i < config.components.length; i++) {
      config.components[i].attr('parent', chart.main);
      config.components[i].render();
    }
    chart.main.css('width', config.width);
    chart.main.css('height', config.height);
    //chart.main.css('top', '-400px');
    chart.update();
  };

  chart.update = function () {
    var chart = this,
      config = chart.config,
      ri, ci;

    jQuery('<h3/>',
      {
        'class' : 'ui-widget-header',
        'text'  : config.title
      }).appendTo(chart.main);

    for (ci = 0; ci < config.components.length; ci += 1) {
      config.components[ci].update();
      //dex.console.log("CMP", config.components[ci], "DOM", config.components[ci].dom());
      config.components[ci].dom().appendTo(chart.main);
    }

    config.resizable && $("#" + config.id).resizable();
    config.draggable && $("#" + config.id).draggable();
  };

  chart.dom = function () {
    return chart.main;
  };

  chart.add = function (components) {
    var chart = this,
      config = chart.config,
      i;

    for (i = 0; i < arguments.length; i += 1) {
      config.components.push(arguments[i]);
    }
    return chart;
  };

  return chart;
};

module.exports = configurationbox;
},{}],63:[function(require,module,exports){
var player = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent': null,
    // Set these when you need to CSS style components independently.
    'id': 'Player',
    'class': 'ui-widget-content',
    'width': 600,
    'height': 100,
    'delay': 1000,
    'frameIndex': 0,
    'csv': {
      header : ['C1', 'C2', 'C3' ],
      data : [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5]
      ]
    }
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;
  var frames = dex.csv.getFramesByIndex(config.csv, config.frameIndex);
  var frameNum = 0;
  chart.attr("frames", frames);

  chart.render = function () {
    var timer;
    var state = "stopped";
    frames = dex.csv.getFramesByIndex(config.csv, config.frameIndex);
    dex.console.log(frames);
    chart.attr("frames", frames);

    dex.console.log("FRAMES:", frames);

    $(function () {
      $("#beginning").button({
        text: false,
        icons: {
          primary: "ui-icon-seek-start"
        }
      }).click(function () {
        gotoFrame(0);
      });
      $("#previous").button({
        text: false,
        icons: {
          primary: "ui-icon-seek-prev"
        }
      }).click(function () {
        previous();
      });
      $("#play").button({
          text: false,
          icons: {
            primary: "ui-icon-play"
          }
        })
        .click(function () {
          var options;
          if ($(this).text() === "play") {
            options = {
              label: "pause",
              icons: {
                primary: "ui-icon-pause"
              }
            };
            play();
          } else {
            options = {
              label: "play",
              icons: {
                primary: "ui-icon-play"
              }
            };

            clearTimeout(timer);
          }
          $(this).button("option", options);
        });
      $("#next").button({
        text: false,
        icons: {
          primary: "ui-icon-seek-next"
        }
      }).click(function () {
        next();
      });
      $("#end").button({
        text: false,
        icons: {
          primary: "ui-icon-seek-end"
        }
      }).click(function () {
        gotoFrame(frames.frames.length-1);
      });
    });

    function play() {
      frameNum++;
      gotoFrame((frameNum >= frames.frameIndices.length) ? 0 : frameNum);

      // Set a timer for playing the next frame.
      timer = setTimeout(play, config.delay);
    }

    gotoFrame(0);
  };

  chart.update = function () {
    frames = dex.csv.getFramesByIndex(config.csv, config.frameIndex);
    chart.attr("frames", frames);
    gotoFrame(0);
  };

  function previous() {
    gotoFrame(frameNum > 0 ? (frameNum-1) : 0)
  }

  function next() {
    gotoFrame((frameNum + 1) % frames.frameIndices.length);
  }

  function gotoFrame(frameIndex) {
    frameNum = frameIndex;
    chart.publish({
      "type"  : "new-frame",
      "data"  : frames.frames[frameNum],
      "name"  : frames.frameIndices[frameNum],
      "frameBy" : csv.header[config.frameIndex] }
    );
    dex.console.log("Displaying frame: " + frameNum);
  }

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = player;
},{}],64:[function(require,module,exports){
var selectable = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent'    : null,
    // Set these when you need to CSS style components independently.
    'id'        : 'Selectable',
    'class'     : 'Selectable',
    'width'     : 200,
    'height'    : 100,
    'xoffset'   : 10,
    'yoffset'   : 10,
    'label'     : "",
    'selection' : ["X", "Y"],
    'mode'      : "SINGLE",
    'options'   : {}
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    var chart = this,
      config = chart.config,
      i;

    dex.console.debug("RENDERING: " + config.id);

    if (config.mode == "SINGLE") {
      chart.attr('options.stop',
        function (event, ui) {
          $(event.target).children('.ui-selected').not(':first').removeClass('ui-selected');
        }
      );
    }

    chart.attr('options.selected',
      function (event, ui) {
        chart.publish({'type' : 'selected', 'id' : ui.selected.id});
      });

    chart.attr('options.unselected',
      function (event, ui) {
        chart.publish({'type' : 'unselected', 'id' : ui.unselected.id});
      });

    // Create the main container.
    chart.main = jQuery('<div/>',
      {
        'id'    : config['id'],
        'class' : config['class']
      }).appendTo(config['parent']);

    // Create the main container.
    var label = jQuery('<div/>',
      {
        'id'   : config['id'] + '-label',
        'text' : config['label']
      }).appendTo(chart.main);

    // Create the main container.
    var orderedList = jQuery('<ol/>',
      {
        'id' : config['id'] + '-ol'
      }).appendTo(chart.main);

    orderedList.css('overflow', "scroll");
    orderedList.css('border', "1px solid black");
    orderedList.css('height', config.height + "px");
    orderedList.css('width', config.width + "px");

    for (i = 0; i < config.selection.length; i++) {
      var selectable = jQuery('<li/>',
        {
          'id'    : i,
          'class' : 'ui-widget-content',
          'text'  : config.selection[i]
        }).appendTo(orderedList);
    }

    $('#' + config['id'] + '-ol').children().first().addClass('ui-selected');
    $('#' + config['id'] + '-ol').selectable(config.options);
  };

  chart.update = function () {
  };

  chart.dom = function () {
    return chart.main;
  };

  return chart;
};

module.exports = selectable;
},{}],65:[function(require,module,exports){
var slider = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'  : null,
    // Set these when you need to CSS style components independently.
    'id'      : 'Slider',
    'class'   : 'ui-widget-content',
    'width'   : 600,
    'height'  : 100,
    'xoffset' : 10,
    'yoffset' : 10,
    'label'   : "",
    'options' : {
      'range' : 'max',
      'min'   : 1,
      'max'   : 10,
      'value' : 5,
      'slide' : null
    }
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    var chart = this,
      config = chart.config,
      ri, ci;

    var chart = this;
    chart.attr('options.slide',
      function (event, ui) {
        //dex.console.log("EVENT", event, "UI", ui);
        $('#' + config['id'] + '-input').val(ui.value);
        chart.publish("slider-change", {'type' : 'slider-change', 'value' : ui.value});
      });

    // Create the main container.
    chart.main = jQuery('<div/>',
      {
        'id'    : config['id'],
        'class' : config['class']
      }).appendTo(config['parent']);

    // Create the main container.
    var label = jQuery('<label/>',
      {
        'id'    : config['id' + '-label'],
        'class' : 'SliderLabel',
        'text'  : config['label'],
      }).appendTo(chart.main);

    var input = jQuery('<input/>',
      {
        'type'  : 'text',
        'id'    : config['id'] + '-input',
        'class' : 'SliderInput',
        'value' : config.options.value
      }).appendTo(chart.main);

    /*
     <div>
     <label for="ticklength">Tick Length:</label>
     <input type="text" id="ticklength-input" size="5" />
     <div id="ticklength-slider"/>
     </div>
     */
    // Create the main container.
    var slider = jQuery('<div/>',
      {
        'id'    : config['id'] + '-slider',
        'class' : config['class']
      }).appendTo(chart.main);

    //config.parent.appendChild(main);

    $('#' + config['id'] + '-slider').slider(config.options);
  };

  chart.update = function () {
  };

  chart.dom = function () {
    return chart.main;
  };

  return chart;
};

module.exports = slider;
},{}],66:[function(require,module,exports){
var tabs = function (userConfig) {
  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'Tabs',
    'class'      : 'ui-widget-content',
    'width'      : 600,
    'height'     : 100,
    'xoffset'    : 10,
    'yoffset'    : 10,
    'title'      : "Options",
    'components' : [],
    'resizeable' : true,
    'draggable'  : true
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.tabs = [];

  chart.render = function () {
    var chart = this,
      config = chart.config,
      tabs = chart.tabs,
      ri, ci,
      i, j,
      tab,
      tabName;

    // Create the main container.
    if (config.parent === null) {
      config.parent = document.body;
    }

    chart.main =
      jQuery('<div/>',
        {
          'id'    : config['id'],
          'class' : config['class']
        }).appendTo(config.parent);

    var tabNames = jQuery('<ul/>').appendTo(chart.main);

    for (i = 0; i < tabs.length; i += 1) {
      jQuery('<li><a href="#' + config.id + '-' + (i + 1) + '">' + tabs[i].name + '</a></li>')
        .appendTo(tabNames);
    }
    //dex.console.log(tabs);
    for (i = 0; i < tabs.length; i += 1) {
      var tabBody = jQuery('<div id="' + config.id + '-' + (i + 1) + '"/>').appendTo(chart.main);

      for (j = 0; j < tabs[i].children.length; j++) {
        tabs[i].children[j].attr('parent', tabBody);
        tabs[i].children[j].render();
        tabs[i].children[j].dom().appendTo(tabBody);
      }
    }

    chart.main.tabs();
  };

  chart.update = function () {
  };

  chart.dom = function () {
    return chart.main;
  };

  chart.add = function (tabName, components) {
    var chart = this,
      config = chart.config,
      tabs = chart.tabs,
      i, ti, tab;

    if (typeof tabName === 'undefined') {
      return;
    }

    dex.console.debug("TABS", chart);
    // REM: Replaced implementation w/o testing.
    ti = _.findIndex(tabs, {id : tabName});

    if (ti >= 0) {
      tab = tabs[ti];
    }
    else {
      tab = {'name' : tabName, 'children' : []};
      tabs.push(tab);
    }

    for (i = 1; i < arguments.length; i += 1) {
      tab.children.push(arguments[i]);
    }
    dex.console.debug("ATABS", tabs, tab);
    return chart;
  };

  return chart;
};

module.exports = tabs;
},{}],67:[function(require,module,exports){
/**
 *
 * This module provides ui components based upon jquery-ui.
 *
 * @module dex/ui/jqueryui
 * @name jqueryui
 * @memberOf dex.ui
 *
 */
var jqueryui = {};

jqueryui.ConfigurationBox = require("./ConfigurationBox");
jqueryui.Player = require("./Player");
jqueryui.Selectable = require("./Selectable");
jqueryui.Slider = require("./Slider");
jqueryui.Tabs = require("./Tabs");

module.exports = jqueryui;
},{"./ConfigurationBox":62,"./Player":63,"./Selectable":64,"./Slider":65,"./Tabs":66}],68:[function(require,module,exports){
/**
 *
 * This module provides ui components from a variety of sources.
 *
 * @module dex/ui
 * @name ui
 * @memberOf dex
 *
 */
var ui = {};

/**
 *
 * A module for creating ui components such as players and sliders.
 *
 * @name jqueryui
 * @type {module:jqueryui}
 *
 */
ui.jqueryui = require("./jqueryui/jqueryui");
ui.SqlQuery = require("./SqlQuery");
ui.Table = require("./Table");
ui.TypesTable = require("./TypesTable");

module.exports = ui;
},{"./SqlQuery":59,"./Table":60,"./TypesTable":61,"./jqueryui/jqueryui":67}]},{},[55])(55)
});