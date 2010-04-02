/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function sketchy() {
    this.init()
}
sketchy.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity, points) {
        canvas.stroke(cursor.previous, cursor.current, color, opacity);

        for (var i = 0; i < points.length; i++) {
            sub = points[i].sub(cursor.current);
            g = sub.toDist();

            if (g < 4000 && Math.random() > g / 2000) {
                fac = 0.3;
                begin = cursor.current.add(sub.mul(fac));
                end = points[i].sub(sub.mul(fac));

                canvas.stroke(begin, end, color, opacity);
            }
        }
    }
};
