/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function StrokeManager() {
    this.init();
}
StrokeManager.prototype = {
    init: function () {
        this.canvasii = {};

        this.filterDistance = 500;
        this.filterLength = 3;
    },
    destroy: function () {},
    start: function (point) {
        brush = panels['brushes'].getSelected();
        color = getColor();
        this.mode = panels['brushes'].getMode();

        this.painters = new Painters();

        this.painters.add(this.activeCanvas, clone(brush), color);

        // TODO: stackify this!
        modifiers = panels['modifiers'].getActiveModifiers();
        for (i = 0; i < modifiers.length; i++) {
            modifier = modifiers[i];

            // XXX: hack for amount
            if('attributes' in modifier) {
                if('amount' in modifier.attributes) {
                    this.painters.add(this.activeCanvas, clone(brush), color,
                        modifier, modifier.amount);
                }
            }
            else {
                this.painters.add(this.activeCanvas, clone(brush), color, modifier);
            }
        }

        this.initCursor();
        this.paintTemplate(point);
    },
    paint: function (point) {
        this.paintTemplate(point);
    },
    end: function (point) {
        this.paintTemplate(point);

        var strokes = this.painters.getStrokes();
        this.activeCanvas.strokes.push(panels['brushes'].selected, strokes);
    },
    paintTemplate: function (point) {
        this.cursorPoints.push(point);

        if( this.cursorPoints.length == this.filterLength ) {
            var size = panels['brushes'].getSize();
            var opacity = panels['brushes'].getOpacity();
            var dist = this.cursorPoints[2].sub(this.cursorPoints[1]).toDist();
            point = panels['brushes'].applyJitter(point);

            var points = null;
            shadingType = panels['brushes'].getShadingType();

            if(shadingType == 'same') {
                points = this.activeCanvas.getPointsOfType(panels['brushes'].selected);
            }

            if(shadingType == 'all') {
                points = this.activeCanvas.getAllPoints();
            }

            this.painters.paint(this.cursorPoints[0], size, opacity, this.mode,
                points);

            if(dist > this.filterDistance) {
                midPoints = deCasteljau(this.cursorPoints,
                    this.filterLength - 1);
                midPoints = midPoints.slice(1, midPoints.length - 1);

                for( var i = 0; i < midPoints.length; i++ ) {
                    this.painters.paint(midPoints[i], size, opacity, this.mode,
                        points);
                }

                this.painters.paint(this.cursorPoints[this.filterLength - 1],
                    size, opacity, this.mode, points);

                this.initCursor();
            }
        }
    },
    initCursor: function () {
        this.cursorPoints = new Queue(this.filterLength);
    },
    addCanvas: function (canvasId) {
        this.canvasii[canvasId] = new ProxyCanvas(canvasId);
        this.setActiveCanvas(canvasId);

        this.activeCanvas.fill('white'); // XXX: fetch this from canvas settings
    },
    removeCanvas: function (canvasId) {
        delete this.canvasii[canvasId];
    },
    setActiveCanvas: function (canvasId) {
        this.activeCanvas = this.canvasii[canvasId];
    }
}
