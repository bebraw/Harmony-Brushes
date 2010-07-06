/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function horizontal() {}
horizontal.prototype = {
    apply: function ( point, initialValue ) {
        point.y = initialValue.y;

        return point;
    }
}
