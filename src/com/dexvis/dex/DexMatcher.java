package com.dexvis.dex;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;

import javafx.beans.property.BooleanProperty;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.scene.control.CheckBox;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.control.RadioButton;
import javafx.scene.control.Slider;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.web.HTMLEditor;

import org.controlsfx.control.ListSelectionView;
import org.controlsfx.control.PropertySheet;
import org.simpleframework.xml.transform.Matcher;
import org.simpleframework.xml.transform.Transform;

import com.dexvis.simple.transform.BooleanPropertyTransform;
import com.dexvis.simple.transform.CheckBoxTransform;
import com.dexvis.simple.transform.ChoiceBoxTransform;
import com.dexvis.simple.transform.HTMLEditorTransform;
import com.dexvis.simple.transform.LabelTransform;
import com.dexvis.simple.transform.LinkedMapTransform;
import com.dexvis.simple.transform.ListSelectionViewTransform;
import com.dexvis.simple.transform.ListViewTransform;
import com.dexvis.simple.transform.PropertySheetTransform;
import com.dexvis.simple.transform.RadioButtonTransform;
import com.dexvis.simple.transform.SliderTransform;
import com.dexvis.simple.transform.StringListTransform;
import com.dexvis.simple.transform.StringMapTransform;
import com.dexvis.simple.transform.StringPropertyTransform;
import com.dexvis.simple.transform.TextAreaTransform;
import com.dexvis.simple.transform.TextFieldTransform;

public class DexMatcher implements Matcher
{
  @Override
  @SuppressWarnings("unchecked")
  public Transform match(Class type) throws Exception
  {
    if (type.equals(StringProperty.class)
        || type.equals(SimpleStringProperty.class))
    {
      return new StringPropertyTransform();
    }
    else if (type.equals(BooleanProperty.class)
        || type.equals(SimpleBooleanProperty.class))
    {
      return new BooleanPropertyTransform();
    }
    else if (type.equals(PropertySheet.class))
    {
      return new PropertySheetTransform();
    }
    else if (type.equals(ArrayList.class))
    {
      return new StringListTransform();
    }
    else if (type.equals(HashMap.class))
    {
      return new StringMapTransform();
    }
    else if (type.equals(LinkedHashMap.class))
    {
      return new LinkedMapTransform();
    }
    else if (type.equals(TextArea.class))
    {
      return new TextAreaTransform();
    }
    else if (type.equals(TextField.class))
    {
      return new TextFieldTransform();
    }
    else if (type.equals(ListView.class))
    {
      return new ListViewTransform();
    }
    else if (type.equals(ListSelectionView.class))
    {
      return new ListSelectionViewTransform();
    }
    else if (type.equals(RadioButton.class))
    {
      return new RadioButtonTransform();
    }
    else if (type.equals(Label.class))
    {
      return new LabelTransform();
    }
    else if (type.equals(ChoiceBox.class))
    {
      return new ChoiceBoxTransform();
    }
    else if (type.equals(CheckBox.class))
    {
      return new CheckBoxTransform();
    }
    else if (type.equals(HTMLEditor.class))
    {
      return new HTMLEditorTransform();
    }
    else if (type.equals(Slider.class))
    {
      return new SliderTransform();
    }

    return null;
  }
}
