/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function longfur() {
    this.init();
}
longfur.prototype = {
    init: function () {
        this.points = [];
        this.count = 0;
    },
    destroy: function () {},
    stroke: function (canvas, cursor, color) {
        var f, e, b, a, h;
        
        this.points.push(cursor.current);

        for (f = 0; f < this.points.length; f++) {
            e = -Math.random();
            b = this.points[f].x - this.points[this.count].x;
            a = this.points[f].y - this.points[this.count].y;
            h = b * b + a * a;
            
            if (h < 4000 && Math.random() > h / 4000) {
                begin = {'x': this.points[this.count].x + (b * e),
                    'y': this.points[this.count].y + (a * e)};
                end = {'x': this.points[f].x - (b * e) + Math.random() * 2,
                    'y': this.points[f].y - (a * e) + Math.random() * 2};
                canvas.stroke(begin, end, color, 0.05);
            }
        }

        this.count++
    }
};
