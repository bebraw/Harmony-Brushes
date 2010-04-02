/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function Painters() {
    this.init();
}
Painters.prototype = {
    init: function () {
        this.container = [];
    },
    destroy: function () {},
    add: function (canvas, brush, color, modifier, amount) {
        if(amount) {
            this.container.push(new InstancePainter(amount, canvas, brush,
                color, modifier));
        }
        else {
            this.container.push(new Painter(canvas, brush, color,
                modifier));
        }
    },
    paint: function (point, brushSize, brushOpacity, mode) {
        userPainter = this.container[0];
        point = userPainter.applyModifiers(point);
        userPainter.paint(point, brushSize, brushOpacity, mode);

        for (var i = 1; i < this.container.length; i++) {
            painter = this.container[i];
            point = painter.applyModifiers(point);
            painter.paint(point, brushSize, brushOpacity, mode);
        }
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
            brush = clone(brush);
            this.painters.push(new Painter(canvas, brush, color));
        }
    },
    destroy: function () {},
    applyModifiers: function (point) {
        return point;
    },
    paint: function (point, lineWidth, opacity, compositeOperation) {
        for (var i = 0; i < this.painters.length; i++) {
            painter = this.painters[i];
            point = this.modifier.modify(point);
            painter.paint(point, lineWidth, opacity, compositeOperation);
        }
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
    applyModifiers: function (point) {
        return this.modifier.modify(point);
    },
    paint: function (point, lineWidth, opacity, compositeOperation) {
        this.points.push(point);

        if( this.points.previous ) {
            this.canvas.context.lineWidth = lineWidth;
            this.canvas.context.globalCompositeOperation = compositeOperation;

            this.brush.stroke(this.canvas, this.points, this.color,
                opacity / 100);
        }
    }
}

function Points() {
    this.init();
}
Points.prototype = {
    init: function () {
        this.current = null;
        this.previous = null;
        this.length = 0;
    },
    destroy: function () {},
    push: function (item) {
        this[this.length] = item;
        this.length++;

        this.previous = this.current;
        this.current = item;
    }
}
