/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function Painters( canvas ) {
    this.init(canvas);
}
Painters.prototype = {
    init: function (canvas) {
        this.canvas = canvas;

        this.length = 0;
    },
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
            var painter = this[i];

            painter.paint(point, brushSize, brushOpacity, mode, points);
        }
    },
    getStrokePoints: function () {
        var ret = new Points(this.canvas.width, this.canvas.height);

        for (var i = 0; i < this.length; i++) {
            var painter = this[i];
            
            ret.extend(painter.getPoints());
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
        this.canvas = canvas;
        this.modifier = modifier;

        this.painters = [];

        for (var i = 0; i < amount; i++) {
            this.painters.push(new Painter(canvas, brush, color));
        }
    },
    paint: function (point, lineWidth, opacity, compositeOperation, points) {
        for (var i = 0; i < this.painters.length; i++) {
            var painter = this.painters[i];
            point = this.modifier.modify(point);

            painter.paint(point, lineWidth, opacity, compositeOperation,
                points);
        }
    },
    getPoints: function () {
        var ret = new Points(this.canvas.width, this.canvas.height);

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
        this.points = new Points(canvas.width, canvas.height);
    },
    paint: function (point, lineWidth, opacity, compositeOperation, points) {
        point = this.modifier.modify(point);

        this.points.push(point);

        if( this.points.previous ) {
            this.canvas.context.lineWidth = lineWidth;
            this.canvas.context.globalCompositeOperation = compositeOperation;

            if(points) {
                var brushPoints = clone(points);
                brushPoints.extend(this.points);
            }
            else {
                brushPoints = this.points;
            }

            this.brush.stroke(this.canvas, brushPoints, this.color, opacity);
        }
    },
    getPoints: function () {
        return this.points;
    }
}
