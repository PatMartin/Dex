/**
 * This will construct a new DygraphsLineChart with the user supplied userConfig applied.
 * @param userConfig - A user supplied configuration of the form:
 * @returns {DexComponent} The LineChart
 * @constructor
 *
 */
dex.charts.dygraphs.LineChart = function (userConfig) {
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
}
