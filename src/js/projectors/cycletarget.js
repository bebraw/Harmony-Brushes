/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function cycletarget() {}
cycletarget.prototype = {
    onPress: function ( initialValue, targetValue, projectors ) {
        var currentTarget = projectors.settarget.currentTarget;
        currentTarget.cycle();

        // XXX: cycle to other direction instead?

        var currentId = currentTarget.id;
        var currentTop = $('#' + currentId).css('top');
        var currentLeft = $('#' + currentId).css('left');

        $('#activeTarget').css('top', currentTop).css('left', currentLeft);

        targetValue.x = parseFloat(currentLeft) + PROJECTIONTARGETRADIUS;
        targetValue.y = parseFloat(currentTop) + PROJECTIONTARGETRADIUS;
    }
}
