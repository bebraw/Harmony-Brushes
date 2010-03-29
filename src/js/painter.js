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
    add: function (canvas, brush, color, instanceModifier, strokeModifiers) {
        this.container.push(new Painter(canvas, brush, color,
            instanceModifier, strokeModifiers));
    },
    addInstance: function (amount, canvas, brush, color, instanceModifier) {
        this.container.push(new InstancePainter(amount, canvas, brush, color,
            instanceModifier));
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

function InstancePainter(amount, canvas, brush, color, instanceModifier) {
    this.init(amount, canvas, brush, color, instanceModifier);
}
InstancePainter.prototype = {
    init: function (amount, canvas, brush, color, instanceModifier) {
        this.amount = amount;
        this.instanceModifier = instanceModifier;

        this.painters = [];

        for (var i = 0; i < amount; i++) {
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
            point = this.instanceModifier.modify(point);
            painter.paint(point, lineWidth, opacity, compositeOperation);
        }
    }
}

function Painter(canvas, brush, color, instanceModifier, strokeModifiers) {
    this.init(canvas, brush, color, instanceModifier, strokeModifiers);
}
Painter.prototype = {
    init: function (canvas, brush, color, instanceModifier, strokeModifiers) {
        this.canvas = canvas;
        this.brush = brush;
        this.color = color;

        if(instanceModifier) {
            this.instanceModifier = instanceModifier;
        }
        else {
            this.instanceModifier = new NullInstanceModifier();
        }

        if(strokeModifiers) {
            this.strokeModifiers = strokeModifiers;
        }
        else {
            this.strokeModifiers = new NullStrokeModifiers();
        }

        this.cursor = new Cursor();
    },
    destroy: function () {},
    applyModifiers: function (point) {
        point = this.instanceModifier.modify(point);

        for (var i = 0; i < this.strokeModifiers.length; i++) {
            strokeModifier = this.strokeModifiers[i];

            point = strokeModifier.modify(point);
        }

        return point;
    },
    paint: function (point, lineWidth, opacity, compositeOperation) {
        this.cursor.setLocation(point);

        if( this.cursor.hasPreviousLocation() ) {
            this.canvas.context.lineWidth = lineWidth;
            this.canvas.context.globalCompositeOperation = compositeOperation;

            this.brush.stroke(this.canvas, this.cursor.getProxy(), this.color,
                opacity / 100);
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
        this.previous = this.current.clone();
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