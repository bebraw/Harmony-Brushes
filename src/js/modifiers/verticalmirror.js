/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function VerticalMirror() {
    this.init();
}
VerticalMirror.prototype = {
    type: 'instance',
    init: function () {},
    destroy: function () {},
    modify: function (x, y) {
        return {'x': x, 'y': window.innerHeight - y};
    }
}
