/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function squares(a) {
    this.init(a)
}
squares.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    init: function (a) {
        this.context = a;
        this.context.globalCompositeOperation = "source-over";
        this.context.fillStyle = "rgb(255, 255, 255)";
        this.context.lineWidth = 1
    },
    destroy: function () {},
    strokeStart: function (b, a, color) {
        this.prevMouseX = b;
        this.prevMouseY = a;
        this.context.strokeStyle = "rgb(" + color[0] + ", " + color[1] +
            ", " + color[2] + ")"
    },
    stroke: function (f, d, color) {
        var b, a, g, e, c;
        b = f - this.prevMouseX;
        a = d - this.prevMouseY;
        g = 1.57079633;
        e = Math.cos(g) * b - Math.sin(g) * a;
        c = Math.sin(g) * b + Math.cos(g) * a;
        this.context.beginPath();
        this.context.moveTo(this.prevMouseX - e, this.prevMouseY - c);
        this.context.lineTo(this.prevMouseX + e, this.prevMouseY + c);
        this.context.lineTo(f + e, d + c);
        this.context.lineTo(f - e, d - c);
        this.context.lineTo(this.prevMouseX - e, this.prevMouseY - c);
        this.context.fill();
        this.context.stroke();
        this.prevMouseX = f;
        this.prevMouseY = d
    },
    strokeEnd: function (b, a, color) {}
};
