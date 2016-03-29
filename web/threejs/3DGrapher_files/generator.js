function addFace(geom,p1,p2,p3,color) {
	return geom.faces.push(new THREE.Face3(p1,p2,p3/*,new THREE.Vector3(0,1,0),null,geom.materials.push(new THREE.MeshBasicMaterial({color: color}))-1*/));
}
function addFace4(geom,p1,p2,p3,p4,color) {
	return geom.faces.push(new THREE.Face4(p1,p2,p3,p4/*,new THREE.Vector3(0,1,0),null,geom.materials.push(new THREE.MeshBasicMaterial({color: color}))-1*/));
}
function addTriangles(geom,triangles)
{
	var len = triangles.length, i, ti;
	for(i=0; i < len; i++)
	{
		ti = triangles[i];
		addFace(geom,ti.p1,ti.p2,ti.p3,ti.color);
	}
}

function szescian(bok, color, material)
{
	var tmp = bok / 2;
	var geom = new THREE.Geometry();
	geom.vertices = [
		new THREE.Vector3(-tmp, -tmp, -tmp),
		new THREE.Vector3(-tmp, -tmp, tmp),
		new THREE.Vector3(-tmp, tmp, -tmp),
		new THREE.Vector3(-tmp, tmp, tmp),
		new THREE.Vector3(tmp, -tmp, -tmp),
		new THREE.Vector3(tmp, -tmp, tmp),
		new THREE.Vector3(tmp, tmp, -tmp),
		new THREE.Vector3(tmp, tmp, tmp)
	];
	addTriangles(geom, [
        {p1: 0, p2: 2, p3: 4, color: color},//dolna1
        {p1: 2, p2: 4, p3: 6, color: color},//dolna2
        {p1: 1, p2: 3, p3: 5, color: color},//gorna1
        {p1: 3, p2: 5, p3: 7, color: color},//gorna2
        {p1: 0, p2: 1, p3: 2, color: color},//lewa1
        {p1: 1, p2: 2, p3: 3, color: color},//lewa2
        {p1: 6, p2: 5, p3: 7, color: color},//prawa1
        {p1: 6, p2: 5, p3: 4, color: color},//prawa2
        {p1: 0, p2: 1, p3: 4, color: color},//przednia1
        {p1: 1, p2: 4, p3: 5, color: color},//przednia2
        {p1: 3, p2: 2, p3: 6, color: color},//tylna1
        {p1: 3, p2: 6, p3: 7, color: color}//tylna2
    ]);
	geom.computeFaceNormals();
	var obj = new THREE.Mesh(geom,new THREE.MeshFaceMaterial());
	obj.doubleSided = true;
	return obj;
}

function plot(f,range,step)
{
	var geom = new THREE.Geometry();
    var x, y, z, xi = 0, yi = 0, c, maxi = (range*2)/step;
    for (x = -range; x <= range; x += step)
    {
        for (y = -range; y <= range; y += step)
        {
            ci = yi + xi* maxi;
            if (!f)
            {
                z = 0;
            }
            else
            {
                z = f(x, y);
		if (isNaN(z) || (z == Number.NEGATIVE_INFINITY) ||
                    (z == Number.POSITIVE_INFINITY) || (Math.abs(z) > 2e5) || !isFinite(z)) {
		   z = Number.NaN;
		}
            }
            geom.vertices.push(new THREE.Vector3(x*50 , y*50 , z*50 ));
            if (y > -range && x > -range)
            {
				c = '0xFFFFFF';
				//addFace(geom,ci-1,ci,ci-maxi,c);
				//addFace(geom,ci-1,ci-maxi-1,ci-maxi,c);
				addFace4(geom,ci-1,ci,ci-maxi,ci-maxi-1,c);
				geom.faceVertexUvs[ 0 ].push( [
					new THREE.UV( xi / maxi, yi / maxi ),
					new THREE.UV( xi / maxi, ( yi + 1 ) / maxi ),
					new THREE.UV( ( xi + 1 ) / maxi, ( yi + 1 ) / maxi ),
					new THREE.UV( ( xi + 1 ) / maxi, yi / maxi )
				] );
            }
            yi += 1;
        }
        xi += 1;
        yi = 0;
    }
	geom.computeFaceNormals();
	return geom;
}
function plot_parametric(iterations,xtu,ytu,ztu,range1_1,range1_2,range2_1,range2_2)
{
	var geom = new THREE.Geometry();
    step1=Math.abs(range1_2-range1_1)/iterations, step2=Math.abs(range2_2-range2_1)/iterations;
    var xi = 0, yi = 0, c, max_yi = iterations, max_xi = iterations;

    for (t = range1_1; t <= range1_2; t += step1)
    {
        yi = 0;
        for (u = range2_1; u <= range2_2; u += step2)
        {
            ci = yi + xi* (max_yi+1);
                x = xtu(t,u);
                y = ytu(t,u);
                z = ztu(t,u);
		 if (isNaN(x) || (x == Number.NEGATIVE_INFINITY) ||
                    (x == Number.POSITIVE_INFINITY) || (Math.abs(x) > 2e5) || !isFinite(x)) {
                    //x=0;
					x = Number.NaN;
                }
                if (isNaN(y) || (x == Number.NEGATIVE_INFINITY) ||
                    (y == Number.POSITIVE_INFINITY) || (Math.abs(y) > 2e5) || !isFinite(y)) {
                    //y=0;
					y = Number.NaN;
                }
                if (isNaN(z) || (z == Number.NEGATIVE_INFINITY) ||
                    (z == Number.POSITIVE_INFINITY) || (Math.abs(z) > 2e5) || !isFinite(z)) {
                    //z=0;
					z = Number.NaN;
                }
			geom.vertices.push(new THREE.Vector3(x*50 , y*50 , z*50 ));
            if (u > range2_1 && t > range1_1)
            {
				c = '0xFFFFFF';
				//addFace(geom,ci,ci-1,ci - max_yi-1,c);
				//addFace(geom,ci - max_yi-2,ci-1,ci - max_yi-1,c);
				addFace4(geom,ci-1,ci,ci-max_yi-1,ci-max_yi-2,c);
				geom.faceVertexUvs[ 0 ].push( [
					new THREE.UV( xi / max_yi, yi / max_yi ),
					new THREE.UV( xi / max_yi, ( yi + 1 ) / max_yi ),
					new THREE.UV( ( xi + 1 ) / max_yi, ( yi + 1 ) / max_yi ),
					new THREE.UV( ( xi + 1 ) / max_yi, yi / max_yi )
				] );
            }
            yi += 1;
        }
        xi += 1;
    }
	geom.computeFaceNormals();
	return geom;
}
function plot_supershape(m, n1, n2, n3, m2, n12, n22, n32, a, b, a2, b2)
{
	var geom = new THREE.Geometry();
	var ustep = 140;
	var vstep = 140;
	var piA = Math.PI ;
	var piB = Math.PI ;
	var theta = -piA;
	var r2, r1, phi;

	var xi = 0, yi = 0, c, max_yi = 140, max_xi = 140;
    while (theta <= piA)
	{
		phi = -piB/2;
		//r1 = 1/Math.pow((Math.pow(Math.abs(Math.cos(m*theta/4)/a)),n2)+Math.pow((Math.abs(Math.sin(m*theta/4)/b)),n3),n1);
        r1 = Math.pow(Math.pow(Math.abs((1/a)*Math.cos(m*theta/4)),n2)+Math.pow(Math.abs((1/b)*Math.sin(m*theta/4)),n3),-1/n1);
		yi = 0;
		while (phi <= piB/2)
        {
			//r2 = 1/Math.pow((Math.pow(Math.abs(Math.cos(m*phi/4)/a)),n2)+Math.pow((Math.abs(Math.sin(m*phi/4)/b)),n3),n1);
			r2 = Math.pow(Math.pow(Math.abs((1/a2)*Math.cos(m2*phi/4)),n22)+Math.pow(Math.abs((1/b2)*Math.sin(m2*phi/4)),n32),-1/n12);
            ci = yi + xi* (max_yi+1);

			x = r1 * Math.cos(theta) * r2 *Math.cos(phi);
			y = r1 * Math.sin(theta) * r2 * Math.cos(phi);
			z = r2 * Math.sin(phi);

		 if (isNaN(x) || (x == Number.NEGATIVE_INFINITY) ||
                    (x == Number.POSITIVE_INFINITY) || (Math.abs(x) > 2e5) || !isFinite(x)) {
                    //x=0;
					x = Number.NaN;
                }
                if (isNaN(y) || (x == Number.NEGATIVE_INFINITY) ||
                    (y == Number.POSITIVE_INFINITY) || (Math.abs(y) > 2e5) || !isFinite(y)) {
                    //y=0;
					y = Number.NaN;
                }
                if (isNaN(z) || (z == Number.NEGATIVE_INFINITY) ||
                    (z == Number.POSITIVE_INFINITY) || (Math.abs(z) > 2e5) || !isFinite(z)) {
                    //z=0;
					z = Number.NaN;
                }
			geom.vertices.push(new THREE.Vector3(x*50 , y*50 , z*50 ));
			if (phi > -piB/2 && theta > -piA)
            {
				c = '0xFFFFFF';
				addFace4(geom,ci-1,ci,ci-max_yi-1,ci-max_yi-2,c);
				geom.faceVertexUvs[ 0 ].push( [
					new THREE.UV( xi / max_yi, yi / max_yi ),
					new THREE.UV( xi / max_yi, ( yi + 1 ) / max_yi ),
					new THREE.UV( ( xi + 1 ) / max_yi, ( yi + 1 ) / max_yi ),
					new THREE.UV( ( xi + 1 ) / max_yi, yi / max_yi )
				] );
            }
            yi += 1;
			phi = phi + (piB/2 / (vstep/2));
        }
        xi += 1;
		theta = theta + (piA / (ustep/2));
    }
	geom.computeFaceNormals();
	return geom;
}