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

function StrokeManager(a) {
    this.init(a)
}
StrokeManager.prototype = {
    strokes: [],
    current_stroke: [],
    current_stroke_index: 0,
    canvas: null,
    style: null,
    xMirrorStyle: null,
    yMirrorStyle: null,
    xyMirrorStyle: null,
    init: function (canvas) {
        this.canvas = canvas;
    },
    destroy: function () {},
    setStyle: function(styleClass, context, isRealStroke) {
        this.style = eval("new " + styleClass + "(context)");
        this.xMirrorStyle = eval("new " + styleClass + "(context)");
        this.yMirrorStyle = eval("new " + styleClass + "(context)");
        this.xyMirrorStyle = eval("new " + styleClass + "(context)");

        if(isRealStroke) {
            // TODO!
            //this.strokes.push(['setStyle', styleClass, context]);
            //this.current_stroke_index++;
        }
    },
    strokeTemplate: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, targetX, targetY, method, isRealStroke) {
        x = sKeyIsDown? initialX: mouseX;
        y = aKeyIsDown? initialY: mouseY;

        if(dKeyIsDown) {
            projection = project_coordinate(targetX, targetY, initialX,
                initialY, mouseX, mouseY);
            x = projection[0];
            y = projection[1];
        }

        this.style[method](x, y);

        mirrorX = this.canvas.width - x;
        mirrorY = this.canvas.height - y;

        if(xMirrorIsDown) {
            this.xMirrorStyle[method](mirrorX, y);
        }

        if(yMirrorIsDown) {
            this.yMirrorStyle[method](x, mirrorY);
        }

        if((xMirrorIsDown && yMirrorIsDown) || xyMirrorIsDown) {
            this.xyMirrorStyle[method](mirrorX, mirrorY);
        }

        if(isRealStroke) {
            this.current_stroke.push([mouseX, mouseY, xMirrorIsDown,
                yMirrorIsDown, xyMirrorIsDown, aKeyIsDown, sKeyIsDown,
                dKeyIsDown, initialX, initialY, targetX, targetY, method]);
        }
    },
    strokeStart: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, targetX, targetY) {
        this.strokeTemplate(mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, targetX, targetY, 'strokeStart', true);

        if(this.strokes.length > this.current_stroke_index) {
            amountOfExtras = this.strokes.length - this.current_stroke_index;
            console.log('amount of extras ' + amountOfExtras);

            for(i = 0; i < amountOfExtras; i++) {
                this.strokes.pop();
            }
        }
    },
    stroke: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, targetX, targetY) {
        this.strokeTemplate(mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, targetX, targetY, 'stroke', true);
    },
    strokeEnd: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, targetX, targetY) {
        this.strokeTemplate(mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, targetX, targetY, 'strokeEnd', true);

        this.strokes.push(['stroke', this.current_stroke]);
        this.current_stroke = [];
        this.current_stroke_index++;
    },
    undo: function(context, bg_color) {
        // empty canvas
        context.fillStyle = "rgb(" + bg_color[0] + ", " + bg_color[1] +
            ", " + bg_color[2] + ")";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if(this.current_stroke_index > 0) {
            this.current_stroke_index--;
        }
        for(i = 0; i < this.current_stroke_index; i++) {
            stroke = this.strokes[i];

            this.render(stroke);
        }
    },
    redo: function() {
        if(this.strokes.length > this.current_stroke_index) {
            stroke = this.strokes[this.current_stroke_index];
            this.render(stroke);
            this.current_stroke_index++;
        }
    },
    render: function(stroke) {
        if(stroke) {
            if(stroke[0] == 'stroke') {
                console.log('render stroke');
                segments = stroke[1];

                for(j = 0; j < segments.length; j++) {
                    segment = segments[j];
                    this.strokeTemplate(segment[0], segment[1], segment[2],
                        segment[3], segment[4], segment[5], segment[6],
                        segment[7], segment[8], segment[9], segment[10],
                        segment[11], segment[12], false);
                }
            }
            else if(stroke[0] == 'setStyle') {
                console.log('set style');
                this.setStyle(stroke[1], stroke[2], false);
            }
        }
    }
};