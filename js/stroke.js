/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function project_coordinate(x1, y1, x2, y2, x3, y3) {
    dx = x2 - x1;
    dy = y2 - y1;

    if((dx == 0) && (dy == 0)) {
        return [x1, y1];
    }

    t = ((x3 - x1) * dx + (y3 - y1) * dy) / (dx * dx + dy * dy);
    return [x1 + t * dx, y1 + t * dy];
}

function Dab() {
    this.init();
}
Dab.prototype = {
    
}

function Dabs() {
    this.init();
}
Dabs.prototype = {
    container: null, // XXX: subclass directly from list instead?
    init: function () {},
    destroy: function () {}
}

function Stroke(style, color, dabs) {
    this.init(style, color, dabs);
}
Stroke.prototype = {
    init: function (style, color, dabs) {
        this.style = style;
        this.color = color;
        this.dabs = dabs;
    },
    destroy: function () {}
}

function Strokes() {
    this.init();
}
Strokes.prototype = {
    container: null, // XXX: subclass directly from list instead?
    init: function () {},
    destroy: function () {},
    removeExtras: function (index) {
        extraStrokes = this.strokes.length - index;
        console.log('extra strokes ' + extraStrokes);

        for(i = 0; i < extraStrokes; i++) {
            this.container.pop();
        }

        // pop extra dabs
        currentStroke = this.getCurrent();
        dabs = currentStroke.dabs;

        // TODO
        extraDabs = dabs.length - this.currentDabIndex;

        for(i = 0; i < extraDabs; i++) {
            dabs.pop();
        }
    },
    append: function (stroke) {
        this.container.push(stroke);
    },
    get: function (index) {
        return this.container(index);
    },
    getLength: function () {
        return this.container.length;
    },
    getCurrent: function () {
        // TODO
    }
}

function DabRenderer() {
    this.init();
}
DabRenderer.prototype = {
    init: function () {},
    destroy: function () {}
}

function StrokePlayer(strokes) {
    this.init(strokes);
}
StrokePlayer.prototype = {
    init: function (strokes) {
        this.strokes = strokes;
    },
    destroy: function () {},
    step: function () {},
    playbackLeft: function () {return false;}
}

// this class records a single stroke and returns it once it has been drawn
function StrokeRecorder(devices, modifiers) {
    this.init(devices, modifiers);
}
StrokeRecorder.prototype = {
    init: function (devices, modifiers) {
        this.devices = devices;
        this.modifiers = modifiers;
    },
    destroy: function () {},
    template: function () {
        x = keysDown['s']? initialX: mouseX;
        y = keysDown['a']? initialY: mouseY;

        if(keysDown['d']) {
            projection = project_coordinate(targetX, targetY, initialX,
                initialY, mouseX, mouseY);
            x = projection[0];
            y = projection[1];
        }

        this.style[method](x, y, color);

        mirrorX = this.canvas.width - x;
        mirrorY = this.canvas.height - y;

        if(mirrorsDown['x']) {
            this.xMirrorStyle[method](mirrorX, y, color);
        }

        if(mirrorsDown['u']) {
            this.yMirrorStyle[method](x, mirrorY, color);
        }

        if((mirrorsDown['x'] && mirrorsDown['y']) || mirrorsDown['xy']) {
            this.xyMirrorStyle[method](mirrorX, mirrorY, color);
        }

        if(isRealStroke) {
            this.currentStroke.push([mouseX, mouseY, mirrorsDown, keysDown,
                initialX, initialY, targetX, targetY, method,
                this.strokeTime]);
        }
    },
    start: function () {},
    step: function () {},
    finish: function () {
        return false;
    }
}

function StrokeManager(canvas, context) {
    this.init(canvas, context);
}
StrokeManager.prototype = {
    // general
    canvas: null,
    context: null,
    //strokes: Strokes(),
    strokeRecorder: new StrokeRecorder(), // TODO: hook up!
    // strokes (TODO: move to array)
    style: null,
    xMirrorStyle: null,
    yMirrorStyle: null,
    xyMirrorStyle: null,
    init: function (canvas, context) {
        this.canvas = canvas;
        this.context = context;

        this.initUndo();
    },
    destroy: function () {},
    initUndo: function () {
        this.strokes = Strokes();
        this.currentStroke = [];
        this.currentStrokeIndex = 0;
        this.currentDabIndex = 0;
        this.strokeStyleClass = null;
    },
    setStyle: function(styleClass) {
        this.strokeStyleClass = styleClass;
        this.redoableSetStyle(styleClass);
    },
    redoableSetStyle: function(styleClass) {
        this.style = eval("new " + styleClass + "(this.context)");
        this.xMirrorStyle = eval("new " + styleClass + "(this.context)");
        this.yMirrorStyle = eval("new " + styleClass + "(this.context)");
        this.xyMirrorStyle = eval("new " + styleClass + "(this.context)");
    },
    strokeTemplate: function (mouseX, mouseY, mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY, method, color, isRealStroke) {
        x = keysDown['s']? initialX: mouseX;
        y = keysDown['a']? initialY: mouseY;

        if(keysDown['d']) {
            projection = project_coordinate(targetX, targetY, initialX,
                initialY, mouseX, mouseY);
            x = projection[0];
            y = projection[1];
        }

        this.style[method](x, y, color);

        mirrorX = this.canvas.width - x;
        mirrorY = this.canvas.height - y;

        if(mirrorsDown['x']) {
            this.xMirrorStyle[method](mirrorX, y, color);
        }

        if(mirrorsDown['u']) {
            this.yMirrorStyle[method](x, mirrorY, color);
        }

        if((mirrorsDown['x'] && mirrorsDown['y']) || mirrorsDown['xy']) {
            this.xyMirrorStyle[method](mirrorX, mirrorY, color);
        }

        if(isRealStroke) {
            this.currentStroke.push([mouseX, mouseY, mirrorsDown, keysDown,
                initialX, initialY, targetX, targetY, method,
                this.strokeTime]);
        }
    },
    strokeStart: function (mouseX, mouseY, mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY) {
        this.strokeTime = 0
        this.strokeTemplate(mouseX, mouseY, mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY, 'strokeStart', COLOR, true);

        this.strokes.removeExtras(this.currentStrokeIndex);
    },
    stroke: function (mouseX, mouseY, mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY) {
        currentTime = new Date().getTime();
        this.strokeTime = currentTime - this.strokeTime;

        this.strokeTemplate(mouseX, mouseY, mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY, 'stroke', COLOR, true);
    },
    strokeEnd: function (mouseX, mouseY, mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY) {
        currentTime = new Date().getTime();
        this.strokeTime = currentTime - this.strokeTime;

        this.strokeTemplate(mouseX, mouseY,  mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY, 'strokeEnd', COLOR, true);

        stroke = Stroke(this.strokeStyleClass, COLOR, this.currentStroke)
        this.strokes.append(stroke);

        this.currentStroke = [];
        this.currentStrokeIndex++;
    },
    undo: function(context, bg_color) {
        // empty canvas
        context.fillStyle = "rgb(" + bg_color[0] + ", " + bg_color[1] +
            ", " + bg_color[2] + ")";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if(this.currentStrokeIndex > 1) {
            this.currentStrokeIndex--;
        }
        for(i = 0; i < this.currentStrokeIndex; i++) {
            stroke = this.strokes.get(i);

            this.render(stroke);
        }
    },
    redo: function() {
        if(this.strokes.getLength() > this.currentStrokeIndex) {
            stroke = this.strokes.getCurrent();
            this.render(stroke);
            this.currentStrokeIndex++;
        }
    },
    playbackLeft: function() {
        if(this.strokes.getLength() == this.currentStrokeIndex) {
            stroke = this.strokes.getCurrent();

            if(!stroke) {
                return false;
            }

            if(this.currentDabIndex == stroke[2].length) {
                return false;
            }
        }

        return true;
    },
    playbackDab: function() {
        stroke = this.strokes.getCurrent();

        if(this.currentDabIndex == 0) {
            this.redoableSetStyle(stroke.style);
        }

        this.renderDab();
        this.currentDabIndex++;

        stroke = this.strokes.getCurrent();
        dabs = stroke.dabs;
        if(this.currentDabIndex == dabs.length + 1) {
            // advance to the next stroke
            this.currentStrokeIndex++;
            this.currentDabIndex = 0;
        }
    },
    render: function(stroke) {
        if(stroke) {
            this.redoableSetStyle(stroke.style);

            dabs = stroke.dabs;
            // TODO!
            for(j = 0; j < dabs.length; j++) {
                dab = dabs[j];
                this.strokeTemplate(dab[0], dab[1], dab[2],
                    dab[3], dab[4], dab[5], dab[6],
                    dab[7], dab[8], stroke.color, false);
            }
        }
    },
    renderDab: function() {
        stroke = this.strokes.getCurrent();

        if(stroke) {
            dab = this.getCurrentDab();

            this.strokeTemplate(dab[0], dab[1], dab[2], dab[3], dab[4], dab[5],
                dab[6], dab[7], dab[8], stroke.color, false);
        }
    },
    getDabTimeDelta: function() {
        dab = this.getCurrentDab();

        time = dab[9];

        return time;
    },
    getCurrentDab: function() {
        stroke = this.strokes.getCurrent();
        
        return stroke.dabs[this.currentDabIndex];
    }
};