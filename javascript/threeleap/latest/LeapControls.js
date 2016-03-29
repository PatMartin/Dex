

//Almost a duplicate of THREE.RollControls
//Created by the two fine gentleman below:

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */


/*

	Right now, only two controls:
	
	- If there is one pointable, move around according to its position in 3D leap space
	
	- If there are two pointables, lock the position of the camera,
		and rotate based on the first pointables X and Y position
		
		
	To use this script, simply make sure 
		- that you call it in the html, 
		- initialize your THREE scene,
		- add the THREE rendering function to the initLeap() function,
		- call initLeap() to start the scene rendering!

*/

THREE.LeapControls = function ( object, domElement ) {
	
	
	/* 
	
		Some Constants for the LEAP
		If you are unhappy with the way that the camera works
		this is the place to look first

	*/
	
	this.leapConstants = {
		
		//makes rotation slower (also dependent on this.lookSpeed)
		rotationConstant:100,
		
		//when the hand leaves the field
		//this is the amount the rotation will be
		//divided by ever render
		rotationDampening:1.01,
		
		//Changes the 0 of the Y field
		yAlignment: 200,
		
		//Changes the 0 of the Z field
		zAlignment: -50,
		
		//Makes movement faster
		movementConstant:.01,
		
		//deceleration for when hand leaves field
		movementDampening:1.05,
		
	}
	

	
	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// API

	this.mouseLook = true;
	this.lookSpeed = 1;
	this.movementSpeed = 1;
	this.rollSpeed = 1;




	
	this.autoForward = true;
	
	//Added to smooth camera to a stop
	this.minSpeed = 0
	this.deceleration = 100
	
	
	
	this.constrainVertical = [ -0.9, 0.9 ];

	// disable default target object behavior

	this.object.matrixAutoUpdate = false;

	// internals

	this.forward = new THREE.Vector3( 0, 0, 1 );
	this.roll = 0;

	var xTemp = new THREE.Vector3();
	var yTemp = new THREE.Vector3();
	var zTemp = new THREE.Vector3();
	var rollMatrix = new THREE.Matrix4();

	
	//Keeping keyboard control functionality
	//as backup
	var doRoll = false, rollDirection = 1, forwardSpeed = 0, sideSpeed = 0, upSpeed = 0;


	var windowHalfX = 0;
	var windowHalfY = 0;

	this.handleResize = function () {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

	};


	//Sets rotation contants
	//so that when the hand is removed from the field, it won't automatically jump to no movement
	this.leapRotateHorizontal = 0
	this.leapRotateVertical = 0

	this.update = function ( delta ) {
		

		/*
		
			LEAP MOTION CAMERA MOVEMENT / ROTATION
		
		*/
		
		
		//if the hand is within range of leap,
		// use its X & Y to look horizontally and vertically
		
		
		if ( window.leapPos.x !=0 && window.leapPos.y !=0) {
			this.leapRotateHorizontal = window.leapPos.x/this.leapConstants.rotationConstant
			this.leapRotateVertical = -( window.leapPos.y-this.leapConstants.yAlignment)/this.leapConstants.rotationConstant
		}else{
			this.leapRotateHorizontal = this.leapRotateHorizontal/this.leapConstants.rotationDampening
			this.leapRotateVertical = this.leapRotateVertical/this.leapConstants.rotationDampening
		}
			
		var actualLookSpeed = delta * this.lookSpeed;
		this.rotateHorizontally( actualLookSpeed * this.leapRotateHorizontal);
		this.rotateVertically( actualLookSpeed  * this.leapRotateVertical);
		
		
		//If there is only one pointable, use its position in Z space to move the camera
		if(window.leapPos.z!=0 && window.leapPos.stationary ==false){
			this.movementSpeed += -(window.leapPos.z+this.leapConstants.zAlignment)*this.leapConstants.movementConstant
		}else{
			if(this.movementSpeed > 5 || this.movementSpeed < -5 ){
				this.movementSpeed = this.movementSpeed/this.leapConstants.movementDampening
			}else{
				this.movementSpeed = 0
			}
			
		}
		
		
		
		
		
		var actualSpeed = delta * this.movementSpeed;
		var forwardOrAuto = ( forwardSpeed > 0 || ( this.autoForward && ! ( forwardSpeed < 0 ) ) ) ? 1 : forwardSpeed;

		this.object.translateZ( -actualSpeed * forwardOrAuto );
		this.object.translateX( actualSpeed * sideSpeed );
		this.object.translateY( actualSpeed * upSpeed );

		if( doRoll ) {

			this.roll += this.rollSpeed * delta * rollDirection;

		}

		// cap forward up / down

		if( this.forward.y > this.constrainVertical[ 1 ] ) {

			this.forward.y = this.constrainVertical[ 1 ];
			this.forward.normalize();

		} else if( this.forward.y < this.constrainVertical[ 0 ] ) {

			this.forward.y = this.constrainVertical[ 0 ];
			this.forward.normalize();

		}


		// construct unrolled camera matrix

		zTemp.copy( this.forward );
		yTemp.set( 0, 1, 0 );

		xTemp.crossVectors( yTemp, zTemp ).normalize();
		yTemp.crossVectors( zTemp, xTemp ).normalize();

		this.object.matrix.elements[0] = xTemp.x; this.object.matrix.elements[4] = yTemp.x; this.object.matrix.elements[8] = zTemp.x;
		this.object.matrix.elements[1] = xTemp.y; this.object.matrix.elements[5] = yTemp.y; this.object.matrix.elements[9] = zTemp.y;
		this.object.matrix.elements[2] = xTemp.z; this.object.matrix.elements[6] = yTemp.z; this.object.matrix.elements[10] = zTemp.z;

		// calculate roll matrix

		rollMatrix.identity();
		rollMatrix.elements[0] = Math.cos( this.roll ); rollMatrix.elements[4] = -Math.sin( this.roll );
		rollMatrix.elements[1] = Math.sin( this.roll ); rollMatrix.elements[5] =  Math.cos( this.roll );

		// multiply camera with roll

		this.object.matrix.multiply( rollMatrix );
		this.object.matrixWorldNeedsUpdate = true;

		// set position

		this.object.matrix.elements[12] = this.object.position.x;
		this.object.matrix.elements[13] = this.object.position.y;
		this.object.matrix.elements[14] = this.object.position.z;


	};

	this.translateX = function ( distance ) {

		this.object.position.x += this.object.matrix.elements[0] * distance;
		this.object.position.y += this.object.matrix.elements[1] * distance;
		this.object.position.z += this.object.matrix.elements[2] * distance;

	};

	this.translateY = function ( distance ) {

		this.object.position.x += this.object.matrix.elements[4] * distance;
		this.object.position.y += this.object.matrix.elements[5] * distance;
		this.object.position.z += this.object.matrix.elements[6] * distance;

	};

	this.translateZ = function ( distance ) {

		this.object.position.x -= this.object.matrix.elements[8] * distance;
		this.object.position.y -= this.object.matrix.elements[9] * distance;
		this.object.position.z -= this.object.matrix.elements[10] * distance;

	};


	this.rotateHorizontally = function ( amount ) {

		// please note that the amount is NOT degrees, but a scale value

		xTemp.set( this.object.matrix.elements[0], this.object.matrix.elements[1], this.object.matrix.elements[2] );
		xTemp.multiplyScalar( amount );

		this.forward.sub( xTemp );
		this.forward.normalize();

	};

	this.rotateVertically = function ( amount ) {

		// please note that the amount is NOT degrees, but a scale value

		yTemp.set( this.object.matrix.elements[4], this.object.matrix.elements[5], this.object.matrix.elements[6] );
		yTemp.multiplyScalar( amount );

		this.forward.add( yTemp );
		this.forward.normalize();

	};

	function onKeyDown( event ) {

		//event.preventDefault();

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ forwardSpeed = 1; break;

			case 37: /*left*/
			case 65: /*A*/ sideSpeed = -1; break;

			case 40: /*down*/
			case 83: /*S*/ forwardSpeed = -1; break;

			case 39: /*right*/
			case 68: /*D*/ sideSpeed = 1; break;

			case 81: /*Q*/ doRoll = true; rollDirection = 1; break;
			case 69: /*E*/ doRoll = true; rollDirection = -1; break;

			case 82: /*R*/ upSpeed = 1; break;
			case 70: /*F*/ upSpeed = -1; break;

		}

	};

	function onKeyUp( event ) {

		switch( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ forwardSpeed = 0; break;

			case 37: /*left*/
			case 65: /*A*/ sideSpeed = 0; break;

			case 40: /*down*/
			case 83: /*S*/ forwardSpeed = 0; break;

			case 39: /*right*/
			case 68: /*D*/ sideSpeed = 0; break;

			case 81: /*Q*/ doRoll = false; break;
			case 69: /*E*/ doRoll = false; break;

			case 82: /*R*/ upSpeed = 0; break;
			case 70: /*F*/ upSpeed = 0; break;

		}

	};

	function onMouseMove( event ) {

		mouseX = ( event.clientX - windowHalfX ) / window.innerWidth;
		mouseY = ( event.clientY - windowHalfY ) / window.innerHeight;

	};

	function onMouseDown ( event ) {
		
		event.preventDefault();
		event.stopPropagation();

		mouseIsDown = true
		
		switch ( event.button ) {

			case 0: forwardSpeed = 1; break;
			case 2: forwardSpeed = -1; break;

		}

	};

	function onMouseUp ( event ) {

		event.preventDefault();
		event.stopPropagation();


		mouseIsDown = false
		
		switch ( event.button ) {

			case 0: forwardSpeed = 1; break;
			case 2: forwardSpeed = -1; break;

		}

	};

	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

	this.domElement.addEventListener( 'mousemove', onMouseMove, false );
	this.domElement.addEventListener( 'mousedown', onMouseDown, false );
	this.domElement.addEventListener( 'mouseup', onMouseUp, false );
	this.domElement.addEventListener( 'keydown', onKeyDown, false );
	this.domElement.addEventListener( 'keyup', onKeyUp, false );

	this.handleResize();
	


};


			
var leapInit =  function (){
  
	window.leapPos={
		x:0,
		y:0,
		z:0,
		stationary:false
	 }
	 
	Leap.loop(function(frame) {
	  
	  if(frame.pointables[0]){
		  window.leapPos.x = frame.pointables[0].tipPosition[0]
		  window.leapPos.y = frame.pointables[0].tipPosition[1]
		  window.leapPos.z = frame.pointables[0].tipPosition[2]
		  
	  //if no pointables present, set to  zero
	  }else{
		  window.leapPos.x = 0
		  window.leapPos.y = 0
		  window.leapPos.z = 0
		  
	  }
	  
	  //If there is a second pointable, set to stationary
	  if(frame.pointables[1]){
		  window.leapPos.stationary = true
	  }else{
		  window.leapPos.stationary = false	
	  }
	  latestFrame = frame
	  
	  //TODO
	  //Create THREE scene, and add rendering function here:
	  animate();
	})
			  
}



