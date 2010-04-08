/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function ProxyCanvas(canvasId) {
    this.init(canvasId);
}
ProxyCanvas.prototype = {
    init: function (canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");

        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.strokes = new Strokes(this.width, this.height);
    },
    destroy: function () {},
    saveAs: function (format) {
        var isChrome =  navigator.userAgent.toLowerCase().indexOf('chrome')  > -1;

        if( isChrome ) {
            // apparently this work just with png?
            window.open(this.canvas.toDataURL('image/png'), 'mywindow');
        }
        else {
            // note that this spawns a save dialog! doesn't work in chrome!
            if(format == 'png') {
                Canvas2Image.saveAsPNG(this.canvas);
            }

            if(format == 'jpeg' || format == 'jpg') {
                Canvas2Image.saveAsJPEG(this.canvas);
            }

            if(format == 'bmp') {
                Canvas2Image.saveAsBMP(this.canvas);
            }
        }
    },
    getData: function () {
        return this.context.getImageData(0, 0, this.width, this.height);
    },
    setData: function (data) {
        this.context.putImageData(data, 0, 0);
    },
    blur: function (location, radius) {
        var xPos = location.x - radius;
        var yPos = location.y - radius;
        var width = radius * 2;
        var height = radius * 2;
        var blurArea = this.context.getImageData(xPos, yPos, width, height);

        var newArea = this.context.createImageData(width, height);

        function avg(parts) {
            var ret = 0;
            var accum = 0;

            for(var i = 0; i < parts.length; i++) {
                var part = parts[i];

                if( part ) {
                    ret += part;
                    accum++;
                }
            }

            return ret / accum;
        }

        function Color() {
            return {'r': null, 'g': null, 'b': null, 'a': null};
        }

        function extractPixel(color, pixel, pos) {
            color.r = pixel.data[pos++];
            color.g = pixel.data[pos++];
            color.b = pixel.data[pos++];
            color.a = pixel.data[pos++];
        }

        function applyOperation(area, pos, op, params, alpha) {
            var components = ['r', 'g', 'b', 'a'];

            for( var i = 0; i < components.length; i++ ) {
                var component = components[i];

                var opParams = [];

                for( var j = 0; j < params.length; j++ ) {
                    // premul
                    opParams[j] = params[j][component] * alpha
                }

                // unpremul
                area.data[pos++] = op(opParams) / alpha;
            }
        }

        var realRadius = radius * radius;
        var offset = 4;
        for (var y = 0; y < height; y++) {
            var inPos = y * width * offset;
            var outPos = inPos;

            var top = Color();
            var prev = Color();
            var current = Color();
            var next = Color();
            var bottom = Color();

            extractPixel(current, blurArea, inPos);
            inPos += offset;

            for (var x = 0; x < width; x++) {
                var currentPoint = new Point(xPos + x, yPos + y);
                var dist = currentPoint.sub(location).toDist();
                var fac = 1 - Math.min(1.0, dist / realRadius);
                
                if( x == width - 1 ) {
                    next = Color();
                }
                else {
                    extractPixel(next, blurArea, inPos);
                    inPos += offset;
                }

                if( y > 0 ) {
                    top.r = blurArea.data[(y - 1) * width * offset + offset * x];
                    top.g = blurArea.data[(y - 1) * width * offset + offset * x + 1];
                    top.b = blurArea.data[(y - 1) * width * offset + offset * x + 2];
                    top.a = blurArea.data[(y - 1) * width * offset + offset * x + 3];
                }

                if( y == height - 1 ) {
                    bottom = Color();
                }
                else {
                    bottom.r = blurArea.data[(y + 1) * width * offset + offset * x];
                    bottom.g = blurArea.data[(y + 1) * width * offset + 1 + offset * x];
                    bottom.b = blurArea.data[(y + 1) * width * offset + 2 + offset * x];
                    bottom.a = blurArea.data[(y + 1) * width * offset + 3 + offset * x];
                }

                function applyBlur(parts) {
                    return fac * avg(parts) + (1 - fac) * parts[2];
                }

                applyOperation(newArea, outPos, applyBlur,
                    [top, prev, current, next, bottom], current.a);
                outPos += offset;

                prev = clone(current);
                current = clone(next);
            }
        }

        this.context.putImageData(newArea, xPos, yPos);
    },
    fill: function (color) {
        this.context.fillStyle = "rgb(" + color[0] + ", " + color[1] +
            ", " + color[2] + ")";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    text: function (label, colorName, font, x, y) {
        this.context.fillStyle = colorName;
        this.context.font = font;
        this.context.fillText(label, x, y);
    },
    stroke: function (startLoc, endLoc, color, alpha) {
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", " + alpha + ")";
        this.context.beginPath();
        this.context.moveTo(startLoc.x, startLoc.y);
        this.context.lineTo(endLoc.x, endLoc.y);
        this.context.stroke();
    },
    rect: function (xy1, xy2, xy3, xy4, color, alpha) {
        this.context.fillStyle = "rgb(255, 255, 255)"; // XXX: replace with fillColor
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", " + alpha + ")";
        this.context.beginPath();
        this.context.moveTo(xy1.x, xy1.y);
        this.context.lineTo(xy2.x, xy2.y);
        this.context.lineTo(xy3.x, xy3.y);
        this.context.lineTo(xy4.x, xy4.y);
        this.context.lineTo(xy1.x, xy1.y);
        this.context.fill();
        this.context.stroke();
    },
    bezierCurve: function (begin, cp1, cp2, end, color, alpha) {
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", " + alpha + ")";
        this.context.beginPath();
        this.context.moveTo(begin.x, begin.y);
        this.context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
        this.context.stroke();
    },
    quadraticCurve: function (begin, cp, end, color, alpha) {
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", " + alpha + ")";
        this.context.beginPath();
        this.context.moveTo(begin.x, begin.y);
        this.context.quadraticCurveTo(cp.x, cp.y, end.x, end.y);
        this.context.stroke();
    },
    circle: function (center, radius, color, alpha) {
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", " + alpha + ")";
        this.context.beginPath();
        this.context.arc(center.x, center.y, radius, 0, Math.PI * 2, true);
        this.context.stroke()
    },
    getAllPoints: function () {
        return this.strokes.all;
    },
    getPointsOfType: function ( brushName ) {
        if( brushName in this.strokes ) {
            return this.strokes[brushName].points;
        }
    },
}

// XXX: separate derived strokes somehow?
function Strokes( width, height ) {
    this.init(width, height);
}
Strokes.prototype = {
    init: function (width, height) {
        this.all = new Points(width, height);

        this.width = width;
        this.height = height;
    },
    destroy: function () {},
    push: function (brushName, points) {
        if( !this[brushName] ) {
            this[brushName] = new BrushStroke(this.width, this.height);
        }

        this[brushName].points.extend(points);
        
        this.all.extend(points);
    }
}

function BrushStroke( width, height ) {
    this.init(width, height);
}
BrushStroke.prototype = {
    init: function (width, height) {
        this.points = new Points(width, height);
    },
    destroy: function () {},
}
