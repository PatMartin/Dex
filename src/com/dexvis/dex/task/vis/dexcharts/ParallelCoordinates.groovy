package com.dexvis.dex.task.vis.dexcharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.javafx.scene.control.DexTaskProperty
import com.dexvis.util.TaskPropertyFactory

@Root
class ParallelCoordinates extends WebTask {
  public ParallelCoordinates() {
    super("Visualization: Dex Charts", "Parallel Coordinates",
    "visualization/dex_charts/ParallelCoordinates.html",
    "web/dexcharts/ParallelCoordinates.gtmpl")

    setProperty('Dimensions', 'Height', 'height', '')
    setProperty('Dimensions', 'Width', 'width', '')
    setProperty('Dimensions', 'Transform', 'transform', '')
    setProperty('Dimensions', 'Resizable', 'resizable', true)
    setProperty('Dimensions', 'Normalize', 'normalize', false)

    addProperties(TaskPropertyFactory.createRectangleProperties('Brush', 'brush'))
    
    addProperties(TaskPropertyFactory.createEditableTextProperties('Title', 'title'))
    addProperties(TaskPropertyFactory.createMarginProperties('Margin', 'margin'))
    addProperties(TaskPropertyFactory.createAxisProperties('Axis', 'axis'))
    addProperties(TaskPropertyFactory.createLineProperties('Axis Line', 'axis.line'))
    addProperties(TaskPropertyFactory.createTextProperties('Axis Label', 'axis.label'))
    addProperties(TaskPropertyFactory.createTextProperties('Vertical Label', 'verticalLabel'))

    addProperties(TaskPropertyFactory.createLinkProperties('Link (Selected)', 'selected.link'))
    addProperties(TaskPropertyFactory.createLinkProperties('Link (Unselected)', 'unselected.link'))
    
    setSaveDynamic(true)
  }
}
