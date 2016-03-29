import org.apache.commons.math3.stat.regression.SimpleRegression;

def xColNum = dex.getColumnNumber("Timestamp")
def yColNum = dex.getColumnNumber("EU")

header << "R_EU"

regression = new SimpleRegression()

data.each
{
  row -> regression.addData(Double.parseDouble(row[xColNum]), Double.parseDouble(row[yColNum]))
}

println regression.intercept
println regression.slope
println regression.slopeStdErr

data.eachWithIndex
{
  row, i -> data[i] << regression.slope * Double.parseDouble(row[xColNum]) + regression.intercept
}