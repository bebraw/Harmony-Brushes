/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function Painters() {
    this.init();
}
Painters.prototype = {
    init: function () {
        this.length = 0;
    },
    destroy: function () {},
    add: function (canvas, brush, color, modifier, amount) {
        if(amount) {
            this.push(new InstancePainter(amount, canvas, brush,
                color, modifier));
        }
        else {
            this.push(new Painter(canvas, brush, color, modifier));
        }
    },
    push: function (item) {
        this[this.length] = item;
        this.length++;
    },
    paint: function (point, brushSize, brushOpacity, mode, points) {
        for (var i = 0; i < this.length; i++) {
            painter = this[i];
            painter.paint(point, brushSize, brushOpacity, mode, points);
        }
    },
    getStrokes: function () {
        var ret = [];

        for (var i = 0; i < this.length; i++) {
            painter = this[i];

            ret.push(painter.getPoints());
        }

        return ret;
    }
}

function InstancePainter(amount, canvas, brush, color, modifier) {
    this.init(amount, canvas, brush, color, modifier);
}
InstancePainter.prototype = {
    init: function (amount, canvas, brush, color, modifier) {
        this.amount = amount;
        this.modifier = modifier;

        this.painters = [];

        for (var i = 0; i < amount; i++) {
            this.painters.push(new Painter(canvas, brush, color));
        }
    },
    destroy: function () {},
    paint: function (point, lineWidth, opacity, compositeOperation, points) {
        for (var i = 0; i < this.painters.length; i++) {
            var painter = this.painters[i];
            point = this.modifier.modify(point);

            painter.paint(point, lineWidth, opacity, compositeOperation,
                points);
        }
    },
    getPoints: function () {
        var ret = new Points();

        for (var i = 0; i < this.painters.length; i++) {
            var painter = this.painters[i];

            ret.extend(painter.getPoints());
        }

        return ret;
    }
}

function Painter(canvas, brush, color, modifier) {
    this.init(canvas, brush, color, modifier);
}
Painter.prototype = {
    init: function (canvas, brush, color, modifier) {
        this.canvas = canvas;
        this.brush = brush;
        this.color = color;
        this.modifier = modifier?modifier:new NullModifier();
        this.points = new Points();
    },
    destroy: function () {},
    paint: function (point, lineWidth, opacity, compositeOperation, points) {
        point = this.modifier.modify(point);

        this.points.push(point);

        if( this.points.previous ) {
            this.canvas.context.lineWidth = lineWidth;
            this.canvas.context.globalCompositeOperation = compositeOperation;

            brushPoints = this.points;
            if(points) {
                brushPoints = clone(points);
                brushPoints.extend(this.points);
            }

            this.brush.stroke(this.canvas, brushPoints, this.color, opacity);
        }
    },
    getPoints: function () {
        return this.points;
    }
}
