// import brush modifiers
modifiers = ["mirror"]; // "jitter"
importDirectory(modifiers, "modifiers");

function Modifiers() {
    this.init();
}
Modifiers.prototype = {
    init: function () {
        setUpPod("Modifiers");
    },
    destroy: function () {}
}