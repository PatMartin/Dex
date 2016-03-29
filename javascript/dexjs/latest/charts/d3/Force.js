dex.charts.d3.Force = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent'       : '#Force',
    // Set these when you need to CSS style components independently.
    'id'           : 'Force',
    'class'        : 'Force',
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
    'label'        : dex.config.text({
      'x'              : 8,
      'y'              : 4,
      'font.size' : 26,
      'font.weight'    : 'bold',
      'fill.fillColor' : 'black'
    }),
    'link'         : dex.config.link({
        'stroke.color'     : "grey",
        'stroke.dasharray' : '2 2',
        'stroke.width'     :.5,
        'fill.fillOpacity' : 0.1,
        'transform'        : ''
      }),
    'linkDistance' : 60,
    'charge' : -300,
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

    var links = [];

    for (var ci=1; ci<csv.header.length; ci++)
    {
      for (var ri=0; ri<csv.data.length; ri++)
      {
        links.push({ 'source' : csv.data[ri][ci-1], 'target' : csv.data[ri][ci], 'group' : csv.header[ci] });
      }
    }
    var fill = d3.scale.category20();
    var nodes = {};

    links.forEach(function(link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, 'group' : link.group});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target, 'group' : link.group});
    });

    var width = config.width,
      height = config.height;

    var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(links)
      .size([width, height])
      .linkDistance(config.linkDistance)
      .charge(config.charge)
      .on("tick", tick)
      .start();

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    var link = chartContainer.selectAll(".link")
      .data(force.links())
      .enter().append("line")
      .attr("class", "link")
      .call(dex.config.configureLink, config.link);

    var node = chartContainer.selectAll(".node")
      .data(force.nodes())
      .enter().append("g")
      .attr("class", "node")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .call(force.drag);

    node.append("circle")
      .attr("r", 8)
      .style("fill", function(d) { return fill(d.group); });

    node.append("text")
      .attr("x", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; })
      .call(dex.config.configureText, config.label);

    function tick() {
      link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    }

    function mouseover() {
      d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 16);
    }

    function mouseout() {
      d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 8);
    }

  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
}


