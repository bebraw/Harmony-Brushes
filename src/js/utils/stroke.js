/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function StrokeManager() {
    this.init();
}
StrokeManager.prototype = {
    init: function () {},
    destroy: function () {},
    start: function (point) {
        mainCanvas = new ProxyCanvas(this.activeCanvasId);
        brush = panels['brushes'].getSelected();
        color = panels['palette'].getColor();
        this.mode = panels['brushes'].getMode();

        this.painters = new Painters();

        this.painters.add(mainCanvas, clone(brush), color);

        modifiers = panels['modifiers'].getActiveModifiers();
        for (i = 0; i < modifiers.length; i++) {
            modifier = modifiers[i];

            // XXX: hack for amount
            if('attributes' in modifier) {
                if('amount' in modifier.attributes) {
                    this.painters.add(mainCanvas, clone(brush), color, modifier, modifier.amount);
                }
            }
            else {
                this.painters.add(mainCanvas, clone(brush), color, modifier);
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
        if('painters' in this) {
            point = panels['brushes'].applyJitter(point);
            size = panels['brushes'].getSize();
            opacity = panels['brushes'].getOpacity();

            this.painters.paint(point, size, opacity, this.mode);
        }
    },
    getActiveCanvas: function () {
        return new ProxyCanvas(this.activeCanvasId);
    },
    setActiveCanvas: function (canvasId) {
        this.activeCanvasId = canvasId;
    }
}
