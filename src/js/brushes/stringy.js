/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
brushes.stringy = {
    stroke: function (canvas, points, color, opacity) {
        canvas.stroke(points.previous, points.current, color, opacity);

        var pointsMin = Math.max(points.content.length - 15, 0);
        for (var i=points.content.length - 1; i >= pointsMin; i--) {
            var end = points.content[i]; // XXX: not ok!
            canvas.stroke(points.current, end, color, opacity / 2);
        }
    }
};

