package com.dexvis.javafx.scene.control;

import javafx.event.Event;
import javafx.event.EventTarget;
import javafx.event.EventType;

/**
 * 
 * A custom event to house events for the JsonGuiPane.
 * 
 * @author Patrick Martin
 *
 */
public class JsonGuiEvent extends Event
{
  public static final EventType<JsonGuiEvent> ROOT_EVENT = new EventType<>(
      Event.ANY, "ROOT_EVENT");
  public static final EventType<JsonGuiEvent> CHANGE_EVENT = new EventType<>(
      ROOT_EVENT, "CHANGE ");
  
  private JsonGuiEventPayload payload = null;
  private static final long serialVersionUID = 1L;
  
  public JsonGuiEvent(Object source, EventTarget target,
      EventType<JsonGuiEvent> eventType)
  {
    super(source, target, eventType);
    payload = (JsonGuiEventPayload) source;
  }
  
  public JsonGuiEventPayload getPayload()
  {
    return payload;
  }
}
