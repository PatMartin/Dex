package com.dexvis.javafx.scene.control;

import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.paint.Color;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.stage.StageBuilder;

import org.tbee.javafx.scene.layout.MigPane;

public class ModalDialog
{
  Button btn;

  public ModalDialog(final Stage stg, String title, String message,
      String buttonText)
  {
    MigPane root = new MigPane("", "[grow]", "[grow][]");

    TextArea textArea = new TextArea(message);
    btn = new Button(buttonText);

    final Stage stage = StageBuilder.create().focused(true).title(title).height(400).width(600).resizable(true).build();

    // Initialize the Stage with type of modal
    stage.initModality(Modality.APPLICATION_MODAL);
    // Set the owner of the Stage
    stage.initOwner(stg);

    btn.setOnAction(new EventHandler<ActionEvent>()
    {
      public void handle(ActionEvent event)
      {
        stage.hide();
      }
    });

    root.add(textArea, "grow, span");
    root.add(btn);

    Scene scene = new Scene(root, Color.LIGHTBLUE);// root, 300, 250,
                                                   // Color.LIGHTGRAY);
    stage.setScene(scene);
    stage.show();
  }
}
