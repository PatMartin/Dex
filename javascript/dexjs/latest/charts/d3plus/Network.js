dex.charts.d3plus.Network = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#RingNetwork',
        // Set these when you need to CSS style components independently.
        'id': 'RingNetwork',
        'class': 'RingNetwork',
        'resizable': true,
        // Our data...
        'csv': {
            // Give folks without data something to look at anyhow.
            'header': ["NAME", "GENDER", "VEHICLE"],
            'data': [
                ["JIM", "M", "CAR"],
                ["JOE", "M", "CAR"],
                ["PAT", "M", "TRUCK"],
                ["SALLY", "F", "TRUCK"]
            ]
        },
        'connect': 'first',
        'type' : 'rings',
        //'connect' : 'all',
        'width': "100%",
        'height': "100%",
        'transform': "translate(0 0)",
    };

    var chart = new dex.component(userConfig, defaults);

    chart.render = function render() {
        window.onresize = this.resize;
        chart.resize();
    };

    chart.resize = function resize() {
        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height).update();
        }
        else {
            chart.update();
        }
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        var connections = [];

        // Connect everything in the row to the first column.
        if (config.connect == 'first') {
            for (var ri = 0; ri < csv.data.length; ri++) {
                for (var ci = 1; ci < csv.header.length; ci++) {
                    connections.push({'source': csv.data[ri][0], 'target': csv.data[ri][ci]});
                }
            }
        }
        // Connect everything in the row to everything else in the row.
        else {
            for (var ri = 0; ri < csv.data.length; ri++) {
                for (var ci = 1; ci < csv.header.length; ci++) {
                    connections.push({'source': csv.data[ri][ci - 1], 'target': csv.data[ri][ci]});
                }
                connections.push({'source': csv.data[ri][csv.header.length - 1], 'target': csv.data[ri][0]});
            }
        }

        //dex.console.log("Connections", connections);

        // instantiate d3plus
        var viz = d3plus.viz()
            .container(config.parent)
            .type(config.type)
            .edges(connections);

        if (config.edges)
        {
            viz.edges(config.edges);
        }

        if (config.focus)
        {
            viz.focus(config.focus);
        }

        viz.draw();             // finally, draw the visualization!
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
}


