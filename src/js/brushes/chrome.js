/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
brushes.chrome = {
    attributes: {'shading distance': {'type': 'int', 'min': 1, 'max': 100,
        'value': 50}},
    stroke: function (canvas, points, color, opacity) {
        canvas.stroke(points.previous, points.current, color, opacity);

        var adjacentPoints = points.getWithinRange(points.current,
            function (dist) {
                return dist < 1000;
            },
            1000
        );

        var fac = 0.2;
        for (var i = 0; i < adjacentPoints.length; i++) {
            var currentPoint = adjacentPoints[i].point;
            var offset = currentPoint.sub(points.current).mul(fac);

            var begin = points.current.add(offset);
            var end = currentPoint.sub(offset);

            var randomRGB = [Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)];

            canvas.stroke(begin, end, randomRGB, 0.1);
        }
    }
};
