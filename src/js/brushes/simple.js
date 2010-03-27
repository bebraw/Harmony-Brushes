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
    stroke: function (canvas, cursor, color) {
        // XXX: pass alpha too?
        canvas.stroke(cursor.previous, cursor.current, color, 0.5);
    }
};
