function Playback() {
    this.init();
}
Playback.prototype = {
    init: function () {
        setUpPod("Playback");

        $('#playbackPod').click(function() {
            $(this).hide();
            $('#playback').dialog('open');
        });

        // set up playback panel
        $("body").append('<div class="panel" id="playback" title="Playback"> \
            <button id="beginning">go to beginning</button> \
            <button id="rewind">rewind</button> \
            <button id="play">play</button> \
            <button id="stop">stop</button> \
            <button id="forward">fast forward</button> \
            <button id="end">go to end</button> \
            </div>');

        $("#playback button").button();

        $("#playback").dialog({
           closeOnEscape: false, resizable: false, width: 230, autoOpen: false
        });

        $("#playback").dialog( "option", "width", 220 );
        $("#playback").dialog( "option", "height", 60 );
        $("#playback").dialog( "option", "position", "bottom" );
        $("#playback").bind( "dialogclose", function(event, ui) { $("#playbackPod").show();} );

        // set up icons
        $('#beginning').button({
            text: false,
            icons: {
                    primary: 'ui-icon-seek-start'
            }
        });
        $('#rewind').button({
            text: false,
            icons: {
                    primary: 'ui-icon-seek-prev'
            }
        });
        $('#play').button({
            text: false,
            icons: {
                    primary: 'ui-icon-play'
            }
        })
        .click(function() {
            var options;
            if ($(this).text() == 'play') {
                    options = {
                            label: 'pause',
                            icons: {
                                    primary: 'ui-icon-pause'
                            }
                    };
            } else {
                    options = {
                            label: 'play',
                            icons: {
                                    primary: 'ui-icon-play'
                            }
                    };
            }
            $(this).button('option', options);
        });
        $('#stop').button({
            text: false,
            icons: {
                    primary: 'ui-icon-stop'
            }
        })
        .click(function() {
            $('#play').button('option', {
                    label: 'play',
                    icons: {
                            primary: 'ui-icon-play'
                    }
            });
        });
        $('#forward').button({
            text: false,
            icons: {
                    primary: 'ui-icon-seek-next'
            }
        });
        $('#end').button({
            text: false,
            icons: {
                    primary: 'ui-icon-seek-end'
            }
        });
    },
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
