/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
modifiers.horizontalmirror = {
    modify: function (point) {
        var canvasWidth = $('.activePage').width();
        
        return new Point(canvasWidth - point.x, point.y);
    }
}
