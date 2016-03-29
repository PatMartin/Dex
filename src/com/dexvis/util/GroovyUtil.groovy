package com.dexvis.util

class GroovyUtil
{
  public static String removeAllChars(String str, String pattern, String replaceStr)
  {
    return (str =~ pattern).replaceAll(replaceStr)
  }

  public static void myFunction(closure)
  {
    println "Hello from myFunction"
    closure()
  }
  
  public static Object collectWithIndex(collection, closure)
  {
    def newCollection = []
    collection.eachWithIndex
    { it, i -> newCollection << closure(it, i) }
    return newCollection
  }

  public static Map<String, List<String>> csvToMap(header, data)
  {
    def map = [:]
    header.each
    { map[it] = []}
    data.each
    { row ->
      row.eachWithIndex
      { it, i -> map[header[i]] << it }
    }
    
    return map
  }

  public static void main(String[] args)
  {
    def list = [ [ "A" ], [ "B" ]]
    println list
    list << [ "C"] 
    println list
    myFunction { println "I just passed this function in" }
    
    def str = "abcdefghijklmnopqrstuvwxyz"
    def result = removeAllChars(str, "[aeiou]", "")
    println result

    result = collectWithIndex([1, 2, 3])
    { it, i -> it + i }

    println result

    def header = ( 'A' .. 'D' )
    def data = (1..4).collect
    {
      [
        it,
        it + 1,
        it + 2,
        it + 3
      ]
    }
    println header
    println data

    println csvToMap(header, data)

    java.util.Hashtable.metaClass.invokeMethod =
    { String name, htArgs ->
      println "Hashtable method invoked: $name with args $htArgs delegate ${delegate}"

      def validMethod = Hashtable.metaClass.getMetaMethod(name, htArgs)

      long startTime = System.currentTimeMillis()
      validMethod.invoke(delegate, htArgs)
      long endTime = System.currentTimeMillis()

      println "DURATION: ${endTime - startTime} ms"
    }

    // Print all methods
    //println Hashtable.metaClass.getMetaMethods().join("\n")

    Hashtable ht = new Hashtable()
    ht.put("FOO1", "BAR")
    ht.put("FOO2", "BAR")
    ht.put("FOO3", "BAR")
    
    println ht
    ht.get("FOO1")
  }
}
