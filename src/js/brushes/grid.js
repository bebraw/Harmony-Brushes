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
        var e, a, g, c, b;
        a = Math.round(cursor.current.x / 100) * 100;
        g = Math.round(cursor.current.y / 100) * 100;
        c = (a - cursor.current.x) * 10;
        b = (g - cursor.current.y) * 10;

        for (e = 0; e < 50; e++) {
            begin = {'x': a, 'y': g};
            cp = {'x': cursor.current.x + Math.random() * c , 'y': cursor.current.y + Math.random() * b};
            end = {'x': a, 'y': g};
            canvas.quadraticCurve(begin, cp, end, color, opacity);
        }
    }
};
