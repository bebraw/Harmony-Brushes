/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function target() {
    this.init();
}
target.prototype = {
    init: function () {
        this.previousInitial = new Point();
    },
    apply: function ( point, initialValue, targetValue ) {
        this.previousInitial = initialValue;

        return project(targetValue, initialValue, point);
    }
}
