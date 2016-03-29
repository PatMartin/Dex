package com.dexvis.simple.transform;

import java.util.HashMap;
import java.util.Map;

import javafx.scene.control.RadioButton;

import org.simpleframework.xml.transform.Transform;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class RadioButtonTransform implements Transform<RadioButton>
{
  public RadioButton read(String value) throws Exception
  {
    XStream xstream = new XStream(new DomDriver());
    Map<String, Object> rbMap = (Map<String, Object>) xstream.fromXML(value);

    RadioButton rb = new RadioButton();
    if (rbMap.containsKey("selected"))
    {
      rb.setSelected((Boolean) rbMap.get("selected"));
    }
    if (rbMap.containsKey("text"))
    {
      rb.setText((String) rbMap.get("text"));
    }
    return rb;
  }

  @Override
  public String write(RadioButton value) throws Exception
  {
    Map<String, Object> rbMap = new HashMap<String, Object>();
    if (value.isSelected())
    {
      rbMap.put("selected", true);
    }
    rbMap.put("text", value.getText());

    XStream xstream = new XStream(new DomDriver());
    return xstream.toXML(rbMap);
  }
}