/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */

// globals
panels = {};
brushes = {};
modifiers = {};
projectors = {};

// XXX: move to a nicer place (abstract out as a Mouse class?)
// + figure out how to get loc without having to move mouse
mouseLocation = new Point();
mousePressed = false; // XXX
moveCallbacks = {}; // XXX

// includes
$(function(){
    var includes = {'brushes': {'items': BRUSHES},
        'modifiers': {'items': MODIFIERS},
        'projectors': {'items': PROJECTORS}, // canvas panel depends on this!
        'panels': {'items': PANELS, 'callback': function () {
            for (var panelName in panels) {
                panels[panelName].init();
            }

            // CSS hacks
            $('.column').children().css('background-color', 'black');
            $('.column').find('*').css('z-index', '100');
        }}
    };

    for (var packageName in includes) {
        var pkg = includes[packageName];
        var includeItems = pkg.items;
        var includePaths = [];
        var includeCallback = 'callback' in pkg? pkg.callback: function() {};

        for (var i = 0; i < includeItems.length; i++) {
            var moduleName = includeItems[i];
            var scriptPath = 'js/' + packageName + '/' + moduleName + '.js';

            includePaths.push(scriptPath);
        }
        
        $.include(includePaths, includeCallback);
    }
});
