/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function RadialMirror() {
    this.init();
}
RadialMirror.prototype = {
    type: 'instance',
    attributes: {'amount': {'type': 'int', 'min': 1, 'max': 4, 'value': 1}},
    init: function () {},
    destroy: function () {},
    modify: function (x, y) {
        // x' = x cos f - y sin f
        // y' = y cos f + x sin f
        // f angle (1 -> 360 / 2, 2 -> 360 / 3, n -> 360 / (n+1)
        amount = 1;

        // XXX: replace with nice math lib
        angle = 2 * Math.PI / (amount + 1);
        cosine = Math.cos(angle);
        sine = Math.sin(angle);

        centerX = window.innerWidth / 2;
        centerY = window.innerHeight / 2;

        originX = x - centerX;
        originY = y - centerY;

        return {'x': originX * cosine - originY * sine + centerX,
                'y': originY * cosine + originX * sine + centerY};
    }
}
