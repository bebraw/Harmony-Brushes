/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
/*
canvas = document.createElement("canvas");
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
canvas.style.cursor = "crosshair";
container.appendChild(canvas);

canvas.onmousedown = onCanvasMouseDown;
canvas.onmouseup = onCanvasMouseUp;
canvas.onmousemove = onCanvasMouseMove;
canvas.ontouchstart = onCanvasTouchStart;
canvas.ontouchend = onCanvasTouchEnd;
canvas.ontouchmove = onCanvasTouchMove;
*/

/*
flattenCanvas = document.createElement("canvas");
flattenCanvas.width = SCREEN_WIDTH;
flattenCanvas.height = SCREEN_HEIGHT;
*/

//document.body.style.backgroundColor = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] + ", " + BACKGROUND_COLOR[2] + ")";

//canvas = document.getElementById("canvas");
//context = canvas.getContext("2d");
//context.fillRect(50, 25, 150, 100);

function canvas() {
    this.init();
}
canvas.prototype = {
    init: function () {
        setUpPod("Canvas");

        $('#canvasPod').click(function() {
            $(this).hide();
            $('#canvasCheckbox').attr('checked', false);
            $('#canvasPanel').dialog('open');
        });

        // set up background panel
        $("body").append('<div class="panel" id="canvasPanel" title="Canvas"> \
            <div id="canvasOptions"> \
            <input type="radio" id="solidCanvas" name="radio" checked="checked" /><label for="solidCanvas">Solid</label> \
            <input type="radio" id="gradientCanvas" name="radio" /><label for="gradientCanvas">Gradient</label> \
            <input type="radio" id="textureCanvas" name="radio" /><label for="textureCanvas">Texture</label> \
            </div> \
            <div id="solidColorSelector"><div></div></div> \
            </div>');

        $("#canvasOptions").css("margin-bottom", "0.5em");

        $("#solidColorSelector div").css("backgroundColor", "white");
        $("#solidColorSelector div").css("width", "2em");
        $("#solidColorSelector div").css("height", "2em");

        $("#canvasOptions").buttonset();

        $('#solidColorSelector').ColorPicker({
                color: '#FFFFFF',
                onChange: function (hsb, hex, rgb) {
                        $('#solidColorSelector div').css('backgroundColor', '#' + hex);
                }
        });

        $("#canvasPanel").dialog({
           closeOnEscape: false, resizable: false, width: 230, autoOpen: false
        });

        $("#canvasPanel").dialog( "option", "position", ["left", "bottom"] );
        $("#canvasPanel").bind( "dialogclose", function(event, ui) {
            $("#canvasPod").show();
        });
    },
    destroy: function () {}
}

function onCanvasMouseDown(a) {
    cleanPopUps();
    isMouseDown = true;

    initialX = mouseX;
    initialY = mouseY;
    // update mouse state with new x, y

    strokeRecorder.start(); // pass devices, menu ie. at init
    //strokeRecorder.start(devices, menu, targets);
    // devices should contain mouse and keyboard. keyboard should contain key
    // access
    // menu should contain access to menu item states (bad decoupling? handle
    // at modifier level?)
    // get rid of targets?

    //strokeRecorder.record(mouse, menu, keys, targets);
    //strokeManager.strokeStart(mouseX, mouseY, mirrorsDown, keysDown, initialX,
    //    initialY, targetX, targetY);
}
function onCanvasMouseUp(a) {
    if(isMouseDown) {
        stroke = strokeRecorder.finish();
        strokeManager.append(stroke);
        //strokeManager.strokeEnd(mouseX, mouseY, mirrorsDown, keysDown,
        //    initialX, initialY, targetX, targetY);

        // TODO: move this to state dict (is this lmb always?)
        isMouseDown = false;
        // devices.mouse['left'].pressed = false;
    }
}
function onCanvasMouseMove(a) {
    if (!a) {
        a = window.event
    }

    mouseX = a.clientX;
    mouseY = a.clientY;
    if (!isMouseDown) {
        return
    }

    strokeRecorder.step();
    //strokeManager.stroke(mouseX, mouseY, mirrorsDown, keysDown, initialX,
    //    initialY, targetX, targetY);
}
function onCanvasTouchStart(a) {
    if (a.touches.length == 1) {
        var b = a.touches[0];

        // XXX: figure out what's this for! note that this uses pageX, pageY!
        strokeManager.strokeStart(b.pageX, b.pageY, mirrorsDown, keysDown,
            initialX, initialY, targetX, targetY);
        return false
    }
}
function onCanvasTouchEnd(a) {
    if (a.touches.length == 1) {
        var b = a.touches[0];

        // XXX: figure out what's this for! note that this uses pageX, pageY!
        strokeManager.strokeEnd(b.pageX, b.pageY, mirrorsDown, keysDown,
            initialX, initialY, targetX, targetY);
        return false
    }
}
function onCanvasTouchMove(a) {
    if (a.touches.length == 1) {
        var b = a.touches[0];

        // XXX: figure out what's this for! note that this uses pageX, pageY!
        strokeManager.stroke(b.pageX, b.pageY, mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY);
        return false
    }
}
