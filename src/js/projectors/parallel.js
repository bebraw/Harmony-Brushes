/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function parallel() {}
parallel.prototype = {
    apply: function ( point, initialValue, targetValue, projectors ) {
        this.initParallelTarget(initialValue, targetValue, projectors);

        return project(this.parallelTarget, initialValue, point);
    },
    onPress: function ( initialValue, targetValue, projectors ) {
        this.initParallelTarget(initialValue, targetValue, projectors);

        this.projectors = projectors;
    },
    initParallelTarget: function ( initialValue, targetValue, projectors ) {
        var previousInitial = projectors.target.previousInitial;

        this.initialValue = initialValue;
        this.parallelTarget = targetValue.sub(previousInitial).add(initialValue);
    },
    onDown: function ( initialValue ) {
        if( !mousePressed ) {
            var overlayCanvas = new ProxyCanvas('overlayCanvas');
            var projectedInitial = project(this.parallelTarget,
                this.initialValue, initialValue);
            var target = this.parallelTarget.sub(projectedInitial).add(initialValue);

            var bounds = this.projectors.target.getPreviewBounds(initialValue,
                target, overlayCanvas);

            overlayCanvas.clear();
            
            overlayCanvas.stroke(bounds[0], bounds[1],
                PROJECTIONOVERLAYCOLOR, PROJECTIONOVERLAYALPHA);
        }
    },
    onRelease: function () {
        var overlayCanvas = new ProxyCanvas('overlayCanvas');

        overlayCanvas.clear();
    }
}
