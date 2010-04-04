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
    },
    destroy: function () {},
    start: function (point) {
        brush = panels['brushes'].getSelected();
        color = getColor();
        this.mode = panels['brushes'].getMode();

        this.painters = new Painters();

        this.painters.add(this.activeCanvas, brush, color);

        // TODO: stackify this!
        modifiers = panels['modifiers'].getActiveModifiers();
        for (i = 0; i < modifiers.length; i++) {
            modifier = modifiers[i];

            // XXX: hack for amount
            if('attributes' in modifier) {
                if('amount' in modifier.attributes) {
                    this.painters.add(this.activeCanvas, brush, color,
                        modifier, modifier.amount);
                }
            }
            else {
                this.painters.add(this.activeCanvas, brush, color, modifier);
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

        if( this.cursorPoints.length == FILTERLENGTH ) {
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

            if(dist > FILTERDISTANCE) {
                midPoints = deCasteljau(this.cursorPoints, FILTERLENGTH - 1);
                midPoints = midPoints.slice(1, midPoints.length - 1);

                for( var i = 0; i < midPoints.length; i++ ) {
                    this.painters.paint(midPoints[i], size, opacity, this.mode,
                        points);
                }

                this.painters.paint(this.cursorPoints[FILTERLENGTH - 1],
                    size, opacity, this.mode, points);

                this.initCursor();
            }
        }
    },
    initCursor: function () {
        this.cursorPoints = new Queue(FILTERLENGTH);
    },
    addCanvas: function (canvasId) {
        this.canvasii[canvasId] = new ProxyCanvas(canvasId);
        this.setActiveCanvas(canvasId);

        // XXX: fetch this from canvas settings
        this.activeCanvas.fill(BACKGROUNDCOLOR);
    },
    removeCanvas: function (canvasId) {
        delete this.canvasii[canvasId];
    },
    setActiveCanvas: function (canvasId) {
        this.activeCanvas = this.canvasii[canvasId];
    }
}
