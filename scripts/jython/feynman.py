# Canvas2D example. Feynman diagrams using HPlotJa class (singleton version).

from java.awt import Color,Font
from jhplot import *
from jhplot.jadraw import Diagram


# create HPlotJa but do not show any axis
# c1 = HPlotJa("Canvas",800,600,1,1,0)
# call singleton instead of creating object
c1=SHPlotJa.getCanvas("Canvas",1000,750,1,1,0)
c1.setGTitle("Feynman Diagram objects", Color.blue)
c1.visible()
c1.showEditor(1)

# show box
gl=Diagram.Box(0.05,0.1)
gl.setRelWH(0.05,0.05,"NDC")
c1.add(gl)

# show blob
gl=Diagram.Blob(0.05,0.2)
gl.setRelWH(0.01,0.01,"NDC")
c1.add(gl)

# show vertex
gl=Diagram.Vertex(0, 0.05,0.3)
gl.setRelWH(0.01,0.01,"NDC")
c1.add(gl)

gl=Diagram.Vertex(1, 0.05,0.4)
gl.setRelWH(0.01,0.01,"NDC")
c1.add(gl)

gl=Diagram.Vertex(2, 0.05,0.5)
gl.setRelWH(0.01,0.01,"NDC")
c1.add(gl)

gl=Diagram.Vertex(3, 0.05,0.6)
gl.setRelWH(0.01,0.01,"NDC")
c1.add(gl)

gl=Diagram.Vertex(5, 0.05,0.7)
gl.setRelWH(0.01,0.01,"NDC")
c1.add(gl)


gl=Diagram.PLine(0.05,0.8)
gl.setRelWH(0.1,0.0,"NDC")
c1.add(gl)

gl=Diagram.PLoop(0.05,0.9+0.02)
gl.setRelWH(0.05,0.0,"NDC")
c1.add(gl)




gl=Diagram.Text("Text: #bar{q}q &omega; K_{s}", 0.3,0.25)
c1.add(gl)

gl=Diagram.TextBox("Box Text", 0.3,0.3)
c1.add(gl)

s=[]
s.append("line 1");
s.append("line 2");
s.append("line 3");
gl=Diagram.TextBox(s, 0.3,0.4)
c1.add(gl)

gl=Diagram.SLine(0.3,0.6)
gl.setRelWH(0.1,0.0,"NDC")
c1.add(gl)

gl=Diagram.SLoop(0.3,0.7-0.025)
gl.setRelWH(0.05,0.0,"NDC")
c1.add(gl)


gl=Diagram.GlLine(0.3,0.8)
gl.setRelWH(0.1,0.0,"NDC")
c1.add(gl)

gl=Diagram.GlLoop(0.3,0.9-0.025)
gl.setRelWH(0.05,0.0,"NDC")
c1.add(gl)



gl=Diagram.ZigZagLine(0.6,0.1)
gl.setRelWH(0.1,0.0,"NDC")
c1.add(gl)

gl=Diagram.Key(1,"type 1", 0.6,0.2)
c1.add(gl)
gl=Diagram.Key(2,"type 2", 0.6,0.25)
c1.add(gl)
gl=Diagram.Key(3,"type 3", 0.6,0.30)
c1.add(gl)

gl=Diagram.FLine(0.6,0.5)
gl.setRelWH(0.1,0.0,"NDC")
c1.add(gl)


gl=Diagram.FLoop(0.6,0.6-0.025)
gl.setRelWH(0.05,0.0,"NDC")
c1.add(gl)


gl=Diagram.GLine(0.6,0.7)
gl.setRelWH(0.1,0.0,"NDC")
c1.add(gl)


gl=Diagram.GLoop(0.6,0.8-0.025)
gl.setRelWH(0.05,0.0,"NDC")
c1.add(gl)


gl=Diagram.GArc(0.8,0.1, 0.86, 0.16, 0.86, 0.1)
gl.setRelWH(0.05,0.0,"NDC")
c1.add(gl)


gl=Diagram.GlArc(0.8,0.3, 0.86, 0.36, 0.85, 0.3)
gl.setRelWH(0.05,0.0,"NDC")
c1.add(gl)

gl=Diagram.FArc(0.8,0.6, 0.86, 0.66, 0.85, 0.6)
gl.setRelWH(0.05,0.0,"NDC")
c1.add(gl)


gl=Diagram.SArc(0.8,0.8, 0.86, 0.86, 0.85, 0.8)
gl.setRelWH(0.05,0.0,"NDC")
c1.add(gl)







# show all now
c1.update()

