# Canvas2D example. A dynamic geometry program 
# S.Chekanov

from jhplot import *
from carmetal.objects import *

c1=HZirkel(600,600)
C=c1.getConstruction()
c1.setAxis(1)

# draw a point
p1=PointObject(C,1.0,1.0)
c1.draw(p1)

# draw a line
p1=LineObject(C,PointObject(C,-3,3), PointObject(C,3.0,-3.0), )
c1.draw(p1)

# draw a circle
p1=CircleObject(C,PointObject(C,0,0), PointObject(C,3.0,-3.0), )
c1.draw(p1)
