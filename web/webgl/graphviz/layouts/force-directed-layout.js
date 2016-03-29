/**
  @author David Piegza

  Implements a force-directed layout, the algorithm is based on Fruchterman and Reingold and
  the JUNG implementation.

  Needs the graph data structure Graph.js:
  https://github.com/davidpiegza/Graph-Visualization/blob/master/Graph.js

  Parameters:
  graph - data structure
  options = {
    layout: "2d" or "3d"
    attraction: <float>, attraction value for force-directed layout
    repulsion: <float>, repulsion value for force-directed layout
    iterations: <int>, maximum number of iterations
    width: <int>, width of the viewport
    height: <int>, height of the viewport

    positionUpdated: <function>, called when the position of the node has been updated
  }
  
  Examples:
  
  create:
  layout = new Layout.ForceDirected(graph, {width: 2000, height: 2000, iterations: 1000, layout: "3d"});
  
  call init when graph is loaded (and for reset or when new nodes has been added to the graph):
  layout.init();
  
  call generate in a render method, returns true if it's still calculating and false if it's finished
  layout.generate();


  Feel free to contribute a new layout!

 */

var Layout = Layout || {};

Layout.ForceDirected = function(graph, options) {
  var options = options || {};
  
  this.layout = options.layout || "2d";
  this.attraction_multiplier = options.attraction || 5;
  this.repulsion_multiplier = options.repulsion || 0.75;
  this.max_iterations = options.iterations || 1000;
  this.graph = graph;
  this.width = options.width || 200;
  this.height = options.height || 200;
  this.finished = false;

  var callback_positionUpdated = options.positionUpdated;
  
  var EPSILON = 0.000001;
  var attraction_constant;
  var repulsion_constant;
  var forceConstant;
  var layout_iterations = 0;
  var temperature = 0;
  var nodes_length;
  var edges_length;
  var that = this;
  
  // performance test
  var mean_time = 0;

  /**
   * Initialize parameters used by the algorithm.
   */
  this.init = function() {
    this.finished = false;
    temperature = this.width / 10.0;
    nodes_length = this.graph.nodes.length;
    edges_length = this.graph.edges.length;
    forceConstant = Math.sqrt(this.height * this.width / nodes_length);
    attraction_constant = this.attraction_multiplier * forceConstant;
    repulsion_constant = this.repulsion_multiplier * forceConstant;
  };

  /**
   * Generates the force-directed layout.
   *
   * It finishes when the number of max_iterations has been reached or when
   * the temperature is nearly zero.
   */
  this.generate = function() {
    if(layout_iterations < this.max_iterations && temperature > 0.000001) {
      var start = new Date().getTime();
      
      // calculate repulsion
      for(var i=0; i < nodes_length; i++) {
        var node_v = graph.nodes[i];
        node_v.layout = node_v.layout || {};
        if(i==0) {
          node_v.layout.offset_x = 0;
          node_v.layout.offset_y = 0;
          if(this.layout === "3d") {
            node_v.layout.offset_z = 0;
          }
        }

        node_v.layout.force = 0;
        node_v.layout.tmp_pos_x = node_v.layout.tmp_pos_x || node_v.position.x;
        node_v.layout.tmp_pos_y = node_v.layout.tmp_pos_y || node_v.position.y;
        if(this.layout === "3d") {    
          node_v.layout.tmp_pos_z = node_v.layout.tmp_pos_z || node_v.position.z;
        }

        for(var j=i+1; j < nodes_length; j++) {
          var node_u = graph.nodes[j];
          if(i != j) {
            node_u.layout = node_u.layout || {};
            node_u.layout.tmp_pos_x = node_u.layout.tmp_pos_x || node_u.position.x;
            node_u.layout.tmp_pos_y = node_u.layout.tmp_pos_y || node_u.position.y;
            if(this.layout === "3d") {
              node_u.layout.tmp_pos_z = node_u.layout.tmp_pos_z || node_u.position.z;
            }

            var delta_x = node_v.layout.tmp_pos_x - node_u.layout.tmp_pos_x;
            var delta_y = node_v.layout.tmp_pos_y - node_u.layout.tmp_pos_y;
            if(this.layout === "3d") {
              var delta_z = node_v.layout.tmp_pos_z - node_u.layout.tmp_pos_z;
            }

            var delta_length = Math.max(EPSILON, Math.sqrt((delta_x * delta_x) + (delta_y * delta_y)));
            if(this.layout === "3d") {
              var delta_length_z = Math.max(EPSILON, Math.sqrt((delta_z * delta_z) + (delta_y * delta_y)));
            }

            var force = (repulsion_constant * repulsion_constant) / delta_length;
            if(this.layout === "3d") {
              var force_z = (repulsion_constant * repulsion_constant) / delta_length_z;
            }

            node_v.layout.force += force;
            node_u.layout.force += force;

            node_v.layout.offset_x += (delta_x / delta_length) * force;
            node_v.layout.offset_y += (delta_y / delta_length) * force;

            if(i==0) {
              node_u.layout.offset_x = 0;
              node_u.layout.offset_y = 0;
              if(this.layout === "3d") {
                node_u.layout.offset_z = 0;
              }
            }
            node_u.layout.offset_x -= (delta_x / delta_length) * force;
            node_u.layout.offset_y -= (delta_y / delta_length) * force;

            if(this.layout === "3d") {
              node_v.layout.offset_z += (delta_z / delta_length_z) * force_z;
              node_u.layout.offset_z -= (delta_z / delta_length_z) * force_z;
            }
          }
        }
      }
      
      // calculate attraction
      for(var i=0; i < edges_length; i++) {
        var edge = graph.edges[i];
        var delta_x = edge.source.layout.tmp_pos_x - edge.target.layout.tmp_pos_x;
        var delta_y = edge.source.layout.tmp_pos_y - edge.target.layout.tmp_pos_y;
        if(this.layout === "3d") {
          var delta_z = edge.source.layout.tmp_pos_z - edge.target.layout.tmp_pos_z;
        }  

        var delta_length = Math.max(EPSILON, Math.sqrt((delta_x * delta_x) + (delta_y * delta_y)));
        if(this.layout === "3d") {
          var delta_length_z = Math.max(EPSILON, Math.sqrt((delta_z * delta_z) + (delta_y * delta_y)));
        }
        var force = (delta_length * delta_length) / attraction_constant;
        if(this.layout === "3d") {
          var force_z = (delta_length_z * delta_length_z) / attraction_constant;
        }

        edge.source.layout.force -= force;
        edge.target.layout.force += force;

        edge.source.layout.offset_x -= (delta_x / delta_length) * force;
        edge.source.layout.offset_y -= (delta_y / delta_length) * force;
        if(this.layout === "3d") {    
          edge.source.layout.offset_z -= (delta_z / delta_length_z) * force_z;
        }

        edge.target.layout.offset_x += (delta_x / delta_length) * force;
        edge.target.layout.offset_y += (delta_y / delta_length) * force;
        if(this.layout === "3d") {    
          edge.target.layout.offset_z += (delta_z / delta_length_z) * force_z;
        }        
      }
      
      // calculate positions
      for(var i=0; i < nodes_length; i++) {
        var node = graph.nodes[i];
        var delta_length = Math.max(EPSILON, Math.sqrt(node.layout.offset_x * node.layout.offset_x + node.layout.offset_y * node.layout.offset_y));
        if(this.layout === "3d") {
          var delta_length_z = Math.max(EPSILON, Math.sqrt(node.layout.offset_z * node.layout.offset_z + node.layout.offset_y * node.layout.offset_y));
        }

        node.layout.tmp_pos_x += (node.layout.offset_x / delta_length) * Math.min(delta_length, temperature);
        node.layout.tmp_pos_y += (node.layout.offset_y / delta_length) * Math.min(delta_length, temperature);
        if(this.layout === "3d") {    
          node.layout.tmp_pos_z += (node.layout.offset_z / delta_length_z) * Math.min(delta_length_z, temperature);
        }

        var updated = true;
        node.position.x -=  (node.position.x-node.layout.tmp_pos_x)/10;
          node.position.y -=  (node.position.y-node.layout.tmp_pos_y)/10;

        if(this.layout === "3d") {    
          node.position.z -=  (node.position.z-node.layout.tmp_pos_z)/10;
        }
        
        // execute callback function if positions has been updated
        if(updated && typeof callback_positionUpdated === 'function') {
          callback_positionUpdated(node);
        }
      }
      temperature *= (1 - (layout_iterations / this.max_iterations));
      layout_iterations++;

      var end = new Date().getTime();
      mean_time += end - start;
    } else {
      if(!this.finished) {        
        console.log("Average time: " + (mean_time/layout_iterations) + " ms");
      }
      this.finished = true;
      return false;
    }
    return true;
  };

  /**
   * Stops the calculation by setting the current_iterations to max_iterations.
   */
  this.stop_calculating = function() {
    layout_iterations = this.max_iterations;
  }
};
