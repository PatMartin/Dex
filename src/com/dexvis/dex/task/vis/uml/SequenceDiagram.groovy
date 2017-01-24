

package com.dexvis.dex.task.vis.uml

import java.nio.charset.Charset

import net.sourceforge.plantuml.FileFormat
import net.sourceforge.plantuml.FileFormatOption
import net.sourceforge.plantuml.SourceStringReader

import org.simpleframework.xml.Root

import com.dexvis.dex.task.base.WebTask
import com.dexvis.dex.wf.DexTaskState

@Root
class SequenceDiagram extends WebTask {
  public SequenceDiagram() {
    super("Visualization: UML", "Sequence Diagram",
    "visualization/uml/SequenceDiagram.html",
    "web/uml/Svg.gtmpl")
  }
  
  public Map getBinding(DexTaskState state) {
    
    String source = "@startuml\n";
    state.dexData.data.eachWithIndex { row, ri ->
      source += "\"${row[0]}\" -> \"${row[1]}\" : ${row[2]}\n"
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
