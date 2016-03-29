dataMap = [:]
codeMap = [:]

data.each
{
  row ->
  (name, year, code, value) = row[3,4,0,5]
  if (dataMap.containsKey(name))
  {
    nameMap = dataMap.get(name)
  }
  else
  {
    nameMap = [:]
    dataMap.put(name, nameMap)
  }

  if (nameMap.containsKey(year))
  {
    yearMap = nameMap.get(year)
  }
  else
  {
    yearMap = [:]
    nameMap.put(year, yearMap)
  }

  codeMap.put(code, code)
  yearMap.put(code, value)
}

println dataMap
//header << seriesMap.keySet()

newData = []

dataMap.each
{
  name, yearMap ->
  yearMap.each
  {
    def newRow = [ name, year ]
    year, cm ->
    codeMap.each
    {
      code, value ->
      newRow << cm[code]
    }
    newData << newRow
  }
}

header = [ "NAME", "YEAR" ]
codeMap.each
{
  key, value -> header << key
}

data = newData