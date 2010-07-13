/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
brushes.blur = {
    stroke: function (canvas, points, color, opacity) {
        canvas.blur(points.current, 25);
    }
};
