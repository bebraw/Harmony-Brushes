/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function Jitter() {
    this.init();
}
Jitter.prototype = {
    type: 'stroke',
    attributes: {'amount': {'type': 'int', 'min': 1, 'max': 64, 'value': 8}},
    init: function () {},
    destroy: function () {},
    modify: function (x, y) {
        function getRandom(n) {
            return Math.random() * n - n;
        }

        return {'x': x - getRandom(this.amount),
            'y': y - getRandom(this.amount)};
    }
}
