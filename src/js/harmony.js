/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
var menu = new Menu(),
    palette = new Palette(),
    modifiers = new Modifiers(),
    playback = new Playback(),
    canvas = new Canvas(),
    brushes = new Brushes(),
    constraints = new Constraints();

// XXX: move to Palette!
var COLOR = [0, 0, 0];

// XXX: just pass canvas ie. here
tmpCanvas = document.getElementById("canvas");
tmpContext= tmpCanvas.getContext("2d");
var strokeManager = new StrokeManager(tmpCanvas, tmpContext);

$("#canvas").mousecapture({
    "down": function(e, s) {
        strokeManager.strokeStart(e.pageX, e.pageY);

        //canvas = document.getElementById("canvas");
        //context = canvas.getContext("2d");
        //context.fillRect(50, 25, 150, 100);
    },
    "move": function(e, s) {
        strokeManager.stroke(e.pageX, e.pageY);
    },
    "up": function(e, s) {
        strokeManager.strokeEnd(e.pageX, e.pageY);
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
