'use strict';

dexApp.controller('DexCtrl', function DexCtrl($scope, $location, $filter, todoStorage) {
});

dexApp.controller('sortableController', function ($scope) {
    'use strict';

    $scope.list = dexApp.buildArray('Item', 5);

    $scope.sortingLog = [];

    $scope.sortableOptions = {
        // called after a node is dropped
        stop: function(e, ui) {
            var logEntry = {
                ID: $scope.sortingLog.length + 1,
                Text: 'Moved element: ' + ui.item.scope().item.text
            };
            $scope.sortingLog.push(logEntry);
        }
    };
});

dexApp.controller('connectedController', function ($scope) {

    $scope.selectedColumns = [ ];
    $scope.stringColumns = csv.header.map(function(h) { return { 'text' : h, 'value' : h, 'type' : 'string' };});
    var ncsv = dex.csv.numericSubset(csv);
    $scope.numericColumns = ncsv.header.map(function(h) { return { 'text' : "#: " + h, 'value' : h, 'type' : 'numeric' };});

    $scope.sortableOptions = {
        connectWith: '.connectedItemsExample .list',
        stop: function(e, ui) {
            dex.console.log("STOP", e, ui, $scope.selectedColumns, $scope.stringColumns, $scope.numericColumns);
            var columnIndexes = $scope.selectedColumns.map(function(d) {
                dex.console.log("D", d);
                return csv.header.indexOf(d.value);
            });
            var newCsv = dex.csv.columnSlice(csv, columnIndexes);
            chart.attr("csv", newCsv);
            $(chart.parent).empty();
            chart.update();
        }
    };

    //dex.console.log("LEFT: ", $scope.leftArray);
    //dex.console.log("RIGHT: ", $scope.rightArray);
});
