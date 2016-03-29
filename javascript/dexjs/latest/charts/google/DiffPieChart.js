dex.charts.google.DiffPieChart = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'PieChart',
    'class'      : 'PieChart',
    // Our data...
    'csv'        : {
      'header' : ['Category', 'Major', 'Degrees'],
      'data'   : [
        ['old', 'Business', 256070],
        ['old', 'Education', 108034],
        ['old', 'Social Sciences & History', 127101],
        ['old', 'Health', 81863],
        ['old', 'Psychology', 74194],
        ['new', 'Business', 358293],
        ['new', 'Education', 101265],
        ['new', 'Social Sciences & History', 172780],
        ['new', 'Health', 129634],
        ['new', 'Psychology', 97216]]
    },
    'resizeable' : true,
    'diff'       : {
      'compare'       : 'Category',
      'compareGroups' : ['old', 'new']
    },
    'options'    : {
      'title'           : 'default title',
      'legend.position' : 'bottom'
    }
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart
      .resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizeable) {
      var config = chart.config;
      var target = (config.parent && config.parent[0] == '#') ?
        config.parent.substring(1) : config.parent;
      var targetElt = document.getElementById(target);

      var width = targetElt.clientWidth;
      var height = targetElt.clientHeight;
      dex.console.log("google.DiffPieChart Resize: " + width + "x" + height);

      chart
        .attr("width", width)
        .attr("height", height)
        .attr("options.chartArea.width", width * .8)
        .attr("options.chartArea.height", height * .8)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;

    var oldData = [dex.array.copy(config.csv.header)];
    var newData = [dex.array.copy(config.csv.header)];
    var groupIndex = config.csv.header.indexOf(config.diff.category);

    if (groupIndex < 0) {
      return;
    }

    config.csv.data.forEach(function (row) {
      if (row[groupIndex] == config.diff.compareGroups[0]) {
        oldData.push(dex.array.copy(row));
      }
      else if (row[groupIndex] == config.diff.compareGroups[1]) {
        newData.push(dex.array.copy(row));
      }
    })

    newData.forEach(function (row) {
      row.splice(groupIndex, 1);
    });
    oldData.forEach(function (row) {
      row.splice(groupIndex, 1);
    });

    dex.console.log("csv", config.csv, "old", oldData, "new", newData);

    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    var targetNode = document.getElementById(target);

    while (targetNode.firstChild) {
      targetNode.removeChild(targetNode.firstChild);
    }

    var oldDataTable = google.visualization.arrayToDataTable(oldData);
    var newDataTable = google.visualization.arrayToDataTable(newData);

    var diffChart = new google.visualization.PieChart(targetNode);

    var diffDataTable = diffChart.computeDiff(oldDataTable, newDataTable);
    diffChart.draw(diffDataTable, config.options);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
}