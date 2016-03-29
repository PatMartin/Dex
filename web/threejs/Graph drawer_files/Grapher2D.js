
var colors = ["#E30613", "#008ef1", "#f1b900", "#4b9700", "#970051", "#69058b", "#4f2e00", "#000547"];
//				red,		blue,	  yellow,	green,		 pink,		purple,		brown, 	dark blue

function Grapher2D()
{
	this.vertices	= [];	// 3D vertices
	this.vcolors	= [];
	this.repulsion	= 200;
	this.attraction	= 0.06;
	this.damping	= 0.9;
	this.stable		= false;
	this.physics	= true;
	this.is3D		= false;
	this.noc		= 0;		// number of used colors
	this.dragged	= null;
	this.graph		= new Graph();
	var min = Number.NEGATIVE_INFINITY;
	var max = Number.POSITIVE_INFINITY;
	this.bounds		= {l:min, r:max, u:min, d:max, f:min, b:max};
}

Grapher2D.prototype.MakeGraph = function (s)
{	
	this.graph.Build(s);
	this.vertices = [];
	
	var rx, ry, rz;
	for(var i=0; i<this.graph.n; i++) 
	{
		rx = -100 + Math.random()*200;
		ry = -100 + Math.random()*200;
		rz = -100 + Math.random()*200;
		v = new Vertex(rx, ry, this.is3D?rz:0);
		this.vertices.push(v);
	}
	this.stable = false;
}

Grapher2D.prototype.SetBounds = function (lt, rt, up, dn, ft, bk)
{
	with(this.bounds) {l=lt; r=rt; u=up; d=dn; f=ft; b=bk;}
}

Grapher2D.prototype.MinColoring = function()
{
	var n = this.graph.n;
	this.vcolors = [];
	
	for(var i=0; i<n; i++) this.vcolors[i] = -1;	
	
	for(var i=0; i<n; i++) this.Color(i);	// start recursive coloring on each vertex
}

Grapher2D.prototype.Color = function(k)	// coloring k-th vertex
{
	if(this.vcolors[k] >-1) return;
	var g = this.graph;
	var nb = this.graph.neibs[k];
	var cols = this.vcolors;
	var i, col = 0;
	var cbu = false; // can be used
	
	while(!cbu)
	{
		cbu = true;
		for(i=0; i<nb.length; i++) 
			if(cols[nb[i]] == col) {cbu = false; ++col; break;}
	}
	cols[k] = col;
	
	for(i=0; i<nb.length; i++) this.Color(nb[i]);
}


Grapher2D.prototype.Iterate = function()
{
	if(this.stable)		return this.stable;
	if(!this.physics)	{this.stable = true; return false;}
	
	var u, v, i, j, k, com, dsq;
	for(k=0; k < this.graph.comps.length; k++)
	{
		com = this.graph.comps[k];
		for(i=0; i < com.length; i++) // loop through vertices
		{
			v = this.vertices[com[i]];
			v.f.x = v.f.y = v.f.z = 0;
			for(j=0; j < com.length; j++) // loop through other vertices
			{
				if(i==j)continue;
				u = this.vertices[com[j]]; 
				//	coulomb's repulsion
				dsq = ((v.x-u.x)*(v.x-u.x)+(v.y-u.y)*(v.y-u.y)+(v.z-u.z)*(v.z-u.z)); // distance squared
				if(dsq==0) dsq = 0.001;
				var coul = this.repulsion / dsq;
				v.f.x += coul * (v.x-u.x);
				v.f.y += coul * (v.y-u.y);
				v.f.z += coul * (v.z-u.z);
			}
		}
	}
	
	
	for(i=0; i < this.graph.edgesl.length; i++) // loop through edges
	{
		u = this.vertices[this.graph.edgesl[i]];
		v = this.vertices[this.graph.edgesr[i]];
		
		//	hook's attraction
		v.f.x += this.attraction*(u.x - v.x);
		v.f.y += this.attraction*(u.y - v.y);
		v.f.z += this.attraction*(u.z - v.z);
		u.f.x += this.attraction*(v.x - u.x);
		u.f.y += this.attraction*(v.y - u.y);
		u.f.z += this.attraction*(v.z - u.z);
	}
	
	var dis = 0;
	var bs = this.bounds;
	for(i=0; i < this.graph.n; i++) // set new positions
	{
		v = this.vertices[i];
		if(v == this.dragged) continue;
		v.v.x = (v.v.x + v.f.x)*this.damping; 
		v.v.y = (v.v.y + v.f.y)*this.damping; 
		v.v.z = (v.v.z + v.f.z)*this.damping; 
		dis += Math.abs(v.v.x) + Math.abs(v.v.y) + Math.abs(v.v.z);
		v.x += v.v.x;
		v.y += v.v.y;
		v.z += v.v.z;
		v.x = nmlz(bs.l, v.x, bs.r);
		v.y = nmlz(bs.u, v.y, bs.d);
		v.z = nmlz(bs.f, v.z, bs.b);
	}
	this.stable = dis < .5;
	return this.stable && (this.dragged == null);
}

function nmlz(l, x, r)
{
	if(x<l) return l;
	if(x>r) return r;
	return x;
}


Grapher2D.prototype.SetDragged = function(x, y, r)
{
	var u = new Point(x, y, 0);
	var v;
	for(i=0; i < this.graph.n; i++) // set new positions
	{
		v = this.vertices[i];
		if(u.distance2D(u, v)<r)
		{
			this.dragged = v;
			this.stable = false;
			break;
		}
	}
}

Grapher2D.prototype.MoveDragged = function(x, y)
{
	if(!this.dragged) return;
	this.dragged.x = x;
	this.dragged.y = y;
	this.stable = false;
}

Grapher2D.prototype.StopDragging = function()
{
	this.dragged = null;
}

Grapher2D.prototype.SwitchPhysics = function()
{
	this.physics = !this.physics;
	if(this.physics) this.stable = false;
}

Grapher2D.prototype.Switch3D = function()
{
	this.is3D = !this.is3D;
	if(this.is3D) 
	{
		for(i=0; i < this.graph.n; i++) // set new positions
			this.vertices[i].z = -80 + Math.random()*160;
		this.stable = false;
	}
	else
	{
		for(i=0; i < this.graph.n; i++)
		{// set new positions
			this.vertices[i].z = 0;
			this.vertices[i].f.z = 0;
			this.vertices[i].v.z = 0;
		}
		this.stable = false;
	}
}

