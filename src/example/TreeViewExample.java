package example;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TreeItem;
import javafx.scene.control.TreeView;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class TreeViewExample extends Application
{
  @Override
  public void start(Stage primaryStage)
  {
    final String duckLabelText = "Selected Tree Item From Duck Tree: \n";
    final String royalLabelText = "Selected Tree Item From Royal Tree: \n";
    // Use HBOX and VBOX layout panes to space out the controls
    // in a single row
    HBox treeBox = new HBox();
    VBox labelBox = new VBox(30);
    HBox controlBox = new HBox(10);
    // Create labels to highlight the selected items from the TreeViews
    final Label duckLabel = new Label(duckLabelText);
    final Label royalLabel = new Label(royalLabelText);
    // Create and empty TreeView
    TreeView<String> duckTree = new TreeView<String>();
    // Create a TreeItem that will act as the root item of the TreeView
    TreeItem<String> duckRoot = new TreeItem<String>("Della Duck - Donald Duck");
    // Add TreeItems to the root
    duckRoot.getChildren().addAll(new TreeItem<String>("Huey Duck"),
        new TreeItem<String>("Dewey Duck"), new TreeItem<String>("Louie Duck"));
    // Use the setRoot method to set the root TreeItem
    // duckTree.setRoot(duckRoot);
    // Set a ChangeListener to handle events that occur with a Treeitem
    // is selected
    duckTree.getSelectionModel().selectedItemProperty()
        .addListener(new ChangeListener<TreeItem<String>>()
        {
          public void changed(
              ObservableValue<? extends TreeItem<String>> observableValue,
              TreeItem<String> oldItem, TreeItem<String> newItem)
          {
            duckLabel.setText(duckLabelText + newItem.getValue());
          }
        });
    // Create TreeItems for the Hierarchy of the TreeView
    TreeItem<String> royalRoot = new TreeItem<String>(
        "Queen Elizabeth - Prince Philip");
    TreeItem<String> Charlie = new TreeItem<String>(
        "Prince Charles - Princess Diana");
    TreeItem<String> Annie = new TreeItem<String>(
        "Princess Anne - Mark Phillips");
    TreeItem<String> Andy = new TreeItem<String>(
        "Prince Andrew - Sarah Ferguson");
    TreeItem<String> Eddie = new TreeItem<String>("Prince Edward - Sophie");
    // Populate the TreeItem to be used as the root with the other TreeItems
    royalRoot.getChildren().addAll(Charlie, Annie, Andy, Eddie);
    // Create a TreeView using the root TreeItem
    TreeView<String> royalTree = new TreeView<String>(royalRoot);
    // Populate the other TreeItems with more TreeItems
    // to build the family tree
    Charlie.getChildren().addAll(new TreeItem<String>("Prince William"),
        new TreeItem<String>("Prince Henry"));
    Annie.getChildren().addAll(new TreeItem<String>("Peter Phillips"),
        new TreeItem<String>("Zara Phillips"));
    Andy.getChildren().addAll(new TreeItem<String>("Princess Beatrice"),
        new TreeItem<String>("Princess Eugenie"));
    Eddie.getChildren().addAll(new TreeItem<String>("Lady Louise"),
        new TreeItem<String>("Viscount Severn"));
    // Set a ChangeListener to handle events that occur with a Treeitem
    // is selected
    // royalTree.getSelectionModel().selectedItemProperty().addListener( new
    // ChangeListener<TreeItem <String>>() { public void
    // changed(ObservableValue<? extends TreeItem<String>> observableValue,
    // TreeItem<String> oldItem, TreeItem<String> newItem) {
    // royalLabel.setText(royalLabelText + newItem.getValue()); } });
    // Add the TreeViews to the HBox
    treeBox.getChildren().add(duckTree);
    treeBox.getChildren().add(royalTree);
    // Add the labels to the VBox
    labelBox.getChildren().add(duckLabel);
    labelBox.getChildren().add(royalLabel);
    // Add the HBox and VBox to another HBox to
    // position the layout panes
    controlBox.getChildren().add(treeBox);
    controlBox.getChildren().add(labelBox);
    // Add the main HBOX layout pane to the scene
    Scene scene = new Scene(controlBox, 800, 250);
    // Show the form
    primaryStage.setTitle("Hello World!");
    primaryStage.setScene(scene);
    primaryStage.show();
  }

  /** * @param args the command line arguments */

  public static void main(String[] args)
  {
    launch(args);
  }
}