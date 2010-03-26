/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function Menu() {
    this.init()
}
Menu.prototype = {
    init: function () {
        setUpPod("Menu");

        $('#menuPod').click(function() {
            $(this).hide();
            $('#menu').dialog('open');
        });

        // set up menu panel
        $("body").append('<div class="panel" id="menu" title="Menu"> \
            <button id="menuNew">New</button> \
            <button id="menuLoad">Load</button> \
            <button id="menuSave">Save</button> \
            <button id="menuExport">Export</button> \
            <button id="menuAbout">About</button> \
        </div>');

        $("#menu button").button();

        $("#menu").dialog({
           closeOnEscape: false, resizable: false, width: 230, autoOpen: false
        });

        $("#menu").dialog("option", "position", "top");
        $("#menu").dialog("option", "width", 325);
        $("#menu").dialog("option", "height", 60);
        $("#menu").bind("dialogclose",
            function(event, ui) {$("#menuPod").show();});

        // TODO: hook up events to menu items!

        $('#menuNew').click(function() {
            console.log('new');

            //context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
            //strokeManager.initUndo();
            //strokeManager.setStyle(STYLES[menu.selector.selectedIndex]);
        });

        $('#menuLoad').click(function() {
            console.log('load');
        });

        $('#menuSave').click(function() {
            console.log('save');

            /*
            var a = flattenCanvas.getContext("2d");
            a.fillStyle = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] +
                ", " + BACKGROUND_COLOR[2] + ")";
            a.fillRect(0, 0, canvas.width, canvas.height);
            a.drawImage(canvas, 0, 0);
            window.open(flattenCanvas.toDataURL("image/png"), "mywindow")
            */
        });

        $('#menuExport').click(function() {
            console.log('export');
        });

        $('#menuAbout').click(function() {
            console.log('about');

            //cleanPopUps();
            //isAboutVisible = true;
            //about.show()
        });
    }
};

function About() {
    this.init()
}
About.prototype = {
    container: null,
    init: function () {
        var b, a;
        this.container = document.createElement("div");
        this.container.className = "gui";
        this.container.style.position = "absolute";
        this.container.style.top = "0px";
        this.container.style.visibility = "hidden";
        a = document.createElement("div");
        a.style.margin = "20px 20px";
        a.style.textAlign = "left";
        this.container.appendChild(a);
        b = document.createElement("p");
        b.style.textAlign = "center";
        b.innerHTML = '<strong>HARMONY</strong> v0.5 by <a href="http://twitter.com/mrdoob" target="_blank">Mr.doob</a>';
        a.appendChild(b);
        b = document.createElement("p");
        b.style.textAlign = "center";
        b.innerHTML = "Hold &lt;shift&gt; for colour palette";
        a.appendChild(b);
        b = document.createElement("p");
        b.style.textAlign = "center";
        b.innerHTML = '<a href="http://mrdoob.com/blog/post/689" target="_blank">More info</a>';
        a.appendChild(b);
        b = document.createElement("hr");
        a.appendChild(b);
        b = document.createElement("p");
        b.innerHTML = '<em>Sketchy</em>, <em>Shaded</em>, <em>Chrome</em>, <em>Fur</em>, <em>LongFur</em> and <em>Web</em> are all variations of the neighbour points connection concept. First implemented in <a href="http://www.zefrank.com/scribbler/" target="_blank">The Scribbler</a>.';
        a.appendChild(b);
        b = document.createElement("p");
        b.innerHTML = "If you like the tool, you can use this button to share your love ;)";
        a.appendChild(b);
        b = document.createElement("p");
        b.style.textAlign = "center";
        b.innerHTML = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="VY7767JMMMYM4"><input type="image" src="https://www.paypal.com/en_GB/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online."><img alt="" border="0" src="https://www.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1"></form>';
        a.appendChild(b)
    },
    show: function () {
        this.container.style.visibility = "visible"
    },
    hide: function () {
        this.container.style.visibility = "hidden"
    }
};
