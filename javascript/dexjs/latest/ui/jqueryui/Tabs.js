dex.ui.jqueryui.Tabs = function (userConfig) {
  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'Tabs',
    'class'      : 'ui-widget-content',
    'width'      : 600,
    'height'     : 100,
    'xoffset'    : 10,
    'yoffset'    : 10,
    'title'      : "Options",
    'components' : [],
    'resizeable' : true,
    'draggable'  : true
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.tabs = [];

  chart.render = function () {
    var chart = this,
      config = chart.config,
      tabs = chart.tabs,
      ri, ci,
      i, j,
      tab,
      tabName;

    // Create the main container.
    if (config.parent === null) {
      config.parent = document.body;
    }

    chart.main =
      jQuery('<div/>',
        {
          'id'    : config['id'],
          'class' : config['class']
        }).appendTo(config.parent);

    var tabNames = jQuery('<ul/>').appendTo(chart.main);

    for (i = 0; i < tabs.length; i += 1) {
      jQuery('<li><a href="#' + config.id + '-' + (i + 1) + '">' + tabs[i].name + '</a></li>')
        .appendTo(tabNames);
    }
    //dex.console.log(tabs);
    for (i = 0; i < tabs.length; i += 1) {
      var tabBody = jQuery('<div id="' + config.id + '-' + (i + 1) + '"/>').appendTo(chart.main);

      for (j = 0; j < tabs[i].children.length; j++) {
        tabs[i].children[j].attr('parent', tabBody);
        tabs[i].children[j].render();
        tabs[i].children[j].dom().appendTo(tabBody);
      }
    }

    chart.main.tabs();
  };

  chart.update = function () {
  };

  chart.dom = function () {
    return chart.main;
  };

  chart.add = function (tabName, components) {
    var chart = this,
      config = chart.config,
      tabs = chart.tabs,
      i, ti, tab;

    if (typeof tabName === 'undefined') {
      return;
    }

    dex.console.debug("TABS", chart);
    // REM: Replaced implementation w/o testing.
    ti = _.findIndex(tabs, {id : tabName});

    if (ti >= 0) {
      tab = tabs[ti];
    }
    else {
      tab = {'name' : tabName, 'children' : []};
      tabs.push(tab);
    }

    for (i = 1; i < arguments.length; i += 1) {
      tab.children.push(arguments[i]);
    }
    dex.console.debug("ATABS", tabs, tab);
    return chart;
  };

  return chart;
}