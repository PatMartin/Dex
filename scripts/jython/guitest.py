# Canvas2D example. Create a plot canvas with a GUI control panel

from java.awt import *
from javax.swing import *
from java.util import * 
from jhplot  import *
 
c1 = HPlot('GUI')
c1.setGTitle('Plot area with GUI')
c1.visible(1)
c1.setAutoRange()
fr=c1.getFrame()

h1 = H1D('Histogram',20, -2.0, 2.0)
h1.setFill(1)
h1.setFillColor(Color.blue)   

pa0 = JPanel(); pa1 = JPanel() 
pa2 = JTextArea('GUI test',6,20)
pa2.setBackground(Color.yellow)

def act1(event):
   r=Random()
   for i in range(100):
      h1.fill(r.nextGaussian())   
   c1.draw(h1)
   pa2.setText('Generated 100 Gaussian numbers')

def act2(event):
   c1.clearData()
   pa2.setText('Clear plot')

pa0.setLayout(BorderLayout());
bu1=JButton('Gaussian', actionPerformed=act1)
pa0.add(bu1,BorderLayout.NORTH)
bu2=JButton('Clear', actionPerformed=act2)
pa0.add(bu2,BorderLayout.SOUTH)
pa0.add(pa2,BorderLayout.WEST)
fr.add(pa0,BorderLayout.EAST)
fr.pack()