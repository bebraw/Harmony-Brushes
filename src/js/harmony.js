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
}

var strokeManager = new StrokeManager();

$("#canvas").mousecapture({
    "down": function(e, s) {
        canvas = document.getElementById("canvas");
        context= canvas.getContext("2d");

        // XXX: get rid of the context dep (-> belongs to canvas!)
        brush = eval("new " + panels["brushes"].selected + "(context)");

        strokeManager.strokeStart(e.pageX, e.pageY, COLOR, brush);
    },
    "move": function(e, s) {
        strokeManager.stroke(e.pageX, e.pageY, COLOR);
    },
    "up": function(e, s) {
        strokeManager.strokeEnd(e.pageX, e.pageY, COLOR);
    }
});

// XXX: abstract
$(window).keydown(function(e) {
    if($.isKey(e,'1')) {
        // menu
        if($('#menuPod').is(':visible')) {
            $('#menuPod').click();
        }
        else {
            $('#menuPanel').dialog('close');
        }
    }
    if($.isKey(e,'2')) {
        // menu
        if($('#palettePod').is(':visible')) {
            $('#palettePod').click();
        }
        else {
            $('#palettePanel').dialog('close');
        }
    }
    if($.isKey(e,'3')) {
        // menu
        if($('#modifiersPod').is(':visible')) {
            $('#modifiersPod').click();
        }
        else {
            $('#modifiersPanel').dialog('close');
        }
    }
    if($.isKey(e,'4')) {
        // menu
        if($('#playbackPod').is(':visible')) {
            $('#playbackPod').click();
        }
        else {
            $('#playbackPanel').dialog('close');
        }
    }
    if($.isKey(e,'5')) {
        // menu
        if($('#canvasPod').is(':visible')) {
            $('#canvasPod').click();
        }
        else {
            $('#canvasPanel').dialog('close');
        }
    }
    if($.isKey(e,'6')) {
        // menu
        if($('#brushesPod').is(':visible')) {
            $('#brushesPod').click();
        }
        else {
            $('#brushesPanel').dialog('close');
        }
    }
});
