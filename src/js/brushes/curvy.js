/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function curvy() {
    this.init();
}
curvy.prototype = {
    init: function () {
        this.points = [];
    },
    destroy: function () {},
    stroke: function (canvas, cursor, color) {
        var START = 30,
            CTL_PNT1_DIST = 10,
            CTL_PNT2_DIST = 20;

        this.points.push(cursor.current);

        canvas.stroke(cursor.previous, cursor.current, color, 0.5);
        
        function getPoint(xAgo, pnts) {
            var index = pnts.length - xAgo, i;
            for (i=index; i< pnts.length; i++) {
                if (pnts[i]) {
                    return pnts[i];
                }
            }
        }

        start = getPoint(START, this.points);
        cOne = getPoint(CTL_PNT1_DIST, this.points);
        cTwo = getPoint(CTL_PNT2_DIST, this.points);
        canvas.bezierCurve(start, cOne, cTwo, cursor.current, color, 0.15);
    }
};
