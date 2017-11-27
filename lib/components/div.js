'use strict';

var DIV = function DIV() {
    var _parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

    var _class = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    this.div = document.createElement('div');
    this.div.setAttribute('class', 'a-div' + _class);
    this.div.style.position = 'absolute';
    this.div.style.fontFamily = 'monospace';
    this.size();
    this.position();
    this.color();
    _parent.appendChild(this.div);
    return this;
};

DIV.prototype.x = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this._x = x;
    this.div.style.left = x + 'px';
    return this;
};

DIV.prototype.y = function () {
    var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this._y = y;
    this.div.style.top = y + 'px';
    return this;
};

DIV.prototype.z = function () {
    var z = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this.div.style.zIndex = z + 'px';
    return this;
};

DIV.prototype.width = function () {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;

    this.div.style.width = width + 'px';
    return this;
};

DIV.prototype.height = function () {
    var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;

    this.div.style.height = height + 'px';
    return this;
};

DIV.prototype.position = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    this.x(x);
    this.y(y);
    this.z(z);
    return this;
};

DIV.prototype.size = function () {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

    this.width(width);
    this.height(height);
    return this;
};

DIV.prototype.color = function () {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#ddd';

    this.div.style.backgroundColor = color;
    return this;
};

module.exports = function (_parent, _class) {
    return new DIV(_parent, _class);
};