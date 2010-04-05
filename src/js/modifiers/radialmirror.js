/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function radialmirror() {
    this.init();
}
radialmirror.prototype = {
    attributes: {'amount': {'type': 'int', 'min': 1, 'max': 16, 'value': 1}},
    init: function () {},
    destroy: function () {},
    modify: function (point) {
        // TODO: use some nice math lib for rot?
        var angle = 2 * Math.PI / (this.amount + 1);
        var cosine = Math.cos(angle);
        var sine = Math.sin(angle);

        var canvasWidth = $('.activePage').width();
        var canvasHeight = $('.activePage').height();

        var centerX = canvasWidth / 2;
        var centerY = canvasHeight / 2;

        var originX = point.x - centerX;
        var originY = point.y - centerY;

        return new Point(originX * cosine - originY * sine + centerX,
            originY * cosine + originX * sine + centerY);
    }
}
