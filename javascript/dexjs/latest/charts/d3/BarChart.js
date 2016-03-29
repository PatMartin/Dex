/**
 *
 * @constructor
 * @classdesc This class constructs a d3 Axis.
 * @memberOf dex
 *
 * @example {@lang javascript}
 * var myAxis = new dex.charts.d3.Axis({
 *   'parent' : "#MyAxisContainer",
 *   'id'     : "MyAxisId"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 * @param {margin} userConfig.margin - The margin data.
 * @param {integer} [userConfig.margin.left=25] - The number of pixels to allocate to the left margin.
 * @param {integer} [userConfig.margin.right=25] - The number of pixels to allocate to the right margin.
 * @param {integer} [userConfig.margin.top=0] - The number of pixels to allocate the top margin.
 * @param {integer} [userConfig.margin.bottom=0] - The number of pixels to allocate the bottom margin.
 * @param {string}  [userConfig.transform=translate(0,2)] - A SVG transform string.  More information can be found
 * in the {@link http://www.w3.org/TR/SVG/coords.html#TransformAttribute|W3C SVG 1.1 Specification}.
 * @param {integer} [userConfig.column=0] The column within the supplied CSV to use to generate the Axis.
 * @param {d3axis_spec} [userConfig.axis] - A D3 axis specification.
 * @param {d3text_spec} [userConfig.title] - A D3 text specification for the title of this axis.
 *
 */
dex.charts.d3.BarChart = function (userConfig) {
  var config;

  var defaults =
  {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'BarChart',
    'class'      : 'BarChart',
    'resizeable' : true,
    // Our data...
    'csv'        : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y"],
      'data'   : [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    'ymin'       : 0,
    'xmin'       : 0,
    'xaxis'      : dex.config.axis({
      'type'   : 'linear',
      'orient' : 'bottom',
      'label'  : dex.config.text()
    }),
    'yaxis'      : dex.config.axis({
      'type'   : 'linear',
      'orient' : 'left',
      'label'  : dex.config.text()
    }),
    // width and height of our bar chart.
    'width'      : "100%",
    'height'     : "100%",
    // The x an y indexes to chart.
    'xi'         : 0,
    'yi'         : [1],
    'transform'  : 'translate(100 100)',
    'color'      : d3.scale.category20(),
    'bars'       : {
      'mouseover' : dex.config.rectangle({
        'stroke' : {'width' : 2, 'color' : "red"},
        'color'  : function (d) {
          return config.color(d[3]);
        }
      }),
      'mouseout'  : dex.config.rectangle({
          'color' : function (d) {
            return config.color(d[3]);
          }
        }
      )
    }
  };

  // Things defined in terms of the defaults:
  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  // Replace the scale configuration with a real scale.
  var xscale = dex.config.createScale(dex.config.scale(config.xaxis.scale));
  config.xaxis.scale = xscale;
  // Replace the scale configuration with a real scale.
  var yscale = dex.config.createScale(dex.config.scale(config.yaxis.scale));
  config.yaxis.scale = yscale;

  config.bars.mouseover.height = config.bars.mouseout.height =
    function (d) {
      return config.height - yscale(d[1]);
    };

  config.bars.mouseout.width = config.bars.mouseover.width =
    xscale(config.csv.data[1][config.xi]) - xscale(config.csv.data[0][config.xi]);

  config.bars.mouseout.x = config.bars.mouseover.x = function (d) {
    return xscale(d[0])
  };

  config.bars.mouseout.y = config.bars.mouseover.y = function (d) {
    return yscale(d[1])
  };

  var data = config.csv.data;

  // Translate all of the y data columns to numerics.
  data.forEach(function (d) {
    config.yi.forEach(function (c) {
      d[c] = +d[c];
    });
  });

  var yextent = dex.matrix.extent(data, config.yi);

  if (config.ymin != null) {
    yextent[0] = config.ymin;
  }
  if (config.ymax != null) {
    yextent[1] = config.ymax;
  }

  config.yaxis.scale.domain(yextent);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (config.resizeable) {
      var width = d3.select(config.parent).property("clientWidth");
      var height = d3.select(config.parent).property("clientHeight");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {

    d3.selectAll("#" + config.id).remove();

    var xaxis = dex.config.createAxis(config.xaxis);

    var yaxis = dex.config.createAxis(config.yaxis);
    //dex.config.configureAxis(yaxis, config.yaxis);

    var chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    // X Axis
    chartContainer.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + config.height + ")")
      .call(xaxis);

    // Add the label
    chartContainer.select(".xaxis").append("text")
      .call(dex.config.configureText, config.xaxis.label);

    // Y Axis
    chartContainer.append("g")
      .attr("class", "yaxis")
      .call(yaxis);

    chartContainer.select(".yaxis").append("text")
      .call(dex.config.configureText, config.yaxis.label);

    var barData = dex.matrix.combine(
      dex.matrix.slice(data, [config.xi]),
      dex.matrix.slice(data, config.yi)
    );

    //dex.console.log("CSV DATA", csv);
    //dex.console.log("BAR DATA", barData);
    chartContainer.selectAll(".bar")
      .data(barData)
      .enter().append("rect")
      .call(dex.config.configureRectangle, config.bars.mouseout)
      .on("mouseover", function () {
        d3.select(this).call(dex.config.configureRectangle, config.bars.mouseover);
      })
      .on("mouseout", function () {
        d3.select(this).call(dex.config.configureRectangle, config.bars.mouseout);
      });
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};
