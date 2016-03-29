dexcharts.directive('barChart', function () {

  return {
    restrict : 'E',
    replace  : true,
    template : '<svg id="ChartArea"></svg>',
    link     : function (scope, element, attrs) {
      console.log("SCOPE");
      console.dir(scope);
      var barchart = new BarChart(
        {
          'parent'                               : "#ChartArea",
          'id' : 'MyBarChart',
          'csv'                                  : scope.csv,
          'width'                                : scope.width-100,
          'height'                               : scope.height-150,
          'yi'                                   : [1, 2],
          'xaxis.scale.type'                     : 'ordinal',
          'xaxis.scale.domain'                   : scope.csv.data.map(function (row) {
            return row[0];
          }),
          'xaxis.scale.rangePoints'              : [ 0, scope.width-100 ],
          'xaxis.label.text'                     : "SALESMAN",
          'xaxis.label.transform'                : 'translate(200 50)',
          'yaxis.scale.type'                     : 'linear',
          'yaxis.scale.domain'                   : [ 0, 1000 ],
          'yaxis.scale.range'                    : [ scope.height-150, 0 ],
          'yaxis.label.text'                     : "SALES",
          'yaxis.tickFormat'                     : d3.format('$.2f'),
          'yaxis.label.writingMode'              : 'tb',
          'yaxis.label.glyphOrientationVertical' : 0,
          'yaxis.label.transform'                : 'translate(-80 100)',
          'xmin'                                 : 0,
          'ymin'                                 : 0
        });

      barchart.render();

      ['width', 'height', 'xtitle'].forEach(function(watchVar) {
        scope.$watch(watchVar, function(newVal, oldVal) {
          dex.console.log("watching", watchVar);
          d3.selectAll('#MyBarChart').remove();
          barchart.attr(watchVar, newVal).update();
        })
      });
    }
  }
});