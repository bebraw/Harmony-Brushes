/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function shaded() {
    this.init();
}
shaded.prototype = {
    init: function () {
        this.points = [];
    },
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity) {
        this.points.push(cursor.current);

        for (var e = 0; e < this.points.length; e++) {
            g = this.points[e].sub(cursor.current).toDist();

            if (g < 1000) {
                alpha = ((1 - (g / 1000)) * opacity);
                canvas.stroke(cursor.current, this.points[e], color, alpha);
            }
        }
    }
};
