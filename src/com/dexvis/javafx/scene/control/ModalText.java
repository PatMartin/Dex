package com.dexvis.javafx.scene.control;

import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyCode;
import javafx.scene.paint.Color;
import javafx.stage.Modality;
import javafx.stage.Stage;

import org.tbee.javafx.scene.layout.MigPane;

public class ModalText
{
  private Button okButton;
  private Button cancelButton;
  private TextField textEntry;

  public ModalText(final Stage stg, String title, String labelText,
      String initialText, final EventHandler<ActionEvent> okHandler)
  {
    MigPane root = new MigPane("", "[][grow]", "[][]");

    Label textLabel = new Label(labelText);
    textEntry = new TextField(initialText);
    okButton = new Button("Ok");
    cancelButton = new Button("Cancel");

    final Stage stage = new Stage();
    // Initialize the Stage with type of modal
    stage.initModality(Modality.APPLICATION_MODAL);
    // Set the owner of the Stage
    stage.initOwner(stg);
    stage.setTitle(title);
    // Group root = new Group();

    okButton.setOnAction((event) -> {
      stage.hide();
      okHandler.handle(event);
    });

    cancelButton.setOnAction((event) -> {
      stage.hide();
    });

    textEntry.setOnKeyPressed((event) -> {
      System.out.println("EVENT: " + event);
      if (event.getCode() == KeyCode.ENTER)
      {
        stage.hide();
        okHandler.handle(new ActionEvent());
      }
    });

    root.add(textLabel);
    root.add(textEntry, "grow, span");
    root.add(okButton);
    root.add(cancelButton);
    Scene scene = new Scene(root, 400, 100, Color.WHITE);
    stage.setScene(scene);
    stage.show();
  }

  public String getText()
  {
    return textEntry.getText();
  }
}
