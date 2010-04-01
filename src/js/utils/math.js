/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function Point(x, y) {
    this.init(x, y);
}
Point.prototype = {
    init: function(x, y) {
        this.x = x;
        this.y = y;
    },
    destroy: function() {},
    add: function(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }
}

function getRandomDirection(maxDist) {
            direction = 2 * Math.PI * Math.random();
            distance = maxDist * Math.random();

            xOffset = Math.sin(direction) * distance;
            yOffset = Math.cos(direction) * distance;

            return new Point(xOffset, yOffset);
}
