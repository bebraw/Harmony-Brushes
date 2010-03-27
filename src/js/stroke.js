/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function StrokeManager(modifiers, canvas, brushes, palette) {
    this.init(modifiers, canvas, brushes, palette);
}
StrokeManager.prototype = {
    init: function (modifiers, canvas, brushes, palette) {
        this.modifiers = modifiers;
        this.canvas = canvas;
        this.brushes = brushes;
        this.palette = palette;
    },
    destroy: function () {},
    start: function (x, y) {
        mainCanvas = new ProxyCanvas("canvas"); // XXX: methodify: this.canvas.getProxy();
        brush = eval("new " + this.brushes.selected + '()'); // XXX: methodify: this.brushes.getSelected();
        color = COLOR; // XXX: methodify: this.palette.getColor();
        this.brushSize = BRUSH_SIZE; // XXX: methodify: this.brushes.getSize();
        this.mode = "source-over"; // XXX: methodify: this.brushes.getMode();

        this.painter = new Painter(mainCanvas, brush, color);
        this.painter.paint(x, y, this.brushSize, this.mode);
    },
    paint: function (x, y) {
        this.painter.paint(x, y, this.brushSize, this.mode);
    },
    end: function (x, y) {
        this.painter.paint(x, y, this.brushSize, this.mode);
    }
}
