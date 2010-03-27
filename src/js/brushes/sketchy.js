/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function sketchy() {
    this.init()
}
sketchy.prototype = {
    init: function () {
        this.points = [];
        this.count = 0;
    },
    destroy: function () {},
    stroke: function (canvas, cursor, color) {
        this.points.push(cursor.current);

        canvas.stroke(cursor.previous, cursor.current, color, 0.05);

        for (e = 0; e < this.points.length; e++) {
            b = this.points[e].x - this.points[this.count].x;
            a = this.points[e].y - this.points[this.count].y;
            g = b * b + a * a;
            
            if (g < 4000 && Math.random() > g / 2000) {
                begin = {'x': this.points[this.count].x + (b * 0.3),
                    'y': this.points[this.count].y + (a * 0.3)};
                end = {'x': this.points[e].x - (b * 0.3),
                    'y': this.points[e].y - (a * 0.3)};

                canvas.stroke(begin, end, color, 0.05);
            }
        }
        
        this.count++
    }
};
