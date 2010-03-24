//document.body.style.backgroundColor = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] + ", " + BACKGROUND_COLOR[2] + ")";

function Background() {
    this.init();
}
Background.prototype = {
    init: function () {
        setUpPod("Background");

        $('#backgroundPod').click(function() {
            $(this).hide();
            $('#background').dialog('open');
        });

        // set up background panel
        $("body").append('<div class="panel" id="background" title="Background"> \
            background options \
            </div>');

        $("#background button").button();

        $("#background").dialog({
           closeOnEscape: false, resizable: false, width: 230, autoOpen: false
        });

        $("#background").dialog( "option", "position", ["left", "bottom"] );
        $("#background").bind( "dialogclose", function(event, ui) { $("#backgroundPod").show();} );
    },
    destroy: function () {}
}
