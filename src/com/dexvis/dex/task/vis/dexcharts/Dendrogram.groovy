package com.dexvis.dex.task.vis.dexcharts

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.util.TaskPropertyFactory

@Root
class Dendrogram extends WebTask {
  
  public Dendrogram() {
    super('Visualization: Dex Charts', 'Dendrogram',
    "visualization/dex_charts/Dendrogram.html",
    'web/dexcharts/Dendrogram.gtmpl')

 
    setProperty('Root Node', 'Name', 'root.name', '')
    setProperty('Root Node', 'Category', 'root.category', '')

    setProperty('Dimensions', 'Height', 'height', 600)
    setProperty('Dimensions', 'Width', 'width', 800)
    setProperty('Dimensions', 'SVG Transform', 'transform', '')
    
    setProperty('Links', 'Length', 'connection.length', '180')
    
    addProperties(TaskPropertyFactory.createCircleProperties('Expanded Node', 'node.expanded.circle'))
    addProperties(TaskPropertyFactory.createCircleProperties('Collapsed Node', 'node.collapsed.circle'))
    addProperties(TaskPropertyFactory.createTextProperties('Title', 'title'))
    addProperties(TaskPropertyFactory.createTextProperties('Expanded Node Label', 'node.expanded.label'))
    addProperties(TaskPropertyFactory.createTextProperties('Collapsed Node Label', 'node.collapsed.label'))
    addProperties(TaskPropertyFactory.createLinkProperties('Links', 'link'))
   
    setSaveDynamic(true)
  }
}