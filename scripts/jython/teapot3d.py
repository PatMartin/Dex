# Canvas3D example. Show 3D object using OFF format

from jhpro.engine3d import *

# all OFF files are located in /data directory
#view=HEngine3D("C:\\dexws\\Dex\\data\\teapot.off")
view=HEngine3D("data/teapot.off")
view.setBounds(10, 10, 600, 400)
view.setVisible(1)
