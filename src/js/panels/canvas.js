/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
panels.canvas = {
    parentId: 'canvasColumn',
    init: function () {
        this.projection = new projection();

        this._initUI();
    },
    _initUI: function () {
        setUpPanel(this.parentId, "Canvas", ["left", "bottom"], 230);

        // set up background panel
        $("#canvasPanel").append('<div id="canvasOptions"> \
                    <input type="radio" id="solidCanvas" name="canvasOptions" checked="checked" value="solid" /><label for="solidCanvas">Solid</label> \
                    <input type="radio" id="gradientCanvas" name="canvasOptions" value="gradient" /><label for="gradientCanvas">Gradient</label> \
                    <input type="radio" id="textureCanvas" name="canvasOptions" value="texture" /><label for="textureCanvas">Texture</label> \
                </div>');

        var backgroundColor = BACKGROUNDCOLOR.toHex();
        
        $('#canvasPanel').append('<div id="solidColorSelector"> \
                <input style="width: 1em; height: 1em; position: relative" class="color {valueElement:' +
                "'backgroundColor'" + '}" /> \
                <input type="hidden" id="backgroundColor" value="' +
                backgroundColor + '" /> \
            </div>');

        $('#backgroundColor').change(function(e) {
            $('.activePage').css('backgroundColor', '#' + $(this).val());
        });

        $("#canvasOptions").css("margin-bottom", "0.5em").buttonset();
    }
}
