module( "Selection Append", {
    teardown: function() {
      document.getElementById('append').innerHTML = '';
    }
});


test( "SVG", function() {
  var svg = d3.select('#append').append('svg');
  ok(svg.node().raphael, "Raphael paper appended to DOM" );
  svg.remove();
});

test('image', function() {
  var svg = d3.select('#append').append('svg');
   var el = svg.append('image');
   ok(el.node().type, 'image');
});

test('line', function() {
  var svg = d3.select('#append').append('svg');
   var el = svg.append('line');
   ok(el.node().type, 'line');
});

test('path', function() {
  var svg = d3.select('#append').append('svg');
   var el = svg.append('path');
   ok(el.node().type, 'path');
});

test('rect', function() {
  var svg = d3.select('#append').append('svg');
   var el = svg.append('rect');
   ok(el.node().type, 'rect');
});

test('circle', function() {
  var svg = d3.select('#append').append('svg');
   var el = svg.append('circle');
   ok(el.node().type, 'circle');
});

test('text', function() {
  var svg = d3.select('#append').append('svg');
   var el = svg.append('text');
   ok(el.node().type, 'text');
});