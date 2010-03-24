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
