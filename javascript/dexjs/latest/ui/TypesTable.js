dex.ui.TypesTable = function (userConfig) {

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

  var chart = new DexComponent(userConfig, defaults);

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


