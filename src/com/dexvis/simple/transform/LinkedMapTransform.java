package com.dexvis.simple.transform;

import java.util.LinkedHashMap;

import org.simpleframework.xml.transform.Transform;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class LinkedMapTransform implements Transform<LinkedHashMap<String, String>>
{
  public LinkedHashMap<String, String> read(String value) throws Exception
  {
    XStream xstream = new XStream(new DomDriver());
    return (LinkedHashMap<String, String>) xstream.fromXML(value);
  }
  
  @Override
  public String write(LinkedHashMap<String, String> value) throws Exception
  {
    XStream xstream = new XStream(new DomDriver());
    return xstream.toXML(value);
  }
}
