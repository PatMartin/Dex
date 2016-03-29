dex.charts.threejs.ScatterPlot = function (userConfig) {
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
