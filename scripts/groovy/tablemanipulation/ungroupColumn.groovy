// Ungroup a column

// Target hierarchy
def hier = [ 'YEAR', 'COUNTRYCODE' ]
// Column to ungroup
def category = 'INDICATORCODE'
// Value to use for ungrouped column
def value = 'YEAR_VALUE'

def hi = hier.collect { dex.getColumnNumber(it) }
def ci = dex.getColumnNumber(category)
def vi = dex.getColumnNumber(value)

def entries = [:]
def categoryMap = [:]

// Ensure existence of hashes
data.eachWithIndex {
  row, ri ->
  
  def key = hi.collect { row[hi] }.join('::')
  def entry
  if (!entries[key]) {
    entry = [:]
    entries[key] = entry
  }
  else {
    entry = entries[key]
  }

  hi.each { entry[header[it]] = row[it] }
  entry[row[ci]] = row[vi]
  categoryMap[row[ci]] = 1;
}

def categories = categoryMap.collect { it.key }

def newHeader = []
def newData = []
newHeader = []
hier.each { newHeader.push(it) }
categories.each { newHeader.push(it) }
println newHeader

entries.each {
  k, v ->
  def row = []
  newHeader.each {
    h ->
    row << ((v[h]) ? v[h] : 0)
  }
  newData << row
}

header = newHeader
data = newData