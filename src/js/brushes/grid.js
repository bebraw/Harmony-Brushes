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
    stroke: function (canvas, cursor, color, opacity) {
        a = cursor.current.div(100).round().mul(100);
        b = a.sub(cursor.current).mul(10);

        for (e = 0; e < 50; e++) {
            cp = cursor.current.add(b.mul(getRandomPoint()));
            canvas.quadraticCurve(a, cp, a, color, opacity);
        }
    }
};
