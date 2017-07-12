<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<%
import static com.dexvis.util.GroovyUtil.renderTemplate as render;

println render("web/include/styles.inc", [:])
println render("web/include/multiples_styles.inc", [:])
println render("web/include/scripts.inc", [:])
println render("web/include/multiples_scripts.inc", [:])
%>
  <title>${context.title}</title>
</head>
<body>
  <div class='layout-container'>
    <div class='ui-layout-center'>
      <div id='ChartArea'></div>
    </div>
    <div class='ui-layout-west'>
      <div id='ConfigurationPane'></div>
    </div>
</div>

<!-- Enable Firebug 
<script type="text/javascript"
src="https://getfirebug.com/firebug-lite.js">
{
    overrideConsole: true,
    startInNewWindow: false,
    startOpened: true,
    enableTrace: true
}
</script>
    -->
<script>

<%
  println dexData.toCsvString();
%>

var frames = dex.csv.getFramesByIndex(csv, 0);

function save()
{
  chart.save();
}

function setValues(values)
{
  values.forEach(function(config) {
    switch (config.chartName) {
      case "${context.type}":
      {
        chart.attrSave(config.key, config.value);
        break;
      }
    }
  });
  save();
}

function getGuiDefinition()
{
  var guiDef = {
    '${context.type}': chart.getGuiDefinition()
  };

  return JSON.stringify(guiDef);
}

var chart = ${context.chart}({
    parent : "#ChartArea",
    csv : dex.csv.limitRows(csv, 100)
  });

\$(document).ready(function () {

  \$('.layout-container').layout({
    applyDemoStyles: false,
    west: {
      size: 335
    },
    onresize: function () {
      // REM: Hack, calling resize hangs for some reason.
      var width = d3.select(chart.config.parent).property("clientWidth");
      var height = d3.select(chart.config.parent).property("clientHeight");
      chart.attr("width", width).attr("height", height).update();
    }
  });

  chart.load();
  chart.render();

  configPane = dex.ui.ConfigurationPane({
    "parent": "#ConfigurationPane",
    "csv": csv,
    "components": [ chart ]
  }).render();
});
</script>
</body>
</html>