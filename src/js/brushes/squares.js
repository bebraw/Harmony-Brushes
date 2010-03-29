/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function squares() {
    this.init()
}
squares.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity)  {
        var b, a, g, e, c;
        b = cursor.current.x - cursor.previous.x;
        a = cursor.current.y - cursor.previous.y;
        g = 1.57079633;
        e = Math.cos(g) * b - Math.sin(g) * a;
        c = Math.sin(g) * b + Math.cos(g) * a;

        firstCorner = new Point(cursor.previous.x - e, cursor.previous.y - c);
        secondCorner = new Point(cursor.previous.x + e, cursor.previous.y + c);
        thirdCorner = new Point(cursor.current.x + e, cursor.current.y + c);
        fourthCorner = new Point(cursor.current.x - e, cursor.current.y - c);

        canvas.rect(firstCorner, secondCorner, thirdCorner, fourthCorner,
            color, opacity);
    }
};
