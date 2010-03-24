// TODO: figure out how to register individual tools in a neat way!

function HorizontalConstraint() {
    this.init();
}
HorizontalConstraint.prototype = {
    hotkey: 'a',
    init: function () {},
    destroy: function () {},
    exec: function (toolContext, devices) {
        // TODO: rename + figure out how to modify brush on paint
        toolContext.initialY = devices.mouse.getY();
    }
}

function VerticalConstraint() {
    this.init();
}
VerticalConstraint.prototype = {
    hotkey: 's',
    init: function () {},
    destroy: function () {},
    exec: function (toolContext, devices) {
        toolContext.initialX = devices.mouse.getX();
    }
}

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
