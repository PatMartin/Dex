dex.charts.handlebars.Template = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent'   : '#Template',
    'id'       : 'Template',
    'class'    : 'Template',
    'template' : "#entry-template",
    'csv'      : {
      // Give folks without data something to look at anyhow.
      'header' : ["NO-DATA"],
      'data'   : [
        ["no-data"]
      ]
    }
  };

  var chart = new DexComponent(userConfig, defaults);

  chart.render = function () {
    chart.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;

    // Delete old parent contents.
    $(config.parent).empty();

    var source = $(config.template).html();
    var template = Handlebars.compile(source);
    var html = template(config.csv);
    $(config.parent).html(html);
  };

  return chart;
};


