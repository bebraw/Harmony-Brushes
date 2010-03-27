/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function RadialMirror() {
    this.init();
}
RadialMirror.prototype = {
    init: function () {},
    destroy: function () {},
    modify: function (x, y) {
        return {'x': window.innerWidth - x, 'y': window.innerHeight - y};
    }
}
