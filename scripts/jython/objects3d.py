# Canvas3D example. P3D data on interactive 3D plot with different objects 

from jhplot  import HPlot3D,P3D
from java.util import Random
from java.awt import Color

c1 = HPlot3D("Canvas",600,400)
c1.setGTitle("Interactive 3D plot with P3D objects") 
c1.setNameX("X")
c1.setNameY("Y")
c1.visible(1)

# define range in Xmin, Xmax, Ymin, Ymax,  Zmin, Zmax 
# if this range is not set, it will be set automatically
c1.setRange(-5,10,-4,10,-8,20)


# build P3D shape 
h1 = P3D("3D form in blue")
h1.setPenColor(Color.blue)
#  build a 3D cube
h1.add(4.0,1.0,8.0,2.0,3.0,4.0)

# build 2D panel (Z extension is 0)
h1.add(5.0,2.0,3.0,1.0,8.0, 0.0)

# build 1D lines
h1.add(5.8,0.0,3.0,0.0,10.0, 3.0)
h1.add(-1.2,4.0,-2.0,0.0,10.0, 0.0)
h1.add(-1.2,0.0,-2.0,2.0,10.0, 0.0)


# new object
h2 = P3D("3D form in red")
h2.setPenColor(Color.red)
#build a 3D cube
h2.add(-0.5,3.0,-1.0,2.0,6.0,2.0)


# draw them 
c1.draw(h1)
c1.draw(h2)


# export to some image (png,eps,pdf,jpeg...)
# c1.export(Editor.DocMasterName()+".png")
