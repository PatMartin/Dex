(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dex = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(){function n(n){return n&&(n.ownerDocument||n.document||n).documentElement}function t(n){return n&&(n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView)}function e(n,t){return t>n?-1:n>t?1:n>=t?0:NaN}function r(n){return null===n?NaN:+n}function i(n){return!isNaN(n)}function u(n){return{left:function(t,e,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=t.length);i>r;){var u=r+i>>>1;n(t[u],e)<0?r=u+1:i=u}return r},right:function(t,e,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=t.length);i>r;){var u=r+i>>>1;n(t[u],e)>0?i=u:r=u+1}return r}}}function o(n){return n.length}function a(n){for(var t=1;n*t%1;)t*=10;return t}function l(n,t){for(var e in t)Object.defineProperty(n.prototype,e,{value:t[e],enumerable:!1})}function c(){this._=Object.create(null)}function f(n){return(n+="")===bo||n[0]===_o?_o+n:n}function s(n){return(n+="")[0]===_o?n.slice(1):n}function h(n){return f(n)in this._}function p(n){return(n=f(n))in this._&&delete this._[n]}function g(){var n=[];for(var t in this._)n.push(s(t));return n}function v(){var n=0;for(var t in this._)++n;return n}function d(){for(var n in this._)return!1;return!0}function y(){this._=Object.create(null)}function m(n){return n}function M(n,t,e){return function(){var r=e.apply(t,arguments);return r===t?n:r}}function x(n,t){if(t in n)return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e=0,r=wo.length;r>e;++e){var i=wo[e]+t;if(i in n)return i}}function b(){}function _(){}function w(n){function t(){for(var t,r=e,i=-1,u=r.length;++i<u;)(t=r[i].on)&&t.apply(this,arguments);return n}var e=[],r=new c;return t.on=function(t,i){var u,o=r.get(t);return arguments.length<2?o&&o.on:(o&&(o.on=null,e=e.slice(0,u=e.indexOf(o)).concat(e.slice(u+1)),r.remove(t)),i&&e.push(r.set(t,{on:i})),n)},t}function S(){ao.event.preventDefault()}function k(){for(var n,t=ao.event;n=t.sourceEvent;)t=n;return t}function N(n){for(var t=new _,e=0,r=arguments.length;++e<r;)t[arguments[e]]=w(t);return t.of=function(e,r){return function(i){try{var u=i.sourceEvent=ao.event;i.target=n,ao.event=i,t[i.type].apply(e,r)}finally{ao.event=u}}},t}function E(n){return ko(n,Co),n}function A(n){return"function"==typeof n?n:function(){return No(n,this)}}function C(n){return"function"==typeof n?n:function(){return Eo(n,this)}}function z(n,t){function e(){this.removeAttribute(n)}function r(){this.removeAttributeNS(n.space,n.local)}function i(){this.setAttribute(n,t)}function u(){this.setAttributeNS(n.space,n.local,t)}function o(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}function a(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}return n=ao.ns.qualify(n),null==t?n.local?r:e:"function"==typeof t?n.local?a:o:n.local?u:i}function L(n){return n.trim().replace(/\s+/g," ")}function q(n){return new RegExp("(?:^|\\s+)"+ao.requote(n)+"(?:\\s+|$)","g")}function T(n){return(n+"").trim().split(/^|\s+/)}function R(n,t){function e(){for(var e=-1;++e<i;)n[e](this,t)}function r(){for(var e=-1,r=t.apply(this,arguments);++e<i;)n[e](this,r)}n=T(n).map(D);var i=n.length;return"function"==typeof t?r:e}function D(n){var t=q(n);return function(e,r){if(i=e.classList)return r?i.add(n):i.remove(n);var i=e.getAttribute("class")||"";r?(t.lastIndex=0,t.test(i)||e.setAttribute("class",L(i+" "+n))):e.setAttribute("class",L(i.replace(t," ")))}}function P(n,t,e){function r(){this.style.removeProperty(n)}function i(){this.style.setProperty(n,t,e)}function u(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(n):this.style.setProperty(n,r,e)}return null==t?r:"function"==typeof t?u:i}function U(n,t){function e(){delete this[n]}function r(){this[n]=t}function i(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}return null==t?e:"function"==typeof t?i:r}function j(n){function t(){var t=this.ownerDocument,e=this.namespaceURI;return e===zo&&t.documentElement.namespaceURI===zo?t.createElement(n):t.createElementNS(e,n)}function e(){return this.ownerDocument.createElementNS(n.space,n.local)}return"function"==typeof n?n:(n=ao.ns.qualify(n)).local?e:t}function F(){var n=this.parentNode;n&&n.removeChild(this)}function H(n){return{__data__:n}}function O(n){return function(){return Ao(this,n)}}function I(n){return arguments.length||(n=e),function(t,e){return t&&e?n(t.__data__,e.__data__):!t-!e}}function Y(n,t){for(var e=0,r=n.length;r>e;e++)for(var i,u=n[e],o=0,a=u.length;a>o;o++)(i=u[o])&&t(i,o,e);return n}function Z(n){return ko(n,qo),n}function V(n){var t,e;return function(r,i,u){var o,a=n[u].update,l=a.length;for(u!=e&&(e=u,t=0),i>=t&&(t=i+1);!(o=a[t])&&++t<l;);return o}}function X(n,t,e){function r(){var t=this[o];t&&(this.removeEventListener(n,t,t.$),delete this[o])}function i(){var i=l(t,co(arguments));r.call(this),this.addEventListener(n,this[o]=i,i.$=e),i._=t}function u(){var t,e=new RegExp("^__on([^.]+)"+ao.requote(n)+"$");for(var r in this)if(t=r.match(e)){var i=this[r];this.removeEventListener(t[1],i,i.$),delete this[r]}}var o="__on"+n,a=n.indexOf("."),l=$;a>0&&(n=n.slice(0,a));var c=To.get(n);return c&&(n=c,l=B),a?t?i:r:t?b:u}function $(n,t){return function(e){var r=ao.event;ao.event=e,t[0]=this.__data__;try{n.apply(this,t)}finally{ao.event=r}}}function B(n,t){var e=$(n,t);return function(n){var t=this,r=n.relatedTarget;r&&(r===t||8&r.compareDocumentPosition(t))||e.call(t,n)}}function W(e){var r=".dragsuppress-"+ ++Do,i="click"+r,u=ao.select(t(e)).on("touchmove"+r,S).on("dragstart"+r,S).on("selectstart"+r,S);if(null==Ro&&(Ro="onselectstart"in e?!1:x(e.style,"userSelect")),Ro){var o=n(e).style,a=o[Ro];o[Ro]="none"}return function(n){if(u.on(r,null),Ro&&(o[Ro]=a),n){var t=function(){u.on(i,null)};u.on(i,function(){S(),t()},!0),setTimeout(t,0)}}}function J(n,e){e.changedTouches&&(e=e.changedTouches[0]);var r=n.ownerSVGElement||n;if(r.createSVGPoint){var i=r.createSVGPoint();if(0>Po){var u=t(n);if(u.scrollX||u.scrollY){r=ao.select("body").append("svg").style({position:"absolute",top:0,left:0,margin:0,padding:0,border:"none"},"important");var o=r[0][0].getScreenCTM();Po=!(o.f||o.e),r.remove()}}return Po?(i.x=e.pageX,i.y=e.pageY):(i.x=e.clientX,i.y=e.clientY),i=i.matrixTransform(n.getScreenCTM().inverse()),[i.x,i.y]}var a=n.getBoundingClientRect();return[e.clientX-a.left-n.clientLeft,e.clientY-a.top-n.clientTop]}function G(){return ao.event.changedTouches[0].identifier}function K(n){return n>0?1:0>n?-1:0}function Q(n,t,e){return(t[0]-n[0])*(e[1]-n[1])-(t[1]-n[1])*(e[0]-n[0])}function nn(n){return n>1?0:-1>n?Fo:Math.acos(n)}function tn(n){return n>1?Io:-1>n?-Io:Math.asin(n)}function en(n){return((n=Math.exp(n))-1/n)/2}function rn(n){return((n=Math.exp(n))+1/n)/2}function un(n){return((n=Math.exp(2*n))-1)/(n+1)}function on(n){return(n=Math.sin(n/2))*n}function an(){}function ln(n,t,e){return this instanceof ln?(this.h=+n,this.s=+t,void(this.l=+e)):arguments.length<2?n instanceof ln?new ln(n.h,n.s,n.l):_n(""+n,wn,ln):new ln(n,t,e)}function cn(n,t,e){function r(n){return n>360?n-=360:0>n&&(n+=360),60>n?u+(o-u)*n/60:180>n?o:240>n?u+(o-u)*(240-n)/60:u}function i(n){return Math.round(255*r(n))}var u,o;return n=isNaN(n)?0:(n%=360)<0?n+360:n,t=isNaN(t)?0:0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,o=.5>=e?e*(1+t):e+t-e*t,u=2*e-o,new mn(i(n+120),i(n),i(n-120))}function fn(n,t,e){return this instanceof fn?(this.h=+n,this.c=+t,void(this.l=+e)):arguments.length<2?n instanceof fn?new fn(n.h,n.c,n.l):n instanceof hn?gn(n.l,n.a,n.b):gn((n=Sn((n=ao.rgb(n)).r,n.g,n.b)).l,n.a,n.b):new fn(n,t,e)}function sn(n,t,e){return isNaN(n)&&(n=0),isNaN(t)&&(t=0),new hn(e,Math.cos(n*=Yo)*t,Math.sin(n)*t)}function hn(n,t,e){return this instanceof hn?(this.l=+n,this.a=+t,void(this.b=+e)):arguments.length<2?n instanceof hn?new hn(n.l,n.a,n.b):n instanceof fn?sn(n.h,n.c,n.l):Sn((n=mn(n)).r,n.g,n.b):new hn(n,t,e)}function pn(n,t,e){var r=(n+16)/116,i=r+t/500,u=r-e/200;return i=vn(i)*na,r=vn(r)*ta,u=vn(u)*ea,new mn(yn(3.2404542*i-1.5371385*r-.4985314*u),yn(-.969266*i+1.8760108*r+.041556*u),yn(.0556434*i-.2040259*r+1.0572252*u))}function gn(n,t,e){return n>0?new fn(Math.atan2(e,t)*Zo,Math.sqrt(t*t+e*e),n):new fn(NaN,NaN,n)}function vn(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function dn(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function yn(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function mn(n,t,e){return this instanceof mn?(this.r=~~n,this.g=~~t,void(this.b=~~e)):arguments.length<2?n instanceof mn?new mn(n.r,n.g,n.b):_n(""+n,mn,cn):new mn(n,t,e)}function Mn(n){return new mn(n>>16,n>>8&255,255&n)}function xn(n){return Mn(n)+""}function bn(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function _n(n,t,e){var r,i,u,o=0,a=0,l=0;if(r=/([a-z]+)\((.*)\)/.exec(n=n.toLowerCase()))switch(i=r[2].split(","),r[1]){case"hsl":return e(parseFloat(i[0]),parseFloat(i[1])/100,parseFloat(i[2])/100);case"rgb":return t(Nn(i[0]),Nn(i[1]),Nn(i[2]))}return(u=ua.get(n))?t(u.r,u.g,u.b):(null==n||"#"!==n.charAt(0)||isNaN(u=parseInt(n.slice(1),16))||(4===n.length?(o=(3840&u)>>4,o=o>>4|o,a=240&u,a=a>>4|a,l=15&u,l=l<<4|l):7===n.length&&(o=(16711680&u)>>16,a=(65280&u)>>8,l=255&u)),t(o,a,l))}function wn(n,t,e){var r,i,u=Math.min(n/=255,t/=255,e/=255),o=Math.max(n,t,e),a=o-u,l=(o+u)/2;return a?(i=.5>l?a/(o+u):a/(2-o-u),r=n==o?(t-e)/a+(e>t?6:0):t==o?(e-n)/a+2:(n-t)/a+4,r*=60):(r=NaN,i=l>0&&1>l?0:r),new ln(r,i,l)}function Sn(n,t,e){n=kn(n),t=kn(t),e=kn(e);var r=dn((.4124564*n+.3575761*t+.1804375*e)/na),i=dn((.2126729*n+.7151522*t+.072175*e)/ta),u=dn((.0193339*n+.119192*t+.9503041*e)/ea);return hn(116*i-16,500*(r-i),200*(i-u))}function kn(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function Nn(n){var t=parseFloat(n);return"%"===n.charAt(n.length-1)?Math.round(2.55*t):t}function En(n){return"function"==typeof n?n:function(){return n}}function An(n){return function(t,e,r){return 2===arguments.length&&"function"==typeof e&&(r=e,e=null),Cn(t,e,n,r)}}function Cn(n,t,e,r){function i(){var n,t=l.status;if(!t&&Ln(l)||t>=200&&300>t||304===t){try{n=e.call(u,l)}catch(r){return void o.error.call(u,r)}o.load.call(u,n)}else o.error.call(u,l)}var u={},o=ao.dispatch("beforesend","progress","load","error"),a={},l=new XMLHttpRequest,c=null;return!this.XDomainRequest||"withCredentials"in l||!/^(http(s)?:)?\/\//.test(n)||(l=new XDomainRequest),"onload"in l?l.onload=l.onerror=i:l.onreadystatechange=function(){l.readyState>3&&i()},l.onprogress=function(n){var t=ao.event;ao.event=n;try{o.progress.call(u,l)}finally{ao.event=t}},u.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?a[n]:(null==t?delete a[n]:a[n]=t+"",u)},u.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",u):t},u.responseType=function(n){return arguments.length?(c=n,u):c},u.response=function(n){return e=n,u},["get","post"].forEach(function(n){u[n]=function(){return u.send.apply(u,[n].concat(co(arguments)))}}),u.send=function(e,r,i){if(2===arguments.length&&"function"==typeof r&&(i=r,r=null),l.open(e,n,!0),null==t||"accept"in a||(a.accept=t+",*/*"),l.setRequestHeader)for(var f in a)l.setRequestHeader(f,a[f]);return null!=t&&l.overrideMimeType&&l.overrideMimeType(t),null!=c&&(l.responseType=c),null!=i&&u.on("error",i).on("load",function(n){i(null,n)}),o.beforesend.call(u,l),l.send(null==r?null:r),u},u.abort=function(){return l.abort(),u},ao.rebind(u,o,"on"),null==r?u:u.get(zn(r))}function zn(n){return 1===n.length?function(t,e){n(null==t?e:null)}:n}function Ln(n){var t=n.responseType;return t&&"text"!==t?n.response:n.responseText}function qn(n,t,e){var r=arguments.length;2>r&&(t=0),3>r&&(e=Date.now());var i=e+t,u={c:n,t:i,n:null};return aa?aa.n=u:oa=u,aa=u,la||(ca=clearTimeout(ca),la=1,fa(Tn)),u}function Tn(){var n=Rn(),t=Dn()-n;t>24?(isFinite(t)&&(clearTimeout(ca),ca=setTimeout(Tn,t)),la=0):(la=1,fa(Tn))}function Rn(){for(var n=Date.now(),t=oa;t;)n>=t.t&&t.c(n-t.t)&&(t.c=null),t=t.n;return n}function Dn(){for(var n,t=oa,e=1/0;t;)t.c?(t.t<e&&(e=t.t),t=(n=t).n):t=n?n.n=t.n:oa=t.n;return aa=n,e}function Pn(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function Un(n,t){var e=Math.pow(10,3*xo(8-t));return{scale:t>8?function(n){return n/e}:function(n){return n*e},symbol:n}}function jn(n){var t=n.decimal,e=n.thousands,r=n.grouping,i=n.currency,u=r&&e?function(n,t){for(var i=n.length,u=[],o=0,a=r[0],l=0;i>0&&a>0&&(l+a+1>t&&(a=Math.max(1,t-l)),u.push(n.substring(i-=a,i+a)),!((l+=a+1)>t));)a=r[o=(o+1)%r.length];return u.reverse().join(e)}:m;return function(n){var e=ha.exec(n),r=e[1]||" ",o=e[2]||">",a=e[3]||"-",l=e[4]||"",c=e[5],f=+e[6],s=e[7],h=e[8],p=e[9],g=1,v="",d="",y=!1,m=!0;switch(h&&(h=+h.substring(1)),(c||"0"===r&&"="===o)&&(c=r="0",o="="),p){case"n":s=!0,p="g";break;case"%":g=100,d="%",p="f";break;case"p":g=100,d="%",p="r";break;case"b":case"o":case"x":case"X":"#"===l&&(v="0"+p.toLowerCase());case"c":m=!1;case"d":y=!0,h=0;break;case"s":g=-1,p="r"}"$"===l&&(v=i[0],d=i[1]),"r"!=p||h||(p="g"),null!=h&&("g"==p?h=Math.max(1,Math.min(21,h)):"e"!=p&&"f"!=p||(h=Math.max(0,Math.min(20,h)))),p=pa.get(p)||Fn;var M=c&&s;return function(n){var e=d;if(y&&n%1)return"";var i=0>n||0===n&&0>1/n?(n=-n,"-"):"-"===a?"":a;if(0>g){var l=ao.formatPrefix(n,h);n=l.scale(n),e=l.symbol+d}else n*=g;n=p(n,h);var x,b,_=n.lastIndexOf(".");if(0>_){var w=m?n.lastIndexOf("e"):-1;0>w?(x=n,b=""):(x=n.substring(0,w),b=n.substring(w))}else x=n.substring(0,_),b=t+n.substring(_+1);!c&&s&&(x=u(x,1/0));var S=v.length+x.length+b.length+(M?0:i.length),k=f>S?new Array(S=f-S+1).join(r):"";return M&&(x=u(k+x,k.length?f-b.length:1/0)),i+=v,n=x+b,("<"===o?i+n+k:">"===o?k+i+n:"^"===o?k.substring(0,S>>=1)+i+n+k.substring(S):i+(M?n:k+n))+e}}}function Fn(n){return n+""}function Hn(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function On(n,t,e){function r(t){var e=n(t),r=u(e,1);return r-t>t-e?e:r}function i(e){return t(e=n(new va(e-1)),1),e}function u(n,e){return t(n=new va(+n),e),n}function o(n,r,u){var o=i(n),a=[];if(u>1)for(;r>o;)e(o)%u||a.push(new Date(+o)),t(o,1);else for(;r>o;)a.push(new Date(+o)),t(o,1);return a}function a(n,t,e){try{va=Hn;var r=new Hn;return r._=n,o(r,t,e)}finally{va=Date}}n.floor=n,n.round=r,n.ceil=i,n.offset=u,n.range=o;var l=n.utc=In(n);return l.floor=l,l.round=In(r),l.ceil=In(i),l.offset=In(u),l.range=a,n}function In(n){return function(t,e){try{va=Hn;var r=new Hn;return r._=t,n(r,e)._}finally{va=Date}}}function Yn(n){function t(n){function t(t){for(var e,i,u,o=[],a=-1,l=0;++a<r;)37===n.charCodeAt(a)&&(o.push(n.slice(l,a)),null!=(i=ya[e=n.charAt(++a)])&&(e=n.charAt(++a)),(u=A[e])&&(e=u(t,null==i?"e"===e?" ":"0":i)),o.push(e),l=a+1);return o.push(n.slice(l,a)),o.join("")}var r=n.length;return t.parse=function(t){var r={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},i=e(r,n,t,0);if(i!=t.length)return null;"p"in r&&(r.H=r.H%12+12*r.p);var u=null!=r.Z&&va!==Hn,o=new(u?Hn:va);return"j"in r?o.setFullYear(r.y,0,r.j):"W"in r||"U"in r?("w"in r||(r.w="W"in r?1:0),o.setFullYear(r.y,0,1),o.setFullYear(r.y,0,"W"in r?(r.w+6)%7+7*r.W-(o.getDay()+5)%7:r.w+7*r.U-(o.getDay()+6)%7)):o.setFullYear(r.y,r.m,r.d),o.setHours(r.H+(r.Z/100|0),r.M+r.Z%100,r.S,r.L),u?o._:o},t.toString=function(){return n},t}function e(n,t,e,r){for(var i,u,o,a=0,l=t.length,c=e.length;l>a;){if(r>=c)return-1;if(i=t.charCodeAt(a++),37===i){if(o=t.charAt(a++),u=C[o in ya?t.charAt(a++):o],!u||(r=u(n,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}function r(n,t,e){_.lastIndex=0;var r=_.exec(t.slice(e));return r?(n.w=w.get(r[0].toLowerCase()),e+r[0].length):-1}function i(n,t,e){x.lastIndex=0;var r=x.exec(t.slice(e));return r?(n.w=b.get(r[0].toLowerCase()),e+r[0].length):-1}function u(n,t,e){N.lastIndex=0;var r=N.exec(t.slice(e));return r?(n.m=E.get(r[0].toLowerCase()),e+r[0].length):-1}function o(n,t,e){S.lastIndex=0;var r=S.exec(t.slice(e));return r?(n.m=k.get(r[0].toLowerCase()),e+r[0].length):-1}function a(n,t,r){return e(n,A.c.toString(),t,r)}function l(n,t,r){return e(n,A.x.toString(),t,r)}function c(n,t,r){return e(n,A.X.toString(),t,r)}function f(n,t,e){var r=M.get(t.slice(e,e+=2).toLowerCase());return null==r?-1:(n.p=r,e)}var s=n.dateTime,h=n.date,p=n.time,g=n.periods,v=n.days,d=n.shortDays,y=n.months,m=n.shortMonths;t.utc=function(n){function e(n){try{va=Hn;var t=new va;return t._=n,r(t)}finally{va=Date}}var r=t(n);return e.parse=function(n){try{va=Hn;var t=r.parse(n);return t&&t._}finally{va=Date}},e.toString=r.toString,e},t.multi=t.utc.multi=ct;var M=ao.map(),x=Vn(v),b=Xn(v),_=Vn(d),w=Xn(d),S=Vn(y),k=Xn(y),N=Vn(m),E=Xn(m);g.forEach(function(n,t){M.set(n.toLowerCase(),t)});var A={a:function(n){return d[n.getDay()]},A:function(n){return v[n.getDay()]},b:function(n){return m[n.getMonth()]},B:function(n){return y[n.getMonth()]},c:t(s),d:function(n,t){return Zn(n.getDate(),t,2)},e:function(n,t){return Zn(n.getDate(),t,2)},H:function(n,t){return Zn(n.getHours(),t,2)},I:function(n,t){return Zn(n.getHours()%12||12,t,2)},j:function(n,t){return Zn(1+ga.dayOfYear(n),t,3)},L:function(n,t){return Zn(n.getMilliseconds(),t,3)},m:function(n,t){return Zn(n.getMonth()+1,t,2)},M:function(n,t){return Zn(n.getMinutes(),t,2)},p:function(n){return g[+(n.getHours()>=12)]},S:function(n,t){return Zn(n.getSeconds(),t,2)},U:function(n,t){return Zn(ga.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return Zn(ga.mondayOfYear(n),t,2)},x:t(h),X:t(p),y:function(n,t){return Zn(n.getFullYear()%100,t,2)},Y:function(n,t){return Zn(n.getFullYear()%1e4,t,4)},Z:at,"%":function(){return"%"}},C={a:r,A:i,b:u,B:o,c:a,d:tt,e:tt,H:rt,I:rt,j:et,L:ot,m:nt,M:it,p:f,S:ut,U:Bn,w:$n,W:Wn,x:l,X:c,y:Gn,Y:Jn,Z:Kn,"%":lt};return t}function Zn(n,t,e){var r=0>n?"-":"",i=(r?-n:n)+"",u=i.length;return r+(e>u?new Array(e-u+1).join(t)+i:i)}function Vn(n){return new RegExp("^(?:"+n.map(ao.requote).join("|")+")","i")}function Xn(n){for(var t=new c,e=-1,r=n.length;++e<r;)t.set(n[e].toLowerCase(),e);return t}function $n(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+1));return r?(n.w=+r[0],e+r[0].length):-1}function Bn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e));return r?(n.U=+r[0],e+r[0].length):-1}function Wn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e));return r?(n.W=+r[0],e+r[0].length):-1}function Jn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+4));return r?(n.y=+r[0],e+r[0].length):-1}function Gn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.y=Qn(+r[0]),e+r[0].length):-1}function Kn(n,t,e){return/^[+-]\d{4}$/.test(t=t.slice(e,e+5))?(n.Z=-t,e+5):-1}function Qn(n){return n+(n>68?1900:2e3)}function nt(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.m=r[0]-1,e+r[0].length):-1}function tt(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.d=+r[0],e+r[0].length):-1}function et(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+3));return r?(n.j=+r[0],e+r[0].length):-1}function rt(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.H=+r[0],e+r[0].length):-1}function it(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.M=+r[0],e+r[0].length):-1}function ut(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.S=+r[0],e+r[0].length):-1}function ot(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+3));return r?(n.L=+r[0],e+r[0].length):-1}function at(n){var t=n.getTimezoneOffset(),e=t>0?"-":"+",r=xo(t)/60|0,i=xo(t)%60;return e+Zn(r,"0",2)+Zn(i,"0",2)}function lt(n,t,e){Ma.lastIndex=0;var r=Ma.exec(t.slice(e,e+1));return r?e+r[0].length:-1}function ct(n){for(var t=n.length,e=-1;++e<t;)n[e][0]=this(n[e][0]);return function(t){for(var e=0,r=n[e];!r[1](t);)r=n[++e];return r[0](t)}}function ft(){}function st(n,t,e){var r=e.s=n+t,i=r-n,u=r-i;e.t=n-u+(t-i)}function ht(n,t){n&&wa.hasOwnProperty(n.type)&&wa[n.type](n,t)}function pt(n,t,e){var r,i=-1,u=n.length-e;for(t.lineStart();++i<u;)r=n[i],t.point(r[0],r[1],r[2]);t.lineEnd()}function gt(n,t){var e=-1,r=n.length;for(t.polygonStart();++e<r;)pt(n[e],t,1);t.polygonEnd()}function vt(){function n(n,t){n*=Yo,t=t*Yo/2+Fo/4;var e=n-r,o=e>=0?1:-1,a=o*e,l=Math.cos(t),c=Math.sin(t),f=u*c,s=i*l+f*Math.cos(a),h=f*o*Math.sin(a);ka.add(Math.atan2(h,s)),r=n,i=l,u=c}var t,e,r,i,u;Na.point=function(o,a){Na.point=n,r=(t=o)*Yo,i=Math.cos(a=(e=a)*Yo/2+Fo/4),u=Math.sin(a)},Na.lineEnd=function(){n(t,e)}}function dt(n){var t=n[0],e=n[1],r=Math.cos(e);return[r*Math.cos(t),r*Math.sin(t),Math.sin(e)]}function yt(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function mt(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Mt(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function xt(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function bt(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function _t(n){return[Math.atan2(n[1],n[0]),tn(n[2])]}function wt(n,t){return xo(n[0]-t[0])<Uo&&xo(n[1]-t[1])<Uo}function St(n,t){n*=Yo;var e=Math.cos(t*=Yo);kt(e*Math.cos(n),e*Math.sin(n),Math.sin(t))}function kt(n,t,e){++Ea,Ca+=(n-Ca)/Ea,za+=(t-za)/Ea,La+=(e-La)/Ea}function Nt(){function n(n,i){n*=Yo;var u=Math.cos(i*=Yo),o=u*Math.cos(n),a=u*Math.sin(n),l=Math.sin(i),c=Math.atan2(Math.sqrt((c=e*l-r*a)*c+(c=r*o-t*l)*c+(c=t*a-e*o)*c),t*o+e*a+r*l);Aa+=c,qa+=c*(t+(t=o)),Ta+=c*(e+(e=a)),Ra+=c*(r+(r=l)),kt(t,e,r)}var t,e,r;ja.point=function(i,u){i*=Yo;var o=Math.cos(u*=Yo);t=o*Math.cos(i),e=o*Math.sin(i),r=Math.sin(u),ja.point=n,kt(t,e,r)}}function Et(){ja.point=St}function At(){function n(n,t){n*=Yo;var e=Math.cos(t*=Yo),o=e*Math.cos(n),a=e*Math.sin(n),l=Math.sin(t),c=i*l-u*a,f=u*o-r*l,s=r*a-i*o,h=Math.sqrt(c*c+f*f+s*s),p=r*o+i*a+u*l,g=h&&-nn(p)/h,v=Math.atan2(h,p);Da+=g*c,Pa+=g*f,Ua+=g*s,Aa+=v,qa+=v*(r+(r=o)),Ta+=v*(i+(i=a)),Ra+=v*(u+(u=l)),kt(r,i,u)}var t,e,r,i,u;ja.point=function(o,a){t=o,e=a,ja.point=n,o*=Yo;var l=Math.cos(a*=Yo);r=l*Math.cos(o),i=l*Math.sin(o),u=Math.sin(a),kt(r,i,u)},ja.lineEnd=function(){n(t,e),ja.lineEnd=Et,ja.point=St}}function Ct(n,t){function e(e,r){return e=n(e,r),t(e[0],e[1])}return n.invert&&t.invert&&(e.invert=function(e,r){return e=t.invert(e,r),e&&n.invert(e[0],e[1])}),e}function zt(){return!0}function Lt(n,t,e,r,i){var u=[],o=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,e=n[0],r=n[t];if(wt(e,r)){i.lineStart();for(var a=0;t>a;++a)i.point((e=n[a])[0],e[1]);return void i.lineEnd()}var l=new Tt(e,n,null,!0),c=new Tt(e,null,l,!1);l.o=c,u.push(l),o.push(c),l=new Tt(r,n,null,!1),c=new Tt(r,null,l,!0),l.o=c,u.push(l),o.push(c)}}),o.sort(t),qt(u),qt(o),u.length){for(var a=0,l=e,c=o.length;c>a;++a)o[a].e=l=!l;for(var f,s,h=u[0];;){for(var p=h,g=!0;p.v;)if((p=p.n)===h)return;f=p.z,i.lineStart();do{if(p.v=p.o.v=!0,p.e){if(g)for(var a=0,c=f.length;c>a;++a)i.point((s=f[a])[0],s[1]);else r(p.x,p.n.x,1,i);p=p.n}else{if(g){f=p.p.z;for(var a=f.length-1;a>=0;--a)i.point((s=f[a])[0],s[1])}else r(p.x,p.p.x,-1,i);p=p.p}p=p.o,f=p.z,g=!g}while(!p.v);i.lineEnd()}}}function qt(n){if(t=n.length){for(var t,e,r=0,i=n[0];++r<t;)i.n=e=n[r],e.p=i,i=e;i.n=e=n[0],e.p=i}}function Tt(n,t,e,r){this.x=n,this.z=t,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function Rt(n,t,e,r){return function(i,u){function o(t,e){var r=i(t,e);n(t=r[0],e=r[1])&&u.point(t,e)}function a(n,t){var e=i(n,t);d.point(e[0],e[1])}function l(){m.point=a,d.lineStart()}function c(){m.point=o,d.lineEnd()}function f(n,t){v.push([n,t]);var e=i(n,t);x.point(e[0],e[1])}function s(){x.lineStart(),v=[]}function h(){f(v[0][0],v[0][1]),x.lineEnd();var n,t=x.clean(),e=M.buffer(),r=e.length;if(v.pop(),g.push(v),v=null,r)if(1&t){n=e[0];var i,r=n.length-1,o=-1;if(r>0){for(b||(u.polygonStart(),b=!0),u.lineStart();++o<r;)u.point((i=n[o])[0],i[1]);u.lineEnd()}}else r>1&&2&t&&e.push(e.pop().concat(e.shift())),p.push(e.filter(Dt))}var p,g,v,d=t(u),y=i.invert(r[0],r[1]),m={point:o,lineStart:l,lineEnd:c,polygonStart:function(){m.point=f,m.lineStart=s,m.lineEnd=h,p=[],g=[]},polygonEnd:function(){m.point=o,m.lineStart=l,m.lineEnd=c,p=ao.merge(p);var n=Ot(y,g);p.length?(b||(u.polygonStart(),b=!0),Lt(p,Ut,n,e,u)):n&&(b||(u.polygonStart(),b=!0),u.lineStart(),e(null,null,1,u),u.lineEnd()),b&&(u.polygonEnd(),b=!1),p=g=null},sphere:function(){u.polygonStart(),u.lineStart(),e(null,null,1,u),u.lineEnd(),u.polygonEnd()}},M=Pt(),x=t(M),b=!1;return m}}function Dt(n){return n.length>1}function Pt(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,e){n.push([t,e])},lineEnd:b,buffer:function(){var e=t;return t=[],n=null,e},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function Ut(n,t){return((n=n.x)[0]<0?n[1]-Io-Uo:Io-n[1])-((t=t.x)[0]<0?t[1]-Io-Uo:Io-t[1])}function jt(n){var t,e=NaN,r=NaN,i=NaN;return{lineStart:function(){n.lineStart(),t=1},point:function(u,o){var a=u>0?Fo:-Fo,l=xo(u-e);xo(l-Fo)<Uo?(n.point(e,r=(r+o)/2>0?Io:-Io),n.point(i,r),n.lineEnd(),n.lineStart(),n.point(a,r),n.point(u,r),t=0):i!==a&&l>=Fo&&(xo(e-i)<Uo&&(e-=i*Uo),xo(u-a)<Uo&&(u-=a*Uo),r=Ft(e,r,u,o),n.point(i,r),n.lineEnd(),n.lineStart(),n.point(a,r),t=0),n.point(e=u,r=o),i=a},lineEnd:function(){n.lineEnd(),e=r=NaN},clean:function(){return 2-t}}}function Ft(n,t,e,r){var i,u,o=Math.sin(n-e);return xo(o)>Uo?Math.atan((Math.sin(t)*(u=Math.cos(r))*Math.sin(e)-Math.sin(r)*(i=Math.cos(t))*Math.sin(n))/(i*u*o)):(t+r)/2}function Ht(n,t,e,r){var i;if(null==n)i=e*Io,r.point(-Fo,i),r.point(0,i),r.point(Fo,i),r.point(Fo,0),r.point(Fo,-i),r.point(0,-i),r.point(-Fo,-i),r.point(-Fo,0),r.point(-Fo,i);else if(xo(n[0]-t[0])>Uo){var u=n[0]<t[0]?Fo:-Fo;i=e*u/2,r.point(-u,i),r.point(0,i),r.point(u,i)}else r.point(t[0],t[1])}function Ot(n,t){var e=n[0],r=n[1],i=[Math.sin(e),-Math.cos(e),0],u=0,o=0;ka.reset();for(var a=0,l=t.length;l>a;++a){var c=t[a],f=c.length;if(f)for(var s=c[0],h=s[0],p=s[1]/2+Fo/4,g=Math.sin(p),v=Math.cos(p),d=1;;){d===f&&(d=0),n=c[d];var y=n[0],m=n[1]/2+Fo/4,M=Math.sin(m),x=Math.cos(m),b=y-h,_=b>=0?1:-1,w=_*b,S=w>Fo,k=g*M;if(ka.add(Math.atan2(k*_*Math.sin(w),v*x+k*Math.cos(w))),u+=S?b+_*Ho:b,S^h>=e^y>=e){var N=mt(dt(s),dt(n));bt(N);var E=mt(i,N);bt(E);var A=(S^b>=0?-1:1)*tn(E[2]);(r>A||r===A&&(N[0]||N[1]))&&(o+=S^b>=0?1:-1)}if(!d++)break;h=y,g=M,v=x,s=n}}return(-Uo>u||Uo>u&&-Uo>ka)^1&o}function It(n){function t(n,t){return Math.cos(n)*Math.cos(t)>u}function e(n){var e,u,l,c,f;return{lineStart:function(){c=l=!1,f=1},point:function(s,h){var p,g=[s,h],v=t(s,h),d=o?v?0:i(s,h):v?i(s+(0>s?Fo:-Fo),h):0;if(!e&&(c=l=v)&&n.lineStart(),v!==l&&(p=r(e,g),(wt(e,p)||wt(g,p))&&(g[0]+=Uo,g[1]+=Uo,v=t(g[0],g[1]))),v!==l)f=0,v?(n.lineStart(),p=r(g,e),n.point(p[0],p[1])):(p=r(e,g),n.point(p[0],p[1]),n.lineEnd()),e=p;else if(a&&e&&o^v){var y;d&u||!(y=r(g,e,!0))||(f=0,o?(n.lineStart(),n.point(y[0][0],y[0][1]),n.point(y[1][0],y[1][1]),n.lineEnd()):(n.point(y[1][0],y[1][1]),n.lineEnd(),n.lineStart(),n.point(y[0][0],y[0][1])))}!v||e&&wt(e,g)||n.point(g[0],g[1]),e=g,l=v,u=d},lineEnd:function(){l&&n.lineEnd(),e=null},clean:function(){return f|(c&&l)<<1}}}function r(n,t,e){var r=dt(n),i=dt(t),o=[1,0,0],a=mt(r,i),l=yt(a,a),c=a[0],f=l-c*c;if(!f)return!e&&n;var s=u*l/f,h=-u*c/f,p=mt(o,a),g=xt(o,s),v=xt(a,h);Mt(g,v);var d=p,y=yt(g,d),m=yt(d,d),M=y*y-m*(yt(g,g)-1);if(!(0>M)){var x=Math.sqrt(M),b=xt(d,(-y-x)/m);if(Mt(b,g),b=_t(b),!e)return b;var _,w=n[0],S=t[0],k=n[1],N=t[1];w>S&&(_=w,w=S,S=_);var E=S-w,A=xo(E-Fo)<Uo,C=A||Uo>E;if(!A&&k>N&&(_=k,k=N,N=_),C?A?k+N>0^b[1]<(xo(b[0]-w)<Uo?k:N):k<=b[1]&&b[1]<=N:E>Fo^(w<=b[0]&&b[0]<=S)){var z=xt(d,(-y+x)/m);return Mt(z,g),[b,_t(z)]}}}function i(t,e){var r=o?n:Fo-n,i=0;return-r>t?i|=1:t>r&&(i|=2),-r>e?i|=4:e>r&&(i|=8),i}var u=Math.cos(n),o=u>0,a=xo(u)>Uo,l=ve(n,6*Yo);return Rt(t,e,l,o?[0,-n]:[-Fo,n-Fo])}function Yt(n,t,e,r){return function(i){var u,o=i.a,a=i.b,l=o.x,c=o.y,f=a.x,s=a.y,h=0,p=1,g=f-l,v=s-c;if(u=n-l,g||!(u>0)){if(u/=g,0>g){if(h>u)return;p>u&&(p=u)}else if(g>0){if(u>p)return;u>h&&(h=u)}if(u=e-l,g||!(0>u)){if(u/=g,0>g){if(u>p)return;u>h&&(h=u)}else if(g>0){if(h>u)return;p>u&&(p=u)}if(u=t-c,v||!(u>0)){if(u/=v,0>v){if(h>u)return;p>u&&(p=u)}else if(v>0){if(u>p)return;u>h&&(h=u)}if(u=r-c,v||!(0>u)){if(u/=v,0>v){if(u>p)return;u>h&&(h=u)}else if(v>0){if(h>u)return;p>u&&(p=u)}return h>0&&(i.a={x:l+h*g,y:c+h*v}),1>p&&(i.b={x:l+p*g,y:c+p*v}),i}}}}}}function Zt(n,t,e,r){function i(r,i){return xo(r[0]-n)<Uo?i>0?0:3:xo(r[0]-e)<Uo?i>0?2:1:xo(r[1]-t)<Uo?i>0?1:0:i>0?3:2}function u(n,t){return o(n.x,t.x)}function o(n,t){var e=i(n,1),r=i(t,1);return e!==r?e-r:0===e?t[1]-n[1]:1===e?n[0]-t[0]:2===e?n[1]-t[1]:t[0]-n[0]}return function(a){function l(n){for(var t=0,e=d.length,r=n[1],i=0;e>i;++i)for(var u,o=1,a=d[i],l=a.length,c=a[0];l>o;++o)u=a[o],c[1]<=r?u[1]>r&&Q(c,u,n)>0&&++t:u[1]<=r&&Q(c,u,n)<0&&--t,c=u;return 0!==t}function c(u,a,l,c){var f=0,s=0;if(null==u||(f=i(u,l))!==(s=i(a,l))||o(u,a)<0^l>0){do c.point(0===f||3===f?n:e,f>1?r:t);while((f=(f+l+4)%4)!==s)}else c.point(a[0],a[1])}function f(i,u){return i>=n&&e>=i&&u>=t&&r>=u}function s(n,t){f(n,t)&&a.point(n,t)}function h(){C.point=g,d&&d.push(y=[]),S=!0,w=!1,b=_=NaN}function p(){v&&(g(m,M),x&&w&&E.rejoin(),v.push(E.buffer())),C.point=s,w&&a.lineEnd()}function g(n,t){n=Math.max(-Ha,Math.min(Ha,n)),t=Math.max(-Ha,Math.min(Ha,t));var e=f(n,t);if(d&&y.push([n,t]),S)m=n,M=t,x=e,S=!1,e&&(a.lineStart(),a.point(n,t));else if(e&&w)a.point(n,t);else{var r={a:{x:b,y:_},b:{x:n,y:t}};A(r)?(w||(a.lineStart(),a.point(r.a.x,r.a.y)),a.point(r.b.x,r.b.y),e||a.lineEnd(),k=!1):e&&(a.lineStart(),a.point(n,t),k=!1)}b=n,_=t,w=e}var v,d,y,m,M,x,b,_,w,S,k,N=a,E=Pt(),A=Yt(n,t,e,r),C={point:s,lineStart:h,lineEnd:p,polygonStart:function(){a=E,v=[],d=[],k=!0},polygonEnd:function(){a=N,v=ao.merge(v);var t=l([n,r]),e=k&&t,i=v.length;(e||i)&&(a.polygonStart(),e&&(a.lineStart(),c(null,null,1,a),a.lineEnd()),i&&Lt(v,u,t,c,a),a.polygonEnd()),v=d=y=null}};return C}}function Vt(n){var t=0,e=Fo/3,r=ae(n),i=r(t,e);return i.parallels=function(n){return arguments.length?r(t=n[0]*Fo/180,e=n[1]*Fo/180):[t/Fo*180,e/Fo*180]},i}function Xt(n,t){function e(n,t){var e=Math.sqrt(u-2*i*Math.sin(t))/i;return[e*Math.sin(n*=i),o-e*Math.cos(n)]}var r=Math.sin(n),i=(r+Math.sin(t))/2,u=1+r*(2*i-r),o=Math.sqrt(u)/i;return e.invert=function(n,t){var e=o-t;return[Math.atan2(n,e)/i,tn((u-(n*n+e*e)*i*i)/(2*i))]},e}function $t(){function n(n,t){Ia+=i*n-r*t,r=n,i=t}var t,e,r,i;$a.point=function(u,o){$a.point=n,t=r=u,e=i=o},$a.lineEnd=function(){n(t,e)}}function Bt(n,t){Ya>n&&(Ya=n),n>Va&&(Va=n),Za>t&&(Za=t),t>Xa&&(Xa=t)}function Wt(){function n(n,t){o.push("M",n,",",t,u)}function t(n,t){o.push("M",n,",",t),a.point=e}function e(n,t){o.push("L",n,",",t)}function r(){a.point=n}function i(){o.push("Z")}var u=Jt(4.5),o=[],a={point:n,lineStart:function(){a.point=t},lineEnd:r,polygonStart:function(){a.lineEnd=i},polygonEnd:function(){a.lineEnd=r,a.point=n},pointRadius:function(n){return u=Jt(n),a},result:function(){if(o.length){var n=o.join("");return o=[],n}}};return a}function Jt(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function Gt(n,t){Ca+=n,za+=t,++La}function Kt(){function n(n,r){var i=n-t,u=r-e,o=Math.sqrt(i*i+u*u);qa+=o*(t+n)/2,Ta+=o*(e+r)/2,Ra+=o,Gt(t=n,e=r)}var t,e;Wa.point=function(r,i){Wa.point=n,Gt(t=r,e=i)}}function Qt(){Wa.point=Gt}function ne(){function n(n,t){var e=n-r,u=t-i,o=Math.sqrt(e*e+u*u);qa+=o*(r+n)/2,Ta+=o*(i+t)/2,Ra+=o,o=i*n-r*t,Da+=o*(r+n),Pa+=o*(i+t),Ua+=3*o,Gt(r=n,i=t)}var t,e,r,i;Wa.point=function(u,o){Wa.point=n,Gt(t=r=u,e=i=o)},Wa.lineEnd=function(){n(t,e)}}function te(n){function t(t,e){n.moveTo(t+o,e),n.arc(t,e,o,0,Ho)}function e(t,e){n.moveTo(t,e),a.point=r}function r(t,e){n.lineTo(t,e)}function i(){a.point=t}function u(){n.closePath()}var o=4.5,a={point:t,lineStart:function(){a.point=e},lineEnd:i,polygonStart:function(){a.lineEnd=u},polygonEnd:function(){a.lineEnd=i,a.point=t},pointRadius:function(n){return o=n,a},result:b};return a}function ee(n){function t(n){return(a?r:e)(n)}function e(t){return ue(t,function(e,r){e=n(e,r),t.point(e[0],e[1])})}function r(t){function e(e,r){e=n(e,r),t.point(e[0],e[1])}function r(){M=NaN,S.point=u,t.lineStart()}function u(e,r){var u=dt([e,r]),o=n(e,r);i(M,x,m,b,_,w,M=o[0],x=o[1],m=e,b=u[0],_=u[1],w=u[2],a,t),t.point(M,x)}function o(){S.point=e,t.lineEnd()}function l(){
  r(),S.point=c,S.lineEnd=f}function c(n,t){u(s=n,h=t),p=M,g=x,v=b,d=_,y=w,S.point=u}function f(){i(M,x,m,b,_,w,p,g,s,v,d,y,a,t),S.lineEnd=o,o()}var s,h,p,g,v,d,y,m,M,x,b,_,w,S={point:e,lineStart:r,lineEnd:o,polygonStart:function(){t.polygonStart(),S.lineStart=l},polygonEnd:function(){t.polygonEnd(),S.lineStart=r}};return S}function i(t,e,r,a,l,c,f,s,h,p,g,v,d,y){var m=f-t,M=s-e,x=m*m+M*M;if(x>4*u&&d--){var b=a+p,_=l+g,w=c+v,S=Math.sqrt(b*b+_*_+w*w),k=Math.asin(w/=S),N=xo(xo(w)-1)<Uo||xo(r-h)<Uo?(r+h)/2:Math.atan2(_,b),E=n(N,k),A=E[0],C=E[1],z=A-t,L=C-e,q=M*z-m*L;(q*q/x>u||xo((m*z+M*L)/x-.5)>.3||o>a*p+l*g+c*v)&&(i(t,e,r,a,l,c,A,C,N,b/=S,_/=S,w,d,y),y.point(A,C),i(A,C,N,b,_,w,f,s,h,p,g,v,d,y))}}var u=.5,o=Math.cos(30*Yo),a=16;return t.precision=function(n){return arguments.length?(a=(u=n*n)>0&&16,t):Math.sqrt(u)},t}function re(n){var t=ee(function(t,e){return n([t*Zo,e*Zo])});return function(n){return le(t(n))}}function ie(n){this.stream=n}function ue(n,t){return{point:t,sphere:function(){n.sphere()},lineStart:function(){n.lineStart()},lineEnd:function(){n.lineEnd()},polygonStart:function(){n.polygonStart()},polygonEnd:function(){n.polygonEnd()}}}function oe(n){return ae(function(){return n})()}function ae(n){function t(n){return n=a(n[0]*Yo,n[1]*Yo),[n[0]*h+l,c-n[1]*h]}function e(n){return n=a.invert((n[0]-l)/h,(c-n[1])/h),n&&[n[0]*Zo,n[1]*Zo]}function r(){a=Ct(o=se(y,M,x),u);var n=u(v,d);return l=p-n[0]*h,c=g+n[1]*h,i()}function i(){return f&&(f.valid=!1,f=null),t}var u,o,a,l,c,f,s=ee(function(n,t){return n=u(n,t),[n[0]*h+l,c-n[1]*h]}),h=150,p=480,g=250,v=0,d=0,y=0,M=0,x=0,b=Fa,_=m,w=null,S=null;return t.stream=function(n){return f&&(f.valid=!1),f=le(b(o,s(_(n)))),f.valid=!0,f},t.clipAngle=function(n){return arguments.length?(b=null==n?(w=n,Fa):It((w=+n)*Yo),i()):w},t.clipExtent=function(n){return arguments.length?(S=n,_=n?Zt(n[0][0],n[0][1],n[1][0],n[1][1]):m,i()):S},t.scale=function(n){return arguments.length?(h=+n,r()):h},t.translate=function(n){return arguments.length?(p=+n[0],g=+n[1],r()):[p,g]},t.center=function(n){return arguments.length?(v=n[0]%360*Yo,d=n[1]%360*Yo,r()):[v*Zo,d*Zo]},t.rotate=function(n){return arguments.length?(y=n[0]%360*Yo,M=n[1]%360*Yo,x=n.length>2?n[2]%360*Yo:0,r()):[y*Zo,M*Zo,x*Zo]},ao.rebind(t,s,"precision"),function(){return u=n.apply(this,arguments),t.invert=u.invert&&e,r()}}function le(n){return ue(n,function(t,e){n.point(t*Yo,e*Yo)})}function ce(n,t){return[n,t]}function fe(n,t){return[n>Fo?n-Ho:-Fo>n?n+Ho:n,t]}function se(n,t,e){return n?t||e?Ct(pe(n),ge(t,e)):pe(n):t||e?ge(t,e):fe}function he(n){return function(t,e){return t+=n,[t>Fo?t-Ho:-Fo>t?t+Ho:t,e]}}function pe(n){var t=he(n);return t.invert=he(-n),t}function ge(n,t){function e(n,t){var e=Math.cos(t),a=Math.cos(n)*e,l=Math.sin(n)*e,c=Math.sin(t),f=c*r+a*i;return[Math.atan2(l*u-f*o,a*r-c*i),tn(f*u+l*o)]}var r=Math.cos(n),i=Math.sin(n),u=Math.cos(t),o=Math.sin(t);return e.invert=function(n,t){var e=Math.cos(t),a=Math.cos(n)*e,l=Math.sin(n)*e,c=Math.sin(t),f=c*u-l*o;return[Math.atan2(l*u+c*o,a*r+f*i),tn(f*r-a*i)]},e}function ve(n,t){var e=Math.cos(n),r=Math.sin(n);return function(i,u,o,a){var l=o*t;null!=i?(i=de(e,i),u=de(e,u),(o>0?u>i:i>u)&&(i+=o*Ho)):(i=n+o*Ho,u=n-.5*l);for(var c,f=i;o>0?f>u:u>f;f-=l)a.point((c=_t([e,-r*Math.cos(f),-r*Math.sin(f)]))[0],c[1])}}function de(n,t){var e=dt(t);e[0]-=n,bt(e);var r=nn(-e[1]);return((-e[2]<0?-r:r)+2*Math.PI-Uo)%(2*Math.PI)}function ye(n,t,e){var r=ao.range(n,t-Uo,e).concat(t);return function(n){return r.map(function(t){return[n,t]})}}function me(n,t,e){var r=ao.range(n,t-Uo,e).concat(t);return function(n){return r.map(function(t){return[t,n]})}}function Me(n){return n.source}function xe(n){return n.target}function be(n,t,e,r){var i=Math.cos(t),u=Math.sin(t),o=Math.cos(r),a=Math.sin(r),l=i*Math.cos(n),c=i*Math.sin(n),f=o*Math.cos(e),s=o*Math.sin(e),h=2*Math.asin(Math.sqrt(on(r-t)+i*o*on(e-n))),p=1/Math.sin(h),g=h?function(n){var t=Math.sin(n*=h)*p,e=Math.sin(h-n)*p,r=e*l+t*f,i=e*c+t*s,o=e*u+t*a;return[Math.atan2(i,r)*Zo,Math.atan2(o,Math.sqrt(r*r+i*i))*Zo]}:function(){return[n*Zo,t*Zo]};return g.distance=h,g}function _e(){function n(n,i){var u=Math.sin(i*=Yo),o=Math.cos(i),a=xo((n*=Yo)-t),l=Math.cos(a);Ja+=Math.atan2(Math.sqrt((a=o*Math.sin(a))*a+(a=r*u-e*o*l)*a),e*u+r*o*l),t=n,e=u,r=o}var t,e,r;Ga.point=function(i,u){t=i*Yo,e=Math.sin(u*=Yo),r=Math.cos(u),Ga.point=n},Ga.lineEnd=function(){Ga.point=Ga.lineEnd=b}}function we(n,t){function e(t,e){var r=Math.cos(t),i=Math.cos(e),u=n(r*i);return[u*i*Math.sin(t),u*Math.sin(e)]}return e.invert=function(n,e){var r=Math.sqrt(n*n+e*e),i=t(r),u=Math.sin(i),o=Math.cos(i);return[Math.atan2(n*u,r*o),Math.asin(r&&e*u/r)]},e}function Se(n,t){function e(n,t){o>0?-Io+Uo>t&&(t=-Io+Uo):t>Io-Uo&&(t=Io-Uo);var e=o/Math.pow(i(t),u);return[e*Math.sin(u*n),o-e*Math.cos(u*n)]}var r=Math.cos(n),i=function(n){return Math.tan(Fo/4+n/2)},u=n===t?Math.sin(n):Math.log(r/Math.cos(t))/Math.log(i(t)/i(n)),o=r*Math.pow(i(n),u)/u;return u?(e.invert=function(n,t){var e=o-t,r=K(u)*Math.sqrt(n*n+e*e);return[Math.atan2(n,e)/u,2*Math.atan(Math.pow(o/r,1/u))-Io]},e):Ne}function ke(n,t){function e(n,t){var e=u-t;return[e*Math.sin(i*n),u-e*Math.cos(i*n)]}var r=Math.cos(n),i=n===t?Math.sin(n):(r-Math.cos(t))/(t-n),u=r/i+n;return xo(i)<Uo?ce:(e.invert=function(n,t){var e=u-t;return[Math.atan2(n,e)/i,u-K(i)*Math.sqrt(n*n+e*e)]},e)}function Ne(n,t){return[n,Math.log(Math.tan(Fo/4+t/2))]}function Ee(n){var t,e=oe(n),r=e.scale,i=e.translate,u=e.clipExtent;return e.scale=function(){var n=r.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.translate=function(){var n=i.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.clipExtent=function(n){var o=u.apply(e,arguments);if(o===e){if(t=null==n){var a=Fo*r(),l=i();u([[l[0]-a,l[1]-a],[l[0]+a,l[1]+a]])}}else t&&(o=null);return o},e.clipExtent(null)}function Ae(n,t){return[Math.log(Math.tan(Fo/4+t/2)),-n]}function Ce(n){return n[0]}function ze(n){return n[1]}function Le(n){for(var t=n.length,e=[0,1],r=2,i=2;t>i;i++){for(;r>1&&Q(n[e[r-2]],n[e[r-1]],n[i])<=0;)--r;e[r++]=i}return e.slice(0,r)}function qe(n,t){return n[0]-t[0]||n[1]-t[1]}function Te(n,t,e){return(e[0]-t[0])*(n[1]-t[1])<(e[1]-t[1])*(n[0]-t[0])}function Re(n,t,e,r){var i=n[0],u=e[0],o=t[0]-i,a=r[0]-u,l=n[1],c=e[1],f=t[1]-l,s=r[1]-c,h=(a*(l-c)-s*(i-u))/(s*o-a*f);return[i+h*o,l+h*f]}function De(n){var t=n[0],e=n[n.length-1];return!(t[0]-e[0]||t[1]-e[1])}function Pe(){rr(this),this.edge=this.site=this.circle=null}function Ue(n){var t=cl.pop()||new Pe;return t.site=n,t}function je(n){Be(n),ol.remove(n),cl.push(n),rr(n)}function Fe(n){var t=n.circle,e=t.x,r=t.cy,i={x:e,y:r},u=n.P,o=n.N,a=[n];je(n);for(var l=u;l.circle&&xo(e-l.circle.x)<Uo&&xo(r-l.circle.cy)<Uo;)u=l.P,a.unshift(l),je(l),l=u;a.unshift(l),Be(l);for(var c=o;c.circle&&xo(e-c.circle.x)<Uo&&xo(r-c.circle.cy)<Uo;)o=c.N,a.push(c),je(c),c=o;a.push(c),Be(c);var f,s=a.length;for(f=1;s>f;++f)c=a[f],l=a[f-1],nr(c.edge,l.site,c.site,i);l=a[0],c=a[s-1],c.edge=Ke(l.site,c.site,null,i),$e(l),$e(c)}function He(n){for(var t,e,r,i,u=n.x,o=n.y,a=ol._;a;)if(r=Oe(a,o)-u,r>Uo)a=a.L;else{if(i=u-Ie(a,o),!(i>Uo)){r>-Uo?(t=a.P,e=a):i>-Uo?(t=a,e=a.N):t=e=a;break}if(!a.R){t=a;break}a=a.R}var l=Ue(n);if(ol.insert(t,l),t||e){if(t===e)return Be(t),e=Ue(t.site),ol.insert(l,e),l.edge=e.edge=Ke(t.site,l.site),$e(t),void $e(e);if(!e)return void(l.edge=Ke(t.site,l.site));Be(t),Be(e);var c=t.site,f=c.x,s=c.y,h=n.x-f,p=n.y-s,g=e.site,v=g.x-f,d=g.y-s,y=2*(h*d-p*v),m=h*h+p*p,M=v*v+d*d,x={x:(d*m-p*M)/y+f,y:(h*M-v*m)/y+s};nr(e.edge,c,g,x),l.edge=Ke(c,n,null,x),e.edge=Ke(n,g,null,x),$e(t),$e(e)}}function Oe(n,t){var e=n.site,r=e.x,i=e.y,u=i-t;if(!u)return r;var o=n.P;if(!o)return-(1/0);e=o.site;var a=e.x,l=e.y,c=l-t;if(!c)return a;var f=a-r,s=1/u-1/c,h=f/c;return s?(-h+Math.sqrt(h*h-2*s*(f*f/(-2*c)-l+c/2+i-u/2)))/s+r:(r+a)/2}function Ie(n,t){var e=n.N;if(e)return Oe(e,t);var r=n.site;return r.y===t?r.x:1/0}function Ye(n){this.site=n,this.edges=[]}function Ze(n){for(var t,e,r,i,u,o,a,l,c,f,s=n[0][0],h=n[1][0],p=n[0][1],g=n[1][1],v=ul,d=v.length;d--;)if(u=v[d],u&&u.prepare())for(a=u.edges,l=a.length,o=0;l>o;)f=a[o].end(),r=f.x,i=f.y,c=a[++o%l].start(),t=c.x,e=c.y,(xo(r-t)>Uo||xo(i-e)>Uo)&&(a.splice(o,0,new tr(Qe(u.site,f,xo(r-s)<Uo&&g-i>Uo?{x:s,y:xo(t-s)<Uo?e:g}:xo(i-g)<Uo&&h-r>Uo?{x:xo(e-g)<Uo?t:h,y:g}:xo(r-h)<Uo&&i-p>Uo?{x:h,y:xo(t-h)<Uo?e:p}:xo(i-p)<Uo&&r-s>Uo?{x:xo(e-p)<Uo?t:s,y:p}:null),u.site,null)),++l)}function Ve(n,t){return t.angle-n.angle}function Xe(){rr(this),this.x=this.y=this.arc=this.site=this.cy=null}function $e(n){var t=n.P,e=n.N;if(t&&e){var r=t.site,i=n.site,u=e.site;if(r!==u){var o=i.x,a=i.y,l=r.x-o,c=r.y-a,f=u.x-o,s=u.y-a,h=2*(l*s-c*f);if(!(h>=-jo)){var p=l*l+c*c,g=f*f+s*s,v=(s*p-c*g)/h,d=(l*g-f*p)/h,s=d+a,y=fl.pop()||new Xe;y.arc=n,y.site=i,y.x=v+o,y.y=s+Math.sqrt(v*v+d*d),y.cy=s,n.circle=y;for(var m=null,M=ll._;M;)if(y.y<M.y||y.y===M.y&&y.x<=M.x){if(!M.L){m=M.P;break}M=M.L}else{if(!M.R){m=M;break}M=M.R}ll.insert(m,y),m||(al=y)}}}}function Be(n){var t=n.circle;t&&(t.P||(al=t.N),ll.remove(t),fl.push(t),rr(t),n.circle=null)}function We(n){for(var t,e=il,r=Yt(n[0][0],n[0][1],n[1][0],n[1][1]),i=e.length;i--;)t=e[i],(!Je(t,n)||!r(t)||xo(t.a.x-t.b.x)<Uo&&xo(t.a.y-t.b.y)<Uo)&&(t.a=t.b=null,e.splice(i,1))}function Je(n,t){var e=n.b;if(e)return!0;var r,i,u=n.a,o=t[0][0],a=t[1][0],l=t[0][1],c=t[1][1],f=n.l,s=n.r,h=f.x,p=f.y,g=s.x,v=s.y,d=(h+g)/2,y=(p+v)/2;if(v===p){if(o>d||d>=a)return;if(h>g){if(u){if(u.y>=c)return}else u={x:d,y:l};e={x:d,y:c}}else{if(u){if(u.y<l)return}else u={x:d,y:c};e={x:d,y:l}}}else if(r=(h-g)/(v-p),i=y-r*d,-1>r||r>1)if(h>g){if(u){if(u.y>=c)return}else u={x:(l-i)/r,y:l};e={x:(c-i)/r,y:c}}else{if(u){if(u.y<l)return}else u={x:(c-i)/r,y:c};e={x:(l-i)/r,y:l}}else if(v>p){if(u){if(u.x>=a)return}else u={x:o,y:r*o+i};e={x:a,y:r*a+i}}else{if(u){if(u.x<o)return}else u={x:a,y:r*a+i};e={x:o,y:r*o+i}}return n.a=u,n.b=e,!0}function Ge(n,t){this.l=n,this.r=t,this.a=this.b=null}function Ke(n,t,e,r){var i=new Ge(n,t);return il.push(i),e&&nr(i,n,t,e),r&&nr(i,t,n,r),ul[n.i].edges.push(new tr(i,n,t)),ul[t.i].edges.push(new tr(i,t,n)),i}function Qe(n,t,e){var r=new Ge(n,null);return r.a=t,r.b=e,il.push(r),r}function nr(n,t,e,r){n.a||n.b?n.l===e?n.b=r:n.a=r:(n.a=r,n.l=t,n.r=e)}function tr(n,t,e){var r=n.a,i=n.b;this.edge=n,this.site=t,this.angle=e?Math.atan2(e.y-t.y,e.x-t.x):n.l===t?Math.atan2(i.x-r.x,r.y-i.y):Math.atan2(r.x-i.x,i.y-r.y)}function er(){this._=null}function rr(n){n.U=n.C=n.L=n.R=n.P=n.N=null}function ir(n,t){var e=t,r=t.R,i=e.U;i?i.L===e?i.L=r:i.R=r:n._=r,r.U=i,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function ur(n,t){var e=t,r=t.L,i=e.U;i?i.L===e?i.L=r:i.R=r:n._=r,r.U=i,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function or(n){for(;n.L;)n=n.L;return n}function ar(n,t){var e,r,i,u=n.sort(lr).pop();for(il=[],ul=new Array(n.length),ol=new er,ll=new er;;)if(i=al,u&&(!i||u.y<i.y||u.y===i.y&&u.x<i.x))u.x===e&&u.y===r||(ul[u.i]=new Ye(u),He(u),e=u.x,r=u.y),u=n.pop();else{if(!i)break;Fe(i.arc)}t&&(We(t),Ze(t));var o={cells:ul,edges:il};return ol=ll=il=ul=null,o}function lr(n,t){return t.y-n.y||t.x-n.x}function cr(n,t,e){return(n.x-e.x)*(t.y-n.y)-(n.x-t.x)*(e.y-n.y)}function fr(n){return n.x}function sr(n){return n.y}function hr(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function pr(n,t,e,r,i,u){if(!n(t,e,r,i,u)){var o=.5*(e+i),a=.5*(r+u),l=t.nodes;l[0]&&pr(n,l[0],e,r,o,a),l[1]&&pr(n,l[1],o,r,i,a),l[2]&&pr(n,l[2],e,a,o,u),l[3]&&pr(n,l[3],o,a,i,u)}}function gr(n,t,e,r,i,u,o){var a,l=1/0;return function c(n,f,s,h,p){if(!(f>u||s>o||r>h||i>p)){if(g=n.point){var g,v=t-n.x,d=e-n.y,y=v*v+d*d;if(l>y){var m=Math.sqrt(l=y);r=t-m,i=e-m,u=t+m,o=e+m,a=g}}for(var M=n.nodes,x=.5*(f+h),b=.5*(s+p),_=t>=x,w=e>=b,S=w<<1|_,k=S+4;k>S;++S)if(n=M[3&S])switch(3&S){case 0:c(n,f,s,x,b);break;case 1:c(n,x,s,h,b);break;case 2:c(n,f,b,x,p);break;case 3:c(n,x,b,h,p)}}}(n,r,i,u,o),a}function vr(n,t){n=ao.rgb(n),t=ao.rgb(t);var e=n.r,r=n.g,i=n.b,u=t.r-e,o=t.g-r,a=t.b-i;return function(n){return"#"+bn(Math.round(e+u*n))+bn(Math.round(r+o*n))+bn(Math.round(i+a*n))}}function dr(n,t){var e,r={},i={};for(e in n)e in t?r[e]=Mr(n[e],t[e]):i[e]=n[e];for(e in t)e in n||(i[e]=t[e]);return function(n){for(e in r)i[e]=r[e](n);return i}}function yr(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function mr(n,t){var e,r,i,u=hl.lastIndex=pl.lastIndex=0,o=-1,a=[],l=[];for(n+="",t+="";(e=hl.exec(n))&&(r=pl.exec(t));)(i=r.index)>u&&(i=t.slice(u,i),a[o]?a[o]+=i:a[++o]=i),(e=e[0])===(r=r[0])?a[o]?a[o]+=r:a[++o]=r:(a[++o]=null,l.push({i:o,x:yr(e,r)})),u=pl.lastIndex;return u<t.length&&(i=t.slice(u),a[o]?a[o]+=i:a[++o]=i),a.length<2?l[0]?(t=l[0].x,function(n){return t(n)+""}):function(){return t}:(t=l.length,function(n){for(var e,r=0;t>r;++r)a[(e=l[r]).i]=e.x(n);return a.join("")})}function Mr(n,t){for(var e,r=ao.interpolators.length;--r>=0&&!(e=ao.interpolators[r](n,t)););return e}function xr(n,t){var e,r=[],i=[],u=n.length,o=t.length,a=Math.min(n.length,t.length);for(e=0;a>e;++e)r.push(Mr(n[e],t[e]));for(;u>e;++e)i[e]=n[e];for(;o>e;++e)i[e]=t[e];return function(n){for(e=0;a>e;++e)i[e]=r[e](n);return i}}function br(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function _r(n){return function(t){return 1-n(1-t)}}function wr(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function Sr(n){return n*n}function kr(n){return n*n*n}function Nr(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,e=t*n;return 4*(.5>n?e:3*(n-t)+e-.75)}function Er(n){return function(t){return Math.pow(t,n)}}function Ar(n){return 1-Math.cos(n*Io)}function Cr(n){return Math.pow(2,10*(n-1))}function zr(n){return 1-Math.sqrt(1-n*n)}function Lr(n,t){var e;return arguments.length<2&&(t=.45),arguments.length?e=t/Ho*Math.asin(1/n):(n=1,e=t/4),function(r){return 1+n*Math.pow(2,-10*r)*Math.sin((r-e)*Ho/t)}}function qr(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function Tr(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function Rr(n,t){n=ao.hcl(n),t=ao.hcl(t);var e=n.h,r=n.c,i=n.l,u=t.h-e,o=t.c-r,a=t.l-i;return isNaN(o)&&(o=0,r=isNaN(r)?t.c:r),isNaN(u)?(u=0,e=isNaN(e)?t.h:e):u>180?u-=360:-180>u&&(u+=360),function(n){return sn(e+u*n,r+o*n,i+a*n)+""}}function Dr(n,t){n=ao.hsl(n),t=ao.hsl(t);var e=n.h,r=n.s,i=n.l,u=t.h-e,o=t.s-r,a=t.l-i;return isNaN(o)&&(o=0,r=isNaN(r)?t.s:r),isNaN(u)?(u=0,e=isNaN(e)?t.h:e):u>180?u-=360:-180>u&&(u+=360),function(n){return cn(e+u*n,r+o*n,i+a*n)+""}}function Pr(n,t){n=ao.lab(n),t=ao.lab(t);var e=n.l,r=n.a,i=n.b,u=t.l-e,o=t.a-r,a=t.b-i;return function(n){return pn(e+u*n,r+o*n,i+a*n)+""}}function Ur(n,t){return t-=n,function(e){return Math.round(n+t*e)}}function jr(n){var t=[n.a,n.b],e=[n.c,n.d],r=Hr(t),i=Fr(t,e),u=Hr(Or(e,t,-i))||0;t[0]*e[1]<e[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,i*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-e[0],e[1]))*Zo,this.translate=[n.e,n.f],this.scale=[r,u],this.skew=u?Math.atan2(i,u)*Zo:0}function Fr(n,t){return n[0]*t[0]+n[1]*t[1]}function Hr(n){var t=Math.sqrt(Fr(n,n));return t&&(n[0]/=t,n[1]/=t),t}function Or(n,t,e){return n[0]+=e*t[0],n[1]+=e*t[1],n}function Ir(n){return n.length?n.pop()+",":""}function Yr(n,t,e,r){if(n[0]!==t[0]||n[1]!==t[1]){var i=e.push("translate(",null,",",null,")");r.push({i:i-4,x:yr(n[0],t[0])},{i:i-2,x:yr(n[1],t[1])})}else(t[0]||t[1])&&e.push("translate("+t+")")}function Zr(n,t,e,r){n!==t?(n-t>180?t+=360:t-n>180&&(n+=360),r.push({i:e.push(Ir(e)+"rotate(",null,")")-2,x:yr(n,t)})):t&&e.push(Ir(e)+"rotate("+t+")")}function Vr(n,t,e,r){n!==t?r.push({i:e.push(Ir(e)+"skewX(",null,")")-2,x:yr(n,t)}):t&&e.push(Ir(e)+"skewX("+t+")")}function Xr(n,t,e,r){if(n[0]!==t[0]||n[1]!==t[1]){var i=e.push(Ir(e)+"scale(",null,",",null,")");r.push({i:i-4,x:yr(n[0],t[0])},{i:i-2,x:yr(n[1],t[1])})}else 1===t[0]&&1===t[1]||e.push(Ir(e)+"scale("+t+")")}function $r(n,t){var e=[],r=[];return n=ao.transform(n),t=ao.transform(t),Yr(n.translate,t.translate,e,r),Zr(n.rotate,t.rotate,e,r),Vr(n.skew,t.skew,e,r),Xr(n.scale,t.scale,e,r),n=t=null,function(n){for(var t,i=-1,u=r.length;++i<u;)e[(t=r[i]).i]=t.x(n);return e.join("")}}function Br(n,t){return t=(t-=n=+n)||1/t,function(e){return(e-n)/t}}function Wr(n,t){return t=(t-=n=+n)||1/t,function(e){return Math.max(0,Math.min(1,(e-n)/t))}}function Jr(n){for(var t=n.source,e=n.target,r=Kr(t,e),i=[t];t!==r;)t=t.parent,i.push(t);for(var u=i.length;e!==r;)i.splice(u,0,e),e=e.parent;return i}function Gr(n){for(var t=[],e=n.parent;null!=e;)t.push(n),n=e,e=e.parent;return t.push(n),t}function Kr(n,t){if(n===t)return n;for(var e=Gr(n),r=Gr(t),i=e.pop(),u=r.pop(),o=null;i===u;)o=i,i=e.pop(),u=r.pop();return o}function Qr(n){n.fixed|=2}function ni(n){n.fixed&=-7}function ti(n){n.fixed|=4,n.px=n.x,n.py=n.y}function ei(n){n.fixed&=-5}function ri(n,t,e){var r=0,i=0;if(n.charge=0,!n.leaf)for(var u,o=n.nodes,a=o.length,l=-1;++l<a;)u=o[l],null!=u&&(ri(u,t,e),n.charge+=u.charge,r+=u.charge*u.cx,i+=u.charge*u.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var c=t*e[n.point.index];n.charge+=n.pointCharge=c,r+=c*n.point.x,i+=c*n.point.y}n.cx=r/n.charge,n.cy=i/n.charge}function ii(n,t){return ao.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=fi,n}function ui(n,t){for(var e=[n];null!=(n=e.pop());)if(t(n),(i=n.children)&&(r=i.length))for(var r,i;--r>=0;)e.push(i[r])}function oi(n,t){for(var e=[n],r=[];null!=(n=e.pop());)if(r.push(n),(u=n.children)&&(i=u.length))for(var i,u,o=-1;++o<i;)e.push(u[o]);for(;null!=(n=r.pop());)t(n)}function ai(n){return n.children}function li(n){return n.value}function ci(n,t){return t.value-n.value}function fi(n){return ao.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function si(n){return n.x}function hi(n){return n.y}function pi(n,t,e){n.y0=t,n.y=e}function gi(n){return ao.range(n.length)}function vi(n){for(var t=-1,e=n[0].length,r=[];++t<e;)r[t]=0;return r}function di(n){for(var t,e=1,r=0,i=n[0][1],u=n.length;u>e;++e)(t=n[e][1])>i&&(r=e,i=t);return r}function yi(n){return n.reduce(mi,0)}function mi(n,t){return n+t[1]}function Mi(n,t){return xi(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function xi(n,t){for(var e=-1,r=+n[0],i=(n[1]-r)/t,u=[];++e<=t;)u[e]=i*e+r;return u}function bi(n){return[ao.min(n),ao.max(n)]}function _i(n,t){return n.value-t.value}function wi(n,t){var e=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=e,e._pack_prev=t}function Si(n,t){n._pack_next=t,t._pack_prev=n}function ki(n,t){var e=t.x-n.x,r=t.y-n.y,i=n.r+t.r;return.999*i*i>e*e+r*r}function Ni(n){function t(n){f=Math.min(n.x-n.r,f),s=Math.max(n.x+n.r,s),h=Math.min(n.y-n.r,h),p=Math.max(n.y+n.r,p)}if((e=n.children)&&(c=e.length)){var e,r,i,u,o,a,l,c,f=1/0,s=-(1/0),h=1/0,p=-(1/0);if(e.forEach(Ei),r=e[0],r.x=-r.r,r.y=0,t(r),c>1&&(i=e[1],i.x=i.r,i.y=0,t(i),c>2))for(u=e[2],zi(r,i,u),t(u),wi(r,u),r._pack_prev=u,wi(u,i),i=r._pack_next,o=3;c>o;o++){zi(r,i,u=e[o]);var g=0,v=1,d=1;for(a=i._pack_next;a!==i;a=a._pack_next,v++)if(ki(a,u)){g=1;break}if(1==g)for(l=r._pack_prev;l!==a._pack_prev&&!ki(l,u);l=l._pack_prev,d++);g?(d>v||v==d&&i.r<r.r?Si(r,i=a):Si(r=l,i),o--):(wi(r,u),i=u,t(u))}var y=(f+s)/2,m=(h+p)/2,M=0;for(o=0;c>o;o++)u=e[o],u.x-=y,u.y-=m,M=Math.max(M,u.r+Math.sqrt(u.x*u.x+u.y*u.y));n.r=M,e.forEach(Ai)}}function Ei(n){n._pack_next=n._pack_prev=n}function Ai(n){delete n._pack_next,delete n._pack_prev}function Ci(n,t,e,r){var i=n.children;if(n.x=t+=r*n.x,n.y=e+=r*n.y,n.r*=r,i)for(var u=-1,o=i.length;++u<o;)Ci(i[u],t,e,r)}function zi(n,t,e){var r=n.r+e.r,i=t.x-n.x,u=t.y-n.y;if(r&&(i||u)){var o=t.r+e.r,a=i*i+u*u;o*=o,r*=r;var l=.5+(r-o)/(2*a),c=Math.sqrt(Math.max(0,2*o*(r+a)-(r-=a)*r-o*o))/(2*a);e.x=n.x+l*i+c*u,e.y=n.y+l*u-c*i}else e.x=n.x+r,e.y=n.y}function Li(n,t){return n.parent==t.parent?1:2}function qi(n){var t=n.children;return t.length?t[0]:n.t}function Ti(n){var t,e=n.children;return(t=e.length)?e[t-1]:n.t}function Ri(n,t,e){var r=e/(t.i-n.i);t.c-=r,t.s+=e,n.c+=r,t.z+=e,t.m+=e}function Di(n){for(var t,e=0,r=0,i=n.children,u=i.length;--u>=0;)t=i[u],t.z+=e,t.m+=e,e+=t.s+(r+=t.c)}function Pi(n,t,e){return n.a.parent===t.parent?n.a:e}function Ui(n){return 1+ao.max(n,function(n){return n.y})}function ji(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function Fi(n){var t=n.children;return t&&t.length?Fi(t[0]):n}function Hi(n){var t,e=n.children;return e&&(t=e.length)?Hi(e[t-1]):n}function Oi(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function Ii(n,t){var e=n.x+t[3],r=n.y+t[0],i=n.dx-t[1]-t[3],u=n.dy-t[0]-t[2];return 0>i&&(e+=i/2,i=0),0>u&&(r+=u/2,u=0),{x:e,y:r,dx:i,dy:u}}function Yi(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function Zi(n){return n.rangeExtent?n.rangeExtent():Yi(n.range())}function Vi(n,t,e,r){var i=e(n[0],n[1]),u=r(t[0],t[1]);return function(n){return u(i(n))}}function Xi(n,t){var e,r=0,i=n.length-1,u=n[r],o=n[i];return u>o&&(e=r,r=i,i=e,e=u,u=o,o=e),n[r]=t.floor(u),n[i]=t.ceil(o),n}function $i(n){return n?{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}:Sl}function Bi(n,t,e,r){var i=[],u=[],o=0,a=Math.min(n.length,t.length)-1;for(n[a]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<=a;)i.push(e(n[o-1],n[o])),u.push(r(t[o-1],t[o]));return function(t){var e=ao.bisect(n,t,1,a)-1;return u[e](i[e](t))}}function Wi(n,t,e,r){function i(){var i=Math.min(n.length,t.length)>2?Bi:Vi,l=r?Wr:Br;return o=i(n,t,l,e),a=i(t,n,l,Mr),u}function u(n){return o(n)}var o,a;return u.invert=function(n){return a(n)},u.domain=function(t){return arguments.length?(n=t.map(Number),i()):n},u.range=function(n){return arguments.length?(t=n,i()):t},u.rangeRound=function(n){return u.range(n).interpolate(Ur)},u.clamp=function(n){return arguments.length?(r=n,i()):r},u.interpolate=function(n){return arguments.length?(e=n,i()):e},u.ticks=function(t){return Qi(n,t)},u.tickFormat=function(t,e){return nu(n,t,e)},u.nice=function(t){return Gi(n,t),i()},u.copy=function(){return Wi(n,t,e,r)},i()}function Ji(n,t){return ao.rebind(n,t,"range","rangeRound","interpolate","clamp")}function Gi(n,t){return Xi(n,$i(Ki(n,t)[2])),Xi(n,$i(Ki(n,t)[2])),n}function Ki(n,t){null==t&&(t=10);var e=Yi(n),r=e[1]-e[0],i=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),u=t/r*i;return.15>=u?i*=10:.35>=u?i*=5:.75>=u&&(i*=2),e[0]=Math.ceil(e[0]/i)*i,e[1]=Math.floor(e[1]/i)*i+.5*i,e[2]=i,e}function Qi(n,t){return ao.range.apply(ao,Ki(n,t))}function nu(n,t,e){var r=Ki(n,t);if(e){var i=ha.exec(e);if(i.shift(),"s"===i[8]){var u=ao.formatPrefix(Math.max(xo(r[0]),xo(r[1])));return i[7]||(i[7]="."+tu(u.scale(r[2]))),i[8]="f",e=ao.format(i.join("")),function(n){return e(u.scale(n))+u.symbol}}i[7]||(i[7]="."+eu(i[8],r)),e=i.join("")}else e=",."+tu(r[2])+"f";return ao.format(e)}function tu(n){return-Math.floor(Math.log(n)/Math.LN10+.01)}function eu(n,t){var e=tu(t[2]);return n in kl?Math.abs(e-tu(Math.max(xo(t[0]),xo(t[1]))))+ +("e"!==n):e-2*("%"===n)}function ru(n,t,e,r){function i(n){return(e?Math.log(0>n?0:n):-Math.log(n>0?0:-n))/Math.log(t)}function u(n){return e?Math.pow(t,n):-Math.pow(t,-n)}function o(t){return n(i(t))}return o.invert=function(t){return u(n.invert(t))},o.domain=function(t){return arguments.length?(e=t[0]>=0,n.domain((r=t.map(Number)).map(i)),o):r},o.base=function(e){return arguments.length?(t=+e,n.domain(r.map(i)),o):t},o.nice=function(){var t=Xi(r.map(i),e?Math:El);return n.domain(t),r=t.map(u),o},o.ticks=function(){var n=Yi(r),o=[],a=n[0],l=n[1],c=Math.floor(i(a)),f=Math.ceil(i(l)),s=t%1?2:t;if(isFinite(f-c)){if(e){for(;f>c;c++)for(var h=1;s>h;h++)o.push(u(c)*h);o.push(u(c))}else for(o.push(u(c));c++<f;)for(var h=s-1;h>0;h--)o.push(u(c)*h);for(c=0;o[c]<a;c++);for(f=o.length;o[f-1]>l;f--);o=o.slice(c,f)}return o},o.tickFormat=function(n,e){if(!arguments.length)return Nl;arguments.length<2?e=Nl:"function"!=typeof e&&(e=ao.format(e));var r=Math.max(1,t*n/o.ticks().length);return function(n){var o=n/u(Math.round(i(n)));return t-.5>o*t&&(o*=t),r>=o?e(n):""}},o.copy=function(){return ru(n.copy(),t,e,r)},Ji(o,n)}function iu(n,t,e){function r(t){return n(i(t))}var i=uu(t),u=uu(1/t);return r.invert=function(t){return u(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain((e=t.map(Number)).map(i)),r):e},r.ticks=function(n){return Qi(e,n)},r.tickFormat=function(n,t){return nu(e,n,t)},r.nice=function(n){return r.domain(Gi(e,n))},r.exponent=function(o){return arguments.length?(i=uu(t=o),u=uu(1/t),n.domain(e.map(i)),r):t},r.copy=function(){return iu(n.copy(),t,e)},Ji(r,n)}function uu(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function ou(n,t){function e(e){return u[((i.get(e)||("range"===t.t?i.set(e,n.push(e)):NaN))-1)%u.length]}function r(t,e){return ao.range(n.length).map(function(n){return t+e*n})}var i,u,o;return e.domain=function(r){if(!arguments.length)return n;n=[],i=new c;for(var u,o=-1,a=r.length;++o<a;)i.has(u=r[o])||i.set(u,n.push(u));return e[t.t].apply(e,t.a)},e.range=function(n){return arguments.length?(u=n,o=0,t={t:"range",a:arguments},e):u},e.rangePoints=function(i,a){arguments.length<2&&(a=0);var l=i[0],c=i[1],f=n.length<2?(l=(l+c)/2,0):(c-l)/(n.length-1+a);return u=r(l+f*a/2,f),o=0,t={t:"rangePoints",a:arguments},e},e.rangeRoundPoints=function(i,a){arguments.length<2&&(a=0);var l=i[0],c=i[1],f=n.length<2?(l=c=Math.round((l+c)/2),0):(c-l)/(n.length-1+a)|0;return u=r(l+Math.round(f*a/2+(c-l-(n.length-1+a)*f)/2),f),o=0,t={t:"rangeRoundPoints",a:arguments},e},e.rangeBands=function(i,a,l){arguments.length<2&&(a=0),arguments.length<3&&(l=a);var c=i[1]<i[0],f=i[c-0],s=i[1-c],h=(s-f)/(n.length-a+2*l);return u=r(f+h*l,h),c&&u.reverse(),o=h*(1-a),t={t:"rangeBands",a:arguments},e},e.rangeRoundBands=function(i,a,l){arguments.length<2&&(a=0),arguments.length<3&&(l=a);var c=i[1]<i[0],f=i[c-0],s=i[1-c],h=Math.floor((s-f)/(n.length-a+2*l));return u=r(f+Math.round((s-f-(n.length-a)*h)/2),h),c&&u.reverse(),o=Math.round(h*(1-a)),t={t:"rangeRoundBands",a:arguments},e},e.rangeBand=function(){return o},e.rangeExtent=function(){return Yi(t.a[0])},e.copy=function(){return ou(n,t)},e.domain(n)}function au(n,t){function u(){var e=0,r=t.length;for(a=[];++e<r;)a[e-1]=ao.quantile(n,e/r);return o}function o(n){return isNaN(n=+n)?void 0:t[ao.bisect(a,n)]}var a;return o.domain=function(t){return arguments.length?(n=t.map(r).filter(i).sort(e),u()):n},o.range=function(n){return arguments.length?(t=n,u()):t},o.quantiles=function(){return a},o.invertExtent=function(e){return e=t.indexOf(e),0>e?[NaN,NaN]:[e>0?a[e-1]:n[0],e<a.length?a[e]:n[n.length-1]]},o.copy=function(){return au(n,t)},u()}function lu(n,t,e){function r(t){return e[Math.max(0,Math.min(o,Math.floor(u*(t-n))))]}function i(){return u=e.length/(t-n),o=e.length-1,r}var u,o;return r.domain=function(e){return arguments.length?(n=+e[0],t=+e[e.length-1],i()):[n,t]},r.range=function(n){return arguments.length?(e=n,i()):e},r.invertExtent=function(t){return t=e.indexOf(t),t=0>t?NaN:t/u+n,[t,t+1/u]},r.copy=function(){return lu(n,t,e)},i()}function cu(n,t){function e(e){return e>=e?t[ao.bisect(n,e)]:void 0}return e.domain=function(t){return arguments.length?(n=t,e):n},e.range=function(n){return arguments.length?(t=n,e):t},e.invertExtent=function(e){return e=t.indexOf(e),[n[e-1],n[e]]},e.copy=function(){return cu(n,t)},e}function fu(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=e.map(t),t):n},t.ticks=function(t){return Qi(n,t)},t.tickFormat=function(t,e){return nu(n,t,e)},t.copy=function(){return fu(n)},t}function su(){return 0}function hu(n){return n.innerRadius}function pu(n){return n.outerRadius}function gu(n){return n.startAngle}function vu(n){return n.endAngle}function du(n){return n&&n.padAngle}function yu(n,t,e,r){return(n-e)*t-(t-r)*n>0?0:1}function mu(n,t,e,r,i){var u=n[0]-t[0],o=n[1]-t[1],a=(i?r:-r)/Math.sqrt(u*u+o*o),l=a*o,c=-a*u,f=n[0]+l,s=n[1]+c,h=t[0]+l,p=t[1]+c,g=(f+h)/2,v=(s+p)/2,d=h-f,y=p-s,m=d*d+y*y,M=e-r,x=f*p-h*s,b=(0>y?-1:1)*Math.sqrt(Math.max(0,M*M*m-x*x)),_=(x*y-d*b)/m,w=(-x*d-y*b)/m,S=(x*y+d*b)/m,k=(-x*d+y*b)/m,N=_-g,E=w-v,A=S-g,C=k-v;return N*N+E*E>A*A+C*C&&(_=S,w=k),[[_-l,w-c],[_*e/M,w*e/M]]}function Mu(n){function t(t){function o(){c.push("M",u(n(f),a))}for(var l,c=[],f=[],s=-1,h=t.length,p=En(e),g=En(r);++s<h;)i.call(this,l=t[s],s)?f.push([+p.call(this,l,s),+g.call(this,l,s)]):f.length&&(o(),f=[]);return f.length&&o(),c.length?c.join(""):null}var e=Ce,r=ze,i=zt,u=xu,o=u.key,a=.7;return t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.defined=function(n){return arguments.length?(i=n,t):i},t.interpolate=function(n){return arguments.length?(o="function"==typeof n?u=n:(u=Tl.get(n)||xu).key,t):o},t.tension=function(n){return arguments.length?(a=n,t):a},t}function xu(n){return n.length>1?n.join("L"):n+"Z"}function bu(n){return n.join("L")+"Z"}function _u(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("H",(r[0]+(r=n[t])[0])/2,"V",r[1]);return e>1&&i.push("H",r[0]),i.join("")}function wu(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("V",(r=n[t])[1],"H",r[0]);return i.join("")}function Su(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("H",(r=n[t])[0],"V",r[1]);return i.join("")}function ku(n,t){return n.length<4?xu(n):n[1]+Au(n.slice(1,-1),Cu(n,t))}function Nu(n,t){return n.length<3?bu(n):n[0]+Au((n.push(n[0]),n),Cu([n[n.length-2]].concat(n,[n[1]]),t))}function Eu(n,t){return n.length<3?xu(n):n[0]+Au(n,Cu(n,t))}function Au(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return xu(n);var e=n.length!=t.length,r="",i=n[0],u=n[1],o=t[0],a=o,l=1;if(e&&(r+="Q"+(u[0]-2*o[0]/3)+","+(u[1]-2*o[1]/3)+","+u[0]+","+u[1],i=n[1],l=2),t.length>1){a=t[1],u=n[l],l++,r+="C"+(i[0]+o[0])+","+(i[1]+o[1])+","+(u[0]-a[0])+","+(u[1]-a[1])+","+u[0]+","+u[1];for(var c=2;c<t.length;c++,l++)u=n[l],a=t[c],r+="S"+(u[0]-a[0])+","+(u[1]-a[1])+","+u[0]+","+u[1]}if(e){var f=n[l];r+="Q"+(u[0]+2*a[0]/3)+","+(u[1]+2*a[1]/3)+","+f[0]+","+f[1]}return r}function Cu(n,t){for(var e,r=[],i=(1-t)/2,u=n[0],o=n[1],a=1,l=n.length;++a<l;)e=u,u=o,o=n[a],r.push([i*(o[0]-e[0]),i*(o[1]-e[1])]);return r}function zu(n){if(n.length<3)return xu(n);var t=1,e=n.length,r=n[0],i=r[0],u=r[1],o=[i,i,i,(r=n[1])[0]],a=[u,u,u,r[1]],l=[i,",",u,"L",Ru(Pl,o),",",Ru(Pl,a)];for(n.push(n[e-1]);++t<=e;)r=n[t],o.shift(),o.push(r[0]),a.shift(),a.push(r[1]),Du(l,o,a);return n.pop(),l.push("L",r),l.join("")}function Lu(n){if(n.length<4)return xu(n);for(var t,e=[],r=-1,i=n.length,u=[0],o=[0];++r<3;)t=n[r],u.push(t[0]),o.push(t[1]);for(e.push(Ru(Pl,u)+","+Ru(Pl,o)),--r;++r<i;)t=n[r],u.shift(),u.push(t[0]),o.shift(),o.push(t[1]),Du(e,u,o);return e.join("")}function qu(n){for(var t,e,r=-1,i=n.length,u=i+4,o=[],a=[];++r<4;)e=n[r%i],o.push(e[0]),a.push(e[1]);for(t=[Ru(Pl,o),",",Ru(Pl,a)],--r;++r<u;)e=n[r%i],o.shift(),o.push(e[0]),a.shift(),a.push(e[1]),Du(t,o,a);return t.join("")}function Tu(n,t){var e=n.length-1;if(e)for(var r,i,u=n[0][0],o=n[0][1],a=n[e][0]-u,l=n[e][1]-o,c=-1;++c<=e;)r=n[c],i=c/e,r[0]=t*r[0]+(1-t)*(u+i*a),r[1]=t*r[1]+(1-t)*(o+i*l);return zu(n)}function Ru(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function Du(n,t,e){n.push("C",Ru(Rl,t),",",Ru(Rl,e),",",Ru(Dl,t),",",Ru(Dl,e),",",Ru(Pl,t),",",Ru(Pl,e))}function Pu(n,t){return(t[1]-n[1])/(t[0]-n[0])}function Uu(n){for(var t=0,e=n.length-1,r=[],i=n[0],u=n[1],o=r[0]=Pu(i,u);++t<e;)r[t]=(o+(o=Pu(i=u,u=n[t+1])))/2;return r[t]=o,r}function ju(n){for(var t,e,r,i,u=[],o=Uu(n),a=-1,l=n.length-1;++a<l;)t=Pu(n[a],n[a+1]),xo(t)<Uo?o[a]=o[a+1]=0:(e=o[a]/t,r=o[a+1]/t,i=e*e+r*r,i>9&&(i=3*t/Math.sqrt(i),o[a]=i*e,o[a+1]=i*r));for(a=-1;++a<=l;)i=(n[Math.min(l,a+1)][0]-n[Math.max(0,a-1)][0])/(6*(1+o[a]*o[a])),u.push([i||0,o[a]*i||0]);return u}function Fu(n){return n.length<3?xu(n):n[0]+Au(n,ju(n))}function Hu(n){for(var t,e,r,i=-1,u=n.length;++i<u;)t=n[i],e=t[0],r=t[1]-Io,t[0]=e*Math.cos(r),t[1]=e*Math.sin(r);return n}function Ou(n){function t(t){function l(){v.push("M",a(n(y),s),f,c(n(d.reverse()),s),"Z")}for(var h,p,g,v=[],d=[],y=[],m=-1,M=t.length,x=En(e),b=En(i),_=e===r?function(){
    return p}:En(r),w=i===u?function(){return g}:En(u);++m<M;)o.call(this,h=t[m],m)?(d.push([p=+x.call(this,h,m),g=+b.call(this,h,m)]),y.push([+_.call(this,h,m),+w.call(this,h,m)])):d.length&&(l(),d=[],y=[]);return d.length&&l(),v.length?v.join(""):null}var e=Ce,r=Ce,i=0,u=ze,o=zt,a=xu,l=a.key,c=a,f="L",s=.7;return t.x=function(n){return arguments.length?(e=r=n,t):r},t.x0=function(n){return arguments.length?(e=n,t):e},t.x1=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(i=u=n,t):u},t.y0=function(n){return arguments.length?(i=n,t):i},t.y1=function(n){return arguments.length?(u=n,t):u},t.defined=function(n){return arguments.length?(o=n,t):o},t.interpolate=function(n){return arguments.length?(l="function"==typeof n?a=n:(a=Tl.get(n)||xu).key,c=a.reverse||a,f=a.closed?"M":"L",t):l},t.tension=function(n){return arguments.length?(s=n,t):s},t}function Iu(n){return n.radius}function Yu(n){return[n.x,n.y]}function Zu(n){return function(){var t=n.apply(this,arguments),e=t[0],r=t[1]-Io;return[e*Math.cos(r),e*Math.sin(r)]}}function Vu(){return 64}function Xu(){return"circle"}function $u(n){var t=Math.sqrt(n/Fo);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function Bu(n){return function(){var t,e,r;(t=this[n])&&(r=t[e=t.active])&&(r.timer.c=null,r.timer.t=NaN,--t.count?delete t[e]:delete this[n],t.active+=.5,r.event&&r.event.interrupt.call(this,this.__data__,r.index))}}function Wu(n,t,e){return ko(n,Yl),n.namespace=t,n.id=e,n}function Ju(n,t,e,r){var i=n.id,u=n.namespace;return Y(n,"function"==typeof e?function(n,o,a){n[u][i].tween.set(t,r(e.call(n,n.__data__,o,a)))}:(e=r(e),function(n){n[u][i].tween.set(t,e)}))}function Gu(n){return null==n&&(n=""),function(){this.textContent=n}}function Ku(n){return null==n?"__transition__":"__transition_"+n+"__"}function Qu(n,t,e,r,i){function u(n){var t=v.delay;return f.t=t+l,n>=t?o(n-t):void(f.c=o)}function o(e){var i=g.active,u=g[i];u&&(u.timer.c=null,u.timer.t=NaN,--g.count,delete g[i],u.event&&u.event.interrupt.call(n,n.__data__,u.index));for(var o in g)if(r>+o){var c=g[o];c.timer.c=null,c.timer.t=NaN,--g.count,delete g[o]}f.c=a,qn(function(){return f.c&&a(e||1)&&(f.c=null,f.t=NaN),1},0,l),g.active=r,v.event&&v.event.start.call(n,n.__data__,t),p=[],v.tween.forEach(function(e,r){(r=r.call(n,n.__data__,t))&&p.push(r)}),h=v.ease,s=v.duration}function a(i){for(var u=i/s,o=h(u),a=p.length;a>0;)p[--a].call(n,o);return u>=1?(v.event&&v.event.end.call(n,n.__data__,t),--g.count?delete g[r]:delete n[e],1):void 0}var l,f,s,h,p,g=n[e]||(n[e]={active:0,count:0}),v=g[r];v||(l=i.time,f=qn(u,0,l),v=g[r]={tween:new c,time:l,timer:f,delay:i.delay,duration:i.duration,ease:i.ease,index:t},i=null,++g.count)}function no(n,t,e){n.attr("transform",function(n){var r=t(n);return"translate("+(isFinite(r)?r:e(n))+",0)"})}function to(n,t,e){n.attr("transform",function(n){var r=t(n);return"translate(0,"+(isFinite(r)?r:e(n))+")"})}function eo(n){return n.toISOString()}function ro(n,t,e){function r(t){return n(t)}function i(n,e){var r=n[1]-n[0],i=r/e,u=ao.bisect(Kl,i);return u==Kl.length?[t.year,Ki(n.map(function(n){return n/31536e6}),e)[2]]:u?t[i/Kl[u-1]<Kl[u]/i?u-1:u]:[tc,Ki(n,e)[2]]}return r.invert=function(t){return io(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain(t),r):n.domain().map(io)},r.nice=function(n,t){function e(e){return!isNaN(e)&&!n.range(e,io(+e+1),t).length}var u=r.domain(),o=Yi(u),a=null==n?i(o,10):"number"==typeof n&&i(o,n);return a&&(n=a[0],t=a[1]),r.domain(Xi(u,t>1?{floor:function(t){for(;e(t=n.floor(t));)t=io(t-1);return t},ceil:function(t){for(;e(t=n.ceil(t));)t=io(+t+1);return t}}:n))},r.ticks=function(n,t){var e=Yi(r.domain()),u=null==n?i(e,10):"number"==typeof n?i(e,n):!n.range&&[{range:n},t];return u&&(n=u[0],t=u[1]),n.range(e[0],io(+e[1]+1),1>t?1:t)},r.tickFormat=function(){return e},r.copy=function(){return ro(n.copy(),t,e)},Ji(r,n)}function io(n){return new Date(n)}function uo(n){return JSON.parse(n.responseText)}function oo(n){var t=fo.createRange();return t.selectNode(fo.body),t.createContextualFragment(n.responseText)}var ao={version:"3.5.17"},lo=[].slice,co=function(n){return lo.call(n)},fo=this.document;if(fo)try{co(fo.documentElement.childNodes)[0].nodeType}catch(so){co=function(n){for(var t=n.length,e=new Array(t);t--;)e[t]=n[t];return e}}if(Date.now||(Date.now=function(){return+new Date}),fo)try{fo.createElement("DIV").style.setProperty("opacity",0,"")}catch(ho){var po=this.Element.prototype,go=po.setAttribute,vo=po.setAttributeNS,yo=this.CSSStyleDeclaration.prototype,mo=yo.setProperty;po.setAttribute=function(n,t){go.call(this,n,t+"")},po.setAttributeNS=function(n,t,e){vo.call(this,n,t,e+"")},yo.setProperty=function(n,t,e){mo.call(this,n,t+"",e)}}ao.ascending=e,ao.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:NaN},ao.min=function(n,t){var e,r,i=-1,u=n.length;if(1===arguments.length){for(;++i<u;)if(null!=(r=n[i])&&r>=r){e=r;break}for(;++i<u;)null!=(r=n[i])&&e>r&&(e=r)}else{for(;++i<u;)if(null!=(r=t.call(n,n[i],i))&&r>=r){e=r;break}for(;++i<u;)null!=(r=t.call(n,n[i],i))&&e>r&&(e=r)}return e},ao.max=function(n,t){var e,r,i=-1,u=n.length;if(1===arguments.length){for(;++i<u;)if(null!=(r=n[i])&&r>=r){e=r;break}for(;++i<u;)null!=(r=n[i])&&r>e&&(e=r)}else{for(;++i<u;)if(null!=(r=t.call(n,n[i],i))&&r>=r){e=r;break}for(;++i<u;)null!=(r=t.call(n,n[i],i))&&r>e&&(e=r)}return e},ao.extent=function(n,t){var e,r,i,u=-1,o=n.length;if(1===arguments.length){for(;++u<o;)if(null!=(r=n[u])&&r>=r){e=i=r;break}for(;++u<o;)null!=(r=n[u])&&(e>r&&(e=r),r>i&&(i=r))}else{for(;++u<o;)if(null!=(r=t.call(n,n[u],u))&&r>=r){e=i=r;break}for(;++u<o;)null!=(r=t.call(n,n[u],u))&&(e>r&&(e=r),r>i&&(i=r))}return[e,i]},ao.sum=function(n,t){var e,r=0,u=n.length,o=-1;if(1===arguments.length)for(;++o<u;)i(e=+n[o])&&(r+=e);else for(;++o<u;)i(e=+t.call(n,n[o],o))&&(r+=e);return r},ao.mean=function(n,t){var e,u=0,o=n.length,a=-1,l=o;if(1===arguments.length)for(;++a<o;)i(e=r(n[a]))?u+=e:--l;else for(;++a<o;)i(e=r(t.call(n,n[a],a)))?u+=e:--l;return l?u/l:void 0},ao.quantile=function(n,t){var e=(n.length-1)*t+1,r=Math.floor(e),i=+n[r-1],u=e-r;return u?i+u*(n[r]-i):i},ao.median=function(n,t){var u,o=[],a=n.length,l=-1;if(1===arguments.length)for(;++l<a;)i(u=r(n[l]))&&o.push(u);else for(;++l<a;)i(u=r(t.call(n,n[l],l)))&&o.push(u);return o.length?ao.quantile(o.sort(e),.5):void 0},ao.variance=function(n,t){var e,u,o=n.length,a=0,l=0,c=-1,f=0;if(1===arguments.length)for(;++c<o;)i(e=r(n[c]))&&(u=e-a,a+=u/++f,l+=u*(e-a));else for(;++c<o;)i(e=r(t.call(n,n[c],c)))&&(u=e-a,a+=u/++f,l+=u*(e-a));return f>1?l/(f-1):void 0},ao.deviation=function(){var n=ao.variance.apply(this,arguments);return n?Math.sqrt(n):n};var Mo=u(e);ao.bisectLeft=Mo.left,ao.bisect=ao.bisectRight=Mo.right,ao.bisector=function(n){return u(1===n.length?function(t,r){return e(n(t),r)}:n)},ao.shuffle=function(n,t,e){(u=arguments.length)<3&&(e=n.length,2>u&&(t=0));for(var r,i,u=e-t;u;)i=Math.random()*u--|0,r=n[u+t],n[u+t]=n[i+t],n[i+t]=r;return n},ao.permute=function(n,t){for(var e=t.length,r=new Array(e);e--;)r[e]=n[t[e]];return r},ao.pairs=function(n){for(var t,e=0,r=n.length-1,i=n[0],u=new Array(0>r?0:r);r>e;)u[e]=[t=i,i=n[++e]];return u},ao.transpose=function(n){if(!(i=n.length))return[];for(var t=-1,e=ao.min(n,o),r=new Array(e);++t<e;)for(var i,u=-1,a=r[t]=new Array(i);++u<i;)a[u]=n[u][t];return r},ao.zip=function(){return ao.transpose(arguments)},ao.keys=function(n){var t=[];for(var e in n)t.push(e);return t},ao.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},ao.entries=function(n){var t=[];for(var e in n)t.push({key:e,value:n[e]});return t},ao.merge=function(n){for(var t,e,r,i=n.length,u=-1,o=0;++u<i;)o+=n[u].length;for(e=new Array(o);--i>=0;)for(r=n[i],t=r.length;--t>=0;)e[--o]=r[t];return e};var xo=Math.abs;ao.range=function(n,t,e){if(arguments.length<3&&(e=1,arguments.length<2&&(t=n,n=0)),(t-n)/e===1/0)throw new Error("infinite range");var r,i=[],u=a(xo(e)),o=-1;if(n*=u,t*=u,e*=u,0>e)for(;(r=n+e*++o)>t;)i.push(r/u);else for(;(r=n+e*++o)<t;)i.push(r/u);return i},ao.map=function(n,t){var e=new c;if(n instanceof c)n.forEach(function(n,t){e.set(n,t)});else if(Array.isArray(n)){var r,i=-1,u=n.length;if(1===arguments.length)for(;++i<u;)e.set(i,n[i]);else for(;++i<u;)e.set(t.call(n,r=n[i],i),r)}else for(var o in n)e.set(o,n[o]);return e};var bo="__proto__",_o="\x00";l(c,{has:h,get:function(n){return this._[f(n)]},set:function(n,t){return this._[f(n)]=t},remove:p,keys:g,values:function(){var n=[];for(var t in this._)n.push(this._[t]);return n},entries:function(){var n=[];for(var t in this._)n.push({key:s(t),value:this._[t]});return n},size:v,empty:d,forEach:function(n){for(var t in this._)n.call(this,s(t),this._[t])}}),ao.nest=function(){function n(t,o,a){if(a>=u.length)return r?r.call(i,o):e?o.sort(e):o;for(var l,f,s,h,p=-1,g=o.length,v=u[a++],d=new c;++p<g;)(h=d.get(l=v(f=o[p])))?h.push(f):d.set(l,[f]);return t?(f=t(),s=function(e,r){f.set(e,n(t,r,a))}):(f={},s=function(e,r){f[e]=n(t,r,a)}),d.forEach(s),f}function t(n,e){if(e>=u.length)return n;var r=[],i=o[e++];return n.forEach(function(n,i){r.push({key:n,values:t(i,e)})}),i?r.sort(function(n,t){return i(n.key,t.key)}):r}var e,r,i={},u=[],o=[];return i.map=function(t,e){return n(e,t,0)},i.entries=function(e){return t(n(ao.map,e,0),0)},i.key=function(n){return u.push(n),i},i.sortKeys=function(n){return o[u.length-1]=n,i},i.sortValues=function(n){return e=n,i},i.rollup=function(n){return r=n,i},i},ao.set=function(n){var t=new y;if(n)for(var e=0,r=n.length;r>e;++e)t.add(n[e]);return t},l(y,{has:h,add:function(n){return this._[f(n+="")]=!0,n},remove:p,values:g,size:v,empty:d,forEach:function(n){for(var t in this._)n.call(this,s(t))}}),ao.behavior={},ao.rebind=function(n,t){for(var e,r=1,i=arguments.length;++r<i;)n[e=arguments[r]]=M(n,t,t[e]);return n};var wo=["webkit","ms","moz","Moz","o","O"];ao.dispatch=function(){for(var n=new _,t=-1,e=arguments.length;++t<e;)n[arguments[t]]=w(n);return n},_.prototype.on=function(n,t){var e=n.indexOf("."),r="";if(e>=0&&(r=n.slice(e+1),n=n.slice(0,e)),n)return arguments.length<2?this[n].on(r):this[n].on(r,t);if(2===arguments.length){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(r,null);return this}},ao.event=null,ao.requote=function(n){return n.replace(So,"\\$&")};var So=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,ko={}.__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var e in t)n[e]=t[e]},No=function(n,t){return t.querySelector(n)},Eo=function(n,t){return t.querySelectorAll(n)},Ao=function(n,t){var e=n.matches||n[x(n,"matchesSelector")];return(Ao=function(n,t){return e.call(n,t)})(n,t)};"function"==typeof Sizzle&&(No=function(n,t){return Sizzle(n,t)[0]||null},Eo=Sizzle,Ao=Sizzle.matchesSelector),ao.selection=function(){return ao.select(fo.documentElement)};var Co=ao.selection.prototype=[];Co.select=function(n){var t,e,r,i,u=[];n=A(n);for(var o=-1,a=this.length;++o<a;){u.push(t=[]),t.parentNode=(r=this[o]).parentNode;for(var l=-1,c=r.length;++l<c;)(i=r[l])?(t.push(e=n.call(i,i.__data__,l,o)),e&&"__data__"in i&&(e.__data__=i.__data__)):t.push(null)}return E(u)},Co.selectAll=function(n){var t,e,r=[];n=C(n);for(var i=-1,u=this.length;++i<u;)for(var o=this[i],a=-1,l=o.length;++a<l;)(e=o[a])&&(r.push(t=co(n.call(e,e.__data__,a,i))),t.parentNode=e);return E(r)};var zo="http://www.w3.org/1999/xhtml",Lo={svg:"http://www.w3.org/2000/svg",xhtml:zo,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};ao.ns={prefix:Lo,qualify:function(n){var t=n.indexOf(":"),e=n;return t>=0&&"xmlns"!==(e=n.slice(0,t))&&(n=n.slice(t+1)),Lo.hasOwnProperty(e)?{space:Lo[e],local:n}:n}},Co.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node();return n=ao.ns.qualify(n),n.local?e.getAttributeNS(n.space,n.local):e.getAttribute(n)}for(t in n)this.each(z(t,n[t]));return this}return this.each(z(n,t))},Co.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node(),r=(n=T(n)).length,i=-1;if(t=e.classList){for(;++i<r;)if(!t.contains(n[i]))return!1}else for(t=e.getAttribute("class");++i<r;)if(!q(n[i]).test(t))return!1;return!0}for(t in n)this.each(R(t,n[t]));return this}return this.each(R(n,t))},Co.style=function(n,e,r){var i=arguments.length;if(3>i){if("string"!=typeof n){2>i&&(e="");for(r in n)this.each(P(r,n[r],e));return this}if(2>i){var u=this.node();return t(u).getComputedStyle(u,null).getPropertyValue(n)}r=""}return this.each(P(n,e,r))},Co.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(U(t,n[t]));return this}return this.each(U(n,t))},Co.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},Co.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},Co.append=function(n){return n=j(n),this.select(function(){return this.appendChild(n.apply(this,arguments))})},Co.insert=function(n,t){return n=j(n),t=A(t),this.select(function(){return this.insertBefore(n.apply(this,arguments),t.apply(this,arguments)||null)})},Co.remove=function(){return this.each(F)},Co.data=function(n,t){function e(n,e){var r,i,u,o=n.length,s=e.length,h=Math.min(o,s),p=new Array(s),g=new Array(s),v=new Array(o);if(t){var d,y=new c,m=new Array(o);for(r=-1;++r<o;)(i=n[r])&&(y.has(d=t.call(i,i.__data__,r))?v[r]=i:y.set(d,i),m[r]=d);for(r=-1;++r<s;)(i=y.get(d=t.call(e,u=e[r],r)))?i!==!0&&(p[r]=i,i.__data__=u):g[r]=H(u),y.set(d,!0);for(r=-1;++r<o;)r in m&&y.get(m[r])!==!0&&(v[r]=n[r])}else{for(r=-1;++r<h;)i=n[r],u=e[r],i?(i.__data__=u,p[r]=i):g[r]=H(u);for(;s>r;++r)g[r]=H(e[r]);for(;o>r;++r)v[r]=n[r]}g.update=p,g.parentNode=p.parentNode=v.parentNode=n.parentNode,a.push(g),l.push(p),f.push(v)}var r,i,u=-1,o=this.length;if(!arguments.length){for(n=new Array(o=(r=this[0]).length);++u<o;)(i=r[u])&&(n[u]=i.__data__);return n}var a=Z([]),l=E([]),f=E([]);if("function"==typeof n)for(;++u<o;)e(r=this[u],n.call(r,r.parentNode.__data__,u));else for(;++u<o;)e(r=this[u],n);return l.enter=function(){return a},l.exit=function(){return f},l},Co.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},Co.filter=function(n){var t,e,r,i=[];"function"!=typeof n&&(n=O(n));for(var u=0,o=this.length;o>u;u++){i.push(t=[]),t.parentNode=(e=this[u]).parentNode;for(var a=0,l=e.length;l>a;a++)(r=e[a])&&n.call(r,r.__data__,a,u)&&t.push(r)}return E(i)},Co.order=function(){for(var n=-1,t=this.length;++n<t;)for(var e,r=this[n],i=r.length-1,u=r[i];--i>=0;)(e=r[i])&&(u&&u!==e.nextSibling&&u.parentNode.insertBefore(e,u),u=e);return this},Co.sort=function(n){n=I.apply(this,arguments);for(var t=-1,e=this.length;++t<e;)this[t].sort(n);return this.order()},Co.each=function(n){return Y(this,function(t,e,r){n.call(t,t.__data__,e,r)})},Co.call=function(n){var t=co(arguments);return n.apply(t[0]=this,t),this},Co.empty=function(){return!this.node()},Co.node=function(){for(var n=0,t=this.length;t>n;n++)for(var e=this[n],r=0,i=e.length;i>r;r++){var u=e[r];if(u)return u}return null},Co.size=function(){var n=0;return Y(this,function(){++n}),n};var qo=[];ao.selection.enter=Z,ao.selection.enter.prototype=qo,qo.append=Co.append,qo.empty=Co.empty,qo.node=Co.node,qo.call=Co.call,qo.size=Co.size,qo.select=function(n){for(var t,e,r,i,u,o=[],a=-1,l=this.length;++a<l;){r=(i=this[a]).update,o.push(t=[]),t.parentNode=i.parentNode;for(var c=-1,f=i.length;++c<f;)(u=i[c])?(t.push(r[c]=e=n.call(i.parentNode,u.__data__,c,a)),e.__data__=u.__data__):t.push(null)}return E(o)},qo.insert=function(n,t){return arguments.length<2&&(t=V(this)),Co.insert.call(this,n,t)},ao.select=function(t){var e;return"string"==typeof t?(e=[No(t,fo)],e.parentNode=fo.documentElement):(e=[t],e.parentNode=n(t)),E([e])},ao.selectAll=function(n){var t;return"string"==typeof n?(t=co(Eo(n,fo)),t.parentNode=fo.documentElement):(t=co(n),t.parentNode=null),E([t])},Co.on=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t=!1);for(e in n)this.each(X(e,n[e],t));return this}if(2>r)return(r=this.node()["__on"+n])&&r._;e=!1}return this.each(X(n,t,e))};var To=ao.map({mouseenter:"mouseover",mouseleave:"mouseout"});fo&&To.forEach(function(n){"on"+n in fo&&To.remove(n)});var Ro,Do=0;ao.mouse=function(n){return J(n,k())};var Po=this.navigator&&/WebKit/.test(this.navigator.userAgent)?-1:0;ao.touch=function(n,t,e){if(arguments.length<3&&(e=t,t=k().changedTouches),t)for(var r,i=0,u=t.length;u>i;++i)if((r=t[i]).identifier===e)return J(n,r)},ao.behavior.drag=function(){function n(){this.on("mousedown.drag",u).on("touchstart.drag",o)}function e(n,t,e,u,o){return function(){function a(){var n,e,r=t(h,v);r&&(n=r[0]-M[0],e=r[1]-M[1],g|=n|e,M=r,p({type:"drag",x:r[0]+c[0],y:r[1]+c[1],dx:n,dy:e}))}function l(){t(h,v)&&(y.on(u+d,null).on(o+d,null),m(g),p({type:"dragend"}))}var c,f=this,s=ao.event.target.correspondingElement||ao.event.target,h=f.parentNode,p=r.of(f,arguments),g=0,v=n(),d=".drag"+(null==v?"":"-"+v),y=ao.select(e(s)).on(u+d,a).on(o+d,l),m=W(s),M=t(h,v);i?(c=i.apply(f,arguments),c=[c.x-M[0],c.y-M[1]]):c=[0,0],p({type:"dragstart"})}}var r=N(n,"drag","dragstart","dragend"),i=null,u=e(b,ao.mouse,t,"mousemove","mouseup"),o=e(G,ao.touch,m,"touchmove","touchend");return n.origin=function(t){return arguments.length?(i=t,n):i},ao.rebind(n,r,"on")},ao.touches=function(n,t){return arguments.length<2&&(t=k().touches),t?co(t).map(function(t){var e=J(n,t);return e.identifier=t.identifier,e}):[]};var Uo=1e-6,jo=Uo*Uo,Fo=Math.PI,Ho=2*Fo,Oo=Ho-Uo,Io=Fo/2,Yo=Fo/180,Zo=180/Fo,Vo=Math.SQRT2,Xo=2,$o=4;ao.interpolateZoom=function(n,t){var e,r,i=n[0],u=n[1],o=n[2],a=t[0],l=t[1],c=t[2],f=a-i,s=l-u,h=f*f+s*s;if(jo>h)r=Math.log(c/o)/Vo,e=function(n){return[i+n*f,u+n*s,o*Math.exp(Vo*n*r)]};else{var p=Math.sqrt(h),g=(c*c-o*o+$o*h)/(2*o*Xo*p),v=(c*c-o*o-$o*h)/(2*c*Xo*p),d=Math.log(Math.sqrt(g*g+1)-g),y=Math.log(Math.sqrt(v*v+1)-v);r=(y-d)/Vo,e=function(n){var t=n*r,e=rn(d),a=o/(Xo*p)*(e*un(Vo*t+d)-en(d));return[i+a*f,u+a*s,o*e/rn(Vo*t+d)]}}return e.duration=1e3*r,e},ao.behavior.zoom=function(){function n(n){n.on(L,s).on(Wo+".zoom",p).on("dblclick.zoom",g).on(R,h)}function e(n){return[(n[0]-k.x)/k.k,(n[1]-k.y)/k.k]}function r(n){return[n[0]*k.k+k.x,n[1]*k.k+k.y]}function i(n){k.k=Math.max(A[0],Math.min(A[1],n))}function u(n,t){t=r(t),k.x+=n[0]-t[0],k.y+=n[1]-t[1]}function o(t,e,r,o){t.__chart__={x:k.x,y:k.y,k:k.k},i(Math.pow(2,o)),u(d=e,r),t=ao.select(t),C>0&&(t=t.transition().duration(C)),t.call(n.event)}function a(){b&&b.domain(x.range().map(function(n){return(n-k.x)/k.k}).map(x.invert)),w&&w.domain(_.range().map(function(n){return(n-k.y)/k.k}).map(_.invert))}function l(n){z++||n({type:"zoomstart"})}function c(n){a(),n({type:"zoom",scale:k.k,translate:[k.x,k.y]})}function f(n){--z||(n({type:"zoomend"}),d=null)}function s(){function n(){a=1,u(ao.mouse(i),h),c(o)}function r(){s.on(q,null).on(T,null),p(a),f(o)}var i=this,o=D.of(i,arguments),a=0,s=ao.select(t(i)).on(q,n).on(T,r),h=e(ao.mouse(i)),p=W(i);Il.call(i),l(o)}function h(){function n(){var n=ao.touches(g);return p=k.k,n.forEach(function(n){n.identifier in d&&(d[n.identifier]=e(n))}),n}function t(){var t=ao.event.target;ao.select(t).on(x,r).on(b,a),_.push(t);for(var e=ao.event.changedTouches,i=0,u=e.length;u>i;++i)d[e[i].identifier]=null;var l=n(),c=Date.now();if(1===l.length){if(500>c-M){var f=l[0];o(g,f,d[f.identifier],Math.floor(Math.log(k.k)/Math.LN2)+1),S()}M=c}else if(l.length>1){var f=l[0],s=l[1],h=f[0]-s[0],p=f[1]-s[1];y=h*h+p*p}}function r(){var n,t,e,r,o=ao.touches(g);Il.call(g);for(var a=0,l=o.length;l>a;++a,r=null)if(e=o[a],r=d[e.identifier]){if(t)break;n=e,t=r}if(r){var f=(f=e[0]-n[0])*f+(f=e[1]-n[1])*f,s=y&&Math.sqrt(f/y);n=[(n[0]+e[0])/2,(n[1]+e[1])/2],t=[(t[0]+r[0])/2,(t[1]+r[1])/2],i(s*p)}M=null,u(n,t),c(v)}function a(){if(ao.event.touches.length){for(var t=ao.event.changedTouches,e=0,r=t.length;r>e;++e)delete d[t[e].identifier];for(var i in d)return void n()}ao.selectAll(_).on(m,null),w.on(L,s).on(R,h),N(),f(v)}var p,g=this,v=D.of(g,arguments),d={},y=0,m=".zoom-"+ao.event.changedTouches[0].identifier,x="touchmove"+m,b="touchend"+m,_=[],w=ao.select(g),N=W(g);t(),l(v),w.on(L,null).on(R,t)}function p(){var n=D.of(this,arguments);m?clearTimeout(m):(Il.call(this),v=e(d=y||ao.mouse(this)),l(n)),m=setTimeout(function(){m=null,f(n)},50),S(),i(Math.pow(2,.002*Bo())*k.k),u(d,v),c(n)}function g(){var n=ao.mouse(this),t=Math.log(k.k)/Math.LN2;o(this,n,e(n),ao.event.shiftKey?Math.ceil(t)-1:Math.floor(t)+1)}var v,d,y,m,M,x,b,_,w,k={x:0,y:0,k:1},E=[960,500],A=Jo,C=250,z=0,L="mousedown.zoom",q="mousemove.zoom",T="mouseup.zoom",R="touchstart.zoom",D=N(n,"zoomstart","zoom","zoomend");return Wo||(Wo="onwheel"in fo?(Bo=function(){return-ao.event.deltaY*(ao.event.deltaMode?120:1)},"wheel"):"onmousewheel"in fo?(Bo=function(){return ao.event.wheelDelta},"mousewheel"):(Bo=function(){return-ao.event.detail},"MozMousePixelScroll")),n.event=function(n){n.each(function(){var n=D.of(this,arguments),t=k;Hl?ao.select(this).transition().each("start.zoom",function(){k=this.__chart__||{x:0,y:0,k:1},l(n)}).tween("zoom:zoom",function(){var e=E[0],r=E[1],i=d?d[0]:e/2,u=d?d[1]:r/2,o=ao.interpolateZoom([(i-k.x)/k.k,(u-k.y)/k.k,e/k.k],[(i-t.x)/t.k,(u-t.y)/t.k,e/t.k]);return function(t){var r=o(t),a=e/r[2];this.__chart__=k={x:i-r[0]*a,y:u-r[1]*a,k:a},c(n)}}).each("interrupt.zoom",function(){f(n)}).each("end.zoom",function(){f(n)}):(this.__chart__=k,l(n),c(n),f(n))})},n.translate=function(t){return arguments.length?(k={x:+t[0],y:+t[1],k:k.k},a(),n):[k.x,k.y]},n.scale=function(t){return arguments.length?(k={x:k.x,y:k.y,k:null},i(+t),a(),n):k.k},n.scaleExtent=function(t){return arguments.length?(A=null==t?Jo:[+t[0],+t[1]],n):A},n.center=function(t){return arguments.length?(y=t&&[+t[0],+t[1]],n):y},n.size=function(t){return arguments.length?(E=t&&[+t[0],+t[1]],n):E},n.duration=function(t){return arguments.length?(C=+t,n):C},n.x=function(t){return arguments.length?(b=t,x=t.copy(),k={x:0,y:0,k:1},n):b},n.y=function(t){return arguments.length?(w=t,_=t.copy(),k={x:0,y:0,k:1},n):w},ao.rebind(n,D,"on")};var Bo,Wo,Jo=[0,1/0];ao.color=an,an.prototype.toString=function(){return this.rgb()+""},ao.hsl=ln;var Go=ln.prototype=new an;Go.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),new ln(this.h,this.s,this.l/n)},Go.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),new ln(this.h,this.s,n*this.l)},Go.rgb=function(){return cn(this.h,this.s,this.l)},ao.hcl=fn;var Ko=fn.prototype=new an;Ko.brighter=function(n){return new fn(this.h,this.c,Math.min(100,this.l+Qo*(arguments.length?n:1)))},Ko.darker=function(n){return new fn(this.h,this.c,Math.max(0,this.l-Qo*(arguments.length?n:1)))},Ko.rgb=function(){return sn(this.h,this.c,this.l).rgb()},ao.lab=hn;var Qo=18,na=.95047,ta=1,ea=1.08883,ra=hn.prototype=new an;ra.brighter=function(n){return new hn(Math.min(100,this.l+Qo*(arguments.length?n:1)),this.a,this.b)},ra.darker=function(n){return new hn(Math.max(0,this.l-Qo*(arguments.length?n:1)),this.a,this.b)},ra.rgb=function(){return pn(this.l,this.a,this.b)},ao.rgb=mn;var ia=mn.prototype=new an;ia.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,i=30;return t||e||r?(t&&i>t&&(t=i),e&&i>e&&(e=i),r&&i>r&&(r=i),new mn(Math.min(255,t/n),Math.min(255,e/n),Math.min(255,r/n))):new mn(i,i,i)},ia.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),new mn(n*this.r,n*this.g,n*this.b)},ia.hsl=function(){return wn(this.r,this.g,this.b)},ia.toString=function(){return"#"+bn(this.r)+bn(this.g)+bn(this.b)};var ua=ao.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074});ua.forEach(function(n,t){ua.set(n,Mn(t))}),ao.functor=En,ao.xhr=An(m),ao.dsv=function(n,t){function e(n,e,u){arguments.length<3&&(u=e,e=null);var o=Cn(n,t,null==e?r:i(e),u);return o.row=function(n){return arguments.length?o.response(null==(e=n)?r:i(n)):e},o}function r(n){return e.parse(n.responseText)}function i(n){return function(t){return e.parse(t.responseText,n)}}function u(t){return t.map(o).join(n)}function o(n){return a.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var a=new RegExp('["'+n+"\n]"),l=n.charCodeAt(0);return e.parse=function(n,t){var r;return e.parseRows(n,function(n,e){if(r)return r(n,e-1);var i=new Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");r=t?function(n,e){return t(i(n),e)}:i})},e.parseRows=function(n,t){function e(){if(f>=c)return o;if(i)return i=!1,u;var t=f;if(34===n.charCodeAt(t)){for(var e=t;e++<c;)if(34===n.charCodeAt(e)){if(34!==n.charCodeAt(e+1))break;++e}f=e+2;var r=n.charCodeAt(e+1);return 13===r?(i=!0,10===n.charCodeAt(e+2)&&++f):10===r&&(i=!0),n.slice(t+1,e).replace(/""/g,'"')}for(;c>f;){var r=n.charCodeAt(f++),a=1;if(10===r)i=!0;else if(13===r)i=!0,10===n.charCodeAt(f)&&(++f,++a);else if(r!==l)continue;return n.slice(t,f-a)}return n.slice(t)}for(var r,i,u={},o={},a=[],c=n.length,f=0,s=0;(r=e())!==o;){for(var h=[];r!==u&&r!==o;)h.push(r),r=e();t&&null==(h=t(h,s++))||a.push(h)}return a},e.format=function(t){if(Array.isArray(t[0]))return e.formatRows(t);var r=new y,i=[];return t.forEach(function(n){for(var t in n)r.has(t)||i.push(r.add(t))}),[i.map(o).join(n)].concat(t.map(function(t){return i.map(function(n){return o(t[n])}).join(n)})).join("\n")},e.formatRows=function(n){return n.map(u).join("\n")},e},ao.csv=ao.dsv(",","text/csv"),ao.tsv=ao.dsv("	","text/tab-separated-values");var oa,aa,la,ca,fa=this[x(this,"requestAnimationFrame")]||function(n){setTimeout(n,17)};ao.timer=function(){qn.apply(this,arguments)},ao.timer.flush=function(){Rn(),Dn()},ao.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)};var sa=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"].map(Un);ao.formatPrefix=function(n,t){var e=0;return(n=+n)&&(0>n&&(n*=-1),t&&(n=ao.round(n,Pn(n,t))),e=1+Math.floor(1e-12+Math.log(n)/Math.LN10),e=Math.max(-24,Math.min(24,3*Math.floor((e-1)/3)))),sa[8+e/3]};var ha=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,pa=ao.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=ao.round(n,Pn(n,t))).toFixed(Math.max(0,Math.min(20,Pn(n*(1+1e-15),t))))}}),ga=ao.time={},va=Date;Hn.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){da.setUTCDate.apply(this._,arguments)},setDay:function(){da.setUTCDay.apply(this._,arguments)},setFullYear:function(){da.setUTCFullYear.apply(this._,arguments)},setHours:function(){da.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){da.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){da.setUTCMinutes.apply(this._,arguments)},setMonth:function(){da.setUTCMonth.apply(this._,arguments)},setSeconds:function(){da.setUTCSeconds.apply(this._,arguments)},setTime:function(){da.setTime.apply(this._,arguments)}};var da=Date.prototype;ga.year=On(function(n){return n=ga.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),ga.years=ga.year.range,ga.years.utc=ga.year.utc.range,ga.day=On(function(n){var t=new va(2e3,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),ga.days=ga.day.range,ga.days.utc=ga.day.utc.range,ga.dayOfYear=function(n){var t=ga.year(n);return Math.floor((n-t-6e4*(n.getTimezoneOffset()-t.getTimezoneOffset()))/864e5)},["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].forEach(function(n,t){t=7-t;var e=ga[n]=On(function(n){return(n=ga.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+7*Math.floor(t))},function(n){var e=ga.year(n).getDay();return Math.floor((ga.dayOfYear(n)+(e+t)%7)/7)-(e!==t)});ga[n+"s"]=e.range,ga[n+"s"].utc=e.utc.range,ga[n+"OfYear"]=function(n){var e=ga.year(n).getDay();return Math.floor((ga.dayOfYear(n)+(e+t)%7)/7)}}),ga.week=ga.sunday,ga.weeks=ga.sunday.range,ga.weeks.utc=ga.sunday.utc.range,ga.weekOfYear=ga.sundayOfYear;var ya={"-":"",_:" ",0:"0"},ma=/^\s*\d+/,Ma=/^%/;ao.locale=function(n){return{numberFormat:jn(n),timeFormat:Yn(n)}};var xa=ao.locale({decimal:".",thousands:",",grouping:[3],currency:["$",""],dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});ao.format=xa.numberFormat,ao.geo={},ft.prototype={s:0,t:0,add:function(n){st(n,this.t,ba),st(ba.s,this.s,this),this.s?this.t+=ba.t:this.s=ba.t},reset:function(){this.s=this.t=0},valueOf:function(){return this.s}};var ba=new ft;ao.geo.stream=function(n,t){n&&_a.hasOwnProperty(n.type)?_a[n.type](n,t):ht(n,t)};var _a={Feature:function(n,t){ht(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,r=-1,i=e.length;++r<i;)ht(e[r].geometry,t)}},wa={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)n=e[r],t.point(n[0],n[1],n[2])},LineString:function(n,t){pt(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)pt(e[r],t,0)},Polygon:function(n,t){gt(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)gt(e[r],t)},GeometryCollection:function(n,t){for(var e=n.geometries,r=-1,i=e.length;++r<i;)ht(e[r],t)}};ao.geo.area=function(n){return Sa=0,ao.geo.stream(n,Na),Sa};var Sa,ka=new ft,Na={sphere:function(){Sa+=4*Fo},point:b,lineStart:b,lineEnd:b,polygonStart:function(){ka.reset(),Na.lineStart=vt},polygonEnd:function(){var n=2*ka;Sa+=0>n?4*Fo+n:n,Na.lineStart=Na.lineEnd=Na.point=b}};ao.geo.bounds=function(){function n(n,t){M.push(x=[f=n,h=n]),s>t&&(s=t),t>p&&(p=t)}function t(t,e){var r=dt([t*Yo,e*Yo]);if(y){var i=mt(y,r),u=[i[1],-i[0],0],o=mt(u,i);bt(o),o=_t(o);var l=t-g,c=l>0?1:-1,v=o[0]*Zo*c,d=xo(l)>180;if(d^(v>c*g&&c*t>v)){var m=o[1]*Zo;m>p&&(p=m)}else if(v=(v+360)%360-180,d^(v>c*g&&c*t>v)){var m=-o[1]*Zo;s>m&&(s=m)}else s>e&&(s=e),e>p&&(p=e);d?g>t?a(f,t)>a(f,h)&&(h=t):a(t,h)>a(f,h)&&(f=t):h>=f?(f>t&&(f=t),t>h&&(h=t)):t>g?a(f,t)>a(f,h)&&(h=t):a(t,h)>a(f,h)&&(f=t)}else n(t,e);y=r,g=t}function e(){b.point=t}function r(){x[0]=f,x[1]=h,b.point=n,y=null}function i(n,e){if(y){var r=n-g;m+=xo(r)>180?r+(r>0?360:-360):r}else v=n,d=e;Na.point(n,e),t(n,e)}function u(){Na.lineStart()}function o(){i(v,d),Na.lineEnd(),xo(m)>Uo&&(f=-(h=180)),x[0]=f,x[1]=h,y=null}function a(n,t){return(t-=n)<0?t+360:t}function l(n,t){return n[0]-t[0]}function c(n,t){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var f,s,h,p,g,v,d,y,m,M,x,b={point:n,lineStart:e,lineEnd:r,polygonStart:function(){b.point=i,b.lineStart=u,b.lineEnd=o,m=0,Na.polygonStart()},polygonEnd:function(){Na.polygonEnd(),b.point=n,b.lineStart=e,b.lineEnd=r,0>ka?(f=-(h=180),s=-(p=90)):m>Uo?p=90:-Uo>m&&(s=-90),x[0]=f,x[1]=h}};return function(n){p=h=-(f=s=1/0),M=[],ao.geo.stream(n,b);var t=M.length;if(t){M.sort(l);for(var e,r=1,i=M[0],u=[i];t>r;++r)e=M[r],c(e[0],i)||c(e[1],i)?(a(i[0],e[1])>a(i[0],i[1])&&(i[1]=e[1]),a(e[0],i[1])>a(i[0],i[1])&&(i[0]=e[0])):u.push(i=e);for(var o,e,g=-(1/0),t=u.length-1,r=0,i=u[t];t>=r;i=e,++r)e=u[r],(o=a(i[1],e[0]))>g&&(g=o,f=e[0],h=i[1])}return M=x=null,f===1/0||s===1/0?[[NaN,NaN],[NaN,NaN]]:[[f,s],[h,p]]}}(),ao.geo.centroid=function(n){Ea=Aa=Ca=za=La=qa=Ta=Ra=Da=Pa=Ua=0,ao.geo.stream(n,ja);var t=Da,e=Pa,r=Ua,i=t*t+e*e+r*r;return jo>i&&(t=qa,e=Ta,r=Ra,Uo>Aa&&(t=Ca,e=za,r=La),i=t*t+e*e+r*r,jo>i)?[NaN,NaN]:[Math.atan2(e,t)*Zo,tn(r/Math.sqrt(i))*Zo]};var Ea,Aa,Ca,za,La,qa,Ta,Ra,Da,Pa,Ua,ja={sphere:b,point:St,lineStart:Nt,lineEnd:Et,polygonStart:function(){ja.lineStart=At},polygonEnd:function(){ja.lineStart=Nt}},Fa=Rt(zt,jt,Ht,[-Fo,-Fo/2]),Ha=1e9;ao.geo.clipExtent=function(){var n,t,e,r,i,u,o={stream:function(n){return i&&(i.valid=!1),i=u(n),i.valid=!0,i},extent:function(a){return arguments.length?(u=Zt(n=+a[0][0],t=+a[0][1],e=+a[1][0],r=+a[1][1]),i&&(i.valid=!1,i=null),o):[[n,t],[e,r]]}};return o.extent([[0,0],[960,500]])},(ao.geo.conicEqualArea=function(){return Vt(Xt)}).raw=Xt,ao.geo.albers=function(){return ao.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},ao.geo.albersUsa=function(){function n(n){var u=n[0],o=n[1];return t=null,e(u,o),t||(r(u,o),t)||i(u,o),t}var t,e,r,i,u=ao.geo.albers(),o=ao.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),a=ao.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),l={point:function(n,e){t=[n,e]}};return n.invert=function(n){var t=u.scale(),e=u.translate(),r=(n[0]-e[0])/t,i=(n[1]-e[1])/t;return(i>=.12&&.234>i&&r>=-.425&&-.214>r?o:i>=.166&&.234>i&&r>=-.214&&-.115>r?a:u).invert(n)},n.stream=function(n){var t=u.stream(n),e=o.stream(n),r=a.stream(n);return{point:function(n,i){t.point(n,i),e.point(n,i),r.point(n,i)},sphere:function(){t.sphere(),e.sphere(),r.sphere()},lineStart:function(){t.lineStart(),e.lineStart(),r.lineStart()},lineEnd:function(){t.lineEnd(),e.lineEnd(),r.lineEnd()},polygonStart:function(){t.polygonStart(),e.polygonStart(),r.polygonStart()},polygonEnd:function(){t.polygonEnd(),e.polygonEnd(),r.polygonEnd()}}},n.precision=function(t){return arguments.length?(u.precision(t),o.precision(t),a.precision(t),n):u.precision()},n.scale=function(t){return arguments.length?(u.scale(t),o.scale(.35*t),a.scale(t),n.translate(u.translate())):u.scale()},n.translate=function(t){if(!arguments.length)return u.translate();var c=u.scale(),f=+t[0],s=+t[1];return e=u.translate(t).clipExtent([[f-.455*c,s-.238*c],[f+.455*c,s+.238*c]]).stream(l).point,r=o.translate([f-.307*c,s+.201*c]).clipExtent([[f-.425*c+Uo,s+.12*c+Uo],[f-.214*c-Uo,s+.234*c-Uo]]).stream(l).point,i=a.translate([f-.205*c,s+.212*c]).clipExtent([[f-.214*c+Uo,s+.166*c+Uo],[f-.115*c-Uo,s+.234*c-Uo]]).stream(l).point,n},n.scale(1070)};var Oa,Ia,Ya,Za,Va,Xa,$a={point:b,lineStart:b,lineEnd:b,polygonStart:function(){Ia=0,$a.lineStart=$t},polygonEnd:function(){$a.lineStart=$a.lineEnd=$a.point=b,Oa+=xo(Ia/2)}},Ba={point:Bt,lineStart:b,lineEnd:b,polygonStart:b,polygonEnd:b},Wa={point:Gt,lineStart:Kt,lineEnd:Qt,polygonStart:function(){Wa.lineStart=ne},polygonEnd:function(){Wa.point=Gt,Wa.lineStart=Kt,Wa.lineEnd=Qt}};ao.geo.path=function(){function n(n){return n&&("function"==typeof a&&u.pointRadius(+a.apply(this,arguments)),o&&o.valid||(o=i(u)),ao.geo.stream(n,o)),u.result()}function t(){return o=null,n}var e,r,i,u,o,a=4.5;return n.area=function(n){return Oa=0,ao.geo.stream(n,i($a)),Oa},n.centroid=function(n){return Ca=za=La=qa=Ta=Ra=Da=Pa=Ua=0,ao.geo.stream(n,i(Wa)),Ua?[Da/Ua,Pa/Ua]:Ra?[qa/Ra,Ta/Ra]:La?[Ca/La,za/La]:[NaN,NaN]},n.bounds=function(n){return Va=Xa=-(Ya=Za=1/0),ao.geo.stream(n,i(Ba)),[[Ya,Za],[Va,Xa]]},n.projection=function(n){return arguments.length?(i=(e=n)?n.stream||re(n):m,t()):e},n.context=function(n){return arguments.length?(u=null==(r=n)?new Wt:new te(n),"function"!=typeof a&&u.pointRadius(a),t()):r},n.pointRadius=function(t){return arguments.length?(a="function"==typeof t?t:(u.pointRadius(+t),+t),n):a},n.projection(ao.geo.albersUsa()).context(null)},ao.geo.transform=function(n){return{stream:function(t){var e=new ie(t);for(var r in n)e[r]=n[r];return e}}},ie.prototype={point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}},ao.geo.projection=oe,ao.geo.projectionMutator=ae,(ao.geo.equirectangular=function(){return oe(ce)}).raw=ce.invert=ce,ao.geo.rotation=function(n){function t(t){return t=n(t[0]*Yo,t[1]*Yo),t[0]*=Zo,t[1]*=Zo,t}return n=se(n[0]%360*Yo,n[1]*Yo,n.length>2?n[2]*Yo:0),t.invert=function(t){return t=n.invert(t[0]*Yo,t[1]*Yo),t[0]*=Zo,t[1]*=Zo,t},t},fe.invert=ce,ao.geo.circle=function(){function n(){var n="function"==typeof r?r.apply(this,arguments):r,t=se(-n[0]*Yo,-n[1]*Yo,0).invert,i=[];return e(null,null,1,{point:function(n,e){i.push(n=t(n,e)),n[0]*=Zo,n[1]*=Zo}}),{type:"Polygon",coordinates:[i]}}var t,e,r=[0,0],i=6;return n.origin=function(t){return arguments.length?(r=t,n):r},n.angle=function(r){return arguments.length?(e=ve((t=+r)*Yo,i*Yo),n):t},n.precision=function(r){return arguments.length?(e=ve(t*Yo,(i=+r)*Yo),n):i},n.angle(90)},ao.geo.distance=function(n,t){var e,r=(t[0]-n[0])*Yo,i=n[1]*Yo,u=t[1]*Yo,o=Math.sin(r),a=Math.cos(r),l=Math.sin(i),c=Math.cos(i),f=Math.sin(u),s=Math.cos(u);return Math.atan2(Math.sqrt((e=s*o)*e+(e=c*f-l*s*a)*e),l*f+c*s*a)},ao.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return ao.range(Math.ceil(u/d)*d,i,d).map(h).concat(ao.range(Math.ceil(c/y)*y,l,y).map(p)).concat(ao.range(Math.ceil(r/g)*g,e,g).filter(function(n){return xo(n%d)>Uo}).map(f)).concat(ao.range(Math.ceil(a/v)*v,o,v).filter(function(n){return xo(n%y)>Uo}).map(s))}var e,r,i,u,o,a,l,c,f,s,h,p,g=10,v=g,d=90,y=360,m=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(u).concat(p(l).slice(1),h(i).reverse().slice(1),p(c).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(u=+t[0][0],i=+t[1][0],c=+t[0][1],l=+t[1][1],u>i&&(t=u,u=i,i=t),c>l&&(t=c,c=l,l=t),n.precision(m)):[[u,c],[i,l]]},n.minorExtent=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],a=+t[0][1],o=+t[1][1],r>e&&(t=r,r=e,e=t),a>o&&(t=a,a=o,o=t),n.precision(m)):[[r,a],[e,o]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(d=+t[0],y=+t[1],n):[d,y]},n.minorStep=function(t){return arguments.length?(g=+t[0],v=+t[1],n):[g,v]},n.precision=function(t){return arguments.length?(m=+t,f=ye(a,o,90),s=me(r,e,m),h=ye(c,l,90),p=me(u,i,m),n):m},n.majorExtent([[-180,-90+Uo],[180,90-Uo]]).minorExtent([[-180,-80-Uo],[180,80+Uo]])},ao.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),e||i.apply(this,arguments)]}}var t,e,r=Me,i=xe;return n.distance=function(){return ao.geo.distance(t||r.apply(this,arguments),e||i.apply(this,arguments))},n.source=function(e){return arguments.length?(r=e,t="function"==typeof e?null:e,n):r},n.target=function(t){return arguments.length?(i=t,e="function"==typeof t?null:t,n):i},n.precision=function(){return arguments.length?n:0},n},ao.geo.interpolate=function(n,t){return be(n[0]*Yo,n[1]*Yo,t[0]*Yo,t[1]*Yo)},ao.geo.length=function(n){return Ja=0,ao.geo.stream(n,Ga),Ja};var Ja,Ga={sphere:b,point:b,lineStart:_e,lineEnd:b,polygonStart:b,polygonEnd:b},Ka=we(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(ao.geo.azimuthalEqualArea=function(){return oe(Ka)}).raw=Ka;var Qa=we(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},m);(ao.geo.azimuthalEquidistant=function(){return oe(Qa)}).raw=Qa,(ao.geo.conicConformal=function(){return Vt(Se)}).raw=Se,(ao.geo.conicEquidistant=function(){return Vt(ke)}).raw=ke;var nl=we(function(n){return 1/n},Math.atan);(ao.geo.gnomonic=function(){return oe(nl)}).raw=nl,Ne.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Io]},(ao.geo.mercator=function(){return Ee(Ne)}).raw=Ne;var tl=we(function(){return 1},Math.asin);(ao.geo.orthographic=function(){return oe(tl)}).raw=tl;var el=we(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(ao.geo.stereographic=function(){return oe(el)}).raw=el,Ae.invert=function(n,t){return[-t,2*Math.atan(Math.exp(n))-Io]},(ao.geo.transverseMercator=function(){var n=Ee(Ae),t=n.center,e=n.rotate;return n.center=function(n){return n?t([-n[1],n[0]]):(n=t(),[n[1],-n[0]])},n.rotate=function(n){return n?e([n[0],n[1],n.length>2?n[2]+90:90]):(n=e(),[n[0],n[1],n[2]-90])},e([0,0,90])}).raw=Ae,ao.geom={},ao.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,i=En(e),u=En(r),o=n.length,a=[],l=[];for(t=0;o>t;t++)a.push([+i.call(this,n[t],t),+u.call(this,n[t],t),t]);for(a.sort(qe),t=0;o>t;t++)l.push([a[t][0],-a[t][1]]);var c=Le(a),f=Le(l),s=f[0]===c[0],h=f[f.length-1]===c[c.length-1],p=[];for(t=c.length-1;t>=0;--t)p.push(n[a[c[t]][2]]);for(t=+s;t<f.length-h;++t)p.push(n[a[f[t]][2]]);return p}var e=Ce,r=ze;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t)},ao.geom.polygon=function(n){return ko(n,rl),n};var rl=ao.geom.polygon.prototype=[];rl.area=function(){for(var n,t=-1,e=this.length,r=this[e-1],i=0;++t<e;)n=r,r=this[t],i+=n[1]*r[0]-n[0]*r[1];return.5*i},rl.centroid=function(n){var t,e,r=-1,i=this.length,u=0,o=0,a=this[i-1];for(arguments.length||(n=-1/(6*this.area()));++r<i;)t=a,a=this[r],e=t[0]*a[1]-a[0]*t[1],u+=(t[0]+a[0])*e,o+=(t[1]+a[1])*e;return[u*n,o*n]},rl.clip=function(n){for(var t,e,r,i,u,o,a=De(n),l=-1,c=this.length-De(this),f=this[c-1];++l<c;){for(t=n.slice(),n.length=0,i=this[l],u=t[(r=t.length-a)-1],e=-1;++e<r;)o=t[e],Te(o,f,i)?(Te(u,f,i)||n.push(Re(u,o,f,i)),n.push(o)):Te(u,f,i)&&n.push(Re(u,o,f,i)),u=o;a&&n.push(n[0]),f=i}return n};var il,ul,ol,al,ll,cl=[],fl=[];Ye.prototype.prepare=function(){for(var n,t=this.edges,e=t.length;e--;)n=t[e].edge,n.b&&n.a||t.splice(e,1);return t.sort(Ve),t.length},tr.prototype={start:function(){return this.edge.l===this.site?this.edge.a:this.edge.b},end:function(){return this.edge.l===this.site?this.edge.b:this.edge.a}},er.prototype={insert:function(n,t){var e,r,i;if(n){if(t.P=n,t.N=n.N,n.N&&(n.N.P=t),n.N=t,n.R){for(n=n.R;n.L;)n=n.L;n.L=t}else n.R=t;e=n}else this._?(n=or(this._),t.P=null,t.N=n,n.P=n.L=t,e=n):(t.P=t.N=null,this._=t,e=null);for(t.L=t.R=null,t.U=e,t.C=!0,n=t;e&&e.C;)r=e.U,e===r.L?(i=r.R,i&&i.C?(e.C=i.C=!1,r.C=!0,n=r):(n===e.R&&(ir(this,e),n=e,e=n.U),e.C=!1,r.C=!0,ur(this,r))):(i=r.L,i&&i.C?(e.C=i.C=!1,r.C=!0,n=r):(n===e.L&&(ur(this,e),n=e,e=n.U),e.C=!1,r.C=!0,ir(this,r))),e=n.U;this._.C=!1},remove:function(n){n.N&&(n.N.P=n.P),n.P&&(n.P.N=n.N),n.N=n.P=null;var t,e,r,i=n.U,u=n.L,o=n.R;if(e=u?o?or(o):u:o,i?i.L===n?i.L=e:i.R=e:this._=e,u&&o?(r=e.C,e.C=n.C,e.L=u,u.U=e,e!==o?(i=e.U,e.U=n.U,n=e.R,i.L=n,e.R=o,o.U=e):(e.U=i,i=e,n=e.R)):(r=n.C,n=e),n&&(n.U=i),!r){if(n&&n.C)return void(n.C=!1);do{if(n===this._)break;if(n===i.L){if(t=i.R,t.C&&(t.C=!1,i.C=!0,ir(this,i),t=i.R),t.L&&t.L.C||t.R&&t.R.C){t.R&&t.R.C||(t.L.C=!1,t.C=!0,ur(this,t),t=i.R),t.C=i.C,i.C=t.R.C=!1,ir(this,i),n=this._;break}}else if(t=i.L,t.C&&(t.C=!1,i.C=!0,ur(this,i),t=i.L),t.L&&t.L.C||t.R&&t.R.C){t.L&&t.L.C||(t.R.C=!1,t.C=!0,ir(this,t),t=i.L),t.C=i.C,i.C=t.L.C=!1,ur(this,i),n=this._;break}t.C=!0,n=i,i=i.U}while(!n.C);n&&(n.C=!1)}}},ao.geom.voronoi=function(n){function t(n){var t=new Array(n.length),r=a[0][0],i=a[0][1],u=a[1][0],o=a[1][1];return ar(e(n),a).cells.forEach(function(e,a){var l=e.edges,c=e.site,f=t[a]=l.length?l.map(function(n){var t=n.start();return[t.x,t.y]}):c.x>=r&&c.x<=u&&c.y>=i&&c.y<=o?[[r,o],[u,o],[u,i],[r,i]]:[];f.point=n[a]}),t}function e(n){return n.map(function(n,t){return{x:Math.round(u(n,t)/Uo)*Uo,y:Math.round(o(n,t)/Uo)*Uo,i:t}})}var r=Ce,i=ze,u=r,o=i,a=sl;return n?t(n):(t.links=function(n){return ar(e(n)).edges.filter(function(n){return n.l&&n.r}).map(function(t){return{source:n[t.l.i],target:n[t.r.i]}})},t.triangles=function(n){var t=[];return ar(e(n)).cells.forEach(function(e,r){for(var i,u,o=e.site,a=e.edges.sort(Ve),l=-1,c=a.length,f=a[c-1].edge,s=f.l===o?f.r:f.l;++l<c;)i=f,u=s,f=a[l].edge,s=f.l===o?f.r:f.l,r<u.i&&r<s.i&&cr(o,u,s)<0&&t.push([n[r],n[u.i],n[s.i]])}),t},t.x=function(n){return arguments.length?(u=En(r=n),t):r},t.y=function(n){return arguments.length?(o=En(i=n),t):i},t.clipExtent=function(n){return arguments.length?(a=null==n?sl:n,t):a===sl?null:a},t.size=function(n){return arguments.length?t.clipExtent(n&&[[0,0],n]):a===sl?null:a&&a[1]},t)};var sl=[[-1e6,-1e6],[1e6,1e6]];ao.geom.delaunay=function(n){return ao.geom.voronoi().triangles(n)},ao.geom.quadtree=function(n,t,e,r,i){function u(n){function u(n,t,e,r,i,u,o,a){if(!isNaN(e)&&!isNaN(r))if(n.leaf){var l=n.x,f=n.y;if(null!=l)if(xo(l-e)+xo(f-r)<.01)c(n,t,e,r,i,u,o,a);else{var s=n.point;n.x=n.y=n.point=null,c(n,s,l,f,i,u,o,a),c(n,t,e,r,i,u,o,a)}else n.x=e,n.y=r,n.point=t}else c(n,t,e,r,i,u,o,a)}function c(n,t,e,r,i,o,a,l){var c=.5*(i+a),f=.5*(o+l),s=e>=c,h=r>=f,p=h<<1|s;n.leaf=!1,n=n.nodes[p]||(n.nodes[p]=hr()),s?i=c:a=c,h?o=f:l=f,u(n,t,e,r,i,o,a,l)}var f,s,h,p,g,v,d,y,m,M=En(a),x=En(l);if(null!=t)v=t,d=e,y=r,m=i;else if(y=m=-(v=d=1/0),s=[],h=[],g=n.length,o)for(p=0;g>p;++p)f=n[p],f.x<v&&(v=f.x),f.y<d&&(d=f.y),f.x>y&&(y=f.x),f.y>m&&(m=f.y),s.push(f.x),h.push(f.y);else for(p=0;g>p;++p){var b=+M(f=n[p],p),_=+x(f,p);v>b&&(v=b),d>_&&(d=_),b>y&&(y=b),_>m&&(m=_),s.push(b),h.push(_)}var w=y-v,S=m-d;w>S?m=d+w:y=v+S;var k=hr();if(k.add=function(n){u(k,n,+M(n,++p),+x(n,p),v,d,y,m)},k.visit=function(n){pr(n,k,v,d,y,m)},k.find=function(n){return gr(k,n[0],n[1],v,d,y,m)},p=-1,null==t){for(;++p<g;)u(k,n[p],s[p],h[p],v,d,y,m);--p}else n.forEach(k.add);return s=h=n=f=null,k}var o,a=Ce,l=ze;return(o=arguments.length)?(a=fr,l=sr,3===o&&(i=e,r=t,e=t=0),u(n)):(u.x=function(n){return arguments.length?(a=n,u):a},u.y=function(n){return arguments.length?(l=n,u):l},u.extent=function(n){return arguments.length?(null==n?t=e=r=i=null:(t=+n[0][0],e=+n[0][1],r=+n[1][0],i=+n[1][1]),u):null==t?null:[[t,e],[r,i]]},u.size=function(n){return arguments.length?(null==n?t=e=r=i=null:(t=e=0,r=+n[0],i=+n[1]),u):null==t?null:[r-t,i-e]},u)},ao.interpolateRgb=vr,ao.interpolateObject=dr,ao.interpolateNumber=yr,ao.interpolateString=mr;var hl=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,pl=new RegExp(hl.source,"g");ao.interpolate=Mr,ao.interpolators=[function(n,t){var e=typeof t;return("string"===e?ua.has(t.toLowerCase())||/^(#|rgb\(|hsl\()/i.test(t)?vr:mr:t instanceof an?vr:Array.isArray(t)?xr:"object"===e&&isNaN(t)?dr:yr)(n,t)}],ao.interpolateArray=xr;var gl=function(){return m},vl=ao.map({linear:gl,poly:Er,quad:function(){return Sr},cubic:function(){return kr},sin:function(){return Ar},exp:function(){return Cr},circle:function(){return zr},elastic:Lr,back:qr,bounce:function(){return Tr}}),dl=ao.map({"in":m,out:_r,"in-out":wr,"out-in":function(n){return wr(_r(n))}});ao.ease=function(n){var t=n.indexOf("-"),e=t>=0?n.slice(0,t):n,r=t>=0?n.slice(t+1):"in";return e=vl.get(e)||gl,r=dl.get(r)||m,br(r(e.apply(null,lo.call(arguments,1))))},ao.interpolateHcl=Rr,ao.interpolateHsl=Dr,ao.interpolateLab=Pr,ao.interpolateRound=Ur,ao.transform=function(n){var t=fo.createElementNS(ao.ns.prefix.svg,"g");return(ao.transform=function(n){if(null!=n){t.setAttribute("transform",n);var e=t.transform.baseVal.consolidate()}return new jr(e?e.matrix:yl)})(n)},jr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var yl={a:1,b:0,c:0,d:1,e:0,f:0};ao.interpolateTransform=$r,ao.layout={},ao.layout.bundle=function(){return function(n){for(var t=[],e=-1,r=n.length;++e<r;)t.push(Jr(n[e]));return t}},ao.layout.chord=function(){function n(){var n,c,s,h,p,g={},v=[],d=ao.range(u),y=[];for(e=[],r=[],n=0,h=-1;++h<u;){for(c=0,p=-1;++p<u;)c+=i[h][p];v.push(c),y.push(ao.range(u)),n+=c}for(o&&d.sort(function(n,t){return o(v[n],v[t])}),a&&y.forEach(function(n,t){n.sort(function(n,e){return a(i[t][n],i[t][e])})}),n=(Ho-f*u)/n,c=0,h=-1;++h<u;){for(s=c,p=-1;++p<u;){var m=d[h],M=y[m][p],x=i[m][M],b=c,_=c+=x*n;g[m+"-"+M]={index:m,subindex:M,startAngle:b,endAngle:_,value:x}}r[m]={index:m,startAngle:s,endAngle:c,value:v[m]},c+=f}for(h=-1;++h<u;)for(p=h-1;++p<u;){var w=g[h+"-"+p],S=g[p+"-"+h];(w.value||S.value)&&e.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}l&&t()}function t(){e.sort(function(n,t){return l((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var e,r,i,u,o,a,l,c={},f=0;return c.matrix=function(n){return arguments.length?(u=(i=n)&&i.length,e=r=null,c):i},c.padding=function(n){return arguments.length?(f=n,e=r=null,c):f},c.sortGroups=function(n){return arguments.length?(o=n,e=r=null,c):o},c.sortSubgroups=function(n){return arguments.length?(a=n,e=null,c):a},c.sortChords=function(n){return arguments.length?(l=n,e&&t(),c):l},c.chords=function(){return e||n(),e},c.groups=function(){return r||n(),r},c},ao.layout.force=function(){function n(n){return function(t,e,r,i){if(t.point!==n){var u=t.cx-n.x,o=t.cy-n.y,a=i-e,l=u*u+o*o;if(l>a*a/y){if(v>l){var c=t.charge/l;n.px-=u*c,n.py-=o*c}return!0}if(t.point&&l&&v>l){var c=t.pointCharge/l;n.px-=u*c,n.py-=o*c}}return!t.charge}}function t(n){n.px=ao.event.x,n.py=ao.event.y,l.resume()}var e,r,i,u,o,a,l={},c=ao.dispatch("start","tick","end"),f=[1,1],s=.9,h=ml,p=Ml,g=-30,v=xl,d=.1,y=.64,M=[],x=[];return l.tick=function(){if((i*=.99)<.005)return e=null,c.end({type:"end",alpha:i=0}),!0;var t,r,l,h,p,v,y,m,b,_=M.length,w=x.length;for(r=0;w>r;++r)l=x[r],h=l.source,p=l.target,m=p.x-h.x,b=p.y-h.y,(v=m*m+b*b)&&(v=i*o[r]*((v=Math.sqrt(v))-u[r])/v,m*=v,b*=v,p.x-=m*(y=h.weight+p.weight?h.weight/(h.weight+p.weight):.5),p.y-=b*y,h.x+=m*(y=1-y),h.y+=b*y);if((y=i*d)&&(m=f[0]/2,b=f[1]/2,r=-1,y))for(;++r<_;)l=M[r],l.x+=(m-l.x)*y,l.y+=(b-l.y)*y;if(g)for(ri(t=ao.geom.quadtree(M),i,a),r=-1;++r<_;)(l=M[r]).fixed||t.visit(n(l));for(r=-1;++r<_;)l=M[r],l.fixed?(l.x=l.px,l.y=l.py):(l.x-=(l.px-(l.px=l.x))*s,l.y-=(l.py-(l.py=l.y))*s);c.tick({type:"tick",alpha:i})},l.nodes=function(n){return arguments.length?(M=n,l):M},l.links=function(n){return arguments.length?(x=n,l):x},l.size=function(n){return arguments.length?(f=n,l):f},l.linkDistance=function(n){return arguments.length?(h="function"==typeof n?n:+n,l):h},l.distance=l.linkDistance,l.linkStrength=function(n){return arguments.length?(p="function"==typeof n?n:+n,l):p},l.friction=function(n){return arguments.length?(s=+n,l):s},l.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,l):g},l.chargeDistance=function(n){return arguments.length?(v=n*n,l):Math.sqrt(v)},l.gravity=function(n){return arguments.length?(d=+n,l):d},l.theta=function(n){return arguments.length?(y=n*n,l):Math.sqrt(y)},l.alpha=function(n){return arguments.length?(n=+n,i?n>0?i=n:(e.c=null,e.t=NaN,e=null,c.end({type:"end",alpha:i=0})):n>0&&(c.start({type:"start",alpha:i=n}),e=qn(l.tick)),l):i},l.start=function(){function n(n,r){if(!e){for(e=new Array(i),l=0;i>l;++l)e[l]=[];for(l=0;c>l;++l){var u=x[l];e[u.source.index].push(u.target),e[u.target.index].push(u.source)}}for(var o,a=e[t],l=-1,f=a.length;++l<f;)if(!isNaN(o=a[l][n]))return o;return Math.random()*r}var t,e,r,i=M.length,c=x.length,s=f[0],v=f[1];for(t=0;i>t;++t)(r=M[t]).index=t,r.weight=0;for(t=0;c>t;++t)r=x[t],"number"==typeof r.source&&(r.source=M[r.source]),"number"==typeof r.target&&(r.target=M[r.target]),++r.source.weight,++r.target.weight;for(t=0;i>t;++t)r=M[t],isNaN(r.x)&&(r.x=n("x",s)),isNaN(r.y)&&(r.y=n("y",v)),isNaN(r.px)&&(r.px=r.x),isNaN(r.py)&&(r.py=r.y);if(u=[],"function"==typeof h)for(t=0;c>t;++t)u[t]=+h.call(this,x[t],t);else for(t=0;c>t;++t)u[t]=h;if(o=[],"function"==typeof p)for(t=0;c>t;++t)o[t]=+p.call(this,x[t],t);else for(t=0;c>t;++t)o[t]=p;if(a=[],"function"==typeof g)for(t=0;i>t;++t)a[t]=+g.call(this,M[t],t);else for(t=0;i>t;++t)a[t]=g;return l.resume()},l.resume=function(){return l.alpha(.1)},l.stop=function(){return l.alpha(0)},l.drag=function(){return r||(r=ao.behavior.drag().origin(m).on("dragstart.force",Qr).on("drag.force",t).on("dragend.force",ni)),arguments.length?void this.on("mouseover.force",ti).on("mouseout.force",ei).call(r):r},ao.rebind(l,c,"on")};var ml=20,Ml=1,xl=1/0;ao.layout.hierarchy=function(){function n(i){var u,o=[i],a=[];for(i.depth=0;null!=(u=o.pop());)if(a.push(u),(c=e.call(n,u,u.depth))&&(l=c.length)){for(var l,c,f;--l>=0;)o.push(f=c[l]),f.parent=u,f.depth=u.depth+1;r&&(u.value=0),u.children=c}else r&&(u.value=+r.call(n,u,u.depth)||0),delete u.children;return oi(i,function(n){var e,i;t&&(e=n.children)&&e.sort(t),r&&(i=n.parent)&&(i.value+=n.value)}),a}var t=ci,e=ai,r=li;return n.sort=function(e){return arguments.length?(t=e,n):t},n.children=function(t){return arguments.length?(e=t,n):e},n.value=function(t){return arguments.length?(r=t,n):r},n.revalue=function(t){return r&&(ui(t,function(n){n.children&&(n.value=0)}),oi(t,function(t){var e;t.children||(t.value=+r.call(n,t,t.depth)||0),(e=t.parent)&&(e.value+=t.value)})),t},n},ao.layout.partition=function(){function n(t,e,r,i){var u=t.children;if(t.x=e,t.y=t.depth*i,t.dx=r,t.dy=i,u&&(o=u.length)){var o,a,l,c=-1;for(r=t.value?r/t.value:0;++c<o;)n(a=u[c],e,l=a.value*r,i),e+=l}}function t(n){var e=n.children,r=0;if(e&&(i=e.length))for(var i,u=-1;++u<i;)r=Math.max(r,t(e[u]));return 1+r}function e(e,u){var o=r.call(this,e,u);return n(o[0],0,i[0],i[1]/t(o[0])),o}var r=ao.layout.hierarchy(),i=[1,1];return e.size=function(n){return arguments.length?(i=n,e):i},ii(e,r)},ao.layout.pie=function(){function n(o){var a,l=o.length,c=o.map(function(e,r){return+t.call(n,e,r)}),f=+("function"==typeof r?r.apply(this,arguments):r),s=("function"==typeof i?i.apply(this,arguments):i)-f,h=Math.min(Math.abs(s)/l,+("function"==typeof u?u.apply(this,arguments):u)),p=h*(0>s?-1:1),g=ao.sum(c),v=g?(s-l*p)/g:0,d=ao.range(l),y=[];return null!=e&&d.sort(e===bl?function(n,t){return c[t]-c[n]}:function(n,t){return e(o[n],o[t])}),d.forEach(function(n){y[n]={data:o[n],value:a=c[n],startAngle:f,endAngle:f+=a*v+p,padAngle:h}}),y}var t=Number,e=bl,r=0,i=Ho,u=0;return n.value=function(e){return arguments.length?(t=e,n):t},n.sort=function(t){return arguments.length?(e=t,n):e},n.startAngle=function(t){return arguments.length?(r=t,n):r},n.endAngle=function(t){return arguments.length?(i=t,n):i},n.padAngle=function(t){return arguments.length?(u=t,n):u},n};var bl={};ao.layout.stack=function(){function n(a,l){if(!(h=a.length))return a;var c=a.map(function(e,r){return t.call(n,e,r)}),f=c.map(function(t){return t.map(function(t,e){return[u.call(n,t,e),o.call(n,t,e)]})}),s=e.call(n,f,l);c=ao.permute(c,s),f=ao.permute(f,s);var h,p,g,v,d=r.call(n,f,l),y=c[0].length;for(g=0;y>g;++g)for(i.call(n,c[0][g],v=d[g],f[0][g][1]),p=1;h>p;++p)i.call(n,c[p][g],v+=f[p-1][g][1],f[p][g][1]);return a}var t=m,e=gi,r=vi,i=pi,u=si,o=hi;return n.values=function(e){return arguments.length?(t=e,n):t},n.order=function(t){return arguments.length?(e="function"==typeof t?t:_l.get(t)||gi,n):e},n.offset=function(t){return arguments.length?(r="function"==typeof t?t:wl.get(t)||vi,n):r},n.x=function(t){return arguments.length?(u=t,n):u},n.y=function(t){return arguments.length?(o=t,n):o},n.out=function(t){return arguments.length?(i=t,n):i},n};var _l=ao.map({"inside-out":function(n){var t,e,r=n.length,i=n.map(di),u=n.map(yi),o=ao.range(r).sort(function(n,t){return i[n]-i[t]}),a=0,l=0,c=[],f=[];for(t=0;r>t;++t)e=o[t],l>a?(a+=u[e],c.push(e)):(l+=u[e],f.push(e));return f.reverse().concat(c)},reverse:function(n){return ao.range(n.length).reverse()},"default":gi}),wl=ao.map({silhouette:function(n){var t,e,r,i=n.length,u=n[0].length,o=[],a=0,l=[];for(e=0;u>e;++e){for(t=0,r=0;i>t;t++)r+=n[t][e][1];r>a&&(a=r),o.push(r)}for(e=0;u>e;++e)l[e]=(a-o[e])/2;return l},wiggle:function(n){var t,e,r,i,u,o,a,l,c,f=n.length,s=n[0],h=s.length,p=[];for(p[0]=l=c=0,e=1;h>e;++e){for(t=0,i=0;f>t;++t)i+=n[t][e][1];for(t=0,u=0,a=s[e][0]-s[e-1][0];f>t;++t){for(r=0,o=(n[t][e][1]-n[t][e-1][1])/(2*a);t>r;++r)o+=(n[r][e][1]-n[r][e-1][1])/a;u+=o*n[t][e][1]}p[e]=l-=i?u/i*a:0,c>l&&(c=l)}for(e=0;h>e;++e)p[e]-=c;return p},expand:function(n){var t,e,r,i=n.length,u=n[0].length,o=1/i,a=[];for(e=0;u>e;++e){for(t=0,r=0;i>t;t++)r+=n[t][e][1];if(r)for(t=0;i>t;t++)n[t][e][1]/=r;else for(t=0;i>t;t++)n[t][e][1]=o}for(e=0;u>e;++e)a[e]=0;return a},zero:vi});ao.layout.histogram=function(){function n(n,u){for(var o,a,l=[],c=n.map(e,this),f=r.call(this,c,u),s=i.call(this,f,c,u),u=-1,h=c.length,p=s.length-1,g=t?1:1/h;++u<p;)o=l[u]=[],o.dx=s[u+1]-(o.x=s[u]),o.y=0;if(p>0)for(u=-1;++u<h;)a=c[u],a>=f[0]&&a<=f[1]&&(o=l[ao.bisect(s,a,1,p)-1],o.y+=g,o.push(n[u]));return l}var t=!0,e=Number,r=bi,i=Mi;return n.value=function(t){return arguments.length?(e=t,n):e},n.range=function(t){return arguments.length?(r=En(t),n):r},n.bins=function(t){return arguments.length?(i="number"==typeof t?function(n){return xi(n,t)}:En(t),n):i},n.frequency=function(e){return arguments.length?(t=!!e,n):t},n},ao.layout.pack=function(){function n(n,u){var o=e.call(this,n,u),a=o[0],l=i[0],c=i[1],f=null==t?Math.sqrt:"function"==typeof t?t:function(){return t};if(a.x=a.y=0,oi(a,function(n){n.r=+f(n.value)}),oi(a,Ni),r){var s=r*(t?1:Math.max(2*a.r/l,2*a.r/c))/2;oi(a,function(n){n.r+=s}),oi(a,Ni),oi(a,function(n){n.r-=s})}return Ci(a,l/2,c/2,t?1:1/Math.max(2*a.r/l,2*a.r/c)),o}var t,e=ao.layout.hierarchy().sort(_i),r=0,i=[1,1];return n.size=function(t){return arguments.length?(i=t,n):i},n.radius=function(e){return arguments.length?(t=null==e||"function"==typeof e?e:+e,n):t},n.padding=function(t){return arguments.length?(r=+t,n):r},ii(n,e)},ao.layout.tree=function(){function n(n,i){var f=o.call(this,n,i),s=f[0],h=t(s);if(oi(h,e),h.parent.m=-h.z,ui(h,r),c)ui(s,u);else{var p=s,g=s,v=s;ui(s,function(n){n.x<p.x&&(p=n),n.x>g.x&&(g=n),n.depth>v.depth&&(v=n)});var d=a(p,g)/2-p.x,y=l[0]/(g.x+a(g,p)/2+d),m=l[1]/(v.depth||1);ui(s,function(n){n.x=(n.x+d)*y,n.y=n.depth*m})}return f}function t(n){for(var t,e={A:null,children:[n]},r=[e];null!=(t=r.pop());)for(var i,u=t.children,o=0,a=u.length;a>o;++o)r.push((u[o]=i={_:u[o],parent:t,children:(i=u[o].children)&&i.slice()||[],A:null,a:null,z:0,m:0,c:0,s:0,t:null,i:o}).a=i);return e.children[0]}function e(n){var t=n.children,e=n.parent.children,r=n.i?e[n.i-1]:null;if(t.length){Di(n);var u=(t[0].z+t[t.length-1].z)/2;r?(n.z=r.z+a(n._,r._),n.m=n.z-u):n.z=u}else r&&(n.z=r.z+a(n._,r._));n.parent.A=i(n,r,n.parent.A||e[0])}function r(n){n._.x=n.z+n.parent.m,n.m+=n.parent.m}function i(n,t,e){if(t){for(var r,i=n,u=n,o=t,l=i.parent.children[0],c=i.m,f=u.m,s=o.m,h=l.m;o=Ti(o),i=qi(i),o&&i;)l=qi(l),u=Ti(u),u.a=n,r=o.z+s-i.z-c+a(o._,i._),r>0&&(Ri(Pi(o,n,e),n,r),c+=r,f+=r),s+=o.m,c+=i.m,h+=l.m,f+=u.m;o&&!Ti(u)&&(u.t=o,u.m+=s-f),i&&!qi(l)&&(l.t=i,l.m+=c-h,e=n)}return e}function u(n){n.x*=l[0],n.y=n.depth*l[1]}var o=ao.layout.hierarchy().sort(null).value(null),a=Li,l=[1,1],c=null;return n.separation=function(t){return arguments.length?(a=t,n):a},n.size=function(t){return arguments.length?(c=null==(l=t)?u:null,n):c?null:l},n.nodeSize=function(t){return arguments.length?(c=null==(l=t)?null:u,n):c?l:null},ii(n,o)},ao.layout.cluster=function(){function n(n,u){var o,a=t.call(this,n,u),l=a[0],c=0;oi(l,function(n){var t=n.children;t&&t.length?(n.x=ji(t),n.y=Ui(t)):(n.x=o?c+=e(n,o):0,n.y=0,o=n)});var f=Fi(l),s=Hi(l),h=f.x-e(f,s)/2,p=s.x+e(s,f)/2;return oi(l,i?function(n){n.x=(n.x-l.x)*r[0],n.y=(l.y-n.y)*r[1]}:function(n){n.x=(n.x-h)/(p-h)*r[0],n.y=(1-(l.y?n.y/l.y:1))*r[1]}),a}var t=ao.layout.hierarchy().sort(null).value(null),e=Li,r=[1,1],i=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(i=null==(r=t),n):i?null:r},n.nodeSize=function(t){return arguments.length?(i=null!=(r=t),n):i?r:null},ii(n,t)},ao.layout.treemap=function(){function n(n,t){for(var e,r,i=-1,u=n.length;++i<u;)r=(e=n[i]).value*(0>t?0:t),e.area=isNaN(r)||0>=r?0:r}function t(e){var u=e.children;if(u&&u.length){var o,a,l,c=s(e),f=[],h=u.slice(),g=1/0,v="slice"===p?c.dx:"dice"===p?c.dy:"slice-dice"===p?1&e.depth?c.dy:c.dx:Math.min(c.dx,c.dy);for(n(h,c.dx*c.dy/e.value),f.area=0;(l=h.length)>0;)f.push(o=h[l-1]),f.area+=o.area,"squarify"!==p||(a=r(f,v))<=g?(h.pop(),g=a):(f.area-=f.pop().area,i(f,v,c,!1),v=Math.min(c.dx,c.dy),f.length=f.area=0,g=1/0);f.length&&(i(f,v,c,!0),f.length=f.area=0),u.forEach(t)}}function e(t){var r=t.children;if(r&&r.length){var u,o=s(t),a=r.slice(),l=[];for(n(a,o.dx*o.dy/t.value),l.area=0;u=a.pop();)l.push(u),l.area+=u.area,null!=u.z&&(i(l,u.z?o.dx:o.dy,o,!a.length),l.length=l.area=0);r.forEach(e)}}function r(n,t){for(var e,r=n.area,i=0,u=1/0,o=-1,a=n.length;++o<a;)(e=n[o].area)&&(u>e&&(u=e),e>i&&(i=e));return r*=r,t*=t,r?Math.max(t*i*g/r,r/(t*u*g)):1/0}function i(n,t,e,r){var i,u=-1,o=n.length,a=e.x,c=e.y,f=t?l(n.area/t):0;
  if(t==e.dx){for((r||f>e.dy)&&(f=e.dy);++u<o;)i=n[u],i.x=a,i.y=c,i.dy=f,a+=i.dx=Math.min(e.x+e.dx-a,f?l(i.area/f):0);i.z=!0,i.dx+=e.x+e.dx-a,e.y+=f,e.dy-=f}else{for((r||f>e.dx)&&(f=e.dx);++u<o;)i=n[u],i.x=a,i.y=c,i.dx=f,c+=i.dy=Math.min(e.y+e.dy-c,f?l(i.area/f):0);i.z=!1,i.dy+=e.y+e.dy-c,e.x+=f,e.dx-=f}}function u(r){var i=o||a(r),u=i[0];return u.x=u.y=0,u.value?(u.dx=c[0],u.dy=c[1]):u.dx=u.dy=0,o&&a.revalue(u),n([u],u.dx*u.dy/u.value),(o?e:t)(u),h&&(o=i),i}var o,a=ao.layout.hierarchy(),l=Math.round,c=[1,1],f=null,s=Oi,h=!1,p="squarify",g=.5*(1+Math.sqrt(5));return u.size=function(n){return arguments.length?(c=n,u):c},u.padding=function(n){function t(t){var e=n.call(u,t,t.depth);return null==e?Oi(t):Ii(t,"number"==typeof e?[e,e,e,e]:e)}function e(t){return Ii(t,n)}if(!arguments.length)return f;var r;return s=null==(f=n)?Oi:"function"==(r=typeof n)?t:"number"===r?(n=[n,n,n,n],e):e,u},u.round=function(n){return arguments.length?(l=n?Math.round:Number,u):l!=Number},u.sticky=function(n){return arguments.length?(h=n,o=null,u):h},u.ratio=function(n){return arguments.length?(g=n,u):g},u.mode=function(n){return arguments.length?(p=n+"",u):p},ii(u,a)},ao.random={normal:function(n,t){var e=arguments.length;return 2>e&&(t=1),1>e&&(n=0),function(){var e,r,i;do e=2*Math.random()-1,r=2*Math.random()-1,i=e*e+r*r;while(!i||i>1);return n+t*e*Math.sqrt(-2*Math.log(i)/i)}},logNormal:function(){var n=ao.random.normal.apply(ao,arguments);return function(){return Math.exp(n())}},bates:function(n){var t=ao.random.irwinHall(n);return function(){return t()/n}},irwinHall:function(n){return function(){for(var t=0,e=0;n>e;e++)t+=Math.random();return t}}},ao.scale={};var Sl={floor:m,ceil:m};ao.scale.linear=function(){return Wi([0,1],[0,1],Mr,!1)};var kl={s:1,g:1,p:1,r:1,e:1};ao.scale.log=function(){return ru(ao.scale.linear().domain([0,1]),10,!0,[1,10])};var Nl=ao.format(".0e"),El={floor:function(n){return-Math.ceil(-n)},ceil:function(n){return-Math.floor(-n)}};ao.scale.pow=function(){return iu(ao.scale.linear(),1,[0,1])},ao.scale.sqrt=function(){return ao.scale.pow().exponent(.5)},ao.scale.ordinal=function(){return ou([],{t:"range",a:[[]]})},ao.scale.category10=function(){return ao.scale.ordinal().range(Al)},ao.scale.category20=function(){return ao.scale.ordinal().range(Cl)},ao.scale.category20b=function(){return ao.scale.ordinal().range(zl)},ao.scale.category20c=function(){return ao.scale.ordinal().range(Ll)};var Al=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(xn),Cl=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(xn),zl=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(xn),Ll=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(xn);ao.scale.quantile=function(){return au([],[])},ao.scale.quantize=function(){return lu(0,1,[0,1])},ao.scale.threshold=function(){return cu([.5],[0,1])},ao.scale.identity=function(){return fu([0,1])},ao.svg={},ao.svg.arc=function(){function n(){var n=Math.max(0,+e.apply(this,arguments)),c=Math.max(0,+r.apply(this,arguments)),f=o.apply(this,arguments)-Io,s=a.apply(this,arguments)-Io,h=Math.abs(s-f),p=f>s?0:1;if(n>c&&(g=c,c=n,n=g),h>=Oo)return t(c,p)+(n?t(n,1-p):"")+"Z";var g,v,d,y,m,M,x,b,_,w,S,k,N=0,E=0,A=[];if((y=(+l.apply(this,arguments)||0)/2)&&(d=u===ql?Math.sqrt(n*n+c*c):+u.apply(this,arguments),p||(E*=-1),c&&(E=tn(d/c*Math.sin(y))),n&&(N=tn(d/n*Math.sin(y)))),c){m=c*Math.cos(f+E),M=c*Math.sin(f+E),x=c*Math.cos(s-E),b=c*Math.sin(s-E);var C=Math.abs(s-f-2*E)<=Fo?0:1;if(E&&yu(m,M,x,b)===p^C){var z=(f+s)/2;m=c*Math.cos(z),M=c*Math.sin(z),x=b=null}}else m=M=0;if(n){_=n*Math.cos(s-N),w=n*Math.sin(s-N),S=n*Math.cos(f+N),k=n*Math.sin(f+N);var L=Math.abs(f-s+2*N)<=Fo?0:1;if(N&&yu(_,w,S,k)===1-p^L){var q=(f+s)/2;_=n*Math.cos(q),w=n*Math.sin(q),S=k=null}}else _=w=0;if(h>Uo&&(g=Math.min(Math.abs(c-n)/2,+i.apply(this,arguments)))>.001){v=c>n^p?0:1;var T=g,R=g;if(Fo>h){var D=null==S?[_,w]:null==x?[m,M]:Re([m,M],[S,k],[x,b],[_,w]),P=m-D[0],U=M-D[1],j=x-D[0],F=b-D[1],H=1/Math.sin(Math.acos((P*j+U*F)/(Math.sqrt(P*P+U*U)*Math.sqrt(j*j+F*F)))/2),O=Math.sqrt(D[0]*D[0]+D[1]*D[1]);R=Math.min(g,(n-O)/(H-1)),T=Math.min(g,(c-O)/(H+1))}if(null!=x){var I=mu(null==S?[_,w]:[S,k],[m,M],c,T,p),Y=mu([x,b],[_,w],c,T,p);g===T?A.push("M",I[0],"A",T,",",T," 0 0,",v," ",I[1],"A",c,",",c," 0 ",1-p^yu(I[1][0],I[1][1],Y[1][0],Y[1][1]),",",p," ",Y[1],"A",T,",",T," 0 0,",v," ",Y[0]):A.push("M",I[0],"A",T,",",T," 0 1,",v," ",Y[0])}else A.push("M",m,",",M);if(null!=S){var Z=mu([m,M],[S,k],n,-R,p),V=mu([_,w],null==x?[m,M]:[x,b],n,-R,p);g===R?A.push("L",V[0],"A",R,",",R," 0 0,",v," ",V[1],"A",n,",",n," 0 ",p^yu(V[1][0],V[1][1],Z[1][0],Z[1][1]),",",1-p," ",Z[1],"A",R,",",R," 0 0,",v," ",Z[0]):A.push("L",V[0],"A",R,",",R," 0 0,",v," ",Z[0])}else A.push("L",_,",",w)}else A.push("M",m,",",M),null!=x&&A.push("A",c,",",c," 0 ",C,",",p," ",x,",",b),A.push("L",_,",",w),null!=S&&A.push("A",n,",",n," 0 ",L,",",1-p," ",S,",",k);return A.push("Z"),A.join("")}function t(n,t){return"M0,"+n+"A"+n+","+n+" 0 1,"+t+" 0,"+-n+"A"+n+","+n+" 0 1,"+t+" 0,"+n}var e=hu,r=pu,i=su,u=ql,o=gu,a=vu,l=du;return n.innerRadius=function(t){return arguments.length?(e=En(t),n):e},n.outerRadius=function(t){return arguments.length?(r=En(t),n):r},n.cornerRadius=function(t){return arguments.length?(i=En(t),n):i},n.padRadius=function(t){return arguments.length?(u=t==ql?ql:En(t),n):u},n.startAngle=function(t){return arguments.length?(o=En(t),n):o},n.endAngle=function(t){return arguments.length?(a=En(t),n):a},n.padAngle=function(t){return arguments.length?(l=En(t),n):l},n.centroid=function(){var n=(+e.apply(this,arguments)+ +r.apply(this,arguments))/2,t=(+o.apply(this,arguments)+ +a.apply(this,arguments))/2-Io;return[Math.cos(t)*n,Math.sin(t)*n]},n};var ql="auto";ao.svg.line=function(){return Mu(m)};var Tl=ao.map({linear:xu,"linear-closed":bu,step:_u,"step-before":wu,"step-after":Su,basis:zu,"basis-open":Lu,"basis-closed":qu,bundle:Tu,cardinal:Eu,"cardinal-open":ku,"cardinal-closed":Nu,monotone:Fu});Tl.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var Rl=[0,2/3,1/3,0],Dl=[0,1/3,2/3,0],Pl=[0,1/6,2/3,1/6];ao.svg.line.radial=function(){var n=Mu(Hu);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},wu.reverse=Su,Su.reverse=wu,ao.svg.area=function(){return Ou(m)},ao.svg.area.radial=function(){var n=Ou(Hu);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},ao.svg.chord=function(){function n(n,a){var l=t(this,u,n,a),c=t(this,o,n,a);return"M"+l.p0+r(l.r,l.p1,l.a1-l.a0)+(e(l,c)?i(l.r,l.p1,l.r,l.p0):i(l.r,l.p1,c.r,c.p0)+r(c.r,c.p1,c.a1-c.a0)+i(c.r,c.p1,l.r,l.p0))+"Z"}function t(n,t,e,r){var i=t.call(n,e,r),u=a.call(n,i,r),o=l.call(n,i,r)-Io,f=c.call(n,i,r)-Io;return{r:u,a0:o,a1:f,p0:[u*Math.cos(o),u*Math.sin(o)],p1:[u*Math.cos(f),u*Math.sin(f)]}}function e(n,t){return n.a0==t.a0&&n.a1==t.a1}function r(n,t,e){return"A"+n+","+n+" 0 "+ +(e>Fo)+",1 "+t}function i(n,t,e,r){return"Q 0,0 "+r}var u=Me,o=xe,a=Iu,l=gu,c=vu;return n.radius=function(t){return arguments.length?(a=En(t),n):a},n.source=function(t){return arguments.length?(u=En(t),n):u},n.target=function(t){return arguments.length?(o=En(t),n):o},n.startAngle=function(t){return arguments.length?(l=En(t),n):l},n.endAngle=function(t){return arguments.length?(c=En(t),n):c},n},ao.svg.diagonal=function(){function n(n,i){var u=t.call(this,n,i),o=e.call(this,n,i),a=(u.y+o.y)/2,l=[u,{x:u.x,y:a},{x:o.x,y:a},o];return l=l.map(r),"M"+l[0]+"C"+l[1]+" "+l[2]+" "+l[3]}var t=Me,e=xe,r=Yu;return n.source=function(e){return arguments.length?(t=En(e),n):t},n.target=function(t){return arguments.length?(e=En(t),n):e},n.projection=function(t){return arguments.length?(r=t,n):r},n},ao.svg.diagonal.radial=function(){var n=ao.svg.diagonal(),t=Yu,e=n.projection;return n.projection=function(n){return arguments.length?e(Zu(t=n)):t},n},ao.svg.symbol=function(){function n(n,r){return(Ul.get(t.call(this,n,r))||$u)(e.call(this,n,r))}var t=Xu,e=Vu;return n.type=function(e){return arguments.length?(t=En(e),n):t},n.size=function(t){return arguments.length?(e=En(t),n):e},n};var Ul=ao.map({circle:$u,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*Fl)),e=t*Fl;return"M0,"+-t+"L"+e+",0 0,"+t+" "+-e+",0Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"},"triangle-down":function(n){var t=Math.sqrt(n/jl),e=t*jl/2;return"M0,"+e+"L"+t+","+-e+" "+-t+","+-e+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/jl),e=t*jl/2;return"M0,"+-e+"L"+t+","+e+" "+-t+","+e+"Z"}});ao.svg.symbolTypes=Ul.keys();var jl=Math.sqrt(3),Fl=Math.tan(30*Yo);Co.transition=function(n){for(var t,e,r=Hl||++Zl,i=Ku(n),u=[],o=Ol||{time:Date.now(),ease:Nr,delay:0,duration:250},a=-1,l=this.length;++a<l;){u.push(t=[]);for(var c=this[a],f=-1,s=c.length;++f<s;)(e=c[f])&&Qu(e,f,i,r,o),t.push(e)}return Wu(u,i,r)},Co.interrupt=function(n){return this.each(null==n?Il:Bu(Ku(n)))};var Hl,Ol,Il=Bu(Ku()),Yl=[],Zl=0;Yl.call=Co.call,Yl.empty=Co.empty,Yl.node=Co.node,Yl.size=Co.size,ao.transition=function(n,t){return n&&n.transition?Hl?n.transition(t):n:ao.selection().transition(n)},ao.transition.prototype=Yl,Yl.select=function(n){var t,e,r,i=this.id,u=this.namespace,o=[];n=A(n);for(var a=-1,l=this.length;++a<l;){o.push(t=[]);for(var c=this[a],f=-1,s=c.length;++f<s;)(r=c[f])&&(e=n.call(r,r.__data__,f,a))?("__data__"in r&&(e.__data__=r.__data__),Qu(e,f,u,i,r[u][i]),t.push(e)):t.push(null)}return Wu(o,u,i)},Yl.selectAll=function(n){var t,e,r,i,u,o=this.id,a=this.namespace,l=[];n=C(n);for(var c=-1,f=this.length;++c<f;)for(var s=this[c],h=-1,p=s.length;++h<p;)if(r=s[h]){u=r[a][o],e=n.call(r,r.__data__,h,c),l.push(t=[]);for(var g=-1,v=e.length;++g<v;)(i=e[g])&&Qu(i,g,a,o,u),t.push(i)}return Wu(l,a,o)},Yl.filter=function(n){var t,e,r,i=[];"function"!=typeof n&&(n=O(n));for(var u=0,o=this.length;o>u;u++){i.push(t=[]);for(var e=this[u],a=0,l=e.length;l>a;a++)(r=e[a])&&n.call(r,r.__data__,a,u)&&t.push(r)}return Wu(i,this.namespace,this.id)},Yl.tween=function(n,t){var e=this.id,r=this.namespace;return arguments.length<2?this.node()[r][e].tween.get(n):Y(this,null==t?function(t){t[r][e].tween.remove(n)}:function(i){i[r][e].tween.set(n,t)})},Yl.attr=function(n,t){function e(){this.removeAttribute(a)}function r(){this.removeAttributeNS(a.space,a.local)}function i(n){return null==n?e:(n+="",function(){var t,e=this.getAttribute(a);return e!==n&&(t=o(e,n),function(n){this.setAttribute(a,t(n))})})}function u(n){return null==n?r:(n+="",function(){var t,e=this.getAttributeNS(a.space,a.local);return e!==n&&(t=o(e,n),function(n){this.setAttributeNS(a.space,a.local,t(n))})})}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var o="transform"==n?$r:Mr,a=ao.ns.qualify(n);return Ju(this,"attr."+n,t,a.local?u:i)},Yl.attrTween=function(n,t){function e(n,e){var r=t.call(this,n,e,this.getAttribute(i));return r&&function(n){this.setAttribute(i,r(n))}}function r(n,e){var r=t.call(this,n,e,this.getAttributeNS(i.space,i.local));return r&&function(n){this.setAttributeNS(i.space,i.local,r(n))}}var i=ao.ns.qualify(n);return this.tween("attr."+n,i.local?r:e)},Yl.style=function(n,e,r){function i(){this.style.removeProperty(n)}function u(e){return null==e?i:(e+="",function(){var i,u=t(this).getComputedStyle(this,null).getPropertyValue(n);return u!==e&&(i=Mr(u,e),function(t){this.style.setProperty(n,i(t),r)})})}var o=arguments.length;if(3>o){if("string"!=typeof n){2>o&&(e="");for(r in n)this.style(r,n[r],e);return this}r=""}return Ju(this,"style."+n,e,u)},Yl.styleTween=function(n,e,r){function i(i,u){var o=e.call(this,i,u,t(this).getComputedStyle(this,null).getPropertyValue(n));return o&&function(t){this.style.setProperty(n,o(t),r)}}return arguments.length<3&&(r=""),this.tween("style."+n,i)},Yl.text=function(n){return Ju(this,"text",n,Gu)},Yl.remove=function(){var n=this.namespace;return this.each("end.transition",function(){var t;this[n].count<2&&(t=this.parentNode)&&t.removeChild(this)})},Yl.ease=function(n){var t=this.id,e=this.namespace;return arguments.length<1?this.node()[e][t].ease:("function"!=typeof n&&(n=ao.ease.apply(ao,arguments)),Y(this,function(r){r[e][t].ease=n}))},Yl.delay=function(n){var t=this.id,e=this.namespace;return arguments.length<1?this.node()[e][t].delay:Y(this,"function"==typeof n?function(r,i,u){r[e][t].delay=+n.call(r,r.__data__,i,u)}:(n=+n,function(r){r[e][t].delay=n}))},Yl.duration=function(n){var t=this.id,e=this.namespace;return arguments.length<1?this.node()[e][t].duration:Y(this,"function"==typeof n?function(r,i,u){r[e][t].duration=Math.max(1,n.call(r,r.__data__,i,u))}:(n=Math.max(1,n),function(r){r[e][t].duration=n}))},Yl.each=function(n,t){var e=this.id,r=this.namespace;if(arguments.length<2){var i=Ol,u=Hl;try{Hl=e,Y(this,function(t,i,u){Ol=t[r][e],n.call(t,t.__data__,i,u)})}finally{Ol=i,Hl=u}}else Y(this,function(i){var u=i[r][e];(u.event||(u.event=ao.dispatch("start","end","interrupt"))).on(n,t)});return this},Yl.transition=function(){for(var n,t,e,r,i=this.id,u=++Zl,o=this.namespace,a=[],l=0,c=this.length;c>l;l++){a.push(n=[]);for(var t=this[l],f=0,s=t.length;s>f;f++)(e=t[f])&&(r=e[o][i],Qu(e,f,o,u,{time:r.time,ease:r.ease,delay:r.delay+r.duration,duration:r.duration})),n.push(e)}return Wu(a,o,u)},ao.svg.axis=function(){function n(n){n.each(function(){var n,c=ao.select(this),f=this.__chart__||e,s=this.__chart__=e.copy(),h=null==l?s.ticks?s.ticks.apply(s,a):s.domain():l,p=null==t?s.tickFormat?s.tickFormat.apply(s,a):m:t,g=c.selectAll(".tick").data(h,s),v=g.enter().insert("g",".domain").attr("class","tick").style("opacity",Uo),d=ao.transition(g.exit()).style("opacity",Uo).remove(),y=ao.transition(g.order()).style("opacity",1),M=Math.max(i,0)+o,x=Zi(s),b=c.selectAll(".domain").data([0]),_=(b.enter().append("path").attr("class","domain"),ao.transition(b));v.append("line"),v.append("text");var w,S,k,N,E=v.select("line"),A=y.select("line"),C=g.select("text").text(p),z=v.select("text"),L=y.select("text"),q="top"===r||"left"===r?-1:1;if("bottom"===r||"top"===r?(n=no,w="x",k="y",S="x2",N="y2",C.attr("dy",0>q?"0em":".71em").style("text-anchor","middle"),_.attr("d","M"+x[0]+","+q*u+"V0H"+x[1]+"V"+q*u)):(n=to,w="y",k="x",S="y2",N="x2",C.attr("dy",".32em").style("text-anchor",0>q?"end":"start"),_.attr("d","M"+q*u+","+x[0]+"H0V"+x[1]+"H"+q*u)),E.attr(N,q*i),z.attr(k,q*M),A.attr(S,0).attr(N,q*i),L.attr(w,0).attr(k,q*M),s.rangeBand){var T=s,R=T.rangeBand()/2;f=s=function(n){return T(n)+R}}else f.rangeBand?f=s:d.call(n,s,f);v.call(n,f,s),y.call(n,s,s)})}var t,e=ao.scale.linear(),r=Vl,i=6,u=6,o=3,a=[10],l=null;return n.scale=function(t){return arguments.length?(e=t,n):e},n.orient=function(t){return arguments.length?(r=t in Xl?t+"":Vl,n):r},n.ticks=function(){return arguments.length?(a=co(arguments),n):a},n.tickValues=function(t){return arguments.length?(l=t,n):l},n.tickFormat=function(e){return arguments.length?(t=e,n):t},n.tickSize=function(t){var e=arguments.length;return e?(i=+t,u=+arguments[e-1],n):i},n.innerTickSize=function(t){return arguments.length?(i=+t,n):i},n.outerTickSize=function(t){return arguments.length?(u=+t,n):u},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(){return arguments.length&&n},n};var Vl="bottom",Xl={top:1,right:1,bottom:1,left:1};ao.svg.brush=function(){function n(t){t.each(function(){var t=ao.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",u).on("touchstart.brush",u),o=t.selectAll(".background").data([0]);o.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),t.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");var a=t.selectAll(".resize").data(v,m);a.exit().remove(),a.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return $l[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),a.style("display",n.empty()?"none":null);var l,s=ao.transition(t),h=ao.transition(o);c&&(l=Zi(c),h.attr("x",l[0]).attr("width",l[1]-l[0]),r(s)),f&&(l=Zi(f),h.attr("y",l[0]).attr("height",l[1]-l[0]),i(s)),e(s)})}function e(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+s[+/e$/.test(n)]+","+h[+/^s/.test(n)]+")"})}function r(n){n.select(".extent").attr("x",s[0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",s[1]-s[0])}function i(n){n.select(".extent").attr("y",h[0]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",h[1]-h[0])}function u(){function u(){32==ao.event.keyCode&&(C||(M=null,L[0]-=s[1],L[1]-=h[1],C=2),S())}function v(){32==ao.event.keyCode&&2==C&&(L[0]+=s[1],L[1]+=h[1],C=0,S())}function d(){var n=ao.mouse(b),t=!1;x&&(n[0]+=x[0],n[1]+=x[1]),C||(ao.event.altKey?(M||(M=[(s[0]+s[1])/2,(h[0]+h[1])/2]),L[0]=s[+(n[0]<M[0])],L[1]=h[+(n[1]<M[1])]):M=null),E&&y(n,c,0)&&(r(k),t=!0),A&&y(n,f,1)&&(i(k),t=!0),t&&(e(k),w({type:"brush",mode:C?"move":"resize"}))}function y(n,t,e){var r,i,u=Zi(t),l=u[0],c=u[1],f=L[e],v=e?h:s,d=v[1]-v[0];return C&&(l-=f,c-=d+f),r=(e?g:p)?Math.max(l,Math.min(c,n[e])):n[e],C?i=(r+=f)+d:(M&&(f=Math.max(l,Math.min(c,2*M[e]-r))),r>f?(i=r,r=f):i=f),v[0]!=r||v[1]!=i?(e?a=null:o=null,v[0]=r,v[1]=i,!0):void 0}function m(){d(),k.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),ao.select("body").style("cursor",null),q.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),z(),w({type:"brushend"})}var M,x,b=this,_=ao.select(ao.event.target),w=l.of(b,arguments),k=ao.select(b),N=_.datum(),E=!/^(n|s)$/.test(N)&&c,A=!/^(e|w)$/.test(N)&&f,C=_.classed("extent"),z=W(b),L=ao.mouse(b),q=ao.select(t(b)).on("keydown.brush",u).on("keyup.brush",v);if(ao.event.changedTouches?q.on("touchmove.brush",d).on("touchend.brush",m):q.on("mousemove.brush",d).on("mouseup.brush",m),k.interrupt().selectAll("*").interrupt(),C)L[0]=s[0]-L[0],L[1]=h[0]-L[1];else if(N){var T=+/w$/.test(N),R=+/^n/.test(N);x=[s[1-T]-L[0],h[1-R]-L[1]],L[0]=s[T],L[1]=h[R]}else ao.event.altKey&&(M=L.slice());k.style("pointer-events","none").selectAll(".resize").style("display",null),ao.select("body").style("cursor",_.style("cursor")),w({type:"brushstart"}),d()}var o,a,l=N(n,"brushstart","brush","brushend"),c=null,f=null,s=[0,0],h=[0,0],p=!0,g=!0,v=Bl[0];return n.event=function(n){n.each(function(){var n=l.of(this,arguments),t={x:s,y:h,i:o,j:a},e=this.__chart__||t;this.__chart__=t,Hl?ao.select(this).transition().each("start.brush",function(){o=e.i,a=e.j,s=e.x,h=e.y,n({type:"brushstart"})}).tween("brush:brush",function(){var e=xr(s,t.x),r=xr(h,t.y);return o=a=null,function(i){s=t.x=e(i),h=t.y=r(i),n({type:"brush",mode:"resize"})}}).each("end.brush",function(){o=t.i,a=t.j,n({type:"brush",mode:"resize"}),n({type:"brushend"})}):(n({type:"brushstart"}),n({type:"brush",mode:"resize"}),n({type:"brushend"}))})},n.x=function(t){return arguments.length?(c=t,v=Bl[!c<<1|!f],n):c},n.y=function(t){return arguments.length?(f=t,v=Bl[!c<<1|!f],n):f},n.clamp=function(t){return arguments.length?(c&&f?(p=!!t[0],g=!!t[1]):c?p=!!t:f&&(g=!!t),n):c&&f?[p,g]:c?p:f?g:null},n.extent=function(t){var e,r,i,u,l;return arguments.length?(c&&(e=t[0],r=t[1],f&&(e=e[0],r=r[0]),o=[e,r],c.invert&&(e=c(e),r=c(r)),e>r&&(l=e,e=r,r=l),e==s[0]&&r==s[1]||(s=[e,r])),f&&(i=t[0],u=t[1],c&&(i=i[1],u=u[1]),a=[i,u],f.invert&&(i=f(i),u=f(u)),i>u&&(l=i,i=u,u=l),i==h[0]&&u==h[1]||(h=[i,u])),n):(c&&(o?(e=o[0],r=o[1]):(e=s[0],r=s[1],c.invert&&(e=c.invert(e),r=c.invert(r)),e>r&&(l=e,e=r,r=l))),f&&(a?(i=a[0],u=a[1]):(i=h[0],u=h[1],f.invert&&(i=f.invert(i),u=f.invert(u)),i>u&&(l=i,i=u,u=l))),c&&f?[[e,i],[r,u]]:c?[e,r]:f&&[i,u])},n.clear=function(){return n.empty()||(s=[0,0],h=[0,0],o=a=null),n},n.empty=function(){return!!c&&s[0]==s[1]||!!f&&h[0]==h[1]},ao.rebind(n,l,"on")};var $l={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Bl=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],Wl=ga.format=xa.timeFormat,Jl=Wl.utc,Gl=Jl("%Y-%m-%dT%H:%M:%S.%LZ");Wl.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?eo:Gl,eo.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},eo.toString=Gl.toString,ga.second=On(function(n){return new va(1e3*Math.floor(n/1e3))},function(n,t){n.setTime(n.getTime()+1e3*Math.floor(t))},function(n){return n.getSeconds()}),ga.seconds=ga.second.range,ga.seconds.utc=ga.second.utc.range,ga.minute=On(function(n){return new va(6e4*Math.floor(n/6e4))},function(n,t){n.setTime(n.getTime()+6e4*Math.floor(t))},function(n){return n.getMinutes()}),ga.minutes=ga.minute.range,ga.minutes.utc=ga.minute.utc.range,ga.hour=On(function(n){var t=n.getTimezoneOffset()/60;return new va(36e5*(Math.floor(n/36e5-t)+t))},function(n,t){n.setTime(n.getTime()+36e5*Math.floor(t))},function(n){return n.getHours()}),ga.hours=ga.hour.range,ga.hours.utc=ga.hour.utc.range,ga.month=On(function(n){return n=ga.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),ga.months=ga.month.range,ga.months.utc=ga.month.utc.range;var Kl=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],Ql=[[ga.second,1],[ga.second,5],[ga.second,15],[ga.second,30],[ga.minute,1],[ga.minute,5],[ga.minute,15],[ga.minute,30],[ga.hour,1],[ga.hour,3],[ga.hour,6],[ga.hour,12],[ga.day,1],[ga.day,2],[ga.week,1],[ga.month,1],[ga.month,3],[ga.year,1]],nc=Wl.multi([[".%L",function(n){return n.getMilliseconds()}],[":%S",function(n){return n.getSeconds()}],["%I:%M",function(n){return n.getMinutes()}],["%I %p",function(n){return n.getHours()}],["%a %d",function(n){return n.getDay()&&1!=n.getDate()}],["%b %d",function(n){return 1!=n.getDate()}],["%B",function(n){return n.getMonth()}],["%Y",zt]]),tc={range:function(n,t,e){return ao.range(Math.ceil(n/e)*e,+t,e).map(io)},floor:m,ceil:m};Ql.year=ga.year,ga.scale=function(){return ro(ao.scale.linear(),Ql,nc)};var ec=Ql.map(function(n){return[n[0].utc,n[1]]}),rc=Jl.multi([[".%L",function(n){return n.getUTCMilliseconds()}],[":%S",function(n){return n.getUTCSeconds()}],["%I:%M",function(n){return n.getUTCMinutes()}],["%I %p",function(n){return n.getUTCHours()}],["%a %d",function(n){return n.getUTCDay()&&1!=n.getUTCDate()}],["%b %d",function(n){return 1!=n.getUTCDate()}],["%B",function(n){return n.getUTCMonth()}],["%Y",zt]]);ec.year=ga.year.utc,ga.scale.utc=function(){return ro(ao.scale.linear(),ec,rc)},ao.text=An(function(n){return n.responseText}),ao.json=function(n,t){return Cn(n,"application/json",uo,t)},ao.html=function(n,t){return Cn(n,"text/html",oo,t)},ao.xml=An(function(n){return n.responseXML}),"function"==typeof define&&define.amd?(this.d3=ao,define(ao)):"object"==typeof module&&module.exports?module.exports=ao:this.d3=ao}();
},{}],2:[function(require,module,exports){
// https://d3js.org Version 4.4.0. Copyright 2016 Mike Bostock.
(function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.d3=t.d3||{})})(this,function(t){"use strict";function n(t){return function(n,e){return Ms(t(n),e)}}function e(t,n,e){var r=Math.abs(n-t)/Math.max(0,e),i=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),o=r/i;return o>=Fs?i*=10:o>=Is?i*=5:o>=Ys&&(i*=2),n<t?-i:i}function r(t){return t.length}function i(){}function o(t,n){var e=new i;if(t instanceof i)t.each(function(t,n){e.set(n,t)});else if(Array.isArray(t)){var r,o=-1,u=t.length;if(null==n)for(;++o<u;)e.set(o,t[o]);else for(;++o<u;)e.set(n(r=t[o],o,t),r)}else if(t)for(var a in t)e.set(a,t[a]);return e}function u(){return{}}function a(t,n,e){t[n]=e}function c(){return o()}function s(t,n,e){t.set(n,e)}function f(){}function l(t,n){var e=new f;if(t instanceof f)t.each(function(t){e.add(t)});else if(t){var r=-1,i=t.length;if(null==n)for(;++r<i;)e.add(t[r]);else for(;++r<i;)e.add(n(t[r],r,t))}return e}function h(t){return+t}function p(t){return t*t}function d(t){return t*(2-t)}function v(t){return((t*=2)<=1?t*t:--t*(2-t)+1)/2}function _(t){return t*t*t}function y(t){return--t*t*t+1}function g(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}function m(t){return 1-Math.cos(t*Tf)}function x(t){return Math.sin(t*Tf)}function b(t){return(1-Math.cos(Mf*t))/2}function w(t){return Math.pow(2,10*t-10)}function M(t){return 1-Math.pow(2,-10*t)}function T(t){return((t*=2)<=1?Math.pow(2,10*t-10):2-Math.pow(2,10-10*t))/2}function N(t){return 1-Math.sqrt(1-t*t)}function k(t){return Math.sqrt(1- --t*t)}function S(t){return((t*=2)<=1?1-Math.sqrt(1-t*t):Math.sqrt(1-(t-=2)*t)+1)/2}function E(t){return 1-A(1-t)}function A(t){return(t=+t)<Nf?qf*t*t:t<Sf?qf*(t-=kf)*t+Ef:t<Cf?qf*(t-=Af)*t+zf:qf*(t-=Pf)*t+Rf}function C(t){return((t*=2)<=1?1-A(1-t):A(t-1)+1)/2}function z(t,n){return t[0]-n[0]||t[1]-n[1]}function P(t){for(var n=t.length,e=[0,1],r=2,i=2;i<n;++i){for(;r>1&&Wf(t[e[r-2]],t[e[r-1]],t[i])<=0;)--r;e[r++]=i}return e.slice(0,r)}function R(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function q(){return new R}function L(t,n,e,r){if(isNaN(n)||isNaN(e))return t;var i,o,u,a,c,s,f,l,h,p=t._root,d={data:r},v=t._x0,_=t._y0,y=t._x1,g=t._y1;if(!p)return t._root=d,t;for(;p.length;)if((s=n>=(o=(v+y)/2))?v=o:y=o,(f=e>=(u=(_+g)/2))?_=u:g=u,i=p,!(p=p[l=f<<1|s]))return i[l]=d,t;if(a=+t._x.call(null,p.data),c=+t._y.call(null,p.data),n===a&&e===c)return d.next=p,i?i[l]=d:t._root=d,t;do i=i?i[l]=new Array(4):t._root=new Array(4),(s=n>=(o=(v+y)/2))?v=o:y=o,(f=e>=(u=(_+g)/2))?_=u:g=u;while((l=f<<1|s)===(h=(c>=u)<<1|a>=o));return i[h]=p,i[l]=d,t}function U(t){var n,e,r,i,o=t.length,u=new Array(o),a=new Array(o),c=1/0,s=1/0,f=-(1/0),l=-(1/0);for(e=0;e<o;++e)isNaN(r=+this._x.call(null,n=t[e]))||isNaN(i=+this._y.call(null,n))||(u[e]=r,a[e]=i,r<c&&(c=r),r>f&&(f=r),i<s&&(s=i),i>l&&(l=i));for(f<c&&(c=this._x0,f=this._x1),l<s&&(s=this._y0,l=this._y1),this.cover(c,s).cover(f,l),e=0;e<o;++e)L(this,u[e],a[e],t[e]);return this}function D(t){for(var n=0,e=t.length;n<e;++n)this.remove(t[n]);return this}function O(t){return t[0]}function F(t){return t[1]}function I(t,n,e){var r=new Y(null==n?O:n,null==e?F:e,NaN,NaN,NaN,NaN);return null==t?r:r.addAll(t)}function Y(t,n,e,r,i,o){this._x=t,this._y=n,this._x0=e,this._y0=r,this._x1=i,this._y1=o,this._root=void 0}function B(t){for(var n={data:t.data},e=n;t=t.next;)e=e.next={data:t.data};return n}function j(t){if(!(t>=1))throw new Error;this._size=t,this._call=this._error=null,this._tasks=[],this._data=[],this._waiting=this._active=this._ended=this._start=0}function H(t){if(!t._start)try{X(t)}catch(n){if(t._tasks[t._ended+t._active-1])W(t,n);else if(!t._data)throw n}}function X(t){for(;t._start=t._waiting&&t._active<t._size;){var n=t._ended+t._active,e=t._tasks[n],r=e.length-1,i=e[r];e[r]=V(t,n),--t._waiting,++t._active,e=i.apply(null,e),t._tasks[n]&&(t._tasks[n]=e||_l)}}function V(t,n){return function(e,r){t._tasks[n]&&(--t._active,++t._ended,t._tasks[n]=null,null==t._error&&(null!=e?W(t,e):(t._data[n]=r,t._waiting?H(t):$(t))))}}function W(t,n){var e,r=t._tasks.length;for(t._error=n,t._data=void 0,t._waiting=NaN;--r>=0;)if((e=t._tasks[r])&&(t._tasks[r]=null,e.abort))try{e.abort()}catch(t){}t._active=NaN,$(t)}function $(t){if(!t._active&&t._call){var n=t._data;t._data=void 0,t._call(t._error,n)}}function Z(t){return new j(arguments.length?+t:1/0)}function G(t){return t.innerRadius}function J(t){return t.outerRadius}function Q(t){return t.startAngle}function K(t){return t.endAngle}function tt(t){return t&&t.padAngle}function nt(t){return t>=1?xl:t<=-1?-xl:Math.asin(t)}function et(t,n,e,r,i,o,u,a){var c=e-t,s=r-n,f=u-i,l=a-o,h=(f*(n-o)-l*(t-i))/(l*c-f*s);return[t+h*c,n+h*s]}function rt(t,n,e,r,i,o,u){var a=t-e,c=n-r,s=(u?o:-o)/Math.sqrt(a*a+c*c),f=s*c,l=-s*a,h=t+f,p=n+l,d=e+f,v=r+l,_=(h+d)/2,y=(p+v)/2,g=d-h,m=v-p,x=g*g+m*m,b=i-o,w=h*v-d*p,M=(m<0?-1:1)*Math.sqrt(Math.max(0,b*b*x-w*w)),T=(w*m-g*M)/x,N=(-w*g-m*M)/x,k=(w*m+g*M)/x,S=(-w*g+m*M)/x,E=T-_,A=N-y,C=k-_,z=S-y;return E*E+A*A>C*C+z*z&&(T=k,N=S),{cx:T,cy:N,x01:-f,y01:-l,x11:T*(i/b-1),y11:N*(i/b-1)}}function it(t){this._context=t}function ot(t){return t[0]}function ut(t){return t[1]}function at(t){this._curve=t}function ct(t){function n(n){return new at(t(n))}return n._curve=t,n}function st(t){var n=t.curve;return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t.curve=function(t){return arguments.length?n(ct(t)):n()._curve},t}function ft(t,n,e){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+n)/6,(t._y0+4*t._y1+e)/6)}function lt(t){this._context=t}function ht(t){this._context=t}function pt(t){this._context=t}function dt(t,n){this._basis=new lt(t),this._beta=n}function vt(t,n,e){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-n),t._y2+t._k*(t._y1-e),t._x2,t._y2)}function _t(t,n){this._context=t,this._k=(1-n)/6}function yt(t,n){this._context=t,this._k=(1-n)/6}function gt(t,n){this._context=t,this._k=(1-n)/6}function mt(t,n,e){var r=t._x1,i=t._y1,o=t._x2,u=t._y2;if(t._l01_a>gl){var a=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,c=3*t._l01_a*(t._l01_a+t._l12_a);r=(r*a-t._x0*t._l12_2a+t._x2*t._l01_2a)/c,i=(i*a-t._y0*t._l12_2a+t._y2*t._l01_2a)/c}if(t._l23_a>gl){var s=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,f=3*t._l23_a*(t._l23_a+t._l12_a);o=(o*s+t._x1*t._l23_2a-n*t._l12_2a)/f,u=(u*s+t._y1*t._l23_2a-e*t._l12_2a)/f}t._context.bezierCurveTo(r,i,o,u,t._x2,t._y2)}function xt(t,n){this._context=t,this._alpha=n}function bt(t,n){this._context=t,this._alpha=n}function wt(t,n){this._context=t,this._alpha=n}function Mt(t){this._context=t}function Tt(t){return t<0?-1:1}function Nt(t,n,e){var r=t._x1-t._x0,i=n-t._x1,o=(t._y1-t._y0)/(r||i<0&&-0),u=(e-t._y1)/(i||r<0&&-0),a=(o*i+u*r)/(r+i);return(Tt(o)+Tt(u))*Math.min(Math.abs(o),Math.abs(u),.5*Math.abs(a))||0}function kt(t,n){var e=t._x1-t._x0;return e?(3*(t._y1-t._y0)/e-n)/2:n}function St(t,n,e){var r=t._x0,i=t._y0,o=t._x1,u=t._y1,a=(o-r)/3;t._context.bezierCurveTo(r+a,i+a*n,o-a,u-a*e,o,u)}function Et(t){this._context=t}function At(t){this._context=new Ct(t)}function Ct(t){this._context=t}function zt(t){return new Et(t)}function Pt(t){return new At(t)}function Rt(t){this._context=t}function qt(t){var n,e,r=t.length-1,i=new Array(r),o=new Array(r),u=new Array(r);for(i[0]=0,o[0]=2,u[0]=t[0]+2*t[1],n=1;n<r-1;++n)i[n]=1,o[n]=4,u[n]=4*t[n]+2*t[n+1];for(i[r-1]=2,o[r-1]=7,u[r-1]=8*t[r-1]+t[r],n=1;n<r;++n)e=i[n]/o[n-1],o[n]-=e,u[n]-=e*u[n-1];for(i[r-1]=u[r-1]/o[r-1],n=r-2;n>=0;--n)i[n]=(u[n]-i[n+1])/o[n];for(o[r-1]=(t[r]+i[r-1])/2,n=0;n<r-1;++n)o[n]=2*t[n+1]-i[n+1];return[i,o]}function Lt(t,n){this._context=t,this._t=n}function Ut(t){return new Lt(t,0)}function Dt(t){return new Lt(t,1)}function Ot(t,n){return t[n]}function Ft(t){for(var n,e=0,r=-1,i=t.length;++r<i;)(n=+t[r][1])&&(e+=n);return e}function It(t,n){var e=Object.create(t.prototype);for(var r in n)e[r]=n[r];return e}function Yt(){}function Bt(t){var n;return t=(t+"").trim().toLowerCase(),(n=Ah.exec(t))?(n=parseInt(n[1],16),new Wt(n>>8&15|n>>4&240,n>>4&15|240&n,(15&n)<<4|15&n,1)):(n=Ch.exec(t))?jt(parseInt(n[1],16)):(n=zh.exec(t))?new Wt(n[1],n[2],n[3],1):(n=Ph.exec(t))?new Wt(255*n[1]/100,255*n[2]/100,255*n[3]/100,1):(n=Rh.exec(t))?Ht(n[1],n[2],n[3],n[4]):(n=qh.exec(t))?Ht(255*n[1]/100,255*n[2]/100,255*n[3]/100,n[4]):(n=Lh.exec(t))?$t(n[1],n[2]/100,n[3]/100,1):(n=Uh.exec(t))?$t(n[1],n[2]/100,n[3]/100,n[4]):Dh.hasOwnProperty(t)?jt(Dh[t]):"transparent"===t?new Wt(NaN,NaN,NaN,0):null}function jt(t){return new Wt(t>>16&255,t>>8&255,255&t,1)}function Ht(t,n,e,r){return r<=0&&(t=n=e=NaN),new Wt(t,n,e,r)}function Xt(t){return t instanceof Yt||(t=Bt(t)),t?(t=t.rgb(),new Wt(t.r,t.g,t.b,t.opacity)):new Wt}function Vt(t,n,e,r){return 1===arguments.length?Xt(t):new Wt(t,n,e,null==r?1:r)}function Wt(t,n,e,r){this.r=+t,this.g=+n,this.b=+e,this.opacity=+r}function $t(t,n,e,r){return r<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new Jt(t,n,e,r)}function Zt(t){if(t instanceof Jt)return new Jt(t.h,t.s,t.l,t.opacity);if(t instanceof Yt||(t=Bt(t)),!t)return new Jt;if(t instanceof Jt)return t;t=t.rgb();var n=t.r/255,e=t.g/255,r=t.b/255,i=Math.min(n,e,r),o=Math.max(n,e,r),u=NaN,a=o-i,c=(o+i)/2;return a?(u=n===o?(e-r)/a+6*(e<r):e===o?(r-n)/a+2:(n-e)/a+4,a/=c<.5?o+i:2-o-i,u*=60):a=c>0&&c<1?0:u,new Jt(u,a,c,t.opacity)}function Gt(t,n,e,r){return 1===arguments.length?Zt(t):new Jt(t,n,e,null==r?1:r)}function Jt(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function Qt(t,n,e){return 255*(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)}function Kt(t){if(t instanceof nn)return new nn(t.l,t.a,t.b,t.opacity);if(t instanceof sn){var n=t.h*Oh;return new nn(t.l,Math.cos(n)*t.c,Math.sin(n)*t.c,t.opacity)}t instanceof Wt||(t=Xt(t));var e=un(t.r),r=un(t.g),i=un(t.b),o=en((.4124564*e+.3575761*r+.1804375*i)/Yh),u=en((.2126729*e+.7151522*r+.072175*i)/Bh),a=en((.0193339*e+.119192*r+.9503041*i)/jh);return new nn(116*u-16,500*(o-u),200*(u-a),t.opacity)}function tn(t,n,e,r){return 1===arguments.length?Kt(t):new nn(t,n,e,null==r?1:r)}function nn(t,n,e,r){this.l=+t,this.a=+n,this.b=+e,this.opacity=+r}function en(t){return t>Wh?Math.pow(t,1/3):t/Vh+Hh}function rn(t){return t>Xh?t*t*t:Vh*(t-Hh)}function on(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function un(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function an(t){if(t instanceof sn)return new sn(t.h,t.c,t.l,t.opacity);t instanceof nn||(t=Kt(t));var n=Math.atan2(t.b,t.a)*Fh;return new sn(n<0?n+360:n,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function cn(t,n,e,r){return 1===arguments.length?an(t):new sn(t,n,e,null==r?1:r)}function sn(t,n,e,r){this.h=+t,this.c=+n,this.l=+e,this.opacity=+r}function fn(t){if(t instanceof hn)return new hn(t.h,t.s,t.l,t.opacity);t instanceof Wt||(t=Xt(t));var n=t.r/255,e=t.g/255,r=t.b/255,i=(np*r+Kh*n-tp*e)/(np+Kh-tp),o=r-i,u=(Qh*(e-i)-Gh*o)/Jh,a=Math.sqrt(u*u+o*o)/(Qh*i*(1-i)),c=a?Math.atan2(u,o)*Fh-120:NaN;return new hn(c<0?c+360:c,a,i,t.opacity)}function ln(t,n,e,r){return 1===arguments.length?fn(t):new hn(t,n,e,null==r?1:r)}function hn(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function pn(t,n,e,r,i){var o=t*t,u=o*t;return((1-3*t+3*o-u)*n+(4-6*o+3*u)*e+(1+3*t+3*o-3*u)*r+u*i)/6}function dn(t,n){return function(e){return t+e*n}}function vn(t,n,e){return t=Math.pow(t,e),n=Math.pow(n,e)-t,e=1/e,function(r){return Math.pow(t+r*n,e)}}function _n(t,n){var e=n-t;return e?dn(t,e>180||e<-180?e-360*Math.round(e/360):e):cp(isNaN(t)?n:t)}function yn(t){return 1===(t=+t)?gn:function(n,e){return e-n?vn(n,e,t):cp(isNaN(n)?e:n)}}function gn(t,n){var e=n-t;return e?dn(t,e):cp(isNaN(t)?n:t)}function mn(t){return function(n){var e,r,i=n.length,o=new Array(i),u=new Array(i),a=new Array(i);for(e=0;e<i;++e)r=Vt(n[e]),o[e]=r.r||0,u[e]=r.g||0,a[e]=r.b||0;return o=t(o),u=t(u),a=t(a),r.opacity=1,function(t){return r.r=o(t),r.g=u(t),r.b=a(t),r+""}}}function xn(t){return function(){return t}}function bn(t){return function(n){return t(n)+""}}function wn(t){return"none"===t?wp:(ep||(ep=document.createElement("DIV"),rp=document.documentElement,ip=document.defaultView),ep.style.transform=t,t=ip.getComputedStyle(rp.appendChild(ep),null).getPropertyValue("transform"),rp.removeChild(ep),t=t.slice(7,-1).split(","),Mp(+t[0],+t[1],+t[2],+t[3],+t[4],+t[5]))}function Mn(t){return null==t?wp:(op||(op=document.createElementNS("http://www.w3.org/2000/svg","g")),op.setAttribute("transform",t),(t=op.transform.baseVal.consolidate())?(t=t.matrix,Mp(t.a,t.b,t.c,t.d,t.e,t.f)):wp)}function Tn(t,n,e,r){function i(t){return t.length?t.pop()+" ":""}function o(t,r,i,o,u,a){if(t!==i||r!==o){var c=u.push("translate(",null,n,null,e);a.push({i:c-4,x:dp(t,i)},{i:c-2,x:dp(r,o)})}else(i||o)&&u.push("translate("+i+n+o+e)}function u(t,n,e,o){t!==n?(t-n>180?n+=360:n-t>180&&(t+=360),o.push({i:e.push(i(e)+"rotate(",null,r)-2,x:dp(t,n)})):n&&e.push(i(e)+"rotate("+n+r)}function a(t,n,e,o){t!==n?o.push({i:e.push(i(e)+"skewX(",null,r)-2,x:dp(t,n)}):n&&e.push(i(e)+"skewX("+n+r)}function c(t,n,e,r,o,u){if(t!==e||n!==r){var a=o.push(i(o)+"scale(",null,",",null,")");u.push({i:a-4,x:dp(t,e)},{i:a-2,x:dp(n,r)})}else 1===e&&1===r||o.push(i(o)+"scale("+e+","+r+")")}return function(n,e){var r=[],i=[];return n=t(n),e=t(e),o(n.translateX,n.translateY,e.translateX,e.translateY,r,i),u(n.rotate,e.rotate,r,i),a(n.skewX,e.skewX,r,i),c(n.scaleX,n.scaleY,e.scaleX,e.scaleY,r,i),n=e=null,function(t){for(var n,e=-1,o=i.length;++e<o;)r[(n=i[e]).i]=n.x(t);return r.join("")}}}function Nn(t){return((t=Math.exp(t))+1/t)/2}function kn(t){return((t=Math.exp(t))-1/t)/2}function Sn(t){return((t=Math.exp(2*t))-1)/(t+1)}function En(t){return function(n,e){var r=t((n=Gt(n)).h,(e=Gt(e)).h),i=gn(n.s,e.s),o=gn(n.l,e.l),u=gn(n.opacity,e.opacity);return function(t){return n.h=r(t),n.s=i(t),n.l=o(t),n.opacity=u(t),n+""}}}function An(t,n){var e=gn((t=tn(t)).l,(n=tn(n)).l),r=gn(t.a,n.a),i=gn(t.b,n.b),o=gn(t.opacity,n.opacity);return function(n){return t.l=e(n),t.a=r(n),t.b=i(n),t.opacity=o(n),t+""}}function Cn(t){return function(n,e){var r=t((n=cn(n)).h,(e=cn(e)).h),i=gn(n.c,e.c),o=gn(n.l,e.l),u=gn(n.opacity,e.opacity);return function(t){return n.h=r(t),n.c=i(t),n.l=o(t),n.opacity=u(t),n+""}}}function zn(t){return function n(e){function r(n,r){var i=t((n=ln(n)).h,(r=ln(r)).h),o=gn(n.s,r.s),u=gn(n.l,r.l),a=gn(n.opacity,r.opacity);return function(t){return n.h=i(t),n.s=o(t),n.l=u(Math.pow(t,e)),n.opacity=a(t),n+""}}return e=+e,r.gamma=n,r}(1)}function Pn(){for(var t,n=0,e=arguments.length,r={};n<e;++n){if(!(t=arguments[n]+"")||t in r)throw new Error("illegal type: "+t);r[t]=[]}return new Rn(r)}function Rn(t){this._=t}function qn(t,n){return t.trim().split(/^|\s+/).map(function(t){var e="",r=t.indexOf(".");if(r>=0&&(e=t.slice(r+1),t=t.slice(0,r)),t&&!n.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:e}})}function Ln(t,n){for(var e,r=0,i=t.length;r<i;++r)if((e=t[r]).name===n)return e.value}function Un(t,n,e){for(var r=0,i=t.length;r<i;++r)if(t[r].name===n){t[r]=Op,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=e&&t.push({name:n,value:e}),t}function Dn(t){return new Function("d","return {"+t.map(function(t,n){return JSON.stringify(t)+": d["+n+"]"}).join(",")+"}")}function On(t,n){var e=Dn(t);return function(r,i){return n(e(r),i,t)}}function Fn(t){var n=Object.create(null),e=[];return t.forEach(function(t){for(var r in t)r in n||e.push(n[r]=r)}),e}function In(t){return function(n,e){t(null==n?e:null)}}function Yn(t){var n=t.responseType;return n&&"text"!==n?t.response:t.responseText}function Bn(t,n){return function(e){return t(e.responseText,n)}}function jn(){return hd||(vd(Hn),hd=dd.now()+pd)}function Hn(){hd=0}function Xn(){this._call=this._time=this._next=null}function Vn(t,n,e){var r=new Xn;return r.restart(t,n,e),r}function Wn(){jn(),++ad;for(var t,n=Fp;n;)(t=hd-n._time)>=0&&n._call.call(null,t),n=n._next;--ad}function $n(){hd=(ld=dd.now())+pd,ad=cd=0;try{Wn()}finally{ad=0,Gn(),hd=0}}function Zn(){var t=dd.now(),n=t-ld;n>fd&&(pd-=n,ld=t)}function Gn(){for(var t,n,e=Fp,r=1/0;e;)e._call?(r>e._time&&(r=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:Fp=n);Ip=t,Jn(r)}function Jn(t){if(!ad){cd&&(cd=clearTimeout(cd));var n=t-hd;n>24?(t<1/0&&(cd=setTimeout($n,n)),sd&&(sd=clearInterval(sd))):(sd||(sd=setInterval(Zn,fd)),ad=1,vd($n))}}function Qn(t,n,e,r){function i(n){return t(n=new Date(+n)),n}return i.floor=i,i.ceil=function(e){return t(e=new Date(e-1)),n(e,1),t(e),e},i.round=function(t){var n=i(t),e=i.ceil(t);return t-n<e-t?n:e},i.offset=function(t,e){return n(t=new Date(+t),null==e?1:Math.floor(e)),t},i.range=function(e,r,o){var u=[];if(e=i.ceil(e),o=null==o?1:Math.floor(o),!(e<r&&o>0))return u;do u.push(new Date(+e));while(n(e,o),t(e),e<r);return u},i.filter=function(e){return Qn(function(n){if(n>=n)for(;t(n),!e(n);)n.setTime(n-1)},function(t,r){if(t>=t)for(;--r>=0;)for(;n(t,1),!e(t););})},e&&(i.count=function(n,r){return gd.setTime(+n),md.setTime(+r),t(gd),t(md),Math.floor(e(gd,md))},i.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?i.filter(r?function(n){return r(n)%t===0}:function(n){return i.count(0,n)%t===0}):i:null}),i}function Kn(t){return Qn(function(n){n.setDate(n.getDate()-(n.getDay()+7-t)%7),n.setHours(0,0,0,0)},function(t,n){t.setDate(t.getDate()+7*n)},function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*Md)/kd})}function te(t){return Qn(function(n){n.setUTCDate(n.getUTCDate()-(n.getUTCDay()+7-t)%7),n.setUTCHours(0,0,0,0)},function(t,n){t.setUTCDate(t.getUTCDate()+7*n)},function(t,n){return(n-t)/kd})}function ne(t){if(!(n=zv.exec(t)))throw new Error("invalid format: "+t);var n,e=n[1]||" ",r=n[2]||">",i=n[3]||"-",o=n[4]||"",u=!!n[5],a=n[6]&&+n[6],c=!!n[7],s=n[8]&&+n[8].slice(1),f=n[9]||"";"n"===f?(c=!0,f="g"):Cv[f]||(f=""),(u||"0"===e&&"="===r)&&(u=!0,e="0",r="="),this.fill=e,this.align=r,this.sign=i,this.symbol=o,this.zero=u,this.width=a,this.comma=c,this.precision=s,this.type=f}function ee(t){return t}function re(n){return Rv=Lv(n),t.format=Rv.format,t.formatPrefix=Rv.formatPrefix,Rv}function ie(t){if(0<=t.y&&t.y<100){var n=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return n.setFullYear(t.y),n}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function oe(t){if(0<=t.y&&t.y<100){var n=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return n.setUTCFullYear(t.y),n}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function ue(t){return{y:t,m:0,d:1,H:0,M:0,S:0,L:0}}function ae(t){function n(t,n){return function(e){var r,i,o,u=[],a=-1,c=0,s=t.length;for(e instanceof Date||(e=new Date(+e));++a<s;)37===t.charCodeAt(a)&&(u.push(t.slice(c,a)),null!=(i=Iv[r=t.charAt(++a)])?r=t.charAt(++a):i="e"===r?" ":"0",(o=n[r])&&(r=o(e,i)),u.push(r),c=a+1);return u.push(t.slice(c,a)),u.join("")}}function e(t,n){return function(e){var i=ue(1900),o=r(i,t,e+="",0);if(o!=e.length)return null;if("p"in i&&(i.H=i.H%12+12*i.p),"W"in i||"U"in i){"w"in i||(i.w="W"in i?1:0);var u="Z"in i?oe(ue(i.y)).getUTCDay():n(ue(i.y)).getDay();i.m=0,i.d="W"in i?(i.w+6)%7+7*i.W-(u+5)%7:i.w+7*i.U-(u+6)%7}return"Z"in i?(i.H+=i.Z/100|0,i.M+=i.Z%100,oe(i)):n(i)}}function r(t,n,e,r){for(var i,o,u=0,a=n.length,c=e.length;u<a;){if(r>=c)return-1;if(i=n.charCodeAt(u++),37===i){if(i=n.charAt(u++),o=B[i in Iv?n.charAt(u++):i],!o||(r=o(t,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}function i(t,n,e){var r=C.exec(n.slice(e));return r?(t.p=z[r[0].toLowerCase()],e+r[0].length):-1}function o(t,n,e){var r=q.exec(n.slice(e));return r?(t.w=L[r[0].toLowerCase()],e+r[0].length):-1}function u(t,n,e){var r=P.exec(n.slice(e));return r?(t.w=R[r[0].toLowerCase()],e+r[0].length):-1}function a(t,n,e){var r=O.exec(n.slice(e));return r?(t.m=F[r[0].toLowerCase()],e+r[0].length):-1}function c(t,n,e){var r=U.exec(n.slice(e));return r?(t.m=D[r[0].toLowerCase()],e+r[0].length):-1}function s(t,n,e){return r(t,w,n,e)}function f(t,n,e){return r(t,M,n,e)}function l(t,n,e){return r(t,T,n,e)}function h(t){return S[t.getDay()]}function p(t){return k[t.getDay()]}function d(t){return A[t.getMonth()]}function v(t){return E[t.getMonth()]}function _(t){return N[+(t.getHours()>=12)]}function y(t){return S[t.getUTCDay()]}function g(t){return k[t.getUTCDay()]}function m(t){return A[t.getUTCMonth()]}function x(t){return E[t.getUTCMonth()]}function b(t){return N[+(t.getUTCHours()>=12)]}var w=t.dateTime,M=t.date,T=t.time,N=t.periods,k=t.days,S=t.shortDays,E=t.months,A=t.shortMonths,C=fe(N),z=le(N),P=fe(k),R=le(k),q=fe(S),L=le(S),U=fe(E),D=le(E),O=fe(A),F=le(A),I={a:h,A:p,b:d,B:v,c:null,d:ke,e:ke,H:Se,I:Ee,j:Ae,L:Ce,m:ze,M:Pe,p:_,S:Re,U:qe,w:Le,W:Ue,x:null,X:null,y:De,Y:Oe,Z:Fe,"%":tr},Y={a:y,A:g,b:m,B:x,c:null,d:Ie,e:Ie,H:Ye,I:Be,j:je,L:He,m:Xe,M:Ve,p:b,S:We,U:$e,w:Ze,W:Ge,x:null,X:null,y:Je,Y:Qe,Z:Ke,"%":tr},B={a:o,A:u,b:a,B:c,c:s,d:me,e:me,H:be,I:be,j:xe,L:Te,m:ge,M:we,p:i,S:Me,U:pe,w:he,W:de,x:f,X:l,y:_e,Y:ve,Z:ye,"%":Ne};return I.x=n(M,I),I.X=n(T,I),I.c=n(w,I),Y.x=n(M,Y),Y.X=n(T,Y),Y.c=n(w,Y),{format:function(t){var e=n(t+="",I);return e.toString=function(){return t},e},parse:function(t){var n=e(t+="",ie);return n.toString=function(){return t},n},utcFormat:function(t){var e=n(t+="",Y);return e.toString=function(){return t},e},utcParse:function(t){var n=e(t,oe);return n.toString=function(){return t},n}}}function ce(t,n,e){var r=t<0?"-":"",i=(r?-t:t)+"",o=i.length;return r+(o<e?new Array(e-o+1).join(n)+i:i)}function se(t){return t.replace(jv,"\\$&")}function fe(t){return new RegExp("^(?:"+t.map(se).join("|")+")","i")}function le(t){for(var n={},e=-1,r=t.length;++e<r;)n[t[e].toLowerCase()]=e;return n}function he(t,n,e){var r=Yv.exec(n.slice(e,e+1));return r?(t.w=+r[0],e+r[0].length):-1}function pe(t,n,e){var r=Yv.exec(n.slice(e));return r?(t.U=+r[0],e+r[0].length):-1}function de(t,n,e){var r=Yv.exec(n.slice(e));return r?(t.W=+r[0],e+r[0].length):-1}function ve(t,n,e){var r=Yv.exec(n.slice(e,e+4));return r?(t.y=+r[0],e+r[0].length):-1}function _e(t,n,e){var r=Yv.exec(n.slice(e,e+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),e+r[0].length):-1}function ye(t,n,e){var r=/^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(n.slice(e,e+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),e+r[0].length):-1}function ge(t,n,e){var r=Yv.exec(n.slice(e,e+2));return r?(t.m=r[0]-1,e+r[0].length):-1}function me(t,n,e){var r=Yv.exec(n.slice(e,e+2));return r?(t.d=+r[0],e+r[0].length):-1}function xe(t,n,e){var r=Yv.exec(n.slice(e,e+3));return r?(t.m=0,t.d=+r[0],e+r[0].length):-1}function be(t,n,e){var r=Yv.exec(n.slice(e,e+2));return r?(t.H=+r[0],e+r[0].length):-1}function we(t,n,e){var r=Yv.exec(n.slice(e,e+2));return r?(t.M=+r[0],e+r[0].length):-1}function Me(t,n,e){var r=Yv.exec(n.slice(e,e+2));return r?(t.S=+r[0],e+r[0].length):-1}function Te(t,n,e){var r=Yv.exec(n.slice(e,e+3));return r?(t.L=+r[0],e+r[0].length):-1}function Ne(t,n,e){var r=Bv.exec(n.slice(e,e+1));return r?e+r[0].length:-1}function ke(t,n){return ce(t.getDate(),n,2)}function Se(t,n){return ce(t.getHours(),n,2)}function Ee(t,n){return ce(t.getHours()%12||12,n,2)}function Ae(t,n){return ce(1+Rd.count(Jd(t),t),n,3)}function Ce(t,n){return ce(t.getMilliseconds(),n,3)}function ze(t,n){return ce(t.getMonth()+1,n,2)}function Pe(t,n){return ce(t.getMinutes(),n,2)}function Re(t,n){return ce(t.getSeconds(),n,2)}function qe(t,n){return ce(Ld.count(Jd(t),t),n,2)}function Le(t){return t.getDay()}function Ue(t,n){return ce(Ud.count(Jd(t),t),n,2)}function De(t,n){return ce(t.getFullYear()%100,n,2)}function Oe(t,n){return ce(t.getFullYear()%1e4,n,4)}function Fe(t){var n=t.getTimezoneOffset();return(n>0?"-":(n*=-1,"+"))+ce(n/60|0,"0",2)+ce(n%60,"0",2)}function Ie(t,n){return ce(t.getUTCDate(),n,2)}function Ye(t,n){return ce(t.getUTCHours(),n,2)}function Be(t,n){return ce(t.getUTCHours()%12||12,n,2)}function je(t,n){return ce(1+rv.count(bv(t),t),n,3)}function He(t,n){return ce(t.getUTCMilliseconds(),n,3)}function Xe(t,n){return ce(t.getUTCMonth()+1,n,2)}function Ve(t,n){return ce(t.getUTCMinutes(),n,2)}function We(t,n){return ce(t.getUTCSeconds(),n,2)}function $e(t,n){return ce(ov.count(bv(t),t),n,2)}function Ze(t){return t.getUTCDay()}function Ge(t,n){return ce(uv.count(bv(t),t),n,2)}function Je(t,n){return ce(t.getUTCFullYear()%100,n,2)}function Qe(t,n){return ce(t.getUTCFullYear()%1e4,n,4)}function Ke(){return"+0000"}function tr(){return"%"}function nr(n){return Uv=ae(n),t.timeFormat=Uv.format,t.timeParse=Uv.parse,t.utcFormat=Uv.utcFormat,t.utcParse=Uv.utcParse,Uv}function er(t){return t.toISOString()}function rr(t){var n=new Date(t);return isNaN(n)?null:n}function ir(t){function n(n){var o=n+"",u=e.get(o);if(!u){if(i!==Gv)return i;e.set(o,u=r.push(n))}return t[(u-1)%t.length]}var e=o(),r=[],i=Gv;return t=null==t?[]:Zv.call(t),n.domain=function(t){if(!arguments.length)return r.slice();r=[],e=o();for(var i,u,a=-1,c=t.length;++a<c;)e.has(u=(i=t[a])+"")||e.set(u,r.push(i));return n},n.range=function(e){return arguments.length?(t=Zv.call(e),n):t.slice()},n.unknown=function(t){return arguments.length?(i=t,n):i},n.copy=function(){return ir().domain(r).range(t).unknown(i)},n}function or(){function t(){var t=i().length,r=u[1]<u[0],l=u[r-0],h=u[1-r];n=(h-l)/Math.max(1,t-c+2*s),a&&(n=Math.floor(n)),l+=(h-l-n*(t-c))*f,e=n*(1-c),a&&(l=Math.round(l),e=Math.round(e));var p=Os(t).map(function(t){return l+n*t});return o(r?p.reverse():p)}var n,e,r=ir().unknown(void 0),i=r.domain,o=r.range,u=[0,1],a=!1,c=0,s=0,f=.5;return delete r.unknown,r.domain=function(n){return arguments.length?(i(n),t()):i()},r.range=function(n){return arguments.length?(u=[+n[0],+n[1]],t()):u.slice()},r.rangeRound=function(n){return u=[+n[0],+n[1]],a=!0,t()},r.bandwidth=function(){return e},r.step=function(){return n},r.round=function(n){return arguments.length?(a=!!n,t()):a},r.padding=function(n){return arguments.length?(c=s=Math.max(0,Math.min(1,n)),t()):c},r.paddingInner=function(n){return arguments.length?(c=Math.max(0,Math.min(1,n)),t()):c},r.paddingOuter=function(n){return arguments.length?(s=Math.max(0,Math.min(1,n)),t()):s},r.align=function(n){return arguments.length?(f=Math.max(0,Math.min(1,n)),t()):f},r.copy=function(){return or().domain(i()).range(u).round(a).paddingInner(c).paddingOuter(s).align(f)},t()}function ur(t){var n=t.copy;return t.padding=t.paddingOuter,delete t.paddingInner,delete t.paddingOuter,t.copy=function(){return ur(n())},t}function ar(){return ur(or().paddingInner(1))}function cr(t,n){return(n-=t=+t)?function(e){return(e-t)/n}:Jv(n)}function sr(t){return function(n,e){var r=t(n=+n,e=+e);return function(t){return t<=n?0:t>=e?1:r(t)}}}function fr(t){return function(n,e){var r=t(n=+n,e=+e);return function(t){return t<=0?n:t>=1?e:r(t)}}}function lr(t,n,e,r){var i=t[0],o=t[1],u=n[0],a=n[1];return o<i?(i=e(o,i),u=r(a,u)):(i=e(i,o),u=r(u,a)),function(t){return u(i(t))}}function hr(t,n,e,r){var i=Math.min(t.length,n.length)-1,o=new Array(i),u=new Array(i),a=-1;for(t[i]<t[0]&&(t=t.slice().reverse(),n=n.slice().reverse());++a<i;)o[a]=e(t[a],t[a+1]),u[a]=r(n[a],n[a+1]);return function(n){var e=ks(t,n,1,i)-1;return u[e](o[e](n))}}function pr(t,n){return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())}function dr(t,n){function e(){return i=Math.min(a.length,c.length)>2?hr:lr,o=u=null,r}function r(n){return(o||(o=i(a,c,f?sr(t):t,s)))(+n)}var i,o,u,a=Kv,c=Kv,s=mp,f=!1;return r.invert=function(t){return(u||(u=i(c,a,cr,f?fr(n):n)))(+t)},r.domain=function(t){return arguments.length?(a=$v.call(t,Qv),e()):a.slice()},r.range=function(t){return arguments.length?(c=Zv.call(t),e()):c.slice()},r.rangeRound=function(t){return c=Zv.call(t),s=xp,e()},r.clamp=function(t){return arguments.length?(f=!!t,e()):f},r.interpolate=function(t){return arguments.length?(s=t,e()):s},e()}function vr(t){var n=t.domain;return t.ticks=function(t){var e=n();return Bs(e[0],e[e.length-1],null==t?10:t)},t.tickFormat=function(t,e){return t_(n(),t,e)},t.nice=function(r){var i=n(),o=i.length-1,u=null==r?10:r,a=i[0],c=i[o],s=e(a,c,u);return s&&(s=e(Math.floor(a/s)*s,Math.ceil(c/s)*s,u),i[0]=Math.floor(a/s)*s,i[o]=Math.ceil(c/s)*s,n(i)),t},t}function _r(){var t=dr(cr,dp);return t.copy=function(){return pr(t,_r())},vr(t)}function yr(){function t(t){return+t}var n=[0,1];return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=$v.call(e,Qv),t):n.slice()},t.copy=function(){return yr().domain(n)},vr(t)}function gr(t,n){return(n=Math.log(n/t))?function(e){return Math.log(e/t)/n}:Jv(n)}function mr(t,n){return t<0?function(e){return-Math.pow(-n,e)*Math.pow(-t,1-e)}:function(e){return Math.pow(n,e)*Math.pow(t,1-e)}}function xr(t){return isFinite(t)?+("1e"+t):t<0?0:t}function br(t){return 10===t?xr:t===Math.E?Math.exp:function(n){return Math.pow(t,n)}}function wr(t){return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),function(n){return Math.log(n)/t})}function Mr(t){return function(n){return-t(-n)}}function Tr(){function n(){return o=wr(i),u=br(i),r()[0]<0&&(o=Mr(o),u=Mr(u)),e}var e=dr(gr,mr).domain([1,10]),r=e.domain,i=10,o=wr(10),u=br(10);return e.base=function(t){return arguments.length?(i=+t,n()):i},e.domain=function(t){return arguments.length?(r(t),n()):r()},e.ticks=function(t){var n,e=r(),a=e[0],c=e[e.length-1];(n=c<a)&&(h=a,a=c,c=h);var s,f,l,h=o(a),p=o(c),d=null==t?10:+t,v=[];if(!(i%1)&&p-h<d){if(h=Math.round(h)-1,p=Math.round(p)+1,a>0){for(;h<p;++h)for(f=1,s=u(h);f<i;++f)if(l=s*f,!(l<a)){if(l>c)break;v.push(l)}}else for(;h<p;++h)for(f=i-1,s=u(h);f>=1;--f)if(l=s*f,!(l<a)){if(l>c)break;v.push(l)}}else v=Bs(h,p,Math.min(p-h,d)).map(u);return n?v.reverse():v},e.tickFormat=function(n,r){if(null==r&&(r=10===i?".0e":","),"function"!=typeof r&&(r=t.format(r)),n===1/0)return r;null==n&&(n=10);var a=Math.max(1,i*n/e.ticks().length);return function(t){var n=t/u(Math.round(o(t)));return n*i<i-.5&&(n*=i),n<=a?r(t):""}},e.nice=function(){return r(n_(r(),{floor:function(t){return u(Math.floor(o(t)))},ceil:function(t){return u(Math.ceil(o(t)))}}))},e.copy=function(){return pr(e,Tr().base(i))},e}function Nr(t,n){return t<0?-Math.pow(-t,n):Math.pow(t,n)}function kr(){function t(t,n){return(n=Nr(n,e)-(t=Nr(t,e)))?function(r){return(Nr(r,e)-t)/n}:Jv(n)}function n(t,n){return n=Nr(n,e)-(t=Nr(t,e)),function(r){return Nr(t+n*r,1/e)}}var e=1,r=dr(t,n),i=r.domain;return r.exponent=function(t){return arguments.length?(e=+t,i(i())):e},r.copy=function(){return pr(r,kr().exponent(e))},vr(r)}function Sr(){return kr().exponent(.5)}function Er(){function t(){var t=0,o=Math.max(1,r.length);for(i=new Array(o-1);++t<o;)i[t-1]=Xs(e,t/o);return n}function n(t){if(!isNaN(t=+t))return r[ks(i,t)]}var e=[],r=[],i=[];return n.invertExtent=function(t){var n=r.indexOf(t);return n<0?[NaN,NaN]:[n>0?i[n-1]:e[0],n<i.length?i[n]:e[e.length-1]]},n.domain=function(n){if(!arguments.length)return e.slice();e=[];for(var r,i=0,o=n.length;i<o;++i)r=n[i],null==r||isNaN(r=+r)||e.push(r);return e.sort(Ms),t()},n.range=function(n){return arguments.length?(r=Zv.call(n),t()):r.slice()},n.quantiles=function(){return i.slice()},n.copy=function(){return Er().domain(e).range(r)},n}function Ar(){function t(t){if(t<=t)return u[ks(o,t,0,i)]}function n(){var n=-1;for(o=new Array(i);++n<i;)o[n]=((n+1)*r-(n-i)*e)/(i+1);return t}var e=0,r=1,i=1,o=[.5],u=[0,1];return t.domain=function(t){return arguments.length?(e=+t[0],r=+t[1],n()):[e,r]},t.range=function(t){return arguments.length?(i=(u=Zv.call(t)).length-1,n()):u.slice()},t.invertExtent=function(t){var n=u.indexOf(t);return n<0?[NaN,NaN]:n<1?[e,o[0]]:n>=i?[o[i-1],r]:[o[n-1],o[n]]},t.copy=function(){return Ar().domain([e,r]).range(u)},vr(t)}function Cr(){function t(t){if(t<=t)return e[ks(n,t,0,r)]}var n=[.5],e=[0,1],r=1;return t.domain=function(i){return arguments.length?(n=Zv.call(i),r=Math.min(n.length,e.length-1),t):n.slice()},t.range=function(i){return arguments.length?(e=Zv.call(i),r=Math.min(n.length,e.length-1),t):e.slice()},t.invertExtent=function(t){var r=e.indexOf(t);return[n[r-1],n[r]]},t.copy=function(){return Cr().domain(n).range(e)},t}function zr(t){return new Date(t);
}function Pr(t){return t instanceof Date?+t:+new Date(+t)}function Rr(t,n,r,i,o,u,a,c,s){function f(e){return(a(e)<e?v:u(e)<e?_:o(e)<e?y:i(e)<e?g:n(e)<e?r(e)<e?m:x:t(e)<e?b:w)(e)}function l(n,r,i,o){if(null==n&&(n=10),"number"==typeof n){var u=Math.abs(i-r)/n,a=Ts(function(t){return t[2]}).right(M,u);a===M.length?(o=e(r/c_,i/c_,n),n=t):a?(a=M[u/M[a-1][2]<M[a][2]/u?a-1:a],o=a[1],n=a[0]):(o=e(r,i,n),n=c)}return null==o?n:n.every(o)}var h=dr(cr,dp),p=h.invert,d=h.domain,v=s(".%L"),_=s(":%S"),y=s("%I:%M"),g=s("%I %p"),m=s("%a %d"),x=s("%b %d"),b=s("%B"),w=s("%Y"),M=[[a,1,e_],[a,5,5*e_],[a,15,15*e_],[a,30,30*e_],[u,1,r_],[u,5,5*r_],[u,15,15*r_],[u,30,30*r_],[o,1,i_],[o,3,3*i_],[o,6,6*i_],[o,12,12*i_],[i,1,o_],[i,2,2*o_],[r,1,u_],[n,1,a_],[n,3,3*a_],[t,1,c_]];return h.invert=function(t){return new Date(p(t))},h.domain=function(t){return arguments.length?d($v.call(t,Pr)):d().map(zr)},h.ticks=function(t,n){var e,r=d(),i=r[0],o=r[r.length-1],u=o<i;return u&&(e=i,i=o,o=e),e=l(t,i,o,n),e=e?e.range(i,o+1):[],u?e.reverse():e},h.tickFormat=function(t,n){return null==n?f:s(n)},h.nice=function(t,n){var e=d();return(t=l(t,e[0],e[e.length-1],n))?d(n_(e,t)):h},h.copy=function(){return pr(h,Rr(t,n,r,i,o,u,a,c,s))},h}function qr(t){var n=t.length;return function(e){return t[Math.max(0,Math.min(n-1,Math.floor(e*n)))]}}function Lr(t){function n(n){var o=(n-e)/(r-e);return t(i?Math.max(0,Math.min(1,o)):o)}var e=0,r=1,i=!1;return n.domain=function(t){return arguments.length?(e=+t[0],r=+t[1],n):[e,r]},n.clamp=function(t){return arguments.length?(i=!!t,n):i},n.interpolator=function(e){return arguments.length?(t=e,n):t},n.copy=function(){return Lr(t).domain([e,r]).clamp(i)},vr(n)}function Ur(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===N_&&n.documentElement.namespaceURI===N_?n.createElement(t):n.createElementNS(e,t)}}function Dr(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function Or(){return new Fr}function Fr(){this._="@"+(++A_).toString(36)}function Ir(t,n,e){return t=Yr(t,n,e),function(n){var e=n.relatedTarget;e&&(e===this||8&e.compareDocumentPosition(this))||t.call(this,n)}}function Yr(n,e,r){return function(i){var o=t.event;t.event=i;try{n.call(this,this.__data__,e,r)}finally{t.event=o}}}function Br(t){return t.trim().split(/^|\s+/).map(function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}})}function jr(t){return function(){var n=this.__on;if(n){for(var e,r=0,i=-1,o=n.length;r<o;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.capture);++i?n.length=i:delete this.__on}}}function Hr(t,n,e){var r=q_.hasOwnProperty(t.type)?Ir:Yr;return function(i,o,u){var a,c=this.__on,s=r(n,o,u);if(c)for(var f=0,l=c.length;f<l;++f)if((a=c[f]).type===t.type&&a.name===t.name)return this.removeEventListener(a.type,a.listener,a.capture),this.addEventListener(a.type,a.listener=s,a.capture=e),void(a.value=n);this.addEventListener(t.type,s,e),a={type:t.type,name:t.name,value:n,listener:s,capture:e},c?c.push(a):this.__on=[a]}}function Xr(n,e,r,i){var o=t.event;n.sourceEvent=t.event,t.event=n;try{return e.apply(r,i)}finally{t.event=o}}function Vr(){}function Wr(){return[]}function $r(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}function Zr(t,n,e,r,i,o){for(var u,a=0,c=n.length,s=o.length;a<s;++a)(u=n[a])?(u.__data__=o[a],r[a]=u):e[a]=new $r(t,o[a]);for(;a<c;++a)(u=n[a])&&(i[a]=u)}function Gr(t,n,e,r,i,o,u){var a,c,s,f={},l=n.length,h=o.length,p=new Array(l);for(a=0;a<l;++a)(c=n[a])&&(p[a]=s=$_+u.call(c,c.__data__,a,n),s in f?i[a]=c:f[s]=c);for(a=0;a<h;++a)s=$_+u.call(t,o[a],a,o),(c=f[s])?(r[a]=c,c.__data__=o[a],f[s]=null):e[a]=new $r(t,o[a]);for(a=0;a<l;++a)(c=n[a])&&f[p[a]]===c&&(i[a]=c)}function Jr(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function Qr(t){return function(){this.removeAttribute(t)}}function Kr(t){return function(){this.removeAttributeNS(t.space,t.local)}}function ti(t,n){return function(){this.setAttribute(t,n)}}function ni(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function ei(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function ri(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}function ii(t){return function(){this.style.removeProperty(t)}}function oi(t,n,e){return function(){this.style.setProperty(t,n,e)}}function ui(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}function ai(t){return function(){delete this[t]}}function ci(t,n){return function(){this[t]=n}}function si(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function fi(t){return t.trim().split(/^|\s+/)}function li(t){return t.classList||new hi(t)}function hi(t){this._node=t,this._names=fi(t.getAttribute("class")||"")}function pi(t,n){for(var e=li(t),r=-1,i=n.length;++r<i;)e.add(n[r])}function di(t,n){for(var e=li(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}function vi(t){return function(){pi(this,t)}}function _i(t){return function(){di(this,t)}}function yi(t,n){return function(){(n.apply(this,arguments)?pi:di)(this,t)}}function gi(){this.textContent=""}function mi(t){return function(){this.textContent=t}}function xi(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function bi(){this.innerHTML=""}function wi(t){return function(){this.innerHTML=t}}function Mi(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function Ti(){this.nextSibling&&this.parentNode.appendChild(this)}function Ni(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function ki(){return null}function Si(){var t=this.parentNode;t&&t.removeChild(this)}function Ei(t,n,e){var r=ay(t),i=r.CustomEvent;i?i=new i(n,e):(i=r.document.createEvent("Event"),e?(i.initEvent(n,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}function Ai(t,n){return function(){return Ei(this,t,n)}}function Ci(t,n){return function(){return Ei(this,t,n.apply(this,arguments))}}function zi(t,n){this._groups=t,this._parents=n}function Pi(){return new zi([[document.documentElement]],xy)}function Ri(t,n){var e=t.__transition;if(!e||!(e=e[n])||e.state>Sy)throw new Error("too late");return e}function qi(t,n){var e=t.__transition;if(!e||!(e=e[n])||e.state>Ay)throw new Error("too late");return e}function Li(t,n){var e=t.__transition;if(!e||!(e=e[n]))throw new Error("too late");return e}function Ui(t,n,e){function r(t){e.state=Ey,e.timer.restart(i,e.delay,e.time),e.delay<=t&&i(t-e.delay)}function i(r){var s,f,l,h;if(e.state!==Ey)return u();for(s in c)if(h=c[s],h.name===e.name){if(h.state===Cy)return _d(i);h.state===zy?(h.state=Ry,h.timer.stop(),h.on.call("interrupt",t,t.__data__,h.index,h.group),delete c[s]):+s<n&&(h.state=Ry,h.timer.stop(),delete c[s])}if(_d(function(){e.state===Cy&&(e.state=zy,e.timer.restart(o,e.delay,e.time),o(r))}),e.state=Ay,e.on.call("start",t,t.__data__,e.index,e.group),e.state===Ay){for(e.state=Cy,a=new Array(l=e.tween.length),s=0,f=-1;s<l;++s)(h=e.tween[s].value.call(t,t.__data__,e.index,e.group))&&(a[++f]=h);a.length=f+1}}function o(n){for(var r=n<e.duration?e.ease.call(null,n/e.duration):(e.timer.restart(u),e.state=Py,1),i=-1,o=a.length;++i<o;)a[i].call(null,r);e.state===Py&&(e.on.call("end",t,t.__data__,e.index,e.group),u())}function u(){e.state=Ry,e.timer.stop(),delete c[n];for(var r in c)return;delete t.__transition}var a,c=t.__transition;c[n]=e,e.timer=Vn(r,0,e.time)}function Di(t,n){var e,r;return function(){var i=qi(this,t),o=i.tween;if(o!==e){r=e=o;for(var u=0,a=r.length;u<a;++u)if(r[u].name===n){r=r.slice(),r.splice(u,1);break}}i.tween=r}}function Oi(t,n,e){var r,i;if("function"!=typeof e)throw new Error;return function(){var o=qi(this,t),u=o.tween;if(u!==r){i=(r=u).slice();for(var a={name:n,value:e},c=0,s=i.length;c<s;++c)if(i[c].name===n){i[c]=a;break}c===s&&i.push(a)}o.tween=i}}function Fi(t,n,e){var r=t._id;return t.each(function(){var t=qi(this,r);(t.value||(t.value={}))[n]=e.apply(this,arguments)}),function(t){return Li(t,r).value[n]}}function Ii(t){return function(){this.removeAttribute(t)}}function Yi(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Bi(t,n,e){var r,i;return function(){var o=this.getAttribute(t);return o===e?null:o===r?i:i=n(r=o,e)}}function ji(t,n,e){var r,i;return function(){var o=this.getAttributeNS(t.space,t.local);return o===e?null:o===r?i:i=n(r=o,e)}}function Hi(t,n,e){var r,i,o;return function(){var u,a=e(this);return null==a?void this.removeAttribute(t):(u=this.getAttribute(t),u===a?null:u===r&&a===i?o:o=n(r=u,i=a))}}function Xi(t,n,e){var r,i,o;return function(){var u,a=e(this);return null==a?void this.removeAttributeNS(t.space,t.local):(u=this.getAttributeNS(t.space,t.local),u===a?null:u===r&&a===i?o:o=n(r=u,i=a))}}function Vi(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttributeNS(t.space,t.local,r(n))}}return e._value=n,e}function Wi(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttribute(t,r(n))}}return e._value=n,e}function $i(t,n){return function(){Ri(this,t).delay=+n.apply(this,arguments)}}function Zi(t,n){return n=+n,function(){Ri(this,t).delay=n}}function Gi(t,n){return function(){qi(this,t).duration=+n.apply(this,arguments)}}function Ji(t,n){return n=+n,function(){qi(this,t).duration=n}}function Qi(t,n){if("function"!=typeof n)throw new Error;return function(){qi(this,t).ease=n}}function Ki(t){return(t+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||"start"===t})}function to(t,n,e){var r,i,o=Ki(n)?Ri:qi;return function(){var u=o(this,t),a=u.on;a!==r&&(i=(r=a).copy()).on(n,e),u.on=i}}function no(t){return function(){var n=this.parentNode;for(var e in this.__transition)if(+e!==t)return;n&&n.removeChild(this)}}function eo(t,n){var e,r,i;return function(){var o=ay(this).getComputedStyle(this,null),u=o.getPropertyValue(t),a=(this.style.removeProperty(t),o.getPropertyValue(t));return u===a?null:u===e&&a===r?i:i=n(e=u,r=a)}}function ro(t){return function(){this.style.removeProperty(t)}}function io(t,n,e){var r,i;return function(){var o=ay(this).getComputedStyle(this,null).getPropertyValue(t);return o===e?null:o===r?i:i=n(r=o,e)}}function oo(t,n,e){var r,i,o;return function(){var u=ay(this).getComputedStyle(this,null),a=u.getPropertyValue(t),c=e(this);return null==c&&(this.style.removeProperty(t),c=u.getPropertyValue(t)),a===c?null:a===r&&c===i?o:o=n(r=a,i=c)}}function uo(t,n,e){function r(){var r=this,i=n.apply(r,arguments);return i&&function(n){r.style.setProperty(t,i(n),e)}}return r._value=n,r}function ao(t){return function(){this.textContent=t}}function co(t){return function(){var n=t(this);this.textContent=null==n?"":n}}function so(t,n,e,r){this._groups=t,this._parents=n,this._name=e,this._id=r}function fo(t){return Pi().transition(t)}function lo(){return++eg}function ho(t,n){for(var e;!(e=t.__transition)||!(e=e[n]);)if(!(t=t.parentNode))return ig.time=jn(),ig;return e}function po(t,n,e){var r=t(e);return"translate("+(isFinite(r)?r:n(e))+",0)"}function vo(t,n,e){var r=t(e);return"translate(0,"+(isFinite(r)?r:n(e))+")"}function _o(t){var n=t.bandwidth()/2;return t.round()&&(n=Math.round(n)),function(e){return t(e)+n}}function yo(){return!this.__axis}function go(t,n){function e(e){var s,f=null==i?n.ticks?n.ticks.apply(n,r):n.domain():i,l=null==o?n.tickFormat?n.tickFormat.apply(n,r):sg:o,h=Math.max(u,0)+c,p=t===fg||t===hg?po:vo,d=n.range(),v=d[0]+.5,_=d[d.length-1]+.5,y=(n.bandwidth?_o:sg)(n.copy()),g=e.selection?e.selection():e,m=g.selectAll(".domain").data([null]),x=g.selectAll(".tick").data(f,n).order(),b=x.exit(),w=x.enter().append("g").attr("class","tick"),M=x.select("line"),T=x.select("text"),N=t===fg||t===pg?-1:1,k=t===pg||t===lg?(s="x","y"):(s="y","x");m=m.merge(m.enter().insert("path",".tick").attr("class","domain").attr("stroke","#000")),x=x.merge(w),M=M.merge(w.append("line").attr("stroke","#000").attr(s+"2",N*u).attr(k+"1",.5).attr(k+"2",.5)),T=T.merge(w.append("text").attr("fill","#000").attr(s,N*h).attr(k,.5).attr("dy",t===fg?"0em":t===hg?"0.71em":"0.32em")),e!==g&&(m=m.transition(e),x=x.transition(e),M=M.transition(e),T=T.transition(e),b=b.transition(e).attr("opacity",dg).attr("transform",function(t){return p(y,this.parentNode.__axis||y,t)}),w.attr("opacity",dg).attr("transform",function(t){return p(this.parentNode.__axis||y,y,t)})),b.remove(),m.attr("d",t===pg||t==lg?"M"+N*a+","+v+"H0.5V"+_+"H"+N*a:"M"+v+","+N*a+"V0.5H"+_+"V"+N*a),x.attr("opacity",1).attr("transform",function(t){return p(y,y,t)}),M.attr(s+"2",N*u),T.attr(s,N*h).text(l),g.filter(yo).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===lg?"start":t===pg?"end":"middle"),g.each(function(){this.__axis=y})}var r=[],i=null,o=null,u=6,a=6,c=3;return e.scale=function(t){return arguments.length?(n=t,e):n},e.ticks=function(){return r=cg.call(arguments),e},e.tickArguments=function(t){return arguments.length?(r=null==t?[]:cg.call(t),e):r.slice()},e.tickValues=function(t){return arguments.length?(i=null==t?null:cg.call(t),e):i&&i.slice()},e.tickFormat=function(t){return arguments.length?(o=t,e):o},e.tickSize=function(t){return arguments.length?(u=a=+t,e):u},e.tickSizeInner=function(t){return arguments.length?(u=+t,e):u},e.tickSizeOuter=function(t){return arguments.length?(a=+t,e):a},e.tickPadding=function(t){return arguments.length?(c=+t,e):c},e}function mo(t){return go(fg,t)}function xo(t){return go(lg,t)}function bo(t){return go(hg,t)}function wo(t){return go(pg,t)}function Mo(t,n){return t.parent===n.parent?1:2}function To(t){return t.reduce(No,0)/t.length}function No(t,n){return t+n.x}function ko(t){return 1+t.reduce(So,0)}function So(t,n){return Math.max(t,n.y)}function Eo(t){for(var n;n=t.children;)t=n[0];return t}function Ao(t){for(var n;n=t.children;)t=n[n.length-1];return t}function Co(t,n){if(t===n)return t;var e=t.ancestors(),r=n.ancestors(),i=null;for(t=e.pop(),n=r.pop();t===n;)i=t,t=e.pop(),n=r.pop();return i}function zo(t,n){var e,r,i,o,u,a=new Uo(t),c=+t.value&&(a.value=t.value),s=[a];for(null==n&&(n=Ro);e=s.pop();)if(c&&(e.value=+e.data.value),(i=n(e.data))&&(u=i.length))for(e.children=new Array(u),o=u-1;o>=0;--o)s.push(r=e.children[o]=new Uo(i[o])),r.parent=e,r.depth=e.depth+1;return a.eachBefore(Lo)}function Po(){return zo(this).eachBefore(qo)}function Ro(t){return t.children}function qo(t){t.data=t.data.data}function Lo(t){var n=0;do t.height=n;while((t=t.parent)&&t.height<++n)}function Uo(t){this.data=t,this.depth=this.height=0,this.parent=null}function Do(t){this._=t,this.next=null}function Oo(t,n){var e=n.x-t.x,r=n.y-t.y,i=t.r-n.r;return i*i+1e-6>e*e+r*r}function Fo(t,n){var e,r,i,o=null,u=t.head;switch(n.length){case 1:e=Io(n[0]);break;case 2:e=Yo(n[0],n[1]);break;case 3:e=Bo(n[0],n[1],n[2])}for(;u;)i=u._,r=u.next,e&&Oo(e,i)?o=u:(o?(t.tail=o,o.next=null):t.head=t.tail=null,n.push(i),e=Fo(t,n),n.pop(),t.head?(u.next=t.head,t.head=u):(u.next=null,t.head=t.tail=u),o=t.tail,o.next=r),u=r;return t.tail=o,e}function Io(t){return{x:t.x,y:t.y,r:t.r}}function Yo(t,n){var e=t.x,r=t.y,i=t.r,o=n.x,u=n.y,a=n.r,c=o-e,s=u-r,f=a-i,l=Math.sqrt(c*c+s*s);return{x:(e+o+c/l*f)/2,y:(r+u+s/l*f)/2,r:(l+i+a)/2}}function Bo(t,n,e){var r=t.x,i=t.y,o=t.r,u=n.x,a=n.y,c=n.r,s=e.x,f=e.y,l=e.r,h=2*(r-u),p=2*(i-a),d=2*(c-o),v=r*r+i*i-o*o-u*u-a*a+c*c,_=2*(r-s),y=2*(i-f),g=2*(l-o),m=r*r+i*i-o*o-s*s-f*f+l*l,x=_*p-h*y,b=(p*m-y*v)/x-r,w=(y*d-p*g)/x,M=(_*v-h*m)/x-i,T=(h*g-_*d)/x,N=w*w+T*T-1,k=2*(b*w+M*T+o),S=b*b+M*M-o*o,E=(-k-Math.sqrt(k*k-4*N*S))/(2*N);return{x:b+w*E+r,y:M+T*E+i,r:E}}function jo(t,n,e){var r=t.x,i=t.y,o=n.r+e.r,u=t.r+e.r,a=n.x-r,c=n.y-i,s=a*a+c*c;if(s){var f=.5+((u*=u)-(o*=o))/(2*s),l=Math.sqrt(Math.max(0,2*o*(u+s)-(u-=s)*u-o*o))/(2*s);e.x=r+f*a+l*c,e.y=i+f*c-l*a}else e.x=r+u,e.y=i}function Ho(t,n){var e=n.x-t.x,r=n.y-t.y,i=t.r+n.r;return i*i>e*e+r*r}function Xo(t,n,e){var r=t.x-n,i=t.y-e;return r*r+i*i}function Vo(t){this._=t,this.next=null,this.previous=null}function Wo(t){if(!(i=t.length))return 0;var n,e,r,i;if(n=t[0],n.x=0,n.y=0,!(i>1))return n.r;if(e=t[1],n.x=-e.r,e.x=n.r,e.y=0,!(i>2))return n.r+e.r;jo(e,n,r=t[2]);var o,u,a,c,s,f,l,h=n.r*n.r,p=e.r*e.r,d=r.r*r.r,v=h+p+d,_=h*n.x+p*e.x+d*r.x,y=h*n.y+p*e.y+d*r.y;n=new Vo(n),e=new Vo(e),r=new Vo(r),n.next=r.previous=e,e.next=n.previous=r,r.next=e.previous=n;t:for(a=3;a<i;++a){if(jo(n._,e._,r=t[a]),r=new Vo(r),(s=n.previous)===(c=e.next)){if(Ho(c._,r._)){n=e,e=c,--a;continue t}}else{f=c._.r,l=s._.r;do if(f<=l){if(Ho(c._,r._)){e=c,n.next=e,e.previous=n,--a;continue t}c=c.next,f+=c._.r}else{if(Ho(s._,r._)){n=s,n.next=e,e.previous=n,--a;continue t}s=s.previous,l+=s._.r}while(c!==s.next)}for(r.previous=n,r.next=e,n.next=e.previous=e=r,v+=d=r._.r*r._.r,_+=d*r._.x,y+=d*r._.y,h=Xo(n._,o=_/v,u=y/v);(r=r.next)!==e;)(d=Xo(r._,o,u))<h&&(n=r,h=d);e=n.next}for(n=[e._],r=e;(r=r.next)!==e;)n.push(r._);for(r=Sg(n),a=0;a<i;++a)n=t[a],n.x-=r.x,n.y-=r.y;return r.r}function $o(t){return null==t?null:Zo(t)}function Zo(t){if("function"!=typeof t)throw new Error;return t}function Go(){return 0}function Jo(t){return Math.sqrt(t.value)}function Qo(t){return function(n){n.children||(n.r=Math.max(0,+t(n)||0))}}function Ko(t,n){return function(e){if(r=e.children){var r,i,o,u=r.length,a=t(e)*n||0;if(a)for(i=0;i<u;++i)r[i].r+=a;if(o=Wo(r),a)for(i=0;i<u;++i)r[i].r-=a;e.r=o+a}}}function tu(t){return function(n){var e=n.parent;n.r*=t,e&&(n.x=e.x+t*n.x,n.y=e.y+t*n.y)}}function nu(t){return t.id}function eu(t){return t.parentId}function ru(t,n){return t.parent===n.parent?1:2}function iu(t){var n=t.children;return n?n[0]:t.t}function ou(t){var n=t.children;return n?n[n.length-1]:t.t}function uu(t,n,e){var r=e/(n.i-t.i);n.c-=r,n.s+=e,t.c+=r,n.z+=e,n.m+=e}function au(t){for(var n,e=0,r=0,i=t.children,o=i.length;--o>=0;)n=i[o],n.z+=e,n.m+=e,e+=n.s+(r+=n.c)}function cu(t,n,e){return t.a.parent===n.parent?t.a:e}function su(t,n){this._=t,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=n}function fu(t){for(var n,e,r,i,o,u=new su(t,0),a=[u];n=a.pop();)if(r=n._.children)for(n.children=new Array(o=r.length),i=o-1;i>=0;--i)a.push(e=n.children[i]=new su(r[i],i)),e.parent=n;return(u.parent=new su(null,0)).children=[u],u}function lu(t,n,e,r,i,o){for(var u,a,c,s,f,l,h,p,d,v,_,y=[],g=n.children,m=0,x=0,b=g.length,w=n.value;m<b;){c=i-e,s=o-r;do f=g[x++].value;while(!f&&x<b);for(l=h=f,v=Math.max(s/c,c/s)/(w*t),_=f*f*v,d=Math.max(h/_,_/l);x<b;++x){if(f+=a=g[x].value,a<l&&(l=a),a>h&&(h=a),_=f*f*v,p=Math.max(h/_,_/l),p>d){f-=a;break}d=p}y.push(u={value:f,dice:c<s,children:g.slice(m,x)}),u.dice?Pg(u,e,r,i,w?r+=s*f/w:o):Fg(u,e,r,w?e+=c*f/w:i,o),w-=f,m=x}return y}function hu(t){return t.x+t.vx}function pu(t){return t.y+t.vy}function du(t){return t.index}function vu(t,n){var e=t.get(n);if(!e)throw new Error("missing: "+n);return e}function _u(t){return t.x}function yu(t){return t.y}function gu(){t.event.stopImmediatePropagation()}function mu(t,n){var e=t.document.documentElement,r=by(t).on("dragstart.drag",null);n&&(r.on("click.drag",rm,!0),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in e?r.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}function xu(t,n,e,r,i,o,u,a,c,s){this.target=t,this.type=n,this.subject=e,this.identifier=r,this.active=i,this.x=o,this.y=u,this.dx=a,this.dy=c,this._=s}function bu(){return!t.event.button}function wu(){return this.parentNode}function Mu(n){return null==n?{x:t.event.x,y:t.event.y}:n}function Tu(t){return t[0]}function Nu(t){return t[1]}function ku(){this._=null}function Su(t){t.U=t.C=t.L=t.R=t.P=t.N=null}function Eu(t,n){var e=n,r=n.R,i=e.U;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function Au(t,n){var e=n,r=n.L,i=e.U;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function Cu(t){for(;t.L;)t=t.L;return t}function zu(t,n,e,r){var i=[null,null],o=hm.push(i)-1;return i.left=t,i.right=n,e&&Ru(i,t,n,e),r&&Ru(i,n,t,r),fm[t.index].halfedges.push(o),fm[n.index].halfedges.push(o),i}function Pu(t,n,e){var r=[n,e];return r.left=t,r}function Ru(t,n,e,r){t[0]||t[1]?t.left===e?t[1]=r:t[0]=r:(t[0]=r,t.left=n,t.right=e)}function qu(t,n,e,r,i){var o,u=t[0],a=t[1],c=u[0],s=u[1],f=a[0],l=a[1],h=0,p=1,d=f-c,v=l-s;if(o=n-c,d||!(o>0)){if(o/=d,d<0){if(o<h)return;o<p&&(p=o)}else if(d>0){if(o>p)return;o>h&&(h=o)}if(o=r-c,d||!(o<0)){if(o/=d,d<0){if(o>p)return;o>h&&(h=o)}else if(d>0){if(o<h)return;o<p&&(p=o)}if(o=e-s,v||!(o>0)){if(o/=v,v<0){if(o<h)return;o<p&&(p=o)}else if(v>0){if(o>p)return;o>h&&(h=o)}if(o=i-s,v||!(o<0)){if(o/=v,v<0){if(o>p)return;o>h&&(h=o)}else if(v>0){if(o<h)return;o<p&&(p=o)}return!(h>0||p<1)||(h>0&&(t[0]=[c+h*d,s+h*v]),p<1&&(t[1]=[c+p*d,s+p*v]),!0)}}}}}function Lu(t,n,e,r,i){var o=t[1];if(o)return!0;var u,a,c=t[0],s=t.left,f=t.right,l=s[0],h=s[1],p=f[0],d=f[1],v=(l+p)/2,_=(h+d)/2;if(d===h){if(v<n||v>=r)return;if(l>p){if(c){if(c[1]>=i)return}else c=[v,e];o=[v,i]}else{if(c){if(c[1]<e)return}else c=[v,i];o=[v,e]}}else if(u=(l-p)/(d-h),a=_-u*v,u<-1||u>1)if(l>p){if(c){if(c[1]>=i)return}else c=[(e-a)/u,e];o=[(i-a)/u,i]}else{if(c){if(c[1]<e)return}else c=[(i-a)/u,i];o=[(e-a)/u,e]}else if(h<d){if(c){if(c[0]>=r)return}else c=[n,u*n+a];o=[r,u*r+a]}else{if(c){if(c[0]<n)return}else c=[r,u*r+a];o=[n,u*n+a]}return t[0]=c,t[1]=o,!0}function Uu(t,n,e,r){for(var i,o=hm.length;o--;)Lu(i=hm[o],t,n,e,r)&&qu(i,t,n,e,r)&&(Math.abs(i[0][0]-i[1][0])>vm||Math.abs(i[0][1]-i[1][1])>vm)||delete hm[o]}function Du(t){return fm[t.index]={site:t,halfedges:[]}}function Ou(t,n){var e=t.site,r=n.left,i=n.right;return e===i&&(i=r,r=e),i?Math.atan2(i[1]-r[1],i[0]-r[0]):(e===r?(r=n[1],i=n[0]):(r=n[0],i=n[1]),Math.atan2(r[0]-i[0],i[1]-r[1]))}function Fu(t,n){return n[+(n.left!==t.site)]}function Iu(t,n){return n[+(n.left===t.site)]}function Yu(){for(var t,n,e,r,i=0,o=fm.length;i<o;++i)if((t=fm[i])&&(r=(n=t.halfedges).length)){var u=new Array(r),a=new Array(r);for(e=0;e<r;++e)u[e]=e,a[e]=Ou(t,hm[n[e]]);for(u.sort(function(t,n){return a[n]-a[t]}),e=0;e<r;++e)a[e]=n[u[e]];for(e=0;e<r;++e)n[e]=a[e]}}function Bu(t,n,e,r){var i,o,u,a,c,s,f,l,h,p,d,v,_=fm.length,y=!0;for(i=0;i<_;++i)if(o=fm[i]){for(u=o.site,c=o.halfedges,a=c.length;a--;)hm[c[a]]||c.splice(a,1);for(a=0,s=c.length;a<s;)p=Iu(o,hm[c[a]]),d=p[0],v=p[1],f=Fu(o,hm[c[++a%s]]),l=f[0],h=f[1],(Math.abs(d-l)>vm||Math.abs(v-h)>vm)&&(c.splice(a,0,hm.push(Pu(u,p,Math.abs(d-t)<vm&&r-v>vm?[t,Math.abs(l-t)<vm?h:r]:Math.abs(v-r)<vm&&e-d>vm?[Math.abs(h-r)<vm?l:e,r]:Math.abs(d-e)<vm&&v-n>vm?[e,Math.abs(l-e)<vm?h:n]:Math.abs(v-n)<vm&&d-t>vm?[Math.abs(h-n)<vm?l:t,n]:null))-1),++s);s&&(y=!1)}if(y){var g,m,x,b=1/0;for(i=0,y=null;i<_;++i)(o=fm[i])&&(u=o.site,g=u[0]-t,m=u[1]-n,x=g*g+m*m,x<b&&(b=x,y=o));if(y){var w=[t,n],M=[t,r],T=[e,r],N=[e,n];y.halfedges.push(hm.push(Pu(u=y.site,w,M))-1,hm.push(Pu(u,M,T))-1,hm.push(Pu(u,T,N))-1,hm.push(Pu(u,N,w))-1)}}for(i=0;i<_;++i)(o=fm[i])&&(o.halfedges.length||delete fm[i])}function ju(){Su(this),this.x=this.y=this.arc=this.site=this.cy=null}function Hu(t){var n=t.P,e=t.N;if(n&&e){var r=n.site,i=t.site,o=e.site;if(r!==o){var u=i[0],a=i[1],c=r[0]-u,s=r[1]-a,f=o[0]-u,l=o[1]-a,h=2*(c*l-s*f);if(!(h>=-_m)){var p=c*c+s*s,d=f*f+l*l,v=(l*p-s*d)/h,_=(c*d-f*p)/h,y=pm.pop()||new ju;y.arc=t,y.site=i,y.x=v+u,y.y=(y.cy=_+a)+Math.sqrt(v*v+_*_),t.circle=y;for(var g=null,m=lm._;m;)if(y.y<m.y||y.y===m.y&&y.x<=m.x){if(!m.L){g=m.P;break}m=m.L}else{if(!m.R){g=m;break}m=m.R}lm.insert(g,y),g||(cm=y)}}}}function Xu(t){var n=t.circle;n&&(n.P||(cm=n.N),lm.remove(n),pm.push(n),Su(n),t.circle=null)}function Vu(){Su(this),this.edge=this.site=this.circle=null}function Wu(t){var n=dm.pop()||new Vu;return n.site=t,n}function $u(t){Xu(t),sm.remove(t),dm.push(t),Su(t)}function Zu(t){var n=t.circle,e=n.x,r=n.cy,i=[e,r],o=t.P,u=t.N,a=[t];$u(t);for(var c=o;c.circle&&Math.abs(e-c.circle.x)<vm&&Math.abs(r-c.circle.cy)<vm;)o=c.P,a.unshift(c),$u(c),c=o;a.unshift(c),Xu(c);for(var s=u;s.circle&&Math.abs(e-s.circle.x)<vm&&Math.abs(r-s.circle.cy)<vm;)u=s.N,a.push(s),$u(s),s=u;a.push(s),Xu(s);var f,l=a.length;for(f=1;f<l;++f)s=a[f],c=a[f-1],Ru(s.edge,c.site,s.site,i);c=a[0],s=a[l-1],s.edge=zu(c.site,s.site,null,i),Hu(c),Hu(s)}function Gu(t){for(var n,e,r,i,o=t[0],u=t[1],a=sm._;a;)if(r=Ju(a,u)-o,r>vm)a=a.L;else{if(i=o-Qu(a,u),!(i>vm)){r>-vm?(n=a.P,e=a):i>-vm?(n=a,e=a.N):n=e=a;break}if(!a.R){n=a;break}a=a.R}Du(t);var c=Wu(t);if(sm.insert(n,c),n||e){if(n===e)return Xu(n),e=Wu(n.site),sm.insert(c,e),c.edge=e.edge=zu(n.site,c.site),Hu(n),void Hu(e);if(!e)return void(c.edge=zu(n.site,c.site));Xu(n),Xu(e);var s=n.site,f=s[0],l=s[1],h=t[0]-f,p=t[1]-l,d=e.site,v=d[0]-f,_=d[1]-l,y=2*(h*_-p*v),g=h*h+p*p,m=v*v+_*_,x=[(_*g-p*m)/y+f,(h*m-v*g)/y+l];Ru(e.edge,s,d,x),c.edge=zu(s,t,null,x),e.edge=zu(t,d,null,x),Hu(n),Hu(e)}}function Ju(t,n){var e=t.site,r=e[0],i=e[1],o=i-n;if(!o)return r;var u=t.P;if(!u)return-(1/0);e=u.site;var a=e[0],c=e[1],s=c-n;if(!s)return a;var f=a-r,l=1/o-1/s,h=f/s;return l?(-h+Math.sqrt(h*h-2*l*(f*f/(-2*s)-c+s/2+i-o/2)))/l+r:(r+a)/2}function Qu(t,n){var e=t.N;if(e)return Ju(e,n);var r=t.site;return r[1]===n?r[0]:1/0}function Ku(t,n,e){return(t[0]-e[0])*(n[1]-t[1])-(t[0]-n[0])*(e[1]-t[1])}function ta(t,n){return n[1]-t[1]||n[0]-t[0]}function na(t,n){var e,r,i,o=t.sort(ta).pop();for(hm=[],fm=new Array(t.length),sm=new ku,lm=new ku;;)if(i=cm,o&&(!i||o[1]<i.y||o[1]===i.y&&o[0]<i.x))o[0]===e&&o[1]===r||(Gu(o),e=o[0],r=o[1]),o=t.pop();else{if(!i)break;Zu(i.arc)}if(Yu(),n){var u=+n[0][0],a=+n[0][1],c=+n[1][0],s=+n[1][1];Uu(u,a,c,s),Bu(u,a,c,s)}this.edges=hm,this.cells=fm,sm=lm=hm=fm=null}function ea(t,n,e){this.target=t,this.type=n,this.transform=e}function ra(t,n,e){this.k=t,this.x=n,this.y=e}function ia(t){return t.__zoom||mm}function oa(){t.event.stopImmediatePropagation()}function ua(){return!t.event.button}function aa(){var t,n,e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,t=e.width.baseVal.value,n=e.height.baseVal.value):(t=e.clientWidth,n=e.clientHeight),[[0,0],[t,n]]}function ca(){return this.__zoom||mm}function sa(){t.event.stopImmediatePropagation()}function fa(t){return{type:t}}function la(){return!t.event.button}function ha(){var t=this.ownerSVGElement||this;return[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]}function pa(t){for(;!t.__brush;)if(!(t=t.parentNode))return;return t.__brush}function da(t){return t[0][0]===t[1][0]||t[0][1]===t[1][1]}function va(t){var n=t.__brush;return n?n.dim.output(n.selection):null}function _a(){return ga(Am)}function ya(){return ga(Cm)}function ga(n){function e(t){var e=t.property("__brush",a).selectAll(".overlay").data([fa("overlay")]);e.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",Pm.overlay).merge(e).each(function(){var t=pa(this).extent;by(this).attr("x",t[0][0]).attr("y",t[0][1]).attr("width",t[1][0]-t[0][0]).attr("height",t[1][1]-t[0][1])}),t.selectAll(".selection").data([fa("selection")]).enter().append("rect").attr("class","selection").attr("cursor",Pm.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges");var i=t.selectAll(".handle").data(n.handles,function(t){return t.type});i.exit().remove(),i.enter().append("rect").attr("class",function(t){return"handle handle--"+t.type}).attr("cursor",function(t){return Pm[t.type]}),t.each(r).attr("fill","none").attr("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush touchstart.brush",u)}function r(){var t=by(this),n=pa(this).selection;n?(t.selectAll(".selection").style("display",null).attr("x",n[0][0]).attr("y",n[0][1]).attr("width",n[1][0]-n[0][0]).attr("height",n[1][1]-n[0][1]),t.selectAll(".handle").style("display",null).attr("x",function(t){return"e"===t.type[t.type.length-1]?n[1][0]-h/2:n[0][0]-h/2}).attr("y",function(t){return"s"===t.type[0]?n[1][1]-h/2:n[0][1]-h/2}).attr("width",function(t){return"n"===t.type||"s"===t.type?n[1][0]-n[0][0]+h:h}).attr("height",function(t){return"e"===t.type||"w"===t.type?n[1][1]-n[0][1]+h:h})):t.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)}function i(t,n){return t.__brush.emitter||new o(t,n)}function o(t,n){this.that=t,this.args=n,this.state=t.__brush,this.active=0}function u(){function e(){var t=F_(T);!U||w||M||(Math.abs(t[0]-O[0])>Math.abs(t[1]-O[1])?M=!0:w=!0),O=t,b=!0,Tm(),o()}function o(){var t;switch(m=O[0]-D[0],x=O[1]-D[1],k){case km:case Nm:S&&(m=Math.max(P-l,Math.min(q-v,m)),h=l+m,_=v+m),E&&(x=Math.max(R-p,Math.min(L-y,x)),d=p+x,g=y+x);break;case Sm:S<0?(m=Math.max(P-l,Math.min(q-l,m)),h=l+m,_=v):S>0&&(m=Math.max(P-v,Math.min(q-v,m)),h=l,_=v+m),E<0?(x=Math.max(R-p,Math.min(L-p,x)),d=p+x,g=y):E>0&&(x=Math.max(R-y,Math.min(L-y,x)),d=p,g=y+x);break;case Em:S&&(h=Math.max(P,Math.min(q,l-m*S)),_=Math.max(P,Math.min(q,v+m*S))),E&&(d=Math.max(R,Math.min(L,p-x*E)),g=Math.max(R,Math.min(L,y+x*E)))}_<h&&(S*=-1,t=l,l=v,v=t,t=h,h=_,_=t,N in Rm&&Y.attr("cursor",Pm[N=Rm[N]])),g<d&&(E*=-1,t=p,p=y,y=t,t=d,d=g,g=t,N in qm&&Y.attr("cursor",Pm[N=qm[N]])),A.selection&&(z=A.selection),w&&(h=z[0][0],_=z[1][0]),M&&(d=z[0][1],g=z[1][1]),z[0][0]===h&&z[0][1]===d&&z[1][0]===_&&z[1][1]===g||(A.selection=[[h,d],[_,g]],r.call(T),F.brush())}function u(){if(sa(),t.event.touches){if(t.event.touches.length)return;c&&clearTimeout(c),c=setTimeout(function(){c=null},500),I.on("touchmove.brush touchend.brush touchcancel.brush",null)}else mu(t.event.view,b),B.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null);I.attr("pointer-events","all"),Y.attr("cursor",Pm.overlay),A.selection&&(z=A.selection),da(z)&&(A.selection=null,r.call(T)),F.end()}function a(){switch(t.event.keyCode){case 16:U=S&&E;break;case 18:k===Sm&&(S&&(v=_-m*S,l=h+m*S),E&&(y=g-x*E,p=d+x*E),k=Em,o());break;case 32:k!==Sm&&k!==Em||(S<0?v=_-m:S>0&&(l=h-m),E<0?y=g-x:E>0&&(p=d-x),k=km,Y.attr("cursor",Pm.selection),o());break;default:return}Tm()}function s(){switch(t.event.keyCode){case 16:U&&(w=M=U=!1,o());break;case 18:k===Em&&(S<0?v=_:S>0&&(l=h),E<0?y=g:E>0&&(p=d),k=Sm,o());break;case 32:k===km&&(t.event.altKey?(S&&(v=_-m*S,l=h+m*S),E&&(y=g-x*E,p=d+x*E),k=Em):(S<0?v=_:S>0&&(l=h),E<0?y=g:E>0&&(p=d),k=Sm),Y.attr("cursor",Pm[N]),o());break;default:return}Tm()}if(t.event.touches){if(t.event.changedTouches.length<t.event.touches.length)return Tm()}else if(c)return;if(f.apply(this,arguments)){var l,h,p,d,v,_,y,g,m,x,b,w,M,T=this,N=t.event.target.__data__.type,k="selection"===(t.event.metaKey?N="overlay":N)?Nm:t.event.altKey?Em:Sm,S=n===Cm?null:Lm[N],E=n===Am?null:Um[N],A=pa(T),C=A.extent,z=A.selection,P=C[0][0],R=C[0][1],q=C[1][0],L=C[1][1],U=S&&E&&t.event.shiftKey,D=F_(T),O=D,F=i(T,arguments).beforestart();"overlay"===N?A.selection=z=[[l=n===Cm?P:D[0],p=n===Am?R:D[1]],[v=n===Cm?q:l,y=n===Am?L:p]]:(l=z[0][0],p=z[0][1],v=z[1][0],y=z[1][1]),h=l,d=p,_=v,g=y;var I=by(T).attr("pointer-events","none"),Y=I.selectAll(".overlay").attr("cursor",Pm[N]);if(t.event.touches)I.on("touchmove.brush",e,!0).on("touchend.brush touchcancel.brush",u,!0);else{var B=by(t.event.view).on("keydown.brush",a,!0).on("keyup.brush",s,!0).on("mousemove.brush",e,!0).on("mouseup.brush",u,!0);im(t.event.view)}sa(),Ly(T),r.call(T),F.start()}}function a(){var t=this.__brush||{selection:null};return t.extent=s.apply(this,arguments),t.dim=n,t}var c,s=ha,f=la,l=Pn(e,"start","brush","end"),h=6;return e.move=function(t,e){t.selection?t.on("start.brush",function(){i(this,arguments).beforestart().start()}).on("interrupt.brush end.brush",function(){i(this,arguments).end()}).tween("brush",function(){function t(t){u.selection=1===t&&da(s)?null:f(t),r.call(o),a.brush()}var o=this,u=o.__brush,a=i(o,arguments),c=u.selection,s=n.input("function"==typeof e?e.apply(this,arguments):e,u.extent),f=mp(c,s);
    return c&&s?t:t(1)}):t.each(function(){var t=this,o=arguments,u=t.__brush,a=n.input("function"==typeof e?e.apply(t,o):e,u.extent),c=i(t,o).beforestart();Ly(t),u.selection=null==a||da(a)?null:a,r.call(t),c.start().brush().end()})},o.prototype={beforestart:function(){return 1===++this.active&&(this.state.emitter=this,this.starting=!0),this},start:function(){return this.starting&&(this.starting=!1,this.emit("start")),this},brush:function(){return this.emit("brush"),this},end:function(){return 0===--this.active&&(delete this.state.emitter,this.emit("end")),this},emit:function(t){Xr(new Mm(e,t,n.output(this.state.selection)),l.apply,l,[t,this.that,this.args])}},e.extent=function(t){return arguments.length?(s="function"==typeof t?t:wm([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),e):s},e.filter=function(t){return arguments.length?(f="function"==typeof t?t:wm(!!t),e):f},e.handleSize=function(t){return arguments.length?(h=+t,e):h},e.on=function(){var t=l.on.apply(l,arguments);return t===l?e:t},e}function ma(t){return function(n,e){return t(n.source.value+n.target.value,e.source.value+e.target.value)}}function xa(t){return t.source}function ba(t){return t.target}function wa(t){return t.radius}function Ma(t){return t.startAngle}function Ta(t){return t.endAngle}function Na(){this.reset()}function ka(t,n,e){var r=t.s=n+e,i=r-n,o=r-i;t.t=n-o+(e-i)}function Sa(t){return t>1?0:t<-1?Ax:Math.acos(t)}function Ea(t){return t>1?Cx:t<-1?-Cx:Math.asin(t)}function Aa(t){return(t=jx(t/2))*t}function Ca(){}function za(t,n){t&&$x.hasOwnProperty(t.type)&&$x[t.type](t,n)}function Pa(t,n,e){var r,i=-1,o=t.length-e;for(n.lineStart();++i<o;)r=t[i],n.point(r[0],r[1],r[2]);n.lineEnd()}function Ra(t,n){var e=-1,r=t.length;for(n.polygonStart();++e<r;)Pa(t[e],n,1);n.polygonEnd()}function qa(){Qx.point=Ua}function La(){Da(Zm,Gm)}function Ua(t,n){Qx.point=Da,Zm=t,Gm=n,t*=qx,n*=qx,Jm=t,Qm=Ox(n=n/2+zx),Km=jx(n)}function Da(t,n){t*=qx,n*=qx,n=n/2+zx;var e=t-Jm,r=e>=0?1:-1,i=r*e,o=Ox(n),u=jx(n),a=Km*u,c=Qm*o+a*Ox(i),s=a*r*jx(i);Gx.add(Dx(s,c)),Jm=t,Qm=o,Km=u}function Oa(t){return[Dx(t[1],t[0]),Ea(t[2])]}function Fa(t){var n=t[0],e=t[1],r=Ox(e);return[r*Ox(n),r*jx(n),jx(e)]}function Ia(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function Ya(t,n){return[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]]}function Ba(t,n){t[0]+=n[0],t[1]+=n[1],t[2]+=n[2]}function ja(t,n){return[t[0]*n,t[1]*n,t[2]*n]}function Ha(t){var n=Xx(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=n,t[1]/=n,t[2]/=n}function Xa(t,n){cx.push(sx=[tx=t,ex=t]),n<nx&&(nx=n),n>rx&&(rx=n)}function Va(t,n){var e=Fa([t*qx,n*qx]);if(ax){var r=Ya(ax,e),i=[r[1],-r[0],0],o=Ya(i,r);Ha(o),o=Oa(o);var u,a=t-ix,c=a>0?1:-1,s=o[0]*Rx*c,f=Lx(a)>180;f^(c*ix<s&&s<c*t)?(u=o[1]*Rx,u>rx&&(rx=u)):(s=(s+360)%360-180,f^(c*ix<s&&s<c*t)?(u=-o[1]*Rx,u<nx&&(nx=u)):(n<nx&&(nx=n),n>rx&&(rx=n))),f?t<ix?Qa(tx,t)>Qa(tx,ex)&&(ex=t):Qa(t,ex)>Qa(tx,ex)&&(tx=t):ex>=tx?(t<tx&&(tx=t),t>ex&&(ex=t)):t>ix?Qa(tx,t)>Qa(tx,ex)&&(ex=t):Qa(t,ex)>Qa(tx,ex)&&(tx=t)}else Xa(t,n);ax=e,ix=t}function Wa(){nb.point=Va}function $a(){sx[0]=tx,sx[1]=ex,nb.point=Xa,ax=null}function Za(t,n){if(ax){var e=t-ix;tb.add(Lx(e)>180?e+(e>0?360:-360):e)}else ox=t,ux=n;Qx.point(t,n),Va(t,n)}function Ga(){Qx.lineStart()}function Ja(){Za(ox,ux),Qx.lineEnd(),Lx(tb)>Sx&&(tx=-(ex=180)),sx[0]=tx,sx[1]=ex,ax=null}function Qa(t,n){return(n-=t)<0?n+360:n}function Ka(t,n){return t[0]-n[0]}function tc(t,n){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}function nc(t,n){t*=qx,n*=qx;var e=Ox(n);ec(e*Ox(t),e*jx(t),jx(n))}function ec(t,n,e){++fx,hx+=(t-hx)/fx,px+=(n-px)/fx,dx+=(e-dx)/fx}function rc(){rb.point=ic}function ic(t,n){t*=qx,n*=qx;var e=Ox(n);Mx=e*Ox(t),Tx=e*jx(t),Nx=jx(n),rb.point=oc,ec(Mx,Tx,Nx)}function oc(t,n){t*=qx,n*=qx;var e=Ox(n),r=e*Ox(t),i=e*jx(t),o=jx(n),u=Dx(Xx((u=Tx*o-Nx*i)*u+(u=Nx*r-Mx*o)*u+(u=Mx*i-Tx*r)*u),Mx*r+Tx*i+Nx*o);lx+=u,vx+=u*(Mx+(Mx=r)),_x+=u*(Tx+(Tx=i)),yx+=u*(Nx+(Nx=o)),ec(Mx,Tx,Nx)}function uc(){rb.point=nc}function ac(){rb.point=sc}function cc(){fc(bx,wx),rb.point=nc}function sc(t,n){bx=t,wx=n,t*=qx,n*=qx,rb.point=fc;var e=Ox(n);Mx=e*Ox(t),Tx=e*jx(t),Nx=jx(n),ec(Mx,Tx,Nx)}function fc(t,n){t*=qx,n*=qx;var e=Ox(n),r=e*Ox(t),i=e*jx(t),o=jx(n),u=Tx*o-Nx*i,a=Nx*r-Mx*o,c=Mx*i-Tx*r,s=Xx(u*u+a*a+c*c),f=Mx*r+Tx*i+Nx*o,l=s&&-Sa(f)/s,h=Dx(s,f);gx+=l*u,mx+=l*a,xx+=l*c,lx+=h,vx+=h*(Mx+(Mx=r)),_x+=h*(Tx+(Tx=i)),yx+=h*(Nx+(Nx=o)),ec(Mx,Tx,Nx)}function lc(t,n){return[t>Ax?t-Px:t<-Ax?t+Px:t,n]}function hc(t,n,e){return(t%=Px)?n||e?ub(dc(t),vc(n,e)):dc(t):n||e?vc(n,e):lc}function pc(t){return function(n,e){return n+=t,[n>Ax?n-Px:n<-Ax?n+Px:n,e]}}function dc(t){var n=pc(t);return n.invert=pc(-t),n}function vc(t,n){function e(t,n){var e=Ox(n),a=Ox(t)*e,c=jx(t)*e,s=jx(n),f=s*r+a*i;return[Dx(c*o-f*u,a*r-s*i),Ea(f*o+c*u)]}var r=Ox(t),i=jx(t),o=Ox(n),u=jx(n);return e.invert=function(t,n){var e=Ox(n),a=Ox(t)*e,c=jx(t)*e,s=jx(n),f=s*o-c*u;return[Dx(c*o+s*u,a*r+f*i),Ea(f*r-a*i)]},e}function _c(t,n,e,r,i,o){if(e){var u=Ox(n),a=jx(n),c=r*e;null==i?(i=n+r*Px,o=n-c/2):(i=yc(u,i),o=yc(u,o),(r>0?i<o:i>o)&&(i+=r*Px));for(var s,f=i;r>0?f>o:f<o;f-=c)s=Oa([u,-a*Ox(f),-a*jx(f)]),t.point(s[0],s[1])}}function yc(t,n){n=Fa(n),n[0]-=t,Ha(n);var e=Sa(-n[1]);return((-n[2]<0?-e:e)+Px-Sx)%Px}function gc(t,n,e,r){this.x=t,this.z=n,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function mc(t){if(n=t.length){for(var n,e,r=0,i=t[0];++r<n;)i.n=e=t[r],e.p=i,i=e;i.n=e=t[0],e.p=i}}function xc(t,n,e,r){function i(i,o){return t<=i&&i<=e&&n<=o&&o<=r}function o(i,o,a,s){var f=0,l=0;if(null==i||(f=u(i,a))!==(l=u(o,a))||c(i,o)<0^a>0){do s.point(0===f||3===f?t:e,f>1?r:n);while((f=(f+a+4)%4)!==l)}else s.point(o[0],o[1])}function u(r,i){return Lx(r[0]-t)<Sx?i>0?0:3:Lx(r[0]-e)<Sx?i>0?2:1:Lx(r[1]-n)<Sx?i>0?1:0:i>0?3:2}function a(t,n){return c(t.x,n.x)}function c(t,n){var e=u(t,1),r=u(n,1);return e!==r?e-r:0===e?n[1]-t[1]:1===e?t[0]-n[0]:2===e?t[1]-n[1]:n[0]-t[0]}return function(u){function c(t,n){i(t,n)&&k.point(t,n)}function s(){for(var n=0,e=0,i=_.length;e<i;++e)for(var o,u,a=_[e],c=1,s=a.length,f=a[0],l=f[0],h=f[1];c<s;++c)o=l,u=h,f=a[c],l=f[0],h=f[1],u<=r?h>r&&(l-o)*(r-u)>(h-u)*(t-o)&&++n:h<=r&&(l-o)*(r-u)<(h-u)*(t-o)&&--n;return n}function f(){k=S,v=[],_=[],N=!0}function l(){var t=s(),n=N&&t,e=(v=Js(v)).length;(n||e)&&(u.polygonStart(),n&&(u.lineStart(),o(null,null,1,u),u.lineEnd()),e&&Mb(v,a,t,o,u),u.polygonEnd()),k=u,v=_=y=null}function h(){E.point=d,_&&_.push(y=[]),T=!0,M=!1,b=w=NaN}function p(){v&&(d(g,m),x&&M&&S.rejoin(),v.push(S.result())),E.point=c,M&&k.lineEnd()}function d(o,u){var a=i(o,u);if(_&&y.push([o,u]),T)g=o,m=u,x=a,T=!1,a&&(k.lineStart(),k.point(o,u));else if(a&&M)k.point(o,u);else{var c=[b=Math.max(Nb,Math.min(Tb,b)),w=Math.max(Nb,Math.min(Tb,w))],s=[o=Math.max(Nb,Math.min(Tb,o)),u=Math.max(Nb,Math.min(Tb,u))];bb(c,s,t,n,e,r)?(M||(k.lineStart(),k.point(c[0],c[1])),k.point(s[0],s[1]),a||k.lineEnd(),N=!1):a&&(k.lineStart(),k.point(o,u),N=!1)}b=o,w=u,M=a}var v,_,y,g,m,x,b,w,M,T,N,k=u,S=xb(),E={point:c,lineStart:h,lineEnd:p,polygonStart:f,polygonEnd:l};return E}}function bc(){Eb.point=Mc,Eb.lineEnd=wc}function wc(){Eb.point=Eb.lineEnd=Ca}function Mc(t,n){t*=qx,n*=qx,ab=t,cb=jx(n),sb=Ox(n),Eb.point=Tc}function Tc(t,n){t*=qx,n*=qx;var e=jx(n),r=Ox(n),i=Lx(t-ab),o=Ox(i),u=jx(i),a=r*u,c=sb*e-cb*r*o,s=cb*e+sb*r*o;Sb.add(Dx(Xx(a*a+c*c),s)),ab=t,cb=e,sb=r}function Nc(t,n,e){var r=Os(t,n-Sx,e).concat(n);return function(t){return r.map(function(n){return[t,n]})}}function kc(t,n,e){var r=Os(t,n-Sx,e).concat(n);return function(t){return r.map(function(n){return[n,t]})}}function Sc(){function t(){return{type:"MultiLineString",coordinates:n()}}function n(){return Os(Fx(o/_)*_,i,_).map(h).concat(Os(Fx(s/y)*y,c,y).map(p)).concat(Os(Fx(r/d)*d,e,d).filter(function(t){return Lx(t%_)>Sx}).map(f)).concat(Os(Fx(a/v)*v,u,v).filter(function(t){return Lx(t%y)>Sx}).map(l))}var e,r,i,o,u,a,c,s,f,l,h,p,d=10,v=d,_=90,y=360,g=2.5;return t.lines=function(){return n().map(function(t){return{type:"LineString",coordinates:t}})},t.outline=function(){return{type:"Polygon",coordinates:[h(o).concat(p(c).slice(1),h(i).reverse().slice(1),p(s).reverse().slice(1))]}},t.extent=function(n){return arguments.length?t.extentMajor(n).extentMinor(n):t.extentMinor()},t.extentMajor=function(n){return arguments.length?(o=+n[0][0],i=+n[1][0],s=+n[0][1],c=+n[1][1],o>i&&(n=o,o=i,i=n),s>c&&(n=s,s=c,c=n),t.precision(g)):[[o,s],[i,c]]},t.extentMinor=function(n){return arguments.length?(r=+n[0][0],e=+n[1][0],a=+n[0][1],u=+n[1][1],r>e&&(n=r,r=e,e=n),a>u&&(n=a,a=u,u=n),t.precision(g)):[[r,a],[e,u]]},t.step=function(n){return arguments.length?t.stepMajor(n).stepMinor(n):t.stepMinor()},t.stepMajor=function(n){return arguments.length?(_=+n[0],y=+n[1],t):[_,y]},t.stepMinor=function(n){return arguments.length?(d=+n[0],v=+n[1],t):[d,v]},t.precision=function(n){return arguments.length?(g=+n,f=Nc(a,u,90),l=kc(r,e,g),h=Nc(s,c,90),p=kc(o,i,g),t):g},t.extentMajor([[-180,-90+Sx],[180,90-Sx]]).extentMinor([[-180,-80-Sx],[180,80+Sx]])}function Ec(){return Sc()()}function Ac(){Db.point=Cc}function Cc(t,n){Db.point=zc,fb=hb=t,lb=pb=n}function zc(t,n){Ub.add(pb*t-hb*n),hb=t,pb=n}function Pc(){zc(fb,lb)}function Rc(t,n){t<Ob&&(Ob=t),t>Ib&&(Ib=t),n<Fb&&(Fb=n),n>Yb&&(Yb=n)}function qc(t,n){jb+=t,Hb+=n,++Xb}function Lc(){Qb.point=Uc}function Uc(t,n){Qb.point=Dc,qc(_b=t,yb=n)}function Dc(t,n){var e=t-_b,r=n-yb,i=Xx(e*e+r*r);Vb+=i*(_b+t)/2,Wb+=i*(yb+n)/2,$b+=i,qc(_b=t,yb=n)}function Oc(){Qb.point=qc}function Fc(){Qb.point=Yc}function Ic(){Bc(db,vb)}function Yc(t,n){Qb.point=Bc,qc(db=_b=t,vb=yb=n)}function Bc(t,n){var e=t-_b,r=n-yb,i=Xx(e*e+r*r);Vb+=i*(_b+t)/2,Wb+=i*(yb+n)/2,$b+=i,i=yb*t-_b*n,Zb+=i*(_b+t),Gb+=i*(yb+n),Jb+=3*i,qc(_b=t,yb=n)}function jc(t){this._context=t}function Hc(){this._string=[]}function Xc(t){return"m0,"+t+"a"+t+","+t+" 0 1,1 0,"+-2*t+"a"+t+","+t+" 0 1,1 0,"+2*t+"z"}function Vc(t){return t.length>1}function Wc(t,n){return((t=t.x)[0]<0?t[1]-Cx-Sx:Cx-t[1])-((n=n.x)[0]<0?n[1]-Cx-Sx:Cx-n[1])}function $c(t){var n,e=NaN,r=NaN,i=NaN;return{lineStart:function(){t.lineStart(),n=1},point:function(o,u){var a=o>0?Ax:-Ax,c=Lx(o-e);Lx(c-Ax)<Sx?(t.point(e,r=(r+u)/2>0?Cx:-Cx),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(a,r),t.point(o,r),n=0):i!==a&&c>=Ax&&(Lx(e-i)<Sx&&(e-=i*Sx),Lx(o-a)<Sx&&(o-=a*Sx),r=Zc(e,r,o,u),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(a,r),n=0),t.point(e=o,r=u),i=a},lineEnd:function(){t.lineEnd(),e=r=NaN},clean:function(){return 2-n}}}function Zc(t,n,e,r){var i,o,u=jx(t-e);return Lx(u)>Sx?Ux((jx(n)*(o=Ox(r))*jx(e)-jx(r)*(i=Ox(n))*jx(t))/(i*o*u)):(n+r)/2}function Gc(t,n,e,r){var i;if(null==t)i=e*Cx,r.point(-Ax,i),r.point(0,i),r.point(Ax,i),r.point(Ax,0),r.point(Ax,-i),r.point(0,-i),r.point(-Ax,-i),r.point(-Ax,0),r.point(-Ax,i);else if(Lx(t[0]-n[0])>Sx){var o=t[0]<n[0]?Ax:-Ax;i=e*o/2,r.point(-o,i),r.point(0,i),r.point(o,i)}else r.point(n[0],n[1])}function Jc(t){return function(n){var e=new Qc;for(var r in t)e[r]=t[r];return e.stream=n,e}}function Qc(){}function Kc(t,n,e){var r=n[1][0]-n[0][0],i=n[1][1]-n[0][1],o=t.clipExtent&&t.clipExtent();t.scale(150).translate([0,0]),null!=o&&t.clipExtent(null),Zx(e,t.stream(Bb));var u=Bb.result(),a=Math.min(r/(u[1][0]-u[0][0]),i/(u[1][1]-u[0][1])),c=+n[0][0]+(r-a*(u[1][0]+u[0][0]))/2,s=+n[0][1]+(i-a*(u[1][1]+u[0][1]))/2;return null!=o&&t.clipExtent(o),t.scale(150*a).translate([c,s])}function ts(t,n,e){return Kc(t,[[0,0],n],e)}function ns(t){return Jc({point:function(n,e){n=t(n,e),this.stream.point(n[0],n[1])}})}function es(t,n){function e(r,i,o,u,a,c,s,f,l,h,p,d,v,_){var y=s-r,g=f-i,m=y*y+g*g;if(m>4*n&&v--){var x=u+h,b=a+p,w=c+d,M=Xx(x*x+b*b+w*w),T=Ea(w/=M),N=Lx(Lx(w)-1)<Sx||Lx(o-l)<Sx?(o+l)/2:Dx(b,x),k=t(N,T),S=k[0],E=k[1],A=S-r,C=E-i,z=g*A-y*C;(z*z/m>n||Lx((y*A+g*C)/m-.5)>.3||u*h+a*p+c*d<aw)&&(e(r,i,o,u,a,c,S,E,N,x/=M,b/=M,w,v,_),_.point(S,E),e(S,E,N,x,b,w,s,f,l,h,p,d,v,_))}}return function(n){function r(e,r){e=t(e,r),n.point(e[0],e[1])}function i(){y=NaN,w.point=o,n.lineStart()}function o(r,i){var o=Fa([r,i]),u=t(r,i);e(y,g,_,m,x,b,y=u[0],g=u[1],_=r,m=o[0],x=o[1],b=o[2],uw,n),n.point(y,g)}function u(){w.point=r,n.lineEnd()}function a(){i(),w.point=c,w.lineEnd=s}function c(t,n){o(f=t,n),l=y,h=g,p=m,d=x,v=b,w.point=o}function s(){e(y,g,_,m,x,b,l,h,f,p,d,v,uw,n),w.lineEnd=u,u()}var f,l,h,p,d,v,_,y,g,m,x,b,w={point:r,lineStart:i,lineEnd:u,polygonStart:function(){n.polygonStart(),w.lineStart=a},polygonEnd:function(){n.polygonEnd(),w.lineStart=i}};return w}}function rs(t){return is(function(){return t})()}function is(t){function n(t){return t=f(t[0]*qx,t[1]*qx),[t[0]*_+a,c-t[1]*_]}function e(t){return t=f.invert((t[0]-a)/_,(c-t[1])/_),t&&[t[0]*Rx,t[1]*Rx]}function r(t,n){return t=u(t,n),[t[0]*_+a,c-t[1]*_]}function i(){f=ub(s=hc(b,w,M),u);var t=u(m,x);return a=y-t[0]*_,c=g+t[1]*_,o()}function o(){return d=v=null,n}var u,a,c,s,f,l,h,p,d,v,_=150,y=480,g=250,m=0,x=0,b=0,w=0,M=0,T=null,N=rw,k=null,S=qb,E=.5,A=cw(r,E);return n.stream=function(t){return d&&v===t?d:d=sw(N(s,A(S(v=t))))},n.clipAngle=function(t){return arguments.length?(N=+t?iw(T=t*qx,6*qx):(T=null,rw),o()):T*Rx},n.clipExtent=function(t){return arguments.length?(S=null==t?(k=l=h=p=null,qb):xc(k=+t[0][0],l=+t[0][1],h=+t[1][0],p=+t[1][1]),o()):null==k?null:[[k,l],[h,p]]},n.scale=function(t){return arguments.length?(_=+t,i()):_},n.translate=function(t){return arguments.length?(y=+t[0],g=+t[1],i()):[y,g]},n.center=function(t){return arguments.length?(m=t[0]%360*qx,x=t[1]%360*qx,i()):[m*Rx,x*Rx]},n.rotate=function(t){return arguments.length?(b=t[0]%360*qx,w=t[1]%360*qx,M=t.length>2?t[2]%360*qx:0,i()):[b*Rx,w*Rx,M*Rx]},n.precision=function(t){return arguments.length?(A=cw(r,E=t*t),o()):Xx(E)},n.fitExtent=function(t,e){return Kc(n,t,e)},n.fitSize=function(t,e){return ts(n,t,e)},function(){return u=t.apply(this,arguments),n.invert=u.invert&&e,i()}}function os(t){var n=0,e=Ax/3,r=is(t),i=r(n,e);return i.parallels=function(t){return arguments.length?r(n=t[0]*qx,e=t[1]*qx):[n*Rx,e*Rx]},i}function us(t){function n(t,n){return[t*e,jx(n)/e]}var e=Ox(t);return n.invert=function(t,n){return[t/e,Ea(n*e)]},n}function as(t,n){function e(t,n){var e=Xx(o-2*i*jx(n))/i;return[e*jx(t*=i),u-e*Ox(t)]}var r=jx(t),i=(r+jx(n))/2;if(Lx(i)<Sx)return us(t);var o=1+r*(2*i-r),u=Xx(o)/i;return e.invert=function(t,n){var e=u-n;return[Dx(t,Lx(e))/i*Hx(e),Ea((o-(t*t+e*e)*i*i)/(2*i))]},e}function cs(t){var n=t.length;return{point:function(e,r){for(var i=-1;++i<n;)t[i].point(e,r)},sphere:function(){for(var e=-1;++e<n;)t[e].sphere()},lineStart:function(){for(var e=-1;++e<n;)t[e].lineStart()},lineEnd:function(){for(var e=-1;++e<n;)t[e].lineEnd()},polygonStart:function(){for(var e=-1;++e<n;)t[e].polygonStart()},polygonEnd:function(){for(var e=-1;++e<n;)t[e].polygonEnd()}}}function ss(t){return function(n,e){var r=Ox(n),i=Ox(e),o=t(r*i);return[o*i*jx(n),o*jx(e)]}}function fs(t){return function(n,e){var r=Xx(n*n+e*e),i=t(r),o=jx(i),u=Ox(i);return[Dx(n*o,r*u),Ea(r&&e*o/r)]}}function ls(t,n){return[t,Yx(Vx((Cx+n)/2))]}function hs(t){var n,e=rs(t),r=e.scale,i=e.translate,o=e.clipExtent;return e.scale=function(t){return arguments.length?(r(t),n&&e.clipExtent(null),e):r()},e.translate=function(t){return arguments.length?(i(t),n&&e.clipExtent(null),e):i()},e.clipExtent=function(t){if(!arguments.length)return n?null:o();if(n=null==t){var u=Ax*r(),a=i();t=[[a[0]-u,a[1]-u],[a[0]+u,a[1]+u]]}return o(t),e},e.clipExtent(null)}function ps(t){return Vx((Cx+t)/2)}function ds(t,n){function e(t,n){o>0?n<-Cx+Sx&&(n=-Cx+Sx):n>Cx-Sx&&(n=Cx-Sx);var e=o/Bx(ps(n),i);return[e*jx(i*t),o-e*Ox(i*t)]}var r=Ox(t),i=t===n?jx(t):Yx(r/Ox(n))/Yx(ps(n)/ps(t)),o=r*Bx(ps(t),i)/i;return i?(e.invert=function(t,n){var e=o-n,r=Hx(i)*Xx(t*t+e*e);return[Dx(t,Lx(e))/i*Hx(e),2*Ux(Bx(o/r,1/i))-Cx]},e):ls}function vs(t,n){return[t,n]}function _s(t,n){function e(t,n){var e=o-n,r=i*t;return[e*jx(r),o-e*Ox(r)]}var r=Ox(t),i=t===n?jx(t):(r-Ox(n))/(n-t),o=r/i+t;return Lx(i)<Sx?vs:(e.invert=function(t,n){var e=o-n;return[Dx(t,Lx(e))/i*Hx(e),o-Hx(i)*Xx(t*t+e*e)]},e)}function ys(t,n){var e=Ox(n),r=Ox(t)*e;return[e*jx(t)/r,jx(n)/r]}function gs(t,n,e,r){return 1===t&&1===n&&0===e&&0===r?qb:Jc({point:function(i,o){this.stream.point(i*t+e,o*n+r)}})}function ms(t,n){return[Ox(n)*jx(t),jx(n)]}function xs(t,n){var e=Ox(n),r=1+Ox(t)*e;return[e*jx(t)/r,jx(n)/r]}function bs(t,n){return[Yx(Vx((Cx+n)/2)),-t]}var ws="4.4.0",Ms=function(t,n){return t<n?-1:t>n?1:t>=n?0:NaN},Ts=function(t){return 1===t.length&&(t=n(t)),{left:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var o=r+i>>>1;t(n[o],e)<0?r=o+1:i=o}return r},right:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var o=r+i>>>1;t(n[o],e)>0?i=o:r=o+1}return r}}},Ns=Ts(Ms),ks=Ns.right,Ss=Ns.left,Es=function(t,n){return n<t?-1:n>t?1:n>=t?0:NaN},As=function(t){return null===t?NaN:+t},Cs=function(t,n){var e,r,i=t.length,o=0,u=0,a=-1,c=0;if(null==n)for(;++a<i;)isNaN(e=As(t[a]))||(r=e-o,o+=r/++c,u+=r*(e-o));else for(;++a<i;)isNaN(e=As(n(t[a],a,t)))||(r=e-o,o+=r/++c,u+=r*(e-o));if(c>1)return u/(c-1)},zs=function(t,n){var e=Cs(t,n);return e?Math.sqrt(e):e},Ps=function(t,n){var e,r,i,o=-1,u=t.length;if(null==n){for(;++o<u;)if(null!=(r=t[o])&&r>=r){e=i=r;break}for(;++o<u;)null!=(r=t[o])&&(e>r&&(e=r),i<r&&(i=r))}else{for(;++o<u;)if(null!=(r=n(t[o],o,t))&&r>=r){e=i=r;break}for(;++o<u;)null!=(r=n(t[o],o,t))&&(e>r&&(e=r),i<r&&(i=r))}return[e,i]},Rs=Array.prototype,qs=Rs.slice,Ls=Rs.map,Us=function(t){return function(){return t}},Ds=function(t){return t},Os=function(t,n,e){t=+t,n=+n,e=(i=arguments.length)<2?(n=t,t=0,1):i<3?1:+e;for(var r=-1,i=0|Math.max(0,Math.ceil((n-t)/e)),o=new Array(i);++r<i;)o[r]=t+r*e;return o},Fs=Math.sqrt(50),Is=Math.sqrt(10),Ys=Math.sqrt(2),Bs=function(t,n,r){var i=e(t,n,r);return Os(Math.ceil(t/i)*i,Math.floor(n/i)*i+i/2,i)},js=function(t){return Math.ceil(Math.log(t.length)/Math.LN2)+1},Hs=function(){function t(t){var i,o,u=t.length,a=new Array(u);for(i=0;i<u;++i)a[i]=n(t[i],i,t);var c=e(a),s=c[0],f=c[1],l=r(a,s,f);Array.isArray(l)||(l=Bs(s,f,l));for(var h=l.length;l[0]<=s;)l.shift(),--h;for(;l[h-1]>=f;)l.pop(),--h;var p,d=new Array(h+1);for(i=0;i<=h;++i)p=d[i]=[],p.x0=i>0?l[i-1]:s,p.x1=i<h?l[i]:f;for(i=0;i<u;++i)o=a[i],s<=o&&o<=f&&d[ks(l,o,0,h)].push(t[i]);return d}var n=Ds,e=Ps,r=js;return t.value=function(e){return arguments.length?(n="function"==typeof e?e:Us(e),t):n},t.domain=function(n){return arguments.length?(e="function"==typeof n?n:Us([n[0],n[1]]),t):e},t.thresholds=function(n){return arguments.length?(r="function"==typeof n?n:Us(Array.isArray(n)?qs.call(n):n),t):r},t},Xs=function(t,n,e){if(null==e&&(e=As),r=t.length){if((n=+n)<=0||r<2)return+e(t[0],0,t);if(n>=1)return+e(t[r-1],r-1,t);var r,i=(r-1)*n,o=Math.floor(i),u=+e(t[o],o,t),a=+e(t[o+1],o+1,t);return u+(a-u)*(i-o)}},Vs=function(t,n,e){return t=Ls.call(t,As).sort(Ms),Math.ceil((e-n)/(2*(Xs(t,.75)-Xs(t,.25))*Math.pow(t.length,-1/3)))},Ws=function(t,n,e){return Math.ceil((e-n)/(3.5*zs(t)*Math.pow(t.length,-1/3)))},$s=function(t,n){var e,r,i=-1,o=t.length;if(null==n){for(;++i<o;)if(null!=(r=t[i])&&r>=r){e=r;break}for(;++i<o;)null!=(r=t[i])&&r>e&&(e=r)}else{for(;++i<o;)if(null!=(r=n(t[i],i,t))&&r>=r){e=r;break}for(;++i<o;)null!=(r=n(t[i],i,t))&&r>e&&(e=r)}return e},Zs=function(t,n){var e,r=0,i=t.length,o=-1,u=i;if(null==n)for(;++o<i;)isNaN(e=As(t[o]))?--u:r+=e;else for(;++o<i;)isNaN(e=As(n(t[o],o,t)))?--u:r+=e;if(u)return r/u},Gs=function(t,n){var e,r=[],i=t.length,o=-1;if(null==n)for(;++o<i;)isNaN(e=As(t[o]))||r.push(e);else for(;++o<i;)isNaN(e=As(n(t[o],o,t)))||r.push(e);return Xs(r.sort(Ms),.5)},Js=function(t){for(var n,e,r,i=t.length,o=-1,u=0;++o<i;)u+=t[o].length;for(e=new Array(u);--i>=0;)for(r=t[i],n=r.length;--n>=0;)e[--u]=r[n];return e},Qs=function(t,n){var e,r,i=-1,o=t.length;if(null==n){for(;++i<o;)if(null!=(r=t[i])&&r>=r){e=r;break}for(;++i<o;)null!=(r=t[i])&&e>r&&(e=r)}else{for(;++i<o;)if(null!=(r=n(t[i],i,t))&&r>=r){e=r;break}for(;++i<o;)null!=(r=n(t[i],i,t))&&e>r&&(e=r)}return e},Ks=function(t){for(var n=0,e=t.length-1,r=t[0],i=new Array(e<0?0:e);n<e;)i[n]=[r,r=t[++n]];return i},tf=function(t,n){for(var e=n.length,r=new Array(e);e--;)r[e]=t[n[e]];return r},nf=function(t,n){if(e=t.length){var e,r,i=0,o=0,u=t[o];for(n||(n=Ms);++i<e;)(n(r=t[i],u)<0||0!==n(u,u))&&(u=r,o=i);return 0===n(u,u)?o:void 0}},ef=function(t,n,e){for(var r,i,o=(null==e?t.length:e)-(n=null==n?0:+n);o;)i=Math.random()*o--|0,r=t[o+n],t[o+n]=t[i+n],t[i+n]=r;return t},rf=function(t,n){var e,r=0,i=t.length,o=-1;if(null==n)for(;++o<i;)(e=+t[o])&&(r+=e);else for(;++o<i;)(e=+n(t[o],o,t))&&(r+=e);return r},of=function(t){if(!(o=t.length))return[];for(var n=-1,e=Qs(t,r),i=new Array(e);++n<e;)for(var o,u=-1,a=i[n]=new Array(o);++u<o;)a[u]=t[u][n];return i},uf=function(){return of(arguments)},af="$";i.prototype=o.prototype={constructor:i,has:function(t){return af+t in this},get:function(t){return this[af+t]},set:function(t,n){return this[af+t]=n,this},remove:function(t){var n=af+t;return n in this&&delete this[n]},clear:function(){for(var t in this)t[0]===af&&delete this[t]},keys:function(){var t=[];for(var n in this)n[0]===af&&t.push(n.slice(1));return t},values:function(){var t=[];for(var n in this)n[0]===af&&t.push(this[n]);return t},entries:function(){var t=[];for(var n in this)n[0]===af&&t.push({key:n.slice(1),value:this[n]});return t},size:function(){var t=0;for(var n in this)n[0]===af&&++t;return t},empty:function(){for(var t in this)if(t[0]===af)return!1;return!0},each:function(t){for(var n in this)n[0]===af&&t(this[n],n.slice(1),this)}};var cf=function(){function t(n,i,u,a){if(i>=f.length)return null!=r?r(n):null!=e?n.sort(e):n;for(var c,s,l,h=-1,p=n.length,d=f[i++],v=o(),_=u();++h<p;)(l=v.get(c=d(s=n[h])+""))?l.push(s):v.set(c,[s]);return v.each(function(n,e){a(_,e,t(n,i,u,a))}),_}function n(t,e){if(++e>f.length)return t;var i,o=l[e-1];return null!=r&&e>=f.length?i=t.entries():(i=[],t.each(function(t,r){i.push({key:r,values:n(t,e)})})),null!=o?i.sort(function(t,n){return o(t.key,n.key)}):i}var e,r,i,f=[],l=[];return i={object:function(n){return t(n,0,u,a)},map:function(n){return t(n,0,c,s)},entries:function(e){return n(t(e,0,c,s),0)},key:function(t){return f.push(t),i},sortKeys:function(t){return l[f.length-1]=t,i},sortValues:function(t){return e=t,i},rollup:function(t){return r=t,i}}},sf=o.prototype;f.prototype=l.prototype={constructor:f,has:sf.has,add:function(t){return t+="",this[af+t]=t,this},remove:sf.remove,clear:sf.clear,values:sf.keys,size:sf.size,empty:sf.empty,each:sf.each};var ff=function(t){var n=[];for(var e in t)n.push(e);return n},lf=function(t){var n=[];for(var e in t)n.push(t[e]);return n},hf=function(t){var n=[];for(var e in t)n.push({key:e,value:t[e]});return n},pf=function(t,n){return t=null==t?0:+t,n=null==n?1:+n,1===arguments.length?(n=t,t=0):n-=t,function(){return Math.random()*n+t}},df=function(t,n){var e,r;return t=null==t?0:+t,n=null==n?1:+n,function(){var i;if(null!=e)i=e,e=null;else do e=2*Math.random()-1,i=2*Math.random()-1,r=e*e+i*i;while(!r||r>1);return t+n*i*Math.sqrt(-2*Math.log(r)/r)}},vf=function(){var t=df.apply(this,arguments);return function(){return Math.exp(t())}},_f=function(t){return function(){for(var n=0,e=0;e<t;++e)n+=Math.random();return n}},yf=function(t){var n=_f(t);return function(){return n()/t}},gf=function(t){return function(){return-Math.log(1-Math.random())/t}},mf=3,xf=function t(n){function e(t){return Math.pow(t,n)}return n=+n,e.exponent=t,e}(mf),bf=function t(n){function e(t){return 1-Math.pow(1-t,n)}return n=+n,e.exponent=t,e}(mf),wf=function t(n){function e(t){return((t*=2)<=1?Math.pow(t,n):2-Math.pow(2-t,n))/2}return n=+n,e.exponent=t,e}(mf),Mf=Math.PI,Tf=Mf/2,Nf=4/11,kf=6/11,Sf=8/11,Ef=.75,Af=9/11,Cf=10/11,zf=.9375,Pf=21/22,Rf=63/64,qf=1/Nf/Nf,Lf=1.70158,Uf=function t(n){function e(t){return t*t*((n+1)*t-n)}return n=+n,e.overshoot=t,e}(Lf),Df=function t(n){function e(t){return--t*t*((n+1)*t+n)+1}return n=+n,e.overshoot=t,e}(Lf),Of=function t(n){function e(t){return((t*=2)<1?t*t*((n+1)*t-n):(t-=2)*t*((n+1)*t+n)+2)/2}return n=+n,e.overshoot=t,e}(Lf),Ff=2*Math.PI,If=1,Yf=.3,Bf=function t(n,e){function r(t){return n*Math.pow(2,10*--t)*Math.sin((i-t)/e)}var i=Math.asin(1/(n=Math.max(1,n)))*(e/=Ff);return r.amplitude=function(n){return t(n,e*Ff)},r.period=function(e){return t(n,e)},r}(If,Yf),jf=function t(n,e){function r(t){return 1-n*Math.pow(2,-10*(t=+t))*Math.sin((t+i)/e)}var i=Math.asin(1/(n=Math.max(1,n)))*(e/=Ff);return r.amplitude=function(n){return t(n,e*Ff)},r.period=function(e){return t(n,e)},r}(If,Yf),Hf=function t(n,e){function r(t){return((t=2*t-1)<0?n*Math.pow(2,10*t)*Math.sin((i-t)/e):2-n*Math.pow(2,-10*t)*Math.sin((i+t)/e))/2}var i=Math.asin(1/(n=Math.max(1,n)))*(e/=Ff);return r.amplitude=function(n){return t(n,e*Ff)},r.period=function(e){return t(n,e)},r}(If,Yf),Xf=function(t){for(var n,e=-1,r=t.length,i=t[r-1],o=0;++e<r;)n=i,i=t[e],o+=n[1]*i[0]-n[0]*i[1];return o/2},Vf=function(t){for(var n,e,r=-1,i=t.length,o=0,u=0,a=t[i-1],c=0;++r<i;)n=a,a=t[r],c+=e=n[0]*a[1]-a[0]*n[1],o+=(n[0]+a[0])*e,u+=(n[1]+a[1])*e;return c*=3,[o/c,u/c]},Wf=function(t,n,e){return(n[0]-t[0])*(e[1]-t[1])-(n[1]-t[1])*(e[0]-t[0])},$f=function(t){if((e=t.length)<3)return null;var n,e,r=new Array(e),i=new Array(e);for(n=0;n<e;++n)r[n]=[+t[n][0],+t[n][1],n];for(r.sort(z),n=0;n<e;++n)i[n]=[r[n][0],-r[n][1]];var o=P(r),u=P(i),a=u[0]===o[0],c=u[u.length-1]===o[o.length-1],s=[];for(n=o.length-1;n>=0;--n)s.push(t[r[o[n]][2]]);for(n=+a;n<u.length-c;++n)s.push(t[r[u[n]][2]]);return s},Zf=function(t,n){for(var e,r,i=t.length,o=t[i-1],u=n[0],a=n[1],c=o[0],s=o[1],f=!1,l=0;l<i;++l)o=t[l],e=o[0],r=o[1],r>a!=s>a&&u<(c-e)*(a-r)/(s-r)+e&&(f=!f),c=e,s=r;return f},Gf=function(t){for(var n,e,r=-1,i=t.length,o=t[i-1],u=o[0],a=o[1],c=0;++r<i;)n=u,e=a,o=t[r],u=o[0],a=o[1],n-=u,e-=a,c+=Math.sqrt(n*n+e*e);return c},Jf=Math.PI,Qf=2*Jf,Kf=1e-6,tl=Qf-Kf;R.prototype=q.prototype={constructor:R,moveTo:function(t,n){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,n){this._+="L"+(this._x1=+t)+","+(this._y1=+n)},quadraticCurveTo:function(t,n,e,r){this._+="Q"+ +t+","+ +n+","+(this._x1=+e)+","+(this._y1=+r)},bezierCurveTo:function(t,n,e,r,i,o){this._+="C"+ +t+","+ +n+","+ +e+","+ +r+","+(this._x1=+i)+","+(this._y1=+o)},arcTo:function(t,n,e,r,i){t=+t,n=+n,e=+e,r=+r,i=+i;var o=this._x1,u=this._y1,a=e-t,c=r-n,s=o-t,f=u-n,l=s*s+f*f;if(i<0)throw new Error("negative radius: "+i);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=n);else if(l>Kf)if(Math.abs(f*a-c*s)>Kf&&i){var h=e-o,p=r-u,d=a*a+c*c,v=h*h+p*p,_=Math.sqrt(d),y=Math.sqrt(l),g=i*Math.tan((Jf-Math.acos((d+l-v)/(2*_*y)))/2),m=g/y,x=g/_;Math.abs(m-1)>Kf&&(this._+="L"+(t+m*s)+","+(n+m*f)),this._+="A"+i+","+i+",0,0,"+ +(f*h>s*p)+","+(this._x1=t+x*a)+","+(this._y1=n+x*c)}else this._+="L"+(this._x1=t)+","+(this._y1=n);else;},arc:function(t,n,e,r,i,o){t=+t,n=+n,e=+e;var u=e*Math.cos(r),a=e*Math.sin(r),c=t+u,s=n+a,f=1^o,l=o?r-i:i-r;if(e<0)throw new Error("negative radius: "+e);null===this._x1?this._+="M"+c+","+s:(Math.abs(this._x1-c)>Kf||Math.abs(this._y1-s)>Kf)&&(this._+="L"+c+","+s),e&&(l>tl?this._+="A"+e+","+e+",0,1,"+f+","+(t-u)+","+(n-a)+"A"+e+","+e+",0,1,"+f+","+(this._x1=c)+","+(this._y1=s):(l<0&&(l=l%Qf+Qf),this._+="A"+e+","+e+",0,"+ +(l>=Jf)+","+f+","+(this._x1=t+e*Math.cos(i))+","+(this._y1=n+e*Math.sin(i))))},rect:function(t,n,e,r){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)+"h"+ +e+"v"+ +r+"h"+-e+"Z"},toString:function(){return this._}};var nl=function(t){var n=+this._x.call(null,t),e=+this._y.call(null,t);return L(this.cover(n,e),n,e,t)},el=function(t,n){if(isNaN(t=+t)||isNaN(n=+n))return this;var e=this._x0,r=this._y0,i=this._x1,o=this._y1;if(isNaN(e))i=(e=Math.floor(t))+1,o=(r=Math.floor(n))+1;else{if(!(e>t||t>i||r>n||n>o))return this;var u,a,c=i-e,s=this._root;switch(a=(n<(r+o)/2)<<1|t<(e+i)/2){case 0:do u=new Array(4),u[a]=s,s=u;while(c*=2,i=e+c,o=r+c,t>i||n>o);break;case 1:do u=new Array(4),u[a]=s,s=u;while(c*=2,e=i-c,o=r+c,e>t||n>o);break;case 2:do u=new Array(4),u[a]=s,s=u;while(c*=2,i=e+c,r=o-c,t>i||r>n);break;case 3:do u=new Array(4),u[a]=s,s=u;while(c*=2,e=i-c,r=o-c,e>t||r>n)}this._root&&this._root.length&&(this._root=s)}return this._x0=e,this._y0=r,this._x1=i,this._y1=o,this},rl=function(){var t=[];return this.visit(function(n){if(!n.length)do t.push(n.data);while(n=n.next)}),t},il=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]},ol=function(t,n,e,r,i){this.node=t,this.x0=n,this.y0=e,this.x1=r,this.y1=i},ul=function(t,n,e){var r,i,o,u,a,c,s,f=this._x0,l=this._y0,h=this._x1,p=this._y1,d=[],v=this._root;for(v&&d.push(new ol(v,f,l,h,p)),null==e?e=1/0:(f=t-e,l=n-e,h=t+e,p=n+e,e*=e);c=d.pop();)if(!(!(v=c.node)||(i=c.x0)>h||(o=c.y0)>p||(u=c.x1)<f||(a=c.y1)<l))if(v.length){var _=(i+u)/2,y=(o+a)/2;d.push(new ol(v[3],_,y,u,a),new ol(v[2],i,y,_,a),new ol(v[1],_,o,u,y),new ol(v[0],i,o,_,y)),(s=(n>=y)<<1|t>=_)&&(c=d[d.length-1],d[d.length-1]=d[d.length-1-s],d[d.length-1-s]=c)}else{var g=t-+this._x.call(null,v.data),m=n-+this._y.call(null,v.data),x=g*g+m*m;if(x<e){var b=Math.sqrt(e=x);f=t-b,l=n-b,h=t+b,p=n+b,r=v.data}}return r},al=function(t){if(isNaN(o=+this._x.call(null,t))||isNaN(u=+this._y.call(null,t)))return this;var n,e,r,i,o,u,a,c,s,f,l,h,p=this._root,d=this._x0,v=this._y0,_=this._x1,y=this._y1;if(!p)return this;if(p.length)for(;;){if((s=o>=(a=(d+_)/2))?d=a:_=a,(f=u>=(c=(v+y)/2))?v=c:y=c,n=p,!(p=p[l=f<<1|s]))return this;if(!p.length)break;(n[l+1&3]||n[l+2&3]||n[l+3&3])&&(e=n,h=l)}for(;p.data!==t;)if(r=p,!(p=p.next))return this;return(i=p.next)&&delete p.next,r?(i?r.next=i:delete r.next,this):n?(i?n[l]=i:delete n[l],(p=n[0]||n[1]||n[2]||n[3])&&p===(n[3]||n[2]||n[1]||n[0])&&!p.length&&(e?e[h]=p:this._root=p),this):(this._root=i,this)},cl=function(){return this._root},sl=function(){var t=0;return this.visit(function(n){if(!n.length)do++t;while(n=n.next)}),t},fl=function(t){var n,e,r,i,o,u,a=[],c=this._root;for(c&&a.push(new ol(c,this._x0,this._y0,this._x1,this._y1));n=a.pop();)if(!t(c=n.node,r=n.x0,i=n.y0,o=n.x1,u=n.y1)&&c.length){var s=(r+o)/2,f=(i+u)/2;(e=c[3])&&a.push(new ol(e,s,f,o,u)),(e=c[2])&&a.push(new ol(e,r,f,s,u)),(e=c[1])&&a.push(new ol(e,s,i,o,f)),(e=c[0])&&a.push(new ol(e,r,i,s,f))}return this},ll=function(t){var n,e=[],r=[];for(this._root&&e.push(new ol(this._root,this._x0,this._y0,this._x1,this._y1));n=e.pop();){var i=n.node;if(i.length){var o,u=n.x0,a=n.y0,c=n.x1,s=n.y1,f=(u+c)/2,l=(a+s)/2;(o=i[0])&&e.push(new ol(o,u,a,f,l)),(o=i[1])&&e.push(new ol(o,f,a,c,l)),(o=i[2])&&e.push(new ol(o,u,l,f,s)),(o=i[3])&&e.push(new ol(o,f,l,c,s))}r.push(n)}for(;n=r.pop();)t(n.node,n.x0,n.y0,n.x1,n.y1);return this},hl=function(t){return arguments.length?(this._x=t,this):this._x},pl=function(t){return arguments.length?(this._y=t,this):this._y},dl=I.prototype=Y.prototype;dl.copy=function(){var t,n,e=new Y(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root;if(!r)return e;if(!r.length)return e._root=B(r),e;for(t=[{source:r,target:e._root=new Array(4)}];r=t.pop();)for(var i=0;i<4;++i)(n=r.source[i])&&(n.length?t.push({source:n,target:r.target[i]=new Array(4)}):r.target[i]=B(n));return e},dl.add=nl,dl.addAll=U,dl.cover=el,dl.data=rl,dl.extent=il,dl.find=ul,dl.remove=al,dl.removeAll=D,dl.root=cl,dl.size=sl,dl.visit=fl,dl.visitAfter=ll,dl.x=hl,dl.y=pl;var vl=[].slice,_l={};j.prototype=Z.prototype={constructor:j,defer:function(t){if("function"!=typeof t||this._call)throw new Error;if(null!=this._error)return this;var n=vl.call(arguments,1);return n.push(t),++this._waiting,this._tasks.push(n),H(this),this},abort:function(){return null==this._error&&W(this,new Error("abort")),this},await:function(t){if("function"!=typeof t||this._call)throw new Error;return this._call=function(n,e){t.apply(null,[n].concat(e))},$(this),this},awaitAll:function(t){if("function"!=typeof t||this._call)throw new Error;return this._call=t,$(this),this}};var yl=function(t){return function(){
  return t}},gl=1e-12,ml=Math.PI,xl=ml/2,bl=2*ml,wl=function(){function t(){var t,s,f=+n.apply(this,arguments),l=+e.apply(this,arguments),h=o.apply(this,arguments)-xl,p=u.apply(this,arguments)-xl,d=Math.abs(p-h),v=p>h;if(c||(c=t=q()),l<f&&(s=l,l=f,f=s),l>gl)if(d>bl-gl)c.moveTo(l*Math.cos(h),l*Math.sin(h)),c.arc(0,0,l,h,p,!v),f>gl&&(c.moveTo(f*Math.cos(p),f*Math.sin(p)),c.arc(0,0,f,p,h,v));else{var _,y,g=h,m=p,x=h,b=p,w=d,M=d,T=a.apply(this,arguments)/2,N=T>gl&&(i?+i.apply(this,arguments):Math.sqrt(f*f+l*l)),k=Math.min(Math.abs(l-f)/2,+r.apply(this,arguments)),S=k,E=k;if(N>gl){var A=nt(N/f*Math.sin(T)),C=nt(N/l*Math.sin(T));(w-=2*A)>gl?(A*=v?1:-1,x+=A,b-=A):(w=0,x=b=(h+p)/2),(M-=2*C)>gl?(C*=v?1:-1,g+=C,m-=C):(M=0,g=m=(h+p)/2)}var z=l*Math.cos(g),P=l*Math.sin(g),R=f*Math.cos(b),L=f*Math.sin(b);if(k>gl){var U=l*Math.cos(m),D=l*Math.sin(m),O=f*Math.cos(x),F=f*Math.sin(x);if(d<ml){var I=w>gl?et(z,P,O,F,U,D,R,L):[R,L],Y=z-I[0],B=P-I[1],j=U-I[0],H=D-I[1],X=1/Math.sin(Math.acos((Y*j+B*H)/(Math.sqrt(Y*Y+B*B)*Math.sqrt(j*j+H*H)))/2),V=Math.sqrt(I[0]*I[0]+I[1]*I[1]);S=Math.min(k,(f-V)/(X-1)),E=Math.min(k,(l-V)/(X+1))}}M>gl?E>gl?(_=rt(O,F,z,P,l,E,v),y=rt(U,D,R,L,l,E,v),c.moveTo(_.cx+_.x01,_.cy+_.y01),E<k?c.arc(_.cx,_.cy,E,Math.atan2(_.y01,_.x01),Math.atan2(y.y01,y.x01),!v):(c.arc(_.cx,_.cy,E,Math.atan2(_.y01,_.x01),Math.atan2(_.y11,_.x11),!v),c.arc(0,0,l,Math.atan2(_.cy+_.y11,_.cx+_.x11),Math.atan2(y.cy+y.y11,y.cx+y.x11),!v),c.arc(y.cx,y.cy,E,Math.atan2(y.y11,y.x11),Math.atan2(y.y01,y.x01),!v))):(c.moveTo(z,P),c.arc(0,0,l,g,m,!v)):c.moveTo(z,P),f>gl&&w>gl?S>gl?(_=rt(R,L,U,D,f,-S,v),y=rt(z,P,O,F,f,-S,v),c.lineTo(_.cx+_.x01,_.cy+_.y01),S<k?c.arc(_.cx,_.cy,S,Math.atan2(_.y01,_.x01),Math.atan2(y.y01,y.x01),!v):(c.arc(_.cx,_.cy,S,Math.atan2(_.y01,_.x01),Math.atan2(_.y11,_.x11),!v),c.arc(0,0,f,Math.atan2(_.cy+_.y11,_.cx+_.x11),Math.atan2(y.cy+y.y11,y.cx+y.x11),v),c.arc(y.cx,y.cy,S,Math.atan2(y.y11,y.x11),Math.atan2(y.y01,y.x01),!v))):c.arc(0,0,f,b,x,v):c.lineTo(R,L)}else c.moveTo(0,0);if(c.closePath(),t)return c=null,t+""||null}var n=G,e=J,r=yl(0),i=null,o=Q,u=K,a=tt,c=null;return t.centroid=function(){var t=(+n.apply(this,arguments)+ +e.apply(this,arguments))/2,r=(+o.apply(this,arguments)+ +u.apply(this,arguments))/2-ml/2;return[Math.cos(r)*t,Math.sin(r)*t]},t.innerRadius=function(e){return arguments.length?(n="function"==typeof e?e:yl(+e),t):n},t.outerRadius=function(n){return arguments.length?(e="function"==typeof n?n:yl(+n),t):e},t.cornerRadius=function(n){return arguments.length?(r="function"==typeof n?n:yl(+n),t):r},t.padRadius=function(n){return arguments.length?(i=null==n?null:"function"==typeof n?n:yl(+n),t):i},t.startAngle=function(n){return arguments.length?(o="function"==typeof n?n:yl(+n),t):o},t.endAngle=function(n){return arguments.length?(u="function"==typeof n?n:yl(+n),t):u},t.padAngle=function(n){return arguments.length?(a="function"==typeof n?n:yl(+n),t):a},t.context=function(n){return arguments.length?(c=null==n?null:n,t):c},t};it.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._context.lineTo(t,n)}}};var Ml=function(t){return new it(t)},Tl=function(){function t(t){var a,c,s,f=t.length,l=!1;for(null==i&&(u=o(s=q())),a=0;a<=f;++a)!(a<f&&r(c=t[a],a,t))===l&&((l=!l)?u.lineStart():u.lineEnd()),l&&u.point(+n(c,a,t),+e(c,a,t));if(s)return u=null,s+""||null}var n=ot,e=ut,r=yl(!0),i=null,o=Ml,u=null;return t.x=function(e){return arguments.length?(n="function"==typeof e?e:yl(+e),t):n},t.y=function(n){return arguments.length?(e="function"==typeof n?n:yl(+n),t):e},t.defined=function(n){return arguments.length?(r="function"==typeof n?n:yl(!!n),t):r},t.curve=function(n){return arguments.length?(o=n,null!=i&&(u=o(i)),t):o},t.context=function(n){return arguments.length?(null==n?i=u=null:u=o(i=n),t):i},t},Nl=function(){function t(t){var n,f,l,h,p,d=t.length,v=!1,_=new Array(d),y=new Array(d);for(null==a&&(s=c(p=q())),n=0;n<=d;++n){if(!(n<d&&u(h=t[n],n,t))===v)if(v=!v)f=n,s.areaStart(),s.lineStart();else{for(s.lineEnd(),s.lineStart(),l=n-1;l>=f;--l)s.point(_[l],y[l]);s.lineEnd(),s.areaEnd()}v&&(_[n]=+e(h,n,t),y[n]=+i(h,n,t),s.point(r?+r(h,n,t):_[n],o?+o(h,n,t):y[n]))}if(p)return s=null,p+""||null}function n(){return Tl().defined(u).curve(c).context(a)}var e=ot,r=null,i=yl(0),o=ut,u=yl(!0),a=null,c=Ml,s=null;return t.x=function(n){return arguments.length?(e="function"==typeof n?n:yl(+n),r=null,t):e},t.x0=function(n){return arguments.length?(e="function"==typeof n?n:yl(+n),t):e},t.x1=function(n){return arguments.length?(r=null==n?null:"function"==typeof n?n:yl(+n),t):r},t.y=function(n){return arguments.length?(i="function"==typeof n?n:yl(+n),o=null,t):i},t.y0=function(n){return arguments.length?(i="function"==typeof n?n:yl(+n),t):i},t.y1=function(n){return arguments.length?(o=null==n?null:"function"==typeof n?n:yl(+n),t):o},t.lineX0=t.lineY0=function(){return n().x(e).y(i)},t.lineY1=function(){return n().x(e).y(o)},t.lineX1=function(){return n().x(r).y(i)},t.defined=function(n){return arguments.length?(u="function"==typeof n?n:yl(!!n),t):u},t.curve=function(n){return arguments.length?(c=n,null!=a&&(s=c(a)),t):c},t.context=function(n){return arguments.length?(null==n?a=s=null:s=c(a=n),t):a},t},kl=function(t,n){return n<t?-1:n>t?1:n>=t?0:NaN},Sl=function(t){return t},El=function(){function t(t){var a,c,s,f,l,h=t.length,p=0,d=new Array(h),v=new Array(h),_=+i.apply(this,arguments),y=Math.min(bl,Math.max(-bl,o.apply(this,arguments)-_)),g=Math.min(Math.abs(y)/h,u.apply(this,arguments)),m=g*(y<0?-1:1);for(a=0;a<h;++a)(l=v[d[a]=a]=+n(t[a],a,t))>0&&(p+=l);for(null!=e?d.sort(function(t,n){return e(v[t],v[n])}):null!=r&&d.sort(function(n,e){return r(t[n],t[e])}),a=0,s=p?(y-h*m)/p:0;a<h;++a,_=f)c=d[a],l=v[c],f=_+(l>0?l*s:0)+m,v[c]={data:t[c],index:a,value:l,startAngle:_,endAngle:f,padAngle:g};return v}var n=Sl,e=kl,r=null,i=yl(0),o=yl(bl),u=yl(0);return t.value=function(e){return arguments.length?(n="function"==typeof e?e:yl(+e),t):n},t.sortValues=function(n){return arguments.length?(e=n,r=null,t):e},t.sort=function(n){return arguments.length?(r=n,e=null,t):r},t.startAngle=function(n){return arguments.length?(i="function"==typeof n?n:yl(+n),t):i},t.endAngle=function(n){return arguments.length?(o="function"==typeof n?n:yl(+n),t):o},t.padAngle=function(n){return arguments.length?(u="function"==typeof n?n:yl(+n),t):u},t},Al=ct(Ml);at.prototype={areaStart:function(){this._curve.areaStart()},areaEnd:function(){this._curve.areaEnd()},lineStart:function(){this._curve.lineStart()},lineEnd:function(){this._curve.lineEnd()},point:function(t,n){this._curve.point(n*Math.sin(t),n*-Math.cos(t))}};var Cl=function(){return st(Tl().curve(Al))},zl=function(){var t=Nl().curve(Al),n=t.curve,e=t.lineX0,r=t.lineX1,i=t.lineY0,o=t.lineY1;return t.angle=t.x,delete t.x,t.startAngle=t.x0,delete t.x0,t.endAngle=t.x1,delete t.x1,t.radius=t.y,delete t.y,t.innerRadius=t.y0,delete t.y0,t.outerRadius=t.y1,delete t.y1,t.lineStartAngle=function(){return st(e())},delete t.lineX0,t.lineEndAngle=function(){return st(r())},delete t.lineX1,t.lineInnerRadius=function(){return st(i())},delete t.lineY0,t.lineOuterRadius=function(){return st(o())},delete t.lineY1,t.curve=function(t){return arguments.length?n(ct(t)):n()._curve},t},Pl={draw:function(t,n){var e=Math.sqrt(n/ml);t.moveTo(e,0),t.arc(0,0,e,0,bl)}},Rl={draw:function(t,n){var e=Math.sqrt(n/5)/2;t.moveTo(-3*e,-e),t.lineTo(-e,-e),t.lineTo(-e,-3*e),t.lineTo(e,-3*e),t.lineTo(e,-e),t.lineTo(3*e,-e),t.lineTo(3*e,e),t.lineTo(e,e),t.lineTo(e,3*e),t.lineTo(-e,3*e),t.lineTo(-e,e),t.lineTo(-3*e,e),t.closePath()}},ql=Math.sqrt(1/3),Ll=2*ql,Ul={draw:function(t,n){var e=Math.sqrt(n/Ll),r=e*ql;t.moveTo(0,-e),t.lineTo(r,0),t.lineTo(0,e),t.lineTo(-r,0),t.closePath()}},Dl=.8908130915292852,Ol=Math.sin(ml/10)/Math.sin(7*ml/10),Fl=Math.sin(bl/10)*Ol,Il=-Math.cos(bl/10)*Ol,Yl={draw:function(t,n){var e=Math.sqrt(n*Dl),r=Fl*e,i=Il*e;t.moveTo(0,-e),t.lineTo(r,i);for(var o=1;o<5;++o){var u=bl*o/5,a=Math.cos(u),c=Math.sin(u);t.lineTo(c*e,-a*e),t.lineTo(a*r-c*i,c*r+a*i)}t.closePath()}},Bl={draw:function(t,n){var e=Math.sqrt(n),r=-e/2;t.rect(r,r,e,e)}},jl=Math.sqrt(3),Hl={draw:function(t,n){var e=-Math.sqrt(n/(3*jl));t.moveTo(0,2*e),t.lineTo(-jl*e,-e),t.lineTo(jl*e,-e),t.closePath()}},Xl=-.5,Vl=Math.sqrt(3)/2,Wl=1/Math.sqrt(12),$l=3*(Wl/2+1),Zl={draw:function(t,n){var e=Math.sqrt(n/$l),r=e/2,i=e*Wl,o=r,u=e*Wl+e,a=-o,c=u;t.moveTo(r,i),t.lineTo(o,u),t.lineTo(a,c),t.lineTo(Xl*r-Vl*i,Vl*r+Xl*i),t.lineTo(Xl*o-Vl*u,Vl*o+Xl*u),t.lineTo(Xl*a-Vl*c,Vl*a+Xl*c),t.lineTo(Xl*r+Vl*i,Xl*i-Vl*r),t.lineTo(Xl*o+Vl*u,Xl*u-Vl*o),t.lineTo(Xl*a+Vl*c,Xl*c-Vl*a),t.closePath()}},Gl=[Pl,Rl,Ul,Bl,Yl,Hl,Zl],Jl=function(){function t(){var t;if(r||(r=t=q()),n.apply(this,arguments).draw(r,+e.apply(this,arguments)),t)return r=null,t+""||null}var n=yl(Pl),e=yl(64),r=null;return t.type=function(e){return arguments.length?(n="function"==typeof e?e:yl(e),t):n},t.size=function(n){return arguments.length?(e="function"==typeof n?n:yl(+n),t):e},t.context=function(n){return arguments.length?(r=null==n?null:n,t):r},t},Ql=function(){};lt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:ft(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:ft(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}};var Kl=function(t){return new lt(t)};ht.prototype={areaStart:Ql,areaEnd:Ql,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x2,this._y2),this._context.closePath();break;case 2:this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break;case 3:this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x2=t,this._y2=n;break;case 1:this._point=2,this._x3=t,this._y3=n;break;case 2:this._point=3,this._x4=t,this._y4=n,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+n)/6);break;default:ft(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}};var th=function(t){return new ht(t)};pt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var e=(this._x0+4*this._x1+t)/6,r=(this._y0+4*this._y1+n)/6;this._line?this._context.lineTo(e,r):this._context.moveTo(e,r);break;case 3:this._point=4;default:ft(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}};var nh=function(t){return new pt(t)};dt.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this._x,n=this._y,e=t.length-1;if(e>0)for(var r,i=t[0],o=n[0],u=t[e]-i,a=n[e]-o,c=-1;++c<=e;)r=c/e,this._basis.point(this._beta*t[c]+(1-this._beta)*(i+r*u),this._beta*n[c]+(1-this._beta)*(o+r*a));this._x=this._y=null,this._basis.lineEnd()},point:function(t,n){this._x.push(+t),this._y.push(+n)}};var eh=function t(n){function e(t){return 1===n?new lt(t):new dt(t,n)}return e.beta=function(n){return t(+n)},e}(.85);_t.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:vt(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2,this._x1=t,this._y1=n;break;case 2:this._point=3;default:vt(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var rh=function t(n){function e(t){return new _t(t,n)}return e.tension=function(n){return t(+n)},e}(0);yt.prototype={areaStart:Ql,areaEnd:Ql,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:vt(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var ih=function t(n){function e(t){return new yt(t,n)}return e.tension=function(n){return t(+n)},e}(0);gt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:vt(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var oh=function t(n){function e(t){return new gt(t,n)}return e.tension=function(n){return t(+n)},e}(0);xt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3;default:mt(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var uh=function t(n){function e(t){return n?new xt(t,n):new _t(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);bt.prototype={areaStart:Ql,areaEnd:Ql,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:mt(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var ah=function t(n){function e(t){return n?new bt(t,n):new yt(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);wt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:mt(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var ch=function t(n){function e(t){return n?new wt(t,n):new gt(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);Mt.prototype={areaStart:Ql,areaEnd:Ql,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(t,n){t=+t,n=+n,this._point?this._context.lineTo(t,n):(this._point=1,this._context.moveTo(t,n))}};var sh=function(t){return new Mt(t)};Et.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:St(this,this._t0,kt(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){var e=NaN;if(t=+t,n=+n,t!==this._x1||n!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,St(this,kt(this,e=Nt(this,t,n)),e);break;default:St(this,this._t0,e=Nt(this,t,n))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n,this._t0=e}}},(At.prototype=Object.create(Et.prototype)).point=function(t,n){Et.prototype.point.call(this,n,t)},Ct.prototype={moveTo:function(t,n){this._context.moveTo(n,t)},closePath:function(){this._context.closePath()},lineTo:function(t,n){this._context.lineTo(n,t)},bezierCurveTo:function(t,n,e,r,i,o){this._context.bezierCurveTo(n,t,r,e,o,i)}},Rt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this._x,n=this._y,e=t.length;if(e)if(this._line?this._context.lineTo(t[0],n[0]):this._context.moveTo(t[0],n[0]),2===e)this._context.lineTo(t[1],n[1]);else for(var r=qt(t),i=qt(n),o=0,u=1;u<e;++o,++u)this._context.bezierCurveTo(r[0][o],i[0][o],r[1][o],i[1][o],t[u],n[u]);(this._line||0!==this._line&&1===e)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,n){this._x.push(+t),this._y.push(+n)}};var fh=function(t){return new Rt(t)};Lt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,n),this._context.lineTo(t,n);else{var e=this._x*(1-this._t)+t*this._t;this._context.lineTo(e,this._y),this._context.lineTo(e,n)}}this._x=t,this._y=n}};var lh=function(t){return new Lt(t,.5)},hh=Array.prototype.slice,ph=function(t,n){if((r=t.length)>1)for(var e,r,i=1,o=t[n[0]],u=o.length;i<r;++i){e=o,o=t[n[i]];for(var a=0;a<u;++a)o[a][1]+=o[a][0]=isNaN(e[a][1])?e[a][0]:e[a][1]}},dh=function(t){for(var n=t.length,e=new Array(n);--n>=0;)e[n]=n;return e},vh=function(){function t(t){var o,u,a=n.apply(this,arguments),c=t.length,s=a.length,f=new Array(s);for(o=0;o<s;++o){for(var l,h=a[o],p=f[o]=new Array(c),d=0;d<c;++d)p[d]=l=[0,+i(t[d],h,d,t)],l.data=t[d];p.key=h}for(o=0,u=e(f);o<s;++o)f[u[o]].index=o;return r(f,u),f}var n=yl([]),e=dh,r=ph,i=Ot;return t.keys=function(e){return arguments.length?(n="function"==typeof e?e:yl(hh.call(e)),t):n},t.value=function(n){return arguments.length?(i="function"==typeof n?n:yl(+n),t):i},t.order=function(n){return arguments.length?(e=null==n?dh:"function"==typeof n?n:yl(hh.call(n)),t):e},t.offset=function(n){return arguments.length?(r=null==n?ph:n,t):r},t},_h=function(t,n){if((r=t.length)>0){for(var e,r,i,o=0,u=t[0].length;o<u;++o){for(i=e=0;e<r;++e)i+=t[e][o][1]||0;if(i)for(e=0;e<r;++e)t[e][o][1]/=i}ph(t,n)}},yh=function(t,n){if((e=t.length)>0){for(var e,r=0,i=t[n[0]],o=i.length;r<o;++r){for(var u=0,a=0;u<e;++u)a+=t[u][r][1]||0;i[r][1]+=i[r][0]=-a/2}ph(t,n)}},gh=function(t,n){if((i=t.length)>0&&(r=(e=t[n[0]]).length)>0){for(var e,r,i,o=0,u=1;u<r;++u){for(var a=0,c=0,s=0;a<i;++a){for(var f=t[n[a]],l=f[u][1]||0,h=f[u-1][1]||0,p=(l-h)/2,d=0;d<a;++d){var v=t[n[d]],_=v[u][1]||0,y=v[u-1][1]||0;p+=_-y}c+=l,s+=p*l}e[u-1][1]+=e[u-1][0]=o,c&&(o-=s/c)}e[u-1][1]+=e[u-1][0]=o,ph(t,n)}},mh=function(t){var n=t.map(Ft);return dh(t).sort(function(t,e){return n[t]-n[e]})},xh=function(t){return mh(t).reverse()},bh=function(t){var n,e,r=t.length,i=t.map(Ft),o=dh(t).sort(function(t,n){return i[n]-i[t]}),u=0,a=0,c=[],s=[];for(n=0;n<r;++n)e=o[n],u<a?(u+=i[e],c.push(e)):(a+=i[e],s.push(e));return s.reverse().concat(c)},wh=function(t){return dh(t).reverse()},Mh=function(t,n,e){t.prototype=n.prototype=e,e.constructor=t},Th=.7,Nh=1/Th,kh="\\s*([+-]?\\d+)\\s*",Sh="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",Eh="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Ah=/^#([0-9a-f]{3})$/,Ch=/^#([0-9a-f]{6})$/,zh=new RegExp("^rgb\\("+[kh,kh,kh]+"\\)$"),Ph=new RegExp("^rgb\\("+[Eh,Eh,Eh]+"\\)$"),Rh=new RegExp("^rgba\\("+[kh,kh,kh,Sh]+"\\)$"),qh=new RegExp("^rgba\\("+[Eh,Eh,Eh,Sh]+"\\)$"),Lh=new RegExp("^hsl\\("+[Sh,Eh,Eh]+"\\)$"),Uh=new RegExp("^hsla\\("+[Sh,Eh,Eh,Sh]+"\\)$"),Dh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Mh(Yt,Bt,{displayable:function(){return this.rgb().displayable()},toString:function(){return this.rgb()+""}}),Mh(Wt,Vt,It(Yt,{brighter:function(t){return t=null==t?Nh:Math.pow(Nh,t),new Wt(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?Th:Math.pow(Th,t),new Wt(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return 0<=this.r&&this.r<=255&&0<=this.g&&this.g<=255&&0<=this.b&&this.b<=255&&0<=this.opacity&&this.opacity<=1},toString:function(){var t=this.opacity;return t=isNaN(t)?1:Math.max(0,Math.min(1,t)),(1===t?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}})),Mh(Jt,Gt,It(Yt,{brighter:function(t){return t=null==t?Nh:Math.pow(Nh,t),new Jt(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?Th:Math.pow(Th,t),new Jt(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*n,i=2*e-r;return new Wt(Qt(t>=240?t-240:t+120,i,r),Qt(t,i,r),Qt(t<120?t+240:t-120,i,r),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1}}));var Oh=Math.PI/180,Fh=180/Math.PI,Ih=18,Yh=.95047,Bh=1,jh=1.08883,Hh=4/29,Xh=6/29,Vh=3*Xh*Xh,Wh=Xh*Xh*Xh;Mh(nn,tn,It(Yt,{brighter:function(t){return new nn(this.l+Ih*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new nn(this.l-Ih*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,n=isNaN(this.a)?t:t+this.a/500,e=isNaN(this.b)?t:t-this.b/200;return t=Bh*rn(t),n=Yh*rn(n),e=jh*rn(e),new Wt(on(3.2404542*n-1.5371385*t-.4985314*e),on(-.969266*n+1.8760108*t+.041556*e),on(.0556434*n-.2040259*t+1.0572252*e),this.opacity)}})),Mh(sn,cn,It(Yt,{brighter:function(t){return new sn(this.h,this.c,this.l+Ih*(null==t?1:t),this.opacity)},darker:function(t){return new sn(this.h,this.c,this.l-Ih*(null==t?1:t),this.opacity)},rgb:function(){return Kt(this).rgb()}}));var $h=-.14861,Zh=1.78277,Gh=-.29227,Jh=-.90649,Qh=1.97294,Kh=Qh*Jh,tp=Qh*Zh,np=Zh*Gh-Jh*$h;Mh(hn,ln,It(Yt,{brighter:function(t){return t=null==t?Nh:Math.pow(Nh,t),new hn(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?Th:Math.pow(Th,t),new hn(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*Oh,n=+this.l,e=isNaN(this.s)?0:this.s*n*(1-n),r=Math.cos(t),i=Math.sin(t);return new Wt(255*(n+e*($h*r+Zh*i)),255*(n+e*(Gh*r+Jh*i)),255*(n+e*(Qh*r)),this.opacity)}}));var ep,rp,ip,op,up=function(t){var n=t.length-1;return function(e){var r=e<=0?e=0:e>=1?(e=1,n-1):Math.floor(e*n),i=t[r],o=t[r+1],u=r>0?t[r-1]:2*i-o,a=r<n-1?t[r+2]:2*o-i;return pn((e-r/n)*n,u,i,o,a)}},ap=function(t){var n=t.length;return function(e){var r=Math.floor(((e%=1)<0?++e:e)*n),i=t[(r+n-1)%n],o=t[r%n],u=t[(r+1)%n],a=t[(r+2)%n];return pn((e-r/n)*n,i,o,u,a)}},cp=function(t){return function(){return t}},sp=function t(n){function e(t,n){var e=r((t=Vt(t)).r,(n=Vt(n)).r),i=r(t.g,n.g),o=r(t.b,n.b),u=r(t.opacity,n.opacity);return function(n){return t.r=e(n),t.g=i(n),t.b=o(n),t.opacity=u(n),t+""}}var r=yn(n);return e.gamma=t,e}(1),fp=mn(up),lp=mn(ap),hp=function(t,n){var e,r=n?n.length:0,i=t?Math.min(r,t.length):0,o=new Array(r),u=new Array(r);for(e=0;e<i;++e)o[e]=mp(t[e],n[e]);for(;e<r;++e)u[e]=n[e];return function(t){for(e=0;e<i;++e)u[e]=o[e](t);return u}},pp=function(t,n){var e=new Date;return t=+t,n-=t,function(r){return e.setTime(t+n*r),e}},dp=function(t,n){return t=+t,n-=t,function(e){return t+n*e}},vp=function(t,n){var e,r={},i={};null!==t&&"object"==typeof t||(t={}),null!==n&&"object"==typeof n||(n={});for(e in n)e in t?r[e]=mp(t[e],n[e]):i[e]=n[e];return function(t){for(e in r)i[e]=r[e](t);return i}},_p=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,yp=new RegExp(_p.source,"g"),gp=function(t,n){var e,r,i,o=_p.lastIndex=yp.lastIndex=0,u=-1,a=[],c=[];for(t+="",n+="";(e=_p.exec(t))&&(r=yp.exec(n));)(i=r.index)>o&&(i=n.slice(o,i),a[u]?a[u]+=i:a[++u]=i),(e=e[0])===(r=r[0])?a[u]?a[u]+=r:a[++u]=r:(a[++u]=null,c.push({i:u,x:dp(e,r)})),o=yp.lastIndex;return o<n.length&&(i=n.slice(o),a[u]?a[u]+=i:a[++u]=i),a.length<2?c[0]?bn(c[0].x):xn(n):(n=c.length,function(t){for(var e,r=0;r<n;++r)a[(e=c[r]).i]=e.x(t);return a.join("")})},mp=function(t,n){var e,r=typeof n;return null==n||"boolean"===r?cp(n):("number"===r?dp:"string"===r?(e=Bt(n))?(n=e,sp):gp:n instanceof Bt?sp:n instanceof Date?pp:Array.isArray(n)?hp:isNaN(n)?vp:dp)(t,n)},xp=function(t,n){return t=+t,n-=t,function(e){return Math.round(t+n*e)}},bp=180/Math.PI,wp={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1},Mp=function(t,n,e,r,i,o){var u,a,c;return(u=Math.sqrt(t*t+n*n))&&(t/=u,n/=u),(c=t*e+n*r)&&(e-=t*c,r-=n*c),(a=Math.sqrt(e*e+r*r))&&(e/=a,r/=a,c/=a),t*r<n*e&&(t=-t,n=-n,c=-c,u=-u),{translateX:i,translateY:o,rotate:Math.atan2(n,t)*bp,skewX:Math.atan(c)*bp,scaleX:u,scaleY:a}},Tp=Tn(wn,"px, ","px)","deg)"),Np=Tn(Mn,", ",")",")"),kp=Math.SQRT2,Sp=2,Ep=4,Ap=1e-12,Cp=function(t,n){var e,r,i=t[0],o=t[1],u=t[2],a=n[0],c=n[1],s=n[2],f=a-i,l=c-o,h=f*f+l*l;if(h<Ap)r=Math.log(s/u)/kp,e=function(t){return[i+t*f,o+t*l,u*Math.exp(kp*t*r)]};else{var p=Math.sqrt(h),d=(s*s-u*u+Ep*h)/(2*u*Sp*p),v=(s*s-u*u-Ep*h)/(2*s*Sp*p),_=Math.log(Math.sqrt(d*d+1)-d),y=Math.log(Math.sqrt(v*v+1)-v);r=(y-_)/kp,e=function(t){var n=t*r,e=Nn(_),a=u/(Sp*p)*(e*Sn(kp*n+_)-kn(_));return[i+a*f,o+a*l,u*e/Nn(kp*n+_)]}}return e.duration=1e3*r,e},zp=En(_n),Pp=En(gn),Rp=Cn(_n),qp=Cn(gn),Lp=zn(_n),Up=zn(gn),Dp=function(t,n){for(var e=new Array(n),r=0;r<n;++r)e[r]=t(r/(n-1));return e},Op={value:function(){}};Rn.prototype=Pn.prototype={constructor:Rn,on:function(t,n){var e,r=this._,i=qn(t+"",r),o=-1,u=i.length;{if(!(arguments.length<2)){if(null!=n&&"function"!=typeof n)throw new Error("invalid callback: "+n);
  for(;++o<u;)if(e=(t=i[o]).type)r[e]=Un(r[e],t.name,n);else if(null==n)for(e in r)r[e]=Un(r[e],t.name,null);return this}for(;++o<u;)if((e=(t=i[o]).type)&&(e=Ln(r[e],t.name)))return e}},copy:function(){var t={},n=this._;for(var e in n)t[e]=n[e].slice();return new Rn(t)},call:function(t,n){if((e=arguments.length-2)>0)for(var e,r,i=new Array(e),o=0;o<e;++o)i[o]=arguments[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(r=this._[t],o=0,e=r.length;o<e;++o)r[o].value.apply(n,i)},apply:function(t,n,e){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,o=r.length;i<o;++i)r[i].value.apply(n,e)}};var Fp,Ip,Yp=function(t){function n(t,n){var r,i,o=e(t,function(t,e){return r?r(t,e-1):(i=t,void(r=n?On(t,n):Dn(t)))});return o.columns=i,o}function e(t,n){function e(){if(f>=s)return u;if(i)return i=!1,o;var n,e=f;if(34===t.charCodeAt(e)){for(var r=e;r++<s;)if(34===t.charCodeAt(r)){if(34!==t.charCodeAt(r+1))break;++r}return f=r+2,n=t.charCodeAt(r+1),13===n?(i=!0,10===t.charCodeAt(r+2)&&++f):10===n&&(i=!0),t.slice(e+1,r).replace(/""/g,'"')}for(;f<s;){var a=1;if(n=t.charCodeAt(f++),10===n)i=!0;else if(13===n)i=!0,10===t.charCodeAt(f)&&(++f,++a);else if(n!==c)continue;return t.slice(e,f-a)}return t.slice(e)}for(var r,i,o={},u={},a=[],s=t.length,f=0,l=0;(r=e())!==u;){for(var h=[];r!==o&&r!==u;)h.push(r),r=e();n&&null==(h=n(h,l++))||a.push(h)}return a}function r(n,e){return null==e&&(e=Fn(n)),[e.map(u).join(t)].concat(n.map(function(n){return e.map(function(t){return u(n[t])}).join(t)})).join("\n")}function i(t){return t.map(o).join("\n")}function o(n){return n.map(u).join(t)}function u(t){return null==t?"":a.test(t+="")?'"'+t.replace(/\"/g,'""')+'"':t}var a=new RegExp('["'+t+"\n]"),c=t.charCodeAt(0);return{parse:n,parseRows:e,format:r,formatRows:i}},Bp=Yp(","),jp=Bp.parse,Hp=Bp.parseRows,Xp=Bp.format,Vp=Bp.formatRows,Wp=Yp("\t"),$p=Wp.parse,Zp=Wp.parseRows,Gp=Wp.format,Jp=Wp.formatRows,Qp=function(t,n){function e(t){var n,e=f.status;if(!e&&Yn(f)||e>=200&&e<300||304===e){if(u)try{n=u.call(r,f)}catch(t){return void c.call("error",r,t)}else n=f;c.call("load",r,n)}else c.call("error",r,t)}var r,i,u,a,c=Pn("beforesend","progress","load","error"),s=o(),f=new XMLHttpRequest,l=null,h=null,p=0;if("undefined"==typeof XDomainRequest||"withCredentials"in f||!/^(http(s)?:)?\/\//.test(t)||(f=new XDomainRequest),"onload"in f?f.onload=f.onerror=f.ontimeout=e:f.onreadystatechange=function(t){f.readyState>3&&e(t)},f.onprogress=function(t){c.call("progress",r,t)},r={header:function(t,n){return t=(t+"").toLowerCase(),arguments.length<2?s.get(t):(null==n?s.remove(t):s.set(t,n+""),r)},mimeType:function(t){return arguments.length?(i=null==t?null:t+"",r):i},responseType:function(t){return arguments.length?(a=t,r):a},timeout:function(t){return arguments.length?(p=+t,r):p},user:function(t){return arguments.length<1?l:(l=null==t?null:t+"",r)},password:function(t){return arguments.length<1?h:(h=null==t?null:t+"",r)},response:function(t){return u=t,r},get:function(t,n){return r.send("GET",t,n)},post:function(t,n){return r.send("POST",t,n)},send:function(n,e,o){return f.open(n,t,!0,l,h),null==i||s.has("accept")||s.set("accept",i+",*/*"),f.setRequestHeader&&s.each(function(t,n){f.setRequestHeader(n,t)}),null!=i&&f.overrideMimeType&&f.overrideMimeType(i),null!=a&&(f.responseType=a),p>0&&(f.timeout=p),null==o&&"function"==typeof e&&(o=e,e=null),null!=o&&1===o.length&&(o=In(o)),null!=o&&r.on("error",o).on("load",function(t){o(null,t)}),c.call("beforesend",r,f),f.send(null==e?null:e),r},abort:function(){return f.abort(),r},on:function(){var t=c.on.apply(c,arguments);return t===c?r:t}},null!=n){if("function"!=typeof n)throw new Error("invalid callback: "+n);return r.get(n)}return r},Kp=function(t,n){return function(e,r){var i=Qp(e).mimeType(t).response(n);if(null!=r){if("function"!=typeof r)throw new Error("invalid callback: "+r);return i.get(r)}return i}},td=Kp("text/html",function(t){return document.createRange().createContextualFragment(t.responseText)}),nd=Kp("application/json",function(t){return JSON.parse(t.responseText)}),ed=Kp("text/plain",function(t){return t.responseText}),rd=Kp("application/xml",function(t){var n=t.responseXML;if(!n)throw new Error("parse error");return n}),id=function(t,n){return function(e,r,i){arguments.length<3&&(i=r,r=null);var o=Qp(e).mimeType(t);return o.row=function(t){return arguments.length?o.response(Bn(n,r=t)):r},o.row(r),i?o.get(i):o}},od=id("text/csv",jp),ud=id("text/tab-separated-values",$p),ad=0,cd=0,sd=0,fd=1e3,ld=0,hd=0,pd=0,dd="object"==typeof performance&&performance.now?performance:Date,vd="function"==typeof requestAnimationFrame?requestAnimationFrame:function(t){setTimeout(t,17)};Xn.prototype=Vn.prototype={constructor:Xn,restart:function(t,n,e){if("function"!=typeof t)throw new TypeError("callback is not a function");e=(null==e?jn():+e)+(null==n?0:+n),this._next||Ip===this||(Ip?Ip._next=this:Fp=this,Ip=this),this._call=t,this._time=e,Jn()},stop:function(){this._call&&(this._call=null,this._time=1/0,Jn())}};var _d=function(t,n,e){var r=new Xn;return n=null==n?0:+n,r.restart(function(e){r.stop(),t(e+n)},n,e),r},yd=function(t,n,e){var r=new Xn,i=n;return null==n?(r.restart(t,n,e),r):(n=+n,e=null==e?jn():+e,r.restart(function o(u){u+=i,r.restart(o,i+=n,e),t(u)},n,e),r)},gd=new Date,md=new Date,xd=Qn(function(){},function(t,n){t.setTime(+t+n)},function(t,n){return n-t});xd.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?Qn(function(n){n.setTime(Math.floor(n/t)*t)},function(n,e){n.setTime(+n+e*t)},function(n,e){return(e-n)/t}):xd:null};var bd=xd.range,wd=1e3,Md=6e4,Td=36e5,Nd=864e5,kd=6048e5,Sd=Qn(function(t){t.setTime(Math.floor(t/wd)*wd)},function(t,n){t.setTime(+t+n*wd)},function(t,n){return(n-t)/wd},function(t){return t.getUTCSeconds()}),Ed=Sd.range,Ad=Qn(function(t){t.setTime(Math.floor(t/Md)*Md)},function(t,n){t.setTime(+t+n*Md)},function(t,n){return(n-t)/Md},function(t){return t.getMinutes()}),Cd=Ad.range,zd=Qn(function(t){var n=t.getTimezoneOffset()*Md%Td;n<0&&(n+=Td),t.setTime(Math.floor((+t-n)/Td)*Td+n)},function(t,n){t.setTime(+t+n*Td)},function(t,n){return(n-t)/Td},function(t){return t.getHours()}),Pd=zd.range,Rd=Qn(function(t){t.setHours(0,0,0,0)},function(t,n){t.setDate(t.getDate()+n)},function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*Md)/Nd},function(t){return t.getDate()-1}),qd=Rd.range,Ld=Kn(0),Ud=Kn(1),Dd=Kn(2),Od=Kn(3),Fd=Kn(4),Id=Kn(5),Yd=Kn(6),Bd=Ld.range,jd=Ud.range,Hd=Dd.range,Xd=Od.range,Vd=Fd.range,Wd=Id.range,$d=Yd.range,Zd=Qn(function(t){t.setDate(1),t.setHours(0,0,0,0)},function(t,n){t.setMonth(t.getMonth()+n)},function(t,n){return n.getMonth()-t.getMonth()+12*(n.getFullYear()-t.getFullYear())},function(t){return t.getMonth()}),Gd=Zd.range,Jd=Qn(function(t){t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,n){t.setFullYear(t.getFullYear()+n)},function(t,n){return n.getFullYear()-t.getFullYear()},function(t){return t.getFullYear()});Jd.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Qn(function(n){n.setFullYear(Math.floor(n.getFullYear()/t)*t),n.setMonth(0,1),n.setHours(0,0,0,0)},function(n,e){n.setFullYear(n.getFullYear()+e*t)}):null};var Qd=Jd.range,Kd=Qn(function(t){t.setUTCSeconds(0,0)},function(t,n){t.setTime(+t+n*Md)},function(t,n){return(n-t)/Md},function(t){return t.getUTCMinutes()}),tv=Kd.range,nv=Qn(function(t){t.setUTCMinutes(0,0,0)},function(t,n){t.setTime(+t+n*Td)},function(t,n){return(n-t)/Td},function(t){return t.getUTCHours()}),ev=nv.range,rv=Qn(function(t){t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCDate(t.getUTCDate()+n)},function(t,n){return(n-t)/Nd},function(t){return t.getUTCDate()-1}),iv=rv.range,ov=te(0),uv=te(1),av=te(2),cv=te(3),sv=te(4),fv=te(5),lv=te(6),hv=ov.range,pv=uv.range,dv=av.range,vv=cv.range,_v=sv.range,yv=fv.range,gv=lv.range,mv=Qn(function(t){t.setUTCDate(1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCMonth(t.getUTCMonth()+n)},function(t,n){return n.getUTCMonth()-t.getUTCMonth()+12*(n.getUTCFullYear()-t.getUTCFullYear())},function(t){return t.getUTCMonth()}),xv=mv.range,bv=Qn(function(t){t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCFullYear(t.getUTCFullYear()+n)},function(t,n){return n.getUTCFullYear()-t.getUTCFullYear()},function(t){return t.getUTCFullYear()});bv.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Qn(function(n){n.setUTCFullYear(Math.floor(n.getUTCFullYear()/t)*t),n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)},function(n,e){n.setUTCFullYear(n.getUTCFullYear()+e*t)}):null};var wv,Mv=bv.range,Tv=function(t,n){if((e=(t=n?t.toExponential(n-1):t.toExponential()).indexOf("e"))<0)return null;var e,r=t.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+t.slice(e+1)]},Nv=function(t){return t=Tv(Math.abs(t)),t?t[1]:NaN},kv=function(t,n){return function(e,r){for(var i=e.length,o=[],u=0,a=t[0],c=0;i>0&&a>0&&(c+a+1>r&&(a=Math.max(1,r-c)),o.push(e.substring(i-=a,i+a)),!((c+=a+1)>r));)a=t[u=(u+1)%t.length];return o.reverse().join(n)}},Sv=function(t,n){t=t.toPrecision(n);t:for(var e,r=t.length,i=1,o=-1;i<r;++i)switch(t[i]){case".":o=e=i;break;case"0":0===o&&(o=i),e=i;break;case"e":break t;default:o>0&&(o=0)}return o>0?t.slice(0,o)+t.slice(e+1):t},Ev=function(t,n){var e=Tv(t,n);if(!e)return t+"";var r=e[0],i=e[1],o=i-(wv=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,u=r.length;return o===u?r:o>u?r+new Array(o-u+1).join("0"):o>0?r.slice(0,o)+"."+r.slice(o):"0."+new Array(1-o).join("0")+Tv(t,Math.max(0,n+o-1))[0]},Av=function(t,n){var e=Tv(t,n);if(!e)return t+"";var r=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")},Cv={"":Sv,"%":function(t,n){return(100*t).toFixed(n)},b:function(t){return Math.round(t).toString(2)},c:function(t){return t+""},d:function(t){return Math.round(t).toString(10)},e:function(t,n){return t.toExponential(n)},f:function(t,n){return t.toFixed(n)},g:function(t,n){return t.toPrecision(n)},o:function(t){return Math.round(t).toString(8)},p:function(t,n){return Av(100*t,n)},r:Av,s:Ev,X:function(t){return Math.round(t).toString(16).toUpperCase()},x:function(t){return Math.round(t).toString(16)}},zv=/^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i,Pv=function(t){return new ne(t)};ne.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(null==this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(null==this.precision?"":"."+Math.max(0,0|this.precision))+this.type};var Rv,qv=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"],Lv=function(t){function n(t){function n(t){var n,i,c,g=d,m=v;if("c"===p)m=_(t)+m,t="";else{t=+t;var x=(t<0||1/t<0)&&(t*=-1,!0);if(t=_(t,h),x)for(n=-1,i=t.length,x=!1;++n<i;)if(c=t.charCodeAt(n),48<c&&c<58||"x"===p&&96<c&&c<103||"X"===p&&64<c&&c<71){x=!0;break}if(g=(x?"("===a?a:"-":"-"===a||"("===a?"":a)+g,m=m+("s"===p?qv[8+wv/3]:"")+(x&&"("===a?")":""),y)for(n=-1,i=t.length;++n<i;)if(c=t.charCodeAt(n),48>c||c>57){m=(46===c?o+t.slice(n+1):t.slice(n))+m,t=t.slice(0,n);break}}l&&!s&&(t=r(t,1/0));var b=g.length+t.length+m.length,w=b<f?new Array(f-b+1).join(e):"";switch(l&&s&&(t=r(w+t,w.length?f-m.length:1/0),w=""),u){case"<":return g+t+m+w;case"=":return g+w+t+m;case"^":return w.slice(0,b=w.length>>1)+g+t+m+w.slice(b)}return w+g+t+m}t=Pv(t);var e=t.fill,u=t.align,a=t.sign,c=t.symbol,s=t.zero,f=t.width,l=t.comma,h=t.precision,p=t.type,d="$"===c?i[0]:"#"===c&&/[boxX]/.test(p)?"0"+p.toLowerCase():"",v="$"===c?i[1]:/[%p]/.test(p)?"%":"",_=Cv[p],y=!p||/[defgprs%]/.test(p);return h=null==h?p?6:12:/[gprs]/.test(p)?Math.max(1,Math.min(21,h)):Math.max(0,Math.min(20,h)),n.toString=function(){return t+""},n}function e(t,e){var r=n((t=Pv(t),t.type="f",t)),i=3*Math.max(-8,Math.min(8,Math.floor(Nv(e)/3))),o=Math.pow(10,-i),u=qv[8+i/3];return function(t){return r(o*t)+u}}var r=t.grouping&&t.thousands?kv(t.grouping,t.thousands):ee,i=t.currency,o=t.decimal;return{format:n,formatPrefix:e}};re({decimal:".",thousands:",",grouping:[3],currency:["$",""]});var Uv,Dv=function(t){return Math.max(0,-Nv(Math.abs(t)))},Ov=function(t,n){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(Nv(n)/3)))-Nv(Math.abs(t)))},Fv=function(t,n){return t=Math.abs(t),n=Math.abs(n)-t,Math.max(0,Nv(n)-Nv(t))+1},Iv={"-":"",_:" ",0:"0"},Yv=/^\s*\d+/,Bv=/^%/,jv=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;nr({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});var Hv="%Y-%m-%dT%H:%M:%S.%LZ",Xv=Date.prototype.toISOString?er:t.utcFormat(Hv),Vv=+new Date("2000-01-01T00:00:00.000Z")?rr:t.utcParse(Hv),Wv=Array.prototype,$v=Wv.map,Zv=Wv.slice,Gv={name:"implicit"},Jv=function(t){return function(){return t}},Qv=function(t){return+t},Kv=[0,1],t_=function(n,r,i){var o,u=n[0],a=n[n.length-1],c=e(u,a,null==r?10:r);switch(i=Pv(null==i?",f":i),i.type){case"s":var s=Math.max(Math.abs(u),Math.abs(a));return null!=i.precision||isNaN(o=Ov(c,s))||(i.precision=o),t.formatPrefix(i,s);case"":case"e":case"g":case"p":case"r":null!=i.precision||isNaN(o=Fv(c,Math.max(Math.abs(u),Math.abs(a))))||(i.precision=o-("e"===i.type));break;case"f":case"%":null!=i.precision||isNaN(o=Dv(c))||(i.precision=o-2*("%"===i.type))}return t.format(i)},n_=function(t,n){t=t.slice();var e,r=0,i=t.length-1,o=t[r],u=t[i];return u<o&&(e=r,r=i,i=e,e=o,o=u,u=e),t[r]=n.floor(o),t[i]=n.ceil(u),t},e_=1e3,r_=60*e_,i_=60*r_,o_=24*i_,u_=7*o_,a_=30*o_,c_=365*o_,s_=function(){return Rr(Jd,Zd,Ld,Rd,zd,Ad,Sd,xd,t.timeFormat).domain([new Date(2e3,0,1),new Date(2e3,0,2)])},f_=function(){return Rr(bv,mv,ov,rv,nv,Kd,Sd,xd,t.utcFormat).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)])},l_=function(t){return t.match(/.{6}/g).map(function(t){return"#"+t})},h_=l_("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),p_=l_("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"),d_=l_("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"),v_=l_("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"),__=Up(ln(300,.5,0),ln(-240,.5,1)),y_=Up(ln(-100,.75,.35),ln(80,1.5,.8)),g_=Up(ln(260,.75,.35),ln(80,1.5,.8)),m_=ln(),x_=function(t){(t<0||t>1)&&(t-=Math.floor(t));var n=Math.abs(t-.5);return m_.h=360*t-100,m_.s=1.5-1.5*n,m_.l=.8-.9*n,m_+""},b_=qr(l_("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),w_=qr(l_("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),M_=qr(l_("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),T_=qr(l_("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921")),N_="http://www.w3.org/1999/xhtml",k_={svg:"http://www.w3.org/2000/svg",xhtml:N_,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},S_=function(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),k_.hasOwnProperty(n)?{space:k_[n],local:t}:t},E_=function(t){var n=S_(t);return(n.local?Dr:Ur)(n)},A_=0;Fr.prototype=Or.prototype={constructor:Fr,get:function(t){for(var n=this._;!(n in t);)if(!(t=t.parentNode))return;return t[n]},set:function(t,n){return t[this._]=n},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}};var C_=function(t){return function(){return this.matches(t)}};if("undefined"!=typeof document){var z_=document.documentElement;if(!z_.matches){var P_=z_.webkitMatchesSelector||z_.msMatchesSelector||z_.mozMatchesSelector||z_.oMatchesSelector;C_=function(t){return function(){return P_.call(this,t)}}}}var R_=C_,q_={};if(t.event=null,"undefined"!=typeof document){var L_=document.documentElement;"onmouseenter"in L_||(q_={mouseenter:"mouseover",mouseleave:"mouseout"})}var U_=function(t,n,e){var r,i,o=Br(t+""),u=o.length;{if(!(arguments.length<2)){for(a=n?Hr:jr,null==e&&(e=!1),r=0;r<u;++r)this.each(a(o[r],n,e));return this}var a=this.node().__on;if(a)for(var c,s=0,f=a.length;s<f;++s)for(r=0,c=a[s];r<u;++r)if((i=o[r]).type===c.type&&i.name===c.name)return c.value}},D_=function(){for(var n,e=t.event;n=e.sourceEvent;)e=n;return e},O_=function(t,n){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}var i=t.getBoundingClientRect();return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]},F_=function(t){var n=D_();return n.changedTouches&&(n=n.changedTouches[0]),O_(t,n)},I_=function(t){return null==t?Vr:function(){return this.querySelector(t)}},Y_=function(t){"function"!=typeof t&&(t=I_(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u,a=n[i],c=a.length,s=r[i]=new Array(c),f=0;f<c;++f)(o=a[f])&&(u=t.call(o,o.__data__,f,a))&&("__data__"in o&&(u.__data__=o.__data__),s[f]=u);return new zi(r,this._parents)},B_=function(t){return null==t?Wr:function(){return this.querySelectorAll(t)}},j_=function(t){"function"!=typeof t&&(t=B_(t));for(var n=this._groups,e=n.length,r=[],i=[],o=0;o<e;++o)for(var u,a=n[o],c=a.length,s=0;s<c;++s)(u=a[s])&&(r.push(t.call(u,u.__data__,s,a)),i.push(u));return new zi(r,i)},H_=function(t){"function"!=typeof t&&(t=R_(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u=n[i],a=u.length,c=r[i]=[],s=0;s<a;++s)(o=u[s])&&t.call(o,o.__data__,s,u)&&c.push(o);return new zi(r,this._parents)},X_=function(t){return new Array(t.length)},V_=function(){return new zi(this._enter||this._groups.map(X_),this._parents)};$r.prototype={constructor:$r,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};var W_=function(t){return function(){return t}},$_="$",Z_=function(t,n){if(!t)return p=new Array(this.size()),s=-1,this.each(function(t){p[++s]=t}),p;var e=n?Gr:Zr,r=this._parents,i=this._groups;"function"!=typeof t&&(t=W_(t));for(var o=i.length,u=new Array(o),a=new Array(o),c=new Array(o),s=0;s<o;++s){var f=r[s],l=i[s],h=l.length,p=t.call(f,f&&f.__data__,s,r),d=p.length,v=a[s]=new Array(d),_=u[s]=new Array(d),y=c[s]=new Array(h);e(f,l,v,_,y,p,n);for(var g,m,x=0,b=0;x<d;++x)if(g=v[x]){for(x>=b&&(b=x+1);!(m=_[b])&&++b<d;);g._next=m||null}}return u=new zi(u,r),u._enter=a,u._exit=c,u},G_=function(){return new zi(this._exit||this._groups.map(X_),this._parents)},J_=function(t){for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),u=new Array(r),a=0;a<o;++a)for(var c,s=n[a],f=e[a],l=s.length,h=u[a]=new Array(l),p=0;p<l;++p)(c=s[p]||f[p])&&(h[p]=c);for(;a<r;++a)u[a]=n[a];return new zi(u,this._parents)},Q_=function(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],o=i.length-1,u=i[o];--o>=0;)(r=i[o])&&(u&&u!==r.nextSibling&&u.parentNode.insertBefore(r,u),u=r);return this},K_=function(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=Jr);for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){for(var u,a=e[o],c=a.length,s=i[o]=new Array(c),f=0;f<c;++f)(u=a[f])&&(s[f]=u);s.sort(n)}return new zi(i,this._parents).order()},ty=function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},ny=function(){var t=new Array(this.size()),n=-1;return this.each(function(){t[++n]=this}),t},ey=function(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){var u=r[i];if(u)return u}return null},ry=function(){var t=0;return this.each(function(){++t}),t},iy=function(){return!this.node()},oy=function(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,o=n[e],u=0,a=o.length;u<a;++u)(i=o[u])&&t.call(i,i.__data__,u,o);return this},uy=function(t,n){var e=S_(t);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((null==n?e.local?Kr:Qr:"function"==typeof n?e.local?ri:ei:e.local?ni:ti)(e,n))},ay=function(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView},cy=function(t,n,e){var r;return arguments.length>1?this.each((null==n?ii:"function"==typeof n?ui:oi)(t,n,null==e?"":e)):ay(r=this.node()).getComputedStyle(r,null).getPropertyValue(t)},sy=function(t,n){return arguments.length>1?this.each((null==n?ai:"function"==typeof n?si:ci)(t,n)):this.node()[t]};hi.prototype={add:function(t){var n=this._names.indexOf(t);n<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var fy=function(t,n){var e=fi(t+"");if(arguments.length<2){for(var r=li(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1;return!0}return this.each(("function"==typeof n?yi:n?vi:_i)(e,n))},ly=function(t){return arguments.length?this.each(null==t?gi:("function"==typeof t?xi:mi)(t)):this.node().textContent},hy=function(t){return arguments.length?this.each(null==t?bi:("function"==typeof t?Mi:wi)(t)):this.node().innerHTML},py=function(){return this.each(Ti)},dy=function(){return this.each(Ni)},vy=function(t){var n="function"==typeof t?t:E_(t);return this.select(function(){return this.appendChild(n.apply(this,arguments))})},_y=function(t,n){var e="function"==typeof t?t:E_(t),r=null==n?ki:"function"==typeof n?n:I_(n);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})},yy=function(){return this.each(Si)},gy=function(t){return arguments.length?this.property("__data__",t):this.node().__data__},my=function(t,n){return this.each(("function"==typeof n?Ci:Ai)(t,n))},xy=[null];zi.prototype=Pi.prototype={constructor:zi,select:Y_,selectAll:j_,filter:H_,data:Z_,enter:V_,exit:G_,merge:J_,order:Q_,sort:K_,call:ty,nodes:ny,node:ey,size:ry,empty:iy,each:oy,attr:uy,style:cy,property:sy,classed:fy,text:ly,html:hy,raise:py,lower:dy,append:vy,insert:_y,remove:yy,datum:gy,on:U_,dispatch:my};var by=function(t){return"string"==typeof t?new zi([[document.querySelector(t)]],[document.documentElement]):new zi([[t]],xy)},wy=function(t){return"string"==typeof t?new zi([document.querySelectorAll(t)],[document.documentElement]):new zi([null==t?[]:t],xy)},My=function(t,n,e){arguments.length<3&&(e=n,n=D_().changedTouches);for(var r,i=0,o=n?n.length:0;i<o;++i)if((r=n[i]).identifier===e)return O_(t,r);return null},Ty=function(t,n){null==n&&(n=D_().touches);for(var e=0,r=n?n.length:0,i=new Array(r);e<r;++e)i[e]=O_(t,n[e]);return i},Ny=Pn("start","end","interrupt"),ky=[],Sy=0,Ey=1,Ay=2,Cy=3,zy=4,Py=5,Ry=6,qy=function(t,n,e,r,i,o){var u=t.__transition;if(u){if(e in u)return}else t.__transition={};Ui(t,e,{name:n,index:r,group:i,on:Ny,tween:ky,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:Sy})},Ly=function(t,n){var e,r,i,o=t.__transition,u=!0;if(o){n=null==n?null:n+"";for(i in o)(e=o[i]).name===n?(r=e.state>Ay&&e.state<Py,e.state=Ry,e.timer.stop(),r&&e.on.call("interrupt",t,t.__data__,e.index,e.group),delete o[i]):u=!1;u&&delete t.__transition}},Uy=function(t){return this.each(function(){Ly(this,t)})},Dy=function(t,n){var e=this._id;if(t+="",arguments.length<2){for(var r,i=Li(this.node(),e).tween,o=0,u=i.length;o<u;++o)if((r=i[o]).name===t)return r.value;return null}return this.each((null==n?Di:Oi)(e,t,n))},Oy=function(t,n){var e;return("number"==typeof n?dp:n instanceof Bt?sp:(e=Bt(n))?(n=e,sp):gp)(t,n)},Fy=function(t,n){var e=S_(t),r="transform"===e?Np:Oy;return this.attrTween(t,"function"==typeof n?(e.local?Xi:Hi)(e,r,Fi(this,"attr."+t,n)):null==n?(e.local?Yi:Ii)(e):(e.local?ji:Bi)(e,r,n))},Iy=function(t,n){var e="attr."+t;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(null==n)return this.tween(e,null);if("function"!=typeof n)throw new Error;var r=S_(t);return this.tween(e,(r.local?Vi:Wi)(r,n))},Yy=function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?$i:Zi)(n,t)):Li(this.node(),n).delay},By=function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?Gi:Ji)(n,t)):Li(this.node(),n).duration},jy=function(t){var n=this._id;return arguments.length?this.each(Qi(n,t)):Li(this.node(),n).ease},Hy=function(t){"function"!=typeof t&&(t=R_(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u=n[i],a=u.length,c=r[i]=[],s=0;s<a;++s)(o=u[s])&&t.call(o,o.__data__,s,u)&&c.push(o);return new so(r,this._parents,this._name,this._id)},Xy=function(t){if(t._id!==this._id)throw new Error;for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),u=new Array(r),a=0;a<o;++a)for(var c,s=n[a],f=e[a],l=s.length,h=u[a]=new Array(l),p=0;p<l;++p)(c=s[p]||f[p])&&(h[p]=c);for(;a<r;++a)u[a]=n[a];return new so(u,this._parents,this._name,this._id)},Vy=function(t,n){var e=this._id;return arguments.length<2?Li(this.node(),e).on.on(t):this.each(to(e,t,n))},Wy=function(){return this.on("end.remove",no(this._id))},$y=function(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=I_(t));for(var r=this._groups,i=r.length,o=new Array(i),u=0;u<i;++u)for(var a,c,s=r[u],f=s.length,l=o[u]=new Array(f),h=0;h<f;++h)(a=s[h])&&(c=t.call(a,a.__data__,h,s))&&("__data__"in a&&(c.__data__=a.__data__),l[h]=c,qy(l[h],n,e,h,l,Li(a,e)));return new so(o,this._parents,n,e)},Zy=function(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=B_(t));for(var r=this._groups,i=r.length,o=[],u=[],a=0;a<i;++a)for(var c,s=r[a],f=s.length,l=0;l<f;++l)if(c=s[l]){for(var h,p=t.call(c,c.__data__,l,s),d=Li(c,e),v=0,_=p.length;v<_;++v)(h=p[v])&&qy(h,n,e,v,p,d);o.push(p),u.push(c)}return new so(o,u,n,e);
},Gy=Pi.prototype.constructor,Jy=function(){return new Gy(this._groups,this._parents)},Qy=function(t,n,e){var r="transform"==(t+="")?Tp:Oy;return null==n?this.styleTween(t,eo(t,r)).on("end.style."+t,ro(t)):this.styleTween(t,"function"==typeof n?oo(t,r,Fi(this,"style."+t,n)):io(t,r,n),e)},Ky=function(t,n,e){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==n)return this.tween(r,null);if("function"!=typeof n)throw new Error;return this.tween(r,uo(t,n,null==e?"":e))},tg=function(t){return this.tween("text","function"==typeof t?co(Fi(this,"text",t)):ao(null==t?"":t+""))},ng=function(){for(var t=this._name,n=this._id,e=lo(),r=this._groups,i=r.length,o=0;o<i;++o)for(var u,a=r[o],c=a.length,s=0;s<c;++s)if(u=a[s]){var f=Li(u,n);qy(u,t,e,s,a,{time:f.time+f.delay+f.duration,delay:0,duration:f.duration,ease:f.ease})}return new so(r,this._parents,t,e)},eg=0,rg=Pi.prototype;so.prototype=fo.prototype={constructor:so,select:$y,selectAll:Zy,filter:Hy,merge:Xy,selection:Jy,transition:ng,call:rg.call,nodes:rg.nodes,node:rg.node,size:rg.size,empty:rg.empty,each:rg.each,on:Vy,attr:Fy,attrTween:Iy,style:Qy,styleTween:Ky,text:tg,remove:Wy,tween:Dy,delay:Yy,duration:By,ease:jy};var ig={time:null,delay:0,duration:250,ease:g},og=function(t){var n,e;t instanceof so?(n=t._id,t=t._name):(n=lo(),(e=ig).time=jn(),t=null==t?null:t+"");for(var r=this._groups,i=r.length,o=0;o<i;++o)for(var u,a=r[o],c=a.length,s=0;s<c;++s)(u=a[s])&&qy(u,t,n,s,a,e||ho(u,n));return new so(r,this._parents,t,n)};Pi.prototype.interrupt=Uy,Pi.prototype.transition=og;var ug=[null],ag=function(t,n){var e,r,i=t.__transition;if(i){n=null==n?null:n+"";for(r in i)if((e=i[r]).state>Ey&&e.name===n)return new so([[t]],ug,n,+r)}return null},cg=Array.prototype.slice,sg=function(t){return t},fg=1,lg=2,hg=3,pg=4,dg=1e-6,vg=function(){function t(t){var o,u=0;t.eachAfter(function(t){var e=t.children;e?(t.x=To(e),t.y=ko(e)):(t.x=o?u+=n(t,o):0,t.y=0,o=t)});var a=Eo(t),c=Ao(t),s=a.x-n(a,c)/2,f=c.x+n(c,a)/2;return t.eachAfter(i?function(n){n.x=(n.x-t.x)*e,n.y=(t.y-n.y)*r}:function(n){n.x=(n.x-s)/(f-s)*e,n.y=(1-(t.y?n.y/t.y:1))*r})}var n=Mo,e=1,r=1,i=!1;return t.separation=function(e){return arguments.length?(n=e,t):n},t.size=function(n){return arguments.length?(i=!1,e=+n[0],r=+n[1],t):i?null:[e,r]},t.nodeSize=function(n){return arguments.length?(i=!0,e=+n[0],r=+n[1],t):i?[e,r]:null},t},_g=function(t){var n,e,r,i,o=this,u=[o];do for(n=u.reverse(),u=[];o=n.pop();)if(t(o),e=o.children)for(r=0,i=e.length;r<i;++r)u.push(e[r]);while(u.length);return this},yg=function(t){for(var n,e,r=this,i=[r];r=i.pop();)if(t(r),n=r.children)for(e=n.length-1;e>=0;--e)i.push(n[e]);return this},gg=function(t){for(var n,e,r,i=this,o=[i],u=[];i=o.pop();)if(u.push(i),n=i.children)for(e=0,r=n.length;e<r;++e)o.push(n[e]);for(;i=u.pop();)t(i);return this},mg=function(t){return this.eachAfter(function(n){for(var e=+t(n.data)||0,r=n.children,i=r&&r.length;--i>=0;)e+=r[i].value;n.value=e})},xg=function(t){return this.eachBefore(function(n){n.children&&n.children.sort(t)})},bg=function(t){for(var n=this,e=Co(n,t),r=[n];n!==e;)n=n.parent,r.push(n);for(var i=r.length;t!==e;)r.splice(i,0,t),t=t.parent;return r},wg=function(){for(var t=this,n=[t];t=t.parent;)n.push(t);return n},Mg=function(){var t=[];return this.each(function(n){t.push(n)}),t},Tg=function(){var t=[];return this.eachBefore(function(n){n.children||t.push(n)}),t},Ng=function(){var t=this,n=[];return t.each(function(e){e!==t&&n.push({source:e.parent,target:e})}),n};Uo.prototype=zo.prototype={constructor:Uo,each:_g,eachAfter:gg,eachBefore:yg,sum:mg,sort:xg,path:bg,ancestors:wg,descendants:Mg,leaves:Tg,links:Ng,copy:Po};var kg=function(t){for(var n,e=(t=t.slice()).length,r=null,i=r;e;){var o=new Do(t[e-1]);i=i?i.next=o:r=o,t[n]=t[--e]}return{head:r,tail:i}},Sg=function(t){return Fo(kg(t),[])},Eg=function(t){return Wo(t),t},Ag=function(t){return function(){return t}},Cg=function(){function t(t){return t.x=e/2,t.y=r/2,n?t.eachBefore(Qo(n)).eachAfter(Ko(i,.5)).eachBefore(tu(1)):t.eachBefore(Qo(Jo)).eachAfter(Ko(Go,1)).eachAfter(Ko(i,t.r/Math.min(e,r))).eachBefore(tu(Math.min(e,r)/(2*t.r))),t}var n=null,e=1,r=1,i=Go;return t.radius=function(e){return arguments.length?(n=$o(e),t):n},t.size=function(n){return arguments.length?(e=+n[0],r=+n[1],t):[e,r]},t.padding=function(n){return arguments.length?(i="function"==typeof n?n:Ag(+n),t):i},t},zg=function(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)},Pg=function(t,n,e,r,i){for(var o,u=t.children,a=-1,c=u.length,s=t.value&&(r-n)/t.value;++a<c;)o=u[a],o.y0=e,o.y1=i,o.x0=n,o.x1=n+=o.value*s},Rg=function(){function t(t){var u=t.height+1;return t.x0=t.y0=i,t.x1=e,t.y1=r/u,t.eachBefore(n(r,u)),o&&t.eachBefore(zg),t}function n(t,n){return function(e){e.children&&Pg(e,e.x0,t*(e.depth+1)/n,e.x1,t*(e.depth+2)/n);var r=e.x0,o=e.y0,u=e.x1-i,a=e.y1-i;u<r&&(r=u=(r+u)/2),a<o&&(o=a=(o+a)/2),e.x0=r,e.y0=o,e.x1=u,e.y1=a}}var e=1,r=1,i=0,o=!1;return t.round=function(n){return arguments.length?(o=!!n,t):o},t.size=function(n){return arguments.length?(e=+n[0],r=+n[1],t):[e,r]},t.padding=function(n){return arguments.length?(i=+n,t):i},t},qg="$",Lg={depth:-1},Ug={},Dg=function(){function t(t){var r,i,o,u,a,c,s,f=t.length,l=new Array(f),h={};for(i=0;i<f;++i)r=t[i],a=l[i]=new Uo(r),null!=(c=n(r,i,t))&&(c+="")&&(s=qg+(a.id=c),h[s]=s in h?Ug:a);for(i=0;i<f;++i)if(a=l[i],c=e(t[i],i,t),null!=c&&(c+="")){if(u=h[qg+c],!u)throw new Error("missing: "+c);if(u===Ug)throw new Error("ambiguous: "+c);u.children?u.children.push(a):u.children=[a],a.parent=u}else{if(o)throw new Error("multiple roots");o=a}if(!o)throw new Error("no root");if(o.parent=Lg,o.eachBefore(function(t){t.depth=t.parent.depth+1,--f}).eachBefore(Lo),o.parent=null,f>0)throw new Error("cycle");return o}var n=nu,e=eu;return t.id=function(e){return arguments.length?(n=Zo(e),t):n},t.parentId=function(n){return arguments.length?(e=Zo(n),t):e},t};su.prototype=Object.create(Uo.prototype);var Og=function(){function t(t){var r=fu(t);if(r.eachAfter(n),r.parent.m=-r.z,r.eachBefore(e),c)t.eachBefore(i);else{var s=t,f=t,l=t;t.eachBefore(function(t){t.x<s.x&&(s=t),t.x>f.x&&(f=t),t.depth>l.depth&&(l=t)});var h=s===f?1:o(s,f)/2,p=h-s.x,d=u/(f.x+h+p),v=a/(l.depth||1);t.eachBefore(function(t){t.x=(t.x+p)*d,t.y=t.depth*v})}return t}function n(t){var n=t.children,e=t.parent.children,i=t.i?e[t.i-1]:null;if(n){au(t);var u=(n[0].z+n[n.length-1].z)/2;i?(t.z=i.z+o(t._,i._),t.m=t.z-u):t.z=u}else i&&(t.z=i.z+o(t._,i._));t.parent.A=r(t,i,t.parent.A||e[0])}function e(t){t._.x=t.z+t.parent.m,t.m+=t.parent.m}function r(t,n,e){if(n){for(var r,i=t,u=t,a=n,c=i.parent.children[0],s=i.m,f=u.m,l=a.m,h=c.m;a=ou(a),i=iu(i),a&&i;)c=iu(c),u=ou(u),u.a=t,r=a.z+l-i.z-s+o(a._,i._),r>0&&(uu(cu(a,t,e),t,r),s+=r,f+=r),l+=a.m,s+=i.m,h+=c.m,f+=u.m;a&&!ou(u)&&(u.t=a,u.m+=l-f),i&&!iu(c)&&(c.t=i,c.m+=s-h,e=t)}return e}function i(t){t.x*=u,t.y=t.depth*a}var o=ru,u=1,a=1,c=null;return t.separation=function(n){return arguments.length?(o=n,t):o},t.size=function(n){return arguments.length?(c=!1,u=+n[0],a=+n[1],t):c?null:[u,a]},t.nodeSize=function(n){return arguments.length?(c=!0,u=+n[0],a=+n[1],t):c?[u,a]:null},t},Fg=function(t,n,e,r,i){for(var o,u=t.children,a=-1,c=u.length,s=t.value&&(i-e)/t.value;++a<c;)o=u[a],o.x0=n,o.x1=r,o.y0=e,o.y1=e+=o.value*s},Ig=(1+Math.sqrt(5))/2,Yg=function t(n){function e(t,e,r,i,o){lu(n,t,e,r,i,o)}return e.ratio=function(n){return t((n=+n)>1?n:1)},e}(Ig),Bg=function(){function t(t){return t.x0=t.y0=0,t.x1=i,t.y1=o,t.eachBefore(n),u=[0],r&&t.eachBefore(zg),t}function n(t){var n=u[t.depth],r=t.x0+n,i=t.y0+n,o=t.x1-n,h=t.y1-n;o<r&&(r=o=(r+o)/2),h<i&&(i=h=(i+h)/2),t.x0=r,t.y0=i,t.x1=o,t.y1=h,t.children&&(n=u[t.depth+1]=a(t)/2,r+=l(t)-n,i+=c(t)-n,o-=s(t)-n,h-=f(t)-n,o<r&&(r=o=(r+o)/2),h<i&&(i=h=(i+h)/2),e(t,r,i,o,h))}var e=Yg,r=!1,i=1,o=1,u=[0],a=Go,c=Go,s=Go,f=Go,l=Go;return t.round=function(n){return arguments.length?(r=!!n,t):r},t.size=function(n){return arguments.length?(i=+n[0],o=+n[1],t):[i,o]},t.tile=function(n){return arguments.length?(e=Zo(n),t):e},t.padding=function(n){return arguments.length?t.paddingInner(n).paddingOuter(n):t.paddingInner()},t.paddingInner=function(n){return arguments.length?(a="function"==typeof n?n:Ag(+n),t):a},t.paddingOuter=function(n){return arguments.length?t.paddingTop(n).paddingRight(n).paddingBottom(n).paddingLeft(n):t.paddingTop()},t.paddingTop=function(n){return arguments.length?(c="function"==typeof n?n:Ag(+n),t):c},t.paddingRight=function(n){return arguments.length?(s="function"==typeof n?n:Ag(+n),t):s},t.paddingBottom=function(n){return arguments.length?(f="function"==typeof n?n:Ag(+n),t):f},t.paddingLeft=function(n){return arguments.length?(l="function"==typeof n?n:Ag(+n),t):l},t},jg=function(t,n,e,r,i){function o(t,n,e,r,i,u,a){if(t>=n-1){var s=c[t];return s.x0=r,s.y0=i,s.x1=u,s.y1=a,void 0}for(var l=f[t],h=e/2+l,p=t+1,d=n-1;p<d;){var v=p+d>>>1;f[v]<h?p=v+1:d=v}var _=f[p]-l,y=e-_;if(a-i>u-r){var g=(i*y+a*_)/e;o(t,p,_,r,i,u,g),o(p,n,y,r,g,u,a)}else{var m=(r*y+u*_)/e;o(t,p,_,r,i,m,a),o(p,n,y,m,i,u,a)}}var u,a,c=t.children,s=c.length,f=new Array(s+1);for(f[0]=a=u=0;u<s;++u)f[u+1]=a+=c[u].value;o(0,s,t.value,n,e,r,i)},Hg=function(t,n,e,r,i){(1&t.depth?Fg:Pg)(t,n,e,r,i)},Xg=function t(n){function e(t,e,r,i,o){if((u=t._squarify)&&u.ratio===n)for(var u,a,c,s,f,l=-1,h=u.length,p=t.value;++l<h;){for(a=u[l],c=a.children,s=a.value=0,f=c.length;s<f;++s)a.value+=c[s].value;a.dice?Pg(a,e,r,i,r+=(o-r)*a.value/p):Fg(a,e,r,e+=(i-e)*a.value/p,o),p-=a.value}else t._squarify=u=lu(n,t,e,r,i,o),u.ratio=n}return e.ratio=function(n){return t((n=+n)>1?n:1)},e}(Ig),Vg=function(t,n){function e(){var e,i,o=r.length,u=0,a=0;for(e=0;e<o;++e)i=r[e],u+=i.x,a+=i.y;for(u=u/o-t,a=a/o-n,e=0;e<o;++e)i=r[e],i.x-=u,i.y-=a}var r;return null==t&&(t=0),null==n&&(n=0),e.initialize=function(t){r=t},e.x=function(n){return arguments.length?(t=+n,e):t},e.y=function(t){return arguments.length?(n=+t,e):n},e},Wg=function(t){return function(){return t}},$g=function(){return 1e-6*(Math.random()-.5)},Zg=function(t){function n(){function t(t,n,e,r,i){var o=t.data,a=t.r,p=l+a;{if(!o)return n>s+p||r<s-p||e>f+p||i<f-p;if(o.index>c.index){var d=s-o.x-o.vx,v=f-o.y-o.vy,_=d*d+v*v;_<p*p&&(0===d&&(d=$g(),_+=d*d),0===v&&(v=$g(),_+=v*v),_=(p-(_=Math.sqrt(_)))/_*u,c.vx+=(d*=_)*(p=(a*=a)/(h+a)),c.vy+=(v*=_)*p,o.vx-=d*(p=1-p),o.vy-=v*p)}}}for(var n,r,c,s,f,l,h,p=i.length,d=0;d<a;++d)for(r=I(i,hu,pu).visitAfter(e),n=0;n<p;++n)c=i[n],l=o[c.index],h=l*l,s=c.x+c.vx,f=c.y+c.vy,r.visit(t)}function e(t){if(t.data)return t.r=o[t.data.index];for(var n=t.r=0;n<4;++n)t[n]&&t[n].r>t.r&&(t.r=t[n].r)}function r(){if(i){var n,e,r=i.length;for(o=new Array(r),n=0;n<r;++n)e=i[n],o[e.index]=+t(e,n,i)}}var i,o,u=1,a=1;return"function"!=typeof t&&(t=Wg(null==t?1:+t)),n.initialize=function(t){i=t,r()},n.iterations=function(t){return arguments.length?(a=+t,n):a},n.strength=function(t){return arguments.length?(u=+t,n):u},n.radius=function(e){return arguments.length?(t="function"==typeof e?e:Wg(+e),r(),n):t},n},Gg=function(t){function n(t){return 1/Math.min(f[t.source.index],f[t.target.index])}function e(n){for(var e=0,r=t.length;e<v;++e)for(var i,o,u,s,f,h,p,d=0;d<r;++d)i=t[d],o=i.source,u=i.target,s=u.x+u.vx-o.x-o.vx||$g(),f=u.y+u.vy-o.y-o.vy||$g(),h=Math.sqrt(s*s+f*f),h=(h-c[d])/h*n*a[d],s*=h,f*=h,u.vx-=s*(p=l[d]),u.vy-=f*p,o.vx+=s*(p=1-p),o.vy+=f*p}function r(){if(s){var n,e,r=s.length,p=t.length,d=o(s,h);for(n=0,f=new Array(r);n<p;++n)e=t[n],e.index=n,"object"!=typeof e.source&&(e.source=vu(d,e.source)),"object"!=typeof e.target&&(e.target=vu(d,e.target)),f[e.source.index]=(f[e.source.index]||0)+1,f[e.target.index]=(f[e.target.index]||0)+1;for(n=0,l=new Array(p);n<p;++n)e=t[n],l[n]=f[e.source.index]/(f[e.source.index]+f[e.target.index]);a=new Array(p),i(),c=new Array(p),u()}}function i(){if(s)for(var n=0,e=t.length;n<e;++n)a[n]=+p(t[n],n,t)}function u(){if(s)for(var n=0,e=t.length;n<e;++n)c[n]=+d(t[n],n,t)}var a,c,s,f,l,h=du,p=n,d=Wg(30),v=1;return null==t&&(t=[]),e.initialize=function(t){s=t,r()},e.links=function(n){return arguments.length?(t=n,r(),e):t},e.id=function(t){return arguments.length?(h=t,e):h},e.iterations=function(t){return arguments.length?(v=+t,e):v},e.strength=function(t){return arguments.length?(p="function"==typeof t?t:Wg(+t),i(),e):p},e.distance=function(t){return arguments.length?(d="function"==typeof t?t:Wg(+t),u(),e):d},e},Jg=10,Qg=Math.PI*(3-Math.sqrt(5)),Kg=function(t){function n(){e(),d.call("tick",u),a<c&&(p.stop(),d.call("end",u))}function e(){var n,e,r=t.length;for(a+=(f-a)*s,h.each(function(t){t(a)}),n=0;n<r;++n)e=t[n],null==e.fx?e.x+=e.vx*=l:(e.x=e.fx,e.vx=0),null==e.fy?e.y+=e.vy*=l:(e.y=e.fy,e.vy=0)}function r(){for(var n,e=0,r=t.length;e<r;++e){if(n=t[e],n.index=e,isNaN(n.x)||isNaN(n.y)){var i=Jg*Math.sqrt(e),o=e*Qg;n.x=i*Math.cos(o),n.y=i*Math.sin(o)}(isNaN(n.vx)||isNaN(n.vy))&&(n.vx=n.vy=0)}}function i(n){return n.initialize&&n.initialize(t),n}var u,a=1,c=.001,s=1-Math.pow(c,1/300),f=0,l=.6,h=o(),p=Vn(n),d=Pn("tick","end");return null==t&&(t=[]),r(),u={tick:e,restart:function(){return p.restart(n),u},stop:function(){return p.stop(),u},nodes:function(n){return arguments.length?(t=n,r(),h.each(i),u):t},alpha:function(t){return arguments.length?(a=+t,u):a},alphaMin:function(t){return arguments.length?(c=+t,u):c},alphaDecay:function(t){return arguments.length?(s=+t,u):+s},alphaTarget:function(t){return arguments.length?(f=+t,u):f},velocityDecay:function(t){return arguments.length?(l=1-t,u):1-l},force:function(t,n){return arguments.length>1?(null==n?h.remove(t):h.set(t,i(n)),u):h.get(t)},find:function(n,e,r){var i,o,u,a,c,s=0,f=t.length;for(null==r?r=1/0:r*=r,s=0;s<f;++s)a=t[s],i=n-a.x,o=e-a.y,u=i*i+o*o,u<r&&(c=a,r=u);return c},on:function(t,n){return arguments.length>1?(d.on(t,n),u):d.on(t)}}},tm=function(){function t(t){var n,a=i.length,c=I(i,_u,yu).visitAfter(e);for(u=t,n=0;n<a;++n)o=i[n],c.visit(r)}function n(){if(i){var t,n,e=i.length;for(a=new Array(e),t=0;t<e;++t)n=i[t],a[n.index]=+c(n,t,i)}}function e(t){var n,e,r,i,o,u=0;if(t.length){for(r=i=o=0;o<4;++o)(n=t[o])&&(e=n.value)&&(u+=e,r+=e*n.x,i+=e*n.y);t.x=r/u,t.y=i/u}else{n=t,n.x=n.data.x,n.y=n.data.y;do u+=a[n.data.index];while(n=n.next)}t.value=u}function r(t,n,e,r){if(!t.value)return!0;var i=t.x-o.x,c=t.y-o.y,h=r-n,p=i*i+c*c;if(h*h/l<p)return p<f&&(0===i&&(i=$g(),p+=i*i),0===c&&(c=$g(),p+=c*c),p<s&&(p=Math.sqrt(s*p)),o.vx+=i*t.value*u/p,o.vy+=c*t.value*u/p),!0;if(!(t.length||p>=f)){(t.data!==o||t.next)&&(0===i&&(i=$g(),p+=i*i),0===c&&(c=$g(),p+=c*c),p<s&&(p=Math.sqrt(s*p)));do t.data!==o&&(h=a[t.data.index]*u/p,o.vx+=i*h,o.vy+=c*h);while(t=t.next)}}var i,o,u,a,c=Wg(-30),s=1,f=1/0,l=.81;return t.initialize=function(t){i=t,n()},t.strength=function(e){return arguments.length?(c="function"==typeof e?e:Wg(+e),n(),t):c},t.distanceMin=function(n){return arguments.length?(s=n*n,t):Math.sqrt(s)},t.distanceMax=function(n){return arguments.length?(f=n*n,t):Math.sqrt(f)},t.theta=function(n){return arguments.length?(l=n*n,t):Math.sqrt(l)},t},nm=function(t){function n(t){for(var n,e=0,u=r.length;e<u;++e)n=r[e],n.vx+=(o[e]-n.x)*i[e]*t}function e(){if(r){var n,e=r.length;for(i=new Array(e),o=new Array(e),n=0;n<e;++n)i[n]=isNaN(o[n]=+t(r[n],n,r))?0:+u(r[n],n,r)}}var r,i,o,u=Wg(.1);return"function"!=typeof t&&(t=Wg(null==t?0:+t)),n.initialize=function(t){r=t,e()},n.strength=function(t){return arguments.length?(u="function"==typeof t?t:Wg(+t),e(),n):u},n.x=function(r){return arguments.length?(t="function"==typeof r?r:Wg(+r),e(),n):t},n},em=function(t){function n(t){for(var n,e=0,u=r.length;e<u;++e)n=r[e],n.vy+=(o[e]-n.y)*i[e]*t}function e(){if(r){var n,e=r.length;for(i=new Array(e),o=new Array(e),n=0;n<e;++n)i[n]=isNaN(o[n]=+t(r[n],n,r))?0:+u(r[n],n,r)}}var r,i,o,u=Wg(.1);return"function"!=typeof t&&(t=Wg(null==t?0:+t)),n.initialize=function(t){r=t,e()},n.strength=function(t){return arguments.length?(u="function"==typeof t?t:Wg(+t),e(),n):u},n.y=function(r){return arguments.length?(t="function"==typeof r?r:Wg(+r),e(),n):t},n},rm=function(){t.event.preventDefault(),t.event.stopImmediatePropagation()},im=function(t){var n=t.document.documentElement,e=by(t).on("dragstart.drag",rm,!0);"onselectstart"in n?e.on("selectstart.drag",rm,!0):(n.__noselect=n.style.MozUserSelect,n.style.MozUserSelect="none")},om=function(t){return function(){return t}};xu.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};var um=function(){function n(t){t.on("mousedown.drag",e).on("touchstart.drag",o).on("touchmove.drag",u).on("touchend.drag touchcancel.drag",a).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function e(){if(!f&&l.apply(this,arguments)){var n=c("mouse",h.apply(this,arguments),F_,this,arguments);n&&(by(t.event.view).on("mousemove.drag",r,!0).on("mouseup.drag",i,!0),im(t.event.view),gu(),s=!1,n("start"))}}function r(){rm(),s=!0,d.mouse("drag")}function i(){by(t.event.view).on("mousemove.drag mouseup.drag",null),mu(t.event.view,s),rm(),d.mouse("end")}function o(){if(l.apply(this,arguments)){var n,e,r=t.event.changedTouches,i=h.apply(this,arguments),o=r.length;for(n=0;n<o;++n)(e=c(r[n].identifier,i,My,this,arguments))&&(gu(),e("start"))}}function u(){var n,e,r=t.event.changedTouches,i=r.length;for(n=0;n<i;++n)(e=d[r[n].identifier])&&(rm(),e("drag"))}function a(){var n,e,r=t.event.changedTouches,i=r.length;for(f&&clearTimeout(f),f=setTimeout(function(){f=null},500),n=0;n<i;++n)(e=d[r[n].identifier])&&(gu(),e("end"))}function c(e,r,i,o,u){var a,c,s,f=i(r,e),l=v.copy();if(Xr(new xu(n,"beforestart",a,e,_,f[0],f[1],0,0,l),function(){return null!=(t.event.subject=a=p.apply(o,u))&&(c=a.x-f[0]||0,s=a.y-f[1]||0,!0)}))return function t(h){var p,v=f;switch(h){case"start":d[e]=t,p=_++;break;case"end":delete d[e],--_;case"drag":f=i(r,e),p=_}Xr(new xu(n,h,a,e,p,f[0]+c,f[1]+s,f[0]-v[0],f[1]-v[1],l),l.apply,l,[h,o,u])}}var s,f,l=bu,h=wu,p=Mu,d={},v=Pn("start","drag","end"),_=0;return n.filter=function(t){return arguments.length?(l="function"==typeof t?t:om(!!t),n):l},n.container=function(t){return arguments.length?(h="function"==typeof t?t:om(t),n):h},n.subject=function(t){return arguments.length?(p="function"==typeof t?t:om(t),n):p},n.on=function(){var t=v.on.apply(v,arguments);return t===v?n:t},n},am=function(t){return function(){return t}};ku.prototype={constructor:ku,insert:function(t,n){var e,r,i;if(t){if(n.P=t,n.N=t.N,t.N&&(t.N.P=n),t.N=n,t.R){for(t=t.R;t.L;)t=t.L;t.L=n}else t.R=n;e=t}else this._?(t=Cu(this._),n.P=null,n.N=t,t.P=t.L=n,e=t):(n.P=n.N=null,this._=n,e=null);for(n.L=n.R=null,n.U=e,n.C=!0,t=n;e&&e.C;)r=e.U,e===r.L?(i=r.R,i&&i.C?(e.C=i.C=!1,r.C=!0,t=r):(t===e.R&&(Eu(this,e),t=e,e=t.U),e.C=!1,r.C=!0,Au(this,r))):(i=r.L,i&&i.C?(e.C=i.C=!1,r.C=!0,t=r):(t===e.L&&(Au(this,e),t=e,e=t.U),e.C=!1,r.C=!0,Eu(this,r))),e=t.U;this._.C=!1},remove:function(t){t.N&&(t.N.P=t.P),t.P&&(t.P.N=t.N),t.N=t.P=null;var n,e,r,i=t.U,o=t.L,u=t.R;if(e=o?u?Cu(u):o:u,i?i.L===t?i.L=e:i.R=e:this._=e,o&&u?(r=e.C,e.C=t.C,e.L=o,o.U=e,e!==u?(i=e.U,e.U=t.U,t=e.R,i.L=t,e.R=u,u.U=e):(e.U=i,i=e,t=e.R)):(r=t.C,t=e),t&&(t.U=i),!r){if(t&&t.C)return void(t.C=!1);do{if(t===this._)break;if(t===i.L){if(n=i.R,n.C&&(n.C=!1,i.C=!0,Eu(this,i),n=i.R),n.L&&n.L.C||n.R&&n.R.C){n.R&&n.R.C||(n.L.C=!1,n.C=!0,Au(this,n),n=i.R),n.C=i.C,i.C=n.R.C=!1,Eu(this,i),t=this._;break}}else if(n=i.L,n.C&&(n.C=!1,i.C=!0,Au(this,i),n=i.L),n.L&&n.L.C||n.R&&n.R.C){n.L&&n.L.C||(n.R.C=!1,n.C=!0,Eu(this,n),n=i.L),n.C=i.C,i.C=n.L.C=!1,Au(this,i),t=this._;break}n.C=!0,t=i,i=i.U}while(!t.C);t&&(t.C=!1)}}};var cm,sm,fm,lm,hm,pm=[],dm=[],vm=1e-6,_m=1e-12;na.prototype={constructor:na,polygons:function(){var t=this.edges;return this.cells.map(function(n){var e=n.halfedges.map(function(e){return Fu(n,t[e])});return e.data=n.site.data,e})},triangles:function(){var t=[],n=this.edges;return this.cells.forEach(function(e,r){for(var i,o=e.site,u=e.halfedges,a=-1,c=u.length,s=n[u[c-1]],f=s.left===o?s.right:s.left;++a<c;)i=f,s=n[u[a]],f=s.left===o?s.right:s.left,i&&f&&r<i.index&&r<f.index&&Ku(o,i,f)<0&&t.push([o.data,i.data,f.data])}),t},links:function(){return this.edges.filter(function(t){return t.right}).map(function(t){return{source:t.left.data,target:t.right.data}})},find:function(t,n,e){var r,i=this,o=i._found||0,u=i.cells[o]||i.cells[o=0],a=t-u.site[0],c=n-u.site[1],s=a*a+c*c;do u=i.cells[r=o],o=null,u.halfedges.forEach(function(e){var r=i.edges[e],a=r.left;if(a!==u.site&&a||(a=r.right)){var c=t-a[0],f=n-a[1],l=c*c+f*f;l<s&&(s=l,o=a.index)}});while(null!==o);return i._found=r,null==e||s<=e*e?u.site:null}};var ym=function(){function t(t){return new na(t.map(function(r,i){var o=[Math.round(n(r,i,t)/vm)*vm,Math.round(e(r,i,t)/vm)*vm];return o.index=i,o.data=r,o}),r)}var n=Tu,e=Nu,r=null;return t.polygons=function(n){return t(n).polygons()},t.links=function(n){return t(n).links()},t.triangles=function(n){return t(n).triangles()},t.x=function(e){return arguments.length?(n="function"==typeof e?e:am(+e),t):n},t.y=function(n){return arguments.length?(e="function"==typeof n?n:am(+n),t):e},t.extent=function(n){return arguments.length?(r=null==n?null:[[+n[0][0],+n[0][1]],[+n[1][0],+n[1][1]]],t):r&&[[r[0][0],r[0][1]],[r[1][0],r[1][1]]]},t.size=function(n){return arguments.length?(r=null==n?null:[[0,0],[+n[0],+n[1]]],t):r&&[r[1][0]-r[0][0],r[1][1]-r[0][1]]},t},gm=function(t){return function(){return t}};ra.prototype={constructor:ra,scale:function(t){return 1===t?this:new ra(this.k*t,this.x,this.y)},translate:function(t,n){return 0===t&0===n?this:new ra(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var mm=new ra(1,0,0);ia.prototype=ra.prototype;var xm=function(){t.event.preventDefault(),t.event.stopImmediatePropagation()},bm=function(){function n(t){t.on("wheel.zoom",s).on("mousedown.zoom",f).on("dblclick.zoom",l).on("touchstart.zoom",h).on("touchmove.zoom",p).on("touchend.zoom touchcancel.zoom",d).style("-webkit-tap-highlight-color","rgba(0,0,0,0)").property("__zoom",ca)}function e(t,n){return n=Math.max(m,Math.min(x,n)),n===t.k?t:new ra(n,t.x,t.y)}function r(t,n,e){var r=n[0]-e[0]*t.k,i=n[1]-e[1]*t.k;return r===t.x&&i===t.y?t:new ra(t.k,r,i)}function i(t,n){var e=t.invertX(n[0][0])-b,r=t.invertX(n[1][0])-w,i=t.invertY(n[0][1])-M,o=t.invertY(n[1][1])-T;return t.translate(r>e?(e+r)/2:Math.min(0,e)||Math.max(0,r),o>i?(i+o)/2:Math.min(0,i)||Math.max(0,o))}function o(t){return[(+t[0][0]+ +t[1][0])/2,(+t[0][1]+ +t[1][1])/2]}function u(t,n,e){t.on("start.zoom",function(){a(this,arguments).start()}).on("interrupt.zoom end.zoom",function(){a(this,arguments).end()}).tween("zoom",function(){var t=this,r=arguments,i=a(t,r),u=g.apply(t,r),c=e||o(u),s=Math.max(u[1][0]-u[0][0],u[1][1]-u[0][1]),f=t.__zoom,l="function"==typeof n?n.apply(t,r):n,h=k(f.invert(c).concat(s/f.k),l.invert(c).concat(s/l.k));return function(t){if(1===t)t=l;else{var n=h(t),e=s/n[2];t=new ra(e,c[0]-n[0]*e,c[1]-n[1]*e)}i.zoom(null,t)}})}function a(t,n){for(var e,r=0,i=S.length;r<i;++r)if((e=S[r]).that===t)return e;return new c(t,n)}function c(t,n){this.that=t,this.args=n,this.index=-1,this.active=0,this.extent=g.apply(t,n)}function s(){function n(){o.wheel=null,o.end()}if(y.apply(this,arguments)){var o=a(this,arguments),u=this.__zoom,c=Math.max(m,Math.min(x,u.k*Math.pow(2,-t.event.deltaY*(t.event.deltaMode?120:1)/500))),s=F_(this);if(o.wheel)o.mouse[0][0]===s[0]&&o.mouse[0][1]===s[1]||(o.mouse[1]=u.invert(o.mouse[0]=s)),clearTimeout(o.wheel);else{if(u.k===c)return;o.mouse=[s,u.invert(s)],Ly(this),o.start()}xm(),o.wheel=setTimeout(n,C),o.zoom("mouse",i(r(e(u,c),o.mouse[0],o.mouse[1]),o.extent))}}function f(){function n(){xm(),o.moved=!0,o.zoom("mouse",i(r(o.that.__zoom,o.mouse[0]=F_(o.that),o.mouse[1]),o.extent))}function e(){u.on("mousemove.zoom mouseup.zoom",null),mu(t.event.view,o.moved),xm(),o.end()}if(!_&&y.apply(this,arguments)){var o=a(this,arguments),u=by(t.event.view).on("mousemove.zoom",n,!0).on("mouseup.zoom",e,!0),c=F_(this);im(t.event.view),oa(),o.mouse=[c,this.__zoom.invert(c)],Ly(this),o.start()}}function l(){if(y.apply(this,arguments)){var o=this.__zoom,a=F_(this),c=o.invert(a),s=o.k*(t.event.shiftKey?.5:2),f=i(r(e(o,s),a,c),g.apply(this,arguments));xm(),N>0?by(this).transition().duration(N).call(u,f,a):by(this).call(n.transform,f)}}function h(){if(y.apply(this,arguments)){var n,e,r,i=a(this,arguments),o=t.event.changedTouches,u=o.length;for(oa(),n=0;n<u;++n)e=o[n],r=My(this,o,e.identifier),r=[r,this.__zoom.invert(r),e.identifier],i.touch0?i.touch1||(i.touch1=r):i.touch0=r;return v&&(v=clearTimeout(v),!i.touch1)?(i.end(),r=by(this).on("dblclick.zoom"),void(r&&r.apply(this,arguments))):void(t.event.touches.length===u&&(v=setTimeout(function(){v=null},A),Ly(this),i.start()))}}function p(){var n,o,u,c,s=a(this,arguments),f=t.event.changedTouches,l=f.length;for(xm(),v&&(v=clearTimeout(v)),n=0;n<l;++n)o=f[n],u=My(this,f,o.identifier),s.touch0&&s.touch0[2]===o.identifier?s.touch0[0]=u:s.touch1&&s.touch1[2]===o.identifier&&(s.touch1[0]=u);if(o=s.that.__zoom,s.touch1){var h=s.touch0[0],p=s.touch0[1],d=s.touch1[0],_=s.touch1[1],y=(y=d[0]-h[0])*y+(y=d[1]-h[1])*y,g=(g=_[0]-p[0])*g+(g=_[1]-p[1])*g;o=e(o,Math.sqrt(y/g)),u=[(h[0]+d[0])/2,(h[1]+d[1])/2],c=[(p[0]+_[0])/2,(p[1]+_[1])/2]}else{if(!s.touch0)return;u=s.touch0[0],c=s.touch0[1]}s.zoom("touch",i(r(o,u,c),s.extent))}function d(){var n,e,r=a(this,arguments),i=t.event.changedTouches,o=i.length;for(oa(),_&&clearTimeout(_),_=setTimeout(function(){_=null},A),n=0;n<o;++n)e=i[n],r.touch0&&r.touch0[2]===e.identifier?delete r.touch0:r.touch1&&r.touch1[2]===e.identifier&&delete r.touch1;r.touch1&&!r.touch0&&(r.touch0=r.touch1,delete r.touch1),r.touch0||r.end()}var v,_,y=ua,g=aa,m=0,x=1/0,b=-x,w=x,M=b,T=w,N=250,k=Cp,S=[],E=Pn("start","zoom","end"),A=500,C=150;return n.transform=function(t,n){var e=t.selection?t.selection():t;e.property("__zoom",ca),t!==e?u(t,n):e.interrupt().each(function(){a(this,arguments).start().zoom(null,"function"==typeof n?n.apply(this,arguments):n).end()})},n.scaleBy=function(t,e){n.scaleTo(t,function(){var t=this.__zoom.k,n="function"==typeof e?e.apply(this,arguments):e;return t*n})},n.scaleTo=function(t,u){n.transform(t,function(){var t=g.apply(this,arguments),n=this.__zoom,a=o(t),c=n.invert(a),s="function"==typeof u?u.apply(this,arguments):u;return i(r(e(n,s),a,c),t)})},n.translateBy=function(t,e,r){n.transform(t,function(){return i(this.__zoom.translate("function"==typeof e?e.apply(this,arguments):e,"function"==typeof r?r.apply(this,arguments):r),g.apply(this,arguments))})},c.prototype={start:function(){return 1===++this.active&&(this.index=S.push(this)-1,this.emit("start")),this},zoom:function(t,n){return this.mouse&&"mouse"!==t&&(this.mouse[1]=n.invert(this.mouse[0])),this.touch0&&"touch"!==t&&(this.touch0[1]=n.invert(this.touch0[0])),this.touch1&&"touch"!==t&&(this.touch1[1]=n.invert(this.touch1[0])),this.that.__zoom=n,this.emit("zoom"),this},end:function(){return 0===--this.active&&(S.splice(this.index,1),this.index=-1,this.emit("end")),this},emit:function(t){Xr(new ea(n,t,this.that.__zoom),E.apply,E,[t,this.that,this.args])}},n.filter=function(t){return arguments.length?(y="function"==typeof t?t:gm(!!t),n):y},n.extent=function(t){return arguments.length?(g="function"==typeof t?t:gm([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),n):g},n.scaleExtent=function(t){return arguments.length?(m=+t[0],x=+t[1],n):[m,x]},n.translateExtent=function(t){return arguments.length?(b=+t[0][0],w=+t[1][0],M=+t[0][1],T=+t[1][1],n):[[b,M],[w,T]]},n.duration=function(t){return arguments.length?(N=+t,n):N},n.interpolate=function(t){return arguments.length?(k=t,n):k},n.on=function(){var t=E.on.apply(E,arguments);return t===E?n:t},n},wm=function(t){return function(){return t}},Mm=function(t,n,e){this.target=t,this.type=n,this.selection=e},Tm=function(){t.event.preventDefault(),t.event.stopImmediatePropagation()},Nm={name:"drag"},km={name:"space"},Sm={name:"handle"},Em={name:"center"},Am={name:"x",handles:["e","w"].map(fa),input:function(t,n){return t&&[[t[0],n[0][1]],[t[1],n[1][1]]]},output:function(t){return t&&[t[0][0],t[1][0]]}},Cm={name:"y",handles:["n","s"].map(fa),input:function(t,n){return t&&[[n[0][0],t[0]],[n[1][0],t[1]]]},output:function(t){return t&&[t[0][1],t[1][1]]}},zm={name:"xy",handles:["n","e","s","w","nw","ne","se","sw"].map(fa),input:function(t){return t},output:function(t){return t}},Pm={overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Rm={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},qm={n:"s",s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},Lm={overlay:1,selection:1,n:null,e:1,s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},Um={overlay:1,selection:1,n:-1,e:null,s:1,w:null,nw:-1,ne:-1,se:1,sw:1},Dm=function(){return ga(zm)},Om=Math.cos,Fm=Math.sin,Im=Math.PI,Ym=Im/2,Bm=2*Im,jm=Math.max,Hm=function(){function t(t){var o,u,a,c,s,f,l=t.length,h=[],p=Os(l),d=[],v=[],_=v.groups=new Array(l),y=new Array(l*l);for(o=0,s=-1;++s<l;){for(u=0,f=-1;++f<l;)u+=t[s][f];h.push(u),d.push(Os(l)),o+=u}for(e&&p.sort(function(t,n){return e(h[t],h[n])}),r&&d.forEach(function(n,e){n.sort(function(n,i){return r(t[e][n],t[e][i])})}),o=jm(0,Bm-n*l)/o,c=o?n:Bm/l,u=0,s=-1;++s<l;){for(a=u,f=-1;++f<l;){var g=p[s],m=d[g][f],x=t[g][m],b=u,w=u+=x*o;y[m*l+g]={index:g,subindex:m,startAngle:b,endAngle:w,value:x}}_[g]={index:g,startAngle:a,endAngle:u,value:h[g]},u+=c}for(s=-1;++s<l;)for(f=s-1;++f<l;){var M=y[f*l+s],T=y[s*l+f];(M.value||T.value)&&v.push(M.value<T.value?{source:T,target:M}:{source:M,target:T})}return i?v.sort(i):v}var n=0,e=null,r=null,i=null;return t.padAngle=function(e){return arguments.length?(n=jm(0,e),t):n},t.sortGroups=function(n){return arguments.length?(e=n,t):e},t.sortSubgroups=function(n){return arguments.length?(r=n,t):r},t.sortChords=function(n){return arguments.length?(null==n?i=null:(i=ma(n))._=n,t):i&&i._},t},Xm=Array.prototype.slice,Vm=function(t){return function(){return t}},Wm=function(){function t(){var t,a=Xm.call(arguments),c=n.apply(this,a),s=e.apply(this,a),f=+r.apply(this,(a[0]=c,a)),l=i.apply(this,a)-Ym,h=o.apply(this,a)-Ym,p=f*Om(l),d=f*Fm(l),v=+r.apply(this,(a[0]=s,a)),_=i.apply(this,a)-Ym,y=o.apply(this,a)-Ym;if(u||(u=t=q()),u.moveTo(p,d),u.arc(0,0,f,l,h),l===_&&h===y||(u.quadraticCurveTo(0,0,v*Om(_),v*Fm(_)),u.arc(0,0,v,_,y)),u.quadraticCurveTo(0,0,p,d),u.closePath(),t)return u=null,t+""||null}var n=xa,e=ba,r=wa,i=Ma,o=Ta,u=null;return t.radius=function(n){return arguments.length?(r="function"==typeof n?n:Vm(+n),t):r},t.startAngle=function(n){return arguments.length?(i="function"==typeof n?n:Vm(+n),t):i},t.endAngle=function(n){return arguments.length?(o="function"==typeof n?n:Vm(+n),t):o},t.source=function(e){return arguments.length?(n=e,t):n},t.target=function(n){return arguments.length?(e=n,t):e},t.context=function(n){return arguments.length?(u=null==n?null:n,t):u},t},$m=function(){return new Na};Na.prototype={constructor:Na,reset:function(){this.s=this.t=0},add:function(t){ka(kx,t,this.t),ka(this,kx.s,this.s),this.s?this.t+=kx.t:this.s=kx.t},valueOf:function(){return this.s}};var Zm,Gm,Jm,Qm,Km,tx,nx,ex,rx,ix,ox,ux,ax,cx,sx,fx,lx,hx,px,dx,vx,_x,yx,gx,mx,xx,bx,wx,Mx,Tx,Nx,kx=new Na,Sx=1e-6,Ex=1e-12,Ax=Math.PI,Cx=Ax/2,zx=Ax/4,Px=2*Ax,Rx=180/Ax,qx=Ax/180,Lx=Math.abs,Ux=Math.atan,Dx=Math.atan2,Ox=Math.cos,Fx=Math.ceil,Ix=Math.exp,Yx=Math.log,Bx=Math.pow,jx=Math.sin,Hx=Math.sign||function(t){return t>0?1:t<0?-1:0},Xx=Math.sqrt,Vx=Math.tan,Wx={Feature:function(t,n){za(t.geometry,n);
},FeatureCollection:function(t,n){for(var e=t.features,r=-1,i=e.length;++r<i;)za(e[r].geometry,n)}},$x={Sphere:function(t,n){n.sphere()},Point:function(t,n){t=t.coordinates,n.point(t[0],t[1],t[2])},MultiPoint:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)t=e[r],n.point(t[0],t[1],t[2])},LineString:function(t,n){Pa(t.coordinates,n,0)},MultiLineString:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)Pa(e[r],n,0)},Polygon:function(t,n){Ra(t.coordinates,n)},MultiPolygon:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)Ra(e[r],n)},GeometryCollection:function(t,n){for(var e=t.geometries,r=-1,i=e.length;++r<i;)za(e[r],n)}},Zx=function(t,n){t&&Wx.hasOwnProperty(t.type)?Wx[t.type](t,n):za(t,n)},Gx=$m(),Jx=$m(),Qx={point:Ca,lineStart:Ca,lineEnd:Ca,polygonStart:function(){Gx.reset(),Qx.lineStart=qa,Qx.lineEnd=La},polygonEnd:function(){var t=+Gx;Jx.add(t<0?Px+t:t),this.lineStart=this.lineEnd=this.point=Ca},sphere:function(){Jx.add(Px)}},Kx=function(t){return Jx.reset(),Zx(t,Qx),2*Jx},tb=$m(),nb={point:Xa,lineStart:Wa,lineEnd:$a,polygonStart:function(){nb.point=Za,nb.lineStart=Ga,nb.lineEnd=Ja,tb.reset(),Qx.polygonStart()},polygonEnd:function(){Qx.polygonEnd(),nb.point=Xa,nb.lineStart=Wa,nb.lineEnd=$a,Gx<0?(tx=-(ex=180),nx=-(rx=90)):tb>Sx?rx=90:tb<-Sx&&(nx=-90),sx[0]=tx,sx[1]=ex}},eb=function(t){var n,e,r,i,o,u,a;if(rx=ex=-(tx=nx=1/0),cx=[],Zx(t,nb),e=cx.length){for(cx.sort(Ka),n=1,r=cx[0],o=[r];n<e;++n)i=cx[n],tc(r,i[0])||tc(r,i[1])?(Qa(r[0],i[1])>Qa(r[0],r[1])&&(r[1]=i[1]),Qa(i[0],r[1])>Qa(r[0],r[1])&&(r[0]=i[0])):o.push(r=i);for(u=-(1/0),e=o.length-1,n=0,r=o[e];n<=e;r=i,++n)i=o[n],(a=Qa(r[1],i[0]))>u&&(u=a,tx=i[0],ex=r[1])}return cx=sx=null,tx===1/0||nx===1/0?[[NaN,NaN],[NaN,NaN]]:[[tx,nx],[ex,rx]]},rb={sphere:Ca,point:nc,lineStart:rc,lineEnd:uc,polygonStart:function(){rb.lineStart=ac,rb.lineEnd=cc},polygonEnd:function(){rb.lineStart=rc,rb.lineEnd=uc}},ib=function(t){fx=lx=hx=px=dx=vx=_x=yx=gx=mx=xx=0,Zx(t,rb);var n=gx,e=mx,r=xx,i=n*n+e*e+r*r;return i<Ex&&(n=vx,e=_x,r=yx,lx<Sx&&(n=hx,e=px,r=dx),i=n*n+e*e+r*r,i<Ex)?[NaN,NaN]:[Dx(e,n)*Rx,Ea(r/Xx(i))*Rx]},ob=function(t){return function(){return t}},ub=function(t,n){function e(e,r){return e=t(e,r),n(e[0],e[1])}return t.invert&&n.invert&&(e.invert=function(e,r){return e=n.invert(e,r),e&&t.invert(e[0],e[1])}),e};lc.invert=lc;var ab,cb,sb,fb,lb,hb,pb,db,vb,_b,yb,gb=function(t){function n(n){return n=t(n[0]*qx,n[1]*qx),n[0]*=Rx,n[1]*=Rx,n}return t=hc(t[0]*qx,t[1]*qx,t.length>2?t[2]*qx:0),n.invert=function(n){return n=t.invert(n[0]*qx,n[1]*qx),n[0]*=Rx,n[1]*=Rx,n},n},mb=function(){function t(t,n){e.push(t=r(t,n)),t[0]*=Rx,t[1]*=Rx}function n(){var t=i.apply(this,arguments),n=o.apply(this,arguments)*qx,c=u.apply(this,arguments)*qx;return e=[],r=hc(-t[0]*qx,-t[1]*qx,0).invert,_c(a,n,c,1),t={type:"Polygon",coordinates:[e]},e=r=null,t}var e,r,i=ob([0,0]),o=ob(90),u=ob(6),a={point:t};return n.center=function(t){return arguments.length?(i="function"==typeof t?t:ob([+t[0],+t[1]]),n):i},n.radius=function(t){return arguments.length?(o="function"==typeof t?t:ob(+t),n):o},n.precision=function(t){return arguments.length?(u="function"==typeof t?t:ob(+t),n):u},n},xb=function(){var t,n=[];return{point:function(n,e){t.push([n,e])},lineStart:function(){n.push(t=[])},lineEnd:Ca,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var e=n;return n=[],t=null,e}}},bb=function(t,n,e,r,i,o){var u,a=t[0],c=t[1],s=n[0],f=n[1],l=0,h=1,p=s-a,d=f-c;if(u=e-a,p||!(u>0)){if(u/=p,p<0){if(u<l)return;u<h&&(h=u)}else if(p>0){if(u>h)return;u>l&&(l=u)}if(u=i-a,p||!(u<0)){if(u/=p,p<0){if(u>h)return;u>l&&(l=u)}else if(p>0){if(u<l)return;u<h&&(h=u)}if(u=r-c,d||!(u>0)){if(u/=d,d<0){if(u<l)return;u<h&&(h=u)}else if(d>0){if(u>h)return;u>l&&(l=u)}if(u=o-c,d||!(u<0)){if(u/=d,d<0){if(u>h)return;u>l&&(l=u)}else if(d>0){if(u<l)return;u<h&&(h=u)}return l>0&&(t[0]=a+l*p,t[1]=c+l*d),h<1&&(n[0]=a+h*p,n[1]=c+h*d),!0}}}}},wb=function(t,n){return Lx(t[0]-n[0])<Sx&&Lx(t[1]-n[1])<Sx},Mb=function(t,n,e,r,i){var o,u,a=[],c=[];if(t.forEach(function(t){if(!((n=t.length-1)<=0)){var n,e,r=t[0],u=t[n];if(wb(r,u)){for(i.lineStart(),o=0;o<n;++o)i.point((r=t[o])[0],r[1]);return void i.lineEnd()}a.push(e=new gc(r,t,null,!0)),c.push(e.o=new gc(r,null,e,!1)),a.push(e=new gc(u,t,null,!1)),c.push(e.o=new gc(u,null,e,!0))}}),a.length){for(c.sort(n),mc(a),mc(c),o=0,u=c.length;o<u;++o)c[o].e=e=!e;for(var s,f,l=a[0];;){for(var h=l,p=!0;h.v;)if((h=h.n)===l)return;s=h.z,i.lineStart();do{if(h.v=h.o.v=!0,h.e){if(p)for(o=0,u=s.length;o<u;++o)i.point((f=s[o])[0],f[1]);else r(h.x,h.n.x,1,i);h=h.n}else{if(p)for(s=h.p.z,o=s.length-1;o>=0;--o)i.point((f=s[o])[0],f[1]);else r(h.x,h.p.x,-1,i);h=h.p}h=h.o,s=h.z,p=!p}while(!h.v);i.lineEnd()}}},Tb=1e9,Nb=-Tb,kb=function(){var t,n,e,r=0,i=0,o=960,u=500;return e={stream:function(e){return t&&n===e?t:t=xc(r,i,o,u)(n=e)},extent:function(a){return arguments.length?(r=+a[0][0],i=+a[0][1],o=+a[1][0],u=+a[1][1],t=n=null,e):[[r,i],[o,u]]}}},Sb=$m(),Eb={sphere:Ca,point:Ca,lineStart:bc,lineEnd:Ca,polygonStart:Ca,polygonEnd:Ca},Ab=function(t){return Sb.reset(),Zx(t,Eb),+Sb},Cb=[null,null],zb={type:"LineString",coordinates:Cb},Pb=function(t,n){return Cb[0]=t,Cb[1]=n,Ab(zb)},Rb=function(t,n){var e=t[0]*qx,r=t[1]*qx,i=n[0]*qx,o=n[1]*qx,u=Ox(r),a=jx(r),c=Ox(o),s=jx(o),f=u*Ox(e),l=u*jx(e),h=c*Ox(i),p=c*jx(i),d=2*Ea(Xx(Aa(o-r)+u*c*Aa(i-e))),v=jx(d),_=d?function(t){var n=jx(t*=d)/v,e=jx(d-t)/v,r=e*f+n*h,i=e*l+n*p,o=e*a+n*s;return[Dx(i,r)*Rx,Dx(o,Xx(r*r+i*i))*Rx]}:function(){return[e*Rx,r*Rx]};return _.distance=d,_},qb=function(t){return t},Lb=$m(),Ub=$m(),Db={point:Ca,lineStart:Ca,lineEnd:Ca,polygonStart:function(){Db.lineStart=Ac,Db.lineEnd=Pc},polygonEnd:function(){Db.lineStart=Db.lineEnd=Db.point=Ca,Lb.add(Lx(Ub)),Ub.reset()},result:function(){var t=Lb/2;return Lb.reset(),t}},Ob=1/0,Fb=Ob,Ib=-Ob,Yb=Ib,Bb={point:Rc,lineStart:Ca,lineEnd:Ca,polygonStart:Ca,polygonEnd:Ca,result:function(){var t=[[Ob,Fb],[Ib,Yb]];return Ib=Yb=-(Fb=Ob=1/0),t}},jb=0,Hb=0,Xb=0,Vb=0,Wb=0,$b=0,Zb=0,Gb=0,Jb=0,Qb={point:qc,lineStart:Lc,lineEnd:Oc,polygonStart:function(){Qb.lineStart=Fc,Qb.lineEnd=Ic},polygonEnd:function(){Qb.point=qc,Qb.lineStart=Lc,Qb.lineEnd=Oc},result:function(){var t=Jb?[Zb/Jb,Gb/Jb]:$b?[Vb/$b,Wb/$b]:Xb?[jb/Xb,Hb/Xb]:[NaN,NaN];return jb=Hb=Xb=Vb=Wb=$b=Zb=Gb=Jb=0,t}};jc.prototype={_radius:4.5,pointRadius:function(t){return this._radius=t,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._context.closePath(),this._point=NaN},point:function(t,n){switch(this._point){case 0:this._context.moveTo(t,n),this._point=1;break;case 1:this._context.lineTo(t,n);break;default:this._context.moveTo(t+this._radius,n),this._context.arc(t,n,this._radius,0,Px)}},result:Ca},Hc.prototype={_circle:Xc(4.5),pointRadius:function(t){return this._circle=Xc(t),this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._string.push("Z"),this._point=NaN},point:function(t,n){switch(this._point){case 0:this._string.push("M",t,",",n),this._point=1;break;case 1:this._string.push("L",t,",",n);break;default:this._string.push("M",t,",",n,this._circle)}},result:function(){if(this._string.length){var t=this._string.join("");return this._string=[],t}}};var Kb=function(t,n){function e(t){return t&&("function"==typeof o&&i.pointRadius(+o.apply(this,arguments)),Zx(t,r(i))),i.result()}var r,i,o=4.5;return e.area=function(t){return Zx(t,r(Db)),Db.result()},e.bounds=function(t){return Zx(t,r(Bb)),Bb.result()},e.centroid=function(t){return Zx(t,r(Qb)),Qb.result()},e.projection=function(n){return arguments.length?(r=null==n?(t=null,qb):(t=n).stream,e):t},e.context=function(t){return arguments.length?(i=null==t?(n=null,new Hc):new jc(n=t),"function"!=typeof o&&i.pointRadius(o),e):n},e.pointRadius=function(t){return arguments.length?(o="function"==typeof t?t:(i.pointRadius(+t),+t),e):o},e.projection(t).context(n)},tw=$m(),nw=function(t,n){var e=n[0],r=n[1],i=[jx(e),-Ox(e),0],o=0,u=0;tw.reset();for(var a=0,c=t.length;a<c;++a)if(f=(s=t[a]).length)for(var s,f,l=s[f-1],h=l[0],p=l[1]/2+zx,d=jx(p),v=Ox(p),_=0;_<f;++_,h=g,d=x,v=b,l=y){var y=s[_],g=y[0],m=y[1]/2+zx,x=jx(m),b=Ox(m),w=g-h,M=w>=0?1:-1,T=M*w,N=T>Ax,k=d*x;if(tw.add(Dx(k*M*jx(T),v*b+k*Ox(T))),o+=N?w+M*Px:w,N^h>=e^g>=e){var S=Ya(Fa(l),Fa(y));Ha(S);var E=Ya(i,S);Ha(E);var A=(N^w>=0?-1:1)*Ea(E[2]);(r>A||r===A&&(S[0]||S[1]))&&(u+=N^w>=0?1:-1)}}return(o<-Sx||o<Sx&&tw<-Sx)^1&u},ew=function(t,n,e,r){return function(i,o){function u(n,e){var r=i(n,e);t(n=r[0],e=r[1])&&o.point(n,e)}function a(t,n){var e=i(t,n);_.point(e[0],e[1])}function c(){b.point=a,_.lineStart()}function s(){b.point=u,_.lineEnd()}function f(t,n){v.push([t,n]);var e=i(t,n);m.point(e[0],e[1])}function l(){m.lineStart(),v=[]}function h(){f(v[0][0],v[0][1]),m.lineEnd();var t,n,e,r,i=m.clean(),u=g.result(),a=u.length;if(v.pop(),p.push(v),v=null,a)if(1&i){if(e=u[0],(n=e.length-1)>0){for(x||(o.polygonStart(),x=!0),o.lineStart(),t=0;t<n;++t)o.point((r=e[t])[0],r[1]);o.lineEnd()}}else a>1&&2&i&&u.push(u.pop().concat(u.shift())),d.push(u.filter(Vc))}var p,d,v,_=n(o),y=i.invert(r[0],r[1]),g=xb(),m=n(g),x=!1,b={point:u,lineStart:c,lineEnd:s,polygonStart:function(){b.point=f,b.lineStart=l,b.lineEnd=h,d=[],p=[]},polygonEnd:function(){b.point=u,b.lineStart=c,b.lineEnd=s,d=Js(d);var t=nw(p,y);d.length?(x||(o.polygonStart(),x=!0),Mb(d,Wc,t,e,o)):t&&(x||(o.polygonStart(),x=!0),o.lineStart(),e(null,null,1,o),o.lineEnd()),x&&(o.polygonEnd(),x=!1),d=p=null},sphere:function(){o.polygonStart(),o.lineStart(),e(null,null,1,o),o.lineEnd(),o.polygonEnd()}};return b}},rw=ew(function(){return!0},$c,Gc,[-Ax,-Cx]),iw=function(t,n){function e(e,r,i,o){_c(o,t,n,i,e,r)}function r(t,n){return Ox(t)*Ox(n)>a}function i(t){var n,e,i,a,f;return{lineStart:function(){a=i=!1,f=1},point:function(l,h){var p,d=[l,h],v=r(l,h),_=c?v?0:u(l,h):v?u(l+(l<0?Ax:-Ax),h):0;if(!n&&(a=i=v)&&t.lineStart(),v!==i&&(p=o(n,d),(wb(n,p)||wb(d,p))&&(d[0]+=Sx,d[1]+=Sx,v=r(d[0],d[1]))),v!==i)f=0,v?(t.lineStart(),p=o(d,n),t.point(p[0],p[1])):(p=o(n,d),t.point(p[0],p[1]),t.lineEnd()),n=p;else if(s&&n&&c^v){var y;_&e||!(y=o(d,n,!0))||(f=0,c?(t.lineStart(),t.point(y[0][0],y[0][1]),t.point(y[1][0],y[1][1]),t.lineEnd()):(t.point(y[1][0],y[1][1]),t.lineEnd(),t.lineStart(),t.point(y[0][0],y[0][1])))}!v||n&&wb(n,d)||t.point(d[0],d[1]),n=d,i=v,e=_},lineEnd:function(){i&&t.lineEnd(),n=null},clean:function(){return f|(a&&i)<<1}}}function o(t,n,e){var r=Fa(t),i=Fa(n),o=[1,0,0],u=Ya(r,i),c=Ia(u,u),s=u[0],f=c-s*s;if(!f)return!e&&t;var l=a*c/f,h=-a*s/f,p=Ya(o,u),d=ja(o,l),v=ja(u,h);Ba(d,v);var _=p,y=Ia(d,_),g=Ia(_,_),m=y*y-g*(Ia(d,d)-1);if(!(m<0)){var x=Xx(m),b=ja(_,(-y-x)/g);if(Ba(b,d),b=Oa(b),!e)return b;var w,M=t[0],T=n[0],N=t[1],k=n[1];T<M&&(w=M,M=T,T=w);var S=T-M,E=Lx(S-Ax)<Sx,A=E||S<Sx;if(!E&&k<N&&(w=N,N=k,k=w),A?E?N+k>0^b[1]<(Lx(b[0]-M)<Sx?N:k):N<=b[1]&&b[1]<=k:S>Ax^(M<=b[0]&&b[0]<=T)){var C=ja(_,(-y+x)/g);return Ba(C,d),[b,Oa(C)]}}}function u(n,e){var r=c?t:Ax-t,i=0;return n<-r?i|=1:n>r&&(i|=2),e<-r?i|=4:e>r&&(i|=8),i}var a=Ox(t),c=a>0,s=Lx(a)>Sx;return ew(r,i,e,c?[0,-t]:[-Ax,t-Ax])},ow=function(t){return{stream:Jc(t)}};Qc.prototype={constructor:Qc,point:function(t,n){this.stream.point(t,n)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var uw=16,aw=Ox(30*qx),cw=function(t,n){return+n?es(t,n):ns(t)},sw=Jc({point:function(t,n){this.stream.point(t*qx,n*qx)}}),fw=function(){return os(as).scale(155.424).center([0,33.6442])},lw=function(){return fw().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])},hw=function(){function t(t){var n=t[0],e=t[1];return a=null,i.point(n,e),a||(o.point(n,e),a)||(u.point(n,e),a)}function n(){return e=r=null,t}var e,r,i,o,u,a,c=lw(),s=fw().rotate([154,0]).center([-2,58.5]).parallels([55,65]),f=fw().rotate([157,0]).center([-3,19.9]).parallels([8,18]),l={point:function(t,n){a=[t,n]}};return t.invert=function(t){var n=c.scale(),e=c.translate(),r=(t[0]-e[0])/n,i=(t[1]-e[1])/n;return(i>=.12&&i<.234&&r>=-.425&&r<-.214?s:i>=.166&&i<.234&&r>=-.214&&r<-.115?f:c).invert(t)},t.stream=function(t){return e&&r===t?e:e=cs([c.stream(r=t),s.stream(t),f.stream(t)])},t.precision=function(t){return arguments.length?(c.precision(t),s.precision(t),f.precision(t),n()):c.precision()},t.scale=function(n){return arguments.length?(c.scale(n),s.scale(.35*n),f.scale(n),t.translate(c.translate())):c.scale()},t.translate=function(t){if(!arguments.length)return c.translate();var e=c.scale(),r=+t[0],a=+t[1];return i=c.translate(t).clipExtent([[r-.455*e,a-.238*e],[r+.455*e,a+.238*e]]).stream(l),o=s.translate([r-.307*e,a+.201*e]).clipExtent([[r-.425*e+Sx,a+.12*e+Sx],[r-.214*e-Sx,a+.234*e-Sx]]).stream(l),u=f.translate([r-.205*e,a+.212*e]).clipExtent([[r-.214*e+Sx,a+.166*e+Sx],[r-.115*e-Sx,a+.234*e-Sx]]).stream(l),n()},t.fitExtent=function(n,e){return Kc(t,n,e)},t.fitSize=function(n,e){return ts(t,n,e)},t.scale(1070)},pw=ss(function(t){return Xx(2/(1+t))});pw.invert=fs(function(t){return 2*Ea(t/2)});var dw=function(){return rs(pw).scale(124.75).clipAngle(179.999)},vw=ss(function(t){return(t=Sa(t))&&t/jx(t)});vw.invert=fs(function(t){return t});var _w=function(){return rs(vw).scale(79.4188).clipAngle(179.999)};ls.invert=function(t,n){return[t,2*Ux(Ix(n))-Cx]};var yw=function(){return hs(ls).scale(961/Px)},gw=function(){return os(ds).scale(109.5).parallels([30,30])};vs.invert=vs;var mw=function(){return rs(vs).scale(152.63)},xw=function(){return os(_s).scale(131.154).center([0,13.9389])};ys.invert=fs(Ux);var bw=function(){return rs(ys).scale(144.049).clipAngle(60)},ww=function(){function t(){return i=o=null,u}var n,e,r,i,o,u,a=1,c=0,s=0,f=1,l=1,h=qb,p=null,d=qb;return u={stream:function(t){return i&&o===t?i:i=h(d(o=t))},clipExtent:function(i){return arguments.length?(d=null==i?(p=n=e=r=null,qb):xc(p=+i[0][0],n=+i[0][1],e=+i[1][0],r=+i[1][1]),t()):null==p?null:[[p,n],[e,r]]},scale:function(n){return arguments.length?(h=gs((a=+n)*f,a*l,c,s),t()):a},translate:function(n){return arguments.length?(h=gs(a*f,a*l,c=+n[0],s=+n[1]),t()):[c,s]},reflectX:function(n){return arguments.length?(h=gs(a*(f=n?-1:1),a*l,c,s),t()):f<0},reflectY:function(n){return arguments.length?(h=gs(a*f,a*(l=n?-1:1),c,s),t()):l<0},fitExtent:function(t,n){return Kc(u,t,n)},fitSize:function(t,n){return ts(u,t,n)}}};ms.invert=fs(Ea);var Mw=function(){return rs(ms).scale(249.5).clipAngle(90+Sx)};xs.invert=fs(function(t){return 2*Ux(t)});var Tw=function(){return rs(xs).scale(250).clipAngle(142)};bs.invert=function(t,n){return[-n,2*Ux(Ix(t))-Cx]};var Nw=function(){var t=hs(bs),n=t.center,e=t.rotate;return t.center=function(t){return arguments.length?n([-t[1],t[0]]):(t=n(),[t[1],-t[0]])},t.rotate=function(t){return arguments.length?e([t[0],t[1],t.length>2?t[2]+90:90]):(t=e(),[t[0],t[1],t[2]-90])},e([0,0,90]).scale(159.155)};t.version=ws,t.bisect=ks,t.bisectRight=ks,t.bisectLeft=Ss,t.ascending=Ms,t.bisector=Ts,t.descending=Es,t.deviation=zs,t.extent=Ps,t.histogram=Hs,t.thresholdFreedmanDiaconis=Vs,t.thresholdScott=Ws,t.thresholdSturges=js,t.max=$s,t.mean=Zs,t.median=Gs,t.merge=Js,t.min=Qs,t.pairs=Ks,t.permute=tf,t.quantile=Xs,t.range=Os,t.scan=nf,t.shuffle=ef,t.sum=rf,t.ticks=Bs,t.tickStep=e,t.transpose=of,t.variance=Cs,t.zip=uf,t.entries=hf,t.keys=ff,t.values=lf,t.map=o,t.set=l,t.nest=cf,t.randomUniform=pf,t.randomNormal=df,t.randomLogNormal=vf,t.randomBates=yf,t.randomIrwinHall=_f,t.randomExponential=gf,t.easeLinear=h,t.easeQuad=v,t.easeQuadIn=p,t.easeQuadOut=d,t.easeQuadInOut=v,t.easeCubic=g,t.easeCubicIn=_,t.easeCubicOut=y,t.easeCubicInOut=g,t.easePoly=wf,t.easePolyIn=xf,t.easePolyOut=bf,t.easePolyInOut=wf,t.easeSin=b,t.easeSinIn=m,t.easeSinOut=x,t.easeSinInOut=b,t.easeExp=T,t.easeExpIn=w,t.easeExpOut=M,t.easeExpInOut=T,t.easeCircle=S,t.easeCircleIn=N,t.easeCircleOut=k,t.easeCircleInOut=S,t.easeBounce=A,t.easeBounceIn=E,t.easeBounceOut=A,t.easeBounceInOut=C,t.easeBack=Of,t.easeBackIn=Uf,t.easeBackOut=Df,t.easeBackInOut=Of,t.easeElastic=jf,t.easeElasticIn=Bf,t.easeElasticOut=jf,t.easeElasticInOut=Hf,t.polygonArea=Xf,t.polygonCentroid=Vf,t.polygonHull=$f,t.polygonContains=Zf,t.polygonLength=Gf,t.path=q,t.quadtree=I,t.queue=Z,t.arc=wl,t.area=Nl,t.line=Tl,t.pie=El,t.radialArea=zl,t.radialLine=Cl,t.symbol=Jl,t.symbols=Gl,t.symbolCircle=Pl,t.symbolCross=Rl,t.symbolDiamond=Ul,t.symbolSquare=Bl,t.symbolStar=Yl,t.symbolTriangle=Hl,t.symbolWye=Zl,t.curveBasisClosed=th,t.curveBasisOpen=nh,t.curveBasis=Kl,t.curveBundle=eh,t.curveCardinalClosed=ih,t.curveCardinalOpen=oh,t.curveCardinal=rh,t.curveCatmullRomClosed=ah,t.curveCatmullRomOpen=ch,t.curveCatmullRom=uh,t.curveLinearClosed=sh,t.curveLinear=Ml,t.curveMonotoneX=zt,t.curveMonotoneY=Pt,t.curveNatural=fh,t.curveStep=lh,t.curveStepAfter=Dt,t.curveStepBefore=Ut,t.stack=vh,t.stackOffsetExpand=_h,t.stackOffsetNone=ph,t.stackOffsetSilhouette=yh,t.stackOffsetWiggle=gh,t.stackOrderAscending=mh,t.stackOrderDescending=xh,t.stackOrderInsideOut=bh,t.stackOrderNone=dh,t.stackOrderReverse=wh,t.color=Bt,t.rgb=Vt,t.hsl=Gt,t.lab=tn,t.hcl=cn,t.cubehelix=ln,t.interpolate=mp,t.interpolateArray=hp,t.interpolateDate=pp,t.interpolateNumber=dp,t.interpolateObject=vp,t.interpolateRound=xp,t.interpolateString=gp,t.interpolateTransformCss=Tp,t.interpolateTransformSvg=Np,t.interpolateZoom=Cp,t.interpolateRgb=sp,t.interpolateRgbBasis=fp,t.interpolateRgbBasisClosed=lp,t.interpolateHsl=zp,t.interpolateHslLong=Pp,t.interpolateLab=An,t.interpolateHcl=Rp,t.interpolateHclLong=qp,t.interpolateCubehelix=Lp,t.interpolateCubehelixLong=Up,t.interpolateBasis=up,t.interpolateBasisClosed=ap,t.quantize=Dp,t.dispatch=Pn,t.dsvFormat=Yp,t.csvParse=jp,t.csvParseRows=Hp,t.csvFormat=Xp,t.csvFormatRows=Vp,t.tsvParse=$p,t.tsvParseRows=Zp,t.tsvFormat=Gp,t.tsvFormatRows=Jp,t.request=Qp,t.html=td,t.json=nd,t.text=ed,t.xml=rd,t.csv=od,t.tsv=ud,t.now=jn,t.timer=Vn,t.timerFlush=Wn,t.timeout=_d,t.interval=yd,t.timeInterval=Qn,t.timeMillisecond=xd,t.timeMilliseconds=bd,t.timeSecond=Sd,t.timeSeconds=Ed,t.timeMinute=Ad,t.timeMinutes=Cd,t.timeHour=zd,t.timeHours=Pd,t.timeDay=Rd,t.timeDays=qd,t.timeWeek=Ld,t.timeWeeks=Bd,t.timeSunday=Ld,t.timeSundays=Bd,t.timeMonday=Ud,t.timeMondays=jd,t.timeTuesday=Dd,t.timeTuesdays=Hd;t.timeWednesday=Od;t.timeWednesdays=Xd,t.timeThursday=Fd,t.timeThursdays=Vd,t.timeFriday=Id,t.timeFridays=Wd,t.timeSaturday=Yd,t.timeSaturdays=$d,t.timeMonth=Zd,t.timeMonths=Gd,t.timeYear=Jd,t.timeYears=Qd,t.utcMillisecond=xd,t.utcMilliseconds=bd,t.utcSecond=Sd,t.utcSeconds=Ed,t.utcMinute=Kd,t.utcMinutes=tv,t.utcHour=nv,t.utcHours=ev,t.utcDay=rv,t.utcDays=iv,t.utcWeek=ov,t.utcWeeks=hv,t.utcSunday=ov,t.utcSundays=hv,t.utcMonday=uv,t.utcMondays=pv,t.utcTuesday=av,t.utcTuesdays=dv,t.utcWednesday=cv,t.utcWednesdays=vv,t.utcThursday=sv,t.utcThursdays=_v,t.utcFriday=fv,t.utcFridays=yv,t.utcSaturday=lv,t.utcSaturdays=gv,t.utcMonth=mv,t.utcMonths=xv,t.utcYear=bv,t.utcYears=Mv,t.formatLocale=Lv,t.formatDefaultLocale=re,t.formatSpecifier=Pv,t.precisionFixed=Dv,t.precisionPrefix=Ov,t.precisionRound=Fv,t.isoFormat=Xv,t.isoParse=Vv,t.timeFormatLocale=ae,t.timeFormatDefaultLocale=nr,t.scaleBand=or,t.scalePoint=ar,t.scaleIdentity=yr,t.scaleLinear=_r,t.scaleLog=Tr,t.scaleOrdinal=ir,t.scaleImplicit=Gv,t.scalePow=kr,t.scaleSqrt=Sr,t.scaleQuantile=Er,t.scaleQuantize=Ar,t.scaleThreshold=Cr,t.scaleTime=s_,t.scaleUtc=f_,t.schemeCategory10=h_,t.schemeCategory20b=p_,t.schemeCategory20c=d_,t.schemeCategory20=v_,t.scaleSequential=Lr,t.interpolateCubehelixDefault=__,t.interpolateRainbow=x_,t.interpolateWarm=y_,t.interpolateCool=g_,t.interpolateViridis=b_,t.interpolateMagma=w_,t.interpolateInferno=M_,t.interpolatePlasma=T_,t.creator=E_,t.customEvent=Xr,t.local=Or,t.matcher=R_,t.mouse=F_,t.namespace=S_,t.namespaces=k_,t.select=by,t.selectAll=wy,t.selection=Pi,t.selector=I_,t.selectorAll=B_,t.touch=My,t.touches=Ty,t.window=ay,t.active=ag,t.interrupt=Ly,t.transition=fo,t.axisTop=mo,t.axisRight=xo,t.axisBottom=bo,t.axisLeft=wo,t.cluster=vg,t.hierarchy=zo,t.pack=Cg,t.packSiblings=Eg,t.packEnclose=Sg,t.partition=Rg,t.stratify=Dg,t.tree=Og,t.treemap=Bg,t.treemapBinary=jg,t.treemapDice=Pg,t.treemapSlice=Fg,t.treemapSliceDice=Hg,t.treemapSquarify=Yg,t.treemapResquarify=Xg,t.forceCenter=Vg,t.forceCollide=Zg,t.forceLink=Gg,t.forceManyBody=tm,t.forceSimulation=Kg,t.forceX=nm,t.forceY=em,t.drag=um,t.dragDisable=im,t.dragEnable=mu,t.voronoi=ym,t.zoom=bm,t.zoomIdentity=mm,t.zoomTransform=ia,t.brush=Dm,t.brushX=_a,t.brushY=ya,t.brushSelection=va,t.chord=Hm,t.ribbon=Wm,t.geoAlbers=lw,t.geoAlbersUsa=hw,t.geoArea=Kx,t.geoAzimuthalEqualArea=dw,t.geoAzimuthalEqualAreaRaw=pw,t.geoAzimuthalEquidistant=_w,t.geoAzimuthalEquidistantRaw=vw,t.geoBounds=eb,t.geoCentroid=ib,t.geoCircle=mb,t.geoClipExtent=kb,t.geoConicConformal=gw,t.geoConicConformalRaw=ds,t.geoConicEqualArea=fw,t.geoConicEqualAreaRaw=as,t.geoConicEquidistant=xw,t.geoConicEquidistantRaw=_s,t.geoDistance=Pb,t.geoEquirectangular=mw,t.geoEquirectangularRaw=vs,t.geoGnomonic=bw,t.geoGnomonicRaw=ys,t.geoGraticule=Sc,t.geoGraticule10=Ec,t.geoIdentity=ww,t.geoInterpolate=Rb,t.geoLength=Ab,t.geoMercator=yw,t.geoMercatorRaw=ls,t.geoOrthographic=Mw,t.geoOrthographicRaw=ms,t.geoPath=Kb,t.geoProjection=rs,t.geoProjectionMutator=is,t.geoRotation=gb,t.geoStereographic=Tw,t.geoStereographicRaw=xs,t.geoStream=Zx,t.geoTransform=ow,t.geoTransverseMercator=Nw,t.geoTransverseMercatorRaw=bs,Object.defineProperty(t,"__esModule",{value:!0})});
},{}],3:[function(require,module,exports){
/**
 * pubsub.js
 *
 * A tiny, optimized, tested, standalone and robust
 * pubsub implementation supporting different javascript environments
 *
 * @author Federico "Lox" Lucignano <http://plus.ly/federico.lox>
 *
 * @see https://github.com/federico-lox/pubsub.js
 */

/*global define, module*/
(function (context) {
  'use strict';

  /**
   * @private
   */
  function init() {
    //the channel subscription hash
    var channels = {},
    //help minification
      funcType = Function;

    return {
      /*
       * @public
       *
       * Publish some data on a channel
       *
       * @param String channel The channel to publish on
       * @param Mixed argument The data to publish, the function supports
       * as many data parameters as needed
       *
       * @example Publish stuff on '/some/channel'.
       * Anything subscribed will be called with a function
       * signature like: function(a,b,c){ ... }
       *
       * PubSub.publish(
       *		"/some/channel", "a", "b",
       *		{total: 10, min: 1, max: 3}
       * );
       */
      publish: function () {
        //help minification
        var args = arguments,
        // args[0] is the channel
          subs = channels[args[0]],
          len,
          params,
          x;

        if (subs) {
          len = subs.length;
          params = (args.length > 1) ?
            Array.prototype.splice.call(args, 1) : [];

          //run the callbacks asynchronously,
          //do not block the main execution process
          setTimeout(
            function () {
              //executes callbacks in the order
              //in which they were registered
              for (x = 0; x < len; x += 1) {
                subs[x].apply(context, params);
              }

              //clear references to allow garbage collection
              subs = context = params = null;
            },
            0
          );
        }
      },

      /*
       * @public
       *
       * Register a callback on a channel
       *
       * @param String channel The channel to subscribe to
       * @param Function callback The event handler, any time something is
       * published on a subscribed channel, the callback will be called
       * with the published array as ordered arguments
       *
       * @return Array A handle which can be used to unsubscribe this
       * particular subscription
       *
       * @example PubSub.subscribe(
       *				"/some/channel",
       *				function(a, b, c){ ... }
       *			);
       */
      subscribe: function (channel, callback) {
        if (typeof channel !== 'string') {
          throw "invalid or missing channel";
        }

        if (!(callback instanceof funcType)) {
          throw "invalid or missing callback";
        }

        if (!channels[channel]) {
          channels[channel] = [];
        }

        channels[channel].push(callback);

        return {channel: channel, callback: callback};
      },

      /*
       * @public
       *
       * Disconnect a subscribed function f.
       *
       * @param Mixed handle The return value from a subscribe call or the
       * name of a channel as a String
       * @param Function callback [OPTIONAL] The event handler originaally
       * registered, not needed if handle contains the return value
       * of subscribe
       *
       * @example
       * var handle = PubSub.subscribe("/some/channel", function(){});
       * PubSub.unsubscribe(handle);
       *
       * or
       *
       * PubSub.unsubscribe("/some/channel", callback);
       */
      unsubscribe: function (handle, callback) {
        if (handle.channel && handle.callback) {
          callback = handle.callback;
          handle = handle.channel;
        }

        if (typeof handle !== 'string') {
          throw "invalid or missing channel";
        }

        if (!(callback instanceof funcType)) {
          throw "invalid or missing callback";
        }

        var subs = channels[handle],
          x,
          y = (subs instanceof Array) ? subs.length : 0;

        for (x = 0; x < y; x += 1) {
          if (subs[x] === callback) {
            subs.splice(x, 1);
            break;
          }
        }
      }
    };
  }

  //UMD
  if (typeof define === 'function' && define.amd) {
    //AMD module
    define('pubsub', init);
  } else if (typeof module === 'object' && module.exports) {
    //CommonJS module
    module.exports = init();
  } else {
    //traditional namespace
    context.PubSub = init();
  }
}(this));
},{}],4:[function(require,module,exports){
"use strict";

/**
 *
 * This module provides routines for dealing with arrays.
 *
 * @module dex:array
 * @name array
 * @memberOf dex
 *
 */

module.exports = function array(dex) {

  return {
    'unique': function (array) {
      return _.uniq(array);
    },
    /**
     *
     * Take a slice of an array without modifying the original array.
     *
     * dex.array.slice(array) - Return a copy of the array.
     * dex.array.slice(array, rowRange) - Copy the array, then return a slice
     * within the specified range.
     * dex.array.slice(array, rowRange, maxRows) - Copy the array, then return a slice
     * within the specified range up to, but not exceeding, maxRows rows.
     *
     * @param (array) array - The array to slice.
     * @param (array|number) rowRange - If supplied an array, the range defined by the of rows to slice.
     * @param {number} maxRows - The maximum number of rows to return.
     *
     * @example {@lang javascript}
     * var myArray = [ 1, 2, 3, 4, 5 ];
     *
     * // Returns: [ 3, 4, 5]
     * slice(myArray, 2);
     *
     * // Returns: [ 1, 3, 5 ]
     * slice(myArray, [0, 2, 4]);
     *
     * // I am not sure why you would do this, but in the interest of supporting
     * // the Principle of Least Surprise, this returns the array unchanged.
     * // Returns: [ 1, 2, 3, 4, 5 ]
     * slice(myArray)
     *
     */
    'slice': function (array, rowRange, maxRows) {
      var arraySlice = [];
      var range;
      var i;

      var arrayCopy = dex.array.copy(array);

      // Numeric.
      // Array.
      // Object.  Numeric with start and end.
      if (arguments.length === 2) {
        if (Array.isArray(rowRange)) {
          range = rowRange;
        }
        else {
          range = dex.range(rowRange, arrayCopy.length - rowRange);
        }
      }
      else if (arguments.length < 2) {
        return arrayCopy;
      }
      else {
        if (Array.isArray(rowRange)) {
          range = rowRange;
        }
        else {
          range = dex.range(rowRange, maxRows);
        }
      }

      //dex.console.log("BEFORE: array.slice(range=" + range + "): arraySlice=" + arraySlice);
      for (i = 0; i < range.length; i++) {
        arraySlice.push(arrayCopy[range[i]]);
      }
      //dex.console.log("AFTER: array.slice(range=" + range + "): arraySlice=" + arraySlice);
      return arraySlice;
    },

    /**
     *
     * This method locates the array element whose id tag matches the supplied
     * id.  It returns the index of the first matching array element, or -1 if
     * none was found.
     *
     * @param array The array to search.
     * @param id The id to search on.
     *
     * @returns {number} The index of the first matching array element, or -1
     * if not found.
     *
     */
    /*
     module.exports.indexOfById = function (array, id) {
     return _.findIndex(array, { id: id })
     };
     */

    /**
     *
     * Is this routine actually used anymore?  Can I deprecate it?  It's long and
     * I don't remember exactly what its doing.
     *
     * @param data
     * @param numValues
     * @returns {*}
     *
     */
    /*
     module.exports.indexBands = function (data, numValues) {
     dex.console.log("BANDS");
     var interval, residual, tickIndices, last, i;

     if (numValues <= 0) {
     tickIndices = [];
     }
     else if (numValues == 1) {
     tickIndices = [Math.floor(numValues / 2)];
     }
     else if (numValues == 2) {
     tickIndices = [0, data.length - 1];
     }
     else {
     // We have at least 2 ticks to display.
     // Calculate the rough interval between ticks.
     interval = Math.max(1, Math.floor(data.length / (numValues - 1)));

     // If it's not perfect, record it in the residual.
     residual = Math.floor(data.length % (numValues - 1));

     // Always label our first data point.
     tickIndices = [0];

     // Set stop point on the interior ticks.
     last = data.length - interval;

     dex.console.log("TEST", data, numValues, interval, residual, last);

     // Figure out the interior ticks, gently drift to accommodate
     // the residual.
     for (i = interval; i <= last; i += interval) {
     if (residual > 0) {
     i += 1;
     residual -= 1;
     }
     tickIndices.push(i);
     }
     // Always graph the last tick.
     tickIndices.push(data.length - 1);
     }
     dex.console.log("BANDS");
     return tickIndices;
     };
     */

    /**
     * Return an array consisting of unique elements within the first.
     *
     * @param array The array to extract unique values from.
     *
     * @returns {Array} An array which consists of unique elements within
     * the user supplied array.
     *
     */
//module.exports.unique = function (array) {
//  return _.uniq(array);
//};

    /**
     *
     * Returns an array of the mathematically smallest and largest
     * elements within the array.
     *
     * @param matrix The array to evaluate.
     * @param indices The array indices to be considered in the evaluation.
     *
     * @returns {Array} - An array consisting of [ min, max ] of the array.
     *
     */
    'extent': function (matrix, indices) {
      if (!matrix || matrix.length <= 0 || !indices || indices.length <= 0) {
        return [0, 0];
      }

      var min = matrix[0][indices[0]];
      var max = min;

      indices.forEach(function (ci) {
        matrix.forEach(function (row) {
          if (min > row[ci]) {
            min = row[ci];
          }
          if (max < row[ci]) {
            max = row[ci];
          }
        });
      });
      return [min, max];
    },

    /**
     *
     * Return a distinct copy of an array.
     *
     * @param {Array} array The array to copy.
     * @returns {Array} The copy of the array.
     *
     */
    'copy': function (array) {
      // Shallow copy
      return _.clone(array);
      // Deep copy:
      //return $.extend(true, {}, array);
    },
    'isNumeric' : function(array) {
      return array.every(dex.object.isNumeric);
    }
  };
};
},{}],5:[function(require,module,exports){
/**
 *
 * @name AreaChart
 * @constructor
 * @classdesc This class constructs a c3 area chart.
 * @memberOf dex.charts.c3
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var areachart = new dex.charts.c3.AreaChart({
 *   'parent' : "#AreaChart",
 *   'id'     : "AreaChart"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 *
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 *
 *  @inherit module:dex/component
 *
 */
var areachart = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#AreaChart',
        // Set these when you need to CSS style components independently.
        'id': 'AreaChart',
        'class': 'AreaChart',
        'resizable': true,
        'csv': {
            'header': [],
            'data': []
        },
        'linktype' : 'area-spline',
        'width': "100%",
        'height': "100%",
        'transform': "translate(0 0)",
    };

    var chart = new dex.component(userConfig, defaults);

    chart.render = function render() {
        window.onresize = this.resize;
        chart.resize();
    };

    chart.resize = function resize() {
        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height).update();
        }
        else {
            chart.update();
        }
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        var gtypes = dex.csv.guessTypes(csv);
        var ncsv = dex.csv.numericSubset(csv);
        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var types = {};
        dex.range(1, ncsv.header.length)
            .map(function(hi) { types[ncsv.header[hi-1]] = config.linktype; });

        var c3config = {
            'bindto' : config.parent,
            'data': {
                'columns': columns.data,
                'types': types,
                color : d3.scale.category20()
            },
            subchart: {
                show: true
            },
            zoom: {
                enabled: true
            },
            legend: {
                position : 'right'
            }
        };

        // Set categorical axis if first column is a string.
        if (gtypes[0] == "string")
        {
            c3config['axis'] = { 'x' : {
                'type' : 'category',
                'label' : { 'text' : csv.header[0],
                'position' : 'outer-center' },
                'categories': dex.csv.transpose(dex.csv.columnSlice(csv, [0])).data[0]
            }};
        }

        var chart = c3.generate(c3config);
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
};

module.exports = areachart;

},{}],6:[function(require,module,exports){
/**
 *
 * @constructor
 * @name BarChart
 * @classdesc This class constructs a c3 bar chart.
 * @memberOf dex.charts.c3
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var areachart = dex.charts.c3.BarChart({
 *   'parent' : "#AreaChart",
 *   'id'     : "AreaChart"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 *
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 *
 * @inherit module:dex/component
 *
 */
var barchart = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#BarChart',
        // Set these when you need to CSS style components independently.
        'id': 'BarChart',
        'class': 'BarChart',
        'resizable': true,
        'csv': {
            'header': [],
            'data': []
        },
        'width': "100%",
        'height': "100%",
        'transform': "translate(0 0)",
    };

    var chart = new dex.component(userConfig, defaults);

    chart.render = function render() {
        window.onresize = this.resize;
        chart.resize();
    };

    chart.resize = function resize() {
        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height).update();
        }
        else {
            chart.update();
        }
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        var gtypes = dex.csv.guessTypes(csv);
        var ncsv = dex.csv.numericSubset(csv);
        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var c3config = {
            'bindto' : config.parent,
            'data': {
                'columns': columns.data,
                'type': 'bar',
                color : d3.scale.category20()
            },
            'bar': {'width': { 'ratio': 0.9 }},
            subchart: {
                show: true
            },
            zoom: {
                enabled: true
            },
            legend: {
                position : 'right'
            }
        };

        // Set categorical axis if first column is a string.
        if (gtypes[0] == "string")
        {
            c3config['axis'] = { 'x' : {
                'type' : 'category',
                'label' : { 'text' : csv.header[0],
                'position' : 'outer-center' },
                'categories': dex.csv.transpose(dex.csv.columnSlice(csv, [0])).data[0]
            }};
        }

        var chart = c3.generate(c3config);
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
};

module.exports = barchart;
},{}],7:[function(require,module,exports){
/**
 *
 * @name LineChart
 * @constructor
 * @classdesc This class constructs a c3 line chart.
 * @memberOf dex.charts.c3
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var areachart = new dex.charts.c3.AreaChart({
 *   'parent' : "#AreaChart",
 *   'id'     : "AreaChart"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 *
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 *
 * @inherit module:dex/component
 *
 */

var linechart = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#LineChart',
        // Set these when you need to CSS style components independently.
        'id': 'LineChart',
        'class': 'LineChart',
        'resizable': true,
        'csv': {
            'header': [],
            'data': []
        },
        'linktype' : 'line',
        'width': "100%",
        'height': "100%"
    };

    var chart = new dex.component(userConfig, defaults);
    var internalChart;
    var selectedColumns = [];

    chart.resize = function resize() {
        dex.console.log("PARENT: '" + chart.config.parent + "'");
        if (chart.config.resizable) {
            var width = $("" + chart.config.parent).width();
            var height = $("" + chart.config.parent).height();
            dex.console.log("RESIZE: " + width + "x" + height);
            chart.attr("width", width)
              .attr("height", height)
              .update();
        }
        else {
            chart.update();
        }
    };

    chart.render = function render() {

        //var chart = this;
        var config = chart.config;
        var csv = config.csv;
        window.onresize = this.resize;
        
        d3.select(config.parent).selectAll("*").remove();
        var gtypes = dex.csv.guessTypes(csv);
        selectedColumns = dex.csv.getNumericIndices(csv);
        if (gtypes[0] == "string")
        {
            selectedColumns.unshift(0);
        }
        else if (gtypes[0] == "date")
        {
            selectedColumns.unshift(0);
        }

        var ncsv = dex.csv.columnSlice(csv, selectedColumns);

        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var types = {};
        dex.range(1, ncsv.header.length)
          .map(function(hi) { types[ncsv.header[hi-1]] = config.linktype; });

        var c3config = {
            'bindto' : config.parent,
            'data': {
                'x' : columns.header[0],
                'columns' : columns.data,
                'types' : types
            },
            subchart: {
                show: true
            },
            zoom: {
                enabled: true
            },
            legend: {
                position : 'right'
            },
            groups: config.groups
        };

        //dex.console.log("TYPES:", gtypes);

        if (gtypes[0] == "string")
        {
            c3config["axis"] = {
                "x": {
                    "type": "category",
                    "categories": [].concat.apply([],
                      dex.matrix.uniques(dex.matrix.slice(csv.data, [0]))).sort()
                }
            }
        }
        else if (gtypes[0] == "date")
        {
            //dex.console.log("DEALING WITH A DATE...");
            c3config["axis"] = {
                "x": {
                    "type": "timeseries",
                    "tick": {
                        format: '%Y-%m-%d'
                    }
                }
            }
        }

        //dex.console.log("RENDER C3CONFIG", c3config);

        //dex.console.log("CATEGORIES", c3config);
        internalChart = c3.generate(c3config);
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        var gtypes = dex.csv.guessTypes(csv);

        var ncsv = dex.csv.columnSlice(csv, selectedColumns);
        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var types = {};
        dex.range(1, ncsv.header.length)
          .map(function(hi) { types[ncsv.header[hi-1]] = config.linktype; });

        var c3config = {
            'columns' : columns.data
        };

        //dex.console.log("C3CONFIG", c3config);

        //internalChart.groups(config.groups);
        internalChart.load(c3config);
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
};

module.exports = linechart;
},{}],8:[function(require,module,exports){
/**
 *
 * @constructor
 * @name StackedAreaChart
 * @classdesc This class constructs a c3 stacked area chart.
 * @memberOf dex.charts.c3
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var areachart = dex.charts.c3.BarChart({
 *   'parent' : "#AreaChart",
 *   'id'     : "AreaChart"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 *
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 *
 * @inherit module:dex/component
 *
 */
var stackedareachart = function (userConfig) {
    var chart;

    var defaults =
    {
        // The parent container of this chart.
        'parent': '#AreaChart',
        // Set these when you need to CSS style components independently.
        'id': 'AreaChart',
        'class': 'AreaChart',
        'resizable': true,
        'csv': {
            'header': [],
            'data': []
        },
        'width': "100%",
        'height': "100%",
        'transform': "translate(0 0)",
    };

    var chart = new dex.component(userConfig, defaults);

    chart.render = function render() {
        window.onresize = this.resize;
        chart.resize();
    };

    chart.resize = function resize() {
        if (chart.config.resizable) {
            var width = d3.select(chart.config.parent).property("clientWidth");
            var height = d3.select(chart.config.parent).property("clientHeight");
            dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
            chart.attr("width", width).attr("height", height).update();
        }
        else {
            chart.update();
        }
    };

    chart.update = function () {
        var chart = this;
        var config = chart.config;
        var csv = config.csv;

        var gtypes = dex.csv.guessTypes(csv);
        var ncsv = dex.csv.numericSubset(csv);
        var columns = dex.csv.transpose(ncsv);

        for (var ci = 0; ci < columns.header.length; ci++) {
            columns.data[ci].unshift(columns.header[ci]);
        }

        var types = {};
        dex.range(1, ncsv.header.length)
            .map(function(hi) { types[ncsv.header[hi-1]] = 'area-spline'; });

        var c3config = {
            'bindto' : config.parent,
            'data': {
                'columns': columns.data,
                'types': types,
                'groups' : [ columns.header ],
                color : d3.scale.category20()
            },
            subchart: {
                show: true
            },
            zoom: {
                enabled: true
            },
            legend: {
                position : 'right'
            }
        };

        // Set categorical axis if first column is a string.
        if (gtypes[0] == "string")
        {
            c3config['axis'] = { 'x' : {
                'type' : 'category',
                'label' : { 'text' : csv.header[0],
                'position' : 'outer-center' },
                'categories': dex.csv.transpose(dex.csv.columnSlice(csv, [0])).data[0]
            }};
        }

        var chart = c3.generate(c3config);
    };

    $(document).ready(function () {
        // Make the entire chart draggable.
        //$(chart.config.parent).draggable();
    });

    return chart;
};

module.exports = stackedareachart;
},{}],9:[function(require,module,exports){
/**
 *
 * @constructor
 * @name StackedBarChart
 * @classdesc This class constructs a c3 stacked bar chart.
 * @memberOf dex.charts.c3
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var areachart = dex.charts.c3.BarChart({
 *   'parent' : "#AreaChart",
 *   'id'     : "AreaChart"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 *
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} userConfig.parent - The parent node to which this Axis will be attached.  Ex: #MyParent
 * will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Axis] - The id of this axis.
 * @param {string} [userConfig.class=Axis] - The class of this axis.
 * @param {csv} userConfig.csv - The user's CSV data.
 *
 * @inherit module:dex/component
 *
 */
var stackedbarchart = function (userConfig) {
  var chart;

  var defaults = {
    // The parent container of this chart.
    'parent': '#BarChart',
    // Set these when you need to CSS style components independently.
    'id': 'BarChart',
    'class': 'BarChart',
    'resizable': true,
    'csv': {
      'header': [],
      'data': []
    },
    'padding': {
      'top': 10,
      'bottom': 10,
      'left': 50,
      'right': 10
    },
    'order': 'desc',
    'width': "100%",
    'height': "100%",
    'transform': "translate(0 0)",
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    var gtypes = dex.csv.guessTypes(csv);
    var ncsv = dex.csv.numericSubset(csv);
    var columns = dex.csv.transpose(ncsv);

    for (var ci = 0; ci < columns.header.length; ci++) {
      columns.data[ci].unshift(columns.header[ci]);
    }

    var c3config = {
      'bindto': config.parent,
      'data': {
        'columns': columns.data,
        'type': 'bar',
        color: d3.scale.category20(),
        'groups': [columns.header],
        'order': config.order
      },
      'bar': {'width': {'ratio': 0.9}},
      subchart: {
        show: true
      },
      zoom: {
        enabled: true
      },
      legend: {
        position: 'right'
      }
    };

    // Set categorical axis if first column is a string.
    if (gtypes[0] == "string") {
      c3config['axis'] = {
        'x': {
          'type': 'category',
          'label': {
            'text': csv.header[0],
            'position': 'outer-center'
          },
          'categories': dex.csv.transpose(dex.csv.columnSlice(csv, [0])).data[0]
        }
      };
    }

    var chart = c3.generate(c3config);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
}

module.exports = stackedbarchart;
},{}],10:[function(require,module,exports){
/**
 *
 * This module provides C3 based visualization components.
 *
 * @module dex/charts/c3
 * @name c3
 * @memberOf dex.charts
 *
 */
var c3 = {};

c3.AreaChart = require("./AreaChart");
c3.BarChart = require("./BarChart");
c3.LineChart = require("./LineChart");
c3.StackedAreaChart = require("./StackedAreaChart");
c3.StackedBarChart = require("./StackedBarChart");

module.exports = c3;
},{"./AreaChart":5,"./BarChart":6,"./LineChart":7,"./StackedAreaChart":8,"./StackedBarChart":9}],11:[function(require,module,exports){
/**
 *
 * This module provides visualization components for charting
 * out of a diverse set of base implementations ranging from
 * D3 to three.js and WebGL.
 *
 * @module dex/charts
 * @name charts
 * @memberOf dex
 *
 */
module.exports = function charts() {
  return {
    'c3'      : require("./c3/c3"),
    'd3'      : require("./d3/d3"),
    'd3plus'  : require("./d3plus/d3plus"),
    'dygraphs': require("./dygraphs/dygraphs"),
    'google'  : require("./google/google"),
    'threejs' : require("./threejs/threejs"),
    'vis'     : require("./vis/vis")
  };
};
},{"./c3/c3":10,"./d3/d3":33,"./d3plus/d3plus":35,"./dygraphs/dygraphs":37,"./google/google":43,"./threejs/threejs":45,"./vis/vis":47}],12:[function(require,module,exports){
var chord = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var chart;

  var defaults =
    {
      // The parent container of this chart.
      'parent': '#ChordDiagram',
      // Set these when you need to CSS style components independently.
      'id': 'Chord',
      'class': 'Chord',
      'resizable': true,
      // Our data...
      'csv': {
        // Give folks without data something to look at anyhow.
        'header': ["X", "Y", "Z"],
        'data': [
          [0, 0, 0],
          [1, 1, 1],
          [2, 2, 2]
        ]
      },
      'width': "100%",
      'height': "100%",
      'transform': "translate(0 0)",
      'padding': 0.05,
      'nodes': {
        'mouseout': dex.config.link({
          'stroke.color': "black",
          //'stroke.dasharray': '5 5',
          'stroke.width': 1,
          'fill.fillColor': function (d, i) {
            //dex.console.log("COLORD", d);
            return (chart.config.color(d.index));
          },
          'fill.fillOpacity': 0.5,
          'fill.fill': 'none',
          'd': d3.svg.arc(),
          'transform': ''
        }),
        'mouseover': dex.config.link({
          'stroke.color': "red",
          //'stroke.dasharray': '5 5',
          'stroke.width': 1,
          'fill.fillColor': function (d, i) {
            //dex.console.log("COLORD", d);
            return (chart.config.color(d.index));
          },
          'fill.fillOpacity': 1,
          'fill.fill': 'none',
          'd': d3.svg.arc(),
          'transform': ''
        })
      },
      'links': {
        'mouseout': dex.config.link({
          'stroke.color': "grey",
          'stroke.dasharray': '',
          'stroke.width': 1,
          'fill.fillColor': function (d, i) {
            return (chart.config.color(d.target.index));
          },
          'fill.fillOpacity': 0.3,
          'fill.fill': 'none',
          'd': d3.svg.chord(),
          'transform': ''
        }),
        'mouseover': dex.config.link({
          'stroke.color': "black",
          'stroke.dasharray': '',
          'stroke.width': 2,
          'fill.fillColor': function (d, i) {
            return (chart.config.color(d.target.index));
          },
          'transform': "",
          'fill.fillOpacity': 1,
          'fill.fill': 'none',
          'd': d3.svg.chord()
        })
      },
//                .style("fill", function (d) {
//        return chart.config.color(d.index);
//      })
    'color': d3.scale.category20(),
    'innerRadius': 130,
    'outerRadius': 200,
    'tick.start.x': 1,
    'tick.start.y': 0,
    'tick.end.x': 5,
    'tick.end.y': 0,
    'tick.padding': 10,
    'tick.stroke': dex.config.stroke(
      {
        'width': 2,
        'color': 'black'
        //'dasharray' : '1 2'
      }),
    'title': dex.config.text(),
    'label': dex.config.text()
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    chart.resize = this.resize(chart);
    window.onresize = chart.resize;
    return chart.resize();
  };

  chart.update = function () {
    d3 = dex.charts.d3.d3v3;
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll(config.parent).selectAll("*").remove();

    var minDimension = Math.min(config.width, config.height);
    var outer = Math.min(config.width, config.height) / 3;

    var inner = Math.max(outer - 20, 10);
    config.innerRadius = inner;
    config.outerRadius = outer;

    // Calculated attributes.
    config.nodes.mouseover.d.innerRadius(config.innerRadius).outerRadius(config.outerRadius + 2);
    config.nodes.mouseout.d.innerRadius(config.innerRadius).outerRadius(config.outerRadius);
    config.links.mouseover.d.radius(config.innerRadius);
    config.links.mouseout.d.radius(config.innerRadius);

    chart.attr("transform", "translate(" + (config.width / 2) + "," + (config.height / 2) + ")");

    //console.log("LONGEST: " + longest + ", FONT-SIZE: " + config.label.font.size + ", INNER: " + inner + ", OUTER: " + outer);
    if (config.debug) {
      console.log("===== Chord#" + config.id + "." + config.class +
        " Configuration =====");
      console.dir(config);
    }

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    chordData = dex.csv.getConnectionMatrix(csv);
    //dex.console.log("Connection Matrix:", chordData);
    //dex.console.log("CSV", csv);
    var chord = d3.layout.chord()
      .padding(config.padding)
      .sortSubgroups(d3.descending)
      .matrix(chordData.connections);

    //dex.console.log("LINKS", config.links);

    chartContainer.append("g")
      .attr("class", "arcs")
      .selectAll("path")
      .data(chord.groups)
      .enter().append("path")
      .attr("id", "fillpath")
      .call(dex.config.configureLink, config.nodes.mouseout)
      .on("mouseover", function (activeChord) {
        d3.select(this)
          .call(dex.config.configureLink, config.nodes.mouseover);
        //dex.console.log("F", activeChord);
        chartContainer.selectAll("g.chord path")
          .filter(function (d) {
            //return false;
            //dex.console.log("ACTIVE D", d);
            return d.source.index == activeChord.index || d.target.index == activeChord.index;
          })
          //.call("opacity", config.links.mouseover.fill.fillOpacity);
          .call(dex.config.configureLink, config.links.mouseover);
      })
      .on("mouseout", function (inactiveChord) {
        d3.select(this)
          .call(dex.config.configureLink, config.nodes.mouseout)
        //dex.console.log("INACTIVE", inactiveChord);
        chartContainer.selectAll("g.chord path")
          .filter(function (d) {
            //return false;
            //dex.console.log("INACTIVE D", d);
            return d.source.index == inactiveChord.index || d.target.index == inactiveChord.index;
          })
          .call(dex.config.configureLink, config.links.mouseout);
        //.style("opacity", config.links.mouseout.fill.fillOpacity);
      });

    // REM: Used to be svg.
    var ticks = chartContainer.append("g")
      .attr("id", "ChordTicks")
      .selectAll("g")
      .data(chord.groups)
      .enter().append("g")
      .selectAll("g")
      .data(groupTicks)
      .enter()
      .append("g")
      .attr("transform", function (d) {
        //console.dir(d);
        // Probably a bad idea, but getting parent angle data from parent.
        var startAngle = this.parentNode.__data__.startAngle;
        var endAngle = this.parentNode.__data__.endAngle;
        var midAngle = startAngle + (endAngle - startAngle) / 2.0;
        return "rotate(" + (midAngle * 180 / Math.PI - 90) + ")"
          + "translate(" + config.outerRadius + ",0)";
        //return "translate(" + config.xoffset + "," + config.yoffset + ")rotate(" + (midAngle * 180 / Math.PI - 90) + ")"
        //    + "translate(" + config.outerRadius + ",0)";
        //return "translate(" + config.xoffset + "," + config.yoffset + ")rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
        //    + "translate(" + config.outerRadius + ",0)";
      });

    ticks.append("line")
      .call(dex.config.configureLine, config.tick);
    //.attr("x1", 1)
    //.attr("y1", 0)
    //.attr("x2", config.tickLength)
    //.attr("y2", 0)
    //.attr("stroke-width", config.strokeWidth)
    //.style("stroke", "#000");

    ticks.append("text")
      .attr("x", config.tick.padding + (config.tick.padding / 4))
      .attr("dy", ".35em")
      .attr("font-size", config.label.font.size)
      .attr("text-anchor", function (d) {
        return d.angle > Math.PI ? "end" : null;
      })
      .attr("transform", function (d) {
        return d.angle > Math.PI ? "rotate(180)translate(-" +
          ((config.tick.padding * 2) + (config.tick.padding / 2)) + ")" : null;
      })
      .text(function (d) {
        return d.label;
      });

    chartContainer.append("g")
      .attr("class", "chord")
      .selectAll("path")
      .data(chord.chords)
      .enter().append("path")
      .call(dex.config.configureLink, config.links.mouseout)
      .on("mouseover", function () {
        d3.select(this)
          .call(dex.config.configureLink, config.links.mouseover);
      })
      .on("mouseout", function () {
        d3.select(this)
          .call(dex.config.configureLink, config.links.mouseout);
      });

    var chartTitle = chartContainer.append("text").call(dex.config.configureText, config.title,
      config.title.text);

    /** Returns an array of tick angles and labels, given a group. */
    function groupTicks(d) {
      var k = (d.endAngle - d.startAngle) / d.value;
      return d3.range(0, d.value, 1000).map(function (v, i) {
        return {
          angle: v * k + d.startAngle,
          //label: i % 5 ? null : v / 1000 + "k"
          label: chordData.header[d.index]
        };
      });
    }

    // Allow method chaining
    return chart;
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
}

module.exports = chord;
},{}],13:[function(require,module,exports){
var clusteredforce = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var defaults =
  {
    'parent': '#ClusteredForceParent',
    'id': "ClusteredForce",
    'class': "ClusteredForce",
    'height': "100%",
    'width': "100%",
    'csv': {
      'header': ["X", "Y"],
      'data': [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    'groups': [{'category': 0, 'value': 1, 'label': 0}],
    'transform': '',
    'color': d3.scale.category20(),
    'padding': 10,
    // TODO: Add normalization function.
    'sizingFunction': function () {
      return d3.scale.linear()
    },
    'minRadius': 5,
    'maxRadius': 20,
    'gravity': 2,
    'charge': 0,
    'scaleColumns': true,
    'circle': dex.config.circle({
      'r': function (d) {
        return (dex.object.isNumeric(d.radius) ? d.radius : 1);
      },
      'fill': dex.config.fill({
        'fillColor': function (d, i) {
          var darkColor = dex.color.shadeColor(d.color, -10);
          var gradientId = "gradient" + d.color.substring(1)
          var grad = d3.select(chart.config.parent)
            .select("#gradients")
            .selectAll("#" + gradientId)
            .data([gradientId])
            .enter()
            .append("radialGradient")
            .attr("class", "colorGradient")
            .attr("id", gradientId)
            .attr("gradientUnits", "objectBoundingBox")
            .attr("fx", "30%")
            .attr("fy", "30%");

          grad.append("stop")
            .attr("offset", "0%")
            .attr("style", "stop-color:#FFFFFF");

          // Middle
          grad.append("stop")
            .attr("offset", "90%")
            .attr("style", "stop-color:" + d.color);

          // Outer Edges
          grad.append("stop")
            .attr("offset", "100%")
            .attr("style", "stop-color:" + darkColor);

          return "url(#" + gradientId + ")";
        }
      }),
      'stroke': dex.config.stroke(),
      'tooltip': function (d) {
        return d.text;
      },
      'transform': ''
    })
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function () {
    d3 = dex.charts.d3.d3v3;
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function () {
    d3 = dex.charts.d3.d3v3;
    d3.selectAll("#" + chart.config.id).remove();
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart.attr("width", width).attr("height", height).update();
  };

  chart.update = function () {
    d3 = dex.charts.d3.d3v3;
    var config = chart.config;

    var csv = config.csv;

    var radius = d3.scale.sqrt().range([0, 12]);

    /*
    var minValue, maxValue;

    if (!config.scaleColumns) {
      minValue = dex.matrix.min(csv.data, numericIndices[0]);
      maxValue = dex.matrix.max(csv.data, numericIndices[0]);
      for (i = 0; i < numericIndices.length; i++) {
        minValue = Math.min(minValue, dex.matrix.min(csv.data, numericIndices[i]));
        maxValue = Math.max(maxValue, dex.matric.max(csv.data, numericIndices[i]));
      }
    }
*/

    var nodes = [];

    var values = [];
    var min = null;
    var max = null;

    config.groups.forEach(function (group) {
      "use strict";
      config.csv.data.forEach(function (row) {
        var value = +(row[group.value]);
        nodes.push({
          'category': row[group.category],
          'value': +value,
          'color' : config.color(row[group.category]),
          'text': "<table><tr><td>Label</td></td><td>" + row[group.label] +
          "</td></tr><tr><td>Category</td><td>" + row[group.category] + "</td></tr>" +
          "<tr><td>Value</td><td>" + row[group.value] +
          "</td></tr></table>"
        });
        if (min == null || min > +value) {
          min = +value;
        }

        if (max == null || max < +value) {
          max = +value;
        }
      })
    });

    var radiusScale = d3.scale.linear()
      .domain([min, max])
      .range([config.minRadius, config.maxRadius]);

    nodes.forEach(function (node) {
      "use strict";
      node.radius = radiusScale(+node.value);
    });

    dex.console.log("NODES", nodes, "VALUES", values, "EXTENTS", min, max);

    force = d3.layout.force()
      .nodes(nodes)
      .size([config.width, config.height])
      .gravity(config.gravity / 100.0)
      .charge(config.charge / 100.0)
      .on("tick", tick)
      .start();

    var chartContainer = d3.select(config.parent);

    chartContainer.append('defs')
      .attr('id', 'gradients');

    chartContainer.append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    var circle = chartContainer.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .call(dex.config.configureCircle, config.circle)
      .call(force.drag);

    circle.append("text")
      .text(config.circle.tooltip);

    function tick(e) {
      circle
        .each(cluster(10 * e.alpha * e.alpha))
        .each(collide(.5))
        .attr("radius", function (d) {
          return (dex.object.isNumeric(d.radius) ? d.radius : 1);
        })
        .attr("cx", function (d) {
          return (dex.object.isNumeric(d.x) ? d.x : 0);
        })
        .attr("cy", function (d) {
          return (dex.object.isNumeric(d.y) ? d.y : 0);
        });
    }

    // Move d to be adjacent to the cluster node.
    function cluster(alpha) {
      var max = {};

      // Find the largest node for each cluster.
      nodes.forEach(function (d) {
        if (!(d.color in max) || (d.radius > max[d.color].radius)) {
          max[d.color] = d;
        }
      });

      return function (d) {
        var node = max[d.color],
          l,
          r,
          x,
          y,
          i = -1;

        if (node == d) return;

        x = d.x - node.x;
        y = d.y - node.y;
        l = Math.sqrt(x * x + y * y);
        r = d.radius + node.radius;
        if (l != r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          node.x += x;
          node.y += y;
        }
      };
    }

    // Resolves collisions between d and all other circles.
    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function (d) {
        var r = d.radius + radius.domain()[1] + config.padding,
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
        quadtree.visit(function (quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.color !== quad.point.color) * config.padding;
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2
            || x2 < nx1
            || y1 > ny2
            || y2 < ny1;
        });
      };
    }
  };

  $(document).ready(function () {
    $(chart.config.parent).uitooltip({
      items: "circle",
      position: {
        my: "right bottom+50"
      },
      content: function () {
        return $(this).find("text").text();
      },
      track: true
    });

    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = clusteredforce;
},{}],14:[function(require,module,exports){
var dendrogram = function Dendrogram(userConfig) {
  d3 = dex.charts.d3.d3v3;
  var defaults =
  {
    // The parent container of this chart.
    'parent': null,
    // Set these  when you need to CSS style components independently.
    'id': 'Dendrogram',
    'class': 'Dendrogram',
    'resizable': true,
    'margin': {
      'top': 10,
      'bottom': 10,
      'left': 10,
      'right': 10
    },
    // diagonal, elbow
    'connectionType': 'diagonal',
    // Our data...
    'csv': {
      // Give folks without data something to look at anyhow.
      'header': ["X", "Y"],
      'data': [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    // width and height of our chart.
    'width': "100%",
    'height': "100%",
    'connection': {
      'length': 180,
      'style': {
        'stroke': dex.config.stroke()
      }
    },
    //'transform': 'translate(20,0)',
    'root': {
      'name': "ROOT",
      'category': "ROOT"
    },
    'color': d3.scale.category20(),
    'node': {
      'expanded': {
        'label': dex.config.text({
          'x': 8,
          'y': 4,
          'font.weight': 'bold',
          'fill.fillColor': 'black',
          'text': function (d) {
            return (d.name) ? d.name : d.category;
          }
        }),
        'circle': dex.config.circle({
          'r': 4,
          'fill': {
            'fillColor': 'steelblue'
          }
        })
      },
      'collapsed': {
        'label': dex.config.text({
          'x': 8,
          'y': 4,
          'font.weight': 'bold',
          'text': function (d) {
            return (d.name) ? d.name : d.category;
          }
        }),
        'circle': dex.config.circle({
          'r': 5,
          'fill': {
            'fillColor': 'green',
            'fillOpacity': .8
          }
        })
      }
    },
    'link': dex.config.link({
      'fill': {
        'fillColor': 'none'
      },
      'stroke': dex.config.stroke({
        'color': 'green',
        'width': 1,
        'opacity': .3,
        'dasharray': "5 5"
      })
    })
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    var chart = this;
    window.onresize = chart.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    d3 = dex.charts.d3.d3v3;
    dex.console.log("PARENT: '" + chart.config.parent + "'");
    if (chart.config.resizable) {
      var width = $("" + chart.config.parent).width();
      var height = $("" + chart.config.parent).height();
      dex.console.log("RESIZE: " + width + "x" + height);
      chart.attr("width", width)
        .attr("height", height)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    d3 = dex.charts.d3.d3v3;
    var chart = this;
    var config = chart.config;

    var csv = config.csv;
    var json;

    d3.selectAll(config.parent).selectAll("*").remove();

    if (config.debug) {
      console.log("===== Dendrogram Configuration =====");
      console.dir(config);
    }

    var i = 0, root;

    var width = config.width - config.margin.left - config.margin.right;
    var height = config.height - config.margin.top - config.margin.bottom;

    var tree = d3.layout.tree()
      .size([height, width]);

    var cluster = d3.layout.cluster()
      .size([height, width]);

    var layout = tree;

    var connectionType;

    if (config.connectionType == "extended-elbow") {
      connectionType = function extendedElbow(d, i) {
        return "M" + d.source.y + "," + d.source.x
          + "H" + (d.source.y + 50)
          + "V" + d.target.x + "H" + d.target.y;
      }
    }
    else if (config.connectionType == "elbow") {
      connectionType = function elbow(d, i) {
        return "M" + d.source.y + "," + d.source.x
          + "V" + d.target.x + "H" + d.target.y;
      }
    }
    else {
      connectionType = d3.svg.diagonal()
        .projection(function (d) {
          return [d.y, d.x];
        });
    }

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("transform", "translate(" + config.margin.left +
        ", " + config.margin.top + ")")
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);
/*
    var gradient = chartContainer.append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#0c0")
      .attr("stop-opacity", 1);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#c00")
      .attr("stop-opacity", 1);
*/

    json =
    {
      "name": config.root.name,
      "category": config.root.category,
      "children": dex.csv.toHierarchicalJson(csv)
    };

    root = json;
    root.x0 = height / 2;
    root.y0 = 0;

    function toggleAll(d) {
      if (d.children) {
        d.children.forEach(toggleAll);
        toggle(d);
      }
      else if (d.kids) {
        d.kids.forEach(toggleAll);
        toggle(d);
      }
    }

    // Initialize the display to show a few nodes.
    //root.kids.forEach(toggleAll);

    chart.root = json;
    update(chart.root);

    function update(source) {
      var duration = d3.event && d3.event.altKey ? 5000 : 500;
      var depthY = new Array();

      // Compute the new tree layout.
      var nodes = layout.nodes(root).reverse();

      // Allow manually set lengths to be used instead of fixed length connectors
      var fixedLength = true;
      if (String(config.connection.length).indexOf(",") > -1) {
        fixedLength = false;
        depthY = String(config.connection.length).split(",")
      }
      else if (String(config.connection.length) === "fit-text") {
        //dex.console.log("COMPACT");
        var preText = d3.select(config.parent + " g").append("text");
        //var charWidth = charText.node().getBBox().width;

        //charText.call(dex.config.configureText);
        fixedLength = false;
        var depthMap = {};
        nodes.forEach(function (d) {
          preText.text(d.name);
          // Find start for each connection.
          var textLen = preText.node().getBBox().width;
          //dex.console.log("D", d, textLen);
          if (depthMap[d.depth]) {
            if (depthMap[d.depth] < textLen) {
              depthMap[d.depth] = textLen;
            }
          }
          else {
            depthMap[d.depth] = textLen;
          }
        });
        //dex.console.log("LENGTHS", depthMap);
        depthY = [0];
        var textPadding = 40;
        var textOffset = textPadding;
        for (i = 0; depthMap[i]; i++) {
          depthY.push(depthMap[i] + textOffset);
          textOffset += depthMap[i] + textPadding;
        }
        preText.remove();
      }

      // Set y offsets based on single fixed length or manual settings
      nodes.forEach(function (d) {
        if (fixedLength) {
          d.y = d.depth * config.connection.length;
        }
        else {
          d.y = +depthY[d.depth];
        }
      });

      // Update the nodes…
      var node = chartContainer.selectAll("g.node")
        .data(nodes, function (d) {
          return d.id || (d.id = ++i);
        });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function (d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on("click", function (d) {
          toggle(d);
          update(d);
        });

      // Come back here...
      nodeEnter.append("svg:circle")
        .each(function (d) {
          //dex.console.log("CALLING", this, d, i);
          var nodeConfig = (d._children) ?
            config.node.collapsed.circle : config.node.expanded.circle;
          d3.select(this).call(dex.config.configureCircle, nodeConfig);
        })
        .attr("r", 1e-6);

      // Add text nodes configured like we want them.
      nodeEnter.append("text")
        .each(function (d) {
          var nodeConfig = (d._children) ?
            config.node.collapsed.label : config.node.expanded.label;
          d3.select(this).call(dex.config.configureText, nodeConfig);
        })
        //.text(function(d) { return (d.name) ? d.name : d.category;})
        .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

      nodeUpdate.selectAll("circle")
        .each(
          function (d) {
            var nodeConfig = (d._children) ?
              config.node.collapsed.circle : config.node.expanded.circle;
            d3.select(this).transition().call(dex.config.configureCircle, nodeConfig);
          });

      nodeUpdate.select("text")
        .each(
          function (d) {
            var nodeConfig = (d._children) ?
              config.node.collapsed.label : config.node.expanded.label;
            d3.select(this).call(dex.config.configureText, nodeConfig);
          })
        .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + (source.y) + "," + (source.x) + ")";
        })
        .remove();

      nodeExit.select("circle")
        .attr("r", 1e-6);

      nodeExit.select("text")
        .style("fill-opacity", 1e-6);

      // Update the links…
      var link = chartContainer.selectAll("path.link")
        .data(layout.links(nodes), function (d) {
          return d.target.id;
        });

      // Enter any new links at the parent's previous position.
      link.enter().insert("svg:path", "g")
        .attr("class", "link")
        .call(dex.config.configureLink, config.link)
        //.style("fill", config.link.fill)
        //.style("fill-opacity", config.link.fillOpacity)
        .attr("d", function (d) {
          var o = {x: source.x0, y: source.y0};
          return connectionType({source: o, target: o});
        })
        .transition()
        .duration(duration)
        .attr("d", connectionType)
      ;

      // Transition links to their new position.
      link.transition()
        .duration(duration)
        .attr("d", connectionType);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
          var o = {x: source.x, y: source.y};
          return connectionType({source: o, target: o});
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Toggle children.
    function toggle(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      }
      else {
        d.children = d._children;
        d._children = null;
        d.children.forEach(function (child) { collapse(child);});
        //dex.console.log(d.children);
      }
    }

    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      }
    }
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = dendrogram;
},{}],15:[function(require,module,exports){
var horizontallegend = function (userConfig) {
  var defaults = {
    'parent'     : null,
    'labels'     : ["A", "B", "C"],
    'id'         : "HorizontalLegend",
    'class'      : "HorizontalLegend",
    'transform'  : 'translate(20,20)',
    'tickLength' : 25,
    'color'      : d3.scale.category20c(),
    'caption'    : dex.config.text({
      'text'   : "Legend",
      'x'      : 0,
      'y'      : -6,
      'anchor' : 'start',
      'font'   : dex.config.font({'size' : 14, 'weight' : 'bold'}),
      'fill'   : dex.config.fill({'fillColor' : 'black'})
    }),
    'axis'       : dex.config.axis({
      'tickSize'    : 25,
      'tickPadding' : 10,
      'orient'      : 'bottom',
      'tickFormat'  : function (d) {
        return d;
      },
      'tickLine'    : dex.config.line({
        'stroke' : dex.config.stroke({'color' : 'grey', 'width' : 1}),
        'fill'   : dex.config.fill({'fillColor' : 'none'})
      }),
      'path'        : dex.config.path({
        'fill'   : dex.config.fill({'fillColor' : 'none'}),
        'stroke' : dex.config.stroke({'color' : 'grey', 'width' : 1})
      })
    }),
    'cell'       : dex.config.rectangle({
        'stroke' : dex.config.stroke(),
        'color'  : d3.scale.category10(),
        'height' : 20,
        'width'  : 30
      }
    )
  };

  //config = dex.object.overlay(dex.config.expand(userConfig), dex.config.expand(defaults));
  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    this.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    dex.console.log("HorizontalLegend config:", config);
    // Create our x scale
    var x = d3.scale.ordinal()
      .domain(config.labels)
      .range(d3.range(config.labels.length).map(function (i) {
        return i * config.cell.width;
      }));

    // Create the x axis.
    var xAxis = dex.config.createAxis(config.axis)
      .scale(x)
      .tickValues(config.labels);

    // Append a graphics node to the supplied svg node.
    var chartContainer = d3.select(config.parent).append("g")
      .attr("class", config["class"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    // Draw a colored rectangle for each ordinal range.
    chartContainer.selectAll("rect")
      .data(config.labels)
      .enter().append("rect")
      //.attr("height", config.cellHeight)
      .call(dex.config.configureRectangle, config.cell)
      .attr("x", function (d, i) {
        return x(i);
      });

    // Add the caption.
    chartContainer.call(xAxis).append("text")
      //.attr("class", "caption")
      .call(dex.config.configureText, config.caption);
    //.attr("y", config.captionYOffset)
    //.attr("x", config.captionXOffset)
    //.text("GEEZE");
    //.style("font-size", config.captionFontSize);

    chartContainer.select('path')
      .call(dex.config.configurePath, config.axis.path);

    chartContainer.selectAll(".tick line")
      .call(dex.config.configureLine, config.axis.tickLine);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = horizontallegend;
},{}],16:[function(require,module,exports){
var motionbarchart = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var defaultColor = d3.scale.category10();

  var csv = {
    'header': ['name', 'color', 'time', 'x', 'y', 'size'],
    'data': []
  }

  var i = 0;
  for (var time = 1800; time < 1810; time += 1) {
    for (var color = 1; color < 4; color++) {
      csv.data.push(["name-" + color, color, time,
        i * color, i * i * color, i * i * i * color]);
    }
    i += 1;
  }

  var color = d3.scale.category20c();

  var defaults =
  {
    // The parent container of this chart.
    'parent': null,
    // Set these when you need to CSS style components independently.
    'id': 'MotionBarhart',
    'class': 'MotionBarChart',
    // Our data...
    'csv': csv,

    // Tells us which columns represent what.
    'index': {
      'name': 0,
      'color': 0,
      'time': 1,
      'y': 2
    },
    // Chart dimensions.
    'width': 600,
    'height': 400,
    'margin': {
      top: 20,
      right: 120,
      bottom: 80,
      left: 50
    },

    'bar': dex.config.rectangle({
        'color': function (d, i) {
          return color(i);
        },
        'stroke.width': 1,
        'stroke.color': 'black',
        'events': {
          'mouseover': function () {
            d3.select(this)
              .style("stroke", 'red')
              .style("stroke-width", 2);
          },
          'mouseout': function () {
            d3.select(this)
              .style("stroke", chart.config.bar.stroke.color)
              .style("stroke-width", chart.config.bar.stroke.width);
          }
        }
      }
    ),

    // Main label configuration
    'label.font.size': 64,
    'label.fill.fillColor': 'steelblue',
    'label.fill.fillOpacity': 0.4,
    'label.y': function (d) {
      return chart.config.margin.top;
    },
    'label.dy' : '.50em',
    'label.x': function (d) {
      return chart.config.margin.left + (chart.config.width / 2);
    },

    'transform': '',
    'duration': 5000,

    'xaxis': dex.config.axis({
      'scale.type': 'linear',
      'orient': 'bottom',
      'label': dex.config.text({
        'anchor': 'start',
        'writingMode' : 'tb',
        'dx' : function(d) { return chart.config.bar.width - (chart.config.xaxis.label.font.size / 2); },
        'dy' : '.5em'
      }),
      'tick.stroke.color': 'black',
      'tick.stroke.width': 1,
      'tick.fill.fillColor': 'none',
      'axisLine.stroke.color': 'black',
      'axisLine.stroke.width': 1,
      'axisLine.stroke.dasharray': "0",
      'axisLine.fill.fillColor': 'none'
    }),
    'yaxis': dex.config.axis({
      'scale.type': 'linear',
      'orient': 'left',
      'label': dex.config.text({
        'anchor': 'end',
        'dx' : '-.5em' //function(d) { return chart.config.margin.left; },
      }),
      'title': dex.config.text(),
      'tick.stroke.width': 1,
      'tick.fill.fillColor': 'none',
      'axisLine.stroke.color': 'black',
      'axisLine.stroke.width': 2,
      'axisLine.stroke.dasharray': "10 10",
      'axisLine.fill.fillColor': 'none'
    })
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    window.onresize = this.resize;
    this.resize();
  };

  chart.resize = function resize() {
    d3 = dex.charts.d3.d3v3;
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart
      .attr("width", width - chart.config.margin.left - chart.config.margin.right)
      .attr("height", height - chart.config.margin.top - chart.config.margin.bottom)
      .update();
  };

  chart.update = function update() {
    d3 = dex.charts.d3.d3v3;
    // If we need to call super:
    //DexComponent.prototype.update.call(this);
    var chart = this.chart;
    var config = this.config;
    var csv = config.csv;

    d3.selectAll('#' + config.id).remove();

    var keyMap = {};

    csv.data.forEach(function (row) {
      var curName = row[config.index.name];
      var curColor = row[config.index.color];
      var curTime = row[config.index.time];
      var curY = row[config.index.y];
      var curSize = +row[config.index.size];

      if (!keyMap[curName]) {
        keyMap[curName] = {
          'name': curName,
          'color': curColor,
          'time': curTime,
          'y': [[curTime, curY]],
          'size': [[curTime, curSize]]
        };
      }
      else {
        keyMap[curName].y.push([curTime, curY]);
        keyMap[curName].size.push([curTime, curSize]);
      }
    });

    var uniques = dex.matrix.uniques(csv.data);

    var timeExtents = dex.matrix.extent(csv.data, [config.index.time]);
    //var xExtents = [0, uniques[config.index.name].length-1];
    var yExtents = dex.matrix.extent(csv.data, [config.index.y]);

    //dex.console.log("EXTENTS: Y", yExtents, "UNIQUES", uniques[config.index.name]);

    // Various scales. These domains make assumptions of data, naturally.
    var xScale = d3.scale.ordinal()
      .domain(uniques[config.index.name].sort())
      .rangePoints([0, config.width]);

    //  d3.scale.linear().domain(xExtents).range([0, width - 60]);
    var yScale = dex.config.createScale(config.yaxis.scale)
      .domain([0, yExtents[1]]).range([config.height, 0]);

    // The x & y axes.
    var xAxis = dex.config.createAxis(config.xaxis)
      .scale(xScale);

    var yAxis = dex.config.createAxis(config.yaxis)
      .scale(yScale);

    var svg = d3.select(config.parent)
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("height", config.height)
      .attr("width", config.width)
      .attr("transform", "translate(" + config.margin.left +
        ", " + config.margin.top + ")")

    // Add the x-axis.
    svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + config.height + ")")
      .call(xAxis);

    // Add the y-axis.
    svg.append("g")
      .attr("class", "yaxis")
      .call(yAxis);

    var xticks = svg.selectAll(".xaxis .tick");

    var xtickLines = xticks.selectAll("line")
      .call(dex.config.configureStroke, config.xaxis.tick.stroke)
      .call(dex.config.configureFill, config.xaxis.tick.fill);

    var yticks = svg.selectAll(".yaxis .tick");

    var yTickLines = yticks.selectAll("line")
      .call(dex.config.configureStroke, config.yaxis.tick.stroke)
      .call(dex.config.configureFill, config.yaxis.tick.fill);

    svg.selectAll(".xaxis path")
      .call(dex.config.configureStroke, config.xaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.xaxis.axisLine.fill);

    svg.selectAll(".yaxis path")
      .call(dex.config.configureStroke, config.yaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.yaxis.axisLine.fill);

    //var xTickLabels = xticks
    //  .append("text")
    //  .text("P" + config.csv.header[config.index.name]);

    //dex.console.log("XTICK-LABELS", xTickLabels);
    xticks.selectAll("text")
      .call(dex.config.configureText, config.xaxis.label);

    //xticks.selectAll("text")
    //  .call(dex.config.configureText, config.xaxis.label);

    // Add a y-axis label.
    svg.append("text")
      .attr("class", "yLabel")
      .call(dex.config.configureText, config.yaxis.title)
      .text(config.csv.header[config.index.y]);

    yticks.selectAll("text")
      .call(dex.config.configureText, config.yaxis.label);

    // Add the year label; the value is set on transition.
    var label = svg.append("text")
      .attr("class", "timeLabel")
      .attr("text-anchor", "end")
      .call(dex.config.configureText, config.label)
      .text(timeExtents[0]);

    // Load the data.
    //d3.json("nations.json", function (nations) {

    // A bisector since many nation's data is sparsely-defined.
    var bisect = d3.bisector(function (d) {
      return d[0];
    });

    // Add a bar per nation. Initialize the data at min year value, and set the colors.
    var bars = svg.append("g")
      .attr("class", "bars")
      .selectAll(".bar")
      .data(interpolateData(timeExtents[0]))
      .enter().append("rect")
      .attr("class", "bar")
      .call(dex.config.configureRectangle, config.bar)
      .call(position);
    //.sort(order);

    // Add a title.
    bars
      .append("tooltip-content")
      .text(function (d, i) {
        return "<table>" +
          "<tr><td>Name:</td><td>" + d.name + "</td></tr>" +
          "<tr><td>Category:</td><td>" + d.color + "</td></tr>" +
          "<tr><td>Value:</td><td>" + d.y + "</td></tr>" +
          "</table>";
      });

    // Add an overlay for the year label.
    var box = label.node().getBBox();

    var overlay = svg.append("rect")
      .attr("class", "overlay")
      .attr("x", box.x)
      .attr("y", box.y)
      .attr("width", box.width)
      .attr("height", box.height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .style("cursor", "ew-resize")
      .on("mouseover", enableInteraction);

    // Start a transition that interpolates the data based on year.
    svg.transition()
      .duration(config.duration)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);

    // Positions the dots based on data.
    function position(bar) {
      var barWidth = Math.floor(config.width / bar.size() - 8);

      bar
        .attr("x", function (d, i) {
          return xScale(d.name);
        })
        .attr("y", function (d) {
          return yScale(d.y);
        })
        .attr("width", function (d) {
          return barWidth;
        })
        .attr("height", function (d) {
          //console.log(d.name + ": yScale(0)=" + yScale(0) + " - yScale(" + d.y + ")=" + yScale(d.y));
          // Some values were going negative...I might be sweeping a bug under the rug
          // but this at least filters these values.
          return Math.max(yScale(0) - yScale(d.y), 0);
        });
    }

    // After the transition finishes, you can mouseover to change the year.
    function enableInteraction() {
      //dex.console.log("ENABLING INTERACTION");
      var yearScale = d3.scale.linear()
        .domain(timeExtents)
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

      // Cancel the current transition, if any.
      svg.transition().duration(0);

      overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

      function mouseover() {
        label.classed("active", true);
      }

      function mouseout() {
        label.classed("active", false);
      }

      function mousemove() {
        displayYear(yearScale.invert(d3.mouse(this)[0]));
      }
    }

    // Tweens the entire chart by first tweening the year, and then the data.
    // For the interpolated data, the dots and label are redrawn.
    function tweenYear() {
      var year = d3.interpolateNumber(timeExtents[0], timeExtents[1]);
      return function (t) {
        displayYear(year(t));
      };
    }

    // Updates the display to show the specified year.
    function displayYear(year) {
      //dex.console.log("interpolateData(" + year + ")=",
      //  interpolateData(year));
      bars.data(interpolateData(year), function (d) {
        //dex.console.log("'" + d.name + "', interpolateData(" + year + ")=",
        //  interpolateData(year));
        return d.name;
      }).call(position);//.sort(order);
      label.text(Math.round(year));
    }

    // Interpolates the dataset for the given (fractional) year.
    function interpolateData(year) {
      var timeData = [];

      //
      for (var name in keyMap) {
        if (keyMap.hasOwnProperty(name)) {
          var entry = keyMap[name];

          //dex.console.log("ENTRY-DATA", entry);
          timeData.push({
            time: year,
            name: entry.name,
            color: entry.color,
            y: interpolateValues(entry.y, year),
            size: interpolateValues(entry.size, year)
          });
        }
      }
      //dex.console.log("interpolateData(" + year + ")=", timeData);
      return timeData;
    }

    // Finds (and possibly interpolates) the value for the specified year.
    function interpolateValues(values, year) {
      //dex.console.log("VALUES", values);
      var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
      if (i > 0) {
        var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
        return a[1] * (1 - t) + b[1] * t;
      }
      return a[1];
    }
  };

  $(document).ready(function () {

    // Add tooltips
    $(chart.config.parent).tooltip({
      items: "rect",
      content: function () {
        return $(this).find("tooltip-content").text();
      },
      track: true
    });

    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
    $(chart.config.parent).find("rect").draggable();
  });

  return chart;
};

module.exports = motionbarchart;
},{}],17:[function(require,module,exports){
var motionchart = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var defaultColor = d3.scale.category20();

  var csv = {
    'header' : ['name', 'color', 'time', 'x', 'y', 'size'],
    'data'   : []
  }

  var i = 0;
  for (var time = 1800; time < 1810; time += 1) {
    for (var color = 1; color < 4; color++) {
      csv.data.push(["name-" + color, color, time,
                     i * color, i * i * color, i * i * i * color]);
    }
    i += 1;
  }

  var defaults =
  {
    // The parent container of this chart.
    'parent' : null,
    // Set these when you need to CSS style components independently.
    'id'     : 'MotionChart',
    'class'  : 'MotionChart',
    // Our data...
    'csv'    : csv,

    // Tells us which columns represent what.
    'index'  : {
      'name'  : 0,
      'color' : 1,
      'time'  : 2,
      'x'     : 3,
      'y'     : 4,
      'size'  : 5
    },
    // Chart dimensions.
    'width'  : 600,
    'height' : 400,
    'margin' : {top : 50, right : 50, bottom : 50, left : 50},

    // Configuration for drawing the data-circles.
    'circle' : dex.config.circle({
      'colorscale'       : d3.scale.category10(),
      //'stroke.dasharray' : "1 1",
      'stroke.width'     : 1,
      'stroke.color'     : 'black',
      'fill.fillColor'   : function (d) {
        //dex.console.log("color(", d, ")=");
        return chart.config.circle.colorscale(d.name);
      },
      'fill.fillOpacity' : .4,
      'sizeScale.type'   : 'linear',
      'events'           : {
        'mouseover' : function () {
          d3.select(this)
            .style("stroke", 'red')
            .style("stroke-width", 4)
            .style("fill-opacity", 1);
        },
        'mouseout'  : function () {
          d3.select(this)
            .style("stroke", chart.config.circle.stroke.color)
            .style("stroke-width", chart.config.circle.stroke.width)
            .style("opacity", chart.config.circle.fill.fillOpacity);
        }
      }
    }),

    // Main label configuration
    'label.font.size'        : 128,
    'label.fill.fillColor'   : 'steelblue',
    'label.fill.fillOpacity' : 0.4,
    'label.y'                : function (d) {
      return chart.config.height * .5;
    },
    'label.x'                : function (d) {
      return chart.config.width * .8;
    },

    'transform' : 'translate(0,0)',
    'duration'  : 10000,

    'xaxis' : dex.config.axis({
      'scale.type'              : 'linear',
      'orient'                  : 'bottom',
      'label': dex.config.text({
        'anchor': 'middle',
        'writingMode' : 'lr',
        'dx' : 0,
        'dy' : '1.5em'
      }),
      'title': dex.config.text({
        'anchor' : 'middle',
        'font.size' : '16',
        'x': function (d) {
          return (chart.config.width - chart.config.margin.left) / 2; },
        'y': function(d) {
          return chart.config.height - chart.config.margin.bottom - 12;
        }
      }),
      'tick.stroke.width'       : 1,
      'tick.fill.fillColor'     : 'none',
      'axisLine.stroke.color'   : 'black',
      'axisLine.stroke.width'   : 1,
      'axisLine.fill.fillColor' : 'none'
    }),
    'yaxis' : dex.config.axis({
      'scale.type'              : 'linear',
      'orient'                  : 'left',
      'label': dex.config.text({
        'anchor': 'middle',
        'writingMode' : 'tb',
        'dx' : '-1em',
        'dy' : '-.5em'
      }),
      'title': dex.config.text({
        'anchor' : 'start',
        'writingMode' : 'tb',
        //'transform' : 'rotate(90)',
        'font.size' : '16',
        'x': function (d) { return 0; },
        'dx' : '1em',
        'y': function(d) {
          return config.margin.top;
        },
        'dy' : '2em'
      }),
      'tick.stroke.width'       : 3,
      'tick.fill.fillColor'     : 'red',
      'axisLine.stroke.color'   : 'black',
      'axisLine.stroke.width'   : 1,
      'axisLine.fill.fillColor' : 'none'
    })
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    window.onresize = this.resize;
    this.resize();
  };

  chart.resize = function resize() {
    d3 = dex.charts.d3.d3v3;
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart
      .attr("width", width)
      .attr("height", height)
      .update();
  };

  chart.update = function update() {
    d3 = dex.charts.d3.d3v3;
    // If we need to call super:
    //DexComponent.prototype.update.call(this);
    var chart = this.chart;
    var config = this.config;
    var csv = config.csv;

    d3.selectAll('#' + config.id).remove();

    if (config.debug) {
      console.log("===== Motion Chart Configuration =====");
      console.dir(config);
    }

    var keyMap = {};

    csv.data.forEach(function (row) {
      var curName = row[config.index.name];
      var curColor = row[config.index.color];
      var curTime = row[config.index.time];
      var curX = row[config.index.x];
      var curY = row[config.index.y];
      var curSize = +row[config.index.size];

      if (!keyMap[curName]) {
        keyMap[curName] = {
          'name'  : curName,
          'color' : curColor,
          'time'  : curTime,
          'x'     : [[curTime, curX]],
          'y'     : [[curTime, curY]],
          'size'  : [[curTime, curSize]]
        };
      }
      else {
        keyMap[curName].x.push([curTime, curX]);
        keyMap[curName].y.push([curTime, curY]);
        keyMap[curName].size.push([curTime, curSize]);
      }
    });

    // Various accessors that specify the four dimensions of data to visualize.
    function key(d) {
      return d.name;
    }

    function color(d) {
      return d.color;
    }

    function x(d) {
      return d.x;
    }

    function y(d) {
      return d.y;
    }

    function radius(d) {
      return d.size;
    }

    var timeExtents = dex.matrix.extent(csv.data, [config.index.time]);
    var xExtents = dex.matrix.extent(csv.data, [config.index.x]);
    var yExtents = dex.matrix.extent(csv.data, [config.index.y]);
    var sizeExtents = dex.matrix.extent(csv.data, [config.index.size]);

    //dex.console.log("EXTENTS: X", xExtents, "Y", yExtents, "RADIUS", sizeExtents);

    var width = config.width - config.margin.right;
    var height = config.height - config.margin.top - config.margin.bottom;

    // Various scales. These domains make assumptions of data, naturally.
    var xScale =
      dex.config.createScale(config.xaxis.scale)
        .domain(xExtents).range([0, width - 60]);

    //  d3.scale.linear().domain(xExtents).range([0, width - 60]);
    var yScale = dex.config.createScale(config.yaxis.scale)
      .domain(yExtents).range([height, 60]);

    //d3.scale.linear().domain(yExtents).range([height, 60]);
    var radiusScale = dex.config.createScale(config.circle.sizeScale)
      .domain(sizeExtents).range([2, 50]);
    //d3.scale.linear().domain(sizeExtents).range([2, 50]);

    // The x & y axes.
    var xAxis = dex.config.createAxis(config.xaxis)
      .scale(xScale);

    var yAxis = dex.config.createAxis(config.yaxis)
      .scale(yScale);

    var svg = d3.select(config.parent)
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    // Add the x-axis.
    svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the y-axis.
    svg.append("g")
      .attr("class", "yaxis")
      .call(yAxis);

    var xticks = svg.selectAll(".xaxis .tick");

    xticks.selectAll("line")
      .call(dex.config.configureStroke, config.xaxis.tick.stroke)
      .call(dex.config.configureFill, config.xaxis.tick.fill);

    var yticks = svg.selectAll(".yaxis .tick");

    yticks.selectAll("line")
      .call(dex.config.configureStroke, config.yaxis.tick.stroke)
      .call(dex.config.configureFill, config.yaxis.tick.fill);

    svg.selectAll(".xaxis path")
      .call(dex.config.configureStroke, config.xaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.xaxis.axisLine.fill);

    svg.selectAll(".yaxis path")
      .call(dex.config.configureStroke, config.yaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.yaxis.axisLine.fill);

    // Add an x-axis label.
    svg.append("text")
      .attr("class", "xLabel")
      .call(dex.config.configureText, config.xaxis.title)
      //.attr("dx", width)
      //.attr("dy", height - 6)
      .text(config.csv.header[config.index.x]);

    // Add a y-axis label.
    svg.append("text")
      .attr("class", "yLabel")
      .call(dex.config.configureText, config.yaxis.title)
      .text(config.csv.header[config.index.y]);

    xticks.selectAll("text")
      .call(dex.config.configureText, config.xaxis.label);

    yticks.selectAll("text")
      .call(dex.config.configureText, config.yaxis.label);

    // Add the year label; the value is set on transition.
    var label = svg.append("text")
      .attr("class", "timeLabel")
      .attr("text-anchor", "end")
      .attr("y", height - 24)
      .attr("x", width)
      .call(dex.config.configureText, config.label)
      .text(timeExtents[0]);

    // Load the data.
    //d3.json("nations.json", function (nations) {

    // A bisector since many nation's data is sparsely-defined.
    var bisect = d3.bisector(function (d) {
      return d[0];
    });

    // Add a dot per nation. Initialize the data at min year value, and set the colors.
    var dot = svg.append("g")
      .attr("class", "dots")
      .selectAll(".dot")
      .data(interpolateData(timeExtents[0]))
      .enter().append("circle")
      .attr("class", "dot")
      .call(dex.config.configureCircle, config.circle)
      .call(position)
      .sort(order);

    // Add a title.
    dot.append("tooltip-content")
      .text(function (d) {
        //dex.console.log("DTITLE", d);
        return "<table>" +
          "<tr><td>Name:</td><td>" + d.name + "</td></tr>" +
          "<tr><td>Category:</td><td>" + d.color + "</td></tr>" +
          "<tr><td>Time:</td><td>" + d.time + "</td></tr>" +
          "<tr><td>X:</td><td>" + d.x + "</td></tr>" +
          "<tr><td>Y:</td><td>" + d.y + "</td></tr>" +
          "<tr><td>Size:</td><td>" + d.size + "</td></tr>" +
          "</table>";
      });

    // Add an overlay for the year label.
    var box = label.node().getBBox();

    var overlay = svg.append("rect")
      .attr("class", "overlay")
      .attr("x", box.x)
      .attr("y", box.y)
      .attr("width", box.width)
      .attr("height", box.height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .style("cursor", "ew-resize")
      .on("mouseover", enableInteraction);

    // Start a transition that interpolates the data based on year.
    svg.transition()
      .duration(config.duration)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);

    // Positions the dots based on data.
    function position(dot) {
      dot
        .attr("cx", function (d) {
          //dex.console.log("d=", d, "x(d)=" + x(d),
          //    "cx=xScale(x(d))=" + xScale(x(d)));
          return xScale(x(d));
        })
        .attr("cy", function (d) {
          //dex.console.log("d=", d, "y(d)=" + x(d),
          //  "cy=yScale(y(d))=" + yScale(y(d)));
          return yScale(y(d));
        })
        .attr("r", function (d) {
          //dex.console.log("d=", d, "radius(d)=" + radius(d),
          //    "r=radiusScale(radius(d))=" + radiusScale(radius(d)));
          return radiusScale(radius(d));
        });
      //.each(function (d) {
      //dex.console.log("circle.cx=" + xScale(x(d)) + ", cy=" + yScale(y(d)) +
      //", r=" + radiusScale(radius(d)));
      //});
    }

    // Defines a sort order so that the smallest dots are drawn on top.
    function order(a, b) {
      return radius(b) - radius(a);
    }

    // After the transition finishes, you can mouseover to change the year.
    function enableInteraction() {
      //dex.console.log("ENABLING INTERACTION");
      var yearScale = d3.scale.linear()
        .domain(timeExtents)
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

      // Cancel the current transition, if any.
      svg.transition().duration(0);

      overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

      function mouseover() {
        label.classed("active", true);
      }

      function mouseout() {
        label.classed("active", false);
      }

      function mousemove() {
        displayYear(yearScale.invert(d3.mouse(this)[0]));
      }
    }

    // Tweens the entire chart by first tweening the year, and then the data.
    // For the interpolated data, the dots and label are redrawn.
    function tweenYear() {
      var year = d3.interpolateNumber(timeExtents[0], timeExtents[1]);
      return function (t) {
        displayYear(year(t));
      };
    }

    // Updates the display to show the specified year.
    function displayYear(year) {
      //dex.console.log("key='" + key + "', interpolateData(" + year + ")=",
      //  interpolateData(year));
      dot.data(interpolateData(year), key).call(position).sort(order);
      label.text(Math.round(year));
    }

    // Interpolates the dataset for the given (fractional) year.
    function interpolateData(year) {
      var timeData = [];

      //
      for (var name in keyMap) {
        if (keyMap.hasOwnProperty(name)) {
          var entry = keyMap[name];

          //dex.console.log("ENTRY-DATA", entry);
          timeData.push({
            time  : year,
            name  : entry.name,
            color : entry.color,
            x     : interpolateValues(entry.x, year),
            y     : interpolateValues(entry.y, year),
            size  : interpolateValues(entry.size, year)
          });
        }
      }
      //dex.console.log("interpolateData(" + year + ")=", timeData);
      return timeData;
    }

    // Finds (and possibly interpolates) the value for the specified year.
    function interpolateValues(values, year) {
      //dex.console.log("VALUES", values);
      var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
      if (i > 0) {
        var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
        return a[1] * (1 - t) + b[1] * t;
      }
      return a[1];
    }
  };

  $(document).ready(function () {

    // Add tooltips
    $(document).tooltip({
      items   : "circle",
      content : function () {
        return $(this).find("tooltip-content").text();
      },
      track   : true
    });

    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
    //$(chart.config.parent).find("rect").draggable();
  });

  return chart;
};

module.exports = motionchart;
},{}],18:[function(require,module,exports){
var motioncirclechart = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var defaultColor = d3.scale.category10();

  var csv = {
    'header' : ['name', 'color', 'time', 'x', 'y', 'size'],
    'data'   : []
  }

  var i = 0;
  for (var time = 1800; time < 1810; time += 1) {
    for (var color = 1; color < 4; color++) {
      csv.data.push(["name-" + color, color, time,
                     i * color, i * i * color, i * i * i * color]);
    }
    i += 1;
  }

  var color = d3.scale.category20c();

  var defaults =
  {
    // The parent container of this chart.
    'parent' : null,
    // Set these when you need to CSS style components independently.
    'id'     : 'MotionCircleChart',
    'class'  : 'MotionCircleChart',
    // Our data...
    'csv'    : csv,

    // Tells us which columns represent what.
    'index'  : {
      'name'  : 0,
      'color' : 1,
      'time'  : 2,
      'y'     : 3
    },
    // Chart dimensions.
    'width'  : 600,
    'height' : 400,
    'margin' : {
      top    : 20,
      right  : 100,
      bottom : 100,
      left   : 100
    },

    'circle' : dex.config.circle({
      'fill.fillColor' : function (d, i) {
        return color(i);
      },
      'stroke.width'   : 1,
      'stroke.color'   : 'black',
      'events'         : {
        'mouseover' : function () {
          d3.select(this)
            .style("stroke", 'red')
            .style("stroke-width", 2);
        },
        'mouseout'  : function () {
          d3.select(this)
            .style("stroke", chart.config.circle.stroke.color)
            .style("stroke-width", chart.config.circle.stroke.width);
        }
      }
    }),

    // Main label configuration
    'label.font.size'        : 64,
    'label.fill.fillColor'   : 'steelblue',
    'label.fill.fillOpacity' : 0.4,
    'label.y'                : function (d) {
      return 0;
    },
    'label.x'                : function (d) {
      return chart.config.width * .5;
    },

    'transform' : 'translate(0,0)',
    'duration'  : 10000,

    'xaxis' : dex.config.axis({
      'scale.type'                : 'linear',
      'orient'                    : 'bottom',
      'label'                     : dex.config.text({
        'x'      : function (d) {
          return (chart.config.width - chart.config.margin.right) / 2;
        },
        'y'      : function (d) {
          return chart.config.height - chart.config.margin.bottom + 20;
        },
        'anchor' : 'end'
      }),
      'tick.stroke.color'         : 'black',
      'tick.stroke.width'         : 1,
      'tick.fill.fillColor'       : 'none',
      'axisLine.stroke.color'     : 'black',
      'axisLine.stroke.width'     : 1,
      'axisLine.stroke.dasharray' : "10 10",
      'axisLine.fill.fillColor'   : 'none'
    }),
    'yaxis' : dex.config.axis({
      'scale.type'                : 'linear',
      'orient'                    : 'left',
      'label'                     : dex.config.text({
        'x'         : function (d) {
          //return chart.config.width - chart.config.margin.right;
          //return chart.config.margin.top;
          return 0;
        },
        'y'         : function (d) {
          //return chart.config.height - chart.config.margin.top
          //  - chart.config.margin.bottom - chart.config.xaxis.label.font.size;
          //return -chart.config.margin.left/2;
          return 10;
        },
        'anchor'    : 'end',
        'dy'        : '.75em',
        'transform' : 'rotate(-90)'
      }),
      'tick.stroke.width'         : 1,
      'tick.fill.fillColor'       : 'none',
      'axisLine.stroke.color'     : 'black',
      'axisLine.stroke.width'     : 1,
      'axisLine.stroke.dasharray' : "10 10",
      'axisLine.fill.fillColor'   : 'none'
    })
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    window.onresize = this.resize;
    this.resize();
  };

  chart.resize = function resize() {
    d3 = dex.charts.d3.d3v3;
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart
      .attr("width", width)
      .attr("height", height)
      .update();
  };

  chart.update = function update() {
    d3 = dex.charts.d3.d3v3;
    var chart = this.chart;
    var config = this.config;
    var csv = config.csv;

    d3.selectAll('#' + config.id).remove();

    var keyMap = {};

    csv.data.forEach(function (row) {
      var curName = row[config.index.name];
      var curColor = row[config.index.color];
      var curTime = row[config.index.time];
      var curY = row[config.index.y];
      var curSize = +row[config.index.size];

      if (!keyMap[curName]) {
        keyMap[curName] = {
          'name'  : curName,
          'color' : curColor,
          'time'  : curTime,
          'y'     : [[curTime, curY]],
          'size'  : [[curTime, curSize]]
        };
      }
      else {
        keyMap[curName].y.push([curTime, curY]);
        keyMap[curName].size.push([curTime, curSize]);
      }
    });

    var uniques = dex.matrix.uniques(csv.data);

    var timeExtents = dex.matrix.extent(csv.data, [config.index.time]);
    //var xExtents = [0, uniques[config.index.name].length-1];
    var yExtents = dex.matrix.extent(csv.data, [config.index.y]);

    dex.console.log("EXTENTS: Y", yExtents, "UNIQUES", uniques[config.index.name]);

    var width = config.width - config.margin.right;
    var height = config.height - config.margin.top - config.margin.bottom;

    // Various scales. These domains make assumptions of data, naturally.
    var xScale = d3.scale.ordinal()
      .domain(uniques[config.index.name])
      .rangePoints([0, width]);

    //  d3.scale.linear().domain(xExtents).range([0, width - 60]);
    var yScale = dex.config.createScale(config.yaxis.scale)
      .domain([0, yExtents[1]]).range([height, 0]);

    // The x & y axes.
    var xAxis = dex.config.createAxis(config.xaxis)
      .scale(xScale);

    var yAxis = dex.config.createAxis(config.yaxis)
      .scale(yScale);

    var svg = d3.select(config.parent)
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    // Add the x-axis.
    svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the y-axis.
    svg.append("g")
      .attr("class", "yaxis")
      .call(yAxis);

    var xticks = svg.selectAll(".xaxis .tick");

    var xtickLines = xticks.selectAll("line")
      .call(dex.config.configureStroke, config.xaxis.tick.stroke)
      .call(dex.config.configureFill, config.xaxis.tick.fill);

    var yticks = svg.selectAll(".yaxis .tick");

    var yTickLines = yticks.selectAll("line")
      .call(dex.config.configureStroke, config.yaxis.tick.stroke)
      .call(dex.config.configureFill, config.yaxis.tick.fill);

    svg.selectAll(".xaxis path")
      .call(dex.config.configureStroke, config.xaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.xaxis.axisLine.fill);

    svg.selectAll(".yaxis path")
      .call(dex.config.configureStroke, config.yaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.yaxis.axisLine.fill);

    var xTickLabels = xticks.selectAll("text")
      .style("text-anchor", "start");

    // Add an x-axis label.
    svg.append("text")
      .attr("class", "xLabel")
      .call(dex.config.configureText, config.xaxis.label)
      .text(config.csv.header[config.index.name]);

    // Add a y-axis label.
    svg.append("text")
      .attr("class", "yLabel")
      .call(dex.config.configureText, config.yaxis.label)
      .text(config.csv.header[config.index.y]);

    // Add the year label; the value is set on transition.
    var label = svg.append("text")
      .attr("class", "timeLabel")
      .attr("text-anchor", "end")
      .call(dex.config.configureText, config.label)
      .text(timeExtents[0]);

    // Load the data.
    //d3.json("nations.json", function (nations) {

    // A bisector since many nation's data is sparsely-defined.
    var bisect = d3.bisector(function (d) {
      return d[0];
    });

    // Add a dot per nation. Initialize the data at min year value, and set the colors.
    var circles = svg.append("g")
      .attr("class", "circles")
      .selectAll(".circle")
      .data(interpolateData(timeExtents[0]))
      .enter().append("circle")
      .attr("class", "circle")
      .call(dex.config.configureCircle, config.circle)
      .call(position);
    //.sort(order);

    // Add a title.
    circles
      .append("tooltip-content")
      .text(function (d, i) {
        //dex.console.log("DTITLE", d);
        return "<table>" +
          "<tr><td>Name:</td><td>" + d.name + "</td></tr>" +
          "<tr><td>Category:</td><td>" + d.color + "</td></tr>" +
          "</table>";
      });

    // Add an overlay for the year label.
    var box = label.node().getBBox();

    var overlay = svg.append("rect")
      .attr("class", "overlay")
      .attr("x", box.x)
      .attr("y", box.y)
      .attr("width", box.width)
      .attr("height", box.height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .style("cursor", "ew-resize")
      .on("mouseover", enableInteraction);

    // Start a transition that interpolates the data based on year.
    svg.transition()
      .duration(config.duration)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);

    // Positions the dots based on data.
    function position(circle) {
      //var circleRadius = Math.floor((config.width - config.margin.left - config.margin.right) / circle.size());
      //var circleRadius = chart.config.circle.r;
      var circleRadius = 10;

      circle
        .attr("cx", function (d, i) {
          return xScale(d.name);
        })
        .attr("cy", function (d) {
          return yScale(d.y);
        })
        .attr("r", function (d) {
          return 10;
          //return circleRadius;
        });
    }

    // Defines a sort order so that the smallest dots are drawn on top.
    //function order(a, b) {
    //  return b.y - a.y;
    // }

    // After the transition finishes, you can mouseover to change the year.
    function enableInteraction() {
      //dex.console.log("ENABLING INTERACTION");
      var yearScale = d3.scale.linear()
        .domain(timeExtents)
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

      // Cancel the current transition, if any.
      svg.transition().duration(0);

      overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

      function mouseover() {
        label.classed("active", true);
      }

      function mouseout() {
        label.classed("active", false);
      }

      function mousemove() {
        displayYear(yearScale.invert(d3.mouse(this)[0]));
      }
    }

    // Tweens the entire chart by first tweening the year, and then the data.
    // For the interpolated data, the dots and label are redrawn.
    function tweenYear() {
      var year = d3.interpolateNumber(timeExtents[0], timeExtents[1]);
      return function (t) {
        displayYear(year(t));
      };
    }

    // Updates the display to show the specified year.
    function displayYear(year) {
      //dex.console.log("key='" + key + "', interpolateData(" + year + ")=",
      //  interpolateData(year));
      circles.data(interpolateData(year), function (d) {
        return d.name;
      }).call(position);//.sort(order);
      label.text(Math.round(year));
    }

    // Interpolates the dataset for the given (fractional) year.
    function interpolateData(year) {
      var timeData = [];

      //
      for (var name in keyMap) {
        if (keyMap.hasOwnProperty(name)) {
          var entry = keyMap[name];

          //dex.console.log("ENTRY-DATA", entry);
          timeData.push({
            time  : year,
            name  : entry.name,
            color : entry.color,
            y     : interpolateValues(entry.y, year),
            size  : interpolateValues(entry.size, year)
          });
        }
      }
      //dex.console.log("interpolateData(" + year + ")=", timeData);
      return timeData;
    }

    // Finds (and possibly interpolates) the value for the specified year.
    function interpolateValues(values, year) {
      //dex.console.log("VALUES", values);
      var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
      if (i > 0) {
        var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
        return a[1] * (1 - t) + b[1] * t;
      }
      return a[1];
    }
  };

  $(document).ready(function () {

    // Add tooltips
    $(chart.config.parent).tooltip({
      items   : "rect",
      content : function () {
        return $(this).find("tooltip-content").text();
      },
      track   : true
    });

    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
    $(chart.config.parent).find("rect").draggable();
  });

  return chart;
};

module.exports = motioncirclechart;
},{}],19:[function(require,module,exports){
var motionlinechart = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var defaultColor = d3.scale.category10();

  var csv = {
    'header' : ['name', 'color', 'time', 'x', 'y', 'size'],
    'data'   : []
  }

  var i = 0;
  for (var time = 1800; time < 1810; time += 1) {
    for (var color = 1; color < 4; color++) {
      csv.data.push(["name-" + color, color, time,
                     i * color, i * i * color, i * i * i * color]);
    }
    i += 1;
  }

  var color = d3.scale.category20c();

  var defaults =
  {
    // The parent container of this chart.
    'parent' : null,
    // Set these when you need to CSS style components independently.
    'id'     : 'MotionLineChart',
    'class'  : 'MotionLineChart',
    // Our data...
    'csv'    : csv,

    // Tells us which columns represent what.
    'index'  : {
      'name'  : 0,
      'color' : 1,
      'time'  : 2,
      'y'     : 4
    },
    // Chart dimensions.
    'width'  : 600,
    'height' : 400,
    'margin' : {
      top    : 20,
      right  : 100,
      bottom : 100,
      left   : 100
    },

    'circle'                 : dex.config.path({
      'fill.fillColor' : function (d, i) {
        return color(i);
      },
      'stroke.width'   : 1,
      'stroke.color'   : 'black',
      'events'         : {
        'mouseover' : function () {
          d3.select(this)
            .style("stroke", 'red')
            .style("stroke-width", 2);
        },
        'mouseout'  : function () {
          d3.select(this)
            .style("stroke", chart.config.circle.stroke.color)
            .style("stroke-width", chart.config.circle.stroke.width);
        }
      }
    }),
    'line'                   : dex.config.line({
      'stroke.color'   : 'black',
      'stroke.width'   : 1,
      'fill.fillColor' : 'none',
      'fill.opacity'   : 0,
      //'interpolate'    : 'linear'
      //'interpolate'    : 'linear-closed'
      //'interpolate'    : 'step-before'
      //'interpolate'    : 'basis'
      //'interpolate'    : 'basis-open'
      //'interpolate'    : 'basis-closed'
      //'interpolate'    : 'bundle'
      'interpolate'    : 'cardinal'
      //'interpolate'    : 'cardinal-open'
      //'interpolate'    : 'cardinal-closed'
      //'interpolate'    : 'monotone'
    }),
    // Main label configuration
    'label.font.size'        : 64,
    'label.fill.fillColor'   : 'steelblue',
    'label.fill.fillOpacity' : 0.4,
    'label.y'                : function (d) {
      return chart.config.height * .1;
    },
    'label.x'                : function (d) {
      return chart.config.width * .5;
    },

    'transform' : 'translate(0,0)',
    'duration'  : 10000,

    'xaxis' : dex.config.axis({
      'scale.type'                : 'linear',
      'orient'                    : 'bottom',
      'label': dex.config.text({
        'anchor': 'middle',
        'writingMode' : 'lr',
        'dx' : 0,
        'dy' : '1.5em'
      }),
      'title': dex.config.text({
        'anchor' : 'middle',
        'font.size' : '16',
        'x': function (d) {
          return (chart.config.width - chart.config.margin.left) / 2; },
        'y': function(d) {
          return chart.config.height - chart.config.margin.bottom - 12;
        }
      }),
      'tick.stroke.color'         : 'black',
      'tick.stroke.width'         : 1,
      'tick.fill.fillColor'       : 'none',
      'axisLine.stroke.color'     : 'black',
      'axisLine.stroke.width'     : 1,
      'axisLine.stroke.dasharray' : "10 10",
      'axisLine.fill.fillColor'   : 'none'
    }),
    'yaxis' : dex.config.axis({
      'scale.type'                : 'linear',
      'orient'                    : 'left',
      'label': dex.config.text({
        'anchor': 'middle',
        'writingMode' : 'tb',
        'dx' : '-1em',
        'dy' : '-.5em'
      }),
      'title': dex.config.text({
        'anchor' : 'start',
        'writingMode' : 'tb',
        //'transform' : 'rotate(90)',
        'font.size' : '16',
        'x': function (d) { return 0; },
        'dx' : '1em',
        'y': function(d) {
          return config.margin.top;
        },
        'dy' : '2em'
      }),
      'tick.stroke.width'         : 1,
      'tick.fill.fillColor'       : 'none',
      'axisLine.stroke.color'     : 'black',
      'axisLine.stroke.width'     : 1,
      'axisLine.stroke.dasharray' : "10 10",
      'axisLine.fill.fillColor'   : 'none'
    })
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    window.onresize = this.resize;
    this.resize();
  };

  chart.resize = function resize() {
    d3 = dex.charts.d3.d3v3;
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart
      .attr("width", width)
      .attr("height", height)
      .update();
  };

  chart.update = function update() {
    d3 = dex.charts.d3.d3v3;
    // If we need to call super:
    //DexComponent.prototype.update.call(this);
    var chart = this.chart;
    var config = this.config;
    var csv = config.csv;

    d3.selectAll('#' + config.id).remove();

    var keyMap = {};

    csv.data.forEach(function (row) {
      var curName = row[config.index.name];
      var curColor = row[config.index.color];
      var curTime = row[config.index.time];
      var curY = row[config.index.y];
      var curSize = +row[config.index.size];

      if (!keyMap[curName]) {
        keyMap[curName] = {
          'name'  : curName,
          'color' : curColor,
          'time'  : curTime,
          'y'     : [[curTime, curY]],
          'size'  : [[curTime, curSize]]
        };
      }
      else {
        keyMap[curName].y.push([curTime, curY]);
        keyMap[curName].size.push([curTime, curSize]);
      }
    });

    var uniques = dex.matrix.uniques(csv.data);

    var timeExtents = dex.matrix.extent(csv.data, [config.index.time]);
    //var xExtents = [0, uniques[config.index.name].length-1];
    var yExtents = dex.matrix.extent(csv.data, [config.index.y]);

    dex.console.log("EXTENTS: Y", yExtents, "UNIQUES", uniques[config.index.name]);

    var width = config.width - config.margin.right;
    var height = config.height - config.margin.top - config.margin.bottom;

    // Various scales. These domains make assumptions of data, naturally.
    var xScale = d3.scale.ordinal()
      .domain(uniques[config.index.name])
      .rangePoints([0, width]);

    //  d3.scale.linear().domain(xExtents).range([0, width - 60]);
    var yScale = dex.config.createScale(config.yaxis.scale)
      .domain([0, yExtents[1]]).range([height, 0]);

    // The x & y axes.
    var xAxis = dex.config.createAxis(config.xaxis)
      .scale(xScale);

    var yAxis = dex.config.createAxis(config.yaxis)
      .scale(yScale);

    var svg = d3.select(config.parent)
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    // Add the x-axis.
    svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the y-axis.
    svg.append("g")
      .attr("class", "yaxis")
      .call(yAxis);

    var xticks = svg.selectAll(".xaxis .tick");

    xticks.selectAll("line")
      .call(dex.config.configureStroke, config.xaxis.tick.stroke)
      .call(dex.config.configureFill, config.xaxis.tick.fill);

    var yticks = svg.selectAll(".yaxis .tick");

    yticks.selectAll("line")
      .call(dex.config.configureStroke, config.yaxis.tick.stroke)
      .call(dex.config.configureFill, config.yaxis.tick.fill);

    svg.selectAll(".xaxis path")
      .call(dex.config.configureStroke, config.xaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.xaxis.axisLine.fill);

    svg.selectAll(".yaxis path")
      .call(dex.config.configureStroke, config.yaxis.axisLine.stroke)
      .call(dex.config.configureFill, config.yaxis.axisLine.fill);

    xticks.selectAll("text")
      .call(dex.config.configureText, config.xaxis.label);

    yticks.selectAll("text")
      .call(dex.config.configureText, config.yaxis.label);

    // Add an x-axis label.
    svg.append("text")
      .attr("class", "xLabel")
      .call(dex.config.configureText, config.xaxis.title)
      .text(config.csv.header[config.index.name]);

    // Add a y-axis label.
    svg.append("text")
      .attr("class", "yLabel")
      .call(dex.config.configureText, config.yaxis.title)
      .text(config.csv.header[config.index.y]);

    // Add the year label; the value is set on transition.
    var label = svg.append("text")
      .attr("class", "timeLabel")
      .attr("text-anchor", "end")
      .attr("y", height - 24)
      .attr("x", width)
      .call(dex.config.configureText, config.label)
      .text(timeExtents[0]);

    // Load the data.
    //d3.json("nations.json", function (nations) {

    // A bisector since many nation's data is sparsely-defined.
    var bisect = d3.bisector(function (d) {
      return d[0];
    });

    var initialData = interpolateData(timeExtents[0]);

    // Add a dot per nation. Initialize the data at min year value, and set the colors.
    var circles = svg.append("g")
      .attr("class", "circles")
      .selectAll(".circle")
      .data(initialData)
      .enter().append("circle")
      .attr("class", "circle")
      .call(dex.config.configureCircle, config.circle)
      .call(position);
    //.sort(order);

    dex.console.log("INITIAL DATA:", initialData);

    var d3line = d3.svg.line();
    dex.config.configureLine(d3line, config.line);

    d3line
      .x(function (d, i) {
        return xScale(d.name);
      })
      .y(function (d, i) {
        return yScale(d.y)
      });

    var line = svg.selectAll('path.dataline')
      .data([initialData])
      .enter()
      .append("svg:path")
      .attr("d", d3line);
      //.call(dex.config.configureLine, config.line);

    dex.console.log("LINE: ", line);

    // Add a title.
    circles
      .append("tooltip-content")
      .text(function (d, i) {
        //dex.console.log("DTITLE", d);
        return "<table>" +
          "<tr><td>Name:</td><td>" + d.name + "</td></tr>" +
          "<tr><td>Category:</td><td>" + d.color + "</td></tr>" +
          "</table>";
      });

    // Add an overlay for the year label.
    var box = label.node().getBBox();

    var overlay = svg.append("rect")
      .attr("class", "overlay")
      .attr("x", box.x)
      .attr("y", box.y)
      .attr("width", box.width)
      .attr("height", box.height)
      .attr("fill", "none")
      .style("pointer-events", "all")
      .style("cursor", "ew-resize")
      .on("mouseover", enableInteraction);

    // Start a transition that interpolates the data based on year.
    svg.transition()
      .duration(config.duration)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);

    // After the transition finishes, you can mouseover to change the year.
    function enableInteraction() {
      //dex.console.log("ENABLING INTERACTION");
      var yearScale = d3.scale.linear()
        .domain(timeExtents)
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

      // Cancel the current transition, if any.
      svg.transition().duration(0);

      overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

      function mouseover() {
        label.classed("active", true);
      }

      function mouseout() {
        label.classed("active", false);
      }

      function mousemove() {
        displayYear(yearScale.invert(d3.mouse(this)[0]));
      }
    }

    // Tweens the entire chart by first tweening the year, and then the data.
    // For the interpolated data, the dots and label are redrawn.
    function tweenYear() {
      var year = d3.interpolateNumber(timeExtents[0], timeExtents[1]);
      return function (t) {
        displayYear(year(t));
      };
    }

    // Positions the dots based on data.
    function position(circle) {
      //var circleRadius = Math.floor((config.width - config.margin.left - config.margin.right) / circle.size());
      //var circleRadius = chart.config.circle.r;
      var circleRadius = 10;

      circle
        .attr("cx", function (d, i) {
          return xScale(d.name);
        })
        .attr("cy", function (d) {
          return yScale(d.y);
        })
        .attr("r", function (d) {
          return 10;
          //return circleRadius;
        });
    }

    // Defines a sort order so that the smallest dots are drawn on top.
    //function order(a, b) {
    //  return b.y - a.y;
    // }

    // Updates the display to show the specified year.
    function displayYear(year) {
      //dex.console.log("key='" + key + "', interpolateData(" + year + ")=",
      //  interpolateData(year));
      var yearData = interpolateData(year);
      circles.data(yearData, function (d) {
        return d.name;
      }).call(position);//.sort(order);
      label.text(Math.round(year));

      line.data([yearData])
        .attr("d", d3line)
        .call(dex.config.configurePath, config.line);

//        .attr("x", function (d) {
//          return xScale(d.name);
//        })
//        .attr("y", function (d) {
//          dex.console.log("Y:" + yScale(d.y));
//          return yScale(d.y)
//        });
      //.call(positionLine);
    }

    // Interpolates the dataset for the given (fractional) year.
    function interpolateData(year) {
      var timeData = [];

      //
      for (var name in keyMap) {
        if (keyMap.hasOwnProperty(name)) {
          var entry = keyMap[name];

          //dex.console.log("ENTRY-DATA", entry);
          timeData.push({
            time  : year,
            name  : entry.name,
            color : entry.color,
            y     : interpolateValues(entry.y, year),
            size  : interpolateValues(entry.size, year)
          });
        }
      }
      //dex.console.log("interpolateData(" + year + ")=", timeData);
      return timeData;
    }

    // Finds (and possibly interpolates) the value for the specified year.
    function interpolateValues(values, year) {
      //dex.console.log("VALUES", values);
      var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
      if (i > 0) {
        var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
        return a[1] * (1 - t) + b[1] * t;
      }
      return a[1];
    }
  }
  ;

  $(document).ready(function () {

    // Add tooltips
    $(chart.config.parent).tooltip({
      items   : "rect",
      content : function () {
        return $(this).find("tooltip-content").text();
      },
      track   : true
    });

    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
    $(chart.config.parent).find("rect").draggable();
  });

  return chart;
};

module.exports = motionlinechart;
},{}],20:[function(require,module,exports){
var orbitallayout = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent': '#ChordDiagram',
    // Set these when you need to CSS style components independently.
    'id': 'Chord',
    'class': 'Chord',
    'resizable': true,
    // Our data...
    'csv': {
      // Give folks without data something to look at anyhow.
      'header': ["X", "Y", "Z"],
      'data': [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'width': "100%",
    'height': "100%",
    'transform': "translate(0 0)",
    'title': dex.config.text(),
    'label': dex.config.text(),
    'circles': dex.config.circle(),
    'orbits': dex.config.circle({
      'r': 5,
      'fill': {
        'fillColor': 'none',
        'fillOpacity': 1
      },
      'stroke': dex.config.stroke({
        'width': 1,
        'color': 'green',
        'opacity': .5,
        'dasharray': "2 2"
      })
    }),
    'refreshFrequencyMs' :50,
    'tickRadianStep' : 0.004363323129985824
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    d3 = dex.charts.d3.d3v3;
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function () {
    d3 = dex.charts.d3.d3v3;
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll("#" + config.id).remove();
    var data = dex.csv.toNestedJson(dex.csv.copy(csv));

    d3.layout.orbit = function () {
      var currentTickStep = 0;
      var orbitNodes;
      var orbitSize = [1, 1];
      var nestedNodes;
      var flattenedNodes = [];
      var orbitDispatch = d3.dispatch('tick');
      var tickInterval;
      var tickRadianStep = config.tickRadianStep;
      var orbitalRings = [];
      var orbitDepthAdjust = function () {
        return 2.95
      };
      var childrenAccessor = function (d) {
        return d.children
      };
      var tickRadianFunction = function () {
        return 1
      };

      function _orbitLayout() {

        return _orbitLayout;
      }

      _orbitLayout.mode = function () {
        //Atomic, Solar, other?
      }

      _orbitLayout.start = function () {
        //activate animation here
        tickInterval = setInterval(
          function () {
            currentTickStep++;
            flattenedNodes.forEach(function (_node) {
              if (_node.parent) {
                _node.x = _node.parent.x + ( (_node.parent.ring / 2) * Math.sin(_node.angle + (currentTickStep *
                    config.tickRadianStep * tickRadianFunction(_node))) );
                _node.y = _node.parent.y + ( (_node.parent.ring / 2) * Math.cos(_node.angle + (currentTickStep *
                    config.tickRadianStep * tickRadianFunction(_node))) );
              }
            })
            orbitalRings.forEach(function (_ring) {
              _ring.x = _ring.source.x;
              _ring.y = _ring.source.y;
            })
            orbitDispatch.tick();
          },
          config.refreshFrequencyMs);
      }

      _orbitLayout.stop = function () {
        //deactivate animation here
        clearInterval(tickInterval);
      }

      _orbitLayout.speed = function (_degrees) {
        if (!arguments.length) return tickRadianStep / (Math.PI / 360);
        tickRadianStep = tickRadianStep = _degrees * (Math.PI / 360);
        return this;
      }

      _orbitLayout.size = function (_value) {
        if (!arguments.length) return orbitSize;
        orbitSize = _value;
        return this;
        //change size here
      }

      _orbitLayout.revolution = function (_function) {
        //change ring size reduction (make that into dynamic function)
        if (!arguments.length) return tickRadianFunction;
        tickRadianFunction = _function;
        return this
      }

      _orbitLayout.orbitSize = function (_function) {
        //change ring size reduction (make that into dynamic function)
        if (!arguments.length) return orbitDepthAdjust;
        orbitDepthAdjust = _function;
        return this
      }

      _orbitLayout.orbitalRings = function () {
        //return an array of data corresponding to orbital rings
        if (!arguments.length) return orbitalRings;
        return this;
      }

      _orbitLayout.nodes = function (_data) {
        if (!arguments.length) return flattenedNodes;
        nestedNodes = _data;
        calculateNodes();
        return this;
      }

      _orbitLayout.children = function (_function) {
        if (!arguments.length) return childrenAccessor;

        //Probably should use d3.functor to turn a string into an object key
        childrenAccessor = _function;
        return this;


      }

      d3.rebind(_orbitLayout, orbitDispatch, "on");

      return _orbitLayout;
      function calculateNodes() {
        var _data = nestedNodes;
        //If you have an array of elements, then create a root node (center)
        //In the future, maybe make a binary star kind of thing?
        if (!childrenAccessor(_data)) {
          orbitNodes = {key: "root", values: _data}
          childrenAccessor(orbitNodes).forEach(function (_node) {
            _node.parent = orbitNodes;
          })
        }
        //otherwise assume it is an object with a root node
        else {
          orbitNodes = _data;
        }
        orbitNodes.x = orbitSize[0] / 2;
        orbitNodes.y = orbitSize[1] / 2;
        orbitNodes.deltaX = function (_x) {
          return _x
        }
        orbitNodes.deltaY = function (_y) {
          return _y
        }
        orbitNodes.ring = orbitSize[0] / 2;
        orbitNodes.depth = 0;

        flattenedNodes.push(orbitNodes);

        traverseNestedData(orbitNodes)

        function traverseNestedData(_node) {
          if (childrenAccessor(_node)) {
            var thisPie = d3.layout.pie().value(function (d) {
              return childrenAccessor(d) ? 4 : 1
            });
            var piedValues = thisPie(childrenAccessor(_node));

            orbitalRings.push({source: _node, x: _node.x, y: _node.y, r: _node.ring / 2});

            for (var x = 0; x < childrenAccessor(_node).length; x++) {

              childrenAccessor(_node)[x].angle = ((piedValues[x].endAngle - piedValues[x].startAngle) / 2) + piedValues[x].startAngle;

              childrenAccessor(_node)[x].parent = _node;
              childrenAccessor(_node)[x].depth = _node.depth + 1;

              childrenAccessor(_node)[x].x = childrenAccessor(_node)[x].parent.x + ( (childrenAccessor(_node)[x].parent.ring / 2) * Math.sin(childrenAccessor(_node)[x].angle) );
              childrenAccessor(_node)[x].y = childrenAccessor(_node)[x].parent.y + ( (childrenAccessor(_node)[x].parent.ring / 2) * Math.cos(childrenAccessor(_node)[x].angle) );

              childrenAccessor(_node)[x].deltaX = function (_x) {
                return _x
              }
              childrenAccessor(_node)[x].deltaY = function (_y) {
                return _y
              }
              childrenAccessor(_node)[x].ring = childrenAccessor(_node)[x].parent.ring / orbitDepthAdjust(_node);

              flattenedNodes.push(childrenAccessor(_node)[x]);
              traverseNestedData(childrenAccessor(_node)[x]);
            }
          }
        }
      }

    }

    //down with category20a()!!
    colors = d3.scale.category20();

    orbitScale = d3.scale.linear().domain([1, 3]).range([3.8, 1.5]).clamp(true);
    radiusScale = d3.scale.linear().domain([0, 1, 2, 3]).range([20, 10, 3, 1]).clamp(true);

    var minSize = Math.min(config.width, config.height);

    orbit = d3.layout.orbit().size([minSize, minSize])
      .children(function (d) {
        return d.children
      })
      .revolution(function (d) {
        return d.depth
      })
      .orbitSize(function (d) {
        return orbitScale(d.depth)
      })
      .speed(.1)
      .nodes(data);

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    chartContainer.selectAll("g.node").data(orbit.nodes())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")"
      })
      .on("mouseover", nodeOver)
      .on("mouseout", nodeOut)

    var circles = d3.selectAll("g.node")
      .append("circle");

    circles.call(dex.config.configureCircle, config.circles);
    circles.attr("r", function (d) {
        return radiusScale(d.depth)
      })
      .style("fill", function (d) {
        return colors(d.depth)
      });

    chartContainer.selectAll("circle.orbits")
      .data(orbit.orbitalRings())
      .enter()
      .insert("circle", "g")
      .call(dex.config.configureCircle, config.orbits)
      .attr("class", "ring")
      .attr("r", function (d) {
        return d.r
      })
      .attr("cx", function (d) {
        return d.x
      })
      .attr("cy", function (d) {
        return d.y
      });

    orbit.on("tick", function () {
      d3.selectAll("g.node")
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")"
        });

      d3.selectAll("circle.ring")
        .attr("cx", function (d) {
          return d.x
        })
        .attr("cy", function (d) {
          return d.y
        });
    });

    orbit.start();

    function nodeOver(d) {
      orbit.stop();
      d3.select(this).append("text").text(d.name).style("text-anchor", "middle").attr("y", 35);
      d3.select(this).select("circle").style("stroke", "black").style("stroke-width", 3);
    }

    function nodeOut() {
      orbit.start();
      //d3.selectAll("text").remove();
      d3.selectAll("g.node > circle").style("stroke", "none").style("stroke-width", 0);
    }
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = orbitallayout;
},{}],21:[function(require,module,exports){
var parallelcoordinates = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var chart;

  defaults =
  {
    'id': "ParallelCoordinates",
    'class': "ParallelCoordinates",
    'parent': null,
    'width': "100%",
    'height': "100%",
    'resizable': true,
    'color': d3.scale.category20(),
    'title': 'Parallel Coordinates',
    'csv': {
      'header': ["X", "Y"],
      'data': [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    'rows': 0,
    //'transform'       : function (d) {
    //  return 'scale(.95, .95) translate(50, 50)'
    //},
    'normalize': false,
    'margin': {
      'left': 80,
      'right': 60,
      'top': 60,
      'bottom': 20
    },
    'axis': {
      'orient': 'left'
    },
    'axis.line': dex.config.line({
      'stroke': dex.config.stroke(
        {
          'color': function (d, i) {
            return "black";
          },
          'width': 1
        }),
      'fill': {
        'fillColor': "none",
        'fillOpacity': 1.0
      }
    }),
    'axis.label': dex.config.text({
      'font': {
        'size': function (d, i) {
          var uniques = _.uniq(_.flatten(dex.matrix.slice(chart.config.csv.data, [i])));

          var maxLabelLength =
            Math.min(("" + _.max(uniques,
              function (item) {
                return ("" + item).length;
              })).length, 40);

          // No need to adjust margins, initial transform already did.
          var maxFontSizeByHeight =
            ((chart.config.height) /
            (uniques.length ? uniques.length : 1) - 2);

          var maxFontSizeByWidth =
            (((chart.config.width) /
            (chart.config.csv.header.length - 1)) / maxLabelLength);

          //dex.console.log("AXIS-FONT-SIZE: I: " + i + ", MAX-HEIGHT: " + maxFontSizeByHeight +
          //", MAX-WIDTH: " + maxFontSizeByWidth + ", MAX-LABEL-LENGTH: " + maxLabelLength);
          return Math.min(Math.max(Math.min(maxFontSizeByWidth, maxFontSizeByHeight), 4), 18);
        }
      },
      'anchor': function (d, i) {
        if (i < chart.config.csv.header.length - 1) {
          return 'end';
        }
        else {
          return 'start';
        }
      },
      'dx': function (d, i) {
        return -1 * Math.max(chart.config.axis.label.font.size(d, i) / 2, 8);
      },
      'dy': ".35em",
      'fill.fillColor': 'black',
      'fill.fillOpacity': 1,
      'events': {
        'mouseover': function (d, i) {
          d3.select(this)
            .style('fill', 'red')
            .style('fill-opacity', 1);
        },
        'mouseout': function (d, i) {
          d3.select(this)
            .style('fill', 'black')
            .style('fill-opacity', 1);
        }
      }
    }),
    'verticalLabel': dex.config.text({
      // If you want to stagger labels.
      'dy': function (d, i) {
        return (i % 2) ?
        -chart.config.margin.top * .60 :
        -chart.config.margin.top * .20;
      },
      'font.size': function (d) {
        var maxFontSizeByHeight =
          chart.config.margin.top * .5;
        var maxFontSizeByWidth =
          (chart.config.width - chart.config.margin.left - chart.config.margin.right) /
          (chart.config.csv.header.length) / 10;
        //dex.console.log("TITLE-FONT-SIZE: MAX-HEIGHT: " + maxFontSizeByHeight +
        //", MAX-WIDTH: " + maxFontSizeByWidth);
        return Math.max(Math.min(maxFontSizeByWidth, maxFontSizeByHeight), 4);
      },
      'anchor': 'middle',
      'text': function (d) {
        return d;
      },
      'events': {
        'mouseover': function (d) {
          //dex.console.log("Mouseover detected...");
        }
      }
    }),
    'selected.link': {
      'stroke': dex.config.stroke(
        {
          'color': function (d, i) {
            return chart.config.color(i);
          },
          'width': 3
        }),
      'fill': {
        'fillColor': "none",
        'fillOpacity': .9
      },
      'events': {
        'mouseover': function () {
          d3.select(this)
            .style("stroke-width", chart.config.selected.link.stroke.width +
              Math.max(4, (chart.config.selected.link.stroke.width / 3)))
            .style("stroke-opacity", chart.config.selected.link.stroke.opacity);
        },
        'mouseout': function () {
          d3.select(this)
            .style("stroke-width", chart.config.selected.link.stroke.width)
            .style("stroke-opacity", chart.config.selected.link.stroke.opacity);
        }
      }
    },
    'unselected.link': {
      'stroke': dex.config.stroke(
        {
          'color': function (d, i) {
            return chart.config.color(i);
          },
          'width': .8,
          //'dasharray': "10 10"
        }),
      'fill': {
        'fillColor': "none",
        'fillOpacity': 0.1
      }
    },
    'brush': {
      'width': 12,
      'x': -6,
      'opacity': .8,
      'color': "steelblue",
      'stroke': dex.config.stroke({'color': "black", 'width': 1})
    }
  };

  chart = new dex.component(userConfig, defaults);
  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    d3 = dex.charts.d3.d3v3;
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      chart
        .attr("width", width - chart.config.margin.left - chart.config.margin.right)
        .attr("height", height - chart.config.margin.top - chart.config.margin.bottom)
        .attr("transform", "translate(" + chart.config.margin.left + "," +
          chart.config.margin.top + ")")
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    d3 = dex.charts.d3.d3v3;
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll(chart.config.parent).selectAll('*').remove();

    var numericColumns =
      dex.csv.getNumericColumnNames(csv);

    var jsonData = dex.csv.toJson(csv);

    var x = d3.scale.ordinal()
      .rangePoints([0, config.width], 1);

    var y = {};

    var line = d3.svg.line();

    // Holds unselected paths.
    var background;
    // Holds selected paths.
    var foreground;
    // Will hold our column names.
    var dimensions;
    var key;

    //dex.console.log("TRANSFORM:", config.transform, "HEIGHT: ", config.height, "WIDTH:", config.width);
    var chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      //.attr("width", config.width)
      //.attr("height", config.height)
      .attr("transform", config.transform);

    // Extract the list of dimensions and create a scale for each.
    //x.domain(dimensions = d3.keys(cars[0]).filter(function(d)
    //{
    //  return d != "name" && (y[d] = d3.scale.linear()
    //    .domain(d3.extent(cars, function(p) { return +p[d]; }))
    //    .range([height, 0]));
    //}));
    var allExtents = []

    numericColumns.forEach(function (d) {
      allExtents = allExtents.concat(d3.extent(jsonData, function (p) {
        return +p[d];
      }));
    });

    var normalizedExtent = d3.extent(allExtents);

    // REM: Figure out how to switch over to consistent extents.  Snapping.
    x.domain(dimensions = d3.keys(jsonData[0]).filter(function (d) {
      if (d === "name") return false;

      if (dex.object.contains(numericColumns, d)) {
        var extent = d3.extent(jsonData, function (p) {
          return +p[d];
        });
        if (config.normalize) {
          extent = normalizedExtent;
        }

        y[d] = d3.scale.linear()
          .domain(extent)
          .range([config.height, 0]);
        allExtents.concat(extent);
      }
      else {
        y[d] = d3.scale.ordinal()
          .domain(jsonData.map(function (p) {
            return p[d];
          }))
          .rangePoints([config.height, 0]);
      }

      return true;
    }));

    // Add grey background lines for context.
    background = chartContainer.append("g")
      .attr("class", "background")
      .selectAll("path")
      .data(jsonData)
      .enter().append("path")
      .call(dex.config.configureLink, config.unselected.link)
      .attr("d", path)
      .attr("id", "fillpath");

    foreground = chartContainer.append("g")
      .selectAll("path")
      .data(jsonData)
      .enter().append("path")
      .attr("d", path)
      .call(dex.config.configureLink, config.selected.link);

    foreground
      .append("tooltip-content").text(function (d, i) {
      var info = "<table border=\"1\">";
      for (key in jsonData[i]) {
        info += "<tr><td><b><i>" + key + "</i></b></td><td>" + jsonData[i][key] + "</td></tr>"
      }
      return info + "</table>";
    });
//      .on("mouseover", function () {
//        d3.select(this)
//          .style("stroke-width", config.selected.link.stroke.width +
//          Math.max(4, (config.selected.link.stroke.width / 3)))
//          .style("stroke-opacity", config.selected.link.stroke.opacity);
//      })
//      .on("mouseout", function () {
//        d3.select(this)
//          .style("stroke-width", config.selected.link.stroke.width)
//          .style("stroke-opacity", config.selected.link.stroke.opacity);
//      });

    // Add a group element for each dimension.
    var g = chartContainer.selectAll(".dimension")
      .data(dimensions)
      .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function (d) {
        return "translate(" + x(d) + ")";
      });

    // Add an axis and title.
    g.append("g")
      .attr("class", "axis")
      .each(function (d, i) {

        var axisScale = dex.config.createScale(dex.config.scale(config.axis.scale));
        var axis = d3.svg.axis()
          .scale(axisScale);

        var myConfig = dex.object.clone(config.axis);
        // If the last label, turn it to the right.
        if (i == config.csv.header.length - 1) {
          myConfig.orient = 'right';
          myConfig.label.dx = function (d, i) {
            return Math.max(chart.config.axis.label.font.size(d, i) / 2, 8);
          }
        }
        // Configure and apply the axis.
        dex.config.configureAxis(axis, myConfig, i);
        d3.select(this).call(axis.scale(y[d]));

        // Now that the axis has rendered, adjust the tick labels based on our spec.
        var tickLabels = d3.select(this)
          .selectAll('.tick')
          .selectAll("text")
          .call(dex.config.configureText, myConfig.label, i);
      })
      .append("text")
      .call(dex.config.configureText, config.verticalLabel);

    // Add and store a brush for each axis.
    g.append("g")
      .attr("class", "brush")
      .each(function (d) {
        d3.select(this).call(y[d].brush =
          d3.svg.brush().y(y[d])
            .on("brush", brush)
            .on("brushend", brushend));
      })
      .selectAll("rect")
      .call(dex.config.configureRectangle, config.brush);

    // Configure the axis lines:
    //dex.console.log("DOMAIN", d3.selectAll(".domain"));
    d3.selectAll(".domain")
      .call(dex.config.configurePath, config.axis.line);

    // Returns the path for a given data point.
    function path(d) {
      return line(dimensions.map(function (p) {
        return [x(p), y[p](d[p])];
      }));
    }

    // Handles a brush event, toggling the display of foreground lines.
    function brush() {
      // Get a list of our active brushes.
      var actives = dimensions.filter(function (p) {
          return !y[p].brush.empty();
        }),

      // Get an array of min/max values for each brush constraint.
        extents = actives.map(function (p) {
          return y[p].brush.extent();
        });

      foreground.style("display", function (d) {
        //dex.console.log("Calculating what lines to display: ", actives);
        return actives.every(
          // P is column name, i is an index
          function (p, i) {
            // Categorical
            //console.log("P: " + p + ", I: " + i);
            if (!dex.object.contains(numericColumns, p)) {
              return extents[i][0] <= y[p](d[p]) && y[p](d[p]) <= extents[i][1];
            }
            // Numeric
            else {
              return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }
          }) ? null : "none";
      });
    }

    // Handles a brush event, toggling the display of foreground lines.
    function brushend() {
      //dex.console.log("BRUSH-END: ", foreground);
      //dex.console.log("chart: ", chart);
      var activeData = [];
      var i;

      // WARNING:
      //
      // Can't find an elegant way to get back at the data so I am getting
      // at the data in a somewhat fragile manner instead.  Mike Bostock ever
      // changes the __data__ convention and this will break.
      for (i = 0; i < foreground[0].length; i++) {
        if (!(foreground[0][i]["style"]["display"] == "none")) {
          activeData.push(foreground[0][i]['__data__']);
        }
      }

      //dex.console.log("Selected: ", dex.json.toCsv(activeData, dimensions));
      chart.publish({"type" : "select", "selected" : dex.json.toCsv(activeData, dimensions)});
    }
  };

  $(document).ready(function () {
    $(document).uitooltip({
      items: "path",
      content: function () {
        return $(this).find("tooltip-content").text();
      },
      track: true
    });
  });

  return chart;
};

module.exports = parallelcoordinates;
},{}],22:[function(require,module,exports){
var piechart = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var chart = new dex.component(userConfig,
    {
      'parent'      : "#PieChart",
      'id'          : "PieChart",
      'class'       : "PieChart",
      'csv'         : {
        'header' : ["X", "Y"],
        'data'   : [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
      },
      'xi'          : 0,
      'yi'          : 2,
      'xoffset'     : 200,
      'yoffset'     : 0,
      'colors'      : d3.scale.category20(),
      'innerRadius' : 0,
      'outerRadius' : 190,
      'radius'      : 200,
      'label'       : {
        'fontSize'   : 16,
        'textAnchor' : 'middle'
      },
      'caption'     : {
        'text'       : '',
        'fontSize'   : 24,
        'textAnchor' : 'middle'
      }
    });

  chart.render = function () {
    d3 = dex.charts.d3.d3v3;
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function () {
    d3 = dex.charts.d3.d3v3;
    d3.selectAll("#" + chart.config.id).remove();
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart
      .attr("width", width)
      .attr("height", height)
      .attr("outerRadius", Math.min(width / 2, height / 2))
      .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
      .update();
  };

  chart.update = function () {
    d3 = dex.charts.d3.d3v3;
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

//  var radius = Math.min(config.width, config.height) / 2;

    var color = d3.scale.ordinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
      .outerRadius(config.outerRadius)
      .innerRadius(config.innerRadius);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function (d) {
        return d[config.yi];
      });

    var chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    var data = csv.data;

    // Convert all y values to numerics.
    data.forEach(function (d) {
      d[config.yi] = +d[config.yi];
    });

    var g = chartContainer.selectAll(".arc")
      .data(pie(data, function (d) {
        return d[config.yi];
      }))
      .enter().append("g")
      .attr("class", function (d) {
        return "arc";
      });

    g.append("path")
      .attr("d", arc)
      .style("fill", function (d, i) {
        return config.colors(i);
      });

    g.append("text")
      .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", config.label.textAnchor)
      .style("font-size", config.label.fontSize)
      .text(function (d) {
        return d.data[config.xi];
      });

    chartContainer.append("text")
      //.attr("dy", ".35em")
      .attr("y", -config.radius)
      .style("font-size", config.caption.fontSize)
      .style("text-anchor", config.caption.textAnchor)
      .text(config.caption.text);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = piechart;
},{}],23:[function(require,module,exports){
var radarchart = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var chart;

  var defaults = {
    // The parent container of this chart.
    'parent': '#RadarChart',
    // Set these when you need to CSS style components independently.
    'id': 'RadarChart',
    'class': 'RadarChart',
    'resizable': true,
    // Our data...
    'csv': {
      // Give folks without data something to look at anyhow.
      'header': ["Salesman", "Q1", "Q2", "Q3", "Q4" ],
      'data': [
        ["Bob", Math.random(), Math.random(), Math.random(), Math.random()],
        ["Sue", Math.random(), Math.random(), Math.random(), Math.random()],
        ["Joe", Math.random(), Math.random(), Math.random(), Math.random()],
        ["Peg", Math.random(), Math.random(), Math.random(), Math.random()],
        ["Pat", Math.random(), Math.random(), Math.random(), Math.random()],
        ["Jim", Math.random(), Math.random(), Math.random(), Math.random()],
        ["Tim", Math.random(), Math.random(), Math.random(), Math.random()],
        ["Sam", Math.random(), Math.random(), Math.random(), Math.random()]
      ]
    },
    'width': "100%",
    'height': "100%",
    'transform': "",
    'margin': {
      top: 70,
      right: 50,
      bottom: 70,
      left: 50
    },
    'format': d3.format(','),
    'wrapWidth': 60,
    'levels': 5,
    'maxValue': 0,
    'labelFactor': 1,
    'dotRadius': 4,
    'opacityCircles': 0.1,
    'strokeWidth': 2,
    'roundStrokes': false,
    'color': d3.scale.category10(),
    'title': dex.config.text(),
    'label': dex.config.text({
      'fill.fillColor': 'green',
      'font.size': '16px',
      'anchor': function (d, i) {
        var degreesPerSection = 360 / (chart.attr('csv').header.length - 1);
        dex.console.log("Degrees Per Section", degreesPerSection, degreesPerSection * (i-1));
        if (degreesPerSection * i < 10) {
          return "middle";
        }
        else if (degreesPerSection * i < 175) {
          return "start";
        }
        else if (degreesPerSection * i < 185) {
          return "middle";
        }
        dex.console.log("D", d, i);
        return "end";
      },
      'dy' : function(d, i) {
        var degreesPerSection = 360 / (chart.attr('csv').header.length - 1);
        if (degreesPerSection * i < 10) {
          return '-1em';
        }
        else if (degreesPerSection * i < 175) {
          return '.3em';
        }
        else if (degreesPerSection * i < 185) {
          return '1em';
        }
        return '.3em';
      },
      'dx' : function(d, i) {
        var degreesPerSection = 360 / (chart.attr('csv').header.length - 1);
        if (degreesPerSection * i < 10) {
          return '0';
        }
        else if (degreesPerSection * i < 175) {
          return '1em';
        }
        else if (degreesPerSection * i < 185) {
          return '0';
        }
        return '-.3em'
      }
      //'dy': '.2em',
      //'dx': '.2em'
    }),
    'opacityArea': 0.25,
    // The spoke axis.
    'spoke': {
      'label': dex.config.text({
        'x': 4,
        'y': function (d) {
          var height = chart.attr('height');
          var width = chart.attr('width');
          var margin = chart.attr('margin');

          var radius = Math.min(height - margin.top - margin.bottom,
              width - margin.left - margin.right) / 2;
          return -d * radius / chart.config.levels
        },
        'dy': '.4em',
        'font.size': '16px',
        'fill.fillColor': 'red'
      }),
      'line': dex.config.line({
        'stroke.width': '1px',
        'stroke.color': 'blue',
        'stroke.dasharray': '5 5'
      })
    },
    'radar.circle': dex.config.circle({
      'opacity': 0.1,
      'fill': {
        'fillColor': '#CDCDCD',
        'fillOpacity': .15
      },
      'stroke': {
        'width': 1,
        'color': 'black',
        'opacity': .1,
        'dasharray': "0"
      },
      'events': {
        'mouseover': function () {
          d3.select(this)
            .style("stroke", 'red')
            .style("stroke-width", 2);
        },
        'mouseout': function () {
          d3.select(this)
            .style("stroke", chart.config.radar.circle.stroke.color)
            .style("stroke-width", chart.config.radar.circle.stroke.width);
        }
      }
    })
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    chart.resize = this.resize(chart);
    window.onresize = chart.resize;
    return chart.resize();
  };

  chart.update = function () {
    d3 = dex.charts.d3.d3v3;
    var chart = this;
    var config = chart.config;
    var margin = config.margin;
    var csv = config.csv;

    var width = config.width - margin.left - margin.right;
    var height = config.height - margin.top - margin.bottom;

    // Remove the old, build from scratch.
    d3.selectAll(config.parent).selectAll('*').remove();

    // REM: Port to dex.csv method generically
    data = csv.data.map(function (row) {
      return {
        'key': row[0],
        'values': row.slice(1).map(function (d, i) {
          return {
            'axis': csv.header[i + 1],
            'value': +d
          }
        })
      }
    });

    data = data.map(function (d) {
      return d.values
    });

    var extents = dex.matrix.extent(csv.data, dex.range(1, csv.header.length - 1));

    //If the supplied maxValue is smaller than the actual one, replace by the max in the data
    var maxValue = extents[1];

    var allAxis = (data[0].map(function (i, j) {
        return i.axis
      })),	//Names of each axis
      total = allAxis.length,					//The number of different axes
      radius = Math.min(width / 2, height / 2),

      //Format = d3.format('%'),			 	//Percentage formatting
      angleSlice = Math.PI * 2 / total;			//The width in radians of each "slice"

    //Scale for the radius
    var rScale = d3.scale.linear()
      .range([0, radius])
      .domain([0, maxValue]);

    // Store in config for chart calculations.
    config.radiusScale = rScale;

    /////////////////////////////////////////////////////////
    //////////// Create the container SVG and g /////////////
    /////////////////////////////////////////////////////////

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr('width', config.width)
      .attr('height', config.height)
      .attr("transform", config.transform);

    var chartG = chartContainer
      .append('g')
      .attr('transform', 'translate(' +
        margin.left + ',' + margin.top + ') translate(' +
        width / 2 + ' ' + height / 2 + ")");

    /////////////////////////////////////////////////////////
    ////////// Glow filter for some extra pizzazz ///////////
    /////////////////////////////////////////////////////////

    //Filter for the outside glow
    var filter = chartG.append('defs').append('filter').attr('id', 'glow'),
      feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
      feMerge = filter.append('feMerge'),
      feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
      feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    /////////////////////////////////////////////////////////
    /////////////// Draw the Circular grid //////////////////
    /////////////////////////////////////////////////////////

    //Wrapper for the grid & axes
    var axisGrid = chartG.append("g").attr("class", "axisWrapper");

    //Draw the background circles, broken in WebView
    axisGrid.selectAll(".levels")
      .data(d3.range(1, (config.levels + 1)).reverse())
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      // TODO: This breaks webview.
      //.style("filter", "url(#glow)")
      .call(dex.config.configureCircle, config.radar.circle)
      .attr("r", function (d, i) {
        return radius / config.levels * d;
      });

    //Text indicating at what % each level is

    axisGrid.selectAll(".axisLabel")
      .data(d3.range(1, (config.levels + 1)).reverse())
      .enter().append("text")
      .call(dex.config.configureText, config.spoke.label)
      .attr("class", "axisLabel")
      .text(function (d, i) {
        return config.format(maxValue * d / config.levels);
        //Format(maxValue * d / config.levels);
      });

    /////////////////////////////////////////////////////////
    //////////////////// Draw the axes //////////////////////
    /////////////////////////////////////////////////////////

    //Create the straight lines radiating outward from the center
    var axis = axisGrid.selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");
    //Append the lines
    axis.append("line")
      .call(dex.config.configureLine, config.spoke.line)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", function (d, i) {
        return rScale(maxValue * 1.05) * Math.cos(angleSlice * i);
      })
      .attr("y2", function (d, i) {
        return rScale(maxValue * 1.05) * Math.sin(angleSlice * i);
      })
      .attr("class", "line");
//      .style("stroke", "white")
//      .style("stroke-width", "2px");

    //Append the labels at each axis
    axis.append("text")
      .call(dex.config.configureText, config.label)
      .attr("class", "legend")
      //.style("font-size", "11px")
      //.attr("text-anchor", "middle")
      //.attr("dy", "0.35em")
      .attr("x", function (d, i) {
        return rScale(maxValue * config.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2);
      })
      .attr("y", function (d, i) {
        return rScale(maxValue * config.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2);
      })
      .text(function (d) {
        return d
      });
      //.call(wrap, config.wrapWidth);

    /////////////////////////////////////////////////////////
    ///////////// Draw the radar chart blobs ////////////////
    /////////////////////////////////////////////////////////

    //The radial line function
    var radarLine = d3.svg.line.radial()
      .interpolate("linear-closed")
      .radius(function (d) {
        return rScale(d.value);
      })
      .angle(function (d, i) {
        return i * angleSlice;
      });

    if (config.roundStrokes) {
      radarLine.interpolate("cardinal-closed");
    }

    //Create a wrapper for the blobs
    var blobWrapper = chartG.selectAll(".radarWrapper")
      .data(data)
      .enter().append("g")
      .attr("class", "radarWrapper");

    //Append the backgrounds
    blobWrapper
      .append("path")
      .attr("class", "radarArea")
      .attr("d", function (d, i) {
        return radarLine(d);
      })
      .style("fill", function (d, i) {
        return config.color(i);
      })
      .style("fill-opacity", config.opacityArea)
      .on('mouseover', function (d, i) {
        //Dim all blobs
        d3.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", 0.05);
        //Bring back the hovered over blob
        d3.select(this)
          .transition().duration(200)
          .style("fill-opacity", .7);
      })
      .on('mouseout', function () {
        //Bring back all blobs
        d3.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", config.opacityArea);
      });

    //Create the outlines
    blobWrapper.append("path")
      .attr("class", "radarStroke")
      .attr("d", function (d, i) {
        return radarLine(d);
      })
      .style("stroke-width", config.strokeWidth + "px")
      .style("stroke", function (d, i) {
        return config.color(i);
      })
      .style("fill", "none")
      .style("filter", "url(#glow)");

    //Append the circles
    blobWrapper.selectAll(".radarCircle")
      .data(function (d, i) {
        return d;
      })
      .enter().append("circle")
      .attr("class", "radarCircle")
      .attr("r", config.dotRadius)
      .attr("cx", function (d, i) {
        return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
      })
      .attr("cy", function (d, i) {
        return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
      })
      .style("fill", function (d, i, j) {
        return config.color(j);
      })
      .style("fill-opacity", 0.8);

    /////////////////////////////////////////////////////////
    //////// Append invisible circles for tooltip ///////////
    /////////////////////////////////////////////////////////

    //Wrapper for the invisible circles on top
    var blobCircleWrapper = chartG.selectAll(".radarCircleWrapper")
      .data(data)
      .enter().append("g")
      .attr("class", "radarCircleWrapper");

    //Append a set of invisible circles on top for the mouseover pop-up
    blobCircleWrapper.selectAll(".radarInvisibleCircle")
      .data(function (d, i) {
        return d;
      })
      .enter().append("circle")
      .attr("class", "radarInvisibleCircle")
      .attr("r", config.dotRadius * 1.5)
      .attr("cx", function (d, i) {
        return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
      })
      .attr("cy", function (d, i) {
        return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
      })
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function (d, i) {
        newX = parseFloat(d3.select(this).attr('cx')) - 10;
        newY = parseFloat(d3.select(this).attr('cy')) - 10;

        tooltip
          .attr('x', newX)
          .attr('y', newY)
          .text(config.format(d.value))
          .transition().duration(200)
          .style('opacity', 1);
      })
      .on("mouseout", function () {
        tooltip.transition().duration(200)
          .style("opacity", 0);
      });

    //Set up the small tooltip for when you hover over a circle
    var tooltip = chartG.append("text")
      .attr("class", "tooltip")
      .style("opacity", 0);

    /////////////////////////////////////////////////////////
    /////////////////// Helper Function /////////////////////
    /////////////////////////////////////////////////////////

    //Taken from http://bl.ocks.org/mbostock/7555321
    //Wraps SVG text
    function wrap(text, width) {
      text.each(function () {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.4, // ems
          y = text.attr("y"),
          x = text.attr("x"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }

    // Allow method chaining
    return chart;
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = radarchart;

},{}],24:[function(require,module,exports){
var radialtree = function (userConfig) {
  d3 = dex.charts.d3.d3v4;
  var chart;

  var defaults = {
    // The parent container of this chart.
    'parent': '#RadialTreeParent',
    'id': 'RadialTreeId',
    'class': 'RadialTreeClass',
    'resizable': true,
    // Our data...
    'csv': {
      // Give folks without data something to look at anyhow.
      'header': ["X", "Y", "Z"],
      'data': [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'nodeColorScheme': d3.scaleOrdinal(d3.schemeCategory10),
    'linkColorScheme': d3.scaleOrdinal(d3.schemeCategory10),
    'labelColorScheme': d3.scaleOrdinal(d3.schemeCategory10),
    'width': "100%",
    'height': "100%",
    'transform': "translate(0 0)",
    'label': dex.config.text({
        'dy': '.31em',
        "x": function (d) {
          return d.x < 180 && !d.children ? 6 : -6;
        },
        'fill.fillColor': function (d) {
          return chart.config.labelColorScheme(d.depth);
        },
        'font': dex.config.font({
          'family': 'sans-serif',
          'size': 10,
        }),
        'anchor': function (d) {
          //dex.console.log("anchor", d);
          return d.x < 180 && !d.children ? "start" : "end";
        },
        'transform': function (d) {
          //dex.console.log("TRANSFORMING", d);
          return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")";
        },
        'text': function (d) {
          //console.dir(d);
          return d.data.name;
        }
      }
    ),
    'link': dex.config.path({
      'stroke.color': function (d) {
        return chart.config.linkColorScheme(d.depth);
      },
      'stroke.dasharray': '1 1',
      'stroke.width': 4,
      'stroke.opacity': .3,
      'fill.fillOpacity': .1,
      'fill.fillColor': 'none',
      'd': function (d) {
        return "M" + project(d.x, d.y)
          + "C" + project(d.x, (d.y + d.parent.y) / 2)
          + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
          + " " + project(d.parent.x, d.parent.y);
      }
    }),
    'connectionRatio': .9,
    'node': dex.config.circle({
      'r': 3,
      'stroke.color': function (d) {
        return chart.config.nodeColorScheme(d.depth);
      },
      'fill.fillColor': 'white'
    }),
    'separationModel': function (a, b) {
      //dex.console.log("separation", a, b);
      return (a.parent == b.parent ? 1 : 3) / a.depth;
    },
    'connectionLength': 80,
    'maxAngle': 360,
    'radius': 300,
    'margin': {
      'left': 10,
      'right': 10,
      'top': 25,
      'bottom': 10
    },

  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    d3 = dex.charts.d3.d3v4;
    var chart = this;
    var config = chart.config;
    chart.resize = chart.resize(chart);
    window.onresize = function () {
      chart.resize().update();
    }
    chart.resize();

    d3.selectAll(config.parent).selectAll('*').remove();

    var margin = config.margin;
    var width = config.width - margin.left - margin.right;
    var height = config.height - margin.top - margin.bottom;

    var svg = d3.select(config.parent)
      .append("svg")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr('width', config.width)
      .attr('height', config.height)
      .attr("transform", config.transform);

    var g = svg.append("g")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," +
        (height / 2 + margin.top) + ")");

    return chart.update();
  };

  chart.update = function () {
    d3 = dex.charts.d3.d3v4;
    var chart = this;
    var config = chart.config;
    var csv = config.csv;
    var margin = config.margin;

    var width = config.width - margin.left - margin.right;
    var height = config.height - margin.top - margin.bottom;

    var data = dex.csv.toNestedJson(dex.csv.copy(csv));

    chart.internalUpdate(data);

    return chart;
  };

  chart.internalUpdate = function (source) {
    d3 = dex.charts.d3.d3v4;
    var chart = this;
    var config = chart.config;
    var csv = config.csv;
    var margin = config.margin;

    var svg = d3.select(config.parent).select("svg");
    var g = svg.select("g");

    var tree = d3.tree()
      .size([config.maxAngle, config.radius])
      .separation(config.separationModel);

    var hier = d3.hierarchy(source);
    var root = tree(hier);

    var link = g.selectAll(".link")
      .data(root.descendants().slice(1))
      .enter().append("path")
      .attr("class", "link")
      .call(dex.config.configurePath, config.link);

    //node.attr("y", function(d) { d.y = d.depth * 80; });

    var nodes = g.selectAll(".node")
      .data(root.descendants());

    //dex.console.log("DESCENDANTS", root.descendants());

    var nodeEnter = nodes.enter()
      .append("g")
      .attr("class", function (d) {
        return "node" + (d.children ? " node--internal" : " node--leaf");
      })
      .attr("transform", function (d) {
        return "translate(" + project(d.x, d.y) + ")";
      });
    //.on("click", click);

    nodeEnter.append("circle")
      .call(dex.config.configureCircle, config.node);

    //node.attr("y", function(d) { return d.depth * 40; });

    nodeEnter.append("text")
      .call(dex.config.configureText, config.label);


    var nodeExit = nodes.exit()
      .transition()
      .duration(config.duration)
      .remove();

    nodeExit.select("circle")
      .attr("r", 1e-6);

    nodeExit.select("text")
      .style("fill-opacity", 1e-6);

    function click(d) {
      d3 = dex.charts.d3.d3v4;
      //dex.console.log("CLICK", d);
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }

      chart.internalUpdate(d);
    }

    return chart;
  }

  function project(x, y) {
    //dex.console.log('project(x,y)', x, y);
    var angle = (x - 90) / 180 * Math.PI;
    var radius = y * chart.config.connectionRatio;
    return [radius * Math.cos(angle), radius * Math.sin(angle)];
  }

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = radialtree;

},{}],25:[function(require,module,exports){
var sankey = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var defaultColor = d3.scale.category20c();

  var defaults =
    {
      // The parent container of this chart.
      'parent': null,
      // Set these when you need to CSS style components independently.
      'id': 'Sankey',
      'class': 'Sankey',
      // Our data...
      'csv': {
        // Give folks without data something to look at anyhow.
        'header': ["X", "Y", "WEIGHT"],
        'data': [
          ["A1", "A2", 1],
          ["B1", "B2", 2],
          ["C1", "C2", 2],
          ["C2", "C3", 4]
        ]
      },
      'relationships': null,
      // width and height of our bar chart.
      'width': "100%",
      'height': "100%",
      // The x an y indexes to chart.
      "transform": "translate(5,0) scale(.95)",
      'layoutIterations': 32,
      'columnTitle': dex.config.text({
          'fill.fillColor': 'black',
          'x': function (d) {
            var center = window.innerWidth / 2;
            //var center = (typeof userConfig.width !== 'undefined' ?
            //  userConfig.width : defaults.width) / 2;

            var nodeWidth = (userConfig.mouseout && userConfig.mouseout.node &&
            userConfig.mouseout.node.rectangle && userConfig.mouseout.node.rectangle.width) ?
              userConfig.mouseout.node.rectangle.width : defaults.mouseout.node.rectangle.width;

            var nodePadding = (userConfig.mouseout && userConfig.mouseout.node &&
            userConfig.mouseout.node.padding) ?
              userConfig.mouseout.node.padding : defaults.mouseout.node.padding;

            //dex.console.log("d.x=" + d.x + ", width=" + window.innerWidth + ", nodeWidth=" + nodeWidth +
            //  ", nodePadding=" + nodePadding + ", center=" + center);
            if (+d > center) {
              //return +d-nodePadding-nodeWidth;
              return +d + nodeWidth / 2;
            }
            else {
              //return +d + nodeWidth + nodePadding;
              return +d + nodeWidth / 2;
            }
          },
          "y": 10,
          "writingMode": "tb",
          "glyphOrientationVertical": 0,
          "anchor": function (d, i) {
            //var center = (typeof userConfig.width !== 'undefined' ?
            // userConfig.width : defaults.width) / 2;
            var center = window.innerWidth / 2;

            if (+d > center) {
              // End if horizontal
              return "start";
            }
            else {
              return "start";
            }
          },
          "text": function (d, i) {
            return d + ", i" + i;
          }
        }
      ),
      'label': dex.config.text({
        'fill.fillColor': 'black',
        'x': function (d) {
          var center = window.innerWidth / 2;
          //var center = (typeof userConfig.width !== 'undefined' ?
          //  userConfig.width : defaults.width) / 2;

          var nodeWidth = (userConfig.mouseout && userConfig.mouseout.node &&
          userConfig.mouseout.node.rectangle &&
          userConfig.mouseout.node.rectangle.width) ?
            userConfig.mouseout.node.rectangle.width : defaults.mouseout.node.rectangle.width;

          var nodePadding = (userConfig.mouseout && userConfig.mouseout.node &&
          userConfig.mouseout.node.padding) ?
            userConfig.mouseout.node.padding : defaults.mouseout.node.padding;

          //dex.console.log("d.x=" + d.x + ", width=" + window.innerWidth + ", nodeWidth=" + nodeWidth +
          //  ", nodePadding=" + nodePadding + ", center=" + center);
          if (d.x > center) {
            return -nodePadding;
          }
          else {
            return nodeWidth + nodePadding;
          }
        },
        'y': function (d) {
          return d.dy / 2;
        },
        'transform': null,
        'dy': '.35em',
        'anchor': function (d, i) {
          //var center = (typeof userConfig.width !== 'undefined' ?
          // userConfig.width : defaults.width) / 2;
          var center = window.innerWidth / 2;

          if (d.x > center) {
            return "end";
          }
          else {
            return "start";
          }
        },
        'font': {
          'size': 14
        },
        'color': "black",
        'opacity': 1,
        'text': function (d) {
          return d.name;
        }
      }),
      //'columnLayout' : function(node, nodeMap) { return nodeMap[node.name].column },
      'mouseout': {
        'link': {
          'stroke': dex.config.stroke({
            'opacity': .2,
            'color': function (d) {
              return defaultColor(d.category);
            },
            'width': function (d) {
              //return 0;
              return Math.max(1, d.dy);
            }
          }),
          'fill': dex.config.fill({
            'fillColor': 'none',
            'fillOpacity': .4
          }),
          'curvature': 0.5
        },
        'node': {
          'padding': 4,
          'rectangle': dex.config.rectangle(
            {
              'width': 32,
              'color': function (d) {
                return defaultColor(d.name.replace(/ .*/, ""));
              },
              'height': function (d) {
                return d.dy;
              },
              'stroke': dex.config.stroke({
                'color': function (d) {
                  return d3.rgb(d.color).darker(2);
                }
              })
            })
        }
      },
      'mouseover': {
        'link': {
          'stroke': dex.config.stroke({
            'opacity': .8,
            'width': function (d) {
              return Math.max(1, d.dy);
            },
            'color': function (d) {
              return defaultColor(d.category);
            }
          }),
          'fill': dex.config.fill({
            'fillColor': 'none',
            'fillOpacity': .8
          }),
        },
        'node': {
          'stroke': dex.config.stroke({
            'opacity': .8,
            'width': function (d) {
              return Math.max(1, d.dy);
            },
            'color': function (d) {
              return defaultColor(d.category);
            }
          }),
          'fill': dex.config.fill({
            'fillColor': 'none',
            'fillOpacity': .8
          })
        }
      },
      'node': {
        'padding': 4,
        'rectangle': dex.config.rectangle(
          {
            'width': 32,
            'color': function (d) {
              return defaultColor(d.name.replace(/ .*/, ""));
            },
            'height': function (d) {
              return d.dy;
            },
            'stroke': dex.config.stroke({
              'color': function (d) {
                return d3.rgb(d.color).darker(2);
              }
            })
          })
      },
      "manualColumnLayout": false
    };

  //dex.console.log("USER-CONFIG", userConfig, "DEFAULTS:", defaults);
  var config = dex.object.overlay(dex.config.expand(userConfig), dex.config.expand(defaults));

  // If we do not have specifically defined relationship fields, then lets
  // try to make an educated guess about what to do with them.  If the last
  // column is numeric, we will assume that this is to be used as a weight.
  // Otherwise, we will use a uniform weighting of 1 for each link.
  if (!config.relationships) {
    // If we have less than 3 columns or the last column does not contain
    // numerics then we will create a set of relationships for each column
    // with a standard weight of 1 and a single category of 1.
    if (config.csv.header.length < 3 || !dex.csv.isColumnNumeric(config.csv, config.csv.header.length - 1)) {
      config.relationships = [];

      for (i = 1; i < config.csv.header.length; i++) {
        config.relationships.push(
          {
            'source': i - 1,
            'target': i,
            'value': function (csv, ri) {
              return 1;
            },
            'category': function (csv, ri) {
              return 1;
            },
            'column': function (csv, ri, ci) {
              return i;
            }
          });
      }
    }
    // If we fall through here, then the last column is numeric.  We will
    // use this for our weight.
    else {
      config.relationships = [];

      for (i = 1; i < config.csv.header.length - 1; i++) {
        config.relationships.push(
          {
            'source': i - 1,
            'target': i,
            'value': function (csv, ri) {
              return csv.data[ri][csv.header.length - 1];
            },
            'category': function (csv, ri) {
              return 1;
            },
            'column': function (csv, ri, ci) {
              return i;
            }
          });
      }
    }
  }

  var chart = new dex.component(userConfig, config);

  // TODO: Figure out how I want to do this.  Partial implementation.
  chart.renderGui = function () {
    d3 = dex.charts.d3.d3v3;
    dex.console.log("SETTINGS", d3.select("#settings").select("#" + chart.config.id).selectAll("#setting"));
    d3.select("#settings").select("#" + chart.config.id).selectAll("#setting").each(function (d) {
      dex.console.log("SETTING", d);
    });
  };

  chart.render = function () {
    d3 = dex.charts.d3.d3v3;
    window.onresize = this.resize;
    this.update();
  };

  chart.resize = function () {
    d3 = dex.charts.d3.d3v3;
    var width = window.innerWidth;
    var height = window.innerHeight;

    //dex.console.log(config.id + " RESIZING: " + width + "x" + height);
    d3.selectAll(config.parent).selectAll('*').remove();

    chart.attr("width", width)
      .attr("height", height)
      .update();
  };

  chart.update = function () {
    d3 = dex.charts.d3.d3v3;
    var config = chart.config;
    //dex.console.log("UPDATING CHART....");
    //dex.console.log("-- WIDTH : " + config.width);
    //dex.console.log("-- HEIGHT: " + config.height);
    var width = d3.select(config.parent).property("clientWidth");
    var height = d3.select(config.parent).property("clientHeight");
    var csv = config.csv;

    d3.selectAll(config.parent).selectAll('*').remove();

    var chartContainer = d3.select(config.parent).append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("width", config.width)
      .attr("height", config.height)
      .attr("transform", config.transform);

    var sankeyData = [];

    var nodeMap = {};

    for (ri = 0; ri < config.relationships.length; ri++) {
      for (i = 0; i < config.csv.data.length; i++) {
        var relation = [];
        var source;
        var target;

        if (dex.object.isFunction(config.relationships[ri].source)) {
          source = config.relationships[ri].source(config.csv, i);
        }
        else {
          source =
            {
              'nodeName': config.csv.data[i][config.relationships[ri].source],
              'name': config.csv.data[i][config.relationships[ri].source],
              'column': (config.relationships[ri].column) ?
                config.relationships[ri].column(csv, i, config.relationships[ri].source) :
                config.relationships[ri].source
            };
        }

        if (dex.object.isFunction(config.relationships[ri].target)) {
          target = config.relationships[ri].target(config.csv, i);
        }
        else {
          target =
            {
              'nodeName': config.csv.data[i][config.relationships[ri].target],
              'name': config.csv.data[i][config.relationships[ri].target],
              'column': (config.relationships[ri].column) ?
                config.relationships[ri].column(csv, i, config.relationships[ri].target) :
                config.relationships[ri].target
            }
        }

        relation.source = source.nodeName;
        relation.target = target.nodeName;

        // Store this to translate nodenames back to display names.
        nodeMap[source.nodeName] = source;
        nodeMap[target.nodeName] = target;

        // Wrap source and target info:
        //dex.console.log("RELATION", config.relationships[ri]);
        if (typeof config.relationships[ri].category === "undefined") {
          //relation.category = csv.data[i][config.relationships[ri].source];
          relation.category = 1;
        }
        else if (dex.object.isFunction(config.relationships[ri].category)) {
          relation.category = config.relationships[ri].category(config.csv, i);
        }
        else {
          relation.category = config.relationships[ri].category;
        }

        relation.linkid = "L" + i;

        if (typeof config.relationships[ri].value === "undefined") {
          relation.value = 1;
        }
        else if (dex.object.isFunction(config.relationships[ri].value)) {
          relation.value = config.relationships[ri].value(config.csv, i);
        }
        else {
          relation.value = config.relationships[ri].value;
        }

        sankeyData.push(relation);
      }
    }
    //dex.console.log("sankeyData", sankeyData);
    var units = "Units";

    var formatNumber = d3.format(",.0f"),    // zero decimal places
      format = function (d) {
        return formatNumber(d) + " " + units;
      };

    chartContainer.onresize = chart.resize;

    function manualColumnLayout(nodes, nodeWidth, size) {
      var numSinks = 1;

      nodes.forEach(function (node) {
        //node.x = (nodeMap[node.name].column) * nodeWidth;
        node.x = (nodeMap[node.name].column - 1) * nodeWidth;
        numSinks = Math.max(numSinks, node.x);
        node.dx = nodeWidth;
      });

      var nodeBreadth = (size[0] - nodeWidth) / (numSinks - 1);
      nodes.forEach(function (node) {
        node.x *= nodeBreadth;
      });
    }

    // Set the sankey diagram properties
    var sankey = d3sankey()
      .nodeWidth(config.mouseout.node.rectangle.width)
      .nodePadding(config.mouseout.node.padding)
      .size([width - config.mouseout.node.padding, height - config.mouseout.node.padding]);

    if (config.manualColumnLayout) {
      sankey.columnLayout(manualColumnLayout);
    }

    var path = sankey.link();

    //set up graph in same style as original example but empty
    graph = {"nodes": [], "links": []};

    sankeyData.forEach(function (d, i) {
      graph.nodes.push({"name": d.source});
      graph.nodes.push({"name": d.target});
      graph.links.push({
        "source": d.source, "target": d.target, "value": +d.value,
        "category": d.category, "linkid": d.linkid
      });
    });

    //dex.console.log("GRAPH NODES 1", graph.nodes);

    //thanks Mike Bostock https://groups.google.com/d/msg/d3-js/pl297cFtIQk/Eso4q_eBu1IJ
    //this handy little function returns only the distinct / unique nodes
    graph.nodes = d3.keys(d3.nest()
      .key(function (d) {
        return d.name;
      })
      .map(graph.nodes));

    //dex.console.log("GRAPH NODES 2", graph.nodes);

    // it appears d3 with force layout wants a numeric source and target
    // so loop through each link replacing the text with its index from node
    graph.links.forEach(function (d, i) {
      graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
      graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
    });

    //now loop through each nodes to make nodes an array of objects rather than an array of strings
    graph.nodes.forEach(function (d, i) {
      graph.nodes[i] = {"name": d};
    });

    sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .curvature(config.mouseout.link.curvature)
      .layout(config.layoutIterations);

    // add in the links
    var link = chartContainer.append("g").selectAll(".link")
      .data(graph.links)
      .enter().append("path")
      .attr("class", "link")
      .attr("id", function (d) {
        return d.linkid;
      })
      .attr("d", path)
      .call(dex.config.configureLink, config.mouseout.link)
      .sort(function (a, b) {
        return b.dy - a.dy;
      })
      .on("mouseover", function (d) {
        chartContainer.selectAll("#" + d.linkid)//.style("stroke-opacity", 1)
          .call(dex.config.configureLink, config.mouseover.link);
      })
      .on("mouseout", function (d) {
        chartContainer.selectAll("#" + d.linkid)//.style("stroke-opacity", config.link.stroke.opacity);
          .call(dex.config.configureLink, config.mouseout.link);
      });

    // add the link titles
    link.append("tooltip-content")
      .text(function (d) {
        return nodeMap[d.source.name].name + " -> " +
          nodeMap[d.target.name].name + "\n" + format(d.value);
      });

    // add in the nodes
    var node = chartContainer.append("g").selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .call(d3.behavior.drag()
        .origin(function (d) {
          return d;
        })
        .on("dragstart", function () {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove));

    // add the rectangles for the nodes
    node.append("rect")
      .call(dex.config.configureRectangle, config.mouseout.node.rectangle)
      .on("mouseover", function (d) {
        var links = (d.sourceLinks.length > 0) ?
          d.sourceLinks : d.targetLinks;

        links.forEach(function (link) {
          chartContainer.selectAll("#" + link.linkid)
            .call(dex.config.configureLink, config.mouseover.node);
        });
      })
      .on("mouseout", function (d) {

        var links = (d.sourceLinks.length > 0) ?
          d.sourceLinks : d.targetLinks;
        links.forEach(function (link) {
          chartContainer.selectAll("#" + link.linkid)
            .call(dex.config.configureLink, config.mouseout.link);
        });
      })
      .append("title")
      .text(function (d) {
        return nodeMap[d.name].name + "\n" + format(d.value);
      });

    config.label.text = function (d) {
      return nodeMap[d.name].name;
    };

    /////////// A HACK TO ADD TITLE LABELS
    var locations = {};
    var rects = chartContainer.selectAll("rect").each(function (rect) {
      locations[rect.x] = true;
    });

    var orderedLocations = dex.object.keys(locations).sort(function (a, b) {
      return a - b;
    });

    //var locationWidth = (orderedLocations[1] - orderedLocations[0]) / 2;

    //orderedLocations = orderedLocations.map(function(d) { return +d + locationWidth});

    var titles = chartContainer.append("g").selectAll("text")
      .data(orderedLocations)
      .enter()
      .append("text")
      .call(dex.config.configureText, config.columnTitle)
      .text(function (d, i) {
        return csv.header[i];
      });

    //////////// END OF HACK

    // add in the title for the nodes
    node.append("text")
      .call(dex.config.configureText, config.label);

    // the function for moving the nodes
    function dragmove(d) {
      d3.select(this).attr("transform",
        "translate(" + (
          d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
        ) + "," + (
          d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
        ) + ")");
      sankey.relayout();
      link.attr("d", path);
    }
  };

  return chart;
}

// SANKEY.JS : from Mike Bostock
d3sankey = function () {
  var sankey = {},
    nodeWidth = 24,
    nodePadding = 8,
    columnLayout = defaultColumnLayout,
    curvature = .5,
    size = [1, 1],
    nodes = [],
    links = [];

  sankey.columnLayout = function (_) {
    if (!arguments.length) return columnLayout;
    columnLayout = _;
    return sankey;
  };

  sankey.curvature = function (_) {
    if (!arguments.length) return curvature;
    curvature = +_;
    return sankey;
  };

  sankey.nodeWidth = function (_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return sankey;
  };

  sankey.nodePadding = function (_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  };

  sankey.nodes = function (_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return sankey;
  };

  sankey.links = function (_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  };

  sankey.size = function (_) {
    if (!arguments.length) return size;
    size = _;
    return sankey;
  };

  sankey.layout = function (iterations) {
    computeNodeLinks();
    computeNodeValues();
    computeNodeBreadths(nodes);
    computeNodeDepths(iterations);
    computeLinkDepths();
    return sankey;
  };

  sankey.relayout = function () {
    computeLinkDepths();
    return sankey;
  };

  sankey.link = function () {
//    var curvature = .5;

    function link(d) {
      var x0 = d.source.x + d.source.dx,
        x1 = d.target.x,
        xi = d3.interpolateNumber(x0, x1),
        x2 = xi(curvature),
        x3 = xi(1 - curvature),
        y0 = d.source.y + d.sy + d.dy / 2,
        y1 = d.target.y + d.ty + d.dy / 2;
      return "M" + x0 + "," + y0
        + "C" + x2 + "," + y0
        + " " + x3 + "," + y1
        + " " + x1 + "," + y1;
    }

    link.curvature = function (_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks() {
    nodes.forEach(function (node) {
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    links.forEach(function (link) {
      var source = link.source,
        target = link.target;
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues() {
    nodes.forEach(function (node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),
        d3.sum(node.targetLinks, value)
      );
    });
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths() {
    columnLayout(nodes, nodeWidth, size);
  }

  function defaultColumnLayout(nodes, nodeWidth, size) {
    var remainingNodes = nodes,
      visited = {},
      x = 0;

    //dex.console.log("NODE", nodes[0]);
    while (remainingNodes.length) {
      nextNodes = [];
      visited[remainingNodes[0].name] = true;
      remainingNodes.forEach(function (node) {
        node.x = x;
        node.dx = nodeWidth;
        node.sourceLinks.forEach(function (link) {
          if (!visited[link.target.name]) {
            nextNodes.push(link.target);
          }
          else {
            dex.console.log("CYCLE DETECTED AT: " + node.name + "->" + link.target.name);
          }
        });
      });
      remainingNodes = nextNodes;
      ++x;
    }

    moveSinksRight(x);
    scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
  }

  function moveSourcesRight() {
    nodes.forEach(function (node) {
      if (!node.targetLinks.length) {
        node.x = d3.min(node.sourceLinks, function (d) {
            return d.target.x;
          }) - 1;
      }
    });
  }

  function moveSinksRight(x) {
    nodes.forEach(function (node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(function (node) {
      node.x *= kx;
    });
  }

  function computeNodeDepths(iterations) {
    var nodesByBreadth = d3.nest()
      .key(function (d) {
        return d.x;
      })
      .sortKeys(d3.ascending)
      .entries(nodes)
      .map(function (d) {
        return d.values;
      });

    //
    initializeNodeDepth();
    resolveCollisions();
    for (var alpha = 1; iterations > 0; --iterations) {
      relaxRightToLeft(alpha *= .99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeDepth() {
      var ky = d3.min(nodesByBreadth, function (nodes) {
        return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
      });

      nodesByBreadth.forEach(function (nodes) {
        nodes.forEach(function (node, i) {
          node.y = i;
          node.dy = node.value * ky;
        });
      });

      links.forEach(function (link) {
        link.dy = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      nodesByBreadth.forEach(function (nodes, breadth) {
        nodes.forEach(function (node) {
          if (node.targetLinks.length) {
            var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedSource(link) {
        return center(link.source) * link.value;
      }
    }

    function relaxRightToLeft(alpha) {
      nodesByBreadth.slice().reverse().forEach(function (nodes) {
        nodes.forEach(function (node) {
          if (node.sourceLinks.length) {
            var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedTarget(link) {
        return center(link.target) * link.value;
      }
    }

    function resolveCollisions() {
      nodesByBreadth.forEach(function (nodes) {
        var node,
          dy,
          y0 = 0,
          n = nodes.length,
          i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingDepth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y0 - node.y;
          if (dy > 0) node.y += dy;
          y0 = node.y + node.dy + nodePadding;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y0 - nodePadding - size[1];
        if (dy > 0) {
          y0 = node.y -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y + node.dy + nodePadding - y0;
            if (dy > 0) node.y -= dy;
            y0 = node.y;
          }
        }
      });
    }

    function ascendingDepth(a, b) {
      return a.y - b.y;
    }
  }

  function computeLinkDepths() {
    nodes.forEach(function (node) {
      node.sourceLinks.sort(ascendingTargetDepth);
      node.targetLinks.sort(ascendingSourceDepth);
    });
    nodes.forEach(function (node) {
      var sy = 0, ty = 0;
      node.sourceLinks.forEach(function (link) {
        link.sy = sy;
        sy += link.dy;
      });
      node.targetLinks.forEach(function (link) {
        link.ty = ty;
        ty += link.dy;
      });
    });

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y;
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y;
    }
  }

  function center(node) {
    return node.y + node.dy / 2;
  }

  function value(link) {
    return link.value;
  }

  $(document).ready(function () {
    // Add tooltips
    $(document).uitooltip({
      items: "path",
      content: function () {
        return $(this).find("tooltip-content").text();
      },
      track: true
    });

    // Make the entire chart draggable.
    //$(sankey.config.parent).draggable();
  });

  return sankey;
};

module.exports = sankey;
},{}],26:[function(require,module,exports){
var sankeyparticles = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent': '#SankeyParticles',
    // Set these when you need to CSS style components independently.
    'id': 'SankeyParticles',
    'class': 'SankeyParticles',
    'resizable': true,
    // Our data...
    'csv': {
      // Give folks without data something to look at anyhow.
      'header': ["X", "Y", "Z"],
      'data': [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'width': "100%",
    'height': "100%",
    'margin' : { 'top' : 2, 'bottom' : 10, 'left' : 2, 'right' : 10 },
    'transform': "translate(0 0)",
    'title': dex.config.text(),
    'label': dex.config.text()
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    d3 = dex.charts.d3.d3v3;
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  d3sankey = function () {
    var sankey = {},
      nodeWidth = 24,
      nodePadding = 8,
      size = [1, 1],
      nodes = [],
      links = [];

    sankey.nodeWidth = function (_) {
      if (!arguments.length) return nodeWidth;
      nodeWidth = +_;
      return sankey;
    };

    sankey.nodePadding = function (_) {
      if (!arguments.length) return nodePadding;
      nodePadding = +_;
      return sankey;
    };

    sankey.nodes = function (_) {
      if (!arguments.length) return nodes;
      nodes = _;
      return sankey;
    };

    sankey.links = function (_) {
      if (!arguments.length) return links;
      links = _;
      return sankey;
    };

    sankey.size = function (_) {
      if (!arguments.length) return size;
      size = _;
      return sankey;
    };

    sankey.layout = function (iterations) {
      computeNodeLinks();
      computeNodeValues();
      computeNodeBreadths();
      computeNodeDepths(iterations);
      computeLinkDepths();
      return sankey;
    };

    sankey.relayout = function () {
      computeLinkDepths();
      return sankey;
    };

    sankey.link = function () {
      var curvature = .5;

      function link(d) {
        var x0 = d.source.x + d.source.dx,
          x1 = d.target.x,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.sy + d.dy / 2,
          y1 = d.target.y + d.ty + d.dy / 2;
        return "M" + x0 + "," + y0
          + "C" + x2 + "," + y0
          + " " + x3 + "," + y1
          + " " + x1 + "," + y1;
      }

      link.curvature = function (_) {
        if (!arguments.length) return curvature;
        curvature = +_;
        return link;
      };

      return link;
    };

    // Populate the sourceLinks and targetLinks for each node.
    // Also, if the source and target are not objects, assume they are indices.
    function computeNodeLinks() {
      nodes.forEach(function (node) {
        node.sourceLinks = [];
        node.targetLinks = [];
      });
      links.forEach(function (link) {
        var source = link.source,
          target = link.target;
        if (typeof source === "number") source = link.source = nodes[link.source];
        if (typeof target === "number") target = link.target = nodes[link.target];
        source.sourceLinks.push(link);
        target.targetLinks.push(link);
      });
    }

    // Compute the value (size) of each node by summing the associated links.
    function computeNodeValues() {
      nodes.forEach(function (node) {
        node.value = Math.max(
          d3.sum(node.sourceLinks, value),
          d3.sum(node.targetLinks, value)
        );
      });
    }

    // Iteratively assign the breadth (x-position) for each node.
    // Nodes are assigned the maximum breadth of incoming neighbors plus one;
    // nodes with no incoming links are assigned breadth zero, while
    // nodes with no outgoing links are assigned the maximum breadth.
    function computeNodeBreadths() {
      var remainingNodes = nodes,
        nextNodes,
        x = 0;

      while (remainingNodes.length) {
        nextNodes = [];
        remainingNodes.forEach(function (node) {
          node.x = x;
          node.dx = nodeWidth;
          node.sourceLinks.forEach(function (link) {
            if (nextNodes.indexOf(link.target) < 0) {
              nextNodes.push(link.target);
            }
          });
        });
        remainingNodes = nextNodes;
        ++x;
      }

      //
      moveSinksRight(x);
      scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
    }

    function moveSourcesRight() {
      nodes.forEach(function (node) {
        if (!node.targetLinks.length) {
          node.x = d3.min(node.sourceLinks, function (d) {
              return d.target.x;
            }) - 1;
        }
      });
    }

    function moveSinksRight(x) {
      nodes.forEach(function (node) {
        if (!node.sourceLinks.length) {
          node.x = x - 1;
        }
      });
    }

    function scaleNodeBreadths(kx) {
      nodes.forEach(function (node) {
        node.x *= kx;
      });
    }

    function computeNodeDepths(iterations) {
      var nodesByBreadth = d3.nest()
        .key(function (d) {
          return d.x;
        })
        .sortKeys(d3.ascending)
        .entries(nodes)
        .map(function (d) {
          return d.values;
        });

      //
      initializeNodeDepth();
      resolveCollisions();
      for (var alpha = 1; iterations > 0; --iterations) {
        relaxRightToLeft(alpha *= .99);
        resolveCollisions();
        relaxLeftToRight(alpha);
        resolveCollisions();
      }

      function initializeNodeDepth() {
        var ky = d3.min(nodesByBreadth, function (nodes) {
          return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
        });

        nodesByBreadth.forEach(function (nodes) {
          nodes.forEach(function (node, i) {
            node.y = i;
            node.dy = node.value * ky;
          });
        });

        links.forEach(function (link) {
          link.dy = link.value * ky;
        });
      }

      function relaxLeftToRight(alpha) {
        nodesByBreadth.forEach(function (nodes, breadth) {
          nodes.forEach(function (node) {
            if (node.targetLinks.length) {
              var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
              node.y += (y - center(node)) * alpha;
            }
          });
        });

        function weightedSource(link) {
          return center(link.source) * link.value;
        }
      }

      function relaxRightToLeft(alpha) {
        nodesByBreadth.slice().reverse().forEach(function (nodes) {
          nodes.forEach(function (node) {
            if (node.sourceLinks.length) {
              var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
              node.y += (y - center(node)) * alpha;
            }
          });
        });

        function weightedTarget(link) {
          return center(link.target) * link.value;
        }
      }

      function resolveCollisions() {
        nodesByBreadth.forEach(function (nodes) {
          var node,
            dy,
            y0 = 0,
            n = nodes.length,
            i;

          // Push any overlapping nodes down.
          nodes.sort(ascendingDepth);
          for (i = 0; i < n; ++i) {
            node = nodes[i];
            dy = y0 - node.y;
            if (dy > 0) node.y += dy;
            y0 = node.y + node.dy + nodePadding;
          }

          // If the bottommost node goes outside the bounds, push it back up.
          dy = y0 - nodePadding - size[1];
          if (dy > 0) {
            y0 = node.y -= dy;

            // Push any overlapping nodes back up.
            for (i = n - 2; i >= 0; --i) {
              node = nodes[i];
              dy = node.y + node.dy + nodePadding - y0;
              if (dy > 0) node.y -= dy;
              y0 = node.y;
            }
          }
        });
      }

      function ascendingDepth(a, b) {
        return a.y - b.y;
      }
    }

    function computeLinkDepths() {
      nodes.forEach(function (node) {
        node.sourceLinks.sort(ascendingTargetDepth);
        node.targetLinks.sort(ascendingSourceDepth);
      });
      nodes.forEach(function (node) {
        var sy = 0, ty = 0;
        node.sourceLinks.forEach(function (link) {
          link.sy = sy;
          sy += link.dy;
        });
        node.targetLinks.forEach(function (link) {
          link.ty = ty;
          ty += link.dy;
        });
      });

      function ascendingSourceDepth(a, b) {
        return a.source.y - b.source.y;
      }

      function ascendingTargetDepth(a, b) {
        return a.target.y - b.target.y;
      }
    }

    function center(node) {
      return node.y + node.dy / 2;
    }

    function value(link) {
      return link.value;
    }

    return sankey;
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll(config.parent).selectAll('*').remove();

    var data = dex.csv.getGraph(csv);
    //dex.console.log("DATA", data);

    var margin = config.margin,
      width = config.width - margin.left - margin.right,
      height = config.height - margin.top - margin.bottom;

    var formatNumber = d3.format(",.0f"),
      format = function (d) {
        return formatNumber(d) + " TWh";
      },
      color = d3.scale.category20();

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", config.transform);

    var sankey = d3sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .size([width, height]);

    var path = sankey.link();

    var freqCounter = 1;

    data.links.forEach(function (d) {
      d.o_value = d.value;
      d.value = 1;
    })

    sankey
      .nodes(data.nodes)
      .links(data.links)
      .layout(32);

    var link = chartContainer.append("g").selectAll(".link")
      .data(data.links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function (d) {
        return Math.max(1, d.dy);
      })
      .sort(function (a, b) {
        return b.dy - a.dy;
      });

    link.append("title")
      .text(function (d) {
        return d.source.name + " → " + d.target.name + "\n" + format(d.o_value);
      });

    var node = chartContainer.append("g").selectAll(".node")
      .data(data.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .call(d3.behavior.drag()
        .origin(function (d) {
          return d;
        })
        .on("dragstart", function () {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove));

    node.append("rect")
      .attr("height", function (d) {
        return d.dy;
      })
      .attr("width", sankey.nodeWidth())
      .style("fill", function (d) {
        return d.color = color(d.name.replace(/ .*/, ""));
      })
      .style("stroke", "none")
      .append("title")
      .text(function (d) {
        return d.name + "\n" + format(d.o_value);
      });

    node.append("text")
      .attr("x", -6)
      .attr("y", function (d) {
        return d.dy / 2;
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) {
        return d.name;
      })
      .filter(function (d) {
        return d.x < width / 2;
      })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

    function dragmove(d) {
      d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
      sankey.relayout();
      link.attr("d", path);
    }

    var linkExtent = d3.extent(data.links, function (d) {
      return d.o_value
    });
    var frequencyScale = d3.scale.linear().domain(linkExtent).range([0.05, 1]);
    var particleSize = d3.scale.linear().domain(linkExtent).range([1, 5]);


    data.links.forEach(function (link) {
      link.freq = frequencyScale(link.o_value);
      link.particleSize = 2;
      link.particleColor = d3.scale.linear().domain([0, 1])
        .range([link.source.color, link.target.color]);
    })

    var t = d3.timer(tick, 1000);
    var particles = [];

    function tick(elapsed, time) {

      particles = particles.filter(function (d) {
        return d.current < d.path.getTotalLength()
      });

      chartContainer.selectAll("path.link")
        .each(
          function (d) {
//        if (d.freq < 1) {
            for (var x = 0; x < 2; x++) {
              var offset = (Math.random() - .5) * (d.dy - 4);
              if (Math.random() < d.freq) {
                var length = this.getTotalLength();
                particles.push({
                  link: d,
                  time: elapsed,
                  offset: offset,
                  path: this,
                  length: length,
                  animateTime: length,
                  speed: 0.5 + (Math.random())
                })
              }
            }

//        }
            /*        else {
             for (var x = 0; x<d.freq; x++) {
             var offset = (Math.random() - .5) * d.dy;
             particles.push({link: d, time: elapsed, offset: offset, path: this})
             }
             } */
          });

      particleEdgeCanvasPath(elapsed);
    }

    function particleEdgeCanvasPath(elapsed) {
      var context = chartContainer.select("canvas")
        .node().getContext("2d")

      context.clearRect(0, 0, 1000, 1000);

      context.fillStyle = "gray";
      context.lineWidth = "1px";
      for (var x in particles) {
        var currentTime = elapsed - particles[x].time;
//        var currentPercent = currentTime / 1000 * particles[x].path.getTotalLength();
        particles[x].current = currentTime * 0.15 * particles[x].speed;
        var currentPos = particles[x].path.getPointAtLength(particles[x].current);
        context.beginPath();
        context.fillStyle = particles[x].link.particleColor(0);
        context.arc(currentPos.x, currentPos.y + particles[x].offset, particles[x].link.particleSize, 0, 2 * Math.PI);
        context.fill();
      }
    }

  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = sankeyparticles;
},{}],27:[function(require,module,exports){
var scatterplot = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var chart = new dex.component(userConfig,
    {
      'parent'           : "#ScatterPlot",
      "id"               : "ScatterPlot",
      "class"            : "ScatterPlot",
      'width'            : "100%",
      'height'           : "100%",
      'csv'              : {
        'header' : ["X", "Y"],
        'data'   : [
          [0, 0],
          [1, 1],
          [2, 4],
          [3, 9],
          [4, 16]
        ],
      },
      'margin'           : {top : 20, right : 15, bottom : 60, left : 60},
      'selectedColor'    : "red",
      'unselectedColor'  : "steelblue",
      'unselectedRadius' : 8,
      'selectedRadius'   : 8,
      'xi'               : 0,
      'yi'               : 1,
      'transform'        : 'scale(.95) translate(60,0)'
    });

  chart.render = function () {
    d3 = dex.charts.d3.d3v3;
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function () {
    d3 = dex.charts.d3.d3v3;
    d3.selectAll("#" + chart.config.id).remove();
    var width = d3.select(chart.config.parent).property("clientWidth");
    var height = d3.select(chart.config.parent).property("clientHeight");
    chart.attr("width", width).attr("height", height).update();
  };

  chart.update = function () {
    d3 = dex.charts.d3.d3v3;
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    //console.log("CONFIG: " + this.config);
    //console.dir(this.registry);

    x = d3.scale.linear()
      .domain([0, d3.max(csv.data, function (d) {
        return d[0];
      })])
      .range([0, config.width]);

    y = d3.scale.linear()
      .domain([0, d3.max(csv.data, function (d) {
        return d[1];
      })])
      .range([config.height, 0]);

    var chartContainer = d3.select(config.parent)
      .append('g')
      .attr('class', config["class"])
      .attr('id', config["id"])
      .attr('transform', config.transform);

    // draw the x axis
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

    var brush = d3.svg.brush()
      .x(x)
      .y(y)
      .on("brushstart", function (d) {
        brushstartHandler({});
      })
      .on("brush", function (d) {
        brushmoveHandler({});
      })
      .on("brushend", function (d) {
        brushendHandler({});
      });

    //console.log("BRUSH: " + brush);

    chartContainer.append('g')
      .attr('transform', 'translate(0,' + config.height + ')')
      .attr('class', 'main axis date')
      .call(xAxis);

    // draw the y axis
    var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    chartContainer.append('g')
      .attr('transform', 'translate(0,0)')
      .attr('class', 'main axis date')
      .call(yAxis);

    var g = chartContainer.append("svg:g")
      .attr("id", "pointContainer")
      .call(brush);

    g.selectAll("scatter-dots")
      .data(csv.data)
      .enter().append("svg:circle")
      .attr("id", "scatter-dot")
      .attr("cx", function (d) {
        return x(d[config.xi]);
      })
      .attr("cy", function (d) {
        return y(d[config.yi]);
      })
      .attr("r", config.unselectedRadius)
      .style("fill", config.unselectedColor)
      .on("mouseover", function (d) {
        mouseOverHandler({node : this, data : d});
      })
      .on("mouseout", function (d) {
        mouseOutHandler({node : this, data : d});
      });

    function brushstartHandler(chartEvent) {
      //console.log("brush start()");
      //console.log("brush empty? " + brush.empty());
      d3.selectAll("#scatter-dot")
        .attr("r", config.unselectedRadius)
        .style("fill", config.unselectedColor);
    }

    function brushmoveHandler(chartEvent) {
      //console.log("brush move(" + brush.extent() + ")");
    }

    function brushendHandler(chartEvent) {
      //console.log("brushend");
      //console.log("FOO: " + chart);
      //this.dump("ScatterPlot.brushendHandler()");
      //console.dir(config);
      //console.dir(registry);
      var extent = brush.extent();
      //console.dir(brush.extent());

      var data = [];

      var active = d3.selectAll("#scatter-dot")
        .filter(function (d, i) {
          //console.dir(extent);
          //console.dir(d);
          if (d[0] >= extent[0][0] && d[0] <= extent[1][0] &&
            d[1] >= extent[0][1] && d[1] <= extent[1][1]) {
            data.push([d[0], d[1]]);
            return this;
          }
          return null;
        })
        .attr("r", config.selectedRadius)
        .style("fill", config.selectedColor);

      chart.publish({type : "brushend", data : data});
    }

    function mouseOverHandler(chartEvent) {
      //console.log("mouseover");
      //console.log("MOUSEOVER: node=" + node + ", data=" + data + ", originator=" + originator);
      // If we're the originator of this event, notify our listeners to
      // update themselves in turn.

      // Pick yourself so you have access to all the D3 goodies you get
      // through selection.
      d3.select(chartEvent.node)
        .style("fill", config.selectedColor)
        .attr("r", config.selectedRadius);

      d3.select("#pointContainer")
        .append("text")
        .attr("x", x(chartEvent.data[0]))
        .attr("y", y(chartEvent.data[1]) - 10)
        .attr("dy", ".35m")
        .style("font-size", 14)
        .attr("text-anchor", "top")
        .attr("fill", "black")
        .text(function (d) {
          return chartEvent.data[1];
        });
    }

    function mouseOutHandler(chartEvent) {
      d3.select("#pointContainer").selectAll("text").remove();
      d3.select(chartEvent.node)
        .style("fill", config.unselectedColor)
        .attr("r", config.unselectedRadius);
    }
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = scatterplot;
},{}],28:[function(require,module,exports){
var sunburst = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent': '#Sunburst',
    // Set these when you need to CSS style components independently.
    'id': 'Sunburst',
    'class': 'Sunburst',
    'resizable': true,
    // Our data...
    'csv': {
      // Give folks without data something to look at anyhow.
      'header': ["X", "Y", "Z"],
      'data': [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    },
    'width': "100%",
    'height': "100%",
    'transform': "translate(0 0)",
    'title': dex.config.text(),
    'label': dex.config.text()
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll(config.parent).selectAll('*').remove();

    var data = dex.csv.toNestedJson(dex.csv.copy(csv));
    //dex.console.log("DATA", csv, data);

    var width = config.width - 10,
      height = config.height - 10,
      radius = Math.min(width, height) / 2;

    var x = d3.scale.linear()
      .range([0, 2 * Math.PI]);

    var y = d3.scale.linear()
      .range([0, radius]);

    var color = d3.scale.category20c();

    var chartContainer = d3.select(config.parent).append("g")
      .attr("class", config["id"])
      .attr("id", config["id"])
      .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

    var partition = d3.layout.partition()
      .value(function (d) {
        return d.size;
      });

    var arc = d3.svg.arc()
      .startAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
      })
      .endAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
      })
      .innerRadius(function (d) {
        return Math.max(0, y(d.y));
      })
      .outerRadius(function (d) {
        return Math.max(0, y(d.y + d.dy));
      });



    //d3.json("https://s3-us-west-2.amazonaws.com/s.cdpn.io/65174/flare.json", function (error, root) {

    var root = data;

      var g = chartContainer.selectAll("g")
        .data(partition.nodes(root))
        .enter().append("g");

      var path = g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
          return color((d.children ? d : d.parent).name);
        })
        .on("click", click);

      var text = g.append("text")
        .call(dex.config.configureText, config.label)
        .attr("transform", function (d) {
          //dex.console.log("D", d);
          return "rotate(" + computeTextRotation(d) + ")";
        })
        .attr("x", function (d) {
          return y(d.y);
        })
        .attr("dx", "6") // margin
        .attr("dy", ".35em") // vertical-align
        .text(function (d) {
          return d.name;
        });

      function click(d) {
        // fade out all text elements
        text.transition().attr("opacity", 0);

        path.transition()
          .duration(750)
          .attrTween("d", arcTween(d))
          .each("end", function (e, i) {
            // check if the animated element's data e lies within the visible angle span given in d
            if (e.x >= d.x && e.x < (d.x + d.dx)) {
              // get a selection of the associated text element
              var arcText = d3.select(this.parentNode).select("text");
              // fade in the text element and recalculate positions
              arcText.transition().duration(750)
                .attr("opacity", 1)
                .attr("transform", function () {
                  return "rotate(" + computeTextRotation(e) + ")"
                })
                .attr("x", function (d) {
                  return y(d.y);
                });
            }
          });
      }

    d3.select(self.frameElement).style("height", height + "px");

// Interpolate the scales!
    function arcTween(d) {
      var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        yd = d3.interpolate(y.domain(), [d.y, 1]),
        yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
      return function (d, i) {
        return i
          ? function (t) {
          return arc(d);
        }
          : function (t) {
          x.domain(xd(t));
          y.domain(yd(t)).range(yr(t));
          return arc(d);
        };
      };
    }

    function computeTextRotation(d) {
      return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
    }

  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = sunburst;
},{}],29:[function(require,module,exports){
var topojsonmap = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var chart = null;

  var defaults = {
    'parent': '#TopoJsonMap',
    'id': 'TopoJsonMap',
    'class': 'TopoJsonMap',
    'toplology': undefined,
    'feature': undefined,
    'projection': d3.geo.albers(),
    'width': '100%',
    'height': '100%',
    'transform': 'translate(0,0)',
    'margin': {
      'left': 10,
      'right': 10,
      'top': 10,
      'bottom': 10
    },
    "selectedColor": "steelblue",
    "unselectedColor": "grey",
  };

  chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    chart.resize = this.resize(chart);
    window.onresize = chart.resize;
    return chart.resize();
  };

  chart.update = function () {
    d3 = dex.charts.d3.d3v3;
    var config = chart.config;
    var margin = config.margin;
    var csv = config.csv;

    var width = config.width - margin.left - margin.right;
    var height = config.height - margin.top - margin.bottom;

    d3.selectAll(config.parent).selectAll("*").remove();

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform)
      .attr('width', config.width)
      .attr('height', config.height);

    var featureBounds,
      geoParent,
      geo,
      geoLayer = {},
      slast,
      tlast;

    var projection = d3.geo.albersUsa()
      .scale(1000)
      .translate([width / 2, height / 2]);

    var path = d3.geo.path()
      .projection(projection);

    var zoom = d3.behavior.zoom()
      .translate([0, 0])
      .scale(1)
      .center([width / 2, height / 2])
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

    var svg = chartContainer;


    function getFeaturesBox() {
      return {
        x: featureBounds[0][0],
        y: featureBounds[0][1],
        width: featureBounds[1][0] - featureBounds[0][0],
        height: featureBounds[1][1] - featureBounds[0][1]
      };
    }

    // fits the geometry layer inside the viewport
    function fitGeoInside() {
      var bbox = getFeaturesBox(),
        scale = 0.95 / Math.max(bbox.width / width, bbox.height / height),
        trans = [-(bbox.x + bbox.width / 2) * scale + width / 2, -(bbox.y + bbox.height / 2) * scale + height / 2];

      geoLayer.scale = scale;
      geoLayer.translate = trans;

      geo.attr('transform', [
        'translate(' + geoLayer.translate + ')',
        'scale(' + geoLayer.scale + ')'
      ].join(' '));

      postTransformOperations(geoLayer.scale);
    }

    // transform geoParent
    function setGeoTransform(scale, trans) {
      zoom.scale(scale)
        .translate(trans);

      tlast = trans;
      slast = scale;

      geoParent.attr('transform', [
        'translate(' + trans + ')',
        'scale(' + scale + ')'
      ].join(' '));

      postTransformOperations(scale * geoLayer.scale);

    }

    // scale strokes for fussy browsers
    function postTransformOperations(scale) {
      geo.selectAll('path')
        .style('stroke-width', 1 / scale);
    }

    // limits panning
    // XXX: this could be better
    function limitBounds(scale, trans) {

      var bbox = getFeaturesBox();
      var outer = width - width * scale;
      var geoWidth = bbox.width * geoLayer.scale * scale,
        geoLeft = -((width * scale) / 2 - ((geoWidth) / 2)),
        geoRight = outer - geoLeft;


      if (scale === slast) {
        //trans[0] = Math.min(0, Math.max(trans[0], width - width * scale));
        trans[1] = Math.min(0, Math.max(trans[1], height - height * scale));

        if (geoWidth > width) {
          if (trans[0] < tlast[0]) { // panning left
            trans[0] = Math.max(trans[0], geoRight);
          } else if (trans[0] > tlast[0]) { // panning right
            trans[0] = Math.min(trans[0], geoLeft);
          }
        } else {

          if (trans[0] < geoLeft) {
            trans[0] = geoLeft;
          } else if (trans[0] > geoRight) {
            trans[0] = geoRight;
          }
        }
      }

      setGeoTransform(scale, trans);
    }

    // zoom behavior on 'zoom' handler
    function zoomed() {
      var e = d3.event,
        scale = (e && e.scale) ? e.scale : zoom.scale(),
        trans = (e && e.translate) ? e.translate : zoom.translate();

      limitBounds(scale, trans);
    }

    // set the map's initial state
    // geoParent layer to scale 1
    // geo layer is scaled to fit viewport
    function initialize() {
      tlast = null;
      slast = null;
      setGeoTransform(1, [0, 0]);
      fitGeoInside();
    }

    // load topojson & make map

    dex.console.log("CONFIG", config);
    var topology = chart.config.toplogy;

    var features = topojson.feature(config.topology, config.feature).features;

    var collection = {
      'type': 'FeatureCollection',
      'features': features
    };

    featureBounds = path.bounds(collection);

    geoParent = svg.append("g");

    geoParent
      .append('rect')
      .attr('class', 'bg')
      .attr('pointer-events', 'none')
      .attr('fill', 'none')
      .attr('width', width)
      .attr('height', height);

    geo = geoParent.append("g");

    geo.selectAll('.feature')
      .data(features)
      .enter()
      .append("path")
      .attr("class", "feature")
      .attr("d", path);


    svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .call(zoom);

    initialize();

  };
  return chart;
};

module.exports = topojsonmap;
},{}],30:[function(require,module,exports){
var treemap = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var chart = null;

  var defaults = {
    'parent': '#Treemap',
    // Set these when you need to CSS style components independently.
    'id': 'Treemap',
    'class': 'Treemap',
    'resizable': true,
    // Our data...
    'csv': undefined,
    'title': 'Level: ',
    'margin': {
      'left': 10,
      'right': 10,
      'top': 25,
      'bottom': 10
    },
    'shader': {
      'type': 'darken',
      'increment': .1
    },
    'manualSizing': false,
    'width': '100%',
    'height': '100%',
    'transform': '',
    'color': d3.scale.category10(),
    'navbar': dex.config.rectangle({
      'fill.fillColor': 'steelblue',
      'y': function () {
        return -chart.config.margin.top;
      },
      'width': function () {
        return chart.config.width
          - chart.config.margin.left - chart.config.margin.right;
      },
      'height': function () {
        return chart.config.margin.top;
      }
    }),
    'navbarLabel': dex.config.text({
      'x': 6,
      'y': function () {
        return 6 - chart.config.margin.top;
      },
      'dy': '.75em',
      'fill.fillColor': 'white'
    }),
    'label': dex.config.text({
      //'dy': '1em',
      'fill.fillColor': 'white',
//      'font.size': function (d) {
//       return 16;
//      }
    })
  };

  var chart = new dex.component(userConfig, defaults);
  var color = config.color;

  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    chart.resize = this.resize(chart);
    window.onresize = chart.resize;
    return chart.resize();
  };

  chart.update = function update() {
    d3 = dex.charts.d3.d3v3;
    var config = chart.config;
    var margin = config.margin;
    var csv = config.csv;

    var width = config.width - margin.left - margin.right;
    var height = config.height - margin.top - margin.bottom;

    d3.selectAll(config.parent).selectAll("*").remove();

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr('width', config.width)
      .attr('height', config.height)
      .attr("transform", config.transform);

    var chartG = chartContainer
      .append('g')
      .attr('transform', 'translate(' +
        margin.left + ',' + margin.top + ')');

    var formatNumber = d3.format(",d");
    var transitioning;

    var x = d3.scale.linear()
      .domain([0, width])
      .range([0, width]);

    var y = d3.scale.linear()
      .domain([0, height])
      .range([0, height]);

    var tmap = d3.layout.treemap()
      .children(function (d, depth) {
        return depth ? null : d._children;
      })
      .value(function (d) {
        return d.size;
      })
      .sort(function (a, b) {
        return a.size - b.size;
      })
      .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
      .round(false);

    var grandparent = chartG.append("g")
      .attr("class", "grandparent");

    grandparent.append("rect")
      .call(dex.config.configureRectangle, config.navbar);

    grandparent.append("text")
      .call(dex.config.configureText, config.navbarLabel);

    var chartData = dex.csv.toNestedJson(csv, config.manualSizing);

    //dex.console.log("chartData", chartData);

    initialize(chartData);
    accumulate(chartData);
    layout(chartData);
    display(chartData);

    function initialize(root) {
      root.x = root.y = 0;
      root.dx = width;
      root.dy = height;
      root.depth = 0;
    }

    // Aggregate the values for internal nodes. This is normally done by the
    // treemap layout, but not here because of our custom implementation.
    // We also take a snapshot of the original children (_children) to avoid
    // the children being overwritten when when layout is computed.
    function accumulate(d) {
      return (d._children = d.children)
        ? d.size = d.children.reduce(function (p, v) {
          return p + accumulate(v);
        }, 0)
        : d.size;
    }

    // Compute the treemap layout recursively such that each group of siblings
    // uses the same size (1×1) rather than the dimensions of the parent cell.
    // This optimizes the layout for the current zoom state. Note that a wrapper
    // object is created for the parent node for each group of siblings so that
    // the parent’s dimensions are not discarded as we recurse. Since each group
    // of sibling was laid out in 1×1, we must rescale to fit using absolute
    // coordinates. This lets us use a viewport to zoom.
    function layout(d) {
      if (d._children) {
        tmap.nodes({_children: d._children});
        d._children.forEach(function (c) {
          c.x = d.x + c.x * d.dx;
          c.y = d.y + c.y * d.dy;
          c.dx *= d.dx;
          c.dy *= d.dy;
          c.parent = d;
          layout(c);
        });
      }
    }

    function display(d) {
      grandparent
        .datum(d.parent)
        .on("click", transition)
        .select("text")
        .text(config.title + name(d));

      var g1 = chartG.insert("g", ".grandparent")
        .datum(d)
        .attr("class", "depth");

      var g = g1.selectAll("g")
        .data(d._children)
        .enter().append("g");

      g.filter(function (d) {
        return d._children;
      })
        .classed("children", true)
        .on("click", transition);

      g.selectAll(".child")
        .data(function (d) {
          return d._children || [d];
        })
        .enter().append("rect")
        .attr("class", "child")
        .call(rect);

      g.append("rect")
        .attr("class", "parent")
        .call(rect)
        .append("title")
        .text(function (d) {
          return formatNumber(d.size);
        });

      g.append("text")
      //.call(dex.config.configureText, config.label)
        .text(function (d) {
          return d.name;
        })
        .call(text)
        .style("font-size", "1px")
        .each(getSize)
        .style("font-size", function (d) {
          return Math.min(64, d.scale) + "px";
        })
        .style('fill', 'white')
        .attr('text-anchor', 'start')
        .style('alignment-baseline', 'hanging')
        .attr('dy', '1px')
        .attr('dy', '.1em');

      // AWESOME Text Fitter
      function getSize(d) {
        var bbox = this.getBBox();
        var cbbox = this.parentNode.getBBox();
        var hMargin = Math.min(30, cbbox.height * .1);
        var wMargin = Math.min(30, cbbox.width * .1);
        var wscale = Math.min((cbbox.width - wMargin) / bbox.width);
        var hscale = Math.min((cbbox.height - hMargin) / bbox.height);

        d.scale = Math.min(wscale, hscale);
        d.hscale = hscale;
        d.wscale = wscale;
        d.bbox = bbox;
        d.cbox = cbbox;
      }

      function transition(d) {
        if (transitioning || !d) return;
        transitioning = true;

        //dex.console.log("DISPLAY", d);

        var g2 = display(d),
          t1 = g1.transition().duration(300),
          t2 = g2.transition().duration(300);

        // Update the domain only after entering new elements.
        x.domain([d.x, d.x + d.dx]);
        y.domain([d.y, d.y + d.dy]);

        // Enable anti-aliasing during the transition.
        chartG.style("shape-rendering", null);

        // Draw child nodes on top of parent nodes.
        chartG.selectAll(".depth").sort(function (a, b) {
          return a.depth - b.depth;
        });

        // Fade-in entering text.
        g2.selectAll("text")
          .style("fill-opacity", 0);

        // Transition to the new view.
        t1.selectAll("rect").call(rect);
        t2.selectAll("rect").call(rect);
        //t1.selectAll("text").call(text).style("fill-opacity", 0);
        //t2.selectAll("text").call(text).style("fill-opacity", 1);

        // Remove the old node when the transition is finished.
        t1.remove().each("end", function () {
          chartG.style("shape-rendering", "crispEdges");
          transitioning = false;
        });

        // Text resizing breaks if I do it mid-transition.
        t2.each("end", function () {
          g2.selectAll("text")
            .call(text)
            .style("font-size", "1px")
            .each(getSize)
            .style("font-size", function (d) {
              return Math.min(64, d.scale) + "px";
            })
            .attr('text-anchor', 'start')
            .style('alignment-baseline', 'hanging')
            .style('fill', 'white')
            .style("fill-opacity", 1)
            .attr('dx', '0')
            .attr('dy', '1px');
        })
      }

      return g;
    }

    function text(text) {
      text.attr("x", function (d) {
        return x(d.x);
      })
        .attr("y", function (d) {
          return y(d.y);
        });
    }

    function rect(rect) {
      var shader = {};
      rect.attr("x", function (d) {
        return x(d.x);
      })
        .attr("y", function (d) {
          return y(d.y);
        })
        .attr("width", function (d) {
          return x(d.x + d.dx) - x(d.x);
        })
        .attr("height", function (d) {
          return y(d.y + d.dy) - y(d.y);
        })
        .style("fill", function (d) {
          if (!(d.parent.name in shader)) {
            shader[d.parent.name] = {'currentShade': 0};
          }
          if (!(d.name in shader[d.parent.name])) {
            shader[d.parent.name][d.name] = shader[d.parent.name].currentShade;
            shader[d.parent.name].currentShade += config.shader.increment;
          }
          //dex.console.log("SHADING-RECT", d, shader[d.parent.name]);

          if (config.shader.type == 'darken') {
            return d3.rgb(color(d.parent.name))
              .darker(shader[d.parent.name][d.name]);
          }
          else if (config.shader.type == 'lighten') {
            return d3.rgb(color(d.parent.name))
              .brighter(shader[d.parent.name][d.name]);
          }
          else {
            return color(d.parent.name);
          }
        });
    }

    function name(d) {
      dex.console.log("NAME", d);
      return d.parent
        ? name(d.parent) + " > " + d.name + " (" +
        formatNumber(d.size) + ")"
        : d.name + " (" + formatNumber(d.size) + ")";
    }

    return chart;
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = treemap;
},{}],31:[function(require,module,exports){
var treemapBarChart = function (userConfig) {
  d3 = dex.charts.d3.d3v4;
  var chart;

  var defaults = {
    // The parent container of this chart.
    'parent': '#TreemapBarChart',
    // Set these when you need to CSS style components independently.
    'id': 'TreemapBarChart',
    'class': 'TreemapBarChart',
    'resizable': true,
    // Our data...
    'csv': {
      // HERE IS THE STOP POINT...
      // Give folks without data something to look at anyhow.
      'header': ["Country", "Continent", "Trade Indicator", "Year", 'Gross'],
      'data': [
        ['US', 'North America', 'Imports', 2000, 10000000],
        ['US', 'North America', 'Exports', 2000, 10000000],
        ['US', 'North America', 'Imports', 2001, 15000000],
        ['US', 'North America', 'Exports', 2001, 30000000],
        ['Japan', 'Asia', 'Imports', 2000, 5000000],
        ['Japan', 'Asia', 'Exports', 2000, 30000000],
        ['Japan', 'Asia', 'Imports', 2001, 6000000],
        ['Japan', 'Asia', 'Exports', 2001, 30000000],
        ['Canada', 'North America', 'Imports', 2000, 6000000],
        ['Canada', 'North America', 'Exports', 2000, 4000000],
        ['Canada', 'North America', 'Imports', 2001, 3000000],
        ['Canada', 'North America', 'Exports', 2001, 1000000],
      ]
    },
    'index': {
      'divider': 0,
      'color': 1,
      'category': 2,
      'x': 3,
      'value': 4
    },
    'width': "100%",
    'height': "100%",
    'transform': "translate(0 0)",
    'colorScheme': d3.schemeCategory20,
    // <text fill="#000" y="9" x="0.5" dy="0.71em">Property Crime</text>
    // <text fill="#000" y="9" x="0.5" dy=".71em" dx="0" font-family="sans-serif" font-size="14" font-weight="normal" font-style="normal" text-decoration="none" word-spacing="normal" letter-spacing="normal" variant="normal" transform="" style="text-anchor: start; fill: grey; fill-opacity: 1;">Violent Crime</text>
    'categoryLabel': dex.config.text({
        "x": .5,
        "y": 9,
        "dy": ".71em",
        'font' : dex.config.font({'size': 10}),
        'anchor': 'middle'
      }
    ),
    'margin': {
      'top': 25,
      'right': 15,
      'bottom': 50,
      'left': 60
    },
    // <text fill="#000" y="3" x="0.5" dy="0.71em">2000</text>
    'xLabel': dex.config.text({
        "x": .5,
        "y": 15,
        "dy": ".71em",
        'font.size': 16,
        'fill.fillColor': 'steelblue',
        'anchor': 'middle'
      }
    )
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function render() {
    d3 = dex.charts.d3.d3v4;
    chart.resize = this.resize(chart);
    window.onresize = chart.resize;
    return chart.resize();
  };

  chart.update = function update() {
    d3 = dex.charts.d3.d3v4;
    var margin = config.margin;
    var width = config.width - margin.left - margin.right;
    var height = config.height - margin.top - margin.bottom;

    d3.selectAll(config.parent).selectAll("*").remove();

    var chartContainer = d3.select(config.parent)
      .append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform)
      .attr('width', config.width)
      .attr('height', config.height);

    var colorDomain = dex.csv.uniqueArray(config.csv, config.index.color);
    var categoryDomain = dex.csv.uniqueArray(config.csv, config.index.category);
    //dex.console.log("COLOR-DOMAIN", colorDomain, "CATEGORY-DOMAIN", categoryDomain);
    //var orderedContinents = ['Asia', 'North America', 'Europe', 'South America', 'Africa', 'Australia']
    var color = d3.scaleOrdinal()
      .domain(colorDomain)
      .range(config.colorScheme)

    /*
     var dollarFormat = d3.format('$,')
     var tickFormat = function (n) {
     return n === 0 ? '$0'
     : n < 1000000 ? dollarFormat(n / 1000) + ' billion'
     : dollarFormat(n / 1000000) + ' trillion'
     }
     */

    var options = {
      key: config.csv.header[config.index.value],
      divider: null
    }

    var chartData = csvToJson(config.csv, []);

    function csvToJson(csv, hierarchy) {
      var csvStr = csv.header.join(",") + "\n";
      csv.data.forEach(function (row) {
        csvStr += row.join(",") + "\n";
      })
      var data = d3.csvParse(csvStr);
      var jsonData = d3.nest()
        .key(function (d) {
          return d[config.csv.header[config.index.x]]
        })
        .sortKeys(d3.ascending)
        .key(function (d) {
          return d[config.csv.header[config.index.category]]
        })
        .sortKeys(d3.ascending)
        .key(function (d) {
          return d[config.csv.header[config.index.color]]
        })
        .sortKeys(d3.ascending)
        .entries(data)
        .map(function (d) {
          return {
            "x": d.key,
            "children": d.values.map(function (d) {
              return {
                "divider": d.key,
                "children": d.values.map(function (d) {
                  return {
                    "color": d.key,
                    "children": d.values
                  };
                })
              };
            })
          };
        });
      return {"children": jsonData};
    }

    var root = d3.hierarchy(chartData).sum(function (d) {
      return d[options.key]
    })
    var xData = root.children

    xData.sort(function (a, b) {
      return a.data.x - b.data.x
    })

    var svg = chartContainer
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var x0 = d3.scaleBand()
      .domain(xData.map(function (d) {
        return d.data.x
      }).sort())
      .range([0, width])
      .padding(0.15)

    // REM

    var x1 = d3.scaleBand()
      .domain(categoryDomain)
      .rangeRound([0, x0.bandwidth()])
      .paddingInner(0.1)

    var y = d3.scaleLinear()
      .domain([0, d3.max(xData, function (d) {
        return d3.max(d.children, function (e) {
          return e.value
        })
      })]).nice()
      .range([0, height])

    var x0Axis = d3.axisBottom()
      .scale(x0)
      .tickSize(0)

    var x1Axis = d3.axisBottom()
      .scale(x1)

    var yAxis = d3.axisLeft()
      .tickSize(-width)
      //.tickFormat(tickFormat)
      .scale(y.copy().range([height, 0]))

    svg.append('g')
      .attr('class', 'x0 axis')
      .attr('transform', 'translate(0,' + (height + 22) + ')')
      .call(x0Axis)

    var gy = svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)

    var xs = svg.selectAll('.x')
      .data(xData, function (d) {
        return d.data.x
      })
      .enter().append('g')
      .attr('class', 'x')
      .attr('transform', function (d) {
        return 'translate(' + x0(d.data.x) + ',0)'
      })

    xs.append('g')
      .attr('class', 'x1 axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(x1Axis)

    d3.select('#inflation-adjusted').on('change', function () {
      options.key = this.checked ? 'adj_value' : 'value';
      tmUpdate();
    })

    tmUpdate();

    function sum(d) {
      //dex.console.log("SUM:", d[config.csv.header[config.index.divider]], "OPTS", options)
      return !options.divider ||
      options.divider === d[config.csv.header[config.index.divider]] ? d[options.key] : 0;
    }

    function tmUpdate() {
      d3 = dex.charts.d3.d3v4;
      root.sum(sum)

      var t = d3.transition()

      var dividerData = d3.merge(xData.map(function (d) {
        return d.children
      }))

      y.domain([0, d3.max(dividerData.map(function (d) {
        return d.value
      }))]).nice()

      // We use a copied Y scale to invert the range for display purposes
      yAxis.scale(y.copy().range([height, 0]))
      gy.transition(t).call(yAxis)

      var dividers = xs.selectAll('.divider')
        .data(function (d) {
            return d.children
          },
          function (d) {
            return d.data.divider
          })
        .each(function (d) {
          // UPDATE
          // The copied branches are orphaned from the larger hierarchy, and must be
          // updated separately (see note at L152).
          d.treemapRoot.sum(sum)
          d.treemapRoot.children.forEach(function (d) {
            d.sort(function (a, b) {
              return b.value - a.value
            })
          })
        })

      dividers = dividers.enter().append('g')
        .attr('class', 'divider')
        .attr('transform', function (d) {
          return 'translate(' + x1(d.data.divider) + ',' + height + ')'
        })
        .each(function (d) {
          // ENTER
          // Note that we can use .each on selections as a way to perform operations
          // at a given depth of the hierarchy tree.
          d.children.sort(function (a, b) {
            return colorDomain.indexOf(b.data.color) -
              colorDomain.indexOf(a.data.color)
          })
          d.children.forEach(function (d) {
            d.sort(function (a, b) {
              return b.value - a.value
            })
          })
          d.treemap = d3.treemap().tile(d3.treemapResquarify)

          // The treemap layout must be given a root node, so we make a copy of our
          // child node, which creates a new tree from the branch.
          d.treemapRoot = d.copy()
        })
        .merge(dividers)
        .each(function (d) {
          // UPDATE + ENTER
          d.treemap.size([x1.bandwidth(), y(d.value)])(d.treemapRoot)
        })

      // d3.hierarchy gives us a convenient way to access the parent datum. This line
      // adds an index property to each node that we'll use for the transition delay.
      root.each(function (d) {
        d.index = d.parent ? d.parent.children.indexOf(d) : 0
      })

      dividers.transition(t)
        .delay(function (d, i) {
          return d.parent.index * 150 + i * 50
        })
        .attr('transform', function (d) {
          return 'translate(' + x1(d.data.divider) + ',' + (height - y(d.value)) + ')'
        })

      var colors = dividers.selectAll('.color')
      // Note that we're using our copied branch.
        .data(function (d) {
            return d.treemapRoot.children
          },
          function (d) {
            return d.data.color
          })

      colors = colors.enter().append('g')
        .attr('class', 'color')
        .merge(colors)

      var countries = colors.selectAll('.divider')
        .data(function (d) {

            return d.children
          },
          function (d) {
            //dex.console.log("COUNTRY-DATA", d, d.data[config.csv.header[config.index.divider]])
            return d.data[config.csv.header[config.index.divider]]
          })

      var enterCountries = countries.enter().append('rect')
        .attr('class', 'divider')
        .attr('x', function (d) {
          return d.value ? d.x0 : x1.bandwidth() / 2
        })
        .attr('width', function (d) {
          return d.value ? d.x1 - d.x0 : 0
        })
        .attr('y', 0)
        .attr('height', 0)
        .style('fill', function (d) {
          //dex.console.log("COLOR", d.parent.data.color)
          return color(d.parent.data.color)
        })

      countries = countries.merge(enterCountries)

      enterCountries
        .on('mouseover', function (d) {
          chart.publish({"type" : "mouseover", "selected" : d});
          svg.classed('hover-active', true)
          countries.classed('hover', function (e) {
            //dex.console.log("E-HOVER", e.data[config.csv.header[config.index.divider]], d.data[config.csv.header[config.index.divider]])
            return e.data[config.csv.header[config.index.divider]] === d.data[config.csv.header[config.index.divider]]
          })
        })
        .on('mouseout', function () {
          chart.publish({"type" : "mouseout", "selected" : this });
          svg.classed('hover-active', false)
          countries.classed('hover', false)
        })
        .on('click', function (d) {

          //dex.console.log("ON-CLICK", options, d, d.data[config.csv.header[config.index.divider]])
          chart.publish({"type" : "click", "selected" : d});
          options.divider = options.divider === d.data[config.csv.header[config.index.divider]] ? null : d.data[config.csv.header[config.index.divider]]
          tmUpdate()
        })
        .append('title')
        .text(function (d) {
          return (
          config.csv.header[config.index.color] +
          " = " + d.data[config.csv.header[config.index.color]] +
          "\n" + config.csv.header[config.index.divider] +
          "  = " + d.data[config.csv.header[config.index.divider]] +
          "\n" + config.csv.header[config.index.value] + " = " +
          d.data[config.csv.header[config.index.value]]);
        });

      countries.filter(function (d) {
        return d.data[config.csv.header[config.index.divider]] === options.divider
      })
        .each(function (d) {
          d3.select(this.parentNode).raise()
        })
        .raise()

      countries
        .transition(t)
        .attr('x', function (d) {
          return d.value ? d.x0 : x1.bandwidth() / 2
        })
        .attr('width', function (d) {
          return d.value ? d.x1 - d.x0 : 0
        })
        .attr('y', function (d) {
          return d.value ? d.y0 : d.parent.parent.y1 / 2
        })
        .attr('height', function (d) {
          return d.value ? d.y1 - d.y0 : 0
        })

      d3 = dex.charts.d3.d3v3;
    }

    // Style category axis
    catAxisG = d3.select(config.parent).selectAll(".x1");
    //dex.console.log("CatAxisG", catAxisG);
    catAxisG.selectAll("text")
      .call(dex.config.configureText, config.categoryLabel);

    // Styling x axis
    xAxisG = d3.select(config.parent).selectAll(".x0");
    //dex.console.log("CatAxisG", catAxisG);
    xAxisG.selectAll("text")
      .call(dex.config.configureText, config.xLabel);

    return chart;
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(sankey.config.parent).draggable();
  });

  return chart;
};

module.exports = treemapBarChart;
},{}],32:[function(require,module,exports){
var verticallegend = function (userConfig) {

  var defaults = {
    'labels'          : ["A", "B", "C"],
    'id'              : "VerticalLegend",
    'class'           : "VerticalLegend",
    'resizeable'      : false,
    'parent'          : null,
    'height'          : 250,
    'width'           : 250,
    //'transform'       : 'translate(100,100)',
    //'xoffset'         : 50,
    //'yoffset'         : 30,
    //'cellWidth'       : 30,
    //'cellHeight'      : 20,
    'tickLength'      : 5,
    'caption'         : "Legend",
    'captionFontSize' : 14,
    'captionXOffset'  : -30,
    'captionYOffset'  : -20,
    'margin'          : {
      'top'    : 10,
      'bottom' : 10,
      'left'   : 20,
      'right'  : 10
    },
    'cell'            : {
      'appearance.mouseover.rect.width' : 35,
      'appearance.mouseout.rect.width'  : 30,
      'appearance.mousedown.rect.width' : 50,
      'appearance.mouseup.rect.width'   : 35,
      'rect'                            : dex.config.rectangle({
        'width'  : 30,
        'height' : 20,
        'y'      : function (d) {
          return chart.config.yscale(d);
        },
        'x'      : function (d) {
          return chart.config.width / 10;
        },
        'events' : {
          'mouseover' : function (d, i) {
            dex.console.log("mouseover event(d=" + d + ", i=" + i + ")");
            //dex.console.log("this", d3.select(this), "Mouseover config",
            //chart.config);
            //dex.console.log("cell.events.mouseover.config",
            //  chart.config.cell.appearance.mouseover);
            d3.select(this).call(dex.config.configureRectangle,
              chart.config.cell.appearance.mouseover.rect);
            chart.publish({"type" : "mouseover", "d" : d});
          },
          'mouseout'  : function (d) {
            dex.console.log("mouseout event(d=" + d + ", i=" + i + ")");
            d3.select(this).call(dex.config.configureRectangle,
              chart.config.cell.appearance.mouseout.rect);
            chart.publish({"type" : "mouseout", "d" : d});
          },
          'mousedown' : function (d) {
            dex.console.log("mousedown event(d=" + d + ", i=" + i + ")");
            d3.select(this).call(dex.config.configureRectangle,
              chart.config.cell.appearance.mousedown.rect);
            chart.publish({"type" : "mousedown", "d" : d});
          },
          'mouseup'   : function (d) {
            dex.console.log("mouseup event(d=" + d + ", i=" + i + ")");
            d3.select(this).call(dex.config.configureRectangle,
              chart.config.cell.appearance.mouseup.rect);
            chart.publish({"type" : "mouseup", "d" : d});
          }
        }
      }),
      'label'                           : dex.config.text({
        'text'        : function (d) {
          return d;
        },
        'font.scale'  : function (d) {
          dex.console.log("FONT.SCALE: width=" + chart.config.width + 'x' + chart.config.height);
          var scale = d3.scale.linear()
            .domain([0, 150])
            .range([0, 32]);
          return scale;
        },
        'font.weight' : "bold",
        'font.size'   : function (d) {
          dex.console.log("FONT-SIZE: width=" + chart.config.width +
          ", height=" + chart.config.height +
          ", fontScale=" + chart.config.cell.label.font.scale()(chart.config.width * .2));
          return chart.config.cell.label.font.scale()(chart.config.width * .2);
        },
        'anchor'      : 'end',
        'y'           : function (d) {
          return chart.config.yscale(d);
        },
        'dx'          : function (d, i) {
          dex.console.log("dx", chart.config.cell.label.font.size(d));
          return -1 * chart.config.cell.label.font.size(d) / 2;
          //dex.console.log("this", this, "select(this)", d3.select(this), chart.config);
          //return -(chart.config.cell.label.font.size / 2);
        },
        'dy'          : function (d, i) {
          //dex.console.log("CURENT-FONT-SIZE " + chart.config.cell.label.font.size(d))
          ;         // return Math.floor(chart.config.cell.rect.height / 2);// + Math.floor(chart.config.cell.label.font.size(d) / 2);
          return 0;
        },
        'fill'        : dex.config.fill({'fillColor' : 'black'})
      })
    },
    'title'           : dex.config.text({
      'text'       : 'title.text',
      'anchor'     : 'middle',
      'font.scale' : function (d) {
        dex.console.log("TITLE.FONT.SCALE: width=" + chart.config.width + 'x' + chart.config.height);
        var scale = d3.scale.linear()
          .domain([0, 200])
          .range([4, 64]);
        return scale;
      },
      'font.size'  : function (d) {
        dex.console.log("TITLE-FONT-SIZE: width=" + chart.config.width +
        ", height=" + chart.config.height +
        ", fontScale=" + chart.config.cell.label.font.scale()(
          Math.min(chart.config.width, chart.config.height) / 5));
        return chart.config.title.font.scale()
        (Math.min(chart.config.width, chart.config.height) * .2);
      },
      'y'          : function (d) {
        return chart.config.height / 12;
      },
      'x'          : function (d) {
        return chart.config.width / 10 + chart.config.cell.rect.width / 2;
      }
    })
  };

  // Create our chart.
  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizeable) {

      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      var cellWidth = width * .4;
      var cellHeight = height * .8 / (chart.config.labels.length + 1);
      dex.console.log("Resizing VerticalLegend: " + width + "x" + height);
      chart
        .attr("width", width)
        .attr("height", height)
        .attr("cell.rect.width", cellWidth)
        .attr("cell.rect.height", cellHeight)
        .attr("margin.top", height * .1)
        .attr("margin.bottom", height * .1)
        .attr("margin.left", width * .1)
        .attr("margin.right", width * .1)
        .attr("cell.appearance.mouseover.rect.width", cellWidth * 1.1)
        .attr("cell.appearance.mouseout.rect.width", cellWidth)
        .attr("cell.appearance.mousedown.rect.width", cellWidth * 1.2)
        .attr("cell.appearance.mouseup.rect.width", cellWidth * 1.1)
        .attr("cell.label.dx", width * .4)
        .attr("cell.rect.x", width * .5)
        .attr("title.y", height * .08)
        .attr("title.x", width * .4 + cellWidth / 2)
        .attr("cell.label.x", width * .1)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = this.config;
    dex.console.log("RESIZE");
    dex.console.log(config.id + ": " + config.width + "x" + config.height);
    d3.selectAll("#" + config.id).remove();

    config.yscale = d3.scale.ordinal()
      .domain(config.labels)
      .rangeBands([config.margin.top, config.height - config.margin.bottom]);

    // Append a graphics node to the supplied svg node.
    var chartContainer = d3.select(config.parent).append("g")
      .attr("id", config["id"])
      .attr("class", config["class"])
      .attr("transform", config.transform);

    var rects = chartContainer.selectAll("rect")
      .data(config.labels)
      .enter()
      .append("rect")
      .call(dex.config.configureRectangle, config.cell.rect);

    chartContainer.selectAll("label")
      .data(config.labels)
      .enter().append("text")
      .call(dex.config.configureText, config.cell.label);

    chartContainer.append("text")
      .call(dex.config.configureText, config.title)
      .text(config.title.text);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = verticallegend;
},{}],33:[function(require,module,exports){
/**
 *
 * This module provides D3 based visualization components.
 *
 * @module dex/charts/d3
 * @name d3
 * @memberOf dex.charts
 *
 */
var d3 = {};

d3.d3v4 = require("../../../lib/d3.v4.4.0.min");
d3.d3v3 = require("../../../lib/d3.v3.5.17.min");

//d3.Axis = require("./Axis");
d3.Chord = require("./Chord");
d3.ClusteredForce = require("./ClusteredForce");
d3.Dendrogram = require("./Dendrogram");
//d3.HeatMap = require("./HeatMap");
//d3.HorizonChart = require("./../../../graveyard/HorizonChart");
d3.HorizontalLegend = require("./HorizontalLegend");
//d3.LineChart = require("./LineChart");
d3.MotionBarChart = require("./MotionBarChart");
d3.MotionChart = require("./MotionChart");
d3.MotionCircleChart = require("./MotionCircleChart");
d3.MotionLineChart = require("./MotionLineChart");
d3.OrbitalLayout = require("./OrbitalLayout");
d3.ParallelCoordinates = require("./ParallelCoordinates");
d3.PieChart = require("./PieChart");
d3.RadarChart = require("./RadarChart");
d3.RadialTree = require("./RadialTree");
d3.Sankey = require("./Sankey");
d3.SankeyParticles = require("./SankeyParticles");
d3.ScatterPlot = require("./ScatterPlot");
d3.Sunburst = require("./Sunburst");
//d3.TitledTreemap = require("./TitledTreemap");
d3.Treemap = require("./Treemap");
d3.VerticalLegend = require("./VerticalLegend");
d3.TreemapBarChart = require("./TreemapBarChart");
d3.TopoJsonMap = require("./TopoJsonMap");

module.exports = d3;
},{"../../../lib/d3.v3.5.17.min":1,"../../../lib/d3.v4.4.0.min":2,"./Chord":12,"./ClusteredForce":13,"./Dendrogram":14,"./HorizontalLegend":15,"./MotionBarChart":16,"./MotionChart":17,"./MotionCircleChart":18,"./MotionLineChart":19,"./OrbitalLayout":20,"./ParallelCoordinates":21,"./PieChart":22,"./RadarChart":23,"./RadialTree":24,"./Sankey":25,"./SankeyParticles":26,"./ScatterPlot":27,"./Sunburst":28,"./TopoJsonMap":29,"./Treemap":30,"./TreemapBarChart":31,"./VerticalLegend":32}],34:[function(require,module,exports){
var ringnetwork = function (userConfig) {
  d3 = dex.charts.d3.d3v3;
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent': '#RingNetwork',
    // Set these when you need to CSS style components independently.
    'id': 'RingNetwork',
    'class': 'RingNetwork',
    'resizable': true,
    // Our data...
    'csv': {
      // Give folks without data something to look at anyhow.
      'header': ["NAME", "GENDER", "VEHICLE"],
      'data': [
        ["JIM", "M", "CAR"],
        ["JOE", "M", "CAR"],
        ["PAT", "M", "TRUCK"],
        ["SALLY", "F", "TRUCK"]
      ]
    },
    'type' : "rings",
    'connect': 'last',
    //'connect' : 'all',
    'width': "100%",
    'height': "100%",
    'transform': "translate(0 0)",
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    d3 = dex.charts.d3.d3v3;
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    d3 = dex.charts.d3.d3v3;
    if (chart.config.resizable) {
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      dex.console.log(chart.config.id + ": resize(" + width + "," + height + ")");
      chart.attr("width", width).attr("height", height).update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function () {
    d3 = dex.charts.d3.d3v3;
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    var connections = [];

    var rootMap = {};
    var cmap = {};

    // Connect everything in the row to the first column.
    //if (config.connect == 'first') {
    // TODO: Support other connection models here.
    for (var ri = 0; ri < csv.data.length; ri++) {
      if (_.isUndefined(rootMap[csv.data[ri][0]])) {
        connections.push({'source': csv.header[0], 'target': csv.data[ri][0]});
        rootMap[csv.data[ri][0]] = 1;
      }

      for (var ci = 1; ci < csv.header.length; ci++) {
        var src = csv.data[ri][0];
        var dest = csv.data[ri][ci];

        if (_.isUndefined(cmap[src + " -> " + dest])) {
          connections.push({'source': src, 'target': dest});
          cmap[src + " -> " + dest] = 1;
        }
      }
    }

    //dex.console.log("Connections", connections);

    // instantiate d3plus
    var viz = d3plus.viz()
      .container(config.parent)
      .type(config.type)
      .edges(connections)
      .focus(csv.header[0]);

    if (config.edges) {
      viz.edges(config.edges);
    }

    viz.draw();
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = ringnetwork;
},{}],35:[function(require,module,exports){
/**
 *
 * This module provides d3plus based visualizations.
 *
 * @module dex/charts/d3plus
 * @name d3plus
 * @memberOf dex.charts
 *
 */
var d3plus = {};

d3plus.RingNetwork = require("./RingNetwork");

module.exports = d3plus;
},{"./RingNetwork":34}],36:[function(require,module,exports){
/**
 * This will construct a new DygraphsLineChart with the user supplied userConfig applied.
 * @param userConfig - A user supplied configuration of the form:
 * @returns {DexComponent} The LineChart
 * @constructor
 *
 */
var linechart = function (userConfig) {
  var defaults =
  {
    'parent'    : null,
    'id'        : "DygraphsLineChart",
    "class"     : "DygraphsLineChart",
    'csv'       : {
      'header' : ["X", "Y"],
      'data'   : [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16]
      ]
    },
    'width'     : 600,
    'height'    : 400,
    'transform' : '',
    'options'   : {}
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    this.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    var csvIndices = dex.range(0, csv.header.length);
    dex.console.trace("CSV INDICES: ", csvIndices);
    // Map the header.

    var csvData = csvIndices.map(function (i) {
        return csv.header[i];
      }).join(",") + "\n";

    csvData += config.csv.data.map(function (row) {
      return csvIndices.map(function (i) {
        return row[i];
      }).join(",");
    }).join("\n") + "\n";

    d3.selectAll(config.id).remove();
    g = new Dygraph(document.getElementById(config.parent.substring(1)),
      csvData, config.options);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = linechart;
},{}],37:[function(require,module,exports){
/**
 *
 * This module provides a dygraphs linechart component.
 *
 * @module dex/charts/dygraphs
 * @name dygraphs
 * @memberOf dex.charts
 *
 */

var dygraphs = {};

dygraphs.LineChart = require("./LineChart");

module.exports = dygraphs;
},{"./LineChart":36}],38:[function(require,module,exports){
var diffbarchart = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'     : "#GoogleDiffBarChart",
    // Set these when you need to CSS style components independently.
    'id'         : 'GoogleDiffBarChart',
    'class'      : 'GoogleDiffBarChart',
    // Our data...
    'csv'        : {
      'header' : ['Category', 'Major', 'Degrees'],
      'data'   : [
        ['old', 'Business', 256070],
        ['old', 'Education', 108034],
        ['old', 'Social Sciences & History', 127101],
        ['old', 'Health', 81863],
        ['old', 'Psychology', 74194],
        ['new', 'Business', 358293],
        ['new', 'Education', 101265],
        ['new', 'Social Sciences & History', 172780],
        ['new', 'Health', 129634],
        ['new', 'Psychology', 97216]]
    },
    'resizable' : true,
    'diff'       : {
      'compare'       : 'Category',
      'compareGroups' : ['old', 'new']
    },
    'options'    : {
      'bars' : 'horizontal',
      'hAxis.viewWindowMode' : 'maximized',
      'vAxis.viewWindowMode' : 'maximized',
      'chartArea.width' : function() { return chart.config.width * 0.8; },
      'chartArea.height' : function() { return chart.config.height * 0.8; }
    }
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.attr("options.chart.title", 'title')
      .attr("options.chart.subtitle", 'subtitle')
      .attr("options.colors", [
        'steelblue', 'red', 'blue', 'green',
        'orange', 'purple', 'grey', 'brown',
        'cyan', 'magenta']);
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var config = chart.config;
      var target = (config.parent && config.parent[0] == '#') ?
        config.parent.substring(1) : config.parent;
      var targetElt = document.getElementById(target);

      var width = targetElt.clientWidth;
      var height = targetElt.clientHeight;
      dex.console.log("google.DiffBarChart Resize: " + width + "x" + height);

      chart
        .attr("width", width)
        .attr("height", height)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;

    // Keep a copy of the before and after data
    var beforeData = [dex.array.copy(config.csv.header)];
    var afterData = [dex.array.copy(config.csv.header)];

    // Find the category we're grouping on.
    var groupIndex = config.csv.header.indexOf(config.diff.category);

    // Nothing to chart if the group index is invalid.  Simply return.
    if (groupIndex < 0) {
      return;
    }

    // Iterate over each row in the data:
    config.csv.data.forEach(function (row) {
      // Copy the rows with matching group indexes.
      if (row[groupIndex] == config.diff.compareGroups[0]) {
        beforeData.push(dex.array.copy(row));
      }
      else if (row[groupIndex] == config.diff.compareGroups[1]) {
        afterData.push(dex.array.copy(row));
      }
    })

    // Remove the group index from the copied data.
    beforeData.forEach(function (row) {
      row.splice(groupIndex, 1);
    });
    afterData.forEach(function (row) {
      row.splice(groupIndex, 1);
    });

    dex.console.log("csv", config.csv, "before", beforeData, "after", afterData);

    // Get the valid query string for the parent:
    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    // Use js dom to locate the target node.
    var targetNode = document.getElementById(target);

    // Delete the children.
    while (targetNode.firstChild) {
      targetNode.removeChild(targetNode.firstChild);
    }

    var beforeDataTable = google.visualization.arrayToDataTable(beforeData);
    var afterDataTable = google.visualization.arrayToDataTable(afterData);

    var diffChart = new google.visualization.BarChart(targetNode);

    var diffDataTable = diffChart.computeDiff(beforeDataTable, afterDataTable);
    diffChart.draw(diffDataTable, config.options);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = diffbarchart;
},{}],39:[function(require,module,exports){
var diffpiechart = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'     : "#DiffPieChart",
    // Set these when you need to CSS style components independently.
    'id'         : 'DiffPieChart',
    'class'      : 'DiffPieChart',
    // Our data...
    'csv'        : {
      'header' : ['Category', 'Major', 'Degrees'],
      'data'   : [
        ['old', 'Business', 256070],
        ['old', 'Education', 108034],
        ['old', 'Social Sciences & History', 127101],
        ['old', 'Health', 81863],
        ['old', 'Psychology', 74194],
        ['new', 'Business', 358293],
        ['new', 'Education', 101265],
        ['new', 'Social Sciences & History', 172780],
        ['new', 'Health', 129634],
        ['new', 'Psychology', 97216]]
    },
    'resizable' : true,
    'diff'       : {
      'compare'       : 'Category',
      'compareGroups' : ['old', 'new']
    },
    'options'    : {
      'title'           : 'default title',
      'legend.position' : 'bottom'
    }
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart
      .resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable) {
      var config = chart.config;
      var target = (config.parent && config.parent[0] == '#') ?
        config.parent.substring(1) : config.parent;
      var targetElt = document.getElementById(target);

      var width = targetElt.clientWidth;
      var height = targetElt.clientHeight;
      dex.console.log("google.DiffPieChart Resize: " + width + "x" + height);

      chart
        .attr("width", width)
        .attr("height", height)
        .attr("options.chartArea.width", width * .8)
        .attr("options.chartArea.height", height * .8)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;

    var oldData = [dex.array.copy(config.csv.header)];
    var newData = [dex.array.copy(config.csv.header)];
    var groupIndex = config.csv.header.indexOf(config.diff.category);

    if (groupIndex < 0) {
      return;
    }

    config.csv.data.forEach(function (row) {
      if (row[groupIndex] == config.diff.compareGroups[0]) {
        oldData.push(dex.array.copy(row));
      }
      else if (row[groupIndex] == config.diff.compareGroups[1]) {
        newData.push(dex.array.copy(row));
      }
    })

    newData.forEach(function (row) {
      row.splice(groupIndex, 1);
    });
    oldData.forEach(function (row) {
      row.splice(groupIndex, 1);
    });

    dex.console.log("csv", config.csv, "old", oldData, "new", newData);

    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    var targetNode = document.getElementById(target);

    while (targetNode.firstChild) {
      targetNode.removeChild(targetNode.firstChild);
    }

    var oldDataTable = google.visualization.arrayToDataTable(oldData);
    var newDataTable = google.visualization.arrayToDataTable(newData);

    var diffChart = new google.visualization.PieChart(targetNode);

    var diffDataTable = diffChart.computeDiff(oldDataTable, newDataTable);
    diffChart.draw(diffDataTable, config.options);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = diffpiechart;
},{}],40:[function(require,module,exports){
/**
 *
 * @param userConfig A user supplied configuration object which will override the defaults.
 * @returns {DexComponent} Returns the Axis object.
 * @constructor
 *
 */
var piechart = function (userConfig) {

  // Todo: Mouseover events to communicate with other charting components.
  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'PieChart',
    'class'      : 'PieChart',
    // Our data...
    'csv'        : {
      'header' : ["Task", "Hours per Day"],
      'data'   : [
        ['Work', 8],
        ['Eat', 2],
        ['Watch TV', 1],
        ['Sleep', 7],
        ['Chores', 2],
        ['Code', 4]
      ]
    },
    'resizeable' : true,
    'title'      : "title",
    'options'    : {}
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizeable) {
      var config = chart.config;
      var target = (config.parent && config.parent[0] == '#') ?
        config.parent.substring(1) : config.parent;
      var targetNode = document.getElementById(target);

      while (targetNode.firstChild) {
        targetNode.removeChild(targetNode.firstChild);
      }

      var width = targetNode.clientWidth;
      var height = targetNode.clientHeight;
      //dex.console.log("google.PieChart Resize: " + width + "x" + height);
      //var width = d3.select(chart.config.parent).property("clientWidth");
      //var height = d3.select(chart.config.parent).property("clientHeight");
      //chart.attr("width", width).attr("height", height).update();
      chart.update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;

    var data = dex.matrix.copy(config.csv.data);
    data.unshift(dex.array.copy(config.csv.header));
    dex.console.log("google.PieChart Data:", data, "Options", config.options);

    var dataTable = google.visualization.arrayToDataTable(data);

    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    var chart = new google.visualization.PieChart(
      document.getElementById(target));

    chart.draw(dataTable, config.options);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable().zIndex(0);
  });

  return chart;
};

module.exports = piechart;
},{}],41:[function(require,module,exports){
/**
 *
 * @param userConfig A user supplied configuration object which will override the defaults.
 * @returns {DexComponent} Returns the Axis object.
 * @constructor
 *
 */
var timeline = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'Timeline',
    'class'      : 'Timeline',
    // Our data...
    'csv'        : {
      'header' : ["President", "Start", "End"],
      'data'   : [
        ['Washington', '3/29/1789', '2/3/1797'],
        ['Adams', '2/3/1797', '2/3/1801'],
        ['Jefferson', '2/3/1801', '2/3/1809']
      ]
    },
    'resizable' : true,
    'title'      : "Timeline",
    'options'    : {}
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizable || isNaN(chart.config.height) ||
      isNaN(chart.config.width)) {
      var config = chart.config;
      var target = (config.parent && config.parent[0] == '#') ?
        config.parent.substring(1) : config.parent;
      var targetElt = document.getElementById(target);

      var width = targetElt.clientWidth;
      var height = targetElt.clientHeight;
      dex.console.log("google.Timeline Resize: " + width + "x" + height);
      //var width = d3.select(chart.config.parent).property("clientWidth");
      //var height = d3.select(chart.config.parent).property("clientHeight");
      //chart.attr("width", width).attr("height", height).update();
      chart.update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;

    // Guessing types, then setting the category column to the first
    // string.  The fromIndex to the first occurrence of a 'date' type
    // and toIndex to the second occurrence of a 'date' type.
    //
    // If the data does not contain at least a string and two dates, it
    // will chart nothing.
    var categoryIndex;
    var fromIndex;
    var toIndex;

    var types = dex.csv.guessTypes(config.csv);

    categoryIndex = types.indexOf('string');
    fromIndex = types.indexOf('date');
    toIndex = types.indexOf('date', fromIndex + 1);

    if (categoryIndex == -1 || fromIndex == -1 || toIndex == -1) {
      return;
    }

    var chartCsv = dex.csv.columnSlice(config.csv, [categoryIndex, fromIndex, toIndex]);
    var data = chartCsv.data;
    data.unshift(dex.array.copy(chartCsv.header));
    dex.console.log("google.PieChart Data:", data, "Options", config.options);

    var dataTable = google.visualization.arrayToDataTable(data);

    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    var chart = new google.visualization.Timeline(
      document.getElementById(target));

    chart.draw(dataTable, config.options);
  };

  $(document).ready(function () {
    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = timeline;
},{}],42:[function(require,module,exports){
/**
 *
 * @param userConfig A user supplied configuration object which will override the defaults.
 * @returns {DexComponent} Returns the Axis object.
 * @constructor
 *
 */
var wordtree = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'WordTree',
    'class'      : 'WordTree',
    // Our data...
    'csv'        : {
      'header' : ["LINE"],
      'data'   : [
        ['Now is the time for all good men to fight.'],
        ['Now is the time for all good men to flee.'],
        ['Now is not the time.']
      ]
    },
    'resizeable' : true,
    'options'    : {
      'wordtree' : {
        'format' : 'implicit'
      }
    }
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function render() {
    window.onresize = this.resize;
    chart.resize();
  };

  chart.resize = function resize() {
    if (chart.config.resizeable) {
      var config = chart.config;
      var target = (config.parent && config.parent[0] == '#') ?
        config.parent.substring(1) : config.parent;
      var targetElt = document.getElementById(target);

      var width = targetElt.clientWidth;
      var height = targetElt.clientHeight;
      dex.console.log("google.WordTree Resize: " + width + "x" + height);
      //var width = d3.select(chart.config.parent).property("clientWidth");
      //var height = d3.select(chart.config.parent).property("clientHeight");
      //chart.attr("width", width).attr("height", height).update();
      chart
        //.attr("options.height", height)
        //.attr("options.width", width)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.update = function update() {
    var chart = this;
    var config = chart.config;
    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;

    var phrases = [["Phrases"]];
    config.csv.data.forEach(function (row) {
      row.forEach(function (col) {
        phrases.push([col.toLowerCase()]);
      })
    });

    dex.console.log("PHRASES", phrases);

    var data = google.visualization.arrayToDataTable(phrases);

    var chart = new google.visualization.WordTree(
      document.getElementById(target));
    chart.draw(data, config.options);
  };

  $(document).ready(function () {

    // Make the entire chart draggable.
    $(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = wordtree;
},{}],43:[function(require,module,exports){
/**
 *
 * This module provides routines for dealing with arrays.
 *
 * @module dex/charts/google
 * @name google
 * @memberOf dex.charts
 *
 */
var google = {};

google.DiffBarChart = require("./DiffBarChart");
google.DiffPieChart = require("./DiffPieChart");
google.PieChart = require("./PieChart");
google.Timeline = require("./Timeline");
google.WordTree = require("./WordTree");

module.exports = google;
},{"./DiffBarChart":38,"./DiffPieChart":39,"./PieChart":40,"./Timeline":41,"./WordTree":42}],44:[function(require,module,exports){
var scatterplot = function (userConfig) {
  var defaults = {
    // The parent container of this chart.
    'parent'  : null,
    // Set these when you need to CSS style components independently.
    'id'      : 'ScatterPlot3D',
    'class'   : 'ScatterPlot3D',
    // Our data...
    'csv'     : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [[0, 0, 0], [1, 1, 1], [2, 4, 8], [3, 9, 27]]
    },
    'width'   : 400,
    'height'  : 400,
    'xoffset' : 20,
    'yoffset' : 0
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function () {
    this.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    var bounds =
    {
      'maxx' : dex.matrix.max(csv.data, 0),
      'minx' : dex.matrix.min(csv.data, 0),
      'maxy' : dex.matrix.max(csv.data, 1),
      'miny' : dex.matrix.min(csv.data, 1),
      'maxz' : dex.matrix.max(csv.data, 2),
      'minz' : dex.matrix.min(csv.data, 2)
    };

    var i, j;

// <!--
    function mousewheel(event) {
      var fovMAX = 160;
      var fovMIN = 1;

      camera.fov -= event.wheelDeltaY * 0.05;
      camera.fov = Math.max(Math.min(camera.fov, fovMAX), fovMIN);
      camera.projectionMatrix = new THREE.Matrix4().makePerspective(camera.fov, config.width / config.height, camera.near, camera.far);
    }

    function generateTexture() {
      // draw a circle in the center of the canvas
      var size = 128;

      // create canvas
      var canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      // get context
      var context = canvas.getContext('2d');

      // draw circle
      var centerX = size / 2;
      var centerY = size / 2;
      var radius = size / 2;

//var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
//        gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
//        gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
//        gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
//        gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      //context.fillStyle = gradient;
      //context.fillRect( 0, 0, canvas.width, canvas.height );
      context.fillStyle = "#FFFFFF";
      context.fill();

      return canvas;
    }

    function createTextCanvas(text, color, font, size) {
      size = size || 24;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var fontStr = (size + 'px ') + (font || 'Arial');
      ctx.font = fontStr;
      var w = ctx.measureText(text).width;
      var h = Math.ceil(size);
      canvas.width = w;
      canvas.height = h;
      ctx.font = fontStr;
      ctx.fillStyle = color || 'black';
      ctx.fillText(text, 0, Math.ceil(size * 0.8));
      return canvas;
    }

    function createText2D(text, color, font, size, segW, segH) {
      var canvas = createTextCanvas(text, color, font, size);
      var plane = new THREE.PlaneGeometry(canvas.width, canvas.height, segW, segH);
      var tex = new THREE.Texture(canvas);
      tex.needsUpdate = true;
      var planeMat = new THREE.MeshBasicMaterial({
        map : tex, color : 0xffffff, transparent : true
      });
      var mesh = new THREE.Mesh(plane, planeMat);
      mesh.scale.set(0.25, 0.25, 0.25);
      mesh.doubleSided = true;
      return mesh;
    }

    var maxRange = Math.max(Math.max(bounds.maxx - bounds.minx, bounds.maxy - bounds.miny),
      bounds.maxz - bounds.minz);
    var renderer = new THREE.WebGLRenderer({antialias : true});
    var w = config.width;
    var h = config.height;
    renderer.setSize(w, h);

//document.body.appendChild(renderer.domElement);
    config.parent.appendChild(renderer.domElement);

    renderer.setClearColorHex(0xEEEEEE, 1.0);

//var camera = new THREE.PerspectiveCamera(45, w/h, 1, 1000 );
    var camera = new THREE.PerspectiveCamera(45, w / h, 1, 100000);
//var camera = new THREE.OrthographicCamera( w / - 2, w / 2, h / 2, h / - 2, 1, h );
    camera.position.z = bounds.maxz * 4;
    camera.position.x = 0;
    camera.position.y = bounds.maxy * 1.25;

    var scene = new THREE.Scene();
//scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.000005 );

    var scatterPlot = new THREE.Object3D();
    scene.add(scatterPlot);

    scatterPlot.rotation.y = 0.5;
    function v(x, y, z) {
      return new THREE.Vertex(new THREE.Vector3(x, y, z));
    }

//var lineGeo = new THREE.CubeGeometry(bounds.maxx - bounds.maxx, bounds.maxy - bounds.miny,
//  bounds.maxz - bounds.minz);

    var xAxisGeo = new THREE.Geometry();
    var yAxisGeo = new THREE.Geometry();
    var zAxisGeo = new THREE.Geometry();
    var boundaryGeo = new THREE.Geometry();

    xAxisGeo.vertices.push(v(bounds.minx, 0, 0), v(bounds.maxx, 0, 0));
    yAxisGeo.vertices.push(v(0, bounds.miny, 0), v(0, bounds.maxy, 0));
    zAxisGeo.vertices.push(v(0, 0, bounds.minz), v(0, 0, bounds.maxz));
    boundaryGeo.vertices.push(
      v(bounds.minx, bounds.maxy, bounds.minz), v(bounds.maxx, bounds.maxy, bounds.minz),
      v(bounds.minx, bounds.miny, bounds.minz), v(bounds.maxx, bounds.miny, bounds.minz),
      v(bounds.minx, bounds.maxy, bounds.maxz), v(bounds.maxx, bounds.maxy, bounds.maxz),
      v(bounds.minx, bounds.miny, bounds.maxz), v(bounds.maxx, bounds.miny, bounds.maxz),

      v(bounds.minx, 0, bounds.maxz), v(bounds.maxx, 0, bounds.maxz),
      v(bounds.minx, 0, bounds.minz), v(bounds.maxx, 0, bounds.minz),
      v(bounds.minx, bounds.maxy, 0), v(bounds.maxx, bounds.maxy, 0),
      v(bounds.minx, bounds.miny, 0), v(bounds.maxx, bounds.miny, 0),

      v(bounds.maxx, bounds.miny, bounds.minz), v(bounds.maxx, bounds.maxy, bounds.minz),
      v(bounds.minx, bounds.miny, bounds.minz), v(bounds.minx, bounds.maxy, bounds.minz),
      v(bounds.maxx, bounds.miny, bounds.maxz), v(bounds.maxx, bounds.maxy, bounds.maxz),
      v(bounds.minx, bounds.miny, bounds.maxz), v(bounds.minx, bounds.maxy, bounds.maxz),

      v(0, bounds.miny, bounds.maxz), v(0, bounds.maxy, bounds.maxz),
      v(0, bounds.miny, bounds.minz), v(0, bounds.maxy, bounds.minz),
      v(bounds.maxx, bounds.miny, 0), v(bounds.maxx, bounds.maxy, 0),
      v(bounds.minx, bounds.miny, 0), v(bounds.minx, bounds.maxy, 0),

      v(bounds.maxx, bounds.maxy, bounds.minz), v(bounds.maxx, bounds.maxy, bounds.maxz),
      v(bounds.maxx, bounds.miny, bounds.minz), v(bounds.maxx, bounds.miny, bounds.maxz),
      v(bounds.minx, bounds.maxy, bounds.minz), v(bounds.minx, bounds.maxy, bounds.maxz),
      v(bounds.minx, bounds.miny, bounds.minz), v(bounds.minx, bounds.miny, bounds.maxz),

      v(bounds.minx, 0, bounds.minz), v(bounds.minx, 0, bounds.maxz),
      v(bounds.maxx, 0, bounds.minz), v(bounds.maxx, 0, bounds.maxz),
      v(0, bounds.maxy, bounds.minz), v(0, bounds.maxy, bounds.maxz),
      v(0, bounds.miny, bounds.minz), v(0, bounds.miny, bounds.maxz)
    );

    var xAxisMat = new THREE.LineBasicMaterial({color : 0xff0000, lineWidth : 1});
    var xAxis = new THREE.Line(xAxisGeo, xAxisMat);
    xAxis.type = THREE.Lines;
    scatterPlot.add(xAxis);

    var yAxisMat = new THREE.LineBasicMaterial({color : 0x0000ff, lineWidth : 1});
    var yAxis = new THREE.Line(yAxisGeo, yAxisMat);
    yAxis.type = THREE.Lines;
    scatterPlot.add(yAxis);

    var zAxisMat = new THREE.LineBasicMaterial({color : 0x00ff00, lineWidth : 1});
    var zAxis = new THREE.Line(zAxisGeo, zAxisMat);
    zAxis.type = THREE.Lines;
    scatterPlot.add(zAxis);

    var boundaryMat = new THREE.LineBasicMaterial({color : 0x090909, lineWidth : 1, transparent : true});
    var boundary = new THREE.Line(boundaryGeo, boundaryMat);
    boundary.type = THREE.Lines;
    scatterPlot.add(boundary);

    var fontSize = Math.max(Math.round(maxRange / 4), 8);
    var fontOffset = Math.min(Math.round(fontSize / 4), 8);
    console.log("OFFSET: " + fontOffset);
    console.log("  FONT: " + fontSize);

    var titleX = createText2D("-" + csv.header[0], new THREE.Color().setRGB(1, 0, 0), "", fontSize);
    titleX.position.x = bounds.minx - fontOffset;
    scatterPlot.add(titleX);

    var titleX = createText2D(csv.header[0], new THREE.Color().setRGB(1, 0, 0), "", fontSize);
    titleX.position.x = bounds.maxx + fontOffset;
    scatterPlot.add(titleX);

    var titleY = createText2D('-' + csv.header[1], new THREE.Color().setRGB(1, 0, 0), "", fontSize);
    titleY.position.y = bounds.miny - fontOffset;
    scatterPlot.add(titleY);

// (text, color, font, size, segW, segH)
    var titleY = createText2D(csv.header[1], new THREE.Color().setRGB(1, 0, 0), "", fontSize);
    titleY.position.y = bounds.maxy + fontOffset;
    scatterPlot.add(titleY);

    var titleZ = createText2D('-' + csv.header[2], new THREE.Color().setRGB(1, 0, 0), "", fontSize);
    titleZ.position.z = bounds.minz - fontOffset;
    scatterPlot.add(titleZ);

    var titleZ = createText2D(csv.header[2], new THREE.Color().setRGB(1, 0, 0), "", fontSize);
    titleZ.position.z = bounds.maxz + fontOffset;
    scatterPlot.add(titleZ);

    attributes = {

      size        : {type : 'f', value : []},
      customColor : {type : 'c', value : []}

    };

    uniforms =
    {
      amplitude : {type : "f", value : 1.0},
      color     : {type : "c", value : new THREE.Color(0xff0000)}
      //texture: { type: "t", value: THREE.ImageUtils.loadTexture( "textures/ball.png" ) },
    };

    var texture = new THREE.Texture(generateTexture());
    texture.needsUpdate = true; // important

//var mat = new THREE.ParticleBasicMaterial({vertexColors:true, size: 1});
//var mat = new THREE.ParticleBasicMaterial( { blending: THREE.AdditiveBlending, vertexColors: true, size: 1, map: THREE.ImageUtils.loadTexture( 'textures/ball.png' ) } );
//var mat = new THREE.ParticleBasicMaterial({vertexColors:true, size: 1});
//var mat = new THREE.ParticleCanvasMaterial( { size: 50, map: new THREE.Texture( generateSprite() ), blending: THREE.AdditiveBlending } );
    var mat = new THREE.ParticleBasicMaterial(
      {
        size         : Math.max(maxRange / 25, 1),
        map          : texture,
        blending     : THREE.AdditiveBlending, // required
        depthTest    : false, // required
        transparent  : false,
        opacity      : 0.7,
        vertexColors : true // optional
      });

    var pointGeo = new THREE.Geometry();

//var pointCount = 1000;

    var colors =
      [
        new THREE.Color().setRGB(1, 0, 0),
        new THREE.Color().setRGB(0, 0, 1),
        new THREE.Color().setRGB(0, 1, 0),
        new THREE.Color().setRGB(1, 0, 1),
        new THREE.Color().setRGB(1, 1, 0),
        new THREE.Color().setRGB(0, 1, 1),
        new THREE.Color().setRGB(.5, .5, .5)
      ];

    for (i = 0; i < csv.data.length; i++) {
      //var x = Math.random() * 100 - 50;
      //var y = x*0.8+Math.random() * 20 - 10;
      //var z = x*0.7+Math.random() * 30 - 15;

      for (j = 2; j < csv.header.length; j++) {
        pointGeo.vertices.push(new THREE.Vertex(new THREE.Vector3(csv.data[i][0], csv.data[i][1], csv.data[i][j])));
        pointGeo.colors.push(colors[(j - 2) % colors.length]);
      }
    }

    var points = new THREE.ParticleSystem(pointGeo, mat);
    scatterPlot.add(points);

//camera.lookAt( scatterPlot );
//camera.target.position.copy( scatterPlot );

    renderer.render(scene, camera);
    var paused = false;
    var last = new Date().getTime();
    var down = false;
    var sx = 0, sy = 0;
    window.onmousedown = function (ev) {
      down = true;
      sx = ev.clientX;
      sy = ev.clientY;
    };

    window.addEventListener('DOMMouseScroll', mousewheel, false);
    window.addEventListener('mousewheel', mousewheel, false);

    window.onmouseup = function () {
      down = false;
    };
    window.onmousemove = function (ev) {
      if (down) {
        var dx = ev.clientX - sx;
        var dy = ev.clientY - sy;
        scatterPlot.rotation.y += dx * 0.01;
        camera.position.y += dy;
        sx += dx;
        sy += dy;
      }
    };

    var animating = false;
    window.ondblclick = function () {
      animating = !animating;
    };
    function animate(t) {
      if (!paused) {
        last = t;
        if (animating) {
          var v = pointGeo.vertices;
          for (i = 0; i < v.length; i++) {
            var u = v[i];
            u.angle += u.speed * 0.01;
            u.position.x = Math.cos(u.angle) * u.radius;
            u.position.z = Math.sin(u.angle) * u.radius;
          }
          pointGeo.__dirtyVertices = true;
        }
        renderer.clear();
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }
      window.requestAnimationFrame(animate, renderer.domElement);
    };
    animate(new Date().getTime());
    onmessage = function (ev) {
      paused = (ev.data == 'pause');
    };
//-->

  };

  return chart;
};

module.exports = scatterplot;
},{}],45:[function(require,module,exports){
/**
 *
 * This module provides ThreeJS/WebGL based visualization components.
 *
 * @module dex/charts/threejs
 * @name d3plus
 * @memberOf dex.charts
 *
 */
var threejs = {};

threejs.ScatterPlot = require("./ScatterPlot");

module.exports = threejs;
},{"./ScatterPlot":44}],46:[function(require,module,exports){
var network = function (userConfig) {
  var chart;

  var defaults =
  {
    // The parent container of this chart.
    'parent': '#Network',
    // Set these when you need to CSS style components independently.
    'id': 'Network',
    'class': 'Network',
    'resizable': true,
    'csv': {
      'header': [],
      'data': []
    },
    'dataModel' : 'default',
    'width': "100%",
    'height': "100%",
    'options' : {
      nodes: {
        shape: 'dot',
        scaling:{
          label: {
            min:8,
            max:64
          }
        },
        'font' : {
          'color' : '#C04D3B'
        }
      },
      'edges' : {
        //'arrows' : 'from',
        'shadow': true
      },
      'physics' : {
        'solver' : 'forceAtlas2Based',
        //'solver' : 'hierarchicalRepulsion',
        //'solver' : 'repulsion',
        //'solver' : 'barnesHut',
        'forceAtlas2Based' : {
          'gravitationalConstant' : -50,
          'springConstant' : .08,
          'centralGravity' : .02,
          'damping' : .1,
          'avoidOverlap' : .0,
          'springLength' : 100
        },
        maxVelocity: 50,
        minVelocity: 0.2,
        stabilization: {
          enabled: true,
          iterations: 200,
          updateInterval: 100,
          onlyDynamicEdges: false,
          fit: true
        },
      },
    }
  };

  var chart = new dex.component(userConfig, defaults);

  chart.resize = function resize() {
    dex.console.log("PARENT: '" + chart.config.parent + "'");
    if (chart.config.resizable) {
      var width = $("" + chart.config.parent).width();
      var height = $("" + chart.config.parent).height();
      dex.console.log("RESIZE: " + width + "x" + height);
      chart.attr("width", width)
        .attr("height", height)
        .update();
    }
    else {
      chart.update();
    }
  };

  chart.render = function render() {

    //var chart = this;
    var config = chart.config;
    var csv = config.csv;
    window.onresize = this.resize;

    d3.select(config.parent).selectAll("*").remove();
    var target = (config.parent && config.parent[0] == '#') ?
      config.parent.substring(1) : config.parent;
    var container = document.getElementById(target);

    var options = {};
    var network = new vis.Network(container, chart.createData(), config.options);
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;
    chart.render();
  };

  chart.createData = function() {
    "use strict";

    var nodes = null;
    var edges = null;
    var network = null;
    var linkWeight = 0;
    var csv = chart.config.csv;

    var nodeMap = {};
    var linkMap = {};

    var colors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00'];

    var id = 1;

    var weightIndex = csv.header.indexOf("WEIGHT");

    // Create node map.
    csv.header.map ( function(h, ci) {
      if (!h.startsWith("WEIGHT"))
      {
        csv.data.map ( function(row) {
          if (!nodeMap[h + ":" + row[ci]])
          {
            nodeMap[h + ":" + row[ci]] = {
              'id' : id,
              'label' : row[ci],
              'linksIn'  : 0,
              'linksOut' : 0,
              'weight'   : (weightIndex >= 0) ? row[weightIndex] : 1,
              'color' : colors[ci%colors.length],
              'group' : ci
            };
            id++;
          }
          else
          {
            nodeMap[h + ":" + row[ci]]['weight'] +=
              (weightIndex >= 0) ? row[weightIndex] : 1;
          }
        });
      }
    });

    // Count links from C1 -> C2 -> ... -> Cx
    for (var ci=1; ci<csv.header.length; ci++)
    {
      if (!csv.header[ci].startsWith("WEIGHT"))
      {
        for (var ri=0; ri<csv.data.length; ri++)
        {
          var src  = csv.header[ci-1] + ":" + csv.data[ri][ci-1];
          var dest = csv.header[ci] + ":" + csv.data[ri][ci];
          var linkKey = src + "->" + dest;
          nodeMap[src]['linksOut']++;
          nodeMap[dest]['linksIn']++;

          linkWeight = (weightIndex >= 0) ? csv.data[ri][weightIndex] : 1;

          if (!linkMap[linkKey])
          {
            linkMap[linkKey] = {
              'from' : nodeMap[src].id,
              'to'   : nodeMap[dest].id,
              'linkCount' : 1,
              'weight' : linkWeight,
              'label' : nodeMap[src].label + "->" + nodeMap[dest].label +
              ": 1 link, weight = " + linkWeight
            };
          }
          else
          {
            linkMap[linkKey]['linkCount']++;
            linkMap[linkKey]['linkWeight'] += linkWeight;
            linkMap[linkKey]['label'] =
              nodeMap[src].label + "->" + nodeMap[dest].label +
              ": " + linkMap[linkKey]['linkCount'] + " links, weight = " +
              linkMap[linkKey]['weight'];
          }
        }
      }
    }

    nodes = [];
    edges = [];

    // Populate nodes
    for (var key in nodeMap) {
      var node = nodeMap[key];
      nodes.push({
        'id'    : node.id,
        'value' : node.weight,
        'label' : node.label,
        'color' : node.color,
        'group' : node.group
      });
    }

    // Populate edges
    for (var key in linkMap) {
      var edge = linkMap[key];
      edges.push({
        'from'  : edge.from,
        'to'    : edge.to,
        'value' : edge.weight,
        'title' : edge.label,
        'font'  : {'align': 'middle'} });
    }

    dex.console.log("NODES", nodes, "EDGES", edges);

    return {
      nodes: nodes,
      edges: edges
    };
  };

  return chart;
};

module.exports = network;
},{}],47:[function(require,module,exports){
/**
 *
 * This module provides routines for dealing with arrays.
 *
 * @module dex/charts/vis
 * @name vis
 * @memberOf dex.charts
 *
 */
var vis = {};

vis.Network = require("./Network");

module.exports = vis;
},{"./Network":46}],48:[function(require,module,exports){
"use strict";

/**
 *
 * This module provides routines for dealing with colors.
 *
 * @module dex/color
 * @name color
 * @memberOf dex
 *
 */

module.exports = function color(dex) {

  return {
    /**
     *
     * This routine converts a rgb(red, green, blue) color to it's
     * equivalent #ffffff hexadecimal form.
     *
     * @param color The color we wish to convert to hex.
     * @returns {*}
     */
    'toHex': function (color) {
      if (color.substr(0, 1) === '#') {
        return color;
      }
      //console.log("COLOR: " + color)
      var digits = /rgb\((\d+),(\d+),(\d+)\)/.exec(color);
      //console.log("DIGITS: " + digits);
      var red = parseInt(digits[1]);
      var green = parseInt(digits[2]);
      var blue = parseInt(digits[3]);

      var rgb = blue | (green << 8) | (red << 16);
      return '#' + rgb.toString(16);
    },

    /**
     *
     * This routine returns the requested named color scheme with
     * the requested number of colors.
     *
     * @param colorScheme The named color schemes: cat10, cat20, cat20b, cat20c, HiContrast or
     * any of the named colors from colorbrewer.
     * @param numColors The number of colors being requested.
     *
     * @returns {*} The array of colors.
     */
    'colorScheme': function (colorScheme, numColors) {
      if (colorScheme === "cat10" || colorScheme == "1") {
        return d3.scale.category10();
      }
      else if (colorScheme === "cat20" || colorScheme == "2") {
        return d3.scale.category20();
      }
      else if (colorScheme === "cat20b" || colorScheme == "3") {
        return d3.scale.category20b();
      }
      else if (colorScheme === "cat20c" || colorScheme == "4") {
        return d3.scale.category20c();
      }
      else if (colorScheme == "HiContrast") {
        return d3.scale.ordinal().range(colorbrewer[colorScheme][9]);
      }
      else if (colorScheme in colorbrewer) {
        //console.log("LENGTH: " + len);
        var c;
        var effColors = Math.pow(2, Math.ceil(Math.log(numColors) / Math.log(2)));
        //console.log("EFF LENGTH: " + len);

        // Find the best cmap:
        if (effColors > 128) {
          effColors = 256;
        }

        for (c = effColors; c >= 2; c--) {
          if (colorbrewer[colorScheme][c]) {
            return d3.scale.ordinal().range(colorbrewer[colorScheme][c]);
          }
        }
        for (c = effColors; c <= 256; c++) {
          if (colorbrewer[colorScheme][c]) {
            return d3.scale.ordinal().range(colorbrewer[colorScheme][c]);
          }
        }
        return d3.scale.category20();
      }
      else {
        return d3.scale.category20();
      }
    },

    /**
     *
     * Given a color, lighten or darken it by the requested percent.
     *
     * @param color The color to modify.
     * @param percent A floating point number in the range of [-1.0, 1.0].  Negative
     * values will lighten the color, positive values will darken it.
     *
     * @returns {string} The lightened or darkened color in the form of #ffffff.
     *
     */
    'shadeColor': function (color, percent) {
      var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
      return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) *
        0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    },

    /**
     *
     * Given two colors, blend them together.
     *
     * @param color1
     * @param color2
     * @param percent
     * @returns {string}
     *
     */
    'blendColors': function (color1, color2, percent) {
      var f = parseInt(color1.slice(1), 16), t = parseInt(color2.slice(1), 16),
        R1 = f >> 16, G1 = f >> 8 & 0x00FF,
        B1 = f & 0x0000FF, R2 = t >> 16,
        G2 = t >> 8 & 0x00FF, B2 = t & 0x0000FF;

      return "#" + (0x1000000 + (Math.round((R2 - R1) * percent) + R1) * 0x10000 +
        (Math.round((G2 - G1) * percent) + G1) * 0x100 +
        (Math.round((B2 - B1) * percent) + B1)).toString(16).slice(1);
    },

    /**
     *
     * @param color
     * @param percent
     * @returns {string}
     */
    'shadeRGBColor': function (color, percent) {
      var f = color.split(","), t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent, R = parseInt(f[0].slice(4)),
        G = parseInt(f[1]), B = parseInt(f[2]);
      return "rgb(" + (Math.round((t - R) * p) + R) + "," +
        (Math.round((t - G) * p) + G) + "," +
        (Math.round((t - B) * p) + B) + ")";
    },

    /**
     *
     * @param color1
     * @param color2
     * @param percent
     * @returns {string}
     */
    'blendRGBColors': function (color1, color2, percent) {
      var f = color1.split(","), t = color2.split(","), R = parseInt(f[0].slice(4)),
        G = parseInt(f[1]), B = parseInt(f[2]);
      return "rgb(" + (Math.round((parseInt(t[0].slice(4)) - R) * p) + R) + "," +
        (Math.round((parseInt(t[1]) - G) * percent) + G) + "," +
        (Math.round((parseInt(t[2]) - B) * percent) + B) + ")";
    },

    /**
     *
     * @param color
     * @param percent
     * @returns {*}
     */
    'shade': function (color, percent) {
      if (color.length > 7) return shadeRGBColor(color, percent);
      else return shadeColor2(color, percent);
    },

    /**
     *
     * @param color1
     * @param color2
     * @param percent
     */
    'blend': function (color1, color2, percent) {
      if (color1.length > 7) return blendRGBColors(color1, color2, percent);
      else return blendColors(color1, color2, percent);
    },

    /**
     *
     * Given a color and a percent to lighten or darken it.
     *
     * @param color The base color.
     * @param percent The pecentage to lighten (negative) or darken (positive) the color.
     *
     * @returns {string} The computed color.
     *
     */
    /*
     exports.shadeColor = function (color, percent) {
     var R = parseInt(color.substring(1, 3), 16)
     var G = parseInt(color.substring(3, 5), 16)
     var B = parseInt(color.substring(5, 7), 16);

     R = parseInt(R * (100 + percent) / 100);
     G = parseInt(G * (100 + percent) / 100);
     B = parseInt(B * (100 + percent) / 100);

     R = (R < 255) ? R : 255;
     G = (G < 255) ? G : 255;
     B = (B < 255) ? B : 255;

     var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
     var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
     var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

     return "#" + RR + GG + BB;
     };
     */

    'gradient': function (baseColor) {
      if (baseColor.charAt(0) == 'r') {
        baseColor = colorToHex(baseColor);
      }
      var gradientId;
      gradientId = "gradient" + baseColor.substring(1)
      console.log("GradientId: " + gradientId);
      console.log("BaseColor : " + baseColor);

      //var lightColor = shadeColor(baseColor, -10)
      var darkColor = shadeColor(baseColor, -20)

      var grad = d3.select("#gradients").selectAll("#" + gradientId)
        .data([gradientId])
        .enter()
        .append("radialGradient")
        .attr("class", "colorGradient")
        .attr("id", gradientId)
        .attr("gradientUnits", "objectBoundingBox")
        .attr("fx", "30%")
        .attr("fy", "30%")

      grad.append("stop")
        .attr("offset", "0%")
        .attr("style", "stop-color:#FFFFFF")

      // Middle
      grad.append("stop")
        .attr("offset", "40%")
        .attr("style", "stop-color:" + baseColor)

      // Outer Edges
      grad.append("stop")
        .attr("offset", "100%")
        .attr("style", "stop-color:" + darkColor)

      return "url(#" + gradientId + ")";
    }
  };
};

},{}],49:[function(require,module,exports){
/**
 *
 * This module provides base capabilities which are available to all dex components.
 *
 * @interface
 *
 */

/**
 *
 * A matrix is a two dimensional array of values.  It's a data structure
 * which is a key component of a csv which is used extensively
 * throughout DexJs.  The data portion of a csv is simply a matrix.
 * A csv is the standard form of data input expected by dex components.
 *
 * @typedef {Array.<Array.<Object>>} matrix
 * @example {@lang javascript}
 * // A 2x2 matrix of numbers.
 * var matrix1 = [[1, 2], [3, 4]];
 *
 * // A 2x2 matrix of strings.
 * var matrix2 = [['Pat', 'Martin'], ['Mike', 'Parton']];
 */

/**
 * A CSV data structure.
 *
 * @typedef {Object} csv
 *
 * @property {Array} header - An array containing the headings for this csv.
 * @property {matrix} data - A matrix containing the data for this csv.
 * @example {@lang javascript}
 * var myCsv = { header : [ "FirstName", "LastName" ],
 *               data   : [[ "Bob", "Jones" ], [ "Ricky", "Bobby" ]] };
 *
 */

/**
 * A D3 axis specification.
 * @typedef {Object} d3axis_spec
 *
 * @property {d3scale} [scale=dex.config.scale({type:'linear'})] - The scale to be used for this axis.
 * @property {String} [orient=bottom] - The orientation of the axis. (left|right|top|bottom)
 * @property {String} [ticks] - The number of ticks to generate for this axis.
 * @property {Array} [tickValues] - Supply specific places to draw the ticks.
 * @property {String} [tickSize=[6,6]] - Sets the length of both the inner and outer ticks.
 * @property {String} [innerTickSize=d] - Sets the length of inner ticks.
 * @property {String} [outerTickSize=6] - Sets the length of outer ticks.
 * @property {String} [tickPadding=3] - Sets the tick padding in pixels.
 * @property {String} [tickFormat] - Sets the format of tick labels. ex: d3.format(",.0f")
 *
 */

/**
 *
 * A D3 scale specification.
 *
 * @typedef {Object} d3scale_spec
 *
 * @property {string} [type=linear] - The type of scale to create.  Valid types are
 * (linear|sqrt|pow|time|log|ordinal|quantile|quantize|identity)
 * @property {Array} [domain=[0, 100]] - The domain for this scale.
 * @property {Array} [range=[0, 800]] - The range for this scale.
 * @property {Array} [rangeRound] - Sets the scale's output range to the specified array of values, while also
 * setting the scale's interpolator to d3.interpolateRound.
 * @property {String} [interpolate] - When supplied, sets the scale's output
 * interpolator using the specified factory.
 * @property {String} [clamp] - Set to true in order to enable clamping, false to disable
 * it.  Ensures interpolation/extrapolation does not generate values outside of this
 * scale's range.
 * @property {String} [nice] - If true, will extend the scale's domain to begin and
 * end on nice round integer values.
 * @property {string} [tickFormat] - Only applies to time scales.  Set's the tick
 * format.
 *
 */

/**
 *
 * A D3 font specification.  More information can be found in the {@link http://www.w3.org/TR/SVG/text.html|W3C SVG 1.1 Text Specification}.
 *
 * @typedef {Object} d3font_spec
 *
 * @property {string} [decoration=none] - This property describes decorations that are added to the text of an element.
 * Valid values: ( none | underline | overline | line-through | blink | inherit )
 * @property {string} [family=sans-serif] - This property indicates which font family is to be used to render the text.
 * @property {string} [letterSpacing=normal] -
 * @property {integer} [size=14] - The size of the font.
 * @property {string} [style=normal] - This property specifies whether the text is to be rendered using a normal,
 * italic or oblique face. Valid values are: ( normal | italic | oblique | inherit ).
 * @property {string} [weight=normal] - This property indicates whether the text is to be rendered using the normal glyphs
 * for lowercase characters or using small-caps glyphs for lowercase characters.  Valid values for this field are:
 * ( normal | bold | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit)
 * @property {string|integer} [wordSpacing=normal] - Specifies the amount of space that is to be added between text characters.
 * Valid values: ( auto | <integer-length> | inherit )
 * @property {string} [variant=normal] - his property indicates whether the text is to be rendered using
 * the normal glyphs for lowercase characters or using small-caps glyphs for lowercase characters.
 * Valid values: ( normal | small-caps | inherit )
 *
 */

/**
 *
 * A D3 stroke specification.
 *
 * @typedef {Object} d3stroke_spec
 *
 * @property {float} [width=1] - The width (in pixels) of this stroke.
 * @property {string} [color=black] - The color of this stroke.
 * @property {float} [opacity=1] - The opacity of this stroke in the range of
 * where 0 is invisible and 1 represents 100% opaque stroke. [0, 1]
 * @property {string} [dasharray] - Used to draw dashed lines.  Ex: "1 1" will draw
 * a dashed line which consists of single pixel dashes separated by 1 empty pixel.
 * @property {string} [transform] - A transform to be applied to the stroke.
 *
 */

/**
 *
 * A D3 text specification.
 *
 * @typedef {Object} d3text_spec
 *
 * @property {d3font_spec} [font] - The d3 font specification for this stroke.
 * @property {integer} [x=0] - The x coordinate for the first character of this text.
 * @property {integer} [y=0] - The y coordinate for the first character of this text.
 * @property {integer} [textLength] - The author's estimation of the length of this text.
 * The system will use this as a preference and attempt to size the text to this length.
 * @property {integer} [lengthAdjust] - Indicates the type of adjustments which the user
 * agent shall make to make the rendered length of the text match the value specified on
 * the textLength attribute.  Valid values: ( spacing | spacingAndGlyphs )
 * @property {string} [transform] - Any extra transformations to be applied to this
 * text.
 * @property {string} [glyphOrientationVertical] - Allows the user to control the
 * orientation of text.  Valid values: ( auto | <angle> | inherit ).  Angle may be expressed
 * in degrees, radians, or as a gradient.
 * @property {string} [text] - The text we are representing.
 * @property {integer} [dx=0] - An x-axis offset to be applied to this text.
 * @property {integer} [dy=0] - A y-axis offset to be applied to this text.
 * @property {string} [writingMode] - Specifies whether text flows left to right,
 * right to left, top to bottom or bottom to top.  Valid values: ( lr-tb, rl-tb, tb-rl,
 * lr, rl, tb, inherit )
 * @property {string} [anchor=start] - Specifies where this text should be anchored to.
 * Valid values: ( start | middle | end )
 * @property {d3fill_spec} [fill] - The fill to be applied to this text.
 * @property {string} [format] - A d3 format to be applied to the text.
 *
 */

/**
 *
 * A D3 rectangle specification.
 *
 * @typedef {Object} d3rect_spec
 *
 * @property {number} [width=50] - The width of this rectangle.
 * @property {number} [height=50] - The height of this rectangle.
 * @property {number} [x=0] - The x coordinate of the top left corner of this rectangle.
 * @property {number} [y=0] - The y coordinate of the top left corner of this rectangle.
 * @property {number} [rx=0] - For rounded rectangles, the x-axis radius of the ellipse
 * used to round off the corners of the rectangle.
 * @property {number} [ry=0] - For rounded rectangles, the y-axis radius of the ellipse
 * used to round off the corners of the rectangle.
 * @property {d3stroke_spec} [stroke] - The stroke which will be used to draw the rectangle.
 * @property {number} [opacity=1] - The opacity for this rectangle expressed as a floating
 * point number in the range of [ 0.0, 1.0 ] where 0 is transparent, 1 is opaque, and all
 * others are somewhere in between fully transparent and fully opaque.
 * @property {d3colorscale} [color=d3.scale.category20()] - The color scale which we will
 * to color this rectangle.
 * @property {string} [transform] - A transform, if any, to be applied to this rectangle.
 * @property {events_spec} [events] - Any events which we wish to respond to.
 *
 */

/**
 *
 * An events specification.  Many events are supported, the ones listed here are a subset
 * of all of the possible events.  For a complete list, refer to Mozilla's developer documentation
 * concerning {@link https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events|standard events}.
 *
 * @typedef {Object} dexevents_spec
 *
 * @property {string} [mousedown] - Handles events generated when a pointing device button (usually a mouse)
 * is pressed on an element.
 * @property {string} [mouseenter] - Handles mouseover events generated when a pointing device is moved onto
 * the element that has the listener attached.
 * @property {string} [mouseleave] - Handles mouseover events generated when a pointing device is moved off
 * the element that has the listener attached.
 * @property {string} [mousemove] - Handles mouseover events generated when a pointing device is moved over
 * an element.
 * @property {string} [mouseout] - Handles mouseover events generated when a pointing device is moved off
 * the element that has the listener attached or off one of its children.
 * @property {string} [mouseover] - Handles mouseover events generated when a pointing device is moved
 * onto the element that has the listener attached or onto one of its children.
 * @property {string} [mouseup] - Handles mouseover events generated when a pointing device button is
 * released over an element.
 * @property {string} [dblclick] - Handles mouseover events generated when a pointing device is quickly
 * clicked twice on an element.
 * @property {string} [wheel] - The mouse wheel of a pointing device has been rotated in any direction.
 * @property {string} [keydown] - Handles mouseover events generated when a key is pressed down.
 * @property {string} [keypress] - Handles mouseover events generated when a key is pressed down
 * and that key normally produces a character value.
 * @property {string} [keyup] - Handles mouseover events generated when a key is released.
 * @property {string} [message] - A message is received from something.  ie: WebSocket, Web Worker,
 * iframe, parent window or other event source.
 * @property {string} [drag] - Handles mouseover events generated when an element or text selection
 * is being dragged (every 350ms).
 * @property {string} [dragend] - Handles mouseover events generated when a drag operation is being
 * ended (by releasing a mouse button or hitting the escape key).
 * @property {string} [dragenter] - Handles mouseover events generated when a dragged element or
 * text selection enters a valid drop target.
 * @property {string} [dragleave] - Handles mouseover events generated when a dragged element or
 * text selection leaves a valid drop target.
 * @property {string} [dragover] - Handles mouseover events generated when an n element or text
 * selection is being dragged over a valid drop target (every 350ms).
 * @property {string} [dragstart] - Handles mouseover events generated when the user starts
 * dragging an element or text selection.
 * @property {string} [drop] - Handles mouseover events generated when an element is dropped
 * on a valid drop target.
 *
 * @property {string} [touchcancel] - Handles mouseover events generated when a touch point
 * has been disrupted in an implementation-specific manners (too many touch points for example).
 * @property {string} [touchend] - Handles mouseover events generated when a touch point is
 * removed from the touch surface.
 * @property {string} [touchenter] - Handles mouseover events generated when a touch point
 * is moved onto the interactive area of an element.
 * @property {string} [touchleave] - Handles mouseover events generated when a touch point
 * is moved off the interactive area of an element.
 * @property {string} [touchmove] - Handles mouseover events generated when a touch point
 * is moved along the touch surface.
 * @property {string} [touchstart] - Handles mouseover events generated when a touch point
 * is placed on the touch surface.
 *
 */


/**
 *
 * A D3 line specification.
 *
 * @typedef {Object} d3line_spec
 *
 * @property {d3point_spec} [start] - The starting point for this line.
 * @property {d3_point_spec} [end] - The ending point for this line.
 * @property {d3stroke_spec} [strokc] - The stroke to be used when drawing this line.
 *
 */

/**
 *
 * A D3 point specification.
 *
 * @typedef {Object} d3point_spec
 *
 * @property {number} [x] - The starting point for this line.
 * @property {number} [y] - The ending point for this line.
 *
 */

/**
 *
 * A D3 circle specification.
 *
 * @typedef {Object} d3point_spec
 *
 * @property {number} [cx] - The x-coordinate of the center point of this circle.
 * @property {number} [cy] - The y-coordinate of the center point of this circle.
 * @property {number} [r] - The radius of the circle.
 * @property {d3fill_spec} [fill] - The circle's fill.
 * @property {d3stroke_spec} [stroke] - The circle's stroke.
 * @property {string} [transform] - A transform, if any, to be applied to this circle.
 * @property {string} [title] - The title of the circle.
 * @property {d3events_spec} [events] - Any events to be associated with this circle.
 *
 */

/**
 *
 * A D3 tick specification.
 *
 * @typedef {Object} d3tick_spec
 *
 * @property {number} [count] - The number of ticks to dra.
 * @property {object} [size] - The size of the tick.
 * @property {number} [size.major] - The length of the major ticks.
 * @property {number} [size.minor] - The length of the minor ticks.
 * @property {number} [size.end] - The length of the ticks at the ends of the axis.
 * @property {number} [padding] - The padding for ticks.
 * @property {string} [format] - The format to be applied to each tick label.
 * @property {d3text_spec} [label] - The specification for the appearance of tick
 * labels.
 *
 */

/**
 *
 * A D3 path specification.
 *
 * @typedef {Object} d3path_spec
 *
 * @property {d3fill_spec} [fill] - The fill to apply when drawing this path.
 * @property {d3stroke_spec} [stroke] - The stroke to use when drawing this path.
 *
 */

/**
 *
 * A D3 fill specification.
 * @typedef {Object} d3fill_spec
 *
 * @property {string} [fillColor=grey] - The color of this fill.
 * @property {float} [opacity=1] - The opacity of this fill in the range of
 * where 0 is invisible and 1 represents 100% opaque fill. [0, 1]
 *
 */

/**
 *
 * A D3 link specification.
 * @typedef {Object} d3link_spec
 *
 * @property {d3fill} [fill] - The fill to be used for this link.
 * @property {d3stroke} [stroke] - The stroke to be used for this link.
 * @property {string} [transform] - The transform to apply to this link.
 * @property {object} d - The data to associate with this link.
 * @property {d3events} [events] - The events to associate with this link.
 *
 */

/**
 *
 * This is the base constructor for all dex components.  It provides some of the common
 * functionality such as attribute getters/setters, ability to publish and subscribe
 * events as well as the ability for the user to provide customized settings for any
 * component configuration value.
 *
 * @constructor
 * @classdesc This interface provides a contract for dex components to implement.
 *
 * @name dex.component
 *
 * @param userConfig A map containing the various options the user wishes to override.
 * @param defaultConfig A map containing the default configuration for this component.
 *
 */
module.exports = function (dex) {
  return function (userConfig, defaultConfig) {
    userConfig = userConfig || {};
    defaultConfig = defaultConfig || {};

    this.debug = false;

    // Allows component construction from other components.
    if (userConfig.hasOwnProperty('config')) {
      this.config = dex.config.expandAndOverlay(userConfig.config, defaultConfig);
    }
    // Else, we have a configuration.
    else {
      this.config = dex.config.expandAndOverlay(userConfig, defaultConfig);
    }

    dex.console.log("dex.component Configuration", this.config);

    if (!this.config.channel) {
      this.config.channel = (this.config.parent || "#parent") + "/" +
        (this.config.id || "unknown-id");
    }

    /**
     * This method provides getter/setter access for the configuration of a
     * DexComponent.
     *
     * Names can express hierarchy.  An attribute named 'a' may have a
     * child attribute named 'b'.  In this case, the name of attribute
     * 'a' is simply 'a'.  The name of attribute 'b' would be 'a.b'.
     *
     * attr(name) Retrieve retrieve the current value of the attribute with
     * matching name.
     *
     * attr(name, value) Set the attribute with the matching name to the
     * specified value.
     *
     * @method dex.component.attr
     *
     * @param name The name of the attribute.
     * @param value The value of the attribute.
     *
     * @example {@lang javascript}
     * // Set an attribute named "foo" to "bar"
     * myComponent.attr("foo", "bar");
     *
     * // Returns "bar"
     * myComponent.attr("foo");
     *
     * // Set an attribute named "foo" which belongs to an object named
     * // nested which in turn belongs to myComponent.
     * myComponent.attr("nested.foo", "bar");
     *
     * // Returns "bar"
     * myComponent.attr("nested.foo");
     *
     * // Does nothing, returns myComponent
     * myComponent.attr();
     *
     * @returns {string|component} If only name is provided, attr will return the value of
     * the requested attribute.  If both name and value are provided, then
     * the attribute corresponding to the name will be set to the supplied
     * value and the component itself will be returned.
     */
    this.attr = function (name, value) {
      if (arguments.length == 0) {
        return this.config;
      }
      else if (arguments.length == 1) {
        // REM: Need to getHierarchical
        return this.config[name];
      }
      else if (arguments.length == 2) {
        //console.log("Setting Hieararchical: " + name + "=" + value);
        //console.dir(this.config);

        // This will handle the setting of a single attribute
        dex.object.setHierarchical(this.config, name, value, '.');
      }
      return this;
    };

    /**
     * Subscribe this component to the events of type eventTYpe
     * generated by the source this.  When events are received,
     * invoke the callback.
     *
     * @method dex.this.subscribe
     *
     * @param {component} source - The source component
     * @param {string} eventType - The name of the event we are subscribing to.
     * @param callback - The function to be invoked when this event is
     * received.
     *
     * @returns {handle|false} False if function is called incorrectly.
     * Otherwise, the function returns a handle which can later be used
     * to unsubscribe to the events.
     *
     */
    this.subscribe = function (source, eventType, callback) {
      if (arguments.length == 3) {
        var channel = source.config.channel + '/' + eventType;

        dex.console.log("subscribe to " + channel);
        if (arguments.length < 3) {
          dex.console.log("failed");
          return false;
        }
        return dex.bus.subscribe(channel, callback);
      }
      else {
        return false;
      }
    };

    /**
     *
     * Unsubscribe this component.
     *
     * @method dex.component.unsubscribe
     *
     * @param handle - The handle attained via subscribe.
     *
     */
    this.unsubscribe = function (handle) {
      dex.bus.unsubscribe(handle);
    };

    /**
     *
     * Publish an event to the component's subscribers.
     *
     * @method dex.component.publish
     *
     * @param event - The event to publish.  An event can be any object, however,
     * it must define a property named "type".
     * @param event.type - The type of the event we are publishing.
     *
     */
    this.publish = function (event) {
      var channel;

      if (!event || !event.type) {
        dex.console.warn("publish of event to " + this.channel + " failed.");
        dex.bus.publish("error", {
          type: "error",
          "description": "Error publishing event: '" + event + "' to '" + this.channel + "'"
        });
      }
      else {
        channel = this.config.channel + '/' + event.type;
        dex.console.log("publish to " + channel);
        dex.bus.publish(channel, event);
      }
    };

    this.resize = function resize(chart) {
      return function() {
        if (chart.config && chart.config.resizable) {
          var width = d3.select(chart.config.parent).property("clientWidth");
          var height = d3.select(chart.config.parent).property("clientHeight");

          dex.console.log("Resizing: " + chart.config.parent + " to (" +
            width + "w x " + height + "h");

          if (!_.isNumber(height)) {
            height = "100%";
          }

          if (!_.isNumber(width)) {
            width = "100%";
          }

          return chart.attr("width", width).attr("height", height).update();
        }
        else {
          return chart.update();
        }
      };
    }

    /**
     *
     * A default no-op implementation of render.  Subclasses should
     * override this method with one which provides an initial rendering
     * of their specific component.  This is a great place to put
     * one-time only initialization logic.
     *
     * @method dex.component.render
     *
     */
    this.render = function () {
      console.log("Unimplemented routine: render()");
    };

    /**
     *
     * A default no-op implementation of update.  This will update the
     * current component relative to any new setting or data changes.
     *
     * @method dex.component.update
     *
     */
    this.update = function () {
      console.log("Unimplemented routine: update()");
      return this;
    };

    this.configure = function (config) {
      dex.console.log("Configuration", "new", config, "current", this.config);
      this.config = dex.config.expandAndOverlay(config, this.config);
      dex.console.log("New Configuration", this.config);
      return this;
    };

    this.load = function (location) {
      var config = {};

      $(location + " div").each(function (i) {
        dex.console.log("Loading Setting: '" + $(this).attr('id') + "'='" +
          $(this).attr('value') + "'");
        config[$(this).attr('id')] = $(this).attr('value');
      });

      dex.console.log("Loaded Configuration:", config);
      return this.configure(config);
    };

    this.save = function (location, config) {
      dex.console.log("Saving Configuration To: " + location, config);
      $(location).children().remove();
      _.keys(config).forEach(function (key) {
        $(location).append("<div id='" + key + "' value='" + config[key] + "'></div>");
      });
      return this;
    };
  };
};
},{}],50:[function(require,module,exports){
/**
 *
 * Config module.
 * @module dex/config
 * @name config
 * @memberOf dex
 *
 */

module.exports = function config(dex) {

  return {

    /**
     *
     * This routine supports a shorthand notation allowing the
     * user to specify deeply nested configuration options without
     * having to deal with nested json structures.
     *
     * Options like:
     *
     * {
 *   'cell' : {
 *     'rect' : {
 *       'width' : 10,
 *       'height' : 20,
 *       'events' : {
 *         'mouseover' : function(d) { console.log("MouseOver: " + d); }
 *       }
 *     }
 *   }
 * }
     *
     * Can now be described more succinctly and more readably as:
     *
     * {
 *   'cell.rect.width'            : 10,
 *   'cell.rect.height'           : 20,
 *   'cell.rect.events.mouseover' : function(d) { console.log("Mouseover: " + d); }
 * }
     *
     * Or a hybrid strategy can be used:
     *
     * {
 *   'cell.rect' : {
 *     'width' : 10,
 *     'height' : 20,
 *     'events.mouseover' : function(d) { console.log("Mouseover: " + d); }
 *   }
 * }
     *
     * @param {object} config The configuration to expand.
     * @returns {*} The expanded configuration.  The original configuration
     *   is left untouched.
     *
     */
    'expand': function expand(config) {
      var name, ci;
      var expanded = {};

      // We have nothing, return nothing.
      if (!config) {
        return config;
      }

      //dex.console.log("dex.config.expand(config=", config);

      for (var name in config) {
        if (config.hasOwnProperty(name)) {
          // Name contains hierarchy:
          if (name && name.indexOf('.') > -1) {
            expanded[name] = config[name];
            dex.object.setHierarchical(expanded, name,
              dex.object.clone(expanded[name]), '.');
            delete expanded[name];
          }
          // Simple name
          else {
            // If the target is an object with no children, clone it.
            if (dex.object.isEmpty(config[name])) {
              //dex.console.log("SET PRIMITIVE: " + name + "=" + config[name]);
              expanded[name] = dex.object.clone(config[name]);
              //expanded[name] = config[name];
            }
            else {
              //dex.console.log("SET OBJECT: " + name + " to the expansion of", config[name]);
              expanded[name] = dex.config.expand(config[name]);
            }
          }
        }
      }

      //dex.console.log("CONFIG", config, "EXPANDED", expanded);
      return expanded;
    },

    /**
     *
     * This routine will expand hiearchically delimited names such as
     * foo.bar into a structure { foo : { bar : value}}.  It will delete
     * the hierarchical name and overwrite the value into the proper
     * location leaving any previous object properties undisturbed.
     *
     * @param {Object} config The configuration which we will expand.
     *
     */

    /*
     exports.expand_deprecate = function expand(config) {
     var name,
     ci,
     expanded;

     // We have nothing, return nothing.
     if (!config) {
     return config;
     }

     //dex.console.log("dex.config.expand(config=", config);

     // Make a clone of the previous configuration.
     expanded = dex.object.clone(config);

     // Iterate over the property names.
     for (name in config) {
     // If this is our property the process it, otherwise ignore.
     if (config.hasOwnProperty(name)) {
     // The property name is non-null.
     if (name) {
     // Determine character index.
     ci = name.indexOf('.');
     }
     else {
     // Default to -1
     ci = -1;
     }

     // if Character index is > -1, we have a hierarchical name.
     // Otherwise do nothing, copying was already handled in the
     // cloning activity.
     if (ci > -1) {
     // Set it...
     dex.object.setHierarchical(expanded, name,
     dex.object.clone(expanded[name]), '.');
     // Delete the old name.
     delete expanded[name];
     }
     }
     }

     //dex.console.log("CONFIG", config, "EXPANDED", expanded);
     return expanded;
     };
     */

    /**
     *
     * This routine will take two hierarchies, top and bottom, and expand dot ('.')
     * delimited names such as: 'foo.bar.biz.baz' into a structure:
     * { 'foo' : { 'bar' : { 'biz' : 'baz' }}}
     * It will then overlay the top hierarchy onto the bottom one.  This is useful
     * for configuring objects based upon a default configuration while allowing
     * the client to conveniently override these defaults as needed.
     *
     * @param {object} top - The top object hierarchy.
     * @param {object} bottom - The bottom, base object hierarchy.
     * @returns {object} - A new object representing the expanded top object
     * hierarchy overlaid on top of the expanded bottom object hierarchy.
     *
     */
    'expandAndOverlay': function expandAndOverlay(top, bottom) {
      //dex.console.log(
      //dex.config.getCallerString(arguments.callee.caller),
      //"TOP", top,
      //"BOTTOM", bottom,
      //"EXPANDED TOP", dex.config.expand(top),
      //"EXPANDED BOTTOM", dex.config.expand(bottom));
      return dex.object.overlay(dex.config.expand(top),
        dex.config.expand(bottom));
    },

    /**
     *
     * Return the configuration for a font after the user's customizations
     * have been applied.
     *
     * @param {d3font_spec} custom - The user customizations.
     * @returns {d3font_spec} - An object containing the font's specifications
     * after the user's customizations have been applied.
     *
     */
    'font': function font(custom) {
      var defaults =
        {
          'decoration': 'none',
          'family': 'sans-serif',
          'letterSpacing': 'normal',
          'size': 14,
          'style': 'normal',
          'weight': 'normal',
          'wordSpacing': 'normal',
          'variant': 'normal'
        };

      var fontSpec = dex.config.expandAndOverlay(custom, defaults);
      return fontSpec;
    },

    /**
     *
     * Configure the given font with the supplied font specification.
     *
     * @param {object} node - The node to be configured.
     * @param {d3font_spec} fontSpec - The font specification to be applied.
     *
     * @returns {*} The node after having the font specification applied.
     *
     */
    'configureFont': function configureFont(node, fontSpec, i) {
      //dex.console.log("CONFIG-FONT: " + i);
      if (fontSpec) {
        dex.config.setAttr(node, 'font-family', fontSpec.family, i);
        dex.config.setAttr(node, 'font-size', fontSpec.size, i);
        dex.config.setAttr(node, 'font-weight', fontSpec.weight, i);
        dex.config.setAttr(node, 'font-style', fontSpec.style, i);
        dex.config.setAttr(node, 'text-decoration', fontSpec.decoration, i);

        dex.config.setAttr(node, 'word-spacing', fontSpec.wordSpacing, i);
        dex.config.setAttr(node, 'letter-spacing', fontSpec.letterSpacing, i);
        dex.config.setAttr(node, 'variant', fontSpec.variant, i);
      }
      return node;
    },

    /**
     *
     * Construct a text speficiation.
     *
     * @param {d3text_spec} custom - The user's adjustments to the default text
     * specification.
     *
     * @returns {d3text_spec} A revised text specification after having applied
     * the user's modfiications.
     *
     */
    'text': function text(custom) {
      var defaults =
        {
          'font': dex.config.font(),
          'x': 0,
          'y': 0,
          'textLength': undefined,
          'lengthAdjust': undefined,
          'transform': '',
          'glyphOrientationVertical': undefined,
          'text': undefined,
          'dx': 0,
          'dy': 0,
          'writingMode': undefined,
          'anchor': 'start',
          'fill': dex.config.fill(),
          'format': undefined,
          'events': dex.config.events()
        };

      var textSpec = dex.config.expandAndOverlay(custom, defaults);
      return textSpec;
    },

    /**
     *
     * This routine will dynamically configure an SVG text entity based upon the
     * supplied configuration.
     *
     * @param {object} node The SVG text node to be configured.
     * @param {d3text_spec} textSpec The text specification for this node.
     *
     * @returns {*} The node after having applied the text specification.
     *
     */
    'configureText': function configureText(node, textSpec, i) {
      //dex.console.log("CONFIG-TEXT: " + i);
      if (textSpec) {
        dex.config.setAttr(node, "x", textSpec.x, i);
        dex.config.setAttr(node, "y", textSpec.y, i);
        dex.config.setAttr(node, "dx", textSpec.dx, i);
        dex.config.setAttr(node, "dy", textSpec.dy, i);
        dex.config.setStyle(node, "text-anchor", textSpec.anchor, i);
        dex.config.configureFont(node, textSpec.font, i);
        dex.config.setAttr(node, 'textLength', textSpec.textLength, i);
        dex.config.setAttr(node, 'lengthAdjust', textSpec.lengthAdjust, i);
        dex.config.setAttr(node, 'transform', textSpec.transform, i);
        dex.config.setAttr(node, 'glyph-orientation-vertical',
          textSpec.glyphOrientationVertical, i);
        dex.config.setAttr(node, 'writing-mode', textSpec.writingMode, i);
        dex.config.callIfDefined(node, 'text', textSpec.text, i);
        dex.config.configureFill(node, textSpec.fill, i);
        dex.config.configureEvents(node, textSpec.events, i);
      }
      return node;
    },

    /**
     *
     * Construct a stroke specification.
     *
     * @param {d3text_spec} strokeSpec - The user's customizations to the specification.
     *
     * @returns {d3text_spec} The stroke specification after having applied the user's
     * configuration.
     *
     */
    'stroke': function stroke(strokeSpec) {
      var defaults =
        {
          'width': 1,
          'color': "black",
          'opacity': 1,
          'dasharray': '',
          'transform': ''
        };

      var config = dex.config.expandAndOverlay(strokeSpec, defaults);
      return config;
    },

    /**
     *
     * Apply a stroke specification to a node.
     *
     * @param {object} node - The node to be configured.
     * @param {d3stroke_spec} strokeSpec - The stroke specification to be applied.
     * @returns The newly configured node.
     */
    'configureStroke': function configureStroke(node, strokeSpec, i) {
      if (strokeSpec) {
        dex.config.setAttr(node, "stroke", strokeSpec.color, i);
        dex.config.setStyle(node, 'stroke-width', strokeSpec.width, i);
        dex.config.setStyle(node, 'stroke-opacity', strokeSpec.opacity, i);
        dex.config.setStyle(node, 'stroke-dasharray', strokeSpec.dasharray, i);
        dex.config.setAttr(node, 'transform', strokeSpec.transform, i);
      }
      return node;
    },
    /**
     *
     * Construct a fill specification which allow the user to override any
     * its settings.
     *
     * @param {d3fill_spec} custom - The user's customizations.
     * @returns {d3fill_spec} A fill specification which has applied the user's
     * customizations.
     *
     */
    'fill': function fill(custom) {
      var defaults =
        {
          'fillColor': "grey",
          'fillOpacity': 1
        };

      var config = dex.config.expandAndOverlay(custom, defaults);
      return config;
    },

    /**
     *
     * Apply a fill specification to a node.
     *
     * @param {object} node - The node to be configured.
     * @param {d3fill_spec} config - The fill specification.
     *
     * @returns {object} The node after having applied the fill specification.
     *
     */
    'configureFill': function configureFill(node, config, i) {
      if (config) {
        dex.config.setStyle(node, 'fill', config.fillColor, i);
        dex.config.setStyle(node, 'fill-opacity', config.fillOpacity, i);
      }
      return node;
    },

    /**
     *
     * Construct a link specification which allows the user to override any
     * of the settings.
     *
     * @param {d3link_spec} custom - The users customizations.
     *
     * @returns {d3link_spec} A link specification generated by combining the
     * default with the user's customizations.
     *
     */
    'link': function link(custom) {
      var defaults =
        {
          'fill': dex.config.fill(),
          'stroke': dex.config.stroke(),
          'transform': '',
          'd': undefined,
          'events': dex.config.events()
        };

      var config = dex.config.expandAndOverlay(custom, defaults);
      return config;
    },

    /**
     *
     * Apply a link specification to a node.
     *
     * @param {object} node - The node to apply the specification to.
     * @param {d3link_spec} config - The link specification.
     *
     * @returns {object} The node after having applied the specification.
     *
     */
    'configureLink': function configureLink(node, config, i) {
      if (config) {
        dex.config.configureStroke(node, config.stroke, i);
        dex.config.configureFill(node, config.fill, i);
        dex.config.setAttr(node, 'transform', config.transform, i);
        dex.config.setAttr(node, 'd', config.d, i);
        dex.config.configureEvents(node, config.events, i);
      }
      return node;
    },

    /**
     *
     * Construct a rectangle specification which allows the user to override any
     * of the settings.
     *
     * @param {d3rect_spec} custom - The users customizations.
     *
     * @returns {d3rect_spec} A rectangle specification generated by combining the
     * default with the user's customizations.
     *
     */
    'rectangle': function rectangle(custom) {
      var config =
        {
          'width': 50,
          'height': 50,
          'x': 0,
          'y': 0,
          'rx': 0,
          'ry': 0,
          'stroke': dex.config.stroke(),
          'opacity': 1,
          'color': d3.scale.category20(),
          'transform': undefined,
          'events': dex.config.events()
        };
      if (custom) {
        config = dex.object.overlay(custom, config);
      }
      return config;
    },

    'configureRectangle': function configureRectangle(node, config, i) {
      if (config) {
        dex.config.setAttr(node, 'width', config.width, i);
        dex.config.setAttr(node, 'height', config.height, i);
        dex.config.setAttr(node, 'x', config.x, i);
        dex.config.setAttr(node, 'y', config.y, i);
        dex.config.setAttr(node, 'rx', config.rx, i);
        dex.config.setAttr(node, 'ry', config.ry, i);
        dex.config.setAttr(node, 'opacity', config.opacity, i);
        dex.config.setAttr(node, 'fill', config.color, i);
        dex.config.setAttr(node, 'transform', config.transform, i);
        dex.config.configureStroke(node, config.stroke, i);
        dex.config.configureEvents(node, config.events, i);
      }
      return node;
    },

    /**
     *
     * Construct an events specification which allows the user to override any
     * of the settings.
     *
     * @param {d3events_spec} custom - The users customizations.
     *
     * @returns {d3events_spec} An events specification generated by combining the
     * default with the user's customizations.
     *
     */
    'events': function events(custom) {
      var defaults =
        {
          // REM: Deletes any existing events.
          //'mouseover': function (d) {
          //console.log("Default mouseover");
          //}
        };
      var config = defaults;

      if (custom) {
        config = dex.object.overlay(custom, defaults);
      }
      return config;
    },

    'configureEvents': function configureEvents(node, config, i) {
      //dex.console.log("Configure Events", config, i);
      if (config) {
        for (var key in config) {
          //dex.console.log("KEY", key, "VALUE", config[key]);
          dex.config.setEventHandler(node, key, config[key], i);
        }
      }

      return node;
    },

    /**
     *
     * Construct an line specification which allows the user to override any
     * of the settings.
     *
     * @param {d3line_spec} custom - The users customizations.
     *
     * @returns {d3line_spec} A line specification generated by combining the
     * default with the user's customizations.
     *
     */
    'line': function line(custom) {
      var defaults =
        {
          'start': dex.config.point(),
          'end': dex.config.point(),
          'stroke': dex.config.stroke(),
          'fill': dex.config.fill(),
          'interpolate': undefined
        };
      var config = dex.config.expandAndOverlay(custom, defaults);
      return config;
    },

    'configureLine': function configureLine(node, config, i) {
      if (config) {
        dex.config.setAttr(node, 'x1', config.start.x, i);
        dex.config.setAttr(node, 'y1', config.start.y, i);
        dex.config.setAttr(node, 'x2', config.end.x, i);
        dex.config.setAttr(node, 'y2', config.end.y, i);
        dex.config.configureStroke(node, config.stroke, i);
        dex.config.configureFill(node, config.fill, i);
        if (config.interpolate) {
          //dex.console.log("interpolate", node, config, i);
          node.interpolate(config.interpolate);
          // I think this is closer to correct....but breaks the motion line chart
          //node.interpolate(dex.config.optionValue(config.interpolate, i));
        }
      }
      return node;
    },

    /**
     *
     * Construct an path specification which allows the user to override any
     * of the settings.
     *
     * @param {d3path_spec} custom - The users customizations.
     *
     * @returns {d3path_spec} A path specification generated by combining the
     * default with the user's customizations.
     *
     */
    'path': function path(custom) {
      var defaults =
        {
          'fill': dex.config.fill(),
          'stroke': dex.config.stroke(),
          'd': undefined
        };
      var config = dex.config.expandAndOverlay(custom, defaults);
      return config;
    },

    'configurePath': function configurePath(node, config, i) {
      if (config) {
        dex.config.configureFill(node, config.fill, i);
        dex.config.configureStroke(node, config.stroke, i);
        dex.config.setAttr(node, 'd', config.d, i);
      }
      return node;
    },

    'getCallers': function getCallers(caller) {
      var callers = [];
      var currentCaller = caller;
      for (; currentCaller; currentCaller = currentCaller.caller) {
        if (currentCaller.name) {
          callers.push(currentCaller.name);
        }
      }

      return callers.reverse();
    },

    'getCallerString': function getCallerString(caller) {
      return dex.config.getCallers(caller).join("->");
    },

    'setEventHandler': function setEventHandler(node, eventType, eventHandler, i) {
      var callerStr = dex.config.getCallerString(arguments.callee.caller);

      //dex.console.debug(callerStr + ": setEventHandler(node=" + node + ", eventType=" + eventType + ", eventHandler=" + eventHandler);
      if (!node) {
        dex.console.debug(callerStr + ": dex.config.setEventHandler(eventType='" + eventType + "eventHandler=" + eventHandler + ") : node is null.");
        return node;
      }
      if (!dex.object.isFunction(node.on)) {
        dex.console.debug(callerStr + ": dex.config.setEventHandler(eventType='" + eventType + "', eventHandler='" + eventHandler +
          "') : target node is missing function: node.on(eventType,eventHandler).  Node dump:", node);
        return node;
      }
      if (typeof eventHandler != 'undefined') {
        dex.console.debug(callerStr + ": Set Event Handler: '" + eventType + "'='" + eventHandler + "'");
        node.on(eventType, eventHandler);
      }
      else {
        dex.console.debug(callerStr += ": Undefined Event Handler: '" + eventType + "'='" + eventHandler + "'");
      }
      return node;
    },

    'setAttr': function setAttr(node, name, value, i) {
      var callerStr = dex.config.getCallerString(arguments.callee.caller);
      if (!node) {
        dex.console.debug(callerStr + ": dex.config.setAttr(name='" + name + "value=" + value + ") : node is null.");
        return node;
      }
      if (!dex.object.isFunction(node.attr)) {
        dex.console.debug(callerStr + ": dex.config.setAttr(name='" + name + "', value='" + value +
          "') : target node is missing function: node.attr.  Node dump:", node);
        return node;
      }
      if (typeof value != 'undefined') {
        dex.console.debug(callerStr + ": Set Attr: '" + name + "'='" + value + "'");
        node.attr(name, dex.config.optionValue(value, i));
      }
      else {
        dex.console.debug(callerStr += ": Undefined Attr: '" + name + "'='" + value + "'");
      }
      return node;
    },

    'setStyle': function setStyle(node, name, value, i) {
      var callerStr = dex.config.getCallerString(arguments.callee.caller);
      if (!node) {
        dex.console.warn(callerStr + ": dex.config.setAttr(name='" + name + "value=" + value + ") : node is null.");
        return node;
      }
      if (!dex.object.isFunction(node.style)) {
        dex.console.debug(callerStr + ": dex.config.setStyle(name='" + name + "', value='" + value +
          "') : target node is missing function: node.style.  Node Dump:", node);
        return node;
      }
      if (typeof value !== 'undefined' && node && dex.object.isFunction(node.style)) {
        dex.console.debug(callerStr + ": Set Style: name='" + name + "', Value Dump:",
          dex.config.optionValue(value, i));
        node.style(name, dex.config.optionValue(value, i));
      }
      else {
        dex.console.debug(callerStr + ": Undefined Style: name='" + name + "', Value Dump:", value);
      }
      return node;
    },

    'optionValue': function optionValue(option, i) {
      //dex.console.log("OPTION-I: " + i);

      // Curry value i:
      if (typeof i !== 'undefined') {
        return function (d) {
          //dex.console.log("OPTION", option, "D", d, "I", i);
          if (dex.object.isFunction(option)) {
            return option(d, i);
          }
          else {
            return option;
          }
        };
      }
      else {
        return function (d, i) {
          //dex.console.log("OPTION", option, "D", d, "I", i);
          if (dex.object.isFunction(option)) {
            return option(d, i);
          }
          else {
            return option;
          }
        };
      }
    },

    /**
     *
     * Is this correct?  It looks suspect to me.
     *
     * @param node
     * @param fn
     * @param value
     * @param i
     * @returns {*}
     */
    'callIfDefined': function callIfDefined(node, fn, value, i) {
      //dex.console.log("CALL-IF-DEFINED: fn=" + fn + ", value=" + value + ", I=" + i);
      if (typeof value === 'undefined') {
        //dex.console.log("Skipping: " + fn + "()");
      }
      else {
        //dex.console.log("Calling: '" + fn + "(" + value + ")");
        return node[fn](dex.config.optionValue(value, i));
      }

      return node;
    },

    /**
     *
     * Construct an point specification which allows the user to override any
     * of the settings.
     *
     * @param {d3point_spec} custom - The users customizations.
     *
     * @returns {d3point_spec} A point specification generated by combining the
     * default with the user's customizations.
     *
     */
    'point': function point(custom) {
      var config =
        {
          'x': undefined,
          'y': undefined
        };
      if (custom) {
        config = dex.object.overlay(custom, config);
      }
      return config;
    },

    'configurePoint': function configurePoint(node, config, i) {
      if (config) {
        node
          .attr('x', dex.config.optionValue(config.center.cx, i))
          .attr('y', dex.config.optionValue(config.center.cy, i));
      }
      return node;
    },

// Configures: opacity, color, stroke.
    'configureShapeStyle': function configureShapeStyle(node, config, i) {
      if (config) {
        node
          .call(dex.config.configureStroke, config.stroke, i)
          .attr('opacity', config.opacity)
          .style('fill', config.color);
      }
      return node;
    },

    /**
     *
     * Construct an circle specification which allows the user to override any
     * of the settings.
     *
     * @param {d3circle_spec} custom - The users customizations.
     *
     * @returns {d3circle_spec} A circle specification generated by combining the
     * default with the user's customizations.
     *
     */
    'circle': function circle(custom) {
      var config =
        {
          'cx': 0,
          'cy': 0,
          'r': 10,
          'fill': dex.config.fill(),
          'stroke': dex.config.stroke(),
          'transform': '',
          'title': '',
          'events': dex.config.events()
        };
      if (custom) {
        config = dex.object.overlay(custom, config);
      }
      return config;
    },

    'configureCircle': function configureCircle(node, config, i) {
      if (config) {
        dex.config.setAttr(node, "r", config.r, i);
        dex.config.setAttr(node, "cx", config.cx, i);
        dex.config.setAttr(node, "cy", config.cy, i);
        dex.config.setAttr(node, "transform", config.transform, i);
        dex.config.setAttr(node, "title", config.title, i);
        dex.config.configureStroke(node, config.stroke, i);
        dex.config.configureFill(node, config.fill, i);
        dex.config.configureEvents(node, config.events, i);
      }
      return node;
    },

    /*
     exports.configureAxis_deprecated = function configureAxis_deprecated(config) {
     var axis;

     if (config) {
     var axis = d3.svg.axis()
     .ticks(config.tick.count)
     .tickSubdivide(config.tick.subdivide)
     .tickSize(config.tick.size.major, config.tick.size.minor,
     config.tick.size.end)
     .tickPadding(config.tick.padding);

     // REM: Horrible way of doing this.  Need a function which
     // is more generic and smarter to short circuit stuff like
     // this.  But...for now it does what I want.
     if (!dex.object.isFunction(config.tick.format)) {
     axis.tickFormat(config.tick.format);
     }

     axis
     .orient(config.orient)
     .scale(config.scale);
     }
     else {
     axis = d3.svg.axis();
     }
     //axis.scale = config.scale;
     return axis;
     };
     */

    /**
     *
     * Construct an tick specification which allows the user to override any
     * of the settings.
     *
     * @param {d3tick_spec} custom - The users customizations.
     *
     * @returns {d3tick_spec} A tick specification generated by combining the
     * default with the user's customizations.
     *
     */
    'tick': function tick(custom) {
      var config =
        {
          'count': 5,
          //'tickValues'  : undefined,
          'subdivide': 3,
          'size': {
            'major': 5,
            'minor': 3,
            'end': 5
          },
          'padding': 5,
          'format': d3.format(",d"),
          'label': dex.config.text()
        };
      if (custom) {
        config = dex.object.overlay(custom, config);
      }
      return config;
    },

    /*
     exports.xaxis_deprecate = function (custom) {
     var config =
     {
     'scale'  : d3.scale.linear(),
     'orient' : "bottom",
     'tick'   : this.tick(),
     'label'  : dex.config.text()
     };
     if (custom) {
     config = dex.object.overlay(custom, config);
     }
     return config;
     };

     exports.yaxis_deprecate = function (custom) {
     var config =
     {
     'scale'  : d3.scale.linear(),
     'orient' : 'left',
     'tick'   : this.tick(),
     'label'  : dex.config.text({'transform' : 'rotate(-90)'})
     };
     if (custom) {
     config = dex.object.overlay(custom, config);
     }
     return config;
     };
     */

    'callConditionally': function callConditionally(fn, value, i) {
      //dex.console.log("- FN:" + fn);
      //dex.console.log("- VALUE:" + value);
      if (value !== undefined) {
        //dex.console.log("- CALLING: " + fn + " of " + value);
        if (i !== undefined) {
          fn(value, i);
        }
        else {
          fn(value);
        }
      }
      else {
      }
    },

    /**
     *
     * Configure the input parameters for configuring an axis.
     * Certain defaults are imposed should the "custom" variable
     * not specify that parameter.
     *
     * @param custom The user supplied axis configuration.
     *
     * @returns {d3axis_spec} The axis specification with
     * user supplied overrides applied.
     *
     */
    'axis': function axis(custom) {
      var defaults =
        {
          'scale': dex.config.scale({'type': 'linear'}),
          'orient': 'bottom',
          'ticks': undefined,
          'tickValues': undefined,
          'tickSize': undefined,
          'innerTickSize': undefined,
          'outerTickSize': undefined,
          'tickPadding': undefined,
          'tickFormat': undefined
          //'label'         : dex.config.text()
        };

      var axisSpec = dex.config.expandAndOverlay(custom, defaults);
      return axisSpec;
    },

    /**
     *
     * Create an axis with the specified configuration.
     *
     * @param axis The axis to configure.
     * @param config The user specified axis configuration.
     *
     * @returns {*} The newly configured axis.
     */
    'configureAxis': function configureAxis(axis, config, i) {
      //dex.console.log("CONFAXIS: " + i);
      if (config) {
        [
          'scale',
          'orient',
          'ticks',
          'tickValues',
          'tickSize',
          'innerTickSize',
          'outerTickSize',
          'tickPadding',
          'tickFormat'
        ].forEach(function (fn) {
          //dex.console.log("Calling: " + fn);
          dex.config.callConditionally(axis[fn], config[fn], i);
        });
      }
      return axis;
    },

    'createAxis': function createAxis(userConfig, i) {
      var config = dex.config.axis(userConfig);
      return dex.config.configureAxis(d3.svg.axis(), config, i);
    },

    /**
     *
     * Construct a {d3axis_spec} based on reasonable defaults with
     * user customizations applied on top.
     *
     * @param custom The user customizations.
     *
     * @returns {d3scale_spec} The scale specification with
     * user supplied overrides applied.
     *
     */
    'scale': function scale(custom) {
      var fmap =
        {
          'linear': dex.config.linearScale,
          'sqrt': dex.config.sqrtScale,
          'pow': dex.config.powScale,
          'time': dex.config.timeScale,
          'log': dex.config.logScale,
          'ordinal': dex.config.ordinalScale,
          'quantile': dex.config.quantileScale,
          'quantize': dex.config.quantizeScale,
          'identity': dex.config.identityScale
        };

      var defaults =
        {
          'type': 'linear'
        };

      var config = dex.config.expandAndOverlay(custom, defaults);

      return fmap[config.type](config);
    },

    /**
     *
     * Given a scale specification, create, configure, and return a
     * scale which meets that specification.
     *
     * @param {d3scale_spec} scaleSpec
     * @returns {Object} Returns a d3.scale with the supplied specification.
     *
     */
    'createScale': function createScale(scaleSpec) {
      var scale;

      var fmap =
        {
          'linear': d3.scale.linear,
          'sqrt': d3.scale.sqrt,
          'pow': d3.scale.pow,
          'time': d3.time.scale,
          'log': d3.scale.log,
          'ordinal': d3.scale.ordinal,
          'quantile': d3.scale.quantile,
          'quantize': d3.scale.quantize,
          'identity': d3.scale.identity
        };

      if (scaleSpec) {
        scale = fmap[scaleSpec.type]();

        // Since we create a non-parameterized scale, here we parameterize it based upon
        // the supplied specification
        dex.config.configureScale(scale, scaleSpec);
      }
      else {
        scale = d3.scale.linear();
      }

      return scale;
    },

    /**
     *
     * Construct a linear {d3scale_spec} based on reasonable
     * defaults with user customizations applied on top.
     *
     * @param custom The user customizations.
     *
     * @returns {d3scale_spec} The linear scale specification with
     * user supplied overrides applied.
     *
     */
    'linearScale': function linearScale(custom) {
      var defaults =
        {
          'type': 'linear',
          'domain': [0, 100],
          'range': [0, 800],
          'rangeRound': undefined,
          'interpolate': undefined,
          'clamp': undefined,
          'nice': undefined
        };

      var linearScaleSpec = dex.config.expandAndOverlay(custom, defaults);
      return linearScaleSpec;
    },

    /**
     *
     * Construct a power {d3scale_spec} based on reasonable
     * defaults with user customizations applied on top.
     *
     * @param custom The user customizations.
     *
     * @returns {d3scale_spec} The power scale specification with
     * user supplied overrides applied.
     *
     */
    'powScale': function powScale(custom) {
      var defaults =
        {
          'type': 'pow',
          'domain': [0, 100],
          'range': [0, 800],
          'rangeRound': undefined,
          'interpolate': undefined,
          'clamp': undefined,
          'nice': undefined
        };

      var config = dex.config.expandAndOverlay(custom, defaults);
      return config;
    },

    /**
     *
     * Construct a sqrt {d3scale_spec} based on reasonable
     * defaults with user customizations applied on top.
     *
     * @param custom The user customizations.
     *
     * @returns {d3scale_spec} The sqrt scale specification with
     * user supplied overrides applied.
     *
     */
    'sqrtScale': function sqrtScale(custom) {
      var defaults =
        {
          'type': 'sqrt',
          'domain': [0, 100],
          'range': [0, 800],
          'rangeRound': undefined,
          'interpolate': undefined,
          'clamp': undefined,
          'nice': undefined
        };

      var config = dex.config.expandAndOverlay(custom, defaults);
      return config;
    },

    /**
     *
     * Construct a log {d3scale_spec} based on reasonable
     * defaults with user customizations applied on top.
     *
     * @param custom The user customizations.
     *
     * @returns {d3scale_spec} The log scale specification with
     * user supplied overrides applied.
     *
     */
    'logScale': function logScale(custom) {
      var defaults =
        {
          'type': 'log',
          'domain': [0, 100],
          'range': [0, 800],
          'rangeRound': undefined,
          'interpolate': undefined,
          'clamp': undefined,
          'nice': undefined
        };

      var logSpec = dex.config.expandAndOverlay(custom, defaults);
      return logSpec;
    },

    /**
     *
     * Construct a ordinal {d3scale_spec} based on reasonable
     * defaults with user customizations applied on top.
     *
     * @param custom - The user customizations.
     * @param {object} [custom.rangeRoundBands] -
     * @param {object} [custom.rangeBands] -
     * @param {object} [custom.rangePoints] - rangePoints(interval [, padding]) : Sets the output range from the specified continuous
     * interval. The array interval contains two elements representing the minimum and maximum
     * numeric value. This interval is subdivided into n evenly-spaced points, where n is the
     * number of (unique) values in the input domain. The first and last point may be offset
     * from the edge of the interval according to the specified padding, which defaults to zero.
     * The padding is expressed as a multiple of the spacing between points. A reasonable value
     * is 1.0, such that the first and last point will be offset from the minimum and maximum
     * value by half the distance between points.
     * @param {object} [custom.rangeBands] -
     *
     * @returns {d3scale_spec} The ordinal scale specification with
     * user supplied overrides applied.
     *
     */
    'ordinalScale': function ordinalScale(custom) {
      var defaults =
        {
          'type': 'ordinal',
          'domain': undefined,
          'range': undefined,
          'rangeRoundBands': undefined,
          'rangePoints': undefined,
          'rangeBands': undefined
        };

      var ordinalSpec = dex.config.expandAndOverlay(custom, defaults);
      return ordinalSpec;
    },

    'timeScale': function timeScale(custom) {
      var defaults =
        {
          'type': 'time',
          'domain': undefined,
          'range': undefined,
          'rangeRound': undefined,
          'interpolate': undefined,
          'clamp': undefined,
          'ticks': undefined,
          'tickFormat': undefined
        };

      var config = dex.config.expandAndOverlay(custom, defaults);
      return config;
    },

    'quantileScale': function quantileScale(custom) {
      var defaults =
        {
          'type': 'quantile',
          'domain': undefined,
          'range': undefined
        };

      var config = dex.config.expandAndOverlay(custom, defaults);
      return config;
    },

    'quantizeScale': function quantizeScale(custom) {
      var defaults =
        {
          'type': 'quantize',
          'domain': undefined,
          'range': undefined
        };

      var config = dex.config.expandAndOverlay(custom, defaults);
      return config;
    },

    'identityScale': function identityScale(custom) {
      var defaults =
        {
          'type': 'identity',
          'domain': undefined,
          'range': undefined
        };

      var config = dex.config.expandAndOverlay(custom, defaults);
      return config;
    },

    'thresholdScale': function thresholdScale(custom) {
      var defaults =
        {
          'type': 'threshold',
          'domain': undefined,
          'range': undefined
        };

      var config = dex.config.expandAndOverlay(custom, defaults);
      return config;
    },

    'configureScale': function configureScale(scale, config) {
      if (config) {
        for (var property in config) {
          dex.console.trace("ConfigureScale Property: '" + property + "'");
          if (config.hasOwnProperty(property) && property !== 'type' && config[property] !== undefined) {
            dex.console.trace("Property: '" + property + "'");
            dex.config.callConditionally(scale[property], config[property]);
          }
          else {
            dex.console.debug("Missing Property: '" + property + "'");
          }
        }
      }

      return scale;
    }
  };
};
},{}],51:[function(require,module,exports){
/**
 *
 * This module provides console logging capabilities.
 *
 * @module dex/console
 * @name console
 * @memberOf dex
 *
 */

module.exports = function (dex) {

  /**
   *
   * @type {{TRACE: number, DEBUG: number, NORMAL: number, WARN: number, FATAL: number, NONE: number}}
   */
  dex.logLevels = {
    'TRACE': 5,
    'DEBUG': 4,
    'NORMAL': 3,
    'WARN': 2,
    'FATAL': 1,
    'NONE': 0
  };

  dex.logLevel = dex.logLevels.NORMAL;

  return {

////
//
// dex.console : This module provides routines assisting with console output.
//
////

    /**
     * Log this message if the current log level is greater than or equal
     * to dex.console.logLevel.
     *
     * @param msgLevel The log level for this message.
     * @param msg One or more messages to be logged.  Strings will simply
     * use console.log while objects will use console.dir.
     *
     * @returns {dex.console}
     */
    'logWithLevel': function (msgLevel, msg) {
//  console.log(dex.console.logLevel());
//  console.log(msgLevel);
//  console.dir(msg);

      if (dex.logLevel >= msgLevel) {
        for (i = 0; i < msg.length; i++) {
          if (typeof msg[i] == 'object') {
            console.dir(msg[i]);
          }
          else {
            console.log(msg[i]);
          }
        }
      }
      return this;
    },

    /**
     * Write one or more TRACE level messages.
     *
     * @param msg One or more TRACE messages to log.
     *
     * @returns {dex.console|*}
     */
    'trace': function () {
      return dex.console.logWithLevel(dex.logLevels.TRACE, arguments)
    },

    /**
     * Write one or more DEBUG level messages.
     *
     * @param msg One or more DEBUG messages to log.
     *
     * @returns {dex.console|*}
     */
    'debug': function () {
      return dex.console.logWithLevel(dex.logLevels.DEBUG, arguments)
    },

    /**
     * Write one or more NORMAL level messages.
     *
     * @param msg One or more NORMAL messages to log.
     *
     * @returns {dex.console|*}
     *
     */
    'log': function () {
      //console.log("caller is " + arguments.callee.caller.toString());
      return dex.console.logWithLevel(dex.logLevels.NORMAL, arguments)
    },

    /**
     * Write one or more WARN level messages.
     *
     * @param msg One or more WARN messages to log.
     *
     * @returns {dex.console|*}
     *
     */
    'warn': function () {
      return dex.console.logWithLevel(dex.logLevels.WARN, arguments)
    },

    /**
     * Write one or more FATAL level messages.
     *
     * @param msg One or more FATAL messages to log.
     *
     * @returns {dex.console|*}
     */
    'fatal': function () {
      return dex.console.logWithLevel(dex.logLevels.FATAL, arguments)
    },

    /**
     * This function returns the current log level.
     *
     * @returns The current log level.
     *
     */
    'logLevel': function (_) {
      if (!arguments.length) return dex.logLevel;
      dex.logLevel = dex.logLevels[_];
      return dex.logLevel;
    },

    'logLevels': function () {
      return dex.logLevels;
    }
  };
};
},{}],52:[function(require,module,exports){
/**
 *
 * This module provides support for dealing with csv structures.  This
 * is the core datatype on which dexjs components operate.
 *
 * @module dex/csv
 * @name csv
 * @memberOf dex
 *
 */

module.exports = function csv(dex) {

  return {
    /**
     *
     * @param header
     * @param data
     * @returns {{header: *, data: *}}
     */
    'csv': function (header, data) {
      var csv =
        {
          "header": header,
          "data": data
        };

      return csv;
    },

    /**
     *
     * @param csv
     * @returns {{header: *, data: {header, data}}}
     */
    'transpose': function (csv) {
      return {
        "header": csv.header,
        "data": dex.matrix.transpose(csv.data)
      };
    },

    /**
     * Given a CSV, create a connection matrix suitable for feeding into a chord
     * diagram.  Ex, given CSV:
     *
     * @param csv
     * @returns {{header: Array, connections: Array}|*}
     *
     */
    'getConnectionMatrix': function (csv) {
      var matrix = [];
      var ri, ci;
      var row;
      var cid;
      var header = [];
      var nameToIndex = {};
      var connectionMatrix;
      var uniques;
      var nameIndices = [];
      var src, dest;

      // Create a list of unique values to relate to one another.
      uniques = dex.matrix.uniques(csv.data);
      // Flatten them into our header.
      header = dex.matrix.flatten(uniques);

      // Create a map of names to header index for each column.
      nameToIndex = new Array(uniques.length);
      for (ri = 0, cid = 0; ri < uniques.length; ri++) {
        nameToIndex[ri] =
          {};
        for (ci = 0; ci < uniques[ri].length; ci++) {
          nameToIndex[ri][header[cid]] = cid;
          cid += 1;
        }
      }

      // Create a N x N matrix of zero values.
      matrix = new Array(header.length);
      for (ri = 0; ri < header.length; ri++) {
        row = new Array(header.length);
        for (ci = 0; ci < header.length; ci++) {
          row[ci] = 0;
        }
        matrix[ri] = row;
      }
      //dex.console.log("nameToIndex", nameToIndex, "matrix", matrix);

      for (ri = 0; ri < csv.data.length; ri++) {
        for (ci = 1; ci < csv.header.length; ci++) {
          src = nameToIndex[ci - 1][csv.data[ri][ci - 1]];
          dest = nameToIndex[ci][csv.data[ri][ci]];

          //dex.console.log(csv.data[ri][ci-1] + "<->" + csv.data[ri][ci], src + "<->" + dest);
          matrix[src][dest] = 1;
          matrix[dest][src] = 1;
        }
      }

      connectionMatrix = {"header": header, "connections": matrix};
      //dex.console.log("Connection Matrix", connectionMatrix);
      return connectionMatrix;
    },

    /**
     *
     * @param csv
     * @param keyIndex
     * @returns {{}}
     */
    'createMap': function (csv, keyIndex) {
      var ri, ci, rowMap, map =
        {};

      for (ri = 0; ri < csv.data.length; ri += 1) {
        if (csv.data[ri].length === csv.header.length) {
          rowMap =
            {};

          for (ci = 0; ci < csv.header.length; ci += 1) {
            rowMap[csv.header[ci]] = csv.data[ri][ci];
          }
          map[csv.data[ri][keyIndex]] = rowMap;
        }
      }
      return map;
    },

    'json2Csv': function (json) {
      var csv = {'header': [], 'data': []};
      if (_.isUndefined(json) || json.length <= 0) {
        return csv;
      }
      csv.header = _.keys(json[0]);
      json.forEach(function (jsonRow) {
        var row = [];
        csv.header.forEach(function (columnName) {
          row.push(jsonRow[columnName]);
        });
        csv.data.push(row);
      });

      return csv;
    },

    /**
     *
     * @param csv
     * @param rowIndex
     * @param columnIndex
     * @returns {*}
     */
    'toJson': function (csv, rowIndex, columnIndex) {
      var jsonData = [];
      var ri, ci, jsonRow;

      if (arguments.length >= 3) {
        jsonRow = {};
        jsonRow[csv.header[columnIndex]] = csv.data[rowIndex][columnIndex];
        return jsonRow;
      }
      else if (arguments.length === 2) {
        var jsonRow =
          {};
        for (ci = 0; ci < csv.header.length; ci += 1) {
          jsonRow[csv.header[ci]] = csv.data[rowIndex][ci];
        }
        return jsonRow;
      }
      else if (arguments.length === 1) {
        for (ri = 0; ri < csv.data.length; ri++) {
          var jsonRow =
            {};
          for (ci = 0; ci < csv.header.length; ci++) {
            jsonRow[csv.header[ci]] = csv.data[ri][ci];
            //dex.console.log(csv.header[ci] + "=" + csv.data[ri][ci], jsonRow);
          }
          jsonData.push(jsonRow);
        }
      }
      return jsonData;
    },

    /**
     *
     * @param csv
     * @returns {{}}
     */
    'toColumnArrayJson': function (csv) {
      var json = {};
      var ri, ci, jsonRow;

      if (arguments.length === 1) {
        for (ci = 0; ci < csv.header.length; ci++) {
          json[csv.header[ci]] = [];
        }

        for (ri = 0; ri < csv.data.length; ri++) {
          for (ci = 0; ci < csv.header.length; ci++) {
            json[csv.header[ci]].push(csv.data[ri][ci]);
          }
        }
      }

      return json;
    },

    /**
     *
     * @param csv
     * @returns {{header: *, data: *}}
     *
     */
    'copy': function (csv) {
      var copy = {
        'header': dex.array.copy(csv.header),
        'data': dex.matrix.copy(csv.data)
      };
      return copy;
    },

    /**
     *
     * A utility transform for dealing with some of D3's more finiky formats.
     *
     * csv =
     * {
 * 	 header : {C1,C2,C3},
 *   data   : [
 *     [A,B,C],
 *     [A,B,D]
 *   ]
 * }
     * into:
     * json =
     * {
 * 	"name"     : rootName,
 *  "category" : category,
 *  "children" :
 *  [
 *    "children" :
 *     [
 *       {
 *         "name"     : "A",
 *         "category" : "C1",
 *         "children" :
 *         [
 *           {
 * 	           "name" : "B",
 *             "category" : "C2",
 *             "children" :
 *             [
 *               {
 *                 "name"     : "C",
 *                 "category" : "C3",
 *                 "size"     : 1
 *               }
 *               {
 *                 "name"     : "D",
 *                 "category" : "C3",
 *                 "size"     : 1
 *               }
 *             ]
 *           }
 *         ]
 *       }
 *     ]
 *  ]
 * }
     *
     * @param {Object} csv
     */
    'toHierarchicalJson': function (csv) {
      var connections = dex.csv.connections(csv);
      return getChildren(connections, 0);

      function getChildren(connections, depth) {
        //dex.console.log("connections:", connections, "depth="+depth);
        var kids = [], cname;

        if (typeof connections === 'undefined') {
          return kids;
        }

        for (cname in connections) {
          //dex.console.log("CNAME", cname);
          if (connections.hasOwnProperty(cname)) {
            kids.push(createChild(cname, csv.header[depth],
              getChildren(connections[cname], depth + 1)));
          }
        }

        return kids;
      }

      function createChild(name, category, children) {
        var child =
          {
            "name": name,
            "category": category,
            "children": children
          };
        return child;
      }
    },

    /**
     *
     * Transforms:
     * csv =
     * {
 * 	 header : {C1,C2,C3},
 *   data   : [
 *     [A,B,C],
 *     [A,B,D]
 *   ]
 * }
     * into:
     * connections =
     * { A:{B:{C:{},D:{}}}}
     *
     * @param {Object} csv
     *
     */
    'connections': function (csv) {
      var connections =
        {};
      var ri;

      for (ri = 0; ri < csv.data.length; ri++) {
        dex.object.connect(connections, csv.data[ri]);
      }

      //dex.console.log("connections:", connections);
      return connections;
    },

    /**
     *
     * @param csv
     * @param keyIndex
     * @returns {{}}
     *
     */
    'createRowMap': function (csv, keyIndex) {
      var map =
        {};
      var ri;

      for (ri = 0; ri < csv.data.length; ri++) {
        if (csv.data[ri].length == csv.header.length) {
          map[csv.data[ri][keyIndex]] = csv.data[ri];
        }
      }
      return map;
    },

    /**
     *
     * @param csv
     * @param columns
     * @returns {{}}
     */
    'columnSlice': function (csv, columns) {
      var slice = {};
      slice.header = dex.array.slice(csv.header, columns);
      slice.data = dex.matrix.slice(csv.data, columns);

      return slice;
    },

    /**
     *
     * @param csv
     * @returns {Array}
     */
    'getNumericColumnNames': function (csv) {
      var possibleNumeric =
        {};
      var i, j, ri, ci;
      var numericColumns = [];

      for (i = 0; i < csv.header.length; i++) {
        possibleNumeric[csv.header[i]] = true;
      }

      // Iterate thru the data, skip the header.
      for (ri = 0; ri < csv.data.length; ri++) {
        for (ci = 0; ci < csv.data[ri].length && ci < csv.header.length; ci++) {
          if (possibleNumeric[csv.header[ci]] && !dex.object.isNumeric(csv.data[ri][ci])) {
            possibleNumeric[csv.header[ci]] = false;
          }
        }
      }

      for (ci = 0; ci < csv.header.length; ci++) {
        if (possibleNumeric[csv.header[ci]]) {
          numericColumns.push(csv.header[ci]);
        }
      }

      return numericColumns;
    },

    /**
     *
     * @param csv
     * @returns {Array}
     */
    'guessTypes': function (csv) {
      var i = 0;
      var testResults = [];
      csv.header.forEach(function (hdr) {
        testResults.push({})
      });
      var numCols = csv.header.length;

      csv.data.forEach(function (row) {
        for (i = 0; i < numCols; i++) {

          if (!testResults[i]["notDate"]) {
            var date = new Date(row[i]);
            if (isNaN(date.getTime())) {
              //dex.console.log("not date" + i);
              testResults[i]["notDate"] = true;
            }
          }

          if (!testResults[i]["notNumber"]) {
            if (isNaN(row[i])) {
              testResults[i]["notNumber"] = true;
            }
          }
        }
      });

      var types = [];

      for (i = 0; i < numCols; i++) {
        var results = testResults[i];
        if (!results.notDate && results.notNumber) {
          types.push('date');
        }
        else if (!results.notNumber) {
          types.push('number');
        }
        else {
          types.push('string');
        }
      }

      return types;
    },

    /**
     *
     * @param csv
     * @returns {*}
     */
    'strictTypes': function strictTypes(csv) {
      var types = dex.csv.guessTypes(csv);

      for (var i = 0; i < types.length; i++) {
        if (types[i] == 'date') {
          csv.data.forEach(function (row, ri) {
            dex.console.log("row[" + ri + "]=" + row[ri]);
            csv.data[ri][i] = new Date(csv.data[ri][i]);
          })
        }
        else {
          if (types[i] == 'number') {
            csv.data.forEach(function (row, ri) {
              dex.console.log("row[" + ri + "]=" + row[ri]);
              csv.data[ri][i] = new Double(csv.data[ri][i]);
            })
          }
        }
      }

      return csv;
    },

    'uniqueArray': function (csv, columnIndex) {
      return dex.array.unique(dex.matrix.flatten(
        dex.matrix.slice(csv.data, [columnIndex])));
    },

    'selectRows': function (csv, fn) {
      var subset = [];
      csv.data.forEach(function (row) {
        if (fn(row)) {
          subset.push(row);
        }
      });

      return {'header': csv.header, 'data': subset};
    },

    /**
     *
     * This routine will return a frames structure based on a csv and
     * an index.  It will first identify all unique values within the
     * selected column, then sort them into an array of frame indexes.
     * From there, it will return an array of csv where the elements
     * contain the specified frame index at the cooresponding location.
     * This routine supports things such as time/value filtering for
     * things like a time or slicing dimension for various charts.
     * IE: No need to write a motion bubble chart, simply combine a
     * vcr-player with a regular bubble chart connected to play/rewind
     * events and motion will follow.
     *
     * @param csv
     * @param columnIndex
     * @returns {{frameIndices: Array.<T>, frames: Array}}
     */
    'getFramesByIndex': function (csv, columnIndex) {
      var types = dex.csv.guessTypes(csv);
      //dex.console.log("TYPES", types);
      var frameIndices;

      if (types[columnIndex] == "number") {
        frameIndices = _.uniq(csv.data.map(function (row) {
          return row[columnIndex]
        })).sort(function (a, b) {
          return a - b
        });
      }
      else if (types[columnIndex] == "date") {
        frameIndices = _.uniq(csv.data.map(function (row) {
          return row[columnIndex]
        })).sort(function (a, b) {
          a = new Date(a);
          b = new Date(b);
          return a > b ? 1 : a < b ? -1 : 0;
        });
      }
      else {
        frameIndices = _.uniq(csv.data.map(function (row) {
          return row[columnIndex]
        })).sort();
      }
      //dex.console.log("FRAME-INDICES", frameIndices)
      var header = dex.array.copy(csv.header);
      var frameIndexName = header.splice(columnIndex, 1);
      var frames = [];

      for (var fi = 0; fi < frameIndices.length; fi++) {
        var frame = {header: header};
        var frameData = [];

        for (var ri = 0; ri < csv.data.length; ri++) {
          if (csv.data[ri][columnIndex] == frameIndices[fi]) {
            var frameRow = dex.array.copy(csv.data[ri]);
            frameRow.splice(columnIndex, 1);
            frameData.push(frameRow);
          }
        }
        frame["data"] = frameData;
        frames.push(frame);
      }

      return {
        'frameIndices': frameIndices,
        'frames': frames
      }
    },

    /**
     *
     * @param csv
     * @returns {Array}
     */
    'getNumericIndices': function (csv) {
      var possibleNumeric =
        {};
      var i, j;
      var numericIndices = [];

      for (i = 0; i < csv.header.length; i++) {
        possibleNumeric[csv.header[i]] = true;
      }

      // Iterate thru the data, skip the header.
      for (i = 1; i < csv.data.length; i++) {
        for (j = 0; j < csv.data[i].length && j < csv.header.length; j++) {
          if (possibleNumeric[csv.header[j]] && !dex.object.isNumeric(csv.data[i][j])) {
            console.log("csv.header[" + j + "]=" + csv.header[j] + " is not numeric due to csv.data[" + i + "]["
              + j + "]=" + csv.data[i][j]);
            possibleNumeric[csv.header[j]] = false;
          }
        }
      }

      for (i = 0; i < csv.header.length; i++) {
        if (possibleNumeric[csv.header[i]]) {
          numericIndices.push(i);
        }
      }

      return numericIndices;
    },

    'getCategoricalIndices': function (csv) {
      var possibleNumeric =
        {};
      var i, j;
      var categoricalIndices = [];

      for (i = 0; i < csv.header.length; i++) {
        possibleNumeric[csv.header[i]] = true;
      }

      // Iterate thru the data, skip the header.
      for (i = 1; i < csv.data.length; i++) {
        for (j = 0; j < csv.data[i].length && j < csv.header.length; j++) {
          if (possibleNumeric[csv.header[j]] && !dex.object.isNumeric(csv.data[i][j])) {
            console.log("csv.header[" + j + "]=" + csv.header[j] + " is not numeric due to csv.data[" + i + "]["
              + j + "]=" + csv.data[i][j]);
            possibleNumeric[csv.header[j]] = false;
          }
        }
      }

      for (i = 0; i < csv.header.length; i++) {
        if (!possibleNumeric[csv.header[i]]) {
          categoricalIndices.push(i);
        }
      }

      return categoricalIndices;
    },

    /**
     *
     * @param csv
     * @param columnNum
     * @returns {boolean}
     */
    'isColumnNumeric': function (csv, columnNum) {
      var i;

      for (i = 0; i < csv.data.length; i++) {
        if (!dex.object.isNumeric(csv.data[i][columnNum])) {
          return false;
        }
      }
      return true;
    },

    /**
     *
     * @param csv
     * @param columns
     * @returns {*}
     */
    'group': function (csv, columns) {
      var ri, ci;
      var groups = {};
      var returnGroups = [];
      var values;
      var key;
      var otherColumns;
      var otherHeaders;
      var groupName;

      if (arguments < 2) {
        return csv;
      }

      function compare(a, b) {
        var si, h;

        for (si = 0; si < columns.length; si++) {
          h = csv.header[columns[si]]
          if (a[h] < b[h]) {
            return -1;
          }
          else if (a[h] > b[h]) {
            return 1
          }
        }

        return 0;
      }

      //otherColumns = dex.array.difference(dex.range(0, csv.header.length), columns);
      //otherHeaders = dex.array.slice(csv.header, otherColumns);

      for (ri = 0; ri < csv.data.length; ri += 1) {
        values = dex.array.slice(csv.data[ri], columns);
        key = values.join(':::');

        if (groups[key]) {
          group = groups[key];
        }
        else {
          //group = { 'csv' : dex.csv.csv(otherHeaders, []) };
          group =
            {
              'key': key,
              'values': [],
              'csv': dex.csv.csv(csv.header, [])
            };
          for (ci = 0; ci < values.length; ci++) {
            group.values.push({'name': csv.header[columns[ci]], 'value': values[ci]});
          }
          groups[key] = group;
        }
        //group.csv.data.push(dex.array.slice(csv.data[ri], otherColumns));
        group.csv.data.push(csv.data[ri]);
        //groups[key] = group;
      }

      for (groupName in groups) {
        if (groups.hasOwnProperty(groupName)) {
          returnGroups.push(groups[groupName]);
        }
      }

      return returnGroups.sort(compare);
    },

    /**
     *
     * @param csv
     * @param func
     */
    'visitCells': function (csv, func) {
      var ci, ri;

      for (ri = 0; ri < csv.data.length; ri++) {
        for (ci = 0; ci < csv.header.length; ci++) {
          func(ci, ri, csv.data[ri][ci]);
        }
      }
    },

    /**
     *
     * @param csv
     * @returns {number}
     */
    'longestWord': function (csv) {
      var longest = 0;
      for (var row = 0; row < csv.data.length; row++) {
        for (var col = 0; col < csv.data[row].length; col++) {
          if (longest < csv.data[row][col].length) {
            longest = csv.data[row][col].length;
          }
        }
      }
      return longest;
    },

    /**
     *
     * @param csv
     * @returns {{}|*}
     */
    'numericSubset': function (csv) {
      return dex.csv.columnSlice(csv, dex.csv.getNumericIndices(csv));
    },

    'categoricalSubset': function (csv) {
      return dex.csv.columnSlice(csv, dex.csv.getCategoricalIndices(csv));
    },

    /*
     var data =

     */
    'toJsonHierarchy': function (csv, ci) {
      // If 1 argument, then setup and call with 2.
      if (arguments.length == 1) {
        var result = {'name': 'root', children: dex.csv.toJsonHierarchy(csv, 0)};
        //dex.console.log("RESULT", result);
        return result;
      }
      else if (arguments.length == 2) {
        var valueMap = {};

        for (var ri = 0; ri < csv.data.length; ri++) {
          if (valueMap.hasOwnProperty(csv.data[ri][ci])) {
            valueMap[csv.data[ri][ci]]++;
          }
          else {
            valueMap[csv.data[ri][ci]] = 1;
          }
        }

        if (ci >= csv.header.length - 1) {
          return _.keys(valueMap).map(function (key) {
            return {'name': key, 'size': valueMap[key]};
          });
        }
        else {
          return _.keys(valueMap).map(function (key) {
            return {'name': key, 'size': valueMap[key]};
          });
        }
      }
    },

    'getGraph': function (csv) {

      var nodes = [];
      var links = [];
      var nodeNum = 0;
      var indexMap = [];

      // Record uniques across the data, treating each column as it's own namespace.
      csv.header.map(function (col, ci) {
        indexMap.push({});
        csv.data.map(function (row, ri) {
          if (_.isUndefined(indexMap[ci][row[ci]])) {
            indexMap[ci][row[ci]] = nodeNum;
            nodes.push({'name': row[ci]});
            nodeNum++;
          }
        });
      });

      for (var ci = 1; ci < csv.header.length; ci++) {
        csv.data.map(function (row, ri) {
          links.push({'source': indexMap[ci - 1][row[ci - 1]], 'target': indexMap[ci][row[ci]], 'value': 1});
        });
      }

      //dex.console.log("NODES", nodes, links, indexMap);
      return {'nodes': nodes, 'links': links};
    },

    'toNestedJson': function (csv, manualWeight) {
      manualWeight = manualWeight || false;
      //dex.console.log("CMAP", dex.csv.getConnectionMap(csv), manualWeight);
      var result = {
        'name': csv.header[0],
        'children': dex.csv.toNestedJsonChildren(
          dex.csv.getConnectionMap(csv), manualWeight)
      };
      //dex.console.log("toNestedJson.result()", result);
      return result;
    },

    'toNestedJsonChildren': function (cmap, manualWeight) {
      manualWeight = manualWeight || false;
      //dex.console.log("CMAP", cmap);
      var children = [];
      _.keys(cmap).map(function (key) {
        var childMap = cmap[key];

        if (_.keys(childMap).length <= 0) {
          //dex.console.log("Child Map 0", childMap, cmap);
          children.push({'name': key, 'size': 1});
        }
        else if (manualWeight) {

          var props = Object.getOwnPropertyNames(childMap);
          //dex.console.log("KEY", key, "childMap", childMap, "cm.props", props);

          if (props.length == 1) {
            var props2 = Object.getOwnPropertyNames(childMap[props[0]]);
            //dex.console.log("GRANDCHILD-PROPS", props2);
            if (props2.length == 0) {
              children.push({'name': key, size: +props[0]});
            }
            else {
              children.push({
                'name': key,
                'children': dex.csv.toNestedJsonChildren(cmap[key], manualWeight)
              });
            }
          }
          else {
            children.push({
              'name': key,
              'children': dex.csv.toNestedJsonChildren(cmap[key], manualWeight)
            });
          }
        }
        else {
          children.push({
            'name': key,
            'children': dex.csv.toNestedJsonChildren(cmap[key], manualWeight)
          });
        }
      });

//dex.console.log("CHILDREN", children);
      return children;
    },

    'getConnectionMap': function (csv) {
      var rootMap = {};
      var curMap = {}

      for (var row = 0; row < csv.data.length; row++) {
        curMap = rootMap;

        for (var col = 0; col < csv.header.length; col++) {
          if (!_.has(curMap, csv.data[row][col])) {
            curMap[csv.data[row][col]] = {};
          }
          curMap = curMap[csv.data[row][col]];
        }
      }

      return rootMap;
    }
  }
    ;
}
;
},{}],53:[function(require,module,exports){
/**
 *
 * This module provides support for creating various datasets.
 *
 * @module dex/datagen
 * @name datagen
 * @memberOf dex
 *
 */

module.exports = function datagen(dex) {

  return {
    /**
     * Creates a matrix of random integers within the specified range.
     *
     * @param spec The matrix specification.  Ex: \{rows:10, columns: 4, min: 0, max:100\}
     *
     * @returns {Array} An array containing spec.rows number of rows.  Each row consisting of
     * an array containing spec.columns elements.  Each element is a randomly generated integer
     * within the range [spec.min, spec.max]
     *
     */
    'randomMatrix': function (spec) {
      var ri, ci;

      //{rows:10, columns: 4, min, 0, max:100})
      var matrix = [];
      var range = spec.max - spec.min;
      for (ri = 0; ri < spec.rows; ri++) {
        var row = [];

        for (ci = 0; ci < spec.columns; ci++) {
          row.push(Math.random() * range + spec.min);
        }
        matrix.push(row);
      }
      return matrix;
    },

    'randomIndexedMatrix': function (spec) {
      var ri, ci;

      //{rows:10, columns: 4, min, 0, max:100})
      var matrix = [];
      var range = spec.max - spec.min;
      for (ri = 0; ri < spec.rows; ri++) {
        var row = [];

        row.push(ri + 1);
        for (ci = 0; ci < spec.columns - 1; ci++) {
          row.push(Math.random() * range + spec.min);
        }
        matrix.push(row);
      }
      return matrix;
    },

    'randomIntegerMatrix': function (spec) {
      var ri, ci;

      //{rows:10, columns: 4, min, 0, max:100})
      var matrix = [];
      var range = spec.max - spec.min;
      for (ri = 0; ri < spec.rows; ri++) {
        var row = [];

        for (ci = 0; ci < spec.columns; ci++) {
          row.push(Math.round(Math.random() * range + spec.min));
        }
        matrix.push(row);
      }
      return matrix;
    },

    /**
     * Creates a matrix of random integers within the specified range.
     *
     * @param spec The matrix specification.  Ex: \{rows:10, columns:4 \}
     *
     * @returns {Array} An array containing spec.rows number of rows.  Each row consisting of
     * an array containing spec.columns elements.  Each element is a randomly generated integer
     * within the range [spec.min, spec.max]
     *
     */
    'identityCsv': function (spec) {
      var ri, ci;
      var csv = {};
      csv.header = dex.datagen.identityHeader(spec);
      csv.data = dex.datagen.identityMatrix(spec);
      return csv;
    },

    /**
     * This method will return an identity function meeting the supplied
     * specification.
     *
     * @param {object} spec - The identityMatrix specification.
     * @param {number} spec.rows - The number of rows to generate.
     * @param {number} spec.columns - The number of columns to generate.
     * @example {@lang javascript}
     * // Returns: [['R1C1', 'R1C2' ], ['R2C1', 'R2C2'], ['R3C1', 'R3C2']]
     * identityMatrix({rows: 3, columns: 2});
     * @returns {matrix}
     *
     */
    'identityMatrix': function (spec) {
      var ri, ci;

      // { rows:10, columns:4 })
      var matrix = [];
      for (ri = 0; ri < spec.rows; ri++) {
        var row = [];

        for (ci = 0; ci < spec.columns; ci++) {
          row.push("R" + (ri + 1) + "C" + (ci + 1));
        }
        matrix.push(row);
      }
      return matrix;
    },

    /**
     * Returns an identity header array.
     *
     * @param spec - The specification for the header array.
     * @param spec.columns - The number of columns to generate.
     * @example
     * // Returns: [ 'C1', 'C2', 'C3' ]
     * identityHeader({ columns: 3 });
     * @returns {Array} Returns an array of the specified columns.
     *
     */
    'PPPidentityHeader': function (spec) {
      return dex.range(1, spec.columns).map(function (i) {
        return "C" + i;
      });
    },
    'usStateInfo': function (format) {
      var stateData = [
        {
          "name": "Alabama",
          "abbreviation": "AL"
        },
        {
          "name": "Alaska",
          "abbreviation": "AK"
        },
        {
          "name": "American Samoa",
          "abbreviation": "AS"
        },
        {
          "name": "Arizona",
          "abbreviation": "AZ"
        },
        {
          "name": "Arkansas",
          "abbreviation": "AR"
        },
        {
          "name": "California",
          "abbreviation": "CA"
        },
        {
          "name": "Colorado",
          "abbreviation": "CO"
        },
        {
          "name": "Connecticut",
          "abbreviation": "CT"
        },
        {
          "name": "Delaware",
          "abbreviation": "DE"
        },
        {
          "name": "District of Columbia",
          "abbreviation": "DC"
        },
        {
          "name": "Federated States Of Micronesia",
          "abbreviation": "FM"
        },
        {
          "name": "Florida",
          "abbreviation": "FL"
        },
        {
          "name": "Georgia",
          "abbreviation": "GA"
        },
        {
          "name": "Guam",
          "abbreviation": "GU"
        },
        {
          "name": "Hawaii",
          "abbreviation": "HI"
        },
        {
          "name": "Idaho",
          "abbreviation": "ID"
        },
        {
          "name": "Illinois",
          "abbreviation": "IL"
        },
        {
          "name": "Indiana",
          "abbreviation": "IN"
        },
        {
          "name": "Iowa",
          "abbreviation": "IA"
        },
        {
          "name": "Kansas",
          "abbreviation": "KS"
        },
        {
          "name": "Kentucky",
          "abbreviation": "KY"
        },
        {
          "name": "Louisiana",
          "abbreviation": "LA"
        },
        {
          "name": "Maine",
          "abbreviation": "ME"
        },
        {
          "name": "Marshall Islands",
          "abbreviation": "MH"
        },
        {
          "name": "Maryland",
          "abbreviation": "MD"
        },
        {
          "name": "Massachusetts",
          "abbreviation": "MA"
        },
        {
          "name": "Michigan",
          "abbreviation": "MI"
        },
        {
          "name": "Minnesota",
          "abbreviation": "MN"
        },
        {
          "name": "Mississippi",
          "abbreviation": "MS"
        },
        {
          "name": "Missouri",
          "abbreviation": "MO"
        },
        {
          "name": "Montana",
          "abbreviation": "MT"
        },
        {
          "name": "Nebraska",
          "abbreviation": "NE"
        },
        {
          "name": "Nevada",
          "abbreviation": "NV"
        },
        {
          "name": "New Hampshire",
          "abbreviation": "NH"
        },
        {
          "name": "New Jersey",
          "abbreviation": "NJ"
        },
        {
          "name": "New Mexico",
          "abbreviation": "NM"
        },
        {
          "name": "New York",
          "abbreviation": "NY"
        },
        {
          "name": "North Carolina",
          "abbreviation": "NC"
        },
        {
          "name": "North Dakota",
          "abbreviation": "ND"
        },
        {
          "name": "Northern Mariana Islands",
          "abbreviation": "MP"
        },
        {
          "name": "Ohio",
          "abbreviation": "OH"
        },
        {
          "name": "Oklahoma",
          "abbreviation": "OK"
        },
        {
          "name": "Oregon",
          "abbreviation": "OR"
        },
        {
          "name": "Palau",
          "abbreviation": "PW"
        },
        {
          "name": "Pennsylvania",
          "abbreviation": "PA"
        },
        {
          "name": "Puerto Rico",
          "abbreviation": "PR"
        },
        {
          "name": "Rhode Island",
          "abbreviation": "RI"
        },
        {
          "name": "South Carolina",
          "abbreviation": "SC"
        },
        {
          "name": "South Dakota",
          "abbreviation": "SD"
        },
        {
          "name": "Tennessee",
          "abbreviation": "TN"
        },
        {
          "name": "Texas",
          "abbreviation": "TX"
        },
        {
          "name": "Utah",
          "abbreviation": "UT"
        },
        {
          "name": "Vermont",
          "abbreviation": "VT"
        },
        {
          "name": "Virgin Islands",
          "abbreviation": "VI"
        },
        {
          "name": "Virginia",
          "abbreviation": "VA"
        },
        {
          "name": "Washington",
          "abbreviation": "WA"
        },
        {
          "name": "West Virginia",
          "abbreviation": "WV"
        },
        {
          "name": "Wisconsin",
          "abbreviation": "WI"
        },
        {
          "name": "Wyoming",
          "abbreviation": "WY"
        }
      ];

      if (format == 'name2abbrev') {
        var nameIndex = {};

        stateData.forEach(function(row) {
          nameIndex[row.name] = row.abbreviation;
        });

        return nameIndex;
      }
      else if (format == 'abbrev2name') {
        var abbrevIndex = {};

        stateData.forEach(function(row) {
          abbrevIndex[row.abbreviation] = row.name;
        });

        return abbrevIndex;
      }

      return stateData;
    }
  };
};

},{}],54:[function(require,module,exports){
// Allow user to override, but define this by default:

/**
 *
 * The main dexjs module.
 *
 * @module dex
 * @name dex
 *
 * @requires d3
 * @requires jquery
 * @requires jqueryui
 * @requires underscore
 *
 */
var dex = {};

/**
 *
 * The version of dexjs.
 *
 * @name version
 * @type {string}
 *
 */
dex.version = "0.8.0.8";

/**
 * This routine will return an array [ start, ..., start + len ] using an increment of 1.
 *
 * @param {number} start - The starting index.
 * @param {number} len - The number of integers to generate.
 * @example {@lang javascript}
 * // returns [ 0, 1, 2 ]
 * range(0, 3)
 *
 * @returns {Array} An array consisting of elements [ start, ..., start + len ].
 *
 */
dex.range = function (start, len) {
  return _.range(start, start + len);
};

/**
 *
 * This routine is simply a convenience function as it
 * simply wraps underscore's implementation of a shallow
 * copy.  This method will create a shallow-copied clone
 * of the provided plain object. Any nested objects or
 * arrays will be copied by reference, not duplicated.
 *
 * @param obj
 * @returns {*}
 */
dex.copy = function(obj) {
  return _.copy(obj);
};

/**
 *
 * The pub/sub bus used by dex in order to publish and subscribe to events.
 *
 * @name bus
 * @type {PubSub}
 * @see https://github.com/federico-lox/pubsub.js
 *
 */
dex.bus = require("../lib/pubsub");

// Kai's parallel coordinates needs this, but seems to break
// in D4
//require('../lib/d3.svg.multibrush');
//require('../lib/d3.selection');
//dex.pc = require('../lib/d3.parcoords');

dex.util = require('./util/util')(dex);

/**
 *
 * A module for dealing with arrays.
 *
 * @name array
 * @type {module:dex.array}
 *
 */
dex.array = require('./array/array')(dex);

/**
 * A module for dealing with colors.
 *
 * @name color
 * @type {module:dex.color}
 *
 */
dex.color = require("./color/color")(dex);

/**
 *
 * A module for configuring things.
 *
 * @name config
 * @type {module:dex.config}
 *
 */
dex.config = require("./config/config")(dex);

/**
 *
 * A module for logging to the console.
 *
 * @name console
 * @type {module:dex.console}
 *
 */
dex.console = require("./console/console")(dex);

/**
 *
 * A module for handling CSV data structures.
 *
 * @name csv
 * @type {module:dex.csv}
 *
 */
dex.csv = require("./csv/csv")(dex);

/**
 *
 * A module providing utilities for data generation.
 *
 * @name datagen
 * @type {module:dex.datagen}
 *
 */
dex.datagen = require("./datagen/datagen")(dex);

/**
 *
 * A module for dealing with JSON data.
 *
 * @name json
 * @type {module:dex.json}
 *
 */
dex.json = require("./json/json")(dex);

/**
 * A module for dealing with matrices.
 *
 * @name matrix
 * @type {module:dex.matrix}
 *
 */
dex.matrix = require("./matrix/matrix")(dex);

/**
 * @name object
 * @type {module:object}
 *
 */
dex.object = require("./object/object")(dex);

/**
 *
 * A module for creating ui components such as players and sliders.
 *
 * @name ui
 * @type {module:ui}
 *
 */
dex.ui = require("./ui/ui")(dex);

/**
 *
 * A module for dealing dex components.
 *
 * @name component
 * @type {module:component}
 *
 */
dex.component = require("./component/component")(dex);

/**
 *
 * An overall charting module composed of many sub-modules.
 *
 * @name charts
 * @type {module:charts}
 *
 */
dex.charts = require("./charts/charts")(dex);

d3 = dex.charts.d3.d3v3;

// Allow jqueryui to play well with bootstrap.  This
// also means we must include dex.js before bootstrap.
$.widget.bridge('uitooltip', $.ui.tooltip);
$.widget.bridge('uibutton', $.ui.button);

module.exports = dex;
},{"../lib/pubsub":3,"./array/array":4,"./charts/charts":11,"./color/color":48,"./component/component":49,"./config/config":50,"./console/console":51,"./csv/csv":52,"./datagen/datagen":53,"./json/json":55,"./matrix/matrix":56,"./object/object":57,"./ui/ui":67,"./util/util":68}],55:[function(require,module,exports){
/**
 *
 * This module provides routines dealing with json data.
 *
 * @module dex/json
 * @name json
 * @memberOf dex
 *
 */

module.exports = function json(dex) {

  return {
    /**
     * Converts JSON and a header to a CSV file.  It is used for parallel coordinate brush
     * events where the selected brush must be published to events as a csv.
     *
     * For example, given:
     *
     * json   = [ { A: 1, B: 3, C: 5, D: 7 },
     *            { A: 2, B: 4, C: 6, D: 8 } ];
     * header = [ 'A', 'B', 'C', 'D' ];
     *
     * This will return a csv where:
     *
     * csv = { header: [ 'A', 'B', 'C', 'D' ],
 *         data    [[ 1, 4, 5, 7 ], [ 2, 4, 6, 8 ]];
 *
     * @param json
     * @param header
     * @returns {*}
     */
    'toCsv': function (json, header) {
      var csv;
      var ri, ci;
      var data = [];

      // Keys are provided.
      if (arguments.length == 2) {
        if (Array.isArray(json)) {
          for (ri = 0; ri < json.length; ri++) {
            var row = [];
            for (ci = 0; ci < header.length; ci++) {
              row.push(json[ri][header[ci]]);
            }
            data.push(row);
          }
        }
        else {
          var row = [];
          for (ci = 0; ci < header.length; ci++) {
            row.push(json[ri][header[ci]]);
          }
          data.push(row);
        }
        return dex.csv.csv(header, data);
      }
      else {
        return dex.json.toCsv(json, dex.json.keys(json));
      }
    },

    /**
     * Returns all keys found in a json structure or array of json structures.
     *
     * @param json  The json structure or array of json structures.
     * @returns {Array} A list of keys found within json.
     *
     */
    'keys': function (json) {
      var keyMap = {};
      var keys = [];
      var ri, key;

      if (Array.isArray(json)) {
        for (ri = 0; ri < json.length; ri++) {
          for (key in json[ri]) {
            keyMap[key] = true;
          }
        }
      }
      else {
        for (key in json) {
          keyMap[key] = true;
        }
      }

      for (key in keyMap) {
        keys.push(key);
      }

      return keys;
    }
  };
};

},{}],56:[function(require,module,exports){
/**
 *
 * This module provides routines dealing with matrices.
 *
 * @module dex/matrix
 * @name matrix
 * @memberOf dex
 *
 */

module.exports = function matrix(dex) {

  return {
    /**
     *
     * Return the specified slice of the matrix.  The original matrix is
     * not altered.
     *
     * @param {matrix} matrix The matrix to be sliced.
     * @param {Array.<number>} columns - An array of column indices to include within the slice.
     * @param {number} [rows] If supplied, the slice will consist only of the specified
     * number of rows.
     *
     * @returns {matrix}
     */
    'slice': function (matrix, columns, rows) {
      var matrixSlice = new Array(0);
      //dex.console.log("PRE-SLICE (matrixSlize):" + matrixSlice);
      var ri;

      if (arguments.length === 3) {
        for (ri = 0; ri < rows.length; ri++) {
          matrixSlice.push(dex.array.slice(matrix[rows[ri]]));
        }
      }
      else {
        for (ri = 0; ri < matrix.length; ri++) {
          //dex.console.log("MATRIX-SLICE-BEFORE[" + ri + "]:" + matrixSlice);
          matrixSlice.push(dex.array.slice(matrix[ri], columns));
          //dex.console.log("MATRIX-SLICE-AFTER[" + ri + "]" + matrixSlice);
        }
      }
      return matrixSlice;
    },

    /**
     *
     * Returns a matrix consisting of unique values relative to each
     * column.
     *
     * @param {matrix} matrix The matrix to evaluate.
     *
     * @returns {Array.<Array.<Object>>} The unique values relative to each column. In the form
     * of [[ column 1 unique values], [column 2 unique values], ...]]
     *
     */
    'uniques': function (matrix) {
      var ci;
      var uniques = [];
      var tmatrix = dex.matrix.transpose(matrix);
      var ncol = tmatrix.length;

      for (ci = 0; ci < ncol; ci += 1) {
        uniques.push(_.uniq(tmatrix[ci]));
      }
      return uniques;
    },

    /**
     *
     * Returns a transposed matrix where the rows of the new matrix are transposed
     * with it's columns.
     *
     * @param {matrix} matrix - The matrix to transpose.
     *
     * @returns {matrix} The transposed matrix, leaving the original matrix untouched.
     *
     * @example {@lang javascript}
     * // Returns [['R1C1', 'R2C1', 'R3C1'], ['R1C2', 'R2C2', 'R3C2' ]]
     * transpose([['R1C1', 'R1C2'], ['R2C1', 'R2C2], ['R3C1', 'R3C2']]);
     *
     */
    'transpose': function (matrix) {
      var ci;
      var ncols;
      var transposedMatrix = [];
      //dex.console.log("Transposing:", matrix);

      if (!matrix || matrix.length <= 0 || !matrix[0] || matrix[0].length <= 0) {
        return [];
      }

      ncols = matrix[0].length;

      for (ci = 0; ci < ncols; ci++) {
        transposedMatrix.push(matrix.map(function (row) {
          return row[ci];
        }));
      }

      return transposedMatrix;
    },

    /**
     *
     * Return a flattened version of the matrix.
     *
     * @param {matrix} matrix - The matrix to flatten.
     *
     * @returns {Array.<Object>} A flattened version of the matrix.
     *
     * @example {@lang javascript}
     * // Define a simple matrix.
     * var matrix = [['r1c1', 'r1c2'], ['r2c1', 'r2c2']]
     *
     * // Returns: ['r1c1', 'r1c2', 'r2c1', 'r2c2']
     * flatten(matrix);
     *
     */
    'flatten': function (matrix) {
      return _.flatten(matrix);
    },

    /**
     *
     * Returns an array of the minimum and maximum value in the form of: [min,max]
     * from the specified subset of the matrix.
     *
     * @param {matrix} matrix - The matrix to scan.
     * @param {Array.<number>|number] [indices] - When supplied, will contrain the extent
 * search to just those columns specified by this list of indices.
 *
     * @returns {Array.<number>} An array of two elements: [ min, max ]
     *
     */
    'extent': function (matrix, indices) {
      var values = matrix;
      if (arguments.length === 2) {
        values = dex.matrix.flatten(dex.matrix.slice(matrix, indices));
        var max = Math.max.apply(null, values);
        var min = Math.min.apply(null, values);
        return [min, max];
      }
    },

    /**
     *
     * Combine each column in matrix1 with each column in matrix2.
     *
     * @param {matrix} matrix1 The first matrix to combine.
     * @param {matrix} matrix2 The second matrix to combine.
     *
     * @returns {matrix} The combined matrix.
     *
     * @example {@lang javascript}
     * var matrix1 = [['m1r1c1', 'm1r1c2'], ['m1r2c1', 'm1r2c2']]
     * var matrix2 = [['m2r1c1', 'm2r1c2'], ['m2r2c1', 'm2r2c2']]
     *
     * // Returns: [['m1r1c1', 'm1r1c2', 'm2r1c1', 'm2r1c2'], ['m1r2c1', 'm1r2c2', 'm2r2c1', 'm2r2c2']]
     * var result = combine(matrix1, matrix2);
     *
     */
    'combine': function (matrix1, matrix2) {
      var result = _.clone(matrix1);

      var ri;

      for (ri = 0; ri < matrix2.length; ri++) {
        result[ri] = result[ri].concat(matrix2[ri]);
      }

      return result;
    },

    /**
     *
     * Return a copy of the supplied matrix.
     *
     * @param {matrix} matrix The matrix to copy.
     *
     * @returns {Array} A copy of the original matrix.
     *
     */
    'copy': function (matrix) {
      return matrix.map(function (row) {
        return _.clone(row);
      });
    },

    /**
     *
     * Insert a new column at position 0 within this matrix which will contain
     * integer values starting at 1, 2, 3, ...  This is useful if your dataset
     * lacks an existing unique index.
     *
     * @param {matrix} matrix - The matrix to index.
     * @returns {matrix} A copy of the original matrix with the index inserted.
     *
     */
    'addIndex': function (matrix) {
      var indexMatrix = dex.matrix.copy(matrix);

      for (var ri = 0; ri < matrix.length; ri++) {
        indexMatrix[ri].unshift(ri + 1);
      }

      return indexMatrix;
    },

    /**
     *
     * Determine whether the supplied columnNum within the supplied matrix is
     * numeric or not.
     *
     * @param {matrix} matrix - The matrix to evaluate.
     * @param {number} columnNum - The column within the matrix to evaluate.
     *
     * @returns {boolean} True if the column is numeric, false otherwise.
     *
     */
    'isColumnNumeric': function (matrix, columnNum) {
      for (var i = 0; i < matrix.length; i++) {
        if (!_.isNumber(matrix[i][columnNum])) {
          return false;
        }
      }
      return true;
    },

    /**
     *
     * Return the maximum value of the specified columnNum within the
     * supplied matrix.
     *
     * @param matrix The matrix to evaluate.
     * @param columnNum The column number within the matrix to evaluate.
     * @returns {*} The maximum value of the specified column within the
     * supplied matrix.
     *
     */
    'max': function (matrix, columnNum) {
      var maxValue = matrix[0][columnNum];
      var i;

      if (dex.matrix.isColumnNumeric(matrix, columnNum)) {
        maxValue = parseFloat(matrix[0][columnNum]);
        for (i = 1; i < matrix.length; i++) {
          if (maxValue < parseFloat(matrix[i][columnNum])) {
            maxValue = parseFloat(matrix[i][columnNum]);
          }
        }
      }
      else {
        for (i = 1; i < matrix.length; i++) {
          if (maxValue < matrix[i][columnNum]) {
            maxValue = matrix[i][columnNum];
          }
        }
      }

      return maxValue;
    },

    /**
     *
     * Return the minimum value of the specified columnNum within the
     * supplied matrix.
     *
     * @param {matrix} matrix - The matrix to evaluate.
     * @param {number} columnNum - The column number within the matrix to evaluate.
     * @returns {number} The minimum value of the specified column within the
     * supplied matrix.
     *
     */
    'min': function (matrix, columnNum) {
      var minValue = matrix[0][columnNum];
      var i;

      if (dex.matrix.isColumnNumeric(matrix, columnNum)) {
        minValue = parseFloat(matrix[0][columnNum]);
        for (i = 1; i < matrix.length; i++) {
          if (minValue > parseFloat(matrix[i][columnNum])) {
            minValue = parseFloat(matrix[i][columnNum]);
          }
        }
      }
      else {
        for (i = 1; i < matrix.length; i++) {
          if (minValue > matrix[i][columnNum]) {
            minValue = matrix[i][columnNum];
          }
        }
      }

      return minValue;
    }
  };
};

},{}],57:[function(require,module,exports){
/**
 *
 * This module provides routines dealing with javascript objects.
 *
 * @module dex:object
 * @name object
 * @memberOf dex
 *
 */

module.exports = function object(dex) {

  return {
    /**
     *
     * Return the local keys of this object without the inherited ones.
     *
     * @param obj The object whose local keys we are interested in.
     *
     * @returns {Array} An array of 0 or more local keys.
     */
    'keys': function keys(obj) {
      var keys = [];

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key);
        }
      }

      return keys;
    },

    /**
     *
     * A pretty good, but imperfect mechanism for performing a deep
     * clone of an object.
     *
     * @param obj The object to clone.
     * @returns {*} The cloned object.
     *
     */
    'clone': function clone(obj) {
      var i, attr, len;

      // Handle the 3 simple types, and null or undefined
      if (null == obj || "object" != typeof obj)
        return obj;

      // Handle Date
      if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
      }

      // Handle Array
      if (obj instanceof Array) {
        var copy = [];
        for (i = 0, len = obj.length; i < len; i++) {
          copy[i] = dex.object.clone(obj[i]);
        }
        return copy;
      }

      // DOM Nodes are nothing but trouble.
      if (dex.object.isElement(obj) ||
        dex.object.isNode(obj)) {
        return obj;
      }

      // Handle Object
      if (obj instanceof Object) {
        var copy = {};
        //jQuery.extend(copy, obj);
        for (attr in obj) {
          if (obj.hasOwnProperty(attr)) {
            copy[attr] = dex.object.clone(obj[attr]);
            //copy[attr] = obj[attr];
          }
        }
        return copy;
      }

      throw new Error("Unable to copy obj! Its type isn't supported.");
    },

    /*
     This version causes expand to continue forever.

     'isEmpty' : function isEmpty(obj) {
     return _.isEmpty(obj);
     };
     */

    /**
     *
     * Kind of misleading.  This really signals when expand should quit
     * expanding.  I need to clean this up.
     *
     * @param obj
     * @returns {boolean}
     */
    'isEmpty': function isEmpty(obj) {
      //dex.console.log("isEmpty(" + obj + ") typeof=" + (typeof obj));
      if (!obj || obj instanceof Array) {
        return true;
      }
      if ("object" == typeof obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            //dex.console.log("OBJ: ", obj, " contains key '" + key + "'");
            return false;
          }
        }
      }

      return true;
    },

    /**
     *
     * Overlay the top object on top of the bottom.  This method will first clone
     * the bottom object.  Then it will drop the values within the top object
     * into the clone.
     *
     * @param {Object} top - The object who's properties will be on top.
     * @param {Object} bottom - The object who's properties will be on bottom.
     * @return {Object} The overlaid object where the properties in top override
     *                  properties in bottom.  The return object is a clone or
     *                  copy.
     *
     */
    'overlay': function overlay(top, bottom) {
      // Make a clone of the bottom object.
      var overlay = dex.object.clone(bottom);
      var prop;

      // If we have parameters in the top object, overlay them on top
      // of the bottom object.
      if (top !== 'undefined') {
        // Iterate over the props in top.
        for (prop in top) {
          // Arrays are special cases. [A] on top of [A,B] should give [A], not [A,B]
          if (typeof top[prop] == 'object' && overlay[prop] != null && !(top[prop] instanceof Array)) {
            //console.log("PROP: " + prop + ", top=" + top + ", overlay=" + overlay);
            overlay[prop] = dex.object.overlay(top[prop], overlay[prop]);
          }
          // Simply overwrite for simple cases and arrays.
          else {
            overlay[prop] = top[prop];
          }
        }
      }

      //console.dir(config);
      return overlay;
    },

    /**
     *
     * This method returns whether or not the supplied object is a Node.
     *
     * @param {Object} obj - The object to test.
     *
     * @returns {boolean} True if obj is a Node, false otherwise.
     *
     */
    'isNode': function isNode(obj) {
      return (
        typeof Node === "object" ? obj instanceof Node :
        obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName === "string"
      );
    },

    /**
     *
     * This method returns whether or not the supplied object is a
     * DOM node.
     *
     * @param {Object} obj - The object to test.
     *
     * @returns {boolean} - True if obj is a DOM node, false otherwise.
     *
     */
    'isElement': function isElement(obj) {
      return (
        typeof HTMLElement === "object" ? obj instanceof HTMLElement : //DOM2
        obj && typeof obj === "object" && obj.nodeType === 1 && typeof obj.nodeName === "string"
      );
    },

    /**
     *
     * This method returns a boolean representing whether obj is contained
     * within container.
     *
     * @param {Object} container - The container to test.
     * @param {Object} obj - The object to test.
     *
     * @return True if container contains obj.  False otherwise.
     */
    'contains': function contains(container, obj) {
      var i = container.length;
      while (i--) {
        if (container[i] === obj) {
          return true;
        }
      }
      return false;
    },

    /**
     *
     * Return whether or not the supplied object is a function.
     *
     * @param obj The object to check.
     * @returns {boolean} True if obj is a function, false otherwise.
     *
     */
    'isFunction': function isFunction(obj) {
      //return typeof obj === 'function';
      return (typeof obj === "function");
    },

    /**
     *
     * Visit each local property within.
     *
     * @param obj
     * @param func
     */
    /*
     'visit' : function (obj, func) {
     var prop;
     func(obj);
     for (prop in obj) {
     if (obj.hasOwnProperty(prop)) {
     if (typeof obj[prop] === 'object') {
     dex.object.visit(obj[prop], func);
     }
     }
     }
     }
     */

    /**
     *
     * @param map
     * @param values
     * @returns {exports}
     */
    'connect': function connect(map, values) {
      //dex.console.log("map:", map, "values:", values);

      if (!values || values.length <= 0) {
        return this;
      }
      if (!map[values[0]]) {
        map[values[0]] = {};
      }
      dex.object.connect(map[values[0]], values.slice(1));

      return this;
    },

    /**
     *
     * @param obj
     * @returns {boolean}
     */
    'isNumeric': function (obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj);
    },

    /**
     *
     * @param hierarchy
     * @param name
     * @param value
     * @param delimiter
     * @returns {*}
     */
    'setHierarchical': function (hierarchy, name, value, delimiter) {
      if (hierarchy == null) {
        hierarchy = {};
      }

      if (typeof hierarchy != 'object') {
        return hierarchy;
      }

      // Create an array of names by splitting delimiter, then call
      // this function in the 3 argument (Array of paths) context.
      if (arguments.length == 4) {
        return dex.object.setHierarchical(hierarchy,
          name.split(delimiter), value);
      }

      // Array of paths context.
      else {
        // This is the last variable name, just set the value.
        if (name.length === 1) {
          hierarchy[name[0]] = value;
        }
        // We still have to traverse.
        else {
          // Undefined container object, just create an empty.
          if (!(name[0] in hierarchy)) {
            hierarchy[name[0]] = {};
          }

          // Recursively traverse down the hierarchy.
          dex.object.setHierarchical(hierarchy[name[0]], name.splice(1), value);
        }
      }

      return hierarchy;
    }
  };
};


},{}],58:[function(require,module,exports){
/**
 *
 * This class creates and attaches a SqlQuery user interface onto the
 * parent node.
 *
 * @name dex.ui.SqlQuery
 * @param userConfig The following configuration options are available for configuring the
 * behavior of the SqlQuery component.<br><br>
 *
 * 'parent' : The default
 *
 * @returns {SqlQuery}
 *
 * @constructor
 *
 */
var sqlquery = function (userConfig) {

  var defaults =
  {
    'parent' : '#SqlQuery', // The parent container of this chart.
    // Set these when you need to CSS style components independently.
    'id'     : 'SqlQuery',
    'class'  : 'SqlQuery',
    'query'  : 'select * from dex;',
    // Our data...
    'csv'    : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    }
  };

  var chart = new dex.component(userConfig, defaults);
  var config = config;

  var sql = window.SQL;
  var db = new sql.Database();

  chart.render = function () {
    // Create the table only at render time.
    var createStr = "create table dex(" + csv.header.map(function (h, i) {
        var colName = h.trim();
        return "'" + colName + "' " + ((dex.csv.isColumnNumeric(csv, i)) ? "float" : "text");
      }).join(",") + ")";
    console.log("CREATESTR: " + createStr);
    db.exec("drop table if exists dex;");
    db.exec(createStr);

    var populateSql = "BEGIN;" + csv.data.map(function (row) {
        var insertStr =
          "insert into dex values(" + row.map(function (col) {
            return "'" + col.replace("'", "") + "'";
          }).join(",") + ");";
        //console.log(insertStr);
        //db.exec(insertStr);
        return insertStr;
      }).join("") + "COMMIT;";
    console.log(populateSql);
    db.exec(populateSql);
    chart.update();
  };

  chart.query = function (query) {
    var csv = [];
    var myQuery = chart.attr("query");
    if (query && query.length > 0) {
      myQuery = query;
    }
    console.log("QUERY: " + myQuery);

    csv.header = [];
    csv.data = [];

    var rs = db.exec(myQuery);

    console.log("RS:");
    console.dir(rs);
    csv.header = rs[0].columns.map(function (s) {
      return s.trim();
    });
    csv.data = rs[0].values;

    console.log(csv);
    return csv;
  }

  chart.update = function () {
  };

  return chart;
};

module.exports = sqlquery;
},{}],59:[function(require,module,exports){
/**
 *
 * @constructor
 * @classdesc This class constructs an html table from the supplied CSV data.
 * @memberOf dex/ui
 * @implements {dex/component}
 *
 * @example {@lang javascript}
 * var myTable = new dex.ui.Table({
 *   'parent' : "#MyTableContainer",
 *   'id'     : "MyTableId"
 *   'csv'    : { header : [ "X", "Y", "Z" ],
 *                data   : [[ 1, 2, 3 ], [4, 5, 6], [7, 8, 9]]}
 * });
 * @param {object} userConfig - A user supplied configuration object which will override the defaults.
 * @param {string} [userConfig.parent=#Table] - The parent node to which this component will be attached.
 * Ex: #MyParent will attach to a node with an id = "MyParent".
 * @param {string} [userConfig.id=Table] - The id of this component.
 * @param {string} [userConfig.class=Table] - The class of this component.
 * @param {csv} userConfig.csv - The user's CSV data.
 *
 */
var table = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent' : '#TableParent',
    // Set these when you need to CSS style components independently.
    'id'     : 'TableId',
    'class'  : 'TableClass',
    // Our data...
    'csv'    : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    }
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    chart.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var csv = config.csv;

    d3.selectAll(config.parent).selectAll("*").remove();

    var table = d3.select(config.parent)
      .append("table")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("border", 1)
      .attr("class", config["class"])
      .attr("id", config["id"]);

    var thead = table.append("thead");
    var tbody = table.append("tbody");

    thead.append("tr")
      .selectAll("th")
      .data(csv.header)
      .enter()
      .append("th")
      .text(function (column) {
        return column;
      });

    var rows = tbody.selectAll("tr")
      .data(csv.data)
      .enter()
      .append("tr");

    var cells = rows.selectAll("td")
      .data(function (row) {
        return csv.header.map(function (column, i) {
          return {column : i, value : row[i]};
        });
      })
      .enter()
      .append("td")
      .html(function (d) {
        return d.value;
      });
  };

  return chart;
};

module.exports = table;
},{}],60:[function(require,module,exports){
var typestable = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent' : '#Table',
    // Set these when you need to CSS style components independently.
    'id'     : 'Table',
    'class'  : 'Table',
    // Our data...
    'csv'    : {
      // Give folks without data something to look at anyhow.
      'header' : ["X", "Y", "Z"],
      'data'   : [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ]
    }
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function () {
    chart.update();
  };

  chart.update = function () {
    var chart = this;
    var config = chart.config;
    var types = dex.csv.guessTypes(config.csv);
    var csv = dex.csv.copy(config.csv);

    d3.selectAll("#" + config.id).remove();

    var table = d3.select(config.parent)
      .append("table")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("border", 1)
      .attr("class", config["class"])
      .attr("id", config["id"]);

    var thead = table.append("thead");
    var tbody = table.append("tbody");

    thead.append("tr")
      .selectAll("th")
      .data(csv.header)
      .enter()
      .append("th")
      .text(function (column, i) {
        return column + " (" + types[i] + ")";
      });

    var rows = tbody.selectAll("tr")
      .data(csv.data)
      .enter()
      .append("tr");

    var cells = rows.selectAll("td")
      .data(function (row) {
        return csv.header.map(function (column, i) {
          return {
            column : i,
            value  : row[i]
          };
        });
      })
      .enter()
      .append("td")
      .html(function (d) {
        return d.value;
      });
  };

  return chart;
};

module.exports = typestable;
},{}],61:[function(require,module,exports){
var configurationbox = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent'     : 'body',
    // Set these when you need to CSS style components independently.
    'id'         : 'ConfigurationBox',
    'class'      : 'ui-widget-content',
    'width'      : 600,
    'height'     : 100,
    'xoffset'    : 10,
    'yoffset'    : 10,
    'title'      : "Options",
    'components' : [],
    'resizable' : true,
    'draggable'  : true
  };

  var chart = new dex.component(userConfig, defaults);

  chart.render = function () {
    var chart = this;
    var config = chart.config;
    var i;

    var chartContainer = $(config.parent);

    chart.main =
      jQuery('<div/>',
        {
          'id'    : config['id'],
          'class' : config['class']
        }).appendTo(chartContainer);

    for (i = 0; i < config.components.length; i++) {
      config.components[i].attr('parent', chart.main);
      config.components[i].render();
    }
    chart.main.css('width', config.width);
    chart.main.css('height', config.height);
    //chart.main.css('top', '-400px');
    chart.update();
  };

  chart.update = function () {
    var chart = this,
      config = chart.config,
      ri, ci;

    jQuery('<h3/>',
      {
        'class' : 'ui-widget-header',
        'text'  : config.title
      }).appendTo(chart.main);

    for (ci = 0; ci < config.components.length; ci += 1) {
      config.components[ci].update();
      //dex.console.log("CMP", config.components[ci], "DOM", config.components[ci].dom());
      config.components[ci].dom().appendTo(chart.main);
    }

    config.resizable && $("#" + config.id).resizable();
    config.draggable && $("#" + config.id).draggable();
  };

  chart.dom = function () {
    return chart.main;
  };

  chart.add = function (components) {
    var chart = this,
      config = chart.config,
      i;

    for (i = 0; i < arguments.length; i += 1) {
      config.components.push(arguments[i]);
    }
    return chart;
  };

  return chart;
};

module.exports = configurationbox;
},{}],62:[function(require,module,exports){
var player = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent': null,
    // Set these when you need to CSS style components independently.
    'id': 'Player',
    'class': 'ui-widget-content',
    'width': 600,
    'height': 100,
    'delay': 1000,
    'frameIndex': 0,
    'csv': {
      header : ['C1', 'C2', 'C3' ],
      data : [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5]
      ]
    }
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;
  var frames = dex.csv.getFramesByIndex(config.csv, config.frameIndex);
  var frameNum = 0;
  chart.attr("frames", frames);

  chart.render = function () {
    var timer;
    var state = "stopped";
    frames = dex.csv.getFramesByIndex(config.csv, config.frameIndex);
    dex.console.log(frames);
    chart.attr("frames", frames);

    dex.console.log("FRAMES:", frames);

    $(function () {
      $("#beginning").button({
        text: false,
        icons: {
          primary: "ui-icon-seek-start"
        }
      }).click(function () {
        gotoFrame(0);
      });
      $("#previous").button({
        text: false,
        icons: {
          primary: "ui-icon-seek-prev"
        }
      }).click(function () {
        previous();
      });
      $("#play").button({
          text: false,
          icons: {
            primary: "ui-icon-play"
          }
        })
        .click(function () {
          var options;
          if ($(this).text() === "play") {
            options = {
              label: "pause",
              icons: {
                primary: "ui-icon-pause"
              }
            };
            play();
          } else {
            options = {
              label: "play",
              icons: {
                primary: "ui-icon-play"
              }
            };

            clearTimeout(timer);
          }
          $(this).button("option", options);
        });
      $("#next").button({
        text: false,
        icons: {
          primary: "ui-icon-seek-next"
        }
      }).click(function () {
        next();
      });
      $("#end").button({
        text: false,
        icons: {
          primary: "ui-icon-seek-end"
        }
      }).click(function () {
        gotoFrame(frames.frames.length-1);
      });
    });

    function play() {
      frameNum++;
      gotoFrame((frameNum >= frames.frameIndices.length) ? 0 : frameNum);

      // Set a timer for playing the next frame.
      timer = setTimeout(play, config.delay);
    }

    gotoFrame(0);
  };

  chart.update = function () {
    frames = dex.csv.getFramesByIndex(config.csv, config.frameIndex);
    chart.attr("frames", frames);
    gotoFrame(0);
  };

  function previous() {
    gotoFrame(frameNum > 0 ? (frameNum-1) : 0)
  }

  function next() {
    gotoFrame((frameNum + 1) % frames.frameIndices.length);
  }

  function gotoFrame(frameIndex) {
    frameNum = frameIndex;
    chart.publish({
      "type"  : "new-frame",
      "data"  : frames.frames[frameNum],
      "name"  : frames.frameIndices[frameNum],
      "frameBy" : csv.header[config.frameIndex] }
    );
    dex.console.log("Displaying frame: " + frameNum);
  }

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
};

module.exports = player;
},{}],63:[function(require,module,exports){
var selectable = function (userConfig) {

  var defaults =
  {
    // The parent container of this chart.
    'parent'    : null,
    // Set these when you need to CSS style components independently.
    'id'        : 'Selectable',
    'class'     : 'Selectable',
    'width'     : 200,
    'height'    : 100,
    'xoffset'   : 10,
    'yoffset'   : 10,
    'label'     : "",
    'selection' : ["X", "Y"],
    'mode'      : "SINGLE",
    'options'   : {}
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    var chart = this,
      config = chart.config,
      i;

    dex.console.debug("RENDERING: " + config.id);

    if (config.mode == "SINGLE") {
      chart.attr('options.stop',
        function (event, ui) {
          $(event.target).children('.ui-selected').not(':first').removeClass('ui-selected');
        }
      );
    }

    chart.attr('options.selected',
      function (event, ui) {
        chart.publish({'type' : 'selected', 'id' : ui.selected.id});
      });

    chart.attr('options.unselected',
      function (event, ui) {
        chart.publish({'type' : 'unselected', 'id' : ui.unselected.id});
      });

    // Create the main container.
    chart.main = jQuery('<div/>',
      {
        'id'    : config['id'],
        'class' : config['class']
      }).appendTo(config['parent']);

    // Create the main container.
    var label = jQuery('<div/>',
      {
        'id'   : config['id'] + '-label',
        'text' : config['label']
      }).appendTo(chart.main);

    // Create the main container.
    var orderedList = jQuery('<ol/>',
      {
        'id' : config['id'] + '-ol'
      }).appendTo(chart.main);

    orderedList.css('overflow', "scroll");
    orderedList.css('border', "1px solid black");
    orderedList.css('height', config.height + "px");
    orderedList.css('width', config.width + "px");

    for (i = 0; i < config.selection.length; i++) {
      var selectable = jQuery('<li/>',
        {
          'id'    : i,
          'class' : 'ui-widget-content',
          'text'  : config.selection[i]
        }).appendTo(orderedList);
    }

    $('#' + config['id'] + '-ol').children().first().addClass('ui-selected');
    $('#' + config['id'] + '-ol').selectable(config.options);
  };

  chart.update = function () {
  };

  chart.dom = function () {
    return chart.main;
  };

  return chart;
};

module.exports = selectable;
},{}],64:[function(require,module,exports){
var slider = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent'  : null,
    // Set these when you need to CSS style components independently.
    'id'      : 'Slider',
    'class'   : 'ui-widget-content',
    'width'   : 600,
    'height'  : 100,
    'xoffset' : 10,
    'yoffset' : 10,
    'label'   : "",
    'options' : {
      'range' : 'max',
      'min'   : 1,
      'max'   : 10,
      'value' : 5,
      'slide' : null
    }
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.render = function () {
    var chart = this,
      config = chart.config,
      ri, ci;

    var chart = this;
    chart.attr('options.slide',
      function (event, ui) {
        //dex.console.log("EVENT", event, "UI", ui);
        $('#' + config['id'] + '-input').val(ui.value);
        chart.publish("slider-change", {'type' : 'slider-change', 'value' : ui.value});
      });

    // Create the main container.
    chart.main = jQuery('<div/>',
      {
        'id'    : config['id'],
        'class' : config['class']
      }).appendTo(config['parent']);

    // Create the main container.
    var label = jQuery('<label/>',
      {
        'id'    : config['id' + '-label'],
        'class' : 'SliderLabel',
        'text'  : config['label'],
      }).appendTo(chart.main);

    var input = jQuery('<input/>',
      {
        'type'  : 'text',
        'id'    : config['id'] + '-input',
        'class' : 'SliderInput',
        'value' : config.options.value
      }).appendTo(chart.main);

    /*
     <div>
     <label for="ticklength">Tick Length:</label>
     <input type="text" id="ticklength-input" size="5" />
     <div id="ticklength-slider"/>
     </div>
     */
    // Create the main container.
    var slider = jQuery('<div/>',
      {
        'id'    : config['id'] + '-slider',
        'class' : config['class']
      }).appendTo(chart.main);

    //config.parent.appendChild(main);

    $('#' + config['id'] + '-slider').slider(config.options);
  };

  chart.update = function () {
  };

  chart.dom = function () {
    return chart.main;
  };

  return chart;
};

module.exports = slider;
},{}],65:[function(require,module,exports){
var tabs = function (userConfig) {
  var defaults = {
    // The parent container of this chart.
    'parent'     : null,
    // Set these when you need to CSS style components independently.
    'id'         : 'Tabs',
    'class'      : 'ui-widget-content',
    'width'      : 600,
    'height'     : 100,
    'xoffset'    : 10,
    'yoffset'    : 10,
    'title'      : "Options",
    'components' : [],
    'resizeable' : true,
    'draggable'  : true
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;

  chart.tabs = [];

  chart.render = function () {
    var chart = this,
      config = chart.config,
      tabs = chart.tabs,
      ri, ci,
      i, j,
      tab,
      tabName;

    // Create the main container.
    if (config.parent === null) {
      config.parent = document.body;
    }

    chart.main =
      jQuery('<div/>',
        {
          'id'    : config['id'],
          'class' : config['class']
        }).appendTo(config.parent);

    var tabNames = jQuery('<ul/>').appendTo(chart.main);

    for (i = 0; i < tabs.length; i += 1) {
      jQuery('<li><a href="#' + config.id + '-' + (i + 1) + '">' + tabs[i].name + '</a></li>')
        .appendTo(tabNames);
    }
    //dex.console.log(tabs);
    for (i = 0; i < tabs.length; i += 1) {
      var tabBody = jQuery('<div id="' + config.id + '-' + (i + 1) + '"/>').appendTo(chart.main);

      for (j = 0; j < tabs[i].children.length; j++) {
        tabs[i].children[j].attr('parent', tabBody);
        tabs[i].children[j].render();
        tabs[i].children[j].dom().appendTo(tabBody);
      }
    }

    chart.main.tabs();
  };

  chart.update = function () {
  };

  chart.dom = function () {
    return chart.main;
  };

  chart.add = function (tabName, components) {
    var chart = this,
      config = chart.config,
      tabs = chart.tabs,
      i, ti, tab;

    if (typeof tabName === 'undefined') {
      return;
    }

    dex.console.debug("TABS", chart);
    // REM: Replaced implementation w/o testing.
    ti = _.findIndex(tabs, {id : tabName});

    if (ti >= 0) {
      tab = tabs[ti];
    }
    else {
      tab = {'name' : tabName, 'children' : []};
      tabs.push(tab);
    }

    for (i = 1; i < arguments.length; i += 1) {
      tab.children.push(arguments[i]);
    }
    dex.console.debug("ATABS", tabs, tab);
    return chart;
  };

  return chart;
};

module.exports = tabs;
},{}],66:[function(require,module,exports){
/**
 *
 * This module provides ui components based upon jquery-ui.
 *
 * @module dex/ui/jqueryui
 * @name jqueryui
 * @memberOf dex.ui
 *
 */

module.exports = function jqueryui(dex) {
  return {
    'ConfigurationBox': require("./ConfigurationBox"),
    'Player': require("./Player"),
    'Selectable': require("./Selectable"),
    'Slider': require("./Slider"),
    'Tabs': require("./Tabs")
  };
};
},{"./ConfigurationBox":61,"./Player":62,"./Selectable":63,"./Slider":64,"./Tabs":65}],67:[function(require,module,exports){
/**
 *
 * This module provides ui components from a variety of sources.
 *
 * @module dex/ui
 * @name ui
 * @memberOf dex
 *
 */

/**
 *
 * A module for creating ui components such as players and sliders.
 *
 * @name jqueryui
 * @type {module:jqueryui}
 *
 */
module.exports = function ui(dex) {

  return {
    'jqueryui'  : require("./jqueryui/jqueryui")(dex),
    'SqlQuery'  : require("./SqlQuery"),
    'Table'     : require("./Table"),
    'TypesTable': require("./TypesTable")
  };
};
},{"./SqlQuery":58,"./Table":59,"./TypesTable":60,"./jqueryui/jqueryui":66}],68:[function(require,module,exports){
"use strict";

/**
 *
 * This module provides utility routines.
 *
 * @module dex:util
 * @name util
 * @memberOf dex
 *
 */

module.exports = function util(dex) {

  return {
    // Things pertaining to charts.
    'chart': {
      // Chart creation hooks:
      'factory': {
        // Kai S Chang aka: @syntagmatic's d3 parallel coordinates
        'd3': {
          //'parcoords': function (config) {
          //  return require('../../lib/d3.parcoords')()(config.parent);
          //}
        }
      }
    },
    'd3': {
      'autosize': function (d) {
        var bbox = this.getBBox();
        var cbbox = this.parentNode.getBBox();
        var hMargin = Math.min(30, cbbox.height * .1);
        var wMargin = Math.min(30, cbbox.width * .1);
        var wscale = Math.min((cbbox.width - wMargin) / bbox.width);
        var hscale = Math.min((cbbox.height - hMargin) / bbox.height);


        d.bounds = {
          'container-bounds': cbbox,
          'bounds': bbox,
          'scale': Math.min(wscale, hscale),
          'height-scale': hscale,
          'width-scale': wscale
        };
      }
    }
  };
};
},{}]},{},[54])(54)
});