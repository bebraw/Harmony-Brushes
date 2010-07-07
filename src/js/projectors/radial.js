/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function radial() {}
radial.prototype = {
    apply: function ( point, initialValue, targetValue ) {
        return projectRadially(targetValue, initialValue, point);
    },
    onPress: function ( initialValue, targetValue ) {
        this.targetValue = targetValue; // XXX
    },
    onDown: function ( initialValue ) {
        if( !mousePressed ) {
            var overlayCanvas = new ProxyCanvas('overlayCanvas');
            var center = this.targetValue;
            var radius = Math.sqrt(initialValue.sub(center).toDist());

            overlayCanvas.clear();

            overlayCanvas.circle(center, radius, PROJECTIONOVERLAYCOLOR,
                PROJECTIONOVERLAYALPHA);
        }
    },
    onRelease: function () {
        var overlayCanvas = new ProxyCanvas('overlayCanvas');

        overlayCanvas.clear();
    }
}
