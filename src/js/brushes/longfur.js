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
    stroke: function (canvas, points, color, opacity) {
        adjacentPoints = points.getWithinRange(points.current,
            function (dist) {
                return dist < 4000 && Math.random() > dist / 4000;
            }
        );

        for (var i = 0; i < adjacentPoints.length; i++) {
            fac = -Math.random();
            currentPoint = adjacentPoints[i].point;
            offset = currentPoint.sub(points.current).mul(fac);

            randomPoint = getRandomPoint(2);
            begin = points.current.add(offset);
            end = currentPoint.sub(offset).add(randomPoint);

            canvas.stroke(begin, end, color, opacity);
        }
    }
};
