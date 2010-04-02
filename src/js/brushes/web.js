/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function web() {
    this.init();
}
web.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, points, color, opacity) {
        canvas.stroke(points.previous, points.current, color, opacity);

        for (var i = 0; i < points.length; i++) {
            g = points[i].sub(points.current).toDist();
            
            if (g < 2500 && Math.random() > 0.9) {
                canvas.stroke(points.current, points[i], color, opacity / 2);
            }
        }
    }
};
