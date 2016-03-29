def codeMap = [:]
data.each { row -> codeMap[row[0]] = row[0] }

newHeaders = [ header[1] ]

codeMap.each
{
  key, item ->
  header[2..(header.size()-1)].each { newHeaders << "$key.$it" }
}

yearMap = [:]

data.each
{
  row ->
  (code, year) = row[0,1]
  if (yearMap.containsKey(year))
  {
    statMap = yearMap.get(year)
  }
  else
  {
    statMap = [:]
    yearMap.put(year, statMap)
  }

  row[2..(row.size()-1)].eachWithIndex
  {
    stat, i ->
    statMap.put("$code.${header[i+2]}", stat)
  }

  println statMap
}

newData = []

yearMap.each
{
  year, statMap ->
  newRow = [ year ]
  newHeaders[1..(newHeaders.size()-1)].each
  {
    statName ->
    newRow << statMap.get(statName)
  }

  newData << newRow
}

data = newData  
header = newHeaders