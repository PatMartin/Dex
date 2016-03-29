# Canvas3D example. Tornado in 3D using HPlot3D (rewrite of a similar example from ROOT)
# S.Chekanov

from java.awt import Color
from jhplot import *
from math import *

d = 16
numberOfPoints = 200
numberOfCircles = 40
rng = numberOfCircles * d

c1 = HPlot3D("Tornado")
c1.visible()
c1.setRange(0.0,2000,0,2000,0,800)
c1.setGTitle("Tornado in 3D")
c1.setScaling(13)

m1,m2,m3=0,0,0
pm3d = P2D("Tornado1")
pm3d2 = P2D("Tornado2")
pm3d.setSymbolColor( Color(10,200,160) )
pm3d2.setSymbolColor( Color.blue)
pm3d2.setSymbolSize(2)
pm3d.setSymbolSize(2)
for j in range( d, numberOfCircles * d, d ):
   for i in xrange( 1, numberOfPoints ) :
      csin = sin( 2*pi / numberOfPoints * i ) + 1
      ccos = cos( 2*pi / numberOfPoints  * i ) + 1
      esin = sin( 2*pi / (numberOfCircles*d) * j ) + 1
      x = j * ( csin + esin )
      y = j * ccos
      z = j
      pm3d.add( x, y, z )
      pm3d2.add( x+5, y+5, z+20 )
c1.draw(pm3d)
c1.draw(pm3d2)