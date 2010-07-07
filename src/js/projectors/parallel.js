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

            overlayCanvas.clear();
            
            overlayCanvas.stroke(initialValue, target,
                PROJECTIONOVERLAYCOLOR, PROJECTIONOVERLAYALPHA);
        }
    },
    onRelease: function () {
        var overlayCanvas = new ProxyCanvas('overlayCanvas');

        overlayCanvas.clear();
    }
}
