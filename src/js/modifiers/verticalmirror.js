/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function verticalmirror() {
    this.init();
}
verticalmirror.prototype = {
    init: function () {},
    destroy: function () {},
    modify: function (point) {
        return new Point(point.x, window.innerHeight - point.y);
    }
}
