/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
brushes.circles = {
    stroke: function (canvas, points, color, opacity) {
        var center = points.current.div(100).floor().mul(100).add(50);
        var sub = points.current.sub(points.previous);
        var j = Math.floor(Math.random() * 10);
        var a = sub.toDist() * 2 / j;
        
        for (var i = 0; i < j; i++) {
            var radius = (j - i) * a;

            canvas.circle(center, radius, color, opacity);
        }
    }
};
