/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
// XXX: get rid of this!
function jitter() {
    this.init();
}
jitter.prototype = {
    type: 'stroke',
    attributes: {'amount': {'type': 'int', 'min': 1, 'max': 64, 'value': 8}},
    init: function () {},
    destroy: function () {},
    modify: function (point) {
        function getRandom(n) {
            return Math.random() * n - n;
        }

        return new Point(point.x - getRandom(this.amount),
            point.y - getRandom(this.amount));
    }
}
