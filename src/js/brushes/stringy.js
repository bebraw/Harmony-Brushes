/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function stringy() {
    this.init();
}
stringy.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, points, color, opacity) {
        canvas.stroke(points.previous, points.current, color, opacity);

        pointsMin = Math.max(points.content.length - 15, 0);
        for (var i=points.content.length - 1; i >= pointsMin; i--) {
            end = points.content[i]; // XXX: not ok!
            canvas.stroke(points.current, end, color, opacity / 2);
        }
    }
};

