/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function longfur() {
    this.init();
}
longfur.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity, points) {
        for (var i = 0; i < points.length; i++) {
            r = -Math.random();
            sub = points[i].sub(cursor.current);
            g = sub.toDist();

            if (g < 4000 && Math.random() > g / 4000) {
                randomPoint = getRandomPoint(2);
                begin = cursor.current.add(sub.mul(r));
                end = points[i].sub(sub.mul(r)).add(randomPoint);

                canvas.stroke(begin, end, color, opacity);
            }
        }
    }
};
