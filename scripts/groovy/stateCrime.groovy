def states = dex.getColumn("State").unique()
def crimes = dex.getColumn("Crime").unique()
def crimeTypes = dex.getColumn("Type of Crime").unique()
def years = dex.getColumn("Year").unique()

def yearMap = [:]

years.each
{
  year ->
  stateMap = [:]
  states.each
  {
    state ->
    crimeMap = [:]
    stateMap[state] = crimeMap
  }
  yearMap[year] = stateMap
}

data.each
{
  row ->
  (state, type, crime, year, count) = row

  yearMap[year][state][crime] = count
}

newData = []
newHeader = [ "YEAR" ]

def headerSet = false

yearMap.keySet().sort().each
{
  year ->
  stateMap = yearMap.get(year)
  def newRow = [ year ]
  stateMap.keySet().sort().each
  {
    state ->
    crimeMap = stateMap.get(state)
    crimeMap.keySet().sort().each
    {
      crime ->
      if (!headerSet)
      {
        newHeader << "$state.$crime"
      }
    }
  }
}

header = newHeader
data = newData