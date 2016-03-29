library("psych")
library("akima")
# Read the data into a dataframe called gc.
gc <- read.table("gc.csv", header = T, sep=",")

# Output columns
names(gc)

im <- with(gc, interp(Timestamp,EU,OU))
with(im,image(x,y,z))

# Descriptive statistics for the variables in the dataframe called ratings
describe(gc)