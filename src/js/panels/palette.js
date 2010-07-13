/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */

// TODO: add color picker (samples from some predefined range using smooth gradient).
// how to handle "active" color in this case? show it at the main bar?
// make it possible to return to previous colors in history and show them as well?
// should history be lockable? -> custom color scheme (similar to the current system!)

panels.palette = {
    parentId: 'brushColumn',
    init: function () {
        this._initPaletteCornerColors();
        this._initHotkeys();
        this._initUI();
    },
    _initPaletteCornerColors: function () {
        for (var paletteCornerName in PALETTECORNERS) {
            var paletteCornerColor = PALETTECORNERS[paletteCornerName];

            PALETTECORNERS[paletteCornerName] = new RGBColor(paletteCornerColor);
        }
    },
    _initHotkeys: function () {
        shortcut.add(HOTKEYS.palette.up, function(e) {
            var listIndex = $(".activeColor").parent().index();
            var listItem = $($(".activeColor").parent().parent().prev().children()[listIndex]);
            var top = listItem.children(':first');

            top.length && top.focus();
        });

        shortcut.add(HOTKEYS.palette.down, function(e) {
            var listIndex = $(".activeColor").parent().index();
            var listItem = $($(".activeColor").parent().parent().next().children()[listIndex]);
            var bottom = listItem.children(':first');

            bottom.length && bottom.focus();
        });

        shortcut.add(HOTKEYS.palette.left, function(e) {
            var prev = $(".activeColor").parent().prev().children(':first');

            prev.length && prev.focus();
        });

        shortcut.add(HOTKEYS.palette.right, function(e) {
            var next = $(".activeColor").parent().next().children(':first');

            next.length && next.focus();
        });
    },
    _initUI: function () {
        var topLeftColor = PALETTECORNERS.topleft.toHex();
        var topRightColor = PALETTECORNERS.topright.toHex();
        var bottomLeftColor = PALETTECORNERS.bottomleft.toHex();
        var bottomRightColor = PALETTECORNERS.bottomright.toHex();

        setUpPanel(this.parentId, "Palette", ["right", "bottom"], 220, 160);

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

        // set up initial highlighting
        $('.clickableColor').css('border-color', 'white');
        $('.clickableColor:first').css('border-color', 'black');

        // set up event handlers
        $('.cornerColor').change(function(e) {
            var cornerName = $(this).attr('id').toLowerCase().replace('color', '');
            var hexColor = $(this).val();

            PALETTECORNERS[cornerName] = new RGBColor(hexColor);

            panels.palette._interpolateColors();
            panels.brushes.renderBrushPreviews();
        });

        $('.clickableColor').focus(function(e) {
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
            }

            var color = $(this).css('background-color');
            var hexColor = colorToHex(color);

            COLOR = new RGBColor(hexColor);
            panels.brushes.renderBrushPreviews();

            $('.clickableColor').removeClass('activeColor');
            $(this).addClass('activeColor');

            // highlight currently selected color
            $('.clickableColor').css('border-color', 'white');
            $(this).css('border-color', 'black');
        });

        $('.clickableColor:first').addClass('activeColor');
    },
    getColor: function() {
        return COLOR;
    },
    _interpolateColors: function() {
        var topLeftColor = PALETTECORNERS.topleft;
        var topRightColor = PALETTECORNERS.topright;
        var bottomLeftColor = PALETTECORNERS.bottomleft;
        var bottomRightColor = PALETTECORNERS.bottomright;

        for( var i = 0; i < AMOUNTOFCOLORROWS; i++ ) {
            var paletteRowId = 'paletteRow' + i;
            var fac = i / (AMOUNTOFCOLORROWS - 1);
            var leftBoundColor = topLeftColor.lerp(bottomLeftColor, fac);
            var rightBoundColor = topRightColor.lerp(bottomRightColor, fac);

            this._interpolateColorRow(paletteRowId, leftBoundColor,
                rightBoundColor);
        }
    },
    _interpolateColorRow: function(rowId, leftBoundColor, rightBoundColor) {
        $('#' + rowId + ' li input').each(function(k, v) {
            var fac = k / (AMOUNTOFCOLORCOLUMNS - 1);
            var color = leftBoundColor.lerp(rightBoundColor, fac);

            $(this).css('background-color', color.toHex());
        });
    }
}
