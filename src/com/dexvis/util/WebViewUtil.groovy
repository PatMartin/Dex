package com.dexvis.util

import groovy.text.StreamingTemplateEngine;
import javafx.scene.web.WebEngine

import org.apache.commons.io.FileUtils

class WebViewUtil {
  public static void displayGroovyTemplate(WebEngine we, String templatePath, Map<String, Object> bindings) {
    String templateCode = FileUtils.readFileToString(new File(templatePath));
    def engine = StreamingTemplateEngine()
    String template = engine.createTemplate(templateCode).make(bindings).toString()

    we?.loadContent(template)
  }
  
  public static void displayMessage(WebEngine we, String message)
  {
    we?.loadContent("<h1>$message</h1>")
  }
}