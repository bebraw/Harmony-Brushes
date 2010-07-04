/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function projection() {
    this.init();
}
projection.prototype = {
    init: function () {
        this.projections = {'x': false, 'y': false, 'around': false}; // parallel

        this.initInitialValues();

        this.targetValue = new Point();
    },
    initInitialValues: function () {
        this.initialValue = new Point();
        this.projectionInitialSet = false;
    },
    initHotkeys: function () {
        var proj = this;

        shortcut.add(HOTKEYS.projection.horizontal, function(e) {
            proj.projections.x = true;
        });

        shortcut.add(HOTKEYS.projection.horizontal, function(e) {
            proj.projections.x = false;
        }, {'type': 'keyup'});

        shortcut.add(HOTKEYS.projection.vertical, function(e) {
            proj.projections.y = true;
        });

        shortcut.add(HOTKEYS.projection.vertical, function(e) {
            proj.projections.y = false;
        }, {'type': 'keyup'});

        shortcut.add(HOTKEYS.projection.radial, function(e) {
            proj.projections.around = true;
        });

        shortcut.add(HOTKEYS.projection.radial, function(e) {
            proj.projections.around = false;
        }, {'type': 'keyup'});

        // TODO: custom projection (parallel to previously stored vec)
        shortcut.add(HOTKEYS.projection.parallel, function(e) {
            alert('not implemented yet!');
        });

        shortcut.add(HOTKEYS.projection.setTarget, function(e) {
            proj.targetValue = mouseLocation;
        });
    },
    apply: function ( point ) {
        if( this.projections.around ) {
            if( !this.projectionInitialSet ) {
                this.projectionInitialSet = true;

                this.initialValue = point;
            }

            return projectRadially(this.targetValue, this.initialValue, point);
        }

        if( this.projections.x && this.projections.y ) {
            if( !this.projectionInitialSet ) {
                this.projectionInitialSet = true;
                
                this.initialValue = point;
            }

            return project(this.targetValue, this.initialValue, point);
        }
        this.projectionInitialSet = false;

        if( this.projections.x ) {
            if( !this.initialValue.y ) {
                this.initialValue.y = point.y;
            }

            point.y = this.initialValue.y;
        }
        else {
            this.initialValue.y = null;
        }

        if( this.projections.y ) {
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
