dex.charts.d3.MotionLineChart = function (userConfig) {
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
}