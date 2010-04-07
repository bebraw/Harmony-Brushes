/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function shaded() {
    this.init();
}
shaded.prototype = {
    attributes: {'shading distance': {'type': 'int', 'min': 1, 'max': 100,
        'value': 50}},
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, points, color, opacity) {
        adjacentPoints = points.getWithinRange(points.current,
            function (dist) {
                return dist < 1000;
            },
            1000
        );

        for (var i = 0; i < adjacentPoints.length; i++) {
            currentPoint = adjacentPoints[i].point;
            dist = adjacentPoints[i].dist;

            alpha = ((1 - (dist / 1000)) * opacity);
            canvas.stroke(points.current, currentPoint, color, alpha);
        }
    }
};
