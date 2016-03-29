dex.charts.d3.LineChart = function (userConfig) {
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
}
