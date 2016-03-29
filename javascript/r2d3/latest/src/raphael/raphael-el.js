
//========================================
// Element Extensions

Raphael.el.addEventListener = function(type, listener) {
  if (this.node.addEventListener) {
    this.node.addEventListener(type, listener, false);
  } else if (this.node.attachEvent) {
    this.node.attachEvent("on" + type, listener);
  } else {
    throw "Found neither addEventListener nor attachEvent";
  }
};


Raphael.el.removeEventListener = function(type, listener) {
  if (this.node.removeEventListener) {
    this.node.removeEventListener(type, listener, false);
  } else if (this.node.detachEvent) {
    this.node.detachEvent("on" + type, listener);
  } else {
    throw "Found neither removeEventListener nor detachEvent";
  }
};


Raphael.el.setAttribute = function(name, value) {
  if (name === 'class') {
    this.className = value;
    this.shadowDom.className = value;
    this.updateStyle();
    return;
  }
  
  // 1 off for the SVG image element
  if (name === 'href' && this.type === 'image') {
    name = "src"; // Raphael uses src
  }
	
  // Update the attributes object
	var attrs = this.attributes();	
	if (value === '' || value === null || value === undefined) {
    // Dont' update style, remove attribute will handle that
		this.removeAttribute(name);
	} else {
		attrs[name] = value;
    this.updateStyle(name);
	}
};

// Save off old insertBefore API
Raphael.el.raphaelInsertBefore = Raphael.el.insertBefore;

Raphael.el.insertBefore = function(node, before) {
  var el = node.paper ? node : this.paper.buildElement(node);
  
  // Reposition the element on the paper
  el.raphaelInsertBefore(before);
  
  // Update the shadow DOM
  before.shadowDom.parentNode.insertBefore(el.shadowDom, before.shadowDom);
  
  el.updateStyle();
  return el;
};


Raphael.el.setAttributeNS = function(namespace, name, value) {
  if (namespace === 'xlink' && name === 'href' && this.type === 'image') {
    this.setAttribute('src', value);
  }
  this.setAttribute(name, value);
};


Raphael.el.removeAttribute = function() {
	var attrs = this.attributes();
	delete attrs[name];
	this.updateStyle(name);
};



Raphael.el.getAttribute = function(name) {
  // Get the class from the shadow dom
  if (name === 'class') {
    return this.shadowDom.className;
  }
  
  
  // Raphael uses src
  if (name === 'href' && this.type === 'image') name = 'src';
	return this.data('attributes')[name];
};


Raphael.el.attributes = function() {
  var attrs = this.data('attributes') || {};
  // Save the attrs if they didn't exist
  this.data('attributes', attrs);
  return attrs;
};


Raphael.el.currentStyle = function() {
  return this.shadowDom.currentStyle || {};
};


/**
 * Updates the style for a given property honoring style
 */
Raphael.el.updateStyle = function(name) {
  
  /**
  * Return the first argument that isn't null or undefined
  */
  function val() {
    for (var i=0; i<arguments.length; i++) {
      var value = arguments[i];
      if (value !== null && typeof value !== 'undefined') {
        return value;
      }
    }
  }

	var attributes = this.attributes(),
			style = this.style.props,
      css = this.currentStyle(),
      props = 'arrow-end cursor fill fill-opacity font font-family font-size font-weight opacity r rx ry stroke stroke-dasharay stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor'.split(' ');
      

  if (arguments.length < 1) {
    // Update props in stylesheets
    for (var i=0; i < props.length; i++) this.updateStyle(props[i]);
    
    // Update Other Attribute
    this.updateStyle('transform');
  }
	
  // Transforms take into account parent transforms
  // as we can't rely on transforms automatically applied
  // from the parents
  if (name === 'transform') {
    var transforms = [attributes['transform'] || ''],
        node = this;

    while(node.parentNode) {
      node = node.parentNode;
      transforms.push(node.getAttribute('transform') || '');
    }

    this.attr('transform', transforms.reverse().join(''));
    
  // Props that can't be styled via CSS (e.g path, height, width, text), apply directly
  } else if (props.indexOf(name) < 0) {
    this.attr(name, attributes[name]);
    
  // Honor the precedence for applying styleable attributes
  } else {
    // Get the first value that ins't null or undefined in order
    // of precedence
    var value = val(style[name], css[name], attributes[name]);
    this.attr(name, value);
  }
  return true;
};