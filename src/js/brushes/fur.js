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
    stroke: function (canvas, points, color, opacity) {
        canvas.stroke(points.previous, points.current, color, opacity);

        for (e = 0; e < points.length; e++) {
            sub = points[e].sub(points.current);
            g = sub.toDist();

            if (g < 2000 && Math.random() > g / 2000) {
                fac = 0.5;
                begin = points.current.add(sub.mul(fac));
                end = points.current.sub(sub.mul(fac));

                canvas.stroke(begin, end, color, 0.1);
            }
        }
    }
};
