/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function parallel() {}
parallel.prototype = {
    apply: function ( point, initialValue, targetValue, projectors ) {
        var previousInitial = projectors.target.previousInitial;
        var parallelTarget = targetValue.sub(previousInitial).add(initialValue);

        return project(parallelTarget, initialValue, point);
    }
}
