dex.charts.google.DiffBarChart = function (userConfig) {

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
      'bars' : 'horizontal',
      'hAxis.viewWindowMode' : 'maximized',
      'vAxis.viewWindowMode' : 'maximized',
      'chartArea.width' : function() { return chart.config.width * 0.8; },
      'chartArea.height' : function() { return chart.config.height * 0.8; }
    }
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.attr("options.chart.title", 'title')
      .attr("options.chart.subtitle", 'subtitle')
      .attr("options.colors", [
        'steelblue', 'red', 'blue', 'green',
        'orange', 'purple', 'grey', 'brown',
        'cyan', 'magenta']);
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
      dex.console.log("google.DiffPieChart Resize: " + width + "x" + height);

      chart
        .attr("width", width)
        .attr("height", height)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;

    // Keep a copy of the before and after data
    var beforeData = [dex.array.copy(config.csv.header)];
    var afterData = [dex.array.copy(config.csv.header)];

    // Find the category we're grouping on.
    var groupIndex = config.csv.header.indexOf(config.diff.category);

    // Nothing to chart if the group index is invalid.  Simply return.
    if (groupIndex < 0) {
      return;
    }

    // Iterate over each row in the data:
    config.csv.data.forEach(function (row) {
      // Copy the rows with matching group indexes.
      if (row[groupIndex] == config.diff.compareGroups[0]) {
        beforeData.push(dex.array.copy(row));
      }
      else if (row[groupIndex] == config.diff.compareGroups[1]) {
        afterData.push(dex.array.copy(row));
      }
    })

    // Remove the group index from the copied data.
    beforeData.forEach(function (row) {
      row.splice(groupIndex, 1);
    });
    afterData.forEach(function (row) {
      row.splice(groupIndex, 1);
    });

    dex.console.log("csv", config.csv, "before", beforeData, "after", afterData);

    // Get the valid query string for the parent:
    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    // Use js dom to locate the target node.
    var targetNode = document.getElementById(target);

    // Delete the children.
    while (targetNode.firstChild) {
      targetNode.removeChild(targetNode.firstChild);
    }

    var beforeDataTable = google.visualization.arrayToDataTable(beforeData);
    var afterDataTable = google.visualization.arrayToDataTable(afterData);

    var diffChart = new google.visualization.BarChart(targetNode);

    var diffDataTable = diffChart.computeDiff(beforeDataTable, afterDataTable);
    diffChart.draw(diffDataTable, config.options);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
}