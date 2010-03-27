/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function menu() {
    this.init()
}
menu.prototype = {
    init: function () {
        setUpPod("Menu");

        $('#menuPod').click(function() {
            $(this).hide();
            $('#menuCheckbox').attr('checked', false);
            $('#menuPanel').dialog('open');
        });

        // set up menu panel
        $("body").append('<div class="panel" id="menuPanel" title="Menu"> \
            <button id="menuNew">New</button> \
            <button id="menuLoad">Load</button> \
            <button id="menuSave">Save</button> \
            <button id="menuExport">Export</button> \
            <button id="menuAbout">About</button> \
        </div>');

        $("#menuPanel button").button();

        $("#menuPanel").dialog({
           closeOnEscape: false, resizable: false, width: 230, autoOpen: false
        });

        $("#menuPanel").dialog("option", "position", "top");
        $("#menuPanel").dialog("option", "width", 325);
        $("#menuPanel").dialog("option", "height", 60);
        $("#menuPanel").bind("dialogclose",
            function(event, ui) {$("#menuPod").show();}
        );

        // TODO: hook up events to menu items!

        $('#menuNew').click(function() {
            // XXX: force canvas to rerender itself + reset undo
            canvas = document.getElementById("canvas");
            context = canvas.getContext("2d");
            context.fillStyle = 'white';
            context.fillRect(0, 0, window.innerWidth, window.innerHeight);

            //strokeManager.initUndo();
            //strokeManager.setStyle(STYLES[menu.selector.selectedIndex]);
        });

        $('#menuLoad').click(function() {
            console.log('load');
        });

        $('#menuSave').click(function() {
            console.log('save');

            /*
            var a = flattenCanvas.getContext("2d");
            a.fillStyle = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] +
                ", " + BACKGROUND_COLOR[2] + ")";
            a.fillRect(0, 0, canvas.width, canvas.height);
            a.drawImage(canvas, 0, 0);
            window.open(flattenCanvas.toDataURL("image/png"), "mywindow")
            */
        });

        $('#menuExport').click(function() {
            console.log('export');
        });

        // set up about dialog
        $("body").append('<div id="aboutDialog" title="About"> \
            <p>Harmony v. 0.1</p> \
            <a href="http://mrdoob.com/blog/post/689" target="_blank">More info</a> \
            <p>Add info about constraint system here!</p> \
        </div>');

        $("#aboutDialog").dialog({
                height: 140, modal: true, autoOpen: false
        });

        $('#menuAbout').click(function() {
            $('#aboutDialog').dialog('open');
        });
    }
};
