/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
brushes.shaded = {
    attributes: {'shading distance': {'type': 'int', 'min': 1, 'max': 100,
        'value': 50}},
    stroke: function (canvas, points, color, opacity) {
        var adjacentPoints = points.getWithinRange(points.current,
            function (dist) {
                return dist < 1000;
            },
            1000
        );

        for (var i = 0; i < adjacentPoints.length; i++) {
            var currentPoint = adjacentPoints[i].point;
            var dist = adjacentPoints[i].dist;

            var alpha = ((1 - (dist / 1000)) * opacity);
            canvas.stroke(points.current, currentPoint, color, alpha);
        }
    }
};
