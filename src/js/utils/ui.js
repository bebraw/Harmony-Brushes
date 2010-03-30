/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function setUpPod(name) {
    id = name.toLowerCase();
    podId = id + "Pod";
    checkboxId = id + "Checkbox";
    //<input type="checkbox" id="horizontalMirrorModifier" /><label for="horizontalMirrorModifier">Horizontal Mirror</label> \
    $("#pods").append('<div style="display: inline;" id="' + podId + '"><input type="checkbox" id="' +
        checkboxId + '" /><label for="'+ checkboxId +'">' + name + '</label></div>');

    $("#" + checkboxId).button();
}
