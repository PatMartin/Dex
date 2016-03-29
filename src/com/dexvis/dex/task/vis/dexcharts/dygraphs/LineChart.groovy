package com.dexvis.dex.task.vis.dexcharts.dygraphs

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.javafx.scene.control.DexTaskProperty
import com.dexvis.util.TaskPropertyFactory

@Root
class LineChart extends WebTask {
  public LineChart() {
    super("Visualization: Dex Charts", "Dygraphs Line Chart",
      "visualization/dygraph/LineChart.html",
      "web/dexcharts/dygraphs/LineChart.gtmpl")

//    def config = [
//      'height'       : [ 'category' : 'Dimensions', 'name' : 'Height',       'value' : '' ],
//      'width'        : [ 'category' : 'Dimensions', 'name' : 'Width',        'value' : '' ]
//    ];
//
//    List<DexTaskProperty> propList = TaskPropertyFactory.create(this, config);
//    setPropertySheet(propList);

    setSaveDynamic(true)
  }
}
