/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function StrokeManager() {
    this.init();
}
StrokeManager.prototype = {
    init: function () {
        this.points = new Points(); // XXX: this should be per canvas!!!

        this.filterDistance = 500;
        this.filterLength = 3;
    },
    destroy: function () {},
    start: function (point) {
        mainCanvas = new ProxyCanvas(this.activeCanvasId);
        brush = panels['brushes'].getSelected();
        color = panels['palette'].getColor();
        this.mode = panels['brushes'].getMode();

        this.painters = new Painters();

        this.painters.add(mainCanvas, clone(brush), color);

        // TODO: stackify this!
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

        this.initCursor();
        this.paintTemplate(point);
    },
    paint: function (point) {
        this.paintTemplate(point);
    },
    end: function (point) {
        this.paintTemplate(point);

        allStrokePoints = this.painters.getPoints();
        this.points.extend(allStrokePoints);
    },
    paintTemplate: function (point) {
        this.cursorPoints.push(point);

        if( this.cursorPoints.length == this.filterLength ) {
            var size = panels['brushes'].getSize();
            var opacity = panels['brushes'].getOpacity();
            var dist = this.cursorPoints[2].sub(this.cursorPoints[1]).toDist();
            point = panels['brushes'].applyJitter(point);

            // XXX: add ui for this (points should be null if local shading is in use.
            // note that if there are modifiers, local shading should be used in any case!)
            // TODO
            var points = null; //this.points;

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
        this.cursorPoints = new CursorQueue(this.filterLength);
    },
    getActiveCanvas: function () {
        return new ProxyCanvas(this.activeCanvasId);
    },
    setActiveCanvas: function (canvasId) {
        this.activeCanvasId = canvasId;
    }
}

function CursorQueue( maxLength ) {
    this.init(maxLength);
}
CursorQueue.prototype = {
    init: function ( maxLength ) {
        this.maxLength =  maxLength;
        this.length = 0;
    },
    destroy: function () {},
    push: function (item) {
        if( this.length == this.maxLength ) {
            for( var i = 0; i < this.maxLength - 1; i++ ) {
                this[i] = this[i+1];
            }
            this[this.length - 1] = item;
        }
        else {
            this[this.length] = item;
            this.length++;
        }
    }
}