/**
 *
 * @constructor
 * @classdesc This class constructs an html table from the supplied CSV data.
 * @memberOf dex
 * @implements {component}
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
dex.ui.Table = function (userConfig) {

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


