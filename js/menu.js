function Menu() {
    this.init()
}
Menu.prototype = {
    init: function () {
        setUpPod("Menu");

        // set up menu
        $("body").append('<div class="panel" id="menu" title="Menu"> \
            <button>New</button> \
            <button>Load</button> \
            <button>Save</button> \
            <button>Export</button> \
            <button>About</button> \
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

        documentContainer = document.createElement("div");
        //document.body.appendChild(documentContainer);

        this.handlers = new MenuHandlers();

        this.container = document.createElement("div");
        this.container.className = "gui";
        this.container.style.position = "absolute";
        this.container.style.top = "0px";

        //documentContainer.appendChild(this.container);

        options = ["New", "Load", "Save", "Export", "About"];
        for (i = 0; i < options.length; i++) {
            this.createButton(options[i]);
        }

        // XXX: replace with some CSS trick?
        //window.onresize = onWindowResize;
        //onWindowResize(null);
    },
    createButton: function (name) {
        attrName = name.toLowerCase();
        
        this[attrName] = document.createElement("span");
        this[attrName].className = "button";
        this[attrName].innerHTML = name;
        this[attrName].addEventListener("click", this.handlers["on" + name], false);

        this.container.appendChild(this[attrName]);
    }
};

function MenuHandlers() {
    this.init()
}
MenuHandlers.prototype = {
    init: function () {},
    onNew: function (a) {
        console.log('new');

        //context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        //strokeManager.initUndo();
        //strokeManager.setStyle(STYLES[menu.selector.selectedIndex]);
    },
    onLoad: function (a) {
        console.log('load');
    },
    onSave: function (a) {
        console.log('save');

        /*
        var a = flattenCanvas.getContext("2d");
        a.fillStyle = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] +
            ", " + BACKGROUND_COLOR[2] + ")";
        a.fillRect(0, 0, canvas.width, canvas.height);
        a.drawImage(canvas, 0, 0);
        window.open(flattenCanvas.toDataURL("image/png"), "mywindow")
        */
    },
    onExport: function (a) {
        console.log('export');
    },
    onAbout: function (a) {
        console.log('about');

        //cleanPopUps();
        //isAboutVisible = true;
        //about.show()
    }
}

function onWindowResize(a) {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    menu.container.style.left = ((screenWidth - menu.container.offsetWidth) / 2) + "px";
    //about.container.style.left = ((screenWidth - about.container.offsetWidth) / 2) + "px";
    //about.container.style.top = ((screenHeight - about.container.offsetHeight) / 2) + "px";
}

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
