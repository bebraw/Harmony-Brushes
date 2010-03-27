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
        this.count = 0;
    },
    destroy: function () {},
    stroke: function (canvas, cursor, color) {
        var e, b, a, g;
        
        this.points.push(cursor.current);

        canvas.stroke(cursor.previous, cursor.current, color, 0.5);

        for (e = 0; e < this.points.length; e++) {
            b = this.points[e].x - this.points[this.count].x;
            a = this.points[e].y - this.points[this.count].y;
            g = b * b + a * a;
            
            if (g < 2500 && Math.random() > 0.9) {
                canvas.stroke(this.points[this.count], this.points[e], color, 0.1);
            }
        }
        
        this.count++
    }
};
