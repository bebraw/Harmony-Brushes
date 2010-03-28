/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function simple() {
    this.init();
}
simple.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity) {
        canvas.stroke(cursor.previous, cursor.current, color, opacity);
    }
};
