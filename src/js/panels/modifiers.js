/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
// import brush modifiers
modifiers = ["mirror"]; // "jitter"
importDirectory(modifiers, "modifiers");

function Modifiers() {
    this.init();
}
Modifiers.prototype = {
    init: function () {
        setUpPod("Modifiers");

        $('#modifiersPod').click(function() {
            $(this).hide();
            $('#modifiersCheckbox').attr('checked', false);
            $('#modifiersPanel').dialog('open');
        });

        // <input type="checkbox" id="check" /><label for="check">Toggle</label>

        // set up modifiers panel
        $("body").append('<div class="panel" id="modifiersPanel" title="Modifiers"> \
            <input type="checkbox" id="horizontalMirrorModifier" /><label for="horizontalMirrorModifier">Horizontal Mirror</label> \
            <input type="checkbox" id="verticalMirrorModifier" /><label for="verticalMirrorModifier">Vertical Mirror</label> \
            <input type="checkbox" id="radialMirrorModifier" /><label for="radialMirrorModifier">Radial Mirror</label> \
            <input type="checkbox" id="jitterModifier" /><label for="jitterModifier">Jitter</label> \
            </div>');

        $("#modifiersPanel input").button();
        $("#modifiersPanel label").css("width", "100%").css("margin-bottom", "0.5em");

        $("#modifiersPanel").dialog({
           closeOnEscape: false, resizable: false, width: 150, autoOpen: false
        });

        $("#modifiersPanel").dialog( "option", "position", ["right", "top"] );
        $("#modifiersPanel").bind( "dialogclose", function(event, ui) { $("#modifiersPod").show();} );
    },
    destroy: function () {}
}
