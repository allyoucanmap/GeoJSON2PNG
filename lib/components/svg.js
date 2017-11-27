'use strict';

var xmlns = "http://www.w3.org/2000/svg";

var SVG = function SVG(_options) {
    var _parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

    var _class = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    this.svg = document.createElementNS(xmlns, 'svg');
    this.svg.setAttribute('class', 'a-svg' + _class);
    this.svg.style.position = 'absolute';
    this.position(_options.x, _options.y);
    this.width(_options.width);
    this.height(_options.height);
    _parent.appendChild(this.svg);
    return this;
};

SVG.prototype.position = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    this.x(x);
    this.y(y);
    return this;
};

SVG.prototype.x = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this._x = x;
    this.svg.style.left = x + 'px';
    return this;
};

SVG.prototype.y = function () {
    var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this._y = y;
    this.svg.style.top = y + 'px';
    return this;
};

SVG.prototype.width = function () {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    this._width = width;
    this.svg.setAttribute('width', width);
    return this;
};

SVG.prototype.height = function () {
    var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    this._height = height;
    this.svg.setAttribute('height', height);
    return this;
};

module.exports = function (_options, _parent, _class) {
    return new SVG(_options, _parent, _class);
};