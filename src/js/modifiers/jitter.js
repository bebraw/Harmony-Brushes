/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function Jitter() {
    this.init();
}
Jitter.prototype = {
    type: 'stroke',
    init: function () {},
    destroy: function () {},
    modify: function (x, y) {
        function getRandom() {
            // returns random number in range [-n, n]
            n = 10;
            return Math.random() * n - n;
        }

        return {'x': x - getRandom(), 'y': y - getRandom()};
    }
}
