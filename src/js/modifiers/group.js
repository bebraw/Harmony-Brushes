/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function group() {}
group.prototype = {
    attributes: {'amount': {'type': 'int', 'min': 1, 'max': 16, 'value': 1},
        'distance': {'type': 'int', 'min': 1, 'max': 40, 'value': 5}},
    modify: function (point) {
        var randomDirection = getRandomDirection(this.distance);

        return point.add(randomDirection);
    }
}
