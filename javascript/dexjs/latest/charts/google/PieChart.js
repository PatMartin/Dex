/**
 *
 * @param userConfig A user supplied configuration object which will override the defaults.
 * @returns {DexComponent} Returns the Axis object.
 * @constructor
 *
 */
dex.charts.google.PieChart = function (userConfig) {

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
}