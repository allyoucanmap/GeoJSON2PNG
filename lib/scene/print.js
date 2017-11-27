'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var countArray = function countArray(count, array) {
    return array.length && array.length > 0 ? countArray(count + 1, array[0]) : count;
};

var size = function size(coords, width, height) {
    var vmaxx = coords.reduce(function (a, b) {
        return a[0] > b[0] ? a : b;
    });
    var vminx = coords.reduce(function (a, b) {
        return a[0] < b[0] ? a : b;
    });
    var vmaxy = coords.reduce(function (a, b) {
        return a[1] > b[1] ? a : b;
    });
    var vminy = coords.reduce(function (a, b) {
        return a[1] < b[1] ? a : b;
    });
    var maxx = vmaxx[0];
    var minx = vminx[0];
    var maxy = vmaxy[1];
    var miny = vminy[1];

    var deltaX = Math.abs(minx - maxx);
    var deltaY = Math.abs(maxy - miny);

    return deltaX > deltaY ? { maxx: maxx, minx: minx, maxy: maxy, miny: miny, width: width, height: width / (deltaX / deltaY), top: (width - width / (deltaX / deltaY)) / 2, left: 0 } : { maxx: maxx, minx: minx, maxy: maxy, miny: miny, width: height * (deltaX / deltaY), height: height, top: 0, left: (height - height * (deltaX / deltaY)) / 2 };
};

var map = function map(val, v1, v2, v3, v4) {
    return v3 + (v4 - v3) * ((val - v1) / (v2 - v1));
};

var draw = function draw(coordinates, ctx, dimension, fill, stroke, strokeWidth) {
    coordinates.forEach(function (c) {
        ctx.beginPath();
        c.forEach(function (p, i) {
            var x = map(p[0], dimension.minx, dimension.maxx, 0, dimension.width) + dimension.left;
            var y = map(p[1], dimension.maxy, dimension.miny, 0, dimension.height) + dimension.top;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else if (i === c.length - 1) {
                ctx.lineTo(x, y);
                ctx.closePath();
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.stroke();
        ctx.fill('evenodd');
    });
};

var _canvas = void 0;
var box = void 0;
var ctx = void 0;
var width = void 0;
var height = void 0;
module.exports = {
    set: function set() {
        var _parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

        var _width = arguments[1];
        var _height = arguments[2];

        width = _width;
        height = _height;
        _canvas = document.createElement('canvas');
        _canvas.style.position = 'absolute';
        _canvas.setAttribute('width', height / 3);
        _canvas.setAttribute('height', height / 3);
        _canvas.style.left = (width - height / 3) / 2 - height / 100 + 'px';
        _canvas.style.top = height / 1.75 + 'px';

        _canvas.style.width = height / 3 + 'px';
        _canvas.style.height = height / 3 + 'px';
        _canvas.style.padding = height / 100 + 'px';
        _canvas.style.border = '1px dashed #777777';
        ctx = _canvas.getContext('2d');
        _parent.appendChild(_canvas);

        box = document.createElement('div');
        box.style.position = 'absolute';
        box.style.left = (width - height / 3) / 2 - height / 100 + 'px';
        box.style.top = height / 1.75 + 'px';
        box.style.width = height / 3 + height / 50 + 'px';
        box.style.height = height / 3 + height / 50 + 'px';
        box.style.lineHeight = height / 3 + 'px';
        box.style.fontFamily = 'monospace';
        box.innerHTML = 'PNG BOX';
        box.style.fontSize = height / 28 + 'px';
        box.style.textAlign = 'center';
        box.style.color = '#333333';
        box.style.opacity = 0.5;
        box.style.zIndex = 1500;
        _parent.appendChild(box);
    },
    hide: function hide() {
        _canvas.style.display = 'none';
        box.style.display = 'none';
    },
    show: function show() {
        _canvas.style.display = 'block';
        box.style.display = 'block';
    },
    canvas: function canvas(json) {
        var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#ffffff';
        var stroke = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#333333';
        var strokeWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;

        var features = json && json.features && json.features.length > 0 && json.features || null;
        ctx.clearRect(0, 0, height / 3, height / 3);
        box.style.display = 'block';
        if (features) {
            box.style.display = 'none';
            var plainCoordinates = features.reduce(function (a, b) {
                var coordinates = b.geometry && b.geometry.coordinates || [];
                var count = countArray(0, coordinates);
                if (count === 3) {
                    return [].concat(_toConsumableArray(a), _toConsumableArray(coordinates.reduce(function (c, d) {
                        return [].concat(_toConsumableArray(c), _toConsumableArray(d));
                    }, [])));
                } else if (count === 4) {
                    return [].concat(_toConsumableArray(a), _toConsumableArray(coordinates.reduce(function (c, d) {
                        return [].concat(_toConsumableArray(c), _toConsumableArray(d.reduce(function (e, f) {
                            return [].concat(_toConsumableArray(e), _toConsumableArray(f));
                        }, [])));
                    }, [])));
                }
                return [].concat(_toConsumableArray(a));
            }, []);
            var dimension = size(plainCoordinates, height / 3, height / 3);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, height / 3, height / 3);
            features.forEach(function (f) {
                var coordinates = f.geometry && f.geometry.coordinates || [];
                var count = countArray(0, coordinates);
                if (count === 3) {
                    draw(coordinates, ctx, dimension, fill, stroke, strokeWidth);
                } else if (count === 4) {
                    coordinates.forEach(function (c) {
                        draw(c, ctx, dimension, fill, stroke, strokeWidth);
                    });
                }
            });
            _canvas.style.cursor = 'pointer';
            _canvas.onclick = function () {
                var href = _canvas.toDataURL('image/png');
                var a = document.createElement('a');
                a.setAttribute('href', href);
                a.setAttribute('download', 'GeoJSON2PNG.png');
                a.click();
            };
        }
    }
};