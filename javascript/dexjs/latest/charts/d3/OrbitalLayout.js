dex.charts.d3.OrbitalLayout = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent': '#ChordDiagram',
    // Set these when you need to CSS style components independently.
    'id': 'Chord',
    'class': 'Chord',
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
    'label': dex.config.text(),
    'circles': dex.config.circle(),
    'orbits': dex.config.circle({
      'r': 5,
      'fill': {
        'fillColor': 'none',
        'fillOpacity': 1
      },
      'stroke': dex.config.stroke({
        'width': 1,
        'color': 'green',
        'opacity': .5,
        'dasharray': "2 2"
      })
    }),
    'refreshFrequencyMs' :50,
    'tickRadianStep' : 0.004363323129985824
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

    d3.layout.orbit = function () {
      var currentTickStep = 0;
      var orbitNodes;
      var orbitSize = [1, 1];
      var nestedNodes;
      var flattenedNodes = [];
      var orbitDispatch = d3.dispatch('tick');
      var tickInterval;
      var tickRadianStep = config.tickRadianStep;
      var orbitalRings = [];
      var orbitDepthAdjust = function () {
        return 2.95
      };
      var childrenAccessor = function (d) {
        return d.children
      };
      var tickRadianFunction = function () {
        return 1
      };

      function _orbitLayout() {

        return _orbitLayout;
      }

      _orbitLayout.mode = function () {
        //Atomic, Solar, other?
      }

      _orbitLayout.start = function () {
        //activate animation here
        tickInterval = setInterval(
          function () {
            currentTickStep++;
            flattenedNodes.forEach(function (_node) {
              if (_node.parent) {
                _node.x = _node.parent.x + ( (_node.parent.ring / 2) * Math.sin(_node.angle + (currentTickStep *
                    config.tickRadianStep * tickRadianFunction(_node))) );
                _node.y = _node.parent.y + ( (_node.parent.ring / 2) * Math.cos(_node.angle + (currentTickStep *
                    config.tickRadianStep * tickRadianFunction(_node))) );
              }
            })
            orbitalRings.forEach(function (_ring) {
              _ring.x = _ring.source.x;
              _ring.y = _ring.source.y;
            })
            orbitDispatch.tick();
          },
          config.refreshFrequencyMs);
      }

      _orbitLayout.stop = function () {
        //deactivate animation here
        clearInterval(tickInterval);
      }

      _orbitLayout.speed = function (_degrees) {
        if (!arguments.length) return tickRadianStep / (Math.PI / 360);
        tickRadianStep = tickRadianStep = _degrees * (Math.PI / 360);
        return this;
      }

      _orbitLayout.size = function (_value) {
        if (!arguments.length) return orbitSize;
        orbitSize = _value;
        return this;
        //change size here
      }

      _orbitLayout.revolution = function (_function) {
        //change ring size reduction (make that into dynamic function)
        if (!arguments.length) return tickRadianFunction;
        tickRadianFunction = _function;
        return this
      }

      _orbitLayout.orbitSize = function (_function) {
        //change ring size reduction (make that into dynamic function)
        if (!arguments.length) return orbitDepthAdjust;
        orbitDepthAdjust = _function;
        return this
      }

      _orbitLayout.orbitalRings = function () {
        //return an array of data corresponding to orbital rings
        if (!arguments.length) return orbitalRings;
        return this;
      }

      _orbitLayout.nodes = function (_data) {
        if (!arguments.length) return flattenedNodes;
        nestedNodes = _data;
        calculateNodes();
        return this;
      }

      _orbitLayout.children = function (_function) {
        if (!arguments.length) return childrenAccessor;

        //Probably should use d3.functor to turn a string into an object key
        childrenAccessor = _function;
        return this;


      }

      d3.rebind(_orbitLayout, orbitDispatch, "on");

      return _orbitLayout;
      function calculateNodes() {
        var _data = nestedNodes;
        //If you have an array of elements, then create a root node (center)
        //In the future, maybe make a binary star kind of thing?
        if (!childrenAccessor(_data)) {
          orbitNodes = {key: "root", values: _data}
          childrenAccessor(orbitNodes).forEach(function (_node) {
            _node.parent = orbitNodes;
          })
        }
        //otherwise assume it is an object with a root node
        else {
          orbitNodes = _data;
        }
        orbitNodes.x = orbitSize[0] / 2;
        orbitNodes.y = orbitSize[1] / 2;
        orbitNodes.deltaX = function (_x) {
          return _x
        }
        orbitNodes.deltaY = function (_y) {
          return _y
        }
        orbitNodes.ring = orbitSize[0] / 2;
        orbitNodes.depth = 0;

        flattenedNodes.push(orbitNodes);

        traverseNestedData(orbitNodes)

        function traverseNestedData(_node) {
          if (childrenAccessor(_node)) {
            var thisPie = d3.layout.pie().value(function (d) {
              return childrenAccessor(d) ? 4 : 1
            });
            var piedValues = thisPie(childrenAccessor(_node));

            orbitalRings.push({source: _node, x: _node.x, y: _node.y, r: _node.ring / 2});

            for (var x = 0; x < childrenAccessor(_node).length; x++) {

              childrenAccessor(_node)[x].angle = ((piedValues[x].endAngle - piedValues[x].startAngle) / 2) + piedValues[x].startAngle;

              childrenAccessor(_node)[x].parent = _node;
              childrenAccessor(_node)[x].depth = _node.depth + 1;

              childrenAccessor(_node)[x].x = childrenAccessor(_node)[x].parent.x + ( (childrenAccessor(_node)[x].parent.ring / 2) * Math.sin(childrenAccessor(_node)[x].angle) );
              childrenAccessor(_node)[x].y = childrenAccessor(_node)[x].parent.y + ( (childrenAccessor(_node)[x].parent.ring / 2) * Math.cos(childrenAccessor(_node)[x].angle) );

              childrenAccessor(_node)[x].deltaX = function (_x) {
                return _x
              }
              childrenAccessor(_node)[x].deltaY = function (_y) {
                return _y
              }
              childrenAccessor(_node)[x].ring = childrenAccessor(_node)[x].parent.ring / orbitDepthAdjust(_node);

              flattenedNodes.push(childrenAccessor(_node)[x]);
              traverseNestedData(childrenAccessor(_node)[x]);
            }
          }
        }
      }

    }

    //down with category20a()!!
    colors = d3.scale.category20();

    orbitScale = d3.scale.linear().domain([1, 3]).range([3.8, 1.5]).clamp(true);
    radiusScale = d3.scale.linear().domain([0, 1, 2, 3]).range([20, 10, 3, 1]).clamp(true);

    var minSize = Math.min(config.width, config.height);

    orbit = d3.layout.orbit().size([minSize, minSize])
      .children(function (d) {
        return d.children
      })
      .revolution(function (d) {
        return d.depth
      })
      .orbitSize(function (d) {
        return orbitScale(d.depth)
      })
      .speed(.1)
      .nodes(data);

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    chartContainer.selectAll("g.node").data(orbit.nodes())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")"
      })
      .on("mouseover", nodeOver)
      .on("mouseout", nodeOut)

    var circles = d3.selectAll("g.node")
      .append("circle");

    circles.call(dex.config.configureCircle, config.circles);
    circles.attr("r", function (d) {
        return radiusScale(d.depth)
      })
      .style("fill", function (d) {
        return colors(d.depth)
      });

    chartContainer.selectAll("circle.orbits")
      .data(orbit.orbitalRings())
      .enter()
      .insert("circle", "g")
      .call(dex.config.configureCircle, config.orbits)
      .attr("class", "ring")
      .attr("r", function (d) {
        return d.r
      })
      .attr("cx", function (d) {
        return d.x
      })
      .attr("cy", function (d) {
        return d.y
      });

    orbit.on("tick", function () {
      d3.selectAll("g.node")
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")"
        });

      d3.selectAll("circle.ring")
        .attr("cx", function (d) {
          return d.x
        })
        .attr("cy", function (d) {
          return d.y
        });
    });

    orbit.start();

    function nodeOver(d) {
      orbit.stop();
      d3.select(this).append("text").text(d.name).style("text-anchor", "middle").attr("y", 35);
      d3.select(this).select("circle").style("stroke", "black").style("stroke-width", 3);
    }

    function nodeOut() {
      orbit.start();
      //d3.selectAll("text").remove();
      d3.selectAll("g.node > circle").style("stroke", "none").style("stroke-width", 0);
    }
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
}


