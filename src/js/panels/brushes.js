/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function brushes() {
    this.init();
}
brushes.prototype = {
    init: function () {
        setUpPod("Brushes");

        $('#brushesPod').click(function() {
            $(this).hide();
            $('#brushesCheckbox').attr('checked', false);
            $('#brushesPanel').dialog('open');
        });

        // set up brushes panel
        $("body").append('<div class="panel" id="brushesPanel" title="Brushes"> \
                <div id="brushes" style="height:100px;overflow:auto;"></div> \
            </div>');

        for (i = 0; i < BRUSHES.length; i++) {
            brushName = BRUSHES[i];
            brushId = brushName + 'Brush';

            $("#brushes").append('<canvas class="brush" id="' + brushId + '"' +
                ' style="height:2em;width:170px"' +  '></canvas>');

            this.renderBrushPreview(brushId);

            $('#' + brushId).click(function() {
                console.log('clicked brush');
                // select brush now!
            });
        }

        $("#brushesPanel").dialog({
           closeOnEscape: false, resizable: false, width: 230, autoOpen: false
        });

        $("#brushesPanel").dialog( "option", "position", "left" );
        $("#brushesPanel").bind( "dialogclose", function(event, ui) {$("#brushesPod").show();} );
    },
    destroy: function () {},
    renderBrushPreview: function (brushId) {
        brushCanvas = document.getElementById(brushId);
        brushContext= brushCanvas.getContext("2d");
        brushContext.fillStyle = 'white';
        brushContext.fillRect(0, 0, brushCanvas.width, brushCanvas.height);

        // TODO: add actual stroke on the bg
        brushContext.fillStyle = 'black';
        brushContext.font = "64px sans-serif";
        brushContext.fillText(brushName, 10, brushCanvas.height / 2);
        //brush = eval("new " + brushName + "(tmpContext)");

        // XXX: temp hack
        //brush = new shaded(brushContext);

        // XXX: rename class! + make it use brush properly!
        //strokePainter = new StrokeManager(brushContext);
        //strokePainter.strokeStart(0, 0);
        //strokePainter.stroke(6, 6);
        //strokePainter.strokeEnd(15, 15);

        // render now!
    }
}

function onMenuSelectorChange(e) {
    if (STYLES[menu.selector.selectedIndex] == "") {
        return
    }
    strokeManager.destroy(); // XXX: is this needed?
    strokeManager.setStyle(STYLES[menu.selector.selectedIndex]);
    window.location.hash = STYLES[menu.selector.selectedIndex]
}
