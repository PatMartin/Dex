//========================================
// Set Extensions

Raphael.st.getElementsByClassName  = Raphael.fn.getElementsByClassName;


Raphael.st.getElementsByTagName = Raphael.fn.getElementsByTagName;


Raphael.st.appendChild = function(childNode) {
  // As of now, only groups can have children
  if (this.tagName === 'g') {
    
    // Buld Raphael element from DOM node
    var node = null;
    if (childNode.paper) {
      // an existing raphael element is being appended
      node = childNode;
    } else {
      // a new DOM element was created to append
      node = this.paper.buildElement(childNode);
    }
    
    // If the node was an invalid type, 
    // it wont be created
    if (node) {
      node.parentNode = this;
    
      // update shadow dom
      this.shadowDom.appendChild(childNode);
      this.items.push(node);
      node.updateStyle();
    }
    return node;
  }
};


Raphael.st.insertBefore = function(el, before) {
  // As of now, only groups can have children
  var arg = arguments;
  if (this.tagName === 'g') {
    
    if (this.items.length) {
      for (var i = 0, ii = this.items.length; i < ii; i++) {
        if (before && this.items[i].shadowDom.r2d3id === before.shadowDom.r2d3id) {
          return this.items[i].insertBefore(el, before);
       } 
      }
    } 

  return this.appendChild.apply(this, arg);
  }
};

Raphael.st.removeChild = function(el) {
  el.shadowDom.parentNode.removeChild(el.shadowDom)
  el.remove();
}


Raphael.st.setAttribute = function(name, value) {
  
  if (name === 'class') {
    this.className = value;
    this.shadowDom.className = value;
    this.updateStyle();
    return;
  }
  
  this.attrs = this.attrs || {};
  this.attrs[name] = value;
  this.updateStyle(name);
};

Raphael.st.getAttribute = function(name) {
  this.attrs = this.attrs || {};
  return this.attrs[name];
};

Raphael.st.setAttributeNS = function(ns, name, value) {
  this.setAttribute(name, value);
};


Raphael.st.removeAttribute = function(name) {
  this.attrs = this.attrs || {};
  if (this.attrs[name]) delete this.attrs[name];
};


Raphael.st.updateStyle = function(name) {
  // Only an appending the group to a new parent
  // or adding a transform can trigger a style update
  // as they may be expensive
  if (!name || name === 'transform') {
    var children = this.shadowDom.childNodes;
    for (var i=0; i<children.length; i++) {
      var node = r2d3Elements[children[i].r2d3id];
      if (node) node.updateStyle(name);
    }
  }
};
