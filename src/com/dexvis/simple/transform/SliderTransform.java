package com.dexvis.simple.transform;

import java.util.HashMap;
import java.util.Map;

import javafx.scene.control.Slider;

import org.simpleframework.xml.transform.Transform;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class SliderTransform implements Transform<Slider>
{
  public Slider read(String value) throws Exception
  {
    Slider slider = new Slider();
    
    try {
    XStream xstream = new XStream(new DomDriver());
    Map<String, Object> xmlMap = (Map<String, Object>) xstream.fromXML(value);

    if (xmlMap.containsKey("min"))
    {
      slider.setMin(Double.parseDouble("" + xmlMap.get("min")));
    }
    if (xmlMap.containsKey("min"))
    {
      slider.setMax(Double.parseDouble("" + xmlMap.get("max")));
    }
    if (xmlMap.containsKey("value"))
    {
      slider.setValue(Double.parseDouble("" + xmlMap.get("value")));
    }
    }
    catch (Exception ex) {
      ex.printStackTrace();
    }
    return slider;
    
  }

  @Override
  public String write(Slider slider) throws Exception
  {
    Map<String, Object> xmlMap = new HashMap<String, Object>();
    xmlMap.put("min", slider.getMin());
    xmlMap.put("max", slider.getMax());
    xmlMap.put("value", slider.getValue());

    XStream xstream = new XStream(new DomDriver());
    return xstream.toXML(xmlMap);
  }
}
