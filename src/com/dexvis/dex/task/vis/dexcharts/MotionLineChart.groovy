package com.dexvis.dex.task.vis.dexcharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class MotionLineChart extends WebTask {
  public MotionLineChart() {
    super("Visualization: Dex Charts", "Motion Line Chart",
      "visualization/dex_charts/MotionLineChart.html",
      "web/dexcharts/MotionLineChart.gtmpl")

    setProperty('Dimensions', 'Height', 'height', 600)
    setProperty('Dimensions', 'Width', 'width', 800)
    setProperty('Dimensions', 'Transform', 'transform', '')
    
    setProperty('Source Columns', 'Name', 'index.name', 0)
    setProperty('Source Columns', 'Color', 'index.color', 0)
    setProperty('Source Columns', 'Time', 'index.time', 1)
    setProperty('Source Columns', 'Bar Height', 'index.y', 2)
    
    setProperty('General', 'Duration', 'duration', 10000)
    
    addProperties(TaskPropertyFactory.createRectangleProperties('Bars', 'bar'))
    addProperties(TaskPropertyFactory.createTextProperties('Label', 'bar'))
    addProperties(TaskPropertyFactory.createAxisProperties('X-Axis', 'xaxis'))
    addProperties(TaskPropertyFactory.createAxisProperties('Y-Axis', 'yaxis'))
    addProperties(TaskPropertyFactory.createStrokeProperties('Axis Lines', 'axisLine.stroke'))
    addProperties(TaskPropertyFactory.createFillProperties('Axis Lines', 'axisLine.fill'))
    addProperties(TaskPropertyFactory.createStrokeProperties('Axis Ticks', 'tick.stroke'))
    //addProperties(TaskPropertyFactory.createTextProperties('Y Axis Labels', 'yaxis.label'))
    addProperties(TaskPropertyFactory.createTextProperties('X Axis Labels', 'xaxis.tickLabels'))
    
    setSaveDynamic(true)
  }
}
