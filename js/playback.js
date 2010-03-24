function Playback() {
    this.init();
}
Playback.prototype = {
    init: function () {},
    destroy: function () {}
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
