dex.charts.d3.Treemap = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#Treemap',
        // Set these when you need to CSS style components independently.
        'id': 'Treemap',
        'class': 'Treemap',
        'resizable': true,
        // Our data...
        'csv': {
            // Give folks without data something to look at anyhow.
            'header': ["NAME", "PACAGE", "SIZE"],
            'data': [
                ["name1", "package1", 100],
                ["name2", "package2", 50],
                ["name3", "package3", 25]
            ]
        },
        'width': "100%",
        'height': "100%",
        'transform': "translate(0 0)",
        'title': dex.config.text(),
        'label': dex.config.text()
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

        d3.selectAll("#" + config.id).remove();

        var chartContainer = d3.select(config.parent).append("g")
            .attr("class", config["id"])
            .attr("id", config["id"])
            .attr("transform", config.transform);

        var w = 1280 - 80,
            h = 800 - 180,
            x = d3.scale.linear().range([0, w]),
            y = d3.scale.linear().range([0, h]),
            color = d3.scale.category20c(),
            root,
            node;

        var treemap = d3.layout.treemap()
            .round(false)
            .size([w, h])
            .sticky(true)
            .value(function (d) {
                return d.size;
            });

        var data = dex.csv.toNestedJson(dex.csv.copy(csv));
        dex.console.log("DATA", csv, data);

        /*
        var svg = d3.select("#body").append("div")
            .attr("class", "chart")
            .style("width", w + "px")
            .style("height", h + "px")
            .append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(.5,.5)");
*/

        node = root = data;

        var nodes = treemap.nodes(root)
            .filter(function (d) {
                return !d.children;
            });

        var cell = chartContainer.selectAll("g")
            .data(nodes)
            .enter().append("svg:g")
            .attr("class", "cell")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .on("click", function (d) {
                return zoom(node == d.parent ? root : d.parent);
            });

        cell.append("svg:rect")
            .attr("width", function (d) {
                return d.dx - 1;
            })
            .attr("height", function (d) {
                return d.dy - 1;
            })
            .style("fill", function (d) {
                return color(d.parent.name);
            });

        cell.append("svg:text")
            .attr("x", function (d) {
                return d.dx / 2;
            })
            .attr("y", function (d) {
                return d.dy / 2;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.name;
            })
            .style("opacity", function (d) {
                d.w = this.getComputedTextLength();
                return d.dx > d.w ? 1 : 0;
            });

        d3.select(window).on("click", function () {
            zoom(root);
        });

        d3.select("select").on("change", function () {
            treemap.value(this.value == "size" ? size : count).nodes(root);
            zoom(node);
        });


        function size(d) {
            return d.size;
        }

        function count(d) {
            return 1;
        }

        function zoom(d) {
            var kx = w / d.dx, ky = h / d.dy;
            x.domain([d.x, d.x + d.dx]);
            y.domain([d.y, d.y + d.dy]);

            var t = chartContainer.selectAll("g.cell").transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .attr("transform", function (d) {
                    return "translate(" + x(d.x) + "," + y(d.y) + ")";
                });

            t.select("rect")
                .attr("width", function (d) {
                    return kx * d.dx - 1;
                })
                .attr("height", function (d) {
                    return ky * d.dy - 1;
                })

            t.select("text")
                .attr("x", function (d) {
                    return kx * d.dx / 2;
                })
                .attr("y", function (d) {
                    return ky * d.dy / 2;
                })
                .style("opacity", function (d) {
                    return kx * d.dx > d.w ? 1 : 0;
                });

            node = d;
            d3.event.stopPropagation();
        }

    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
}


