import java.util.jar.JarFile
import java.util.jar.Manifest

JarFile jarFile = new JarFile(new File("C:/Data/eclipse/ws/DataExplorer/JfxDataExplorer/lib/hsqldb.jar"))

Manifest manifest = jarFile.getManifest()

// List the classes:
jarFile?.entries().each
{ entry -> println "ENTRY: $entry" }
