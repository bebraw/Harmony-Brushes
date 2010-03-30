/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
var constraints = new Constraints();

var panels = {}
// note that due JS namespaces i is visible at instance init! -> better use j
for (j = 0; j < PANELS.length; j++) {
    panelName = PANELS[j];

    panel = eval("new " + panelName + "()");
    panels[panelName] = panel;

    shortcut.add((j+1).toString(), function(e) {
        keyChar = $.charcode(e);
        keyNum = parseInt(keyChar) - 1;
        panel = PANELS[keyNum];

        // TODO: check visible status
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
