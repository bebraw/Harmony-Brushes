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

        adjacentPoints = points.getWithinRange(points.current,
            function (dist) {
                return dist < 2000 && Math.random() > dist / 2000;
            }
        );

        fac = 0.5;
        for (var i = 0; i < adjacentPoints.length; i++) {
            currentPoint = adjacentPoints[i];
            offset = currentPoint.sub(points.current).mul(fac);

            begin = points.current.add(offset);
            end = points.current.sub(offset);

            canvas.stroke(begin, end, color, 0.1);
        }
    }
};
