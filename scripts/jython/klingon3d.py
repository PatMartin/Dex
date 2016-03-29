# Canvas3D example. Show 3D object using OFF format

from jhpro.engine3d import *

# all OFF files are located in /data directory
view=HEngine3D("data/off/klingon.off")
view.setBounds(10, 10, 800, 800)
view.setVisible(1)
