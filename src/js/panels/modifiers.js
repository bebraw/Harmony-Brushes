/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function modifiers() {
    this.init();
}
modifiers.prototype = {
    init: function () {
        setUpPod("Modifiers");

        $('#modifiersPod').click(function() {
            $(this).hide();
            $('#modifiersCheckbox').attr('checked', false);
            $('#modifiersPanel').dialog('open');
        });

        // set up modifiers panel
        $("body").append('<div class="panel" id="modifiersPanel" title="Modifiers"></div>');

        for (i = 0; i < MODIFIERS.length; i++) {
            modifierName = MODIFIERS[i];
            modifierId = modifierName + 'Modifier';

            $("#modifiersPanel").append('<input type="checkbox" id="' +
                modifierId + '" /><label for="' + modifierId + '">' +
                modifierName + '</label>');
        }

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
