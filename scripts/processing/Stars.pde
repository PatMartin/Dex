Star s;
ArrayList stars;

int NUM_STARS = 400;

class Star{
  PVector pos;
  PVector vel;
  float size;
  float brightness;
  
  Star(){
    init();
  }

  void init(){
    pos = new PVector(random(-500,500),random(-200,200),random(5,900));
    
    PVector temp = new PVector(pos.x,pos.y, pos.z);
    vel = new PVector(0,0,0);
    
    vel = temp;
    vel.normalize();
    
    float rand = random(13,20);
    
    vel.mult(rand);
    brightness = 1.0;
    
    if(rand <= 4){
      size = 3;
      
      vel.mult(rand/3);
      brightness = 0.5;
    }
    else{
      size = 2;
    }
  }  
  void update(){
    pos.x += vel.x;
    pos.y += vel.y;
    pos.z += vel.z;
    
    if(abs(pos.x) > width/2 || abs(pos.y) > height/2){
      init();
    }
    else{
      brightness = 1;
    }
  }
  
  void render(){
    stroke(255 * min(brightness,1.0));

    strokeWeight(size);
    
    pushMatrix();
    translate(width/2,height/2, 0);
    point(pos.x,pos.y,0);
    popMatrix();
  }
}


void setup(){
  size(640, 480, P3D);
  stars = new ArrayList();
  for(int i=0; i < NUM_STARS; i++){
    stars.add(new Star());
  }
}


void draw(){
  background(0);
  
  Star s;
  for(int i = 0; i < NUM_STARS; i++){
    s = (Star)stars.get(i);
    s.update();
    s.render();
  }
}
