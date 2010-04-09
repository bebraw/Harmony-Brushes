/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function verticalmirror() {}
verticalmirror.prototype = {
    modify: function (point) {
        var canvasHeight = $('.activePage').height();
        
        return new Point(point.x, canvasHeight - point.y);
    }
}
