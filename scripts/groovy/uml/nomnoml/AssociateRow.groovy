def newData = []

newData << [ "#direction: right" ]

data.eachWithIndex {
  row, ri ->
  for (int i=1; i<header.size(); i++) {
    newData << [ "[${row[i-1]}] -> [${row[i]}]" ]
  }
}

header = [ "cmd" ]
data = newData;