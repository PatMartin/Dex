# Canvas2D example. Charts based on the HChart class. Example I 

from java.awt import Color
from java.awt import Font
from java.util import Random
from math  import *
from jhplot import HChart,P1D

c1 = HChart("Canvas",600,600, 2, 1)
c1.setGTitle("Chart examples")
c1.visible()

c1.cd(1,1)
c1.setChartBar3D()
# c1.setNameX("")
# c1.setNameY("Numbers")
# c1.setName("Bar example")
c1.valueBar3D(1.0, "First", "category1");
c1.valueBar3D(4.0, "Second", "category2");
c1.valueBar3D(3.0, "Third",   "category3");
c1.update()


c1.cd(2,1)
# c1.setNameX("")
# c1.setNameY("Numbers")
# c1.setName("Bar example")
c1.setChartBar()
c1.valueBar(1.0, "First", "category1");
c1.valueBar(4.0, "Second", "category2");
c1.valueBar(3.0, "Third",   "category3");
c1.update()


# export to some image (png,eps,pdf,jpeg...)
# c1.export(Editor.DocMasterName()+".png")
