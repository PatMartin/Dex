/*
  Andor Salga
  Spyro
  Processing compliant
*/

int SIZE = 80;

void setup(){
  size(200, 200);
  background(0);
  smooth();
}

void draw(){

  // clear background with alpha
  noStroke();
  fill(0, 3);
  rect(0, 0, width, height);

  noFill();
  stroke(255, 0, 0, 25);
  strokeWeight(3);
  
  translate(width/2.0, height/2.0);
  translate(0.0f, sin(frameCount/20.0) * 30.0);
  rotate(frameCount/100.0);
  translate( 
    cos(frameCount/20.0) * 20.0, 
    sin(frameCount/30.0) * 20.0);
  rect(-SIZE/2, -SIZE/2, SIZE, SIZE);
}

