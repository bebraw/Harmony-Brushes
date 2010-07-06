/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function horizontal() {}
horizontal.prototype = {
    apply: function ( point, initialValue ) {
        point.y = initialValue.y;

        return point;
    },
    onDown: function ( initialValue ) {
        var overlayCanvas = new ProxyCanvas('overlayCanvas');

        // TODO: figure out how to handle clear in a nice manner (abstract overlay as a class)
        overlayCanvas.clear();

        // TODO: preview (draw line)
        overlayCanvas.stroke(new Point(0, initialValue.y),
            new Point(overlayCanvas.width, initialValue.y),
            PROJECTIONOVERLAYCOLOR, PROJECTIONOVERLAYALPHA);
    },
    onRelease: function () {
        // TODO: this should hide preview
    }
}
