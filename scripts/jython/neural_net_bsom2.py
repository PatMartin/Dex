# NeuralNetwork.  Build a bayesian Self-Organizing Map. Example II

from jhplot  import *
from java.awt import Color
from java.util import Random


c1 = HPlot("Canvas")
c1.setGTitle("Bayesian Self-Organizing Map")
c1.visible()
c1.setAutoRange()

h1 = H1D("Data",20, -100.0, 300.0)
r = Random()
for i in range(2000):
      h1.fill(100+r.nextGaussian()*100)


p1d=P1D(h1,0,0)

p1d.setErrToZero(1)
bs=HBsom()
bs.setNPoints(30)
bs.setData(p1d)
bs.run()
result=bs.getResult()
result.setStyle("pl")
result.setColor(Color.blue)
c1.draw(p1d)
c1.draw(result)