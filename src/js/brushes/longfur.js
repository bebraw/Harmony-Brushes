/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function longfur() {
    this.init();
}
longfur.prototype = {
    init: function () {
        this.points = [];
    },
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity) {
        this.points.push(cursor.current);

        for (e = 0; e < this.points.length; e++) {
            r = -Math.random();
            sub = this.points[e].sub(cursor.current);
            g = sub.toDist();

            if (g < 4000 && Math.random() > g / 4000) {
                randomPoint = getRandomPoint(2);
                begin = cursor.current.add(sub.mul(r));
                end = this.points[e].sub(sub.mul(r)).add(randomPoint);

                canvas.stroke(begin, end, color, opacity);
            }
        }
    }
};
