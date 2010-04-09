/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function fur() {}
fur.prototype = {
    attributes: {'shading distance': {'type': 'int', 'min': 1, 'max': 100,
        'value': 50}},
    stroke: function (canvas, points, color, opacity) {
        canvas.stroke(points.previous, points.current, color, opacity);

        var adjacentPoints = points.getWithinRange(points.current,
            function (dist) {
                return dist < 2000 && Math.random() > dist / 2000;
            },
            2000
        );

        var fac = 0.5;
        for (var i = 0; i < adjacentPoints.length; i++) {
            var currentPoint = adjacentPoints[i].point;
            var offset = currentPoint.sub(points.current).mul(fac);

            var begin = points.current.add(offset);
            var end = points.current.sub(offset);

            canvas.stroke(begin, end, color, 0.1);
        }
    }
};
