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

        this.painters = new Painters();

        // get all modifiers that modify current strokes
        strokeModifiers = panels['modifiers'].getActiveStrokeModifiers();

        this.painters.add(mainCanvas, brush, color, null, strokeModifiers);

        // add all instance modifiers (note that it does not make sense to use
        // stroke modifiers with mirror at least (perhaps array?). add flag
        // for this?)
        instanceModifiers = panels['modifiers'].getActiveInstanceModifiers();
        for (i = 0; i < instanceModifiers.length; i++) {
            modifier = instanceModifiers[i];

            // check modifier attr (radial!) for amount! note that in this case
            // the derived coord should be passed to each!

            // XXX: hack for radial amount
            if('attributes' in modifier) {
                if('amount' in modifier.attributes) {
                    amount = panels['modifiers'].radialValue; // XXX: should fetch this directly from the modifier

                    this.painters.addInstance(amount, mainCanvas, brush, color, modifier);
                }
            }
            else { // XXX: handle this via addInstance too???
                this.painters.add(mainCanvas, brush, color, modifier);
            }
        }

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
