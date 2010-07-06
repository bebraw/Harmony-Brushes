/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
var BRUSHES = ["sketchy", "shaded", "chrome", "blur", "fur", "longfur", "web",
    "simple", "squares", "ribbon", "circles", "grid", "stringy", "curvy",
    "eraser"];
var MODIFIERS = ["array", "group", "horizontalmirror", "verticalmirror",
    "radialmirror"];
var PROJECTORS = ["horizontal", "vertical", "target", "radial", "parallel",
    "settarget", "cycletarget"];
var PANELS = ["brushes", "canvas", "modifiers", "playback", "palette"];

// color as RGB in range [0, 255]
var COLOR = [0, 0, 0];
var AMOUNTOFCOLORROWS = 5;
var AMOUNTOFCOLORCOLUMNS = 8;

// palette options
var PALETTECORNERS = {
    'topleft': [0, 0, 0],
    'topright': [128, 128, 128],
    'bottomleft': [128, 128, 128],
    'bottomright': [255, 255, 255],
}

// background options
var BACKGROUNDCOLOR = [128, 128, 128];

// stroke filtering options
var FILTERDISTANCE = 500;
var FILTERLENGTH = 3;

var SHOWPREVIEWIMAGES = false;
var PREVIEWFONTSIZE = '90px';

// projection options
var PROJECTIONTARGETRADIUS = 10;
var AMOUNTOFTARGETS = 3;

// hotkeys
var HOTKEYS = {
    'projection': {
        'horizontal': '1',
        'vertical': '2',
        'target': '3',
        'parallel': '4',
        'radial': '5',
        'settarget': '6',
        'cycletarget': '7'
    },
    'palette': {
        'up': 'i',
        'down': 'k',
        'left': 'j',
        'right': 'l'
    },
    'brushes': {
        'size': {
            'toggle': 'q',
            'decrease': 'w',
            'increase': 'e',
            'decreaseJitter': 'r',
            'increaseJitter': 't'
        },
        'opacity': {
            'toggle': 'a',
            'decrease': 's',
            'increase': 'd',
            'decreaseJitter': 'f',
            'increaseJitter': 'g'
        },
        'location': {
            'decreaseJitter': 'v',
            'increaseJitter': 'b'
        }
    }
};
