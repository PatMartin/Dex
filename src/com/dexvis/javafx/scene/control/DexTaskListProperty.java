package com.dexvis.javafx.scene.control;

import java.util.Optional;

import org.controlsfx.property.editor.PropertyEditor;
import org.simpleframework.xml.Element;
import org.simpleframework.xml.Root;

import com.dexvis.dex.wf.DexTask;
import com.dexvis.javafx.editors.ChoiceBoxEditor;

@Root(name = "list-property")
public class DexTaskListProperty extends DexTaskProperty
{
  @Element(name = "selected", required = false)
  private Object selected;

  public DexTaskListProperty(DexTask task, String category, String name,
      String target, Object value, String description)
  {
    super(task, category, name, target, value, description);
  }

  public DexTaskListProperty(String category, String name, String target,
      Object value, String description)
  {
    super(category, name, target, value, description);
  }
  
  public void set(DexTaskListProperty property)
  {
    super.set(property);
  }

  @Override
  public Optional<Class<? extends PropertyEditor<?>>> getPropertyEditorClass()
  {
    return Optional.of(ChoiceBoxEditor.class);
  }
}
