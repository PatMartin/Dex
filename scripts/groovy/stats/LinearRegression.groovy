import org.apache.commons.math3.stat.regression.SimpleRegression;

def XNAME = "X"
def YNAME = "Y"
def DESTNAME = "REGRESSION"

def xColNum = dex.getColumnNumber(XNAME)
def yColNum = dex.getColumnNumber(YNAME)

header << DESTNAME

regression = new SimpleRegression()

data.each
{
  row -> regression.addData(Double.parseDouble(row[xColNum]), Double.parseDouble(row[yColNum]))
}

data.eachWithIndex
{
  row, i -> data[i] << regression.slope * Double.parseDouble(row[xColNum]) + regression.intercept
}