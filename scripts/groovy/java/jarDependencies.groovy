import java.util.jar.JarFile
import java.util.jar.Manifest
import org.apache.bcel.Repository
import org.apache.bcel.classfile.ConstantClass
import org.apache.bcel.classfile.ConstantPool
import org.apache.bcel.classfile.DescendingVisitor
import org.apache.bcel.classfile.EmptyVisitor
import org.apache.bcel.classfile.JavaClass
import org.apache.bcel.generic.Type
import org.apache.bcel.classfile.ConstantUtf8
import org.apache.bcel.util.ClassPath
import org.apache.bcel.util.SyntheticRepository

header = [
  "JAR",
  "DEPENDENCY",
  "DEFINING_JAR"
]
data = []

jarFiles =
      [
        "C:/Data/eclipse/ws/DataExplorer/JfxDataExplorer/lib/jdom-1.0.jar"
      ]

//ClassPath cp = new ClassPath(jarFiles.join(":"))
//SyntheticRepository repo = SyntheticRepository.getInstance(cp)
//Repository repo = new Repository()

classMap = [:]
depMap = [:]

jarFiles.each
{ jarPath ->

  jarMatch = ( jarPath =~ /([^\/]+)\.jar/)

  println "JARPATH: ${jarPath}"
  println "JARCLASS: ${jarMatch[0][0]}"
  jarClass = jarMatch[0][0]

  JarFile jarFile = new JarFile(new File(jarPath))

  // List the classes:
  jarFile?.entries().each
  {  classFile ->
    println "CLASSFILE: '${classFile}'"
    clazz = (classFile =~ /\//).replaceAll(".")
     if (clazz.endsWith(".class"))
     {
    println "CLAZZ: ${clazz}"

    clazz = (clazz =~ /\.class$/).replaceFirst("")
    println "CLASS: '${clazz}'"
    try
    {
      JavaClass javaClass = Repository.lookupClass(clazz)

      if (classMap.containsKey(clazz))
      {
        classMap.put(clazz, classMap.get(clazz) << jarClass)
      }
      else
      {
        classMap.put(clazz, [jarClass])
      }

      println "JAVA CLASS: ${javaClass}"
      println "CONSTANT POOL: ${javaClass.getConstantPool()}"
      javaClass?.getConstantPool()?.getConstantPool().each
      { c ->
        if (c instanceof ConstantClass)
        {
          println "CONSTANT: $c"
          ConstantClass cc = (ConstantClass) c
          ConstantUtf8 nameIndex = (ConstantUtf8) javaClass.getConstantPool().getConstant(cc.getNameIndex())
          m = (nameIndex.toString() =~ /\"(.*)\"/)
          String dep = (m[0][1] =~ /\//).replaceAll(".")
          //data << [ jarClass, clazz, dep ]

          if (depMap.containsKey(dep))
          {
            jarMap = depMap.get(dep)

            if (!jarMap.containsKey(jarClass))
            {
              jarMap.put(jarClass, jarClass)
            }
            //depMap.put(dep, depMap.get(dep) << jarMap)
          }
          else
          {
            jarMap = [jarClass : jarClass ]
            depMap.put(dep, jarMap)
          }
        }
      }
    }
    catch (Exception ex)
    {
    }
  }
  }
}

println "+++++++++++++++++++++"
println  classMap
println "+++++++ Dependency Map ++++++++++++++"
println  depMap

// Iterate over dependencies
depMap.each
{ // key = class, value = A map of jars
  depItem ->
  depItem.value?.each
  { // key = jar, value = jar
    jarItem ->
    depJar = jarItem.value.toString()
    println "${depJar} calls ${depItem.key}"
    if (classMap.containsKey(depItem.key))
    {
      println "DEFINED IN: ${classMap.get(depItem.key)}"
      classMap.get(depItem.key).each
      { classDef ->
        data << [
          depJar,
          depItem.key.toString(),
          classDef
        ]
      }
    }
    else
    {
      data << [
        depJar,
        depItem.key.toString(),
        "UNDEFINED"
      ]
    }
  }
}