header = ["file", "num", "instances", "bytes", "classname"]

newData = []

//headerPattern = ~/^.*num.*instances.*bytes.*/
dataPattern = ~/^\s*(\d+):\s+(\d+)\s+(\d+)\s+(\S+.*)$/

data.eachWithIndex
{
  row, ri ->

  if (row[2] =~ dataPattern)
  {
    m = row[2] =~ dataPattern
    //println "DATA: ${row[1]}"
    ( all, num, instances, bytes, classname ) = m[0]
    
    newData << [ row[1], num, instances, bytes, classname ]
  }
  else
  {
    println "SKIP: ${row[2]}"
  }
}
                
data = newData



