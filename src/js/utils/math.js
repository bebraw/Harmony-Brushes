/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function Points(width, height) {
    this.init(width, height);
}
Points.prototype = {
    init: function (width, height) {
        this.quadrants = new Quadrants(width, height, 10, 10);

        this.current = null;
        this.previous = null;

        this.content = [];
    },
    destroy: function () {},
    push: function (item) {
        this.quadrants.push(item);

        this.content.push(item);
        this.previous = this.current;
        this.current = item;
    },
    extend: function (points) {
        if(points) {
            this.quadrants.extend(points);

            this.content = points.content.concat(this.content);
            this.current = points.current;
            this.previous = points.previous;
        }
    },
    getWithinRange: function (point, range, maxRange) {
        var ret = [];
        var quadtrants = this.quadrants.find(point, Math.sqrt(maxRange));

        for( var i = 0; i < quadtrants.length; i++ ) {
            var points = quadtrants[i];
            
            ret = ret.concat(this._getWithinRange(point, range, maxRange,
                points));
        }

        return ret;
    },
    _getWithinRange: function ( point, range, maxRange, content ) {
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

function Quadrants( width, height, xParts, yParts ) {
    this.init(width, height, xParts, yParts);
}
Quadrants.prototype = {
    init: function ( width, height, xParts, yParts ) {
        this.xParts = xParts;
        this.yParts = yParts;

        this.rows = {};

        var xOffset = width / xParts;
        var yOffset = height / yParts;

        for( var i = 0; i < xParts; i++ ) {
            var x = i * xOffset;
            this.rows[x] = {};

            for( var j = 0; j < yParts; j++ ) {
                var y = j * yOffset;
                this.rows[x][y] = [];
            }
        }
    },
    destroy: function () {},
    extend: function ( points ) {
        // XXX: note that points contains quadrants already -> use that information?
        for (var i = 0; i < points.content.length; i++) {
            var point = points.content[i];

            this.push(point);
        }
    },
    push: function ( item ) {
        for (var rowX in this.rows) {
            if( rowX < item.x ) {
                var row = this.rows[rowX];

                for (var columnY in row) {
                    if( columnY < item.y ) {
                        var column = row[columnY];

                        column.push(item);
                    }
                }
            }
        }
    },
    find: function (point, range) {
        // finds quadrants that are within the radius of given circle
        var ret = [];
        var minX = Math.max(point.x - range, 0);
        var maxX = point.x + range;
        var minY = Math.max(point.y - range, 0);
        var maxY = point.y + range;
        var previousRowOk = false;
        var suitableRows = [];
        var currentRowIndex = 0;

        for(var rowX in this.rows) {
            var row = this.rows[rowX];

            if( previousRowOk || (currentRowIndex == this.xParts - 1) ) {
                if( rowX > maxX || (currentRowIndex == this.xParts - 1) ) {
                    var previousColumnOk = false;
                    var suitableColumns = [];
                    
                    suitableRows.push(row);

                    for( var i = 0; i < suitableRows.length; i++ ) {
                        var previousRow = suitableRows[i];
                        var currentColumnIndex = 0;

                        for (var columnY in previousRow ) {
                            var column = previousRow[columnY];

                            if( previousColumnOk || (currentColumnIndex == this.yParts - 1) ) {
                                if( columnY > maxY || (currentColumnIndex == this.yParts - 1)) {
                                    suitableColumns.push(column);

                                    // TODO: check suitable columns now!
                                    for( var j = 0; j < suitableColumns.length; j++ ) {
                                        columnItems = suitableColumns[j];

                                        ret.push(columnItems);
                                    }

                                    break;
                                }
                                else {
                                    // accumulate previous columns. circle spans over boundaries
                                    suitableColumns.push(column);
                                }
                            }
                            else {
                                previousColumnOk = columnY <= minY;
                                suitableColumns = [column, ];
                            }

                            currentColumnIndex++;
                        }
                    }
                    
                    break;
                }
                else {
                    // accumulate previous rows. circle spans over boundaries
                    suitableRows.push(row);
                }
            }
            else {
                previousRowOk = rowX <= minX;
                suitableRows = [row, ];
            }

            currentRowIndex++;
        }

        return ret;
    }
}
