'use strict';

var xmlns = "http://www.w3.org/2000/svg";

var EYE = function EYE(_options) {
    var _parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

    var _class = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    this.svg = document.createElementNS(xmlns, 'svg');
    this.svg.setAttribute('class', 'a-svg' + _class);
    this.svg.style.position = 'absolute';
    this.circle = document.createElementNS(xmlns, 'circle');
    this.eye = document.createElementNS(xmlns, 'circle');
    this.small = document.createElementNS(xmlns, 'circle');
    this.circle.style.fill = '#ffffff';
    this.eye.style.fill = '#333333';
    this.small.style.fill = '#ffffff';
    this.circle.style.stroke = '#333333';
    this.circle.style.strokeWidth = 1;
    this.position(_options.x, _options.y);
    this.width(_options.width);
    this.height(_options.height);
    this.svg.appendChild(this.circle);
    this.svg.appendChild(this.eye);
    this.svg.appendChild(this.small);
    _parent.appendChild(this.svg);
    this.eye.setAttributeNS(null, 'cx', this._width / 2);
    this.circle.setAttributeNS(null, 'cx', this._width / 2);
    this.eye.setAttributeNS(null, 'cy', this._height / 2);
    this.circle.setAttributeNS(null, 'cy', this._height / 2);
    this.small.setAttributeNS(null, 'cx', this._width / 2.5);
    this.small.setAttributeNS(null, 'cy', this._height / 2.5);
    return this;
};

EYE.prototype.remove = function () {
    if (this.svg.parentNode) {
        this.svg.parentNode.removeChild(this.svg);
    }
    return this;
};

EYE.prototype.position = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    this.x(x);
    this.y(y);
    return this;
};

EYE.prototype.x = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this._x = x;

    this.svg.style.left = x + 'px';
    return this;
};

EYE.prototype.y = function () {
    var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this._y = y;

    this.svg.style.top = y + 'px';
    return this;
};

EYE.prototype.close = function () {
    if (!this._close) {
        this.svg.removeChild(this.small);
        this.eye.setAttributeNS(null, 'r', this._width / 2.8);
        this._close = true;
    }
    return this;
};

EYE.prototype.width = function () {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    this._width = width;
    this.circle.setAttributeNS(null, 'r', width / 2);
    this.eye.setAttributeNS(null, 'r', width / 3);
    this.small.setAttributeNS(null, 'r', width / 8);
    this.svg.setAttribute('width', width);
    return this;
};

EYE.prototype.height = function () {
    var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    this._height = height;
    this.svg.setAttribute('height', height);
    return this;
};

module.exports = function (_options, _parent, _class) {
    return new EYE(_options, _parent, _class);
};