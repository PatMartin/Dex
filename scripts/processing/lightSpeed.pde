/*
  Andor Salga
  Light Speed
  Processing compliant
*/

//import processing.opengl.*;

final int NUM_BEAMS = 30;

class Beam{
  PVector pos;
  float len;
  
  public Beam(PVector p){
    pos = new PVector(p.x, p.y, p.z);
    len = 25;
  }
  
  public void draw(){
    pushMatrix();
      translate(pos.x, pos.y, pos.z);
      box( .01, .01, len );
    popMatrix();
  }
  
  PVector getPos(){
    return pos;
  }
  
  void setPos(PVector p){
    pos = p;
  }
  
  void setLength(float s){
    len = s;
  }
}

ArrayList beams;

final float SPEED = 3;

void setup(){
  size( 500, 500, OPENGL);
  stroke( 250, 250, 250 );
  strokeWeight( 1 );
 
  beams = new ArrayList();
  
  for(int i = 0; i < NUM_BEAMS; i++){
    Beam b = new Beam(new PVector(random( -5, 5 ), 
                           random( -5, 5 ),
                           random( -10, 250)));
    b.setLength(random(10, 60));
                           
    beams.add(b);
  }
}

void draw(){
  perspective( 60, 1, 0.1, 800 );
  background( 0 );
  translate( width/2, height/2, 200 );

  for(int i = 0; i < beams.size(); i++){
    
    Beam b = (Beam)beams.get(i);
    b.draw();
    
    PVector pos = b.getPos();
    pos.z += 2;
    b.setPos(pos);
    
    if(pos.z > 250){
      b.setPos(new PVector(random( -5, 5), random( -5, 5 ), random( 10, -100 )));
      b.setLength(random(10, 60));
    }
  }
}

