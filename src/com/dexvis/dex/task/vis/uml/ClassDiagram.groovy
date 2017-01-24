

package com.dexvis.dex.task.vis.uml

import java.nio.charset.Charset

import net.sourceforge.plantuml.FileFormat
import net.sourceforge.plantuml.FileFormatOption
import net.sourceforge.plantuml.SourceStringReader

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.dex.wf.DexTaskState

@Root
class ClassDiagram extends WebTask {
  public ClassDiagram() {
    super("Visualization: UML", "Class Diagram",
    "visualization/uml/ClassDiagram.html",
    "web/uml/Svg.gtmpl")
  }
  
  public Map getBinding(DexTaskState state) {

    def direction = [ "down", "left", "right", "up" ]
        
    def counter = [:]
    
    state.dexData.data.eachWithIndex { row, ri ->
      counter[row[1]] = 0;
    }
    
    String source = "@startuml\n";
    state.dexData.data.eachWithIndex { row, ri ->
      source += "\"${row[0]}\" -${direction[counter[row[1]]]}-|> \"${row[1]}\" : \"${row[2]}\"\n"
      counter[row[1]] = (counter[row[1]] + 1) % 4
    }
    
    source += "@enduml\n";
    
    println source
    
    SourceStringReader reader = new SourceStringReader(source);
    final ByteArrayOutputStream os = new ByteArrayOutputStream();
    // Write the first image to "os"
    String desc = reader.generateImage(os, new FileFormatOption(FileFormat.SVG));
    os.close();
    
    // The XML is stored into svg
    final String svg = new String(os.toByteArray(), Charset.forName("UTF-8"));
    
    def curDir = new File(".")
    
    return [
      "state":state,
      "dexData":state.dexData,
      "data":state.dexData.data,
      "header":state.dexData.header,
      "svg" : svg,
      "basedir" : curDir.toURI().toURL().toExternalForm()
    ]
  }
}
