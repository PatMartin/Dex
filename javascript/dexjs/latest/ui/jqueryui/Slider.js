dex.ui.jqueryui.Slider = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'  : null,
    // Set these when you need to CSS style components independently.
    'id'      : 'Slider',
    'class'   : 'ui-widget-content',
    'width'   : 600,
    'height'  : 100,
    'xoffset' : 10,
    'yoffset' : 10,
    'label'   : "",
    'options' : {
      'range' : 'max',
      'min'   : 1,
      'max'   : 10,
      'value' : 5,
      'slide' : null
    }
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    var chart = this,
      config = chart.config,
      ri, ci;

    var chart = this;
    chart.attr('options.slide',
      function (event, ui) {
        //dex.console.log("EVENT", event, "UI", ui);
        $('#' + config['id'] + '-input').val(ui.value);
        chart.publish("slider-change", {'type' : 'slider-change', 'value' : ui.value});
      });

    // Create the main container.
    chart.main = jQuery('<div/>',
      {
        'id'    : config['id'],
        'class' : config['class']
      }).appendTo(config['parent']);

    // Create the main container.
    var label = jQuery('<label/>',
      {
        'id'    : config['id' + '-label'],
        'class' : 'SliderLabel',
        'text'  : config['label'],
      }).appendTo(chart.main);

    var input = jQuery('<input/>',
      {
        'type'  : 'text',
        'id'    : config['id'] + '-input',
        'class' : 'SliderInput',
        'value' : config.options.value
      }).appendTo(chart.main);

    /*
     <div>
     <label for="ticklength">Tick Length:</label>
     <input type="text" id="ticklength-input" size="5" />
     <div id="ticklength-slider"/>
     </div>
     */
    // Create the main container.
    var slider = jQuery('<div/>',
      {
        'id'    : config['id'] + '-slider',
        'class' : config['class']
      }).appendTo(chart.main);

    //config.parent.appendChild(main);

    $('#' + config['id'] + '-slider').slider(config.options);
  };

  chart.update = function () {
  };

  chart.dom = function () {
    return chart.main;
  };

  return chart;
}