var sin = Math.sin, cos = Math.cos, tan = Math.tan, exp = Math.exp, pow = Math.pow, sqrt = Math.sqrt,
abs = Math.abs, ln = Math.log, asin = Math.asin, acos = Math.acos, atan = Math.atan, pi = Math.PI;

//(function(){
var WIDTH =  $(window).innerWidth(),
	HEIGHT =  $(window).innerHeight();
var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

var container = document.getElementById("container"), mouse_down = false, mouseX = 0, mouseY = 0, roll = false,

antilias = true, panel_id = 1, ifcolor = false, iftexture = true;

var renderer = new THREE.WebGLRenderer({antialias: true});
var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
								ASPECT,
								NEAR,
								FAR  );
var scene = new THREE.Scene(), obj;
scene.add(camera);
// the camera starts at 0,0,0 so pull it back
camera.position.z = 300;
renderer.setSize(WIDTH, HEIGHT);
container.appendChild(renderer.domElement);
var fun = new Function("x, y", "return Math.cos(x*2)*Math.cos(y*2)");

var xut = new Function("t, u", "return Math.cos(t)*Math.sin(u)");
var yut = new Function("t, u", "return Math.sin(t)*Math.sin(u)");
var zut = new Function("t, u", "return Math.cos(u)");

var ra = 2, st = 0.02, ifshadows = $('#ifshadows').is(':checked');
var geom = {};
var texture = new THREE.ImageUtils.loadTexture("tex7.jpg"), material;
function refreshGeom()
{
	switch(parseInt($('.bpanels.active').attr('id').replace('panel',''),10)) {
		case 1:
			$('#plot_fxy').click();
		return;
		case 2:
			$('#plot_parametric').click();
		return;
		case 3:
			$('#a_value').change();
		return;
	}
}
function updateMaterial(callback) {
	if(ifshadows==true)
	{
		if(iftexture==true)
		{
			texture = new THREE.ImageUtils.loadTexture("tex7.jpg",{},function(){
				material = new THREE.MeshLambertMaterial({map: texture});
				if(callback) callback();
			});
		}
		else
		{
			material = new THREE.MeshLambertMaterial({color: '0x'+($('#color').val())});
			if(callback) callback();
		}
	}
	else
	{
		if(iftexture==true)
		{
			texture = new THREE.ImageUtils.loadTexture("tex7.jpg",{},function(){
				material = new THREE.MeshBasicMaterial({map: texture});
				if(callback) callback();
			});

		}
		else
		{
			material = new THREE.MeshBasicMaterial({color: '0x'+($('#color').val())});
			if(callback) callback();
		}
	}
}
updateMaterial();
var pointLight = new THREE.PointLight(0xFFFFFF),
pointLightyellow = new THREE.PointLight(0xAAAA00),
pointLightgreen = new THREE.PointLight(0x00FF00),
pointLightxxxx = new THREE.PointLight(0x00AAAA),
pointLightblue = new THREE.PointLight(0x0000FF),
pointLightviolet = new THREE.PointLight(0xAA00AA),
pointLightred = new THREE.PointLight(0xFF0000);
// set its position
pointLight.position.x = 60;
pointLight.position.y = 50;
pointLight.position.z = 170;
scene.add(pointLight);
function create_object()
{
	var objnew = new THREE.Mesh(geom,material);
	objnew.rotation.x = -Math.random();
	objnew.rotation.y = Math.random();
	objnew.rotation.z = Math.random();
	objnew.doubleSided = true;
	scene.add(objnew);
	if(obj)
	{
		objnew.rotation = obj.rotation;
		objnew.scale = obj.scale;
		scene.remove(obj);
	} else {

	}
	obj = objnew;
}
function animate()
{
	//obj.rotation.x += 0.01;
	//obj.rotation.y += 0.01;
	//obj.rotation.z += 0.01;
	roll = false;
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
/*obj.rotation.x = Math.random();
obj.rotation.y = Math.random();
obj.rotation.z = Math.random();*/
animate();
renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
if (window.addEventListener)
window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;
function onDocumentMouseDown(event)
{
	event.preventDefault();
	mouse_down = true;
}
function onDocumentMouseUp(event)
{
	event.preventDefault();
	mouse_down = false;
}
function onDocumentMouseMove(event)
{
	event.preventDefault();
	var oldmouseX = mouseX, oldmouseY = mouseY, speed_x, speed_y;

	mouseX = event.clientX - window.innerWidth/2;
	mouseY = event.clientY - window.innerHeight/2;
	if (!(!mouse_down && !roll)) {
		obj.rotation.y -= (mouseX-oldmouseX)*(-0.01);
		obj.rotation.x -= (mouseY-oldmouseY)*(-0.01);
	}
}
$('#navigation').hover(function(){
	mouse_down = false;
},function(){
});
function handle(delta)
{
	if (delta < 0)
	{
		obj.scale.x *= 0.9;
		obj.scale.y *= 0.9;
		obj.scale.z *= 0.9;
	}
	else
	{
		obj.scale.x *= 1.1;
		obj.scale.y *= 1.1;
		obj.scale.z *= 1.1;
	}
	roll = true;
}
function wheel(e)
{
	var delta = 0;
	if (!e)
	{
		e = window.event;
	}
	if (e.wheelDelta)
	{
		delta = e.wheelDelta / 120;
		if (window.opera)
		{
			delta = -delta;
		}
	}
	else if (e.detail)
	{
		delta = -e.detail / 3;
	}
	if (delta)
	{
		handle(delta);
	}
}
$('#plot_fxy').on('click', function() {
	fun = new Function("x, y", "return "+document.getElementById('fxy').value);
	ra = parseFloat($('#range_fxy').slider('value'));
	geom = plot(fun, ra, st);
	updateMaterial(create_object);
});
$('#plot_parametric').on('click', function() {
	xtu = new Function("t, u", "return "+document.getElementById('x_tu').value);
	ytu = new Function("t, u", "return "+document.getElementById('y_tu').value);
	ztu = new Function("t, u", "return "+document.getElementById('z_tu').value);
	t1 = eval(document.getElementById('t1').value);
	t2 = eval(document.getElementById('t2').value);
	u1 = eval(document.getElementById('u1').value);
	u2 = eval(document.getElementById('u2').value);
	geom = plot_parametric(140,xtu,ytu,ztu,t1,t2,u1,u2);
	updateMaterial(create_object);
});
$('#plot_supershape').on('click', function() {
	geom = plot_supershape(parseFloat($('#m_value').val()), parseFloat($('#n1_value').val()), parseFloat($('#n2_value').val()), parseFloat($('#n3_value').val()), parseFloat($('#m2_value').val()), parseFloat($('#n12_value').val()), parseFloat($('#n22_value').val()), parseFloat($('#n32_value').val()),parseFloat($('#a_value').val()),parseFloat($('#b_value').val()),parseFloat($('#a2_value').val()),parseFloat($('#b2_value').val()));
	updateMaterial(create_object);
});
$('div.supershape_slider').slider({min:-20, max:20, step:0.01, value:0,
	create: function(event, ui) {
		$(this).next().val(1+Math.floor(Math.random()*15));
		$(this).slider("option", "value",$(this).next().val());
	},
	slide: function(event, ui) {
		var param = $(this).attr('id').substr(7);
		$("#"+param+"_value").val(ui.value);
		geom = plot_supershape(parseFloat($('#m_value').val()), parseFloat($('#n1_value').val()), parseFloat($('#n2_value').val()), parseFloat($('#n3_value').val()), parseFloat($('#m2_value').val()), parseFloat($('#n12_value').val()), parseFloat($('#n22_value').val()), parseFloat($('#n32_value').val()),parseFloat($('#a_value').val()),parseFloat($('#b_value').val()),parseFloat($('#a2_value').val()),parseFloat($('#b2_value').val()));
		updateMaterial(create_object);
	}
});
$('div.supershape_slider2').slider({min:0, max:10, step:0.01, value:1,
	create: function(event, ui) {
		//$(this).next().val(1+Math.floor(Math.random()*10));
		$(this).slider("option", "value",$(this).next().val());
	},
	slide: function(event, ui) {
		var param = $(this).attr('id').substr(7);
		$("#"+param+"_value").val(ui.value);
		geom = plot_supershape(parseFloat($('#m_value').val()), parseFloat($('#n1_value').val()), parseFloat($('#n2_value').val()), parseFloat($('#n3_value').val()), parseFloat($('#m2_value').val()), parseFloat($('#n12_value').val()), parseFloat($('#n22_value').val()), parseFloat($('#n32_value').val()),parseFloat($('#a_value').val()),parseFloat($('#b_value').val()),parseFloat($('#a2_value').val()),parseFloat($('#b2_value').val()));
		updateMaterial(create_object);
	}
});
$('#random_supershape').on('click', function() {
	$('div.supershape_slider').each(function() {
		$(this).next().val(1+Math.floor(Math.random()*20));
		$(this).slider("option", "value",$(this).next().val());
	});
	$('div.supershape_slider2').each(function() {
		$(this).next().val(1);
		$(this).slider("option", "value",$(this).next().val());
	});
	$('#plot_supershape').click();
});

$('input.val_input').on('change', function() {
	var $this = $(this), val = $this.val(), splitt = $this.attr('id').split('_');
	$('#slider_'+splitt[0]).slider("option", "value", val);
	$('#plot_supershape').click();
});
$('input.val_input2').on('change', function() {
	var $this = $(this), val = $this.val(), splitt = $this.attr('id').split('_');
	$('#slider_'+splitt[0]).slider("option", "value", val);
	$('#plot_supershape').click();
});

$('#ifshadows').change(function() {
	ifshadows = this.checked;
	refreshGeom();return;
	updateMaterial(create_object);
});
$('#iftexture').change(function() {
	iftexture = this.checked;
	if(iftexture==true)
	{
		ifcolor = false;
		$('#ifcolor').attr('checked',false);
		$('#color').css('display','none');
	}
	else
	{
		ifcolor = true;
		$('#ifcolor').attr('checked',true);
		$('#color').css('display','block');
	}
	refreshGeom();return;
	updateMaterial(create_object);
});
$('#ifcolor').change(function() {
	ifcolor = this.checked;
	if(ifcolor==true)
	{
		iftexture = false;
		$('#iftexture').attr('checked',false);
		$('#color').css('display','block');

	}
	else
	{
		iftexture = true;
		$('#iftexture').attr('checked',true);
		$('#color').css('display','none');
	}
	refreshGeom();return;
	updateMaterial(create_object);
});

$('#toggle_button').on('click', function() {
	$tb = $(this);
	if($tb.hasClass('plus')) {
		$tb.removeClass('plus');
		$tb.addClass('minus');
	}
	else
	{
		$tb.removeClass('minus');
		$tb.addClass('plus');
	}
	$('#navigation').slideToggle();
	return false;
});
$("div#range_fxy").slider({ value: 2, min:1, max:4, step:1,
	slide: function(event, ui) {
		ra = parseFloat(ui.value);
		geom = plot(fun, ra, st);
		create_object(geom);
	}
});
$('#fxy_ex1').on('click', function() {
	//Peano surface
	$('input#fxy').val('(2*x*x-y)*(y-x*x)');
	$('#plot_fxy').click();
});
$('#fxy_ex2').on('click', function() {
	//Bell surface
	$('input#fxy').val('exp(-x*x-y*y)');
	$('#plot_fxy').click();
});
$('#par_ex1').on('click', function() {
	//Dini's surface
	$('input#x_tu').val('cos(t)*sin(u)');
	$('input#y_tu').val('sin(t)*sin(u)');
	$('input#z_tu').val('0.2*t+(cos(u)+ln(tan(u/2)))');
	$('input#t1').val('0');
	$('input#t2').val('4*pi');
	$('input#u1').val('0');
	$('input#u2').val('2');
	$('#plot_parametric').click();
});
$('#par_ex2').on('click', function() {
	//Mobius strip
	$('input#x_tu').val('(1 + u/2*cos(1/2*t))*cos(t)');
	$('input#y_tu').val('(1 + u/2*cos(1/2*t))*sin(t)');
	$('input#z_tu').val('u/2*sin(t/2)');
	$('input#t1').val('0');
	$('input#t2').val('2*pi');
	$('input#u1').val('-1');
	$('input#u2').val('1');
	$('#plot_parametric').click();
});
$('#par_ex3').on('click', function() {
	//Enneper
	$('input#x_tu').val('(t-t*t*t/3 + t*u*u)/5');
	$('input#y_tu').val('(t*t - u*u)/5');
	$('input#z_tu').val('(u-u*u*u/3 + u*t*t)/5');
	$('input#t1').val('-2');
	$('input#t2').val('2');
	$('input#u1').val('-2');
	$('input#u2').val('2');
	$('#plot_parametric').click();
});
$('#plot_fxy').click();

$('#panel1').on('click', function() {
	$('div.panel').hide();
	$('div#fxy_panel').show();
	$('.bpanels').removeClass('active');
	$(this).addClass('active');
	$('#plot_fxy').click();
	return false;
});
$('#panel2').on('click', function() {
	$('div.panel').hide();
	$('div#parametric_panel').show();
	$('.bpanels').removeClass('active');
	$(this).addClass('active');
	$('#plot_parametric').click();
	return false;
});
$('#panel3').on('click', function() {
	$('div.panel').hide();
	$('div#supershape_panel').show();
	$('.bpanels').removeClass('active');
	$(this).addClass('active');
	$('#plot_supershape').click();
	return false;
});
//Full screen
var pfx = ["webkit", "moz", "ms", "o", ""];
function RunPrefixMethod(obj, method) {
	var p = 0, m, t;
	while (p < pfx.length && !obj[m]) {
		m = method;
		if (pfx[p] == "") {
			m = m.substr(0,1).toLowerCase() + m.substr(1);
		}
		m = pfx[p] + m;
		t = typeof obj[m];
		if (t != "undefined") {
			pfx = [pfx[p]];
			return (t == "function" ? obj[m]() : obj[m]);
		}
		p++;
	}
}
var e = document.getElementsByTagName("canvas")[0];
/*$('#fullscreen').on('click',function(e) {
	RunPrefixMethod(e, "RequestFullScreen");
	return false;
});*/
document.getElementById("fullscreen").onclick = function() {
    /*if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
        RunPrefixMethod(document, "CancelFullScreen");
    }
    else {
        RunPrefixMethod(e, "RequestFullScreen");
    }*/
	RunPrefixMethod(e, "RequestFullScreen");
};
document.getElementById("fullscreen_icon").onclick = function() {
	RunPrefixMethod(e, "RequestFullScreen");
};
THREEx.WindowResize(renderer, camera);
$('#color').ColorPicker({color:'#307462',
onChange: function(hsb, hex, rgb) {
	$('#color').val(hex);
	updateMaterial(create_object);
}});

//}());