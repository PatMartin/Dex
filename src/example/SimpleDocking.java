package example;
import javafx.application.Application;
import javafx.geometry.Orientation;
import javafx.scene.*;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.*;

public class SimpleDocking extends Application {
    public void start(final Stage stage) throws Exception {
        final SplitPane rootPane = new SplitPane();
        rootPane.setOrientation(Orientation.VERTICAL);

        final FlowPane dockedArea = new FlowPane();
        dockedArea.getChildren().add(new Label("Some docked content"));

        final FlowPane centerArea = new FlowPane();
        final Button undockButton = new Button("Undock");
        centerArea.getChildren().add(undockButton);

        rootPane.getItems().addAll(centerArea, dockedArea);

        stage.setScene(new Scene(rootPane, 300, 300));
        stage.show();

        final Dialog dialog = new Dialog(stage);
        undockButton.disableProperty().bind(dialog.showingProperty());
        undockButton.setOnAction(actionEvent -> {
            rootPane.getItems().remove(dockedArea);

            dialog.setOnHidden(windowEvent -> {
                rootPane.getItems().add(dockedArea);
            });
            dialog.setContent(dockedArea);
            dialog.show(stage);
        });
    }

    private class Dialog extends Popup {
        private BorderPane root;

        private Dialog(Window parent) {
            root = new BorderPane();
            root.setPrefSize(200, 200);
            root.setStyle("-fx-border-width: 1; -fx-border-color: gray");
            root.setTop(buildTitleBar());
            setX(parent.getX() + 50);
            setY(parent.getY() + 50);
            getContent().add(root);
        }

        public void setContent(Node content) {
            root.setCenter(content);
        }

        private Node buildTitleBar() {
            BorderPane pane = new BorderPane();
            pane.setStyle("-fx-background-color: burlywood; -fx-padding: 5");

            final Delta dragDelta = new Delta();
            pane.setOnMousePressed(mouseEvent -> {
                dragDelta.x = getX() - mouseEvent.getScreenX();
                dragDelta.y = getY() - mouseEvent.getScreenY();
            });
            pane.setOnMouseDragged(mouseEvent -> {
                setX(mouseEvent.getScreenX() + dragDelta.x);
                setY(mouseEvent.getScreenY() + dragDelta.y);
            });

            Label title = new Label("My Dialog");
            title.setStyle("-fx-text-fill: midnightblue;");
            pane.setLeft(title);

            Button closeButton = new Button("X");
            closeButton.setOnAction(actionEvent -> hide());
            pane.setRight(closeButton);

            return pane;
        }
    }

    private static class Delta {
        double x, y;
    }

    public static void main(String[] args) throws Exception {
        launch(args);
    }
}