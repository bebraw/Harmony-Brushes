/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function web() {
    this.init();
}
web.prototype = {
    init: function () {
        this.points = [];
    },
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity) {
        this.points.push(cursor.current);

        canvas.stroke(cursor.previous, cursor.current, color, opacity);

        for (var e = 0; e < this.points.length; e++) {
            g = this.points[e].sub(cursor.current).toDist();
            
            if (g < 2500 && Math.random() > 0.9) {
                canvas.stroke(cursor.current, this.points[e], color,
                    opacity / 2);
            }
        }
    }
};
