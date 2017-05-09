package com.dexvis.javafx.scene.control;

import java.io.File;
import java.util.List;
import java.util.Map;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.concurrent.Worker;
import javafx.concurrent.Worker.State;
import javafx.event.ActionEvent;
import javafx.geometry.Orientation;
import javafx.scene.Scene;
import javafx.scene.control.Accordion;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.control.SplitPane;
import javafx.scene.control.TextField;
import javafx.scene.control.TitledPane;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import org.apache.commons.io.FileUtils;
import org.tbee.javafx.scene.layout.MigPane;

public class JsonGuiApp extends Application
{
  private Stage stage = null;
  private WebView wv = new WebView();
  private WebEngine we = wv.getEngine();
  private JsonGuiPane jsonGui = null;
  
  public static void main(String[] args) throws Exception
  {
    launch(args);
  }
  
  public void start(Stage stage) throws Exception
  {
    this.stage = stage;
    
    // Main node, a splitter with the configuration on the left and
    // the web-view on the right.
    SplitPane rootNode = new SplitPane();
    
    // Give some instruction:
    we.loadContent(FileUtils.readFileToString(new File("resources/html/intro.html")));
    
    // Split vertically: 35% for config, 65% for web-view.
    rootNode.setDividerPositions(.35f);
    rootNode.setOrientation(Orientation.HORIZONTAL);
    
    // Use all available area.
    MigPane configPane = new MigPane("", "[grow]", "[grow][]");
    configPane.setStyle("-fx-background-color: white;");
    
    // Button for loading dynamic html configuration.
    Button loadHtmlButton = new Button("Load HTML");
    loadHtmlButton.setOnAction(action -> loadHtml(action));
    
    // Our dynamic json-driven GUI.
    jsonGui = new JsonGuiPane("", "[grow]", "[grow]");
    jsonGui.setStyle("-fx-background-color: white;");
    
    // Catch all JsonGui change events by calling the setValue
    // webview/javascript function to pass the setting back to the
    // current chart.
    jsonGui.addEventHandler(
        JsonGuiEvent.CHANGE_EVENT,
        event -> {
          we.executeScript("setValue(\"" + event.getPayload().getTarget()
              + "\",\"" + event.getPayload().getValue() + "\");");
        });
    
    // Use all available space for the gui
    configPane.add(jsonGui, "grow,span");
    // Place the load button at the bottom. Grow and span horizontally.
    configPane.add(loadHtmlButton, "growx,span");
    
    // Add the config pane and webview to the root node splitter.
    rootNode.getItems().addAll(configPane, wv);
    
    // Create the scene with default 1000w x 800h dimensions
    Scene scene = new Scene(rootNode, 1000, 800);
    
    // When the web-engine loads a document, get the dynamic json
    // driven configuration via a call to the javascript defined
    // function getGuiDefinition() which returns a string containing
    // the gui definition for our charts.
    we.getLoadWorker().stateProperty().addListener(new ChangeListener<State>()
    {
      public void changed(ObservableValue ov, State oldState, State newState)
      {
        if (newState == Worker.State.SUCCEEDED)
        {
          String guiDefinition = (String) we
              .executeScript("getGuiDefinition();");
          jsonGui.setGuiDefinition(guiDefinition);
        }
      }
    });

    // Set the title, scene and show the stage.
    stage.setTitle("Data Driven GUI Demo");
    stage.setScene(scene);
    stage.show();
  }
  
  /**
   * 
   * Select and load an HTML file.
   * 
   * @param action Button action event triggering the display of
   * the HTML file chooser.
   * 
   */
  private void loadHtml(ActionEvent action)
  {
    FileChooser fileChooser = new FileChooser();
    try
    {
      fileChooser.setInitialDirectory(new File("resources/html"));
      fileChooser.setTitle("Open Resource File");
      File loadFile = fileChooser.showOpenDialog(stage);
      String contents = FileUtils.readFileToString(loadFile);
      // System.out.println("CONTENTS" + contents);
      we.loadContent(contents);
    }
    catch(Exception ex)
    {
    }
  }
}