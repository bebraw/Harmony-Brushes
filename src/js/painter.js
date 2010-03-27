/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function Painter(canvas, brush, color) {
    this.init(canvas, brush, color);
}
Painter.prototype = {
    init: function (canvas, brush, color) {
        this.canvas = canvas;
        this.brush = brush;
        this.color = color;
        this.cursor = new Cursor();
    },
    destroy: function () {},
    paint: function (x, y, lineWidth, compositeOperation) {
        this.cursor.setLocation(x, y);

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
    setLocation: function (x, y) {
        this.previous['x'] = this.current['x'];
        this.previous['y'] = this.current['y'];
        this.current['x'] = x;
        this.current['y'] = y;
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