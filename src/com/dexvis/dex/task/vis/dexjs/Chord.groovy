package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class Chord extends WebTask {
  public Chord() {
    super("Visualization: Dex JS", "Chord",
      "visualization/dexjs/ChordDiagram.html",
      "web/dexjs/d3/Chord.gtmpl")

    setProperty('Dimensions', 'Height', 'height', '100%')
    setProperty('Dimensions', 'Width', 'width', '100%')
    setProperty('Dimensions', 'Transform', 'transform', '')
    setProperty('Dimensions', 'Resizable', 'resizable', true)
    setProperty('Dimensions', 'Padding', 'padding', '')
    setProperty('Dimensions', 'Inner Radius', 'innerRadius', '')
    setProperty('Dimensions', 'Outer Radius', 'outerRadius', '')
    

    addProperties(TaskPropertyFactory.createStrokeProperties('Node (Mouseout)', 'nodes.mouseout.stroke'))
    addProperties(TaskPropertyFactory.createFillProperties('Node (Mouseover)', 'nodes.mouseover.fill'))
    addProperties(TaskPropertyFactory.createStrokeProperties('Node (Mouseout)', 'nodes.mouseout.stroke'))
    addProperties(TaskPropertyFactory.createFillProperties('Node (Mouseover)', 'nodes.mouseover.fill'))
    addProperties(TaskPropertyFactory.createLinkProperties('Links (Mouseout)', 'links.mouseout'))
    addProperties(TaskPropertyFactory.createLinkProperties('Links (Mouseover)', 'links.mouseover'))
    addProperties(TaskPropertyFactory.createEditableTextProperties('Title', 'title'))
    addProperties(TaskPropertyFactory.createTextProperties('Label', 'label'))
    addProperties(TaskPropertyFactory.createTickProperties('Ticks', 'tick'))
    
    setSaveDynamic(true)
  }
}
