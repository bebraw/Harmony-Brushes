/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
var constraints = new Constraints();

// create actual canvas
$("#page1").append('<div style="overflow:auto;width:' +
        (window.innerWidth - 40) + 'px;height:' +
        (window.innerHeight - 110) + 'px;">' +
    '<canvas id="canvas" width="' +
    (window.innerWidth - 40) + '" height="' + (window.innerHeight - 115) +
    '" style="cursor:crosshair"></canvas></div>');

// initialize canvas as white (XXX: fetch this from canvas settings!)
mainCanvas = new ProxyCanvas("canvas");
mainCanvas.fill("white");

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

        // TODO: check visible status
        if($("#" + panel + "Pod").css('visibility') == 'visible') {
            $("#" + panel + "Pod").click();
        }
        else {
            $("#" + panel + "Panel").dialog('close');
        }
    });
}

// initialize panel UI
for (panelName in panels) {
    panel = panels[panelName];
    panel.initUI();
}

var strokeManager = new StrokeManager(panels['modifiers'], panels['canvas'],
    panels['brushes'], panels['palette']);

function getMouseLocationOnCanvas(e) {
    return new Point(e.layerX, e.layerY);
}

$("#canvas").mousecapture({
    "down": function(e, s) {
        strokeManager.start(getMouseLocationOnCanvas(e));
    },
    "move": function(e, s) {
        strokeManager.paint(getMouseLocationOnCanvas(e));
    },
    "up": function(e, s) {
        strokeManager.paint(getMouseLocationOnCanvas(e));
    }
});
