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
    stroke: function (canvas, cursor, color) {
        var e, b, a, g;

        this.points.push(cursor.current);
        count = this.points.length - 1;

        for (e = 0; e < this.points.length; e++) {
            b = this.points[e].x - this.points[count].x;
            a = this.points[e].y - this.points[count].y;
            g = b * b + a * a;

            if (g < 1000) {
                alpha = ((1 - (g / 1000)) * 0.1);
                canvas.stroke(this.points[count], this.points[e], color,
                    alpha);
            }
        }
    }
};
