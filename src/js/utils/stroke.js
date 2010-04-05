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
        this.activeCanvas = null;
    },
    destroy: function () {},
    start: function (point) {
        brush = panels['brushes'].getSelected();
        color = getColor();
        this.mode = panels['brushes'].getMode();

        this.painters = new Painters(this.activeCanvas);

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

        this.initPoints();
        this.initCursor();
        this.paintTemplate(point);
    },
    paint: function (point) {
        this.paintTemplate(point);
    },
    end: function (point) {
        this.paintTemplate(point);

        var points = this.painters.getStrokePoints();
        this.activeCanvas.strokes.push(panels['brushes'].selected, points);
    },
    paintTemplate: function (point) {
        this.cursorPoints.push(point);

        if( this.cursorPoints.length == FILTERLENGTH ) {
            var dist = this.cursorPoints[2].sub(this.cursorPoints[1]).toDist();

            this.applyJitterAndPaint(this.cursorPoints[0]);

            if( dist > FILTERDISTANCE ) {
                midPoints = deCasteljau(this.cursorPoints, FILTERLENGTH - 1);
                midPoints = midPoints.slice(1, midPoints.length - 1);

                for( var i = 0; i < midPoints.length; i++ ) {
                    this.applyJitterAndPaint(midPoints[i]);
                }

                this.applyJitterAndPaint(this.cursorPoints[FILTERLENGTH - 1]);

                this.initCursor();
            }
        }
    },
    applyJitterAndPaint: function ( point ) {
        var size = panels['brushes'].getSize();
        var opacity = panels['brushes'].getOpacity();
        point = panels['brushes'].applyJitter(point);

        this.painters.paint(point, size, opacity, this.mode, this.points);
    },
    initPoints: function () {
        this.points = null;
        shadingType = panels['brushes'].getShadingType();

        if(shadingType == 'same') {
            this.points = this.activeCanvas.getPointsOfType(panels['brushes'].selected);
        }

        if(shadingType == 'all') {
            this.points = this.activeCanvas.getAllPoints();
        }
    },
    initCursor: function () {
        this.cursorPoints = new Queue(FILTERLENGTH);
    },
    addCanvas: function (canvasId) {
        this.canvasii[canvasId] = new ProxyCanvas(canvasId);
        this.setActiveCanvas(canvasId);

        $('#' + canvasId).css('backgroundColor', '#' + RGBtoHex(BACKGROUNDCOLOR));
    },
    removeCanvas: function (canvasId) {
        delete this.canvasii[canvasId];
    },
    setActiveCanvas: function (canvasId) {
        this.activeCanvas = this.canvasii[canvasId];

        $('.pageCanvas').removeClass('activePage');
        $('#' + canvasId).addClass('activePage');
    }
}
