dex.charts.d3.RadialTree = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent'       : '#RadialTree',
    // Set these when you need to CSS style components independently.
    'id'           : 'RadialTree',
    'class'        : 'RadialTree',
    'resizable'   : true,
    // Our data...
    'csv'          : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'width'        : "100%",
    'height'       : "100%",
    'transform'    : "translate(0 0)",
    'title'        : dex.config.text(),
    'label'        : dex.config.text(
      {
        'font' : dex.config.font({
          'family': 'sans-serif',
          'size': 10,
        })
      }
    ),
    'connectionLength' : 80
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

    var diameter = Math.min(config.height, config.width);

    var margin = {top: 20, right: 60, bottom: 20, left: 60},
      width = diameter,
      height = diameter;

    var i = 0,
      duration = 350,
      root;

    var tree = d3.layout.tree()
      .size([360, diameter / 2 - 80])
      .separation(function(a, b) { return (a.parent == b.parent ? 1 : 10) / a.depth; });

    var diagonal = d3.svg.diagonal.radial()
      .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

    var chartContainer = d3.select(config.parent).append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    root = data;
    root.x0 = height / 2;
    root.y0 = 0;

    //root.children.forEach(collapse); // start with all children collapsed
    update(root);

    //d3.select(self.frameElement).style("height", "800px");

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root),
        links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * config.connectionLength; });

      // Update the nodes…
      var node = chartContainer.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
        .on("click", click);

      nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("text")
        .attr("x", 10)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        //.attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length * 8.5)  + ")"; })
        .text(function(d) { return d.name; })
        .call(dex.config.configureText, config.label);
        //.style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

      nodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeUpdate.select("text")
        .style("fill-opacity", 1)
        .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length + 50)  + ")"; });

      // TODO: appropriate transform
      var nodeExit = node.exit().transition()
        .duration(duration)
        //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
        .remove();

      nodeExit.select("circle")
        .attr("r", 1e-6);

      nodeExit.select("text")
        .style("fill-opacity", 1e-6);

      // Update the links…
      var link = chartContainer.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });

      // Transition links to their new position.
      link.transition()
        .duration(duration)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }

      update(d);
    }

    // Collapse nodes
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
}


