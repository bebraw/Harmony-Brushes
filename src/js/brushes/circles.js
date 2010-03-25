/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function circles(a) {
    this.init(a)
}
circles.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    points: null,
    count: null,
    init: function (a) {
        this.context = a;
        this.context.lineWidth = 1;
        this.context.globalCompositeOperation = "source-over";
        this.points = new Array()
    },
    destroy: function () {},
    strokeStart: function (b, a, color) {
        this.prevMouseX = b;
        this.prevMouseY = a;
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", 0.1)"
    },
    stroke: function (e, b, color) {
        var g, l, k, h, f, c, j, a;
        this.points.push([e, b]);
        l = e - this.prevMouseX;
        k = b - this.prevMouseY;
        h = Math.sqrt(l * l + k * k) * 2;
        f = Math.floor(e / 100) * 100 + 50;
        c = Math.floor(b / 100) * 100 + 50;
        j = Math.floor(Math.random() * 10);
        a = h / j;
        for (g = 0; g < j; g++) {
            this.context.beginPath();
            this.context.arc(f, c, (j - g) * a, 0, Math.PI * 2, true);
            this.context.stroke()
        }
        this.prevMouseX = e;
        this.prevMouseY = b
    },
    strokeEnd: function (b, a, color) {}
};
