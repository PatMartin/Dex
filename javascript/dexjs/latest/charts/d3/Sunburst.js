dex.charts.d3.Sunburst = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent': '#Sunburst',
    // Set these when you need to CSS style components independently.
    'id': 'Sunburst',
    'class': 'Sunburst',
    'resizable': true,
    // Our data...
    'csv': {
      // Give folks without data something to look at anyhow.
      'header': ["X", "Y", "Z"],
      'data': [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'width': "100%",
    'height': "100%",
    'transform': "translate(0 0)",
    'title': dex.config.text(),
    'label': dex.config.text()
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll("#" + config.id).remove();

    var data = dex.csv.toNestedJson(dex.csv.copy(csv));
    dex.console.log("DATA", csv, data);

    var width = 960,
      height = 700,
      radius = Math.min(width, height) / 2;

    var x = d3.scale.linear()
      .range([0, 2 * Math.PI]);

    var y = d3.scale.linear()
      .range([0, radius]);

    var color = d3.scale.category20c();

    var chartContainer = d3.select(config.parent).append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

    var partition = d3.layout.partition()
      .value(function (d) {
        return d.size;
      });

    var arc = d3.svg.arc()
      .startAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
      })
      .endAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
      })
      .innerRadius(function (d) {
        return Math.max(0, y(d.y));
      })
      .outerRadius(function (d) {
        return Math.max(0, y(d.y + d.dy));
      });



    //d3.json("https://s3-us-west-2.amazonaws.com/s.cdpn.io/65174/flare.json", function (error, root) {

    var root = data;

      var g = chartContainer.selectAll("g")
        .data(partition.nodes(root))
        .enter().append("g");

      var path = g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
          return color((d.children ? d : d.parent).name);
        })
        .on("click", click);

      var text = g.append("text")
        .attr("transform", function (d) {
          dex.console.log("D", d);
          return "rotate(" + computeTextRotation(d) + ")";
        })
        .attr("x", function (d) {
          return y(d.y);
        })
        .attr("dx", "6") // margin
        .attr("dy", ".35em") // vertical-align
        .text(function (d) {
          return d.name;
        });

      function click(d) {
        // fade out all text elements
        text.transition().attr("opacity", 0);

        path.transition()
          .duration(750)
          .attrTween("d", arcTween(d))
          .each("end", function (e, i) {
            // check if the animated element's data e lies within the visible angle span given in d
            if (e.x >= d.x && e.x < (d.x + d.dx)) {
              // get a selection of the associated text element
              var arcText = d3.select(this.parentNode).select("text");
              // fade in the text element and recalculate positions
              arcText.transition().duration(750)
                .attr("opacity", 1)
                .attr("transform", function () {
                  return "rotate(" + computeTextRotation(e) + ")"
                })
                .attr("x", function (d) {
                  return y(d.y);
                });
            }
          });
      }

    d3.select(self.frameElement).style("height", height + "px");

// Interpolate the scales!
    function arcTween(d) {
      var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        yd = d3.interpolate(y.domain(), [d.y, 1]),
        yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
      return function (d, i) {
        return i
          ? function (t) {
          return arc(d);
        }
          : function (t) {
          x.domain(xd(t));
          y.domain(yd(t)).range(yr(t));
          return arc(d);
        };
      };
    }

    function computeTextRotation(d) {
      return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
    }

  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
}


