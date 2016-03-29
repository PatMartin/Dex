package com.dexvis.javafx.scene.control;

import java.io.File;

import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.paint.Color;
import javafx.stage.DirectoryChooser;
import javafx.stage.Modality;
import javafx.stage.Stage;

import org.simpleframework.xml.Element;
import org.simpleframework.xml.Root;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;
import org.tbee.javafx.scene.layout.MigPane;

import com.dexvis.dex.Dex;
import com.dexvis.dex.DexMatcher;

@Root
public class DexOptions
{
  @Element(name = "datadir", required = false)
  private TextField dataDirTF = new TextField("data");
  
  public void initialize(final Stage stg, Dex dex)
  {
    MigPane root = new MigPane("", "[grow][grow][]", "[][][]");
    
    Button closeButton = new Button("Close");
    Button reloadCSSButton = new Button("Reload CSS");
    Button browseButton = new Button("Browse");
    Button saveOptsButton = new Button("Save Options");
    
    Label dataDirLabel = new Label("Data Directory");
    
    final Stage stage = new Stage();
    // Initialize the Stage with type of modal
    stage.initModality(Modality.APPLICATION_MODAL);
    // Set the owner of the Stage
    stage.initOwner(stg);
    stage.setTitle("General Options");
    
    root.add(dataDirLabel, "");
    root.add(dataDirTF, "grow");
    browseButton.setOnAction(action -> openDataDir());
    root.add(browseButton, "span");

    ////
    //
    //  TODO: Other configuration options:
    //
    //  CLASSPATH
    //  ENV VARIABLES
    //
    ////
    
    reloadCSSButton.setOnAction(action -> dex.reloadStylesheets());
    root.add(reloadCSSButton, "grow, span");
    
    closeButton.setOnAction(action -> stage.hide());
    root.add(closeButton, "grow");
    
    saveOptsButton.setOnAction(action -> saveOptions());
    root.add(saveOptsButton, "span");
    
    Scene scene = new Scene(root, Color.LIGHTBLUE);// root, 300, 250,
                                                   // Color.LIGHTGRAY);
    stage.setScene(scene);
    stage.show();
  }
  
  public void saveOptions()
  {
    File optionsFile = new File("dex_opts.xml");
    Serializer serializer = new Persister(new DexMatcher());
    try
    {
      serializer.write(this, optionsFile);
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
    }
  }
  
  public static DexOptions readOptions() throws Exception
  {
    Serializer serializer = new Persister(new DexMatcher());
    File optionsFile = new File("dex_opts.xml");
    DexOptions options = serializer.read(DexOptions.class, optionsFile);
    
    return options;
  }
  
  public void openDataDir()
  {
    try
    {
      DirectoryChooser dc = new DirectoryChooser();
      dc.setTitle("Find Data Directory");
      
      File startDir;
      
      try
      {
        startDir = new File(new File("data").getCanonicalPath());
      }
      catch(Exception ex)
      {
        startDir = new File(new File("data").getCanonicalPath());
      }
      
      dc.setInitialDirectory(startDir);
      
      File ddirFile = dc.showDialog(null);
      
      if (ddirFile != null)
      {
        dataDirTF.setText(ddirFile.getAbsolutePath());
      }
    }
    catch(Exception ex)
    {
      ex.printStackTrace();
    }
  }
}
