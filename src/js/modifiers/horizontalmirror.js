/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function horizontalmirror() {
    this.init();
}
horizontalmirror.prototype = {
    type: 'instance',
    init: function () {},
    destroy: function () {},
    modify: function (x, y) {
        return {'x': window.innerWidth - x, 'y': y};
    }
}
