//================================
// Selection Tests
module( "Selection Attributes", {
    teardown: function() {
      document.getElementById('attr').innerHTML = '';
    }
});


test( "path.d", function() {
  var svg = d3.select('#attr').append('svg'),
      path = "M0 0L10 10Z",
      el = svg.append('path');
      
  el.attr('d', path);
  equal(el.attr('d'), path)
});

test( "path.class", function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('path');
      
  el.attr('class', 'foo');
  equal(el.attr('class'), 'foo')
});

test( "rect.fill", function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('rect');
      
  el.attr('fill', 'red');
  equal(el.attr('fill'), 'red')
});

test( "rect.translate", function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('rect').attr({'x': 0, 'y': 0, 'width': 100, 'height': 100 });
      
  el.attr('transform', 'translate(20,20)')
  equal(el.attr('transform'), 'translate(20,20)')
  // Ensure the tranform actually applied
  var bbox = el.node().getBBox();
  equal(bbox.x, 20)
  equal(bbox.y, 20)
});

//================================
// Circle Tests
module( "Circle Selection Attributes", {
    teardown: function() {
      document.getElementById('attr').innerHTML = '';
    }
});

test('circle.cx', function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('circle');
      
  el.attr('cx', 10);
  equal(el.attr('cx'), 10)
});

test('circle.cy', function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('circle');
      
  el.attr('cy', 10);
  equal(el.attr('cy'), 10)
});

test('circle.r', function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('circle');
      
  el.attr('r', 2);
  equal(el.attr('r'), 2)
});

//================================
// Rect Tests
module( "Rect Selection Attributes", {
    teardown: function() {
      document.getElementById('attr').innerHTML = '';
    }
});

test('rect.x', function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('rect');
      
  el.attr('x', 10);
  equal(el.attr('x'), 10)
});

test('rect.y', function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('rect');
      
  el.attr('y', 10);
  equal(el.attr('y'), 10)
});

test('rect.width', function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('rect');
      
  el.attr('width', 10);
  equal(el.attr('width'), 10)
});

test('rect.height', function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('rect');
      
  el.attr('height', 10);
  equal(el.attr('height'), 10)
});

//================================
// Line Tests
module( "Line Selection Attributes", {
    teardown: function() {
      document.getElementById('attr').innerHTML = '';
    }
});

test('line.x1', function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('line');
      
  el.attr('x1', 10);
  equal(el.attr('x1'), 10)
});

test('line.y1', function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('line');
      
  el.attr('y1', 10);
   equal(el.attr('y1'), 10)
});

test('line.x2', function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('line');
      
  el.attr('x2', 10);
  equal(el.attr('x2'), 10)
});

test('line.y2', function() {
  var svg = d3.select('#attr').append('svg'),
      el = svg.append('line');
      
  el.attr('y2', 10);
  equal(el.attr('y2'), 10)
});