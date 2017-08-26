def numParts = data.collect {
  row -> return row[0].split('\\.').length
}.max();
header = ((1..numParts) as List).collect { return "NAME${it}" };
header << "VALUE";

def newData = [];

data.eachWithIndex {
  row, ri ->
  newRow = row[0].split('\\.') as List;
  for (i=newRow.size(); i<numParts; i++)
  {
    newRow << "";
  }
  newRow << row[1];
  newData << newRow;
}

println "NUM-PARTS: ${numParts}"

data = newData;