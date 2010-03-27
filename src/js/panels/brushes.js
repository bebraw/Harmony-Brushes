/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function brushes() {
    this.init();
}
brushes.prototype = {
    init: function () {
        setUpPod("Brushes");

        $('#brushesPod').click(function() {
            $(this).hide();
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
        </div>');

        for (i = 0; i < BRUSHES.length; i++) {
            brushName = BRUSHES[i];
            brushId = brushName; //XXX: use + 'Brush'; to avoid id clashes!

            $("#brushes").append('<canvas class="brush" id="' + brushId + '"' +
                ' style="height:4em;width:188px"' +  '></canvas>');

            $('#' + brushId).click(function() {
                panels['brushes'].selected = $(this).attr('id');
            });
        }

        this.renderBrushPreviews();

        this.selected = BRUSHES[0];

        $("#brushesPanel").dialog({
           closeOnEscape: false, resizable: false, width: 230, height: 300,
           autoOpen: false
        });

        $("#brushesPanel").dialog( "option", "position", "left" );
        $("#brushesPanel").bind( "dialogclose", function(event, ui) {$("#brushesPod").show();} );

        $("#brushSizeMax").slider({
            range: "max",
            min: 1,
            max: 30,
            value: 4,
            slide: function(event, ui) {
                $("#brushSize").val(ui.value);
                BRUSH_SIZE = ui.value;
                
                brushesPanel = panels['brushes']
                brushesPanel.renderBrushPreviews();
            }
        });
        $("#brushSize").val($("#brushSizeMax").slider("value"));

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

        brushPainter = new Painter(brushCanvas, brush, COLOR);

        canvasWidth = brushCanvas.width;
        pad = 10;

        for (x = pad; x < canvasWidth - pad; x+=10) {
            y = Math.sin((x - pad) / (canvasWidth - pad) * 2 * Math.PI) *
                (brushCanvas.height / 2 - pad * 2) + (brushCanvas.height / 2);

            brushPainter.paint(x, y, BRUSH_SIZE, "source-over");
        }

        brushCanvas.text(brushId, 'black', '64px sans-serif', 10,
        brushCanvas.height / 2);
    }
}
