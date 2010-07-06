/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function radial() {}
radial.prototype = {
    apply: function ( point, initialValue, targetValue ) {
        console.log(initialValue.x + ' ' + targetValue.x);

        return projectRadially(targetValue, initialValue, point);
    }
}
