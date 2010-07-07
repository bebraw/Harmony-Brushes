/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function settarget() {
    this.init();
}
settarget.prototype = {
    init: function () {
        var canvasDiameter = 1 + PROJECTIONTARGETRADIUS * 2;

        this.currentTarget = {
            _id: 0,
            get id() {
                return 'projectionTarget' + this._id;
            },
            cycle: function() {
                this._id = (this._id + 1) % AMOUNTOFTARGETS;
            }
        };

        for( var i = 0; i < AMOUNTOFTARGETS; i++ ) {
            var targetId = 'projectionTarget' + i;

            this.initTargetCanvas(targetId, canvasDiameter,
                DISABLEDTARGETCOLOR, PROJECTIONOVERLAYALPHA);

            this.onPress(new Point(), new Point());
        }

        this.initTargetCanvas('activeTarget', canvasDiameter,
            PROJECTIONOVERLAYCOLOR, 1.0);
    },
    initTargetCanvas: function ( id, diameter, color, alpha ) {
        $('#main').append('<canvas id="' + id + '"' +
            ' class="projectionTarget"' +
            ' width="' + diameter + '"' +
            ' height="' + diameter + '"' +
            ' style="z-index:100;position:absolute"></canvas>')

        var overlayCanvas = new ProxyCanvas(id);

        overlayCanvas.cross(new Point(10, 10), PROJECTIONTARGETRADIUS,
            color, alpha);

        this.onPress(new Point(), new Point());
    },
    onPress: function ( initialValue, targetValue ) {
        var targetId = this.currentTarget.id;
        var topCoord = initialValue.y - PROJECTIONTARGETRADIUS;
        var leftCoord = initialValue.x - PROJECTIONTARGETRADIUS;

        $('#' + targetId + ', #activeTarget').css('top', topCoord + 'px').
            css('left', leftCoord + 'px');

        targetValue.x = initialValue.x;
        targetValue.y = initialValue.y;

        this.currentTarget.cycle();
    }
}
