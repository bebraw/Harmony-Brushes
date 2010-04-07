/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function colorToHex(color) {
    // http://stackoverflow.com/questions/638948/background-color-hex-to-js-variable-jquery
    var parts = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]

    delete (parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return parts.join('');
};

function hexToRGB(a) {
    // http://blog.lotusnotes.be/domino/archive/2007-08-04-javascript-color-functions.html
    // returns RGB in range [0, 255]
    var o=a.toLowerCase()
    return[parseInt(o.slice(0, 2), 16), parseInt(o.slice(2, 4), 16), parseInt(o.slice(4), 16)]
}

function RGBtoHex(a) {
    function decimalToHex(d) {
        var ret = d.toString(16).split('.')[0];

        if( ret.length < 2 ) {
            return 0 + ret
        }

        return ret.slice(0, 2);
    }

    return decimalToHex(a[0]) + decimalToHex(a[1]) + decimalToHex(a[2]);
}

function colorLerp(a, b, fac) {
    // expects that a and b are given in hex (ie. 00ff00)
    // fac should be in range [0.0, 1.0]
    // returns hex
    var aRgb = hexToRGB(a);
    var bRgb = hexToRGB(b);
    var iFac = 1 - fac;
    var lerpRgb = [aRgb[0] * iFac + bRgb[0] * fac,
        aRgb[1] * iFac + bRgb[1] * fac,
        aRgb[2] * iFac + bRgb[2] * fac];

    return RGBtoHex(lerpRgb);
}
