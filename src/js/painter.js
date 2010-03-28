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
    paint: function (x, y, brushSize, brushOpacity, mode) {
        userPainter = this.container[0];
        coordinate = userPainter.applyModifiers(x, y);
        userPainter.paint(coordinate, brushSize, brushOpacity, mode);

        // XXX: tidy up!
        realX = coordinate.x;
        realY = coordinate.y;

        for (var i = 1; i < this.container.length; i++) {
            painter = this.container[i];
            coordinate = painter.applyModifiers(realX, realY);
            painter.paint(coordinate, brushSize, brushOpacity, mode);
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
    applyModifiers: function (x, y) {
        return {'x': x, 'y': y};
    },
    paint: function (coordinate, lineWidth, opacity, compositeOperation) {
        for (var i = 0; i < this.painters.length; i++) {
            // XXX: tidy up
            x = coordinate.x;
            y = coordinate.y;

            painter = this.painters[i];

            coordinate = this.instanceModifier.modify(x, y);
            painter.paint(coordinate, lineWidth, opacity, compositeOperation);
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
    applyModifiers: function (x, y) {
        coordinate = this.instanceModifier.modify(x, y);

        for (var i = 0; i < this.strokeModifiers.length; i++) {
            strokeModifier = this.strokeModifiers[i];

            // XXX: tidy up! (implement Coordinate helper class)
            coordinate = strokeModifier.modify(x, y);
            x = coordinate.x;
            y = coordinate.y;
        }

        return coordinate;
    },
    paint: function (coordinate, lineWidth, opacity, compositeOperation) {
        this.cursor.setLocation(coordinate);

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
        this.current = {'x': null, 'y': null};
        this.previous = {'x': null, 'y': null};
    },
    destroy: function () {},
    setLocation: function (coordinate) {
        this.previous['x'] = this.current['x'];
        this.previous['y'] = this.current['y'];
        this.current['x'] = coordinate.x;
        this.current['y'] = coordinate.y;
    },
    hasPreviousLocation: function() {
        // XXX: check if this fails at zero/zero case!
        return this.previous['x'] || this.previous['y'];
    },
    getProxy: function () {
        return {'current': {'x': this.current.x, 'y': this.current.y},
            'previous': {'x': this.previous.x, 'y': this.previous.y}};
    }
}