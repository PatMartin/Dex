package com.dexvis.javafx.scene.control;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javafx.collections.FXCollections;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.scene.control.Accordion;
import javafx.scene.control.CheckBox;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.ColorPicker;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.control.TextField;
import javafx.scene.control.TitledPane;
import javafx.scene.paint.Color;

import org.tbee.javafx.scene.layout.MigPane;

public class JsonGuiPane extends MigPane
{
  /**
   * 
   * Create a new JsonGui pane with the supplied layout, column and row
   * constraints.
   * 
   * @param layoutConstraint
   *          These constraints specify how the layout manager instance should
   *          work in general. For instance how all the laid out components
   *          should be aligned as a group, should there be available space in
   *          the container. This constraint is set directly on the layout
   *          manager instance, either in the constructor or using a standard
   *          get/set property. E.g. "align center, fill".
   * @param columnConstraint
   *          Specifies the properties for the grid's columns. Constraints such
   *          as sizes and default alignments can be specified. These
   *          constraints are set directly on the layout manager instance,
   *          either in the constructor or using standard get/set properties.
   *          E.g. "[35px]10px[50:pref]".
   * @param rowConstraint
   *          Specifies the properties for the grid's rows. Constraints such as
   *          sizes and default alignments can be specified. These constraints
   *          are set directly on the layout manager instance, either in the
   *          constructor or using standard get/set properties. E.g.
   *          "[35px]10px[50:pref]".
   * 
   */
  public JsonGuiPane(String layoutConstraint, String columnConstraint,
      String rowConstraint)
  {
    super(layoutConstraint, columnConstraint, rowConstraint);
  }
  
  /**
   * Given a JSON GUI specification, set the child controls of this pane as per
   * the supplied specification.
   * 
   * @param guiDef
   *          The GUI specification.
   * 
   */
  public void setGuiDefinition(String guiDef)
  {
    System.out.println("SetGuiDef: '" + guiDef + "'");
    // Clear out any old contents.
    getChildren().clear();
    
    // Load our configuration into java objects.
    Object jsonSpec = JsonUtil.parseJsonString(guiDef);
    
    // Add the controls to the guiPane.
    addControls(this, jsonSpec);
  }
  
  /**
   * 
   * Add the specified controls to the current MigPane.
   * 
   * @param pane
   *          The parent pane to which we will be adding controls.
   * @param jsonSpec
   *          The JSON specification converted to java objects.
   * 
   */
  private void addControls(MigPane pane, Object jsonSpec)
  {
    // We expect a list of controls or groups of controls.
    if (jsonSpec instanceof List<?>)
    {
      // The spec consists of a list of 0 or more control specs.
      List<Map<String, Object>> specs = (List<Map<String, Object>>) jsonSpec;
      
      // If we have at least one spec then...
      if (specs.size() > 0)
      {
        // If we are dealing with a group definition, create an accordion
        // control and add each under a titled pane.
        String specType = (String) specs.get(0).get("type");
        if (specType.equalsIgnoreCase("group"))
        {
          Accordion accordion = new Accordion();
          for (Map<String, Object> spec : specs)
          {
            TitledPane tp = new TitledPane();
            tp.setText(getValue(spec, "name", "Unnamed"));
            accordion.getPanes().add(tp);
            MigPane contentPane = new MigPane("", "[][grow][]", "[]");
            addControls(contentPane, spec.get("contents"));
            tp.setContent(contentPane);
          }
          // Adding grouped specifications.
          pane.add(accordion, "grow,span");
        }
        else
        {
          // Adding single components.
          for (Map<String, Object> spec : specs)
          {
            Label label = new Label(getValue(spec, "name", "Unnamed"));
            pane.add(label);
            switch (spec.get("type").toString())
            {
            // Express ints as a slider.
              case "int":
              {
                Slider slider = new Slider();
                slider.setMin(getIntValue(spec, "minValue", 0));
                slider.setMax(getIntValue(spec, "maxValue", 100));
                slider.setValue(getIntValue(spec, "initialValue", 0));
                
                Label valueLabel = new Label(
                    getValue(spec, "initialValue", "0"));
                
                slider.valueProperty().addListener(
                    (observable, oldVal, newVal) -> {
                      int val = newVal.intValue();
                      valueLabel.setText("" + val);
                      fireEvent(spec.get("target").toString(), "" + val);
                    });
                pane.add(slider, "growx");
                pane.add(valueLabel, "span");
                break;
              }
              // Express floats as a slider as well.
              case "float":
              {
                Slider slider = new Slider();
                slider.setMin(getDoubleValue(spec, "minValue", 0.0));
                slider.setMax(getDoubleValue(spec, "maxValue", 100.0));
                slider.setValue(getDoubleValue(spec, "initialValue", 0.0));
                
                Label valueLabel = new Label(
                    getValue(spec, "initialValue", "0"));
                
                slider.valueProperty().addListener(
                    (observable, oldVal, newVal) -> {
                      double val = newVal.doubleValue();
                      valueLabel.setText("" + val);
                      fireEvent(spec.get("target").toString(), "" + val);
                    });
                pane.add(slider, "growx");
                pane.add(valueLabel, "span");
                break;
              }
              // Expressed string input in a text field.
              case "string":
              {
                TextField textField = new TextField(getValue(spec,
                    "initialValue", ""));
                textField.textProperty().addListener(
                    (observable, oldVal, newVal) -> {
                      String val = newVal.toString();
                      fireEvent(new JsonGuiEvent(new JsonGuiEventPayload(spec
                          .get("target").toString(), "" + val), null,
                          JsonGuiEvent.CHANGE_EVENT));
                    });
                pane.add(textField, "grow,span");
                break;
              }
              // Express a choice as a ChoiceBox.
              case "choice":
              {
                ChoiceBox cb = new ChoiceBox(
                    FXCollections.observableArrayList((ArrayList) spec
                        .get("choices")));
                cb.getSelectionModel().select(
                    getValue(spec, "initialValue", ""));
                pane.add(cb, "grow,span");
                cb.setOnAction(action -> {
                  fireEvent(spec.get("target").toString(), cb
                      .getSelectionModel().selectedItemProperty().getValue()
                      .toString());
                });
                break;
              }
              // Express booleans as a checkbox.
              case "boolean":
              {
                CheckBox cb = new CheckBox();
                cb.setSelected(getBooleanValue(spec, "initialValue", false));
                
                cb.setOnAction(action -> {
                  fireEvent(spec.get("target").toString(), "" + cb.isSelected());
                });
                pane.add(cb, "grow,span");
                break;
              }
              // Express color as a color-picker.
              case "color":
              {
                ColorPicker colorPicker = new ColorPicker();
                pane.add(colorPicker, "grow,span");
                colorPicker.setOnAction(new EventHandler()
                {
                  public void handle(Event t)
                  {
                    Color color = colorPicker.getValue();
                    String webColor = String.format("#%02X%02X%02X",
                        (int) (color.getRed() * 255),
                        (int) (color.getGreen() * 255),
                        (int) (color.getBlue() * 255));
                    fireEvent(new JsonGuiEvent(new JsonGuiEventPayload(spec
                        .get("target").toString(), webColor), null,
                        JsonGuiEvent.CHANGE_EVENT));
                  }
                });
                break;
              }
            }
          }
        }
      }
    }
  }
  
  // Convenience function to fire a JsonGuiEvent
  private void fireEvent(String target, String value)
  {
    fireEvent(new JsonGuiEvent(new JsonGuiEventPayload(target, value), null,
        JsonGuiEvent.CHANGE_EVENT));
  }
  
  /**
   * 
   * Convenience function to retrieve a string value from a map. If not found,
   * provide the default value instead.
   * 
   * @param map
   *          The map to extract the value from.
   * @param key
   *          The key of the value to extract.
   * @param defaultValue
   *          The default value when not found.
   * 
   * @return The string value if found within the map, otherwise the default
   *         value.
   * 
   */
  private String getValue(Map<String, Object> map, String key,
      String defaultValue)
  {
    if (map.containsKey(key))
    {
      try
      {
        return map.get(key).toString();
      }
      catch(Exception ex)
      {
      }
    }
    return defaultValue;
  }
  
  /**
   * 
   * Convenience function to retrieve a boolean value from a map. If not found,
   * provide the default value instead.
   * 
   * @param map
   *          The map to extract the value from.
   * @param key
   *          The key of the value to extract.
   * @param defaultValue
   *          The default value when not found.
   * 
   * @return The boolean value if found within the map, otherwise the default
   *         value.
   * 
   */
  private boolean getBooleanValue(Map<String, Object> map, String key,
      boolean defaultValue)
  {
    if (map.containsKey(key))
    {
      try
      {
        return Boolean.parseBoolean(map.get(key).toString());
      }
      catch(Exception ex)
      {
        
      }
    }
    return defaultValue;
  }
  
  /**
   * 
   * Convenience function to retrieve a int value from a map. If not found,
   * provide the default value instead.
   * 
   * @param map
   *          The map to extract the value from.
   * @param key
   *          The key of the value to extract.
   * @param defaultValue
   *          The default value when not found.
   * 
   * @return The int value if found within the map, otherwise the default value.
   * 
   */
  private int getIntValue(Map<String, Object> map, String key, int defaultValue)
  {
    if (map.containsKey(key))
    {
      try
      {
        return Integer.parseInt(map.get(key).toString());
      }
      catch(Exception ex)
      {
        
      }
    }
    return defaultValue;
  }
  
  /**
   * 
   * Convenience function to retrieve a double value from a map. If not found,
   * provide the default value instead.
   * 
   * @param map
   *          The map to extract the value from.
   * @param key
   *          The key of the value to extract.
   * @param defaultValue
   *          The default value when not found.
   * 
   * @return The double value if found within the map, otherwise the default
   *         value.
   * 
   */
  private double getDoubleValue(Map<String, Object> map, String key,
      double defaultValue)
  {
    if (map.containsKey(key))
    {
      try
      {
        return Double.parseDouble(map.get(key).toString());
      }
      catch(Exception ex)
      {
      }
    }
    return defaultValue;
  }
}
