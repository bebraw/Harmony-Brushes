/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function chrome() {
    this.init()
}
chrome.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, points, color, opacity) {
        canvas.stroke(points.previous, points.current, color, opacity);

        adjacentPoints = points.getWithinRange(points.current,
            function (dist) {
                return dist < 1000;
            }
        );

        fac = 0.2;
        for (var i = 0; i < adjacentPoints.length; i++) {
            currentPoint = adjacentPoints[i];
            offset = currentPoint.sub(points.current).mul(fac);

            begin = points.current.add(offset);
            end = currentPoint.sub(offset);

            randomRGB = [Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)];

            canvas.stroke(begin, end, randomRGB, 0.1);
        }
    }
};
