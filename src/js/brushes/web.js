/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
brushes.web = {
    attributes: {'shading distance': {'type': 'int', 'min': 1, 'max': 100,
        'value': 50}},
    stroke: function (canvas, points, color, opacity) {
        canvas.stroke(points.previous, points.current, color, opacity);

        var adjacentPoints = points.getWithinRange(points.current,
            function (dist) {
                return dist < 2500 && Math.random() > 0.9;
            },
            2500
        );

        for (var i = 0; i < adjacentPoints.length; i++) {
            var currentPoint = adjacentPoints[i].point;

            canvas.stroke(points.current, currentPoint, color, opacity / 2);
        }
    }
};
