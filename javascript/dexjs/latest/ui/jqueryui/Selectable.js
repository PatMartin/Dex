dex.ui.jqueryui.Selectable = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent'    : null,
    // Set these when you need to CSS style components independently.
    'id'        : 'Selectable',
    'class'     : 'Selectable',
    'width'     : 200,
    'height'    : 100,
    'xoffset'   : 10,
    'yoffset'   : 10,
    'label'     : "",
    'selection' : ["X", "Y"],
    'mode'      : "SINGLE",
    'options'   : {}
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    var chart = this,
      config = chart.config,
      i;

    dex.console.debug("RENDERING: " + config.id);

    if (config.mode == "SINGLE") {
      chart.attr('options.stop',
        function (event, ui) {
          $(event.target).children('.ui-selected').not(':first').removeClass('ui-selected');
        }
      );
    }

    chart.attr('options.selected',
      function (event, ui) {
        chart.publish({'type' : 'selected', 'id' : ui.selected.id});
      });

    chart.attr('options.unselected',
      function (event, ui) {
        chart.publish({'type' : 'unselected', 'id' : ui.unselected.id});
      });

    // Create the main container.
    chart.main = jQuery('<div/>',
      {
        'id'    : config['id'],
        'class' : config['class']
      }).appendTo(config['parent']);

    // Create the main container.
    var label = jQuery('<div/>',
      {
        'id'   : config['id'] + '-label',
        'text' : config['label']
      }).appendTo(chart.main);

    // Create the main container.
    var orderedList = jQuery('<ol/>',
      {
        'id' : config['id'] + '-ol'
      }).appendTo(chart.main);

    orderedList.css('overflow', "scroll");
    orderedList.css('border', "1px solid black");
    orderedList.css('height', config.height + "px");
    orderedList.css('width', config.width + "px");

    for (i = 0; i < config.selection.length; i++) {
      var selectable = jQuery('<li/>',
        {
          'id'    : i,
          'class' : 'ui-widget-content',
          'text'  : config.selection[i]
        }).appendTo(orderedList);
    }

    $('#' + config['id'] + '-ol').children().first().addClass('ui-selected');
    $('#' + config['id'] + '-ol').selectable(config.options);
  };

  chart.update = function () {
  };

  chart.dom = function () {
    return chart.main;
  };

  return chart;
}