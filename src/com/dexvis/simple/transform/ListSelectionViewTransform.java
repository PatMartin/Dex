package com.dexvis.simple.transform;

import java.util.ArrayList;
import java.util.List;

import org.controlsfx.control.ListSelectionView;
import org.simpleframework.xml.transform.Transform;

import com.dexvis.simple.types.SimpleListSelectionView;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class ListSelectionViewTransform implements
    Transform<ListSelectionView<String>>
{
  public ListSelectionView<String> read(String value) throws Exception
  {
    XStream xstream = new XStream(new DomDriver());
    SimpleListSelectionView simpleListSelectionView = (SimpleListSelectionView) xstream
        .fromXML(value);

    ListSelectionView<String> listSelectionView = new ListSelectionView<String>();

    listSelectionView.getSourceItems().addAll(
        simpleListSelectionView.getSourceList());
    listSelectionView.getTargetItems().addAll(
        simpleListSelectionView.getTargetList());

    return listSelectionView;
  }

  @Override
  public String write(ListSelectionView<String> value) throws Exception
  {
    XStream xstream = new XStream(new DomDriver());
    List<String> sourceList = new ArrayList<String>();
    List<String> targetList = new ArrayList<String>();

    for (Object obj : value.getSourceItems())
    {
      sourceList.add(obj.toString());
    }

    for (Object obj : value.getTargetItems())
    {
      targetList.add(obj.toString());
    }

    SimpleListSelectionView simpleListSelectionView = new SimpleListSelectionView();
    simpleListSelectionView.setSourceList(sourceList);
    simpleListSelectionView.setTargetList(targetList);

    return xstream.toXML(simpleListSelectionView);
  }
}
