# Canvas2D example. Charts using polar coordinates. 

from java.awt import Color
from java.awt import Font
from java.util import Random
from math  import *
from jhplot import HChart,P1D

c1 = HChart("Canvas",600,500, 2, 1)
c1.setGTitle("Polar coordinates")
c1.visible()

c1.cd(1,1)
c1.setName("Polar coordinates-I")
c1.setChartPolar()
p1= P1D("test 1")
p2= P1D("test 2")
# fill
rand = Random() 
for i in range(20):
      x=4.0*i # x-value
      p1.add(i*4, 10.0*rand.nextGaussian());
      p2.add(i*2, 5.0*rand.nextGaussian());
c1.add(p1)
c1.add(p2)
c1.update()

c1.cd(2,1)
p3= P1D("Example")
for i in range(0,3*360,5):
    p3.add( 90-i,i)
c1.setChartPolar()
c1.setName("Polar coordinates-II")
c1.add(p3)
c1.update()

# export to some image (png,eps,pdf,jpeg...)
# c1.export(Editor.DocMasterName()+".png")
