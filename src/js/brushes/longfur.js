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

        for (f = 0; f < this.points.length; f++) {
            e = -Math.random();
            sub = this.points[f].sub(cursor.current);
            h = sub.toDist();

            if (h < 4000 && Math.random() > h / 4000) {
                randomPoint = getRandomPoint(2);
                begin = cursor.current.add(sub.mul(e));
                end = this.points[f].sub(sub.mul(e)).add(randomPoint);

                canvas.stroke(begin, end, color, opacity);
            }
        }
    }
};
