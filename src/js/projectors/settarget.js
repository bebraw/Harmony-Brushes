/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function settarget() {
    this.init();
}
settarget.prototype = {
    init: function () {
        var canvasDiameter = 1 + PROJECTIONTARGETRADIUS * 2;

        $('#main').append('<canvas id="projectionTarget"' +
            ' width="' + canvasDiameter + '"' +
            ' height="' + canvasDiameter + '"' +
            ' style="z-index:100;position:absolute"></canvas>')

        var overlayCanvas = new ProxyCanvas('projectionTarget');

        overlayCanvas.cross(new Point(10, 10), PROJECTIONTARGETRADIUS,
            PROJECTIONOVERLAYCOLOR, PROJECTIONOVERLAYALPHA);

        this.onPress(new Point(), new Point());
    },
    onPress: function ( initialValue, targetValue ) {
        var topCoord = initialValue.y - PROJECTIONTARGETRADIUS;
        var leftCoord = initialValue.x - PROJECTIONTARGETRADIUS;

        $('#projectionTarget').css('top', topCoord + 'px').
            css('left', leftCoord + 'px');

        targetValue.x = initialValue.x;
        targetValue.y = initialValue.y;
    }
}
