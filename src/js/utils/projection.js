/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function projection() {
    this.init();
}
projection.prototype = {
    init: function () {
        this.projections = {'x': false, 'y': false};
        this.initialValues = {'x': null, 'y': null};
    },
    initHotkeys: function () {
        var proj = this;

        shortcut.add('1', function(e) {
            proj.projections.x = true;
        });

        shortcut.add('1', function(e) {
            proj.projections.x = false;
        }, {'type': 'keyup'});

        shortcut.add('2', function(e) {
            proj.projections.y = true;
        });

        shortcut.add('2', function(e) {
            proj.projections.y = false;
        }, {'type': 'keyup'});

        // TODO: custom projection (towards target)
        shortcut.add('3', function(e) {
        });

        // TODO: custom projection (around target)
        shortcut.add('4', function(e) {
        });

        // TODO: custom projection (parallel to previously stored vec)
        shortcut.add('5', function(e) {
        });

        // TODO: set custom projection target
        shortcut.add('6', function(e) {
        });
    },
    apply: function ( point ) {
        if( this.projections.x ) {
            if( !this.initialValues.y ) {
                this.initialValues.y = point.y;
            }

            point.y = this.initialValues.y;
        }
        else {
            this.initialValues.y = null;
        }

        if( this.projections.y ) {
            if( !this.initialValues.x ) {
                this.initialValues.x = point.x;
            }

            point.x = this.initialValues.x;
        }
        else {
            this.initialValues.x = null;
        }
    }
}
