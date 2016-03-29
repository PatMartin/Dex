/**
 *
 * @param userConfig A user supplied configuration object which will override the defaults.
 * @returns {DexComponent} Returns the Axis object.
 * @constructor
 *
 */
dex.charts.google.Timeline = function (userConfig) {

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
}