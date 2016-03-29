/*
  Andor Salga
  Processing Compliant
  KDE
*/

void setup(){
  size(300, 300);
  noStroke();
  background(255);
}

void circle(int i){
  if(i == 15) return;
  fill(255, 255, 0);
  if(i%2==0){fill(0, 0, 255);}
  int j = (i > 7) ? -10 : 10;
  translate(j, 0);
  ellipse(0, 0, 260 - (i*20), 260 - (i*20));
  circle(i+1);
}

void draw(){
  translate(width/2, height/2);
  rotate(frameCount/50.0f);
  translate(-10, 0);
  circle(0);
}

