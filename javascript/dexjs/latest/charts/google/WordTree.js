/**
 *
 * @param userConfig A user supplied configuration object which will override the defaults.
 * @returns {DexComponent} Returns the Axis object.
 * @constructor
 *
 */
dex.charts.google.WordTree = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'WordTree',
    'class'      : 'WordTree',
    // Our data...
    'csv'        : {
      'header' : ["LINE"],
      'data'   : [
        ['Now is the time for all good men to fight.'],
        ['Now is the time for all good men to flee.'],
        ['Now is not the time.']
      ]
    },
    'resizeable' : true,
    'options'    : {
      'wordtree' : {
        'format' : 'implicit'
      }
    }
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizeable) {
      var config = chart.config;
      var target = (config.parent && config.parent[0] == '#') ?
        config.parent.substring(1) : config.parent;
      var targetElt = document.getElementById(target);

      var width = targetElt.clientWidth;
      var height = targetElt.clientHeight;
      dex.console.log("google.WordTree Resize: " + width + "x" + height);
      //var width = d3.select(chart.config.parent).property("clientWidth");
      //var height = d3.select(chart.config.parent).property("clientHeight");
      //chart.attr("width", width).attr("height", height).update();
      chart
        //.attr("options.height", height)
        //.attr("options.width", width)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;
    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    var phrases = [["Phrases"]];
    config.csv.data.forEach(function (row) {
      row.forEach(function (col) {
        phrases.push([col.toLowerCase()]);
      })
    });

    dex.console.log("PHRASES", phrases);

    var data = google.visualization.arrayToDataTable(phrases);

    var chart = new google.visualization.WordTree(
      document.getElementById(target));
    chart.draw(data, config.options);
  };

  $(document).ready(function () {

    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
}