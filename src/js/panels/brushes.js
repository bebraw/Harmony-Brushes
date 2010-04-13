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

        this.brushes = {};
        
        for( var i = 0; i < BRUSHES.length; i++ ) {
            var brushName = BRUSHES[i];
            
            this.brushes[brushName] = eval("new " + brushName + '()');
        }

        this.selected = BRUSHES[0];
    },
    initHotkeys: function () {
        function toggleBrushValue(hotkey, attributeName) {
            shortcut.add(hotkey, function(e) {
                // TODO: figure out how to do this properly
                //$('#' + attributeName).button("option", "value", "true");
            });
        }

        function increaseBrushValue(hotkey, attributeName) {
            shortcut.add(hotkey, function(e) {
                var currentSize = $("#" + attributeName).slider("value");

                $("#" + attributeName).slider("value", currentSize + 1);
            });
        }

        function decreaseBrushValue(hotkey, attributeName) {
            shortcut.add(hotkey, function(e) {
                var currentSize = $("#" + attributeName).slider("value");

                $("#" + attributeName).slider("value", currentSize - 1);
            });
        }

        // TODO: add hotkeys for modes and shading too

        toggleBrushValue(TOGGLE_BRUSH_SIZE_PRESSURE, 'brushsizepressure');
        increaseBrushValue(INCREASE_BRUSH_SIZE, 'brushsize');
        decreaseBrushValue(DECREASE_BRUSH_SIZE, 'brushsize');
        increaseBrushValue(INCREASE_BRUSH_SIZE_JITTER, 'brushsizejitter');
        decreaseBrushValue(DECREASE_BRUSH_SIZE_JITTER, 'brushsizejitter');

        toggleBrushValue(TOGGLE_BRUSH_OPACITY_PRESSURE, 'brushopacitypressure');
        increaseBrushValue(INCREASE_BRUSH_OPACITY, 'brushopacity');
        decreaseBrushValue(DECREASE_BRUSH_OPACITY, 'brushopacity');
        increaseBrushValue(INCREASE_BRUSH_OPACITY_JITTER, 'brushopacityjitter');
        decreaseBrushValue(DECREASE_BRUSH_OPACITY_JITTER, 'brushopacityjitter');

        increaseBrushValue(INCREASE_BRUSH_LOCATION_JITTER, 'brushlocationjitter');
        decreaseBrushValue(DECREASE_BRUSH_LOCATION_JITTER, 'brushlocationjitter');
    },
    initUI: function (parentId) {
        var panelWidth = 220;
        setUpPanel(parentId, "Brushes", "left", panelWidth, 410);

        // set up brushes panel
        $("#brushesPanel").append('<div id="brushes" style="height:170px;overflow:auto;"></div>' +
            '<div id="brushOptions"></div>');

        // modes
        $("#brushOptions").append('<div id="brushMode" style="margin-top:0.5em;"> \
                <input type="radio" id="lightenMode" name="brushMode" value="lighter" /><label style="width: 33%" for="lightenMode">Lighten</label> \
                <input type="radio" id="normalMode" name="brushMode" value="source-over" checked="checked" /><label style="width: 33%" for="normalMode">Normal</label> \
                <input type="radio" id="darkenMode" name="brushMode" value="darker" /><label style="width: 33%" for="darkenMode">Darken</label> \
            </div> \
        ');

        $("#brushMode").buttonset();

        // TODO: figure out a neat way to visualize different modes
        //$("#brushMode").buttonset().click( function() {
        //    panels['brushes'].renderBrushPreviews();
        //});

        // shading
        $("#brushOptions").append('<div id="brushShading" style="margin-top:0.5em;"> \
                <input type="radio" id="currentShading" name="brushShading" value="current" checked="checked" /><label style="width: 33%" for="currentShading">Current</label> \
                <input type="radio" id="sameShading" name="brushShading" value="same" /><label style="width: 33%" for="sameShading">Same</label> \
                <input type="radio" id="allShading" name="brushShading" value="all" /><label style="width: 33%" for="allShading">All</label> \
            </div> \
        ');

        // labels
        $("#brushOptions").append('<div id="brushShading" style="margin-top:0.5em; width: 100%;"> \
                <div style="width: 33%; display: inline; float:left" for="currentShading">Attribute</div> \
                <div style="width: 33%; display: inline; float:left" for="sameShading">Value</div> \
                <div style="width: 33%; display: inline; float:left" for="allShading">Jitter</div> \
            </div> \
        ');

        $("#brushShading").buttonset();

        for (var brushOptionName in this.brushOptions) {
            var brushOptionValue = this.brushOptions[brushOptionName];

            $("#brushOptions").append('<div style="width:100%; margin-top:1em; margin-bottom;0.5em;">');

            var optionTitle = capitalizeFirstLetter(brushOptionName);
            var optionId = 'brush' + brushOptionName;
            if('pressure' in brushOptionValue) {
                var pressureId = optionId + 'pressure';

                $("#brushOptions").append('<input type="checkbox" id="' +
                    pressureId + '" /><label for="' + pressureId +
                    '" style="float:left; width: 28%; margin-right:5%">' + optionTitle + '</label>');

                var pressureValue = brushOptionValue.pressure;

                if(pressureValue) {
                    $('#' + pressureId).attr('checked', 'checked');
                }

                $('#' + pressureId).button().click(
                    function () {
                        // XXX: hack! figure out a nicer way to pass option name!
                        var option = $(this).attr('id').replace('brush', '').replace('pressure', '');
                        var pressure = panels['brushes'].brushOptions[option].pressure;

                        panels['brushes'].brushOptions[option].pressure = !pressure;
                    }
                );
            }
            else {
                $("#brushOptions").append('<div style="float:left;">' +
                    optionTitle + '</div>');
            }

            $("#brushOptions").append('<div style="float:left; width: 28%; margin-right: 5%; margin-top: 0.5em;" id="' +
                optionId + '"></div>');

            if('value' in brushOptionValue) {
                $("#" + optionId).slider({
                    range: "max",
                    min: brushOptionValue.min,
                    max: brushOptionValue.max,
                    value: brushOptionValue.value,
                    change: function(event, ui) { // XXX: hook up this handler with slide too (preview!)
                        // XXX: hack! figure out a nicer way to pass option name!
                        var option = $(this).attr('id').replace('brush', '');
                        panels['brushes'].brushOptions[option].value = ui.value;
                        panels['brushes'].renderBrushPreviews();
                    }
                });
            }

            var jitterAmountId = optionId + 'jitter';
            $("#brushOptions").append(
                '<div class="jitter"> \
                    <div style="float:right; width: 28%; margin-right: 5%; margin-top: 0.5em;" id="' + jitterAmountId + '"></div> \
                </div> \
                '
            );

            this.brushOptions[brushOptionName]['jitter'] = {'enabled': false,
                'value': 0};

            $("#brushOptions").append('<div style="clear:both;"></div></div>');

            this.setUpJitter(jitterAmountId);
        }

        // XXX: figure out the width in a nicer way
        this.createBrushes(panelWidth / 2.8);
    },
    setUpJitter: function ( jitterAmountId ) {
        $("#" + jitterAmountId).slider({
            range: "max",
            min: 0,
            max: 50, // XXX: 100 for totally random, not really useful though
            value: 0,
            change: function(event, ui) { // XXX: hook up this handler with slide too (preview!)
                // XXX: hack! figure out a nicer way to pass option name!
                var option = $(this).attr('id').replace('jitter', '').replace('brush', '');
                panels['brushes'].brushOptions[option].jitter.value = ui.value;
                panels['brushes'].renderBrushPreviews();
            }
        });
    },
    createBrushes: function ( brushWidth ) {
        for (var i = 0; i < BRUSHES.length; i++) {
            var brushName = BRUSHES[i];
            var brushId = brushName; //XXX: use + 'Brush'; to avoid id clashes!
            var brushHeight = 40;

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
        for (var brushName in this.brushes) {
            var brush = this.brushes[brushName];

            this.renderBrushPreview(brushName, brush);
        }
    },
    renderBrushPreview: function (brushName, brush) {
        var brushCanvas = new ProxyCanvas(brushName); // XXX: add Canvas suffix?
        brushCanvas.fill([255, 255, 255]); // XXX: set background color using CSS instead

        if( SHOWPREVIEWIMAGES ) {
            var brushPainter = new Painter(brushCanvas, brush,
                panels['palette'].getColor());

            var canvasWidth = brushCanvas.width;
            var pad = 10;

            for (var x = pad; x < canvasWidth - pad; x += 5) {
                var y = Math.sin(5 * (x - pad) / (canvasWidth - pad) * 2 * Math.PI) *
                    (brushCanvas.height / 2 - pad * 2) + (brushCanvas.height / 2);

                var point = new Point(x, y);
                point = this.applyJitter(point);
                brushPainter.paint(point, this.getSize(), this.getOpacity(),
                    this.getMode());
            }
        }

        brushCanvas.text(brushName, 'black', '48px Segoe UI, Arial, sans-serif',
            10, brushCanvas.height / 2);
    },
    applyJitter: function ( point ) {
        var randomDirection = getRandomDirection(this.brushOptions.location.jitter.value);

        return point.add(randomDirection);
    },
    getSelected: function () {
        return this.brushes[this.selected];
    },
    getSize: function () {
        return this.getValueTemplate('size');
    },
    getOpacity: function () {
        return this.getValueTemplate('opacity') / 100;
    },
    getValueTemplate: function (valueName) {
        var value = this.brushOptions[valueName].value;

        var jitterValue = this.brushOptions[valueName].jitter.value / 100;
        var valueMax = this.brushOptions[valueName].max;
        var valueMin = this.brushOptions[valueName].min;
        var randomValue = Math.random() * ((value - valueMin) / (valueMax - valueMin));
        var jitterNeg = value * jitterValue * randomValue;

        value = value - jitterNeg;

        if(this.brushOptions[valueName].pressure) {
            return value * this.wacom.pressure;
        }

        return value;
    },
    getMode: function () {
        return $('#brushMode input:checked').val();
    },
    getShadingType: function () {
        return $('#brushShading input:checked').val();
    }
}
