/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function web() {
    this.init();
}
web.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, points, color, opacity) {
        canvas.stroke(points.previous, points.current, color, opacity);

        adjacentPoints = points.getWithinRange(points.current,
            function (dist) {
                return dist < 2500 && Math.random() > 0.9;
            }
        );

        for (var i = 0; i < adjacentPoints.length; i++) {
            currentPoint = adjacentPoints[i].point;

            canvas.stroke(points.current, currentPoint, color, opacity / 2);
        }
    }
};
