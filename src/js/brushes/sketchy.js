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
        this.points.push([cursor.current.x, cursor.current.y]);

        canvas.stroke(cursor.previous, cursor.current, color, 0.05);

        for (e = 0; e < this.points.length; e++) {
            b = this.points[e][0] - this.points[this.count][0];
            a = this.points[e][1] - this.points[this.count][1];
            g = b * b + a * a;
            
            if (g < 4000 && Math.random() > g / 2000) {
                begin = {'x': this.points[this.count][0] + (b * 0.3),
                    'y': this.points[this.count][1] + (a * 0.3)};
                end = {'x': this.points[e][0] - (b * 0.3),
                    'y': this.points[e][1] - (a * 0.3)};

                canvas.stroke(begin, end, color, 0.05);
            }
        }
        
        this.count++
    }
};
