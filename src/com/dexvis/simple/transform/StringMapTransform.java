package com.dexvis.simple.transform;

import java.util.HashMap;

import org.simpleframework.xml.transform.Transform;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class StringMapTransform implements Transform<HashMap<String, String>>
{
  public HashMap<String, String> read(String value) throws Exception
  {
    XStream xstream = new XStream(new DomDriver());
    return (HashMap<String, String>) xstream.fromXML(value);
  }
  
  @Override
  public String write(HashMap<String, String> value) throws Exception
  {
    XStream xstream = new XStream(new DomDriver());
    return xstream.toXML(value);
  }
}
