# Canvas2D example. Charts based on the HChart class. Example I 

from java.awt import Color
from java.awt import Font
from java.util import Random
from math  import *
from jhplot import *

from java.lang import *

# test print streams using java
System.out.println("OK message")
System.err.println("Error message")

c1 = HChart("Canvas",600,600, 1, 2)
c1.setGTitle("Chart examples")
c1.cd(1,1)
c1.visible()

c1.cd(1,1)
c1.setChartPie()
c1.setName("Pie example")
c1.valuePie("Hamburg",1.0)
c1.valuePie("London",2.0)
c1.valuePie("Paris",1.0)
c1.valuePie("Bern",1.0)
c1.update()


# new plot
c1.cd(1,2)
c1.setName("XY example")
c1.setNameX("weeks")
c1.setNameY("density")
p1= P1D("test 1")
p1.setColor(Color.red)
p2= P1D("test 2")
# fill
rand = Random() 
for i in range(1000):
      x=4.0*i # x-value
      p1.add(i*4, 10.0*rand.nextGaussian());
      p2.add(i*2, 5.0*rand.nextGaussian());  
c1.add(p1)
c1.add(p2)
c1.update()


# export to some image (png,eps,pdf,jpeg...)
# c1.export(Editor.DocMasterName()+".png")
