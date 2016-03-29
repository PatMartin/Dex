/* http://keith-wood.name/themes.html
   Applying CSS themes for jQuery v1.3.0.
   Written by Keith Wood (kbwood{at}iinet.com.au) September 2008.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it. */

/* Apply various themes to your site.
   Attach the functionality with options like:
   $('link').themes({themes: ['cupertino', 'smoothness']});
*/

(function($) { // Hide scope, no $ conflict

/* Theme sharing manager. */
function Themes() {
	this.currentTheme = '';
	this._linkID = 'th' + new Date().getTime();
	this._defaults = {
		themes: [],  // List of theme IDs to use, empty for all
		themeBase: '',  // The base URL for all the theme files
		themeFile: 'jquery-ui.css', // Name of the theme file
		defaultTheme: '', // The ID of the default theme, first one if blank
		icons: 'img/themes.gif', // Horizontal amalgamation of all theme icons
		iconSize: [23, 20],  // The width and height of the individual icons
		previews: 'img/themes-preview.gif', // Horizontal amalgamation of all theme previews
		previewSize: [90, 80],  // The width and height of the individual previews
		showPreview: true,  // True to display a popup preview, false to not show it
		compact: true , // True if a compact presentation should be used, false for full
		cookieExpiry: 0,  // The expiry time for the theme cookie, date or number of days
		cookiePath: '/',  // The path that the cookie applies to
		cookieDomain: '',  // The domain that the cookie applies to
		onSelect: null  // Callback on theme selection, theme ID and URL are passed as parameters
	};
	this._themes = {  // The definitions of the available themes
		'blacktie': {display: 'Black Tie', icon: 0, preview: 0, url: 'black-tie/'},
		'blitzer': {display: 'Blitzer', icon: 1, preview: 1, url: 'blitzer/'},
		'cupertino': {display: 'Cupertino', icon: 2, preview: 2, url: 'cupertino/'},
		'darkhive': {display: 'Dark Hive', icon: 17, preview: 17, url: 'dark-hive/'},
		'dotluv': {display: 'Dot Luv', icon: 3, preview: 3, url: 'dot-luv/'},
		'eggplant': {display: 'Eggplant', icon: 18, preview: 18, url: 'eggplant/'},
		'excitebike': {display: 'Excite Bike', icon: 4, preview: 4, url: 'excite-bike/'},
		'flick': {display: 'Flick', icon: 19, preview: 19, url: 'flick/'},
		'hotsneaks': {display: 'Hot Sneaks', icon: 5, preview: 5, url: 'hot-sneaks/'},
		'humanity': {display: 'Humanity', icon: 6, preview: 6, url: 'humanity/'},
		'lefrog': {display: 'Le Frog', icon: 20, preview: 20, url: 'le-frog/'},
		'mintchoc': {display: 'Mint Choc', icon: 7, preview: 7, url: 'mint-choc/'},
		'overcast': {display: 'Overcast', icon: 21, preview: 21, url: 'overcast/'},
		'peppergrinder': {display: 'Pepper Grinder', icon: 22, preview: 22, url: 'pepper-grinder/'},
		'redmond': {display: 'Redmond', icon: 8, preview: 8, url: 'redmond/'},
		'smoothness': {display: 'Smoothness', icon: 9, preview: 9, url: 'smoothness/'},
		'southstreet': {display: 'South Street', icon: 10, preview: 10, url: 'south-street/'},
		'start': {display: 'Start', icon: 11, preview: 11, url: 'start/'},
		'sunny': {display: 'Sunny', icon: 23, preview: 23, url: 'sunny/'},
		'swankypurse': {display: 'Swanky Purse', icon: 12, preview: 12, url: 'swanky-purse/'},
		'trontastic': {display: 'Trontastic', icon: 13, preview: 13, url: 'trontastic/'},
		'uidarkness': {display: 'UI Darkess', icon: 14, preview: 14, url: 'ui-darkness/'},
		'uilightness': {display: 'UI Lightness', icon: 15, preview: 15, url: 'ui-lightness/'},
		'vader': {display: 'Vader', icon: 16, preview: 16, url: 'vader/'}
	};
}

$.extend(Themes.prototype, {
	/* Class name added to elements to indicate already configured with themeing. */
	markerClassName: 'hasThemes',
	/* Name of the data property for instance settings. */
	propertyName: 'themes',
	/* Name for cookie remembering chosen theme. */
	cookieName: 'themeID',

	_currentClass: 'themes_current', // The current theme marker class
	_compactClass: 'themes_compact', // The compact theme marker class
	_listClass: 'themes_list', // The theme list marker class
	_previewClass: 'themes_preview', // The theme preview marker class

	/* Override the default settings for all theme instances.
	   @param  options  (object) the new settings to use as defaults
	   @return  (Theme object) this object */
	setDefaults: function(options) {
		$.extend(this._defaults, options || {});
		return this;
	},

	/* Initialise the theme for the page. */
	_init: function() {
		var search = new RegExp(this.cookieName + '=([^;]*)');
		var matches = search.exec(document.cookie);
		var themeId = (matches ? matches[1] : '') || this._defaults.defaultTheme;
		var firstId = '';
		var found = false;
		for (var id in this._themes) {
			firstId = firstId || id;
			found = (themeId == id);
			if (found) {
				break;
			}
		}
		themeId = (found ? themeId : firstId);
		this._setTheme(themeId, this._themes[themeId].display,
			this._defaults.themeBase + this._themes[themeId].url + this._defaults.themeFile, true);
	},

	/* Add a new theme to the list.
	   @param  id       (string) the ID of the new theme
	   @param  display  (string) the display name for this theme
	   @param  icon     (url) the location of an icon for this theme (25x22), or
	                    (number) the index of the icon within the combined image
	   @param  preview  (url) the location of a preview for this theme (105x92), or
	                    (number) the index of the preview within the combined image
	   @param  url      (url) the URL for the theme definition (CSS)
	   @return  (Theme object) this object */
	addTheme: function(id, display, icon, preview, url) {
		this._themes[id] = {display: display, icon: icon, preview: preview, url: url};
		return this;
	},

	/* Return the list of defined themes.
	   @return  (object[]) indexed by theme id (string), each object contains
	            display (string) the display name,
	            icon    (string) the location of the icon,, or
	                    (number) the icon's index in the combined image
	            url     (string) the URL for the theme's CSS definition */
	getThemes: function() {
		return this._themes;
	},

	/* Attach the themeing widget to a div.
	   @param  target   (element) the control to affect
	   @param  options  (object) the custom options for this instance */
	_attachPlugin: function(target, options) {
		target = $(target);
		if (target.hasClass(this.markerClassName)) {
			return;
		}
		var inst = {options: $.extend({}, this._defaults)};
		target.addClass(this.markerClassName).data(this.propertyName, inst);
		this._optionPlugin(target, options);
	},

	/* Retrieve or reconfigure the settings for a control.
	   @param  target   (element) the control to affect
	   @param  options  (object) the new options for this instance or
	                    (string) an individual property name
	   @param  value    (any) the individual property value (omit if options
	                    is an object or to retrieve the value of a setting)
	   @return  (any) if retrieving a value */
	_optionPlugin: function(target, options, value) {
		target = $(target);
		var inst = target.data(this.propertyName);
		if (!options || (typeof options == 'string' && value == null)) { // Get option
			var name = options;
			options = (inst || {}).options;
			return (options && name ? options[name] : options);
		}

		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		options = options || {};
		if (typeof options == 'string') {
			var name = options;
			options = {};
			options[name] = value;
		}
		$.extend(inst.options, options);
		this._updateTheme(target, inst);
	},

	/* Construct the requested themeing links.
	   @param  target  (element) the element to attach to
	   @param  inst    (object) the current instance settings */
	_updateTheme: function(target, inst) {
		if (inst.options.themes.length == 0) {
			$.each(this._themes, function(id) {
				inst.options.themes[inst.options.themes.length] = id;
			});
		}
		var escape = function(value) {
			return value.replace(/'/, '\\\'');
		};
		var html = '<ul class="' + this._listClass +
			(inst.options.compact ? ' ' + this._compactClass : '') + '">';
		var allThemes = this._themes;
		$.each(inst.options.themes, function(index, id) {
			var theme = allThemes[id];
			if (!theme) {
				return;
			}
			html += '<li class="' + plugin.propertyName + '__' + id +
				(plugin.currentTheme == id ? ' ' + plugin._currentClass : '') +
				'"><a data-theme="' + id + '">';
			if (theme.icon != null) {
				html += '<span title="' + theme.display + '"';
				if (typeof theme.icon == 'number') {
					html += ' style="background: transparent url(' + inst.options.icons +
						') no-repeat -' + (theme.icon * inst.options.iconSize[0]) + 'px 0px;">';
				}
				else {
					html += '><img src="' + theme.icon + '" alt="' + theme.display + '"/>';
				}
				html +=	'</span>' + (inst.options.compact ? '' : '&#xa0;');
			}
			html +=	(inst.options.compact ? '' : theme.display) + '</a></li>';
		});
		html += '</ul><div class="' + this._previewClass + '"><div ' +
			'style="width: ' + inst.options.previewSize[0] +
			'px; height: ' + inst.options.previewSize[1] +
			'px; background: url(' + inst.options.previews + ') no-repeat;"></div></div>';
		target.html(html).on('mouseenter', 'a', function() {
				if (inst.options.showPreview) {
					plugin._showPreview(this);
				}
			}).on('mouseleave', 'a', function() {
				plugin._hidePreview(this);
			}).on('click', 'a', function() {
				var id = $(this).data('theme');
				var theme = plugin._themes[id];
				plugin._setTheme(id, theme.display,
					inst.options.themeBase + theme.url + inst.options.themeFile);
			});
	},

	/* Remove the plugin functionality from a control.
	   @param  target  (element) the control to affect */
	_destroyPlugin: function(target) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		target.removeClass(this.markerClassName).empty();
	},

	/* Load a new theme.
	   @param  id       (string) the ID of the new theme
	   @param  display  (string) the display name of the new theme
	   @param  url      (string) the location of the CSS
	   @param  loading  (boolean) true if initially loading */
	_setTheme: function(id, display, url, loading) {
		if ($('#' + plugin._linkID).length == 0) {
			$('head').append('<link rel="stylesheet" type="text/css" id="' + plugin._linkID + '"/>');
		}
		$('#' + plugin._linkID).attr('href', url);
		plugin.currentTheme = id;
		$('.' + plugin.markerClassName + ' li').removeClass(plugin._currentClass);
		$('.' + plugin.propertyName + '__'  + id).addClass(plugin._currentClass);
		// Custom callback
		var inst = $('.' + plugin.propertyName + '__' + id).closest('.' + plugin.markerClassName).
			data(plugin.propertyName);
		if (inst && $.isFunction(inst.options.onSelect)) {
			inst.options.onSelect.apply(window, [id, display, url]);
		}
		if (!loading) {
			// Calculate cookie expiry
			var addDays = function(days) {
				var date = new Date();
				date.setDate(date.getDate() + days);
				return date;
			};
			var expiryDate = (inst.options.cookieExpiry ?
				(typeof inst.options.cookieExpiry == 'number' ?
				addDays(inst.options.cookieExpiry) : inst.options.cookieExpiry) : null);
			// Save theme setting as cookie
			document.cookie = plugin.cookieName + '=' + id +
				(expiryDate ? '; expires=' + expiryDate.toUTCString() : '') +
				(inst.options.cookiePath ? '; path=' + inst.options.cookiePath : '') +
				(inst.options.cookieDomain ? '; domain=' + inst.options.cookieDomain : '');
		}
		return false;
	},

	/* Show the preview for the current theme.
	   @param  link  (element) the element containing the theme link */
	_showPreview: function(link) {
		var id = $(link).data('theme');
		var theme = plugin._themes[id];
		if (theme.preview == null) {
			return;
		}
		var container = $(link).closest('.' + plugin.markerClassName);
		var inst = container.data(plugin.propertyName);
		var preview = container.find('div.' + plugin._previewClass);
		var html = '';
		if (typeof theme.preview == 'number') {
			preview.find('div').show().css('background-position',
				'-' + (theme.preview * inst.options.previewSize[0]) + 'px 0px');
		}
		else {
			preview.find('div').hide();
			html += '<img src="' + theme.preview + '" alt="' + theme.display + '"/><br/>';
		}
		html += '<span>' + theme.display + '</span>';
		var parent = $(link).parent();
		var relParent = null;
		$(link).parents().each(function() {
			var pos = $(this).css('position');
			if (pos == 'absolute' || pos == 'relative') {
				relParent = $(this);
			}
			return !relParent;
		});
		var offset = parent.offset();
		var relOffset = (relParent ? relParent.offset() : {left: 0, top: 0});
		var left = offset.left - relOffset.left + parseInt(parent.css('padding-left'), 10);
		var top = offset.top - relOffset.top + parent.height() +
			parseInt(parent.css('padding-top'), 10) + 1;
		preview.children(':not(:first)').remove().end().
			append(html).css({left: left, top: top}).show();
	},

	/* Hide the theme preview.
	   @param  link  (element) the element containing the theme link */
	_hidePreview: function(link) {
		$(link).closest('.' + plugin.markerClassName).find('div.' + plugin._previewClass).hide();
	}
});

// The list of commands that return values and don't permit chaining
var getters = [''];

/* Determine whether a command is a getter and doesn't permit chaining.
   @param  command    (string, optional) the command to run
   @param  otherArgs  ([], optional) any other arguments for the command
   @return  true if the command is a getter, false if not */
function isNotChained(command, otherArgs) {
	if (command == 'option' && (otherArgs.length == 0 ||
			(otherArgs.length == 1 && typeof otherArgs[0] == 'string'))) {
		return true;
	}
	return $.inArray(command, getters) > -1;
}

/* Attach the themeing functionality to a jQuery selection.
   @param  options  (object) the new settings to use for these instances (optional) or
                    (string) the command to run (optional)
   @return  (jQuery) for chaining further calls or
            (any) getter value */
$.fn.themes = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (isNotChained(options, otherArgs)) {
		return plugin['_' + options + 'Plugin'].apply(plugin, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
		if (typeof options == 'string') {
			if (!plugin['_' + options + 'Plugin']) {
				throw 'Unknown command: ' + options;
			}
			plugin['_' + options + 'Plugin'].apply(plugin, [this].concat(otherArgs));
		}
		else {
			plugin._attachPlugin(this, options || {});
		}
	});
};

/* Initialise the themeing functionality. */
var plugin = $.themes = new Themes(); // Singleton instance

$(function() {
	plugin._init(); // Load saved theme
});

})(jQuery);
