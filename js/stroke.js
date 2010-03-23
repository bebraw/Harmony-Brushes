function project_coordinate(x1, y1, x2, y2, x3, y3) {
    var x0,y0;
    dx = x2 - x1;
    dy = y2 - y1;

    if((dx == 0) && (dy == 0)) {
        x0 = x1;
        y0 = y1;
    }
    else {
        t = ((x3 - x1) * dx + (y3 - y1) * dy) / (dx * dx + dy * dy);
        
        x0 = x1 + t * dx;
        y0 = y1 + t * dy;
    }

    return [x0, y0];
}

function StrokeManager(canvas, context) {
    this.init(canvas, context)
}
StrokeManager.prototype = {
    // general
    canvas: null,
    context: null,
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
        this.strokes = [];
        this.currentStroke = [];
        this.currentStrokeIndex = 0;
        this.currentDabIndex = 0; // used only for playback for now
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
                initialX, initialY, targetX, targetY, method]);
        }
    },
    strokeStart: function (mouseX, mouseY, mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY) {
        this.strokeTemplate(mouseX, mouseY, mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY, 'strokeStart', COLOR, true);

        if(this.strokes.length > this.currentStrokeIndex) {
            amountOfExtras = this.strokes.length - this.currentStrokeIndex;

            for(i = 0; i < amountOfExtras; i++) {
                this.strokes.pop();
            }
        }
    },
    stroke: function (mouseX, mouseY, mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY) {
        this.strokeTemplate(mouseX, mouseY, mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY, 'stroke', COLOR, true);
    },
    strokeEnd: function (mouseX, mouseY, mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY) {
        this.strokeTemplate(mouseX, mouseY,  mirrorsDown, keysDown, initialX,
            initialY, targetX, targetY, 'strokeEnd', COLOR, true);

        this.strokes.push([this.strokeStyleClass, COLOR, this.currentStroke]);
        this.currentStroke = [];
        this.currentStrokeIndex++;
    },
    undo: function(context, bg_color) {
        // empty canvas
        context.fillStyle = "rgb(" + bg_color[0] + ", " + bg_color[1] +
            ", " + bg_color[2] + ")";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if(this.currentStrokeIndex > 0) {
            this.currentStrokeIndex--;
        }
        for(i = 0; i < this.currentStrokeIndex; i++) {
            stroke = this.strokes[i];

            this.render(stroke);
        }
    },
    redo: function() {
        if(this.strokes.length > this.currentStrokeIndex) {
            stroke = this.strokes[this.currentStrokeIndex];
            this.render(stroke);
            this.currentStrokeIndex++;
        }
    },
    playbackLeft: function() {
        if(this.strokes.length == this.currentStrokeIndex) {
            stroke = this.strokes[this.currentStrokeIndex];

            if(this.currentDabIndex == stroke[2].length) {
                return false;
            }
        }

        return true;
    },
    playbackDab: function() {
        if(this.strokes.length > this.currentStrokeIndex) {
            stroke = this.strokes[this.currentStrokeIndex];

            if(this.currentDabIndex == 0) {
                style = stroke[0];

                this.redoableSetStyle(style);
            }
            
            this.renderDab(stroke, this.currentDabIndex);
            this.currentDabIndex++;

            if(this.currentDabIndex == stroke[2].length) {
                // advance to the next stroke
                this.currentStrokeIndex++;
                this.currentDabIndex = 0;
            }
        }
    },
    render: function(stroke) {
        if(stroke) {
            style = stroke[0];

            this.redoableSetStyle(style);

            color = stroke[1];

            segments = stroke[2];

            for(j = 0; j < segments.length; j++) {
                segment = segments[j];
                this.strokeTemplate(segment[0], segment[1], segment[2],
                    segment[3], segment[4], segment[5], segment[6],
                    segment[7], segment[8], color, false);
            }
        }
    },
    renderDab: function(stroke, dabIndex) {
        if(stroke) {
            color = stroke[1];

            segments = stroke[2];
            dab = segments[dabIndex];

            this.strokeTemplate(dab[0], dab[1], dab[2], dab[3], dab[4], dab[5],
                dab[6], dab[7], dab[8], color, false);
        }
    }
};