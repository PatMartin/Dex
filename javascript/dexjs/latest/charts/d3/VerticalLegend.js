dex.charts.d3.VerticalLegend = function (userConfig) {

  var defaults = {
    'labels'          : ["A", "B", "C"],
    'id'              : "VerticalLegend",
    'class'           : "VerticalLegend",
    'resizeable'      : false,
    'parent'          : null,
    'height'          : 250,
    'width'           : 250,
    //'transform'       : 'translate(100,100)',
    //'xoffset'         : 50,
    //'yoffset'         : 30,
    //'cellWidth'       : 30,
    //'cellHeight'      : 20,
    'tickLength'      : 5,
    'caption'         : "Legend",
    'captionFontSize' : 14,
    'captionXOffset'  : -30,
    'captionYOffset'  : -20,
    'margin'          : {
      'top'    : 10,
      'bottom' : 10,
      'left'   : 20,
      'right'  : 10
    },
    'cell'            : {
      'appearance.mouseover.rect.width' : 35,
      'appearance.mouseout.rect.width'  : 30,
      'appearance.mousedown.rect.width' : 50,
      'appearance.mouseup.rect.width'   : 35,
      'rect'                            : dex.config.rectangle({
        'width'  : 30,
        'height' : 20,
        'y'      : function (d) {
          return chart.config.yscale(d);
        },
        'x'      : function (d) {
          return chart.config.width / 10;
        },
        'events' : {
          'mouseover' : function (d, i) {
            dex.console.log("mouseover event(d=" + d + ", i=" + i + ")");
            //dex.console.log("this", d3.select(this), "Mouseover config",
            //chart.config);
            //dex.console.log("cell.events.mouseover.config",
            //  chart.config.cell.appearance.mouseover);
            d3.select(this).call(dex.config.configureRectangle,
              chart.config.cell.appearance.mouseover.rect);
            chart.publish({"type" : "mouseover", "d" : d});
          },
          'mouseout'  : function (d) {
            dex.console.log("mouseout event(d=" + d + ", i=" + i + ")");
            d3.select(this).call(dex.config.configureRectangle,
              chart.config.cell.appearance.mouseout.rect);
            chart.publish({"type" : "mouseout", "d" : d});
          },
          'mousedown' : function (d) {
            dex.console.log("mousedown event(d=" + d + ", i=" + i + ")");
            d3.select(this).call(dex.config.configureRectangle,
              chart.config.cell.appearance.mousedown.rect);
            chart.publish({"type" : "mousedown", "d" : d});
          },
          'mouseup'   : function (d) {
            dex.console.log("mouseup event(d=" + d + ", i=" + i + ")");
            d3.select(this).call(dex.config.configureRectangle,
              chart.config.cell.appearance.mouseup.rect);
            chart.publish({"type" : "mouseup", "d" : d});
          }
        }
      }),
      'label'                           : dex.config.text({
        'text'        : function (d) {
          return d;
        },
        'font.scale'  : function (d) {
          dex.console.log("FONT.SCALE: width=" + chart.config.width + 'x' + chart.config.height);
          var scale = d3.scale.linear()
            .domain([0, 150])
            .range([0, 32]);
          return scale;
        },
        'font.weight' : "bold",
        'font.size'   : function (d) {
          dex.console.log("FONT-SIZE: width=" + chart.config.width +
          ", height=" + chart.config.height +
          ", fontScale=" + chart.config.cell.label.font.scale()(chart.config.width * .2));
          return chart.config.cell.label.font.scale()(chart.config.width * .2);
        },
        'anchor'      : 'end',
        'y'           : function (d) {
          return chart.config.yscale(d);
        },
        'dx'          : function (d, i) {
          dex.console.log("dx", chart.config.cell.label.font.size(d));
          return -1 * chart.config.cell.label.font.size(d) / 2;
          //dex.console.log("this", this, "select(this)", d3.select(this), chart.config);
          //return -(chart.config.cell.label.font.size / 2);
        },
        'dy'          : function (d, i) {
          //dex.console.log("CURENT-FONT-SIZE " + chart.config.cell.label.font.size(d))
          ;         // return Math.floor(chart.config.cell.rect.height / 2);// + Math.floor(chart.config.cell.label.font.size(d) / 2);
          return 0;
        },
        'fill'        : dex.config.fill({'fillColor' : 'black'})
      })
    },
    'title'           : dex.config.text({
      'text'       : 'title.text',
      'anchor'     : 'middle',
      'font.scale' : function (d) {
        dex.console.log("TITLE.FONT.SCALE: width=" + chart.config.width + 'x' + chart.config.height);
        var scale = d3.scale.linear()
          .domain([0, 200])
          .range([4, 64]);
        return scale;
      },
      'font.size'  : function (d) {
        dex.console.log("TITLE-FONT-SIZE: width=" + chart.config.width +
        ", height=" + chart.config.height +
        ", fontScale=" + chart.config.cell.label.font.scale()(
          Math.min(chart.config.width, chart.config.height) / 5));
        return chart.config.title.font.scale()
        (Math.min(chart.config.width, chart.config.height) * .2);
      },
      'y'          : function (d) {
        return chart.config.height / 12;
      },
      'x'          : function (d) {
        return chart.config.width / 10 + chart.config.cell.rect.width / 2;
      }
    })
  };

  // Create our chart.
  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizeable) {

      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      var cellWidth = width * .4;
      var cellHeight = height * .8 / (chart.config.labels.length + 1);
      dex.console.log("Resizing VerticalLegend: " + width + "x" + height);
      chart
        .attr("width", width)
        .attr("height", height)
        .attr("cell.rect.width", cellWidth)
        .attr("cell.rect.height", cellHeight)
        .attr("margin.top", height * .1)
        .attr("margin.bottom", height * .1)
        .attr("margin.left", width * .1)
        .attr("margin.right", width * .1)
        .attr("cell.appearance.mouseover.rect.width", cellWidth * 1.1)
        .attr("cell.appearance.mouseout.rect.width", cellWidth)
        .attr("cell.appearance.mousedown.rect.width", cellWidth * 1.2)
        .attr("cell.appearance.mouseup.rect.width", cellWidth * 1.1)
        .attr("cell.label.dx", width * .4)
        .attr("cell.rect.x", width * .5)
        .attr("title.y", height * .08)
        .attr("title.x", width * .4 + cellWidth / 2)
        .attr("cell.label.x", width * .1)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = this.config;
    dex.console.log("RESIZE");
    dex.console.log(config.id + ": " + config.width + "x" + config.height);
    d3.selectAll("#" + config.id).remove();

    config.yscale = d3.scale.ordinal()
      .domain(config.labels)
      .rangeBands([config.margin.top, config.height - config.margin.bottom]);

    // Append a graphics node to the supplied svg node.
    var chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    var rects = chartContainer.selectAll("rect")
      .data(config.labels)
      .enter()
      .append("rect")
      .call(dex.config.configureRectangle, config.cell.rect);

    chartContainer.selectAll("label")
      .data(config.labels)
      .enter().append("text")
      .call(dex.config.configureText, config.cell.label);

    chartContainer.append("text")
      .call(dex.config.configureText, config.title)
      .text(config.title.text);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
}
