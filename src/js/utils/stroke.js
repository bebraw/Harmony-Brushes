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

        this.strokePoints = new Points();
        this.strokePointsAccumulated = 0;
        this.paintTemplate(point);
    },
    paint: function (point) {
        this.paintTemplate(point);
    },
    end: function (point) {
        this.paintTemplate(point);

        // XXX: get Points from each painter and add them to a common point structure
    },
    paintTemplate: function (point) {
        if('painters' in this) {
            point = panels['brushes'].applyJitter(point);
            size = panels['brushes'].getSize();
            opacity = panels['brushes'].getOpacity();

            this.strokePoints.push(point);
            this.strokePointsAccumulated++;

            if( this.strokePointsAccumulated >= 3 ) {
                dist = this.strokePoints.current.sub(this.strokePoints.previous).toDist();

                // XXX: check if it's possible to implement [-3] for js easily!
                thirdLast = this.strokePoints.get(-3);
                this.painters.paint(thirdLast, size, opacity, this.mode);

                if(dist > 500) {
                    // de Casteljau
                    firstMid = thirdLast.add(this.strokePoints.previous).div(2);
                    secondMid = this.strokePoints.previous.add(this.points.current).div(2);

                    realFirstMid = thirdLast.add(firstMid).div(2);
                    realSecondMid = firstMid.add(secondMid).div(2);
                    realThirdMid = secondMid.add(this.strokePoints.current).div(2);

                    this.painters.paint(realFirstMid, size, opacity, this.mode);
                    this.painters.paint(realSecondMid, size, opacity, this.mode);
                    this.painters.paint(realThirdMid, size, opacity, this.mode);
                    this.painters.paint(this.strokePoints.current, size,
                        opacity, this.mode);

                    this.strokePointsAccumulated = 0;
                }
            }
        }
    },
    getActiveCanvas: function () {
        return new ProxyCanvas(this.activeCanvasId);
    },
    setActiveCanvas: function (canvasId) {
        this.activeCanvasId = canvasId;
    }
}
