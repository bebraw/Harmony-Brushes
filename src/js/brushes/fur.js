/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function fur(a) {
    this.init(a)
}
fur.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    points: null,
    count: null,
    init: function (a) {
        this.context = a;
        this.context.lineWidth = 1;
        this.points = new Array();
        this.count = 0
    },
    destroy: function () {},
    strokeStart: function (b, a, color) {
        this.prevMouseX = b;
        this.prevMouseY = a;
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", 0.1)"
    },
    stroke: function (f, c, color) {
        var e, b, a, g;
        this.points.push([f, c]);
        this.context.beginPath();
        this.context.moveTo(this.prevMouseX, this.prevMouseY);
        this.context.lineTo(f, c);
        this.context.stroke();
        for (e = 0; e < this.points.length; e++) {
            b = this.points[e][0] - this.points[this.count][0];
            a = this.points[e][1] - this.points[this.count][1];
            g = b * b + a * a;
            if (g < 2000 && Math.random() > g / 2000) {
                this.context.beginPath();
                this.context.moveTo(f + (b * 0.5), c + (a * 0.5));
                this.context.lineTo(f - (b * 0.5), c - (a * 0.5));
                this.context.stroke()
            }
        }
        this.prevMouseX = f;
        this.prevMouseY = c;
        this.count++
    },
    strokeEnd: function (b, a, color) {}
};