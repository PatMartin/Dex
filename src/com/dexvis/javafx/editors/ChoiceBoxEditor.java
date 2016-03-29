package com.dexvis.javafx.editors;

import java.util.List;

import org.controlsfx.control.PropertySheet.Item;
import org.controlsfx.property.editor.PropertyEditor;

import javafx.collections.FXCollections;
import javafx.scene.Node;
import javafx.scene.control.ChoiceBox;

public class ChoiceBoxEditor implements PropertyEditor<List<String>>
{
  private List<String> value = null;

  public ChoiceBoxEditor(Item item)
  {
    setValue((List<String>) item.getValue());
  }
  
  @Override
  public Node getEditor()
  {
    return new ChoiceBox(FXCollections.observableList(getValue()));
  }

  @Override
  public List<String> getValue()
  {
    return value;
  }

  @Override
  public void setValue(List<String> value)
  {
    this.value = value;
  }

}
