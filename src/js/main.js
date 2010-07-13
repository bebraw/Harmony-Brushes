/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
$(function() {
    var strokeManager = new StrokeManager();
    var $pageNameInput = $('#pageName');

    $('#newPageButton').button().click(function() {
        // TODO: clean up page naming
        newTab();
        selectLastTab();
    });

    $('#about').click(function() {
        $('#aboutDialog').dialog('open');
    });

    $("#aboutDialog").dialog({
        height: 140, modal: true, autoOpen: false
    });

    // TODO: make it possible to modify name, bg color etc. as well
    $('.modifyPage').live('click', function() {
        $('#modifyPageDialog').dialog('open');
    });

    $("#modifyPageDialog").dialog({
        height: 120, modal: true, autoOpen: false
    });

    var index = null;
    $('.removePage').live('click', function() {
        index = $('li',$tabs).index($(this).parent());

        $('#deleteConfirmDialog').dialog('open');
    });

    $("#deleteConfirmDialog").dialog({
        autoOpen: false,
        resizable: false,
        height:150,
        modal: true,
        buttons: {
            'Delete page': function() {
                $tabs.tabs('remove', index);
                $(this).dialog('close');
            },
            Cancel: function() {
                $(this).dialog('close');
            }
        }
    });

    // page tools
    $("#exportFormats").buttonset();
    $("#exportButton").button().click(function() {
        var selectedFormat = $('#exportFormats input:checked').val();

        strokeManager.activeCanvas.saveAs(selectedFormat);

        $('#modifyPageDialog').dialog('close');
    });

    $("#copyButton").button().click(function() {
        var oldCanvas = strokeManager.activeCanvas;
        var oldCanvasData = oldCanvas.getData();

        newTab();
        selectLastTab();

        var newCanvas = strokeManager.activeCanvas;
        newCanvas.setData(oldCanvasData);

        $('#modifyPageDialog').dialog('close');
    });

    function newTab() { // XXX
        var tab_title = $pageNameInput.val() || 'Tab ' + tabCounter;
        $tabs.tabs('add', '#page' + tabCounter, tab_title);
        tabCounter++;
    }

    function selectLastTab() { // XXX
        $tabs.tabs('select', $tabs.tabs('length') - 1);
    }

    // set up initial canvas and overlay
    createCanvas("page1");

    function createCanvas(pageName) {
        var canvasId = pageName + "Canvas";
        var canvasWidth = screen.width;
        var canvasHeight = window.innerHeight;

        $("#main").append('<canvas id="' + canvasId + '" width="' +
            canvasWidth + '" height="' +
            canvasHeight + '" style="z-index:0;position:absolute;top:0px;left:0px;"' +
            ' class="pageCanvas"></canvas>' +
            '<canvas id="overlayCanvas" width="' + canvasWidth + '"' +
            ' height="' + canvasHeight +
            '" style="cursor:crosshair;z-index:100;position:absolute;top:0px;left:0px;"></canvas>'
         );

        strokeManager.addCanvas(canvasId);

        $("#overlayCanvas").bind('dragstart', function(e) {
            strokeManager.start(mouseLocation);

            mousePressed = true;
        }).bind('drag', function(e) {
            strokeManager.paint(mouseLocation);
        }).bind('dragend', function(e) {
            strokeManager.end(mouseLocation);

            mousePressed = false;
        }).bind('mousemove', function(e) {
            mouseLocation = getMouseLocationOnCanvas(e);

            for( var moveCallbackName in moveCallbacks ) {
                var ob = moveCallbacks[moveCallbackName];

                ob.onDown(mouseLocation);
            }
        });
    }

    function getMouseLocationOnCanvas(e) {
        return new Point(e.layerX, e.layerY);
    }

    // Wacom support
    if( navigator.mimeTypes["application/x-wacom-tablet"] ) {
        $('body').append('<embed name="wacom-plugin"' +
            'id="wacom-plugin" type="application/x-wacom-tablet" ' +
            'HIDDEN="TRUE" />');
    }

    if( DEBUG ) {
        var stats = new Stats();
        $('body').append('<div id="stats"></div>');
        $('#stats').append(stats.domElement).css({
            'position': 'absolute',
            'bottom': '0px',
            'right': '0px'
        }).find('*').css('z-index', '200');

        setInterval(function () {
            stats.update();
        }, 1000/60);
    }
});
