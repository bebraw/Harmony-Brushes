/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function menu() {
    this.init()
}
menu.prototype = {
    menuItems: ['New', 'Load', 'Save', 'Export', 'About'],
    init: function () {},
    initUI: function () {
        setUpPod("Menu");

        $('#menuPod').click(function() {
            $(this).css("visibility", "hidden");
            $('#menuCheckbox').attr('checked', false);
            $('#menuPanel').dialog('open');
        });

        // set up menu panel
        // XXX: figure out how to come up with a nice layout (no extra space)
        $("body").append('<div class="panel" id="menuPanel" title="Menu"></div>');

        for (var i = 0; i < this.menuItems.length; i++) {
            menuItem = this.menuItems[i];

            $("#menuPanel").append('<button id="menu' + menuItem + '">' +
                menuItem + '</button>');

            this['setUp' + menuItem]();
        }

        $("#menuPanel button").button();

        $("#menuPanel").dialog({
           closeOnEscape: false,
           resizable: false,
           width: 365,
           height: 60,
           position: "top",
           autoOpen: false
        });

        $("#menuPanel").bind("dialogclose",
            function(event, ui) {$("#menuPod").css("visibility", "visible");}
        );
    },
    setUpNew: function () {
        $('#menuNew').click(function() {
            // XXX: force canvas to rerender itself + reset undo
            canvas = new ProxyCanvas("canvas");
            canvas.fill("white");

            //strokeManager.initUndo();
            //strokeManager.setStyle(STYLES[menu.selector.selectedIndex]);
        });
    },
    setUpLoad: function () {
        $('#menuLoad').click(function() {
            console.log('load');
        });
    },
    setUpSave: function () {
        $('#menuSave').click(function() {
            console.log('save');
        });
    },
    setUpExport: function () {
        $("body").append('<div id="exportDialog" title="Export"> \
            <div id="exportFormats" style="margin-bottom:1em"> \
                <input type="radio" id="jpgFormat" name="radio" checked="checked" value="jpg" /><label for="jpgFormat">JPG</label> \
                <input type="radio" id="pngFormat" name="radio" value="png" /><label for="pngFormat">PNG</label> \
                <input type="radio" id="bmpFormat" name="radio" value="bmp" /><label for="bmpFormat">BMP</label> \
            </div> \
            <button id="exportButton">Export</button> \
        </div>');

        $("#exportFormats").buttonset();
        $("#exportButton").button();

        $("#exportDialog").dialog({
                height: 100, width: 190, modal: true, autoOpen: false
        });

        $('#menuExport').click(function() {
            $('#exportDialog').dialog('open');
        });

        $('#exportButton').click(function() {
            selectedFormat = $('#exportFormats input:checked').val();

            canvas = panels['canvas'].getProxy();
            canvas.saveAs(selectedFormat);

            $('#exportDialog').dialog('close');
        });
    },
    setUpAbout: function () {
        $("body").append('<div id="aboutDialog" title="About"> \
            <p>Harmony v. 0.1</p> \
            <a href="http://mrdoob.com/blog/post/689" target="_blank">More info</a> \
            <p>Add info about constraint system here!</p> \
        </div>');

        $("#aboutDialog").dialog({
                height: 140, modal: true, autoOpen: false
        });

        $('#menuAbout').click(function() {
            $('#aboutDialog').dialog('open');
        });
    }
};
