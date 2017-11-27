'use strict';

var div = require('./div');

var distance = function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.abs(x1 - x2) * Math.abs(x1 - x2) + Math.abs(y1 - y2) * Math.abs(y1 - y2));
};
var angle = function angle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
};

var LINE = function LINE() {
    var _parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

    var _class = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var x1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var y1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var x2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var y2 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var z = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

    this._ = div(_parent, ' a-line' + _class);
    this._.div.style.backgroundColor = '#ddd';
    this.coords(x1, y1, x2, y2, z);
    return this;
};

LINE.prototype.coords = function (x1, y1, x2, y2) {
    var z = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    this._.div.style.transformOrigin = '0 50%';
    this._.position(x1, y1, z);
    this._.width(distance(x1, y1, x2, y2));
    this._.height(1);
    this._.div.style.transform = 'translate(0, -50%) rotateZ(' + angle(x1, y1, x2, y2) + 'deg)';
};

LINE.prototype.show = function () {
    this._.div.style.display = 'block';
    return this;
};

LINE.prototype.hide = function () {
    this._.div.style.display = 'none';
    return this;
};
module.exports = function (_parent, _class, x1, y1, x2, y2, z) {
    return new LINE(_parent, _class, x1, y1, x2, y2, z);
};