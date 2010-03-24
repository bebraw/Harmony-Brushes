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
            $('#modifiers').dialog('open');
        });

        // set up modifiers panel
        $("body").append('<div class="panel" id="modifiers" title="Modifiers"> \
            <button style="margin-bottom:0.5em; width: 100%">Horizontal Mirror</button> \
            <button style="margin-bottom:0.5em; width: 100%">Vertical Mirror</button> \
            <button style="margin-bottom:0.5em; width: 100%">Radial Mirror</button> \
            <button style="width: 100%">Jitter</button> \
            </div>');

        $("#modifiers button").button();

        $("#modifiers").dialog({
           closeOnEscape: false, resizable: false, width: 230, autoOpen: false
        });

        $("#modifiers").dialog( "option", "position", ["right", "top"] );
        $("#modifiers").bind( "dialogclose", function(event, ui) { $("#modifiersPod").show();} );
    },
    destroy: function () {}
}
