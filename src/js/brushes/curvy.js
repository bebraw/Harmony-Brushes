/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function curvy() {}
curvy.prototype = {
    stroke: function (canvas, points, color, opacity) {
        var START = 30,
            CTL_PNT1_DIST = 10,
            CTL_PNT2_DIST = 20;

        canvas.stroke(points.previous, points.current, color, opacity);
        
        function getPoint(xAgo, pnts) {
            var index = pnts.length - xAgo;
            for (var i = index; i < pnts.length; i++) {
                if (pnts[i]) {
                    return pnts[i];
                }
            }
        }

        var start = getPoint(START, points.content);
        var cOne = getPoint(CTL_PNT1_DIST, points.content);
        var cTwo = getPoint(CTL_PNT2_DIST, points.content);
        canvas.bezierCurve(start, cOne, cTwo, points.current, color,
            opacity / 2);
    }
};
