/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function sketchy() {
    this.init()
}
sketchy.prototype = {
    points: [],
    count: 0,
    init: function () {},
    destroy: function () {},
    stroke: function (context, mouse, color) {
        this.points.push([mouse.current.x, mouse.current.y]);

        // XXX: these should be set outside! -> general options?
        context.lineWidth = 1;
        context.globalCompositeOperation = "source-over";

        // XXX: set color outside too?
        context.strokeStyle = "rgba(" + color[0] + ", " + color[1] + ", " +
            color[2] + ", 0.05)";
        context.beginPath();
        context.moveTo(mouse.previous.x, mouse.previous.y);
        context.lineTo(mouse.current.x, mouse.current.y);
        context.stroke();

        // XXX: set color outside too?
        context.strokeStyle = "rgba(" + color[0] + ", " + color[1] + ", " +
            color[2] + ", 0.05 )";

        for (e = 0; e < this.points.length; e++) {
            b = this.points[e][0] - this.points[this.count][0];
            a = this.points[e][1] - this.points[this.count][1];
            g = b * b + a * a;
            
            if (g < 4000 && Math.random() > g / 2000) {
                context.beginPath();
                context.moveTo(this.points[this.count][0] + (b * 0.3),
                    this.points[this.count][1] + (a * 0.3));
                context.lineTo(this.points[e][0] - (b * 0.3),
                    this.points[e][1] - (a * 0.3));
                context.stroke();
            }
        }
        
        this.count++
    }
};
