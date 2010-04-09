/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function HorizontalConstraint() {}
HorizontalConstraint.prototype = {
    hotkey: 'a',
    exec: function (toolContext, devices) {
        // TODO: rename + figure out how to modify brush on paint
        toolContext.initialY = devices.mouse.getY();
    }
}
