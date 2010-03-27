/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function stringy() {
    this.init();
}
stringy.prototype = {
    init: function () {
        this.points = [];
        this.count = 0
    },
    destroy: function () {},
    stroke: function (canvas, cursor, color) {
        var FACTOR = 10, 
            HISTORY = 15,
            sliced,
            e,
            c = cursor.current.x + (Math.random() - 0.5) * FACTOR,
            d = cursor.current.y + (Math.random() - 0.5) * FACTOR;

        if (this.count) {
            this.points.push([c, d]);

            point = {'x': c, 'y': d};
            canvas.stroke(cursor.previous, point, color, 0.5);

            sliced = this.points.slice(this.points.length - HISTORY,
                this.points.length);
            for (e=0; e < sliced.length; e++) {
                end = {'x': sliced[e][0], 'y': sliced[e][1]};
                canvas.stroke(point, end, color, 0.15);
            }
        }
        this.count++;
    }
};

