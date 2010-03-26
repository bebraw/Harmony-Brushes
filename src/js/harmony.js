/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */




var devices = new Devices(),
    menu = new Menu(),
    palette = new Palette(),
    modifiers = new Modifiers(),
    playback = new Playback(),
    canvas = new Canvas(),
    brushes = new Brushes(),
    constraints = new Constraints();

// XXX: just a quick test
$("#canvas").click(function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.fillRect(50, 25, 150, 100);
});

/*
var i,
    COLOR = [0, 0, 0],
    targetX = 0, targetY = 0,
    BACKGROUND_COLOR = [250, 250, 250],
    SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    strokeManager, container, foregroundColorSelector, backgroundColorSelector,
    menu, about, flattenCanvas, context,
    initialX, initialY,
    mouseX = 0, mouseY = 0,
    isForegroundColorSelectorVisible = false,
    isBackgroundColorSelectorVisible = false,
    isAboutVisible = false;
    isForegroundColorSelectorMouseDown = false,
    isBackgroundColorSelectorMouseDown = false,
    isMenuMouseOver = false,
    isMouseDown = false,
    controlKeyIsDown = false,
    mirrorsDown = {'x': false, 'y': false, 'xy': false};
*/
//init();

function init() {
    //var hash, palette;
    //container = document.createElement("div");
    //document.body.appendChild(container);

    //context = canvas.getContext("2d");
    //strokeManager = new StrokeManager(canvas, context);

    /*
    menu.foregroundColor.addEventListener("click", onMenuForegroundColor, false);
    menu.backgroundColor.addEventListener("click", onMenuBackgroundColor, false);
    menu.selector.onchange = onMenuSelectorChange;
    menu.xMirror.addEventListener("click", onMenuXMirror, false);
    menu.yMirror.addEventListener("click", onMenuYMirror, false);
    menu.xyMirror.addEventListener("click", onMenuXYMirror, false);
    menu.undo.addEventListener("click", onMenuUndo, false);
    menu.redo.addEventListener("click", onMenuRedo, false);
    menu.play.addEventListener("click", onMenuPlay, false);
    menu.stop.addEventListener("click", onMenuStop, false);
    menu.save.addEventListener("click", onMenuSave, false);
    menu.clear.addEventListener("click", onMenuClear, false);
    menu.about.addEventListener("click", onMenuAbout, false);
    menu.container.onmouseover = onMenuMouseOver;
    menu.container.onmouseout = onMenuMouseOut;
    */

    /*
    window.onkeydown = onDocumentKeyDown;
    window.onkeyup = onDocumentKeyUp;
    document.onmousedown = onDocumentMouseDown;
    document.onmouseout = onCanvasMouseUp;
    onWindowResize(null)
    */
}
function onDocumentMouseDown(a) {
    return isMenuMouseOver;
}
function onMenuMouseOver(a) {
    isMenuMouseOver = true
}
function onMenuMouseOut(a) {
    isMenuMouseOver = false
}
