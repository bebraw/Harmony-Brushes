/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function Palette() {
    this.init();
}
Palette.prototype = {
    init: function () {
        setUpPod("Palette");

        $('#palettePod').click(function() {
            $(this).hide();
            $('#paletteCheckbox').attr('checked', false);
            $('#palettePanel').dialog('open');
        });

        // set up palette panel
        $("body").append('<div class="panel" id="palettePanel" title="Palette"><div id="colorPicker"/></div></div>');

        $('#colorPicker').ColorPicker({flat: true});

        //$("#palettePanel button").button();

        $("#palettePanel").dialog({
           closeOnEscape: false, resizable: false, width: 380, height: 210,
           autoOpen: false
        });

        $("#palettePanel").dialog( "option", "position", "right" );
        $("#palettePanel").bind( "dialogclose", function(event, ui) {$("#palettePod").show();} );
    },
    destroy: function () {}
}
