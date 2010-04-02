/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function shaded() {
    this.init();
}
shaded.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity, points) {
        for (var e = 0; e < points.length; e++) {
            g = points[e].sub(cursor.current).toDist();

            if (g < 1000) {
                alpha = ((1 - (g / 1000)) * opacity);
                canvas.stroke(cursor.current, points[e], color, alpha);
            }
        }
    }
};
