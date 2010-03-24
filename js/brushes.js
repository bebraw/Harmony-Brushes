brushes = ["sketchy", "shaded", "chrome", "fur", "longfur", "web",
    "simple", "squares", "ribbon", "circles", "grid", "stringy",
    "curvy"];
importDirectory(brushes, "brushes");

function Brushes() {
    this.init();
}
Brushes.prototype = {
    init: function () {},
    destroy: function () {}
}

function onMenuSelectorChange(e) {
    if (STYLES[menu.selector.selectedIndex] == "") {
        return
    }
    strokeManager.destroy(); // XXX: is this needed?
    strokeManager.setStyle(STYLES[menu.selector.selectedIndex]);
    window.location.hash = STYLES[menu.selector.selectedIndex]
}
