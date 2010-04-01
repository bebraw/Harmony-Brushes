/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */

// TODO: figure out how to set direction!
// TODO: add option to set follow cursor direction? (get direction vector)

function array() {
    this.init();
}
array.prototype = {
    attributes: {'amount': {'type': 'int', 'min': 1, 'max': 16, 'value': 1},
        'distance': {'type': 'int', 'min': -40, 'max': 40, 'value': 5}},
    init: function () {},
    destroy: function () {},
    modify: function (point) {
        return new Point(point.x + this.distance, point.y + this.distance);
    }
}
