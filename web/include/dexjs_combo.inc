<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<%
import static com.dexvis.util.GroovyUtil.renderTemplate as render;

println render("web/include/styles_combo.inc", [:])
if (context.styles) {
  context.styles.each {
    style ->

    println "<style>";
    println new File(style).text;
    println "</style>";
  }
}

if (context.scripts) {
  context.scripts.each {
    script ->

    println "<script>"
    println new File(script).text;
    println "</script>"
  }
}
println render("web/include/scripts.inc", [:])
if (context.postscripts) {
  context.postscripts.each {
    script ->

    println "<script>"
    println new File(script).text;
    println "</script>"
  }
}
%>
  <title>${context.title}</title>
</head>
<body>
  <div class='layout-container'>
    <div class='ui-layout-center'>
      <div id='ChartArea1'></div>
    </div>
    <div class='ui-layout-east'>
      <div id='ChartArea2'></div>
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
var chart1, chart2;

function save()
{
  chart1.save();
  chart2.save();
}

function setValues(values)
{
  values.forEach(function(config) {
    switch (config.chartName) {
      case "${context.types[0]}":
      {
        chart1.attrSave(config.key, config.value);
        break;
      }
      case "${context.types[1]}":
      {
        chart2.attrSave(config.key, config.value);
        break;
      }
    }
  });
  save();
}

function getGuiDefinition()
{
  var guiDef = {
    '${context.types[0]}': chart1.getGuiDefinition(),
    '${context.types[1]}': chart2.getGuiDefinition()
  };

  return JSON.stringify(guiDef);
}
<%
  println dexData.toCsvString();
%>

dex.console.log("CSV", csv);

// Limit initial view to 100 rows for performance.
chart1 = ${context.charts[0]}({
  parent : "#ChartArea1",
  csv : csv.limitRows(100)
});

chart2 = ${context.charts[1]}({
  parent : "#ChartArea2",
  csv : csv.limitRows(100)
});
  
\$(document).ready(function () {

  \$('.layout-container').layout({
    applyDemoStyles: false,
    west: {
      size: 335
    },
    east: {
      size: "50%"
    },
    onresize: function () {
      chart1.resize();
      chart2.resize();
    }
  });

  chart1.load();
  chart2.load();
  
  chart1.render();
  chart2.render();

  configPane = dex.ui.ConfigurationPane({
    "parent": "#ConfigurationPane",
    "csv": csv,
    "components": [ chart1, chart2 ]
  }).render();
});

chart2.subscribe(chart1, "select", function(msg) {
  chart2.attr('csv', msg.selected).update();
});
</script>
</body>
</html>