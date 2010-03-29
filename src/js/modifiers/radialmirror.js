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
        angle = 2 * Math.PI / (this.amount + 1);
        cosine = Math.cos(angle);
        sine = Math.sin(angle);

        centerX = window.innerWidth / 2;
        centerY = window.innerHeight / 2;

        originX = point.x - centerX;
        originY = point.y - centerY;

        return new Point(originX * cosine - originY * sine + centerX,
            originY * cosine + originX * sine + centerY);
    }
}
