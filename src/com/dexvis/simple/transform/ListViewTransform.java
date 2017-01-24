package com.dexvis.simple.transform;

import java.util.ArrayList;
import java.util.List;

import javafx.collections.FXCollections;
import javafx.scene.control.ListView;

import org.simpleframework.xml.transform.Transform;

import com.dexvis.simple.types.SimpleListView;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class ListViewTransform implements Transform<ListView<String>>
{
  public ListView<String> read(String value) throws Exception
  {
    XStream xstream = new XStream(new DomDriver());
    SimpleListView simpleListView = (SimpleListView) xstream.fromXML(value);

    ListView<String> listView = new ListView<String>(
        FXCollections.observableArrayList(simpleListView.getStringList()));

    listView.getSelectionModel().setSelectionMode(
        simpleListView.getSelectionMode());

    List<Integer> indexList = simpleListView.getIndexList();

    for (int i : indexList)
    {
      listView.getSelectionModel().select(i);
    }

    return listView;
  }

  @Override
  public String write(ListView<String> value) throws Exception
  {
    XStream xstream = new XStream(new DomDriver());
    List<String> stringList = new ArrayList<String>();
    List<Integer> indexList = new ArrayList<Integer>();

    for (Object obj : value.getItems())
    {
      stringList.add(obj.toString());
    }

    for (Integer i : value.getSelectionModel().getSelectedIndices())
    {
      indexList.add(i);
    }
    
    SimpleListView simpleListView = new SimpleListView();
    simpleListView.setStringList(stringList);
    simpleListView.setIndexList(indexList);
    simpleListView.setSelectionMode(value.getSelectionModel().getSelectionMode());
    return xstream.toXML(simpleListView);
  }
}
