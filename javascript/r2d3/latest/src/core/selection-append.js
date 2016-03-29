// TODO append(node)?
// TODO append(function)?
d3_selectionPrototype.append = function(name) {
  name = d3.ns.qualify(name);

  function append() {
    if (name.local === 'svg') return appendRaphael(this);

    return this.appendChild(document.createElementNS(this.namespaceURI, name));
  }

  function appendNS() {
    if (name.local === 'svg') return appendRaphael(this);

    return this.appendChild(document.createElementNS(name.space, name.local));
  }

  return this.select(name.local ? appendNS : append);
};
