dex.charts.d3.SankeyParticles = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent': '#SankeyParticles',
    // Set these when you need to CSS style components independently.
    'id': 'SankeyParticles',
    'class': 'SankeyParticles',
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
    'margin' : { 'top' : 2, 'bottom' : 10, 'left' : 2, 'right' : 10 },
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

  d3.sankey = function () {
    var sankey = {},
      nodeWidth = 24,
      nodePadding = 8,
      size = [1, 1],
      nodes = [],
      links = [];

    sankey.nodeWidth = function (_) {
      if (!arguments.length) return nodeWidth;
      nodeWidth = +_;
      return sankey;
    };

    sankey.nodePadding = function (_) {
      if (!arguments.length) return nodePadding;
      nodePadding = +_;
      return sankey;
    };

    sankey.nodes = function (_) {
      if (!arguments.length) return nodes;
      nodes = _;
      return sankey;
    };

    sankey.links = function (_) {
      if (!arguments.length) return links;
      links = _;
      return sankey;
    };

    sankey.size = function (_) {
      if (!arguments.length) return size;
      size = _;
      return sankey;
    };

    sankey.layout = function (iterations) {
      computeNodeLinks();
      computeNodeValues();
      computeNodeBreadths();
      computeNodeDepths(iterations);
      computeLinkDepths();
      return sankey;
    };

    sankey.relayout = function () {
      computeLinkDepths();
      return sankey;
    };

    sankey.link = function () {
      var curvature = .5;

      function link(d) {
        var x0 = d.source.x + d.source.dx,
          x1 = d.target.x,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.sy + d.dy / 2,
          y1 = d.target.y + d.ty + d.dy / 2;
        return "M" + x0 + "," + y0
          + "C" + x2 + "," + y0
          + " " + x3 + "," + y1
          + " " + x1 + "," + y1;
      }

      link.curvature = function (_) {
        if (!arguments.length) return curvature;
        curvature = +_;
        return link;
      };

      return link;
    };

    // Populate the sourceLinks and targetLinks for each node.
    // Also, if the source and target are not objects, assume they are indices.
    function computeNodeLinks() {
      nodes.forEach(function (node) {
        node.sourceLinks = [];
        node.targetLinks = [];
      });
      links.forEach(function (link) {
        var source = link.source,
          target = link.target;
        if (typeof source === "number") source = link.source = nodes[link.source];
        if (typeof target === "number") target = link.target = nodes[link.target];
        source.sourceLinks.push(link);
        target.targetLinks.push(link);
      });
    }

    // Compute the value (size) of each node by summing the associated links.
    function computeNodeValues() {
      nodes.forEach(function (node) {
        node.value = Math.max(
          d3.sum(node.sourceLinks, value),
          d3.sum(node.targetLinks, value)
        );
      });
    }

    // Iteratively assign the breadth (x-position) for each node.
    // Nodes are assigned the maximum breadth of incoming neighbors plus one;
    // nodes with no incoming links are assigned breadth zero, while
    // nodes with no outgoing links are assigned the maximum breadth.
    function computeNodeBreadths() {
      var remainingNodes = nodes,
        nextNodes,
        x = 0;

      while (remainingNodes.length) {
        nextNodes = [];
        remainingNodes.forEach(function (node) {
          node.x = x;
          node.dx = nodeWidth;
          node.sourceLinks.forEach(function (link) {
            if (nextNodes.indexOf(link.target) < 0) {
              nextNodes.push(link.target);
            }
          });
        });
        remainingNodes = nextNodes;
        ++x;
      }

      //
      moveSinksRight(x);
      scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
    }

    function moveSourcesRight() {
      nodes.forEach(function (node) {
        if (!node.targetLinks.length) {
          node.x = d3.min(node.sourceLinks, function (d) {
              return d.target.x;
            }) - 1;
        }
      });
    }

    function moveSinksRight(x) {
      nodes.forEach(function (node) {
        if (!node.sourceLinks.length) {
          node.x = x - 1;
        }
      });
    }

    function scaleNodeBreadths(kx) {
      nodes.forEach(function (node) {
        node.x *= kx;
      });
    }

    function computeNodeDepths(iterations) {
      var nodesByBreadth = d3.nest()
        .key(function (d) {
          return d.x;
        })
        .sortKeys(d3.ascending)
        .entries(nodes)
        .map(function (d) {
          return d.values;
        });

      //
      initializeNodeDepth();
      resolveCollisions();
      for (var alpha = 1; iterations > 0; --iterations) {
        relaxRightToLeft(alpha *= .99);
        resolveCollisions();
        relaxLeftToRight(alpha);
        resolveCollisions();
      }

      function initializeNodeDepth() {
        var ky = d3.min(nodesByBreadth, function (nodes) {
          return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
        });

        nodesByBreadth.forEach(function (nodes) {
          nodes.forEach(function (node, i) {
            node.y = i;
            node.dy = node.value * ky;
          });
        });

        links.forEach(function (link) {
          link.dy = link.value * ky;
        });
      }

      function relaxLeftToRight(alpha) {
        nodesByBreadth.forEach(function (nodes, breadth) {
          nodes.forEach(function (node) {
            if (node.targetLinks.length) {
              var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
              node.y += (y - center(node)) * alpha;
            }
          });
        });

        function weightedSource(link) {
          return center(link.source) * link.value;
        }
      }

      function relaxRightToLeft(alpha) {
        nodesByBreadth.slice().reverse().forEach(function (nodes) {
          nodes.forEach(function (node) {
            if (node.sourceLinks.length) {
              var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
              node.y += (y - center(node)) * alpha;
            }
          });
        });

        function weightedTarget(link) {
          return center(link.target) * link.value;
        }
      }

      function resolveCollisions() {
        nodesByBreadth.forEach(function (nodes) {
          var node,
            dy,
            y0 = 0,
            n = nodes.length,
            i;

          // Push any overlapping nodes down.
          nodes.sort(ascendingDepth);
          for (i = 0; i < n; ++i) {
            node = nodes[i];
            dy = y0 - node.y;
            if (dy > 0) node.y += dy;
            y0 = node.y + node.dy + nodePadding;
          }

          // If the bottommost node goes outside the bounds, push it back up.
          dy = y0 - nodePadding - size[1];
          if (dy > 0) {
            y0 = node.y -= dy;

            // Push any overlapping nodes back up.
            for (i = n - 2; i >= 0; --i) {
              node = nodes[i];
              dy = node.y + node.dy + nodePadding - y0;
              if (dy > 0) node.y -= dy;
              y0 = node.y;
            }
          }
        });
      }

      function ascendingDepth(a, b) {
        return a.y - b.y;
      }
    }

    function computeLinkDepths() {
      nodes.forEach(function (node) {
        node.sourceLinks.sort(ascendingTargetDepth);
        node.targetLinks.sort(ascendingSourceDepth);
      });
      nodes.forEach(function (node) {
        var sy = 0, ty = 0;
        node.sourceLinks.forEach(function (link) {
          link.sy = sy;
          sy += link.dy;
        });
        node.targetLinks.forEach(function (link) {
          link.ty = ty;
          ty += link.dy;
        });
      });

      function ascendingSourceDepth(a, b) {
        return a.source.y - b.source.y;
      }

      function ascendingTargetDepth(a, b) {
        return a.target.y - b.target.y;
      }
    }

    function center(node) {
      return node.y + node.dy / 2;
    }

    function value(link) {
      return link.value;
    }

    return sankey;
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll("#" + config.id).remove();

    var data = dex.csv.getGraph(csv);
    dex.console.log("DATA", data);

    var margin = config.margin,
      width = config.width - margin.left - margin.right,
      height = config.height - margin.top - margin.bottom;

    var formatNumber = d3.format(",.0f"),
      format = function (d) {
        return formatNumber(d) + " TWh";
      },
      color = d3.scale.category20();

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    var sankey = d3.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .size([width, height]);

    var path = sankey.link();

    var freqCounter = 1;

    data.links.forEach(function (d) {
      d.o_value = d.value;
      d.value = 1;
    })

    sankey
      .nodes(data.nodes)
      .links(data.links)
      .layout(32);

    var link = chartContainer.append("g").selectAll(".link")
      .data(data.links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function (d) {
        return Math.max(1, d.dy);
      })
      .sort(function (a, b) {
        return b.dy - a.dy;
      });

    link.append("title")
      .text(function (d) {
        return d.source.name + " → " + d.target.name + "\n" + format(d.o_value);
      });

    var node = chartContainer.append("g").selectAll(".node")
      .data(data.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .call(d3.behavior.drag()
        .origin(function (d) {
          return d;
        })
        .on("dragstart", function () {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove));

    node.append("rect")
      .attr("height", function (d) {
        return d.dy;
      })
      .attr("width", sankey.nodeWidth())
      .style("fill", function (d) {
        return d.color = color(d.name.replace(/ .*/, ""));
      })
      .style("stroke", "none")
      .append("title")
      .text(function (d) {
        return d.name + "\n" + format(d.o_value);
      });

    node.append("text")
      .attr("x", -6)
      .attr("y", function (d) {
        return d.dy / 2;
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) {
        return d.name;
      })
      .filter(function (d) {
        return d.x < width / 2;
      })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

    function dragmove(d) {
      d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
      sankey.relayout();
      link.attr("d", path);
    }

    var linkExtent = d3.extent(data.links, function (d) {
      return d.o_value
    });
    var frequencyScale = d3.scale.linear().domain(linkExtent).range([0.05, 1]);
    var particleSize = d3.scale.linear().domain(linkExtent).range([1, 5]);


    data.links.forEach(function (link) {
      link.freq = frequencyScale(link.o_value);
      link.particleSize = 2;
      link.particleColor = d3.scale.linear().domain([0, 1])
        .range([link.source.color, link.target.color]);
    })

    var t = d3.timer(tick, 1000);
    var particles = [];

    function tick(elapsed, time) {

      particles = particles.filter(function (d) {
        return d.current < d.path.getTotalLength()
      });

      d3.selectAll("path.link")
        .each(
          function (d) {
//        if (d.freq < 1) {
            for (var x = 0; x < 2; x++) {
              var offset = (Math.random() - .5) * (d.dy - 4);
              if (Math.random() < d.freq) {
                var length = this.getTotalLength();
                particles.push({
                  link: d,
                  time: elapsed,
                  offset: offset,
                  path: this,
                  length: length,
                  animateTime: length,
                  speed: 0.5 + (Math.random())
                })
              }
            }

//        }
            /*        else {
             for (var x = 0; x<d.freq; x++) {
             var offset = (Math.random() - .5) * d.dy;
             particles.push({link: d, time: elapsed, offset: offset, path: this})
             }
             } */
          });

      particleEdgeCanvasPath(elapsed);
    }

    function particleEdgeCanvasPath(elapsed) {
      var context = d3.select("canvas").node().getContext("2d")

      context.clearRect(0, 0, 1000, 1000);

      context.fillStyle = "gray";
      context.lineWidth = "1px";
      for (var x in particles) {
        var currentTime = elapsed - particles[x].time;
//        var currentPercent = currentTime / 1000 * particles[x].path.getTotalLength();
        particles[x].current = currentTime * 0.15 * particles[x].speed;
        var currentPos = particles[x].path.getPointAtLength(particles[x].current);
        context.beginPath();
        context.fillStyle = particles[x].link.particleColor(0);
        context.arc(currentPos.x, currentPos.y + particles[x].offset, particles[x].link.particleSize, 0, 2 * Math.PI);
        context.fill();
      }
    }

  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
}


