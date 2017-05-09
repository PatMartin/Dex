package com.dexvis.simple.transform;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javafx.collections.FXCollections;
import javafx.scene.control.ChoiceBox;

import org.simpleframework.xml.transform.Transform;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class ChoiceBoxTransform implements Transform<ChoiceBox>
{
  public ChoiceBox read(String value) throws Exception
  {
    XStream xstream = new XStream(new DomDriver());
    Map<String, Object> cbMap = (Map<String, Object>) xstream.fromXML(value);
    ChoiceBox cb = new ChoiceBox();
    cb.setItems(FXCollections.observableArrayList((List<Object>) cbMap
        .get("items")));
    
    if (cbMap.containsKey("selected"))
    {
      cb.setValue((String) cbMap.get("selected"));
    }
    return cb;
  }
  
  @Override
  public String write(ChoiceBox value) throws Exception
  {
    String selected = null;
    if (value.getValue() != null)
    {
      selected = value.getValue().toString();
    }
    
    List<Object> items = value.getItems();
    List<Object> newItems = new ArrayList<Object>();
    for (Object item : items)
    {
      newItems.add(item);
    }
    
    Map<String, Object> cbMap = new HashMap<String, Object>();
    if (selected != null)
    {
      cbMap.put("selected", selected);
    }
    cbMap.put("items", newItems);
    
    XStream xstream = new XStream(new DomDriver());
    return xstream.toXML(cbMap);
  }
}
