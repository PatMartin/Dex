header = [ "x", "y" ]

int len = 20

Random rand = new Random()

(1..len).each { data << [ (it/len).toString(), (rand.nextDouble()).toString() ] }