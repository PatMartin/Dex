dex.charts.d3.ParallelCoordinates = function (userConfig) {
  var chart;

  defaults =
  {
    'id': "ParallelCoordinates",
    'class': "ParallelCoordinates",
    'parent': null,
    'width': "100%",
    'height': "100%",
    'resizable': true,
    'color': d3.scale.category20(),
    'title': 'Parallel Coordinates',
    'csv': {
      'header': ["X", "Y"],
      'data': [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    'rows': 0,
    //'transform'       : function (d) {
    //  return 'scale(.95, .95) translate(50, 50)'
    //},
    'normalize': false,
    'margin': {
      'left': 80,
      'right': 60,
      'top': 60,
      'bottom': 20
    },
    'axis': {
      'orient': 'left'
    },
    'axis.line': dex.config.line({
      'stroke': dex.config.stroke(
        {
          'color': function (d, i) {
            return "black";
          },
          'width': 1
        }),
      'fill': {
        'fillColor': "none",
        'fillOpacity': 1.0
      }
    }),
    'axis.label': dex.config.text({
      'font': {
        'size': function (d, i) {
          var uniques = _.uniq(_.flatten(dex.matrix.slice(chart.config.csv.data, [i])));

          var maxLabelLength =
            Math.min(("" + _.max(uniques,
              function (item) {
                return ("" + item).length;
              })).length, 40);

          // No need to adjust margins, initial transform already did.
          var maxFontSizeByHeight =
            ((chart.config.height) /
            (uniques.length ? uniques.length : 1) - 2);

          var maxFontSizeByWidth =
            (((chart.config.width) /
            (chart.config.csv.header.length - 1)) / maxLabelLength);

          //dex.console.log("AXIS-FONT-SIZE: I: " + i + ", MAX-HEIGHT: " + maxFontSizeByHeight +
          //", MAX-WIDTH: " + maxFontSizeByWidth + ", MAX-LABEL-LENGTH: " + maxLabelLength);
          return Math.min(Math.max(Math.min(maxFontSizeByWidth, maxFontSizeByHeight), 4), 18);
        }
      },
      'anchor': function (d, i) {
        if (i < chart.config.csv.header.length - 1) {
          return 'end';
        }
        else {
          return 'start';
        }
      },
      'dx': function (d, i) {
        return -1 * Math.max(chart.config.axis.label.font.size(d, i) / 2, 8);
      },
      'dy': ".35em",
      'fill.fillColor': 'black',
      'fill.fillOpacity': 1,
      'events': {
        'mouseover': function (d, i) {
          d3.select(this)
            .style('fill', 'red')
            .style('fill-opacity', 1);
        },
        'mouseout': function (d, i) {
          d3.select(this)
            .style('fill', 'black')
            .style('fill-opacity', 1);
        }
      }
    }),
    'verticalLabel': dex.config.text({
      // If you want to stagger labels.
      'dy': function (d, i) {
        return (i % 2) ?
        -chart.config.margin.top * .60 :
        -chart.config.margin.top * .20;
      },
      'font.size': function (d) {
        var maxFontSizeByHeight =
          chart.config.margin.top * .5;
        var maxFontSizeByWidth =
          (chart.config.width - chart.config.margin.left - chart.config.margin.right) /
          (chart.config.csv.header.length) / 10;
        //dex.console.log("TITLE-FONT-SIZE: MAX-HEIGHT: " + maxFontSizeByHeight +
        //", MAX-WIDTH: " + maxFontSizeByWidth);
        return Math.max(Math.min(maxFontSizeByWidth, maxFontSizeByHeight), 4);
      },
      'anchor': 'middle',
      'text': function (d) {
        return d;
      },
      'events': {
        'mouseover': function (d) {
          //dex.console.log("Mouseover detected...");
        }
      }
    }),
    'selected.link': {
      'stroke': dex.config.stroke(
        {
          'color': function (d, i) {
            return chart.config.color(i);
          },
          'width': 2
        }),
      'fill': {
        'fillColor': "none",
        'fillOpacity': 1.0
      },
      'events': {
        'mouseover': function () {
          d3.select(this)
            .style("stroke-width", chart.config.selected.link.stroke.width +
              Math.max(4, (chart.config.selected.link.stroke.width / 3)))
            .style("stroke-opacity", chart.config.selected.link.stroke.opacity);
        },
        'mouseout': function () {
          d3.select(this)
            .style("stroke-width", chart.config.selected.link.stroke.width)
            .style("stroke-opacity", chart.config.selected.link.stroke.opacity);
        }
      }
    },
    'unselected.link': {
      'stroke': dex.config.stroke(
        {
          'color': function (d, i) {
            return chart.config.color(i);
          },
          'width': 1,
          'dasharray': "10 10"
        }),
      'fill': {
        'fillColor': "none",
        'fillOpacity': 0.1
      }
    },
    'brush': {
      'width': 12,
      'x': -6,
      'opacity': .8,
      'color': "steelblue",
      'stroke': dex.config.stroke({'color': "black", 'width': 1})
    },
    'ui.config': {}
  };


  chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;
    d3.selectAll("#" + chart.config.id).remove();

    window.onresize = this.resize;
    chart.resize();

    var chartContainer;
    // Holds unselected paths.
    var background;
    // Holds selected paths.
    var foreground;
    // Will hold our column names.



    var numericColumns =
      dex.csv.getNumericColumnNames(csv);

    var jsonData = dex.csv.toJson(csv);

    var x = d3.scale.ordinal()
      .rangePoints([0, config.width], 1);

    var y = {};

    var line = d3.svg.line();

    var dimensions;
    var key;

    //dex.console.log("TRANSFORM:", config.transform, "HEIGHT: ", config.height, "WIDTH:", config.width);
    chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      //.attr("width", config.width)
      //.attr("height", config.height)
      .attr("transform", config.transform);

    // Extract the list of dimensions and create a scale for each.
    //x.domain(dimensions = d3.keys(cars[0]).filter(function(d)
    //{
    //  return d != "name" && (y[d] = d3.scale.linear()
    //    .domain(d3.extent(cars, function(p) { return +p[d]; }))
    //    .range([height, 0]));
    //}));
    var allExtents = []

    numericColumns.forEach(function (d) {
      allExtents = allExtents.concat(d3.extent(jsonData, function (p) {
        return +p[d];
      }));
    });

    var normalizedExtent = d3.extent(allExtents);

    // REM: Figure out how to switch over to consistent extents.  Snapping.
    x.domain(dimensions = d3.keys(jsonData[0]).filter(function (d) {
      if (d === "name") return false;

      if (dex.object.contains(numericColumns, d)) {
        var extent = d3.extent(jsonData, function (p) {
          return +p[d];
        });
        if (config.normalize) {
          extent = normalizedExtent;
        }

        y[d] = d3.scale.linear()
          .domain(extent)
          .range([config.height, 0]);
        allExtents.concat(extent);
      }
      else {
        y[d] = d3.scale.ordinal()
          .domain(jsonData.map(function (p) {
            return p[d];
          }))
          .rangePoints([config.height, 0]);
      }

      return true;
    }));

    // Add grey background lines for context.
    background = chartContainer.append("g")
      .attr("class", "background")
      .selectAll("path")
      .data(jsonData)
      .enter().append("path")
      .call(dex.config.configureLink, config.unselected.link)
      .attr("d", path)
      .attr("id", "fillpath");

    foreground = chartContainer.append("g")
      .attr("class", "foreground")
      .selectAll("path")
      .data(jsonData)
      .enter().append("path")
      .attr("d", path)
      .call(dex.config.configureLink, config.selected.link);

    foreground
      .append("tooltip-content").text(function (d, i) {
      var info = "<table border=\"1\">";
      for (key in jsonData[i]) {
        info += "<tr><td><b><i>" + key + "</i></b></td><td>" + jsonData[i][key] + "</td></tr>"
      }
      return info + "</table>";
    });

    // Returns the path for a given data point.
    function path(d) {
      return line(dimensions.map(function (p) {
        return [x(p), y[p](d[p])];
      }));
    }

    chart.update();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      chart
        .attr("width", width - chart.config.margin.left - chart.config.margin.right)
        .attr("height", height - chart.config.margin.top - chart.config.margin.bottom)
        .attr("transform", "translate(" + chart.config.margin.left + "," +
          chart.config.margin.top + ")");
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    var jsonData = dex.csv.toJson(csv);

    var allExtents = []

    var numericColumns =
      dex.csv.getNumericColumnNames(csv);

    var x = d3.scale.ordinal()
      .rangePoints([0, config.width], 1);
    var y = {};
    var line = d3.svg.line();

    numericColumns.forEach(function (d) {
      allExtents = allExtents.concat(d3.extent(jsonData, function (p) {
        return +p[d];
      }));
    });

    var normalizedExtent = d3.extent(allExtents);

    // REM: Figure out how to switch over to consistent extents.  Snapping.
    x.domain(dimensions = d3.keys(jsonData[0]).filter(function (d) {
      if (d === "name") return false;

      if (dex.object.contains(numericColumns, d)) {
        var extent = d3.extent(jsonData, function (p) {
          return +p[d];
        });
        if (config.normalize) {
          extent = normalizedExtent;
        }

        y[d] = d3.scale.linear()
          .domain(extent)
          .range([config.height, 0]);
        allExtents.concat(extent);
      }
      else {
        y[d] = d3.scale.ordinal()
          .domain(jsonData.map(function (p) {
            return p[d];
          }))
          .rangePoints([config.height, 0]);
      }

      return true;
    }));

    // Returns the path for a given data point.
    function path(d) {
      return line(dimensions.map(function (p) {
        //dex.console.log("x=" + x(p));
        return [x(p), y[p](d[p])];
      }));
    }

    d3.select("g .foreground")
      .selectAll("path")
      .data(jsonData)
      .transition(20)
      .attr("d", path);

    d3.select("g .foreground")
      .selectAll("path")
      .data(jsonData)

    d3.select("g .foreground")
      .selectAll("path")
      .data(jsonData).exit()
      .remove();

    d3.selectAll("g .foreground")
      .selectAll("path")
      .selectAll("tooltip-content")
      .remove();

    d3.selectAll("g .foreground")
      .selectAll("path")
      .append("tooltip-content")
      .text(function (d, i) {
        var info = "<table border=\"1\">";
        for (key in jsonData[i]) {
          info += "<tr><td><b><i>" + key + "</i></b></td><td>" + jsonData[i][key] + "</td></tr>"
        }
        return info + "</table>";
      });

    d3.selectAll("g .background")
      .selectAll("path")
      .data(jsonData)
      .transition(20)
      .attr("d", path);

    d3.selectAll("g .background")
      .selectAll("path")
      .data(jsonData)
      .enter()
      .append("path")
      .call(dex.config.configureLink, config.unselected.link)
      .attr("d", path)
      .attr("id", "fillpath");

    d3.selectAll("g .background")
      .selectAll("path")
      .data(jsonData)
      .exit()
      .remove();

    chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      //.attr("width", config.width)
      //.attr("height", config.height)
      .attr("transform", config.transform);

    var dimensions = chartContainer.selectAll(".dimension")
      .data(dimensions)
      .attr("class", "dimension")
      .attr("transform", function (d) {
        return "translate(" + x(d) + ")";
      });

    dimensions.enter()
      .append("g")
      .attr("class", "dimension")
      .attr("transform", function (d) {
        return "translate(" + x(d) + ")";
      });

    // Would be nice to transition axis too.
    d3.selectAll("g .axis").remove();
    d3.selectAll("g .brush").remove();

    dimensions.append("g")
     .attr("class", "axis")
     .each(function (d, i) {

     var axisScale = dex.config.createScale(dex.config.scale(config.axis.scale));
     var axis = d3.svg.axis()
     .scale(axisScale);

     var myConfig = dex.object.clone(config.axis);
     // If the last label, turn it to the right.
     if (i == config.csv.header.length - 1) {
     myConfig.orient = 'right';
     myConfig.label.dx = function (d, i) {
     return Math.max(chart.config.axis.label.font.size(d, i) / 2, 8);
     }
     }
     // Configure and apply the axis.
     dex.config.configureAxis(axis, myConfig, i);
     d3.select(this).call(axis.scale(y[d]));

     // Now that the axis has rendered, adjust the tick labels based on our spec.
     var tickLabels = d3.select(this)
     .selectAll('.tick')
     .selectAll("text")
     .call(dex.config.configureText, myConfig.label, i);
     })
     .append("text")
     .call(dex.config.configureText, config.verticalLabel);

    // Add and store a brush for each axis.
    dimensions.append("g")
      .attr("class", "brush")
      .each(function (d) {
        d3.select(this).call(y[d].brush =
          d3.svg.brush().y(y[d])
            .on("brush", brush)
            .on("brushend", brushend));
      })
      .selectAll("rect")
      .call(dex.config.configureRectangle, config.brush);

    // Configure the axis lines:
    //dex.console.log("DOMAIN", d3.selectAll(".domain"));
    d3.selectAll(".domain")
      .call(dex.config.configurePath, config.axis.line);

    // Handles a brush event, toggling the display of foreground lines.
    function brush() {
      // Get a list of our active brushes.
      var actives = dimensions.filter(function (p) {
          return !y[p].brush.empty();
        }),

      // Get an array of min/max values for each brush constraint.
        extents = actives.map(function (p) {
          return y[p].brush.extent();
        });

      foreground.style("display", function (d) {
        //dex.console.log("Calculating what lines to display: ", actives);
        return actives.every(
          // P is column name, i is an index
          function (p, i) {
            // Categorical
            //console.log("P: " + p + ", I: " + i);
            if (!dex.object.contains(numericColumns, p)) {
              return extents[i][0] <= y[p](d[p]) && y[p](d[p]) <= extents[i][1];
            }
            // Numeric
            else {
              return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }
          }) ? null : "none";
      });
    }

    // Handles a brush event, toggling the display of foreground lines.
    function brushend() {
      //dex.console.log("BRUSH-END: ", foreground);
      //dex.console.log("chart: ", chart);
      var activeData = [];
      var i;

      // WARNING:
      //
      // Can't find an elegant way to get back at the data so I am getting
      // at the data in a somewhat fragile manner instead.  Mike Bostock ever
      // changes the __data__ convention and this will break.
      for (i = 0; i < foreground[0].length; i++) {
        if (!(foreground[0][i]["style"]["display"] == "none")) {
          activeData.push(foreground[0][i]['__data__']);
        }
      }

      //dex.console.log("Selected: ", dex.json.toCsv(activeData, dimensions));
      chart.publish({
        "type": "select",
        "selected": dex.json.toCsv(activeData, dimensions)});
    }

  };


  $(document).ready(function () {
    $(document).tooltip({
      items: "path",
      content: function () {
        return $(this).find("tooltip-content").text();
      },
      track: true
    });
  });

  return chart;
}
;

