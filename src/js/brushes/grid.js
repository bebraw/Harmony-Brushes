/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
brushes.grid = {
    stroke: function (canvas, points, color, opacity) {
        var a = points.current.div(100).round().mul(100);
        var b = a.sub(points.current).mul(10);

        for(var i = 0; i < 50; i++) {
            var cp = points.current.add(b.mul(getRandomPoint()));
            canvas.quadraticCurve(a, cp, a, color, opacity);
        }
    }
};
