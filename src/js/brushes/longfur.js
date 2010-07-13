/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
brushes.longfur = {
    attributes: {'shading distance': {'type': 'int', 'min': 1, 'max': 100,
        'value': 50}},
    stroke: function (canvas, points, color, opacity) {
        var adjacentPoints = points.getWithinRange(points.current,
            function (dist) {
                return dist < 4000 && Math.random() > dist / 4000;
            },
            4000
        );

        for (var i = 0; i < adjacentPoints.length; i++) {
            var fac = -Math.random();
            var currentPoint = adjacentPoints[i].point;
            var offset = currentPoint.sub(points.current).mul(fac);

            var randomPoint = getRandomPoint(2);
            var begin = points.current.add(offset);
            var end = currentPoint.sub(offset).add(randomPoint);

            canvas.stroke(begin, end, color, opacity);
        }
    }
};
