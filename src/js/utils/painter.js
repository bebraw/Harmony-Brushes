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
            brush = $.extend(true, {}, brush); // clone brush!
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

        if(modifier) {
            this.modifier = modifier;
        }
        else {
            this.modifier = new NullModifier();
        }

        this.cursor = new Cursor();
        this.points = []; // points of current stroke
    },
    destroy: function () {},
    applyModifiers: function (point) {
        return this.modifier.modify(point);
    },
    paint: function (point, lineWidth, opacity, compositeOperation) {
        this.cursor.setLocation(point);

        if( this.cursor.hasPreviousLocation() ) {
            this.canvas.context.lineWidth = lineWidth;
            this.canvas.context.globalCompositeOperation = compositeOperation;

            this.points.push(point);

            this.brush.stroke(this.canvas, this.cursor.getProxy(), this.color,
                opacity / 100, this.points);
        }
    }
}

function Cursor() {
    this.init();
}
Cursor.prototype = {
    init: function () {
        this.current = new Point();
        this.previous = new Point();
    },
    destroy: function () {},
    setLocation: function (point) {
        clone = $.extend(true, {}, this.current);
        this.previous = clone;
        this.current = point;
    },
    hasPreviousLocation: function() {
        // XXX: check if this fails at zero/zero case!
        return this.previous.x || this.previous.y;
    },
    getProxy: function () {
        return {'current': this.current, 'previous': this.previous};
    }
}
