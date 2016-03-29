dexcharts.directive('lineChart', function () {

  return {
    restrict : 'E',
    replace  : true,
    template : '',
    link     : function (scope, element, attrs) {
      //dex.console.log("LINECHART-SCOPE", scope);
      //dex.console.log("LINECHART-ATTRS", attrs);
      scope['id'] = (attrs['id']) ? attrs['id'] : scope['id'];
      scope['class'] = (attrs['class']) ? attrs['class'] : scope['class'];
      var chart = new LineChart(
        {
          'parent'                         : scope.parent,
          'id'                             : scope['id'],
          'class'                          : scope['class'],
          'csv'                            : scope.csv,
          'transform'                      : 'translate(150, 50)',
          'yi'                             : [2, 3],
          'xaxis.scale.type'               : 'linear',
          'xaxis.axisLabel.text'           : scope.xaxis.axisLabel.text,
          'xaxis.axisLabel.dx'             : 295,
          'xaxis.axisLabel.dy'             : 50,
          'xaxis.axisLabel.fill.fillColor' : 'black',
          'yaxis.scale.type'               : 'sqrt',
          'yaxis.axisLabel.text'           : scope.yaxis.axisLabel.text,
          'yaxis.axisLabel.dx'             : -50,
          'yaxis.axisLabel.dy'             : 200,
          'yaxis.axisLabel.fill.fillColor' : 'black'
        });

      chart.render();

      ['width', 'height', 'xaxis.axisLabel.text', 'yaxis.axisLabel.text'].forEach(function (watchVar) {
        scope.$watch(watchVar, function (newVal, oldVal) {
          //dex.console.log("watching", watchVar);
          d3.selectAll('#' + scope.id).remove();
          chart.attr(watchVar, newVal).update();
        })
      });

      scope.$watch('xscale', function (newVal, oldVal) {
        dex.console.log("xscale changed", scope.xscale);
        d3.selectAll('#' + scope.id).remove();
        chart.attr('xaxis.type', newVal.type).update();
      });

      scope.$watch('yscale', function (newVal, oldVal) {
        dex.console.log("yscale changed", scope.xscale);
        d3.selectAll('#' + scope.id).remove();
        chart.attr('yaxis.type', newVal.type).update();
      });
    }
  }
});