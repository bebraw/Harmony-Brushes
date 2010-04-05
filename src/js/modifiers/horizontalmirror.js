/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function horizontalmirror() {
    this.init();
}
horizontalmirror.prototype = {
    init: function () {},
    destroy: function () {},
    modify: function (point) {
        var canvasWidth = $('.activePage').width();
        return new Point(canvasWidth - point.x, point.y);
    }
}
