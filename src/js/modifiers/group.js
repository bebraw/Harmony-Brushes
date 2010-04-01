/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function group() {
    this.init();
}
group.prototype = {
    attributes: {'amount': {'type': 'int', 'min': 1, 'max': 16, 'value': 1},
        'distance': {'type': 'int', 'min': 1, 'max': 40, 'value': 5}},
    init: function () {},
    destroy: function () {},
    modify: function (point) {
        function getRandom(n, m) {
            return Math.random() * (m - n) + n;
        }

        dist = this.distance;
        return new Point(point.x + getRandom(-dist, dist),
            point.y + getRandom(-dist, dist));
    }
}
