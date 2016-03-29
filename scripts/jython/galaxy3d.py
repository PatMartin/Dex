# Canvas3D example. Show a galaxy in 3D 

from jhplot  import *
from java.util import Random
from java.awt import Color

c1 = HPlot3D("Canvas",500,500)
c1.setGTitle("Interactive 3D galaxy") 
c1.setRange(-10,10,-10,10,-10,10)
c1.setNameX("X")
c1.setNameY("Y")
c1.visible(1)


# create P2D objects in 3D 
p1= P2D("Galaxy")
p1.setSymbolSize(2);
p1.setSymbolColor(Color.blue);

rand = Random()
for i in range(5000):
      x=3*rand.nextGaussian()
      y=3*rand.nextGaussian()
      z=0.4*rand.nextGaussian()
      p1.add(x,y,z)
c1.draw(p1)

h2=P2D("Core")
h2.setSymbolSize(2) 
h2.setSymbolColor(Color.yellow)
for i in range(5000):
      x=0.9*rand.nextGaussian()
      y=0.9*rand.nextGaussian()
      z=0.8*rand.nextGaussian()
      h2.add(x,y,z)
c1.draw(h2)