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
    add: function (canvas, brush, color, modifier) {
        this.container.push(new Painter(canvas, brush, color, modifier));
    },
    paint: function (x, y, brushSize, mode) {
        for (var i = 0; i < this.container.length; i++) {
            painter = this.container[i];

            painter.paint(x, y, brushSize, mode);
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
    },
    destroy: function () {},
    paint: function (x, y, lineWidth, compositeOperation) {
        coordinate = this.modifier.modify(x, y);
        this.cursor.setLocation(coordinate);

        if( this.cursor.hasPreviousLocation() ) {
            this.canvas.context.lineWidth = lineWidth;
            this.canvas.context.globalCompositeOperation = compositeOperation;

            this.brush.stroke(this.canvas, this.cursor.getProxy(), this.color);
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