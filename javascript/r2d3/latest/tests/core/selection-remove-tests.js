module( "Selection", {
    teardown: function() {
      document.getElementById('selectionRemove').innerHTML = '';
    }
});


test( "remove one", function() {
  var svg = d3.select('#selectionRemove').append('svg'),
      el = svg.append('rect');
      
  el.remove();
  equal(svg.selectAll('rect')[0].length, 0);
});


test( "group remove one", function() {
  var svg = d3.select('#selectionRemove').append('svg'),
      g = svg.append('g'),
      el = g.append('rect');
      
  el.remove();
  equal(svg.selectAll('rect')[0].length, 0);
});

