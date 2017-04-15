package com.dexvis.dex.task.vis.dexjs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class MotionChart extends WebTask
{
  public MotionChart()
  {
    super("Visualization: Dex JS", "Motion Chart",
      "visualization/dexjs/MotionChart.html",
      "web/dexjs/d3/MotionChart.gtmpl")
    
    
    setProperty('Dimensions', 'Height', 'height', 600)
    setProperty('Dimensions', 'Width', 'width', 800)
    setProperty('Dimensions', 'Transform', 'transform', '')
    
    setProperty('Source Columns', 'Name', 'index.name', 0)
    setProperty('Source Columns', 'Color', 'index.color', 0)
    setProperty('Source Columns', 'Time', 'index.time', 1)
    setProperty('Source Columns', 'X', 'index.x', 2)
    setProperty('Source Columns', 'Y', 'index.y', 3)
    setProperty('Source Columns', 'Size', 'index.size', 4)
    
    setProperty('General', 'Duration', 'duration', 10000)
    
    addProperties(TaskPropertyFactory.createMarginProperties('Dimensions', 'margin'))
    
    addProperties(TaskPropertyFactory.createCircleProperties('Circles', 'circle'))
    addProperties(TaskPropertyFactory.createTextProperties('Label', 'label'))
    
    addProperties(TaskPropertyFactory.createAxisProperties('X-Axis', 'xaxis'))
    addProperties(TaskPropertyFactory.createAxisProperties('Y-Axis', 'yaxis'))
    addProperties(TaskPropertyFactory.createStrokeProperties('Axis Lines', 'axisLine.stroke'))
    addProperties(TaskPropertyFactory.createFillProperties('Axis Lines', 'axisLine.fill'))
    addProperties(TaskPropertyFactory.createStrokeProperties('Axis Ticks', 'tick.stroke'))
    
    setSaveDynamic(true)
  }
}
