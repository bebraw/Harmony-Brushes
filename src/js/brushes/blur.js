/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function blur() {
    this.init();
}
blur.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, points, color, opacity) {

        // this should apply gaussian blur on given radius based on current point

        canvas.blur(points.current, 25);

        //canvas.stroke(points.previous, points.current, color, opacity);
    }
};
