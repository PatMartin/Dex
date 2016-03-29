function d3_selection(groups) {
  d3_arraySubclass(groups, d3_selectionPrototype);
  return groups;
}

var d3_selectRoot = document.documentElement,
    d3_selectMatcher = d3_selectRoot.matchesSelector || d3_selectRoot.webkitMatchesSelector || d3_selectRoot.mozMatchesSelector || d3_selectRoot.msMatchesSelector || d3_selectRoot.oMatchesSelector,
    d3_selectMatches = Sizzle.matchesSelector;


var d3_select = function(s, n) {
  // If the selection is on a raphael element,
  // set the context to its shadowDom node
  if (n.shadowDom) {
    n = n.shadowDom;
  }
  
  var node = Sizzle(s, n)[0] || null;
  // If the match is a R2D3 element, return the
  // Raphael Element
  if (node && node.r2d3) {
    node = r2d3Elements[node.r2d3id];
  }
  
  return node;
};


var d3_selectAll = function(s, n) {
  // If the selection is on a raphael element,
  // set the context to its shadowDom node
  if (n.shadowDom) {
    n = n.shadowDom;
  }

  var nodes = Sizzle.uniqueSort(Sizzle(s, n)),
      matches = [];
  
  for (var i=0; i<nodes.length; i++) {
    var node = nodes[i];
    // If the match is a R2D3 element, return the
    // Raphael Element
    if (node && node.r2d3) {
      node = r2d3Elements[node.r2d3id];
    }
    matches.push(node);
  }
  
  return matches;
};


var d3_selectionPrototype = [];

d3.selection = function() {
  return d3_selectionRoot;
};

d3.selection.prototype = d3_selectionPrototype;
