/*
  Andor Salga
  Swarm
  Processing compliant
*/

int SIZE = 80;
float f = 255.0f;

void setup(){
  size(250, 250);
  background(0);
}

void draw(){
  noStroke();
  fill(0, 5);
  
  rect(0, 0, width, height);
  noFill();
  stroke(255, 0, 0, 10);
  
  for(int i = 1; i < 50; i++){
  strokeWeight(5.0);
  pushMatrix();
  translate(width/2.0f, height/2.0f);
  rotate((i*50) + frameCount/100.0f/ (i*2)) ;
  translate( 
    cos((i*60) + frameCount/50.0f ) * (i + 10.0f), 
    sin((i*50) + frameCount/80.0f) * ((i*1) + 30.0f)
  );
  point(i, i);
  popMatrix();
  }
}
