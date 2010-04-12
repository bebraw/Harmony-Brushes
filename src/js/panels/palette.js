/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function palette() {}
palette.prototype = {
    initUI: function () {
        setUpPanel("Palette", ["right", "bottom"], 230);

        // set up background panel
        $("#palettePanel").append('<div id="paletteColors"> \
                </div>');

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

        interpolateColors(leftBoundColor, rightBoundColor, AMOUNTOFCOLORS);

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

            interpolateColors(leftBoundColor, rightBoundColor,
                AMOUNTOFCOLORS);
        });

        function interpolateColors(leftBoundColor, rightBoundColor, amountOfColors) {
            $('.clickableColor').each(function(k, v) {
                var fac = (k + 1) / (amountOfColors + 2);
                var color = '#' + colorLerp(leftBoundColor, rightBoundColor, fac);

                $(this).css('background-color', color);
            });
        }

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
    }
}
