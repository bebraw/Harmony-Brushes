/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function Points() {
    this.init();
}
Points.prototype = {
    init: function () {
        this.current = null;
        this.previous = null;
        this.length = 0;
    },
    destroy: function () {},
    push: function (item) {
        this[this.length] = item;
        this.length++;

        this.previous = this.current;
        this.current = item;
    },
    get: function (index) {
        if( index >= 0 ) {
            return this[index];
        }

        return this[this.length + index];
    },
    getWithinRange: function (point, range) {
        var ret = [];

        for (var i = 0; i < this.length; i++) {
            currentPoint = this[i];
            dist = currentPoint.sub(point).toDist();

            if( range(dist) ) {
                ret.push(currentPoint);
            }
        }
        
        return ret;
    }
}

function Point(x, y) {
    this.init(x, y);
}
Point.prototype = {
    init: function(x, y) {
        this.x = x?x:0;
        this.y = y?y:0;
    },
    destroy: function() {},
    add: function(other) {
        return this.operationTemplate(other, function(a, b) {return a + b});
    },
    sub: function(other) {
        return this.operationTemplate(other, function(a, b) {return a - b});
    },
    mul: function(other) {
        return this.operationTemplate(other, function(a, b) {return a * b});
    },
    div: function(other) {
        return this.operationTemplate(other, function(a, b) {return a / b});
    },
    floor: function() {
        return this.operationTemplate(null, function(a) {return Math.floor(a)});
    },
    round: function() {
        return this.operationTemplate(null, function(a) {return Math.round(a)});
    },
    operationTemplate: function(other, op) {
        if(isNumber(other)) {
            return new Point(op(this.x, other), op(this.y, other));
        }

        if(other == null) {
            return new Point(op(this.x), op(this.y));
        }

        return new Point(op(this.x, other.x), op(this.y, other.y));
    },
    toDist: function() {
        return this.x * this.x + this.y * this.y;
    }
}

function getRandomPoint(n) {
    n = 1 ? n == null: n;

    return new Point(Math.random() * n, Math.random() * n);
}

function getRandomDirection(maxDist) {
            direction = 2 * Math.PI * Math.random();
            distance = maxDist * Math.random();

            xOffset = Math.sin(direction) * distance;
            yOffset = Math.cos(direction) * distance;

            return new Point(xOffset, yOffset);
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
