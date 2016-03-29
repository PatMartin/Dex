dex.charts.d3.Sankey = function (userConfig) {
    var defaultColor = d3.scale.category20c();

    var defaults =
    {
        // The parent container of this chart.
        'parent': null,
        // Set these when you need to CSS style components independently.
        'id': 'Sankey',
        'class': 'Sankey',
        // Our data...
        'csv': {
            // Give folks without data something to look at anyhow.
            'header': ["X", "Y", "WEIGHT"],
            'data': [
                ["A1", "A2", 1],
                ["B1", "B2", 2],
                ["C1", "C2", 2],
                ["C2", "C3", 4]
            ]
        },
        'relationships': null,
        // width and height of our bar chart.
        'width': "100%",
        'height': "100%",
        // The x an y indexes to chart.
        "transform": "translate(5,0) scale(.95)",
        'layoutIterations': 32,
        'columnTitle': dex.config.text({
                'fill.fillColor': 'black',
                'x': function (d) {
                    var center = window.innerWidth / 2;
                    //var center = (typeof userConfig.width !== 'undefined' ?
                    //  userConfig.width : defaults.width) / 2;

                    var nodeWidth = (userConfig.mouseout && userConfig.mouseout.node &&
                    userConfig.mouseout.node.rectangle && userConfig.mouseout.node.rectangle.width) ?
                        userConfig.mouseout.node.rectangle.width : defaults.mouseout.node.rectangle.width;

                    var nodePadding = (userConfig.mouseout && userConfig.mouseout.node &&
                    userConfig.mouseout.node.padding) ?
                        userConfig.mouseout.node.padding : defaults.mouseout.node.padding;

                    //dex.console.log("d.x=" + d.x + ", width=" + window.innerWidth + ", nodeWidth=" + nodeWidth +
                    //  ", nodePadding=" + nodePadding + ", center=" + center);
                    if (+d > center) {
                        //return +d-nodePadding-nodeWidth;
                        return +d + nodeWidth / 2;
                    }
                    else {
                        //return +d + nodeWidth + nodePadding;
                        return +d + nodeWidth / 2;
                    }
                },
                "y": 10,
                "writingMode": "tb",
                "glyphOrientationVertical": 0,
                "anchor": function (d, i) {
                    //var center = (typeof userConfig.width !== 'undefined' ?
                    // userConfig.width : defaults.width) / 2;
                    var center = window.innerWidth / 2;

                    if (+d > center) {
                        // End if horizontal
                        return "start";
                    }
                    else {
                        return "start";
                    }
                },
                "text": function (d, i) {
                    return d + ", i" + i;
                }
            }
        ),
        'label': dex.config.text({
            'fill.fillColor': 'black',
            'x': function (d) {
                var center = window.innerWidth / 2;
                //var center = (typeof userConfig.width !== 'undefined' ?
                //  userConfig.width : defaults.width) / 2;

                var nodeWidth = (userConfig.mouseout && userConfig.mouseout.node &&
                userConfig.mouseout.node.rectangle &&
                userConfig.mouseout.node.rectangle.width) ?
                    userConfig.mouseout.node.rectangle.width : defaults.mouseout.node.rectangle.width;

                var nodePadding = (userConfig.mouseout && userConfig.mouseout.node &&
                userConfig.mouseout.node.padding) ?
                    userConfig.mouseout.node.padding : defaults.mouseout.node.padding;

                //dex.console.log("d.x=" + d.x + ", width=" + window.innerWidth + ", nodeWidth=" + nodeWidth +
                //  ", nodePadding=" + nodePadding + ", center=" + center);
                if (d.x > center) {
                    return -nodePadding;
                }
                else {
                    return nodeWidth + nodePadding;
                }
            },
            'y': function (d) {
                return d.dy / 2;
            },
            'transform': null,
            'dy': '.35em',
            'anchor': function (d, i) {
                //var center = (typeof userConfig.width !== 'undefined' ?
                // userConfig.width : defaults.width) / 2;
                var center = window.innerWidth / 2;

                if (d.x > center) {
                    return "end";
                }
                else {
                    return "start";
                }
            },
            'font': {
                'size': 14
            },
            'color': "black",
            'opacity': 1,
            'text': function (d) {
                return d.name;
            }
        }),
        //'columnLayout' : function(node, nodeMap) { return nodeMap[node.name].column },
        'mouseout': {
            'link': {
                'stroke': dex.config.stroke({
                    'opacity': .2,
                    'color': function (d) {
                        return defaultColor(d.category);
                    },
                    'width': function (d) {
                        //return 0;
                        return Math.max(1, d.dy);
                    }
                }),
                'fill' : dex.config.fill({
                    'fillColor': 'none',
                    'fillOpacity': .4
                }),
                'curvature': 0.5
            },
            'node': {
                'padding': 4,
                'rectangle': dex.config.rectangle(
                    {
                        'width': 32,
                        'color': function (d) {
                            return defaultColor(d.name.replace(/ .*/, ""));
                        },
                        'height': function (d) {
                            return d.dy;
                        },
                        'stroke': dex.config.stroke({
                            'color': function (d) {
                                return d3.rgb(d.color).darker(2);
                            }
                        })
                    })
            }
        },
        'mouseover': {
            'link': {
                'stroke': dex.config.stroke({
                    'opacity': .8,
                    'width': function (d) {
                        return Math.max(1, d.dy);
                    },
                    'color': function (d) {
                        return defaultColor(d.category);
                    }
                }),
                'fill' : dex.config.fill({
                    'fillColor': 'none',
                    'fillOpacity': .8
                }),
            },
            'node': {
                'stroke': dex.config.stroke({
                    'opacity': .8,
                    'width': function (d) {
                        return Math.max(1, d.dy);
                    },
                    'color': function (d) {
                        return defaultColor(d.category);
                    }
                }),
                'fill' : dex.config.fill({
                    'fillColor': 'none',
                    'fillOpacity': .8
                })
            }
        },
        'node': {
            'padding': 4,
            'rectangle': dex.config.rectangle(
                {
                    'width': 32,
                    'color': function (d) {
                        return defaultColor(d.name.replace(/ .*/, ""));
                    },
                    'height': function (d) {
                        return d.dy;
                    },
                    'stroke': dex.config.stroke({
                        'color': function (d) {
                            return d3.rgb(d.color).darker(2);
                        }
                    })
                })
        },
        "manualColumnLayout": false
    };

    //dex.console.log("USER-CONFIG", userConfig, "DEFAULTS:", defaults);
    var config = dex.object.overlay(dex.config.expand(userConfig), dex.config.expand(defaults));

    // If we do not have specifically defined relationship fields, then lets
    // try to make an educated guess about what to do with them.  If the last
    // column is numeric, we will assume that this is to be used as a weight.
    // Otherwise, we will use a uniform weighting of 1 for each link.
    if (!config.relationships) {
        // If we have less than 3 columns or the last column does not contain
        // numerics then we will create a set of relationships for each column
        // with a standard weight of 1 and a single category of 1.
        if (config.csv.header.length < 3 || !dex.csv.isColumnNumeric(config.csv, config.csv.header.length - 1)) {
            config.relationships = [];

            for (i = 1; i < config.csv.header.length; i++) {
                config.relationships.push(
                    {
                        'source': i - 1,
                        'target': i,
                        'value': function (csv, ri) {
                            return 1;
                        },
                        'category': function (csv, ri) {
                            return 1;
                        },
                        'column': function (csv, ri, ci) {
                            return i;
                        }
                    });
            }
        }
        // If we fall through here, then the last column is numeric.  We will
        // use this for our weight.
        else {
            config.relationships = [];

            for (i = 1; i < config.csv.header.length - 1; i++) {
                config.relationships.push(
                    {
                        'source': i - 1,
                        'target': i,
                        'value': function (csv, ri) {
                            return csv.data[ri][csv.header.length - 1];
                        },
                        'category': function (csv, ri) {
                            return 1;
                        },
                        'column': function (csv, ri, ci) {
                            return i;
                        }
                    });
            }
        }
    }

    var chart = new dex.component(userConfig, config);

    // TODO: Figure out how I want to do this.  Partial implementation.
    chart.renderGui = function () {
        dex.console.log("SETTINGS", d3.select("#settings").select("#" + chart.config.id).selectAll("#setting"));
        d3.select("#settings").select("#" + chart.config.id).selectAll("#setting").each(function (d) {
            dex.console.log("SETTING", d);
        });
    };

    chart.render = function () {
        window.onresize = this.resize;
        this.update();
    };

    chart.resize = function () {
        var width = window.innerWidth;
        var height = window.innerHeight;

        //dex.console.log(config.id + " RESIZING: " + width + "x" + height);
        d3.selectAll("#" + config.id).remove();

        chart.attr("width", width)
            .attr("height", height)
            .update();
    };

    chart.update = function () {
        var config = chart.config;
        //dex.console.log("UPDATING CHART....");
        //dex.console.log("-- WIDTH : " + config.width);
        //dex.console.log("-- HEIGHT: " + config.height);
        var width = d3.select(config.parent).property("clientWidth");
        var height = d3.select(config.parent).property("clientHeight");

        d3.selectAll("#" + config.id).remove();

        var chartContainer = d3.select(config.parent).append("g")
            .attr("class", config["id"])
            .attr("id", config["id"])
            .attr("width", config.width)
            .attr("height", config.height)
            .attr("transform", config.transform);

        var sankeyData = [];

        var nodeMap = {};

        for (ri = 0; ri < config.relationships.length; ri++) {
            for (i = 0; i < config.csv.data.length; i++) {
                var relation = [];
                var source;
                var target;

                if (dex.object.isFunction(config.relationships[ri].source)) {
                    source = config.relationships[ri].source(config.csv, i);
                }
                else {
                    source =
                    {
                        'nodeName': config.csv.data[i][config.relationships[ri].source],
                        'name': config.csv.data[i][config.relationships[ri].source],
                        'column': (config.relationships[ri].column) ?
                            config.relationships[ri].column(csv, i, config.relationships[ri].source) :
                            config.relationships[ri].source
                    };
                }

                if (dex.object.isFunction(config.relationships[ri].target)) {
                    target = config.relationships[ri].target(config.csv, i);
                }
                else {
                    target =
                    {
                        'nodeName': config.csv.data[i][config.relationships[ri].target],
                        'name': config.csv.data[i][config.relationships[ri].target],
                        'column': (config.relationships[ri].column) ?
                            config.relationships[ri].column(csv, i, config.relationships[ri].target) :
                            config.relationships[ri].target
                    }
                }

                relation.source = source.nodeName;
                relation.target = target.nodeName;

                // Store this to translate nodenames back to display names.
                nodeMap[source.nodeName] = source;
                nodeMap[target.nodeName] = target;

                // Wrap source and target info:
                //dex.console.log("RELATION", config.relationships[ri]);
                if (typeof config.relationships[ri].category === "undefined") {
                    //relation.category = csv.data[i][config.relationships[ri].source];
                    relation.category = 1;
                }
                else if (dex.object.isFunction(config.relationships[ri].category)) {
                    relation.category = config.relationships[ri].category(config.csv, i);
                }
                else {
                    relation.category = config.relationships[ri].category;
                }

                relation.linkid = "L" + i;

                if (typeof config.relationships[ri].value === "undefined") {
                    relation.value = 1;
                }
                else if (dex.object.isFunction(config.relationships[ri].value)) {
                    relation.value = config.relationships[ri].value(config.csv, i);
                }
                else {
                    relation.value = config.relationships[ri].value;
                }

                sankeyData.push(relation);
            }
        }
        //dex.console.log("sankeyData", sankeyData);
        var units = "Units";

        var formatNumber = d3.format(",.0f"),    // zero decimal places
            format = function (d) {
                return formatNumber(d) + " " + units;
            };

        chartContainer.onresize = chart.resize;

        function manualColumnLayout(nodes, nodeWidth, size) {
            var numSinks = 1;

            nodes.forEach(function (node) {
                //node.x = (nodeMap[node.name].column) * nodeWidth;
                node.x = (nodeMap[node.name].column - 1) * nodeWidth;
                numSinks = Math.max(numSinks, node.x);
                node.dx = nodeWidth;
            });

            var nodeBreadth = (size[0] - nodeWidth) / (numSinks - 1);
            nodes.forEach(function (node) {
                node.x *= nodeBreadth;
            });
        }

        // Set the sankey diagram properties
        var sankey = d3.sankey()
            .nodeWidth(config.mouseout.node.rectangle.width)
            .nodePadding(config.mouseout.node.padding)
            .size([width - config.mouseout.node.padding, height - config.mouseout.node.padding]);

        if (config.manualColumnLayout) {
            sankey.columnLayout(manualColumnLayout);
        }

        var path = sankey.link();

        //set up graph in same style as original example but empty
        graph = {"nodes": [], "links": []};

        sankeyData.forEach(function (d, i) {
            graph.nodes.push({"name": d.source});
            graph.nodes.push({"name": d.target});
            graph.links.push({
                "source": d.source, "target": d.target, "value": +d.value,
                "category": d.category, "linkid": d.linkid
            });
        });

        //dex.console.log("GRAPH NODES 1", graph.nodes);

        //thanks Mike Bostock https://groups.google.com/d/msg/d3-js/pl297cFtIQk/Eso4q_eBu1IJ
        //this handy little function returns only the distinct / unique nodes
        graph.nodes = d3.keys(d3.nest()
            .key(function (d) {
                return d.name;
            })
            .map(graph.nodes));

        //dex.console.log("GRAPH NODES 2", graph.nodes);

        // it appears d3 with force layout wants a numeric source and target
        // so loop through each link replacing the text with its index from node
        graph.links.forEach(function (d, i) {
            graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
            graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
        });

        //now loop through each nodes to make nodes an array of objects rather than an array of strings
        graph.nodes.forEach(function (d, i) {
            graph.nodes[i] = {"name": d};
        });

        sankey
            .nodes(graph.nodes)
            .links(graph.links)
            .curvature(config.mouseout.link.curvature)
            .layout(config.layoutIterations);

        // add in the links
        var link = chartContainer.append("g").selectAll(".link")
            .data(graph.links)
            .enter().append("path")
            .attr("class", "link")
            .attr("id", function (d) {
                return d.linkid;
            })
            .attr("d", path)
            .call(dex.config.configureLink, config.mouseout.link)
            .sort(function (a, b) {
                return b.dy - a.dy;
            })
            .on("mouseover", function (d) {
                d3.selectAll("#" + d.linkid)//.style("stroke-opacity", 1)
                    .call(dex.config.configureLink, config.mouseover.link);
            })
            .on("mouseout", function (d) {
                d3.selectAll("#" + d.linkid)//.style("stroke-opacity", config.link.stroke.opacity);
                    .call(dex.config.configureLink, config.mouseout.link);
            });

        // add the link titles
        link.append("tooltip-content")
            .text(function (d) {
                return nodeMap[d.source.name].name + " -> " +
                    nodeMap[d.target.name].name + "\n" + format(d.value);
            });

        // add in the nodes
        var node = chartContainer.append("g").selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .call(d3.behavior.drag()
                .origin(function (d) {
                    return d;
                })
                .on("dragstart", function () {
                    this.parentNode.appendChild(this);
                })
                .on("drag", dragmove));

        // add the rectangles for the nodes
        node.append("rect")
            .call(dex.config.configureRectangle, config.mouseout.node.rectangle)
            .on("mouseover", function (d) {
                var links = (d.sourceLinks.length > 0) ?
                    d.sourceLinks : d.targetLinks;

                links.forEach(function (link) {
                    d3.selectAll("#" + link.linkid)
                        .call(dex.config.configureLink, config.mouseover.node);
                });
            })
            .on("mouseout", function (d) {

                var links = (d.sourceLinks.length > 0) ?
                    d.sourceLinks : d.targetLinks;
                links.forEach(function (link) {
                    d3.selectAll("#" + link.linkid)
                        .call(dex.config.configureLink, config.mouseout.link);
                });
            })
            .append("title")
            .text(function (d) {
                return nodeMap[d.name].name + "\n" + format(d.value);
            });

        config.label.text = function (d) {
            return nodeMap[d.name].name;
        };

        /////////// A HACK TO ADD TITLE LABELS
        var locations = {};
        var rects = d3.selectAll("rect").each(function (rect) {
            locations[rect.x] = true;
        });

        var orderedLocations = dex.object.keys(locations).sort(function (a, b) {
            return a - b;
        });

        //var locationWidth = (orderedLocations[1] - orderedLocations[0]) / 2;

        //orderedLocations = orderedLocations.map(function(d) { return +d + locationWidth});

        var titles = chartContainer.append("g").selectAll("text")
            .data(orderedLocations)
            .enter()
            .append("text")
            .call(dex.config.configureText, config.columnTitle)
            .text(function (d, i) {
                return csv.header[i];
            });

        //////////// END OF HACK

        // add in the title for the nodes
        node.append("text")
            .call(dex.config.configureText, config.label);

        // the function for moving the nodes
        function dragmove(d) {
            d3.select(this).attr("transform",
                "translate(" + (
                    d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
                ) + "," + (
                    d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                ) + ")");
            sankey.relayout();
            link.attr("d", path);
        }
    };

    return chart;
}

// SANKEY.JS : from Mike Bostock
d3.sankey = function () {
    var sankey = {},
        nodeWidth = 24,
        nodePadding = 8,
        columnLayout = defaultColumnLayout,
        curvature = .5,
        size = [1, 1],
        nodes = [],
        links = [];

    sankey.columnLayout = function (_) {
        if (!arguments.length) return columnLayout;
        columnLayout = _;
        return sankey;
    };

    sankey.curvature = function (_) {
        if (!arguments.length) return curvature;
        curvature = +_;
        return sankey;
    };

    sankey.nodeWidth = function (_) {
        if (!arguments.length) return nodeWidth;
        nodeWidth = +_;
        return sankey;
    };

    sankey.nodePadding = function (_) {
        if (!arguments.length) return nodePadding;
        nodePadding = +_;
        return sankey;
    };

    sankey.nodes = function (_) {
        if (!arguments.length) return nodes;
        nodes = _;
        return sankey;
    };

    sankey.links = function (_) {
        if (!arguments.length) return links;
        links = _;
        return sankey;
    };

    sankey.size = function (_) {
        if (!arguments.length) return size;
        size = _;
        return sankey;
    };

    sankey.layout = function (iterations) {
        computeNodeLinks();
        computeNodeValues();
        computeNodeBreadths(nodes);
        computeNodeDepths(iterations);
        computeLinkDepths();
        return sankey;
    };

    sankey.relayout = function () {
        computeLinkDepths();
        return sankey;
    };

    sankey.link = function () {
//    var curvature = .5;

        function link(d) {
            var x0 = d.source.x + d.source.dx,
                x1 = d.target.x,
                xi = d3.interpolateNumber(x0, x1),
                x2 = xi(curvature),
                x3 = xi(1 - curvature),
                y0 = d.source.y + d.sy + d.dy / 2,
                y1 = d.target.y + d.ty + d.dy / 2;
            return "M" + x0 + "," + y0
                + "C" + x2 + "," + y0
                + " " + x3 + "," + y1
                + " " + x1 + "," + y1;
        }

        link.curvature = function (_) {
            if (!arguments.length) return curvature;
            curvature = +_;
            return link;
        };

        return link;
    };

    // Populate the sourceLinks and targetLinks for each node.
    // Also, if the source and target are not objects, assume they are indices.
    function computeNodeLinks() {
        nodes.forEach(function (node) {
            node.sourceLinks = [];
            node.targetLinks = [];
        });
        links.forEach(function (link) {
            var source = link.source,
                target = link.target;
            if (typeof source === "number") source = link.source = nodes[link.source];
            if (typeof target === "number") target = link.target = nodes[link.target];
            source.sourceLinks.push(link);
            target.targetLinks.push(link);
        });
    }

    // Compute the value (size) of each node by summing the associated links.
    function computeNodeValues() {
        nodes.forEach(function (node) {
            node.value = Math.max(
                d3.sum(node.sourceLinks, value),
                d3.sum(node.targetLinks, value)
            );
        });
    }

    // Iteratively assign the breadth (x-position) for each node.
    // Nodes are assigned the maximum breadth of incoming neighbors plus one;
    // nodes with no incoming links are assigned breadth zero, while
    // nodes with no outgoing links are assigned the maximum breadth.
    function computeNodeBreadths() {
        columnLayout(nodes, nodeWidth, size);
    }

    function defaultColumnLayout(nodes, nodeWidth, size) {
        var remainingNodes = nodes,
            visited = {},
            x = 0;

        //dex.console.log("NODE", nodes[0]);
        while (remainingNodes.length) {
            nextNodes = [];
            visited[remainingNodes[0].name] = true;
            remainingNodes.forEach(function (node) {
                node.x = x;
                node.dx = nodeWidth;
                node.sourceLinks.forEach(function (link) {
                    if (!visited[link.target.name]) {
                        nextNodes.push(link.target);
                    }
                    else {
                        dex.console.log("CYCLE DETECTED AT: " + node.name + "->" + link.target.name);
                    }
                });
            });
            remainingNodes = nextNodes;
            ++x;
        }

        moveSinksRight(x);
        scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
    }

    function moveSourcesRight() {
        nodes.forEach(function (node) {
            if (!node.targetLinks.length) {
                node.x = d3.min(node.sourceLinks, function (d) {
                        return d.target.x;
                    }) - 1;
            }
        });
    }

    function moveSinksRight(x) {
        nodes.forEach(function (node) {
            if (!node.sourceLinks.length) {
                node.x = x - 1;
            }
        });
    }

    function scaleNodeBreadths(kx) {
        nodes.forEach(function (node) {
            node.x *= kx;
        });
    }

    function computeNodeDepths(iterations) {
        var nodesByBreadth = d3.nest()
            .key(function (d) {
                return d.x;
            })
            .sortKeys(d3.ascending)
            .entries(nodes)
            .map(function (d) {
                return d.values;
            });

        //
        initializeNodeDepth();
        resolveCollisions();
        for (var alpha = 1; iterations > 0; --iterations) {
            relaxRightToLeft(alpha *= .99);
            resolveCollisions();
            relaxLeftToRight(alpha);
            resolveCollisions();
        }

        function initializeNodeDepth() {
            var ky = d3.min(nodesByBreadth, function (nodes) {
                return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
            });

            nodesByBreadth.forEach(function (nodes) {
                nodes.forEach(function (node, i) {
                    node.y = i;
                    node.dy = node.value * ky;
                });
            });

            links.forEach(function (link) {
                link.dy = link.value * ky;
            });
        }

        function relaxLeftToRight(alpha) {
            nodesByBreadth.forEach(function (nodes, breadth) {
                nodes.forEach(function (node) {
                    if (node.targetLinks.length) {
                        var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
                        node.y += (y - center(node)) * alpha;
                    }
                });
            });

            function weightedSource(link) {
                return center(link.source) * link.value;
            }
        }

        function relaxRightToLeft(alpha) {
            nodesByBreadth.slice().reverse().forEach(function (nodes) {
                nodes.forEach(function (node) {
                    if (node.sourceLinks.length) {
                        var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
                        node.y += (y - center(node)) * alpha;
                    }
                });
            });

            function weightedTarget(link) {
                return center(link.target) * link.value;
            }
        }

        function resolveCollisions() {
            nodesByBreadth.forEach(function (nodes) {
                var node,
                    dy,
                    y0 = 0,
                    n = nodes.length,
                    i;

                // Push any overlapping nodes down.
                nodes.sort(ascendingDepth);
                for (i = 0; i < n; ++i) {
                    node = nodes[i];
                    dy = y0 - node.y;
                    if (dy > 0) node.y += dy;
                    y0 = node.y + node.dy + nodePadding;
                }

                // If the bottommost node goes outside the bounds, push it back up.
                dy = y0 - nodePadding - size[1];
                if (dy > 0) {
                    y0 = node.y -= dy;

                    // Push any overlapping nodes back up.
                    for (i = n - 2; i >= 0; --i) {
                        node = nodes[i];
                        dy = node.y + node.dy + nodePadding - y0;
                        if (dy > 0) node.y -= dy;
                        y0 = node.y;
                    }
                }
            });
        }

        function ascendingDepth(a, b) {
            return a.y - b.y;
        }
    }

    function computeLinkDepths() {
        nodes.forEach(function (node) {
            node.sourceLinks.sort(ascendingTargetDepth);
            node.targetLinks.sort(ascendingSourceDepth);
        });
        nodes.forEach(function (node) {
            var sy = 0, ty = 0;
            node.sourceLinks.forEach(function (link) {
                link.sy = sy;
                sy += link.dy;
            });
            node.targetLinks.forEach(function (link) {
                link.ty = ty;
                ty += link.dy;
            });
        });

        function ascendingSourceDepth(a, b) {
            return a.source.y - b.source.y;
        }

        function ascendingTargetDepth(a, b) {
            return a.target.y - b.target.y;
        }
    }

    function center(node) {
        return node.y + node.dy / 2;
    }

    function value(link) {
        return link.value;
    }

    $(document).ready(function () {
        // Add tooltips
        $(document).tooltip({
            items: "path",
            content: function () {
                return $(this).find("tooltip-content").text();
            },
            track: true
        });

        // Make the entire chart draggable.
        //$(sankey.config.parent).draggable();
    });

    return sankey;
};