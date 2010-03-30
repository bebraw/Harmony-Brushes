/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
var constraints = new Constraints(); // XXX: needed?

var panels = {}
for (var i = 0; i < PANELS.length; i++) {
    panelName = PANELS[i];

    panel = eval("new " + panelName + "()");
    panels[panelName] = panel;

    shortcut.add((i+1).toString(), function(e) {
        keyChar = $.charcode(e);
        keyNum = parseInt(keyChar) - 1;
        panel = PANELS[keyNum];

        if($("#" + panel + "Pod").css('visibility') == 'visible') {
            $("#" + panel + "Pod").click();
        }
        else {
            $("#" + panel + "Panel").dialog('close');
        }
    });
}

// initialize panel UI
for (panelName in panels) {
    panel = panels[panelName];
    panel.initUI();
}
