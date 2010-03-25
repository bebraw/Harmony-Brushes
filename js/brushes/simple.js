/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function simple(a) {
    this.init(a)
}
simple.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    init: function (a) {
        this.context = a;
        this.context.globalCompositeOperation = "source-over";
        this.context.lineWidth = 0.5
    },
    destroy: function () {},
    strokeStart: function (b, a, color) {
        this.prevMouseX = b;
        this.prevMouseY = a;
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", 0.5)"
    },
    stroke: function (b, a, color) {
        this.context.beginPath();
        this.context.moveTo(this.prevMouseX, this.prevMouseY);
        this.context.lineTo(b, a);
        this.context.stroke();
        this.prevMouseX = b;
        this.prevMouseY = a
    },
    strokeEnd: function (b, a, color) {}
};
