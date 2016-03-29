dex.charts.d3.HeatMap = function(userConfig) {
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
}
