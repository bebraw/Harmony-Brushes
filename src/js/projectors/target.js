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
    },
    onPress: function ( initialValue, targetValue ) {
        this.targetValue = targetValue; // XXX
    },
    onDown: function ( initialValue ) {
        if( !mousePressed ) {
            var overlayCanvas = new ProxyCanvas('overlayCanvas');

            var bounds = this.getPreviewBounds(initialValue,
                this.targetValue, overlayCanvas);

            overlayCanvas.clear();

            overlayCanvas.stroke(bounds[0], bounds[1],
                PROJECTIONOVERLAYCOLOR, PROJECTIONOVERLAYALPHA);
        }
    },
    getPreviewBounds: function ( initialValue, targetValue, overlayCanvas ) {
        var leftBound, rightBound;
        var topLeftProjection = project(targetValue, initialValue,
            new Point());

        if( topLeftProjection.x < 0 || topLeftProjection.y < 0 ) {
            leftBound = topLeftProjection;
            rightBound = project(targetValue,
                initialValue,
                new Point(overlayCanvas.width, overlayCanvas.height));
        }
        else {
            leftBound = project(targetValue,
                initialValue,
                new Point(0, overlayCanvas.height));
            rightBound = project(targetValue,
                initialValue,
                new Point(overlayCanvas.width, 0));
        }

        return [leftBound, rightBound];
    },
    onRelease: function () {
        var overlayCanvas = new ProxyCanvas('overlayCanvas');

        overlayCanvas.clear();
    }
}
