/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function modifiers() {
    this.init();
}
modifiers.prototype = {
    init: function () {
        this.modifierStatus = {}; // true = active, false = passive
        this.modifiers = {};
    },
    initUI: function () {
        setUpPod("Modifiers");

        $('#modifiersPod').click(function() {
            $(this).css("visibility", "hidden");
            $('#modifiersCheckbox').attr('checked', false);
            $('#modifiersPanel').dialog('open');
        });

        // set up modifiers panel
        $("body").append('<div class="panel" id="modifiersPanel" title="Modifiers">\
            <div id="instanceModifiers">Instance modifiers</div>\
            <div id="strokeModifiers">Stroke modifiers</div>\
            </div>');

        for (var i = 0; i < MODIFIERS.length; i++) {
            modifierName = MODIFIERS[i];
            modifierId = modifierName + 'Modifier';
            modifierLabel = modifierId + 'Label';
            modifier = eval("new " + modifierName + "()");

            this.modifierStatus[modifierId] = false;
            this.modifiers[modifierId] = modifier;

            $("#" + modifier.type + "Modifiers").append('<div id="' +
                modifierId +'" class="modifier"><input type="checkbox" id="' +
                modifierLabel + '" /><label for="' + modifierLabel + '">' +
                modifierName + '</label><div class="attributes"></div></div>');

            $('#' + modifierId + " input").click(function() {
                id = $(this).parent(".modifier").attr('id');
                panels['modifiers'].modifierStatus[id] = !panels['modifiers'].modifierStatus[id];
            });

            if('attributes' in modifier) {
                attributes = modifier['attributes'];

                for(var attributeName in attributes) {
                    attributeValues = attributes[attributeName];

                    if(attributeValues['type'] == 'int') {
                        modifier[attributeName] = attributeValues['value'];
                        attributeId = modifierId + attributeName;

                        $("#" + modifierId + " .attributes").append('<div id="' +
                            attributeId + '"><div class="attributeName" id="' +
                            attributeName + '"></div></div>'); //.hide();

                        $("#" + attributeId).slider({
                            range: "max",
                            min: attributeValues['min'],
                            max: attributeValues['max'],
                            value: attributeValues['value'],
                            slide: function(event, ui) {
                                modifierId = $(this).parents(".modifier").attr('id');
                                panels['modifiers'].modifiers[modifierId][$(this).children('.attributeName').attr('id')] = ui.value;
                            }
                        });

                        /*$("#" + modifierId).toggle(
                            function () {
                                $(this).children('.attributes').show();
                            },
                            function () {
                                $(this).children('.attributes').hide();
                            }
                        );*/
                    }
                }
            }
        }

        //$("#instanceModifiers").sortable();
        //$("#strokeModifiers").sortable();
        $("#modifiersPanel input").button();
        $("#modifiersPanel label").css("width", "130px").css("margin-bottom", "0.5em");

        $("#modifiersPanel").dialog({
           closeOnEscape: false, resizable: false, width: 150, autoOpen: false
        });

        $("#modifiersPanel").dialog( "option", "position", ["right", "top"] );
        $("#modifiersPanel").bind( "dialogclose", function(event, ui) {
            $("#modifiersPod").css("visibility", "visible");}
        );
    },
    destroy: function () {},
    getActiveInstanceModifiers: function () { // XXX: templatify
        ret = [];

        for (var modifierId in this.modifierStatus) {
            modifierActive = this.modifierStatus[modifierId];

            if(modifierActive) {
                modifier = this.modifiers[modifierId];

                if(modifier.type == 'instance') {
                    ret.push(modifier);
                }
            }
        }

        return ret;
    },
    getActiveStrokeModifiers: function () { // XXX: templatify
        ret = [];

        for (var modifierId in this.modifierStatus) {
            modifierActive = this.modifierStatus[modifierId];

            if(modifierActive) {
                modifier = this.modifiers[modifierId];

                if(modifier.type == 'stroke') {
                    ret.push(modifier);
                }
            }
        }

        return ret;
    }
}

function NullInstanceModifier() {
    this.init();
}
NullInstanceModifier.prototype = {
    init: function () {},
    destroy: function () {},
    modify: function (x, y) {
        return {'x': x, 'y': y};
    }
}

function NullStrokeModifiers() {
    this.init();
}
NullStrokeModifiers.prototype = {
    init: function () {},
    destroy: function () {},
    modify: function (x, y) {
        return {'x': x, 'y': y};
    }
}
