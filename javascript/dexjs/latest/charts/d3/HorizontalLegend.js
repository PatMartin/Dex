dex.charts.d3.HorizontalLegend = function (userConfig) {
  var defaults = {
    'parent'     : null,
    'labels'     : ["A", "B", "C"],
    'id'         : "HorizontalLegend",
    'class'      : "HorizontalLegend",
    'transform'  : 'translate(20,20)',
    'tickLength' : 25,
    'color'      : d3.scale.category20c(),
    'caption'    : dex.config.text({
      'text'   : "Legend",
      'x'      : 0,
      'y'      : -6,
      'anchor' : 'start',
      'font'   : dex.config.font({'size' : 14, 'weight' : 'bold'}),
      'fill'   : dex.config.fill({'fillColor' : 'black'})
    }),
    'axis'       : dex.config.axis({
      'tickSize'    : 25,
      'tickPadding' : 10,
      'orient'      : 'bottom',
      'tickFormat'  : function (d) {
        return d;
      },
      'tickLine'    : dex.config.line({
        'stroke' : dex.config.stroke({'color' : 'grey', 'width' : 1}),
        'fill'   : dex.config.fill({'fillColor' : 'none'})
      }),
      'path'        : dex.config.path({
        'fill'   : dex.config.fill({'fillColor' : 'none'}),
        'stroke' : dex.config.stroke({'color' : 'grey', 'width' : 1})
      })
    }),
    'cell'       : dex.config.rectangle({
        'stroke' : dex.config.stroke(),
        'color'  : d3.scale.category10(),
        'height' : 20,
        'width'  : 30
      }
    )
  };

  //config = dex.object.overlay(dex.config.expand(userConfig), dex.config.expand(defaults));
  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    this.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    dex.console.log("HorizontalLegend config:", config);
    // Create our x scale
    var x = d3.scale.ordinal()
      .domain(config.labels)
      .range(d3.range(config.labels.length).map(function (i) {
        return i * config.cell.width;
      }));

    // Create the x axis.
    var xAxis = dex.config.createAxis(config.axis)
      .scale(x)
      .tickValues(config.labels);

    // Append a graphics node to the supplied svg node.
    var chartContainer = d3.select(config.parent).append("g")
      .attr("class", config["class"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    // Draw a colored rectangle for each ordinal range.
    chartContainer.selectAll("rect")
      .data(config.labels)
      .enter().append("rect")
      //.attr("height", config.cellHeight)
      .call(dex.config.configureRectangle, config.cell)
      .attr("x", function (d, i) {
        return x(i);
      });

    // Add the caption.
    chartContainer.call(xAxis).append("text")
      //.attr("class", "caption")
      .call(dex.config.configureText, config.caption);
    //.attr("y", config.captionYOffset)
    //.attr("x", config.captionXOffset)
    //.text("GEEZE");
    //.style("font-size", config.captionFontSize);

    chartContainer.select('path')
      .call(dex.config.configurePath, config.axis.path);

    chartContainer.selectAll(".tick line")
      .call(dex.config.configureLine, config.axis.tickLine);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
}