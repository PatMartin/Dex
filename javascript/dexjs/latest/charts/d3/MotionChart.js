dex.charts.d3.MotionChart = function (userConfig) {
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
}