r2d3
==========

R2D3 is a customized build of D3 powered by [RaphaelJS](http://raphaeljs.com/).  The combination of D3 and Raphael enable developers to easily
data visualizations that work in IE7+ and all modern browsers.


Getting Started
---------------

To get started using R2D3,  conditionally load r2d3 for Internet Explorer 8 and below. For modern browsers,
serve up d3 as you normally would.

```html
<html>
  <head>
    <title>R2D3 101</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <!--[if lte IE 8]><script src="r2d3.v2.js"></script><![endif]-->
    <!--[if gte IE 9]><!-->
    <script src="d3.v2.js"></script>
    <!--<![endif]-->
  </body>
</html>
```

R2D3 uses Raphael under the covers for rendering SVG and VML when
necessary.  Creating a SVG element in R2D3 is the same as D3:

```javascript
var paper = d3.select('div').append('svg')
            .attr('width', 200)
            .attr('height', 200);
```

Using the paper selection,  Raphael elements can be created and
manipulated using D3 syntax:

```javascript
paper.append('circle')
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', function() { return Math.random() * 50; });
```

R2D3 can also query for existing shapes on the paper and update them.

```javascript
paper.select('circle')
  .transition()
  .attr('fill', '#ff0000');
```

Raphael sets can also be used to group elements together.

```javascript
var set = paper.append('set')

// Add a circle to the set
set.append('circle')
  .attr({ cx: 50, cy: 50, r: 10 });

// Add a rectangle to the set
set.append('rect')
  .attr({ width: 100, height: 75, x: 0, y: 0 });

// Set the rect and circle fill to #ff0000.
set.attr({fill: '#ff0000'});
```

Events can also be bound to Raphael elements using D3 syntax:
```javascript
paper.select('circle')
  .on('click', function() { alert('hi'); });
```

Who is using R2D3?
------------------

If you'd like to add a D3 visualization you've made IE compatible with R2D3, issue a pull request and add it here!

Limitations
-----------

See the issues page for a listing of known issues. In addition this
includes:

 * Queries for SVG elements must origin from the SVG node. Example use ```svg.select('rect')``` NOT ```d3.select('rect')```
 * ```<use>``` Is not supported
 * r2d3 must be included before any stylesheets or ```<style>``` blocks. Soon I will push out a lighter weight shim script that can be used instead so r2d3 can load after the page.

Developers
----------
### D3 ###
D3 is included in this project as as submodule. To pull down D3 for a build run:

```
$ git submodule init
$ git submodule update
```

### Build Commands ###
We have included a makefile to build a custom version of D3 packaged with r2d3. 

+ **dependencies**
Our makefile depends on you having recess, uglify.js. To install, just run the following command in npm:

```
$ npm install uglify-js -g
```

+ **build** - `make`
Runs the  makefile to concatenate and minify r2d3.js



<a href='http://www.pledgie.com/campaigns/18826'><img alt='Click here to lend your support to: R2D3 and make a donation at www.pledgie.com !' src='http://www.pledgie.com/campaigns/18826.png?skin_name=chrome' border='0' /></a>
