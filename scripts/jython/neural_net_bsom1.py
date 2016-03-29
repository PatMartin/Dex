# NeuralNetwork. Build a bayesian Self-Organizing Map. Example I

from java.util import Random
from jhplot  import *

h1 = H1D("Data",20, -100.0, 300.0)
r = Random()
for i in range(2000):
      h1.fill(100+r.nextGaussian()*100) 
      h1.fill(100+r.nextDouble()*100) 
      
          
p1d=P1D(h1,0,0)
# write to a file
p1d.toFile("data.txt")

bs=HBsom()
bs.setNPoints(30)
bs.setData(p1d)
bs.visible()