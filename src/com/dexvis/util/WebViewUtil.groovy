package com.dexvis.util

import groovy.text.SimpleTemplateEngine
import javafx.scene.web.WebEngine

import org.apache.commons.io.FileUtils

class WebViewUtil {
  public static void displayGroovyTemplate(WebEngine we, String templatePath, Map<String, Object> bindings) {
    String templateCode = FileUtils.readFileToString(new File(templatePath));
    def engine = new SimpleTemplateEngine()
    String template = engine.createTemplate(templateCode).make(bindings).toString()

    we?.loadContent(template)
  }
  
  public static void displayMessage(WebEngine we, String message)
  {
    we?.loadContent(message)
  }
  
  public static void noData(WebEngine we)
  {
    we?.loadContent("<div style='height:100%;width:100%;display:flex;align-items:center;" +
      "justify-content:center;'><h1 style='text-align:center;width:100%;" +
      "background:#428bca;color:white;'>No Data</h1></div>");
  }
}