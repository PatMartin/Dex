package example;

import javafx.application.Application;
import javafx.beans.InvalidationListener;
import javafx.beans.Observable;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.Node;
import javafx.scene.PerspectiveCamera;
import javafx.scene.Scene;
import javafx.scene.chart.PieChart;
import javafx.scene.layout.Region;
import javafx.scene.layout.StackPane;
import javafx.scene.transform.Rotate;
import javafx.stage.Stage;

import java.util.Set;

// creates a 3d looking pie chart.
public class FatPieChart extends Application
{
  public static final int    GIRTH = 25;
  public static final String TITLE = "Sales per Employee for Year 1996";

  public static void main(String[] args)
  {
    launch(args);
  }

  @Override
  public void start(Stage stage)
  {
    stage.setTitle(TITLE);

    // create a stack of charts with the main chart on top.
    final PieChart chart = new PieChart(getData());
    PieChart[] fatBack = new PieChart[GIRTH];
    for (int i = 0; i < fatBack.length; i++)
    {
      fatBack[GIRTH - (i + 1)] = makeFatBack();
    }
    chart.setTitle(TITLE);

    // layout the scene as a large stack of charts.
    final StackPane fatPieChart = new StackPane();
    fatPieChart.getChildren().addAll(fatBack);
    fatPieChart.getChildren().add(chart);

    // show the scene.
    StackPane layout = new StackPane();
    layout.setStyle("-fx-background-color: cornsilk; -fx-padding: 30");
    layout.getChildren().add(fatPieChart);
    final Scene scene = new Scene(layout, 700, 625);
    scene.setCamera(new PerspectiveCamera());
    stage.setScene(scene);
    stage.show();

    // rotate a stack of charts to give a 3d back effect.
    for (int i = 0; i < fatBack.length; i++)
    {
      rotateBack(fatBack[i], GIRTH - i);
    }

    // rotate top chart and labels.
    final Region chartContent = (Region) chart.lookup(".chart-content");
    chartContent.setRotationAxis(Rotate.X_AXIS);
    chartContent.setRotate(-65);

    // adjust the lower text tabs so that they look better and don't overflow.
    for (final Node text : chartContent.lookupAll("Text"))
    {
      text.setStyle("-fx-font-size: 18;");
      hideLower(text);
    }

    // adjust the chart-pie-label-line color to make it stand out more.
    chartContent.lookup(".chart-pie-label-line").setStyle(
        "-fx-stroke: dimgray;");

    // adjust the title and legend positions.
    chart.lookup("Label.chart-title").translateYProperty()
        .bind(chartContent.heightProperty().divide(5.2));
    chart.lookup(".chart-legend").translateYProperty()
        .bind(chartContent.heightProperty().divide(-11.5));
    fatPieChart.translateYProperty().bind(
        chartContent.heightProperty().divide(-10));
  }

  // hide the node if it is in the lower half of the chart.
  private void hideLower(Node node)
  {
    final double my = node.getBoundsInParent().getMinY();
    final double cy = ((Region) node.getParent()).getHeight() / 2;
    if (my > cy)
    {
      makeTrulyInvisible(node);
    }
  }

  // hide the node if it is in the upper half of the chart.
  private void hideUpper(Node node)
  {
    final double my = node.getBoundsInParent().getMinY();
    final double cy = ((Region) node.getParent()).getHeight() / 2;
    if (my <= cy)
    {
      makeTrulyInvisible(node);
    }
  }

  // rotate a backing part of a pie chart stack.
  private void rotateBack(PieChart chart, int i)
  {
    // remove the stuff we don't need.
    makeTrulyInvisible(chart.lookup(".chart-title"));
    makeTrulyInvisible(chart.lookup(".chart-legend"));

    // position the chart.
    final Region chartBackContent = (Region) chart.lookup(".chart-content");
    chartBackContent.setRotationAxis(Rotate.X_AXIS);
    chartBackContent.setRotate(-65);
    chartBackContent.setTranslateY(i + 1);

    // we only want labels for the the chart on the bottom of the stack.
    Set<Node> chartBackText = chartBackContent.lookupAll("Text");
    for (final Node text : chartBackText)
    {
      text.setStyle("-fx-font-size: 18;");
      if (i + 1 != GIRTH)
      {
        makeTrulyInvisible(text);
      }
      else
      {
        hideUpper(text);
      }
    }
  }

  // ensure that what is hidden, remains hidden.
  private void makeTrulyInvisible(final Node text)
  {
    text.setVisible(false);
    text.visibleProperty().addListener(new InvalidationListener()
    {
      @Override
      public void invalidated(Observable observable)
      {
        text.setVisible(false);
      }
    });
  }

  // construct a pie chart to put in the fat stack.
  private PieChart makeFatBack()
  {
    final PieChart chartBack = new PieChart(getData());
    chartBack.setTitle(TITLE);
    return chartBack;
  }

  // get the pie chart data.
  private ObservableList<PieChart.Data> getData()
  {
    return FXCollections.observableArrayList(new PieChart.Data(
        "Leverling, $100,524", 100524), new PieChart.Data("Fuller, $87,790",
        87790), new PieChart.Data("Davolio, $81,898", 81898),
        new PieChart.Data("Peacock, $76,438", 76438), new PieChart.Data(
            "King, $57,430", 57430), new PieChart.Data("Callahan, $55,091",
            55091), new PieChart.Data("Dosworth, $43,962", 43962),
        new PieChart.Data("Suyama, $22,474", 22474), new PieChart.Data(
            "Buchanan, $21,637", 21637));
  }
}