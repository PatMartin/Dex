dex.ui.jqueryui.ConfigurationBox = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent'     : 'body',
    // Set these when you need to CSS style components independently.
    'id'         : 'ConfigurationBox',
    'class'      : 'ui-widget-content',
    'width'      : 600,
    'height'     : 100,
    'xoffset'    : 10,
    'yoffset'    : 10,
    'title'      : "Options",
    'components' : [],
    'resizable' : true,
    'draggable'  : true
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function () {
    var chart = this;
    var config = chart.config;
    var i;

    var chartContainer = $(config.parent);

    chart.main =
      jQuery('<div/>',
        {
          'id'    : config['id'],
          'class' : config['class']
        }).appendTo(chartContainer);

    for (i = 0; i < config.components.length; i++) {
      config.components[i].attr('parent', chart.main);
      config.components[i].render();
    }
    chart.main.css('width', config.width);
    chart.main.css('height', config.height);
    //chart.main.css('top', '-400px');
    chart.update();
  };

  chart.update = function () {
    var chart = this,
      config = chart.config,
      ri, ci;

    jQuery('<h3/>',
      {
        'class' : 'ui-widget-header',
        'text'  : config.title
      }).appendTo(chart.main);

    for (ci = 0; ci < config.components.length; ci += 1) {
      config.components[ci].update();
      //dex.console.log("CMP", config.components[ci], "DOM", config.components[ci].dom());
      config.components[ci].dom().appendTo(chart.main);
    }

    config.resizable && $("#" + config.id).resizable();
    config.draggable && $("#" + config.id).draggable();
  };

  chart.dom = function () {
    return chart.main;
  };

  chart.add = function (components) {
    var chart = this,
      config = chart.config,
      i;

    for (i = 0; i < arguments.length; i += 1) {
      config.components.push(arguments[i]);
    }
    return chart;
  };

  return chart;
}