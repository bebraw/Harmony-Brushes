/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
projectors.horizontal = {
    apply: function ( point, initialValue ) {
        point.y = initialValue.y;

        return point;
    },
    onDown: function ( initialValue ) {
        if( !mousePressed ) {
            var overlayCanvas = new ProxyCanvas('overlayCanvas');

            overlayCanvas.clear();

            overlayCanvas.stroke(new Point(0, initialValue.y),
                new Point(overlayCanvas.width, initialValue.y),
                PROJECTIONOVERLAYCOLOR, PROJECTIONOVERLAYALPHA);
        }
    },
    onRelease: function () {
        var overlayCanvas = new ProxyCanvas('overlayCanvas');

        overlayCanvas.clear();
    }
}
