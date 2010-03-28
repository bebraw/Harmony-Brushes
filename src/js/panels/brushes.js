/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function brushes() {
    this.init();
}
brushes.prototype = {
    init: function () {
        this.brushSize = 1;
        this.brushOpacity = 50;
        this.selected = BRUSHES[0];
    },
    initUI: function () {
        setUpPod("Brushes");

        $('#brushesPod').click(function() {
            $(this).css('visibility', 'hidden'); //hide();
            $('#brushesCheckbox').attr('checked', false);
            $('#brushesPanel').dialog('open');
        });

        // set up brushes panel
        $("body").append('<div class="panel" id="brushesPanel" title="Brushes"> \
                <div id="brushes" style="height:170px;overflow:auto;"></div> \
                <p> \
                    <label for="brushSize">Brush Size:</label> \
                    <input type="text" id="brushSize" style="border:0; color:#f6931f; font-weight:bold; width: 2em; background-color: black" /> \
                </p> \
                <div id="brushSizeMax"></div> \
                <p> \
                    <label for="brushOpacity">Brush Opacity:</label> \
                    <input type="text" id="brushOpacity" style="border:0; color:#f6931f; font-weight:bold; width: 2em; background-color: black" /> \
                </p> \
                <div id="brushOpacityMax"></div> \
        </div>');

        for (i = 0; i < BRUSHES.length; i++) {
            brushName = BRUSHES[i];
            brushId = brushName; //XXX: use + 'Brush'; to avoid id clashes!

            $("#brushes").append('<canvas class="brush" id="' + brushId + '"' +
                ' style="height:4em;width:184px"' +  '></canvas>');
            $('.brush:first').css('border', '2px solid red');

            $('#' + brushId).click(function() {
                panels['brushes'].selected = $(this).attr('id');

                // XXX: render bg as gray instead?
                $('.brush').css('border', '');
                $(this).css('border', '2px solid red');
            });
        }

        this.renderBrushPreviews();

        $("#brushesPanel").dialog({
           closeOnEscape: false, resizable: false, width: 230, height: 350,
           autoOpen: false
        });

        $("#brushesPanel").dialog( "option", "position", "left" );
        $("#brushesPanel").bind( "dialogclose", function(event, ui) {
            $("#brushesPod").css("visibility", "visible");}
        );

        $("#brushSizeMax").slider({
            range: "max",
            min: 1,
            max: 30,
            value: panels['brushes'].brushSize,
            slide: function(event, ui) {
                $("#brushSize").val(ui.value);
                brushesPanel = panels['brushes'];

                brushesPanel.brushSize = ui.value;
                brushesPanel.renderBrushPreviews();
            }
        });
        $("#brushSize").val($("#brushSizeMax").slider("value"));

        $("#brushOpacityMax").slider({
            range: "max",
            min: 0,
            max: 100,
            value: panels['brushes'].brushOpacity,
            slide: function(event, ui) {
                $("#brushOpacity").val(ui.value);
                brushesPanel = panels['brushes'];

                brushesPanel.brushOpacity = ui.value;
                brushesPanel.renderBrushPreviews();
            }
        });
        $("#brushOpacity").val($("#brushOpacityMax").slider("value"));
    },
    destroy: function () {},
    renderBrushPreviews: function () {
        for (i = 0; i < BRUSHES.length; i++) {
            brushName = BRUSHES[i];
            brushId = brushName; //XXX: use + 'Brush'; to avoid id clashes!

            this.renderBrushPreview(brushId);
        }
    },
    renderBrushPreview: function (brushId) {
        brushCanvas = new ProxyCanvas(brushId);
        brushCanvas.fill('white');

        brush = eval("new " + brushName + "()");

        brushPainter = new Painter(brushCanvas, brush,
            panels['palette'].getColor());

        canvasWidth = brushCanvas.width;
        pad = 10;

        for (x = pad; x < canvasWidth - pad; x+=10) {
            y = Math.sin((x - pad) / (canvasWidth - pad) * 2 * Math.PI) *
                (brushCanvas.height / 2 - pad * 2) + (brushCanvas.height / 2);

            coordinate = {'x': x, 'y': y};
            brushPainter.paint(coordinate, this.brushSize, this.brushOpacity,
                "source-over");
        }

        brushCanvas.text(brushId, 'black', '48px Segoe UI, Arial, sans-serif', 10,
        brushCanvas.height / 2);
    },
    getSelected: function () {
        return eval("new " + this.selected + '()');
    },
    getSize: function () {
        return this.brushSize;
    },
    getOpacity: function () {
        return this.brushOpacity;
    },
    getMode: function () {
        return "source-over"; // TODO: implement mode selector!
    }
}
