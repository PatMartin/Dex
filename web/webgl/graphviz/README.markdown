Graph-Visualization
===================

This project is about 3D graph visualization with WebGL. The aim of this project is to evaluate the possibilities of graph drawing in WebGL.

This project uses Three.js for drawing and currently supports a force directed layout.


### Run the example ###

1. Clone or download the project
2. Open the index_sample.html in a WebGL-compatible browser

You may copy the index_sample.html to index.html and customize it.

Project Description
-------------------

The project consists of

  - a graph structure
  - a graph layout implementation
  - and a graph drawing implementation

### Graph Structure ###

This is implemented in graph-visualization/Graph.js. 

Usage:

    var graph = new Graph({limit: 100});  // set maximum number of nodes, optional
    var node1 = new Node(1);              // create nodes with id
    var node2 = new Node(2);
    graph.addNode( node1 );               // add nodes
    graph.addNode( node2 );
    graph.addEdge( node1, node2 );        // create edge between nodes

Node:

A node has the properties

  - `ID`
  - `nodesTo`, Array with connected nodes 
  - `nodesFrom`, Array with connected nodes 
  - `position`, Object for x, y, z position, default is {}
  - `data`, Object with further properties, e.g. properties for a graph layout

For more details have a look at the [source code](https://github.com/davidpiegza/Graph-Visualization/blob/master/Graph.js).

### Graph Layout ###

A graph layout has the basic structure:

    var Layout = Layout || {};
    Layout.ForceDirected = function(graph, options) {
      this.init = function() {
        ...
      };
      
      this.generate = function() {
        ...
      };
    }

The init() function is called after graph creation, the generate() function is called on each render-call.

The graph layout gets the created graph and calculates new positions for the nodes. The generate() function is called repeatedly, so there must be a stop condition after finished calculation.

The graph layout may extend the nodes and edges with custom properties in the data object.

See [force-based-layout.js](https://github.com/davidpiegza/Graph-Visualization/blob/master/layouts/force-based-layout.js) for example usage.