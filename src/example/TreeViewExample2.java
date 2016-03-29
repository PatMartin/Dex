package example;

import java.util.Arrays;
import java.util.List;
import javafx.application.Application;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.TextField;
import javafx.scene.control.TreeCell;
import javafx.scene.control.TreeItem;
import javafx.scene.control.TreeView;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
import javafx.util.Callback;

import javafx.beans.property.SimpleStringProperty;
import javafx.scene.control.ContextMenu;
import javafx.scene.control.MenuItem;
import javafx.scene.layout.VBox;

public class TreeViewExample2 extends Application
{

  private final Node  rootIcon  = new ImageView(new Image(getClass()
                                    .getResourceAsStream("/resources/icons/folder.png")));
  private final Image depIcon   = new Image(getClass().getResourceAsStream(
                                    "/resources/icons/folder.png"));
  List<Employee>      employees = Arrays
                                    .<Employee> asList(
                                        new Employee("Ethan Williams",
                                            "Sales Department"),
                                        new Employee("Emma Jones",
                                            "Sales Department"),
                                        new Employee("Michael Brown",
                                            "Sales Department"),
                                        new Employee("Anna Black",
                                            "Sales Department"),
                                        new Employee("Rodger York",
                                            "Sales Department"),
                                        new Employee("Susan Collins",
                                            "Sales Department"),
                                        new Employee("Mike Graham",
                                            "IT Support"),
                                        new Employee("Judy Mayer", "IT Support"),
                                        new Employee("Gregory Smith",
                                            "IT Support"), new Employee(
                                            "Jacob Smith",
                                            "Accounts Department"),
                                        new Employee("Isabella Johnson",
                                            "Accounts Department"));
  TreeItem<String>    rootNode  = new TreeItem<String>(
                                    "MyCompany Human Resources", rootIcon);

  public static void main(String[] args)
  {
    Application.launch(args);
  }

  @Override
  public void start(Stage stage)
  {
    rootNode.setExpanded(true);
    for (Employee employee : employees)
    {
      TreeItem<String> empLeaf = new TreeItem<String>(employee.getName());
      boolean found = false;
      for (TreeItem<String> depNode : rootNode.getChildren())
      {
        if (depNode.getValue().contentEquals(employee.getDepartment()))
        {
          depNode.getChildren().add(empLeaf);
          found = true;
          break;
        }
      }
      if (!found)
      {
        TreeItem depNode = new TreeItem(employee.getDepartment(),
            new ImageView(depIcon));
        rootNode.getChildren().add(depNode);
        depNode.getChildren().add(empLeaf);
      }
    }

    stage.setTitle("Tree View Sample");
    VBox box = new VBox();
    final Scene scene = new Scene(box, 400, 300);
    scene.setFill(Color.LIGHTGRAY);

    TreeView<String> treeView = new TreeView<String>(rootNode);
    treeView.setShowRoot(true);
    treeView.setEditable(true);
    treeView.setCellFactory(new Callback<TreeView<String>, TreeCell<String>>()
    {
      @Override
      public TreeCell<String> call(TreeView<String> p)
      {
        return new TextFieldTreeCellImpl();
      }
    });

    box.getChildren().add(treeView);
    stage.setScene(scene);
    stage.show();
  }

  private final class TextFieldTreeCellImpl extends TreeCell<String>
  {

    private TextField   textField;
    private ContextMenu addMenu = new ContextMenu();

    public TextFieldTreeCellImpl()
    {
      MenuItem addMenuItem = new MenuItem("Add Employee");
      addMenu.getItems().add(addMenuItem);
      addMenuItem.setOnAction(new EventHandler()
      {
        public void handle(Event t)
        {
          TreeItem newEmployee = new TreeItem<String>("New Employee");
          getTreeItem().getChildren().add(newEmployee);
        }
      });
    }

    @Override
    public void startEdit()
    {
      super.startEdit();

      if (textField == null)
      {
        createTextField();
      }
      setText(null);
      setGraphic(textField);
      textField.selectAll();
    }

    @Override
    public void cancelEdit()
    {
      super.cancelEdit();

      setText((String) getItem());
      setGraphic(getTreeItem().getGraphic());
    }

    @Override
    public void updateItem(String item, boolean empty)
    {
      super.updateItem(item, empty);

      if (empty)
      {
        setText(null);
        setGraphic(null);
      }
      else
      {
        if (isEditing())
        {
          if (textField != null)
          {
            textField.setText(getString());
          }
          setText(null);
          setGraphic(textField);
        }
        else
        {
          setText(getString());
          setGraphic(getTreeItem().getGraphic());
          if (!getTreeItem().isLeaf() && getTreeItem().getParent() != null)
          {
            setContextMenu(addMenu);
          }
        }
      }
    }

    private void createTextField()
    {
      textField = new TextField(getString());
      textField.setOnKeyReleased(new EventHandler<KeyEvent>()
      {

        @Override
        public void handle(KeyEvent t)
        {
          if (t.getCode() == KeyCode.ENTER)
          {
            commitEdit(textField.getText());
          }
          else if (t.getCode() == KeyCode.ESCAPE)
          {
            cancelEdit();
          }
        }
      });

    }

    private String getString()
    {
      return getItem() == null ? "" : getItem().toString();
    }
  }

  public static class Employee
  {

    private final SimpleStringProperty name;
    private final SimpleStringProperty department;

    private Employee(String name, String department)
    {
      this.name = new SimpleStringProperty(name);
      this.department = new SimpleStringProperty(department);
    }

    public String getName()
    {
      return name.get();
    }

    public void setName(String fName)
    {
      name.set(fName);
    }

    public String getDepartment()
    {
      return department.get();
    }

    public void setDepartment(String fName)
    {
      department.set(fName);
    }
  }
}