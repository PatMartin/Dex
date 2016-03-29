def catIndex = 0

header << "CATEGORY"

def catMap = [:]
def numCats = 1;

data.eachWithIndex {
  row, ri ->
  if (!catMap[row[catIndex]])
  {
    catMap[row[catIndex]] = numCats
    numCats++
  }
  data[ri] << catMap[row[catIndex]] as String
}