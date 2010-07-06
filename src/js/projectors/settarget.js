/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function settarget() {}
settarget.prototype = {
    onPress: function ( initialValue, targetValue ) {
        var overlayCanvas = new ProxyCanvas('overlayCanvas');

        overlayCanvas.clear();
        overlayCanvas.cross(initialValue, PROJECTIONTARGETRADIUS,
            [0, 255, 0], 1.0);

        targetValue.x = initialValue.x;
        targetValue.y = initialValue.y;
    }
}
