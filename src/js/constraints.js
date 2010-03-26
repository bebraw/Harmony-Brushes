/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
constraints = ["horizontal", "perspective", "vertical"];
importDirectory(constraints, "constraints");

function Constraints() {
    this.init();
}
Constraints.prototype = {
    init: function () {},
    destroy: function () {}
}

//window.onkeydown = onDocumentKeyDown;
//window.onkeyup = onDocumentKeyUp;

function onDocumentKeyDown(a) {
    console.log('key down: ' + a.keyCode);
    //TODO
    //toolManager.checkPress(a.keyCode);
    // toolManager should
    // 1. call devices.keyboard.key(a.keyCode).press();
    // 2. match keycode to tool hotkey
    // 3. exec tool if match was found (note that manager should exec only the
    // first time match is found!!! (JS can trigger press many times without
    // release!)
}
function onDocumentKeyUp(a) {
    console.log('key up: ' + a.keyCode);
    //devices.keyboard.key(a.keyCode).release();
}
