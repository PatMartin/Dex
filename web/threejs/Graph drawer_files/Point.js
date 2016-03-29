

function Point(x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
}

Point.prototype.distance = function(a, b)
{
   return(Math.sqrt( (b.x-a.x)*(b.x-a.x) + (b.y-a.y)*(b.y-a.y) + (b.z-a.z)*(b.z-a.z)));
}
Point.prototype.distance2D = function(a, b)
{
   return(Math.sqrt( (b.x-a.x)*(b.x-a.x) + (b.y-a.y)*(b.y-a.y)));
}