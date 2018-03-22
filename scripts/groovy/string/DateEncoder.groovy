import com.dexvis.util.DateUtil
import smile.data.DateAttribute
import java.text.SimpleDateFormat
import java.util.Date

def types = dex.guessTypes()
def dateIndexes = types.findIndexValues{it == "date"}.collect{it as Integer}
def atts = new DateAttribute[dateIndexes.size()]
def fmts = new SimpleDateFormat[dateIndexes.size()]

// Create headers and initial attributes
dateIndexes.eachWithIndex {
  index, i ->
  String name = (header[index] + "_enc")
  header << name
  atts[i] = new DateAttribute(name)
  fmts[i] = DateUtil.guessFormat(dex.getColumn(index))
}

println "FORMATS: ${fmts.collect { it.toPattern()}}"

// Create data.
data.eachWithIndex {
  row, ri ->
  dateIndexes.eachWithIndex {
    index, i ->
      //println fmts[i].parse(row[index])
      data[ri] << "" + atts[i].valueOf(fmts[i].parse(row[index]))
  }
}