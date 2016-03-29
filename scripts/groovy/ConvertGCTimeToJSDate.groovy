import java.text.SimpleDateFormat
import java.util.Date

SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss")

data.eachWithIndex {
  row, ri ->

  long timestamp = ((row[0] as Double) * 1000) as Long
  Date date = (new Date(timestamp));
  data[ri][0] = df.format(date);
}