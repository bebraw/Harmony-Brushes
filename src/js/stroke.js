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
    start: function (point) {
        mainCanvas = this.canvas.getProxy();
        brush = this.brushes.getSelected();
        color = this.palette.getColor();
        this.mode = this.brushes.getMode();

        this.painters = new Painters();

        this.painters.add(mainCanvas, brush, color);

        // add all instance modifiers (note that it does not make sense to use
        // stroke modifiers with mirror at least (perhaps array?). add flag
        // for this?)
        modifiers = panels['modifiers'].getActiveModifiers();
        for (i = 0; i < modifiers.length; i++) {
            modifier = modifiers[i];

            // XXX: hack for amount
            if('attributes' in modifier) {
                if('amount' in modifier.attributes) {
                    brush = $.extend(true, {}, brush); // clone brush!
                    this.painters.add(mainCanvas, brush, color, modifier, modifier.amount);
                }
            }
            else { // XXX: handle this via addInstance too???
                brush = $.extend(true, {}, brush); // clone brush!
                this.painters.add(mainCanvas, brush, color, modifier);
            }
        }

        this.paintTemplate(point);
    },
    paint: function (point) {
        this.paintTemplate(point);
    },
    end: function (point) {
        this.paintTemplate(point);
    },
    paintTemplate: function (point) {
        point = this.brushes.applyJitter(point);
        this.painters.paint(point, this.brushes.getSize(),
            this.brushes.getOpacity(), this.mode);

        // XXX: just a hack to test eraser as it needs some point data to
        // work with
        panels['canvas'].points.push(point);
    }
}
