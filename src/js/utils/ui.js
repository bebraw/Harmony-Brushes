/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function setUpPanel(name, panelPosition, panelWidth, panelHeight) {
    var id = name.toLowerCase();
    var panelId = id + "Panel";
    var podId = id + "Pod";
    var checkboxId = id + "Checkbox";
    
    // pod
    $("#pods").append('<div style="display: inline;" id="' + podId + '"><input type="checkbox" id="' +
        checkboxId + '" /><label for="'+ checkboxId +'">' + name + '</label></div>');

    $("#" + checkboxId).button();

    $('#' + podId).click(function() {
        $(this).css('visibility', 'hidden');
        $('#' + checkboxId).attr('checked', false);
        $('#' + panelId).dialog('open');
    });

    // panel
    $("body").append('<div class="panel" id="' + panelId + '" title="' + name + '">\
        </div>');

    $("#" + panelId + " input").button();
    $("#" + panelId + " label").css("width", "130px").css("margin-bottom", "0.5em");

    $("#" + panelId).dialog({
       closeOnEscape: false,
       resizable: false,
       width: panelWidth,
       autoOpen: false,
       position: panelPosition
    });

    if(panelHeight) {
        $("#" + panelId).dialog("option", "height", panelHeight);
    }

    $("#" + panelId).bind( "dialogclose", function(event, ui) {
        $("#" + podId).css("visibility", "visible");}
    );
}
