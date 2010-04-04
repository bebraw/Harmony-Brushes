/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function brushes() {
    this.init();
}
brushes.prototype = {
    brushOptions: {'size': {'min': 1, 'max': 30, 'value': 1, 'pressure': false},
        'opacity': {'min': 0, 'max': 100, 'value': 50, 'pressure': true},
        'location': {}},
    init: function () {
        this.wacom = document.embeds["wacomPlugin"];

        if(!this.wacom.isWacom) {
            this.wacom = {'pressure': 1.0}; // proxy
        }

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
        $("body").append(
            '<div class="panel" id="brushesPanel" title="Brushes"> \
                <div id="brushes" style="height:170px;overflow:auto;"></div> \
                <div id="brushOptions"></div> \
            </div>'
        );

        var panelWidth = 250, panelHeight = 550;
        $("#brushesPanel").dialog({
            closeOnEscape: false, resizable: false,
            width: panelWidth, minWidth: panelWidth, maxWidth: panelWidth,
            height: panelHeight, minHeight: panelHeight, maxHeight: panelHeight,
            autoOpen: false
        });

        $("#brushesPanel").dialog("option", "position", "left");
        $("#brushesPanel").bind("dialogclose", function(event, ui) {
            $("#brushesPod").css("visibility", "visible");}
        );

        $("#brushOptions").append('<div id="brushMode"> \
                <input type="radio" id="normalMode" name="brushMode" value="source-over" checked="checked" /><label for="normalMode">Normal</label> \
                <input type="radio" id="lightenMode" name="brushMode" value="lighter" /><label for="lightenMode">Lighten</label> \
                <input type="radio" id="darkenMode" name="brushMode" value="darker" /><label for="darkenMode">Darken</label> \
            </div> \
        ');

        // TODO: figure out a neat way to visualize different modes
        //$("#brushMode").buttonset().click( function() {
        //    panels['brushes'].renderBrushPreviews();
        //});

        $("#brushOptions").append('<div id="brushShading" style="margin-top:1em;"> \
                <input type="radio" id="currentShading" name="brushShading" value="current" checked="checked" /><label for="currentShading">Current</label> \
                <input type="radio" id="sameShading" name="brushShading" value="same" /><label for="sameShading">Same</label> \
                <input type="radio" id="allShading" name="brushShading" value="all" /><label for="allShading">All</label> \
            </div> \
        ');

        $("#brushShading").buttonset();

        for (var brushOptionName in this.brushOptions) {
            brushOptionValue = this.brushOptions[brushOptionName];

            $("#brushOptions").append('<div style="width:100%; margin-top:1em;">');

            optionTitle = capitalizeFirstLetter(brushOptionName);
            $("#brushOptions").append('<div style="float:left;">' +
                optionTitle + ':</div>');

            optionId = 'brush' + brushOptionName;
            if('pressure' in brushOptionValue) {
                pressureId = optionId + 'pressure';

                $("#brushOptions").append('<input type="checkbox" id="' +
                    pressureId + '" /><label for="' + pressureId +
                    '" style="float:right;">P</label>');

                pressureValue = brushOptionValue.pressure;

                if(pressureValue) {
                    $('#' + pressureId).attr('checked', 'checked');
                }

                $('#' + pressureId).button().click(
                    function () {
                        // XXX: hack! figure out a nicer way to pass option name!
                        option = $(this).attr('id').replace('JitterToggle', '').replace('brush', '').replace('pressure', '');
                        pressure = panels['brushes'].brushOptions[option].pressure;
                        panels['brushes'].brushOptions[option].pressure = !pressure;
                    }
                );
            }

            $("#brushOptions").append('<div style="clear:both;"></div>');

            if('value' in brushOptionValue) {
                $("#brushOptions").append('<div style="width:100%; margin-bottom:1em; margin-top:1em;" id="' +
                    optionId + '"></div>');

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

        // XXX: figure out the width in a nicer way
        this.createBrushes(panelWidth / 3 + 10);
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
            max: 50, // XXX: 100 for totally random, not really useful though
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
            brushHeight = 40;

            $("#brushes").append('<canvas class="brush" id="' + brushId + '"' +
                ' style="height:' + brushHeight + 'px;width:' + brushWidth +
                'px"' +  '></canvas>');
            $('.brush:first').css('border', '1px dashed');

            $('#' + brushId).click(function() {
                panels['brushes'].selected = $(this).attr('id');

                // XXX: render bg as gray instead?
                $('.brush').css('border', '');
                $(this).css('border', '1px dashed');
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

        for (x = pad; x < canvasWidth - pad; x += 5) {
            y = Math.sin(5 * (x - pad) / (canvasWidth - pad) * 2 * Math.PI) *
                (brushCanvas.height / 2 - pad * 2) + (brushCanvas.height / 2);

            point = new Point(x, y);
            point = this.applyJitter(point);
            brushPainter.paint(point, this.getSize(), this.getOpacity(),
                this.getMode());
        }

        brushCanvas.text(brushId, 'black', '48px Segoe UI, Arial, sans-serif',
            10, brushCanvas.height / 2);
    },
    applyJitter: function ( point ) {
        if(this.brushOptions.location.jitter.enabled) {
            randomDirection = getRandomDirection(this.brushOptions.location.jitter.value);

            return point.add(randomDirection);
        }
        
        return point;
    },
    getSelected: function () {
        return eval("new " + this.selected + '()');
    },
    getSize: function () {
        return this.getValueTemplate('size');
    },
    getOpacity: function () {
        return this.getValueTemplate('opacity') / 100;
    },
    getValueTemplate: function (valueName) {
        value = this.brushOptions[valueName].value;

        if(this.brushOptions[valueName].jitter.enabled) {
            jitterValue = this.brushOptions[valueName].jitter.value / 100;
            valueMax = this.brushOptions[valueName].max;
            valueMin = this.brushOptions[valueName].min;
            randomValue = Math.random() * ((value - valueMin) / (valueMax - valueMin));
            jitterNeg = value * jitterValue * randomValue;

            value = value - jitterNeg;
        }

        if(this.brushOptions[valueName].pressure) {
            return value * this.wacom.pressure;
        }

        return value;
    },
    getMode: function () {
        return $('#brushMode input:checked').val();
    }
}
