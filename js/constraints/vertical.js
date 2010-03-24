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
