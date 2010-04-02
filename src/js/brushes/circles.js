/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function circles() {
    this.init();
}
circles.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, points, color, opacity) {
        center = points.current.div(100).floor().mul(100).add(50);
        sub = points.current.sub(points.previous);
        j = Math.floor(Math.random() * 10);
        a = sub.toDist() * 2 / j;
        
        for (g = 0; g < j; g++) {
            radius = (j - g) * a
            canvas.circle(center, radius, color, opacity);
        }
    }
};
