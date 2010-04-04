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

        this.content = [];
    },
    destroy: function () {},
    push: function (item) {
        this.content.push(item);
        this.previous = this.current;
        this.current = item;
    },
    extend: function (points) {
        if(points) {
            this.content = points.content.concat(this.content);
            this.current = points.current;
            this.previous = points.previous;
        }
    },
    getWithinRange: function (point, range, maxRange) {
        var content = this.content;

        // 1. check x
        // sort based on x
        function sortBasedOnX(a, b) {
            if( a.x < b.x ) {
                return 1;
            }

            if( a.x == b.x ) {
                return 0;
            }

            return -1;
        }
        content.sort(sortBasedOnX);

        var candidates = [];
        var minX = point.x - maxRange;
        var maxX = point.x + maxRange;

        // XXX: take canvas width in count -> iteration direction
        for (var i = 0; i < content.length; i++) {
            var currentPoint = content[i];
            var currentX = currentPoint.x;

            if( currentX >= minX ) {
                if( currentX <= maxX ) {
                    candidates.push(currentPoint);
                }
                else {
                    break;
                }
            }
        }

        // 2. check y
        // sort based on y
        function sortBasedOnY(a, b) {
            if( a.y < b.y ) {
                return 1;
            }

            if( a.y == b.y ) {
                return 0;
            }

            return -1;
        }

        candidates.sort(sortBasedOnY);
        var finalCandidates = [];
        var minY = point.y - maxRange;
        var maxY = point.y + maxRange;

        // XXX: figure out iteration direction based on height delta
        for (i = 0; i < candidates.length; i++) {
            currentPoint = candidates[i];
            var currentY = currentPoint.y;
            
            if( currentY >= minY ) {
                if( currentY <= maxY ) {
                    finalCandidates.push(currentPoint);
                }
                else {
                    break;
                }
            }
        }

        // 3. check exact range
        var ret = [];
        for (i = 0; i < finalCandidates.length; i++) {
            currentPoint = finalCandidates[i];
            dist = currentPoint.sub(point).toDist();

            if( range(dist) ) {
                ret.push({'point': currentPoint, 'dist': dist});
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

function deCasteljau(points, recursions) {
    function recursion(recursionPoints) {
        var ret = [points[0], ];

        for( var i = 0; i < recursionPoints.length - 1; i++ ) {
            ret.push(recursionPoints[i].add(recursionPoints[i+1]).div(2));
        }

        ret.push(points[points.length -1]);

        if(recursions == 1) {
            return ret;
        }

        recursions--;

        return recursion(ret);
    }

    return recursion(points);
}

function Queue( maxLength ) {
    this.init(maxLength);
}
Queue.prototype = {
    init: function ( maxLength ) {
        this.maxLength =  maxLength;
        this.length = 0;
    },
    destroy: function () {},
    push: function (item) {
        if( this.length == this.maxLength ) {
            for( var i = 0; i < this.maxLength - 1; i++ ) {
                this[i] = this[i+1];
            }
            this[this.length - 1] = item;
        }
        else {
            this[this.length] = item;
            this.length++;
        }
    }
}
