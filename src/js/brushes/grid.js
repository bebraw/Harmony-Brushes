/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function grid() {
    this.init();
}
grid.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, points, color, opacity) {
        a = points.current.div(100).round().mul(100);
        b = a.sub(points.current).mul(10);

        for (e = 0; e < 50; e++) {
            cp = points.current.add(b.mul(getRandomPoint()));
            canvas.quadraticCurve(a, cp, a, color, opacity);
        }
    }
};
