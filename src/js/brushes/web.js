/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function web() {
    this.init();
}
web.prototype = {
    init: function () {
        this.points = [];
    },
    destroy: function () {},
    stroke: function (canvas, cursor, color) {
        var e, b, a, g;
        
        this.points.push(cursor.current);
        count = this.points.length - 1;

        canvas.stroke(cursor.previous, cursor.current, color, 0.5);

        for (e = 0; e < this.points.length; e++) {
            b = this.points[e].x - this.points[count].x;
            a = this.points[e].y - this.points[count].y;
            g = b * b + a * a;
            
            if (g < 2500 && Math.random() > 0.9) {
                canvas.stroke(this.points[count], this.points[e], color, 0.1);
            }
        }
    }
};
