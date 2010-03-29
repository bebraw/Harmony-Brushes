/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function cleanPopUps() {
    if (isForegroundColorSelectorVisible) {
        foregroundColorSelector.hide();
        isForegroundColorSelectorVisible = false
    }
    if (isBackgroundColorSelectorVisible) {
        backgroundColorSelector.hide();
        isBackgroundColorSelectorVisible = false
    }
    if (isAboutVisible) {
        about.hide();
        isAboutVisible = false
    }
};

function setUpPod(name) {
    id = name.toLowerCase();
    podId = id + "Pod";
    checkboxId = id + "Checkbox";
    //<input type="checkbox" id="horizontalMirrorModifier" /><label for="horizontalMirrorModifier">Horizontal Mirror</label> \
    $("#pods").append('<div style="display: inline;" id="' + podId + '"><input type="checkbox" id="' +
        checkboxId + '" /><label for="'+ checkboxId +'">' + name + '</label></div>');

    $("#" + checkboxId).button();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Point(x, y) {
    this.init(x, y);
}
Point.prototype = {
    init: function(x, y) {
        this.x = x;
        this.y = y;
    },
    destroy: function() {},
    clone: function() {
        return new Point(this.x, this.y);
    }
}
