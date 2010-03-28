/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function RadialMirror() {
    this.init();
}
RadialMirror.prototype = {
    type: 'instance',
    attributes: {'amount': {'type': 'int', 'min': 1, 'max': 4, 'value': 1}},
    init: function () {},
    destroy: function () {},
    modify: function (x, y) {
        return {'x': window.innerWidth - x, 'y': window.innerHeight - y};
    }
}
