/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function circles() {
    this.init();
}
circles.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity) {
        var g, l, k, h, f, c, j, a;

        l = cursor.current.x - cursor.previous.x;
        k = cursor.current.y - cursor.previous.y;
        h = Math.sqrt(l * l + k * k) * 2;
        f = Math.floor(cursor.current.x / 100) * 100 + 50;
        c = Math.floor(cursor.current.y / 100) * 100 + 50;
        center = {'x': f, 'y': c};

        j = Math.floor(Math.random() * 10);
        a = h / j;
        for (g = 0; g < j; g++) {
            radius = (j - g) * a
            canvas.circle(center, radius, color, opacity);
        }
    }
};
