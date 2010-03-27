/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
var constraints = new Constraints();

// create actual canvas
$("body").append('<canvas id="canvas" width="' +
    window.innerWidth + '" height="' + window.innerHeight +
    '" style="cursor:crosshair"></canvas>');

var panels = {}
// note that due JS namespaces i is visible at instance init! -> better use j
for (j = 0; j < PANELS.length; j++) {
    panelName = PANELS[j];
    panel = eval("new " + panelName + "()");
    panels[panelName] = panel;

    shortcut.add((j+1).toString(), function(e) {
        keyChar = $.charcode(e);
        keyNum = parseInt(keyChar) - 1;
        panel = PANELS[keyNum];

        if($("#" + panel + "Pod").is(':visible')) {
            $("#" + panel + "Pod").click();
        }
        else {
            $("#" + panel + "Panel").dialog('close');
        }
    });
}

//var strokeManager = new StrokeManager();

// XXX
var strokePainter;

$("#canvas").mousecapture({
    "down": function(e, s) {
        mainCanvas = new ProxyCanvas("canvas");
        brush = eval("new " + panels["brushes"].selected + "()");
        color = COLOR; // XXX

        strokePainter = new Painter(mainCanvas, brush, color);

        x = e.pageX;
        y = e.pageY;
        strokePainter.paint(x, y, 8, "source-over");

        //canvas = document.getElementById("canvas");
        //context= canvas.getContext("2d");

        // XXX: get rid of the context dep (-> belongs to canvas!)
        //brush = eval("new " + panels["brushes"].selected + "(context)");

        //strokeManager.strokeStart(e.pageX, e.pageY, COLOR, brush);
    },
    "move": function(e, s) {
        x = e.pageX;
        y = e.pageY;
        strokePainter.paint(x, y, 8, "source-over");
        //strokeManager.stroke(e.pageX, e.pageY, COLOR);
    },
    "up": function(e, s) {
        x = e.pageX;
        y = e.pageY;
        strokePainter.paint(x, y, 8, "source-over");
        //strokeManager.strokeEnd(e.pageX, e.pageY, COLOR);
    }
});
