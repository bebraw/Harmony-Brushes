/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function playback() {
    this.init();
}
playback.prototype = {
    init: function () {
        setUpPod("Playback");

        $('#playbackPod').click(function() {
            $(this).hide();
            $('#playbackCheckbox').attr('checked', false);
            $('#playbackPanel').dialog('open');
        });

        // set up playback panel
        $("body").append('<div class="panel" id="playbackPanel" title="Playback"> \
            <button id="beginning">go to beginning</button> \
            <button id="rewind">rewind</button> \
            <button id="play">play</button> \
            <button id="stop">stop</button> \
            <button id="forward">fast forward</button> \
            <button id="end">go to end</button> \
            </div>');

        $("#playbackPanel button").button();

        $("#playbackPanel").dialog({
           closeOnEscape: false, resizable: false, width: 230, autoOpen: false
        });

        $("#playbackPanel").dialog( "option", "width", 220 );
        $("#playbackPanel").dialog( "option", "height", 60 );
        $("#playbackPanel").dialog( "option", "position", "bottom" );
        $("#playbackPanel").bind( "dialogclose", function(event, ui) { $("#playbackPod").show();} );

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
