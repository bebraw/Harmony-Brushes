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
        setUpPanel("Modifiers", ['right', 'top'], 150);

        for (var i = 0; i < MODIFIERS.length; i++) {
            var modifierName = MODIFIERS[i];
            var modifierId = modifierName + 'Modifier';
            var modifierLabel = modifierId + 'Label';
            var modifier = eval("new " + modifierName + "()");

            this.modifierStatus[modifierId] = false;
            this.modifiers[modifierId] = modifier;

            $("#modifiersPanel").append('<div id="' +
                modifierId +'" class="modifier"><input type="checkbox" id="' +
                modifierLabel + '" /><label for="' + modifierLabel + '" style="width:100%">' +
                modifierName + '</label><div class="attributes"></div></div>');

            $("#" + modifierLabel).button();

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
    },
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

function NullModifier() {}
NullModifier.prototype = {
    modify: function (point) {
        return point;
    }
}
