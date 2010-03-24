// TODO: make it possible to add multiple targets (max 3?) + a way to cycle
// between them
function PerspectiveTarget() {
    this.init();
}
PerspectiveTarget.prototype = {
    hotkey: 'f',
    init: function () {},
    destroy: function () {},
    exec: function (toolContext, devices) {
        toolContext.targetX = devices.mouse.getX();
        toolContext.targetY = devices.mouse.getY();

        // TODO: figure out how to render target on canvas

        console.log('set persp target to x: ' + toolContext.targetX +
            ' , y: ' + toolContext.targetY);
    }
}

function PerspectiveConstraint() {
    this.init();
}
PerspectiveConstraint.prototype = {
    hotkey: 'd',
    init: function () {},
    destroy: function () {},
    exec: function (toolContext, devices) {
        toolContext.initialX = devices.mouse.getX();
        toolContext.initialY = devices.mouse.getY();
    }
}
