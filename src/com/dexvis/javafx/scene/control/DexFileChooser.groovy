package com.dexvis.javafx.scene.control

import javafx.event.ActionEvent
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.stage.FileChooser
import javafx.stage.FileChooser.ExtensionFilter

import com.dexvis.dex.wf.DexEnvironment


class DexFileChooser {
  private String startDir
  private String loadTitle
  private String saveTitle
  private String filterName
  private String ext
  private String lastDir = null;
  private TextField fileText = null;
  
  public DexFileChooser(String startDir, String loadTitle, String saveTitle, String filterName,
  String ext) {
    this.startDir = startDir
    this.loadTitle = loadTitle
    this.saveTitle = saveTitle
    this.filterName = filterName
    this.ext = ext
  }
  
  public DexFileChooser(String startDir, String loadTitle, String saveTitle, String filterName,
  String ext, TextField fileText) {
    this.startDir = startDir
    this.loadTitle = loadTitle
    this.saveTitle = saveTitle
    this.filterName = filterName
    this.ext = ext
    this.fileText = fileText
  }
  
  public File load(ActionEvent evt) {
    try {
      FileChooser fc = new FileChooser()
      fc.setTitle(loadTitle)
      
      File startDirFile = new File(new File(startDir).getCanonicalPath())
      fc.setInitialDirectory(startDirFile)
      fc.getExtensionFilters().addAll(new ExtensionFilter(filterName, "*." + ext))
      
      File loadFile
      
      try {
        loadFile = fc.showOpenDialog(null)
      }
      catch (Exception iex) {
        startDir = System.getProperty("user.dir")
        //println "Opening: $startDir"
        fc.setInitialDirectory(new File(startDir))
        loadFile = fc.showOpenDialog(null)
      }
      
      if (loadFile != null) {
        startDir = loadFile.getParent()
      }
      
      return loadFile
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
  
  public void setTextPath(ActionEvent evt) {
    try {
      FileChooser fc = new FileChooser()
      fc.setTitle(loadTitle)
      File startDirFile
      
      try {
        if (lastDir != null && lastDir.length() > 0) {
          startDirFile = new File(new File(lastDir).getCanonicalPath())
        }
        else if (startDir != null && startDir.length() > 0) {
          startDirFile = new File(new File(startDir).getCanonicalPath())
        }
        else {
          startDirFile = new File(System.getProperty("user.dir"))
        }
      }
      catch (Exception ex) {
        startDirFile = new File(System.getProperty("user.dir"))
      }
      fc.setInitialDirectory(startDirFile)
      fc.getExtensionFilters().addAll(new ExtensionFilter(filterName, "*." + ext))
      
      File loadFile = fc.showOpenDialog(null)
      
      if (loadFile != null) {
        startDir = loadFile.getParent()
        
        String filePath = loadFile.getAbsolutePath()
        String userDir = System.getProperty("user.dir")
        
        if (userDir != null && userDir.length() > 0 && filePath.startsWith(userDir)) {
          // Including the file separator.
          filePath = filePath.substring(userDir.length() + File.separator.length());
        }
        
        fileText?.textProperty()?.setValue(filePath)
        
        lastDir = loadFile.getParent()
      }
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
  
  public File save(ActionEvent evt) {
    try {
      FileChooser fc = new FileChooser()
      fc.setTitle(saveTitle)
      
      File startDirFile = new File(new File(startDir).getCanonicalPath())
      fc.setInitialDirectory(startDirFile)
      fc.getExtensionFilters().addAll(new ExtensionFilter(filterName, "*." + ext))
      
      File saveFile = fc.showSaveDialog(null)
      
      if (saveFile != null) {
        if (!saveFile.getCanonicalPath().endsWith("." + ext)) {
          saveFile = new File(saveFile.getCanonicalPath() + "." + ext)
        }
        
        startDir = saveFile.getParent()
      }
      return saveFile
    }
    catch(Exception ex) {
      ex.printStackTrace()
    }
  }
}
