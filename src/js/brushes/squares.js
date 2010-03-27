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
    stroke: function (canvas, cursor, color)  {
        var b, a, g, e, c;
        b = cursor.current.x - cursor.previous.x;
        a = cursor.current.y - cursor.previous.y;
        g = 1.57079633;
        e = Math.cos(g) * b - Math.sin(g) * a;
        c = Math.sin(g) * b + Math.cos(g) * a;

        firstCorner = {'x': cursor.previous.x - e, 'y': cursor.previous.y - c};
        secondCorner = {'x': cursor.previous.x + e, 'y': cursor.previous.y + c};
        thirdCorner = {'x': cursor.current.x + e, 'y': cursor.current.y + c};
        fourthCorner = {'x': cursor.current.x - e, 'y': cursor.current.y - c};

        canvas.rect(firstCorner, secondCorner, thirdCorner, fourthCorner,
            color, 1.0);
    }
};
