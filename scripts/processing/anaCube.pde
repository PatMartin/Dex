/*
  Andor Salga
  Rotating Anaglyph Cube
  Processing compliant
*/
float r = 0.0;

void setup(){
  size(450, 400, P3D);
  noFill();
  strokeWeight(1);
}

void draw(){
  r += 0.01;

  background( 255 );
  translate( width/2, height/2, 80);

  scale(5 + abs(sin(frameCount/50.0) * 8));

  pushMatrix();
  rotateY( r );
  rotateX( r );

  stroke(0, 255, 255);
  box(10);
  popMatrix();


  pushMatrix();
  translate(2, 0, 0);
  rotateY( r );
  rotateX( r );

  stroke(255, 0,0);
  box(10);
  popMatrix();
}

