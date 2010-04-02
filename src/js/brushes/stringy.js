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
    },
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity) {
        this.points.push(cursor.current);

        canvas.stroke(cursor.previous, cursor.current, color, opacity);

        pointsMin = Math.max(this.points.length - 15, 0);
        for (var i=this.points.length - 1; i >= pointsMin; i--) {
            end = this.points[i];
            canvas.stroke(cursor.current, end, color, opacity / 2);
        }
    }
};

