/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
brushes.sketchy = {
    attributes: {'shading distance': {'type': 'int', 'min': 1, 'max': 100,
        'value': 50}},
    stroke: function (canvas, points, color, opacity) {
        canvas.stroke(points.previous, points.current, color, opacity);

        var adjacentPoints = points.getWithinRange(points.current,
            function (dist) {
                return dist < 4000 && Math.random() > dist / 2000;
            },
            4000
        );

        var fac = 0.3;
        for (var i = 0; i < adjacentPoints.length; i++) {
            var currentPoint = adjacentPoints[i].point;
            var offset = currentPoint.sub(points.current).mul(fac);

            var begin = points.current.add(offset);
            var end = currentPoint.sub(offset);

            canvas.stroke(begin, end, color, opacity);
        }
    }
};
