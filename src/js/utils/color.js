/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function hexToRGB(a) {
    // http://blog.lotusnotes.be/domino/archive/2007-08-04-javascript-color-functions.html
    var o=a.toLowerCase()
    return[parseInt(o.slice(0,2),16),parseInt(o.slice(2,4),16),parseInt(o.slice(4),16)]
}
