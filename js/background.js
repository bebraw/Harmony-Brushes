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
    },
    destroy: function () {}
}
