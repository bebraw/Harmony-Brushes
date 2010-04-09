/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function project_coordinate(x1, y1, x2, y2, x3, y3) {
    dx = x2 - x1;
    dy = y2 - y1;

    if((dx == 0) && (dy == 0)) {
        return [x1, y1];
    }

    t = ((x3 - x1) * dx + (y3 - y1) * dy) / (dx * dx + dy * dy);
    return [x1 + t * dx, y1 + t * dy];
}

// // TODO: make it possible to add multiple targets (max 3?) + a way to cycle
// between them
function PerspectiveTarget() {}
PerspectiveTarget.prototype = {
    hotkey: 'f',
    exec: function (toolContext, devices) {
        toolContext.targetX = devices.mouse.getX();
        toolContext.targetY = devices.mouse.getY();

        // TODO: figure out how to render target on canvas

        console.log('set persp target to x: ' + toolContext.targetX +
            ' , y: ' + toolContext.targetY);
    }
}

function PerspectiveConstraint() {}
PerspectiveConstraint.prototype = {
    hotkey: 'd',
    exec: function (toolContext, devices) {
        toolContext.initialX = devices.mouse.getX();
        toolContext.initialY = devices.mouse.getY();
    }
}
