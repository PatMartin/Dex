dex.ui.jqueryui.Player = function (userConfig) {

  var defaults = {
    // The parent container of this chart.
    'parent': null,
    // Set these when you need to CSS style components independently.
    'id': 'Player',
    'class': 'ui-widget-content',
    'width': 600,
    'height': 100,
    'delay': 1000,
    'frameIndex': 0,
    'csv': {
      header : ['C1', 'C2', 'C3' ],
      data : [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5]
      ]
    }
  };

  var chart = new dex.component(userConfig, defaults);
  var config = chart.config;
  var frames = dex.csv.getFramesByIndex(config.csv, config.frameIndex);
  var frameNum = 0;
  chart.attr("frames", frames);

  chart.render = function () {
    var timer;
    var state = "stopped";
    frames = dex.csv.getFramesByIndex(config.csv, config.frameIndex);
    dex.console.log(frames);
    chart.attr("frames", frames);

    dex.console.log("FRAMES:", frames);

    $(function () {
      $("#beginning").button({
        text: false,
        icons: {
          primary: "ui-icon-seek-start"
        }
      }).click(function () {
        gotoFrame(0);
      });
      $("#previous").button({
        text: false,
        icons: {
          primary: "ui-icon-seek-prev"
        }
      }).click(function () {
        previous();
      });
      $("#play").button({
          text: false,
          icons: {
            primary: "ui-icon-play"
          }
        })
        .click(function () {
          var options;
          if ($(this).text() === "play") {
            options = {
              label: "pause",
              icons: {
                primary: "ui-icon-pause"
              }
            };
            play();
          } else {
            options = {
              label: "play",
              icons: {
                primary: "ui-icon-play"
              }
            };

            clearTimeout(timer);
          }
          $(this).button("option", options);
        });
      $("#next").button({
        text: false,
        icons: {
          primary: "ui-icon-seek-next"
        }
      }).click(function () {
        next();
      });
      $("#end").button({
        text: false,
        icons: {
          primary: "ui-icon-seek-end"
        }
      }).click(function () {
        gotoFrame(frames.frames.length-1);
      });
    });

    function play() {
      frameNum++;
      gotoFrame((frameNum >= frames.frameIndices.length) ? 0 : frameNum);

      // Set a timer for playing the next frame.
      timer = setTimeout(play, config.delay);
    }

    gotoFrame(0);
  };

  chart.update = function () {
    frames = dex.csv.getFramesByIndex(config.csv, config.frameIndex);
    chart.attr("frames", frames);
    gotoFrame(0);
  };

  function previous() {
    gotoFrame(frameNum > 0 ? (frameNum-1) : 0)
  }

  function next() {
    gotoFrame((frameNum + 1) % frames.frameIndices.length);
  }

  function gotoFrame(frameIndex) {
    frameNum = frameIndex;
    chart.publish({
      "type"  : "new-frame",
      "data"  : frames.frames[frameNum],
      "name"  : frames.frameIndices[frameNum],
      "frameBy" : csv.header[config.frameIndex] }
    );
    dex.console.log("Displaying frame: " + frameNum);
  }

  $(document).ready(function () {
    // Make the entire chart draggable.
    //$(chart.config.parent).draggable();
  });

  return chart;
}