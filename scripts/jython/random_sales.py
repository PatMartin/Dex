from java.util import Random

rand = Random()

header = [ 'MONTH', 'SALES', 'OVERHEAD', 'REVENUE', 'PROFIT' ]
data = [ ]
for month in ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']:
  data.append([ month, rand.nextInt(1000), rand.nextInt(1000), rand.nextInt(1000), rand.nextInt(1000) ])