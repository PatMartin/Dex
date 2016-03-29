package com.dexvis.dex;

import java.io.Serializable;

import javafx.scene.Node;
import javafx.scene.image.Image;
import javafx.stage.Stage;

import com.dexvis.dex.exception.DexException;

public interface DataFilter extends Serializable, Comparable
{
  public DexData initialize(DexData data) throws DexException;
  
  public DexData process(DexData data) throws DexException;
  
  public String getCategory();
  
  public String getName();
  
  public void setName(String name);
  
  public Node getHelp();
  
  public Node getConfig();
  
  public Image getImage();
  
  public Stage getStage();
  
  public void setStage(Stage stage);
}
