/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function vertical() {}
vertical.prototype = {
    apply: function ( point, initialValue) {
        point.x = initialValue.x;

        return point;
    }
}
