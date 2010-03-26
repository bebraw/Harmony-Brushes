/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function Brushes() {
    this.init();
}
Brushes.prototype = {
    init: function () {
        setUpPod("Brushes");

        $('#brushesPod').click(function() {
            $(this).hide();
            $('#brushesCheckbox').attr('checked', false);
            $('#brushesPanel').dialog('open');
        });

        // set up brushes panel
        $("body").append('<div class="panel" id="brushesPanel" title="Brushes"> \
                <div id="brushes" style="height:100px;overflow:scroll;"></div> \
            </div>');

        // TODO: render brushes now!
        for (i = 0; i < BRUSHES.length; i++) {
            brushName = BRUSHES[i];

            // XXX: should pass brush preview context instead!
            tmpCanvas = document.getElementById("canvas");
            tmpContext= tmpCanvas.getContext("2d");
            //brush = eval("new " + brushName + "(tmpContext)");
            
            // XXX: temp hack
            brush = new shaded(tmpContext);

            // render now!

            // TODO: use canvas here
            $("#brushes").append('<div class="brush">' + brushName + '</div>');
        }

        $(".brush").css("height", "2em");

        $("#brushesPanel button").button();

        $("#brushesPanel").dialog({
           closeOnEscape: false, resizable: false, width: 230, autoOpen: false
        });

        $("#brushesPanel").dialog( "option", "position", "left" );
        $("#brushesPanel").bind( "dialogclose", function(event, ui) {$("#brushesPod").show();} );
    },
    destroy: function () {}
}

function onMenuSelectorChange(e) {
    if (STYLES[menu.selector.selectedIndex] == "") {
        return
    }
    strokeManager.destroy(); // XXX: is this needed?
    strokeManager.setStyle(STYLES[menu.selector.selectedIndex]);
    window.location.hash = STYLES[menu.selector.selectedIndex]
}
