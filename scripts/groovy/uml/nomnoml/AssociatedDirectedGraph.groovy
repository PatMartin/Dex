def newData = []

data.eachWithIndex {
  row, ri ->
  newData << [ "[${row[0]}] ${row[2]} -> [${row[1]}]" ]
}

header = [ "cmd" ]
data = newData;