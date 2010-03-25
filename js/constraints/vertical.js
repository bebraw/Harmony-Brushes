/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function VerticalConstraint() {
    this.init();
}
VerticalConstraint.prototype = {
    hotkey: 's',
    init: function () {},
    destroy: function () {},
    exec: function (toolContext, devices) {
        toolContext.initialX = devices.mouse.getX();
    }
}
