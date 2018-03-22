import smile.data.StringAttribute

def types = dex.guessTypes()
def stringIndexes = types.findIndexValues{it == "string"}.collect{it as Integer}
def atts = new StringAttribute[stringIndexes.size()]

// Create headers and initial attributes
stringIndexes.eachWithIndex {
  index, i ->
  String name = (header[index] + "_enc")
  header << name
  atts[i] = new StringAttribute(name)
}

// Create data.
data.eachWithIndex {
  row, ri ->
  stringIndexes.eachWithIndex {
    index, i ->
      data[ri] << "" + atts[i].valueOf(row[index])
  }
}