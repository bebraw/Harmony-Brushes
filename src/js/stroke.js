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
    container: [], // XXX: subclass directly from list instead?
    init: function () {},
    destroy: function () {},
    removeExtras: function (index) {
        extraStrokes = this.container.length - index;

        for(i = 0; i < extraStrokes; i++) {
            this.container.pop();
        }

        return;

        // XXX

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

        //mirrorX = this.canvas.width - x;
        //mirrorY = this.canvas.height - y;

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

function StrokeManager() {
    this.init();
}
StrokeManager.prototype = {
    strokes: new Strokes(),
    currentStroke: [],
    currentStrokeIndex: 0,
    init: function () {},
    destroy: function () {},
    strokeTemplate: function (mouseX, mouseY, method, color) {
        this.brush[method](mouseX, mouseY, color);
        this.currentStroke.push([mouseX, mouseY, method]);
    },
    strokeStart: function (mouseX, mouseY, color, brush) {
        this.brush = brush;

        this.strokeTemplate(mouseX, mouseY, 'strokeStart', color);

        //this.strokes.removeExtras(this.currentStrokeIndex);
    },
    stroke: function (mouseX, mouseY, color) {
        this.strokeTemplate(mouseX, mouseY, 'stroke', color);
    },
    strokeEnd: function (mouseX, mouseY, color) {
        this.strokeTemplate(mouseX, mouseY, 'strokeEnd', color);

        stroke = new Stroke(this.strokeStyleClass, COLOR, this.currentStroke)
        this.strokes.append(stroke);

        this.currentStroke = [];
        this.currentStrokeIndex++;
    }
};
