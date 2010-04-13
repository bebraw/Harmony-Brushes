/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */

// TODO: add color picker (samples from some predefined range using smooth gradient).
// how to handle "active" color in this case? show it at the main bar?
// make it possible to return to previous colors in history and show them as well?
// should history be lockable? -> custom color scheme (similar to the current system!)

function palette() {}
palette.prototype = {
    initUI: function (parentId) {
        var topLeftColor = RGBtoHex(PALETTECORNERS['topleft']);
        var topRightColor = RGBtoHex(PALETTECORNERS['topright']);
        var bottomLeftColor = RGBtoHex(PALETTECORNERS['bottomleft']);
        var bottomRightColor = RGBtoHex(PALETTECORNERS['bottomright']);

        setUpPanel(parentId, "Palette", ["right", "bottom"], 220, 160);

        // set up background panel
        $("#palettePanel").append('<div id="paletteColors" style="position: relative; left:-4em;"> \
                </div>');

        // set up first row
        $('#paletteColors').append('<ul id="firstPaletteRow"><li style="margin-right:' + (AMOUNTOFCOLORCOLUMNS + 2) + 'em"> \
                <input style="width: 1em; height: 1em;" class="color {valueElement:' +
                "'topLeftColor'" + '}" /> \
                <input type="hidden" class="cornerColor" id="topLeftColor" value="' +
                topLeftColor + '" /> \
            </li>');

        $('#firstPaletteRow').append('<li> \
                <input style="width: 1em; height: 1em;" class="color {valueElement:' +
                "'topRightColor'" + '}" /> \
                <input type="hidden" class="cornerColor" id="topRightColor" value="' +
                topRightColor + '" /> \
            </li>');

        $('#paletteColors').append('</ul>');

        $('#firstPaletteRow li').css('display', 'inline').css('list-style-type', 'none');

        // set up color rows
        for( var i = 0; i < AMOUNTOFCOLORROWS; i++ ) {
            var paletteRowId = 'paletteRow' + i;
            $('#paletteColors').append('<ul class="paletteColorRow" id="' + paletteRowId + '"></ul>');

            for( var j = 0; j < AMOUNTOFCOLORCOLUMNS; j++ ) {
                $('#' + paletteRowId).append('<li><input style="width: 1em; height: 1em;" class="clickableColor" /></li>');
            }

            $('#' + paletteRowId + ' li:first').css('margin-left', '1em');
        }

        this._interpolateColors();

        $('.paletteColorRow li').css('display', 'inline').css('list-style-type', 'none');
        
        // set up last row
        $('#paletteColors').append('<ul id="lastPaletteRow"><li style="margin-right:' + (AMOUNTOFCOLORCOLUMNS + 2) + 'em"> \
                <input style="width: 1em; height: 1em;" class="color {valueElement:' +
                "'bottomLeftColor'" + '}" /> \
                <input type="hidden" class="cornerColor" id="bottomLeftColor" value="' +
                bottomLeftColor + '" /> \
            </li>');

        $('#lastPaletteRow').append('<li> \
                <input style="width: 1em; height: 1em;" class="color {valueElement:' +
                "'bottomRightColor'" + '}" /> \
                <input type="hidden" class="cornerColor" id="bottomRightColor" value="' +
                bottomRightColor + '" /> \
            </li>');

        $('#lastColors').append('</ul>');

        $('#lastPaletteRow li').css('display', 'inline').css('list-style-type', 'none');

        $('#paletteColors ul').css('margin', '0 0 0 0');

        // set up event handlers
        $('.cornerColor').change(function(e) {
            var cornerName = $(this).attr('id').toLowerCase().replace('color', '');
            var hexColor = $(this).val();

            PALETTECORNERS[cornerName] = hexToRGB(hexColor);

            panels['palette']._interpolateColors();
            panels['brushes'].renderBrushPreviews();
        });

        $('.clickableColor').focus(function(e) {
            var color = $(this).css('background-color');
            var hexColor = colorToHex(color);

            COLOR = hexToRGB(hexColor);
            panels['brushes'].renderBrushPreviews();

            $('.clickableColor').removeClass('activeColor');
            $(this).addClass('activeColor');
        });

        $('.clickableColor:first').addClass('activeColor');

        // shortcuts for changing color
        shortcut.add(TOP_COLOR, function(e) {
            var listIndex = $(".activeColor").parent().index();
            var listItem = $($(".activeColor").parent().parent().prev().children()[listIndex]);
            var top = listItem.children(':first');

            top.length && top.focus();
        });

        shortcut.add(BOTTOM_COLOR, function(e) {
            var listIndex = $(".activeColor").parent().index();
            var listItem = $($(".activeColor").parent().parent().next().children()[listIndex]);
            var bottom = listItem.children(':first');

            bottom.length && bottom.focus();
        });

        shortcut.add(LEFT_COLOR, function(e) {
            var prev = $(".activeColor").parent().prev().children(':first');

            prev.length && prev.focus();
        });

        shortcut.add(RIGHT_COLOR, function(e) {
            var next = $(".activeColor").parent().next().children(':first');

            next.length && next.focus();
        });
    },
    getColor: function() {
        return COLOR;
    },
    _interpolateColors: function() {
        var topLeftColor = RGBtoHex(PALETTECORNERS['topleft']);
        var topRightColor = RGBtoHex(PALETTECORNERS['topright']);
        var bottomLeftColor = RGBtoHex(PALETTECORNERS['bottomleft']);
        var bottomRightColor = RGBtoHex(PALETTECORNERS['bottomright']);

        for( var i = 0; i < AMOUNTOFCOLORROWS; i++ ) {
            var paletteRowId = 'paletteRow' + i;
            var fac = i / (AMOUNTOFCOLORROWS - 1);
            var leftBoundColor = colorLerp(topLeftColor,
                bottomLeftColor, fac);
            var rightBoundColor = colorLerp(topRightColor,
                bottomRightColor, fac);

            this._interpolateColorRow(paletteRowId, leftBoundColor,
                rightBoundColor);
        }
    },
    _interpolateColorRow: function(rowId, leftBoundColor, rightBoundColor) {
        $('#' + rowId + ' li input').each(function(k, v) {
            var fac = k / (AMOUNTOFCOLORCOLUMNS - 1);
            var color = '#' + colorLerp(leftBoundColor, rightBoundColor, fac);

            $(this).css('background-color', color);
        });
    }
}
