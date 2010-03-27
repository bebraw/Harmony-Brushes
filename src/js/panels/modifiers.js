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
            $(this).hide();
            $('#modifiersCheckbox').attr('checked', false);
            $('#modifiersPanel').dialog('open');
        });

        // set up modifiers panel
        $("body").append('<div class="panel" id="modifiersPanel" title="Modifiers"></div>');

        for (var i = 0; i < MODIFIERS.length; i++) {
            modifierName = MODIFIERS[i];
            modifierId = modifierName + 'Modifier';
            modifier = eval("new " + modifierName + "()");

            this.modifierStatus[modifierId] = false;
            this.modifiers[modifierId] = modifier;

            $("#modifiersPanel").append('<input type="checkbox" id="' +
                modifierId + '" /><label for="' + modifierId + '">' +
                modifierName + '</label>');

            $('#' + modifierId).click(function() {
                id = $(this).attr('id');
                panels['modifiers'].modifierStatus[id] = !panels['modifiers'].modifierStatus[id];
            });
        }

        $("#modifiersPanel input").button();
        $("#modifiersPanel label").css("width", "100%").css("margin-bottom", "0.5em");

        $("#modifiersPanel").dialog({
           closeOnEscape: false, resizable: false, width: 150, autoOpen: false
        });

        $("#modifiersPanel").dialog( "option", "position", ["right", "top"] );
        $("#modifiersPanel").bind( "dialogclose", function(event, ui) { $("#modifiersPod").show();} );
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
