'use strict';

dexcharts.controller('BarChartCtrl', function ($scope) {

  console.log("BarChartCtrl");

  $scope.height = 300;
  $scope.width = 500;
  $scope.xtitle = 'SALESMEN';

  $scope.csv = {
    'header' : [ "NAME", "SALES" ],
    'data'   : [
      [ "Bob", Math.random() * 1000, Math.random() * 1000],
      [ "Sue", Math.random() * 1000, Math.random() * 1000],
      [ "Pat", Math.random() * 1000, Math.random() * 1000 ],
      [ "Jimmy", Math.random() * 1000, Math.random() * 1000 ],
      [ "Mike", Math.random() * 1000, Math.random() * 1000],
      [ "Janet", Math.random() * 1000, Math.random() * 1000],
      [ "Rodney", Math.random() * 1000, Math.random() * 1000 ],
      [ "Willie", Math.random() * 1000, Math.random() * 1000 ]
    ]
  };

  console.log("DOLLAR-SCOPE");
  console.dir($scope);
});