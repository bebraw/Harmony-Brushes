/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function canvas() {
    this.init();
}
canvas.prototype = {
    init: function () {
        setUpPod("Canvas");

        $('#canvasPod').click(function() {
            $(this).hide();
            $('#canvasCheckbox').attr('checked', false);
            $('#canvasPanel').dialog('open');
        });

        // set up background panel
        $("body").append('<div class="panel" id="canvasPanel" title="Canvas"> \
            <div id="canvasOptions"> \
            <input type="radio" id="solidCanvas" name="radio" checked="checked" /><label for="solidCanvas">Solid</label> \
            <input type="radio" id="gradientCanvas" name="radio" /><label for="gradientCanvas">Gradient</label> \
            <input type="radio" id="textureCanvas" name="radio" /><label for="textureCanvas">Texture</label> \
            </div> \
            <div id="solidColorSelector"><div></div></div> \
            </div>');

        $("#canvasOptions").css("margin-bottom", "0.5em");

        $("#solidColorSelector div").css("backgroundColor", "white");
        $("#solidColorSelector div").css("width", "2em");
        $("#solidColorSelector div").css("height", "2em");

        $("#canvasOptions").buttonset();

        $('#solidColorSelector').ColorPicker({
                color: '#FFFFFF',
                onChange: function (hsb, hex, rgb) {
                        $('#solidColorSelector div').css('backgroundColor', '#' + hex);
                }
        });

        $("#canvasPanel").dialog({
           closeOnEscape: false, resizable: false, width: 230, autoOpen: false
        });

        $("#canvasPanel").dialog( "option", "position", ["left", "bottom"] );
        $("#canvasPanel").bind( "dialogclose", function(event, ui) {
            $("#canvasPod").show();
        });
    },
    destroy: function () {}
}

function ProxyCanvas(canvasId) {
    this.init(canvasId);
}
ProxyCanvas.prototype = {
    init: function (canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");

        this.width = this.canvas.width;
        this.height = this.canvas.height;
    },
    destroy: function () {},
    fill: function (colorName) {
        this.context.fillStyle = colorName;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    text: function (label, colorName, font, x, y) {
        this.context.fillStyle = colorName;
        this.context.font = font;
        this.context.fillText(label, x, y);
    }
}
