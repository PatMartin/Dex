function CheckBox(userConfig) {
  var chart = new DexComponent(userConfig,
    {
      // The parent container of this chart.
      'parent': null,
      // Set these when you need to CSS style components independently.
      'id': 'CheckBox',
      'class': 'CheckBox',
      'selection': [ "X", "Y" ],
      'label': dex.config.text(
        { 'x': 24, 'y': 6 }),
      'state': {
        'selected': [ "X", "Y" ]
      },
      'selected': {
        'shape': dex.config.circle(
          {
            'center': {'x': 12, 'y': 12},
            'style': { 'color': 'white' }
          })
      },
      'columns': 6,
      // width and height of our bar chart.
      'width': 600,
      'height': 100,
      'xoffset': 10,
      'yoffset': 10
    });

  chart.render = function () {
    this.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;
    var i;
    var ri, ci;
    var curRow;

    if (config.debug) {
      console.log("===== CheckBox Configuration =====");
      console.dir(config);
    }

    var chartContainer = d3.select(config.parent).append("table")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("width", config.width)
      .attr('height', config.height)
      .attr("transform", "translate(" + config.xoffset + "," + config.yoffset + ")");

    for (i = 0; i < config.selection.length; i += 1) {
      ci = i % config.columns;
      if (ci == 0) {
        curRow = chartContainer.append("tr");
      }
      var tdg = curRow.append("td").append("svg").append("g");

      tdg.append("circle")
        .call(dex.config.configureCircle, config.selected.shape);

      tdg.append("text")
        .call(dex.config.configureText, config.label)
        .text(config.selection[i]);
    }
    /*
     chartContainer.selectAll("g")
     .data(config.selection)
     .enter().append("svg:g")
     .append("text")
     .call(dex.config.configureText, config.label)
     .attr("x", function(d, i) {return i * 10;})
     .text(function(d, i) { dex.console.log("D", d, "I", i);return d; });
     */
  };

  return chart;
}
