/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
projectors.vertical = {
    apply: function ( point, initialValue) {
        point.x = initialValue.x;

        return point;
    },
    onDown: function ( initialValue ) {
        if( !mousePressed ) {
            var overlayCanvas = new ProxyCanvas('overlayCanvas');

            overlayCanvas.clear();

            overlayCanvas.stroke(new Point(initialValue.x, 0),
                new Point(initialValue.x, overlayCanvas.height),
                PROJECTIONOVERLAYCOLOR, PROJECTIONOVERLAYALPHA);
        }
    },
    onRelease: function () {
        var overlayCanvas = new ProxyCanvas('overlayCanvas');

        overlayCanvas.clear();
    }
}
