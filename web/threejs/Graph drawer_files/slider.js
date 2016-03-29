/**
 * JavaScript Slider v0.9
 * http://blog.ovidiu.ch/javascript-slider
 *
 * Copyright (c) 2010, Ovidiu Cherecheș
 * MIT License
 * http://legal.ovidiu.ch/licenses/MIT
 */

/* Mouse */

var Mouse =
{
	x: 0,
	y: 0,
	refresh: function(e)
	{
		var posx = 0, posy = 0;
		if(e.type == "touchstart" || e.type == "touchmove" || e.type == "touchend")
		{
					posx = e.touches.item(0).clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					posy = e.touches.item(0).clientY + document.body.scrollTop + document.documentElement.scrollTop;
					//alert(posx+", "+posy);
		}
		else
		{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		//alert(e.clientX+", "+e.clientY);
		this.x = posx;
		this.y = posy;
	}
};

var mouseMoveHandler = document.onmousemove || function(){};
document.onmousemove = document.ontouchmove = function(e)
{
	mouseMoveHandler(e);
	Mouse.refresh(e);
}

/* Position */

var Position =
{
	get: function(obj)
	{
		var curleft = curtop = 0;
		if(obj.offsetParent)
		{
			do
			{
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			}
			while((obj = obj.offsetParent));
		}
		return [curleft, curtop];
	}
};

/* Slider */

var Slider = function(wrapper, options)
{
	if(typeof(wrapper) == 'string')
	{
		wrapper = document.getElementById(wrapper);
	}
	if(!wrapper)
	{
		return;
	}
	var handle = wrapper.getElementsByTagName('div')[0];
	if(!handle || handle.className.search(/(^|\s)handle(\s|$)/) == -1)
	{
		return;
	}
	this.init(wrapper, handle, options || {});
	this.setup();
};
Slider.prototype =
{
	init: function(wrapper, handle, options)
	{
		this.wrapper = wrapper;
		this.handle = handle;
		this.options = options;
		
		this.value = {
			current: options.value || 0,
			target: options.value || 0,
			prev: -1
		};
		this.disabled = options.disabled || false;
		this.steps = options.steps || 0;
		this.snapping = options.snapping || false;
		this.speed = options.speed || 5;
		
		this.callback = options.callback || null;
		this.animation_callback = options.animation_callback || null;
		
		this.bounds = {
			pleft: options.pleft || 0, left: 0,
			pright: -(options.pright || 0), right: 0,
			width: 0,
			diff: 0
		};
		this.offset = { wrapper: 0, mouse: 0, target: 0, current: 0, prev: -9999 };
		
		this.dragging = false;
		this.tapping = false;
	},
	setup: function()
	{
		var self = this;
		
		this.wrapper.onselectstart = function()
		{
			return false;
		}
		this.handle.onmousedown = this.handle.ontouchstart = function(e)
		{
			self.preventDefaults(e, true);
			this.focus();
			self.handleMouseDownHandler(e);
		};
		
		this.wrapper.onmousedown = function(e)
		{
			self.preventDefaults(e);
			self.wrapperMouseDownHandler(e);
		};
		
		this.wrapper.ontouchmove = function(e)
		{
			e.preventDefault() ;
		}
		
		var mouseUpHandler = document.onmouseup || function(){};
		document.onmouseup = document.ontouchend = function(e)
		{
			mouseUpHandler(e);
			self.preventDefaults(e);
			self.documentMouseUpHandler(e);
		};
		var resizeHandler = document.onresize || function(){};
		window.onresize = function(e)
		{
			resizeHandler(e);
			self.setWrapperOffset();
			self.setBounds();
		};
		
		this.setWrapperOffset();
		
		if(!this.bounds.pleft && !this.bounds.pright)
		{
			this.bounds.pleft = Position.get(this.handle)[0] - this.offset.wrapper;
			this.bounds.pright = -this.bounds.pleft;
		}
		this.setBounds();
		this.setSteps();
		
		this.interval = setInterval(function(){ self.animate() }, 20);
		self.animate(false, true);
	},
	setWrapperOffset: function()
	{
		this.offset.wrapper = Position.get(this.wrapper)[0];
	},
	setBounds: function()
	{
		this.bounds.left = this.bounds.pleft;
		this.bounds.right = this.bounds.pright + this.wrapper.offsetWidth;
		this.bounds.width = this.bounds.right - this.bounds.left;
		this.bounds.diff = this.bounds.width - this.handle.offsetWidth;
	},
	setSteps: function()
	{
		if(this.steps > 1)
		{
			this.stepsRatio = [];
			for(var i = 0; i <= this.steps - 1; i++)
			{
				this.stepsRatio[i] = i / (this.steps - 1);
			}
		}
	},
	disable: function()
	{
		this.disabled = true;
		this.handle.className += ' disabled';
	},
	enable: function()
	{
		this.disabled = false;
		this.handle.className = this.handle.className.replace(/\s?disabled/g, '');
	},
	handleMouseDownHandler: function(e)
	{
		this.startDrag();
		this.cancelEvent(e);
	},
	wrapperMouseDownHandler: function(e)
	{
		this.startTap();
	},
	documentMouseUpHandler: function(e)
	{
		this.stopDrag();
		this.stopTap();
	},
	startTap: function(target)
	{
		if(this.disabled)
		{
			return;
		}
		if(target === undefined)
		{
			target = Mouse.x - this.offset.wrapper - (this.handle.offsetWidth / 2);
		}
		this.setOffsetTarget(target);
		
		this.tapping = true;
	},
	stopTap: function()
	{
		if(this.disabled || !this.tapping)
		{
			return;
		}
		this.setOffsetTarget(this.offset.current);
		
		this.tapping = false;
		
		this.result();
	},
	startDrag: function()
	{
		if(this.disabled)
		{
			return;
		}
		this.offset.mouse = Mouse.x - Position.get(this.handle)[0];
		
		this.dragging = true;
	},
	stopDrag: function()
	{
		if(this.disabled || !this.dragging)
		{
			return;
		}
		this.dragging = false;
		
		this.result();
	},
	feedback: function()
	{
		var value = this.value.current;
		if(this.steps > 1 && this.snapping)
		{
			value = this.getClosestStep(value);
		}
		if(value != this.value.prev)
		{
			if(typeof(this.animation_callback) == 'function')
			{
				this.animation_callback(value);
			}
			this.value.prev = value;
		}
	},
	result: function()
	{
		var value = this.value.target;
		if(this.steps > 1)
		{
			value = this.getClosestStep(value);
		}
		if(typeof(this.callback) == 'function')
		{
			this.callback(value);
		}
	},
	animate: function(onMove, first)
	{
		if(onMove && !this.dragging)
		{
			return;
		}
		if(this.dragging)
		{
			this.setOffsetTarget(Mouse.x - this.offset.mouse - this.offset.wrapper);
		}
		
		this.value.target = Math.max(this.value.target, 0);
		this.value.target = Math.min(this.value.target, 1);
		this.offset.target = this.getOffsetByRatio(this.value.target);
		
		if((!this.dragging && !this.tapping) || this.snapping)
		{
			if(this.steps > 1)
			{
				this.setValueTarget(this.getClosestStep(this.value.target));
			}
		}
		if(this.dragging || first)
		{
			this.value.current = this.value.target;
		}
		this.slide();
		this.show();
		
		this.feedback();
	},
	slide: function()
	{
		if(this.value.target > this.value.current)
		{
			this.value.current += Math.min(this.value.target - this.value.current, this.speed / 100);
		}
		else if(this.value.target < this.value.current)
		{
			this.value.current -= Math.min(this.value.current - this.value.target, this.speed / 100);
		}
		if(!this.snapping)
		{
			this.offset.current = this.getOffsetByRatio(this.value.current);
		}
		else
		{
			this.offset.current = this.getOffsetByRatio(
				this.getClosestStep(this.value.current)
			);
		}
	},
	show: function()
	{
		if(this.offset.current != this.offset.prev)
		{
			this.handle.style.left = String(this.offset.current) + 'px';
			this.offset.prev = this.offset.current;
		}
	},
	setValue: function(value, snap)
	{
		this.setValueTarget(value);
		if(snap)
		{
			this.value.current = this.value.target;
		}
	},
	setValueTarget: function(value)
	{
		this.value.target = value;
		this.offset.target = this.getOffsetByRatio(value);
	},
	setOffsetTarget: function(value)
	{
		this.offset.target = value;
		this.value.target = this.getRatioByOffset(value);
	},
	getRatioByOffset: function(offset)
	{
		return (offset - this.bounds.left) / this.bounds.diff;
	},
	getOffsetByRatio: function(ratio)
	{
		return Math.round(ratio * this.bounds.diff) + this.bounds.left;
	},
	getClosestStep: function(value)
	{
		var k = 0;
		var min = 1;
		for(var i = 0; i <= this.steps - 1; i++)
		{
			if(Math.abs(this.stepsRatio[i] - value) < min)
			{
				min = Math.abs(this.stepsRatio[i] - value);
				k = i;
			}
		}
		return this.stepsRatio[k];
	},
	preventDefaults: function(e, selection)
	{
		if(!e)
		{
			e = window.event;
		}
		if(e.preventDefault)
		{
			e.preventDefault();
		}
		if(selection && document.selection)
		{
			document.selection.empty();
		}
	},
	cancelEvent: function(e)
	{
		if(!e)
		{
			e = window.event;
		}
		if(e.stopPropagation)
		{
			e.stopPropagation();
		}
		else
		{
			e.cancelBubble = true;
		}
	}
};
