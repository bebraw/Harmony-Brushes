var i,
    COLOR = [0, 0, 0],
    targetX = 0, targetY = 0,
    BACKGROUND_COLOR = [250, 250, 250],
    SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    strokeManager, container, foregroundColorSelector, backgroundColorSelector,
    menu, about, canvas, flattenCanvas, context,
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
    mirrorsDown = {'x': false, 'y': false, 'xy': false},
    keysDown = {'a': false, 's': false, 'd': false }; // TODO: use more generic solution
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
    context = canvas.getContext("2d");
    strokeManager = new StrokeManager(canvas, context);
    container.appendChild(canvas);
    flattenCanvas = document.createElement("canvas");
    flattenCanvas.width = SCREEN_WIDTH;
    flattenCanvas.height = SCREEN_HEIGHT;
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
    menu = new Menu();
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
    container.appendChild(menu.container);

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
    about.container.style.top = ((SCREEN_HEIGHT - about.container.offsetHeight) / 2) + "px"
}
function onDocumentMouseDown(a) {
    return isMenuMouseOver
}
function onDocumentKeyDown(a) {
    devices.keyboard.key(a.keyCode).press();

    // TODO: separate these to Tools!
    /*
     * Tool:
     * hotkey: 'f'
     * handler(toolContext) XXX: strokeManager should have reference to toolContext
     */
    switch (a.keyCode) {
    case 70: // f
        targetX = mouseX;
        targetY = mouseY;

        console.log('set persp target to x: ' + targetX + ' , y: ' + targetY);
        break;
    case 65: // a
        if(!keysDown['a']) {
            initialY = mouseY;
        }

        //keysDown['a'] = true;
        break;
    case 83: // s
        if(!keysDown['s']) {
            initialX = mouseX;
        }

        //keysDown['s'] = true;
        break;
    case 68: // d
        if(!keysDown['d']) {
            initialX = mouseX;
            initialY = mouseY;
        }

        //keysDown['d'] = true;
        break;
    case 16: // shift
        if(controlKeyIsDown) {
            controlKeyIsDown = false;
            foregroundColorSelector.container.style.visibility = "hidden";
        }
        else {
            controlKeyIsDown = true;
            foregroundColorSelector.container.style.left = mouseX - 125 + "px";
            foregroundColorSelector.container.style.top = mouseY - 125 + "px";
            foregroundColorSelector.container.style.visibility = "visible";
        }
        break
    }
}
function onDocumentKeyUp(a) {
    devices.keyboard.key(a.keyCode).release();

    /*
    switch (a.keyCode) {
    case 65: // a
        keysDown['a'] = false;
        // devices.keyboard.key(a.keyCode).release()
        break;
    case 83: // s
        keysDown['s'] = false;
        break;
    case 68: // d
        keysDown['d'] = false;
        break;
    }
    */
}
function onForegroundColorSelectorMouseDown(a) {
    isForegroundColorSelectorMouseDown = true
}
function onForegroundColorSelectorMouseUp(a) {
    isForegroundColorSelectorMouseDown = false;
    foregroundColorSelector.update(a);
    COLOR = foregroundColorSelector.getColor();
    menu.setForegroundColor(COLOR)
}
function onForegroundColorSelectorMouseMove(a) {
    if (!isForegroundColorSelectorMouseDown) {
        return
    }
    foregroundColorSelector.update(a);
    COLOR = foregroundColorSelector.getColor();
    menu.setForegroundColor(COLOR)
}
function onBackgroundColorSelectorMouseDown(a) {
    isBackgroundColorSelectorMouseDown = true
}
function onBackgroundColorSelectorMouseUp(a) {
    isBackgroundColorSelectorMouseDown = false;
    backgroundColorSelector.update(a);
    BACKGROUND_COLOR = backgroundColorSelector.getColor();
    menu.setBackgroundColor(BACKGROUND_COLOR);
    document.body.style.backgroundColor = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] + ", " + BACKGROUND_COLOR[2] + ")"
}
function onBackgroundColorSelectorMouseMove(a) {
    if (!isBackgroundColorSelectorMouseDown) {
        return
    }
    backgroundColorSelector.update(a);
    BACKGROUND_COLOR = backgroundColorSelector.getColor();
    menu.setBackgroundColor(BACKGROUND_COLOR);
    document.body.style.backgroundColor = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] + ", " + BACKGROUND_COLOR[2] + ")"
}
function onMenuForegroundColor(a) {
    cleanPopUps();
    foregroundColorSelector.show();
    foregroundColorSelector.container.style.left = ((SCREEN_WIDTH - foregroundColorSelector.container.offsetWidth) / 2) + "px";
    foregroundColorSelector.container.style.top = ((SCREEN_HEIGHT - foregroundColorSelector.container.offsetHeight) / 2) + "px";
    isForegroundColorSelectorVisible = true
}
function onMenuBackgroundColor(a) {
    cleanPopUps();
    backgroundColorSelector.show();
    backgroundColorSelector.container.style.left = ((SCREEN_WIDTH - backgroundColorSelector.container.offsetWidth) / 2) + "px";
    backgroundColorSelector.container.style.top = ((SCREEN_HEIGHT - backgroundColorSelector.container.offsetHeight) / 2) + "px";
    isBackgroundColorSelectorVisible = true
}
function onMenuSelectorChange(e) {
    if (STYLES[menu.selector.selectedIndex] == "") {
        return
    }
    strokeManager.destroy(); // XXX: is this needed?
    strokeManager.setStyle(STYLES[menu.selector.selectedIndex]);
    window.location.hash = STYLES[menu.selector.selectedIndex]
}
function onMenuMouseOver(a) {
    isMenuMouseOver = true
}
function onMenuMouseOut(a) {
    isMenuMouseOver = false
}

function setToggle(e, state) {
    // XXX: could be nicer (set via css class or so)
    if(state) {
        e.style.color = '#00DD00';
    }
    else {
        e.style.color = '#000000';
    }
}
function onMenuXMirror(a) {
    mirrorsDown['x'] = !mirrorsDown['x'];

    setToggle(this, mirrorsDown['x']);
}
function onMenuYMirror() {
    mirrorsDown['y'] = !mirrorsDown['y'];

    setToggle(this, mirrorsDown['y']);
}
function onMenuXYMirror() {
    mirrorsDown['xy'] = !mirrorsDown['xy'];

    setToggle(this, mirrorsDown['xy']);
}

function onMenuUndo() {
    strokeManager.undo(context, BACKGROUND_COLOR);
}
function onMenuRedo() {
    strokeManager.redo();
}

var t, timerIsOn = false, running = false, stopped = false;
function advanceFrame()
{
    //strokeManager.playbackDab();
    strokePlayer.step();

    if(strokePlayer.playbackLeft()) {
    //if(strokeManager.playbackLeft()) {
        //timeDelta = strokeManager.getDabTimeDelta();

        // XXX: calculate scaling factor at init() and use that
        // to vary delta between [1, 50] (replace 50 with bigger num?)
        // note that this should filter out really slow dabs to avoid bad
        // scaling!

        // XXX: use timeDelta for ~showing~ renders instead of actually
        // rendering dabs!
        t = setTimeout("advanceFrame()", 10); //timeDelta);
    }
    else {
        running = false;
        stopped = false;
    }
}

function onMenuPlay() {
    if(!running) {
        if(!stopped) {
            canvas.empty(); // TODO! this should get rid of strokes (just render bg again)
            // empty canvas -> make this a method of canvas!
            //context.fillStyle = "rgb(" + BACKGROUND_COLOR[0] + ", " +
            //    BACKGROUND_COLOR[1] + ", " + BACKGROUND_COLOR[2] + ")";
            //context.fillRect(0, 0, canvas.width, canvas.height);

            strokePlayer.init();
            // TODO: move these to some init method
            //strokeManager.currentStrokeIndex = 0;
            //strokeManager.currentDabIndex = 0;
        }
        
        running = true;
        advanceFrame();
    }
}
function onMenuStop() {
    clearTimeout(t);
    running = false;
    stopped = true;
}

function onMenuSave() {
    var a = flattenCanvas.getContext("2d");
    a.fillStyle = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] +
        ", " + BACKGROUND_COLOR[2] + ")";
    a.fillRect(0, 0, canvas.width, canvas.height);
    a.drawImage(canvas, 0, 0);
    window.open(flattenCanvas.toDataURL("image/png"), "mywindow")
}
function onMenuClear() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    strokeManager.initUndo();
    strokeManager.setStyle(STYLES[menu.selector.selectedIndex]);
}
function onMenuAbout(a) {
    cleanPopUps();
    isAboutVisible = true;
    about.show()
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
function cleanPopUps() {
    if (isForegroundColorSelectorVisible) {
        foregroundColorSelector.hide();
        isForegroundColorSelectorVisible = false
    }
    if (isBackgroundColorSelectorVisible) {
        backgroundColorSelector.hide();
        isBackgroundColorSelectorVisible = false
    }
    if (isAboutVisible) {
        about.hide();
        isAboutVisible = false
    }
};
