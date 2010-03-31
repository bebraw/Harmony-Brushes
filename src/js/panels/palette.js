/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function palette() {
    this.init();
}
palette.prototype = {
    init: function () {
        this.color = [0, 0, 0];
    },
    initUI: function () {
        setUpPod("Palette");

        $('#palettePod').click(function() {
            $(this).css("visibility", "hidden");
            $('#paletteCheckbox').attr('checked', false);
            $('#palettePanel').dialog('open');
        });

        colorSelectorFactory = new ColorSelectorFactory();

        // set up palette panel
        $("body").append('<div class="panel" id="palettePanel" title="Palette">' +
            '<div id="colorPicker" /></div></div>');

        var foregroundColorSelector = colorSelectorFactory.produce(200);
        foregroundColorSelector.addEventListener('change',
            onForegroundColorSelectorChange, false);
        foregroundColorSelector.container.style.visibility = 'visible';

        $("#colorPicker").append(foregroundColorSelector.container);

        function onForegroundColorSelectorChange( event )
        {
            panels['palette'].color = foregroundColorSelector.getColor();
            panels['brushes'].renderBrushPreviews();
        }

        $("#palettePanel").dialog({
            closeOnEscape: false,
            resizable: false,
            width: 230,
            height: 230,
            autoOpen: false
        });

        $("#palettePanel").dialog( "option", "position", "right" );
        $("#palettePanel").bind( "dialogclose", function(event, ui) {
            $("#palettePod").css("visibility", "visible");}
        );
    },
    destroy: function () {},
    getColor: function () {
        return this.color;
    }
}
