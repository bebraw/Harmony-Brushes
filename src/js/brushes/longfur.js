/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function longfur(a) {
    this.init(a)
}
longfur.prototype = {
    context: null,
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
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", 0.05 )"
    },
    stroke: function (g, c, color) {
        var f, e, b, a, h;
        this.points.push([g, c]);
        for (f = 0; f < this.points.length; f++) {
            e = -Math.random();
            b = this.points[f][0] - this.points[this.count][0];
            a = this.points[f][1] - this.points[this.count][1];
            h = b * b + a * a;
            if (h < 4000 && Math.random() > h / 4000) {
                this.context.beginPath();
                this.context.moveTo(this.points[this.count][0] + (b * e), this.points[this.count][1] + (a * e));
                this.context.lineTo(this.points[f][0] - (b * e) + Math.random() * 2, this.points[f][1] - (a * e) + Math.random() * 2);
                this.context.stroke()
            }
        }
        this.count++
    },
    strokeEnd: function (b, a, color) {}
};
