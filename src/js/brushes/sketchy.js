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
    stroke: function (canvas, points, color, opacity) {
        canvas.stroke(points.previous, points.current, color, opacity);

        adjacentPoints = points.getWithinRange(points.current,
            function (dist) {
                return dist < 4000 && Math.random() > dist / 2000;
            }
        );

        fac = 0.3;
        for (var i = 0; i < adjacentPoints.length; i++) {
            currentPoint = adjacentPoints[i].point;
            offset = currentPoint.sub(points.current).mul(fac);

            begin = points.current.add(offset);
            end = currentPoint.sub(offset);

            canvas.stroke(begin, end, color, opacity);
        }
    }
};
