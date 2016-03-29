dex.charts.d3.HorizonChart = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent'      : '#HorizonChartArea',
    // Set these when you need to CSS style components independently.
    'id'          : 'HorizonChart',
    'class'       : 'DexComponent',
    // Our data...
    'csv'         : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'margin'      : {
      'top'    : 2,
      'bottom' : 0,
      'left'   : 1,
      'right'  : 1
    },
    'interpolate' : "basis",
    'numBands'    : 4,
    //'mode' : "offset",
    'mode'        : "mirror",
    'bandColors'  : ["#08519c", "#bdd7e7", "#bae4b3", "#006d2c"],
    //'bandColors': ["#0000ff", "#00ff00", "#ffff00", "#ff0000"],
    //'bandColors': ["#08519c","#3182bd","#6baed6","#bdd7e7"],
    //'bandColors': ["#08519c","#3182bd","#6baed6","#bdd7e7","#bae4b3","#74c476","#31a354","#006d2c"],
    //'bandColors': ["#B0E5FB", "#63AFD5", "#337BB1", "#175389"],
    'width'       : "100%",
    'height'      : "100%",
    'transform'   : "translate(0 0)"
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function () {
    d3.selectAll("#" + chart.config.id).remove();
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart.attr("width", width).attr("height", height).update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;
    var ncsv = dex.csv.numericSubset(csv);

    var ri, ci;

    var numCharts = ncsv.header.length - 1;

    var chartHeight = (config.height - ((config.margin.top + config.margin.bottom) * numCharts)) / numCharts;

    for (ci = 1; ci < ncsv.header.length; ci++) {

      var svg = d3.select(config.parent)
        .append("g")
        .attr('id', config["id"])
        .attr('class', config["class"])
        .attr("width", config.width)
        .attr("height", chartHeight)
        .attr("transform", "translate(" + config.margin.left + ", " +
        (chartHeight * (ci - 1) + (config.margin.top * ci) + (config.margin.bottom * (ci - 1))) + ")");

      var hchart = d3.horizon(config)
        .width(config.width)
        .height(chartHeight)
        .bands(config.numBands)
        .mode(config.mode)
        .interpolate(config.interpolate);

      // Reads into a map with key=columnName, value=[ columnRowValues, ... ]
      var seriesData = dex.csv.columnSlice(dex.csv.copy(ncsv), [0, ci]);

      // Offset so that positive is above-average and negative is below-average.
      var mean = seriesData.data.reduce(
          function (prev, cur) {
            return prev + cur[1];
          }, 0) / seriesData.data.length;

      data = seriesData.data.map(function (row) {
        return [row[0], row[1] - mean];
      });

      // Render the chart.
      svg.data([data]).call(hchart);
    }
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

// Implementation of horizon.js
(function () {
  d3.horizon = function (config) {
    var bands = 1, // between 1 and 5, typically
      mode = "offset", // or mirror
      interpolate = "linear", // or basis, monotone, step-before, etc.
      x = d3_horizonX,
      y = d3_horizonY,
      w = 960,
      h = 40,
      duration = 0;

    //var color = d3.scale.linear()
    //  .domain([-1, 0, 0, 1])
    //  .range(["#08519c", "#bdd7e7", "#bae4b3", "#006d2c"]);

    var color = d3.scale.linear()
      .domain([-1, 0, 0, 1])
      .range(config.bandColors);

    // For each small multiple…
    function horizon(g) {
      g.each(function (d, i) {
        var g = d3.select(this),
          n = 2 * bands + 1,
          xMin = Infinity,
          xMax = -Infinity,
          yMax = -Infinity,
          x0, // old x-scale
          y0, // old y-scale
          id; // unique id for paths

        // Compute x- and y-values along with extents.
        var data = d.map(function (d, i) {
          var xv = x.call(this, d, i),
            yv = y.call(this, d, i);
          if (xv < xMin) xMin = xv;
          if (xv > xMax) xMax = xv;
          if (-yv > yMax) yMax = -yv;
          if (yv > yMax) yMax = yv;
          return [xv, yv];
        });

        // Compute the new x- and y-scales, and transform.
        var x1 = d3.scale.linear().domain([xMin, xMax]).range([0, w]),
          y1 = d3.scale.linear().domain([0, yMax]).range([0, h * bands]),
          t1 = d3_horizonTransform(bands, h, mode);

        // Retrieve the old scales, if this is an update.
        if (this.__chart__) {
          x0 = this.__chart__.x;
          y0 = this.__chart__.y;
          t0 = this.__chart__.t;
          id = this.__chart__.id;
        } else {
          x0 = x1.copy();
          y0 = y1.copy();
          t0 = t1;
          id = ++d3_horizonId;
        }

        // We'll use a defs to store the area path and the clip path.
        var defs = g.selectAll("defs")
          .data([null]);

        // The clip path is a simple rect.
        defs.enter().append("defs").append("clipPath")
          .attr("id", "d3_horizon_clip" + id)
          .append("rect")
          .attr("width", w)
          .attr("height", h);

        defs.select("rect").transition()
          .duration(duration)
          .attr("width", w)
          .attr("height", h);

        // We'll use a container to clip all horizon layers at once.
        g.selectAll("g")
          .data([null])
          .enter().append("g")
          .attr("clip-path", "url(#d3_horizon_clip" + id + ")");

        // Instantiate each copy of the path with different transforms.
        var path = g.select("g").selectAll("path")
          .data(d3.range(-1, -bands - 1, -1).concat(d3.range(1, bands + 1)), Number);

        var d0 = d3_horizonArea
          .interpolate(interpolate)
          .x(function (d) {
            return x0(d[0]);
          })
          .y0(h * bands)
          .y1(function (d) {
            return h * bands - y0(d[1]);
          })
        (data);

        var d1 = d3_horizonArea
          .x(function (d) {
            return x1(d[0]);
          })
          .y1(function (d) {
            return h * bands - y1(d[1]);
          })
        (data);

        path.enter().append("path")
          .style("fill", color)
          .attr("transform", t0)
          .attr("d", d0);

        path.transition()
          .duration(duration)
          .style("fill", color)
          .attr("transform", t1)
          .attr("d", d1);

        path.exit().transition()
          .duration(duration)
          .attr("transform", t1)
          .attr("d", d1)
          .remove();

        // Stash the new scales.
        this.__chart__ = {x : x1, y : y1, t : t1, id : id};
      });
      d3.timer.flush();
    }

    horizon.duration = function (x) {
      if (!arguments.length) return duration;
      duration = +x;
      return horizon;
    };

    horizon.bands = function (x) {
      if (!arguments.length) return bands;
      bands = +x;
      color.domain([-bands, 0, 0, bands]);
      return horizon;
    };

    horizon.mode = function (x) {
      if (!arguments.length) return mode;
      mode = x + "";
      return horizon;
    };

    horizon.colors = function (x) {
      if (!arguments.length) return color.range();
      color.range(x);
      return horizon;
    };

    horizon.interpolate = function (x) {
      if (!arguments.length) return interpolate;
      interpolate = x + "";
      return horizon;
    };

    horizon.x = function (z) {
      if (!arguments.length) return x;
      x = z;
      return horizon;
    };

    horizon.y = function (z) {
      if (!arguments.length) return y;
      y = z;
      return horizon;
    };

    horizon.width = function (x) {
      if (!arguments.length) return w;
      w = +x;
      return horizon;
    };

    horizon.height = function (x) {
      if (!arguments.length) return h;
      h = +x;
      return horizon;
    };

    return horizon;
  };

  var d3_horizonArea = d3.svg.area(),
    d3_horizonId = 0;

  function d3_horizonX(d) {
    return d[0];
  }

  function d3_horizonY(d) {
    return d[1];
  }

  function d3_horizonTransform(bands, h, mode) {
    return mode == "offset"
      ? function (d) {
      return "translate(0," + (d + (d < 0) - bands) * h + ")";
    }
      : function (d) {
      return (d < 0 ? "scale(1,-1)" : "") + "translate(0," + (d - bands) * h + ")";
    };
  }
})();