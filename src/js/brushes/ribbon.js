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
    stroke: function (canvas, points, color, opacity) {
        this.canvas = canvas;
        this.currentLocation = points.current;
        this.color = color;
        this.opacity = opacity;

        if(!this.painterInitDone) {
            this.painterInitDone = true;

            this.painters = [];

            for (var a = 0; a < 50; a++) {
                this.painters.push({
                    dp: this.currentLocation,
                    ap: new Point(),
                    div: 0.1,
                    ease: Math.random() * 0.2 + 0.6
                })
            }
            
            this.interval = setInterval(bargs(function (c) {
                c.update();
                return false;
            }, this), 1000 / 60)

            for (var b = 0; b < this.painters.length; b++) {
                this.painters[b].dp = this.currentLocation;
            }
        }
    },
    update: function () {
        if(this.canvas) {
            for (var a = 0; a < this.painters.length; a++) {
                begin = this.painters[a].dp;

                this.painters[a].ap = this.painters[a].ap.
                    add(this.painters[a].dp.
                        sub(this.currentLocation).
                        mul(this.painters[a].div)).
                    mul(this.painters[a].ease);
                this.painters[a].dp = this.painters[a].dp.
                    sub(this.painters[a].ap);

                end = this.painters[a].dp;

                this.canvas.stroke(begin, end, this.color, this.opacity);
            }
        }
    }
};
