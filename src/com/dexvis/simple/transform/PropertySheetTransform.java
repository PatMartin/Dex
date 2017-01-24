package com.dexvis.simple.transform;

import org.controlsfx.control.PropertySheet;
import org.simpleframework.xml.transform.Transform;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class PropertySheetTransform implements Transform<PropertySheet>
{
  
  public PropertySheet read(String value) throws Exception
  {
    XStream xstream = new XStream(new DomDriver());
    return (PropertySheet) xstream.fromXML(value);
  }

  @Override
  public String write(PropertySheet sheet) throws Exception
  {
    XStream xstream = new XStream(new DomDriver());
    return xstream.toXML(sheet);
  }
}
