#Circular Heat Chart

A [D3](http://d3js.org) chart for displaying quantative data using segmented concentric rings.

Ideal for displaying cyclic data e.g.

* a week's worth of hourly data. Each ring represents a day and each segment an hour
* a year's worth of daily data. Each ring represents a week and each segment a day

###Simple example

	var data = [1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5, 6, 4, 5, 6, 7];
	var chart = circularHeatChart().innerRadius(100).numSegments(4).range(["white", "red"]);
	d3.select('#chart')
		.selectAll('svg')
		.data([data])
		.enter()
		.append('svg')
		.call(chart);

More [examples](http://prcweb.co.uk/lab/circularheat/).

###Implementation

The implementation follows the [reusable charts](http://bost.ocks.org/mike/chart/) convention proposed by Mike Bostock.

##Configuration

The chart can be configured in a number of ways (all optional)

* **margin**: An object specifying the margins e.g. {top: 20, right: 20, bottom: 20, left: 20}
* **innerRadius**: The radius of the innermost circle
* **numSegements**: The number of segments in each ring
* **segmentHeight**: The height of each ring
* **domain**: The domain of the data e.g. [0, 1]
* **range**: The output colour range of the data e.g. ["white", "red"]
* **accessor**: An accessor function for e.g. arrays of objects

###About
This chart was created by [Peter Cook](http://prcweb.co.uk)
Twitter: [@prcweb](http://twitter.com/prcweb)
