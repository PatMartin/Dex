// Store the initial time offset
timeOffset = Double.parseDouble(data[0][0])

header += header[0..10].collect{ it.toUpperCase() + "C" }

data.eachWithIndex
{
  row, i ->
  drow = row.collect { Double.parseDouble(it) }

  (timestampc, s0c, s1c, s0u, s1u, ec, eu, oc, ou, pc, pu) = drow[0..10]
  timestampc -= timeOffset

  // Calculate
  s0cc = s0c
  s1cc = s0cc+s0c
  s0uc = s0u
  s1uc = s0cc + s1u
  ecc = ec + s1cc
  euc = eu + s1cc
  occ = ecc + oc
  ouc = ecc + eu
  pcc = occ + pc
  puc = occ + pu

  [timestampc, s0cc, s1cc, s0uc, s1uc, ecc, euc, occ, ouc, pcc, puc].each { data[i] << it.toString() }
}