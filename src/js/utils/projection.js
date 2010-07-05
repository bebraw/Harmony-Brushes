/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function projection() {
    this.init();
}
projection.prototype = {
    init: function () {
        this.projections = {'horizontal': false, 'vertical': false,
            'radial': false, 'parallel': false};

        this.initInitialValues();

        this.targetValue = new Point();
    },
    initInitialValues: function () {
        this.initialValue = new Point();
        this.projectionInitialSet = false;
    },
    initHotkeys: function () {
        var proj = this;

        function initProjection(name) {
            var hotkey = HOTKEYS.projection[name];

            shortcut.add(hotkey, function(e) {
                proj.projections[name] = true;
            });

            shortcut.add(hotkey, function(e) {
                proj.projections[name] = false;
            }, {'type': 'keyup'});
        }

        for (var projectionName in this.projections) {
            initProjection(projectionName)
        }

        shortcut.add(HOTKEYS.projection.setTarget, function(e) {
            proj.targetValue = mouseLocation;
        });
    },
    apply: function ( point ) {
        if( this.projections.radial ) {
            if( !this.projectionInitialSet ) {
                this.projectionInitialSet = true;

                this.initialValue = point;
            }

            return projectRadially(this.targetValue, this.initialValue, point);
        }

        if( this.projections.parallel ) {
            // TODO
        }

        if( this.projections.horizontal && this.projections.vertical ) {
            if( !this.projectionInitialSet ) {
                this.projectionInitialSet = true;
                
                this.initialValue = point;
            }

            return project(this.targetValue, this.initialValue, point);
        }
        this.projectionInitialSet = false;

        if( this.projections.horizontal ) {
            if( !this.initialValue.y ) {
                this.initialValue.y = point.y;
            }

            point.y = this.initialValue.y;
        }
        else {
            this.initialValue.y = null;
        }

        if( this.projections.vertical ) {
            if( !this.initialValue.x ) {
                this.initialValue.x = point.x;
            }

            point.x = this.initialValue.x;
        }
        else {
            this.initialValue.x = null;
        }

        return point
    }
}
