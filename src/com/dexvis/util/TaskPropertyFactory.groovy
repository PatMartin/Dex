package com.dexvis.util

import com.dexvis.dex.wf.DexTask
import com.dexvis.javafx.scene.control.DexTaskListProperty
import com.dexvis.javafx.scene.control.DexTaskProperty

class TaskPropertyFactory {
  
  public static List<DexTaskProperty> createEditableTextProperties(String category, String target) {
    List<DexTaskProperty> props = [new DexTaskProperty(category, "Text", "${target}.text", "", "")]
    props.addAll(createTextProperties(category, target))
    return props;
  }
  
  public static List<DexTaskProperty> createTextProperties(String category, String target) {
    
    List<DexTaskProperty> props =  [
      new DexTaskProperty(category, "X", "${target}.x", "", ""),
      new DexTaskProperty(category, "Y", "${target}.y", "", ""),
      new DexTaskProperty(category, "Text Length", "${target}.textLength", "", ""),
      new DexTaskProperty(category, "Text Length Adjust", "${target}.lengthAdjust", "", ""),
      new DexTaskProperty(category, "Transform", "${target}.transform", "", ""),
      new DexTaskProperty(category, "Vertical Orientation", "${target}.verticalOrientation", "", ""),
      new DexTaskProperty(category, "DX", "${target}.dx", "", ""),
      new DexTaskProperty(category, "DY", "${target}.dy", "", ""),
      new DexTaskProperty(category, "Writing Mode", "${target}.writingMode", "", ""),
      new DexTaskProperty(category, "Anchor", "${target}.anchor", "", ""),
      new DexTaskProperty(category, "Opacity", "${target}.fill.fillOpacity", "", ""),
      new DexTaskProperty(category, "Color", "${target}.fill.fillColor", "", ""),
      new DexTaskProperty(category, "Format", "${target}.format", "", "")
    ]
    props.addAll(createFontProperties(category, "${target}.font"))
    props.addAll(createFillProperties(category, "${target}.fill"))
    return props;
  }
  
  public static List<DexTaskProperty> createFillProperties(String category, String target) {
    List<DexTaskProperty> props = [new DexTaskProperty(category, "Fill Color", "${target}.fillColor", "", ""), new DexTaskProperty(category, "Fill Opacity", "${target}.fillOpacity", "", "")]
    
    return props;
  }
  
  
  public static List<DexTaskProperty> createFontProperties(String category, String target) {
    List<DexTaskProperty> props = [
      new DexTaskProperty(category, "Decoration", "${target}.decoration", "", ""),
      new DexTaskProperty(category, "Family", "${target}.family", "", ""),
      new DexTaskProperty(category, "Letter Spacing", "${target}.letterSpacing", "", ""),
      new DexTaskProperty(category, "Size", "${target}.size", "", ""),
      new DexTaskProperty(category, "Style", "${target}.style", "", ""),
      new DexTaskProperty(category, "Weight", "${target}.weight", "", ""),
      new DexTaskProperty(category, "Word Spacing", "${target}.wordSpacing", "", ""),
      new DexTaskProperty(category, "Variant", "${target}.variant", "", "")
    ]
    return props;
  }
  
  public static List<DexTaskProperty> createMarginProperties(String category, String target) {
    List<DexTaskProperty> props = [
      new DexTaskProperty(category, "Left Margin", "${target}.left", "", ""),
      new DexTaskProperty(category, "Right Margin", "${target}.right", "", ""),
      new DexTaskProperty(category, "Top Margin", "${target}.top", "", ""),
      new DexTaskProperty(category, "Bottom Margin", "${target}.bottom", "", "")
    ]
    
    return props;
  }
  
  public static List<DexTaskProperty> createLinkProperties(String category, String target) {
    List<DexTaskProperty> props = [new DexTaskProperty(category, "Link Transform", "${target}.transform", "", "")]
    props.addAll(createFillProperties(category, "${target}.fill"))
    props.addAll(createStrokeProperties(category, "${target}.stroke"))
    
    return props
  }
  
  public static List<DexTaskProperty> createCircleProperties(String category, String target) {
    List<DexTaskProperty> props = [
      new DexTaskProperty(category, "Circle Radius",    "${target}.r", "", ""),
      new DexTaskProperty(category, "Circle CX",        "${target}.cx", "", ""),
      new DexTaskProperty(category, "Circle CY",        "${target}.cy", "", ""),
      new DexTaskProperty(category, "Circle Transform", "${target}.transform", "", "")
    ]
    
    props.addAll(createFillProperties(category, "${target}.fill"))
    props.addAll(createStrokeProperties(category, "${target}.stroke"))
    
    return props
  }
  
  public static List<DexTaskProperty> createRectangleProperties(String category, String target) {
    List<DexTaskProperty> props = [
      new DexTaskProperty(category, "Rectangle Width",    "${target}.width", "", ""),
      new DexTaskProperty(category, "Rectangle Height",    "${target}.height", "", ""),
      new DexTaskProperty(category, "Rectangle X",    "${target}.x", "", ""),
      new DexTaskProperty(category, "Rectangle Y",    "${target}.y", "", ""),
      new DexTaskProperty(category, "Rectangle RX",    "${target}.rx", "", ""),
      new DexTaskProperty(category, "Rectangle RY",    "${target}.ry", "", ""),
      new DexTaskProperty(category, "Rectangle Opacity",    "${target}.opacity", "", ""),
      new DexTaskProperty(category, "Rectangle Color",    "${target}.color", "", ""),
      new DexTaskProperty(category, "Rectangle Transform",    "${target}.transform", "", "")
    ]
    
    props.addAll(createStrokeProperties(category, "${target}.stroke"))
    return props;
  }
  
  public static List<DexTaskProperty> createLineProperties(String category, String target) {
    List<DexTaskProperty> props = [
      new DexTaskProperty(category, "Line X1",    "${target}.x1", "", ""),
      new DexTaskProperty(category, "Line Y1",    "${target}.y1", "", ""),
      new DexTaskProperty(category, "Line X2",    "${target}.x2", "", ""),
      new DexTaskProperty(category, "Line Y2",    "${target}.y2", "", "")
    ]
    
    props.addAll(createStrokeProperties(category, "${target}.stroke"))
    props.addAll(createFillProperties(category, "${target}.fill"))
    
    return props;
  }
  
  public static List<DexTaskProperty> createAxisProperties(String category, String target) {
    List<DexTaskProperty> props = [
      new DexTaskProperty(category, "Orient",    "${target}.orient", "", ""),
      new DexTaskProperty(category, "Ticks",    "${target}.ticks", "", ""),
      new DexTaskProperty(category, "Tick Values",    "${target}.tickValues", "", ""),
      new DexTaskProperty(category, "Tick Size",    "${target}.tickSize", "", ""),
      new DexTaskProperty(category, "Inner Tick Size",    "${target}.innerTickSize", "", ""),
      new DexTaskProperty(category, "Outer Tick Size",    "${target}.outerTickSize", "", ""),
      new DexTaskProperty(category, "Tick Padding",    "${target}.tickPadding", "", ""),
      new DexTaskProperty(category, "Tick Format",    "${target}.tickFormat", "", "")
    ]
    
    props.addAll(createStrokeProperties(category, "${target}.stroke"))
    props.addAll(createFillProperties(category, "${target}.fill"))
    
    return props;
  }
  
  public static List<DexTaskProperty> createStrokeProperties(String category, String target) {
    List<DexTaskProperty> props = [
      new DexTaskProperty(category, "Stroke Color", "${target}.color", "", ""),
      new DexTaskProperty(category, "Stroke Width", "${target}.width", "", ""),
      new DexTaskProperty(category, "Stroke Dash Array", "${target}.dasharray", "", ""),
      new DexTaskProperty(category, "Stroke Opacity", "${target}.opacity", "", ""),
      new DexTaskProperty(category, "Stroke Transform", "${target}.transform", "", ""),
    ]
    
    return props;
  }
  
  public static List<DexTaskProperty> createTickProperties(String category, String target) {
    List<DexTaskProperty> props = [
      new DexTaskProperty(category, "Stroke Color", "${target}.stroke.color", "", ""),
      new DexTaskProperty(category, "Stroke Width", "${target}.stroke.width", "", ""),
      new DexTaskProperty(category, "Stroke Dash Array", "${target}.stroke.dasharray", "", ""),
      new DexTaskProperty(category, "Fill Color", "${target}.stroke.fill.fillColor", "", ""),
      new DexTaskProperty(category, "Fill Opacity", "${target}.stroke.fill.fillOpacity", "", ""),
      new DexTaskProperty(category, "Starting X", "${target}.start.x", "", ""),
      new DexTaskProperty(category, "Starting Y", "${target}.start.y", "", ""),
      new DexTaskProperty(category, "Ending X", "${target}.end.x", "", ""),
      new DexTaskProperty(category, "Ending Y", "${target}.end.y", "", ""),
      new DexTaskProperty(category, "Padding", "${target}.padding", "", "")
    ]
    
    return props;
  }
}
