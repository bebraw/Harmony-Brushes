var background = Background(),
    devices = Devices(),
    menu = Menu(),
    palette = Palette(),
    modifiers = Modifiers(),
    playback = Playback(),
    canvas = Canvas(),
    brushes = Brushes();

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
init();

function init() {
    var hash, palette;
    document.body.style.backgroundColor = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] + ", " + BACKGROUND_COLOR[2] + ")";
    container = document.createElement("div");
    document.body.appendChild(container);

    canvas = document.createElement("canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    canvas.style.cursor = "crosshair";
    container.appendChild(canvas);

    context = canvas.getContext("2d");
    strokeManager = new StrokeManager(canvas, context);

    /*
    flattenCanvas = document.createElement("canvas");
    flattenCanvas.width = SCREEN_WIDTH;
    flattenCanvas.height = SCREEN_HEIGHT;

    /*
    palette = new Palette();
    foregroundColorSelector = new ColorSelector(palette);
    foregroundColorSelector.container.onmousedown = onForegroundColorSelectorMouseDown;
    foregroundColorSelector.container.onmouseup = onForegroundColorSelectorMouseUp;
    foregroundColorSelector.container.onmousemove = onForegroundColorSelectorMouseMove;
    container.appendChild(foregroundColorSelector.container);
    backgroundColorSelector = new ColorSelector(palette);
    backgroundColorSelector.container.onmousedown = onBackgroundColorSelectorMouseDown;
    backgroundColorSelector.container.onmouseup = onBackgroundColorSelectorMouseUp;
    backgroundColorSelector.container.onmousemove = onBackgroundColorSelectorMouseMove;
    container.appendChild(backgroundColorSelector.container);
    */
   
    menu = new Menu();
    container.appendChild(menu.container);

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
    manager_set = false;
    if (window.location.hash) {
        hash = window.location.hash.substr(1, window.location.hash.length);
        for (i = 0; i < STYLES.length; i++) {
            if (hash == STYLES[i]) {
                strokeManager.setStyle(STYLES[i]);
                menu.selector.selectedIndex = i;
                manager_set = true;
                break
            }
        }
    }
    if (!manager_set) {
        strokeManager.setStyle(STYLES[0]);
    }

    about = new About();
    container.appendChild(about.container);
    */

    window.onresize = onWindowResize;
    window.onkeydown = onDocumentKeyDown;
    window.onkeyup = onDocumentKeyUp;
    document.onmousedown = onDocumentMouseDown;
    document.onmouseout = onCanvasMouseUp;
    canvas.onmousedown = onCanvasMouseDown;
    canvas.onmouseup = onCanvasMouseUp;
    canvas.onmousemove = onCanvasMouseMove;
    canvas.ontouchstart = onCanvasTouchStart;
    canvas.ontouchend = onCanvasTouchEnd;
    canvas.ontouchmove = onCanvasTouchMove;
    onWindowResize(null)
}
function onWindowResize(a) {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    menu.container.style.left = ((SCREEN_WIDTH - menu.container.offsetWidth) / 2) + "px";
    about.container.style.left = ((SCREEN_WIDTH - about.container.offsetWidth) / 2) + "px";
    about.container.style.top = ((SCREEN_HEIGHT - about.container.offsetHeight) / 2) + "px";
}
function onDocumentMouseDown(a) {
    return isMenuMouseOver;
}
function onDocumentKeyDown(a) {
    

    // TODO: separate these to Tools!
    /*
     * Tool:
     * hotkey: 'f'
     * handler(toolContext) XXX: strokeManager should have reference to toolContext
     */

    //TODO
    toolManager.checkPress(a.keyCode);
    // toolManager should
    // 1. call devices.keyboard.key(a.keyCode).press();
    // 2. match keycode to tool hotkey
    // 3. exec tool if match was found (note that manager should exec only the
    // first time match is found!!! (JS can trigger press many times without
    // release!)
}
function onDocumentKeyUp(a) {
    devices.keyboard.key(a.keyCode).release();
}
function onMenuMouseOver(a) {
    isMenuMouseOver = true
}
function onMenuMouseOut(a) {
    isMenuMouseOver = false
}
