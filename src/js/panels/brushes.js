/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function brushes() {
    this.init();
}
brushes.prototype = {
    brushOptions: {'size': {'min': 1, 'max': 30, 'value': 1},
        'opacity': {'min': 0, 'max': 100, 'value': 50},
        'location': {}},
    init: function () {
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
        panelWidth = 150;
        $("body").append(
            '<div class="panel" id="brushesPanel" title="Brushes"> \
                <div id="brushes" style="height:170px;overflow:auto;"></div> \
                <div id="brushOptions"></div> \
            </div>'
        );

        $("#brushesPanel").dialog({
            closeOnEscape: false, resizable: true,
            width: panelWidth, minWidth: panelWidth, maxWidth: 360,
            height: 370, minHeight: 410,
            autoOpen: false
        });

        $("#brushesPanel").dialog("option", "position", "left");
        $("#brushesPanel").bind("dialogclose", function(event, ui) {
            $("#brushesPod").css("visibility", "visible");}
        );

        for (var brushOptionName in this.brushOptions) {
            brushOptionValue = this.brushOptions[brushOptionName];

            $("#brushOptions").append('<div style="width:100%; margin-top:1em;">');

            optionTitle = capitalizeFirstLetter(brushOptionName);
            $("#brushOptions").append('<div style="float:left;">' + optionTitle + ':</div>');

            optionId = 'brush' + brushOptionName;
            if(brushOptionValue) {
                $("#brushOptions").append('<div style="float:right; width: 48%" id="' + optionId + '"></div>');

                $("#" + optionId).slider({
                    range: "max",
                    min: brushOptionValue.min,
                    max: brushOptionValue.max,
                    value: brushOptionValue.value,
                    slide: function(event, ui) {
                        // XXX: hack! figure out a nicer way to pass option name!
                        option = $(this).attr('id').replace('brush', '');
                        panels['brushes'].brushOptions[option].value = ui.value;
                        panels['brushes'].renderBrushPreviews();
                    }
                });
            }

            $("#brushOptions").append('<div style="clear:both;"></div>');

            jitterToggleId = optionId + 'JitterToggle';
            jitterAmountId = optionId + 'JitterAmount';
            $("#brushOptions").append(
                '<div class="jitter"> \
                    <input type="checkbox" style="float:left;" id="' +
                        jitterToggleId + '" /><label for="' + jitterToggleId +
                        '">Jitter</label> \
                    <div style="float:right; width: 48%; margin-top: 0.5em;" id="' + jitterAmountId + '"></div> \
                </div> \
                <div style="clear:both;"></div> \
                '
            );

            this.brushOptions[brushOptionName]['jitter'] = {'enabled': false,
                'value': 0};

            $("#brushOptions").append('</div>');

            this.setUpJitter(jitterToggleId, jitterAmountId);
        }

        this.createBrushes(panelWidth - 45);
    },
    destroy: function () {},
    setUpJitter: function ( jitterToggleId, jitterAmountId ) {
        $("#" + jitterToggleId).button().toggle(
            function () {
                $(this).parent('.jitter').children('div').css('visibility',
                    'visible');
                // XXX: hack! figure out a nicer way to pass option name!
                option = $(this).attr('id').replace('JitterToggle', '').replace('brush', '');
                panels['brushes'].brushOptions[option].jitter.enabled = true;
                panels['brushes'].renderBrushPreviews();
            },
            function () {
                $(this).parent('.jitter').children('div').css('visibility',
                    'hidden');
                // XXX: hack! figure out a nicer way to pass option name!
                option = $(this).attr('id').replace('JitterToggle', '').replace('brush', '');
                panels['brushes'].brushOptions[option].jitter.enabled = false;
                panels['brushes'].renderBrushPreviews();
            }
        );

        $("#" + jitterAmountId).slider({
            range: "max",
            min: 0,
            max: 100,
            value: 0,
            slide: function(event, ui) {
                // XXX: hack! figure out a nicer way to pass option name!
                option = $(this).attr('id').replace('JitterAmount', '').replace('brush', '');
                panels['brushes'].brushOptions[option].jitter.value = ui.value;
                panels['brushes'].renderBrushPreviews();
            }
        }).css('visibility', 'hidden');
    },
    createBrushes: function ( brushWidth ) {
        for (i = 0; i < BRUSHES.length; i++) {
            brushName = BRUSHES[i];
            brushId = brushName; //XXX: use + 'Brush'; to avoid id clashes!

            $("#brushes").append('<canvas class="brush" id="' + brushId + '"' +
                ' style="height:4em;width:' + brushWidth + 'px"' +  '></canvas>');
            //$('.brush:first').css('border', '2px solid red');

            $('#' + brushId).click(function() {
                panels['brushes'].selected = $(this).attr('id');

                // XXX: render bg as gray instead?
                //$('.brush').css('border', '');
                //$(this).css('border', '2px solid red');
                // XXX: render border in the canvas itself!
            });
        }

        this.renderBrushPreviews();
    },
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

            point = new Point(x, y);
            brushPainter.paint(point, this.getSize(), this.getOpacity(),
                "source-over");
        }

        brushCanvas.text(brushId, 'black', '48px Segoe UI, Arial, sans-serif', 10,
        brushCanvas.height / 2);
    },
    getSelected: function () {
        return eval("new " + this.selected + '()');
    },
    getSize: function () {
        return this.getValueTemplate('size');
    },
    getOpacity: function () {
        return this.getValueTemplate('opacity');
    },
    getValueTemplate: function (valueName) {
        value = this.brushOptions[valueName].value;

        if(this.brushOptions[valueName].jitter.enabled) {
            jitterValue = this.brushOptions[valueName].jitter.value / 100;
            valueMax = this.brushOptions[valueName].max;
            valueMin = this.brushOptions[valueName].min;
            randomValue = Math.random() * ((value - valueMin) / (valueMax - valueMin));
            jitterNeg = value * jitterValue * randomValue;

            return value - jitterNeg;
        }

        return value;
    },
    getMode: function () {
        return "source-over"; // TODO: implement mode selector!
    }
}
