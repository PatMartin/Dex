import org.apache.commons.math3.stat.regression.SimpleRegression;

// Store the initial time offset
timeOffset = Double.parseDouble(data[0][0])

header += header[0..10].collect{ it.toUpperCase() + "C" }
header.addAll("PUR", "OUR", "FG_PER_HOUR", "YG_PER_HOUR", "FGC_SEC_PER_HOUR", "YGC_SEC_PER_HOUR", "REGRESSION_EUC", "REGRESSION_OUC", "REGRESSION_PUC")

euRegression = new SimpleRegression()
ouRegression = new SimpleRegression()
puRegression = new SimpleRegression()

data.eachWithIndex
{
  row, i ->
  drow = row.collect { Double.parseDouble(it) }

  (timestamp, s0c, s1c, s0u, s1u, ec, eu, oc, ou, pc, pu, ygc, ygct, fgc, fgct) = drow[0..14]
  timestampc = timestamp - timeOffset

  // Calculate
  s0cc = s0c
  s1cc = s0cc+s0c
  s0uc = s0u
  s1uc = s0cc + s1u
  ecc = ec + s1cc
  euc = eu + s1cc
  occ = ecc + oc
  ouc = ecc + ou
  pcc = occ + pc
  puc = occ + pu
  pur = pu / pc
  our = ou / oc
  fgcrate = ((timestamp == 0) ? 0 : (fgc / timestamp)) * 3600
  ygcrate = ((timestamp == 0) ? 0 : (ygc / timestamp)) * 3600

  fgperhour = ((timestamp == 0) ? 0 : (fgct / timestamp)) * 3600
  ygperhour = ((timestamp == 0) ? 0 : (ygct / timestamp)) * 3600

  [timestampc, s0cc, s1cc, s0uc, s1uc, ecc, euc, occ, ouc, pcc, puc, pur, our, fgcrate, ygcrate, fgperhour, ygperhour].each { data[i] << it.toString() }
  euRegression.addData(timestampc, euc)
  ouRegression.addData(timestampc, ouc)
  puRegression.addData(timestampc, puc)
}

data.eachWithIndex
{
  row, i ->
  data[i] << euRegression.slope * Double.parseDouble(row[16]) + euRegression.intercept
  data[i] << ouRegression.slope * Double.parseDouble(row[16]) + ouRegression.intercept
  data[i] << puRegression.slope * Double.parseDouble(row[16]) + puRegression.intercept
}