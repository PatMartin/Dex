
			requestAnimFrame = (function() {
				return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(callback, element) {
					window.setTimeout(callback, 1000/60);
				};
			})();
			
			function getTinyURL(e) 
			{
				nurl = encodeURIComponent(window.location.href);
				el("URLcont").src = "http://tinyurl.com/api-create.php?url="+nurl;
			}
			
			function getEmbedCode(e) 
			{
				var em = el("embed");
				if(em.style.display == "none") em.style.display = "block";
				else em.style.display = "none";
			}
			
			function el(s)
			{
				return document.getElementById(s);
			}
			
			function changePhysics() {g.SwitchPhysics(); el("phBTN").checked = g.physics; }
			function changeLabels() 
			{
				labels = !labels;
				for(var i=0; i<labls.length; i++) labls[i].style.visibility = (labels?"visible":"hidden");
				el("lbBTN").checked = labels;
			}
			function minColoring(e) 
			{
				g.MinColoring();
				
				for(var i=0; i<circs.length; i++)
					circs[i].setAttribute("fill", colors[g.vcolors[i]%colors.length]);
			}
			function change3D(t) {g.Switch3D(); t.checked = g.is3D;}
			
			function onLoad()
			{
				svg = el("svgc");
				svg.addEventListener("mousedown",	onMD, false);
				svg.addEventListener("mousemove",	onMM, false);
				svg.addEventListener("mouseup",		onMU, false);
				
				svg.addEventListener("touchmove",	BlockMove, false);	
				svg.addEventListener("touchstart",	onMD, false);
				svg.addEventListener("touchend",	onMU, false);
				svg.addEventListener("touchmove",	onMM, false);
			
				
				//	configuration of 3D
				c3d = { camz : 900, ang:0, d:0.015 };
				
				circs = null;
				lines = null;
				labls = null;
				
				window.onhashchange = function () {	rebuildGraph(); }
				el("inText").onkeypress = function(e) {if(e.keyCode==13) rebuildURL();}
				w = window.innerWidth-20;
				h = 460;
				hw=w/2;
				hh=h/2;
				labels = false;
				
				g = new Grapher2D();
				//g.SetBounds(-hw, hw, -230, 230, -hw, hw);
				
				new Slider('repSL', {
					value:0.5,
					animation_callback: function(v) {
						g.repulsion = 20+v*1000;
						g.stable = false;
					}
				});
				new Slider('attSL', {
					value:0.5,
					animation_callback: function(v) {
						g.attraction = 0.005+v*0.15;
						g.stable = false;
					}
				});
				/*
				new Slider('damSL', {
					value:0.5,
					animation_callback: function(v) {
						g.damping = 0.5+v*0.45;
						g.stable = false;
					}
				});
				*/
				rebuildGraph();
				onEF();
			}
			
			function BlockMove(event) { event.preventDefault() ; }
			
			function onMD(e){g.SetDragged	(mouseX(e)-hw, mouseY(e)-hh, 30);}
			function onMM(e){g.MoveDragged	(mouseX(e)-hw, mouseY(e)-hh);}
			function onMU(e){g.StopDragging();}
			
			function mouseX(e)
			{
				var cx;
				if(e.type == "touchstart" || e.type == "touchmove") cx = e.touches.item(0).clientX;
				else cx = e.clientX;
				return (cx + document.body.scrollLeft + document.documentElement.scrollLeft);
			}
			function mouseY(e)
			{	
				var cy;
				if(e.type == "touchstart" || e.type == "touchmove")	cy = e.touches.item(0).clientY;
				else cy = e.clientY;
				return (cy + document.body.scrollTop + document.documentElement.scrollTop); 
			}
			
			function rebuildURL()
			{
				var gr = el("inText").value;
				window.location = 'http://g.ivank.net/#'+gr;
			}
			
			function rebuildGraph()
			{
				var gr = window.location.href.slice(window.location.href.indexOf('#') + 1);
				if(window.location.href.indexOf("#")<1 || gr=="")
				{
					gr = "3:1-2,2-3,3-1"
					window.location = '#'+gr;
				}
				el("inText").value = gr;
				el("wCode").innerHTML = "<iframe src= \"http://g.ivank.net/g.html#"+gr+"\" width=\"400\" height=\"200\" style= \"border:none;\"></iframe>";

				g.MakeGraph(gr);
				
				var i, j;
				if(circs) for(i=0; i<circs.length; i++) svg.removeChild(circs[i]);
				if(lines) for(i=0; i<lines.length; i++) svg.removeChild(lines[i]);
				if(labls) for(i=0; i<labls.length; i++) svg.removeChild(labls[i]);
				circs = [];
				lines = [];
				labls = [];
				
				for(i=0; i<g.graph.edgesl.length; i++)
				{
					var l = document.createElementNS("http://www.w3.org/2000/svg", "line");
					l.setAttribute("style", "stroke:#777;stroke-width:3");
					svg.appendChild(l);
					lines.push(l);
				}
				for(i=0; i<g.graph.n; i++)
				{
					var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
					c.setAttribute("fill", "#E30613");
					c.setAttribute("style", "cursor:move;");
					svg.appendChild(c);
					circs.push(c);
					
					var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
					t.setAttribute("fill", "#fff");
					t.setAttribute("font-size", "18");
					t.setAttribute("style",  "pointer-events:none;");
					t.style.visibility = (labels?"visible":"hidden");
					t.textContent = i+1;
					svg.appendChild(t);
					labls.push(t);
				}
				
				if(!g.physics) changePhysics();
				redraw();
			}
			
			function onEF()
			{
				window.requestAnimFrame(onEF, svg);
				var stable = g.Iterate();
				if(stable && !g.is3D) return;
				redraw();
			}
			
			function sorter(a,b){return a.z - b.z}
			
			function redraw()
			{
				//if(g.is3D) g.vertices.sort(sorter);
				var u, v, nx, ny, nz;
				c3d.ang += c3d.d;
				var sn = Math.sin(c3d.ang);
				var cs = Math.cos(c3d.ang);
				for(i=0; i<g.graph.n; i++)
				{
					v = g.vertices[i];
					if(g.is3D)
					{
						nx = cs*v.x - sn*v.z;
						nz = sn*v.x + cs*v.z;
						ny = v.y;
					}
					else {nx = v.x; ny = v.y; nz = v.z;}
					v.px = c3d.camz*nx/(c3d.camz - nz);
					v.py = c3d.camz*ny/(c3d.camz - nz);
					v.pz = nz;
				}
				
			
				for(i=0; i<g.graph.edgesl.length; i++)
				{
					u = g.vertices[g.graph.edgesl[i]];
					v = g.vertices[g.graph.edgesr[i]];
					
					lines[i].setAttribute("x1", u.px+hw);
					lines[i].setAttribute("y1", u.py+hh);
					lines[i].setAttribute("x2", v.px+hw);
					lines[i].setAttribute("y2", v.py+hh);
				}
				
				var iw, kw;
				for(i=0; i<g.graph.n; i++)
				{
					v = g.vertices[i];
					iw = c3d.camz*13/(c3d.camz-v.pz);
					
					circs[i].setAttribute("cx", hw+v.px);
					circs[i].setAttribute("cy", hh+v.py);
					circs[i].setAttribute("r", iw);
					
					labls[i].setAttribute("x", hw+v.px-(i>8?10:5));
					labls[i].setAttribute("y", hh+v.py+6);
				}
			}
			
			