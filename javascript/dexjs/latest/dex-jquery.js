(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dexjquery = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @preserve
 * jquery.layout 1.4.4
 * $Date: 2014-11-29 08:00:00 (Sat, 29 November 2014) $
 * $Rev: 1.0404 $
 *
 * Copyright (c) 2014 Kevin Dalman (http://jquery-dev.com)
 * Based on work by Fabrizio Balliano (http://www.fabrizioballiano.net)
 *
 * Dual licensed under the GPL (http://www.gnu.org/licenses/gpl.html)
 * and MIT (http://www.opensource.org/licenses/mit-license.php) licenses.
 *
 * SEE: http://layout.jquery-dev.com/LICENSE.txt
 *
 * Changelog: http://layout.jquery-dev.com/changelog.cfm
 *
 * Docs: http://layout.jquery-dev.com/documentation.html
 * Tips: http://layout.jquery-dev.com/tips.html
 * Help: http://groups.google.com/group/jquery-ui-layout
 */

/* JavaDoc Info: http://code.google.com/closure/compiler/docs/js-for-compiler.html
 * {!Object}	non-nullable type (never NULL)
 * {?string}	nullable type (sometimes NULL) - default for {Object}
 * {number=}	optional parameter
 * {*}			ALL types
 */
/*	TODO for jQ 2.x
 *	check $.fn.disableSelection - this is in jQuery UI 1.9.x
 */

// NOTE: For best readability, view with a fixed-width font and tabs equal to 4-chars

;(function ($) {

// alias Math methods - used a lot!
  var	min		= Math.min
    ,	max		= Math.max
    ,	round	= Math.floor

    ,	isStr	=  function (v) { return $.type(v) === "string"; }

    /**
     * @param {!Object}			Instance
     * @param {Array.<string>}	a_fn
     */
    ,	runPluginCallbacks = function (Instance, a_fn) {
      if ($.isArray(a_fn))
        for (var i=0, c=a_fn.length; i<c; i++) {
          var fn = a_fn[i];
          try {
            if (isStr(fn)) // 'name' of a function
              fn = eval(fn);
            if ($.isFunction(fn))
              g(fn)( Instance );
          } catch (ex) {}
        }
      function g (f) { return f; }; // compiler hack
    }
  ;

  /*
   *	GENERIC $.layout METHODS - used by all layouts
   */
  $.layout = {

    version:	"1.4.4"
    ,	revision:	1.0404 // eg: ver 1.4.4 = rev 1.0404 - major(n+).minor(nn)+patch(nn+)

    // $.layout.browser REPLACES $.browser
    ,	browser:	{} // set below

    // *PREDEFINED* EFFECTS & DEFAULTS
    // MUST list effect here - OR MUST set an fxSettings option (can be an empty hash: {})
    ,	effects: {

      //	Pane Open/Close Animations
      slide: {
        all:	{ duration:  "fast"	} // eg: duration: 1000, easing: "easeOutBounce"
        ,	north:	{ direction: "up"	}
        ,	south:	{ direction: "down"	}
        ,	east:	{ direction: "right"}
        ,	west:	{ direction: "left"	}
      }
      ,	drop: {
        all:	{ duration:  "slow"	}
        ,	north:	{ direction: "up"	}
        ,	south:	{ direction: "down"	}
        ,	east:	{ direction: "right"}
        ,	west:	{ direction: "left"	}
      }
      ,	scale: {
        all:	{ duration:	"fast"	}
      }
      //	these are not recommended, but can be used
      ,	blind:		{}
      ,	clip:		{}
      ,	explode:	{}
      ,	fade:		{}
      ,	fold:		{}
      ,	puff:		{}

      //	Pane Resize Animations
      ,	size: {
        all:	{ easing:	"swing"	}
      }
    }

    // INTERNAL CONFIG DATA - DO NOT CHANGE THIS!
    ,	config: {
      optionRootKeys:	"effects,panes,north,south,west,east,center".split(",")
      ,	allPanes:		"north,south,west,east,center".split(",")
      ,	borderPanes:	"north,south,west,east".split(",")
      ,	oppositeEdge: {
        north:	"south"
        ,	south:	"north"
        ,	east: 	"west"
        ,	west: 	"east"
      }
      //	offscreen data
      ,	offscreenCSS:	{ left: "-99999px", right: "auto" } // used by hide/close if useOffscreenClose=true
      ,	offscreenReset:	"offscreenReset" // key used for data
      //	CSS used in multiple places
      ,	hidden:		{ visibility: "hidden" }
      ,	visible:	{ visibility: "visible" }
      //	layout element settings
      ,	resizers: {
        cssReq: {
          position: 	"absolute"
          ,	padding: 	0
          ,	margin: 	0
          ,	fontSize:	"1px"
          ,	textAlign:	"left"	// to counter-act "center" alignment!
          ,	overflow: 	"hidden" // prevent toggler-button from overflowing
          //	SEE $.layout.defaults.zIndexes.resizer_normal
        }
        ,	cssDemo: { // DEMO CSS - applied if: options.PANE.applyDemoStyles=true
          background: "#DDD"
          ,	border:		"none"
        }
      }
      ,	togglers: {
        cssReq: {
          position: 	"absolute"
          ,	display: 	"block"
          ,	padding: 	0
          ,	margin: 	0
          ,	overflow:	"hidden"
          ,	textAlign:	"center"
          ,	fontSize:	"1px"
          ,	cursor: 	"pointer"
          ,	zIndex: 	1
        }
        ,	cssDemo: { // DEMO CSS - applied if: options.PANE.applyDemoStyles=true
          background: "#AAA"
        }
      }
      ,	content: {
        cssReq: {
          position:	"relative" /* contain floated or positioned elements */
        }
        ,	cssDemo: { // DEMO CSS - applied if: options.PANE.applyDemoStyles=true
          overflow:	"auto"
          ,	padding:	"10px"
        }
        ,	cssDemoPane: { // DEMO CSS - REMOVE scrolling from 'pane' when it has a content-div
          overflow:	"hidden"
          ,	padding:	0
        }
      }
      ,	panes: { // defaults for ALL panes - overridden by 'per-pane settings' below
        cssReq: {
          position: 	"absolute"
          ,	margin:		0
          //	$.layout.defaults.zIndexes.pane_normal
        }
        ,	cssDemo: { // DEMO CSS - applied if: options.PANE.applyDemoStyles=true
          padding:	"10px"
          ,	background:	"#FFF"
          ,	border:		"1px solid #BBB"
          ,	overflow:	"auto"
        }
      }
      ,	north: {
        side:			"top"
        ,	sizeType:		"Height"
        ,	dir:			"horz"
        ,	cssReq: {
          top: 		0
          ,	bottom: 	"auto"
          ,	left: 		0
          ,	right: 		0
          ,	width: 		"auto"
          //	height: 	DYNAMIC
        }
      }
      ,	south: {
        side:			"bottom"
        ,	sizeType:		"Height"
        ,	dir:			"horz"
        ,	cssReq: {
          top: 		"auto"
          ,	bottom: 	0
          ,	left: 		0
          ,	right: 		0
          ,	width: 		"auto"
          //	height: 	DYNAMIC
        }
      }
      ,	east: {
        side:			"right"
        ,	sizeType:		"Width"
        ,	dir:			"vert"
        ,	cssReq: {
          left: 		"auto"
          ,	right: 		0
          ,	top: 		"auto" // DYNAMIC
          ,	bottom: 	"auto" // DYNAMIC
          ,	height: 	"auto"
          //	width: 		DYNAMIC
        }
      }
      ,	west: {
        side:			"left"
        ,	sizeType:		"Width"
        ,	dir:			"vert"
        ,	cssReq: {
          left: 		0
          ,	right: 		"auto"
          ,	top: 		"auto" // DYNAMIC
          ,	bottom: 	"auto" // DYNAMIC
          ,	height: 	"auto"
          //	width: 		DYNAMIC
        }
      }
      ,	center: {
        dir:			"center"
        ,	cssReq: {
          left: 		"auto" // DYNAMIC
          ,	right: 		"auto" // DYNAMIC
          ,	top: 		"auto" // DYNAMIC
          ,	bottom: 	"auto" // DYNAMIC
          ,	height: 	"auto"
          ,	width: 		"auto"
        }
      }
    }

    // CALLBACK FUNCTION NAMESPACE - used to store reusable callback functions
    ,	callbacks: {}

    ,	getParentPaneElem: function (el) {
      // must pass either a container or pane element
      var $el = $(el)
        ,	layout = $el.data("layout") || $el.data("parentLayout");
      if (layout) {
        var $cont = layout.container;
        // see if this container is directly-nested inside an outer-pane
        if ($cont.data("layoutPane")) return $cont;
        var $pane = $cont.closest("."+ $.layout.defaults.panes.paneClass);
        // if a pane was found, return it
        if ($pane.data("layoutPane")) return $pane;
      }
      return null;
    }

    ,	getParentPaneInstance: function (el) {
      // must pass either a container or pane element
      var $pane = $.layout.getParentPaneElem(el);
      return $pane ? $pane.data("layoutPane") : null;
    }

    ,	getParentLayoutInstance: function (el) {
      // must pass either a container or pane element
      var $pane = $.layout.getParentPaneElem(el);
      return $pane ? $pane.data("parentLayout") : null;
    }

    ,	getEventObject: function (evt) {
      return typeof evt === "object" && evt.stopPropagation ? evt : null;
    }
    ,	parsePaneName: function (evt_or_pane) {
      var evt = $.layout.getEventObject( evt_or_pane )
        ,	pane = evt_or_pane;
      if (evt) {
        // ALWAYS stop propagation of events triggered in Layout!
        evt.stopPropagation();
        pane = $(this).data("layoutEdge");
      }
      if (pane && !/^(west|east|north|south|center)$/.test(pane)) {
        $.layout.msg('LAYOUT ERROR - Invalid pane-name: "'+ pane +'"');
        pane = "error";
      }
      return pane;
    }


    // LAYOUT-PLUGIN REGISTRATION
    // more plugins can added beyond this default list
    ,	plugins: {
      draggable:		!!$.fn.draggable // resizing
      ,	effects: {
        core:		!!$.effects		// animimations (specific effects tested by initOptions)
        ,	slide:		$.effects && ($.effects.slide || ($.effects.effect && $.effects.effect.slide)) // default effect
      }
    }

//	arrays of plugin or other methods to be triggered for events in *each layout* - will be passed 'Instance'
    ,	onCreate:	[]	// runs when layout is just starting to be created - right after options are set
    ,	onLoad:		[]	// runs after layout container and global events init, but before initPanes is called
    ,	onReady:	[]	// runs after initialization *completes* - ie, after initPanes completes successfully
    ,	onDestroy:	[]	// runs after layout is destroyed
    ,	onUnload:	[]	// runs after layout is destroyed OR when page unloads
    ,	afterOpen:	[]	// runs after setAsOpen() completes
    ,	afterClose:	[]	// runs after setAsClosed() completes

    /*
     *	GENERIC UTILITY METHODS
     */

    // calculate and return the scrollbar width, as an integer
    ,	scrollbarWidth:		function () { return window.scrollbarWidth  || $.layout.getScrollbarSize('width'); }
    ,	scrollbarHeight:	function () { return window.scrollbarHeight || $.layout.getScrollbarSize('height'); }
    ,	getScrollbarSize:	function (dim) {
      var $c	= $('<div style="position: absolute; top: -10000px; left: -10000px; width: 100px; height: 100px; border: 0; overflow: scroll;"></div>').appendTo("body")
        ,	d	= { width: $c.outerWidth - $c[0].clientWidth, height: 100 - $c[0].clientHeight };
      $c.remove();
      window.scrollbarWidth	= d.width;
      window.scrollbarHeight	= d.height;
      return dim.match(/^(width|height)$/) ? d[dim] : d;
    }


    ,	disableTextSelection: function () {
      var $d	= $(document)
        ,	s	= 'textSelectionDisabled'
        ,	x	= 'textSelectionInitialized'
      ;
      if ($.fn.disableSelection) {
        if (!$d.data(x)) // document hasn't been initialized yet
          $d.on('mouseup', $.layout.enableTextSelection ).data(x, true);
        if (!$d.data(s))
          $d.disableSelection().data(s, true);
      }
    }
    ,	enableTextSelection: function () {
      var $d	= $(document)
        ,	s	= 'textSelectionDisabled';
      if ($.fn.enableSelection && $d.data(s))
        $d.enableSelection().data(s, false);
    }


    /**
     * Returns hash container 'display' and 'visibility'
     *
     * @see	$.swap() - swaps CSS, runs callback, resets CSS
     * @param  {!Object}		$E				jQuery element
     * @param  {boolean=}	[force=false]	Run even if display != none
     * @return {!Object}						Returns current style props, if applicable
     */
    ,	showInvisibly: function ($E, force) {
      if ($E && $E.length && (force || $E.css("display") === "none")) { // only if not *already hidden*
        var s = $E[0].style
          // save ONLY the 'style' props because that is what we must restore
          ,	CSS = { display: s.display || '', visibility: s.visibility || '' };
        // show element 'invisibly' so can be measured
        $E.css({ display: "block", visibility: "hidden" });
        return CSS;
      }
      return {};
    }

    /**
     * Returns data for setting size of an element (container or a pane).
     *
     * @see  _create(), onWindowResize() for container, plus others for pane
     * @return JSON  Returns a hash of all dimensions: top, bottom, left, right, outerWidth, innerHeight, etc
     */
    ,	getElementDimensions: function ($E, inset) {
      var
        //	dimensions hash - start with current data IF passed
        d	= { css: {}, inset: {} }
        ,	x	= d.css			// CSS hash
        ,	i	= { bottom: 0 }	// TEMP insets (bottom = complier hack)
        ,	N	= $.layout.cssNum
        ,	R	= Math.round
        ,	off = $E.offset()
        ,	b, p, ei			// TEMP border, padding
      ;
      d.offsetLeft = off.left;
      d.offsetTop  = off.top;

      if (!inset) inset = {}; // simplify logic below

      $.each("Left,Right,Top,Bottom".split(","), function (idx, e) { // e = edge
        b = x["border" + e] = $.layout.borderWidth($E, e);
        p = x["padding"+ e] = $.layout.cssNum($E, "padding"+e);
        ei = e.toLowerCase();
        d.inset[ei] = inset[ei] >= 0 ? inset[ei] : p; // any missing insetX value = paddingX
        i[ei] = d.inset[ei] + b; // total offset of content from outer side
      });

      x.width		= R($E.width());
      x.height	= R($E.height());
      x.top		= N($E,"top",true);
      x.bottom	= N($E,"bottom",true);
      x.left		= N($E,"left",true);
      x.right		= N($E,"right",true);

      d.outerWidth	= R($E.outerWidth());
      d.outerHeight	= R($E.outerHeight());
      // calc the TRUE inner-dimensions, even in quirks-mode!
      d.innerWidth	= max(0, d.outerWidth  - i.left - i.right);
      d.innerHeight	= max(0, d.outerHeight - i.top  - i.bottom);
      // layoutWidth/Height is used in calcs for manual resizing
      // layoutW/H only differs from innerW/H when in quirks-mode - then is like outerW/H
      d.layoutWidth	= R($E.innerWidth());
      d.layoutHeight	= R($E.innerHeight());

      //if ($E.prop('tagName') === 'BODY') { debugData( d, $E.prop('tagName') ); } // DEBUG

      //d.visible	= $E.is(":visible");// && x.width > 0 && x.height > 0;

      return d;
    }

    ,	getElementStyles: function ($E, list) {
      var
        CSS	= {}
        ,	style	= $E[0].style
        ,	props	= list.split(",")
        ,	sides	= "Top,Bottom,Left,Right".split(",")
        ,	attrs	= "Color,Style,Width".split(",")
        ,	p, s, a, i, j, k
      ;
      for (i=0; i < props.length; i++) {
        p = props[i];
        if (p.match(/(border|padding|margin)$/))
          for (j=0; j < 4; j++) {
            s = sides[j];
            if (p === "border")
              for (k=0; k < 3; k++) {
                a = attrs[k];
                CSS[p+s+a] = style[p+s+a];
              }
            else
              CSS[p+s] = style[p+s];
          }
        else
          CSS[p] = style[p];
      };
      return CSS
    }

    /**
     * Return the innerWidth for the current browser/doctype
     *
     * @see  initPanes(), sizeMidPanes(), initHandles(), sizeHandles()
     * @param  {Array.<Object>}	$E  Must pass a jQuery object - first element is processed
     * @param  {number=}			outerWidth (optional) Can pass a width, allowing calculations BEFORE element is resized
     * @return {number}			Returns the innerWidth of the elem by subtracting padding and borders
     */
    ,	cssWidth: function ($E, outerWidth) {
      // a 'calculated' outerHeight can be passed so borders and/or padding are removed if needed
      if (outerWidth <= 0) return 0;

      var lb	= $.layout.browser
        ,	bs	= !lb.boxModel ? "border-box" : lb.boxSizing ? $E.css("boxSizing") : "content-box"
        ,	b	= $.layout.borderWidth
        ,	n	= $.layout.cssNum
        ,	W	= outerWidth
      ;
      // strip border and/or padding from outerWidth to get CSS Width
      if (bs !== "border-box")
        W -= (b($E, "Left") + b($E, "Right"));
      if (bs === "content-box")
        W -= (n($E, "paddingLeft") + n($E, "paddingRight"));
      return max(0,W);
    }

    /**
     * Return the innerHeight for the current browser/doctype
     *
     * @see  initPanes(), sizeMidPanes(), initHandles(), sizeHandles()
     * @param  {Array.<Object>}	$E  Must pass a jQuery object - first element is processed
     * @param  {number=}			outerHeight  (optional) Can pass a width, allowing calculations BEFORE element is resized
     * @return {number}			Returns the innerHeight of the elem by subtracting padding and borders
     */
    ,	cssHeight: function ($E, outerHeight) {
      // a 'calculated' outerHeight can be passed so borders and/or padding are removed if needed
      if (outerHeight <= 0) return 0;

      var lb	= $.layout.browser
        ,	bs	= !lb.boxModel ? "border-box" : lb.boxSizing ? $E.css("boxSizing") : "content-box"
        ,	b	= $.layout.borderWidth
        ,	n	= $.layout.cssNum
        ,	H	= outerHeight
      ;
      // strip border and/or padding from outerHeight to get CSS Height
      if (bs !== "border-box")
        H -= (b($E, "Top") + b($E, "Bottom"));
      if (bs === "content-box")
        H -= (n($E, "paddingTop") + n($E, "paddingBottom"));
      return max(0,H);
    }

    /**
     * Returns the 'current CSS numeric value' for a CSS property - 0 if property does not exist
     *
     * @see  Called by many methods
     * @param {Array.<Object>}	$E					Must pass a jQuery object - first element is processed
     * @param {string}			prop				The name of the CSS property, eg: top, width, etc.
     * @param {boolean=}			[allowAuto=false]	true = return 'auto' if that is value; false = return 0
     * @return {(string|number)}						Usually used to get an integer value for position (top, left) or size (height, width)
     */
    ,	cssNum: function ($E, prop, allowAuto) {
      if (!$E.jquery) $E = $($E);
      var CSS = $.layout.showInvisibly($E)
        ,	p	= $.css($E[0], prop, true)
        ,	v	= allowAuto && p=="auto" ? p : Math.round(parseFloat(p) || 0);
      $E.css( CSS ); // RESET
      return v;
    }

    ,	borderWidth: function (el, side) {
      if (el.jquery) el = el[0];
      var b = "border"+ side.substr(0,1).toUpperCase() + side.substr(1); // left => Left
      return $.css(el, b+"Style", true) === "none" ? 0 : Math.round(parseFloat($.css(el, b+"Width", true)) || 0);
    }

    /**
     * Mouse-tracking utility - FUTURE REFERENCE
     *
     * init: if (!window.mouse) {
	 *			window.mouse = { x: 0, y: 0 };
	 *			$(document).mousemove( $.layout.trackMouse );
	 *		}
     *
     * @param {Object}		evt
     *
     ,	trackMouse: function (evt) {
		window.mouse = { x: evt.clientX, y: evt.clientY };
	}
     */

    /**
     * SUBROUTINE for preventPrematureSlideClose option
     *
     * @param {Object}		evt
     * @param {Object=}		el
     */
    ,	isMouseOverElem: function (evt, el) {
      var
        $E	= $(el || this)
        ,	d	= $E.offset()
        ,	T	= d.top
        ,	L	= d.left
        ,	R	= L + $E.outerWidth()
        ,	B	= T + $E.outerHeight()
        ,	x	= evt.pageX	// evt.clientX ?
        ,	y	= evt.pageY	// evt.clientY ?
      ;
      // if X & Y are < 0, probably means is over an open SELECT
      return ($.layout.browser.msie && x < 0 && y < 0) || ((x >= L && x <= R) && (y >= T && y <= B));
    }

    /**
     * Message/Logging Utility
     *
     * @example $.layout.msg("My message");				// log text
     * @example $.layout.msg("My message", true);		// alert text
     * @example $.layout.msg({ foo: "bar" }, "Title");	// log hash-data, with custom title
     * @example $.layout.msg({ foo: "bar" }, true, "Title", { sort: false }); -OR-
     * @example $.layout.msg({ foo: "bar" }, "Title", { sort: false, display: true }); // alert hash-data
     *
     * @param {(Object|string)}			info			String message OR Hash/Array
     * @param {(Boolean|string|Object)=}	[popup=false]	True means alert-box - can be skipped
     * @param {(Object|string)=}			[debugTitle=""]	Title for Hash data - can be skipped
     * @param {Object=}					[debugOpts]		Extra options for debug output
     */
    ,	msg: function (info, popup, debugTitle, debugOpts) {
      if ($.isPlainObject(info) && window.debugData) {
        if (typeof popup === "string") {
          debugOpts	= debugTitle;
          debugTitle	= popup;
        }
        else if (typeof debugTitle === "object") {
          debugOpts	= debugTitle;
          debugTitle	= null;
        }
        var t = debugTitle || "log( <object> )"
          ,	o = $.extend({ sort: false, returnHTML: false, display: false }, debugOpts);
        if (popup === true || o.display)
          debugData( info, t, o );
        else if (window.console)
          console.log(debugData( info, t, o ));
      }
      else if (popup)
        alert(info);
      else if (window.console)
        console.log(info);
      else {
        var id	= "#layoutLogger"
          ,	$l = $(id);
        if (!$l.length)
          $l = createLog();
        $l.children("ul").append('<li style="padding: 4px 10px; margin: 0; border-top: 1px solid #CCC;">'+ info.replace(/\</g,"&lt;").replace(/\>/g,"&gt;") +'</li>');
      }

      function createLog () {
        var pos = $.support.fixedPosition ? 'fixed' : 'absolute'
          ,	$e = $('<div id="layoutLogger" style="position: '+ pos +'; top: 5px; z-index: 999999; max-width: 25%; overflow: hidden; border: 1px solid #000; border-radius: 5px; background: #FBFBFB; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">'
          +	'<div style="font-size: 13px; font-weight: bold; padding: 5px 10px; background: #F6F6F6; border-radius: 5px 5px 0 0; cursor: move;">'
          +	'<span style="float: right; padding-left: 7px; cursor: pointer;" title="Remove Console" onclick="$(this).closest(\'#layoutLogger\').remove()">X</span>Layout console.log</div>'
          +	'<ul style="font-size: 13px; font-weight: none; list-style: none; margin: 0; padding: 0 0 2px;"></ul>'
          + '</div>'
        ).appendTo("body");
        $e.css('left', $(window).width() - $e.outerWidth() - 5)
        if ($.ui.draggable) $e.draggable({ handle: ':first-child' });
        return $e;
      };
    }

  };


  /*
   *	$.layout.browser REPLACES removed $.browser, with extra data
   *	Parsing code here adapted from jQuery 1.8 $.browse
   */
  (function(){
    var u = navigator.userAgent.toLowerCase()
      ,	m = /(chrome)[ \/]([\w.]+)/.exec( u )
      ||	/(webkit)[ \/]([\w.]+)/.exec( u )
      ||	/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( u )
      ||	/(msie) ([\w.]+)/.exec( u )
      ||	u.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( u )
      ||	[]
      ,	b = m[1] || ""
      ,	v = m[2] || 0
      ,	ie = b === "msie"
      ,	cm = document.compatMode
      ,	$s = $.support
      ,	bs = $s.boxSizing !== undefined ? $s.boxSizing : $s.boxSizingReliable
      ,	bm = !ie || !cm || cm === "CSS1Compat" || $s.boxModel || false
      ,	lb = $.layout.browser = {
      version:	v
      ,	safari:		b === "webkit"	// webkit (NOT chrome) = safari
      ,	webkit:		b === "chrome"	// chrome = webkit
      ,	msie:		ie
      ,	isIE6:		ie && v == 6
      // ONLY IE reverts to old box-model - Note that compatMode was deprecated as of IE8
      ,	boxModel:	bm
      ,	boxSizing:	!!(typeof bs === "function" ? bs() : bs)
    };
    ;
    if (b) lb[b] = true; // set CURRENT browser
    /*	OLD versions of jQuery only set $.support.boxModel after page is loaded
     *	so if this is IE, use support.boxModel to test for quirks-mode (ONLY IE changes boxModel) */
    if (!bm && !cm) $(function(){ lb.boxModel = $s.boxModel; });
  })();


// DEFAULT OPTIONS
  $.layout.defaults = {
    /*
     *	LAYOUT & LAYOUT-CONTAINER OPTIONS
     *	- none of these options are applicable to individual panes
     */
    name:						""			// Not required, but useful for buttons and used for the state-cookie
    ,	containerClass:				"ui-layout-container" // layout-container element
    ,	inset:						null		// custom container-inset values (override padding)
    ,	scrollToBookmarkOnLoad:		true		// after creating a layout, scroll to bookmark in URL (.../page.htm#myBookmark)
    ,	resizeWithWindow:			true		// bind thisLayout.resizeAll() to the window.resize event
    ,	resizeWithWindowDelay:		200			// delay calling resizeAll because makes window resizing very jerky
    ,	resizeWithWindowMaxDelay:	0			// 0 = none - force resize every XX ms while window is being resized
    ,	maskPanesEarly:				false		// true = create pane-masks on resizer.mouseDown instead of waiting for resizer.dragstart
    ,	onresizeall_start:			null		// CALLBACK when resizeAll() STARTS	- NOT pane-specific
    ,	onresizeall_end:			null		// CALLBACK when resizeAll() ENDS	- NOT pane-specific
    ,	onload_start:				null		// CALLBACK when Layout inits - after options initialized, but before elements
    ,	onload_end:					null		// CALLBACK when Layout inits - after EVERYTHING has been initialized
    ,	onunload_start:				null		// CALLBACK when Layout is destroyed OR onWindowUnload
    ,	onunload_end:				null		// CALLBACK when Layout is destroyed OR onWindowUnload
    ,	initPanes:					true		// false = DO NOT initialize the panes onLoad - will init later
    ,	showErrorMessages:			true		// enables fatal error messages to warn developers of common errors
    ,	showDebugMessages:			false		// display console-and-alert debug msgs - IF this Layout version _has_ debugging code!
//	Changing this zIndex value will cause other zIndex values to automatically change
    ,	zIndex:						null		// the PANE zIndex - resizers and masks will be +1
//	DO NOT CHANGE the zIndex values below unless you clearly understand their relationships
    ,	zIndexes: {								// set _default_ z-index values here...
      pane_normal:			0			// normal z-index for panes
      ,	content_mask:			1			// applied to overlays used to mask content INSIDE panes during resizing
      ,	resizer_normal:			2			// normal z-index for resizer-bars
      ,	pane_sliding:			100			// applied to *BOTH* the pane and its resizer when a pane is 'slid open'
      ,	pane_animate:			1000		// applied to the pane when being animated - not applied to the resizer
      ,	resizer_drag:			10000		// applied to the CLONED resizer-bar when being 'dragged'
    }
    ,	errors: {
      pane:					"pane"		// description of "layout pane element" - used only in error messages
      ,	selector:				"selector"	// description of "jQuery-selector" - used only in error messages
      ,	addButtonError:			"Error Adding Button\nInvalid "
      ,	containerMissing:		"UI Layout Initialization Error\nThe specified layout-container does not exist."
      ,	centerPaneMissing:		"UI Layout Initialization Error\nThe center-pane element does not exist.\nThe center-pane is a required element."
      ,	noContainerHeight:		"UI Layout Initialization Warning\nThe layout-container \"CONTAINER\" has no height.\nTherefore the layout is 0-height and hence 'invisible'!"
      ,	callbackError:			"UI Layout Callback Error\nThe EVENT callback is not a valid function."
    }
    /*
     *	PANE DEFAULT SETTINGS
     *	- settings under the 'panes' key become the default settings for *all panes*
     *	- ALL pane-options can also be set specifically for each panes, which will override these 'default values'
     */
    ,	panes: { // default options for 'all panes' - will be overridden by 'per-pane settings'
      applyDemoStyles: 		false		// NOTE: renamed from applyDefaultStyles for clarity
      ,	closable:				true		// pane can open & close
      ,	resizable:				true		// when open, pane can be resized
      ,	slidable:				true		// when closed, pane can 'slide open' over other panes - closes on mouse-out
      ,	initClosed:				false		// true = init pane as 'closed'
      ,	initHidden: 			false 		// true = init pane as 'hidden' - no resizer-bar/spacing
      //	SELECTORS
      //,	paneSelector:			""			// MUST be pane-specific - jQuery selector for pane
      ,	contentSelector:		".ui-layout-content" // INNER div/element to auto-size so only it scrolls, not the entire pane!
      ,	contentIgnoreSelector:	".ui-layout-ignore"	// element(s) to 'ignore' when measuring 'content'
      ,	findNestedContent:		false		// true = $P.find(contentSelector), false = $P.children(contentSelector)
      //	GENERIC ROOT-CLASSES - for auto-generated classNames
      ,	paneClass:				"ui-layout-pane"	// Layout Pane
      ,	resizerClass:			"ui-layout-resizer"	// Resizer Bar
      ,	togglerClass:			"ui-layout-toggler"	// Toggler Button
      ,	buttonClass:			"ui-layout-button"	// CUSTOM Buttons	- eg: '[ui-layout-button]-toggle/-open/-close/-pin'
      //	ELEMENT SIZE & SPACING
      //,	size:					100			// MUST be pane-specific -initial size of pane
      ,	minSize:				0			// when manually resizing a pane
      ,	maxSize:				0			// ditto, 0 = no limit
      ,	spacing_open:			6			// space between pane and adjacent panes - when pane is 'open'
      ,	spacing_closed:			6			// ditto - when pane is 'closed'
      ,	togglerLength_open:		50			// Length = WIDTH of toggler button on north/south sides - HEIGHT on east/west sides
      ,	togglerLength_closed: 	50			// 100% OR -1 means 'full height/width of resizer bar' - 0 means 'hidden'
      ,	togglerAlign_open:		"center"	// top/left, bottom/right, center, OR...
      ,	togglerAlign_closed:	"center"	// 1 => nn = offset from top/left, -1 => -nn == offset from bottom/right
      ,	togglerContent_open:	""			// text or HTML to put INSIDE the toggler
      ,	togglerContent_closed:	""			// ditto
      //	RESIZING OPTIONS
      ,	resizerDblClickToggle:	true		//
      ,	autoResize:				true		// IF size is 'auto' or a percentage, then recalc 'pixel size' whenever the layout resizes
      ,	autoReopen:				true		// IF a pane was auto-closed due to noRoom, reopen it when there is room? False = leave it closed
      ,	resizerDragOpacity:		1			// option for ui.draggable
      //,	resizerCursor:			""			// MUST be pane-specific - cursor when over resizer-bar
      ,	maskContents:			false		// true = add DIV-mask over-or-inside this pane so can 'drag' over IFRAMES
      ,	maskObjects:			false		// true = add IFRAME-mask over-or-inside this pane to cover objects/applets - content-mask will overlay this mask
      ,	maskZindex:				null		// will override zIndexes.content_mask if specified - not applicable to iframe-panes
      ,	resizingGrid:			false		// grid size that the resizers will snap-to during resizing, eg: [20,20]
      ,	livePaneResizing:		false		// true = LIVE Resizing as resizer is dragged
      ,	liveContentResizing:	false		// true = re-measure header/footer heights as resizer is dragged
      ,	liveResizingTolerance:	1			// how many px change before pane resizes, to control performance
      //	SLIDING OPTIONS
      ,	sliderCursor:			"pointer"	// cursor when resizer-bar will trigger 'sliding'
      ,	slideTrigger_open:		"click"		// click, dblclick, mouseenter
      ,	slideTrigger_close:		"mouseleave"// click, mouseleave
      ,	slideDelay_open:		300			// applies only for mouseenter event - 0 = instant open
      ,	slideDelay_close:		300			// applies only for mouseleave event (300ms is the minimum!)
      ,	hideTogglerOnSlide:		false		// when pane is slid-open, should the toggler show?
      ,	preventQuickSlideClose:	$.layout.browser.webkit // Chrome triggers slideClosed as it is opening
      ,	preventPrematureSlideClose: false	// handle incorrect mouseleave trigger, like when over a SELECT-list in IE
      //	PANE-SPECIFIC TIPS & MESSAGES
      ,	tips: {
        Open:				"Open"		// eg: "Open Pane"
        ,	Close:				"Close"
        ,	Resize:				"Resize"
        ,	Slide:				"Slide Open"
        ,	Pin:				"Pin"
        ,	Unpin:				"Un-Pin"
        ,	noRoomToOpen:		"Not enough room to show this panel."	// alert if user tries to open a pane that cannot
        ,	minSizeWarning:		"Panel has reached its minimum size"	// displays in browser statusbar
        ,	maxSizeWarning:		"Panel has reached its maximum size"	// ditto
      }
      //	HOT-KEYS & MISC
      ,	showOverflowOnHover:	false		// will bind allowOverflow() utility to pane.onMouseOver
      ,	enableCursorHotkey:		true		// enabled 'cursor' hotkeys
      //,	customHotkey:			""			// MUST be pane-specific - EITHER a charCode OR a character
      ,	customHotkeyModifier:	"SHIFT"		// either 'SHIFT', 'CTRL' or 'CTRL+SHIFT' - NOT 'ALT'
      //	PANE ANIMATION
      //	NOTE: fxSss_open, fxSss_close & fxSss_size options (eg: fxName_open) are auto-generated if not passed
      ,	fxName:					"slide" 	// ('none' or blank), slide, drop, scale -- only relevant to 'open' & 'close', NOT 'size'
      ,	fxSpeed:				null		// slow, normal, fast, 200, nnn - if passed, will OVERRIDE fxSettings.duration
      ,	fxSettings:				{}			// can be passed, eg: { easing: "easeOutBounce", duration: 1500 }
      ,	fxOpacityFix:			true		// tries to fix opacity in IE to restore anti-aliasing after animation
      ,	animatePaneSizing:		false		// true = animate resizing after dragging resizer-bar OR sizePane() is called
      /*  NOTE: Action-specific FX options are auto-generated from the options above if not specifically set:
       fxName_open:			"slide"		// 'Open' pane animation
       fnName_close:			"slide"		// 'Close' pane animation
       fxName_size:			"slide"		// 'Size' pane animation - when animatePaneSizing = true
       fxSpeed_open:			null
       fxSpeed_close:			null
       fxSpeed_size:			null
       fxSettings_open:		{}
       fxSettings_close:		{}
       fxSettings_size:		{}
       */
      //	CHILD/NESTED LAYOUTS
      ,	children:				null		// Layout-options for nested/child layout - even {} is valid as options
      ,	containerSelector:		''			// if child is NOT 'directly nested', a selector to find it/them (can have more than one child layout!)
      ,	initChildren:			true		// true = child layout will be created as soon as _this_ layout completes initialization
      ,	destroyChildren:		true		// true = destroy child-layout if this pane is destroyed
      ,	resizeChildren:			true		// true = trigger child-layout.resizeAll() when this pane is resized
      //	EVENT TRIGGERING
      ,	triggerEventsOnLoad:	false		// true = trigger onopen OR onclose callbacks when layout initializes
      ,	triggerEventsDuringLiveResize: true	// true = trigger onresize callback REPEATEDLY if livePaneResizing==true
      //	PANE CALLBACKS
      ,	onshow_start:			null		// CALLBACK when pane STARTS to Show	- BEFORE onopen/onhide_start
      ,	onshow_end:				null		// CALLBACK when pane ENDS being Shown	- AFTER  onopen/onhide_end
      ,	onhide_start:			null		// CALLBACK when pane STARTS to Close	- BEFORE onclose_start
      ,	onhide_end:				null		// CALLBACK when pane ENDS being Closed	- AFTER  onclose_end
      ,	onopen_start:			null		// CALLBACK when pane STARTS to Open
      ,	onopen_end:				null		// CALLBACK when pane ENDS being Opened
      ,	onclose_start:			null		// CALLBACK when pane STARTS to Close
      ,	onclose_end:			null		// CALLBACK when pane ENDS being Closed
      ,	onresize_start:			null		// CALLBACK when pane STARTS being Resized ***FOR ANY REASON***
      ,	onresize_end:			null		// CALLBACK when pane ENDS being Resized ***FOR ANY REASON***
      ,	onsizecontent_start:	null		// CALLBACK when sizing of content-element STARTS
      ,	onsizecontent_end:		null		// CALLBACK when sizing of content-element ENDS
      ,	onswap_start:			null		// CALLBACK when pane STARTS to Swap
      ,	onswap_end:				null		// CALLBACK when pane ENDS being Swapped
      ,	ondrag_start:			null		// CALLBACK when pane STARTS being ***MANUALLY*** Resized
      ,	ondrag_end:				null		// CALLBACK when pane ENDS being ***MANUALLY*** Resized
    }
    /*
     *	PANE-SPECIFIC SETTINGS
     *	- options listed below MUST be specified per-pane - they CANNOT be set under 'panes'
     *	- all options under the 'panes' key can also be set specifically for any pane
     *	- most options under the 'panes' key apply only to 'border-panes' - NOT the the center-pane
     */
    ,	north: {
      paneSelector:			".ui-layout-north"
      ,	size:					"auto"		// eg: "auto", "30%", .30, 200
      ,	resizerCursor:			"n-resize"	// custom = url(myCursor.cur)
      ,	customHotkey:			""			// EITHER a charCode (43) OR a character ("o")
    }
    ,	south: {
      paneSelector:			".ui-layout-south"
      ,	size:					"auto"
      ,	resizerCursor:			"s-resize"
      ,	customHotkey:			""
    }
    ,	east: {
      paneSelector:			".ui-layout-east"
      ,	size:					200
      ,	resizerCursor:			"e-resize"
      ,	customHotkey:			""
    }
    ,	west: {
      paneSelector:			".ui-layout-west"
      ,	size:					200
      ,	resizerCursor:			"w-resize"
      ,	customHotkey:			""
    }
    ,	center: {
      paneSelector:			".ui-layout-center"
      ,	minWidth:				0
      ,	minHeight:				0
    }
  };

  $.layout.optionsMap = {
    // layout/global options - NOT pane-options
    layout: ("name,instanceKey,stateManagement,effects,inset,zIndexes,errors,"
    +	"zIndex,scrollToBookmarkOnLoad,showErrorMessages,maskPanesEarly,"
    +	"outset,resizeWithWindow,resizeWithWindowDelay,resizeWithWindowMaxDelay,"
    +	"onresizeall,onresizeall_start,onresizeall_end,onload,onload_start,onload_end,onunload,onunload_start,onunload_end").split(",")
//	borderPanes: [ ALL options that are NOT specified as 'layout' ]
    // default.panes options that apply to the center-pane (most options apply _only_ to border-panes)
    ,	center: ("paneClass,contentSelector,contentIgnoreSelector,findNestedContent,applyDemoStyles,triggerEventsOnLoad,"
    +	"showOverflowOnHover,maskContents,maskObjects,liveContentResizing,"
    +	"containerSelector,children,initChildren,resizeChildren,destroyChildren,"
    +	"onresize,onresize_start,onresize_end,onsizecontent,onsizecontent_start,onsizecontent_end").split(",")
    // options that MUST be specifically set 'per-pane' - CANNOT set in the panes (defaults) key
    ,	noDefault: ("paneSelector,resizerCursor,customHotkey").split(",")
  };

  /**
   * Processes options passed in converts flat-format data into subkey (JSON) format
   * In flat-format, subkeys are _currently_ separated with 2 underscores, like north__optName
   * Plugins may also call this method so they can transform their own data
   *
   * @param  {!Object}	hash			Data/options passed by user - may be a single level or nested levels
   * @param  {boolean=}	[addKeys=false]	Should the primary layout.options keys be added if they do not exist?
   * @return {Object}						Returns hash of minWidth & minHeight
   */
  $.layout.transformData = function (hash, addKeys) {
    var	json = addKeys ? { panes: {}, center: {} } : {} // init return object
      ,	branch, optKey, keys, key, val, i, c;

    if (typeof hash !== "object") return json; // no options passed

    // convert all 'flat-keys' to 'sub-key' format
    for (optKey in hash) {
      branch	= json;
      val		= hash[ optKey ];
      keys	= optKey.split("__"); // eg: west__size or north__fxSettings__duration
      c		= keys.length - 1;
      // convert underscore-delimited to subkeys
      for (i=0; i <= c; i++) {
        key = keys[i];
        if (i === c) {	// last key = value
          if ($.isPlainObject( val ))
            branch[key] = $.layout.transformData( val ); // RECURSE
          else
            branch[key] = val;
        }
        else {
          if (!branch[key])
            branch[key] = {}; // create the subkey
          // recurse to sub-key for next loop - if not done
          branch = branch[key];
        }
      }
    }
    return json;
  };

// INTERNAL CONFIG DATA - DO NOT CHANGE THIS!
  $.layout.backwardCompatibility = {
    // data used by renameOldOptions()
    map: {
      //	OLD Option Name:			NEW Option Name
      applyDefaultStyles:			"applyDemoStyles"
      //	CHILD/NESTED LAYOUTS
      ,	childOptions:				"children"
      ,	initChildLayout:			"initChildren"
      ,	destroyChildLayout:			"destroyChildren"
      ,	resizeChildLayout:			"resizeChildren"
      ,	resizeNestedLayout:			"resizeChildren"
      //	MISC Options
      ,	resizeWhileDragging:		"livePaneResizing"
      ,	resizeContentWhileDragging:	"liveContentResizing"
      ,	triggerEventsWhileDragging:	"triggerEventsDuringLiveResize"
      ,	maskIframesOnResize:		"maskContents"
      //	STATE MANAGEMENT
      ,	useStateCookie:				"stateManagement.enabled"
      ,	"cookie.autoLoad":			"stateManagement.autoLoad"
      ,	"cookie.autoSave":			"stateManagement.autoSave"
      ,	"cookie.keys":				"stateManagement.stateKeys"
      ,	"cookie.name":				"stateManagement.cookie.name"
      ,	"cookie.domain":			"stateManagement.cookie.domain"
      ,	"cookie.path":				"stateManagement.cookie.path"
      ,	"cookie.expires":			"stateManagement.cookie.expires"
      ,	"cookie.secure":			"stateManagement.cookie.secure"
      //	OLD Language options
      ,	noRoomToOpenTip:			"tips.noRoomToOpen"
      ,	togglerTip_open:			"tips.Close"	// open   = Close
      ,	togglerTip_closed:			"tips.Open"		// closed = Open
      ,	resizerTip:					"tips.Resize"
      ,	sliderTip:					"tips.Slide"
    }

    /**
     * @param {Object}	opts
     */
    ,	renameOptions: function (opts) {
      var map = $.layout.backwardCompatibility.map
        ,	oldData, newData, value
      ;
      for (var itemPath in map) {
        oldData	= getBranch( itemPath );
        value	= oldData.branch[ oldData.key ];
        if (value !== undefined) {
          newData = getBranch( map[itemPath], true );
          newData.branch[ newData.key ] = value;
          delete oldData.branch[ oldData.key ];
        }
      }

      /**
       * @param {string}	path
       * @param {boolean=}	[create=false]	Create path if does not exist
       */
      function getBranch (path, create) {
        var a = path.split(".") // split keys into array
          ,	c = a.length - 1
          ,	D = { branch: opts, key: a[c] } // init branch at top & set key (last item)
          ,	i = 0, k, undef;
        for (; i<c; i++) { // skip the last key (data)
          k = a[i];
          if (D.branch[ k ] == undefined) { // child-key does not exist
            if (create) {
              D.branch = D.branch[ k ] = {}; // create child-branch
            }
            else // can't go any farther
              D.branch = {}; // branch is undefined
          }
          else
            D.branch = D.branch[ k ]; // get child-branch
        }
        return D;
      };
    }

    /**
     * @param {Object}	opts
     */
    ,	renameAllOptions: function (opts) {
      var ren = $.layout.backwardCompatibility.renameOptions;
      // rename root (layout) options
      ren( opts );
      // rename 'defaults' to 'panes'
      if (opts.defaults) {
        if (typeof opts.panes !== "object")
          opts.panes = {};
        $.extend(true, opts.panes, opts.defaults);
        delete opts.defaults;
      }
      // rename options in the the options.panes key
      if (opts.panes) ren( opts.panes );
      // rename options inside *each pane key*, eg: options.west
      $.each($.layout.config.allPanes, function (i, pane) {
        if (opts[pane]) ren( opts[pane] );
      });
      return opts;
    }
  };




  /*	============================================================
   *	BEGIN WIDGET: $( selector ).layout( {options} );
   *	============================================================
   */
  $.fn.layout = function (opts) {
    var

      // local aliases to global data
      browser	= $.layout.browser
      ,	_c		= $.layout.config

      // local aliases to utlity methods
      ,	cssW	= $.layout.cssWidth
      ,	cssH	= $.layout.cssHeight
      ,	elDims	= $.layout.getElementDimensions
      ,	styles	= $.layout.getElementStyles
      ,	evtObj	= $.layout.getEventObject
      ,	evtPane	= $.layout.parsePaneName

      /**
       * options - populated by initOptions()
       */
      ,	options = $.extend(true, {}, $.layout.defaults)
      ,	effects	= options.effects = $.extend(true, {}, $.layout.effects)

      /**
       * layout-state object
       */
      ,	state = {
        // generate unique ID to use for event.namespace so can unbind only events added by 'this layout'
        id:				"layout"+ $.now()	// code uses alias: sID
        ,	initialized:	false
        ,	paneResizing:	false
        ,	panesSliding:	{}
        ,	container:	{ 	// list all keys referenced in code to avoid compiler error msgs
          innerWidth:		0
          ,	innerHeight:	0
          ,	outerWidth:		0
          ,	outerHeight:	0
          ,	layoutWidth:	0
          ,	layoutHeight:	0
        }
        ,	north:		{ childIdx: 0 }
        ,	south:		{ childIdx: 0 }
        ,	east:		{ childIdx: 0 }
        ,	west:		{ childIdx: 0 }
        ,	center:		{ childIdx: 0 }
      }

      /**
       * parent/child-layout pointers
       */
//,	hasParentLayout	= false	- exists ONLY inside Instance so can be set externally
      ,	children = {
        north:		null
        ,	south:		null
        ,	east:		null
        ,	west:		null
        ,	center:		null
      }

      /*
       * ###########################
       *  INTERNAL HELPER FUNCTIONS
       * ###########################
       */

      /**
       * Manages all internal timers
       */
      ,	timer = {
        data:	{}
        ,	set:	function (s, fn, ms) { timer.clear(s); timer.data[s] = setTimeout(fn, ms); }
        ,	clear:	function (s) { var t=timer.data; if (t[s]) {clearTimeout(t[s]); delete t[s];} }
      }

      /**
       * Alert or console.log a message - IF option is enabled.
       *
       * @param {(string|!Object)}	msg				Message (or debug-data) to display
       * @param {boolean=}			[popup=false]	True by default, means 'alert', false means use console.log
       * @param {boolean=}			[debug=false]	True means is a widget debugging message
       */
      ,	_log = function (msg, popup, debug) {
        var o = options;
        if ((o.showErrorMessages && !debug) || (debug && o.showDebugMessages))
          $.layout.msg( o.name +' / '+ msg, (popup !== false) );
        return false;
      }

      /**
       * Executes a Callback function after a trigger event, like resize, open or close
       *
       * @param {string}				evtName					Name of the layout callback, eg "onresize_start"
       * @param {(string|boolean)=}	[pane=""]				This is passed only so we can pass the 'pane object' to the callback
       * @param {(string|boolean)=}	[skipBoundEvents=false]	True = do not run events bound to the elements - only the callbacks set in options
       */
      ,	_runCallbacks = function (evtName, pane, skipBoundEvents) {
        var	hasPane	= pane && isStr(pane)
          ,	s		= hasPane ? state[pane] : state
          ,	o		= hasPane ? options[pane] : options
          ,	lName	= options.name
          // names like onopen and onopen_end separate are interchangeable in options...
          ,	lng		= evtName + (evtName.match(/_/) ? "" : "_end")
          ,	shrt	= lng.match(/_end$/) ? lng.substr(0, lng.length - 4) : ""
          ,	fn		= o[lng] || o[shrt]
          ,	retVal	= "NC" // NC = No Callback
          ,	args	= []
          ,	$P		= hasPane ? $Ps[pane] : 0
        ;
        if (hasPane && !$P) // a pane is specified, but does not exist!
          return retVal;
        if ( !hasPane && $.type(pane) === "boolean" ) {
          skipBoundEvents = pane; // allow pane param to be skipped for Layout callback
          pane = "";
        }

        // first trigger the callback set in the options
        if (fn) {
          try {
            // convert function name (string) to function object
            if (isStr( fn )) {
              if (fn.match(/,/)) {
                // function name cannot contain a comma,
                // so must be a function name AND a parameter to pass
                args = fn.split(",")
                  ,	fn = eval(args[0]);
              }
              else // just the name of an external function?
                fn = eval(fn);
            }
            // execute the callback, if exists
            if ($.isFunction( fn )) {
              if (args.length)
                retVal = g(fn)(args[1]); // pass the argument parsed from 'list'
              else if ( hasPane )
              // pass data: pane-name, pane-element, pane-state, pane-options, and layout-name
                retVal = g(fn)( pane, $Ps[pane], s, o, lName );
              else // must be a layout/container callback - pass suitable info
                retVal = g(fn)( Instance, s, o, lName );
            }
          }
          catch (ex) {
            _log( options.errors.callbackError.replace(/EVENT/, $.trim((pane || "") +" "+ lng)), false );
            if ($.type(ex) === "string" && string.length)
              _log("Exception:  "+ ex, false );
          }
        }

        // trigger additional events bound directly to the pane
        if (!skipBoundEvents && retVal !== false) {
          if ( hasPane ) { // PANE events can be bound to each pane-elements
            o	= options[pane];
            s	= state[pane];
            $P.triggerHandler("layoutpane"+ lng, [ pane, $P, s, o, lName ]);
            if (shrt)
              $P.triggerHandler("layoutpane"+ shrt, [ pane, $P, s, o, lName ]);
          }
          else { // LAYOUT events can be bound to the container-element
            $N.triggerHandler("layout"+ lng, [ Instance, s, o, lName ]);
            if (shrt)
              $N.triggerHandler("layout"+ shrt, [ Instance, s, o, lName ]);
          }
        }

        // ALWAYS resizeChildren after an onresize_end event - even during initialization
        // IGNORE onsizecontent_end event because causes child-layouts to resize TWICE
        if (hasPane && evtName === "onresize_end") // BAD: || evtName === "onsizecontent_end"
          resizeChildren(pane+"", true); // compiler hack -force string

        return retVal;

        function g (f) { return f; }; // compiler hack
      }


      /**
       * cure iframe display issues in IE & other browsers
       */
      ,	_fixIframe = function (pane) {
        if (browser.mozilla) return; // skip FireFox - it auto-refreshes iframes onShow
        var $P = $Ps[pane];
        // if the 'pane' is an iframe, do it
        if (state[pane].tagName === "IFRAME")
          $P.css(_c.hidden).css(_c.visible);
        else // ditto for any iframes INSIDE the pane
          $P.find('IFRAME').css(_c.hidden).css(_c.visible);
      }

      /**
       * @param  {string}		pane		Can accept ONLY a 'pane' (east, west, etc)
       * @param  {number=}		outerSize	(optional) Can pass a width, allowing calculations BEFORE element is resized
       * @return {number}		Returns the innerHeight/Width of el by subtracting padding and borders
       */
      ,	cssSize = function (pane, outerSize) {
        var fn = _c[pane].dir=="horz" ? cssH : cssW;
        return fn($Ps[pane], outerSize);
      }

      /**
       * @param  {string}		pane		Can accept ONLY a 'pane' (east, west, etc)
       * @return {Object}		Returns hash of minWidth & minHeight
       */
      ,	cssMinDims = function (pane) {
        // minWidth/Height means CSS width/height = 1px
        var	$P	= $Ps[pane]
          ,	dir	= _c[pane].dir
          ,	d	= {
            minWidth:	1001 - cssW($P, 1000)
            ,	minHeight:	1001 - cssH($P, 1000)
          }
        ;
        if (dir === "horz") d.minSize = d.minHeight;
        if (dir === "vert") d.minSize = d.minWidth;
        return d;
      }

      // TODO: see if these methods can be made more useful...
      // TODO: *maybe* return cssW/H from these so caller can use this info

      /**
       * @param {(string|!Object)}		el
       * @param {number=}				outerWidth
       * @param {boolean=}				[autoHide=false]
       */
      ,	setOuterWidth = function (el, outerWidth, autoHide) {
        var $E = el, w;
        if (isStr(el)) $E = $Ps[el]; // west
        else if (!el.jquery) $E = $(el);
        w = cssW($E, outerWidth);
        $E.css({ width: w });
        if (w > 0) {
          if (autoHide && $E.data('autoHidden') && $E.innerHeight() > 0) {
            $E.show().data('autoHidden', false);
            if (!browser.mozilla) // FireFox refreshes iframes - IE does not
            // make hidden, then visible to 'refresh' display after animation
              $E.css(_c.hidden).css(_c.visible);
          }
        }
        else if (autoHide && !$E.data('autoHidden'))
          $E.hide().data('autoHidden', true);
      }

      /**
       * @param {(string|!Object)}		el
       * @param {number=}				outerHeight
       * @param {boolean=}				[autoHide=false]
       */
      ,	setOuterHeight = function (el, outerHeight, autoHide) {
        var $E = el, h;
        if (isStr(el)) $E = $Ps[el]; // west
        else if (!el.jquery) $E = $(el);
        h = cssH($E, outerHeight);
        $E.css({ height: h, visibility: "visible" }); // may have been 'hidden' by sizeContent
        if (h > 0 && $E.innerWidth() > 0) {
          if (autoHide && $E.data('autoHidden')) {
            $E.show().data('autoHidden', false);
            if (!browser.mozilla) // FireFox refreshes iframes - IE does not
              $E.css(_c.hidden).css(_c.visible);
          }
        }
        else if (autoHide && !$E.data('autoHidden'))
          $E.hide().data('autoHidden', true);
      }


      /**
       * Converts any 'size' params to a pixel/integer size, if not already
       * If 'auto' or a decimal/percentage is passed as 'size', a pixel-size is calculated
       *
       /**
       * @param  {string}				pane
       * @param  {(string|number)=}	size
       * @param  {string=}				[dir]
       * @return {number}
       */
      ,	_parseSize = function (pane, size, dir) {
        if (!dir) dir = _c[pane].dir;

        if (isStr(size) && size.match(/%/))
          size = (size === '100%') ? -1 : parseInt(size, 10) / 100; // convert % to decimal

        if (size === 0)
          return 0;
        else if (size >= 1)
          return parseInt(size, 10);

        var o = options, avail = 0;
        if (dir=="horz") // north or south or center.minHeight
          avail = sC.innerHeight - ($Ps.north ? o.north.spacing_open : 0) - ($Ps.south ? o.south.spacing_open : 0);
        else if (dir=="vert") // east or west or center.minWidth
          avail = sC.innerWidth - ($Ps.west ? o.west.spacing_open : 0) - ($Ps.east ? o.east.spacing_open : 0);

        if (size === -1) // -1 == 100%
          return avail;
        else if (size > 0) // percentage, eg: .25
          return round(avail * size);
        else if (pane=="center")
          return 0;
        else { // size < 0 || size=='auto' || size==Missing || size==Invalid
          // auto-size the pane
          var	dim	= (dir === "horz" ? "height" : "width")
            ,	$P	= $Ps[pane]
            ,	$C	= dim === 'height' ? $Cs[pane] : false
            ,	vis	= $.layout.showInvisibly($P) // show pane invisibly if hidden
            ,	szP	= $P.css(dim) // SAVE current pane size
            ,	szC	= $C ? $C.css(dim) : 0 // SAVE current content size
          ;
          $P.css(dim, "auto");
          if ($C) $C.css(dim, "auto");
          size = (dim === "height") ? $P.outerHeight() : $P.outerWidth(); // MEASURE
          $P.css(dim, szP).css(vis); // RESET size & visibility
          if ($C) $C.css(dim, szC);
          return size;
        }
      }

      /**
       * Calculates current 'size' (outer-width or outer-height) of a border-pane - optionally with 'pane-spacing' added
       *
       * @param  {(string|!Object)}	pane
       * @param  {boolean=}			[inclSpace=false]
       * @return {number}				Returns EITHER Width for east/west panes OR Height for north/south panes
       */
      ,	getPaneSize = function (pane, inclSpace) {
        var
          $P	= $Ps[pane]
          ,	o	= options[pane]
          ,	s	= state[pane]
          ,	oSp	= (inclSpace ? o.spacing_open : 0)
          ,	cSp	= (inclSpace ? o.spacing_closed : 0)
        ;
        if (!$P || s.isHidden)
          return 0;
        else if (s.isClosed || (s.isSliding && inclSpace))
          return cSp;
        else if (_c[pane].dir === "horz")
          return $P.outerHeight() + oSp;
        else // dir === "vert"
          return $P.outerWidth() + oSp;
      }

      /**
       * Calculate min/max pane dimensions and limits for resizing
       *
       * @param  {string}		pane
       * @param  {boolean=}	[slide=false]
       */
      ,	setSizeLimits = function (pane, slide) {
        if (!isInitialized()) return;
        var
          o				= options[pane]
          ,	s				= state[pane]
          ,	c				= _c[pane]
          ,	dir				= c.dir
          ,	type			= c.sizeType.toLowerCase()
          ,	isSliding		= (slide != undefined ? slide : s.isSliding) // only open() passes 'slide' param
          ,	$P				= $Ps[pane]
          ,	paneSpacing		= o.spacing_open
          //	measure the pane on the *opposite side* from this pane
          ,	altPane			= _c.oppositeEdge[pane]
          ,	altS			= state[altPane]
          ,	$altP			= $Ps[altPane]
          ,	altPaneSize		= (!$altP || altS.isVisible===false || altS.isSliding ? 0 : (dir=="horz" ? $altP.outerHeight() : $altP.outerWidth()))
          ,	altPaneSpacing	= ((!$altP || altS.isHidden ? 0 : options[altPane][ altS.isClosed !== false ? "spacing_closed" : "spacing_open" ]) || 0)
          //	limitSize prevents this pane from 'overlapping' opposite pane
          ,	containerSize	= (dir=="horz" ? sC.innerHeight : sC.innerWidth)
          ,	minCenterDims	= cssMinDims("center")
          ,	minCenterSize	= dir=="horz" ? max(options.center.minHeight, minCenterDims.minHeight) : max(options.center.minWidth, minCenterDims.minWidth)
          //	if pane is 'sliding', then ignore center and alt-pane sizes - because 'overlays' them
          ,	limitSize		= (containerSize - paneSpacing - (isSliding ? 0 : (_parseSize("center", minCenterSize, dir) + altPaneSize + altPaneSpacing)))
          ,	minSize			= s.minSize = max( _parseSize(pane, o.minSize), cssMinDims(pane).minSize )
          ,	maxSize			= s.maxSize = min( (o.maxSize ? _parseSize(pane, o.maxSize) : 100000), limitSize )
          ,	r				= s.resizerPosition = {} // used to set resizing limits
          ,	top				= sC.inset.top
          ,	left			= sC.inset.left
          ,	W				= sC.innerWidth
          ,	H				= sC.innerHeight
          ,	rW				= o.spacing_open // subtract resizer-width to get top/left position for south/east
        ;
        switch (pane) {
          case "north":	r.min = top + minSize;
            r.max = top + maxSize;
            break;
          case "west":	r.min = left + minSize;
            r.max = left + maxSize;
            break;
          case "south":	r.min = top + H - maxSize - rW;
            r.max = top + H - minSize - rW;
            break;
          case "east":	r.min = left + W - maxSize - rW;
            r.max = left + W - minSize - rW;
            break;
        };
      }

      /**
       * Returns data for setting the size/position of center pane. Also used to set Height for east/west panes
       *
       * @return JSON  Returns a hash of all dimensions: top, bottom, left, right, (outer) width and (outer) height
       */
      ,	calcNewCenterPaneDims = function () {
        var d = {
          top:	getPaneSize("north", true) // true = include 'spacing' value for pane
          ,	bottom:	getPaneSize("south", true)
          ,	left:	getPaneSize("west", true)
          ,	right:	getPaneSize("east", true)
          ,	width:	0
          ,	height:	0
        };

        // NOTE: sC = state.container
        // calc center-pane outer dimensions
        d.width		= sC.innerWidth - d.left - d.right;  // outerWidth
        d.height	= sC.innerHeight - d.bottom - d.top; // outerHeight
        // add the 'container border/padding' to get final positions relative to the container
        d.top		+= sC.inset.top;
        d.bottom	+= sC.inset.bottom;
        d.left		+= sC.inset.left;
        d.right		+= sC.inset.right;

        return d;
      }


      /**
       * @param {!Object}		el
       * @param {boolean=}		[allStates=false]
       */
      ,	getHoverClasses = function (el, allStates) {
        var
          $El		= $(el)
          ,	type	= $El.data("layoutRole")
          ,	pane	= $El.data("layoutEdge")
          ,	o		= options[pane]
          ,	root	= o[type +"Class"]
          ,	_pane	= "-"+ pane // eg: "-west"
          ,	_open	= "-open"
          ,	_closed	= "-closed"
          ,	_slide	= "-sliding"
          ,	_hover	= "-hover " // NOTE the trailing space
          ,	_state	= $El.hasClass(root+_closed) ? _closed : _open
          ,	_alt	= _state === _closed ? _open : _closed
          ,	classes = (root+_hover) + (root+_pane+_hover) + (root+_state+_hover) + (root+_pane+_state+_hover)
        ;
        if (allStates) // when 'removing' classes, also remove alternate-state classes
          classes += (root+_alt+_hover) + (root+_pane+_alt+_hover);

        if (type=="resizer" && $El.hasClass(root+_slide))
          classes += (root+_slide+_hover) + (root+_pane+_slide+_hover);

        return $.trim(classes);
      }
      ,	addHover	= function (evt, el) {
        var $E = $(el || this);
        if (evt && $E.data("layoutRole") === "toggler")
          evt.stopPropagation(); // prevent triggering 'slide' on Resizer-bar
        $E.addClass( getHoverClasses($E) );
      }
      ,	removeHover	= function (evt, el) {
        var $E = $(el || this);
        $E.removeClass( getHoverClasses($E, true) );
      }

      ,	onResizerEnter	= function (evt) { // ALSO called by toggler.mouseenter
        var pane	= $(this).data("layoutEdge")
          ,	s		= state[pane]
          ,	$d		= $(document)
        ;
        // ignore closed-panes and mouse moving back & forth over resizer!
        // also ignore if ANY pane is currently resizing
        if ( s.isResizing || state.paneResizing ) return;

        if (options.maskPanesEarly)
          showMasks( pane, { resizing: true });
      }
      ,	onResizerLeave	= function (evt, el) {
        var	e		= el || this // el is only passed when called by the timer
          ,	pane	= $(e).data("layoutEdge")
          ,	name	= pane +"ResizerLeave"
          ,	$d		= $(document)
        ;
        timer.clear(pane+"_openSlider"); // cancel slideOpen timer, if set
        timer.clear(name); // cancel enableSelection timer - may re/set below
        // this method calls itself on a timer because it needs to allow
        // enough time for dragging to kick-in and set the isResizing flag
        // dragging has a 100ms delay set, so this delay must be >100
        if (!el) // 1st call - mouseleave event
          timer.set(name, function(){ onResizerLeave(evt, e); }, 200);
        // if user is resizing, dragStop will reset everything, so skip it here
        else if (options.maskPanesEarly && !state.paneResizing) // 2nd call - by timer
          hideMasks();
      }

      /*
       * ###########################
       *   INITIALIZATION METHODS
       * ###########################
       */

      /**
       * Initialize the layout - called automatically whenever an instance of layout is created
       *
       * @see  none - triggered onInit
       * @return  mixed	true = fully initialized | false = panes not initialized (yet) | 'cancel' = abort
       */
      ,	_create = function () {
        // initialize config/options
        initOptions();
        var o = options
          ,	s = state;

        // TEMP state so isInitialized returns true during init process
        s.creatingLayout = true;

        // init plugins for this layout, if there are any (eg: stateManagement)
        runPluginCallbacks( Instance, $.layout.onCreate );

        // options & state have been initialized, so now run beforeLoad callback
        // onload will CANCEL layout creation if it returns false
        if (false === _runCallbacks("onload_start"))
          return 'cancel';

        // initialize the container element
        _initContainer();

        // bind hotkey function - keyDown - if required
        initHotkeys();

        // bind window.onunload
        $(window).bind("unload."+ sID, unload);

        // init plugins for this layout, if there are any (eg: customButtons)
        runPluginCallbacks( Instance, $.layout.onLoad );

        // if layout elements are hidden, then layout WILL NOT complete initialization!
        // initLayoutElements will set initialized=true and run the onload callback IF successful
        if (o.initPanes) _initLayoutElements();

        delete s.creatingLayout;

        return state.initialized;
      }

      /**
       * Initialize the layout IF not already
       *
       * @see  All methods in Instance run this test
       * @return  boolean	true = layoutElements have been initialized | false = panes are not initialized (yet)
       */
      ,	isInitialized = function () {
        if (state.initialized || state.creatingLayout) return true;	// already initialized
        else return _initLayoutElements();	// try to init panes NOW
      }

      /**
       * Initialize the layout - called automatically whenever an instance of layout is created
       *
       * @see  _create() & isInitialized
       * @param {boolean=}		[retry=false]	// indicates this is a 2nd try
       * @return  An object pointer to the instance created
       */
      ,	_initLayoutElements = function (retry) {
        // initialize config/options
        var o = options;
        // CANNOT init panes inside a hidden container!
        if (!$N.is(":visible")) {
          // handle Chrome bug where popup window 'has no height'
          // if layout is BODY element, try again in 50ms
          // SEE: http://layout.jquery-dev.com/samples/test_popup_window.html
          if ( !retry && browser.webkit && $N[0].tagName === "BODY" )
            setTimeout(function(){ _initLayoutElements(true); }, 50);
          return false;
        }

        // a center pane is required, so make sure it exists
        if (!getPane("center").length) {
          return _log( o.errors.centerPaneMissing );
        }

        // TEMP state so isInitialized returns true during init process
        state.creatingLayout = true;

        // update Container dims
        $.extend(sC, elDims( $N, o.inset )); // passing inset means DO NOT include insetX values

        // initialize all layout elements
        initPanes();	// size & position panes - calls initHandles() - which calls initResizable()

        if (o.scrollToBookmarkOnLoad) {
          var l = self.location;
          if (l.hash) l.replace( l.hash ); // scrollTo Bookmark
        }

        // check to see if this layout 'nested' inside a pane
        if (Instance.hasParentLayout)
          o.resizeWithWindow = false;
        // bind resizeAll() for 'this layout instance' to window.resize event
        else if (o.resizeWithWindow)
          $(window).bind("resize."+ sID, windowResize);

        delete state.creatingLayout;
        state.initialized = true;

        // init plugins for this layout, if there are any
        runPluginCallbacks( Instance, $.layout.onReady );

        // now run the onload callback, if exists
        _runCallbacks("onload_end");

        return true; // elements initialized successfully
      }

      /**
       * Initialize nested layouts for a specific pane - can optionally pass layout-options
       *
       * @param {(string|Object)}	evt_or_pane	The pane being opened, ie: north, south, east, or west
       * @param {Object=}			[opts]		Layout-options - if passed, will OVERRRIDE options[pane].children
       * @return  An object pointer to the layout instance created - or null
       */
      ,	createChildren = function (evt_or_pane, opts) {
        var	pane = evtPane.call(this, evt_or_pane)
          ,	$P	= $Ps[pane]
        ;
        if (!$P) return;
        var	$C	= $Cs[pane]
          ,	s	= state[pane]
          ,	o	= options[pane]
          ,	sm	= options.stateManagement || {}
          ,	cos = opts ? (o.children = opts) : o.children
        ;
        if ( $.isPlainObject( cos ) )
          cos = [ cos ]; // convert a hash to a 1-elem array
        else if (!cos || !$.isArray( cos ))
          return;

        $.each( cos, function (idx, co) {
          if ( !$.isPlainObject( co ) ) return;

          // determine which element is supposed to be the 'child container'
          // if pane has a 'containerSelector' OR a 'content-div', use those instead of the pane
          var $containers = co.containerSelector ? $P.find( co.containerSelector ) : ($C || $P);

          $containers.each(function(){
            var $cont	= $(this)
              ,	child	= $cont.data("layout") //	see if a child-layout ALREADY exists on this element
            ;
            // if no layout exists, but children are set, try to create the layout now
            if (!child) {
              // TODO: see about moving this to the stateManagement plugin, as a method
              // set a unique child-instance key for this layout, if not already set
              setInstanceKey({ container: $cont, options: co }, s );
              // If THIS layout has a hash in stateManagement.autoLoad,
              // then see if it also contains state-data for this child-layout
              // If so, copy the stateData to child.options.stateManagement.autoLoad
              if ( sm.includeChildren && state.stateData[pane] ) {
                //	THIS layout's state was cached when its state was loaded
                var	paneChildren = state.stateData[pane].children || {}
                  ,	childState	= paneChildren[ co.instanceKey ]
                  ,	co_sm		= co.stateManagement || (co.stateManagement = { autoLoad: true })
                ;
                // COPY the stateData into the autoLoad key
                if ( co_sm.autoLoad === true && childState ) {
                  co_sm.autoSave			= false; // disable autoSave because saving handled by parent-layout
                  co_sm.includeChildren	= true;  // cascade option - FOR NOW
                  co_sm.autoLoad = $.extend(true, {}, childState); // COPY the state-hash
                }
              }

              // create the layout
              child = $cont.layout( co );

              // if successful, update data
              if (child) {
                // add the child and update all layout-pointers
                // MAY have already been done by child-layout calling parent.refreshChildren()
                refreshChildren( pane, child );
              }
            }
          });
        });
      }

      ,	setInstanceKey = function (child, parentPaneState) {
        // create a named key for use in state and instance branches
        var	$c	= child.container
          ,	o	= child.options
          ,	sm	= o.stateManagement
          ,	key	= o.instanceKey || $c.data("layoutInstanceKey")
        ;
        if (!key) key = (sm && sm.cookie ? sm.cookie.name : '') || o.name; // look for a name/key
        if (!key) key = "layout"+ (++parentPaneState.childIdx);	// if no name/key found, generate one
        else key = key.replace(/[^\w-]/gi, '_').replace(/_{2,}/g, '_');	 // ensure is valid as a hash key
        o.instanceKey = key;
        $c.data("layoutInstanceKey", key); // useful if layout is destroyed and then recreated
        return key;
      }

      /**
       * @param {string}		pane		The pane being opened, ie: north, south, east, or west
       * @param {Object=}		newChild	New child-layout Instance to add to this pane
       */
      ,	refreshChildren = function (pane, newChild) {
        var	$P	= $Ps[pane]
          ,	pC	= children[pane]
          ,	s	= state[pane]
          ,	o
        ;
        // check for destroy()ed layouts and update the child pointers & arrays
        if ($.isPlainObject( pC )) {
          $.each( pC, function (key, child) {
            if (child.destroyed) delete pC[key]
          });
          // if no more children, remove the children hash
          if ($.isEmptyObject( pC ))
            pC = children[pane] = null; // clear children hash
        }

        // see if there is a directly-nested layout inside this pane
        // if there is, then there can be only ONE child-layout, so check that...
        if (!newChild && !pC) {
          newChild = $P.data("layout");
        }

        // if a newChild instance was passed, add it to children[pane]
        if (newChild) {
          // update child.state
          newChild.hasParentLayout = true; // set parent-flag in child
          // instanceKey is a key-name used in both state and children
          o = newChild.options;
          // set a unique child-instance key for this layout, if not already set
          setInstanceKey( newChild, s );
          // add pointer to pane.children hash
          if (!pC) pC = children[pane] = {}; // create an empty children hash
          pC[ o.instanceKey ] = newChild.container.data("layout"); // add childLayout instance
        }

        // ALWAYS refresh the pane.children alias, even if null
        Instance[pane].children = children[pane];

        // if newChild was NOT passed - see if there is a child layout NOW
        if (!newChild) {
          createChildren(pane); // MAY create a child and re-call this method
        }
      }

      ,	windowResize = function () {
        var	o = options
          ,	delay = Number(o.resizeWithWindowDelay);
        if (delay < 10) delay = 100; // MUST have a delay!
        // resizing uses a delay-loop because the resize event fires repeatly - except in FF, but delay anyway
        timer.clear("winResize"); // if already running
        timer.set("winResize", function(){
          timer.clear("winResize");
          timer.clear("winResizeRepeater");
          var dims = elDims( $N, o.inset );
          // only trigger resizeAll() if container has changed size
          if (dims.innerWidth !== sC.innerWidth || dims.innerHeight !== sC.innerHeight)
            resizeAll();
        }, delay);
        // ALSO set fixed-delay timer, if not already running
        if (!timer.data["winResizeRepeater"]) setWindowResizeRepeater();
      }

      ,	setWindowResizeRepeater = function () {
        var delay = Number(options.resizeWithWindowMaxDelay);
        if (delay > 0)
          timer.set("winResizeRepeater", function(){ setWindowResizeRepeater(); resizeAll(); }, delay);
      }

      ,	unload = function () {
        var o = options;

        _runCallbacks("onunload_start");

        // trigger plugin callabacks for this layout (eg: stateManagement)
        runPluginCallbacks( Instance, $.layout.onUnload );

        _runCallbacks("onunload_end");
      }

      /**
       * Validate and initialize container CSS and events
       *
       * @see  _create()
       */
      ,	_initContainer = function () {
        var
          N		= $N[0]
          ,	$H		= $("html")
          ,	tag		= sC.tagName = N.tagName
          ,	id		= sC.id = N.id
          ,	cls		= sC.className = N.className
          ,	o		= options
          ,	name	= o.name
          ,	props	= "position,margin,padding,border"
          ,	css		= "layoutCSS"
          ,	CSS		= {}
          ,	hid		= "hidden" // used A LOT!
          //	see if this container is a 'pane' inside an outer-layout
          ,	parent	= $N.data("parentLayout")	// parent-layout Instance
          ,	pane	= $N.data("layoutEdge")		// pane-name in parent-layout
          ,	isChild	= parent && pane
          ,	num		= $.layout.cssNum
          ,	$parent, n
        ;
        // sC = state.container
        //sC.selector = $N.selector.split(".slice")[0];
        sC.ref		= (o.name ? o.name +' layout / ' : '') + tag + (id ? "#"+id : cls ? '.['+cls+']' : ''); // used in messages
        sC.isBody	= (tag === "BODY");

        // try to find a parent-layout
        if (!isChild && !sC.isBody) {
          $parent = $N.closest("."+ $.layout.defaults.panes.paneClass);
          parent	= $parent.data("parentLayout");
          pane	= $parent.data("layoutEdge");
          isChild	= parent && pane;
        }

        $N	.data({
          layout: Instance
          ,	layoutContainer: sID // FLAG to indicate this is a layout-container - contains unique internal ID
        })
          .addClass(o.containerClass)
        ;
        var layoutMethods = {
          destroy:	''
          ,	initPanes:	''
          ,	resizeAll:	'resizeAll'
          ,	resize:		'resizeAll'
        };
        // loop hash and bind all methods - include layoutID namespacing
        for (name in layoutMethods) {
          $N.bind("layout"+ name.toLowerCase() +"."+ sID, Instance[ layoutMethods[name] || name ]);
        }

        // if this container is another layout's 'pane', then set child/parent pointers
        if (isChild) {
          // update parent flag
          Instance.hasParentLayout = true;
          // set pointers to THIS child-layout (Instance) in parent-layout
          parent.refreshChildren( pane, Instance );
        }

        // SAVE original container CSS for use in destroy()
        if (!$N.data(css)) {
          // handle props like overflow different for BODY & HTML - has 'system default' values
          if (sC.isBody) {
            // SAVE <BODY> CSS
            $N.data(css, $.extend( styles($N, props), {
              height:		$N.css("height")
              ,	overflow:	$N.css("overflow")
              ,	overflowX:	$N.css("overflowX")
              ,	overflowY:	$N.css("overflowY")
            }));
            // ALSO SAVE <HTML> CSS
            $H.data(css, $.extend( styles($H, 'padding'), {
              height:		"auto" // FF would return a fixed px-size!
              ,	overflow:	$H.css("overflow")
              ,	overflowX:	$H.css("overflowX")
              ,	overflowY:	$H.css("overflowY")
            }));
          }
          else // handle props normally for non-body elements
            $N.data(css, styles($N, props+",top,bottom,left,right,width,height,overflow,overflowX,overflowY") );
        }

        try {
          // common container CSS
          CSS = {
            overflow:	hid
            ,	overflowX:	hid
            ,	overflowY:	hid
          };
          $N.css( CSS );

          if (o.inset && !$.isPlainObject(o.inset)) {
            // can specify a single number for equal outset all-around
            n = parseInt(o.inset, 10) || 0
            o.inset = {
              top:	n
              ,	bottom:	n
              ,	left:	n
              ,	right:	n
            };
          }

          // format html & body if this is a full page layout
          if (sC.isBody) {
            // if HTML has padding, use this as an outer-spacing around BODY
            if (!o.outset) {
              // use padding from parent-elem (HTML) as outset
              o.outset = {
                top:	num($H, "paddingTop")
                ,	bottom:	num($H, "paddingBottom")
                ,	left:	num($H, "paddingLeft")
                ,	right:	num($H, "paddingRight")
              };
            }
            else if (!$.isPlainObject(o.outset)) {
              // can specify a single number for equal outset all-around
              n = parseInt(o.outset, 10) || 0
              o.outset = {
                top:	n
                ,	bottom:	n
                ,	left:	n
                ,	right:	n
              };
            }
            // HTML
            $H.css( CSS ).css({
              height:		"100%"
              ,	border:		"none"	// no border or padding allowed when using height = 100%
              ,	padding:	0		// ditto
              ,	margin:		0
            });
            // BODY
            if (browser.isIE6) {
              // IE6 CANNOT use the trick of setting absolute positioning on all 4 sides - must have 'height'
              $N.css({
                width:		"100%"
                ,	height:		"100%"
                ,	border:		"none"	// no border or padding allowed when using height = 100%
                ,	padding:	0		// ditto
                ,	margin:		0
                ,	position:	"relative"
              });
              // convert body padding to an inset option - the border cannot be measured in IE6!
              if (!o.inset) o.inset = elDims( $N ).inset;
            }
            else { // use absolute positioning for BODY to allow borders & padding without overflow
              $N.css({
                width:		"auto"
                ,	height:		"auto"
                ,	margin:		0
                ,	position:	"absolute"	// allows for border and padding on BODY
              });
              // apply edge-positioning created above
              $N.css( o.outset );
            }
            // set current layout-container dimensions
            $.extend(sC, elDims( $N, o.inset )); // passing inset means DO NOT include insetX values
          }
          else {
            // container MUST have 'position'
            var	p = $N.css("position");
            if (!p || !p.match(/(fixed|absolute|relative)/))
              $N.css("position","relative");

            // set current layout-container dimensions
            if ( $N.is(":visible") ) {
              $.extend(sC, elDims( $N, o.inset )); // passing inset means DO NOT change insetX (padding) values
              if (sC.innerHeight < 1) // container has no 'height' - warn developer
                _log( o.errors.noContainerHeight.replace(/CONTAINER/, sC.ref) );
            }
          }

          // if container has min-width/height, then enable scrollbar(s)
          if ( num($N, "minWidth")  ) $N.parent().css("overflowX","auto");
          if ( num($N, "minHeight") ) $N.parent().css("overflowY","auto");

        } catch (ex) {}
      }

      /**
       * Bind layout hotkeys - if options enabled
       *
       * @see  _create() and addPane()
       * @param {string=}	[panes=""]	The edge(s) to process
       */
      ,	initHotkeys = function (panes) {
        panes = panes ? panes.split(",") : _c.borderPanes;
        // bind keyDown to capture hotkeys, if option enabled for ANY pane
        $.each(panes, function (i, pane) {
          var o = options[pane];
          if (o.enableCursorHotkey || o.customHotkey) {
            $(document).bind("keydown."+ sID, keyDown); // only need to bind this ONCE
            return false; // BREAK - binding was done
          }
        });
      }

      /**
       * Build final OPTIONS data
       *
       * @see  _create()
       */
      ,	initOptions = function () {
        var data, d, pane, key, val, i, c, o;

        // reprocess user's layout-options to have correct options sub-key structure
        opts = $.layout.transformData( opts, true ); // panes = default subkey

        // auto-rename old options for backward compatibility
        opts = $.layout.backwardCompatibility.renameAllOptions( opts );

        // if user-options has 'panes' key (pane-defaults), clean it...
        if (!$.isEmptyObject(opts.panes)) {
          // REMOVE any pane-defaults that MUST be set per-pane
          data = $.layout.optionsMap.noDefault;
          for (i=0, c=data.length; i<c; i++) {
            key = data[i];
            delete opts.panes[key]; // OK if does not exist
          }
          // REMOVE any layout-options specified under opts.panes
          data = $.layout.optionsMap.layout;
          for (i=0, c=data.length; i<c; i++) {
            key = data[i];
            delete opts.panes[key]; // OK if does not exist
          }
        }

        // MOVE any NON-layout-options from opts-root to opts.panes
        data = $.layout.optionsMap.layout;
        var rootKeys = $.layout.config.optionRootKeys;
        for (key in opts) {
          val = opts[key];
          if ($.inArray(key, rootKeys) < 0 && $.inArray(key, data) < 0) {
            if (!opts.panes[key])
              opts.panes[key] = $.isPlainObject(val) ? $.extend(true, {}, val) : val;
            delete opts[key]
          }
        }

        // START by updating ALL options from opts
        $.extend(true, options, opts);

        // CREATE final options (and config) for EACH pane
        $.each(_c.allPanes, function (i, pane) {

          // apply 'pane-defaults' to CONFIG.[PANE]
          _c[pane] = $.extend(true, {}, _c.panes, _c[pane]);

          d = options.panes;
          o = options[pane];

          // center-pane uses SOME keys in defaults.panes branch
          if (pane === 'center') {
            // ONLY copy keys from opts.panes listed in: $.layout.optionsMap.center
            data = $.layout.optionsMap.center;		// list of 'center-pane keys'
            for (i=0, c=data.length; i<c; i++) {	// loop the list...
              key = data[i];
              // only need to use pane-default if pane-specific value not set
              if (!opts.center[key] && (opts.panes[key] || !o[key]))
                o[key] = d[key]; // pane-default
            }
          }
          else {
            // border-panes use ALL keys in defaults.panes branch
            o = options[pane] = $.extend(true, {}, d, o); // re-apply pane-specific opts AFTER pane-defaults
            createFxOptions( pane );
            // ensure all border-pane-specific base-classes exist
            if (!o.resizerClass)	o.resizerClass	= "ui-layout-resizer";
            if (!o.togglerClass)	o.togglerClass	= "ui-layout-toggler";
          }
          // ensure we have base pane-class (ALL panes)
          if (!o.paneClass) o.paneClass = "ui-layout-pane";
        });

        // update options.zIndexes if a zIndex-option specified
        var zo	= opts.zIndex
          ,	z	= options.zIndexes;
        if (zo > 0) {
          z.pane_normal		= zo;
          z.content_mask		= max(zo+1, z.content_mask);	// MIN = +1
          z.resizer_normal	= max(zo+2, z.resizer_normal);	// MIN = +2
        }

        // DELETE 'panes' key now that we are done - values were copied to EACH pane
        delete options.panes;


        function createFxOptions ( pane ) {
          var	o = options[pane]
            ,	d = options.panes;
          // ensure fxSettings key to avoid errors
          if (!o.fxSettings) o.fxSettings = {};
          if (!d.fxSettings) d.fxSettings = {};

          $.each(["_open","_close","_size"], function (i,n) {
            var
              sName		= "fxName"+ n
              ,	sSpeed		= "fxSpeed"+ n
              ,	sSettings	= "fxSettings"+ n
              // recalculate fxName according to specificity rules
              ,	fxName = o[sName] =
                o[sName]	// options.west.fxName_open
                ||	d[sName]	// options.panes.fxName_open
                ||	o.fxName	// options.west.fxName
                ||	d.fxName	// options.panes.fxName
                ||	"none"		// MEANS $.layout.defaults.panes.fxName == "" || false || null || 0
              ,	fxExists	= $.effects && ($.effects[fxName] || ($.effects.effect && $.effects.effect[fxName]))
            ;
            // validate fxName to ensure is valid effect - MUST have effect-config data in options.effects
            if (fxName === "none" || !options.effects[fxName] || !fxExists)
              fxName = o[sName] = "none"; // effect not loaded OR unrecognized fxName

            // set vars for effects subkeys to simplify logic
            var	fx		= options.effects[fxName] || {}	// effects.slide
              ,	fx_all	= fx.all	|| null				// effects.slide.all
              ,	fx_pane	= fx[pane]	|| null				// effects.slide.west
            ;
            // create fxSpeed[_open|_close|_size]
            o[sSpeed] =
              o[sSpeed]				// options.west.fxSpeed_open
              ||	d[sSpeed]				// options.west.fxSpeed_open
              ||	o.fxSpeed				// options.west.fxSpeed
              ||	d.fxSpeed				// options.panes.fxSpeed
              ||	null					// DEFAULT - let fxSetting.duration control speed
            ;
            // create fxSettings[_open|_close|_size]
            o[sSettings] = $.extend(
              true
              ,	{}
              ,	fx_all					// effects.slide.all
              ,	fx_pane					// effects.slide.west
              ,	d.fxSettings			// options.panes.fxSettings
              ,	o.fxSettings			// options.west.fxSettings
              ,	d[sSettings]			// options.panes.fxSettings_open
              ,	o[sSettings]			// options.west.fxSettings_open
            );
          });

          // DONE creating action-specific-settings for this pane,
          // so DELETE generic options - are no longer meaningful
          delete o.fxName;
          delete o.fxSpeed;
          delete o.fxSettings;
        }
      }

      /**
       * Initialize module objects, styling, size and position for all panes
       *
       * @see  _initElements()
       * @param {string}	pane		The pane to process
       */
      ,	getPane = function (pane) {
        var sel = options[pane].paneSelector
        if (sel.substr(0,1)==="#") // ID selector
        // NOTE: elements selected 'by ID' DO NOT have to be 'children'
          return $N.find(sel).eq(0);
        else { // class or other selector
          var $P = $N.children(sel).eq(0);
          // look for the pane nested inside a 'form' element
          return $P.length ? $P : $N.children("form:first").children(sel).eq(0);
        }
      }

      /**
       * @param {Object=}		evt
       */
      ,	initPanes = function (evt) {
        // stopPropagation if called by trigger("layoutinitpanes") - use evtPane utility
        evtPane(evt);

        // NOTE: do north & south FIRST so we can measure their height - do center LAST
        $.each(_c.allPanes, function (idx, pane) {
          addPane( pane, true );
        });

        // init the pane-handles NOW in case we have to hide or close the pane below
        initHandles();

        // now that all panes have been initialized and initially-sized,
        // make sure there is really enough space available for each pane
        $.each(_c.borderPanes, function (i, pane) {
          if ($Ps[pane] && state[pane].isVisible) { // pane is OPEN
            setSizeLimits(pane);
            makePaneFit(pane); // pane may be Closed, Hidden or Resized by makePaneFit()
          }
        });
        // size center-pane AGAIN in case we 'closed' a border-pane in loop above
        sizeMidPanes("center");

        //	Chrome/Webkit sometimes fires callbacks BEFORE it completes resizing!
        //	Before RC30.3, there was a 10ms delay here, but that caused layout
        //	to load asynchrously, which is BAD, so try skipping delay for now

        // process pane contents and callbacks, and init/resize child-layout if exists
        $.each(_c.allPanes, function (idx, pane) {
          afterInitPane(pane);
        });
      }

      /**
       * Add a pane to the layout - subroutine of initPanes()
       *
       * @see  initPanes()
       * @param {string}	pane			The pane to process
       * @param {boolean=}	[force=false]	Size content after init
       */
      ,	addPane = function (pane, force) {
        if ( !force && !isInitialized() ) return;
        var
          o		= options[pane]
          ,	s		= state[pane]
          ,	c		= _c[pane]
          ,	dir		= c.dir
          ,	fx		= s.fx
          ,	spacing	= o.spacing_open || 0
          ,	isCenter = (pane === "center")
          ,	CSS		= {}
          ,	$P		= $Ps[pane]
          ,	size, minSize, maxSize, child
        ;
        // if pane-pointer already exists, remove the old one first
        if ($P)
          removePane( pane, false, true, false );
        else
          $Cs[pane] = false; // init

        $P = $Ps[pane] = getPane(pane);
        if (!$P.length) {
          $Ps[pane] = false; // logic
          return;
        }

        // SAVE original Pane CSS
        if (!$P.data("layoutCSS")) {
          var props = "position,top,left,bottom,right,width,height,overflow,zIndex,display,backgroundColor,padding,margin,border";
          $P.data("layoutCSS", styles($P, props));
        }

        // create alias for pane data in Instance - initHandles will add more
        Instance[pane] = {
          name:		pane
          ,	pane:		$Ps[pane]
          ,	content:	$Cs[pane]
          ,	options:	options[pane]
          ,	state:		state[pane]
          ,	children:	children[pane]
        };

        // add classes, attributes & events
        $P	.data({
          parentLayout:	Instance		// pointer to Layout Instance
          ,	layoutPane:		Instance[pane]	// NEW pointer to pane-alias-object
          ,	layoutEdge:		pane
          ,	layoutRole:		"pane"
        })
          .css(c.cssReq).css("zIndex", options.zIndexes.pane_normal)
          .css(o.applyDemoStyles ? c.cssDemo : {}) // demo styles
          .addClass( o.paneClass +" "+ o.paneClass+"-"+pane ) // default = "ui-layout-pane ui-layout-pane-west" - may be a dupe of 'paneSelector'
          .bind("mouseenter."+ sID, addHover )
          .bind("mouseleave."+ sID, removeHover )
        ;
        var paneMethods = {
          hide:				''
          ,	show:				''
          ,	toggle:				''
          ,	close:				''
          ,	open:				''
          ,	slideOpen:			''
          ,	slideClose:			''
          ,	slideToggle:		''
          ,	size:				'sizePane'
          ,	sizePane:			'sizePane'
          ,	sizeContent:		''
          ,	sizeHandles:		''
          ,	enableClosable:		''
          ,	disableClosable:	''
          ,	enableSlideable:	''
          ,	disableSlideable:	''
          ,	enableResizable:	''
          ,	disableResizable:	''
          ,	swapPanes:			'swapPanes'
          ,	swap:				'swapPanes'
          ,	move:				'swapPanes'
          ,	removePane:			'removePane'
          ,	remove:				'removePane'
          ,	createChildren:		''
          ,	resizeChildren:		''
          ,	resizeAll:			'resizeAll'
          ,	resizeLayout:		'resizeAll'
        }
          ,	name;
        // loop hash and bind all methods - include layoutID namespacing
        for (name in paneMethods) {
          $P.bind("layoutpane"+ name.toLowerCase() +"."+ sID, Instance[ paneMethods[name] || name ]);
        }

        // see if this pane has a 'scrolling-content element'
        initContent(pane, false); // false = do NOT sizeContent() - called later

        if (!isCenter) {
          // call _parseSize AFTER applying pane classes & styles - but before making visible (if hidden)
          // if o.size is auto or not valid, then MEASURE the pane and use that as its 'size'
          size	= s.size = _parseSize(pane, o.size);
          minSize	= _parseSize(pane,o.minSize) || 1;
          maxSize	= _parseSize(pane,o.maxSize) || 100000;
          if (size > 0) size = max(min(size, maxSize), minSize);
          s.autoResize = o.autoResize; // used with percentage sizes

          // state for border-panes
          s.isClosed  = false; // true = pane is closed
          s.isSliding = false; // true = pane is currently open by 'sliding' over adjacent panes
          s.isResizing= false; // true = pane is in process of being resized
          s.isHidden	= false; // true = pane is hidden - no spacing, resizer or toggler is visible!

          // array for 'pin buttons' whose classNames are auto-updated on pane-open/-close
          if (!s.pins) s.pins = [];
        }
        //	states common to ALL panes
        s.tagName	= $P[0].tagName;
        s.edge		= pane;		// useful if pane is (or about to be) 'swapped' - easy find out where it is (or is going)
        s.noRoom	= false;	// true = pane 'automatically' hidden due to insufficient room - will unhide automatically
        s.isVisible	= true;		// false = pane is invisible - closed OR hidden - simplify logic

        // init pane positioning
        setPanePosition( pane );

        // if pane is not visible,
        if (dir === "horz") // north or south pane
          CSS.height = cssH($P, size);
        else if (dir === "vert") // east or west pane
          CSS.width = cssW($P, size);
        //else if (isCenter) {}

        $P.css(CSS); // apply size -- top, bottom & height will be set by sizeMidPanes
        if (dir != "horz") sizeMidPanes(pane, true); // true = skipCallback

        // if manually adding a pane AFTER layout initialization, then...
        if (state.initialized) {
          initHandles( pane );
          initHotkeys( pane );
        }

        // close or hide the pane if specified in settings
        if (o.initClosed && o.closable && !o.initHidden)
          close(pane, true, true); // true, true = force, noAnimation
        else if (o.initHidden || o.initClosed)
          hide(pane); // will be completely invisible - no resizer or spacing
        else if (!s.noRoom)
        // make the pane visible - in case was initially hidden
          $P.css("display","block");
        // ELSE setAsOpen() - called later by initHandles()

        // RESET visibility now - pane will appear IF display:block
        $P.css("visibility","visible");

        // check option for auto-handling of pop-ups & drop-downs
        if (o.showOverflowOnHover)
          $P.hover( allowOverflow, resetOverflow );

        // if manually adding a pane AFTER layout initialization, then...
        if (state.initialized) {
          afterInitPane( pane );
        }
      }

      ,	afterInitPane = function (pane) {
        var	$P	= $Ps[pane]
          ,	s	= state[pane]
          ,	o	= options[pane]
        ;
        if (!$P) return;

        // see if there is a directly-nested layout inside this pane
        if ($P.data("layout"))
          refreshChildren( pane, $P.data("layout") );

        // process pane contents and callbacks, and init/resize child-layout if exists
        if (s.isVisible) { // pane is OPEN
          if (state.initialized) // this pane was added AFTER layout was created
            resizeAll(); // will also sizeContent
          else
            sizeContent(pane);

          if (o.triggerEventsOnLoad)
            _runCallbacks("onresize_end", pane);
          else // automatic if onresize called, otherwise call it specifically
          // resize child - IF inner-layout already exists (created before this layout)
            resizeChildren(pane, true); // a previously existing childLayout
        }

        // init childLayouts - even if pane is not visible
        if (o.initChildren && o.children)
          createChildren(pane);
      }

      /**
       * @param {string=}	panes		The pane(s) to process
       */
      ,	setPanePosition = function (panes) {
        panes = panes ? panes.split(",") : _c.borderPanes;

        // create toggler DIVs for each pane, and set object pointers for them, eg: $R.north = north toggler DIV
        $.each(panes, function (i, pane) {
          var $P	= $Ps[pane]
            ,	$R	= $Rs[pane]
            ,	o	= options[pane]
            ,	s	= state[pane]
            ,	side =  _c[pane].side
            ,	CSS	= {}
          ;
          if (!$P) return; // pane does not exist - skip

          // set css-position to account for container borders & padding
          switch (pane) {
            case "north": 	CSS.top 	= sC.inset.top;
              CSS.left 	= sC.inset.left;
              CSS.right	= sC.inset.right;
              break;
            case "south": 	CSS.bottom	= sC.inset.bottom;
              CSS.left 	= sC.inset.left;
              CSS.right 	= sC.inset.right;
              break;
            case "west": 	CSS.left 	= sC.inset.left; // top, bottom & height set by sizeMidPanes()
              break;
            case "east": 	CSS.right 	= sC.inset.right; // ditto
              break;
            case "center":	// top, left, width & height set by sizeMidPanes()
          }
          // apply position
          $P.css(CSS);

          // update resizer position
          if ($R && s.isClosed)
            $R.css(side, sC.inset[side]);
          else if ($R && !s.isHidden)
            $R.css(side, sC.inset[side] + getPaneSize(pane));
        });
      }

      /**
       * Initialize module objects, styling, size and position for all resize bars and toggler buttons
       *
       * @see  _create()
       * @param {string=}	[panes=""]	The edge(s) to process
       */
      ,	initHandles = function (panes) {
        panes = panes ? panes.split(",") : _c.borderPanes;

        // create toggler DIVs for each pane, and set object pointers for them, eg: $R.north = north toggler DIV
        $.each(panes, function (i, pane) {
          var $P		= $Ps[pane];
          $Rs[pane]	= false; // INIT
          $Ts[pane]	= false;
          if (!$P) return; // pane does not exist - skip

          var	o		= options[pane]
            ,	s		= state[pane]
            ,	c		= _c[pane]
            ,	paneId	= o.paneSelector.substr(0,1) === "#" ? o.paneSelector.substr(1) : ""
            ,	rClass	= o.resizerClass
            ,	tClass	= o.togglerClass
            ,	spacing	= (s.isVisible ? o.spacing_open : o.spacing_closed)
            ,	_pane	= "-"+ pane // used for classNames
            ,	_state	= (s.isVisible ? "-open" : "-closed") // used for classNames
            ,	I		= Instance[pane]
            // INIT RESIZER BAR
            ,	$R		= I.resizer = $Rs[pane] = $("<div></div>")
            // INIT TOGGLER BUTTON
            ,	$T		= I.toggler = (o.closable ? $Ts[pane] = $("<div></div>") : false)
          ;

          //if (s.isVisible && o.resizable) ... handled by initResizable
          if (!s.isVisible && o.slidable)
            $R.attr("title", o.tips.Slide).css("cursor", o.sliderCursor);

          $R	// if paneSelector is an ID, then create a matching ID for the resizer, eg: "#paneLeft" => "paneLeft-resizer"
            .attr("id", paneId ? paneId +"-resizer" : "" )
            .data({
              parentLayout:	Instance
              ,	layoutPane:		Instance[pane]	// NEW pointer to pane-alias-object
              ,	layoutEdge:		pane
              ,	layoutRole:		"resizer"
            })
            .css(_c.resizers.cssReq).css("zIndex", options.zIndexes.resizer_normal)
            .css(o.applyDemoStyles ? _c.resizers.cssDemo : {}) // add demo styles
            .addClass(rClass +" "+ rClass+_pane)
            .hover(addHover, removeHover) // ALWAYS add hover-classes, even if resizing is not enabled - handle with CSS instead
            .hover(onResizerEnter, onResizerLeave) // ALWAYS NEED resizer.mouseleave to balance toggler.mouseenter
            .mousedown($.layout.disableTextSelection)	// prevent text-selection OUTSIDE resizer
            .mouseup($.layout.enableTextSelection)		// not really necessary, but just in case
            .appendTo($N) // append DIV to container
          ;
          if ($.fn.disableSelection)
            $R.disableSelection(); // prevent text-selection INSIDE resizer
          if (o.resizerDblClickToggle)
            $R.bind("dblclick."+ sID, toggle );

          if ($T) {
            $T	// if paneSelector is an ID, then create a matching ID for the resizer, eg: "#paneLeft" => "#paneLeft-toggler"
              .attr("id", paneId ? paneId +"-toggler" : "" )
              .data({
                parentLayout:	Instance
                ,	layoutPane:		Instance[pane]	// NEW pointer to pane-alias-object
                ,	layoutEdge:		pane
                ,	layoutRole:		"toggler"
              })
              .css(_c.togglers.cssReq) // add base/required styles
              .css(o.applyDemoStyles ? _c.togglers.cssDemo : {}) // add demo styles
              .addClass(tClass +" "+ tClass+_pane)
              .hover(addHover, removeHover) // ALWAYS add hover-classes, even if toggling is not enabled - handle with CSS instead
              .bind("mouseenter", onResizerEnter) // NEED toggler.mouseenter because mouseenter MAY NOT fire on resizer
              .appendTo($R) // append SPAN to resizer DIV
            ;
            // ADD INNER-SPANS TO TOGGLER
            if (o.togglerContent_open) // ui-layout-open
              $("<span>"+ o.togglerContent_open +"</span>")
                .data({
                  layoutEdge:		pane
                  ,	layoutRole:		"togglerContent"
                })
                .data("layoutRole", "togglerContent")
                .data("layoutEdge", pane)
                .addClass("content content-open")
                .css("display","none")
                .appendTo( $T )
              //.hover( addHover, removeHover ) // use ui-layout-toggler-west-hover .content-open instead!
              ;
            if (o.togglerContent_closed) // ui-layout-closed
              $("<span>"+ o.togglerContent_closed +"</span>")
                .data({
                  layoutEdge:		pane
                  ,	layoutRole:		"togglerContent"
                })
                .addClass("content content-closed")
                .css("display","none")
                .appendTo( $T )
              //.hover( addHover, removeHover ) // use ui-layout-toggler-west-hover .content-closed instead!
              ;
            // ADD TOGGLER.click/.hover
            enableClosable(pane);
          }

          // add Draggable events
          initResizable(pane);

          // ADD CLASSNAMES & SLIDE-BINDINGS - eg: class="resizer resizer-west resizer-open"
          if (s.isVisible)
            setAsOpen(pane);	// onOpen will be called, but NOT onResize
          else {
            setAsClosed(pane);	// onClose will be called
            bindStartSlidingEvents(pane, true); // will enable events IF option is set
          }

        });

        // SET ALL HANDLE DIMENSIONS
        sizeHandles();
      }


      /**
       * Initialize scrolling ui-layout-content div - if exists
       *
       * @see  initPane() - or externally after an Ajax injection
       * @param {string}	pane			The pane to process
       * @param {boolean=}	[resize=true]	Size content after init
       */
      ,	initContent = function (pane, resize) {
        if (!isInitialized()) return;
        var
          o	= options[pane]
          ,	sel	= o.contentSelector
          ,	I	= Instance[pane]
          ,	$P	= $Ps[pane]
          ,	$C
        ;
        if (sel) $C = I.content = $Cs[pane] = (o.findNestedContent)
          ? $P.find(sel).eq(0) // match 1-element only
          : $P.children(sel).eq(0)
        ;
        if ($C && $C.length) {
          $C.data("layoutRole", "content");
          // SAVE original Content CSS
          if (!$C.data("layoutCSS"))
            $C.data("layoutCSS", styles($C, "height"));
          $C.css( _c.content.cssReq );
          if (o.applyDemoStyles) {
            $C.css( _c.content.cssDemo ); // add padding & overflow: auto to content-div
            $P.css( _c.content.cssDemoPane ); // REMOVE padding/scrolling from pane
          }
          // ensure no vertical scrollbar on pane - will mess up measurements
          if ($P.css("overflowX").match(/(scroll|auto)/)) {
            $P.css("overflow", "hidden");
          }
          state[pane].content = {}; // init content state
          if (resize !== false) sizeContent(pane);
          // sizeContent() is called AFTER init of all elements
        }
        else
          I.content = $Cs[pane] = false;
      }


      /**
       * Add resize-bars to all panes that specify it in options
       * -dependancy: $.fn.resizable - will skip if not found
       *
       * @see  _create()
       * @param {string=}	[panes=""]	The edge(s) to process
       */
      ,	initResizable = function (panes) {
        var	draggingAvailable = $.layout.plugins.draggable
          ,	side // set in start()
        ;
        panes = panes ? panes.split(",") : _c.borderPanes;

        $.each(panes, function (idx, pane) {
          var o = options[pane];
          if (!draggingAvailable || !$Ps[pane] || !o.resizable) {
            o.resizable = false;
            return true; // skip to next
          }

          var s		= state[pane]
            ,	z		= options.zIndexes
            ,	c		= _c[pane]
            ,	side	= c.dir=="horz" ? "top" : "left"
            ,	$P 		= $Ps[pane]
            ,	$R		= $Rs[pane]
            ,	base	= o.resizerClass
            ,	lastPos	= 0 // used when live-resizing
            ,	r, live // set in start because may change
            //	'drag' classes are applied to the ORIGINAL resizer-bar while dragging is in process
            ,	resizerClass		= base+"-drag"				// resizer-drag
            ,	resizerPaneClass	= base+"-"+pane+"-drag"		// resizer-north-drag
            //	'helper' class is applied to the CLONED resizer-bar while it is being dragged
            ,	helperClass			= base+"-dragging"			// resizer-dragging
            ,	helperPaneClass		= base+"-"+pane+"-dragging" // resizer-north-dragging
            ,	helperLimitClass	= base+"-dragging-limit"	// resizer-drag
            ,	helperPaneLimitClass = base+"-"+pane+"-dragging-limit"	// resizer-north-drag
            ,	helperClassesSet	= false 					// logic var
          ;

          if (!s.isClosed)
            $R.attr("title", o.tips.Resize)
              .css("cursor", o.resizerCursor); // n-resize, s-resize, etc

          $R.draggable({
            containment:	$N[0] // limit resizing to layout container
            ,	axis:			(c.dir=="horz" ? "y" : "x") // limit resizing to horz or vert axis
            ,	delay:			0
            ,	distance:		1
            ,	grid:			o.resizingGrid
            //	basic format for helper - style it using class: .ui-draggable-dragging
            ,	helper:			"clone"
            ,	opacity:		o.resizerDragOpacity
            ,	addClasses:		false // avoid ui-state-disabled class when disabled
            //,	iframeFix:		o.draggableIframeFix // TODO: consider using when bug is fixed
            ,	zIndex:			z.resizer_drag

            ,	start: function (e, ui) {
              // REFRESH options & state pointers in case we used swapPanes
              o = options[pane];
              s = state[pane];
              // re-read options
              live = o.livePaneResizing;

              // ondrag_start callback - will CANCEL hide if returns false
              // TODO: dragging CANNOT be cancelled like this, so see if there is a way?
              if (false === _runCallbacks("ondrag_start", pane)) return false;

              s.isResizing		= true; // prevent pane from closing while resizing
              state.paneResizing	= pane; // easy to see if ANY pane is resizing
              timer.clear(pane+"_closeSlider"); // just in case already triggered

              // SET RESIZER LIMITS - used in drag()
              setSizeLimits(pane); // update pane/resizer state
              r = s.resizerPosition;
              lastPos = ui.position[ side ]

              $R.addClass( resizerClass +" "+ resizerPaneClass ); // add drag classes
              helperClassesSet = false; // reset logic var - see drag()

              // MASK PANES CONTAINING IFRAMES, APPLETS OR OTHER TROUBLESOME ELEMENTS
              showMasks( pane, { resizing: true });
            }

            ,	drag: function (e, ui) {
              if (!helperClassesSet) { // can only add classes after clone has been added to the DOM
                //$(".ui-draggable-dragging")
                ui.helper
                  .addClass( helperClass +" "+ helperPaneClass ) // add helper classes
                  .css({ right: "auto", bottom: "auto" })	// fix dir="rtl" issue
                  .children().css("visibility","hidden")	// hide toggler inside dragged resizer-bar
                ;
                helperClassesSet = true;
                // draggable bug!? RE-SET zIndex to prevent E/W resize-bar showing through N/S pane!
                if (s.isSliding) $Ps[pane].css("zIndex", z.pane_sliding);
              }
              // CONTAIN RESIZER-BAR TO RESIZING LIMITS
              var limit = 0;
              if (ui.position[side] < r.min) {
                ui.position[side] = r.min;
                limit = -1;
              }
              else if (ui.position[side] > r.max) {
                ui.position[side] = r.max;
                limit = 1;
              }
              // ADD/REMOVE dragging-limit CLASS
              if (limit) {
                ui.helper.addClass( helperLimitClass +" "+ helperPaneLimitClass ); // at dragging-limit
                window.defaultStatus = (limit>0 && pane.match(/(north|west)/)) || (limit<0 && pane.match(/(south|east)/)) ? o.tips.maxSizeWarning : o.tips.minSizeWarning;
              }
              else {
                ui.helper.removeClass( helperLimitClass +" "+ helperPaneLimitClass ); // not at dragging-limit
                window.defaultStatus = "";
              }
              // DYNAMICALLY RESIZE PANES IF OPTION ENABLED
              // won't trigger unless resizer has actually moved!
              if (live && Math.abs(ui.position[side] - lastPos) >= o.liveResizingTolerance) {
                lastPos = ui.position[side];
                resizePanes(e, ui, pane)
              }
            }

            ,	stop: function (e, ui) {
              $('body').enableSelection(); // RE-ENABLE TEXT SELECTION
              window.defaultStatus = ""; // clear 'resizing limit' message from statusbar
              $R.removeClass( resizerClass +" "+ resizerPaneClass ); // remove drag classes from Resizer
              s.isResizing		= false;
              state.paneResizing	= false; // easy to see if ANY pane is resizing
              resizePanes(e, ui, pane, true); // true = resizingDone
            }

          });
        });

        /**
         * resizePanes
         *
         * Sub-routine called from stop() - and drag() if livePaneResizing
         *
         * @param {!Object}		evt
         * @param {!Object}		ui
         * @param {string}		pane
         * @param {boolean=}		[resizingDone=false]
         */
        var resizePanes = function (evt, ui, pane, resizingDone) {
          var	dragPos	= ui.position
            ,	c		= _c[pane]
            ,	o		= options[pane]
            ,	s		= state[pane]
            ,	resizerPos
          ;
          switch (pane) {
            case "north":	resizerPos = dragPos.top; break;
            case "west":	resizerPos = dragPos.left; break;
            case "south":	resizerPos = sC.layoutHeight - dragPos.top  - o.spacing_open; break;
            case "east":	resizerPos = sC.layoutWidth  - dragPos.left - o.spacing_open; break;
          };
          // remove container margin from resizer position to get the pane size
          var newSize = resizerPos - sC.inset[c.side];

          // Disable OR Resize Mask(s) created in drag.start
          if (!resizingDone) {
            // ensure we meet liveResizingTolerance criteria
            if (Math.abs(newSize - s.size) < o.liveResizingTolerance)
              return; // SKIP resize this time
            // resize the pane
            manualSizePane(pane, newSize, false, true); // true = noAnimation
            sizeMasks(); // resize all visible masks
          }
          else { // resizingDone
            // ondrag_end callback
            if (false !== _runCallbacks("ondrag_end", pane))
              manualSizePane(pane, newSize, false, true); // true = noAnimation
            hideMasks(true); // true = force hiding all masks even if one is 'sliding'
            if (s.isSliding) // RE-SHOW 'object-masks' so objects won't show through sliding pane
              showMasks( pane, { resizing: true });
          }
        };
      }

      /**
       *	sizeMask
       *
       *	Needed to overlay a DIV over an IFRAME-pane because mask CANNOT be *inside* the pane
       *	Called when mask created, and during livePaneResizing
       */
      ,	sizeMask = function () {
        var $M		= $(this)
          ,	pane	= $M.data("layoutMask") // eg: "west"
          ,	s		= state[pane]
        ;
        // only masks over an IFRAME-pane need manual resizing
        if (s.tagName == "IFRAME" && s.isVisible) // no need to mask closed/hidden panes
          $M.css({
            top:	s.offsetTop
            ,	left:	s.offsetLeft
            ,	width:	s.outerWidth
            ,	height:	s.outerHeight
          });
        /* ALT Method...
         var $P = $Ps[pane];
         $M.css( $P.position() ).css({ width: $P[0].offsetWidth, height: $P[0].offsetHeight });
         */
      }
      ,	sizeMasks = function () {
        $Ms.each( sizeMask ); // resize all 'visible' masks
      }

      /**
       * @param {string}	pane		The pane being resized, animated or isSliding
       * @param {Object=}	[args]		(optional) Options: which masks to apply, and to which panes
       */
      ,	showMasks = function (pane, args) {
        var	c		= _c[pane]
          ,	panes	=  ["center"]
          ,	z		= options.zIndexes
          ,	a		= $.extend({
            objectsOnly:	false
            ,	animation:		false
            ,	resizing:		true
            ,	sliding:		state[pane].isSliding
          },	args )
          ,	o, s
        ;
        if (a.resizing)
          panes.push( pane );
        if (a.sliding)
          panes.push( _c.oppositeEdge[pane] ); // ADD the oppositeEdge-pane

        if (c.dir === "horz") {
          panes.push("west");
          panes.push("east");
        }

        $.each(panes, function(i,p){
          s = state[p];
          o = options[p];
          if (s.isVisible && ( o.maskObjects || (!a.objectsOnly && o.maskContents) )) {
            getMasks(p).each(function(){
              sizeMask.call(this);
              this.style.zIndex = s.isSliding ? z.pane_sliding+1 : z.pane_normal+1
              this.style.display = "block";
            });
          }
        });
      }

      /**
       * @param {boolean=}	force		Hide masks even if a pane is sliding
       */
      ,	hideMasks = function (force) {
        // ensure no pane is resizing - could be a timing issue
        if (force || !state.paneResizing) {
          $Ms.hide(); // hide ALL masks
        }
        // if ANY pane is sliding, then DO NOT remove masks from panes with maskObjects enabled
        else if (!force && !$.isEmptyObject( state.panesSliding )) {
          var	i = $Ms.length - 1
            ,	p, $M;
          for (; i >= 0; i--) {
            $M	= $Ms.eq(i);
            p	= $M.data("layoutMask");
            if (!options[p].maskObjects) {
              $M.hide();
            }
          }
        }
      }

      /**
       * @param {string}	pane
       */
      ,	getMasks = function (pane) {
        var $Masks	= $([])
          ,	$M, i = 0, c = $Ms.length
        ;
        for (; i<c; i++) {
          $M = $Ms.eq(i);
          if ($M.data("layoutMask") === pane)
            $Masks = $Masks.add( $M );
        }
        if ($Masks.length)
          return $Masks;
        else
          return createMasks(pane);
      }

      /**
       * createMasks
       *
       * Generates both DIV (ALWAYS used) and IFRAME (optional) elements as masks
       * An IFRAME mask is created *under* the DIV when maskObjects=true, because a DIV cannot mask an applet
       *
       * @param {string}	pane
       */
      ,	createMasks = function (pane) {
        var
          $P	= $Ps[pane]
          ,	s	= state[pane]
          ,	o	= options[pane]
          ,	z	= options.zIndexes
          ,	isIframe, el, $M, css, i
        ;
        if (!o.maskContents && !o.maskObjects) return $([]);
        // if o.maskObjects=true, then loop TWICE to create BOTH kinds of mask, else only create a DIV
        for (i=0; i < (o.maskObjects ? 2 : 1); i++) {
          isIframe = o.maskObjects && i==0;
          el = document.createElement( isIframe ? "iframe" : "div" );
          $M = $(el).data("layoutMask", pane); // add data to relate mask to pane
          el.className = "ui-layout-mask ui-layout-mask-"+ pane; // for user styling
          css = el.style;
          // Both DIVs and IFRAMES
          css.background	= "#FFF";
          css.position	= "absolute";
          css.display		= "block";
          if (isIframe) { // IFRAME-only props
            el.src		= "about:blank";
            el.frameborder = 0;
            css.border	= 0;
            css.opacity	= 0;
            css.filter	= "Alpha(Opacity='0')";
            //el.allowTransparency = true; - for IE, but breaks masking ability!
          }
          else { // DIV-only props
            css.opacity	= 0.001;
            css.filter	= "Alpha(Opacity='1')";
          }
          // if pane IS an IFRAME, then must mask the pane itself
          if (s.tagName == "IFRAME") {
            // NOTE sizing done by a subroutine so can be called during live-resizing
            css.zIndex	= z.pane_normal+1; // 1-higher than pane
            $N.append( el ); // append to LAYOUT CONTAINER
          }
          // otherwise put masks *inside the pane* to mask its contents
          else {
            $M.addClass("ui-layout-mask-inside-pane");
            css.zIndex	= o.maskZindex || z.content_mask; // usually 1, but customizable
            css.top		= 0;
            css.left	= 0;
            css.width	= "100%";
            css.height	= "100%";
            $P.append( el ); // append INSIDE pane element
          }
          // add Mask to cached array so can be resized & reused
          $Ms = $Ms.add( el );
        }
        return $Ms;
      }


      /**
       * Destroy this layout and reset all elements
       *
       * @param {boolean=}	[destroyChildren=false]		Destory Child-Layouts first?
       */
      ,	destroy = function (evt_or_destroyChildren, destroyChildren) {
        // UNBIND layout events and remove global object
        $(window).unbind("."+ sID);		// resize & unload
        $(document).unbind("."+ sID);	// keyDown (hotkeys)

        if (typeof evt_or_destroyChildren === "object")
        // stopPropagation if called by trigger("layoutdestroy") - use evtPane utility
          evtPane(evt_or_destroyChildren);
        else // no event, so transfer 1st param to destroyChildren param
          destroyChildren = evt_or_destroyChildren;

        // need to look for parent layout BEFORE we remove the container data, else skips a level
        //var parentPane = Instance.hasParentLayout ? $.layout.getParentPaneInstance( $N ) : null;

        // reset layout-container
        $N	.clearQueue()
          .removeData("layout")
          .removeData("layoutContainer")
          .removeClass(options.containerClass)
          .unbind("."+ sID) // remove ALL Layout events
        ;

        // remove all mask elements that have been created
        $Ms.remove();

        // loop all panes to remove layout classes, attributes and bindings
        $.each(_c.allPanes, function (i, pane) {
          removePane( pane, false, true, destroyChildren ); // true = skipResize
        });

        // do NOT reset container CSS if is a 'pane' (or 'content') in an outer-layout - ie, THIS layout is 'nested'
        var css = "layoutCSS";
        if ($N.data(css) && !$N.data("layoutRole")) // RESET CSS
          $N.css( $N.data(css) ).removeData(css);

        // for full-page layouts, also reset the <HTML> CSS
        if (sC.tagName === "BODY" && ($N = $("html")).data(css)) // RESET <HTML> CSS
          $N.css( $N.data(css) ).removeData(css);

        // trigger plugins for this layout, if there are any
        runPluginCallbacks( Instance, $.layout.onDestroy );

        // trigger state-management and onunload callback
        unload();

        // clear the Instance of everything except for container & options (so could recreate)
        // RE-CREATE: myLayout = myLayout.container.layout( myLayout.options );
        for (var n in Instance)
          if (!n.match(/^(container|options)$/)) delete Instance[ n ];
        // add a 'destroyed' flag to make it easy to check
        Instance.destroyed = true;

        // if this is a child layout, CLEAR the child-pointer in the parent
        /* for now the pointer REMAINS, but with only container, options and destroyed keys
         if (parentPane) {
         var layout	= parentPane.pane.data("parentLayout")
         ,	key		= layout.options.instanceKey || 'error';
         // THIS SYNTAX MAY BE WRONG!
         parentPane.children[key] = layout.children[ parentPane.name ].children[key] = null;
         }
         */

        return Instance; // for coding convenience
      }

      /**
       * Remove a pane from the layout - subroutine of destroy()
       *
       * @see  destroy()
       * @param {(string|Object)}	evt_or_pane			The pane to process
       * @param {boolean=}			[remove=false]		Remove the DOM element?
       * @param {boolean=}			[skipResize=false]	Skip calling resizeAll()?
       * @param {boolean=}			[destroyChild=true]	Destroy Child-layouts? If not passed, obeys options setting
       */
      ,	removePane = function (evt_or_pane, remove, skipResize, destroyChild) {
        if (!isInitialized()) return;
        var	pane = evtPane.call(this, evt_or_pane)
          ,	$P	= $Ps[pane]
          ,	$C	= $Cs[pane]
          ,	$R	= $Rs[pane]
          ,	$T	= $Ts[pane]
        ;
        // NOTE: elements can still exist even after remove()
        //		so check for missing data(), which is cleared by removed()
        if ($P && $.isEmptyObject( $P.data() )) $P = false;
        if ($C && $.isEmptyObject( $C.data() )) $C = false;
        if ($R && $.isEmptyObject( $R.data() )) $R = false;
        if ($T && $.isEmptyObject( $T.data() )) $T = false;

        if ($P) $P.stop(true, true);

        var	o	= options[pane]
          ,	s	= state[pane]
          ,	d	= "layout"
          ,	css	= "layoutCSS"
          ,	pC	= children[pane]
          ,	hasChildren	= $.isPlainObject( pC ) && !$.isEmptyObject( pC )
          ,	destroy		= destroyChild !== undefined ? destroyChild : o.destroyChildren
        ;
        // FIRST destroy the child-layout(s)
        if (hasChildren && destroy) {
          $.each( pC, function (key, child) {
            if (!child.destroyed)
              child.destroy(true);// tell child-layout to destroy ALL its child-layouts too
            if (child.destroyed)	// destroy was successful
              delete pC[key];
          });
          // if no more children, remove the children hash
          if ($.isEmptyObject( pC )) {
            pC = children[pane] = null; // clear children hash
            hasChildren = false;
          }
        }

        // Note: can't 'remove' a pane element with non-destroyed children
        if ($P && remove && !hasChildren)
          $P.remove(); // remove the pane-element and everything inside it
        else if ($P && $P[0]) {
          //	create list of ALL pane-classes that need to be removed
          var	root	= o.paneClass // default="ui-layout-pane"
            ,	pRoot	= root +"-"+ pane // eg: "ui-layout-pane-west"
            ,	_open	= "-open"
            ,	_sliding= "-sliding"
            ,	_closed	= "-closed"
            ,	classes	= [	root, root+_open, root+_closed, root+_sliding,		// generic classes
            pRoot, pRoot+_open, pRoot+_closed, pRoot+_sliding ]	// pane-specific classes
          ;
          $.merge(classes, getHoverClasses($P, true)); // ADD hover-classes
          // remove all Layout classes from pane-element
          $P	.removeClass( classes.join(" ") ) // remove ALL pane-classes
            .removeData("parentLayout")
            .removeData("layoutPane")
            .removeData("layoutRole")
            .removeData("layoutEdge")
            .removeData("autoHidden")	// in case set
            .unbind("."+ sID) // remove ALL Layout events
          // TODO: remove these extra unbind commands when jQuery is fixed
          //.unbind("mouseenter"+ sID)
          //.unbind("mouseleave"+ sID)
          ;
          // do NOT reset CSS if this pane/content is STILL the container of a nested layout!
          // the nested layout will reset its 'container' CSS when/if it is destroyed
          if (hasChildren && $C) {
            // a content-div may not have a specific width, so give it one to contain the Layout
            $C.width( $C.width() );
            $.each( pC, function (key, child) {
              child.resizeAll(); // resize the Layout
            });
          }
          else if ($C)
            $C.css( $C.data(css) ).removeData(css).removeData("layoutRole");
          // remove pane AFTER content in case there was a nested layout
          if (!$P.data(d))
            $P.css( $P.data(css) ).removeData(css);
        }

        // REMOVE pane resizer and toggler elements
        if ($T) $T.remove();
        if ($R) $R.remove();

        // CLEAR all pointers and state data
        Instance[pane] = $Ps[pane] = $Cs[pane] = $Rs[pane] = $Ts[pane] = false;
        s = { removed: true };

        if (!skipResize)
          resizeAll();
      }


      /*
       * ###########################
       *	   ACTION METHODS
       * ###########################
       */

      /**
       * @param {string}	pane
       */
      ,	_hidePane = function (pane) {
        var $P	= $Ps[pane]
          ,	o	= options[pane]
          ,	s	= $P[0].style
        ;
        if (o.useOffscreenClose) {
          if (!$P.data(_c.offscreenReset))
            $P.data(_c.offscreenReset, { left: s.left, right: s.right });
          $P.css( _c.offscreenCSS );
        }
        else
          $P.hide().removeData(_c.offscreenReset);
      }

      /**
       * @param {string}	pane
       */
      ,	_showPane = function (pane) {
        var $P	= $Ps[pane]
          ,	o	= options[pane]
          ,	off	= _c.offscreenCSS
          ,	old	= $P.data(_c.offscreenReset)
          ,	s	= $P[0].style
        ;
        $P	.show() // ALWAYS show, just in case
          .removeData(_c.offscreenReset);
        if (o.useOffscreenClose && old) {
          if (s.left == off.left)
            s.left = old.left;
          if (s.right == off.right)
            s.right = old.right;
        }
      }


      /**
       * Completely 'hides' a pane, including its spacing - as if it does not exist
       * The pane is not actually 'removed' from the source, so can use 'show' to un-hide it
       *
       * @param {(string|Object)}	evt_or_pane			The pane being hidden, ie: north, south, east, or west
       * @param {boolean=}			[noAnimation=false]
       */
      ,	hide = function (evt_or_pane, noAnimation) {
        if (!isInitialized()) return;
        var	pane = evtPane.call(this, evt_or_pane)
          ,	o	= options[pane]
          ,	s	= state[pane]
          ,	$P	= $Ps[pane]
          ,	$R	= $Rs[pane]
        ;
        if (pane === "center" || !$P || s.isHidden) return; // pane does not exist OR is already hidden

        // onhide_start callback - will CANCEL hide if returns false
        if (state.initialized && false === _runCallbacks("onhide_start", pane)) return;

        s.isSliding = false; // just in case
        delete state.panesSliding[pane];

        // now hide the elements
        if ($R) $R.hide(); // hide resizer-bar
        if (!state.initialized || s.isClosed) {
          s.isClosed = true; // to trigger open-animation on show()
          s.isHidden  = true;
          s.isVisible = false;
          if (!state.initialized)
            _hidePane(pane); // no animation when loading page
          sizeMidPanes(_c[pane].dir === "horz" ? "" : "center");
          if (state.initialized || o.triggerEventsOnLoad)
            _runCallbacks("onhide_end", pane);
        }
        else {
          s.isHiding = true; // used by onclose
          close(pane, false, noAnimation); // adjust all panes to fit
        }
      }

      /**
       * Show a hidden pane - show as 'closed' by default unless openPane = true
       *
       * @param {(string|Object)}	evt_or_pane			The pane being opened, ie: north, south, east, or west
       * @param {boolean=}			[openPane=false]
       * @param {boolean=}			[noAnimation=false]
       * @param {boolean=}			[noAlert=false]
       */
      ,	show = function (evt_or_pane, openPane, noAnimation, noAlert) {
        if (!isInitialized()) return;
        var	pane = evtPane.call(this, evt_or_pane)
          ,	o	= options[pane]
          ,	s	= state[pane]
          ,	$P	= $Ps[pane]
          ,	$R	= $Rs[pane]
        ;
        if (pane === "center" || !$P || !s.isHidden) return; // pane does not exist OR is not hidden

        // onshow_start callback - will CANCEL show if returns false
        if (false === _runCallbacks("onshow_start", pane)) return;

        s.isShowing = true; // used by onopen/onclose
        //s.isHidden  = false; - will be set by open/close - if not cancelled
        s.isSliding = false; // just in case
        delete state.panesSliding[pane];

        // now show the elements
        //if ($R) $R.show(); - will be shown by open/close
        if (openPane === false)
          close(pane, true); // true = force
        else
          open(pane, false, noAnimation, noAlert); // adjust all panes to fit
      }


      /**
       * Toggles a pane open/closed by calling either open or close
       *
       * @param {(string|Object)}	evt_or_pane		The pane being toggled, ie: north, south, east, or west
       * @param {boolean=}			[slide=false]
       */
      ,	toggle = function (evt_or_pane, slide) {
        if (!isInitialized()) return;
        var	evt		= evtObj(evt_or_pane)
          ,	pane	= evtPane.call(this, evt_or_pane)
          ,	s		= state[pane]
        ;
        if (evt) // called from to $R.dblclick OR triggerPaneEvent
          evt.stopImmediatePropagation();
        if (s.isHidden)
          show(pane); // will call 'open' after unhiding it
        else if (s.isClosed)
          open(pane, !!slide);
        else
          close(pane);
      }


      /**
       * Utility method used during init or other auto-processes
       *
       * @param {string}	pane   The pane being closed
       * @param {boolean=}	[setHandles=false]
       */
      ,	_closePane = function (pane, setHandles) {
        var
          $P	= $Ps[pane]
          ,	s	= state[pane]
        ;
        _hidePane(pane);
        s.isClosed = true;
        s.isVisible = false;
        if (setHandles) setAsClosed(pane);
      }

      /**
       * Close the specified pane (animation optional), and resize all other panes as needed
       *
       * @param {(string|Object)}	evt_or_pane			The pane being closed, ie: north, south, east, or west
       * @param {boolean=}			[force=false]
       * @param {boolean=}			[noAnimation=false]
       * @param {boolean=}			[skipCallback=false]
       */
      ,	close = function (evt_or_pane, force, noAnimation, skipCallback) {
        var	pane = evtPane.call(this, evt_or_pane);
        if (pane === "center") return; // validate
        // if pane has been initialized, but NOT the complete layout, close pane instantly
        if (!state.initialized && $Ps[pane]) {
          _closePane(pane, true); // INIT pane as closed
          return;
        }
        if (!isInitialized()) return;

        var
          $P	= $Ps[pane]
          ,	$R	= $Rs[pane]
          ,	$T	= $Ts[pane]
          ,	o	= options[pane]
          ,	s	= state[pane]
          ,	c	= _c[pane]
          ,	doFX, isShowing, isHiding, wasSliding;

        // QUEUE in case another action/animation is in progress
        $N.queue(function( queueNext ){

          if ( !$P
            ||	(!o.closable && !s.isShowing && !s.isHiding)	// invalid request // (!o.resizable && !o.closable) ???
            ||	(!force && s.isClosed && !s.isShowing)			// already closed
          ) return queueNext();

          // onclose_start callback - will CANCEL hide if returns false
          // SKIP if just 'showing' a hidden pane as 'closed'
          var abort = !s.isShowing && false === _runCallbacks("onclose_start", pane);

          // transfer logic vars to temp vars
          isShowing	= s.isShowing;
          isHiding	= s.isHiding;
          wasSliding	= s.isSliding;
          // now clear the logic vars (REQUIRED before aborting)
          delete s.isShowing;
          delete s.isHiding;

          if (abort) return queueNext();

          doFX		= !noAnimation && !s.isClosed && (o.fxName_close != "none");
          s.isMoving	= true;
          s.isClosed	= true;
          s.isVisible	= false;
          // update isHidden BEFORE sizing panes
          if (isHiding) s.isHidden = true;
          else if (isShowing) s.isHidden = false;

          if (s.isSliding) // pane is being closed, so UNBIND trigger events
            bindStopSlidingEvents(pane, false); // will set isSliding=false
          else // resize panes adjacent to this one
            sizeMidPanes(_c[pane].dir === "horz" ? "" : "center", false); // false = NOT skipCallback

          // if this pane has a resizer bar, move it NOW - before animation
          setAsClosed(pane);

          // CLOSE THE PANE
          if (doFX) { // animate the close
            lockPaneForFX(pane, true);	// need to set left/top so animation will work
            $P.hide( o.fxName_close, o.fxSettings_close, o.fxSpeed_close, function () {
              lockPaneForFX(pane, false); // undo
              if (s.isClosed) close_2();
              queueNext();
            });
          }
          else { // hide the pane without animation
            _hidePane(pane);
            close_2();
            queueNext();
          };
        });

        // SUBROUTINE
        function close_2 () {
          s.isMoving	= false;
          bindStartSlidingEvents(pane, true); // will enable if o.slidable = true

          // if opposite-pane was autoClosed, see if it can be autoOpened now
          var altPane = _c.oppositeEdge[pane];
          if (state[ altPane ].noRoom) {
            setSizeLimits( altPane );
            makePaneFit( altPane );
          }

          if (!skipCallback && (state.initialized || o.triggerEventsOnLoad)) {
            // onclose callback - UNLESS just 'showing' a hidden pane as 'closed'
            if (!isShowing)	_runCallbacks("onclose_end", pane);
            // onhide OR onshow callback
            if (isShowing)	_runCallbacks("onshow_end", pane);
            if (isHiding)	_runCallbacks("onhide_end", pane);
          }
        }
      }

      /**
       * @param {string}	pane	The pane just closed, ie: north, south, east, or west
       */
      ,	setAsClosed = function (pane) {
        if (!$Rs[pane]) return; // handles not initialized yet!
        var
          $P		= $Ps[pane]
          ,	$R		= $Rs[pane]
          ,	$T		= $Ts[pane]
          ,	o		= options[pane]
          ,	s		= state[pane]
          ,	side	= _c[pane].side
          ,	rClass	= o.resizerClass
          ,	tClass	= o.togglerClass
          ,	_pane	= "-"+ pane // used for classNames
          ,	_open	= "-open"
          ,	_sliding= "-sliding"
          ,	_closed	= "-closed"
        ;
        $R
          .css(side, sC.inset[side]) // move the resizer
          .removeClass( rClass+_open +" "+ rClass+_pane+_open )
          .removeClass( rClass+_sliding +" "+ rClass+_pane+_sliding )
          .addClass( rClass+_closed +" "+ rClass+_pane+_closed )
        ;
        // handle already-hidden panes in case called by swap() or a similar method
        if (s.isHidden) $R.hide(); // hide resizer-bar

        // DISABLE 'resizing' when closed - do this BEFORE bindStartSlidingEvents?
        if (o.resizable && $.layout.plugins.draggable)
          $R
            .draggable("disable")
            .removeClass("ui-state-disabled") // do NOT apply disabled styling - not suitable here
            .css("cursor", "default")
            .attr("title","")
          ;

        // if pane has a toggler button, adjust that too
        if ($T) {
          $T
            .removeClass( tClass+_open +" "+ tClass+_pane+_open )
            .addClass( tClass+_closed +" "+ tClass+_pane+_closed )
            .attr("title", o.tips.Open) // may be blank
          ;
          // toggler-content - if exists
          $T.children(".content-open").hide();
          $T.children(".content-closed").css("display","block");
        }

        // sync any 'pin buttons'
        syncPinBtns(pane, false);

        if (state.initialized) {
          // resize 'length' and position togglers for adjacent panes
          sizeHandles();
        }
      }

      /**
       * Open the specified pane (animation optional), and resize all other panes as needed
       *
       * @param {(string|Object)}	evt_or_pane			The pane being opened, ie: north, south, east, or west
       * @param {boolean=}			[slide=false]
       * @param {boolean=}			[noAnimation=false]
       * @param {boolean=}			[noAlert=false]
       */
      ,	open = function (evt_or_pane, slide, noAnimation, noAlert) {
        if (!isInitialized()) return;
        var	pane = evtPane.call(this, evt_or_pane)
          ,	$P	= $Ps[pane]
          ,	$R	= $Rs[pane]
          ,	$T	= $Ts[pane]
          ,	o	= options[pane]
          ,	s	= state[pane]
          ,	c	= _c[pane]
          ,	doFX, isShowing
        ;
        if (pane === "center") return; // validate
        // QUEUE in case another action/animation is in progress
        $N.queue(function( queueNext ){

          if ( !$P
            ||	(!o.resizable && !o.closable && !s.isShowing)	// invalid request
            ||	(s.isVisible && !s.isSliding)					// already open
          ) return queueNext();

          // pane can ALSO be unhidden by just calling show(), so handle this scenario
          if (s.isHidden && !s.isShowing) {
            queueNext(); // call before show() because it needs the queue free
            show(pane, true);
            return;
          }

          if (s.autoResize && s.size != o.size) // resize pane to original size set in options
            sizePane(pane, o.size, true, true, true); // true=skipCallback/noAnimation/forceResize
          else
          // make sure there is enough space available to open the pane
            setSizeLimits(pane, slide);

          // onopen_start callback - will CANCEL open if returns false
          var cbReturn = _runCallbacks("onopen_start", pane);

          if (cbReturn === "abort")
            return queueNext();

          // update pane-state again in case options were changed in onopen_start
          if (cbReturn !== "NC") // NC = "No Callback"
            setSizeLimits(pane, slide);

          if (s.minSize > s.maxSize) { // INSUFFICIENT ROOM FOR PANE TO OPEN!
            syncPinBtns(pane, false); // make sure pin-buttons are reset
            if (!noAlert && o.tips.noRoomToOpen)
              alert(o.tips.noRoomToOpen);
            return queueNext(); // ABORT
          }

          if (slide) // START Sliding - will set isSliding=true
            bindStopSlidingEvents(pane, true); // BIND trigger events to close sliding-pane
          else if (s.isSliding) // PIN PANE (stop sliding) - open pane 'normally' instead
            bindStopSlidingEvents(pane, false); // UNBIND trigger events - will set isSliding=false
          else if (o.slidable)
            bindStartSlidingEvents(pane, false); // UNBIND trigger events

          s.noRoom = false; // will be reset by makePaneFit if 'noRoom'
          makePaneFit(pane);

          // transfer logic var to temp var
          isShowing = s.isShowing;
          // now clear the logic var
          delete s.isShowing;

          doFX		= !noAnimation && s.isClosed && (o.fxName_open != "none");
          s.isMoving	= true;
          s.isVisible	= true;
          s.isClosed	= false;
          // update isHidden BEFORE sizing panes - WHY??? Old?
          if (isShowing) s.isHidden = false;

          if (doFX) { // ANIMATE
            // mask adjacent panes with objects
            lockPaneForFX(pane, true);	// need to set left/top so animation will work
            $P.show( o.fxName_open, o.fxSettings_open, o.fxSpeed_open, function() {
              lockPaneForFX(pane, false); // undo
              if (s.isVisible) open_2(); // continue
              queueNext();
            });
          }
          else { // no animation
            _showPane(pane);// just show pane and...
            open_2();		// continue
            queueNext();
          };
        });

        // SUBROUTINE
        function open_2 () {
          s.isMoving	= false;

          // cure iframe display issues
          _fixIframe(pane);

          // NOTE: if isSliding, then other panes are NOT 'resized'
          if (!s.isSliding) { // resize all panes adjacent to this one
            sizeMidPanes(_c[pane].dir=="vert" ? "center" : "", false); // false = NOT skipCallback
          }

          // set classes, position handles and execute callbacks...
          setAsOpen(pane);
        };

      }

      /**
       * @param {string}	pane		The pane just opened, ie: north, south, east, or west
       * @param {boolean=}	[skipCallback=false]
       */
      ,	setAsOpen = function (pane, skipCallback) {
        var
          $P		= $Ps[pane]
          ,	$R		= $Rs[pane]
          ,	$T		= $Ts[pane]
          ,	o		= options[pane]
          ,	s		= state[pane]
          ,	side	= _c[pane].side
          ,	rClass	= o.resizerClass
          ,	tClass	= o.togglerClass
          ,	_pane	= "-"+ pane // used for classNames
          ,	_open	= "-open"
          ,	_closed	= "-closed"
          ,	_sliding= "-sliding"
        ;
        $R
          .css(side, sC.inset[side] + getPaneSize(pane)) // move the resizer
          .removeClass( rClass+_closed +" "+ rClass+_pane+_closed )
          .addClass( rClass+_open +" "+ rClass+_pane+_open )
        ;
        if (s.isSliding)
          $R.addClass( rClass+_sliding +" "+ rClass+_pane+_sliding )
        else // in case 'was sliding'
          $R.removeClass( rClass+_sliding +" "+ rClass+_pane+_sliding )

        removeHover( 0, $R ); // remove hover classes
        if (o.resizable && $.layout.plugins.draggable)
          $R	.draggable("enable")
            .css("cursor", o.resizerCursor)
            .attr("title", o.tips.Resize);
        else if (!s.isSliding)
          $R.css("cursor", "default"); // n-resize, s-resize, etc

        // if pane also has a toggler button, adjust that too
        if ($T) {
          $T	.removeClass( tClass+_closed +" "+ tClass+_pane+_closed )
            .addClass( tClass+_open +" "+ tClass+_pane+_open )
            .attr("title", o.tips.Close); // may be blank
          removeHover( 0, $T ); // remove hover classes
          // toggler-content - if exists
          $T.children(".content-closed").hide();
          $T.children(".content-open").css("display","block");
        }

        // sync any 'pin buttons'
        syncPinBtns(pane, !s.isSliding);

        // update pane-state dimensions - BEFORE resizing content
        $.extend(s, elDims($P));

        if (state.initialized) {
          // resize resizer & toggler sizes for all panes
          sizeHandles();
          // resize content every time pane opens - to be sure
          sizeContent(pane, true); // true = remeasure headers/footers, even if 'pane.isMoving'
        }

        if (!skipCallback && (state.initialized || o.triggerEventsOnLoad) && $P.is(":visible")) {
          // onopen callback
          _runCallbacks("onopen_end", pane);
          // onshow callback - TODO: should this be here?
          if (s.isShowing) _runCallbacks("onshow_end", pane);

          // ALSO call onresize because layout-size *may* have changed while pane was closed
          if (state.initialized)
            _runCallbacks("onresize_end", pane);
        }

        // TODO: Somehow sizePane("north") is being called after this point???
      }


      /**
       * slideOpen / slideClose / slideToggle
       *
       * Pass-though methods for sliding
       */
      ,	slideOpen = function (evt_or_pane) {
        if (!isInitialized()) return;
        var	evt		= evtObj(evt_or_pane)
          ,	pane	= evtPane.call(this, evt_or_pane)
          ,	s		= state[pane]
          ,	delay	= options[pane].slideDelay_open
        ;
        if (pane === "center") return; // validate
        // prevent event from triggering on NEW resizer binding created below
        if (evt) evt.stopImmediatePropagation();

        if (s.isClosed && evt && evt.type === "mouseenter" && delay > 0)
        // trigger = mouseenter - use a delay
          timer.set(pane+"_openSlider", open_NOW, delay);
        else
          open_NOW(); // will unbind events if is already open

        /**
         * SUBROUTINE for timed open
         */
        function open_NOW () {
          if (!s.isClosed) // skip if no longer closed!
            bindStopSlidingEvents(pane, true); // BIND trigger events to close sliding-pane
          else if (!s.isMoving)
            open(pane, true); // true = slide - open() will handle binding
        };
      }

      ,	slideClose = function (evt_or_pane) {
        if (!isInitialized()) return;
        var	evt		= evtObj(evt_or_pane)
          ,	pane	= evtPane.call(this, evt_or_pane)
          ,	o		= options[pane]
          ,	s		= state[pane]
          ,	delay	= s.isMoving ? 1000 : 300 // MINIMUM delay - option may override
        ;
        if (pane === "center") return; // validate
        if (s.isClosed || s.isResizing)
          return; // skip if already closed OR in process of resizing
        else if (o.slideTrigger_close === "click")
          close_NOW(); // close immediately onClick
        else if (o.preventQuickSlideClose && s.isMoving)
          return; // handle Chrome quick-close on slide-open
        else if (o.preventPrematureSlideClose && evt && $.layout.isMouseOverElem(evt, $Ps[pane]))
          return; // handle incorrect mouseleave trigger, like when over a SELECT-list in IE
        else if (evt) // trigger = mouseleave - use a delay
        // 1 sec delay if 'opening', else .3 sec
          timer.set(pane+"_closeSlider", close_NOW, max(o.slideDelay_close, delay));
        else // called programically
          close_NOW();

        /**
         * SUBROUTINE for timed close
         */
        function close_NOW () {
          if (s.isClosed) // skip 'close' if already closed!
            bindStopSlidingEvents(pane, false); // UNBIND trigger events - TODO: is this needed here?
          else if (!s.isMoving)
            close(pane); // close will handle unbinding
        };
      }

      /**
       * @param {(string|Object)}	evt_or_pane		The pane being opened, ie: north, south, east, or west
       */
      ,	slideToggle = function (evt_or_pane) {
        var pane = evtPane.call(this, evt_or_pane);
        toggle(pane, true);
      }


      /**
       * Must set left/top on East/South panes so animation will work properly
       *
       * @param {string}	pane	The pane to lock, 'east' or 'south' - any other is ignored!
       * @param {boolean}	doLock  true = set left/top, false = remove
       */
      ,	lockPaneForFX = function (pane, doLock) {
        var $P	= $Ps[pane]
          ,	s	= state[pane]
          ,	o	= options[pane]
          ,	z	= options.zIndexes
        ;
        if (doLock) {
          showMasks( pane, { animation: true, objectsOnly: true });
          $P.css({ zIndex: z.pane_animate }); // overlay all elements during animation
          if (pane=="south")
            $P.css({ top: sC.inset.top + sC.innerHeight - $P.outerHeight() });
          else if (pane=="east")
            $P.css({ left: sC.inset.left + sC.innerWidth - $P.outerWidth() });
        }
        else { // animation DONE - RESET CSS
          hideMasks();
          $P.css({ zIndex: (s.isSliding ? z.pane_sliding : z.pane_normal) });
          if (pane=="south")
            $P.css({ top: "auto" });
          // if pane is positioned 'off-screen', then DO NOT screw with it!
          else if (pane=="east" && !$P.css("left").match(/\-99999/))
            $P.css({ left: "auto" });
          // fix anti-aliasing in IE - only needed for animations that change opacity
          if (browser.msie && o.fxOpacityFix && o.fxName_open != "slide" && $P.css("filter") && $P.css("opacity") == 1)
            $P[0].style.removeAttribute('filter');
        }
      }


      /**
       * Toggle sliding functionality of a specific pane on/off by adding removing 'slide open' trigger
       *
       * @see  open(), close()
       * @param {string}	pane	The pane to enable/disable, 'north', 'south', etc.
       * @param {boolean}	enable	Enable or Disable sliding?
       */
      ,	bindStartSlidingEvents = function (pane, enable) {
        var o		= options[pane]
          ,	$P		= $Ps[pane]
          ,	$R		= $Rs[pane]
          ,	evtName	= o.slideTrigger_open.toLowerCase()
        ;
        if (!$R || (enable && !o.slidable)) return;

        // make sure we have a valid event
        if (evtName.match(/mouseover/))
          evtName = o.slideTrigger_open = "mouseenter";
        else if (!evtName.match(/(click|dblclick|mouseenter)/))
          evtName = o.slideTrigger_open = "click";

        // must remove double-click-toggle when using dblclick-slide
        if (o.resizerDblClickToggle && evtName.match(/click/)) {
          $R[enable ? "unbind" : "bind"]('dblclick.'+ sID, toggle)
        }

        $R
          // add or remove event
          [enable ? "bind" : "unbind"](evtName +'.'+ sID, slideOpen)
        // set the appropriate cursor & title/tip
          .css("cursor", enable ? o.sliderCursor : "default")
          .attr("title", enable ? o.tips.Slide : "")
        ;
      }

      /**
       * Add or remove 'mouseleave' events to 'slide close' when pane is 'sliding' open or closed
       * Also increases zIndex when pane is sliding open
       * See bindStartSlidingEvents for code to control 'slide open'
       *
       * @see  slideOpen(), slideClose()
       * @param {string}	pane	The pane to process, 'north', 'south', etc.
       * @param {boolean}	enable	Enable or Disable events?
       */
      ,	bindStopSlidingEvents = function (pane, enable) {
        var	o		= options[pane]
          ,	s		= state[pane]
          ,	c		= _c[pane]
          ,	z		= options.zIndexes
          ,	evtName	= o.slideTrigger_close.toLowerCase()
          ,	action	= (enable ? "bind" : "unbind")
          ,	$P		= $Ps[pane]
          ,	$R		= $Rs[pane]
        ;
        timer.clear(pane+"_closeSlider"); // just in case

        if (enable) {
          s.isSliding = true;
          state.panesSliding[pane] = true;
          // remove 'slideOpen' event from resizer
          // ALSO will raise the zIndex of the pane & resizer
          bindStartSlidingEvents(pane, false);
        }
        else {
          s.isSliding = false;
          delete state.panesSliding[pane];
        }

        // RE/SET zIndex - increases when pane is sliding-open, resets to normal when not
        $P.css("zIndex", enable ? z.pane_sliding : z.pane_normal);
        $R.css("zIndex", enable ? z.pane_sliding+2 : z.resizer_normal); // NOTE: mask = pane_sliding+1

        // make sure we have a valid event
        if (!evtName.match(/(click|mouseleave)/))
          evtName = o.slideTrigger_close = "mouseleave"; // also catches 'mouseout'

        // add/remove slide triggers
        $R[action](evtName, slideClose); // base event on resize
        // need extra events for mouseleave
        if (evtName === "mouseleave") {
          // also close on pane.mouseleave
          $P[action]("mouseleave."+ sID, slideClose);
          // cancel timer when mouse moves between 'pane' and 'resizer'
          $R[action]("mouseenter."+ sID, cancelMouseOut);
          $P[action]("mouseenter."+ sID, cancelMouseOut);
        }

        if (!enable)
          timer.clear(pane+"_closeSlider");
        else if (evtName === "click" && !o.resizable) {
          // IF pane is not resizable (which already has a cursor and tip)
          // then set the a cursor & title/tip on resizer when sliding
          $R.css("cursor", enable ? o.sliderCursor : "default");
          $R.attr("title", enable ? o.tips.Close : ""); // use Toggler-tip, eg: "Close Pane"
        }

        // SUBROUTINE for mouseleave timer clearing
        function cancelMouseOut (evt) {
          timer.clear(pane+"_closeSlider");
          evt.stopPropagation();
        }
      }


      /**
       * Hides/closes a pane if there is insufficient room - reverses this when there is room again
       * MUST have already called setSizeLimits() before calling this method
       *
       * @param {string}	pane					The pane being resized
       * @param {boolean=}	[isOpening=false]		Called from onOpen?
       * @param {boolean=}	[skipCallback=false]	Should the onresize callback be run?
       * @param {boolean=}	[force=false]
       */
      ,	makePaneFit = function (pane, isOpening, skipCallback, force) {
        var	o	= options[pane]
          ,	s	= state[pane]
          ,	c	= _c[pane]
          ,	$P	= $Ps[pane]
          ,	$R	= $Rs[pane]
          ,	isSidePane 	= c.dir==="vert"
          ,	hasRoom		= false
        ;
        // special handling for center & east/west panes
        if (pane === "center" || (isSidePane && s.noVerticalRoom)) {
          // see if there is enough room to display the pane
          // ERROR: hasRoom = s.minHeight <= s.maxHeight && (isSidePane || s.minWidth <= s.maxWidth);
          hasRoom = (s.maxHeight >= 0);
          if (hasRoom && s.noRoom) { // previously hidden due to noRoom, so show now
            _showPane(pane);
            if ($R) $R.show();
            s.isVisible = true;
            s.noRoom = false;
            if (isSidePane) s.noVerticalRoom = false;
            _fixIframe(pane);
          }
          else if (!hasRoom && !s.noRoom) { // not currently hidden, so hide now
            _hidePane(pane);
            if ($R) $R.hide();
            s.isVisible = false;
            s.noRoom = true;
          }
        }

        // see if there is enough room to fit the border-pane
        if (pane === "center") {
          // ignore center in this block
        }
        else if (s.minSize <= s.maxSize) { // pane CAN fit
          hasRoom = true;
          if (s.size > s.maxSize) // pane is too big - shrink it
            sizePane(pane, s.maxSize, skipCallback, true, force); // true = noAnimation
          else if (s.size < s.minSize) // pane is too small - enlarge it
            sizePane(pane, s.minSize, skipCallback, true, force); // true = noAnimation
          // need s.isVisible because new pseudoClose method keeps pane visible, but off-screen
          else if ($R && s.isVisible && $P.is(":visible")) {
            // make sure resizer-bar is positioned correctly
            // handles situation where nested layout was 'hidden' when initialized
            var	pos = s.size + sC.inset[c.side];
            if ($.layout.cssNum( $R, c.side ) != pos) $R.css( c.side, pos );
          }

          // if was previously hidden due to noRoom, then RESET because NOW there is room
          if (s.noRoom) {
            // s.noRoom state will be set by open or show
            if (s.wasOpen && o.closable) {
              if (o.autoReopen)
                open(pane, false, true, true); // true = noAnimation, true = noAlert
              else // leave the pane closed, so just update state
                s.noRoom = false;
            }
            else
              show(pane, s.wasOpen, true, true); // true = noAnimation, true = noAlert
          }
        }
        else { // !hasRoom - pane CANNOT fit
          if (!s.noRoom) { // pane not set as noRoom yet, so hide or close it now...
            s.noRoom = true; // update state
            s.wasOpen = !s.isClosed && !s.isSliding;
            if (s.isClosed){} // SKIP
            else if (o.closable) // 'close' if possible
              close(pane, true, true); // true = force, true = noAnimation
            else // 'hide' pane if cannot just be closed
              hide(pane, true); // true = noAnimation
          }
        }
      }


      /**
       * manualSizePane is an exposed flow-through method allowing extra code when pane is 'manually resized'
       *
       * @param {(string|Object)}	evt_or_pane				The pane being resized
       * @param {number}			size					The *desired* new size for this pane - will be validated
       * @param {boolean=}			[skipCallback=false]	Should the onresize callback be run?
       * @param {boolean=}			[noAnimation=false]
       * @param {boolean=}			[force=false]			Force resizing even if does not seem necessary
       */
      ,	manualSizePane = function (evt_or_pane, size, skipCallback, noAnimation, force) {
        if (!isInitialized()) return;
        var	pane = evtPane.call(this, evt_or_pane)
          ,	o	= options[pane]
          ,	s	= state[pane]
          //	if resizing callbacks have been delayed and resizing is now DONE, force resizing to complete...
          ,	forceResize = force || (o.livePaneResizing && !s.isResizing)
        ;
        if (pane === "center") return; // validate
        // ANY call to manualSizePane disables autoResize - ie, percentage sizing
        s.autoResize = false;
        // flow-through...
        sizePane(pane, size, skipCallback, noAnimation, forceResize); // will animate resize if option enabled
      }

      /**
       * sizePane is called only by internal methods whenever a pane needs to be resized
       *
       * @param {(string|Object)}	evt_or_pane				The pane being resized
       * @param {number}			size					The *desired* new size for this pane - will be validated
       * @param {boolean=}			[skipCallback=false]	Should the onresize callback be run?
       * @param {boolean=}			[noAnimation=false]
       * @param {boolean=}			[force=false]			Force resizing even if does not seem necessary
       */
      ,	sizePane = function (evt_or_pane, size, skipCallback, noAnimation, force) {
        if (!isInitialized()) return;
        var	pane	= evtPane.call(this, evt_or_pane) // probably NEVER called from event?
          ,	o		= options[pane]
          ,	s		= state[pane]
          ,	$P		= $Ps[pane]
          ,	$R		= $Rs[pane]
          ,	side	= _c[pane].side
          ,	dimName	= _c[pane].sizeType.toLowerCase()
          ,	skipResizeWhileDragging = s.isResizing && !o.triggerEventsDuringLiveResize
          ,	doFX	= noAnimation !== true && o.animatePaneSizing
          ,	oldSize, newSize
        ;
        if (pane === "center") return; // validate
        // QUEUE in case another action/animation is in progress
        $N.queue(function( queueNext ){
          // calculate 'current' min/max sizes
          setSizeLimits(pane); // update pane-state
          oldSize = s.size;
          size = _parseSize(pane, size); // handle percentages & auto
          size = max(size, _parseSize(pane, o.minSize));
          size = min(size, s.maxSize);
          if (size < s.minSize) { // not enough room for pane!
            queueNext(); // call before makePaneFit() because it needs the queue free
            makePaneFit(pane, false, skipCallback);	// will hide or close pane
            return;
          }

          // IF newSize is same as oldSize, then nothing to do - abort
          if (!force && size === oldSize)
            return queueNext();

          s.newSize = size;

          // onresize_start callback CANNOT cancel resizing because this would break the layout!
          if (!skipCallback && state.initialized && s.isVisible)
            _runCallbacks("onresize_start", pane);

          // resize the pane, and make sure its visible
          newSize = cssSize(pane, size);

          if (doFX && $P.is(":visible")) { // ANIMATE
            var fx		= $.layout.effects.size[pane] || $.layout.effects.size.all
              ,	easing	= o.fxSettings_size.easing || fx.easing
              ,	z		= options.zIndexes
              ,	props	= {};
            props[ dimName ] = newSize +'px';
            s.isMoving = true;
            // overlay all elements during animation
            $P.css({ zIndex: z.pane_animate })
              .show().animate( props, o.fxSpeed_size, easing, function(){
              // reset zIndex after animation
              $P.css({ zIndex: (s.isSliding ? z.pane_sliding : z.pane_normal) });
              s.isMoving = false;
              delete s.newSize;
              sizePane_2(); // continue
              queueNext();
            });
          }
          else { // no animation
            $P.css( dimName, newSize );	// resize pane
            delete s.newSize;
            // if pane is visible, then
            if ($P.is(":visible"))
              sizePane_2(); // continue
            else {
              // pane is NOT VISIBLE, so just update state data...
              // when pane is *next opened*, it will have the new size
              s.size = size;				// update state.size
              //$.extend(s, elDims($P));	// update state dimensions - CANNOT do this when not visible!				}
            }
            queueNext();
          };

        });

        // SUBROUTINE
        function sizePane_2 () {
          /*	Panes are sometimes not sized precisely in some browsers!?
           *	This code will resize the pane up to 3 times to nudge the pane to the correct size
           */
          var	actual	= dimName==='width' ? $P.outerWidth() : $P.outerHeight()
            ,	tries	= [{
              pane:		pane
              ,	count:		1
              ,	target:		size
              ,	actual:		actual
              ,	correct:	(size === actual)
              ,	attempt:	size
              ,	cssSize:	newSize
            }]
            ,	lastTry = tries[0]
            ,	thisTry	= {}
            ,	msg		= 'Inaccurate size after resizing the '+ pane +'-pane.'
          ;
          while ( !lastTry.correct ) {
            thisTry = { pane: pane, count: lastTry.count+1, target: size };

            if (lastTry.actual > size)
              thisTry.attempt = max(0, lastTry.attempt - (lastTry.actual - size));
            else // lastTry.actual < size
              thisTry.attempt = max(0, lastTry.attempt + (size - lastTry.actual));

            thisTry.cssSize = cssSize(pane, thisTry.attempt);
            $P.css( dimName, thisTry.cssSize );

            thisTry.actual	= dimName=='width' ? $P.outerWidth() : $P.outerHeight();
            thisTry.correct	= (size === thisTry.actual);

            // log attempts and alert the user of this *non-fatal error* (if showDebugMessages)
            if ( tries.length === 1) {
              _log(msg, false, true);
              _log(lastTry, false, true);
            }
            _log(thisTry, false, true);
            // after 4 tries, is as close as its gonna get!
            if (tries.length > 3) break;

            tries.push( thisTry );
            lastTry = tries[ tries.length - 1 ];
          }
          // END TESTING CODE

          // update pane-state dimensions
          s.size	= size;
          $.extend(s, elDims($P));

          if (s.isVisible && $P.is(":visible")) {
            // reposition the resizer-bar
            if ($R) $R.css( side, size + sC.inset[side] );
            // resize the content-div
            sizeContent(pane);
          }

          if (!skipCallback && !skipResizeWhileDragging && state.initialized && s.isVisible)
            _runCallbacks("onresize_end", pane);

          // resize all the adjacent panes, and adjust their toggler buttons
          // when skipCallback passed, it means the controlling method will handle 'other panes'
          if (!skipCallback) {
            // also no callback if live-resize is in progress and NOT triggerEventsDuringLiveResize
            if (!s.isSliding) sizeMidPanes(_c[pane].dir=="horz" ? "" : "center", skipResizeWhileDragging, force);
            sizeHandles();
          }

          // if opposite-pane was autoClosed, see if it can be autoOpened now
          var altPane = _c.oppositeEdge[pane];
          if (size < oldSize && state[ altPane ].noRoom) {
            setSizeLimits( altPane );
            makePaneFit( altPane, false, skipCallback );
          }

          // DEBUG - ALERT user/developer so they know there was a sizing problem
          if (tries.length > 1)
            _log(msg +'\nSee the Error Console for details.', true, true);
        }
      }

      /**
       * @see  initPanes(), sizePane(), 	resizeAll(), open(), close(), hide()
       * @param {(Array.<string>|string)}	panes					The pane(s) being resized, comma-delmited string
       * @param {boolean=}					[skipCallback=false]	Should the onresize callback be run?
       * @param {boolean=}					[force=false]
       */
      ,	sizeMidPanes = function (panes, skipCallback, force) {
        panes = (panes ? panes : "east,west,center").split(",");

        $.each(panes, function (i, pane) {
          if (!$Ps[pane]) return; // NO PANE - skip
          var
            o		= options[pane]
            ,	s		= state[pane]
            ,	$P		= $Ps[pane]
            ,	$R		= $Rs[pane]
            ,	isCenter= (pane=="center")
            ,	hasRoom	= true
            ,	CSS		= {}
            //	if pane is not visible, show it invisibly NOW rather than for *each call* in this script
            ,	visCSS	= $.layout.showInvisibly($P)

            ,	newCenter	= calcNewCenterPaneDims()
          ;

          // update pane-state dimensions
          $.extend(s, elDims($P));

          if (pane === "center") {
            if (!force && s.isVisible && newCenter.width === s.outerWidth && newCenter.height === s.outerHeight) {
              $P.css(visCSS);
              return true; // SKIP - pane already the correct size
            }
            // set state for makePaneFit() logic
            $.extend(s, cssMinDims(pane), {
              maxWidth:	newCenter.width
              ,	maxHeight:	newCenter.height
            });
            CSS = newCenter;
            s.newWidth	= CSS.width;
            s.newHeight	= CSS.height;
            // convert OUTER width/height to CSS width/height
            CSS.width	= cssW($P, CSS.width);
            // NEW - allow pane to extend 'below' visible area rather than hide it
            CSS.height	= cssH($P, CSS.height);
            hasRoom		= CSS.width >= 0 && CSS.height >= 0; // height >= 0 = ALWAYS TRUE NOW

            // during layout init, try to shrink east/west panes to make room for center
            if (!state.initialized && o.minWidth > newCenter.width) {
              var
                reqPx	= o.minWidth - s.outerWidth
                ,	minE	= options.east.minSize || 0
                ,	minW	= options.west.minSize || 0
                ,	sizeE	= state.east.size
                ,	sizeW	= state.west.size
                ,	newE	= sizeE
                ,	newW	= sizeW
              ;
              if (reqPx > 0 && state.east.isVisible && sizeE > minE) {
                newE = max( sizeE-minE, sizeE-reqPx );
                reqPx -= sizeE-newE;
              }
              if (reqPx > 0 && state.west.isVisible && sizeW > minW) {
                newW = max( sizeW-minW, sizeW-reqPx );
                reqPx -= sizeW-newW;
              }
              // IF we found enough extra space, then resize the border panes as calculated
              if (reqPx === 0) {
                if (sizeE && sizeE != minE)
                  sizePane('east', newE, true, true, force); // true = skipCallback/noAnimation - initPanes will handle when done
                if (sizeW && sizeW != minW)
                  sizePane('west', newW, true, true, force); // true = skipCallback/noAnimation
                // now start over!
                sizeMidPanes('center', skipCallback, force);
                $P.css(visCSS);
                return; // abort this loop
              }
            }
          }
          else { // for east and west, set only the height, which is same as center height
            // set state.min/maxWidth/Height for makePaneFit() logic
            if (s.isVisible && !s.noVerticalRoom)
              $.extend(s, elDims($P), cssMinDims(pane))
            if (!force && !s.noVerticalRoom && newCenter.height === s.outerHeight) {
              $P.css(visCSS);
              return true; // SKIP - pane already the correct size
            }
            // east/west have same top, bottom & height as center
            CSS.top		= newCenter.top;
            CSS.bottom	= newCenter.bottom;
            s.newSize	= newCenter.height
            // NEW - allow pane to extend 'below' visible area rather than hide it
            CSS.height	= cssH($P, newCenter.height);
            s.maxHeight	= CSS.height;
            hasRoom		= (s.maxHeight >= 0); // ALWAYS TRUE NOW
            if (!hasRoom) s.noVerticalRoom = true; // makePaneFit() logic
          }

          if (hasRoom) {
            // resizeAll passes skipCallback because it triggers callbacks after ALL panes are resized
            if (!skipCallback && state.initialized)
              _runCallbacks("onresize_start", pane);

            $P.css(CSS); // apply the CSS to pane
            if (pane !== "center")
              sizeHandles(pane); // also update resizer length
            if (s.noRoom && !s.isClosed && !s.isHidden)
              makePaneFit(pane); // will re-open/show auto-closed/hidden pane
            if (s.isVisible) {
              $.extend(s, elDims($P)); // update pane dimensions
              if (state.initialized) sizeContent(pane); // also resize the contents, if exists
            }
          }
          else if (!s.noRoom && s.isVisible) // no room for pane
            makePaneFit(pane); // will hide or close pane

          // reset visibility, if necessary
          $P.css(visCSS);

          delete s.newSize;
          delete s.newWidth;
          delete s.newHeight;

          if (!s.isVisible)
            return true; // DONE - next pane

          /*
           * Extra CSS for IE6 or IE7 in Quirks-mode - add 'width' to NORTH/SOUTH panes
           * Normally these panes have only 'left' & 'right' positions so pane auto-sizes
           * ALSO required when pane is an IFRAME because will NOT default to 'full width'
           *	TODO: Can I use width:100% for a north/south iframe?
           *	TODO: Sounds like a job for $P.outerWidth( sC.innerWidth ) SETTER METHOD
           */
          if (pane === "center") { // finished processing midPanes
            var fix = browser.isIE6 || !browser.boxModel;
            if ($Ps.north && (fix || state.north.tagName=="IFRAME"))
              $Ps.north.css("width", cssW($Ps.north, sC.innerWidth));
            if ($Ps.south && (fix || state.south.tagName=="IFRAME"))
              $Ps.south.css("width", cssW($Ps.south, sC.innerWidth));
          }

          // resizeAll passes skipCallback because it triggers callbacks after ALL panes are resized
          if (!skipCallback && state.initialized)
            _runCallbacks("onresize_end", pane);
        });
      }


      /**
       * @see  window.onresize(), callbacks or custom code
       * @param {(Object|boolean)=}	evt_or_refresh	If 'true', then also reset pane-positioning
       */
      ,	resizeAll = function (evt_or_refresh) {
        var	oldW	= sC.innerWidth
          ,	oldH	= sC.innerHeight
        ;
        // stopPropagation if called by trigger("layoutdestroy") - use evtPane utility
        evtPane(evt_or_refresh);

        // cannot size layout when 'container' is hidden or collapsed
        if (!$N.is(":visible")) return;

        if (!state.initialized) {
          _initLayoutElements();
          return; // no need to resize since we just initialized!
        }

        if (evt_or_refresh === true && $.isPlainObject(options.outset)) {
          // update container CSS in case outset option has changed
          $N.css( options.outset );
        }
        // UPDATE container dimensions
        $.extend(sC, elDims( $N, options.inset ));
        if (!sC.outerHeight) return;

        // if 'true' passed, refresh pane & handle positioning too
        if (evt_or_refresh === true) {
          setPanePosition();
        }

        // onresizeall_start will CANCEL resizing if returns false
        // state.container has already been set, so user can access this info for calcuations
        if (false === _runCallbacks("onresizeall_start")) return false;

        var	// see if container is now 'smaller' than before
          shrunkH	= (sC.innerHeight < oldH)
          ,	shrunkW	= (sC.innerWidth < oldW)
          ,	$P, o, s
        ;
        // NOTE special order for sizing: S-N-E-W
        $.each(["south","north","east","west"], function (i, pane) {
          if (!$Ps[pane]) return; // no pane - SKIP
          o = options[pane];
          s = state[pane];
          if (s.autoResize && s.size != o.size) // resize pane to original size set in options
            sizePane(pane, o.size, true, true, true); // true=skipCallback/noAnimation/forceResize
          else {
            setSizeLimits(pane);
            makePaneFit(pane, false, true, true); // true=skipCallback/forceResize
          }
        });

        sizeMidPanes("", true, true); // true=skipCallback/forceResize
        sizeHandles(); // reposition the toggler elements

        // trigger all individual pane callbacks AFTER layout has finished resizing
        $.each(_c.allPanes, function (i, pane) {
          $P = $Ps[pane];
          if (!$P) return; // SKIP
          if (state[pane].isVisible) // undefined for non-existent panes
            _runCallbacks("onresize_end", pane); // callback - if exists
        });

        _runCallbacks("onresizeall_end");
        //_triggerLayoutEvent(pane, 'resizeall');
      }

      /**
       * Whenever a pane resizes or opens that has a nested layout, trigger resizeAll
       *
       * @param {(string|Object)}	evt_or_pane		The pane just resized or opened
       */
      ,	resizeChildren = function (evt_or_pane, skipRefresh) {
        var	pane = evtPane.call(this, evt_or_pane);

        if (!options[pane].resizeChildren) return;

        // ensure the pane-children are up-to-date
        if (!skipRefresh) refreshChildren( pane );
        var pC = children[pane];
        if ($.isPlainObject( pC )) {
          // resize one or more children
          $.each( pC, function (key, child) {
            if (!child.destroyed) child.resizeAll();
          });
        }
      }

      /**
       * IF pane has a content-div, then resize all elements inside pane to fit pane-height
       *
       * @param {(string|Object)}	evt_or_panes		The pane(s) being resized
       * @param {boolean=}			[remeasure=false]	Should the content (header/footer) be remeasured?
       */
      ,	sizeContent = function (evt_or_panes, remeasure) {
        if (!isInitialized()) return;

        var panes = evtPane.call(this, evt_or_panes);
        panes = panes ? panes.split(",") : _c.allPanes;

        $.each(panes, function (idx, pane) {
          var
            $P	= $Ps[pane]
            ,	$C	= $Cs[pane]
            ,	o	= options[pane]
            ,	s	= state[pane]
            ,	m	= s.content // m = measurements
          ;
          if (!$P || !$C || !$P.is(":visible")) return true; // NOT VISIBLE - skip

          // if content-element was REMOVED, update OR remove the pointer
          if (!$C.length) {
            initContent(pane, false);	// false = do NOT sizeContent() - already there!
            if (!$C) return;			// no replacement element found - pointer have been removed
          }

          // onsizecontent_start will CANCEL resizing if returns false
          if (false === _runCallbacks("onsizecontent_start", pane)) return;

          // skip re-measuring offsets if live-resizing
          if ((!s.isMoving && !s.isResizing) || o.liveContentResizing || remeasure || m.top == undefined) {
            _measure();
            // if any footers are below pane-bottom, they may not measure correctly,
            // so allow pane overflow and re-measure
            if (m.hiddenFooters > 0 && $P.css("overflow") === "hidden") {
              $P.css("overflow", "visible");
              _measure(); // remeasure while overflowing
              $P.css("overflow", "hidden");
            }
          }
          // NOTE: spaceAbove/Below *includes* the pane paddingTop/Bottom, but not pane.borders
          var newH = s.innerHeight - (m.spaceAbove - s.css.paddingTop) - (m.spaceBelow - s.css.paddingBottom);

          if (!$C.is(":visible") || m.height != newH) {
            // size the Content element to fit new pane-size - will autoHide if not enough room
            setOuterHeight($C, newH, true); // true=autoHide
            m.height = newH; // save new height
          };

          if (state.initialized)
            _runCallbacks("onsizecontent_end", pane);

          function _below ($E) {
            return max(s.css.paddingBottom, (parseInt($E.css("marginBottom"), 10) || 0));
          };

          function _measure () {
            var
              ignore	= options[pane].contentIgnoreSelector
              ,	$Fs		= $C.nextAll().not(".ui-layout-mask").not(ignore || ":lt(0)") // not :lt(0) = ALL
              ,	$Fs_vis	= $Fs.filter(':visible')
              ,	$F		= $Fs_vis.filter(':last')
            ;
            m = {
              top:			$C[0].offsetTop
              ,	height:			$C.outerHeight()
              ,	numFooters:		$Fs.length
              ,	hiddenFooters:	$Fs.length - $Fs_vis.length
              ,	spaceBelow:		0 // correct if no content footer ($E)
            }
            m.spaceAbove	= m.top; // just for state - not used in calc
            m.bottom		= m.top + m.height;
            if ($F.length)
            //spaceBelow = (LastFooter.top + LastFooter.height) [footerBottom] - Content.bottom + max(LastFooter.marginBottom, pane.paddingBotom)
              m.spaceBelow = ($F[0].offsetTop + $F.outerHeight()) - m.bottom + _below($F);
            else // no footer - check marginBottom on Content element itself
              m.spaceBelow = _below($C);
          };
        });
      }


      /**
       * Called every time a pane is opened, closed, or resized to slide the togglers to 'center' and adjust their length if necessary
       *
       * @see  initHandles(), open(), close(), resizeAll()
       * @param {(string|Object)=}		evt_or_panes	The pane(s) being resized
       */
      ,	sizeHandles = function (evt_or_panes) {
        var panes = evtPane.call(this, evt_or_panes)
        panes = panes ? panes.split(",") : _c.borderPanes;

        $.each(panes, function (i, pane) {
          var
            o	= options[pane]
            ,	s	= state[pane]
            ,	$P	= $Ps[pane]
            ,	$R	= $Rs[pane]
            ,	$T	= $Ts[pane]
            ,	$TC
          ;
          if (!$P || !$R) return;

          var
            dir			= _c[pane].dir
            ,	_state		= (s.isClosed ? "_closed" : "_open")
            ,	spacing		= o["spacing"+ _state]
            ,	togAlign	= o["togglerAlign"+ _state]
            ,	togLen		= o["togglerLength"+ _state]
            ,	paneLen
            ,	left
            ,	offset
            ,	CSS = {}
          ;

          if (spacing === 0) {
            $R.hide();
            return;
          }
          else if (!s.noRoom && !s.isHidden) // skip if resizer was hidden for any reason
            $R.show(); // in case was previously hidden

          // Resizer Bar is ALWAYS same width/height of pane it is attached to
          if (dir === "horz") { // north/south
            //paneLen = $P.outerWidth(); // s.outerWidth ||
            paneLen = sC.innerWidth; // handle offscreen-panes
            s.resizerLength = paneLen;
            left = $.layout.cssNum($P, "left")
            $R.css({
              width:	cssW($R, paneLen) // account for borders & padding
              ,	height:	cssH($R, spacing) // ditto
              ,	left:	left > -9999 ? left : sC.inset.left // handle offscreen-panes
            });
          }
          else { // east/west
            paneLen = $P.outerHeight(); // s.outerHeight ||
            s.resizerLength = paneLen;
            $R.css({
              height:	cssH($R, paneLen) // account for borders & padding
              ,	width:	cssW($R, spacing) // ditto
              ,	top:	sC.inset.top + getPaneSize("north", true) // TODO: what if no North pane?
              //,	top:	$.layout.cssNum($Ps["center"], "top")
            });
          }

          // remove hover classes
          removeHover( o, $R );

          if ($T) {
            if (togLen === 0 || (s.isSliding && o.hideTogglerOnSlide)) {
              $T.hide(); // always HIDE the toggler when 'sliding'
              return;
            }
            else
              $T.show(); // in case was previously hidden

            if (!(togLen > 0) || togLen === "100%" || togLen > paneLen) {
              togLen = paneLen;
              offset = 0;
            }
            else { // calculate 'offset' based on options.PANE.togglerAlign_open/closed
              if (isStr(togAlign)) {
                switch (togAlign) {
                  case "top":
                  case "left":	offset = 0;
                    break;
                  case "bottom":
                  case "right":	offset = paneLen - togLen;
                    break;
                  case "middle":
                  case "center":
                  default:		offset = round((paneLen - togLen) / 2); // 'default' catches typos
                }
              }
              else { // togAlign = number
                var x = parseInt(togAlign, 10); //
                if (togAlign >= 0) offset = x;
                else offset = paneLen - togLen + x; // NOTE: x is negative!
              }
            }

            if (dir === "horz") { // north/south
              var width = cssW($T, togLen);
              $T.css({
                width:	width  // account for borders & padding
                ,	height:	cssH($T, spacing) // ditto
                ,	left:	offset // TODO: VERIFY that toggler  positions correctly for ALL values
                ,	top:	0
              });
              // CENTER the toggler content SPAN
              $T.children(".content").each(function(){
                $TC = $(this);
                $TC.css("marginLeft", round((width-$TC.outerWidth())/2)); // could be negative
              });
            }
            else { // east/west
              var height = cssH($T, togLen);
              $T.css({
                height:	height // account for borders & padding
                ,	width:	cssW($T, spacing) // ditto
                ,	top:	offset // POSITION the toggler
                ,	left:	0
              });
              // CENTER the toggler content SPAN
              $T.children(".content").each(function(){
                $TC = $(this);
                $TC.css("marginTop", round((height-$TC.outerHeight())/2)); // could be negative
              });
            }

            // remove ALL hover classes
            removeHover( 0, $T );
          }

          // DONE measuring and sizing this resizer/toggler, so can be 'hidden' now
          if (!state.initialized && (o.initHidden || s.isHidden)) {
            $R.hide();
            if ($T) $T.hide();
          }
        });
      }


      /**
       * @param {(string|Object)}	evt_or_pane
       */
      ,	enableClosable = function (evt_or_pane) {
        if (!isInitialized()) return;
        var	pane = evtPane.call(this, evt_or_pane)
          ,	$T	= $Ts[pane]
          ,	o	= options[pane]
        ;
        if (!$T) return;
        o.closable = true;
        $T	.bind("click."+ sID, function(evt){ evt.stopPropagation(); toggle(pane); })
          .css("visibility", "visible")
          .css("cursor", "pointer")
          .attr("title", state[pane].isClosed ? o.tips.Open : o.tips.Close) // may be blank
          .show();
      }
      /**
       * @param {(string|Object)}	evt_or_pane
       * @param {boolean=}			[hide=false]
       */
      ,	disableClosable = function (evt_or_pane, hide) {
        if (!isInitialized()) return;
        var	pane = evtPane.call(this, evt_or_pane)
          ,	$T	= $Ts[pane]
        ;
        if (!$T) return;
        options[pane].closable = false;
        // is closable is disable, then pane MUST be open!
        if (state[pane].isClosed) open(pane, false, true);
        $T	.unbind("."+ sID)
          .css("visibility", hide ? "hidden" : "visible") // instead of hide(), which creates logic issues
          .css("cursor", "default")
          .attr("title", "");
      }


      /**
       * @param {(string|Object)}	evt_or_pane
       */
      ,	enableSlidable = function (evt_or_pane) {
        if (!isInitialized()) return;
        var	pane = evtPane.call(this, evt_or_pane)
          ,	$R	= $Rs[pane]
        ;
        if (!$R || !$R.data('draggable')) return;
        options[pane].slidable = true;
        if (state[pane].isClosed)
          bindStartSlidingEvents(pane, true);
      }
      /**
       * @param {(string|Object)}	evt_or_pane
       */
      ,	disableSlidable = function (evt_or_pane) {
        if (!isInitialized()) return;
        var	pane = evtPane.call(this, evt_or_pane)
          ,	$R	= $Rs[pane]
        ;
        if (!$R) return;
        options[pane].slidable = false;
        if (state[pane].isSliding)
          close(pane, false, true);
        else {
          bindStartSlidingEvents(pane, false);
          $R	.css("cursor", "default")
            .attr("title", "");
          removeHover(null, $R[0]); // in case currently hovered
        }
      }


      /**
       * @param {(string|Object)}	evt_or_pane
       */
      ,	enableResizable = function (evt_or_pane) {
        if (!isInitialized()) return;
        var	pane = evtPane.call(this, evt_or_pane)
          ,	$R	= $Rs[pane]
          ,	o	= options[pane]
        ;
        if (!$R || !$R.data('draggable')) return;
        o.resizable = true;
        $R.draggable("enable");
        if (!state[pane].isClosed)
          $R	.css("cursor", o.resizerCursor)
            .attr("title", o.tips.Resize);
      }
      /**
       * @param {(string|Object)}	evt_or_pane
       */
      ,	disableResizable = function (evt_or_pane) {
        if (!isInitialized()) return;
        var	pane = evtPane.call(this, evt_or_pane)
          ,	$R	= $Rs[pane]
        ;
        if (!$R || !$R.data('draggable')) return;
        options[pane].resizable = false;
        $R	.draggable("disable")
          .css("cursor", "default")
          .attr("title", "");
        removeHover(null, $R[0]); // in case currently hovered
      }


      /**
       * Move a pane from source-side (eg, west) to target-side (eg, east)
       * If pane exists on target-side, move that to source-side, ie, 'swap' the panes
       *
       * @param {(string|Object)}	evt_or_pane1	The pane/edge being swapped
       * @param {string}			pane2			ditto
       */
      ,	swapPanes = function (evt_or_pane1, pane2) {
        if (!isInitialized()) return;
        var pane1 = evtPane.call(this, evt_or_pane1);
        // change state.edge NOW so callbacks can know where pane is headed...
        state[pane1].edge = pane2;
        state[pane2].edge = pane1;
        // run these even if NOT state.initialized
        if (false === _runCallbacks("onswap_start", pane1)
          ||	false === _runCallbacks("onswap_start", pane2)
        ) {
          state[pane1].edge = pane1; // reset
          state[pane2].edge = pane2;
          return;
        }

        var
          oPane1	= copy( pane1 )
          ,	oPane2	= copy( pane2 )
          ,	sizes	= {}
        ;
        sizes[pane1] = oPane1 ? oPane1.state.size : 0;
        sizes[pane2] = oPane2 ? oPane2.state.size : 0;

        // clear pointers & state
        $Ps[pane1] = false;
        $Ps[pane2] = false;
        state[pane1] = {};
        state[pane2] = {};

        // ALWAYS remove the resizer & toggler elements
        if ($Ts[pane1]) $Ts[pane1].remove();
        if ($Ts[pane2]) $Ts[pane2].remove();
        if ($Rs[pane1]) $Rs[pane1].remove();
        if ($Rs[pane2]) $Rs[pane2].remove();
        $Rs[pane1] = $Rs[pane2] = $Ts[pane1] = $Ts[pane2] = false;

        // transfer element pointers and data to NEW Layout keys
        move( oPane1, pane2 );
        move( oPane2, pane1 );

        // cleanup objects
        oPane1 = oPane2 = sizes = null;

        // make panes 'visible' again
        if ($Ps[pane1]) $Ps[pane1].css(_c.visible);
        if ($Ps[pane2]) $Ps[pane2].css(_c.visible);

        // fix any size discrepancies caused by swap
        resizeAll();

        // run these even if NOT state.initialized
        _runCallbacks("onswap_end", pane1);
        _runCallbacks("onswap_end", pane2);

        return;

        function copy (n) { // n = pane
          var
            $P	= $Ps[n]
            ,	$C	= $Cs[n]
          ;
          return !$P ? false : {
            pane:		n
            ,	P:			$P ? $P[0] : false
            ,	C:			$C ? $C[0] : false
            ,	state:		$.extend(true, {}, state[n])
            ,	options:	$.extend(true, {}, options[n])
          }
        };

        function move (oPane, pane) {
          if (!oPane) return;
          var
            P		= oPane.P
            ,	C		= oPane.C
            ,	oldPane = oPane.pane
            ,	c		= _c[pane]
            //	save pane-options that should be retained
            ,	s		= $.extend(true, {}, state[pane])
            ,	o		= options[pane]
            //	RETAIN side-specific FX Settings - more below
            ,	fx		= { resizerCursor: o.resizerCursor }
            ,	re, size, pos
          ;
          $.each("fxName,fxSpeed,fxSettings".split(","), function (i, k) {
            fx[k +"_open"]  = o[k +"_open"];
            fx[k +"_close"] = o[k +"_close"];
            fx[k +"_size"]  = o[k +"_size"];
          });

          // update object pointers and attributes
          $Ps[pane] = $(P)
            .data({
              layoutPane:		Instance[pane]	// NEW pointer to pane-alias-object
              ,	layoutEdge:		pane
            })
            .css(_c.hidden)
            .css(c.cssReq)
          ;
          $Cs[pane] = C ? $(C) : false;

          // set options and state
          options[pane]	= $.extend(true, {}, oPane.options, fx);
          state[pane]		= $.extend(true, {}, oPane.state);

          // change classNames on the pane, eg: ui-layout-pane-east ==> ui-layout-pane-west
          re = new RegExp(o.paneClass +"-"+ oldPane, "g");
          P.className = P.className.replace(re, o.paneClass +"-"+ pane);

          // ALWAYS regenerate the resizer & toggler elements
          initHandles(pane); // create the required resizer & toggler

          // if moving to different orientation, then keep 'target' pane size
          if (c.dir != _c[oldPane].dir) {
            size = sizes[pane] || 0;
            setSizeLimits(pane); // update pane-state
            size = max(size, state[pane].minSize);
            // use manualSizePane to disable autoResize - not useful after panes are swapped
            manualSizePane(pane, size, true, true); // true/true = skipCallback/noAnimation
          }
          else // move the resizer here
            $Rs[pane].css(c.side, sC.inset[c.side] + (state[pane].isVisible ? getPaneSize(pane) : 0));


          // ADD CLASSNAMES & SLIDE-BINDINGS
          if (oPane.state.isVisible && !s.isVisible)
            setAsOpen(pane, true); // true = skipCallback
          else {
            setAsClosed(pane);
            bindStartSlidingEvents(pane, true); // will enable events IF option is set
          }

          // DESTROY the object
          oPane = null;
        };
      }


      /**
       * INTERNAL method to sync pin-buttons when pane is opened or closed
       * Unpinned means the pane is 'sliding' - ie, over-top of the adjacent panes
       *
       * @see  open(), setAsOpen(), setAsClosed()
       * @param {string}	pane   These are the params returned to callbacks by layout()
       * @param {boolean}	doPin  True means set the pin 'down', False means 'up'
       */
      ,	syncPinBtns = function (pane, doPin) {
        if ($.layout.plugins.buttons)
          $.each(state[pane].pins, function (i, selector) {
            $.layout.buttons.setPinState(Instance, $(selector), pane, doPin);
          });
      }

    ;	// END var DECLARATIONS

    /**
     * Capture keys when enableCursorHotkey - toggle pane if hotkey pressed
     *
     * @see  document.keydown()
     */
    function keyDown (evt) {
      if (!evt) return true;
      var code = evt.keyCode;
      if (code < 33) return true; // ignore special keys: ENTER, TAB, etc

      var
        PANE = {
          38: "north" // Up Cursor	- $.ui.keyCode.UP
          ,	40: "south" // Down Cursor	- $.ui.keyCode.DOWN
          ,	37: "west"  // Left Cursor	- $.ui.keyCode.LEFT
          ,	39: "east"  // Right Cursor	- $.ui.keyCode.RIGHT
        }
        ,	ALT		= evt.altKey // no worky!
        ,	SHIFT	= evt.shiftKey
        ,	CTRL	= evt.ctrlKey
        ,	CURSOR	= (CTRL && code >= 37 && code <= 40)
        ,	o, k, m, pane
      ;

      if (CURSOR && options[PANE[code]].enableCursorHotkey) // valid cursor-hotkey
        pane = PANE[code];
      else if (CTRL || SHIFT) // check to see if this matches a custom-hotkey
        $.each(_c.borderPanes, function (i, p) { // loop each pane to check its hotkey
          o = options[p];
          k = o.customHotkey;
          m = o.customHotkeyModifier; // if missing or invalid, treated as "CTRL+SHIFT"
          if ((SHIFT && m=="SHIFT") || (CTRL && m=="CTRL") || (CTRL && SHIFT)) { // Modifier matches
            if (k && code === (isNaN(k) || k <= 9 ? k.toUpperCase().charCodeAt(0) : k)) { // Key matches
              pane = p;
              return false; // BREAK
            }
          }
        });

      // validate pane
      if (!pane || !$Ps[pane] || !options[pane].closable || state[pane].isHidden)
        return true;

      toggle(pane);

      evt.stopPropagation();
      evt.returnValue = false; // CANCEL key
      return false;
    };


    /*
     * ######################################
     *	UTILITY METHODS
     *	called externally or by initButtons
     * ######################################
     */

    /**
     * Change/reset a pane overflow setting & zIndex to allow popups/drop-downs to work
     *
     * @param {Object=}   [el]	(optional) Can also be 'bound' to a click, mouseOver, or other event
     */
    function allowOverflow (el) {
      if (!isInitialized()) return;
      if (this && this.tagName) el = this; // BOUND to element
      var $P;
      if (isStr(el))
        $P = $Ps[el];
      else if ($(el).data("layoutRole"))
        $P = $(el);
      else
        $(el).parents().each(function(){
          if ($(this).data("layoutRole")) {
            $P = $(this);
            return false; // BREAK
          }
        });
      if (!$P || !$P.length) return; // INVALID

      var
        pane	= $P.data("layoutEdge")
        ,	s		= state[pane]
      ;

      // if pane is already raised, then reset it before doing it again!
      // this would happen if allowOverflow is attached to BOTH the pane and an element
      if (s.cssSaved)
        resetOverflow(pane); // reset previous CSS before continuing

      // if pane is raised by sliding or resizing, or its closed, then abort
      if (s.isSliding || s.isResizing || s.isClosed) {
        s.cssSaved = false;
        return;
      }

      var
        newCSS	= { zIndex: (options.zIndexes.resizer_normal + 1) }
        ,	curCSS	= {}
        ,	of		= $P.css("overflow")
        ,	ofX		= $P.css("overflowX")
        ,	ofY		= $P.css("overflowY")
      ;
      // determine which, if any, overflow settings need to be changed
      if (of != "visible") {
        curCSS.overflow = of;
        newCSS.overflow = "visible";
      }
      if (ofX && !ofX.match(/(visible|auto)/)) {
        curCSS.overflowX = ofX;
        newCSS.overflowX = "visible";
      }
      if (ofY && !ofY.match(/(visible|auto)/)) {
        curCSS.overflowY = ofX;
        newCSS.overflowY = "visible";
      }

      // save the current overflow settings - even if blank!
      s.cssSaved = curCSS;

      // apply new CSS to raise zIndex and, if necessary, make overflow 'visible'
      $P.css( newCSS );

      // make sure the zIndex of all other panes is normal
      $.each(_c.allPanes, function(i, p) {
        if (p != pane) resetOverflow(p);
      });

    };
    /**
     * @param {Object=}   [el]	(optional) Can also be 'bound' to a click, mouseOver, or other event
     */
    function resetOverflow (el) {
      if (!isInitialized()) return;
      if (this && this.tagName) el = this; // BOUND to element
      var $P;
      if (isStr(el))
        $P = $Ps[el];
      else if ($(el).data("layoutRole"))
        $P = $(el);
      else
        $(el).parents().each(function(){
          if ($(this).data("layoutRole")) {
            $P = $(this);
            return false; // BREAK
          }
        });
      if (!$P || !$P.length) return; // INVALID

      var
        pane	= $P.data("layoutEdge")
        ,	s		= state[pane]
        ,	CSS		= s.cssSaved || {}
      ;
      // reset the zIndex
      if (!s.isSliding && !s.isResizing)
        $P.css("zIndex", options.zIndexes.pane_normal);

      // reset Overflow - if necessary
      $P.css( CSS );

      // clear var
      s.cssSaved = false;
    };

    /*
     * #####################
     * CREATE/RETURN LAYOUT
     * #####################
     */

    // validate that container exists
    var $N = $(this).eq(0); // FIRST matching Container element
    if (!$N.length) {
      return _log( options.errors.containerMissing );
    };

    // Users retrieve Instance of a layout with: $N.layout() OR $N.data("layout")
    // return the Instance-pointer if layout has already been initialized
    if ($N.data("layoutContainer") && $N.data("layout"))
      return $N.data("layout"); // cached pointer

    // init global vars
    var
      $Ps	= {}	// Panes x5		- set in initPanes()
      ,	$Cs	= {}	// Content x5	- set in initPanes()
      ,	$Rs	= {}	// Resizers x4	- set in initHandles()
      ,	$Ts	= {}	// Togglers x4	- set in initHandles()
      ,	$Ms	= $([])	// Masks - up to 2 masks per pane (IFRAME + DIV)
      //	aliases for code brevity
      ,	sC	= state.container // alias for easy access to 'container dimensions'
      ,	sID	= state.id // alias for unique layout ID/namespace - eg: "layout435"
    ;

    // create Instance object to expose data & option Properties, and primary action Methods
    var Instance = {
      //	layout data
      options:			options			// property - options hash
      ,	state:				state			// property - dimensions hash
      //	object pointers
      ,	container:			$N				// property - object pointers for layout container
      ,	panes:				$Ps				// property - object pointers for ALL Panes: panes.north, panes.center
      ,	contents:			$Cs				// property - object pointers for ALL Content: contents.north, contents.center
      ,	resizers:			$Rs				// property - object pointers for ALL Resizers, eg: resizers.north
      ,	togglers:			$Ts				// property - object pointers for ALL Togglers, eg: togglers.north
      //	border-pane open/close
      ,	hide:				hide			// method - ditto
      ,	show:				show			// method - ditto
      ,	toggle:				toggle			// method - pass a 'pane' ("north", "west", etc)
      ,	open:				open			// method - ditto
      ,	close:				close			// method - ditto
      ,	slideOpen:			slideOpen		// method - ditto
      ,	slideClose:			slideClose		// method - ditto
      ,	slideToggle:		slideToggle		// method - ditto
      //	pane actions
      ,	setSizeLimits:		setSizeLimits	// method - pass a 'pane' - update state min/max data
      ,	_sizePane:			sizePane		// method -intended for user by plugins only!
      ,	sizePane:			manualSizePane	// method - pass a 'pane' AND an 'outer-size' in pixels or percent, or 'auto'
      ,	sizeContent:		sizeContent		// method - pass a 'pane'
      ,	swapPanes:			swapPanes		// method - pass TWO 'panes' - will swap them
      ,	showMasks:			showMasks		// method - pass a 'pane' OR list of panes - default = all panes with mask option set
      ,	hideMasks:			hideMasks		// method - ditto'
      //	pane element methods
      ,	initContent:		initContent		// method - ditto
      ,	addPane:			addPane			// method - pass a 'pane'
      ,	removePane:			removePane		// method - pass a 'pane' to remove from layout, add 'true' to delete the pane-elem
      ,	createChildren:		createChildren	// method - pass a 'pane' and (optional) layout-options (OVERRIDES options[pane].children
      ,	refreshChildren:	refreshChildren	// method - pass a 'pane' and a layout-instance
      //	special pane option setting
      ,	enableClosable:		enableClosable	// method - pass a 'pane'
      ,	disableClosable:	disableClosable	// method - ditto
      ,	enableSlidable:		enableSlidable	// method - ditto
      ,	disableSlidable:	disableSlidable	// method - ditto
      ,	enableResizable:	enableResizable	// method - ditto
      ,	disableResizable:	disableResizable// method - ditto
      //	utility methods for panes
      ,	allowOverflow:		allowOverflow	// utility - pass calling element (this)
      ,	resetOverflow:		resetOverflow	// utility - ditto
      //	layout control
      ,	destroy:			destroy			// method - no parameters
      ,	initPanes:			isInitialized	// method - no parameters
      ,	resizeAll:			resizeAll		// method - no parameters
      //	callback triggering
      ,	runCallbacks:		_runCallbacks	// method - pass evtName & pane (if a pane-event), eg: trigger("onopen", "west")
      //	alias collections of options, state and children - created in addPane and extended elsewhere
      ,	hasParentLayout:	false			// set by initContainer()
      ,	children:			children		// pointers to child-layouts, eg: Instance.children.west.layoutName
      ,	north:				false			// alias group: { name: pane, pane: $Ps[pane], options: options[pane], state: state[pane], children: children[pane] }
      ,	south:				false			// ditto
      ,	west:				false			// ditto
      ,	east:				false			// ditto
      ,	center:				false			// ditto
    };

    // create the border layout NOW
    if (_create() === 'cancel') // onload_start callback returned false to CANCEL layout creation
      return null;
    else // true OR false -- if layout-elements did NOT init (hidden or do not exist), can auto-init later
      return Instance; // return the Instance object

  }


})( jQuery );




/**
 * jquery.layout.state 1.2
 * $Date: 2014-08-30 08:00:00 (Sat, 30 Aug 2014) $
 *
 * Copyright (c) 2014
 *   Kevin Dalman (http://allpro.net)
 *
 * Dual licensed under the GPL (http://www.gnu.org/licenses/gpl.html)
 * and MIT (http://www.opensource.org/licenses/mit-license.php) licenses.
 *
 * @requires: UI Layout 1.4.0 or higher
 * @requires: $.ui.cookie (above)
 *
 * @see: http://groups.google.com/group/jquery-ui-layout
 */
;(function ($) {

  if (!$.layout) return;


  /**
   *	UI COOKIE UTILITY
   *
   *	A $.cookie OR $.ui.cookie namespace *should be standard*, but until then...
   *	This creates $.ui.cookie so Layout does not need the cookie.jquery.js plugin
   *	NOTE: This utility is REQUIRED by the layout.state plugin
   *
   *	Cookie methods in Layout are created as part of State Management
   */
  if (!$.ui) $.ui = {};
  $.ui.cookie = {

    // cookieEnabled is not in DOM specs, but DOES works in all browsers,including IE6
    acceptsCookies: !!navigator.cookieEnabled

    ,	read: function (name) {
      var
        c	= document.cookie
        ,	cs	= c ? c.split(';') : []
        ,	pair, data, i
      ;
      for (i=0; pair=cs[i]; i++) {
        data = $.trim(pair).split('='); // name=value => [ name, value ]
        if (data[0] == name) // found the layout cookie
          return decodeURIComponent(data[1]);
      }
      return null;
    }

    ,	write: function (name, val, cookieOpts) {
      var	params	= ""
        ,	date	= ""
        ,	clear	= false
        ,	o		= cookieOpts || {}
        ,	x		= o.expires  || null
        ,	t		= $.type(x)
      ;
      if (t === "date")
        date = x;
      else if (t === "string" && x > 0) {
        x = parseInt(x,10);
        t = "number";
      }
      if (t === "number") {
        date = new Date();
        if (x > 0)
          date.setDate(date.getDate() + x);
        else {
          date.setFullYear(1970);
          clear = true;
        }
      }
      if (date)		params += ";expires="+ date.toUTCString();
      if (o.path)		params += ";path="+ o.path;
      if (o.domain)	params += ";domain="+ o.domain;
      if (o.secure)	params += ";secure";
      document.cookie = name +"="+ (clear ? "" : encodeURIComponent( val )) + params; // write or clear cookie
    }

    ,	clear: function (name) {
      $.ui.cookie.write(name, "", {expires: -1});
    }

  };
// if cookie.jquery.js is not loaded, create an alias to replicate it
// this may be useful to other plugins or code dependent on that plugin
  if (!$.cookie) $.cookie = function (k, v, o) {
    var C = $.ui.cookie;
    if (v === null)
      C.clear(k);
    else if (v === undefined)
      return C.read(k);
    else
      C.write(k, v, o);
  };



  /**
   *	State-management options stored in options.stateManagement, which includes a .cookie hash
   *	Default options saves ALL KEYS for ALL PANES, ie: pane.size, pane.isClosed, pane.isHidden
   *
   *	// STATE/COOKIE OPTIONS
   *	@example $(el).layout({
				stateManagement: {
					enabled:	true
				,	stateKeys:	"east.size,west.size,east.isClosed,west.isClosed"
				,	cookie:		{ name: "appLayout", path: "/" }
				}
			})
   *	@example $(el).layout({ stateManagement__enabled: true }) // enable auto-state-management using cookies
   *	@example $(el).layout({ stateManagement__cookie: { name: "appLayout", path: "/" } })
   *	@example $(el).layout({ stateManagement__cookie__name: "appLayout", stateManagement__cookie__path: "/" })
   *
   *	// STATE/COOKIE METHODS
   *	@example myLayout.saveCookie( "west.isClosed,north.size,south.isHidden", {expires: 7} );
   *	@example myLayout.loadCookie();
   *	@example myLayout.deleteCookie();
   *	@example var JSON = myLayout.readState();	// CURRENT Layout State
   *	@example var JSON = myLayout.readCookie();	// SAVED Layout State (from cookie)
   *	@example var JSON = myLayout.state.stateData;	// LAST LOADED Layout State (cookie saved in layout.state hash)
   *
   *	CUSTOM STATE-MANAGEMENT (eg, saved in a database)
   *	@example var JSON = myLayout.readState( "west.isClosed,north.size,south.isHidden" );
   *	@example myLayout.loadState( JSON );
   */

// tell Layout that the state plugin is available
  $.layout.plugins.stateManagement = true;

//	Add State-Management options to layout.defaults
  $.layout.defaults.stateManagement = {
    enabled:		false	// true = enable state-management, even if not using cookies
    ,	autoSave:		true	// Save a state-cookie when page exits?
    ,	autoLoad:		true	// Load the state-cookie when Layout inits?
    ,	animateLoad:	true	// animate panes when loading state into an active layout
    ,	includeChildren: true	// recurse into child layouts to include their state as well
    // List state-data to save - must be pane-specific
    ,	stateKeys:	"north.size,south.size,east.size,west.size,"+
    "north.isClosed,south.isClosed,east.isClosed,west.isClosed,"+
    "north.isHidden,south.isHidden,east.isHidden,west.isHidden"
    ,	cookie: {
      name:	""	// If not specified, will use Layout.name, else just "Layout"
      ,	domain:	""	// blank = current domain
      ,	path:	""	// blank = current page, "/" = entire website
      ,	expires: ""	// 'days' to keep cookie - leave blank for 'session cookie'
      ,	secure:	false
    }
  };

// Set stateManagement as a 'layout-option', NOT a 'pane-option'
  $.layout.optionsMap.layout.push("stateManagement");
// Update config so layout does not move options into the pane-default branch (panes)
  $.layout.config.optionRootKeys.push("stateManagement");

  /*
   *	State Management methods
   */
  $.layout.state = {

    /**
     * Get the current layout state and save it to a cookie
     *
     * myLayout.saveCookie( keys, cookieOpts )
     *
     * @param {Object}			inst
     * @param {(string|Array)=}	keys
     * @param {Object=}			cookieOpts
     */
    saveCookie: function (inst, keys, cookieOpts) {
      var o	= inst.options
        ,	sm	= o.stateManagement
        ,	oC	= $.extend(true, {}, sm.cookie, cookieOpts || null)
        ,	data = inst.state.stateData = inst.readState( keys || sm.stateKeys ) // read current panes-state
      ;
      $.ui.cookie.write( oC.name || o.name || "Layout", $.layout.state.encodeJSON(data), oC );
      return $.extend(true, {}, data); // return COPY of state.stateData data
    }

    /**
     * Remove the state cookie
     *
     * @param {Object}	inst
     */
    ,	deleteCookie: function (inst) {
      var o = inst.options;
      $.ui.cookie.clear( o.stateManagement.cookie.name || o.name || "Layout" );
    }

    /**
     * Read & return data from the cookie - as JSON
     *
     * @param {Object}	inst
     */
    ,	readCookie: function (inst) {
      var o = inst.options;
      var c = $.ui.cookie.read( o.stateManagement.cookie.name || o.name || "Layout" );
      // convert cookie string back to a hash and return it
      return c ? $.layout.state.decodeJSON(c) : {};
    }

    /**
     * Get data from the cookie and USE IT to loadState
     *
     * @param {Object}	inst
     */
    ,	loadCookie: function (inst) {
      var c = $.layout.state.readCookie(inst); // READ the cookie
      if (c && !$.isEmptyObject( c )) {
        inst.state.stateData = $.extend(true, {}, c); // SET state.stateData
        inst.loadState(c); // LOAD the retrieved state
      }
      return c;
    }

    /**
     * Update layout options from the cookie, if one exists
     *
     * @param {Object}		inst
     * @param {Object=}		stateData
     * @param {boolean=}	animate
     */
    ,	loadState: function (inst, data, opts) {
      if (!$.isPlainObject( data ) || $.isEmptyObject( data )) return;

      // normalize data & cache in the state object
      data = inst.state.stateData = $.layout.transformData( data ); // panes = default subkey

      // add missing/default state-restore options
      var smo = inst.options.stateManagement;
      opts = $.extend({
        animateLoad:		false //smo.animateLoad
        ,	includeChildren:	smo.includeChildren
      }, opts );

      if (!inst.state.initialized) {
        /*
         *	layout NOT initialized, so just update its options
         */
        // MUST remove pane.children keys before applying to options
        // use a copy so we don't remove keys from original data
        var o = $.extend(true, {}, data);
        //delete o.center; // center has no state-data - only children
        $.each($.layout.config.allPanes, function (idx, pane) {
          if (o[pane]) delete o[pane].children;
        });
        // update CURRENT layout-options with saved state data
        $.extend(true, inst.options, o);
      }
      else {
        /*
         *	layout already initialized, so modify layout's configuration
         */
        var noAnimate = !opts.animateLoad
          ,	o, c, h, state, open
        ;
        $.each($.layout.config.borderPanes, function (idx, pane) {
          o = data[ pane ];
          if (!$.isPlainObject( o )) return; // no key, skip pane

          s	= o.size;
          c	= o.initClosed;
          h	= o.initHidden;
          ar	= o.autoResize
          state	= inst.state[pane];
          open	= state.isVisible;

          // reset autoResize
          if (ar)
            state.autoResize = ar;
          // resize BEFORE opening
          if (!open)
            inst._sizePane(pane, s, false, false, false); // false=skipCallback/noAnimation/forceResize
          // open/close as necessary - DO NOT CHANGE THIS ORDER!
          if (h === true)			inst.hide(pane, noAnimate);
          else if (c === true)	inst.close(pane, false, noAnimate);
          else if (c === false)	inst.open (pane, false, noAnimate);
          else if (h === false)	inst.show (pane, false, noAnimate);
          // resize AFTER any other actions
          if (open)
            inst._sizePane(pane, s, false, false, noAnimate); // animate resize if option passed
        });

        /*
         *	RECURSE INTO CHILD-LAYOUTS
         */
        if (opts.includeChildren) {
          var paneStateChildren, childState;
          $.each(inst.children, function (pane, paneChildren) {
            paneStateChildren = data[pane] ? data[pane].children : 0;
            if (paneStateChildren && paneChildren) {
              $.each(paneChildren, function (stateKey, child) {
                childState = paneStateChildren[stateKey];
                if (child && childState)
                  child.loadState( childState );
              });
            }
          });
        }
      }
    }

    /**
     * Get the *current layout state* and return it as a hash
     *
     * @param {Object=}		inst	// Layout instance to get state for
     * @param {object=}		[opts]	// State-Managements override options
     */
    ,	readState: function (inst, opts) {
      // backward compatility
      if ($.type(opts) === 'string') opts = { keys: opts };
      if (!opts) opts = {};
      var	sm		= inst.options.stateManagement
        ,	ic		= opts.includeChildren
        ,	recurse	= ic !== undefined ? ic : sm.includeChildren
        ,	keys	= opts.stateKeys || sm.stateKeys
        ,	alt		= { isClosed: 'initClosed', isHidden: 'initHidden' }
        ,	state	= inst.state
        ,	panes	= $.layout.config.allPanes
        ,	data	= {}
        ,	pair, pane, key, val
        ,	ps, pC, child, array, count, branch
      ;
      if ($.isArray(keys)) keys = keys.join(",");
      // convert keys to an array and change delimiters from '__' to '.'
      keys = keys.replace(/__/g, ".").split(',');
      // loop keys and create a data hash
      for (var i=0, n=keys.length; i < n; i++) {
        pair = keys[i].split(".");
        pane = pair[0];
        key  = pair[1];
        if ($.inArray(pane, panes) < 0) continue; // bad pane!
        val = state[ pane ][ key ];
        if (val == undefined) continue;
        if (key=="isClosed" && state[pane]["isSliding"])
          val = true; // if sliding, then *really* isClosed
        ( data[pane] || (data[pane]={}) )[ alt[key] ? alt[key] : key ] = val;
      }

      // recurse into the child-layouts for each pane
      if (recurse) {
        $.each(panes, function (idx, pane) {
          pC = inst.children[pane];
          ps = state.stateData[pane];
          if ($.isPlainObject( pC ) && !$.isEmptyObject( pC )) {
            // ensure a key exists for this 'pane', eg: branch = data.center
            branch = data[pane] || (data[pane] = {});
            if (!branch.children) branch.children = {};
            $.each( pC, function (key, child) {
              // ONLY read state from an initialize layout
              if ( child.state.initialized )
                branch.children[ key ] = $.layout.state.readState( child );
              // if we have PREVIOUS (onLoad) state for this child-layout, KEEP IT!
              else if ( ps && ps.children && ps.children[ key ] ) {
                branch.children[ key ] = $.extend(true, {}, ps.children[ key ] );
              }
            });
          }
        });
      }

      return data;
    }

    /**
     *	Stringify a JSON hash so can save in a cookie or db-field
     */
    ,	encodeJSON: function (json) {
      var local = window.JSON || {};
      return (local.stringify || stringify)(json);

      function stringify (h) {
        var D=[], i=0, k, v, t // k = key, v = value
          ,	a = $.isArray(h)
        ;
        for (k in h) {
          v = h[k];
          t = typeof v;
          if (t == 'string')		// STRING - add quotes
            v = '"'+ v +'"';
          else if (t == 'object')	// SUB-KEY - recurse into it
            v = parse(v);
          D[i++] = (!a ? '"'+ k +'":' : '') + v;
        }
        return (a ? '[' : '{') + D.join(',') + (a ? ']' : '}');
      };
    }

    /**
     *	Convert stringified JSON back to a hash object
     *	@see		$.parseJSON(), adding in jQuery 1.4.1
     */
    ,	decodeJSON: function (str) {
      try { return $.parseJSON ? $.parseJSON(str) : window["eval"]("("+ str +")") || {}; }
      catch (e) { return {}; }
    }


    ,	_create: function (inst) {
      var s	= $.layout.state
        ,	o	= inst.options
        ,	sm	= o.stateManagement
      ;
      //	ADD State-Management plugin methods to inst
      $.extend( inst, {
        //	readCookie - update options from cookie - returns hash of cookie data
        readCookie:		function () { return s.readCookie(inst); }
        //	deleteCookie
        ,	deleteCookie:	function () { s.deleteCookie(inst); }
        //	saveCookie - optionally pass keys-list and cookie-options (hash)
        ,	saveCookie:		function (keys, cookieOpts) { return s.saveCookie(inst, keys, cookieOpts); }
        //	loadCookie - readCookie and use to loadState() - returns hash of cookie data
        ,	loadCookie:		function () { return s.loadCookie(inst); }
        //	loadState - pass a hash of state to use to update options
        ,	loadState:		function (stateData, opts) { s.loadState(inst, stateData, opts); }
        //	readState - returns hash of current layout-state
        ,	readState:		function (keys) { return s.readState(inst, keys); }
        //	add JSON utility methods too...
        ,	encodeJSON:		s.encodeJSON
        ,	decodeJSON:		s.decodeJSON
      });

      // init state.stateData key, even if plugin is initially disabled
      inst.state.stateData = {};

      // autoLoad MUST BE one of: data-array, data-hash, callback-function, or TRUE
      if ( !sm.autoLoad ) return;

      //	When state-data exists in the autoLoad key USE IT,
      //	even if stateManagement.enabled == false
      if ($.isPlainObject( sm.autoLoad )) {
        if (!$.isEmptyObject( sm.autoLoad )) {
          inst.loadState( sm.autoLoad );
        }
      }
      else if ( sm.enabled ) {
        // update the options from cookie or callback
        // if options is a function, call it to get stateData
        if ($.isFunction( sm.autoLoad )) {
          var d = {};
          try {
            d = sm.autoLoad( inst, inst.state, inst.options, inst.options.name || '' ); // try to get data from fn
          } catch (e) {}
          if (d && $.isPlainObject( d ) && !$.isEmptyObject( d ))
            inst.loadState(d);
        }
        else // any other truthy value will trigger loadCookie
          inst.loadCookie();
      }
    }

    ,	_unload: function (inst) {
      var sm = inst.options.stateManagement;
      if (sm.enabled && sm.autoSave) {
        // if options is a function, call it to save the stateData
        if ($.isFunction( sm.autoSave )) {
          try {
            sm.autoSave( inst, inst.state, inst.options, inst.options.name || '' ); // try to get data from fn
          } catch (e) {}
        }
        else // any truthy value will trigger saveCookie
          inst.saveCookie();
      }
    }

  };

// add state initialization method to Layout's onCreate array of functions
  $.layout.onCreate.push( $.layout.state._create );
  $.layout.onUnload.push( $.layout.state._unload );

})( jQuery );



/**
 * @preserve jquery.layout.buttons 1.0
 * $Date: 2011-07-16 08:00:00 (Sat, 16 July 2011) $
 *
 * Copyright (c) 2011
 *   Kevin Dalman (http://allpro.net)
 *
 * Dual licensed under the GPL (http://www.gnu.org/licenses/gpl.html)
 * and MIT (http://www.opensource.org/licenses/mit-license.php) licenses.
 *
 * @dependancies: UI Layout 1.3.0.rc30.1 or higher
 *
 * @support: http://groups.google.com/group/jquery-ui-layout
 *
 * Docs: [ to come ]
 * Tips: [ to come ]
 */
;(function ($) {

  if (!$.layout) return;


// tell Layout that the state plugin is available
  $.layout.plugins.buttons = true;

//	Add State-Management options to layout.defaults
  $.layout.defaults.autoBindCustomButtons = false;
// Set stateManagement as a layout-option, NOT a pane-option
  $.layout.optionsMap.layout.push("autoBindCustomButtons");

  /*
   *	Button methods
   */
  $.layout.buttons = {
    // set data used by multiple methods below
    config: {
      borderPanes:	"north,south,west,east"
    }

    /**
     * Searches for .ui-layout-button-xxx elements and auto-binds them as layout-buttons
     *
     * @see  _create()
     */
    ,	init: function (inst) {
      var pre		= "ui-layout-button-"
        ,	layout	= inst.options.name || ""
        ,	name;
      $.each("toggle,open,close,pin,toggle-slide,open-slide".split(","), function (i, action) {
        $.each($.layout.buttons.config.borderPanes.split(","), function (ii, pane) {
          $("."+pre+action+"-"+pane).each(function(){
            // if button was previously 'bound', data.layoutName was set, but is blank if layout has no 'name'
            name = $(this).data("layoutName") || $(this).attr("layoutName");
            if (name == undefined || name === layout)
              inst.bindButton(this, action, pane);
          });
        });
      });
    }

    /**
     * Helper function to validate params received by addButton utilities
     *
     * Two classes are added to the element, based on the buttonClass...
     * The type of button is appended to create the 2nd className:
     *  - ui-layout-button-pin
     *  - ui-layout-pane-button-toggle
     *  - ui-layout-pane-button-open
     *  - ui-layout-pane-button-close
     *
     * @param  {(string|!Object)}	selector	jQuery selector (or element) for button, eg: ".ui-layout-north .toggle-button"
     * @param  {string}   			pane 		Name of the pane the button is for: 'north', 'south', etc.
     * @return {Array.<Object>}		If both params valid, the element matching 'selector' in a jQuery wrapper - otherwise returns null
     */
    ,	get: function (inst, selector, pane, action) {
      var $E	= $(selector)
        ,	o	= inst.options
        //,	err	= o.showErrorMessages
      ;
      if ($E.length && $.layout.buttons.config.borderPanes.indexOf(pane) >= 0) {
        var btn = o[pane].buttonClass +"-"+ action;
        $E	.addClass( btn +" "+ btn +"-"+ pane )
          .data("layoutName", o.name); // add layout identifier - even if blank!
      }
      return $E;
    }


    /**
     * NEW syntax for binding layout-buttons - will eventually replace addToggle, addOpen, etc.
     *
     * @param {(string|!Object)}	sel		jQuery selector (or element) for button, eg: ".ui-layout-north .toggle-button"
     * @param {string}			action
     * @param {string}			pane
     */
    ,	bind: function (inst, sel, action, pane) {
      var _ = $.layout.buttons;
      switch (action.toLowerCase()) {
        case "toggle":			_.addToggle	(inst, sel, pane); break;
        case "open":			_.addOpen	(inst, sel, pane); break;
        case "close":			_.addClose	(inst, sel, pane); break;
        case "pin":				_.addPin	(inst, sel, pane); break;
        case "toggle-slide":	_.addToggle	(inst, sel, pane, true); break;
        case "open-slide":		_.addOpen	(inst, sel, pane, true); break;
      }
      return inst;
    }

    /**
     * Add a custom Toggler button for a pane
     *
     * @param {(string|!Object)}	selector	jQuery selector (or element) for button, eg: ".ui-layout-north .toggle-button"
     * @param {string}  			pane 		Name of the pane the button is for: 'north', 'south', etc.
     * @param {boolean=}			slide 		true = slide-open, false = pin-open
     */
    ,	addToggle: function (inst, selector, pane, slide) {
      $.layout.buttons.get(inst, selector, pane, "toggle")
        .click(function(evt){
          inst.toggle(pane, !!slide);
          evt.stopPropagation();
        });
      return inst;
    }

    /**
     * Add a custom Open button for a pane
     *
     * @param {(string|!Object)}	selector	jQuery selector (or element) for button, eg: ".ui-layout-north .toggle-button"
     * @param {string}			pane 		Name of the pane the button is for: 'north', 'south', etc.
     * @param {boolean=}			slide 		true = slide-open, false = pin-open
     */
    ,	addOpen: function (inst, selector, pane, slide) {
      $.layout.buttons.get(inst, selector, pane, "open")
        .attr("title", inst.options[pane].tips.Open)
        .click(function (evt) {
          inst.open(pane, !!slide);
          evt.stopPropagation();
        });
      return inst;
    }

    /**
     * Add a custom Close button for a pane
     *
     * @param {(string|!Object)}	selector	jQuery selector (or element) for button, eg: ".ui-layout-north .toggle-button"
     * @param {string}   		pane 		Name of the pane the button is for: 'north', 'south', etc.
     */
    ,	addClose: function (inst, selector, pane) {
      $.layout.buttons.get(inst, selector, pane, "close")
        .attr("title", inst.options[pane].tips.Close)
        .click(function (evt) {
          inst.close(pane);
          evt.stopPropagation();
        });
      return inst;
    }

    /**
     * Add a custom Pin button for a pane
     *
     * Four classes are added to the element, based on the paneClass for the associated pane...
     * Assuming the default paneClass and the pin is 'up', these classes are added for a west-pane pin:
     *  - ui-layout-pane-pin
     *  - ui-layout-pane-west-pin
     *  - ui-layout-pane-pin-up
     *  - ui-layout-pane-west-pin-up
     *
     * @param {(string|!Object)}	selector	jQuery selector (or element) for button, eg: ".ui-layout-north .toggle-button"
     * @param {string}   		pane 		Name of the pane the pin is for: 'north', 'south', etc.
     */
    ,	addPin: function (inst, selector, pane) {
      var $E = $.layout.buttons.get(inst, selector, pane, "pin");
      if ($E.length) {
        var s = inst.state[pane];
        $E.click(function (evt) {
          $.layout.buttons.setPinState(inst, $(this), pane, (s.isSliding || s.isClosed));
          if (s.isSliding || s.isClosed) inst.open( pane ); // change from sliding to open
          else inst.close( pane ); // slide-closed
          evt.stopPropagation();
        });
        // add up/down pin attributes and classes
        $.layout.buttons.setPinState(inst, $E, pane, (!s.isClosed && !s.isSliding));
        // add this pin to the pane data so we can 'sync it' automatically
        // PANE.pins key is an array so we can store multiple pins for each pane
        s.pins.push( selector ); // just save the selector string
      }
      return inst;
    }

    /**
     * Change the class of the pin button to make it look 'up' or 'down'
     *
     * @see  addPin(), syncPins()
     * @param {Array.<Object>}	$Pin	The pin-span element in a jQuery wrapper
     * @param {string}	pane	These are the params returned to callbacks by layout()
     * @param {boolean}	doPin	true = set the pin 'down', false = set it 'up'
     */
    ,	setPinState: function (inst, $Pin, pane, doPin) {
      var updown = $Pin.attr("pin");
      if (updown && doPin === (updown=="down")) return; // already in correct state
      var
        po		= inst.options[pane]
        ,	lang	= po.tips
        ,	pin		= po.buttonClass +"-pin"
        ,	side	= pin +"-"+ pane
        ,	UP		= pin +"-up "+	side +"-up"
        ,	DN		= pin +"-down "+side +"-down"
      ;
      $Pin
        .attr("pin", doPin ? "down" : "up") // logic
        .attr("title", doPin ? lang.Unpin : lang.Pin)
        .removeClass( doPin ? UP : DN )
        .addClass( doPin ? DN : UP )
      ;
    }

    /**
     * INTERNAL function to sync 'pin buttons' when pane is opened or closed
     * Unpinned means the pane is 'sliding' - ie, over-top of the adjacent panes
     *
     * @see  open(), close()
     * @param {string}	pane   These are the params returned to callbacks by layout()
     * @param {boolean}	doPin  True means set the pin 'down', False means 'up'
     */
    ,	syncPinBtns: function (inst, pane, doPin) {
      // REAL METHOD IS _INSIDE_ LAYOUT - THIS IS HERE JUST FOR REFERENCE
      $.each(state[pane].pins, function (i, selector) {
        $.layout.buttons.setPinState(inst, $(selector), pane, doPin);
      });
    }


    ,	_load: function (inst) {
      //	ADD Button methods to Layout Instance
      $.extend( inst, {
        bindButton:		function (selector, action, pane) { return $.layout.buttons.bind(inst, selector, action, pane); }
        //	DEPRECATED METHODS...
        ,	addToggleBtn:	function (selector, pane, slide) { return $.layout.buttons.addToggle(inst, selector, pane, slide); }
        ,	addOpenBtn:		function (selector, pane, slide) { return $.layout.buttons.addOpen(inst, selector, pane, slide); }
        ,	addCloseBtn:	function (selector, pane) { return $.layout.buttons.addClose(inst, selector, pane); }
        ,	addPinBtn:		function (selector, pane) { return $.layout.buttons.addPin(inst, selector, pane); }
      });

      // init state array to hold pin-buttons
      for (var i=0; i<4; i++) {
        var pane = $.layout.buttons.config.borderPanes[i];
        inst.state[pane].pins = [];
      }

      // auto-init buttons onLoad if option is enabled
      if ( inst.options.autoBindCustomButtons )
        $.layout.buttons.init(inst);
    }

    ,	_unload: function (inst) {
      // TODO: unbind all buttons???
    }

  };

// add initialization method to Layout's onLoad array of functions
  $.layout.onLoad.push(  $.layout.buttons._load );
//$.layout.onUnload.push( $.layout.buttons._unload );

})( jQuery );




/**
 * jquery.layout.browserZoom 1.0
 * $Date: 2011-12-29 08:00:00 (Thu, 29 Dec 2011) $
 *
 * Copyright (c) 2012
 *   Kevin Dalman (http://allpro.net)
 *
 * Dual licensed under the GPL (http://www.gnu.org/licenses/gpl.html)
 * and MIT (http://www.opensource.org/licenses/mit-license.php) licenses.
 *
 * @requires: UI Layout 1.3.0.rc30.1 or higher
 *
 * @see: http://groups.google.com/group/jquery-ui-layout
 *
 * TODO: Extend logic to handle other problematic zooming in browsers
 * TODO: Add hotkey/mousewheel bindings to _instantly_ respond to these zoom event
 */
(function ($) {

// tell Layout that the plugin is available
  $.layout.plugins.browserZoom = true;

  $.layout.defaults.browserZoomCheckInterval = 1000;
  $.layout.optionsMap.layout.push("browserZoomCheckInterval");

  /*
   *	browserZoom methods
   */
  $.layout.browserZoom = {

    _init: function (inst) {
      // abort if browser does not need this check
      if ($.layout.browserZoom.ratio() !== false)
        $.layout.browserZoom._setTimer(inst);
    }

    ,	_setTimer: function (inst) {
      // abort if layout destroyed or browser does not need this check
      if (inst.destroyed) return;
      var o	= inst.options
        ,	s	= inst.state
        //	don't need check if inst has parentLayout, but check occassionally in case parent destroyed!
        //	MINIMUM 100ms interval, for performance
        ,	ms	= inst.hasParentLayout ?  5000 : Math.max( o.browserZoomCheckInterval, 100 )
      ;
      // set the timer
      setTimeout(function(){
          if (inst.destroyed || !o.resizeWithWindow) return;
          var d = $.layout.browserZoom.ratio();
          if (d !== s.browserZoom) {
            s.browserZoom = d;
            inst.resizeAll();
          }
          // set a NEW timeout
          $.layout.browserZoom._setTimer(inst);
        }
        ,	ms );
    }

    ,	ratio: function () {
      var w	= window
        ,	s	= screen
        ,	d	= document
        ,	dE	= d.documentElement || d.body
        ,	b	= $.layout.browser
        ,	v	= b.version
        ,	r, sW, cW
      ;
      // we can ignore all browsers that fire window.resize event onZoom
      if (!b.msie || v > 8)
        return false; // don't need to track zoom
      if (s.deviceXDPI && s.systemXDPI) // syntax compiler hack
        return calc(s.deviceXDPI, s.systemXDPI);
      // everything below is just for future reference!
      if (b.webkit && (r = d.body.getBoundingClientRect))
        return calc((r.left - r.right), d.body.offsetWidth);
      if (b.webkit && (sW = w.outerWidth))
        return calc(sW, w.innerWidth);
      if ((sW = s.width) && (cW = dE.clientWidth))
        return calc(sW, cW);
      return false; // no match, so cannot - or don't need to - track zoom

      function calc (x,y) { return (parseInt(x,10) / parseInt(y,10) * 100).toFixed(); }
    }

  };
// add initialization method to Layout's onLoad array of functions
  $.layout.onReady.push( $.layout.browserZoom._init );


})( jQuery );




/**
 *	UI Layout Plugin: Slide-Offscreen Animation
 *
 *	Prevent panes from being 'hidden' so that an iframes/objects
 *	does not reload/refresh when pane 'opens' again.
 *	This plug-in adds a new animation called "slideOffscreen".
 *	It is identical to the normal "slide" effect, but avoids hiding the element
 *
 *	Requires Layout 1.3.0.RC30.1 or later for Close offscreen
 *	Requires Layout 1.3.0.RC30.5 or later for Hide, initClosed & initHidden offscreen
 *
 *	Version:	1.1 - 2012-11-18
 *	Author:		Kevin Dalman (kevin@jquery-dev.com)
 *	@preserve	jquery.layout.slideOffscreen-1.1.js
 */
;(function ($) {

// Add a new "slideOffscreen" effect
  if ($.effects) {

    // add an option so initClosed and initHidden will work
    $.layout.defaults.panes.useOffscreenClose = false; // user must enable when needed
    /* set the new animation as the default for all panes
     $.layout.defaults.panes.fxName = "slideOffscreen";
     */

    if ($.layout.plugins)
      $.layout.plugins.effects.slideOffscreen = true;

    // dupe 'slide' effect defaults as new effect defaults
    $.layout.effects.slideOffscreen = $.extend(true, {}, $.layout.effects.slide);

    // add new effect to jQuery UI
    $.effects.slideOffscreen = function(o) {
      return this.queue(function(){

        var fx		= $.effects
          ,	opt		= o.options
          ,	$el		= $(this)
          ,	pane	= $el.data('layoutEdge')
          ,	state	= $el.data('parentLayout').state
          ,	dist	= state[pane].size
          ,	s		= this.style
          ,	props	= ['top','bottom','left','right']
          // Set options
          ,	mode	= fx.setMode($el, opt.mode || 'show') // Set Mode
          ,	show	= (mode == 'show')
          ,	dir		= opt.direction || 'left' // Default Direction
          ,	ref	 	= (dir == 'up' || dir == 'down') ? 'top' : 'left'
          ,	pos		= (dir == 'up' || dir == 'left')
          ,	offscrn	= $.layout.config.offscreenCSS || {}
          ,	keyLR	= $.layout.config.offscreenReset
          ,	keyTB	= 'offscreenResetTop' // only used internally
          ,	animation = {}
        ;
        // Animation settings
        animation[ref]	= (show ? (pos ? '+=' : '-=') : (pos ? '-=' : '+=')) + dist;

        if (show) { // show() animation, so save top/bottom but retain left/right set when 'hidden'
          $el.data(keyTB, { top: s.top, bottom: s.bottom });

          // set the top or left offset in preparation for animation
          // Note: ALL animations work by shifting the top or left edges
          if (pos) { // top (north) or left (west)
            $el.css(ref, isNaN(dist) ? "-" + dist : -dist); // Shift outside the left/top edge
          }
          else { // bottom (south) or right (east) - shift all the way across container
            if (dir === 'right')
              $el.css({ left: state.container.layoutWidth, right: 'auto' });
            else // dir === bottom
              $el.css({ top: state.container.layoutHeight, bottom: 'auto' });
          }
          // restore the left/right setting if is a top/bottom animation
          if (ref === 'top')
            $el.css( $el.data( keyLR ) || {} );
        }
        else { // hide() animation, so save ALL CSS
          $el.data(keyTB, { top: s.top, bottom: s.bottom });
          $el.data(keyLR, { left: s.left, right: s.right });
        }

        // Animate
        $el.show().animate(animation, { queue: false, duration: o.duration, easing: opt.easing, complete: function(){
          // Restore top/bottom
          if ($el.data( keyTB ))
            $el.css($el.data( keyTB )).removeData( keyTB );
          if (show) // Restore left/right too
            $el.css($el.data( keyLR ) || {}).removeData( keyLR );
          else // Move the pane off-screen (left: -99999, right: 'auto')
            $el.css( offscrn );

          if (o.callback) o.callback.apply(this, arguments); // Callback
          $el.dequeue();
        }});

      });
    };

  }

})( jQuery );
},{}],2:[function(require,module,exports){
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function ($) {

  // Detect touch support
  $.support.touch = 'ontouchend' in document;

  // Ignore browsers without touch support
  if (!$.support.touch) {
    return;
  }

  var mouseProto = $.ui.mouse.prototype,
    _mouseInit = mouseProto._mouseInit,
    _mouseDestroy = mouseProto._mouseDestroy,
    touchHandled;

  /**
   * Simulate a mouse event based on a corresponding touch event
   * @param {Object} event A touch event
   * @param {String} simulatedType The corresponding mouse event
   */
  function simulateMouseEvent (event, simulatedType) {

    // Ignore multi-touch events
    if (event.originalEvent.touches.length > 1) {
      return;
    }

    event.preventDefault();

    var touch = event.originalEvent.changedTouches[0],
      simulatedEvent = document.createEvent('MouseEvents');

    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(
      simulatedType,    // type
      true,             // bubbles
      true,             // cancelable
      window,           // view
      1,                // detail
      touch.screenX,    // screenX
      touch.screenY,    // screenY
      touch.clientX,    // clientX
      touch.clientY,    // clientY
      false,            // ctrlKey
      false,            // altKey
      false,            // shiftKey
      false,            // metaKey
      0,                // button
      null              // relatedTarget
    );

    // Dispatch the simulated event to the target element
    event.target.dispatchEvent(simulatedEvent);
  }

  /**
   * Handle the jQuery UI widget's touchstart events
   * @param {Object} event The widget element's touchstart event
   */
  mouseProto._touchStart = function (event) {

    var self = this;

    // Ignore the event if another widget is already being handled
    if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
      return;
    }

    // Set the flag to prevent other widgets from inheriting the touch event
    touchHandled = true;

    // Track movement to determine if interaction was a click
    self._touchMoved = false;

    // Simulate the mouseover event
    simulateMouseEvent(event, 'mouseover');

    // Simulate the mousemove event
    simulateMouseEvent(event, 'mousemove');

    // Simulate the mousedown event
    simulateMouseEvent(event, 'mousedown');
  };

  /**
   * Handle the jQuery UI widget's touchmove events
   * @param {Object} event The document's touchmove event
   */
  mouseProto._touchMove = function (event) {

    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Interaction was not a click
    this._touchMoved = true;

    // Simulate the mousemove event
    simulateMouseEvent(event, 'mousemove');
  };

  /**
   * Handle the jQuery UI widget's touchend events
   * @param {Object} event The document's touchend event
   */
  mouseProto._touchEnd = function (event) {

    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Simulate the mouseup event
    simulateMouseEvent(event, 'mouseup');

    // Simulate the mouseout event
    simulateMouseEvent(event, 'mouseout');

    // If the touch interaction did not move, it should trigger a click
    if (!this._touchMoved) {

      // Simulate the click event
      simulateMouseEvent(event, 'click');
    }

    // Unset the flag to allow other widgets to inherit the touch event
    touchHandled = false;
  };

  /**
   * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
   * This method extends the widget with bound touch event handlers that
   * translate touch events to mouse events and pass them to the widget's
   * original mouse event handling methods.
   */
  mouseProto._mouseInit = function () {

    var self = this;

    // Delegate the touch handlers to the widget's element
    self.element.bind({
      touchstart: $.proxy(self, '_touchStart'),
      touchmove: $.proxy(self, '_touchMove'),
      touchend: $.proxy(self, '_touchEnd')
    });

    // Call the original $.ui.mouse init method
    _mouseInit.call(self);
  };

  /**
   * Remove the touch event handlers
   */
  mouseProto._mouseDestroy = function () {

    var self = this;

    // Delegate the touch handlers to the widget's element
    self.element.unbind({
      touchstart: $.proxy(self, '_touchStart'),
      touchmove: $.proxy(self, '_touchMove'),
      touchend: $.proxy(self, '_touchEnd')
    });

    // Call the original $.ui.mouse destroy method
    _mouseDestroy.call(self);
  };

})(jQuery);
},{}],3:[function(require,module,exports){
// Spectrum Colorpicker v1.8.0
// https://github.com/bgrins/spectrum
// Author: Brian Grinstead
// License: MIT

!function($, undefined) {

  var defaultOpts = {

      // Callbacks
      beforeShow: noop,
      move: noop,
      change: noop,
      show: noop,
      hide: noop,

      // Options
      color: false,
      flat: false,
      showInput: false,
      allowEmpty: false,
      showButtons: true,
      clickoutFiresChange: true,
      showInitial: false,
      showPalette: false,
      showPaletteOnly: false,
      hideAfterPaletteSelect: false,
      togglePaletteOnly: false,
      showSelectionPalette: true,
      localStorageKey: false,
      appendTo: "body",
      maxSelectionSize: 7,
      cancelText: "cancel",
      chooseText: "choose",
      togglePaletteMoreText: "more",
      togglePaletteLessText: "less",
      clearText: "Clear Color Selection",
      noColorSelectedText: "No Color Selected",
      preferredFormat: false,
      className: "", // Deprecated - use containerClassName and replacerClassName instead.
      containerClassName: "",
      replacerClassName: "",
      showAlpha: false,
      theme: "sp-light",
      palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],
      selectionPalette: [],
      disabled: false,
      offset: null
    },
    spectrums = [],
    IE = !!/msie/i.exec( window.navigator.userAgent ),
    rgbaSupport = (function() {
      function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
      }

      var elem = document.createElement('div');
      var style = elem.style;
      style.cssText = 'background-color:rgba(0,0,0,.5)';
      return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
    })(),
    replaceInput = [
      "<div class='sp-replacer'>",
      "<div class='sp-preview'><div class='sp-preview-inner'></div></div>",
      "<div class='sp-dd'>&#9660;</div>",
      "</div>"
    ].join(''),
    markup = (function () {

      // IE does not support gradients with multiple stops, so we need to simulate
      //  that for the rainbow slider with 8 divs that each have a single gradient
      var gradientFix = "";
      if (IE) {
        for (var i = 1; i <= 6; i++) {
          gradientFix += "<div class='sp-" + i + "'></div>";
        }
      }

      return [
        "<div class='sp-container sp-hidden'>",
        "<div class='sp-palette-container'>",
        "<div class='sp-palette sp-thumb sp-cf'></div>",
        "<div class='sp-palette-button-container sp-cf'>",
        "<button type='button' class='sp-palette-toggle'></button>",
        "</div>",
        "</div>",
        "<div class='sp-picker-container'>",
        "<div class='sp-top sp-cf'>",
        "<div class='sp-fill'></div>",
        "<div class='sp-top-inner'>",
        "<div class='sp-color'>",
        "<div class='sp-sat'>",
        "<div class='sp-val'>",
        "<div class='sp-dragger'></div>",
        "</div>",
        "</div>",
        "</div>",
        "<div class='sp-clear sp-clear-display'>",
        "</div>",
        "<div class='sp-hue'>",
        "<div class='sp-slider'></div>",
        gradientFix,
        "</div>",
        "</div>",
        "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>",
        "</div>",
        "<div class='sp-input-container sp-cf'>",
        "<input class='sp-input' type='text' spellcheck='false'  />",
        "</div>",
        "<div class='sp-initial sp-thumb sp-cf'></div>",
        "<div class='sp-button-container sp-cf'>",
        "<a class='sp-cancel' href='#'></a>",
        "<button type='button' class='sp-choose'></button>",
        "</div>",
        "</div>",
        "</div>"
      ].join("");
    })();

  function paletteTemplate (p, color, className, opts) {
    var html = [];
    for (var i = 0; i < p.length; i++) {
      var current = p[i];
      if(current) {
        var tiny = tinycolor(current);
        var c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
        c += (tinycolor.equals(color, current)) ? " sp-thumb-active" : "";
        var formattedString = tiny.toString(opts.preferredFormat || "rgb");
        var swatchStyle = rgbaSupport ? ("background-color:" + tiny.toRgbString()) : "filter:" + tiny.toFilter();
        html.push('<span title="' + formattedString + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';" /></span>');
      } else {
        var cls = 'sp-clear-display';
        html.push($('<div />')
          .append($('<span data-color="" style="background-color:transparent;" class="' + cls + '"></span>')
            .attr('title', opts.noColorSelectedText)
          )
          .html()
        );
      }
    }
    return "<div class='sp-cf " + className + "'>" + html.join('') + "</div>";
  }

  function hideAll() {
    for (var i = 0; i < spectrums.length; i++) {
      if (spectrums[i]) {
        spectrums[i].hide();
      }
    }
  }

  function instanceOptions(o, callbackContext) {
    var opts = $.extend({}, defaultOpts, o);
    opts.callbacks = {
      'move': bind(opts.move, callbackContext),
      'change': bind(opts.change, callbackContext),
      'show': bind(opts.show, callbackContext),
      'hide': bind(opts.hide, callbackContext),
      'beforeShow': bind(opts.beforeShow, callbackContext)
    };

    return opts;
  }

  function spectrum(element, o) {

    var opts = instanceOptions(o, element),
      flat = opts.flat,
      showSelectionPalette = opts.showSelectionPalette,
      localStorageKey = opts.localStorageKey,
      theme = opts.theme,
      callbacks = opts.callbacks,
      resize = throttle(reflow, 10),
      visible = false,
      isDragging = false,
      dragWidth = 0,
      dragHeight = 0,
      dragHelperHeight = 0,
      slideHeight = 0,
      slideWidth = 0,
      alphaWidth = 0,
      alphaSlideHelperWidth = 0,
      slideHelperHeight = 0,
      currentHue = 0,
      currentSaturation = 0,
      currentValue = 0,
      currentAlpha = 1,
      palette = [],
      paletteArray = [],
      paletteLookup = {},
      selectionPalette = opts.selectionPalette.slice(0),
      maxSelectionSize = opts.maxSelectionSize,
      draggingClass = "sp-dragging",
      shiftMovementDirection = null;

    var doc = element.ownerDocument,
      body = doc.body,
      boundElement = $(element),
      disabled = false,
      container = $(markup, doc).addClass(theme),
      pickerContainer = container.find(".sp-picker-container"),
      dragger = container.find(".sp-color"),
      dragHelper = container.find(".sp-dragger"),
      slider = container.find(".sp-hue"),
      slideHelper = container.find(".sp-slider"),
      alphaSliderInner = container.find(".sp-alpha-inner"),
      alphaSlider = container.find(".sp-alpha"),
      alphaSlideHelper = container.find(".sp-alpha-handle"),
      textInput = container.find(".sp-input"),
      paletteContainer = container.find(".sp-palette"),
      initialColorContainer = container.find(".sp-initial"),
      cancelButton = container.find(".sp-cancel"),
      clearButton = container.find(".sp-clear"),
      chooseButton = container.find(".sp-choose"),
      toggleButton = container.find(".sp-palette-toggle"),
      isInput = boundElement.is("input"),
      isInputTypeColor = isInput && boundElement.attr("type") === "color" && inputTypeColorSupport(),
      shouldReplace = isInput && !flat,
      replacer = (shouldReplace) ? $(replaceInput).addClass(theme).addClass(opts.className).addClass(opts.replacerClassName) : $([]),
      offsetElement = (shouldReplace) ? replacer : boundElement,
      previewElement = replacer.find(".sp-preview-inner"),
      initialColor = opts.color || (isInput && boundElement.val()),
      colorOnShow = false,
      currentPreferredFormat = opts.preferredFormat,
      clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange,
      isEmpty = !initialColor,
      allowEmpty = opts.allowEmpty && !isInputTypeColor;

    function applyOptions() {

      if (opts.showPaletteOnly) {
        opts.showPalette = true;
      }

      toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);

      if (opts.palette) {
        palette = opts.palette.slice(0);
        paletteArray = $.isArray(palette[0]) ? palette : [palette];
        paletteLookup = {};
        for (var i = 0; i < paletteArray.length; i++) {
          for (var j = 0; j < paletteArray[i].length; j++) {
            var rgb = tinycolor(paletteArray[i][j]).toRgbString();
            paletteLookup[rgb] = true;
          }
        }
      }

      container.toggleClass("sp-flat", flat);
      container.toggleClass("sp-input-disabled", !opts.showInput);
      container.toggleClass("sp-alpha-enabled", opts.showAlpha);
      container.toggleClass("sp-clear-enabled", allowEmpty);
      container.toggleClass("sp-buttons-disabled", !opts.showButtons);
      container.toggleClass("sp-palette-buttons-disabled", !opts.togglePaletteOnly);
      container.toggleClass("sp-palette-disabled", !opts.showPalette);
      container.toggleClass("sp-palette-only", opts.showPaletteOnly);
      container.toggleClass("sp-initial-disabled", !opts.showInitial);
      container.addClass(opts.className).addClass(opts.containerClassName);

      reflow();
    }

    function initialize() {

      if (IE) {
        container.find("*:not(input)").attr("unselectable", "on");
      }

      applyOptions();

      if (shouldReplace) {
        boundElement.after(replacer).hide();
      }

      if (!allowEmpty) {
        clearButton.hide();
      }

      if (flat) {
        boundElement.after(container).hide();
      }
      else {

        var appendTo = opts.appendTo === "parent" ? boundElement.parent() : $(opts.appendTo);
        if (appendTo.length !== 1) {
          appendTo = $("body");
        }

        appendTo.append(container);
      }

      updateSelectionPaletteFromStorage();

      offsetElement.bind("click.spectrum touchstart.spectrum", function (e) {
        if (!disabled) {
          toggle();
        }

        e.stopPropagation();

        if (!$(e.target).is("input")) {
          e.preventDefault();
        }
      });

      if(boundElement.is(":disabled") || (opts.disabled === true)) {
        disable();
      }

      // Prevent clicks from bubbling up to document.  This would cause it to be hidden.
      container.click(stopPropagation);

      // Handle user typed input
      textInput.change(setFromTextInput);
      textInput.bind("paste", function () {
        setTimeout(setFromTextInput, 1);
      });
      textInput.keydown(function (e) { if (e.keyCode == 13) { setFromTextInput(); } });

      cancelButton.text(opts.cancelText);
      cancelButton.bind("click.spectrum", function (e) {
        e.stopPropagation();
        e.preventDefault();
        revert();
        hide();
      });

      clearButton.attr("title", opts.clearText);
      clearButton.bind("click.spectrum", function (e) {
        e.stopPropagation();
        e.preventDefault();
        isEmpty = true;
        move();

        if(flat) {
          //for the flat style, this is a change event
          updateOriginalInput(true);
        }
      });

      chooseButton.text(opts.chooseText);
      chooseButton.bind("click.spectrum", function (e) {
        e.stopPropagation();
        e.preventDefault();

        if (IE && textInput.is(":focus")) {
          textInput.trigger('change');
        }

        if (isValid()) {
          updateOriginalInput(true);
          hide();
        }
      });

      toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
      toggleButton.bind("click.spectrum", function (e) {
        e.stopPropagation();
        e.preventDefault();

        opts.showPaletteOnly = !opts.showPaletteOnly;

        // To make sure the Picker area is drawn on the right, next to the
        // Palette area (and not below the palette), first move the Palette
        // to the left to make space for the picker, plus 5px extra.
        // The 'applyOptions' function puts the whole container back into place
        // and takes care of the button-text and the sp-palette-only CSS class.
        if (!opts.showPaletteOnly && !flat) {
          container.css('left', '-=' + (pickerContainer.outerWidth(true) + 5));
        }
        applyOptions();
      });

      draggable(alphaSlider, function (dragX, dragY, e) {
        currentAlpha = (dragX / alphaWidth);
        isEmpty = false;
        if (e.shiftKey) {
          currentAlpha = Math.round(currentAlpha * 10) / 10;
        }

        move();
      }, dragStart, dragStop);

      draggable(slider, function (dragX, dragY) {
        currentHue = parseFloat(dragY / slideHeight);
        isEmpty = false;
        if (!opts.showAlpha) {
          currentAlpha = 1;
        }
        move();
      }, dragStart, dragStop);

      draggable(dragger, function (dragX, dragY, e) {

        // shift+drag should snap the movement to either the x or y axis.
        if (!e.shiftKey) {
          shiftMovementDirection = null;
        }
        else if (!shiftMovementDirection) {
          var oldDragX = currentSaturation * dragWidth;
          var oldDragY = dragHeight - (currentValue * dragHeight);
          var furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);

          shiftMovementDirection = furtherFromX ? "x" : "y";
        }

        var setSaturation = !shiftMovementDirection || shiftMovementDirection === "x";
        var setValue = !shiftMovementDirection || shiftMovementDirection === "y";

        if (setSaturation) {
          currentSaturation = parseFloat(dragX / dragWidth);
        }
        if (setValue) {
          currentValue = parseFloat((dragHeight - dragY) / dragHeight);
        }

        isEmpty = false;
        if (!opts.showAlpha) {
          currentAlpha = 1;
        }

        move();

      }, dragStart, dragStop);

      if (!!initialColor) {
        set(initialColor);

        // In case color was black - update the preview UI and set the format
        // since the set function will not run (default color is black).
        updateUI();
        currentPreferredFormat = opts.preferredFormat || tinycolor(initialColor).format;

        addColorToSelectionPalette(initialColor);
      }
      else {
        updateUI();
      }

      if (flat) {
        show();
      }

      function paletteElementClick(e) {
        if (e.data && e.data.ignore) {
          set($(e.target).closest(".sp-thumb-el").data("color"));
          move();
        }
        else {
          set($(e.target).closest(".sp-thumb-el").data("color"));
          move();
          updateOriginalInput(true);
          if (opts.hideAfterPaletteSelect) {
            hide();
          }
        }

        return false;
      }

      var paletteEvent = IE ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
      paletteContainer.delegate(".sp-thumb-el", paletteEvent, paletteElementClick);
      initialColorContainer.delegate(".sp-thumb-el:nth-child(1)", paletteEvent, { ignore: true }, paletteElementClick);
    }

    function updateSelectionPaletteFromStorage() {

      if (localStorageKey && window.localStorage) {

        // Migrate old palettes over to new format.  May want to remove this eventually.
        try {
          var oldPalette = window.localStorage[localStorageKey].split(",#");
          if (oldPalette.length > 1) {
            delete window.localStorage[localStorageKey];
            $.each(oldPalette, function(i, c) {
              addColorToSelectionPalette(c);
            });
          }
        }
        catch(e) { }

        try {
          selectionPalette = window.localStorage[localStorageKey].split(";");
        }
        catch (e) { }
      }
    }

    function addColorToSelectionPalette(color) {
      if (showSelectionPalette) {
        var rgb = tinycolor(color).toRgbString();
        if (!paletteLookup[rgb] && $.inArray(rgb, selectionPalette) === -1) {
          selectionPalette.push(rgb);
          while(selectionPalette.length > maxSelectionSize) {
            selectionPalette.shift();
          }
        }

        if (localStorageKey && window.localStorage) {
          try {
            window.localStorage[localStorageKey] = selectionPalette.join(";");
          }
          catch(e) { }
        }
      }
    }

    function getUniqueSelectionPalette() {
      var unique = [];
      if (opts.showPalette) {
        for (var i = 0; i < selectionPalette.length; i++) {
          var rgb = tinycolor(selectionPalette[i]).toRgbString();

          if (!paletteLookup[rgb]) {
            unique.push(selectionPalette[i]);
          }
        }
      }

      return unique.reverse().slice(0, opts.maxSelectionSize);
    }

    function drawPalette() {

      var currentColor = get();

      var html = $.map(paletteArray, function (palette, i) {
        return paletteTemplate(palette, currentColor, "sp-palette-row sp-palette-row-" + i, opts);
      });

      updateSelectionPaletteFromStorage();

      if (selectionPalette) {
        html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection", opts));
      }

      paletteContainer.html(html.join(""));
    }

    function drawInitial() {
      if (opts.showInitial) {
        var initial = colorOnShow;
        var current = get();
        initialColorContainer.html(paletteTemplate([initial, current], current, "sp-palette-row-initial", opts));
      }
    }

    function dragStart() {
      if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
        reflow();
      }
      isDragging = true;
      container.addClass(draggingClass);
      shiftMovementDirection = null;
      boundElement.trigger('dragstart.spectrum', [ get() ]);
    }

    function dragStop() {
      isDragging = false;
      container.removeClass(draggingClass);
      boundElement.trigger('dragstop.spectrum', [ get() ]);
    }

    function setFromTextInput() {

      var value = textInput.val();

      if ((value === null || value === "") && allowEmpty) {
        set(null);
        updateOriginalInput(true);
      }
      else {
        var tiny = tinycolor(value);
        if (tiny.isValid()) {
          set(tiny);
          updateOriginalInput(true);
        }
        else {
          textInput.addClass("sp-validation-error");
        }
      }
    }

    function toggle() {
      if (visible) {
        hide();
      }
      else {
        show();
      }
    }

    function show() {
      var event = $.Event('beforeShow.spectrum');

      if (visible) {
        reflow();
        return;
      }

      boundElement.trigger(event, [ get() ]);

      if (callbacks.beforeShow(get()) === false || event.isDefaultPrevented()) {
        return;
      }

      hideAll();
      visible = true;

      $(doc).bind("keydown.spectrum", onkeydown);
      $(doc).bind("click.spectrum", clickout);
      $(window).bind("resize.spectrum", resize);
      replacer.addClass("sp-active");
      container.removeClass("sp-hidden");

      reflow();
      updateUI();

      colorOnShow = get();

      drawInitial();
      callbacks.show(colorOnShow);
      boundElement.trigger('show.spectrum', [ colorOnShow ]);
    }

    function onkeydown(e) {
      // Close on ESC
      if (e.keyCode === 27) {
        hide();
      }
    }

    function clickout(e) {
      // Return on right click.
      if (e.button == 2) { return; }

      // If a drag event was happening during the mouseup, don't hide
      // on click.
      if (isDragging) { return; }

      if (clickoutFiresChange) {
        updateOriginalInput(true);
      }
      else {
        revert();
      }
      hide();
    }

    function hide() {
      // Return if hiding is unnecessary
      if (!visible || flat) { return; }
      visible = false;

      $(doc).unbind("keydown.spectrum", onkeydown);
      $(doc).unbind("click.spectrum", clickout);
      $(window).unbind("resize.spectrum", resize);

      replacer.removeClass("sp-active");
      container.addClass("sp-hidden");

      callbacks.hide(get());
      boundElement.trigger('hide.spectrum', [ get() ]);
    }

    function revert() {
      set(colorOnShow, true);
    }

    function set(color, ignoreFormatChange) {
      if (tinycolor.equals(color, get())) {
        // Update UI just in case a validation error needs
        // to be cleared.
        updateUI();
        return;
      }

      var newColor, newHsv;
      if (!color && allowEmpty) {
        isEmpty = true;
      } else {
        isEmpty = false;
        newColor = tinycolor(color);
        newHsv = newColor.toHsv();

        currentHue = (newHsv.h % 360) / 360;
        currentSaturation = newHsv.s;
        currentValue = newHsv.v;
        currentAlpha = newHsv.a;
      }
      updateUI();

      if (newColor && newColor.isValid() && !ignoreFormatChange) {
        currentPreferredFormat = opts.preferredFormat || newColor.getFormat();
      }
    }

    function get(opts) {
      opts = opts || { };

      if (allowEmpty && isEmpty) {
        return null;
      }

      return tinycolor.fromRatio({
        h: currentHue,
        s: currentSaturation,
        v: currentValue,
        a: Math.round(currentAlpha * 100) / 100
      }, { format: opts.format || currentPreferredFormat });
    }

    function isValid() {
      return !textInput.hasClass("sp-validation-error");
    }

    function move() {
      updateUI();

      callbacks.move(get());
      boundElement.trigger('move.spectrum', [ get() ]);
    }

    function updateUI() {

      textInput.removeClass("sp-validation-error");

      updateHelperLocations();

      // Update dragger background color (gradients take care of saturation and value).
      var flatColor = tinycolor.fromRatio({ h: currentHue, s: 1, v: 1 });
      dragger.css("background-color", flatColor.toHexString());

      // Get a format that alpha will be included in (hex and names ignore alpha)
      var format = currentPreferredFormat;
      if (currentAlpha < 1 && !(currentAlpha === 0 && format === "name")) {
        if (format === "hex" || format === "hex3" || format === "hex6" || format === "name") {
          format = "rgb";
        }
      }

      var realColor = get({ format: format }),
        displayColor = '';

      //reset background info for preview element
      previewElement.removeClass("sp-clear-display");
      previewElement.css('background-color', 'transparent');

      if (!realColor && allowEmpty) {
        // Update the replaced elements background with icon indicating no color selection
        previewElement.addClass("sp-clear-display");
      }
      else {
        var realHex = realColor.toHexString(),
          realRgb = realColor.toRgbString();

        // Update the replaced elements background color (with actual selected color)
        if (rgbaSupport || realColor.alpha === 1) {
          previewElement.css("background-color", realRgb);
        }
        else {
          previewElement.css("background-color", "transparent");
          previewElement.css("filter", realColor.toFilter());
        }

        if (opts.showAlpha) {
          var rgb = realColor.toRgb();
          rgb.a = 0;
          var realAlpha = tinycolor(rgb).toRgbString();
          var gradient = "linear-gradient(left, " + realAlpha + ", " + realHex + ")";

          if (IE) {
            alphaSliderInner.css("filter", tinycolor(realAlpha).toFilter({ gradientType: 1 }, realHex));
          }
          else {
            alphaSliderInner.css("background", "-webkit-" + gradient);
            alphaSliderInner.css("background", "-moz-" + gradient);
            alphaSliderInner.css("background", "-ms-" + gradient);
            // Use current syntax gradient on unprefixed property.
            alphaSliderInner.css("background",
              "linear-gradient(to right, " + realAlpha + ", " + realHex + ")");
          }
        }

        displayColor = realColor.toString(format);
      }

      // Update the text entry input as it changes happen
      if (opts.showInput) {
        textInput.val(displayColor);
      }

      if (opts.showPalette) {
        drawPalette();
      }

      drawInitial();
    }

    function updateHelperLocations() {
      var s = currentSaturation;
      var v = currentValue;

      if(allowEmpty && isEmpty) {
        //if selected color is empty, hide the helpers
        alphaSlideHelper.hide();
        slideHelper.hide();
        dragHelper.hide();
      }
      else {
        //make sure helpers are visible
        alphaSlideHelper.show();
        slideHelper.show();
        dragHelper.show();

        // Where to show the little circle in that displays your current selected color
        var dragX = s * dragWidth;
        var dragY = dragHeight - (v * dragHeight);
        dragX = Math.max(
          -dragHelperHeight,
          Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight)
        );
        dragY = Math.max(
          -dragHelperHeight,
          Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight)
        );
        dragHelper.css({
          "top": dragY + "px",
          "left": dragX + "px"
        });

        var alphaX = currentAlpha * alphaWidth;
        alphaSlideHelper.css({
          "left": (alphaX - (alphaSlideHelperWidth / 2)) + "px"
        });

        // Where to show the bar that displays your current selected hue
        var slideY = (currentHue) * slideHeight;
        slideHelper.css({
          "top": (slideY - slideHelperHeight) + "px"
        });
      }
    }

    function updateOriginalInput(fireCallback) {
      var color = get(),
        displayColor = '',
        hasChanged = !tinycolor.equals(color, colorOnShow);

      if (color) {
        displayColor = color.toString(currentPreferredFormat);
        // Update the selection palette with the current color
        addColorToSelectionPalette(color);
      }

      if (isInput) {
        boundElement.val(displayColor);
      }

      if (fireCallback && hasChanged) {
        callbacks.change(color);
        boundElement.trigger('change', [ color ]);
      }
    }

    function reflow() {
      if (!visible) {
        return; // Calculations would be useless and wouldn't be reliable anyways
      }
      dragWidth = dragger.width();
      dragHeight = dragger.height();
      dragHelperHeight = dragHelper.height();
      slideWidth = slider.width();
      slideHeight = slider.height();
      slideHelperHeight = slideHelper.height();
      alphaWidth = alphaSlider.width();
      alphaSlideHelperWidth = alphaSlideHelper.width();

      if (!flat) {
        container.css("position", "absolute");
        if (opts.offset) {
          container.offset(opts.offset);
        } else {
          container.offset(getOffset(container, offsetElement));
        }
      }

      updateHelperLocations();

      if (opts.showPalette) {
        drawPalette();
      }

      boundElement.trigger('reflow.spectrum');
    }

    function destroy() {
      boundElement.show();
      offsetElement.unbind("click.spectrum touchstart.spectrum");
      container.remove();
      replacer.remove();
      spectrums[spect.id] = null;
    }

    function option(optionName, optionValue) {
      if (optionName === undefined) {
        return $.extend({}, opts);
      }
      if (optionValue === undefined) {
        return opts[optionName];
      }

      opts[optionName] = optionValue;

      if (optionName === "preferredFormat") {
        currentPreferredFormat = opts.preferredFormat;
      }
      applyOptions();
    }

    function enable() {
      disabled = false;
      boundElement.attr("disabled", false);
      offsetElement.removeClass("sp-disabled");
    }

    function disable() {
      hide();
      disabled = true;
      boundElement.attr("disabled", true);
      offsetElement.addClass("sp-disabled");
    }

    function setOffset(coord) {
      opts.offset = coord;
      reflow();
    }

    initialize();

    var spect = {
      show: show,
      hide: hide,
      toggle: toggle,
      reflow: reflow,
      option: option,
      enable: enable,
      disable: disable,
      offset: setOffset,
      set: function (c) {
        set(c);
        updateOriginalInput();
      },
      get: get,
      destroy: destroy,
      container: container
    };

    spect.id = spectrums.push(spect) - 1;

    return spect;
  }

  /**
   * checkOffset - get the offset below/above and left/right element depending on screen position
   * Thanks https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js
   */
  function getOffset(picker, input) {
    var extraY = 0;
    var dpWidth = picker.outerWidth();
    var dpHeight = picker.outerHeight();
    var inputHeight = input.outerHeight();
    var doc = picker[0].ownerDocument;
    var docElem = doc.documentElement;
    var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
    var viewHeight = docElem.clientHeight + $(doc).scrollTop();
    var offset = input.offset();
    offset.top += inputHeight;

    offset.left -=
      Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
        Math.abs(offset.left + dpWidth - viewWidth) : 0);

    offset.top -=
      Math.min(offset.top, ((offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
        Math.abs(dpHeight + inputHeight - extraY) : extraY));

    return offset;
  }

  /**
   * noop - do nothing
   */
  function noop() {

  }

  /**
   * stopPropagation - makes the code only doing this a little easier to read in line
   */
  function stopPropagation(e) {
    e.stopPropagation();
  }

  /**
   * Create a function bound to a given object
   * Thanks to underscore.js
   */
  function bind(func, obj) {
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 2);
    return function () {
      return func.apply(obj, args.concat(slice.call(arguments)));
    };
  }

  /**
   * Lightweight drag helper.  Handles containment within the element, so that
   * when dragging, the x is within [0,element.width] and y is within [0,element.height]
   */
  function draggable(element, onmove, onstart, onstop) {
    onmove = onmove || function () { };
    onstart = onstart || function () { };
    onstop = onstop || function () { };
    var doc = document;
    var dragging = false;
    var offset = {};
    var maxHeight = 0;
    var maxWidth = 0;
    var hasTouch = ('ontouchstart' in window);

    var duringDragEvents = {};
    duringDragEvents["selectstart"] = prevent;
    duringDragEvents["dragstart"] = prevent;
    duringDragEvents["touchmove mousemove"] = move;
    duringDragEvents["touchend mouseup"] = stop;

    function prevent(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.returnValue = false;
    }

    function move(e) {
      if (dragging) {
        // Mouseup happened outside of window
        if (IE && doc.documentMode < 9 && !e.button) {
          return stop();
        }

        var t0 = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
        var pageX = t0 && t0.pageX || e.pageX;
        var pageY = t0 && t0.pageY || e.pageY;

        var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
        var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));

        if (hasTouch) {
          // Stop scrolling in iOS
          prevent(e);
        }

        onmove.apply(element, [dragX, dragY, e]);
      }
    }

    function start(e) {
      var rightclick = (e.which) ? (e.which == 3) : (e.button == 2);

      if (!rightclick && !dragging) {
        if (onstart.apply(element, arguments) !== false) {
          dragging = true;
          maxHeight = $(element).height();
          maxWidth = $(element).width();
          offset = $(element).offset();

          $(doc).bind(duringDragEvents);
          $(doc.body).addClass("sp-dragging");

          move(e);

          prevent(e);
        }
      }
    }

    function stop() {
      if (dragging) {
        $(doc).unbind(duringDragEvents);
        $(doc.body).removeClass("sp-dragging");

        // Wait a tick before notifying observers to allow the click event
        // to fire in Chrome.
        setTimeout(function() {
          onstop.apply(element, arguments);
        }, 0);
      }
      dragging = false;
    }

    $(element).bind("touchstart mousedown", start);
  }

  function throttle(func, wait, debounce) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var throttler = function () {
        timeout = null;
        func.apply(context, args);
      };
      if (debounce) clearTimeout(timeout);
      if (debounce || !timeout) timeout = setTimeout(throttler, wait);
    };
  }

  function inputTypeColorSupport() {
    return $.fn.spectrum.inputTypeColorSupport();
  }

  /**
   * Define a jQuery plugin
   */
  var dataID = "spectrum.id";
  $.fn.spectrum = function (opts, extra) {

    if (typeof opts == "string") {

      var returnValue = this;
      var args = Array.prototype.slice.call( arguments, 1 );

      this.each(function () {
        var spect = spectrums[$(this).data(dataID)];
        if (spect) {
          var method = spect[opts];
          if (!method) {
            throw new Error( "Spectrum: no such method: '" + opts + "'" );
          }

          if (opts == "get") {
            returnValue = spect.get();
          }
          else if (opts == "container") {
            returnValue = spect.container;
          }
          else if (opts == "option") {
            returnValue = spect.option.apply(spect, args);
          }
          else if (opts == "destroy") {
            spect.destroy();
            $(this).removeData(dataID);
          }
          else {
            method.apply(spect, args);
          }
        }
      });

      return returnValue;
    }

    // Initializing a new instance of spectrum
    return this.spectrum("destroy").each(function () {
      var options = $.extend({}, opts, $(this).data());
      var spect = spectrum(this, options);
      $(this).data(dataID, spect.id);
    });
  };

  $.fn.spectrum.load = true;
  $.fn.spectrum.loadOpts = {};
  $.fn.spectrum.draggable = draggable;
  $.fn.spectrum.defaults = defaultOpts;
  $.fn.spectrum.inputTypeColorSupport = function inputTypeColorSupport() {
    if (typeof inputTypeColorSupport._cachedResult === "undefined") {
      var colorInput = $("<input type='color'/>")[0]; // if color element is supported, value will default to not null
      inputTypeColorSupport._cachedResult = colorInput.type === "color" && colorInput.value !== "";
    }
    return inputTypeColorSupport._cachedResult;
  };

  $.spectrum = { };
  $.spectrum.localization = { };
  $.spectrum.palettes = { };

  $.fn.spectrum.processNativeColorInputs = function () {
    var colorInputs = $("input[type=color]");
    if (colorInputs.length && !inputTypeColorSupport()) {
      colorInputs.spectrum({
        preferredFormat: "hex6"
      });
    }
  };

  // TinyColor v1.1.2
  // https://github.com/bgrins/TinyColor
  // Brian Grinstead, MIT License

  (function() {

    var trimLeft = /^[\s,#]+/,
      trimRight = /\s+$/,
      tinyCounter = 0,
      math = Math,
      mathRound = math.round,
      mathMin = math.min,
      mathMax = math.max,
      mathRandom = math.random;

    var tinycolor = function(color, opts) {

      color = (color) ? color : '';
      opts = opts || { };

      // If input is already a tinycolor, return itself
      if (color instanceof tinycolor) {
        return color;
      }
      // If we are called as a function, call using new instead
      if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
      }

      var rgb = inputToRGB(color);
      this._originalInput = color,
        this._r = rgb.r,
        this._g = rgb.g,
        this._b = rgb.b,
        this._a = rgb.a,
        this._roundA = mathRound(100*this._a) / 100,
        this._format = opts.format || rgb.format;
      this._gradientType = opts.gradientType;

      // Don't let the range of [0,255] come back in [0,1].
      // Potentially lose a little bit of precision here, but will fix issues where
      // .5 gets interpreted as half of the total, instead of half of 1
      // If it was supposed to be 128, this was already taken care of by `inputToRgb`
      if (this._r < 1) { this._r = mathRound(this._r); }
      if (this._g < 1) { this._g = mathRound(this._g); }
      if (this._b < 1) { this._b = mathRound(this._b); }

      this._ok = rgb.ok;
      this._tc_id = tinyCounter++;
    };

    tinycolor.prototype = {
      isDark: function() {
        return this.getBrightness() < 128;
      },
      isLight: function() {
        return !this.isDark();
      },
      isValid: function() {
        return this._ok;
      },
      getOriginalInput: function() {
        return this._originalInput;
      },
      getFormat: function() {
        return this._format;
      },
      getAlpha: function() {
        return this._a;
      },
      getBrightness: function() {
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      },
      setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
      },
      toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
      },
      toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
      },
      toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
      },
      toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
      },
      toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
      },
      toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
      },
      toHex8: function() {
        return rgbaToHex(this._r, this._g, this._b, this._a);
      },
      toHex8String: function() {
        return '#' + this.toHex8();
      },
      toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
      },
      toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
      },
      toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
      },
      toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
      },
      toName: function() {
        if (this._a === 0) {
          return "transparent";
        }

        if (this._a < 1) {
          return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
      },
      toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
          var s = tinycolor(secondColor);
          secondHex8String = s.toHex8String();
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
      },
      toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");

        if (needsAlphaFormat) {
          // Special case for "transparent", all other non-alpha formats
          // will return rgba when there is transparency.
          if (format === "name" && this._a === 0) {
            return this.toName();
          }
          return this.toRgbString();
        }
        if (format === "rgb") {
          formattedString = this.toRgbString();
        }
        if (format === "prgb") {
          formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
          formattedString = this.toHexString();
        }
        if (format === "hex3") {
          formattedString = this.toHexString(true);
        }
        if (format === "hex8") {
          formattedString = this.toHex8String();
        }
        if (format === "name") {
          formattedString = this.toName();
        }
        if (format === "hsl") {
          formattedString = this.toHslString();
        }
        if (format === "hsv") {
          formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
      },

      _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
      },
      lighten: function() {
        return this._applyModification(lighten, arguments);
      },
      brighten: function() {
        return this._applyModification(brighten, arguments);
      },
      darken: function() {
        return this._applyModification(darken, arguments);
      },
      desaturate: function() {
        return this._applyModification(desaturate, arguments);
      },
      saturate: function() {
        return this._applyModification(saturate, arguments);
      },
      greyscale: function() {
        return this._applyModification(greyscale, arguments);
      },
      spin: function() {
        return this._applyModification(spin, arguments);
      },

      _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
      },
      analogous: function() {
        return this._applyCombination(analogous, arguments);
      },
      complement: function() {
        return this._applyCombination(complement, arguments);
      },
      monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
      },
      splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
      },
      triad: function() {
        return this._applyCombination(triad, arguments);
      },
      tetrad: function() {
        return this._applyCombination(tetrad, arguments);
      }
    };

    // If input is an object, force 1 into "1.0" to handle ratios properly
    // String input requires "1.0" as input, so 1 will be treated as 1
    tinycolor.fromRatio = function(color, opts) {
      if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
          if (color.hasOwnProperty(i)) {
            if (i === "a") {
              newColor[i] = color[i];
            }
            else {
              newColor[i] = convertToPercentage(color[i]);
            }
          }
        }
        color = newColor;
      }

      return tinycolor(color, opts);
    };

    // Given a string or object, convert that input to RGB
    // Possible string inputs:
    //
    //     "red"
    //     "#f00" or "f00"
    //     "#ff0000" or "ff0000"
    //     "#ff000000" or "ff000000"
    //     "rgb 255 0 0" or "rgb (255, 0, 0)"
    //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
    //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
    //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
    //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
    //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
    //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
    //
    function inputToRGB(color) {

      var rgb = { r: 0, g: 0, b: 0 };
      var a = 1;
      var ok = false;
      var format = false;

      if (typeof color == "string") {
        color = stringInputToObject(color);
      }

      if (typeof color == "object") {
        if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
          rgb = rgbToRgb(color.r, color.g, color.b);
          ok = true;
          format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
          color.s = convertToPercentage(color.s);
          color.v = convertToPercentage(color.v);
          rgb = hsvToRgb(color.h, color.s, color.v);
          ok = true;
          format = "hsv";
        }
        else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
          color.s = convertToPercentage(color.s);
          color.l = convertToPercentage(color.l);
          rgb = hslToRgb(color.h, color.s, color.l);
          ok = true;
          format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
          a = color.a;
        }
      }

      a = boundAlpha(a);

      return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
      };
    }


    // Conversion Functions
    // --------------------

    // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
    // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

    // `rgbToRgb`
    // Handle bounds / percentage checking to conform to CSS color spec
    // <http://www.w3.org/TR/css3-color/>
    // *Assumes:* r, g, b in [0, 255] or [0, 1]
    // *Returns:* { r, g, b } in [0, 255]
    function rgbToRgb(r, g, b){
      return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
      };
    }

    // `rgbToHsl`
    // Converts an RGB color value to HSL.
    // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
    // *Returns:* { h, s, l } in [0,1]
    function rgbToHsl(r, g, b) {

      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);

      var max = mathMax(r, g, b), min = mathMin(r, g, b);
      var h, s, l = (max + min) / 2;

      if(max == min) {
        h = s = 0; // achromatic
      }
      else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
      }

      return { h: h, s: s, l: l };
    }

    // `hslToRgb`
    // Converts an HSL color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hslToRgb(h, s, l) {
      var r, g, b;

      h = bound01(h, 360);
      s = bound01(s, 100);
      l = bound01(l, 100);

      function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }

      if(s === 0) {
        r = g = b = l; // achromatic
      }
      else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }

      return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHsv`
    // Converts an RGB color value to HSV
    // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
    // *Returns:* { h, s, v } in [0,1]
    function rgbToHsv(r, g, b) {

      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);

      var max = mathMax(r, g, b), min = mathMin(r, g, b);
      var h, s, v = max;

      var d = max - min;
      s = max === 0 ? 0 : d / max;

      if(max == min) {
        h = 0; // achromatic
      }
      else {
        switch(max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return { h: h, s: s, v: v };
    }

    // `hsvToRgb`
    // Converts an HSV color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hsvToRgb(h, s, v) {

      h = bound01(h, 360) * 6;
      s = bound01(s, 100);
      v = bound01(v, 100);

      var i = math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

      return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHex`
    // Converts an RGB color to hex
    // Assumes r, g, and b are contained in the set [0, 255]
    // Returns a 3 or 6 character hex
    function rgbToHex(r, g, b, allow3Char) {

      var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
      ];

      // Return a 3 character hex if possible
      if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
      }

      return hex.join("");
    }
    // `rgbaToHex`
    // Converts an RGBA color plus alpha transparency to hex
    // Assumes r, g, b and a are contained in the set [0, 255]
    // Returns an 8 character hex
    function rgbaToHex(r, g, b, a) {

      var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
      ];

      return hex.join("");
    }

    // `equals`
    // Can be called with any tinycolor input
    tinycolor.equals = function (color1, color2) {
      if (!color1 || !color2) { return false; }
      return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
    };
    tinycolor.random = function() {
      return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
      });
    };


    // Modification Functions
    // ----------------------
    // Thanks to less.js for some of the basics here
    // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

    function desaturate(color, amount) {
      amount = (amount === 0) ? 0 : (amount || 10);
      var hsl = tinycolor(color).toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor(hsl);
    }

    function saturate(color, amount) {
      amount = (amount === 0) ? 0 : (amount || 10);
      var hsl = tinycolor(color).toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor(hsl);
    }

    function greyscale(color) {
      return tinycolor(color).desaturate(100);
    }

    function lighten (color, amount) {
      amount = (amount === 0) ? 0 : (amount || 10);
      var hsl = tinycolor(color).toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor(hsl);
    }

    function brighten(color, amount) {
      amount = (amount === 0) ? 0 : (amount || 10);
      var rgb = tinycolor(color).toRgb();
      rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
      rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
      rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
      return tinycolor(rgb);
    }

    function darken (color, amount) {
      amount = (amount === 0) ? 0 : (amount || 10);
      var hsl = tinycolor(color).toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor(hsl);
    }

    // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
    // Values outside of this range will be wrapped into this range.
    function spin(color, amount) {
      var hsl = tinycolor(color).toHsl();
      var hue = (mathRound(hsl.h) + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return tinycolor(hsl);
    }

    // Combination Functions
    // ---------------------
    // Thanks to jQuery xColor for some of the ideas behind these
    // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

    function complement(color) {
      var hsl = tinycolor(color).toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return tinycolor(hsl);
    }

    function triad(color) {
      var hsl = tinycolor(color).toHsl();
      var h = hsl.h;
      return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
      ];
    }

    function tetrad(color) {
      var hsl = tinycolor(color).toHsl();
      var h = hsl.h;
      return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
      ];
    }

    function splitcomplement(color) {
      var hsl = tinycolor(color).toHsl();
      var h = hsl.h;
      return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
      ];
    }

    function analogous(color, results, slices) {
      results = results || 6;
      slices = slices || 30;

      var hsl = tinycolor(color).toHsl();
      var part = 360 / slices;
      var ret = [tinycolor(color)];

      for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
      }
      return ret;
    }

    function monochromatic(color, results) {
      results = results || 6;
      var hsv = tinycolor(color).toHsv();
      var h = hsv.h, s = hsv.s, v = hsv.v;
      var ret = [];
      var modification = 1 / results;

      while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
      }

      return ret;
    }

    // Utility Functions
    // ---------------------

    tinycolor.mix = function(color1, color2, amount) {
      amount = (amount === 0) ? 0 : (amount || 50);

      var rgb1 = tinycolor(color1).toRgb();
      var rgb2 = tinycolor(color2).toRgb();

      var p = amount / 100;
      var w = p * 2 - 1;
      var a = rgb2.a - rgb1.a;

      var w1;

      if (w * a == -1) {
        w1 = w;
      } else {
        w1 = (w + a) / (1 + w * a);
      }

      w1 = (w1 + 1) / 2;

      var w2 = 1 - w1;

      var rgba = {
        r: rgb2.r * w1 + rgb1.r * w2,
        g: rgb2.g * w1 + rgb1.g * w2,
        b: rgb2.b * w1 + rgb1.b * w2,
        a: rgb2.a * p  + rgb1.a * (1 - p)
      };

      return tinycolor(rgba);
    };


    // Readability Functions
    // ---------------------
    // <http://www.w3.org/TR/AERT#color-contrast>

    // `readability`
    // Analyze the 2 colors and returns an object with the following properties:
    //    `brightness`: difference in brightness between the two colors
    //    `color`: difference in color/hue between the two colors
    tinycolor.readability = function(color1, color2) {
      var c1 = tinycolor(color1);
      var c2 = tinycolor(color2);
      var rgb1 = c1.toRgb();
      var rgb2 = c2.toRgb();
      var brightnessA = c1.getBrightness();
      var brightnessB = c2.getBrightness();
      var colorDiff = (
        Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) +
        Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) +
        Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b)
      );

      return {
        brightness: Math.abs(brightnessA - brightnessB),
        color: colorDiff
      };
    };

    // `readable`
    // http://www.w3.org/TR/AERT#color-contrast
    // Ensure that foreground and background color combinations provide sufficient contrast.
    // *Example*
    //    tinycolor.isReadable("#000", "#111") => false
    tinycolor.isReadable = function(color1, color2) {
      var readability = tinycolor.readability(color1, color2);
      return readability.brightness > 125 && readability.color > 500;
    };

    // `mostReadable`
    // Given a base color and a list of possible foreground or background
    // colors for that base, returns the most readable color.
    // *Example*
    //    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
    tinycolor.mostReadable = function(baseColor, colorList) {
      var bestColor = null;
      var bestScore = 0;
      var bestIsReadable = false;
      for (var i=0; i < colorList.length; i++) {

        // We normalize both around the "acceptable" breaking point,
        // but rank brightness constrast higher than hue.

        var readability = tinycolor.readability(baseColor, colorList[i]);
        var readable = readability.brightness > 125 && readability.color > 500;
        var score = 3 * (readability.brightness / 125) + (readability.color / 500);

        if ((readable && ! bestIsReadable) ||
          (readable && bestIsReadable && score > bestScore) ||
          ((! readable) && (! bestIsReadable) && score > bestScore)) {
          bestIsReadable = readable;
          bestScore = score;
          bestColor = tinycolor(colorList[i]);
        }
      }
      return bestColor;
    };


    // Big List of Colors
    // ------------------
    // <http://www.w3.org/TR/css3-color/#svg-color>
    var names = tinycolor.names = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "0ff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "00f",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "0ff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "f0f",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32"
    };

    // Make it easy to access colors via `hexNames[hex]`
    var hexNames = tinycolor.hexNames = flip(names);


    // Utilities
    // ---------

    // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
    function flip(o) {
      var flipped = { };
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          flipped[o[i]] = i;
        }
      }
      return flipped;
    }

    // Return a valid alpha value [0,1] with all invalid values being set to 1
    function boundAlpha(a) {
      a = parseFloat(a);

      if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
      }

      return a;
    }

    // Take input from [0, n] and return it as [0, 1]
    function bound01(n, max) {
      if (isOnePointZero(n)) { n = "100%"; }

      var processPercent = isPercentage(n);
      n = mathMin(max, mathMax(0, parseFloat(n)));

      // Automatically convert percentage into number
      if (processPercent) {
        n = parseInt(n * max, 10) / 100;
      }

      // Handle floating point rounding errors
      if ((math.abs(n - max) < 0.000001)) {
        return 1;
      }

      // Convert into [0, 1] range if it isn't already
      return (n % max) / parseFloat(max);
    }

    // Force a number between 0 and 1
    function clamp01(val) {
      return mathMin(1, mathMax(0, val));
    }

    // Parse a base-16 hex value into a base-10 integer
    function parseIntFromHex(val) {
      return parseInt(val, 16);
    }

    // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
    // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
    function isOnePointZero(n) {
      return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
    }

    // Check to see if string passed in is a percentage
    function isPercentage(n) {
      return typeof n === "string" && n.indexOf('%') != -1;
    }

    // Force a hex value to have 2 characters
    function pad2(c) {
      return c.length == 1 ? '0' + c : '' + c;
    }

    // Replace a decimal with it's percentage value
    function convertToPercentage(n) {
      if (n <= 1) {
        n = (n * 100) + "%";
      }

      return n;
    }

    // Converts a decimal to a hex value
    function convertDecimalToHex(d) {
      return Math.round(parseFloat(d) * 255).toString(16);
    }
    // Converts a hex value to a decimal
    function convertHexToDecimal(h) {
      return (parseIntFromHex(h) / 255);
    }

    var matchers = (function() {

      // <http://www.w3.org/TR/css3-values/#integers>
      var CSS_INTEGER = "[-\\+]?\\d+%?";

      // <http://www.w3.org/TR/css3-values/#number-value>
      var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

      // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
      var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

      // Actual matching.
      // Parentheses and commas are optional, but not required.
      // Whitespace can take the place of commas or opening paren
      var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
      var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

      return {
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
      };
    })();

    // `stringInputToObject`
    // Permissive string parsing.  Take in a number of formats, and output an object
    // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
    function stringInputToObject(color) {

      color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
      var named = false;
      if (names[color]) {
        color = names[color];
        named = true;
      }
      else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
      }

      // Try to match string input using regular expressions.
      // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
      // Just return an object and let the conversion functions handle that.
      // This way the result will be the same whether the tinycolor is initialized with string or object.
      var match;
      if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
      }
      if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
      }
      if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
      }
      if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
      }
      if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
      }
      if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
      }
      if ((match = matchers.hex8.exec(color))) {
        return {
          a: convertHexToDecimal(match[1]),
          r: parseIntFromHex(match[2]),
          g: parseIntFromHex(match[3]),
          b: parseIntFromHex(match[4]),
          format: named ? "name" : "hex8"
        };
      }
      if ((match = matchers.hex6.exec(color))) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          format: named ? "name" : "hex"
        };
      }
      if ((match = matchers.hex3.exec(color))) {
        return {
          r: parseIntFromHex(match[1] + '' + match[1]),
          g: parseIntFromHex(match[2] + '' + match[2]),
          b: parseIntFromHex(match[3] + '' + match[3]),
          format: named ? "name" : "hex"
        };
      }

      return false;
    }

    window.tinycolor = tinycolor;
  })();

  $(function () {
    if ($.fn.spectrum.load) {
      $.fn.spectrum.processNativeColorInputs();
    }
  });

}(window.jQuery);
},{}],4:[function(require,module,exports){
/*
 * jQuery UIx Multiselect 2.0
 *
 * Authors:
 *  Yanick Rochon (yanick.rochon[at]gmail[dot]com)
 *
 * Licensed under the MIT (MIT-LICENSE.txt) license.
 *
 * http://mind2soft.com/labs/jquery/multiselect/
 *
 *
 * Depends:
 * jQuery UI 1.8+
 *
 */

(function($, window, undefined) {
  // ECMAScript 5 Strict Mode: [John Resig Blog Post](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)


  // Each instance must have their own drag and drop scope. We use a global page scope counter
  // so we do not create two instances with mistankenly the same scope! We do not support
  // cross instance drag and drop; this would require also copying the OPTION element and it
  // would slow the component down. This is not the widget's contract anyhow.
  var globalScope = 0;

  var DEF_OPTGROUP = '';
  var PRE_OPTGROUP = 'group-';

  // these events will trigger on the original element
  //var NATIVE_EVENTS = ["change"];   // for version 2.1

  // a list of predefined events
  //var EVENT_CHANGE = 'change';    // for version 2.1
  var EVENT_CHANGE = 'multiselectChange';
  //var EVENT_SEARCH = 'beforesearch';   // for version 2.1
  var EVENT_SEARCH = 'multiselectSearch';
  var EVENT_REORDERED = 'multiselectReordered';

  // The jQuery.uix namespace will automatically be created if it doesn't exist
  $.widget("uix.multiselect", {
    options: {
      availableListPosition: 'right',// 'top', 'right', 'bottom', 'left'; the position of the available list (default: 'right')
      // beforesearch: null,            // a funciton called before searching. If the default is prevented, search will not happen (for version 2.1)
      collapsableGroups: true,       // tells whether the option groups can be collapsed or not (default: true)
      created: null,                 // a function called when the widget is done loading (default: null)
      defaultGroupName: '',          // the name of the default option group (default: '')
      filterSelected: false,         // when searching, filter selected options also? (default: false)
      locale: 'auto',                // any valid locale, 'auto', or '' for default built-in strings (default: 'auto')
      moveEffect: null,              // 'blind','bounce','clip','drop','explode','fold','highlight','puff','pulsate','shake','slide' (default: null)
      moveEffectOptions: {},         // effect options (see jQuery UI documentation) (default: {})
      moveEffectSpeed: null,         // string ('slow','fast') or number in millisecond (ignored if moveEffect is 'show') (default: null)
      optionRenderer: false,         // a function that will return the item element to be rendered in the list (default: false)
      optionGroupRenderer: false,    // a function that will return the group item element to be rendered (default: false)
      searchDelay: 500,              // the search delay in ms (default: 500)
      searchField: 'toggle',         // false, true, 'toggle'; set the search field behaviour (default: 'toggle')
      searchPreFilter: null,         // prepare the search term before filtering.
      searchFilter: null,            // a search filter. Will receive the term and OPTION element and should return a boolean value.
      searchHeader: 'available',     // 'available', 'selected'; set the list header that will host the search field (default: 'available')
      selectionMode: 'click,d&d',    // how options can be selected separated by commas: 'click', "dblclick" and 'd&d' (default: 'click,d&d')
      showDefaultGroupHeader: false, // show the default option group header (default: false)
      showEmptyGroups: false,        // always display option groups even if empty (default: false)
      splitRatio: 0.55,              // % of the left list's width of the widget total width (default 0.55)
      sortable: false,               // if the selected list should be user sortable or not
      sortMethod: null,              // null, 'standard', 'natural'; a sort function name (see ItemComparators), or a custom function (default: null)
      selectAll: 'both'              // 'available', 'selected', 'both', 'none' - Whether or not to display a select or deselect all icon (default: 'both')
    },

    _create: function() {
      var that = this;
      var selListHeader, selListContent, avListHeader, avListContent;
      var btnSelectAll, btnDeselectAll;

      this.scope = 'multiselect' + (globalScope++);
      this.optionGroupIndex = 1;
      this._setLocale(this.options.locale);

      this.element.addClass('uix-multiselect-original');
      this._elementWrapper = $('<div></div>').addClass('uix-multiselect ui-widget')
        .css({
          width: this.element.css('width'),
          height: this.element.css('height')
        })
        .append(
          $('<div></div>').addClass('multiselect-selected-list')
            .append( $('<div></div>').addClass('ui-widget-header')
              .append( btnDeselectAll = $('<button></button>', { type:"button" }).addClass('uix-control-right')
                .attr('data-localekey', 'deselectAll')
                .attr('title', this._t('deselectAll'))
                .button({icon: 'ui-icon-arrowthickstop-1-e', text:false})
                .click(function(e) { e.preventDefault(); e.stopPropagation(); that.optionCache.setSelectedAll(false); return false; })
                ['both,selected'.indexOf(this.options.selectAll)>=0 ? 'show' : 'hide']()
              )
              .append( selListHeader = $('<div></div>').addClass('header-text') )
            )
            .append( selListContent = $('<div></div>').addClass('uix-list-container ui-widget-content') )
        )
        ['right,top'.indexOf(this.options.availableListPosition)>=0?'prepend':'append'](
        $('<div></div>').addClass('multiselect-available-list')
          .append( $('<div></div>').addClass('ui-widget-header')
            .append( btnSelectAll = $('<button></button>', { type:"button" }).addClass('uix-control-right')
              .attr('data-localekey', 'selectAll')
              .attr('title', this._t('selectAll'))
              .button({icon:'ui-icon-arrowthickstop-1-w', text:false})
              .click(function(e) { e.preventDefault(); e.stopPropagation(); that.optionCache.setSelectedAll(true); return false; })
              ['both,available'.indexOf(this.options.selectAll)>=0 ? 'show' : 'hide']()
            )
            .append( avListHeader = $('<div></div>').addClass('header-text') )

          )
          .append( avListContent  = $('<div></div>').addClass('uix-list-container ui-widget-content') )
      )
        .insertAfter(this.element)
      ;

      this._buttons = {
        'selectAll': btnSelectAll,
        'deselectAll': btnDeselectAll
      };
      this._headers = {
        'selected': selListHeader,
        'available': avListHeader
      };
      this._lists = {
        'selected': selListContent.attr('id', this.scope+'_selListContent'),
        'available': avListContent.attr('id', this.scope+'_avListContent')
      };

      this.optionCache = new OptionCache(this);
      this._searchDelayed = new SearchDelayed(this);

      this._initSearchable();

      this._applyListDroppable();

      this.refresh(this.options.created);
    },

    /**
     * ***************************************
     *   PUBLIC
     * ***************************************
     */

    /**
     * Refresh all the lists from the underlaying element. This method is executed
     * asynchronously from the call, therefore it returns immediately. However, the
     * method accepts a callback parameter which will be executed when the refresh is
     * complete.
     *
     * @param callback   function    a callback function called when the refresh is complete
     */
    refresh: function(callback) {
      this._resize();  // just make sure we display the widget right without delay
      asyncFunction(function() {
        this.optionCache.cleanup();

        var opt, options = this.element[0].childNodes;

        for (var i=0, l1=options.length; i<l1; i++) {
          opt = options[i];
          if (opt.nodeType === 1) {
            if (opt.tagName.toUpperCase() === 'OPTGROUP') {
              var optGroup = $(opt).data('option-group') || (PRE_OPTGROUP + (this.optionGroupIndex++));
              var grpOptions = opt.childNodes;

              this.optionCache.prepareGroup($(opt), optGroup);

              for (var j=0, l2=grpOptions.length; j<l2; j++) {
                opt = grpOptions[j];
                if (opt.nodeType === 1) {
                  this.optionCache.prepareOption($(opt), optGroup);
                }
              }
            } else {
              this.optionCache.prepareOption($(opt));  // add to default group
            }
          }
        }

        this.optionCache.reIndex();

        if (this._searchField && this._searchField.is(':visible')) {
          this._search(null, true);
        }

        if (callback) callback();
      }, 10, this);

    },

    /**
     * Search the list of available items and filter them. If the parameter 'text' is
     * undefined, the actual value from the search field is used. If 'text' is specified,
     * the search field is updated.
     *
     * @param options string|object    (optional) the search options
     */
    search: function(options) {
      if (typeof options != 'object') {
        options = {showInput: true, text: options};
      }

      if ((options.toggleInput != false) && !this._searchField.is(':visible')) {
        this._buttons.search.trigger('click');
      }

      this._search(options.text, !!options.silent);
    },

    /**
     * Dynamically change the locale for the widget. If the specified locale is not
     * found, the default locale will be used. If locale is undefined, the current locale
     * will be returned
     */
    locale: function(locale) {

      if (locale === undefined) {
        return this.options.locale;
      } else {
        this._setLocale(locale);

        this._updateControls();
        this._updateHeaders();
      }
    },

    _destroy: function() {
      this.optionCache.reset(true);
      this._lists['selected'].empty().remove();
      this._lists['available'].empty().remove();
      this._elementWrapper.empty().remove();

      delete this.optionCache;
      delete this._searchDelayed;
      delete this._lists;
      delete this._elementWrapper;

      this.element.removeClass('uix-multiselect-original');
    },

    /**
     * ***************************************
     *   PRIVATE
     * ***************************************
     */

    _initSearchable: function() {
      var isToggle = ('toggle' === this.options.searchField);
      var searchHeader = this.options.searchHeader;

      if (isToggle) {
        var that = this;
        this._buttons['search'] = $('<button></button', { type:"button" }).addClass('uix-control-right')
          .attr('data-localekey', 'search')
          .attr('title', this._t('search'))
          .button({icon:'ui-icon-search', text:false})
          .click(function(e) {
            e.preventDefault(); e.stopPropagation();
            if (that._searchField.is(':visible')) {
              var b = $(this);
              that._headers[searchHeader].css('visibility', 'visible').fadeTo('fast', 1.0);
              that._searchField.hide('slide', {direction: 'right'}, 200, function() { b.removeClass('ui-corner-right ui-state-active').addClass('ui-corner-all'); });
              that._searchDelayed.cancelLastRequest();
              that.optionCache.filter('');
            } else {
              that._headers[searchHeader].fadeTo('fast', 0.1, function() { $(this).css('visibility', 'hidden'); });
              $(this).removeClass('ui-corner-all').addClass('ui-corner-right ui-state-active');
              that._searchField.show('slide', {direction: 'right'}, 200, function() { $(this).focus(); });
              that._search();
            }
            return false;
          })
          .insertBefore( this._headers[searchHeader] );
      }
      if (this.options.searchField) {
        if (!isToggle) {
          this._headers[searchHeader].hide();
        }
        this._searchField = $('<input type="text" />').addClass('uix-search ui-widget-content ui-corner-' + (isToggle ? 'left' : 'all'))[isToggle ? 'hide' : 'show']()
          .insertBefore( this._headers[searchHeader] )
          .focus(function() { $(this).select(); })
          .on("keydown keypress", function(e) { if (e.keyCode == 13) { e.preventDefault(); e.stopPropagation(); return false; } })
          .keyup($.proxy(this._searchDelayed.request, this._searchDelayed));
      }
    },

    _applyListDroppable: function() {
      if (this.options.selectionMode.indexOf('d&d') == -1) return;

      var _optionCache = this.optionCache;
      var currentScope = this.scope;

      var getElementData = function(d) {
        return _optionCache._elements[d.data('element-index')];
      };

      var initDroppable = function(e, s) {
        e.droppable({
          accept: function(draggable) {
            var eData = getElementData(draggable);
            return eData && (eData.selected != s);  // from different seleciton only
          },
          activeClass: 'ui-state-highlight',
          scope: currentScope,
          drop: function(evt, ui) {
            ui.draggable.removeClass('ui-state-disabled');
            ui.helper.remove();
            _optionCache.setSelected(getElementData(ui.draggable), s);
          }
        });
      }

      initDroppable(this._lists['selected'], true);
      initDroppable(this._lists['available'], false);

      if (this.options.sortable) {
        var that = this;
        this._lists['selected'].sortable({
          appendTo: 'parent',
          axis: "y",
          containment: $('.multiselect-selected-list', this._elementWrapper), //"parent",
          items: '.multiselect-element-wrapper',
          handle: '.group-element',
          revert: true,
          stop: $.proxy(function(evt, ui) {
            var prevGroup;
            $('.multiselect-element-wrapper', that._lists['selected']).each(function() {
              var currGroup = that.optionCache._groups.get($(this).data('option-group'));
              if (!prevGroup) {
                that.element.append(currGroup.groupElement);
              } else {
                currGroup.groupElement.insertAfter(prevGroup.groupElement);
              }
              prevGroup = currGroup;
            });
          }, this)
        });
      }
    },

    _search: function(term, silent) {
      if (this._searchField.is(':visible')) {
        if (typeof term === "string") {   // issue #36
          this._searchField.val(term);
        } else {
          term = this._searchField.val();
        }
      }

      this.optionCache.filter(term, silent);
    },

    _setLocale: function(locale) {
      if (locale == 'auto') {
        locale = navigator.userLanguage ||
          navigator.language ||
          navigator.browserLanguage ||
          navigator.systemLanguage ||
          '';
      }
      if (!$.uix.multiselect.i18n[locale]) {
        locale = '';   // revert to default is not supported auto locale
      }
      this.options.locale = locale;
    },

    _t: function(key, plural, data) {
      return _({locale:this.options.locale, key:key, plural:plural, data:data});
    },

    _updateControls: function() {
      var that = this;
      $('.uix-control-left,.uix-control-right', this._elementWrapper).each(function() {
        $(this).attr('title', that._t( $(this).attr('data-localekey') ));
      });
    },

    _updateHeaders: function() {
      var t, info = this.optionCache.getSelectionInfo();

      this._headers['selected']
        .text( t = this._t('itemsSelected', info.selected.total, {count:info.selected.total}) )
        .parent().attr('title',
        this.options.filterSelected
          ? this._t('itemsSelected', info.selected.count, {count:info.selected.count}) + ", " +
          this._t('itemsFiltered', info.selected.filtered, {count:info.selected.filtered})
          : t
      );
      this._headers['available']
        .text( this._t('itemsAvailable', info.available.total, {count:info.available.total}) )
        .parent().attr('title',
        this._t('itemsAvailable', info.available.count, {count:info.available.count}) + ", " +
        this._t('itemsFiltered', info.available.filtered, {count:info.available.filtered}) );
    },

    // call this method whenever the widget resizes
    // NOTE : the widget MUST be visible and have a width and height when calling this
    _resize: function() {
      var pos = this.options.availableListPosition.toLowerCase();         // shortcut
      var sSize = ('left,right'.indexOf(pos) >= 0) ? 'Width' : 'Height';  // split size fn
      var tSize = ('left,right'.indexOf(pos) >= 0) ? 'Height' : 'Width';  // total size fn
      var cSl = this.element['outer'+sSize]() * this.options.splitRatio;  // list container size selected
      var cAv = this.element['outer'+sSize]() - cSl;                      // ... available
      var hSl = (tSize === 'Width') ? cSl : this.element.outerHeight();   // scrollable area size selected
      var hAv = (tSize === 'Width') ? cAv : this.element.outerHeight();   // ... available
      var styleRule = ('left,right'.indexOf(pos) >= 0) ? 'left' : 'top';  // CSS rule for offsetting
      var swap = ('left,top'.indexOf(pos) >= 0);                          // true if we swap left-right or top-bottom
      var isToggle = ('toggle' === this.options.searchField);             // true if search field is toggle-able
      var headerBordersBoth = 'ui-corner-tl ui-corner-tr ui-corner-bl ui-corner-br ui-corner-top';
      var hSlCls = (tSize === 'Width') ? (swap ? '' : 'ui-corner-top') : (swap ? 'ui-corner-tr' : 'ui-corner-tl');
      var hAvCls = (tSize === 'Width') ? (swap ? 'ui-corner-top' : '') : (swap ? 'ui-corner-tl' : 'ui-corner-tr');

      // calculate outer lists dimensions
      this._elementWrapper.find('.multiselect-available-list')
        [sSize.toLowerCase()](cAv).css(styleRule, swap ? 0 : cSl)
        [tSize.toLowerCase()](this.element['outer'+tSize]() + 1);  // account for borders
      this._elementWrapper.find('.multiselect-selected-list')
        [sSize.toLowerCase()](cSl).css(styleRule, swap ? cAv : 0)
        [tSize.toLowerCase()](this.element['outer'+tSize]() + 1); // account for borders

      // selection all button
      this._buttons['selectAll'].button('option', 'icons', {primary: transferIcon(pos, 'ui-icon-arrowthickstop-1-', false) });
      this._buttons['deselectAll'].button('option', 'icons', {primary: transferIcon(pos, 'ui-icon-arrowthickstop-1-', true) });

      // header borders
      this._headers['available'].parent().removeClass(headerBordersBoth).addClass(hAvCls);
      this._headers['selected'].parent().removeClass(headerBordersBoth).addClass(hSlCls);

      // make both headers equal!
      if (!isToggle) {
        var h = Math.max(this._headers['selected'].parent().height(), this._headers['available'].parent().height());
        this._headers['available'].parent().height(h);
        this._headers['selected'].parent().height(h);
      }
      // adjust search field width
      if (this._searchField) {
        this._searchField.width( (sSize === 'Width' ? cAv : this.element.width()) - (isToggle ? 52 : 26) );  // issue #50
      }

      // calculate inner lists height
      this._lists['available'].height(hAv - this._headers['available'].parent().outerHeight() - 2);  // account for borders
      this._lists['selected'].height(hSl - this._headers['selected'].parent().outerHeight() - 2);    // account for borders
    },

    /**
     * return false if the event was prevented by an handler, true otherwise
     */
    _triggerUIEvent: function(event, ui) {
      var eventType;

      if (typeof event === 'string') {
        eventType = event;
        event = $.Event(event);
      } else {
        eventType = event.type;
      }

      //console.log($.inArray(event.type, NATIVE_EVENTS));

      //if ($.inArray(event.type, NATIVE_EVENTS) > -1) {
      this.element.trigger(event, ui);
      //} else {
      //    this._trigger(eventType, event, ui);
      //}

      return !event.isDefaultPrevented();
    },

    _setOption: function(key, value) {
      // Use the _setOption method to respond to changes to options
      switch(key) {
        // TODO
      }
      if (typeof(this._superApply) == 'function'){
        this._superApply(arguments);
      }else{
        $.Widget.prototype._setOption.apply(this, arguments);
      }
    }
  });



  /**
   * Comparator registry.
   *
   * function(a, b, g)   where a is compared to b and g is true if they are groups
   */
  var ItemComparators = {
    /**
     * Naive general implementation
     */
    standard: function(a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    },
    /*
     * Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
     * Author: Jim Palmer (based on chunking idea from Dave Koelle)
     */
    natural: function naturalSort(a, b) {
      var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
        sre = /(^[ ]*|[ ]*$)/g,
        dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        hre = /^0x[0-9a-f]+$/i,
        ore = /^0/,
        i = function(s) { return naturalSort.insensitive && (''+s).toLowerCase() || ''+s },
        // convert all to strings strip whitespace
        x = i(a).replace(sre, '') || '',
        y = i(b).replace(sre, '') || '',
        // chunk/tokenize
        xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        // numeric, hex or date detection
        xD = parseInt(x.match(hre)) || (xN.length != 1 && x.match(dre) && Date.parse(x)),
        yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null,
        oFxNcL, oFyNcL;
      // first try and sort Hex codes or Dates
      if (yD)
        if ( xD < yD ) return -1;
        else if ( xD > yD ) return 1;
      // natural sorting through split numeric strings and default strings
      for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
        // find floats not starting with '0', string or 0 if not defined (Clint Priest)
        oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
        oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
        // handle numeric vs string comparison - number < string - (Kyle Adams)
        if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
        // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
        else if (typeof oFxNcL !== typeof oFyNcL) {
          oFxNcL += '';
          oFyNcL += '';
        }
        if (oFxNcL < oFyNcL) return -1;
        if (oFxNcL > oFyNcL) return 1;
      }
      return 0;
    }
  };


  var transferDirection = ['n','e','s','w'];                          // button icon direction
  var transferOrientation = ['bottom','left','top','right'];    // list of matching directions with icons
  var transferIcon = function(pos, prefix, selected) {
    return prefix + transferDirection[($.inArray(pos.toLowerCase(), transferOrientation) + (selected ? 2 : 0)) % 4];
  };

  /**
   * setTimeout on steroids!
   */
  var asyncFunction = function(callback, timeout, self) {
    var args = Array.prototype.slice.call(arguments, 3);
    return setTimeout(function() {
      callback.apply(self || window, args);
    }, timeout);
  };


  var SearchDelayed = function(widget, options) {
    this._widget = widget;
    this._options = options;
    this._lastSearchValue = null;
  };

  SearchDelayed.prototype = {
    request: function() {
      if (this._widget._searchField.val() == this._lastSearchValue) return;  // prevent searching twice same term

      this.cancelLastRequest();

      this._timeout = asyncFunction(function() {
        this._timeout = null;
        this._lastSearchValue = this._widget._searchField.val();

        this._widget._search();
      }, this._widget.options.searchDelay, this);
    },
    cancelLastRequest: function() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
    }
  };

  /**
   * Map of all option groups
   */
  var GroupCache = function(comp) {
    // private members

    var keys = [];
    var items = {};
    var comparator = comp;

    // public methods

    this.setComparator = function(comp) {
      comparator = comp;
      return this;
    };

    this.clear = function() {
      keys = [];
      items = {};
      return this;
    };

    this.containsKey = function(key) {
      return !!items[key];
    };

    this.get = function(key) {
      return items[key];
    };

    this.put = function(key, val) {
      if (!items[key]) {
        if (comparator) {
          keys.splice((function() {
            var low = 0, high = keys.length;
            var mid = -1, c = 0;
            while (low < high) {
              mid = parseInt((low + high)/2);
              var a = items[keys[mid]].groupElement;
              var b = val.groupElement;
              c = comparator(a ? a.attr('label') : DEF_OPTGROUP, b ? b.attr('label') : DEF_OPTGROUP);
              if (c < 0)   {
                low = mid + 1;
              } else if (c > 0) {
                high = mid;
              } else {
                return mid;
              }
            }
            return low;
          })(), 0, key);
        } else {
          keys.push(key);
        }
      }

      items[key] = val;
      return this;
    };

    this.remove = function(key) {
      delete items[key];
      return keys.splice(keys.indexOf(key), 1);
    };

    this.each = function(callback) {
      var args = Array.prototype.slice.call(arguments, 1);
      args.splice(0, 0, null, null);
      for (var i=0, len=keys.length; i<len; i++) {
        args[0] = keys[i];
        args[1] = items[keys[i]];
        callback.apply(args[1], args);
      }
      return this;
    };

  };

  var OptionCache = function(widget) {
    this._widget = widget;
    this._listContainers = {
      'selected': $('<div></div>').appendTo(this._widget._lists['selected']),
      'available': $('<div></div>').appendTo(this._widget._lists['available'])
    };

    this._elements = [];
    this._groups = new GroupCache();

    this._moveEffect = {
      fn: widget.options.moveEffect,
      options: widget.options.moveEffectOptions,
      speed: widget.options.moveEffectSpeed
    };

    this._selectionMode = this._widget.options.selectionMode.indexOf('dblclick') > -1 ? 'dblclick'
      : this._widget.options.selectionMode.indexOf('click') > -1 ? 'click' : false;

    this.reset();
  };

  OptionCache.Options = {
    batchCount: 200,
    batchDelay: 50
  };

  OptionCache.prototype = {
    _createGroupElement: function(grpElement, optGroup, selected) {
      var that = this;
      var gData;

      var getLocalData = function() {
        if (!gData) gData = that._groups.get(optGroup);
        return gData;
      };

      var getGroupName = function() {
        return grpElement ? grpElement.attr('label') : that._widget.options.defaultGroupName;
      };

      var labelCount = $('<span></span>').addClass('label')
        .text(getGroupName() + ' (0)')
        .attr('title', getGroupName() + ' (0)');

      var fnUpdateCount = function() {
        var gDataDst = getLocalData()[selected?'selected':'available'];

        gDataDst.listElement[(!selected && (gDataDst.count || that._widget.options.showEmptyGroups)) || (gDataDst.count && ((gData.optionGroup != DEF_OPTGROUP) || that._widget.options.showDefaultGroupHeader)) ? 'show' : 'hide']();

        var t = getGroupName() + ' (' + gDataDst.count + ')';
        labelCount.text(t).attr('title', t);
      };

      var e = $('<div></div>')
        .addClass('ui-widget-header ui-priority-secondary group-element')
        .append( $('<button></button>', { type:"button" }).addClass('uix-control-right')
          .attr('data-localekey', (selected?'de':'')+'selectAllGroup')
          .attr('title', this._widget._t((selected?'de':'')+'selectAllGroup'))
          .button({icons:{primary:transferIcon(this._widget.options.availableListPosition, 'ui-icon-arrowstop-1-', selected)}, text:false})
          .click(function(e) {
            e.preventDefault(); e.stopPropagation();

            var gDataDst = getLocalData()[selected?'selected':'available'];

            if (gData.count > 0) {
              var _transferedOptions = [];

              that._bufferedMode(true);
              for (var i=gData.startIndex, len=gData.startIndex+gData.count, eData; i<len; i++) {
                eData = that._elements[i];
                if (!eData.filtered && !eData.selected != selected) {
                  that.setSelected(eData, !selected, true);
                  _transferedOptions.push(eData.optionElement[0]);
                }
              }

              that._updateGroupElements(gData);
              that._widget._updateHeaders();

              that._bufferedMode(false);

              that._widget._triggerUIEvent(EVENT_CHANGE, { optionElements:_transferedOptions, selected:!selected} );
            }

            return false;
          })
        )
        .append(labelCount)
      ;

      var fnToggle,
        groupIcon = (grpElement) ? grpElement.attr('data-group-icon') : null;
      if (this._widget.options.collapsableGroups) {
        var collapseIconAttr = (grpElement) ? grpElement.attr('data-collapse-icon') : null,
          grpCollapseIcon = (collapseIconAttr) ? 'ui-icon ' + collapseIconAttr : 'ui-icon ui-icon-triangle-1-s';
        var h = $('<span></span>').addClass('ui-icon collapse-handle')
          .attr('data-localekey', 'collapseGroup')
          .attr('title', this._widget._t('collapseGroup'))
          .addClass(grpCollapseIcon)
          .mousedown(function(e) { e.stopPropagation(); })
          .click(function(e) { e.preventDefault(); e.stopPropagation(); fnToggle(grpElement); return false; })
          .prependTo(e.addClass('group-element-collapsable'))
        ;

        fnToggle = function(grpElement) {
          var gDataDst = getLocalData()[selected?'selected':'available'],
            collapseIconAttr = (grpElement) ? grpElement.attr('data-collapse-icon') : null,
            expandIconAttr = (grpElement) ? grpElement.attr('data-expand-icon') : null,
            collapseIcon = (collapseIconAttr) ? 'ui-icon ' + collapseIconAttr : 'ui-icon ui-icon-triangle-1-s',
            expandIcon = (expandIconAttr) ? 'ui-icon ' + expandIconAttr : 'ui-icon ui-icon-triangle-1-e';
          gDataDst.collapsed = !gDataDst.collapsed;
          gDataDst.listContainer.slideToggle();  // animate options?
          h.removeClass(gDataDst.collapsed ? collapseIcon : expandIcon)
            .addClass(gDataDst.collapsed ? expandIcon : collapseIcon);
        };
      }else{
        if (groupIcon) {
          $('<span></span>').addClass('collapse-handle '+groupIcon)
            .css('cursor','default')
            .prependTo(e.addClass('group-element-collapsable'));
        }
      }
      return $('<div></div>')
      // create an utility function to update group element count
        .data('fnUpdateCount', fnUpdateCount)
        .data('fnToggle', fnToggle || $.noop)
        .append(e)
        ;
    },

    _createGroupContainerElement: function(grpElement, optGroup, selected) {
      var that = this;
      var e = $('<div></div>');
      var _received_index;

      if (this._widget.options.sortable && selected) {
        e.sortable({
          tolerance: "pointer",
          appendTo: this._widget._elementWrapper,
          connectWith: this._widget._lists['available'].attr('id'),
          scope: this._widget.scope,
          helper: 'clone',
          receive: function(evt, ui) {
            var e = that._elements[_received_index = ui.item.data('element-index')];

            e.selected = true;
            e.optionElement.prop('selected', true);
            e.listElement.removeClass('ui-state-active');
          },
          stop: function(evt, ui) {
            var e;
            if (_received_index != undefined) {
              e = that._elements[_received_index];
              _received_index = undefined;
              ui.item.replaceWith(e.listElement.addClass('ui-state-highlight option-selected'));
              that._widget._updateHeaders();
              that._widget._triggerUIEvent(EVENT_CHANGE, { optionElements:[e.optionElement[0]], selected:true } );
            } else {
              e = that._elements[ui.item.data('element-index')];
              if (e && !e.selected) {
                that._bufferedMode(true);
                that._appendToList(e);
                that._bufferedMode(false);
              }
              else {
                that._widget._triggerUIEvent(EVENT_REORDERED, { } );
              }
            }
            if (e) that._reorderSelected(e.optionGroup);
          },
          revert: true
        });
      }

      if (this._selectionMode) {
        $(e).on(this._selectionMode, 'div.option-element', function() {
          var eData = that._elements[$(this).data('element-index')];
          eData.listElement.removeClass('ui-state-hover');
          that.setSelected(eData, !selected);
        });
      }

      return e;
    },

    _createElement: function(optElement, optGroup) {
      var o = this._widget.options.optionRenderer
        ? this._widget.options.optionRenderer(optElement, optGroup)
        : $('<div></div>').text(optElement.text());
      var optIcon = optElement.attr("data-option-icon");
      var e = $('<div></div>').append(o).addClass('ui-state-default option-element')
        .attr("unselectable", "on")  // disable text selection on this element (IE, Opera)
        .data('element-index', -1)
        .hover(
          function() {
            if (optElement.prop('selected')) $(this).removeClass('ui-state-highlight');
            $(this).addClass('ui-state-hover');
          },
          function() {
            $(this).removeClass('ui-state-hover');
            if (optElement.prop('selected')) $(this).addClass('ui-state-highlight');
          }
        );
      if (this._widget.options.selectionMode.indexOf('d&d') > -1) {
        var that = this;
        e.draggable({
          addClasses: false,
          cancel: (this._widget.options.sortable ? '.option-selected, ' : '') + '.ui-state-disabled',
          appendTo: this._widget._elementWrapper,
          scope: this._widget.scope,
          start: function(evt, ui) {
            $(this).addClass('ui-state-disabled ui-state-active');
            ui.helper.width($(this).width()).height($(this).height());
          },
          stop: function(evt, ui) {
            $(this).removeClass('ui-state-disabled ui-state-active');
          },
          helper: 'clone',
          revert: 'invalid',
          zIndex: 99999,
          disabled: optElement.prop('disabled')
        });
        if (optElement.prop('disabled')) {
          e.addClass('ui-state-disabled');
        }
        if (this._widget.options.sortable) {
          e.draggable('option', 'connectToSortable', this._groups.get(optGroup)['selected'].listContainer);
        }
      } else if (optElement.prop('disabled')) {
        e[(optElement.prop('disabled') ? "add" : "remove") + "Class"]('ui-state-disabled');
      }
      if (optIcon) {
        e.addClass('grouped-option').prepend($('<span></span>').addClass('ui-icon ' + optIcon));
      }
      return e;
    },

    _isOptionCollapsed: function(eData) {
      return this._groups.get(eData.optionGroup)[eData.selected?'selected':'available'].collapsed;
    },

    _updateGroupElements: function(gData) {
      if (gData) {
        gData['selected'].count = 0;
        gData['available'].count = 0;
        for (var i=gData.startIndex, len=gData.startIndex+gData.count; i<len; i++) {
          gData[this._elements[i].selected?'selected':'available'].count++;
        }
        gData['selected'].listElement.data('fnUpdateCount')();
        gData['available'].listElement.data('fnUpdateCount')();
      } else {
        this._groups.each(function(k,gData,that) {
          that._updateGroupElements(gData);
        }, this);
      }
    },

    _appendToList: function(eData) {
      var that = this;
      var gData = this._groups.get(eData.optionGroup);

      var gDataDst = gData[eData.selected?'selected':'available'];

      if ((eData.optionGroup != this._widget.options.defaultGroupName) || this._widget.options.showDefaultGroupHeader) {
        gDataDst.listElement.show();
      }
      if (gDataDst.collapsed) {
        gDataDst.listElement.data('fnToggle')(); // animate show?
      } else {
        gDataDst.listContainer.show();
      }

      var insertIndex = eData.index - 1;
      while ((insertIndex >= gData.startIndex) &&
      (this._elements[insertIndex].selected != eData.selected)) {
        insertIndex--;
      }

      if (insertIndex < gData.startIndex) {
        gDataDst.listContainer.prepend(eData.listElement);
      } else {
        var prev = this._elements[insertIndex].listElement;
        // FIX : if previous element is animated, get it's animated parent as reference
        if (prev.parent().hasClass('ui-effects-wrapper')) {
          prev = prev.parent();
        }
        eData.listElement.insertAfter(prev);
      }
      eData.listElement[(eData.selected?'add':'remove')+'Class']('ui-state-highlight option-selected');

      if ((eData.selected || !eData.filtered) && !this._isOptionCollapsed(eData) && this._moveEffect && this._moveEffect.fn) {
        eData.listElement.hide().show(this._moveEffect.fn, this._moveEffect.options, this._moveEffect.speed);
      } else if (eData.filtered) {
        eData.listElement.hide();
      }
    },

    _reorderSelected: function(optGroup) {
      var e = this._elements;
      var g = this._groups.get(optGroup);
      var container = g.groupElement ? g.groupElement : this._widget.element;
      var prevElement;
      $('.option-element', g['selected'].listContainer).each(function() {
        var currElement = e[$(this).data('element-index')].optionElement;
        if (!prevElement) {
          container.prepend(currElement);
        } else {
          currElement.insertAfter(prevElement);
        }
        prevElement = currElement;
      });
      this._widget._triggerUIEvent(EVENT_REORDERED, { selectElement:container.context } );
    },

    _bufferedMode: function(enabled) {
      if (enabled) {
        this._oldMoveEffect = this._moveEffect; this._moveEffect = null;

        // backup lists' scroll position before going into buffered mode
        this._widget._lists['selected'].data('scrollTop', this._widget._lists['selected'].scrollTop());
        this._widget._lists['available'].data('scrollTop', this._widget._lists['available'].scrollTop());

        this._listContainers['selected'].detach();
        this._listContainers['available'].detach();
      } else {
        // restore scroll position (if available)
        this._widget._lists['selected'].append(this._listContainers['selected'])
          .scrollTop( this._widget._lists['selected'].data('scrollTop') || 0 );
        this._widget._lists['available'].append(this._listContainers['available'])
          .scrollTop( this._widget._lists['available'].data('scrollTop') || 0 );

        this._moveEffect = this._oldMoveEffect;

        delete this._oldMoveEffect;
      }

    },

    reset: function(destroy) {
      this._groups.clear();
      this._listContainers['selected'].empty();
      this._listContainers['available'].empty();

      if (destroy) {
        for (var i=0, e=this._elements, len=e.length; i<len; i++) {
          e[i].optionElement.removeData('element-index');
        }
        delete this._elements;
        delete this._groups;
        delete this._listContainers;
      } else {
        this._elements = [];
        this.prepareGroup();  // reset default group
        this._groups.setComparator(this.getComparator());
      }
    },

    // should call _reIndex after this
    cleanup: function() {
      var p = this._widget.element[0];
      var _groupsRemoved = [];
      this._groups.each(function(g,v) {
        if (v.groupElement && !$.contains(p, v.groupElement[0])) {
          _groupsRemoved.push(g);
        }
      });
      for (var i=0, eData; i<this._elements.length; i++) {
        eData = this._elements[i];
        if (!$.contains(p, eData.optionElement[0]) || ($.inArray(eData.optionGroup, _groupsRemoved) > -1)) {
          this._elements.splice(i--, 1)[0].listElement.remove();
        }
      }
      for (var i=0, len=_groupsRemoved.length; i<len; i++) {
        this._groups.remove(_groupsRemoved[i]);
      }

      this.prepareGroup();  // make sure we have the default group still!
    },

    getComparator: function() {
      return this._widget.options.sortMethod
        ? typeof this._widget.options.sortMethod == 'function'
          ? this._widget.options.sortMethod
          : ItemComparators[this._widget.options.sortMethod]
        : null;
    },

    // prepare option group to be rendered (should call reIndex after this!)
    prepareGroup: function(grpElement, optGroup) {
      optGroup = optGroup || DEF_OPTGROUP;
      if (!this._groups.containsKey(optGroup)) {
        this._groups.put(optGroup, {
          startIndex: -1,
          count: 0,
          'selected': {
            collapsed: false,
            count: 0,
            listElement: this._createGroupElement(grpElement, optGroup, true),
            listContainer: this._createGroupContainerElement(grpElement, optGroup, true)
          },
          'available': {
            collapsed: false,
            count: 0,
            listElement: this._createGroupElement(grpElement, optGroup, false),
            listContainer: this._createGroupContainerElement(grpElement, optGroup, false)
          },
          groupElement: grpElement,
          optionGroup: optGroup     // for back ref
        });
      }
    },

    // prepare option element to be rendered (must call reIndex after this!)
    // If optGroup is defined, prepareGroup(optGroup) should have been called already
    prepareOption: function(optElement, optGroup) {
      var e;
      if (optElement.data('element-index') === undefined) {
        optGroup = optGroup || DEF_OPTGROUP;
        this._elements.push(e = {
          index: -1,
          selected: false,
          filtered: false,
          listElement: this._createElement(optElement, optGroup),
          optionElement: optElement,
          optionGroup: optGroup
        });
      } else {
        this._elements[optElement.data('element-index')]
          .listElement[(optElement.prop('disabled') ? "add" : "remove") + "Class"]('ui-state-disabled')
        ;
      }

    },

    reIndex: function() {
      // note : even if not sorted, options are added as they appear,
      //        so they should be grouped just fine anyway!
      var comparator = this.getComparator();
      if (comparator) {
        var _groups = this._groups;
        this._elements.sort(function(a, b) {
          // sort groups
          var ga = _groups.get(a.optionGroup).groupElement;
          var gb = _groups.get(b.optionGroup).groupElement;
          var g = comparator(ga ? ga.attr('label') : DEF_OPTGROUP, gb ? gb.attr('label') : DEF_OPTGROUP);
          if (g != 0) return g;
          else        return comparator(a.optionElement.text(), b.optionElement.text());
        });
      }

      this._bufferedMode(true);

      this._groups.each(function(g, v, l, showDefGroupName) {
        if (!v['available'].listContainer.parents('.multiselect-element-wrapper').length) {  // if no parent, then it was never attached yet.
          if (v.groupElement) {
            v.groupElement.data('option-group', g);  // for back ref
          }

          var wrapper_selected = $('<div></div>').addClass('multiselect-element-wrapper').data('option-group', g);
          var wrapper_available = $('<div></div>').addClass('multiselect-element-wrapper').data('option-group', g);
          wrapper_selected.append(v.selected.listElement.hide());
          if (g != DEF_OPTGROUP || (g == DEF_OPTGROUP && showDefGroupName)) {
            wrapper_available.append(v['available'].listElement.show());
          }
          wrapper_selected.append(v['selected'].listContainer);
          wrapper_available.append(v['available'].listContainer);

          l['selected'].append(wrapper_selected);
          l['available'].append(wrapper_available);
        }
        v.count = 0;
      }, this._listContainers, this._widget.options.showDefaultGroupHeader);

      for (var i=0, eData, gData, len=this._elements.length; i<len; i++) {
        eData = this._elements[i];
        gData = this._groups.get(eData.optionGroup);

        // update group index and count info
        if (gData.startIndex == -1 || gData.startIndex >= i) {
          gData.startIndex = i;
          gData.count = 1;
        } else {
          gData.count++;
        }

        // save element index for back ref
        eData.listElement.data('element-index', eData.index = i);

        if (eData.optionElement.data('element-index') == undefined || eData.selected != eData.optionElement.prop('selected')) {
          eData.selected = eData.optionElement.prop('selected');
          eData.optionElement.data('element-index', i);  // also save for back ref here

          this._appendToList(eData);
        }
      }

      this._updateGroupElements();
      this._widget._updateHeaders();
      this._groups.each(function(g,v,t) { t._reorderSelected(g); }, this);

      this._bufferedMode(false);

    },

    filter: function(term, silent) {

      if (term && !silent) {
        var ui = { term:term };
        if (this._widget._triggerUIEvent(EVENT_SEARCH, ui )) {
          term = ui.term;  // update term
        } else {
          return;
        }
      }

      this._bufferedMode(true);

      var filterSelected = this._widget.options.filterSelected;
      var filterFn = this._widget.options.searchFilter || function(term, opt) {
          return opt.innerHTML.toLocaleLowerCase().indexOf(term) > -1;
        };
      term = (this._widget.options.searchPreFilter || function(term) {
        return term ? (term+"").toLocaleLowerCase() : false;
      })(term);

      for (var i=0, eData, len=this._elements.length, filtered; i<len; i++) {
        eData = this._elements[i];
        filtered = !(!term || filterFn(term, eData.optionElement[0]));

        if ((!eData.selected || filterSelected) && (eData.filtered != filtered)) {
          eData.listElement[filtered ? 'hide' : 'show']();
          eData.filtered = filtered;
        } else if (eData.selected) {
          eData.filtered = filtered;
        }
      }

      this._widget._updateHeaders();
      this._bufferedMode(false);
    },

    getSelectionInfo: function() {
      var info = {'selected': {'total': 0, 'count': 0, 'filtered': 0}, 'available': {'total': 0, 'count': 0, 'filtered': 0} };

      for (var i=0, len=this._elements.length; i<len; i++) {
        var eData = this._elements[i];
        info[eData.selected?'selected':'available'][eData.filtered?'filtered':'count']++;
        info[eData.selected?'selected':'available'].total++;
      }

      return info;
    },

    setSelected: function(eData, selected, silent) {
      if (eData.optionElement.attr('disabled') && selected) {
        return;
      }

      eData.optionElement.prop('selected', eData.selected = selected);

      this._appendToList(eData);

      if (!silent) {
        if (this._widget.options.sortable && selected) {
          this._reorderSelected(eData.optionGroup);
        }
        this._updateGroupElements(this._groups.get(eData.optionGroup));
        this._widget._updateHeaders();
        this._widget._triggerUIEvent(EVENT_CHANGE, { optionElements:[eData.optionElement[0]], selected:selected } );
      }
    },

    // utility function to select all options
    setSelectedAll: function(selected) {
      var _transferedOptions = [];
      var _modifiedGroups = {};

      this._bufferedMode(true);

      for (var i=0, eData, len=this._elements.length; i<len; i++) {
        eData = this._elements[i];
        if (!((eData.selected == selected) || (eData.optionElement.attr('disabled') || (selected && (eData.filtered || eData.selected))))) {
          this.setSelected(eData, selected, true);
          _transferedOptions.push(eData.optionElement[0]);
          _modifiedGroups[eData.optionGroup] = true;
        }
      }

      if (this._widget.options.sortable && selected) {
        var that = this;
        $.each(_modifiedGroups, function(g) {  that._reorderSelected(g); });
      }

      this._updateGroupElements();
      this._widget._updateHeaders();
      this._bufferedMode(false);

      this._widget._triggerUIEvent(EVENT_CHANGE, { optionElements:_transferedOptions, selected:selected } );
    }

  };

  /**
   * Expects paramter p to be
   *
   *   locale        (string) the locale to use (default = '')
   *   key           (string) the locale string key
   *   plural        (int)    the plural value to use
   *   data          (object) the data object to use as variables
   *
   */
  function _(p) {
    var locale = $.uix.multiselect.i18n[p.locale] ? p.locale : '';
    var i18n = $.uix.multiselect.i18n[locale];
    var plural = p.plural || 0;
    var data = p.data || {};
    var t;

    if (plural === 2 && i18n[p.key+'_plural_two']) {
      t = i18n[p.key+'_plural_two'];
    } else if ((plural === 2 || plural === 3) && i18n[p.key+'_plural_few']) {
      t = i18n[p.key+'_plural_few']
    } else if (plural > 1 && i18n[p.key+'_plural']) {
      t = i18n[p.key+'_plural'];
    } else if (plural === 0 && i18n[p.key+'_nil']) {
      t = i18n[p.key+'_nil'];
    } else {
      t = i18n[p.key] || '';
    }

    return t.replace(/\{([^\}]+)\}/g, function(m, n) { return data[n]; });
  };

  /**
   * Default translation
   */
  $.uix.multiselect.i18n = {
    '': {
      itemsSelected_nil: 'No items',          // 0
      itemsSelected: '{count} items',          // 0, 1
      itemsSelected_plural: '{count} items',  // n
      //itemsSelected_plural_two: ...                    // 2
      //itemsSelected_plural_few: ...                    // 3, 4
      itemsAvailable_nil: 'No items',
      itemsAvailable: '{count} item',
      itemsAvailable_plural: '{count} items',
      //itemsAvailable_plural_two: ...
      //itemsAvailable_plural_few: ...
      itemsFiltered_nil: 'None found',
      itemsFiltered: '{count} item',
      itemsFiltered_plural: '{count} items',
      //itemsFiltered_plural_two: ...
      //itemsFiltered_plural_few: ...
      selectAll: 'Select All',
      deselectAll: 'Deselect All',
      search: 'Search Options',
      collapseGroup: 'Collapse Group',
      expandGroup: 'Expand Group',
      selectAllGroup: 'Select All Group',
      deselectAllGroup: 'Deselect All Group'
    }
  };

})(jQuery, window);
},{}],5:[function(require,module,exports){
var dexjquery = {};

dexjquery.version = "0.9.0.1";

// Allow jqueryui to play well with bootstrap.  This
// also means we must include dex.js before bootstrap.
// REM: Would like to break the JQuery UI dependencies.
$.widget.bridge("uitooltip", $.ui.tooltip);
$.widget.bridge("uibutton", $.ui.button);

require("../lib/jquery-layout/jquery-layout");
require("../lib/uix-multiselect/uix.multiselect");
$.widget.bridge("listSelectView", $.uix.multiselect);
require("../lib/spectrum/spectrum");
require("../lib/jquery-touchpunch/jquery-touchpunch");

module.exports = dexjquery;
},{"../lib/jquery-layout/jquery-layout":1,"../lib/jquery-touchpunch/jquery-touchpunch":2,"../lib/spectrum/spectrum":3,"../lib/uix-multiselect/uix.multiselect":4}]},{},[5])(5)
});