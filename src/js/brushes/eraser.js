/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function eraser() {
    this.init();
}
eraser.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, points, color, opacity) {
        radius = 1; // XXX: use brush size for radius! note that painter uses it context init! -> add flag for this case?

        // XXX: use points instead!
        //pointsInsideRadius = canvas.getPointsInside(radius, points.current);

        //if(pointsInsideRadius.length > 0) {
            //console.log(pointsInsideRadius);
            
            // TODO!
            //canvas.remove(pointsInsideRadius); // this should handle redraw automagically!
            // redraw -> take point neighbours in count when calculating bbox for redraw!

            // 1. get points and their neigbors
            // 2. calculate bbox
            // 3. get rid of removable points
            // 4. redraw all points remaining in the bbox and their neighbors outside
        //}
    }
};
