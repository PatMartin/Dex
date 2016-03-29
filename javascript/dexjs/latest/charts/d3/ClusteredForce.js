dex.charts.d3.ClusteredForce = function (userConfig) {

  var defaults =
  {
    'parent'         : null,
    'id'             : "ClusteredForce",
    'class'          : "ClusteredForce",
    'height'         : "100%",
    'width'          : "100%",
    'csv'            : {
      'header' : ["X", "Y"],
      'data'   : [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    'xi'             : 0,
    'yi'             : 2,
    'transform'      : '',
    'color'          : d3.scale.category20(),
    'padding'        : 10,
    // TODO: Add normalization function.
    'sizingFunction' : function () {
      return d3.scale.linear()
    },
    'minRadius'      : 1,
    'maxRadius'      : 20,
    'gravity'        : 10,
    'charge'         : -100,
    'scaleColumns'   : true,
    'circle'         : dex.config.circle({
      'r'         : function (d) {
        return (dex.object.isNumeric(d.radius) ? d.radius : 1);
      },
      'fill'      : dex.config.fill({
        'fillColor' : function (d) {
          return d.color;
        }
      }),
      'stroke'    : dex.config.stroke(),
      'tooltip'   : function (d) {
        return d.text;
      },
      'transform' : ''
    })
  };

  var chart = new dex.component(userConfig, defaults);

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
    var config = chart.config;

    var csv = config.csv;
    var ri, ci, hi;

    var numericHeaders = dex.csv.getNumericColumnNames(csv);
    var numericIndices = dex.csv.getNumericIndices(csv);

    var i;

    var m = numericHeaders.length,
      radius = d3.scale.sqrt().range([0, 12]);

    var n = (dex.length - 1) * numericHeaders.length;

    var minValue, maxValue;

    if (!config.scaleColumns) {
      minValue = dex.matrix.min(csv.data, numericIndices[0]);
      maxValue = dex.matrix.max(csv.data, numericIndices[0]);
      for (i = 0; i < numericIndices.length; i++) {
        minValue = Math.min(minValue, dex.matrix.min(csv.data, numericIndices[i]));
        maxValue = Math.max(maxValue, dex.matric.max(csv.data, numericIndices[i]));
      }
    }

    var nodes = [];

    function scaleNodes(minRadius, maxRadius) {
      var numericScales = [];

      for (i = 0; i < numericIndices.length; i++) {
        if (config.scaleColumns) {
          minValue = dex.matrix.min(csv.data, numericIndices[i]);
          maxValue = dex.matrix.max(csv.data, numericIndices[i]);
        }

        //console.log("I: " + i + ", MIN: " + minValue + ", MAX: " + maxValue);

        numericScales.push(config.sizingFunction()
          .domain([minValue, maxValue]).range([config.minRadius, config.maxRadius]));
      }

      if (nodes.length == 0) {
        nodes = new Array((csv.data.length - 1) * numericIndices.length);
      }

      for (ri = 0; ri < csv.data.length; ri++) {
        dex.console.debug("RI:", ri, csv.data[ri]);
        for (ci = 0; ci < numericIndices.length; ci++) {
          var label = "<table border='1'>";
          for (hi = 0; hi < csv.data[ri].length; hi++) {
            if (hi == numericIndices[ci]) {
              label += "<tr><td><b>" + csv.data[0][hi] + "</b></td><td><b>" + csv.data[ri][hi] + "</b></td></tr>";
            }
            else {
              label += "<tr><td>" + csv.data[0][hi] + "</td><td>" + csv.data[ri][hi] + "</td></tr>";
            }
          }
          label += "</table>";

          nodes[(ri) * numericIndices.length + ci] =
          {
            radius : numericScales[ci](csv.data[ri][numericIndices[ci]]),
            //radius: radius(0.1),
            color  : config.color(ci),
            text   : label
          };
        }
      }
    }

    scaleNodes(config.minRadius, config.maxRadius);

    force = d3.layout.force()
      .nodes(nodes)
      .size([config.width, config.height])
      .gravity(config.gravity / 100.0)
      .charge(config.charge / 100.0)
      .on("tick", tick)
      .start();

    var chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    var circle = chartContainer.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .call(dex.config.configureCircle, config.circle)
      .call(force.drag);

    circle.append("text")
      .text(config.circle.tooltip);

    function tick(e) {
      circle
        .each(cluster(10 * e.alpha * e.alpha))
        .each(collide(.5))
        .attr("radius", function (d) {
          return (dex.object.isNumeric(d.radius) ? d.radius : 1);
        })
        .attr("cx", function (d) {
          return (dex.object.isNumeric(d.x) ? d.x : 0);
        })
        .attr("cy", function (d) {
          return (dex.object.isNumeric(d.y) ? d.y : 0);
        });
    }

    // Move d to be adjacent to the cluster node.
    function cluster(alpha) {
      var max = {};

      // Find the largest node for each cluster.
      nodes.forEach(function (d) {
        if (!(d.color in max) || (d.radius > max[d.color].radius)) {
          max[d.color] = d;
        }
      });

      return function (d) {
        var node = max[d.color],
          l,
          r,
          x,
          y,
          i = -1;

        if (node == d) return;

        x = d.x - node.x;
        y = d.y - node.y;
        l = Math.sqrt(x * x + y * y);
        r = d.radius + node.radius;
        if (l != r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          node.x += x;
          node.y += y;
        }
      };
    }

    // Resolves collisions between d and all other circles.
    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function (d) {
        var r = d.radius + radius.domain()[1] + config.padding,
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
        quadtree.visit(function (quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.color !== quad.point.color) * config.padding;
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2
            || x2 < nx1
            || y1 > ny2
            || y2 < ny1;
        });
      };
    }
  };

  $(document).ready(function () {
    $(chart.config.parent).tooltip({
      items    : "circle",
      content  : function () {
        return $(this).find("text").text();
      },
      track    : true
    });

    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
}
