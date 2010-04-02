/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function fur() {
    this.init();
}
fur.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity, points) {
        canvas.stroke(cursor.previous, cursor.current, color, opacity);

        for (e = 0; e < points.length; e++) {
            sub = points[e].sub(cursor.current);
            g = sub.toDist();

            if (g < 2000 && Math.random() > g / 2000) {
                fac = 0.5;
                begin = cursor.current.add(sub.mul(fac));
                end = cursor.current.sub(sub.mul(fac));

                canvas.stroke(begin, end, color, 0.1);
            }
        }
    }
};
