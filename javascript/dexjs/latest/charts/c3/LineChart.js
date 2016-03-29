dex.charts.c3.LineChart = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#LineChart',
        // Set these when you need to CSS style components independently.
        'id': 'LineChart',
        'class': 'LineChart',
        'resizable': true,
        'csv': {
            'header': [],
            'data': []
        },
        'linktype' : 'area',
        'width': "100%",
        'height': "100%"
    };

    var chart = new dex.component(userConfig, defaults);
    var internalChart;
    var selectedColumns = [];

    chart.render = function render() {

        //var chart = this;
        var config = chart.config;
        var csv = config.csv;
        window.onresize = this.render;

        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height);
        }
        d3.select(config.parent).selectAll("*").remove();
        var gtypes = dex.csv.guessTypes(csv);
        selectedColumns = dex.csv.getNumericIndices(csv);
        if (gtypes[0] == "string")
        {
            selectedColumns.unshift(0);
        }
        var ncsv = dex.csv.columnSlice(csv, selectedColumns);

        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var types = {};
        dex.range(1, ncsv.header.length)
          .map(function(hi) { types[ncsv.header[hi-1]] = config.linktype; });

        var c3config = {
            'bindto' : config.parent,
            'data': {
                'x' : columns.header[0],
                'columns' : columns.data,
                'types' : types
            },
            subchart: {
                show: true
            },
            zoom: {
                enabled: true
            },
            legend: {
                position : 'right'
            },
            groups: config.groups
        };

        if (gtypes[0] == "string")
        {
            c3config["axis"] = {
                "x": {
                    "type": "category",
                    "categories": [].concat.apply([],
                      dex.matrix.uniques(dex.matrix.slice(csv.data, [0]))).sort()
                }
            }
        }

        //dex.console.log("CATEGORIES", c3config);
        internalChart = c3.generate(c3config);
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        var gtypes = dex.csv.guessTypes(csv);

        var ncsv = dex.csv.columnSlice(csv, selectedColumns);
        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var types = {};
        dex.range(1, ncsv.header.length)
          .map(function(hi) { types[ncsv.header[hi-1]] = config.linktype; });

        var c3config = {
            'columns' : columns.data
        };

        //internalChart.groups(config.groups);
        internalChart.load(c3config);
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
}


