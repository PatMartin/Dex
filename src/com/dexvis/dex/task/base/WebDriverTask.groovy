package com.dexvis.dex.task.base

import groovy.text.SimpleTemplateEngine
import javafx.event.ActionEvent
import javafx.scene.Node
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.RadioButton
import javafx.scene.control.TextField
import javafx.scene.control.ToggleGroup
import javafx.scene.image.Image
import javafx.scene.input.KeyCode
import javafx.scene.input.KeyEvent

import org.apache.commons.io.FileUtils
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions
import org.openqa.selenium.firefox.FirefoxDriver
import org.simpleframework.xml.Element
import org.simpleframework.xml.Root
import org.tbee.javafx.scene.layout.MigPane

import com.dexvis.dex.exception.DexException;
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState
import com.dexvis.javafx.event.ReflectiveActionEventHandler
import com.dexvis.javafx.event.ReflectiveKeyEventHandler
import com.dexvis.javafx.scene.control.DexFileChooser
import com.dexvis.javafx.scene.control.ModalDialog
import com.dexvis.javafx.scene.control.NodeFactory

/**
 * 
 * This task will add a column to the current table.
 * 
 * @author Patrick Martin
 *
 */
@Root
class WebDriverTask extends DexTask
{
  // Used to store our configuration pane.
  private MigPane configPane = null

  private Label templateLabel = new Label("Input Template:")

  @Element(required=false)
  private TextField templateText = new TextField()

  private Label outputLabel = new Label("Output File:")

  @Element(required=false)
  private TextField outputFileText = new TextField()

  private ToggleGroup browserGroup = new ToggleGroup()

  @Element(name="firefoxBrowser", required=false)
  private RadioButton firefoxRB = new RadioButton("Firefox")

  @Element(name="chromeBrowser", required=false)
  private RadioButton chromeRB = new RadioButton("Chrome")

  private String output = ""
  private static def drivers = [:]
  private static DexFileChooser templateChooser = null
  private static DexFileChooser htmlChooser = null

  /**
   * 
   * Override the default constructor to provide this component's name, category and help file.
   * Report that it has been constructed.
   * 
   */
  public WebDriverTask()
  {
    super("Web View", "Web Driver", "visualization/web_view/WebDriver.html")
    if (templateChooser == null)
    {
      templateChooser = new DexFileChooser("web",
          "Load Template", "Save HTML", "GTMPL", "gtmpl")
    }
    if (htmlChooser == null)
    {
      htmlChooser = new DexFileChooser("output",
          "Choose HTML", "Save HTML", "HTML", "html")
    }
  }

  public DexTaskState execute(DexTaskState state) throws DexException
  {
    println "Running: $name"
    WebDriver driver;

    try
    {
      driver = getDriver()
      def templateCode = new File(templateText.getText()).text
      def binding = [ "state":state, "dexData":state.dexData, "data":state.dexData.data, "header":state.dexData.header]

      def engine = new SimpleTemplateEngine()
      def template = engine.createTemplate(templateCode).make(binding)
      output = template.toString()

      String outputPath = outputFileText.getText()
      if (outputPath == null || outputPath.length() <= 0)
      {
        outputPath = "output.html"
      }

      FileUtils.writeStringToFile(new File(outputPath), output)

      try
      {
        driver.get(outputPath);
      }
      catch (Exception ex)
      {
        if (driver)
        {
          try
          {
            driver.quit()
          }
          catch (Exception iex)
          {
            iex.printStackTrace()
          }
        }
        if (chromeRB.isSelected())
        {
          drivers['chrome'] = null
        }
        else
        {
          drivers['firefox'] = null;
        }

        driver = getDriver()
        driver.get("error.html");
      }
    }
    catch(Exception ex)
    {
      StringWriter sw = new StringWriter()
      ex.printStackTrace(new PrintWriter(sw))
      ModalDialog dialog = new ModalDialog(stage, "Error", sw.toString(), "Ok")
      ex.printStackTrace()
    }

    return state
  }

  private WebDriver getDriver()
  {
    WebDriver driver
    String os = System.getProperty("os.name").toLowerCase()
    
    if (chromeRB.isSelected())
    {
      if (drivers.chrome)
      {
        driver = drivers.chrome
      }
      else
      {
        File executable
        // Windows --allow-file-access-from-files
        if (os.indexOf("win") >= 0)
        {
          executable = new File("util/chromedriver_win.exe")
        }
        else if (os.indexOf("linux") >= 0)
        {
          // 64 bit
          if (os.indexOf("64") >= 0)
          {
            executable = new File("util/chromedriver_linux64")
          }
          else // 32 bit
          {
            executable = new File("util/chromedriver_linux64")
          }
        }
        else if (os.indexOf("mac") >= 0)
        {
          executable = new File("util/chromedriver_mac")
        }
        // Try windows anyhow.
        else
        {
          executable = new File("util/chromedriver_win.exe")
        }

        System.setProperty("webdriver.chrome.driver", executable.getAbsolutePath())
        ChromeOptions options = new ChromeOptions()
        //ChromeOptions options - new ChromeOptions()
        options.addArguments("--allow-file-access-from-files")
        driver = new ChromeDriver(options)

        drivers.chrome = driver
      }
    }
    else // Default to Firefox
    {
      driver = (drivers.firefox) ? drivers.firefox : new FirefoxDriver()
      if (!drivers.firefox)
      {
        drivers.firefox = driver
      }
    }
    
    return driver
  }
  
  public Node getConfig()
  {
    if (configPane == null)
    {
      configPane = new MigPane("", "[][grow][]", "[][][]")
      configPane.setStyle("-fx-background-color: white;")

      Button chooseTemplateButton = new Button("Choose Template")
      chooseTemplateButton.setOnAction(new ReflectiveActionEventHandler(this, "chooseTemplate"))
      Button chooseOutputFileButton = new Button("Choose Output File")
      chooseOutputFileButton.setOnAction(new ReflectiveActionEventHandler(this, "chooseOutputFile"))

      Button saveButton = new Button("Save")
      saveButton.setOnAction(new ReflectiveActionEventHandler(this, "save"))

      firefoxRB.setToggleGroup(browserGroup)
      chromeRB.setToggleGroup(browserGroup)

      if (!browserGroup.getSelectedToggle())
      {
        firefoxRB.setSelected(true)
      }

      configPane.add(NodeFactory.createTitle("WebDriver Template"), "grow,span")
      configPane.add(templateLabel)
      configPane.add(templateText, "grow")
      configPane.add(chooseTemplateButton, "span")
      configPane.add(outputLabel)
      configPane.add(outputFileText, "grow")
      configPane.add(chooseOutputFileButton, "span")

      configPane.add(firefoxRB)
      configPane.add(chromeRB)
      configPane.add(saveButton, "span")

      configPane.setOnKeyPressed(new ReflectiveKeyEventHandler(this, "keyPress"));
    }

    return configPane
  }

  public chooseTemplate(ActionEvent evt)
  {
    try
    {
      templateText.setText(templateChooser.load(evt)?.getAbsolutePath())
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }

  public chooseOutputFile(ActionEvent evt)
  {
    try
    {
      outputFileText.setText(htmlChooser.load(evt)?.getAbsolutePath())
    }
    catch(Exception ex)
    {
      ex.printStackTrace()
    }
  }

  public save(ActionEvent evt)
  {
    // Do nothing for now.
  }

  public void keyPress(KeyEvent evt)
  {
    System.out.println("*** keypress: " + evt);

    if (evt.getCode().equals(KeyCode.S) && evt.isControlDown())
    {
      println "saving..."
      save(null);
      evt.consume()
    }
    //    else if (evt.getCode().equals(KeyCode.C) && evt.isAltDown())
    //    {
    //      println "Toggling configuration..."
    //      we.executeScript("toggleConfig();")
    //      evt.consume()
    //    }
    else
    {
      println "Ignoring keypress"
      evt.consume()
    }
  }
}
