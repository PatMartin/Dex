// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.0 - JavaScript Vector Library                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\

// ┌──────────────────────────────────────────────────────────────────────────────────────┐ \\
// │ Eve 0.3.4 - JavaScript Events Library                                                │ \\
// ├──────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://dmitry.baranovskiy.com/)          │ \\
// │ Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license. │ \\
// └──────────────────────────────────────────────────────────────────────────────────────┘ \\

(function (glob) {
    var version = "0.3.4",
        has = "hasOwnProperty",
        separator = /[\.\/]/,
        wildcard = "*",
        fun = function () {},
        numsort = function (a, b) {
            return a - b;
        },
        current_event,
        stop,
        events = {n: {}},
    
        eve = function (name, scope) {
            var e = events,
                oldstop = stop,
                args = Array.prototype.slice.call(arguments, 2),
                listeners = eve.listeners(name),
                z = 0,
                f = false,
                l,
                indexed = [],
                queue = {},
                out = [],
                ce = current_event,
                errors = [];
            current_event = name;
            stop = 0;
            for (var i = 0, ii = listeners.length; i < ii; i++) if ("zIndex" in listeners[i]) {
                indexed.push(listeners[i].zIndex);
                if (listeners[i].zIndex < 0) {
                    queue[listeners[i].zIndex] = listeners[i];
                }
            }
            indexed.sort(numsort);
            while (indexed[z] < 0) {
                l = queue[indexed[z++]];
                out.push(l.apply(scope, args));
                if (stop) {
                    stop = oldstop;
                    return out;
                }
            }
            for (i = 0; i < ii; i++) {
                l = listeners[i];
                if ("zIndex" in l) {
                    if (l.zIndex == indexed[z]) {
                        out.push(l.apply(scope, args));
                        if (stop) {
                            break;
                        }
                        do {
                            z++;
                            l = queue[indexed[z]];
                            l && out.push(l.apply(scope, args));
                            if (stop) {
                                break;
                            }
                        } while (l)
                    } else {
                        queue[l.zIndex] = l;
                    }
                } else {
                    out.push(l.apply(scope, args));
                    if (stop) {
                        break;
                    }
                }
            }
            stop = oldstop;
            current_event = ce;
            return out.length ? out : null;
        };
    
    eve.listeners = function (name) {
        var names = name.split(separator),
            e = events,
            item,
            items,
            k,
            i,
            ii,
            j,
            jj,
            nes,
            es = [e],
            out = [];
        for (i = 0, ii = names.length; i < ii; i++) {
            nes = [];
            for (j = 0, jj = es.length; j < jj; j++) {
                e = es[j].n;
                items = [e[names[i]], e[wildcard]];
                k = 2;
                while (k--) {
                    item = items[k];
                    if (item) {
                        nes.push(item);
                        out = out.concat(item.f || []);
                    }
                }
            }
            es = nes;
        }
        return out;
    };
    
    
    eve.on = function (name, f) {
        var names = name.split(separator),
            e = events;
        for (var i = 0, ii = names.length; i < ii; i++) {
            e = e.n;
            !e[names[i]] && (e[names[i]] = {n: {}});
            e = e[names[i]];
        }
        e.f = e.f || [];
        for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
            return fun;
        }
        e.f.push(f);
        return function (zIndex) {
            if (+zIndex == +zIndex) {
                f.zIndex = +zIndex;
            }
        };
    };
    
    eve.stop = function () {
        stop = 1;
    };
    
    eve.nt = function (subname) {
        if (subname) {
            return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(current_event);
        }
        return current_event;
    };
    
    
    eve.off = eve.unbind = function (name, f) {
        var names = name.split(separator),
            e,
            key,
            splice,
            i, ii, j, jj,
            cur = [events];
        for (i = 0, ii = names.length; i < ii; i++) {
            for (j = 0; j < cur.length; j += splice.length - 2) {
                splice = [j, 1];
                e = cur[j].n;
                if (names[i] != wildcard) {
                    if (e[names[i]]) {
                        splice.push(e[names[i]]);
                    }
                } else {
                    for (key in e) if (e[has](key)) {
                        splice.push(e[key]);
                    }
                }
                cur.splice.apply(cur, splice);
            }
        }
        for (i = 0, ii = cur.length; i < ii; i++) {
            e = cur[i];
            while (e.n) {
                if (f) {
                    if (e.f) {
                        for (j = 0, jj = e.f.length; j < jj; j++) if (e.f[j] == f) {
                            e.f.splice(j, 1);
                            break;
                        }
                        !e.f.length && delete e.f;
                    }
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        var funcs = e.n[key].f;
                        for (j = 0, jj = funcs.length; j < jj; j++) if (funcs[j] == f) {
                            funcs.splice(j, 1);
                            break;
                        }
                        !funcs.length && delete e.n[key].f;
                    }
                } else {
                    delete e.f;
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        delete e.n[key].f;
                    }
                }
                e = e.n;
            }
        }
    };
    
    eve.once = function (name, f) {
        var f2 = function () {
            var res = f.apply(this, arguments);
            eve.unbind(name, f2);
            return res;
        };
        return eve.on(name, f2);
    };
    
    eve.version = version;
    eve.toString = function () {
        return "You are running Eve " + version;
    };
    (typeof module != "undefined" && module.exports) ? (module.exports = eve) : (typeof define != "undefined" ? (define("eve", [], function() { return eve; })) : (glob.eve = eve));
})(this);


// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ "Raphaël 2.1.0" - JavaScript Vector Library                         │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
(function () {
    
    function R(first) {
        if (R.is(first, "function")) {
            return loaded ? first() : eve.on("raphael.DOMload", first);
        } else if (R.is(first, array)) {
            return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first);
        } else {
            var args = Array.prototype.slice.call(arguments, 0);
            if (R.is(args[args.length - 1], "function")) {
                var f = args.pop();
                return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on("raphael.DOMload", function () {
                    f.call(R._engine.create[apply](R, args));
                });
            } else {
                return R._engine.create[apply](R, arguments);
            }
        }
    }
    R.version = "2.1.0";
    R.eve = eve;
    var loaded,
        separator = /[, ]+/,
        elements = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1},
        formatrg = /\{(\d+)\}/g,
        proto = "prototype",
        has = "hasOwnProperty",
        g = {
            doc: document,
            win: window
        },
        oldRaphael = {
            was: Object.prototype[has].call(g.win, "Raphael"),
            is: g.win.Raphael
        },
        Paper = function () {
            
            
            this.ca = this.customAttributes = {};
        },
        paperproto,
        appendChild = "appendChild",
        apply = "apply",
        concat = "concat",
        supportsTouch = "createTouch" in g.doc,
        E = "",
        S = " ",
        Str = String,
        split = "split",
        events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[split](S),
        touchMap = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        lowerCase = Str.prototype.toLowerCase,
        math = Math,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        pow = math.pow,
        PI = math.PI,
        nu = "number",
        string = "string",
        array = "array",
        toString = "toString",
        fillString = "fill",
        objectToString = Object.prototype.toString,
        paper = {},
        push = "push",
        ISURL = R._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
        colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        isnan = {"NaN": 1, "Infinity": 1, "-Infinity": 1},
        bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        round = math.round,
        setAttribute = "setAttribute",
        toFloat = parseFloat,
        toInt = parseInt,
        upperCase = Str.prototype.toUpperCase,
        availableAttrs = R._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        },
        availableAnimAttrs = R._availableAnimAttrs = {
            blur: nu,
            "clip-rect": "csv",
            cx: nu,
            cy: nu,
            fill: "colour",
            "fill-opacity": nu,
            "font-size": nu,
            height: nu,
            opacity: nu,
            path: "path",
            r: nu,
            rx: nu,
            ry: nu,
            stroke: "colour",
            "stroke-opacity": nu,
            "stroke-width": nu,
            transform: "transform",
            width: nu,
            x: nu,
            y: nu
        },
        whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
        commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        hsrg = {hs: 1, rg: 1},
        p2s = /,?([achlmqrstvxz]),?/gi,
        pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
        radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
        eldata = {},
        sortByKey = function (a, b) {
            return a.key - b.key;
        },
        sortByNumber = function (a, b) {
            return toFloat(a) - toFloat(b);
        },
        fun = function () {},
        pipe = function (x) {
            return x;
        },
        rectPath = R._rectPath = function (x, y, w, h, r) {
            if (r) {
                return [["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
            }
            return [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
        },
        ellipsePath = function (x, y, rx, ry) {
            if (ry == null) {
                ry = rx;
            }
            return [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
        },
        getPath = R._getPath = {
            path: function (el) {
                return el.attr("path");
            },
            circle: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.r);
            },
            ellipse: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.rx, a.ry);
            },
            rect: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height, a.r);
            },
            image: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height);
            },
            text: function (el) {
                var bbox = el._getBBox();
                return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
            }
        },
        
        mapPath = R.mapPath = function (path, matrix) {
            if (!matrix) {
                return path;
            }
            var x, y, i, j, ii, jj, pathi;
            path = path2curve(path);
            for (i = 0, ii = path.length; i < ii; i++) {
                pathi = path[i];
                for (j = 1, jj = pathi.length; j < jj; j += 2) {
                    x = matrix.x(pathi[j], pathi[j + 1]);
                    y = matrix.y(pathi[j], pathi[j + 1]);
                    pathi[j] = x;
                    pathi[j + 1] = y;
                }
            }
            return path;
        };

    R._g = g;
    
    R.type = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    if (R.type == "VML") {
        var d = g.doc.createElement("div"),
            b;
        d.innerHTML = '<v:shape adj="1"/>';
        b = d.firstChild;
        b.style.behavior = "url(#default#VML)";
        if (!(b && typeof b.adj == "object")) {
            return (R.type = E);
        }
        d = null;
    }
    
    
    R.svg = !(R.vml = R.type == "VML");
    R._Paper = Paper;
    
    R.fn = paperproto = Paper.prototype = R.prototype;
    R._id = 0;
    R._oid = 0;
    
    R.is = function (o, type) {
        type = lowerCase.call(type);
        if (type == "finite") {
            return !isnan[has](+o);
        }
        if (type == "array") {
            return o instanceof Array;
        }
        return  (type == "null" && o === null) ||
                (type == typeof o && o !== null) ||
                (type == "object" && o === Object(o)) ||
                (type == "array" && Array.isArray && Array.isArray(o)) ||
                objectToString.call(o).slice(8, -1).toLowerCase() == type;
    };

    function clone(obj) {
        if (Object(obj) !== obj) {
            return obj;
        }
        var res = new obj.constructor;
        for (var key in obj) if (obj[has](key)) {
            res[key] = clone(obj[key]);
        }
        return res;
    }

    
    R.angle = function (x1, y1, x2, y2, x3, y3) {
        if (x3 == null) {
            var x = x1 - x2,
                y = y1 - y2;
            if (!x && !y) {
                return 0;
            }
            return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
        } else {
            return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
        }
    };
    
    R.rad = function (deg) {
        return deg % 360 * PI / 180;
    };
    
    R.deg = function (rad) {
        return rad * 180 / PI % 360;
    };
    
    R.snapTo = function (values, value, tolerance) {
        tolerance = R.is(tolerance, "finite") ? tolerance : 10;
        if (R.is(values, array)) {
            var i = values.length;
            while (i--) if (abs(values[i] - value) <= tolerance) {
                return values[i];
            }
        } else {
            values = +values;
            var rem = value % values;
            if (rem < tolerance) {
                return value - rem;
            }
            if (rem > values - tolerance) {
                return value - rem + values;
            }
        }
        return value;
    };
    
    
    var createUUID = R.createUUID = (function (uuidRegEx, uuidReplacer) {
        return function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
        };
    })(/[xy]/g, function (c) {
        var r = math.random() * 16 | 0,
            v = c == "x" ? r : (r & 3 | 8);
        return v.toString(16);
    });

    
    R.setWindow = function (newwin) {
        eve("raphael.setWindow", R, g.win, newwin);
        g.win = newwin;
        g.doc = g.win.document;
        if (R._engine.initWin) {
            R._engine.initWin(g.win);
        }
    };
    var toHex = function (color) {
        if (R.vml) {
            // http://dean.edwards.name/weblog/2009/10/convert-any-colour-value-to-hex-in-msie/
            var trim = /^\s+|\s+$/g;
            var bod;
            try {
                var docum = new ActiveXObject("htmlfile");
                docum.write("<body>");
                docum.close();
                bod = docum.body;
            } catch(e) {
                bod = createPopup().document.body;
            }
            var range = bod.createTextRange();
            toHex = cacher(function (color) {
                try {
                    bod.style.color = Str(color).replace(trim, E);
                    var value = range.queryCommandValue("ForeColor");
                    value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
                    return "#" + ("000000" + value.toString(16)).slice(-6);
                } catch(e) {
                    return "none";
                }
            });
        } else {
            var i = g.doc.createElement("i");
            i.title = "Rapha\xebl Colour Picker";
            i.style.display = "none";
            g.doc.body.appendChild(i);
            toHex = cacher(function (color) {
                i.style.color = color;
                return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
            });
        }
        return toHex(color);
    },
    hsbtoString = function () {
        return "hsb(" + [this.h, this.s, this.b] + ")";
    },
    hsltoString = function () {
        return "hsl(" + [this.h, this.s, this.l] + ")";
    },
    rgbtoString = function () {
        return this.hex;
    },
    prepareRGB = function (r, g, b) {
        if (g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
            b = r.b;
            g = r.g;
            r = r.r;
        }
        if (g == null && R.is(r, string)) {
            var clr = R.getRGB(r);
            r = clr.r;
            g = clr.g;
            b = clr.b;
        }
        if (r > 1 || g > 1 || b > 1) {
            r /= 255;
            g /= 255;
            b /= 255;
        }
        
        return [r, g, b];
    },
    packageRGB = function (r, g, b, o) {
        r *= 255;
        g *= 255;
        b *= 255;
        var rgb = {
            r: r,
            g: g,
            b: b,
            hex: R.rgb(r, g, b),
            toString: rgbtoString
        };
        R.is(o, "finite") && (rgb.opacity = o);
        return rgb;
    };
    
    
    R.color = function (clr) {
        var rgb;
        if (R.is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
            rgb = R.hsb2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex;
        } else if (R.is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
            rgb = R.hsl2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex;
        } else {
            if (R.is(clr, "string")) {
                clr = R.getRGB(clr);
            }
            if (R.is(clr, "object") && "r" in clr && "g" in clr && "b" in clr) {
                rgb = R.rgb2hsl(clr);
                clr.h = rgb.h;
                clr.s = rgb.s;
                clr.l = rgb.l;
                rgb = R.rgb2hsb(clr);
                clr.v = rgb.b;
            } else {
                clr = {hex: "none"};
                clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
            }
        }
        clr.toString = rgbtoString;
        return clr;
    };
    
    R.hsb2rgb = function (h, s, v, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
            v = h.b;
            s = h.s;
            h = h.h;
            o = h.o;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = v * s;
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = v - C;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };
    
    R.hsl2rgb = function (h, s, l, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
            l = h.l;
            s = h.s;
            h = h.h;
        }
        if (h > 1 || s > 1 || l > 1) {
            h /= 360;
            s /= 100;
            l /= 100;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = 2 * s * (l < .5 ? l : 1 - l);
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = l - C / 2;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };
    
    R.rgb2hsb = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, V, C;
        V = mmax(r, g, b);
        C = V - mmin(r, g, b);
        H = (C == 0 ? null :
             V == r ? (g - b) / C :
             V == g ? (b - r) / C + 2 :
                      (r - g) / C + 4
            );
        H = ((H + 360) % 6) * 60 / 360;
        S = C == 0 ? 0 : C / V;
        return {h: H, s: S, b: V, toString: hsbtoString};
    };
    
    R.rgb2hsl = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, L, M, m, C;
        M = mmax(r, g, b);
        m = mmin(r, g, b);
        C = M - m;
        H = (C == 0 ? null :
             M == r ? (g - b) / C :
             M == g ? (b - r) / C + 2 :
                      (r - g) / C + 4);
        H = ((H + 360) % 6) * 60 / 360;
        L = (M + m) / 2;
        S = (C == 0 ? 0 :
             L < .5 ? C / (2 * L) :
                      C / (2 - 2 * L));
        return {h: H, s: S, l: L, toString: hsltoString};
    };
    R._path2string = function () {
        return this.join(",").replace(p2s, "$1");
    };
    function repush(array, item) {
        for (var i = 0, ii = array.length; i < ii; i++) if (array[i] === item) {
            return array.push(array.splice(i, 1)[0]);
        }
    }
    function cacher(f, scope, postprocessor) {
        function newf() {
            var arg = Array.prototype.slice.call(arguments, 0),
                args = arg.join("\u2400"),
                cache = newf.cache = newf.cache || {},
                count = newf.count = newf.count || [];
            if (cache[has](args)) {
                repush(count, args);
                return postprocessor ? postprocessor(cache[args]) : cache[args];
            }
            count.length >= 1e3 && delete cache[count.shift()];
            count.push(args);
            cache[args] = f[apply](scope, arg);
            return postprocessor ? postprocessor(cache[args]) : cache[args];
        }
        return newf;
    }

    var preload = R._preload = function (src, f) {
        var img = g.doc.createElement("img");
        img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        img.onload = function () {
            f.call(this);
            this.onload = null;
            g.doc.body.removeChild(this);
        };
        img.onerror = function () {
            g.doc.body.removeChild(this);
        };
        g.doc.body.appendChild(img);
        img.src = src;
    };
    
    function clrToString() {
        return this.hex;
    }

    
    R.getRGB = cacher(function (colour) {
        if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
            return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
        }
        if (colour == "none") {
            return {r: -1, g: -1, b: -1, hex: "none", toString: clrToString};
        }
        !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
        var res,
            red,
            green,
            blue,
            opacity,
            t,
            values,
            rgb = colour.match(colourRegExp);
        if (rgb) {
            if (rgb[2]) {
                blue = toInt(rgb[2].substring(5), 16);
                green = toInt(rgb[2].substring(3, 5), 16);
                red = toInt(rgb[2].substring(1, 3), 16);
            }
            if (rgb[3]) {
                blue = toInt((t = rgb[3].charAt(3)) + t, 16);
                green = toInt((t = rgb[3].charAt(2)) + t, 16);
                red = toInt((t = rgb[3].charAt(1)) + t, 16);
            }
            if (rgb[4]) {
                values = rgb[4][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
            }
            if (rgb[5]) {
                values = rgb[5][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsb2rgb(red, green, blue, opacity);
            }
            if (rgb[6]) {
                values = rgb[6][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsl2rgb(red, green, blue, opacity);
            }
            rgb = {r: red, g: green, b: blue, toString: clrToString};
            rgb.hex = "#" + (16777216 | blue | (green << 8) | (red << 16)).toString(16).slice(1);
            R.is(opacity, "finite") && (rgb.opacity = opacity);
            return rgb;
        }
        return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
    }, R);
    
    R.hsb = cacher(function (h, s, b) {
        return R.hsb2rgb(h, s, b).hex;
    });
    
    R.hsl = cacher(function (h, s, l) {
        return R.hsl2rgb(h, s, l).hex;
    });
    
    R.rgb = cacher(function (r, g, b) {
        return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
    });
    
    R.getColor = function (value) {
        var start = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: value || .75},
            rgb = this.hsb2rgb(start.h, start.s, start.b);
        start.h += .075;
        if (start.h > 1) {
            start.h = 0;
            start.s -= .2;
            start.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: start.b});
        }
        return rgb.hex;
    };
    
    R.getColor.reset = function () {
        delete this.start;
    };

    // http://schepers.cc/getting-to-the-point
    function catmullRom2bezier(crp, z) {
        var d = [];
        for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
            var p = [
                        {x: +crp[i - 2], y: +crp[i - 1]},
                        {x: +crp[i],     y: +crp[i + 1]},
                        {x: +crp[i + 2], y: +crp[i + 3]},
                        {x: +crp[i + 4], y: +crp[i + 5]}
                    ];
            if (z) {
                if (!i) {
                    p[0] = {x: +crp[iLen - 2], y: +crp[iLen - 1]};
                } else if (iLen - 4 == i) {
                    p[3] = {x: +crp[0], y: +crp[1]};
                } else if (iLen - 2 == i) {
                    p[2] = {x: +crp[0], y: +crp[1]};
                    p[3] = {x: +crp[2], y: +crp[3]};
                }
            } else {
                if (iLen - 4 == i) {
                    p[3] = p[2];
                } else if (!i) {
                    p[0] = {x: +crp[i], y: +crp[i + 1]};
                }
            }
            d.push(["C",
                  (-p[0].x + 6 * p[1].x + p[2].x) / 6,
                  (-p[0].y + 6 * p[1].y + p[2].y) / 6,
                  (p[1].x + 6 * p[2].x - p[3].x) / 6,
                  (p[1].y + 6*p[2].y - p[3].y) / 6,
                  p[2].x,
                  p[2].y
            ]);
        }

        return d;
    }
    
    R.parsePathString = function (pathString) {
        if (!pathString) {
            return null;
        }
        var pth = paths(pathString);
        if (pth.arr) {
            return pathClone(pth.arr);
        }
        
        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [];
        if (R.is(pathString, array) && R.is(pathString[0], array)) { // rough assumption
            data = pathClone(pathString);
        }
        if (!data.length) {
            Str(pathString).replace(pathCommand, function (a, b, c) {
                var params = [],
                    name = b.toLowerCase();
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                if (name == "m" && params.length > 2) {
                    data.push([b][concat](params.splice(0, 2)));
                    name = "l";
                    b = b == "m" ? "l" : "L";
                }
                if (name == "r") {
                    data.push([b][concat](params));
                } else while (params.length >= paramCounts[name]) {
                    data.push([b][concat](params.splice(0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            });
        }
        data.toString = R._path2string;
        pth.arr = pathClone(data);
        return data;
    };
    
    R.parseTransformString = cacher(function (TString) {
        if (!TString) {
            return null;
        }
        var paramCounts = {r: 3, s: 4, t: 2, m: 6},
            data = [];
        if (R.is(TString, array) && R.is(TString[0], array)) { // rough assumption
            data = pathClone(TString);
        }
        if (!data.length) {
            Str(TString).replace(tCommand, function (a, b, c) {
                var params = [],
                    name = lowerCase.call(b);
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                data.push([b][concat](params));
            });
        }
        data.toString = R._path2string;
        return data;
    });
    // PATHS
    var paths = function (ps) {
        var p = paths.ps = paths.ps || {};
        if (p[ps]) {
            p[ps].sleep = 100;
        } else {
            p[ps] = {
                sleep: 100
            };
        }
        setTimeout(function () {
            for (var key in p) if (p[has](key) && key != ps) {
                p[key].sleep--;
                !p[key].sleep && delete p[key];
            }
        });
        return p[ps];
    };
    
    R.findDotsAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t,
            t13 = pow(t1, 3),
            t12 = pow(t1, 2),
            t2 = t * t,
            t3 = t2 * t,
            x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
            y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
            mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
            my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
            nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
            ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
            ax = t1 * p1x + t * c1x,
            ay = t1 * p1y + t * c1y,
            cx = t1 * c2x + t * p2x,
            cy = t1 * c2y + t * p2y,
            alpha = (90 - math.atan2(mx - nx, my - ny) * 180 / PI);
        (mx > nx || my < ny) && (alpha += 180);
        return {
            x: x,
            y: y,
            m: {x: mx, y: my},
            n: {x: nx, y: ny},
            start: {x: ax, y: ay},
            end: {x: cx, y: cy},
            alpha: alpha
        };
    };
    
    R.bezierBBox = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
        if (!R.is(p1x, "array")) {
            p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
        }
        var bbox = curveDim.apply(null, p1x);
        return {
            x: bbox.min.x,
            y: bbox.min.y,
            x2: bbox.max.x,
            y2: bbox.max.y,
            width: bbox.max.x - bbox.min.x,
            height: bbox.max.y - bbox.min.y
        };
    };
    
    R.isPointInsideBBox = function (bbox, x, y) {
        return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2;
    };
    
    R.isBBoxIntersect = function (bbox1, bbox2) {
        var i = R.isPointInsideBBox;
        return i(bbox2, bbox1.x, bbox1.y)
            || i(bbox2, bbox1.x2, bbox1.y)
            || i(bbox2, bbox1.x, bbox1.y2)
            || i(bbox2, bbox1.x2, bbox1.y2)
            || i(bbox1, bbox2.x, bbox2.y)
            || i(bbox1, bbox2.x2, bbox2.y)
            || i(bbox1, bbox2.x, bbox2.y2)
            || i(bbox1, bbox2.x2, bbox2.y2)
            || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x)
            && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
    };
    function base3(t, p1, p2, p3, p4) {
        var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
            t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
        return t * t2 - 3 * p1 + 3 * p2;
    }
    function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
        if (z == null) {
            z = 1;
        }
        z = z > 1 ? 1 : z < 0 ? 0 : z;
        var z2 = z / 2,
            n = 12,
            Tvalues = [-0.1252,0.1252,-0.3678,0.3678,-0.5873,0.5873,-0.7699,0.7699,-0.9041,0.9041,-0.9816,0.9816],
            Cvalues = [0.2491,0.2491,0.2335,0.2335,0.2032,0.2032,0.1601,0.1601,0.1069,0.1069,0.0472,0.0472],
            sum = 0;
        for (var i = 0; i < n; i++) {
            var ct = z2 * Tvalues[i] + z2,
                xbase = base3(ct, x1, x2, x3, x4),
                ybase = base3(ct, y1, y2, y3, y4),
                comb = xbase * xbase + ybase * ybase;
            sum += Cvalues[i] * math.sqrt(comb);
        }
        return z2 * sum;
    }
    function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
        if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
            return;
        }
        var t = 1,
            step = t / 2,
            t2 = t - step,
            l,
            e = .01;
        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
        while (abs(l - ll) > e) {
            step /= 2;
            t2 += (l < ll ? 1 : -1) * step;
            l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
        }
        return t2;
    }
    function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        if (
            mmax(x1, x2) < mmin(x3, x4) ||
            mmin(x1, x2) > mmax(x3, x4) ||
            mmax(y1, y2) < mmin(y3, y4) ||
            mmin(y1, y2) > mmax(y3, y4)
        ) {
            return;
        }
        var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
            ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
            denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (!denominator) {
            return;
        }
        var px = nx / denominator,
            py = ny / denominator,
            px2 = +px.toFixed(2),
            py2 = +py.toFixed(2);
        if (
            px2 < +mmin(x1, x2).toFixed(2) ||
            px2 > +mmax(x1, x2).toFixed(2) ||
            px2 < +mmin(x3, x4).toFixed(2) ||
            px2 > +mmax(x3, x4).toFixed(2) ||
            py2 < +mmin(y1, y2).toFixed(2) ||
            py2 > +mmax(y1, y2).toFixed(2) ||
            py2 < +mmin(y3, y4).toFixed(2) ||
            py2 > +mmax(y3, y4).toFixed(2)
        ) {
            return;
        }
        return {x: px, y: py};
    }
    function inter(bez1, bez2) {
        return interHelper(bez1, bez2);
    }
    function interCount(bez1, bez2) {
        return interHelper(bez1, bez2, 1);
    }
    function interHelper(bez1, bez2, justCount) {
        var bbox1 = R.bezierBBox(bez1),
            bbox2 = R.bezierBBox(bez2);
        if (!R.isBBoxIntersect(bbox1, bbox2)) {
            return justCount ? 0 : [];
        }
        var l1 = bezlen.apply(0, bez1),
            l2 = bezlen.apply(0, bez2),
            n1 = ~~(l1 / 5),
            n2 = ~~(l2 / 5),
            dots1 = [],
            dots2 = [],
            xy = {},
            res = justCount ? 0 : [];
        for (var i = 0; i < n1 + 1; i++) {
            var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
            dots1.push({x: p.x, y: p.y, t: i / n1});
        }
        for (i = 0; i < n2 + 1; i++) {
            p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
            dots2.push({x: p.x, y: p.y, t: i / n2});
        }
        for (i = 0; i < n1; i++) {
            for (var j = 0; j < n2; j++) {
                var di = dots1[i],
                    di1 = dots1[i + 1],
                    dj = dots2[j],
                    dj1 = dots2[j + 1],
                    ci = abs(di1.x - di.x) < .001 ? "y" : "x",
                    cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
                    is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
                if (is) {
                    if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
                        continue;
                    }
                    xy[is.x.toFixed(4)] = is.y.toFixed(4);
                    var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
                        t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
                    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
                        if (justCount) {
                            res++;
                        } else {
                            res.push({
                                x: is.x,
                                y: is.y,
                                t1: t1,
                                t2: t2
                            });
                        }
                    }
                }
            }
        }
        return res;
    }
    
    R.pathIntersection = function (path1, path2) {
        return interPathHelper(path1, path2);
    };
    R.pathIntersectionNumber = function (path1, path2) {
        return interPathHelper(path1, path2, 1);
    };
    function interPathHelper(path1, path2, justCount) {
        path1 = R._path2curve(path1);
        path2 = R._path2curve(path2);
        var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2,
            res = justCount ? 0 : [];
        for (var i = 0, ii = path1.length; i < ii; i++) {
            var pi = path1[i];
            if (pi[0] == "M") {
                x1 = x1m = pi[1];
                y1 = y1m = pi[2];
            } else {
                if (pi[0] == "C") {
                    bez1 = [x1, y1].concat(pi.slice(1));
                    x1 = bez1[6];
                    y1 = bez1[7];
                } else {
                    bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
                    x1 = x1m;
                    y1 = y1m;
                }
                for (var j = 0, jj = path2.length; j < jj; j++) {
                    var pj = path2[j];
                    if (pj[0] == "M") {
                        x2 = x2m = pj[1];
                        y2 = y2m = pj[2];
                    } else {
                        if (pj[0] == "C") {
                            bez2 = [x2, y2].concat(pj.slice(1));
                            x2 = bez2[6];
                            y2 = bez2[7];
                        } else {
                            bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
                            x2 = x2m;
                            y2 = y2m;
                        }
                        var intr = interHelper(bez1, bez2, justCount);
                        if (justCount) {
                            res += intr;
                        } else {
                            for (var k = 0, kk = intr.length; k < kk; k++) {
                                intr[k].segment1 = i;
                                intr[k].segment2 = j;
                                intr[k].bez1 = bez1;
                                intr[k].bez2 = bez2;
                            }
                            res = res.concat(intr);
                        }
                    }
                }
            }
        }
        return res;
    }
    
    R.isPointInsidePath = function (path, x, y) {
        var bbox = R.pathBBox(path);
        return R.isPointInsideBBox(bbox, x, y) &&
               interPathHelper(path, [["M", x, y], ["H", bbox.x2 + 10]], 1) % 2 == 1;
    };
    R._removedFactory = function (methodname) {
        return function () {
            eve("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object", methodname);
        };
    };
    
    var pathDimensions = R.pathBBox = function (path) {
        var pth = paths(path);
        if (pth.bbox) {
            return pth.bbox;
        }
        if (!path) {
            return {x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0};
        }
        path = path2curve(path);
        var x = 0, 
            y = 0,
            X = [],
            Y = [],
            p;
        for (var i = 0, ii = path.length; i < ii; i++) {
            p = path[i];
            if (p[0] == "M") {
                x = p[1];
                y = p[2];
                X.push(x);
                Y.push(y);
            } else {
                var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                X = X[concat](dim.min.x, dim.max.x);
                Y = Y[concat](dim.min.y, dim.max.y);
                x = p[5];
                y = p[6];
            }
        }
        var xmin = mmin[apply](0, X),
            ymin = mmin[apply](0, Y),
            xmax = mmax[apply](0, X),
            ymax = mmax[apply](0, Y),
            bb = {
                x: xmin,
                y: ymin,
                x2: xmax,
                y2: ymax,
                width: xmax - xmin,
                height: ymax - ymin
            };
        pth.bbox = clone(bb);
        return bb;
    },
        pathClone = function (pathArray) {
            var res = clone(pathArray);
            res.toString = R._path2string;
            return res;
        },
        pathToRelative = R._pathToRelative = function (pathArray) {
            var pth = paths(pathArray);
            if (pth.rel) {
                return pathClone(pth.rel);
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = pathArray[0][1];
                y = pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res.push(["M", x, y]);
            }
            for (var i = start, ii = pathArray.length; i < ii; i++) {
                var r = res[i] = [],
                    pa = pathArray[i];
                if (pa[0] != lowerCase.call(pa[0])) {
                    r[0] = lowerCase.call(pa[0]);
                    switch (r[0]) {
                        case "a":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] - x).toFixed(3);
                            r[7] = +(pa[7] - y).toFixed(3);
                            break;
                        case "v":
                            r[1] = +(pa[1] - y).toFixed(3);
                            break;
                        case "m":
                            mx = pa[1];
                            my = pa[2];
                        default:
                            for (var j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
                            }
                    }
                } else {
                    r = res[i] = [];
                    if (pa[0] == "m") {
                        mx = pa[1] + x;
                        my = pa[2] + y;
                    }
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        res[i][k] = pa[k];
                    }
                }
                var len = res[i].length;
                switch (res[i][0]) {
                    case "z":
                        x = mx;
                        y = my;
                        break;
                    case "h":
                        x += +res[i][len - 1];
                        break;
                    case "v":
                        y += +res[i][len - 1];
                        break;
                    default:
                        x += +res[i][len - 2];
                        y += +res[i][len - 1];
                }
            }
            res.toString = R._path2string;
            pth.rel = pathClone(res);
            return res;
        },
        pathToAbsolute = R._pathToAbsolute = function (pathArray) {
            var pth = paths(pathArray);
            if (pth.abs) {
                return pathClone(pth.abs);
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            if (!pathArray || !pathArray.length) {
                return [["M", 0, 0]];
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = +pathArray[0][1];
                y = +pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res[0] = ["M", x, y];
            }
            var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
            for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
                res.push(r = []);
                pa = pathArray[i];
                if (pa[0] != upperCase.call(pa[0])) {
                    r[0] = upperCase.call(pa[0]);
                    switch (r[0]) {
                        case "A":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] + x);
                            r[7] = +(pa[7] + y);
                            break;
                        case "V":
                            r[1] = +pa[1] + y;
                            break;
                        case "H":
                            r[1] = +pa[1] + x;
                            break;
                        case "R":
                            var dots = [x, y][concat](pa.slice(1));
                            for (var j = 2, jj = dots.length; j < jj; j++) {
                                dots[j] = +dots[j] + x;
                                dots[++j] = +dots[j] + y;
                            }
                            res.pop();
                            res = res[concat](catmullRom2bezier(dots, crz));
                            break;
                        case "M":
                            mx = +pa[1] + x;
                            my = +pa[2] + y;
                        default:
                            for (j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +pa[j] + ((j % 2) ? x : y);
                            }
                    }
                } else if (pa[0] == "R") {
                    dots = [x, y][concat](pa.slice(1));
                    res.pop();
                    res = res[concat](catmullRom2bezier(dots, crz));
                    r = ["R"][concat](pa.slice(-2));
                } else {
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        r[k] = pa[k];
                    }
                }
                switch (r[0]) {
                    case "Z":
                        x = mx;
                        y = my;
                        break;
                    case "H":
                        x = r[1];
                        break;
                    case "V":
                        y = r[1];
                        break;
                    case "M":
                        mx = r[r.length - 2];
                        my = r[r.length - 1];
                    default:
                        x = r[r.length - 2];
                        y = r[r.length - 1];
                }
            }
            res.toString = R._path2string;
            pth.abs = pathClone(res);
            return res;
        },
        l2c = function (x1, y1, x2, y2) {
            return [x1, y1, x2, y2, x2, y2];
        },
        q2c = function (x1, y1, ax, ay, x2, y2) {
            var _13 = 1 / 3,
                _23 = 2 / 3;
            return [
                    _13 * x1 + _23 * ax,
                    _13 * y1 + _23 * ay,
                    _13 * x2 + _23 * ax,
                    _13 * y2 + _23 * ay,
                    x2,
                    y2
                ];
        },
        a2c = function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
            // for more information of where this math came from visit:
            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
            var _120 = PI * 120 / 180,
                rad = PI / 180 * (+angle || 0),
                res = [],
                xy,
                rotate = cacher(function (x, y, rad) {
                    var X = x * math.cos(rad) - y * math.sin(rad),
                        Y = x * math.sin(rad) + y * math.cos(rad);
                    return {x: X, y: Y};
                });
            if (!recursive) {
                xy = rotate(x1, y1, -rad);
                x1 = xy.x;
                y1 = xy.y;
                xy = rotate(x2, y2, -rad);
                x2 = xy.x;
                y2 = xy.y;
                var cos = math.cos(PI / 180 * angle),
                    sin = math.sin(PI / 180 * angle),
                    x = (x1 - x2) / 2,
                    y = (y1 - y2) / 2;
                var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
                if (h > 1) {
                    h = math.sqrt(h);
                    rx = h * rx;
                    ry = h * ry;
                }
                var rx2 = rx * rx,
                    ry2 = ry * ry,
                    k = (large_arc_flag == sweep_flag ? -1 : 1) *
                        math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
                    cx = k * rx * y / ry + (x1 + x2) / 2,
                    cy = k * -ry * x / rx + (y1 + y2) / 2,
                    f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
                    f2 = math.asin(((y2 - cy) / ry).toFixed(9));

                f1 = x1 < cx ? PI - f1 : f1;
                f2 = x2 < cx ? PI - f2 : f2;
                f1 < 0 && (f1 = PI * 2 + f1);
                f2 < 0 && (f2 = PI * 2 + f2);
                if (sweep_flag && f1 > f2) {
                    f1 = f1 - PI * 2;
                }
                if (!sweep_flag && f2 > f1) {
                    f2 = f2 - PI * 2;
                }
            } else {
                f1 = recursive[0];
                f2 = recursive[1];
                cx = recursive[2];
                cy = recursive[3];
            }
            var df = f2 - f1;
            if (abs(df) > _120) {
                var f2old = f2,
                    x2old = x2,
                    y2old = y2;
                f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
                x2 = cx + rx * math.cos(f2);
                y2 = cy + ry * math.sin(f2);
                res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
            }
            df = f2 - f1;
            var c1 = math.cos(f1),
                s1 = math.sin(f1),
                c2 = math.cos(f2),
                s2 = math.sin(f2),
                t = math.tan(df / 4),
                hx = 4 / 3 * rx * t,
                hy = 4 / 3 * ry * t,
                m1 = [x1, y1],
                m2 = [x1 + hx * s1, y1 - hy * c1],
                m3 = [x2 + hx * s2, y2 - hy * c2],
                m4 = [x2, y2];
            m2[0] = 2 * m1[0] - m2[0];
            m2[1] = 2 * m1[1] - m2[1];
            if (recursive) {
                return [m2, m3, m4][concat](res);
            } else {
                res = [m2, m3, m4][concat](res).join()[split](",");
                var newres = [];
                for (var i = 0, ii = res.length; i < ii; i++) {
                    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
                }
                return newres;
            }
        },
        findDotAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
            var t1 = 1 - t;
            return {
                x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
                y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
            };
        },
        curveDim = cacher(function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
            var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
                b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
                c = p1x - c1x,
                t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
                t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
                y = [p1y, p2y],
                x = [p1x, p2x],
                dot;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
            b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
            c = p1y - c1y;
            t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
            t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            return {
                min: {x: mmin[apply](0, x), y: mmin[apply](0, y)},
                max: {x: mmax[apply](0, x), y: mmax[apply](0, y)}
            };
        }),
        path2curve = R._path2curve = cacher(function (path, path2) {
            var pth = !path2 && paths(path);
            if (!path2 && pth.curve) {
                return pathClone(pth.curve);
            }
            var p = pathToAbsolute(path),
                p2 = path2 && pathToAbsolute(path2),
                attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                processPath = function (path, d) {
                    var nx, ny;
                    if (!path) {
                        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
                    }
                    !(path[0] in {T:1, Q:1}) && (d.qx = d.qy = null);
                    switch (path[0]) {
                        case "M":
                            d.X = path[1];
                            d.Y = path[2];
                            break;
                        case "A":
                            path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
                            break;
                        case "S":
                            nx = d.x + (d.x - (d.bx || d.x));
                            ny = d.y + (d.y - (d.by || d.y));
                            path = ["C", nx, ny][concat](path.slice(1));
                            break;
                        case "T":
                            d.qx = d.x + (d.x - (d.qx || d.x));
                            d.qy = d.y + (d.y - (d.qy || d.y));
                            path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                            break;
                        case "Q":
                            d.qx = path[1];
                            d.qy = path[2];
                            path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                            break;
                        case "L":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
                            break;
                        case "H":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
                            break;
                        case "V":
                            path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
                            break;
                        case "Z":
                            path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
                            break;
                    }
                    return path;
                },
                fixArc = function (pp, i) {
                    if (pp[i].length > 7) {
                        pp[i].shift();
                        var pi = pp[i];
                        while (pi.length) {
                            pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)));
                        }
                        pp.splice(i, 1);
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                },
                fixM = function (path1, path2, a1, a2, i) {
                    if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                        path2.splice(i, 0, ["M", a2.x, a2.y]);
                        a1.bx = 0;
                        a1.by = 0;
                        a1.x = path1[i][1];
                        a1.y = path1[i][2];
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                };
            for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
                p[i] = processPath(p[i], attrs);
                fixArc(p, i);
                p2 && (p2[i] = processPath(p2[i], attrs2));
                p2 && fixArc(p2, i);
                fixM(p, p2, attrs, attrs2, i);
                fixM(p2, p, attrs2, attrs, i);
                var seg = p[i],
                    seg2 = p2 && p2[i],
                    seglen = seg.length,
                    seg2len = p2 && seg2.length;
                attrs.x = seg[seglen - 2];
                attrs.y = seg[seglen - 1];
                attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
                attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
                attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
                attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
                attrs2.x = p2 && seg2[seg2len - 2];
                attrs2.y = p2 && seg2[seg2len - 1];
            }
            if (!p2) {
                pth.curve = pathClone(p);
            }
            return p2 ? [p, p2] : p;
        }, null, pathClone),
        parseDots = R._parseDots = cacher(function (gradient) {
            var dots = [];
            for (var i = 0, ii = gradient.length; i < ii; i++) {
                var dot = {},
                    par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
                dot.color = R.getRGB(par[1]);
                if (dot.color.error) {
                    return null;
                }
                dot.color = dot.color.hex;
                par[2] && (dot.offset = par[2] + "%");
                dots.push(dot);
            }
            for (i = 1, ii = dots.length - 1; i < ii; i++) {
                if (!dots[i].offset) {
                    var start = toFloat(dots[i - 1].offset || 0),
                        end = 0;
                    for (var j = i + 1; j < ii; j++) {
                        if (dots[j].offset) {
                            end = dots[j].offset;
                            break;
                        }
                    }
                    if (!end) {
                        end = 100;
                        j = ii;
                    }
                    end = toFloat(end);
                    var d = (end - start) / (j - i + 1);
                    for (; i < j; i++) {
                        start += d;
                        dots[i].offset = start + "%";
                    }
                }
            }
            return dots;
        }),
        tear = R._tear = function (el, paper) {
            el == paper.top && (paper.top = el.prev);
            el == paper.bottom && (paper.bottom = el.next);
            el.next && (el.next.prev = el.prev);
            el.prev && (el.prev.next = el.next);
        },
        tofront = R._tofront = function (el, paper) {
            if (paper.top === el) {
                return;
            }
            tear(el, paper);
            el.next = null;
            el.prev = paper.top;
            paper.top.next = el;
            paper.top = el;
        },
        toback = R._toback = function (el, paper) {
            if (paper.bottom === el) {
                return;
            }
            tear(el, paper);
            el.next = paper.bottom;
            el.prev = null;
            paper.bottom.prev = el;
            paper.bottom = el;
        },
        insertafter = R._insertafter = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.top && (paper.top = el);
            el2.next && (el2.next.prev = el);
            el.next = el2.next;
            el.prev = el2;
            el2.next = el;
        },
        insertbefore = R._insertbefore = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.bottom && (paper.bottom = el);
            el2.prev && (el2.prev.next = el);
            el.prev = el2.prev;
            el2.prev = el;
            el.next = el2;
        },
        
        toMatrix = R.toMatrix = function (path, transform) {
            var bb = pathDimensions(path),
                el = {
                    _: {
                        transform: E
                    },
                    getBBox: function () {
                        return bb;
                    }
                };
            extractTransform(el, transform);
            return el.matrix;
        },
        
        transformPath = R.transformPath = function (path, transform) {
            return mapPath(path, toMatrix(path, transform));
        },
        extractTransform = R._extractTransform = function (el, tstr) {
            if (tstr == null) {
                return el._.transform;
            }
            tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
            var tdata = R.parseTransformString(tstr),
                deg = 0,
                dx = 0,
                dy = 0,
                sx = 1,
                sy = 1,
                _ = el._,
                m = new Matrix;
            _.transform = tdata || [];
            if (tdata) {
                for (var i = 0, ii = tdata.length; i < ii; i++) {
                    var t = tdata[i],
                        tlen = t.length,
                        command = Str(t[0]).toLowerCase(),
                        absolute = t[0] != command,
                        inver = absolute ? m.invert() : 0,
                        x1,
                        y1,
                        x2,
                        y2,
                        bb;
                    if (command == "t" && tlen == 3) {
                        if (absolute) {
                            x1 = inver.x(0, 0);
                            y1 = inver.y(0, 0);
                            x2 = inver.x(t[1], t[2]);
                            y2 = inver.y(t[1], t[2]);
                            m.translate(x2 - x1, y2 - y1);
                        } else {
                            m.translate(t[1], t[2]);
                        }
                    } else if (command == "r") {
                        if (tlen == 2) {
                            bb = bb || el.getBBox(1);
                            m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            deg += t[1];
                        } else if (tlen == 4) {
                            if (absolute) {
                                x2 = inver.x(t[2], t[3]);
                                y2 = inver.y(t[2], t[3]);
                                m.rotate(t[1], x2, y2);
                            } else {
                                m.rotate(t[1], t[2], t[3]);
                            }
                            deg += t[1];
                        }
                    } else if (command == "s") {
                        if (tlen == 2 || tlen == 3) {
                            bb = bb || el.getBBox(1);
                            m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            sx *= t[1];
                            sy *= t[tlen - 1];
                        } else if (tlen == 5) {
                            if (absolute) {
                                x2 = inver.x(t[3], t[4]);
                                y2 = inver.y(t[3], t[4]);
                                m.scale(t[1], t[2], x2, y2);
                            } else {
                                m.scale(t[1], t[2], t[3], t[4]);
                            }
                            sx *= t[1];
                            sy *= t[2];
                        }
                    } else if (command == "m" && tlen == 7) {
                        m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
                    }
                    _.dirtyT = 1;
                    el.matrix = m;
                }
            }

            
            el.matrix = m;

            _.sx = sx;
            _.sy = sy;
            _.deg = deg;
            _.dx = dx = m.e;
            _.dy = dy = m.f;

            if (sx == 1 && sy == 1 && !deg && _.bbox) {
                _.bbox.x += +dx;
                _.bbox.y += +dy;
            } else {
                _.dirtyT = 1;
            }
        },
        getEmpty = function (item) {
            var l = item[0];
            switch (l.toLowerCase()) {
                case "t": return [l, 0, 0];
                case "m": return [l, 1, 0, 0, 1, 0, 0];
                case "r": if (item.length == 4) {
                    return [l, 0, item[2], item[3]];
                } else {
                    return [l, 0];
                }
                case "s": if (item.length == 5) {
                    return [l, 1, 1, item[3], item[4]];
                } else if (item.length == 3) {
                    return [l, 1, 1];
                } else {
                    return [l, 1];
                }
            }
        },
        equaliseTransform = R._equaliseTransform = function (t1, t2) {
            t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
            t1 = R.parseTransformString(t1) || [];
            t2 = R.parseTransformString(t2) || [];
            var maxlength = mmax(t1.length, t2.length),
                from = [],
                to = [],
                i = 0, j, jj,
                tt1, tt2;
            for (; i < maxlength; i++) {
                tt1 = t1[i] || getEmpty(t2[i]);
                tt2 = t2[i] || getEmpty(tt1);
                if ((tt1[0] != tt2[0]) ||
                    (tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3])) ||
                    (tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4]))
                    ) {
                    return;
                }
                from[i] = [];
                to[i] = [];
                for (j = 0, jj = mmax(tt1.length, tt2.length); j < jj; j++) {
                    j in tt1 && (from[i][j] = tt1[j]);
                    j in tt2 && (to[i][j] = tt2[j]);
                }
            }
            return {
                from: from,
                to: to
            };
        };
    R._getContainer = function (x, y, w, h) {
        var container;
        container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
        if (container == null) {
            return;
        }
        if (container.tagName) {
            if (y == null) {
                return {
                    container: container,
                    width: container.style.pixelWidth || container.offsetWidth,
                    height: container.style.pixelHeight || container.offsetHeight
                };
            } else {
                return {
                    container: container,
                    width: y,
                    height: w
                };
            }
        }
        return {
            container: 1,
            x: x,
            y: y,
            width: w,
            height: h
        };
    };
    
    R.pathToRelative = pathToRelative;
    R._engine = {};
    
    R.path2curve = path2curve;
    
    R.matrix = function (a, b, c, d, e, f) {
        return new Matrix(a, b, c, d, e, f);
    };
    function Matrix(a, b, c, d, e, f) {
        if (a != null) {
            this.a = +a;
            this.b = +b;
            this.c = +c;
            this.d = +d;
            this.e = +e;
            this.f = +f;
        } else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0;
        }
    }
    (function (matrixproto) {
        
        matrixproto.add = function (a, b, c, d, e, f) {
            var out = [[], [], []],
                m = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
                matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
                x, y, z, res;

            if (a && a instanceof Matrix) {
                matrix = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]];
            }

            for (x = 0; x < 3; x++) {
                for (y = 0; y < 3; y++) {
                    res = 0;
                    for (z = 0; z < 3; z++) {
                        res += m[x][z] * matrix[z][y];
                    }
                    out[x][y] = res;
                }
            }
            this.a = out[0][0];
            this.b = out[1][0];
            this.c = out[0][1];
            this.d = out[1][1];
            this.e = out[0][2];
            this.f = out[1][2];
        };
        
        matrixproto.invert = function () {
            var me = this,
                x = me.a * me.d - me.b * me.c;
            return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
        };
        
        matrixproto.clone = function () {
            return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
        };
        
        matrixproto.translate = function (x, y) {
            this.add(1, 0, 0, 1, x, y);
        };
        
        matrixproto.scale = function (x, y, cx, cy) {
            y == null && (y = x);
            (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
            this.add(x, 0, 0, y, 0, 0);
            (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy);
        };
        
        matrixproto.rotate = function (a, x, y) {
            a = R.rad(a);
            x = x || 0;
            y = y || 0;
            var cos = +math.cos(a).toFixed(9),
                sin = +math.sin(a).toFixed(9);
            this.add(cos, sin, -sin, cos, x, y);
            this.add(1, 0, 0, 1, -x, -y);
        };
        
        matrixproto.x = function (x, y) {
            return x * this.a + y * this.c + this.e;
        };
        
        matrixproto.y = function (x, y) {
            return x * this.b + y * this.d + this.f;
        };
        matrixproto.get = function (i) {
            return +this[Str.fromCharCode(97 + i)].toFixed(4);
        };
        matrixproto.toString = function () {
            return R.svg ?
                "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" :
                [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
        };
        matrixproto.toFilter = function () {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) +
                ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) +
                ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
        };
        matrixproto.offset = function () {
            return [this.e.toFixed(4), this.f.toFixed(4)];
        };
        function norm(a) {
            return a[0] * a[0] + a[1] * a[1];
        }
        function normalize(a) {
            var mag = math.sqrt(norm(a));
            a[0] && (a[0] /= mag);
            a[1] && (a[1] /= mag);
        }
        
        matrixproto.split = function () {
            var out = {};
            // translation
            out.dx = this.e;
            out.dy = this.f;

            // scale and shear
            var row = [[this.a, this.c], [this.b, this.d]];
            out.scalex = math.sqrt(norm(row[0]));
            normalize(row[0]);

            out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
            row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

            out.scaley = math.sqrt(norm(row[1]));
            normalize(row[1]);
            out.shear /= out.scaley;

            // rotation
            var sin = -row[0][1],
                cos = row[1][1];
            if (cos < 0) {
                out.rotate = R.deg(math.acos(cos));
                if (sin < 0) {
                    out.rotate = 360 - out.rotate;
                }
            } else {
                out.rotate = R.deg(math.asin(sin));
            }

            out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
            out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
            out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
            return out;
        };
        
        matrixproto.toTransformString = function (shorter) {
            var s = shorter || this[split]();
            if (s.isSimple) {
                s.scalex = +s.scalex.toFixed(4);
                s.scaley = +s.scaley.toFixed(4);
                s.rotate = +s.rotate.toFixed(4);
                return  (s.dx || s.dy ? "t" + [s.dx, s.dy] : E) + 
                        (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) +
                        (s.rotate ? "r" + [s.rotate, 0, 0] : E);
            } else {
                return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
            }
        };
    })(Matrix.prototype);

    // WebKit rendering bug workaround method
    var version = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    if ((navigator.vendor == "Apple Computer, Inc.") && (version && version[1] < 4 || navigator.platform.slice(0, 2) == "iP") ||
        (navigator.vendor == "Google Inc." && version && version[1] < 8)) {
        
        paperproto.safari = function () {
            var rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
            setTimeout(function () {rect.remove();});
        };
    } else {
        paperproto.safari = fun;
    }
 
    var preventDefault = function () {
        this.returnValue = false;
    },
    preventTouch = function () {
        return this.originalEvent.preventDefault();
    },
    stopPropagation = function () {
        this.cancelBubble = true;
    },
    stopTouch = function () {
        return this.originalEvent.stopPropagation();
    },
    addEvent = (function () {
        if (g.doc.addEventListener) {
            return function (obj, type, fn, element) {
                var realName = supportsTouch && touchMap[type] ? touchMap[type] : type,
                    f = function (e) {
                        var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                            x = e.clientX + scrollX,
                            y = e.clientY + scrollY;
                    if (supportsTouch && touchMap[has](type)) {
                        for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                            if (e.targetTouches[i].target == obj) {
                                var olde = e;
                                e = e.targetTouches[i];
                                e.originalEvent = olde;
                                e.preventDefault = preventTouch;
                                e.stopPropagation = stopTouch;
                                break;
                            }
                        }
                    }
                    return fn.call(element, e, x, y);
                };
                obj.addEventListener(realName, f, false);
                return function () {
                    obj.removeEventListener(realName, f, false);
                    return true;
                };
            };
        } else if (g.doc.attachEvent) {
            return function (obj, type, fn, element) {
                var f = function (e) {
                    e = e || g.win.event;
                    var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                        scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                        x = e.clientX + scrollX,
                        y = e.clientY + scrollY;
                    e.preventDefault = e.preventDefault || preventDefault;
                    e.stopPropagation = e.stopPropagation || stopPropagation;
                    return fn.call(element, e, x, y);
                };
                obj.attachEvent("on" + type, f);
                var detacher = function () {
                    obj.detachEvent("on" + type, f);
                    return true;
                };
                return detacher;
            };
        }
    })(),
    drag = [],
    dragMove = function (e) {
        var x = e.clientX,
            y = e.clientY,
            scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
            dragi,
            j = drag.length;
        while (j--) {
            dragi = drag[j];
            if (supportsTouch) {
                var i = e.touches.length,
                    touch;
                while (i--) {
                    touch = e.touches[i];
                    if (touch.identifier == dragi.el._drag.id) {
                        x = touch.clientX;
                        y = touch.clientY;
                        (e.originalEvent ? e.originalEvent : e).preventDefault();
                        break;
                    }
                }
            } else {
                e.preventDefault();
            }
            var node = dragi.el.node,
                o,
                next = node.nextSibling,
                parent = node.parentNode,
                display = node.style.display;
            g.win.opera && parent.removeChild(node);
            node.style.display = "none";
            o = dragi.el.paper.getElementByPoint(x, y);
            node.style.display = display;
            g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
            o && eve("raphael.drag.over." + dragi.el.id, dragi.el, o);
            x += scrollX;
            y += scrollY;
            eve("raphael.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
        }
    },
    dragUp = function (e) {
        R.unmousemove(dragMove).unmouseup(dragUp);
        var i = drag.length,
            dragi;
        while (i--) {
            dragi = drag[i];
            dragi.el._drag = {};
            eve("raphael.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
        }
        drag = [];
    },
    
    elproto = R.el = {};
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    for (var i = events.length; i--;) {
        (function (eventName) {
            R[eventName] = elproto[eventName] = function (fn, scope) {
                if (R.is(fn, "function")) {
                    this.events = this.events || [];
                    this.events.push({name: eventName, f: fn, unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)});
                }
                return this;
            };
            R["un" + eventName] = elproto["un" + eventName] = function (fn) {
                var events = this.events || [],
                    l = events.length;
                while (l--) if (events[l].name == eventName && events[l].f == fn) {
                    events[l].unbind();
                    events.splice(l, 1);
                    !events.length && delete this.events;
                    return this;
                }
                return this;
            };
        })(events[i]);
    }
    
    
    elproto.data = function (key, value) {
        var data = eldata[this.id] = eldata[this.id] || {};
        if (arguments.length == 1) {
            if (R.is(key, "object")) {
                for (var i in key) if (key[has](i)) {
                    this.data(i, key[i]);
                }
                return this;
            }
            eve("raphael.data.get." + this.id, this, data[key], key);
            return data[key];
        }
        data[key] = value;
        eve("raphael.data.set." + this.id, this, value, key);
        return this;
    };
    
    elproto.removeData = function (key) {
        if (key == null) {
            eldata[this.id] = {};
        } else {
            eldata[this.id] && delete eldata[this.id][key];
        }
        return this;
    };
    
    elproto.hover = function (f_in, f_out, scope_in, scope_out) {
        return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
    };
    
    elproto.unhover = function (f_in, f_out) {
        return this.unmouseover(f_in).unmouseout(f_out);
    };
    var draggable = [];
    
    elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
        function start(e) {
            (e.originalEvent || e).preventDefault();
            var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
            this._drag.x = e.clientX + scrollX;
            this._drag.y = e.clientY + scrollY;
            this._drag.id = e.identifier;
            !drag.length && R.mousemove(dragMove).mouseup(dragUp);
            drag.push({el: this, move_scope: move_scope, start_scope: start_scope, end_scope: end_scope});
            onstart && eve.on("raphael.drag.start." + this.id, onstart);
            onmove && eve.on("raphael.drag.move." + this.id, onmove);
            onend && eve.on("raphael.drag.end." + this.id, onend);
            eve("raphael.drag.start." + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
        }
        this._drag = {};
        draggable.push({el: this, start: start});
        this.mousedown(start);
        return this;
    };
    
    elproto.onDragOver = function (f) {
        f ? eve.on("raphael.drag.over." + this.id, f) : eve.unbind("raphael.drag.over." + this.id);
    };
    
    elproto.undrag = function () {
        var i = draggable.length;
        while (i--) if (draggable[i].el == this) {
            this.unmousedown(draggable[i].start);
            draggable.splice(i, 1);
            eve.unbind("raphael.drag.*." + this.id);
        }
        !draggable.length && R.unmousemove(dragMove).unmouseup(dragUp);
    };
    
    paperproto.circle = function (x, y, r) {
        var out = R._engine.circle(this, x || 0, y || 0, r || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.rect = function (x, y, w, h, r) {
        var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.ellipse = function (x, y, rx, ry) {
        var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.path = function (pathString) {
        pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
        var out = R._engine.path(R.format[apply](R, arguments), this);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.image = function (src, x, y, w, h) {
        var out = R._engine.image(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.text = function (x, y, text) {
        var out = R._engine.text(this, x || 0, y || 0, Str(text));
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.set = function (itemsArray) {
        !R.is(itemsArray, "array") && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
        var out = new Set(itemsArray);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.setStart = function (set) {
        this.__set__ = set || this.set();
    };
    
    paperproto.setFinish = function (set) {
        var out = this.__set__;
        delete this.__set__;
        return out;
    };
    
    paperproto.setSize = function (width, height) {
        return R._engine.setSize.call(this, width, height);
    };
    
    paperproto.setViewBox = function (x, y, w, h, fit) {
        return R._engine.setViewBox.call(this, x, y, w, h, fit);
    };
    
    
    paperproto.top = paperproto.bottom = null;
    
    paperproto.raphael = R;
    var getOffset = function (elem) {
        var box = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement,
            clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
            top  = box.top  + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop ) - clientTop,
            left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
        return {
            y: top,
            x: left
        };
    };
    
    paperproto.getElementByPoint = function (x, y) {
        var paper = this,
            svg = paper.canvas,
            target = g.doc.elementFromPoint(x, y);
        if (g.win.opera && target.tagName == "svg") {
            var so = getOffset(svg),
                sr = svg.createSVGRect();
            sr.x = x - so.x;
            sr.y = y - so.y;
            sr.width = sr.height = 1;
            var hits = svg.getIntersectionList(sr, null);
            if (hits.length) {
                target = hits[hits.length - 1];
            }
        }
        if (!target) {
            return null;
        }
        while (target.parentNode && target != svg.parentNode && !target.raphael) {
            target = target.parentNode;
        }
        target == paper.canvas.parentNode && (target = svg);
        target = target && target.raphael ? paper.getById(target.raphaelid) : null;
        return target;
    };
    
    paperproto.getById = function (id) {
        var bot = this.bottom;
        while (bot) {
            if (bot.id == id) {
                return bot;
            }
            bot = bot.next;
        }
        return null;
    };
    
    paperproto.forEach = function (callback, thisArg) {
        var bot = this.bottom;
        while (bot) {
            if (callback.call(thisArg, bot) === false) {
                return this;
            }
            bot = bot.next;
        }
        return this;
    };
    
    paperproto.getElementsByPoint = function (x, y) {
        var set = this.set();
        this.forEach(function (el) {
            if (el.isPointInside(x, y)) {
                set.push(el);
            }
        });
        return set;
    };
    function x_y() {
        return this.x + S + this.y;
    }
    function x_y_w_h() {
        return this.x + S + this.y + S + this.width + " \xd7 " + this.height;
    }
    
    elproto.isPointInside = function (x, y) {
        var rp = this.realPath = this.realPath || getPath[this.type](this);
        return R.isPointInsidePath(rp, x, y);
    };
    
    elproto.getBBox = function (isWithoutTransform) {
        if (this.removed) {
            return {};
        }
        var _ = this._;
        if (isWithoutTransform) {
            if (_.dirty || !_.bboxwt) {
                this.realPath = getPath[this.type](this);
                _.bboxwt = pathDimensions(this.realPath);
                _.bboxwt.toString = x_y_w_h;
                _.dirty = 0;
            }
            return _.bboxwt;
        }
        if (_.dirty || _.dirtyT || !_.bbox) {
            if (_.dirty || !this.realPath) {
                _.bboxwt = 0;
                this.realPath = getPath[this.type](this);
            }
            _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
            _.bbox.toString = x_y_w_h;
            _.dirty = _.dirtyT = 0;
        }
        return _.bbox;
    };
    
    elproto.clone = function () {
        if (this.removed) {
            return null;
        }
        var out = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    elproto.glow = function (glow) {
        if (this.type == "text") {
            return null;
        }
        glow = glow || {};
        var s = {
            width: (glow.width || 10) + (+this.attr("stroke-width") || 1),
            fill: glow.fill || false,
            opacity: glow.opacity || .5,
            offsetx: glow.offsetx || 0,
            offsety: glow.offsety || 0,
            color: glow.color || "#000"
        },
            c = s.width / 2,
            r = this.paper,
            out = r.set(),
            path = this.realPath || getPath[this.type](this);
        path = this.matrix ? mapPath(path, this.matrix) : path;
        for (var i = 1; i < c + 1; i++) {
            out.push(r.path(path).attr({
                stroke: s.color,
                fill: s.fill ? s.color : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(s.width / c * i).toFixed(3),
                opacity: +(s.opacity / c).toFixed(3)
            }));
        }
        return out.insertBefore(this).translate(s.offsetx, s.offsety);
    };
    var curveslengths = {},
    getPointAtSegmentLength = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
        if (length == null) {
            return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
        } else {
            return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
        }
    },
    getLengthFactory = function (istotal, subpath) {
        return function (path, length, onlystart) {
            path = path2curve(path);
            var x, y, p, l, sp = "", subpaths = {}, point,
                len = 0;
            for (var i = 0, ii = path.length; i < ii; i++) {
                p = path[i];
                if (p[0] == "M") {
                    x = +p[1];
                    y = +p[2];
                } else {
                    l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                    if (len + l > length) {
                        if (subpath && !subpaths.start) {
                            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                            sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
                            if (onlystart) {return sp;}
                            subpaths.start = sp;
                            sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
                            len += l;
                            x = +p[5];
                            y = +p[6];
                            continue;
                        }
                        if (!istotal && !subpath) {
                            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                            return {x: point.x, y: point.y, alpha: point.alpha};
                        }
                    }
                    len += l;
                    x = +p[5];
                    y = +p[6];
                }
                sp += p.shift() + p;
            }
            subpaths.end = sp;
            point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
            point.alpha && (point = {x: point.x, y: point.y, alpha: point.alpha});
            return point;
        };
    };
    var getTotalLength = getLengthFactory(1),
        getPointAtLength = getLengthFactory(),
        getSubpathsAtLength = getLengthFactory(0, 1);
    
    R.getTotalLength = getTotalLength;
    
    R.getPointAtLength = getPointAtLength;
    
    R.getSubpath = function (path, from, to) {
        if (this.getTotalLength(path) - to < 1e-6) {
            return getSubpathsAtLength(path, from).end;
        }
        var a = getSubpathsAtLength(path, to, 1);
        return from ? getSubpathsAtLength(a, from).end : a;
    };
    
    elproto.getTotalLength = function () {
        if (this.type != "path") {return;}
        if (this.node.getTotalLength) {
            return this.node.getTotalLength();
        }
        return getTotalLength(this.attrs.path);
    };
    
    elproto.getPointAtLength = function (length) {
        if (this.type != "path") {return;}
        return getPointAtLength(this.attrs.path, length);
    };
    
    elproto.getSubpath = function (from, to) {
        if (this.type != "path") {return;}
        return R.getSubpath(this.attrs.path, from, to);
    };
    
    var ef = R.easing_formulas = {
        linear: function (n) {
            return n;
        },
        "<": function (n) {
            return pow(n, 1.7);
        },
        ">": function (n) {
            return pow(n, .48);
        },
        "<>": function (n) {
            var q = .48 - n / 1.04,
                Q = math.sqrt(.1734 + q * q),
                x = Q - q,
                X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
                t = X + Y + .5;
            return (1 - t) * 3 * t * t + t * t * t;
        },
        backIn: function (n) {
            var s = 1.70158;
            return n * n * ((s + 1) * n - s);
        },
        backOut: function (n) {
            n = n - 1;
            var s = 1.70158;
            return n * n * ((s + 1) * n + s) + 1;
        },
        elastic: function (n) {
            if (n == !!n) {
                return n;
            }
            return pow(2, -10 * n) * math.sin((n - .075) * (2 * PI) / .3) + 1;
        },
        bounce: function (n) {
            var s = 7.5625,
                p = 2.75,
                l;
            if (n < (1 / p)) {
                l = s * n * n;
            } else {
                if (n < (2 / p)) {
                    n -= (1.5 / p);
                    l = s * n * n + .75;
                } else {
                    if (n < (2.5 / p)) {
                        n -= (2.25 / p);
                        l = s * n * n + .9375;
                    } else {
                        n -= (2.625 / p);
                        l = s * n * n + .984375;
                    }
                }
            }
            return l;
        }
    };
    ef.easeIn = ef["ease-in"] = ef["<"];
    ef.easeOut = ef["ease-out"] = ef[">"];
    ef.easeInOut = ef["ease-in-out"] = ef["<>"];
    ef["back-in"] = ef.backIn;
    ef["back-out"] = ef.backOut;

    var animationElements = [],
        requestAnimFrame = window.requestAnimationFrame       ||
                           window.webkitRequestAnimationFrame ||
                           window.mozRequestAnimationFrame    ||
                           window.oRequestAnimationFrame      ||
                           window.msRequestAnimationFrame     ||
                           function (callback) {
                               setTimeout(callback, 16);
                           },
        animation = function () {
            var Now = +new Date,
                l = 0;
            for (; l < animationElements.length; l++) {
                var e = animationElements[l];
                if (e.el.removed || e.paused) {
                    continue;
                }
                var time = Now - e.start,
                    ms = e.ms,
                    easing = e.easing,
                    from = e.from,
                    diff = e.diff,
                    to = e.to,
                    t = e.t,
                    that = e.el,
                    set = {},
                    now,
                    init = {},
                    key;
                if (e.initstatus) {
                    time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
                    e.status = e.initstatus;
                    delete e.initstatus;
                    e.stop && animationElements.splice(l--, 1);
                } else {
                    e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top;
                }
                if (time < 0) {
                    continue;
                }
                if (time < ms) {
                    var pos = easing(time / ms);
                    for (var attr in from) if (from[has](attr)) {
                        switch (availableAnimAttrs[attr]) {
                            case nu:
                                now = +from[attr] + pos * ms * diff[attr];
                                break;
                            case "colour":
                                now = "rgb(" + [
                                    upto255(round(from[attr].r + pos * ms * diff[attr].r)),
                                    upto255(round(from[attr].g + pos * ms * diff[attr].g)),
                                    upto255(round(from[attr].b + pos * ms * diff[attr].b))
                                ].join(",") + ")";
                                break;
                            case "path":
                                now = [];
                                for (var i = 0, ii = from[attr].length; i < ii; i++) {
                                    now[i] = [from[attr][i][0]];
                                    for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
                                    }
                                    now[i] = now[i].join(S);
                                }
                                now = now.join(S);
                                break;
                            case "transform":
                                if (diff[attr].real) {
                                    now = [];
                                    for (i = 0, ii = from[attr].length; i < ii; i++) {
                                        now[i] = [from[attr][i][0]];
                                        for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                            now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j];
                                        }
                                    }
                                } else {
                                    var get = function (i) {
                                        return +from[attr][i] + pos * ms * diff[attr][i];
                                    };
                                    // now = [["r", get(2), 0, 0], ["t", get(3), get(4)], ["s", get(0), get(1), 0, 0]];
                                    now = [["m", get(0), get(1), get(2), get(3), get(4), get(5)]];
                                }
                                break;
                            case "csv":
                                if (attr == "clip-rect") {
                                    now = [];
                                    i = 4;
                                    while (i--) {
                                        now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                                    }
                                }
                                break;
                            default:
                                var from2 = [][concat](from[attr]);
                                now = [];
                                i = that.paper.customAttributes[attr].length;
                                while (i--) {
                                    now[i] = +from2[i] + pos * ms * diff[attr][i];
                                }
                                break;
                        }
                        set[attr] = now;
                    }
                    that.attr(set);
                    (function (id, that, anim) {
                        setTimeout(function () {
                            eve("raphael.anim.frame." + id, that, anim);
                        });
                    })(that.id, that, e.anim);
                } else {
                    (function(f, el, a) {
                        setTimeout(function() {
                            eve("raphael.anim.frame." + el.id, el, a);
                            eve("raphael.anim.finish." + el.id, el, a);
                            R.is(f, "function") && f.call(el);
                        });
                    })(e.callback, that, e.anim);
                    that.attr(to);
                    animationElements.splice(l--, 1);
                    if (e.repeat > 1 && !e.next) {
                        for (key in to) if (to[has](key)) {
                            init[key] = e.totalOrigin[key];
                        }
                        e.el.attr(init);
                        runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1);
                    }
                    if (e.next && !e.stop) {
                        runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat);
                    }
                }
            }
            R.svg && that && that.paper && that.paper.safari();
            animationElements.length && requestAnimFrame(animation);
        },
        upto255 = function (color) {
            return color > 255 ? 255 : color < 0 ? 0 : color;
        };
    
    elproto.animateWith = function (el, anim, params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback),
            x, y;
        runAnimation(a, element, a.percents[0], null, element.attr());
        for (var i = 0, ii = animationElements.length; i < ii; i++) {
            if (animationElements[i].anim == anim && animationElements[i].el == el) {
                animationElements[ii - 1].start = animationElements[i].start;
                break;
            }
        }
        return element;
        // 
        // 
        // var a = params ? R.animation(params, ms, easing, callback) : anim,
        //     status = element.status(anim);
        // return this.animate(a).status(a, status * anim.ms / a.ms);
    };
    function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
        var cx = 3 * p1x,
            bx = 3 * (p2x - p1x) - cx,
            ax = 1 - cx - bx,
            cy = 3 * p1y,
            by = 3 * (p2y - p1y) - cy,
            ay = 1 - cy - by;
        function sampleCurveX(t) {
            return ((ax * t + bx) * t + cx) * t;
        }
        function solve(x, epsilon) {
            var t = solveCurveX(x, epsilon);
            return ((ay * t + by) * t + cy) * t;
        }
        function solveCurveX(x, epsilon) {
            var t0, t1, t2, x2, d2, i;
            for(t2 = x, i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;
                if (abs(x2) < epsilon) {
                    return t2;
                }
                d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
                if (abs(d2) < 1e-6) {
                    break;
                }
                t2 = t2 - x2 / d2;
            }
            t0 = 0;
            t1 = 1;
            t2 = x;
            if (t2 < t0) {
                return t0;
            }
            if (t2 > t1) {
                return t1;
            }
            while (t0 < t1) {
                x2 = sampleCurveX(t2);
                if (abs(x2 - x) < epsilon) {
                    return t2;
                }
                if (x > x2) {
                    t0 = t2;
                } else {
                    t1 = t2;
                }
                t2 = (t1 - t0) / 2 + t0;
            }
            return t2;
        }
        return solve(t, 1 / (200 * duration));
    }
    elproto.onAnimation = function (f) {
        f ? eve.on("raphael.anim.frame." + this.id, f) : eve.unbind("raphael.anim.frame." + this.id);
        return this;
    };
    function Animation(anim, ms) {
        var percents = [],
            newAnim = {};
        this.ms = ms;
        this.times = 1;
        if (anim) {
            for (var attr in anim) if (anim[has](attr)) {
                newAnim[toFloat(attr)] = anim[attr];
                percents.push(toFloat(attr));
            }
            percents.sort(sortByNumber);
        }
        this.anim = newAnim;
        this.top = percents[percents.length - 1];
        this.percents = percents;
    }
    
    Animation.prototype.delay = function (delay) {
        var a = new Animation(this.anim, this.ms);
        a.times = this.times;
        a.del = +delay || 0;
        return a;
    };
    
    Animation.prototype.repeat = function (times) { 
        var a = new Animation(this.anim, this.ms);
        a.del = this.del;
        a.times = math.floor(mmax(times, 0)) || 1;
        return a;
    };
    function runAnimation(anim, element, percent, status, totalOrigin, times) {
        percent = toFloat(percent);
        var params,
            isInAnim,
            isInAnimSet,
            percents = [],
            next,
            prev,
            timestamp,
            ms = anim.ms,
            from = {},
            to = {},
            diff = {};
        if (status) {
            for (i = 0, ii = animationElements.length; i < ii; i++) {
                var e = animationElements[i];
                if (e.el.id == element.id && e.anim == anim) {
                    if (e.percent != percent) {
                        animationElements.splice(i, 1);
                        isInAnimSet = 1;
                    } else {
                        isInAnim = e;
                    }
                    element.attr(e.totalOrigin);
                    break;
                }
            }
        } else {
            status = +to; // NaN
        }
        for (var i = 0, ii = anim.percents.length; i < ii; i++) {
            if (anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
                percent = anim.percents[i];
                prev = anim.percents[i - 1] || 0;
                ms = ms / anim.top * (percent - prev);
                next = anim.percents[i + 1];
                params = anim.anim[percent];
                break;
            } else if (status) {
                element.attr(anim.anim[anim.percents[i]]);
            }
        }
        if (!params) {
            return;
        }
        if (!isInAnim) {
            for (var attr in params) if (params[has](attr)) {
                if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
                    from[attr] = element.attr(attr);
                    (from[attr] == null) && (from[attr] = availableAttrs[attr]);
                    to[attr] = params[attr];
                    switch (availableAnimAttrs[attr]) {
                        case nu:
                            diff[attr] = (to[attr] - from[attr]) / ms;
                            break;
                        case "colour":
                            from[attr] = R.getRGB(from[attr]);
                            var toColour = R.getRGB(to[attr]);
                            diff[attr] = {
                                r: (toColour.r - from[attr].r) / ms,
                                g: (toColour.g - from[attr].g) / ms,
                                b: (toColour.b - from[attr].b) / ms
                            };
                            break;
                        case "path":
                            var pathes = path2curve(from[attr], to[attr]),
                                toPath = pathes[1];
                            from[attr] = pathes[0];
                            diff[attr] = [];
                            for (i = 0, ii = from[attr].length; i < ii; i++) {
                                diff[attr][i] = [0];
                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                    diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
                                }
                            }
                            break;
                        case "transform":
                            var _ = element._,
                                eq = equaliseTransform(_[attr], to[attr]);
                            if (eq) {
                                from[attr] = eq.from;
                                to[attr] = eq.to;
                                diff[attr] = [];
                                diff[attr].real = true;
                                for (i = 0, ii = from[attr].length; i < ii; i++) {
                                    diff[attr][i] = [from[attr][i][0]];
                                    for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
                                    }
                                }
                            } else {
                                var m = (element.matrix || new Matrix),
                                    to2 = {
                                        _: {transform: _.transform},
                                        getBBox: function () {
                                            return element.getBBox(1);
                                        }
                                    };
                                from[attr] = [
                                    m.a,
                                    m.b,
                                    m.c,
                                    m.d,
                                    m.e,
                                    m.f
                                ];
                                extractTransform(to2, to[attr]);
                                to[attr] = to2._.transform;
                                diff[attr] = [
                                    (to2.matrix.a - m.a) / ms,
                                    (to2.matrix.b - m.b) / ms,
                                    (to2.matrix.c - m.c) / ms,
                                    (to2.matrix.d - m.d) / ms,
                                    (to2.matrix.e - m.e) / ms,
                                    (to2.matrix.f - m.f) / ms
                                ];
                                // from[attr] = [_.sx, _.sy, _.deg, _.dx, _.dy];
                                // var to2 = {_:{}, getBBox: function () { return element.getBBox(); }};
                                // extractTransform(to2, to[attr]);
                                // diff[attr] = [
                                //     (to2._.sx - _.sx) / ms,
                                //     (to2._.sy - _.sy) / ms,
                                //     (to2._.deg - _.deg) / ms,
                                //     (to2._.dx - _.dx) / ms,
                                //     (to2._.dy - _.dy) / ms
                                // ];
                            }
                            break;
                        case "csv":
                            var values = Str(params[attr])[split](separator),
                                from2 = Str(from[attr])[split](separator);
                            if (attr == "clip-rect") {
                                from[attr] = from2;
                                diff[attr] = [];
                                i = from2.length;
                                while (i--) {
                                    diff[attr][i] = (values[i] - from[attr][i]) / ms;
                                }
                            }
                            to[attr] = values;
                            break;
                        default:
                            values = [][concat](params[attr]);
                            from2 = [][concat](from[attr]);
                            diff[attr] = [];
                            i = element.paper.customAttributes[attr].length;
                            while (i--) {
                                diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
                            }
                            break;
                    }
                }
            }
            var easing = params.easing,
                easyeasy = R.easing_formulas[easing];
            if (!easyeasy) {
                easyeasy = Str(easing).match(bezierrg);
                if (easyeasy && easyeasy.length == 5) {
                    var curve = easyeasy;
                    easyeasy = function (t) {
                        return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
                    };
                } else {
                    easyeasy = pipe;
                }
            }
            timestamp = params.start || anim.start || +new Date;
            e = {
                anim: anim,
                percent: percent,
                timestamp: timestamp,
                start: timestamp + (anim.del || 0),
                status: 0,
                initstatus: status || 0,
                stop: false,
                ms: ms,
                easing: easyeasy,
                from: from,
                diff: diff,
                to: to,
                el: element,
                callback: params.callback,
                prev: prev,
                next: next,
                repeat: times || anim.times,
                origin: element.attr(),
                totalOrigin: totalOrigin
            };
            animationElements.push(e);
            if (status && !isInAnim && !isInAnimSet) {
                e.stop = true;
                e.start = new Date - ms * status;
                if (animationElements.length == 1) {
                    return animation();
                }
            }
            if (isInAnimSet) {
                e.start = new Date - e.ms * status;
            }
            animationElements.length == 1 && requestAnimFrame(animation);
        } else {
            isInAnim.initstatus = status;
            isInAnim.start = new Date - isInAnim.ms * status;
        }
        eve("raphael.anim.start." + element.id, element, anim);
    }
    
    R.animation = function (params, ms, easing, callback) {
        if (params instanceof Animation) {
            return params;
        }
        if (R.is(easing, "function") || !easing) {
            callback = callback || easing || null;
            easing = null;
        }
        params = Object(params);
        ms = +ms || 0;
        var p = {},
            json,
            attr;
        for (attr in params) if (params[has](attr) && toFloat(attr) != attr && toFloat(attr) + "%" != attr) {
            json = true;
            p[attr] = params[attr];
        }
        if (!json) {
            return new Animation(params, ms);
        } else {
            easing && (p.easing = easing);
            callback && (p.callback = callback);
            return new Animation({100: p}, ms);
        }
    };
    
    elproto.animate = function (params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
        runAnimation(anim, element, anim.percents[0], null, element.attr());
        return element;
    };
    
    elproto.setTime = function (anim, value) {
        if (anim && value != null) {
            this.status(anim, mmin(value, anim.ms) / anim.ms);
        }
        return this;
    };
    
    elproto.status = function (anim, value) {
        var out = [],
            i = 0,
            len,
            e;
        if (value != null) {
            runAnimation(anim, this, -1, mmin(value, 1));
            return this;
        } else {
            len = animationElements.length;
            for (; i < len; i++) {
                e = animationElements[i];
                if (e.el.id == this.id && (!anim || e.anim == anim)) {
                    if (anim) {
                        return e.status;
                    }
                    out.push({
                        anim: e.anim,
                        status: e.status
                    });
                }
            }
            if (anim) {
                return 0;
            }
            return out;
        }
    };
    
    elproto.pause = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("raphael.anim.pause." + this.id, this, animationElements[i].anim) !== false) {
                animationElements[i].paused = true;
            }
        }
        return this;
    };
    
    elproto.resume = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            var e = animationElements[i];
            if (eve("raphael.anim.resume." + this.id, this, e.anim) !== false) {
                delete e.paused;
                this.status(e.anim, e.status);
            }
        }
        return this;
    };
    
    elproto.stop = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("raphael.anim.stop." + this.id, this, animationElements[i].anim) !== false) {
                animationElements.splice(i--, 1);
            }
        }
        return this;
    };
    function stopAnimation(paper) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.paper == paper) {
            animationElements.splice(i--, 1);
        }
    }
    eve.on("raphael.remove", stopAnimation);
    eve.on("raphael.clear", stopAnimation);
    elproto.toString = function () {
        return "Rapha\xebl\u2019s object";
    };

    // Set
    var Set = function (items) {
        this.items = [];
        this.length = 0;
        this.type = "set";
        if (items) {
            for (var i = 0, ii = items.length; i < ii; i++) {
                if (items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
                    this[this.items.length] = this.items[this.items.length] = items[i];
                    this.length++;
                }
            }
        }
    },
    setproto = Set.prototype;
    
    setproto.push = function () {
        var item,
            len;
        for (var i = 0, ii = arguments.length; i < ii; i++) {
            item = arguments[i];
            if (item && (item.constructor == elproto.constructor || item.constructor == Set)) {
                len = this.items.length;
                this[len] = this.items[len] = item;
                this.length++;
            }
        }
        return this;
    };
    
    setproto.pop = function () {
        this.length && delete this[this.length--];
        return this.items.pop();
    };
    
    setproto.forEach = function (callback, thisArg) {
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            if (callback.call(thisArg, this.items[i], i) === false) {
                return this;
            }
        }
        return this;
    };
    for (var method in elproto) if (elproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname][apply](el, arg);
                });
            };
        })(method);
    }
    setproto.attr = function (name, value) {
        if (name && R.is(name, array) && R.is(name[0], "object")) {
            for (var j = 0, jj = name.length; j < jj; j++) {
                this.items[j].attr(name[j]);
            }
        } else {
            for (var i = 0, ii = this.items.length; i < ii; i++) {
                this.items[i].attr(name, value);
            }
        }
        return this;
    };
    
    setproto.clear = function () {
        while (this.length) {
            this.pop();
        }
    };
    
    setproto.splice = function (index, count, insertion) {
        index = index < 0 ? mmax(this.length + index, 0) : index;
        count = mmax(0, mmin(this.length - index, count));
        var tail = [],
            todel = [],
            args = [],
            i;
        for (i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        for (i = 0; i < count; i++) {
            todel.push(this[index + i]);
        }
        for (; i < this.length - index; i++) {
            tail.push(this[index + i]);
        }
        var arglen = args.length;
        for (i = 0; i < arglen + tail.length; i++) {
            this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
        }
        i = this.items.length = this.length -= count - arglen;
        while (this[i]) {
            delete this[i++];
        }
        return new Set(todel);
    };
    
    setproto.exclude = function (el) {
        for (var i = 0, ii = this.length; i < ii; i++) if (this[i] == el) {
            this.splice(i, 1);
            return true;
        }
    };
    setproto.animate = function (params, ms, easing, callback) {
        (R.is(easing, "function") || !easing) && (callback = easing || null);
        var len = this.items.length,
            i = len,
            item,
            set = this,
            collector;
        if (!len) {
            return this;
        }
        callback && (collector = function () {
            !--len && callback.call(set);
        });
        easing = R.is(easing, string) ? easing : collector;
        var anim = R.animation(params, ms, easing, collector);
        item = this.items[--i].animate(anim);
        while (i--) {
            this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim);
        }
        return this;
    };
    setproto.insertAfter = function (el) {
        var i = this.items.length;
        while (i--) {
            this.items[i].insertAfter(el);
        }
        return this;
    };
    setproto.getBBox = function () {
        var x = [],
            y = [],
            x2 = [],
            y2 = [];
        for (var i = this.items.length; i--;) if (!this.items[i].removed) {
            var box = this.items[i].getBBox();
            x.push(box.x);
            y.push(box.y);
            x2.push(box.x + box.width);
            y2.push(box.y + box.height);
        }
        x = mmin[apply](0, x);
        y = mmin[apply](0, y);
        x2 = mmax[apply](0, x2);
        y2 = mmax[apply](0, y2);
        return {
            x: x,
            y: y,
            x2: x2,
            y2: y2,
            width: x2 - x,
            height: y2 - y
        };
    };
    setproto.clone = function (s) {
        s = new Set;
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            s.push(this.items[i].clone());
        }
        return s;
    };
    setproto.toString = function () {
        return "Rapha\xebl\u2018s set";
    };

    
    R.registerFont = function (font) {
        if (!font.face) {
            return font;
        }
        this.fonts = this.fonts || {};
        var fontcopy = {
                w: font.w,
                face: {},
                glyphs: {}
            },
            family = font.face["font-family"];
        for (var prop in font.face) if (font.face[has](prop)) {
            fontcopy.face[prop] = font.face[prop];
        }
        if (this.fonts[family]) {
            this.fonts[family].push(fontcopy);
        } else {
            this.fonts[family] = [fontcopy];
        }
        if (!font.svg) {
            fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
            for (var glyph in font.glyphs) if (font.glyphs[has](glyph)) {
                var path = font.glyphs[glyph];
                fontcopy.glyphs[glyph] = {
                    w: path.w,
                    k: {},
                    d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function (command) {
                            return {l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[command] || "M";
                        }) + "z"
                };
                if (path.k) {
                    for (var k in path.k) if (path[has](k)) {
                        fontcopy.glyphs[glyph].k[k] = path.k[k];
                    }
                }
            }
        }
        return font;
    };
    
    paperproto.getFont = function (family, weight, style, stretch) {
        stretch = stretch || "normal";
        style = style || "normal";
        weight = +weight || {normal: 400, bold: 700, lighter: 300, bolder: 800}[weight] || 400;
        if (!R.fonts) {
            return;
        }
        var font = R.fonts[family];
        if (!font) {
            var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
            for (var fontName in R.fonts) if (R.fonts[has](fontName)) {
                if (name.test(fontName)) {
                    font = R.fonts[fontName];
                    break;
                }
            }
        }
        var thefont;
        if (font) {
            for (var i = 0, ii = font.length; i < ii; i++) {
                thefont = font[i];
                if (thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
                    break;
                }
            }
        }
        return thefont;
    };
    
    paperproto.print = function (x, y, string, font, size, origin, letter_spacing) {
        origin = origin || "middle"; // baseline|middle
        letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
        var letters = Str(string)[split](E),
            shift = 0,
            notfirst = 0,
            path = E,
            scale;
        R.is(font, string) && (font = this.getFont(font));
        if (font) {
            scale = (size || 16) / font.face["units-per-em"];
            var bb = font.face.bbox[split](separator),
                top = +bb[0],
                lineHeight = bb[3] - bb[1],
                shifty = 0,
                height = +bb[1] + (origin == "baseline" ? lineHeight + (+font.face.descent) : lineHeight / 2);
            for (var i = 0, ii = letters.length; i < ii; i++) {
                if (letters[i] == "\n") {
                    shift = 0;
                    curr = 0;
                    notfirst = 0;
                    shifty += lineHeight;
                } else {
                    var prev = notfirst && font.glyphs[letters[i - 1]] || {},
                        curr = font.glyphs[letters[i]];
                    shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
                    notfirst = 1;
                }
                if (curr && curr.d) {
                    path += R.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale]);
                }
            }
        }
        return this.path(path).attr({
            fill: "#000",
            stroke: "none"
        });
    };

    
    paperproto.add = function (json) {
        if (R.is(json, "array")) {
            var res = this.set(),
                i = 0,
                ii = json.length,
                j;
            for (; i < ii; i++) {
                j = json[i] || {};
                elements[has](j.type) && res.push(this[j.type]().attr(j));
            }
        }
        return res;
    };

    
    R.format = function (token, params) {
        var args = R.is(params, array) ? [0][concat](params) : arguments;
        token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function (str, i) {
            return args[++i] == null ? E : args[i];
        }));
        return token || E;
    };
    
    R.fullfill = (function () {
        var tokenRegex = /\{([^\}]+)\}/g,
            objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, // matches .xxxxx or ["xxxxx"] to run over object properties
            replacer = function (all, key, obj) {
                var res = obj;
                key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
                    name = name || quotedName;
                    if (res) {
                        if (name in res) {
                            res = res[name];
                        }
                        typeof res == "function" && isFunc && (res = res());
                    }
                });
                res = (res == null || res == obj ? all : res) + "";
                return res;
            };
        return function (str, obj) {
            return String(str).replace(tokenRegex, function (all, key) {
                return replacer(all, key, obj);
            });
        };
    })();
    
    R.ninja = function () {
        oldRaphael.was ? (g.win.Raphael = oldRaphael.is) : delete Raphael;
        return R;
    };
    
    R.st = setproto;
    // Firefox <3.6 fix: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
    (function (doc, loaded, f) {
        if (doc.readyState == null && doc.addEventListener){
            doc.addEventListener(loaded, f = function () {
                doc.removeEventListener(loaded, f, false);
                doc.readyState = "complete";
            }, false);
            doc.readyState = "loading";
        }
        function isLoaded() {
            (/in/).test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve("raphael.DOMload");
        }
        isLoaded();
    })(document, "DOMContentLoaded");

    oldRaphael.was ? (g.win.Raphael = R) : (Raphael = R);
    
    eve.on("raphael.DOMload", function () {
        loaded = true;
    });
})();


// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël - JavaScript Vector Library                                 │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ SVG Module                                                          │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
window.Raphael.svg && function (R) {
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        toInt = parseInt,
        math = Math,
        mmax = math.max,
        abs = math.abs,
        pow = math.pow,
        separator = /[, ]+/,
        eve = R.eve,
        E = "",
        S = " ";
    var xlink = "http://www.w3.org/1999/xlink",
        markers = {
            block: "M5,0 0,2.5 5,5z",
            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
            open: "M6,1 1,3.5 6,6",
            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
        },
        markerCounter = {};
    R.toString = function () {
        return  "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
    };
    var $ = function (el, attr) {
        if (attr) {
            if (typeof el == "string") {
                el = $(el);
            }
            for (var key in attr) if (attr[has](key)) {
                if (key.substring(0, 6) == "xlink:") {
                    el.setAttributeNS(xlink, key.substring(6), Str(attr[key]));
                } else {
                    el.setAttribute(key, Str(attr[key]));
                }
            }
        } else {
            el = R._g.doc.createElementNS("http://www.w3.org/2000/svg", el);
            el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
        }
        return el;
    },
    addGradientFill = function (element, gradient) {
        var type = "linear",
            id = element.id + gradient,
            fx = .5, fy = .5,
            o = element.node,
            SVG = element.paper,
            s = o.style,
            el = R._g.doc.getElementById(id);
        if (!el) {
            gradient = Str(gradient).replace(R._radial_gradient, function (all, _fx, _fy) {
                type = "radial";
                if (_fx && _fy) {
                    fx = toFloat(_fx);
                    fy = toFloat(_fy);
                    var dir = ((fy > .5) * 2 - 1);
                    pow(fx - .5, 2) + pow(fy - .5, 2) > .25 &&
                        (fy = math.sqrt(.25 - pow(fx - .5, 2)) * dir + .5) &&
                        fy != .5 &&
                        (fy = fy.toFixed(5) - 1e-5 * dir);
                }
                return E;
            });
            gradient = gradient.split(/\s*\-\s*/);
            if (type == "linear") {
                var angle = gradient.shift();
                angle = -toFloat(angle);
                if (isNaN(angle)) {
                    return null;
                }
                var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))],
                    max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
                vector[2] *= max;
                vector[3] *= max;
                if (vector[2] < 0) {
                    vector[0] = -vector[2];
                    vector[2] = 0;
                }
                if (vector[3] < 0) {
                    vector[1] = -vector[3];
                    vector[3] = 0;
                }
            }
            var dots = R._parseDots(gradient);
            if (!dots) {
                return null;
            }
            id = id.replace(/[\(\)\s,\xb0#]/g, "_");
            
            if (element.gradient && id != element.gradient.id) {
                SVG.defs.removeChild(element.gradient);
                delete element.gradient;
            }

            if (!element.gradient) {
                el = $(type + "Gradient", {id: id});
                element.gradient = el;
                $(el, type == "radial" ? {
                    fx: fx,
                    fy: fy
                } : {
                    x1: vector[0],
                    y1: vector[1],
                    x2: vector[2],
                    y2: vector[3],
                    gradientTransform: element.matrix.invert()
                });
                SVG.defs.appendChild(el);
                for (var i = 0, ii = dots.length; i < ii; i++) {
                    el.appendChild($("stop", {
                        offset: dots[i].offset ? dots[i].offset : i ? "100%" : "0%",
                        "stop-color": dots[i].color || "#fff"
                    }));
                }
            }
        }
        $(o, {
            fill: "url(#" + id + ")",
            opacity: 1,
            "fill-opacity": 1
        });
        s.fill = E;
        s.opacity = 1;
        s.fillOpacity = 1;
        return 1;
    },
    updatePosition = function (o) {
        var bbox = o.getBBox(1);
        $(o.pattern, {patternTransform: o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")"});
    },
    addArrow = function (o, value, isEnd) {
        if (o.type == "path") {
            var values = Str(value).toLowerCase().split("-"),
                p = o.paper,
                se = isEnd ? "end" : "start",
                node = o.node,
                attrs = o.attrs,
                stroke = attrs["stroke-width"],
                i = values.length,
                type = "classic",
                from,
                to,
                dx,
                refX,
                attr,
                w = 3,
                h = 3,
                t = 5;
            while (i--) {
                switch (values[i]) {
                    case "block":
                    case "classic":
                    case "oval":
                    case "diamond":
                    case "open":
                    case "none":
                        type = values[i];
                        break;
                    case "wide": h = 5; break;
                    case "narrow": h = 2; break;
                    case "long": w = 5; break;
                    case "short": w = 2; break;
                }
            }
            if (type == "open") {
                w += 2;
                h += 2;
                t += 2;
                dx = 1;
                refX = isEnd ? 4 : 1;
                attr = {
                    fill: "none",
                    stroke: attrs.stroke
                };
            } else {
                refX = dx = w / 2;
                attr = {
                    fill: attrs.stroke,
                    stroke: "none"
                };
            }
            if (o._.arrows) {
                if (isEnd) {
                    o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
                    o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--;
                } else {
                    o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
                    o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--;
                }
            } else {
                o._.arrows = {};
            }
            if (type != "none") {
                var pathId = "raphael-marker-" + type,
                    markerId = "raphael-marker-" + se + type + w + h;
                if (!R._g.doc.getElementById(pathId)) {
                    p.defs.appendChild($($("path"), {
                        "stroke-linecap": "round",
                        d: markers[type],
                        id: pathId
                    }));
                    markerCounter[pathId] = 1;
                } else {
                    markerCounter[pathId]++;
                }
                var marker = R._g.doc.getElementById(markerId),
                    use;
                if (!marker) {
                    marker = $($("marker"), {
                        id: markerId,
                        markerHeight: h,
                        markerWidth: w,
                        orient: "auto",
                        refX: refX,
                        refY: h / 2
                    });
                    use = $($("use"), {
                        "xlink:href": "#" + pathId,
                        transform: (isEnd ? "rotate(180 " + w / 2 + " " + h / 2 + ") " : E) + "scale(" + w / t + "," + h / t + ")",
                        "stroke-width": (1 / ((w / t + h / t) / 2)).toFixed(4)
                    });
                    marker.appendChild(use);
                    p.defs.appendChild(marker);
                    markerCounter[markerId] = 1;
                } else {
                    markerCounter[markerId]++;
                    use = marker.getElementsByTagName("use")[0];
                }
                $(use, attr);
                var delta = dx * (type != "diamond" && type != "oval");
                if (isEnd) {
                    from = o._.arrows.startdx * stroke || 0;
                    to = R.getTotalLength(attrs.path) - delta * stroke;
                } else {
                    from = delta * stroke;
                    to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                }
                attr = {};
                attr["marker-" + se] = "url(#" + markerId + ")";
                if (to || from) {
                    attr.d = Raphael.getSubpath(attrs.path, from, to);
                }
                $(node, attr);
                o._.arrows[se + "Path"] = pathId;
                o._.arrows[se + "Marker"] = markerId;
                o._.arrows[se + "dx"] = delta;
                o._.arrows[se + "Type"] = type;
                o._.arrows[se + "String"] = value;
            } else {
                if (isEnd) {
                    from = o._.arrows.startdx * stroke || 0;
                    to = R.getTotalLength(attrs.path) - from;
                } else {
                    from = 0;
                    to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                }
                o._.arrows[se + "Path"] && $(node, {d: Raphael.getSubpath(attrs.path, from, to)});
                delete o._.arrows[se + "Path"];
                delete o._.arrows[se + "Marker"];
                delete o._.arrows[se + "dx"];
                delete o._.arrows[se + "Type"];
                delete o._.arrows[se + "String"];
            }
            for (attr in markerCounter) if (markerCounter[has](attr) && !markerCounter[attr]) {
                var item = R._g.doc.getElementById(attr);
                item && item.parentNode.removeChild(item);
            }
        }
    },
    dasharray = {
        "": [0],
        "none": [0],
        "-": [3, 1],
        ".": [1, 1],
        "-.": [3, 1, 1, 1],
        "-..": [3, 1, 1, 1, 1, 1],
        ". ": [1, 3],
        "- ": [4, 3],
        "--": [8, 3],
        "- .": [4, 3, 1, 3],
        "--.": [8, 3, 1, 3],
        "--..": [8, 3, 1, 3, 1, 3]
    },
    addDashes = function (o, value, params) {
        value = dasharray[Str(value).toLowerCase()];
        if (value) {
            var width = o.attrs["stroke-width"] || "1",
                butt = {round: width, square: width, butt: 0}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                dashes = [],
                i = value.length;
            while (i--) {
                dashes[i] = value[i] * width + ((i % 2) ? 1 : -1) * butt;
            }
            $(o.node, {"stroke-dasharray": dashes.join(",")});
        }
    },
    setFillAndStroke = function (o, params) {
        var node = o.node,
            attrs = o.attrs,
            vis = node.style.visibility;
        node.style.visibility = "hidden";
        for (var att in params) {
            if (params[has](att)) {
                if (!R._availableAttrs[has](att)) {
                    continue;
                }
                var value = params[att];
                attrs[att] = value;
                switch (att) {
                    case "blur":
                        o.blur(value);
                        break;
                    case "href":
                    case "title":
                    case "target":
                        var pn = node.parentNode;
                        if (pn.tagName.toLowerCase() != "a") {
                            var hl = $("a");
                            pn.insertBefore(hl, node);
                            hl.appendChild(node);
                            pn = hl;
                        }
                        if (att == "target") {
                            pn.setAttributeNS(xlink, "show", value == "blank" ? "new" : value);
                        } else {
                            pn.setAttributeNS(xlink, att, value);
                        }
                        break;
                    case "cursor":
                        node.style.cursor = value;
                        break;
                    case "transform":
                        o.transform(value);
                        break;
                    case "arrow-start":
                        addArrow(o, value);
                        break;
                    case "arrow-end":
                        addArrow(o, value, 1);
                        break;
                    case "clip-rect":
                        var rect = Str(value).split(separator);
                        if (rect.length == 4) {
                            o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                            var el = $("clipPath"),
                                rc = $("rect");
                            el.id = R.createUUID();
                            $(rc, {
                                x: rect[0],
                                y: rect[1],
                                width: rect[2],
                                height: rect[3]
                            });
                            el.appendChild(rc);
                            o.paper.defs.appendChild(el);
                            $(node, {"clip-path": "url(#" + el.id + ")"});
                            o.clip = rc;
                        }
                        if (!value) {
                            var path = node.getAttribute("clip-path");
                            if (path) {
                                var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
                                clip && clip.parentNode.removeChild(clip);
                                $(node, {"clip-path": E});
                                delete o.clip;
                            }
                        }
                    break;
                    case "path":
                        if (o.type == "path") {
                            $(node, {d: value ? attrs.path = R._pathToAbsolute(value) : "M0,0"});
                            o._.dirty = 1;
                            if (o._.arrows) {
                                "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                            }
                        }
                        break;
                    case "width":
                        node.setAttribute(att, value);
                        o._.dirty = 1;
                        if (attrs.fx) {
                            att = "x";
                            value = attrs.x;
                        } else {
                            break;
                        }
                    case "x":
                        if (attrs.fx) {
                            value = -attrs.x - (attrs.width || 0);
                        }
                    case "rx":
                        if (att == "rx" && o.type == "rect") {
                            break;
                        }
                    case "cx":
                        node.setAttribute(att, value);
                        o.pattern && updatePosition(o);
                        o._.dirty = 1;
                        break;
                    case "height":
                        node.setAttribute(att, value);
                        o._.dirty = 1;
                        if (attrs.fy) {
                            att = "y";
                            value = attrs.y;
                        } else {
                            break;
                        }
                    case "y":
                        if (attrs.fy) {
                            value = -attrs.y - (attrs.height || 0);
                        }
                    case "ry":
                        if (att == "ry" && o.type == "rect") {
                            break;
                        }
                    case "cy":
                        node.setAttribute(att, value);
                        o.pattern && updatePosition(o);
                        o._.dirty = 1;
                        break;
                    case "r":
                        if (o.type == "rect") {
                            $(node, {rx: value, ry: value});
                        } else {
                            node.setAttribute(att, value);
                        }
                        o._.dirty = 1;
                        break;
                    case "src":
                        if (o.type == "image") {
                            node.setAttributeNS(xlink, "href", value);
                        }
                        break;
                    case "stroke-width":
                        if (o._.sx != 1 || o._.sy != 1) {
                            value /= mmax(abs(o._.sx), abs(o._.sy)) || 1;
                        }
                        if (o.paper._vbSize) {
                            value *= o.paper._vbSize;
                        }
                        node.setAttribute(att, value);
                        if (attrs["stroke-dasharray"]) {
                            addDashes(o, attrs["stroke-dasharray"], params);
                        }
                        if (o._.arrows) {
                            "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                            "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                        }
                        break;
                    case "stroke-dasharray":
                        addDashes(o, value, params);
                        break;
                    case "fill":
                        var isURL = Str(value).match(R._ISURL);
                        if (isURL) {
                            el = $("pattern");
                            var ig = $("image");
                            el.id = R.createUUID();
                            $(el, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                            $(ig, {x: 0, y: 0, "xlink:href": isURL[1]});
                            el.appendChild(ig);

                            (function (el) {
                                R._preload(isURL[1], function () {
                                    var w = this.offsetWidth,
                                        h = this.offsetHeight;
                                    $(el, {width: w, height: h});
                                    $(ig, {width: w, height: h});
                                    o.paper.safari();
                                });
                            })(el);
                            o.paper.defs.appendChild(el);
                            $(node, {fill: "url(#" + el.id + ")"});
                            o.pattern = el;
                            o.pattern && updatePosition(o);
                            break;
                        }
                        var clr = R.getRGB(value);
                        if (!clr.error) {
                            delete params.gradient;
                            delete attrs.gradient;
                            !R.is(attrs.opacity, "undefined") &&
                                R.is(params.opacity, "undefined") &&
                                $(node, {opacity: attrs.opacity});
                            !R.is(attrs["fill-opacity"], "undefined") &&
                                R.is(params["fill-opacity"], "undefined") &&
                                $(node, {"fill-opacity": attrs["fill-opacity"]});
                        } else if ((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
                            if ("opacity" in attrs || "fill-opacity" in attrs) {
                                var gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                                if (gradient) {
                                    var stops = gradient.getElementsByTagName("stop");
                                    $(stops[stops.length - 1], {"stop-opacity": ("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1)});
                                }
                            }
                            attrs.gradient = value;
                            attrs.fill = "none";
                            break;
                        }
                        clr[has]("opacity") && $(node, {"fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                    case "stroke":
                        clr = R.getRGB(value);
                        node.setAttribute(att, clr.hex);
                        att == "stroke" && clr[has]("opacity") && $(node, {"stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                        if (att == "stroke" && o._.arrows) {
                            "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                            "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                        }
                        break;
                    case "gradient":
                        (o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
                        break;
                    case "opacity":
                        if (attrs.gradient && !attrs[has]("stroke-opacity")) {
                            $(node, {"stroke-opacity": value > 1 ? value / 100 : value});
                        }
                        // fall
                    case "fill-opacity":
                        if (attrs.gradient) {
                            gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                            if (gradient) {
                                stops = gradient.getElementsByTagName("stop");
                                $(stops[stops.length - 1], {"stop-opacity": value});
                            }
                            break;
                        }
                    default:
                        att == "font-size" && (value = toInt(value, 10) + "px");
                        var cssrule = att.replace(/(\-.)/g, function (w) {
                            return w.substring(1).toUpperCase();
                        });
                        node.style[cssrule] = value;
                        o._.dirty = 1;
                        node.setAttribute(att, value);
                        break;
                }
            }
        }

        tuneText(o, params);
        node.style.visibility = vis;
    },
    leading = 1.2,
    tuneText = function (el, params) {
        if (el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
            return;
        }
        var a = el.attrs,
            node = el.node,
            fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;

        if (params[has]("text")) {
            a.text = params.text;
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            var texts = Str(params.text).split("\n"),
                tspans = [],
                tspan;
            for (var i = 0, ii = texts.length; i < ii; i++) {
                tspan = $("tspan");
                i && $(tspan, {dy: fontSize * leading, x: a.x});
                tspan.appendChild(R._g.doc.createTextNode(texts[i]));
                node.appendChild(tspan);
                tspans[i] = tspan;
            }
        } else {
            tspans = node.getElementsByTagName("tspan");
            for (i = 0, ii = tspans.length; i < ii; i++) if (i) {
                $(tspans[i], {dy: fontSize * leading, x: a.x});
            } else {
                $(tspans[0], {dy: 0});
            }
        }
        $(node, {x: a.x, y: a.y});
        el._.dirty = 1;
        var bb = el._getBBox(),
            dif = a.y - (bb.y + bb.height / 2);
        dif && R.is(dif, "finite") && $(tspans[0], {dy: dif});
    },
    Element = function (node, svg) {
        var X = 0,
            Y = 0;
        
        this[0] = this.node = node;
        
        node.raphael = true;
        
        this.id = R._oid++;
        node.raphaelid = this.id;
        this.matrix = R.matrix();
        this.realPath = null;
        
        this.paper = svg;
        this.attrs = this.attrs || {};
        this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            deg: 0,
            dx: 0,
            dy: 0,
            dirty: 1
        };
        !svg.bottom && (svg.bottom = this);
        
        this.prev = svg.top;
        svg.top && (svg.top.next = this);
        svg.top = this;
        
        this.next = null;
    },
    elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;

    R._engine.path = function (pathString, SVG) {
        var el = $("path");
        SVG.canvas && SVG.canvas.appendChild(el);
        var p = new Element(el, SVG);
        p.type = "path";
        setFillAndStroke(p, {
            fill: "none",
            stroke: "#000",
            path: pathString
        });
        return p;
    };
    
    elproto.rotate = function (deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
        return this;
    };
    
    elproto.scale = function (sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;
        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
        return this;
    };
    
    elproto.translate = function (dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        this.transform(this._.transform.concat([["t", dx, dy]]));
        return this;
    };
    
    elproto.transform = function (tstr) {
        var _ = this._;
        if (tstr == null) {
            return _.transform;
        }
        R._extractTransform(this, tstr);

        this.clip && $(this.clip, {transform: this.matrix.invert()});
        this.pattern && updatePosition(this);
        this.node && $(this.node, {transform: this.matrix});
    
        if (_.sx != 1 || _.sy != 1) {
            var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
            this.attr({"stroke-width": sw});
        }

        return this;
    };
    
    elproto.hide = function () {
        !this.removed && this.paper.safari(this.node.style.display = "none");
        return this;
    };
    
    elproto.show = function () {
        !this.removed && this.paper.safari(this.node.style.display = "");
        return this;
    };
    
    elproto.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return;
        }
        var paper = this.paper;
        paper.__set__ && paper.__set__.exclude(this);
        eve.unbind("raphael.*.*." + this.id);
        if (this.gradient) {
            paper.defs.removeChild(this.gradient);
        }
        R._tear(this, paper);
        if (this.node.parentNode.tagName.toLowerCase() == "a") {
            this.node.parentNode.parentNode.removeChild(this.node.parentNode);
        } else {
            this.node.parentNode.removeChild(this.node);
        }
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        this.removed = true;
    };
    elproto._getBBox = function () {
        if (this.node.style.display == "none") {
            this.show();
            var hide = true;
        }
        var bbox = {};
        try {
            bbox = this.node.getBBox();
        } catch(e) {
            // Firefox 3.0.x plays badly here
        } finally {
            bbox = bbox || {};
        }
        hide && this.hide();
        return bbox;
    };
    
    elproto.attr = function (name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs) if (this.attrs[has](a)) {
                res[a] = this.attrs[a];
            }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            if (name == "transform") {
                return this._.transform;
            }
            var names = name.split(separator),
                out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    out[name] = this.paper.customAttributes[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        if (value != null) {
            var params = {};
            params[name] = value;
        } else if (name != null && R.is(name, "object")) {
            params = name;
        }
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key]);
        }
        for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
            var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
            this.attrs[key] = params[key];
            for (var subkey in par) if (par[has](subkey)) {
                params[subkey] = par[subkey];
            }
        }
        setFillAndStroke(this, params);
        return this;
    };
    
    elproto.toFront = function () {
        if (this.removed) {
            return this;
        }
        if (this.node.parentNode.tagName.toLowerCase() == "a") {
            this.node.parentNode.parentNode.appendChild(this.node.parentNode);
        } else {
            this.node.parentNode.appendChild(this.node);
        }
        var svg = this.paper;
        svg.top != this && R._tofront(this, svg);
        return this;
    };
    
    elproto.toBack = function () {
        if (this.removed) {
            return this;
        }
        var parent = this.node.parentNode;
        if (parent.tagName.toLowerCase() == "a") {
            parent.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild); 
        } else if (parent.firstChild != this.node) {
            parent.insertBefore(this.node, this.node.parentNode.firstChild);
        }
        R._toback(this, this.paper);
        var svg = this.paper;
        return this;
    };
    
    elproto.insertAfter = function (element) {
        if (this.removed) {
            return this;
        }
        var node = element.node || element[element.length - 1].node;
        if (node.nextSibling) {
            node.parentNode.insertBefore(this.node, node.nextSibling);
        } else {
            node.parentNode.appendChild(this.node);
        }
        R._insertafter(this, element, this.paper);
        return this;
    };
    
    elproto.insertBefore = function (element) {
        if (this.removed) {
            return this;
        }
        var node = element.node || element[0].node;
        node.parentNode.insertBefore(this.node, node);
        R._insertbefore(this, element, this.paper);
        return this;
    };
    elproto.blur = function (size) {
        // Experimental. No Safari support. Use it on your own risk.
        var t = this;
        if (+size !== 0) {
            var fltr = $("filter"),
                blur = $("feGaussianBlur");
            t.attrs.blur = size;
            fltr.id = R.createUUID();
            $(blur, {stdDeviation: +size || 1.5});
            fltr.appendChild(blur);
            t.paper.defs.appendChild(fltr);
            t._blur = fltr;
            $(t.node, {filter: "url(#" + fltr.id + ")"});
        } else {
            if (t._blur) {
                t._blur.parentNode.removeChild(t._blur);
                delete t._blur;
                delete t.attrs.blur;
            }
            t.node.removeAttribute("filter");
        }
    };
    R._engine.circle = function (svg, x, y, r) {
        var el = $("circle");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {cx: x, cy: y, r: r, fill: "none", stroke: "#000"};
        res.type = "circle";
        $(el, res.attrs);
        return res;
    };
    R._engine.rect = function (svg, x, y, w, h, r) {
        var el = $("rect");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, width: w, height: h, r: r || 0, rx: r || 0, ry: r || 0, fill: "none", stroke: "#000"};
        res.type = "rect";
        $(el, res.attrs);
        return res;
    };
    R._engine.ellipse = function (svg, x, y, rx, ry) {
        var el = $("ellipse");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {cx: x, cy: y, rx: rx, ry: ry, fill: "none", stroke: "#000"};
        res.type = "ellipse";
        $(el, res.attrs);
        return res;
    };
    R._engine.image = function (svg, src, x, y, w, h) {
        var el = $("image");
        $(el, {x: x, y: y, width: w, height: h, preserveAspectRatio: "none"});
        el.setAttributeNS(xlink, "href", src);
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, width: w, height: h, src: src};
        res.type = "image";
        return res;
    };
    R._engine.text = function (svg, x, y, text) {
        var el = $("text");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {
            x: x,
            y: y,
            "text-anchor": "middle",
            text: text,
            font: R._availableAttrs.font,
            stroke: "none",
            fill: "#000"
        };
        res.type = "text";
        setFillAndStroke(res, res.attrs);
        return res;
    };
    R._engine.setSize = function (width, height) {
        this.width = width || this.width;
        this.height = height || this.height;
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
        if (this._viewBox) {
            this.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.create = function () {
        var con = R._getContainer.apply(0, arguments),
            container = con && con.container,
            x = con.x,
            y = con.y,
            width = con.width,
            height = con.height;
        if (!container) {
            throw new Error("SVG container not found.");
        }
        var cnvs = $("svg"),
            css = "overflow:hidden;",
            isFloating;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        $(cnvs, {
            height: height,
            version: 1.1,
            width: width,
            xmlns: "http://www.w3.org/2000/svg"
        });
        if (container == 1) {
            cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
            R._g.doc.body.appendChild(cnvs);
            isFloating = 1;
        } else {
            cnvs.style.cssText = css + "position:relative";
            if (container.firstChild) {
                container.insertBefore(cnvs, container.firstChild);
            } else {
                container.appendChild(cnvs);
            }
        }
        container = new R._Paper;
        container.width = width;
        container.height = height;
        container.canvas = cnvs;
        container.clear();
        container._left = container._top = 0;
        isFloating && (container.renderfix = function () {});
        container.renderfix();
        return container;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
        eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var size = mmax(w / this.width, h / this.height),
            top = this.top,
            aspectRatio = fit ? "meet" : "xMinYMin",
            vb,
            sw;
        if (x == null) {
            if (this._vbSize) {
                size = 1;
            }
            delete this._vbSize;
            vb = "0 0 " + this.width + S + this.height;
        } else {
            this._vbSize = size;
            vb = x + S + y + S + w + S + h;
        }
        $(this.canvas, {
            viewBox: vb,
            preserveAspectRatio: aspectRatio
        });
        while (size && top) {
            sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
            top.attr({"stroke-width": sw});
            top._.dirty = 1;
            top._.dirtyT = 1;
            top = top.prev;
        }
        this._viewBox = [x, y, w, h, !!fit];
        return this;
    };
    
    R.prototype.renderfix = function () {
        var cnvs = this.canvas,
            s = cnvs.style,
            pos;
        try {
            pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix();
        } catch (e) {
            pos = cnvs.createSVGMatrix();
        }
        var left = -pos.e % 1,
            top = -pos.f % 1;
        if (left || top) {
            if (left) {
                this._left = (this._left + left) % 1;
                s.left = this._left + "px";
            }
            if (top) {
                this._top = (this._top + top) % 1;
                s.top = this._top + "px";
            }
        }
    };
    
    R.prototype.clear = function () {
        R.eve("raphael.clear", this);
        var c = this.canvas;
        while (c.firstChild) {
            c.removeChild(c.firstChild);
        }
        this.bottom = this.top = null;
        (this.desc = $("desc")).appendChild(R._g.doc.createTextNode("Created with Rapha\xebl " + R.version));
        c.appendChild(this.desc);
        c.appendChild(this.defs = $("defs"));
    };
    
    R.prototype.remove = function () {
        eve("raphael.remove", this);
        this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
    };
    var setproto = R.st;
    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname].apply(el, arg);
                });
            };
        })(method);
    }
}(window.Raphael);

// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël - JavaScript Vector Library                                 │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ VML Module                                                          │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
window.Raphael.vml && function (R) {
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        math = Math,
        round = math.round,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        fillString = "fill",
        separator = /[, ]+/,
        eve = R.eve,
        ms = " progid:DXImageTransform.Microsoft",
        S = " ",
        E = "",
        map = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"},
        bites = /([clmz]),?([^clmz]*)/gi,
        blurregexp = / progid:\S+Blur\([^\)]+\)/g,
        val = /-?[^,\s-]+/g,
        cssDot = "position:absolute;left:0;top:0;width:1px;height:1px",
        zoom = 21600,
        pathTypes = {path: 1, rect: 1, image: 1},
        ovalTypes = {circle: 1, ellipse: 1},
        path2vml = function (path) {
            var total =  /[ahqstv]/ig,
                command = R._pathToAbsolute;
            Str(path).match(total) && (command = R._path2curve);
            total = /[clmz]/g;
            if (command == R._pathToAbsolute && !Str(path).match(total)) {
                var res = Str(path).replace(bites, function (all, command, args) {
                    var vals = [],
                        isMove = command.toLowerCase() == "m",
                        res = map[command];
                    args.replace(val, function (value) {
                        if (isMove && vals.length == 2) {
                            res += vals + map[command == "m" ? "l" : "L"];
                            vals = [];
                        }
                        vals.push(round(value * zoom));
                    });
                    return res + vals;
                });
                return res;
            }
            var pa = command(path), p, r;
            res = [];
            for (var i = 0, ii = pa.length; i < ii; i++) {
                p = pa[i];
                r = pa[i][0].toLowerCase();
                r == "z" && (r = "x");
                for (var j = 1, jj = p.length; j < jj; j++) {
                    r += round(p[j] * zoom) + (j != jj - 1 ? "," : E);
                }
                res.push(r);
            }
            return res.join(S);
        },
        compensation = function (deg, dx, dy) {
            var m = R.matrix();
            m.rotate(-deg, .5, .5);
            return {
                dx: m.x(dx, dy),
                dy: m.y(dx, dy)
            };
        },
        setCoords = function (p, sx, sy, dx, dy, deg) {
            var _ = p._,
                m = p.matrix,
                fillpos = _.fillpos,
                o = p.node,
                s = o.style,
                y = 1,
                flip = "",
                dxdy,
                kx = zoom / sx,
                ky = zoom / sy;
            s.visibility = "hidden";
            if (!sx || !sy) {
                return;
            }
            o.coordsize = abs(kx) + S + abs(ky);
            s.rotation = deg * (sx * sy < 0 ? -1 : 1);
            if (deg) {
                var c = compensation(deg, dx, dy);
                dx = c.dx;
                dy = c.dy;
            }
            sx < 0 && (flip += "x");
            sy < 0 && (flip += " y") && (y = -1);
            s.flip = flip;
            o.coordorigin = (dx * -kx) + S + (dy * -ky);
            if (fillpos || _.fillsize) {
                var fill = o.getElementsByTagName(fillString);
                fill = fill && fill[0];
                o.removeChild(fill);
                if (fillpos) {
                    c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
                    fill.position = c.dx * y + S + c.dy * y;
                }
                if (_.fillsize) {
                    fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy);
                }
                o.appendChild(fill);
            }
            s.visibility = "visible";
        };
    R.toString = function () {
        return  "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
    };
    var addArrow = function (o, value, isEnd) {
        var values = Str(value).toLowerCase().split("-"),
            se = isEnd ? "end" : "start",
            i = values.length,
            type = "classic",
            w = "medium",
            h = "medium";
        while (i--) {
            switch (values[i]) {
                case "block":
                case "classic":
                case "oval":
                case "diamond":
                case "open":
                case "none":
                    type = values[i];
                    break;
                case "wide":
                case "narrow": h = values[i]; break;
                case "long":
                case "short": w = values[i]; break;
            }
        }
        var stroke = o.node.getElementsByTagName("stroke")[0];
        stroke[se + "arrow"] = type;
        stroke[se + "arrowlength"] = w;
        stroke[se + "arrowwidth"] = h;
    },
    setFillAndStroke = function (o, params) {
        // o.paper.canvas.style.display = "none";
        o.attrs = o.attrs || {};
        var node = o.node,
            a = o.attrs,
            s = node.style,
            xy,
            newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r),
            isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry),
            res = o;


        for (var par in params) if (params[has](par)) {
            a[par] = params[par];
        }
        if (newpath) {
            a.path = R._getPath[o.type](o);
            o._.dirty = 1;
        }
        params.href && (node.href = params.href);
        params.title && (node.title = params.title);
        params.target && (node.target = params.target);
        params.cursor && (s.cursor = params.cursor);
        "blur" in params && o.blur(params.blur);
        if (params.path && o.type == "path" || newpath) {
            node.path = path2vml(~Str(a.path).toLowerCase().indexOf("r") ? R._pathToAbsolute(a.path) : a.path);
            if (o.type == "image") {
                o._.fillpos = [a.x, a.y];
                o._.fillsize = [a.width, a.height];
                setCoords(o, 1, 1, 0, 0, 0);
            }
        }
        "transform" in params && o.transform(params.transform);
        if (isOval) {
            var cx = +a.cx,
                cy = +a.cy,
                rx = +a.rx || +a.r || 0,
                ry = +a.ry || +a.r || 0;
            node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom));
        }
        if ("clip-rect" in params) {
            var rect = Str(params["clip-rect"]).split(separator);
            if (rect.length == 4) {
                rect[2] = +rect[2] + (+rect[0]);
                rect[3] = +rect[3] + (+rect[1]);
                var div = node.clipRect || R._g.doc.createElement("div"),
                    dstyle = div.style;
                dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
                if (!node.clipRect) {
                    dstyle.position = "absolute";
                    dstyle.top = 0;
                    dstyle.left = 0;
                    dstyle.width = o.paper.width + "px";
                    dstyle.height = o.paper.height + "px";
                    node.parentNode.insertBefore(div, node);
                    div.appendChild(node);
                    node.clipRect = div;
                }
            }
            if (!params["clip-rect"]) {
                node.clipRect && (node.clipRect.style.clip = "auto");
            }
        }
        if (o.textpath) {
            var textpathStyle = o.textpath.style;
            params.font && (textpathStyle.font = params.font);
            params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
            params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
            params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
            params["font-style"] && (textpathStyle.fontStyle = params["font-style"]);
        }
        if ("arrow-start" in params) {
            addArrow(res, params["arrow-start"]);
        }
        if ("arrow-end" in params) {
            addArrow(res, params["arrow-end"], 1);
        }
        if (params.opacity != null || 
            params["stroke-width"] != null ||
            params.fill != null ||
            params.src != null ||
            params.stroke != null ||
            params["stroke-width"] != null ||
            params["stroke-opacity"] != null ||
            params["fill-opacity"] != null ||
            params["stroke-dasharray"] != null ||
            params["stroke-miterlimit"] != null ||
            params["stroke-linejoin"] != null ||
            params["stroke-linecap"] != null) {
            var fill = node.getElementsByTagName(fillString),
                newfill = false;
            fill = fill && fill[0];
            !fill && (newfill = fill = createNode(fillString));
            if (o.type == "image" && params.src) {
                fill.src = params.src;
            }
            params.fill && (fill.on = true);
            if (fill.on == null || params.fill == "none" || params.fill === null) {
                fill.on = false;
            }
            if (fill.on && params.fill) {
                var isURL = Str(params.fill).match(R._ISURL);
                if (isURL) {
                    fill.parentNode == node && node.removeChild(fill);
                    fill.rotate = true;
                    fill.src = isURL[1];
                    fill.type = "tile";
                    var bbox = o.getBBox(1);
                    fill.position = bbox.x + S + bbox.y;
                    o._.fillpos = [bbox.x, bbox.y];

                    R._preload(isURL[1], function () {
                        o._.fillsize = [this.offsetWidth, this.offsetHeight];
                    });
                } else {
                    fill.color = R.getRGB(params.fill).hex;
                    fill.src = E;
                    fill.type = "solid";
                    if (R.getRGB(params.fill).error && (res.type in {circle: 1, ellipse: 1} || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
                        a.fill = "none";
                        a.gradient = params.fill;
                        fill.rotate = false;
                    }
                }
            }
            if ("fill-opacity" in params || "opacity" in params) {
                var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
                opacity = mmin(mmax(opacity, 0), 1);
                fill.opacity = opacity;
                if (fill.src) {
                    fill.color = "none";
                }
            }
            node.appendChild(fill);
            var stroke = (node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0]),
            newstroke = false;
            !stroke && (newstroke = stroke = createNode("stroke"));
            if ((params.stroke && params.stroke != "none") ||
                params["stroke-width"] ||
                params["stroke-opacity"] != null ||
                params["stroke-dasharray"] ||
                params["stroke-miterlimit"] ||
                params["stroke-linejoin"] ||
                params["stroke-linecap"]) {
                stroke.on = true;
            }
            (params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
            var strokeColor = R.getRGB(params.stroke);
            stroke.on && params.stroke && (stroke.color = strokeColor.hex);
            opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
            var width = (toFloat(params["stroke-width"]) || 1) * .75;
            opacity = mmin(mmax(opacity, 0), 1);
            params["stroke-width"] == null && (width = a["stroke-width"]);
            params["stroke-width"] && (stroke.weight = width);
            width && width < 1 && (opacity *= width) && (stroke.weight = 1);
            stroke.opacity = opacity;
        
            params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
            stroke.miterlimit = params["stroke-miterlimit"] || 8;
            params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
            if (params["stroke-dasharray"]) {
                var dasharray = {
                    "-": "shortdash",
                    ".": "shortdot",
                    "-.": "shortdashdot",
                    "-..": "shortdashdotdot",
                    ". ": "dot",
                    "- ": "dash",
                    "--": "longdash",
                    "- .": "dashdot",
                    "--.": "longdashdot",
                    "--..": "longdashdotdot"
                };
                stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E;
            }
            newstroke && node.appendChild(stroke);
        }
        if (res.type == "text") {
            res.paper.canvas.style.display = E;
            var span = res.paper.span,
                m = 100,
                fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
            s = span.style;
            a.font && (s.font = a.font);
            a["font-family"] && (s.fontFamily = a["font-family"]);
            a["font-weight"] && (s.fontWeight = a["font-weight"]);
            a["font-style"] && (s.fontStyle = a["font-style"]);
            fontSize = toFloat(a["font-size"] || fontSize && fontSize[0]) || 10;
            s.fontSize = fontSize * m + "px";
            res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
            var brect = span.getBoundingClientRect();
            res.W = a.w = (brect.right - brect.left) / m;
            res.H = a.h = (brect.bottom - brect.top) / m;
            // res.paper.canvas.style.display = "none";
            res.X = a.x;
            res.Y = a.y + res.H / 2;

            ("x" in params || "y" in params) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
            var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
            for (var d = 0, dd = dirtyattrs.length; d < dd; d++) if (dirtyattrs[d] in params) {
                res._.dirty = 1;
                break;
            }
        
            // text-anchor emulation
            switch (a["text-anchor"]) {
                case "start":
                    res.textpath.style["v-text-align"] = "left";
                    res.bbx = res.W / 2;
                break;
                case "end":
                    res.textpath.style["v-text-align"] = "right";
                    res.bbx = -res.W / 2;
                break;
                default:
                    res.textpath.style["v-text-align"] = "center";
                    res.bbx = 0;
                break;
            }
            res.textpath.style["v-text-kern"] = true;
        }
        // res.paper.canvas.style.display = E;
    },
    addGradientFill = function (o, gradient, fill) {
        o.attrs = o.attrs || {};
        var attrs = o.attrs,
            pow = Math.pow,
            opacity,
            oindex,
            type = "linear",
            fxfy = ".5 .5";
        o.attrs.gradient = gradient;
        gradient = Str(gradient).replace(R._radial_gradient, function (all, fx, fy) {
            type = "radial";
            if (fx && fy) {
                fx = toFloat(fx);
                fy = toFloat(fy);
                pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * ((fy > .5) * 2 - 1) + .5);
                fxfy = fx + S + fy;
            }
            return E;
        });
        gradient = gradient.split(/\s*\-\s*/);
        if (type == "linear") {
            var angle = gradient.shift();
            angle = -toFloat(angle);
            if (isNaN(angle)) {
                return null;
            }
        }
        var dots = R._parseDots(gradient);
        if (!dots) {
            return null;
        }
        o = o.shape || o.node;
        if (dots.length) {
            o.removeChild(fill);
            fill.on = true;
            fill.method = "none";
            fill.color = dots[0].color;
            fill.color2 = dots[dots.length - 1].color;
            var clrs = [];
            for (var i = 0, ii = dots.length; i < ii; i++) {
                dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color);
            }
            fill.colors = clrs.length ? clrs.join() : "0% " + fill.color;
            if (type == "radial") {
                fill.type = "gradientTitle";
                fill.focus = "100%";
                fill.focussize = "0 0";
                fill.focusposition = fxfy;
                fill.angle = 0;
            } else {
                // fill.rotate= true;
                fill.type = "gradient";
                fill.angle = (270 - angle) % 360;
            }
            o.appendChild(fill);
        }
        return 1;
    },
    Element = function (node, vml) {
        this[0] = this.node = node;
        node.raphael = true;
        this.id = R._oid++;
        node.raphaelid = this.id;
        this.X = 0;
        this.Y = 0;
        this.attrs = {};
        this.paper = vml;
        this.matrix = R.matrix();
        this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            dx: 0,
            dy: 0,
            deg: 0,
            dirty: 1,
            dirtyT: 1
        };
        !vml.bottom && (vml.bottom = this);
        this.prev = vml.top;
        vml.top && (vml.top.next = this);
        vml.top = this;
        this.next = null;
    };
    var elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;
    elproto.transform = function (tstr) {
        if (tstr == null) {
            return this._.transform;
        }
        var vbs = this.paper._viewBoxShift,
            vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E,
            oldt;
        if (vbs) {
            oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E);
        }
        R._extractTransform(this, vbt + tstr);
        var matrix = this.matrix.clone(),
            skew = this.skew,
            o = this.node,
            split,
            isGrad = ~Str(this.attrs.fill).indexOf("-"),
            isPatt = !Str(this.attrs.fill).indexOf("url(");
        matrix.translate(-.5, -.5);
        if (isPatt || isGrad || this.type == "image") {
            skew.matrix = "1 0 0 1";
            skew.offset = "0 0";
            split = matrix.split();
            if ((isGrad && split.noRotation) || !split.isSimple) {
                o.style.filter = matrix.toFilter();
                var bb = this.getBBox(),
                    bbt = this.getBBox(1),
                    dx = bb.x - bbt.x,
                    dy = bb.y - bbt.y;
                o.coordorigin = (dx * -zoom) + S + (dy * -zoom);
                setCoords(this, 1, 1, dx, dy, 0);
            } else {
                o.style.filter = E;
                setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate);
            }
        } else {
            o.style.filter = E;
            skew.matrix = Str(matrix);
            skew.offset = matrix.offset();
        }
        oldt && (this._.transform = oldt);
        return this;
    };
    elproto.rotate = function (deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        if (deg == null) {
            return;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this._.dirtyT = 1;
        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
        return this;
    };
    elproto.translate = function (dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        if (this._.bbox) {
            this._.bbox.x += dx;
            this._.bbox.y += dy;
        }
        this.transform(this._.transform.concat([["t", dx, dy]]));
        return this;
    };
    elproto.scale = function (sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
            isNaN(cx) && (cx = null);
            isNaN(cy) && (cy = null);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;
    
        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
        this._.dirtyT = 1;
        return this;
    };
    elproto.hide = function () {
        !this.removed && (this.node.style.display = "none");
        return this;
    };
    elproto.show = function () {
        !this.removed && (this.node.style.display = E);
        return this;
    };
    elproto._getBBox = function () {
        if (this.removed) {
            return {};
        }
        return {
            x: this.X + (this.bbx || 0) - this.W / 2,
            y: this.Y - this.H,
            width: this.W,
            height: this.H
        };
    };
    elproto.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return;
        }
        this.paper.__set__ && this.paper.__set__.exclude(this);
        R.eve.unbind("raphael.*.*." + this.id);
        R._tear(this, this.paper);
        this.node.parentNode.removeChild(this.node);
        this.shape && this.shape.parentNode.removeChild(this.shape);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        this.removed = true;
    };
    elproto.attr = function (name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs) if (this.attrs[has](a)) {
                res[a] = this.attrs[a];
            }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            var names = name.split(separator),
                out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    out[name] = this.paper.customAttributes[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (this.attrs && value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        var params;
        if (value != null) {
            params = {};
            params[name] = value;
        }
        value == null && R.is(name, "object") && (params = name);
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key]);
        }
        if (params) {
            for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
                var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
                this.attrs[key] = params[key];
                for (var subkey in par) if (par[has](subkey)) {
                    params[subkey] = par[subkey];
                }
            }
            // this.paper.canvas.style.display = "none";
            if (params.text && this.type == "text") {
                this.textpath.string = params.text;
            }
            setFillAndStroke(this, params);
            // this.paper.canvas.style.display = E;
        }
        return this;
    };
    elproto.toFront = function () {
        !this.removed && this.node.parentNode.appendChild(this.node);
        this.paper && this.paper.top != this && R._tofront(this, this.paper);
        return this;
    };
    elproto.toBack = function () {
        if (this.removed) {
            return this;
        }
        if (this.node.parentNode.firstChild != this.node) {
            this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
            R._toback(this, this.paper);
        }
        return this;
    };
    elproto.insertAfter = function (element) {
        if (this.removed) {
            return this;
        }
        if (element.constructor == R.st.constructor) {
            element = element[element.length - 1];
        }
        if (element.node.nextSibling) {
            element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
        } else {
            element.node.parentNode.appendChild(this.node);
        }
        R._insertafter(this, element, this.paper);
        return this;
    };
    elproto.insertBefore = function (element) {
        if (this.removed) {
            return this;
        }
        if (element.constructor == R.st.constructor) {
            element = element[0];
        }
        element.node.parentNode.insertBefore(this.node, element.node);
        R._insertbefore(this, element, this.paper);
        return this;
    };
    elproto.blur = function (size) {
        var s = this.node.runtimeStyle,
            f = s.filter;
        f = f.replace(blurregexp, E);
        if (+size !== 0) {
            this.attrs.blur = size;
            s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
            s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5));
        } else {
            s.filter = f;
            s.margin = 0;
            delete this.attrs.blur;
        }
    };

    R._engine.path = function (pathString, vml) {
        var el = createNode("shape");
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = vml.coordorigin;
        var p = new Element(el, vml),
            attr = {fill: "none", stroke: "#000"};
        pathString && (attr.path = pathString);
        p.type = "path";
        p.path = [];
        p.Path = E;
        setFillAndStroke(p, attr);
        vml.canvas.appendChild(el);
        var skew = createNode("skew");
        skew.on = true;
        el.appendChild(skew);
        p.skew = skew;
        p.transform(E);
        return p;
    };
    R._engine.rect = function (vml, x, y, w, h, r) {
        var path = R._rectPath(x, y, w, h, r),
            res = vml.path(path),
            a = res.attrs;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;
        a.r = r;
        a.path = path;
        res.type = "rect";
        return res;
    };
    R._engine.ellipse = function (vml, x, y, rx, ry) {
        var res = vml.path(),
            a = res.attrs;
        res.X = x - rx;
        res.Y = y - ry;
        res.W = rx * 2;
        res.H = ry * 2;
        res.type = "ellipse";
        setFillAndStroke(res, {
            cx: x,
            cy: y,
            rx: rx,
            ry: ry
        });
        return res;
    };
    R._engine.circle = function (vml, x, y, r) {
        var res = vml.path(),
            a = res.attrs;
        res.X = x - r;
        res.Y = y - r;
        res.W = res.H = r * 2;
        res.type = "circle";
        setFillAndStroke(res, {
            cx: x,
            cy: y,
            r: r
        });
        return res;
    };
    R._engine.image = function (vml, src, x, y, w, h) {
        var path = R._rectPath(x, y, w, h),
            res = vml.path(path).attr({stroke: "none"}),
            a = res.attrs,
            node = res.node,
            fill = node.getElementsByTagName(fillString)[0];
        a.src = src;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;
        a.path = path;
        res.type = "image";
        fill.parentNode == node && node.removeChild(fill);
        fill.rotate = true;
        fill.src = src;
        fill.type = "tile";
        res._.fillpos = [x, y];
        res._.fillsize = [w, h];
        node.appendChild(fill);
        setCoords(res, 1, 1, 0, 0, 0);
        return res;
    };
    R._engine.text = function (vml, x, y, text) {
        var el = createNode("shape"),
            path = createNode("path"),
            o = createNode("textpath");
        x = x || 0;
        y = y || 0;
        text = text || "";
        path.v = R.format("m{0},{1}l{2},{1}", round(x * zoom), round(y * zoom), round(x * zoom) + 1);
        path.textpathok = true;
        o.string = Str(text);
        o.on = true;
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = "0 0";
        var p = new Element(el, vml),
            attr = {
                fill: "#000",
                stroke: "none",
                font: R._availableAttrs.font,
                text: text
            };
        p.shape = el;
        p.path = path;
        p.textpath = o;
        p.type = "text";
        p.attrs.text = Str(text);
        p.attrs.x = x;
        p.attrs.y = y;
        p.attrs.w = 1;
        p.attrs.h = 1;
        setFillAndStroke(p, attr);
        el.appendChild(o);
        el.appendChild(path);
        vml.canvas.appendChild(el);
        var skew = createNode("skew");
        skew.on = true;
        el.appendChild(skew);
        p.skew = skew;
        p.transform(E);
        return p;
    };
    R._engine.setSize = function (width, height) {
        var cs = this.canvas.style;
        this.width = width;
        this.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        cs.width = width;
        cs.height = height;
        cs.clip = "rect(0 " + width + " " + height + " 0)";
        if (this._viewBox) {
            R._engine.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
        R.eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var width = this.width,
            height = this.height,
            size = 1 / mmax(w / width, h / height),
            H, W;
        if (fit) {
            H = height / h;
            W = width / w;
            if (w * H < width) {
                x -= (width - w * H) / 2 / H;
            }
            if (h * W < height) {
                y -= (height - h * W) / 2 / W;
            }
        }
        this._viewBox = [x, y, w, h, !!fit];
        this._viewBoxShift = {
            dx: -x,
            dy: -y,
            scale: size
        };
        this.forEach(function (el) {
            el.transform("...");
        });
        return this;
    };
    var createNode;
    R._engine.initWin = function (win) {
            var doc = win.document;
            doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                createNode = function (tagName) {
                    return doc.createElement('<rvml:' + tagName + ' class="rvml">');
                };
            } catch (e) {
                createNode = function (tagName) {
                    return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                };
            }
        };
    R._engine.initWin(R._g.win);
    R._engine.create = function () {
        var con = R._getContainer.apply(0, arguments),
            container = con.container,
            height = con.height,
            s,
            width = con.width,
            x = con.x,
            y = con.y;
        if (!container) {
            throw new Error("VML container not found.");
        }
        var res = new R._Paper,
            c = res.canvas = R._g.doc.createElement("div"),
            cs = c.style;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        res.width = width;
        res.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        res.coordsize = zoom * 1e3 + S + zoom * 1e3;
        res.coordorigin = "0 0";
        res.span = R._g.doc.createElement("span");
        res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
        c.appendChild(res.span);
        cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
        if (container == 1) {
            R._g.doc.body.appendChild(c);
            cs.left = x + "px";
            cs.top = y + "px";
            cs.position = "absolute";
        } else {
            if (container.firstChild) {
                container.insertBefore(c, container.firstChild);
            } else {
                container.appendChild(c);
            }
        }
        res.renderfix = function () {};
        return res;
    };
    R.prototype.clear = function () {
        R.eve("raphael.clear", this);
        this.canvas.innerHTML = E;
        this.span = R._g.doc.createElement("span");
        this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
        this.canvas.appendChild(this.span);
        this.bottom = this.top = null;
    };
    R.prototype.remove = function () {
        R.eve("raphael.remove", this);
        this.canvas.parentNode.removeChild(this.canvas);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        return true;
    };

    var setproto = R.st;
    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname].apply(el, arg);
                });
            };
        })(method);
    }
}(window.Raphael);/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var dirruns,
	cachedruns,
	assertGetIdNotName,
	Expr,
	getText,
	isXML,
	contains,
	compile,
	sortOrder,
	hasDuplicate,

	baseHasDuplicate = true,
	strundefined = "undefined",

	expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	document = window.document,
	docElem = document.documentElement,
	done = 0,
	slice = [].slice,
	push = [].push,

	// Augment a function for special use by Sizzle
	markFunction = function( fn, value ) {
		fn[ expando ] = value || true;
		return fn;
	},

	createCache = function() {
		var cache = {},
			keys = [];

		return markFunction(function( key, value ) {
			// Only keep the most recent entries
			if ( keys.push( key ) > Expr.cacheLength ) {
				delete cache[ keys.shift() ];
			}

			return (cache[ key ] = value);
		}, cache );
	},

	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// Regex

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments not in parens/brackets,
	//   then attribute selectors and non-pseudos (denoted by :),
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

	// For matchExpr.POS and matchExpr.needsContext
	pos = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	rnot = /^:not/,
	rsibling = /[\x20\t\r\n\f]*[+~]/,
	rendsWithNot = /:not\($/,

	rheader = /h\d/i,
	rinputs = /input|select|textarea|button/i,

	rbackslash = /\\(?!\\)/g,

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|nth|last|first)-child(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"POS": new RegExp( pos, "ig" ),
		// For use in libraries implementing .is()
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	},

	// Support

	// Used for testing something on an element
	assert = function( fn ) {
		var div = document.createElement("div");

		try {
			return fn( div );
		} catch (e) {
			return false;
		} finally {
			// release memory in IE
			div = null;
		}
	},

	// Check if getElementsByTagName("*") returns only elements
	assertTagNameNoComments = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	}),

	// Check if getAttribute returns normalized href attributes
	assertHrefNotNormalized = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}),

	// Check if attributes should be retrieved by attribute nodes
	assertAttributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	}),

	// Check if getElementsByClassName can be trusted
	assertUsableClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	}),

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	assertUsableName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = document.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			document.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			document.getElementsByName( expando + 0 ).length;
		assertGetIdNotName = !document.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

// If slice is not available, provide a backup
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem, results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

function Sizzle( selector, context, results, seed ) {
	results = results || [];
	context = context || document;
	var match, elem, xml, m,
		nodeType = context.nodeType;

	if ( nodeType !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	xml = isXML( context );

	if ( !xml && !seed ) {
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}
	}

	// All others
	return select( selector, context, results, seed, xml );
}

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	} else {

		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	}
	return ret;
};

isXML = Sizzle.isXML = function isXML( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
contains = Sizzle.contains = docElem.contains ?
	function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	} :
	docElem.compareDocumentPosition ?
	function( a, b ) {
		return b && !!( a.compareDocumentPosition( b ) & 16 );
	} :
	function( a, b ) {
		while ( (b = b.parentNode) ) {
			if ( b === a ) {
				return true;
			}
		}
		return false;
	};

Sizzle.attr = function( elem, name ) {
	var attr,
		xml = isXML( elem );

	if ( !xml ) {
		name = name.toLowerCase();
	}
	if ( Expr.attrHandle[ name ] ) {
		return Expr.attrHandle[ name ]( elem );
	}
	if ( assertAttributes || xml ) {
		return elem.getAttribute( name );
	}
	attr = elem.getAttributeNode( name );
	return attr ?
		typeof elem[ name ] === "boolean" ?
			elem[ name ] ? name : null :
			attr.specified ? attr.value : null :
		null;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	order: new RegExp( "ID|TAG" +
		(assertUsableName ? "|NAME" : "") +
		(assertUsableClassName ? "|CLASS" : "")
	),

	// IE6/7 return a modified href
	attrHandle: assertHrefNotNormalized ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		},

	find: {
		"ID": assertGetIdNotName ?
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			} :
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			},

		"TAG": assertTagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					var elem,
						tmp = [],
						i = 0;

					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			},

		"NAME": function( tag, context ) {
			if ( typeof context.getElementsByName !== strundefined ) {
				return context.getElementsByName( name );
			}
		},

		"CLASS": function( className, context, xml ) {
			if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
				return context.getElementsByClassName( className );
			}
		}
	},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( rbackslash, "" );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr.CHILD
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				// nth-child requires argument
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
				match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

			// other types prohibit arguments
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match, context, xml ) {
			var unquoted, excess;
			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			if ( match[3] ) {
				match[2] = match[3];
			} else if ( (unquoted = match[4]) ) {
				// Only check arguments that contain a pseudo
				if ( rpseudo.test(unquoted) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, context, xml, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					unquoted = unquoted.slice( 0, excess );
					match[0] = match[0].slice( 0, excess );
				}
				match[2] = unquoted;
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {
		"ID": assertGetIdNotName ?
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					return elem.getAttribute("id") === id;
				};
			} :
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === id;
				};
			},

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}
			nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ expando ][ className ];
			if ( !pattern ) {
				pattern = classCache( className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)") );
			}
			return function( elem ) {
				return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
			};
		},

		"ATTR": function( name, operator, check ) {
			if ( !operator ) {
				return function( elem ) {
					return Sizzle.attr( elem, name ) != null;
				};
			}

			return function( elem ) {
				var result = Sizzle.attr( elem, name ),
					value = result + "";

				if ( result == null ) {
					return operator === "!=";
				}

				switch ( operator ) {
					case "=":
						return value === check;
					case "!=":
						return value !== check;
					case "^=":
						return check && value.indexOf( check ) === 0;
					case "*=":
						return check && value.indexOf( check ) > -1;
					case "$=":
						return check && value.substr( value.length - check.length ) === check;
					case "~=":
						return ( " " + value + " " ).indexOf( check ) > -1;
					case "|=":
						return value === check || value.substr( 0, check.length + 1 ) === check + "-";
				}
			};
		},

		"CHILD": function( type, argument, first, last ) {

			if ( type === "nth" ) {
				var doneName = done++;

				return function( elem ) {
					var parent, diff,
						count = 0,
						node = elem;

					if ( first === 1 && last === 0 ) {
						return true;
					}

					parent = elem.parentNode;

					if ( parent && (parent[ expando ] !== doneName || !elem.sizset) ) {
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.sizset = ++count;
								if ( node === elem ) {
									break;
								}
							}
						}

						parent[ expando ] = doneName;
					}

					diff = elem.sizset - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
				};
			}

			return function( elem ) {
				var node = elem;

				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						if ( type === "first" ) {
							return true;
						}

						node = elem;

						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						return true;
				}
			};
		},

		"PSEUDO": function( pseudo, argument, context, xml ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.pseudos[ pseudo.toLowerCase() ];

			if ( !fn ) {
				Sizzle.error( "unsupported pseudo: " + pseudo );
			}

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( !fn[ expando ] ) {
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return function( elem ) {
						return fn( elem, 0, args );
					};
				}
				return fn;
			}

			return fn( argument, context, xml );
		}
	},

	pseudos: {
		"not": markFunction(function( selector, context, xml ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var matcher = compile( selector.replace( rtrim, "$1" ), context, xml );
			return function( elem ) {
				return !matcher( elem );
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			var nodeType;
			elem = elem.firstChild;
			while ( elem ) {
				if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
					return false;
				}
				elem = elem.nextSibling;
			}
			return true;
		},

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputPseudo("radio"),
		"checkbox": createInputPseudo("checkbox"),
		"file": createInputPseudo("file"),
		"password": createInputPseudo("password"),
		"image": createInputPseudo("image"),

		"submit": createButtonPseudo("submit"),
		"reset": createButtonPseudo("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},

	setFilters: {
		"first": function( elements, argument, not ) {
			return not ? elements.slice( 1 ) : [ elements[0] ];
		},

		"last": function( elements, argument, not ) {
			var elem = elements.pop();
			return not ? elements : [ elem ];
		},

		"even": function( elements, argument, not ) {
			var results = [],
				i = not ? 1 : 0,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"odd": function( elements, argument, not ) {
			var results = [],
				i = not ? 0 : 1,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"lt": function( elements, argument, not ) {
			return not ? elements.slice( +argument ) : elements.slice( 0, +argument );
		},

		"gt": function( elements, argument, not ) {
			return not ? elements.slice( 0, +argument + 1 ) : elements.slice( +argument + 1 );
		},

		"eq": function( elements, argument, not ) {
			var elem = elements.splice( +argument, 1 );
			return not ? elements : elem;
		}
	}
};

function siblingCheck( a, b, ret ) {
	if ( a === b ) {
		return ret;
	}

	var cur = a.nextSibling;

	while ( cur ) {
		if ( cur === b ) {
			return -1;
		}

		cur = cur.nextSibling;
	}

	return 1;
}

sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	} :
	function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

// Always assume the presence of duplicates if sort doesn't
// pass them to our comparison function (as in Google Chrome).
[0, 0].sort( sortOrder );
baseHasDuplicate = !hasDuplicate;

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		i = 1;

	hasDuplicate = baseHasDuplicate;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				results.splice( i--, 1 );
			}
		}
	}

	return results;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

function tokenize( selector, context, xml, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, group, i,
		preFilters, filters,
		checkContext = !xml && context !== document,
		// Token cache should maintain spaces
		key = ( checkContext ? "<s>" : "" ) + selector.replace( rtrim, "$1<s>" ),
		cached = tokenCache[ expando ][ key ];

	if ( cached ) {
		return parseOnly ? 0 : slice.call( cached, 0 );
	}

	soFar = selector;
	groups = [];
	i = 0;
	preFilters = Expr.preFilter;
	filters = Expr.filter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				soFar = soFar.slice( match[0].length );
				tokens.selector = group;
			}
			groups.push( tokens = [] );
			group = "";

			// Need to make sure we're within a narrower context if necessary
			// Adding a descendant combinator will generate what is needed
			if ( checkContext ) {
				soFar = " " + soFar;
			}
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			group += match[0];
			soFar = soFar.slice( match[0].length );

			// Cast descendant combinators to space
			matched = tokens.push({
				part: match.pop().replace( rtrim, " " ),
				string: match[0],
				captures: match
			});
		}

		// Filters
		for ( type in filters ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				( match = preFilters[ type ](match, context, xml) )) ) {

				group += match[0];
				soFar = soFar.slice( match[0].length );
				matched = tokens.push({
					part: type,
					string: match.shift(),
					captures: match
				});
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Attach the full group as a selector
	if ( group ) {
		tokens.selector = group;
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			slice.call( tokenCache(key, groups), 0 );
}

function addCombinator( matcher, combinator, context, xml ) {
	var dir = combinator.dir,
		doneName = done++;

	if ( !matcher ) {
		// If there is no matcher to check, check against the context
		matcher = function( elem ) {
			return elem === context;
		};
	}
	return combinator.first ?
		function( elem ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 ) {
					return matcher( elem ) && elem;
				}
			}
		} :
		xml ?
			function( elem ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 ) {
						if ( matcher( elem ) ) {
							return elem;
						}
					}
				}
			} :
			function( elem ) {
				var cache,
					dirkey = doneName + "." + dirruns,
					cachedkey = dirkey + "." + cachedruns;
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 ) {
						if ( (cache = elem[ expando ]) === cachedkey ) {
							return elem.sizset;
						} else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
							if ( elem.sizset ) {
								return elem;
							}
						} else {
							elem[ expando ] = cachedkey;
							if ( matcher( elem ) ) {
								elem.sizset = true;
								return elem;
							}
							elem.sizset = false;
						}
					}
				}
			};
}

function addMatcher( higher, deeper ) {
	return higher ?
		function( elem ) {
			var result = deeper( elem );
			return result && higher( result === true ? elem : result );
		} :
		deeper;
}

// ["TAG", ">", "ID", " ", "CLASS"]
function matcherFromTokens( tokens, context, xml ) {
	var token, matcher,
		i = 0;

	for ( ; (token = tokens[i]); i++ ) {
		if ( Expr.relative[ token.part ] ) {
			matcher = addCombinator( matcher, Expr.relative[ token.part ], context, xml );
		} else {
			matcher = addMatcher( matcher, Expr.filter[ token.part ].apply(null, token.captures.concat( context, xml )) );
		}
	}

	return matcher;
}

function matcherFromGroupMatchers( matchers ) {
	return function( elem ) {
		var matcher,
			j = 0;
		for ( ; (matcher = matchers[j]); j++ ) {
			if ( matcher(elem) ) {
				return true;
			}
		}
		return false;
	};
}

compile = Sizzle.compile = function( selector, context, xml ) {
	var group, i, len,
		cached = compilerCache[ expando ][ selector ];

	// Return a cached group function if already generated (context dependent)
	if ( cached && cached.context === context ) {
		return cached;
	}

	// Generate a function of recursive functions that can be used to check each element
	group = tokenize( selector, context, xml );
	for ( i = 0, len = group.length; i < len; i++ ) {
		group[i] = matcherFromTokens(group[i], context, xml);
	}

	// Cache the compiled function
	cached = compilerCache( selector, matcherFromGroupMatchers(group) );
	cached.context = context;
	cached.runs = cached.dirruns = 0;
	return cached;
};

function multipleContexts( selector, contexts, results, seed ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results, seed );
	}
}

function handlePOSGroup( selector, posfilter, argument, contexts, seed, not ) {
	var results,
		fn = Expr.setFilters[ posfilter.toLowerCase() ];

	if ( !fn ) {
		Sizzle.error( posfilter );
	}

	if ( selector || !(results = seed) ) {
		multipleContexts( selector || "*", contexts, (results = []), seed );
	}

	return results.length > 0 ? fn( results, argument, not ) : [];
}

function handlePOS( groups, context, results, seed ) {
	var group, part, j, groupLen, token, selector,
		anchor, elements, match, matched,
		lastIndex, currentContexts, not,
		i = 0,
		len = groups.length,
		rpos = matchExpr["POS"],
		// This is generated here in case matchExpr["POS"] is extended
		rposgroups = new RegExp( "^" + rpos.source + "(?!" + whitespace + ")", "i" ),
		// This is for making sure non-participating
		// matching groups are represented cross-browser (IE6-8)
		setUndefined = function() {
			var i = 1,
				len = arguments.length - 2;
			for ( ; i < len; i++ ) {
				if ( arguments[i] === undefined ) {
					match[i] = undefined;
				}
			}
		};

	for ( ; i < len; i++ ) {
		group = groups[i];
		part = "";
		elements = seed;
		for ( j = 0, groupLen = group.length; j < groupLen; j++ ) {
			token = group[j];
			selector = token.string;
			if ( token.part === "PSEUDO" ) {
				// Reset regex index to 0
				rpos.exec("");
				anchor = 0;
				while ( (match = rpos.exec( selector )) ) {
					matched = true;
					lastIndex = rpos.lastIndex = match.index + match[0].length;
					if ( lastIndex > anchor ) {
						part += selector.slice( anchor, match.index );
						anchor = lastIndex;
						currentContexts = [ context ];

						if ( rcombinators.test(part) ) {
							if ( elements ) {
								currentContexts = elements;
							}
							elements = seed;
						}

						if ( (not = rendsWithNot.test( part )) ) {
							part = part.slice( 0, -5 ).replace( rcombinators, "$&*" );
							anchor++;
						}

						if ( match.length > 1 ) {
							match[0].replace( rposgroups, setUndefined );
						}
						elements = handlePOSGroup( part, match[1], match[2], currentContexts, elements, not );
					}
					part = "";
				}

			}

			if ( !matched ) {
				part += selector;
			}
			matched = false;
		}

		if ( part ) {
			if ( rcombinators.test(part) ) {
				multipleContexts( part, elements || [ context ], results, seed );
			} else {
				Sizzle( part, context, results, seed ? seed.concat(elements) : elements );
			}
		} else {
			push.apply( results, elements );
		}
	}

	// Do not sort if this is a single filter
	return len === 1 ? results : Sizzle.uniqueSort( results );
}

function select( selector, context, results, seed, xml ) {
	// Remove excessive whitespace
	selector = selector.replace( rtrim, "$1" );
	var elements, matcher, cached, elem,
		i, tokens, token, lastToken, findContext, type,
		match = tokenize( selector, context, xml ),
		contextNodeType = context.nodeType;

	// POS handling
	if ( matchExpr["POS"].test(selector) ) {
		return handlePOS( match, context, results, seed );
	}

	if ( seed ) {
		elements = slice.call( seed, 0 );

	// To maintain document order, only narrow the
	// set if there is one group
	} else if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		if ( (tokens = slice.call( match[0], 0 )).length > 2 &&
				(token = tokens[0]).part === "ID" &&
				contextNodeType === 9 && !xml &&
				Expr.relative[ tokens[1].part ] ) {

			context = Expr.find["ID"]( token.captures[0].replace( rbackslash, "" ), context, xml )[0];
			if ( !context ) {
				return results;
			}

			selector = selector.slice( tokens.shift().string.length );
		}

		findContext = ( (match = rsibling.exec( tokens[0].string )) && !match.index && context.parentNode ) || context;

		// Reduce the set if possible
		lastToken = "";
		for ( i = tokens.length - 1; i >= 0; i-- ) {
			token = tokens[i];
			type = token.part;
			lastToken = token.string + lastToken;
			if ( Expr.relative[ type ] ) {
				break;
			}
			if ( Expr.order.test(type) ) {
				elements = Expr.find[ type ]( token.captures[0].replace( rbackslash, "" ), findContext, xml );
				if ( elements == null ) {
					continue;
				} else {
					selector = selector.slice( 0, selector.length - lastToken.length ) +
						lastToken.replace( matchExpr[ type ], "" );

					if ( !selector ) {
						push.apply( results, slice.call(elements, 0) );
					}

					break;
				}
			}
		}
	}

	// Only loop over the given elements once
	if ( selector ) {
		matcher = compile( selector, context, xml );
		dirruns = matcher.dirruns++;
		if ( elements == null ) {
			elements = Expr.find["TAG"]( "*", (rsibling.test( selector ) && context.parentNode) || context );
		}

		for ( i = 0; (elem = elements[i]); i++ ) {
			cachedruns = matcher.runs++;
			if ( matcher(elem) ) {
				results.push( elem );
			}
		}
	}

	return results;
}

if ( document.querySelectorAll ) {
	(function() {
		var disconnectedMatch,
			oldSelect = select,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

			// qSa(:focus) reports false when true (Chrome 21),
			// A support test would require too much code (would include document ready)
			rbuggyQSA = [":focus"],

			// matchesSelector(:focus) reports false when true (Chrome 21),
			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			// A support test would require too much code (would include document ready)
			// just skip matchesSelector for :active
			rbuggyMatches = [ ":active", ":focus" ],
			matches = docElem.matchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.webkitMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector;

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here (do not put tests after this one)
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE9 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<p test=''></p>";
			if ( div.querySelectorAll("[test^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here (do not put tests after this one)
			div.innerHTML = "<input type='hidden'/>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		});

		// rbuggyQSA always contains :focus, so no need for a length check
		rbuggyQSA = /* rbuggyQSA.length && */ new RegExp( rbuggyQSA.join("|") );

		select = function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				if ( context.nodeType === 9 ) {
					try {
						push.apply( results, slice.call(context.querySelectorAll( selector ), 0) );
						return results;
					} catch(qsaError) {}
				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var groups, i, len,
						old = context.getAttribute("id"),
						nid = old || expando,
						newContext = rsibling.test( selector ) && context.parentNode || context;

					if ( old ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}

					groups = tokenize(selector, context, xml);
					// Trailing space is unnecessary
					// There is always a context check
					nid = "[id='" + nid + "']";
					for ( i = 0, len = groups.length; i < len; i++ ) {
						groups[i] = nid + groups[i].selector;
					}
					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							groups.join(",")
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		};

		if ( matches ) {
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				try {
					matches.call( div, "[test!='']:sizzle" );
					rbuggyMatches.push( matchExpr["PSEUDO"].source, matchExpr["POS"].source, "!=" );
				} catch ( e ) {}
			});

			// rbuggyMatches always contains :active and :focus, so no need for a length check
			rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

			Sizzle.matchesSelector = function( elem, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				// rbuggyMatches always contains :active, so no need for an existence check
				if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && (!rbuggyQSA || !rbuggyQSA.test( expr )) ) {
					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
								elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch(e) {}
				}

				return Sizzle( expr, null, null, [ elem ] ).length > 0;
			};
		}
	})();
}

// Deprecated
Expr.setFilters["nth"] = Expr.setFilters["eq"];

// Back-compat
Expr.filters = Expr.pseudos;

// EXPOSE
if ( typeof define === "function" && define.amd ) {
	define(function() { return Sizzle; });
} else {
	window.Sizzle = Sizzle;
}
// EXPOSE

})( window );
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {

        var T, A, k;

        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }

        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (thisArg) {
            T = thisArg;
        }

        // 6. Let A be a new array created as if by the expression new Array(len) where Array is
        // the standard built-in constructor with that name and len is the value of len.
        A = new Array(len);

        // 7. Let k be 0
        k = 0;

        // 8. Repeat, while k < len
        while(k < len) {

            var kValue, mappedValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[ k ];

                // ii. Let mappedValue be the result of calling the Call internal method of callback
                // with T as the this value and argument list containing kValue, k, and O.
                mappedValue = callback.call(T, kValue, k, O);

                // iii. Call the DefineOwnProperty internal method of A with arguments
                // Pk, Property Descriptor {Value: mappedValue, Writable: true, Enumerable: true, Configurable: true},
                // and false.

                // In browsers that support Object.defineProperty, use the following:
                // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

                // For best browser support, use the following:
                A[ k ] = mappedValue;
            }
            // d. Increase k by 1.
            k++;
        }

        // 9. return A
        return A;
    };
}

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if ( !Array.prototype.forEach ) {

    Array.prototype.forEach = function( callback, thisArg ) {

        var T, k;

        if ( this == null ) {
            throw new TypeError( " this is null or not defined" );
        }

        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if ( {}.toString.call(callback) != "[object Function]" ) {
            throw new TypeError( callback + " is not a function" );
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if ( thisArg ) {
            T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while( k < len ) {

            var kValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if ( k in O ) {

                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[ k ];

                // ii. Call the Call internal method of callback with T as the this value and
                // argument list containing kValue, k, and O.
                callback.call( T, kValue, k, O );
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
if (!Array.prototype.filter)
{
    Array.prototype.filter = function(fun /*, thisp */)
    {
        "use strict";

        if (this == null) {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in t)
            {
                var val = t[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
}


window.CSSStyleDeclaration = window.CSSStyleDeclaration || function() { };

// https://github.com/mbostock/d3/issues/199#issuecomment-1487129
if (!CSSStyleDeclaration.prototype.getProperty) {
    CSSStyleDeclaration.prototype.getProperty = function(a) {
        return this.getAttribute(a);
    };
}

if(!CSSStyleDeclaration.prototype.setProperty) {
    CSSStyleDeclaration.prototype.setProperty = function(a,b) {
        return this.setAttribute(a,b);
    };
}

if(!CSSStyleDeclaration.prototype.removeProperty) {
    CSSStyleDeclaration.prototype.removeProperty = function(a) {
        return this.removeAttribute(a);
    };
}


// https://github.com/mbostock/d3/issues/42#issuecomment-1265410
if(!document.createElementNS) {
    document.createElementNS = function(ns, name) {
        return document.createElement(name);
    };
}

if (!window.JSON) {
    window.JSON = {};
}
if (!window.JSON.parse) {
    window.JSON.parse = (function() {
       var rvalidchars = /^[\],:{}\s]*$/,
           rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
           rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
           rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g;
       return function(data) {
            if ( rvalidchars.test( data.replace( rvalidescape, "@" )
                .replace( rvalidtokens, "]" )
                .replace( rvalidbraces, "")) )
            {
                return ( new Function( "return " + data ) )();
            }
            
            return null; // Invalid JSON
        };
    })();
}
(function(){if (!Date.now) Date.now = function() {
  return +new Date;
};
try {
  document.createElement("div").style.setProperty("opacity", 0, "");
} catch (error) {
  var d3_style_prototype = CSSStyleDeclaration.prototype,
      d3_style_setProperty = d3_style_prototype.setProperty;
  d3_style_prototype.setProperty = function(name, value, priority) {
    d3_style_setProperty.call(this, name, value + "", priority);
  };
}
d3 = {version: "2.10.1"}; // semver
function d3_class(ctor, properties) {
  try {
    for (var key in properties) {
      Object.defineProperty(ctor.prototype, key, {
        value: properties[key],
        enumerable: false
      });
    }
  } catch (e) {
    ctor.prototype = properties;
  }
}
var d3_array = d3_arraySlice; // conversion for NodeLists

function d3_arrayCopy(pseudoarray) {
  var i = -1, n = pseudoarray.length, array = [];
  while (++i < n) array.push(pseudoarray[i]);
  return array;
}

function d3_arraySlice(pseudoarray) {
  return Array.prototype.slice.call(pseudoarray);
}

try {
  d3_array(document.documentElement.childNodes)[0].nodeType;
} catch(e) {
  d3_array = d3_arrayCopy;
}

var d3_arraySubclass = [].__proto__?

// Until ECMAScript supports array subclassing, prototype injection works well.
function(array, prototype) {
  array.__proto__ = prototype;
}:

// And if your browser doesn't support __proto__, we'll use direct extension.
function(array, prototype) {
  for (var property in prototype) array[property] = prototype[property];
};
d3.map = function(object) {
  var map = new d3_Map;
  for (var key in object) map.set(key, object[key]);
  return map;
};

function d3_Map() {}

d3_class(d3_Map, {
  has: function(key) {
    return d3_map_prefix + key in this;
  },
  get: function(key) {
    return this[d3_map_prefix + key];
  },
  set: function(key, value) {
    return this[d3_map_prefix + key] = value;
  },
  remove: function(key) {
    key = d3_map_prefix + key;
    return key in this && delete this[key];
  },
  keys: function() {
    var keys = [];
    this.forEach(function(key) { keys.push(key); });
    return keys;
  },
  values: function() {
    var values = [];
    this.forEach(function(key, value) { values.push(value); });
    return values;
  },
  entries: function() {
    var entries = [];
    this.forEach(function(key, value) { entries.push({key: key, value: value}); });
    return entries;
  },
  forEach: function(f) {
    for (var key in this) {
      if (key.charCodeAt(0) === d3_map_prefixCode) {
        f.call(this, key.substring(1), this[key]);
      }
    }
  }
});

var d3_map_prefix = "\0", // prevent collision with built-ins
    d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
function d3_identity(d) {
  return d;
}
function d3_this() {
  return this;
}
function d3_true() {
  return true;
}
function d3_functor(v) {
  return typeof v === "function" ? v : function() { return v; };
}

d3.functor = d3_functor;
// Copies a variable number of methods from source to target.
d3.rebind = function(target, source) {
  var i = 1, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
  return target;
};

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3_rebind(target, source, method) {
  return function() {
    var value = method.apply(source, arguments);
    return arguments.length ? target : value;
  };
}
d3.ascending = function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
};
d3.descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};
d3.mean = function(array, f) {
  var n = array.length,
      a,
      m = 0,
      i = -1,
      j = 0;
  if (arguments.length === 1) {
    while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
  } else {
    while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
  }
  return j ? m : undefined;
};
d3.median = function(array, f) {
  if (arguments.length > 1) array = array.map(f);
  array = array.filter(d3_number);
  return array.length ? d3.quantile(array.sort(d3.ascending), .5) : undefined;
};
d3.min = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;
  if (arguments.length === 1) {
    while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && a > b) a = b;
  } else {
    while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
  }
  return a;
};
d3.max = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;
  if (arguments.length === 1) {
    while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && b > a) a = b;
  } else {
    while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
  }
  return a;
};
d3.extent = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b,
      c;
  if (arguments.length === 1) {
    while (++i < n && ((a = c = array[i]) == null || a != a)) a = c = undefined;
    while (++i < n) if ((b = array[i]) != null) {
      if (a > b) a = b;
      if (c < b) c = b;
    }
  } else {
    while (++i < n && ((a = c = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
      if (a > b) a = b;
      if (c < b) c = b;
    }
  }
  return [a, c];
};
d3.random = {
  normal: function(µ, σ) {
    var n = arguments.length;
    if (n < 2) σ = 1;
    if (n < 1) µ = 0;
    return function() {
      var x, y, r;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);
      return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
    };
  },
  logNormal: function(µ, σ) {
    var n = arguments.length;
    if (n < 2) σ = 1;
    if (n < 1) µ = 0;
    var random = d3.random.normal();
    return function() {
      return Math.exp(µ + σ * random());
    };
  },
  irwinHall: function(m) {
    return function() {
      for (var s = 0, j = 0; j < m; j++) s += Math.random();
      return s / m;
    };
  }
};
function d3_number(x) {
  return x != null && !isNaN(x);
}
d3.sum = function(array, f) {
  var s = 0,
      n = array.length,
      a,
      i = -1;

  if (arguments.length === 1) {
    while (++i < n) if (!isNaN(a = +array[i])) s += a;
  } else {
    while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
  }

  return s;
};
// R-7 per <http://en.wikipedia.org/wiki/Quantile>
d3.quantile = function(values, p) {
  var H = (values.length - 1) * p + 1,
      h = Math.floor(H),
      v = values[h - 1],
      e = H - h;
  return e ? v + e * (values[h] - v) : v;
};
d3.transpose = function(matrix) {
  return d3.zip.apply(d3, matrix);
};
d3.zip = function() {
  if (!(n = arguments.length)) return [];
  for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m;) {
    for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n;) {
      zip[j] = arguments[j][i];
    }
  }
  return zips;
};

function d3_zipLength(d) {
  return d.length;
}
d3.bisector = function(f) {
  return {
    left: function(a, x, lo, hi) {
      if (arguments.length < 3) lo = 0;
      if (arguments.length < 4) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (f.call(a, a[mid], mid) < x) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (arguments.length < 3) lo = 0;
      if (arguments.length < 4) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (x < f.call(a, a[mid], mid)) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
};

var d3_bisector = d3.bisector(function(d) { return d; });
d3.bisectLeft = d3_bisector.left;
d3.bisect = d3.bisectRight = d3_bisector.right;
d3.first = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length === 1) f = d3.ascending;
  while (++i < n) {
    if (f.call(array, a, b = array[i]) > 0) {
      a = b;
    }
  }
  return a;
};
d3.last = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length === 1) f = d3.ascending;
  while (++i < n) {
    if (f.call(array, a, b = array[i]) <= 0) {
      a = b;
    }
  }
  return a;
};
d3.nest = function() {
  var nest = {},
      keys = [],
      sortKeys = [],
      sortValues,
      rollup;

  function map(array, depth) {
    if (depth >= keys.length) return rollup
        ? rollup.call(nest, array) : (sortValues
        ? array.sort(sortValues)
        : array);

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        object,
        valuesByKey = new d3_Map,
        values,
        o = {};

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
        values.push(object);
      } else {
        valuesByKey.set(keyValue, [object]);
      }
    }

    valuesByKey.forEach(function(keyValue, values) {
      o[keyValue] = map(values, depth);
    });

    return o;
  }

  function entries(map, depth) {
    if (depth >= keys.length) return map;

    var a = [],
        sortKey = sortKeys[depth++],
        key;

    for (key in map) {
      a.push({key: key, values: entries(map[key], depth)});
    }

    if (sortKey) a.sort(function(a, b) {
      return sortKey(a.key, b.key);
    });

    return a;
  }

  nest.map = function(array) {
    return map(array, 0);
  };

  nest.entries = function(array) {
    return entries(map(array, 0), 0);
  };

  nest.key = function(d) {
    keys.push(d);
    return nest;
  };

  // Specifies the order for the most-recently specified key.
  // Note: only applies to entries. Map keys are unordered!
  nest.sortKeys = function(order) {
    sortKeys[keys.length - 1] = order;
    return nest;
  };

  // Specifies the order for leaf values.
  // Applies to both maps and entries array.
  nest.sortValues = function(order) {
    sortValues = order;
    return nest;
  };

  nest.rollup = function(f) {
    rollup = f;
    return nest;
  };

  return nest;
};
d3.keys = function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
};
d3.values = function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
};
d3.entries = function(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};
d3.permute = function(array, indexes) {
  var permutes = [],
      i = -1,
      n = indexes.length;
  while (++i < n) permutes[i] = array[indexes[i]];
  return permutes;
};
d3.merge = function(arrays) {
  return Array.prototype.concat.apply([], arrays);
};
d3.split = function(array, f) {
  var arrays = [],
      values = [],
      value,
      i = -1,
      n = array.length;
  if (arguments.length < 2) f = d3_splitter;
  while (++i < n) {
    if (f.call(values, value = array[i], i)) {
      values = [];
    } else {
      if (!values.length) arrays.push(values);
      values.push(value);
    }
  }
  return arrays;
};

function d3_splitter(d) {
  return d == null;
}
function d3_collapse(s) {
  return s.trim().replace(/\s+/g, " ");
}
d3.range = function(start, stop, step) {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step === Infinity) throw new Error("infinite range");
  var range = [],
       k = d3_range_integerScale(Math.abs(step)),
       i = -1,
       j;
  start *= k, stop *= k, step *= k;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k);
  else while ((j = start + step * ++i) < stop) range.push(j / k);
  return range;
};

function d3_range_integerScale(x) {
  var k = 1;
  while (x * k % 1) k *= 10;
  return k;
}
d3.requote = function(s) {
  return s.replace(d3_requote_re, "\\$&");
};

var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
d3.round = function(x, n) {
  return n
      ? Math.round(x * (n = Math.pow(10, n))) / n
      : Math.round(x);
};
d3.xhr = function(url, mime, callback) {
  var req = new XMLHttpRequest;
  if (arguments.length < 3) callback = mime, mime = null;
  else if (mime && req.overrideMimeType) req.overrideMimeType(mime);
  req.open("GET", url, true);
  if (mime) req.setRequestHeader("Accept", mime);
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      var s = req.status;
      callback(!s && req.response || s >= 200 && s < 300 || s === 304 ? req : null);
    }
  };
  req.send(null);
};
d3.text = function(url, mime, callback) {
  function ready(req) {
    callback(req && req.responseText);
  }
  if (arguments.length < 3) {
    callback = mime;
    mime = null;
  }
  d3.xhr(url, mime, ready);
};
d3.json = function(url, callback) {
  d3.text(url, "application/json", function(text) {
    callback(text ? JSON.parse(text) : null);
  });
};
d3.html = function(url, callback) {
  d3.text(url, "text/html", function(text) {
    if (text != null) { // Treat empty string as valid HTML.
      var range = document.createRange();
      range.selectNode(document.body);
      text = range.createContextualFragment(text);
    }
    callback(text);
  });
};
d3.xml = function(url, mime, callback) {
  function ready(req) {
    callback(req && req.responseXML);
  }
  if (arguments.length < 3) {
    callback = mime;
    mime = null;
  }
  d3.xhr(url, mime, ready);
};
var d3_nsPrefix = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

d3.ns = {
  prefix: d3_nsPrefix,
  qualify: function(name) {
    var i = name.indexOf(":"),
        prefix = name;
    if (i >= 0) {
      prefix = name.substring(0, i);
      name = name.substring(i + 1);
    }
    return d3_nsPrefix.hasOwnProperty(prefix)
        ? {space: d3_nsPrefix[prefix], local: name}
        : name;
  }
};
d3.dispatch = function() {
  var dispatch = new d3_dispatch,
      i = -1,
      n = arguments.length;
  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
  return dispatch;
};

function d3_dispatch() {}

d3_dispatch.prototype.on = function(type, listener) {
  var i = type.indexOf("."),
      name = "";

  // Extract optional namespace, e.g., "click.foo"
  if (i > 0) {
    name = type.substring(i + 1);
    type = type.substring(0, i);
  }

  return arguments.length < 2
      ? this[type].on(name)
      : this[type].on(name, listener);
};

function d3_dispatch_event(dispatch) {
  var listeners = [],
      listenerByName = new d3_Map;

  function event() {
    var z = listeners, // defensive reference
        i = -1,
        n = z.length,
        l;
    while (++i < n) if (l = z[i].on) l.apply(this, arguments);
    return dispatch;
  }

  event.on = function(name, listener) {
    var l = listenerByName.get(name),
        i;

    // return the current listener, if any
    if (arguments.length < 2) return l && l.on;

    // remove the old listener, if any (with copy-on-write)
    if (l) {
      l.on = null;
      listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
      listenerByName.remove(name);
    }

    // add the new listener, if any
    if (listener) listeners.push(listenerByName.set(name, {on: listener}));

    return dispatch;
  };

  return event;
}
// TODO align
d3.format = function(specifier) {
  var match = d3_format_re.exec(specifier),
      fill = match[1] || " ",
      sign = match[3] || "",
      zfill = match[5],
      width = +match[6],
      comma = match[7],
      precision = match[8],
      type = match[9],
      scale = 1,
      suffix = "",
      integer = false;

  if (precision) precision = +precision.substring(1);

  if (zfill) {
    fill = "0"; // TODO align = "=";
    if (comma) width -= Math.floor((width - 1) / 4);
  }

  switch (type) {
    case "n": comma = true; type = "g"; break;
    case "%": scale = 100; suffix = "%"; type = "f"; break;
    case "p": scale = 100; suffix = "%"; type = "r"; break;
    case "d": integer = true; precision = 0; break;
    case "s": scale = -1; type = "r"; break;
  }

  // If no precision is specified for r, fallback to general notation.
  if (type == "r" && !precision) type = "g";

  type = d3_format_types.get(type) || d3_format_typeDefault;

  return function(value) {

    // Return the empty string for floats formatted as ints.
    if (integer && (value % 1)) return "";

    // Convert negative to positive, and record the sign prefix.
    var negative = value < 0 && (value = -value) ? "-" : sign;

    // Apply the scale, computing it from the value's exponent for si format.
    if (scale < 0) {
      var prefix = d3.formatPrefix(value, precision);
      value = prefix.scale(value);
      suffix = prefix.symbol;
    } else {
      value *= scale;
    }

    // Convert to the desired precision.
    value = type(value, precision);

    // If the fill character is 0, the sign and group is applied after the fill.
    if (zfill) {
      var length = value.length + negative.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
      if (comma) value = d3_format_group(value);
      value = negative + value;
    }

    // Otherwise (e.g., space-filling), the sign and group is applied before.
    else {
      if (comma) value = d3_format_group(value);
      value = negative + value;
      var length = value.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
    }

    return value + suffix;
  };
};

// [[fill]align][sign][#][0][width][,][.precision][type]
var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;

var d3_format_types = d3.map({
  g: function(x, p) { return x.toPrecision(p); },
  e: function(x, p) { return x.toExponential(p); },
  f: function(x, p) { return x.toFixed(p); },
  r: function(x, p) { return d3.round(x, p = d3_format_precision(x, p)).toFixed(Math.max(0, Math.min(20, p))); }
});

function d3_format_precision(x, p) {
  return p - (x ? 1 + Math.floor(Math.log(x + Math.pow(10, 1 + Math.floor(Math.log(x) / Math.LN10) - p)) / Math.LN10) : 1);
}

function d3_format_typeDefault(x) {
  return x + "";
}

// Apply comma grouping for thousands.
function d3_format_group(value) {
  var i = value.lastIndexOf("."),
      f = i >= 0 ? value.substring(i) : (i = value.length, ""),
      t = [];
  while (i > 0) t.push(value.substring(i -= 3, i + 3));
  return t.reverse().join(",") + f;
}
var d3_formatPrefixes = ["y","z","a","f","p","n","μ","m","","k","M","G","T","P","E","Z","Y"].map(d3_formatPrefix);

d3.formatPrefix = function(value, precision) {
  var i = 0;
  if (value) {
    if (value < 0) value *= -1;
    if (precision) value = d3.round(value, d3_format_precision(value, precision));
    i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
    i = Math.max(-24, Math.min(24, Math.floor((i <= 0 ? i + 1 : i - 1) / 3) * 3));
  }
  return d3_formatPrefixes[8 + i / 3];
};

function d3_formatPrefix(d, i) {
  var k = Math.pow(10, Math.abs(8 - i) * 3);
  return {
    scale: i > 8 ? function(d) { return d / k; } : function(d) { return d * k; },
    symbol: d
  };
}
/*
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the author nor the names of contributors may be used to
 *   endorse or promote products derived from this software without specific
 *   prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var d3_ease_quad = d3_ease_poly(2),
    d3_ease_cubic = d3_ease_poly(3),
    d3_ease_default = function() { return d3_ease_identity; };

var d3_ease = d3.map({
  linear: d3_ease_default,
  poly: d3_ease_poly,
  quad: function() { return d3_ease_quad; },
  cubic: function() { return d3_ease_cubic; },
  sin: function() { return d3_ease_sin; },
  exp: function() { return d3_ease_exp; },
  circle: function() { return d3_ease_circle; },
  elastic: d3_ease_elastic,
  back: d3_ease_back,
  bounce: function() { return d3_ease_bounce; }
});

var d3_ease_mode = d3.map({
  "in": d3_ease_identity,
  "out": d3_ease_reverse,
  "in-out": d3_ease_reflect,
  "out-in": function(f) { return d3_ease_reflect(d3_ease_reverse(f)); }
});

d3.ease = function(name) {
  var i = name.indexOf("-"),
      t = i >= 0 ? name.substring(0, i) : name,
      m = i >= 0 ? name.substring(i + 1) : "in";
  t = d3_ease.get(t) || d3_ease_default;
  m = d3_ease_mode.get(m) || d3_ease_identity;
  return d3_ease_clamp(m(t.apply(null, Array.prototype.slice.call(arguments, 1))));
};

function d3_ease_clamp(f) {
  return function(t) {
    return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
  };
}

function d3_ease_reverse(f) {
  return function(t) {
    return 1 - f(1 - t);
  };
}

function d3_ease_reflect(f) {
  return function(t) {
    return .5 * (t < .5 ? f(2 * t) : (2 - f(2 - 2 * t)));
  };
}

function d3_ease_identity(t) {
  return t;
}

function d3_ease_poly(e) {
  return function(t) {
    return Math.pow(t, e);
  };
}

function d3_ease_sin(t) {
  return 1 - Math.cos(t * Math.PI / 2);
}

function d3_ease_exp(t) {
  return Math.pow(2, 10 * (t - 1));
}

function d3_ease_circle(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function d3_ease_elastic(a, p) {
  var s;
  if (arguments.length < 2) p = 0.45;
  if (arguments.length < 1) { a = 1; s = p / 4; }
  else s = p / (2 * Math.PI) * Math.asin(1 / a);
  return function(t) {
    return 1 + a * Math.pow(2, 10 * -t) * Math.sin((t - s) * 2 * Math.PI / p);
  };
}

function d3_ease_back(s) {
  if (!s) s = 1.70158;
  return function(t) {
    return t * t * ((s + 1) * t - s);
  };
}

function d3_ease_bounce(t) {
  return t < 1 / 2.75 ? 7.5625 * t * t
      : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75
      : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375
      : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
}
d3.event = null;

function d3_eventCancel() {
  d3.event.stopPropagation();
  d3.event.preventDefault();
}

function d3_eventSource() {
  var e = d3.event, s;
  while (s = e.sourceEvent) e = s;
  return e;
}

// Like d3.dispatch, but for custom events abstracting native UI events. These
// events have a target component (such as a brush), a target element (such as
// the svg:g element containing the brush) and the standard arguments `d` (the
// target element's data) and `i` (the selection index of the target element).
function d3_eventDispatch(target) {
  var dispatch = new d3_dispatch,
      i = 0,
      n = arguments.length;

  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);

  // Creates a dispatch context for the specified `thiz` (typically, the target
  // DOM element that received the source event) and `argumentz` (typically, the
  // data `d` and index `i` of the target element). The returned function can be
  // used to dispatch an event to any registered listeners; the function takes a
  // single argument as input, being the event to dispatch. The event must have
  // a "type" attribute which corresponds to a type registered in the
  // constructor. This context will automatically populate the "sourceEvent" and
  // "target" attributes of the event, as well as setting the `d3.event` global
  // for the duration of the notification.
  dispatch.of = function(thiz, argumentz) {
    return function(e1) {
      try {
        var e0 =
        e1.sourceEvent = d3.event;
        e1.target = target;
        d3.event = e1;
        dispatch[e1.type].apply(thiz, argumentz);
      } finally {
        d3.event = e0;
      }
    };
  };

  return dispatch;
}
d3.interpolate = function(a, b) {
  var i = d3.interpolators.length, f;
  while (--i >= 0 && !(f = d3.interpolators[i](a, b)));
  return f;
};

d3.interpolateNumber = function(a, b) {
  b -= a;
  return function(t) { return a + b * t; };
};

d3.interpolateRound = function(a, b) {
  b -= a;
  return function(t) { return Math.round(a + b * t); };
};

d3.interpolateString = function(a, b) {
  var m, // current match
      i, // current index
      j, // current index (for coalescing)
      s0 = 0, // start index of current string prefix
      s1 = 0, // end index of current string prefix
      s = [], // string constants and placeholders
      q = [], // number interpolators
      n, // q.length
      o;

  // Reset our regular expression!
  d3_interpolate_number.lastIndex = 0;

  // Find all numbers in b.
  for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
    if (m.index) s.push(b.substring(s0, s1 = m.index));
    q.push({i: s.length, x: m[0]});
    s.push(null);
    s0 = d3_interpolate_number.lastIndex;
  }
  if (s0 < b.length) s.push(b.substring(s0));

  // Find all numbers in a.
  for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
    o = q[i];
    if (o.x == m[0]) { // The numbers match, so coalesce.
      if (o.i) {
        if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i - 1] += o.x;
          s.splice(o.i, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        } else { // This match is followed by a string, so coalesce twice.
          s[o.i - 1] += o.x + s[o.i + 1];
          s.splice(o.i, 2);
          for (j = i + 1; j < n; ++j) q[j].i -= 2;
        }
      } else {
          if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i] = o.x;
        } else { // This match is followed by a string, so coalesce twice.
          s[o.i] = o.x + s[o.i + 1];
          s.splice(o.i + 1, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        }
      }
      q.splice(i, 1);
      n--;
      i--;
    } else {
      o.x = d3.interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
    }
  }

  // Remove any numbers in b not found in a.
  while (i < n) {
    o = q.pop();
    if (s[o.i + 1] == null) { // This match is followed by another number.
      s[o.i] = o.x;
    } else { // This match is followed by a string, so coalesce twice.
      s[o.i] = o.x + s[o.i + 1];
      s.splice(o.i + 1, 1);
    }
    n--;
  }

  // Special optimization for only a single match.
  if (s.length === 1) {
    return s[0] == null ? q[0].x : function() { return b; };
  }

  // Otherwise, interpolate each of the numbers and rejoin the string.
  return function(t) {
    for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
};

d3.interpolateTransform = function(a, b) {
  var s = [], // string constants and placeholders
      q = [], // number interpolators
      n,
      A = d3.transform(a),
      B = d3.transform(b),
      ta = A.translate,
      tb = B.translate,
      ra = A.rotate,
      rb = B.rotate,
      wa = A.skew,
      wb = B.skew,
      ka = A.scale,
      kb = B.scale;

  if (ta[0] != tb[0] || ta[1] != tb[1]) {
    s.push("translate(", null, ",", null, ")");
    q.push({i: 1, x: d3.interpolateNumber(ta[0], tb[0])}, {i: 3, x: d3.interpolateNumber(ta[1], tb[1])});
  } else if (tb[0] || tb[1]) {
    s.push("translate(" + tb + ")");
  } else {
    s.push("");
  }

  if (ra != rb) {
    if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360; // shortest path
    q.push({i: s.push(s.pop() + "rotate(", null, ")") - 2, x: d3.interpolateNumber(ra, rb)});
  } else if (rb) {
    s.push(s.pop() + "rotate(" + rb + ")");
  }

  if (wa != wb) {
    q.push({i: s.push(s.pop() + "skewX(", null, ")") - 2, x: d3.interpolateNumber(wa, wb)});
  } else if (wb) {
    s.push(s.pop() + "skewX(" + wb + ")");
  }

  if (ka[0] != kb[0] || ka[1] != kb[1]) {
    n = s.push(s.pop() + "scale(", null, ",", null, ")");
    q.push({i: n - 4, x: d3.interpolateNumber(ka[0], kb[0])}, {i: n - 2, x: d3.interpolateNumber(ka[1], kb[1])});
  } else if (kb[0] != 1 || kb[1] != 1) {
    s.push(s.pop() + "scale(" + kb + ")");
  }

  n = q.length;
  return function(t) {
    var i = -1, o;
    while (++i < n) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
};

d3.interpolateRgb = function(a, b) {
  a = d3.rgb(a);
  b = d3.rgb(b);
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      br = b.r - ar,
      bg = b.g - ag,
      bb = b.b - ab;
  return function(t) {
    return "#"
        + d3_rgb_hex(Math.round(ar + br * t))
        + d3_rgb_hex(Math.round(ag + bg * t))
        + d3_rgb_hex(Math.round(ab + bb * t));
  };
};

// interpolates HSL space, but outputs RGB string (for compatibility)
d3.interpolateHsl = function(a, b) {
  a = d3.hsl(a);
  b = d3.hsl(b);
  var h0 = a.h,
      s0 = a.s,
      l0 = a.l,
      h1 = b.h - h0,
      s1 = b.s - s0,
      l1 = b.l - l0;
  if (h1 > 180) h1 -= 360; else if (h1 < -180) h1 += 360; // shortest path
  return function(t) {
    return d3_hsl_rgb(h0 + h1 * t, s0 + s1 * t, l0 + l1 * t) + "";
  };
};

d3.interpolateLab = function(a, b) {
  a = d3.lab(a);
  b = d3.lab(b);
  var al = a.l,
      aa = a.a,
      ab = a.b,
      bl = b.l - al,
      ba = b.a - aa,
      bb = b.b - ab;
  return function(t) {
    return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
  };
};

d3.interpolateHcl = function(a, b) {
  a = d3.hcl(a);
  b = d3.hcl(b);
  var ah = a.h,
      ac = a.c,
      al = a.l,
      bh = b.h - ah,
      bc = b.c - ac,
      bl = b.l - al;
  if (bh > 180) bh -= 360; else if (bh < -180) bh += 360; // shortest path
  return function(t) {
    return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
  };
};

d3.interpolateArray = function(a, b) {
  var x = [],
      c = [],
      na = a.length,
      nb = b.length,
      n0 = Math.min(a.length, b.length),
      i;
  for (i = 0; i < n0; ++i) x.push(d3.interpolate(a[i], b[i]));
  for (; i < na; ++i) c[i] = a[i];
  for (; i < nb; ++i) c[i] = b[i];
  return function(t) {
    for (i = 0; i < n0; ++i) c[i] = x[i](t);
    return c;
  };
};

d3.interpolateObject = function(a, b) {
  var i = {},
      c = {},
      k;
  for (k in a) {
    if (k in b) {
      i[k] = d3_interpolateByName(k)(a[k], b[k]);
    } else {
      c[k] = a[k];
    }
  }
  for (k in b) {
    if (!(k in a)) {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
};

var d3_interpolate_number = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;

function d3_interpolateByName(name) {
  return name == "transform"
      ? d3.interpolateTransform
      : d3.interpolate;
}

d3.interpolators = [
  d3.interpolateObject,
  function(a, b) { return b instanceof Array && d3.interpolateArray(a, b); },
  function(a, b) { return (typeof a === "string" || typeof b === "string") && d3.interpolateString(a + "", b + ""); },
  function(a, b) { return (typeof b === "string" ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) : b instanceof d3_Rgb || b instanceof d3_Hsl) && d3.interpolateRgb(a, b); },
  function(a, b) { return !isNaN(a = +a) && !isNaN(b = +b) && d3.interpolateNumber(a, b); }
];
function d3_uninterpolateNumber(a, b) {
  b = b - (a = +a) ? 1 / (b - a) : 0;
  return function(x) { return (x - a) * b; };
}

function d3_uninterpolateClamp(a, b) {
  b = b - (a = +a) ? 1 / (b - a) : 0;
  return function(x) { return Math.max(0, Math.min(1, (x - a) * b)); };
}
d3.rgb = function(r, g, b) {
  return arguments.length === 1
      ? (r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b)
      : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb))
      : d3_rgb(~~r, ~~g, ~~b);
};

function d3_rgb(r, g, b) {
  return new d3_Rgb(r, g, b);
}

function d3_Rgb(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

d3_Rgb.prototype.brighter = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  var r = this.r,
      g = this.g,
      b = this.b,
      i = 30;
  if (!r && !g && !b) return d3_rgb(i, i, i);
  if (r && r < i) r = i;
  if (g && g < i) g = i;
  if (b && b < i) b = i;
  return d3_rgb(
      Math.min(255, Math.floor(r / k)),
      Math.min(255, Math.floor(g / k)),
      Math.min(255, Math.floor(b / k)));
};

d3_Rgb.prototype.darker = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_rgb(
      Math.floor(k * this.r),
      Math.floor(k * this.g),
      Math.floor(k * this.b));
};

d3_Rgb.prototype.hsl = function() {
  return d3_rgb_hsl(this.r, this.g, this.b);
};

d3_Rgb.prototype.toString = function() {
  return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
};

function d3_rgb_hex(v) {
  return v < 0x10
      ? "0" + Math.max(0, v).toString(16)
      : Math.min(255, v).toString(16);
}

function d3_rgb_parse(format, rgb, hsl) {
  var r = 0, // red channel; int in [0, 255]
      g = 0, // green channel; int in [0, 255]
      b = 0, // blue channel; int in [0, 255]
      m1, // CSS color specification match
      m2, // CSS color specification type (e.g., rgb)
      name;

  /* Handle hsl, rgb. */
  m1 = /([a-z]+)\((.*)\)/i.exec(format);
  if (m1) {
    m2 = m1[2].split(",");
    switch (m1[1]) {
      case "hsl": {
        return hsl(
          parseFloat(m2[0]), // degrees
          parseFloat(m2[1]) / 100, // percentage
          parseFloat(m2[2]) / 100 // percentage
        );
      }
      case "rgb": {
        return rgb(
          d3_rgb_parseNumber(m2[0]),
          d3_rgb_parseNumber(m2[1]),
          d3_rgb_parseNumber(m2[2])
        );
      }
    }
  }

  /* Named colors. */
  if (name = d3_rgb_names.get(format)) return rgb(name.r, name.g, name.b);

  /* Hexadecimal colors: #rgb and #rrggbb. */
  if (format != null && format.charAt(0) === "#") {
    if (format.length === 4) {
      r = format.charAt(1); r += r;
      g = format.charAt(2); g += g;
      b = format.charAt(3); b += b;
    } else if (format.length === 7) {
      r = format.substring(1, 3);
      g = format.substring(3, 5);
      b = format.substring(5, 7);
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
  }

  return rgb(r, g, b);
}

function d3_rgb_hsl(r, g, b) {
  var min = Math.min(r /= 255, g /= 255, b /= 255),
      max = Math.max(r, g, b),
      d = max - min,
      h,
      s,
      l = (max + min) / 2;
  if (d) {
    s = l < .5 ? d / (max + min) : d / (2 - max - min);
    if (r == max) h = (g - b) / d + (g < b ? 6 : 0);
    else if (g == max) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  } else {
    s = h = 0;
  }
  return d3_hsl(h, s, l);
}

function d3_rgb_lab(r, g, b) {
  r = d3_rgb_xyz(r);
  g = d3_rgb_xyz(g);
  b = d3_rgb_xyz(b);
  var x = d3_xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / d3_lab_X),
      y = d3_xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / d3_lab_Y),
      z = d3_xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / d3_lab_Z);
  return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
}

function d3_rgb_xyz(r) {
  return (r /= 255) <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
}

function d3_rgb_parseNumber(c) { // either integer or percentage
  var f = parseFloat(c);
  return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
}

var d3_rgb_names = d3.map({
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
});

d3_rgb_names.forEach(function(key, value) {
  d3_rgb_names.set(key, d3_rgb_parse(value, d3_rgb, d3_hsl_rgb));
});
d3.hsl = function(h, s, l) {
  return arguments.length === 1
      ? (h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l)
      : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl))
      : d3_hsl(+h, +s, +l);
};

function d3_hsl(h, s, l) {
  return new d3_Hsl(h, s, l);
}

function d3_Hsl(h, s, l) {
  this.h = h;
  this.s = s;
  this.l = l;
}

d3_Hsl.prototype.brighter = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_hsl(this.h, this.s, this.l / k);
};

d3_Hsl.prototype.darker = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_hsl(this.h, this.s, k * this.l);
};

d3_Hsl.prototype.rgb = function() {
  return d3_hsl_rgb(this.h, this.s, this.l);
};

d3_Hsl.prototype.toString = function() {
  return this.rgb().toString();
};

function d3_hsl_rgb(h, s, l) {
  var m1,
      m2;

  /* Some simple corrections for h, s and l. */
  h = h % 360; if (h < 0) h += 360;
  s = s < 0 ? 0 : s > 1 ? 1 : s;
  l = l < 0 ? 0 : l > 1 ? 1 : l;

  /* From FvD 13.37, CSS Color Module Level 3 */
  m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
  m1 = 2 * l - m2;

  function v(h) {
    if (h > 360) h -= 360;
    else if (h < 0) h += 360;
    if (h < 60) return m1 + (m2 - m1) * h / 60;
    if (h < 180) return m2;
    if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
    return m1;
  }

  function vv(h) {
    return Math.round(v(h) * 255);
  }

  return d3_rgb(vv(h + 120), vv(h), vv(h - 120));
}
d3.hcl = function(h, c, l) {
  return arguments.length === 1
      ? (h instanceof d3_Hcl ? d3_hcl(h.h, h.c, h.l)
      : (h instanceof d3_Lab ? d3_lab_hcl(h.l, h.a, h.b)
      : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b)))
      : d3_hcl(+h, +c, +l);
};

function d3_hcl(h, c, l) {
  return new d3_Hcl(h, c, l);
}

function d3_Hcl(h, c, l) {
  this.h = h;
  this.c = c;
  this.l = l;
}

d3_Hcl.prototype.brighter = function(k) {
  return d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
};

d3_Hcl.prototype.darker = function(k) {
  return d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
};

d3_Hcl.prototype.rgb = function() {
  return d3_hcl_lab(this.h, this.c, this.l).rgb();
};

d3_Hcl.prototype.toString = function() {
  return this.rgb() + "";
};

function d3_hcl_lab(h, c, l) {
  return d3_lab(l, Math.cos(h *= Math.PI / 180) * c, Math.sin(h) * c);
}
d3.lab = function(l, a, b) {
  return arguments.length === 1
      ? (l instanceof d3_Lab ? d3_lab(l.l, l.a, l.b)
      : (l instanceof d3_Hcl ? d3_hcl_lab(l.l, l.c, l.h)
      : d3_rgb_lab((l = d3.rgb(l)).r, l.g, l.b)))
      : d3_lab(+l, +a, +b);
};

function d3_lab(l, a, b) {
  return new d3_Lab(l, a, b);
}

function d3_Lab(l, a, b) {
  this.l = l;
  this.a = a;
  this.b = b;
}

// Corresponds roughly to RGB brighter/darker
var d3_lab_K = 18;

// D65 standard referent
var d3_lab_X = 0.950470,
    d3_lab_Y = 1,
    d3_lab_Z = 1.088830;

d3_Lab.prototype.brighter = function(k) {
  return d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
};

d3_Lab.prototype.darker = function(k) {
  return d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
};

d3_Lab.prototype.rgb = function() {
  return d3_lab_rgb(this.l, this.a, this.b);
};

d3_Lab.prototype.toString = function() {
  return this.rgb() + "";
};

function d3_lab_rgb(l, a, b) {
  var y = (l + 16) / 116,
      x = y + a / 500,
      z = y - b / 200;
  x = d3_lab_xyz(x) * d3_lab_X;
  y = d3_lab_xyz(y) * d3_lab_Y;
  z = d3_lab_xyz(z) * d3_lab_Z;
  return d3_rgb(
    d3_xyz_rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z),
    d3_xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
    d3_xyz_rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z)
  );
}

function d3_lab_hcl(l, a, b) {
  return d3_hcl(Math.atan2(b, a) / Math.PI * 180, Math.sqrt(a * a + b * b), l);
}

function d3_lab_xyz(x) {
  return x > 0.206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
}
function d3_xyz_lab(x) {
  return x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
}

function d3_xyz_rgb(r) {
  return Math.round(255 * (r <= 0.00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055));
}
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
d3_selectionPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      group,
      node;

  if (typeof selector !== "function") selector = d3_selection_selector(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(subnode = selector.call(node, node.__data__, i));
        if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_selector(selector) {
  return function() {
    return d3_select(selector, this);
  };
}
d3_selectionPrototype.selectAll = function(selector) {
  var subgroups = [],
      subgroup,
      node;

  if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i)));
        subgroup.parentNode = node;
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_selectorAll(selector) {
  return function() {
    return d3_selectAll(selector, this);
  };
}
d3_selectionPrototype.attr = function(name, value) {
  if (arguments.length < 2) {

    // For attr(string), return the attribute value for the first node.
    if (typeof name === "string") {
      var node = this.node();
      name = d3.ns.qualify(name);
      return name.local
          ? node.getAttributeNS(name.space, name.local)
          : node.getAttribute(name);
    }

    // For attr(object), the object specifies the names and values of the
    // attributes to set or remove. The values may be functions that are
    // evaluated for each element.
    for (value in name) this.each(d3_selection_attr(value, name[value]));
    return this;
  }

  return this.each(d3_selection_attr(name, value));
};

function d3_selection_attr(name, value) {
  name = d3.ns.qualify(name);

  // For attr(string, null), remove the attribute with the specified name.
  function attrNull() {
    this.removeAttribute(name);
  }
  function attrNullNS() {
    this.removeAttributeNS(name.space, name.local);
  }

  // For attr(string, string), set the attribute with the specified name.
  function attrConstant() {
    this.setAttribute(name, value);
  }
  function attrConstantNS() {
    this.setAttributeNS(name.space, name.local, value);
  }

  // For attr(string, function), evaluate the function for each element, and set
  // or remove the attribute as appropriate.
  function attrFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.removeAttribute(name);
    else this.setAttribute(name, x);
  }
  function attrFunctionNS() {
    var x = value.apply(this, arguments);
    if (x == null) this.removeAttributeNS(name.space, name.local);
    else this.setAttributeNS(name.space, name.local, x);
  }

  return value == null
      ? (name.local ? attrNullNS : attrNull) : (typeof value === "function"
      ? (name.local ? attrFunctionNS : attrFunction)
      : (name.local ? attrConstantNS : attrConstant));
}
d3_selectionPrototype.classed = function(name, value) {
  if (arguments.length < 2) {

    // For classed(string), return true only if the first node has the specified
    // class or classes. Note that even if the browser supports DOMTokenList, it
    // probably doesn't support it on SVG elements (which can be animated).
    if (typeof name === "string") {
      var node = this.node(),
          n = (name = name.trim().split(/^|\s+/g)).length,
          i = -1;
      if (value = node.classList) {
        while (++i < n) if (!value.contains(name[i])) return false;
      } else {
        value = node.className;
        if (value.baseVal != null) value = value.baseVal;
        while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
      }
      return true;
    }

    // For classed(object), the object specifies the names of classes to add or
    // remove. The values may be functions that are evaluated for each element.
    for (value in name) this.each(d3_selection_classed(value, name[value]));
    return this;
  }

  // Otherwise, both a name and a value are specified, and are handled as below.
  return this.each(d3_selection_classed(name, value));
};

function d3_selection_classedRe(name) {
  return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
}

// Multiple class names are allowed (e.g., "foo bar").
function d3_selection_classed(name, value) {
  name = name.trim().split(/\s+/).map(d3_selection_classedName);
  var n = name.length;

  function classedConstant() {
    var i = -1;
    while (++i < n) name[i](this, value);
  }

  // When the value is a function, the function is still evaluated only once per
  // element even if there are multiple class names.
  function classedFunction() {
    var i = -1, x = value.apply(this, arguments);
    while (++i < n) name[i](this, x);
  }

  return typeof value === "function"
      ? classedFunction
      : classedConstant;
}

function d3_selection_classedName(name) {
  var re = d3_selection_classedRe(name);
  return function(node, value) {
    if (c = node.classList) return value ? c.add(name) : c.remove(name);
    var c = node.className,
        cb = c.baseVal != null,
        cv = cb ? c.baseVal : c;
    if (value) {
      re.lastIndex = 0;
      if (!re.test(cv)) {
        cv = d3_collapse(cv + " " + name);
        if (cb) c.baseVal = cv;
        else node.className = cv;
      }
    } else if (cv) {
      cv = d3_collapse(cv.replace(re, " "));
      if (cb) c.baseVal = cv;
      else node.className = cv;
    }
  };
}
d3_selectionPrototype.style = function(name, value, priority) {
  var n = arguments.length;
  if (n < 3) {

    // For style(object) or style(object, string), the object specifies the
    // names and values of the attributes to set or remove. The values may be
    // functions that are evaluated for each element. The optional string
    // specifies the priority.
    if (typeof name !== "string") {
      if (n < 2) value = "";
      for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
      return this;
    }

    // For style(string), return the computed style value for the first node.
    if (n < 2) return window
        .getComputedStyle(this.node(), null)
        .getPropertyValue(name);

    // For style(string, string) or style(string, function), use the default
    // priority. The priority is ignored for style(string, null).
    priority = "";
  }

  // Otherwise, a name, value and priority are specified, and handled as below.
  return this.each(d3_selection_style(name, value, priority));
};

function d3_selection_style(name, value, priority) {

  // For style(name, null) or style(name, null, priority), remove the style
  // property with the specified name. The priority is ignored.
  function styleNull() {
    this.style.removeProperty(name);
  }

  // For style(name, string) or style(name, string, priority), set the style
  // property with the specified name, using the specified priority.
  function styleConstant() {
    this.style.setProperty(name, value, priority);
  }

  // For style(name, function) or style(name, function, priority), evaluate the
  // function for each element, and set or remove the style property as
  // appropriate. When setting, use the specified priority.
  function styleFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.style.removeProperty(name);
    else this.style.setProperty(name, x, priority);
  }

  return value == null
      ? styleNull : (typeof value === "function"
      ? styleFunction : styleConstant);
}
d3_selectionPrototype.property = function(name, value) {
  if (arguments.length < 2) {

    // For property(string), return the property value for the first node.
    if (typeof name === "string") return this.node()[name];

    // For property(object), the object specifies the names and values of the
    // properties to set or remove. The values may be functions that are
    // evaluated for each element.
    for (value in name) this.each(d3_selection_property(value, name[value]));
    return this;
  }

  // Otherwise, both a name and a value are specified, and are handled as below.
  return this.each(d3_selection_property(name, value));
};

function d3_selection_property(name, value) {

  // For property(name, null), remove the property with the specified name.
  function propertyNull() {
    delete this[name];
  }

  // For property(name, string), set the property with the specified name.
  function propertyConstant() {
    this[name] = value;
  }

  // For property(name, function), evaluate the function for each element, and
  // set or remove the property as appropriate.
  function propertyFunction() {
    var x = value.apply(this, arguments);
    if (x == null) delete this[name];
    else this[name] = x;
  }

  return value == null
      ? propertyNull : (typeof value === "function"
      ? propertyFunction : propertyConstant);
}
d3_selectionPrototype.text = function(value) {

  var node = this.node();
  // For raphael elements get/set text through paper.
  if (node && node.paper) {
    return arguments.length < 1
        ? node.attr('text') : this.each(typeof value === "function"
        ? function() { var v = value.apply(this, arguments); this.attr('text', v == null ? "" : v); } : value == null
        ? function() { this.attr('text', ''); }
        : function() { this.attr('text', value); });
  }

  return arguments.length < 1
      ? this.node().textContent : this.each(typeof value === "function"
      ? function() { var v = value.apply(this, arguments); this.textContent = v == null ? "" : v; } : value == null
      ? function() { this.textContent = ""; }
      : function() { this.textContent = value; });
};
d3_selectionPrototype.html = function(value) {
  return arguments.length < 1
      ? this.node().innerHTML : this.each(typeof value === "function"
      ? function() { var v = value.apply(this, arguments); this.innerHTML = v == null ? "" : v; } : value == null
      ? function() { this.innerHTML = ""; }
      : function() { this.innerHTML = value; });
};
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
// TODO insert(node, function)?
// TODO insert(function, string)?
// TODO insert(function, function)?
d3_selectionPrototype.insert = function(name, before) {
  name = d3.ns.qualify(name);

  function insert() {
    return this.insertBefore(
        document.createElementNS(this.namespaceURI, name),
        d3_select(before, this));
  }

  function insertNS() {
    return this.insertBefore(
        document.createElementNS(name.space, name.local),
        d3_select(before, this));
  }

  return this.select(name.local ? insertNS : insert);
};
// TODO remove(selector)?
// TODO remove(node)?
// TODO remove(function)?
d3_selectionPrototype.remove = function() {
  return this.each(function() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  });
};
d3_selectionPrototype.data = function(value, key) {
  var i = -1,
      n = this.length,
      group,
      node;

  // If no value is specified, return the first value.
  if (!arguments.length) {
    value = new Array(n = (group = this[0]).length);
    while (++i < n) {
      if (node = group[i]) {
        value[i] = node.__data__;
      }
    }
    return value;
  }

  function bind(group, groupData) {
    var i,
        n = group.length,
        m = groupData.length,
        n0 = Math.min(n, m),
        n1 = Math.max(n, m),
        updateNodes = [],
        enterNodes = [],
        exitNodes = [],
        node,
        nodeData;

    if (key) {
      var nodeByKeyValue = new d3_Map,
          keyValues = [],
          keyValue,
          j = groupData.length;

      for (i = -1; ++i < n;) {
        keyValue = key.call(node = group[i], node.__data__, i);
        if (nodeByKeyValue.has(keyValue)) {
          exitNodes[j++] = node; // duplicate key
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
        keyValues.push(keyValue);
      }

      for (i = -1; ++i < m;) {
        keyValue = key.call(groupData, nodeData = groupData[i], i)
        if (nodeByKeyValue.has(keyValue)) {
          updateNodes[i] = node = nodeByKeyValue.get(keyValue);
          node.__data__ = nodeData;
          enterNodes[i] = exitNodes[i] = null;
        } else {
          enterNodes[i] = d3_selection_dataNode(nodeData);
          updateNodes[i] = exitNodes[i] = null;
        }
        nodeByKeyValue.remove(keyValue);
      }

      for (i = -1; ++i < n;) {
        if (nodeByKeyValue.has(keyValues[i])) {
          exitNodes[i] = group[i];
        }
      }
    } else {
      for (i = -1; ++i < n0;) {
        node = group[i];
        nodeData = groupData[i];
        if (node) {
          node.__data__ = nodeData;
          updateNodes[i] = node;
          enterNodes[i] = exitNodes[i] = null;
        } else {
          enterNodes[i] = d3_selection_dataNode(nodeData);
          updateNodes[i] = exitNodes[i] = null;
        }
      }
      for (; i < m; ++i) {
        enterNodes[i] = d3_selection_dataNode(groupData[i]);
        updateNodes[i] = exitNodes[i] = null;
      }
      for (; i < n1; ++i) {
        exitNodes[i] = group[i];
        enterNodes[i] = updateNodes[i] = null;
      }
    }

    enterNodes.update
        = updateNodes;

    enterNodes.parentNode
        = updateNodes.parentNode
        = exitNodes.parentNode
        = group.parentNode;

    enter.push(enterNodes);
    update.push(updateNodes);
    exit.push(exitNodes);
  }

  var enter = d3_selection_enter([]),
      update = d3_selection([]),
      exit = d3_selection([]);

  if (typeof value === "function") {
    while (++i < n) {
      bind(group = this[i], value.call(group, group.parentNode.__data__, i));
    }
  } else {
    while (++i < n) {
      bind(group = this[i], value);
    }
  }

  update.enter = function() { return enter; };
  update.exit = function() { return exit; };
  return update;
};

function d3_selection_dataNode(data) {
  return {__data__: data};
}
d3_selectionPrototype.datum =
d3_selectionPrototype.map = function(value) {
  return arguments.length < 1
      ? this.property("__data__")
      : this.property("__data__", value);
};
d3_selectionPrototype.filter = function(filter) {
  var subgroups = [],
      subgroup,
      group,
      node;

  if (typeof filter !== "function") filter = d3_selection_filter(filter);

  for (var j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (var i = 0, n = group.length; i < n; i++) {
      if ((node = group[i]) && filter.call(node, node.__data__, i)) {
        subgroup.push(node);
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_filter(selector) {
  return function() {
    return d3_selectMatches(this, selector);
  };
}
d3_selectionPrototype.order = function() {
  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
};
d3_selectionPrototype.sort = function(comparator) {
  comparator = d3_selection_sortComparator.apply(this, arguments);
  for (var j = -1, m = this.length; ++j < m;) this[j].sort(comparator);
  return this.order();
};

function d3_selection_sortComparator(comparator) {
  if (!arguments.length) comparator = d3.ascending;
  return function(a, b) {
    return comparator(a && a.__data__, b && b.__data__);
  };
}
d3_selectionPrototype.on = function(type, listener, capture) {
  var n = arguments.length;
  if (n < 3) {

    // For on(object) or on(object, boolean), the object specifies the event
    // types and listeners to add or remove. The optional boolean specifies
    // whether the listener captures events.
    if (typeof type !== "string") {
      if (n < 2) listener = false;
      for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
      return this;
    }

    // For on(string), return the listener for the first node.
    if (n < 2) return (n = this.node()["__on" + type]) && n._;

    // For on(string, function), use the default capture.
    capture = false;
  }

  // Otherwise, a type, listener and capture are specified, and handled as below.
  return this.each(d3_selection_on(type, listener, capture));
};

function d3_selection_on(type, listener, capture) {
  var name = "__on" + type, i = type.indexOf(".");
  if (i > 0) type = type.substring(0, i);

  function onRemove() {
    var wrapper = this[name];
    if (wrapper) {
      this.removeEventListener(type, wrapper, wrapper.$);
      delete this[name];
    }
  }

  function onAdd() {
    var node = this,
        args = arguments;

    onRemove.call(this);
    this.addEventListener(type, this[name] = wrapper, wrapper.$ = capture);
    wrapper._ = listener;

    function wrapper(e) {
      var o = d3.event; // Events can be reentrant (e.g., focus).
      d3.event = e;
      args[0] = node.__data__;
      try {
        listener.apply(node, args);
      } finally {
        d3.event = o;
      }
    }
  }

  return listener ? onAdd : onRemove;
}
d3_selectionPrototype.each = function(callback) {
  return d3_selection_each(this, function(node, i, j) {
    callback.call(node, node.__data__, i, j);
  });
};

function d3_selection_each(groups, callback) {
  for (var j = 0, m = groups.length; j < m; j++) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
      if (node = group[i]) callback(node, i, j);
    }
  }
  return groups;
}
//
// Note: assigning to the arguments array simultaneously changes the value of
// the corresponding argument!
//
// TODO The `this` argument probably shouldn't be the first argument to the
// callback, anyway, since it's redundant. However, that will require a major
// version bump due to backwards compatibility, so I'm not changing it right
// away.
//
d3_selectionPrototype.call = function(callback) {
  callback.apply(this, (arguments[0] = this, arguments));
  return this;
};
d3_selectionPrototype.empty = function() {
  return !this.node();
};
d3_selectionPrototype.node = function(callback) {
  for (var j = 0, m = this.length; j < m; j++) {
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
};
d3_selectionPrototype.transition = function() {
  var subgroups = [],
      subgroup,
      node;

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      subgroup.push((node = group[i]) ? {node: node, delay: d3_transitionDelay, duration: d3_transitionDuration} : null);
    }
  }

  return d3_transition(subgroups, d3_transitionId || ++d3_transitionNextId, Date.now());
};
var d3_selectionRoot = d3_selection([[document]]);

d3_selectionRoot[0].parentNode = d3_selectRoot;

// TODO fast singleton implementation!
// TODO select(function)
d3.select = function(selector) {
  return typeof selector === "string"
      ? d3_selectionRoot.select(selector)
      : d3_selection([[selector]]); // assume node
};

// TODO selectAll(function)
d3.selectAll = function(selector) {
  return typeof selector === "string"
      ? d3_selectionRoot.selectAll(selector)
      : d3_selection([d3_array(selector)]); // assume node[]
};
function d3_selection_enter(selection) {
  d3_arraySubclass(selection, d3_selection_enterPrototype);
  return selection;
}

var d3_selection_enterPrototype = [];

d3.selection.enter = d3_selection_enter;
d3.selection.enter.prototype = d3_selection_enterPrototype;

d3_selection_enterPrototype.append = d3_selectionPrototype.append;
d3_selection_enterPrototype.insert = d3_selectionPrototype.insert;
d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
d3_selection_enterPrototype.node = d3_selectionPrototype.node;
d3_selection_enterPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      upgroup,
      group,
      node;

  for (var j = -1, m = this.length; ++j < m;) {
    upgroup = (group = this[j]).update;
    subgroups.push(subgroup = []);
    subgroup.parentNode = group.parentNode;
    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i));
        subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_selection(subgroups);
};
function d3_transition(groups, id, time) {
  d3_arraySubclass(groups, d3_transitionPrototype);

  var tweens = new d3_Map,
      event = d3.dispatch("start", "end"),
      ease = d3_transitionEase;

  groups.id = id;

  groups.time = time;

  groups.tween = function(name, tween) {
    if (arguments.length < 2) return tweens.get(name);
    if (tween == null) tweens.remove(name);
    else tweens.set(name, tween);
    return groups;
  };

  groups.ease = function(value) {
    if (!arguments.length) return ease;
    ease = typeof value === "function" ? value : d3.ease.apply(d3, arguments);
    return groups;
  };

  groups.each = function(type, listener) {
    if (arguments.length < 2) return d3_transition_each.call(groups, type);
    event.on(type, listener);
    return groups;
  };

  d3.timer(function(elapsed) {
    return d3_selection_each(groups, function(node, i, j) {
      var tweened = [],
          delay = node.delay,
          duration = node.duration,
          lock = (node = node.node).__transition__ || (node.__transition__ = {active: 0, count: 0}),
          d = node.__data__;

      ++lock.count;

      delay <= elapsed ? start(elapsed) : d3.timer(start, delay, time);

      function start(elapsed) {
        if (lock.active > id) return stop();
        lock.active = id;

        tweens.forEach(function(key, value) {
          if (value = value.call(node, d, i)) {
            tweened.push(value);
          }
        });

        event.start.call(node, d, i);
        if (!tick(elapsed)) d3.timer(tick, 0, time);
        return 1;
      }

      function tick(elapsed) {
        if (lock.active !== id) return stop();

        var t = (elapsed - delay) / duration,
            e = ease(t),
            n = tweened.length;

        while (n > 0) {
          tweened[--n].call(node, e);
        }

        if (t >= 1) {
          stop();
          d3_transitionId = id;
          event.end.call(node, d, i);
          d3_transitionId = 0;
          return 1;
        }
      }

      function stop() {
        if (!--lock.count) delete node.__transition__;
        return 1;
      }
    });
  }, 0, time);

  return groups;
}

var d3_transitionPrototype = [],
    d3_transitionNextId = 0,
    d3_transitionId = 0,
    d3_transitionDefaultDelay = 0,
    d3_transitionDefaultDuration = 250,
    d3_transitionDefaultEase = d3.ease("cubic-in-out"),
    d3_transitionDelay = d3_transitionDefaultDelay,
    d3_transitionDuration = d3_transitionDefaultDuration,
    d3_transitionEase = d3_transitionDefaultEase;

d3_transitionPrototype.call = d3_selectionPrototype.call;

d3.transition = function(selection) {
  return arguments.length
      ? (d3_transitionId ? selection.transition() : selection)
      : d3_selectionRoot.transition();
};

d3.transition.prototype = d3_transitionPrototype;
d3_transitionPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      node;

  if (typeof selector !== "function") selector = d3_selection_selector(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if ((node = group[i]) && (subnode = selector.call(node.node, node.node.__data__, i))) {
        if ("__data__" in node.node) subnode.__data__ = node.node.__data__;
        subgroup.push({node: subnode, delay: node.delay, duration: node.duration});
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_transition(subgroups, this.id, this.time).ease(this.ease());
};
d3_transitionPrototype.selectAll = function(selector) {
  var subgroups = [],
      subgroup,
      subnodes,
      node;

  if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subnodes = selector.call(node.node, node.node.__data__, i);
        subgroups.push(subgroup = []);
        for (var k = -1, o = subnodes.length; ++k < o;) {
          subgroup.push({node: subnodes[k], delay: node.delay, duration: node.duration});
        }
      }
    }
  }

  return d3_transition(subgroups, this.id, this.time).ease(this.ease());
};
d3_transitionPrototype.filter = function(filter) {
  var subgroups = [],
      subgroup,
      group,
      node;

  if (typeof filter !== "function") filter = d3_selection_filter(filter);

  for (var j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      if ((node = group[i]) && filter.call(node.node, node.node.__data__, i)) {
        subgroup.push(node);
      }
    }
  }

  return d3_transition(subgroups, this.id, this.time).ease(this.ease());
};
d3_transitionPrototype.attr = function(name, value) {
  if (arguments.length < 2) {

    // For attr(object), the object specifies the names and values of the
    // attributes to transition. The values may be functions that are
    // evaluated for each element.
    for (value in name) this.attrTween(value, d3_tweenByName(name[value], value));
    return this;
  }

  return this.attrTween(name, d3_tweenByName(value, name));
};

d3_transitionPrototype.attrTween = function(nameNS, tween) {
  var name = d3.ns.qualify(nameNS);

  function attrTween(d, i) {
    var f = tween.call(this, d, i, this.getAttribute(name));
    return f === d3_tweenRemove
        ? (this.removeAttribute(name), null)
        : f && function(t) { this.setAttribute(name, f(t)); };
  }

  function attrTweenNS(d, i) {
    var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
    return f === d3_tweenRemove
        ? (this.removeAttributeNS(name.space, name.local), null)
        : f && function(t) { this.setAttributeNS(name.space, name.local, f(t)); };
  }

  return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
};
d3_transitionPrototype.style = function(name, value, priority) {
  var n = arguments.length;
  if (n < 3) {

    // For style(object) or style(object, string), the object specifies the
    // names and values of the attributes to set or remove. The values may be
    // functions that are evaluated for each element. The optional string
    // specifies the priority.
    if (typeof name !== "string") {
      if (n < 2) value = "";
      for (priority in name) this.styleTween(priority, d3_tweenByName(name[priority], priority), value);
      return this;
    }

    // For style(string, string) or style(string, function), use the default
    // priority. The priority is ignored for style(string, null).
    priority = "";
  }

  // Otherwise, a name, value and priority are specified, and handled as below.
  return this.styleTween(name, d3_tweenByName(value, name), priority);
};

d3_transitionPrototype.styleTween = function(name, tween, priority) {
  if (arguments.length < 3) priority = "";
  return this.tween("style." + name, function(d, i) {
    var f = tween.call(this, d, i, window.getComputedStyle(this, null).getPropertyValue(name));
    return f === d3_tweenRemove
        ? (this.style.removeProperty(name), null)
        : f && function(t) { this.style.setProperty(name, f(t), priority); };
  });
};
d3_transitionPrototype.text = function(value) {
  return this.tween("text", function(d, i) {
    this.textContent = typeof value === "function"
        ? value.call(this, d, i)
        : value;
  });
};
d3_transitionPrototype.remove = function() {
  return this.each("end.transition", function() {
    var p;
    if (!this.__transition__ && (p = this.parentNode)) p.removeChild(this);
  });
};
d3_transitionPrototype.delay = function(value) {
  return d3_selection_each(this, typeof value === "function"
      ? function(node, i, j) { node.delay = value.call(node = node.node, node.__data__, i, j) | 0; }
      : (value = value | 0, function(node) { node.delay = value; }));
};
d3_transitionPrototype.duration = function(value) {
  return d3_selection_each(this, typeof value === "function"
      ? function(node, i, j) { node.duration = Math.max(1, value.call(node = node.node, node.__data__, i, j) | 0); }
      : (value = Math.max(1, value | 0), function(node) { node.duration = value; }));
};
function d3_transition_each(callback) {
  var id = d3_transitionId,
      ease = d3_transitionEase,
      delay = d3_transitionDelay,
      duration = d3_transitionDuration;

  d3_transitionId = this.id;
  d3_transitionEase = this.ease();
  d3_selection_each(this, function(node, i, j) {
    d3_transitionDelay = node.delay;
    d3_transitionDuration = node.duration;
    callback.call(node = node.node, node.__data__, i, j);
  });

  d3_transitionId = id;
  d3_transitionEase = ease;
  d3_transitionDelay = delay;
  d3_transitionDuration = duration;
  return this;
}
d3_transitionPrototype.transition = function() {
  return this.select(d3_this);
};
d3.tween = function(b, interpolate) {

  function tweenFunction(d, i, a) {
    var v = b.call(this, d, i);
    return v == null
        ? a != "" && d3_tweenRemove
        : a != v && interpolate(a, v);
  }

  function tweenString(d, i, a) {
    return a != b && interpolate(a, b);
  }

  return typeof b === "function" ? tweenFunction
      : b == null ? d3_tweenNull
      : (b += "", tweenString);
};

var d3_tweenRemove = {};

function d3_tweenNull(d, i, a) {
  return a != "" && d3_tweenRemove;
}

function d3_tweenByName(b, name) {
  return d3.tween(b, d3_interpolateByName(name));
}
var d3_timer_queue = null,
    d3_timer_interval, // is an interval (or frame) active?
    d3_timer_timeout; // is a timeout active?

// The timer will continue to fire until callback returns true.
d3.timer = function(callback, delay, then) {
  var found = false,
      t0,
      t1 = d3_timer_queue;

  if (arguments.length < 3) {
    if (arguments.length < 2) delay = 0;
    else if (!isFinite(delay)) return;
    then = Date.now();
  }

  // See if the callback's already in the queue.
  while (t1) {
    if (t1.callback === callback) {
      t1.then = then;
      t1.delay = delay;
      found = true;
      break;
    }
    t0 = t1;
    t1 = t1.next;
  }

  // Otherwise, add the callback to the queue.
  if (!found) d3_timer_queue = {
    callback: callback,
    then: then,
    delay: delay,
    next: d3_timer_queue
  };

  // Start animatin'!
  if (!d3_timer_interval) {
    d3_timer_timeout = clearTimeout(d3_timer_timeout);
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
}

function d3_timer_step() {
  var elapsed,
      now = Date.now(),
      t1 = d3_timer_queue;

  while (t1) {
    elapsed = now - t1.then;
    if (elapsed >= t1.delay) t1.flush = t1.callback(elapsed);
    t1 = t1.next;
  }

  var delay = d3_timer_flush() - now;
  if (delay > 24) {
    if (isFinite(delay)) {
      clearTimeout(d3_timer_timeout);
      d3_timer_timeout = setTimeout(d3_timer_step, delay);
    }
    d3_timer_interval = 0;
  } else {
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
}

d3.timer.flush = function() {
  var elapsed,
      now = Date.now(),
      t1 = d3_timer_queue;

  while (t1) {
    elapsed = now - t1.then;
    if (!t1.delay) t1.flush = t1.callback(elapsed);
    t1 = t1.next;
  }

  d3_timer_flush();
};

// Flush after callbacks, to avoid concurrent queue modification.
function d3_timer_flush() {
  var t0 = null,
      t1 = d3_timer_queue,
      then = Infinity;
  while (t1) {
    if (t1.flush) {
      t1 = t0 ? t0.next = t1.next : d3_timer_queue = t1.next;
    } else {
      then = Math.min(then, t1.then + t1.delay);
      t1 = (t0 = t1).next;
    }
  }
  return then;
}

var d3_timer_frame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) { setTimeout(callback, 17); };
d3.transform = function(string) {
  var g = document.createElementNS(d3.ns.prefix.svg, "g");
  return (d3.transform = function(string) {
    g.setAttribute("transform", string);
    var t = g.transform.baseVal.consolidate();
    return new d3_transform(t ? t.matrix : d3_transformIdentity);
  })(string);
};

// Compute x-scale and normalize the first row.
// Compute shear and make second row orthogonal to first.
// Compute y-scale and normalize the second row.
// Finally, compute the rotation.
function d3_transform(m) {
  var r0 = [m.a, m.b],
      r1 = [m.c, m.d],
      kx = d3_transformNormalize(r0),
      kz = d3_transformDot(r0, r1),
      ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
  if (r0[0] * r1[1] < r1[0] * r0[1]) {
    r0[0] *= -1;
    r0[1] *= -1;
    kx *= -1;
    kz *= -1;
  }
  this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_transformDegrees;
  this.translate = [m.e, m.f];
  this.scale = [kx, ky];
  this.skew = ky ? Math.atan2(kz, ky) * d3_transformDegrees : 0;
};

d3_transform.prototype.toString = function() {
  return "translate(" + this.translate
      + ")rotate(" + this.rotate
      + ")skewX(" + this.skew
      + ")scale(" + this.scale
      + ")";
};

function d3_transformDot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function d3_transformNormalize(a) {
  var k = Math.sqrt(d3_transformDot(a, a));
  if (k) {
    a[0] /= k;
    a[1] /= k;
  }
  return k;
}

function d3_transformCombine(a, b, k) {
  a[0] += k * b[0];
  a[1] += k * b[1];
  return a;
}

var d3_transformDegrees = 180 / Math.PI,
    d3_transformIdentity = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
d3.mouse = function(container) {
  return d3_mousePoint(container, d3_eventSource());
};

// https://bugs.webkit.org/show_bug.cgi?id=44083
var d3_mouse_bug44083 = /WebKit/.test(navigator.userAgent) ? -1 : 0;

function d3_mousePoint(container, e) {
  var svg = container.ownerSVGElement || container;
  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    if (d3_mouse_bug44083 < 0 && (window.scrollX || window.scrollY)) {
      svg = d3.select(document.body)
        .append("svg")
          .style("position", "absolute")
          .style("top", 0)
          .style("left", 0);
      var ctm = svg[0][0].getScreenCTM();
      d3_mouse_bug44083 = !(ctm.f || ctm.e);
      svg.remove();
    }
    if (d3_mouse_bug44083) {
      point.x = e.pageX;
      point.y = e.pageY;
    } else {
      point.x = e.clientX;
      point.y = e.clientY;
    }
    point = point.matrixTransform(container.getScreenCTM().inverse());
    return [point.x, point.y];
  }
  var rect = container.getBoundingClientRect();
  return [e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop];
};
d3.touches = function(container, touches) {
  if (arguments.length < 2) touches = d3_eventSource().touches;
  return touches ? d3_array(touches).map(function(touch) {
    var point = d3_mousePoint(container, touch);
    point.identifier = touch.identifier;
    return point;
  }) : [];
};
function d3_noop() {}
d3.scale = {};

function d3_scaleExtent(domain) {
  var start = domain[0], stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}

function d3_scaleRange(scale) {
  return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
}
function d3_scale_nice(domain, nice) {
  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      dx;

  if (x1 < x0) {
    dx = i0, i0 = i1, i1 = dx;
    dx = x0, x0 = x1, x1 = dx;
  }

  if (nice = nice(x1 - x0)) {
    domain[i0] = nice.floor(x0);
    domain[i1] = nice.ceil(x1);
  }

  return domain;
}

function d3_scale_niceDefault() {
  return Math;
}
d3.scale.linear = function() {
  return d3_scale_linear([0, 1], [0, 1], d3.interpolate, false);
};

function d3_scale_linear(domain, range, interpolate, clamp) {
  var output,
      input;

  function rescale() {
    var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear,
        uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
    output = linear(domain, range, uninterpolate, interpolate);
    input = linear(range, domain, uninterpolate, d3.interpolate);
    return scale;
  }

  function scale(x) {
    return output(x);
  }

  // Note: requires range is coercible to number!
  scale.invert = function(y) {
    return input(y);
  };

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.map(Number);
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.rangeRound = function(x) {
    return scale.range(x).interpolate(d3.interpolateRound);
  };

  scale.clamp = function(x) {
    if (!arguments.length) return clamp;
    clamp = x;
    return rescale();
  };

  scale.interpolate = function(x) {
    if (!arguments.length) return interpolate;
    interpolate = x;
    return rescale();
  };

  scale.ticks = function(m) {
    return d3_scale_linearTicks(domain, m);
  };

  scale.tickFormat = function(m) {
    return d3_scale_linearTickFormat(domain, m);
  };

  scale.nice = function() {
    d3_scale_nice(domain, d3_scale_linearNice);
    return rescale();
  };

  scale.copy = function() {
    return d3_scale_linear(domain, range, interpolate, clamp);
  };

  return rescale();
}

function d3_scale_linearRebind(scale, linear) {
  return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
}

function d3_scale_linearNice(dx) {
  dx = Math.pow(10, Math.round(Math.log(dx) / Math.LN10) - 1);
  return dx && {
    floor: function(x) { return Math.floor(x / dx) * dx; },
    ceil: function(x) { return Math.ceil(x / dx) * dx; }
  };
}

function d3_scale_linearTickRange(domain, m) {
  var extent = d3_scaleExtent(domain),
      span = extent[1] - extent[0],
      step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
      err = m / span * step;

  // Filter ticks to get closer to the desired count.
  if (err <= .15) step *= 10;
  else if (err <= .35) step *= 5;
  else if (err <= .75) step *= 2;

  // Round start and stop values to step interval.
  extent[0] = Math.ceil(extent[0] / step) * step;
  extent[1] = Math.floor(extent[1] / step) * step + step * .5; // inclusive
  extent[2] = step;
  return extent;
}

function d3_scale_linearTicks(domain, m) {
  return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
}

function d3_scale_linearTickFormat(domain, m) {
  return d3.format(",." + Math.max(0, -Math.floor(Math.log(d3_scale_linearTickRange(domain, m)[2]) / Math.LN10 + .01)) + "f");
}
function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
  var u = uninterpolate(domain[0], domain[1]),
      i = interpolate(range[0], range[1]);
  return function(x) {
    return i(u(x));
  };
}
function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
  var u = [],
      i = [],
      j = 0,
      k = Math.min(domain.length, range.length) - 1;

  // Handle descending domains.
  if (domain[k] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++j <= k) {
    u.push(uninterpolate(domain[j - 1], domain[j]));
    i.push(interpolate(range[j - 1], range[j]));
  }

  return function(x) {
    var j = d3.bisect(domain, x, 1, k) - 1;
    return i[j](u[j](x));
  };
}
d3.scale.log = function() {
  return d3_scale_log(d3.scale.linear(), d3_scale_logp);
};

function d3_scale_log(linear, log) {
  var pow = log.pow;

  function scale(x) {
    return linear(log(x));
  }

  scale.invert = function(x) {
    return pow(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(pow);
    log = x[0] < 0 ? d3_scale_logn : d3_scale_logp;
    pow = log.pow;
    linear.domain(x.map(log));
    return scale;
  };

  scale.nice = function() {
    linear.domain(d3_scale_nice(linear.domain(), d3_scale_niceDefault));
    return scale;
  };

  scale.ticks = function() {
    var extent = d3_scaleExtent(linear.domain()),
        ticks = [];
    if (extent.every(isFinite)) {
      var i = Math.floor(extent[0]),
          j = Math.ceil(extent[1]),
          u = pow(extent[0]),
          v = pow(extent[1]);
      if (log === d3_scale_logn) {
        ticks.push(pow(i));
        for (; i++ < j;) for (var k = 9; k > 0; k--) ticks.push(pow(i) * k);
      } else {
        for (; i < j; i++) for (var k = 1; k < 10; k++) ticks.push(pow(i) * k);
        ticks.push(pow(i));
      }
      for (i = 0; ticks[i] < u; i++) {} // strip small values
      for (j = ticks.length; ticks[j - 1] > v; j--) {} // strip big values
      ticks = ticks.slice(i, j);
    }
    return ticks;
  };

  scale.tickFormat = function(n, format) {
    if (arguments.length < 2) format = d3_scale_logFormat;
    if (arguments.length < 1) return format;
    var k = Math.max(.1, n / scale.ticks().length),
        f = log === d3_scale_logn ? (e = -1e-12, Math.floor) : (e = 1e-12, Math.ceil),
        e;
    return function(d) {
      return d / pow(f(log(d) + e)) <= k ? format(d) : "";
    };
  };

  scale.copy = function() {
    return d3_scale_log(linear.copy(), log);
  };

  return d3_scale_linearRebind(scale, linear);
}

var d3_scale_logFormat = d3.format(".0e");

function d3_scale_logp(x) {
  return Math.log(x < 0 ? 0 : x) / Math.LN10;
}

function d3_scale_logn(x) {
  return -Math.log(x > 0 ? 0 : -x) / Math.LN10;
}

d3_scale_logp.pow = function(x) {
  return Math.pow(10, x);
};

d3_scale_logn.pow = function(x) {
  return -Math.pow(10, -x);
};
d3.scale.pow = function() {
  return d3_scale_pow(d3.scale.linear(), 1);
};

function d3_scale_pow(linear, exponent) {
  var powp = d3_scale_powPow(exponent),
      powb = d3_scale_powPow(1 / exponent);

  function scale(x) {
    return linear(powp(x));
  }

  scale.invert = function(x) {
    return powb(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(powb);
    linear.domain(x.map(powp));
    return scale;
  };

  scale.ticks = function(m) {
    return d3_scale_linearTicks(scale.domain(), m);
  };

  scale.tickFormat = function(m) {
    return d3_scale_linearTickFormat(scale.domain(), m);
  };

  scale.nice = function() {
    return scale.domain(d3_scale_nice(scale.domain(), d3_scale_linearNice));
  };

  scale.exponent = function(x) {
    if (!arguments.length) return exponent;
    var domain = scale.domain();
    powp = d3_scale_powPow(exponent = x);
    powb = d3_scale_powPow(1 / exponent);
    return scale.domain(domain);
  };

  scale.copy = function() {
    return d3_scale_pow(linear.copy(), exponent);
  };

  return d3_scale_linearRebind(scale, linear);
}

function d3_scale_powPow(e) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
  };
}
d3.scale.sqrt = function() {
  return d3.scale.pow().exponent(.5);
};
d3.scale.ordinal = function() {
  return d3_scale_ordinal([], {t: "range", a: [[]]});
};

function d3_scale_ordinal(domain, ranger) {
  var index,
      range,
      rangeBand;

  function scale(x) {
    return range[((index.get(x) || index.set(x, domain.push(x))) - 1) % range.length];
  }

  function steps(start, step) {
    return d3.range(domain.length).map(function(i) { return start + step * i; });
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = [];
    index = new d3_Map;
    var i = -1, n = x.length, xi;
    while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
    return scale[ranger.t].apply(scale, ranger.a);
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    rangeBand = 0;
    ranger = {t: "range", a: arguments};
    return scale;
  };

  scale.rangePoints = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = (stop - start) / (Math.max(1, domain.length - 1) + padding);
    range = steps(domain.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step);
    rangeBand = 0;
    ranger = {t: "rangePoints", a: arguments};
    return scale;
  };

  scale.rangeBands = function(x, padding, outerPadding) {
    if (arguments.length < 2) padding = 0;
    if (arguments.length < 3) outerPadding = padding;
    var reverse = x[1] < x[0],
        start = x[reverse - 0],
        stop = x[1 - reverse],
        step = (stop - start) / (domain.length - padding + 2 * outerPadding);
    range = steps(start + step * outerPadding, step);
    if (reverse) range.reverse();
    rangeBand = step * (1 - padding);
    ranger = {t: "rangeBands", a: arguments};
    return scale;
  };

  scale.rangeRoundBands = function(x, padding, outerPadding) {
    if (arguments.length < 2) padding = 0;
    if (arguments.length < 3) outerPadding = padding;
    var reverse = x[1] < x[0],
        start = x[reverse - 0],
        stop = x[1 - reverse],
        step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding)),
        error = stop - start - (domain.length - padding) * step;
    range = steps(start + Math.round(error / 2), step);
    if (reverse) range.reverse();
    rangeBand = Math.round(step * (1 - padding));
    ranger = {t: "rangeRoundBands", a: arguments};
    return scale;
  };

  scale.rangeBand = function() {
    return rangeBand;
  };

  scale.rangeExtent = function() {
    return d3_scaleExtent(ranger.a[0]);
  };

  scale.copy = function() {
    return d3_scale_ordinal(domain, ranger);
  };

  return scale.domain(domain);
}
/*
 * This product includes color specifications and designs developed by Cynthia
 * Brewer (http://colorbrewer.org/). See lib/colorbrewer for more information.
 */

d3.scale.category10 = function() {
  return d3.scale.ordinal().range(d3_category10);
};

d3.scale.category20 = function() {
  return d3.scale.ordinal().range(d3_category20);
};

d3.scale.category20b = function() {
  return d3.scale.ordinal().range(d3_category20b);
};

d3.scale.category20c = function() {
  return d3.scale.ordinal().range(d3_category20c);
};

var d3_category10 = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

var d3_category20 = [
  "#1f77b4", "#aec7e8",
  "#ff7f0e", "#ffbb78",
  "#2ca02c", "#98df8a",
  "#d62728", "#ff9896",
  "#9467bd", "#c5b0d5",
  "#8c564b", "#c49c94",
  "#e377c2", "#f7b6d2",
  "#7f7f7f", "#c7c7c7",
  "#bcbd22", "#dbdb8d",
  "#17becf", "#9edae5"
];

var d3_category20b = [
  "#393b79", "#5254a3", "#6b6ecf", "#9c9ede",
  "#637939", "#8ca252", "#b5cf6b", "#cedb9c",
  "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94",
  "#843c39", "#ad494a", "#d6616b", "#e7969c",
  "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
];

var d3_category20c = [
  "#3182bd", "#6baed6", "#9ecae1", "#c6dbef",
  "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2",
  "#31a354", "#74c476", "#a1d99b", "#c7e9c0",
  "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb",
  "#636363", "#969696", "#bdbdbd", "#d9d9d9"
];
d3.scale.quantile = function() {
  return d3_scale_quantile([], []);
};

function d3_scale_quantile(domain, range) {
  var thresholds;

  function rescale() {
    var k = 0,
        n = domain.length,
        q = range.length;
    thresholds = [];
    while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
    return scale;
  }

  function scale(x) {
    if (isNaN(x = +x)) return NaN;
    return range[d3.bisect(thresholds, x)];
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.filter(function(d) { return !isNaN(d); }).sort(d3.ascending);
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.quantiles = function() {
    return thresholds;
  };

  scale.copy = function() {
    return d3_scale_quantile(domain, range); // copy on write!
  };

  return rescale();
}
d3.scale.quantize = function() {
  return d3_scale_quantize(0, 1, [0, 1]);
};

function d3_scale_quantize(x0, x1, range) {
  var kx, i;

  function scale(x) {
    return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
  }

  function rescale() {
    kx = range.length / (x1 - x0);
    i = range.length - 1;
    return scale;
  }

  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = +x[0];
    x1 = +x[x.length - 1];
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.copy = function() {
    return d3_scale_quantize(x0, x1, range); // copy on write
  };

  return rescale();
}
d3.scale.threshold = function() {
  return d3_scale_threshold([.5], [0, 1]);
};

function d3_scale_threshold(domain, range) {

  function scale(x) {
    return range[d3.bisect(domain, x)];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain;
    domain = _;
    return scale;
  };

  scale.range = function(_) {
    if (!arguments.length) return range;
    range = _;
    return scale;
  };

  scale.copy = function() {
    return d3_scale_threshold(domain, range);
  };

  return scale;
};
d3.scale.identity = function() {
  return d3_scale_identity([0, 1]);
};

function d3_scale_identity(domain) {

  function identity(x) { return +x; }

  identity.invert = identity;

  identity.domain = identity.range = function(x) {
    if (!arguments.length) return domain;
    domain = x.map(identity);
    return identity;
  };

  identity.ticks = function(m) {
    return d3_scale_linearTicks(domain, m);
  };

  identity.tickFormat = function(m) {
    return d3_scale_linearTickFormat(domain, m);
  };

  identity.copy = function() {
    return d3_scale_identity(domain);
  };

  return identity;
}
d3.svg = {};
d3.svg.arc = function() {
  var innerRadius = d3_svg_arcInnerRadius,
      outerRadius = d3_svg_arcOuterRadius,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  function arc() {
    var r0 = innerRadius.apply(this, arguments),
        r1 = outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset,
        a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset,
        da = (a1 < a0 && (da = a0, a0 = a1, a1 = da), a1 - a0),
        df = da < Math.PI ? "0" : "1",
        c0 = Math.cos(a0),
        s0 = Math.sin(a0),
        c1 = Math.cos(a1),
        s1 = Math.sin(a1);
    return da >= d3_svg_arcMax
      ? (r0
      ? "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "M0," + r0
      + "A" + r0 + "," + r0 + " 0 1,0 0," + (-r0)
      + "A" + r0 + "," + r0 + " 0 1,0 0," + r0
      + "Z"
      : "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "Z")
      : (r0
      ? "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L" + r0 * c1 + "," + r0 * s1
      + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0
      + "Z"
      : "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L0,0"
      + "Z");
  }

  arc.innerRadius = function(v) {
    if (!arguments.length) return innerRadius;
    innerRadius = d3_functor(v);
    return arc;
  };

  arc.outerRadius = function(v) {
    if (!arguments.length) return outerRadius;
    outerRadius = d3_functor(v);
    return arc;
  };

  arc.startAngle = function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3_functor(v);
    return arc;
  };

  arc.endAngle = function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3_functor(v);
    return arc;
  };

  arc.centroid = function() {
    var r = (innerRadius.apply(this, arguments)
        + outerRadius.apply(this, arguments)) / 2,
        a = (startAngle.apply(this, arguments)
        + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  return arc;
};

var d3_svg_arcOffset = -Math.PI / 2,
    d3_svg_arcMax = 2 * Math.PI - 1e-6;

function d3_svg_arcInnerRadius(d) {
  return d.innerRadius;
}

function d3_svg_arcOuterRadius(d) {
  return d.outerRadius;
}

function d3_svg_arcStartAngle(d) {
  return d.startAngle;
}

function d3_svg_arcEndAngle(d) {
  return d.endAngle;
}
function d3_svg_line(projection) {
  var x = d3_svg_lineX,
      y = d3_svg_lineY,
      defined = d3_true,
      interpolate = d3_svg_lineLinear,
      interpolateKey = interpolate.key,
      tension = .7;

  function line(data) {
    var segments = [],
        points = [],
        i = -1,
        n = data.length,
        d,
        fx = d3_functor(x),
        fy = d3_functor(y);

    function segment() {
      segments.push("M", interpolate(projection(points), tension));
    }

    while (++i < n) {
      if (defined.call(this, d = data[i], i)) {
        points.push([+fx.call(this, d, i), +fy.call(this, d, i)]);
      } else if (points.length) {
        segment();
        points = [];
      }
    }

    if (points.length) segment();

    return segments.length ? segments.join("") : null;
  }

  line.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return line;
  };

  line.y = function(_) {
    if (!arguments.length) return y;
    y = _;
    return line;
  };

  line.defined  = function(_) {
    if (!arguments.length) return defined;
    defined = _;
    return line;
  };

  line.interpolate = function(_) {
    if (!arguments.length) return interpolateKey;
    if (typeof _ === "function") interpolateKey = interpolate = _;
    else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
    return line;
  };

  line.tension = function(_) {
    if (!arguments.length) return tension;
    tension = _;
    return line;
  };

  return line;
}

d3.svg.line = function() {
  return d3_svg_line(d3_identity);
};

// The default `x` property, which references d[0].
function d3_svg_lineX(d) {
  return d[0];
}

// The default `y` property, which references d[1].
function d3_svg_lineY(d) {
  return d[1];
}

// The various interpolators supported by the `line` class.
var d3_svg_lineInterpolators = d3.map({
  "linear": d3_svg_lineLinear,
  "linear-closed": d3_svg_lineLinearClosed,
  "step-before": d3_svg_lineStepBefore,
  "step-after": d3_svg_lineStepAfter,
  "basis": d3_svg_lineBasis,
  "basis-open": d3_svg_lineBasisOpen,
  "basis-closed": d3_svg_lineBasisClosed,
  "bundle": d3_svg_lineBundle,
  "cardinal": d3_svg_lineCardinal,
  "cardinal-open": d3_svg_lineCardinalOpen,
  "cardinal-closed": d3_svg_lineCardinalClosed,
  "monotone": d3_svg_lineMonotone
});

d3_svg_lineInterpolators.forEach(function(key, value) {
  value.key = key;
  value.closed = /-closed$/.test(key);
});

// Linear interpolation; generates "L" commands.
function d3_svg_lineLinear(points) {
  return points.join("L");
}

function d3_svg_lineLinearClosed(points) {
  return d3_svg_lineLinear(points) + "Z";
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStepBefore(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
  return path.join("");
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStepAfter(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
  return path.join("");
}

// Open cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinalOpen(points, tension) {
  return points.length < 4
      ? d3_svg_lineLinear(points)
      : points[1] + d3_svg_lineHermite(points.slice(1, points.length - 1),
        d3_svg_lineCardinalTangents(points, tension));
}

// Closed cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinalClosed(points, tension) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite((points.push(points[0]), points),
        d3_svg_lineCardinalTangents([points[points.length - 2]]
        .concat(points, [points[1]]), tension));
}

// Cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinal(points, tension, closed) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite(points,
        d3_svg_lineCardinalTangents(points, tension));
}

// Hermite spline construction; generates "C" commands.
function d3_svg_lineHermite(points, tangents) {
  if (tangents.length < 1
      || (points.length != tangents.length
      && points.length != tangents.length + 2)) {
    return d3_svg_lineLinear(points);
  }

  var quad = points.length != tangents.length,
      path = "",
      p0 = points[0],
      p = points[1],
      t0 = tangents[0],
      t = t0,
      pi = 1;

  if (quad) {
    path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3)
        + "," + p[0] + "," + p[1];
    p0 = points[1];
    pi = 2;
  }

  if (tangents.length > 1) {
    t = tangents[1];
    p = points[pi];
    pi++;
    path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1])
        + "," + (p[0] - t[0]) + "," + (p[1] - t[1])
        + "," + p[0] + "," + p[1];
    for (var i = 2; i < tangents.length; i++, pi++) {
      p = points[pi];
      t = tangents[i];
      path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1])
          + "," + p[0] + "," + p[1];
    }
  }

  if (quad) {
    var lp = points[pi];
    path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3)
        + "," + lp[0] + "," + lp[1];
  }

  return path;
}

// Generates tangents for a cardinal spline.
function d3_svg_lineCardinalTangents(points, tension) {
  var tangents = [],
      a = (1 - tension) / 2,
      p0,
      p1 = points[0],
      p2 = points[1],
      i = 1,
      n = points.length;
  while (++i < n) {
    p0 = p1;
    p1 = p2;
    p2 = points[i];
    tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
  }
  return tangents;
}

// B-spline interpolation; generates "C" commands.
function d3_svg_lineBasis(points) {
  if (points.length < 3) return d3_svg_lineLinear(points);
  var i = 1,
      n = points.length,
      pi = points[0],
      x0 = pi[0],
      y0 = pi[1],
      px = [x0, x0, x0, (pi = points[1])[0]],
      py = [y0, y0, y0, pi[1]],
      path = [x0, ",", y0];
  d3_svg_lineBasisBezier(path, px, py);
  while (++i < n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  i = -1;
  while (++i < 2) {
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

// Open B-spline interpolation; generates "C" commands.
function d3_svg_lineBasisOpen(points) {
  if (points.length < 4) return d3_svg_lineLinear(points);
  var path = [],
      i = -1,
      n = points.length,
      pi,
      px = [0],
      py = [0];
  while (++i < 3) {
    pi = points[i];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px)
    + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
  --i; while (++i < n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

// Closed B-spline interpolation; generates "C" commands.
function d3_svg_lineBasisClosed(points) {
  var path,
      i = -1,
      n = points.length,
      m = n + 4,
      pi,
      px = [],
      py = [];
  while (++i < 4) {
    pi = points[i % n];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path = [
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",",
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)
  ];
  --i; while (++i < m) {
    pi = points[i % n];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

function d3_svg_lineBundle(points, tension) {
  var n = points.length - 1;
  if (n) {
    var x0 = points[0][0],
        y0 = points[0][1],
        dx = points[n][0] - x0,
        dy = points[n][1] - y0,
        i = -1,
        p,
        t;
    while (++i <= n) {
      p = points[i];
      t = i / n;
      p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
      p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
    }
  }
  return d3_svg_lineBasis(points);
}

// Returns the dot product of the given four-element vectors.
function d3_svg_lineDot4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

// Matrix to transform basis (b-spline) control points to bezier
// control points. Derived from FvD 11.2.8.
var d3_svg_lineBasisBezier1 = [0, 2/3, 1/3, 0],
    d3_svg_lineBasisBezier2 = [0, 1/3, 2/3, 0],
    d3_svg_lineBasisBezier3 = [0, 1/6, 2/3, 1/6];

// Pushes a "C" Bézier curve onto the specified path array, given the
// two specified four-element arrays which define the control points.
function d3_svg_lineBasisBezier(path, x, y) {
  path.push(
      "C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
}

// Computes the slope from points p0 to p1.
function d3_svg_lineSlope(p0, p1) {
  return (p1[1] - p0[1]) / (p1[0] - p0[0]);
}

// Compute three-point differences for the given points.
// http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Finite_difference
function d3_svg_lineFiniteDifferences(points) {
  var i = 0,
      j = points.length - 1,
      m = [],
      p0 = points[0],
      p1 = points[1],
      d = m[0] = d3_svg_lineSlope(p0, p1);
  while (++i < j) {
    m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
  }
  m[i] = d;
  return m;
}

// Interpolates the given points using Fritsch-Carlson Monotone cubic Hermite
// interpolation. Returns an array of tangent vectors. For details, see
// http://en.wikipedia.org/wiki/Monotone_cubic_interpolation
function d3_svg_lineMonotoneTangents(points) {
  var tangents = [],
      d,
      a,
      b,
      s,
      m = d3_svg_lineFiniteDifferences(points),
      i = -1,
      j = points.length - 1;

  // The first two steps are done by computing finite-differences:
  // 1. Compute the slopes of the secant lines between successive points.
  // 2. Initialize the tangents at every point as the average of the secants.

  // Then, for each segment…
  while (++i < j) {
    d = d3_svg_lineSlope(points[i], points[i + 1]);

    // 3. If two successive yk = y{k + 1} are equal (i.e., d is zero), then set
    // mk = m{k + 1} = 0 as the spline connecting these points must be flat to
    // preserve monotonicity. Ignore step 4 and 5 for those k.

    if (Math.abs(d) < 1e-6) {
      m[i] = m[i + 1] = 0;
    } else {
      // 4. Let ak = mk / dk and bk = m{k + 1} / dk.
      a = m[i] / d;
      b = m[i + 1] / d;

      // 5. Prevent overshoot and ensure monotonicity by restricting the
      // magnitude of vector <ak, bk> to a circle of radius 3.
      s = a * a + b * b;
      if (s > 9) {
        s = d * 3 / Math.sqrt(s);
        m[i] = s * a;
        m[i + 1] = s * b;
      }
    }
  }

  // Compute the normalized tangent vector from the slopes. Note that if x is
  // not monotonic, it's possible that the slope will be infinite, so we protect
  // against NaN by setting the coordinate to zero.
  i = -1; while (++i <= j) {
    s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
    tangents.push([s || 0, m[i] * s || 0]);
  }

  return tangents;
}

function d3_svg_lineMonotone(points) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
}
d3.svg.line.radial = function() {
  var line = d3_svg_line(d3_svg_lineRadial);
  line.radius = line.x, delete line.x;
  line.angle = line.y, delete line.y;
  return line;
};

function d3_svg_lineRadial(points) {
  var point,
      i = -1,
      n = points.length,
      r,
      a;
  while (++i < n) {
    point = points[i];
    r = point[0];
    a = point[1] + d3_svg_arcOffset;
    point[0] = r * Math.cos(a);
    point[1] = r * Math.sin(a);
  }
  return points;
}
function d3_svg_area(projection) {
  var x0 = d3_svg_lineX,
      x1 = d3_svg_lineX,
      y0 = 0,
      y1 = d3_svg_lineY,
      defined = d3_true,
      interpolate = d3_svg_lineLinear,
      interpolateKey = interpolate.key,
      interpolateReverse = interpolate,
      L = "L",
      tension = .7;

  function area(data) {
    var segments = [],
        points0 = [],
        points1 = [],
        i = -1,
        n = data.length,
        d,
        fx0 = d3_functor(x0),
        fy0 = d3_functor(y0),
        fx1 = x0 === x1 ? function() { return x; } : d3_functor(x1),
        fy1 = y0 === y1 ? function() { return y; } : d3_functor(y1),
        x,
        y;

    function segment() {
      segments.push("M", interpolate(projection(points1), tension),
          L, interpolateReverse(projection(points0.reverse()), tension),
          "Z");
    }

    while (++i < n) {
      if (defined.call(this, d = data[i], i)) {
        points0.push([x = +fx0.call(this, d, i), y = +fy0.call(this, d, i)]);
        points1.push([+fx1.call(this, d, i), +fy1.call(this, d, i)]);
      } else if (points0.length) {
        segment();
        points0 = [];
        points1 = [];
      }
    }

    if (points0.length) segment();

    return segments.length ? segments.join("") : null;
  }

  area.x = function(_) {
    if (!arguments.length) return x1;
    x0 = x1 = _;
    return area;
  };

  area.x0 = function(_) {
    if (!arguments.length) return x0;
    x0 = _;
    return area;
  };

  area.x1 = function(_) {
    if (!arguments.length) return x1;
    x1 = _;
    return area;
  };

  area.y = function(_) {
    if (!arguments.length) return y1;
    y0 = y1 = _;
    return area;
  };

  area.y0 = function(_) {
    if (!arguments.length) return y0;
    y0 = _;
    return area;
  };

  area.y1 = function(_) {
    if (!arguments.length) return y1;
    y1 = _;
    return area;
  };

  area.defined  = function(_) {
    if (!arguments.length) return defined;
    defined = _;
    return area;
  };

  area.interpolate = function(_) {
    if (!arguments.length) return interpolateKey;
    if (typeof _ === "function") interpolateKey = interpolate = _;
    else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
    interpolateReverse = interpolate.reverse || interpolate;
    L = interpolate.closed ? "M" : "L";
    return area;
  };

  area.tension = function(_) {
    if (!arguments.length) return tension;
    tension = _;
    return area;
  };

  return area;
}

d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;

d3.svg.area = function() {
  return d3_svg_area(d3_identity);
};
d3.svg.area.radial = function() {
  var area = d3_svg_area(d3_svg_lineRadial);
  area.radius = area.x, delete area.x;
  area.innerRadius = area.x0, delete area.x0;
  area.outerRadius = area.x1, delete area.x1;
  area.angle = area.y, delete area.y;
  area.startAngle = area.y0, delete area.y0;
  area.endAngle = area.y1, delete area.y1;
  return area;
};
d3.svg.chord = function() {
  var source = d3_svg_chordSource,
      target = d3_svg_chordTarget,
      radius = d3_svg_chordRadius,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  // TODO Allow control point to be customized.

  function chord(d, i) {
    var s = subgroup(this, source, d, i),
        t = subgroup(this, target, d, i);
    return "M" + s.p0
      + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t)
      ? curve(s.r, s.p1, s.r, s.p0)
      : curve(s.r, s.p1, t.r, t.p0)
      + arc(t.r, t.p1, t.a1 - t.a0)
      + curve(t.r, t.p1, s.r, s.p0))
      + "Z";
  }

  function subgroup(self, f, d, i) {
    var subgroup = f.call(self, d, i),
        r = radius.call(self, subgroup, i),
        a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset,
        a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
    return {
      r: r,
      a0: a0,
      a1: a1,
      p0: [r * Math.cos(a0), r * Math.sin(a0)],
      p1: [r * Math.cos(a1), r * Math.sin(a1)]
    };
  }

  function equals(a, b) {
    return a.a0 == b.a0 && a.a1 == b.a1;
  }

  function arc(r, p, a) {
    return "A" + r + "," + r + " 0 " + +(a > Math.PI) + ",1 " + p;
  }

  function curve(r0, p0, r1, p1) {
    return "Q 0,0 " + p1;
  }

  chord.radius = function(v) {
    if (!arguments.length) return radius;
    radius = d3_functor(v);
    return chord;
  };

  chord.source = function(v) {
    if (!arguments.length) return source;
    source = d3_functor(v);
    return chord;
  };

  chord.target = function(v) {
    if (!arguments.length) return target;
    target = d3_functor(v);
    return chord;
  };

  chord.startAngle = function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3_functor(v);
    return chord;
  };

  chord.endAngle = function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3_functor(v);
    return chord;
  };

  return chord;
};

function d3_svg_chordSource(d) {
  return d.source;
}

function d3_svg_chordTarget(d) {
  return d.target;
}

function d3_svg_chordRadius(d) {
  return d.radius;
}

function d3_svg_chordStartAngle(d) {
  return d.startAngle;
}

function d3_svg_chordEndAngle(d) {
  return d.endAngle;
}
d3.svg.diagonal = function() {
  var source = d3_svg_chordSource,
      target = d3_svg_chordTarget,
      projection = d3_svg_diagonalProjection;

  function diagonal(d, i) {
    var p0 = source.call(this, d, i),
        p3 = target.call(this, d, i),
        m = (p0.y + p3.y) / 2,
        p = [p0, {x: p0.x, y: m}, {x: p3.x, y: m}, p3];
    p = p.map(projection);
    return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
  }

  diagonal.source = function(x) {
    if (!arguments.length) return source;
    source = d3_functor(x);
    return diagonal;
  };

  diagonal.target = function(x) {
    if (!arguments.length) return target;
    target = d3_functor(x);
    return diagonal;
  };

  diagonal.projection = function(x) {
    if (!arguments.length) return projection;
    projection = x;
    return diagonal;
  };

  return diagonal;
};

function d3_svg_diagonalProjection(d) {
  return [d.x, d.y];
}
d3.svg.diagonal.radial = function() {
  var diagonal = d3.svg.diagonal(),
      projection = d3_svg_diagonalProjection,
      projection_ = diagonal.projection;

  diagonal.projection = function(x) {
    return arguments.length
        ? projection_(d3_svg_diagonalRadialProjection(projection = x))
        : projection;
  };

  return diagonal;
};

function d3_svg_diagonalRadialProjection(projection) {
  return function() {
    var d = projection.apply(this, arguments),
        r = d[0],
        a = d[1] + d3_svg_arcOffset;
    return [r * Math.cos(a), r * Math.sin(a)];
  };
}
d3.svg.mouse = d3.mouse;
d3.svg.touches = d3.touches;
d3.svg.symbol = function() {
  var type = d3_svg_symbolType,
      size = d3_svg_symbolSize;

  function symbol(d, i) {
    return (d3_svg_symbols.get(type.call(this, d, i))
        || d3_svg_symbolCircle)
        (size.call(this, d, i));
  }

  symbol.type = function(x) {
    if (!arguments.length) return type;
    type = d3_functor(x);
    return symbol;
  };

  // size of symbol in square pixels
  symbol.size = function(x) {
    if (!arguments.length) return size;
    size = d3_functor(x);
    return symbol;
  };

  return symbol;
};

function d3_svg_symbolSize() {
  return 64;
}

function d3_svg_symbolType() {
  return "circle";
}

function d3_svg_symbolCircle(size) {
  var r = Math.sqrt(size / Math.PI);
  return "M0," + r
      + "A" + r + "," + r + " 0 1,1 0," + (-r)
      + "A" + r + "," + r + " 0 1,1 0," + r
      + "Z";
}

// TODO cross-diagonal?
var d3_svg_symbols = d3.map({
  "circle": d3_svg_symbolCircle,
  "cross": function(size) {
    var r = Math.sqrt(size / 5) / 2;
    return "M" + -3 * r + "," + -r
        + "H" + -r
        + "V" + -3 * r
        + "H" + r
        + "V" + -r
        + "H" + 3 * r
        + "V" + r
        + "H" + r
        + "V" + 3 * r
        + "H" + -r
        + "V" + r
        + "H" + -3 * r
        + "Z";
  },
  "diamond": function(size) {
    var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)),
        rx = ry * d3_svg_symbolTan30;
    return "M0," + -ry
        + "L" + rx + ",0"
        + " 0," + ry
        + " " + -rx + ",0"
        + "Z";
  },
  "square": function(size) {
    var r = Math.sqrt(size) / 2;
    return "M" + -r + "," + -r
        + "L" + r + "," + -r
        + " " + r + "," + r
        + " " + -r + "," + r
        + "Z";
  },
  "triangle-down": function(size) {
    var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
        ry = rx * d3_svg_symbolSqrt3 / 2;
    return "M0," + ry
        + "L" + rx +"," + -ry
        + " " + -rx + "," + -ry
        + "Z";
  },
  "triangle-up": function(size) {
    var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
        ry = rx * d3_svg_symbolSqrt3 / 2;
    return "M0," + -ry
        + "L" + rx +"," + ry
        + " " + -rx + "," + ry
        + "Z";
  }
});

d3.svg.symbolTypes = d3_svg_symbols.keys();

var d3_svg_symbolSqrt3 = Math.sqrt(3),
    d3_svg_symbolTan30 = Math.tan(30 * Math.PI / 180);
d3.svg.axis = function() {
  var scale = d3.scale.linear(),
      orient = "bottom",
      tickMajorSize = 6,
      tickMinorSize = 6,
      tickEndSize = 6,
      tickPadding = 3,
      tickArguments_ = [10],
      tickValues = null,
      tickFormat_,
      tickSubdivide = 0;

  function axis(g) {
    g.each(function() {
      var g = d3.select(this);

      // Ticks, or domain values for ordinal scales.
      var ticks = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain()) : tickValues,
          tickFormat = tickFormat_ == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments_) : String) : tickFormat_;

      // Minor ticks.
      var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide),
          subtick = g.selectAll(".minor").data(subticks, String),
          subtickEnter = subtick.enter().insert("line", "g").attr("class", "tick minor").style("opacity", 1e-6),
          subtickExit = d3.transition(subtick.exit()).style("opacity", 1e-6).remove(),
          subtickUpdate = d3.transition(subtick).style("opacity", 1);

      // Major ticks.
      var tick = g.selectAll("g").data(ticks, String),
          tickEnter = tick.enter().insert("g", "path").style("opacity", 1e-6),
          tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(),
          tickUpdate = d3.transition(tick).style("opacity", 1),
          tickTransform;

      // Domain.
      var range = d3_scaleRange(scale),
          path = g.selectAll(".domain").data([0]),
          pathEnter = path.enter().append("path").attr("class", "domain"),
          pathUpdate = d3.transition(path);

      // Stash a snapshot of the new scale, and retrieve the old snapshot.
      var scale1 = scale.copy(),
          scale0 = this.__chart__ || scale1;
      this.__chart__ = scale1;

      tickEnter.append("line").attr("class", "tick");
      tickEnter.append("text");

      var lineEnter = tickEnter.select("line"),
          lineUpdate = tickUpdate.select("line"),
          text = tick.select("text").text(tickFormat),
          textEnter = tickEnter.select("text"),
          textUpdate = tickUpdate.select("text");

      switch (orient) {
        case "bottom": {
          tickTransform = d3_svg_axisX;
          subtickEnter.attr("y2", tickMinorSize);
          subtickUpdate.attr("x2", 0).attr("y2", tickMinorSize);
          lineEnter.attr("y2", tickMajorSize);
          textEnter.attr("y", Math.max(tickMajorSize, 0) + tickPadding);
          lineUpdate.attr("x2", 0).attr("y2", tickMajorSize);
          textUpdate.attr("x", 0).attr("y", Math.max(tickMajorSize, 0) + tickPadding);
          text.attr("dy", ".71em").attr("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
          break;
        }
        case "top": {
          tickTransform = d3_svg_axisX;
          subtickEnter.attr("y2", -tickMinorSize);
          subtickUpdate.attr("x2", 0).attr("y2", -tickMinorSize);
          lineEnter.attr("y2", -tickMajorSize);
          textEnter.attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
          lineUpdate.attr("x2", 0).attr("y2", -tickMajorSize);
          textUpdate.attr("x", 0).attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
          text.attr("dy", "0em").attr("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize);
          break;
        }
        case "left": {
          tickTransform = d3_svg_axisY;
          subtickEnter.attr("x2", -tickMinorSize);
          subtickUpdate.attr("x2", -tickMinorSize).attr("y2", 0);
          lineEnter.attr("x2", -tickMajorSize);
          textEnter.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding));
          lineUpdate.attr("x2", -tickMajorSize).attr("y2", 0);
          textUpdate.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("y", 0);
          text.attr("dy", ".32em").attr("text-anchor", "end");
          pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
          break;
        }
        case "right": {
          tickTransform = d3_svg_axisY;
          subtickEnter.attr("x2", tickMinorSize);
          subtickUpdate.attr("x2", tickMinorSize).attr("y2", 0);
          lineEnter.attr("x2", tickMajorSize);
          textEnter.attr("x", Math.max(tickMajorSize, 0) + tickPadding);
          lineUpdate.attr("x2", tickMajorSize).attr("y2", 0);
          textUpdate.attr("x", Math.max(tickMajorSize, 0) + tickPadding).attr("y", 0);
          text.attr("dy", ".32em").attr("text-anchor", "start");
          pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize);
          break;
        }
      }

      // For quantitative scales:
      // - enter new ticks from the old scale
      // - exit old ticks to the new scale
      if (scale.ticks) {
        tickEnter.call(tickTransform, scale0);
        tickUpdate.call(tickTransform, scale1);
        tickExit.call(tickTransform, scale1);
        subtickEnter.call(tickTransform, scale0);
        subtickUpdate.call(tickTransform, scale1);
        subtickExit.call(tickTransform, scale1);
      }

      // For ordinal scales:
      // - any entering ticks are undefined in the old scale
      // - any exiting ticks are undefined in the new scale
      // Therefore, we only need to transition updating ticks.
      else {
        var dx = scale1.rangeBand() / 2, x = function(d) { return scale1(d) + dx; };
        tickEnter.call(tickTransform, x);
        tickUpdate.call(tickTransform, x);
      }
    });
  }

  axis.scale = function(x) {
    if (!arguments.length) return scale;
    scale = x;
    return axis;
  };

  axis.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    return axis;
  };

  axis.ticks = function() {
    if (!arguments.length) return tickArguments_;
    tickArguments_ = arguments;
    return axis;
  };

  axis.tickValues = function(x) {
    if (!arguments.length) return tickValues;
    tickValues = x;
    return axis;
  };

  axis.tickFormat = function(x) {
    if (!arguments.length) return tickFormat_;
    tickFormat_ = x;
    return axis;
  };

  axis.tickSize = function(x, y, z) {
    if (!arguments.length) return tickMajorSize;
    var n = arguments.length - 1;
    tickMajorSize = +x;
    tickMinorSize = n > 1 ? +y : tickMajorSize;
    tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
    return axis;
  };

  axis.tickPadding = function(x) {
    if (!arguments.length) return tickPadding;
    tickPadding = +x;
    return axis;
  };

  axis.tickSubdivide = function(x) {
    if (!arguments.length) return tickSubdivide;
    tickSubdivide = +x;
    return axis;
  };

  return axis;
};

function d3_svg_axisX(selection, x) {
  selection.attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
}

function d3_svg_axisY(selection, y) {
  selection.attr("transform", function(d) { return "translate(0," + y(d) + ")"; });
}

function d3_svg_axisSubdivide(scale, ticks, m) {
  subticks = [];
  if (m && ticks.length > 1) {
    var extent = d3_scaleExtent(scale.domain()),
        subticks,
        i = -1,
        n = ticks.length,
        d = (ticks[1] - ticks[0]) / ++m,
        j,
        v;
    while (++i < n) {
      for (j = m; --j > 0;) {
        if ((v = +ticks[i] - j * d) >= extent[0]) {
          subticks.push(v);
        }
      }
    }
    for (--i, j = 0; ++j < m && (v = +ticks[i] + j * d) < extent[1];) {
      subticks.push(v);
    }
  }
  return subticks;
}
d3.svg.brush = function() {
  var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"),
      x = null, // x-scale, optional
      y = null, // y-scale, optional
      resizes = d3_svg_brushResizes[0],
      extent = [[0, 0], [0, 0]], // [x0, y0], [x1, y1], in pixels (integers)
      extentDomain; // the extent in data space, lazily created

  function brush(g) {
    g.each(function() {
      var g = d3.select(this),
          bg = g.selectAll(".background").data([0]),
          fg = g.selectAll(".extent").data([0]),
          tz = g.selectAll(".resize").data(resizes, String),
          e;

      // Prepare the brush container for events.
      g
          .style("pointer-events", "all")
          .on("mousedown.brush", brushstart)
          .on("touchstart.brush", brushstart);

      // An invisible, mouseable area for starting a new brush.
      bg.enter().append("rect")
          .attr("class", "background")
          .style("visibility", "hidden")
          .style("cursor", "crosshair");

      // The visible brush extent; style this as you like!
      fg.enter().append("rect")
          .attr("class", "extent")
          .style("cursor", "move");

      // More invisible rects for resizing the extent.
      tz.enter().append("g")
          .attr("class", function(d) { return "resize " + d; })
          .style("cursor", function(d) { return d3_svg_brushCursor[d]; })
        .append("rect")
          .attr("x", function(d) { return /[ew]$/.test(d) ? -3 : null; })
          .attr("y", function(d) { return /^[ns]/.test(d) ? -3 : null; })
          .attr("width", 6)
          .attr("height", 6)
          .style("visibility", "hidden");

      // Show or hide the resizers.
      tz.style("display", brush.empty() ? "none" : null);

      // Remove any superfluous resizers.
      tz.exit().remove();

      // Initialize the background to fill the defined range.
      // If the range isn't defined, you can post-process.
      if (x) {
        e = d3_scaleRange(x);
        bg.attr("x", e[0]).attr("width", e[1] - e[0]);
        redrawX(g);
      }
      if (y) {
        e = d3_scaleRange(y);
        bg.attr("y", e[0]).attr("height", e[1] - e[0]);
        redrawY(g);
      }
      redraw(g);
    });
  }

  function redraw(g) {
    g.selectAll(".resize").attr("transform", function(d) {
      return "translate(" + extent[+/e$/.test(d)][0] + "," + extent[+/^s/.test(d)][1] + ")";
    });
  }

  function redrawX(g) {
    g.select(".extent").attr("x", extent[0][0]);
    g.selectAll(".extent,.n>rect,.s>rect").attr("width", extent[1][0] - extent[0][0]);
  }

  function redrawY(g) {
    g.select(".extent").attr("y", extent[0][1]);
    g.selectAll(".extent,.e>rect,.w>rect").attr("height", extent[1][1] - extent[0][1]);
  }

  function brushstart() {
    var target = this,
        eventTarget = d3.select(d3.event.target),
        event_ = event.of(target, arguments),
        g = d3.select(target),
        resizing = eventTarget.datum(),
        resizingX = !/^(n|s)$/.test(resizing) && x,
        resizingY = !/^(e|w)$/.test(resizing) && y,
        dragging = eventTarget.classed("extent"),
        center,
        origin = mouse(),
        offset;

    var w = d3.select(window)
        .on("mousemove.brush", brushmove)
        .on("mouseup.brush", brushend)
        .on("touchmove.brush", brushmove)
        .on("touchend.brush", brushend)
        .on("keydown.brush", keydown)
        .on("keyup.brush", keyup);

    // If the extent was clicked on, drag rather than brush;
    // store the point between the mouse and extent origin instead.
    if (dragging) {
      origin[0] = extent[0][0] - origin[0];
      origin[1] = extent[0][1] - origin[1];
    }

    // If a resizer was clicked on, record which side is to be resized.
    // Also, set the origin to the opposite side.
    else if (resizing) {
      var ex = +/w$/.test(resizing),
          ey = +/^n/.test(resizing);
      offset = [extent[1 - ex][0] - origin[0], extent[1 - ey][1] - origin[1]];
      origin[0] = extent[ex][0];
      origin[1] = extent[ey][1];
    }

    // If the ALT key is down when starting a brush, the center is at the mouse.
    else if (d3.event.altKey) center = origin.slice();

    // Propagate the active cursor to the body for the drag duration.
    g.style("pointer-events", "none").selectAll(".resize").style("display", null);
    d3.select("body").style("cursor", eventTarget.style("cursor"));

    // Notify listeners.
    event_({type: "brushstart"});
    brushmove();
    d3_eventCancel();

    function mouse() {
      var touches = d3.event.changedTouches;
      return touches ? d3.touches(target, touches)[0] : d3.mouse(target);
    }

    function keydown() {
      if (d3.event.keyCode == 32) {
        if (!dragging) {
          center = null;
          origin[0] -= extent[1][0];
          origin[1] -= extent[1][1];
          dragging = 2;
        }
        d3_eventCancel();
      }
    }

    function keyup() {
      if (d3.event.keyCode == 32 && dragging == 2) {
        origin[0] += extent[1][0];
        origin[1] += extent[1][1];
        dragging = 0;
        d3_eventCancel();
      }
    }

    function brushmove() {
      var point = mouse(),
          moved = false;

      // Preserve the offset for thick resizers.
      if (offset) {
        point[0] += offset[0];
        point[1] += offset[1];
      }

      if (!dragging) {

        // If needed, determine the center from the current extent.
        if (d3.event.altKey) {
          if (!center) center = [(extent[0][0] + extent[1][0]) / 2, (extent[0][1] + extent[1][1]) / 2];

          // Update the origin, for when the ALT key is released.
          origin[0] = extent[+(point[0] < center[0])][0];
          origin[1] = extent[+(point[1] < center[1])][1];
        }

        // When the ALT key is released, we clear the center.
        else center = null;
      }

      // Update the brush extent for each dimension.
      if (resizingX && move1(point, x, 0)) {
        redrawX(g);
        moved = true;
      }
      if (resizingY && move1(point, y, 1)) {
        redrawY(g);
        moved = true;
      }

      // Final redraw and notify listeners.
      if (moved) {
        redraw(g);
        event_({type: "brush", mode: dragging ? "move" : "resize"});
      }
    }

    function move1(point, scale, i) {
      var range = d3_scaleRange(scale),
          r0 = range[0],
          r1 = range[1],
          position = origin[i],
          size = extent[1][i] - extent[0][i],
          min,
          max;

      // When dragging, reduce the range by the extent size and position.
      if (dragging) {
        r0 -= position;
        r1 -= size + position;
      }

      // Clamp the point so that the extent fits within the range extent.
      min = Math.max(r0, Math.min(r1, point[i]));

      // Compute the new extent bounds.
      if (dragging) {
        max = (min += position) + size;
      } else {

        // If the ALT key is pressed, then preserve the center of the extent.
        if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));

        // Compute the min and max of the position and point.
        if (position < min) {
          max = min;
          min = position;
        } else {
          max = position;
        }
      }

      // Update the stored bounds.
      if (extent[0][i] !== min || extent[1][i] !== max) {
        extentDomain = null;
        extent[0][i] = min;
        extent[1][i] = max;
        return true;
      }
    }

    function brushend() {
      brushmove();

      // reset the cursor styles
      g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
      d3.select("body").style("cursor", null);

      w .on("mousemove.brush", null)
        .on("mouseup.brush", null)
        .on("touchmove.brush", null)
        .on("touchend.brush", null)
        .on("keydown.brush", null)
        .on("keyup.brush", null);

      event_({type: "brushend"});
      d3_eventCancel();
    }
  }

  brush.x = function(z) {
    if (!arguments.length) return x;
    x = z;
    resizes = d3_svg_brushResizes[!x << 1 | !y]; // fore!
    return brush;
  };

  brush.y = function(z) {
    if (!arguments.length) return y;
    y = z;
    resizes = d3_svg_brushResizes[!x << 1 | !y]; // fore!
    return brush;
  };

  brush.extent = function(z) {
    var x0, x1, y0, y1, t;

    // Invert the pixel extent to data-space.
    if (!arguments.length) {
      z = extentDomain || extent;
      if (x) {
        x0 = z[0][0], x1 = z[1][0];
        if (!extentDomain) {
          x0 = extent[0][0], x1 = extent[1][0];
          if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
          if (x1 < x0) t = x0, x0 = x1, x1 = t;
        }
      }
      if (y) {
        y0 = z[0][1], y1 = z[1][1];
        if (!extentDomain) {
          y0 = extent[0][1], y1 = extent[1][1];
          if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
          if (y1 < y0) t = y0, y0 = y1, y1 = t;
        }
      }
      return x && y ? [[x0, y0], [x1, y1]] : x ? [x0, x1] : y && [y0, y1];
    }

    // Scale the data-space extent to pixels.
    extentDomain = [[0, 0], [0, 0]];
    if (x) {
      x0 = z[0], x1 = z[1];
      if (y) x0 = x0[0], x1 = x1[0];
      extentDomain[0][0] = x0, extentDomain[1][0] = x1;
      if (x.invert) x0 = x(x0), x1 = x(x1);
      if (x1 < x0) t = x0, x0 = x1, x1 = t;
      extent[0][0] = x0 | 0, extent[1][0] = x1 | 0;
    }
    if (y) {
      y0 = z[0], y1 = z[1];
      if (x) y0 = y0[1], y1 = y1[1];
      extentDomain[0][1] = y0, extentDomain[1][1] = y1;
      if (y.invert) y0 = y(y0), y1 = y(y1);
      if (y1 < y0) t = y0, y0 = y1, y1 = t;
      extent[0][1] = y0 | 0, extent[1][1] = y1 | 0;
    }

    return brush;
  };

  brush.clear = function() {
    extentDomain = null;
    extent[0][0] =
    extent[0][1] =
    extent[1][0] =
    extent[1][1] = 0;
    return brush;
  };

  brush.empty = function() {
    return (x && extent[0][0] === extent[1][0])
        || (y && extent[0][1] === extent[1][1]);
  };

  return d3.rebind(brush, event, "on");
};

var d3_svg_brushCursor = {
  n: "ns-resize",
  e: "ew-resize",
  s: "ns-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  ne: "nesw-resize",
  se: "nwse-resize",
  sw: "nesw-resize"
};

var d3_svg_brushResizes = [
  ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
  ["e", "w"],
  ["n", "s"],
  []
];
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


(function(defaultGetComputedStyle) {
  // If we don't have window.getComputedStyle, as in IE7,
  // make a pretend one.
  if (typeof defaultGetComputedStyle === "undefined") {
    defaultGetComputedStyle = function(el, pseudo) {
      this.el = el;
      this.getPropertyValue = function(prop) {
        var re = /(\-([a-z]){1})/g;
        if (prop == 'float') prop = 'styleFloat';
        if (re.test(prop)) {
          prop = prop.replace(re, function () {
            return arguments[2].toUpperCase();
          });
        }
        return el.currentStyle[prop] ? el.currentStyle[prop] : null;
      }
      return this;
    };
  }
  
  window.getComputedStyle = function(node) {
    // Override for Raphael
    if (node && node.paper) {
      return {
        getPropertyValue: function(name) {
          return node.attr(name);
        }
      };
    }
    
    return defaultGetComputedStyle.apply(window, arguments);
  };
}(window.getComputedStyle));

// Register SVG elements with IE so they can be styled
(function() {
  var svgElements = 'circle ellipse line polygon polyline rect g svg image path text'.split(' '); 
    
  if (Raphael.svg) return;
  for (var i=0; i< svgElements.length; i++) {
    document.createElement(svgElements[i]);
  }
})();


function lineAttribute(name) {
  return function(value) {
    var attrs = this.data('lineAttrs');

    // Isn't a line, return;
    if (!attrs) return;

    if (arguments.length < 1) {
      return attrs[name];
    }

    attrs[name] = parseInt(value, 10);
    if (!isNaN(attrs.x1) && !isNaN(attrs.y1) && !isNaN(attrs.x2) && !isNaN(attrs.y2)) {
      this.attr('path', 'M' + attrs.x1 + ' ' + attrs.y1 + 'L' + attrs.x2 + ' ' + attrs.y2 + 'Z');
    } else {
      this.attr('path', null);
    }
  };
}


function appendRaphael(parent) {
  var paper =  Raphael(parent, 0, 0);

  paper.__attrs = { width: 0, height: 0 };
  
  paper.shadowDom = document.createElement('svg');
  paper.shadowDom.style.display = 'none';
  parent.appendChild(paper.shadowDom);

  paper.ca.d = function(path) {
    return { path: path };
  };

  paper.ca.x1 = lineAttribute('x1');
  paper.ca.x2 = lineAttribute('x2');
  paper.ca.y1 = lineAttribute('y1');
  paper.ca.y2 = lineAttribute('y2');

  // Fool sizzle into thinking the paper is an element
  paper.nodeType = 1;
  paper.nodeName = 'object';

  paper.r2d3Elements = {};

  return paper;
}

//========================================
// Paper Extensions

Raphael.fn.removeChild = function(el) {
  el.shadowDom.parentNode.removeChild(el.shadowDom)
  el.remove();
};


Raphael.fn.line = function () {
  var line =  this.path();
  line.data('lineAttrs', { x1: 0, y1: 0, x2: 0, y2: 0 });
  return line;
};


Raphael.fn.img = function() {
  // IE8 turns image nodes into img
  return this.image();
};


Raphael.fn.g = function() {
  return this.set();
};


Raphael.fn.getAttribute = function(name) {
  return this.__attrs[name];
};


Raphael.fn.setAttribute = function(name, value) {
  this.__attrs[name] = value;

  if (name === 'height' || name === 'width') {
    this.setSize(this.__attrs.width, this.__attrs.height);
  }
};


Raphael.fn.getElementsByClassName = function(selector) {
  return this.getR2D3Elements(Sizzle(selector, this.shadowDom));
};


Raphael.fn.getElementsByTagName = function(tag) {
  return this.getR2D3Elements(this.shadowDom.getElementsByTagName(tag));
};


Raphael.fn.appendChild = function(childNode) {
  var node = this.buildElement(childNode);
  if (node) {
    this.shadowDom.appendChild(childNode);
    node.updateStyle(); //  Apply CSS styles
  }
  return node;
};


Raphael.fn.buildElement = function(childNode) {
  var type = childNode && childNode.nodeName,
      node =  type ? this[type.toLowerCase()]() : null;
      
  if (node) {
    // Ensure Paper can be referenced from sets
    node.shadowDom = childNode
    node.parentNode = this;
    // Link the shadowDOM node by the Raphael id.
    node.shadowDom.r2d3 = true;
    node.shadowDom.r2d3id = r2d3UID();
    node.paper = this;
    node.tagName = type.toLowerCase();
		node.style = new ElementStyle(node);
  
    r2d3Elements[node.shadowDom.r2d3id] = node;
  }
  return node;
}

Raphael.fn.getR2D3Elements = function(domNodes) {
  var r2d3Matches = [];
  
  // Convert DOM matches to R2D3 elements
  for (var i=0; i<domNodes.length; i++) {
    var element = r2d3Elements[domNodes[i].id];
    if (element) {
      r2d3Matches.push(element);
    }
  }
  
  return r2d3Matches;
}

var r2d3Elements = {};

var r2d3UID = (function() {
  var id = 0;
  return function() {
    return id++;
  };
}());

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
};//========================================
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
//========================================
// Parse Transform String
// Converts transform functions to raphael transform strings, ie translate(x,y) => tx,y

var rParseTransformString = Raphael.parseTransformString;
Raphael.parseTransformString = function(TString) {
if(/translate|rotate|scale/i.test(TString)) TString = toRTransformString(TString);
return rParseTransformString(TString);
};

function toRTransformString(TString) {
return TString.replace(/translate\(/gi, "t")
              .replace(/rotate\(/gi, "r")
              .replace(/scale\(/gi, "s")
              .replace(/[)]/g, "");
};
d3.behavior = {};
d3.behavior.drag = function() {
  var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"),
      origin = null;

  function drag() {
    this.on("mousedown.drag", mousedown)
        .on("touchstart.drag", mousedown);
  }

  function mousedown() {
    var target = this,
        event_ = event.of(target, arguments),
        eventTarget = d3.event.target,
        touchId = d3.event.touches && d3.event.changedTouches[0].identifier,
        offset,
        origin_ = point(),
        moved = 0;

    var w = d3.select(window)
        .on(touchId ? "touchmove.drag-" + touchId : "mousemove.drag", dragmove)
        .on(touchId ? "touchend.drag-" + touchId : "mouseup.drag", dragend, true);

    if (origin) {
      offset = origin.apply(target, arguments);
      offset = [offset.x - origin_[0], offset.y - origin_[1]];
    } else {
      offset = [0, 0];
    }

    // Only cancel mousedown; touchstart is needed for draggable links.
    if (!touchId) d3_eventCancel();
    event_({type: "dragstart"});

    function point() {
      var p = target.parentNode;
      return touchId
          ? d3.touches(p).filter(function(p) { return p.identifier === touchId; })[0]
          : d3.mouse(p);
    }

    function dragmove() {
      if (!target.parentNode) return dragend(); // target removed from DOM

      var p = point(),
          dx = p[0] - origin_[0],
          dy = p[1] - origin_[1];

      moved |= dx | dy;
      origin_ = p;
      d3_eventCancel();

      event_({type: "drag", x: p[0] + offset[0], y: p[1] + offset[1], dx: dx, dy: dy});
    }

    function dragend() {
      event_({type: "dragend"});

      // if moved, prevent the mouseup (and possibly click) from propagating
      if (moved) {
        d3_eventCancel();
        if (d3.event.target === eventTarget) w.on("click.drag", click, true);
      }

      w .on(touchId ? "touchmove.drag-" + touchId : "mousemove.drag", null)
        .on(touchId ? "touchend.drag-" + touchId : "mouseup.drag", null);
    }

    // prevent the subsequent click from propagating (e.g., for anchors)
    function click() {
      d3_eventCancel();
      w.on("click.drag", null);
    }
  }

  drag.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    return drag;
  };

  return d3.rebind(drag, event, "on");
};
d3.behavior.zoom = function() {
  var translate = [0, 0],
      translate0, // translate when we started zooming (to avoid drift)
      scale = 1,
      scale0, // scale when we started touching
      scaleExtent = d3_behavior_zoomInfinity,
      event = d3_eventDispatch(zoom, "zoom"),
      x0,
      x1,
      y0,
      y1,
      touchtime; // time of last touchstart (to detect double-tap)

  function zoom() {
    this
        .on("mousedown.zoom", mousedown)
        .on("mousewheel.zoom", mousewheel)
        .on("mousemove.zoom", mousemove)
        .on("DOMMouseScroll.zoom", mousewheel)
        .on("dblclick.zoom", dblclick)
        .on("touchstart.zoom", touchstart)
        .on("touchmove.zoom", touchmove)
        .on("touchend.zoom", touchstart);
  }

  zoom.translate = function(x) {
    if (!arguments.length) return translate;
    translate = x.map(Number);
    return zoom;
  };

  zoom.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return zoom;
  };

  zoom.scaleExtent = function(x) {
    if (!arguments.length) return scaleExtent;
    scaleExtent = x == null ? d3_behavior_zoomInfinity : x.map(Number);
    return zoom;
  };

  zoom.x = function(z) {
    if (!arguments.length) return x1;
    x1 = z;
    x0 = z.copy();
    return zoom;
  };

  zoom.y = function(z) {
    if (!arguments.length) return y1;
    y1 = z;
    y0 = z.copy();
    return zoom;
  };

  function location(p) {
    return [(p[0] - translate[0]) / scale, (p[1] - translate[1]) / scale];
  }

  function point(l) {
    return [l[0] * scale + translate[0], l[1] * scale + translate[1]];
  }

  function scaleTo(s) {
    scale = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
  }

  function translateTo(p, l) {
    l = point(l);
    translate[0] += p[0] - l[0];
    translate[1] += p[1] - l[1];
  }

  function dispatch(event) {
    if (x1) x1.domain(x0.range().map(function(x) { return (x - translate[0]) / scale; }).map(x0.invert));
    if (y1) y1.domain(y0.range().map(function(y) { return (y - translate[1]) / scale; }).map(y0.invert));
    d3.event.preventDefault();
    event({type: "zoom", scale: scale, translate: translate});
  }

  function mousedown() {
    var target = this,
        event_ = event.of(target, arguments),
        eventTarget = d3.event.target,
        moved = 0,
        w = d3.select(window).on("mousemove.zoom", mousemove).on("mouseup.zoom", mouseup),
        l = location(d3.mouse(target));

    window.focus();
    d3_eventCancel();

    function mousemove() {
      moved = 1;
      translateTo(d3.mouse(target), l);
      dispatch(event_);
    }

    function mouseup() {
      if (moved) d3_eventCancel();
      w.on("mousemove.zoom", null).on("mouseup.zoom", null);
      if (moved && d3.event.target === eventTarget) w.on("click.zoom", click, true);
    }

    function click() {
      d3_eventCancel();
      w.on("click.zoom", null);
    }
  }

  function mousewheel() {
    if (!translate0) translate0 = location(d3.mouse(this));
    scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * scale);
    translateTo(d3.mouse(this), translate0);
    dispatch(event.of(this, arguments));
  }

  function mousemove() {
    translate0 = null;
  }

  function dblclick() {
    var p = d3.mouse(this), l = location(p);
    scaleTo(d3.event.shiftKey ? scale / 2 : scale * 2);
    translateTo(p, l);
    dispatch(event.of(this, arguments));
  }

  function touchstart() {
    var touches = d3.touches(this),
        now = Date.now();

    scale0 = scale;
    translate0 = {};
    touches.forEach(function(t) { translate0[t.identifier] = location(t); });
    d3_eventCancel();

    if (touches.length === 1) {
      if (now - touchtime < 500) { // dbltap
        var p = touches[0], l = location(touches[0]);
        scaleTo(scale * 2);
        translateTo(p, l);
        dispatch(event.of(this, arguments));
      }
      touchtime = now;
    }
  }

  function touchmove() {
    var touches = d3.touches(this),
        p0 = touches[0],
        l0 = translate0[p0.identifier];
    if (p1 = touches[1]) {
      var p1, l1 = translate0[p1.identifier];
      p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
      scaleTo(d3.event.scale * scale0);
    }
    translateTo(p0, l0);
    touchtime = null;
    dispatch(event.of(this, arguments));
  }

  return d3.rebind(zoom, event, "on");
};

var d3_behavior_zoomDiv, // for interpreting mousewheel events
    d3_behavior_zoomInfinity = [0, Infinity]; // default scale extent

function d3_behavior_zoomDelta() {

  // mousewheel events are totally broken!
  // https://bugs.webkit.org/show_bug.cgi?id=40441
  // not only that, but Chrome and Safari differ in re. to acceleration!
  if (!d3_behavior_zoomDiv) {
    d3_behavior_zoomDiv = d3.select("body").append("div")
        .style("visibility", "hidden")
        .style("top", 0)
        .style("height", 0)
        .style("width", 0)
        .style("overflow-y", "scroll")
      .append("div")
        .style("height", "2000px")
      .node().parentNode;
  }

  var e = d3.event, delta;
  try {
    d3_behavior_zoomDiv.scrollTop = 1000;
    d3_behavior_zoomDiv.dispatchEvent(e);
    delta = 1000 - d3_behavior_zoomDiv.scrollTop;
  } catch (error) {
    delta = e.wheelDelta || (-e.detail * 5);
  }

  return delta;
}
d3.layout = {};
// Implements hierarchical edge bundling using Holten's algorithm. For each
// input link, a path is computed that travels through the tree, up the parent
// hierarchy to the least common ancestor, and then back down to the destination
// node. Each path is simply an array of nodes.
d3.layout.bundle = function() {
  return function(links) {
    var paths = [],
        i = -1,
        n = links.length;
    while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
    return paths;
  };
};

function d3_layout_bundlePath(link) {
  var start = link.source,
      end = link.target,
      lca = d3_layout_bundleLeastCommonAncestor(start, end),
      points = [start];
  while (start !== lca) {
    start = start.parent;
    points.push(start);
  }
  var k = points.length;
  while (end !== lca) {
    points.splice(k, 0, end);
    end = end.parent;
  }
  return points;
}

function d3_layout_bundleAncestors(node) {
  var ancestors = [],
      parent = node.parent;
  while (parent != null) {
    ancestors.push(node);
    node = parent;
    parent = parent.parent;
  }
  ancestors.push(node);
  return ancestors;
}

function d3_layout_bundleLeastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = d3_layout_bundleAncestors(a),
      bNodes = d3_layout_bundleAncestors(b),
      aNode = aNodes.pop(),
      bNode = bNodes.pop(),
      sharedNode = null;
  while (aNode === bNode) {
    sharedNode = aNode;
    aNode = aNodes.pop();
    bNode = bNodes.pop();
  }
  return sharedNode;
}
d3.layout.chord = function() {
  var chord = {},
      chords,
      groups,
      matrix,
      n,
      padding = 0,
      sortGroups,
      sortSubgroups,
      sortChords;

  function relayout() {
    var subgroups = {},
        groupSums = [],
        groupIndex = d3.range(n),
        subgroupIndex = [],
        k,
        x,
        x0,
        i,
        j;

    chords = [];
    groups = [];

    // Compute the sum.
    k = 0, i = -1; while (++i < n) {
      x = 0, j = -1; while (++j < n) {
        x += matrix[i][j];
      }
      groupSums.push(x);
      subgroupIndex.push(d3.range(n));
      k += x;
    }

    // Sort groups…
    if (sortGroups) {
      groupIndex.sort(function(a, b) {
        return sortGroups(groupSums[a], groupSums[b]);
      });
    }

    // Sort subgroups…
    if (sortSubgroups) {
      subgroupIndex.forEach(function(d, i) {
        d.sort(function(a, b) {
          return sortSubgroups(matrix[i][a], matrix[i][b]);
        });
      });
    }

    // Convert the sum to scaling factor for [0, 2pi].
    // TODO Allow start and end angle to be specified.
    // TODO Allow padding to be specified as percentage?
    k = (2 * Math.PI - padding * n) / k;

    // Compute the start and end angle for each group and subgroup.
    // Note: Opera has a bug reordering object literal properties!
    x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < n) {
        var di = groupIndex[i],
            dj = subgroupIndex[di][j],
            v = matrix[di][dj],
            a0 = x,
            a1 = x += v * k;
        subgroups[di + "-" + dj] = {
          index: di,
          subindex: dj,
          startAngle: a0,
          endAngle: a1,
          value: v
        };
      }
      groups[di] = {
        index: di,
        startAngle: x0,
        endAngle: x,
        value: (x - x0) / k
      };
      x += padding;
    }

    // Generate chords for each (non-empty) subgroup-subgroup link.
    i = -1; while (++i < n) {
      j = i - 1; while (++j < n) {
        var source = subgroups[i + "-" + j],
            target = subgroups[j + "-" + i];
        if (source.value || target.value) {
          chords.push(source.value < target.value
              ? {source: target, target: source}
              : {source: source, target: target});
        }
      }
    }

    if (sortChords) resort();
  }

  function resort() {
    chords.sort(function(a, b) {
      return sortChords(
          (a.source.value + a.target.value) / 2,
          (b.source.value + b.target.value) / 2);
    });
  }

  chord.matrix = function(x) {
    if (!arguments.length) return matrix;
    n = (matrix = x) && matrix.length;
    chords = groups = null;
    return chord;
  };

  chord.padding = function(x) {
    if (!arguments.length) return padding;
    padding = x;
    chords = groups = null;
    return chord;
  };

  chord.sortGroups = function(x) {
    if (!arguments.length) return sortGroups;
    sortGroups = x;
    chords = groups = null;
    return chord;
  };

  chord.sortSubgroups = function(x) {
    if (!arguments.length) return sortSubgroups;
    sortSubgroups = x;
    chords = null;
    return chord;
  };

  chord.sortChords = function(x) {
    if (!arguments.length) return sortChords;
    sortChords = x;
    if (chords) resort();
    return chord;
  };

  chord.chords = function() {
    if (!chords) relayout();
    return chords;
  };

  chord.groups = function() {
    if (!groups) relayout();
    return groups;
  };

  return chord;
};
// A rudimentary force layout using Gauss-Seidel.
d3.layout.force = function() {
  var force = {},
      event = d3.dispatch("start", "tick", "end"),
      size = [1, 1],
      drag,
      alpha,
      friction = .9,
      linkDistance = d3_layout_forceLinkDistance,
      linkStrength = d3_layout_forceLinkStrength,
      charge = -30,
      gravity = .1,
      theta = .8,
      interval,
      nodes = [],
      links = [],
      distances,
      strengths,
      charges;

  function repulse(node) {
    return function(quad, x1, y1, x2, y2) {
      if (quad.point !== node) {
        var dx = quad.cx - node.x,
            dy = quad.cy - node.y,
            dn = 1 / Math.sqrt(dx * dx + dy * dy);

        /* Barnes-Hut criterion. */
        if ((x2 - x1) * dn < theta) {
          var k = quad.charge * dn * dn;
          node.px -= dx * k;
          node.py -= dy * k;
          return true;
        }

        if (quad.point && isFinite(dn)) {
          var k = quad.pointCharge * dn * dn;
          node.px -= dx * k;
          node.py -= dy * k;
        }
      }
      return !quad.charge;
    };
  }

  force.tick = function() {
    // simulated annealing, basically
    if ((alpha *= .99) < .005) {
      event.end({type: "end", alpha: alpha = 0});
      return true;
    }

    var n = nodes.length,
        m = links.length,
        q,
        i, // current index
        o, // current object
        s, // current source
        t, // current target
        l, // current distance
        k, // current force
        x, // x-distance
        y; // y-distance

    // gauss-seidel relaxation for links
    for (i = 0; i < m; ++i) {
      o = links[i];
      s = o.source;
      t = o.target;
      x = t.x - s.x;
      y = t.y - s.y;
      if (l = (x * x + y * y)) {
        l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
        x *= l;
        y *= l;
        t.x -= x * (k = s.weight / (t.weight + s.weight));
        t.y -= y * k;
        s.x += x * (k = 1 - k);
        s.y += y * k;
      }
    }

    // apply gravity forces
    if (k = alpha * gravity) {
      x = size[0] / 2;
      y = size[1] / 2;
      i = -1; if (k) while (++i < n) {
        o = nodes[i];
        o.x += (x - o.x) * k;
        o.y += (y - o.y) * k;
      }
    }

    // compute quadtree center of mass and apply charge forces
    if (charge) {
      d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
      i = -1; while (++i < n) {
        if (!(o = nodes[i]).fixed) {
          q.visit(repulse(o));
        }
      }
    }

    // position verlet integration
    i = -1; while (++i < n) {
      o = nodes[i];
      if (o.fixed) {
        o.x = o.px;
        o.y = o.py;
      } else {
        o.x -= (o.px - (o.px = o.x)) * friction;
        o.y -= (o.py - (o.py = o.y)) * friction;
      }
    }

    event.tick({type: "tick", alpha: alpha});
  };

  force.nodes = function(x) {
    if (!arguments.length) return nodes;
    nodes = x;
    return force;
  };

  force.links = function(x) {
    if (!arguments.length) return links;
    links = x;
    return force;
  };

  force.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return force;
  };

  force.linkDistance = function(x) {
    if (!arguments.length) return linkDistance;
    linkDistance = d3_functor(x);
    return force;
  };

  // For backwards-compatibility.
  force.distance = force.linkDistance;

  force.linkStrength = function(x) {
    if (!arguments.length) return linkStrength;
    linkStrength = d3_functor(x);
    return force;
  };

  force.friction = function(x) {
    if (!arguments.length) return friction;
    friction = x;
    return force;
  };

  force.charge = function(x) {
    if (!arguments.length) return charge;
    charge = typeof x === "function" ? x : +x;
    return force;
  };

  force.gravity = function(x) {
    if (!arguments.length) return gravity;
    gravity = x;
    return force;
  };

  force.theta = function(x) {
    if (!arguments.length) return theta;
    theta = x;
    return force;
  };

  force.alpha = function(x) {
    if (!arguments.length) return alpha;

    if (alpha) { // if we're already running
      if (x > 0) alpha = x; // we might keep it hot
      else alpha = 0; // or, next tick will dispatch "end"
    } else if (x > 0) { // otherwise, fire it up!
      event.start({type: "start", alpha: alpha = x});
      d3.timer(force.tick);
    }

    return force;
  };

  force.start = function() {
    var i,
        j,
        n = nodes.length,
        m = links.length,
        w = size[0],
        h = size[1],
        neighbors,
        o;

    for (i = 0; i < n; ++i) {
      (o = nodes[i]).index = i;
      o.weight = 0;
    }

    distances = [];
    strengths = [];
    for (i = 0; i < m; ++i) {
      o = links[i];
      if (typeof o.source == "number") o.source = nodes[o.source];
      if (typeof o.target == "number") o.target = nodes[o.target];
      distances[i] = linkDistance.call(this, o, i);
      strengths[i] = linkStrength.call(this, o, i);
      ++o.source.weight;
      ++o.target.weight;
    }

    for (i = 0; i < n; ++i) {
      o = nodes[i];
      if (isNaN(o.x)) o.x = position("x", w);
      if (isNaN(o.y)) o.y = position("y", h);
      if (isNaN(o.px)) o.px = o.x;
      if (isNaN(o.py)) o.py = o.y;
    }

    charges = [];
    if (typeof charge === "function") {
      for (i = 0; i < n; ++i) {
        charges[i] = +charge.call(this, nodes[i], i);
      }
    } else {
      for (i = 0; i < n; ++i) {
        charges[i] = charge;
      }
    }

    // initialize node position based on first neighbor
    function position(dimension, size) {
      var neighbors = neighbor(i),
          j = -1,
          m = neighbors.length,
          x;
      while (++j < m) if (!isNaN(x = neighbors[j][dimension])) return x;
      return Math.random() * size;
    }

    // initialize neighbors lazily
    function neighbor() {
      if (!neighbors) {
        neighbors = [];
        for (j = 0; j < n; ++j) {
          neighbors[j] = [];
        }
        for (j = 0; j < m; ++j) {
          var o = links[j];
          neighbors[o.source.index].push(o.target);
          neighbors[o.target.index].push(o.source);
        }
      }
      return neighbors[i];
    }

    return force.resume();
  };

  force.resume = function() {
    return force.alpha(.1);
  };

  force.stop = function() {
    return force.alpha(0);
  };

  // use `node.call(force.drag)` to make nodes draggable
  force.drag = function() {
    if (!drag) drag = d3.behavior.drag()
        .origin(d3_identity)
        .on("dragstart", d3_layout_forceDragstart)
        .on("drag", dragmove)
        .on("dragend", d3_layout_forceDragend);

    this.on("mouseover.force", d3_layout_forceMouseover)
        .on("mouseout.force", d3_layout_forceMouseout)
        .call(drag);
  };

  function dragmove(d) {
    d.px = d3.event.x;
    d.py = d3.event.y;
    force.resume(); // restart annealing
  }

  return d3.rebind(force, event, "on");
};

// The fixed property has three bits:
// Bit 1 can be set externally (e.g., d.fixed = true) and show persist.
// Bit 2 stores the dragging state, from mousedown to mouseup.
// Bit 3 stores the hover state, from mouseover to mouseout.
// Dragend is a special case: it also clears the hover state.

function d3_layout_forceDragstart(d) {
  d.fixed |= 2; // set bit 2
}

function d3_layout_forceDragend(d) {
  d.fixed &= 1; // unset bits 2 and 3
}

function d3_layout_forceMouseover(d) {
  d.fixed |= 4; // set bit 3
}

function d3_layout_forceMouseout(d) {
  d.fixed &= 3; // unset bit 3
}

function d3_layout_forceAccumulate(quad, alpha, charges) {
  var cx = 0,
      cy = 0;
  quad.charge = 0;
  if (!quad.leaf) {
    var nodes = quad.nodes,
        n = nodes.length,
        i = -1,
        c;
    while (++i < n) {
      c = nodes[i];
      if (c == null) continue;
      d3_layout_forceAccumulate(c, alpha, charges);
      quad.charge += c.charge;
      cx += c.charge * c.cx;
      cy += c.charge * c.cy;
    }
  }
  if (quad.point) {
    // jitter internal nodes that are coincident
    if (!quad.leaf) {
      quad.point.x += Math.random() - .5;
      quad.point.y += Math.random() - .5;
    }
    var k = alpha * charges[quad.point.index];
    quad.charge += quad.pointCharge = k;
    cx += k * quad.point.x;
    cy += k * quad.point.y;
  }
  quad.cx = cx / quad.charge;
  quad.cy = cy / quad.charge;
}

function d3_layout_forceLinkDistance(link) {
  return 20;
}

function d3_layout_forceLinkStrength(link) {
  return 1;
}
d3.layout.partition = function() {
  var hierarchy = d3.layout.hierarchy(),
      size = [1, 1]; // width, height

  function position(node, x, dx, dy) {
    var children = node.children;
    node.x = x;
    node.y = node.depth * dy;
    node.dx = dx;
    node.dy = dy;
    if (children && (n = children.length)) {
      var i = -1,
          n,
          c,
          d;
      dx = node.value ? dx / node.value : 0;
      while (++i < n) {
        position(c = children[i], x, d = c.value * dx, dy);
        x += d;
      }
    }
  }

  function depth(node) {
    var children = node.children,
        d = 0;
    if (children && (n = children.length)) {
      var i = -1,
          n;
      while (++i < n) d = Math.max(d, depth(children[i]));
    }
    return 1 + d;
  }

  function partition(d, i) {
    var nodes = hierarchy.call(this, d, i);
    position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
    return nodes;
  }

  partition.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return partition;
  };

  return d3_layout_hierarchyRebind(partition, hierarchy);
};
d3.layout.pie = function() {
  var value = Number,
      sort = d3_layout_pieSortByValue,
      startAngle = 0,
      endAngle = 2 * Math.PI;

  function pie(data, i) {

    // Compute the numeric values for each data element.
    var values = data.map(function(d, i) { return +value.call(pie, d, i); });

    // Compute the start angle.
    var a = +(typeof startAngle === "function"
        ? startAngle.apply(this, arguments)
        : startAngle);

    // Compute the angular scale factor: from value to radians.
    var k = ((typeof endAngle === "function"
        ? endAngle.apply(this, arguments)
        : endAngle) - startAngle)
        / d3.sum(values);

    // Optionally sort the data.
    var index = d3.range(data.length);
    if (sort != null) index.sort(sort === d3_layout_pieSortByValue
        ? function(i, j) { return values[j] - values[i]; }
        : function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs!
    // They are stored in the original data's order.
    var arcs = [];
    index.forEach(function(i) {
      var d;
      arcs[i] = {
        data: data[i],
        value: d = values[i],
        startAngle: a,
        endAngle: a += d * k
      };
    });
    return arcs;
  }

  /**
   * Specifies the value function *x*, which returns a nonnegative numeric value
   * for each datum. The default value function is `Number`. The value function
   * is passed two arguments: the current datum and the current index.
   */
  pie.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return pie;
  };

  /**
   * Specifies a sort comparison operator *x*. The comparator is passed two data
   * elements from the data array, a and b; it returns a negative value if a is
   * less than b, a positive value if a is greater than b, and zero if a equals
   * b.
   */
  pie.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return pie;
  };

  /**
   * Specifies the overall start angle of the pie chart. Defaults to 0. The
   * start angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.startAngle = function(x) {
    if (!arguments.length) return startAngle;
    startAngle = x;
    return pie;
  };

  /**
   * Specifies the overall end angle of the pie chart. Defaults to 2π. The
   * end angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.endAngle = function(x) {
    if (!arguments.length) return endAngle;
    endAngle = x;
    return pie;
  };

  return pie;
};

var d3_layout_pieSortByValue = {};
// data is two-dimensional array of x,y; we populate y0
d3.layout.stack = function() {
  var values = d3_identity,
      order = d3_layout_stackOrderDefault,
      offset = d3_layout_stackOffsetZero,
      out = d3_layout_stackOut,
      x = d3_layout_stackX,
      y = d3_layout_stackY;

  function stack(data, index) {

    // Convert series to canonical two-dimensional representation.
    var series = data.map(function(d, i) {
      return values.call(stack, d, i);
    });

    // Convert each series to canonical [[x,y]] representation.
    var points = series.map(function(d, i) {
      return d.map(function(v, i) {
        return [x.call(stack, v, i), y.call(stack, v, i)];
      });
    });

    // Compute the order of series, and permute them.
    var orders = order.call(stack, points, index);
    series = d3.permute(series, orders);
    points = d3.permute(points, orders);

    // Compute the baseline…
    var offsets = offset.call(stack, points, index);

    // And propagate it to other series.
    var n = series.length,
        m = series[0].length,
        i,
        j,
        o;
    for (j = 0; j < m; ++j) {
      out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
      for (i = 1; i < n; ++i) {
        out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
      }
    }

    return data;
  }

  stack.values = function(x) {
    if (!arguments.length) return values;
    values = x;
    return stack;
  };

  stack.order = function(x) {
    if (!arguments.length) return order;
    order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
    return stack;
  };

  stack.offset = function(x) {
    if (!arguments.length) return offset;
    offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
    return stack;
  };

  stack.x = function(z) {
    if (!arguments.length) return x;
    x = z;
    return stack;
  };

  stack.y = function(z) {
    if (!arguments.length) return y;
    y = z;
    return stack;
  };

  stack.out = function(z) {
    if (!arguments.length) return out;
    out = z;
    return stack;
  };

  return stack;
}

function d3_layout_stackX(d) {
  return d.x;
}

function d3_layout_stackY(d) {
  return d.y;
}

function d3_layout_stackOut(d, y0, y) {
  d.y0 = y0;
  d.y = y;
}

var d3_layout_stackOrders = d3.map({

  "inside-out": function(data) {
    var n = data.length,
        i,
        j,
        max = data.map(d3_layout_stackMaxIndex),
        sums = data.map(d3_layout_stackReduceSum),
        index = d3.range(n).sort(function(a, b) { return max[a] - max[b]; }),
        top = 0,
        bottom = 0,
        tops = [],
        bottoms = [];
    for (i = 0; i < n; ++i) {
      j = index[i];
      if (top < bottom) {
        top += sums[j];
        tops.push(j);
      } else {
        bottom += sums[j];
        bottoms.push(j);
      }
    }
    return bottoms.reverse().concat(tops);
  },

  "reverse": function(data) {
    return d3.range(data.length).reverse();
  },

  "default": d3_layout_stackOrderDefault

});

var d3_layout_stackOffsets = d3.map({

  "silhouette": function(data) {
    var n = data.length,
        m = data[0].length,
        sums = [],
        max = 0,
        i,
        j,
        o,
        y0 = [];
    for (j = 0; j < m; ++j) {
      for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
      if (o > max) max = o;
      sums.push(o);
    }
    for (j = 0; j < m; ++j) {
      y0[j] = (max - sums[j]) / 2;
    }
    return y0;
  },

  "wiggle": function(data) {
    var n = data.length,
        x = data[0],
        m = x.length,
        max = 0,
        i,
        j,
        k,
        s1,
        s2,
        s3,
        dx,
        o,
        o0,
        y0 = [];
    y0[0] = o = o0 = 0;
    for (j = 1; j < m; ++j) {
      for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
      for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
        for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
          s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
        }
        s2 += s3 * data[i][j][1];
      }
      y0[j] = o -= s1 ? s2 / s1 * dx : 0;
      if (o < o0) o0 = o;
    }
    for (j = 0; j < m; ++j) y0[j] -= o0;
    return y0;
  },

  "expand": function(data) {
    var n = data.length,
        m = data[0].length,
        k = 1 / n,
        i,
        j,
        o,
        y0 = [];
    for (j = 0; j < m; ++j) {
      for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
      if (o) for (i = 0; i < n; i++) data[i][j][1] /= o;
      else for (i = 0; i < n; i++) data[i][j][1] = k;
    }
    for (j = 0; j < m; ++j) y0[j] = 0;
    return y0;
  },

  "zero": d3_layout_stackOffsetZero

});

function d3_layout_stackOrderDefault(data) {
  return d3.range(data.length);
}

function d3_layout_stackOffsetZero(data) {
  var j = -1,
      m = data[0].length,
      y0 = [];
  while (++j < m) y0[j] = 0;
  return y0;
}

function d3_layout_stackMaxIndex(array) {
  var i = 1,
      j = 0,
      v = array[0][1],
      k,
      n = array.length;
  for (; i < n; ++i) {
    if ((k = array[i][1]) > v) {
      j = i;
      v = k;
    }
  }
  return j;
}

function d3_layout_stackReduceSum(d) {
  return d.reduce(d3_layout_stackSum, 0);
}

function d3_layout_stackSum(p, d) {
  return p + d[1];
}
d3.layout.histogram = function() {
  var frequency = true,
      valuer = Number,
      ranger = d3_layout_histogramRange,
      binner = d3_layout_histogramBinSturges;

  function histogram(data, i) {
    var bins = [],
        values = data.map(valuer, this),
        range = ranger.call(this, values, i),
        thresholds = binner.call(this, range, values, i),
        bin,
        i = -1,
        n = values.length,
        m = thresholds.length - 1,
        k = frequency ? 1 : 1 / n,
        x;

    // Initialize the bins.
    while (++i < m) {
      bin = bins[i] = [];
      bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
      bin.y = 0;
    }

    // Fill the bins, ignoring values outside the range.
    if (m > 0) {
      i = -1; while(++i < n) {
        x = values[i];
        if (x >= range[0] && x <= range[1]) {
          bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
          bin.y += k;
          bin.push(data[i]);
        }
      }
    }

    return bins;
  }

  // Specifies how to extract a value from the associated data. The default
  // value function is `Number`, which is equivalent to the identity function.
  histogram.value = function(x) {
    if (!arguments.length) return valuer;
    valuer = x;
    return histogram;
  };

  // Specifies the range of the histogram. Values outside the specified range
  // will be ignored. The argument `x` may be specified either as a two-element
  // array representing the minimum and maximum value of the range, or as a
  // function that returns the range given the array of values and the current
  // index `i`. The default range is the extent (minimum and maximum) of the
  // values.
  histogram.range = function(x) {
    if (!arguments.length) return ranger;
    ranger = d3_functor(x);
    return histogram;
  };

  // Specifies how to bin values in the histogram. The argument `x` may be
  // specified as a number, in which case the range of values will be split
  // uniformly into the given number of bins. Or, `x` may be an array of
  // threshold values, defining the bins; the specified array must contain the
  // rightmost (upper) value, thus specifying n + 1 values for n bins. Or, `x`
  // may be a function which is evaluated, being passed the range, the array of
  // values, and the current index `i`, returning an array of thresholds. The
  // default bin function will divide the values into uniform bins using
  // Sturges' formula.
  histogram.bins = function(x) {
    if (!arguments.length) return binner;
    binner = typeof x === "number"
        ? function(range) { return d3_layout_histogramBinFixed(range, x); }
        : d3_functor(x);
    return histogram;
  };

  // Specifies whether the histogram's `y` value is a count (frequency) or a
  // probability (density). The default value is true.
  histogram.frequency = function(x) {
    if (!arguments.length) return frequency;
    frequency = !!x;
    return histogram;
  };

  return histogram;
};

function d3_layout_histogramBinSturges(range, values) {
  return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
}

function d3_layout_histogramBinFixed(range, n) {
  var x = -1,
      b = +range[0],
      m = (range[1] - b) / n,
      f = [];
  while (++x <= n) f[x] = m * x + b;
  return f;
}

function d3_layout_histogramRange(values) {
  return [d3.min(values), d3.max(values)];
}
d3.layout.hierarchy = function() {
  var sort = d3_layout_hierarchySort,
      children = d3_layout_hierarchyChildren,
      value = d3_layout_hierarchyValue;

  // Recursively compute the node depth and value.
  // Also converts the data representation into a standard hierarchy structure.
  function recurse(data, depth, nodes) {
    var childs = children.call(hierarchy, data, depth),
        node = d3_layout_hierarchyInline ? data : {data: data};
    node.depth = depth;
    nodes.push(node);
    if (childs && (n = childs.length)) {
      var i = -1,
          n,
          c = node.children = [],
          v = 0,
          j = depth + 1,
          d;
      while (++i < n) {
        d = recurse(childs[i], j, nodes);
        d.parent = node;
        c.push(d);
        v += d.value;
      }
      if (sort) c.sort(sort);
      if (value) node.value = v;
    } else if (value) {
      node.value = +value.call(hierarchy, data, depth) || 0;
    }
    return node;
  }

  // Recursively re-evaluates the node value.
  function revalue(node, depth) {
    var children = node.children,
        v = 0;
    if (children && (n = children.length)) {
      var i = -1,
          n,
          j = depth + 1;
      while (++i < n) v += revalue(children[i], j);
    } else if (value) {
      v = +value.call(hierarchy, d3_layout_hierarchyInline ? node : node.data, depth) || 0;
    }
    if (value) node.value = v;
    return v;
  }

  function hierarchy(d) {
    var nodes = [];
    recurse(d, 0, nodes);
    return nodes;
  }

  hierarchy.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return hierarchy;
  };

  hierarchy.children = function(x) {
    if (!arguments.length) return children;
    children = x;
    return hierarchy;
  };

  hierarchy.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return hierarchy;
  };

  // Re-evaluates the `value` property for the specified hierarchy.
  hierarchy.revalue = function(root) {
    revalue(root, 0);
    return root;
  };

  return hierarchy;
};

// A method assignment helper for hierarchy subclasses.
function d3_layout_hierarchyRebind(object, hierarchy) {
  d3.rebind(object, hierarchy, "sort", "children", "value");

  // Add an alias for links, for convenience.
  object.links = d3_layout_hierarchyLinks;

  // If the new API is used, enabling inlining.
  object.nodes = function(d) {
    d3_layout_hierarchyInline = true;
    return (object.nodes = object)(d);
  };

  return object;
}

function d3_layout_hierarchyChildren(d) {
  return d.children;
}

function d3_layout_hierarchyValue(d) {
  return d.value;
}

function d3_layout_hierarchySort(a, b) {
  return b.value - a.value;
}

// Returns an array source+target objects for the specified nodes.
function d3_layout_hierarchyLinks(nodes) {
  return d3.merge(nodes.map(function(parent) {
    return (parent.children || []).map(function(child) {
      return {source: parent, target: child};
    });
  }));
}

// For backwards-compatibility, don't enable inlining by default.
var d3_layout_hierarchyInline = false;
d3.layout.pack = function() {
  var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort),
      padding = 0,
      size = [1, 1];

  function pack(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0];

    // Recursively compute the layout.
    root.x = 0;
    root.y = 0;
    d3_layout_treeVisitAfter(root, function(d) { d.r = Math.sqrt(d.value); });
    d3_layout_treeVisitAfter(root, d3_layout_packSiblings);

    // Compute the scale factor the initial layout.
    var w = size[0],
        h = size[1],
        k = Math.max(2 * root.r / w, 2 * root.r / h);

    // When padding, recompute the layout using scaled padding.
    if (padding > 0) {
      var dr = padding * k / 2;
      d3_layout_treeVisitAfter(root, function(d) { d.r += dr; });
      d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
      d3_layout_treeVisitAfter(root, function(d) { d.r -= dr; });
      k = Math.max(2 * root.r / w, 2 * root.r / h);
    }

    // Scale the layout to fit the requested size.
    d3_layout_packTransform(root, w / 2, h / 2, 1 / k);

    return nodes;
  }

  pack.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return pack;
  };

  pack.padding = function(_) {
    if (!arguments.length) return padding;
    padding = +_;
    return pack;
  };

  return d3_layout_hierarchyRebind(pack, hierarchy);
};

function d3_layout_packSort(a, b) {
  return a.value - b.value;
}

function d3_layout_packInsert(a, b) {
  var c = a._pack_next;
  a._pack_next = b;
  b._pack_prev = a;
  b._pack_next = c;
  c._pack_prev = b;
}

function d3_layout_packSplice(a, b) {
  a._pack_next = b;
  b._pack_prev = a;
}

function d3_layout_packIntersects(a, b) {
  var dx = b.x - a.x,
      dy = b.y - a.y,
      dr = a.r + b.r;
  return dr * dr - dx * dx - dy * dy > .001; // within epsilon
}

function d3_layout_packSiblings(node) {
  if (!(nodes = node.children) || !(n = nodes.length)) return;

  var nodes,
      xMin = Infinity,
      xMax = -Infinity,
      yMin = Infinity,
      yMax = -Infinity,
      a, b, c, i, j, k, n;

  function bound(node) {
    xMin = Math.min(node.x - node.r, xMin);
    xMax = Math.max(node.x + node.r, xMax);
    yMin = Math.min(node.y - node.r, yMin);
    yMax = Math.max(node.y + node.r, yMax);
  }

  // Create node links.
  nodes.forEach(d3_layout_packLink);

  // Create first node.
  a = nodes[0];
  a.x = -a.r;
  a.y = 0;
  bound(a);

  // Create second node.
  if (n > 1) {
    b = nodes[1];
    b.x = b.r;
    b.y = 0;
    bound(b);

    // Create third node and build chain.
    if (n > 2) {
      c = nodes[2];
      d3_layout_packPlace(a, b, c);
      bound(c);
      d3_layout_packInsert(a, c);
      a._pack_prev = c;
      d3_layout_packInsert(c, b);
      b = a._pack_next;

      // Now iterate through the rest.
      for (i = 3; i < n; i++) {
        d3_layout_packPlace(a, b, c = nodes[i]);

        // Search for the closest intersection.
        var isect = 0, s1 = 1, s2 = 1;
        for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
          if (d3_layout_packIntersects(j, c)) {
            isect = 1;
            break;
          }
        }
        if (isect == 1) {
          for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
            if (d3_layout_packIntersects(k, c)) {
              break;
            }
          }
        }

        // Update node chain.
        if (isect) {
          if (s1 < s2 || (s1 == s2 && b.r < a.r)) d3_layout_packSplice(a, b = j);
          else d3_layout_packSplice(a = k, b);
          i--;
        } else {
          d3_layout_packInsert(a, c);
          b = c;
          bound(c);
        }
      }
    }
  }

  // Re-center the circles and compute the encompassing radius.
  var cx = (xMin + xMax) / 2,
      cy = (yMin + yMax) / 2,
      cr = 0;
  for (i = 0; i < n; i++) {
    c = nodes[i];
    c.x -= cx;
    c.y -= cy;
    cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
  }
  node.r = cr;

  // Remove node links.
  nodes.forEach(d3_layout_packUnlink);
}

function d3_layout_packLink(node) {
  node._pack_next = node._pack_prev = node;
}

function d3_layout_packUnlink(node) {
  delete node._pack_next;
  delete node._pack_prev;
}

function d3_layout_packTransform(node, x, y, k) {
  var children = node.children;
  node.x = (x += k * node.x);
  node.y = (y += k * node.y);
  node.r *= k;
  if (children) {
    var i = -1, n = children.length;
    while (++i < n) d3_layout_packTransform(children[i], x, y, k);
  }
}

function d3_layout_packPlace(a, b, c) {
  var db = a.r + c.r,
      dx = b.x - a.x,
      dy = b.y - a.y;
  if (db && (dx || dy)) {
    var da = b.r + c.r,
        dc = dx * dx + dy * dy;
    da *= da;
    db *= db;
    var x = .5 + (db - da) / (2 * dc),
        y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
    c.x = a.x + x * dx + y * dy;
    c.y = a.y + x * dy - y * dx;
  } else {
    c.x = a.x + db;
    c.y = a.y;
  }
}
// Implements a hierarchical layout using the cluster (or dendrogram)
// algorithm.
d3.layout.cluster = function() {
  var hierarchy = d3.layout.hierarchy().sort(null).value(null),
      separation = d3_layout_treeSeparation,
      size = [1, 1]; // width, height

  function cluster(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0],
        previousNode,
        x = 0,
        kx,
        ky;

    // First walk, computing the initial x & y values.
    d3_layout_treeVisitAfter(root, function(node) {
      var children = node.children;
      if (children && children.length) {
        node.x = d3_layout_clusterX(children);
        node.y = d3_layout_clusterY(children);
      } else {
        node.x = previousNode ? x += separation(node, previousNode) : 0;
        node.y = 0;
        previousNode = node;
      }
    });

    // Compute the left-most, right-most, and depth-most nodes for extents.
    var left = d3_layout_clusterLeft(root),
        right = d3_layout_clusterRight(root),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2;

    // Second walk, normalizing x & y to the desired size.
    d3_layout_treeVisitAfter(root, function(node) {
      node.x = (node.x - x0) / (x1 - x0) * size[0];
      node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
    });

    return nodes;
  }

  cluster.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return cluster;
  };

  cluster.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return cluster;
  };

  return d3_layout_hierarchyRebind(cluster, hierarchy);
};

function d3_layout_clusterY(children) {
  return 1 + d3.max(children, function(child) {
    return child.y;
  });
}

function d3_layout_clusterX(children) {
  return children.reduce(function(x, child) {
    return x + child.x;
  }, 0) / children.length;
}

function d3_layout_clusterLeft(node) {
  var children = node.children;
  return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
}

function d3_layout_clusterRight(node) {
  var children = node.children, n;
  return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
}
// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
d3.layout.tree = function() {
  var hierarchy = d3.layout.hierarchy().sort(null).value(null),
      separation = d3_layout_treeSeparation,
      size = [1, 1]; // width, height

  function tree(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0];

    function firstWalk(node, previousSibling) {
      var children = node.children,
          layout = node._tree;
      if (children && (n = children.length)) {
        var n,
            firstChild = children[0],
            previousChild,
            ancestor = firstChild,
            child,
            i = -1;
        while (++i < n) {
          child = children[i];
          firstWalk(child, previousChild);
          ancestor = apportion(child, previousChild, ancestor);
          previousChild = child;
        }
        d3_layout_treeShift(node);
        var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
        if (previousSibling) {
          layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
          layout.mod = layout.prelim - midpoint;
        } else {
          layout.prelim = midpoint;
        }
      } else {
        if (previousSibling) {
          layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
        }
      }
    }

    function secondWalk(node, x) {
      node.x = node._tree.prelim + x;
      var children = node.children;
      if (children && (n = children.length)) {
        var i = -1,
            n;
        x += node._tree.mod;
        while (++i < n) {
          secondWalk(children[i], x);
        }
      }
    }

    function apportion(node, previousSibling, ancestor) {
      if (previousSibling) {
        var vip = node,
            vop = node,
            vim = previousSibling,
            vom = node.parent.children[0],
            sip = vip._tree.mod,
            sop = vop._tree.mod,
            sim = vim._tree.mod,
            som = vom._tree.mod,
            shift;
        while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
          vom = d3_layout_treeLeft(vom);
          vop = d3_layout_treeRight(vop);
          vop._tree.ancestor = node;
          shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip);
          if (shift > 0) {
            d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
            sip += shift;
            sop += shift;
          }
          sim += vim._tree.mod;
          sip += vip._tree.mod;
          som += vom._tree.mod;
          sop += vop._tree.mod;
        }
        if (vim && !d3_layout_treeRight(vop)) {
          vop._tree.thread = vim;
          vop._tree.mod += sim - sop;
        }
        if (vip && !d3_layout_treeLeft(vom)) {
          vom._tree.thread = vip;
          vom._tree.mod += sip - som;
          ancestor = node;
        }
      }
      return ancestor;
    }

    // Initialize temporary layout variables.
    d3_layout_treeVisitAfter(root, function(node, previousSibling) {
      node._tree = {
        ancestor: node,
        prelim: 0,
        mod: 0,
        change: 0,
        shift: 0,
        number: previousSibling ? previousSibling._tree.number + 1 : 0
      };
    });

    // Compute the layout using Buchheim et al.'s algorithm.
    firstWalk(root);
    secondWalk(root, -root._tree.prelim);

    // Compute the left-most, right-most, and depth-most nodes for extents.
    var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost),
        right = d3_layout_treeSearch(root, d3_layout_treeRightmost),
        deep = d3_layout_treeSearch(root, d3_layout_treeDeepest),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2,
        y1 = deep.depth || 1;

    // Clear temporary layout variables; transform x and y.
    d3_layout_treeVisitAfter(root, function(node) {
      node.x = (node.x - x0) / (x1 - x0) * size[0];
      node.y = node.depth / y1 * size[1];
      delete node._tree;
    });

    return nodes;
  }

  tree.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return tree;
  };

  tree.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return tree;
  };

  return d3_layout_hierarchyRebind(tree, hierarchy);
};

function d3_layout_treeSeparation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}

// function d3_layout_treeSeparationRadial(a, b) {
//   return (a.parent == b.parent ? 1 : 2) / a.depth;
// }

function d3_layout_treeLeft(node) {
  var children = node.children;
  return children && children.length ? children[0] : node._tree.thread;
}

function d3_layout_treeRight(node) {
  var children = node.children,
      n;
  return children && (n = children.length) ? children[n - 1] : node._tree.thread;
}

function d3_layout_treeSearch(node, compare) {
  var children = node.children;
  if (children && (n = children.length)) {
    var child,
        n,
        i = -1;
    while (++i < n) {
      if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
        node = child;
      }
    }
  }
  return node;
}

function d3_layout_treeRightmost(a, b) {
  return a.x - b.x;
}

function d3_layout_treeLeftmost(a, b) {
  return b.x - a.x;
}

function d3_layout_treeDeepest(a, b) {
  return a.depth - b.depth;
}

function d3_layout_treeVisitAfter(node, callback) {
  function visit(node, previousSibling) {
    var children = node.children;
    if (children && (n = children.length)) {
      var child,
          previousChild = null,
          i = -1,
          n;
      while (++i < n) {
        child = children[i];
        visit(child, previousChild);
        previousChild = child;
      }
    }
    callback(node, previousSibling);
  }
  visit(node, null);
}

function d3_layout_treeShift(node) {
  var shift = 0,
      change = 0,
      children = node.children,
      i = children.length,
      child;
  while (--i >= 0) {
    child = children[i]._tree;
    child.prelim += shift;
    child.mod += shift;
    shift += child.shift + (change += child.change);
  }
}

function d3_layout_treeMove(ancestor, node, shift) {
  ancestor = ancestor._tree;
  node = node._tree;
  var change = shift / (node.number - ancestor.number);
  ancestor.change += change;
  node.change -= change;
  node.shift += shift;
  node.prelim += shift;
  node.mod += shift;
}

function d3_layout_treeAncestor(vim, node, ancestor) {
  return vim._tree.ancestor.parent == node.parent
      ? vim._tree.ancestor
      : ancestor;
}
// Squarified Treemaps by Mark Bruls, Kees Huizing, and Jarke J. van Wijk
// Modified to support a target aspect ratio by Jeff Heer
d3.layout.treemap = function() {
  var hierarchy = d3.layout.hierarchy(),
      round = Math.round,
      size = [1, 1], // width, height
      padding = null,
      pad = d3_layout_treemapPadNull,
      sticky = false,
      stickies,
      ratio = 0.5 * (1 + Math.sqrt(5)); // golden ratio

  // Compute the area for each child based on value & scale.
  function scale(children, k) {
    var i = -1,
        n = children.length,
        child,
        area;
    while (++i < n) {
      area = (child = children[i]).value * (k < 0 ? 0 : k);
      child.area = isNaN(area) || area <= 0 ? 0 : area;
    }
  }

  // Recursively arranges the specified node's children into squarified rows.
  function squarify(node) {
    var children = node.children;
    if (children && children.length) {
      var rect = pad(node),
          row = [],
          remaining = children.slice(), // copy-on-write
          child,
          best = Infinity, // the best row score so far
          score, // the current row score
          u = Math.min(rect.dx, rect.dy), // initial orientation
          n;
      scale(remaining, rect.dx * rect.dy / node.value);
      row.area = 0;
      while ((n = remaining.length) > 0) {
        row.push(child = remaining[n - 1]);
        row.area += child.area;
        if ((score = worst(row, u)) <= best) { // continue with this orientation
          remaining.pop();
          best = score;
        } else { // abort, and try a different orientation
          row.area -= row.pop().area;
          position(row, u, rect, false);
          u = Math.min(rect.dx, rect.dy);
          row.length = row.area = 0;
          best = Infinity;
        }
      }
      if (row.length) {
        position(row, u, rect, true);
        row.length = row.area = 0;
      }
      children.forEach(squarify);
    }
  }

  // Recursively resizes the specified node's children into existing rows.
  // Preserves the existing layout!
  function stickify(node) {
    var children = node.children;
    if (children && children.length) {
      var rect = pad(node),
          remaining = children.slice(), // copy-on-write
          child,
          row = [];
      scale(remaining, rect.dx * rect.dy / node.value);
      row.area = 0;
      while (child = remaining.pop()) {
        row.push(child);
        row.area += child.area;
        if (child.z != null) {
          position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
          row.length = row.area = 0;
        }
      }
      children.forEach(stickify);
    }
  }

  // Computes the score for the specified row, as the worst aspect ratio.
  function worst(row, u) {
    var s = row.area,
        r,
        rmax = 0,
        rmin = Infinity,
        i = -1,
        n = row.length;
    while (++i < n) {
      if (!(r = row[i].area)) continue;
      if (r < rmin) rmin = r;
      if (r > rmax) rmax = r;
    }
    s *= s;
    u *= u;
    return s
        ? Math.max((u * rmax * ratio) / s, s / (u * rmin * ratio))
        : Infinity;
  }

  // Positions the specified row of nodes. Modifies `rect`.
  function position(row, u, rect, flush) {
    var i = -1,
        n = row.length,
        x = rect.x,
        y = rect.y,
        v = u ? round(row.area / u) : 0,
        o;
    if (u == rect.dx) { // horizontal subdivision
      if (flush || v > rect.dy) v = rect.dy; // over+underflow
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dy = v;
        x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
      }
      o.z = true;
      o.dx += rect.x + rect.dx - x; // rounding error
      rect.y += v;
      rect.dy -= v;
    } else { // vertical subdivision
      if (flush || v > rect.dx) v = rect.dx; // over+underflow
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dx = v;
        y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
      }
      o.z = false;
      o.dy += rect.y + rect.dy - y; // rounding error
      rect.x += v;
      rect.dx -= v;
    }
  }

  function treemap(d) {
    var nodes = stickies || hierarchy(d),
        root = nodes[0];
    root.x = 0;
    root.y = 0;
    root.dx = size[0];
    root.dy = size[1];
    if (stickies) hierarchy.revalue(root);
    scale([root], root.dx * root.dy / root.value);
    (stickies ? stickify : squarify)(root);
    if (sticky) stickies = nodes;
    return nodes;
  }

  treemap.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return treemap;
  };

  treemap.padding = function(x) {
    if (!arguments.length) return padding;

    function padFunction(node) {
      var p = x.call(treemap, node, node.depth);
      return p == null
          ? d3_layout_treemapPadNull(node)
          : d3_layout_treemapPad(node, typeof p === "number" ? [p, p, p, p] : p);
    }

    function padConstant(node) {
      return d3_layout_treemapPad(node, x);
    }

    var type;
    pad = (padding = x) == null ? d3_layout_treemapPadNull
        : (type = typeof x) === "function" ? padFunction
        : type === "number" ? (x = [x, x, x, x], padConstant)
        : padConstant;
    return treemap;
  };

  treemap.round = function(x) {
    if (!arguments.length) return round != Number;
    round = x ? Math.round : Number;
    return treemap;
  };

  treemap.sticky = function(x) {
    if (!arguments.length) return sticky;
    sticky = x;
    stickies = null;
    return treemap;
  };

  treemap.ratio = function(x) {
    if (!arguments.length) return ratio;
    ratio = x;
    return treemap;
  };

  return d3_layout_hierarchyRebind(treemap, hierarchy);
};

function d3_layout_treemapPadNull(node) {
  return {x: node.x, y: node.y, dx: node.dx, dy: node.dy};
}

function d3_layout_treemapPad(node, padding) {
  var x = node.x + padding[3],
      y = node.y + padding[0],
      dx = node.dx - padding[1] - padding[3],
      dy = node.dy - padding[0] - padding[2];
  if (dx < 0) { x += dx / 2; dx = 0; }
  if (dy < 0) { y += dy / 2; dy = 0; }
  return {x: x, y: y, dx: dx, dy: dy};
}
d3.csv = d3_dsv(",", "text/csv");
function d3_dsv(delimiter, mimeType) {
  var reParse = new RegExp("\r\n|[" + delimiter + "\r\n]", "g"), // field separator regex
      reFormat = new RegExp("[\"" + delimiter + "\n]"),
      delimiterCode = delimiter.charCodeAt(0);

  function dsv(url, callback) {
    d3.text(url, mimeType, function(text) {
      callback(text && dsv.parse(text));
    });
  }

  dsv.parse = function(text) {
    var header;
    return dsv.parseRows(text, function(row, i) {
      if (i) {
        var o = {}, j = -1, m = header.length;
        while (++j < m) o[header[j]] = row[j];
        return o;
      } else {
        header = row;
        return null;
      }
    });
  };

  dsv.parseRows = function(text, f) {
    var EOL = {}, // sentinel value for end-of-line
        EOF = {}, // sentinel value for end-of-file
        rows = [], // output rows
        n = 0, // the current line number
        t, // the current token
        eol; // is the current token followed by EOL?

    reParse.lastIndex = 0; // work-around bug in FF 3.6

    function token() {
      if (reParse.lastIndex >= text.length) return EOF; // special case: end of file
      if (eol) { eol = false; return EOL; } // special case: end of line

      // special case: quotes
      var j = reParse.lastIndex;
      if (text.charCodeAt(j) === 34) {
        var i = j;
        while (i++ < text.length) {
          if (text.charCodeAt(i) === 34) {
            if (text.charCodeAt(i + 1) !== 34) break;
            i++;
          }
        }
        reParse.lastIndex = i + 2;
        var c = text.charCodeAt(i + 1);
        if (c === 13) {
          eol = true;
          if (text.charCodeAt(i + 2) === 10) reParse.lastIndex++;
        } else if (c === 10) {
          eol = true;
        }
        return text.substring(j + 1, i).replace(/""/g, "\"");
      }

      // common case
      var m = reParse.exec(text);
      if (m) {
        eol = m[0].charCodeAt(0) !== delimiterCode;
        return text.substring(j, m.index);
      }
      reParse.lastIndex = text.length;
      return text.substring(j);
    }

    while ((t = token()) !== EOF) {
      var a = [];
      while (t !== EOL && t !== EOF) {
        a.push(t);
        t = token();
      }
      if (f && !(a = f(a, n++))) continue;
      rows.push(a);
    }

    return rows;
  };

  dsv.format = function(rows) {
    return rows.map(formatRow).join("\n");
  };

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(text) {
    return reFormat.test(text) ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
  }

  return dsv;
}
d3.tsv = d3_dsv("\t", "text/tab-separated-values");
d3.geo = {};

var d3_geo_radians = Math.PI / 180;
// TODO clip input coordinates on opposite hemisphere
d3.geo.azimuthal = function() {
  var mode = "orthographic", // or stereographic, gnomonic, equidistant or equalarea
      origin,
      scale = 200,
      translate = [480, 250],
      x0,
      y0,
      cy0,
      sy0;

  function azimuthal(coordinates) {
    var x1 = coordinates[0] * d3_geo_radians - x0,
        y1 = coordinates[1] * d3_geo_radians,
        cx1 = Math.cos(x1),
        sx1 = Math.sin(x1),
        cy1 = Math.cos(y1),
        sy1 = Math.sin(y1),
        cc = mode !== "orthographic" ? sy0 * sy1 + cy0 * cy1 * cx1 : null,
        c,
        k = mode === "stereographic" ? 1 / (1 + cc)
          : mode === "gnomonic" ? 1 / cc
          : mode === "equidistant" ? (c = Math.acos(cc), c ? c / Math.sin(c) : 0)
          : mode === "equalarea" ? Math.sqrt(2 / (1 + cc))
          : 1,
        x = k * cy1 * sx1,
        y = k * (sy0 * cy1 * cx1 - cy0 * sy1);
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  azimuthal.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale,
        p = Math.sqrt(x * x + y * y),
        c = mode === "stereographic" ? 2 * Math.atan(p)
          : mode === "gnomonic" ? Math.atan(p)
          : mode === "equidistant" ? p
          : mode === "equalarea" ? 2 * Math.asin(.5 * p)
          : Math.asin(p),
        sc = Math.sin(c),
        cc = Math.cos(c);
    return [
      (x0 + Math.atan2(x * sc, p * cy0 * cc + y * sy0 * sc)) / d3_geo_radians,
      Math.asin(cc * sy0 - (p ? (y * sc * cy0) / p : 0)) / d3_geo_radians
    ];
  };

  azimuthal.mode = function(x) {
    if (!arguments.length) return mode;
    mode = x + "";
    return azimuthal;
  };

  azimuthal.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    x0 = origin[0] * d3_geo_radians;
    y0 = origin[1] * d3_geo_radians;
    cy0 = Math.cos(y0);
    sy0 = Math.sin(y0);
    return azimuthal;
  };

  azimuthal.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return azimuthal;
  };

  azimuthal.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return azimuthal;
  };

  return azimuthal.origin([0, 0]);
};
// Derived from Tom Carden's Albers implementation for Protovis.
// http://gist.github.com/476238
// http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html

d3.geo.albers = function() {
  var origin = [-98, 38],
      parallels = [29.5, 45.5],
      scale = 1000,
      translate = [480, 250],
      lng0, // d3_geo_radians * origin[0]
      n,
      C,
      p0;

  function albers(coordinates) {
    var t = n * (d3_geo_radians * coordinates[0] - lng0),
        p = Math.sqrt(C - 2 * n * Math.sin(d3_geo_radians * coordinates[1])) / n;
    return [
      scale * p * Math.sin(t) + translate[0],
      scale * (p * Math.cos(t) - p0) + translate[1]
    ];
  }

  albers.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale,
        p0y = p0 + y,
        t = Math.atan2(x, p0y),
        p = Math.sqrt(x * x + p0y * p0y);
    return [
      (lng0 + t / n) / d3_geo_radians,
      Math.asin((C - p * p * n * n) / (2 * n)) / d3_geo_radians
    ];
  };

  function reload() {
    var phi1 = d3_geo_radians * parallels[0],
        phi2 = d3_geo_radians * parallels[1],
        lat0 = d3_geo_radians * origin[1],
        s = Math.sin(phi1),
        c = Math.cos(phi1);
    lng0 = d3_geo_radians * origin[0];
    n = .5 * (s + Math.sin(phi2));
    C = c * c + 2 * n * s;
    p0 = Math.sqrt(C - 2 * n * Math.sin(lat0)) / n;
    return albers;
  }

  albers.origin = function(x) {
    if (!arguments.length) return origin;
    origin = [+x[0], +x[1]];
    return reload();
  };

  albers.parallels = function(x) {
    if (!arguments.length) return parallels;
    parallels = [+x[0], +x[1]];
    return reload();
  };

  albers.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return albers;
  };

  albers.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return albers;
  };

  return reload();
};

// A composite projection for the United States, 960x500. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
// TODO allow the composite projection to be rescaled?
d3.geo.albersUsa = function() {
  var lower48 = d3.geo.albers();

  var alaska = d3.geo.albers()
      .origin([-160, 60])
      .parallels([55, 65]);

  var hawaii = d3.geo.albers()
      .origin([-160, 20])
      .parallels([8, 18]);

  var puertoRico = d3.geo.albers()
      .origin([-60, 10])
      .parallels([8, 18]);

  function albersUsa(coordinates) {
    var lon = coordinates[0],
        lat = coordinates[1];
    return (lat > 50 ? alaska
        : lon < -140 ? hawaii
        : lat < 21 ? puertoRico
        : lower48)(coordinates);
  }

  albersUsa.scale = function(x) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(x);
    alaska.scale(x * .6);
    hawaii.scale(x);
    puertoRico.scale(x * 1.5);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(x) {
    if (!arguments.length) return lower48.translate();
    var dz = lower48.scale() / 1000,
        dx = x[0],
        dy = x[1];
    lower48.translate(x);
    alaska.translate([dx - 400 * dz, dy + 170 * dz]);
    hawaii.translate([dx - 190 * dz, dy + 200 * dz]);
    puertoRico.translate([dx + 580 * dz, dy + 430 * dz]);
    return albersUsa;
  };

  return albersUsa.scale(lower48.scale());
};
d3.geo.bonne = function() {
  var scale = 200,
      translate = [480, 250],
      x0, // origin longitude in radians
      y0, // origin latitude in radians
      y1, // parallel latitude in radians
      c1; // cot(y1)

  function bonne(coordinates) {
    var x = coordinates[0] * d3_geo_radians - x0,
        y = coordinates[1] * d3_geo_radians - y0;
    if (y1) {
      var p = c1 + y1 - y, E = x * Math.cos(y) / p;
      x = p * Math.sin(E);
      y = p * Math.cos(E) - c1;
    } else {
      x *= Math.cos(y);
      y *= -1;
    }
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  bonne.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale;
    if (y1) {
      var c = c1 + y, p = Math.sqrt(x * x + c * c);
      y = c1 + y1 - p;
      x = x0 + p * Math.atan2(x, c) / Math.cos(y);
    } else {
      y *= -1;
      x /= Math.cos(y);
    }
    return [
      x / d3_geo_radians,
      y / d3_geo_radians
    ];
  };

  // 90° for Werner, 0° for Sinusoidal
  bonne.parallel = function(x) {
    if (!arguments.length) return y1 / d3_geo_radians;
    c1 = 1 / Math.tan(y1 = x * d3_geo_radians);
    return bonne;
  };

  bonne.origin = function(x) {
    if (!arguments.length) return [x0 / d3_geo_radians, y0 / d3_geo_radians];
    x0 = x[0] * d3_geo_radians;
    y0 = x[1] * d3_geo_radians;
    return bonne;
  };

  bonne.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return bonne;
  };

  bonne.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return bonne;
  };

  return bonne.origin([0, 0]).parallel(45);
};
d3.geo.equirectangular = function() {
  var scale = 500,
      translate = [480, 250];

  function equirectangular(coordinates) {
    var x = coordinates[0] / 360,
        y = -coordinates[1] / 360;
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  equirectangular.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale;
    return [
      360 * x,
      -360 * y
    ];
  };

  equirectangular.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return equirectangular;
  };

  equirectangular.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return equirectangular;
  };

  return equirectangular;
};
d3.geo.mercator = function() {
  var scale = 500,
      translate = [480, 250];

  function mercator(coordinates) {
    var x = coordinates[0] / 360,
        y = -(Math.log(Math.tan(Math.PI / 4 + coordinates[1] * d3_geo_radians / 2)) / d3_geo_radians) / 360;
    return [
      scale * x + translate[0],
      scale * Math.max(-.5, Math.min(.5, y)) + translate[1]
    ];
  }

  mercator.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale;
    return [
      360 * x,
      2 * Math.atan(Math.exp(-360 * y * d3_geo_radians)) / d3_geo_radians - 90
    ];
  };

  mercator.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return mercator;
  };

  mercator.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return mercator;
  };

  return mercator;
};
function d3_geo_type(types, defaultValue) {
  return function(object) {
    return object && types.hasOwnProperty(object.type) ? types[object.type](object) : defaultValue;
  };
}
/**
 * Returns a function that, given a GeoJSON object (e.g., a feature), returns
 * the corresponding SVG path. The function can be customized by overriding the
 * projection. Point features are mapped to circles with a default radius of
 * 4.5px; the radius can be specified either as a constant or a function that
 * is evaluated per object.
 */
d3.geo.path = function() {
  var pointRadius = 4.5,
      pointCircle = d3_path_circle(pointRadius),
      projection = d3.geo.albersUsa(),
      buffer = [];

  function path(d, i) {
    if (typeof pointRadius === "function") pointCircle = d3_path_circle(pointRadius.apply(this, arguments));
    pathType(d);
    var result = buffer.length ? buffer.join("") : null;
    buffer = [];
    return result;
  }

  function project(coordinates) {
    return projection(coordinates).join(",");
  }

  var pathType = d3_geo_type({

    FeatureCollection: function(o) {
      var features = o.features,
          i = -1, // features.index
          n = features.length;
      while (++i < n) buffer.push(pathType(features[i].geometry));
    },

    Feature: function(o) {
      pathType(o.geometry);
    },

    Point: function(o) {
      buffer.push("M", project(o.coordinates), pointCircle);
    },

    MultiPoint: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      while (++i < n) buffer.push("M", project(coordinates[i]), pointCircle);
    },

    LineString: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      buffer.push("M");
      while (++i < n) buffer.push(project(coordinates[i]), "L");
      buffer.pop();
    },

    MultiLineString: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates.index
          m; // subcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        buffer.push("M");
        while (++j < m) buffer.push(project(subcoordinates[j]), "L");
        buffer.pop();
      }
    },

    Polygon: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates.index
          m; // subcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        if ((m = subcoordinates.length - 1) > 0) {
          buffer.push("M");
          while (++j < m) buffer.push(project(subcoordinates[j]), "L");
          buffer[buffer.length - 1] = "Z";
        }
      }
    },

    MultiPolygon: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates index
          m, // subcoordinates.length
          subsubcoordinates, // subcoordinates[j]
          k, // subsubcoordinates index
          p; // subsubcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        while (++j < m) {
          subsubcoordinates = subcoordinates[j];
          k = -1;
          if ((p = subsubcoordinates.length - 1) > 0) {
            buffer.push("M");
            while (++k < p) buffer.push(project(subsubcoordinates[k]), "L");
            buffer[buffer.length - 1] = "Z";
          }
        }
      }
    },

    GeometryCollection: function(o) {
      var geometries = o.geometries,
          i = -1, // geometries index
          n = geometries.length;
      while (++i < n) buffer.push(pathType(geometries[i]));
    }

  });

  var areaType = path.area = d3_geo_type({

    FeatureCollection: function(o) {
      var area = 0,
          features = o.features,
          i = -1, // features.index
          n = features.length;
      while (++i < n) area += areaType(features[i]);
      return area;
    },

    Feature: function(o) {
      return areaType(o.geometry);
    },

    Polygon: function(o) {
      return polygonArea(o.coordinates);
    },

    MultiPolygon: function(o) {
      var sum = 0,
          coordinates = o.coordinates,
          i = -1, // coordinates index
          n = coordinates.length;
      while (++i < n) sum += polygonArea(coordinates[i]);
      return sum;
    },

    GeometryCollection: function(o) {
      var sum = 0,
          geometries = o.geometries,
          i = -1, // geometries index
          n = geometries.length;
      while (++i < n) sum += areaType(geometries[i]);
      return sum;
    }

  }, 0);

  function polygonArea(coordinates) {
    var sum = area(coordinates[0]), // exterior ring
        i = 0, // coordinates.index
        n = coordinates.length;
    while (++i < n) sum -= area(coordinates[i]); // holes
    return sum;
  }

  function polygonCentroid(coordinates) {
    var polygon = d3.geom.polygon(coordinates[0].map(projection)), // exterior ring
        area = polygon.area(),
        centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1),
        x = centroid[0],
        y = centroid[1],
        z = area,
        i = 0, // coordinates index
        n = coordinates.length;
    while (++i < n) {
      polygon = d3.geom.polygon(coordinates[i].map(projection)); // holes
      area = polygon.area();
      centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1);
      x -= centroid[0];
      y -= centroid[1];
      z -= area;
    }
    return [x, y, 6 * z]; // weighted centroid
  }

  var centroidType = path.centroid = d3_geo_type({

    // TODO FeatureCollection
    // TODO Point
    // TODO MultiPoint
    // TODO LineString
    // TODO MultiLineString
    // TODO GeometryCollection

    Feature: function(o) {
      return centroidType(o.geometry);
    },

    Polygon: function(o) {
      var centroid = polygonCentroid(o.coordinates);
      return [centroid[0] / centroid[2], centroid[1] / centroid[2]];
    },

    MultiPolygon: function(o) {
      var area = 0,
          coordinates = o.coordinates,
          centroid,
          x = 0,
          y = 0,
          z = 0,
          i = -1, // coordinates index
          n = coordinates.length;
      while (++i < n) {
        centroid = polygonCentroid(coordinates[i]);
        x += centroid[0];
        y += centroid[1];
        z += centroid[2];
      }
      return [x / z, y / z];
    }

  });

  function area(coordinates) {
    return Math.abs(d3.geom.polygon(coordinates.map(projection)).area());
  }

  path.projection = function(x) {
    projection = x;
    return path;
  };

  path.pointRadius = function(x) {
    if (typeof x === "function") pointRadius = x;
    else {
      pointRadius = +x;
      pointCircle = d3_path_circle(pointRadius);
    }
    return path;
  };

  return path;
};

function d3_path_circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + (-2 * radius)
      + "a" + radius + "," + radius + " 0 1,1 0," + (+2 * radius)
      + "z";
}
/**
 * Given a GeoJSON object, returns the corresponding bounding box. The bounding
 * box is represented by a two-dimensional array: [[left, bottom], [right,
 * top]], where left is the minimum longitude, bottom is the minimum latitude,
 * right is maximum longitude, and top is the maximum latitude.
 */
d3.geo.bounds = function(feature) {
  var left = Infinity,
      bottom = Infinity,
      right = -Infinity,
      top = -Infinity;
  d3_geo_bounds(feature, function(x, y) {
    if (x < left) left = x;
    if (x > right) right = x;
    if (y < bottom) bottom = y;
    if (y > top) top = y;
  });
  return [[left, bottom], [right, top]];
};

function d3_geo_bounds(o, f) {
  if (d3_geo_boundsTypes.hasOwnProperty(o.type)) d3_geo_boundsTypes[o.type](o, f);
}

var d3_geo_boundsTypes = {
  Feature: d3_geo_boundsFeature,
  FeatureCollection: d3_geo_boundsFeatureCollection,
  GeometryCollection: d3_geo_boundsGeometryCollection,
  LineString: d3_geo_boundsLineString,
  MultiLineString: d3_geo_boundsMultiLineString,
  MultiPoint: d3_geo_boundsLineString,
  MultiPolygon: d3_geo_boundsMultiPolygon,
  Point: d3_geo_boundsPoint,
  Polygon: d3_geo_boundsPolygon
};

function d3_geo_boundsFeature(o, f) {
  d3_geo_bounds(o.geometry, f);
}

function d3_geo_boundsFeatureCollection(o, f) {
  for (var a = o.features, i = 0, n = a.length; i < n; i++) {
    d3_geo_bounds(a[i].geometry, f);
  }
}

function d3_geo_boundsGeometryCollection(o, f) {
  for (var a = o.geometries, i = 0, n = a.length; i < n; i++) {
    d3_geo_bounds(a[i], f);
  }
}

function d3_geo_boundsLineString(o, f) {
  for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
    f.apply(null, a[i]);
  }
}

function d3_geo_boundsMultiLineString(o, f) {
  for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
    for (var b = a[i], j = 0, m = b.length; j < m; j++) {
      f.apply(null, b[j]);
    }
  }
}

function d3_geo_boundsMultiPolygon(o, f) {
  for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
    for (var b = a[i][0], j = 0, m = b.length; j < m; j++) {
      f.apply(null, b[j]);
    }
  }
}

function d3_geo_boundsPoint(o, f) {
  f.apply(null, o.coordinates);
}

function d3_geo_boundsPolygon(o, f) {
  for (var a = o.coordinates[0], i = 0, n = a.length; i < n; i++) {
    f.apply(null, a[i]);
  }
}
// TODO breakAtDateLine?

d3.geo.circle = function() {
  var origin = [0, 0],
      degrees = 90 - 1e-2,
      radians = degrees * d3_geo_radians,
      arc = d3.geo.greatArc().source(origin).target(d3_identity);

  function circle() {
    // TODO render a circle as a Polygon
  }

  function visible(point) {
    return arc.distance(point) < radians;
  }

  circle.clip = function(d) {
    if (typeof origin === "function") arc.source(origin.apply(this, arguments));
    return clipType(d) || null;
  };

  var clipType = d3_geo_type({

    FeatureCollection: function(o) {
      var features = o.features.map(clipType).filter(d3_identity);
      return features && (o = Object.create(o), o.features = features, o);
    },

    Feature: function(o) {
      var geometry = clipType(o.geometry);
      return geometry && (o = Object.create(o), o.geometry = geometry, o);
    },

    Point: function(o) {
      return visible(o.coordinates) && o;
    },

    MultiPoint: function(o) {
      var coordinates = o.coordinates.filter(visible);
      return coordinates.length && {
        type: o.type,
        coordinates: coordinates
      };
    },

    LineString: function(o) {
      var coordinates = clip(o.coordinates);
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    MultiLineString: function(o) {
      var coordinates = o.coordinates.map(clip).filter(function(d) { return d.length; });
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    Polygon: function(o) {
      var coordinates = o.coordinates.map(clip);
      return coordinates[0].length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    MultiPolygon: function(o) {
      var coordinates = o.coordinates.map(function(d) { return d.map(clip); }).filter(function(d) { return d[0].length; });
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    GeometryCollection: function(o) {
      var geometries = o.geometries.map(clipType).filter(d3_identity);
      return geometries.length && (o = Object.create(o), o.geometries = geometries, o);
    }

  });

  function clip(coordinates) {
    var i = -1,
        n = coordinates.length,
        clipped = [],
        p0,
        p1,
        p2,
        d0,
        d1;

    while (++i < n) {
      d1 = arc.distance(p2 = coordinates[i]);
      if (d1 < radians) {
        if (p1) clipped.push(d3_geo_greatArcInterpolate(p1, p2)((d0 - radians) / (d0 - d1)));
        clipped.push(p2);
        p0 = p1 = null;
      } else {
        p1 = p2;
        if (!p0 && clipped.length) {
          clipped.push(d3_geo_greatArcInterpolate(clipped[clipped.length - 1], p1)((radians - d0) / (d1 - d0)));
          p0 = p1;
        }
      }
      d0 = d1;
    }

    // Close the clipped polygon if necessary.
    p0 = coordinates[0];
    p1 = clipped[0];
    if (p1 && p2[0] === p0[0] && p2[1] === p0[1] && !(p2[0] === p1[0] && p2[1] === p1[1])) {
      clipped.push(p1);
    }

    return resample(clipped);
  }

  // Resample coordinates, creating great arcs between each.
  function resample(coordinates) {
    var i = 0,
        n = coordinates.length,
        j,
        m,
        resampled = n ? [coordinates[0]] : coordinates,
        resamples,
        origin = arc.source();

    while (++i < n) {
      resamples = arc.source(coordinates[i - 1])(coordinates[i]).coordinates;
      for (j = 0, m = resamples.length; ++j < m;) resampled.push(resamples[j]);
    }

    arc.source(origin);
    return resampled;
  }

  circle.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    if (typeof origin !== "function") arc.source(origin);
    return circle;
  };

  circle.angle = function(x) {
    if (!arguments.length) return degrees;
    radians = (degrees = +x) * d3_geo_radians;
    return circle;
  };

  return d3.rebind(circle, arc, "precision");
}
d3.geo.greatArc = function() {
  var source = d3_geo_greatArcSource, p0,
      target = d3_geo_greatArcTarget, p1,
      precision = 6 * d3_geo_radians,
      interpolate = d3_geo_greatArcInterpolator();

  function greatArc() {
    var d = greatArc.distance.apply(this, arguments), // initializes the interpolator, too
        t = 0,
        dt = precision / d,
        coordinates = [p0];
    while ((t += dt) < 1) coordinates.push(interpolate(t));
    coordinates.push(p1);
    return {type: "LineString", coordinates: coordinates};
  }

  // Length returned in radians; multiply by radius for distance.
  greatArc.distance = function() {
    if (typeof source === "function") interpolate.source(p0 = source.apply(this, arguments));
    if (typeof target === "function") interpolate.target(p1 = target.apply(this, arguments));
    return interpolate.distance();
  };

  greatArc.source = function(_) {
    if (!arguments.length) return source;
    source = _;
    if (typeof source !== "function") interpolate.source(p0 = source);
    return greatArc;
  };

  greatArc.target = function(_) {
    if (!arguments.length) return target;
    target = _;
    if (typeof target !== "function") interpolate.target(p1 = target);
    return greatArc;
  };

  // Precision is specified in degrees.
  greatArc.precision = function(_) {
    if (!arguments.length) return precision / d3_geo_radians;
    precision = _ * d3_geo_radians;
    return greatArc;
  };

  return greatArc;
};

function d3_geo_greatArcSource(d) {
  return d.source;
}

function d3_geo_greatArcTarget(d) {
  return d.target;
}

function d3_geo_greatArcInterpolator() {
  var x0, y0, cy0, sy0, kx0, ky0,
      x1, y1, cy1, sy1, kx1, ky1,
      d,
      k;

  function interpolate(t) {
    var B = Math.sin(t *= d) * k,
        A = Math.sin(d - t) * k,
        x = A * kx0 + B * kx1,
        y = A * ky0 + B * ky1,
        z = A * sy0 + B * sy1;
    return [
      Math.atan2(y, x) / d3_geo_radians,
      Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_geo_radians
    ];
  }

  interpolate.distance = function() {
    if (d == null) k = 1 / Math.sin(d = Math.acos(Math.max(-1, Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)))));
    return d;
  };

  interpolate.source = function(_) {
    var cx0 = Math.cos(x0 = _[0] * d3_geo_radians),
        sx0 = Math.sin(x0);
    cy0 = Math.cos(y0 = _[1] * d3_geo_radians);
    sy0 = Math.sin(y0);
    kx0 = cy0 * cx0;
    ky0 = cy0 * sx0;
    d = null;
    return interpolate;
  };

  interpolate.target = function(_) {
    var cx1 = Math.cos(x1 = _[0] * d3_geo_radians),
        sx1 = Math.sin(x1);
    cy1 = Math.cos(y1 = _[1] * d3_geo_radians);
    sy1 = Math.sin(y1);
    kx1 = cy1 * cx1;
    ky1 = cy1 * sx1;
    d = null;
    return interpolate;
  };

  return interpolate;
}

function d3_geo_greatArcInterpolate(a, b) {
  var i = d3_geo_greatArcInterpolator().source(a).target(b);
  i.distance();
  return i;
}
d3.geo.greatCircle = d3.geo.circle;
d3.geom = {};
/**
 * Computes a contour for a given input grid function using the <a
 * href="http://en.wikipedia.org/wiki/Marching_squares">marching
 * squares</a> algorithm. Returns the contour polygon as an array of points.
 *
 * @param grid a two-input function(x, y) that returns true for values
 * inside the contour and false for values outside the contour.
 * @param start an optional starting point [x, y] on the grid.
 * @returns polygon [[x1, y1], [x2, y2], …]
 */
d3.geom.contour = function(grid, start) {
  var s = start || d3_geom_contourStart(grid), // starting point
      c = [],    // contour polygon
      x = s[0],  // current x position
      y = s[1],  // current y position
      dx = 0,    // next x direction
      dy = 0,    // next y direction
      pdx = NaN, // previous x direction
      pdy = NaN, // previous y direction
      i = 0;

  do {
    // determine marching squares index
    i = 0;
    if (grid(x-1, y-1)) i += 1;
    if (grid(x,   y-1)) i += 2;
    if (grid(x-1, y  )) i += 4;
    if (grid(x,   y  )) i += 8;

    // determine next direction
    if (i === 6) {
      dx = pdy === -1 ? -1 : 1;
      dy = 0;
    } else if (i === 9) {
      dx = 0;
      dy = pdx === 1 ? -1 : 1;
    } else {
      dx = d3_geom_contourDx[i];
      dy = d3_geom_contourDy[i];
    }

    // update contour polygon
    if (dx != pdx && dy != pdy) {
      c.push([x, y]);
      pdx = dx;
      pdy = dy;
    }

    x += dx;
    y += dy;
  } while (s[0] != x || s[1] != y);

  return c;
};

// lookup tables for marching directions
var d3_geom_contourDx = [1, 0, 1, 1,-1, 0,-1, 1,0, 0,0,0,-1, 0,-1,NaN],
    d3_geom_contourDy = [0,-1, 0, 0, 0,-1, 0, 0,1,-1,1,1, 0,-1, 0,NaN];

function d3_geom_contourStart(grid) {
  var x = 0,
      y = 0;

  // search for a starting point; begin at origin
  // and proceed along outward-expanding diagonals
  while (true) {
    if (grid(x,y)) {
      return [x,y];
    }
    if (x === 0) {
      x = y + 1;
      y = 0;
    } else {
      x = x - 1;
      y = y + 1;
    }
  }
}
/**
 * Computes the 2D convex hull of a set of points using Graham's scanning
 * algorithm. The algorithm has been implemented as described in Cormen,
 * Leiserson, and Rivest's Introduction to Algorithms. The running time of
 * this algorithm is O(n log n), where n is the number of input points.
 *
 * @param vertices [[x1, y1], [x2, y2], …]
 * @returns polygon [[x1, y1], [x2, y2], …]
 */
d3.geom.hull = function(vertices) {
  if (vertices.length < 3) return [];

  var len = vertices.length,
      plen = len - 1,
      points = [],
      stack = [],
      i, j, h = 0, x1, y1, x2, y2, u, v, a, sp;

  // find the starting ref point: leftmost point with the minimum y coord
  for (i=1; i<len; ++i) {
    if (vertices[i][1] < vertices[h][1]) {
      h = i;
    } else if (vertices[i][1] == vertices[h][1]) {
      h = (vertices[i][0] < vertices[h][0] ? i : h);
    }
  }

  // calculate polar angles from ref point and sort
  for (i=0; i<len; ++i) {
    if (i === h) continue;
    y1 = vertices[i][1] - vertices[h][1];
    x1 = vertices[i][0] - vertices[h][0];
    points.push({angle: Math.atan2(y1, x1), index: i});
  }
  points.sort(function(a, b) { return a.angle - b.angle; });

  // toss out duplicate angles
  a = points[0].angle;
  v = points[0].index;
  u = 0;
  for (i=1; i<plen; ++i) {
    j = points[i].index;
    if (a == points[i].angle) {
      // keep angle for point most distant from the reference
      x1 = vertices[v][0] - vertices[h][0];
      y1 = vertices[v][1] - vertices[h][1];
      x2 = vertices[j][0] - vertices[h][0];
      y2 = vertices[j][1] - vertices[h][1];
      if ((x1*x1 + y1*y1) >= (x2*x2 + y2*y2)) {
        points[i].index = -1;
      } else {
        points[u].index = -1;
        a = points[i].angle;
        u = i;
        v = j;
      }
    } else {
      a = points[i].angle;
      u = i;
      v = j;
    }
  }

  // initialize the stack
  stack.push(h);
  for (i=0, j=0; i<2; ++j) {
    if (points[j].index !== -1) {
      stack.push(points[j].index);
      i++;
    }
  }
  sp = stack.length;

  // do graham's scan
  for (; j<plen; ++j) {
    if (points[j].index === -1) continue; // skip tossed out points
    while (!d3_geom_hullCCW(stack[sp-2], stack[sp-1], points[j].index, vertices)) {
      --sp;
    }
    stack[sp++] = points[j].index;
  }

  // construct the hull
  var poly = [];
  for (i=0; i<sp; ++i) {
    poly.push(vertices[stack[i]]);
  }
  return poly;
}

// are three points in counter-clockwise order?
function d3_geom_hullCCW(i1, i2, i3, v) {
  var t, a, b, c, d, e, f;
  t = v[i1]; a = t[0]; b = t[1];
  t = v[i2]; c = t[0]; d = t[1];
  t = v[i3]; e = t[0]; f = t[1];
  return ((f-b)*(c-a) - (d-b)*(e-a)) > 0;
}
// Note: requires coordinates to be counterclockwise and convex!
d3.geom.polygon = function(coordinates) {

  coordinates.area = function() {
    var i = 0,
        n = coordinates.length,
        a = coordinates[n - 1][0] * coordinates[0][1],
        b = coordinates[n - 1][1] * coordinates[0][0];
    while (++i < n) {
      a += coordinates[i - 1][0] * coordinates[i][1];
      b += coordinates[i - 1][1] * coordinates[i][0];
    }
    return (b - a) * .5;
  };

  coordinates.centroid = function(k) {
    var i = -1,
        n = coordinates.length,
        x = 0,
        y = 0,
        a,
        b = coordinates[n - 1],
        c;
    if (!arguments.length) k = -1 / (6 * coordinates.area());
    while (++i < n) {
      a = b;
      b = coordinates[i];
      c = a[0] * b[1] - b[0] * a[1];
      x += (a[0] + b[0]) * c;
      y += (a[1] + b[1]) * c;
    }
    return [x * k, y * k];
  };

  // The Sutherland-Hodgman clipping algorithm.
  coordinates.clip = function(subject) {
    var input,
        i = -1,
        n = coordinates.length,
        j,
        m,
        a = coordinates[n - 1],
        b,
        c,
        d;
    while (++i < n) {
      input = subject.slice();
      subject.length = 0;
      b = coordinates[i];
      c = input[(m = input.length) - 1];
      j = -1;
      while (++j < m) {
        d = input[j];
        if (d3_geom_polygonInside(d, a, b)) {
          if (!d3_geom_polygonInside(c, a, b)) {
            subject.push(d3_geom_polygonIntersect(c, d, a, b));
          }
          subject.push(d);
        } else if (d3_geom_polygonInside(c, a, b)) {
          subject.push(d3_geom_polygonIntersect(c, d, a, b));
        }
        c = d;
      }
      a = b;
    }
    return subject;
  };

  return coordinates;
};

function d3_geom_polygonInside(p, a, b) {
  return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
}

// Intersect two infinite lines cd and ab.
function d3_geom_polygonIntersect(c, d, a, b) {
  var x1 = c[0], x2 = d[0], x3 = a[0], x4 = b[0],
      y1 = c[1], y2 = d[1], y3 = a[1], y4 = b[1],
      x13 = x1 - x3,
      x21 = x2 - x1,
      x43 = x4 - x3,
      y13 = y1 - y3,
      y21 = y2 - y1,
      y43 = y4 - y3,
      ua = (x43 * y13 - y43 * x13) / (y43 * x21 - x43 * y21);
  return [x1 + ua * x21, y1 + ua * y21];
}
// Adapted from Nicolas Garcia Belmonte's JIT implementation:
// http://blog.thejit.org/2010/02/12/voronoi-tessellation/
// http://blog.thejit.org/assets/voronoijs/voronoi.js
// See lib/jit/LICENSE for details.

// Notes:
//
// This implementation does not clip the returned polygons, so if you want to
// clip them to a particular shape you will need to do that either in SVG or by
// post-processing with d3.geom.polygon's clip method.
//
// If any vertices are coincident or have NaN positions, the behavior of this
// method is undefined. Most likely invalid polygons will be returned. You
// should filter invalid points, and consolidate coincident points, before
// computing the tessellation.

/**
 * @param vertices [[x1, y1], [x2, y2], …]
 * @returns polygons [[[x1, y1], [x2, y2], …], …]
 */
d3.geom.voronoi = function(vertices) {
  var polygons = vertices.map(function() { return []; });

  d3_voronoi_tessellate(vertices, function(e) {
    var s1,
        s2,
        x1,
        x2,
        y1,
        y2;
    if (e.a === 1 && e.b >= 0) {
      s1 = e.ep.r;
      s2 = e.ep.l;
    } else {
      s1 = e.ep.l;
      s2 = e.ep.r;
    }
    if (e.a === 1) {
      y1 = s1 ? s1.y : -1e6;
      x1 = e.c - e.b * y1;
      y2 = s2 ? s2.y : 1e6;
      x2 = e.c - e.b * y2;
    } else {
      x1 = s1 ? s1.x : -1e6;
      y1 = e.c - e.a * x1;
      x2 = s2 ? s2.x : 1e6;
      y2 = e.c - e.a * x2;
    }
    var v1 = [x1, y1],
        v2 = [x2, y2];
    polygons[e.region.l.index].push(v1, v2);
    polygons[e.region.r.index].push(v1, v2);
  });

  // Reconnect the polygon segments into counterclockwise loops.
  return polygons.map(function(polygon, i) {
    var cx = vertices[i][0],
        cy = vertices[i][1];
    polygon.forEach(function(v) {
      v.angle = Math.atan2(v[0] - cx, v[1] - cy);
    });
    return polygon.sort(function(a, b) {
      return a.angle - b.angle;
    }).filter(function(d, i) {
      return !i || (d.angle - polygon[i - 1].angle > 1e-10);
    });
  });
};

var d3_voronoi_opposite = {"l": "r", "r": "l"};

function d3_voronoi_tessellate(vertices, callback) {

  var Sites = {
    list: vertices
      .map(function(v, i) {
        return {
          index: i,
          x: v[0],
          y: v[1]
        };
      })
      .sort(function(a, b) {
        return a.y < b.y ? -1
          : a.y > b.y ? 1
          : a.x < b.x ? -1
          : a.x > b.x ? 1
          : 0;
      }),
    bottomSite: null
  };

  var EdgeList = {
    list: [],
    leftEnd: null,
    rightEnd: null,

    init: function() {
      EdgeList.leftEnd = EdgeList.createHalfEdge(null, "l");
      EdgeList.rightEnd = EdgeList.createHalfEdge(null, "l");
      EdgeList.leftEnd.r = EdgeList.rightEnd;
      EdgeList.rightEnd.l = EdgeList.leftEnd;
      EdgeList.list.unshift(EdgeList.leftEnd, EdgeList.rightEnd);
    },

    createHalfEdge: function(edge, side) {
      return {
        edge: edge,
        side: side,
        vertex: null,
        "l": null,
        "r": null
      };
    },

    insert: function(lb, he) {
      he.l = lb;
      he.r = lb.r;
      lb.r.l = he;
      lb.r = he;
    },

    leftBound: function(p) {
      var he = EdgeList.leftEnd;
      do {
        he = he.r;
      } while (he != EdgeList.rightEnd && Geom.rightOf(he, p));
      he = he.l;
      return he;
    },

    del: function(he) {
      he.l.r = he.r;
      he.r.l = he.l;
      he.edge = null;
    },

    right: function(he) {
      return he.r;
    },

    left: function(he) {
      return he.l;
    },

    leftRegion: function(he) {
      return he.edge == null
          ? Sites.bottomSite
          : he.edge.region[he.side];
    },

    rightRegion: function(he) {
      return he.edge == null
          ? Sites.bottomSite
          : he.edge.region[d3_voronoi_opposite[he.side]];
    }
  };

  var Geom = {

    bisect: function(s1, s2) {
      var newEdge = {
        region: {"l": s1, "r": s2},
        ep: {"l": null, "r": null}
      };

      var dx = s2.x - s1.x,
          dy = s2.y - s1.y,
          adx = dx > 0 ? dx : -dx,
          ady = dy > 0 ? dy : -dy;

      newEdge.c = s1.x * dx + s1.y * dy
          + (dx * dx + dy * dy) * .5;

      if (adx > ady) {
        newEdge.a = 1;
        newEdge.b = dy / dx;
        newEdge.c /= dx;
      } else {
        newEdge.b = 1;
        newEdge.a = dx / dy;
        newEdge.c /= dy;
      }

      return newEdge;
    },

    intersect: function(el1, el2) {
      var e1 = el1.edge,
          e2 = el2.edge;
      if (!e1 || !e2 || (e1.region.r == e2.region.r)) {
        return null;
      }
      var d = (e1.a * e2.b) - (e1.b * e2.a);
      if (Math.abs(d) < 1e-10) {
        return null;
      }
      var xint = (e1.c * e2.b - e2.c * e1.b) / d,
          yint = (e2.c * e1.a - e1.c * e2.a) / d,
          e1r = e1.region.r,
          e2r = e2.region.r,
          el,
          e;
      if ((e1r.y < e2r.y) ||
         (e1r.y == e2r.y && e1r.x < e2r.x)) {
        el = el1;
        e = e1;
      } else {
        el = el2;
        e = e2;
      }
      var rightOfSite = (xint >= e.region.r.x);
      if ((rightOfSite && (el.side === "l")) ||
        (!rightOfSite && (el.side === "r"))) {
        return null;
      }
      return {
        x: xint,
        y: yint
      };
    },

    rightOf: function(he, p) {
      var e = he.edge,
          topsite = e.region.r,
          rightOfSite = (p.x > topsite.x);

      if (rightOfSite && (he.side === "l")) {
        return 1;
      }
      if (!rightOfSite && (he.side === "r")) {
        return 0;
      }
      if (e.a === 1) {
        var dyp = p.y - topsite.y,
            dxp = p.x - topsite.x,
            fast = 0,
            above = 0;

        if ((!rightOfSite && (e.b < 0)) ||
          (rightOfSite && (e.b >= 0))) {
          above = fast = (dyp >= e.b * dxp);
        } else {
          above = ((p.x + p.y * e.b) > e.c);
          if (e.b < 0) {
            above = !above;
          }
          if (!above) {
            fast = 1;
          }
        }
        if (!fast) {
          var dxs = topsite.x - e.region.l.x;
          above = (e.b * (dxp * dxp - dyp * dyp)) <
            (dxs * dyp * (1 + 2 * dxp / dxs + e.b * e.b));

          if (e.b < 0) {
            above = !above;
          }
        }
      } else /* e.b == 1 */ {
        var yl = e.c - e.a * p.x,
            t1 = p.y - yl,
            t2 = p.x - topsite.x,
            t3 = yl - topsite.y;

        above = (t1 * t1) > (t2 * t2 + t3 * t3);
      }
      return he.side === "l" ? above : !above;
    },

    endPoint: function(edge, side, site) {
      edge.ep[side] = site;
      if (!edge.ep[d3_voronoi_opposite[side]]) return;
      callback(edge);
    },

    distance: function(s, t) {
      var dx = s.x - t.x,
          dy = s.y - t.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  };

  var EventQueue = {
    list: [],

    insert: function(he, site, offset) {
      he.vertex = site;
      he.ystar = site.y + offset;
      for (var i=0, list=EventQueue.list, l=list.length; i<l; i++) {
        var next = list[i];
        if (he.ystar > next.ystar ||
          (he.ystar == next.ystar &&
          site.x > next.vertex.x)) {
          continue;
        } else {
          break;
        }
      }
      list.splice(i, 0, he);
    },

    del: function(he) {
      for (var i=0, ls=EventQueue.list, l=ls.length; i<l && (ls[i] != he); ++i) {}
      ls.splice(i, 1);
    },

    empty: function() { return EventQueue.list.length === 0; },

    nextEvent: function(he) {
      for (var i=0, ls=EventQueue.list, l=ls.length; i<l; ++i) {
        if (ls[i] == he) return ls[i+1];
      }
      return null;
    },

    min: function() {
      var elem = EventQueue.list[0];
      return {
        x: elem.vertex.x,
        y: elem.ystar
      };
    },

    extractMin: function() {
      return EventQueue.list.shift();
    }
  };

  EdgeList.init();
  Sites.bottomSite = Sites.list.shift();

  var newSite = Sites.list.shift(), newIntStar;
  var lbnd, rbnd, llbnd, rrbnd, bisector;
  var bot, top, temp, p, v;
  var e, pm;

  while (true) {
    if (!EventQueue.empty()) {
      newIntStar = EventQueue.min();
    }
    if (newSite && (EventQueue.empty()
      || newSite.y < newIntStar.y
      || (newSite.y == newIntStar.y
      && newSite.x < newIntStar.x))) { //new site is smallest
      lbnd = EdgeList.leftBound(newSite);
      rbnd = EdgeList.right(lbnd);
      bot = EdgeList.rightRegion(lbnd);
      e = Geom.bisect(bot, newSite);
      bisector = EdgeList.createHalfEdge(e, "l");
      EdgeList.insert(lbnd, bisector);
      p = Geom.intersect(lbnd, bisector);
      if (p) {
        EventQueue.del(lbnd);
        EventQueue.insert(lbnd, p, Geom.distance(p, newSite));
      }
      lbnd = bisector;
      bisector = EdgeList.createHalfEdge(e, "r");
      EdgeList.insert(lbnd, bisector);
      p = Geom.intersect(bisector, rbnd);
      if (p) {
        EventQueue.insert(bisector, p, Geom.distance(p, newSite));
      }
      newSite = Sites.list.shift();
    } else if (!EventQueue.empty()) { //intersection is smallest
      lbnd = EventQueue.extractMin();
      llbnd = EdgeList.left(lbnd);
      rbnd = EdgeList.right(lbnd);
      rrbnd = EdgeList.right(rbnd);
      bot = EdgeList.leftRegion(lbnd);
      top = EdgeList.rightRegion(rbnd);
      v = lbnd.vertex;
      Geom.endPoint(lbnd.edge, lbnd.side, v);
      Geom.endPoint(rbnd.edge, rbnd.side, v);
      EdgeList.del(lbnd);
      EventQueue.del(rbnd);
      EdgeList.del(rbnd);
      pm = "l";
      if (bot.y > top.y) {
        temp = bot;
        bot = top;
        top = temp;
        pm = "r";
      }
      e = Geom.bisect(bot, top);
      bisector = EdgeList.createHalfEdge(e, pm);
      EdgeList.insert(llbnd, bisector);
      Geom.endPoint(e, d3_voronoi_opposite[pm], v);
      p = Geom.intersect(llbnd, bisector);
      if (p) {
        EventQueue.del(llbnd);
        EventQueue.insert(llbnd, p, Geom.distance(p, bot));
      }
      p = Geom.intersect(bisector, rrbnd);
      if (p) {
        EventQueue.insert(bisector, p, Geom.distance(p, bot));
      }
    } else {
      break;
    }
  }//end while

  for (lbnd = EdgeList.right(EdgeList.leftEnd);
      lbnd != EdgeList.rightEnd;
      lbnd = EdgeList.right(lbnd)) {
    callback(lbnd.edge);
  }
}
/**
* @param vertices [[x1, y1], [x2, y2], …]
* @returns triangles [[[x1, y1], [x2, y2], [x3, y3]], …]
 */
d3.geom.delaunay = function(vertices) {
  var edges = vertices.map(function() { return []; }),
      triangles = [];

  // Use the Voronoi tessellation to determine Delaunay edges.
  d3_voronoi_tessellate(vertices, function(e) {
    edges[e.region.l.index].push(vertices[e.region.r.index]);
  });

  // Reconnect the edges into counterclockwise triangles.
  edges.forEach(function(edge, i) {
    var v = vertices[i],
        cx = v[0],
        cy = v[1];
    edge.forEach(function(v) {
      v.angle = Math.atan2(v[0] - cx, v[1] - cy);
    });
    edge.sort(function(a, b) {
      return a.angle - b.angle;
    });
    for (var j = 0, m = edge.length - 1; j < m; j++) {
      triangles.push([v, edge[j], edge[j + 1]]);
    }
  });

  return triangles;
};
// Constructs a new quadtree for the specified array of points. A quadtree is a
// two-dimensional recursive spatial subdivision. This implementation uses
// square partitions, dividing each square into four equally-sized squares. Each
// point exists in a unique node; if multiple points are in the same position,
// some points may be stored on internal nodes rather than leaf nodes. Quadtrees
// can be used to accelerate various spatial operations, such as the Barnes-Hut
// approximation for computing n-body forces, or collision detection.
d3.geom.quadtree = function(points, x1, y1, x2, y2) {
  var p,
      i = -1,
      n = points.length;

  // Type conversion for deprecated API.
  if (n && isNaN(points[0].x)) points = points.map(d3_geom_quadtreePoint);

  // Allow bounds to be specified explicitly.
  if (arguments.length < 5) {
    if (arguments.length === 3) {
      y2 = x2 = y1;
      y1 = x1;
    } else {
      x1 = y1 = Infinity;
      x2 = y2 = -Infinity;

      // Compute bounds.
      while (++i < n) {
        p = points[i];
        if (p.x < x1) x1 = p.x;
        if (p.y < y1) y1 = p.y;
        if (p.x > x2) x2 = p.x;
        if (p.y > y2) y2 = p.y;
      }

      // Squarify the bounds.
      var dx = x2 - x1,
          dy = y2 - y1;
      if (dx > dy) y2 = y1 + dx;
      else x2 = x1 + dy;
    }
  }

  // Recursively inserts the specified point p at the node n or one of its
  // descendants. The bounds are defined by [x1, x2] and [y1, y2].
  function insert(n, p, x1, y1, x2, y2) {
    if (isNaN(p.x) || isNaN(p.y)) return; // ignore invalid points
    if (n.leaf) {
      var v = n.point;
      if (v) {
        // If the point at this leaf node is at the same position as the new
        // point we are adding, we leave the point associated with the
        // internal node while adding the new point to a child node. This
        // avoids infinite recursion.
        if ((Math.abs(v.x - p.x) + Math.abs(v.y - p.y)) < .01) {
          insertChild(n, p, x1, y1, x2, y2);
        } else {
          n.point = null;
          insertChild(n, v, x1, y1, x2, y2);
          insertChild(n, p, x1, y1, x2, y2);
        }
      } else {
        n.point = p;
      }
    } else {
      insertChild(n, p, x1, y1, x2, y2);
    }
  }

  // Recursively inserts the specified point p into a descendant of node n. The
  // bounds are defined by [x1, x2] and [y1, y2].
  function insertChild(n, p, x1, y1, x2, y2) {
    // Compute the split point, and the quadrant in which to insert p.
    var sx = (x1 + x2) * .5,
        sy = (y1 + y2) * .5,
        right = p.x >= sx,
        bottom = p.y >= sy,
        i = (bottom << 1) + right;

    // Recursively insert into the child node.
    n.leaf = false;
    n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());

    // Update the bounds as we recurse.
    if (right) x1 = sx; else x2 = sx;
    if (bottom) y1 = sy; else y2 = sy;
    insert(n, p, x1, y1, x2, y2);
  }

  // Create the root node.
  var root = d3_geom_quadtreeNode();

  root.add = function(p) {
    insert(root, p, x1, y1, x2, y2);
  };

  root.visit = function(f) {
    d3_geom_quadtreeVisit(f, root, x1, y1, x2, y2);
  };

  // Insert all points.
  points.forEach(root.add);
  return root;
};

function d3_geom_quadtreeNode() {
  return {
    leaf: true,
    nodes: [],
    point: null
  };
}

function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
  if (!f(node, x1, y1, x2, y2)) {
    var sx = (x1 + x2) * .5,
        sy = (y1 + y2) * .5,
        children = node.nodes;
    if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
    if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
    if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
    if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
  }
}

function d3_geom_quadtreePoint(p) {
  return {
    x: p[0],
    y: p[1]
  };
}
d3.time = {};

var d3_time = Date,
    d3_time_daySymbols = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function d3_time_utc() {
  this._ = new Date(arguments.length > 1
      ? Date.UTC.apply(this, arguments)
      : arguments[0]);
}

d3_time_utc.prototype = {
  getDate: function() { return this._.getUTCDate(); },
  getDay: function() { return this._.getUTCDay(); },
  getFullYear: function() { return this._.getUTCFullYear(); },
  getHours: function() { return this._.getUTCHours(); },
  getMilliseconds: function() { return this._.getUTCMilliseconds(); },
  getMinutes: function() { return this._.getUTCMinutes(); },
  getMonth: function() { return this._.getUTCMonth(); },
  getSeconds: function() { return this._.getUTCSeconds(); },
  getTime: function() { return this._.getTime(); },
  getTimezoneOffset: function() { return 0; },
  valueOf: function() { return this._.valueOf(); },
  setDate: function() { d3_time_prototype.setUTCDate.apply(this._, arguments); },
  setDay: function() { d3_time_prototype.setUTCDay.apply(this._, arguments); },
  setFullYear: function() { d3_time_prototype.setUTCFullYear.apply(this._, arguments); },
  setHours: function() { d3_time_prototype.setUTCHours.apply(this._, arguments); },
  setMilliseconds: function() { d3_time_prototype.setUTCMilliseconds.apply(this._, arguments); },
  setMinutes: function() { d3_time_prototype.setUTCMinutes.apply(this._, arguments); },
  setMonth: function() { d3_time_prototype.setUTCMonth.apply(this._, arguments); },
  setSeconds: function() { d3_time_prototype.setUTCSeconds.apply(this._, arguments); },
  setTime: function() { d3_time_prototype.setTime.apply(this._, arguments); }
};

var d3_time_prototype = Date.prototype;
// The date and time format (%c), date format (%x) and time format (%X).
var d3_time_formatDateTime = "%a %b %e %H:%M:%S %Y",
    d3_time_formatDate = "%m/%d/%y",
    d3_time_formatTime = "%H:%M:%S";

// The weekday and month names.
var d3_time_days = d3_time_daySymbols,
    d3_time_dayAbbreviations = d3_time_days.map(d3_time_formatAbbreviate),
    d3_time_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    d3_time_monthAbbreviations = d3_time_months.map(d3_time_formatAbbreviate);

function d3_time_formatAbbreviate(name) {
  return name.substring(0, 3);
}
d3.time.format = function(template) {
  var n = template.length;

  function format(date) {
    var string = [],
        i = -1,
        j = 0,
        c,
        f;
    while (++i < n) {
      if (template.charCodeAt(i) == 37) {
        string.push(
            template.substring(j, i),
            (f = d3_time_formats[c = template.charAt(++i)])
            ? f(date) : c);
        j = i + 1;
      }
    }
    string.push(template.substring(j, i));
    return string.join("");
  }

  format.parse = function(string) {
    var d = {y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0},
        i = d3_time_parse(d, template, string, 0);
    if (i != string.length) return null;

    // The am-pm flag is 0 for AM, and 1 for PM.
    if ("p" in d) d.H = d.H % 12 + d.p * 12;

    var date = new d3_time();
    date.setFullYear(d.y, d.m, d.d);
    date.setHours(d.H, d.M, d.S, d.L);
    return date;
  };

  format.toString = function() {
    return template;
  };

  return format;
};

function d3_time_parse(date, template, string, j) {
  var c,
      p,
      i = 0,
      n = template.length,
      m = string.length;
  while (i < n) {
    if (j >= m) return -1;
    c = template.charCodeAt(i++);
    if (c == 37) {
      p = d3_time_parsers[template.charAt(i++)];
      if (!p || ((j = p(date, string, j)) < 0)) return -1;
    } else if (c != string.charCodeAt(j++)) {
      return -1;
    }
  }
  return j;
}

function d3_time_formatRe(names) {
  return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i");
}

function d3_time_formatLookup(names) {
  var map = new d3_Map, i = -1, n = names.length;
  while (++i < n) map.set(names[i].toLowerCase(), i);
  return map;
}

var d3_time_zfill2 = d3.format("02d"),
    d3_time_zfill3 = d3.format("03d"),
    d3_time_zfill4 = d3.format("04d"),
    d3_time_sfill2 = d3.format("2d");

var d3_time_dayRe = d3_time_formatRe(d3_time_days),
    d3_time_dayAbbrevRe = d3_time_formatRe(d3_time_dayAbbreviations),
    d3_time_monthRe = d3_time_formatRe(d3_time_months),
    d3_time_monthLookup = d3_time_formatLookup(d3_time_months),
    d3_time_monthAbbrevRe = d3_time_formatRe(d3_time_monthAbbreviations),
    d3_time_monthAbbrevLookup = d3_time_formatLookup(d3_time_monthAbbreviations);

var d3_time_formats = {
  a: function(d) { return d3_time_dayAbbreviations[d.getDay()]; },
  A: function(d) { return d3_time_days[d.getDay()]; },
  b: function(d) { return d3_time_monthAbbreviations[d.getMonth()]; },
  B: function(d) { return d3_time_months[d.getMonth()]; },
  c: d3.time.format(d3_time_formatDateTime),
  d: function(d) { return d3_time_zfill2(d.getDate()); },
  e: function(d) { return d3_time_sfill2(d.getDate()); },
  H: function(d) { return d3_time_zfill2(d.getHours()); },
  I: function(d) { return d3_time_zfill2(d.getHours() % 12 || 12); },
  j: function(d) { return d3_time_zfill3(1 + d3.time.dayOfYear(d)); },
  L: function(d) { return d3_time_zfill3(d.getMilliseconds()); },
  m: function(d) { return d3_time_zfill2(d.getMonth() + 1); },
  M: function(d) { return d3_time_zfill2(d.getMinutes()); },
  p: function(d) { return d.getHours() >= 12 ? "PM" : "AM"; },
  S: function(d) { return d3_time_zfill2(d.getSeconds()); },
  U: function(d) { return d3_time_zfill2(d3.time.sundayOfYear(d)); },
  w: function(d) { return d.getDay(); },
  W: function(d) { return d3_time_zfill2(d3.time.mondayOfYear(d)); },
  x: d3.time.format(d3_time_formatDate),
  X: d3.time.format(d3_time_formatTime),
  y: function(d) { return d3_time_zfill2(d.getFullYear() % 100); },
  Y: function(d) { return d3_time_zfill4(d.getFullYear() % 10000); },
  Z: d3_time_zone,
  "%": function(d) { return "%"; }
};

var d3_time_parsers = {
  a: d3_time_parseWeekdayAbbrev,
  A: d3_time_parseWeekday,
  b: d3_time_parseMonthAbbrev,
  B: d3_time_parseMonth,
  c: d3_time_parseLocaleFull,
  d: d3_time_parseDay,
  e: d3_time_parseDay,
  H: d3_time_parseHour24,
  I: d3_time_parseHour24,
  // j: function(d, s, i) { /*TODO day of year [001,366] */ return i; },
  L: d3_time_parseMilliseconds,
  m: d3_time_parseMonthNumber,
  M: d3_time_parseMinutes,
  p: d3_time_parseAmPm,
  S: d3_time_parseSeconds,
  // U: function(d, s, i) { /*TODO week number (sunday) [00,53] */ return i; },
  // w: function(d, s, i) { /*TODO weekday [0,6] */ return i; },
  // W: function(d, s, i) { /*TODO week number (monday) [00,53] */ return i; },
  x: d3_time_parseLocaleDate,
  X: d3_time_parseLocaleTime,
  y: d3_time_parseYear,
  Y: d3_time_parseFullYear
  // ,
  // Z: function(d, s, i) { /*TODO time zone */ return i; },
  // "%": function(d, s, i) { /*TODO literal % */ return i; }
};

// Note: weekday is validated, but does not set the date.
function d3_time_parseWeekdayAbbrev(date, string, i) {
  d3_time_dayAbbrevRe.lastIndex = 0;
  var n = d3_time_dayAbbrevRe.exec(string.substring(i));
  return n ? i += n[0].length : -1;
}

// Note: weekday is validated, but does not set the date.
function d3_time_parseWeekday(date, string, i) {
  d3_time_dayRe.lastIndex = 0;
  var n = d3_time_dayRe.exec(string.substring(i));
  return n ? i += n[0].length : -1;
}

function d3_time_parseMonthAbbrev(date, string, i) {
  d3_time_monthAbbrevRe.lastIndex = 0;
  var n = d3_time_monthAbbrevRe.exec(string.substring(i));
  return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
}

function d3_time_parseMonth(date, string, i) {
  d3_time_monthRe.lastIndex = 0;
  var n = d3_time_monthRe.exec(string.substring(i));
  return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
}

function d3_time_parseLocaleFull(date, string, i) {
  return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
}

function d3_time_parseLocaleDate(date, string, i) {
  return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
}

function d3_time_parseLocaleTime(date, string, i) {
  return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
}

function d3_time_parseFullYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 4));
  return n ? (date.y = +n[0], i += n[0].length) : -1;
}

function d3_time_parseYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.y = d3_time_expandYear(+n[0]), i += n[0].length) : -1;
}

function d3_time_expandYear(d) {
  return d + (d > 68 ? 1900 : 2000);
}

function d3_time_parseMonthNumber(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.m = n[0] - 1, i += n[0].length) : -1;
}

function d3_time_parseDay(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.d = +n[0], i += n[0].length) : -1;
}

// Note: we don't validate that the hour is in the range [0,23] or [1,12].
function d3_time_parseHour24(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.H = +n[0], i += n[0].length) : -1;
}

function d3_time_parseMinutes(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.M = +n[0], i += n[0].length) : -1;
}

function d3_time_parseSeconds(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.S = +n[0], i += n[0].length) : -1;
}

function d3_time_parseMilliseconds(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 3));
  return n ? (date.L = +n[0], i += n[0].length) : -1;
}

// Note: we don't look at the next directive.
var d3_time_numberRe = /^\s*\d+/;

function d3_time_parseAmPm(date, string, i) {
  var n = d3_time_amPmLookup.get(string.substring(i, i += 2).toLowerCase());
  return n == null ? -1 : (date.p = n, i);
}

var d3_time_amPmLookup = d3.map({
  am: 0,
  pm: 1
});

// TODO table of time zone offset names?
function d3_time_zone(d) {
  var z = d.getTimezoneOffset(),
      zs = z > 0 ? "-" : "+",
      zh = ~~(Math.abs(z) / 60),
      zm = Math.abs(z) % 60;
  return zs + d3_time_zfill2(zh) + d3_time_zfill2(zm);
}
d3.time.format.utc = function(template) {
  var local = d3.time.format(template);

  function format(date) {
    try {
      d3_time = d3_time_utc;
      var utc = new d3_time();
      utc._ = date;
      return local(utc);
    } finally {
      d3_time = Date;
    }
  }

  format.parse = function(string) {
    try {
      d3_time = d3_time_utc;
      var date = local.parse(string);
      return date && date._;
    } finally {
      d3_time = Date;
    }
  };

  format.toString = local.toString;

  return format;
};
var d3_time_formatIso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");

d3.time.format.iso = Date.prototype.toISOString ? d3_time_formatIsoNative : d3_time_formatIso;

function d3_time_formatIsoNative(date) {
  return date.toISOString();
}

d3_time_formatIsoNative.parse = function(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
};

d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
function d3_time_interval(local, step, number) {

  function round(date) {
    var d0 = local(date), d1 = offset(d0, 1);
    return date - d0 < d1 - date ? d0 : d1;
  }

  function ceil(date) {
    step(date = local(new d3_time(date - 1)), 1);
    return date;
  }

  function offset(date, k) {
    step(date = new d3_time(+date), k);
    return date;
  }

  function range(t0, t1, dt) {
    var time = ceil(t0), times = [];
    if (dt > 1) {
      while (time < t1) {
        if (!(number(time) % dt)) times.push(new Date(+time));
        step(time, 1);
      }
    } else {
      while (time < t1) times.push(new Date(+time)), step(time, 1);
    }
    return times;
  }

  function range_utc(t0, t1, dt) {
    try {
      d3_time = d3_time_utc;
      var utc = new d3_time_utc();
      utc._ = t0;
      return range(utc, t1, dt);
    } finally {
      d3_time = Date;
    }
  }

  local.floor = local;
  local.round = round;
  local.ceil = ceil;
  local.offset = offset;
  local.range = range;

  var utc = local.utc = d3_time_interval_utc(local);
  utc.floor = utc;
  utc.round = d3_time_interval_utc(round);
  utc.ceil = d3_time_interval_utc(ceil);
  utc.offset = d3_time_interval_utc(offset);
  utc.range = range_utc;

  return local;
}

function d3_time_interval_utc(method) {
  return function(date, k) {
    try {
      d3_time = d3_time_utc;
      var utc = new d3_time_utc();
      utc._ = date;
      return method(utc, k)._;
    } finally {
      d3_time = Date;
    }
  };
}
d3.time.second = d3_time_interval(function(date) {
  return new d3_time(Math.floor(date / 1e3) * 1e3);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 1e3); // DST breaks setSeconds
}, function(date) {
  return date.getSeconds();
});

d3.time.seconds = d3.time.second.range;
d3.time.seconds.utc = d3.time.second.utc.range;
d3.time.minute = d3_time_interval(function(date) {
  return new d3_time(Math.floor(date / 6e4) * 6e4);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 6e4); // DST breaks setMinutes
}, function(date) {
  return date.getMinutes();
});

d3.time.minutes = d3.time.minute.range;
d3.time.minutes.utc = d3.time.minute.utc.range;
d3.time.hour = d3_time_interval(function(date) {
  var timezone = date.getTimezoneOffset() / 60;
  return new d3_time((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 36e5); // DST breaks setHours
}, function(date) {
  return date.getHours();
});

d3.time.hours = d3.time.hour.range;
d3.time.hours.utc = d3.time.hour.utc.range;
d3.time.day = d3_time_interval(function(date) {
  var day = new d3_time(1970, 0);
  day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  return day;
}, function(date, offset) {
  date.setDate(date.getDate() + offset);
}, function(date) {
  return date.getDate() - 1;
});

d3.time.days = d3.time.day.range;
d3.time.days.utc = d3.time.day.utc.range;

d3.time.dayOfYear = function(date) {
  var year = d3.time.year(date);
  return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
};
d3_time_daySymbols.forEach(function(day, i) {
  day = day.toLowerCase();
  i = 7 - i;

  var interval = d3.time[day] = d3_time_interval(function(date) {
    (date = d3.time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
    return date;
  }, function(date, offset) {
    date.setDate(date.getDate() + Math.floor(offset) * 7);
  }, function(date) {
    var day = d3.time.year(date).getDay();
    return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
  });

  d3.time[day + "s"] = interval.range;
  d3.time[day + "s"].utc = interval.utc.range;

  d3.time[day + "OfYear"] = function(date) {
    var day = d3.time.year(date).getDay();
    return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7);
  };
});

d3.time.week = d3.time.sunday;
d3.time.weeks = d3.time.sunday.range;
d3.time.weeks.utc = d3.time.sunday.utc.range;
d3.time.weekOfYear = d3.time.sundayOfYear;
d3.time.month = d3_time_interval(function(date) {
  date = d3.time.day(date);
  date.setDate(1);
  return date;
}, function(date, offset) {
  date.setMonth(date.getMonth() + offset);
}, function(date) {
  return date.getMonth();
});

d3.time.months = d3.time.month.range;
d3.time.months.utc = d3.time.month.utc.range;
d3.time.year = d3_time_interval(function(date) {
  date = d3.time.day(date);
  date.setMonth(0, 1);
  return date;
}, function(date, offset) {
  date.setFullYear(date.getFullYear() + offset);
}, function(date) {
  return date.getFullYear();
});

d3.time.years = d3.time.year.range;
d3.time.years.utc = d3.time.year.utc.range;
function d3_time_scale(linear, methods, format) {

  function scale(x) {
    return linear(x);
  }

  scale.invert = function(x) {
    return d3_time_scaleDate(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
    linear.domain(x);
    return scale;
  };

  scale.nice = function(m) {
    return scale.domain(d3_scale_nice(scale.domain(), function() { return m; }));
  };

  scale.ticks = function(m, k) {
    var extent = d3_time_scaleExtent(scale.domain());
    if (typeof m !== "function") {
      var span = extent[1] - extent[0],
          target = span / m,
          i = d3.bisect(d3_time_scaleSteps, target);
      if (i == d3_time_scaleSteps.length) return methods.year(extent, m);
      if (!i) return linear.ticks(m).map(d3_time_scaleDate);
      if (Math.log(target / d3_time_scaleSteps[i - 1]) < Math.log(d3_time_scaleSteps[i] / target)) --i;
      m = methods[i];
      k = m[1];
      m = m[0].range;
    }
    return m(extent[0], new Date(+extent[1] + 1), k); // inclusive upper bound
  };

  scale.tickFormat = function() {
    return format;
  };

  scale.copy = function() {
    return d3_time_scale(linear.copy(), methods, format);
  };

  // TOOD expose d3_scale_linear_rebind?
  return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
}

// TODO expose d3_scaleExtent?
function d3_time_scaleExtent(domain) {
  var start = domain[0], stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}

function d3_time_scaleDate(t) {
  return new Date(t);
}

function d3_time_scaleFormat(formats) {
  return function(date) {
    var i = formats.length - 1, f = formats[i];
    while (!f[1](date)) f = formats[--i];
    return f[0](date);
  };
}

function d3_time_scaleSetYear(y) {
  var d = new Date(y, 0, 1);
  d.setFullYear(y); // Y2K fail
  return d;
}

function d3_time_scaleGetYear(d) {
  var y = d.getFullYear(),
      d0 = d3_time_scaleSetYear(y),
      d1 = d3_time_scaleSetYear(y + 1);
  return y + (d - d0) / (d1 - d0);
}

var d3_time_scaleSteps = [
  1e3,    // 1-second
  5e3,    // 5-second
  15e3,   // 15-second
  3e4,    // 30-second
  6e4,    // 1-minute
  3e5,    // 5-minute
  9e5,    // 15-minute
  18e5,   // 30-minute
  36e5,   // 1-hour
  108e5,  // 3-hour
  216e5,  // 6-hour
  432e5,  // 12-hour
  864e5,  // 1-day
  1728e5, // 2-day
  6048e5, // 1-week
  2592e6, // 1-month
  7776e6, // 3-month
  31536e6 // 1-year
];

var d3_time_scaleLocalMethods = [
  [d3.time.second, 1],
  [d3.time.second, 5],
  [d3.time.second, 15],
  [d3.time.second, 30],
  [d3.time.minute, 1],
  [d3.time.minute, 5],
  [d3.time.minute, 15],
  [d3.time.minute, 30],
  [d3.time.hour, 1],
  [d3.time.hour, 3],
  [d3.time.hour, 6],
  [d3.time.hour, 12],
  [d3.time.day, 1],
  [d3.time.day, 2],
  [d3.time.week, 1],
  [d3.time.month, 1],
  [d3.time.month, 3],
  [d3.time.year, 1]
];

var d3_time_scaleLocalFormats = [
  [d3.time.format("%Y"), function(d) { return true; }],
  [d3.time.format("%B"), function(d) { return d.getMonth(); }],
  [d3.time.format("%b %d"), function(d) { return d.getDate() != 1; }],
  [d3.time.format("%a %d"), function(d) { return d.getDay() && d.getDate() != 1; }],
  [d3.time.format("%I %p"), function(d) { return d.getHours(); }],
  [d3.time.format("%I:%M"), function(d) { return d.getMinutes(); }],
  [d3.time.format(":%S"), function(d) { return d.getSeconds(); }],
  [d3.time.format(".%L"), function(d) { return d.getMilliseconds(); }]
];

var d3_time_scaleLinear = d3.scale.linear(),
    d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);

d3_time_scaleLocalMethods.year = function(extent, m) {
  return d3_time_scaleLinear.domain(extent.map(d3_time_scaleGetYear)).ticks(m).map(d3_time_scaleSetYear);
};

d3.time.scale = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
};
var d3_time_scaleUTCMethods = d3_time_scaleLocalMethods.map(function(m) {
  return [m[0].utc, m[1]];
});

var d3_time_scaleUTCFormats = [
  [d3.time.format.utc("%Y"), function(d) { return true; }],
  [d3.time.format.utc("%B"), function(d) { return d.getUTCMonth(); }],
  [d3.time.format.utc("%b %d"), function(d) { return d.getUTCDate() != 1; }],
  [d3.time.format.utc("%a %d"), function(d) { return d.getUTCDay() && d.getUTCDate() != 1; }],
  [d3.time.format.utc("%I %p"), function(d) { return d.getUTCHours(); }],
  [d3.time.format.utc("%I:%M"), function(d) { return d.getUTCMinutes(); }],
  [d3.time.format.utc(":%S"), function(d) { return d.getUTCSeconds(); }],
  [d3.time.format.utc(".%L"), function(d) { return d.getUTCMilliseconds(); }]
];

var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);

function d3_time_scaleUTCSetYear(y) {
  var d = new Date(Date.UTC(y, 0, 1));
  d.setUTCFullYear(y); // Y2K fail
  return d;
}

function d3_time_scaleUTCGetYear(d) {
  var y = d.getUTCFullYear(),
      d0 = d3_time_scaleUTCSetYear(y),
      d1 = d3_time_scaleUTCSetYear(y + 1);
  return y + (d - d0) / (d1 - d0);
}

d3_time_scaleUTCMethods.year = function(extent, m) {
  return d3_time_scaleLinear.domain(extent.map(d3_time_scaleUTCGetYear)).ticks(m).map(d3_time_scaleUTCSetYear);
};

d3.time.scale.utc = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
};
})();
