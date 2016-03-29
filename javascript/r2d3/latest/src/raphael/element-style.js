function ElementStyle(element) {
	this.element = element;
	this.props = {};
}

ElementStyle.prototype.setProperty = function(name, value) {
	if (value === '' || value === null || value === undefined) {
		delete this.props[name];
	} else {
		this.props[name] = value;
	}
			
	this.element.updateStyle(name);
};

ElementStyle.prototype.removeProperty = function(name) {
	delete this.props[name];
	this.element.updateStyle(name);
};

ElementStyle.prototype.getPropertyValue = function(name) {
	return this.props[name];
};
