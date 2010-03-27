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
        mainCanvas = this.canvas.getProxy();
        brush = this.brushes.getSelected();
        color = this.palette.getColor();
        this.brushSize = this.brushes.getSize();
        this.mode = this.brushes.getMode();

        // check out if any modifiers are active!
        // it they are, create painters for them
        // note that each modifier has access to coords that it may transform
        // before passing on to a painter

        this.painters = new Painters();

        this.painters.add(mainCanvas, brush, color);
        this.painters.paint(x, y, this.brushSize, this.mode);
    },
    paint: function (x, y) {
        this.painters.paint(x, y, this.brushSize, this.mode);

        // XXX: just a hack to test eraser as it needs some point data to
        // work with
        panels['canvas'].points.push({'x': x, 'y': y});
    },
    end: function (x, y) {
        this.painters.paint(x, y, this.brushSize, this.mode);

        // XXX: just a hack to test eraser as it needs some point data to
        // work with
        panels['canvas'].points.push({'x': x, 'y': y});
    }
}
