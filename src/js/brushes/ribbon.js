/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function bargs(c) {
    var b, a = [];
    for (b = 1; b < arguments.length; b++) {
        a.push(arguments[b])
    }
    return function () {
        return c.apply(this, a)
    }
}

function ribbon() {
    this.init();
}
ribbon.prototype = {
    init: function () {
        this.canvas = null;
        this.mouseX = null;
        this.mouseY = null;
        this.painterInitDone = false;
    },
    destroy: function () {
        clearInterval(this.interval)
    },
    stroke: function (canvas, cursor, color) {
        this.canvas = canvas;
        this.mouseX = cursor.current.x;
        this.mouseY = cursor.current.y;
        this.color = color;

        if(!this.painterInitDone) {
            this.painterInitDone = true;

            this.painters = [];

            for (var a = 0; a < 50; a++) {
                this.painters.push({
                    dx: this.mouseX,
                    dy: this.mouseY,
                    ax: 0,
                    ay: 0,
                    div: 0.1,
                    ease: Math.random() * 0.2 + 0.6
                })
            }
            
            this.interval = setInterval(bargs(function (c) {
                c.update();
                return false;
            }, this), 1000 / 60)

            for (var b = 0; b < this.painters.length; b++) {
                this.painters[b].dx = this.mouseX;
                this.painters[b].dy = this.mouseY;
            }
        }
    },
    update: function () {
        if(this.canvas) {
            for (var a = 0; a < this.painters.length; a++) {
                begin = {'x': this.painters[a].dx, 'y': this.painters[a].dy};

                this.painters[a].dx -= this.painters[a].ax = (this.painters[a].ax + (this.painters[a].dx - this.mouseX) * this.painters[a].div) * this.painters[a].ease;
                this.painters[a].dy -= this.painters[a].ay = (this.painters[a].ay + (this.painters[a].dy - this.mouseY) * this.painters[a].div) * this.painters[a].ease;

                end = {'x': this.painters[a].dx, 'y': this.painters[a].dy};

                this.canvas.stroke(begin, end, this.color, 0.05);
            }
        }
    }
};
