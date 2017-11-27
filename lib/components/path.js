'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var svg = require('./svg');
var xmlns = "http://www.w3.org/2000/svg";

var map = function map(val, v1, v2, v3, v4) {
    return v3 + (v4 - v3) * ((val - v1) / (v2 - v1));
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

    return deltaX > deltaY ? { maxx: maxx, minx: minx, maxy: maxy, miny: miny, width: width, height: width / (deltaX / deltaY) } : { maxx: maxx, minx: minx, maxy: maxy, miny: miny, width: height * (deltaX / deltaY), height: height };
};

var countArray = function countArray(count, array) {
    return array.length && array.length > 0 ? countArray(count + 1, array[0]) : count;
};

var writePath = function writePath(coords, dimension, margin) {
    return coords.reduce(function (a, b, i) {
        var x = map(b[0], dimension.minx, dimension.maxx, margin, dimension.width - margin);
        var y = map(b[1], dimension.maxy, dimension.miny, margin, dimension.height - margin);
        if (i === 0) {
            return a + 'M' + x + ' ' + y + ' ';
        }
        if (i === coords.length - 1) {
            var close = b[0] === coords[0][0] && b[1] === coords[0][1] && ' Z' || '';
            return a + 'L' + x + ' ' + y + close;
        }
        return a + 'L' + x + ' ' + y + ' ';
    }, '');
};

var draw = function draw(coords, width, height, margin, count) {
    if (coords.length === 0 || !count) {
        return { width: width, height: height, d: [''] };
    }
    if (count === 4) {
        var _plainCoordinates = coords.reduce(function (a, b) {
            return [].concat(_toConsumableArray(a), _toConsumableArray(b.reduce(function (c, d) {
                return [].concat(_toConsumableArray(c), _toConsumableArray(d));
            }, [])));
        }, []);
        var _dimension = size(_plainCoordinates, width, height);
        var _d = coords.map(function (c) {
            return c.reduce(function (a, b) {
                return a + ' ' + writePath(b, _dimension, margin);
            }, '');
        });
        return Object.assign(_dimension, { d: _d });
    }
    var plainCoordinates = coords.reduce(function (a, b) {
        return [].concat(_toConsumableArray(a), _toConsumableArray(b));
    }, []);
    var dimension = size(plainCoordinates, width, height);
    var d = coords.reduce(function (a, b) {
        return a + ' ' + writePath(b, dimension, margin);
    }, '');
    return Object.assign(dimension, { d: [d] });
};
var id = 0;

var PATH = function PATH() {
    var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _this = this;

    var _parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

    var _class = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    this._id = 'path:' + id;
    id++;
    this._ = svg({}, _parent, ' a-path' + _class);
    this._count = _options.coords && countArray(0, _options.coords);
    this._bbool = _options._bbool;
    if (this._bbool) {
        this.bounds = document.createElementNS(xmlns, 'path');
        this.bounds.setAttribute('stroke', '#000000');
        this.bounds.setAttribute('stroke-dasharray', '2 2');
        this.bounds.setAttribute('fill', 'none');
        this._.svg.appendChild(this.bounds);
    }
    this._d = _options.d;
    this._margin = _options.margin || 5;

    this.draw(_options.coords);
    this.position(_options.x, _options.y);
    this.fill(_options.fill);
    this.fillOpacity(_options.fillOpacity);
    this.stroke(_options.stroke);
    this.strokeWidth(_options.strokeWidth);
    this.size(_options.width, _options.height);

    this.element.forEach(function (el) {
        _this._.svg.appendChild(el);
    });

    return this;
};

PATH.prototype.draw = function () {
    var _this2 = this;

    var coords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    this._count = coords && countArray(0, coords);
    if (this.element) {
        this.element.forEach(function (el) {
            _this2._.svg.removeChild(el);
        });
    }
    this.element = null;
    if (this._count === 4) {
        this.element = coords.map(function () {
            return document.createElementNS(xmlns, 'path');
        });
        this.element.forEach(function (el) {
            el.setAttributeNS(null, 'fill-rule', 'even-odd');
        });
    } else {
        this.element = [document.createElementNS(xmlns, 'path')];
    }
    this.element.forEach(function (el) {
        _this2._.svg.appendChild(el);
    });
    this._coords = this._count === 2 ? [[].concat(_toConsumableArray(coords))] : [].concat(_toConsumableArray(coords));
    var _draw = draw(this._coords, this._._width, this._._height, this._margin, this._count);
    this._width = _draw.width;
    this._height = _draw.height;
    this.fill(this._fill);
    this.fillOpacity(this._fillOpacity);
    this.stroke(this._stroke);
    this.strokeWidth(this._strokeWidth);
    this.bbox();
    this.element.forEach(function (el, i) {
        el.setAttribute('d', _draw.d[i]);
    });
    return this;
};

PATH.prototype.margin = function () {
    var margin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

    this._margin = margin;
    var _draw = draw(this._coords, this._._width, this._._height, this._margin, this._count);
    this._width = _draw.width;
    this._height = _draw.height;
    this.bbox();
    this.element.forEach(function (el, i) {
        el.setAttribute('d', _draw.d[i]);
    });
    return this;
};

PATH.prototype.position = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    this._x = x;
    this._y = y;
    this._.x(x);
    this._.y(y);
    this.bbox();
    return this;
};

PATH.prototype.x = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this._x = x;
    this._.x(x);
    this.bbox();
    return this;
};

PATH.prototype.y = function () {
    var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this._y = y;
    this._.y(y);
    this.bbox();
    return this;
};

PATH.prototype.size = function () {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

    this._.width(width);
    this._.height(height);
    var _draw = draw(this._coords, width, height, this._margin, this._count);
    this._width = _draw.width;
    this._height = _draw.height;
    this.bbox();
    this.element.forEach(function (el, i) {
        el.setAttribute('d', _draw.d[i]);
    });
    return this;
};

PATH.prototype.width = function () {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    this._.width(width);
    var _draw = draw(this._coords, width, this._._height, this._margin, this._count);
    this._width = _draw.width;
    this._height = _draw.height;
    this.bbox();
    this.element.forEach(function (el, i) {
        el.setAttribute('d', _draw.d[i]);
    });
    return this;
};

PATH.prototype.height = function () {
    var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    this._.height(height);
    var _draw = draw(this._coords, this._._width, height, this._margin, this._d);
    this._width = _draw.width;
    this._height = _draw.height;
    this.bbox();
    this.element.forEach(function (el, i) {
        el.setAttribute('d', _draw.d[i]);
    });
    return this;
};

PATH.prototype.bbox = function () {
    var x = this._x || 0;
    var y = this._y || 0;
    this._bbox = [[x, y], [x + this._width / 2, y], [x + this._width, y], [x + this._width, y + this._height / 2], [x + this._width, y + this._height], [x + this._width / 2, y + this._height], [x, y + this._height], [x, y + this._height / 2], [x, y]];
    if (this._bbool) {
        this.bounds.setAttribute('d', draw([[].concat(_toConsumableArray(this._bbox))], this._._width, this._._height, 0, 3).d);
    }
    return this;
};

PATH.prototype.fill = function (color) {
    if (color) {
        this._fill = color;
        this.element.forEach(function (el) {
            el.setAttribute('fill', color);
        });
    }
    return this;
};

PATH.prototype.fillOpacity = function (opacity) {
    if (opacity) {
        this._fillOpacity = opacity;
        this.element.forEach(function (el) {
            el.setAttribute('fill-opacity', opacity);
        });
    }
    return this;
};

PATH.prototype.stroke = function (color) {
    if (color) {
        this._stroke = color;
        this.element.forEach(function (el) {
            el.setAttribute('stroke', color);
        });
    }
    return this;
};

PATH.prototype.strokeWidth = function (width) {

    if (width) {
        this._strokeWidth = width;
        this.element.forEach(function (el) {
            el.setAttribute('stroke-width', width);
        });
    }
    return this;
};

PATH.prototype.remove = function () {
    var _this3 = this;

    if (this._.svg.parentNode) {
        this.element.forEach(function (el) {
            _this3._.svg.removeChild(el);
        });
        this._.svg.parentNode.removeChild(this._.svg);
    }
    return this;
};

PATH.prototype.show = function () {
    this._.svg.style.display = 'block';
    return this;
};

PATH.prototype.hide = function () {
    this._.svg.style.display = 'none';
    return this;
};

module.exports = function (_options, _parent, _class) {
    return new PATH(_options, _parent, _class);
};