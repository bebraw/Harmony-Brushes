/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function setUpPanel(parentId, name, panelPosition, panelWidth, panelHeight) {
    var id = name.toLowerCase();
    var panelId = id + "Panel";

    $("#" + parentId).append('<div class="panel" id="' + panelId +
        '" title="' + name + '" style="padding: 1em 1em 1em 1em"></div>');

    $("#" + panelId + " input").button();
    $("#" + panelId + " label").css("width", "130px").css("margin-bottom", "0.5em");

    $("#" + parentId).css('width', panelWidth);

    if(panelHeight) {
        $("#" + parentId).css('height', panelHeight);
    }
}
