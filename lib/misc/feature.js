'use strict';

var path = require('../components/path');
var force = require('../components/force');
var eye = require('./eye');
var xmlns = "http://www.w3.org/2000/svg";
var distance = function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.abs(x1 - x2) * Math.abs(x1 - x2) + Math.abs(y1 - y2) * Math.abs(y1 - y2));
};

var u = 4;
var v = 10;
var leg = [[0, 0], [15, 0], [15, 5], [5, 5], [5, 40], [0, 40], [0, 0]];
var base = [[0, 0], [100, 0], [100, 100], [0, 100], [0, 0]];

var id = 0;

var FEATURE = function FEATURE(_body) {
    var _x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var _y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var _color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#ffffff';

    var _feature = arguments[4];

    var _this = this;

    var _size = arguments[5];
    var _parent = arguments[6];

    var size = _size;
    this._id = 'feature:' + id;
    id++;
    this.legR = path({ width: size / 4, height: size / 2, coords: leg, strokeWidth: _size / 40, stroke: '#333333', fill: '#ffffff', fillOpacity: 1 }, _parent);
    this.body = path({ width: size, height: size, coords: _body, strokeWidth: _size / 40, stroke: '#333333', fill: _color, fillOpacity: 1 }, _parent);
    this.legL = path({ width: size / 4, height: size / 2, coords: leg, strokeWidth: _size / 40, stroke: '#333333', fill: '#ffffff', fillOpacity: 1 }, _parent);
    this.eyeL = eye({ width: size / 6, height: size / 6, stroke: '#333333', fill: '#ffffff', fillOpacity: 1, strokeWidth: _size / 40 }, _parent);
    this.eyeR = eye({ width: size / 6, height: size / 6, stroke: '#333333', fill: '#ffffff', fillOpacity: 1, strokeWidth: _size / 40 }, _parent);
    this.base = path({ width: size, height: size, coords: base, stroke: 'none', fill: 'none' });
    this.text = document.createElementNS(xmlns, 'text');
    this.base._.svg.appendChild(this.text);
    this.base._.svg.style.overflow = 'visible';
    this.legL._.svg.style.transformOrigin = 'top left';
    this.legR._.svg.style.transformOrigin = 'top left';
    this.bbox();
    this.x(_x);
    this.y(_y);
    this._height = this.base._height;
    this._width = this.base._width;
    this._timex = 0;
    this._leftMove = force({ element: this, direction: -1 });
    this._rightMove = force({ element: this });
    this._upMove = force({ element: this, axis: 'y', direction: -1, force: 20, limit: 500, increase: 0.1 });
    this._gravity = force({ element: this, axis: 'y' });
    this._autotime = 0;
    this._bullets = [];
    this._touchtime = 0;
    this._feature = _feature;

    if (this._feature && this._feature.properties) {
        var text = Object.keys(this._feature.properties).reduce(function (a, b) {
            return a + (isNaN(parseFloat(_this._feature.properties[b])) ? _this._feature.properties[b] + ' ' : '');
        }, '');
        if (text) {
            this.text.innerHTML = text;
            this.text.style.fontSize = '10px';
            this.text.style.fontFamily = 'monospace';
            this.text.setAttributeNS(null, 'text-anchor', 'middle');
        }
    }
    return this;
};

FEATURE.prototype.move = function (_options) {
    var move = Math.cos(this._timex) * v;
    var scale = _options.left && ' scaleX(-1)' || _options.up && this._lastMoveX || '';
    var jump = _options.up && ' translateY(' + Math.sin(this._timex) * v + 'px)' || '';
    if (scale) {
        this.body._.svg.style.transform = scale;
        this.legL._.svg.style.transform = 'translateX(' + move + 'px) rotate(' + -Math.sin(this._timex) + 'rad)' + scale + jump;
        this.legR._.svg.style.transform = 'translateX(' + -move + 'px) rotate(' + Math.sin(this._timex) + 'rad)' + scale + jump;
    } else {
        this.body._.svg.style.transform = 'none';
        this.legL._.svg.style.transform = 'translateX(' + move + 'px) rotate(' + Math.sin(this._timex) + 'rad)' + jump;
        this.legR._.svg.style.transform = 'translateX(' + -move + 'px) rotate(' + -Math.sin(this._timex) + 'rad)' + jump;
    }
    this._leftMove.use(_options.left);
    this._rightMove.use(_options.right);
    this._upMove.use(_options.up);
    this._gravity.use(true);

    this._timex += 0.05 * this._deltax;
    if (!_options.left && !_options.right && !_options.up) {
        this._timex = 0;
        this.body._.svg.style.transform = this._lastMoveX;
        this.legL._.svg.style.transform = 'rotate(' + Math.sin(this._timex) + 'rad)' + this._lastMoveX;
        this.legR._.svg.style.transform = 'rotate(' + -Math.sin(this._timex) + 'rad)' + this._lastMoveX;
    } else {
        if (_options.left || _options.right) {
            this._lastMoveX = _options.left && ' scaleX(-1)' || '';
        }
    }
};

FEATURE.prototype.auto = function () {
    var _this2 = this;

    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var rnd = Math.floor(Math.random() * 100);
    var _target = target.reduce(function (a, t) {
        return distance(a._x, a._y, _this2._x, _this2._y) < distance(t._x, t._y, _this2._x, _this2._y) ? a : t;
    }, target[0]);
    var _distance = distance(_target._x, _target._y, this._x, this._y);
    var deltax = _target._x - this._x;
    var deltay = Math.abs(_target._y - this._y);
    var left = false;
    var right = false;
    var up = false;

    if (_distance < 300) {
        if (deltax > 0) {
            left = true;
        } else {
            right = true;
        }
        if (deltay > 200) {
            up = true;
        }
    }

    if (_distance >= 300 && _distance < 500) {
        if (deltax < 0) {
            this._lastMoveX = ' scaleX(-1)';
        } else {
            this._lastMoveX = '';
        }
    }

    if (_distance >= 500) {
        if (deltax > 0) {
            this._lastMoveX = ' scaleX(-1)';
        } else {
            this._lastMoveX = '';
        }
    }
    if (!this._touch) {
        this.move({
            left: left,
            right: right,
            up: up
        });
    }

    this._autotime += 0.05;
    this._rnd = rnd;
    if (this._touch) {
        this.eyeL.close();
        this.eyeR.close();
        this.body.fill(this._touchtime % 2 ? '#ff3333' : '#ffffff');
        this.body.stroke(this._touchtime % 2 ? '#ffffff' : '#ff3333');
        this._touchtime += 0.5;
    }
    if (this._touchtime > 50) {

        this.remove();
    }
};

FEATURE.prototype.x = function (x) {
    this._deltax = x - this._x;
    this.base.x(x);
    this.bbox();
    this.body.x(this.base._x);
    this.legL.x(this.base._x + this.body._width / u);
    this.legR.x(this.base._x + this.base._width - this.legR._width - this.body._width / u);
    this.eyeL.x(this.base._x + this.base._width / 2 - this.base._width / 8);
    this.eyeR.x(this.base._x + this.base._width / 2 + this.base._width / 8);

    this.text.setAttributeNS(null, 'x', this.base._width / 2);

    this._x = this.base._x;
    return this;
};

FEATURE.prototype.y = function (y) {
    this.base.y(y);
    this.bbox();
    this.body.y(this.base._y);
    this.legL.y(this.base._y + (this.base._height - this.legL._height));
    this.legR.y(this.base._y + (this.base._height - this.legL._height));
    this.eyeL.y(this.base._y + this.base._height / 2 - this.base._height / u);
    this.eyeR.y(this.base._y + this.base._height / 2 - this.base._height / u);
    this.text.setAttributeNS(null, 'y', -v);
    this._y = this.base._y;
    return this;
};

FEATURE.prototype.touch = function () {
    this._touch = true;
    return this;
};

FEATURE.prototype.remove = function () {
    this.legR.remove();
    this.body.remove();
    this.legL.remove();
    this.eyeL.remove();
    this.eyeR.remove();
    this.base.remove();
    if (this.text.parentNode) {
        this.base._.svg.removeChild(this.text);
    }
    this._removed = true;
    return this;
};

FEATURE.prototype.bbox = function () {
    this._bbox = this.base._bbox;
    return this;
};

module.exports = function (_body, _x, _y, _color, _feature, _size, _parent) {
    return new FEATURE(_body, _x, _y, _color, _feature, _size, _parent);
};