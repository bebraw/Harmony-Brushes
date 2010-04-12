/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function palette() {}
palette.prototype = {
    initUI: function () {
        setUpPanel("Palette", ["right", "bottom"], 180, 160);

        // set up background panel
        $("#palettePanel").append('<div id="paletteColors" style="position: relative; left:-4em;"> \
                </div>');

        // set up first row
        var topLeftBoundColor = "000000";
        $('#paletteColors').append('<ul id="firstPaletteRow"><li style="margin-right:' + (AMOUNTOFCOLORS + 1) + 'em"> \
                <input style="width: 1em; height: 1em;" class="color {valueElement:' +
                "'topLeftBoundColor'" + '}" /> \
                <input type="hidden" class="boundColor" id="topLeftBoundColor" value="' +
                topLeftBoundColor + '" /> \
            </li>');

        var topRightBoundColor = "888888";
        $('#firstPaletteRow').append('<li> \
                <input style="width: 1em; height: 1em;" class="color {valueElement:' +
                "'topRightBoundColor'" + '}" /> \
                <input type="hidden" class="boundColor" id="topRightBoundColor" value="' +
                topRightBoundColor + '" /> \
            </li>');

        $('#paletteColors').append('</ul>');

        $('#firstPaletteRow li').css('display', 'inline').css('list-style-type', 'none');

        // set up color rows
        for( var i = 0; i < AMOUNTOFCOLORS; i++ ) {
            var paletteRowId = 'paletteRow' + i;
            $('#paletteColors').append('<ul class="paletteColorRow" id="' + paletteRowId + '"></ul>');

            for( var j = 0; j < AMOUNTOFCOLORS; j++ ) {
                $('#' + paletteRowId).append('<li><input style="width: 1em; height: 1em;" class="clickableColor" /></li>');
            }

            $('#' + paletteRowId + ' li:first').css('margin-left', '1em');
        }

        $('.paletteColorRow li').css('display', 'inline').css('list-style-type', 'none');
        
        // set up last row
        var bottomLeftBoundColor = "888888";
        $('#paletteColors').append('<ul id="lastPaletteRow"><li style="margin-right:' + (AMOUNTOFCOLORS + 1) + 'em"> \
                <input style="width: 1em; height: 1em;" class="color {valueElement:' +
                "'bottomLeftBoundColor'" + '}" /> \
                <input type="hidden" class="boundColor" id="bottomLeftBoundColor" value="' +
                bottomLeftBoundColor + '" /> \
            </li>');

        var bottomRightBoundColor = "ffffff";
        $('#lastPaletteRow').append('<li> \
                <input style="width: 1em; height: 1em;" class="color {valueElement:' +
                "'bottomRightBoundColor'" + '}" /> \
                <input type="hidden" class="boundColor" id="bottomRightBoundColor" value="' +
                bottomRightBoundColor + '" /> \
            </li>');

        $('#lastColors').append('</ul>');

        $('#lastPaletteRow li').css('display', 'inline').css('list-style-type', 'none');

        $('#paletteColors ul').css('margin', '0 0 0 0');

        return;

        var leftBoundColor = "000000";
        var rightBoundColor = "ffffff";
        $('#paletteColors').append('<li> \
                <input style="width: 1em; height: 1em;" class="color {valueElement:' +
                "'leftBoundColor'" + '}" /> \
                <input type="hidden" class="boundColor" id="leftBoundColor" value="' +
                leftBoundColor + '" /> \
            </li>');

        for( var i = 0; i < AMOUNTOFCOLORS; i++ ) {
            $('#paletteColors').append('<li> \
                    <input style="width: 1em; height: 1em;" class="clickableColor" /> \
                </li>');
        }

        this._interpolateColors(leftBoundColor, rightBoundColor, AMOUNTOFCOLORS);

        // right bound
        $('#paletteColors').append('<li> \
                <input style="width: 1em; height: 1em;" class="color {valueElement:' +
                "'rightBoundColor'" + '}" /> \
                <input type="hidden" class="boundColor" id="rightBoundColor" value="' +
                rightBoundColor + '" /> \
            </li>');

        $('#paletteColors li').css('display', 'inline').css('list-style-type', 'none');

        $('.boundColor').change(function(e) {
            var hexColor = $(this).val();

            COLOR = hexToRGB(hexColor);
            panels['brushes'].renderBrushPreviews();

            leftBoundColor = $('#leftBoundColor').val();
            rightBoundColor = $('#rightBoundColor').val();

            panels['palette']._interpolateColors(leftBoundColor, rightBoundColor,
                AMOUNTOFCOLORS);
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
        shortcut.add(PREV_COLOR, function(e) {
            var prev = $(".activeColor").parent().prev().children(':first');
            prev.length && prev.focus();
        });

        shortcut.add(NEXT_COLOR, function(e) {
            var next = $(".activeColor").parent().next().children(':first');
            next.length && next.focus();
        });
    },
    getColor: function() {
        return COLOR;
    },
    _interpolateColors: function(leftBoundColor, rightBoundColor,
            amountOfColors) {
        $('.clickableColor').each(function(k, v) {
            var fac = (k + 1) / (amountOfColors + 2);
            var color = '#' + colorLerp(leftBoundColor, rightBoundColor, fac);

            $(this).css('background-color', color);
        });
    }
}
