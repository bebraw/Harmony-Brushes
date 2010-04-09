/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function modifiers() {
    this.init();
}
modifiers.prototype = {
    init: function () {
        this.modifierStatus = {};
        this.modifiers = {};

        // XXX: construct modifiers here (see brush panel)
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
            </div>');

        for (var i = 0; i < MODIFIERS.length; i++) {
            var modifierName = MODIFIERS[i];
            var modifierId = modifierName + 'Modifier';
            var modifierLabel = modifierId + 'Label';
            var modifier = eval("new " + modifierName + "()");

            this.modifierStatus[modifierId] = false;
            this.modifiers[modifierId] = modifier;

            $("#modifiersPanel").append('<div id="' +
                modifierId +'" class="modifier"><input type="checkbox" id="' +
                modifierLabel + '" /><label for="' + modifierLabel + '">' +
                modifierName + '</label><div class="attributes"></div></div>');

            $('#' + modifierId + " input").click(function() {
                var id = $(this).parent(".modifier").attr('id');
                panels['modifiers'].modifierStatus[id] = !panels['modifiers'].modifierStatus[id];
            });

            if('attributes' in modifier) {
                var attributes = modifier['attributes'];

                for(var attributeName in attributes) {
                    var attributeValues = attributes[attributeName];

                    if(attributeValues['type'] == 'int') {
                        modifier[attributeName] = attributeValues['value'];
                        var attributeId = modifierId + attributeName;

                        $("#" + modifierId + " .attributes").append('<div id="' +
                            attributeId + '"></div>');

                        $("#" + attributeId).data(attributeId, attributeName);

                        $("#" + attributeId).slider({
                            range: "max",
                            min: attributeValues['min'],
                            max: attributeValues['max'],
                            value: attributeValues['value'],
                            slide: function(event, ui) {
                                modifierId = $(this).parents(".modifier").attr('id');

                                panels['modifiers'].modifiers[modifierId][$(this).data($(this).attr('id'))] = ui.value;
                            }
                        });
                    }
                }
            }
        }

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
    getActiveModifiers: function () {
        var ret = [];

        for (var modifierId in this.modifierStatus) {
            var modifierActive = this.modifierStatus[modifierId];

            if(modifierActive) {
                var modifier = this.modifiers[modifierId];

                ret.push(modifier);
            }
        }

        return ret;
    }
}

function NullModifier() {
    this.init();
}
NullModifier.prototype = {
    init: function () {},
    destroy: function () {},
    modify: function (point) {
        return point;
    }
}
