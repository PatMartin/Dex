# Canvas2D example. Using HPlot2D to show H2D histograms as a contour plot

from jhplot import *
from java.util import *

c1=HPlot2D("Canvas",800,600,2,1)
c1.visible()
c1.setAutoRange()


h1=H2D("2 Gaussians",30,-3.0, 3.0, 30, -3.0, 3.0)
r=Random()
for i in range(5000):
    h1.fill(0.6*r.nextGaussian()-0.5,r.nextGaussian())
    h1.fill(0.4*r.nextGaussian()+1,0.8*r.nextGaussian()+0.5)


c1.cd(1,1)
c1.setName("Contour style")
c1.setStyle(1)
c1.draw(h1)

c1.cd(2,1)
c1.setName("Filled style")
c1.setStyle(2)
c1.draw(h1)