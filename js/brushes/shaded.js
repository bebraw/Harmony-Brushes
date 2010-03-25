/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function shaded(a) {
    this.init(a)
}
shaded.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    points: null,
    count: null,
    init: function (a) {
        this.context = a;
        this.context.lineWidth = 1;
        this.context.globalCompositeOperation = "source-over";
        this.points = new Array();
        this.count = 0
    },
    destroy: function () {},
    strokeStart: function (b, a, color) {
        this.prevMouseX = b;
        this.prevMouseY = a
    },
    stroke: function (f, c, color) {
        var e, b, a, g;
        this.points.push([f, c]);
        for (e = 0; e < this.points.length; e++) {
            b = this.points[e][0] - this.points[this.count][0];
            a = this.points[e][1] - this.points[this.count][1];
            g = b * b + a * a;
            if (g < 1000) {
                this.context.strokeStyle = "rgba(" + color[0] + ", " +
                    color[1] + ", " + color[2] + ", " + ((1 - (g / 1000)) * 0.1) + " )";
                this.context.beginPath();
                this.context.moveTo(this.points[this.count][0], this.points[this.count][1]);
                this.context.lineTo(this.points[e][0], this.points[e][1]);
                this.context.stroke()
            }
        }
        this.prevMouseX = f;
        this.prevMouseY = c;
        this.count++
    },
    strokeEnd: function (b, a, color) {}
};
