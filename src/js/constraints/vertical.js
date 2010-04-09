/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function VerticalConstraint() {}
VerticalConstraint.prototype = {
    hotkey: 's',
    exec: function (toolContext, devices) {
        toolContext.initialX = devices.mouse.getX();
    }
}
