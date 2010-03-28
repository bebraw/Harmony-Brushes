/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function verticalmirror() {
    this.init();
}
verticalmirror.prototype = {
    type: 'instance',
    init: function () {},
    destroy: function () {},
    modify: function (x, y) {
        return {'x': x, 'y': window.innerHeight - y};
    }
}
