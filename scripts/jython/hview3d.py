# Canvas3D example. Using 3D interactive shapes in HView3d  

from java.awt import Color
from jhplot  import HView3D
from jhplot.v3d import Cube,Sphere,Cone,Cylinder

c1 = HView3D("Canvas",400,400)
c1.visible(1)
c1.setGTitle("3D objects in HView3D")

o= Cube(c1.getModel(),40)
o.setRot(45,45,45)
c1.draw(o)

o = Sphere(c1.getModel(), 30.0, 80, 80)
o.setTrans(40,-20,10)
c1.draw(o);

o = Cone(c1.getModel(), 30, 100, 50)
o.setTrans(-20, 30, 0)
o.setColor(Color.red)
c1.draw(o);

o = Cylinder(c1.getModel(), 40, 100, 2)
o.setTrans(-1, 0, 0)
o.setRot(0, 60, 0)
o.setColor(Color.yellow)
c1.draw(o)

c1.update()