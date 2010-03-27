/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function chrome() {
    this.init()
}
chrome.prototype = {
    init: function () {
        this.points = [];
    },
    destroy: function () {},
    stroke: function (canvas, cursor, color) {
        var e, b, a, g;
        
        this.points.push(cursor.current);
        count = this.points.length - 1;

        canvas.stroke(cursor.previous, cursor.current, color, 0,1);

        for (e = 0; e < this.points.length; e++) {
            b = this.points[e].x - this.points[count].x;
            a = this.points[e].y - this.points[count].y;
            g = b * b + a * a;

            if (g < 1000) {
                begin = {'x': this.points[count].x + (b * 0.2),
                    'y': this.points[count].y + (a * 0.2)}
                end = {'x': this.points[e].x - (b * 0.2),
                    'y': this.points[e].y - (a * 0.2)};
                randomRGB = [Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255)]

                canvas.stroke(begin, end, randomRGB, 0.1);
            }
        }
    }
};
