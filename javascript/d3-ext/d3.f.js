d3.f = {}

d3.f.get = function (key) {
    return function(d) { 
        return typeof key === "function" ? key(d) : d[key]
    }
};

["min","max","extent","sum","mean","median","split"]
    .forEach(function(fn){
        d3.f[fn] = function(key) {
            return function(d) {  return d3[fn](d,d3.f.get(key)) }
        }
    });

["ascending","descending"]
    .forEach(function(fn) {
        d3.f[fn] = function(key) {
            return function(a,b) { return d3[fn](d3.f.get(key)(a),d3.f.get(key)(b)) }
        }
    })


d3.f.first = function(key) {
    return function(d) { return d3.first(d,d3.f.ascending(key))}
}

d3.f.last = function(key) {
    return function(d) { return d3.last(d,d3.f.descending(key))}
}