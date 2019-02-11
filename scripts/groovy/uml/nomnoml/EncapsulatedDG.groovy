def newData = []

newData << [ "#direction: right" ]

def cat = [:]

data.eachWithIndex {
  row, ri ->

  if (!cat[row[0]]) {
    cat[row[0]] = []
  }
  cat[row[0]] << "[${row[1]}] -> [${row[2]}]"
}

cat.each {
  key, value ->
  newData << [ "[${key}|" ]
  value.each {
    v ->
    newData << [ v ]
  }
  newData << [ "]" ]
}

header = [ "cmd" ]
data = newData;