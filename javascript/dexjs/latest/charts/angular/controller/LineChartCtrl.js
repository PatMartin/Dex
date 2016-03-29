'use strict';

dexcharts.controller('LineChartCtrl', function ($scope) {

  //console.log("LineChartCtrl");

  $scope.svgHeight = 800;
  $scope.svgWidth = 800;
  $scope.height = 300;
  $scope.width = 500;
  $scope.id = "LineChart";
  $scope.class = "LineChart";
  $scope.parent = "#ChartArea";
  $scope.xaxis = {
    'axisLabel' : {
      'text' : 'SALESMEN'
    }
  };
  $scope.yaxis = {
    'axisLabel' : {
      'text' : 'SALES'
    }
  };

  $scope.scales = [
    {
      'name' : 'Linear',
      'type' : 'linear'
    },
    {
      'name' : 'Ordinal',
      'type' : 'ordinal'
    },
    {
      'name' : 'Sqrt',
      'type' : 'sqrt'
    },
    {
      'name' : 'Pow',
      'type' : 'pow'
    },
    {
      'name' : 'Log',
      'type' : 'log'
    },
    {
      'name' : 'Time',
      'type' : 'time'
    }
  ];

  $scope.xscale = $scope.scales[0];
  $scope.yscale = $scope.scales[0];

  $scope.csv = {
    'header' : [ "x", "abs(x)", "x^2", "x^3", "cos(x)", "sin(x)" ],
    'data'   : []
  };

  for (var i = -360; i <= 360; i = i + 10) {
    $scope.csv.data.push([i, Math.abs(i), i * i, i * i * i, Math.cos(i * (Math.PI / 180)), Math.sin(i * (Math.PI / 180)) ]);
  }

//console.log("DOLLAR-SCOPE");
//console.dir($scope);
})
;