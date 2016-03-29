# See the README for installation instructions.
LOCALE ?= en_US


all: \
	r2d3.v2.js \
	r2d3.v2.min.js \

# Modify this rule to build your own custom release.

.INTERMEDIATE r2d3.v2.js: \
	lib/raphael/raphael.js \
	lib/sizzle/sizzle.js \
	lib/compat/compat.js \
	lib/d3/src/start.js \
	r2d3.core.js \
	r2d3.scale.js \
	r2d3.svg.js \
	r2d3.raphael.js \
	r2d3.behavior.js \
	r2d3.layout.js \
	r2d3.dsv.js \
	r2d3.geo.js \
	r2d3.geom.js \
	r2d3.time.js \
	lib/d3/src/end.js

r2d3.core.js: \
	lib/d3/src/compat/date.js \
	lib/d3/src/compat/style.js \
	lib/d3/src/core/core.js \
	lib/d3/src/core/class.js \
	lib/d3/src/core/array.js \
	lib/d3/src/core/map.js \
	lib/d3/src/core/identity.js \
	lib/d3/src/core/this.js \
	lib/d3/src/core/true.js \
	lib/d3/src/core/functor.js \
	lib/d3/src/core/rebind.js \
	lib/d3/src/core/ascending.js \
	lib/d3/src/core/descending.js \
	lib/d3/src/core/mean.js \
	lib/d3/src/core/median.js \
	lib/d3/src/core/min.js \
	lib/d3/src/core/max.js \
	lib/d3/src/core/extent.js \
	lib/d3/src/core/random.js \
	lib/d3/src/core/number.js \
	lib/d3/src/core/sum.js \
	lib/d3/src/core/quantile.js \
	lib/d3/src/core/transpose.js \
	lib/d3/src/core/zip.js \
	lib/d3/src/core/bisect.js \
	lib/d3/src/core/first.js \
	lib/d3/src/core/last.js \
	lib/d3/src/core/nest.js \
	lib/d3/src/core/keys.js \
	lib/d3/src/core/values.js \
	lib/d3/src/core/entries.js \
	lib/d3/src/core/permute.js \
	lib/d3/src/core/merge.js \
	lib/d3/src/core/split.js \
	lib/d3/src/core/collapse.js \
	lib/d3/src/core/range.js \
	lib/d3/src/core/requote.js \
	lib/d3/src/core/round.js \
	lib/d3/src/core/xhr.js \
	lib/d3/src/core/text.js \
	lib/d3/src/core/json.js \
	lib/d3/src/core/html.js \
	lib/d3/src/core/xml.js \
	lib/d3/src/core/ns.js \
	lib/d3/src/core/dispatch.js \
	lib/d3/src/core/format.js \
	lib/d3/src/core/formatPrefix.js \
	lib/d3/src/core/ease.js \
	lib/d3/src/core/event.js \
	lib/d3/src/core/interpolate.js \
	lib/d3/src/core/uninterpolate.js \
	lib/d3/src/core/rgb.js \
	lib/d3/src/core/hsl.js \
	lib/d3/src/core/hcl.js \
	lib/d3/src/core/lab.js \
	lib/d3/src/core/xyz.js \
	src/core/selection.js \
	lib/d3/src/core/selection-select.js \
	lib/d3/src/core/selection-selectAll.js \
	lib/d3/src/core/selection-attr.js \
	lib/d3/src/core/selection-classed.js \
	lib/d3/src/core/selection-style.js \
	lib/d3/src/core/selection-property.js \
	src/core/selection-text.js \
	lib/d3/src/core/selection-html.js \
	src/core/selection-append.js \
	lib/d3/src/core/selection-insert.js \
	lib/d3/src/core/selection-remove.js \
	lib/d3/src/core/selection-data.js \
	lib/d3/src/core/selection-datum.js \
	lib/d3/src/core/selection-filter.js \
	lib/d3/src/core/selection-order.js \
	lib/d3/src/core/selection-sort.js \
	lib/d3/src/core/selection-on.js \
	lib/d3/src/core/selection-each.js \
	lib/d3/src/core/selection-call.js \
	lib/d3/src/core/selection-empty.js \
	lib/d3/src/core/selection-node.js \
	lib/d3/src/core/selection-transition.js \
	lib/d3/src/core/selection-root.js \
	lib/d3/src/core/selection-enter.js \
	lib/d3/src/core/selection-enter-select.js \
	lib/d3/src/core/transition.js \
	lib/d3/src/core/transition-select.js \
	lib/d3/src/core/transition-selectAll.js \
	lib/d3/src/core/transition-filter.js \
	lib/d3/src/core/transition-attr.js \
	lib/d3/src/core/transition-style.js \
	lib/d3/src/core/transition-text.js \
	lib/d3/src/core/transition-remove.js \
	lib/d3/src/core/transition-delay.js \
	lib/d3/src/core/transition-duration.js \
	lib/d3/src/core/transition-each.js \
	lib/d3/src/core/transition-transition.js \
	lib/d3/src/core/tween.js \
	lib/d3/src/core/timer.js \
	lib/d3/src/core/transform.js \
	lib/d3/src/core/mouse.js \
	lib/d3/src/core/touches.js \
	lib/d3/src/core/noop.js

r2d3.scale.js: \
	lib/d3/src/scale/scale.js \
	lib/d3/src/scale/nice.js \
	lib/d3/src/scale/linear.js \
	lib/d3/src/scale/bilinear.js \
	lib/d3/src/scale/polylinear.js \
	lib/d3/src/scale/log.js \
	lib/d3/src/scale/pow.js \
	lib/d3/src/scale/sqrt.js \
	lib/d3/src/scale/ordinal.js \
	lib/d3/src/scale/category.js \
	lib/d3/src/scale/quantile.js \
	lib/d3/src/scale/quantize.js \
	lib/d3/src/scale/threshold.js \
	lib/d3/src/scale/identity.js

r2d3.svg.js: \
	lib/d3/src/svg/svg.js \
	lib/d3/src/svg/arc.js \
	lib/d3/src/svg/line.js \
	lib/d3/src/svg/line-radial.js \
	lib/d3/src/svg/area.js \
	lib/d3/src/svg/area-radial.js \
	lib/d3/src/svg/chord.js \
	lib/d3/src/svg/diagonal.js \
	lib/d3/src/svg/diagonal-radial.js \
	lib/d3/src/svg/mouse.js \
	lib/d3/src/svg/touches.js \
	lib/d3/src/svg/symbol.js \
	lib/d3/src/svg/axis.js \
	lib/d3/src/svg/brush.js

r2d3.raphael.js: \
	src/raphael/element-style.js \
	src/raphael/raphael.js \
	src/raphael/raphael-el.js \
	src/raphael/raphael-set.js \
	src/raphael/raphael-parseTransformString.js

r2d3.behavior.js: \
	lib/d3/src/behavior/behavior.js \
	lib/d3/src/behavior/drag.js \
	lib/d3/src/behavior/zoom.js

r2d3.layout.js: \
	lib/d3/src/layout/layout.js \
	lib/d3/src/layout/bundle.js \
	lib/d3/src/layout/chord.js \
	lib/d3/src/layout/force.js \
	lib/d3/src/layout/partition.js \
	lib/d3/src/layout/pie.js \
	lib/d3/src/layout/stack.js \
	lib/d3/src/layout/histogram.js \
	lib/d3/src/layout/hierarchy.js \
	lib/d3/src/layout/pack.js \
	lib/d3/src/layout/cluster.js \
	lib/d3/src/layout/tree.js \
	lib/d3/src/layout/treemap.js

r2d3.geo.js: \
	lib/d3/src/geo/geo.js \
	lib/d3/src/geo/azimuthal.js \
	lib/d3/src/geo/albers.js \
	lib/d3/src/geo/bonne.js \
	lib/d3/src/geo/equirectangular.js \
	lib/d3/src/geo/mercator.js \
	lib/d3/src/geo/type.js \
	lib/d3/src/geo/path.js \
	lib/d3/src/geo/bounds.js \
	lib/d3/src/geo/circle.js \
	lib/d3/src/geo/greatArc.js \
	lib/d3/src/geo/greatCircle.js

r2d3.dsv.js: \
	lib/d3/src/dsv/csv.js \
	lib/d3/src/dsv/dsv.js \
	lib/d3/src/dsv/tsv.js

r2d3.time.js: \
	lib/d3/src/time/time.js \
	lib/d3/src/time/format-$(LOCALE).js \
	lib/d3/src/time/format.js \
	lib/d3/src/time/format-utc.js \
	lib/d3/src/time/format-iso.js \
	lib/d3/src/time/interval.js \
	lib/d3/src/time/second.js \
	lib/d3/src/time/minute.js \
	lib/d3/src/time/hour.js \
	lib/d3/src/time/day.js \
	lib/d3/src/time/week.js \
	lib/d3/src/time/month.js \
	lib/d3/src/time/year.js \
	lib/d3/src/time/scale.js \
	lib/d3/src/time/scale-utc.js

r2d3.geom.js: \
	lib/d3/src/geom/geom.js \
	lib/d3/src/geom/contour.js \
	lib/d3/src/geom/hull.js \
	lib/d3/src/geom/polygon.js \
	lib/d3/src/geom/voronoi.js \
	lib/d3/src/geom/delaunay.js \
	lib/d3/src/geom/quadtree.js


%.min.js: %.js Makefile
	@rm -f $@
	uglifyjs < $< > $@

r2d3%.js: Makefile
	@rm -f $@
	cat $(filter %.js,$^) > $@
	@chmod a-w $@


clean:
	rm -f d3*.js
	rm -f r2d3*.js
