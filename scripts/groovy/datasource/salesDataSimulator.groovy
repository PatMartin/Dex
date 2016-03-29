import java.text.SimpleDateFormat
import java.util.Random;

def NUM_PRODUCTS = 1
def MIN_YEAR = 2012
def MAX_YEAR = 2012
def SALES_RANGE = [ "min" : 0.0, "max" : 1000.0 ]

header = [ "DATE", "PRODUCT", "SALES" ]
data = []

def rand = new Random()

(MIN_YEAR..MAX_YEAR).each
{
  year ->
  (0..11).each
  {
    month ->
    def date = new Date(year-1900, month, 1)
    def dateStr = new SimpleDateFormat("MMM-YYYY").format(date)
    (1..NUM_PRODUCTS).each
    {
      widgetNum ->
      data << [ dateStr, "Widget$widgetNum",
                sprintf("%.2f", rand.nextDouble() * (SALES_RANGE.max - SALES_RANGE.min) + SALES_RANGE.min)]
    }
  }
}