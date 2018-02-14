import org.apache.commons.math3.stat.regression.SimpleRegression;

////
//
// This is a reusable regression script which takes the following
// inputs:
//
// sequenceIndex   = The index to the time sequence across which we
//                   will be generating regresions.
// groupIndex      = A column to be used for grouping.  Each group gets
//                   it's own set of independent regressions applied.
// regressionSpecs = An array of maps containing regression specs of
//                   the form:
//                   regressions = [[
//                       name: 'DestinationColumnName',
//                       index: dex.getColumnNumber('SourceColumnName')
//                     ],
//                     ...
//                   ]
////
def sequenceIndex = dex.getColumnNumber('Year')
def groupIndex = dex.getColumnNumber('Geography')

def regressionSpecs = [
  [
    name: 'AIDS Rates Regression',
    index: dex.getColumnNumber('Rate')
  ],
  [
    name: 'AIDS Cases Regression',
    index: dex.getColumnNumber('Cases')
  ],
  [
    name: 'Population Regression',
    index: dex.getColumnNumber('Population')
  ]
]

def regressions = [:]

regressionSpecs.each {
  header += it.name
}


def groups = [:]
data.each {
  row ->
  groups[row[groupIndex]] = 1
}

groups.each {
  key, value ->
  regressions[key] = [:]
  regressionSpecs.each {
    spec ->
    regressions[key][header[spec.index]] = new SimpleRegression()
  }
}

data.each {
  row ->

  regressionSpecs.each {
    spec ->
    regressions[row[groupIndex]][header[spec.index]].addData(
      row[sequenceIndex] as Double, row[spec.index] as Double)
  }
}

data.eachWithIndex {
  row, ri ->

  regressionSpecs.each {
    spec ->
    data[ri] << regressions[row[groupIndex]][header[spec.index]].slope *
      (row[sequenceIndex] as Double) + regressions[row[groupIndex]][header[spec.index]].intercept
  }
}