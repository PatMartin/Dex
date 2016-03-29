def jarMap = [:]

data.eachWithIndex

{
  row, ri ->
  (jar, defJar, dependency) = row

  //println dependency
  if (!jarMap.containsKey(dependency))
  {
    jarMap[dependency] = [:]
  }
  if (!jarMap[dependency].containsKey(defJar))

  {
    jarMap[dependency][defJar] = 0
  }
  jarMap[dependency][defJar]++
}

header = [ "DEPENDENCY", "COLLIDING JARS" ]
data = []

def collisions = [:]

jarMap.each
{
  dependency, defJarMap ->
  if (defJarMap.size() > 1)
  {
    data << [ dependency, defJarMap.keySet().sort().join(",") ]
  }
}

